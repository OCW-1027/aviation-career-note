/* 航空管制の基礎（講座 26）の図（2026.11 新規）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算）
   便名は架空（VELA・CORAL・HANBIT・LUMEN）。管制の名前・周波数は実在のものを示さない */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,planeS=H.planeS,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function BADGE(x,y,n,sz){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function LIST(items,y,w,sz,x0){x0=x0||20;var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(x0,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(x0+22,y+h/2,i+1,sz)+WR(x0+44,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-60,'start');y+=h+4});return {s:g,y:y}}
/* 説明の箱（折り返す文） */
function NOTEBOX(x,y,w,txt,sz,col){var n=LI(txt,sz,w-24).length,lh=FS(sz)*1.3,h=n*lh+14;return {s:R(x,y,w,h,'#fff',10,' stroke="#D9E3EC"')+WR(x+w/2,y+7+n*lh/2+FS(sz)*0.3,txt,sz,col||D,800,w-24),h:h}}
function svg(vw,hh,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+vw+' '+hh.toFixed(0)+'" role="img">'+R(0,0,vw,hh,'#F7FAFD')+body+'</svg>'}
/* レーダーの機影とデータブロック（便名・高度・速度） */
function TGT(cs,l2,col){return '<rect x="-4" y="-4" width="8" height="8" fill="none" stroke="'+col+'" stroke-width="2"/><line x1="4" y1="-4" x2="14" y2="-14" stroke="'+col+'" stroke-width="1.2"/>'+tx(16,-28,cs,11,col,900,'start')+tx(16,-14,l2,11,col,700,'start')}
var F={
/* 1 レーダー画面：データブロック、近づく2機にレーダー誘導、出発機 */
atcb_scope:function(l){
 var W=({ja:{t:'レーダー画面で管制官が見ているもの',ap:'空港',bub:'「VELA 301、右旋回 方位180」',sep:'間隔を確保',u:['機影の横に、便名・高度（百ft単位）・速度が出る（データブロック）','近づきすぎる前に、方位・高度・速度を指示して間隔を保つ（レーダー誘導）','到着の順番を決め、出発機は上昇の経路へ送り出す']},
  ko:{t:'관제사가 레이더 화면에서 보는 것',ap:'공항',bub:'“VELA 301, 오른쪽 선회 방위 180”',sep:'간격 확보',u:['항적 옆에 편명·고도(100ft 단위)·속도가 표시된다(데이터 블록)','너무 가까워지기 전에 방위·고도·속도를 지시해 간격을 지킨다(레이더 유도)','도착 순서를 정하고, 출발기는 상승 경로로 내보낸다']},
  en:{t:'What a controller sees on the radar screen',ap:'Airport',bub:'“VELA 301, turn right heading 180”',sep:'Spacing kept',u:['Next to each target: callsign, altitude (in hundreds of feet) and speed (the data block)','Before two aircraft get too close, the controller gives headings, altitudes or speeds to keep them apart (radar vectoring)','Arrivals are put in order; departures are sent on to their climb route']}})[l];
 if(!W)return F.atcb_scope('ja');
 setK(1);
 var cx=320,cy=215,r=160,s=TTL(320,30,W.t,15,'#0f3558',600),a=0.55;
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#0B1C2C"/>';
 [55,110].forEach(function(rr){s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+rr+'" fill="none" stroke="#24506B" stroke-width="1.2"/>'});
 s+='<line x1="'+(cx-r)+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'" stroke="#1B3A50"/><line x1="'+cx+'" y1="'+(cy-r)+'" x2="'+cx+'" y2="'+(cy+r)+'" stroke="#1B3A50"/>';
 s+='<g><path d="M'+cx+' '+cy+' L'+cx+' '+(cy-r)+' A'+r+' '+r+' 0 0 1 '+(cx+r*Math.sin(a)).toFixed(1)+' '+(cy-r*Math.cos(a)).toFixed(1)+' Z" fill="#3DDC97" opacity=".16"/><animateTransform attributeName="transform" type="rotate" from="0 '+cx+' '+cy+'" to="360 '+cx+' '+cy+'" dur="4s" repeatCount="indefinite"/></g>';
 s+='<rect x="'+(cx-16)+'" y="'+(cy-2.5)+'" width="32" height="5" rx="2" fill="#9FB0C2" transform="rotate(-35 '+cx+' '+cy+')"/>'+tx(cx+4,cy+26,W.ap,11,'#9FB0C2',800);
 /* A：到着機（右旋回して南へ）／B：反対から来る機／C：出発機 */
 var PA='M178 150 L262 150 Q292 150 294 180 L300 196',PB='M468 142 L178 160',PC='M330 205 L452 84';
 s+='<path d="'+PA+'" fill="none" stroke="#FFD23F" stroke-width="1.2" stroke-dasharray="3 5" opacity=".55"/>';
 s+='<g>'+TGT('VELA301','120↓ 250','#FFD23F')+'<animateMotion dur="10s" repeatCount="indefinite" path="'+PA+'"/></g>';
 s+='<g>'+TGT('HANBIT707','120 280','#7FD3FF')+'<circle r="24" fill="none" stroke="#7FD3FF" stroke-width="1.5" stroke-dasharray="4 4" opacity=".8"/><animateMotion dur="10s" repeatCount="indefinite" path="'+PB+'"/></g>';
 s+='<g>'+TGT('CORAL52','080↑ 220','#9BE7A5')+'<animateMotion dur="10s" repeatCount="indefinite" path="'+PC+'"/></g>';
 s+='<g opacity="0">'+LBW(320,82,W.bub,11.5,'#0f3558','middle','#FFE9A8',300)+'<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.24;.27;.62;.65;1" dur="10s" repeatCount="indefinite"/></g>';
 s+='<g opacity="0">'+LB(250,330,W.sep,11,'#0B1C2C','middle','#9BE7A5')+'<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.6;.63;.92;.95;1" dur="10s" repeatCount="indefinite"/></g>';
 var L=LIST(W.u,392,600,11);
 return svg(640,L.y+8,s+L.s)},

/* 2 航空路の管制はどう分けられているか：日本（上下）・韓国（東西）・米国（センター）・欧州（国ごと＋上層） */
atcb_acc:function(l){
 var W=({ja:{t:'航空路の管制の分け方（4つの地域）',p:[['日本','高い空と低い空で分ける','福岡（高高度・洋上など）','神戸（西）','東京（東）','33,500ft','2025年3月に、高い空（33,500ft以上）と洋上を福岡航空交通管制部、低い空を主に東京（東）・神戸（西）が受け持つ形がそろった'],
   ['韓国','東と西で分ける','仁川（西）','大邱（東）','','','2017年に大邱に2つ目の航空交通管制所ができ、仁川と東西で空を分けた。交通の流れの調整は航空交通統制センターなど'],
   ['米国','20あまりのセンター','ARTCC','','','','航空路の管制は20あまりの航空路管制センター（ARTCC）。空港の周りはTRACON、空港は管制塔'],
   ['欧州','国ごと＋国境をまたぐ上層','MUAC','','','24,500ft','管制は国ごとの機関。ベルギー・オランダ・ルクセンブルク・ドイツ北西部の高い空はEUROCONTROLのMUACがまとめて受け持つ']]},
  ko:{t:'항로 관제를 나누는 방식(네 지역)',p:[['일본','높은 하늘과 낮은 하늘로 나눔','후쿠오카(고고도·해양 등)','고베(서)','도쿄(동)','33,500ft','2025년 3월, 높은 하늘(33,500ft 이상)과 해양은 후쿠오카 항공교통관제부, 낮은 하늘은 주로 도쿄(동)·고베(서)가 맡는 구조가 완성됐다'],
   ['한국','동쪽과 서쪽으로 나눔','인천(서)','대구(동)','','','2017년 대구에 두 번째 항공교통관제소가 생겨 인천과 동서로 하늘을 나눴다. 교통 흐름 조정은 항공교통통제센터 등'],
   ['미국','20여 개 센터','ARTCC','','','','항로 관제는 20여 곳의 항로교통관제센터(ARTCC). 공항 주변은 TRACON, 공항은 관제탑'],
   ['유럽','나라별 + 국경을 넘는 상층','MUAC','','','24,500ft','관제는 나라마다의 기관. 벨기에·네덜란드·룩셈부르크·독일 북서부의 높은 하늘은 EUROCONTROL의 MUAC가 함께 맡는다']]},
  en:{t:'How en-route control is divided (four regions)',p:[['Japan','Split by height','Fukuoka (upper and oceanic)','Kobe (west)','Tokyo (east)','33,500 ft','Since March 2025, Fukuoka ACC handles the upper (33,500 ft and above) and oceanic airspace, and mainly Tokyo (east) and Kobe (west) the lower airspace'],
   ['Korea','Split east and west','Incheon (west)','Daegu (east)','','','A second area control centre opened in Daegu in 2017, dividing the sky east and west with Incheon; traffic flow is managed by the national flow centre'],
   ['USA','About 20 centres','ARTCC','','','','En-route control by about 20 Air Route Traffic Control Centers (ARTCCs); TRACONs around airports; towers at airports'],
   ['Europe','National ANSPs plus a cross-border upper area','MUAC','','','24,500 ft','Each country has its own provider; EUROCONTROL’s MUAC controls the upper airspace of Belgium, the Netherlands, Luxembourg and north-west Germany']]}})[l];
 if(!W)return F.atcb_acc('ja');
 setK(1);var nar=NARROW();
 function panel(x0,y0,w,k){var P=W.p[k],g=R(x0,y0,w,176,'#0E2238',14)+tx(x0+16,y0+26,P[0],14,'#fff',900,'start')+tx(x0+w-14,y0+26,P[1],11,'#A9C7E8',800,'end'),bx=x0+14,by=y0+40,bw=w-28,bh=122,dur='9s';
  if(k===0){var ly=by+48;g+=R(bx,by,bw,ly-by,'#2B4F7A',8)+R(bx,ly,bw/2-2,by+bh-ly,'#2E6B5E',8)+R(bx+bw/2+2,ly,bw/2-2,by+bh-ly,'#7A5A2E',8);
   g+='<line x1="'+bx+'" y1="'+ly+'" x2="'+(bx+bw)+'" y2="'+ly+'" stroke="#FFD23F" stroke-width="2" stroke-dasharray="6 4"/>'+LB(bx+bw-6,ly+4,P[5],10.5,'#0E2238','end','#FFD23F');
   g+=tx(bx+bw/2,by+28,P[2],11.5,'#fff',900)+tx(bx+bw/4,by+bh-18,P[3],11.5,'#fff',900)+tx(bx+bw*3/4,by+bh-18,P[4],11.5,'#fff',900);
   var pp='M'+(bx+14)+' '+(by+bh-40)+' L'+(bx+bw*0.38)+' '+(ly+8)+' L'+(bx+bw*0.55)+' '+(by+22)+' L'+(bx+bw-14)+' '+(by+22);g+='<g>'+plane('#fff')+'<animateMotion dur="'+dur+'" repeatCount="indefinite" rotate="auto" path="'+pp+'"/></g>'}
  if(k===1){g+=R(bx,by,bw/2-2,bh,'#2B4F7A',8)+R(bx+bw/2+2,by,bw/2-2,bh,'#2E6B5E',8)+'<line x1="'+(bx+bw/2)+'" y1="'+by+'" x2="'+(bx+bw/2)+'" y2="'+(by+bh)+'" stroke="#FFD23F" stroke-width="2" stroke-dasharray="6 4"/>';
   g+=tx(bx+bw/4,by+24,P[2],11.5,'#fff',900)+tx(bx+bw*3/4,by+24,P[3],11.5,'#fff',900);
   var pp='M'+(bx+20)+' '+(by+bh-30)+' L'+(bx+bw-20)+' '+(by+50);g+='<g>'+plane('#fff')+'<animateMotion dur="'+dur+'" repeatCount="indefinite" rotate="auto" path="'+pp+'"/></g>'}
  if(k===2){var cw=bw/4,ch=bh/2,cols=['#2B4F7A','#2E6B5E','#3D4F7A','#5A3D6B'];for(var i=0;i<8;i++){var cx=bx+(i%4)*cw,cy=by+Math.floor(i/4)*ch;g+='<rect x="'+(cx+1)+'" y="'+(cy+1)+'" width="'+(cw-2)+'" height="'+(ch-2)+'" rx="6" fill="'+cols[(i+Math.floor(i/4))%4]+'"><animate attributeName="fill-opacity" '+SEG(i<4?i:7-i+4,8,'.55','1')+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+tx(cx+cw/2,cy+ch/2+4,P[2],10.5,'#fff',800)}
   var pp='M'+(bx+10)+' '+(by+ch/2)+' L'+(bx+bw-10)+' '+(by+ch/2)+' L'+(bx+bw-10)+' '+(by+ch*1.5)+' L'+(bx+10)+' '+(by+ch*1.5);g+='<g>'+plane('#FFD23F')+'<animateMotion dur="'+dur+'" repeatCount="indefinite" rotate="auto" path="'+pp+'"/></g>'}
  if(k===3){var ly=by+46,cw=bw/5,cn=['#2B4F7A','#2E6B5E','#7A5A2E','#3D4F7A','#5A3D6B'];g+=R(bx+cw,by,cw*3,ly-by,'#1F7A6E',8)+tx(bx+cw*2.5,by+28,P[2],11.5,'#fff',900);
   for(var i=0;i<5;i++)g+='<rect x="'+(bx+i*cw+1)+'" y="'+(ly+2)+'" width="'+(cw-2)+'" height="'+(by+bh-ly-2)+'" rx="6" fill="'+cn[i]+'"/>';
   g+='<line x1="'+bx+'" y1="'+ly+'" x2="'+(bx+bw)+'" y2="'+ly+'" stroke="#FFD23F" stroke-width="2" stroke-dasharray="6 4"/>'+LB(bx+bw-6,ly-6,P[5],10.5,'#0E2238','end','#FFD23F');
   var pp='M'+(bx+10)+' '+(by+bh-24)+' L'+(bx+cw*1.2)+' '+(by+20)+' L'+(bx+cw*3.8)+' '+(by+20)+' L'+(bx+bw-10)+' '+(by+bh-24);g+='<g>'+plane('#fff')+'<animateMotion dur="'+dur+'" repeatCount="indefinite" rotate="auto" path="'+pp+'"/></g>'}
  var nb=NOTEBOX(x0,y0+184,w,P[6],11);g+=nb.s;return {s:g,h:184+nb.h}}
 var s='',HH,vw;
 if(nar){vw=580;var y=56;for(var k=0;k<4;k++){var p=panel(20,y,540,k);s+=p.s;y+=p.h+12}HH=y+4}
 else{vw=900;var y=56;for(var row=0;row<2;row++){var a=panel(20,y,420,row*2),b=panel(460,y,420,row*2+1);s+=a.s+b.s;y+=Math.max(a.h,b.h)+14}HH=y+2}
 return svg(vw,HH,TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s)},

/* 3 1便を上から見る：空港の管制圏 → 進入管制区 → 航空路（FIR境界）→ 到着側 */
atcb_plan:function(l){
 var W=({ja:{t:'上から見た1便の管制（金浦→羽田の例）',dep:'出発空港',arr:'到着空港',z1:'管制圏',z2:'進入管制区',z3:'航空路',fir:'FIR境界',u:['デリバリー：管制承認（経路・高度・出発方式・コード）','グランド：スポットから滑走路まで','タワー：離陸の許可','ディパーチャー：決まった出発方式（SID）で上昇','コントロール（仁川）：航空路を巡航','FIR境界の前で次のコントロール（福岡FIRの担当）へ引き継ぎ','アプローチ：到着方式（STAR）で降下し、最終進入へ','タワー：着陸の許可 → グランド：スポットへ']},
  ko:{t:'위에서 본 한 편의 관제(김포→하네다의 예)',dep:'출발 공항',arr:'도착 공항',z1:'관제권',z2:'접근관제구역',z3:'항로',fir:'FIR 경계',u:['딜리버리: 관제 허가(경로·고도·출발 방식·코드)','그라운드: 주기장에서 활주로까지','타워: 이륙 허가','디파처: 정해진 출발 방식(SID)으로 상승','컨트롤(인천): 항로 순항','FIR 경계 앞에서 다음 컨트롤(후쿠오카 FIR 담당)로 인계','어프로치: 도착 방식(STAR)으로 강하해 최종 접근으로','타워: 착륙 허가 → 그라운드: 주기장으로']},
  en:{t:'One flight seen from above (Gimpo to Haneda as an example)',dep:'Departure airport',arr:'Arrival airport',z1:'Control zone',z2:'Terminal area',z3:'Airway',fir:'FIR boundary',u:['Delivery: the ATC clearance (route, level, departure procedure, squawk)','Ground: from the stand to the runway','Tower: take-off clearance','Departure: climb on the standard instrument departure (SID)','Control (Incheon): cruise on the airway','Before the FIR boundary, handed to the next Control (the Fukuoka FIR unit)','Approach: descend on the arrival (STAR) to final approach','Tower: landing clearance, then Ground to the stand']}})[l];
 if(!W)return F.atcb_plan('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,52,600,262,'#DCEEFB',14),A=[104,222],B=[536,212];
 [A,B].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="70" fill="#BFD9F2" stroke="#7FA8D6" stroke-dasharray="6 5"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="28" fill="#9CC4EA" stroke="#2F6FD6"/><rect x="'+(p[0]-14)+'" y="'+(p[1]-2.5)+'" width="28" height="5" rx="2" fill="#243447"/>'});
 s+='<line x1="330" y1="56" x2="330" y2="310" stroke="#D64545" stroke-width="2.5" stroke-dasharray="9 6"/>'+LB(330,300,W.fir,11,'#fff','middle','#D64545');
 s+=LB(A[0],A[1]+54,W.z1,10.5,'#0f3558','middle','#fff')+LB(A[0]+20,A[1]-80,W.z2,10.5,'#0f3558','middle','#fff')+LB(250,80,W.z3,10.5,'#0f3558','middle','#fff');
 s+=LB(A[0],A[1]+36,W.dep,11,'#fff','middle','#0f3558')+LB(B[0],B[1]+36,W.arr,11,'#fff','middle','#0f3558');
 var P='M84 222 L120 222 C150 222 160 190 175 165 C195 125 210 100 250 100 L420 100 C470 100 495 130 510 160 C522 186 510 212 528 212 L556 212';
 s+='<path d="'+P+'" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="8 6"/>';
 s+='<g>'+plane('#fff')+'<animateMotion dur="16s" repeatCount="indefinite" rotate="auto" path="'+P+'"/></g>';
 var pos=[[70,200],[104,196],[146,206],[180,140],[280,124],[354,124],[500,136],[570,190]];
 pos.forEach(function(p,i){s+='<g>'+BADGE(p[0],p[1],i+1,11)+'<animate attributeName="opacity" '+SEG(i,8,'.35','1')+' dur="16s" repeatCount="indefinite"/></g>'});
 var L=LIST(W.u,326,600,11);
 return svg(640,L.y+8,s+L.s)},

/* 4 空域の断面：韓国（仁川の例）・日本（一般の管制圏の例）・米国（クラスBの例） */
atcb_class3:function(l){
 var W=({ja:{t:'空港のまわりの空域を横から見る（3か国の例）',p:[['韓国（仁川・金浦・済州のクラスB）',[['B','10,000ft','地表〜10,000ft（5〜20NMは段々に）'],['E','','その外側の管制空域'],['A','FL200超','航空路はFL200超〜FL600がクラスA']]],
   ['日本（一般的な空港）',[['D','3,000ft','管制圏（クラスD）：半径約5NM・高さ約3,000ftが多い'],['E','','進入管制区はクラスE'],['','','羽田・成田などの周りには、有視界飛行も許可が要る特別管制空域がある']]],
   ['米国（いちばん混む空港のクラスB）',[['B','10,000ft','地表〜10,000ft MSL（逆さのウェディングケーキ形）'],['E','','A〜D以外の管制空域（米国の大部分）'],['A','18,000ft〜','18,000ft〜FL600はクラスA（計器飛行のみ）']]]],note:'空域のクラス・形・高さは国や空港ごとに違う。必ず各国のAIP（ENR 1.4）と航空図で確かめる'},
  ko:{t:'공항 주변 공역을 옆에서 보기(3개국의 예)',p:[['한국(인천·김포·제주의 B등급)',[['B','10,000ft','지표~10,000ft(5~20NM은 계단 모양)'],['E','','그 바깥의 관제 공역'],['A','FL200 초과','항로는 FL200 초과~FL600이 A등급']]],
   ['일본(일반적인 공항)',[['D','3,000ft','관제권(D등급): 반경 약 5NM·높이 약 3,000ft가 많다'],['E','','진입관제구는 E등급'],['','','하네다·나리타 등 주변에는 시계비행도 허가가 필요한 특별관제공역이 있다']]],
   ['미국(가장 붐비는 공항의 B등급)',[['B','10,000ft','지표~10,000ft MSL(거꾸로 놓은 웨딩케이크 모양)'],['E','','A~D 이외의 관제 공역(미국 대부분)'],['A','18,000ft~','18,000ft~FL600은 A등급(계기비행만)']]]],note:'공역의 등급·모양·높이는 나라와 공항마다 다르다. 반드시 각국 AIP(ENR 1.4)와 항공도로 확인한다'},
  en:{t:'Airspace around an airport, side view (three examples)',p:[['Korea (Class B at Incheon, Gimpo, Jeju)',[['B','10,000 ft','Surface to 10,000 ft, stepped out to 20 NM'],['E','','Other controlled airspace outside it'],['A','Above FL200','Airways above FL200 up to FL600 are Class A']]],
   ['Japan (a typical airport)',[['D','3,000 ft','Control zone (Class D): often about 5 NM radius and 3,000 ft high'],['E','','Approach control areas are Class E'],['','','Around Haneda, Narita and others, special control airspace needs clearance even for VFR']]],
   ['USA (Class B at the busiest airports)',[['B','10,000 ft','Surface to 10,000 ft MSL (an upside-down wedding cake)'],['E','','Controlled airspace other than A to D (most of the US)'],['A','18,000 ft+','18,000 ft to FL600 is Class A (IFR only)']]]],note:'Airspace classes, shapes and heights differ by country and airport. Always check each country’s AIP (ENR 1.4) and charts'}})[l];
 if(!W)return F.atcb_class3('ja');
 setK(1);var nar=NARROW(),cl={A:'#5A3D6B',B:'#2F6FD6',C:'#1F7A6E',D:'#2E8B57',E:'#7FA8D6'};
 function panel(x0,y0,w,k){var P=W.p[k],g=R(x0,y0,w,30,'#0f3558',10)+tx(x0+w/2,y0+20,P[0],11.5,'#fff',900),by=y0+38,bh=130,gx=x0+8,gw=w-16,cx=gx+gw/2;
  g+=R(gx,by,gw,bh,'#E8F2FB',8)+R(gx,by+bh-10,gw,10,'#9CC98B',0);
  if(k===1){g+=R(cx-gw*0.18,by+bh-58,gw*0.36,48,cl.D,4,' opacity=".85"')+tx(cx,by+bh-28,'D',14,'#fff',900)+R(gx+4,by+30,gw-8,bh-90,cl.E,4,' opacity=".55"')+tx(gx+20,by+52,'E',14,'#fff',900,'start')}
  else{var top=by+(k===2?54:40);g+=R(gx+4,by+4,gw-8,top-by-8,cl.A,4,' opacity=".85"')+tx(gx+20,by+(top-by)/2+6,'A',14,'#fff',900,'start')+LB(gx+gw-10,by+(top-by)/2+5,P[1][2][1],10.5,'#0f3558','end','#fff');
   var st=[[0.12,by+bh-10],[0.26,by+bh-38],[0.40,by+bh-62]];st.forEach(function(q,i){g+=R(cx-gw*q[0],top+4,gw*q[0]*2,q[1]-top-4,cl.B,3,' opacity="'+(0.95-i*0.22).toFixed(2)+'"')});
   g+=tx(cx,top+26,'B',14,'#fff',900)+LB(cx,top+46,P[1][0][1],10.5,'#0f3558','middle','#fff')+tx(gx+18,by+bh-20,'E',13,'#2F4A66',900,'start')}
  g+='<rect x="'+(cx-10)+'" y="'+(by+bh-12)+'" width="20" height="4" fill="#243447"/>';
  var pp='M'+(gx+gw-10)+' '+(by+22)+' L'+(cx+gw*0.25)+' '+(by+bh-60)+' L'+(cx+12)+' '+(by+bh-14);
  g+='<g>'+planeS('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="'+pp+'"/></g>';
  var y=by+bh+8;P[1].forEach(function(r){var t=(r[0]?r[0]+'：':'')+r[2],nb=NOTEBOX(x0,y,w,t,10.5);g+=nb.s;y+=nb.h+4});
  return {s:g,h:y-y0}}
 var s='',HH,vw;
 if(nar){vw=580;var y=56;for(var k=0;k<3;k++){var p=panel(20,y,540,k);s+=p.s;y+=p.h+12}}
 else{vw=900;var y=56,ps=[0,1,2].map(function(k){return panel(20+k*290,56,270,k)});s=ps.map(function(p){return p.s}).join('');y=56+Math.max(ps[0].h,ps[1].h,ps[2].h)+12}
 var nb=NOTEBOX(20,y,vw-40,W.note,11,G);s+=nb.s;HH=y+nb.h+10;
 return svg(vw,HH,TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s)},

/* 5 有視界飛行（VFR）と計器飛行（IFR）：見て避ける／管制が間隔を付ける */
atcb_ifrvfr:function(l){
 var W=({ja:{t:'有視界飛行（VFR）と計器飛行（IFR）',v:'有視界飛行（VFR）',i:'計器飛行（IFR）',dv:'雲から離れ、外を見てほかの機を避ける。気象の条件（視程・雲からの距離）を満たすときだけ',di:'雲の中でも計器と管制の指示で飛ぶ。管制空域では管制官が間隔を付ける。旅客機は原則IFR',eye:'見て避ける',atc:'管制が間隔'},
  ko:{t:'시계비행(VFR)과 계기비행(IFR)',v:'시계비행(VFR)',i:'계기비행(IFR)',dv:'구름에서 떨어져 밖을 보며 다른 항공기를 피한다. 기상 조건(시정·구름과의 거리)을 만족할 때만',di:'구름 속에서도 계기와 관제 지시로 난다. 관제 공역에서는 관제사가 간격을 정한다. 여객기는 원칙적으로 IFR',eye:'보고 피한다',atc:'관제가 간격'},
  en:{t:'Visual flight (VFR) and instrument flight (IFR)',v:'Visual flight rules (VFR)',i:'Instrument flight rules (IFR)',dv:'Stay clear of cloud and avoid other traffic by looking out; only allowed when visibility and cloud clearance minima are met',di:'Fly in cloud by instruments and ATC instructions; in controlled airspace the controller separates traffic. Airliners fly IFR as a rule',eye:'See and avoid',atc:'ATC separation'}})[l];
 if(!W)return F.atcb_ifrvfr('ja');
 setK(1);var nar=NARROW();
 function cloud(x,y,sc,c){return '<g transform="translate('+x+' '+y+') scale('+sc+')" fill="'+(c||'#fff')+'"><ellipse cx="0" cy="0" rx="26" ry="12"/><ellipse cx="18" cy="-8" rx="18" ry="14"/><ellipse cx="38" cy="0" rx="22" ry="11"/></g>'}
 function panel(x0,y0,w,k){var g=R(x0,y0,w,180,k?'#8C99A8':'#7EC3F0',14)+tx(x0+16,y0+26,k?W.i:W.v,13,'#fff',900,'start');
  if(!k){g+='<circle cx="'+(x0+w-36)+'" cy="'+(y0+40)+'" r="16" fill="#FFE08A"/>'+cloud(x0+w*0.42,y0+86,1.1)+cloud(x0+w*0.2,y0+140,0.8);
   var p1='M'+(x0+20)+' '+(y0+60)+' L'+(x0+w*0.34)+' '+(y0+60)+' Q'+(x0+w*0.6)+' '+(y0+56)+' '+(x0+w*0.7)+' '+(y0+110)+' L'+(x0+w-20)+' '+(y0+130);
   g+='<path d="'+p1+'" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 5"/><g>'+plane('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="'+p1+'"/></g>';
   g+='<g>'+plane('#FFD23F')+'<animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="M'+(x0+w-20)+' '+(y0+76)+' L'+(x0+30)+' '+(y0+120)+'"/></g>'+LB(x0+w/2,y0+168,W.eye,11,'#0f3558','middle','#fff')}
  else{for(var i=0;i<5;i++)g+=cloud(x0+18+i*(w/5),y0+70+(i%2)*40,1.05,'#C3CBD4');
   g+='<rect x="'+(x0+w-46)+'" y="'+(y0+120)+'" width="10" height="44" fill="#243447"/><rect x="'+(x0+w-52)+'" y="'+(y0+110)+'" width="22" height="12" rx="3" fill="#243447"/>';
   [0,1,2].forEach(function(j){g+='<circle cx="'+(x0+w-41)+'" cy="'+(y0+112)+'" r="10" fill="none" stroke="#fff" stroke-width="2"><animate attributeName="r" values="10;70" dur="3s" begin="'+j+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="3s" begin="'+j+'s" repeatCount="indefinite"/></circle>'});
   g+='<g>'+plane('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" path="M'+(x0+20)+' '+(y0+62)+' L'+(x0+w-70)+' '+(y0+62)+'"/></g><g>'+plane('#FFD23F')+'<animateMotion dur="7s" repeatCount="indefinite" path="M'+(x0+20)+' '+(y0+104)+' L'+(x0+w-70)+' '+(y0+104)+'"/></g>';
   g+=ARW(x0+w*0.3,y0+70,x0+w*0.3,y0+96,'#FFD23F',2.5)+ARW(x0+w*0.3,y0+96,x0+w*0.3,y0+70,'#FFD23F',2.5)+LB(x0+w/2,y0+168,W.atc,11,'#0f3558','middle','#fff')}
  var nb=NOTEBOX(x0,y0+188,w,k?W.di:W.dv,11);g+=nb.s;return {s:g,h:188+nb.h}}
 var s='',HH,vw;
 if(nar){vw=580;var y=56;for(var k=0;k<2;k++){var p=panel(20,y,540,k);s+=p.s;y+=p.h+12}HH=y+4}
 else{vw=760;var a=panel(20,56,350,0),b=panel(390,56,350,1);s=a.s+b.s;HH=56+Math.max(a.h,b.h)+12}
 return svg(vw,HH,TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s)},

/* 6 RECAT：区分を細かくして、必要以上の間隔を詰める（韓国の例の数字） */
atcb_recat:function(l){
 var W=({ja:{t:'区分を細かくすると、間隔を詰められる（RECAT）',old:'従来',neu:'RECAT',pairs:[['A380の後ろの大型機','6','4'],['大型機の後ろの大型機','4','3'],['大型機の後ろの中型機','5','4'],['中大型機の後ろの中型機','5','3']],fin:'最終進入の列（同じ長さ）',src:'数字（NM）は韓国の発表（ICAO APAC、2023年）の例。区分の名前・間隔は国と空港で違う'},
  ko:{t:'구분을 세분하면 간격을 줄일 수 있다(RECAT)',old:'기존',neu:'RECAT',pairs:[['A380 뒤의 대형기','6','4'],['대형기 뒤의 대형기','4','3'],['대형기 뒤의 중형기','5','4'],['중대형기 뒤의 중형기','5','3']],fin:'최종 접근의 줄(같은 길이)',src:'숫자(NM)는 한국 발표(ICAO APAC, 2023년)의 예. 구분 이름·간격은 나라와 공항마다 다르다'},
  en:{t:'Finer categories allow tighter spacing (RECAT)',old:'Legacy',neu:'RECAT',pairs:[['Large jet behind an A380','6','4'],['Large jet behind a large jet','4','3'],['Medium jet behind a large jet','5','4'],['Medium jet behind a lower-heavy jet','5','3']],fin:'Aircraft on final (same length of approach)',src:'Figures (NM) are examples from Korea’s presentation to ICAO APAC (2023). Category names and minima differ by country and airport'}})[l];
 if(!W)return F.atcb_recat('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=56,sc=48,x0=250;
 s+=R(20,y,600,24,'#243447',6);for(var q=0;q<=6;q++)s+=tx(x0+q*sc,y+17,String(q),10.5,'#fff',800);s+=tx(x0+6*sc+22,y+17,'NM',10.5,'#fff',800,'start');y+=30;
 W.pairs.forEach(function(p,i){var o=+p[1],n=+p[2],h=34,n1=LI(p[0],11,210).length;h=Math.max(h,n1*FS(11)*1.3+10);
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',6)+WR(32,y+h/2+FS(11)*0.3,p[0],11,D,800,210,'start');
  s+='<rect x="'+x0+'" y="'+(y+h/2-11)+'" width="'+(o*sc)+'" height="9" rx="3" fill="#B9C3CF"/>'+tx(x0+o*sc+6,y+h/2-3,W.old+' '+o,10.5,G,800,'start');
  s+='<rect x="'+x0+'" y="'+(y+h/2+2)+'" width="'+(o*sc)+'" height="9" rx="3" fill="#2F6FD6"><animate attributeName="width" values="'+(o*sc)+';'+(o*sc)+';'+(n*sc)+';'+(n*sc)+'" keyTimes="0;.25;.45;1" dur="6s" repeatCount="indefinite"/></rect>';
  s+='<g opacity="0">'+tx(x0+n*sc+6,y+h/2+11,W.neu+' '+n,10.5,'#2F6FD6',900,'start')+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.42;.48;1" dur="6s" repeatCount="indefinite"/></g>';
  y+=h+4});
 y+=10;s+=tx(320,y+12,W.fin,12,'#0f3558',900);y+=22;
 function lane(yy,gap,lab,col){var g=R(20,yy,600,46,'#E8F2FB',8)+tx(34,yy+28,lab,11,col,900,'start')+'<rect x="130" y="'+(yy+21)+'" width="470" height="4" fill="#9FB0C2"/>';
  for(var x=596-gap;x>136;x-=gap)g+='<g transform="translate('+x+' '+(yy+23)+') scale(.9)">'+plane(col==='#2F6FD6'?'#fff':'#E8EDF2')+'<animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;'+gap+' 0" dur="3s" repeatCount="indefinite"/></g>';
  return g}
 s+=lane(y,96,W.old,G);y+=52;s+=lane(y,68,W.neu,'#2F6FD6');y+=56;
 var nb=NOTEBOX(20,y,600,W.src,10.5,G);s+=nb.s;y+=nb.h+10;
 return svg(640,y,s)},
/* 7 監視のしくみ：一次レーダー・二次レーダー・ADS-B・衛星のADS-B */
atcb_surv:function(l){
 var W=({ja:{t:'飛行機の位置をどう知るか（監視の4つの方法）',p:[['一次レーダー（PSR）','電波の反射で位置を知る。機体の協力がいらないが、高度や便名は分からない'],['二次レーダー（SSR・モードS）','地上から質問し、機体のトランスポンダーが答える。高度・コード・便名が分かる'],['ADS-B','機体がGPSで知った自分の位置を、自分から放送する。地上局の設備が小さく、更新が速い'],['衛星のADS-B','人工衛星がADS-Bを受け取る。地上局を置けない洋上・極地でも位置が分かる']]},
  ko:{t:'항공기의 위치를 어떻게 아는가(감시의 네 가지 방법)',p:[['1차 레이더(PSR)','전파의 반사로 위치를 안다. 기체의 협력이 필요 없지만 고도와 편명은 모른다'],['2차 레이더(SSR·모드 S)','지상에서 질문하고 기체의 트랜스폰더가 답한다. 고도·코드·편명을 안다'],['ADS-B','기체가 GPS로 안 자기 위치를 스스로 방송한다. 지상국 설비가 작고 갱신이 빠르다'],['위성 ADS-B','인공위성이 ADS-B를 받는다. 지상국을 둘 수 없는 해양·극지에서도 위치를 안다']]},
  en:{t:'How ATC knows where aircraft are (four surveillance methods)',p:[['Primary radar (PSR)','Finds aircraft by reflected radio waves; needs nothing from the aircraft, but gives no altitude or callsign'],['Secondary radar (SSR, Mode S)','The ground station interrogates and the aircraft’s transponder replies with altitude, code and identity'],['ADS-B','The aircraft broadcasts its own GPS position; small ground stations and fast updates'],['Space-based ADS-B','Satellites receive ADS-B, so aircraft can be tracked over oceans and polar regions with no ground stations']]}})[l];
 if(!W)return F.atcb_surv('ja');
 setK(1);var nar=NARROW();
 function ant(x,y){return '<rect x="'+(x-3)+'" y="'+(y-30)+'" width="6" height="30" fill="#243447"/><path d="M'+(x-14)+' '+(y-34)+' Q'+x+' '+(y-48)+' '+(x+14)+' '+(y-34)+'" fill="none" stroke="#243447" stroke-width="4"/>'}
 function ring(x,y,r0,r1,col,dur,beg){return '<circle cx="'+x+'" cy="'+y+'" r="'+r0+'" fill="none" stroke="'+col+'" stroke-width="2"><animate attributeName="r" values="'+r0+';'+r1+'" dur="'+dur+'" begin="'+(beg||0)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="'+dur+'" begin="'+(beg||0)+'s" repeatCount="indefinite"/></circle>'}
 function panel(x0,y0,w,k){var P=W.p[k],g=R(x0,y0,w,150,'#0E2238',14)+tx(x0+14,y0+24,P[0],12.5,'#fff',900,'start'),gy=y0+138,px=x0+w*0.62,py=y0+62;
  g+=R(x0+8,gy-6,w-16,8,'#2E6B5E',3);
  g+='<g transform="translate('+px+' '+py+')">'+plane('#fff')+'</g>';
  if(k===0){g+=ant(x0+50,gy-6);g+=ring(x0+50,gy-40,6,120,'#7FD3FF','2.4s');g+='<g opacity="0"><circle cx="'+px+'" cy="'+py+'" r="22" fill="none" stroke="#FFD23F" stroke-width="2"/><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.5;.6;1" dur="2.4s" repeatCount="indefinite"/></g>'}
  if(k===1){g+=ant(x0+50,gy-6);g+='<path d="M'+(x0+66)+' '+(gy-44)+' L'+(px-24)+' '+(py+8)+'" stroke="#7FD3FF" stroke-width="2.5" stroke-dasharray="6 6"><animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite"/></path><path d="M'+(px-22)+' '+(py+16)+' L'+(x0+70)+' '+(gy-36)+'" stroke="#FFD23F" stroke-width="2.5" stroke-dasharray="6 6"><animate attributeName="stroke-dashoffset" values="0;24" dur="1s" repeatCount="indefinite"/></path>'+LB(px,py+36,'VELA301 · FL120',10.5,'#0E2238','middle','#FFD23F')}
  if(k===2){g+=ring(px,py,14,90,'#FFD23F','2s')+ring(px,py,14,90,'#FFD23F','2s',1)+'<rect x="'+(x0+40)+'" y="'+(gy-22)+'" width="16" height="16" fill="#243447"/>'+LB(px,py+36,'GPS → ADS-B',10.5,'#0E2238','middle','#FFD23F')}
  if(k===3){var sx=x0+w*0.25,sy=y0+50;g+='<g><rect x="'+(sx-14)+'" y="'+(sy-5)+'" width="28" height="10" fill="#C9D3DD"/><rect x="'+(sx-40)+'" y="'+(sy-4)+'" width="22" height="8" fill="#2F6FD6"/><rect x="'+(sx+18)+'" y="'+(sy-4)+'" width="22" height="8" fill="#2F6FD6"/><animateTransform attributeName="transform" type="translate" values="-20 0;20 0;-20 0" dur="8s" repeatCount="indefinite"/></g>';
   g+='<path d="M'+(px-14)+' '+(py-8)+' L'+(sx+6)+' '+(sy+10)+'" stroke="#FFD23F" stroke-width="2.5" stroke-dasharray="6 6"><animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite"/></path>';for(var i=0;i<4;i++)g+='<path d="M'+(x0+16+i*40)+' '+(gy-14)+' q10 -6 20 0 t20 0" fill="none" stroke="#5FA3D9" stroke-width="2"/>'}
  var nb=NOTEBOX(x0,y0+158,w,P[1],11);g+=nb.s;return {s:g,h:158+nb.h}}
 var s='',HH,vw;
 if(nar){vw=580;var y=56;for(var k=0;k<4;k++){var p=panel(20,y,540,k);s+=p.s;y+=p.h+12}HH=y+4}
 else{vw=900;var y=56;for(var row=0;row<2;row++){var a=panel(20,y,420,row*2),b=panel(460,y,420,row*2+1);s+=a.s+b.s;y+=Math.max(a.h,b.h)+14}HH=y+2}
 return svg(vw,HH,TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s)},

/* 8 ILSのまっすぐな進入と、RNP ARの曲がる進入 */
atcb_pbn:function(l){
 var W=({ja:{t:'まっすぐ入るILSと、曲がって入るRNP AR',ils:'ILS：地上の電波でまっすぐ（約10NM以上の直線）',rnp:'RNP AR：衛星の航法で、山や騒音の多い地区をよけて曲がりながら入る',mt:'山',city:'市街地',rw:'滑走路',u:['ILSは滑走路の延長線上に長い直線が要る。山や海、まちがあると置きにくい','RNP ARは機体の航法の性能と乗員の訓練の承認が要る（AR＝特別な承認）','曲がる部分（RF）で、短く静かな経路にできる。悪天候でも降りられる空港が増える']},
  ko:{t:'곧게 들어오는 ILS와 휘어 들어오는 RNP AR',ils:'ILS: 지상 전파로 곧게(약 10NM 이상의 직선)',rnp:'RNP AR: 위성 항법으로 산이나 소음이 많은 지역을 피해 휘면서 들어온다',mt:'산',city:'시가지',rw:'활주로',u:['ILS는 활주로 연장선 위에 긴 직선이 필요하다. 산·바다·도시가 있으면 두기 어렵다','RNP AR은 기체의 항법 성능과 승무원 훈련 승인이 필요하다(AR=특별 승인)','휘는 구간(RF)으로 짧고 조용한 경로를 만들 수 있다. 악천후에도 내릴 수 있는 공항이 늘어난다']},
  en:{t:'Straight-in ILS and curved RNP AR approaches',ils:'ILS: ground radio beams, straight in (a long straight of about 10 NM or more)',rnp:'RNP AR: satellite navigation, curving around terrain and noise-sensitive areas',mt:'Mountain',city:'City',rw:'Runway',u:['An ILS needs a long straight on the extended centreline; terrain, sea or towns can make that hard','RNP AR needs approval for both aircraft navigation performance and crew training (AR = authorisation required)','Curved segments (RF legs) allow short, quieter paths, so more airports can be used in bad weather']}})[l];
 if(!W)return F.atcb_pbn('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,52,600,250,'#E8F2FB',14);
 s+='<rect x="480" y="160" width="110" height="10" rx="3" fill="#243447"/>'+tx(535,190,W.rw,11,'#243447',900);
 s+='<path d="M120 300 L170 210 L210 260 L250 190 L300 300 Z" fill="#9C8466" opacity=".8"/>'+tx(210,288,W.mt,11,'#fff',900);
 s+='<rect x="330" y="70" width="90" height="56" rx="6" fill="#C9B79C" opacity=".8"/>'+tx(375,103,W.city,11,'#5a4a34',900);
 var PI='M40 165 L480 165',PR='M90 70 C170 60 260 140 300 150 C330 158 380 165 480 165';
 s+='<path d="'+PI+'" fill="none" stroke="#9FB0C2" stroke-width="3" stroke-dasharray="8 6"/><path d="'+PR+'" fill="none" stroke="#2F6FD6" stroke-width="3.5"/>';
 s+='<g>'+plane('#E8EDF2')+'<animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="'+PI+'"/></g><g>'+plane('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="'+PR+'"/></g>';
 s+=LBW(150,230-90,W.ils,10.5,G,'middle','#fff',200)+LBW(470,240,W.rnp,10.5,'#2F6FD6','middle','#fff',260);
 var L=LIST(W.u,312,600,11);
 return svg(640,L.y+8,s+L.s)},

/* 9 GBAS（地上型）とSBAS（静止衛星型）の補強 */
atcb_gbas:function(l){
 var W=({ja:{t:'GPSの誤差を直す2つのしくみ',g:'GBAS（地上型）',sb:'SBAS（衛星型）',dg:'空港の地上局が誤差を直し、1式で複数の滑走路・進入方式にILSなみの精度。進入の経路はデータで送る',ds:'静止衛星から国全体に補正を流す。ILSのない地方空港でも、垂直の誘導つきの進入ができる',gps:'GPS衛星',sta:'GBAS地上局'},
  ko:{t:'GPS 오차를 고치는 두 가지 방식',g:'GBAS(지상형)',sb:'SBAS(위성형)',dg:'공항 지상국이 오차를 고쳐, 한 세트로 여러 활주로·접근 방식에 ILS 수준의 정밀도. 접근 경로는 데이터로 보낸다',ds:'정지위성에서 나라 전체로 보정을 보낸다. ILS가 없는 지방 공항에서도 수직 유도가 있는 접근이 가능하다',gps:'GPS 위성',sta:'GBAS 지상국'},
  en:{t:'Two ways to correct GPS errors',g:'GBAS (ground-based)',sb:'SBAS (satellite-based)',dg:'An airport ground station corrects errors; one installation serves several runways and approaches with ILS-like precision, sending the approach path as data',ds:'Geostationary satellites broadcast corrections over a whole country, allowing approaches with vertical guidance at regional airports without ILS',gps:'GPS satellites',sta:'GBAS ground station'}})[l];
 if(!W)return F.atcb_gbas('ja');
 setK(1);var nar=NARROW();
 function sat(x,y,c){return '<g transform="translate('+x+' '+y+')"><rect x="-8" y="-5" width="16" height="10" fill="#C9D3DD"/><rect x="-26" y="-4" width="16" height="8" fill="'+(c||'#2F6FD6')+'"/><rect x="10" y="-4" width="16" height="8" fill="'+(c||'#2F6FD6')+'"/></g>'}
 function panel(x0,y0,w,k){var g=R(x0,y0,w,190,'#0E2238',14)+tx(x0+14,y0+24,k?W.sb:W.g,13,'#fff',900,'start'),gy=y0+176;
  g+=R(x0+8,gy-8,w-16,10,'#2E6B5E',3);
  [0.25,0.55,0.85].forEach(function(f,i){g+=sat(x0+w*f,y0+46+(i%2)*10)});g+=tx(x0+w*0.55,y0+78,W.gps,10.5,'#A9C7E8',800);
  if(!k){var rx=[x0+w*0.25,x0+w*0.62];rx.forEach(function(x){g+='<rect x="'+(x-40)+'" y="'+(gy-14)+'" width="80" height="6" fill="#243447"/>'});
   var st=x0+w*0.44;g+='<rect x="'+(st-6)+'" y="'+(gy-36)+'" width="12" height="26" fill="#FFD23F"/>'+tx(st,gy-42,W.sta,10.5,'#FFD23F',800);
   [0,1,2].forEach(function(j){g+='<circle cx="'+st+'" cy="'+(gy-30)+'" r="8" fill="none" stroke="#FFD23F" stroke-width="2"><animate attributeName="r" values="8;'+(w*0.45).toFixed(0)+'" dur="3s" begin="'+j+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="3s" begin="'+j+'s" repeatCount="indefinite"/></circle>'});
   g+='<g>'+plane('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="M'+(x0+20)+' '+(y0+100)+' L'+(rx[0]-30)+' '+(gy-14)+'"/></g><g>'+plane('#fff')+'<animateMotion dur="7s" begin="-3s" repeatCount="indefinite" rotate="auto" path="M'+(x0+w-20)+' '+(y0+96)+' L'+(rx[1]+30)+' '+(gy-14)+'"/></g>'}
  else{var gx=x0+w*0.5,gyy=y0+108;g+=sat(gx,gyy,'#FFD23F')+'<path d="M'+(gx-120)+' '+(gy-10)+' L'+gx+' '+(gyy+8)+' L'+(gx+120)+' '+(gy-10)+' Z" fill="#FFD23F" opacity=".12"><animate attributeName="opacity" values=".06;.22;.06" dur="2.5s" repeatCount="indefinite"/></path>';
   [0.18,0.5,0.82].forEach(function(f){g+='<rect x="'+(x0+w*f-22)+'" y="'+(gy-14)+'" width="44" height="5" fill="#243447"/>'})}
  var nb=NOTEBOX(x0,y0+198,w,k?W.ds:W.dg,11);g+=nb.s;return {s:g,h:198+nb.h}}
 var s='',HH,vw;
 if(nar){vw=580;var y=56;for(var k=0;k<2;k++){var p=panel(20,y,540,k);s+=p.s;y+=p.h+12}HH=y+4}
 else{vw=860;var a=panel(20,56,400,0),b=panel(440,56,400,1);s=a.s+b.s;HH=56+Math.max(a.h,b.h)+12}
 return svg(vw,HH,TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s)},

/* 10 声の交信とデータ通信（CPDLC） */
atcb_cpdlc:function(l){
 var W=({ja:{t:'声の交信と、文字で送るデータ通信（CPDLC）',v:'声（無線）',d:'データ通信（CPDLC）',vu:['周波数が混むと、言いたいことを言うまで待つ','聞き違い・言い間違いが起きうる','英語の発音・雑音の影響を受ける'],du:['決まった文を画面で送り、ボタンで答える（WILCOなど）','記録が残り、FMSに経路を入れられるものもある','洋上・航空路・空港の出発の許可（DCL）で広がる'],up:'CLIMB TO FL350',ans:'WILCO'},
  ko:{t:'목소리 교신과 문자로 보내는 데이터 통신(CPDLC)',v:'목소리(무선)',d:'데이터 통신(CPDLC)',vu:['주파수가 붐비면 말할 차례까지 기다린다','잘못 듣기·잘못 말하기가 생길 수 있다','영어 발음·잡음의 영향을 받는다'],du:['정해진 문장을 화면으로 보내고 버튼으로 답한다(WILCO 등)','기록이 남고 FMS에 경로를 넣을 수 있는 것도 있다','해양·항로·공항 출발 허가(DCL)에서 확대되고 있다'],up:'CLIMB TO FL350',ans:'WILCO'},
  en:{t:'Voice and text data link (CPDLC)',v:'Voice (radio)',d:'Data link (CPDLC)',vu:['When the frequency is busy, you wait your turn to speak','Mishearing and misspeaking can happen','Affected by accents and noise'],du:['Set messages sent on screen and answered with a button (WILCO and so on)','A record is kept; some routes can be loaded straight into the FMS','Spreading in oceanic and en-route airspace and for departure clearances (DCL)'],up:'CLIMB TO FL350',ans:'WILCO'}})[l];
 if(!W)return F.atcb_cpdlc('ja');
 setK(1);var nar=NARROW();
 function panel(x0,y0,w,k){var g=R(x0,y0,w,150,k?'#123A2E':'#0E2238',14)+tx(x0+14,y0+24,k?W.d:W.v,13,'#fff',900,'start');
  if(!k){for(var i=0;i<3;i++){var yy=y0+50+i*30,lft=i%2===0;g+='<g opacity="0"><rect x="'+(lft?x0+20:x0+w-170)+'" y="'+yy+'" width="150" height="22" rx="11" fill="'+(lft?'#7FD3FF':'#FFD23F')+'"/>'+'<path d="M'+(lft?x0+36:x0+w-150)+' '+(yy+11)+' q6 -6 12 0 t12 0 t12 0 t12 0" fill="none" stroke="#0E2238" stroke-width="2"/><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+(i*0.22).toFixed(2)+';'+(i*0.22+0.05).toFixed(2)+';.9;1" dur="6s" repeatCount="indefinite"/></g>'}}
  else{var sx=x0+w/2-90,sy=y0+40;g+=R(sx,sy,180,96,'#0B1C2C',8,' stroke="#3DDC97" stroke-width="2"')+tx(sx+90,sy+28,W.up,12,'#3DDC97',900);
   g+='<g opacity="0">'+R(sx+20,sy+52,64,28,'#3DDC97',6)+tx(sx+52,sy+71,W.ans,11,'#0B1C2C',900)+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.4;.45;.9;1" dur="6s" repeatCount="indefinite"/></g>'+R(sx+96,sy+52,64,28,'#24506B',6)+tx(sx+128,sy+71,'UNABLE',11,'#9FB0C2',800)}
  var y=y0+158;(k?W.du:W.vu).forEach(function(t){var nb=NOTEBOX(x0,y,w,(k?'✔ ':'△ ')+t,10.5);g+=nb.s;y+=nb.h+4});return {s:g,h:y-y0}}
 var s='',HH,vw;
 if(nar){vw=580;var y=56;for(var k=0;k<2;k++){var p=panel(20,y,540,k);s+=p.s;y+=p.h+12}HH=y+4}
 else{vw=860;var a=panel(20,56,400,0),b=panel(440,56,400,1);s=a.s+b.s;HH=56+Math.max(a.h,b.h)+12}
 return svg(vw,HH,TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s)}
,
/* 11 交通流管理：需要が容量を超える時間の便を、出発前に地上で待たせて平らにする */
atcb_atfm:function(l){
 var W=({ja:{t:'空で待たせず、地上で待たせる（交通流管理）',cap:'容量（1時間に着陸できる数）',h:'時刻',b4:'調整前：容量を超える時間は空で待機（燃料・遅れが増える）',af:'調整後：出発の時刻（EDCT・CTOT）を指定して、超えた分を後の時間へ',dep:'出発空港',arr:'到着空港'},
  ko:{t:'하늘에서 기다리지 않고 지상에서 기다리게(교통흐름관리)',cap:'수용량(1시간에 착륙할 수 있는 수)',h:'시각',b4:'조정 전: 수용량을 넘는 시간은 하늘에서 대기(연료·지연 증가)',af:'조정 후: 출발 시각(EDCT·CTOT)을 지정해 넘친 만큼을 뒤 시간으로',dep:'출발 공항',arr:'도착 공항'},
  en:{t:'Wait on the ground, not in the air (traffic flow management)',cap:'Capacity (landings per hour)',h:'Hour',b4:'Before: in hours over capacity, aircraft hold in the air (more fuel and delay)',af:'After: departure times (EDCT, CTOT) are assigned so the excess moves to later hours',dep:'Departure airport',arr:'Arrival airport'}})[l];
 if(!W)return F.atcb_atfm('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,52,600,230,'#E8F2FB',14),x0=70,bw=52,gap=18,base=250,sc=5.2,cap=30,d=[24,32,40,36,22,18,14],a=[24,30,30,30,30,30,24];
 s+='<line x1="50" y1="'+(base-cap*sc)+'" x2="600" y2="'+(base-cap*sc)+'" stroke="#D64545" stroke-width="2" stroke-dasharray="8 5"/>'+LB(590,base-cap*sc-10,W.cap,10.5,'#D64545','end','#fff');
 for(var i=0;i<7;i++){var x=x0+i*(bw+gap);s+='<rect x="'+x+'" y="'+(base-d[i]*sc)+'" width="'+bw+'" height="'+(d[i]*sc)+'" rx="4" fill="#2F6FD6"><animate attributeName="height" values="'+(d[i]*sc)+';'+(d[i]*sc)+';'+(a[i]*sc)+';'+(a[i]*sc)+';'+(d[i]*sc)+'" keyTimes="0;.3;.5;.9;1" dur="8s" repeatCount="indefinite"/><animate attributeName="y" values="'+(base-d[i]*sc)+';'+(base-d[i]*sc)+';'+(base-a[i]*sc)+';'+(base-a[i]*sc)+';'+(base-d[i]*sc)+'" keyTimes="0;.3;.5;.9;1" dur="8s" repeatCount="indefinite"/></rect>';
  if(d[i]>cap)s+='<rect x="'+x+'" y="'+(base-d[i]*sc)+'" width="'+bw+'" height="'+((d[i]-cap)*sc)+'" rx="4" fill="#E08A2F"><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.3;.45;.9;1" dur="8s" repeatCount="indefinite"/></rect>';
  s+=tx(x+bw/2,base+18,(9+i)+':00',10.5,G,800)}
 s+='<g>'+LBW(320,76,W.b4,10.5,'#B4532A','middle','#fff',520)+'<animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.3;.4;.9;1" dur="8s" repeatCount="indefinite"/></g><g opacity="0">'+LBW(320,76,W.af,10.5,'#1d4d8a','middle','#fff',520)+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.4;.5;.9;1" dur="8s" repeatCount="indefinite"/></g>';
 return svg(640,296,s)},

/* 12 到着の順番づけ（AMAN）と、段々に降りる／続けて降りる（CDO） */
atcb_cdo:function(l){
 var W=({ja:{t:'到着の順番づけと、続けて降りる降下（CDO）',st:'従来：段々に降りる（水平飛行が多い）',cd:'CDO：エンジンを絞ったまま続けて降りる（燃料・騒音を減らす）',am:'AMAN：遠くから到着の時刻を計算し、速度の調整で順番をつくる',rw:'滑走路'},
  ko:{t:'도착 순서 정하기와 연속 강하(CDO)',st:'기존: 계단식으로 내려온다(수평 비행이 많다)',cd:'CDO: 엔진을 줄인 채 이어서 내려온다(연료·소음 감소)',am:'AMAN: 멀리서부터 도착 시각을 계산해 속도 조정으로 순서를 만든다',rw:'활주로'},
  en:{t:'Arrival sequencing and continuous descent (CDO)',st:'Traditional: step-down descent (lots of level flight)',cd:'CDO: continuous descent at low thrust (less fuel and noise)',am:'AMAN: calculates arrival times far out and builds the sequence with speed adjustments',rw:'Runway'}})[l];
 if(!W)return F.atcb_cdo('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,52,600,190,'#E8F2FB',14)+R(20,230,600,12,'#9CC98B',0)+'<rect x="560" y="226" width="50" height="5" fill="#243447"/>'+tx(585,220,W.rw,10.5,'#243447',900);
 var P1='M40 80 L150 80 L190 120 L300 120 L340 160 L450 160 L480 190 L520 205 L560 228',P2='M40 80 C200 90 380 150 560 228';
 s+='<path d="'+P1+'" fill="none" stroke="#9FB0C2" stroke-width="3" stroke-dasharray="8 6"/><path d="'+P2+'" fill="none" stroke="#2F6FD6" stroke-width="3.5"/>';
 s+='<g>'+planeS('#E8EDF2')+'<animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path="'+P1+'"/></g><g>'+planeS('#fff')+'<animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path="'+P2+'"/></g>';
 s+=LBW(220,150,W.st,10.5,G,'middle','#fff',230)+LBW(400,100,W.cd,10.5,'#2F6FD6','middle','#fff',260);
 var y=252;s+=R(20,y,600,120,'#0E2238',12)+tx(36,y+24,'AMAN',13,'#FFD23F',900,'start');
 var lane=y+70;s+='<line x1="40" y1="'+lane+'" x2="600" y2="'+lane+'" stroke="#3A5878" stroke-width="2"/>';
 [[70,'#7FD3FF',-30],[130,'#FFD23F',22],[210,'#9BE7A5',-18],[300,'#FFB0B0',26]].forEach(function(q,i){s+='<g><g transform="translate(0 '+q[2]+')">'+plane(q[1])+'</g><animateTransform attributeName="transform" type="translate" values="'+q[0]+' '+lane+';'+(q[0]+180)+' '+lane+';'+(q[0]+180)+' '+lane+'" keyTimes="0;.6;1" dur="8s" repeatCount="indefinite"/></g>'});
 var nb=NOTEBOX(40,y+86,560,W.am,10.5);s+=nb.s;y+=86+nb.h+8;
 return svg(640,Math.max(y,y),s)},

/* 13 軌道ベース運用（TBO）とSWIM：飛ぶ前に4次元の軌道をみんなで共有する */
atcb_tbo:function(l){
 var W=({ja:{t:'軌道ベース運用（TBO）と、情報を共有するSWIM',tube:'4次元の軌道（位置＋高度＋時刻）',n:['航空会社','管制','空港','気象','国の外の管制'],u:['出発前から到着まで、4次元の軌道をみんなで決めて共有する（FF-ICEの新しい飛行計画）','情報はSWIMという共通の仕組みで機械どうしがやり取りする','決められた時刻に地点を通る（時間の管理）ことで、待ちと燃料を減らす']},
  ko:{t:'궤적 기반 운항(TBO)과 정보를 공유하는 SWIM',tube:'4차원 궤적(위치+고도+시각)',n:['항공사','관제','공항','기상','다른 나라 관제'],u:['출발 전부터 도착까지 4차원 궤적을 함께 정하고 공유한다(FF-ICE의 새 비행계획)','정보는 SWIM이라는 공통 구조로 기계끼리 주고받는다','정해진 시각에 지점을 지나게(시간 관리) 해서 대기와 연료를 줄인다']},
  en:{t:'Trajectory-based operations (TBO) and SWIM information sharing',tube:'4D trajectory (position + altitude + time)',n:['Airline','ATC','Airport','Weather','Other ATC'],u:['From before departure to arrival, the 4D trajectory is agreed and shared by all (FF-ICE, the new flight planning)','Information is exchanged machine to machine through a common framework, SWIM','Crossing points at agreed times (time management) cuts holding and fuel']}})[l];
 if(!W)return F.atcb_tbo('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,52,600,200,'#0E2238',14);
 var P='M50 210 C160 200 200 110 320 100 C440 90 480 180 590 200';
 s+='<path d="'+P+'" fill="none" stroke="#2F6FD6" stroke-width="22" stroke-linecap="round" opacity=".35"/><path d="'+P+'" fill="none" stroke="#7FD3FF" stroke-width="2" stroke-dasharray="6 6"/>';
 [[110,'10:05'],[320,'10:52'],[530,'11:38']].forEach(function(q){s+=LB(q[0],q[0]===320?84:170,q[1],10.5,'#0E2238','middle','#FFD23F')});
 s+='<g>'+plane('#fff')+'<animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path="'+P+'"/></g>'+LB(320,236,W.tube,10.5,'#fff','middle','#2F6FD6');
 var y=264,cx=320,cy=y+64;s+=R(20,y,600,128,'#E8F2FB',12)+'<circle cx="'+cx+'" cy="'+cy+'" r="26" fill="#1F7A6E"/>'+tx(cx,cy+5,'SWIM',11.5,'#fff',900);
 W.n.forEach(function(nm,i){var ang=-Math.PI/2+i*2*Math.PI/5,nx=cx+Math.cos(ang)*200,ny=cy+Math.sin(ang)*44;s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+nx.toFixed(0)+'" y2="'+ny.toFixed(0)+'" stroke="#1F7A6E" stroke-width="2" stroke-dasharray="5 5"><animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite"/></line>'+LB(nx,ny+4,nm,10.5,'#fff','middle','#0f3558')});
 var L=LIST(W.u,y+140,600,11);
 return svg(640,L.y+8,s+L.s)},

/* 14 リモート（デジタル）タワー：空港のカメラの映像を、離れた管制室で見る */
atcb_rtwr:function(l){
 var W=({ja:{t:'リモートタワー：空港に塔がなくても管制する',ap:'空港（カメラ・センサー）',rc:'離れた管制室',u:['空港のカメラの映像を、離れた管制室の大きな画面に映す','夜や霧でも見やすく映像を処理し、機影に名札を重ねられる','1つの管制室から、交通の少ない複数の空港を受け持つこともできる']},
  ko:{t:'원격 관제탑: 공항에 탑이 없어도 관제한다',ap:'공항(카메라·센서)',rc:'떨어진 관제실',u:['공항 카메라 영상을 떨어진 관제실의 큰 화면에 비춘다','밤이나 안개에도 보기 쉽게 영상을 처리하고 항적에 이름표를 겹칠 수 있다','한 관제실에서 교통이 적은 여러 공항을 맡을 수도 있다']},
  en:{t:'Remote towers: controlling without a tower at the airport',ap:'Airport (cameras, sensors)',rc:'Remote control room',u:['Camera images from the airport are shown on large screens in a distant control room','Images are enhanced for night and fog, and aircraft can be tagged with labels','One centre can control several low-traffic airports']}})[l];
 if(!W)return F.atcb_rtwr('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,52,280,180,'#DCEEFB',14)+R(340,52,280,180,'#0E2238',14);
 s+=R(30,190,260,8,'#9CC98B',0)+'<rect x="60" y="182" width="200" height="6" fill="#243447"/>';
 [[80,150],[240,150]].forEach(function(c){s+='<rect x="'+(c[0]-3)+'" y="'+c[1]+'" width="6" height="32" fill="#243447"/><rect x="'+(c[0]-10)+'" y="'+(c[1]-10)+'" width="20" height="12" rx="3" fill="#243447"/>'});
 s+='<g>'+planeS('#fff')+'<animateMotion dur="6s" repeatCount="indefinite" path="M40 120 L150 172 L280 172"/></g>'+tx(160,76,W.ap,11.5,'#0f3558',900);
 s+='<path d="M300 140 L340 140" stroke="#FFD23F" stroke-width="3" stroke-dasharray="6 6"><animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite"/></path>';
 for(var i=0;i<3;i++)s+=R(356+i*86,96,80,52,'#24506B',4)+'<g>'+'<rect x="'+(360+i*86)+'" y="132" width="72" height="3" fill="#9CC98B"/>'+'</g>';
 s+='<g>'+planeS('#fff')+'<animateMotion dur="6s" repeatCount="indefinite" path="M360 112 L440 128 L610 128"/></g>'+LB(480,90,'VLA301',10,'#0E2238','middle','#FFD23F');
 s+='<rect x="440" y="170" width="80" height="20" rx="4" fill="#3A5878"/><circle cx="480" cy="210" r="10" fill="#C9D3DD"/>'+tx(480,76,W.rc,11.5,'#fff',900);
 var L=LIST(W.u,244,600,11);
 return svg(640,L.y+8,s+L.s)},

/* 15 空の層：ドローン（UTM）、空飛ぶクルマ（AAM）、旅客機 */
atcb_uam:function(l){
 var W=({ja:{t:'空の新しい利用者：ドローンと空飛ぶクルマ',a:'旅客機（従来の管制）',b:'空飛ぶクルマ（AAM）：決められた空の道（回廊）',c:'ドローン（UTM）：低い空をデジタルで管理',vp:'離着陸場'},
  ko:{t:'하늘의 새 이용자: 드론과 도심항공교통',a:'여객기(기존 관제)',b:'도심항공교통(AAM): 정해진 하늘길(회랑)',c:'드론(UTM): 낮은 하늘을 디지털로 관리',vp:'이착륙장'},
  en:{t:'New users of the sky: drones and air taxis',a:'Airliners (conventional ATC)',b:'Air taxis (AAM): set corridors',c:'Drones (UTM): low airspace managed digitally',vp:'Vertiport'}})[l];
 if(!W)return F.atcb_uam('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,52,600,250,'#DCEEFB',14)+R(20,290,600,12,'#9CC98B',0);
 s+=R(20,52,600,70,'#BFD9F2',14)+tx(34,74,W.a,11,'#0f3558',900,'start')+'<g>'+plane('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" path="M40 98 L600 98"/></g>';
 s+='<rect x="20" y="150" width="600" height="46" fill="#F0D9A8" opacity=".6"/>'+tx(34,145,W.b,11,'#7A5A2E',900,'start');
 s+='<g><g fill="#7A5A2E"><rect x="-14" y="-4" width="28" height="8" rx="4"/><rect x="-20" y="-9" width="10" height="2"/><rect x="10" y="-9" width="10" height="2"/></g><animateMotion dur="7s" repeatCount="indefinite" path="M80 285 L80 172 L540 172 L540 285"/></g>';
 [80,540].forEach(function(x){s+='<rect x="'+(x-22)+'" y="284" width="44" height="6" fill="#7A5A2E"/>'});s+=tx(80,282-8,W.vp,10.5,'#7A5A2E',800);
 s+=tx(34,226,W.c,11,'#1F7A6E',900,'start');
 for(var i=0;i<4;i++){var x0=180+i*90;s+='<g><g fill="#1F7A6E"><rect x="-5" y="-2" width="10" height="4"/><circle cx="-7" cy="-4" r="3"/><circle cx="7" cy="-4" r="3"/></g><animateMotion dur="'+(4+i)+'s" repeatCount="indefinite" path="M'+x0+' 262 l40 -8 l30 10 l-70 -2 z"/></g>'}
 return svg(640,316,s)},

/* 16 各地域のこれからの計画 */
atcb_road:function(l){
 var W=({ja:{t:'各地域の、これからの航空交通の計画',rows:[['ICAO','世界航空航法計画（GANP）：TBO・SWIM・FF-ICEへ'],['日本','CARATS2040：2025年に工程表を定め、2040年に向けてTBO・自動化・新しい空の利用者へ'],['韓国','第4次航空政策基本計画（2025〜2029）：航空交通データの総合管理、UAMに備えた空域の構造の見直し'],['米国','新しい管制システム（BNATCS）：125億ドルで無線・レーダー・通信・施設を2028年までに入れ替え'],['欧州','SESARとATMマスタープラン：デジタルな欧州の空、国境をまたぐ空域の運用']],y0:'2025',y1:'2040'},
  ko:{t:'각 지역의 앞으로의 항공교통 계획',rows:[['ICAO','세계항행계획(GANP): TBO·SWIM·FF-ICE로'],['일본','CARATS2040: 2025년 로드맵을 정하고 2040년을 향해 TBO·자동화·새 하늘 이용자로'],['한국','제4차 항공정책 기본계획(2025~2029): 항공교통 데이터 종합 관리, UAM에 대비한 공역 구조 조정'],['미국','새 관제 시스템(BNATCS): 125억 달러로 무선·레이더·통신·시설을 2028년까지 교체'],['유럽','SESAR와 ATM 마스터플랜: 디지털 유럽 하늘, 국경을 넘는 공역 운용']],y0:'2025',y1:'2040'},
  en:{t:'Future air traffic plans by region',rows:[['ICAO','Global Air Navigation Plan (GANP): towards TBO, SWIM and FF-ICE'],['Japan','CARATS2040: roadmap set in 2025, heading for TBO, automation and new airspace users by 2040'],['Korea','4th Aviation Policy Master Plan (2025–2029): integrated air traffic data management and airspace restructuring for UAM'],['USA','Brand New Air Traffic Control System (BNATCS): $12.5 billion to replace radios, radars, telecoms and facilities by 2028'],['Europe','SESAR and the ATM Master Plan: a Digital European Sky and cross-border airspace operations']],y0:'2025',y1:'2040'}})[l];
 if(!W)return F.atcb_road('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=56;
 s+=R(20,y,600,24,'#243447',6)+tx(160,y+17,W.y0,11,'#fff',900)+tx(590,y+17,W.y1,11,'#fff',900,'end')+ARW(190,y+12,560,y+12,'#9FB0C2',2);y+=30;
 var col=['#5A3D6B','#2F6FD6','#1F7A6E','#B4532A','#2B4F7A'];
 W.rows.forEach(function(r,i){var n=LI(r[1],11,440).length,h=Math.max(40,n*FS(11)*1.3+14);
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+R(20,y,90,h,col[i],8)+tx(65,y+h/2+5,r[0],12,'#fff',900)+WR(126,y+h/2+FS(11)*0.3,r[1],11,D,800,480,'start');
  s+='<rect x="120" y="'+(y+h-4)+'" width="0" height="3" fill="'+col[i]+'"><animate attributeName="width" values="0;490;490" keyTimes="0;.7;1" dur="6s" begin="'+(i*0.4)+'s" repeatCount="indefinite"/></rect>';y+=h+4});
 return svg(640,y+8,s)}

};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
