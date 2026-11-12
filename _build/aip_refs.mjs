// AIP（航空路誌）に頼っている文の一覧（_build/aip_refs.json）を点検する（T-36, 2026.11）
// 使い方:
//   node _build/aip_refs.mjs                 一覧の文がまだ原稿にあるか・照合の状態・今の AIRAC を表示
//   node _build/aip_refs.mjs --match "RJAA,ENR 1.7"   AIP の改訂で変わった章節・空港に当たる文だけを
//                                            修正依頼の下書き（Markdown）にして出す（--out ファイル名 で保存）
// 新しい AIP が来たら：Japan Key Changes（6_OTHER）で変わった空港・章節を見て --match に入れる。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reg = JSON.parse(fs.readFileSync(path.join(ROOT, '_build/aip_refs.json'), 'utf8'));
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };

// AIRAC：基準日から28日ごと
export function airacDates(base, from, n = 3) {
  const d0 = new Date(base + 'T00:00:00Z'), f = new Date(from + 'T00:00:00Z');
  let k = Math.floor((f - d0) / (28 * 864e5));
  const out = [];
  for (let i = 0; i < n + 1; i++) out.push(new Date(d0.getTime() + (k + i) * 28 * 864e5).toISOString().slice(0, 10));
  return out; // [今の AIRAC（from 以前で一番近い）, 次, その次, ...]
}

export function checkRefs() {
  const cache = {}, missing = [], pending = [];
  for (const r of reg.refs) {
    const f = path.join(ROOT, r.file);
    if (!(f in cache)) cache[f] = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
    if (cache[f] === null || !cache[f].includes(r.anchor)) missing.push(r);
    if (r.checked === '未照合') pending.push(r);
  }
  return { total: reg.refs.length, missing, pending };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  const ac = airacDates(reg.airac_base, today);
  const m = arg('--match');
  if (m) {
    const keys = m.split(',').map(s => s.trim()).filter(Boolean);
    const hit = reg.refs.filter(r => keys.some(k => (r.aip + ' ' + r.id + ' ' + r.course).includes(k)));
    const md = [`# AIP 改訂の照合 — ${today}（AIRAC ${ac[0]}）`, '', `改訂で変わった所: ${keys.join(' / ')}`, '',
      '| ID | 講座・レッスン | 原稿 | 今の文（一部） | 根拠 | 前に照合した版 | 結果 |', '|---|---|---|---|---|---|---|',
      ...hit.map(r => `| ${r.id} | ${r.course} ${r.lesson} | ${r.file} | ${r.anchor.replace(/\|/g, '｜')} | ${r.aip} | ${r.checked} | （一致 / 修正: …） |`),
      '', '- 結果が「修正」のものは、日本語・韓国語・英語（en_*.js）と図（figs_gnd.js など）を一緒に直し、aip_refs.json の anchor と checked を新しくする。'].join('\n');
    const out = arg('--out'); if (out) { fs.writeFileSync(out, md); console.log('wrote ' + out + ' (' + hit.length + '件)'); } else console.log(md);
  } else {
    const r = checkRefs();
    console.log(`AIP に頼っている文: ${r.total}件 / 今の AIRAC ${ac[0]}・次 ${ac[1]}・その次 ${ac[2]}`);
    console.log(r.missing.length ? `⚠ 原稿から見つからない文 ${r.missing.length}件（文を直したら aip_refs.json の anchor も直す）:\n  ` + r.missing.map(x => `${x.id} ${x.file}`).join('\n  ') : '原稿の文はすべて見つかりました。');
    console.log(r.pending.length ? `未照合 ${r.pending.length}件: ` + r.pending.map(x => x.id).join(', ') : '未照合 0件');
  }
}
