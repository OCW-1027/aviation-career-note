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

window.FIGS=window.FIGS||{};
window.FIGS.adm_org=H.FIX2(orgFig(ORG));window.FIGS.adm_jnl=H.FIX2(jnlFig(JNL));window.FIGS.adm_fs3=H.FIX2(fs3Fig(FS3));
})();
