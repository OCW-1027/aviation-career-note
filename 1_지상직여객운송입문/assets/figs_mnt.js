/* 航空機と整備（MNT）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   737（小型機）と787（中大型機）を比べる図が中心。数字は一般的な例。作成ルール：00_그림작성규칙.md */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,planeS=H.planeS,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D;
function BADGE(x,y,n,sz,bg){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="'+(bg||'#FFD23F')+'" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
function SVG(h,s){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+h.toFixed(0)+'" role="img">'+R(0,0,640,h,'#F7FAFD')+s+'</svg>'}
/* 縦に並ぶ手順と、右側の担当の札。順に光る */
function STEPS(t,st,who,pc,dur){var s=TTL(320,30,t,15,'#0f3558',600),y=62,lh=FS(11)*1.3,n=st.length;
 st.forEach(function(x,i){var nn=LI(x,11,380).length,nw=LI(who[i],11,130).length,h=Math.max(nn,nw)*lh+16;
  s+='<g>'+R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.5)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+BADGE(44,y+h/2,i+1,11)+WR(66,y+h/2+FS(11)*0.35,x,11,D,800,380,'start')+R(462,y+6,150,h-12,pc[i],8)+WR(537,y+h/2+FS(11)*0.35,who[i],11,'#fff',900,130)+'</g>';
  y+=h;if(i<n-1){s+=ARW(240,y+2,240,y+12,'#9FB0C2',3);y+=14}});
 return SVG(y+10,s)}
var F={
/* 0-1 耐空性の鎖：設計の証明 → 1機ごとの証明 → 維持 → 毎回の出発の確認 */
mnt_air:function(l){
 var W=({ja:{t:'「飛べる状態」は4つの段階で守られる',st:['型式証明：その機種の設計が安全基準に合っていることを、設計した国の当局が証明する','耐空証明：1機ごとに、登録した国の当局が「この機体は安全に飛べる」と証明する','耐空性の維持：会社の整備規程と整備プログラムに沿って点検・修理し、改善の指示（AD）を守り、記録を残す','出発の確認：毎回の飛行の前に整備士が点検し、確認の署名をして機長に渡す'],who:['メーカー・設計国の当局','登録国の当局','航空会社（整備）','確認整備士・機長']},
  ko:{t:'‘날 수 있는 상태’는 네 단계로 지켜진다',st:['형식증명: 그 기종의 설계가 안전 기준에 맞는다는 것을 설계국 당국이 증명한다','감항증명: 한 대마다 등록국 당국이 ‘이 기체는 안전하게 날 수 있다’고 증명한다','감항성 유지: 회사의 정비규정과 정비 프로그램에 따라 점검·수리하고, 감항성개선지시(AD)를 지키며 기록을 남긴다','출발 확인: 매 비행 전에 정비사가 점검하고 확인 서명을 해 기장에게 넘긴다'],who:['제작사·설계국 당국','등록국 당국','항공사(정비)','확인정비사·기장']},
  en:{t:'Airworthiness is protected in four stages',st:['Type certificate: the authority of the state of design certifies that the design meets the safety standards','Certificate of airworthiness: for each aircraft, the authority of the state of registry certifies it is fit to fly','Continuing airworthiness: inspections and repairs under the airline’s maintenance programme, compliance with airworthiness directives (ADs) and records','Release for each flight: an engineer checks the aircraft before every flight, signs the release and hands it to the captain'],who:['Manufacturer & state of design','State of registry','Airline (maintenance)','Certifying engineer & captain']}})[l];
 if(!W)return F.mnt_air('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#6B4FA0','#2F6FD6','#2E9B5F','#E08A2E'],'12s')},
/* 0-2 整備の組織：本社の整備本部の中の4つの役割と、現場（自社のライン整備・海外の委託・重整備） */
mnt_org:function(l){
 var W=({ja:{t:'整備の組織：本社と現場',top:'整備本部（本社）',mid:['整備の計画・技術','品質の保証','部品・資材','整備の統制（MCC）'],bot:['ライン整備（自社の基地）','海外の空港（駐在整備士＋委託先）','重整備（自社の格納庫・外部の工場）'],n:['整備の計画・技術：どの機体をいつ点検するかを決め、メーカーの情報や改善の指示を読み込む','品質の保証：社内の監査と、委託先の審査・教育の確認','部品・資材：部品の在庫と、故障のときに急いで送る手配','整備の統制（MCC）：24時間、各空港の不具合を受けて判断と指示を出す']},
  ko:{t:'정비 조직: 본사와 현장',top:'정비본부(본사)',mid:['정비 계획·기술','품질 보증','부품·자재','정비 통제(MCC)'],bot:['라인 정비(자사 기지)','해외 공항(주재 정비사+위탁처)','중정비(자사 격납고·외부 공장)'],n:['정비 계획·기술: 어느 기체를 언제 점검할지 정하고, 제작사 정보와 개선 지시를 반영한다','품질 보증: 사내 감사와 위탁처 심사·교육 확인','부품·자재: 부품 재고와 고장 때 급히 보내는 수배','정비 통제(MCC): 24시간 각 공항의 결함을 받아 판단하고 지시를 낸다']},
  en:{t:'The maintenance organisation: head office and the field',top:'Maintenance division (head office)',mid:['Planning & engineering','Quality assurance','Parts & materials','Maintenance control (MCC)'],bot:['Line maintenance (own bases)','Overseas airports (resident engineers + contractors)','Heavy maintenance (own hangar or outside shop)'],n:['Planning and engineering: decide which aircraft is checked when, and act on manufacturer information and directives','Quality assurance: internal audits and audits and training checks of contractors','Parts and materials: stock and urgent shipment of parts when something breaks','Maintenance control (MCC): receives defects from every airport around the clock and makes decisions and gives instructions']}})[l];
 if(!W)return F.mnt_org('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),lh=FS(11)*1.3,dur='8s';
 var th=Math.max(LI(W.top,12,300).length*FS(12)*1.3+16,40);s+=R(160,58,320,th,'#0f3558',10)+WR(320,58+th/2+FS(12)*0.35,W.top,12,'#fff',900,300);
 var y1=58+th+34,mh=0;W.mid.forEach(function(t){mh=Math.max(mh,LI(t,11,126).length*lh+16)});
 W.mid.forEach(function(t,i){var x=20+i*152,cx=x+68;s+='<path d="M320 '+(58+th)+' L320 '+(y1-14)+' L'+cx+' '+(y1-14)+' L'+cx+' '+y1+'" fill="none" stroke="#9FB0C2" stroke-width="2"/>'+R(x,y1,136,mh,'#2F6FD6',8)+WR(cx,y1+mh/2+FS(11)*0.35,t,11,'#fff',900,126);
  s+='<circle r="5" fill="#FFD23F"><animateMotion dur="'+dur+'" begin="'+(i*0.5)+'s" repeatCount="indefinite" path="M320 '+(58+th)+' L320 '+(y1-14)+' L'+cx+' '+(y1-14)+' L'+cx+' '+y1+'"/></circle>'});
 var y2=y1+mh+40,bh=0;W.bot.forEach(function(t){bh=Math.max(bh,LI(t,11,176).length*lh+16)});
 s+='<line x1="20" y1="'+(y2-18)+'" x2="620" y2="'+(y2-18)+'" stroke="#9FB0C2" stroke-dasharray="6 4"/>';
 W.bot.forEach(function(t,i){var x=20+i*204,cx=x+96;s+=R(x,y2,192,bh,['#2E9B5F','#E08A2E','#6B4FA0'][i],8)+WR(cx,y2+bh/2+FS(11)*0.35,t,11,'#fff',900,176)+'<line x1="'+cx+'" y1="'+(y2-18)+'" x2="'+cx+'" y2="'+y2+'" stroke="#9FB0C2" stroke-width="2"/>'});
 s+='<line x1="'+(20+3*152+68)+'" y1="'+(y1+mh)+'" x2="'+(20+3*152+68)+'" y2="'+(y2-18)+'" stroke="#D64545" stroke-width="2.5" stroke-dasharray="5 3"><animate attributeName="stroke-dashoffset" values="0;-16" keyTimes="0;1" dur="1s" repeatCount="indefinite"/></line>';
 var L=LIST(W.n,y2+bh+18,600,11);
 return SVG(L.y+8,s+L.s)},
/* 0-3 折り返しの60分：到着から出発まで、整備と支店の作業が重なる。時刻の線が右へ進む */
mnt_turn:function(l){
 var W=({ja:{t:'折り返しの60分と整備の仕事（例）',rows:['到着・降機','外部点検（ウォークアラウンド）','給油','テクニカルログの確認','不具合の判断（MEL）','整備の確認と署名','搭乗・ドアクローズ'],ax:'到着からの時間（分）',key:'整備の判断が遅れると、搭乗の開始と出発の時刻がずれる。支店は整備の見通しを早く聞く'},
  ko:{t:'턴어라운드 60분과 정비의 일(예)',rows:['도착·하기','외부 점검(워크어라운드)','급유','테크니컬 로그 확인','결함 판단(MEL)','정비 확인과 서명','탑승·도어 클로즈'],ax:'도착부터의 시간(분)',key:'정비 판단이 늦으면 탑승 시작과 출발 시각이 어긋난다. 지점은 정비의 전망을 빨리 듣는다'},
  en:{t:'A 60-minute turnaround and the maintenance tasks (example)',rows:['Arrival & deplaning','External walkaround','Refuelling','Technical log review','Defect decision (MEL)','Maintenance release & signature','Boarding & doors closed'],ax:'Minutes from arrival',key:'If the maintenance decision is late, boarding and departure slip. The station should ask early how maintenance is looking'}})[l];
 if(!W)return F.mnt_turn('ja');setK(1);
 var bars=[[0,12,'#9AA8B8'],[5,20,'#2E9B5F'],[15,35,'#E08A2E'],[3,15,'#2E9B5F'],[12,30,'#D64545'],[30,42,'#2E9B5F'],[35,58,'#2F6FD6']];
 var X=function(m){return 230+m/60*380},s=TTL(320,30,W.t,15,'#0f3558',600),y=66,lh=FS(11)*1.3,dur='12s';
 var top=y;
 W.rows.forEach(function(t,i){var nn=LI(t,11,190).length,h=Math.max(nn*lh+12,30);s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',6)+WR(26,y+h/2+FS(11)*0.35,t,11,D,800,190,'start')+R(X(bars[i][0]),y+h/2-8,X(bars[i][1])-X(bars[i][0]),16,bars[i][2],5);y+=h+2});
 [0,15,30,45,60].forEach(function(m){s+='<line x1="'+X(m)+'" y1="'+top+'" x2="'+X(m)+'" y2="'+y+'" stroke="#C9D3DE" stroke-dasharray="3 3"/>'+tx(X(m),y+20,String(m),11,'#5B6B7D',700)});
 s+=tx(420,y+42,W.ax,11,'#0f3558',800);
 s+='<line x1="0" y1="'+top+'" x2="0" y2="'+y+'" stroke="#0f3558" stroke-width="2.5"><animateTransform attributeName="transform" type="translate" values="'+X(0)+' 0;'+X(60)+' 0" keyTimes="0;1" dur="'+dur+'" repeatCount="indefinite"/></line>';
 y+=56;var nk=LI(W.key,11,560).length,hk=nk*lh+14;s+=R(20,y,600,hk,'#FFF4D6',8)+WR(320,y+hk/2+FS(11)*0.35,W.key,11,'#7A4B00',800,560);
 return SVG(y+hk+10,s)},
/* 1-1 機体の材料：737（アルミ）と787（複合材）を横から並べ、材料の色が順に光る */
mnt_struct:function(l){
 var W=({ja:{t:'機体の材料：737と787',a:'737：主にアルミニウム合金',b:'787：重さの約半分が炭素繊維の複合材',lg:['アルミニウム合金','炭素繊維の複合材','チタン・鋼（脚・エンジンまわり）'],n:['アルミは「疲れ（金属疲労）」と「さび（腐食）」に気をつけ、離着陸の回数に合わせて点検する','複合材はさびず疲れにも強いが、ぶつけた傷が表から見えにくい。地上の車両が当たったら、小さくても必ず整備に知らせる','複合材の胴体には、雷の電気を逃がす金属の網が入っている。雷に打たれたら決められた点検をする']},
  ko:{t:'기체 재료: 737과 787',a:'737: 주로 알루미늄 합금',b:'787: 무게의 약 절반이 탄소섬유 복합재',lg:['알루미늄 합금','탄소섬유 복합재','티타늄·강철(착륙장치·엔진 주변)'],n:['알루미늄은 ‘피로(금속 피로)’와 ‘부식’에 주의하고, 이착륙 횟수에 맞춰 점검한다','복합재는 녹슬지 않고 피로에도 강하지만, 부딪친 손상이 겉에서 잘 보이지 않는다. 지상 장비가 닿으면 작아도 반드시 정비에 알린다','복합재 동체에는 낙뢰 전기를 흘려보내는 금속 망이 들어 있다. 낙뢰를 맞으면 정해진 점검을 한다']},
  en:{t:'Airframe materials: 737 and 787',a:'737: mainly aluminium alloy',b:'787: about half the weight is carbon-fibre composite',lg:['Aluminium alloy','Carbon-fibre composite','Titanium and steel (gear, engine areas)'],n:['Aluminium needs watching for fatigue and corrosion, and checks follow the number of take-offs and landings','Composite does not corrode and resists fatigue, but impact damage can be hard to see from outside. If ground equipment touches the aircraft, however lightly, always tell maintenance','The composite fuselage contains a metal mesh to carry lightning current away; after a strike, set inspections are done']}})[l];
 if(!W)return F.mnt_struct('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='9s',cA='#9AA8B8',cC='#2C7A7B',cT='#B5651D';
 function body(y,comp){var g='<g transform="translate(360 '+y+') scale(7.5 7.5)">'+planeS(comp?'#BFE3E3':'#E3E8EE')+'</g>';return g}
 s+=R(20,58,600,140,'#F0F4F8',12)+body(136,false)+LBW(30,82,W.a,11,'#fff','start','#5B6B7D',200);
 s+=R(20,210,600,140,'#EAF6F6',12)+body(288,true)+LBW(30,234,W.b,11,'#fff','start',cC,200);
 /* 光る帯：胴体と主翼が複合材であることを示す */
 s+='<g opacity=".0"><rect x="20" y="210" width="600" height="140" rx="12" fill="none" stroke="'+cC+'" stroke-width="4"/><animate attributeName="opacity" values="0;1;0;0" keyTimes="0;.25;.5;1" dur="'+dur+'" repeatCount="indefinite"/></g><g opacity="0"><rect x="20" y="58" width="600" height="140" rx="12" fill="none" stroke="#5B6B7D" stroke-width="4"/><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.5;.75;1" dur="'+dur+'" repeatCount="indefinite"/></g>';
 var y=366,lh=FS(11)*1.3;[cA,cC,cT].forEach(function(c,i){var n=LI(W.lg[i],11,560).length;s+=R(20,y,18,18,c,4)+WR(46,y+9+FS(11)*0.35+(n-1)*lh/2,W.lg[i],11,D,800,560,'start');y+=Math.max(24,n*lh+8)});
 var L=LIST(W.n,y+8,600,11);return SVG(L.y+8,s+L.s)},
/* 1-2 空気と電気：737はエンジンの空気（ブリード）で冷暖房・与圧・防氷、787は電気で動かす。粒が流れる */
mnt_bleed:function(l){
 var W=({ja:{t:'冷暖房・与圧・防氷の「力のもと」',a:'737：エンジンの空気（ブリード）',b:'787：電気（発電機）',eng:'エンジン',gen:'発電機',ac:'空調・与圧',wai:'翼の防氷',st:'エンジンの始動',n:['737：エンジンの圧縮機から熱い空気を取り出し、管で空調・与圧・翼の防氷・エンジンの始動に使う','787：エンジンの発電機で電気をつくり、電動の圧縮機で空調・与圧、電熱で翼の防氷、エンジンの始動も電気で行う（エンジンの取り入れ口の防氷だけは空気を使う）','787は管が少なく燃料の効率がよい一方、電気の系統とソフトウェアの管理が大事になる']},
  ko:{t:'냉난방·여압·방빙의 ‘힘의 원천’',a:'737: 엔진의 공기(블리드)',b:'787: 전기(발전기)',eng:'엔진',gen:'발전기',ac:'공조·여압',wai:'날개 방빙',st:'엔진 시동',n:['737: 엔진 압축기에서 뜨거운 공기를 뽑아 관으로 공조·여압·날개 방빙·엔진 시동에 쓴다','787: 엔진 발전기로 전기를 만들고 전동 압축기로 공조·여압, 전열로 날개 방빙, 엔진 시동도 전기로 한다(엔진 흡입구 방빙만은 공기를 쓴다)','787은 관이 적어 연료 효율이 좋지만, 전기 계통과 소프트웨어 관리가 중요해진다']},
  en:{t:'What powers air conditioning, pressurisation and anti-icing',a:'737: engine air (bleed)',b:'787: electricity (generators)',eng:'Engine',gen:'Generator',ac:'Cabin air & press.',wai:'Wing anti-ice',st:'Engine start',n:['737: hot air is tapped from the engine compressor and piped to air conditioning, pressurisation, wing anti-icing and engine starting','787: engine generators make electricity; electric compressors run air conditioning and pressurisation, electric heaters de-ice the wings, and engines are started electrically (only the engine inlet anti-ice still uses air)','The 787 has fewer ducts and burns less fuel, but its electrical systems and software need careful management']}})[l];
 if(!W)return F.mnt_bleed('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='3s';
 function panel(y,title,col,src,dot){var g=R(20,y,600,170,'#F4F7FB',12)+LB(40,y+22,title,11.5,'#fff','start',col);
  g+=R(40,y+60,120,60,'#5B6B7D',10)+tx(100,y+95,W.eng,11,'#fff',900);
  if(src)g+=R(180,y+66,96,48,'#2F6FD6',8)+tx(228,y+95,W.gen,11,'#fff',900);
  var tg=[[W.ac,y+46],[W.wai,y+96],[W.st,y+146]],x0=src?276:160;
  tg.forEach(function(t,i){g+=R(430,t[1]-18,190,36,'#fff',8,' stroke="#C8D3DE"')+tx(525,t[1]+4,t[0],11,D,800);
   var path='M'+x0+' '+(y+90)+' C 350 '+(y+90)+' 350 '+t[1]+' 430 '+t[1];g+='<path d="'+path+'" fill="none" stroke="'+dot+'" stroke-width="'+(src?2:6)+'" stroke-linecap="round" opacity=".55"'+(src?' stroke-dasharray="6 5"':'')+'/>';
   for(var k=0;k<3;k++)g+='<circle r="'+(src?4:5)+'" fill="'+dot+'"><animateMotion dur="'+dur+'" begin="'+(k*1)+'s" repeatCount="indefinite" path="'+path+'"/></circle>'});
  return g}
 s+=panel(58,W.a,'#E08A2E','',"#E08A2E")+panel(242,W.b,'#2F6FD6','gen','#2F6FD6');
 var L=LIST(W.n,428,600,11);return SVG(L.y+8,s+L.s)},
/* 1-3 油圧：737（A・B・スタンバイ、約3,000psi）と787（左・中央・右、約5,000psi）。787のブレーキは電気 */
mnt_hyd:function(l){
 var W=({ja:{t:'油圧の系統と、ブレーキの力のもと',a:'737：油圧3系統（約3,000psi）',b:'787：油圧3系統（約5,000psi）＋電気ブレーキ',sa:['A系統','B系統','スタンバイ'],sb:['左系統','中央系統',''],tg:['操縦翼面','脚の上げ下げ','ブレーキ'],el:'電気（発電機）',n:['どちらも3つの系統があり、1つが壊れても残りで操縦できるように分けてある（図はつながりを単純にしている）','737のブレーキは油圧で動く。787のブレーキは電気で動き、ブレーキの部品ごとに交換しやすい（787の油圧は左・中央・右の3系統）','着陸のあとのブレーキは熱い。次の出発までに冷えないと出発が遅れることがある（ブレーキの温度は整備が確認する）']},
  ko:{t:'유압 계통과 브레이크의 힘의 원천',a:'737: 유압 3계통(약 3,000psi)',b:'787: 유압 3계통(약 5,000psi)+전기 브레이크',sa:['A 계통','B 계통','스탠바이'],sb:['왼쪽 계통','가운데 계통',''],tg:['조종면','착륙장치 올리고 내리기','브레이크'],el:'전기(발전기)',n:['둘 다 계통이 3개라서 하나가 고장 나도 나머지로 조종할 수 있게 나뉘어 있다(그림은 연결을 단순화했다)','737 브레이크는 유압으로 움직인다. 787 브레이크는 전기로 움직이고 부품별로 교환하기 쉽다(787 유압은 왼쪽·가운데·오른쪽 3계통)','착륙 뒤 브레이크는 뜨겁다. 다음 출발까지 식지 않으면 출발이 늦어질 수 있다(브레이크 온도는 정비가 확인한다)']},
  en:{t:'Hydraulic systems and what powers the brakes',a:'737: three hydraulic systems (about 3,000 psi)',b:'787: three hydraulic systems (about 5,000 psi) + electric brakes',sa:['System A','System B','Standby'],sb:['Left','Centre',''],tg:['Flight controls','Landing gear','Brakes'],el:'Electric',n:['Both have three systems, split so the aircraft can still be controlled if one fails (the figure simplifies the connections)','The 737’s brakes are hydraulic. The 787’s are electric, and individual brake units are easier to change (the 787 has left, centre and right hydraulic systems)','Brakes are hot after landing. If they do not cool before the next departure, it can be delayed (maintenance checks brake temperatures)']}})[l];
 if(!W)return F.mnt_hyd('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='2.6s',cs=['#2F6FD6','#2E9B5F','#E08A2E'];
 function panel(y,title,sys,elec){var g=R(20,y,600,190,'#F4F7FB',12)+LBW(32,y+22,title,11.5,'#fff','start','#0f3558',560);
  sys.forEach(function(t,i){var yy=y+56+i*44;if(elec&&i===2){g+=R(40,yy,140,32,'#FFB000',8)+WR(110,yy+20,W.el,11,'#5A3A00',900,130);return}g+=R(40,yy,140,32,cs[i],8)+tx(110,yy+21,t,11,'#fff',900)});
  W.tg.forEach(function(t,i){var yy=y+56+i*44;g+=R(440,yy,170,32,'#fff',8,' stroke="#C8D3DE"')+tx(525,yy+21,t,11,D,800);
   var isE=elec&&i===2,col=isE?'#FFB000':cs[i],path='M180 '+(yy+16)+' L440 '+(yy+16);
   g+='<path d="'+path+'" stroke="'+col+'" stroke-width="'+(isE?3:6)+'" opacity=".5"'+(isE?' stroke-dasharray="7 5"':'')+'/>';
   for(var k=0;k<3;k++)g+='<circle r="4.5" fill="'+col+'"><animateMotion dur="'+dur+'" begin="'+(k*0.86).toFixed(2)+'s" repeatCount="indefinite" path="'+path+'"/></circle>'});
  return g}
 s+=panel(58,W.a,W.sa,false)+panel(262,W.b,W.sb,true);
 var L=LIST(W.n,468,600,11);return SVG(L.y+8,s+L.s)},
/* 1-4 ターボファン・エンジン：空気が入り（ファン）、圧縮され、燃え、タービンを回して出ていく。大半はファンの外を流れる（バイパス） */
mnt_eng:function(l){
 var W=({ja:{t:'ターボファン・エンジンのしくみ',p:['ファン','圧縮機','燃焼室','タービン','排気'],by:'バイパスの空気（推力の大部分）',co:'中心の空気（燃料を燃やす）',n:['前のファンが空気を吸い込み、大部分は外側を流れて推力になる（バイパス）。中心の空気は圧縮され、燃料と燃えてタービンを回す','タービンはファンと圧縮機を回す。バイパス比（外側と中心の空気の比）が大きいほど燃料の効率がよく、音も小さい','鳥や小石を吸い込むとファンの羽根が傷つく。エンジンの点検（ボアスコープ）で中を見ることがある']},
  ko:{t:'터보팬 엔진의 구조',p:['팬','압축기','연소실','터빈','배기'],by:'바이패스 공기(추력의 대부분)',co:'중심 공기(연료를 태운다)',n:['앞의 팬이 공기를 빨아들이고, 대부분은 바깥쪽을 흘러 추력이 된다(바이패스). 중심 공기는 압축되어 연료와 타며 터빈을 돌린다','터빈은 팬과 압축기를 돌린다. 바이패스비(바깥과 중심 공기의 비)가 클수록 연료 효율이 좋고 소음도 작다','새나 작은 돌을 빨아들이면 팬 블레이드가 다친다. 엔진 점검(보어스코프)으로 안을 들여다보기도 한다']},
  en:{t:'How a turbofan engine works',p:['Fan','Compressor','Combustor','Turbine','Exhaust'],by:'Bypass air (most of the thrust)',co:'Core air (burns the fuel)',n:['The fan draws air in; most flows around the outside as thrust (bypass). Core air is compressed, burned with fuel and drives the turbines','The turbines drive the fan and compressor. The higher the bypass ratio (outer to core air), the better the fuel efficiency and the lower the noise','Birds or stones swallowed by the engine can damage fan blades; engineers may inspect inside with a borescope']}})[l];
 if(!W)return F.mnt_eng('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='2.4s',cy=170;
 s+='<path d="M60 '+(cy-90)+' Q 330 '+(cy-104)+' 560 '+(cy-60)+' L 560 '+(cy+60)+' Q 330 '+(cy+104)+' 60 '+(cy+90)+' Z" fill="#E3E8EE" stroke="#5B6B7D" stroke-width="2"/>';
 s+='<path d="M150 '+(cy-44)+' L 470 '+(cy-30)+' L 540 '+(cy-16)+' L 540 '+(cy+16)+' L 470 '+(cy+30)+' L 150 '+(cy+44)+' Z" fill="#CBD5E1" stroke="#5B6B7D" stroke-width="1.5"/>';
 s+='<g><rect x="96" y="'+(cy-86)+'" width="16" height="172" rx="6" fill="#2F6FD6"/><animate attributeName="opacity" values="1;.55;1" keyTimes="0;.5;1" dur="0.6s" repeatCount="indefinite"/></g>';
 var zones=[[104,'#2F6FD6'],[210,'#2E9B5F'],[330,'#D64545'],[420,'#E08A2E'],[520,'#6B4FA0']];
 s+=R(170,cy-30,100,60,'#2E9B5F',6,' opacity=".75"')+R(290,cy-24,80,48,'#D64545',6,' opacity=".8"')+R(380,cy-26,80,52,'#E08A2E',6,' opacity=".8"');
 s+='<g opacity=".9"><circle cx="330" cy="'+cy+'" r="10" fill="#FFD23F"><animate attributeName="r" values="7;13;7" keyTimes="0;.5;1" dur="0.8s" repeatCount="indefinite"/></circle></g>';
 [-62,62].forEach(function(dy){for(var k=0;k<4;k++)s+='<circle r="4" fill="#2F6FD6"><animateMotion dur="'+dur+'" begin="'+(k*0.6).toFixed(1)+'s" repeatCount="indefinite" path="M30 '+(cy+dy)+' L 600 '+(cy+dy*0.85)+'"/></circle>'});
 for(var k=0;k<3;k++)s+='<circle r="4" fill="#5B6B7D"><animateMotion dur="'+dur+'" begin="'+(k*0.8).toFixed(1)+'s" repeatCount="indefinite" path="M30 '+cy+' L 610 '+cy+'"/></circle>';
 W.p.forEach(function(t,i){var x=zones[i][0];s+=LB(x,cy+122+(i%2)*30,t,11,'#fff','middle',zones[i][1])});
 s+=LBW(330,cy-66,W.by,11,'#2F6FD6','middle','#fff',260);
 var y=cy+170,nl=LI(W.co,11,560).length;s+=WR(320,y+FS(11),W.co,11,'#5B6B7D',800,560);y+=nl*FS(11)*1.3+12;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 2-1 点検の段階：間隔（どれくらいごと）と、かかる時間（棒の長さ）。上から順に光る */
mnt_chk:function(l){
 var W=({ja:{t:'点検の段階：間隔と、かかる時間（例）',r:[['飛行前点検','毎回の飛行の前','30分ほど'],['デイリー点検','24〜48時間ごと','1時間ほど'],['Aチェック','数百〜1,000飛行時間ごと','一晩（8〜10時間）'],['Cチェック','1.5〜3年ごと','1〜4週間（格納庫）'],['重整備','6〜12年ごと','1〜2か月']],n:['間隔は飛行時間・飛行回数・日数のうち先に来たもので決まる。数字は機種と会社の整備プログラムで違う★','737は飛行回数が多いので回数で決まる点検が、787は飛行時間で決まる点検と、日数で決まる点検が目立つ','Aチェック以上は機体を一定時間止めるので、運航の計画（どの機体をいつ抜くか）と一緒に決める']},
  ko:{t:'점검 단계: 간격과 걸리는 시간(예)',r:[['비행 전 점검','매 비행 전','30분 정도'],['데일리 점검','24~48시간마다','1시간 정도'],['A 체크','수백~1,000 비행시간마다','하룻밤(8~10시간)'],['C 체크','1.5~3년마다','1~4주(격납고)'],['중정비','6~12년마다','1~2개월']],n:['간격은 비행시간·비행 횟수·날짜 중 먼저 오는 것으로 정해진다. 숫자는 기종과 회사의 정비 프로그램마다 다르다★','737은 비행 횟수가 많아 횟수로 정해지는 점검이, 787은 비행시간과 날짜로 정해지는 점검이 두드러진다','A 체크 이상은 기체를 일정 시간 세우므로 운항 계획(어느 기체를 언제 빼는가)과 함께 정한다']},
  en:{t:'Check levels: interval and time taken (example)',r:[['Pre-flight check','Before every flight','About 30 minutes'],['Daily check','Every 24–48 hours','About 1 hour'],['A check','Every few hundred to 1,000 flight hours','Overnight (8–10 hours)'],['C check','Every 1.5–3 years','1–4 weeks (hangar)'],['Heavy check','Every 6–12 years','1–2 months']],n:['Intervals are set by flight hours, cycles or calendar days, whichever comes first; figures vary by type and airline programme ★','With many cycles, 737 checks are often cycle-driven; 787 checks are more often driven by flight hours and calendar time','A checks and above take the aircraft out of service, so they are planned together with the flying programme (which aircraft comes out when)']}})[l];
 if(!W)return F.mnt_chk('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=60,lh=FS(11)*1.3,n=W.r.length,dur='10s',wd=[40,70,130,210,280],cc=['#9AA8B8','#2F6FD6','#2E9B5F','#E08A2E','#D64545'];
 W.r.forEach(function(r,i){var n1=LI(r[0],12,140).length,n2=LI(r[1],11,150).length,h=Math.max(n1*FS(12)*1.3,n2*lh,lh*2)+18;
  s+='<g>'+R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.45)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(32,y+h/2+FS(12)*0.35,r[0],12,'#0f3558',900,140,'start')+WR(180,y+h/2+FS(11)*0.35,r[1],11,D,800,150,'start');
  s+=R(320,y+h/2-14,wd[i],12,cc[i],5)+WR(320,y+h/2+FS(11)*0.35+12,r[2],11,'#5B6B7D',700,290,'start')+'</g>';y+=h+6});
 var L=LIST(W.n,y+8,600,11);return SVG(L.y+8,s+L.s)},
/* 2-2 改善の指示（AD）と技術通報（SB）が、作業になって記録に残るまで */
mnt_ad:function(l){
 var W=({ja:{t:'ADとSBが作業になるまで',st:['メーカーが技術通報（SB）を出す（推奨）。当局は耐空性改善通報（AD）を出す（義務）','技術の部門が、自社の機体に当てはまるか、期限はいつかを調べる','作業の指示書（ワークカード）にして、点検の日程に組み込む','ライン整備や格納庫で作業し、部品を替える','記録と期限を管理する。ADの期限を過ぎた機体は飛べない'],who:['メーカー・当局','整備の計画・技術','整備の計画','整備士','品質・記録']},
  ko:{t:'AD와 SB가 작업이 되기까지',st:['제작사가 기술통보(SB)를 낸다(권고). 당국은 감항성개선지시(AD)를 낸다(의무)','기술 부문이 자사 기체에 해당하는지, 기한이 언제인지 조사한다','작업지시서(워크카드)로 만들어 점검 일정에 넣는다','라인 정비나 격납고에서 작업하고 부품을 교환한다','기록과 기한을 관리한다. AD 기한을 넘긴 기체는 날 수 없다'],who:['제작사·당국','정비 계획·기술','정비 계획','정비사','품질·기록']},
  en:{t:'How ADs and SBs become work',st:['The manufacturer issues a service bulletin (SB, recommended); the authority issues an airworthiness directive (AD, mandatory)','Engineering checks whether it applies to the fleet and by when','It becomes a task card and is scheduled into a check','The work is done on the line or in the hangar, and parts are replaced','Records and deadlines are tracked; an aircraft past an AD deadline cannot fly'],who:['Manufacturer & authority','Planning & engineering','Maintenance planning','Engineers','Quality & records']}})[l];
 if(!W)return F.mnt_ad('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#6B4FA0','#2F6FD6','#2F6FD6','#2E9B5F','#E08A2E'],'12s')},
/* 2-3 信頼性のループ：不具合の報告 → データ → 分析 → 整備プログラムの見直し → 次の不具合が減る */
mnt_rel:function(l){
 var W=({ja:{t:'信頼性のループ',nd:['不具合の報告（テクニカルログ）','データを集める（787は飛行中も送信）','分析（くり返す不具合・遅れの率）','整備プログラムの見直し'],c:'同じ不具合を減らす',n:['同じ部品の不具合がくり返すと、点検の間隔や部品を見直す','整備による遅れ・欠航の率は、整備の質を表す数字として毎月見られる','787は飛行中のデータを地上に送れるので、到着前に部品と人を準備できることがある']},
  ko:{t:'신뢰성 루프',nd:['결함 보고(테크니컬 로그)','데이터 수집(787은 비행 중에도 전송)','분석(반복 결함·지연율)','정비 프로그램 개정'],c:'같은 결함을 줄인다',n:['같은 부품 결함이 반복되면 점검 간격이나 부품을 다시 검토한다','정비로 인한 지연·결항률은 정비 품질을 나타내는 숫자로 매달 본다','787은 비행 중 데이터를 지상으로 보낼 수 있어 도착 전에 부품과 사람을 준비하기도 한다']},
  en:{t:'The reliability loop',nd:['Defect reports (technical log)','Data collection (the 787 also sends it in flight)','Analysis (repeat defects, delay rates)','Maintenance programme revision'],c:'Fewer repeat defects',n:['If the same part keeps failing, check intervals or the part itself are reconsidered','The technical delay and cancellation rate is reviewed monthly as a measure of maintenance quality','The 787 can send in-flight data to the ground, so parts and people can sometimes be ready before arrival']}})[l];
 if(!W)return F.mnt_rel('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),cx=320,cy=250,r=200,ry=135,dur='8s',cc=['#D64545','#2F6FD6','#6B4FA0','#2E9B5F'];
 s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+r+'" ry="'+ry+'" fill="none" stroke="#C8D3DE" stroke-width="10"/>';
 s+='<circle r="9" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"><animateMotion dur="'+dur+'" repeatCount="indefinite" path="M'+cx+' '+(cy-ry)+' A '+r+' '+ry+' 0 1 1 '+(cx-0.1)+' '+(cy-ry)+'"/></circle>';
 s+=R(cx-80,cy-22,160,44,'#fff',22,' stroke="#2C7A7B" stroke-width="2"')+WR(cx,cy+FS(11)*0.35,W.c,11,'#2C7A7B',900,150);
 var pos=[[cx,cy-ry],[cx+r,cy],[cx,cy+ry],[cx-r,cy]];
 W.nd.forEach(function(t,i){var p=pos[i],w=170,nl=LI(t,11,w-16).length,h=nl*FS(11)*1.3+16,x=Math.max(20,Math.min(620-w,p[0]-w/2));s+='<g>'+R(x,p[1]-h/2,w,h,cc[i],10)+WR(x+w/2,p[1]+FS(11)*0.35-(nl-1)*FS(11)*1.3/2+(nl-1)*FS(11)*1.3/2,t,11,'#fff',900,w-16)+'<animate attributeName="opacity" '+SEG(i,4,.55,1)+' dur="'+dur+'" repeatCount="indefinite"/></g>'});
 var L=LIST(W.n,cy+ry+64,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
