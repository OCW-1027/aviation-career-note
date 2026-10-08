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
/* 時間の軸：番号の印を軸に置き、説明は下の一覧に。rev=trueなら左が早い（出発前の逆算） */
function TLINE(t,mx,unit,marks,rev,n,dur){var s=TTL(320,30,t,15,'#0f3558',600),x0=50,x1=600,X=function(v){return rev?x0+(mx-v)/mx*(x1-x0):x0+v/mx*(x1-x0)},r0=FS(9)*0.75+3,y=24+LI(t,15,600).length*FS(15)*1.3+r0*4+40;
 s+='<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="#9FB0C2" stroke-width="5" stroke-linecap="round"/>';
 for(var v=0;v<=mx;v+=60){s+='<line x1="'+X(v)+'" y1="'+(y-6)+'" x2="'+X(v)+'" y2="'+(y+6)+'" stroke="#5B6B7D" stroke-width="2"/>'+tx(X(v),y+FS(9)+14,String(v),9,'#5B6B7D',700)}
 s+=tx(rev?x0:x1,y+FS(9)*2.4+18,unit,9,'#5B6B7D',700,rev?'start':'end');
 marks.forEach(function(m,i){var cx=X(m[0]),cy=y-28-(i%2)*(r0*2+6);s+='<line x1="'+cx+'" y1="'+(cy+r0)+'" x2="'+cx+'" y2="'+y+'" stroke="'+m[2]+'" stroke-width="2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r0.toFixed(1)+'" fill="'+m[2]+'"/>'+tx(cx,cy+FS(9)*0.36,String(i+1),9,'#fff',900)});
 s+='<circle cx="0" cy="'+y+'" r="7" fill="#0f3558"><animateMotion dur="'+(dur||'8s')+'" repeatCount="indefinite" path="M'+x0+' 0 L'+x1+' 0"/></circle>';
 var yy=y+FS(9)*2.4+30,lh=FS(10)*1.3;
 marks.forEach(function(m,i){var nl=LI(m[1],10,250).length,h=Math.max(nl*lh,r0*2)+12,x=20+(i%2)*306;if(i%2===0&&i>0){}
  s+=R(x,yy,294,h,'#fff',8,' stroke="#D5DEE8"')+'<circle cx="'+(x+8+r0)+'" cy="'+(yy+h/2)+'" r="'+r0.toFixed(1)+'" fill="'+m[2]+'"/>'+tx(x+8+r0,yy+h/2+FS(9)*0.36,String(i+1),9,'#fff',900)+WR(x+16+r0*2,yy+h/2+FS(10)*0.35,m[1],10,D,800,294-24-r0*2,'start');
  if(i%2===1||i===marks.length-1){var h2=h;if(i%2===1){var nl0=LI(marks[i-1][1],10,250).length;h2=Math.max(h,Math.max(nl0*lh,r0*2)+12)}yy+=h2+6}});
 var L=LIST(n,yy+6,600,11);return SVG(L.y+8,s+L.s)}
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
 var W=({ja:{t:'貨物の仕事のキャリア（例）',st:['上屋の作業：受け付け・計量・ビルドアップ・保管','ロードコントロール・危険物の受け付け','品質・安全の管理、またはフォワーダー・GSAの営業','空港の支店の貨物の責任者','本社の貨物部門：路線の計画・運賃・提携'],who:['フォークリフトなどの技能','危険物の教育（定期）','貿易の実務・通関士★','語学（英語・韓国語）','収益管理・契約']},
  ko:{t:'화물 업무의 커리어(예)',st:['화물터미널 작업: 접수·계량·빌드업·보관','로드 컨트롤·위험물 접수','품질·안전 관리, 또는 포워더·GSA 영업','공항 지점 화물 책임자','본사 화물 부문: 노선 계획·운임·제휴'],who:['지게차 등 기능','위험물 교육(정기)','무역 실무·관세사★','어학(영어·일본어)','수입 관리·계약']},
  en:{t:'A career in cargo (example)',st:['Terminal work: acceptance, weighing, build-up, storage','Load control and dangerous goods acceptance','Quality and safety management, or forwarder/GSA sales','Head of cargo at an airport station','Head-office cargo: route planning, rates and partnerships'],who:['Forklift and other skills','Dangerous goods training (recurrent)','Trade practice, customs broker ★','Languages (English, Japanese, Korean)','Revenue management, contracts']}})[l];
 if(!W)return F.cgo_career('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2C7A7B','#2F6FD6','#6B4FA0','#E08A2E','#D64545'],'12s')},
/* 6-1 出発から逆算する時間表（分前、旅客便の例） */
cgo_tl1:function(l){
 var W=({ja:{t:'出発から逆算する時間表（旅客便の例）',u:'出発までの分',m:[[240,'搬入の締め切り（一般の貨物）'],[180,'搬入の締め切り（急送）'],[100,'ULDの計量（100〜70分前）'],[90,'書類の締め切り・ドーリーで待機'],[40,'機側へ搬出'],[20,'書類袋を機内へ']],n:['数字は1つの会社の例。空港・機材・SLAで変わる★','どこか1つが遅れると、その後ろがすべて詰まる。遅れそうなら早めにロードコントロールへ']},
  ko:{t:'출발에서 역산하는 시간표(여객편 예)',u:'출발까지 분',m:[[240,'반입 마감(일반 화물)'],[180,'반입 마감(급송)'],[100,'ULD 계량(100~70분 전)'],[90,'서류 마감·돌리에 실어 대기'],[40,'기측으로 반출'],[20,'서류 봉투를 기내로']],n:['숫자는 한 회사의 예. 공항·기재·SLA에 따라 다르다★','어느 하나가 늦으면 그 뒤가 모두 밀린다. 늦을 것 같으면 일찍 로드 컨트롤에 알린다']},
  en:{t:'Timeline counted back from departure (passenger flight example)',u:'minutes before departure',m:[[240,'Acceptance cut-off (general cargo)'],[180,'Acceptance cut-off (express)'],[100,'ULD weighing (100–70 min before)'],[90,'Document cut-off; ready on dollies'],[40,'Out to the aircraft'],[20,'Document pouch on board']],n:['Figures are one airline’s example and vary by airport, aircraft and SLA ★','If one step slips, everything behind it is squeezed; warn load control early']}})[l];
 if(!W)return F.cgo_tl1('ja');setK(1);
 var C=['#2F6FD6','#6B4FA0','#2C7A7B','#E08A2E','#D64545','#2E9B5F'];
 return TLINE(W.t,240,W.u,W.m.map(function(m,i){return [m[0],m[1],C[i]]}),true,W.n,'10s')},
/* 6-1 許容搭載量（ACL）の内訳：旅客・手荷物・貨物 */
cgo_acl:function(l){
 var W=({ja:{t:'貨物に使える重さ（中型機の例・架空）',a:'許容搭載量（ACL）38,000kg',p:[['旅客','290人×80kg＝23,200kg',23200,'#2F6FD6'],['手荷物','290人×16kg＝4,640kg',4640,'#6B4FA0'],['貨物','残り10,160kg',10160,'#E08A2E']],n:['貨物の枠は、ACLから旅客と手荷物を引いた残り','手荷物は個数でもコンテナの数が決まる（319個÷40個＝8台）。場所も貨物の枠を減らす','前日に予想の旅客数・手荷物を旅客の担当と確かめる']},
  ko:{t:'화물에 쓸 수 있는 무게(중형기 예·가상)',a:'허용 탑재량(ACL) 38,000kg',p:[['여객','290명×80kg=23,200kg',23200,'#2F6FD6'],['수하물','290명×16kg=4,640kg',4640,'#6B4FA0'],['화물','나머지 10,160kg',10160,'#E08A2E']],n:['화물 몫은 ACL에서 여객과 수하물을 뺀 나머지','수하물은 개수로도 컨테이너 수가 정해진다(319개÷40개=8대). 자리도 화물 몫을 줄인다','전날 예상 여객 수·수하물을 여객 담당과 확인한다']},
  en:{t:'Weight available for cargo (wide-body example, fictional)',a:'Allowed traffic load (ACL) 38,000 kg',p:[['Passengers','290 × 80 kg = 23,200 kg',23200,'#2F6FD6'],['Baggage','290 × 16 kg = 4,640 kg',4640,'#6B4FA0'],['Cargo','Remaining 10,160 kg',10160,'#E08A2E']],n:['Cargo gets what is left of the ACL after passengers and baggage','Baggage also takes positions: 319 bags ÷ 40 per container = 8 containers, which reduces cargo space','Check expected passenger and bag numbers with the passenger team the day before']}})[l];
 if(!W)return F.cgo_acl('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=60,dur='7s',x=30,tot=38000;
 s+=WR(320,y+FS(11)*0.9,W.a,11,'#0f3558',900,580);y+=FS(11)*1.3+12;
 s+=R(30,y,580,34,'#EEF2F7',6);
 W.p.forEach(function(p,i){var w=p[2]/tot*580,a=(i*0.25).toFixed(2),b=(i*0.25+0.2).toFixed(2);s+='<rect x="'+x.toFixed(1)+'" y="'+y+'" width="0" height="34" fill="'+p[3]+'"><animate attributeName="width" values="0;0;'+w.toFixed(1)+';'+w.toFixed(1)+'" keyTimes="0;'+a+';'+b+';1" dur="'+dur+'" repeatCount="indefinite"/></rect>';x+=w});
 y+=46;var lh=FS(11)*1.3;
 W.p.forEach(function(p,i){var t=p[0]+(l==='ja'?'：':': ')+p[1],nl=LI(t,11,540).length,h=nl*lh+12;s+=R(20,y,600,h,i===2?'#FFF7EC':'#fff',8,' stroke="#D5DEE8"')+'<rect x="30" y="'+(y+h/2-7)+'" width="14" height="14" rx="3" fill="'+p[3]+'"/>'+WR(54,y+h/2+FS(11)*0.35,t,11,i===2?'#B4580F':D,900,550,'start');y+=h+5});
 var L=LIST(W.n,y+6,600,11);return SVG(L.y+8,s+L.s)},
/* 6-2 床の強さ：底の小さい重い貨物は板で面積を広げる */
cgo_floor:function(l){
 var W=({ja:{t:'床の強さと重さの分散（例）',a:'そのまま',b:'板を敷いて広げる',am:'2,400kg ÷ 1.2㎡ ＝ 2,000kg/㎡',bm:'2,400kg ÷ 3.0㎡ ＝ 800kg/㎡',lim:'床の強さの上限（例）800kg/㎡',ng:'上限を超える',ok:'上限の中',n:['底が1.2m×1.0mのままだと、床に1㎡あたり2,000kgかかり、上限の2.5倍','必要な面積は 2,400 ÷ 800 ＝ 3.0㎡。板で2.0m×1.5mに広げる','上限は機材・位置・ULDで違う。会社の基準を超える重量物は担当者が確かめて指示する']},
  ko:{t:'바닥 강도와 무게 분산(예)',a:'그대로',b:'판을 깔아 넓힌다',am:'2,400kg ÷ 1.2㎡ = 2,000kg/㎡',bm:'2,400kg ÷ 3.0㎡ = 800kg/㎡',lim:'바닥 강도 상한(예) 800kg/㎡',ng:'상한 초과',ok:'상한 이내',n:['바닥이 1.2m×1.0m 그대로면 1㎡당 2,000kg이 걸려 상한의 2.5배','필요 면적은 2,400 ÷ 800 = 3.0㎡. 판으로 2.0m×1.5m로 넓힌다','상한은 기재·위치·ULD에 따라 다르다. 회사 기준을 넘는 중량물은 담당자가 확인하고 지시한다']},
  en:{t:'Floor strength and spreading the load (example)',a:'As it is',b:'Spread on shoring',am:'2,400 kg ÷ 1.2 m² = 2,000 kg/m²',bm:'2,400 kg ÷ 3.0 m² = 800 kg/m²',lim:'Floor limit (example) 800 kg/m²',ng:'Over the limit',ok:'Within the limit',n:['On its own 1.2 m × 1.0 m base, the item puts 2,000 kg on each square metre: 2.5 times the limit','Area needed: 2,400 ÷ 800 = 3.0 m², so spread it on shoring of 2.0 m × 1.5 m','Limits vary by aircraft, position and ULD; heavy items above company thresholds are checked and instructed by a supervisor']}})[l];
 if(!W)return F.cgo_floor('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),sc=70,y0=70,dur='8s',lh=FS(10)*1.3;
 s+=WR(320,y0+FS(10)*0.6,W.lim,10,'#0f3558',800,580);var top=y0+FS(10)*1.3+12,fl=Math.max(LI(W.am,10,270).length,LI(W.bm,10,270).length),bh=170+fl*lh+FS(11)*1.3+30;
 [[W.a,W.am,1.2,1.0,'#D64545',W.ng],[W.b,W.bm,2.0,1.5,'#2E9B5F',W.ok]].forEach(function(c,i){var ox=20+i*310,cx=ox+145,cy=top+FS(11)*1.3+80;
  s+=R(ox,top,290,bh,'#F4F7FB',12)+WR(cx,top+16,c[0],11,'#0f3558',900,270);
  var w=c[2]*sc,h=c[3]*sc;s+='<rect x="'+(cx-w/2)+'" y="'+(cy-h/2)+'" width="'+w+'" height="'+h+'" fill="'+c[4]+'" opacity=".25" stroke="'+c[4]+'" stroke-width="2"'+(i?'><animate attributeName="width" values="'+(1.2*sc)+';'+(1.2*sc)+';'+w+';'+w+'" keyTimes="0;.2;.5;1" dur="'+dur+'" repeatCount="indefinite"/><animate attributeName="x" values="'+(cx-0.6*sc)+';'+(cx-0.6*sc)+';'+(cx-w/2)+';'+(cx-w/2)+'" keyTimes="0;.2;.5;1" dur="'+dur+'" repeatCount="indefinite"/><animate attributeName="height" values="'+(1.0*sc)+';'+(1.0*sc)+';'+h+';'+h+'" keyTimes="0;.2;.5;1" dur="'+dur+'" repeatCount="indefinite"/><animate attributeName="y" values="'+(cy-0.5*sc)+';'+(cy-0.5*sc)+';'+(cy-h/2)+';'+(cy-h/2)+'" keyTimes="0;.2;.5;1" dur="'+dur+'" repeatCount="indefinite"/></rect>':'/>');
  s+='<rect x="'+(cx-0.6*sc+8)+'" y="'+(cy-0.5*sc+8)+'" width="'+(1.2*sc-16)+'" height="'+(1.0*sc-16)+'" rx="4" fill="#5B6B7D"/>'+tx(cx,cy+4,'2,400kg',9,'#fff',900);
  var fy=cy+66;s+=WR(cx,fy+fl*lh/2,c[1],10,c[4],900,270)+LB(cx,fy+fl*lh+16+FS(11)*0.4,c[5],11,'#fff','middle',c[4])});
 var L=LIST(W.n,top+bh+10,600,11);return SVG(L.y+8,s+L.s)},
/* 6-2 ULD重量表（UWS）の差：1%を超えたら原因がわかるまで積まない */
cgo_uws:function(l){
 var W=({ja:{t:'ULDの重さの差を確かめる（UWS・例）',a:'マニフェストの重さ（部材を含む）',b:'計量した重さ',d:'差 70kg（約2.3%）',th:'判断の線（例）1%',st:'原因がわかるまで積まない',n:['部材（ULD・板・シート・ロープ）の重さの書き漏れが多い原因','重さの誤り・書いていない貨物がないかを確かめてから、ロードシートに反映する']},
  ko:{t:'ULD 무게 차이 확인(UWS·예)',a:'매니페스트 무게(부자재 포함)',b:'계량한 무게',d:'차이 70kg(약 2.3%)',th:'판단선(예) 1%',st:'원인을 알 때까지 싣지 않는다',n:['부자재(ULD·판·시트·로프) 무게를 빠뜨린 것이 흔한 원인','무게 오류·기재되지 않은 화물이 없는지 확인한 뒤 로드시트에 반영한다']},
  en:{t:'Checking ULD weight differences (UWS, example)',a:'Manifest weight (incl. ULD and materials)',b:'Scale weight',d:'Difference 70 kg (about 2.3%)',th:'Decision line (example) 1%',st:'Do not load until the cause is found',n:['Leaving out the weight of the ULD, boards, sheets and ropes is a common cause','Check for wrong weights or undeclared pieces, then reflect it on the loadsheet']}})[l];
 if(!W)return F.cgo_uws('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=62,lh=FS(10)*1.3,dur='7s',sc=520/3200;
 [[W.a,3050,'#2F6FD6'],[W.b,3120,'#D64545']].forEach(function(b,i){var t=b[0]+'　'+b[1].toLocaleString()+'kg',nl=LI(t,10,560).length;s+=WR(30,y+nl*lh/2+FS(10)*0.35,t,10,D,800,560,'start');y+=nl*lh+4;
  s+='<rect x="30" y="'+y+'" width="0" height="18" rx="5" fill="'+b[2]+'"><animate attributeName="width" values="0;'+(b[1]*sc).toFixed(1)+';'+(b[1]*sc).toFixed(1)+'" keyTimes="0;.4;1" dur="'+dur+'" begin="'+(i*0.3)+'s" fill="freeze"/></rect>';y+=30});
 var gx=30,gw=560;s+=R(gx,y+6,gw,16,'#EEF2F7',8);var X=function(p){return gx+p/3*gw};
 s+='<rect x="'+gx+'" y="'+(y+6)+'" width="'+(X(1)-gx)+'" height="16" rx="8" fill="#2E9B5F" opacity=".35"/><line x1="'+X(1)+'" y1="'+y+'" x2="'+X(1)+'" y2="'+(y+28)+'" stroke="#0f3558" stroke-width="2" stroke-dasharray="4 3"/>';
 s+='<circle cx="'+X(2.3).toFixed(1)+'" cy="'+(y+14)+'" r="9" fill="#D64545" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.45;.5;1" dur="'+dur+'" fill="freeze"/></circle>';
 y+=36;s+=WR(30,y+FS(10)*0.8,W.th,10,'#0f3558',800,280,'start')+WR(330,y+FS(10)*0.8,W.d,10,'#D64545',900,280,'start');y+=FS(10)*1.3*2+8;
 s+=LB(320,y+FS(12)*0.6,W.st,12,'#fff','middle','#D64545');y+=FS(12)*1.3+20;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 6-3 到着から引き渡しまでの時間（SLAの例） */
cgo_tl2:function(l){
 var W=({ja:{t:'到着から引き渡しまで（SLAの例）',u:'到着からの分',m:[[60,'荷受人へ到着の通知'],[120,'急送・生鮮品・ULDのままの引き渡し、乗り継ぎへの引き継ぎ'],[180,'便の締め（システム）'],[240,'一般の貨物（ばら）の引き渡し']],n:['時間はハンドリング会社とのSLAの例★。守れなかった件数は月例の会議で確かめる（5-2）','急ぐ貨物ほど、ULDのまま扱える位置に積んでもらうと早い']},
  ko:{t:'도착에서 인도까지(SLA 예)',u:'도착부터 분',m:[[60,'수하인에게 도착 통지'],[120,'급송·신선품·ULD 그대로 인도, 환적으로 인계'],[180,'편 마감(시스템)'],[240,'일반 화물(벌크) 인도']],n:['시간은 조업사와의 SLA 예★. 지키지 못한 건수는 월간 회의에서 확인한다(5-2)','급한 화물일수록 ULD 그대로 다룰 수 있는 위치에 실어 두면 빠르다']},
  en:{t:'From arrival to delivery (SLA example)',u:'minutes after arrival',m:[[60,'Consignee notified of arrival'],[120,'Express, perishables and intact ULDs released; transfers handed over'],[180,'Flight closed in the system'],[240,'General (loose) cargo released']],n:['Times are an example SLA with the handler ★; review missed targets at the monthly meeting (5-2)','Urgent cargo moves fastest if loaded where it can be handled as an intact ULD']}})[l];
 if(!W)return F.cgo_tl2('ja');setK(1);
 var C=['#2F6FD6','#2E9B5F','#6B4FA0','#E08A2E'];
 return TLINE(W.t,240,W.u,W.m.map(function(m,i){return [m[0],m[1],C[i]]}),false,W.n,'8s')},
/* 6-4 乗り継ぎの2つの形：ULDのまま（90分前まで）と組み直し（180〜240分前まで） */
cgo_trans:function(l){
 var W=({ja:{t:'乗り継ぎの貨物：ULDのままか、組み直しか',a:'ULDのまま（スルー）',b:'組み直し',am:'接続便の90分前まで',bm:'接続便の180〜240分前まで',st:['到着','取り降ろし','（組み直し）','計量・書類','接続便へ'],n:['ULDのままなら組み直しがないので短い。到着便でULDごと乗り継ぎ用に積んでもらう','組み直しはULDをばらして積み直すので時間がかかる。保安の記録が途切れたら再検査','時間は例。接続の時間が短いときは、出発地と事前に段取りを決める']},
  ko:{t:'환적 화물: ULD 그대로인가, 재작업인가',a:'ULD 그대로(스루)',b:'재작업',am:'연결편 90분 전까지',bm:'연결편 180~240분 전까지',st:['도착','하기','(재작업)','계량·서류','연결편으로'],n:['ULD 그대로면 재작업이 없어 짧다. 도착편에서 ULD째 환적용으로 실어 달라고 한다','재작업은 ULD를 풀어 다시 쌓으므로 시간이 걸린다. 보안 기록이 끊기면 재검색','시간은 예. 연결 시간이 짧으면 출발지와 미리 절차를 정한다']},
  en:{t:'Transfer cargo: through ULD or rebuild',a:'Through ULD',b:'Rebuild',am:'By 90 min before the connecting flight',bm:'By 180–240 min before the connecting flight',st:['Arrival','Offload','(rebuild)','Weigh & documents','To connecting flight'],n:['A through ULD is quick because nothing is rebuilt; ask the origin to build it for the transfer','A rebuild breaks the ULD down and builds it again, so it takes longer; if the security record breaks, re-screen','Times are examples; with short connections agree the arrangements with the origin in advance']}})[l];
 if(!W)return F.cgo_trans('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=60,dur='9s',lh=FS(10)*1.3;
 [[W.a,W.am,'#2E9B5F',[0,1,3,4],0.45],[W.b,W.bm,'#E08A2E',[0,1,2,3,4],0.95]].forEach(function(c,k){var nh=LI(c[0]+'：'+c[1],11,560).length*FS(11)*1.3,hh=nh+FS(9)*3.4+64;
  s+=R(20,y,600,hh,k?'#FFF7EC':'#F2FAF5',12)+WR(36,y+12+nh/2+FS(11)*0.35,c[0]+(l==='ja'?'：':': ')+c[1],11,'#0f3558',900,560,'start');
  var by=y+nh+30,xs=[];c[3].forEach(function(j,i){xs.push(60+i*(500/(c[3].length-1)))});
  s+='<line x1="60" y1="'+by+'" x2="560" y2="'+by+'" stroke="'+c[2]+'" stroke-width="4" opacity=".4"/>';
  c[3].forEach(function(j,i){s+='<circle cx="'+xs[i]+'" cy="'+by+'" r="8" fill="#fff" stroke="'+c[2]+'" stroke-width="3"/>'+WR(xs[i],by+14+FS(9)*1.2,W.st[j],9,D,800,104)});
  s+='<rect x="-9" y="-9" width="18" height="18" rx="3" fill="'+c[2]+'"><animateMotion dur="'+dur+'" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;'+c[4]+';1" calcMode="linear" path="M60 '+by+' L560 '+by+'"/></rect>';
  y+=hh+10});
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 7-1 日本のKS/RAと韓国の常用貨主：同じ考え方を2つの国で並べる。行が順に光る */
cgo_ksra:function(l){
 var W=({ja:{t:'日本と韓国の貨物の保安を並べる',h:['','日本','韓国'],r:[['確認済みの荷主','特定荷主（KS）','常用貨主（保安検索の基準を満たし国が指定）'],['検査をする者','RA（国の認定）・航空会社','航空会社、または国が指定した業者'],['記録が途切れたら','航空会社が検査してから積む','航空会社が検索する（8つの場合）'],['根拠','国のガイドライン・認定の制度','航空保安法 第15条・第17条の4']],n:['考え方は同じ：確かめられた人から搭載まで記録が続けば、空港での検査を省ける','韓国の常用貨主の条文は2026年2月の改正で第17条の4に移った★']},
  ko:{t:'일본과 한국의 화물 보안 비교',h:['','일본','한국'],r:[['확인된 화주','특정화주(KS)','상용화주(보안검색 기준 충족, 국가 지정)'],['검색하는 자','RA(국가 인정)·항공사','항공사 또는 국가 지정 업체'],['기록이 끊기면','항공사가 검사 후 탑재','항공사가 검색(8가지 경우)'],['근거','국가 가이드라인·인정 제도','항공보안법 제15조·제17조의4']],n:['원리는 같다: 확인된 사람부터 탑재까지 기록이 이어지면 공항 검색을 생략할 수 있다','한국 상용화주 조문은 2026년 2월 개정으로 제17조의4로 옮겨졌다★']},
  en:{t:'Cargo security in Japan and Korea side by side',h:['','Japan','Korea'],r:[['Approved shipper','Known consignor (KS)','Regular shipper (meets screening standards, designated by the state)'],['Who screens','Regulated agent (RA, approved) and airline','Airline, or a state-designated contractor'],['If the record breaks','Airline screens before loading','Airline screens (eight listed cases)'],['Basis','National guidelines and approval scheme','Aviation Security Act Art. 15 and 17-4']],n:['Same principle: if the record is unbroken from an approved party to loading, airport screening can be skipped','Korea’s regular-shipper article moved to Art. 17-4 in the February 2026 amendment ★']}})[l];
 if(!W)return F.cgo_ksra('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=58,lh=FS(10)*1.3,cw=[150,225,225],cx=[20,170,395],n=W.r.length;
 var hh=FS(11)*1.3+14;W.h.forEach(function(h,i){s+=R(cx[i],y,cw[i],hh,i?(i===1?'#2F6FD6':'#D64545'):'#0f3558',0)+WR(cx[i]+cw[i]/2,y+hh/2+FS(11)*0.35,h,11,'#fff',900,cw[i]-10)});y+=hh;
 W.r.forEach(function(r,k){var rh=0;r.forEach(function(c,i){rh=Math.max(rh,LI(c,10,cw[i]-14).length*lh)});rh+=14;
  s+='<g>';r.forEach(function(c,i){s+=R(cx[i],y,cw[i],rh,i?'#fff':'#F4F7FB',0,' stroke="#C8D3DE"')+WR(cx[i]+cw[i]/2,y+rh/2+FS(10)*0.35,c,10,i?D:'#0f3558',i?800:900,cw[i]-14)});
  s+='<rect x="20" y="'+y+'" width="600" height="'+rh+'" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(k,n,0,.35)+' dur="12s" repeatCount="indefinite"/></rect></g>';y+=rh});
 var L=LIST(W.n,y+12,600,11);return SVG(L.y+8,s+L.s)},
/* 7-2 行き先の国へ先に送るデータ：米国（ACAS）とEU（ICS2） */
cgo_adv:function(l){
 var W=({ja:{t:'行き先の国へ先に送るデータ（米国・EU）',st:['予約とAWBのデータ（FWB・FHL）を作る','米国向け：ACASのデータを、できるだけ早く、遅くとも搭載の前に送る','EU向け：一部のデータ（PLACI）を搭載の前に送る','危険が高いと照会や「積むな（DNL）」が来る。解消するまで積まない','出発。EU向けは保安の状態のコード（SPXなど）をAWBとFWBに書く','EU向け：入境の要約申告（ENS）の全データを到着の前に送る'],who:['出発地','米国（CBP）','EU','航空会社','出発地','EU']},
  ko:{t:'목적국에 미리 보내는 데이터(미국·EU)',st:['예약과 AWB 데이터(FWB·FHL)를 만든다','미국행: ACAS 데이터를 가능한 한 빨리, 늦어도 탑재 전에 보낸다','EU행: 일부 데이터(PLACI)를 탑재 전에 보낸다','위험이 높으면 조회나 「싣지 마라(DNL)」가 온다. 해소될 때까지 싣지 않는다','출발. EU행은 보안 상태 코드(SPX 등)를 AWB와 FWB에 적는다','EU행: 입경 요약 신고(ENS) 전체 데이터를 도착 전에 보낸다'],who:['출발지','미국(CBP)','EU','항공사','출발지','EU']},
  en:{t:'Data sent ahead to the destination (US and EU)',st:['Create the booking and AWB data (FWB, FHL)','US: send ACAS data as early as possible, at the latest before loading','EU: send the PLACI subset before loading','High-risk results bring a referral or Do Not Load (DNL); do not load until resolved','Departure; for the EU, show the security status code (e.g. SPX) on the AWB and FWB','EU: send the full entry summary declaration (ENS) before arrival'],who:['Origin','US (CBP)','EU','Airline','Origin','EU']}})[l];
 if(!W)return F.cgo_adv('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#2C7A7B','#2F6FD6','#6B4FA0','#D64545','#E08A2E','#6B4FA0'],'13s')},
/* 7-3 危険物の受付：止める勇気と3枚のNOTOC */
cgo_dgacc:function(l){
 var W=({ja:{t:'危険物の受付からNOTOCまで（例）',st:['予約の前に、本社・GSAの承認を得る','危険物の訓練を修了した担当が受け付ける','最新のDGRの点検表で、書類・包装・表示を1項目ずつ確かめる','承認のないもの・不備のあるものは止める','NOTOCを3部作る：出発地・機長・到着地','作成後と出発前の2回、運航統制と本社に送る。1年保存★'],who:['本社・GSA','資格者','点検表','止める','3部','送信・保存']},
  ko:{t:'위험물 접수에서 NOTOC까지(예)',st:['예약 전에 본사·GSA의 승인을 받는다','위험물 교육을 수료한 담당이 접수한다','최신 DGR 점검표로 서류·포장·표시를 한 항목씩 확인한다','승인 없는 것·미비한 것은 멈춘다','NOTOC를 3부 만든다: 출발지·기장·도착지','작성 후와 출발 전 두 번, 운항통제와 본사에 보낸다. 1년 보존★'],who:['본사·GSA','자격자','점검표','멈춤','3부','송신·보존']},
  en:{t:'From dangerous goods acceptance to the NOTOC (example)',st:['Obtain head office or GSA approval before booking','A trained, qualified agent accepts the shipment','Check documents, packing and marking item by item on the current DGR checklist','Stop anything unapproved or deficient','Make three NOTOC copies: origin, captain, destination','Send to operations control and head office after completion and before departure; keep for one year ★'],who:['Head office/GSA','Qualified staff','Checklist','Stop','3 copies','Send & keep']}})[l];
 if(!W)return F.cgo_dgacc('ja');setK(1);
 return STEPS(W.t,W.st,W.who,['#6B4FA0','#2F6FD6','#2C7A7B','#D64545','#E08A2E','#2E9B5F'],'13s')},
/* 7-4 責任の限度の推移と計算の例（モントリオール条約） */
cgo_liab:function(l){
 var W=({ja:{t:'貨物の責任の限度（1kgあたり、モントリオール条約）',r:[['2003年の発効時',17],['2019年12月28日から',22],['2024年12月28日から',26]],u:'SDR',ex:'例：100kgの貨物が壊れた → 26SDR × 100kg ＝ 2,600SDR（約3,400米ドル）★',n:['限度は5年ごとに物価に合わせて見直される（第24条）','価額を申告して料金を払えば、その額まで賠償される。高額の貨物は申告か保険を','SDRと米ドルの換算は日によって変わる★']},
  ko:{t:'화물 책임 한도(1kg당, 몬트리올 협약)',r:[['2003년 발효 시',17],['2019년 12월 28일부터',22],['2024년 12월 28일부터',26]],u:'SDR',ex:'예: 100kg 화물 파손 → 26SDR × 100kg = 2,600SDR(약 3,400달러)★',n:['한도는 5년마다 물가에 맞춰 재검토된다(제24조)','가액을 신고하고 요금을 내면 그 금액까지 배상된다. 고액 화물은 신고나 보험을','SDR과 달러 환산은 날마다 바뀐다★']},
  en:{t:'Cargo liability limit per kg (Montreal Convention)',r:[['At entry into force, 2003',17],['From 28 Dec 2019',22],['From 28 Dec 2024',26]],u:'SDR',ex:'Example: 100 kg damaged → 26 SDR × 100 kg = 2,600 SDR (about US$3,400) ★',n:['Limits are reviewed every five years for inflation (Art. 24)','A declared value, with the charge paid, raises compensation to that amount; declare or insure high-value cargo','The SDR–dollar rate changes daily ★']}})[l];
 if(!W)return F.cgo_liab('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=62,lh=FS(10)*1.3,dur='6s',sc=(440-FS(11)*4)/30;
 W.r.forEach(function(r,i){var nl=LI(r[0],10,140).length,h=Math.max(nl*lh,22)+14,bw=r[1]*sc;
  s+=WR(30,y+h/2+FS(10)*0.35,r[0],10,D,800,140,'start')+'<rect x="175" y="'+(y+h/2-11)+'" width="0" height="22" rx="6" fill="'+['#9FB0C2','#2F6FD6','#E08A2E'][i]+'"><animate attributeName="width" values="0;'+bw.toFixed(1)+';'+bw.toFixed(1)+'" keyTimes="0;.4;1" dur="'+dur+'" begin="'+(i*0.4)+'s" fill="freeze"/></rect>'+tx(175+bw+10,y+h/2+FS(11)*0.35,r[1]+' '+W.u,11,'#0f3558',900,'start');y+=h+6});
 var ne=LI(W.ex,11,560).length,he=ne*FS(11)*1.3+18;s+=R(20,y+6,600,he,'#FFF7EC',10,' stroke="#E08A2E"')+WR(36,y+6+he/2+FS(11)*0.35,W.ex,11,'#B4580F',900,560,'start');y+=he+16;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 7-5 SGHAとSLA：契約の本文・附属書A・附属書B、そしてSLA */
cgo_sgha:function(l){
 var W=({ja:{t:'ハンドリング会社との約束：SGHAとSLA',b:[['SGHAの本文','責任・保険・支払い・解約（IATAの標準）'],['附属書A','業務の定義の一覧'],['附属書B','空港・実際に頼む業務・料金']],sla:['SLA','時間の基準・データの作業・KPIと目標・罰則・定例の会議'],x:'IATA AHM 810（SGHA、2023年版）／AHM 803（SLAのひな形）★',n:['SGHAは「何を・いくらで」、SLAは「どれだけの品質で」を決める','SLAの数字（締め切り・引き渡しの時刻など）が、現場の時間表（6-1・6-3）のもとになる']},
  ko:{t:'조업사와의 약속: SGHA와 SLA',b:[['SGHA 본문','책임·보험·지급·해지(IATA 표준)'],['부속서 A','업무 정의 목록'],['부속서 B','공항·실제 맡기는 업무·요금']],sla:['SLA','시간 기준·데이터 작업·KPI와 목표·벌칙·정례 회의'],x:'IATA AHM 810(SGHA, 2023년판) / AHM 803(SLA 양식)★',n:['SGHA는 「무엇을·얼마에」, SLA는 「어느 품질로」를 정한다','SLA의 숫자(마감·인도 시각 등)가 현장 시간표(6-1·6-3)의 바탕이 된다']},
  en:{t:'Agreements with the handler: SGHA and SLA',b:[['SGHA main agreement','Liability, insurance, payment, termination (IATA standard)'],['Annex A','Definitions of services'],['Annex B','Airport, services actually ordered and charges']],sla:['SLA','Time standards, data tasks, KPIs and targets, penalties, regular meetings'],x:'IATA AHM 810 (SGHA, 2023 edition) / AHM 803 (SLA template) ★',n:['The SGHA sets what is done and at what price; the SLA sets to what quality','The SLA’s numbers (cut-offs, release times) underpin the station timelines (6-1, 6-3)']}})[l];
 if(!W)return F.cgo_sgha('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=62,lh=FS(10)*1.3,dur='8s',col=['#2F6FD6','#6B4FA0','#2C7A7B'];
 var y0=y;W.b.forEach(function(b,i){var nl=LI(b[1],10,250).length,h=FS(11)*1.3+nl*lh+22,a=(i*0.15).toFixed(2),c=(i*0.15+0.1).toFixed(2);
  s+='<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+a+';'+c+';1" dur="'+dur+'" fill="freeze"/>'+R(20,y,290,h,'#fff',10,' stroke="'+col[i]+'" stroke-width="2"')+'<rect x="20" y="'+y+'" width="8" height="'+h+'" rx="3" fill="'+col[i]+'"/>'+WR(165,y+10+FS(11)*0.9,b[0],11,col[i],900,260)+WR(165,y+14+FS(11)*1.3+nl*lh/2+FS(10)*0.3,b[1],10,D,800,250)+'</g>';y+=h+8});
 var sh=y-y0-8,ns=LI(W.sla[1],10,250).length;
 s+='<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.5;.6;1" dur="'+dur+'" fill="freeze"/>'+R(330,y0,290,sh,'#FFF7EC',10,' stroke="#E08A2E" stroke-width="2"')+WR(475,y0+sh/2-ns*lh/2-6,W.sla[0],14,'#E08A2E',900,260)+WR(475,y0+sh/2+FS(14)*0.4+ns*lh/2,W.sla[1],10,D,800,250)+'</g>';
 s+=ARW(312,y0+sh/2,328,y0+sh/2,'#E08A2E',3);
 var nx=LI(W.x,9,580).length;s+=WR(320,y+nx*FS(9)*1.3/2+4,W.x,9,'#5B6B7D',700,580);y+=nx*FS(9)*1.3+16;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 7-6 品質の審査：6つの分野の点数（架空）。基準に届かない分野は是正 */
cgo_audit:function(l){
 var W=({ja:{t:'品質の審査の結果（6つの分野・架空の例）',a:['安全の全般','書類とマニュアル','倉庫の作業','保安','ULD','危険物'],v:[92,85,74,95,68,90],th:'基準 80点',fx:'是正の計画と期限',n:['基準に届かない分野（倉庫の作業・ULD）は、是正の計画と期限を決めて次の月例の会議で確かめる','点数だけでなく、指摘の写真・記録を残して、次の審査で同じ点を確かめる','数字は架空の例']},
  ko:{t:'품질 심사 결과(6개 분야·가상의 예)',a:['안전 일반','서류와 매뉴얼','창고 작업','보안','ULD','위험물'],v:[92,85,74,95,68,90],th:'기준 80점',fx:'시정 계획과 기한',n:['기준에 못 미친 분야(창고 작업·ULD)는 시정 계획과 기한을 정해 다음 월간 회의에서 확인한다','점수만이 아니라 지적 사진·기록을 남겨 다음 심사에서 같은 점을 확인한다','숫자는 가상의 예']},
  en:{t:'Quality audit results (six areas, fictional)',a:['Safety general','Documents and manuals','Warehouse','Security','ULDs','Dangerous goods'],v:[92,85,74,95,68,90],th:'Standard: 80',fx:'Corrective plan and deadline',n:['Areas below standard (warehouse, ULDs) get a corrective plan and deadline, checked at the next monthly meeting','Keep photos and records of findings, not just scores, and re-check the same points next audit','Figures are fictional']}})[l];
 if(!W)return F.cgo_audit('ja');setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600),y=66,lh=FS(10)*1.3,dur='6s',x0=200,sc=380/100;
 var top=y;W.a.forEach(function(a,i){var nl=LI(a,10,170).length,h=Math.max(nl*lh,20)+12,bw=W.v[i]*sc,low=W.v[i]<80;
  s+=WR(x0-10,y+h/2+FS(10)*0.35,a,10,D,800,170,'end')+'<rect x="'+x0+'" y="'+(y+h/2-10)+'" width="0" height="20" rx="5" fill="'+(low?'#D64545':'#2F6FD6')+'"><animate attributeName="width" values="0;'+bw.toFixed(1)+';'+bw.toFixed(1)+'" keyTimes="0;.4;1" dur="'+dur+'" begin="'+(i*0.2)+'s" fill="freeze"/></rect>'+tx(x0+bw+8,y+h/2+FS(10)*0.35,String(W.v[i]),10,low?'#D64545':'#0f3558',900,'start');y+=h+4});
 var gx=x0+80*sc;s+='<line x1="'+gx+'" y1="'+(top-6)+'" x2="'+gx+'" y2="'+y+'" stroke="#E08A2E" stroke-width="2" stroke-dasharray="6 4"/>'+tx(gx,top-12,W.th,9,'#E08A2E',800);
 y+=8;s+=LB(320,y+FS(11)*0.6,W.fx,11,'#fff','middle','#D64545');y+=FS(11)*1.3+18;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();

