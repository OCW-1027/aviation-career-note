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
})();
