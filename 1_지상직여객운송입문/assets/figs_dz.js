/* 防除雪氷（デアイシング・アンチアイシング）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   運航管理の実務 7-1・7-2（くわしく）と、空港支店の運営の実務 4-5（くわしく）で使う。数字は一般的な例
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上、文は WR／LBW、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D;
function BADGE(x,y,n,sz,bg){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="'+(bg||'#FFD23F')+'" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(n===1)return 'values="'+hi+';'+hi+'" keyTimes="0;1"';if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
function SVG(h,s){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+h.toFixed(0)+'" role="img">'+R(0,0,640,h,'#F7FAFD')+s+'</svg>'}
var F={
/* 1 作業の流れと担当：予報から離陸前の点検まで。担当の色：運航管理（紫）・機長（青）・整備（緑）・ハンドリング会社（橙） */
dz_flow:function(l){
 var W=({ja:{t:'防除雪氷の流れと、それぞれの担当',who:['運航管理','機長','整備・ハンドリング','ハンドリング会社','整備','整備→機長','機長','機長・運航管理'],st:['雪・霜の予報で準備を指示：装置・液の量・人・作業場所（パッド）を確かめ、出発の順番を考える','外部の点検で必要かを判断し、作業を頼む（する・しないの最終決定は機長）','作業の方法（1段階・2段階）、液の種類、水で薄める割合を決める','まず温めた液（Type I）で雪・氷を落とし、次に Type IV などで守る','作業のあとに点検し、装置が機体から離れたら「オールクリア」を伝える','記録を伝える：外気温・作業の種類・液の種類と名前・薄める割合・散布を始めた時刻（UTC）・日付','ホールドオーバータイムを決め、離陸前に翼の状態を確かめる','時間を超えた・付着が疑わしいときは、もう一度処理する']},
  ko:{t:'방빙·제빙의 흐름과 각각의 담당',who:['운항관리','기장','정비·조업사','조업사','정비','정비→기장','기장','기장·운항관리'],st:['눈·서리 예보로 준비를 지시: 장비·용액량·인원·작업 장소(패드)를 확인하고 출발 순서를 검토','외부 점검으로 필요 여부를 판단해 작업을 요청(할지 말지 최종 결정은 기장)','작업 방식(1단계·2단계), 용액 종류, 물과 섞는 비율을 정한다','먼저 데운 용액(Type I)으로 눈·얼음을 떨어내고, 다음에 Type IV 등으로 막는다','작업 후 점검하고, 장비가 기체에서 떨어지면 ‘올 클리어’를 알린다','기록을 알린다: 외기온도·작업 종류·용액 종류와 이름·희석 비율·분사 시작 시각(UTC)·날짜','홀드오버 타임을 정하고, 이륙 전에 날개 상태를 확인한다','시간을 넘거나 결빙이 의심되면 다시 처리한다']},
  en:{t:'The de-icing flow and who does what',who:['Dispatch/OCC','Captain','Maint. & handler','Handler','Maintenance','Maint. → captain','Captain','Captain & OCC'],st:['A snow or frost forecast triggers preparation: check equipment, fluid stocks, staff and the pad, and think about the departure order','After an external check, decide whether treatment is needed and request it (the captain makes the final call)','Agree the method (one-step or two-step), fluid type and fluid/water mix','First remove snow and ice with heated fluid (Type I), then protect with Type IV or similar','Inspect after treatment and give the “all clear” once equipment has moved away','Pass on the record: outside temperature, type of treatment, fluid type and name, mix ratio, start time of application (UTC) and date','Set the holdover time and check the wings before take-off','If the time is exceeded or contamination is suspected, treat the aircraft again']}})[l];
 if(!W)return F.dz_flow('ja');
 setK(1);
 var pc=['#6B4FA0','#2F6FD6','#2E9B5F','#E08A2E','#2E9B5F','#2E9B5F','#2F6FD6','#2F6FD6'];
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=62,lh=FS(11)*1.3,n=W.st.length,dur='16s';
 W.st.forEach(function(t,i){var nn=LI(t,11,380).length,nw=LI(W.who[i],11,130).length,h=Math.max(nn,nw)*lh+16;
  s+='<g>'+R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.5)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+BADGE(44,y+h/2,i+1,11)+WR(66,y+h/2+FS(11)*0.35,t,11,D,800,380,'start')+R(462,y+6,150,h-12,pc[i],8)+WR(537,y+h/2+FS(11)*0.35,W.who[i],11,'#fff',900,130)+'</g>';
  y+=h;if(i<n-1){s+=ARW(240,y+2,240,y+12,'#9FB0C2',3);y+=14}});
 y+=10;return SVG(y,s)},
/* 2 液をかけない所：上から見た機体に、かける面（緑）と直接かけない所（赤い番号）。トラックが翼のまわりを動く */
dz_nospray:function(l){
 var W=({ja:{t:'液をかける面と、直接かけてはいけない所',ok:'かける面：主翼・尾翼の上面、胴体の上',ng:['ピトー管・静圧孔・温度センサー（機首）','操縦室・客室の窓（熱い液で傷む）','エンジン・APUの空気の取り入れ口','ブレーキ・車輪・逆推力装置','空調の取り入れ口・排気口'],tr:'作業車',note:'作業車は機体から一定の距離（例：3m）より近づかない。作業中はパーキングブレーキとチョーク'},
  ko:{t:'용액을 뿌리는 면과 직접 뿌리면 안 되는 곳',ok:'뿌리는 면: 주날개·꼬리날개 윗면, 동체 위',ng:['피토관·정압공·온도 센서(기수)','조종실·객실 창문(뜨거운 액에 손상)','엔진·APU 공기 흡입구','브레이크·바퀴·역추력장치','공조 흡입구·배출구'],tr:'작업차',note:'작업차는 기체에서 일정 거리(예: 3m)보다 가까이 가지 않는다. 작업 중에는 주차 브레이크와 초크'},
  en:{t:'Where fluid goes, and where it must not be sprayed directly',ok:'Spray: upper wing and tail surfaces, top of fuselage',ng:['Pitot tubes, static ports, temperature probes (nose)','Flight deck and cabin windows (hot fluid can damage them)','Engine and APU air intakes','Brakes, wheels and thrust reversers','Air-conditioning inlets and outlets'],tr:'Truck',note:'Trucks keep a set distance from the aircraft (e.g. 3 m). Parking brake set and chocks in place during treatment'}})[l];
 if(!W)return F.dz_nospray('ja');
 setK(1);
 var cx=320,cy=196,k=7.6,s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,282,'#EAF2F9',14);
 /* かける面：機体を緑で描く（主翼・尾翼・胴体の上） */
 s+='<g transform="translate('+cx+' '+cy+') scale('+k+')">'+(window.ACFT?window.ACFT.top({c:'#E3F5E7',w:'#A8E0B4'}):plane('#fff'))+'</g>';
 var pts=[[cx+19.2*k,cy],[cx+16*k,cy-2.6*k],[cx+10.6*k,cy-5.3*k],[cx+1*k,cy+4.6*k],[cx+5*k,cy+1*k]];
 pts.forEach(function(p,i){s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="15" fill="#D64545" opacity=".25"><animate attributeName="r" values="11;17;11" keyTimes="0;.5;1" dur="2.4s" repeatCount="indefinite"/></circle>'+BADGE(p[0],p[1],i+1,11,'#fff')});
 s+='<g transform="translate('+(cx-20.6*k)+' '+cy+')">'+BADGE(0,0,3,11,'#fff')+'</g>';
 /* 作業車：左の主翼のまわりを動く */
 s+='<g>'+R(-16,-9,32,18,'#E08A2E',5,' stroke="#0f3558" stroke-width="1.2"')+'<animateMotion dur="10s" repeatCount="indefinite" path="M'+(cx+9*k)+' '+(cy-6*k)+' L'+(cx+2*k)+' '+(cy-19.5*k)+' L'+(cx-8*k)+' '+(cy-19.5*k)+' L'+(cx-9*k)+' '+(cy-6*k)+' L'+(cx+9*k)+' '+(cy-6*k)+'"/></g>';
 s+=LBW(510,296,W.ok,11,'#1F6B37','middle','#fff',200)+LB(118,82,W.tr,11,'#fff','middle','#E08A2E');
 var L=LIST(W.ng.concat([W.note]),362,600,11);
 return SVG(L.y+8,s+L.s)},
/* 3 ホールドオーバータイムの数え始め：1段階は散布の開始から、2段階は防氷液の散布の開始から。超えたら離陸前の点検か再処理 */
dz_hot:function(l){
 var W=({ja:{t:'ホールドオーバータイムは、いつから数えるか',r1:'1段階',r2:'2段階',de:'除氷',ai:'防氷',hot:'ホールドオーバータイム',st:'ここから数える',now:'地上走行',over:'超えたら：機体の外から点検、または再処理',ax:'作業の開始からの時間（分）',n:['1段階：同じ液で除氷と防氷をする。散布を始めた時刻から数える','2段階：除氷のあと別の液で防氷する。防氷液の散布を始めた時刻から数える','長さは、雪や雨の種類・強さ、外気温、液の種類と割合で変わる（表は毎年更新される）','付着が始まったら、時間の中でも終わり。地上走行が長くなりそうなら、出発の順番や時刻を調整する']},
  ko:{t:'홀드오버 타임은 언제부터 세는가',r1:'1단계',r2:'2단계',de:'제빙',ai:'방빙',hot:'홀드오버 타임',st:'여기서부터 센다',now:'지상 활주',over:'넘으면: 기체 밖에서 점검 또는 재처리',ax:'작업 시작부터의 시간(분)',n:['1단계: 같은 용액으로 제빙과 방빙을 한다. 분사를 시작한 시각부터 센다','2단계: 제빙 후 다른 용액으로 방빙한다. 방빙 용액 분사를 시작한 시각부터 센다','길이는 눈·비의 종류와 강도, 외기온도, 용액 종류와 비율로 바뀐다(표는 매년 갱신된다)','결빙이 시작되면 시간 안이라도 끝. 지상 활주가 길어질 것 같으면 출발 순서와 시각을 조정한다']},
  en:{t:'When does the holdover time start?',r1:'One-step',r2:'Two-step',de:'De-ice',ai:'Anti-ice',hot:'Holdover time',st:'Starts here',now:'Taxiing',over:'Exceeded: check from outside or re-treat',ax:'Minutes from the start of treatment',n:['One-step: de-icing and anti-icing with the same fluid; the clock starts when application begins','Two-step: de-icing, then anti-icing with a different fluid; the clock starts when anti-icing fluid application begins','The length depends on the type and intensity of precipitation, outside temperature, and fluid type and mix (tables are updated every year)','If contamination starts forming, the time is over even within the window. If taxiing looks long, adjust the departure order and time']}})[l];
 if(!W)return F.dz_hot('ja');
 setK(1);
 var X=function(m){return 130+m/40*470},dur='12s',s=TTL(320,30,W.t,15,'#0f3558',600);
 var rows=[[W.r1,[[0,4,'#E08A2E',W.de+'+'+W.ai]],0,22],[W.r2,[[0,6,'#E08A2E',W.de],[6,9,'#2E9B5F',W.ai]],6,30]];
 [0,10,20,30,40].forEach(function(m){s+='<line x1="'+X(m)+'" y1="78" x2="'+X(m)+'" y2="282" stroke="#E3E9EF"/>'+tx(X(m),300,String(m),11,'#5B6B7D',700)});
 s+=tx(365,322,W.ax,11,'#0f3558',800);
 rows.forEach(function(r,i){var y=104+i*96;
  s+=tx(64,y+8,r[0],12,'#0f3558',900);
  r[1].forEach(function(b){s+=R(X(b[0]),y-10,X(b[1])-X(b[0]),22,b[2],5)});
  s+=R(X(r[2]),y+20,X(r[3])-X(r[2]),18,'#7BD389',5)+tx((X(r[2])+X(r[3]))/2,y+33,W.hot,11,'#0f3558',900);
  s+='<line x1="'+X(r[2])+'" y1="'+(y-18)+'" x2="'+X(r[2])+'" y2="'+(y+44)+'" stroke="#D64545" stroke-width="2.5"/>'+LB(X(r[2])+4,y+62,W.st,11,'#D64545','start','#fff');
  s+=R(X(r[3]),y+20,X(40)-X(r[3]),18,'#F6C3C3',5)});
 s+='<g>'+R(-6,0,12,206,'#2F6FD6',3,' opacity=".25"')+'<animateTransform attributeName="transform" type="translate" values="'+X(0)+' 78;'+X(40)+' 78" keyTimes="0;1" dur="'+dur+'" repeatCount="indefinite"/></g>';
 s+=LBW(430,368,W.over,11,'#fff','middle','#D64545',340);
 var L=LIST(W.n,408,600,11);
 return SVG(L.y+8,s+L.s)},
/* 4 支店の冬の準備：シーズン前・シーズン中（毎月・毎日・毎便）・シーズン後 */
dz_season:function(l){
 var W=({ja:{t:'支店の冬の準備（防除雪氷）',cols:['シーズン前（9〜10月）','シーズン中（10〜3月）','シーズン後（4月）'],it:[['ハンドリング会社の契約・装置・作業場所を確かめる','液の確保量を確かめ、本社に知らせる','担当者の教育と資格を確かめる','品質の点検（監査）を行う'],['屈折計を毎月自己テスト（結果を記録）','その日の最初の作業の前に、ノズルから液を取って検査','液を貯める・薄める・補充するたびに検査','便ごとの請求書に整備の署名をもらい、毎日まとめる'],['記録をまとめ、遅れ・費用・不具合を振り返る','次の冬の契約と量を見直す']]},
  ko:{t:'지점의 겨울 준비(방빙·제빙)',cols:['시즌 전(9~10월)','시즌 중(10~3월)','시즌 후(4월)'],it:[['조업사 계약·장비·작업 장소를 확인한다','용액 확보량을 확인해 본사에 알린다','담당자 교육과 자격을 확인한다','품질 점검(심사)을 한다'],['굴절계를 매월 자가 테스트(결과 기록)','그날 첫 작업 전에 노즐에서 용액을 채취해 검사','용액을 저장·희석·보충할 때마다 검사','편별 청구서에 정비 서명을 받아 매일 정리'],['기록을 정리해 지연·비용·문제를 돌아본다','다음 겨울 계약과 물량을 다시 검토한다']]},
  en:{t:'The station’s winter preparation (de-icing)',cols:['Before (Sep–Oct)','During (Oct–Mar)','After (Apr)'],it:[['Check the handler’s contract, equipment and treatment areas','Confirm fluid stocks and report them to head office','Check staff training and qualifications','Carry out a quality check (audit)'],['Self-test the refractometer every month and record it','Before the first job of the day, sample fluid from the nozzle and test it','Test fluid each time it is stored, mixed or topped up','Get maintenance to sign each flight’s invoice and collect them daily'],['Compile the records and review delays, costs and problems','Review next winter’s contract and quantities']]}})[l];
 if(!W)return F.dz_season('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),lh=FS(11)*1.3,n=3,dur='12s',cw=190,xs=[20,225,430],cc=['#2F6FD6','#E08A2E','#2E9B5F'],ymax=0;
 xs.forEach(function(x,i){var y=62,nh=LI(W.cols[i],12,cw-16).length,hh=nh*FS(12)*1.3+14;
  s+='<g>'+R(x,y,cw,hh,cc[i],10)+WR(x+cw/2,y+hh/2+FS(12)*0.35,W.cols[i],12,'#fff',900,cw-16)+'</g>';y+=hh+8;
  W.it[i].forEach(function(t,j){var nn=LI(t,11,cw-24).length,h=nn*lh+14;s+='<g>'+R(x,y,cw,h,'#fff',8,' stroke="#C8D3DE"')+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="'+h+'" rx="8" fill="'+cc[i]+'" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.18)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(x+12,y+h/2+FS(11)*0.35,t,11,D,800,cw-24,'start')+'</g>';y+=h+6});
  ymax=Math.max(ymax,y)});
 return SVG(ymax+12,s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
