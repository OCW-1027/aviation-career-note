/* サイト共通のナビゲーション（2026.09）
   ・右下のボタン：上へ（スクロールすると表示）・前のページへ戻る・ホーム
   ・記事ページ（view.html?no=）：本文の最後に「前の回／次の回」
   ・言語は <html lang> に合わせて自動で切り替える */
(function(){
if(window.__NAV_LOADED)return;window.__NAV_LOADED=1;
var me=document.currentScript&&document.currentScript.src||'';
var HOME=me?new URL('../../8_\uc0ac\uc774\ud2b8/index.html',me).href:'#';
var TX={ja:{top:'\u4e0a\u3078',back:'\u623b\u308b',home:'\u30db\u30fc\u30e0',prev:'\u524d\u306e\u56de',next:'\u6b21\u306e\u56de',toc:'\u76ee\u6b21',swipe:'\u2190 \u6a2a\u306b\u30b9\u30af\u30ed\u30fc\u30eb\u3067\u304d\u307e\u3059 \u2192'},
ko:{top:'\ub9e8 \uc704\ub85c',back:'\ub4a4\ub85c',home:'\ud648',prev:'\uc774\uc804 \ud3b8',next:'\ub2e4\uc74c \ud3b8',toc:'\ubaa9\ucc28',swipe:'\u2190 \uc606\uc73c\ub85c \ubc00\uc5b4\uc11c \ubcf4\uae30 \u2192'},
en:{top:'Top',back:'Back',home:'Home',prev:'Previous',next:'Next',toc:'Contents',swipe:'\u2190 Scroll sideways \u2192'}};
function lang(){var l=(document.documentElement.getAttribute('data-ui')||document.documentElement.lang||'ja').slice(0,2);return TX[l]?l:'ja'}
var css='.nv-hint{display:none;font-size:12px;color:#5b6b7d;text-align:right;margin:8px 4px -4px}.nv-hint.on{display:block}.nv-fab{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:8px;z-index:9999}'+
'.nv-fab button{display:flex;align-items:center;gap:6px;border:1px solid #d6dee8;background:#fff;color:#1d2a3a;border-radius:999px;padding:9px 13px;font-size:13px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.12);cursor:pointer;font-family:inherit}'+
'.nv-fab button:hover{background:#eef5fd}.nv-fab .nv-top{display:none}.nv-fab.show .nv-top{display:flex}'+
'.nv-pn{display:flex;justify-content:space-between;gap:10px;margin:28px 0 8px;flex-wrap:wrap}.nv-pn a{flex:1;min-width:140px;border:1px solid #d6dee8;border-radius:12px;padding:12px 14px;text-decoration:none;color:#1d2a3a;background:#fff;font-size:14px}.nv-pn a:hover{background:#eef5fd}.nv-pn small{display:block;color:#5b6b7d;font-size:12px;margin-bottom:2px}.nv-pn .nx{text-align:right}'+
'@media (max-width:600px){.nv-fab{flex-direction:row;gap:6px}.nv-fab button{padding:9px 12px;font-size:16px}.nv-fab button span{display:none}body{padding-bottom:64px}}'+
'@media (prefers-color-scheme:dark){.nv-fab button,.nv-pn a{background:#16212d;color:#e8eef5;border-color:#2a3a4c}}@media print{.nv-fab,.nv-pn{display:none}}'+
/* 2026-09 スマートフォンの最適化：言語ボタンは JA/KO/EN の小さい表示、ページ内の目次（#nav）は横スクロールさせず折り返す、横スクロールの案内 */
'@media (max-width:640px){.nv-lb,html .langs button.nv-lb,html.sh .shbar .langs button.nv-lb,html.sh .shbar .langs .nv-lb{font-size:0!important;min-width:0!important;padding:6px 10px!important;line-height:1!important;min-height:30px!important}.nv-lb::after{content:attr(data-s);font-size:12px;font-weight:700;letter-spacing:.02em}'+
'nav#nav{flex-wrap:wrap!important;overflow-x:visible!important;position:static!important;gap:6px!important}nav#nav a{white-space:normal!important}}'+
'.nv-hint{color:#1d5fa0;font-weight:600}'+
/* 表の中の韓国語・日本語を単語の途中で折り返さない（「소형」が「소／형」にならないように）。はみ出す表は横スクロールと案内で見せる */
'table th,table td{word-break:keep-all;overflow-wrap:anywhere}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
if(!document.querySelector('meta[name="robots"]')){var rb=document.createElement('meta');rb.name='robots';rb.content='noindex, nofollow';document.head.appendChild(rb)}
var fab=document.createElement('div');fab.className='nv-fab';
fab.innerHTML='<button type="button" class="nv-top">\u2191 <span></span></button><button type="button" class="nv-back">\u2190 <span></span></button><button type="button" class="nv-home">\u2302 <span></span></button>';
/* 横スクロールの案内：クラス名に関係なく、横にはみ出してスクロールできる箱（表など）すべてに付ける。メニュー・タブ・目次は除く */
function hints(){var t=TX[lang()];Array.prototype.forEach.call(document.querySelectorAll('body div,body section,body figure,body pre,body table,body ul'),function(w){if(w.closest('nav,header,.shbar,.menu,.langs,.nv-fab,[role=tablist],.tabs,.tabbar'))return;var o=getComputedStyle(w).overflowX;if(o!=='auto'&&o!=='scroll')return;if(w.clientHeight<60&&!(w.previousElementSibling&&w.previousElementSibling.classList&&w.previousElementSibling.classList.contains('nv-hint')))return;var h=w.previousElementSibling;if(!h||!h.classList||!h.classList.contains('nv-hint')){h=document.createElement('div');h.className='nv-hint';w.parentNode.insertBefore(h,w)}if(h.textContent!==t.swipe)h.textContent=t.swipe;var on=w.scrollWidth>w.clientWidth+4;if(h.classList.contains('on')!==on)h.classList.toggle('on',on)})}
function init(){document.body.appendChild(fab);
 fab.querySelector('.nv-top').onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
 fab.querySelector('.nv-back').onclick=function(){var r=document.referrer,same=false;try{same=!!r&&(new URL(r).origin===location.origin)&&new URL(r).href!==location.href}catch(e){}if(history.length>1&&same)history.back();else location.href=tocUrl()||(window.__SHELL?HOME+'#tools':HOME)};
 fab.querySelector('.nv-home').onclick=function(){location.href=HOME};
 window.addEventListener('scroll',function(){fab.classList.toggle('show',window.scrollY>300)},{passive:true});
 label();
 new MutationObserver(function(){label();setTimeout(hints,300)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 setTimeout(hints,150);setTimeout(hints,600);setTimeout(hints,2000);window.addEventListener('resize',function(){clearTimeout(window.__nvh);window.__nvh=setTimeout(hints,200)});
 document.addEventListener('input',function(){setTimeout(hints,250)},true);document.addEventListener('change',function(){setTimeout(hints,250)},true);
 document.addEventListener('click',function(){setTimeout(hints,350);setTimeout(hints,1200)},true);
 langBtns();try{new MutationObserver(function(){clearTimeout(window.__nvl);window.__nvl=setTimeout(function(){langBtns();hints()},120)}).observe(document.body,{childList:true,subtree:true})}catch(e){}}
/* 言語ボタン（日本語・한국어・English）に印を付け、スマートフォンでは JA・KO・EN の小さい表示にする */
var LS={'\u65e5\u672c\u8a9e':'JA','\ud55c\uad6d\uc5b4':'KO','English':'EN'};
function langBtns(){Array.prototype.forEach.call(document.querySelectorAll('button,a'),function(b){if(b.classList.contains('nv-lb'))return;var s=LS[(b.textContent||'').trim()];if(s&&b.children.length===0){b.classList.add('nv-lb');b.setAttribute('data-s',s)}})}
function tocUrl(){var a=document.querySelector('a[href*="00_\u30b7\u30ea\u30fc\u30ba\u5168\u4f53"]');return a?a.href:''}
function label(){var t=TX[lang()];var b=fab.querySelectorAll('span');b[0].textContent=t.top;b[1].textContent=t.back;b[2].textContent=t.home;var bt=fab.querySelectorAll('button');[t.top,t.back,t.home].forEach(function(x,i){bt[i].title=x;bt[i].setAttribute('aria-label',x)})}
function key(k){return k.split('-').map(function(x){return ('000'+x).slice(-3)}).join('-')}
function prevNext(){var m=location.search.match(/[?&]no=([^&]+)/);if(!m||!window.ARTS)return;var no=decodeURIComponent(m[1]);
 var ks=Object.keys(window.ARTS).filter(function(k){return /^\d+-\d+$/.test(k)}).sort(function(a,b){return key(a)<key(b)?-1:1});
 var i=ks.indexOf(no);if(i<0)return;var l=lang(),t=TX[l];
 function ttl(k){var a=window.ARTS[k];var x=a&&(a[l]||a.ja);return k+' '+((x&&x.title)||'')}
 var old=document.querySelector('.nv-pn');if(old)old.remove();
 var d=document.createElement('nav');d.className='nv-pn';
 d.innerHTML=(i>0?'<a href="view.html?no='+ks[i-1]+'"><small>\u2190 '+t.prev+'</small>'+ttl(ks[i-1])+'</a>':'<span></span>')+(i<ks.length-1?'<a class="nx" href="view.html?no='+ks[i+1]+'"><small>'+t.next+' \u2192</small>'+ttl(ks[i+1])+'</a>':'<span></span>');
 var host=document.querySelector('main')||document.body;var f=host.querySelector('footer');if(f&&f.parentNode===host)host.insertBefore(d,f);else host.appendChild(d)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0)});else setTimeout(init,0);
})();

/* 著作権の表示（2026.09）：© の表示がないページにだけ、ページの最後に1行を付ける。言語の切り替えにも合わせる */
(function(){if(window.__NV_COPY)return;window.__NV_COPY=1;
var CP={ja:'\u00a9 2026 \u822a\u7a7a\u30ad\u30e3\u30ea\u30a2\u30ce\u30fc\u30c8\u3000\u7121\u65ad\u8ee2\u8f09\u30fb\u8907\u88fd\u7981\u6b62',ko:'\u00a9 2026 \ud56d\uacf5 \ucee4\ub9ac\uc5b4 \ub178\ud2b8\u3000\ubb34\ub2e8 \uc804\uc7ac\u00b7\ubcf5\uc81c \uae08\uc9c0',en:'\u00a9 2026 Aviation Career Note. All rights reserved.'};
function lg(){var l=(document.documentElement.getAttribute('data-ui')||document.documentElement.lang||'ja').slice(0,2);return CP[l]?l:'ja'}
function put(){if(!document.body)return;var e=document.getElementById('nv-copy');
 var has=[].some.call(document.querySelectorAll('footer,#foot,#siteFoot,.foot'),function(f){return f!==e&&f.textContent.indexOf('\u00a9')>=0});
 if(has){if(e)e.parentNode.removeChild(e);return}
 if(!e){e=document.createElement('div');e.id='nv-copy';e.style.cssText='text-align:center;font-size:12px;color:#6b7a8a;padding:22px 12px calc(30px + env(safe-area-inset-bottom,0px))';document.body.appendChild(e)}
 e.textContent=CP[lg()]}
function go(){setTimeout(put,400);setTimeout(put,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
try{new MutationObserver(put).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}catch(err){}})();
/* かっこ書きの折り返し（2026.10）：表のマス・見出し・ボタン・ラベルなど短い文字の中の短いかっこ書き（20字まで）を1つのまとまりにし、
   折り返すときはかっこの前で改行する。講座・資料とツール・トップページ・講座の目次に共通（レッスンの本文は article.js の pp() も同じ方法） */
(function(){if(window.__PPW)return;window.__PPW=1;
var SEL='th,td,label,button,h1,h2,h3,h4,dt,summary,b,strong,.kpi,.flow',RE=/[(\uff08][^()\uff08\uff09]{1,20}[)\uff09]/g,SKIP='x-pp,x-pw,script,style,textarea,option,select,code,pre,svg,input';
function css(){if(document.getElementById('ppw-css'))return;var s=document.createElement('style');s.id='ppw-css';s.textContent='x-pw{display:inline}x-pp{display:inline-block}';(document.head||document.documentElement).appendChild(s)}
function fix(root){if(!root||!root.querySelectorAll)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),list=[],t;
 while((t=w.nextNode())){RE.lastIndex=0;if(!RE.test(t.data))continue;var p=t.parentNode;if(!p||!p.closest||p.closest(SKIP)||!p.closest(SEL))continue;list.push(t)}
 list.forEach(function(t){var d=t.data,pw=document.createElement('x-pw'),last=0;RE.lastIndex=0;var m;
  while((m=RE.exec(d))){if(m.index>last)pw.appendChild(document.createTextNode(d.slice(last,m.index)));var x=document.createElement('x-pp');x.textContent=m[0];pw.appendChild(x);last=m.index+m[0].length}
  if(last<d.length)pw.appendChild(document.createTextNode(d.slice(last)));if(t.parentNode)t.parentNode.replaceChild(pw,t)})}
var q=null;function later(){if(q)return;q=setTimeout(function(){q=null;fix(document.body)},60)}
function go(){css();fix(document.body);try{new MutationObserver(later).observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
