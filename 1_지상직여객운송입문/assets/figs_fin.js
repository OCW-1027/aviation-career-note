/* 財務3表の実務（FIN）の図（2026.10）— figs.js の後に読み込み、window.FIGS に追加する。色の約束：損益計算書=青、貸借対照表=緑、キャッシュフロー=橙 */
(function(){
var D='#243447',PL='#2F8FE0',BS='#1F7A6E',CF='#E08A2F',G='#8A96A3',Y='#D4A72C',R='#C2344F';
function Rc(x,y,w,h,f,rx,ex){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+f+'"'+(ex||'')+'/>'}
function tx(x,y,s,sz,c,w,a){return '<text x="'+x+'" y="'+y+'" font-size="'+(sz||14)+'" font-weight="'+(w||700)+'" fill="'+(c||D)+'" text-anchor="'+(a||'middle')+'" font-family="Arial,Helvetica,sans-serif">'+s+'</text>'}
function arrow(x1,y1,x2,y2,c,d){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||G)+'" stroke-width="3" marker-end="url(#fa)"'+(d?' stroke-dasharray="6 5"':'')+'/>'}
var DEFS='<defs><marker id="fa" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#8A96A3"/></marker></defs>';
function L(lang,ja,ko,en){return lang==='ko'?ko:lang==='en'?en:ja}
window.FIGS=window.FIGS||{};
var F={
/* 0-1 会社のお金はどこから来てどこへ行くか：資金の入口 → 会社 → 資産 → 売上 → 費用 → 利益 → 返す・残す */
fin_flow:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" role="img">'+DEFS+Rc(0,0,900,420,'#F7FAFD');
 var t={inv:L(lang,'出資（株主）','출자(주주)','Owners’ capital'),loan:L(lang,'借入（銀行）','차입(은행)','Loans (bank)'),co:L(lang,'会社','회사','Company'),
  asset:L(lang,'資産に使う','자산에 쓴다','Buys assets'),a1:L(lang,'機材・設備・在庫','설비·장비·재고','Equipment, stock'),sell:L(lang,'売上','매출','Sales'),cost:L(lang,'費用','비용','Costs'),profit:L(lang,'利益','이익','Profit'),
  back:L(lang,'返す・配る','갚는다·배당','Repay, pay out'),keep:L(lang,'会社に残す','회사에 남긴다','Kept in the company'),
  bs:L(lang,'貸借対照表：どこから来て、何に使ったか','재무상태표: 어디서 와서 무엇에 썼나','Balance sheet: where it came from, what it became'),
  pl:L(lang,'損益計算書：いくら稼いで、いくら残ったか','손익계산서: 얼마 벌어 얼마 남겼나','Income statement: earned and kept'),
  cf:L(lang,'キャッシュフロー計算書：現金の出入り','현금흐름표: 현금의 출입','Cash flow: money in and out')};
 s+=Rc(30,60,170,54,'#E6F0FA',10)+tx(115,92,t.inv,14,BS)+Rc(30,130,170,54,'#E6F0FA',10)+tx(115,162,t.loan,14,BS);
 s+='<g><circle cx="330" cy="122" r="56" fill="#fff" stroke="'+D+'" stroke-width="4"/>'+tx(330,128,t.co,18,D,800)+'<animate attributeName="opacity" values="0.6;1;1;0.6" dur="4s" repeatCount="indefinite"/></g>';
 s+=arrow(200,87,272,110,BS)+arrow(200,157,272,134,BS);
 s+=Rc(440,70,180,54,'#E8F3F0',10)+tx(530,96,t.asset,14,BS)+tx(530,114,t.a1,11,G,500);
 s+=arrow(386,110,440,97,BS);
 s+=Rc(670,70,190,54,'#E6F0FA',10)+tx(765,103,t.sell,16,PL)+arrow(620,97,670,97,PL);
 s+=Rc(670,160,190,54,'#FFF1E6',10)+tx(765,193,t.cost,16,R)+arrow(765,124,765,160,R);
 s+=Rc(670,250,190,54,'#E6F0FA',10)+tx(765,283,t.profit,16,PL)+arrow(765,214,765,250,PL);
 s+=Rc(440,250,180,54,'#F3F6FA',10)+tx(530,283,t.back,14,D)+arrow(670,277,620,277,CF);
 s+=Rc(440,320,180,54,'#E8F3F0',10)+tx(530,353,t.keep,14,BS)+'<path d="M765,304 C765,350 650,347 620,347" fill="none" stroke="'+BS+'" stroke-width="3" marker-end="url(#fa)"/>';
 s+='<path d="M440,277 C300,277 330,200 330,178" fill="none" stroke="'+CF+'" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#fa)"/>';
 /* moving coin along the loop */
 s+='<circle r="7" fill="'+Y+'" stroke="#fff" stroke-width="2"><animateMotion dur="7s" repeatCount="indefinite" path="M115,122 L330,122 L530,97 L765,97 L765,277 L530,277 L330,178"/></circle>';
 s+=tx(450,398,'■ '+t.bs,12,BS,600,'start')+tx(450,414,'■ '+t.pl,12,PL,600,'start')+tx(30,398,'■ '+t.cf,12,CF,600,'start');
 return s+'</svg>'},
/* 0-2 3つの表の役割：成績表・写真・通帳 */
fin_three:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img">'+Rc(0,0,900,360,'#F7FAFD');
 var c=[[PL,L(lang,'損益計算書','손익계산서','Income statement'),L(lang,'1年の成績表','1년의 성적표','A year’s report card'),L(lang,'期間：4月1日〜3月31日','기간: 4월 1일~3월 31일','Period: 1 Apr – 31 Mar'),L(lang,'売上 − 費用 ＝ 利益','매출 − 비용 = 이익','Sales − costs = profit')],
  [BS,L(lang,'貸借対照表','재무상태표','Balance sheet'),L(lang,'決算日の写真','결산일의 사진','A photo on closing day'),L(lang,'時点：3月31日','시점: 3월 31일','Point in time: 31 Mar'),L(lang,'資産 ＝ 負債 ＋ 純資産','자산 = 부채 + 자본','Assets = liabilities + equity')],
  [CF,L(lang,'キャッシュフロー計算書','현금흐름표','Cash flow statement'),L(lang,'1年の通帳','1년의 통장','A year’s bankbook'),L(lang,'期間：4月1日〜3月31日','기간: 4월 1일~3월 31일','Period: 1 Apr – 31 Mar'),L(lang,'入った現金 − 出た現金','들어온 현금 − 나간 현금','Cash in − cash out')]];
 c.forEach(function(v,i){var x=30+i*290;s+='<g>'+Rc(x,40,260,280,'#fff',16,' stroke="'+v[0]+'" stroke-width="4"')+Rc(x,40,260,60,v[0],16)+Rc(x,80,260,20,v[0])+tx(x+130,78,v[1],17,'#fff',800);
  if(i===0){s+=Rc(x+40,130,180,110,'#E6F0FA',8);[0,1,2,3].forEach(function(k){s+=Rc(x+58,146+k*22,100,10,'#fff',3)+Rc(x+170,146+k*22,[40,30,20,36][k],10,[PL,PL,R,PL][k],3)})}
  if(i===1){s+=Rc(x+40,130,180,110,'#E8F3F0',8)+Rc(x+56,142,70,86,BS,4)+Rc(x+134,142,70,40,'#8FC7BB',4)+Rc(x+134,188,70,40,D,4)}
  if(i===2){s+=Rc(x+40,130,180,110,'#FFF1E6',8);[0,1,2,3].forEach(function(k){s+=Rc(x+58,146+k*22,160,10,'#fff',3)+tx(x+200,155+k*22,['+','−','+','−'][k],12,[BS,R,BS,R][k],800)})}
  s+=tx(x+130,266,v[2],16,D,800)+tx(x+130,288,v[3],12,G,500)+tx(x+130,310,v[4],13,v[0],700)+'<animate attributeName="opacity" values="0.4;1;1;1;0.4" keyTimes="0;'+(0.1+i*0.25)+';'+(0.2+i*0.25)+';0.9;1" dur="6s" repeatCount="indefinite"/></g>'});
 return s+'</svg>'},
/* 0-3 たい焼き屋の1か月：3つの表がどこでつながるか */
fin_taiyaki:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+DEFS+Rc(0,0,900,400,'#F7FAFD');
 var yen=L(lang,'円','엔','yen');
 var pl=[[L(lang,'売上','매출','Sales'),'260,000'],[L(lang,'材料費','재료비','Ingredients'),'−75,000'],[L(lang,'家賃・人件費・光熱費','임대료·인건비·수도광열','Rent, wages, utilities'),'−100,000'],[L(lang,'減価償却費','감가상각비','Depreciation'),'−4,000'],[L(lang,'利息・税金','이자·세금','Interest, tax'),'−17,000'],[L(lang,'当期純利益','당기순이익','Net profit'),'64,000']];
 var bs=[[L(lang,'現金','현금','Cash'),'309,000'],[L(lang,'売掛金・材料','외상·재료','Receivable, stock'),'35,000'],[L(lang,'屋台（償却後）','포장마차(상각 후)','Cart (net)'),'236,000'],[L(lang,'借入・未払税金','차입·미지급 세금','Loan, tax payable'),'216,000'],[L(lang,'資本金','자본금','Capital'),'300,000'],[L(lang,'利益剰余金','이익잉여금','Retained earnings'),'64,000']];
 var cf=[[L(lang,'営業活動','영업활동','Operating'),'+49,000'],[L(lang,'投資活動（屋台）','투자활동(포장마차)','Investing (cart)'),'−240,000'],[L(lang,'財務活動（出資・借入）','재무활동(출자·차입)','Financing'),'+500,000'],[L(lang,'期末の現金','기말 현금','Closing cash'),'309,000']];
 function box(x,title,col,rows,hl){s+=Rc(x,40,270,330,'#fff',14,' stroke="'+col+'" stroke-width="3"')+Rc(x,40,270,44,col,14)+Rc(x,70,270,14,col)+tx(x+135,69,title,15,'#fff',800);
  rows.forEach(function(r,i){var y=112+i*40,b=(hl.indexOf(i)>=0);if(b)s+=Rc(x+10,y-18,250,30,'#FFF4D6',6);s+=tx(x+20,y+2,r[0],12.5,D,b?800:500,'start')+tx(x+255,y+2,r[1],13,b?D:G,b?800:600,'end')})}
 box(20,L(lang,'損益計算書（1か月）','손익계산서(한 달)','Income statement (1 month)'),PL,pl,[5]);
 box(315,L(lang,'貸借対照表（月末）','재무상태표(월말)','Balance sheet (month end)'),BS,bs,[0,5]);
 box(610,L(lang,'キャッシュフロー（1か月）','현금흐름표(한 달)','Cash flow (1 month)'),CF,cf,[3]);
 /* link 1: net profit -> retained earnings */
 s+='<path d="M290,314 C330,314 300,314 325,314" fill="none" stroke="'+PL+'" stroke-width="3" marker-end="url(#fa)"><animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite"/></path>';
 /* link 2: closing cash -> BS cash */
 s+='<path d="M620,234 C560,234 560,114 595,114" fill="none" stroke="'+CF+'" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#fa)"><animate attributeName="opacity" values="0;0;1;1;0" dur="5s" repeatCount="indefinite"/></path>';
 s+=tx(450,392,L(lang,'利益 64,000'+yen+' は純資産に、期末の現金 309,000'+yen+' は資産に ― 同じ数字が2つの表に現れる','이익 64,000'+yen+'은 자본으로, 기말 현금 309,000'+yen+'은 자산으로 — 같은 숫자가 두 표에 나타난다','Profit 64,000 '+yen+' lands in equity; closing cash 309,000 '+yen+' lands in assets: the same numbers appear in two statements'),12,D,600);
 return s+'</svg>'},
/* 1-2 五つの利益の滝：たい焼き屋の1か月（売上 → 売上総利益 → 営業利益 → 経常利益 → 税引前利益 → 当期純利益） */
fin_waterfall:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+Rc(0,0,900,400,'#F7FAFD');
 var steps=[[L(lang,'売上','매출','Sales'),260000,'t',PL],[L(lang,'材料費','재료비','Ingredients'),-75000,'d',R],[L(lang,'売上総利益','매출총이익','Gross profit'),185000,'t',PL],
  [L(lang,'家賃・人件費など','임대료·인건비 등','Rent, wages etc.'),-104000,'d',R],[L(lang,'営業利益','영업이익','Operating profit'),81000,'t',PL],[L(lang,'支払利息','이자 비용','Interest'),-1000,'d',R],
  [L(lang,'経常利益','경상이익','Ordinary profit'),80000,'t',PL],[L(lang,'税金','세금','Tax'),-16000,'d',R],[L(lang,'当期純利益','당기순이익','Net profit'),64000,'t',BS]];
 var x0=40,w=78,gap=16,base=330,scale=260/260000,run=0;
 steps.forEach(function(st,i){var x=x0+i*(w+gap),h,y;
  if(st[2]==='t'){run=st[1];h=run*scale;y=base-h;s+=Rc(x,y,w,h,st[3],6)+tx(x+w/2,y-8,st[1].toLocaleString('ja-JP'),12,D,800)}
  else{var top=run;run=run+st[1];h=-st[1]*scale;y=base-top*scale;s+=Rc(x,y,w,h,st[3],6)+tx(x+w/2,y-8,'−'+(-st[1]).toLocaleString('ja-JP'),12,R,800);
   s+='<line x1="'+(x-gap)+'" y1="'+(base-top*scale)+'" x2="'+x+'" y2="'+(base-top*scale)+'" stroke="'+G+'" stroke-dasharray="3 3"/>'}
  s+='<g><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(i/9*0.6).toFixed(2)+';'+((i+1)/9*0.6).toFixed(2)+';1" dur="6s" repeatCount="indefinite"/>'+Rc(x,y,w,h,'#fff',6,' opacity="0"')+'</g>';
  s+=tx(x+w/2,base+18,st[0],11,D,st[2]==='t'?800:500)});
 s+='<line x1="30" y1="'+base+'" x2="870" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=tx(450,375,L(lang,'たい焼き屋の1か月（円）。青＝残った利益、赤＝引かれた費用。段ごとに「どんな費用を引いた後か」が変わる','붕어빵 가게의 한 달(엔). 파랑 = 남은 이익, 빨강 = 빼는 비용. 단마다 「어떤 비용을 뺀 뒤인가」가 달라진다','Taiyaki stall, one month (yen). Blue = profit remaining, red = costs deducted. Each step shows profit after a different set of costs'),12,D,600);
 return s+'</svg>'},
/* 1-3 業種で違う「原価」：小売・製造・航空 */
fin_cost_types:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" role="img">'+Rc(0,0,900,340,'#F7FAFD');
 var cols=[[L(lang,'たい焼き屋（小売・飲食）','붕어빵 가게(소매·음식)','Taiyaki stall (retail)'),[[L(lang,'材料費','재료비','Ingredients'),29,R],[L(lang,'家賃・人件費・光熱費','임대료·인건비·수도광열','Rent, wages, utilities'),38,CF],[L(lang,'減価償却','감가상각','Depreciation'),2,G],[L(lang,'利益','이익','Profit'),31,PL]]],
  [L(lang,'製造業（工場）','제조업(공장)','Manufacturer'),[[L(lang,'材料・工場の人件費・設備','재료·공장 인건비·설비','Materials, factory labour, plant'),70,R],[L(lang,'販売費・本社','판매비·본사','Selling and admin'),20,CF],[L(lang,'利益','이익','Profit'),10,PL]]],
  [L(lang,'航空会社','항공사','Airline'),[[L(lang,'燃油','연료','Fuel'),23,R],[L(lang,'人件費','인건비','Staff'),17,R],[L(lang,'整備・ハンドリング・空港','정비·조업·공항','Maintenance, handling, airports'),27,R],[L(lang,'減価償却・賃借','감가상각·임차','Depreciation, leases'),14,G],[L(lang,'販売・その他','판매·기타','Sales, other'),13,CF],[L(lang,'利益','이익','Profit'),6,PL]]]];
 cols.forEach(function(c,i){var x=40+i*290;s+=tx(x+120,40,c[0],14,D,800);var y=60;c[1].forEach(function(seg){var h=seg[1]*2.2;s+=Rc(x,y,240,h,seg[2],3)+'<rect x="'+x+'" y="'+y+'" width="240" height="'+h+'" fill="#fff" opacity="0.08"/>';if(h>=16)s+=tx(x+120,y+h/2+4,seg[0]+' '+seg[1]+'%',11,'#fff',700);y+=h+2})});
 s+=tx(450,322,L(lang,'売上を100としたときの構成（概念図）。航空会社は「原価」と「販管費」の線を引かず、費用を項目で並べる会社が多い','매출을 100으로 본 구성(개념도). 항공사는 「원가」와 「판관비」 선을 긋지 않고 비용을 항목으로 나열하는 회사가 많다','Share of sales = 100 (conceptual). Many airlines list costs by item rather than splitting cost of sales from overheads'),12,D,600);
 return s+'</svg>'},
/* 2-1 貸借対照表のブロック：たい焼き屋の月末。左＝資産、右＝負債＋純資産。高さが金額 */
fin_bs_blocks:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+Rc(0,0,900,400,'#F7FAFD');
 var yen=L(lang,'円','엔','yen');
 var A=[[L(lang,'現金','현금','Cash'),309000,PL],[L(lang,'売掛金','매출채권','Receivable'),20000,'#7FB6E8'],[L(lang,'材料（在庫）','재료(재고)','Stock'),15000,'#A9CBE8'],[L(lang,'屋台（償却後）','포장마차(상각 후)','Cart (net)'),236000,BS]];
 var B=[[L(lang,'借入金','차입금','Loan'),200000,R],[L(lang,'未払税金','미지급 세금','Tax payable'),16000,'#E08A8A'],[L(lang,'資本金','자본금','Capital'),300000,D],[L(lang,'利益剰余金','이익잉여금','Retained earnings'),64000,'#5A6E85']];
 var tot=580000,H=280,base=330,sc=H/tot;
 function col(x,items,title){var y=base;s+=tx(x+110,40,title,15,D,800);items.forEach(function(it,i){var h=it[1]*sc;y-=h;s+='<g>'+Rc(x,y,220,h-2,it[2],4)+(h>22?tx(x+110,y+h/2+5,it[0]+'  '+it[1].toLocaleString('ja-JP'),12,'#fff',700):tx(x+230,y+h/2+4,it[0]+' '+it[1].toLocaleString('ja-JP'),11,D,600,'start'))+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(i*0.12).toFixed(2)+';'+(i*0.12+0.1).toFixed(2)+';1" dur="5s" repeatCount="indefinite"/></g>'})}
 col(120,A,L(lang,'資産（何を持っているか）','자산(무엇을 갖고 있나)','Assets (what we hold)'));col(560,B,L(lang,'負債＋純資産（どこから来たか）','부채+자본(어디서 왔나)','Liabilities + equity (where it came from)'));
 s+='<line x1="60" y1="'+base+'" x2="840" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>'+tx(450,200,'＝',40,D,800);
 s+=tx(230,base+22,'580,000 '+yen,14,D,800)+tx(670,base+22,'580,000 '+yen,14,D,800);
 s+=tx(450,380,L(lang,'左右の高さは必ず同じになる。右の負債は返す義務、純資産は返さなくてよい自分の分','좌우의 높이는 반드시 같아진다. 오른쪽 부채는 갚을 의무, 자본은 갚지 않아도 되는 내 몫','The two sides are always the same height: liabilities must be repaid, equity need not be'),12,D,600);
 return s+'</svg>'},
/* 2-3 減価償却：屋台240,000円が60か月で費用になる。残高の線と毎月の費用 */
fin_depreciation:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img">'+Rc(0,0,900,360,'#F7FAFD');
 var x0=80,x1=840,y0=60,y1=290;
 s+='<line x1="'+x0+'" y1="'+y1+'" x2="'+x1+'" y2="'+y1+'" stroke="'+D+'" stroke-width="2"/><line x1="'+x0+'" y1="'+y0+'" x2="'+x0+'" y2="'+y1+'" stroke="'+D+'" stroke-width="2"/>';
 [0,12,24,36,48,60].forEach(function(m){var x=x0+(x1-x0)*m/60;s+=tx(x,y1+18,m+L(lang,'か月','개월',' mo'),11,G,600)});
 [0,120000,240000].forEach(function(v){var y=y1-(y1-y0)*v/240000;s+=tx(x0-8,y+4,v.toLocaleString('ja-JP'),11,G,600,'end')+'<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="#E6ECF2"/>'});
 s+='<line x1="'+x0+'" y1="'+y0+'" x2="'+x1+'" y2="'+y1+'" stroke="'+BS+'" stroke-width="4" stroke-dasharray="1200"><animate attributeName="stroke-dashoffset" values="1200;0" dur="5s" repeatCount="indefinite"/></line>';
 for(var m=0;m<60;m+=3){var x=x0+(x1-x0)*m/60;s+=Rc(x+2,y1-10,(x1-x0)/60*3-4,10,PL,2)}
 s+=tx(x0+20,y0+16,L(lang,'屋台の帳簿上の価値（貸借対照表）','포장마차의 장부상 가치(재무상태표)','Cart’s book value (balance sheet)'),13,BS,800,'start');
 s+=tx(x1-10,y1-20,L(lang,'毎月4,000円ずつ費用（損益計算書）','매달 4,000엔씩 비용(손익계산서)','4,000 yen a month as cost (income statement)'),13,PL,800,'end');
 s+=tx(450,335,L(lang,'買った日に240,000円の現金が出て、費用は60回に分けて出る。1か月目の帳簿価値 236,000円 ＝ 240,000 − 4,000','산 날에 현금 240,000엔이 나가고, 비용은 60번에 나눠 나온다. 1개월째 장부 가치 236,000엔 = 240,000 − 4,000','Cash of 240,000 leaves on purchase day; the cost is spread over 60 months. Book value after month 1: 236,000 = 240,000 − 4,000'),12,D,600);
 return s+'</svg>'},
/* 3-3 利益から営業キャッシュフローへの橋：たい焼き屋（間接法） */
fin_cash_bridge:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+Rc(0,0,900,380,'#F7FAFD');
 var st=[[L(lang,'当期純利益','당기순이익','Net profit'),64000,'t',PL],[L(lang,'＋減価償却費','+감가상각비','+ Depreciation'),4000,'d',BS],[L(lang,'−売掛金の増加','−매출채권 증가','− Receivable up'),-20000,'d',R],[L(lang,'−在庫の増加','−재고 증가','− Inventory up'),-15000,'d',R],[L(lang,'＋未払税金の増加','+미지급 세금 증가','+ Tax payable up'),16000,'d',BS],[L(lang,'営業キャッシュフロー','영업현금흐름','Operating cash flow'),49000,'t',CF]];
 var x0=50,w=110,gap=22,base=300,sc=220/70000,run=0;
 st.forEach(function(v,i){var x=x0+i*(w+gap),h,y;
  if(v[2]==='t'){run=v[1];h=run*sc;y=base-h;s+=Rc(x,y,w,h,v[3],6)+tx(x+w/2,y-8,v[1].toLocaleString('ja-JP'),13,D,800)}
  else{var top=run;run+=v[1];if(v[1]>=0){h=v[1]*sc;y=base-run*sc}else{h=-v[1]*sc;y=base-top*sc}s+=Rc(x,y,w,h,v[3],6)+tx(x+w/2,y-8,(v[1]>=0?'+':'−')+Math.abs(v[1]).toLocaleString('ja-JP'),12,v[1]>=0?BS:R,800);
   s+='<line x1="'+(x-gap)+'" y1="'+(base-top*sc)+'" x2="'+x+'" y2="'+(base-top*sc)+'" stroke="'+G+'" stroke-dasharray="3 3"/>'}
  s+='<g>'+Rc(x,y,w,h,'#F7FAFD',6)+'<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;'+(i/6*0.6).toFixed(2)+';'+((i+1)/6*0.6).toFixed(2)+';1" dur="6s" repeatCount="indefinite"/></g>';
  s+=tx(x+w/2,base+18,v[0],11,D,v[2]==='t'?800:500)});
 s+='<line x1="30" y1="'+base+'" x2="870" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=tx(450,352,L(lang,'利益64,000円 → 現金が動かない費用を足し、現金が入っていない売上と、払ったのに費用でない分を引く → 商売が生んだ現金49,000円','이익 64,000엔 → 현금이 움직이지 않는 비용을 더하고, 현금이 안 들어온 매출과 냈는데 비용이 아닌 몫을 뺀다 → 장사가 낳은 현금 49,000엔','Profit 64,000 → add costs with no cash, subtract sales not yet collected and payments that are not costs → cash from trading 49,000'),12,D,600);
 return s+'</svg>'},
/* 3-5 3つの活動の符号パターン：会社の状態を読む */
fin_cf_patterns:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img">'+Rc(0,0,900,360,'#F7FAFD');
 var P=[['+','−','−',L(lang,'健全・成熟','건전·성숙','Healthy, mature'),L(lang,'稼いだ現金で投資し、借入を返す','번 현금으로 투자하고 차입을 갚는다','Earns cash, invests, repays debt'),BS],
  ['+','−','+',L(lang,'成長・拡大','성장·확대','Growing'),L(lang,'稼ぎ以上に投資し、不足を借入で補う','버는 것 이상으로 투자하고 부족분을 차입으로','Invests beyond earnings, borrows the gap'),PL],
  ['+','+','−',L(lang,'縮小・整理','축소·정리','Shrinking'),L(lang,'資産を売って借入を返している','자산을 팔아 차입을 갚고 있다','Sells assets to repay debt'),CF],
  ['−','−','+',L(lang,'立ち上げ・危機','창업·위기','Start-up or crisis'),L(lang,'本業で現金が出ていき、投資も続け、借入で支える','본업에서 현금이 나가고 투자도 하며 차입으로 버틴다','Core business burns cash, still investing, funded by borrowing'),R]];
 var hd=[L(lang,'営業','영업','Operating'),L(lang,'投資','투자','Investing'),L(lang,'財務','재무','Financing')];
 s+=tx(140,40,hd[0],13,G,700)+tx(210,40,hd[1],13,G,700)+tx(280,40,hd[2],13,G,700);
 P.forEach(function(p,i){var y=70+i*70;s+='<g>'+Rc(40,y,820,56,'#fff',10,' stroke="'+p[5]+'" stroke-width="3"');
  [0,1,2].forEach(function(k){var x=140+k*70;s+='<circle cx="'+x+'" cy="'+(y+28)+'" r="18" fill="'+(p[k]==='+'?BS:R)+'"/>'+tx(x,y+35,p[k],20,'#fff',800)});
  s+=tx(340,y+25,p[3],15,D,800,'start')+tx(340,y+45,p[4],12,G,500,'start');
  s+='<animate attributeName="opacity" values="0.35;1;1;0.35" keyTimes="0;'+(i*0.22).toFixed(2)+';'+(i*0.22+0.25).toFixed(2)+';1" dur="6s" repeatCount="indefinite"/></g>'});
 s+=tx(450,350,L(lang,'JAL 2026年3月期は「＋・−・＋」。営業で3,949億円を稼ぎ、1,831億円を投資し、永久劣後債などで446億円を調達（成長投資の局面）','JAL 2026년 3월기는 「+·−·+」. 영업으로 3,949억 엔을 벌고 1,831억 엔을 투자하고 영구후순위채 등으로 446억 엔을 조달(성장 투자 국면)','JAL, year to March 2026: + / − / +. Earned 394.9bn from operations, invested 183.1bn and raised 44.6bn through perpetual bonds and other financing: a growth-investment phase'),11,D,600);
 return s+'</svg>'},
/* 3-3 当期純利益から営業キャッシュフローへの橋（Vela Air 1年目、億円） */
fin_cash_bridge:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+Rc(0,0,900,400,'#F7FAFD');
 var st=[[L(lang,'当期純利益','당기순이익','Net profit'),90,'t',PL],[L(lang,'＋減価償却','+감가상각','+ Depreciation'),254,'d',BS],[L(lang,'−売掛金の増加','−매출채권 증가','− Receivables up'),-15,'d',R],[L(lang,'−在庫の増加','−재고 증가','− Inventory up'),-5,'d',R],[L(lang,'＋買掛金の増加','+매입채무 증가','+ Payables up'),20,'d',BS],[L(lang,'＋前受金の増加','+선수금 증가','+ Unearned up'),40,'d',BS],[L(lang,'＋マイル負債の増加','+마일 부채 증가','+ Miles up'),10,'d',BS],[L(lang,'営業キャッシュフロー','영업현금흐름','Operating cash flow'),394,'t',CF]];
 var x0=40,w=86,gap=20,base=320,sc=240/400,run=0;
 st.forEach(function(v,i){var x=x0+i*(w+gap),h,y;
  if(v[2]==='t'){run=v[1];h=run*sc;y=base-h;s+=Rc(x,y,w,h,v[3],6)+tx(x+w/2,y-8,v[1],13,D,800)}
  else{var top=run;run=run+v[1];var lo=Math.min(top,run),hi=Math.max(top,run);h=(hi-lo)*sc;y=base-hi*sc;s+=Rc(x,y,w,Math.max(h,3),v[3],4)+tx(x+w/2,y-8,(v[1]>0?'+':'−')+Math.abs(v[1]),12,v[3],800);s+='<line x1="'+(x-gap)+'" y1="'+(base-top*sc)+'" x2="'+x+'" y2="'+(base-top*sc)+'" stroke="'+G+'" stroke-dasharray="3 3"/>'}
  s+='<g>'+Rc(x,y-14,w,Math.max(h,3)+16,'#F7FAFD',0)+'<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;'+(i/8*0.6).toFixed(2)+';'+((i+0.6)/8*0.6).toFixed(2)+';1" dur="6s" repeatCount="indefinite"/></g>';
  s+=tx(x+w/2,base+16,v[0],10.5,D,v[2]==='t'?800:500)});
 s+='<line x1="30" y1="'+base+'" x2="880" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=tx(450,372,L(lang,'利益90億円が、お金の出ていかない費用（減価償却）と、先に受け取った前受金で、営業キャッシュフロー394億円になる','이익 90억 엔이, 돈이 나가지 않는 비용(감가상각)과 먼저 받은 선수금으로 영업현금흐름 394억 엔이 된다','Profit of 9.0bn becomes operating cash flow of 39.4bn through non-cash depreciation and cash received in advance'),12,D,600);
 return s+'</svg>'},
/* 3-1 3つの区分の符号パターン */
fin_cf_patterns:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" role="img">'+Rc(0,0,900,330,'#F7FAFD');
 var H=[L(lang,'営業','영업','Operating'),L(lang,'投資','투자','Investing'),L(lang,'財務','재무','Financing')];
 var P=[[['+','−','−'],L(lang,'成熟した優良企業','성숙한 우량 기업','Mature, healthy'),L(lang,'稼いだ現金で投資し、借入を返し配当する','번 현금으로 투자하고 빚을 갚고 배당','Earns cash, invests, repays and pays dividends')],
  [['+','−','+'],L(lang,'成長投資の時期','성장 투자기','Growth investment'),L(lang,'稼ぎ以上に投資し、借入や増資で補う（機材の大量発注）','버는 것 이상으로 투자하고 차입·증자로 보충(기재 대량 발주)','Invests beyond earnings, funded by borrowing or new shares (big fleet orders)')],
  [['+','+','−'],L(lang,'縮小・資産の売却','축소·자산 매각','Shrinking, selling assets'),L(lang,'資産を売って借入を返す。再建中の会社に多い','자산을 팔아 빚을 갚는다. 재건 중인 회사에 많다','Sells assets to repay debt; common in restructuring')],
  [['−','−','+'],L(lang,'創業期・危機','창업기·위기','Start-up or crisis'),L(lang,'本業で現金が出ていき、借入で投資も運転資金もまかなう（たい焼き屋の初月、コロナ禍の航空会社）','본업에서 현금이 나가고 차입으로 투자도 운전자금도 댄다(붕어빵 가게 첫 달, 코로나 때 항공사)','Cash leaves the business; borrowing funds both investment and operations (the stall’s first month, airlines in 2020)')]];
 s+=tx(140,34,L(lang,'符号の組み合わせ','부호의 조합','Sign pattern'),13,G,700)+tx(560,34,L(lang,'会社の状態','회사의 상태','What it says'),13,G,700,'start');
 P.forEach(function(r,i){var y=60+i*64;H.forEach(function(h,j){var x=40+j*70,c=r[0][j]==='+'?BS:R;s+=Rc(x,y,60,46,c,8)+tx(x+30,y+30,r[0][j],22,'#fff',800)+tx(x+30,y+58,h,10,G,600)});
  s+=tx(290,y+22,r[1],14,D,800,'start')+tx(290,y+40,r[2],11,G,500,'start');
  s+='<rect x="30" y="'+(y-6)+'" width="840" height="58" rx="10" fill="'+PL+'" opacity="0"><animate attributeName="opacity" values="0;0;0.08;0.08;0" keyTimes="0;'+(i*0.22).toFixed(2)+';'+(i*0.22+0.05).toFixed(2)+';'+(i*0.22+0.2).toFixed(2)+';1" dur="8s" repeatCount="indefinite"/></rect>'});
 return s+'</svg>'},
/* 4-1 3つの表のつながり（Vela Air 1年目）：利益→利益剰余金、期末現金→現金、減価償却→航空機 */
fin_links_vela:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" role="img">'+DEFS+Rc(0,0,900,420,'#F7FAFD');
 function box(x,col,title,rows,hl){s+=Rc(x,40,270,330,'#fff',14,' stroke="'+col+'" stroke-width="3"')+Rc(x,40,270,40,col,14)+Rc(x,66,270,14,col)+tx(x+135,66,title,14,'#fff',800);
  rows.forEach(function(r,i){var y=108+i*36,b=hl.indexOf(i)>=0;if(b)s+=Rc(x+10,y-17,250,28,'#FFF4D6',6);s+=tx(x+18,y+2,r[0],12,D,b?800:500,'start')+tx(x+255,y+2,r[1],12.5,b?D:G,b?800:600,'end')})}
 box(20,PL,L(lang,'損益計算書（1年目）','손익계산서(1년 차)','Income statement (year 1)'),[[L(lang,'売上','매출','Revenue'),'3,000'],[L(lang,'燃油・人件費など','연료·인건비 등','Fuel, staff etc.'),'−2,566'],[L(lang,'減価償却費','감가상각비','Depreciation'),'−254'],[L(lang,'営業利益','영업이익','Operating profit'),'180'],[L(lang,'利息・税金','이자·세금','Interest, tax'),'−90'],[L(lang,'当期純利益','당기순이익','Net profit'),'90']],[2,5]);
 box(315,BS,L(lang,'貸借対照表（1年目末）','재무상태표(1년 차 말)','Balance sheet (end of year 1)'),[[L(lang,'現金','현금','Cash'),'1,044'],[L(lang,'航空機 2,100→','항공기 2,100→','Aircraft 2,100→'),'2,146'],[L(lang,'その他の資産','기타 자산','Other assets'),'2,720'],[L(lang,'負債','부채','Liabilities'),'3,940'],[L(lang,'資本金・剰余金','자본금·잉여금','Capital'),'900'],[L(lang,'利益剰余金 1,020→','이익잉여금 1,020→','Retained earnings 1,020→'),'1,070']],[0,1,5]);
 box(610,CF,L(lang,'キャッシュフロー（1年目）','현금흐름표(1년 차)','Cash flow (year 1)'),[[L(lang,'当期純利益','당기순이익','Net profit'),'90'],[L(lang,'＋減価償却','+감가상각','+ Depreciation'),'254'],[L(lang,'営業活動','영업활동','Operating'),'394'],[L(lang,'投資（機材 −300）','투자(기재 −300)','Investing (aircraft −300)'),'−300'],[L(lang,'財務（返済・配当40）','재무(상환·배당 40)','Financing (repay, dividend 40)'),'−250'],[L(lang,'期末現金','기말 현금','Closing cash'),'1,044']],[1,5]);
 var A=[['M290,290 C330,290 330,290 325,290',PL,'0;1;1;0;0;0;0'],['M620,290 C540,290 540,108 595,108',CF,'0;0;0;1;1;0;0'],['M620,146 C560,146 560,144 595,144',G,'0;0;0;0;0;1;1']];
 A.forEach(function(a){s+='<path d="'+a[0]+'" fill="none" stroke="'+a[1]+'" stroke-width="3" marker-end="url(#fa)"><animate attributeName="opacity" values="'+a[2]+'" dur="7s" repeatCount="indefinite"/></path>'});
 s+=tx(450,392,L(lang,'① 利益90は配当40を引いて利益剰余金へ（+50）　② 期末現金1,044は資産の現金へ　③ 減価償却254は費用でもあり、航空機の帳簿価値を減らし、現金には影響しない','① 이익 90은 배당 40을 빼고 이익잉여금으로(+50)　② 기말 현금 1,044는 자산의 현금으로　③ 감가상각 254는 비용이면서 항공기 장부가를 줄이고 현금에는 영향이 없다','① Profit 90 less dividend 40 goes to retained earnings (+50)　② Closing cash 1,044 is the cash on the balance sheet　③ Depreciation 254 is a cost, reduces the aircraft book value, and leaves cash untouched'),11.5,D,600);
 return s+'</svg>'},
/* 5-5 RASK と CASK（Vela Air 3年）：座席キロあたりの収入と費用、損益分岐の座席利用率 */
fin_rask_cask:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+Rc(0,0,900,380,'#F7FAFD');
 var Y=[[L(lang,'1年目','1년 차','Year 1'),15.0,14.1,82,77.1],[L(lang,'2年目（燃油高騰）','2년 차(유가 급등)','Year 2 (fuel spike)'),15.41,15.68,80,81.4],[L(lang,'3年目','3년 차','Year 3'),15.35,14.27,83,77.2]];
 var base=300,sc=14;
 Y.forEach(function(y,i){var x=70+i*280;var hr=(y[1]-10)*sc,hc=(y[2]-10)*sc;
  s+=Rc(x,base-hr,80,hr,PL,6)+tx(x+40,base-hr-8,y[1].toFixed(1),13,PL,800)+Rc(x+95,base-hc,80,hc,R,6)+tx(x+135,base-hc-8,y[2].toFixed(1),13,R,800);
  var ok=y[1]>=y[2];s+=Rc(x+190,base-70,70,70,ok?'#E8F3F0':'#FDEEF0',10)+tx(x+225,base-45,(ok?'+':'−')+Math.abs(y[1]-y[2]).toFixed(2),15,ok?BS:R,800)+tx(x+225,base-25,L(lang,'円/座席km','엔/좌석km','yen/ASK'),9,G,600)+tx(x+225,base-10,L(lang,'利用率 ','탑승률 ','LF ')+y[3]+'% / '+y[4]+'%',9,G,600);
  s+=tx(x+130,base+20,y[0],13,D,800);
  s+='<g><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(i*0.25).toFixed(2)+';'+(i*0.25+0.15).toFixed(2)+';1" dur="5s" repeatCount="indefinite"/></g>'});
 s+='<line x1="40" y1="'+base+'" x2="880" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=Rc(60,340,14,14,PL,3)+tx(80,352,L(lang,'座席キロあたり収入（旅客＋貨物＋付帯）','좌석킬로당 수입(여객+화물+부대)','Revenue per ASK (passenger, cargo, ancillary)'),12,D,600,'start')+Rc(470,340,14,14,R,3)+tx(490,352,L(lang,'座席キロあたり費用（CASK）','좌석킬로당 비용(CASK)','Cost per ASK (CASK)'),12,D,600,'start');
 s+=tx(450,40,L(lang,'2年目は費用が収入を上回り、損益分岐の利用率（81.4%）が実際の利用率（80%）を超えた','2년 차는 비용이 수입을 웃돌아 손익분기 탑승률(81.4%)이 실제 탑승률(80%)을 넘었다','In year 2 cost exceeded revenue per ASK and the break-even load factor (81.4%) rose above the actual 80%'),12,D,600);
 return s+'</svg>'},
/* 6-1 ROEの分解：小さな会社と Vela Air 1年目。利益率 × 回転率 × レバレッジ ＝ ROE */
fin_roe_tree:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+Rc(0,0,900,400,'#F7FAFD');
 var H=[[L(lang,'当期純利益率','순이익률','Net margin'),L(lang,'純利益 ÷ 売上','순이익 ÷ 매출','profit ÷ sales'),PL],[L(lang,'総資産回転率','총자산회전율','Asset turnover'),L(lang,'売上 ÷ 総資産','매출 ÷ 총자산','sales ÷ assets'),BS],[L(lang,'レバレッジ','레버리지','Leverage'),L(lang,'総資産 ÷ 自己資本','총자산 ÷ 자기자본','assets ÷ equity'),CF]];
 var u=L(lang,'回','회','×'),v=L(lang,'倍','배','×');
 var Rw=[[L(lang,'小さな会社','작은 회사','Small company'),'6.8%','3.24'+u,'1.55'+v,'34.0%'],[L(lang,'Vela Air 1年目','Vela Air 1년 차','Vela Air, year 1'),'3.0%','0.50'+u,'3.06'+v,'4.6%']];
 H.forEach(function(h,i){var x=170+i*190;s+=tx(x+70,52,h[0],14,h[2],800)+tx(x+70,72,h[1],11,G,600)});
 s+=tx(790,52,'ROE',16,D,800)+tx(790,72,L(lang,'純利益 ÷ 自己資本','순이익 ÷ 자기자본','profit ÷ equity'),11,G,600);
 Rw.forEach(function(r,j){var y=96+j*130,g='<g><animate attributeName="opacity" values="0;1;1" keyTimes="0;'+(0.15+j*0.2).toFixed(2)+';1" dur="6s" repeatCount="indefinite"/>';
  g+=tx(84,y+48,r[0],13,D,800);
  H.forEach(function(h,i){var x=170+i*190;g+=Rc(x,y,140,80,'#fff',12,' stroke="'+h[2]+'" stroke-width="3"')+tx(x+70,y+50,r[i+1],24,h[2],800);if(i<2)g+=tx(x+165,y+50,'×',22,G,700)});
  g+=tx(700,y+50,'＝',22,G,700)+Rc(725,y,130,80,j?'#EAF3FD':'#E8F3F0',12,' stroke="'+D+'" stroke-width="3"')+tx(790,y+52,r[4],26,D,800);s+=g+'</g>'});
 s+=tx(450,378,L(lang,'小さな会社は回転率で、航空会社はレバレッジでROEを作っている','작은 회사는 회전율로, 항공사는 레버리지로 ROE를 만든다','The small company earns its ROE from turnover; the airline from leverage'),12.5,D,600);
 return s+'</svg>'},
/* 6-2 安全性：Vela Air の総資産を「自己資本・有利子負債・その他の負債」に分けた4時点 */
fin_safety:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+Rc(0,0,900,400,'#F7FAFD');
 var Y=[[L(lang,'期首','기초','Opening'),1920,2300,1780,'32.0%',1200],[L(lang,'1年目末','1년 차 말','End of year 1'),1970,2090,1850,'33.3%',1044],[L(lang,'2年目末','2년 차 말','End of year 2'),1865,2080,1935,'31.7%',1256],[L(lang,'3年目末','3년 차 말','End of year 3'),1942,2070,2000,'32.3%',1338]];
 var base=300,sc=0.038,O='#B9C4D0';
 Y.forEach(function(y,i){var x=90+i*200,h1=y[1]*sc,h2=y[2]*sc,h3=y[3]*sc;
  s+=Rc(x,base-h1,120,h1,BS,0)+tx(x+60,base-h1/2+5,y[1].toLocaleString('en-US'),13,'#fff',800);
  s+=Rc(x,base-h1-h2,120,h2,R,0)+tx(x+60,base-h1-h2/2+5,y[2].toLocaleString('en-US'),13,'#fff',800);
  s+=Rc(x,base-h1-h2-h3,120,h3,O,0)+tx(x+60,base-h1-h2-h3/2+5,y[3].toLocaleString('en-US'),13,D,800);
  s+=tx(x+60,base-h1-h2-h3-10,y[4],15,BS,800)+tx(x+60,base+20,y[0],13,D,800)+tx(x+60,base+38,L(lang,'現金 ','현금 ','Cash ')+y[5].toLocaleString('en-US'),11.5,G,600)});
 s+='<line x1="60" y1="'+base+'" x2="870" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=Rc(70,358,14,14,BS,3)+tx(90,370,L(lang,'自己資本（上の％は自己資本比率）','자기자본(위의 %는 자기자본비율)','Equity (% above = equity ratio)'),12,D,600,'start');
 s+=Rc(390,358,14,14,R,3)+tx(410,370,L(lang,'有利子負債（借入＋リース）','유이자부채(차입+리스)','Interest-bearing debt'),12,D,600,'start');
 s+=Rc(650,358,14,14,O,3)+tx(670,370,L(lang,'その他の負債（前受金など）','그 밖의 부채(선수금 등)','Other liabilities'),12,D,600,'start');
 s+=tx(450,28,L(lang,'赤字の2年目は自己資本が減ったが、有利子負債は増やさず、現金は増えた（億円）','적자인 2년 차는 자기자본이 줄었지만 유이자부채는 늘리지 않았고 현금은 늘었다(억 엔)','In loss-making year 2 equity fell, but debt did not rise and cash grew (100m yen)'),12.5,D,600);
 return s+'</svg>'},
/* 6-4 成長性：旅客収入の伸びを「量（RPK）× 単価（イールド）」に分ける */
fin_growth_split:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img">'+Rc(0,0,900,360,'#F7FAFD');
 var P=[[L(lang,'2年目（燃油高騰）','2년 차(유가 급등)','Year 2 (fuel spike)'),5.3,0,5.3],[L(lang,'3年目（回復）','3년 차(회복)','Year 3 (recovery)'),3.9,8.8,-4.5]];
 var N=[L(lang,'旅客収入','여객 수입','Passenger revenue'),L(lang,'量（RPK）','양(RPK)','Volume (RPK)'),L(lang,'単価（イールド）','단가(일드)','Price (yield)')],C=[PL,BS,CF],sc=13;
 P.forEach(function(p,i){var x0=250+i*430;s+=tx(x0,46,p[0],15,D,800);
  s+='<line x1="'+x0+'" y1="66" x2="'+x0+'" y2="290" stroke="'+D+'" stroke-width="2"/>';
  [1,2,3].forEach(function(k){var v=p[k],y=84+(k-1)*70,w=Math.abs(v)*sc,c=v<0?R:C[k-1];
   s+=tx(x0-(v<0?w+12:12),y+17,(i?'':N[k-1]),12.5,D,700,'end');
   s+=Rc(v<0?x0-w:x0,y,Math.max(w,2),44,c,6)+tx(v<0?x0+10:x0+w+10,y+29,(v>0?'+':v<0?'−':'±')+Math.abs(v).toFixed(1)+'%',16,c,800,'start')})});
 s+=tx(450,326,L(lang,'2年目の増収はすべて値上げ、3年目の増収はすべて量。同じ増収でも中身は逆','2년 차의 증수는 모두 가격 인상, 3년 차의 증수는 모두 양. 같은 증수라도 속은 반대','Year 2 grew entirely on price, year 3 entirely on volume: the same growth, opposite causes'),12.5,D,600);
 return s+'</svg>'},
/* 6-5 利益の質：純利益 → 営業CF → FCF → リース返済後のFCF（Vela Air 3年） */
fin_cf_quality:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+Rc(0,0,900,400,'#F7FAFD');
 var Y=[[L(lang,'1年目','1년 차','Year 1'),90,394,94,34],[L(lang,'2年目（燃油高騰）','2년 차(유가 급등)','Year 2 (fuel spike)'),-105,222,222,162],[L(lang,'3年目','3년 차','Year 3'),127,442,142,82]];
 var C=[PL,CF,BS,'#7FB5AC'],base=262,sc=0.42;
 Y.forEach(function(y,i){var x=60+i*285;
  [1,2,3,4].forEach(function(k){var v=y[k],h=Math.abs(v)*sc,bx=x+(k-1)*60;
   s+=Rc(bx,v<0?base:base-h,48,Math.max(h,2),v<0?R:C[k-1],5)+tx(bx+24,v<0?base+h+16:base-h-7,(v<0?'−':'+')+Math.abs(v),12.5,v<0?R:D,800)});
  s+=tx(x+114,base+(i===1?70:24),y[0],13,D,800)});
 s+='<line x1="40" y1="'+base+'" x2="880" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 var G4=[L(lang,'当期純利益','당기순이익','Net profit'),L(lang,'営業キャッシュフロー','영업현금흐름','Operating cash flow'),L(lang,'フリーキャッシュフロー','잉여현금흐름','Free cash flow'),L(lang,'リース返済後のFCF','리스 상환 후 FCF','FCF after lease payments')];
 G4.forEach(function(g,k){var lx=70+(k%2)*400,ly=352+Math.floor(k/2)*24;s+=Rc(lx,ly,14,14,C[k],3)+tx(lx+20,ly+12,g,12,D,600,'start')});
 s+=tx(450,28,L(lang,'利益より営業CFがずっと大きい。機材投資とリース返済を引くと、残りは小さくなる（億円）','이익보다 영업현금흐름이 훨씬 크다. 기재 투자와 리스 상환을 빼면 남는 돈은 작아진다(억 엔)','Operating cash flow far exceeds profit; after aircraft and lease payments little is left (100m yen)'),12.5,D,600);
 return s+'</svg>'},
/* 6-3 回転期間：小さな会社の「仕入れてから現金が戻るまで」（在庫20日＋売掛金10日−買掛金23日＝CCC 7日） */
fin_ccc:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" role="img">'+Rc(0,0,900,340,'#F7FAFD');
 var x0=170,sc=22,dy=L(lang,'日','일',' d');
 var E=[[0,L(lang,'仕入れる','사들인다','Buy'),62],[20,L(lang,'売る','판다','Sell'),62],[23,L(lang,'支払う','대금을 낸다','Pay supplier'),318],[30,L(lang,'入金','입금','Cash in'),62]];
 E.forEach(function(e){var x=x0+e[0]*sc;s+='<line x1="'+x+'" y1="72" x2="'+x+'" y2="296" stroke="'+G+'" stroke-width="1.5" stroke-dasharray="4 4"/>'+tx(x,e[2],e[1]+'（'+e[0]+dy+'）',12,D,700)});
 s+=Rc(x0,88,20*sc,46,BS,8)+tx(x0+10*sc,117,L(lang,'在庫 20日','재고 20일','Inventory 20 days'),14,'#fff',800);
 s+=Rc(x0+20*sc,88,10*sc,46,PL,8)+tx(x0+25*sc,117,L(lang,'売掛金 10日','매출채권 10일','Receivables 10 d'),14,'#fff',800);
 s+=Rc(x0,158,23*sc,46,CF,8)+tx(x0+11.5*sc,187,L(lang,'買掛金 23日（まだ払っていない）','매입채무 23일(아직 내지 않았다)','Payables 23 days (not yet paid)'),14,'#fff',800);
 s+=Rc(x0+23*sc,228,7*sc,46,R,8)+tx(x0+26.5*sc,257,'CCC 7'+L(lang,'日','일',' days'),14,'#fff',800);
 s+=tx(x0+23*sc-12,257,L(lang,'自分のお金で立て替える期間 →','내 돈으로 메우는 기간 →','Funded with own cash →'),12.5,R,700,'end');
 s+=tx(450,28,L(lang,'小さな会社：仕入れてから現金が戻るまで（10 ＋ 20 − 23 ＝ 7日）','작은 회사: 사들여서 현금이 돌아오기까지(10 + 20 − 23 = 7일)','Small company: from purchase to cash back (10 + 20 − 23 = 7 days)'),13,D,700);
 return s+'</svg>'},
/* 6-6 時系列：Vela Air の指数（1年目＝100）。売上・ASK・燃油費・燃油以外の費用 */
fin_trend_index:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+Rc(0,0,900,380,'#F7FAFD');
 var X=[170,450,730],yy=function(v){return 296-(v-95)*4.1};
 [100,110,120,130,140,150].forEach(function(v){s+='<line x1="110" y1="'+yy(v)+'" x2="800" y2="'+yy(v)+'" stroke="'+(v===100?D:'#D5DEE8')+'" stroke-width="'+(v===100?2:1)+'"/>'+tx(100,yy(v)+4,v,11.5,G,600,'end')});
 var S=[[L(lang,'売上','매출','Sales'),[100,105.3,110.0],PL],['ASK',[100,102.5,107.5],D],[L(lang,'燃油費','연료비','Fuel'),[100,147.7,116.7],R],[L(lang,'燃油以外の費用','연료 외 비용','Non-fuel costs'),[100,103.3,106.3],BS]];
 S.forEach(function(q){s+='<polyline fill="none" stroke="'+q[2]+'" stroke-width="3.5" stroke-linejoin="round" points="'+q[1].map(function(v,i){return X[i]+','+yy(v).toFixed(1)}).join(' ')+'"/>';q[1].forEach(function(v,i){s+='<circle cx="'+X[i]+'" cy="'+yy(v).toFixed(1)+'" r="5" fill="'+q[2]+'"/>'})});
 s+=tx(X[1],yy(147.7)-12,'147.7',14,R,800)+tx(X[2]+14,yy(116.7)+4,'116.7',13,R,800,'start')+tx(X[2]+14,yy(110.0)+2,'110.0',13,PL,800,'start');
 [L(lang,'1年目','1년 차','Year 1'),L(lang,'2年目（燃油高騰）','2년 차(유가 급등)','Year 2 (fuel spike)'),L(lang,'3年目','3년 차','Year 3')].forEach(function(n,i){s+=tx(X[i],318,n,12.5,D,800)});
 var lx=[70,250,400,590],fv=['110.0','107.5','116.7','106.3'];
 S.forEach(function(q,k){s+=Rc(lx[k],346,14,14,q[2],3)+tx(lx[k]+20,358,q[0]+' '+fv[k],12,D,600,'start')});
 s+=tx(450,30,L(lang,'1年目を100とした指数。燃油費だけが大きく動き、燃油以外の費用は供給（ASK）より緩やかに伸びた','1년 차를 100으로 한 지수. 연료비만 크게 움직였고, 연료 외 비용은 공급(ASK)보다 천천히 늘었다','Index, year 1 = 100. Only fuel swung widely; non-fuel costs grew more slowly than capacity (ASK)'),12.5,D,600);
 return s+'</svg>'}
};
for(var k in F)window.FIGS[k]=F[k];
})();
