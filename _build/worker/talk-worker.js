// 航空キャリアノート：会話練習の「AIと話す」の中継（Cloudflare Worker + Workers AI）2026.10
// ・置き方（韓国語・開発の知識なしで）：リポジトリの一番上の 00_AI대화_설정방법.md
// ・ページ（会話練習_日韓英.html / talk.html）から {messages:[{role,content}], model?} を POST で受け取り、
//   Workers AI に渡して {text:'…'} を返す。API キーはいらない（Worker に「AI」という名前で Workers AI をつなぐ）
// ・使ってよいサイト（Origin）だけに答える：変数 ALLOWED_ORIGINS（カンマ区切り）。なければ https://ocw-1027.github.io
//   試験用に http://localhost と http://127.0.0.1 も通す（変数 ALLOW_LOCALHOST を 'false' にすると止める）
// ・上限：メッセージ 16件まで、1件 1,200字まで（最初の system は 3,000字まで）、返事は max_tokens 400、モデルは ALLOWED_MODELS だけ
// ・同じ IP からの回数の上限：Rate Limiting のつなぎ（名前 RL）があればそれを使い、なければこの Worker の中の簡単な数え方（1分に20回）
// ・失敗のときは {error:'…'} とわかりやすい番号を返す（ページはそれを見て「ほかのAIアプリで練習する」に切り替える）
//     400 bad_request / 403 origin / 405 method / 413 too_large / 429 rate（回数の上限）/ 429 quota（今日の無料の分の終わり）
//     500 config（AI のつなぎがない）/ 502 ai（AI の失敗）/ 503 busy（AI が混んでいる）
// ・会話の中身はログに書かない（console に出すのは失敗の種類だけ）

const DEFAULT_ORIGINS = ['https://ocw-1027.github.io'];
const DEFAULT_MODEL = '@cf/qwen/qwen3-30b-a3b-fp8';
const ALLOWED_MODELS = ['@cf/qwen/qwen3-30b-a3b-fp8', '@cf/google/gemma-3-12b-it', '@cf/openai/gpt-oss-120b'];
const MAX_MESSAGES = 16;
const MAX_CHARS = 1200;          // user / assistant の1件
const MAX_SYSTEM_CHARS = 3000;   // 最初の system（ページの作るプロンプト）
const MAX_BODY = 64 * 1024;      // 受け取る大きさの上限（バイト）
const MAX_TOKENS = 400;
const PER_MINUTE = 20;           // RL のつなぎがないときの、1つの IP の1分あたりの回数

const hits = new Map();          // RL がないときの数え方（この Worker の1つの実行の中だけ。目安）

function allowedOrigins(env) {
  const list = String((env && env.ALLOWED_ORIGINS) || '').split(',').map(s => s.trim().replace(/\/+$/, '')).filter(Boolean);
  return list.length ? list : DEFAULT_ORIGINS;
}

function originOk(origin, env) {
  if (!origin) return false;
  if (allowedOrigins(env).includes(origin)) return true;
  if (String((env && env.ALLOW_LOCALHOST) || '').toLowerCase() === 'false') return false;
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(origin);
}

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(obj, status, origin) {
  const h = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
  if (origin) Object.assign(h, cors(origin));
  return new Response(JSON.stringify(obj), { status, headers: h });
}

// 受け取った中身を調べる。よければ {messages, model}、だめなら {error, status, detail}
function validate(body, env) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'bad_request', status: 400, detail: 'body must be a JSON object' };
  const msgs = body.messages;
  if (!Array.isArray(msgs) || msgs.length < 1) return { error: 'bad_request', status: 400, detail: 'messages must be a non-empty array' };
  if (msgs.length > MAX_MESSAGES) return { error: 'too_large', status: 413, detail: `at most ${MAX_MESSAGES} messages` };
  const out = [];
  for (let i = 0; i < msgs.length; i++) {
    const m = msgs[i];
    if (!m || typeof m !== 'object' || typeof m.content !== 'string') return { error: 'bad_request', status: 400, detail: `message ${i} is not {role, content}` };
    const role = m.role;
    if (role === 'system') { if (i !== 0) return { error: 'bad_request', status: 400, detail: 'system must be the first message' }; }
    else if (role !== 'user' && role !== 'assistant') return { error: 'bad_request', status: 400, detail: `message ${i} has an unknown role` };
    const limit = role === 'system' ? MAX_SYSTEM_CHARS : MAX_CHARS;
    if (m.content.length > limit) return { error: 'too_large', status: 413, detail: `message ${i} is longer than ${limit} characters` };
    if (!m.content.trim()) return { error: 'bad_request', status: 400, detail: `message ${i} is empty` };
    out.push({ role, content: m.content });
  }
  if (!out.some(m => m.role === 'user')) return { error: 'bad_request', status: 400, detail: 'no user message' };
  let model = (env && env.MODEL) || DEFAULT_MODEL;
  if (body.model != null) {
    if (typeof body.model !== 'string' || !ALLOWED_MODELS.includes(body.model)) return { error: 'bad_request', status: 400, detail: 'model not allowed' };
    model = body.model;
  }
  if (!ALLOWED_MODELS.includes(model)) model = DEFAULT_MODEL;
  return { messages: out, model };
}

// Qwen3 は「考える」部分を出すことがあるので、/no_think で止める（費用と時間の節約）
function prepare(messages, model) {
  const m = messages.map(x => ({ role: x.role, content: x.content }));
  if (/qwen3/i.test(model)) {
    if (m[0].role === 'system') m[0].content += '\n/no_think';
    else m.unshift({ role: 'system', content: '/no_think' });
  }
  return m;
}

// Workers AI の答えの形はモデルでちがうので、文だけを取り出す
function textOf(r) {
  if (r == null) return '';
  if (typeof r === 'string') return r;
  if (typeof r.response === 'string') return r.response;
  if (r.response && typeof r.response === 'object') return textOf(r.response);
  const c = Array.isArray(r.choices) && r.choices[0];
  if (c) {
    if (c.message && typeof c.message.content === 'string') return c.message.content;
    if (typeof c.text === 'string') return c.text;
  }
  if (typeof r.output_text === 'string') return r.output_text;
  if (Array.isArray(r.output)) {
    const parts = [];
    for (const o of r.output) if (o && o.type === 'message' && Array.isArray(o.content)) for (const p of o.content) if (p && typeof p.text === 'string') parts.push(p.text);
    if (parts.length) return parts.join('\n');
  }
  return '';
}

function stripThink(s) {
  s = String(s || '').replace(/<think>[\s\S]*?<\/think>/gi, '');
  if (/<\/think>/i.test(s)) s = s.replace(/^[\s\S]*<\/think>/i, '');
  return s.replace(/<think>[\s\S]*$/i, '').trim();
}

// Workers AI の失敗を、ページ向けの番号に分ける
function classify(err) {
  const msg = String((err && (err.message || err)) || '');
  if (/\b(3036|4006)\b|daily free allocation|neurons/i.test(msg)) return { error: 'quota', status: 429 };
  if (/\b3040\b|capacity|too many requests|rate limit/i.test(msg)) return { error: 'busy', status: 503 };
  return { error: 'ai', status: 502 };
}

async function rateOk(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env && env.RL && typeof env.RL.limit === 'function') {
    try { const { success } = await env.RL.limit({ key: ip }); return !!success; } catch (e) { return true; }
  }
  const now = Date.now(), win = 60000;
  const a = (hits.get(ip) || []).filter(t => now - t < win);
  if (a.length >= PER_MINUTE) { hits.set(ip, a); return false; }
  a.push(now); hits.set(ip, a);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.length || now - v[v.length - 1] > win) hits.delete(k);
  return true;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const ok = originOk(origin, env);
    const allow = ok ? origin : '';
    if (request.method === 'OPTIONS') {
      return ok ? new Response(null, { status: 204, headers: cors(origin) }) : new Response(null, { status: 403 });
    }
    if (request.method === 'GET') {
      // 動いているかの確かめ用（ブラウザでこの Worker の住所を開くと見える）。会話はしない
      return json({ ok: true, service: 'talk-ai', ai: !!(env && env.AI), model: (env && env.MODEL) || DEFAULT_MODEL, origins: allowedOrigins(env) }, 200, allow);
    }
    if (request.method !== 'POST') return json({ error: 'method' }, 405, allow);
    if (!ok) return json({ error: 'origin' }, 403, '');
    const len = +(request.headers.get('Content-Length') || 0);
    if (len > MAX_BODY) return json({ error: 'too_large' }, 413, allow);
    let raw;
    try { raw = await request.text(); } catch (e) { return json({ error: 'bad_request' }, 400, allow); }
    if (raw.length > MAX_BODY) return json({ error: 'too_large' }, 413, allow);
    let body;
    try { body = JSON.parse(raw); } catch (e) { return json({ error: 'bad_request', detail: 'invalid JSON' }, 400, allow); }
    const v = validate(body, env);
    if (v.error) return json({ error: v.error, detail: v.detail }, v.status, allow);
    if (!(await rateOk(request, env))) return json({ error: 'rate' }, 429, allow);
    if (!env || !env.AI || typeof env.AI.run !== 'function') { console.log('talk-ai: no AI binding'); return json({ error: 'config' }, 500, allow); }
    try {
      const r = await env.AI.run(v.model, { messages: prepare(v.messages, v.model), max_tokens: MAX_TOKENS, temperature: 0.7 });
      const text = stripThink(textOf(r));
      if (!text) return json({ error: 'empty' }, 502, allow);
      return json({ text, model: v.model }, 200, allow);
    } catch (e) {
      const c = classify(e);
      console.log('talk-ai: ' + c.error);   // 中身は書かない
      return json({ error: c.error }, c.status, allow);
    }
  },
};
