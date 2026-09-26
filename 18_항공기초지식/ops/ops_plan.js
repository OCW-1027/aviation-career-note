/* 運航の総合練習 ①飛行計画 ②燃料・重量（2026.09）
   航空路図の練習.html から読み込む。R・ri・lang・PT・hav・pad・$ などはページ側の共通の変数・関数。
   機材の数値は代表値（型式・仕様で異なる）。燃料の計算は教育用の簡略な方法。航法・運航には使えない。 */
(function(){
window.OPS_MODS=window.OPS_MODS||{};
function L3(ja,ko,en){return {ja:ja,ko:ko,en:en}}
function tx(o){return o[lang]||o.ja}
/* 共通：問題の画面（ほかのモジュールも使う） */
window.OPS_QUIZ=function(el,make){var st={q:make(),i:0,ok:0,pk:null},Q=L3('問','문제','Q'),OK=L3('正解！','정답!','Correct!'),NG=L3('残念…','아쉬워요…','Not quite.'),NX=L3('次の問題','다음 문제','Next question'),AG=L3('もう一度（新しい問題）','다시 하기(새 문제)','Try again (new questions)'),RS=L3('結果','결과','Result'),AN=L3('答え：','정답: ','Answer: ');
 function draw(){if(st.i>=st.q.length){el.innerHTML='<div class="card" style="margin-top:12px"><h3>'+tx(RS)+'</h3><div class="score">'+st.ok+' / '+st.q.length+'</div><div class="ctl"><button class="btn" id="oqa">'+tx(AG)+'</button></div></div>';$('oqa').onclick=function(){st={q:make(),i:0,ok:0,pk:null};draw()};return}
  var q=st.q[st.i],h='<div class="card" style="margin-top:12px"><div style="color:var(--sub);font-size:13px">'+tx(Q)+' '+(st.i+1)+' / '+st.q.length+'</div><div class="q">'+q.q+'</div><div class="opts">'+q.o.map(function(o,i){var c='';if(st.pk!==null){if(i===q.a)c=' ok';else if(i===st.pk)c=' ng'}return '<button class="opt'+c+'" data-i="'+i+'"'+(st.pk!==null?' disabled':'')+'>'+o+'</button>'}).join('')+'</div>';
  if(st.pk!==null)h+='<div class="exp"><b style="color:'+(st.pk===q.a?'var(--ok)':'var(--ng)')+'">'+(st.pk===q.a?tx(OK):tx(NG))+'</b> '+tx(AN)+q.o[q.a]+(q.x?'<br>'+q.x:'')+'</div><div class="ctl"><button class="btn" id="oqn">'+tx(NX)+'</button></div>';
  el.innerHTML=h+'</div>';
  Array.prototype.forEach.call(el.querySelectorAll('.opt'),function(b){b.onclick=function(){if(st.pk!==null)return;st.pk=+b.getAttribute('data-i');if(st.pk===q.a)st.ok++;draw()}});
  if($('oqn'))$('oqn').onclick=function(){st.i++;st.pk=null;draw()}}
 draw()};
window.OPS_OPTS=function(ans,wrong){var o=[ans].concat(wrong.filter(function(w,i){return w!==ans&&wrong.indexOf(w)===i})).slice(0,4);o=shuf(o);return {o:o,a:o.indexOf(ans)}};
/* 航空路・出発/到着のつなぎ・代替空港・機材 */
var AW={Y711:['MONSI','BULTI','MEKIL','GONAX','BEDES','ELPOS','MANGI','DALSU','NULDI','DOTOL','KIDOS'],Y722:['LOSNI','GUKSU','KAMIT','SAMUL','MAKSA','ATASO','PEBRI','GUNKU','OLMEN','SOT'],
 Y697:['EGOBA','LANAT'],Y51:['LANAT','SAMON'],Y517:['SAMON','LANAI'],Y301:['LANAI','SHELY'],Y30:['SHELY','MELON'],Y16:['CHINO','SAPRA'],G585:['SAPRA','CUN']};
var DEPX={RKSS:['MONSI'],RKPC:['LOSNI'],RKSI:['EGOBA'],RJAA:['CHINO']},ARRX={RKPC:['KIDOS'],RKSS:['SOT'],RJAA:['MELON'],RKSI:['CUN']};
var ALT={RKPC:'RKPK',RKSS:'RKSI',RJAA:'RJTT',RKSI:'RKSS'},XP={RKPK:[35.1795,128.9382],RJTT:[35.5523,139.7797]};
var EX={gc:'RKSS MONSI Y711 KIDOS RKPC',cg:'RKPC LOSNI Y722 SOT RKSS',in:'RKSI EGOBA Y697 LANAT Y51 SAMON Y517 LANAI Y301 SHELY Y30 MELON RJAA',ni:'RJAA CHINO Y16 SAPRA G585 CUN RKSI'};
var AC={A21N:{n:'A321neo',w:'M',tas:450,ff:2500,taxi:200,mtow:97000,mlw:79200,mzfw:75600,zfw:66000},B738:{n:'B737-800',w:'M',tas:450,ff:2400,taxi:200,mtow:79016,mlw:66361,mzfw:62732,zfw:58000},
 A333:{n:'A330-300',w:'H',tas:470,ff:5800,taxi:350,mtow:242000,mlw:187000,mzfw:175000,zfw:160000},B77W:{n:'B777-300ER',w:'H',tas:490,ff:7500,taxi:450,mtow:351534,mlw:251290,mzfw:237682,zfw:215000}};
window.OPS_DATA={AW:AW,DEPX:DEPX,ARRX:ARRX,EX:EX,AC:AC};
var S={rid:null,route:'',ac:'A21N',fl:'',wd:270,ws:60,eobt:'0100',cs:'ACN123',zfw:'',extra:0,sub:'calc'};
function P(k){return PT[k]||XP[k]}
function f0(n){return Math.round(n).toLocaleString('en-US')}
function hm(m){m=Math.round(m);return Math.floor(m/60)+':'+('0'+m%60).slice(-2)}
var TX={
 plan:L3('① 飛行計画','① 비행계획','① Flight plan'),fuel:L3('② 燃料と重量','② 연료와 중량','② Fuel and weight'),calc:L3('計算してみる','계산해 보기','Try it'),quiz:L3('問題を解く','문제 풀기','Quiz'),
 rlab:L3('経路（出発空港 地点 航空路 地点 … 到着空港）','경로(출발 공항 지점 항공로 지점 … 도착 공항)','Route (departure, point, airway, point … destination)'),
 next:L3('次に書けるもの：','다음에 올 수 있는 것:','Can come next:'),ex:L3('例を入れる','예시 넣기','Insert example'),clr:L3('消す','지우기','Clear'),back:L3('1つ戻す','하나 지우기','Undo one'),
 ok:L3('経路は正しくつながっています。','경로가 올바르게 이어져 있습니다.','The route connects correctly.'),inc:L3('続きを入れてください。','이어서 입력하세요.','Keep going.'),
 e_dep:L3('最初は出発空港（{x}）です。','처음은 출발 공항({x})입니다.','Start with the departure airport ({x}).'),e_sid:L3('出発方式でつながる最初の地点ではありません。','출발 절차로 이어지는 첫 지점이 아닙니다.','Not the first point reached by the departure procedure.'),
 e_awy:L3('「{t}」はここで使える航空路ではありません。','‘{t}’는 여기서 쓸 수 있는 항공로가 아닙니다.','“{t}” is not an airway you can use here.'),e_noton:L3('今の地点（{c}）は「{t}」の上にありません。','현재 지점({c})은 ‘{t}’ 위에 없습니다.','The current point ({c}) is not on {t}.'),
 e_notonq:L3('「{t}」は、その航空路の先にある地点ではありません。','‘{t}’는 그 항공로 앞쪽에 있는 지점이 아닙니다.','“{t}” is not a point further along that airway.'),e_dir:L3('一方通行の逆向きです（{t}）。','일방통행의 역방향입니다({t}).','Wrong way on a one-way airway ({t}).'),
 e_star:L3('ここからは到着方式につながりません。','여기서는 도착 절차로 이어지지 않습니다.','This point does not link to the arrival procedure.'),e_after:L3('到着空港のあとには何も書きません。','도착 공항 뒤에는 아무것도 쓰지 않습니다.','Nothing comes after the destination.'),
 cols:[L3('区間','구간','Segment'),L3('道','길','Via'),L3('距離','거리','Dist'),L3('磁方位','자방위','MC'),L3('対地速度','대지속도','GS'),L3('時間','시간','Time')],
 ac:L3('機材','기종','Aircraft'),fl:L3('巡航高度（FL）','순항 고도(FL)','Cruise level (FL)'),wd:L3('上空の風：風向','상공 바람: 풍향','Upper wind: from'),ws:L3('風速（kt）','풍속(kt)','Speed (kt)'),cs:L3('便名（呼出符号）','편명(호출부호)','Call sign'),eobt:L3('出発予定（UTC）','출발 예정(UTC)','EOBT (UTC)'),
 tot:L3('合計距離','합계 거리','Total distance'),eet:L3('飛行時間（EET、出発・到着の分を含む）','비행 시간(EET, 출발·도착분 포함)','Flight time (EET, incl. departure and arrival)'),
 lvok:L3('向きに合った高度です（{m}°の便は{p}）。','방향에 맞는 고도입니다({m}° 편은 {p}).','Level suits the direction ({m}° → {p}).'),lvng:L3('向きに合いません：主な磁方位{m}°の便は{p}の高度が基本です。','방향에 맞지 않습니다: 주된 자방위 {m}° 편은 {p} 고도가 기본입니다.','Wrong for the direction: a {m}° flight normally uses {p} levels.'),odd:L3('奇数','홀수','odd'),even:L3('偶数','짝수','even'),
 fpl:L3('ICAOの飛行計画（FPL、簡略）','ICAO 비행계획(FPL, 간략)','ICAO flight plan (FPL, simplified)'),
 fu:[L3('運航燃料（出発〜到着）','운항 연료(출발~도착)','Trip fuel'),L3('補正燃料（運航燃料の5%）','비상 연료(운항 연료의 5%)','Contingency (5% of trip)'),L3('代替空港まで（{a}）','교체 공항까지({a})','Alternate ({a})'),L3('最終予備（30分の待機）','최종 예비(30분 대기)','Final reserve (30 min holding)'),L3('追加燃料','추가 연료','Extra fuel'),L3('地上走行','지상 이동','Taxi'),L3('搭載燃料の合計','탑재 연료 합계','Block fuel')],
 zfw:L3('無燃料重量（ZFW、kg）','무연료 중량(ZFW, kg)','Zero fuel weight (ZFW, kg)'),extra:L3('追加燃料（kg）','추가 연료(kg)','Extra fuel (kg)'),
 wt:[L3('無燃料重量（ZFW）','무연료 중량(ZFW)','ZFW'),L3('離陸重量（TOW）','이륙 중량(TOW)','Take-off weight (TOW)'),L3('着陸重量（LW）','착륙 중량(LW)','Landing weight (LW)')],lim:L3('上限','상한','Limit'),over:L3('超過','초과','OVER'),okw:L3('範囲内','범위 안','Within'),
 load:L3('この重量を「搭載計算の練習」で確かめる →','이 중량을 「탑재 계산 연습」에서 확인하기 →','Check these weights in “Load Control Practice” →'),
 note:L3('機材の数値（速度・燃料消費・最大重量）は代表値で、型式や仕様で変わります。運航燃料は「巡航の燃料消費×時間×1.08（上昇の増加分）」、代替空港は距離÷速度＋15分で計算した教育用の簡略な方法です。実際の燃料計画は会社の規程と運航管理のシステムで作ります。','기종 수치(속도·연료 소모·최대 중량)는 대표값이며 형식·사양에 따라 다릅니다. 운항 연료는 ‘순항 연료 소모×시간×1.08(상승 증가분)’, 교체 공항은 거리÷속도+15분으로 계산한 교육용 간이 방법입니다. 실제 연료 계획은 회사 규정과 운항관리 시스템으로 만듭니다.','Aircraft figures (speed, fuel flow, maximum weights) are typical and vary by model and specification. Trip fuel = cruise fuel flow × time × 1.08 (climb allowance); alternate = distance ÷ speed + 15 min. This is a simplified teaching method; real fuel plans follow company rules and dispatch systems.'),
 q1:L3('次の経路で、まちがっている所は？<br><code>{r}</code>','다음 경로에서 잘못된 곳은?<br><code>{r}</code>','Which part of this route is wrong?<br><code>{r}</code>'),
 q2:L3('{d}海里の区間を対地速度{g}ktで飛ぶと、約何分？','{d}해리 구간을 대지속도 {g}kt로 날면 약 몇 분?','A {d} NM segment at {g} kt groundspeed takes about how many minutes?'),
 q3:L3('運航燃料が{t}kgのとき、補正燃料（5%）は？','운항 연료가 {t}kg일 때 비상 연료(5%)는?','Trip fuel is {t} kg. What is the 5% contingency?'),
 q4:L3('ZFW {z}kg、搭載燃料 {b}kg（うち地上走行 {x}kg）。離陸重量は？','ZFW {z}kg, 탑재 연료 {b}kg(그중 지상 이동 {x}kg). 이륙 중량은?','ZFW {z} kg, block fuel {b} kg (taxi {x} kg). What is the take-off weight?'),
 q4x:L3('離陸重量＝ZFW＋搭載燃料−地上走行で使う燃料。','이륙 중량=ZFW+탑재 연료−지상 이동에 쓰는 연료.','TOW = ZFW + block fuel − taxi fuel.'),
 q5:L3('真対気速度{t}kt、向かい風{w}ktのとき、対地速度は約？','진대기속도 {t}kt, 맞바람 {w}kt일 때 대지속도는 약?','TAS {t} kt with a {w} kt headwind: groundspeed is about?'),
 q1x:L3('一方通行の向き・航空路の上の地点・出発/到着方式のつながりを確かめます。','일방통행 방향·항공로 위의 지점·출발/도착 절차 연결을 확인합니다.','Check one-way direction, points on the airway and departure/arrival links.')};
function msg(k,v){var s=tx(TX[k]);for(var x in v)s=s.split('{'+x+'}').join(v[x]);return s}
function nextAw(c){return Object.keys(AW).filter(function(k){var l=AW[k],x=l.indexOf(c);return x>=0&&x<l.length-1})}
function parse(str,dep,arr){var t=str.trim().toUpperCase().split(/\s+/).filter(Boolean),legs=[],cur,i;
 if(!t.length)return {next:[dep],legs:legs};
 if(t[0]!==dep)return {err:[0,msg('e_dep',{x:dep})],next:[dep],legs:legs};
 if(t.length===1)return {next:DEPX[dep],legs:legs};
 if(DEPX[dep].indexOf(t[1])<0)return {err:[1,msg('e_sid')],next:DEPX[dep],legs:legs};
 legs.push({a:dep,b:t[1],via:'SID'});cur=t[1];i=2;
 while(i<t.length){var tk=t[i];
  if(tk===arr){if(ARRX[arr].indexOf(cur)<0)return {err:[i,msg('e_star')],legs:legs,next:nextAw(cur)};legs.push({a:cur,b:arr,via:'STAR'});if(i!==t.length-1)return {err:[i+1,msg('e_after')],legs:legs};return {ok:true,legs:legs}}
  var line=AW[tk];if(!line)return {err:[i,msg('e_awy',{t:tk})],legs:legs,next:nextAw(cur).concat(ARRX[arr].indexOf(cur)>=0?[arr]:[])};
  var ia=line.indexOf(cur);if(ia<0)return {err:[i,msg('e_noton',{c:cur,t:tk})],legs:legs,next:nextAw(cur)};
  if(ia===line.length-1)return {err:[i,msg('e_dir',{t:tk})],legs:legs,next:nextAw(cur)};
  if(i+1>=t.length)return {legs:legs,next:line.slice(ia+1)};
  var q=t[i+1],ib=line.indexOf(q);if(ib<0)return {err:[i+1,msg('e_notonq',{t:q})],legs:legs,next:line.slice(ia+1)};
  if(ib<=ia)return {err:[i+1,msg('e_dir',{t:tk})],legs:legs,next:line.slice(ia+1)};
  for(var j=ia;j<ib;j++)legs.push({a:line[j],b:line[j+1],via:tk});cur=q;i+=2}
 var nx=nextAw(cur);if(ARRX[arr].indexOf(cur)>=0)nx.push(arr);return {legs:legs,next:nx}}
function calc(legs){var a=AC[S.ac],tot=0,time=0,rows=[];legs.forEach(function(l){var h=hav(P(l.a),P(l.b)),d=h[0],tc=h[1],hw=S.ws*Math.cos((S.wd-tc)*Math.PI/180),gs=Math.max(150,a.tas-hw);if(l.via==='SID'||l.via==='STAR')gs=Math.min(gs,260);var m=d/gs*60;tot+=d;time+=m;rows.push({l:l,d:d,mc:(tc+8+360)%360,gs:gs,m:m})});return {rows:rows,tot:tot,time:time+6}}
window.OPS_CALC={parse:parse,calc:calc,S:S,P:P};
function fuel(c,dest){var a=AC[S.ac],trip=c.time/60*a.ff*1.08,cont=Math.max(trip*0.05,a.ff*5/60),alt=ALT[dest],ad=hav(P(dest),P(alt))[0],af=(ad/a.tas+0.25)*a.ff,fr=0.5*a.ff*0.8,ex=+S.extra||0,tx0=a.taxi,blk=trip+cont+af+fr+ex+tx0,zfw=+S.zfw||a.zfw,tow=zfw+blk-tx0,lw=tow-trip;
 return {trip:trip,cont:cont,alt:alt,af:af,fr:fr,ex:ex,taxi:tx0,blk:blk,zfw:zfw,tow:tow,lw:lw}}
function render(){var r=R[ri],dep=r.s[0][0],arr=r.s[r.s.length-1][0];if(S.rid!==r.id){S.rid=r.id;S.route=EX[r.id];S.fl=r.fl.slice(2);S.zfw=''}
 var sub='<div class="row tabs" id="opsSub" style="margin-top:12px">'+[['calc',TX.calc],['quiz',TX.quiz]].map(function(m){return '<button class="pill'+(S.sub===m[0]?' on':'')+'" data-s="'+m[0]+'">'+tx(m[1])+'</button>'}).join('')+'</div>';
 if(S.sub==='quiz'){$('panel').innerHTML=sub+'<div id="opsQ"></div>';bindSub();OPS_QUIZ($('opsQ'),makeQuiz);return}
 var sel='<select id="oAc">'+Object.keys(AC).map(function(k){return '<option value="'+k+'"'+(S.ac===k?' selected':'')+'>'+AC[k].n+'</option>'}).join('')+'</select>';
 var h=sub+'<div class="card" style="margin-top:12px"><h3>'+tx(TX.plan)+'</h3><label style="font-size:13px;color:var(--sub)">'+tx(TX.rlab)+'</label>'+
  '<input id="oRt" value="'+S.route+'" style="width:100%;font:600 16px Consolas,Menlo,monospace;padding:10px;border:1.5px solid var(--line);border-radius:10px;margin:6px 0" autocomplete="off" spellcheck="false">'+
  '<div id="oNext" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:13px"></div>'+
  '<div class="ctl" style="margin-top:8px"><button class="btn sec" id="oEx">'+tx(TX.ex)+'</button><button class="btn sec" id="oBk">'+tx(TX.back)+'</button><button class="btn sec" id="oCl">'+tx(TX.clr)+'</button></div>'+
  '<div class="kv" style="margin-top:12px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px">'+
  '<label>'+tx(TX.ac)+'<br>'+sel+'</label><label>'+tx(TX.fl)+'<br><input id="oFl" type="number" step="10" value="'+S.fl+'" style="width:100%"></label>'+
  '<label>'+tx(TX.wd)+'<br><input id="oWd" type="number" step="10" value="'+S.wd+'" style="width:100%"></label><label>'+tx(TX.ws)+'<br><input id="oWs" type="number" step="5" value="'+S.ws+'" style="width:100%"></label>'+
  '<label>'+tx(TX.cs)+'<br><input id="oCs" value="'+S.cs+'" style="width:100%"></label><label>'+tx(TX.eobt)+'<br><input id="oEo" value="'+S.eobt+'" maxlength="4" style="width:100%"></label></div>'+
  '<div id="oOut"></div></div>'+
  '<div class="card" style="margin-top:12px"><h3>'+tx(TX.fuel)+'</h3><div class="kv" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px"><label>'+tx(TX.zfw)+'<br><input id="oZf" type="number" step="100" value="'+(S.zfw||AC[S.ac].zfw)+'" style="width:100%"></label><label>'+tx(TX.extra)+'<br><input id="oXt" type="number" step="100" value="'+S.extra+'" style="width:100%"></label></div><div id="oFu"></div></div>'+
  '<p class="note">'+tx(TX.note)+'</p>';
 $('panel').innerHTML=h;bindSub();
 function upd(){var p=parse(S.route,dep,arr);$('oRt').style.borderColor=p.err?'var(--ng)':(p.ok?'var(--ok)':'var(--line)');
  $('oNext').innerHTML=(p.next&&p.next.length?'<span style="color:var(--sub)">'+tx(TX.next)+'</span>'+p.next.map(function(n){return '<button class="pill" data-t="'+n+'" style="min-height:32px;padding:4px 10px">'+n+'</button>'}).join(''):'');
  Array.prototype.forEach.call($('oNext').querySelectorAll('[data-t]'),function(b){b.onclick=function(){S.route=(S.route.trim()+' '+b.getAttribute('data-t')).trim();$('oRt').value=S.route;upd()}});
  var c=calc(p.legs),o='<div style="margin:10px 0;font-weight:700;color:'+(p.err?'var(--ng)':p.ok?'var(--ok)':'var(--sub)')+'">'+(p.err?'\u2716 '+p.err[1]:p.ok?'\u2714 '+tx(TX.ok):tx(TX.inc))+'</div>';
  if(c.rows.length){o+='<div class="scroll tbl" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px"><thead><tr>'+TX.cols.map(function(x){return '<th style="text-align:left;padding:6px;border-bottom:1.5px solid var(--line)">'+tx(x)+'</th>'}).join('')+'</tr></thead><tbody>'+
   c.rows.map(function(x){return '<tr><td style="padding:6px">'+x.l.a+' \u2192 '+x.l.b+'</td><td>'+x.l.via+'</td><td>'+x.d.toFixed(1)+'</td><td>'+pad(Math.round(x.mc))+'\u00B0</td><td>'+Math.round(x.gs)+'</td><td>'+x.m.toFixed(1)+'</td></tr>'}).join('')+'</tbody></table></div>';
   var main=c.rows.reduce(function(a,b){return b.d>a.d?b:a}),odd=main.mc<180,fl=+S.fl||0,lvlOk=fl?((fl/10)%2===1)===odd:true;
   o+='<div class="kv" style="margin-top:10px"><b>'+tx(TX.tot)+'</b><span>'+c.tot.toFixed(0)+' NM</span><b>'+tx(TX.eet)+'</b><span>'+hm(c.time)+'</span></div>';
   if(fl)o+='<div style="margin-top:6px;font-weight:700;color:'+(lvlOk?'var(--ok)':'var(--ng)')+'">'+msg(lvlOk?'lvok':'lvng',{m:pad(Math.round(main.mc)),p:tx(odd?TX.odd:TX.even)})+'</div>';
   if(p.ok){var a=AC[S.ac],mid=S.route.trim().toUpperCase().split(/\s+/).slice(1,-1).join(' '),e=Math.round(c.time);
    o+='<h3 style="margin-top:14px">'+tx(TX.fpl)+'</h3><pre style="white-space:pre-wrap;background:#fff;border:1.5px solid var(--line);border-radius:10px;padding:10px;font-size:13.5px">(FPL-'+(S.cs||'ACN123').toUpperCase()+'-IS\n-'+S.ac+'/'+a.w+'-SDFGRY/LB1\n-'+dep+(S.eobt||'0100')+'\n-N'+('000'+a.tas).slice(-4)+'F'+('00'+(+S.fl||0)).slice(-3)+' '+mid+'\n-'+arr+('0'+Math.floor(e/60)).slice(-2)+('0'+e%60).slice(-2)+' '+ALT[arr]+')</pre>'}}
  $('oOut').innerHTML=o;
  var f=fuel(c,arr),A=AC[S.ac],fu=[f.trip,f.cont,f.af,f.fr,f.ex,f.taxi,f.blk];
  var fo='<table style="width:100%;border-collapse:collapse;font-size:14.5px;margin-top:10px">'+TX.fu.map(function(x,i){return '<tr'+(i===6?' style="font-weight:800;border-top:1.5px solid var(--ink)"':'')+'><td style="padding:5px 0">'+tx(x).replace('{a}',f.alt)+'</td><td style="text-align:right">'+f0(fu[i])+' kg</td></tr>'}).join('')+'</table>';
  var W=[[f.zfw,A.mzfw],[f.tow,A.mtow],[f.lw,A.mlw]];
  fo+='<table style="width:100%;border-collapse:collapse;font-size:14.5px;margin-top:12px"><tr><th></th><th style="text-align:right">kg</th><th style="text-align:right">'+tx(TX.lim)+'</th><th></th></tr>'+W.map(function(w,i){var ok=w[0]<=w[1];return '<tr><td style="padding:5px 0">'+tx(TX.wt[i])+'</td><td style="text-align:right">'+f0(w[0])+'</td><td style="text-align:right">'+f0(w[1])+'</td><td style="text-align:right;font-weight:800;color:'+(ok?'var(--ok)':'var(--ng)')+'">'+(ok?tx(TX.okw):tx(TX.over))+'</td></tr>'}).join('')+'</table>';
  fo+='<p style="margin-top:10px"><a href="../1_\uc9c0\uc0c1\uc9c1\uc5ec\uac1d\uc6b4\uc1a1\uc785\ubb38/\u642d\u8f09\u8a08\u7b97\u306e\u7df4\u7fd2.html?lang='+lang+'">'+tx(TX.load)+'</a></p>';
  if(!c.rows.length)fo='';$('oFu').innerHTML=fo}
 $('oRt').oninput=function(){S.route=this.value.toUpperCase();upd()};
 $('oEx').onclick=function(){S.route=EX[r.id];$('oRt').value=S.route;upd()};$('oCl').onclick=function(){S.route='';$('oRt').value='';upd()};
 $('oBk').onclick=function(){var t=S.route.trim().split(/\s+/);t.pop();S.route=t.join(' ');$('oRt').value=S.route;upd()};
 $('oAc').onchange=function(){S.ac=this.value;S.zfw='';$('oZf').value=AC[S.ac].zfw;upd()};
 [['oFl','fl'],['oWd','wd'],['oWs','ws'],['oCs','cs'],['oEo','eobt'],['oZf','zfw'],['oXt','extra']].forEach(function(z){$(z[0]).oninput=function(){S[z[1]]=this.value;upd()}});
 upd()}
function bindSub(){Array.prototype.forEach.call(document.querySelectorAll('#opsSub [data-s]'),function(b){b.onclick=function(){S.sub=b.getAttribute('data-s');render()}})}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function makeQuiz(){var r=R[ri],out=[],ex=EX[r.id].split(' '),q;
 /* 経路のまちがい探し */
 var t=ex.slice(),bad;if(t.length>5&&Math.random()<.5){var k=2;t[k]=r.id==='gc'?'Y722':r.id==='cg'?'Y711':(t[k]==='Y697'?'Y16':'Y517');bad=t[k]}else{var last=t.length-2;t[last]=r.id==='gc'?'SAMUL':r.id==='cg'?'DOTOL':r.id==='in'?'CHINO':'LANAT';bad=t[last]}
 var o=OPS_OPTS(bad,shuf(t.filter(function(x){return x!==bad}))),q1={q:msg('q1',{r:t.join(' ')}),o:o.o,a:o.a,x:tx(TX.q1x)};out.push(q1);
 var d=rnd(8,30)*5,g=rnd(38,52)*10,m=Math.round(d/g*60);o=OPS_OPTS(m+'',[Math.round(d/g*100)+'',Math.round(g/d)+'',(m+15)+'',Math.max(1,m-12)+'']);out.push({q:msg('q2',{d:d,g:g}),o:o.o.map(function(x){return x+(lang==='en'?' min':lang==='ko'?'분':'分')}),a:o.a,x:d+' \u00F7 '+g+' \u00D7 60 = '+m});
 var tr=rnd(30,90)*100;o=OPS_OPTS(f0(tr*0.05),[f0(tr*0.5),f0(tr*0.1),f0(tr*0.005)]);out.push({q:msg('q3',{t:f0(tr)}),o:o.o.map(function(x){return x+' kg'}),a:o.a,x:f0(tr)+' \u00D7 0.05'});
 var z=rnd(55,68)*1000,bl=rnd(60,120)*100,xt=200;o=OPS_OPTS(f0(z+bl-xt),[f0(z+bl),f0(z+bl+xt),f0(z-bl)]);out.push({q:msg('q4',{z:f0(z),b:f0(bl),x:xt}),o:o.o.map(function(x){return x+' kg'}),a:o.a,x:tx(TX.q4x)});
 var ta=rnd(44,49)*10,w=rnd(4,14)*10;o=OPS_OPTS((ta-w)+' kt',[(ta+w)+' kt',ta+' kt',(ta-2*w)+' kt']);out.push({q:msg('q5',{t:ta,w:w}),o:o.o,a:o.a,x:ta+' \u2212 '+w});
 return shuf(out)}
OPS_MODS.plan={label:L3('① 飛行計画・燃料','① 비행계획·연료','① Flight plan & fuel'),render:render};
})();
