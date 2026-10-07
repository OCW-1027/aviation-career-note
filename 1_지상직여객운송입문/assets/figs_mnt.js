/* 航空機と整備（MNT）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   B737（小型機）とB787（中大型機）を比べる図が中心。数字は一般的な例。作成ルール：00_그림작성규칙.md */
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
/* 1-1 機体の材料：B737（アルミ）とB787（複合材）を横から並べ、材料の色が順に光る */
mnt_struct:function(l){
 var W=({ja:{t:'機体の材料：B737とB787',a:'B737：主にアルミニウム合金',b:'B787：重さの約半分が炭素繊維の複合材',lg:['アルミニウム合金','炭素繊維の複合材','チタン・鋼（脚・エンジンまわり）'],n:['アルミは「疲れ（金属疲労）」と「さび（腐食）」に気をつけ、離着陸の回数に合わせて点検する','複合材はさびず疲れにも強いが、ぶつけた傷が表から見えにくい。地上の車両が当たったら、小さくても必ず整備に知らせる','複合材の胴体には、雷の電気を逃がす金属の網が入っている。雷に打たれたら決められた点検をする']},
  ko:{t:'기체 재료: B737과 B787',a:'B737: 주로 알루미늄 합금',b:'B787: 무게의 약 절반이 탄소섬유 복합재',lg:['알루미늄 합금','탄소섬유 복합재','티타늄·강철(착륙장치·엔진 주변)'],n:['알루미늄은 ‘피로(금속 피로)’와 ‘부식’에 주의하고, 이착륙 횟수에 맞춰 점검한다','복합재는 녹슬지 않고 피로에도 강하지만, 부딪친 손상이 겉에서 잘 보이지 않는다. 지상 장비가 닿으면 작아도 반드시 정비에 알린다','복합재 동체에는 낙뢰 전기를 흘려보내는 금속 망이 들어 있다. 낙뢰를 맞으면 정해진 점검을 한다']},
  en:{t:'Airframe materials: B737 and B787',a:'B737: mainly aluminium alloy',b:'B787: about half the weight is carbon-fibre composite',lg:['Aluminium alloy','Carbon-fibre composite','Titanium and steel (gear, engine areas)'],n:['Aluminium needs watching for fatigue and corrosion, and checks follow the number of take-offs and landings','Composite does not corrode and resists fatigue, but impact damage can be hard to see from outside. If ground equipment touches the aircraft, however lightly, always tell maintenance','The composite fuselage contains a metal mesh to carry lightning current away; after a strike, set inspections are done']}})[l];
 if(!W)return F.mnt_struct('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='9s',cA='#9AA8B8',cC='#2C7A7B',cT='#B5651D';
 var sc=8.2;function body(y,k,tint){return '<g transform="translate(330 '+y+') scale('+sc+')">'+(window.ACFT&&window.ACFT.jet?window.ACFT.jet(k,{tint:tint}):planeS('#fff'))+'</g>'}
 s+=R(20,58,600,170,'#F0F4F8',12)+body(176,'737','alu')+LBW(320,80,W.a,11,'#fff','middle','#5B6B7D',420);
 s+=R(20,238,600,222,'#EAF6F6',12)+body(390,'787','comp')+LBW(320,270,W.b,11,'#fff','middle',cC,420);
 s+='<g opacity="0"><rect x="20" y="238" width="600" height="222" rx="12" fill="none" stroke="'+cC+'" stroke-width="4"/><animate attributeName="opacity" values="0;1;0;0" keyTimes="0;.25;.5;1" dur="'+dur+'" repeatCount="indefinite"/></g><g opacity="0"><rect x="20" y="58" width="600" height="170" rx="12" fill="none" stroke="#5B6B7D" stroke-width="4"/><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.5;.75;1" dur="'+dur+'" repeatCount="indefinite"/></g>';
 /* 両機に共通の材料（色分けはしない） */
 var cm=({ja:'両機とも：',ko:'두 기체 모두: ',en:'Both aircraft: '})[l]+W.lg[2],cn=LI(cm,11,560).length,ch=cn*FS(11)*1.3+16,y=472;s+=R(20,y,600,ch,'#FFF4E5',10)+WR(320,y+8+cn*FS(11)*1.3/2+FS(11)*0.3,cm,11,cT,900,560);y+=ch+6;
 var L=LIST(W.n,y+8,600,11);return SVG(L.y+8,s+L.s)},
/* 1-2 空気と電気：B737はエンジンの空気（ブリード）で冷暖房・与圧・防氷、B787は電気で動かす。粒が流れる */
mnt_bleed:function(l){
 var W=({ja:{t:'冷暖房・与圧・防氷の「力のもと」',a:'B737：エンジンの空気（ブリード）',b:'B787：電気（発電機）',eng:'エンジン',gen:'発電機',ac:'空調・与圧',wai:'翼の防氷',st:'エンジンの始動',n:['B737：エンジンの圧縮機から熱い空気を取り出し、管で空調・与圧・翼の防氷・エンジンの始動に使う','B787：エンジンの発電機で電気をつくり、電動の圧縮機で空調・与圧、電熱で翼の防氷、エンジンの始動も電気で行う（エンジンの取り入れ口の防氷だけは空気を使う）','B787は管が少なく燃料の効率がよい一方、電気の系統とソフトウェアの管理が大事になる']},
  ko:{t:'냉난방·여압·방빙의 ‘힘의 원천’',a:'B737: 엔진의 공기(블리드)',b:'B787: 전기(발전기)',eng:'엔진',gen:'발전기',ac:'공조·여압',wai:'날개 방빙',st:'엔진 시동',n:['B737: 엔진 압축기에서 뜨거운 공기를 뽑아 관으로 공조·여압·날개 방빙·엔진 시동에 쓴다','B787: 엔진 발전기로 전기를 만들고 전동 압축기로 공조·여압, 전열로 날개 방빙, 엔진 시동도 전기로 한다(엔진 흡입구 방빙만은 공기를 쓴다)','B787은 관이 적어 연료 효율이 좋지만, 전기 계통과 소프트웨어 관리가 중요해진다']},
  en:{t:'What powers air conditioning, pressurisation and anti-icing',a:'B737: engine air (bleed)',b:'B787: electricity (generators)',eng:'Engine',gen:'Generator',ac:'Cabin air & press.',wai:'Wing anti-ice',st:'Engine start',n:['B737: hot air is tapped from the engine compressor and piped to air conditioning, pressurisation, wing anti-icing and engine starting','B787: engine generators make electricity; electric compressors run air conditioning and pressurisation, electric heaters de-ice the wings, and engines are started electrically (only the engine inlet anti-ice still uses air)','The B787 has fewer ducts and burns less fuel, but its electrical systems and software need careful management']}})[l];
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
/* 1-3 油圧：B737（A・B・スタンバイ、約3,000psi）とB787（左・中央・右、約5,000psi）。B787のブレーキは電気 */
mnt_hyd:function(l){
 var W=({ja:{t:'油圧の系統と、ブレーキの力のもと',a:'B737：油圧3系統（約3,000psi）',b:'B787：油圧3系統（約5,000psi）＋電気ブレーキ',sa:['A系統','B系統','スタンバイ'],sb:['左系統','中央系統',''],tg:['操縦翼面','脚の上げ下げ','ブレーキ'],el:'電気（発電機）',n:['どちらも3つの系統があり、1つが壊れても残りで操縦できるように分けてある（図はつながりを単純にしている）','B737のブレーキは油圧で動く。B787のブレーキは電気で動き、ブレーキの部品ごとに交換しやすい（B787の油圧は左・中央・右の3系統）','着陸のあとのブレーキは熱い。次の出発までに冷えないと出発が遅れることがある（ブレーキの温度は整備が確認する）']},
  ko:{t:'유압 계통과 브레이크의 힘의 원천',a:'B737: 유압 3계통(약 3,000psi)',b:'B787: 유압 3계통(약 5,000psi)+전기 브레이크',sa:['A 계통','B 계통','스탠바이'],sb:['왼쪽 계통','가운데 계통',''],tg:['조종면','착륙장치 올리고 내리기','브레이크'],el:'전기(발전기)',n:['둘 다 계통이 3개라서 하나가 고장 나도 나머지로 조종할 수 있게 나뉘어 있다(그림은 연결을 단순화했다)','B737 브레이크는 유압으로 움직인다. B787 브레이크는 전기로 움직이고 부품별로 교환하기 쉽다(B787 유압은 왼쪽·가운데·오른쪽 3계통)','착륙 뒤 브레이크는 뜨겁다. 다음 출발까지 식지 않으면 출발이 늦어질 수 있다(브레이크 온도는 정비가 확인한다)']},
  en:{t:'Hydraulic systems and what powers the brakes',a:'B737: three hydraulic systems (about 3,000 psi)',b:'B787: three hydraulic systems (about 5,000 psi) + electric brakes',sa:['System A','System B','Standby'],sb:['Left','Centre',''],tg:['Flight controls','Landing gear','Brakes'],el:'Electric',n:['Both have three systems, split so the aircraft can still be controlled if one fails (the figure simplifies the connections)','The B737’s brakes are hydraulic. The B787’s are electric, and individual brake units are easier to change (the B787 has left, centre and right hydraulic systems)','Brakes are hot after landing. If they do not cool before the next departure, it can be delayed (maintenance checks brake temperatures)']}})[l];
 if(!W)return F.mnt_hyd('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='2.6s',cs=['#2F6FD6','#2E9B5F','#E08A2E'];
 function panel(y,title,sys,elec){var g=R(20,y,600,206,'#F4F7FB',12)+LBW(32,y+22,title,11.5,'#fff','start','#0f3558',560);
  sys.forEach(function(t,i){var yy=y+56+i*52;if(elec&&i===2){g+=R(40,yy-6,140,44,'#FFB000',8)+WR(110,yy+16+FS(11)*0.35,W.el,11,'#5A3A00',900,130);return}g+=R(40,yy-6,140,44,cs[i],8)+WR(110,yy+16+FS(11)*0.35,t,11,'#fff',900,130)});
  W.tg.forEach(function(t,i){var yy=y+56+i*52;g+=R(390,yy-6,220,44,'#fff',8,' stroke="#C8D3DE"')+WR(500,yy+16+FS(11)*0.35,t,11,D,800,206);
   var isE=elec&&i===2,col=isE?'#FFB000':cs[i],path='M180 '+(yy+16)+' L390 '+(yy+16);
   g+='<path d="'+path+'" stroke="'+col+'" stroke-width="'+(isE?3:6)+'" opacity=".5"'+(isE?' stroke-dasharray="7 5"':'')+'/>';
   for(var k=0;k<3;k++)g+='<circle r="4.5" fill="'+col+'"><animateMotion dur="'+dur+'" begin="'+(k*0.86).toFixed(2)+'s" repeatCount="indefinite" path="'+path+'"/></circle>'});
  return g}
 s+=panel(58,W.a,W.sa,false)+panel(274,W.b,W.sb,true);
 var L=LIST(W.n,494,600,11);return SVG(L.y+8,s+L.s)},
/* 1-4 ターボファン・エンジン：空気が入り（ファン）、圧縮され、燃え、タービンを回して出ていく。大半はファンの外を流れる（バイパス） */
mnt_eng:function(l){
 var W=({ja:{t:'ターボファン・エンジンのしくみ',p:['ファン','圧縮機','燃焼室','タービン','排気'],by:'バイパスの空気（推力の大部分）',co:'中心の空気（燃料を燃やす）',n:['前のファンが空気を吸い込み、大部分は外側を流れて推力になる（バイパス）。中心の空気は圧縮され、燃料と燃えてタービンを回す','タービンはファンと圧縮機を回す。バイパス比（外側と中心の空気の比）が大きいほど燃料の効率がよく、音も小さい','鳥や小石を吸い込むとファンの羽根が傷つく。エンジンの点検（ボアスコープ）で中を見ることがある']},
  ko:{t:'터보팬 엔진의 구조',p:['팬','압축기','연소실','터빈','배기'],by:'바이패스 공기(추력의 대부분)',co:'중심 공기(연료를 태운다)',n:['앞의 팬이 공기를 빨아들이고, 대부분은 바깥쪽을 흘러 추력이 된다(바이패스). 중심 공기는 압축되어 연료와 타며 터빈을 돌린다','터빈은 팬과 압축기를 돌린다. 바이패스비(바깥과 중심 공기의 비)가 클수록 연료 효율이 좋고 소음도 작다','새나 작은 돌을 빨아들이면 팬 블레이드가 다친다. 엔진 점검(보어스코프)으로 안을 들여다보기도 한다']},
  en:{t:'How a turbofan engine works',p:['Fan','Compressor','Combustor','Turbine','Exhaust'],by:'Bypass air (most of the thrust)',co:'Core air (burns the fuel)',n:['The fan draws air in; most flows around the outside as thrust (bypass). Core air is compressed, burned with fuel and drives the turbines','The turbines drive the fan and compressor. The higher the bypass ratio (outer to core air), the better the fuel efficiency and the lower the noise','Birds or stones swallowed by the engine can damage fan blades; engineers may inspect inside with a borescope']}})[l];
 if(!W)return F.mnt_eng('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='2.4s',cy=170;
 s+='<defs><linearGradient id="mnN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F7FA"/><stop offset=".5" stop-color="#D5DDE6"/><stop offset="1" stop-color="#A9B5C2"/></linearGradient><linearGradient id="mnC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D2DC"/><stop offset=".5" stop-color="#9EABB9"/><stop offset="1" stop-color="#7C8999"/></linearGradient></defs>';
 s+='<path d="M60 '+(cy-90)+' Q 330 '+(cy-106)+' 540 '+(cy-66)+' L 560 '+(cy-58)+' L 560 '+(cy+58)+' L 540 '+(cy+66)+' Q 330 '+(cy+106)+' 60 '+(cy+90)+' Q 44 '+cy+' 60 '+(cy-90)+' Z" fill="url(#mnN)" stroke="#2C3A4A" stroke-width="2"/>';
 s+='<path d="M70 '+(cy-76)+' Q 330 '+(cy-90)+' 540 '+(cy-56)+' L 540 '+(cy+56)+' Q 330 '+(cy+90)+' 70 '+(cy+76)+' Z" fill="#EEF2F6" stroke="#9AA8B8" stroke-width="1"/>';
 s+='<path d="M150 '+(cy-44)+' C 300 '+(cy-46)+' 420 '+(cy-36)+' 470 '+(cy-30)+' L 540 '+(cy-16)+' L 600 '+cy+' L 540 '+(cy+16)+' L 470 '+(cy+30)+' C 420 '+(cy+36)+' 300 '+(cy+46)+' 150 '+(cy+44)+' Q 136 '+cy+' 150 '+(cy-44)+' Z" fill="url(#mnC)" stroke="#2C3A4A" stroke-width="1.5"/>';
 s+='<ellipse cx="104" cy="'+cy+'" rx="14" ry="84" fill="#2B3642"/>';
 var bl='';for(var k=-6;k<=6;k++){var yy=cy+k*13;bl+='<path d="M98 '+yy+' Q 106 '+(yy-5)+' 112 '+(yy+3)+'" stroke="#9AA8B8" stroke-width="2.4" fill="none"/>'}
 s+='<g>'+bl+'<animate attributeName="opacity" values="1;.55;1" keyTimes="0;.5;1" dur="0.5s" repeatCount="indefinite"/></g><circle cx="104" cy="'+cy+'" r="12" fill="#C3CCD6" stroke="#2C3A4A" stroke-width="1.2"/>';
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
 var W=({ja:{t:'点検の段階：間隔と、かかる時間（例）',r:[['飛行前点検','毎回の飛行の前','30分ほど'],['デイリー点検','24〜48時間ごと','1時間ほど'],['Aチェック','数百〜1,000飛行時間ごと','一晩（8〜10時間）'],['Cチェック','1.5〜3年ごと','1〜4週間（格納庫）'],['重整備','6〜12年ごと','1〜2か月']],n:['間隔は飛行時間・飛行回数・日数のうち先に来たもので決まる。数字は機種と会社の整備プログラムで違う★','B737は飛行回数が多いので回数で決まる点検が、B787は飛行時間で決まる点検と、日数で決まる点検が目立つ','Aチェック以上は機体を一定時間止めるので、運航の計画（どの機体をいつ抜くか）と一緒に決める']},
  ko:{t:'점검 단계: 간격과 걸리는 시간(예)',r:[['비행 전 점검','매 비행 전','30분 정도'],['데일리 점검','24~48시간마다','1시간 정도'],['A 체크','수백~1,000 비행시간마다','하룻밤(8~10시간)'],['C 체크','1.5~3년마다','1~4주(격납고)'],['중정비','6~12년마다','1~2개월']],n:['간격은 비행시간·비행 횟수·날짜 중 먼저 오는 것으로 정해진다. 숫자는 기종과 회사의 정비 프로그램마다 다르다★','B737은 비행 횟수가 많아 횟수로 정해지는 점검이, B787은 비행시간과 날짜로 정해지는 점검이 두드러진다','A 체크 이상은 기체를 일정 시간 세우므로 운항 계획(어느 기체를 언제 빼는가)과 함께 정한다']},
  en:{t:'Check levels: interval and time taken (example)',r:[['Pre-flight check','Before every flight','About 30 minutes'],['Daily check','Every 24–48 hours','About 1 hour'],['A check','Every few hundred to 1,000 flight hours','Overnight (8–10 hours)'],['C check','Every 1.5–3 years','1–4 weeks (hangar)'],['Heavy check','Every 6–12 years','1–2 months']],n:['Intervals are set by flight hours, cycles or calendar days, whichever comes first; figures vary by type and airline programme ★','With many cycles, B737 checks are often cycle-driven; B787 checks are more often driven by flight hours and calendar time','A checks and above take the aircraft out of service, so they are planned together with the flying programme (which aircraft comes out when)']}})[l];
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
 var W=({ja:{t:'信頼性のループ',nd:['不具合の報告（テクニカルログ）','データを集める（B787は飛行中も送信）','分析（くり返す不具合・遅れの率）','整備プログラムの見直し'],c:'同じ不具合を減らす',n:['同じ部品の不具合がくり返すと、点検の間隔や部品を見直す','整備による遅れ・欠航の率は、整備の質を表す数字として毎月見られる','B787は飛行中のデータを地上に送れるので、到着前に部品と人を準備できることがある']},
  ko:{t:'신뢰성 루프',nd:['결함 보고(테크니컬 로그)','데이터 수집(B787은 비행 중에도 전송)','분석(반복 결함·지연율)','정비 프로그램 개정'],c:'같은 결함을 줄인다',n:['같은 부품 결함이 반복되면 점검 간격이나 부품을 다시 검토한다','정비로 인한 지연·결항률은 정비 품질을 나타내는 숫자로 매달 본다','B787은 비행 중 데이터를 지상으로 보낼 수 있어 도착 전에 부품과 사람을 준비하기도 한다']},
  en:{t:'The reliability loop',nd:['Defect reports (technical log)','Data collection (the B787 also sends it in flight)','Analysis (repeat defects, delay rates)','Maintenance programme revision'],c:'Fewer repeat defects',n:['If the same part keeps failing, check intervals or the part itself are reconsidered','The technical delay and cancellation rate is reviewed monthly as a measure of maintenance quality','The B787 can send in-flight data to the ground, so parts and people can sometimes be ready before arrival']}})[l];
 if(!W)return F.mnt_rel('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),cx=320,cy=250,r=200,ry=135,dur='8s',cc=['#D64545','#2F6FD6','#6B4FA0','#2E9B5F'];
 s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+r+'" ry="'+ry+'" fill="none" stroke="#C8D3DE" stroke-width="10"/>';
 s+='<circle r="9" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"><animateMotion dur="'+dur+'" repeatCount="indefinite" path="M'+cx+' '+(cy-ry)+' A '+r+' '+ry+' 0 1 1 '+(cx-0.1)+' '+(cy-ry)+'"/></circle>';
 s+=R(cx-80,cy-22,160,44,'#fff',22,' stroke="#2C7A7B" stroke-width="2"')+WR(cx,cy+FS(11)*0.35,W.c,11,'#2C7A7B',900,150);
 var pos=[[cx,cy-ry],[cx+r,cy],[cx,cy+ry],[cx-r,cy]];
 W.nd.forEach(function(t,i){var p=pos[i],w=170,nl=LI(t,11,w-16).length,h=nl*FS(11)*1.3+16,x=Math.max(20,Math.min(620-w,p[0]-w/2));s+='<g>'+R(x,p[1]-h/2,w,h,cc[i],10)+WR(x+w/2,p[1]+FS(11)*0.35-(nl-1)*FS(11)*1.3/2+(nl-1)*FS(11)*1.3/2,t,11,'#fff',900,w-16)+'<animate attributeName="opacity" '+SEG(i,4,.55,1)+' dur="'+dur+'" repeatCount="indefinite"/></g>'});
 var L=LIST(W.n,cy+ry+64,600,11);return SVG(L.y+8,s+L.s)},
/* 3-1 MELの1行を読む：項目・修理の期限・装備数・必要数・備考の順に光り、下の説明と対応する（例は一般的な形） */
mnt_mel:function(l){
 var W=({ja:{t:'MELの1行を読む（例）',h:['項目','期限','装備数','必要数','備考'],v:['21 空調パック','C','2','1','(M)(O)'],n:['項目：ATAの章（21＝空調）ごとに並ぶ。どの装置かを示す','修理の期限の区分：A〜D。Cなら発見の翌日から10日以内に直す','装備数：機体に付いている数','出発に必要な数：この数以上動いていれば出発できる（ここでは1つ止まっていてもよい）','備考：(M)は整備の作業、(O)は乗員の手順が必要。高度などの制限が付くことがある']},
  ko:{t:'MEL 한 줄 읽기(예)',h:['항목','기한','장착 수','필요 수','비고'],v:['21 공조 팩','C','2','1','(M)(O)'],n:['항목: ATA 장(21=공조)별로 나열된다. 어느 장치인지 나타낸다','수리 기한 범주: A~D. C라면 발견 다음 날부터 10일 이내에 고친다','장착 수: 기체에 달린 수','출발 필요 수: 이 수 이상 작동하면 출발할 수 있다(여기서는 하나가 멈춰도 된다)','비고: (M)은 정비 작업, (O)는 승무원 절차가 필요. 고도 등 제한이 붙기도 한다']},
  en:{t:'Reading one MEL line (example)',h:['Item','Cat.','Installed','Required','Remarks'],v:['21 A/C pack','C','2','1','(M)(O)'],n:['Item: listed by ATA chapter (21 = air conditioning), identifying the system','Repair category: A to D. Category C must be fixed within 10 days, not counting the day of discovery','Installed: how many the aircraft has','Required for dispatch: the aircraft may depart if at least this many work (here, one may be inoperative)','Remarks: (M) means a maintenance procedure and (O) an operations procedure for the crew; limits such as altitude may apply']}})[l];
 if(!W)return F.mnt_mel('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='12s',ws=[200,80,95,95,130],x=20,y0=62,cs=['#2F6FD6','#D64545','#2E9B5F','#2E9B5F','#6B4FA0'];
 s+=R(20,y0,600,96,'#fff',10,' stroke="#9FB0C2"');
 ws.forEach(function(w,i){s+=R(x,y0,w,34,'#0f3558',0)+tx(x+w/2,y0+22,W.h[i],11,'#fff',900);
  s+='<g>'+R(x+3,y0+38,w-6,54,'#fff',6)+'<rect x="'+(x+3)+'" y="'+(y0+38)+'" width="'+(w-6)+'" height="54" rx="6" fill="'+cs[i]+'" opacity="0"><animate attributeName="opacity" '+SEG(i,5,.08,.35)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(x+w/2,y0+70,W.v[i],12,'#0f3558',900,w-30)+BADGE(x+w-14,y0+44,i+1,11)+'</g>';
  if(i<4)s+='<line x1="'+(x+w)+'" y1="'+y0+'" x2="'+(x+w)+'" y2="'+(y0+96)+'" stroke="#C8D3DE"/>';x+=w});
 var L=LIST(W.n,y0+112,600,11);
 return SVG(L.y+8,s+L.s)},
/* 3-2 修理の期限：見つけた日（0日目）は数えず、Bは3日、Cは10日、Dは120日。Aは項目ごとに決まる */
mnt_cat:function(l){
 var W=({ja:{t:'修理の期限の区分と数え方',r:[['A','項目ごとに決まる（例：飛行回数・時間）'],['B','3日'],['C','10日'],['D','120日']],d0:'発見',ax:'発見の翌日からの日数',d:'→ 120日',n:['発見した日は数えない（0日目）。日付の切り替えの時刻は会社の規定で決める★','期限の中で直せないと、その機体は出発できない（AOG）。延長は当局が認めた仕組みの範囲だけ★','期限の近い不具合は、部品のある基地に機体を回すように運航の計画に入れる']},
  ko:{t:'수리 기한 범주와 세는 법',r:[['A','항목마다 정해진다(예: 비행 횟수·시간)'],['B','3일'],['C','10일'],['D','120일']],d0:'발견',ax:'발견 다음 날부터의 일수',d:'→ 120일',n:['발견한 날은 세지 않는다(0일째). 날짜가 바뀌는 시각은 회사 규정으로 정한다★','기한 안에 고치지 못하면 그 기체는 출발할 수 없다(AOG). 연장은 당국이 인정한 제도 범위에서만★','기한이 가까운 결함은 부품이 있는 기지로 기체를 보내도록 운항 계획에 넣는다']},
  en:{t:'Repair categories and how days are counted',r:[['A','Set per item (e.g. flights or hours)'],['B','3 days'],['C','10 days'],['D','120 days']],d0:'Found',ax:'Days from the day after discovery',d:'→ 120 days',n:['The day of discovery is not counted (day 0). When the date rolls over is set by company rules ★','If it cannot be fixed within the limit, the aircraft cannot depart (AOG). Extensions only under an authority-approved scheme ★','Defects close to their limit are planned into the flying programme so the aircraft reaches a base with the part']}})[l];
 if(!W)return F.mnt_cat('ja');setK(1);
 var X=function(dd){return 150+dd/12*450},s=TTL(320,30,W.t,15,'#0f3558',600),cc=['#6B4FA0','#D64545','#E08A2E','#2E9B5F'],dur='12s',yb=100;
 for(var dd=0;dd<=12;dd+=2)s+='<line x1="'+X(dd)+'" y1="'+yb+'" x2="'+X(dd)+'" y2="'+(yb+4*46)+'" stroke="#E3E9EF"/>'+tx(X(dd),yb+4*46+18,String(dd),11,'#5B6B7D',700);
 s+=tx(375,yb+4*46+40,W.ax,11,'#0f3558',800);
 W.r.forEach(function(r,i){var y=yb+i*46;s+=BADGE(40,y+20,r[0],12,cc[i]);
  if(i===0)s+=LBW(X(0)+8,y+20,r[1],11,'#fff','start',cc[i],420);
  else{var e=[0,3,10,12][i];s+=R(X(0),y+10,X(e)-X(0),20,cc[i],6);if(i<3)s+=LB(X(e)+6,y+20,r[1],11,cc[i],'start','#fff');else s+=LB(X(12)-6,y+20,W.d,11,'#fff','end',cc[i])}});
 s+='<line x1="'+X(0)+'" y1="'+(yb-20)+'" x2="'+X(0)+'" y2="'+(yb+4*46)+'" stroke="#0f3558" stroke-width="2.5"/>'+LB(X(0),yb-30,W.d0,11,'#fff','middle','#0f3558');
 s+='<line x1="0" y1="'+yb+'" x2="0" y2="'+(yb+4*46)+'" stroke="#D64545" stroke-width="2.5" stroke-dasharray="5 3"><animateTransform attributeName="transform" type="translate" values="'+X(0)+' 0;'+X(12)+' 0" keyTimes="0;1" dur="'+dur+'" repeatCount="indefinite"/></line>';
 var L=LIST(W.n,yb+4*46+60,600,11);return SVG(L.y+8,s+L.s)},
/* 3-3 CDL：外の部品がない状態で飛べる場合。機体の上の赤い印が順に光る */
mnt_cdl:function(l){
 var W=({ja:{t:'CDL：外の部品がない状態で飛ぶ（例）',p:['フラップのレールのカバー','翼の先の静電気放出棒','APUの点検口のふた','エンジンを支える柱のパネル'],n:['CDL（外形変更リスト）は、メーカーが認めた外の部品について、ない状態で飛べる条件を決める','条件の多くは「離陸重量を何kg減らす」「燃料を何%足す」といった性能の割増し。運航管理の計画に入る','ない部品は記録し、機体の近くと操縦室に表示する。同じ場所の部品が2つ以上ないと飛べないこともある']},
  ko:{t:'CDL: 외부 부품이 없는 상태로 난다(예)',p:['플랩 레일 덮개','날개 끝 정전기 방출봉','APU 점검구 덮개','엔진 지지대 패널'],n:['CDL(외형 변경 목록)은 제작사가 인정한 외부 부품에 대해, 없는 상태로 날 수 있는 조건을 정한다','조건의 대부분은 ‘이륙 중량을 몇 kg 줄인다’, ‘연료를 몇 % 더한다’ 같은 성능 할증. 운항관리 계획에 들어간다','없는 부품은 기록하고 조종실에 표시한다. 같은 곳 부품이 두 개 이상 없으면 날 수 없기도 하다']},
  en:{t:'CDL: flying without some external parts (example)',p:['Flap track fairing','Wingtip static discharger','APU access door','Engine pylon panel'],n:['The CDL (configuration deviation list) sets conditions for flying without certain external parts approved by the manufacturer','Most conditions are performance penalties such as reducing take-off weight by a set amount or adding fuel; they go into the dispatch plan','Missing parts are recorded and placarded in the flight deck; some cannot be missing in more than one place at once']}})[l];
 if(!W)return F.mnt_cdl('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,200,'#EAF2F9',14),sc=13.2,ox=330,oy=182,dur='8s';
 s+='<g transform="translate('+ox+' '+oy+') scale('+sc+')">'+(window.ACFT&&window.ACFT.jet?window.ACFT.jet('737',{tint:'alu'}):planeS('#fff'))+'</g>';
 var pts=[[-3.2,1.6],[-7.2,-4.2],[-18.9,-0.7],[5.6,1.25]];
 pts.forEach(function(p,i){var x=ox+p[0]*sc,y=oy+p[1]*sc;s+='<g><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="12" fill="#D64545" opacity="0"><animate attributeName="opacity" '+SEG(i,4,.15,.6)+' dur="'+dur+'" repeatCount="indefinite"/><animate attributeName="r" values="9;16;9" keyTimes="0;.5;1" dur="1.6s" repeatCount="indefinite"/></circle>'+BADGE(x,y,i+1,11,'#fff')+'</g>'});
 var L=LIST(W.p.concat(W.n),272,600,11);
 return SVG(L.y+8,s+L.s)},
/* 4-1 ライン整備を委託するまでの流れ */
mnt_outsrc:function(l){
 var W=({ja:{t:'ライン整備を委託するまで',st:['候補を調べる：当局の認定（整備の事業場）、その機種の経験、夜間や繁忙期の人数','品質の部門が監査する：設備・工具・部品の保管・記録・教育のしくみを現地で確かめる','契約を結ぶ：作業の範囲（出発前の点検・不具合の処置）、料金、責任、連絡の方法','教育と認可：機種の教育と会社の手順を教え、確認の署名ができる人を会社が認める','運用を始め、定期的に監査する：遅れの率・作業の誤り・記録を見て改善する'],who:['整備の計画・支店','品質','整備・調達・法務','品質・訓練','品質・支店']},
  ko:{t:'라인 정비를 위탁하기까지',st:['후보를 조사한다: 당국 인증(정비 조직), 그 기종 경험, 야간·성수기 인원','품질 부문이 감사한다: 설비·공구·부품 보관·기록·교육 체계를 현장에서 확인한다','계약을 맺는다: 작업 범위(출발 전 점검·결함 처치), 요금, 책임, 연락 방법','교육과 인가: 기종 교육과 회사 절차를 가르치고, 확인 서명을 할 수 있는 사람을 회사가 인가한다','운영을 시작하고 정기적으로 감사한다: 지연율·작업 오류·기록을 보고 개선한다'],who:['정비 계획·지점','품질','정비·구매·법무','품질·훈련','품질·지점']},
  en:{t:'Setting up outsourced line maintenance',st:['Survey candidates: authority approval as a maintenance organisation, experience on the type, staffing at night and in peak seasons','Quality audits them on site: facilities, tools, parts storage, records and training','Sign the contract: scope (pre-departure checks, defect rectification), fees, liabilities and communication','Training and authorisation: type and company-procedure training; the airline authorises who may certify','Start operations and audit regularly: review delay rates, errors and records to improve'],who:['Planning & station','Quality','Maintenance, purchasing & legal','Quality & training','Quality & station']}})[l];
 if(!W)return F.mnt_outsrc('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#6B4FA0','#E08A2E','#2E9B5F','#2C7A7B'],'12s')},
/* 4-2 誰が何をするか：本社の整備・委託先の整備士・支店。行ごとに光る */
mnt_roles:function(l){
 var W=({ja:{t:'ライン整備で、誰が何をするか（例）',c:['本社の整備（MCC）','委託先の整備士','支店'],r:['出発前の点検と確認の署名','不具合の判断・MELの適用','部品の手配と輸送','部品の通関・空港への持ち込み','作業の場所・電源・車両の用意','遅れの連絡とお客様の案内'],m:[[0,1,0],[1,1,0],[1,0,1],[0,0,1],[0,1,1],[1,0,1]],n:['●が主に担当。会社や空港によって分け方は違う★','支店は整備の判断はしないが、部品・場所・連絡の段取りで遅れを短くできる']},
  ko:{t:'라인 정비에서 누가 무엇을 하는가(예)',c:['본사 정비(MCC)','위탁처 정비사','지점'],r:['출발 전 점검과 확인 서명','결함 판단·MEL 적용','부품 수배와 운송','부품 통관·공항 반입','작업 장소·전원·차량 준비','지연 연락과 승객 안내'],m:[[0,1,0],[1,1,0],[1,0,1],[0,0,1],[0,1,1],[1,0,1]],n:['●가 주로 담당. 회사나 공항에 따라 나누는 법은 다르다★','지점은 정비 판단은 하지 않지만, 부품·장소·연락 준비로 지연을 줄일 수 있다']},
  en:{t:'Who does what in line maintenance (example)',c:['Head-office maintenance (MCC)','Contract engineers','Station'],r:['Pre-departure check and certification','Defect assessment and MEL use','Ordering and shipping parts','Customs clearance and airside delivery of parts','Work area, power and vehicles','Delay messages and passenger information'],m:[[0,1,0],[1,1,0],[1,0,1],[0,0,1],[0,1,1],[1,0,1]],n:['● marks the main party; the split varies by airline and airport ★','The station makes no maintenance decisions, but arranging parts, space and communication shortens delays']}})[l];
 if(!W)return F.mnt_roles('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),x0=260,cw=120,y=62,lh=FS(11)*1.3,dur='12s',n=W.r.length,cc=['#2F6FD6','#2E9B5F','#E08A2E'];
 var hh=Math.max.apply(null,W.c.map(function(c){return LI(c,11,cw-12).length}))*lh+16;
 W.c.forEach(function(c,j){s+=R(x0+j*cw+4,y,cw-8,hh,cc[j],8)+WR(x0+j*cw+cw/2,y+hh/2+FS(11)*0.35,c,11,'#fff',900,cw-16)});y+=hh+6;
 W.r.forEach(function(r,i){var nl=LI(r,11,220).length,h=nl*lh+16;
  s+='<g>'+R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.45)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(32,y+h/2+FS(11)*0.35-(nl-1)*lh/2+(nl-1)*lh/2,r,11,D,800,220,'start');
  W.m[i].forEach(function(v,j){if(v)s+='<circle cx="'+(x0+j*cw+cw/2)+'" cy="'+(y+h/2)+'" r="9" fill="'+cc[j]+'"/>'});s+='</g>';y+=h+4});
 var L=LIST(W.n,y+8,600,11);return SVG(L.y+8,s+L.s)},
/* 4-3 監査と当局の確認：計画 → 現地の確認 → 指摘 → 是正 → 確認・終了 */
mnt_audit:function(l){
 var W=({ja:{t:'委託先の監査の流れ',st:['計画：年に1回など、監査の日と見る項目を決めて委託先に知らせる','現地の確認：記録・工具の校正・部品の保管・教育の記録・作業のようすを見る','指摘：基準に合わない点を、重さの区分を付けて書面で伝える','是正：委託先が原因と対策を出し、期限までに直す','確認・終了：直ったことを確かめて記録を閉じる。くり返す指摘は契約の見直しにつなげる'],who:['品質','品質・支店','品質','委託先','品質']},
  ko:{t:'위탁처 감사의 흐름',st:['계획: 연 1회 등 감사 날짜와 볼 항목을 정해 위탁처에 알린다','현장 확인: 기록·공구 교정·부품 보관·교육 기록·작업 모습을 본다','지적: 기준에 맞지 않는 점을 경중을 나눠 서면으로 전한다','시정: 위탁처가 원인과 대책을 내고 기한까지 고친다','확인·종결: 고쳐진 것을 확인하고 기록을 닫는다. 반복 지적은 계약 재검토로 이어진다'],who:['품질','품질·지점','품질','위탁처','품질']},
  en:{t:'How contractor audits work',st:['Plan: fix the audit date and scope (for example yearly) and notify the contractor','On-site check: records, tool calibration, parts storage, training records and work practices','Findings: non-conformities are reported in writing, graded by severity','Corrective action: the contractor gives causes and fixes, completed by a deadline','Verify and close: confirm the fixes and close the record; repeat findings lead to a contract review'],who:['Quality','Quality & station','Quality','Contractor','Quality']}})[l];
 if(!W)return F.mnt_audit('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#E08A2E','#D64545','#2E9B5F','#2C7A7B'],'12s')},
/* 5-1 AOGの判断の流れ：問いが順に光り、「はい」なら右の結果へ、「いいえ」なら下の問いへ */
mnt_aog:function(l){
 var W=({ja:{t:'不具合が見つかったときの判断の流れ（例）',q:['MELで出発できるか','その空港で、数時間のうちに直せるか','代わりの機体や他社の便が使えるか'],r:['制限を反映して出発（3-3）','遅れとして新しい出発の時刻を案内','機材の交換・ほかの便への振り替え'],last:'欠航。ホテル・翌日の便・部品と人の手配',y:'はい',no:'いいえ',n:['判断するのは整備（MCC）と運航管理。支店は、それぞれの道に必要な準備を同時に始める','乗員の勤務時間の上限と空港の運用時間（夜間の制限）が、待てる時間の上限になる']},
  ko:{t:'결함이 발견됐을 때의 판단 흐름(예)',q:['MEL로 출발할 수 있는가','그 공항에서 몇 시간 안에 고칠 수 있는가','대체 기체나 타사 편을 쓸 수 있는가'],r:['제한을 반영해 출발(3-3)','지연으로 새 출발 시각 안내','기재 교체·다른 편으로 대체 수송'],last:'결항. 호텔·다음 날 편·부품과 사람 수배',y:'예',no:'아니오',n:['판단은 정비(MCC)와 운항관리가 한다. 지점은 각 길에 필요한 준비를 동시에 시작한다','승무원 근무시간 상한과 공항 운용 시간(야간 제한)이 기다릴 수 있는 시간의 상한이 된다']},
  en:{t:'Decision flow when a defect is found (example)',q:['Can it depart under the MEL?','Can it be fixed at this airport within a few hours?','Is a replacement aircraft or another carrier’s flight available?'],r:['Depart with restrictions applied (3-3)','Delay: announce a new departure time','Swap aircraft or rebook on other flights'],last:'Cancel: hotels, next-day flight, parts and people',y:'Yes',no:'No',n:['Maintenance (MCC) and dispatch decide; the station starts preparing for every path at once','Crew duty limits and airport operating hours (night restrictions) cap how long you can wait']}})[l];
 if(!W)return F.mnt_aog('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=64,lh=FS(11)*1.3,dur='12s',n=4,cc=['#2E9B5F','#E08A2E','#2F6FD6'];
 W.q.forEach(function(q,i){var nq=LI(q,11,230).length,nr=LI(W.r[i],11,210).length,h=Math.max(nq,nr)*lh+20;
  s+='<g>'+R(20,y,270,h,'#fff',12,' stroke="#0f3558" stroke-width="2"')+'<rect x="20" y="'+y+'" width="270" height="'+h+'" rx="12" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.5)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(155,y+h/2+FS(11)*0.35-(nq-1)*lh/2+(nq-1)*lh/2,q,11,'#0f3558',900,230)+'</g>';
  s+=ARW(296,y+h/2,380,y+h/2,cc[i],3)+LB(338,y+h/2-12,W.y,11,cc[i],'middle','#fff');
  s+=R(390,y,230,h,cc[i],12)+WR(505,y+h/2+FS(11)*0.35,W.r[i],11,'#fff',900,210);
  y+=h;s+=ARW(155,y+4,155,y+34,'#D64545',3)+LB(196,y+20,W.no,11,'#D64545','start','#fff');y+=40});
 var nl=LI(W.last,11,560).length,h=nl*lh+20;
 s+='<g>'+R(20,y,600,h,'#D64545',12)+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="12" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(3,n,0,.45)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(320,y+h/2+FS(11)*0.35,W.last,11,'#fff',900,560)+'</g>';y+=h;
 var L=LIST(W.n,y+14,600,11);return SVG(L.y+8,s+L.s)},
/* 5-2 部品を届けるまでの時間（例）：棒が伸びる */
mnt_parts:function(l){
 var W=({ja:{t:'部品が届くまでの時間の目安（例）',r:['空港の委託在庫にある','近くの空港の自社の在庫','その空港の他社から借りる','本拠地から次の自社の便で','メーカーの部品センターから国際の急ぎ便'],h:['1時間','4〜6時間','3〜8時間','8〜24時間','24〜72時間'],ax:'時間',n:['時間は例。通関・夜間の制限・便の有無で大きく変わる★','大きな部品（エンジン・脚など）は貨物機や専用の便が必要で、さらに時間がかかる']},
  ko:{t:'부품이 도착하기까지의 시간 기준(예)',r:['공항 위탁 재고에 있다','가까운 공항의 자사 재고','그 공항의 타사에서 빌린다','본거지에서 다음 자사 편으로','제작사 부품 센터에서 국제 특송'],h:['1시간','4~6시간','3~8시간','8~24시간','24~72시간'],ax:'시간',n:['시간은 예. 통관·야간 제한·편 유무로 크게 달라진다★','큰 부품(엔진·착륙장치 등)은 화물기나 전용 편이 필요해 시간이 더 걸린다']},
  en:{t:'How long parts take to arrive (example)',r:['In consignment stock at the airport','Own stock at a nearby airport','Borrowed from another airline there','On the next own flight from base','Express from the manufacturer’s parts centre'],h:['1 hour','4–6 hours','3–8 hours','8–24 hours','24–72 hours'],ax:'Hours',n:['Times are examples; customs, night restrictions and flight availability change them a lot ★','Large parts (engines, landing gear) need freighters or dedicated flights and take longer still']}})[l];
 if(!W)return F.mnt_parts('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=62,lh=FS(11)*1.3,cc=['#2E9B5F','#2C7A7B','#2F6FD6','#6B4FA0','#D64545'],v=[[0,1],[4,6],[3,8],[8,24],[24,72]];
 function X(hh){return 40+Math.log(hh+1)/Math.log(73)*560}
 var y0=y;W.r.forEach(function(r,i){var t=r+(l==='ja'?'：':': ')+W.h[i],nl=LI(t,11,580).length,h=nl*lh+36;
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+WR(30,y+8+FS(11)*0.9,t,11,D,800,580,'start');
  var x0=X(v[i][0]),x1=X(v[i][1]),by=y+nl*lh+12;
  s+='<rect x="'+x0.toFixed(1)+'" y="'+by+'" width="0" height="14" rx="5" fill="'+cc[i]+'"><animate attributeName="width" values="0;'+(x1-x0).toFixed(1)+';'+(x1-x0).toFixed(1)+'" keyTimes="0;.3;1" dur="6s" begin="'+(i*0.4)+'s" fill="freeze"/></rect>';y+=h+4});
 [0,1,6,24,72].forEach(function(t){s+='<line x1="'+X(t)+'" y1="'+y0+'" x2="'+X(t)+'" y2="'+y+'" stroke="#9FB0C2" stroke-dasharray="3 4" opacity=".6"/>'+tx(X(t),y+16,String(t),11,'#5B6B7D',700)});
 s+=tx(320,y+38,W.ax,11,'#0f3558',800);y+=46;
 var L=LIST(W.n,y+6,600,11);return SVG(L.y+8,s+L.s)},
/* 5-3 夜のAOGの1日（例）：時刻ごとに整備と支店の動きが光る */
mnt_aogday:function(l){
 var W=({ja:{t:'夜のAOG ― 時刻ごとの動き（例）',st:['18:30 出発前の点検で不具合。MELでは出発できない','19:00 部品がこの空港にないと分かる。部品の手配と到着の見込み','19:30 夜間の制限と乗員の勤務の上限から、今夜の出発は難しいと判断','20:00 欠航を決め、お客様の案内・ホテル・翌日の便の予約を始める','翌朝 部品が着き、通関・持ち込み・交換・確認の署名','翌日 臨時の便で出発。経緯を本社に報告し、再発防止を話し合う'],who:['整備士・MCC','MCC・支店','運航管理・支店','支店・本社','支店・整備士','支店・品質']},
  ko:{t:'밤의 AOG — 시각별 움직임(예)',st:['18:30 출발 전 점검에서 결함. MEL로는 출발할 수 없다','19:00 부품이 이 공항에 없음을 확인. 부품 수배와 도착 전망','19:30 야간 제한과 승무원 근무 상한으로 오늘 밤 출발은 어렵다고 판단','20:00 결항을 정하고 승객 안내·호텔·다음 날 편 예약을 시작','다음 날 아침 부품 도착, 통관·반입·교환·확인 서명','다음 날 임시편으로 출발. 경위를 본사에 보고하고 재발 방지를 논의'],who:['정비사·MCC','MCC·지점','운항관리·지점','지점·본사','지점·정비사','지점·품질']},
  en:{t:'A night-time AOG, hour by hour (example)',st:['18:30 A defect found on the pre-departure check; no MEL relief','19:00 The part is not at this airport; ordering and arrival estimate','19:30 Night restrictions and crew duty limits rule out departing tonight','20:00 Cancellation decided; passenger information, hotels and next-day bookings begin','Next morning The part arrives: customs, airside delivery, fitting, certification','Next day Departure as a special flight; report to head office and discuss prevention'],who:['Engineers & MCC','MCC & station','Dispatch & station','Station & head office','Station & engineers','Station & quality']}})[l];
 if(!W)return F.mnt_aogday('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#D64545','#E08A2E','#6B4FA0','#2F6FD6','#2E9B5F','#2C7A7B'],'14s')},
/* 6-1 確認の署名ができるまで：学ぶ → 経験 → 国の資格 → 機種の限定 → 会社の認可 */
mnt_lic:function(l){
 var W=({ja:{t:'機体に確認の署名ができるまで（例）',st:['学ぶ：養成の学校や会社の訓練で、機体・エンジン・電気・法規の基礎','経験を積む：整備の現場で、決められた期間の実務の経験','国の資格：学科と実地の試験に合格し、整備士の資格を受ける','機種の限定：B737・B787など、扱う機種ごとの訓練と試験','会社の認可：会社の手順を学び、確認の署名ができる人として認められる'],who:['本人・学校','会社','国（当局）','国・会社','会社']},
  ko:{t:'기체에 확인 서명을 할 수 있기까지(예)',st:['배운다: 양성 학교나 회사 훈련에서 기체·엔진·전기·법규 기초','경험을 쌓는다: 정비 현장에서 정해진 기간의 실무 경험','국가 자격: 학과와 실기 시험에 합격해 정비사 자격을 받는다','기종 한정: B737·B787 등 다루는 기종별 훈련과 시험','회사 인가: 회사 절차를 배우고 확인 서명을 할 수 있는 사람으로 인정받는다'],who:['본인·학교','회사','국가(당국)','국가·회사','회사']},
  en:{t:'Becoming able to certify an aircraft (example)',st:['Learn: basics of airframes, engines, electrics and law at a training school or in company training','Gain experience: the required period of practical work in maintenance','National licence: pass written and practical exams and receive the engineer licence','Type rating: training and exams for each type handled, such as the B737 or B787','Company authorisation: learn company procedures and be authorised to certify'],who:['Individual & school','Company','State (authority)','State & company','Company']}})[l];
 if(!W)return F.mnt_lic('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#2C7A7B','#6B4FA0','#E08A2E','#2E9B5F'],'12s')},
/* 6-2 整備の仕事の地図：現場の仕事と事務所の仕事が順に光る */
mnt_jobs:function(l){
 var W=({ja:{t:'整備の仕事の地図',a:'現場',b:'事務所',j:[['ライン整備','出発前の点検・不具合の処置',0],['機体の重整備','格納庫での大きな点検（2-1）',0],['部品の工場','エンジン・部品の分解と修理',0],['MCC','24時間、全機の状態を見て判断',1],['整備の技術','AD・SB・信頼性・改修の判断',1],['整備の計画','点検の時期・格納庫・部品の計画',1],['品質','監査・記録・認定の維持',1],['部品と調達','在庫・購入・修理の手配',1]],n:['多くの人は現場から始め、経験を積んで事務所の仕事にも広がる','支店の経験（AOGの調整・委託先の管理）は、MCCや計画の仕事で役に立つ']},
  ko:{t:'정비 직무 지도',a:'현장',b:'사무실',j:[['라인 정비','출발 전 점검·결함 처치',0],['기체 중정비','격납고에서 큰 점검(2-1)',0],['부품 공장','엔진·부품 분해와 수리',0],['MCC','24시간 전 기체 상태를 보고 판단',1],['정비 기술','AD·SB·신뢰성·개조 판단',1],['정비 계획','점검 시기·격납고·부품 계획',1],['품질','감사·기록·인증 유지',1],['부품과 구매','재고·구매·수리 수배',1]],n:['많은 사람이 현장에서 시작해 경험을 쌓으며 사무실 업무로도 넓혀 간다','지점 경험(AOG 조정·위탁처 관리)은 MCC나 계획 업무에서 도움이 된다']},
  en:{t:'Map of maintenance jobs',a:'Hands-on',b:'Office',j:[['Line maintenance','Pre-departure checks, defect rectification',0],['Base maintenance','Heavy checks in the hangar (2-1)',0],['Component shop','Overhaul and repair of engines and parts',0],['MCC','Watching the whole fleet 24 hours and deciding',1],['Engineering','ADs, SBs, reliability and modifications',1],['Planning','Check timing, hangar slots and parts',1],['Quality','Audits, records and keeping approvals',1],['Parts and purchasing','Stock, buying and repair orders',1]],n:['Many start hands-on and broaden into office roles with experience','Station experience (coordinating AOGs, managing contractors) is useful in MCC and planning']}})[l];
 if(!W)return F.mnt_jobs('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),lh=FS(11)*1.3,dur='16s',n=W.j.length,cc=['#2E9B5F','#2F6FD6'],y=60;
 s+=R(20,y,290,30,cc[0],8)+tx(165,y+20,W.a,12,'#fff',900)+R(330,y,290,30,cc[1],8)+tx(475,y+20,W.b,12,'#fff',900);y+=40;
 var col=[W.j.filter(function(j){return !j[2]}),W.j.filter(function(j){return j[2]})],yy=[y,y],idx=0;
 W.j.forEach(function(j,i){var c=j[2],x=c?330:20,t1=LI(j[0],12,262).length,t2=LI(j[1],11,262).length,h=t1*FS(12)*1.3+t2*lh+30,y0=yy[c];
  s+='<g>'+R(x,y0,290,h,'#fff',10,' stroke="'+cc[c]+'" stroke-width="2"')+'<rect x="'+x+'" y="'+y0+'" width="290" height="'+h+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.5)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(x+14,y0+10+t1*FS(12)*1.3/2+FS(12)*0.35,j[0],12,cc[c],900,262,'start')+WR(x+14,y0+18+t1*FS(12)*1.3+t2*lh/2+FS(11)*0.35,j[1],11,D,700,262,'start')+'</g>';yy[c]+=h+8});
 var L=LIST(W.n,Math.max(yy[0],yy[1])+6,600,11);return SVG(L.y+8,s+L.s)},
/* 6-3 支店の人が整備に強くなる道 */
mnt_path:function(l){
 var W=({ja:{t:'支店・運送の人が整備に強くなる道（例）',st:['ことばを覚える：この講座のPart 0〜1で、機体の部分と整備の用語','MELとCDLを読む：自社の機種のMELの1ページを、整備士と一緒に読んでみる','AOGに立ち会う：部品・通関・お客様の段取りを、記録を付けながら経験する','整備の体制を受け持つ：委託先との契約・一覧表・監査に加わる','次の道を選ぶ：MCC・整備の計画・品質への異動、機種の概要の講習、資格の勉強'],who:['1か月','3か月','1年','2〜3年','その先']},
  ko:{t:'지점·운송 직원이 정비에 강해지는 길(예)',st:['용어를 익힌다: 이 강좌 Part 0~1에서 기체 부위와 정비 용어','MEL과 CDL을 읽는다: 자사 기종 MEL 한 쪽을 정비사와 함께 읽어 본다','AOG에 함께한다: 부품·통관·승객 준비를 기록하며 경험한다','정비 체제를 맡는다: 위탁처 계약·일람표·감사에 참여한다','다음 길을 고른다: MCC·정비 계획·품질로 이동, 기종 개요 강습, 자격 공부'],who:['1개월','3개월','1년','2~3년','그다음']},
  en:{t:'How station and ground staff get stronger in maintenance (example)',st:['Learn the words: aircraft parts and maintenance terms in Parts 0–1 of this course','Read the MEL and CDL: go through one page of your type’s MEL with an engineer','Be there for AOGs: handle parts, customs and passengers while keeping a log','Own the maintenance arrangements: join contracts, the arrangement list and audits','Choose the next step: move to MCC, planning or quality, take a type familiarisation course, study for a licence'],who:['1 month','3 months','1 year','2–3 years','Beyond']}})[l];
 if(!W)return F.mnt_path('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#2C7A7B','#D64545','#E08A2E','#2E9B5F'],'12s')}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
