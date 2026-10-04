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

window.FIGS=window.FIGS||{};
window.FIGS.ciq_three=H.FIX2(threeFig(THREE));window.FIGS.ciq_flow=H.FIX2(flowFig(FLOW));
})();
