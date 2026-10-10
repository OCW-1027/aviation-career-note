// 航空キャリアノート：会話練習の「AIと話す」の中継（Cloudflare Worker + Workers AI）2026.10
// ・置き方・更新のしかた（韓国語・開発の知識なしで）：_build/docs/AI대화_설정방법.md
// ・ページ（会話練習_日韓英.html / talk.html）から {messages:[{role,content}], model?} を POST で受け取り、
//   Workers AI に渡して {text:'…'} を返す。API キーはいらない（Worker に「AI」という名前で Workers AI をつなぐ）
// ・使ってよいサイト（Origin）だけに答える：変数 ALLOWED_ORIGINS（カンマ区切り）。なければ https://ocw-1027.github.io
//   試験用に http://localhost と http://127.0.0.1 も通す（変数 ALLOW_LOCALHOST を 'false' にすると止める）
// ・上限：メッセージ 16件まで、1件 1,200字まで（最初の system は 3,000字まで）、モデルは ALLOWED_MODELS だけ
//   返事の長さ：qwen・gemma は max_tokens 400。gpt-oss は「考える」部分も同じ枠を使うので 1000（400 だと JSON が途中で切れた。2026.10）
// ・gpt-oss の考える量（2026.10 Cloudflare の文書）：
//     モデルの説明 developers.cloudflare.com/workers-ai/models/gpt-oss-120b/ … 入力は messages（Chat Completions の形）。考える量は low / medium（ふつう）/ high
//     2025-08-05 の更新のお知らせ … Workers の env.AI.run は Responses API の形も受け取る。考える量は {input:[…], reasoning:{effort:'…'}}
//   そこで gpt-oss は、まず Responses の形（input ＋ reasoning.effort 'low'）で送り、受け付けられない・空のときは
//   messages の形（2026.10 に動くことを確かめた形）で1回だけ送り直す。変数 REASONING_EFFORT（low / medium / high / off）で変えられる。off＝いつも messages
//   返事からは最後の答え（output の message、choices の content）だけを取り、考えた中身（reasoning）は使わない
// ・同じ IP からの回数の上限：Rate Limiting のつなぎ（名前 RL）があればそれを使い、なければこの Worker の中の簡単な数え方（1分に20回）
// ・失敗のときは {error:'…'} とわかりやすい番号を返す（ページはそれを見て「ほかのAIアプリで練習する」に切り替える）
//     400 bad_request / 403 origin / 405 method / 413 too_large / 429 rate（回数の上限）/ 429 quota（今日の無料の分の終わり）
//     500 config（AI のつなぎがない）/ 502 ai（AI の失敗）/ 503 busy（AI が混んでいる）
// ・会話の中身はログに書かない（console に出すのは失敗の種類だけ）
// ・聞き取り（2026.10 追加）：POST /stt?lang=ja|ko|en、中身は WAV（16kHz・モノラル）の音声そのもの（最長60秒・2.5MB まで）
//   Workers AI の Whisper（@cf/openai/whisper-large-v3-turbo）で文字にして {text:'…'} を返す。音声は保存しない
//   ブラウザの聞き取りより正確（とくに日本語・韓国語・専門用語）。無料の分は会話と共通（1分の音声で約 0.0005 ドル相当）

const DEFAULT_ORIGINS = ['https://ocw-1027.github.io'];
const DEFAULT_MODEL = '@cf/qwen/qwen3-30b-a3b-fp8';
const ALLOWED_MODELS = ['@cf/qwen/qwen3-30b-a3b-fp8', '@cf/google/gemma-3-12b-it', '@cf/openai/gpt-oss-120b'];
const MAX_MESSAGES = 16;
const MAX_CHARS = 1200;          // user / assistant の1件
const MAX_SYSTEM_CHARS = 3000;   // 最初の system（ページの作るプロンプト）
const MAX_BODY = 64 * 1024;      // 受け取る大きさの上限（バイト）
const MAX_TOKENS = 400;          // qwen・gemma
const MAX_TOKENS_GPT_OSS = 1000; // gpt-oss（考える部分＋答え）
const EFFORTS = ['low', 'medium', 'high'];
const RESPONSES_PAUSE = 10 * 60000; // Responses の形が通らなかったら、この間は messages の形だけを使う
let responsesNg = 0;             // 最後に Responses の形が通らなかった時刻
const PER_MINUTE = 20;           // RL のつなぎがないときの、1つの IP の1分あたりの回数

const STT_MODEL = '@cf/openai/whisper-large-v3-turbo';
const STT_LANGS = ['ja', 'ko', 'en'];
const MAX_AUDIO = 2600 * 1024;   // 60秒の 16kHz・16bit・モノラル WAV ≒ 1.9MB
// 無音のときに Whisper がよく作る決まり文句（これだけのときは「聞き取れなかった」にする）
const STT_JUNK = /^(ご視聴(いただき)?ありがとうございました|チャンネル登録(よろしくお願いします|をお願いします)?|시청해\s*주셔서\s*감사합니다|구독과\s*좋아요(\s*부탁드립니다)?|thanks for watching!?|thank you for watching\.?)[。.!！\s]*$/i;

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

function isGptOss(model) { return /gpt-oss/i.test(String(model || '')); }
function maxTokensFor(model) { return isGptOss(model) ? MAX_TOKENS_GPT_OSS : MAX_TOKENS; }
function effortOf(env) {
  const v = String((env && env.REASONING_EFFORT) || 'low').trim().toLowerCase();
  return v === 'off' ? '' : (EFFORTS.includes(v) ? v : 'low');
}

// Qwen3 は「考える」部分を出すことがあるので、/no_think で止める（費用と時間の節約）
// gpt-oss は system の頭に「Reasoning: low」（OpenAI のモデルの説明にある書き方）も入れておく（messages の形で送るときの助け）
function prepare(messages, model, effort) {
  const m = messages.map(x => ({ role: x.role, content: x.content }));
  if (/qwen3/i.test(model)) {
    if (m[0].role === 'system') m[0].content += '\n/no_think';
    else m.unshift({ role: 'system', content: '/no_think' });
  }
  if (isGptOss(model) && effort && !/^Reasoning:/i.test(m[0].content)) {
    if (m[0].role === 'system') m[0].content = 'Reasoning: ' + effort + '\n' + m[0].content;
    else m.unshift({ role: 'system', content: 'Reasoning: ' + effort });
  }
  return m;
}

// Workers AI に渡す中身。shape 'responses'＝Responses API の形、'chat'＝messages の形
function aiInput(messages, model, shape, effort) {
  const msgs = prepare(messages, model, effort);
  if (shape === 'responses') return { input: msgs, reasoning: { effort: effort || 'low' }, max_output_tokens: maxTokensFor(model), temperature: 0.7 };
  return { messages: msgs, max_tokens: maxTokensFor(model), temperature: 0.7 };
}

// AI を呼んで、文だけを返す。gpt-oss は Responses の形 → だめなら messages の形（1回だけ）
async function runAI(env, model, messages) {
  const effort = isGptOss(model) ? effortOf(env) : '';
  if (effort && Date.now() - responsesNg > RESPONSES_PAUSE) {
    let text = '';
    try { text = cleanText(await env.AI.run(model, aiInput(messages, model, 'responses', effort))); }
    catch (e) {
      const c = classify(e);
      if (c.error !== 'ai') throw e;          // quota・busy はそのまま知らせる（送り直さない）
      responsesNg = Date.now();
      console.log('talk-ai: responses_shape');
    }
    if (text) return text;
  }
  return cleanText(await env.AI.run(model, aiInput(messages, model, 'chat', effort)));
}

// Workers AI の答えの形はモデルでちがうので、最後の答えの文だけを取り出す
// （gpt-oss の考えた中身：choices[0].message.reasoning_content / reasoning、output の type:'reasoning'、summary は使わない）
function partsText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  const out = [];
  for (const p of content) {
    if (typeof p === 'string') out.push(p);
    else if (p && typeof p.text === 'string' && !/reasoning|summary/i.test(String(p.type || ''))) out.push(p.text);
  }
  return out.join('');
}
function textOf(r) {
  if (r == null) return '';
  if (typeof r === 'string') return r;
  if (typeof r.response === 'string') return r.response;
  if (r.response && typeof r.response === 'object') return textOf(r.response);
  if (r.result && typeof r.result === 'object') return textOf(r.result);
  const c = Array.isArray(r.choices) && r.choices[0];
  if (c) {
    if (c.message) { const t = partsText(c.message.content); if (t) return t; }
    if (typeof c.text === 'string') return c.text;
    return '';
  }
  if (Array.isArray(r.output)) {
    const parts = [];
    for (const o of r.output) if (o && o.type === 'message' && (!o.role || o.role === 'assistant')) { const t = partsText(o.content); if (t) parts.push(t); }
    if (parts.length) return parts.join('\n');
  }
  if (typeof r.output_text === 'string') return r.output_text;
  return '';
}

// gpt-oss の生の書式（<|channel|>final<|message|> など）が混ざったときは、final の部分だけにする
function stripHarmony(s) {
  s = String(s || '');
  if (!/<\|(channel|message|start|end|return)\|>/.test(s)) return s;
  const i = s.lastIndexOf('<|channel|>final<|message|>');
  if (i >= 0) s = s.slice(i + '<|channel|>final<|message|>'.length);
  else if (/<\|channel\|>analysis/.test(s)) return '';
  return s.replace(/<\|[a-z_]+\|>/g, '').trim();
}
function cleanText(r) { return stripThink(stripHarmony(textOf(r))); }

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

function b64(buf) {
  const u = new Uint8Array(buf); let s = '';
  for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return btoa(s);
}

// 聞き取り：WAV を受け取り Whisper で文字にする
async function stt(request, env, url, allow) {
  const lang = String(url.searchParams.get('lang') || '').toLowerCase();
  if (!STT_LANGS.includes(lang)) return json({ error: 'bad_request', detail: 'lang must be ja, ko or en' }, 400, allow);
  const len = +(request.headers.get('Content-Length') || 0);
  if (len > MAX_AUDIO) return json({ error: 'too_large' }, 413, allow);
  let buf;
  try { buf = await request.arrayBuffer(); } catch (e) { return json({ error: 'bad_request' }, 400, allow); }
  if (buf.byteLength > MAX_AUDIO) return json({ error: 'too_large' }, 413, allow);
  const h = new Uint8Array(buf, 0, Math.min(12, buf.byteLength));
  if (buf.byteLength < 1000 || String.fromCharCode(h[0], h[1], h[2], h[3]) !== 'RIFF' || String.fromCharCode(h[8], h[9], h[10], h[11]) !== 'WAVE') return json({ error: 'bad_request', detail: 'audio must be WAV' }, 400, allow);
  if (!(await rateOk(request, env))) return json({ error: 'rate' }, 429, allow);
  if (!env || !env.AI || typeof env.AI.run !== 'function') { console.log('talk-ai: no AI binding'); return json({ error: 'config' }, 500, allow); }
  const audio = b64(buf);
  const full = { audio, task: 'transcribe', language: lang, vad_filter: true, condition_on_previous_text: false };
  let r;
  try {
    try { r = await env.AI.run(STT_MODEL, full); }
    catch (e) { if (classify(e).error !== 'ai') throw e; console.log('talk-ai: stt_retry'); r = await env.AI.run(STT_MODEL, { audio, language: lang }); }
  } catch (e) {
    const c = classify(e); console.log('talk-ai: stt_' + c.error);
    return json({ error: c.error }, c.status, allow);
  }
  let text = String((r && (r.text || (r.transcription_info && r.transcription_info.text))) || '').replace(/\s+/g, ' ').trim();
  if (lang === 'ja') text = text.replace(/([^\x00-\x7F])\s+(?=[^\x00-\x7F])/g, '$1');   // 日本語の文字の間の空白を取る
  if (STT_JUNK.test(text)) text = '';
  return json({ text }, 200, allow);
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
      return json({ ok: true, service: 'talk-ai', stt: true, ai: !!(env && env.AI), model: (env && env.MODEL) || DEFAULT_MODEL, origins: allowedOrigins(env) }, 200, allow);
    }
    if (request.method !== 'POST') return json({ error: 'method' }, 405, allow);
    if (!ok) return json({ error: 'origin' }, 403, '');
    const url = new URL(request.url);
    if (url.pathname.replace(/\/+$/, '') === '/stt') return stt(request, env, url, allow);
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
      const text = await runAI(env, v.model, v.messages);
      if (!text) return json({ error: 'empty' }, 502, allow);
      return json({ text, model: v.model }, 200, allow);
    } catch (e) {
      const c = classify(e);
      console.log('talk-ai: ' + c.error);   // 中身は書かない
      return json({ error: c.error }, c.status, allow);
    }
  },
};
