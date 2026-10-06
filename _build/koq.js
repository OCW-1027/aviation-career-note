/* 韓国語の画面で、日本語式のかぎかっこ「」『』を韓国語の引用符に置きかえて表示する（元のデータは変えない）。2026.10
   話しことば（…요・…다・…까・?で終わる）は “ ”、それ以外の強調・引用は ‘ ’、『』は “ ”。仮名を含む文（日本語）はそのまま。 */
(function(){var H=document.documentElement,KANA=/[\u3041-\u30ff]/;
function q(t){t=t.replace(/『([^『』]*)』/g,'\u201c$1\u201d').replace(/「([^「」]*)」/g,function(m,x){return /(요|다|까|죠|네|세요|[?!.…])$/.test(x)?'\u201c'+x+'\u201d':'\u2018'+x+'\u2019'});return t.replace(/「/g,'\u2018').replace(/」/g,'\u2019').replace(/『/g,'\u201c').replace(/』/g,'\u201d')}
function on(){return (H.getAttribute('lang')||'').toLowerCase()==='ko'}
function fix(n){if(n.nodeType===3){var v=n.nodeValue;if(/[「」『』]/.test(v)&&!KANA.test(v)){var w=q(v);if(w!==v)n.nodeValue=w}}else if(n.nodeType===1&&!/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.nodeName)){if(n.getAttribute&&n.getAttribute('lang')==='ja')return;for(var c=n.firstChild;c;c=c.nextSibling)fix(c)}}
try{new MutationObserver(function(ms){if(!on())return;for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++)fix(a[j])}}).observe(H,{childList:true,subtree:true});
new MutationObserver(function(){if(on())fix(H)}).observe(H,{attributes:true,attributeFilter:['lang']});
if(on())document.addEventListener('DOMContentLoaded',function(){fix(H)})}catch(e){}})();
