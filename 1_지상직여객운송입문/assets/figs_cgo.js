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
 return STEPS(W.t,W.st,W.who,['#E08A2E','#2F6FD6','#6B4FA0','#2E9B5F','#2C7A7B'],'12s')},
/* 2-1 受け付けの確認：1件の貨物を順に確かめる。右は確かめた結果（架空の例） */
cgo_accept:function(l){
 var W=({ja:{t:'受け付けで1件の貨物を確かめる（架空の例）',st:['書類と貨物：AWB 180-12345675、2個、品名が一致するか','計量：申告120kgに対して、量ると126kg','寸法：120×100×110cm。容積重量は約220kg','ラベル：AWBの番号、天地無用・上積み禁止','保安：確認済みの荷主（KS）の貨物か、検査が要るか','保管：区分を決めて、決められた区画へ置く'],who:['一致','126kgに訂正','220kgで計算','貼り直し不要','検査を省略★','一般の区画']},
  ko:{t:'접수에서 화물 한 건을 확인한다(가상의 예)',st:['서류와 화물: AWB 180-12345675, 2개, 품명이 일치하는가','계량: 신고 120kg인데 재 보니 126kg','치수: 120×100×110cm. 용적 중량은 약 220kg','라벨: AWB 번호, 천지무용·적재 금지','보안: 확인된 화주(KS)의 화물인가, 검사가 필요한가','보관: 구분을 정해 지정된 구역에 둔다'],who:['일치','126kg로 정정','220kg로 계산','다시 붙일 필요 없음','검사 생략★','일반 구역']},
  en:{t:'Checking one shipment at acceptance (fictional example)',st:['Documents vs cargo: AWB 180-12345675, 2 pieces, description matches?','Weighing: declared 120 kg, scale shows 126 kg','Dimensions: 120×100×110 cm; volume weight about 220 kg','Labels: AWB number, this way up, do not stack','Security: from a known consignor (KS), or screening needed?','Storage: decide the category and place it in the right area'],who:['Matches','Corrected to 126 kg','Charged on 220 kg','No relabelling','No screening ★','General area']}})[l];
 if(!W)return F.cgo_accept('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2E9B5F','#D64545','#E08A2E','#2E9B5F','#2F6FD6','#2C7A7B'],'13s')},
/* 2-2 ULD：コンテナ（AKE）とパレット（PMC）。パレットに重い物から順に積み、輪郭の中に収める */
cgo_uld:function(l){
 var W=({ja:{t:'ULDの2つの形とビルドアップ',a:'コンテナ AKE（LD3）',as:'約153×156×163cm・最大約1,588kg。旅客機の床下で手荷物や小口の貨物に',b:'パレット PMC',bs:'板は244×318cm。床下は高さ約163cmまで、主甲板はもっと高く積める★',c:'輪郭',n:['重い物・丈夫な物を下に、軽い物・壊れやすい物を上に積む（図の順）','機体の胴体の丸みに合わせた輪郭の中に収める。はみ出すと載せられない','積み終えたらネットで固定し、ULDの番号・行き先・重さのタグを付ける']},
  ko:{t:'ULD의 두 가지 형태와 빌드업',a:'컨테이너 AKE(LD3)',as:'약 153×156×163cm·최대 약 1,588kg. 여객기 하부에서 수하물과 소량 화물에',b:'팔레트 PMC',bs:'판은 244×318cm. 하부는 높이 약 163cm까지, 메인 데크는 더 높이 쌓을 수 있다★',c:'윤곽',n:['무겁고 튼튼한 물건을 아래, 가볍고 깨지기 쉬운 물건을 위에(그림의 순서)','기체 동체의 곡선에 맞춘 윤곽 안에 넣는다. 벗어나면 실을 수 없다','다 쌓으면 네트로 고정하고 ULD 번호·목적지·무게 태그를 단다']},
  en:{t:'Two kinds of ULD and how build-up works',a:'Container AKE (LD3)',as:'About 153×156×163 cm, up to about 1,588 kg; used in passenger lower decks for baggage and small shipments',b:'Pallet PMC',bs:'Base 244×318 cm; up to about 163 cm high for the lower deck, higher on the main deck ★',c:'Contour',n:['Heavy, sturdy items at the bottom, light or fragile items on top (the order in the figure)','Keep within the contour that follows the curve of the fuselage; anything outside it cannot be loaded','When finished, secure with a net and attach the tag with ULD number, destination and weight']}})[l];
 if(!W)return F.cgo_uld('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),lh=FS(11)*1.3,y0=58,dur='9s';
 /* AKE */
 s+=R(20,y0,280,230,'#F4F7FB',12)+'<path d="M80 250 L80 110 L200 110 L240 150 L240 250 Z" fill="#DDE6EF" stroke="#2F6FD6" stroke-width="3"/><path d="M80 250 L80 110 L200 110 L240 150 L240 250 Z" fill="none" stroke="#2F6FD6" stroke-width="1" stroke-dasharray="4 4" transform="translate(8 -8)" opacity=".5"/>'+tx(160,190,'AKE',14,'#2F6FD6',900);
 /* PMC with contour and stacking boxes */
 s+=R(320,y0,300,230,'#F4F7FB',12)+'<rect x="345" y="244" width="250" height="10" rx="2" fill="#5B6B7D"/>';
 s+='<path d="M350 244 L350 150 Q350 104 400 98 L540 98 Q590 104 590 150 L590 244" fill="none" stroke="#E08A2E" stroke-width="2.5" stroke-dasharray="7 5"/>'+tx(470,92,W.c,10,'#E08A2E',800);
 var bx=[[352,206,118,38,'#5B6B7D'],[472,206,116,38,'#5B6B7D'],[356,170,90,36,'#7E8FA3'],[448,170,138,36,'#7E8FA3'],[372,138,96,32,'#A9B8C8'],[470,138,104,32,'#A9B8C8'],[410,110,90,28,'#CBD6E2']];
 bx.forEach(function(b,i){var a=(0.05+i*0.1).toFixed(2),c=(0.1+i*0.1).toFixed(2);s+='<rect x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" rx="3" fill="'+b[4]+'" stroke="#fff" stroke-width="1.5" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+a+';'+c+';.92;1" dur="'+dur+'" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 -60;0 -60;0 0;0 0;0 0" keyTimes="0;'+a+';'+c+';.92;1" dur="'+dur+'" repeatCount="indefinite"/></rect>'});
 s+='<path d="M345 244 L470 100 L595 244" fill="none" stroke="#2E9B5F" stroke-width="2" opacity="0"><animate attributeName="opacity" values="0;0;.9;.9;0" keyTimes="0;.78;.82;.92;1" dur="'+dur+'" repeatCount="indefinite"/></path>';
 var y=y0+240,na=LI(W.a+'：'+W.as,11,280).length,nb=LI(W.b+'：'+W.bs,11,280).length,hh=Math.max(na,nb)*lh+16,sep=l==='ja'?'：':': ';
 s+=R(20,y,290,hh,'#fff',8,' stroke="#2F6FD6"')+WR(30,y+hh/2+FS(11)*0.35,W.a+sep+W.as,11,D,800,272,'start')+R(330,y,290,hh,'#fff',8,' stroke="#E08A2E"')+WR(340,y+hh/2+FS(11)*0.35,W.b+sep+W.bs,11,D,800,272,'start');
 var L=LIST(W.n,y+hh+10,600,11);return SVG(L.y+8,s+L.s)},
/* 2-3 保安の途切れない流れ：確認済みの荷主から搭載まで続けば検査を省略。途切れれば上屋で検査 */
cgo_sec:function(l){
 var W=({ja:{t:'保安が途切れない流れと、途切れた流れ',a:'途切れない流れ',b:'途切れた流れ',na:['確認済みの荷主（KS）','確認済みの事業者（RA）','上屋','搭載'],nb:['確認されていない荷主','事業者','上屋で検査（X線など）','搭載'],n:['確認済みの荷主から搭載まで、保安が確保された状態が続けば、空港での検査を省略・簡略化できる★','途中で途切れた貨物（確認されていない荷主など）は、上屋などでX線や爆発物の痕跡の検査を行う','封印やラベルが破られていないか、受け付けで必ず確かめる']},
  ko:{t:'보안이 끊기지 않는 흐름과 끊긴 흐름',a:'끊기지 않는 흐름',b:'끊긴 흐름',na:['확인된 화주(KS)','확인된 사업자(RA)','화물터미널','탑재'],nb:['확인되지 않은 화주','사업자','화물터미널에서 검사(X선 등)','탑재'],n:['확인된 화주부터 탑재까지 보안이 확보된 상태가 이어지면 공항 검사를 생략·간소화할 수 있다★','중간에 끊긴 화물(확인되지 않은 화주 등)은 화물터미널 등에서 X선이나 폭발물 흔적 검사를 한다','봉인이나 라벨이 뜯기지 않았는지 접수에서 반드시 확인한다']},
  en:{t:'An unbroken secure chain, and a broken one',a:'Unbroken chain',b:'Broken chain',na:['Known consignor (KS)','Regulated agent (RA)','Terminal','Loading'],nb:['Unknown shipper','Agent','Screened at terminal (X-ray etc.)','Loading'],n:['If security is maintained without a break from a known consignor to loading, airport screening can be skipped or simplified ★','Cargo whose chain is broken (an unknown shipper, for example) is X-rayed or tested for explosive traces at the terminal','Always check at acceptance that seals and labels are intact']}})[l];
 if(!W)return F.cgo_sec('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),lh=FS(11)*1.3,dur='8s',xs=[95,245,395,545],y=58;
 [[W.a,W.na,'#2E9B5F',false],[W.b,W.nb,'#D64545',true]].forEach(function(L0,k){var nmax=0;L0[1].forEach(function(t){nmax=Math.max(nmax,LI(t,10,135).length)});var r0=FS(11)*0.85+5,hh=FS(12)*1.3+40+r0*2+nmax*FS(10)*1.3+12,cy=y+FS(12)*1.3+22+r0;
  s+=R(20,y,600,hh,k?'#FFF6F6':'#F2FAF5',12)+LB(36,y+18,L0[0],11.5,'#fff','start',L0[2]);
  s+='<line x1="'+xs[0]+'" y1="'+cy+'" x2="'+xs[3]+'" y2="'+cy+'" stroke="'+L0[2]+'" stroke-width="5" opacity=".35"/>';
  L0[1].forEach(function(t,i){var insp=L0[3]&&i===2,nl=LI(t,10,135).length;s+='<circle cx="'+xs[i]+'" cy="'+cy+'" r="'+r0.toFixed(1)+'" fill="#fff" stroke="'+(insp?'#D64545':L0[2])+'" stroke-width="3"/>'+(insp?'<rect x="'+(xs[i]-r0*0.55).toFixed(1)+'" y="'+(cy-r0*0.42).toFixed(1)+'" width="'+(r0*1.1).toFixed(1)+'" height="'+(r0*0.84).toFixed(1)+'" rx="2" fill="#D64545"/>':tx(xs[i],cy+FS(11)*0.36,String(i+1),11,L0[2],900))+WR(xs[i],cy+r0+8+nl*FS(10)*1.3/2,t,10,D,800,135)});
  var path='M'+xs[0]+' '+cy+' L'+xs[3]+' '+cy;
  if(!L0[3])s+='<rect x="-9" y="-9" width="18" height="18" rx="3" fill="#E08A2E" stroke="#fff" stroke-width="1.5"><animateMotion dur="'+dur+'" repeatCount="indefinite" path="'+path+'"/></rect>';
  else s+='<rect x="-9" y="-9" width="18" height="18" rx="3" fill="#E08A2E" stroke="#fff" stroke-width="1.5"><animateMotion dur="'+dur+'" repeatCount="indefinite" keyPoints="0;0.66;0.66;1" keyTimes="0;0.4;0.75;1" calcMode="linear" path="'+path+'"/></rect>';
  y+=hh+10});
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 2-4 保税の上屋：到着から引き渡しまでの確かめ方（引き渡しの前に2重の確認） */
cgo_bond:function(l){
 var W=({ja:{t:'保税の上屋：到着から引き渡しまで',st:['到着：積荷目録と実際の貨物を照合する','過不足・破損を記録し、決められた期限までに報告する','輸入の許可が出るまで、未許可の区画に保管する','NACCSで輸入の許可を確かめる','引き取りの人と書類を、2人で確かめる','引き渡し、搬出の時刻と相手を記録する'],who:['上屋','上屋→税関','上屋','上屋','上屋（2人）','上屋']},
  ko:{t:'보세 화물터미널: 도착에서 인도까지',st:['도착: 적하목록과 실제 화물을 대조한다','과부족·파손을 기록하고 정해진 기한까지 보고한다','수입 허가가 나올 때까지 미허가 구역에 보관한다','NACCS로 수입 허가를 확인한다','인수하는 사람과 서류를 두 사람이 확인한다','인도하고 반출 시각과 상대를 기록한다'],who:['화물터미널','화물터미널→세관','화물터미널','화물터미널','화물터미널(2인)','화물터미널']},
  en:{t:'Bonded terminal: from arrival to release',st:['Arrival: check the actual cargo against the manifest','Record shortages, overages and damage, and report them by the deadline','Store in the uncleared area until import permission','Confirm import permission on NACCS','Two staff check the collector and the documents','Release, and record the time and the recipient'],who:['Terminal','Terminal → customs','Terminal','Terminal','Terminal (two people)','Terminal']}})[l];
 if(!W)return F.cgo_bond('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#E08A2E','#6B4FA0','#2E9B5F','#D64545','#2C7A7B'],'13s')},
/* 3-1 危険物の9つの分類：ひし形のラベルを色と番号で示し、順に光る（形は簡略化） */
cgo_dg:function(l){
 var W=({ja:{t:'危険物の9つの分類（ラベルは簡略化）',c:['火薬類','ガス','引火性液体','可燃性物質','酸化性物質','毒物・感染性物質','放射性物質','腐食性物質','その他（リチウム電池など）'],n:['ラベルは縦横10cm以上のひし形。分類の番号が下の角に入る','リチウム電池・ドライアイスは「9 その他」。身近な物ほど申告もれ（隠れ危険物）が起きやすい']},
  ko:{t:'위험물 9개 분류(라벨은 단순화)',c:['화약류','가스','인화성 액체','가연성 물질','산화성 물질','독물·감염성 물질','방사성 물질','부식성 물질','기타(리튬 배터리 등)'],n:['라벨은 가로세로 10cm 이상의 마름모. 분류 번호가 아래 꼭짓점에 들어간다','리튬 배터리·드라이아이스는 「9 기타」. 흔한 물건일수록 신고 누락(숨은 위험물)이 생기기 쉽다']},
  en:{t:'The nine classes of dangerous goods (labels simplified)',c:['Explosives','Gases','Flammable liquids','Flammable solids','Oxidisers','Toxic & infectious','Radioactive','Corrosives','Miscellaneous (lithium batteries etc.)'],n:['Labels are diamonds at least 10 cm a side, with the class number in the bottom corner','Lithium batteries and dry ice are Class 9; everyday items are where undeclared (hidden) dangerous goods most often slip through']}})[l];
 if(!W)return F.cgo_dg('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),C=[['#F28C28','#F28C28'],['#D64545','#2E9B5F'],['#D64545','#D64545'],['#D64545','#fff'],['#F5C518','#F5C518'],['#fff','#fff'],['#F5C518','#fff'],['#fff','#222'],['#fff','#fff']],y0=60,cw=200,lh=FS(10)*1.3,rows=[0,0,0];
 for(var r=0;r<3;r++){var m=0;for(var c=0;c<3;c++)m=Math.max(m,LI(W.c[r*3+c],10,180).length);rows[r]=96+m*lh}
 var y=y0;
 for(var i=0;i<9;i++){var r=Math.floor(i/3),c=i%3,cx=20+c*cw+cw/2,yy=y0;for(var k=0;k<r;k++)yy+=rows[k]+6;var cy=yy+44,d=34;
  s+='<g>'+R(22+c*cw,yy,cw-4,rows[r],'#fff',10,' stroke="#D5DEE8"')+'<rect x="'+(22+c*cw)+'" y="'+yy+'" width="'+(cw-4)+'" height="'+rows[r]+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,9,0,.45)+' dur="13s" repeatCount="indefinite"/></rect>';
  s+='<polygon points="'+cx+','+(cy-d)+' '+(cx+d)+','+cy+' '+cx+','+(cy+d)+' '+(cx-d)+','+cy+'" fill="'+C[i][0]+'" stroke="#222" stroke-width="1.5"/>';
  if(C[i][1]!==C[i][0])s+='<polygon points="'+(cx-d)+','+cy+' '+(cx+d)+','+cy+' '+cx+','+(cy+d)+'" fill="'+C[i][1]+'" stroke="#222" stroke-width="1.5"/>';
  if(i===8)for(var t=0;t<4;t++)s+='<line x1="'+(cx-14+t*7)+'" y1="'+(cy-d+10+t*0)+'" x2="'+(cx-14+t*7)+'" y2="'+(cy-6)+'" stroke="#222" stroke-width="3"/>';
  s+='<circle cx="'+cx+'" cy="'+(cy+d-12)+'" r="'+(FS(11)*0.7+2).toFixed(1)+'" fill="#fff" stroke="#222" stroke-width="1.2"/>'+tx(cx,cy+d-12+FS(11)*0.36,String(i+1),11,'#222',900)+WR(cx,cy+d+10+LI(W.c[i],10,180).length*lh/2,W.c[i],10,D,800,180)+'</g>'}
 for(var k=0;k<3;k++)y+=rows[k]+6;
 var L=LIST(W.n,y+6,600,11);return SVG(L.y+8,s+L.s)},
/* 3-1 運ぶための4つの条件：リチウムイオン電池（機器と同梱）の例 */
cgo_dg4:function(l){
 var W=({ja:{t:'危険物を運ぶための4つの条件（例：機器と同梱のリチウムイオン電池）',st:['分類：正しい品名と国連番号を決める','包装：認められた容器と、1個あたりの量の上限を守る','表示：危険物のラベルと、品名・国連番号のマーク','書類：荷主が危険物の申告書を作り、署名する'],who:['UN3481・9','包装の基準 966★','9のラベル（電池）','申告書']},
  ko:{t:'위험물을 운송하기 위한 네 가지 조건(예: 기기와 동포장된 리튬이온 배터리)',st:['분류: 올바른 품명과 UN 번호를 정한다','포장: 인정된 용기와 1개당 양의 상한을 지킨다','표시: 위험물 라벨과 품명·UN 번호 마크','서류: 화주가 위험물 신고서를 작성하고 서명한다'],who:['UN3481·9','포장 기준 966★','9 라벨(배터리)','신고서']},
  en:{t:'Four conditions for carrying dangerous goods (example: lithium ion batteries packed with equipment)',st:['Classification: the correct proper shipping name and UN number','Packing: an approved packaging within the quantity limit per package','Marking and labels: hazard label plus name and UN number marks','Documents: the shipper completes and signs the declaration'],who:['UN3481, Class 9','Packing instruction 966 ★','Class 9 battery label','Declaration']}})[l];
 if(!W)return F.cgo_dg4('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#6B4FA0','#2F6FD6','#E08A2E','#2E9B5F'],'10s')},
/* 3-2 生きた動物：予約から検疫まで */
cgo_avi:function(l){
 var W=({ja:{t:'生きた動物を運ぶ流れ（例）',st:['予約：便と機種で運べるか、暑い時期・寒い時期の制限はないか','受け付け：容器の大きさ・換気・水と餌の入れ口を確かめる','書類：健康証明書、種類によっては輸出入の許可','搭載：温度と換気が管理された区画へ。ドライアイスとは離す','機長に知らせる：特別な搭載物の通知（NOTOC）に書く','到着：最優先で取り降ろし、動物検疫を受ける'],who:['予約の係','上屋','荷主','搭載の係','搭載管理','上屋・検疫所']},
  ko:{t:'생동물을 운송하는 흐름(예)',st:['예약: 편과 기종으로 운송 가능한지, 더운 시기·추운 시기 제한은 없는지','접수: 용기 크기·환기·물과 먹이 투입구를 확인한다','서류: 건강증명서, 종류에 따라 수출입 허가','탑재: 온도와 환기가 관리되는 구역에. 드라이아이스와는 떨어뜨린다','기장에게 알림: 특수 탑재물 통지(NOTOC)에 적는다','도착: 최우선으로 하기하고 동물 검역을 받는다'],who:['예약 담당','화물터미널','화주','탑재 담당','탑재관리','화물터미널·검역소']},
  en:{t:'Carrying live animals (example)',st:['Booking: can this flight and type carry it; any hot or cold season limits?','Acceptance: check container size, ventilation and food and water access','Documents: health certificate and, for some species, import or export permits','Loading: into a temperature- and ventilation-controlled zone, away from dry ice','Tell the captain: list it on the special load notification (NOTOC)','Arrival: offload first and pass animal quarantine'],who:['Reservations','Terminal','Shipper','Loading team','Load control','Terminal & quarantine']}})[l];
 if(!W)return F.cgo_avi('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#2C7A7B','#6B4FA0','#E08A2E','#D64545','#2E9B5F'],'13s')},
/* 3-3 温度の記録（ロガー）：2〜8℃の帯の中を進み、ランプでの待機で外れる */
cgo_cold:function(l){
 var W=({ja:{t:'温度の記録（2〜8℃の医薬品、架空の例）',b:'許される範囲 2〜8℃',st:['出発の倉庫','トラック','上屋','ランプで待機','機内','到着の倉庫'],ex:'外れた！',n:['ランプでの待機（夏の炎天下）で9.5℃まで上がり、範囲を外れた例','外れた時間と温度は記録に残り、到着時に荷主が使えるかどうかを判断する','防ぐには、待機を短くする・保冷の覆いを使う・搭載の順番を最後にする']},
  ko:{t:'온도 기록(2~8℃ 의약품, 가상의 예)',b:'허용 범위 2~8℃',st:['출발 창고','트럭','화물터미널','램프 대기','기내','도착 창고'],ex:'벗어났다!',n:['램프 대기(여름 땡볕)에서 9.5℃까지 올라 범위를 벗어난 예','벗어난 시간과 온도는 기록에 남고, 도착 때 화주가 쓸 수 있는지 판단한다','막으려면 대기를 줄이고, 보냉 덮개를 쓰고, 탑재 순서를 마지막으로 한다']},
  en:{t:'Temperature log (2–8 °C pharmaceuticals, fictional example)',b:'Allowed range 2–8 °C',st:['Origin warehouse','Truck','Terminal','Ramp wait','On board','Destination warehouse'],ex:'Excursion!',n:['During a ramp wait in summer sun the shipment reached 9.5 °C, outside the range','The time and temperature of the excursion stay on the log; at arrival the shipper decides whether the goods can be used','To prevent it: shorten the wait, use thermal covers and load it last']}})[l];
 if(!W)return F.cgo_cold('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),x0=70,x1=610,y0=70,y1=250,T=function(t){return y1-(t-0)/12*(y1-y0)};
 s+=R(20,58,600,230,'#fff',12,' stroke="#D5DEE8"')+'<rect x="'+x0+'" y="'+T(8)+'" width="'+(x1-x0)+'" height="'+(T(2)-T(8))+'" fill="#2E9B5F" opacity=".14"/>';
 [0,2,4,6,8,10,12].forEach(function(t){s+='<line x1="'+x0+'" y1="'+T(t)+'" x2="'+x1+'" y2="'+T(t)+'" stroke="#E2E8F0"/>'+tx(x0-12,T(t)+4,String(t),9,'#5B6B7D',700,'end')});
 s+=tx(x0+8,T(8)-6,W.b,10,'#2E9B5F',800,'start');
 var pts=[[0,5],[60,5.2],[100,4.8],[160,5.5],[200,6],[230,7.5],[260,9.5],[290,8.6],[320,6.5],[380,5],[440,4.6],[490,5],[540,5.1]],d='';
 pts.forEach(function(p,i){d+=(i?'L':'M')+(x0+p[0])+' '+T(p[1]).toFixed(1)});
 s+='<path d="'+d+'" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="900" stroke-dashoffset="900"><animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;.7;1" dur="7s" repeatCount="indefinite"/></path>';
 s+='<circle cx="'+(x0+260)+'" cy="'+T(9.5)+'" r="7" fill="#D64545" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.35;.4;1" dur="7s" repeatCount="indefinite"/></circle>'+'<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.35;.4;1" dur="7s" repeatCount="indefinite"/>'+LB(x0+275,T(10.6),W.ex,10,'#fff','start','#D64545')+'</g>';
 var seg=[[0,90],[90,170],[170,230],[230,300],[300,450],[450,540]],y=258;
 seg.forEach(function(g,i){var cx=x0+(g[0]+g[1])/2;s+='<line x1="'+(x0+g[1])+'" y1="'+y0+'" x2="'+(x0+g[1])+'" y2="'+y1+'" stroke="#CBD5E1" stroke-dasharray="3 4"/>'+WR(cx,y+14,W.st[i],8.5,i===3?'#D64545':'#334155',800,Math.max(60,g[1]-g[0]))});
 var L=LIST(W.n,300,600,11);return SVG(L.y+8,s+L.s)},
/* 3-4 扉の大きさ：木箱が貨物室の扉を通るか（B787の前方の扉の例、数字は目安） */
cgo_door:function(l){
 var W=({ja:{t:'扉を通るか：寸法を先に確かめる（数字は目安★）',d:'貨物室の扉 約270×170cm',a:'木箱A 240×150cm',b:'木箱B 240×185cm',ok:'通る',ng:'通らない',n:['木箱Aは扉より小さいので通る。木箱Bは高さが15cm足りず通らない','扉の大きさは機種と扉の位置で違う。予約の前にメーカーの資料・航空会社の表で確かめる','通らないときは、梱包を変えるか、扉の大きい貨物専用機を検討する']},
  ko:{t:'문을 통과하는가: 치수를 먼저 확인한다(숫자는 기준★)',d:'화물칸 문 약 270×170cm',a:'나무상자 A 240×150cm',b:'나무상자 B 240×185cm',ok:'통과',ng:'통과 못 함',n:['나무상자 A는 문보다 작아 통과한다. B는 높이가 15cm 모자라 통과하지 못한다','문 크기는 기종과 문 위치에 따라 다르다. 예약 전에 제작사 자료·항공사 표로 확인한다','통과하지 못하면 포장을 바꾸거나 문이 큰 화물기를 검토한다']},
  en:{t:'Will it go through the door? Check dimensions first (figures are guides ★)',d:'Cargo door about 270×170 cm',a:'Crate A 240×150 cm',b:'Crate B 240×185 cm',ok:'Fits',ng:'Does not fit',n:['Crate A is smaller than the door and goes in; crate B is 15 cm too tall','Door sizes differ by aircraft type and door position; check the manufacturer data and the airline’s tables before booking','If it will not fit, repack it or look at a freighter with a larger door']}})[l];
 if(!W)return F.cgo_door('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),sc=0.9,dur='8s',yend=0;
 [[W.a,150,'#2E9B5F',W.ok,0],[W.b,185,'#D64545',W.ng,1]].forEach(function(c,i){var ox=20+i*310,oy=60,dw=270*sc,dh=170*sc,dx=ox+(290-dw)/2,dy=oy+20+LI(W.d,9,270).length*FS(9)*1.3;
  var bh=(dy+dh-oy)+FS(12)*1.3+30;yend=oy+bh;s+=R(ox,oy,290,bh,'#F4F7FB',12)+'<rect x="'+dx+'" y="'+dy+'" width="'+dw+'" height="'+dh+'" fill="#fff" stroke="#0f3558" stroke-width="3" stroke-dasharray="8 5"/>'+WR(ox+145,oy+18,W.d,9,'#0f3558',800,270);
  var cw=240*sc,ch=c[1]*sc,cx=ox+(290-cw)/2,cy=dy+dh-ch;
  s+='<rect x="'+cx+'" y="'+cy+'" width="'+cw+'" height="'+ch+'" rx="3" fill="'+c[2]+'" opacity=".55" stroke="'+c[2]+'" stroke-width="2"><animate attributeName="opacity" values="0;.55;.55" keyTimes="0;.2;1" dur="'+dur+'" repeatCount="indefinite"/></rect>';
  s+=WR(ox+145,cy+ch/2+FS(10)*0.35,c[0],10,'#0f3558',900,cw-14);
  s+='<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.35;.4;1" dur="'+dur+'" repeatCount="indefinite"/>'+LB(ox+145,dy+dh+14+FS(12)*0.5,c[3],12,'#fff','middle',c[2])+'</g>'});
 var L=LIST(W.n,yend+10,600,11);return SVG(L.y+8,s+L.s)},
/* 3-5 半導体の装置の輸送：準備から据え付けまで */
cgo_semi:function(l){
 var W=({ja:{t:'半導体の装置を運ぶ流れ（例）',st:['輸出の管理：該当・非該当を判定し、必要なら許可を取る','梱包：防振・防湿、衝撃と傾きのセンサーを付ける','国内の輸送：空気ばね付きのトラックで上屋へ','上屋・搭載：フォークリフトの差し込み位置を守り、機体に固定','到着：センサーと梱包を確かめ、写真で記録','据え付けの場所へ：日程に合わせて国内の配送'],who:['メーカー・荷主','梱包の会社','運送会社','上屋・航空会社','フォワーダー','運送会社']},
  ko:{t:'반도체 장비를 운송하는 흐름(예)',st:['수출 관리: 해당·비해당을 판정하고 필요하면 허가를 받는다','포장: 방진·방습, 충격·기울기 센서를 붙인다','국내 운송: 에어 서스펜션 트럭으로 화물터미널에','화물터미널·탑재: 지게차 삽입 위치를 지키고 기체에 고정','도착: 센서와 포장을 확인하고 사진으로 기록','설치 장소로: 일정에 맞춰 국내 배송'],who:['제조사·화주','포장 회사','운송 회사','화물터미널·항공사','포워더','운송 회사']},
  en:{t:'Moving semiconductor equipment (example)',st:['Export control: classify the item and obtain a licence if required','Packing: anti-vibration and moisture protection, shock and tilt indicators','Road leg: air-suspension truck to the terminal','Terminal and loading: forklift points respected, secured to the aircraft','Arrival: check indicators and packing, record with photos','To the installation site: domestic delivery on schedule'],who:['Maker & shipper','Packing company','Haulier','Terminal & airline','Forwarder','Haulier']}})[l];
 if(!W)return F.cgo_semi('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#6B4FA0','#2F6FD6','#2C7A7B','#E08A2E','#D64545','#2E9B5F'],'13s')},
/* 4-1 床下の搭載位置（中型機の例）：特別な貨物を位置に置き、重心の針が範囲に収まる */
cgo_lplan:function(l){
 var W=({ja:{t:'搭載の計画：床下の位置と重心（中型機の例・簡略化）',f:'前方の貨物室',a:'後方の貨物室',b:'ばら積み',cg:'重心',ok:'範囲の中',u:[['DG','危険物（9）'],['AVI','動物'],['PER','生鮮品'],['HEA','重量物']],n:['危険物と動物は離す。動物とドライアイスも離す','生鮮品と乗り継ぎの貨物は、到着後すぐに取り降ろせる扉の近くへ','重い物は床の強さと重心を見て置く。最後に重心が範囲に入るか確かめる']},
  ko:{t:'탑재 계획: 하부 위치와 무게중심(중형기 예·단순화)',f:'전방 화물칸',a:'후방 화물칸',b:'벌크',cg:'무게중심',ok:'범위 안',u:[['DG','위험물(9)'],['AVI','동물'],['PER','신선품'],['HEA','중량물']],n:['위험물과 동물은 떨어뜨린다. 동물과 드라이아이스도 떨어뜨린다','신선품과 환적 화물은 도착 후 바로 내릴 수 있는 문 근처에','무거운 물건은 바닥 강도와 무게중심을 보고 둔다. 마지막에 무게중심이 범위 안인지 확인한다']},
  en:{t:'Load plan: lower-deck positions and balance (wide-body example, simplified)',f:'Forward hold',a:'Aft hold',b:'Bulk',cg:'Centre of gravity',ok:'Within limits',u:[['DG','Dangerous goods (9)'],['AVI','Live animal'],['PER','Perishables'],['HEA','Heavy cargo']],n:['Keep dangerous goods away from animals, and animals away from dry ice','Put perishables and transfer cargo near the door so they come off first','Place heavy items with floor strength and balance in mind, then confirm the CG is within limits']}})[l];
 if(!W)return F.cgo_lplan('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),dur='10s',y0=74;
 s+='<path d="M30 '+(y0+50)+' Q30 '+y0+' 90 '+y0+' L560 '+y0+' Q610 '+y0+' 615 '+(y0+50)+' Q610 '+(y0+100)+' 560 '+(y0+100)+' L90 '+(y0+100)+' Q30 '+(y0+100)+' 30 '+(y0+50)+' Z" fill="#F4F7FB" stroke="#0f3558" stroke-width="2.5"/>';
 s+=tx(205,y0-6,W.f,10,'#0f3558',800)+tx(445,y0-6,W.a,10,'#0f3558',800)+tx(570,y0+120,W.b,9,'#5B6B7D',700);
 var pos=[100,150,200,250,300,380,430,480,530],tag={0:2,3:3,5:0,7:1,8:-1,2:-1},col=['#D64545','#2F6FD6','#2E9B5F','#6B4FA0'];
 /* 番号 0-3 は特別な貨物、それ以外は一般 */
 var place=[[1,2],[4,3],[5,0],[7,1]];
 pos.forEach(function(x,i){s+='<rect x="'+(x-20)+'" y="'+(y0+22)+'" width="40" height="56" rx="4" fill="#fff" stroke="#9FB0C2" stroke-dasharray="4 3"/>'});
 [0,2,3,6,8].forEach(function(i,k){var x=pos[i],a=(0.02+k*0.03).toFixed(2);s+='<rect x="'+(x-18)+'" y="'+(y0+24)+'" width="36" height="52" rx="4" fill="#CBD6E2" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+a+';'+(+a+0.03).toFixed(2)+';.93;1" dur="'+dur+'" repeatCount="indefinite"/></rect>'});
 place.forEach(function(p,k){var x=pos[p[0]],c=col[p[1]],a=(0.2+k*0.12).toFixed(2),b=(0.24+k*0.12).toFixed(2);
  s+='<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+a+';'+b+';.93;1" dur="'+dur+'" repeatCount="indefinite"/><rect x="'+(x-18)+'" y="'+(y0+24)+'" width="36" height="52" rx="4" fill="'+c+'"/></g>'});
 /* 重心のゲージ */
 var gy=y0+150;s+=R(60,gy,520,18,'#E8EEF5',9)+'<rect x="230" y="'+gy+'" width="200" height="18" rx="4" fill="#2E9B5F" opacity=".35"/>'+tx(330,gy+40,W.ok,10,'#2E9B5F',800)+tx(60,gy-8,W.cg,10,'#0f3558',800,'start');
 s+='<polygon points="0,-12 9,4 -9,4" fill="#0f3558"><animateTransform attributeName="transform" type="translate" values="120 '+(gy+16)+';120 '+(gy+16)+';500 '+(gy+16)+';300 '+(gy+16)+';350 '+(gy+16)+';350 '+(gy+16)+'" keyTimes="0;.2;.45;.65;.78;1" dur="'+dur+'" repeatCount="indefinite"/></polygon>';
 var y=gy+56,lh=FS(11)*1.3;
 W.u.forEach(function(u,i){var x=20+(i%2)*306,yy=y+Math.floor(i/2)*(lh+18);s+=R(x,yy,294,lh+12,'#fff',8,' stroke="#D5DEE8"')+'<rect x="'+(x+10)+'" y="'+(yy+6)+'" width="'+(FS(9)*3.4).toFixed(1)+'" height="'+lh+'" rx="4" fill="'+col[i]+'"/>'+tx(x+10+FS(9)*1.7,yy+6+lh/2+FS(9)*0.35,u[0],9,'#fff',900)+WR(x+20+FS(9)*3.4,yy+6+lh/2+FS(11)*0.35,u[1],11,D,800,200,'start')});
 y+=2*(lh+18)+4;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 4-1 機長への通知（NOTOC）の主な欄（架空の例） */
cgo_notoc:function(l){
 var W=({ja:{t:'機長への通知（NOTOC）の例（架空・簡略化）',h:['品名・国連番号','分類','個数・重さ','位置'],r:[['LITHIUM ION BATTERIES PACKED WITH EQUIPMENT・UN3481','9','1・25kg','32P'],['DRY ICE・UN1845','9','2・20kg','42L'],['LIVE ANIMAL（犬）','—','1・45kg','11P']],n:['危険物は品名・国連番号・分類・量・位置を書き、機長が確かめて署名する','動物（11P）とドライアイス（42L）は離れた位置にある','搭載が変われば通知を作り直す。控えは出発地で保管する']},
  ko:{t:'기장 통지(NOTOC) 예(가상·단순화)',h:['품명·UN 번호','분류','개수·무게','위치'],r:[['LITHIUM ION BATTERIES PACKED WITH EQUIPMENT·UN3481','9','1·25kg','32P'],['DRY ICE·UN1845','9','2·20kg','42L'],['LIVE ANIMAL(개)','—','1·45kg','11P']],n:['위험물은 품명·UN 번호·분류·양·위치를 적고 기장이 확인해 서명한다','동물(11P)과 드라이아이스(42L)는 떨어진 위치에 있다','탑재가 바뀌면 통지를 다시 만든다. 사본은 출발지에서 보관한다']},
  en:{t:'NOTOC example (fictional, simplified)',h:['Name and UN number','Class','Pieces and weight','Position'],r:[['LITHIUM ION BATTERIES PACKED WITH EQUIPMENT, UN3481','9','1, 25 kg','32P'],['DRY ICE, UN1845','9','2, 20 kg','42L'],['LIVE ANIMAL (dog)','—','1, 45 kg','11P']],n:['For dangerous goods, list name, UN number, class, quantity and position; the captain checks and signs','The animal (11P) and the dry ice (42L) are in separate positions','If the load changes, reissue the notification; the origin station keeps a copy']}})[l];
 if(!W)return F.cgo_notoc('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=58,lh=FS(10)*1.3,cw=[300,70,130,100],cx=[20,320,390,520];
 var hh=0;W.h.forEach(function(h,i){hh=Math.max(hh,LI(h,9,cw[i]-10).length*FS(9)*1.3)});hh+=10;
 W.h.forEach(function(h,i){s+=R(cx[i],y,cw[i],hh,'#0f3558',0)+WR(cx[i]+cw[i]/2,y+hh/2+FS(9)*0.35,h,9,'#fff',800,cw[i]-10)});y+=hh;
 W.r.forEach(function(r,k){var rh=0;r.forEach(function(c,i){rh=Math.max(rh,LI(c,10,cw[i]-12).length*lh)});rh+=12;
  s+='<g>';r.forEach(function(c,i){s+=R(cx[i],y,cw[i],rh,'#fff',0,' stroke="#9FB0C2"')+WR(i?cx[i]+cw[i]/2:cx[i]+8,y+rh/2+FS(10)*0.35,c,10,'#0f3558',800,cw[i]-14,i?'middle':'start')});
  s+='<rect x="20" y="'+y+'" width="600" height="'+rh+'" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(k,3,0,.4)+' dur="9s" repeatCount="indefinite"/></rect></g>';y+=rh});
 var L=LIST(W.n,y+14,600,11);return SVG(L.y+8,s+L.s)},
/* 4-2 搭載の電報（例）：行ごとに意味を示す（形式は簡略化） */
cgo_cpm:function(l){
 var W=({ja:{t:'ULDの配置の電報（例・形式は簡略化）',m:['CPM','KE704/07.HL8082.ICN','-11P/PMC12345KE/NRT/C/2450','-21L/AKE23456KE/NRT/B/620','-32P/PMC34567KE/NRT/C/1980','-42L/AKE45678KE/NRT/C/510'],x:['電報の種類：ULDの配置','便名・日付・機体の番号・出発地','位置11P：パレット、成田行き、貨物、2,450kg','位置21L：コンテナ、成田行き、手荷物、620kg','位置32P：パレット、成田行き、貨物、1,980kg','位置42L：コンテナ、成田行き、貨物、510kg'],n:['C＝貨物、B＝手荷物など、中身の区分が1文字で入る','到着地はこの電報を見て、取り降ろしの順番と人・機材を準備する','実際の書き方は会社と業界の標準で決まっている★']},
  ko:{t:'ULD 배치 전문(예·형식은 단순화)',m:['CPM','KE704/07.HL8082.ICN','-11P/PMC12345KE/NRT/C/2450','-21L/AKE23456KE/NRT/B/620','-32P/PMC34567KE/NRT/C/1980','-42L/AKE45678KE/NRT/C/510'],x:['전문 종류: ULD 배치','편명·날짜·기체 번호·출발지','위치 11P: 팔레트, 나리타행, 화물, 2,450kg','위치 21L: 컨테이너, 나리타행, 수하물, 620kg','위치 32P: 팔레트, 나리타행, 화물, 1,980kg','위치 42L: 컨테이너, 나리타행, 화물, 510kg'],n:['C=화물, B=수하물 등 내용 구분이 한 글자로 들어간다','도착지는 이 전문을 보고 하기 순서와 인원·장비를 준비한다','실제 작성법은 회사와 업계 표준으로 정해져 있다★']},
  en:{t:'Container/pallet message (example, simplified format)',m:['CPM','KE704/07.HL8082.ICN','-11P/PMC12345KE/NRT/C/2450','-21L/AKE23456KE/NRT/B/620','-32P/PMC34567KE/NRT/C/1980','-42L/AKE45678KE/NRT/C/510'],x:['Message type: ULD positions','Flight, date, registration, origin','Position 11P: pallet, to Narita, cargo, 2,450 kg','Position 21L: container, to Narita, baggage, 620 kg','Position 32P: pallet, to Narita, cargo, 1,980 kg','Position 42L: container, to Narita, cargo, 510 kg'],n:['One letter shows the contents: C for cargo, B for baggage and so on','The destination uses this message to plan the offload order, staff and equipment','Exact formats follow company and industry standards ★']}})[l];
 if(!W)return F.cgo_cpm('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=60,lh=FS(10)*1.3,n=W.m.length;
 W.m.forEach(function(m,i){var nx=LI(W.x[i],10,560).length,h=FS(11)*1.4+nx*lh+16;
  s+='<g>'+R(20,y,600,h,i%2?'#fff':'#F4F7FB',6)+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="6" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.45)+' dur="12s" repeatCount="indefinite"/></rect>'+'<text x="34" y="'+(y+8+FS(11)).toFixed(1)+'" font-size="'+FS(11).toFixed(1)+'" font-weight="800" fill="#0f3558" font-family="ui-monospace,Consolas,monospace">'+m+'</text>'+WR(34,y+12+FS(11)*1.4+nx*lh/2,W.x[i],10,'#5B6B7D',700,560,'start')+'</g>';y+=h+3});
 var L=LIST(W.n,y+10,600,11);return SVG(L.y+8,s+L.s)},
/* 4-3 事故の申し出の期限：受け取り（引き渡し）からの日数（国際の条約の例） */
cgo_claim:function(l){
 var W=({ja:{t:'事故の申し出の期限（国際の条約の例★）',d:'日',a:'受け取り',b:'破損：14日以内に書面で',c:'遅れ：21日以内に書面で',st:['発見したその場で写真','受取書に破損・不足を書く','書面で申し出る'],n:['破損は受け取りから14日以内、遅れは貨物を受け取れる状態になってから21日以内に申し出る（モントリオール条約）★','補償の限度は重さあたりで決まっている（1kgあたり約26SDR）★。高額の貨物は価格の申告や保険を','期限を過ぎると請求が難しくなる。まず記録、すぐに連絡']},
  ko:{t:'사고 이의 제기 기한(국제 조약의 예★)',d:'일',a:'인수',b:'파손: 14일 이내에 서면으로',c:'지연: 21일 이내에 서면으로',st:['발견한 그 자리에서 사진','인수증에 파손·부족을 적는다','서면으로 이의를 제기한다'],n:['파손은 인수 후 14일 이내, 지연은 화물을 인수할 수 있게 된 날부터 21일 이내에 이의를 제기한다(몬트리올 협약)★','보상 한도는 무게당으로 정해져 있다(1kg당 약 26SDR)★. 고액 화물은 가격 신고나 보험을','기한이 지나면 청구가 어려워진다. 먼저 기록, 바로 연락']},
  en:{t:'Time limits for complaints (international convention example ★)',d:'days',a:'Receipt',b:'Damage: in writing within 14 days',c:'Delay: in writing within 21 days',st:['Photos on the spot','Note damage or shortage on the receipt','Complain in writing'],n:['Damage within 14 days of receipt; delay within 21 days of the cargo being placed at the consignee’s disposal (Montreal Convention) ★','Liability is limited by weight (about 26 SDR per kg) ★; declare a value or insure high-value cargo','Miss the deadline and a claim becomes hard: record first, then report at once']}})[l];
 if(!W)return F.cgo_claim('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),x0=60,x1=600,X=function(d){return x0+d/24*(x1-x0)},y=110,dur='8s';
 s+='<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="#9FB0C2" stroke-width="4"/>';
 [0,7,14,21].forEach(function(d){s+='<line x1="'+X(d)+'" y1="'+(y-8)+'" x2="'+X(d)+'" y2="'+(y+8)+'" stroke="#0f3558" stroke-width="2"/>'+tx(X(d),y+28,d+(l==='en'?' ':'')+W.d,10,'#0f3558',800)});
 s+='<rect x="'+x0+'" y="'+(y-26)+'" width="0" height="12" rx="4" fill="#E08A2E"><animate attributeName="width" values="0;'+(X(14)-x0).toFixed(1)+';'+(X(14)-x0).toFixed(1)+'" keyTimes="0;.4;1" dur="'+dur+'" repeatCount="indefinite"/></rect>';
 s+='<rect x="'+x0+'" y="'+(y-44)+'" width="0" height="12" rx="4" fill="#2F6FD6"><animate attributeName="width" values="0;0;'+(X(21)-x0).toFixed(1)+';'+(X(21)-x0).toFixed(1)+'" keyTimes="0;.3;.7;1" dur="'+dur+'" repeatCount="indefinite"/></rect>';
 s+=tx(x0,y-54,W.a,10,'#0f3558',900,'start');
 var ly=y+28+FS(10)+12,lh=FS(11)*1.3;
 [[W.b,'#E08A2E'],[W.c,'#2F6FD6']].forEach(function(b,i){s+='<rect x="'+(20+i*306)+'" y="'+ly+'" width="14" height="14" rx="3" fill="'+b[1]+'"/>'+WR(40+i*306,ly+7+FS(11)*0.35,b[0],11,D,800,260,'start')});
 var by=ly+Math.max(LI(W.b,11,260).length,LI(W.c,11,260).length)*lh+14;
 W.st.forEach(function(t,i){var x=20+i*203,nl=LI(t,10,180).length,h=nl*FS(10)*1.3+20;s+=R(x,by,194,h,'#fff',10,' stroke="#D5DEE8"')+BADGE(x+16,by+h/2,i+1,9)+WR(x+34,by+h/2+FS(10)*0.35,t,10,D,800,152,'start')});
 var maxh=0;W.st.forEach(function(t){maxh=Math.max(maxh,LI(t,10,180).length*FS(10)*1.3+20)});
 var L=LIST(W.n,by+maxh+12,600,11);return SVG(L.y+8,s+L.s)},
/* 5-1 GSAを通るお金と情報の流れ（例） */
cgo_gsa:function(l){
 var W=({ja:{t:'GSAを通る予約・書類・お金の流れ（例）',st:['フォワーダーがGSAに予約を申し込む','GSAが航空会社に搭載の見込みを確かめ、予約を確定する','運送状（AWB）を発行し、在庫を管理する','月ごとに売上と予約の実績を航空会社に報告する','運賃は精算のしくみ（CASSなど）を通じて回収する★','手数料を差し引き、航空会社へ送金する'],who:['フォワーダー→GSA','GSA⇄航空会社','GSA','GSA→航空会社','フォワーダー→GSA','GSA→航空会社']},
  ko:{t:'GSA를 거치는 예약·서류·돈의 흐름(예)',st:['포워더가 GSA에 예약을 신청한다','GSA가 항공사에 탑재 전망을 확인하고 예약을 확정한다','운송장(AWB)을 발행하고 재고를 관리한다','매달 매출과 예약 실적을 항공사에 보고한다','운임은 정산 시스템(CASS 등)을 통해 회수한다★','수수료를 뺀 뒤 항공사에 송금한다'],who:['포워더→GSA','GSA⇄항공사','GSA','GSA→항공사','포워더→GSA','GSA→항공사']},
  en:{t:'Bookings, documents and money through a GSA (example)',st:['The forwarder requests a booking from the GSA','The GSA checks capacity with the airline and confirms','The GSA issues the air waybill and manages the stock','Each month the GSA reports sales and bookings to the airline','Charges are collected through a settlement system such as CASS ★','The GSA deducts its commission and remits to the airline'],who:['Forwarder → GSA','GSA ⇄ airline','GSA','GSA → airline','Forwarder → GSA','GSA → airline']}})[l];
 if(!W)return F.cgo_gsa('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#6B4FA0','#2C7A7B','#E08A2E','#2E9B5F','#D64545'],'13s')},
/* 5-2 ハンドリング会社の品質の指標（3か月、架空）：目標の線を超えた月が赤 */
cgo_kpi:function(l){
 var W=({ja:{t:'ハンドリング会社の品質の指標（3か月・架空）',m:['7月','8月','9月'],k:[['積み残しの率（%）',[0.4,0.9,0.5],0.6],['事故の件数（件）',[2,1,4],3],['電報の遅れ（件）',[1,0,1],2]],g:'目標',n:['赤い棒は目標を超えた月。8月は積み残し、9月は事故が目標を超えた','月例の会議で原因（繁忙期の人員・機材の変更など）を確かめ、改善の期限を決める','数字だけでなく、点検で見た現場の様子とあわせて話し合う']},
  ko:{t:'조업사 품질 지표(3개월·가상)',m:['7월','8월','9월'],k:[['미탑재율(%)',[0.4,0.9,0.5],0.6],['사고 건수(건)',[2,1,4],3],['전문 지연(건)',[1,0,1],2]],g:'목표',n:['빨간 막대는 목표를 넘은 달. 8월은 미탑재, 9월은 사고가 목표를 넘었다','월간 회의에서 원인(성수기 인원·기재 변경 등)을 확인하고 개선 기한을 정한다','숫자만이 아니라 점검에서 본 현장 모습과 함께 이야기한다']},
  en:{t:'Handler quality indicators (three months, fictional)',m:['Jul','Aug','Sep'],k:[['Offload rate (%)',[0.4,0.9,0.5],0.6],['Irregularities (count)',[2,1,4],3],['Late messages (count)',[1,0,1],2]],g:'Target',n:['Red bars are months over target: offloads in August, irregularities in September','At the monthly meeting, find the cause (peak staffing, equipment changes) and set a deadline for the fix','Discuss the numbers together with what the audit saw on the floor']}})[l];
 if(!W)return F.cgo_kpi('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=60,dur='6s';
 W.k.forEach(function(k,i){var x0=20+i*203,mx=Math.max.apply(null,k[1].concat([k[2]]))*1.25,H=130,base=y+FS(10)*2.8+H+10,nt=LI(k[0],10,180).length;
  s+=R(x0,y,194,H+FS(10)*1.3*nt+FS(10)*1.4+40,'#fff',10,' stroke="#D5DEE8"')+WR(x0+97,y+10+nt*FS(10)*1.3/2,k[0],10,'#0f3558',800,180);
  var gy=base-k[2]/mx*H;s+='<line x1="'+(x0+10)+'" y1="'+gy.toFixed(1)+'" x2="'+(x0+184)+'" y2="'+gy.toFixed(1)+'" stroke="#E08A2E" stroke-width="2" stroke-dasharray="6 4"/>'+tx(x0+12,gy-5,W.g,8.5,'#E08A2E',800,'start');
  k[1].forEach(function(v,j){var bh=v/mx*H,bx=x0+28+j*52,over=v>k[2];s+='<rect x="'+bx+'" y="'+base+'" width="34" height="0" fill="'+(over?'#D64545':'#2F6FD6')+'" rx="3"><animate attributeName="height" values="0;'+bh.toFixed(1)+';'+bh.toFixed(1)+'" keyTimes="0;.4;1" dur="'+dur+'" begin="'+(j*0.3)+'s" fill="freeze"/><animate attributeName="y" values="'+base+';'+(base-bh).toFixed(1)+';'+(base-bh).toFixed(1)+'" keyTimes="0;.4;1" dur="'+dur+'" begin="'+(j*0.3)+'s" fill="freeze"/></rect>'+tx(bx+17,base+FS(9)*1.3,W.m[j],9,'#334155',800)});
  if(i===2)y=y});
 var L=LIST(W.n,y+130+FS(10)*1.3*2+FS(10)*1.4+56,600,11);return SVG(L.y+8,s+L.s)},
/* 5-3 ベリーの収入（1便、架空）：使える重さと実際に積んだ重さ、単価から収入と搭載率 */
cgo_rev:function(l){
 var W=({ja:{t:'1便の貨物の収入（B787のベリー・架空の例）',a:'使える重さ（旅客・手荷物の残り）',b:'実際に積んだ重さ',c:'積み残し',v:['10,000kg','8,000kg','500kg'],f:[['収入','8,000kg × 300円 ＝ 240万円'],['搭載率','8,000 ÷ 10,000 ＝ 80%'],['積み残し500kgを載せていれば','＋15万円']],n:['旅客・手荷物が多い日は使える重さが減る。予約の前に見込みを早めに出す','単価（イールド）と搭載率の両方を見る。安く満載するより、高い品目を確実に載せる方が収入が多いこともある','数字はすべて架空の例']},
  ko:{t:'한 편의 화물 수입(B787 벨리·가상의 예)',a:'사용 가능 무게(여객·수하물을 뺀 나머지)',b:'실제로 실은 무게',c:'미탑재',v:['10,000kg','8,000kg','500kg'],f:[['수입','8,000kg × 300엔 = 240만 엔'],['탑재율','8,000 ÷ 10,000 = 80%'],['미탑재 500kg을 실었다면','+15만 엔']],n:['여객·수하물이 많은 날은 쓸 수 있는 무게가 줄어든다. 예약 전에 전망을 일찍 낸다','단가(일드)와 탑재율을 함께 본다. 싸게 가득 싣기보다 비싼 품목을 확실히 싣는 쪽이 수입이 많을 때도 있다','숫자는 모두 가상의 예']},
  en:{t:'Cargo revenue on one flight (B787 belly, fictional)',a:'Available weight (after passengers and baggage)',b:'Weight actually loaded',c:'Offloaded',v:['10,000 kg','8,000 kg','500 kg'],f:[['Revenue','8,000 kg × ¥300 = ¥2.4m'],['Load factor','8,000 ÷ 10,000 = 80%'],['Had the 500 kg offload flown','+¥150,000']],n:['Busy passenger days leave less weight for cargo; give the capacity forecast early, before bookings','Watch both yield and load factor: carrying high-value cargo reliably can earn more than filling up cheaply','All figures are fictional']}})[l];
 if(!W)return F.cgo_rev('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=62,lh=FS(10)*1.3,dur='6s';
 [[W.a,W.v[0],10000,'#CBD6E2'],[W.b,W.v[1],8000,'#2F6FD6'],[W.c,W.v[2],500,'#D64545']].forEach(function(b,i){var nl=LI(b[0]+' '+b[1],10,560).length,bw=b[2]/10000*560;
  s+=WR(30,y+nl*lh/2+FS(10)*0.35,b[0]+'　'+b[1],10,D,800,560,'start');y+=nl*lh+4;
  s+='<rect x="30" y="'+y+'" width="0" height="18" rx="5" fill="'+b[3]+'"><animate attributeName="width" values="0;'+bw.toFixed(1)+';'+bw.toFixed(1)+'" keyTimes="0;.4;1" dur="'+dur+'" begin="'+(i*0.3)+'s" fill="freeze"/></rect>';y+=30});
 W.f.forEach(function(f,i){var t=f[0]+(l==='ja'?'：':': ')+f[1],nl=LI(t,11,560).length,h=nl*FS(11)*1.3+16;s+=R(20,y,600,h,i===2?'#FFF6F6':'#F2FAF5',8)+WR(34,y+h/2+FS(11)*0.35,t,11,i===2?'#D64545':'#0f3558',900,560,'start');y+=h+5});
 var L=LIST(W.n,y+8,600,11);return SVG(L.y+8,s+L.s)},
/* 5-4 貨物の仕事のキャリア（例）：現場から管理・営業へ。右は役に立つ資格・教育 */
cgo_career:function(l){
 var W=({ja:{t:'貨物の仕事のキャリア（例）',st:['上屋の作業：受け付け・計量・ビルドアップ・保管','ロードコントロール・危険物の受け付け','品質・安全の管理、またはフォワーダー・GSAの営業','空港の支店の貨物の責任者','本社の貨物部門：路線の計画・運賃・提携'],who:['フォークリフトなどの技能','危険物の教育（定期）','貿易の実務・通関士★','語学（英語・韓国語）','収入管理・契約']},
  ko:{t:'화물 업무의 커리어(예)',st:['화물터미널 작업: 접수·계량·빌드업·보관','로드 컨트롤·위험물 접수','품질·안전 관리, 또는 포워더·GSA 영업','공항 지점 화물 책임자','본사 화물 부문: 노선 계획·운임·제휴'],who:['지게차 등 기능','위험물 교육(정기)','무역 실무·관세사★','어학(영어·일본어)','수입 관리·계약']},
  en:{t:'A career in cargo (example)',st:['Terminal work: acceptance, weighing, build-up, storage','Load control and dangerous goods acceptance','Quality and safety management, or forwarder/GSA sales','Head of cargo at an airport station','Head-office cargo: route planning, rates and partnerships'],who:['Forklift and other skills','Dangerous goods training (recurrent)','Trade practice, customs broker ★','Languages (English, Japanese, Korean)','Revenue management, contracts']}})[l];
 if(!W)return F.cgo_career('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2C7A7B','#2F6FD6','#6B4FA0','#E08A2E','#D64545'],'12s')}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();

