/* 資料室（ツール）ページの共通の頭の行（2026.09）
   使い方：各ページの </head> の直前に <script src="…/assets/shell.js" data-page="glossary"></script>
   ・?lang=ja|ko|en を、ページのスクリプトより先に art-lang に保存
   ・講座と同じ頭の行：［ロゴ・サイト名 → トップ］［資料室 › このページ］［言語ボタン（ページのものを移す）］
   ・青いカードを講座と同じ淡いカードにそろえる／スマートフォンの配置 */
(function(){
if(window.__SHELL)return;window.__SHELL=1;
var me=document.currentScript,page=(me&&me.getAttribute('data-page'))||'';
var HOME=me?new URL('../../8_\uc0ac\uc774\ud2b8/index.html',me.src).href:'#';
try{var q=new URLSearchParams(location.search).get('lang');if(q==='ja'||q==='ko'||q==='en')localStorage.setItem('art-lang',q)}catch(e){}
var SITE={ja:'\u822a\u7a7a\u30ad\u30e3\u30ea\u30a2\u30ce\u30fc\u30c8',ko:'\ud56d\uacf5 \ucee4\ub9ac\uc5b4 \ub178\ud2b8',en:'Aviation Career Note'};
var LIB={ja:'\u8cc7\u6599\u5ba4',ko:'\uc790\ub8cc\uc2e4',en:'Resources'};
var NAME={load:{ja:'\u642d\u8f09\u8a08\u7b97\u306e\u7df4\u7fd2',ko:'\ud0d1\uc7ac \uacc4\uc0b0 \uc5f0\uc2b5',en:'Load Control Practice'},
codes:{ja:'\u822a\u7a7a\u30b3\u30fc\u30c9\u8f9e\u5178',ko:'\ud56d\uacf5 \ucf54\ub4dc \uc0ac\uc804',en:'Aviation Code Dictionary'},
delay:{ja:'IATA\u9045\u5ef6\u30b3\u30fc\u30c9\u4e00\u89a7',ko:'IATA \uc9c0\uc5f0 \ucf54\ub4dc \ubaa9\ub85d',en:'IATA Delay Codes'},
glossary:{ja:'\u822a\u7a7a\u7528\u8a9e\u96c6',ko:'\ud56d\uacf5 \uc6a9\uc5b4\uc9d1',en:'Aviation Glossary'},
quiz:{ja:'\u78ba\u8a8d\u30af\u30a4\u30ba',ko:'\ud655\uc778 \ud034\uc988',en:'Quick Quiz'},
ann:{ja:'\u7a7a\u6e2f\u30a2\u30ca\u30a6\u30f3\u30b9\u6587\u4f8b\u96c6',ko:'\uacf5\ud56d \uc548\ub0b4\ubc29\uc1a1 \uc608\ubb38\uc9d1',en:'Airport Announcements'},
forms:{ja:'\u7a7a\u6e2f\u3067\u4f7f\u3046\u66f8\u985e\u3068\u69d8\u5f0f',ko:'\uacf5\ud56d \uc11c\ub958\uc640 \uc591\uc2dd',en:'Airport Forms'},
faq:{ja:'\u3088\u304f\u3042\u308b\u8cea\u554f',ko:'\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',en:'FAQ'},
route:{ja:'\u822a\u7a7a\u8def\u56f3\u306e\u7df4\u7fd2',ko:'\ud56d\ub85c \ucc28\ud2b8 \uc5f0\uc2b5',en:'Route Chart Practice'}};
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
'html.sh .wrap>header,html.sh .shhero{background:linear-gradient(170deg,#EAF5FF,#fff)!important;color:#22303F!important;border:1px solid #E3E9EF!important;border-radius:26px!important;padding:26px 28px 22px!important;box-shadow:none!important;position:relative;overflow:hidden}'+
'html.sh .wrap>header #kick,html.sh .wrap>header .wave{display:none!important}'+
'html.sh .wrap>header h1,html.sh .shhero h1{color:#22303F!important;font-size:clamp(23px,4vw,34px)!important;line-height:1.3!important;margin:0 0 10px!important}'+
'html.sh .wrap>header p,html.sh .shhero p{color:#4A5A6C!important;margin:0!important}'+
'html.sh-load .wrap>header{display:none!important}html.sh-load .shhero{margin-bottom:12px}'+
'html.sh select,html.sh input{max-width:100%;min-width:0;box-sizing:border-box}html.sh select{text-overflow:ellipsis}html.sh label:has(>select){max-width:100%;min-width:0}'+
'@media (max-width:600px){.shbar{gap:8px 10px}.shcrumb{order:3;width:100%}.shbrand span{font-size:14px}'+
'html.sh .shbar .langs button{padding:6px 9px!important;font-size:12.5px!important;min-width:0}'+
'html.sh .wrap>header,html.sh .shhero{padding:20px 18px 18px!important;border-radius:20px!important}'+
'html.sh input,html.sh select{min-height:40px}}';
var st=document.createElement('style');st.textContent=css;(document.head||document.documentElement).appendChild(st);
function lg(){var l=(document.documentElement.lang||'ja').slice(0,2);return SITE[l]?l:'ja'}
function init(){var wrap=document.querySelector('.wrap')||document.body;if(document.querySelector('.shbar'))return;
 var bar=document.createElement('div');bar.className='shbar';
 bar.innerHTML='<a class="shbrand" href="'+HOME+'"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg></i><span class="shsite"></span></a>'+
  '<div class="shcrumb" role="navigation" aria-label="breadcrumb"><a class="shlib" href="'+HOME+'#tools"></a><span aria-hidden="true">\u203a</span><b class="shcur"></b></div><span class="shlang"></span>';
 wrap.insertBefore(bar,wrap.firstChild);
 var L=document.getElementById('lang')||document.getElementById('langs');if(L)bar.querySelector('.shlang').appendChild(L);
 if(page==='load'){var t=document.getElementById('ttl'),d=document.getElementById('lead');if(t){var h=document.createElement('div');h.className='shhero';t.parentNode.insertBefore(h,t);h.appendChild(t);if(d)h.appendChild(d)}}
 label();new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}
function label(){var l=lg(),b=document.querySelector('.shbar');if(!b)return;b.querySelector('.shsite').textContent=SITE[l];b.querySelector('.shlib').textContent=LIB[l];b.querySelector('.shcur').textContent=(NAME[page]||{})[l]||document.title;b.querySelector('.shbrand').href=HOME+'?lang='+l;b.querySelector('.shlib').href=HOME+'?lang='+l+'#tools'}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
