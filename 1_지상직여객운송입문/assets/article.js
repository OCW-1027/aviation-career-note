/* 図の文字の大きさの共通ルール（2026.09）：図の中の文字は、画面の上で 11px より小さくしない。
   ・新しい図（data-flr の付いたもの）は、図のファイルの中で自分で合わせるので、そのまま
   ・それ以外の図は、PC（表示の幅600px以上）では小さい文字を大きくし、スマートフォンでは 11px を保てる幅で描いて横にスクロールさせる */
window.FIGFIX=function(h){
 if(!h||h.indexOf('data-flr')>=0)return h;
 var m=/viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) [\d.]+"/.exec(h);if(!m)return h;
 var vw=+m[1],avail=Math.min(740,((typeof window!=='undefined'&&window.innerWidth)||1024)-40),P=11,fu=P*vw/avail,sz=[];
 h.replace(/font-size="([\d.]+)"/g,function(_,v){sz.push(+v)});if(!sz.length)return h;
 if(avail>=600)return h.replace(/font-size="([\d.]+)"/g,function(_,v){return 'font-size="'+Math.max(+v,fu).toFixed(1)+'"'});
 var mn=Math.min.apply(null,sz),need=Math.ceil(vw*P/mn);if(need<=avail)return h;
 return '<div class="figscroll" style="overflow-x:auto;-webkit-overflow-scrolling:touch"><div style="min-width:'+need+'px">'+h+'</div></div>'};
(function(){
var C=(function(){var el=document.getElementById('content');if(el)return JSON.parse(el.textContent);var no=(window.STATIC&&window.STATIC.no)||new URLSearchParams(location.search).get('no');return (window.ARTS||{})[no];})();
if(!C){document.getElementById('main').innerHTML='<p style="padding:40px 0">Not found</p>';return;}
var PARTS={ja:['Part 0 オリエンテーション','Part 1 チェックインカウンター','Part 2 搭乗口（ゲート）','Part 3 シップサイド・ランプ','Part 4 手荷物サービス','Part 5 イレギュラー対応','Part 6 支店の日常業務','Part 7 キャリアガイド'],ko:['Part 0 오리엔테이션','Part 1 탑승수속 카운터','Part 2 탑승구(게이트)','Part 3 쉽사이드·램프','Part 4 수하물 서비스','Part 5 비정상 상황 대응','Part 6 지점 일상 업무','Part 7 커리어 가이드'],en:['Part 0 Orientation','Part 1 Check-in Counter','Part 2 Boarding Gate','Part 3 Shipside and Ramp','Part 4 Baggage Services','Part 5 Irregular Operations','Part 6 Station Daily Operations','Part 7 Career Guide']};
(function(){try{var cs=document.currentScript;if(cs&&cs.src){var ns=document.createElement('script');ns.src=cs.src.replace(/article\.js(\?.*)?$/,'nav.js');document.head.appendChild(ns)}}catch(e){}})();
var NAVL={ja:{prev:'前のレッスン',next:'次のレッスン',toc:'講座の目次へ'},ko:{prev:'이전 레슨',next:'다음 레슨',toc:'강좌 목차로'},en:{prev:'Previous lesson',next:'Next lesson',toc:'Course contents'}};
(function(){var st=document.createElement('style');st.textContent='.artnav{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;margin:28px 0 8px;align-items:stretch}.artnav a{display:flex;flex-direction:column;gap:3px;padding:12px 14px;border:1px solid #dbe3ec;border-radius:12px;text-decoration:none;color:inherit;font-weight:700;font-size:14px}.artnav a small{font-weight:400;font-size:12.5px;opacity:.75;line-height:1.4}.artnav a:hover{border-color:#2F8FE0}.artnav .nx{text-align:right}.artnav .toc{justify-content:center;text-align:center}@media(max-width:640px){.artnav{grid-template-columns:1fr 1fr}.artnav .toc{grid-column:1/-1;order:3}}';document.head.appendChild(st)})();
var ST=window.STATIC||null;
/* 最終更新日：静的ページは生成時に計算済み、それ以外は lesson_dates.js と updates.js の新しい方 */
function lessonDate(){if(ST&&ST.updated)return ST.updated;var LD=window.LESSON_DATES;if(!LD)return '';var u=decodeURIComponent(document.baseURI||location.href),dir='';Object.keys(LD).forEach(function(k){if(u.indexOf('/'+k+'/')>=0)dir=k});if(!dir)return '';var D=LD[dir],no=String(C.meta.no),d=D[no]||D['*']||'';(window.UPDATES||[]).forEach(function(x){if(x.c===dir&&x.k===no&&x.d>d)d=x.d});return d}
function LU(no,lg){return ST?ST.root+(lg||lang)+'/'+ST.code+'/'+no+'/':'view.html?no='+no}
function navKeys(){if(ST&&ST.index)return ST.order.slice();var A=window.ARTS||{};return Object.keys(A).filter(function(k){return A[k]&&A[k].meta&&(A[k].ja||A[k].ko)}).sort(function(a,b){var x=String(a).split('-').map(Number),y=String(b).split('-').map(Number);return (x[0]-y[0])||((x[1]||0)-(y[1]||0))})}
function navTitle(k){if(ST&&ST.index){var t=ST.index[k]||{};return t[lang]||t.ja||t.ko||''}var A=window.ARTS||{},a=A[k];if(!a)return '';var l=a[lang]||a.ja||a.ko;return (l&&l.title)||''}
var DEF={ja:{series:'旅客ハンドリングの実務',voice:'現場のひと言',terms:'今日の用語',tcols:['日本語','한국어','English'],quiz:'確認クイズ',next:'次のレッスン：'},ko:{series:'항공 여객운송 실무',voice:'현장 한마디',terms:'오늘의 용어',tcols:['한국어','日本語','English'],quiz:'확인 퀴즈',next:'다음 레슨: '},en:{series:'Airline Passenger Operations',voice:'Voice from the Field',terms:'Key Terms',tcols:['English','日本語','한국어'],quiz:'Quick Quiz',next:'Next lesson: '}};
var LANGS=['ja','ko','en'];
var KRC={ICN:1,GMP:1,SEL:1,PUS:1,CJU:1,TAE:1,CJJ:1};var HUBS=['LHR','SIN','JFK','CDG','SYD','DXB','HKG','FRA','LAX','BKK','AMS','YVR'];
function hub(no){var h=0;String(no).split('').forEach(function(c){h=(h*31+c.charCodeAt(0))%997});return HUBS[h%HUBS.length]}
(function(m){if(KRC[m.from]){m.from=(m.to&&!KRC[m.to])?m.to:'NRT';m.to=hub(m.no);}if(!m.from)m.from='NRT';if(!m.to||KRC[m.to]||m.to===m.from)m.to=hub(m.no);})(C.meta);
var ENF=!C.en;if(ENF){C.en=JSON.parse(JSON.stringify(C.ja));C.en.series=(C.meta.en&&C.meta.en.series)||null;C.en.part=(C.meta.en&&C.meta.en.part)||null;C.en._fallback=true;if(Array.isArray(C.ja.terms))C.en.terms=C.ja.terms.map(function(r){return [r[2],r[0],r[1]]});if(C.en.voice&&typeof C.en.voice==='object')C.en.voice.h=(C.meta.en&&C.meta.en.voice)||null;}
LANGS.forEach(function(lg){var L=C[lg],D=DEF[lg],pn=+String(C.meta.no).split('-')[0];if(!L)return;C.meta.date=C.meta.date||'2026.09';C.meta.home=C.meta.home||'00_シリーズ全体_地上職旅客運送入門.html';L.series=L.series||D.series;L.part=L.part||PARTS[lg][pn];if(L.voice&&typeof L.voice==='string')L.voice={h:D.voice,x:L.voice};if(L.voice&&!L.voice.h)L.voice.h=D.voice;if(L.terms&&Array.isArray(L.terms))L.terms={h:D.terms,cols:D.tcols,rows:L.terms};if(L.quiz&&Array.isArray(L.quiz))L.quiz={h:D.quiz,items:L.quiz};if(L.next&&L.next.indexOf(D.next)!==0&&!/^(次回|次の|다음|Next)/.test(L.next))L.next=D.next+L.next;});
var lang='ja';
try{var s=localStorage.getItem('art-lang');if(LANGS.indexOf(s)>=0)lang=s}catch(e){}
if(ST&&LANGS.indexOf(ST.lang)>=0)lang=ST.lang;
function $(s){return document.querySelector(s)}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var PLANE='<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
var BULB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/></svg>';
var WARN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>';
var UI={ja:{home:'シリーズ一覧へ',video:'関連動画',watch:'YouTubeで見る',ymd:'基準日',upd:'最終更新',copy:'© 2026 航空キャリアノート　無断転載・複製禁止'},ko:{home:'시리즈 목록으로',video:'관련 영상',watch:'YouTube에서 보기',ymd:'기준일',upd:'최종 업데이트',copy:'© 2026 항공 커리어 노트　무단 전재·복제 금지'},en:{home:'Back to series',video:'Related video',watch:'Watch on YouTube',ymd:'As of',upd:'Updated',copy:'© 2026 Aviation Career Note. All rights reserved.',fb:'The English version of this article is being prepared. The Japanese text is shown for now.'}};
var LBL={ja:'日本語',ko:'한국어',en:'English'};
function langBar(){var b=document.getElementById('langBtn');if(!b)return;var g=document.getElementById('langGroup');if(!g){g=document.createElement('span');g.id='langGroup';g.className='langs';g.setAttribute('role','group');g.setAttribute('aria-label','Language');b.parentNode.insertBefore(g,b);b.style.display='none';}
 g.innerHTML=LANGS.map(function(l){return '<button type="button" class="lg'+(l===lang?' on':'')+'" data-l="'+l+'" lang="'+l+'" aria-pressed="'+(l===lang)+'">'+LBL[l]+'</button>'}).join('');
 g.querySelectorAll('button').forEach(function(x){x.onclick=function(){var nl=x.getAttribute('data-l');try{localStorage.setItem('art-lang',nl)}catch(e){}if(ST){location.href=LU(C.meta.no,nl);return}lang=nl;render();window.scrollTo(0,0)}});}

function block(b,L){
  switch(b.t){
  case 'p': return '<p>'+esc(b.x)+'</p>';
  case 'h3': return '<h3>'+esc(b.x)+'</h3>';
  case 'note': return '<p class="note">'+esc(b.x)+'</p>';
  case 'link': return '<p class="note"><a href="'+esc(b.href||'#')+'" style="font-weight:700">'+esc(b.x)+' →</a></p>';
  case 'fig': var fg=window.FIGS&&window.FIGS[b.id]; if(!fg)return ''; return '<figure class="fig">'+(window.FIGFIX?window.FIGFIX(fg(lang)):fg(lang))+(b.cap?'<figcaption>'+esc(b.cap)+'</figcaption>':'')+'</figure>';
  case 'point': return '<div class="point'+(b.warn?' warn':'')+'">'+(b.warn?WARN:BULB)+'<div>'+esc(b.x)+'</div></div>';
  case 'cards': return '<div class="cards" style="--n:'+(b.n||2)+'">'+b.items.map(function(i){return '<div class="card">'+(i.ic?'<span class="ic">'+i.ic+'</span>':'')+'<b>'+esc(i.name)+'</b>'+(i.tag?'<span class="tag">'+esc(i.tag)+'</span>':'')+'<span>'+esc(i.x)+'</span></div>'}).join('')+'</div>';
  case 'rows': return '<div class="rows">'+b.items.map(function(i){return '<div class="row"><b>'+esc(i.name)+'</b><span>'+esc(i.x)+'</span></div>'}).join('')+'</div>';
  case 'table':
    /* 列の中身が短い（どの行も1行ほど）列は中央ぞろえにして、中央ぞろえの見出しと位置を合わせる */
    var shortCol=b.cols.map(function(_,ci){var m=0;b.rows.forEach(function(r){var s=String(r[ci]==null?'':r[ci]),w=0;for(var k=0;k<s.length;k++){w+=s.charCodeAt(k)>255?1:0.55}if(w>m)m=w});return m<=18});
    return '<div class="scroll tbl"><table><thead><tr>'+b.cols.map(function(c){var s=String(c),w=0;for(var k=0;k<s.length;k++){w+=s.charCodeAt(k)>255?1:0.55}return '<th'+(w>8?' class="w"':'')+'>'+esc(c)+'</th>'}).join('')+'</tr></thead><tbody>'+b.rows.map(function(r){return '<tr>'+r.map(function(c,i){return '<td class="'+(i===0&&b.label!==false?(shortCol[0]?'lb':'lb lw'):((b.center||shortCol[i])?'c':''))+'">'+esc(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>';
  case 'ladder':
    return '<div class="ladder">'+b.steps.map(function(s,i){var h=120+i*(b.rise||28);return '<div class="step'+(s.alt?' alt':'')+'" style="min-height:'+h+'px"><span class="n">'+(i+1)+'</span><b>'+esc(s.name)+'</b><small>'+esc(s.sub||'')+'</small></div>'}).join('')+'</div>';
  case 'timeline':
    return '<div class="tl"><div class="tl-head"><span>'+esc(b.lanes[0])+'</span><span></span><span>'+esc(b.lanes[1])+'</span></div>'+b.marks.map(function(m){return '<div class="tl-row"><div class="tl-c a">'+esc(m.a||'')+'</div><div class="tl-t">'+esc(m.time)+'</div><div class="tl-c b">'+esc(m.b||'')+'</div></div>'}).join('')+'</div>';
  case 'check': return '<ul class="check">'+b.items.map(function(i){return '<li><div><b>'+esc(i.name)+'</b>'+esc(i.x||'')+'</div></li>'}).join('')+'</ul>';
  case 'video': if(!b.url||/確認中|확인 중|to be confirmed|being confirmed|unconfirmed/i.test(b.ch||''))return ''; /* 公式チャンネルを確認できない動画は表示しない。埋め込みはせず、外部リンクのみ */ return '<a class="video" href="'+esc(b.url)+'" target="_blank" rel="noopener"><span class="th"><span class="play"><svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg></span></span><span class="bd"><small>'+esc(UI[lang].video)+'｜'+esc(b.ch||'')+'</small><b>'+esc(b.title)+'</b><span>'+esc(UI[lang].watch)+'</span></span></a>';
  }
  return '';
}

function render(){
  var L=C[lang],U=UI[lang];
  document.documentElement.lang=L._fallback?'ja':lang;
  document.title=L.title+' | '+L.series;
  $('#series').innerHTML='<span class="pict">'+PLANE+'</span>'+esc(L.series);
  $('#series').setAttribute('href',C.meta.home||'#');
  langBar();
  $('#info').innerHTML='<b>'+esc(C.meta.from)+'</b><span class="arrow">- - ✈ - -</span><b>'+esc(C.meta.to)+'</b><span>No.<b style="font-size:15px;margin-left:4px">'+esc(C.meta.no)+'</b></span><span class="part">'+esc(L.part)+'</span>'+(function(){var d=lessonDate();return d?'<span class="upd">'+esc(U.upd)+' '+esc(d.replace(/-/g,'.'))+'</span>':'<span>'+esc(U.ymd)+' '+esc(C.meta.date)+'</span>'})();
  var t=esc(L.title);if(L._fallback&&!L.series){L.series=C.ja.series}if(L._fallback&&!L.part){L.part=C.ja.part}if(L.hl)t=t.replace(esc(L.hl),'<span class="hl">'+esc(L.hl)+'</span>');
  $('#title').innerHTML=t;
  $('#subtitle').textContent=L.subtitle;
  var h=(L._fallback?'<p class="note fb">'+esc(U.fb)+'</p>':'')+'<div class="lead">'+L.lead.map(function(p){return '<p>'+esc(p)+'</p>'}).join('')+'</div>';
  L.sections.forEach(function(s){var bd=s.blocks.map(function(b){return block(b,L)}).join('');if(!bd.replace(/\s/g,''))return;h+='<section><h2>'+esc(s.h)+'</h2>'+bd+'</section>'});
  if(L.voice&&L.voice.x&&!/インタビュー(追加|補強)予定|인터뷰\s*(보강|추가)\s*예정|Interview to be added/i.test(L.voice.x))h+='<section><h2>'+esc(L.voice.h)+'</h2><div class="voice"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/></svg><p>'+esc(L.voice.x)+'</p></div></section>';
  if(L.terms)h+='<section><h2>'+esc(L.terms.h)+'</h2><div class="scroll tbl"><table class="terms"><thead><tr>'+L.terms.cols.map(function(c){return '<th>'+esc(c)+'</th>'}).join('')+'</tr></thead><tbody>'+L.terms.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+esc(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div></section>';
  if(L.quiz)h+='<section><h2>'+esc(L.quiz.h)+'</h2><div class="quiz">'+L.quiz.items.map(function(q,qi){return '<div class="q" data-a="'+q.a+'"><p>Q'+(qi+1)+'. '+esc(q.q)+'</p><div class="opts">'+q.opts.map(function(o,oi){return '<button type="button" class="opt" data-i="'+oi+'">'+(oi+1)+'. '+esc(o)+'</button>'}).join('')+'</div><div class="exp"><div class="exa">'+({ja:'正解：',ko:'정답: ',en:'Answer: '}[lang]||'正解：')+(q.a+1)+'. '+esc(q.opts[q.a])+'</div><b class="exl">'+({ja:'解説',ko:'해설',en:'Explanation'}[lang]||'解説')+'</b>'+esc(q.exp)+'</div></div>'}).join('')+'</div></section>';
  if(L.next){var nx=C.meta.nextno?LU(C.meta.nextno):'';h+=(nx?'<a class="next" style="text-decoration:none" href="'+nx+'">':'<div class="next">')+'<span class="pict">'+PLANE+'</span><span>'+esc(L.next)+'</span>'+(nx?'</a>':'</div>');}
  var ks=navKeys(),ix=ks.indexOf(String(C.meta.no)),pv=ix>0?ks[ix-1]:null,nk=(C.meta.nextno&&(ST&&ST.index?ST.index[C.meta.nextno]:(window.ARTS||{})[C.meta.nextno]))?C.meta.nextno:(ix>=0&&ix<ks.length-1?ks[ix+1]:null),N=NAVL[lang]||NAVL.ja,home=C.meta.home||($('#series')&&$('#series').getAttribute('href'))||'#';
  h+='<nav class="artnav">'+(pv?'<a class="pv" href="'+LU(pv)+'">← '+esc(N.prev)+'<small>'+esc(pv)+' '+esc(navTitle(pv))+'</small></a>':'<span></span>')+'<a class="toc" href="'+esc(home)+'">☰ '+esc(N.toc)+'</a>'+(nk?'<a class="nx" href="'+LU(nk)+'">'+esc(N.next)+' →<small>'+esc(nk)+' '+esc(navTitle(nk))+'</small></a>':'<span></span>')+'</nav>';
  $('#main').innerHTML=h;
  $('#foot').innerHTML=U.copy+' — '+esc(L.series)+' '+esc(C.meta.no)+(C.meta.home?'　<a href="'+esc(C.meta.home)+'">'+esc(U.home)+'</a>':'');
  document.querySelectorAll('.q').forEach(function(q){q.querySelectorAll('.opt').forEach(function(b){b.addEventListener('click',function(){var a=+q.dataset.a;q.querySelectorAll('.opt').forEach(function(x){x.classList.remove('right','wrong')});b.classList.add(+b.dataset.i===a?'right':'wrong');q.querySelector('.opt[data-i="'+a+'"]').classList.add('right');q.classList.add('done')})})});
}
(function(){if((ST&&ST.updated)||window.LESSON_DATES)return;try{var cs=document.currentScript,b=cs&&cs.src?cs.src.replace(/article\.js(\?.*)?$/,''):'';if(!b)return;var n=0,need=window.UPDATES?1:2,done=function(){if(++n===need)render()};['lesson_dates.js','updates.js'].forEach(function(f){if(f==='updates.js'&&window.UPDATES)return;var el=document.createElement('script');el.src=b+f;el.onload=done;el.onerror=done;document.head.appendChild(el)})}catch(e){}})();
render();
/* 画面からはみ出す表に .fit を付ける（article.css で長い1列目・見出しを折り返す）。開いたとき・画面の大きさが変わったとき・再描画のときに確かめ直す */
(function(){function fit(){Array.prototype.forEach.call(document.querySelectorAll('.tbl'),function(t){t.classList.remove('fit');if(t.scrollWidth>t.clientWidth+2)t.classList.add('fit')})}
var q=0;function soon(){if(q)return;q=1;setTimeout(function(){q=0;fit()},80)}
function start(){fit();var m=document.getElementById('main');if(m&&window.MutationObserver)new MutationObserver(soon).observe(m,{childList:true});window.addEventListener('resize',soon);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();
})();
(function(){var s=document.currentScript&&document.currentScript.src;if(!s)return;var e=document.createElement('script');e.src=new URL('nav.js',s).href;document.head.appendChild(e)})();

/* 表の見出し（中央ぞろえ）と中身の位置をそろえる：すべての行が1行で表示される列は中央ぞろえにする。言語の切り替え・画面の幅の変更のたびに判断し直す */
(function(){
function oneLine(td){var r=document.createRange();r.selectNodeContents(td);var rs=r.getClientRects(),tops={};for(var i=0;i<rs.length;i++){if(rs[i].width>0)tops[Math.round(rs[i].top)]=1}return Object.keys(tops).length<=1}
function run(){var m=document.getElementById('main');if(!m)return;Array.prototype.forEach.call(m.querySelectorAll('.tbl table'),function(tb){var rows=tb.tBodies[0]?Array.prototype.slice.call(tb.tBodies[0].rows):[];if(!rows.length)return;var n=rows[0].cells.length;for(var c=0;c<n;c++){var cells=[],base=true;rows.forEach(function(r){var td=r.cells[c];if(td)cells.push(td)});if(!cells.length||cells[0].classList.contains('lb'))continue;cells.forEach(function(td){td.classList.remove('ac')});var all=cells.every(function(td){return td.classList.contains('c')||oneLine(td)});if(all)cells.forEach(function(td){if(!td.classList.contains('c'))td.classList.add('ac')})}})}
var q=0;function soon(){if(q)return;q=1;setTimeout(function(){q=0;run()},60)}
function start(){try{if(typeof document.createRange().getClientRects!=='function')return}catch(e){return}var st=document.createElement('style');st.textContent='td.ac{text-align:center}';document.head.appendChild(st);run();var m=document.getElementById('main');if(m)new MutationObserver(soon).observe(m,{childList:true});window.addEventListener('resize',soon);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
