/* 資料・ツール（ツール）ページの共通の頭の行（2026.09）
   使い方：各ページの </head> の直前に <script src="…/assets/shell.js" data-page="glossary"></script>
   ・?lang=ja|ko|en を、ページのスクリプトより先に art-lang に保存
   ・講座と同じ頭の行：［ロゴ・サイト名 → トップ］［資料・ツール › このページ］［言語ボタン（ページのものを移す）］
   ・青いカードを講座と同じ淡いカードにそろえる／スマートフォンの配置 */
(function(){
if(window.__SHELL)return;window.__SHELL=1;
var me=document.currentScript,page=(me&&me.getAttribute('data-page'))||'';
/* 2026.10 新しいトップページ（index.html）へ。ツールの一覧は #practice */
var HOME=me?new URL('../../8_\uc0ac\uc774\ud2b8/index.html',me.src).href:'#';
try{var q=new URLSearchParams(location.search).get('lang');if(q==='ja'||q==='ko'||q==='en')localStorage.setItem('art-lang',q);else if(['ja','ko','en'].indexOf(localStorage.getItem('art-lang'))<0)localStorage.setItem('art-lang',(function(){var a=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];for(var i=0;i<a.length;i++){var c=String(a[i]).toLowerCase().slice(0,2);if(c==='ko'||c==='ja'||c==='en')return c}return a.length&&a[0]?'en':'ja'})())}catch(e){} /* 言語を選んだことのない人は端末の言語（2026.10） */
/* 問題が1つの言語だけのページ（韓国・日本の試験問題）でも、上の行と下のボタンは選んだ言語で出す（2026.10） */
if({krdsp:1,kako:1}[page]){try{var ul=localStorage.getItem('art-lang');if(ul)document.documentElement.setAttribute('data-ui',ul)}catch(e){}}
var SITE={ja:'\u822a\u7a7a\u30ad\u30e3\u30ea\u30a2\u30ce\u30fc\u30c8',ko:'\ud56d\uacf5 \ucee4\ub9ac\uc5b4 \ub178\ud2b8',en:'Aviation Career Note'};
var LIB={ja:'\u8cc7\u6599\u30fb\u30c4\u30fc\u30eb',ko:'\uc790\ub8cc\uc2e4',en:'Resources'};
var NAME={talk:{ja:'会話練習 ― 日本語・韓国語・英語',ko:'회화 연습 — 일본어·한국어·영어',en:'Conversation Practice: Japanese, Korean, English'},
load:{ja:'搭載管理（Weight & Balance）の練習',ko:'탑재관리(Weight & Balance) 연습',en:'Load Control (Weight & Balance) Practice'},
codes:{ja:'\u822a\u7a7a\u30b3\u30fc\u30c9\u8f9e\u5178',ko:'\ud56d\uacf5 \ucf54\ub4dc \uc0ac\uc804',en:'Aviation Code Dictionary'},
delay:{ja:'IATA\u9045\u5ef6\u30b3\u30fc\u30c9\u4e00\u89a7',ko:'IATA \uc9c0\uc5f0 \ucf54\ub4dc \ubaa9\ub85d',en:'IATA Delay Codes'},
glossary:{ja:'\u822a\u7a7a\u7528\u8a9e\u96c6',ko:'\ud56d\uacf5 \uc6a9\uc5b4\uc9d1',en:'Aviation Glossary'},
quiz:{ja:'\u78ba\u8a8d\u30af\u30a4\u30ba',ko:'\ud655\uc778 \ud034\uc988',en:'Quick Quiz'},
ann:{ja:'\u7a7a\u6e2f\u30a2\u30ca\u30a6\u30f3\u30b9\u6587\u4f8b\u96c6',ko:'\uacf5\ud56d \uc548\ub0b4\ubc29\uc1a1 \uc608\ubb38\uc9d1',en:'Airport Announcements'},
forms:{ja:'\u7a7a\u6e2f\u3067\u4f7f\u3046\u66f8\u985e\u3068\u69d8\u5f0f',ko:'\uacf5\ud56d \uc11c\ub958\uc640 \uc591\uc2dd',en:'Airport Forms'},
faq:{ja:'\u3088\u304f\u3042\u308b\u8cea\u554f',ko:'\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',en:'FAQ'},
route:{ja:'\u904b\u822a\u7ba1\u7406\u5b9f\u52d9\u306e\u7df4\u7fd2',ko:'\uc6b4\ud56d\uad00\ub9ac \uc2e4\ubb34 \uc5f0\uc2b5',en:'Flight Dispatch Practice'},
rm:{ja:'Revenue Managementの練習',ko:'Revenue Management 연습',en:'Revenue Management Practice'},
story:{ja:'\u30b9\u30c8\u30fc\u30ea\u30fc\u8a2d\u8a08\u30b7\u30fc\u30c8',ko:'\uc2a4\ud1a0\ub9ac \uc124\uacc4 \uc2dc\ud2b8',en:'Story Design Sheet'},
kako:{ja:'航空従事者技能証明等学科試験 過去問',ko:'\uc77c\ubcf8\u0020\ud559\uacfc\uc2dc\ud5d8\u0020\uae30\ucd9c\ubb38\uc81c',en:'Japan Aviation Exam Past Papers'},
krdsp:{ja:'\u97d3\u56fd\u0020\u904b\u822a\u7ba1\u7406\u58eb\u0020\u7df4\u7fd2\u554f\u984c',ko:'\ud55c\uad6d\u0020\uc6b4\ud56d\uad00\ub9ac\uc0ac\u0020\uc5f0\uc2b5\ubb38\uc81c',en:'Korea Dispatcher Practice Questions'},
fincard:{ja:'取引と財務諸表の練習',ko:'거래와 재무제표 연습',en:'Transactions & Statements Practice'},
finlink:{ja:'財務諸表連動シミュレーター',ko:'재무제표 연동 시뮬레이터',en:'Linked Financial Statements Simulator'},
fincost:{ja:'航空原価計算の練習',ko:'항공 원가 계산 연습',en:'Airline Cost & Break-even Practice'},
finsim:{ja:'航空会社経営シミュレーション',ko:'항공사 경영 시뮬레이션',en:'Airline Management Simulation'},
finratio:{ja:'財務比率の計算練習',ko:'재무 비율 계산 연습',en:'Financial Ratio Practice'},
finval:{ja:'企業価値の計算練習',ko:'기업가치 계산 연습',en:'Company Valuation Practice'},
finmemo:{ja:'投資検討報告書の下書き',ko:'투자 검토 보고서 초안',en:'Investment Memo Draft'},
fsc:{ja:'日本発 燃油サーチャージの計算',ko:'일본발 유류할증료 계산',en:'Japan-Origin Fuel Surcharge Calculator'},
finclose:{ja:'年次決算の練習',ko:'1년 결산 연습',en:'Year-End Closing Practice'}};
/* 下の共通ボタン（2026.10）：ツールが属する講座の目次へ・資料・ツールへ。講座のないツールは資料・ツールのボタンだけ */
var CR={p1:['1_지상직여객운송입문/00_シリーズ全体_地上職旅客運送入門.html','旅客ハンドリング実務','항공 여객운송 실무','Airline Passenger Operations'],
p2:['2_일본취항지점개설가이드/00_シリーズ全体_日本就航支店開設ガイド.html','外国航空会社の日本就航・支店開設ガイド','외국 항공사 일본 취항·지점 개설 가이드','Launching Flights to Japan: A Station Setup Guide for Foreign Airlines'],
p5:['5_면접대비가이드/00_シリーズ全体_面接対策.html','航空業界の面接対策','항공업계 면접 대비','Aviation Industry Interview Prep'],
p13:['13_항공영업입문/00_シリーズ全体_航空営業入門.html','航空営業実務','항공 영업 실무','Airline Sales Operations'],
p18:['18_항공기초지식/00_シリーズ全体_航空の基礎知識.html','航空基礎知識','항공 기초 지식','Aviation Fundamentals'],
p19:['19_운항관리실무/00_シリーズ全体_運航管理の実務.html','運航管理実務','운항관리 실무','Flight Dispatch Operations'],
p23:['23_재무3표실무/00_シリーズ全体_財務3表.html','数字で読む会社','숫자로 읽는 회사','Reading a Company Through Its Numbers'],
p12:['12_일본지점인사재무실무/00_シリーズ全体_人事財務実務.html','会社の人事・総務・財務実務','회사의 인사·총무·재무 실무','HR, Admin and Finance in Practice']};
var CMAP={load:'p1',fsc:'p2',story:'p5',rm:'p13',route:'p19',kako:'p19',krdsp:'p19',fincard:'p23',finlink:'p23',fincost:'p23',finsim:'p23',finratio:'p23',finval:'p23',finmemo:'p23',finclose:'p12'};
var FT={ja:['← 講座の目次','資料・ツール','ほかのツールを見る →'],ko:['← 강좌 목차','자료실','다른 도구 보기 →'],en:['\u2190 Course contents','Resources','See other tools \u2192']};
document.documentElement.classList.add('sh');if(page)document.documentElement.classList.add('sh-'+page);
var css=
'.shbar{display:flex;align-items:center;flex-wrap:wrap;gap:8px 14px;margin:2px 0 14px}'+
'.shbrand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#22303F;font-weight:700;font-size:15px;flex:none}'+
'.shbrand i{width:32px;height:32px;border-radius:50%;background:#2F8FE0;display:grid;place-items:center;flex:none}'+
'.shbrand svg{width:18px;height:18px;fill:#fff;transform:rotate(45deg)}'+
'.shcrumb{display:flex;align-items:center;gap:6px;font-size:13.5px;color:#5F6F80;min-width:0}'+
'.shcrumb a{color:#1C6FBF;text-decoration:none;font-weight:600}.shcrumb a:hover{text-decoration:underline}'+
'.shcrumb b{font-weight:600;color:#22303F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'.shlang{margin-left:auto;flex:none}'+
'html.sh .shbar .langs{position:static!important;display:inline-flex!important;border:1.5px solid #E3E9EF!important;border-radius:999px!important;overflow:hidden;background:#fff!important;gap:0!important;margin:0!important}'+
'html.sh .shbar .langs button{appearance:none;border:0!important;border-radius:0!important;background:transparent!important;color:#3A4A5C!important;font-weight:600!important;font-size:13px!important;padding:6px 12px!important;min-width:44px;min-height:34px;cursor:pointer;box-shadow:none!important}'+
'html.sh .shbar .langs button+button{border-left:1px solid #E3E9EF!important}'+
'html.sh .shbar .langs button.on{background:#2F8FE0!important;color:#fff!important}'+
/* 2026.10 新しいデザイン（v3）：紺の見出し・Inter と Noto・v3 の色。計算の部分の配置はそのまま */
'html.sh{--sky:#1769e0;--acc:#1769e0;--ink:#182431;--line:#dfe4e8;--muted:#65717e;--sub:#65717e}'+
'html.sh body{font-family:Inter,"Noto Sans JP","Noto Sans KR",system-ui,sans-serif;background:#f6f7f8}html.sh:lang(ko) body{font-family:Inter,"Noto Sans KR","Noto Sans JP",system-ui,sans-serif}html.sh:lang(ja) body{word-break:auto-phrase}'+
'html.sh h1,html.sh h2,html.sh h3{font-family:Inter,"Noto Sans JP","Noto Sans KR",system-ui,sans-serif!important;letter-spacing:-.025em}'+
'html.sh .wrap>header,html.sh .shhero{background:linear-gradient(145deg,#0a1b2e,#12314f)!important;color:#fff!important;border:0!important;border-radius:24px!important;padding:36px 38px 30px!important;box-shadow:0 24px 55px rgba(9,28,47,.15)!important;position:relative;overflow:hidden}'+
'html.sh .wrap>header #kick,html.sh .wrap>header .wave{display:none!important}'+
'html.sh .wrap>header h1,html.sh .shhero h1{color:#fff!important;font-weight:800!important;font-size:clamp(26px,4vw,40px)!important;line-height:1.2!important;letter-spacing:-.035em!important;margin:0 0 12px!important}'+
'html.sh .wrap>header p,html.sh .shhero p{color:#c5d0da!important;margin:0!important}html.sh .wrap>header a,html.sh .shhero a{color:#87dce5!important}'+
/* 試験問題のページ（header.top）も同じ紺の見出しに */
'html.sh header.top{background:linear-gradient(145deg,#0a1b2e,#12314f)!important;color:#fff!important;border-radius:24px!important;padding:32px 34px 26px!important;box-shadow:0 24px 55px rgba(9,28,47,.15)!important}html.sh header.top h1{font-weight:800!important;letter-spacing:-.035em}html.sh header.top p,html.sh header.top small,html.sh header.top .sub{color:#c5d0da!important}'+
'html.sh-load .wrap>header,html.sh-rm .wrap>header{display:none!important}html.sh-load .shhero,html.sh-rm .shhero{margin-bottom:12px}'+
'html.sh select,html.sh input{max-width:100%;min-width:0;box-sizing:border-box}html.sh select{text-overflow:ellipsis}html.sh label:has(>select){max-width:100%;min-width:0}'+
'.shfoot{display:flex;flex-wrap:wrap;gap:10px;margin:30px 0 8px}'+
'.shfoot a{flex:1 1 260px;display:block;border:1px solid #dfe4e8;border-radius:14px;padding:14px 18px;background:#fff;color:#182431;text-decoration:none;box-shadow:none;transition:border-color .15s,box-shadow .15s}'+
'.shfoot a:hover{border-color:#9bbbf0;box-shadow:0 12px 30px rgba(9,28,47,.07)}.shfoot a:focus-visible{outline:3px solid #ffbf47;outline-offset:2px}'+
'.shfoot small{display:block;font-size:12.5px;font-weight:700;color:#1769e0;margin-bottom:3px}.shfoot b{display:block;font-size:15px;font-weight:700;line-height:1.45}'+
'.shfoot .shl{text-align:right}.shfoot .shl:only-child{flex:0 1 340px;text-align:left}'+
'html.sh:lang(ko) .wrap>header h1,html.sh:lang(ko) .wrap>header p,html.sh:lang(ko) .shhero h1,html.sh:lang(ko) .shhero p,html.sh:lang(ko) header.top h1,html.sh:lang(ko) header.top p,html.sh:lang(ko) .lead,html.sh:lang(ko) .shfoot b{word-break:keep-all;overflow-wrap:break-word}'+
/* 2026.10 韓国語の見出しは語の途中で改行しない。見出しは行の長さをそろえ、説明は最後の行に1語だけ残らないように。日本語の文節の改行は ja_wrap.js（acn_shell.js が読み込む） */
'html.sh:lang(ko) h2,html.sh:lang(ko) h3,html.sh:lang(ko) h4{word-break:keep-all;overflow-wrap:anywhere}html.sh h1{text-wrap:balance}html.sh .wrap>header p,html.sh .shhero p,html.sh header.top p,html.sh .lead,html.sh .shfoot b{text-wrap:pretty}'+
'html.sh:lang(en) .wrap>header h1,html.sh:lang(en) .shhero h1{font-size:clamp(22px,3.6vw,31px)!important}'+
'@media print{.shfoot{display:none!important}}@media (min-width:601px){.shfoot{margin-bottom:130px}}'+
'@media (max-width:600px){html.sh .wrap>header h1,html.sh .shhero h1{font-size:21px!important}html.sh:lang(en) .wrap>header h1,html.sh:lang(en) .shhero h1{font-size:19px!important;letter-spacing:-.01em}.shfoot .shl{text-align:left}.shbar{gap:8px 10px}.shcrumb{order:3;width:100%}.shbrand span{font-size:14px}'+
'html.sh .shbar .langs button{padding:6px 9px!important;font-size:12.5px!important;min-width:0}'+
'html.sh .wrap>header,html.sh .shhero{padding:26px 22px 22px!important;border-radius:18px!important}'+
'html.sh input,html.sh select{min-height:40px}}';
var st=document.createElement('style');st.textContent=css;(document.head||document.documentElement).appendChild(st);
function lg(){var l=(document.documentElement.getAttribute('data-ui')||document.documentElement.lang||'ja').slice(0,2);return SITE[l]?l:'ja'}
function init(){var wrap=document.querySelector('.wrap')||document.body;if(document.querySelector('.shbar'))return;
 var bar=document.createElement('div');bar.className='shbar';
 bar.innerHTML='<a class="shbrand" href="'+HOME+'"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg></i><span class="shsite"></span></a>'+
  '<div class="shcrumb" role="navigation" aria-label="breadcrumb"><a class="shlib" href="'+HOME+'#practice"></a><span aria-hidden="true">\u203a</span><b class="shcur"></b></div><span class="shlang"></span>';
 wrap.insertBefore(bar,wrap.firstChild);
 var ck=CMAP[page],ft=document.createElement('nav');ft.className='shfoot';
 ft.innerHTML=(ck&&me?'<a class="shc" href="'+new URL('../../'+CR[ck][0],me.src).href+'"><small></small><b></b></a>':'')+'<a class="shl" href="'+HOME+'#practice"><small></small><b></b></a>';
 wrap.appendChild(ft);
 var L=document.getElementById('lang')||document.getElementById('langs');if(L)bar.querySelector('.shlang').appendChild(L);
 if(page==='load'||page==='rm'){var t=document.getElementById('ttl'),d=document.getElementById('lead');if(t){var h=document.createElement('div');h.className='shhero';t.parentNode.insertBefore(h,t);h.appendChild(t);if(d)h.appendChild(d)}}
 label();new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}
function label(){var l=lg(),b=document.querySelector('.shbar');if(!b)return;b.querySelector('.shsite').textContent=SITE[l];b.querySelector('.shlib').textContent=LIB[l];b.querySelector('.shcur').textContent=(NAME[page]||{})[l]||document.title;b.querySelector('.shbrand').href=HOME+'?lang='+l;b.querySelector('.shlib').href=HOME+'?lang='+l+'#practice';
 var f=document.querySelector('.shfoot');if(f){var x=FT[l],c=f.querySelector('.shc'),s=f.querySelector('.shl');if(c){c.querySelector('small').textContent=x[0];c.querySelector('b').textContent=CR[CMAP[page]][{ja:1,ko:2,en:3}[l]]}s.querySelector('small').textContent=x[1];s.querySelector('b').textContent=x[2];s.href=HOME+'?lang='+l+'#practice'}}
/* 表の見出しと中身の位置をそろえる：中身が短い列・入力欄の列は、見出しと中身を中央ぞろえにする（表が描き直されるたびに適用） */
function alignTables(){Array.prototype.forEach.call(document.querySelectorAll('table'),function(tb){if(tb.closest&&tb.closest('[data-noalign]'))return;var rows=Array.prototype.slice.call(tb.rows);if(rows.length<2)return;var hr=null;for(var i=0;i<rows.length;i++){if(rows[i].querySelector('th')&&!rows[i].querySelector('td')){hr=rows[i];break}}if(!hr)return;var n=hr.cells.length;for(var c=0;c<n;c++){var ok=true,cnt=0;for(var r=0;r<rows.length;r++){var row=rows[r];if(row===hr||row.cells.length!==n)continue;var td=row.cells[c];if(!td||td.tagName!=='TD')continue;cnt++;if(td.querySelector('input,select,button'))continue;var s=(td.textContent||'').trim(),w=0;for(var k=0;k<s.length;k++){w+=s.charCodeAt(k)>255?1:0.55}if(w>18){ok=false;break}}if(ok&&cnt){hr.cells[c].style.textAlign='center';for(var r2=0;r2<rows.length;r2++){var rw=rows[r2];if(rw!==hr&&rw.cells.length===n&&rw.cells[c].tagName==='TD')rw.cells[c].style.textAlign='center'}}}})}
/* 휴대폰（幅600px以下）では、横にはみ出す表・図を画面の幅に合わせて縮める（2026.10）。まず最小幅を外して折り返し、それでも広ければ全体を縮小（zoom）。
   入力欄のある表は指で操作しにくくなるので縮めない。data-nofit の中も対象外。縮めてもピンチで拡大できる */
window.FZ=window.FZ||(function(){var SEL='.tbl,.scroll,.figscroll,.tw,.dtw,.ls,.formula,.bridge,.dialwrap,[style*="overflow-x"]';
function reset(){Array.prototype.forEach.call(document.querySelectorAll('[data-fz]'),function(c){var m=c.getAttribute('data-fz');c.style.zoom='';c.style.minWidth=m==='-'?'':m;c.removeAttribute('data-fz')})}
function apply(){if((window.innerWidth||1024)>600)return;Array.prototype.forEach.call(document.querySelectorAll(SEL),function(box){if(box.closest('[data-nofit]')||box.querySelector('input,select,textarea'))return;var cs=getComputedStyle(box),aw=box.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0);if(aw<=0)return;
 Array.prototype.forEach.call(box.children,function(c){if(c.hasAttribute('data-fz')||(c.parentElement&&c.parentElement.closest('[data-fz]')))return;if(c.scrollWidth<=aw+1&&!c.style.minWidth)return;c.setAttribute('data-fz',c.style.minWidth||'-');c.style.minWidth='0';var w=c.scrollWidth;if(w>aw+1)c.style.zoom=Math.max(.3,aw/w).toFixed(4)});if(box.scrollWidth>box.clientWidth+1&&!box.hasAttribute('data-fz')){box.setAttribute('data-fz',box.style.minWidth||'-');box.style.zoom=Math.max(.3,(box.clientWidth-1)/box.scrollWidth).toFixed(4)}})}
return {reset:reset,apply:apply}})();
function fitAll(){if(window.FZ){FZ.reset();FZ.apply()}}
var alignQ=0;function alignSoon(){if(alignQ)return;alignQ=1;(window.requestAnimationFrame||setTimeout)(function(){alignQ=0;alignTables();fitAll()})}
function startAlign(){alignTables();fitAll();new MutationObserver(alignSoon).observe(document.body,{childList:true,subtree:true});window.addEventListener('resize',alignSoon);document.addEventListener('click',function(){setTimeout(alignSoon,30)});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(alignSoon)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){init();startAlign()});else{init();startAlign()}
})();
