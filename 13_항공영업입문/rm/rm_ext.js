/* 収益管理の練習 ― 拡張モジュール（2026.09）
   ⑤ 客室ごとの26クラス（EMSR-b）  ⑥ 予約の積み上がり（ブッキングカーブ）のシミュレーション  ⑦ 問題と解説
   本体（収益管理の練習.html）の phi / Phi / inv / yen / g / clamp と、言語 L を使う。数値はすべて練習用。 */
(function(){
window.RM_EXT=window.RM_EXT||[];
function L3(ja,ko,en){return {ja:ja,ko:ko,en:en}}
function tx(o){return o[L]||o.ja}
function f(o,v){var s=tx(o);for(var k in v)s=s.split('{'+k+'}').join(v[k]);return s}
function $(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function nm(x){return Math.round(x).toLocaleString('en-US')}

/* ---------- 客室と26クラス（練習用の運賃・需要） ---------- */
var CABINS=[
 {id:'F',name:L3('ファースト','퍼스트','First'),cap:8,cl:[['F',250000,2,1],['A',200000,3,1.5],['P',160000,4,2]]},
 {id:'J',name:L3('ビジネス','비즈니스','Business'),cap:36,cl:[['J',150000,4,2],['C',130000,8,3],['D',110000,10,4],['I',90000,12,4],['Z',75000,15,5]]},
 {id:'W',name:L3('プレミアムエコノミー','프리미엄 이코노미','Premium Economy'),cap:24,cl:[['W',70000,5,2],['E',55000,8,3],['R',45000,15,5]]},
 {id:'Y',name:L3('エコノミー','이코노미','Economy'),cap:200,cl:[['Y',60000,6,2.5],['B',52000,8,3],['M',45000,10,3.5],['H',40000,12,4],['K',36000,14,5],['L',32000,16,5],['Q',28000,18,6],['T',25000,18,6],['V',22000,20,7],['S',20000,20,7],['N',18000,22,8],['X',16000,22,8],['O',14000,24,8],['G',12000,24,8],['U',10000,26,9]]}];
/* 状態（客室ごとの容量・現在の予約数・クラスの運賃と需要） */
var ST={cab:CABINS.map(function(c){return {id:c.id,cap:c.cap,bk:0,cl:c.cl.map(function(x){return x.slice()})}})};

/* EMSR-b：運賃の高い順に並べたクラスに、入れ子の保護席数と予約の上限を返す */
function emsrb(cl,C){var s=cl.slice().sort(function(a,b){return b[1]-a[1]}),prot=[],steps=[];
 for(var j=0;j<s.length-1;j++){var agg=s.slice(0,j+1),m=0,v=0,w=0;agg.forEach(function(c){m+=c[2];v+=c[3]*c[3];w+=c[1]*c[2]});
  var sd=Math.sqrt(v),pb=m>0?w/m:agg[0][1],r=pb>0?s[j+1][1]/pb:1,z=inv(1-r),y=clamp(m+sd*z,0,C);prot.push(y);
  steps.push({g:agg.map(function(c){return c[0]}).join('+'),m:m,vs:agg.map(function(c){return c[3]+'²'}).join('+'),s:sd,pb:pb,n:s[j+1][0],pn:s[j+1][1],r:r,z:z,y:y,lim:Math.max(0,C-Math.round(y))})}
 var lim=s.map(function(c,i){return i===0?C:Math.max(0,C-Math.round(prot[i-1]))});
 return {cl:s,prot:prot,lim:lim,steps:steps}}

/* ================= ⑤ 客室ごとの26クラス ================= */
var T5={lab:L3('客室ごとの26クラス','객실별 26클래스','26 classes by cabin'),
 lead:L3('実際の航空会社は、客室ごとに10以上の予約クラス（RBD）を持ちます。ここでは4つの客室に26のクラスを置き、客室ごとにEMSR-bで保護席数と予約の上限を計算します。客室の間の入れ子（アップグレード）は考えません。','실제 항공사는 객실마다 10개 이상의 예약 클래스(RBD)를 둡니다. 여기서는 4개 객실에 26개 클래스를 두고, 객실별로 EMSR-b로 보호 좌석 수와 판매 한도를 계산합니다. 객실 간 네스팅(업그레이드)은 고려하지 않습니다.','Real airlines run ten or more booking classes (RBDs) per cabin. Here four cabins hold 26 classes, and EMSR-b gives protection levels and booking limits cabin by cabin. Nesting across cabins (upgrades) is not modelled.'),
 cap:L3('座席数','좌석 수','Seats'),bk:L3('現在の予約数（客室の合計）','현재 예약 수(객실 합계)','Bookings so far (cabin total)'),
 cls:L3('クラス','클래스','Class'),fare:L3('運賃（円）','운임(엔)','Fare (¥)'),mu:L3('需要の平均','수요 평균','Mean demand'),sd:L3('標準偏差','표준편차','SD'),
 pl:L3('保護席数（このクラスまで）','보호 좌석 수(이 클래스까지)','Protection (up to this class)'),lim:L3('予約の上限','판매 한도','Booking limit'),st:L3('今の状態','현재 상태','Status now'),
 open:L3('販売中','판매 중','Open'),closed:L3('閉鎖','닫힘','Closed'),left:L3('残り{n}席','남은 {n}석','{n} left'),
 sum:L3('客室のまとめ','객실 요약','Cabin summary'),dsum:L3('需要の平均の合計','수요 평균 합계','Total mean demand'),
 erev:L3('運賃で重みをつけた平均','수요 가중 평균 운임','Demand-weighted fare'),
 how:L3('計算の過程を見る','계산 과정 보기','Show the working'),hide:L3('計算の過程を閉じる','계산 과정 닫기','Hide the working'),
 step:L3('{g}を守る：需要の平均 {m}、標準偏差 √({vs})＝{s}、需要で重みをつけた運賃 ¥{pb}。次の{n}（¥{pn}）との比 r＝{r}、z＝Φ⁻¹(1−r)＝{z}、保護席数＝{y} → {n}の上限＝{lim}席','{g} 보호: 수요 평균 {m}, 표준편차 √({vs})={s}, 수요 가중 운임 ¥{pb}. 다음 {n}(¥{pn})과의 비율 r={r}, z=Φ⁻¹(1−r)={z}, 보호 좌석 수={y} → {n} 한도={lim}석','Protect {g}: mean demand {m}, SD √({vs}) = {s}, demand-weighted fare ¥{pb}. Ratio to {n} (¥{pn}) r = {r}, z = Φ⁻¹(1 − r) = {z}, protection = {y} → limit for {n} = {lim} seats'),
 reset:L3('練習用の値に戻す','연습용 값으로 되돌리기','Reset to practice values'),
 note:L3('※ 上限は「客室の予約の合計がこの数に達したらそのクラスを閉じる」という入れ子の上限です。予約が上限に達したクラスは「閉鎖」になり、それより高いクラスは売り続けます。実際のシステムは需要の予測を毎日更新し、乗り継ぎ（入札価格）とオーバーブッキングも合わせて計算します。','※ 한도는 ‘객실 예약 합계가 이 수에 이르면 그 클래스를 닫는다’는 네스팅 한도입니다. 예약이 한도에 이른 클래스는 ‘닫힘’이 되고 그보다 비싼 클래스는 계속 팝니다. 실제 시스템은 수요 예측을 매일 갱신하고 환승(입찰 가격)과 오버부킹도 함께 계산합니다.','* A limit is a nested cap: when cabin bookings reach it, that class closes while higher classes stay open. Real systems refresh forecasts daily and add connections (bid prices) and overbooking.'),
 pt:L3('見どころ：安いクラスほど早く閉じ、高いクラスは最後まで開いています。運賃の差が大きい客室（ビジネス）ほど、上のクラスのために多くの席を守ります。','볼 점: 싼 클래스일수록 일찍 닫히고 비싼 클래스는 마지막까지 열려 있습니다. 운임 차이가 큰 객실(비즈니스)일수록 위 클래스를 위해 많은 좌석을 지킵니다.','What to notice: cheaper classes close first while the top class stays open to the end. Cabins with wide fare gaps (business) protect more seats for the upper classes.')};
function view5(){var t=T5,h='<p class="lead">'+tx(t.lead)+'</p>';
 ST.cab.forEach(function(c,ci){var C=CABINS[ci];h+='<div class="card" style="margin-top:12px"><h2>'+C.id+' '+tx(C.name)+'</h2><div style="display:flex;gap:18px;flex-wrap:wrap"><label><span>'+tx(t.cap)+'</span><input type="number" id="c5cap'+ci+'" value="'+c.cap+'"></label><label><span>'+tx(t.bk)+'</span><input type="number" id="c5bk'+ci+'" value="'+c.bk+'"></label></div><div class="tw" id="c5t'+ci+'"></div><div id="c5s'+ci+'"></div></div>'});
 h+='<p class="note">'+tx(t.note)+'</p><button class="btn" id="c5reset">'+tx(t.reset)+'</button>';return h}
function calc5(){var t=T5;ST.cab.forEach(function(c,ci){c.cap=Math.max(1,Math.round(g('c5cap'+ci)||1));c.bk=Math.max(0,Math.round(g('c5bk'+ci)||0));
  c.cl.forEach(function(x,i){var e;if((e=$('c5f'+ci+'_'+i))&&!isNaN(+e.value))x[1]=+e.value;if((e=$('c5m'+ci+'_'+i))&&!isNaN(+e.value))x[2]=Math.max(0,+e.value);if((e=$('c5d'+ci+'_'+i))&&!isNaN(+e.value))x[3]=Math.max(0.1,+e.value)});
  var r=emsrb(c.cl,c.cap),h='<table><tr><th>'+tx(t.cls)+'</th><th>'+tx(t.fare)+'</th><th>'+tx(t.mu)+'</th><th>'+tx(t.sd)+'</th><th>'+tx(t.pl)+'</th><th>'+tx(t.lim)+'</th><th>'+tx(t.st)+'</th></tr>';
  var dm=0,w=0;r.cl.forEach(function(x,i){var idx=c.cl.indexOf(x);dm+=x[2];w+=x[1]*x[2];var open=c.bk<r.lim[i];
   h+='<tr'+(open?'':' style="opacity:.55"')+'><td class="c">'+x[0]+'</td><td class="n"><input type="number" id="c5f'+ci+'_'+idx+'" value="'+x[1]+'" step="1000"></td><td class="n"><input type="number" id="c5m'+ci+'_'+idx+'" value="'+x[2]+'"></td><td class="n"><input type="number" id="c5d'+ci+'_'+idx+'" value="'+x[3]+'" step="0.5"></td><td class="n">'+(i<r.prot.length?r.prot[i].toFixed(1)+' → '+Math.round(r.prot[i]):'—')+'</td><td class="n"><b>'+r.lim[i]+'</b></td><td class="c" style="color:'+(open?'var(--ok)':'var(--ng)')+'">'+(open?tx(t.open)+' · '+f(t.left,{n:r.lim[i]-c.bk}):tx(t.closed))+'</td></tr>'});
  h+='</table>';$('c5t'+ci).innerHTML=h;
  var open=$('c5s'+ci).getAttribute('data-open')==='1';
  $('c5s'+ci).innerHTML='<div class="res"><div>'+tx(t.dsum)+'：<b>'+dm.toFixed(0)+'</b>（'+tx(t.cap)+' '+c.cap+'）　'+tx(t.erev)+'：<b>¥'+yen(dm?w/dm:0)+'</b></div></div><button class="btn" data-w="'+ci+'">'+tx(open?t.hide:t.how)+'</button>'+(open?'<div class="xpl"><ol>'+r.steps.map(function(s){return '<li>'+f(t.step,{g:s.g,m:s.m,vs:s.vs,s:s.s.toFixed(2),pb:yen(s.pb),n:s.n,pn:yen(s.pn),r:s.r.toFixed(3),z:s.z.toFixed(3).replace('-','−'),y:s.y.toFixed(1),lim:s.lim})+'</li>'}).join('')+'</ol></div>':'');
  $('c5s'+ci).querySelector('button').onclick=function(){$('c5s'+ci).setAttribute('data-open',open?'0':'1');calc5()};
  Array.prototype.forEach.call($('c5t'+ci).querySelectorAll('input'),function(e){e.onchange=calc5})});
 if(!$('c5pt')){var p=document.createElement('p');p.id='c5pt';p.className='note';p.textContent=tx(t.pt);$('c5reset').parentNode.insertBefore(p,$('c5reset'))}}
function bind5(){Array.prototype.forEach.call(document.querySelectorAll('#main input'),function(e){e.oninput=calc5});$('c5reset').onclick=function(){ST.cab=CABINS.map(function(c){return {id:c.id,cap:c.cap,bk:0,cl:c.cl.map(function(x){return x.slice()})}});$('main').innerHTML=view5();bind5();calc5()};calc5()}
window.RM_EXT.push({label:T5.lab,view:view5,bind:bind5});

/* ================= ⑥ ブッキングカーブのシミュレーション ================= */
var T6={lab:L3('予約の積み上がり（シミュレーション）','부킹 커브 시뮬레이션','Booking-curve simulation'),
 lead:L3('出発の60日前から当日まで、エコノミー15クラスの予約が日ごとに入ってくる様子を再現します。同じ需要に対して「先着順（RMなし）」「固定の上限」「動く上限（7日ごとに再計算）」の3つの売り方を並べて、収入の差と、クラスが閉じたり開き直したりする動きを見ます。','출발 60일 전부터 당일까지 이코노미 15개 클래스 예약이 날짜별로 들어오는 모습을 재현합니다. 같은 수요에 대해 ‘선착순(RM 없음)’ ‘고정 한도’ ‘움직이는 한도(7일마다 재계산)’ 세 가지 판매 방식을 나란히 놓고 수입 차이와 클래스가 닫히고 다시 열리는 움직임을 봅니다.','Replays bookings arriving day by day for 15 economy classes from 60 days out to departure. The same demand is sold three ways — first come first served (no RM), fixed limits, and moving limits recalculated every 7 days — to compare revenue and watch classes close and reopen.'),
 seed:L3('需要の組み合わせ','수요 조합','Demand draw'),newd:L3('新しい需要を作る','새 수요 만들기','New demand'),step:L3('1日進める','하루 진행','Next day'),wk:L3('7日進める','7일 진행','Next 7 days'),end:L3('最後まで','끝까지','Run to departure'),rst:L3('60日前に戻す','60일 전으로','Back to day −60'),
 day:L3('出発の{d}日前','출발 {d}일 전','{d} days before departure'),dep:L3('出発日','출발일','Departure day'),
 fcfs:L3('先着順（RMなし）','선착순(RM 없음)','First come, first served'),stat:L3('固定の上限','고정 한도','Fixed limits'),dyn:L3('動く上限（7日ごと再計算）','움직이는 한도(7일마다 재계산)','Moving limits (weekly)'),
 bk:L3('予約数','예약 수','Bookings'),rev:L3('収入（円）','수입(엔)','Revenue (¥)'),lf:L3('搭乗率','탑승률','Load factor'),avg:L3('平均運賃','평균 운임','Average fare'),ref:L3('お断りした要求','거절한 요청','Requests refused'),diff:L3('先着順との差','선착순 대비','vs first come'),
 chart:L3('予約の積み上がり（客室の合計）','예약 누적(객실 합계)','Cumulative bookings (cabin total)'),
 byc:L3('クラスごとの結果（出発時）','클래스별 결과(출발 시)','Result by class (at departure)'),cls:L3('クラス','클래스','Class'),fare:L3('運賃','운임','Fare'),dem:L3('要求','요청','Requests'),
 log:L3('何が起きたか','무슨 일이 있었나','What happened'),
 evClose:L3('{d}日前：{s}で{c}クラスを閉鎖（予約 {b} が上限 {l} に到達）','{d}일 전: {s}에서 {c} 클래스 닫힘(예약 {b}이 한도 {l}에 도달)','Day −{d}: {s} closed class {c} (bookings {b} reached limit {l})'),
 evOpen:L3('{d}日前：{s}で{c}クラスを再び開放（上限を{l}に見直し）','{d}일 전: {s}에서 {c} 클래스 재개방(한도를 {l}로 재계산)','Day −{d}: {s} reopened class {c} (limit revised to {l})'),
 evFull:L3('{d}日前：{s}で満席（{c}席）','{d}일 전: {s}에서 만석({c}석)','Day −{d}: {s} sold out ({c} seats)'),
 sum:L3('まとめ：先着順は安いクラスで早く埋まり、直前に来る高い運賃のお客様を{r}人断りました。上限を置くと安いクラスを早めに閉じて席を守るので、予約数は少なくても収入は{p}%多くなりました。動く上限は、予想より予約が少ないときに安いクラスを開き直して空席を減らします。','정리: 선착순은 싼 클래스로 일찍 차서 직전에 오는 비싼 운임 고객 {r}명을 거절했습니다. 한도를 두면 싼 클래스를 일찍 닫아 좌석을 지키므로 예약 수는 적어도 수입은 {p}% 많았습니다. 움직이는 한도는 예상보다 예약이 적을 때 싼 클래스를 다시 열어 빈 좌석을 줄입니다.','Summary: first come first served filled up early with cheap classes and turned away {r} late high-fare customers. Limits close cheap classes early to protect seats, so bookings are fewer but revenue is {p}% higher. Moving limits reopen cheap classes when bookings run below forecast, cutting empty seats.'),
 note:L3('※ 需要は⑤のエコノミーの平均・標準偏差から乱数で作り、安いクラスほど早く（40〜50日前）、高いクラスほど直前（数日前）に来るように分けています。同じ「需要の組み合わせ」なら3つの売り方は同じ要求を受けます。オーバーブッキング・キャンセル・乗り継ぎは入れていません。運賃の幅を大きく取った練習用の数字なので差が大きく出ますが、航空会社が報告するRMの効果は収入の数%〜10%程度です。','※ 수요는 ⑤의 이코노미 평균·표준편차로 난수를 만들어, 싼 클래스일수록 일찍(40~50일 전), 비싼 클래스일수록 직전(며칠 전)에 오도록 나눴습니다. 같은 ‘수요 조합’이면 세 판매 방식은 같은 요청을 받습니다. 오버부킹·취소·환승은 넣지 않았습니다. 운임 폭을 크게 잡은 연습용 숫자라 차이가 크게 나오지만, 항공사가 보고하는 RM 효과는 수입의 수%~10% 정도입니다.','* Demand is drawn at random from the economy means and SDs in ⑤, with cheap classes arriving early (40–50 days out) and expensive ones close to departure. The same demand draw feeds all three strategies. No overbooking, cancellations or connections. The wide practice fare range exaggerates the gap; airlines typically report RM gains of a few per cent to about 10% of revenue.')};
var SIM={seed:1,day:60,req:null,run:null};
function rng(seed){var s=seed*9301+49297;return function(){s=(s*9301+49297)%233280;return s/233280}}
function gauss(r){var u=Math.max(1e-9,r()),v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
function ycl(){return emsrb(ST.cab[3].cl,ST.cab[3].cap).cl}
function weights(rank,n){var c=3+rank*(47/(n-1)),w=[];for(var d=60;d>=0;d--)w.push(Math.exp(-Math.pow((d-c)/9,2)));var s=w.reduce(function(a,b){return a+b},0);return w.map(function(x){return x/s})}
function makeDemand(){var cl=ycl(),r=rng(SIM.seed),req=[];for(var d=0;d<=60;d++)req.push([]);
 cl.forEach(function(c,i){var tot=Math.max(0,Math.round(c[2]+c[3]*gauss(r))),w=weights(i,cl.length);for(var k=0;k<tot;k++){var u=r(),acc=0,di=0;for(;di<w.length;di++){acc+=w[di];if(u<=acc)break}req[Math.min(di,60)].push(i)}});
 SIM.req=req;SIM.day=60;SIM.run=null}
function remainMeans(cl,dayIdx){return cl.map(function(c,i){var w=weights(i,cl.length),fr=0;for(var k=dayIdx;k<w.length;k++)fr+=w[k];return [c[0],c[1],c[2]*fr,c[3]*Math.sqrt(Math.max(fr,1e-6))]})}
function runTo(target){var cl=ycl(),C=ST.cab[3].cap;if(!SIM.req)makeDemand();
 if(!SIM.run){var base=emsrb(cl,C).lim;SIM.run={fcfs:{bk:0,rev:0,ref:0,by:cl.map(function(){return 0}),lim:cl.map(function(){return C}),cum:[],ev:[]},stat:{bk:0,rev:0,ref:0,by:cl.map(function(){return 0}),lim:base.slice(),cum:[],ev:[]},dyn:{bk:0,rev:0,ref:0,by:cl.map(function(){return 0}),lim:base.slice(),cum:[],ev:[]}};SIM.day=60}
 var R=SIM.run,names={fcfs:T6.fcfs,stat:T6.stat,dyn:T6.dyn};
 while(SIM.day>=target&&SIM.day>=0){var dIdx=60-SIM.day,reqs=SIM.req[dIdx];
  if(SIM.day<60&&SIM.day%7===0&&SIM.day>0){var d=R.dyn,rem=C-d.bk,rm=remainMeans(cl,dIdx),nl=rem>0?emsrb(rm,rem).lim.map(function(x){return x+d.bk}):cl.map(function(){return d.bk});
   nl.forEach(function(x,i){if(x>d.lim[i]&&d.bk>=d.lim[i]&&x>d.bk)d.ev.push(f(T6.evOpen,{d:SIM.day,s:tx(T6.dyn),c:cl[i][0],l:x}))});d.lim=nl}
  reqs.forEach(function(ci){['fcfs','stat','dyn'].forEach(function(k){var s=R[k];if(s.bk<s.lim[ci]&&s.bk<C){s.bk++;s.rev+=cl[ci][1];s.by[ci]++;
     for(var j=cl.length-1;j>=0;j--)if(s.bk===s.lim[j]&&s.lim[j]<C)s.ev.push(f(T6.evClose,{d:SIM.day,s:tx(names[k]),c:cl[j][0],b:s.bk,l:s.lim[j]}));
     if(s.bk===C)s.ev.push(f(T6.evFull,{d:SIM.day,s:tx(names[k]),c:C}))}else s.ref++})});
  ['fcfs','stat','dyn'].forEach(function(k){R[k].cum.push(R[k].bk)});SIM.day--}
 if(SIM.day<0)SIM.day=-1}
function view6(){var t=T6;return '<p class="lead">'+tx(t.lead)+'</p><div class="card"><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><label><span>'+tx(t.seed)+'</span><input type="number" id="s6seed" value="'+SIM.seed+'"></label><button class="btn" id="s6new">'+tx(t.newd)+'</button><button class="btn" id="s6step">'+tx(t.step)+'</button><button class="btn" id="s6wk">'+tx(t.wk)+'</button><button class="btn" id="s6end">'+tx(t.end)+'</button><button class="btn" id="s6rst">'+tx(t.rst)+'</button></div><div id="s6day" style="margin-top:8px;font-weight:700"></div></div><div class="grid" style="margin-top:12px"><div class="card"><h2>'+tx(t.chart)+'</h2><div id="s6chart"></div></div><div class="card"><h2 id="s6h2"></h2><div class="tw" id="s6tab"></div></div></div><div class="card" style="margin-top:12px"><h2>'+tx(t.byc)+'</h2><div class="tw" id="s6byc"></div></div><div class="card" style="margin-top:12px"><h2>'+tx(t.log)+'</h2><div id="s6log" class="xpl" style="max-height:280px;overflow:auto"></div></div><p class="note">'+tx(t.note)+'</p>'}
function draw6(){var t=T6,cl=ycl(),C=ST.cab[3].cap;if(!SIM.req)makeDemand();if(!SIM.run)runTo(61);var R=SIM.run;
 $('s6day').textContent=SIM.day<0?tx(t.dep):f(t.day,{d:SIM.day});
 var W=560,H=260,P=44,n=61,mx=C*1.05,sx=function(i){return P+(W-P-10)*i/(n-1)},sy=function(v){return H-28-(H-44)*v/mx};
 var col={fcfs:'#9aa9b8',stat:'#C2417A',dyn:'#1d5fa0'},svg='<svg viewBox="0 0 '+W+' '+H+'"><rect width="'+W+'" height="'+H+'" fill="#fff"/><line x1="'+P+'" y1="'+sy(C)+'" x2="'+(W-10)+'" y2="'+sy(C)+'" stroke="#c2344f" stroke-dasharray="4 4"/><text x="'+(P+4)+'" y="'+(sy(C)-4)+'" font-size="11" fill="#c2344f">'+tx(t.bk)+' = '+C+'</text><line x1="'+P+'" y1="'+(H-28)+'" x2="'+(W-10)+'" y2="'+(H-28)+'" stroke="#9aa9b8"/><line x1="'+P+'" y1="12" x2="'+P+'" y2="'+(H-28)+'" stroke="#9aa9b8"/>';
 [60,45,30,15,0].forEach(function(d){svg+='<text x="'+sx(60-d)+'" y="'+(H-10)+'" font-size="11" text-anchor="middle" fill="#5b6b7d">−'+d+'</text>'});
 ['fcfs','stat','dyn'].forEach(function(k){var c=R[k].cum;if(!c.length)return;svg+='<path d="'+c.map(function(v,i){return (i?'L':'M')+sx(i).toFixed(1)+' '+sy(v).toFixed(1)}).join(' ')+'" fill="none" stroke="'+col[k]+'" stroke-width="2.2"/>'});
 svg+='<text x="'+(W-10)+'" y="16" font-size="11" text-anchor="end" fill="'+col.fcfs+'">■ '+tx(t.fcfs)+'</text><text x="'+(W-10)+'" y="30" font-size="11" text-anchor="end" fill="'+col.stat+'">■ '+tx(t.stat)+'</text><text x="'+(W-10)+'" y="44" font-size="11" text-anchor="end" fill="'+col.dyn+'">■ '+tx(t.dyn)+'</text></svg>';
 $('s6chart').innerHTML=svg;
 $('s6h2').textContent=SIM.day<0?tx(t.dep):f(t.day,{d:SIM.day});
 var h='<table><tr><th></th><th>'+tx(t.bk)+'</th><th>'+tx(t.rev)+'</th><th>'+tx(t.lf)+'</th><th>'+tx(t.avg)+'</th><th>'+tx(t.ref)+'</th><th>'+tx(t.diff)+'</th></tr>';
 ['fcfs','stat','dyn'].forEach(function(k){var s=R[k],d=s.rev-R.fcfs.rev;h+='<tr><td class="c" style="color:'+col[k]+'">'+tx(T6[k])+'</td><td class="n">'+s.bk+'</td><td class="n">¥'+yen(s.rev)+'</td><td class="n">'+(100*s.bk/C).toFixed(1)+'%</td><td class="n">¥'+yen(s.bk?s.rev/s.bk:0)+'</td><td class="n">'+s.ref+'</td><td class="n">'+(k==='fcfs'?'—':(d>=0?'+':'−')+'¥'+yen(Math.abs(d))+' ('+(R.fcfs.rev?(100*d/R.fcfs.rev).toFixed(1):'0')+'%)')+'</td></tr>'});
 $('s6tab').innerHTML=h+'</table>';
 var tot=cl.map(function(){return 0});SIM.req.forEach(function(day,di){if(60-di>=SIM.day+1||SIM.day<0)day.forEach(function(ci){tot[ci]++})});
 var b='<table><tr><th>'+tx(t.cls)+'</th><th>'+tx(t.fare)+'</th><th>'+tx(t.dem)+'</th><th>'+tx(t.fcfs)+'</th><th>'+tx(t.stat)+'</th><th>'+tx(t.dyn)+'</th><th>'+tx(t.lim)+'</th></tr>';
 cl.forEach(function(c,i){b+='<tr><td class="c">'+c[0]+'</td><td class="n">¥'+yen(c[1])+'</td><td class="n">'+tot[i]+'</td><td class="n">'+R.fcfs.by[i]+'</td><td class="n">'+R.stat.by[i]+'</td><td class="n">'+R.dyn.by[i]+'</td><td class="n">'+R.stat.lim[i]+' / '+R.dyn.lim[i]+'</td></tr>'});
 $('s6byc').innerHTML=b+'</table>';
 var ev=[].concat(R.fcfs.ev,R.stat.ev,R.dyn.ev);var lg=ev.length?'<ol>'+ev.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ol>':'';
 if(SIM.day<0){var p=R.fcfs.rev?100*(R.stat.rev-R.fcfs.rev)/R.fcfs.rev:0;lg+='<p><b>'+f(t.sum,{r:R.fcfs.ref,p:p.toFixed(1)})+'</b></p>'}
 $('s6log').innerHTML=lg||'—'}
T6.lim=L3('上限（固定 / 動く）','한도(고정 / 움직임)','Limit (fixed / moving)');
function bind6(){$('s6new').onclick=function(){SIM.seed=Math.max(1,Math.round(g('s6seed')||1))+1;$('s6seed').value=SIM.seed;makeDemand();runTo(61);draw6()};
 $('s6seed').onchange=function(){SIM.seed=Math.max(1,Math.round(g('s6seed')||1));makeDemand();runTo(61);draw6()};
 $('s6step').onclick=function(){if(SIM.day>=0)runTo(SIM.day);draw6()};$('s6wk').onclick=function(){if(SIM.day>=0)runTo(Math.max(0,SIM.day-6));draw6()};
 $('s6end').onclick=function(){runTo(0);draw6()};$('s6rst').onclick=function(){SIM.run=null;SIM.day=60;runTo(61);draw6()};
 if(!SIM.req)makeDemand();runTo(61);draw6()}
window.RM_EXT.push({label:T6.lab,view:view6,bind:bind6});

/* ================= ⑦ 問題と解説 ================= */
var T7={lab:L3('問題と解説','문제와 해설','Quiz with explanations'),
 lead:L3('数字を変えて出題します。答えると、正解と計算の過程が出ます。レッスン7-3〜7-7と、このページの①〜⑥の考え方を確かめてください。','숫자를 바꿔 출제합니다. 답하면 정답과 계산 과정이 나옵니다. 레슨 7-3~7-7과 이 페이지 ①~⑥의 사고방식을 확인하세요.','Questions use fresh numbers each time. After you answer, the correct answer and the working appear. They cover lessons 7-3 to 7-7 and tabs ① to ⑥ on this page.'),
 q:L3('問','문제','Q'),ok:L3('正解！','정답!','Correct!'),ng:L3('残念…','아쉬워요…','Not quite.'),an:L3('答え：','정답: ','Answer: '),xp:L3('解説','해설','Explanation'),nx:L3('次の問題','다음 문제','Next question'),res:L3('結果','결과','Result'),ag:L3('もう一度（新しい問題）','다시 하기(새 문제)','Try again (new questions)')};
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
function opts(ans,wr){var o=[String(ans)];wr.forEach(function(w){w=String(w);if(o.indexOf(w)<0&&o.length<4)o.push(w)});var k=1;while(o.length<4){o.push(String(ans)+'?'+k);k++}o=shuf(o);return {o:o,a:o.indexOf(String(ans))}}
var Q7=[
 function(){var pH=rnd(4,7)*10000,pL=rnd(15,30)*1000,mu=rnd(20,40),sd=rnd(6,12),r=pL/pH,z=inv(1-r),y=Math.round(mu+sd*z);var o=opts(y,[Math.round(mu+sd*inv(r)),mu,Math.round(mu+sd)]);
  return {q:f(L3('高い運賃¥{h}・安い運賃¥{l}、高い運賃の需要の平均{m}人・標準偏差{s}人。リトルウッドの法則で守る席数は？','비싼 운임 ¥{h}·싼 운임 ¥{l}, 비싼 운임 수요 평균 {m}명·표준편차 {s}명. 리틀우드 법칙으로 지킬 좌석 수는?','High fare ¥{h}, low fare ¥{l}, high-fare demand mean {m}, SD {s}. How many seats does Littlewood’s rule protect?'),{h:yen(pH),l:yen(pL),m:mu,s:sd}),o:o.o.map(function(x){return x+tx(L3('席','석',' seats'))}),a:o.a,
   x:f(L3('r＝安い÷高い＝{l}÷{h}＝{r}。z＝Φ⁻¹(1−r)＝Φ⁻¹({q})＝{z}。保護席数＝平均＋標準偏差×z＝{m}＋{s}×{z}＝{y}席。zの符号を間違えると（Φ⁻¹(r)を使うと）値が反対に動きます。','r=싼÷비싼={l}÷{h}={r}. z=Φ⁻¹(1−r)=Φ⁻¹({q})={z}. 보호 좌석 수=평균+표준편차×z={m}+{s}×{z}={y}석. z의 부호를 잘못 잡으면(Φ⁻¹(r)을 쓰면) 값이 반대로 움직입니다.','r = low ÷ high = {l} ÷ {h} = {r}. z = Φ⁻¹(1 − r) = Φ⁻¹({q}) = {z}. Protection = mean + SD × z = {m} + {s} × {z} = {y} seats. Using Φ⁻¹(r) instead flips the sign and moves the answer the wrong way.'),{l:yen(pL),h:yen(pH),r:r.toFixed(3),q:(1-r).toFixed(3),z:z.toFixed(3).replace('-','−'),m:mu,s:sd,y:y})}},
 function(){var C=rnd(12,20)*10,y=rnd(20,60);var o=opts(C-y,[C+y,y,C]);
  return {q:f(L3('座席数{c}、高い運賃のために守る席数が{y}のとき、安い運賃の予約の上限は？','좌석 수 {c}, 비싼 운임을 위해 지키는 좌석 수가 {y}일 때 싼 운임의 판매 한도는?','With {c} seats and {y} protected for the high fare, what is the booking limit for the low fare?'),{c:C,y:y}),o:o.o.map(function(x){return x+tx(L3('席','석',' seats'))}),a:o.a,
   x:f(L3('予約の上限＝座席数−保護席数＝{c}−{y}＝{b}席。安い運賃の予約が{b}に達したら、そのクラスを閉じて残りの{y}席を高い運賃のお客様のために残します。','판매 한도=좌석 수−보호 좌석 수={c}−{y}={b}석. 싼 운임 예약이 {b}에 이르면 그 클래스를 닫고 남은 {y}석을 비싼 운임 고객을 위해 남깁니다.','Booking limit = seats − protection = {c} − {y} = {b}. When low-fare bookings reach {b}, the class closes and the remaining {y} seats are kept for high-fare customers.'),{c:C,y:y,b:C-y})}},
 function(){var fy=rnd(5,7)*10000,fb=rnd(35,48)*1000,my=rnd(8,16),mb=rnd(12,24),pb=(fy*my+fb*mb)/(my+mb);var o=opts(yen(Math.round(pb)),[yen(Math.round((fy+fb)/2)),yen(fy),yen(fb)]);
  return {q:f(L3('Yクラス（¥{fy}・需要{my}人）とBクラス（¥{fb}・需要{mb}人）をまとめたとき、EMSR-bで使う「需要で重みをつけた運賃」は？','Y클래스(¥{fy}·수요 {my}명)와 B클래스(¥{fb}·수요 {mb}명)를 묶었을 때 EMSR-b에서 쓰는 ‘수요 가중 운임’은?','Combining class Y (¥{fy}, demand {my}) and class B (¥{fb}, demand {mb}), what demand-weighted fare does EMSR-b use?'),{fy:yen(fy),my:my,fb:yen(fb),mb:mb}),o:o.o.map(function(x){return '¥'+x}),a:o.a,
   x:f(L3('（¥{fy}×{my}＋¥{fb}×{mb}）÷（{my}＋{mb}）＝¥{pb}。単純な平均（¥{av}）ではなく、需要の多いクラスの運賃に近づけます。この運賃と次のクラスの運賃の比でリトルウッドの法則を使うのがEMSR-bです（②の計算の過程を参照）。','(¥{fy}×{my}+¥{fb}×{mb})÷({my}+{mb})=¥{pb}. 단순 평균(¥{av})이 아니라 수요가 많은 클래스 운임에 가깝게 잡습니다. 이 운임과 다음 클래스 운임의 비율로 리틀우드 법칙을 쓰는 것이 EMSR-b입니다(②의 계산 과정 참고).','(¥{fy} × {my} + ¥{fb} × {mb}) ÷ ({my} + {mb}) = ¥{pb}, weighted towards the class with more demand rather than the simple average (¥{av}). EMSR-b applies Littlewood’s rule to the ratio of this fare to the next class (see the working in tab ②).'),{fy:yen(fy),my:my,fb:yen(fb),mb:mb,pb:yen(Math.round(pb)),av:yen(Math.round((fy+fb)/2))})}},
 function(){var C=rnd(15,20)*10,p=rnd(88,96),B=C+rnd(5,15),e=B*p/100;var o=opts(Math.round(e),[B,Math.round(B*(100-p)/100),C]);
  return {q:f(L3('座席{c}、来る確率{p}%、予約{b}件を受けたとき、搭乗の見込みは約？','좌석 {c}, 출현율 {p}%, 예약 {b}건을 받았을 때 예상 탑승 인원은 약?','With {c} seats, a {p}% show-up rate and {b} bookings, expected boardings are about…'),{c:C,p:p,b:B}),o:o.o.map(function(x){return x+tx(L3('人','명',' passengers'))}),a:o.a,
   x:f(L3('搭乗の見込み＝予約数×来る確率＝{b}×{p}%＝{e}人。座席{c}に対して{d}人{s}。実際は1人ずつ来る・来ないがばらつくので、③のように二項分布でお断りの見込みまで計算します。','예상 탑승=예약 수×출현율={b}×{p}%={e}명. 좌석 {c}에 대해 {d}명 {s}. 실제로는 한 명씩 오고 안 오는 것이 흩어지므로 ③처럼 이항분포로 거절 예상까지 계산합니다.','Expected boardings = bookings × show-up rate = {b} × {p}% = {e}. Against {c} seats that is {d} {s}. Show-ups vary passenger by passenger, so tab ③ uses the binomial distribution to estimate denied boardings as well.'),{b:B,p:p,e:e.toFixed(1),c:C,d:Math.abs(Math.round(e)-C),s:Math.round(e)>C?tx(L3('多い','많음','over')):tx(L3('少ない','적음','under'))})}},
 function(){var b1=rnd(20,35)*1000,b2=rnd(25,40)*1000,fare=rnd(40,75)*1000,sum=b1+b2,acc=fare>=sum;var o=opts(tx(acc?L3('受ける','받는다','Accept'):L3('断る','거절한다','Reject')),[tx(acc?L3('断る','거절한다','Reject'):L3('受ける','받는다','Accept')),tx(L3('運賃を下げて受ける','운임을 낮춰 받는다','Accept at a lower fare')),tx(L3('片方の区間だけ受ける','한 구간만 받는다','Accept one leg only'))]);
  return {q:f(L3('区間1の入札価格¥{a}、区間2の入札価格¥{b}。2区間を通す¥{f}の予約が来たら？','구간 1 입찰 가격 ¥{a}, 구간 2 입찰 가격 ¥{b}. 두 구간을 잇는 ¥{f} 예약이 오면?','Bid prices are ¥{a} on leg 1 and ¥{b} on leg 2. A ¥{f} booking arrives for both legs. You…'),{a:yen(b1),b:yen(b2),f:yen(fare)}),o:o.o,a:o.a,
   x:f(L3('入札価格の合計＝¥{a}＋¥{b}＝¥{s}。運賃¥{f}は合計{c}ので{r}。旅程の運賃が通る区間の入札価格の合計以上なら受ける、が判断の基準です（7-5）。','입찰 가격 합=¥{a}+¥{b}=¥{s}. 운임 ¥{f}는 합계{c} {r}. 여정 운임이 지나는 구간의 입찰 가격 합 이상이면 받는 것이 판단 기준입니다(7-5).','Bid-price sum = ¥{a} + ¥{b} = ¥{s}. The ¥{f} fare is {c} the sum, so {r}. Accept when the itinerary fare is at least the sum of bid prices on the legs it uses (7-5).'),{a:yen(b1),b:yen(b2),s:yen(sum),f:yen(fare),c:acc?tx(L3('以上な','이상이므로','at or above')):tx(L3('を下回る','보다 낮으므로','below')),r:acc?tx(L3('受けます','받습니다','accept')):tx(L3('断ります','거절합니다','reject'))})}},
 function(){var y=rnd(20,40),lf=rnd(70,92),r=y*lf/100;var o=opts(r.toFixed(1),[y,(y*100/lf).toFixed(1),lf]);
  return {q:f(L3('イールド¥{y}、搭乗率{l}%のときのRASKは？','일드 ¥{y}, 탑승률 {l}%일 때 RASK는?','With yield ¥{y} and load factor {l}%, RASK is…'),{y:y,l:lf}),o:o.o.map(function(x){return '¥'+x}),a:o.a,
   x:f(L3('RASK＝イールド×搭乗率＝¥{y}×{l}%＝¥{r}。イールドは乗ったお客様1人キロあたり、RASKは用意した1席キロあたりの収入なので、空席の分だけ小さくなります。','RASK=일드×탑승률=¥{y}×{l}%=¥{r}. 일드는 탑승객 1인킬로당, RASK는 준비한 1좌석킬로당 수입이므로 빈 좌석만큼 작아집니다.','RASK = yield × load factor = ¥{y} × {l}% = ¥{r}. Yield is per passenger-km flown, RASK per seat-km offered, so empty seats make it smaller.'),{y:y,l:lf,r:r.toFixed(1)})}},
 function(){var c=rnd(18,28),y=rnd(c+3,c+14),be=100*c/y;var o=opts(be.toFixed(0)+'%',[(100*y/c).toFixed(0)+'%',(100-be).toFixed(0)+'%',c+'%']);
  return {q:f(L3('CASK¥{c}、イールド¥{y}のときの損益分岐の搭乗率は約？','CASK ¥{c}, 일드 ¥{y}일 때 손익분기 탑승률은 약?','With CASK ¥{c} and yield ¥{y}, the break-even load factor is about…'),{c:c,y:y}),o:o.o,a:o.a,
   x:f(L3('損益分岐の搭乗率＝CASK÷イールド＝{c}÷{y}＝{b}%。席の{b}%以上が埋まれば費用をまかなえます。逆に割る（イールド÷CASK）と100%を超える値になり、意味が通りません。','손익분기 탑승률=CASK÷일드={c}÷{y}={b}%. 좌석의 {b}% 이상이 차면 비용을 감당합니다. 거꾸로 나누면(일드÷CASK) 100%를 넘는 값이 나와 뜻이 통하지 않습니다.','Break-even load factor = CASK ÷ yield = {c} ÷ {y} = {b}%: fill at least {b}% of seats to cover costs. Dividing the other way (yield ÷ CASK) gives more than 100%, which makes no sense.'),{c:c,y:y,b:be.toFixed(1)})}},
 function(){var C=200,lim=rnd(120,160),bk=lim+rnd(-15,15);var closed=bk>=lim;var o=opts(tx(closed?L3('閉鎖（この客室の予約が上限に達した）','닫힘(이 객실 예약이 한도에 도달)','Closed (cabin bookings reached the limit)'):L3('販売中（上限まで残りがある）','판매 중(한도까지 남음)','Open (below the limit)')),[tx(closed?L3('販売中（上限まで残りがある）','판매 중(한도까지 남음)','Open (below the limit)'):L3('閉鎖（この客室の予約が上限に達した）','닫힘(이 객실 예약이 한도에 도달)','Closed (cabin bookings reached the limit)')),tx(L3('満席','만석','Sold out')),tx(L3('運賃が自動で上がる','운임이 자동으로 오름','The fare rises automatically'))]);
  return {q:f(L3('エコノミー{c}席。Qクラスの予約の上限が{l}、客室の予約の合計が{b}のとき、Qクラスは？','이코노미 {c}석. Q클래스 판매 한도가 {l}, 객실 예약 합계가 {b}일 때 Q클래스는?','Economy has {c} seats. Class Q’s booking limit is {l} and cabin bookings total {b}. Class Q is…'),{c:C,l:lim,b:bk}),o:o.o,a:o.a,
   x:f(L3('入れ子の上限では「客室の予約の合計」を上限と比べます。{b}{cmp}{l}なので{r}。閉鎖されても、Qより高いクラス（上限が大きい）は売り続けます。満席は予約が{c}に達したときです。','네스팅 한도에서는 ‘객실 예약 합계’를 한도와 비교합니다. {b}{cmp}{l}이므로 {r}. 닫혀도 Q보다 비싼 클래스(한도가 큼)는 계속 팝니다. 만석은 예약이 {c}에 이르렀을 때입니다.','Nested limits compare the cabin total with the limit: {b} {cmp} {l}, so {r}. Even when Q is closed, higher classes (with larger limits) stay open. Sold out means bookings reached {c}.'),{b:bk,l:lim,c:C,cmp:closed?'≥':'<',r:closed?tx(L3('閉鎖です','닫힘입니다','it is closed')):tx(L3('販売中です','판매 중입니다','it is open'))})}}];
var QS=null;
function makeQ(){return shuf(Q7).slice(0,6).map(function(fn){return fn()})}
function view7(){return '<p class="lead">'+tx(T7.lead)+'</p><div id="q7"></div>'}
function draw7(){var t=T7,el=$('q7');if(!QS)QS={q:makeQ(),i:0,ok:0,pk:null};
 if(QS.i>=QS.q.length){el.innerHTML='<div class="card"><h2>'+tx(t.res)+'</h2><div class="big">'+QS.ok+' / '+QS.q.length+'</div><button class="btn" id="q7a">'+tx(t.ag)+'</button></div>';$('q7a').onclick=function(){QS=null;draw7()};return}
 var q=QS.q[QS.i],h='<div class="card"><div class="note" style="margin:0 0 6px">'+tx(t.q)+' '+(QS.i+1)+' / '+QS.q.length+'</div><div style="font-weight:700;margin-bottom:10px">'+q.q+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+q.o.map(function(o,i){var c='';if(QS.pk!==null){if(i===q.a)c='background:#E1F5EE;border-color:var(--ok)';else if(i===QS.pk)c='background:#FCEBEB;border-color:var(--ng)'}return '<button class="btn" style="margin:0;text-align:left;padding:10px 12px;'+c+'" data-i="'+i+'"'+(QS.pk!==null?' disabled':'')+'>'+(i+1)+'. '+o+'</button>'}).join('')+'</div>';
 if(QS.pk!==null)h+='<div style="margin-top:12px"><b style="color:'+(QS.pk===q.a?'var(--ok)':'var(--ng)')+'">'+(QS.pk===q.a?tx(t.ok):tx(t.ng))+'</b> '+tx(t.an)+q.o[q.a]+'<div class="xpl"><b class="h">'+tx(t.xp)+'</b>'+q.x+'</div><button class="btn" id="q7n">'+tx(t.nx)+'</button></div>';
 el.innerHTML=h+'</div>';
 Array.prototype.forEach.call(el.querySelectorAll('button[data-i]'),function(b){b.onclick=function(){if(QS.pk!==null)return;QS.pk=+b.getAttribute('data-i');if(QS.pk===q.a)QS.ok++;draw7()}});
 if($('q7n'))$('q7n').onclick=function(){QS.i++;QS.pk=null;draw7()}}
function bind7(){draw7()}
window.RM_EXT.push({label:T7.lab,view:view7,bind:bind7});
})();
