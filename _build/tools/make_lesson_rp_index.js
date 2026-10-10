/* 講座ページ用の小さな目録 lesson_rp_index.js を作る（講座→レッスン→[id, 難易度, 題名ja/ko/en]）。
   本体（lesson_rp_g01〜g06.js、計約130KB）は会話練習ページだけで読み、講座ページはこの目録だけ読む。
   使い方：lesson_rp_g*.js を直したら、node _build/tools/make_lesson_rp_index.js を実行（2026.10.10） */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..','..');const ctx={window:{}};ctx.globalThis=ctx.window;vm.createContext(ctx);
fs.readdirSync(root).filter(n=>/^lesson_rp_g\d+\.js$/.test(n)).sort().forEach(n=>vm.runInContext(fs.readFileSync(path.join(root,n),'utf8'),ctx));
const R=ctx.window.LESSON_RP||[],IDX={};
R.forEach(r=>{((IDX[r.course]=IDX[r.course]||{})[r.lesson]=IDX[r.course][r.lesson]||[]).push([r.id,r.lv,{ja:r.title.ja,ko:r.title.ko,en:r.title.en}])});
/* 公開サイトでは講座フォルダが英語名になる（_build/english_urls.mjs の対応表）。両方の名前で引けるようにする */
const EU=fs.readFileSync(path.join(root,'_build','english_urls.mjs'),'utf8');
Object.keys(IDX).forEach(d=>{const m=EU.match(new RegExp("'"+d.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+"'\\s*:\\s*'([^'/]+)'"));if(m&&!IDX[m[1]])IDX[m[1]]=IDX[d]});
fs.writeFileSync(path.join(root,'lesson_rp_index.js'),'/* 講座ページの「AIとこの業務を練習する」用の目録。自動生成：_build/tools/make_lesson_rp_index.js（手で直さない） */\nwindow.LESSON_RP_IDX='+JSON.stringify(IDX)+';\n');
console.log('roleplays',R.length,'courses',Object.keys(IDX).length,'lessons',Object.values(IDX).reduce((a,o)=>a+Object.keys(o).length,0));
