/* 日本語の見出し・短い説明を、語の途中で改行しないようにする（2026.10）
   ・Chrome・Edge などは CSS の word-break:auto-phrase（各 CSS に記述）で文節ごとに改行する
   ・それができないブラウザ（Safari・Firefox）だけ、同じ考え方の BudouX を読み込み、文節の切れ目を入れる
   ・日本語の表示のときだけ動く。韓国語は keep-all、英語は単語ごとに改行するので不要
   v3.js（新しいトップページなど）と acn_shell.js（講座・レッスン・文書のページ）から読み込む */
(function(){
if(window.__JAWRAP)return;window.__JAWRAP=1;
var SEL='h1,h2,h3,.kicker,.muted,.lead,.desc,.subtitle,.who,.route-title,.business-note,.sector-sub,.lab b,.lab span,.quick strong,.quick span,.step b,.step span,.card b,.card .d,.page-hero p,.hero p,details.jl h3,.jobs-hero p';
var native=!!(window.CSS&&CSS.supports&&CSS.supports('word-break','auto-phrase')),P=null,loading=false,t=null;
function apply(){if(native||(document.documentElement.lang||'').slice(0,2)!=='ja')return;
 if(!P){if(!loading){loading=true;import('https://cdn.jsdelivr.net/npm/budoux@0.6.4/+esm').then(function(m){P=m.loadDefaultJapaneseParser();apply()}).catch(function(){})}return}
 Array.prototype.forEach.call(document.querySelectorAll(SEL),function(el){
  if(el.__bx===el.textContent||el.closest('.acn-hd,.acn-ft,header .nav,.nv-fab,table'))return;
  try{P.applyToElement(el)}catch(e){}el.__bx=el.textContent})}
window.ACN_JAWRAP=apply;
if(native)return;
new MutationObserver(function(){clearTimeout(t);t=setTimeout(apply,120)}).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['lang']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(apply,150)});else setTimeout(apply,150);
})();
