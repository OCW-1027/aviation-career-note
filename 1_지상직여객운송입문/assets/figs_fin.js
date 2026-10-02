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
 return s+'</svg>'}
};
for(var k in F)window.FIGS[k]=F[k];
})();
