/* 航空交通と通信（Part 13）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
var planeS=H.planeS;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function BADGE(x,y,n,sz){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
/* i番目の区間だけ強調する animate の values と keyTimes（最後の区間は1を超えないようにする） */
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
var F={
/* 1 ゲートからゲートまで：飛行の段階ごとに担当の管制が変わる */
atc_flow:function(l){
 var W=({ja:{t:'ゲートからゲートまでの管制の引き継ぎ',u:['管制承認（デリバリー）：飛行の許可','地上管制（グランド）：地上走行','飛行場管制（タワー）：離陸','出域管制（ディパーチャー）：上昇','航空路管制（ACC・コントロール）：巡航','進入管制（アプローチ）：降下・進入','飛行場管制（タワー）：着陸','地上管制（グランド）：スポットへ']},
  ko:{t:'게이트에서 게이트까지의 관제 인계',u:['허가중계(딜리버리): 비행 허가','지상관제(그라운드): 지상 이동','비행장관제(타워): 이륙','출발관제(디파처): 상승','항로관제(ACC·컨트롤): 순항','접근관제(어프로치): 강하·접근','비행장관제(타워): 착륙','지상관제(그라운드): 주기장으로']},
  en:{t:'Gate to gate: handing the flight from controller to controller',u:['Clearance delivery: the ATC clearance','Ground control: taxi','Aerodrome control (tower): take-off','Departure control: climb','Area control (ACC, “Control”): cruise','Approach control: descent and approach','Aerodrome control (tower): landing','Ground control: taxi to the stand']}})[l];
 if(!W)return F.atc_flow('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,190,'#DCEEFB',14)+R(20,222,600,24,'#9CC98B',0);
 var P='M40 226 L90 226 L130 226 C170 226 180 200 220 160 C260 110 280 90 320 90 L420 90 C460 90 480 130 520 180 C540 210 560 226 580 226 L600 226';
 s+='<path d="'+P+'" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="8 6"/>';
 s+='<g>'+planeS('#fff')+'<animateMotion dur="16s" repeatCount="indefinite" rotate="auto" path="'+P+'"/></g>';
 var pos=[[40,208],[90,208],[140,208],[210,140],[370,72],[500,140],[560,208],[600,190]];
 pos.forEach(function(p,i){s+='<g>'+BADGE(p[0],p[1],i+1,11)+'<animate attributeName="opacity" '+SEG(i,8,'.35','1')+' dur="16s" repeatCount="indefinite"/></g>'});
 var L=LIST(W.u,258,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 2 空域のクラス A〜G：IFR・VFRが飛べるか、管制がどこまで間隔を付けるか */
atc_classes:function(l){
 var W=({ja:{t:'空域のクラス（ICAO）',h:['クラス','飛べる','管制の間隔'],rows:[['A','IFRだけ','すべての機の間'],['B','IFR・VFR','すべての機の間'],['C','IFR・VFR','IFRとIFR、IFRとVFR'],['D','IFR・VFR','IFRとIFRだけ（ほかは交通情報）'],['E','IFR・VFR','IFRとIFRだけ（VFRは管制外）'],['F','IFR・VFR','助言（できる範囲で）'],['G','IFR・VFR','なし（飛行情報だけ）']],note:'A〜Eが管制空域、F・Gが非管制空域。国によって使うクラスが違う（各国AIP ENR 1.4）'},
  ko:{t:'공역 등급(ICAO)',h:['등급','비행 가능','관제의 분리'],rows:[['A','IFR만','모든 항공기 사이'],['B','IFR·VFR','모든 항공기 사이'],['C','IFR·VFR','IFR과 IFR, IFR과 VFR'],['D','IFR·VFR','IFR과 IFR만(나머지는 교통정보)'],['E','IFR·VFR','IFR과 IFR만(VFR은 관제 밖)'],['F','IFR·VFR','조언(가능한 범위)'],['G','IFR·VFR','없음(비행정보만)']],note:'A~E가 관제공역, F·G가 비관제공역. 나라마다 쓰는 등급이 다르다(각국 AIP ENR 1.4)'},
  en:{t:'Airspace classes (ICAO)',h:['Class','Allowed','ATC separation'],rows:[['A','IFR only','Between all flights'],['B','IFR, VFR','Between all flights'],['C','IFR, VFR','IFR from IFR and from VFR'],['D','IFR, VFR','IFR from IFR only (traffic information for others)'],['E','IFR, VFR','IFR from IFR only (VFR not controlled)'],['F','IFR, VFR','Advisory (as far as practicable)'],['G','IFR, VFR','None (flight information only)']],note:'Classes A–E are controlled and F–G uncontrolled; each country uses its own selection (see AIP ENR 1.4)'}})[l];
 if(!W)return F.atc_classes('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=58,lh=FS(11.5)*1.3,cols=['#1d4d8a','#2F6FD6','#3F8FD0','#5FA8D9','#8FC3E6','#C9A76B','#9C8A62'];
 s+=R(20,y,600,FS(12)*1.6+8,'#243447',8)+tx(70,y+FS(12)*1.25,W.h[0],12,'#fff',900)+tx(210,y+FS(12)*1.25,W.h[1],12,'#fff',900)+tx(450,y+FS(12)*1.25,W.h[2],12,'#fff',900);y+=FS(12)*1.6+14;
 W.rows.forEach(function(r,i){var n=LI(r[2],11,300).length,h=Math.max(n*lh,FS(16)*1.2)+14;
  s+='<g>'+R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+R(34,y+6,72,h-12,cols[i],8)+tx(70,y+h/2+FS(16)*0.35,r[0],16,'#fff',900)+tx(210,y+h/2+FS(11.5)*0.35,r[1],11.5,D,800)+WR(450,y+h/2+FS(11)*0.3,r[2],11,D,800,300)+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="8" fill="none" stroke="#E08A2F" stroke-width="3" opacity="0"><animate attributeName="opacity" '+SEG(i,7,'0','1')+' dur="14s" repeatCount="indefinite"/></rect></g>';y+=h+4});
 var n=LI(W.note,10.5,580).length;s+=WR(320,y+8+n*FS(10.5)*1.3/2,W.note,10.5,G,800,580);y+=n*FS(10.5)*1.3+18;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 3 空域の形：管制圏（地面から）、進入管制区（逆さのウェディングケーキ）、航空路、非管制空域、FIRの境 */
atc_struct:function(l){
 var W=({ja:{t:'空域のかたち（横から見た図）',items:['管制圏（CTR）：空港のまわり、地面から','進入管制区（TMA）：上ほど広い、逆さのケーキの形','航空路：空港と空港を結ぶ管制された道','非管制空域：管制区の下や外','飛行情報区（FIR）の境：仁川FIR と 福岡FIR（日本は1つのFIR）'],inc:'仁川FIR',fuk:'福岡FIR'},
  ko:{t:'공역의 모양(옆에서 본 그림)',items:['관제권(CTR): 공항 주변, 지면부터','접근관제구역(TMA): 위로 갈수록 넓은 거꾸로 된 케이크 모양','항공로: 공항과 공항을 잇는 관제되는 길','비관제공역: 관제구역 아래나 바깥','비행정보구역(FIR) 경계: 인천 FIR과 후쿠오카 FIR(일본은 FIR 하나)'],inc:'인천 FIR',fuk:'후쿠오카 FIR'},
  en:{t:'The shape of airspace (side view)',items:['Control zone (CTR): around the airport, from the surface','Terminal control area (TMA): wider higher up, like an upside-down wedding cake','Airways: controlled routes between airports','Uncontrolled airspace: below or outside controlled areas','Flight information region (FIR) boundary: Incheon FIR and Fukuoka FIR (Japan has a single FIR)'],inc:'Incheon FIR',fuk:'Fukuoka FIR'}})[l];
 if(!W)return F.atc_struct('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,230,'#EEF5FB',14)+R(20,262,600,24,'#9CC98B',0);
 function cake(cx){return '<path d="M'+(cx-20)+' 262 L'+(cx-20)+' 220 L'+(cx-60)+' 220 L'+(cx-60)+' 180 L'+(cx-100)+' 180 L'+(cx-100)+' 140 L'+(cx+100)+' 140 L'+(cx+100)+' 180 L'+(cx+60)+' 180 L'+(cx+60)+' 220 L'+(cx+20)+' 220 L'+(cx+20)+' 262 Z" fill="#2F6FD6" opacity=".18" stroke="#2F6FD6" stroke-width="2"/><rect x="'+(cx-20)+'" y="220" width="40" height="42" fill="#1F7A6E" opacity=".35"/>'}
 s+=cake(130)+cake(510)+R(230,100,180,24,'#E08A2F',0,' opacity=".3"')+'<line x1="320" y1="70" x2="320" y2="262" stroke="#6B4FA0" stroke-width="3" stroke-dasharray="8 6"/>';
 s+=tx(250,80,W.inc,11,'#6B4FA0',900,'end')+tx(390,80,W.fuk,11,'#6B4FA0',900,'start');
 s+='<g>'+planeS('#fff')+'<animateMotion dur="10s" repeatCount="indefinite" rotate="auto" path="M130 250 L130 200 C150 150 200 112 240 112 L400 112 C450 112 490 150 510 200 L510 250"/></g>';
 [[130,244],[130,160],[320,112],[570,240],[320,200]].forEach(function(p,i){s+=BADGE(p[0]+(i===2?60:0),p[1],i+1,11)});
 var L=LIST(W.items,298,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 4 特別な空域と防空識別圏：禁止・制限・危険区域を避け、ADIZに入る前に飛行計画が必要 */
atc_special:function(l){
 var W=({ja:{t:'特別な空域と防空識別圏（ADIZ）',items:['禁止区域（P）：飛んではいけない','制限区域（R）：決まった条件でだけ飛べる','危険区域（D）：射撃・訓練などの危険がある','防空識別圏（ADIZ）：入る前に飛行計画と位置の報告が必要（韓国KADIZ・日本JADIZ）'],adiz:'ADIZ'},
  ko:{t:'특수공역과 방공식별구역(ADIZ)',items:['비행금지구역(P): 날면 안 된다','비행제한구역(R): 정해진 조건에서만 날 수 있다','위험구역(D): 사격·훈련 등의 위험이 있다','방공식별구역(ADIZ): 들어가기 전에 비행계획과 위치 보고가 필요(한국 KADIZ·일본 JADIZ)'],adiz:'ADIZ'},
  en:{t:'Special use airspace and the ADIZ',items:['Prohibited area (P): no flying','Restricted area (R): flying only under set conditions','Danger area (D): hazards such as firing or training','Air defence identification zone (ADIZ): a flight plan and position reports are needed before entry (Korea KADIZ, Japan JADIZ)'],adiz:'ADIZ'}})[l];
 if(!W)return F.atc_special('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,240,'#EEF5FB',14);
 s+='<circle cx="200" cy="150" r="46" fill="#D64545" opacity=".25" stroke="#D64545" stroke-width="3"/>'+tx(200,157,'P',20,'#D64545',900);
 s+='<rect x="300" y="110" width="110" height="80" rx="8" fill="#E08A2F" opacity=".25" stroke="#E08A2F" stroke-width="3" stroke-dasharray="8 5"/>'+tx(355,157,'R',20,'#B8651F',900);
 s+='<rect x="440" y="200" width="100" height="70" rx="8" fill="#F2D233" opacity=".3" stroke="#B89A00" stroke-width="3" stroke-dasharray="3 5"/>'+tx(490,242,'D',20,'#8a6d00',900);
 s+='<path d="M580 60 L580 300" stroke="#6B4FA0" stroke-width="4" stroke-dasharray="14 8"/>'+LB(572,78,W.adiz,11,'#fff','end','#6B4FA0');
 var p='M40 150 L120 150 C150 90 250 80 290 90 C320 96 420 80 440 110 C460 150 470 170 560 170 L620 170';
 s+='<path d="'+p+'" fill="none" stroke="#1F7A6E" stroke-width="3"/><g>'+plane('#fff')+'<animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path="'+p+'"/></g>';
 [[200,208],[355,208],[490,190],[600,268]].forEach(function(q,i){s+=BADGE(q[0],q[1],i+1,11)});
 var L=LIST(W.items,308,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},
/* 5 管制承認（CRAFT）：承認の5つの要素を順に強調し、パイロットが復唱する */
atc_clr:function(l){
 var W=({ja:{t:'管制承認の5つの要素（CRAFT）',atc:'管制（クリアランス・デリバリー）',pil:'パイロットの復唱',k:[['C','承認の限界点（どこまで）'],['R','経路（出発方式・飛行計画の経路）'],['A','高度（最初に上がる高さ）'],['F','周波数（出発後に呼ぶ所）'],['T','トランスポンダーのコード']],note:'承認は必ず復唱して、聞き違いがないかを確かめる。例の出発方式の名前は架空'},
  ko:{t:'관제 허가의 5가지 요소(CRAFT)',atc:'관제(클리어런스 딜리버리)',pil:'조종사의 복창',k:[['C','허가 한계점(어디까지)'],['R','경로(출발 방식·비행계획 경로)'],['A','고도(처음 올라갈 높이)'],['F','주파수(출발 뒤 부를 곳)'],['T','트랜스폰더 코드']],note:'허가는 반드시 복창해 잘못 들은 것이 없는지 확인한다. 예의 출발 방식 이름은 가상'},
  en:{t:'The five parts of an ATC clearance (CRAFT)',atc:'ATC (clearance delivery)',pil:'Pilot’s readback',k:[['C','Clearance limit (how far)'],['R','Route (departure procedure, flight-planned route)'],['A','Altitude (initial climb)'],['F','Frequency (whom to call after departure)'],['T','Transponder code']],note:'Always read the clearance back to catch any mishearing. The departure name in the example is fictitious'}})[l];
 if(!W)return F.atc_clr('ja');
 setK(1);
 var msg=[['C','cleared to Tokyo Narita'],['R','via SAMPLE 1A departure, flight planned route'],['A','climb and maintain 6000'],['F','departure frequency 125.15'],['T','squawk 3421']];
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,190,'#EEF5FB',14)+LB(40,80,W.atc,11,'#fff','start','#2F6FD6');
 var y=110;msg.forEach(function(m,i){s+='<g><rect x="36" y="'+(y-16)+'" width="568" height="24" rx="6" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,5,0,0.55)+' dur="10s" repeatCount="indefinite"/></rect>'+tx(48,y,m[0],12,'#2F6FD6',900,'start')+tx(76,y,m[1],11.5,D,800,'start')+'</g>';y+=26});
 s+=LB(600,238,W.pil+' ✓',11,'#fff','end','#1F7A6E');
 var L=LIST(W.k.map(function(v){return v[0]+(l==='ja'?'：':': ')+v[1]}),258,600,11);
 var n=LI(W.note,10.5,580).length;var yy=L.y+8;var note=WR(320,yy+n*FS(10.5)*1.3/2,W.note,10.5,G,800,580);yy+=n*FS(10.5)*1.3+12;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+yy.toFixed(0)+'" role="img">'+R(0,0,640,yy,'#F7FAFD')+s+L.s+note+'</svg>'},

/* 6 3つの間隔：垂直（上下）・横（隣の経路）・縦（同じ経路の前後） */
atc_sep:function(l){
 var W=({ja:{t:'管制の3つの間隔',v:'垂直の間隔',h:'横の間隔',lg:'縦の間隔',dv:'上下 1,000ft（RVSMのFL410まで）。その上は2,000ft',dh:'経路の間を空ける（洋上ではRNPなどで決まる）',dl:'同じ経路で前後を空ける。時間（例：10分）または距離。レーダーでは5NM（空港の近くは3NM）が基本'},
  ko:{t:'관제의 3가지 분리',v:'수직 분리',h:'수평(측방) 분리',lg:'종 분리',dv:'위아래 1,000ft(RVSM의 FL410까지). 그 위는 2,000ft',dh:'경로 사이를 띄운다(해상에서는 RNP 등으로 정한다)',dl:'같은 경로에서 앞뒤를 띄운다. 시간(예: 10분) 또는 거리. 레이더에서는 5NM(공항 근처는 3NM)이 기본'},
  en:{t:'Three kinds of ATC separation',v:'Vertical',h:'Lateral',lg:'Longitudinal',dv:'1,000 ft (up to FL410 in RVSM airspace), 2,000 ft above',dh:'Space between routes (set by RNP and similar over the ocean)',dl:'Space ahead and behind on the same route, by time (e.g. 10 minutes) or distance; with radar, 5 NM is basic (3 NM near airports)'}})[l];
 if(!W)return F.atc_sep('ja');
 setK(1);var nar=NARROW();
 function panel(x0,y0,w,k){var col=['#2F6FD6','#1F7A6E','#E08A2F'][k],g=R(x0,y0,w,170,'#0E2238',14)+tx(x0+w/2,y0+26,[W.v,W.h,W.lg][k],13,'#fff',900),cx=x0+w/2;
  if(k===0){g+='<line x1="'+(x0+20)+'" y1="'+(y0+80)+'" x2="'+(x0+w-20)+'" y2="'+(y0+80)+'" stroke="#9FB0C2" stroke-dasharray="4 5"/><line x1="'+(x0+20)+'" y1="'+(y0+130)+'" x2="'+(x0+w-20)+'" y2="'+(y0+130)+'" stroke="#9FB0C2" stroke-dasharray="4 5"/>';
   g+='<g>'+planeS('#fff')+'<animateMotion dur="5s" repeatCount="indefinite" path="M'+(x0+20)+' '+(y0+80)+' L'+(x0+w-20)+' '+(y0+80)+'"/></g><g><g transform="scale(-1 1)">'+planeS('#fff')+'</g><animateMotion dur="5s" repeatCount="indefinite" path="M'+(x0+w-20)+' '+(y0+130)+' L'+(x0+20)+' '+(y0+130)+'"/></g>';
   g+=ARW(cx,y0+88,cx,y0+122,col,3)+ARW(cx,y0+122,cx,y0+88,col,3)+LB(cx+8,y0+110,'1,000ft',11,'#fff','start',col)}
  if(k===1){g+='<line x1="'+(x0+20)+'" y1="'+(y0+70)+'" x2="'+(x0+w-20)+'" y2="'+(y0+70)+'" stroke="#1F7A6E" stroke-width="2" stroke-dasharray="8 6"/><line x1="'+(x0+20)+'" y1="'+(y0+140)+'" x2="'+(x0+w-20)+'" y2="'+(y0+140)+'" stroke="#1F7A6E" stroke-width="2" stroke-dasharray="8 6"/>';
   g+='<g>'+plane('#fff')+'<animateMotion dur="5s" repeatCount="indefinite" path="M'+(x0+20)+' '+(y0+70)+' L'+(x0+w-20)+' '+(y0+70)+'"/></g><g>'+plane('#fff')+'<animateMotion dur="5s" begin="-2s" repeatCount="indefinite" path="M'+(x0+20)+' '+(y0+140)+' L'+(x0+w-20)+' '+(y0+140)+'"/></g>'+ARW(cx,y0+78,cx,y0+132,col,3)+ARW(cx,y0+132,cx,y0+78,col,3)}
  if(k===2){var yy=y0+105;g+='<line x1="'+(x0+20)+'" y1="'+yy+'" x2="'+(x0+w-20)+'" y2="'+yy+'" stroke="#E08A2F" stroke-width="2" stroke-dasharray="8 6"/>';
   g+='<g><g>'+plane('#fff')+'<circle r="26" fill="none" stroke="#E08A2F" stroke-width="2" stroke-dasharray="4 4"/></g><animateMotion dur="6s" repeatCount="indefinite" path="M'+(x0+100)+' '+yy+' L'+(x0+w-10)+' '+yy+'"/></g><g>'+plane('#fff')+'<animateMotion dur="6s" repeatCount="indefinite" path="M'+(x0+20)+' '+yy+' L'+(x0+w-90)+' '+yy+'"/></g>'+LB(cx,y0+150,'5NM / 10min',11,'#fff','middle',col)}
  var d=[W.dv,W.dh,W.dl][k],n=LI(d,11,w-24).length,lh=FS(11)*1.3;g+=R(x0,y0+178,w,n*lh+16,'#fff',10,' stroke="#D9E3EC"')+WR(x0+w/2,y0+186+n*lh/2+FS(11)*0.3,d,11,D,800,w-24);
  return {s:g,h:178+n*lh+16}}
 var s='',HH,vw;
 if(nar){vw=580;var y=56;for(var k=0;k<3;k++){var p=panel(20,y,540,k);s+=p.s;y+=p.h+12}HH=y+4}
 else{vw=900;var ps=[0,1,2].map(function(k){return panel(20+k*290,56,270,k)});s=ps.map(function(p){return p.s}).join('');HH=56+Math.max(ps[0].h,ps[1].h,ps[2].h)+12}
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+vw+' '+HH.toFixed(0)+'" role="img">'+R(0,0,vw,HH,'#F7FAFD')+TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s+'</svg>'},

/* 7 後方乱気流（ウェイク）：大きな機の翼の先から渦ができ、下がりながら広がる。後ろの機との間隔 */
atc_wake:function(l){
 var W=({ja:{t:'後方乱気流（ウェイク・タービュランス）',sink:'渦はゆっくり下がり、横に広がる（数分残ることがある）',tbl:'レーダーでの間隔（ICAOの例）',lead:'前の機',fol:'後ろの機',cat:[['スーパー（A380）','ヘビー 6NM・ミディアム 7NM・ライト 8NM'],['ヘビー','ヘビー 4NM・ミディアム 5NM・ライト 6NM'],['ミディアム','ライト 5NM']],note:'離陸では、重い機の後ろに軽い機が続くとき2分空ける（ICAOの基本）。国によっては細かい区分（RECAT）を使う'},
  ko:{t:'후방 난기류(웨이크 터뷸런스)',sink:'소용돌이는 천천히 내려가며 옆으로 퍼진다(몇 분 남기도 한다)',tbl:'레이더 분리(ICAO 예)',lead:'앞 항공기',fol:'뒤 항공기',cat:[['슈퍼(A380)','헤비 6NM·미디엄 7NM·라이트 8NM'],['헤비','헤비 4NM·미디엄 5NM·라이트 6NM'],['미디엄','라이트 5NM']],note:'이륙에서는 무거운 항공기 뒤에 가벼운 항공기가 이어질 때 2분 띄운다(ICAO 기본). 나라에 따라 세분화한 구분(RECAT)을 쓴다'},
  en:{t:'Wake turbulence',sink:'The vortices sink slowly and spread sideways (they can last several minutes)',tbl:'Radar separation (ICAO examples)',lead:'Leader',fol:'Follower',cat:[['Super (A380)','Heavy 6 NM, Medium 7 NM, Light 8 NM'],['Heavy','Heavy 4 NM, Medium 5 NM, Light 6 NM'],['Medium','Light 5 NM']],note:'On departure, a lighter aircraft behind a heavier one waits 2 minutes (ICAO basic rule). Some countries use finer categories (RECAT)'}})[l];
 if(!W)return F.atc_wake('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,200,'#DCEEFB',14);
 s+='<g transform="translate(470 110) scale(1.8)">'+planeS('#fff')+'</g>';
 for(var i=0;i<6;i++){var x=418-i*60,y=120+i*12,r=8+i*2.5;s+='<g><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="none" stroke="#6B4FA0" stroke-width="2.5" opacity="'+(1-i*0.13).toFixed(2)+'" stroke-dasharray="'+(r*4.5).toFixed(0)+' '+(r*1.8).toFixed(0)+'"><animateTransform attributeName="transform" type="rotate" values="0 '+x+' '+y+';360 '+x+' '+y+'" dur="1.4s" repeatCount="indefinite"/></circle></g>'}
 s+='<g><g transform="translate(90 150)">'+planeS('#fff')+'</g><animateTransform attributeName="transform" type="translate" values="0 0;-30 0;0 0" dur="4s" repeatCount="indefinite"/></g>';
 s+=LB(470,80,W.lead,11,'#fff','middle','#243447')+LB(90,188,W.fol,11,'#fff','middle','#243447')+LBW(300,232,W.sink,10.5,'#6B4FA0','middle','#fff',420);
 var y=270,lh=FS(11.5)*1.5;s+=R(20,y,600,lh+10,'#243447',8)+tx(320,y+lh*0.75,W.tbl,11.5,'#fff',900);y+=lh+14;
 s+=R(20,y,600,lh,'#DCE3EA',6)+tx(40,y+lh*0.7,W.lead+' ↓',11,D,900,'start')+tx(420,y+lh*0.7,W.fol+' → NM',11,D,900);y+=lh+4;
 W.cat.forEach(function(r,i){var n=LI(r[1],11,360).length,h=Math.max(lh,n*FS(11)*1.3+10);s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',6)+tx(40,y+h/2+FS(11.5)*0.35,r[0],11.5,D,900,'start')+WR(420,y+h/2+FS(11)*0.3,r[1],11,'#1d4d8a',800,360);y+=h+4});
 var n2=LI(W.note,10.5,580).length;s+=WR(320,y+8+n2*FS(10.5)*1.3/2,W.note,10.5,G,800,580);y+=n2*FS(10.5)*1.3+18;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 8 待機（ホールディング）：右回りの競走路の形。3つの入り方と速さの上限 */
atc_hold:function(l){
 var W=({ja:{t:'待機（ホールディング）',fix:'待機点',inb:'インバウンド（1分）',items:['右回りがふつう。インバウンドの長さは 14,000ft 以下で1分、それより上で1分30秒','直接の入り方：そのまま待機点から回り始める','ティアドロップ：待機の内側へ約30°ずらして出て、戻ってくる','平行の入り方：インバウンドと平行に逆向きに飛んでから戻る','速さの上限（ICAOの例）：14,000ft以下 230kt、20,000ftまで 240kt、34,000ftまで 265kt、その上は M0.83']},
  ko:{t:'대기(홀딩)',fix:'대기점',inb:'인바운드(1분)',items:['오른쪽으로 도는 것이 보통. 인바운드 길이는 14,000ft 이하에서 1분, 그 위에서 1분 30초','직접 진입: 대기점에서 그대로 돌기 시작한다','티어드롭: 대기 안쪽으로 약 30° 비껴 나갔다가 돌아온다','평행 진입: 인바운드와 평행하게 반대 방향으로 난 뒤 돌아온다','속도 상한(ICAO 예): 14,000ft 이하 230kt, 20,000ft까지 240kt, 34,000ft까지 265kt, 그 위는 M0.83']},
  en:{t:'Holding',fix:'Holding fix',inb:'Inbound (1 min)',items:['Right-hand turns are standard; the inbound leg is 1 minute at or below 14,000 ft and 1½ minutes above','Direct entry: start the pattern straight away at the fix','Teardrop (offset) entry: fly out about 30° into the holding side, then turn back','Parallel entry: fly parallel to the inbound leg in the opposite direction, then return','Speed limits (ICAO examples): 230 kt up to 14,000 ft, 240 kt to 20,000 ft, 265 kt to 34,000 ft, M0.83 above']}})[l];
 if(!W)return F.atc_hold('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,210,'#EEF5FB',14);
 var fx=440,fy=120,r=46,L=200;
 var race='M'+fx+' '+fy+' A'+r+' '+r+' 0 0 1 '+fx+' '+(fy+2*r)+' L'+(fx-L)+' '+(fy+2*r)+' A'+r+' '+r+' 0 0 1 '+(fx-L)+' '+fy+' Z';
 s+='<path d="'+race+'" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="8 6"/>';
 s+='<line x1="'+(fx-L)+'" y1="'+fy+'" x2="'+fx+'" y2="'+fy+'" stroke="#1F7A6E" stroke-width="4"/>'+LB((fx-L/2),fy-14,W.inb,10.5,'#fff','middle','#1F7A6E');
 s+='<g transform="translate('+fx+' '+fy+')"><path d="M0 -10 L9 6 L-9 6 Z" fill="#fff" stroke="#D64545" stroke-width="3"/></g>'+LB(fx+20,fy+6,W.fix,10.5,'#D64545','start','#fff');
 s+='<g>'+plane('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="M'+(fx-L)+' '+fy+' L'+fx+' '+fy+' A'+r+' '+r+' 0 0 1 '+fx+' '+(fy+2*r)+' L'+(fx-L)+' '+(fy+2*r)+' A'+r+' '+r+' 0 0 1 '+(fx-L)+' '+fy+'"/></g>';
 s+=BADGE(fx-L/2,fy+2*r+24,1,11);
 var Lst=LIST(W.items,278,600,11);
 var HH=Lst.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+Lst.s+'</svg>'},
/* 9 音声アルファベットと数字：RJTT を順に読み、特別な読み方の数字も示す */
atc_phon:function(l){
 var W=({ja:{t:'音声アルファベットと数字',ex:'例：羽田の地名略号 RJTT ＝ ロメオ・ジュリエット・タンゴ・タンゴ',num:'読み方に気をつける数字',note:'聞き違えやすい文字や数字を、決まった言い方で伝える（ICAO Annex 10）'},
  ko:{t:'음성 알파벳과 숫자',ex:'예: 하네다의 지명 약호 RJTT = 로미오·줄리엣·탱고·탱고',num:'읽는 법에 주의할 숫자',note:'잘못 듣기 쉬운 글자와 숫자를 정해진 말로 전한다(ICAO Annex 10)'},
  en:{t:'The phonetic alphabet and numbers',ex:'Example: Haneda’s location indicator RJTT = Romeo Juliett Tango Tango',num:'Numbers with special pronunciation',note:'Letters and numbers that are easily misheard are sent with set words (ICAO Annex 10)'}})[l];
 if(!W)return F.atc_phon('ja');
 setK(1);
 var A=['Alfa','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel','India','Juliett','Kilo','Lima','Mike','November','Oscar','Papa','Quebec','Romeo','Sierra','Tango','Uniform','Victor','Whiskey','X-ray','Yankee','Zulu'];
 var s=TTL(320,30,W.t,15,'#0f3558',600),cols=NARROW()?4:5,cw=600/cols,ch=Math.max(34,FS(11)*1.6),x0=20,y0=56;
 var seq=['R','J','T','T'],order={};seq.forEach(function(c,i){(order[c]=order[c]||[]).push(i)});
 A.forEach(function(w,i){var c=i%cols,r=Math.floor(i/cols),x=x0+c*cw,y=y0+r*(ch+4),L=w.charAt(0);
  s+=R(x,y,cw-6,ch,'#fff',8,' stroke="#D9E3EC"');
  if(order[L]){order[L].forEach(function(k){s+='<rect x="'+x+'" y="'+y+'" width="'+(cw-6)+'" height="'+ch+'" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(k,4,0,0.8)+' dur="8s" repeatCount="indefinite"/></rect>'})}
  s+=tx(x+14,y+ch/2+FS(12)*0.35,L,12,'#2F6FD6',900,'start')+tx(x+34,y+ch/2+FS(11)*0.35,w,11,D,800,'start')});
 var y=y0+Math.ceil(26/cols)*(ch+4)+8;
 var n=LI(W.ex,11.5,580).length;s+=WR(320,y+n*FS(11.5)*1.3/2+FS(11.5)*0.3,W.ex,11.5,'#8a3b00',900,580);y+=n*FS(11.5)*1.3+14;
 s+=R(20,y,600,FS(12)*1.6+10,'#243447',8)+tx(320,y+FS(12)*1.2,W.num,12,'#fff',900);y+=FS(12)*1.6+16;
 [['3','TREE'],['4','FOW-er'],['5','FIFE'],['9','NIN-er'],['1000','TOU-SAND'],['.','DAY-SEE-MAL']].forEach(function(v,i){var x=20+(i%3)*202,yy=y+Math.floor(i/3)*(FS(12)*1.8+8);s+=R(x,yy,196,FS(12)*1.8,'#F4F7FB',8)+tx(x+16,yy+FS(12)*1.25,v[0],12,'#2F6FD6',900,'start')+tx(x+(v[0].length>2?74:48),yy+FS(12)*1.25,v[1],11.5,D,900,'start')});
 y+=2*(FS(12)*1.8+8)+6;
 var n2=LI(W.note,10.5,580).length;s+=WR(320,y+n2*FS(10.5)*1.3/2,W.note,10.5,G,800,580);y+=n2*FS(10.5)*1.3+14;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 10 呼び出しと復唱の流れ：最初の呼び出し → 指示 → 復唱（最後にコールサイン） */
atc_call:function(l){
 var W=({ja:{t:'呼び出しと復唱の流れ',p:'パイロット',a:'管制',k:['最初の呼び出し：相手 → 自分 → 用件（高度など）','管制の指示','復唱：大事な部分をくり返し、最後に自分のコールサイン'],note:'コールサインは航空会社の呼び名＋便名（例：KOREAN AIR 705 ＝ コリアンエア セブン ゼロ ファイブ）'},
  ko:{t:'호출과 복창의 흐름',p:'조종사',a:'관제',k:['첫 호출: 상대 → 자신 → 용건(고도 등)','관제 지시','복창: 중요한 부분을 되풀이하고 마지막에 자신의 호출부호'],note:'호출부호는 항공사 호칭 + 편명(예: KOREAN AIR 705 = 코리안에어 세븐 제로 파이브)'},
  en:{t:'The flow of a call and readback',p:'Pilot',a:'ATC',k:['Initial call: whom you are calling → who you are → the message (e.g. level)','ATC instruction','Readback: repeat the key parts and end with your call sign'],note:'Call signs are the airline’s telephony designator plus the flight number (e.g. KOREAN AIR 705 = “Korean Air Seven Zero Five”)'}})[l];
 if(!W)return F.atc_call('ja');
 setK(1);
 var msgs=[[0,'Tokyo Control, Korean Air 705, flight level 350'],[1,'Korean Air 705, Tokyo Control, radar contact, descend and maintain flight level 240'],[0,'Descend and maintain flight level 240, Korean Air 705']];
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=72;
 msgs.forEach(function(m,i){var atc=m[0]===1,n=LI(m[1],11.5,420).length,lh=FS(11.5)*1.3,h=n*lh+20,x=atc?180:40,col=atc?'#2F6FD6':'#1F7A6E';
  var g=R(x,y,440,h,atc?'#E3F1FB':'#E8F5F2',14,' stroke="'+col+'" stroke-width="2"')+WR(x+220,y+10+n*lh/2+FS(11.5)*0.3,m[1],11.5,D,800,420)+LB(atc?x+440:x,y-2,atc?W.a:W.p,10.5,'#fff',atc?'end':'start',col)+BADGE(atc?x-24:x+464,y+h/2,i+1,11);
  s+='<g opacity="0">'+g+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(i*0.25).toFixed(2)+';'+(i*0.25+0.05).toFixed(2)+';1" dur="9s" repeatCount="indefinite"/></g>';y+=h+18});
 var L=LIST(W.k,y+4,600,11);var n=LI(W.note,10.5,580).length,yy=L.y+6;var note=WR(320,yy+n*FS(10.5)*1.3/2+FS(10.5)*0.3,W.note,10.5,G,800,580);yy+=n*FS(10.5)*1.3+14;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+yy.toFixed(0)+'" role="img">'+R(0,0,640,yy,'#F7FAFD')+s+L.s+note+'</svg>'},

/* 11 「ROGER」は復唱ではない：高度の指示に Roger だけでは足りない */
atc_roger:function(l){
 var W=({ja:{t:'「ROGER」は復唱ではない',bad:'よくない例',good:'よい例',why:'ROGER は「受け取った」という意味だけ。高度・針路・速さ・滑走路の指示は、数字をくり返して復唱する',w:[['ROGER','全部受け取った'],['WILCO','分かった、そのとおりにする'],['AFFIRM／NEGATIVE','はい／いいえ'],['UNABLE','できない（理由を添える）'],['SAY AGAIN','もう一度言ってください'],['STANDBY','待ってください（あとで呼ぶ）']]},
  ko:{t:'‘ROGER’는 복창이 아니다',bad:'나쁜 예',good:'좋은 예',why:'ROGER는 ‘받았다’는 뜻뿐이다. 고도·기수 방향·속도·활주로 지시는 숫자를 되풀이해 복창한다',w:[['ROGER','모두 받았다'],['WILCO','알았다, 그대로 하겠다'],['AFFIRM/NEGATIVE','네/아니오'],['UNABLE','할 수 없다(이유를 덧붙인다)'],['SAY AGAIN','다시 말해 달라'],['STANDBY','기다려 달라(나중에 부른다)']]},
  en:{t:'“ROGER” is not a readback',bad:'Poor',good:'Good',why:'ROGER only means “received”. Level, heading, speed and runway instructions must be read back with the numbers',w:[['ROGER','I have received all of your transmission'],['WILCO','Understood, will comply'],['AFFIRM / NEGATIVE','Yes / no'],['UNABLE','Cannot comply (give the reason)'],['SAY AGAIN','Repeat your last transmission'],['STANDBY','Wait, I will call you']]}})[l];
 if(!W)return F.atc_roger('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),atc='Korean Air 705, climb and maintain flight level 350';
 var n0=LI(atc,11.5,560).length,lh=FS(11.5)*1.3,h0=n0*lh+18;s+=R(40,58,560,h0,'#E3F1FB',14,' stroke="#2F6FD6" stroke-width="2"')+WR(320,58+9+n0*lh/2+FS(11.5)*0.3,atc,11.5,D,800,540);
 var y=58+h0+16,hb=lh+20;
 s+='<g>'+R(20,y,290,hb,'#FDEAE3',12,' stroke="#D64545" stroke-width="2"')+tx(165,y+hb/2+FS(11.5)*0.35,'Roger, Korean Air 705',11.5,'#D64545',900)+LB(24,y-2,'✗ '+W.bad,10.5,'#fff','start','#D64545')+'<animate attributeName="opacity" values=".35;1;1;.35" keyTimes="0;.1;.45;.5" dur="8s" repeatCount="indefinite"/></g>';
 var gtxt='Climb and maintain flight level 350, Korean Air 705',ng=LI(gtxt,11.5,270).length,hg=Math.max(hb,ng*lh+20);
 s+='<g>'+R(330,y,290,hg,'#E8F5F2',12,' stroke="#1F7A6E" stroke-width="2"')+WR(475,y+10+ng*lh/2+FS(11.5)*0.3,gtxt,11.5,'#1F7A6E',900,270)+LB(334,y-2,'✓ '+W.good,10.5,'#fff','start','#1F7A6E')+'<animate attributeName="opacity" values=".35;.35;1;1" keyTimes="0;.5;.6;1" dur="8s" repeatCount="indefinite"/></g>';
 y+=Math.max(hb,hg)+14;var n1=LI(W.why,11.5,560).length;s+=R(20,y,600,n1*lh+16,'#FFF1E3',10)+WR(320,y+8+n1*lh/2+FS(11.5)*0.3,W.why,11.5,'#8a3b00',900,560);y+=n1*lh+26;
 W.w.forEach(function(r,i){var nn=LI(r[1],11,340).length,hh=Math.max(FS(11.5)*1.5,nn*FS(11)*1.3+10);s+=R(20,y,600,hh,i%2?'#fff':'#F4F7FB',6)+tx(36,y+hh/2+FS(11.5)*0.35,r[0],11.5,'#2F6FD6',900,'start')+WR(440,y+hh/2+FS(11)*0.3,r[1],11,D,800,340);y+=hh+4});
 y+=10;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 12 洋上の通信：陸の近くはVHF、離れるとHF（電離層で反射）とSELCAL、衛星でCPDLC・ADS-C */
atc_ocean:function(l){
 var W=({ja:{t:'洋上の通信',vhf:'VHF（見通しの範囲だけ）',hf:'HF（電離層で反射して遠くへ）',sat:'衛星：CPDLC・ADS-C',items:['VHF：118〜137MHz。陸の近くだけ届く。緊急は121.5MHz','HF：電離層で反射して遠くまで届くが、雑音が多い。SELCAL（呼び出し音）で呼ばれるまで聞き続けなくてよい','CPDLC：管制と文字でやりとりする。ADS-C：機体が位置を自動で報告する','位置通報の順：コールサイン・位置・時刻・高度・次の位置と予定時刻・その次の位置']},
  ko:{t:'해상의 통신',vhf:'VHF(가시거리 안에서만)',hf:'HF(전리층에 반사되어 멀리)',sat:'위성: CPDLC·ADS-C',items:['VHF: 118~137MHz. 육지 근처에서만 닿는다. 비상은 121.5MHz','HF: 전리층에 반사되어 멀리까지 닿지만 잡음이 많다. SELCAL(호출음)로 불릴 때까지 계속 듣지 않아도 된다','CPDLC: 관제와 문자로 주고받는다. ADS-C: 항공기가 위치를 자동으로 보고한다','위치 보고 순서: 호출부호·위치·시각·고도·다음 위치와 예정 시각·그다음 위치']},
  en:{t:'Communications over the ocean',vhf:'VHF (line of sight only)',hf:'HF (reflected by the ionosphere)',sat:'Satellite: CPDLC, ADS-C',items:['VHF: 118–137 MHz, reaching only near land; emergency frequency 121.5 MHz','HF: reflected by the ionosphere to reach far but noisy; SELCAL chimes mean the crew need not listen continuously','CPDLC: text messages with ATC. ADS-C: the aircraft reports its position automatically','Position report order: call sign, position, time, level, next position and estimate, the one after']}})[l];
 if(!W)return F.atc_ocean('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,220,'#0E2238',14)+'<defs><clipPath id="ocl"><rect x="20" y="56" width="600" height="220" rx="14"/></clipPath></defs><g clip-path="url(#ocl)"><path d="M20 74 Q320 56 620 74" fill="none" stroke="#6B4FA0" stroke-width="3" stroke-dasharray="6 5" opacity=".8"/>';
 s+='<path d="M20 276 L20 236 L120 236 L140 276 Z" fill="#9C8A62"/>'+R(140,236,480,40,'#2F6FA8',0);
 s+='<g transform="translate(70 226)"><rect x="-3" y="-20" width="6" height="20" fill="#9FB0C2"/><circle cy="-22" r="4" fill="#9FD3F7"/></g>';
 for(var i=1;i<=3;i++)s+='<path d="M70 204 m-'+(i*36)+' 0 a'+(i*36)+' '+(i*36)+' 0 0 1 '+(i*72)+' 0" fill="none" stroke="#9FD3F7" stroke-width="2" opacity=".7"/>';
 s+=LB(150,120,W.vhf,10.5,'#0f3558','middle','#9FD3F7');
 s+='<path d="M70 204 L300 66 L520 180" fill="none" stroke="#FFB870" stroke-width="3" stroke-dasharray="8 6"><animate attributeName="stroke-dashoffset" values="0;-28" dur="1s" repeatCount="indefinite"/></path>'+LB(330,90,W.hf,10.5,'#0f3558','middle','#FFB870');
 s+='<g transform="translate(560 84)"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#F2D233"/><rect x="-24" y="-3" width="14" height="6" fill="#9FD3F7"/><rect x="10" y="-3" width="14" height="6" fill="#9FD3F7"/></g><path d="M556 94 L522 174" stroke="#7CF2B0" stroke-width="2" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/></path>'+LB(560,120,W.sat,10.5,'#0f3558','end','#7CF2B0');
 s+='<g transform="translate(520 186)">'+planeS('#fff')+'</g></g>';
 var L=LIST(W.items,288,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
