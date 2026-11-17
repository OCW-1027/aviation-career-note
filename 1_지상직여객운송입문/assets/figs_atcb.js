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
 var W=({ja:{t:'航空路の管制の分け方（4つの地域）',p:[['日本','高い空と低い空で分ける','福岡（高高度・洋上）','神戸（西）','東京（東）','33,500ft','2025年3月に、高い空（33,500ft以上）と洋上を福岡航空交通管制部、低い空を主に東京（東）・神戸（西）が受け持つ形がそろった'],
   ['韓国','東と西で分ける','仁川（西）','大邱（東）','','','2017年に大邱に2つ目の航空交通管制所ができ、仁川と東西で空を分けた。交通の流れの調整は航空交通統制センターなど'],
   ['米国','20あまりのセンター','ARTCC','','','','航空路の管制は20あまりの航空路管制センター（ARTCC）。空港の周りはTRACON、空港は管制塔'],
   ['欧州','国ごと＋国境をまたぐ上層','MUAC','','','24,500ft','管制は国ごとの機関。ベルギー・オランダ・ルクセンブルク・ドイツ北西部の高い空はEUROCONTROLのMUACがまとめて受け持つ']]},
  ko:{t:'항로 관제를 나누는 방식(네 지역)',p:[['일본','높은 하늘과 낮은 하늘로 나눔','후쿠오카(고고도·해양)','고베(서)','도쿄(동)','33,500ft','2025년 3월, 높은 하늘(33,500ft 이상)과 해양은 후쿠오카 항공교통관제부, 낮은 하늘은 주로 도쿄(동)·고베(서)가 맡는 구조가 완성됐다'],
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
 var W=({ja:{t:'空港のまわりの空域を横から見る（3か国の例）',p:[['韓国（仁川・金浦・済州のクラスB）',[['B','10,000ft','地表〜10,000ft（5〜20NMは段々に）'],['E','','その外側の管制空域'],['A','FL200〜','航空路はFL200〜FL600がクラスA']]],
   ['日本（一般的な空港）',[['D','3,000ft','管制圏（クラスD）：半径約5NM・高さ約3,000ftが多い'],['E','','進入管制区はクラスE'],['','','羽田・成田などの周りには、有視界飛行も許可が要る特別管制空域がある']]],
   ['米国（いちばん混む空港のクラスB）',[['B','10,000ft','地表〜10,000ft MSL（逆さのウェディングケーキ形）'],['E','','A〜D以外の管制空域（米国の大部分）'],['A','18,000ft〜','18,000ft〜FL600はクラスA（計器飛行のみ）']]]],note:'空域のクラス・形・高さは国や空港ごとに違う。必ず各国のAIP（ENR 1.4）と航空図で確かめる'},
  ko:{t:'공항 주변 공역을 옆에서 보기(3개국의 예)',p:[['한국(인천·김포·제주의 B등급)',[['B','10,000ft','지표~10,000ft(5~20NM은 계단 모양)'],['E','','그 바깥의 관제 공역'],['A','FL200~','항로는 FL200~FL600이 A등급']]],
   ['일본(일반적인 공항)',[['D','3,000ft','관제권(D등급): 반경 약 5NM·높이 약 3,000ft가 많다'],['E','','진입관제구는 E등급'],['','','하네다·나리타 등 주변에는 시계비행도 허가가 필요한 특별관제공역이 있다']]],
   ['미국(가장 붐비는 공항의 B등급)',[['B','10,000ft','지표~10,000ft MSL(거꾸로 놓은 웨딩케이크 모양)'],['E','','A~D 이외의 관제 공역(미국 대부분)'],['A','18,000ft~','18,000ft~FL600은 A등급(계기비행만)']]]],note:'공역의 등급·모양·높이는 나라와 공항마다 다르다. 반드시 각국 AIP(ENR 1.4)와 항공도로 확인한다'},
  en:{t:'Airspace around an airport, side view (three examples)',p:[['Korea (Class B at Incheon, Gimpo, Jeju)',[['B','10,000 ft','Surface to 10,000 ft, stepped out to 20 NM'],['E','','Other controlled airspace outside it'],['A','FL200+','Airways from FL200 to FL600 are Class A']]],
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
 return svg(640,y,s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
