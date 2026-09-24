/* サイト共通のナビゲーション（2026.09）
   ・右下のボタン：上へ（スクロールすると表示）・前のページへ戻る・ホーム
   ・記事ページ（view.html?no=）：本文の最後に「前の回／次の回」
   ・言語は <html lang> に合わせて自動で切り替える */
(function(){
if(window.__NAV_LOADED)return;window.__NAV_LOADED=1;
var me=document.currentScript&&document.currentScript.src||'';
var HOME=me?new URL('../../8_\uc0ac\uc774\ud2b8/index.html',me).href:'#';
var TX={ja:{top:'\u4e0a\u3078',back:'\u623b\u308b',home:'\u30db\u30fc\u30e0',prev:'\u524d\u306e\u56de',next:'\u6b21\u306e\u56de',toc:'\u76ee\u6b21'},
ko:{top:'\ub9e8 \uc704\ub85c',back:'\ub4a4\ub85c',home:'\ud648',prev:'\uc774\uc804 \ud3b8',next:'\ub2e4\uc74c \ud3b8',toc:'\ubaa9\ucc28'},
en:{top:'Top',back:'Back',home:'Home',prev:'Previous',next:'Next',toc:'Contents'}};
function lang(){var l=(document.documentElement.lang||'ja').slice(0,2);return TX[l]?l:'ja'}
var css='.nv-fab{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:8px;z-index:9999}'+
'.nv-fab button{display:flex;align-items:center;gap:6px;border:1px solid #d6dee8;background:#fff;color:#1d2a3a;border-radius:999px;padding:9px 13px;font-size:13px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.12);cursor:pointer;font-family:inherit}'+
'.nv-fab button:hover{background:#eef5fd}.nv-fab .nv-top{display:none}.nv-fab.show .nv-top{display:flex}'+
'.nv-pn{display:flex;justify-content:space-between;gap:10px;margin:28px 0 8px;flex-wrap:wrap}.nv-pn a{flex:1;min-width:140px;border:1px solid #d6dee8;border-radius:12px;padding:12px 14px;text-decoration:none;color:#1d2a3a;background:#fff;font-size:14px}.nv-pn a:hover{background:#eef5fd}.nv-pn small{display:block;color:#5b6b7d;font-size:12px;margin-bottom:2px}.nv-pn .nx{text-align:right}'+
'@media (max-width:600px){.nv-fab{flex-direction:row;gap:6px}.nv-fab button{padding:9px 12px;font-size:16px}.nv-fab button span{display:none}body{padding-bottom:64px}}'+
'@media (prefers-color-scheme:dark){.nv-fab button,.nv-pn a{background:#16212d;color:#e8eef5;border-color:#2a3a4c}}@media print{.nv-fab,.nv-pn{display:none}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
if(!document.querySelector('meta[name="robots"]')){var rb=document.createElement('meta');rb.name='robots';rb.content='noindex, nofollow';document.head.appendChild(rb)}
var fab=document.createElement('div');fab.className='nv-fab';
fab.innerHTML='<button type="button" class="nv-top">\u2191 <span></span></button><button type="button" class="nv-back">\u2190 <span></span></button><button type="button" class="nv-home">\u2302 <span></span></button>';
function init(){document.body.appendChild(fab);
 fab.querySelector('.nv-top').onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
 fab.querySelector('.nv-back').onclick=function(){if(history.length>1&&document.referrer)history.back();else location.href=tocUrl()||HOME};
 fab.querySelector('.nv-home').onclick=function(){location.href=HOME};
 window.addEventListener('scroll',function(){fab.classList.toggle('show',window.scrollY>300)},{passive:true});
 label();
 new MutationObserver(function(){label()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
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
