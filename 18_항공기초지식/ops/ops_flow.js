/* 運航の総合練習 ⑤遅延と流れの管理（2026.09）
   CTOT（割り当てられた離陸時刻）の許容幅は −5分〜＋10分（多くのATFMで使われる代表値）。遅延コードはIATA AHM730の標準コード。
   時刻・人数などは練習用の値。実際の運用は空港（A-CDM）と各社の規程による。 */
(function(){
window.OPS_MODS=window.OPS_MODS||{};
function L3(ja,ko,en){return {ja:ja,ko:ko,en:en}}
function tx(o){return o[lang]||o.ja}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function hmS(m){m=((Math.round(m)%1440)+1440)%1440;return ('0'+Math.floor(m/60)).slice(-2)+':'+('0'+m%60).slice(-2)}
function toM(s){var m=String(s).match(/(\d{1,2}):?(\d{2})/);return m?+m[1]*60+ +m[2]:0}
var S={sub:'slot',ctot:'10:40',exot:18,pax:180,rate:12,buf:5,eobt:'10:00',ready:'10:35',cause:'81'};
var CODE={'81':L3('81：ATFM（航空路の混雑・容量）','81: ATFM(항로 혼잡·용량)','81: ATFM due to en-route demand/capacity'),'83':L3('83：ATFM（到着空港の制限）','83: ATFM(도착 공항 제한)','83: ATFM due to restriction at destination airport'),'84':L3('84：ATFM（到着空港の天気）','84: ATFM(도착 공항 기상)','84: ATFM due to weather at destination'),'89':L3('89：出発空港の制限（管制・滑走路など）','89: 출발 공항 제한(관제·활주로 등)','89: Restrictions at airport of departure')};
var TX={slot:L3('スロットから逆算','슬롯에서 역산','Work back from the slot'),delay:L3('遅れの判定','지연 판정','Delay check'),quiz:L3('問題を解く','문제 풀기','Quiz'),
 ctot:L3('CTOT（割り当てられた離陸時刻）','CTOT(지정 이륙 시각)','CTOT (calculated take-off time)'),exot:L3('地上走行の時間（分）','지상 이동 시간(분)','Taxi-out time (min)'),pax:L3('乗客数','승객 수','Passengers'),rate:L3('1分あたりの搭乗人数','분당 탑승 인원','Boarding rate (pax/min)'),buf:L3('ドアを閉めてから出発までの余裕（分）','문 닫고 출발까지 여유(분)','Door close to off-block (min)'),
 win:L3('離陸できる時間帯（CTOT −5〜+10分）','이륙 가능 시간대(CTOT −5~+10분)','Take-off window (CTOT −5 to +10 min)'),obw:L3('出発（オフブロック）できる時間帯','출발(오프블록) 가능 시간대','Off-block window'),tsat:L3('TSAT（エンジン始動の目標時刻）の目安','TSAT(엔진 시동 목표 시각) 기준','TSAT (target start-up approval time)'),
 door:L3('ドアを閉める時刻（遅くとも）','문 닫는 시각(늦어도)','Close doors by'),board:L3('搭乗開始（遅くとも）','탑승 시작(늦어도)','Start boarding by'),
 snote:L3('A-CDM（空港の協調的な意思決定）では、航空会社が出す準備完了の目標（TOBT）と、CTOT・地上走行の時間から、管制側が始動の目標（TSAT）を決めます。地上のチームは、そこから逆算して搭乗や搭載の時刻を決めます。','A-CDM(공항 협업 의사결정)에서는 항공사가 내는 준비 완료 목표(TOBT)와 CTOT·지상 이동 시간으로 관제 측이 시동 목표(TSAT)를 정합니다. 지상 팀은 그것에서 역산해 탑승·탑재 시각을 정합니다.','Under A-CDM, the airline’s target off-block time (TOBT), the CTOT and taxi time set the TSAT; ground teams work back from it to plan boarding and loading.'),
 eobt:L3('予定の出発時刻（EOBT）','예정 출발 시각(EOBT)','Scheduled off-block (EOBT)'),ready:L3('実際に準備ができた時刻','실제로 준비된 시각','Actually ready at'),cause:L3('スロットの原因','슬롯 원인','Reason for the slot'),
 ett:L3('離陸の見込み','이륙 예상','Expected take-off'),keep:L3('スロットを守れます。','슬롯을 지킬 수 있습니다.','The slot can be kept.'),lost:L3('スロットに間に合いません。新しいCTOTをもらう必要があります（さらに遅れることが多い）。','슬롯에 늦습니다. 새 CTOT를 받아야 합니다(더 늦어지는 경우가 많음).','The slot will be missed; a new CTOT is needed (usually later).'),
 early:L3('早すぎます。CTOT −5分より前には離陸できません。','너무 이릅니다. CTOT −5분보다 먼저는 이륙할 수 없습니다.','Too early: no take-off before CTOT −5 min.'),dl:L3('予定からの遅れ（出発）','예정 대비 지연(출발)','Departure delay vs EOBT'),code:L3('記録する遅延コードの例','기록할 지연 코드 예','Delay code to record'),
 link:L3('IATA遅延コード一覧を開く →','IATA 지연 코드 목록 열기 →','Open the IATA delay codes →'),
 q1:L3('CTOTが{c}、地上走行が{e}分。遅くともいつまでにオフブロックすれば、許容幅（+10分）に間に合う？','CTOT {c}, 지상 이동 {e}분. 늦어도 언제까지 오프블록하면 허용 폭(+10분)에 맞출 수 있나?','CTOT {c}, taxi {e} min. What is the latest off-block to stay within +10 min?'),
 q2:L3('CTOTが{c}の便が{t}に離陸した。スロットは？','CTOT {c} 편이 {t}에 이륙했다. 슬롯은?','A flight with CTOT {c} took off at {t}. The slot was:'),
 q3:L3('乗客{p}人を1分{r}人で搭乗させ、{d}にドアを閉めたい。搭乗開始は遅くとも？','승객 {p}명을 분당 {r}명으로 탑승시키고 {d}에 문을 닫으려면 탑승 시작은 늦어도?','{p} passengers at {r} per minute, doors closed at {d}. Start boarding by?'),
 q4:L3('到着空港の天気が原因のATFMの遅れで使う遅延コードは？','도착 공항 기상이 원인인 ATFM 지연에 쓰는 지연 코드는?','Which delay code is used for ATFM delay due to weather at the destination?'),
 q5:L3('A-CDMで、始動の目標（TSAT）を決めるのに使うものの組み合わせは？','A-CDM에서 시동 목표(TSAT)를 정하는 데 쓰는 조합은?','Under A-CDM, what is used to set the TSAT?')};
function m(k,v){var s=tx(TX[k]);for(var x in v)s=s.split('{'+x+'}').join(v[x]);return s}
function inp(id,v,w){return '<input id="'+id+'" value="'+v+'" style="width:'+(w||'100%')+'">'}
function render(){var sub='<div class="row tabs" id="flSub" style="margin-top:12px">'+[['slot',TX.slot],['delay',TX.delay],['quiz',TX.quiz]].map(function(q){return '<button class="pill'+(S.sub===q[0]?' on':'')+'" data-s="'+q[0]+'">'+tx(q[1])+'</button>'}).join('')+'</div>',h='';
 if(S.sub==='slot')h='<div class="card" style="margin-top:12px"><div class="kv" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px"><label>'+tx(TX.ctot)+'<br>'+inp('flC',S.ctot)+'</label><label>'+tx(TX.exot)+'<br>'+inp('flE',S.exot)+'</label><label>'+tx(TX.pax)+'<br>'+inp('flP',S.pax)+'</label><label>'+tx(TX.rate)+'<br>'+inp('flR',S.rate)+'</label><label>'+tx(TX.buf)+'<br>'+inp('flB',S.buf)+'</label></div><div id="flO"></div><p class="note">'+tx(TX.snote)+'</p></div>';
 else if(S.sub==='delay')h='<div class="card" style="margin-top:12px"><div class="kv" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px"><label>'+tx(TX.eobt)+'<br>'+inp('flEo',S.eobt)+'</label><label>'+tx(TX.ctot)+'<br>'+inp('flC2',S.ctot)+'</label><label>'+tx(TX.exot)+'<br>'+inp('flE2',S.exot)+'</label><label>'+tx(TX.ready)+'<br>'+inp('flRd',S.ready)+'</label><label>'+tx(TX.cause)+'<br><select id="flCa" style="width:100%">'+Object.keys(CODE).map(function(k){return '<option value="'+k+'"'+(S.cause===k?' selected':'')+'>'+tx(CODE[k])+'</option>'}).join('')+'</select></label></div><div id="flD"></div></div>';
 else h='<div id="flQ"></div>';
 $('panel').innerHTML=sub+h;
 Array.prototype.forEach.call(document.querySelectorAll('#flSub [data-s]'),function(b){b.onclick=function(){S.sub=b.getAttribute('data-s');render()}});
 if(S.sub==='slot'){var up=function(){S.ctot=$('flC').value;S.exot=+$('flE').value||0;S.pax=+$('flP').value||0;S.rate=+$('flR').value||1;S.buf=+$('flB').value||0;var c=toM(S.ctot),e=S.exot,obE=c-5-e,obL=c+10-e,door=obL-S.buf,board=door-S.pax/S.rate;
   $('flO').innerHTML='<table style="width:100%;margin-top:12px;font-size:15px;border-collapse:collapse"><tr><td style="padding:5px 0">'+tx(TX.win)+'</td><td style="text-align:right;font-weight:800">'+hmS(c-5)+' \u2013 '+hmS(c+10)+'</td></tr><tr><td style="padding:5px 0">'+tx(TX.obw)+'</td><td style="text-align:right;font-weight:800">'+hmS(obE)+' \u2013 '+hmS(obL)+'</td></tr><tr><td style="padding:5px 0">'+tx(TX.tsat)+'</td><td style="text-align:right;font-weight:800">'+hmS(c-e)+'</td></tr><tr><td style="padding:5px 0">'+tx(TX.door)+'</td><td style="text-align:right;font-weight:800">'+hmS(door)+'</td></tr><tr><td style="padding:5px 0">'+tx(TX.board)+'</td><td style="text-align:right;font-weight:800">'+hmS(board)+'</td></tr></table>'};
  ['flC','flE','flP','flR','flB'].forEach(function(i){$(i).oninput=up});up()}
 if(S.sub==='delay'){var up2=function(){S.eobt=$('flEo').value;S.ctot=$('flC2').value;S.exot=+$('flE2').value||0;S.ready=$('flRd').value;S.cause=$('flCa').value;var c=toM(S.ctot),rd=toM(S.ready),tt=Math.max(rd+S.exot,c-5),st=tt>c+10?'lost':(rd+S.exot<c-5?'early':'keep'),dl=Math.max(0,Math.max(rd,c-S.exot)-toM(S.eobt));
   $('flD').innerHTML='<div class="kv" style="margin-top:12px"><b>'+tx(TX.ett)+'</b><span>'+hmS(tt)+'</span><b>'+tx(TX.dl)+'</b><span>'+dl+' min</span></div><div style="margin-top:8px;font-weight:800;color:'+(st==='lost'?'var(--ng)':'var(--ok)')+'">'+tx(TX[st])+'</div><div style="margin-top:8px"><b>'+tx(TX.code)+'</b>：'+tx(CODE[S.cause])+'</div><p style="margin-top:8px"><a href="../\u9045\u5ef6\u30b3\u30fc\u30c9\u4e00\u89a7_IATA.html?lang='+lang+'">'+tx(TX.link)+'</a></p>'};
  ['flEo','flC2','flE2','flRd'].forEach(function(i){$(i).oninput=up2});$('flCa').onchange=up2;up2()}
 if(S.sub==='quiz')OPS_QUIZ($('flQ'),makeQuiz)}
function makeQuiz(){var out=[],o,c=rnd(8,20)*60+rnd(0,11)*5,e=rnd(10,25);
 o=OPS_OPTS(hmS(c+10-e),[hmS(c-e),hmS(c+10),hmS(c-5-e)]);out.push({q:m('q1',{c:hmS(c),e:e}),o:o.o,a:o.a,x:hmS(c)+' + 10 \u2212 '+e});
 var t=c+[rnd(-4,9),rnd(12,25)][rnd(0,1)],ok=t<=c+10&&t>=c-5;o=OPS_OPTS(tx(ok?L3('守れた（許容幅の中）','지켰다(허용 폭 안)','Kept (within the window)'):L3('守れなかった（新しいCTOTが必要）','못 지켰다(새 CTOT 필요)','Missed (new CTOT needed)')),[tx(ok?L3('守れなかった（新しいCTOTが必要）','못 지켰다(새 CTOT 필요)','Missed (new CTOT needed)'):L3('守れた（許容幅の中）','지켰다(허용 폭 안)','Kept (within the window)')),tx(L3('スロットは関係ない','슬롯과 관계없다','Slots do not apply'))]);out.push({q:m('q2',{c:hmS(c),t:hmS(t)}),o:o.o,a:o.a,x:'CTOT \u22125 / +10'});
 var p=rnd(12,24)*10,r=rnd(10,15),d=c-20,b=Math.round(d-p/r);o=OPS_OPTS(hmS(b),[hmS(d-p/10),hmS(d),hmS(b+10)]);out.push({q:m('q3',{p:p,r:r,d:hmS(d)}),o:o.o,a:o.a,x:hmS(d)+' \u2212 '+p+'\u00F7'+r});
 o=OPS_OPTS('84',['81','83','89']);out.push({q:tx(TX.q4),o:o.o,a:o.a,x:tx(CODE['84'])});
 o=OPS_OPTS(tx(L3('TOBT・CTOT・地上走行の時間','TOBT·CTOT·지상 이동 시간','TOBT, CTOT and taxi time')),[tx(L3('乗客数と手荷物の個数','승객 수와 수하물 개수','Passenger and bag counts')),tx(L3('機長の経験年数','기장 경력','The captain’s experience')),tx(L3('航空券の値段','항공권 가격','Ticket prices'))]);out.push({q:tx(TX.q5),o:o.o,a:o.a});
 return shuf(out)}
OPS_MODS.flow={label:L3('④ 遅延・流れ','④ 지연·흐름','④ Delays & flow'),render:render};
})();
