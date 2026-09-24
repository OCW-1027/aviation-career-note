/* シリーズ一覧ページ共通 — window.HUBS[window.HUB_ID]（設定）と window.ARTS（原稿）から一覧を作る */
(function(){try{var cs=document.currentScript;if(cs&&cs.src){var ns=document.createElement('script');ns.src=cs.src.replace(/hub\.js(\?.*)?$/,'nav.js');document.head.appendChild(ns)}}catch(e){}})();
(function(){
var H=window.HUBS[window.HUB_ID];H.site=window.HUB_SITE;var A=window.ARTS||{},LANGS=['ja','ko','en'],LBL={ja:'日本語',ko:'한국어',en:'English'};
var UI={ja:{all:'すべて',n:'レッスン',site:'サイトのトップへ',jp:'',copy:'© 航空キャリアノート'},ko:{all:'전체',n:'레슨',site:'사이트 홈으로',jp:'',copy:'© 항공 커리어 노트'},en:{all:'All',n:'Lessons',site:'Site home',jp:'Japanese only for now',copy:'© Aviation Career Note'}};
var lang='ja';try{var s=localStorage.getItem('art-lang');if(LANGS.indexOf(s)>=0)lang=s}catch(e){}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function $(i){return document.getElementById(i)}
var keys=Object.keys(A).concat(Object.keys(H.extra||{})).filter(function(k,i,a){return a.indexOf(k)===i}).sort(function(a,b){var x=a.split('-'),y=b.split('-');return x[0]-y[0]||x[1]-y[1]});
var cur=-1;
if(H.color)document.documentElement.style.setProperty('--acc',H.color);
function title(k,l){var a=A[k],e=(H.extra||{})[k];if(a){var d=a[l]||a.ja;return [d.title,d.subtitle||'',!a[l]]}if(e){return [e[l]||e.ja,e['s'+l]||e.sja||'',!e[l]]}return ['','',true]}
function url(k){return (H.extra&&H.extra[k]&&H.extra[k].url)||('view.html?no='+k)}
function render(){var U=UI[lang];document.documentElement.lang=lang;document.title=H.name[lang]+' | '+(H.site?H.site[lang]:'');
 $('langs').innerHTML=LANGS.map(function(l){return '<button type="button" data-l="'+l+'" lang="'+l+'" class="'+(l===lang?'on':'')+'" aria-pressed="'+(l===lang)+'">'+LBL[l]+'</button>'}).join('');
 Array.prototype.forEach.call($('langs').querySelectorAll('button'),function(b){b.onclick=function(){lang=b.getAttribute('data-l');try{localStorage.setItem('art-lang',lang)}catch(e){}render()}});
 $('brandTxt').textContent=H.site?H.site[lang]:'';
 $('code').textContent=H.code;$('h1').textContent=H.name[lang];$('lead').textContent=H.lead[lang];
 $('stats').innerHTML='<div><b>'+keys.length+'</b>'+U.n+'</div><div><b>'+(H.parts[lang].filter(function(p){return p}).length)+'</b>Parts</div>';
 var P=H.parts[lang];
 $('tabs').innerHTML='<button data-p="-1" class="'+(cur<0?'on':'')+'">'+U.all+'</button>'+P.map(function(p,i){return p?'<button data-p="'+i+'" class="'+(cur===i?'on':'')+'">Part '+i+'</button>':''}).join('');
 Array.prototype.forEach.call($('tabs').querySelectorAll('button'),function(b){b.onclick=function(){cur=+b.getAttribute('data-p');render()}});
 var h='';P.forEach(function(p,i){if(!p||(cur>=0&&cur!==i))return;var ks=keys.filter(function(k){return +k.split('-')[0]===i});if(!ks.length)return;
  h+='<h2>Part '+i+'　'+esc(p)+'</h2>'+(H.pdesc?'<p class="desc">'+esc(H.pdesc[lang][i]||'')+'</p>':'')+'<div class="grid">'+ks.map(function(k){var t=title(k,lang);return '<a class="card" href="'+esc(url(k))+'"><span class="m"><b>'+esc(t[0])+'</b><span class="d">'+esc(t[1])+'</span>'+(lang==='en'&&t[2]?'<span class="tag">'+U.jp+'</span>':'')+'</span><span class="s">'+esc(k)+'<small>'+H.code+'</small></span></a>'}).join('')+'</div>'});
 $('list').innerHTML=h;
 $('foot').innerHTML=U.copy+' — '+esc(H.name[lang])+'　<a href="../8_사이트/index.html">'+U.site+'</a>';}
render();
})();
(function(){var s=document.currentScript&&document.currentScript.src;if(!s)return;var e=document.createElement('script');e.src=new URL('nav.js',s).href;document.head.appendChild(e)})();
