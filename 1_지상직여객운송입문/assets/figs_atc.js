/* 航空交通と通信（Part 13）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
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
 s+='<g>'+plane('#fff')+'<animateMotion dur="16s" repeatCount="indefinite" rotate="auto" path="'+P+'"/></g>';
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
 s+='<g>'+plane('#fff')+'<animateMotion dur="10s" repeatCount="indefinite" rotate="auto" path="M130 250 L130 200 C150 150 200 112 240 112 L400 112 C450 112 490 150 510 200 L510 250"/></g>';
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
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
