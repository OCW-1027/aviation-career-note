/* 航空貨物（CGO）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う。数字は一般的な例（★は確認が要る値）。作成ルール：00_그림작성규칙.md */
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
/* 0-1 1件の貨物の流れ：荷主から届け先まで。右は出発を基準にした時刻の目安 */
cgo_flow:function(l){
 var W=({ja:{t:'1件の貨物が届くまで（輸出から輸入、時刻は目安）',st:['荷主：品物を用意し、インボイスとパッキングリストを作る','フォワーダー：集荷し、ほかの荷主の貨物とまとめてハウスAWBを発行する','上屋（貨物ターミナル）：搬入・計量・保安検査。税関の輸出の許可を受ける','ULDの組み付け：パレットやコンテナに積み、重さと形を確かめる','航空会社：搭載の計画どおりに機体に積み、出発する','到着地：取り降ろし・ULDの分解・輸入の許可','フォワーダーが受け取り、届け先へ配達する'],who:['前日〜当日','出発6時間前ごろ','締め切り：出発3〜4時間前★','出発2〜3時間前','出発','到着後2〜4時間★','到着の当日〜翌日']},
  ko:{t:'화물 한 건이 도착하기까지(수출에서 수입, 시각은 기준)',st:['화주: 물품을 준비하고 인보이스와 패킹 리스트를 만든다','포워더: 집하해 다른 화주의 화물과 묶고 하우스 AWB를 발행한다','화물터미널: 반입·계량·보안검색. 세관의 수출 허가를 받는다','ULD 빌드업: 팔레트나 컨테이너에 쌓고 무게와 모양을 확인한다','항공사: 탑재 계획대로 기체에 싣고 출발한다','도착지: 하기·ULD 해체·수입 허가','포워더가 인수해 수하인에게 배달한다'],who:['전날~당일','출발 6시간 전쯤','마감: 출발 3~4시간 전★','출발 2~3시간 전','출발','도착 후 2~4시간★','도착 당일~다음 날']},
  en:{t:'How one shipment travels (export to import; times are a guide)',st:['Shipper: prepares the goods, the invoice and the packing list','Forwarder: collects, consolidates with other shippers’ cargo and issues a house AWB','Cargo terminal: acceptance, weighing and screening; customs export clearance','ULD build-up: loaded onto pallets or containers, weight and contour checked','Airline: loads the aircraft to the load plan and departs','Destination: offloading, ULD breakdown and import clearance','The forwarder collects and delivers to the consignee'],who:['Day before or same day','About 6 h before departure','Cut-off: 3–4 h before ★','2–3 h before departure','Departure','2–4 h after arrival ★','Arrival day or next day']}})[l];
 if(!W)return F.cgo_flow('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#6B4FA0','#2F6FD6','#E08A2E','#2C7A7B','#D64545','#E08A2E','#2E9B5F'],'14s')},
/* 0-2 運送状の2段：マスターAWB（航空会社とフォワーダー）の中に、ハウスAWB（フォワーダーと各荷主）が入る */
cgo_awb:function(l){
 var W=({ja:{t:'混載の書類：マスターAWBとハウスAWB',m:'マスターAWB',ms:'航空会社 ⇄ フォワーダー（1件）',h:'ハウスAWB',hs:['荷主A：電子部品 120kg','荷主B：医薬品 40kg','荷主C：機械の部品 340kg'],n:['航空会社から見ると、フォワーダーが1つの荷主。3件の貨物は1枚のマスターAWB（合計500kg）で運ぶ','荷主ごとの約束はハウスAWB。到着地ではフォワーダーの代理店が受け取り、荷主ごとに分けて渡す','重さの合計が大きいほど1kgあたりの運賃が下がる。これが混載の利点']},
  ko:{t:'혼재의 서류: 마스터 AWB와 하우스 AWB',m:'마스터 AWB',ms:'항공사 ⇄ 포워더(1건)',h:'하우스 AWB',hs:['화주 A: 전자부품 120kg','화주 B: 의약품 40kg','화주 C: 기계 부품 340kg'],n:['항공사에서 보면 포워더가 하나의 화주. 화물 3건은 마스터 AWB 1장(합계 500kg)으로 운송','화주별 약속은 하우스 AWB. 도착지에서는 포워더의 대리점이 인수해 화주별로 나눠 인도','무게 합계가 클수록 1kg당 운임이 내려간다. 이것이 혼재의 장점']},
  en:{t:'Consolidation paperwork: master and house AWBs',m:'Master AWB',ms:'Airline ⇄ forwarder (one shipment)',h:'House AWB',hs:['Shipper A: electronic parts 120 kg','Shipper B: pharmaceuticals 40 kg','Shipper C: machine parts 340 kg'],n:['To the airline, the forwarder is a single shipper: the three shipments travel on one master AWB (500 kg in total)','Each shipper’s contract is a house AWB; at destination the forwarder’s agent takes delivery and splits it by shipper','The larger the total weight, the lower the rate per kg: that is the benefit of consolidation']}})[l];
 if(!W)return F.cgo_awb('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),lh=FS(11)*1.3,dur='9s';
 var mh=Math.max(LI(W.ms,11,300).length*lh+FS(13)*1.3+22,70);
 var nms=LI(W.ms,11,300).length;mh=16+FS(13)*1.3+nms*lh+14;s+=R(150,60,340,mh,'#2F6FD6',12)+tx(320,60+10+FS(13),W.m,13,'#fff',900)+WR(320,60+18+FS(13)*1.3+nms*lh/2+FS(11)*0.3,W.ms,11,'#fff',800,300);
 var y0=60+mh,yb=y0+60,cw=186;
 var bh=0;W.hs.forEach(function(h){bh=Math.max(bh,LI(h,11,cw-20).length*lh+FS(12)*1.3+26)});
 W.hs.forEach(function(h,i){var x=20+i*(cw+21),cx=x+cw/2,nl=LI(h,11,cw-20).length;
  s+='<path d="M320 '+y0+' L320 '+(y0+24)+' L'+cx+' '+(y0+24)+' L'+cx+' '+yb+'" fill="none" stroke="#9FB0C2" stroke-width="3"/>';
  s+='<g>'+R(x,yb,cw,bh,'#fff',10,' stroke="#E08A2E" stroke-width="2"')+'<rect x="'+x+'" y="'+yb+'" width="'+cw+'" height="'+bh+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,3,0,.45)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+tx(cx,yb+10+FS(12),W.h,12,'#E08A2E',900)+WR(cx,yb+16+FS(12)*1.3+(bh-26-FS(12)*1.3)/2+FS(11)*0.35,h,11,D,800,cw-20)+'</g>';});
 var y=yb+bh+16;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 0-2 貨物室の大きさ：B737-800・B787-9のベリーと貨物専用機。棒が伸びる */
cgo_hold:function(l){
 var W=({ja:{t:'貨物を積める容積の目安',r:[['B737-800（旅客機）','床下のばら積み・約44m³'],['B787-9（旅客機）','床下のULD・約170m³'],['B777F（貨物専用機）','主甲板＋床下・約650m³、最大約100トン']],n:['旅客機の床下は、乗客の手荷物を積んだ残りが貨物のスペース。満席の日ほど少なくなる','B737はULDを使わず手で積む（ばら積み）。B787はULD（コンテナ・パレット）で積むので、大きな貨物や量の多い貨物に向く','数字はメーカーの公表値をもとにした目安。仕様と座席の配置で変わる★']},
  ko:{t:'화물을 실을 수 있는 용적 기준',r:[['B737-800(여객기)','하부 벌크 적재·약 44m³'],['B787-9(여객기)','하부 ULD·약 170m³'],['B777F(화물기)','메인 데크+하부·약 650m³, 최대 약 100톤']],n:['여객기 하부는 승객 수하물을 싣고 남은 곳이 화물 공간. 만석인 날일수록 적어진다','B737은 ULD 없이 손으로 싣는다(벌크). B787은 ULD(컨테이너·팔레트)로 실어 크거나 양이 많은 화물에 맞는다','숫자는 제작사 공표치를 바탕으로 한 기준. 사양과 좌석 배치에 따라 다르다★']},
  en:{t:'Cargo volume at a glance',r:[['B737-800 (passenger)','Lower deck, bulk loaded: about 44 m³'],['B787-9 (passenger)','Lower deck in ULDs: about 170 m³'],['B777F (freighter)','Main deck + lower deck: about 650 m³, up to about 100 t']],n:['On a passenger aircraft, cargo gets what is left of the hold after passenger baggage, so less on full flights','The B737 is bulk loaded by hand without ULDs; the B787 uses ULDs (containers and pallets), suiting larger or heavier volumes','Figures are guides based on manufacturer data and vary with specification and cabin layout ★']}})[l];
 if(!W)return F.cgo_hold('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=62,lh=FS(11)*1.3,v=[44,170,650],cc=['#2F6FD6','#2C7A7B','#E08A2E'];
 W.r.forEach(function(r,i){var t=r[0]+(l==='ja'?'：':': ')+r[1],nl=LI(t,11,580).length,h=nl*lh+40,bw=Math.max(8,v[i]/650*560);
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+WR(30,y+8+nl*lh/2+FS(11)*0.3,t,11,D,800,580,'start');
  s+='<rect x="40" y="'+(y+nl*lh+14)+'" width="0" height="16" rx="6" fill="'+cc[i]+'"><animate attributeName="width" values="0;'+bw.toFixed(1)+';'+bw.toFixed(1)+'" keyTimes="0;.35;1" dur="5s" begin="'+(i*0.5)+'s" fill="freeze"/></rect>';y+=h+6});
 var L=LIST(W.n,y+6,600,11);return SVG(L.y+8,s+L.s)},
/* 0-3 日本と韓国の主な貨物の空港。仁川から日本の空港への線が流れる */
cgo_map:function(l){
 var W=({ja:{t:'日本と韓国の主な貨物の空港',a:{ICN:'仁川：乗り継ぎの拠点',NRT:'成田：日本最大の国際貨物',HND:'羽田：ベリーと急ぎの小口',KIX:'関西：24時間',NGO:'中部：24時間',FUK:'福岡',PUS:'金海'},n:['日本の貨物が仁川で乗り継いで、アジア・欧米へ運ばれることも多い（線の流れ）','空港を選ぶときは、工場からの距離・締め切り・24時間運用か・専用の施設を比べる']},
  ko:{t:'한국과 일본의 주요 화물 공항',a:{ICN:'인천: 환적 거점',NRT:'나리타: 일본 최대 국제화물',HND:'하네다: 벨리와 급송 소량',KIX:'간사이: 24시간',NGO:'주부: 24시간',FUK:'후쿠오카',PUS:'김해'},n:['일본 화물이 인천에서 환적해 아시아·구미로 가는 경우도 많다(선의 흐름)','공항을 고를 때는 공장과의 거리·마감·24시간 운용 여부·전용 시설을 비교한다']},
  en:{t:'Major cargo airports in Korea and Japan',a:{ICN:'Incheon: transfer hub',NRT:'Narita: Japan’s largest international cargo airport',HND:'Haneda: belly cargo and urgent small parcels',KIX:'Kansai: 24 hours',NGO:'Chubu: 24 hours',FUK:'Fukuoka',PUS:'Gimhae'},n:['Japanese cargo often transfers at Incheon for Asia, Europe and the Americas (the moving lines)','When choosing an airport, compare distance from the factory, cut-off times, 24-hour operation and specialist facilities']}})[l];
 if(!W)return F.cgo_map('ja');setK(1);
 var M=window.RMAP2&&window.RMAP2.map,s=TTL(320,30,W.t,15,'#0f3558',600),vx=20,vy=95,vw=860,vh=330,sc=600/vw,oy=56,H2=vh*sc;
 function P(lon,lat){return [20+((55.4+(lon-126)*51.25)-vx)*sc,oy+((358.2-(lat-34)*63.65)-vy)*sc]}
 s+=R(20,oy,600,H2,'#E6F0FA',12);
 if(M&&M.land){var cid='cgoclip'+l;s+='<defs><clipPath id="'+cid+'"><rect x="20" y="'+oy+'" width="600" height="'+H2.toFixed(1)+'" rx="12"/></clipPath></defs><g clip-path="url(#'+cid+')"><g transform="translate('+(20-vx*sc).toFixed(2)+' '+(oy-vy*sc).toFixed(2)+') scale('+sc.toFixed(4)+')"><path d="'+M.land+'" fill="#F7F3E8" stroke="#B9C6D3" stroke-width="2"/></g></g>'}
 var A={ICN:[126.44,37.46],NRT:[140.39,35.77],HND:[139.78,35.55],KIX:[135.23,34.43],NGO:[136.8,34.86],FUK:[130.45,33.59],PUS:[128.94,35.18]};
 var ic=P(A.ICN[0],A.ICN[1]);
 ['NRT','KIX','NGO','FUK'].forEach(function(k,i){var p=P(A[k][0],A[k][1]),mx=(ic[0]+p[0])/2,my=Math.min(ic[1],p[1])-40;
  s+='<path d="M'+ic[0].toFixed(1)+' '+ic[1].toFixed(1)+' Q'+mx.toFixed(1)+' '+my.toFixed(1)+' '+p[0].toFixed(1)+' '+p[1].toFixed(1)+'" fill="none" stroke="#E08A2E" stroke-width="3" stroke-dasharray="8 7" opacity=".85"><animate attributeName="stroke-dashoffset" values="0;-30" dur="1.2s" repeatCount="indefinite"/></path>'});
 var lab={ICN:[0,-1],NRT:[1,-1],HND:[1,1],KIX:[0,1],NGO:[0,-1],FUK:[0,1],PUS:[0,1]};
 Object.keys(A).forEach(function(k){var p=P(A[k][0],A[k][1]),big=k==='ICN'||k==='NRT';
  s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+(big?9:6)+'" fill="'+(big?'#D64545':'#2F6FD6')+'" stroke="#fff" stroke-width="2"/>'});
 var y=oy+H2+10,lh=FS(11)*1.3,keys=['ICN','NRT','HND','KIX','NGO','FUK','PUS'];
 for(var i=0;i<keys.length;i+=2){var row=keys.slice(i,i+2),hh=0;row.forEach(function(k){hh=Math.max(hh,LI(W.a[k],11,262).length*lh)});hh+=12;
  row.forEach(function(k,j){var x=20+j*306,big=k==='ICN'||k==='NRT';s+=R(x,y,294,hh,'#fff',8,' stroke="#D5DEE8"')+'<circle cx="'+(x+14)+'" cy="'+(y+hh/2)+'" r="6" fill="'+(big?'#D64545':'#2F6FD6')+'"/>'+WR(x+28,y+hh/2+FS(11)*0.35,W.a[k],11,D,800,258,'start')});y+=hh+6}
 var L=LIST(W.n,y+6,600,11);return SVG(L.y+8,s+L.s)},
/* 1-1 チャージャブル・ウェイト：実際の重さと容積重量（縦×横×高さ÷6,000）の大きい方。2つの例で棒を比べる */
cgo_chw:function(l){
 var W=({ja:{t:'運賃の計算に使う重さ（チャージャブル・ウェイト）',ex:[['例1：軽くて大きい箱','100×100×100cm、実際の重さ50kg'],['例2：小さくて重い箱','40×30×20cm、実際の重さ25kg']],a:'実際の重さ',v:'容積重量',c:'こちらで計算',n:['容積重量（kg）＝ 縦×横×高さ（cm）÷ 6,000。例1は 1,000,000 ÷ 6,000 ＝ 約167kg','実際の重さと容積重量のうち大きい方が、運賃の計算に使う重さになる。例1は167kg、例2は25kg','割る数（6,000）は一般的な例。会社や運賃の種類で違うことがある★']},
  ko:{t:'운임 계산에 쓰는 무게(차지어블 웨이트)',ex:[['예1: 가볍고 큰 상자','100×100×100cm, 실제 무게 50kg'],['예2: 작고 무거운 상자','40×30×20cm, 실제 무게 25kg']],a:'실제 무게',v:'용적 중량',c:'이것으로 계산',n:['용적 중량(kg) = 가로×세로×높이(cm) ÷ 6,000. 예1은 1,000,000 ÷ 6,000 = 약 167kg','실제 무게와 용적 중량 중 큰 쪽이 운임 계산에 쓰는 무게. 예1은 167kg, 예2는 25kg','나누는 수(6,000)는 일반적인 예. 회사나 운임 종류에 따라 다를 수 있다★']},
  en:{t:'The weight used for charges (chargeable weight)',ex:[['Example 1: light, bulky box','100×100×100 cm, actual weight 50 kg'],['Example 2: small, heavy box','40×30×20 cm, actual weight 25 kg']],a:'Actual weight',v:'Volume weight',c:'Charged on this',n:['Volume weight (kg) = length × width × height (cm) ÷ 6,000. Example 1: 1,000,000 ÷ 6,000 = about 167 kg','Whichever is greater, actual or volume weight, is the chargeable weight: 167 kg in example 1, 25 kg in example 2','The divisor (6,000) is a common example; it can differ by airline or rate type ★']}})[l];
 if(!W)return F.cgo_chw('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=60,lh=FS(11)*1.3,vals=[[50,167],[25,4]],mx=180;
 W.ex.forEach(function(e,i){var t1=LI(e[0],12,560).length,t2=LI(e[1],11,560).length,hh=t1*FS(12)*1.3+t2*lh+FS(11)*1.3*2+86;
  s+=R(20,y,600,hh,i?'#fff':'#F4F7FB',12,' stroke="#D5DEE8"')+WR(36,y+10+t1*FS(12)*1.3/2+FS(12)*0.35,e[0],12,'#0f3558',900,560,'start')+WR(36,y+14+t1*FS(12)*1.3+t2*lh/2+FS(11)*0.35,e[1],11,D,800,560,'start');
  var yy=y+22+t1*FS(12)*1.3+t2*lh,big=vals[i][0]>=vals[i][1]?0:1;
  [[W.a,vals[i][0],'#2F6FD6'],[W.v,vals[i][1],'#E08A2E']].forEach(function(b,j){var by=yy+j*(FS(11)*1.3+26),bw=Math.max(6,b[1]/mx*540),lab=b[0]+' '+b[1]+'kg'+(j===big?(l==='ja'?' ― ':' — ')+W.c:'');
   s+=WR(36,by+FS(11)*0.9,lab,11,j===big?'#D64545':D,900,560,'start')+'<rect x="36" y="'+(by+FS(11)*1.3+2)+'" width="0" height="14" rx="6" fill="'+b[2]+'"><animate attributeName="width" values="0;'+bw.toFixed(1)+';'+bw.toFixed(1)+'" keyTimes="0;.3;1" dur="4s" begin="'+(i*0.6+j*0.3)+'s" fill="freeze"/></rect>'});
  y+=hh+8});
 var L=LIST(W.n,y+4,600,11);return SVG(L.y+8,s+L.s)},
/* 1-2 AWBの書式：主な欄が順に光る（架空の例） */
cgo_awbform:function(l){
 var W=({ja:{t:'航空運送状（AWB）の主な欄（架空の例）',n:['運送状の番号：航空会社の3けた＋8けた。最後の1けたは、前の7けたを7で割った余り（検査の数字）','荷送人：送る会社の名前と住所','荷受人：受け取る会社の名前と住所。違っていると到着地で引き渡せない','出発地と到着地：空港の3文字のコード','個数・実際の重さ・運賃の計算に使う重さ・単価・運賃（167kg×300円）','品名：具体的に書く。「部品」ではなく「半導体製造装置用の部品」','取り扱いの指示（壊れ物・温度など）と、運賃の前払い・着払い']},
  ko:{t:'항공화물운송장(AWB)의 주요 칸(가상의 예)',n:['운송장 번호: 항공사 3자리+8자리. 마지막 1자리는 앞 7자리를 7로 나눈 나머지(체크 디지트)','송하인: 보내는 회사의 이름과 주소','수하인: 받는 회사의 이름과 주소. 틀리면 도착지에서 인도할 수 없다','출발지와 도착지: 공항 3글자 코드','개수·실제 무게·운임 계산 무게·단가·운임(167kg×300엔)','품명: 구체적으로. ‘부품’이 아니라 ‘반도체 제조장비용 부품’','취급 지시(파손 주의·온도 등)와 운임 선불·착불']},
  en:{t:'Main boxes on an air waybill (fictional example)',n:['AWB number: 3-digit airline prefix + 8 digits; the last digit is the remainder of the first seven divided by 7 (check digit)','Shipper: name and address of the sender','Consignee: name and address of the receiver; if wrong, the cargo cannot be delivered at destination','Airports of departure and destination: 3-letter codes','Pieces, actual weight, chargeable weight, rate and charge (167 kg × ¥300)','Nature of goods: be specific, e.g. “parts for semiconductor equipment”, not just “parts”','Handling information (fragile, temperature, etc.) and prepaid or collect charges']}})[l];
 if(!W)return F.cgo_awbform('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='14s',y=58,lh=FS(11)*1.3;
 var C=[['AWB No.','180-12345675'],['Shipper','XYZ PARTS CO., LTD. TOKYO'],['Consignee','ABC ELECTRONICS CO., LTD. SEOUL'],['Airport of Departure / Destination','NRT → ICN'],['Pieces / Gross Wt / Chargeable Wt / Rate / Charge','2 PCS / 50.0 KG / 167.0 KG / 300 / 50,100'],['Nature and Quantity of Goods','PARTS FOR SEMICONDUCTOR EQUIPMENT'],['Handling Information / Charges','FRAGILE / PREPAID']];
 s+=R(16,y-4,608,0,'#fff',0);var top=y;
 C.forEach(function(c,i){var nl=LI(c[0],9,540).length,nv=LI(c[1],11,540).length,h=nl*FS(9)*1.3+nv*lh+16;
  s+='<g>'+R(20,y,600,h,'#fff',4,' stroke="#9FB0C2"')+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="4" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,C.length,0,.5)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'+BADGE(40,y+h/2,i+1,10)+WR(64,y+6+nl*FS(9)*1.3/2+FS(9)*0.35,c[0],9,'#5B6B7D',700,540,'start')+WR(64,y+8+nl*FS(9)*1.3+nv*lh/2+FS(11)*0.35,c[1],11,'#0f3558',900,540,'start')+'</g>';y+=h});
 s+='<rect x="16" y="'+(top-4)+'" width="608" height="'+(y-top+8)+'" rx="6" fill="none" stroke="#0f3558" stroke-width="2"/>';
 var L=LIST(W.n,y+14,600,11);return SVG(L.y+8,s+L.s)},
/* 1-3 貨物の状況のコード：予約から引き渡しまで、順に光る */
cgo_status:function(l){
 var W=({ja:{t:'貨物の状況を知らせるコード（よく見るもの）',st:['予約が確定した','荷主（フォワーダー）から貨物を受け取った','便の搭載の一覧（マニフェスト）に載った','便が出発した','便が到着した','便から貨物を取り降ろした','荷受人に到着を知らせた','荷受人に引き渡した']},
  ko:{t:'화물 상태를 알리는 코드(자주 보는 것)',st:['예약이 확정됐다','화주(포워더)에게서 화물을 받았다','편의 적하목록(매니페스트)에 실렸다','편이 출발했다','편이 도착했다','편에서 화물을 내렸다','수하인에게 도착을 알렸다','수하인에게 인도했다']},
  en:{t:'Status codes you will see most',st:['Booking confirmed','Cargo received from the shipper (forwarder)','Listed on the flight manifest','Flight departed','Flight arrived','Cargo received from the flight','Consignee notified of arrival','Delivered to the consignee']}})[l];
 if(!W)return F.cgo_status('ja');setK(1);
 return STEPS(W.t,W.st,['BKD','RCS','MAN','DEP','ARR','RCF','NFD','DLV'],['#6B4FA0','#2F6FD6','#2C7A7B','#D64545','#D64545','#E08A2E','#E08A2E','#2E9B5F'],'16s')},
/* 1-4 輸出の流れ（日本）：保税の上屋に入ってから搭載まで */
cgo_exp:function(l){
 var W=({ja:{t:'輸出の流れ（日本の例）',st:['保税の上屋に搬入する（ここから税関の管理下）','通関業者がNACCSで輸出の申告をする','税関の審査。必要なときは書類の確認や貨物の検査','輸出の許可。これで搭載できる状態になる','航空会社が搭載し、積荷目録（マニフェスト）を出す'],who:['フォワーダー・上屋','通関業者','税関','税関','航空会社']},
  ko:{t:'수출 흐름(일본의 예)',st:['보세 화물터미널에 반입(여기서부터 세관 관리 아래)','관세사(통관업자)가 NACCS로 수출 신고','세관 심사. 필요하면 서류 확인이나 화물 검사','수출 허가. 이제 탑재할 수 있는 상태','항공사가 탑재하고 적하목록(매니페스트)을 낸다'],who:['포워더·화물터미널','관세사','세관','세관','항공사']},
  en:{t:'Export flow (Japan example)',st:['Delivered into the bonded terminal (now under customs control)','The customs broker files the export declaration on NACCS','Customs review; document checks or inspection when needed','Export permission: the cargo can now be loaded','The airline loads it and submits the cargo manifest'],who:['Forwarder & terminal','Customs broker','Customs','Customs','Airline']}})[l];
 if(!W)return F.cgo_exp('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#6B4FA0','#D64545','#2E9B5F','#E08A2E'],'12s')},
/* 1-4 輸入の流れ（日本）：到着前の報告から引き渡しまで */
cgo_imp:function(l){
 var W=({ja:{t:'輸入の流れ（日本の例）',st:['到着の前に、マスター・ハウスの運送状の情報と積荷目録を税関に報告する★','到着後、取り降ろして保税の上屋へ運ぶ','通関業者が輸入の申告をする（関税・消費税）','納税のあと輸入の許可。保税の管理から外れる','フォワーダーが受け取り、荷受人へ引き渡す'],who:['航空会社・フォワーダー','上屋','通関業者','税関','フォワーダー']},
  ko:{t:'수입 흐름(일본의 예)',st:['도착 전에 마스터·하우스 운송장 정보와 적하목록을 세관에 보고★','도착 후 하기해 보세 화물터미널로 옮긴다','관세사가 수입 신고(관세·소비세)','납세 후 수입 허가. 보세 관리에서 벗어난다','포워더가 인수해 수하인에게 인도'],who:['항공사·포워더','화물터미널','관세사','세관','포워더']},
  en:{t:'Import flow (Japan example)',st:['Before arrival, master and house AWB data and the manifest are reported to customs ★','After arrival, cargo is offloaded and taken to the bonded terminal','The customs broker files the import declaration (duty and consumption tax)','After payment, import permission: the cargo leaves bonded control','The forwarder collects and delivers to the consignee'],who:['Airline & forwarder','Terminal','Customs broker','Customs','Forwarder']}})[l];
 if(!W)return F.cgo_imp('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#E08A2E','#2F6FD6','#6B4FA0','#2E9B5F','#2C7A7B'],'12s')}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();

