// 定期点検：今月やることを出す（T-23, 2026.11）。予定は _build/schedule.json。
// 使い方: node _build/due.mjs [YYYY-MM]   （省略すると日本時間の今月）
// ビルド（build.mjs）の最後にも短く表示する。ビルドは止めない。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { airacDates } from './aip_refs.mjs';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function dueItems(ym) {
  const sch = JSON.parse(fs.readFileSync(path.join(ROOT, '_build/schedule.json'), 'utf8'));
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, '_build/aip_refs.json'), 'utf8'));
  const [y, m] = ym.split('-').map(Number);
  const first = `${ym}-01`, last = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
  const ac = airacDates(reg.airac_base, first, 3).filter(d => d >= first && d <= last);
  const out = [];
  for (const it of sch.items) {
    const c = it.cycle;
    const hit = c === 'weekly' || c === 'monthly' || (c === 'quarterly' && [1, 4, 7, 10].includes(m)) ||
      (c === 'yearly' && (it.months || []).includes(m)) || (c === 'airac' && ac.length);
    if (hit) out.push({ ...it, note: c === 'airac' ? `AIRAC ${ac.join('・')}` : '' });
  }
  return { ym, airac: ac, items: out };
}

export function dueText(ym) {
  const r = dueItems(ym);
  return `📅 ${r.ym} の定期点検 ${r.items.length}件（_build/schedule.json）:\n  ` +
    r.items.map(i => `${i.id} ${i.title}${i.note ? '（' + i.note + '）' : ''}`).join('\n  ');
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const ym = process.argv[2] || new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 7);
  console.log(dueText(ym));
  const r = dueItems(ym);
  for (const i of r.items) console.log(`\n- [ ] ${i.id} ${i.title}${i.note ? '（' + i.note + '）' : ''}\n      場所: ${i.where}`);
}
