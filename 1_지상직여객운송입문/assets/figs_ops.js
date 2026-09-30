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
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
