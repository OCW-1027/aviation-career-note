/* シリーズ一覧ページ共通 — window.HUBS[window.HUB_ID]（設定）と window.ARTS（原稿）から一覧を作る */
(function(){try{var cs=document.currentScript;if(cs&&cs.src){var ns=document.createElement('script');ns.src=cs.src.replace(/hub\.js(\?.*)?$/,'nav.js');document.head.appendChild(ns)}}catch(e){}})();
/* 更新の印（NEW・更新）— assets/updates.js を読み込み、レッスンのカードに日付付きの印を付ける */
(function(){var cs=document.currentScript,base=(cs&&cs.src)?cs.src.replace(/hub\.js(\?.*)?$/,''):'';
var LB={ja:{new:'NEW',upd:'更新',last:'最終更新'},ko:{new:'NEW',upd:'업데이트',last:'최종 업데이트'},en:{new:'NEW',upd:'Updated',last:'Last updated'}};
function apply(){var U=window.UPDATES||[],days=window.UPDATES_DAYS||60,now=Date.now(),hid=window.HUB_ID,m={},last='';
 U.forEach(function(x){if(x.c!==hid)return;if(!last||x.d>last)last=x.d;if(!x.k)return;if((now-Date.parse(x.d))/864e5>days)return;if(!m[x.k]||m[x.k].d<x.d)m[x.k]=x});
 var L=LB[document.documentElement.lang]||LB.ja;
 if(!document.getElementById('upd-css')){var st=document.createElement('style');st.id='upd-css';st.textContent='.card .nb{display:inline-block;font-size:11px;font-weight:700;line-height:1.6;padding:0 8px;border-radius:999px;margin:0 0 4px;letter-spacing:.02em;align-self:flex-start}.card .nb.new{background:#D0506A;color:#fff}.card .nb.upd{background:#FFE08A;color:#3A2A00}';document.head.appendChild(st)}
 Array.prototype.forEach.call(document.querySelectorAll('.card[data-k]'),function(a){var o=a.querySelector('.nb');if(o)o.parentNode.removeChild(o);var x=m[a.getAttribute('data-k')];if(!x)return;var b=document.createElement('span');b.className='nb '+x.t;b.textContent=L[x.t]+' '+x.d.slice(5).replace('-','.');var mm=a.querySelector('.m');if(mm)mm.insertBefore(b,mm.firstChild)});
 var sts=document.getElementById('stats');if(sts&&last&&!sts.querySelector('.upd-stat')){var dv=document.createElement('div');dv.className='upd-stat';dv.innerHTML='<b>'+last.replace(/-/g,'.')+'</b>'+L.last;sts.appendChild(dv)}}
window.__applyUpdates=apply;
if(!window.UPDATES){var s=document.createElement('script');s.src=base+'updates.js';s.onload=apply;document.head.appendChild(s)}})();
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
  h+='<h2>Part '+i+'　'+esc(p)+'</h2>'+(H.pdesc?'<p class="desc">'+esc(H.pdesc[lang][i]||'')+'</p>':'')+'<div class="grid">'+ks.map(function(k){var t=title(k,lang);return '<a class="card" data-k="'+esc(k)+'" href="'+esc(url(k))+'"><span class="m"><b>'+esc(t[0])+'</b><span class="d">'+esc(t[1])+'</span>'+(lang==='en'&&t[2]?'<span class="tag">'+U.jp+'</span>':'')+'</span><span class="s">'+esc(k)+'<small>'+H.code+'</small></span></a>'}).join('')+'</div>'});
 $('list').innerHTML=h;
 if(window.UPDATES&&window.__applyUpdates)window.__applyUpdates();
 $('foot').innerHTML=U.copy+' — '+esc(H.name[lang])+'　<a href="../8_사이트/index.html">'+U.site+'</a>';}
render();
})();
(function(){var s=document.currentScript&&document.currentScript.src;if(!s)return;var e=document.createElement('script');e.src=new URL('nav.js',s).href;document.head.appendChild(e)})();
