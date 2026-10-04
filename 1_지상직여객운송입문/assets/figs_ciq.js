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

/* 2-2 免税の範囲：日本と韓国。行：[品目, 日本, 韓国]。2026年10月に確かめた内容 */
var ALW={
 ja:['免税の範囲 ― 日本と韓国（入国する人1人あたり）',['日本','韓国'],[['酒','3本（1本760ml）','合計2リットル以下で、400米ドル以下'],['たばこ','紙巻200本（葉巻50本、加熱式は個装等10箱）','紙巻200本（葉巻50本、ニコチン液20ml）'],['香水','2オンス（約56ml）','100ml'],['そのほかの品物','海外での価格の合計 20万円まで','800米ドルまで']],'未成年の人には、酒とたばこの免税がありません。2026年10月に確かめた内容です。'],
 ko:['면세 범위 — 일본과 한국(입국하는 사람 1명당)',['일본','한국'],[['술','3병(1병 760ml)','합계 2리터 이하이면서 400달러 이하'],['담배','궐련 200개비(시가 50개비, 가열식은 개별 포장 등 10갑)','궐련 200개비(시가 50개비, 니코틴 용액 20ml)'],['향수','2온스(약 56ml)','100ml'],['그 밖의 물건','해외 가격 합계 20만 엔까지','800달러까지']],'미성년자에게는 술과 담배의 면세가 없습니다. 2026년 10월에 확인한 내용입니다.'],
 en:['Duty-free allowances in Japan and Korea (per person entering)',['Japan','Korea'],[['Alcohol','Three bottles (760 ml each)','Up to two litres in total and up to USD 400'],['Tobacco','200 cigarettes (50 cigars; 10 packs of heated tobacco)','200 cigarettes (50 cigars; 20 ml of nicotine liquid)'],['Perfume','Two ounces (about 56 ml)','100 ml'],['Other goods','Up to 200,000 yen in total overseas value','Up to USD 800']],'Minors have no alcohol or tobacco allowance. Confirmed in October 2026.']};
function alwFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),C2=[NV,'#1F7A6E'],hh=hgt(d[1][0],13,270)+12;
 [0,1].forEach(function(i){s+=R(20+i*310,y,290,hh,C2[i],8)+TW2(165+i*310,y+6,d[1][i],13,'#fff',900,270)});y+=hh+8;
 d[2].forEach(function(r){var hl=hgt(r[0],12.5,560)+10,h=Math.max(hgt(r[1],12,262),hgt(r[2],12,262))+18;
  s+=R(20,y,600,hl,'#FFF1DE',6)+TW2(320,y+5,r[0],12.5,'#8A4B00',900,560);y+=hl+4;
  [0,1].forEach(function(i){s+=R(20+i*310,y,290,h,'#fff',8,' stroke="'+C2[i]+'" stroke-width="2"')+TW2(165+i*310,y+9,r[1+i],12,D,800,262)});y+=h+10});
 var b=BOX(y,d[3],'#EEF4FA',NV,11.5);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 3-2 食べ物を3つに分ける。行：[区分, 例, 色]。赤=持ち込めない、黄=証明書と検査、緑=申告して確かめる */
var FOOD={
 ja:['食べ物を3つに分けて考える（日本・韓国に入るとき）',[['持ち込めない','肉、ハム・ソーセージ・ジャーキー、肉まん・餃子、肉の入った即席食品、機内食の残り、土のついた植物','#C2344F'],['証明書と検査が要る','生の果物・野菜、穀類・豆、種・苗・球根、切り花。輸出した国の政府の証明書がなければ持ち込めない','#B7791F'],['申告して確かめる','乳製品、ドライフルーツ、香辛料、お茶や加工した食品。国と品目で扱いが変わる',QC]],'迷ったら、申告する。申告すれば、持ち込めない物は捨てるだけで済みます。'],
 ko:['음식을 셋으로 나눠 생각한다(일본·한국에 들어갈 때)',[['가져올 수 없다','고기, 햄·소시지·육포, 고기만두·교자, 고기가 든 즉석식품, 남은 기내식, 흙이 묻은 식물','#C2344F'],['증명서와 검사가 필요하다','생과일·채소, 곡류·콩, 씨앗·모종·알뿌리, 꺾은 꽃. 수출한 나라 정부의 증명서가 없으면 가져올 수 없다','#B7791F'],['신고해서 확인한다','유제품, 건조 과일, 향신료, 차와 가공한 식품. 나라와 품목에 따라 취급이 달라진다',QC]],'망설여지면 신고한다. 신고하면 가져올 수 없는 물건은 버리는 것으로 끝납니다.'],
 en:['Think of food in three groups (entering Japan or Korea)',[['Cannot be brought in','Meat; ham, sausages and jerky; meat buns and dumplings; instant foods containing meat; leftover in-flight meals; plants with soil','#C2344F'],['Needs a certificate and inspection','Fresh fruit and vegetables; grains and beans; seeds, seedlings and bulbs; cut flowers. Not allowed without a certificate from the exporting country’s government','#B7791F'],['Declare and check','Dairy products, dried fruit, spices, tea and processed foods. Treatment depends on the country and the item',QC]],'If in doubt, declare. Declared items that cannot be brought in are simply surrendered.']};
function foodFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 d[1].forEach(function(r){var c=r[2],h1=hgt(r[0],13.5,560)+14,h2=hgt(r[1],12,560),h=h1+h2+22;
  s+=R(20,y,600,h,'#fff',10,' stroke="'+c+'" stroke-width="2.5"')+R(20,y,600,h1,c,10)+TW2(36,y+7,r[0],13.5,'#fff',900,560,'start')+TW2(36,y+h1+10,r[1],12,D,700,560,'start');y+=h+10});
 y+=4;var b=BOX(y,d[2],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 3-4 日本に犬・猫を連れて入る順番（指定地域以外）。行：[すること, いつ・条件, 色]。5番目（180日の待機）を強調 */
var PET={
 ja:['日本に犬・猫を連れて入る ― 到着の日から逆に数える（指定地域以外）',[['マイクロチップを入れる','いちばん初めに',IC],['狂犬病の予防注射 1回目','マイクロチップのあとで',IC],['狂犬病の予防注射 2回目','1回目から間をあけて',IC],['採血して、抗体を検査する','0.5IU/ml以上',QC],['180日、待つ','採血の日から数える',CC],['届け出る','到着の40日前までに',QC],['到着して、検査を受ける','条件を満たせば12時間以内',NV]],'準備には7か月以上かかります。条件を満たさないと、到着のあと最長180日、検疫の施設で預かられます。'],
 ko:['일본에 개·고양이를 데리고 들어간다 — 도착일부터 거꾸로 센다(지정 지역 외)',[['마이크로칩을 이식한다','가장 먼저',IC],['광견병 예방 주사 1회째','마이크로칩 다음에',IC],['광견병 예방 주사 2회째','1회째와 간격을 두고',IC],['채혈해서 항체를 검사한다','0.5IU/ml 이상',QC],['180일 기다린다','채혈한 날부터 센다',CC],['신고한다','도착 40일 전까지',QC],['도착해서 검사를 받는다','조건을 충족하면 12시간 이내',NV]],'준비에 7개월 이상 걸립니다. 조건을 충족하지 못하면 도착한 뒤 최장 180일 동안 검역 시설에 맡겨집니다.'],
 en:['Bringing a dog or cat into Japan: count back from the arrival date (non-designated regions)',[['Implant a microchip','First of all',IC],['First rabies vaccination','After the microchip',IC],['Second rabies vaccination','After an interval from the first',IC],['Blood sample and antibody test','0.5 IU/ml or more',QC],['Wait 180 days','Counted from the date of the blood sample',CC],['Give advance notification','At least 40 days before arrival',QC],['Arrive and be inspected','Within 12 hours if the conditions are met',NV]],'Preparation takes more than seven months. If the conditions are not met, the animal is held at a quarantine facility for up to 180 days after arrival.']};
function petFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),r0=Math.max(13,FS(12)*0.72);
 d[1].forEach(function(r,i){var c=r[2],hot=i===4,tw=600-r0*2-56,h1=hgt(r[0],12.5,tw),h2=hgt(r[1],11.5,tw),h=Math.max(h1+h2+20,r0*2+12);
  s+=R(20,y,600,h,hot?'#FFF6E8':'#fff',10,' stroke="'+c+'" stroke-width="'+(hot?4:2)+'"')+'<circle cx="'+(40+r0)+'" cy="'+(y+h/2)+'" r="'+r0+'" fill="'+c+'"/>'+tx(40+r0,y+h/2+FS(12)*0.35,String(i+1),12,'#fff',900)+TW2(52+r0*2,y+8,r[0],12.5,c,900,tw,'start')+TW2(52+r0*2,y+12+h1,r[1],11.5,D,700,tw,'start');y+=h;
  if(i<d[1].length-1){s+=ARW(40+r0,y+2,40+r0,y+14,GY,3.5);y+=18}});
 y+=12;var b=BOX(y,d[2],'#FFF3D6','#7A5A00',12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 4-2 米国：食べ物を申告する人と、しない人。行：[申告する, 申告しない]。左=緑、右=赤 */
var USD={
 ja:['米国に入るとき ― 食べ物を持っていたら',['申告する','申告しない'],[['係官が中身を見る','検査や探知犬で見つかる'],['持ち込める物は、そのまま持って入る','品物は没収される'],['持ち込めない物は、その場で手放す。罰はない','罰金。初めて300ドル、2回目500ドル']],'肉、果物、野菜、種、機内で配られた果物も「食べ物」です。迷ったら「はい」と答えます。'],
 ko:['미국에 들어갈 때 — 음식을 가지고 있다면',['신고한다','신고하지 않는다'],[['직원이 내용을 본다','검사나 탐지견에게 발견된다'],['가져올 수 있는 것은 그대로 가지고 들어간다','물건은 몰수된다'],['가져올 수 없는 것은 그 자리에서 내놓는다. 벌칙은 없다','벌금. 처음 300달러, 두 번째 500달러']],'고기, 과일, 채소, 씨앗, 기내에서 나눠 준 과일도 「음식」입니다. 망설여지면 「예」라고 답합니다.'],
 en:['Entering the United States with food',['Declare','Do not declare'],[['An officer looks at it','Found by inspection or a detector dog'],['What is allowed goes in with you','The item is confiscated'],['What is not allowed is surrendered on the spot. No penalty','A fine: USD 300 the first time, USD 500 the second']],'Meat, fruit, vegetables, seeds and fruit handed out on board are all food. If in doubt, answer “yes”.']};
function usFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),C2=[QC,'#C2344F'],hh=Math.max(hgt(d[1][0],13,270),hgt(d[1][1],13,270))+14;
 [0,1].forEach(function(i){s+=R(20+i*310,y,290,hh,C2[i],8)+TW2(165+i*310,y+7,d[1][i],13,'#fff',900,270)});y+=hh;
 d[2].forEach(function(r,j){[0,1].forEach(function(i){s+=ARW(165+i*310,y+2,165+i*310,y+14,C2[i],3.5)});y+=18;
  var h=Math.max(hgt(r[0],12,262),hgt(r[1],12,262))+18,last=j===d[2].length-1;
  [0,1].forEach(function(i){s+=R(20+i*310,y,290,h,last?(i?'#FDECEF':'#E3F4EA'):'#fff',8,' stroke="'+C2[i]+'" stroke-width="'+(last?3:2)+'"')+TW2(165+i*310,y+9,r[i],12,D,last?900:700,262)});y+=h});
 y+=14;var b=BOX(y,d[3],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 4-6 食べ物・動植物を申告しなかったときの罰（国ごと）。行：[国, 罰]。2026年10月に確かめた内容 */
var FINE={
 ja:['食べ物・動植物を申告しなかったときの罰',[['日本','3年以下の拘禁刑、または300万円以下の罰金'],['韓国','過料 最高1,000万ウォン'],['米国','罰金 初めて300ドル、2回目500ドル（最高1,000ドル）'],['カナダ','過料 最高1,300カナダドル'],['英国','重い場合、最高5,000ポンドの罰金'],['オーストラリア','過料 最高6,600豪ドル。査証の取り消しも'],['ニュージーランド','過料 400NZドル（その場で）']],'どの国でも、申告した人は罰を受けません。2026年10月に確かめた内容です。'],
 ko:['음식·동식물을 신고하지 않았을 때의 벌칙',[['일본','3년 이하의 구금형 또는 300만 엔 이하의 벌금'],['한국','과태료 최고 1,000만 원'],['미국','벌금 처음 300달러, 두 번째 500달러(최고 1,000달러)'],['캐나다','과태료 최고 1,300캐나다달러'],['영국','심한 경우 최고 5,000파운드의 벌금'],['호주','과태료 최고 6,600호주달러. 비자 취소도'],['뉴질랜드','과태료 400뉴질랜드달러(그 자리에서)']],'어느 나라든 신고한 사람은 벌을 받지 않습니다. 2026년 10월에 확인한 내용입니다.'],
 en:['Penalties for not declaring food, animals or plants',[['Japan','Imprisonment for up to three years, or a fine of up to 3 million yen'],['Korea','An administrative fine of up to KRW 10 million'],['United States','A fine of USD 300 the first time, USD 500 the second (up to USD 1,000)'],['Canada','A penalty of up to CAD 1,300'],['United Kingdom','In serious cases, a fine of up to GBP 5,000'],['Australia','An infringement notice of up to AUD 6,600, and possible visa cancellation'],['New Zealand','An instant fine of NZD 400']],'In every country, those who declare are not penalised. Confirmed in October 2026.']};
function fineFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 d[1].forEach(function(r,i){var h1=hgt(r[0],13,548),h2=hgt(r[1],12,548),h=h1+h2+22;
  s+=R(20,y,600,h,i%2?'#fff':'#FBF6F0',10,' stroke="#E2D5C6" stroke-width="1.5"')+R(20,y,8,h,CC,4)+TW2(42,y+8,r[0],13,NV,900,548,'start')+TW2(42,y+12+h1,r[1],12,D,700,548,'start');y+=h+6});
 y+=8;var b=BOX(y,d[2],'#E3F4EA','#14633F',12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 5-4 予定していない空港に着いたとき。[題, まずすること, [場合, すること, 色]×3, 注意] */
var DIV={
 ja:['国際線が、予定していない空港に着いたとき','まず連絡する：税関・出入国・検疫・空港の運営者',[['CIQのある空港','当局の指示に従う。入国して降りるか、機内で待って再出発するかを決める',QC],['CIQのない空港','原則として機内で待つ。係官が来るか、CIQのある空港へ向かうかを、当局と決める',CC],['急病人がいる','人命が先。救急を呼ぶのと同時に、当局へ知らせる','#C2344F']],'当局の指示があるまで、人も、手荷物も、機内食も、ごみも降ろしません。'],
 ko:['국제선이 예정에 없던 공항에 도착했을 때','먼저 연락한다: 세관·출입국·검역·공항 운영자',[['CIQ가 있는 공항','당국의 지시를 따른다. 입국해서 내릴지, 기내에서 기다렸다가 재출발할지를 정한다',QC],['CIQ가 없는 공항','원칙적으로 기내에서 기다린다. 직원이 올지, CIQ가 있는 공항으로 갈지를 당국과 정한다',CC],['응급 환자가 있다','인명이 먼저. 구급을 부르는 것과 동시에 당국에 알린다','#C2344F']],'당국의 지시가 있을 때까지 사람도, 수하물도, 기내식도, 쓰레기도 내리지 않습니다.'],
 en:['When an international flight arrives at an unplanned airport','First, contact customs, immigration, quarantine and the airport operator',[['An airport with CIQ','Follow the authorities’ instructions. Decide whether passengers enter and disembark, or wait on board and continue',QC],['An airport without CIQ','In principle, wait on board. Decide with the authorities whether officers will come or the flight will go to an airport with CIQ',CC],['A medical emergency','Life comes first. Call the emergency services and inform the authorities at the same time','#C2344F']],'Until the authorities give instructions, nothing leaves the aircraft: not passengers, bags, catering or waste.']};
function divFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),h0=hgt(d[1],13,560)+20;
 s+=R(20,y,600,h0,NV,10)+TW2(320,y+10,d[1],13,'#fff',900,560);y+=h0;s+=ARW(320,y+2,320,y+16,GY,3.5);y+=22;
 d[2].forEach(function(r){var c=r[2],h1=hgt(r[0],13,560)+14,h2=hgt(r[1],12,560),h=h1+h2+22;
  s+=R(20,y,600,h,'#fff',10,' stroke="'+c+'" stroke-width="2.5"')+R(20,y,600,h1,c,10)+TW2(36,y+7,r[0],13,'#fff',900,560,'start')+TW2(36,y+h1+10,r[1],12,D,700,560,'start');y+=h+10});
 y+=4;var b=BOX(y,d[3],'#FFF3D6','#7A5A00',12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

window.FIGS=window.FIGS||{};
window.FIGS.ciq_three=H.FIX2(threeFig(THREE));window.FIGS.ciq_flow=H.FIX2(flowFig(FLOW));
window.FIGS.ciq_doccheck=H.FIX2(docFig(DOC));window.FIGS.ciq_levels=H.FIX2(levFig(LEV));window.FIGS.ciq_allow=H.FIX2(alwFig(ALW));window.FIGS.ciq_food=H.FIX2(foodFig(FOOD));window.FIGS.ciq_pet=H.FIX2(petFig(PET));window.FIGS.ciq_us=H.FIX2(usFig(USD));window.FIGS.ciq_fines=H.FIX2(fineFig(FINE));window.FIGS.ciq_divert=H.FIX2(divFig(DIV));
})();
