/* 日本の暮らしガイド（旧：駐在員ガイド）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR、高さは行数で計算、縦に積む配置） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,FS=H.FS,LI=H.LINES,setK=H.setK;
var D=H.C.D,G=H.C.G;
function svg(h,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+Math.ceil(h)+'" role="img">'+R(0,0,640,Math.ceil(h),'#F7FAFD')+body+'</svg>'}
function hgt(s,sz,w){return LI(s,sz,w).length*FS(sz)*1.3}
/* 上端をそろえて書く複数行（WR は y を文字のかたまりの中心として扱うため） */
function TW2(x,top,s,sz,c,w,maxw,a){var n=LI(s,sz,maxw).length,lh=FS(sz)*1.3;return WR(x,top+FS(sz)*0.95+(n-1)*lh/2,s,sz,c,w,maxw,a)}
/* 1. 自分に合う道：左に対象、右に先に読むPart（縦に積む） */
var PATH={
 ja:['このガイドの読み方 ― 自分に合う道',[['日本に新しく来る外国人','#2F8FE0','Part 1・2（在留資格）→ Part 4（着いてから14日）→ Part 5（住まい）→ Part 10（災害への備え）'],['外国企業の駐在員と家族','#7A5CC7','Part 8（駐在員編）→ Part 1（在留資格の基本）→ Part 4・6（手続きと税金）'],['留学生','#2C8C8C','Part 2（留学・アルバイトの決まり）→ Part 5（住まい）→ Part 9（新しい街での暮らし）'],['地方から都市へ来る学生・転勤・新入社員','#E08A2F','Part 9（新しい街で始める）→ Part 5（住まい）→ Part 10（災害への備え）'],['会社の人事・受け入れ担当','#D0506A','Part 3（制度の変化）→ Part 1（手続きと手数料）→ Part 8（駐在員の受け入れ）']]],
 ko:['이 가이드 읽는 법 — 나에게 맞는 길',[['일본에 새로 오는 외국인','#2F8FE0','Part 1·2(재류자격) → Part 4(도착 후 14일) → Part 5(집) → Part 10(재난 대비)'],['외국 기업 주재원과 가족','#7A5CC7','Part 8(주재원 편) → Part 1(재류자격 기초) → Part 4·6(수속과 세금)'],['유학생','#2C8C8C','Part 2(유학·아르바이트 규칙) → Part 5(집) → Part 9(새 도시에서의 생활)'],['지방에서 도시로 오는 학생·전근자·신입 사원','#E08A2F','Part 9(새 도시에서 시작하기) → Part 5(집) → Part 10(재난 대비)'],['회사 인사·외국인 담당자','#D0506A','Part 3(제도 변화) → Part 1(수속과 수수료) → Part 8(주재원 받아들이기)']]],
 en:['How to use this guide: find your route',[['Foreign nationals new to Japan','#2F8FE0','Parts 1–2 (residence status) → Part 4 (first 14 days) → Part 5 (housing) → Part 10 (disaster preparedness)'],['Expatriates of foreign companies and families','#7A5CC7','Part 8 (expatriates) → Part 1 (residence basics) → Parts 4 and 6 (procedures and tax)'],['International students','#2C8C8C','Part 2 (study and part-time work rules) → Part 5 (housing) → Part 9 (life in a new city)'],['Students, transferees and new hires moving to a big city','#E08A2F','Part 9 (starting in a new city) → Part 5 (housing) → Part 10 (disaster preparedness)'],['HR and people who host foreign staff','#D0506A','Part 3 (what is changing) → Part 1 (procedures and fees) → Part 8 (hosting expatriates)']]]};
function figPath(l){setK(1);var d=PATH[l]||PATH.ja,y=58,s=TTL(320,30,d[0],15,'#0f3558',600);
 d[1].forEach(function(r){var h1=hgt(r[0],12,188),h2=hgt(r[2],11.5,380),h=Math.max(h1,h2)+22;
  s+=R(20,y,600,h,'#fff',12,' stroke="#D9E3EC"')+R(20,y,8,h,r[1],4)+TW2(124,y+(h-h1)/2-FS(12)*0.15,r[0],12,r[1],900,188)+TW2(230,y+(h-h2)/2-FS(11.5)*0.15,r[2],11.5,D,700,380,'start');y+=h+10});
 return svg(y+8,s)}
/* 2. 在留資格の地図：働く／学ぶ・家族／身分・地位／特定活動 */
var MAP={
 ja:{t:'在留資格の地図（主なもの）',g:[
  ['働く資格（仕事の範囲が決まっている）','#2F8FE0','技術・人文知識・国際業務／企業内転勤／高度専門職／経営・管理／特定技能／技能実習（2027年4月から育成就労へ）／教授・研究・医療など'],
  ['学ぶ・家族の資格（原則として働けない）','#E08A2F','留学／家族滞在／研修／文化活動 ― 資格外活動の許可があれば、週28時間までなどの範囲で働ける'],
  ['身分・地位の資格（仕事の制限なし）','#1F8A5B','永住者／日本人の配偶者等／永住者の配偶者等／定住者'],
  ['特定活動（許可の内容しだい）','#7A5CC7','ワーキング・ホリデー／デジタルノマド／未来創造人材（J-Find）など ― 指定書に書かれた活動だけ']],
  n:'※ 短期滞在（観光・商用など90日以内）は働けません。在留資格は全部で約30種類あります。'},
 ko:{t:'재류자격 지도(주요한 것)',g:[
  ['일하는 자격(일의 범위가 정해져 있음)','#2F8FE0','기술·인문지식·국제업무 / 기업내전근 / 고도전문직 / 경영·관리 / 특정기능 / 기능실습(2027년 4월부터 육성취로로) / 교수·연구·의료 등'],
  ['배우는·가족 자격(원칙적으로 일할 수 없음)','#E08A2F','유학 / 가족체재 / 연수 / 문화활동 — 자격외활동 허가가 있으면 주 28시간 이내 등 범위에서 일할 수 있음'],
  ['신분·지위 자격(일의 제한 없음)','#1F8A5B','영주자 / 일본인의 배우자 등 / 영주자의 배우자 등 / 정주자'],
  ['특정활동(허가 내용에 따름)','#7A5CC7','워킹홀리데이 / 디지털 노마드 / 미래창조인재(J-Find) 등 — 지정서에 적힌 활동만']],
  n:'※ 단기체재(관광·상용 등 90일 이내)는 일할 수 없습니다. 재류자격은 모두 약 30종류입니다.'},
 en:{t:'Map of residence statuses (main ones)',g:[
  ['Work statuses (the type of work is fixed)','#2F8FE0','Engineer/Specialist in Humanities/International Services; Intra-company Transferee; Highly Skilled Professional; Business Manager; Specified Skilled Worker; Technical Intern (becoming Employment for Skill Development from April 2027); professor, researcher, medical and others'],
  ['Study and family statuses (no work in principle)','#E08A2F','Student; Dependent; Trainee; Cultural Activities: with permission for activity outside status, limited work such as up to 28 hours a week'],
  ['Statuses based on personal status (no work limits)','#1F8A5B','Permanent Resident; Spouse or Child of Japanese National; Spouse or Child of Permanent Resident; Long-term Resident'],
  ['Designated Activities (depends on the permission)','#7A5CC7','Working holiday; digital nomad; Future Creation Individual (J-Find) and others: only the activities in the designation']],
  n:'* Temporary visitors (tourism, business trips, up to 90 days) may not work. There are about 30 residence statuses in all.'}};
function figMap(l){setK(1);var d=MAP[l]||MAP.ja,y=58,s=TTL(320,30,d.t,15,'#0f3558',600);
 d.g.forEach(function(g){var h1=hgt(g[0],12.5,560),h2=hgt(g[2],11.5,560),h=h1+h2+30;
  s+=R(20,y,600,h,'#fff',12,' stroke="'+g[1]+'" stroke-width="2"')+R(20,y,600,h1+14,g[1],12)+R(20,y+h1+2,600,12,g[1])+TW2(40,y+6,g[0],12.5,'#fff',900,560,'start')+TW2(40,y+h1+20,g[2],11.5,D,700,560,'start');y+=h+12});
 var hn=hgt(d.n,11,580);s+=TW2(30,y,d.n,11,G,700,580,'start');y+=hn+10;
 return svg(y,s)}
/* 3. 手続きの流れ：海外で→入国→住み始め→更新・変更・再入国 */
var FLOW={
 ja:['入国から更新までの流れ（就労の例）',[['海外で','会社が日本で在留資格認定証明書（COE）を申請 → 本人が日本の大使館・領事館で査証（ビザ）を受ける'],['入国','主な空港では入国審査で在留カードを受け取る'],['14日以内','住む市区町村に転入の届出（在留カードの住所の記載）'],['働いている間','所属機関が変わったら14日以内に届出。仕事の内容が変わるなら在留資格の変更'],['期限の3か月前から','在留期間の更新を申請（期限までに申請すれば、結果が出るまで一定期間は滞在できる）'],['一時帰国','出国から1年以内に戻るなら、在留カードを持って「みなし再入国」。それより長いなら再入国許可']],'※ 例です。資格や家族の有無で手続きが変わります。'],
 ko:['입국부터 갱신까지의 흐름(취업의 예)',[['해외에서','회사가 일본에서 재류자격인정증명서(COE)를 신청 → 본인이 일본 대사관·영사관에서 사증(비자)을 받음'],['입국','주요 공항에서는 입국 심사 때 재류카드를 받음'],['14일 이내','사는 시구정촌에 전입 신고(재류카드에 주소 기재)'],['일하는 동안','소속 기관이 바뀌면 14일 이내 신고. 일의 내용이 바뀌면 재류자격 변경'],['만료 3개월 전부터','재류기간 갱신 신청(만료 전에 신청하면 결과가 나올 때까지 일정 기간 체류 가능)'],['일시 귀국','출국 후 1년 이내에 돌아오면 재류카드를 갖고 ‘간주 재입국’. 더 길면 재입국 허가']],'※ 예입니다. 자격과 가족 유무에 따라 수속이 달라집니다.'],
 en:['From entry to renewal (a work example)',[['Abroad','The employer applies in Japan for a Certificate of Eligibility (COE); you then get a visa at a Japanese embassy or consulate'],['Entry','At major airports you receive your residence card at immigration'],['Within 14 days','Register your address at the city office where you live (it is written on the card)'],['While working','Report a change of employer within 14 days; change status if the type of work changes'],['From 3 months before expiry','Apply to extend your period of stay (if you apply in time, you may stay for a set period until the decision)'],['Trips home','Back within a year: special re-entry with your residence card. Longer: a re-entry permit']],'* An example; steps differ by status and family situation.']};
function figFlow(l){setK(1);var d=FLOW[l]||FLOW.ja,y=58,s=TTL(320,30,d[0],15,'#0f3558',600),top=y;
 d[1].forEach(function(r,i){var h2=hgt(r[1],11.5,440),h=Math.max(h2,hgt(r[0],11,80))+20;
  s+=R(150,y,470,h,'#fff',10,' stroke="#D9E3EC"')+'<circle cx="112" cy="'+(y+h/2)+'" r="9" fill="#2F8FE0"/>'+tx(112,y+h/2+4,String(i+1),11,'#fff',900)+WR(58,y+h/2+FS(11)*0.35,r[0],11,'#2F6FD6',900,80)+TW2(166,y+(h-h2)/2-FS(11.5)*0.15,r[1],11.5,D,700,440,'start');y+=h+10});
 s='<line x1="112" y1="'+(top+10)+'" x2="112" y2="'+(y-18)+'" stroke="#C8D3DE" stroke-width="3"/>'+s;
 var hn=hgt(d[2],11,580);s+=TW2(30,y,d[2],11,G,700,580,'start');y+=hn+10;return svg(y,s)}
/* 4. 手数料の棒グラフ（窓口）と改定前の線 */
var FEE={ja:['在留許可の手数料（窓口、2026年10月1日以後の申請）','改定前：一律6,000円','永住許可：1万円 → 20万円',['3か月以下','〜6か月','〜1年未満','1年','〜3年未満','3〜5年未満','5年以上'],'オンライン'],
 ko:['재류 허가 수수료(창구, 2026년 10월 1일 이후 신청)','개정 전: 일률 6,000엔','영주 허가: 1만 엔 → 20만 엔',['3개월 이하','~6개월','~1년 미만','1년','~3년 미만','3~5년 미만','5년 이상'],'온라인'],
 en:['Residence permission fees (counter, applications from 1 Oct 2026)','Before: ¥6,000 for all','Permanent residence: ¥10,000 → ¥200,000',['≤3 months','≤6 months','<1 year','1 year','<3 years','3–<5 years','5+ years'],'Online']};
var WIN=[10000,18000,25000,33000,48000,64000,75000],ONL=[10000,15000,21000,27000,42000,56000,65000];
function yen(v,l){return l==='en'?'¥'+v.toLocaleString('en-US'):(v/10000).toFixed(v%10000?1:0)+(l==='ja'?'万円':'만 엔')}
function figFee(l){setK(1);var d=FEE[l]||FEE.ja,s=TTL(320,30,d[0],14,'#0f3558',600),x0=30,wmax=580,y=60,bh=14,xo=x0+wmax*6000/75000;
 d[3].forEach(function(lab,i){var w=wmax*WIN[i]/75000,lh=FS(11.5)*1.3,amt=yen(WIN[i],l)+'  ·  '+d[4]+' '+yen(ONL[i],l);
  s+=TW2(x0,y,lab,11.5,D,900,580,'start');y+=lh+2;s+=R(x0,y,w,bh,'#2F8FE0',5);y+=bh+4;
  var ha=hgt(amt,11,580);s+=TW2(x0,y,amt,11,'#0f3558',800,580,'start');y+=ha+10});
 s+='<line x1="'+xo+'" y1="58" x2="'+xo+'" y2="'+(y-6)+'" stroke="#D0453E" stroke-width="2" stroke-dasharray="5 4"/>';
 var h1=hgt(d[1],11,560);s+=TW2(x0,y,'┊ '+d[1],11,'#D0453E',800,560,'start');y+=h1+8;
 var h2=hgt(d[2],12.5,560);s+=R(20,y,600,h2+16,'#FFF3E0',10)+TW2(320,y+8,d[2],12.5,'#B45309',900,560);y+=h2+28;return svg(y,s)}
/* 5. 制度の変化の年表（今日の位置つき） */
var TLR={
 ja:['在留制度の変化（2025〜2028）','今日 2026.10.1',[['2025.10.16','経営・管理の基準が厳しく（資本金3,000万円・常勤1名・日本語B2など）'],['2026.4.15','技人国：カテゴリー3・4の会社で語学を使う対人業務はB2の証明'],['2026.5.29','改正入管法が成立（JESTA・手数料の上限）'],['2026.6.14','特定在留カード（在留カードとマイナンバーカードの一体化）'],['2026.10.1','在留許可の手数料が期間に応じて1万〜7.5万円、永住20万円'],['2027.4.1','育成就労が始まる（技能実習は廃止）・永住者の取消し事由の追加'],['2028年度','JESTA（短期滞在の渡航前審査）開始の予定']]],
 ko:['재류 제도의 변화(2025~2028)','오늘 2026.10.1',[['2025.10.16','경영·관리 기준 강화(자본금 3,000만 엔·상근 1명·일본어 B2 등)'],['2026.4.15','기인국: 카테고리 3·4 회사에서 언어를 쓰는 대인 업무는 B2 증명'],['2026.5.29','개정 입관법 성립(JESTA·수수료 상한)'],['2026.6.14','특정재류카드(재류카드와 마이넘버카드 일체화)'],['2026.10.1','재류 허가 수수료가 기간에 따라 1만~7.5만 엔, 영주 20만 엔'],['2027.4.1','육성취로 시작(기능실습 폐지)·영주자 취소 사유 추가'],['2028년도','JESTA(단기체재 입국 전 심사) 시작 예정']]],
 en:['Changes to the residence system (2025–2028)','Today 1 Oct 2026',[['16 Oct 2025','Stricter Business Manager rules (¥30m capital, one full-time employee, Japanese at B2 and more)'],['15 Apr 2026','Engineer/Humanities: proof of B2 for language-based client work at category 3–4 employers'],['29 May 2026','Amended Immigration Act passed (JESTA, higher fee caps)'],['14 Jun 2026','Combined residence card and My Number card (optional)'],['1 Oct 2026','Permission fees by length of stay: ¥10,000–75,000; permanent residence ¥200,000'],['1 Apr 2027','Employment for Skill Development starts (technical internship ends); new grounds to revoke permanent residence'],['FY2028','JESTA pre-travel screening for short stays planned']]]};
function figReform(l){setK(1);var d=TLR[l]||TLR.ja,y=58,s=TTL(320,30,d[0],15,'#0f3558',600),top=y,today=4,rows='';
 d[2].forEach(function(e,i){var now=i===today,past=i<today,tg=now?FS(11)*1.3+4:0,h2=hgt(e[1],11.5,420),h=Math.max(h2+tg,hgt(e[0],11,110))+18;
  rows+=R(170,y,450,h,now?'#FFF6EC':'#fff',10,' stroke="'+(now?'#F0A04B':'#D9E3EC')+'" stroke-width="'+(now?2:1)+'"')+'<circle cx="140" cy="'+(y+h/2)+'" r="7" fill="'+(now?'#F08C2C':past?'#9DB4C8':'#2F8FE0')+'"/>'+WR(70,y+h/2+FS(11)*0.35,e[0],11,past?G:'#2F6FD6',900,110)+(now?TW2(186,y+8,'▶ '+d[1],11,'#B45309',900,420,'start'):'')+TW2(186,y+9+tg,e[1],11.5,past?G:D,700,420,'start');
  y+=h+10});
 s+='<line x1="140" y1="'+(top+8)+'" x2="140" y2="'+(y-16)+'" stroke="#C8D3DE" stroke-width="3"/>'+rows;return svg(y+4,s)}
window.FIGS=window.FIGS||{};
window.FIGS.life_path=H.FIX2(figPath);window.FIGS.life_map=H.FIX2(figMap);window.FIGS.life_flow=H.FIX2(figFlow);window.FIGS.life_fee=H.FIX2(figFee);window.FIGS.life_reform=H.FIX2(figReform);
/* 6. 技人国の所属機関カテゴリー（書類の負担と2026年の言語の確認） */
var CAT={
 ja:['所属機関のカテゴリー（技術・人文知識・国際業務など）',[['カテゴリー1','上場企業・国や自治体など','書類はいちばん少ない'],['カテゴリー2','前年の源泉徴収税額の合計が1,000万円以上の団体・個人','書類は少ない'],['カテゴリー3','前年の源泉徴収票の合計表を出した団体・個人（2以外）','決算書・会社案内なども要る。語学を使う対人業務ならB2の証明（2026年4月〜）'],['カテゴリー4','1〜3のどれにもあたらない（新しくできた会社など）','事業計画書など書類がいちばん多い。語学を使う対人業務ならB2の証明（2026年4月〜）']],'※ 概要です。実際の提出書類は出入国在留管理庁の案内で確かめましょう。'],
 ko:['소속 기관의 카테고리(기술·인문지식·국제업무 등)',[['카테고리 1','상장 기업·국가나 지자체 등','서류가 가장 적음'],['카테고리 2','전년도 원천징수 세액 합계가 1,000만 엔 이상인 단체·개인','서류가 적음'],['카테고리 3','전년도 원천징수표 합계표를 제출한 단체·개인(2 제외)','결산서·회사 안내 등도 필요. 언어를 쓰는 대인 업무면 B2 증명(2026년 4월~)'],['카테고리 4','1~3에 해당하지 않음(새로 생긴 회사 등)','사업계획서 등 서류가 가장 많음. 언어를 쓰는 대인 업무면 B2 증명(2026년 4월~)']],'※ 개요입니다. 실제 제출 서류는 출입국재류관리청 안내로 확인하세요.'],
 en:['Employer categories (Engineer/Humanities and others)',[['Category 1','Listed companies, national and local government and similar','Fewest documents'],['Category 2','Organisations or individuals whose withholding tax last year totalled ¥10 million or more','Few documents'],['Category 3','Others that filed last year’s withholding summary (not category 2)','Financial statements and company profile too; B2 proof for language-based client work (from April 2026)'],['Category 4','None of 1–3 (for example new companies)','Most documents, including a business plan; B2 proof for language-based client work (from April 2026)']],'* An outline; check the Immigration Services Agency’s document lists.']};
function figCat(l){setK(1);var d=CAT[l]||CAT.ja,y=58,s=TTL(320,30,d[0],15,'#0f3558',600),C=['#1F8A5B','#2C8C8C','#E08A2F','#D0506A'];
 d[1].forEach(function(r,i){var h1=hgt(r[1],11.5,440),h2=hgt(r[2],11,440),h=Math.max(h1+h2+10,hgt(r[0],12,110))+20;
  s+=R(20,y,600,h,'#fff',12,' stroke="#D9E3EC"')+R(20,y,130,h,C[i],12)+R(138,y,12,h,C[i])+WR(85,y+h/2+FS(12)*0.35,r[0],12,'#fff',900,110)+TW2(166,y+10,r[1],11.5,D,800,440,'start')+TW2(166,y+14+h1,r[2],11,i>1?'#B45309':G,800,440,'start');y+=h+8});
 var hn=hgt(d[2],11,580);s+=TW2(30,y+4,d[2],11,G,700,580,'start');y+=hn+14;return svg(y,s)}
/* 7. 永住までの年数（原則と高度人材の短縮） */
var PRY={ja:['永住の申請までの在留年数（目安）',[['原則','10年（うち就労・居住の資格で5年）',10],['日本人の配偶者など','結婚3年以上＋日本に1年',3],['高度人材 70点以上','3年',3],['高度人材 80点以上','1年',1],['特別高度人材（J-Skip）','1年',1]],'年','※ 年数のほかに、素行・生計・税や社会保険の納付などの要件があります（出入国在留管理庁「永住許可に関するガイドライン」）。'],
 ko:['영주 신청까지의 체류 연수(기준)',[['원칙','10년(그중 취업·거주 자격으로 5년)',10],['일본인의 배우자 등','혼인 3년 이상 + 일본 1년',3],['고도인재 70점 이상','3년',3],['고도인재 80점 이상','1년',1],['특별고도인재(J-Skip)','1년',1]],'년','※ 연수 외에 품행·생계·세금과 사회보험 납부 등의 요건이 있습니다(출입국재류관리청 「영주 허가에 관한 가이드라인」).'],
 en:['Years in Japan before applying for permanent residence (guide)',[['Standard','10 years (5 of them on a work or residence status)',10],['Spouse of a Japanese national','3 years married + 1 year in Japan',3],['Highly skilled, 70+ points','3 years',3],['Highly skilled, 80+ points','1 year',1],['J-Skip','1 year',1]],'yrs','* Besides years, there are requirements on conduct, income and payment of taxes and social insurance (Immigration Services Agency permanent residence guidelines).']};
function figPR(l){setK(1);var d=PRY[l]||PRY.ja,s=TTL(320,30,d[0],15,'#0f3558',600),y=60,x0=30,wmax=560;
 d[1].forEach(function(r,i){var lh=hgt(r[0],12,580),w=wmax*r[2]/10;s+=TW2(x0,y,r[0],12,D,900,580,'start');y+=lh+2;s+=R(x0,y,w,16,i===0?'#9DB4C8':'#2F8FE0',6);y+=20;var ha=hgt(r[1],11,580);s+=TW2(x0,y,r[1],11,i===0?G:'#0f3558',800,580,'start');y+=ha+12});
 var hn=hgt(d[3],11,580);s+=TW2(x0,y,d[3],11,G,700,580,'start');y+=hn+12;return svg(y,s)}
/* 8. 経営・管理 改正の前と後 */
var BM={ja:['在留資格「経営・管理」の許可基準（2025年10月16日から）',['項目','改正の前','改正の後'],[['事業の規模','資本金500万円以上、または常勤2名以上','資本金など3,000万円以上'],['常勤職員','上とどちらか','1名以上が必須（日本人・永住者などに限る）'],['日本語','要件なし','本人または常勤職員がB2相当（N2など）'],['経歴','要件なし','経営・管理の経験3年以上、または関連の修士など'],['事業計画書','本人が作る','中小企業診断士・公認会計士・税理士の確認']],'※ 改正前から持っている人は、2028年10月16日まで経過措置があります。'],
 ko:['재류자격 「경영·관리」 허가 기준(2025년 10월 16일부터)',['항목','개정 전','개정 후'],[['사업 규모','자본금 500만 엔 이상, 또는 상근 2명 이상','자본금 등 3,000만 엔 이상'],['상근 직원','위와 둘 중 하나','1명 이상 필수(일본인·영주자 등으로 한정)'],['일본어','요건 없음','본인 또는 상근 직원이 B2 수준(N2 등)'],['경력','요건 없음','경영·관리 경험 3년 이상, 또는 관련 석사 등'],['사업계획서','본인이 작성','중소기업진단사·공인회계사·세무사의 확인']],'※ 개정 전부터 가진 사람은 2028년 10월 16일까지 경과 조치가 있습니다.'],
 en:['Business Manager status: approval criteria (from 16 October 2025)',['Item','Before','After'],[['Scale','Capital ¥5m or more, or two full-time staff','Capital or equivalent ¥30m or more'],['Full-time staff','Either of the above','At least one, required (Japanese nationals, permanent residents and similar)'],['Japanese','No requirement','Applicant or employee at B2 (JLPT N2 or similar)'],['Background','No requirement','3+ years’ management experience or a related master’s degree'],['Business plan','Written by the applicant','Checked by a certified SME consultant, CPA or tax accountant']],'* Holders from before the change have transitional measures until 16 October 2028.']};
function figBM(l){setK(1);var d=BM[l]||BM.ja,s=TTL(320,30,d[0],15,'#0f3558',600),y=60,xL=30,xB=150,xA=390,wB=220,wA=220;
 s+=tx(xL,y+14,d[1][0],11,G,900,'start')+tx(xB,y+14,d[1][1],11,G,900,'start')+tx(xA,y+14,d[1][2],11,'#D0453E',900,'start');y+=26;
 d[2].forEach(function(r){var h0=hgt(r[0],11.5,110),h1=hgt(r[1],11.5,wB),h2=hgt(r[2],11.5,wA),h=Math.max(h0,h1,h2)+16;
  s+=R(20,y,600,h,'#fff',10,' stroke="#D9E3EC"')+R(380,y,240,h,'#FFF4F2',10)+TW2(xL,y+8,r[0],11.5,D,900,110,'start')+TW2(xB,y+8,r[1],11.5,G,700,wB,'start')+TW2(xA,y+8,r[2],11.5,'#B42318',800,wA,'start');y+=h+6});
 var hn=hgt(d[3],11,580);s+=TW2(30,y+6,d[3],11,G,700,580,'start');y+=hn+16;return svg(y,s)}
/* 9. 育成就労 → 特定技能1号 → 2号 */
var SSW={ja:['人手不足の分野で働く道（2027年4月から）',[['育成就労','原則3年。特定技能1号の水準まで育てる。条件を満たせば本人の意向で転籍できる','#2C8C8C'],['特定技能1号','通算で最長5年。家族は原則として呼べない。技能の試験と日本語（A2相当以上）','#2F8FE0'],['特定技能2号','更新の上限なし。家族（配偶者・子）を呼べる。熟練した技能の試験','#1F8A5B'],['永住の可能性','2号などで長く住み、要件を満たせば永住の申請へ','#7A5CC7']],'※ 特定技能は16分野（2号は11分野）。航空は特定技能の分野だが、育成就労の対象外。外食業は2026年4月から新しい受入れを一時停止。'],
 ko:['인력이 모자라는 분야에서 일하는 길(2027년 4월부터)',[['육성취로','원칙 3년. 특정기능 1호 수준까지 키움. 조건을 충족하면 본인 의사로 전적 가능','#2C8C8C'],['특정기능 1호','통산 최장 5년. 가족은 원칙적으로 부를 수 없음. 기능 시험과 일본어(A2 수준 이상)','#2F8FE0'],['특정기능 2호','갱신 상한 없음. 가족(배우자·자녀)을 부를 수 있음. 숙련 기능 시험','#1F8A5B'],['영주의 가능성','2호 등으로 오래 살며 요건을 충족하면 영주 신청으로','#7A5CC7']],'※ 특정기능은 16개 분야(2호는 11개 분야). 항공은 특정기능 분야지만 육성취로 대상은 아님. 외식업은 2026년 4월부터 신규 수용 일시 정지.'],
 en:['Working in sectors short of staff (from April 2027)',[['Employment for Skill Development','Usually 3 years, training to Specified Skilled Worker (i) level; transfers at your own wish are possible under conditions','#2C8C8C'],['Specified Skilled Worker (i)','Up to 5 years in total; family generally cannot join; skills test and Japanese at A2 or above','#2F8FE0'],['Specified Skilled Worker (ii)','No limit on extensions; spouse and children can join; advanced skills test','#1F8A5B'],['Path to permanent residence','Long residence on (ii) or similar, meeting the requirements, can lead to an application','#7A5CC7']],'* 16 sectors for (i), 11 for (ii). Aviation is an SSW sector but not covered by Employment for Skill Development. New intake for food service paused from April 2026.']};
function figSSW(l){setK(1);var d=SSW[l]||SSW.ja,s=TTL(320,30,d[0],15,'#0f3558',600),y=60;
 d[1].forEach(function(r,i){var h1=hgt(r[0],12.5,560),h2=hgt(r[1],11.5,560),h=h1+h2+28;
  s+=R(20,y,600,h,'#fff',12,' stroke="'+r[2]+'" stroke-width="2"')+R(20,y,600,h1+12,r[2],12)+R(20,y+h1,600,12,r[2])+TW2(40,y+5,r[0],12.5,'#fff',900,560,'start')+TW2(40,y+h1+18,r[1],11.5,D,700,560,'start');y+=h;
  if(i<d[1].length-1){s+='<path d="M320 '+(y+2)+' l-10 0 l10 12 l10 -12 z" fill="'+r[2]+'"/>';y+=18}else y+=8});
 var hn=hgt(d[2],11,580);s+=TW2(30,y+4,d[2],11,G,700,580,'start');y+=hn+14;return svg(y,s)}
window.FIGS.life_cat=H.FIX2(figCat);window.FIGS.life_pr=H.FIX2(figPR);window.FIGS.life_bm=H.FIX2(figBM);window.FIGS.life_ssw=H.FIX2(figSSW);
/* 10. 留学から就職まで */
var STW={ja:['留学生が日本で就職するまで（大学・専門学校）',[['在学中','資格外活動の許可でアルバイト（週28時間まで）。就職活動を始める','#2C8C8C'],['内定','仕事の内容が専攻と合うかを会社と確かめる','#2F8FE0'],['入社の前','在留資格の変更を申請（4月入社なら前の年の12月ごろから受付）','#2F8FE0'],['卒業しても決まらない','「継続就職活動」の特定活動で6か月、1回更新して最長1年（学校の推薦状が要る）','#E08A2F'],['入社','技術・人文知識・国際業務など。日本の大学を出てN1なら特定活動46号も','#1F8A5B']],'※ 専門学校の卒業生は、専攻と仕事の関係をとくに厳しく見られます。'],
 ko:['유학생이 일본에서 취업하기까지(대학·전문학교)',[['재학 중','자격외활동 허가로 아르바이트(주 28시간까지). 취업 활동 시작','#2C8C8C'],['내정','일의 내용이 전공과 맞는지 회사와 확인','#2F8FE0'],['입사 전','재류자격 변경 신청(4월 입사면 전년 12월경부터 접수)','#2F8FE0'],['졸업해도 못 정했을 때','「계속 취업 활동」 특정활동으로 6개월, 1회 갱신해 최장 1년(학교 추천서 필요)','#E08A2F'],['입사','기술·인문지식·국제업무 등. 일본 대학 졸업 + N1이면 특정활동 46호도','#1F8A5B']],'※ 전문학교 졸업생은 전공과 일의 관련성을 특히 엄격하게 봅니다.'],
 en:['From student to employee in Japan (university or vocational school)',[['While studying','Part-time work with permission (up to 28 hours a week); start job hunting','#2C8C8C'],['Job offer','Check with the employer that the job matches your major','#2F8FE0'],['Before starting','Apply to change status (for an April start, applications open around the previous December)','#2F8FE0'],['Graduated without a job','Designated Activities for continued job hunting: 6 months, extendable once to a maximum of 1 year (school recommendation needed)','#E08A2F'],['Start work','Engineer/Humanities or similar; Japanese university graduates with N1 can also use Designated Activities No. 46','#1F8A5B']],'* For vocational school graduates, the link between major and job is checked especially strictly.']};
function figSTW(l){setK(1);var d=STW[l]||STW.ja,y=58,s=TTL(320,30,d[0],15,'#0f3558',600),top=y,rows='';
 d[1].forEach(function(r,i){var h1=hgt(r[0],12,420),h2=hgt(r[1],11.5,420),h=h1+h2+22;
  rows+=R(150,y,470,h,'#fff',10,' stroke="'+r[2]+'" stroke-width="1.5"')+'<circle cx="112" cy="'+(y+h/2)+'" r="10" fill="'+r[2]+'"/>'+tx(112,y+h/2+4,String(i+1),11,'#fff',900)+TW2(166,y+8,r[0],12,r[2],900,440,'start')+TW2(166,y+12+h1,r[1],11.5,D,700,440,'start');y+=h+10});
 s+='<line x1="112" y1="'+(top+10)+'" x2="112" y2="'+(y-18)+'" stroke="#C8D3DE" stroke-width="3"/>'+rows;
 var hn=hgt(d[2],11,580);s+=TW2(30,y,d[2],11,G,700,580,'start');y+=hn+12;return svg(y,s)}
/* 11. 永住と帰化の比べ */
var PN={ja:['永住と帰化のちがい',['','永住','帰化'],[['国籍','いまの国籍のまま','日本国籍になる（もとの国籍は失う）'],['どこへ申請','出入国在留管理庁','法務局'],['年数の目安','原則10年（うち就労など5年）','原則5年（うち就労3年）'],['できること','在留期間の制限なし・仕事の制限なし','日本の旅券・選挙権'],['注意','在留カードの更新（7年ごと）、再入国の手続きは続く。取消しの事由あり','韓国籍の人は、外国籍を自ら取ると韓国籍を失う（国籍喪失の届出）']],'※ 目安です。どちらも素行・生計・税や社会保険の納付などが審査されます。'],
 ko:['영주와 귀화의 차이',['','영주','귀화'],[['국적','지금의 국적 그대로','일본 국적이 됨(원래 국적은 잃음)'],['어디에 신청','출입국재류관리청','법무국'],['연수 기준','원칙 10년(그중 취업 등 5년)','원칙 5년(그중 취업 3년)'],['할 수 있는 것','재류 기간 제한 없음·일의 제한 없음','일본 여권·선거권'],['주의','재류카드 갱신(7년마다), 재입국 수속은 계속. 취소 사유 있음','한국 국적자는 외국 국적을 스스로 취득하면 한국 국적을 잃음(국적상실신고)']],'※ 기준입니다. 둘 다 품행·생계·세금과 사회보험 납부 등을 심사합니다.'],
 en:['Permanent residence versus naturalisation',['','Permanent residence','Naturalisation'],[['Nationality','Keep your current nationality','Become a Japanese national (and lose your original one)'],['Apply to','Immigration Services Agency','Legal Affairs Bureau'],['Years (guide)','10 in principle (5 of them working)','5 in principle (3 of them working)'],['What you gain','No limit on stay or on work','A Japanese passport and the vote'],['Watch out','Card renewal every 7 years and re-entry rules still apply; can be revoked','Korean nationals who voluntarily acquire another nationality lose Korean nationality (report the loss)']],'* A guide; both examine conduct, income and payment of taxes and social insurance.']};
function figPN(l){setK(1);var d=PN[l]||PN.ja,s=TTL(320,30,d[0],15,'#0f3558',600),y=60,xL=30,xA=150,xB=390,w=220;
 s+=R(140,y,235,26,'#1F8A5B',8)+R(380,y,240,26,'#2F8FE0',8)+tx(257,y+18,d[1][1],12,'#fff',900)+tx(500,y+18,d[1][2],12,'#fff',900);y+=34;
 d[2].forEach(function(r){var h0=hgt(r[0],11.5,105),h1=hgt(r[1],11.5,w),h2=hgt(r[2],11.5,w),h=Math.max(h0,h1,h2)+16;
  s+=R(20,y,600,h,'#fff',10,' stroke="#D9E3EC"')+TW2(xL,y+8,r[0],11.5,G,900,105,'start')+TW2(xA,y+8,r[1],11.5,D,700,w,'start')+TW2(xB,y+8,r[2],11.5,D,700,w,'start');y+=h+6});
 var hn=hgt(d[3],11,580);s+=TW2(30,y+6,d[3],11,G,700,580,'start');y+=hn+16;return svg(y,s)}
window.FIGS.life_stw=H.FIX2(figSTW);window.FIGS.life_pn=H.FIX2(figPN);
/* 12. 警戒レベル（避難情報） */
var LV={ja:['避難の目安 ― 警戒レベル',[['5','緊急安全確保','すでに災害が起きている。命を守る最善の行動を（家の2階以上・近くの頑丈な建物へ）','#111111','#fff'],['4','避難指示','危険な場所から全員避難。ここまでに必ず逃げる','#7A3FB0','#fff'],['3','高齢者等避難','高齢者・障害のある人・乳幼児のいる家庭は避難。ほかの人も準備','#D0453E','#fff'],['2','大雨・洪水注意報など','ハザードマップで避難先と道を確かめる','#F2C94C','#1d2a3a'],['1','早期注意情報','最新の気象情報に注意','#FFFFFF','#1d2a3a']],'※ レベル4の「避難指示」で必ず避難。レベル5を待たない（内閣府「避難情報に関するガイドライン」）。'],
 ko:['대피의 기준 — 경계 레벨',[['5','긴급 안전 확보','이미 재해가 일어남. 목숨을 지키는 최선의 행동을(집 2층 이상·근처 튼튼한 건물로)','#111111','#fff'],['4','대피 지시','위험한 곳에서 모두 대피. 여기까지 반드시 대피','#7A3FB0','#fff'],['3','고령자 등 대피','고령자·장애가 있는 사람·영유아가 있는 가정은 대피. 다른 사람도 준비','#D0453E','#fff'],['2','호우·홍수 주의보 등','해저드맵으로 대피처와 길을 확인','#F2C94C','#1d2a3a'],['1','조기 주의 정보','최신 기상 정보에 주의','#FFFFFF','#1d2a3a']],'※ 레벨 4 「대피 지시」에서 반드시 대피. 레벨 5를 기다리지 않습니다(내각부 「대피 정보에 관한 가이드라인」).'],
 en:['When to evacuate: alert levels',[['5','Emergency safety measures','Disaster already happening; do whatever protects your life (upper floors, a nearby sturdy building)','#111111','#fff'],['4','Evacuation instruction','Everyone leaves dangerous areas; evacuate by this level at the latest','#7A3FB0','#fff'],['3','Evacuation of older people and others','Older people, people with disabilities and families with small children evacuate; others prepare','#D0453E','#fff'],['2','Heavy rain or flood advisory','Check your evacuation site and route on the hazard map','#F2C94C','#1d2a3a'],['1','Early warning information','Watch the latest weather information','#FFFFFF','#1d2a3a']],'* Always evacuate at level 4; do not wait for level 5 (Cabinet Office evacuation guidelines).']};
function figLV(l){setK(1);var d=LV[l]||LV.ja,s=TTL(320,30,d[0],15,'#0f3558',600),y=60;
 d[1].forEach(function(r){var h1=hgt(r[1],12.5,420),h2=hgt(r[2],11.5,420),h=h1+h2+22;
  s+=R(20,y,600,h,'#fff',12,' stroke="#C8D3DE"')+R(20,y,120,h,r[3],12,r[3]==='#FFFFFF'?' stroke="#C8D3DE"':'')+tx(80,y+h/2+FS(16)*0.35,'Lv '+r[0],16,r[4],900)+TW2(156,y+8,r[1],12.5,'#0f3558',900,440,'start')+TW2(156,y+12+h1,r[2],11.5,D,700,440,'start');y+=h+8});
 var hn=hgt(d[2],11,580);s+=TW2(30,y+4,d[2],11,'#7A3FB0',800,580,'start');y+=hn+14;return svg(y,s)}
/* 13. 2つの避難の場所と、確かめる3か所 */
var SH={ja:['避難の場所は2種類、確かめるのは3か所',[['指定緊急避難場所','命を守るため、まず一時的に逃げる場所。洪水・土砂・津波・地震・大火事など災害の種類ごとに決まっている。看板の絵記号で確かめる','#D0453E'],['指定避難所','家に戻れないときに、しばらく暮らす場所（学校の体育館・公民館など）。水・食べ物・情報が集まる','#2F8FE0']],[['家','寝ている夜にも行ける道で'],['職場・学校','昼間いる時間がいちばん長い場所'],['通勤・通学の道','電車が止まったときの歩ける道']],'確かめる3か所（それぞれ洪水と地震・津波で行き先が違うことがある）'],
 ko:['대피 장소는 두 종류, 확인할 곳은 세 곳',[['지정 긴급 대피 장소','목숨을 지키기 위해 먼저 잠시 피하는 곳. 홍수·토사·해일·지진·대화재 등 재해 종류마다 정해져 있음. 표지판의 그림 기호로 확인','#D0453E'],['지정 대피소','집에 돌아갈 수 없을 때 한동안 지내는 곳(학교 체육관·공민관 등). 물·음식·정보가 모이는 곳','#2F8FE0']],[['집','자고 있는 밤에도 갈 수 있는 길로'],['직장·학교','낮에 가장 오래 있는 곳'],['통근·통학길','전철이 멈췄을 때 걸을 수 있는 길']],'확인할 세 곳(각각 홍수와 지진·해일 때 가는 곳이 다를 수 있음)'],
 en:['Two kinds of evacuation site; three places to check',[['Designated emergency evacuation site','Where you first flee to save your life. Set separately for floods, landslides, tsunamis, earthquakes, large fires and so on; check the pictograms on the signs','#D0453E'],['Designated shelter','Where you stay for a while if you cannot go home (school gyms, community centres); water, food and information gather here','#2F8FE0']],[['Home','A route you can take at night, when you are asleep'],['Work or school','Where you spend most of the day'],['Commute','A walking route for when trains stop']],'Check three places (the destination may differ for floods versus earthquakes and tsunamis)']};
function figSH(l){setK(1);var d=SH[l]||SH.ja,s=TTL(320,30,d[0],15,'#0f3558',600),y=60;
 d[1].forEach(function(r){var h1=hgt(r[0],12.5,560),h2=hgt(r[1],11.5,560),h=h1+h2+28;
  s+=R(20,y,600,h,'#fff',12,' stroke="'+r[2]+'" stroke-width="2"')+R(20,y,600,h1+12,r[2],12)+R(20,y+h1,600,12,r[2])+TW2(40,y+5,r[0],12.5,'#fff',900,560,'start')+TW2(40,y+h1+18,r[1],11.5,D,700,560,'start');y+=h+10});
 var hc=hgt(d[3],12,580);s+=TW2(30,y+4,d[3],12,'#0f3558',900,580,'start');y+=hc+12;
 d[2].forEach(function(r,i){var h1=hgt(r[0],12,420),h2=hgt(r[1],11,420),h=h1+h2+18;
  s+=R(20,y,600,h,'#F4F9FE',10,' stroke="#CFE0F0"')+'<circle cx="50" cy="'+(y+h/2)+'" r="13" fill="#1F8A5B"/>'+tx(50,y+h/2+4,String(i+1),12,'#fff',900)+TW2(76,y+8,r[0],12,'#0f3558',900,520,'start')+TW2(76,y+10+h1,r[1],11,G,700,520,'start');y+=h+8});
 return svg(y+8,s)}
window.FIGS.life_lv=H.FIX2(figLV);window.FIGS.life_shel=H.FIX2(figSH);
/* 14. 空港の通勤圏：駅ごとの家賃の目安と空港までの時間（縦に積む） */
var AREA={
 nrt:{ja:['成田空港の通勤圏（一人暮らし向けの家賃の目安）','空港まで約','分','万円'],ko:['나리타 공항 통근권(1인 가구용 임대료 시세)','공항까지 약','분','만 엔'],en:['Narita Airport commuter belt (rent guide for single households)','to the airport ~','min','¥10k'],
  rows:[[{ja:'京成成田・JR成田',ko:'게이세이나리타·JR나리타',en:'Keisei-Narita / JR Narita'},{ja:'京成本線・JR成田線',ko:'게이세이 본선·JR 나리타선',en:'Keisei Main Line / JR Narita Line'},10,5.6],
   [{ja:'公津の杜',ko:'고즈노모리',en:'Kozunomori'},{ja:'京成本線',ko:'게이세이 본선',en:'Keisei Main Line'},15,5.4],
   [{ja:'宗吾参道',ko:'소고산도',en:'Sogo-sando'},{ja:'京成本線',ko:'게이세이 본선',en:'Keisei Main Line'},20,4.9],
   [{ja:'京成酒々井・JR酒々井',ko:'게이세이시스이·JR시스이',en:'Keisei-Shisui / JR Shisui'},{ja:'京成本線・JR成田線',ko:'게이세이 본선·JR 나리타선',en:'Keisei Main Line / JR Narita Line'},25,4.6],
   [{ja:'京成佐倉・JR佐倉',ko:'게이세이사쿠라·JR사쿠라',en:'Keisei-Sakura / JR Sakura'},{ja:'京成本線・JR総武本線',ko:'게이세이 본선·JR 소부 본선',en:'Keisei Main Line / JR Sobu Line'},30,5.2]]},
 hnd:{ja:['羽田空港の通勤圏（一人暮らし向けの家賃の目安）','空港まで約','分','万円'],ko:['하네다 공항 통근권(1인 가구용 임대료 시세)','공항까지 약','분','만 엔'],en:['Haneda Airport commuter belt (rent guide for single households)','to the airport ~','min','¥10k'],
  rows:[[{ja:'穴守稲荷',ko:'아나모리이나리',en:'Anamori-inari'},{ja:'京急空港線',ko:'게이큐 공항선',en:'Keikyu Airport Line'},5,7.5],
   [{ja:'大鳥居',ko:'오토리이',en:'Otorii'},{ja:'京急空港線',ko:'게이큐 공항선',en:'Keikyu Airport Line'},7,7.5],
   [{ja:'糀谷',ko:'고지야',en:'Kojiya'},{ja:'京急空港線',ko:'게이큐 공항선',en:'Keikyu Airport Line'},9,7.3],
   [{ja:'京急蒲田',ko:'게이큐카마타',en:'Keikyu-Kamata'},{ja:'京急本線・空港線',ko:'게이큐 본선·공항선',en:'Keikyu Main / Airport Line'},10,7.5],
   [{ja:'京急川崎',ko:'게이큐가와사키',en:'Keikyu-Kawasaki'},{ja:'京急本線・大師線',ko:'게이큐 본선·다이시선',en:'Keikyu Main / Daishi Line'},20,6.9],
   [{ja:'川崎大師',ko:'가와사키다이시',en:'Kawasaki-Daishi'},{ja:'京急大師線（乗り換え）',ko:'게이큐 다이시선(환승)',en:'Keikyu Daishi Line (change)'},30,6.3],
   [{ja:'小島新田',ko:'고지마신덴',en:'Kojima-shinden'},{ja:'京急大師線（乗り換え）',ko:'게이큐 다이시선(환승)',en:'Keikyu Daishi Line (change)'},35,4.9]]},
 kix:{ja:['関西空港の通勤圏（一人暮らし向けの家賃の目安）','空港まで約','分','万円'],ko:['간사이 공항 통근권(1인 가구용 임대료 시세)','공항까지 약','분','만 엔'],en:['Kansai Airport commuter belt (rent guide for single households)','to the airport ~','min','¥10k'],
  rows:[[{ja:'りんくうタウン',ko:'린쿠타운',en:'Rinku Town'},{ja:'南海空港線・JR関西空港線',ko:'난카이 공항선·JR 간사이공항선',en:'Nankai Airport / JR Kansai-Airport Line'},6,5.6],
   [{ja:'泉佐野',ko:'이즈미사노',en:'Izumisano'},{ja:'南海本線・空港線',ko:'난카이 본선·공항선',en:'Nankai Main / Airport Line'},10,5.2],
   [{ja:'羽倉崎',ko:'하쿠라자키',en:'Hagurazaki'},{ja:'南海本線（泉佐野で乗り換え）',ko:'난카이 본선(이즈미사노 환승)',en:'Nankai Main Line (change at Izumisano)'},15,4.7],
   [{ja:'吉見ノ里',ko:'요시미노사토',en:'Yoshiminosato'},{ja:'南海本線（泉佐野で乗り換え）',ko:'난카이 본선(이즈미사노 환승)',en:'Nankai Main Line (change at Izumisano)'},18,4.5],
   [{ja:'井原里',ko:'이하라노사토',en:'Iharanosato'},{ja:'南海本線（泉佐野で乗り換え）',ko:'난카이 본선(이즈미사노 환승)',en:'Nankai Main Line (change at Izumisano)'},15,5.0],
   [{ja:'鶴原',ko:'쓰루하라',en:'Tsuruhara'},{ja:'南海本線（泉佐野で乗り換え）',ko:'난카이 본선(이즈미사노 환승)',en:'Nankai Main Line (change at Izumisano)'},17,5.3]]},
 ngo:{ja:['中部空港（セントレア）の通勤圏（一人暮らし向けの家賃の目安）','空港まで約','分','万円'],ko:['주부 공항(센트레아) 통근권(1인 가구용 임대료 시세)','공항까지 약','분','만 엔'],en:['Chubu Centrair commuter belt (rent guide for single households)','to the airport ~','min','¥10k'],
  rows:[[{ja:'常滑',ko:'도코나메',en:'Tokoname'},{ja:'名鉄常滑線・空港線',ko:'메이테쓰 도코나메선·공항선',en:'Meitetsu Tokoname / Airport Line'},5,4.2],
   [{ja:'新舞子',ko:'신마이코',en:'Shin-Maiko'},{ja:'名鉄常滑線',ko:'메이테쓰 도코나메선',en:'Meitetsu Tokoname Line'},15,4.0],
   [{ja:'朝倉',ko:'아사쿠라',en:'Asakura'},{ja:'名鉄常滑線',ko:'메이테쓰 도코나메선',en:'Meitetsu Tokoname Line'},20,4.2],
   [{ja:'太田川',ko:'오타가와',en:'Otagawa'},{ja:'名鉄常滑線（急行が止まる）',ko:'메이테쓰 도코나메선(급행 정차)',en:'Meitetsu Tokoname Line (express stop)'},22,4.7],
   [{ja:'尾張横須賀',ko:'오와리요코스카',en:'Owari-Yokosuka'},{ja:'名鉄常滑線',ko:'메이테쓰 도코나메선',en:'Meitetsu Tokoname Line'},25,4.9]]},
 cts:{ja:['新千歳空港の通勤圏（一人暮らし向けの家賃の目安）','空港まで約','分','万円'],ko:['신치토세 공항 통근권(1인 가구용 임대료 시세)','공항까지 약','분','만 엔'],en:['New Chitose Airport commuter belt (rent guide for single households)','to the airport ~','min','¥10k'],
  rows:[[{ja:'南千歳',ko:'미나미치토세',en:'Minami-Chitose'},{ja:'JR千歳線・石勝線',ko:'JR 지토세선·세키쇼선',en:'JR Chitose / Sekisho Line'},3,4.2],
   [{ja:'千歳',ko:'지토세',en:'Chitose'},{ja:'JR千歳線',ko:'JR 지토세선',en:'JR Chitose Line'},7,4.1],
   [{ja:'長都',ko:'오사쓰',en:'Osatsu'},{ja:'JR千歳線',ko:'JR 지토세선',en:'JR Chitose Line'},10,3.9],
   [{ja:'恵庭・恵み野',ko:'에니와·에미노',en:'Eniwa / Emino'},{ja:'JR千歳線',ko:'JR 지토세선',en:'JR Chitose Line'},16,3.2],
   [{ja:'北広島',ko:'기타히로시마',en:'Kitahiroshima'},{ja:'JR千歳線（快速エアポート）',ko:'JR 지토세선(쾌속 에어포트)',en:'JR Chitose Line (Rapid Airport)'},22,3.5],
   [{ja:'苫小牧',ko:'도마코마이',en:'Tomakomai'},{ja:'JR千歳線（南千歳で乗り換え）',ko:'JR 지토세선(미나미치토세 환승)',en:'JR Chitose Line (change at Minami-Chitose)'},30,2.9]]},
 fuk:{ja:['福岡空港の通勤圏（一人暮らし向けの家賃の目安）','空港まで約','分','万円'],ko:['후쿠오카 공항 통근권(1인 가구용 임대료 시세)','공항까지 약','분','만 엔'],en:['Fukuoka Airport commuter belt (rent guide for single households)','to the airport ~','min','¥10k'],
  rows:[[{ja:'東比恵',ko:'히가시히에',en:'Higashi-Hie'},{ja:'地下鉄空港線',ko:'지하철 공항선',en:'Subway Airport Line'},3,5.5],
   [{ja:'博多',ko:'하카타',en:'Hakata'},{ja:'地下鉄空港線・JR',ko:'지하철 공항선·JR',en:'Subway Airport Line / JR'},5,5.5],
   [{ja:'箱崎',ko:'하코자키',en:'Hakozaki'},{ja:'JR鹿児島本線（博多で乗り換え）',ko:'JR 가고시마 본선(하카타 환승)',en:'JR Kagoshima Line (change at Hakata)'},15,4.1],
   [{ja:'香椎',ko:'가시이',en:'Kashii'},{ja:'JR鹿児島本線（博多で乗り換え）',ko:'JR 가고시마 본선(하카타 환승)',en:'JR Kagoshima Line (change at Hakata)'},22,4.5],
   [{ja:'西新',ko:'니시진',en:'Nishijin'},{ja:'地下鉄空港線（乗り換えなし）',ko:'지하철 공항선(환승 없음)',en:'Subway Airport Line (direct)'},17,4.6],
   [{ja:'室見・姪浜',ko:'무로미·메이노하마',en:'Muromi / Meinohama'},{ja:'地下鉄空港線（乗り換えなし）',ko:'지하철 공항선(환승 없음)',en:'Subway Airport Line (direct)'},22,4.3]]}
};
var ANOTE={ja:'※ 家賃はSUUMOの駅ごとの家賃相場（一人暮らし向け、2025〜2026年に確認）を丸めた目安。所要時間は乗り換えを含むおよその時間で、時間帯で変わります。',ko:'※ 임대료는 SUUMO 역별 시세(1인 가구용, 2025~2026년 확인)를 반올림한 기준. 소요 시간은 환승을 포함한 대략의 시간이며 시간대에 따라 다릅니다.',en:'* Rents are rounded from SUUMO station averages for single households (checked 2025–26). Times are approximate, including changes, and vary by time of day.'};
function areaFig(key){return function(l){setK(1);var A=AREA[key],d=A[l]||A.ja,s=TTL(320,30,d[0],15,'#0f3558',600),y=60,x0=30,wmax=400,mx=8;
 A.rows.forEach(function(r){var nm=r[0][l]||r[0].ja,ln=r[1][l]||r[1].ja,h1=hgt(nm,12.5,560),h2=hgt(ln,11,560);
  s+=TW2(x0,y,nm,12.5,'#0f3558',900,560,'start');y+=h1;s+=TW2(x0,y+2,ln,11,G,700,560,'start');y+=h2+6;
  var w=wmax*r[3]/mx;s+=R(x0,y,w,16,'#2F8FE0',6);var lab=(l==='en'?'¥'+Math.round(r[3]*10000).toLocaleString('en-US'):r[3].toFixed(1)+d[3])+'  ·  '+d[1]+' '+r[2]+d[2];
  y+=22;var ha=hgt(lab,11.5,580);s+=TW2(x0,y,lab,11.5,D,800,580,'start');y+=ha+14});
 var hn=hgt(ANOTE[l]||ANOTE.ja,11,580);s+=TW2(x0,y,ANOTE[l]||ANOTE.ja,11,G,700,580,'start');y+=hn+12;return svg(y,s)}}
window.FIGS.life_nrt=H.FIX2(areaFig('nrt'));window.FIGS.life_hnd=H.FIX2(areaFig('hnd'));window.FIGS.life_kix=H.FIX2(areaFig('kix'));window.FIGS.life_ngo=H.FIX2(areaFig('ngo'));window.FIGS.life_cts=H.FIX2(areaFig('cts'));window.FIGS.life_fuk=H.FIX2(areaFig('fuk'));
})();
