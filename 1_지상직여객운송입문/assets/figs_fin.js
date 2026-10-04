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
 return s+'</svg>'},
/* ===== Part 6 追加の図・Part 7 の図（2026.10）。滑り台グラフは下の WF() で描く ===== */
fin_margin_steps:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img">'+Rc(0,0,900,360,'#F7FAFD'),base=270,sc=12,Gy='#8A96A3';
 var C=[[L(lang,'EBITDAマージン','EBITDA 마진','EBITDA margin'),14.0,14.5],[L(lang,'営業利益率','영업이익률','Operating margin'),10.0,6.0],[L(lang,'当期純利益率','당기순이익률','Net margin'),6.8,3.0]];
 C.forEach(function(c,i){var x=120+i*260;s+=Rc(x,base-c[1]*sc,84,c[1]*sc,Gy,6)+tx(x+42,base-c[1]*sc-8,c[1].toFixed(1)+'%',14,D,800)+Rc(x+100,base-c[2]*sc,84,c[2]*sc,PL,6)+tx(x+142,base-c[2]*sc-8,c[2].toFixed(1)+'%',14,PL,800)+tx(x+92,base+22,c[0],13,D,800)});
 s+='<line x1="60" y1="'+base+'" x2="860" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=Rc(230,322,14,14,Gy,3)+tx(250,334,L(lang,'小さな会社','작은 회사','Small company'),12,D,600,'start')+Rc(480,322,14,14,PL,3)+tx(500,334,L(lang,'Vela Air 1年目','Vela Air 1년 차','Vela Air year 1'),12,D,600,'start');
 s+=tx(450,30,L(lang,'売上100のうち、それぞれの利益として残る分','매출 100 가운데 각 이익으로 남는 몫','Out of every 100 of sales, what remains at each level of profit'),12.5,D,600);
 return s+'</svg>'},
fin_coverage:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 370" role="img">'+Rc(0,0,900,370,'#F7FAFD'),base=250,sc=0.6;
 var Y=[[L(lang,'1年目','1년 차','Year 1'),186,58,L(lang,'3.2倍','3.2배','3.2×')],[L(lang,'2年目（燃油高騰）','2년 차(유가 급등)','Year 2 (fuel spike)'),-49,65,L(lang,'−0.8倍','−0.8배','−0.8×')],[L(lang,'3年目','3년 차','Year 3'),237,68,L(lang,'3.5倍','3.5배','3.5×')]];
 Y.forEach(function(y,i){var x=110+i*270,h=Math.abs(y[1])*sc,ng=y[1]<0;
  s+=Rc(x,ng?base:base-h,84,h,ng?R:BS,6)+tx(x+42,ng?base+h+16:base-h-8,(ng?'−':'')+Math.abs(y[1]),14,ng?R:D,800);
  s+=Rc(x+100,base-y[2]*sc,84,y[2]*sc,CF,6)+tx(x+142,base-y[2]*sc-8,y[2],14,D,800);
  s+=tx(x+92,base+(ng?66:24),y[0],13,D,800)+Rc(x+46,base+(ng?76:34),92,28,ng?'#FDEEF0':'#E8F3F0',14)+tx(x+92,base+(ng?95:53),y[3],14,ng?R:BS,800)});
 s+='<line x1="60" y1="'+base+'" x2="860" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=Rc(190,52,14,14,BS,3)+tx(210,64,L(lang,'営業利益＋金融収益','영업이익+금융수익','Operating profit + financial income'),12,D,600,'start')+Rc(560,52,14,14,CF,3)+tx(580,64,L(lang,'支払利息','이자비용','Interest expense'),12,D,600,'start');
 s+=tx(450,30,L(lang,'本業の稼ぎは支払利息の何倍か（億円）。1倍を下回ると、利息を稼ぎで払えていない','본업의 벌이는 이자비용의 몇 배인가(억 엔). 1배를 밑돌면 벌이로 이자를 못 내고 있다','How many times core earnings cover interest (100m yen). Below 1×, interest is not covered'),12.5,D,600);
 return s+'</svg>'},
fin_asset_turn:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" role="img">'+Rc(0,0,900,330,'#F7FAFD');
 var Rw=[[L(lang,'小さな会社（百万円）','작은 회사(백만 엔)','Small company (million yen)'),92.65,300,1.9,L(lang,'3.24回','3.24회','3.24×'),'92.65','300'],[L(lang,'Vela Air 1年目（億円）','Vela Air 1년 차(억 엔)','Vela Air year 1 (100m yen)'),5955,3000,0.1,L(lang,'0.50回','0.50회','0.50×'),'5,955','3,000']];
 Rw.forEach(function(r,j){var y=78+j*118;s+=tx(40,y-9,r[0],13,D,800,'start')+Rc(40,y,r[1]*r[3],30,BS,6)+tx(50+r[1]*r[3],y+21,L(lang,'総資産 ','총자산 ','Assets ')+r[5],13,BS,800,'start')+Rc(40,y+38,r[2]*r[3],30,PL,6)+tx(50+r[2]*r[3],y+59,L(lang,'売上 ','매출 ','Sales ')+r[6],13,PL,800,'start')+Rc(762,y+10,104,48,'#fff',12,' stroke="'+D+'" stroke-width="2.5"')+tx(814,y+41,r[4],18,D,800)});
 s+=tx(450,28,L(lang,'緑＝総資産、青＝1年の売上。小さな会社は資産の3倍を売り、航空会社は資産の半分を売る','초록 = 총자산, 파랑 = 1년 매출. 작은 회사는 자산의 3배를 팔고, 항공사는 자산의 절반을 판다','Green = total assets, blue = a year’s sales. The small company sells three times its assets; the airline, half'),12.5,D,600);
 s+=tx(450,314,L(lang,'※ 2つの行は別々の縮尺で描いています','※ 두 줄은 서로 다른 축척으로 그렸습니다','* The two rows are drawn to different scales'),11.5,G,600);
 return s+'</svg>'},
fin_profit_bridge:function(lang){return WF(L(lang,'営業利益が180から−54になった道すじ（億円）','영업이익이 180에서 −54가 된 길(억 엔)','How operating profit went from 180 to −54 (100m yen)'),[
 [L(lang,['1年目の','営業利益'],['1년 차','영업이익'],['Year 1','operating profit']),180,1],[L(lang,['売上の増加'],['매출 증가'],['Higher sales']),160,0],[L(lang,['燃油費の増加'],['연료비 증가'],['Higher fuel cost']),-323,0],[L(lang,['燃油以外の','費用の増加'],['연료 외','비용 증가'],['Higher','non-fuel costs']),-71,0],[L(lang,['2年目の','営業利益'],['2년 차','영업이익'],['Year 2','operating profit']),-54,1]],
 {h:386,base:252,sc:0.55,x0:80,step:160,bw:100,ly:316,note:L(lang,'売上は増えたが、燃油費の増加がその2倍だった','매출은 늘었지만 연료비 증가가 그 2배였다','Sales rose, but fuel rose twice as much')})},
fin_cash_use:function(lang){return WF(L(lang,'3年間に稼いだ現金の使い道（億円）','3년 동안 번 현금의 쓰임새(억 엔)','Where three years of cash went (100m yen)'),[
 [L(lang,['営業CF','（3年合計）'],['영업현금흐름','(3년 합계)'],['Operating cash','flow (3 years)']),1058,1,CF],[L(lang,['機材への投資'],['기재 투자'],['Aircraft']),-600,0],[L(lang,['リース返済'],['리스 상환'],['Lease','repayments']),-180,0],[L(lang,['配当'],['배당'],['Dividends']),-90,0],[L(lang,['借入の','純返済'],['차입','순상환'],['Net loan','repayment']),-50,0],[L(lang,['現金の増加'],['현금 증가'],['Increase','in cash']),138,1,BS]],
 {h:372,base:270,sc:0.19,x0:52,step:138,bw:92,ly:292,note:L(lang,'稼いだ現金の6割近くが機材に向かった','번 현금의 6할 가까이가 기재로 갔다','Nearly 60% of the cash earned went into aircraft')})},
fin_common_size:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" role="img">'+Rc(0,0,900,340,'#F7FAFD'),x0=190,sc=6,O='#B9C4D0';
 var Y=[[L(lang,'1年目','1년 차','Year 1'),22.6,71.4,6.0],[L(lang,'2年目（燃油高騰）','2년 차(유가 급등)','Year 2 (fuel spike)'),31.6,70.1,-1.7],[L(lang,'3年目','3년 차','Year 3'),23.9,69.1,7.0]];
 Y.forEach(function(y,i){var yy=74+i*72,w1=y[1]*sc,w2=y[2]*sc;
  s+=tx(x0-12,yy+26,y[0],12.5,D,800,'end')+Rc(x0,yy,w1,40,CF,0)+tx(x0+w1/2,yy+25,y[1].toFixed(1)+'%',13,'#fff',800)+Rc(x0+w1,yy,w2,40,O,0)+tx(x0+w1+w2/2,yy+25,y[2].toFixed(1)+'%',13,D,800);
  if(y[3]>=0)s+=Rc(x0+w1+w2,yy,y[3]*sc,40,BS,0)+tx(x0+w1+w2+y[3]*sc+8,yy+25,'+'+y[3].toFixed(1)+'%',13,BS,800,'start');
  else s+=Rc(x0+600,yy,-y[3]*sc,40,R,0)+tx(x0+600-y[3]*sc+8,yy+25,'−'+(-y[3]).toFixed(1)+'%',13,R,800,'start')});
 s+='<line x1="'+(x0+600)+'" y1="62" x2="'+(x0+600)+'" y2="282" stroke="'+D+'" stroke-width="2" stroke-dasharray="5 4"/>'+tx(x0+600,56,L(lang,'売上 100%','매출 100%','Sales 100%'),11.5,D,700);
 s+=Rc(150,306,14,14,CF,3)+tx(170,318,L(lang,'燃油費','연료비','Fuel'),12,D,600,'start')+Rc(300,306,14,14,O,3)+tx(320,318,L(lang,'燃油以外の営業費用','연료 외 영업비용','Non-fuel operating costs'),12,D,600,'start')+Rc(560,306,14,14,BS,3)+tx(580,318,L(lang,'営業利益（赤は赤字）','영업이익(빨강은 적자)','Operating profit (red = loss)'),12,D,600,'start');
 s+=tx(450,28,L(lang,'売上を100としたときの費用と利益。2年目は費用が100を超えた','매출을 100으로 했을 때의 비용과 이익. 2년 차는 비용이 100을 넘었다','Costs and profit per 100 of sales. In year 2 costs exceeded 100'),12.5,D,600);
 return s+'</svg>'},
fin_ev_bridge:function(lang){return WF(L(lang,'企業価値（EV）＝ 時価総額 ＋ 純有利子負債（Vela Air、億円）','기업가치(EV) = 시가총액 + 순차입금(Vela Air, 억 엔)','Enterprise value (EV) = market cap + net debt (Vela Air, 100m yen)'),[
 [L(lang,['株式時価総額','（株主の値段）'],['시가총액','(주주의 값)'],['Market cap','(the owners’ price)']),1500,1,PL],[L(lang,['純有利子負債','（借入 − 現金）'],['순차입금','(차입 − 현금)'],['Net debt','(debt − cash)']),732,0,R],[L(lang,['企業価値（EV）','（事業の値段）'],['기업가치(EV)','(사업의 값)'],['Enterprise value','(price of the business)']),2232,1,D]],
 {h:372,base:262,sc:0.085,x0:120,step:250,bw:150,ly:286,note:L(lang,'EV 2,232 ÷ EBITDA 501 ＝ 4.5倍　／　時価総額 1,500 ÷ 純利益 127 ＝ PER 11.8倍','EV 2,232 ÷ EBITDA 501 = 4.5배 / 시가총액 1,500 ÷ 순이익 127 = PER 11.8배','EV 2,232 ÷ EBITDA 501 = 4.5× / market cap 1,500 ÷ net profit 127 = PER 11.8×')})},
fin_dcf_value:function(lang){return WF(L(lang,'DCFで出したVela Airの価値（億円、割引率5%・成長率0.5%）','DCF로 구한 Vela Air의 가치(억 엔, 할인율 5%·성장률 0.5%)','Vela Air valued by DCF (100m yen; 5% discount rate, 0.5% growth)'),[
 [L(lang,['5年分のFCFの','現在価値'],['5년 치 FCF의','현재가치'],['PV of five','years of FCF']),517,1,PL],[L(lang,['継続価値の','現在価値'],['영구가치의','현재가치'],['PV of the','terminal value']),2275,0,CF],[L(lang,['企業価値','（EV）'],['기업가치','(EV)'],['Enterprise','value']),2792,1,D],[L(lang,['純有利子負債'],['순차입금'],['Net debt']),-732,0,R],[L(lang,['株主価値','（1株2,060円）'],['주주가치','(1주 2,060엔)'],['Equity value','(2,060 yen a share)']),2060,1,BS]],
 {h:372,base:262,sc:0.07,x0:70,step:162,bw:104,ly:286,note:L(lang,'企業価値の8割が継続価値。前提が少し動くだけで答えは大きく変わる','기업가치의 8할이 영구가치. 전제가 조금만 움직여도 답이 크게 바뀐다','Four-fifths of the value is terminal value: small changes in assumptions move the answer a lot')})},
fin_normalize:function(lang){return WF(L(lang,'決算書のEBITDAを「正常な稼ぎ」に直す（ミナト・グランドサービス、百万円）','결산서의 EBITDA를 「정상적인 벌이」로 고친다(미나토 그라운드 서비스, 백만 엔)','From reported EBITDA to normalised earnings (Minato Ground Services, million yen)'),[
 [L(lang,['決算書の','EBITDA'],['결산서의','EBITDA'],['Reported','EBITDA']),180,1,'#8A96A3'],[L(lang,['役員報酬'],['임원 보수'],['Owner pay']),40,0],[L(lang,['節税保険'],['절세 보험'],['Tax-driven','insurance']),20,0],[L(lang,['私的な','経費'],['사적','경비'],['Private','expenses']),10,0],[L(lang,['未払いの','残業代'],['미지급','잔업수당'],['Unpaid','overtime']),-15,0],[L(lang,['一時の','修繕費'],['일회성','수선비'],['One-off','repairs']),12,0],[L(lang,['一時の','補助金'],['일회성','보조금'],['One-off','subsidy']),-18,0],[L(lang,['正常収益力'],['정상 수익력'],['Normalised','earnings']),229,1,BS]],
 {h:372,base:262,sc:1.2,off:100,x0:44,step:104,bw:74,ly:286,note:L(lang,'足す調整だけでなく、引く調整も探す。※ 縦軸は100から','더하는 조정뿐 아니라 빼는 조정도 찾는다. ※ 세로축은 100부터','Look for adjustments that reduce earnings, not only those that add. * Axis starts at 100')})},
fin_net_assets:function(lang){return WF(L(lang,'帳簿の純資産を「実態純資産」に直す（百万円）','장부의 순자산을 「실질 순자산」으로 고친다(백만 엔)','From book net assets to real net assets (million yen)'),[
 [L(lang,['帳簿の','純資産'],['장부의','순자산'],['Book','net assets']),500,1,'#8A96A3'],[L(lang,['社長への','貸付金'],['사장','대여금'],['Loan to','the owner']),-60,0],[L(lang,['古い売掛金','・在庫'],['오래된 채권','·재고'],['Old receivables','and stock']),-20,0],[L(lang,['退職給付の','積立不足'],['퇴직급여','미적립'],['Pension','shortfall']),-80,0],[L(lang,['未払いの','残業代'],['미지급','잔업수당'],['Unpaid','overtime']),-30,0],[L(lang,['保険の','含み益'],['보험의','평가이익'],['Gain on','insurance']),30,0],[L(lang,['実態純資産'],['실질 순자산'],['Real net','assets']),340,1,BS]],
 {h:372,base:262,sc:0.6,off:200,x0:52,step:118,bw:82,ly:286,note:L(lang,'差の160は、決算書を読むだけでは見えない。※ 縦軸は200から','차이 160은 결산서를 읽는 것만으로는 보이지 않는다. ※ 세로축은 200부터','The gap of 160 cannot be seen from the accounts alone. * Axis starts at 200')})},
fin_report_map:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 370" role="img">'+Rc(0,0,900,370,'#F7FAFD');
 function bx(x,y,w,h,c,t1,t2){var o=Rc(x,y,w,h,'#fff',12,' stroke="'+c+'" stroke-width="3"')+tx(x+w/2,y+25,t1,14.5,c,800);t2.forEach(function(l,j){o+=tx(x+w/2,y+46+j*15,l,11.5,D,600)});return o}
 function ln(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+G+'" stroke-width="2"/>'}
 s+=ln(450,104,450,124)+ln(165,124,735,124);[165,450,735].forEach(function(x){s+=ln(x,124,x,142)+ln(x,222,x,252)});
 s+=bx(230,36,440,68,PL,L(lang,'① 結論','① 결론','1. Conclusion'),L(lang,['投資するか・いくらで・どんな条件で'],['투자할 것인가·얼마에·어떤 조건으로'],['Invest or not, at what price, on what terms']));
 var M=[[L(lang,'② 事業','② 사업','2. Business'),L(lang,['何で稼ぎ、誰が払い、','なぜ続くか'],['무엇으로 벌고 누가 내며','왜 이어지는가'],['What it earns from, who pays,','and why it lasts'])],[L(lang,'③ 数字','③ 숫자','3. Numbers'),L(lang,['正常収益力・実態純資産・','純有利子負債'],['정상 수익력·실질 순자산·','순차입금'],['Normalised earnings, real','net assets, net debt'])],[L(lang,'④ 価値','④ 가치','4. Value'),L(lang,['倍率とDCFで幅を出し、','価格を決める'],['배수와 DCF로 범위를 내고','가격을 정한다'],['A range from multiples','and DCF, then a price'])]];
 var B=[[L(lang,'⑤ リスクと対応','⑤ 리스크와 대응','5. Risks and responses'),L(lang,['価格・契約・条件の','どれで受けるか'],['가격·계약·조건 가운데','어느 것으로 받을까'],['Price, contract or','condition?'])],[L(lang,'⑥ 投資の形と回収','⑥ 투자 구조와 회수','6. Structure and exit'),L(lang,['出資と借入、買ったあとの','計画、出口'],['출자와 차입, 인수 후의','계획, 회수'],['Equity and debt, the plan','after buying, the exit'])],[L(lang,'⑦ 次にすること','⑦ 다음에 할 일','7. Next steps'),L(lang,['追加の確認、日程、','承認を求める事項'],['추가 확인, 일정,','승인을 구하는 사항'],['Further checks, timetable,','approvals sought'])]];
 [40,325,610].forEach(function(x,i){s+=bx(x,142,250,80,BS,M[i][0],M[i][1])+bx(x,252,250,80,CF,B[i][0],B[i][1])});
 s+=tx(450,356,L(lang,'読む人は上から読む。書く人は③の数字から固めて、①を最後に書く','읽는 사람은 위에서부터 읽는다. 쓰는 사람은 ③ 숫자부터 굳히고 ①을 마지막에 쓴다','Readers start at the top; the writer firms up box 3 first and writes box 1 last'),12.5,D,600);
 return s+'</svg>'},
fin_value_range:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" role="img">'+Rc(0,0,900,330,'#F7FAFD'),x0=280,sc=0.47;function X(v){return x0+v*sc}
 s+='<line x1="'+X(0)+'" y1="262" x2="'+X(1200)+'" y2="262" stroke="'+D+'" stroke-width="2"/>';[0,200,400,600,800,1000,1200].forEach(function(v){s+='<line x1="'+X(v)+'" y1="262" x2="'+X(v)+'" y2="268" stroke="'+D+'" stroke-width="2"/>'+tx(X(v),284,v.toLocaleString('en-US'),11.5,G,600)});
 var Rw=[[L(lang,'倍率法（EBITDAの5〜6倍）','배수법(EBITDA의 5~6배)','Multiples (5–6× EBITDA)'),685,914,PL],[L(lang,'DCF（割引率8〜10%）','DCF(할인율 8~10%)','DCF (8–10% discount rate)'),762,1111,CF]];
 Rw.forEach(function(r,i){var y=84+i*58;s+=tx(x0-16,y+24,r[0],12.5,D,800,'end')+Rc(X(r[1]),y,(r[2]-r[1])*sc,36,r[3],8)+tx(X(r[1])-7,y+24,r[1].toLocaleString('en-US'),12.5,D,800,'end')+tx(X(r[2])+7,y+24,r[2].toLocaleString('en-US'),12.5,D,800,'start')});
 s+=tx(x0-16,224,L(lang,'実態純資産（下の目安）','실질 순자산(아래쪽 기준)','Real net assets (a floor)'),12.5,D,800,'end')+Rc(X(340)-6,200,12,36,BS,4)+tx(X(340)+14,224,'340',12.5,BS,800,'start');
 s+='<line x1="'+X(800)+'" y1="66" x2="'+X(800)+'" y2="258" stroke="'+D+'" stroke-width="2.5" stroke-dasharray="6 4"/>'+tx(X(800),58,L(lang,'提示する価格 800','제시 가격 800','Offer 800'),13,D,800);
 s+=tx(450,28,L(lang,'ミナト・グランドサービスの株式の価値：方法ごとの幅を重ねる','미나토 그라운드 서비스의 주식 가치: 방법별 범위를 겹쳐 본다','Minato Ground Services, equity value: overlaying the range from each method'),12.5,D,600)+tx(X(1200),308,L(lang,'（百万円）','(백만 엔)','(million yen)'),11.5,G,600,'end');
 return s+'</svg>'},
/* ===== Part 7 追加の図（2026.10） ===== */
fin_multiples:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 320" role="img">'+Rc(0,0,900,320,'#F7FAFD'),x0=262,sc=47,xu=L(lang,'倍','배','×');
 var Rw=[[L(lang,'PER（利益の何倍か）','PER(이익의 몇 배인가)','PER (times earnings)'),11.8,PL,L(lang,'株価1,500 ÷ 1株利益127','주가 1,500 ÷ 주당순이익 127','Price 1,500 ÷ EPS 127')],[L(lang,'EV/EBITDA（事業の値段）','EV/EBITDA(사업의 값)','EV/EBITDA (the business)'),4.5,D,'EV 2,232 ÷ EBITDA 501'],[L(lang,'PBR（純資産の何倍か）','PBR(순자산의 몇 배인가)','PBR (times net assets)'),0.77,BS,L(lang,'株価1,500 ÷ 1株純資産1,942','주가 1,500 ÷ 주당순자산 1,942','Price 1,500 ÷ book value 1,942')]];
 Rw.forEach(function(r,i){var y=74+i*76;s+=tx(x0-14,y+17,r[0],13,D,800,'end')+tx(x0-14,y+35,r[3],11.5,G,600,'end')+Rc(x0,y,r[1]*sc,40,r[2],6)+tx(x0+Math.max(r[1],1)*sc+10,y+26,r[1]+xu,15,r[2],800,'start')});
 s+='<line x1="'+(x0+sc)+'" y1="60" x2="'+(x0+sc)+'" y2="282" stroke="'+R+'" stroke-width="2" stroke-dasharray="5 4"/>'+tx(x0+sc,54,'1'+xu,12,R,800);
 s+=tx(450,28,L(lang,'倍率を長さで見る。1倍の線より短いPBRは、株価が純資産を下回っている','배수를 길이로 본다. 1배 선보다 짧은 PBR은 주가가 순자산을 밑돈다는 뜻','Multiples as lengths. A PBR shorter than the 1× line means the price is below net assets'),12.5,D,600)+tx(450,304,L(lang,'Vela Air 3年目（株価1,500円・1億株と仮定）','Vela Air 3년 차(주가 1,500엔·1억 주로 가정)','Vela Air year 3 (assuming 1,500 yen a share, 100 million shares)'),11.5,G,600);
 return s+'</svg>'},
fin_discount:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" role="img">'+Rc(0,0,900,340,'#F7FAFD'),base=262,sc=1.3;
 var F1=[110,115,120,125,130],P1=[104.8,104.3,103.7,102.8,101.9],Yn=[4,5,6,7,8];
 F1.forEach(function(v,i){var x=96+i*156;s+=Rc(x,base-v*sc,58,v*sc,'#fff',5,' stroke="'+G+'" stroke-width="2"')+tx(x+29,base-v*sc-8,v,13.5,D,800)+Rc(x+66,base-P1[i]*sc,58,P1[i]*sc,PL,5)+tx(x+95,base-P1[i]*sc-8,P1[i].toFixed(1),13.5,PL,800)+tx(x+62,base+22,L(lang,Yn[i]+'年目',Yn[i]+'년 차','Year '+Yn[i]),13,D,800)});
 s+='<line x1="60" y1="'+base+'" x2="860" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>';
 s+=Rc(250,306,14,14,'#fff',3,' stroke="'+G+'" stroke-width="2"')+tx(270,318,L(lang,'その年に受け取る現金','그해에 받는 현금','Cash received that year'),12,D,600,'start')+Rc(500,306,14,14,PL,3)+tx(520,318,L(lang,'今日の価値（割引率5%）','오늘의 가치(할인율 5%)','Value today (5% discount rate)'),12,D,600,'start');
 s+=tx(450,28,L(lang,'先の年の現金ほど、今日の価値に直すと小さくなる（億円）','먼 해의 현금일수록 오늘의 가치로 고치면 작아진다(억 엔)','The further out the cash, the smaller its value today (100m yen)'),12.5,D,600);
 return s+'</svg>'},
fin_bs_check:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+Rc(0,0,900,380,'#F7FAFD'),sc=0.18,y0=70,ck=L(lang,'（確かめる）','(확인)',' (check)');
 var As=[[L(lang,'現金','현금','Cash'),300,0],[L(lang,'売掛金','매출채권','Receivables'),400,1],[L(lang,'車両・機材（GSE）','차량·장비(GSE)','Vehicles and equipment'),500,0],[L(lang,'保険積立金','보험 적립금','Insurance reserves'),120,1],[L(lang,'社長への貸付金','사장 대여금','Loan to the owner'),60,1],[L(lang,'その他','기타','Other'),120,0]];
 var Ls=[[L(lang,'借入金','차입금','Borrowings'),600,'#E3E8EE'],[L(lang,'買掛金・未払金など','매입채무·미지급금 등','Payables and accruals'),400,'#E3E8EE'],[L(lang,'純資産','순자산','Net assets'),500,'#CDE6E1']];
 var y=y0;As.forEach(function(a){var h=a[1]*sc;s+=Rc(250,y,200,h,a[2]?'#FBD9DE':'#DCEBFA',0,' stroke="#fff" stroke-width="2"')+tx(240,y+h/2+4,a[0]+' '+a[1]+(a[2]?ck:''),12,a[2]?R:D,700,'end');y+=h});
 y=y0;Ls.forEach(function(a){var h=a[1]*sc;s+=Rc(450,y,200,h,a[2],0,' stroke="#fff" stroke-width="2"')+tx(660,y+h/2+4,a[0]+' '+a[1],12,D,700,'start');y+=h});
 s+=Rc(250,y0,400,1500*sc,'none',0,' stroke="'+D+'" stroke-width="2"')+tx(350,y0-10,L(lang,'資産 1,500','자산 1,500','Assets 1,500'),13,D,800)+tx(550,y0-10,L(lang,'負債・純資産 1,500','부채·순자산 1,500','Liabilities and net assets 1,500'),13,D,800);
 s+=tx(450,28,L(lang,'決算書のとおりの貸借対照表（百万円）。赤い項目は、帳簿の金額どおりの価値があるかを確かめる','결산서 그대로의 재무상태표(백만 엔). 빨간 항목은 장부 금액만큼의 가치가 있는지 확인한다','The balance sheet as reported (million yen). Check whether the red items are worth their book amounts'),12.5,D,600);
 return s+'</svg>'},
fin_net_debt:function(lang){return WF(L(lang,'借入金600が、純有利子負債460になるまで（百万円）','차입금 600이 순차입금 460이 되기까지(백만 엔)','From borrowings of 600 to net debt of 460 (million yen)'),[
 [L(lang,['借入金'],['차입금'],['Borrowings']),600,1,'#8A96A3'],[L(lang,['帳簿にない','リース'],['장부에 없는','리스'],['Leases not','on the books']),50,0,R],[L(lang,['退職給付の','積立不足'],['퇴직급여','미적립'],['Pension','shortfall']),80,0,R],[L(lang,['未払いの','残業代'],['미지급','잔업수당'],['Unpaid','overtime']),30,0,R],[L(lang,['現金'],['현금'],['Cash']),-300,0,BS],[L(lang,['純有利子負債'],['순차입금'],['Net debt']),460,1,D]],
 {h:372,base:262,sc:0.25,x0:52,step:138,bw:92,ly:286,note:L(lang,'借入とみなす項目が増えるほど、株式の値段は下がる','차입으로 보는 항목이 늘수록 주식의 값은 내려간다','The more items are treated as debt, the lower the price of the shares')})},
fin_memo_page:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 390" role="img">'+Rc(0,0,900,390,'#F7FAFD');
 s+=Rc(40,44,820,52,'#EAF3FD',10,' stroke="'+PL+'" stroke-width="2.5"')+tx(450,76,L(lang,'結論：条件つきで投資する ― 株式800（企業価値1,260、正常収益力の5.5倍）','결론: 조건부로 투자한다 — 주식 800(기업가치 1,260, 정상 수익력의 5.5배)','Conclusion: invest, with conditions — 800 for the shares (EV 1,260; 5.5× normalised earnings)'),14,D,800);
 function bx(x,t,c,ls){var o=Rc(x,108,400,150,'#fff',10,' stroke="'+c+'" stroke-width="2.5"')+tx(x+16,134,t,13.5,c,800,'start');ls.forEach(function(l,j){o+=tx(x+16,162+j*28,l,12,D,600,'start')});return o}
 s+=bx(40,L(lang,'理由','이유','Reasons'),BS,L(lang,['① 正常収益力は229。決算書のEBITDAより27%高い','② 純有利子負債は正常収益力の2.0倍で、返済できる','③ 計画どおりなら5年で1.7倍（年10.9%）'],['① 정상 수익력은 229. 결산서의 EBITDA보다 27% 높다','② 순차입금은 정상 수익력의 2.0배로 갚을 수 있다','③ 계획대로라면 5년에 1.7배(연 10.9%)'],['1. Normalised earnings 229: 27% above reported','2. Net debt is 2.0× normalised earnings and repayable','3. On plan: 1.7× in five years (10.9% a year)']));
 s+=bx(460,L(lang,'いちばん大きいリスクと受け止め方','가장 큰 리스크와 받아 내는 법','The largest risk and how it is absorbed'),R,L(lang,['最大の得意先が売上の45%、契約は1年更新','→ 継続の意向の確認を、実行の条件にする','悪い場合：5年後の株式の価値は831（ほぼ元本）'],['가장 큰 거래처가 매출의 45%, 계약은 1년 갱신','→ 계속 의사의 확인을 거래 종결의 조건으로 한다','나쁜 경우: 5년 뒤 주식 가치는 831(거의 원금)'],['Largest customer is 45% of sales, on a yearly contract','→ Its intention to continue is a condition of completion','Downside: equity worth 831 in five years (about cost)']));
 var K=[[L(lang,'正常収益力','정상 수익력','Normalised earnings'),'229'],[L(lang,'実態純資産','실질 순자산','Real net assets'),'340'],[L(lang,'純有利子負債','순차입금','Net debt'),'460'],[L(lang,'提示する価格','제시 가격','Proposed price'),'800']];
 K.forEach(function(k,i){var x=40+i*208;s+=Rc(x,272,196,62,'#fff',10,' stroke="'+G+'" stroke-width="1.5"')+tx(x+98,295,k[0],12,G,700)+tx(x+98,321,k[1],19,D,800)});
 s+=tx(450,28,L(lang,'結論のページの見本（ミナト・グランドサービス、百万円、数字は架空）','결론 쪽의 견본(미나토 그라운드 서비스, 백만 엔, 숫자는 가상)','A sample conclusion page (Minato Ground Services, million yen, fictional figures)'),12.5,D,600)+tx(450,366,L(lang,'結論・理由・いちばん大きいリスク・主な数字を、1ページに収める','결론·이유·가장 큰 리스크·주요 숫자를 한 쪽에 담는다','Conclusion, reasons, the largest risk and the key figures on one page'),12.5,D,600);
 return s+'</svg>'},
fin_return_bridge:function(lang){return WF(L(lang,'株式の価値が800から1,340になる内訳（百万円、計画）','주식 가치가 800에서 1,340이 되는 내역(백만 엔, 계획)','How equity value grows from 800 to 1,340 (million yen, plan)'),[
 [L(lang,['買うときの','株式の価値'],['살 때의','주식 가치'],['Equity value','at purchase']),800,1,PL],[L(lang,['EBITDAの成長','（229 → 280）'],['EBITDA의 성장','(229 → 280)'],['EBITDA growth','(229 → 280)']),280,0],[L(lang,['借入の返済','（460 → 200）'],['차입 상환','(460 → 200)'],['Debt repaid','(460 → 200)']),260,0],[L(lang,['5年後の','株式の価値'],['5년 뒤의','주식 가치'],['Equity value','in five years']),1340,1,BS]],
 {h:372,base:262,sc:0.14,x0:95,step:200,bw:130,ly:286,note:L(lang,'倍率は5.5倍のまま。増える分は、稼ぎの成長と借入の返済から生まれる','배수는 5.5배 그대로. 늘어나는 몫은 벌이의 성장과 차입 상환에서 나온다','The multiple stays at 5.5×: the gain comes from earnings growth and debt repayment')})},
/* ===== Part 8 の図（2026.10）。年間の日程の図は下の TLN() で描く ===== */
fin_gaap_map:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" role="img">'+Rc(0,0,900,330,'#F7FAFD');
 function tg(x,y,t,c){var w=22;for(var i=0;i<t.length;i++)w+=t.charCodeAt(i)>255?12.6:7;return [Rc(x,y,w,30,'#fff',15,' stroke="'+c+'" stroke-width="2.5"')+tx(x+w/2,y+20,t,12,c,800),w]}
 var jg=L(lang,'日本基準','일본 기준','Japanese GAAP');
 var rows=[[L(lang,['上場会社'],['상장회사'],['Listed','companies']),[[jg,BS],[L(lang,'IFRS（任意）','IFRS(임의)','IFRS (optional)'),PL],[L(lang,'米国基準','미국 기준','US GAAP'),G],[L(lang,'修正国際基準','수정국제기준','JMIS'),G]],[[L(lang,'K-IFRS（義務）','K-IFRS(의무)','K-IFRS (mandatory)'),PL]]],
  [L(lang,['非上場','（監査を受ける会社）'],['비상장','(감사를 받는 회사)'],['Unlisted,','audited']),[[jg,BS]],[[L(lang,'一般企業会計基準','일반기업회계기준','K-GAAP'),CF],[L(lang,'K-IFRS（選択）','K-IFRS(선택)','K-IFRS (optional)'),PL]]],
  [L(lang,['中小企業'],['중소기업'],['Small','companies']),[[L(lang,'中小会計指針・要領','중소회계지침·요령','SME guidelines'),BS]],[[L(lang,'中小企業会計基準','중소기업회계기준','SME standard'),CF]]]];
 s+=tx(390,62,L(lang,'日本','일본','Japan'),15,D,800)+tx(734,62,L(lang,'韓国','한국','Korea'),15,D,800);
 rows.forEach(function(r,i){var y=80+i*76,x=196;s+=Rc(24,y,852,64,i%2?'#fff':'#EEF3F8',10);r[0].forEach(function(l,j){s+=tx(40,y+(r[0].length>1?28:38)+j*17,l,12.5,D,800,'start')});
  r[1].forEach(function(q){var a=tg(x,y+17,q[0],q[1]);s+=a[0];x+=a[1]+8});x=600;r[2].forEach(function(q){var a=tg(x,y+17,q[0],q[1]);s+=a[0];x+=a[1]+8})});
 s+='<line x1="590" y1="46" x2="590" y2="304" stroke="'+G+'" stroke-width="1.5" stroke-dasharray="4 4"/>'+tx(450,28,L(lang,'どの会社が、どの基準で決算書を作るか','어느 회사가 어느 기준으로 결산서를 만드나','Which companies use which accounting standard'),12.5,D,600);
 return s+'</svg>'},
fin_pl_compare:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img">'+Rc(0,0,900,400,'#F7FAFD');
 var C=[[L(lang,'日本基準','일본 기준','Japanese GAAP'),BS,3,[L(lang,'売上高','매출액','Net sales'),L(lang,'売上総利益','매출총이익','Gross profit'),L(lang,'営業利益','영업이익','Operating profit'),L(lang,'経常利益','경상이익','Ordinary profit'),L(lang,'税金等調整前当期純利益','세금 등 조정 전 당기순이익','Profit before income taxes'),L(lang,'当期純利益','당기순이익','Net profit')]],
  [L(lang,'IFRS（日本の適用会社）','IFRS(일본의 적용 회사)','IFRS (Japanese adopters)'),PL,-1,[L(lang,'売上収益','매출수익','Revenue'),L(lang,'売上総利益','매출총이익','Gross profit'),L(lang,'営業利益（会社が定義）','영업이익(회사가 정의)','Operating profit (company-defined)'),null,L(lang,'税引前利益','세전이익','Profit before tax'),L(lang,'当期利益','당기이익','Profit for the year')]],
  [L(lang,'K-IFRS（現行）','K-IFRS(현행)','K-IFRS (current)'),CF,-1,[L(lang,'売上高','매출액','Revenue'),L(lang,'売上総利益','매출총이익','Gross profit'),L(lang,'営業利益（表示が義務）','영업이익(표시 의무)','Operating profit (required)'),null,L(lang,'税引前純利益','법인세비용차감전순이익','Profit before tax'),L(lang,'当期純利益','당기순이익','Net profit')]]];
 C.forEach(function(c,k){var x=30+k*290;s+=tx(x+130,62,c[0],14,c[1],800);c[3].forEach(function(l,i){var y=78+i*48;
  if(l===null)s+=Rc(x,y,260,36,'none',8,' stroke="'+G+'" stroke-width="1.5" stroke-dasharray="5 4"')+tx(x+130,y+23,'—',13,G,700);
  else s+=Rc(x,y,260,36,i===c[2]?c[1]:'#fff',8,' stroke="'+c[1]+'" stroke-width="2.5"')+tx(x+130,y+23,l,12.5,i===c[2]?'#fff':D,800)})});
 s+=tx(450,28,L(lang,'損益計算書の利益の段階を、基準ごとに並べる','손익계산서의 이익 단계를 기준별로 나란히 놓는다','The steps of profit on the income statement, by standard'),12.5,D,600)+tx(450,384,L(lang,'経常利益と特別損益の区分は、日本基準だけにある','경상이익과 특별손익의 구분은 일본 기준에만 있다','Ordinary profit and extraordinary items exist only under Japanese GAAP'),12.5,D,600);
 return s+'</svg>'},
fin_lease_timeline:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" role="img">'+Rc(0,0,900,300,'#F7FAFD'),x0=250,sc=50,X=function(y){return x0+(y-2018)*sc},O='#C9D2DC';
 var Rw=[[L(lang,'IFRS（IFRS第16号）','IFRS(IFRS 제16호)','IFRS (IFRS 16)'),2019],[L(lang,'K-IFRS（第1116号）','K-IFRS(제1116호)','K-IFRS (1116)'),2019],[L(lang,'日本基準','일본 기준','Japanese GAAP'),2027.25]];
 Rw.forEach(function(r,i){var y=72+i*52;s+=tx(x0-14,y+24,r[0],13,D,800,'end')+Rc(X(2018),y,X(r[1])-X(2018),36,O,0)+Rc(X(r[1]),y,X(2030.5)-X(r[1]),36,BS,0)+tx((X(r[1])+X(2030.5))/2,y+23,L(lang,'貸借対照表に載る','재무상태표에 실린다','On the balance sheet'),12.5,'#fff',800);
  if(i===2)s+=tx((X(2018)+X(r[1]))/2,y+23,L(lang,'オペレーティング・リースは注記だけ','운용리스는 주석만','Operating leases in the notes only'),12.5,D,700)+tx(X(r[1]),y+56,L(lang,'2027年4月以後に始まる年度から','2027년 4월 이후 시작하는 연도부터','Years starting on or after April 2027'),12,R,800)});
 s+='<line x1="'+X(2018)+'" y1="236" x2="'+X(2030.5)+'" y2="236" stroke="'+D+'" stroke-width="2"/>';[2018,2020,2022,2024,2026,2028,2030].forEach(function(y){s+='<line x1="'+X(y)+'" y1="236" x2="'+X(y)+'" y2="242" stroke="'+D+'" stroke-width="2"/>'+tx(X(y),258,y,11.5,G,600)});
 s+=tx(450,28,L(lang,'借りた機材や事務所が、貸借対照表に載るようになる時期','빌린 기재와 사무실이 재무상태표에 실리게 되는 시기','When leased aircraft and offices come onto the balance sheet'),12.5,D,600)+tx(450,286,L(lang,'2019年から2027年まで、日本基準の会社だけ資産と負債が小さく見える','2019년부터 2027년까지 일본 기준 회사만 자산과 부채가 작게 보인다','From 2019 to 2027, only Japanese GAAP companies show smaller assets and liabilities'),12.5,D,600);
 return s+'</svg>'},
fin_jp_disclosure:function(lang){var E=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],d45=L(lang,'45日以内が目安','45일 이내가 기준','within about 45 days');
 return TLN(L(lang,'日本の上場会社が決算のあとに出す書類（3月決算の例）','일본의 상장회사가 결산 뒤에 내는 서류(3월 결산의 예)','What a listed Japanese company publishes after its year-end (March year-end)'),[4,5,6,7,8,9,10,11,12,1,2,3].map(function(m){return L(lang,m+'月',m+'월',E[m])}),[
  [1.5,[L(lang,'決算短信（通期）','결산단신(연간)','Earnings release'),d45],PL],[3,[L(lang,'有価証券報告書','유가증권보고서','Securities report'),L(lang,'3か月以内','3개월 이내','within three months')],BS],[4.4,[L(lang,'第1四半期 決算短信','1분기 결산단신','Q1 earnings release'),d45],PL],[7.4,[L(lang,'半期報告書','반기보고서','Half-year report'),L(lang,'上半期のあと','상반기 뒤','after the first half')],BS],[10.4,[L(lang,'第3四半期 決算短信','3분기 결산단신','Q3 earnings release'),d45],PL]],
  L(lang,'速いのは決算短信（TDnet）、詳しいのは有価証券報告書（EDINET）','빠른 것은 결산단신(TDnet), 자세한 것은 유가증권보고서(EDINET)','Fast: the earnings release (TDnet). Detailed: the securities report (EDINET)'))},
fin_kr_disclosure:function(lang){var E=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],d45=L(lang,'45日以内','45일 이내','within 45 days');
 return TLN(L(lang,'韓国の上場会社が決算のあとに出す書類（12月決算の例）','한국의 상장회사가 결산 뒤에 내는 서류(12월 결산의 예)','What a listed Korean company files after its year-end (December year-end)'),[1,2,3,4,5,6,7,8,9,10,11,12].map(function(m){return L(lang,m+'月',m+'월',E[m])}),[
  [3,[L(lang,'事業報告書','사업보고서','Annual business report'),L(lang,'90日以内','90일 이내','within 90 days')],BS],[4.5,[L(lang,'第1四半期 分期報告書','1분기 분기보고서','Q1 report'),d45],PL],[7.5,[L(lang,'半期報告書','반기보고서','Half-year report'),d45],PL],[10.5,[L(lang,'第3四半期 分期報告書','3분기 분기보고서','Q3 report'),d45],PL]],
  L(lang,'すべてDART（電子公示システム）で見られる','모두 DART(전자공시시스템)에서 볼 수 있다','All of it is on DART, the electronic disclosure system'))},
fin_align:function(lang){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 236" role="img">'+Rc(0,0,900,236,'#F7FAFD');
 var B=[[L(lang,'① 会計基準','① 회계 기준','1. Standard'),L(lang,['日本基準・IFRS・','K-IFRS'],['일본 기준·IFRS·','K-IFRS'],['Japanese GAAP,','IFRS, K-IFRS']),BS],[L(lang,'② 決算期','② 결산기','2. Year-end'),L(lang,['3月と12月は','3か月ずれる'],['3월과 12월은','3개월 어긋난다'],['March and December','are three months apart']),PL],[L(lang,'③ 通貨と単位','③ 통화와 단위','3. Currency, units'),L(lang,['損益は平均レート、','残高は期末レート'],['손익은 평균환율,','잔액은 기말환율'],['Income at average rate,','balances at closing rate']),CF],[L(lang,'④ リースとのれん','④ 리스와 영업권','4. Leases, goodwill'),L(lang,['EBITDAとリース込みの','負債でならす'],['EBITDA와 리스 포함','부채로 고르게 한다'],['Even out with EBITDA','and debt incl. leases']),R],[L(lang,'並べて比べる','나란히 비교한다','Compare'),L(lang,['1枚の表に','前提と数字を置く'],['한 장의 표에','전제와 숫자를 놓는다'],['Assumptions and','figures on one page']),D]];
 B.forEach(function(b,i){var x=22+i*176;s+=Rc(x,60,156,108,i===4?'#EEF3F8':'#fff',12,' stroke="'+b[2]+'" stroke-width="3"')+tx(x+78,90,b[0],13,b[2],800);b[1].forEach(function(l,j){s+=tx(x+78,120+j*17,l,11,D,600)});if(i<4)s+=tx(x+166,121,'→',19,G,800)});
 s+=tx(450,28,L(lang,'日本の会社と韓国の会社を並べる前に、そろえる4つのこと','일본 회사와 한국 회사를 나란히 놓기 전에 맞출 네 가지','Four things to align before comparing a Japanese and a Korean company'),12.5,D,600)+tx(450,208,L(lang,'そろえた内容は、表のいちばん上に書いておく','맞춘 내용은 표의 맨 위에 적어 둔다','Write what you aligned at the top of the table'),12.5,D,600);
 return s+'</svg>'}
};
/* 滑り台（ウォーターフォール）グラフ。items：[ラベルの行の配列, 値, 1＝合計の棒／0＝増減の棒, 色]。o.off で縦軸の始まりを変える */
function WF(title,items,o){var off=o.off||0,run=off,s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 '+o.h+'" role="img">'+Rc(0,0,900,o.h,'#F7FAFD')+tx(450,28,title,12.5,D,600)+'<line x1="30" y1="'+o.base+'" x2="870" y2="'+o.base+'" stroke="'+D+'" stroke-width="2"/>';
 items.forEach(function(it,i){var x=o.x0+i*o.step,v=it[1],a,b,c;
  if(it[2]){a=off;b=v;c=it[3]||(v<0?R:PL)}else{a=run;b=run+v;c=it[3]||(v<0?R:BS)}run=b;
  var hi=Math.max(a,b),top=o.base-(hi-off)*o.sc,ht=Math.max(Math.abs(b-a)*o.sc,2),below=hi<=off&&off===0&&b<0;
  s+=Rc(x,top,o.bw,ht,c,5)+tx(x+o.bw/2,below?top+ht+16:top-7,(v<0?'−':(it[2]?'':'+'))+Math.abs(v).toLocaleString('en-US'),13.5,c===R?R:D,800);
  it[0].forEach(function(l,j){s+=tx(x+o.bw/2,o.ly+j*15,l,11.5,D,700)});
  if(i<items.length-1){var yl=o.base-(run-off)*o.sc;s+='<line x1="'+(x+o.bw)+'" y1="'+yl+'" x2="'+(x+o.step)+'" y2="'+yl+'" stroke="'+G+'" stroke-width="1.5" stroke-dasharray="3 3"/>'}});
 if(o.note)s+=tx(450,o.h-14,o.note,12.5,D,600);
 return s+'</svg>'}
/* 年間の日程の図。mo：12か月のラベル、ev：[位置（0〜12）, [名前, 期限], 色] */
function TLN(title,mo,ev,note){var x0=66,st=64,ax=172,s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" role="img">'+Rc(0,0,900,330,'#F7FAFD')+tx(450,28,title,12.5,D,600)+'<line x1="'+x0+'" y1="'+ax+'" x2="'+(x0+12*st)+'" y2="'+ax+'" stroke="'+D+'" stroke-width="2"/>';
 for(var i=0;i<=12;i++){s+='<line x1="'+(x0+i*st)+'" y1="'+(ax-5)+'" x2="'+(x0+i*st)+'" y2="'+(ax+5)+'" stroke="'+D+'" stroke-width="1.5"/>';if(i<12)s+=tx(x0+i*st+st/2,ax+20,mo[i],11.5,G,600)}
 ev.forEach(function(e,k){var x=x0+e[0]*st,up=k%2===0,by=up?56:214,c=e[2]||PL;
  s+='<line x1="'+x+'" y1="'+(up?by+62:ax+28)+'" x2="'+x+'" y2="'+(up?ax:by)+'" stroke="'+c+'" stroke-width="2"/><circle cx="'+x+'" cy="'+ax+'" r="6" fill="'+c+'"/>'+Rc(x-86,by,172,62,'#fff',10,' stroke="'+c+'" stroke-width="2.5"')+tx(x,by+26,e[1][0],12.5,c,800)+tx(x,by+46,e[1][1],11.5,D,600)});
 if(note)s+=tx(450,312,note,12.5,D,600);
 return s+'</svg>'}
for(var k in F)window.FIGS[k]=F[k];
})();

/* ===== Part 8 の2つ目の図（2026.10）。新しい作り方（幅640・縦に積む・文は折り返す）。figs_met.js の window.FIGH を使うので、view.html で figs_met.js を先に読み込む ===== */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,FS=H.FS,LI=H.LINES,setK=H.setK,ARW=H.ARW;
var D=H.C.D,G=H.C.G,PL='#2F8FE0',BS='#1F7A6E',CF='#E08A2F',RD='#C2344F',GN='#1F8A5B',NV='#0f3558',GY='#9AA9B8';
function svg(h,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+Math.ceil(h)+'" role="img">'+R(0,0,640,Math.ceil(h),'#F7FAFD')+body+'</svg>'}
function hgt(s,sz,w){return LI(s,sz,w).length*FS(sz)*1.3}
function TW2(x,top,s,sz,c,w,maxw,a){var n=LI(s,sz,maxw).length,lh=FS(sz)*1.3;return WR(x,top+FS(sz)*0.95+(n-1)*lh/2,s,sz,c,w,maxw,a)}
function ttlH(s){return Math.max(58,30+hgt(s,15,600)+14)}
function BOX(y,s,bg,c,sz){sz=sz||12;var h=hgt(s,sz,560)+18;return [R(20,y,600,h,bg,10)+TW2(320,y+9,s,sz,c,900,560),h]}
function NOTE(y,s){var h=hgt(s,11.5,580);return [TW2(320,y,s,11.5,G,700,580),h]}

/* 8-1 基準はどこに書いてあるか。行：[書類, どこ, 書いてある文（原文）, 意味] */
var WHERE={
 ja:['基準は、ここに書いてある',[['日本の決算短信','表紙のタイトル','2026年3月期 決算短信〔IFRS〕（連結）','〔 〕の中が基準。〔日本基準〕〔IFRS〕など',CF],['日本の有価証券報告書','「経理の状況」のいちばん初め','連結財務諸表の作成方法について','どの基準で連結財務諸表を作ったかが書いてある',PL],['韓国の事業報告書・監査報告書','財務諸表の注記「재무제표 작성기준」','한국채택국제회계기준(K-IFRS)에 따라 작성','K-IFRSか、一般企業会計基準かが書いてある',BS]],'航空会社の例',['JAL ― IFRS','ANA ― 日本基準','大韓航空・チェジュ航空 ― K-IFRS'],'数字を比べる前に、まず基準を確かめます。'],
 ko:['기준은 여기에 적혀 있다',[['일본의 결산단신','표지의 제목','2026年3月期 決算短信〔IFRS〕（連結）','〔 〕 안이 기준. 〔日本基準〕〔IFRS〕 등',CF],['일본의 유가증권보고서','「経理の状況」의 맨 처음','連結財務諸表の作成方法について','어느 기준으로 연결재무제표를 만들었는지 적혀 있다',PL],['한국의 사업보고서·감사보고서','재무제표 주석 「재무제표 작성기준」','한국채택국제회계기준(K-IFRS)에 따라 작성','K-IFRS인지 일반기업회계기준인지 적혀 있다',BS]],'항공사의 예',['JAL — IFRS','ANA — 일본 기준','대한항공·제주항공 — K-IFRS'],'숫자를 비교하기 전에 먼저 기준을 확인합니다.'],
 en:['Where the accounting standard is stated',[['Japanese earnings release (kessan tanshin)','The title on the cover','2026年3月期 決算短信〔IFRS〕（連結）','The standard is in the brackets: 〔日本基準〕 (Japanese GAAP), 〔IFRS〕 and so on',CF],['Japanese annual securities report','The start of “経理の状況” (financial information)','連結財務諸表の作成方法について','States which standard the consolidated statements follow',PL],['Korean business report and audit report','The note “재무제표 작성기준” (basis of preparation)','한국채택국제회계기준(K-IFRS)에 따라 작성','States K-IFRS or Korean general accounting standards',BS]],'Airline examples',['JAL: IFRS','ANA: Japanese GAAP','Korean Air, Jeju Air: K-IFRS'],'Check the standard before you compare any numbers.']};
function whereFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 d[1].forEach(function(r){var c=r[4],h0=hgt(r[0],13,560)+14,h1=hgt(r[1],11.5,540),h2=hgt(r[2],12.5,520)+14,h3=hgt(r[3],11.5,540),y0=y;
  var g=R(20,y,600,h0,c,10)+TW2(36,y+7,r[0],13,'#fff',900,560,'start'),yy=y+h0+8;
  g+=TW2(36,yy,r[1],11.5,G,800,540,'start');yy+=h1+6;
  g+=R(36,yy,568,h2,'#FFF8E1',6,' stroke="#E0B84A" stroke-width="1.5"')+TW2(48,yy+7,r[2],12.5,D,900,520,'start');yy+=h2+6;
  g+=TW2(36,yy,r[3],11.5,D,700,540,'start');yy+=h3+12;
  s+=R(20,y0,600,yy-y0,'#fff',10,' stroke="'+c+'" stroke-width="2"')+g;y=yy+10});
 var hh=hgt(d[2],12.5,560)+14;s+=R(20,y,600,hh,NV,10)+TW2(320,y+7,d[2],12.5,'#fff',900,560);y+=hh+8;
 d[3].forEach(function(t,i){var h=hgt(t,12,540)+14;s+=R(20,y,600,h,i%2?'#fff':'#EEF4FA',8)+TW2(36,y+7,t,12,D,800,540,'start');y+=h+4});
 y+=8;var n=NOTE(y,d[4]);s+=n[0];y+=n[1]+16;return svg(y,s)}}

/* 8-2 営業利益を同じ範囲にそろえる。行：[名前, 始まり, 終わり, 色, 値の表示] */
var BRG={
 ja:['営業利益を、同じ範囲にそろえる（例）',['A社（日本基準）','B社（IFRS）'],[['営業利益（発表）',0,100,PL,'100']],[['営業利益（発表）',0,90,GY,'90'],['＋ 減損損失（臨時の損失を戻す）',90,110,GN,'+20'],['－ 固定資産の売却益（臨時の利益を引く）',100,110,RD,'−10'],['そろえたあとの営業利益',0,100,PL,'100']],'発表の数字は100と90ですが、範囲をそろえると同じです。日本基準では、減損損失と売却益は営業利益の外（特別損益）に出ます。','架空の数字（億円）。実際には、注記で何が営業利益に入っているかを確かめてから直します。'],
 ko:['영업이익을 같은 범위로 맞춘다(예)',['A사(일본 기준)','B사(IFRS)'],[['영업이익(발표)',0,100,PL,'100']],[['영업이익(발표)',0,90,GY,'90'],['＋ 손상차손(임시 손실을 되돌린다)',90,110,GN,'+20'],['－ 고정자산 매각이익(임시 이익을 뺀다)',100,110,RD,'−10'],['맞춘 뒤의 영업이익',0,100,PL,'100']],'발표 숫자는 100과 90이지만, 범위를 맞추면 같습니다. 일본 기준에서는 손상차손과 매각이익이 영업이익 밖(특별손익)에 나옵니다.','가상의 숫자(억 엔). 실제로는 주석에서 무엇이 영업이익에 들어 있는지 확인한 뒤에 고칩니다.'],
 en:['Putting operating profit on the same footing (example)',['Company A (Japanese GAAP)','Company B (IFRS)'],[['Operating profit (reported)',0,100,PL,'100']],[['Operating profit (reported)',0,90,GY,'90'],['+ Impairment loss (add back a one-off loss)',90,110,GN,'+20'],['− Gain on sale of fixed assets (remove a one-off gain)',100,110,RD,'−10'],['Operating profit after alignment',0,100,PL,'100']],'The reported figures are 100 and 90, but on the same footing they are equal. Under Japanese GAAP, impairment losses and gains on sale sit outside operating profit, in extraordinary items.','Fictional figures (100 million yen). In practice, check the notes to see what operating profit includes before adjusting.']};
function brgFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),X=function(v){return 36+430*v/110},bh=Math.max(18,FS(12)*0.95);
 [[d[1][0],d[2],NV],[d[1][1],d[3],CF]].forEach(function(co){var y0=y,hh=hgt(co[0],13,560)+14,g=R(20,y,600,hh,co[2],10)+TW2(36,y+7,co[0],13,'#fff',900,560,'start'),yy=y+hh+10;
  co[1].forEach(function(r){var hl=hgt(r[0],12,560);g+=TW2(36,yy,r[0],12,D,800,560,'start');yy+=hl+4;
   g+=R(X(Math.min(r[1],r[2])),yy,Math.abs(X(r[2])-X(r[1])),bh,r[3],4)+tx(X(Math.max(r[1],r[2]))+8,yy+bh/2+FS(12)*0.35,r[4],12,r[3]===GY?G:r[3],900,'start')+(r[1]>0?'<line x1="'+X(r[1])+'" y1="'+(yy-4)+'" x2="'+X(r[1])+'" y2="'+(yy+bh+4)+'" stroke="#9AA9B8" stroke-width="1.5" stroke-dasharray="3 3"/>':'');yy+=bh+12});
  s+=R(20,y0,600,yy-y0,'#fff',10,' stroke="'+co[2]+'" stroke-width="2"')+g;y=yy+10});
 var b=BOX(y,d[4],'#E4F0FB','#1B5FA6',12);s+=b[0];y+=b[1]+10;var n=NOTE(y,d[5]);s+=n[0];y+=n[1]+16;return svg(y,s)}}

/* 8-3 のれんの10年：日本基準は毎年減り、IFRSは残って減損で一度に減る */
var GW={
 ja:['のれんの10年 ― 償却する基準、しない基準（例）',['日本基準 ― 20年以内に償却（ここでは10年）','のれんは毎年10ずつ減る。営業利益も毎年10下がる'],['IFRS・K-IFRS ― 償却しない','ふだんは100のまま。6年目に減損で60減り、その年の利益が一度に下がる'],'年','買収のときに100ののれんが生まれた場合。数字は考え方を示す架空の例です。','買収が多い会社を比べるときは、のれんの償却の分を足し戻してから並べます（EBITDAなど）。'],
 ko:['영업권의 10년 — 상각하는 기준, 하지 않는 기준(예)',['일본 기준 — 20년 이내에 상각(여기서는 10년)','영업권은 해마다 10씩 줄어든다. 영업이익도 해마다 10 내려간다'],['IFRS·K-IFRS — 상각하지 않는다','평소에는 100 그대로. 6년째에 손상으로 60이 줄고, 그해 이익이 한꺼번에 내려간다'],'년','인수 때 100의 영업권이 생긴 경우. 숫자는 개념을 보여 주는 가상의 예입니다.','인수가 많은 회사를 비교할 때는 영업권 상각만큼을 더해 되돌린 뒤 나란히 놓습니다(EBITDA 등).'],
 en:['Ten years of goodwill: amortised under one standard, not under another (example)',['Japanese GAAP: amortised within 20 years (10 here)','Goodwill falls by 10 a year, and so does operating profit'],['IFRS and K-IFRS: not amortised','It stays at 100. In year 6 an impairment removes 60, and that year’s profit falls in one go'],'Year','Goodwill of 100 arising on an acquisition. The figures are fictional, to show the idea.','When comparing acquisitive companies, add back goodwill amortisation first (EBITDA and similar).']};
function gwFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),f=FS(11),ch=120,bw=36,x0=64;
 [[d[1],[100,90,80,70,60,50,40,30,20,10,0],NV,-1],[d[2],[100,100,100,100,100,100,40,40,40,40,40],CF,6]].forEach(function(p){var y0=y,hh=hgt(p[0][0],13,560)+14,g=R(20,y,600,hh,p[2],10)+TW2(36,y+7,p[0][0],13,'#fff',900,560,'start'),yy=y+hh+14,base=yy+ch;
  g+='<line x1="'+(x0-6)+'" y1="'+base+'" x2="'+(x0+11*48)+'" y2="'+base+'" stroke="'+D+'" stroke-width="2"/>'+tx(x0-10,yy+f*0.35,'100',11,G,700,'end')+tx(x0-10,base+f*0.35,'0',11,G,700,'end');
  p[1].forEach(function(v,i){var h=ch*v/100,hot=i===p[3];g+=(v?R(x0+i*48,base-h,bw,h,hot?RD:(p[2]===NV?PL:CF),3):'')+(hot?R(x0+i*48,base-ch,bw,ch-h,'none',3,' stroke="'+RD+'" stroke-width="2" stroke-dasharray="5 4"'):'')+tx(x0+i*48+bw/2,base+f*1.25,String(i),11,hot?RD:G,hot?900:700)});
  yy=base+f*1.25+4;g+=tx(x0+5*48+bw/2,yy+f,d[3],11,G,700);yy+=f+6;
  var ht=hgt(p[0][1],12,560);g+=TW2(36,yy+6,p[0][1],12,D,800,560,'start');yy+=ht+18;
  s+=R(20,y0,600,yy-y0,'#fff',10,' stroke="'+p[2]+'" stroke-width="2"')+g;y=yy+10});
 var n=NOTE(y,d[4]);s+=n[0];y+=n[1]+8;var b=BOX(y,d[5],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 8-4 知りたいこと → 開く書類。行：[知りたいこと, 開く書類, 色] */
var PICK={
 ja:['知りたいことで、開く書類を決める',[['今期の数字と、来期の予想','決算短信の1ページ目',CF],['部門・路線別・機材','有価証券報告書「事業の状況」「設備の状況」、決算説明資料',PL],['リース、借入の返済の予定、年金','有価証券報告書の注記',PL],['大株主、役員、従業員の数、平均の給与','有価証券報告書「提出会社の状況」',PL],['過去の書類をまとめて','EDINET（金融庁）で、会社名か証券コードで検索',BS]],['決算短信：速報。会社のIRのページ・TDnet','有価証券報告書：詳しい。EDINET・会社のIRのページ','EDINET：検索も閲覧も無料'],'会社の業績予想が載るのは、日本の決算短信の特徴です。'],
 ko:['알고 싶은 것에 따라 열 서류를 정한다',[['이번 기의 숫자와 다음 기의 예상','결산단신(決算短信)의 첫 쪽',CF],['부문·노선별·기재','유가증권보고서 「事業の状況」「設備の状況」, 결산 설명 자료',PL],['리스, 차입 상환 일정, 연금','유가증권보고서의 주석',PL],['대주주, 임원, 종업원 수, 평균 급여','유가증권보고서 「提出会社の状況」',PL],['과거 서류를 한꺼번에','EDINET(일본 금융청)에서 회사명이나 증권 코드로 검색',BS]],['결산단신: 속보. 회사의 IR 페이지·TDnet','유가증권보고서: 자세하다. EDINET·회사의 IR 페이지','EDINET: 검색도 열람도 무료'],'회사의 실적 예상이 실리는 것은 일본 결산단신의 특징입니다.'],
 en:['Choose the document by what you want to know',[['This year’s figures and next year’s forecast','Page one of the earnings release (kessan tanshin)',CF],['Segments, routes, fleet','Annual securities report: “事業の状況” and “設備の状況”; results presentation',PL],['Leases, debt repayment schedule, pensions','Notes in the annual securities report',PL],['Major shareholders, directors, headcount, average pay','Annual securities report: “提出会社の状況”',PL],['Past filings in one place','EDINET (FSA): search by company name or securities code',BS]],['Earnings release: the quick summary. Company IR page, TDnet','Annual securities report: the detail. EDINET, company IR page','EDINET: free to search and read'],'Publishing the company’s own forecast is a distinctive feature of the Japanese earnings release.']};
function pickFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 d[1].forEach(function(r){var c=r[2],h1=hgt(r[0],12.5,548),h2=hgt(r[1],12,500)+12,h=h1+h2+24;
  s+=R(20,y,600,h,'#fff',10,' stroke="#DCE3EA" stroke-width="1.5"')+TW2(36,y+8,r[0],12.5,D,900,548,'start')+ARW(46,y+14+h1,46,y+12+h1+h2-2,c,3.5)+R(64,y+12+h1,540,h2,c,8)+TW2(76,y+18+h1,r[1],12,'#fff',800,500,'start');y+=h+8});
 y+=4;[CF,PL,BS].forEach(function(c,i){var h=hgt(d[2][i],11.5,550);s+=R(24,y+FS(11.5)*0.28,18,FS(11.5)*0.75,c,4)+TW2(52,y,d[2][i],11.5,D,700,550,'start');y+=h+8});
 y+=4;var n=NOTE(y,d[3]);s+=n[0];y+=n[1]+16;return svg(y,s)}}

/* 8-5 韓国の外部監査の対象かどうか（上から順に確かめる） */
var AUD={
 ja:['韓国の上場していない会社 ― 監査報告書がDARTにあるか（判定の順）',['上場会社か、上場を準備している会社か','直前の事業年度の資産総額、または売上高が500億ウォン以上か','次の4つのうち2つ以上に当てはまるか：資産総額120億ウォン以上、負債総額70億ウォン以上、売上高100億ウォン以上、従業員100人以上'],['はい','いいえ'],'外部監査の対象 → 監査報告書（財務諸表と注記）がDARTで公開される','外部監査の対象ではない → DARTに監査報告書はない','株式会社の場合。有限会社は要件が少し違います。金額は直前の事業年度で見ます。'],
 ko:['한국의 비상장회사 — 감사보고서가 DART에 있는가(판정 순서)',['상장회사이거나 상장을 준비하는 회사인가','직전 사업연도의 자산총액 또는 매출액이 500억 원 이상인가','다음 넷 가운데 둘 이상에 해당하는가: 자산총액 120억 원 이상, 부채총액 70억 원 이상, 매출액 100억 원 이상, 종업원 100명 이상'],['예','아니오'],'외부감사 대상 → 감사보고서(재무제표와 주석)가 DART에 공개된다','외부감사 대상이 아니다 → DART에 감사보고서가 없다','주식회사의 경우. 유한회사는 요건이 조금 다릅니다. 금액은 직전 사업연도로 봅니다.'],
 en:['An unlisted Korean company: is its audit report on DART? (in order)',['Is it listed, or preparing to list?','Were total assets or sales at least KRW 50 billion in the previous year?','Does it meet two or more of these four: total assets of KRW 12 billion or more, total liabilities of KRW 7 billion or more, sales of KRW 10 billion or more, 100 or more employees?'],['Yes','No'],'Subject to external audit: the audit report (statements and notes) is published on DART','Not subject to external audit: no audit report on DART','For stock companies. The tests for limited companies differ slightly. Amounts are for the previous financial year.']};
function audFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),r0=Math.max(13,FS(12)*0.72),yw=Math.max(H.TW(d[2][0],12)+26,70),outs=[];
 d[1].forEach(function(q,i){var tw=600-r0*2-40-yw-20,h=Math.max(hgt(q,12,tw),r0*2)+20;
  s+=R(20,y,600-yw-16,h,'#fff',10,' stroke="'+PL+'" stroke-width="2"')+'<circle cx="'+(34+r0)+'" cy="'+(y+h/2)+'" r="'+r0+'" fill="'+PL+'"/>'+tx(34+r0,y+h/2+FS(12)*0.35,String(i+1),12,'#fff',900)+TW2(46+r0*2,y+(h-hgt(q,12,tw))/2,q,12,D,800,tw,'start');
  s+='<line x1="'+(620-yw-16)+'" y1="'+(y+h/2)+'" x2="'+(620-yw)+'" y2="'+(y+h/2)+'" stroke="'+GN+'" stroke-width="3"/>'+R(620-yw,y+h/2-FS(12)*0.95,yw,FS(12)*1.9,GN,FS(12)*0.95)+tx(620-yw/2,y+h/2+FS(12)*0.35,d[2][0],12,'#fff',900);outs.push(y+h/2);y+=h;
  var hn=FS(11)*1.3;s+=ARW(60,y+3,60,y+hn+7,GY,3.5)+tx(76,y+hn*0.5+FS(11)*0.35+4,d[2][1],11,G,800,'start');y+=hn+14});
 var b2=BOX(y,d[4],'#F0F2F5',D,12);s+=b2[0];y+=b2[1]+10;var b1=BOX(y,d[3],'#E3F4EA','#14633F',12.5);s+=b1[0];y+=b1[1]+10;
 var n=NOTE(y,d[5]);s+=n[0];y+=n[1]+16;return svg(y,s)}}

/* 8-6 決算期のずれと、為替の使い分け */
var PER={
 ja:['決算期のずれと、為替レートの使い分け',['韓国：12月決算（1月〜12月）','日本：3月決算（4月〜翌年3月）'],'重なるのは9か月。3か月ずれています。季節の影響が大きい航空会社では、四半期の数字を足し合わせて同じ12か月にそろえます。',[['損益計算書（売上・利益）','期間の平均のレートで換算する',PL],['貸借対照表（資産・負債）','期末の日のレートで換算する',BS]],'数字は月。「2025年度」と書いてあっても、日本と韓国では指している期間が違います。'],
 ko:['결산기의 어긋남과 환율 쓰는 법',['한국: 12월 결산(1월~12월)','일본: 3월 결산(4월~다음 해 3월)'],'겹치는 것은 9개월. 3개월이 어긋납니다. 계절의 영향이 큰 항공사는 분기 숫자를 더해 같은 12개월로 맞춥니다.',[['손익계산서(매출·이익)','기간의 평균 환율로 환산한다',PL],['재무상태표(자산·부채)','기말 날짜의 환율로 환산한다',BS]],'숫자는 월. 「2025년도」라고 적혀 있어도 일본과 한국은 가리키는 기간이 다릅니다.'],
 en:['Different year-ends, and which exchange rate to use',['Korea: December year-end (January to December)','Japan: March year-end (April to the following March)'],'Nine months overlap; three do not. For airlines, where seasons matter, add up quarterly figures to cover the same twelve months.',[['Income statement (sales, profit)','Translate at the average rate for the period',PL],['Balance sheet (assets, liabilities)','Translate at the rate on the closing date',BS]],'Numbers are months. Even when both say “fiscal 2025”, Japan and Korea mean different periods.']};
function perFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),f=FS(11),cw=40,x0=20,bh=Math.max(26,f*1.5);
 var mo=[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3];
 s+=R(x0+3*cw,y,9*cw,bh*2+10+f*1.6,'#FFF3D6',6);
 s+=R(x0,y+4,12*cw-2,bh,CF,6)+R(x0+3*cw,y+bh+10,12*cw-2,bh,PL,6);y+=bh*2+14;
 mo.forEach(function(m,i){s+=tx(x0+i*cw+cw/2,y+f,String(m),11,(i>=3&&i<12)?'#7A5A00':G,(i>=3&&i<12)?900:700)});
 s+='<line x1="'+(x0+12*cw)+'" y1="'+(y-bh*2-14)+'" x2="'+(x0+12*cw)+'" y2="'+(y+f*1.4)+'" stroke="'+D+'" stroke-width="1.5" stroke-dasharray="4 4"/>';y+=f*1.6+12;
 [[CF,d[1][0]],[PL,d[1][1]]].forEach(function(g){var h=hgt(g[1],11.5,550);s+=R(24,y+FS(11.5)*0.28,18,FS(11.5)*0.75,g[0],4)+TW2(52,y,g[1],11.5,D,700,550,'start');y+=h+8});
 y+=4;var b=BOX(y,d[2],'#FFF3D6','#7A5A00',12);s+=b[0];y+=b[1]+12;
 d[3].forEach(function(r){var c=r[2],h1=hgt(r[0],12.5,548),h2=hgt(r[1],12,548),h=h1+h2+22;s+=R(20,y,600,h,'#fff',10,' stroke="'+c+'" stroke-width="2"')+R(20,y,8,h,c,4)+TW2(42,y+8,r[0],12.5,c,900,548,'start')+TW2(42,y+12+h1,r[1],12,D,700,548,'start');y+=h+8});
 y+=4;var n=NOTE(y,d[4]);s+=n[0];y+=n[1]+16;return svg(y,s)}}

window.FIGS=window.FIGS||{};
window.FIGS.fin_std_where=H.FIX2(whereFig(WHERE));window.FIGS.fin_op_bridge=H.FIX2(brgFig(BRG));window.FIGS.fin_goodwill=H.FIX2(gwFig(GW));
window.FIGS.fin_doc_pick=H.FIX2(pickFig(PICK));window.FIGS.fin_kr_audit=H.FIX2(audFig(AUD));window.FIGS.fin_period=H.FIX2(perFig(PER));
})();
