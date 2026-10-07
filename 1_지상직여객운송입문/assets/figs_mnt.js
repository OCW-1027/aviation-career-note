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
 var L=LIST(W.n,428,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
