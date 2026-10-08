// 公開サイトの住所を英語にする（2026.10）
// 元のフォルダ・ファイル（PC の「콘텐츠」）の名前はそのまま。ビルドの最後に、出力（_site）の中だけで
//   ① フォルダとファイルの名前を英語に変える
//   ② すべての .html .js .css .xml .json の中の古い名前を新しい名前に書き換える
//      （そのままの文字・%エンコード・JS の \uXXXX の3通り。ツールの名前は '…' "…" で囲まれた拡張子なしの形も）
//   ③ 古い住所には、新しい住所へ自動で移るページを残す（共有済みのリンクが切れないように）
// フォルダは1段のまま（相対リンク ../ がそのまま使える）。新しいフォルダを足したら DIRS に1行加える
import fs from 'fs';
import path from 'path';

export const DIRS = {
  '8_사이트': 'site',
  '18_항공기초지식': 'basics',
  '1_지상직여객운송입문': 'passenger',
  '6_항공화물입문': 'cargo',
  '19_운항관리실무': 'dispatch',
  '25_항공기와정비': 'maintenance',
  '13_항공영업입문': 'sales',
  '16_스테이션운영실무': 'station-management',
  '2_일본취항지점개설가이드': 'station-launch',
  '24_CIQ실무': 'ciq',
  '3_현장사례': 'field-cases',
  '5_면접대비가이드': 'interview',
  '17_일본주요공항가이드': 'airports-japan',
  '21_한국주요공항가이드': 'airports-korea',
  '20_세계주요공항가이드': 'airports-world',
  '11_주재원일본가이드': 'living-in-japan',
  '12_일본지점인사재무실무': 'hr-admin-finance',
  '23_재무3표실무': 'finance',
  '15_지점장인수인계가이드': 'manager-handover',
  '22_学科試験過去問': 'exams',
  '4_공항안내방송예문집': 'announcements',
  '10_공항양식해설집': 'airport-forms',
  '14_승객FAQ': 'passenger-faq',
  '7_구인게재_기업용': 'employers',
};
// ファイル（元のフォルダ/元の名前 → 新しい名前）。講座の目次 00_シリーズ全体_*.html は自動で index.html
export const FILES = {
  '1_지상직여객운송입문/搭載計算の練習.html': 'load-control.html',
  '13_항공영업입문/収益管理の練習.html': 'revenue-management.html',
  '18_항공기초지식/航空路図の練習.html': 'dispatch-practice.html',
  '2_일본취항지점개설가이드/燃油サーチャージ計算.html': 'fuel-surcharge.html',
  '23_재무3표실무/取引と財務諸表の練習.html': 'transactions.html',
  '23_재무3표실무/財務諸表の連動シミュレーター.html': 'statements-simulator.html',
  '23_재무3표실무/航空原価計算の練習.html': 'airline-cost.html',
  '23_재무3표실무/航空会社経営シミュレーション.html': 'airline-management.html',
  '23_재무3표실무/財務比率の計算練習.html': 'financial-ratios.html',
  '23_재무3표실무/企業価値の計算練習.html': 'valuation.html',
  '23_재무3표실무/投資検討報告書の下書き.html': 'investment-memo.html',
  '12_일본지점인사재무실무/決算の練習.html': 'year-end-closing.html',
  '5_면접대비가이드/ストーリー設計シート.html': 'story-sheet.html',
  '22_学科試験過去問/学科試験_過去問.html': 'japan-exam.html',
  '22_学科試験過去問/운항관리사_연습문제.html': 'korea-dispatcher.html',
  '4_공항안내방송예문집/空港アナウンス文例集.html': 'index.html',
  '10_공항양식해설집/空港で使う書類と様式.html': 'index.html',
  '14_승객FAQ/よくある質問_空港と飛行機.html': 'index.html',
  '7_구인게재_기업용/求人掲載のご案内.html': 'index.html',
  '航空コード辞典.html': 'codes.html',
  '遅延コード一覧_IATA.html': 'delay-codes.html',
  '用語集_航空用語.html': 'glossary.html',
  '確認クイズ_航空の仕事.html': 'quiz.html',
};

const TEXT = /\.(html|js|css|xml|json|txt)$/i;
const enc = s => encodeURIComponent(s);
const uesc = (s, up) => s.replace(/[^\x00-\x7f]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')[up ? 'toUpperCase' : 'toLowerCase']());

export function englishUrls(OUT) {
  // 1) 講座の目次（00_シリーズ全体_*.html）を FILES に加える
  const files = { ...FILES };
  for (const d of Object.keys(DIRS)) {
    const dir = path.join(OUT, d);
    if (!fs.existsSync(dir)) continue;
    for (const n of fs.readdirSync(dir)) if (/^00_.*\.html$/.test(n)) files[`${d}/${n}`] = 'index.html';
  }
  // 2) 置き換えの表（長いものから）
  const pairs = [];
  const add = (a, b) => { if (a && a !== b) pairs.push([a, b]); };
  for (const [k, v] of Object.entries(files)) {
    const old = k.split('/').pop(), nu = v;
    add(old, nu); add(enc(old), nu); add(uesc(old, false), nu); add(uesc(old, true), nu);
    const ob = old.replace(/\.html$/, ''), nb = nu.replace(/\.html$/, '');
    for (const q of ["'", '"']) add(q + ob + q, q + nb + q);
  }
  for (const [k, v] of Object.entries(DIRS)) { add(k, v); add(enc(k), v); add(uesc(k, false), v); add(uesc(k, true), v); }
  // 同じ置き換え元が重ならないように（目次のファイル名はフォルダごとに違う）
  const map = new Map(); for (const [a, b] of pairs) if (!map.has(a)) map.set(a, b);
  const keys = [...map.keys()].sort((a, b) => b.length - a.length);
  const re = new RegExp(keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');

  // 3) 古い HTML の場所を覚えておく（あとで移動のページを作る）
  const moved = []; // [古い相対パス, 新しい相対パス]
  const newPathOf = rel => {
    const parts = rel.split('/');
    if (files[rel]) parts[parts.length - 1] = files[rel];
    if (DIRS[parts[0]]) parts[0] = DIRS[parts[0]];
    return parts.join('/');
  };
  for (const d of Object.keys(DIRS)) {
    const dir = path.join(OUT, d);
    if (!fs.existsSync(dir)) continue;
    (function walk(p, rel) {
      for (const n of fs.readdirSync(p, { withFileTypes: true })) {
        const r = rel + '/' + n.name;
        if (n.isDirectory()) walk(path.join(p, n.name), r);
        else if (n.name.endsWith('.html')) moved.push([r, newPathOf(r)]);
      }
    })(dir, d);
  }
  for (const f of Object.keys(files)) if (!f.includes('/') && fs.existsSync(path.join(OUT, f))) moved.push([f, files[f]]);

  // 4) ファイルの名前を変える → フォルダの名前を変える
  for (const [k, v] of Object.entries(files)) {
    const from = path.join(OUT, k), to = path.join(path.dirname(from), v);
    if (fs.existsSync(from)) fs.renameSync(from, to);
  }
  for (const [k, v] of Object.entries(DIRS)) {
    const from = path.join(OUT, k), to = path.join(OUT, v);
    if (fs.existsSync(from)) fs.renameSync(from, to);
  }
  // 5) 中身の書き換え
  let changed = 0;
  (function walk(p) {
    for (const n of fs.readdirSync(p, { withFileTypes: true })) {
      const q = path.join(p, n.name);
      if (n.isDirectory()) { if (n.name !== 'node_modules') walk(q); continue; }
      if (!TEXT.test(n.name)) continue;
      const s = fs.readFileSync(q, 'utf8');
      const t = s.replace(re, m => map.get(m));
      if (t !== s) { fs.writeFileSync(q, t); changed++; }
    }
  })(OUT);
  // 6) 古い住所に、新しい住所へ移るページを置く
  for (const [o, n] of moved) {
    const op = path.join(OUT, o);
    if (fs.existsSync(op)) continue;
    fs.mkdirSync(path.dirname(op), { recursive: true });
    const depth = o.split('/').length - 1, up = '../'.repeat(depth);
    const to = up + n.split('/').map(encodeURIComponent).join('/');
    fs.writeFileSync(op, `<!DOCTYPE html>\n<html lang="ja"><head><meta charset="utf-8"><meta name="robots" content="noindex">\n<title>Aviation Career Note</title>\n<link rel="canonical" href="${to}">\n<meta http-equiv="refresh" content="0; url=${to}">\n<script>location.replace(${JSON.stringify(to)}+location.search+location.hash);</script>\n</head><body><p><a href="${to}">Aviation Career Note →</a></p></body></html>\n`);
  }
  return { renamedDirs: Object.keys(DIRS).length, renamedFiles: Object.keys(files).length, rewritten: changed, redirects: moved.length };
}
