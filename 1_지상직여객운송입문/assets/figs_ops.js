/* 運航管理の実務 Part 0〜9 の補強の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,planeS=H.planeS,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function BADGE(x,y,n,sz){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
var F={
/* 1 EDTO：交替空港からの回航時間の円。60分の円の外の区間がEDTO。承認された最大回航時間（例：180分）の円が経路を覆う */
ops_edto:function(l){
 var W=({ja:{t:'EDTO ― 回航時間の円で経路を守る',a1:'出発地',a2:'目的地',alt:'経路上の交替空港',c60:'60分の円（基準時間）',out:'60分の円の外＝EDTOの区間',c180:'承認された最大回航時間（例：180分）の円',items:['1発不作動の巡航速度・無風で、交替空港まで60分の円（双発機の基準時間）を出る経路はEDTO','会社は機種・路線ごとに最大回航時間の承認を受け、その円の中に経路を収める','経路上の交替空港の天気は、使う可能性のある時間の前後1時間に最低気象条件以上であること（8-2の表）']},
  ko:{t:'EDTO — 회항시간 원으로 경로를 지킨다',a1:'출발지',a2:'목적지',alt:'항로상 교체공항',c60:'60분 원(기준시간)',out:'60분 원 밖 = EDTO 구간',c180:'승인된 최대회항시간(예: 180분) 원',items:['1개 발동기 부작동 순항속도·무풍으로 교체공항까지 60분 원(쌍발기 기준시간)을 벗어나는 경로가 EDTO','회사는 기종·노선별로 최대회항시간을 승인받고, 그 원 안에 경로를 넣는다','항로상 교체공항 날씨는 쓸 수 있는 시간 전후 1시간 동안 최저 기상치 이상이어야 한다(8-2 표)']},
  en:{t:'EDTO: keeping the route inside diversion-time circles',a1:'Departure',a2:'Destination',alt:'En-route alternates',c60:'60-minute circles (threshold time)',out:'Outside the 60-minute circles = EDTO segment',c180:'Approved maximum diversion time circles (e.g. 180 min)',items:['A route that leaves the 60-minute circles around alternates (one engine out, still air; the twin-engine threshold) is an EDTO operation','Operators are approved for a maximum diversion time by type and route, and must keep the route inside those circles','En-route alternate weather must be at or above minima from one hour before to one hour after the possible time of use (table in 8-2)']}})[l];
 if(!W)return F.ops_edto('ja');
 setK(1);var dur=10;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,230,'#2F6FA8',14)+'<defs><clipPath id="edc"><rect x="20" y="56" width="600" height="230" rx="14"/></clipPath></defs><g clip-path="url(#edc)">';
 s+='<path d="M20 56 L130 56 L150 120 L110 200 L20 230 Z" fill="#9C8A62"/><path d="M620 70 L530 90 L505 170 L560 286 L620 286 Z" fill="#9C8A62"/><path d="M300 250 q20 -20 50 -6 q10 20 -30 30 z" fill="#9C8A62"/>';
 var alts=[[110,170],[325,256],[530,120]];
 alts.forEach(function(a){s+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="60" fill="#FFD23F" fill-opacity=".18" stroke="#FFD23F" stroke-width="2" stroke-dasharray="6 4"/>'});
 alts.forEach(function(a){s+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="60" fill="#7CF2B0" fill-opacity=".12" stroke="#7CF2B0" stroke-width="2.5"><animate attributeName="r" values="60;60;175;175" keyTimes="0;.4;.6;1" dur="'+dur+'s" repeatCount="indefinite"/></circle>'});
 var route='M80 120 C220 90 400 90 580 150';
 s+='<path d="'+route+'" fill="none" stroke="#fff" stroke-width="3"/><path d="M175 103 C260 90 330 88 470 110" fill="none" stroke="#D64545" stroke-width="6" stroke-linecap="round"><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.4;.6;.98;1" dur="'+dur+'s" repeatCount="indefinite"/></path>';
 alts.forEach(function(a){s+='<g transform="translate('+a[0]+' '+a[1]+')"><path d="M0 -9 L8 5 L-8 5 Z" fill="#fff" stroke="#243447" stroke-width="2"/></g>'});
 s+='<g>'+plane('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" rotate="auto" path="'+route+'"/></g></g>';
 s+=LB(80,140,W.a1,10.5,'#fff','middle','#243447')+LB(580,172,W.a2,10.5,'#fff','middle','#243447');
 var y=298,rows=[['#FFD23F',W.c60],['#D64545',W.out],['#7CF2B0',W.c180],['#fff',W.alt]];
 rows.forEach(function(r,i){var n=LI(r[1],11,540).length,lh=FS(11)*1.3,h=n*lh+12;s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="34" y="'+(y+h/2-7)+'" width="26" height="14" rx="4" fill="'+r[0]+'" stroke="#243447"/>'+WR(72,y+6+n*lh/2+FS(11)*0.3,r[1],11,D,800,540,'start');y+=h+4});
 var L=LIST(W.items,y+8,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 2 一日の勤務：乗務時間・飛行勤務時間・勤務時間の範囲 */
ops_day:function(l){
 var W=({ja:{t:'一日の勤務と3つの時間',ev:['出頭（報告）','動き出す','到着・停止','動き出す','到着・停止','勤務の終わり'],leg:['1区間目','2区間目'],ft:'乗務時間（動き出してから止まるまで・区間の合計）',fdp:'飛行勤務時間（出頭から最後の区間が終わるまで）',duty:'勤務時間（出頭からすべての勤務が終わるまで）',lim:'韓国・操縦士2名の上限：乗務時間8時間・飛行勤務時間13時間（日本は開始時刻と区間数で変わる。6-1の表）'},
  ko:{t:'하루 근무와 3가지 시간',ev:['출근 보고','움직이기 시작','도착·정지','움직이기 시작','도착·정지','근무 종료'],leg:['1구간','2구간'],ft:'승무시간(움직이기 시작해 멈출 때까지·구간 합계)',fdp:'비행근무시간(출근 보고부터 마지막 구간이 끝날 때까지)',duty:'근무시간(출근 보고부터 모든 근무가 끝날 때까지)',lim:'한국·조종사 2명 상한: 승무시간 8시간·비행근무시간 13시간(일본은 시작 시각과 구간 수로 바뀐다. 6-1 표)'},
  en:{t:'A duty day and its three time measures',ev:['Report','Off blocks','On blocks','Off blocks','On blocks','End of duty'],leg:['Sector 1','Sector 2'],ft:'Flight time (off blocks to on blocks, summed over sectors)',fdp:'Flight duty period (report to the end of the last sector)',duty:'Duty time (report to the end of all duties)',lim:'Korea, two pilots: flight time 8 hours, FDP 13 hours (Japan varies with start time and number of sectors; see the table in 6-1)'}})[l];
 if(!W)return F.ops_day('ja');
 setK(1);var dur=10,x=[50,120,260,330,470,570],y0=150;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,190,'#EEF5FB',14);
 s+='<line x1="40" y1="'+y0+'" x2="600" y2="'+y0+'" stroke="#40566B" stroke-width="3"/>';
 [[120,260,0],[330,470,1]].forEach(function(g){s+=R(g[0],y0-26,g[1]-g[0],22,'#2F6FD6',6)+tx((g[0]+g[1])/2,y0-10,W.leg[g[2]],10.5,'#fff',900)+'<g opacity="0">'+planeS('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" path="M'+g[0]+' '+(y0-40)+' L'+g[1]+' '+(y0-40)+'" keyPoints="0;0;1;1" keyTimes="0;'+(g[2]?'.5':'.1')+';'+(g[2]?'.8':'.4')+';1" calcMode="linear"/><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;'+(g[2]?'.49':'.09')+';'+(g[2]?'.5':'.1')+';'+(g[2]?'.8':'.4')+';'+(g[2]?'.81':'.41')+';1" dur="'+dur+'s" repeatCount="indefinite"/></g>'});
 x.forEach(function(v,i){s+='<circle cx="'+v+'" cy="'+y0+'" r="6" fill="#fff" stroke="#243447" stroke-width="2.5"/>'+BADGE(v,y0+26,i+1,10)});
 var bars=[[x[1],x[2],'#2F6FD6',0],[x[3],x[4],'#2F6FD6',0],[x[0],x[4],'#E08A2F',1],[x[0],x[5],'#6B4FA0',2]];
 bars.forEach(function(b){var yy=y0+48+b[3]*20;s+='<line x1="'+b[0]+'" y1="'+yy+'" x2="'+b[1]+'" y2="'+yy+'" stroke="'+b[2]+'" stroke-width="8" stroke-linecap="round" opacity=".25"/><line x1="'+b[0]+'" y1="'+yy+'" x2="'+b[1]+'" y2="'+yy+'" stroke="'+b[2]+'" stroke-width="8" stroke-linecap="round" opacity="0"><animate attributeName="opacity" '+SEG(b[3],3,0,1)+' dur="'+dur+'s" repeatCount="indefinite"/></line>'});
 var y=258,items=[['#2F6FD6',W.ft],['#E08A2F',W.fdp],['#6B4FA0',W.duty]];
 s+='<g>';x.forEach(function(v,i){});s+='</g>';
 var ev=W.ev.map(function(e,i){return (i+1)+' '+e}).join('　');var ne=LI(ev,10.5,580).length;s+=WR(320,y+ne*FS(10.5)*1.3/2,ev,10.5,G,800,580);y+=ne*FS(10.5)*1.3+12;
 items.forEach(function(r,i){var n=LI(r[1],11,540).length,lh=FS(11)*1.3,h=n*lh+12;s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="34" y="'+(y+h/2-5)+'" width="26" height="10" rx="5" fill="'+r[0]+'"/>'+WR(72,y+6+n*lh/2+FS(11)*0.3,r[1],11,D,800,540,'start');y+=h+4});
 var n2=LI(W.lim,11,580).length;s+=R(20,y+6,600,n2*FS(11)*1.3+16,'#FFF1E3',10)+WR(320,y+14+n2*FS(11)*1.3/2+FS(11)*0.3,W.lim,11,'#8a3b00',900,580);y+=n2*FS(11)*1.3+34;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 3 飛行中の燃料：残りが減ると、遅延情報の要求 → MINIMUM FUEL → MAYDAY FUEL */
ops_minfuel:function(l){
 var W=({ja:{t:'飛行中の燃料と2つの通報',tank:'着陸時に残る見込みの燃料',l1:'交替空港まで＋最終予備：これより少なそうなら管制に遅延の情報を求める',l2:'MINIMUM FUEL：特定の空港に降りるしかなく、承認が変わると最終予備を下回るかもしれない（緊急ではない）',l3:'MAYDAY FUEL：最も近い空港に降りても最終予備を下回る見込み（緊急の宣言）',note:'MINIMUM FUEL は「これ以上の遅れは受けられない」という知らせ。優先して着陸したいときは MAYDAY FUEL が必要'},
  ko:{t:'비행 중 연료와 두 가지 통보',tank:'착륙 때 남을 것으로 예상되는 연료',l1:'교체공항까지 + 최종예비: 이보다 적을 것 같으면 관제에 지연 정보를 요청',l2:'MINIMUM FUEL: 특정 공항에 착륙할 수밖에 없고 허가가 바뀌면 최종예비보다 적어질 수 있을 때(비상 아님)',l3:'MAYDAY FUEL: 가장 가까운 공항에 착륙해도 최종예비보다 적어질 것으로 예상될 때(비상 선언)',note:'MINIMUM FUEL은 ‘더 이상의 지연은 받을 수 없다’는 알림. 우선 착륙을 원하면 MAYDAY FUEL이 필요하다'},
  en:{t:'Fuel in flight and the two calls',tank:'Expected fuel on landing',l1:'Alternate + final reserve: if landing with less looks likely, ask ATC for delay information',l2:'MINIMUM FUEL: committed to one airport, and any change in clearance could mean landing below final reserve (not an emergency)',l3:'MAYDAY FUEL: expected to land below final reserve even at the nearest airport (an emergency)',note:'MINIMUM FUEL means “no further delay can be accepted”; to get priority, declare MAYDAY FUEL'}})[l];
 if(!W)return F.ops_minfuel('ja');
 setK(1);var dur=9,tx0=60,tw=90,ty=70,th=200;
 var s='';
 s+=R(tx0,ty,tw,th,'#fff',10,' stroke="#243447" stroke-width="3"');
 s+='<rect x="'+(tx0+4)+'" y="'+(ty+4)+'" width="'+(tw-8)+'" height="'+(th-8)+'" rx="7" fill="#2F6FD6" opacity=".8"><animate attributeName="y" values="'+(ty+4)+';'+(ty+160)+'" dur="'+dur+'s" repeatCount="indefinite"/><animate attributeName="height" values="'+(th-8)+';'+(th-164)+'" dur="'+dur+'s" repeatCount="indefinite"/></rect>';
 var nt=LI(W.tank,10.5,150).length,tlh=FS(10.5)*1.3;s+=WR(tx0+tw/2,ty+th+14+nt*tlh/2+FS(10.5)*0.3,W.tank,10.5,G,800,150);var tankEnd=ty+th+20+nt*tlh;
 var lines=[[ty+80,'#E08A2F',W.l1,0.35],[ty+120,'#D64545',W.l2,0.55],[ty+150,'#6B1414',W.l3,0.8]];
 lines.forEach(function(ln){s+='<line x1="'+(tx0-8)+'" y1="'+ln[0]+'" x2="'+(tx0+tw+14)+'" y2="'+ln[0]+'" stroke="'+ln[1]+'" stroke-width="3" stroke-dasharray="6 4"/>'});
 var y=74;lines.forEach(function(ln,i){var n=LI(ln[2],11,380).length,lh=FS(11)*1.3,h=n*lh+14;
  s+='<g>'+R(210,y,400,h,'#fff',10,' stroke="'+ln[1]+'" stroke-width="2"')+'<rect x="210" y="'+y+'" width="400" height="'+h+'" rx="10" fill="'+ln[1]+'" opacity="0"><animate attributeName="opacity" values="0;0;.18;.18" keyTimes="0;'+ln[3]+';'+(ln[3]+0.02)+';1" dur="'+dur+'s" repeatCount="indefinite"/></rect>'+WR(410,y+7+n*lh/2+FS(11)*0.3,ln[2],11,D,800,380)+'</g>';y+=h+8});
 var pe=Math.max(y,tankEnd)+6;s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,pe-56,'#EEF5FB',14)+s;var H0=pe+10,n2=LI(W.note,11,580).length;s+=R(20,H0,600,n2*FS(11)*1.3+16,'#FFF1E3',10)+WR(320,H0+8+n2*FS(11)*1.3/2+FS(11)*0.3,W.note,11,'#8a3b00',900,580);H0+=n2*FS(11)*1.3+28;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+H0.toFixed(0)+'" role="img">'+R(0,0,640,H0,'#F7FAFD')+s+'</svg>'},

/* 4 火山灰：噴火した火山の灰の雲が風で広がり、航空路が避けて通る。航空用の色の警報が変わる */
ops_ash:function(l){
 var W=({ja:{t:'火山灰の雲と経路の変更',wind:'上空の風',old:'もとの経路',nw:'避ける経路（距離が増え、燃料も増える）',cc:'航空用の色の警報',cols:['緑','黄','オレンジ','赤'],items:['ASHTAM・VAAC の火山灰情報・VA SIGMET で、範囲と高さを確かめる','経路・高度・時刻と重ねて、灰の雲を避ける経路と燃料を決める','降灰で空港が閉鎖されることがある。目的地・代替空港の見込みも確かめる']},
  ko:{t:'화산재 구름과 경로 변경',wind:'상공의 바람',old:'원래 경로',nw:'피해 가는 경로(거리가 늘고 연료도 늘어난다)',cc:'항공용 색 경보',cols:['녹색','황색','주황','적색'],items:['ASHTAM·VAAC 화산재 정보·VA SIGMET으로 범위와 높이를 확인한다','경로·고도·시각과 겹쳐 화산재 구름을 피하는 경로와 연료를 정한다','강회로 공항이 폐쇄될 수 있다. 목적지·교체공항의 전망도 확인한다']},
  en:{t:'Volcanic ash clouds and rerouting',wind:'Upper wind',old:'Original route',nw:'Avoiding route (longer, so more fuel)',cc:'Aviation colour code',cols:['Green','Yellow','Orange','Red'],items:['Check the extent and height in the ASHTAM, VAAC advisories and VA SIGMET','Overlay them on the route, level and times, and plan an avoiding route and fuel','Ash fall can close airports; check the outlook for the destination and alternates too']}})[l];
 if(!W)return F.ops_ash('ja');
 setK(1);var dur=10;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,220,'#DCEEFB',14);
 s+='<path d="M120 266 L170 196 L190 196 L240 266 Z" fill="#8C7A5B" stroke="#5B4A33" stroke-width="2"/>';
 for(var i=0;i<5;i++){var cx=200+i*70,cy=150-i*8;s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="36" ry="22" fill="#6B6B6B" opacity="0"><animate attributeName="opacity" values="0;0;.75;.75" keyTimes="0;'+(i*0.1).toFixed(2)+';'+(i*0.1+0.1).toFixed(2)+';1" dur="'+dur+'s" repeatCount="indefinite"/><animate attributeName="rx" values="20;20;'+(36+i*8)+';'+(36+i*8)+'" keyTimes="0;'+(i*0.1).toFixed(2)+';'+(i*0.1+0.2).toFixed(2)+';1" dur="'+dur+'s" repeatCount="indefinite"/></ellipse>'}
 s+=ARW(420,80,520,80,'#40566B',4)+LB(470,70,W.wind,10.5,'#fff','middle','#40566B');
 var oldp='M40 130 L600 110',newp='M40 130 C160 250 520 250 600 110';
 s+='<path d="'+oldp+'" fill="none" stroke="#D64545" stroke-width="3" stroke-dasharray="8 6"/>'+LB(560,104,W.old,10.5,'#D64545','end','#fff');
 s+='<path d="'+newp+'" fill="none" stroke="#1F7A6E" stroke-width="3.5"/>'+LBW(420,248,W.nw,10.5,'#1F7A6E','middle','#fff',260);
 s+='<g>'+plane('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" rotate="auto" path="'+newp+'"/></g>';
 var cc=['#39B26B','#F2D233','#E08A2F','#D64545'];s+=tx(40,82,W.cc,10.5,G,800,'start');
 cc.forEach(function(c,i){s+='<g opacity="'+(i?0:1)+'">'+LB(80,108,W.cols[i],11,i===1?'#0f3558':'#fff','middle',c)+'<animate attributeName="opacity" '+SEG(i,4,0,1)+' dur="'+dur+'s" repeatCount="indefinite"/></g>'});
 var L=LIST(W.items,288,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 5 保存期間（韓国の基準）：通信日誌1か月 〜 乗員の訓練記録3年 */
ops_retain:function(l){
 var W=({ja:{t:'記録の保存期間（韓国の基準）',rows:[['通信の記録（通信日誌）','1か月',1],['運航飛行計画書・ロードシート・燃料の記録','3か月',3],['事象の報告書','3か月',3],['機長通報（NOTOC）','1年',12],['乗務時間・飛行勤務時間・休息','15か月',15],['運航管理士などの訓練・資格の記録','2年',24],['乗員の訓練・審査の記録','3年',36]],note:'日本は運航規程審査要領細則などで定める（飛行計画・重量の書類は3か月以上など、9-2の表）'},
  ko:{t:'기록 보존 기간(한국 기준)',rows:[['통신 기록(통신일지)','1개월',1],['운항비행계획서·로드시트·연료 기록','3개월',3],['사건 보고서','3개월',3],['기장통보서(NOTOC)','1년',12],['승무시간·비행근무시간·휴식','15개월',15],['운항관리사 등 훈련·자격 기록','2년',24],['승무원 훈련·심사 기록','3년',36]],note:'일본은 운항규정 심사요령 세칙 등으로 정한다(비행계획·중량 서류 3개월 이상 등, 9-2 표)'},
  en:{t:'Record retention periods (Korea)',rows:[['Communications log','1 month',1],['OFP, load sheet, fuel records','3 months',3],['Occurrence reports','3 months',3],['NOTOC','1 year',12],['Flight time, FDP and rest','15 months',15],['Dispatcher and other staff training records','2 years',24],['Crew training and checking records','3 years',36]],note:'Japan sets these in its operations manual review guidelines (e.g. flight plans and weight documents at least 3 months; see the table in 9-2)'}})[l];
 if(!W)return F.ops_retain('ja');
 setK(1);var dur=7,y=62,x0=330,wmax=200,lh=FS(11)*1.3;
 var s=TTL(320,30,W.t,15,'#0f3558',600);
 W.rows.forEach(function(r,i){var n=LI(r[0],11,290).length,h=Math.max(FS(11)*2.2,n*lh+12),bw=Math.max(18,Math.sqrt(r[2]/36)*wmax);
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+WR(30,y+h/2+FS(11)*0.3,r[0],11,D,800,290,'start');
  s+='<rect x="'+x0+'" y="'+(y+h/2-9)+'" width="0" height="18" rx="6" fill="#2F6FD6"><animate attributeName="width" values="0;'+bw.toFixed(0)+';'+bw.toFixed(0)+'" keyTimes="0;'+(0.1+i*0.05).toFixed(2)+';1" dur="'+dur+'s" repeatCount="indefinite"/></rect>'+tx(x0+bw+8,y+h/2+FS(11)*0.35,r[1],11,'#1d4d8a',900,'start');y+=h+4});
 var n2=LI(W.note,10.5,580).length;s+=WR(320,y+8+n2*FS(10.5)*1.3/2+FS(10.5)*0.3,W.note,10.5,G,800,580);y+=n2*FS(10.5)*1.3+20;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},
/* 6 運航管理者になる道：韓国と日本 */
ops_path:function(l){
 var W=({ja:{t:'運航管理者になる道 ― 韓国と日本',kr:'韓国：運航管理士',jp:'日本：運航管理者',ks:['経歴（2年など）','学科試験 5科目','実技試験','資格証明（航空従事者）','会社の教育・業務'],js:['経験（2年など）','学科試験 6科目','実地試験','技能検定の合格','会社の審査・業務'],note:'年齢はどちらも21歳以上（韓国：第34条、日本：施行規則第167条）。学科は科目ごとに70%以上（点）で合格'},
  ko:{t:'운항관리사가 되는 길 — 한국과 일본',kr:'한국: 운항관리사',jp:'일본: 운항관리자',ks:['경력(2년 등)','학과시험 5과목','실기시험','자격증명(항공종사자)','회사 교육·업무'],js:['경험(2년 등)','학과시험 6과목','실지시험','기능검정 합격','회사 심사·업무'],note:'나이는 두 나라 모두 21세 이상(한국: 제34조, 일본: 시행규칙 제167조). 학과는 과목마다 70% 이상(점)이면 합격'},
  en:{t:'Becoming a dispatcher: Korea and Japan',kr:'Korea: flight dispatcher',jp:'Japan: aircraft dispatcher',ks:['Experience (e.g. 2 years)','Written exam, 5 subjects','Practical exam','Licence (aviation personnel)','Company training and duties'],js:['Experience (e.g. 2 years)','Written exam, 6 subjects','Practical exam','Pass the competency test','Company checks and duties'],note:'Minimum age 21 in both (Korea Art. 34; Japan Enforcement Rule Art. 167); each written subject is passed at 70%'}})[l];
 if(!W)return F.ops_path('ja');
 setK(1);var dur=10,nar=NARROW();
 var s=TTL(320,30,W.t,15,'#0f3558',600);
 function track(y0,title,steps,col){var g=R(20,y0,600,40,col,10)+tx(320,y0+26,title,13,'#fff',900),y=y0+48;
  steps.forEach(function(t,i){var n=LI(t,11,500).length,lh=FS(11)*1.3,h=n*lh+14;g+='<g>'+R(20,y,600,h,'#fff',10,' stroke="'+col+'" stroke-width="1.5"')+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="10" fill="'+col+'" opacity="0"><animate attributeName="opacity" '+SEG(i,5,0,.18)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+BADGE(44,y+h/2,i+1,11)+WR(70,y+h/2+FS(11)*0.3,t,11,D,800,500,'start')+'</g>';y+=h;if(i<4){g+=ARW(320,y+1,320,y+11,'#9FB0C2',3);y+=13}});return {s:g,y:y}}
 var a=track(56,W.kr,W.ks,'#2F6FD6'),b=track(a.y+16,W.jp,W.js,'#D64545');s+=a.s+b.s;var y=b.y;
 var n2=LI(W.note,11,580).length;s+=R(20,y+12,600,n2*FS(11)*1.3+16,'#FFF1E3',10)+WR(320,y+20+n2*FS(11)*1.3/2+FS(11)*0.3,W.note,11,'#8a3b00',900,580);y+=n2*FS(11)*1.3+40;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 7 出発と飛行計画の変更には運航管理者の承認が必要（韓：第65条②、日：第77条） */
ops_approve:function(l){
 var W=({ja:{t:'出発と計画の変更は「2人で決める」',dsp:'運航管理者',cap:'機長',st:['運航管理者が飛行計画（OFP）をつくる','機長が確かめ、2人が同意して署名','承認があって、はじめて出発','飛行中に計画を変えるときも、運航管理者の承認'],law:'韓国：航空安全法 第65条②／日本：航空法 第77条'},
  ko:{t:'출발과 계획 변경은 ‘둘이 함께 정한다’',dsp:'운항관리사',cap:'기장',st:['운항관리사가 비행계획(OFP)을 만든다','기장이 확인하고 둘이 동의해 서명','승인이 있어야 비로소 출발','비행 중 계획을 바꿀 때도 운항관리사의 승인'],law:'한국: 항공안전법 제65조② / 일본: 항공법 제77조'},
  en:{t:'Departure and plan changes are decided by two people',dsp:'Dispatcher',cap:'Captain',st:['The dispatcher prepares the flight plan (OFP)','The captain reviews it; both agree and sign','Only then may the flight depart','Changing the plan in flight also needs the dispatcher’s approval'],law:'Korea: Aviation Safety Act Art. 65(2) / Japan: Civil Aeronautics Act Art. 77'}})[l];
 if(!W)return F.ops_approve('ja');
 setK(1);var dur=12;
 function person(x,y,c,lab){return '<g transform="translate('+x+' '+y+')"><circle cy="-26" r="14" fill="'+c+'"/><path d="M-22 14 Q-22 -8 0 -8 Q22 -8 22 14 Z" fill="'+c+'"/></g>'+LB(x,y+32,lab,11,'#fff','middle',c)}
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,190,'#EEF5FB',14);
 s+=person(90,140,'#1F7A6E',W.dsp)+person(550,140,'#2F6FD6',W.cap);
 s+='<g><rect x="-18" y="-24" width="36" height="48" rx="4" fill="#fff" stroke="#243447" stroke-width="2"/><path d="M-10 -12 h20 M-10 -4 h20 M-10 4 h14" stroke="#9FB0C2" stroke-width="3"/><animateMotion dur="'+dur+'s" repeatCount="indefinite" path="M130 120 L320 120 L510 120" keyPoints="0;0;.5;.5;1;1" keyTimes="0;.1;.25;.3;.45;1" calcMode="linear"/></g>';
 s+='<g opacity="0">'+'<circle cx="320" cy="92" r="16" fill="#39B26B"/><path d="M311 92 l6 6 l12 -13" fill="none" stroke="#fff" stroke-width="4"/>'+'<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.3;.32;.6;.62;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
 s+='<g opacity="0"><g transform="translate(470 222)">'+planeS('#fff')+'</g><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.5;.52;.72;.74;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
 s+='<g opacity="0"><path d="M520 88 C420 60 220 60 130 88" fill="none" stroke="#E08A2F" stroke-width="3" stroke-dasharray="7 5"/>'+ARW(160,82,128,90,'#E08A2F',3)+'<path d="M130 100 C220 128 420 128 520 100" fill="none" stroke="#39B26B" stroke-width="3" stroke-dasharray="7 5"/>'+ARW(490,106,522,98,'#39B26B',3)+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.75;.77;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
 var y=258,lh=FS(11)*1.3;
 W.st.forEach(function(t,i){var n=LI(t,11,520).length,h=n*lh+14;s+='<g>'+R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,4,0,.55)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+BADGE(42,y+h/2,i+1,11)+WR(64,y+h/2+FS(11)*0.3,t,11,D,800,520,'start')+'</g>';y+=h+4});
 var n2=LI(W.law,11,580).length;s+=WR(320,y+8+n2*FS(11)*1.3/2+FS(11)*0.3,W.law,11,'#1d4d8a',900,580);y+=n2*FS(11)*1.3+22;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 8 ICAO の飛行計画（FPL）の主な項目 */
ops_fpl:function(l){
 var W=({ja:{t:'ATCに出す飛行計画（FPL）の主な項目',it:[['7','便名','ACN801'],['8','飛行の方式・種類','IS'],['9','機種・後方乱気流の区分','A20N/M'],['10','無線・航法の装備','SDE2FGHIRWY/LB1'],['13','出発空港・時刻','RJTT0000'],['15','速度・高度・経路','N0450F380 TIARA GUSRO Y20 KIRIN'],['16','目的地・所要時間・代替空港','RJFF0130 RJFR'],['18','その他（PBN・登録記号など）','PBN/… REG/…'],['19','補足（燃料の飛行可能時間・人数）','E/0300 P/165']],note:'韓国では、管制当局が別に定めない限り出発の60分前までに出す。OFPと経路・高度・時刻・代替空港をそろえる'},
  ko:{t:'ATC에 내는 비행계획(FPL)의 주요 항목',it:[['7','편명','ACN801'],['8','비행 방식·종류','IS'],['9','기종·후류 요란 구분','A20N/M'],['10','무선·항법 장비','SDE2FGHIRWY/LB1'],['13','출발공항·시각','RJTT0000'],['15','속도·고도·경로','N0450F380 TIARA GUSRO Y20 KIRIN'],['16','목적공항·소요 시간·교체공항','RJFF0130 RJFR'],['18','기타(PBN·등록부호 등)','PBN/… REG/…'],['19','보충(연료 체공 시간·인원)','E/0300 P/165']],note:'한국은 관제 당국이 달리 정하지 않는 한 출발 60분 전까지 낸다. OFP와 경로·고도·시각·교체공항을 맞춘다'},
  en:{t:'Main items of the ATC flight plan (FPL)',it:[['7','Aircraft identification','ACN801'],['8','Flight rules and type','IS'],['9','Type and wake category','A20N/M'],['10','Radio and navigation equipment','SDE2FGHIRWY/LB1'],['13','Departure aerodrome and time','RJTT0000'],['15','Speed, level and route','N0450F380 TIARA GUSRO Y20 KIRIN'],['16','Destination, EET and alternate','RJFF0130 RJFR'],['18','Other information (PBN, registration)','PBN/… REG/…'],['19','Supplementary (endurance, persons)','E/0300 P/165']],note:'In Korea, file at least 60 minutes before departure unless ATC specifies otherwise, and keep route, level, times and alternates the same as the OFP'}})[l];
 if(!W)return F.ops_fpl('ja');
 setK(1);var dur=12,n=W.it.length,y=62,lh=FS(11)*1.3;
 var s=TTL(320,30,W.t,15,'#0f3558',600);
 W.it.forEach(function(r,i){var n1=LI(r[1],11,220).length,n2=LI(r[2],11,250).length,h=Math.max(n1,n2)*lh+14;
  s+='<g>'+R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.55)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+R(28,y+h/2-14,44,28,'#243447',6)+tx(50,y+h/2+FS(12)*0.35,r[0],12,'#fff',900)+WR(84,y+h/2+FS(11)*0.3,r[1],11,D,800,220,'start')+WR(340,y+h/2+FS(11)*0.3,r[2],11,'#1d4d8a',900,270,'start')+'</g>';y+=h+4});
 var n3=LI(W.note,11,580).length;s+=R(20,y+8,600,n3*lh+16,'#FFF1E3',10)+WR(320,y+16+n3*lh/2+FS(11)*0.3,W.note,11,'#8a3b00',900,580);y+=n3*lh+34;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 9 出発前の書類の束：機長のフォルダーに集まり、署名して出発の許可 */
ops_docs:function(l){
 var W=({ja:{t:'出発前の書類の束と機長の署名',docs:['OFP（運航飛行計画書）','NOTAMと気象','ロードシート','特殊な搭載物の通知（NOTOC）','航空日誌の関係ページ'],who:['運航管理者','運航管理者','搭載管理','貨物・搭載','整備'],fold:'機長のフォルダー',sign:'機長の確認・署名 → 出発の許可',note:'作り直したOFP・ロードシートは古い版を回収し、新しい版だけを機内に置く。署名した書類は決められた期間保存する（9-2）'},
  ko:{t:'출발 전 서류 묶음과 기장 서명',docs:['OFP(운항비행계획서)','NOTAM과 기상','로드시트','특수 탑재물 통지(NOTOC)','항공일지 관련 페이지'],who:['운항관리사','운항관리사','탑재관리','화물·탑재','정비'],fold:'기장 폴더',sign:'기장 확인·서명 → 비행 인가',note:'다시 만든 OFP·로드시트는 옛 판을 회수하고 새 판만 기내에 둔다. 서명한 서류는 정해진 기간 보존한다(9-2)'},
  en:{t:'The pre-departure document pack and the captain’s signature',docs:['OFP (operational flight plan)','NOTAMs and weather','Load sheet','Special load notification (NOTOC)','Relevant technical log pages'],who:['Dispatcher','Dispatcher','Load control','Cargo and loading','Maintenance'],fold:'Captain’s folder',sign:'Captain checks and signs → flight release',note:'When the OFP or load sheet is reissued, collect the old version so only the new one is on board; keep signed documents for the set period (9-2)'}})[l];
 if(!W)return F.ops_docs('ja');
 setK(1);var dur=10,n=W.docs.length,y=62,lh=FS(11)*1.3;
 var s=TTL(320,30,W.t,15,'#0f3558',600);
 var cols=['#2F6FD6','#1F7A6E','#E08A2F','#D64545','#6B4FA0'];
 W.docs.forEach(function(t,i){var n1=LI(t,11,260).length,n2=LI(W.who[i],10.5,120).length,h=Math.max(n1,n2)*lh+14;
  s+='<g>'+R(20,y,420,h,'#fff',8,' stroke="'+cols[i]+'" stroke-width="2"')+'<rect x="20" y="'+y+'" width="8" height="'+h+'" rx="3" fill="'+cols[i]+'"/>'+WR(40,y+h/2+FS(11)*0.3,t,11,D,800,260,'start')+WR(430,y+h/2+FS(10.5)*0.3,W.who[i],10.5,G,800,120,'end')+'</g>';
  s+='<rect x="0" y="0" width="22" height="28" rx="3" fill="'+cols[i]+'" opacity="0"><animateMotion dur="'+dur+'s" repeatCount="indefinite" path="M440 '+(y+h/2-14)+' L520 '+(y+h/2-14)+' L540 150" keyPoints="0;0;1;1" keyTimes="0;'+(i*0.1).toFixed(2)+';'+(i*0.1+0.15).toFixed(2)+';1" calcMode="linear"/><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;'+(i*0.1).toFixed(2)+';'+(i*0.1+0.01).toFixed(2)+';'+(i*0.1+0.15).toFixed(2)+';'+(i*0.1+0.16).toFixed(2)+';1" dur="'+dur+'s" repeatCount="indefinite"/></rect>';
  y+=h+6});
 s+='<path d="M500 140 L600 140 L600 210 L500 210 Z" fill="#FFE9B0" stroke="#8a6d00" stroke-width="2"/><path d="M500 140 L520 128 L560 128 L570 140" fill="#FFD76B" stroke="#8a6d00" stroke-width="2"/>'+WR(550,178,W.fold,10.5,'#8a6d00',900,90);
 s+='<g opacity="0"><circle cx="550" cy="240" r="16" fill="#39B26B"/><path d="M541 240 l6 6 l12 -13" fill="none" stroke="#fff" stroke-width="4"/><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.62;.64;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
 y=Math.max(y,270)+6;var n2=LI(W.sign,12,560).length;s+=R(20,y,600,n2*FS(12)*1.3+16,'#1F7A6E',10)+WR(320,y+8+n2*FS(12)*1.3/2+FS(12)*0.3,W.sign,12,'#fff',900,560);y+=n2*FS(12)*1.3+24;
 var n3=LI(W.note,10.5,580).length;s+=WR(320,y+n3*FS(10.5)*1.3/2+FS(10.5)*0.3,W.note,10.5,G,800,580);y+=n3*FS(10.5)*1.3+16;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 10 ホールドオーバータイム（練習：新千歳の朝）：散布開始から効いている時間と、離陸の見込みを比べる */
ops_hot:function(l){
 var W=({ja:{t:'ホールドオーバータイムと離陸の見込み（練習）',start:'散布開始 07:10（ここから数える）',win:'効いている時間 07:35〜07:55（25〜45分、架空の値）',dep:'出発 07:33',to:'離陸の見込み 07:56',bad:'長いほうも越える見込み → 作業の順番を遅らせる・地上走行を短くする・会社の手順で再作業や確認',note:'数え始めは「散布が終わった時刻」ではなく「最後の散布を始めた時刻」。2段階の作業なら2段階目の開始（7-2の表）'},
  ko:{t:'홀드오버 타임과 이륙 예상(연습)',start:'살포 시작 07:10(여기서부터 센다)',win:'지속시간 07:35~07:55(25~45분, 가상의 값)',dep:'출발 07:33',to:'이륙 예상 07:56',bad:'긴 쪽도 넘길 전망 → 작업 순서를 늦춘다·지상 활주를 줄인다·회사 절차로 재작업이나 확인',note:'세기 시작하는 시점은 ‘살포가 끝난 시각’이 아니라 ‘마지막 살포를 시작한 시각’. 2단계 작업이면 2단계 시작(7-2 표)'},
  en:{t:'Holdover time and the expected take-off (exercise)',start:'Spraying starts 07:10 (count from here)',win:'Protection 07:35–07:55 (25–45 min, fictitious values)',dep:'Off blocks 07:33',to:'Expected take-off 07:56',bad:'Even the longer limit will be exceeded → delay the treatment slot, shorten the taxi, or recheck or re-treat under company procedure',note:'Timing starts when the final application begins, not when spraying ends; in a two-step process, from the start of the second step (table in 7-2)'}})[l];
 if(!W)return F.ops_hot('ja');
 setK(1);var dur=10,x0=60,x1=600,t0=0,t1=50,X=function(m){return x0+(m-t0)/(t1-t0)*(x1-x0)};
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,190,'#EEF5FB',14);
 s+='<line x1="'+x0+'" y1="170" x2="'+x1+'" y2="170" stroke="#40566B" stroke-width="3"/>';
 for(var m=0;m<=50;m+=10){s+='<line x1="'+X(m)+'" y1="164" x2="'+X(m)+'" y2="176" stroke="#40566B" stroke-width="2"/>'+tx(X(m),194,(function(v){var h=7+Math.floor((10+v)/60),mm=(10+v)%60;return '0'+h+':'+(mm<10?'0':'')+mm})(m),10.5,G,800)}
 s+='<rect x="'+X(25)+'" y="120" width="'+(X(45)-X(25))+'" height="36" rx="6" fill="#39B26B" opacity=".35"/><rect x="'+X(0)+'" y="132" width="'+(X(25)-X(0))+'" height="12" rx="6" fill="#39B26B" opacity=".8"/>';
 s+='<line x1="'+X(0)+'" y1="100" x2="'+X(0)+'" y2="170" stroke="#E08A2F" stroke-width="3"/><line x1="'+X(23)+'" y1="150" x2="'+X(23)+'" y2="170" stroke="#2F6FD6" stroke-width="3"/><line x1="'+X(46)+'" y1="96" x2="'+X(46)+'" y2="170" stroke="#D64545" stroke-width="3"/>';
 s+='<circle r="8" fill="#FFD23F" stroke="#0f3558"><animateMotion dur="'+dur+'s" repeatCount="indefinite" path="M'+X(0)+' 170 L'+X(46)+' 170" keyPoints="0;1;1" keyTimes="0;.85;1" calcMode="linear"/></circle>';
 var y=258,rows=[['#E08A2F',W.start],['#39B26B',W.win],['#2F6FD6',W.dep],['#D64545',W.to]];
 rows.forEach(function(r,i){var n=LI(r[1],11,540).length,lh=FS(11)*1.3,h=n*lh+12;s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="34" y="'+(y+h/2-6)+'" width="26" height="12" rx="4" fill="'+r[0]+'"/>'+WR(72,y+6+n*lh/2+FS(11)*0.3,r[1],11,D,800,540,'start');y+=h+4});
 var n2=LI(W.bad,11,560).length;s+=R(20,y+6,600,n2*FS(11)*1.3+16,'#FDEAE3',10)+WR(320,y+14+n2*FS(11)*1.3/2+FS(11)*0.3,W.bad,11,'#8a1f1f',900,560);y+=n2*FS(11)*1.3+30;
 var n3=LI(W.note,10.5,580).length;s+=WR(320,y+n3*FS(10.5)*1.3/2+FS(10.5)*0.3,W.note,10.5,G,800,580);y+=n3*FS(10.5)*1.3+16;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},
/* 11 総合事例①：冬の朝の国内線（新千歳→羽田）。時間の流れに沿って判断の場面が光る */
case_winter:function(l){
 var W=({ja:{t:'事例①の流れ ― 冬の朝の新千歳→羽田（練習用・架空の値）',ev:[['05:30','天気：雪・視程1,200m','TAF・METARで出発と到着の見込み'],['05:50','NOTAM・SNOWTAM','除雪で1本閉鎖、RWYCC 5/5/3'],['06:10','MEL：APUが使えない','地上の電源・空気の手配'],['06:30','燃料と代替空港','待機と除雪氷の地上走行分を足す'],['07:20','除雪氷の開始','ホールドオーバーに合わせて順番を遅らせる'],['08:40','到着地の混雑','遅延情報→MINIMUM FUELの判断']]},
  ko:{t:'사례 ①의 흐름 — 겨울 아침 신치토세→하네다(연습용·가상의 값)',ev:[['05:30','날씨: 눈·시정 1,200m','TAF·METAR로 출발과 도착 전망'],['05:50','NOTAM·SNOWTAM','제설로 1개 폐쇄, RWYCC 5/5/3'],['06:10','MEL: APU 불능','지상 전원·공기 준비'],['06:30','연료와 교체공항','대기와 제빙 지상 활주분을 더한다'],['07:20','제빙 시작','홀드오버에 맞춰 순서를 늦춘다'],['08:40','도착지 혼잡','지연 정보→MINIMUM FUEL 판단']]},
  en:{t:'Case 1 flow: a winter morning, New Chitose to Haneda (exercise, fictitious values)',ev:[['05:30','Weather: snow, 1,200 m','Departure and arrival outlook from TAF and METAR'],['05:50','NOTAM and SNOWTAM','One runway closed for clearing, RWYCC 5/5/3'],['06:10','MEL: APU inoperative','Arrange ground power and air'],['06:30','Fuel and alternates','Add holding and de-icing taxi fuel'],['07:20','De-icing starts','Slot moved later to fit the holdover time'],['08:40','Congestion at destination','Delay information → MINIMUM FUEL decision']]}})[l];
 if(!W)return F.case_winter('ja');
 setK(1);var dur=14,n=W.ev.length,y=62,lh=FS(11)*1.3;
 var s=TTL(320,30,W.t,15,'#0f3558',600);
 var rows='',top=y;
 W.ev.forEach(function(e,i){var n1=LI(e[1],11.5,440).length,n2=LI(e[2],10.5,440).length,h=n1*FS(11.5)*1.3+n2*FS(10.5)*1.3+18;
  rows+='<g>'+R(110,y,510,h,'#fff',10,' stroke="#D9E3EC"')+'<rect x="110" y="'+y+'" width="510" height="'+h+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.5)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+tx(70,y+h/2+FS(11)*0.35,e[0],11,'#2F6FD6',900)+WR(126,y+8+n1*FS(11.5)*1.3/2+FS(11.5)*0.3,e[1],11.5,D,900,480,'start')+WR(126,y+12+n1*FS(11.5)*1.3+n2*FS(10.5)*1.3/2+FS(10.5)*0.3,e[2],10.5,G,800,480,'start')+'</g>';y+=h+8});
 s+='<line x1="70" y1="'+(top+4)+'" x2="70" y2="'+(y-8)+'" stroke="#C8D3DE" stroke-width="4"/>'+rows;
 s+='<circle cx="70" r="8" fill="#FFD23F" stroke="#0f3558"><animate attributeName="cy" values="'+(top+10)+';'+(y-14)+'" dur="'+dur+'s" repeatCount="indefinite"/></circle>';
 y+=6;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 12 総合事例②：太平洋のEDTO夜間便。経路・交替空港・等時点、急減圧で交替空港へ */
case_edto:function(l){
 var W=({ja:{t:'事例②の流れ ― 仁川→ホノルル（EDTO 180分・練習用・架空の値）',a:'交替空港A',b:'交替空港B',c:'交替空港C',etp:'等時点（ETP）',ash:'火山灰（VA SIGMET）',dec:'急減圧 → 10,000ftへ降下し、Bへ回航',items:['出発前：ジェット気流の追い風で経路と高度を選び、交替空港A・B・Cの天気を使う可能性のある時間の前後1時間で確かめる','MEL で片方の空調が使えないと上がれる高さが制限され、燃料が足りない → 機材を替える判断','EDTO 臨界燃料：最も厳しい等時点で急減圧とエンジン故障を想定し、交替空港まで飛べる燃料を確保','飛行中：火山灰の範囲を避けて経路を変え、急減圧のときは交替空港Bへ']},
  ko:{t:'사례 ②의 흐름 — 인천→호놀룰루(EDTO 180분·연습용·가상의 값)',a:'교체공항 A',b:'교체공항 B',c:'교체공항 C',etp:'등시점(ETP)',ash:'화산재(VA SIGMET)',dec:'급감압 → 10,000ft로 강하해 B로 회항',items:['출발 전: 제트기류 뒷바람으로 경로와 고도를 고르고, 교체공항 A·B·C 날씨를 쓸 수 있는 시간 전후 1시간으로 확인','MEL로 한쪽 공조를 쓸 수 없으면 올라갈 수 있는 높이가 제한되어 연료가 모자란다 → 기재 변경 판단','EDTO 임계연료: 가장 엄격한 등시점에서 급감압과 엔진 고장을 가정해 교체공항까지 날 연료를 확보','비행 중: 화산재 범위를 피해 경로를 바꾸고, 급감압 때는 교체공항 B로']},
  en:{t:'Case 2 flow: Incheon to Honolulu (EDTO 180 min, exercise, fictitious values)',a:'Alternate A',b:'Alternate B',c:'Alternate C',etp:'Equal-time point (ETP)',ash:'Volcanic ash (VA SIGMET)',dec:'Decompression → descend to 10,000 ft and divert to B',items:['Before departure: choose route and level for the jet-stream tailwind, and check the weather at alternates A, B and C for one hour either side of possible use','An MEL item with one air-conditioning pack inoperative limits altitude so fuel is insufficient → decide to swap aircraft','EDTO critical fuel: assume decompression plus engine failure at the most critical ETP and carry enough to reach the alternate','In flight: reroute around the ash, and after a decompression divert to alternate B']}})[l];
 if(!W)return F.case_edto('ja');
 setK(1);var dur=12;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,220,'#2F6FA8',14)+'<defs><clipPath id="cec"><rect x="20" y="56" width="600" height="220" rx="14"/></clipPath></defs><g clip-path="url(#cec)">';
 s+='<path d="M20 56 L110 56 L95 140 L20 170 Z" fill="#9C8A62"/><path d="M180 56 L240 56 L230 110 L190 120 Z" fill="#9C8A62"/><path d="M560 230 q30 -10 45 10 q-20 20 -45 -10 z" fill="#9C8A62"/><path d="M340 200 q12 -8 20 0 q-8 10 -20 0 z" fill="#9C8A62"/>';
 var alts=[[210,95,W.a],[350,200,W.b],[585,238,W.c]];
 alts.forEach(function(a){s+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="150" fill="#7CF2B0" fill-opacity=".08" stroke="#7CF2B0" stroke-width="2" stroke-dasharray="6 5"/>'});
 s+='<ellipse cx="300" cy="96" rx="46" ry="22" fill="#6B6B6B" opacity=".75"/>';
 var route='M60 110 C160 150 260 150 380 150 C470 150 540 190 590 232';
 s+='<path d="'+route+'" fill="none" stroke="#fff" stroke-width="3"/>';
 s+='<path d="M380 150 L350 200" fill="none" stroke="#D64545" stroke-width="3" stroke-dasharray="7 5" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.6;.62;1" dur="'+dur+'s" repeatCount="indefinite"/></path>';
 s+='<g transform="translate(380 150)"><circle r="7" fill="#FFD23F" stroke="#0f3558" stroke-width="2"/></g>';
 alts.forEach(function(a){s+='<g transform="translate('+a[0]+' '+a[1]+')"><path d="M0 -9 L8 5 L-8 5 Z" fill="#fff" stroke="#243447" stroke-width="2"/></g>'});
 s+='<g>'+plane('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" rotate="auto" keyPoints="0;.55;.55;.55" keyTimes="0;.6;.62;1" calcMode="linear" path="'+route+'"/><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.6;.62;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
 s+='<g opacity="0">'+plane('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" rotate="auto" keyPoints="0;0;1;1" keyTimes="0;.62;.85;1" calcMode="linear" path="M380 150 L350 200"/><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.61;.62;1" dur="'+dur+'s" repeatCount="indefinite"/></g></g>';
 s+=LB(210,124,W.a,10,'#fff','middle','#243447')+LB(350,262,W.b,10,'#fff','middle','#243447')+LB(560,260,W.c,10,'#fff','end','#243447')+LB(392,168,W.etp,10,'#0f3558','start','#FFD23F')+LB(320,97,W.ash,10,'#fff','middle','#6B6B6B');
 s+='<g opacity="0">'+LBW(165,222,W.dec,10.5,'#fff','middle','#D64545',220)+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.62;.64;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
 var L=LIST(W.items,288,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},
/* 13 総合事例の時間の流れ（共通の描き方） */
_caseTL:function(title,ev){
 setK(1);var dur=14,n=ev.length,y=62;
 var s=TTL(320,30,title,15,'#0f3558',600),rows='',top=y;
 ev.forEach(function(e,i){var n1=LI(e[1],11.5,440).length,n2=LI(e[2],10.5,440).length,h=n1*FS(11.5)*1.3+n2*FS(10.5)*1.3+18;
  rows+='<g>'+R(110,y,510,h,'#fff',10,' stroke="#D9E3EC"')+'<rect x="110" y="'+y+'" width="510" height="'+h+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.5)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+tx(70,y+h/2+FS(11)*0.35,e[0],11,'#2F6FD6',900)+WR(126,y+8+n1*FS(11.5)*1.3/2+FS(11.5)*0.3,e[1],11.5,D,900,480,'start')+WR(126,y+12+n1*FS(11.5)*1.3+n2*FS(10.5)*1.3/2+FS(10.5)*0.3,e[2],10.5,G,800,480,'start')+'</g>';y+=h+8});
 s+='<line x1="70" y1="'+(top+4)+'" x2="70" y2="'+(y-8)+'" stroke="#C8D3DE" stroke-width="4"/>'+rows;
 s+='<circle cx="70" r="8" fill="#FFD23F" stroke="#0f3558"><animate attributeName="cy" values="'+(top+10)+';'+(y-14)+'" dur="'+dur+'s" repeatCount="indefinite"/></circle>';
 y+=6;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 14 総合事例③：夏の午後の雷雨とダイバート（金浦→関西・架空） */
case_summer:function(l){
 var W=({ja:{t:'事例③の流れ ― 夏の午後の金浦→関西（練習用・架空の値）',ev:[['11:30','TAF：15〜18時に雷雨（TEMPO TSRA）','関西の到着予定16:10がその時間に入る'],['12:00','燃料と代替空港','待機と迂回の追加燃料。代替空港は同じ雷雨の列に入らない中部'],['15:40','到着地の雷雨で待機','管制のEFCと残りの燃料を確かめる'],['16:05','マイクロバーストの警報','進入をやめて復行（ゴーアラウンド）'],['16:25','ダイバートの判断','2回目の待機で基準の燃料に近づく → 中部へ'],['17:20','中部に着陸','地上の手配・乗員の勤務時間・再出発か運航終了か']]},
  ko:{t:'사례 ③의 흐름 — 여름 오후의 김포→간사이(연습용·가상의 값)',ev:[['11:30','TAF: 15~18시 뇌우(TEMPO TSRA)','간사이 도착 예정 16:10이 그 시간에 든다'],['12:00','연료와 교체공항','대기와 우회의 추가 연료. 교체공항은 같은 뇌우 열에 들지 않는 주부'],['15:40','도착지 뇌우로 대기','관제의 EFC와 남은 연료를 확인'],['16:05','마이크로버스트 경보','접근을 멈추고 실패접근(고어라운드)'],['16:25','다이버트 판단','두 번째 대기로 기준 연료에 가까워진다 → 주부로'],['17:20','주부에 착륙','지상 준비·승무원 근무시간·재출발인지 운항 종료인지']]},
  en:{t:'Case 3 flow: a summer afternoon, Gimpo to Kansai (exercise, fictitious values)',ev:[['11:30','TAF: thunderstorms 15–18 (TEMPO TSRA)','The 16:10 arrival at Kansai falls within that period'],['12:00','Fuel and alternates','Additional fuel for holding and deviations; Chubu chosen as the alternate, clear of the same line of storms'],['15:40','Holding for storms at the destination','Check the ATC EFC time and remaining fuel'],['16:05','Microburst alert','Approach abandoned, go-around'],['16:25','Diversion decision','A second hold brings fuel close to the limit → divert to Chubu'],['17:20','Landing at Chubu','Ground arrangements, crew duty time, re-departure or end of operation']]}})[l];
 if(!W)return F.case_summer('ja');return F._caseTL(W.t,W.ev)},

/* 15 総合事例④：台風の接近（架空） */
case_typhoon:function(l){
 var W=({ja:{t:'事例④の流れ ― 台風の接近と那覇の便（練習用・架空の値）',ev:[['2日前','予報円と暴風域の時刻を読む','那覇に暴風域がかかるのは明日18時〜明後日6時の見込み'],['前日 10:00','欠航と時刻の変更','明日15時以降の那覇発着を欠航、朝の便を前倒し・増便'],['前日 18:00','航空機の避難','那覇に泊まる機体を福岡へ回送（夜間駐機を避ける）'],['当日 12:00','地上の備え','地上の機材・車両の固定、搭乗橋の格納、ランプ作業の中止'],['通過後','運航の再開','滑走路・施設の点検の後、乗員と機体の配置を戻して臨時便']]},
  ko:{t:'사례 ④의 흐름 — 태풍 접근과 나하 편(연습용·가상의 값)',ev:[['이틀 전','예보원과 폭풍역 시각 읽기','나하에 폭풍역이 걸리는 것은 내일 18시~모레 6시 전망'],['전날 10:00','결항과 시각 변경','내일 15시 이후 나하 출발·도착 결항, 아침 편을 앞당기거나 증편'],['전날 18:00','항공기 피난','나하에 밤을 보낼 기체를 후쿠오카로 회송(야간 주기를 피한다)'],['당일 12:00','지상 대비','지상 장비·차량 고정, 탑승교 격납, 램프 작업 중지'],['통과 뒤','운항 재개','활주로·시설 점검 뒤 승무원과 기체 배치를 되돌려 임시편']]},
  en:{t:'Case 4 flow: an approaching typhoon and flights to Naha (exercise, fictitious values)',ev:[['D−2','Read the forecast circle and storm-area timing','Storm-force winds expected at Naha from 18:00 tomorrow to 06:00 the day after'],['D−1 10:00','Cancellations and retiming','Cancel Naha flights from 15:00 tomorrow; bring morning flights forward or add extras'],['D−1 18:00','Evacuating aircraft','Ferry the aircraft due to night-stop at Naha to Fukuoka'],['Day 12:00','Ground preparations','Secure ground equipment and vehicles, retract boarding bridges, stop ramp work'],['After','Resuming operations','After runway and facility checks, reposition crews and aircraft and run extra flights']]}})[l];
 if(!W)return F.case_typhoon('ja');return F._caseTL(W.t,W.ev)},
/* 16 総合事例⑤：急病人と回航（架空） */
case_medical:function(l){
 var W=({ja:{t:'事例⑤の流れ ― 急病人と回航（練習用・架空の値）',ev:[['02:10','客室から急病人の報告','機内の医師を呼び、地上の医療助言サービスにつなぐ'],['02:20','回航の判断','医療助言と機長の判断で、最も近い適切な空港を選ぶ'],['02:25','空港の比較','医療施設・滑走路・天気・ハンドリング・CIQを比べる'],['02:30','重さと燃料','最大着陸重量を超えるなら燃料の投棄または重量超過着陸の手順'],['03:15','着陸','救急車の待機、同行者と手荷物を降ろす'],['04:30','再出発の判断','乗員の勤務時間・新しい飛行計画と承認']]},
  ko:{t:'사례 ⑤의 흐름 — 응급 환자와 회항(연습용·가상의 값)',ev:[['02:10','객실에서 응급 환자 보고','기내 의사를 부르고 지상 의료 자문 서비스에 연결'],['02:20','회항 판단','의료 자문과 기장 판단으로 가장 가까운 적절한 공항을 고른다'],['02:25','공항 비교','의료 시설·활주로·날씨·조업·CIQ를 비교'],['02:30','무게와 연료','최대 착륙 중량을 넘으면 연료 방출이나 중량 초과 착륙 절차'],['03:15','착륙','구급차 대기, 동행자와 수하물 하기'],['04:30','재출발 판단','승무원 근무시간·새 비행계획과 승인']]},
  en:{t:'Case 5 flow: a medical emergency and diversion (exercise, fictitious values)',ev:[['02:10','Cabin reports a sick passenger','Page for a doctor on board and connect to the ground medical advisory service'],['02:20','Diversion decision','On medical advice and the captain’s judgement, choose the nearest suitable airport'],['02:25','Comparing airports','Compare medical facilities, runway, weather, handling and CIQ'],['02:30','Weight and fuel','Above maximum landing weight: jettison fuel or follow the overweight-landing procedure'],['03:15','Landing','Ambulance standing by; offload companions and their baggage'],['04:30','Re-departure decision','Crew duty time, new flight plan and release']]}})[l];
 if(!W)return F.case_medical('ja');return F._caseTL(W.t,W.ev)},

/* 17 総合事例⑥：爆発物の脅迫（架空） */
case_threat:function(l){
 var W=({ja:{t:'事例⑥の流れ ― 爆発物の脅迫への対応（練習用・架空の値）',ev:[['10:05','脅迫の電話を受ける','内容・時刻・話し方をそのまま記録する'],['10:15','信ぴょう性の評価','会社の保安の手順で評価チームが判断（具体的か）'],['10:20','機長に伝える','評価と助言を伝え、最も近い適切な空港を相談'],['10:50','着陸・隔離駐機場','当局の指示で離れた駐機場へ。旅客は手荷物を持たずに降機'],['11:30','再検査','旅客・手荷物・貨物・機体を検査し、当局の判断を待つ'],['14:00','運航の再開','安全の確認後、乗員の勤務時間・新しい飛行計画で再出発']]},
  ko:{t:'사례 ⑥의 흐름 — 폭발물 협박 대응(연습용·가상의 값)',ev:[['10:05','협박 전화 접수','내용·시각·말투를 그대로 기록'],['10:15','신빙성 평가','회사 보안 절차에 따라 평가팀이 판단(구체적인가)'],['10:20','기장에게 전달','평가와 조언을 전하고 가장 가까운 적절한 공항을 상의'],['10:50','착륙·격리 주기장','당국 지시로 떨어진 주기장으로. 승객은 짐 없이 하기'],['11:30','재검색','승객·수하물·화물·기체를 검색하고 당국 판단을 기다린다'],['14:00','운항 재개','안전 확인 뒤 승무원 근무시간·새 비행계획으로 재출발']]},
  en:{t:'Case 6 flow: responding to a bomb threat (exercise, fictitious values)',ev:[['10:05','Threat call received','Record the wording, time and manner exactly'],['10:15','Assessing credibility','The threat assessment team decides under the company security programme (is it specific?)'],['10:20','Informing the captain','Pass on the assessment and advice; discuss the nearest suitable airport'],['10:50','Landing and isolated stand','On the authorities’ instruction, park at an isolated stand; passengers leave without cabin baggage'],['11:30','Re-screening','Search passengers, baggage, cargo and aircraft; await the authorities’ decision'],['14:00','Resuming','Once cleared, re-depart with a new flight plan within crew duty limits']]}})[l];
 if(!W)return F.case_threat('ja');return F._caseTL(W.t,W.ev)}
};
for(var k in F)if(k.charAt(0)!=='_')window.FIGS[k]=H.FIX2(F[k]);
})();
