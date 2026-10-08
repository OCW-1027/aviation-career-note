/* 日本の暮らしガイド Part 8（駐在員）の図（2026.10）— figs_gnd.js の後に読み込み、window.FIGH の部品を使う。
   部品（TOP・ROWMAP・ZCARDS・STEPS2・LIST・SVG）は figs_gnd.js と同じ定義 */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,TTL=H.TTL,ARW=H.ARW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D;
function BADGE(x,y,n,sz,bg){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="'+(bg||'#FFD23F')+'" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function GLOW(x,y,w,h,i,n,dur,rx){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||10)+'" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.45)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
function SVG(h,s){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+h.toFixed(0)+'" role="img">'+R(0,0,640,h,'#F7FAFD')+s+'</svg>'}
function TOP(t){return {s:TTL(320,30,t,15,'#0f3558',600),y:24+LI(t,15,600).length*FS(15)*1.3+16}}
/* 上端をそろえて折り返す（WR は中央合わせなので、行数の半分だけ下げる） */
function WT(x,y,t,sz,c,w,mw,a){return WR(x,y+(LI(t,sz,mw).length-1)*FS(sz)*1.3/2,t,sz,c,w,mw,a)}
/* 横の目盛り：区間の色・目盛り・左から右へ動く印 */
function SCALE(y,mx,step,zones,unit,dur){var x0=40,x1=600,X=function(v){return x0+v/mx*(x1-x0)},o='';
 zones.forEach(function(z,i){o+='<rect x="'+X(z[0])+'" y="'+y+'" width="'+(X(z[1])-X(z[0]))+'" height="26" fill="'+z[2]+'"/>'});
 for(var v=0;v<=mx;v+=step){o+='<line x1="'+X(v)+'" y1="'+(y+26)+'" x2="'+X(v)+'" y2="'+(y+34)+'" stroke="#5B6B7D" stroke-width="1.5"/>'+tx(X(v),y+34+FS(9)+4,String(v),9,'#5B6B7D',700)}
 o+=tx(x1,y+34+FS(9)*2.4+8,unit,9,'#5B6B7D',700,'end');
 o+='<path d="M0 0 L-9 -14 L9 -14 Z" fill="#0f3558"><animateMotion dur="'+(dur||'9s')+'" repeatCount="indefinite" path="M'+X(mx*0.02)+' '+(y-2)+' L'+X(mx*0.98)+' '+(y-2)+'"/></path>';
 return {s:o,y:y+34+FS(9)*2.4+22,X:X}}
/* 色の枠のカードを横に並べる（高さはそろえる） */
function ZCARDS(y,z,cols){var cw=(600-12*(z.length-1))/z.length,zh=0,th=0,o='';z.forEach(function(c){var t=LI(c[0],12,cw-16).length*FS(12)*1.3;if(t>th)th=t});z.forEach(function(c){var h=14+th+8+LI(c[1],10,cw-20).length*FS(10)*1.3+14;if(h>zh)zh=h});
 z.forEach(function(c,i){var x=20+i*(cw+12);o+=R(x,y,cw,zh,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="6" rx="3" fill="'+cols[i]+'"/>'+WT(x+cw/2,y+12+FS(12),c[0],12,cols[i],900,cw-16)+WT(x+cw/2,y+14+th+8+FS(10),c[1],10,D,800,cw-20)});
 return {s:o,y:y+zh+14}}
/* 縦の手順：左に番号と内容、右に時刻や担当の札。順に光る */
function STEPS2(y,st,who,pc,dur){var s='',lh=FS(11)*1.3,n=st.length;
 st.forEach(function(x,i){var nn=LI(x,11,380).length,nw=LI(who[i],10,130).length,h=Math.max(nn*lh,nw*FS(10)*1.3)+22;
  s+=R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+GLOW(20,y,600,h,i,n,dur)+BADGE(44,y+h/2,i+1,11)+WR(66,y+h/2+FS(11)*0.35,x,11,D,800,380,'start')+R(462,y+6,150,h-12,pc[i%pc.length],8)+WR(537,y+h/2+FS(10)*0.35,who[i],10,'#fff',900,130);
  y+=h;if(i<n-1){s+=ARW(240,y+2,240,y+12,'#9FB0C2',3);y+=14}});
 return {s:s,y:y}}
/* 時間の軸（出発前の逆算）：番号の印を軸に置き、説明は下に2列で */
function TL(y,mx,step,marks,unit,dur){var x0=50,x1=600,X=function(v){return x0+(mx-v)/mx*(x1-x0)},r0=FS(9)*0.75+3,o='';y+=r0*4+30;
 o+='<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="#9FB0C2" stroke-width="5" stroke-linecap="round"/>';
 for(var v=0;v<=mx;v+=step){o+='<line x1="'+X(v)+'" y1="'+(y-6)+'" x2="'+X(v)+'" y2="'+(y+6)+'" stroke="#5B6B7D" stroke-width="2"/>'+tx(X(v),y+FS(9)+14,String(v),9,'#5B6B7D',700)}
 o+=tx(x0,y+FS(9)*2.4+18,unit,9,'#5B6B7D',700,'start');
 marks.forEach(function(m,i){var cx=X(m[0]),cy=y-28-(i%2)*(r0*2+6);o+='<line x1="'+cx+'" y1="'+(cy+r0)+'" x2="'+cx+'" y2="'+y+'" stroke="'+m[2]+'" stroke-width="2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r0.toFixed(1)+'" fill="'+m[2]+'"/>'+tx(cx,cy+FS(9)*0.36,String(i+1),9,'#fff',900)});
 o+='<circle cx="0" cy="'+y+'" r="7" fill="#0f3558"><animateMotion dur="'+(dur||'8s')+'" repeatCount="indefinite" path="M'+x0+' 0 L'+x1+' 0"/></circle>';
 var yy=y+FS(9)*2.4+30,lh=FS(10)*1.3;
 for(var i=0;i<marks.length;i+=2){var h=0;[i,i+1].forEach(function(k){if(marks[k]){var hh=Math.max(LI(marks[k][1],10,250).length*lh,r0*2)+12;if(hh>h)h=hh}});
  [i,i+1].forEach(function(k,j){var m=marks[k];if(!m)return;var x=20+j*306;o+=R(x,yy,294,h,'#fff',8,' stroke="#D5DEE8"')+'<circle cx="'+(x+8+r0)+'" cy="'+(yy+h/2)+'" r="'+r0.toFixed(1)+'" fill="'+m[2]+'"/>'+tx(x+8+r0,yy+h/2+FS(9)*0.36,String(k+1),9,'#fff',900)+WR(x+16+r0*2,yy+h/2+FS(10)*0.35,m[1],10,D,800,294-24-r0*2,'start')});
  yy+=h+6}
 return {s:o,y:yy+4}}
/* 上から見た機体（機首は右）。x0..x1 が胴体、cy が中心線 */
function PLANE(x0,x1,cy,fw){var o='',L=x1-x0,wx=x0+L*0.42;
 o+='<path d="M'+wx+' '+(cy-fw/2)+' L'+(wx-L*0.12)+' '+(cy-fw/2-120)+' L'+(wx+L*0.02)+' '+(cy-fw/2-120)+' L'+(wx+L*0.2)+' '+(cy-fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+wx+' '+(cy+fw/2)+' L'+(wx-L*0.12)+' '+(cy+fw/2+120)+' L'+(wx+L*0.02)+' '+(cy+fw/2+120)+' L'+(wx+L*0.2)+' '+(cy+fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+(x0+20)+' '+(cy-fw/2)+' L'+(x0-10)+' '+(cy-fw/2-46)+' L'+(x0+14)+' '+(cy-fw/2-46)+' L'+(x0+60)+' '+(cy-fw/2)+' Z M'+(x0+20)+' '+(cy+fw/2)+' L'+(x0-10)+' '+(cy+fw/2+46)+' L'+(x0+14)+' '+(cy+fw/2+46)+' L'+(x0+60)+' '+(cy+fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+x0+' '+(cy-fw/2)+' L'+(x1-40)+' '+(cy-fw/2)+' Q'+(x1+10)+' '+(cy-fw/2)+' '+(x1+14)+' '+cy+' Q'+(x1+10)+' '+(cy+fw/2)+' '+(x1-40)+' '+(cy+fw/2)+' L'+x0+' '+(cy+fw/2)+' Q'+(x0-24)+' '+cy+' '+x0+' '+(cy-fw/2)+' Z" fill="#fff" stroke="#5B6B7D" stroke-width="2"/>';
 return {s:o,wx:wx,L:L}}
/* 左の項目 → 右の扱い。行が順に光る */
function ROWMAP(y,rows,dur){var s='',n=rows.length,lw=250,rx=330;
 rows.forEach(function(r,i){var nl=Math.max(LI(r[0],11,lw-24).length,LI(r[1],10,270).length),h=nl*FS(11)*1.3+20;
  s+=GLOW(20,y-3,600,h+6,i,n,dur,10)+R(20,y,lw,h,'#fff',10,' stroke="#C8D3DE"')+WR(20+lw/2,y+h/2+FS(11)*0.35,r[0],11,D,800,lw-24)+ARW(20+lw+8,y+h/2,rx-8,y+h/2,r[2],3)+R(rx,y,290,h,r[2],10)+WR(rx+145,y+h/2+FS(10)*0.35,r[1],10,'#fff',900,270);
  y+=h+10});
 return {s:s,y:y}}
var F={
/* ===== 日本の暮らしガイド Part 8（駐在員）の図 2026.10 ===== */
ex_visa:function(l){
 var W=({ja:{t:'駐在員の主な在留資格',c:[['企業内転勤','本社などで1年以上続けて勤務した人が、期間を定めて日本の事業所へ'],['技術・人文知識・国際業務','日本の会社に直接雇用される場合など'],['経営・管理','日本の法人・支店の経営・管理。2025年10月に基準が強化']],n:['配偶者・子どもは「家族滞在」。婚姻・親子関係の証明書と日本語の訳を用意','着任日は、認定証明書の申請→交付→ビザ→入国の期間から逆算して決める★']},
  ko:{t:'주재원의 주요 재류자격',c:[['기업내전근','본사 등에서 1년 이상 계속 근무한 사람이 기간을 정해 일본 사업소로'],['기술·인문지식·국제업무','일본 회사에 직접 고용되는 경우 등'],['경영·관리','일본 법인·지점의 경영·관리. 2025년 10월에 기준이 강화됨']],n:['배우자·자녀는 「가족체재」. 혼인·친자 관계 증명서와 일본어 번역을 준비','부임일은 인정증명서 신청→교부→비자→입국 기간에서 거꾸로 계산해 정한다★']},
  en:{t:'Main statuses for expatriates',c:[['Intra-company Transferee','Staff with a year or more at head office, sent to the Japan office for a set period'],['Engineer/Specialist in Humanities/International Services','For example, when hired directly by a Japanese company'],['Business Manager','Running a Japanese company or branch; criteria tightened in October 2025']],n:['Spouse and children come as Dependents; prepare proof of marriage and parentage with Japanese translations','Set your start date by working back from certificate application, issue, visa and entry ★']}})[l];
 if(!W)return F.ex_visa('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ZCARDS(T.y,W.c,['#1769e0','#2C8C8C','#E08A2E']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
ex_pkg:function(l){
 var W=({ja:{t:'赴任前に本社と書面で確認する処遇',r:[['住宅','家賃の上限・会社の負担・法人契約か個人契約か','#1769e0'],['給与','日本と韓国での支払いの分け方・為替・手当','#2C8C8C'],['社会保険','日本の健康保険・年金と韓日の協定（8-4）','#7A5CC7'],['子どもの教育','学校の種類と学費の補助の範囲','#E08A2E'],['一時帰国','年間の回数と費用の負担','#5B6B7D'],['税金','日本での納税と韓国での扱い（8-10）','#D64545']],n:['韓国で済ませる：家族関係証明書などの取得・国際運転免許証・銀行の住所変更・子どもの記録','持っていく：書類の原本と写し・常備薬と処方の内容・口座ができるまでの生活費']},
  ko:{t:'부임 전 본사와 서면으로 확인할 처우',r:[['주택','임대료 상한·회사 부담·법인 계약인지 개인 계약인지','#1769e0'],['급여','일본과 한국 지급 분할·환율·수당','#2C8C8C'],['사회보험','일본 건강보험·연금과 한일 협정 (8-4편)','#7A5CC7'],['자녀 교육','학교 종류와 학비 보조 범위','#E08A2E'],['일시 귀국','연간 횟수와 비용 부담','#5B6B7D'],['세금','일본 납세와 한국에서의 처리 (8-10편)','#D64545']],n:['한국에서 마칠 것: 가족관계증명서 등 발급·국제운전면허증·은행 주소 변경·자녀 기록','가져갈 것: 서류 원본과 사본·상비약과 처방 내용·계좌가 생길 때까지 생활비']},
  en:{t:'Package terms to confirm in writing before you move',r:[['Housing','Rent cap, what the company pays, corporate or personal lease','#1769e0'],['Pay','Split between Japan and home, exchange rate, allowances','#2C8C8C'],['Social insurance','Japanese health insurance and pension, and the agreement (8-4)','#7A5CC7'],['Children’s education','Type of school and how much of the fees is covered','#E08A2E'],['Home leave','Trips a year and who pays','#5B6B7D'],['Tax','Tax in Japan and treatment at home (8-10)','#D64545']],n:['Before leaving: family certificates, international driving permit, bank address changes, children’s records','To bring: original documents and copies, regular medicines with prescriptions, cash until your account opens']}})[l];
 if(!W)return F.ex_pkg('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},
ex_reg:function(l){
 var W=({ja:{t:'着いてすぐの4つの手続きと注意点',r:[['在留カード','常に携帯。期限・住所の変更を届け出る','#1769e0'],['住居地の届出','住んでから14日以内。家族も同時に','#D64545'],['マイナンバー','税・社会保険の手続きで会社に提出','#2C8C8C'],['印鑑','銀行・契約で使う場面がある。必要なら作って登録','#7A5CC7']],n:['住民票をもとに、保険・学校・銀行の手続きが進む','役所はパスポート・在留カード・家族関係の証明と訳を持って、平日の朝早くに']},
  ko:{t:'도착 직후 4가지 절차와 주의점',r:[['재류카드','항상 휴대. 기한·주소 변경을 신고','#1769e0'],['주거지 신고','살기 시작하고 14일 이내. 가족도 동시에','#D64545'],['마이넘버','세금·사회보험 절차에서 회사에 제출','#2C8C8C'],['인감','은행·계약에서 쓰는 장면이 있음. 필요하면 만들어 등록','#7A5CC7']],n:['주민표를 바탕으로 보험·학교·은행 절차가 진행된다','관청에는 여권·재류카드·가족관계 증명과 번역을 가지고 평일 아침 일찍']},
  en:{t:'Four procedures on arrival, and what to watch',r:[['Residence card','Carry it at all times; report expiry and address changes','#1769e0'],['Address registration','Within 14 days of moving in; family at the same time','#D64545'],['My Number','Given to your employer for tax and social insurance','#2C8C8C'],['Personal seal','Used for some bank and contract steps; make and register one if needed','#7A5CC7']],n:['Insurance, school and bank procedures all follow from the resident record','Go to the office early on a weekday with passport, residence card and translated family documents']}})[l];
 if(!W)return F.ex_reg('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},
ex_pension:function(l){
 var W=({ja:{t:'韓日の社会保障の協定：証明書があるか、ないか',c:[['証明書あり','一定期間（例：5年以内）の派遣なら韓国の年金に加入し続け、日本の年金は免除'],['証明書なし','韓国と日本の両方の年金の保険料を払うことになる']],n:['手続き：韓国の年金の機関で適用の証明書を受け取り、日本の会社に提出','協定は年金だけが対象。健康保険は日本の制度に入る（家族は扶養として加入できる）']},
  ko:{t:'한일 사회보장협정: 증명서가 있는가, 없는가',c:[['증명서 있음','일정 기간(예: 5년 이내) 파견이면 한국 국민연금에 계속 가입하고 일본 연금은 면제'],['증명서 없음','한국과 일본 양쪽 연금 보험료를 내게 된다']],n:['절차: 한국 국민연금공단에서 적용 증명서를 받아 일본 회사에 제출','협정은 연금만 대상. 건강보험은 일본 제도에 가입(가족은 피부양자로 가입 가능)']},
  en:{t:'Social security agreements: with or without the certificate',c:[['With a certificate','On a limited posting (e.g. up to 5 years) you stay in your home pension and are exempt from Japan’s'],['Without one','You pay pension contributions in both countries']],n:['Get the certificate from your home pension authority and give it to your Japanese employer','Coverage varies; the Japan–Korea agreement covers pensions only, so health insurance is Japanese']}})[l];
 if(!W)return F.ex_pension('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ZCARDS(T.y,W.c,['#2C8C8C','#D64545']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
ex_rent:function(l){
 var W=({ja:{t:'日本の賃貸の費用：返るお金・返らないお金',r:[['敷金','預け金。修繕に充てた残りは返る','#2C8C8C'],['礼金','大家への謝礼。返らない','#D64545'],['仲介手数料','不動産会社へ。返らない','#D64545'],['保証会社の費用','連帯保証人の代わり。返らない','#D64545'],['前家賃','入居する月（翌月）分の家賃','#1769e0'],['更新料','契約の更新（例：2年ごと）のとき','#7A5CC7']],n:['法人契約は会社の登記・決算の書類で審査。家賃の上限・解約の予告期間を規程と合わせる','場所は通勤・子どもの学校・生活の便利さ・ハザードマップで選ぶ。入居前に部屋の傷を写真に']},
  ko:{t:'일본 임대 비용: 돌려받는 돈·못 받는 돈',r:[['시키킨(보증금)','예치금. 수선에 쓰고 남으면 돌려받음','#2C8C8C'],['레이킨(사례금)','집주인에 대한 사례. 돌려받지 못함','#D64545'],['중개 수수료','부동산 회사에. 돌려받지 못함','#D64545'],['보증 회사 비용','연대보증인 대신. 돌려받지 못함','#D64545'],['선불 임대료','입주하는 달(다음 달)분 임대료','#1769e0'],['갱신료','계약 갱신(예: 2년마다) 때','#7A5CC7']],n:['법인 계약은 회사 등기·결산 서류로 심사. 임대료 상한·해지 예고 기간을 규정과 맞춘다','위치는 통근·자녀 학교·생활 편의·해저드맵으로 고른다. 입주 전 방의 흠을 사진으로']},
  en:{t:'Renting in Japan: money you get back, and money you do not',r:[['Deposit (shikikin)','Held; returned after repair costs','#2C8C8C'],['Key money (reikin)','A thank-you to the landlord; not returned','#D64545'],['Agent’s fee','Paid to the estate agent; not returned','#D64545'],['Guarantee company','Instead of a personal guarantor; not returned','#D64545'],['Rent in advance','For the month you move in (or the next)','#1769e0'],['Renewal fee','When the lease is renewed (e.g. every 2 years)','#7A5CC7']],n:['Corporate leases are vetted on company registration and accounts; match rent caps and notice periods to policy','Choose by commute, children’s school, convenience and the hazard map; photograph damage before moving in']}})[l];
 if(!W)return F.ex_rent('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},
ex_school:function(l){
 var W=({ja:{t:'子どもの学校の4つの選択肢',r:[['韓国学校','韓国の教育課程。帰国後の編入がしやすい','#D64545'],['日本の公立学校','学区の学校。学費は原則無料（給食費などは必要）','#2C8C8C'],['日本の私立学校','入試がある。学費は高め','#1769e0'],['国際学校','英語で学ぶ。学費は高額、会社の補助を確認','#7A5CC7']],n:['選ぶ基準：帰国後の進路・滞在の期間・子どもの年齢・通学（住まいより先に決める家庭も）','病院は近所の診療所から。韓国語・英語で診てもらえる所と夜間・休日の窓口を先に調べる']},
  ko:{t:'자녀 학교의 4가지 선택지',r:[['한국학교','한국 교육과정. 귀국 후 편입이 쉬움','#D64545'],['일본 공립학교','학군 학교. 학비는 원칙적으로 무료(급식비 등은 필요)','#2C8C8C'],['일본 사립학교','입시가 있음. 학비는 높은 편','#1769e0'],['국제학교','영어로 배움. 학비 고액, 회사 보조를 확인','#7A5CC7']],n:['고르는 기준: 귀국 후 진로·체류 기간·자녀 나이·통학(집보다 먼저 정하는 가정도)','병원은 근처 의원부터. 한국어·영어로 진료 가능한 곳과 야간·휴일 창구를 미리 알아 둔다']},
  en:{t:'Four choices of school',r:[['Your country’s school','Home curriculum (Korean schools, for example); easiest to transfer back','#D64545'],['Japanese public school','The local school; fees free in principle (meals extra)','#2C8C8C'],['Japanese private school','Entrance exams; higher fees','#1769e0'],['International school','Taught in English; high fees, check company support','#7A5CC7']],n:['Decide by plans after returning, length of stay, age and travel to school (some families choose the school first)','For illness, start at a local clinic; find clinics in your language and night/holiday services in advance']}})[l];
 if(!W)return F.ex_school('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},
ex_lic:function(l){
 var W=({ja:{t:'日本で運転する2つの方法',c:[['国際運転免許証','韓国で出国前に取得。上陸から原則1年。韓国の免許と一緒に携帯'],['日本の免許への切り替え','運転免許センターで。取得後その国に通算3か月以上いた証明と訳文が必要']],n:['国際運転免許証の期限を過ぎて運転すると無免許運転。早めに切り替えを始める','左側通行・「止まれ」で完全に停止・自転車も車両・路上駐車の取り締まりに注意']},
  ko:{t:'일본에서 운전하는 두 가지 방법',c:[['국제운전면허증','한국에서 출국 전 발급. 상륙 후 원칙 1년. 한국 면허와 함께 휴대'],['일본 면허 전환','운전면허센터에서. 취득 후 그 나라에 통산 3개월 이상 있었다는 증명과 번역문이 필요']],n:['국제운전면허증 기한이 지나 운전하면 무면허 운전. 일찍 전환을 시작한다','좌측통행·“止まれ”에서 완전 정지·자전거도 차량·노상 주차 단속에 주의']},
  en:{t:'Two ways to drive in Japan',c:[['International driving permit','Obtained before leaving home; valid in principle for a year from arrival; carry your home licence too'],['Converting to a Japanese licence','At a licensing centre; needs proof of 3+ months in the issuing country after you got it, and a translation']],n:['Driving after the permit expires counts as driving unlicensed; start converting early','Drive on the left, stop fully at “止まれ”, bicycles are vehicles, parking enforcement is strict']}})[l];
 if(!W)return F.ex_lic('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ZCARDS(T.y,W.c,['#1769e0','#2C8C8C']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
ex_manner:function(l){
 var W=({ja:{t:'日本のビジネスでまず押さえたい5つ',r:[['時間','5分前に到着。遅れるときは必ず事前に連絡','#1769e0'],['名刺','両手で渡し、両手で受け取る。会議中は机の上に','#2C8C8C'],['根回し','会議の前に関係者に説明し、意見を聞いておく','#7A5CC7'],['メール','あいさつ・結論・理由・お願い・締め','#E08A2E'],['断り方','「検討します」は断りのことも。次の行動を確認','#D64545']],n:['合意までは時間がかかるが、決まった後の実行は確実。急ぐときほど早く根回しを','口頭の合意も議事録・メールで残す。小さな約束を確実に守ることが信頼になる']},
  ko:{t:'일본 비즈니스에서 먼저 알아 둘 5가지',r:[['시간','5분 전 도착. 늦을 때는 반드시 사전에 연락','#1769e0'],['명함','두 손으로 주고 두 손으로 받음. 회의 중에는 책상 위에','#2C8C8C'],['사전 조율','회의 전에 관계자에게 설명하고 의견을 들어 둠','#7A5CC7'],['메일','인사·결론·이유·부탁·마무리','#E08A2E'],['거절 방식','“검토하겠습니다”는 거절일 때도. 다음 행동을 확인','#D64545']],n:['합의까지 시간이 걸리지만 정해진 뒤 실행은 확실. 급할수록 일찍 사전 조율을','구두 합의도 회의록·메일로 남긴다. 작은 약속을 확실히 지키는 것이 신뢰가 된다']},
  en:{t:'Five things to grasp first in Japanese business',r:[['Time','Arrive five minutes early; always warn ahead if late','#1769e0'],['Business cards','Give and receive with both hands; keep them on the table','#2C8C8C'],['Nemawashi','Brief people and hear their views before the meeting','#7A5CC7'],['E-mail','Greeting, conclusion, reason, request, closing','#E08A2E'],['Saying no','“We will consider it” can mean no; confirm the next step','#D64545']],n:['Agreement takes time but execution is reliable; the more urgent, the earlier you start nemawashi','Record verbal agreements in minutes or e-mail; keeping small promises builds trust']}})[l];
 if(!W)return F.ex_manner('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},
ex_report:function(l){
 var W=({ja:{t:'韓国本社と日本の現場：報告の傾向の違い',r:[['スピード','本社：今日中・すぐ決定 ／ 日本：確認してから','#1769e0'],['情報の粒度','本社：結論と数字 ／ 日本：経緯と根拠','#2C8C8C'],['変更','本社：柔軟に変える ／ 日本：手順を守る','#E08A2E'],['リスクの表現','本社：はっきり ／ 日本：控えめに','#D64545']],n:['報告の型：結論 → 現状 → 見通し → 必要な判断 → 次の報告の時期','「まだわからない」も「いつわかるか」と一緒に伝えれば報告。翻訳ではなく背景まで説明する']},
  ko:{t:'한국 본사와 일본 현장: 보고 경향의 차이',r:[['속도','본사: 오늘 안·즉시 결정 / 일본: 확인되고 나서','#1769e0'],['정보 입도','본사: 결론과 숫자 / 일본: 경위와 근거','#2C8C8C'],['변경','본사: 유연하게 바꿈 / 일본: 절차를 지킴','#E08A2E'],['위험 표현','본사: 분명하게 / 일본: 조심스럽게','#D64545']],n:['보고 틀: 결론 → 현황 → 전망 → 필요한 판단 → 다음 보고 시기','「아직 모른다」도 「언제 알 수 있는지」와 함께 전하면 보고다. 번역이 아니라 배경까지 설명한다']},
  en:{t:'Head office and the Japanese front line: reporting tendencies',r:[['Speed','Head office: today, decide now / Japan: once confirmed','#1769e0'],['Level of detail','Head office: conclusion, numbers / Japan: background, basis','#2C8C8C'],['Change','Head office: adjust flexibly / Japan: keep the procedure','#E08A2E'],['Expressing risk','Head office: plainly / Japan: with restraint','#D64545']],n:['Report format: conclusion → current state → outlook → decision needed → when you will report next','“Not known yet” is a report if you say when it will be known; explain the background, not just the words']}})[l];
 if(!W)return F.ex_report('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},
ex_rtax:function(l){
 var W=({ja:{t:'住民税は「1年遅れ」でやってくる',st:['日本での前年の所得がないため、住民税はかからないことが多い','前年の所得にもとづく住民税が6月から天引きに。手取りが減ったように感じる','1月1日に日本に住んでいれば、その年の住民税がかかる。残りを一括で払うか納税管理人を決める'],who:['赴任した年','2年目から','帰任の年'],n:['所得税は毎月の給与から源泉徴収し、年末調整で精算。日本に1年以上住む見込みなら一般に居住者','韓国で受け取る給与も申告の対象になることがある。租税条約の扱いは赴任前に税理士・本社と決める★']},
  ko:{t:'주민세는 「1년 늦게」 찾아온다',st:['일본에서의 전년 소득이 없어 주민세가 없는 경우가 많다','전년 소득에 따른 주민세가 6월부터 공제. 실수령액이 줄어든 것처럼 느낀다','1월 1일에 일본에 살고 있으면 그해 주민세가 부과. 잔액을 일괄 납부하거나 납세 관리인을 정한다'],who:['부임한 해','2년 차부터','귀임하는 해'],n:['소득세는 매월 급여에서 원천징수, 연말정산으로 정산. 일본에 1년 이상 살 전망이면 일반적으로 거주자','한국에서 받는 급여도 신고 대상이 되기도 한다. 조세조약 처리는 부임 전에 세리사·본사와 정한다★']},
  en:{t:'Resident tax arrives a year late',st:['No Japanese income in the previous year, so usually no resident tax','Tax on last year’s income is deducted from June; take-home pay seems to drop','If you live in Japan on 1 January, that year’s tax is due; pay the rest at once or appoint a tax agent'],who:['Year you arrive','From year 2','Year you leave'],n:['Income tax is withheld monthly and settled at year end; expecting to stay a year or more generally makes you a resident','Pay received at home may also be taxable in Japan; settle treaty treatment with a tax adviser and head office before you move ★']}})[l];
 if(!W)return F.ex_rtax('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#2C8C8C','#E08A2E','#D64545'],'12s');s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
ex_return:function(l){
 var W=({ja:{t:'帰任のときに忘れやすい手続き',r:[['住民税','残りを一括で納付するか、納税管理人を決める','#D64545'],['納税管理人','帰国後の税の手続きを代わりにする人を届け出る','#E08A2E'],['年金の脱退一時金','条件を満たせば帰国後に請求。期限あり','#7A5CC7'],['銀行の口座','最後の給与・引き落としが終わってから閉じる','#1769e0'],['在留カード','出国のとき空港で返す（再入国の予定がない場合）','#2C8C8C'],['郵便','転送の届けと、韓国の住所への連絡先の変更','#5B6B7D']],n:['家族：子どもの在籍・成績の証明、日本の保険の喪失と韓国の健康保険の再開、運転免許の扱い','赴任のときの記録（いつ・何を・どこで）を見返すと、閉じるべき手続きの漏れを防げる']},
  ko:{t:'귀임 때 잊기 쉬운 절차',r:[['주민세','잔액을 일괄 납부하거나 납세 관리인을 정한다','#D64545'],['납세 관리인','귀국 후 세금 절차를 대신할 사람을 신고','#E08A2E'],['연금 탈퇴 일시금','조건을 충족하면 귀국 후 청구. 기한 있음','#7A5CC7'],['은행 계좌','마지막 급여·자동이체가 끝난 뒤 닫는다','#1769e0'],['재류카드','출국 때 공항에서 반납(재입국 예정이 없는 경우)','#2C8C8C'],['우편','전송 신고와 한국 주소로 연락처 변경','#5B6B7D']],n:['가족: 자녀 재학·성적 증명, 일본 보험 상실과 한국 건강보험 재개, 운전면허 처리','부임 때의 기록(언제·무엇을·어디서)을 다시 보면 닫아야 할 절차의 누락을 막을 수 있다']},
  en:{t:'Procedures often forgotten when you leave',r:[['Resident tax','Pay the rest at once, or appoint a tax agent','#D64545'],['Tax agent','Register someone to handle tax matters after you leave','#E08A2E'],['Pension lump sum','Claimable after leaving if you qualify; there is a deadline','#7A5CC7'],['Bank account','Close it after the last salary and debits','#1769e0'],['Residence card','Hand it in at the airport (if not returning)','#2C8C8C'],['Post','Arrange forwarding and update your contact address','#5B6B7D']],n:['Family: school records, ending Japanese insurance and restarting cover at home, your driving licence','Looking back at your arrival records (when, what, where) helps you close everything']}})[l];
 if(!W)return F.ex_return('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},
ex_handover:function(l){
 var W=({ja:{t:'引き継ぎ書に書くもの・書かないもの',c:[['書くもの','業務の地図・年間のカレンダー・関係者と経緯・進行中の案件・生活の情報'],['書かないもの','パスワード・ID、口座番号・暗証番号、必要な範囲を超える個人情報']],n:['帰任の3か月前から少しずつ書き、最後の1か月は後任と一緒に確認する','手順だけでなく「なぜ」と過去の経緯を書く。可能なら後任と一緒に取引先・当局を回る']},
  ko:{t:'인계서에 쓸 것·쓰지 않을 것',c:[['쓸 것','업무 지도·연간 캘린더·관계자와 경위·진행 중 안건·생활 정보'],['쓰지 않을 것','비밀번호·ID, 계좌번호·비밀번호, 필요한 범위를 넘는 개인정보']],n:['귀임 3개월 전부터 조금씩 쓰고 마지막 1개월은 후임과 함께 확인한다','절차뿐 아니라 「왜」와 과거 경위를 쓴다. 가능하면 후임과 함께 거래처·당국을 방문한다']},
  en:{t:'What to write in the handover, and what never to',c:[['Write','Map of the work, annual calendar, contacts and history, open matters, living information'],['Never write','Passwords and IDs, account numbers and PINs, personal data beyond what is needed']],n:['Start three months before you leave; go through it with your successor in the final month','Write the “why” and the history, not just steps; visit partners and authorities together if you can']}})[l];
 if(!W)return F.ex_handover('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ZCARDS(T.y,W.c,['#2C8C8C','#D64545']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
