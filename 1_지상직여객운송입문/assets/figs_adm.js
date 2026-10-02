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
function payFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600),mx=d[1][0][1],wmax=420,x0=30,last=d[1].length-1;
 d[1].forEach(function(r,i){var h1=hgt(r[0],12,580);s+=TW2(x0,y,r[0],12,i===0||i===last?'#0f3558':D,900,580,'start');y+=h1+3;
  var w=Math.max(4,wmax*r[1]/mx),lab=(l==='en'?(d[4]||'¥'):'')+r[1].toLocaleString('en-US')+d[2];
  s+=R(x0,y,w,16,r[2],5)+tx(x0+w+10,y+13,(i>0&&i<last?'− ':'')+lab,12,i===last?'#1F8A5B':'#0f3558',900,'start');y+=26;
  if(i===0||i===last-1){s+='<line x1="20" y1="'+(y-2)+'" x2="620" y2="'+(y-2)+'" stroke="#DCE3EA" stroke-dasharray="4 4"/>';y+=8}});
 var hn=hgt(d[3],11,580);s+=TW2(30,y+4,d[3],11,G,700,580,'start');y+=hn+22;return svg(y,s)}}

/* 6. 人事・給与の1年（日本・3月決算でない一般的な例） */
var HRCAL={
 ja:['人事・給与の仕事の1年（例）',[
  ['1月','給与支払報告書・法定調書を提出（1月31日まで）','#7A5CC7'],
  ['2〜3月','新卒・中途の採用、4月の配属と研修の準備','#2F8FE0'],
  ['4月','入社・研修。雇用保険の料率が変わる月','#2F8FE0'],
  ['6月','住民税の新しい額で天引きが始まる。夏の賞与','#7A5CC7'],
  ['6〜7月','労働保険の年度更新、社会保険の算定基礎届（7月10日まで）','#E08A2F'],
  ['9〜10月','新しい標準報酬月額で保険料が変わる。最低賃金の改定','#E08A2F'],
  ['11月','年末調整の書類を社員に配って集める','#7A5CC7'],
  ['12月','年末調整、冬の賞与','#7A5CC7']],
  ['給与・税','採用・教育','社会保険・労働保険'],'1年を通して：健康診断（年1回）、有給休暇の年5日の取得の管理。日付は年や会社で違うので確かめましょう。★'],
 ko:['인사·급여 업무의 1년(예)',[
  ['1월','급여지급보고서·법정조서 제출(1월 31일까지)','#7A5CC7'],
  ['2~3월','신입·경력 채용, 4월 배치와 연수 준비','#2F8FE0'],
  ['4월','입사·연수. 고용보험 요율이 바뀌는 달','#2F8FE0'],
  ['6월','새 주민세 금액으로 공제 시작. 여름 상여','#7A5CC7'],
  ['6~7월','노동보험 연도 갱신, 사회보험 산정기초신고(7월 10일까지)','#E08A2F'],
  ['9~10월','새 표준보수월액으로 보험료 변경. 최저임금 개정','#E08A2F'],
  ['11월','연말정산 서류를 직원에게 나눠 주고 걷기','#7A5CC7'],
  ['12월','연말정산, 겨울 상여','#7A5CC7']],
  ['급여·세금','채용·교육','사회보험·노동보험'],'1년 내내: 건강검진(연 1회), 유급휴가 연 5일 사용 관리. 날짜는 해와 회사마다 다르니 확인하세요. ★'],
 en:['A year of HR and payroll work (example)',[
  ['Jan','Submit payment reports and statutory returns (by 31 January)','#7A5CC7'],
  ['Feb–Mar','Hiring graduates and mid-career staff; preparing April placements and training','#2F8FE0'],
  ['Apr','New starters and training. Employment insurance rates change','#2F8FE0'],
  ['Jun','Deductions start at the new residence tax amount. Summer bonus','#7A5CC7'],
  ['Jun–Jul','Annual labour insurance renewal; social insurance base report (by 10 July)','#E08A2F'],
  ['Sep–Oct','Premiums change with the new standard remuneration. Minimum wage revised','#E08A2F'],
  ['Nov','Hand out and collect year-end adjustment forms','#7A5CC7'],
  ['Dec','Year-end tax adjustment, winter bonus','#7A5CC7']],
  ['Pay and tax','Hiring and training','Social and labour insurance'],'All year: annual health checks and making sure staff take five days of paid leave. Dates vary by year and company, so check them. ★']};
function hrcalFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600);
 var cols=['#7A5CC7','#2F8FE0','#E08A2F'],lx=30;
 d[2].forEach(function(g,i){var W=[100,140,180,240,320,420,560].filter(function(v){return LI(g,11,v).length===1})[0]||560,w=W+40;
  if(lx+w>630&&lx>30){lx=30;y+=FS(11)*1.7}s+=R(lx,y-9,14,14,cols[i],4)+tx(lx+20,y+2,g,11,'#0f3558',900,'start');lx+=w});y+=FS(11)*1.2+12;
 d[1].forEach(function(r){var hm=hgt(r[0],12,96),ht=hgt(r[1],12,460),h=Math.max(hm,ht)+18;
  s+=R(20,y,600,h,'#fff',10,' stroke="#DCE3EA"')+R(20,y,112,h,r[2],10)+R(122,y,10,h,r[2],0)+TW2(76,y+(h-hm)/2,r[0],12,'#fff',900,96)+TW2(148,y+(h-ht)/2,r[1],12,D,700,460,'start');y+=h+8});
 var hn=hgt(d[3],11.5,580);s+=R(20,y+4,600,hn+18,'#FFF3E0',10)+TW2(320,y+13,d[3],11.5,'#B45309',900,570);y+=hn+34;return svg(y,s)}}

/* 7. 表計算ソフト：合計と条件付きの合計 */
var XL={
 ja:['表計算の例 ― 合計と、条件をつけた合計',['月','項目','金額'],[['4月','給与','300,000'],['4月','家賃','200,000'],['4月','交通費','12,000'],['5月','給与','300,000'],['5月','交通費','9,000']],'合計','821,000',
  [['=SUM(C2:C6)','C2からC6までを全部足す → 821,000'],['=SUMIF(B2:B6,"交通費",C2:C6)','項目が「交通費」の行だけ足す → 21,000'],['=IF(C2>250000,"確認","")','25万円を超えたら「確認」と表示する']]],
 ko:['스프레드시트 예 — 합계와 조건을 붙인 합계',['월','항목','금액'],[['4월','급여','300,000'],['4월','임차료','200,000'],['4월','교통비','12,000'],['5월','급여','300,000'],['5월','교통비','9,000']],'합계','821,000',
  [['=SUM(C2:C6)','C2부터 C6까지 모두 더함 → 821,000'],['=SUMIF(B2:B6,"교통비",C2:C6)','항목이 「교통비」인 행만 더함 → 21,000'],['=IF(C2>250000,"확인","")','25만 엔을 넘으면 「확인」이라고 표시']]],
 en:['Spreadsheet example: a total and a conditional total',['Month','Item','Amount'],[['Apr','Salary','300,000'],['Apr','Rent','200,000'],['Apr','Travel','12,000'],['May','Salary','300,000'],['May','Travel','9,000']],'Total','821,000',
  [['=SUM(C2:C6)','Adds everything from C2 to C6 → 821,000'],['=SUMIF(B2:B6,"Travel",C2:C6)','Adds only rows where the item is Travel → 21,000'],['=IF(C2>250000,"Check","")','Shows Check if the amount is over ¥250,000']]]};
function xlFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600);
 var X0=20,cw=[50,150,190,210],rh=Math.max(30,FS(12)*1.9),xs=[X0];for(var i=0;i<cw.length;i++)xs.push(xs[i]+cw[i]);
 function cell(ci,yy,t,fill,col,w8,anc){var o=R(xs[ci],yy,cw[ci],rh,fill,0,' stroke="#C9D3DD"');var tx0=anc==='end'?xs[ci]+cw[ci]-10:anc==='start'?xs[ci]+10:xs[ci]+cw[ci]/2;return o+tx(tx0,yy+rh/2+FS(12)*0.36,t,12,col,w8,anc||'middle')}
 s+=cell(0,y,'','#E9EEF3','#5B6B7D',700);['A','B','C'].forEach(function(c,i){s+=cell(i+1,y,c,'#E9EEF3','#5B6B7D',700)});y+=rh;
 s+=cell(0,y,'1','#E9EEF3','#5B6B7D',700);d[1].forEach(function(c,i){s+=cell(i+1,y,c,'#DCEBFA','#0f3558',900)});y+=rh;
 d[2].forEach(function(r,j){s+=cell(0,y,String(j+2),'#E9EEF3','#5B6B7D',700)+cell(1,y,r[0],'#fff',D,700)+cell(2,y,r[1],'#fff',D,700,'start')+cell(3,y,r[2],'#fff',D,700,'end');y+=rh});
 s+=cell(0,y,'7','#E9EEF3','#5B6B7D',700)+cell(1,y,'','#FFF7E6',D,700)+cell(2,y,d[3],'#FFF7E6','#0f3558',900,'start')+cell(3,y,d[4],'#FFF7E6','#B45309',900,'end')+R(xs[3],y,cw[3],rh,'none',0,' stroke="#E08A2F" stroke-width="3"');y+=rh+18;
 d[5].forEach(function(f,i){var h1=hgt(f[0],12,560),h2=hgt(f[1],11.5,560),h=h1+h2+22,c=i===0?'#E08A2F':'#2F8FE0';
  s+=R(20,y,600,h,'#fff',10,' stroke="'+c+'" stroke-width="1.5"')+R(20,y,8,h,c,4)+TW2(40,y+7,f[0],12,c,900,560,'start')+TW2(40,y+11+h1,f[1],11.5,D,700,560,'start');y+=h+8});
 return svg(y+10,s)}}

/* 5-2. 給与明細（韓国）：月給300万ウォンの例 */
var PAYKR={
 ja:['韓国：月給300万ウォンの例 ― 総支給から手取りまで',[['総支給',3000000,'#9DB4C8'],['国民年金（4.75%）',142500,'#E08A2F'],['健康保険（3.595%）',107850,'#E08A2F'],['長期療養保険（健康保険料の13.14%）',14170,'#E08A2F'],['雇用保険（0.9%）',27000,'#E08A2F'],['所得税（簡易税額表）',89730,'#7A5CC7'],['地方所得税（所得税の10%）',8970,'#7A5CC7'],['手取り',2609780,'#1F8A5B']],'ウォン','※ 2026年の料率、扶養は本人1人、非課税の手当なしの概算の例です。所得税は扶養の人数で大きく変わります。★'],
 ko:['한국: 월급 300만 원의 예 — 총지급액에서 수령액까지',[['총지급액',3000000,'#9DB4C8'],['국민연금(4.75%)',142500,'#E08A2F'],['건강보험(3.595%)',107850,'#E08A2F'],['장기요양보험(건강보험료의 13.14%)',14170,'#E08A2F'],['고용보험(0.9%)',27000,'#E08A2F'],['소득세(간이세액표)',89730,'#7A5CC7'],['지방소득세(소득세의 10%)',8970,'#7A5CC7'],['수령액',2609780,'#1F8A5B']],'원','※ 2026년 요율, 부양가족 본인 1명, 비과세 수당 없음의 개산 예입니다. 소득세는 부양가족 수에 따라 크게 달라집니다. ★'],
 en:['Korea: monthly salary of ₩3,000,000, from gross to take-home',[['Gross pay',3000000,'#9DB4C8'],['National pension (4.75%)',142500,'#E08A2F'],['Health insurance (3.595%)',107850,'#E08A2F'],['Long-term care (13.14% of health premium)',14170,'#E08A2F'],['Employment insurance (0.9%)',27000,'#E08A2F'],['Income tax (simplified tax table)',89730,'#7A5CC7'],['Local income tax (10% of income tax)',8970,'#7A5CC7'],['Take-home pay',2609780,'#1F8A5B']],'','* Rough example at 2026 rates: no dependants other than the employee, no tax-free allowances. Income tax varies a lot with the number of dependants. ★','₩']};

/* 6-2. 人事・給与の1年（韓国） */
var HRCALKR={
 ja:['韓国：人事・給与の仕事の1年（例）',[
  ['1月','年末精算の準備（控除資料の簡素化サービス）。源泉税の半期納付（7〜12月分）','#7A5CC7'],
  ['2月','2月の給与で年末精算','#7A5CC7'],
  ['3月','支払調書の提出（3月10日まで）。雇用・労災保険と健康保険の報酬総額の申告','#E08A2F'],
  ['4月','前の年の健康保険料を精算して4月分の保険料に反映','#E08A2F'],
  ['7月','国民年金の基準所得月額が変わる。源泉税の半期納付（1〜6月分）','#E08A2F'],
  ['8月','翌年の最低賃金が告示される（翌年1月から適用）','#2F8FE0'],
  ['12月','年次休暇の残りと未使用手当の確認、翌年の採用計画','#2F8FE0']],
  ['給与・税','採用・人事','4大保険'],'1年を通して：4大保険の取得・喪失の申告、法定の義務教育（年1回）、健康診断。日付は年や会社で違うので確かめましょう。★'],
 ko:['한국: 인사·급여 업무의 1년(예)',[
  ['1월','연말정산 준비(간소화 서비스 자료). 원천세 반기 납부(7~12월분)','#7A5CC7'],
  ['2월','2월 급여에서 연말정산','#7A5CC7'],
  ['3월','지급명세서 제출(3월 10일까지). 고용·산재보험과 건강보험 보수총액 신고','#E08A2F'],
  ['4월','전년 건강보험료를 정산해 4월분 보험료에 반영','#E08A2F'],
  ['7월','국민연금 기준소득월액 변경. 원천세 반기 납부(1~6월분)','#E08A2F'],
  ['8월','다음 해 최저임금 고시(다음 해 1월부터 적용)','#2F8FE0'],
  ['12월','남은 연차와 미사용 수당 확인, 다음 해 채용 계획','#2F8FE0']],
  ['급여·세금','채용·인사','4대보험'],'1년 내내: 4대보험 취득·상실 신고, 법정 의무교육(연 1회), 건강검진. 날짜는 해와 회사마다 다르니 확인하세요. ★'],
 en:['Korea: a year of HR and payroll work (example)',[
  ['Jan','Prepare the year-end settlement (simplified deduction data). Half-yearly withholding tax for July–December','#7A5CC7'],
  ['Feb','Year-end tax settlement in February’s pay','#7A5CC7'],
  ['Mar','Submit payment statements (by 10 March). Report total remuneration for employment, industrial accident and health insurance','#E08A2F'],
  ['Apr','Last year’s health insurance is settled through April’s premiums','#E08A2F'],
  ['Jul','National pension income base changes. Half-yearly withholding tax for January–June','#E08A2F'],
  ['Aug','Next year’s minimum wage is announced (applies from January)','#2F8FE0'],
  ['Dec','Check remaining annual leave and unused-leave pay; plan next year’s hiring','#2F8FE0']],
  ['Pay and tax','Hiring and HR','Four social insurances'],'All year: insurance enrolment and loss notifications, statutory training (once a year), health checks. Dates vary by year and company, so check them. ★']};

/* 8. 残業の上限（日本・韓国）：横の棒 */
var OTJP={
 ja:['日本：残業（時間外労働）の上限',[['原則の上限（1か月）',45,'#2F8FE0','45時間'],['特別条項：2〜6か月の平均（休日労働を含む）',80,'#E08A2F','80時間'],['特別条項：1か月（休日労働を含む）',100,'#D0453E','100時間未満']],'年の上限：原則360時間、特別条項でも720時間。月45時間を超えられるのは年6か月まで。★'],
 ko:['일본: 연장근로(시간외 근로)의 상한',[['원칙 상한(1개월)',45,'#2F8FE0','45시간'],['특별조항: 2~6개월 평균(휴일근로 포함)',80,'#E08A2F','80시간'],['특별조항: 1개월(휴일근로 포함)',100,'#D0453E','100시간 미만']],'연간 상한: 원칙 360시간, 특별조항이라도 720시간. 월 45시간을 넘길 수 있는 것은 연 6개월까지. ★'],
 en:['Japan: limits on overtime',[['Standard limit (one month)',45,'#2F8FE0','45 h'],['Special clause: average over 2–6 months (incl. holiday work)',80,'#E08A2F','80 h'],['Special clause: one month (incl. holiday work)',100,'#D0453E','under 100 h']],'Annual limit: 360 hours as standard, 720 even under a special clause. Months over 45 hours: no more than six a year. ★']};
var OTKR={
 ja:['韓国：1週の労働時間の上限',[['法定の労働時間（1週）',40,'#2F8FE0','40時間'],['延長労働の上限（1週）',12,'#E08A2F','12時間'],['1週の最大（休日労働を含む）',52,'#D0453E','52時間']],'常時5人未満の事業場には、52時間の上限と割増の手当が適用されません。★'],
 ko:['한국: 1주 근로시간의 상한',[['법정 근로시간(1주)',40,'#2F8FE0','40시간'],['연장근로 상한(1주)',12,'#E08A2F','12시간'],['1주 최대(휴일근로 포함)',52,'#D0453E','52시간']],'상시 5명 미만 사업장에는 52시간 상한과 가산수당이 적용되지 않습니다. ★'],
 en:['Korea: weekly limits on working hours',[['Statutory hours (per week)',40,'#2F8FE0','40 h'],['Overtime limit (per week)',12,'#E08A2F','12 h'],['Weekly maximum (incl. holiday work)',52,'#D0453E','52 h']],'Workplaces with fewer than five regular employees are exempt from the 52-hour limit and the premium pay rules. ★']};
function limFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600),mx=0,wmax=430,x0=30;
 d[1].forEach(function(r){mx=Math.max(mx,r[1])});
 d[1].forEach(function(r){var h1=hgt(r[0],12,580);s+=TW2(x0,y,r[0],12,'#0f3558',900,580,'start');y+=h1+4;
  var w=Math.max(6,wmax*r[1]/mx);s+=R(x0,y,w,20,r[2],6)+tx(x0+w+10,y+15,r[3],13,r[2],900,'start');y+=34});
 var hn=hgt(d[2],11.5,580);s+=R(20,y+2,600,hn+18,'#FFF3E0',10)+TW2(320,y+11,d[2],11.5,'#B45309',900,570);y+=hn+32;return svg(y,s)}}

/* 9. 出産と育児の休み（日本・韓国）：時間の帯 */
var LVJP={
 ja:['日本：出産と育児の休み（例）',[['産前休業（6週）',6,'#E08A2F'],['産後休業（8週）',8,'#D0453E'],['育児休業（子が1歳まで）',44,'#2F8FE0'],['延長（保育所に入れないなど。最長2歳まで）',52,'#9DB4C8']],6,'出産','父親は、子の出生から8週間以内に4週間までの「出生時の育児休業」も取れます。★'],
 ko:['일본: 출산과 육아의 휴업(예)',[['산전휴업(6주)',6,'#E08A2F'],['산후휴업(8주)',8,'#D0453E'],['육아휴업(자녀가 1세까지)',44,'#2F8FE0'],['연장(보육원에 못 들어가는 경우 등. 최장 2세까지)',52,'#9DB4C8']],6,'출산','아버지는 자녀 출생 후 8주 이내에 4주까지 「출생 시 육아휴업」도 쓸 수 있습니다. ★'],
 en:['Japan: leave for birth and childcare (example)',[['Pre-birth leave (6 weeks)',6,'#E08A2F'],['Post-birth leave (8 weeks)',8,'#D0453E'],['Childcare leave (until the child turns 1)',44,'#2F8FE0'],['Extension (e.g. no nursery place; up to age 2)',52,'#9DB4C8']],6,'Birth','Fathers can also take up to four weeks of birth-time childcare leave within eight weeks of the birth. ★']};
var LVKR={
 ja:['韓国：出産と育児の休み（例）',[['出産前後休暇（90日。出産後45日以上）',13,'#E08A2F'],['育児休職（1年）',52,'#2F8FE0'],['追加の6か月（父母がそれぞれ3か月以上使うと）',26,'#9DB4C8']],6.4,'出産','配偶者の出産休暇は20日（出産から120日以内、4回まで分けて使える）。★'],
 ko:['한국: 출산과 육아의 휴가(예)',[['출산전후휴가(90일, 출산 후 45일 이상)',13,'#E08A2F'],['육아휴직(1년)',52,'#2F8FE0'],['추가 6개월(부모가 각각 3개월 이상 쓰면)',26,'#9DB4C8']],6.4,'출산','배우자 출산휴가는 20일(출산일부터 120일 이내, 4번까지 나눠 사용). ★'],
 en:['Korea: leave for birth and childcare (example)',[['Maternity leave (90 days, at least 45 after birth)',13,'#E08A2F'],['Childcare leave (1 year)',52,'#2F8FE0'],['Extra 6 months (if each parent takes 3 months or more)',26,'#9DB4C8']],6.4,'Birth','Paternity leave is 20 days, taken within 120 days of the birth in up to four blocks. ★']};
function lvFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,'#0f3558',600),tot=0,x=30,W=580;
 d[1].forEach(function(r){tot+=r[1]});y+=FS(12)*1.6;
 var bx=x+W*d[2]/tot;s+='<line x1="'+bx+'" y1="'+(y-FS(12)*1.2)+'" x2="'+bx+'" y2="'+(y+40)+'" stroke="#0f3558" stroke-width="2" stroke-dasharray="4 3"/>'+tx(bx,y-FS(12)*1.4,d[3],12,'#0f3558',900);
 d[1].forEach(function(r,i){var w=W*r[1]/tot;s+=R(x,y,Math.max(3,w-2),30,r[2],4)+(i===d[1].length-1?'<rect x="'+x+'" y="'+y+'" width="'+Math.max(3,w-2)+'" height="30" rx="4" fill="none" stroke="#5B6B7D" stroke-dasharray="5 4"/>':'');x+=w});
 y+=48;
 d[1].forEach(function(r){var h1=hgt(r[0],12,540);s+=R(30,y+FS(12)*0.25,18,14,r[2],4)+TW2(58,y,r[0],12,D,700,540,'start');y+=h1+10});
 var hn=hgt(d[4],11.5,580);s+=R(20,y+6,600,hn+18,'#E8F6EE',10)+TW2(320,y+15,d[4],11.5,'#1F6E4A',900,570);y+=hn+36;return svg(y,s)}}

window.FIGS=window.FIGS||{};
window.FIGS.adm_paykr=H.FIX2(payFig(PAYKR));window.FIGS.adm_hrcalkr=H.FIX2(hrcalFig(HRCALKR));
window.FIGS.adm_otjp=H.FIX2(limFig(OTJP));window.FIGS.adm_otkr=H.FIX2(limFig(OTKR));window.FIGS.adm_lvjp=H.FIX2(lvFig(LVJP));window.FIGS.adm_lvkr=H.FIX2(lvFig(LVKR));
window.FIGS.adm_hrcal=H.FIX2(hrcalFig(HRCAL));window.FIGS.adm_xl=H.FIX2(xlFig(XL));
window.FIGS.adm_cash=H.FIX2(cashFig(CASH));window.FIGS.adm_pay=H.FIX2(payFig(PAY2));
window.FIGS.adm_org=H.FIX2(orgFig(ORG));window.FIGS.adm_jnl=H.FIX2(jnlFig(JNL));window.FIGS.adm_fs3=H.FIX2(fs3Fig(FS3));
})();
