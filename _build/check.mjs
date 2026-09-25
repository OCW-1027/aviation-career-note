// 航空キャリアノート：出来上がったサイトの検査（公開の前に自動で実行）
// 使い方: node _build/check.mjs <出力フォルダ>
// ・生成したレッスンのページのリンク先が、実際にあるか
// ・サイトマップの形が正しいか、生成したページが全部入っているか
import fs from 'fs';
import path from 'path';

const OUT = path.resolve(process.argv[2] || '_site');
const problems = [];
let pages = 0, links = 0;

for (const lang of ['ja', 'ko', 'en']) {
  const ld = path.join(OUT, lang);
  if (!fs.existsSync(ld)) { problems.push(`missing folder: ${lang}/`); continue; }
  for (const code of fs.readdirSync(ld)) for (const no of fs.readdirSync(path.join(ld, code))) {
    const f = path.join(ld, code, no, 'index.html');
    if (!fs.existsSync(f)) continue;
    pages++;
    const html = fs.readFileSync(f, 'utf8');
    const base = (html.match(/<base href="([^"]+)">/) || [])[1];
    if (!base) { problems.push(`${lang}/${code}/${no}: no <base>`); continue; }
    if (!/<link rel="canonical"/.test(html)) problems.push(`${lang}/${code}/${no}: no canonical`);
    const baseDir = path.resolve(path.dirname(f), base);
    const main = html.split('<main id="main">')[1] || '';
    if (main.length < 300) problems.push(`${lang}/${code}/${no}: empty main`);
    for (const m of main.matchAll(/<a [^>]*href="([^"#]+)"/g)) {
      const h = m[1];
      if (/^(https?:|mailto:|tel:)/.test(h)) continue;
      let t = path.resolve(baseDir, decodeURIComponent(h.split('?')[0]));
      if (h.endsWith('/')) t = path.join(t, 'index.html');
      links++;
      if (!fs.existsSync(t)) problems.push(`${lang}/${code}/${no}: broken link -> ${h}`);
    }
  }
}

const sm = path.join(OUT, 'sitemap.xml');
if (!fs.existsSync(sm)) problems.push('sitemap.xml missing');
else {
  const x = fs.readFileSync(sm, 'utf8');
  const n = (x.match(/<url>/g) || []).length;
  if (!/^<\?xml[\s\S]*<urlset[\s\S]*<\/urlset>\s*$/.test(x)) problems.push('sitemap.xml malformed');
  if (n < pages) problems.push(`sitemap has ${n} urls but ${pages} lesson pages`);
}

console.log(`checked pages: ${pages}, links: ${links}, problems: ${problems.length}`);
if (problems.length) { console.log(problems.slice(0, 30).join('\n')); process.exit(1); }
