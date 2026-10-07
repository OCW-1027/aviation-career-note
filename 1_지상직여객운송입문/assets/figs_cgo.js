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
 return STEPS(W.t,W.st,W.who,['#2F6FD6','#E08A2E','#6B4FA0','#2E9B5F','#D64545','#2C7A7B'],'13s')}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();

