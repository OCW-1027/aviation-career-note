/* 日本の暮らしガイドの図 その2（2026.10・D1）— 在留資格の地図と手続き、留学生のアルバイト、ワーキング・ホリデー、留学生の保険、出国の順番、地震の最初の行動。
   figs_exp.js の後に読み込み、window.FIGH の部品を使う。作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR、高さは行数で計算、縦に積む配置）
   部品（TOP・ROWMAP・ZCARDS・STEPS2・LIST・SVG・SCALE）は figs_exp.js と同じ定義。BAND はこのファイルで追加 */
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
/* 左の項目 → 右の扱い。行が順に光る */
function ROWMAP(y,rows,dur){var s='',n=rows.length,lw=250,rx=330;
 rows.forEach(function(r,i){var nl=Math.max(LI(r[0],11,lw-24).length,LI(r[1],10,270).length),h=nl*FS(11)*1.3+20;
  s+=GLOW(20,y-3,600,h+6,i,n,dur,10)+R(20,y,lw,h,'#fff',10,' stroke="#C8D3DE"')+WR(20+lw/2,y+h/2+FS(11)*0.35,r[0],11,D,800,lw-24)+ARW(20+lw+8,y+h/2,rx-8,y+h/2,r[2],3)+R(rx,y,290,h,r[2],10)+WR(rx+145,y+h/2+FS(10)*0.35,r[1],10,'#fff',900,270);
  y+=h+10});
 return {s:s,y:y}}
/* 横の帯：区間に色、目盛りの名前（短い札）は帯の下。印が左から右へ動く */
function BAND(y,mn,mx,segs,ticks,dur){var x0=40,x1=600,X=function(v){return x0+(v-mn)/(mx-mn)*(x1-x0)},o='',lh=FS(10)*1.3,mxl=1;
 segs.forEach(function(z){o+='<rect x="'+X(z[0]).toFixed(1)+'" y="'+y+'" width="'+(X(z[1])-X(z[0])).toFixed(1)+'" height="26" fill="'+z[2]+'"/>'});
 ticks.forEach(function(t){var n=LI(t[1],10,150).length;if(n>mxl)mxl=n;
  o+='<line x1="'+X(t[0]).toFixed(1)+'" y1="'+(y-4)+'" x2="'+X(t[0]).toFixed(1)+'" y2="'+(y+34)+'" stroke="#0f3558" stroke-width="2"/>'+WT(X(t[0]),y+34+FS(10)+4,t[1],10,'#0f3558',800,150)});
 o+='<path d="M0 0 L-9 -14 L9 -14 Z" fill="#0f3558"><animateMotion dur="'+(dur||'9s')+'" repeatCount="indefinite" path="M'+X(mn+(mx-mn)*0.02).toFixed(1)+' '+(y-2)+' L'+X(mx-(mx-mn)*0.02).toFixed(1)+' '+(y-2)+'"/></path>';
 return {s:o,y:y+34+4+mxl*lh+16}}
var F={
/* 1-1：仕事から見る在留資格（空港・航空の例） */
ex2_job:function(l){
 var C=['#1769e0','#2C8C8C','#E08A2E','#7A5CC7','#5B6B7D','#2F8FE0','#D64545'];
 var W=({ja:{t:'仕事から見る在留資格 ― 空港・航空の例',r:[['本社から日本の支店へ転勤する','企業内転勤'],['日本の会社で事務・企画・通訳・旅客の事務','技術・人文知識・国際業務'],['空港の地上の作業・航空機の整備','特定技能（航空）'],['日本の大学を出てN1。日本語を使う幅広い仕事','特定活動46号'],['日本の会社・支店を経営する','経営・管理'],['留学生・家族のアルバイト','資格外活動許可（週28時間）'],['若い人の1年の休暇と仕事','ワーキング・ホリデー（特定活動）']],n:['同じ空港の仕事でも、業務の中身で合う資格が変わる。最後は入管が判断する★','永住者・日本人の配偶者などは、仕事の種類の制限がない']},
  ko:{t:'일로 보는 재류자격 — 공항·항공의 예',r:[['본사에서 일본 지점으로 전근','기업내전근'],['일본 회사의 사무·기획·통역·여객 사무','기술·인문지식·국제업무'],['공항 지상 작업·항공기 정비','특정기능 (항공)'],['일본 대학 졸업 + N1. 일본어를 쓰는 폭넓은 일','특정활동 46호'],['일본 회사·지점 경영','경영·관리'],['유학생·가족의 아르바이트','자격외활동허가 (주 28시간)'],['젊은 사람의 1년 휴가와 일','워킹홀리데이 (특정활동)']],n:['같은 공항 일이라도 업무 내용에 따라 맞는 자격이 달라진다. 최종 판단은 입관★','영주자·일본인 배우자 등은 일의 종류에 제한이 없다']},
  en:{t:'Residence status by type of job: airport and airline examples',r:[['Transferred from head office to the Japan branch','Intra-company Transferee'],['Office, planning, interpreting or passenger admin at a Japanese company','Engineer/Specialist in Humanities/ International Services'],['Airport ground handling or aircraft maintenance','Specified Skilled Worker (aviation)'],['Japanese university degree plus N1; broad work using Japanese','Designated Activities No. 46'],['Running a company or branch in Japan','Business Manager'],['Part-time work for students and family members','Permission for outside activity (28 h a week)'],['A year of holiday and work for young people','Working holiday (Designated Activities)']],n:['Even at the same airport, the right status depends on what the job involves; immigration makes the final call ★','Permanent residents, spouses of Japanese nationals and similar have no limits on the type of work']}})[l];
 if(!W)return F.ex2_job('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r.map(function(r,i){return [r[0],r[1],C[i]]}),'14s');s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
/* 1-2：在留期間の更新の時期と特例期間 */
ex2_renew:function(l){
 var W=({ja:{t:'在留期間の更新 ― いつ申請し、いつまで住めるか',k:[[-3,'期限の3か月前'],[0,'在留期限'],[2,'期限から2か月']],c:[['申請できる期間','期限の3か月前から期限の日まで。早めに出す'],['特例期間','期限までに申請していれば、結果が出るまで今の資格で住める（最長で期限から2か月）'],['申請しなかったら','期限の翌日からオーバーステイ。退去強制の対象']],n:['在留期間が3か月以下の人は、期間の半分ほどが過ぎてから申請する★','許可の通知が来たら、手数料を払って新しい在留カードを受け取る（1-3）']},
  ko:{t:'재류기간 갱신 — 언제 신청하고 언제까지 살 수 있나',k:[[-3,'기한 3개월 전'],[0,'재류 기한'],[2,'기한 후 2개월']],c:[['신청할 수 있는 기간','기한 3개월 전부터 기한 당일까지. 일찍 낸다'],['특례 기간','기한까지 신청했다면 결과가 나올 때까지 지금 자격으로 살 수 있다 (최장 기한 후 2개월)'],['신청하지 않았다면','기한 다음 날부터 오버스테이. 강제퇴거 대상']],n:['재류기간이 3개월 이하인 사람은 기간의 절반쯤 지난 뒤 신청★','허가 통지가 오면 수수료를 내고 새 재류카드를 받는다 (1-3편)']},
  en:{t:'Extending your period of stay: when to apply and how long you may stay',k:[[-3,'3 months before'],[0,'Expiry date'],[2,'2 months after']],c:[['When you can apply','From 3 months before expiry up to the expiry date; apply early'],['Special period','If you applied in time, you may stay on your current status until the decision (at most 2 months after expiry)'],['If you did not apply','Overstay from the day after expiry; liable to deportation']],n:['If your period of stay is 3 months or less, apply after about half of it has passed ★','When notified of approval, pay the fee and collect your new residence card (1-3)']}})[l];
 if(!W)return F.ex2_renew('ja');setK(1);
 var T=TOP(W.t),s=T.s,B=BAND(T.y+18,-4,2.6,[[-4,-3,'#C8D3DE'],[-3,0,'#1769e0'],[0,2,'#E08A2E'],[2,2.6,'#D64545']],W.k,'9s');s+=B.s;
 var A=ZCARDS(B.y,W.c,['#1769e0','#E08A2E','#D64545']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
/* 2-1：転職したときの手続きの順番 */
ex2_jobchg:function(l){
 var W=({ja:{t:'転職したときの手続きの順番（就労の資格の人）',s:['会社を辞める・新しい会社に入る','「所属機関に関する届出」を入管へ（オンラインでもできる）','新しい仕事が今の資格に合うか確かめる。就労資格証明書の申請は任意','合わなければ、働き始める前に資格の変更を申請','次の更新で、新しい会社の書類を出す'],w:['本人','14日以内','任意','働く前に','更新のとき'],n:['正当な理由なく3か月以上その資格の仕事をしないと、取り消しの対象になりうる','企業内転勤の人は、会社を変えると今の資格のままでは働けない']},
  ko:{t:'전직할 때 수속 순서 (취업 자격인 사람)',s:['회사를 그만둔다·새 회사에 들어간다','「소속 기관에 관한 신고」를 입관에 (온라인 가능)','새 일이 지금 자격에 맞는지 확인. 취업자격증명서 신청은 선택','맞지 않으면 일을 시작하기 전에 자격 변경 신청','다음 갱신 때 새 회사 서류를 낸다'],w:['본인','14일 이내','선택','일하기 전','갱신 때'],n:['정당한 이유 없이 3개월 이상 그 자격의 일을 하지 않으면 취소 대상이 될 수 있다','기업내전근인 사람은 회사를 바꾸면 지금 자격으로는 일할 수 없다']},
  en:{t:'Steps when you change jobs (work statuses)',s:['Leave your employer or join a new one','File a notification about your employer with immigration (online is possible)','Check the new job fits your status; a certificate of authorised employment is optional','If it does not fit, apply for a change of status before you start','At your next extension, submit the new employer’s documents'],w:['You','Within 14 days','Optional','Before starting','At extension'],n:['Not doing the work of your status for 3 months or more without good reason can lead to revocation','Intra-company transferees cannot work for a new company on their current status']}})[l];
 if(!W)return F.ex2_jobchg('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.s,W.w,['#1769e0','#D64545','#5B6B7D','#E08A2E','#2C8C8C'],'10s');s+=A.s;var L=LIST(W.n,A.y+10,600,11);return SVG(L.y+8,s+L.s)},
/* 2-8：留学生のアルバイトの時間の上限 */
ex2_ptj:function(l){
 var W=({ja:{t:'留学生のアルバイトの時間の上限',u:'時間（1週間）',c:[['学期中','どの7日間を取っても、合計28時間まで'],['学校の長い休みの間','1日8時間・週40時間まで（学則で決まった休みだけ）']],n:['掛け持ちは全部を足す：A店16時間＋B店14時間＝30時間で超過','風俗営業の店では、皿洗い・掃除でも働けない','卒業・退学の後は、この許可では働けない']},
  ko:{t:'유학생 아르바이트 시간의 상한',u:'시간 (1주)',c:[['학기 중','어느 7일을 잡아도 합계 28시간까지'],['학교의 긴 방학 동안','하루 8시간·주 40시간까지 (학칙으로 정한 방학만)']],n:['겹치기는 모두 더한다: A가게 16시간 + B가게 14시간 = 30시간으로 초과','풍속영업 가게에서는 설거지·청소도 할 수 없다','졸업·퇴학 뒤에는 이 허가로 일할 수 없다']},
  en:{t:'Part-time work limits for international students',u:'hours per week',c:[['During term','No more than 28 hours in total in any 7 days'],['Long school holidays','Up to 8 hours a day and 40 a week (official holidays only)']],n:['Add up every job: 16 h at shop A + 14 h at shop B = 30 h, over the limit','Adult entertainment businesses are off limits, even for washing up or cleaning','After graduating or leaving school, this permission no longer lets you work']}})[l];
 if(!W)return F.ex2_ptj('ja');setK(1);
 var T=TOP(W.t),s=T.s,B=SCALE(T.y+18,40,4,[[0,28,'#2C8C8C'],[28,40,'#E08A2E']],W.u,'9s');s+=B.s;
 var A=ZCARDS(B.y,W.c,['#2C8C8C','#E08A2E']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
/* 2-9：ワーキング・ホリデーの1年 */
ex2_whv:function(l){
 var W=({ja:{t:'韓国から日本へ ― ワーキング・ホリデーの1年',s:['韓国で申請（日本の大使館・総領事館。代理申請機関を通す時期あり）','ビザ（1年）で入国。主な空港で在留カード（特定活動）を受け取る','住所の届出。国民健康保険・国民年金に入る','働く（時間の上限なし。風俗営業はできない）','出国。転出届・住民税・脱退一時金を確かめる'],w:['申請の期間★','入国の日','14日以内','滞在中','1年以内'],n:['2025年10月から、一生で2回まで参加できる★','目的は休暇。仕事が中心なら就労の資格を考える']},
  ko:{t:'한국에서 일본으로 — 워킹홀리데이의 1년',s:['한국에서 신청 (주한 일본대사관·총영사관. 대리 신청 기관을 거치는 시기가 있음)','비자(1년)로 입국. 주요 공항에서 재류카드(특정활동)를 받는다','주소 신고. 국민건강보험·국민연금 가입','일한다 (시간 상한 없음. 풍속영업은 불가)','출국. 전출 신고·주민세·탈퇴 일시금을 확인'],w:['신청 기간★','입국일','14일 이내','체류 중','1년 이내'],n:['2025년 10월부터 평생 2회까지 참가할 수 있다★','목적은 휴가. 일이 중심이라면 취업 자격을 생각한다']},
  en:{t:'From Korea to Japan: a working holiday year',s:['Apply in Korea (Japanese embassy or consulate; some periods go through appointed agencies)','Enter on a one-year visa and receive a residence card (Designated Activities) at a major airport','Register your address; join National Health Insurance and the National Pension','Work (no hour limit; adult entertainment businesses are off limits)','Leave; check your moving-out notice, residence tax and pension refund'],w:['Application window ★','Arrival','Within 14 days','During stay','Within a year'],n:['Since October 2025 you may take part twice in a lifetime ★','The purpose is a holiday; if work is the main aim, consider a work status']}})[l];
 if(!W)return F.ex2_whv('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.s,W.w,['#1769e0','#2C8C8C','#D64545','#E08A2E','#5B6B7D'],'10s');s+=A.s;var L=LIST(W.n,A.y+10,600,11);return SVG(L.y+8,s+L.s)},
/* 4-5：留学生の保険と年金の手続き */
ex2_stu:function(l){
 var C=['#2F8FE0','#2C8C8C','#7A5CC7','#E08A2E','#D64545'];
 var W=({ja:{t:'留学生が役所と学校でする保険・年金の手続き',r:[['国民健康保険','住所の届出と一緒に加入。所得が少なければ軽減'],['国民年金（20歳以上）','学生納付特例を毎年度申請'],['学校の保険','けが・相手への賠償に備えて加入'],['払い方','口座振替などで期限どおりに。記録を残す'],['2027年ごろから','在留審査で納付の状況を確認する方針★']],n:['在留カード・学生証・パスポートを持って、住所の届出と同じ日に','払えないときは放っておかず、減免・猶予を相談する']},
  ko:{t:'유학생이 관청과 학교에서 하는 보험·연금 수속',r:[['국민건강보험','주소 신고와 함께 가입. 소득이 적으면 경감'],['국민연금 (20세 이상)','학생 납부 특례를 매년도 신청'],['학교 보험','부상·상대 배상에 대비해 가입'],['내는 방법','자동이체 등으로 기한대로. 기록을 남긴다'],['2027년 무렵부터','재류 심사에서 납부 상황을 확인할 방침★']],n:['재류카드·학생증·여권을 가지고 주소 신고와 같은 날에','낼 수 없을 때는 방치하지 말고 감면·유예를 상담']},
  en:{t:'Insurance and pension steps for international students',r:[['National Health Insurance','Join when you register your address; reduced if your income is low'],['National Pension (20 and over)','Apply for the student deferral every fiscal year'],['School insurance','Join to cover injuries and liability to others'],['Paying','Pay on time by direct debit or similar, and keep records'],['From around 2027','Payment records to be checked in residence reviews ★']],n:['Go on the day you register your address, with residence card, student ID and passport','If you cannot pay, do not ignore it: ask about reductions or deferral']}})[l];
 if(!W)return F.ex2_stu('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r.map(function(r,i){return [r[0],r[1],C[i]]}),'10s');s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},
/* 6-5：日本を離れるときの順番 */
ex2_leave:function(l){
 var W=({ja:{t:'日本を離れるときの順番',s:['家の解約の通知。携帯・電気・ガス・ネットの解約の予約','転出届。国民健康保険・マイナンバーカードの手続き','住民税を一括で払うか、納税管理人を届け出る','空港で在留カードを返す（戻るならみなし再入国）','日本年金機構へ脱退一時金を請求'],w:['1か月前','14日前から','出国まで','出国の日','出国後2年以内'],n:['敷金の返金・最後の給与を受け取る口座を決めてから解約する','戻る予定なら、在留期限とみなし再入国の1年を確かめる']},
  ko:{t:'일본을 떠날 때의 순서',s:['집 해약 통지. 휴대폰·전기·가스·인터넷 해지 예약','전출 신고. 국민건강보험·마이넘버카드 수속','주민세를 일괄로 내거나 납세 관리인을 신고','공항에서 재류카드 반납 (돌아올 거면 간주 재입국)','일본연금기구에 탈퇴 일시금 청구'],w:['1개월 전','14일 전부터','출국 전까지','출국일','출국 후 2년 이내'],n:['보증금 반환·마지막 급여를 받을 계좌를 정한 뒤 해지','돌아올 예정이면 재류 기한과 간주 재입국 1년을 확인']},
  en:{t:'Leaving Japan: the order of things',s:['Give notice on your flat; book cancellation of phone, power, gas and internet','File your moving-out notice; sort out health insurance and your My Number card','Pay residence tax in full or appoint a tax agent','Hand in your residence card at the airport (or tick special re-entry if returning)','Claim the pension lump-sum refund from the Japan Pension Service'],w:['1 month before','From 14 days before','Before leaving','Departure day','Within 2 years'],n:['Decide which account will receive your deposit refund and last pay before closing it','If you plan to return, check your expiry date and the one-year special re-entry limit']}})[l];
 if(!W)return F.ex2_leave('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.s,W.w,['#5B6B7D','#1769e0','#D64545','#E08A2E','#2C8C8C'],'10s');s+=A.s;var L=LIST(W.n,A.y+10,600,11);return SVG(L.y+8,s+L.s)},
/* 10-5：揺れた瞬間、場所ごとにすること */
ex2_quake:function(l){
 var C=['#1769e0','#2C8C8C','#7A5CC7','#5B6B7D','#E08A2E','#2F8FE0','#D64545'];
 var W=({ja:{t:'揺れた瞬間、その場所ですること',r:[['家','机の下などで頭を守る。揺れがおさまるまで動かない'],['電車・地下鉄','つり革・手すりを持つ。勝手に線路へ出ない'],['街の中','ガラス・看板・ブロック塀から離れ、かばんで頭を守る'],['高い建物','長くゆっくり揺れる。窓から離れ、エレベーターは使わない'],['空港のターミナル','天井の照明・ガラスの下から離れ、係員の指示を待つ'],['車の運転中','ハザードランプを付け、ゆっくり左に寄せて止める'],['海・川の近く','揺れがおさまったらすぐ高い所へ。警報を待たない']],n:['揺れがおさまったら：火・出口・靴、そして家族と職場への連絡','臨時情報が出たら、1週間はすぐ逃げられる準備を続ける']},
  ko:{t:'흔들리는 순간, 그 자리에서 할 일',r:[['집','책상 밑 등에서 머리를 보호. 흔들림이 멈출 때까지 움직이지 않는다'],['전철·지하철','손잡이·난간을 잡는다. 마음대로 선로로 나가지 않는다'],['거리','유리·간판·블록 담에서 떨어져 가방으로 머리를 보호'],['고층 건물','길고 천천히 흔들린다. 창에서 떨어지고 엘리베이터는 쓰지 않는다'],['공항 터미널','천장 조명·유리 아래에서 벗어나 직원의 지시를 기다린다'],['운전 중','비상등을 켜고 천천히 왼쪽에 붙여 세운다'],['바다·강 근처','흔들림이 멈추면 바로 높은 곳으로. 경보를 기다리지 않는다']],n:['흔들림이 멈추면: 불·출구·신발, 그리고 가족과 직장에 연락','임시 정보가 나오면 1주일은 바로 대피할 수 있게 준비를 이어 간다']},
  en:{t:'The moment it shakes: what to do where you are',r:[['At home','Protect your head, under a table if you can; stay put until it stops'],['On a train','Hold a strap or handrail; never get down onto the tracks yourself'],['In the street','Move away from glass, signs and block walls; cover your head with your bag'],['High-rise building','Expect long, slow sway; keep away from windows and do not use lifts'],['Airport terminal','Move out from under ceiling lights and glass; wait for staff instructions'],['Driving','Put on your hazard lights and pull over slowly to the left'],['Near the sea or a river','Head for high ground as soon as it stops; do not wait for a warning']],n:['When it stops: fire, exits, shoes, then contact family and work','If an extra earthquake advisory is issued, stay ready to leave at once for a week']}})[l];
 if(!W)return F.ex2_quake('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r.map(function(r,i){return [r[0],r[1],C[i]]}),'14s');s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
