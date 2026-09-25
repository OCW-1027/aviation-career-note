// 航空キャリアノート：静的ページの生成（レッスン × 日本語・韓国語・英語）
// 使い方: node _build/build.mjs <元のフォルダ> <出力フォルダ>
// 元の原稿（data/*.js）と表示の仕組み（article.js）はそのまま使い、
//   /ja/<講座コード>/<レッスン>/  /ko/…  /en/…  のページを作る。
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { pathToFileURL } from 'url';
import { JSDOM, ResourceLoader, VirtualConsole } from 'jsdom';

const SRC = path.resolve(process.argv[2] || '.');
const OUT = path.resolve(process.argv[3] || '_site');
const SITE = (process.env.SITE_URL || 'https://ocw-1027.github.io/aviation-career-note/').replace(/\/?$/, '/');
const ONLY = process.env.ONLY || '';          // 例 "18_항공기초지식" 試験用
const LIMIT = +(process.env.LIMIT || 0);      // 講座ごとのレッスン数の上限（試験用）
const LANGS = ['ja', 'ko', 'en'];
const SKIP = new Set(['.git', 'node_modules', '_site', '_build', '.github']);
const errors = [];

const enc = p => p.split('/').map(encodeURIComponent).join('/');
const abs = p => SITE + enc(p);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const numSort = (a, b) => { const x = String(a).split('-').map(Number), y = String(b).split('-').map(Number); return (x[0] - y[0]) || ((x[1] || 0) - (y[1] || 0)); };

// 1) 元のファイルを全部コピー（今の URL もそのまま使えるように）
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(SRC, OUT, { recursive: true, filter: s => !SKIP.has(path.basename(s)) });

// 2) 講座の設定
const hubCtx = { window: {} }; vm.createContext(hubCtx);
vm.runInContext(fs.readFileSync(path.join(SRC, '1_지상직여객운송입문/assets/hubs.js'), 'utf8'), hubCtx);
const HUBS = hubCtx.window.HUBS;

// ページの読み込み：ローカルのファイルだけ読み、外部（フォントなど）は読まない
class LocalOnly extends ResourceLoader {
  fetch(url, opts) { return url.startsWith('file:') ? super.fetch(url, opts) : Promise.resolve(Buffer.from('')); }
}
const loader = new LocalOnly();

async function prerender(html, fileUrl) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => { if (!/Not implemented|localStorage|scrollTo/.test(String(e.message))) errors.push(fileUrl + ' : ' + e.message); });
  const dom = new JSDOM(html, { url: fileUrl, runScripts: 'dangerously', resources: loader, pretendToBeVisual: true, virtualConsole: vc });
  await new Promise(r => { dom.window.addEventListener('load', () => setTimeout(r, 30)); setTimeout(r, 8000); });
  const d = dom.window.document, g = id => (d.getElementById(id) || {}).innerHTML || '';
  const out = { title: d.title, lang: d.documentElement.lang, main: g('main'), info: g('info'), h1: g('title'), sub: g('subtitle'), series: g('series'), foot: g('foot') };
  dom.window.close();
  return out;
}

const sitemap = [];
const soloPages = [];
const catalog = {};
let pages = 0;

for (const dir of Object.keys(HUBS)) {
  if (ONLY && !ONLY.split(',').includes(dir)) continue;
  const viewPath = path.join(SRC, dir, 'view.html');
  if (!fs.existsSync(viewPath)) continue;
  const tpl0 = fs.readFileSync(viewPath, 'utf8');
  const srcs = [...tpl0.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
  const dataSrcs = srcs.filter(s => s.startsWith('data/') && s !== 'data/common.js');

  // 原稿を読み込んで、レッスンを集める
  const ctx = { ARTS: {} }; ctx.window = ctx; vm.createContext(ctx);
  for (const s of dataSrcs) {
    try { vm.runInContext(fs.readFileSync(path.join(SRC, dir, s), 'utf8'), ctx, { filename: dir + '/' + s }); }
    catch (e) { errors.push(dir + '/' + s + ' : ' + e.message); }
  }
  const A = ctx.ARTS;
  let keys = Object.keys(A).filter(k => A[k] && A[k].meta && (A[k].ja || A[k].ko)).sort(numSort);
  // 単独の HTML で書いたレッスン（例：0-1_….html）も数える
  const soloFiles = fs.readdirSync(path.join(SRC, dir)).filter(n => /^\d+-\d+_.+\.html$/.test(n));
  soloFiles.forEach(n => soloPages.push(dir + '/' + n));
  catalog[dir] = { n: keys.length + soloFiles.length };
  if (LIMIT) keys = keys.slice(0, LIMIT);
  const code = String(HUBS[dir].code).toLowerCase();
  const index = {};
  keys.forEach(k => { index[k] = {}; LANGS.forEach(l => { const L = A[k][l]; if (L && L.title) index[k][l] = L.title; }); });

  // 原稿の <script src="data/…"> を外した「ひな形」
  const tpl = tpl0.replace(/<script src="data\/(?!common\.js)[^"]+"><\/script>\n?/g, '');

  for (const k of keys) {
    const lesson = JSON.stringify({ [k]: A[k] }).replace(/<\//g, '<\\/');
    for (const lang of LANGS) {
      const rel = `${lang}/${code}/${k}/`;
      const outFile = path.join(OUT, lang, code, k, 'index.html');
      const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${abs(`${l}/${code}/${k}/`)}">`).join('\n')
        + `\n<link rel="alternate" hreflang="x-default" href="${abs(`ja/${code}/${k}/`)}">`;
      const L = A[k][lang] || A[k].ja || A[k].ko;
      const desc = (L.subtitle || (L.lead && L.lead[0]) || '').slice(0, 160);
      const head = `<base href="../../../${dir}/">\n<link rel="canonical" href="${abs(rel)}">\n${alt}\n<meta name="description" content="${esc(desc)}">`;
      const st = { no: k, lang, code, root: '../', order: keys, index };
      let html = tpl
        .replace(/<meta charset="utf-8">/i, m => m + '\n' + head)
        .replace('<script>window.ARTS={};</script>', `<script>window.ARTS=${lesson};window.STATIC=${JSON.stringify(st)};</script>`);
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      const r = await prerender(html, pathToFileURL(outFile).href);
      html = html
        .replace(/<html lang="[^"]*">/, `<html lang="${r.lang || lang}">`)
        .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
        .replace('<a class="series" id="series"></a>', `<a class="series" id="series" href="${esc(A[k].meta.home || '#')}">${r.series}</a>`)
        .replace('<div class="info" id="info"></div>', `<div class="info" id="info">${r.info}</div>`)
        .replace('<h1 id="title"></h1>', `<h1 id="title">${r.h1}</h1>`)
        .replace('<p class="subtitle" id="subtitle"></p>', `<p class="subtitle" id="subtitle">${r.sub}</p>`)
        .replace('<main id="main"></main>', `<main id="main">${r.main}</main>`)
        .replace('<footer id="foot"></footer>', `<footer id="foot">${r.foot}</footer>`);
      if (!r.main || r.main.length < 300 || /<p style="padding:40px 0">Not found<\/p>/.test(r.main)) errors.push(`${rel} : empty render`);
      fs.writeFileSync(outFile, html);
      sitemap.push(rel);
      pages++;
    }
  }
  // 今までの view.html?no=… は、新しい URL へ案内する（最後に使った言語で）
  const hubFile = fs.readdirSync(path.join(SRC, dir)).find(n => /^00_.*\.html$/.test(n)) || '';
  fs.writeFileSync(path.join(OUT, dir, 'view.html'), `<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${esc(HUBS[dir].name.ja)}</title>
<script>(function(){var L=['ja','ko','en'],l='ja';try{var s=localStorage.getItem('art-lang');if(L.indexOf(s)>=0)l=s}catch(e){}
var no=new URLSearchParams(location.search).get('no'),K=${JSON.stringify(keys)};
location.replace(K.indexOf(no)>=0?'../'+l+'/${code}/'+no+'/':${JSON.stringify(hubFile)});})();</script>
</head><body><p><a href="${esc(hubFile)}">${esc(HUBS[dir].name.ja)}</a></p></body></html>
`);
  // 講座の目次ページ：公開サイトでは新しい URL にリンクする
  if (hubFile) {
    const hp = path.join(OUT, dir, hubFile);
    fs.writeFileSync(hp, fs.readFileSync(hp, 'utf8').replace(/<meta charset="utf-8">/i, m => m + '\n<script>window.STATIC_SITE=1;</script>'));
  }
  console.log(`${dir} (${code}) : ${keys.length} lessons × 3`);
}

// 3) 講座ごとのレッスン数（トップページの数を自動で合わせるため）
fs.writeFileSync(path.join(OUT, 'catalog.js'), '/* 自動生成：講座ごとのレッスン数 */\nwindow.CATALOG=' + JSON.stringify(catalog) + ';\n');

// トップページ：講座ごとのレッスン数を自動の数に置きかえる
{
  const ip = path.join(OUT, '8_사이트/index.html');
  if (fs.existsSync(ip)) fs.writeFileSync(ip, fs.readFileSync(ip, 'utf8').replace('<script src="assets/site.js"></script>',
    '<script src="../catalog.js"></script><script>(function(){if(!window.CATALOG||!window.SERIES)return;SERIES.forEach(function(s){var d=(s.p||"").split("/")[1];if(CATALOG[d])s.n=CATALOG[d].n})})();</script>\n<script src="assets/site.js"></script>'));
}

// 4) サイトマップ（新しいレッスンのURL＋講座の目次・ツールなどの主なページ）
const extra = ['8_사이트/index.html', '8_사이트/jobs.html', '8_사이트/about.html', '7_구인게재_기업용/求人掲載のご案内.html', '8_사이트/terms.html', '8_사이트/privacy.html',
  '航空コード辞典.html', '遅延コード一覧_IATA.html', '用語集_航空用語.html', '確認クイズ_航空の仕事.html',
  '1_지상직여객운송입문/搭載計算の練習.html', '4_공항안내방송예문집/空港アナウンス文例集.html', '10_공항양식해설집/空港で使う書類と様式.html', '14_승객FAQ/よくある質問_空港と飛行機.html'];
const hubsPages = Object.keys(HUBS).map(dir => { const f = fs.readdirSync(path.join(SRC, dir)).find(n => /^00_.*\.html$/.test(n)); return f ? dir + '/' + f : null; }).filter(Boolean);
const urls = [...extra.filter(p => fs.existsSync(path.join(SRC, p))), ...hubsPages, ...soloPages, ...sitemap];
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + urls.map(u => `  <url><loc>${abs(u)}</loc></url>`).join('\n') + '\n</urlset>\n');

console.log(`pages: ${pages}, sitemap urls: ${urls.length}, errors: ${errors.length}`);
if (errors.length) { console.log(errors.slice(0, 20).join('\n')); process.exitCode = 1; }
