/* CIQの役割（CIQ）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   色の約束：検疫=緑、出入国=青、税関=オレンジ、航空会社=紺、そのほか=灰色。作成ルールは 00_그림작성규칙.md */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,FS=H.FS,LI=H.LINES,setK=H.setK,ARW=H.ARW;
var D=H.C.D,G=H.C.G,QC='#1F8A5B',IC='#2F8FE0',CC='#E08A2F',NV='#0f3558',GY='#9AA9B8';
function svg(h,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+Math.ceil(h)+'" role="img">'+R(0,0,640,Math.ceil(h),'#F7FAFD')+body+'</svg>'}
function hgt(s,sz,w){return LI(s,sz,w).length*FS(sz)*1.3}
function TW2(x,top,s,sz,c,w,maxw,a){var n=LI(s,sz,maxw).length,lh=FS(sz)*1.3;return WR(x,top+FS(sz)*0.95+(n-1)*lh/2,s,sz,c,w,maxw,a)}
function ttlH(s){return Math.max(58,30+hgt(s,15,600)+14)}
function BOX(y,s,bg,c,sz){sz=sz||12;var h=hgt(s,sz,560)+18;return [R(20,y,600,h,bg,10)+TW2(320,y+9,s,sz,c,900,560),h]}

/* 0-1 CIQの3つの仕事。行：[文字, 名前, 見るもの, 目的, 色] */
var THREE={
 ja:['CIQ ― 国境で3つの役所が見ているもの',[['C','税関（Customs）','物とお金','密輸を防ぎ、関税・消費税を集める',CC],['I','出入国（Immigration）','人','入国・出国する資格があるかを確かめる',IC],['Q','検疫（Quarantine）','病気と病害虫','人の感染症、動物の病気、植物の病害虫を国に入れない',QC]],['見るもの','目的'],'お客様だけでなく、乗務員・機内食・貨物・機体も、この3つを通ります。'],
 ko:['CIQ — 국경에서 세 기관이 보는 것',[['C','세관(Customs)','물건과 돈','밀수를 막고 관세·부가세를 걷는다',CC],['I','출입국(Immigration)','사람','입국·출국할 자격이 있는지 확인한다',IC],['Q','검역(Quarantine)','병과 병해충','사람의 감염병, 동물의 병, 식물의 병해충을 나라에 들이지 않는다',QC]],['보는 것','목적'],'승객뿐 아니라 승무원·기내식·화물·항공기도 이 셋을 거칩니다.'],
 en:['CIQ: what three agencies look at at the border',[['C','Customs','Goods and money','Stop smuggling; collect duty and tax',CC],['I','Immigration','People','Confirm the right to enter or leave',IC],['Q','Quarantine','Disease and pests','Keep human infections, animal diseases and plant pests out',QC]],['Looks at','Purpose'],'Not only passengers: crew, catering, cargo and the aircraft pass all three.']};
function threeFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),r0=Math.max(24,FS(20)*1.0);
 var tw=Math.max(H.TW(d[2][0],11),H.TW(d[2][1],11))+16;
 d[1].forEach(function(r){var c=r[4],tx0=40+r0*2+18,w=600-(tx0-20)-16,h1=hgt(r[1],13.5,w),mw=w-tw-10,h2=Math.max(hgt(r[2],12,mw),FS(11)*1.5),h3=Math.max(hgt(r[3],12,mw),FS(11)*1.5),h=Math.max(h1+h2+h3+34,r0*2+24);
  s+=R(20,y,600,h,'#fff',12,' stroke="'+c+'" stroke-width="2.5"')+'<circle cx="'+(40+r0)+'" cy="'+(y+h/2)+'" r="'+r0+'" fill="'+c+'"/>'+tx(40+r0,y+h/2+FS(20)*0.35,r[0],20,'#fff',900)+TW2(tx0,y+10,r[1],13.5,c,900,w,'start');
  var yy=y+16+h1;[[d[2][0],r[2],h2,900],[d[2][1],r[3],h3,700]].forEach(function(v){s+=R(tx0,yy+(v[2]-FS(11)*1.5)/2,tw,FS(11)*1.5,'#EEF2F6',FS(11)*0.75)+tx(tx0+tw/2,yy+v[2]/2+FS(11)*0.35,v[0],11,G,800)+TW2(tx0+tw+10,yy+(v[2]-hgt(v[1],12,mw))/2,v[1],12,D,v[3],mw,'start');yy+=v[2]+6});y+=h+10});
 var b=BOX(y,d[3],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 0-2 到着と出発の流れ。行：[名前, 見られること, 色] */
var FLOW={
 ja:['到着と出発で通る順番（日本・韓国の一般的な例）','到着',[['検疫（人）','発熱などの症状',QC],['入国審査','旅券・査証・顔写真と指紋',IC],['手荷物の受け取り','',GY],['動物・植物の検疫','肉製品・果物・植物・ペット',QC],['税関','免税の範囲を超える物、禁止・制限されている物、多額の現金',CC]],'出発',[['チェックイン（航空会社）','旅券・査証・電子渡航認証の確認',NV],['保安検査','機内に持ち込めない物',GY],['税関（必要な人だけ）','高額な物の持ち出し、多額の現金',CC],['出国審査','旅券・在留の資格',IC],['搭乗口（航空会社）','搭乗券と旅券の照合',NV]],'窓口の配置は空港ごとに少し違います。'],
 ko:['도착과 출발 때 거치는 순서(일본·한국의 일반적인 예)','도착',[['검역(사람)','발열 등의 증상',QC],['입국 심사','여권·비자·얼굴 사진과 지문',IC],['수하물 찾기','',GY],['동물·식물 검역','육류·과일·식물·반려동물',QC],['세관','면세 범위를 넘는 물건, 금지·제한된 물건, 많은 현금',CC]],'출발',[['체크인(항공사)','여권·비자·전자여행허가 확인',NV],['보안 검색','기내에 가져갈 수 없는 물건',GY],['세관(필요한 사람만)','고가품 반출, 많은 현금',CC],['출국 심사','여권·체류 자격',IC],['탑승구(항공사)','탑승권과 여권 대조',NV]],'창구 배치는 공항마다 조금씩 다릅니다.'],
 en:['The order on arrival and departure (typical for Japan and Korea)','Arrival',[['Quarantine (people)','Fever and other symptoms',QC],['Immigration','Passport, visa, photograph and fingerprints',IC],['Baggage reclaim','',GY],['Animal and plant quarantine','Meat products, fruit, plants, pets',QC],['Customs','Goods over the allowance, prohibited or restricted goods, large amounts of cash',CC]],'Departure',[['Check-in (airline)','Passport, visa and travel authorisation checked',NV],['Security','Items not allowed in the cabin',GY],['Customs (only if needed)','Valuables taken out, large amounts of cash',CC],['Departure immigration','Passport, status of residence',IC],['Gate (airline)','Boarding pass checked against passport',NV]],'Layouts differ a little from airport to airport.']};
function flowFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),r0=Math.max(13,FS(12)*0.72);
 [[d[1],d[2]],[d[3],d[4]]].forEach(function(p){var hh=hgt(p[0],13,560)+14;s+=R(20,y,600,hh,NV,10)+TW2(320,y+7,p[0],13,'#fff',900,560);y+=hh+8;
  p[1].forEach(function(r,i){var c=r[2],tw=600-r0*2-56,h1=hgt(r[0],12.5,tw),h2=r[1]?hgt(r[1],11.5,tw):0,h=Math.max(h1+h2+(r[1]?20:16),r0*2+12);
   s+=R(20,y,600,h,'#fff',10,' stroke="'+c+'" stroke-width="2"')+R(20,y,8,h,c,4)+'<circle cx="'+(40+r0)+'" cy="'+(y+h/2)+'" r="'+r0+'" fill="'+c+'"/>'+tx(40+r0,y+h/2+FS(12)*0.35,String(i+1),12,'#fff',900)
    +TW2(52+r0*2,y+(r[1]?8:(h-h1)/2),r[0],12.5,c===GY?D:c,900,tw,'start')+(r[1]?TW2(52+r0*2,y+12+h1,r[1],11.5,D,700,tw,'start'):'');y+=h;
   if(i<p[1].length-1){s+=ARW(40+r0,y+2,40+r0,y+14,GY,3.5);y+=18}});y+=14});
 var hn=hgt(d[5],11.5,580);s+=TW2(320,y,d[5],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 1-1 搭乗券を渡す前の3つの問い。行：[問い, 見るもの, 色] */
var DOC={
 ja:['搭乗券を渡す前の、3つの問い',[['本人か','顔写真・年齢・性別が本人と合う。氏名が予約と同じ',IC],['旅券は有効か','到着の日に有効。行き先が求める残りの期間がある。傷みがない',QC],['条件に合うか','目的地と乗り継ぎ地の、査証・電子渡航認証・帰りの航空券',CC]],'3つとも「はい」なら、搭乗券を渡す','1つでも「いいえ」「分からない」なら、決める前に調べる・相談する'],
 ko:['탑승권을 건네기 전의 세 가지 질문',[['본인인가','얼굴 사진·나이·성별이 본인과 맞는다. 이름이 예약과 같다',IC],['여권은 유효한가','도착하는 날에 유효하다. 목적지가 요구하는 남은 기간이 있다. 훼손이 없다',QC],['조건에 맞는가','목적지와 환승지의 비자·전자여행허가·돌아오는 항공권',CC]],'셋 다 「예」이면 탑승권을 건넨다','하나라도 「아니오」 「모르겠다」이면, 정하기 전에 찾아보고 상의한다'],
 en:['Three questions before handing over a boarding pass',[['Is it theirs?','Photo, age and sex match the passenger. The name matches the booking',IC],['Is the passport valid?','Valid on the day of arrival, with the remaining period the destination requires, and undamaged',QC],['Does it meet the requirements?','Visa, travel authorisation and return ticket for the destination and every transit point',CC]],'Three times “yes”: hand over the boarding pass','Any “no” or “not sure”: look it up or ask before deciding']};
function docFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),r0=Math.max(15,FS(13)*0.8);
 d[1].forEach(function(r,i){var c=r[2],tw=600-r0*2-56,h1=hgt(r[0],13.5,tw),h2=hgt(r[1],12,tw),h=Math.max(h1+h2+24,r0*2+16);
  s+=R(20,y,600,h,'#fff',10,' stroke="'+c+'" stroke-width="2.5"')+'<circle cx="'+(40+r0)+'" cy="'+(y+h/2)+'" r="'+r0+'" fill="'+c+'"/>'+tx(40+r0,y+h/2+FS(13)*0.35,String(i+1),13,'#fff',900)+TW2(52+r0*2,y+9,r[0],13.5,c,900,tw,'start')+TW2(52+r0*2,y+13+h1,r[1],12,D,700,tw,'start');y+=h;
  if(i<d[1].length-1){s+=ARW(320,y+2,320,y+14,GY,3.5);y+=18}});
 y+=12;var b=BOX(y,d[2],'#E3F4EA','#14633F',12.5);s+=b[0];y+=b[1]+8;var b2=BOX(y,d[3],'#FFF3D6','#7A5A00',12);s+=b2[0];y+=b2[1]+16;return svg(y,s)}}

/* 1-3 査証・電子渡航認証・旅券だけの3つの段階。行：[段階, 説明, 色]。まん中を強調 */
var LEV={
 ja:['「査証が要る」と「何も要らない」の間',[['査証が要る','大使館などに申請する。日数がかかる',GY],['電子渡航認証が要る','査証は要らないが、渡航の前にオンラインで申請する。料金がかかる',CC],['旅券だけでよい','査証も認証も要らない',QC]],'増えている','同じ行き先でも、国籍によってどれになるかが変わります。'],
 ko:['「비자가 필요하다」와 「아무것도 필요 없다」의 사이',[['비자가 필요하다','대사관 등에 신청한다. 며칠이 걸린다',GY],['전자여행허가가 필요하다','비자는 필요 없지만 여행 전에 온라인으로 신청한다. 요금이 든다',CC],['여권만 있으면 된다','비자도 허가도 필요 없다',QC]],'늘고 있다','같은 목적지라도 국적에 따라 어느 쪽이 되는지가 달라집니다.'],
 en:['Between “a visa is needed” and “nothing is needed”',[['A visa is needed','Applied for at an embassy or consulate. Takes days',GY],['A travel authorisation is needed','No visa, but an online application before travel, with a fee',CC],['A passport is enough','No visa and no authorisation',QC]],'Growing','For the same destination, which one applies depends on nationality.']};
function levFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 d[1].forEach(function(r,i){var c=r[2],hot=i===1,tagw=hot?H.TW(d[2],11)+22:0,tw=560-(hot?tagw+10:0),h1=hgt(r[0],13.5,tw),h2=hgt(r[1],12,560),h=h1+h2+26;
  s+=R(20,y,600,h,hot?'#FFF6E8':'#fff',10,' stroke="'+c+'" stroke-width="'+(hot?4:2)+'"')+R(20,y,10,h,c,5)+TW2(42,y+10,r[0],13.5,c===GY?D:c,900,tw,'start')+(hot?R(600-tagw,y+10,tagw,FS(11)*1.7,c,FS(11)*0.85)+tx(600-tagw/2,y+10+FS(11)*1.2,d[2],11,'#fff',900):'')+TW2(42,y+14+h1,r[1],12,D,700,560,'start');y+=h+10});
 y+=4;var b=BOX(y,d[3],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

window.FIGS=window.FIGS||{};
window.FIGS.ciq_three=H.FIX2(threeFig(THREE));window.FIGS.ciq_flow=H.FIX2(flowFig(FLOW));
window.FIGS.ciq_doccheck=H.FIX2(docFig(DOC));window.FIGS.ciq_levels=H.FIX2(levFig(LEV));
})();
