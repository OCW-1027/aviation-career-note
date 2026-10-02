/* 会社の人事・総務・財務の実務（ADM）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR、高さは行数で計算、縦に積む配置） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,FS=H.FS,LI=H.LINES,setK=H.setK,ARW=H.ARW;
var D=H.C.D,G=H.C.G;
function svg(h,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+Math.ceil(h)+'" role="img">'+R(0,0,640,Math.ceil(h),'#F7FAFD')+body+'</svg>'}
function hgt(s,sz,w){return LI(s,sz,w).length*FS(sz)*1.3}
function TW2(x,top,s,sz,c,w,maxw,a){var n=LI(s,sz,maxw).length,lh=FS(sz)*1.3;return WR(x,top+FS(sz)*0.95+(n-1)*lh/2,s,sz,c,w,maxw,a)}
function ttlH(s){return Math.max(58,30+hgt(s,15,600)+14)}
/* 点滅しながら順に現れる（keyTimes は 0 で始まり 1 で終わる） */
function fade(a,b,dur){return '<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+a+';'+b+';0.92;1" dur="'+dur+'s" repeatCount="indefinite"/>'}
function glow(a,b,dur){return '<animate attributeName="opacity" values="0.25;0.25;1;1;0.25" keyTimes="0;'+a+';'+b+';0.92;1" dur="'+dur+'s" repeatCount="indefinite"/>'}

/* 1. 会社の仕組み：経営者の下に、人事・総務・経理・財務 */
var ORG={
 ja:['会社の中で、お金と人を支える4つの仕事',['経営者（社長・支店長）','会社の方向を決め、最後に責任を持つ'],[
  ['人事','人','採用・配属・評価・給与の計算・勤怠・教育。働く人に関わることを受け持つ','#2F8FE0'],
  ['総務','環境','契約・備品・事務所・社用車・文書・保険・行事。会社が動くための土台を整える','#2C8C8C'],
  ['経理（会計）','記録','毎日の取引を帳簿に記録し、月次・年次の決算と税金の申告につなげる','#7A5CC7'],
  ['財務（資金）','お金の流れ','入金と支払い、銀行との付き合い、資金の計画、海外への送金を管理する','#1F8A5B']],
  '小さな支店や会社では、一人が二つ以上の役割を兼ねます。誰が何を受け持つかを表にしておきましょう。'],
 ko:['회사 안에서 돈과 사람을 떠받치는 네 가지 일',['경영자(사장·지점장)','회사의 방향을 정하고 마지막 책임을 짐'],[
  ['인사','사람','채용·배치·평가·급여 계산·근태·교육. 일하는 사람에 관한 일을 맡음','#2F8FE0'],
  ['총무','환경','계약·비품·사무실·업무용 차량·문서·보험·행사. 회사가 돌아가는 바탕을 갖춤','#2C8C8C'],
  ['경리(회계)','기록','매일의 거래를 장부에 기록하고 월별·연도 결산과 세금 신고로 이어 감','#7A5CC7'],
  ['재무(자금)','돈의 흐름','입금과 지급, 은행 관계, 자금 계획, 해외 송금을 관리함','#1F8A5B']],
  '작은 지점이나 회사에서는 한 사람이 둘 이상의 역할을 겸합니다. 누가 무엇을 맡는지 표로 정리해 두세요.'],
 en:['Four jobs that keep a company’s money and people running',['Management (president / station manager)','Sets the direction and carries final responsibility'],[
  ['HR','People','Hiring, assignment, appraisal, payroll calculation, attendance and training: everything to do with the people who work there','#2F8FE0'],
  ['General affairs','Workplace','Contracts, equipment, the office, company cars, documents, insurance and events: the base the company runs on','#2C8C8C'],
  ['Accounting','Records','Records each day’s transactions in the books and turns them into monthly and annual accounts and tax returns','#7A5CC7'],
  ['Finance (treasury)','Cash flow','Manages receipts and payments, banking relationships, cash planning and overseas remittances','#1F8A5B']],
  'In a small branch or company, one person covers two or more of these roles. Keep a simple table of who does what.']};
function orgFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600);
 var hb=hgt(d[1][0],13,560)+hgt(d[1][1],11.5,560)+24;s+=R(20,y,600,hb,'#0f3558',12)+TW2(320,y+9,d[1][0],13,'#fff',900,560)+TW2(320,y+13+hgt(d[1][0],13,560),d[1][1],11.5,'#DCE7F2',700,560);
 var top=y+hb;y+=hb+16;var rows='';
 d[2].forEach(function(r){var c=r[3],h1=hgt(r[0],13,300),ht=hgt(r[1],11,140),h2=hgt(r[2],11.5,500),h=Math.max(h1,ht)+h2+26;
  rows+=R(60,y,560,h,'#fff',10,' stroke="'+c+'" stroke-width="1.5"')+R(60,y,8,h,c,4)+'<line x1="40" y1="'+(y+h/2)+'" x2="60" y2="'+(y+h/2)+'" stroke="#C8D3DE" stroke-width="3"/>'
   +TW2(82,y+8,r[0],13,c,900,300,'start')+R(456,y+8,150,ht+8,c,8)+TW2(531,y+12,r[1],11,'#fff',900,140)+TW2(82,y+14+Math.max(h1,ht),r[2],11.5,D,700,520,'start');y+=h+12});
 s+='<line x1="40" y1="'+top+'" x2="40" y2="'+(y-30)+'" stroke="#C8D3DE" stroke-width="3"/>'+rows;
 var hn=hgt(d[3],12,560);s+=R(20,y,600,hn+18,'#FFF3E0',10)+TW2(320,y+9,d[3],12,'#B45309',900,560);y+=hn+30;return svg(y,s)}}

/* 2. 仕訳：1つの取引を左（借方）と右（貸方）に分けて書く（動き） */
var JNL={
 ja:['仕訳 ― 1つの取引を左と右に分けて書く','取引：事務用品を5,000円、現金で買った',['借方（左）','消耗品費','費用が増えた','5,000'],['貸方（右）','現金','資産が減った','5,000'],'左の合計 ＝ 右の合計',
  '左（借方）：増えた資産・発生した費用／右（貸方）：減った資産・増えた負債・売上'],
 ko:['분개 — 거래 하나를 왼쪽과 오른쪽으로 나눠 적기','거래: 사무용품을 5,000엔, 현금으로 샀다',['차변(왼쪽)','소모품비','비용이 늘었다','5,000'],['대변(오른쪽)','현금','자산이 줄었다','5,000'],'왼쪽 합계 = 오른쪽 합계',
  '왼쪽(차변): 늘어난 자산·생긴 비용 / 오른쪽(대변): 줄어든 자산·늘어난 부채·매출'],
 en:['Journal entries: every transaction is written on a left and a right side','Transaction: office supplies bought for ¥5,000 in cash',['Debit (left)','Supplies expense','An expense went up','5,000'],['Credit (right)','Cash','An asset went down','5,000'],'Left total = right total',
  'Left (debit): assets that increase, expenses incurred / Right (credit): assets that decrease, liabilities that increase, sales']};
function jnlFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600),dur=9;
 var ht=hgt(d[1],13,560);s+=R(20,y,600,ht+20,'#0f3558',12)+TW2(320,y+10,d[1],13,'#fff',900,560);var ay=y+ht+20;y+=ht+48;
 var cols=[[d[2],20,'#2F8FE0','0.18','0.28'],[d[3],330,'#E08A2F','0.4','0.5']],hmax=0;
 cols.forEach(function(c){var r=c[0],h=hgt(r[0],12,270)+hgt(r[1],14,270)+hgt(r[2],11.5,270)+hgt(r[3],16,270)+44;hmax=Math.max(hmax,h)});
 cols.forEach(function(c){var r=c[0],x=c[1],col=c[2],yy=y+10,g='';
  g+=R(x,y,290,hmax,'#fff',12,' stroke="'+col+'" stroke-width="2"')+R(x,y,290,hgt(r[0],12,270)+14,col,12);
  g+=TW2(x+145,yy-3,r[0],12,'#fff',900,270);yy+=hgt(r[0],12,270)+14;
  g+=TW2(x+145,yy,r[1],14,col,900,270);yy+=hgt(r[1],14,270)+6;
  g+=TW2(x+145,yy,r[2],11.5,G,700,270);yy+=hgt(r[2],11.5,270)+8;
  g+=TW2(x+145,yy,r[3],16,'#0f3558',900,270);
  s+='<g opacity="0">'+fade(c[3],c[4],dur)+ARW(320,ay,x+145,y-4,col,3)+g+'</g>'});
 y+=hmax+16;var hb=hgt(d[4],13,520);
 s+='<g opacity="0">'+fade('0.62','0.72',dur)+R(60,y,520,hb+18,'#E8F6EE',12,' stroke="#1F8A5B" stroke-width="2"')+TW2(320,y+9,d[4],13,'#1F8A5B',900,520)+'</g>';y+=hb+32;
 var hn=hgt(d[5],11.5,580);s+=TW2(320,y,d[5],11.5,G,700,580);y+=hn+18;return svg(y,s)}}

/* 3. 財務諸表の3つの表のつながり（動き） */
var FS3={
 ja:['財務諸表の3つの表は、つながっている',[
  ['損益計算書（P/L）','1年間でいくら稼いだか','売上 − 費用 ＝ 利益','#2F8FE0'],
  ['貸借対照表（B/S）','決算日に何を持ち、何を借りているか','資産 ＝ 負債 ＋ 純資産','#7A5CC7'],
  ['キャッシュ・フロー計算書（C/F）','現金が実際にいくら出入りしたか','営業・投資・財務の3つに分けて見る','#1F8A5B']],
  ['1年の利益は、純資産（利益剰余金）に積み上がる','期末の現金は、貸借対照表の「現金」と同じ金額になる'],
  '利益が出ていても、売掛金が回収できていなければ現金は増えません（0-4）。'],
 ko:['재무제표의 세 가지 표는 서로 이어져 있다',[
  ['손익계산서(P/L)','1년 동안 얼마를 벌었나','매출 − 비용 = 이익','#2F8FE0'],
  ['대차대조표(B/S)','결산일에 무엇을 가졌고 무엇을 빌렸나','자산 = 부채 + 순자산','#7A5CC7'],
  ['현금흐름표(C/F)','현금이 실제로 얼마나 들어오고 나갔나','영업·투자·재무 세 가지로 나눠 봄','#1F8A5B']],
  ['1년의 이익은 순자산(이익잉여금)에 쌓인다','기말 현금은 대차대조표의 「현금」과 같은 금액이 된다'],
  '이익이 나도 매출채권을 회수하지 못하면 현금은 늘지 않습니다(0-4).'],
 en:['The three financial statements are linked',[
  ['Profit and loss (P/L)','How much was earned over the year','Sales − expenses = profit','#2F8FE0'],
  ['Balance sheet (B/S)','What the company owns and owes on the closing date','Assets = liabilities + net assets','#7A5CC7'],
  ['Cash flow statement (C/F)','How much cash actually came in and went out','Seen in three parts: operating, investing, financing','#1F8A5B']],
  ['The year’s profit builds up in net assets (retained earnings)','Cash at year end equals the cash figure on the balance sheet'],
  'A profit does not raise cash until receivables are actually collected (0-4).']};
function fs3Fig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600),dur=9,bx=[];
 function box(r){var c=r[3],h1=hgt(r[0],13,520),h2=hgt(r[1],11.5,520),h3=hgt(r[2],13,480),h=h1+h2+h3+40,o='';
  o+=R(20,y,600,h,'#fff',12,' stroke="'+c+'" stroke-width="2"')+R(20,y,600,h1+16,c,12)+TW2(320,y+8,r[0],13,'#fff',900,560);
  o+=TW2(320,y+h1+22,r[1],11.5,G,700,560)+R(80,y+h1+h2+28,480,h3+8,'#F2F6FA',8)+TW2(320,y+h1+h2+32,r[2],13,c,900,470);bx.push([y,h]);y+=h;return o}
 function link(t,c,up,a,b){var hl=hgt(t,11.5,470),g=Math.max(hl+20,52),o='';
  o+='<g opacity="0.25">'+glow(a,b,dur)+ARW(580,up?y+g-4:y+4,580,up?y+4:y+g-4,c,4)+TW2(310,y+(g-hl)/2-2,t,11.5,c,900,470)+'</g>';y+=g;return o}
 s+=box(d[1][0])+link(d[2][0],'#2F8FE0',false,'0.12','0.24')+box(d[1][1])+link(d[2][1],'#1F8A5B',true,'0.48','0.6')+box(d[1][2]);
 y+=16;var hn=hgt(d[3],12,560);s+=R(20,y,600,hn+18,'#FFF3E0',10)+TW2(320,y+9,d[3],12,'#B45309',900,560);y+=hn+30;return svg(y,s)}}

/* 4. 黒字倒産：利益は増えているのに、現金が足りなくなる（動き） */
var CASH={
 ja:['利益が出ていても、現金が足りなくなることがある',['利益（累計）','現金の残高'],['月','万円'],[40,80,120,160,200,240],[300,180,90,-20,60,150],
  '4か月目：売上の代金がまだ入らず、給与と家賃の支払いで現金が足りない','売上が増えるほど、回収までの「立て替え」も増えます。資金繰り表で前もって確かめます。'],
 ko:['이익이 나도 현금이 모자랄 수 있다',['이익(누계)','현금 잔액'],['월','만 엔'],[40,80,120,160,200,240],[300,180,90,-20,60,150],
  '4개월째: 매출 대금이 아직 들어오지 않아 급여와 임차료를 낼 현금이 모자람','매출이 늘수록 회수까지 「먼저 내는 돈」도 늘어납니다. 자금 계획표로 미리 확인합니다.'],
 en:['A company can make a profit and still run out of cash',['Profit (cumulative)','Cash balance'],['Month','¥10k'],[40,80,120,160,200,240],[300,180,90,-20,60,150],
  'Month 4: customers have not paid yet, so there is not enough cash for salaries and rent','The more sales grow, the more you pay out before customers pay you. Check it in advance with a cash plan.']};
function cashFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600),dur=9;
 var cx=70,cw=530,ch=200,top=y+10,mn=-60,mx=320,X=function(i){return cx+cw*(i+0.5)/6},Y=function(v){return top+ch*(mx-v)/(mx-mn)};
 s+=R(cx,top,cw,ch,'#fff',8,' stroke="#DCE3EA"')+R(cx,Y(0),cw,top+ch-Y(0),'#FDECEC',0);
 [0,100,200,300].forEach(function(v){s+='<line x1="'+cx+'" y1="'+Y(v)+'" x2="'+(cx+cw)+'" y2="'+Y(v)+'" stroke="#E6ECF2"/>'+tx(cx-8,Y(v)+4,String(v),11,G,700,'end')});
 s+='<line x1="'+cx+'" y1="'+Y(0)+'" x2="'+(cx+cw)+'" y2="'+Y(0)+'" stroke="#9AA9B8" stroke-width="1.5"/>';
 var f1=FS(11);for(var i=0;i<6;i++)s+=tx(X(i),top+ch+f1*1.3,String(i+1),11,G,700);
 s+=tx(cx+cw,top+ch+f1*2.8,d[2][0],11,G,700,'end')+tx(cx-8,top-8,d[2][1],11,G,700,'end');
 function line(vs,c){var p=vs.map(function(v,i){return (i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)}).join(' '),L=900;
  return '<path d="'+p+'" fill="none" stroke="'+c+'" stroke-width="4" stroke-linejoin="round" stroke-dasharray="'+L+'" stroke-dashoffset="'+L+'"><animate attributeName="stroke-dashoffset" values="'+L+';'+L+';0;0;'+L+'" keyTimes="0;0.05;0.45;0.92;1" dur="'+dur+'s" repeatCount="indefinite"/></path>'
   +vs.map(function(v,i){return '<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(v).toFixed(1)+'" r="5" fill="'+c+'" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+(0.08+i*0.065).toFixed(3)+';'+(0.1+i*0.065).toFixed(3)+';0.92;1" dur="'+dur+'s" repeatCount="indefinite"/></circle>'}).join('')}
 s+=line(d[3],'#2F8FE0')+line(d[4],'#1F8A5B');
 s+='<g opacity="0">'+fade('0.5','0.58',dur)+'<circle cx="'+X(3)+'" cy="'+Y(d[4][3])+'" r="14" fill="none" stroke="#D0453E" stroke-width="3"/></g>';
 y=top+ch+f1*2.8+FS(12)*1.6;
 [[d[1][0],'#2F8FE0'],[d[1][1],'#1F8A5B']].forEach(function(g,i){s+=R(80+i*270,y-10,26,6,g[1],3)+tx(114+i*270,y-2,g[0],12,'#0f3558',900,'start')});y+=18;
 var hw=hgt(d[5],12,560);s+='<g opacity="0">'+fade('0.55','0.63',dur)+R(20,y,600,hw+18,'#FDECEC',10)+TW2(320,y+9,d[5],12,'#B42318',900,560)+'</g>';y+=hw+30;
 var hn=hgt(d[6],11.5,580);s+=TW2(320,y,d[6],11.5,G,700,580);y+=hn+18;return svg(y,s)}}

/* 5. 給与明細：総支給から手取りまで */
var PAY2={
 ja:['月給30万円の例 ― 総支給から手取りまで',[['総支給（基本給＋手当）',300000,'#9DB4C8'],['健康保険料（介護保険は40歳から）',14900,'#E08A2F'],['厚生年金保険料',27450,'#E08A2F'],['雇用保険料',1650,'#E08A2F'],['所得税（源泉徴収）',6800,'#7A5CC7'],['住民税（前の年の所得から）',15000,'#7A5CC7'],['手取り',234200,'#1F8A5B']],'円','※ 東京都・扶養なし・39歳以下の概算の例です。料率は毎年見直されます。★'],
 ko:['월급 30만 엔의 예 — 총지급액에서 수령액까지',[['총지급(기본급+수당)',300000,'#9DB4C8'],['건강보험료(개호보험은 40세부터)',14900,'#E08A2F'],['후생연금보험료',27450,'#E08A2F'],['고용보험료',1650,'#E08A2F'],['소득세(원천징수)',6800,'#7A5CC7'],['주민세(전년 소득 기준)',15000,'#7A5CC7'],['수령액',234200,'#1F8A5B']],'엔','※ 도쿄도·부양가족 없음·39세 이하의 개산 예입니다. 요율은 매년 바뀝니다. ★'],
 en:['Example: monthly salary of ¥300,000, from gross to take-home',[['Gross pay (base + allowances)',300000,'#9DB4C8'],['Health insurance (long-term care from age 40)',14900,'#E08A2F'],['Employees’ pension',27450,'#E08A2F'],['Employment insurance',1650,'#E08A2F'],['Income tax (withheld)',6800,'#7A5CC7'],['Residence tax (based on last year)',15000,'#7A5CC7'],['Take-home pay',234200,'#1F8A5B']],'','* Rough example: Tokyo, no dependants, aged 39 or under. Rates change every year. ★']};
function payFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600),mx=300000,wmax=420,x0=30;
 d[1].forEach(function(r,i){var h1=hgt(r[0],12,580);s+=TW2(x0,y,r[0],12,i===0||i===6?'#0f3558':D,900,580,'start');y+=h1+3;
  var w=Math.max(4,wmax*r[1]/mx),lab=(l==='en'?'¥':'')+r[1].toLocaleString('en-US')+d[2];
  s+=R(x0,y,w,16,r[2],5)+tx(x0+w+10,y+13,(i>0&&i<6?'− ':'')+lab,12,i===6?'#1F8A5B':'#0f3558',900,'start');y+=26;
  if(i===0||i===5){s+='<line x1="20" y1="'+(y-2)+'" x2="620" y2="'+(y-2)+'" stroke="#DCE3EA" stroke-dasharray="4 4"/>';y+=8}});
 var hn=hgt(d[3],11,580);s+=TW2(30,y+4,d[3],11,G,700,580,'start');y+=hn+22;return svg(y,s)}}

window.FIGS=window.FIGS||{};
window.FIGS.adm_cash=H.FIX2(cashFig(CASH));window.FIGS.adm_pay=H.FIX2(payFig(PAY2));
window.FIGS.adm_org=H.FIX2(orgFig(ORG));window.FIGS.adm_jnl=H.FIX2(jnlFig(JNL));window.FIGS.adm_fs3=H.FIX2(fs3Fig(FS3));
})();
