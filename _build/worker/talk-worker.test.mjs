// talk-worker.js の確かめ（Cloudflare なしで、AI のつなぎを偽物にして動かす）
// 使い方：node _build/worker/talk-worker.test.mjs _build/worker/talk-worker.js
import fs from 'fs';
import vm from 'vm';
import assert from 'assert';
const src = fs.readFileSync(process.argv[2], 'utf8');
const code = src.replace(/^export default \{/m, 'const __default = {') + '\n;({validate,prepare,textOf,stripThink,stripHarmony,cleanText,aiInput,maxTokensFor,effortOf,classify,originOk,allowedOrigins,worker:__default});';
const logs = [];
const load = () => vm.runInContext(code, vm.createContext({ Response, Headers, Request, JSON, Date, Map, console: { log: (...a) => logs.push(a.join(' ')) }, String, Array, Object, Math }));
const W = load();
let n = 0; const ok = (c, m) => { assert.ok(c, m); n++; };

// validate
const sys = { role: 'system', content: 'sys' }, u = c => ({ role: 'user', content: c }), a = c => ({ role: 'assistant', content: c });
ok(!W.validate({ messages: [sys, u('hi')] }, {}).error, 'basic ok');
ok(W.validate({ messages: [sys, u('hi')] }, {}).model === '@cf/qwen/qwen3-30b-a3b-fp8', 'default model');
ok(W.validate({ messages: [u('hi')], model: '@cf/google/gemma-3-12b-it' }, {}).model === '@cf/google/gemma-3-12b-it', 'allowed model');
ok(W.validate({ messages: [u('hi')], model: '@cf/meta/llama-x' }, {}).error === 'bad_request', 'model not allowed');
ok(W.validate({ messages: [u('hi')], model: 5 }, {}).error === 'bad_request', 'model type');
ok(W.validate(null, {}).error === 'bad_request', 'null body');
ok(W.validate([], {}).error === 'bad_request', 'array body');
ok(W.validate({ messages: [] }, {}).error === 'bad_request', 'empty msgs');
const many = [sys]; for (let i = 0; i < 16; i++) many.push(i % 2 ? a('x') : u('x'));
ok(W.validate({ messages: many }, {}).status === 413, '17 messages rejected');
ok(!W.validate({ messages: many.slice(0, 16) }, {}).error, '16 messages ok');
ok(W.validate({ messages: [sys, u('x'.repeat(1201))] }, {}).status === 413, 'user > 1200');
ok(!W.validate({ messages: [sys, u('x'.repeat(1200))] }, {}).error, 'user = 1200');
ok(!W.validate({ messages: [{ role: 'system', content: 'y'.repeat(3000) }, u('x')] }, {}).error, 'system 3000 ok');
ok(W.validate({ messages: [{ role: 'system', content: 'y'.repeat(3001) }, u('x')] }, {}).status === 413, 'system > 3000');
ok(W.validate({ messages: [u('x'), sys] }, {}).error === 'bad_request', 'system not first');
ok(W.validate({ messages: [{ role: 'tool', content: 'x' }] }, {}).error === 'bad_request', 'bad role');
ok(W.validate({ messages: [sys, a('x')] }, {}).error === 'bad_request', 'no user');
ok(W.validate({ messages: [sys, u('   ')] }, {}).error === 'bad_request', 'blank');
ok(W.validate({ messages: [sys, { role: 'user', content: 5 }] }, {}).error === 'bad_request', 'content type');
// prepare
ok(/\/no_think$/.test(W.prepare([sys, u('x')], '@cf/qwen/qwen3-30b-a3b-fp8')[0].content), 'no_think added');
ok(W.prepare([sys, u('x')], '@cf/google/gemma-3-12b-it')[0].content === 'sys', 'no_think only for qwen3');
ok(W.prepare([u('x')], '@cf/qwen/qwen3-30b-a3b-fp8')[0].role === 'system', 'system inserted');
// textOf / stripThink
ok(W.textOf({ response: 'a' }) === 'a', 'response field');
ok(W.textOf({ choices: [{ message: { content: 'b' } }] }) === 'b', 'choices');
ok(W.textOf({ output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: 'c' }] }] }) === 'c', 'responses api');
ok(W.stripThink('<think>hmm</think>\n{"reply":"x"}') === '{"reply":"x"}', 'strip think');
ok(W.stripThink('hmm</think>{"reply":"x"}') === '{"reply":"x"}', 'strip open-less think');
ok(W.stripThink('<think>never closed') === '', 'strip unclosed');
// classify
ok(W.classify(new Error('3036: You have used up your daily free allocation of 10,000 neurons')).error === 'quota', 'quota');
ok(W.classify(new Error('AiError: 4006: you have used up your daily free allocation of 10,000 neurons')).status === 429, 'quota 4006');
ok(W.classify(new Error('3040: Capacity temporarily exceeded')).error === 'busy', 'busy');
ok(W.classify(new Error('boom')).error === 'ai', 'other');
// origins
ok(W.originOk('https://ocw-1027.github.io', {}), 'default origin');
ok(!W.originOk('https://evil.example', {}), 'other origin');
ok(W.originOk('http://localhost:8808', {}), 'localhost');
ok(!W.originOk('http://localhost:8808', { ALLOW_LOCALHOST: 'false' }), 'localhost off');
ok(W.originOk('https://a.example', { ALLOWED_ORIGINS: 'https://a.example/, https://b.example' }), 'custom list');
ok(!W.originOk('https://ocw-1027.github.io', { ALLOWED_ORIGINS: 'https://a.example' }), 'custom replaces default');
ok(!W.originOk('', {}), 'no origin');

// fetch handler end-to-end with stub AI
const seen = [];
const env = { AI: { run: async (model, opts) => { seen.push({ model, opts }); return { choices: [{ message: { content: '<think>x</think>{"reply":"こんにちは","reading":"こんにちは","fix":"","hints":["a","b"]}' } }] }; } } };
const req = (method, body, origin = 'https://ocw-1027.github.io', hdr = {}) => new Request('https://w.example/', { method, headers: Object.assign({ 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': '1.2.3.4' }, hdr), body: body == null ? undefined : (typeof body === 'string' ? body : JSON.stringify(body)) });
let r = await W.worker.fetch(req('OPTIONS'), env); ok(r.status === 204 && r.headers.get('Access-Control-Allow-Origin') === 'https://ocw-1027.github.io', 'preflight');
r = await W.worker.fetch(req('OPTIONS', null, 'https://evil.example'), env); ok(r.status === 403 && !r.headers.get('Access-Control-Allow-Origin'), 'preflight denied');
r = await W.worker.fetch(req('POST', { messages: [sys, u('秘密の内容')] }), env); let j = await r.json();
ok(r.status === 200 && j.text.startsWith('{"reply":"こんにちは"'), 'post ok, think stripped');
ok(seen[0].opts.max_tokens === 400 && /\/no_think/.test(seen[0].opts.messages[0].content), 'max_tokens and no_think sent');
ok(r.headers.get('Access-Control-Allow-Origin') === 'https://ocw-1027.github.io', 'cors header on post');
r = await W.worker.fetch(req('POST', { messages: [sys, u('x')] }, 'https://evil.example'), env); ok(r.status === 403 && (await r.json()).error === 'origin', 'post wrong origin');
r = await W.worker.fetch(req('POST', '{bad'), env); ok(r.status === 400, 'bad json');
r = await W.worker.fetch(req('POST', { messages: [sys, u('x')], model: '@cf/x/y' }), env); ok(r.status === 400 && (await r.json()).detail === 'model not allowed', 'bad model via fetch');
r = await W.worker.fetch(req('PUT', { messages: [] }), env); ok(r.status === 405, 'method');
r = await W.worker.fetch(req('GET'), env); j = await r.json(); ok(r.status === 200 && j.ok && j.ai === true, 'health');
r = await W.worker.fetch(req('POST', 'x'.repeat(70000)), env); ok(r.status === 413, 'body too large');
r = await W.worker.fetch(req('POST', { messages: [sys, u('x')] }), {}); ok(r.status === 500 && (await r.json()).error === 'config', 'no binding');
r = await W.worker.fetch(req('POST', { messages: [sys, u('x')] }), { AI: { run: async () => { throw new Error('3036: You have used up your daily free allocation of 10,000 neurons') } } });
ok(r.status === 429 && (await r.json()).error === 'quota', 'quota via fetch');
r = await W.worker.fetch(req('POST', { messages: [sys, u('x')] }), { AI: { run: async () => ({ response: '<think>only thinking</think>' }) } });
ok(r.status === 502 && (await r.json()).error === 'empty', 'empty');
// rate limit binding
r = await W.worker.fetch(req('POST', { messages: [sys, u('x')] }), Object.assign({}, env, { RL: { limit: async () => ({ success: false }) } }));
ok(r.status === 429 && (await r.json()).error === 'rate', 'RL binding');
// in-memory limiter: 20/min per IP (new IP)
let last;
for (let i = 0; i < 21; i++) last = await W.worker.fetch(req('POST', { messages: [sys, u('x')] }, undefined, { 'CF-Connecting-IP': '9.9.9.9' }), env);
ok(last.status === 429, 'in-memory limiter kicks in at 21st');
// ── gpt-oss（2026.10）──
const OSS = '@cf/openai/gpt-oss-120b';
ok(W.maxTokensFor(OSS) === 1000 && W.maxTokensFor('@cf/qwen/qwen3-30b-a3b-fp8') === 400 && W.maxTokensFor('@cf/google/gemma-3-12b-it') === 400, 'max tokens per model');
ok(W.effortOf({}) === 'low' && W.effortOf({ REASONING_EFFORT: 'High' }) === 'high' && W.effortOf({ REASONING_EFFORT: 'off' }) === '' && W.effortOf({ REASONING_EFFORT: 'x' }) === 'low', 'effortOf');
let inp = W.aiInput([sys, u('x')], OSS, 'responses', 'low');
ok(inp.reasoning.effort === 'low' && Array.isArray(inp.input) && !inp.messages && inp.max_output_tokens === 1000, 'responses shape');
ok(/^Reasoning: low\n/.test(inp.input[0].content) && inp.input[0].role === 'system', 'Reasoning line in system');
inp = W.aiInput([sys, u('x')], OSS, 'chat', 'low');
ok(Array.isArray(inp.messages) && !inp.input && !inp.reasoning && inp.max_tokens === 1000, 'chat shape for gpt-oss');
inp = W.aiInput([sys, u('x')], OSS, 'chat', '');
ok(inp.messages[0].content === 'sys', 'no Reasoning line when effort off');
ok(W.prepare([u('x')], OSS, 'low')[0].content === 'Reasoning: low', 'system inserted for gpt-oss');
ok(W.prepare([{ role: 'system', content: 'Reasoning: low\nsys' }, u('x')], OSS, 'low')[0].content === 'Reasoning: low\nsys', 'not added twice');
ok(!/Reasoning/.test(W.aiInput([sys, u('x')], '@cf/qwen/qwen3-30b-a3b-fp8', 'chat', '').messages[0].content), 'qwen: no Reasoning line');
// textOf: answer only, never the reasoning
ok(W.textOf({ choices: [{ message: { content: '{"reply":"a"}', reasoning_content: 'thinking…' } }] }) === '{"reply":"a"}', 'chat: content, not reasoning_content');
ok(W.textOf({ choices: [{ message: { content: null, reasoning_content: 'thinking…' }, finish_reason: 'length' }] }) === '', 'chat: only reasoning -> empty');
ok(W.textOf({ choices: [{ message: { content: [{ type: 'text', text: 'x' }, { type: 'reasoning', text: 'no' }] } }] }) === 'x', 'chat: content parts');
const respOut = { output: [{ type: 'reasoning', content: [{ type: 'reasoning_text', text: 'I think' }], summary: [{ type: 'summary_text', text: 'sum' }] }, { type: 'message', role: 'assistant', content: [{ type: 'output_text', text: '{"reply":"ok"}' }] }] };
ok(W.textOf(respOut) === '{"reply":"ok"}', 'responses: message only');
ok(W.textOf({ output: [{ type: 'reasoning', content: [{ type: 'reasoning_text', text: 'I think' }] }] }) === '', 'responses: reasoning only -> empty');
ok(W.textOf({ output_text: 'z', output: [] }) === 'z', 'output_text');
ok(W.textOf({ result: { response: 'r' } }) === 'r', 'result wrapper');
ok(W.stripHarmony('<|channel|>analysis<|message|>hmm<|end|><|start|>assistant<|channel|>final<|message|>{"reply":"x"}<|return|>') === '{"reply":"x"}', 'harmony final');
ok(W.stripHarmony('<|channel|>analysis<|message|>hmm') === '', 'harmony analysis only');
ok(W.stripHarmony('plain {"reply":"x"}') === 'plain {"reply":"x"}', 'no harmony untouched');
// fetch with gpt-oss: Responses shape first
const ossBody = { messages: [sys, u('こんにちは')], model: OSS };
{
  const W2 = load(), calls = [];
  const e2 = { AI: { run: async (m, o) => { calls.push(o); return respOut; } } };
  const r2 = await W2.worker.fetch(req('POST', ossBody, undefined, { 'CF-Connecting-IP': '5.5.5.1' }), e2); const j2 = await r2.json();
  ok(r2.status === 200 && j2.text === '{"reply":"ok"}' && calls.length === 1 && calls[0].reasoning.effort === 'low' && calls[0].max_output_tokens === 1000, 'gpt-oss responses ok in one call');
}
{
  const W2 = load(), calls = [];
  const e2 = { AI: { run: async (m, o) => { calls.push(o); if (o.input) throw new Error('5006: Error: oneOf at \'/\' not met, 0 matches'); return { choices: [{ message: { content: '{"reply":"chat"}', reasoning_content: 'x' } }] }; } } };
  let r2 = await W2.worker.fetch(req('POST', ossBody, undefined, { 'CF-Connecting-IP': '5.5.5.2' }), e2); let j2 = await r2.json();
  ok(r2.status === 200 && j2.text === '{"reply":"chat"}' && calls.length === 2 && calls[1].messages && calls[1].max_tokens === 1000, 'responses rejected -> messages shape');
  r2 = await W2.worker.fetch(req('POST', ossBody, undefined, { 'CF-Connecting-IP': '5.5.5.2' }), e2); j2 = await r2.json();
  ok(r2.status === 200 && calls.length === 3 && calls[2].messages, 'after a rejection, messages shape only (pause)');
}
{
  const W2 = load(), calls = [];
  const e2 = { AI: { run: async (m, o) => { calls.push(o); return o.input ? { output: [{ type: 'reasoning', content: [{ type: 'reasoning_text', text: 'long…' }] }], status: 'incomplete' } : { choices: [{ message: { content: '{"reply":"b"}' } }] }; } } };
  const r2 = await W2.worker.fetch(req('POST', ossBody, undefined, { 'CF-Connecting-IP': '5.5.5.3' }), e2); const j2 = await r2.json();
  ok(r2.status === 200 && j2.text === '{"reply":"b"}' && calls.length === 2, 'responses empty -> messages shape once');
}
{
  const W2 = load(), calls = [];
  const e2 = { AI: { run: async (m, o) => { calls.push(o); throw new Error('3036: You have used up your daily free allocation of 10,000 neurons'); } } };
  const r2 = await W2.worker.fetch(req('POST', ossBody, undefined, { 'CF-Connecting-IP': '5.5.5.4' }), e2);
  ok(r2.status === 429 && (await r2.json()).error === 'quota' && calls.length === 1, 'quota: no second call');
}
{
  const W2 = load(), calls = [];
  const e2 = { REASONING_EFFORT: 'off', AI: { run: async (m, o) => { calls.push(o); return { choices: [{ message: { content: '{"reply":"c"}' } }] }; } } };
  const r2 = await W2.worker.fetch(req('POST', ossBody, undefined, { 'CF-Connecting-IP': '5.5.5.5' }), e2);
  ok(r2.status === 200 && calls.length === 1 && calls[0].messages && !calls[0].reasoning, 'REASONING_EFFORT=off: messages only');
}
{
  const W2 = load();
  const e2 = { AI: { run: async () => ({ choices: [{ message: { content: null, reasoning_content: 'only thinking' } }] }) } };
  const r2 = await W2.worker.fetch(req('POST', ossBody, undefined, { 'CF-Connecting-IP': '5.5.5.6' }), e2);
  ok(r2.status === 502 && (await r2.json()).error === 'empty', 'both shapes empty -> empty');
}
// logs never contain content
ok(!logs.join('\n').includes('秘密') && logs.every(l => /^talk-ai: [\w ]+$/.test(l)), 'no content in logs: ' + JSON.stringify(logs));
console.log('worker tests passed:', n);
