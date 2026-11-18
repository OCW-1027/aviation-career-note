/* 航空の仕事ガイド（講座 27）の図（2026.11 新規）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算）
   制度は国・年で変わるので、図は流れの目安だけを示し、数字は本文の表と公式の資料で確かめる */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,planeS=H.planeS,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function svg(vw,hh,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+vw+' '+hh.toFixed(0)+'" role="img">'+R(0,0,vw,hh,'#F7FAFD')+body+'</svg>'}
var COL=['#2F6FD6','#1F7A6E','#B4532A','#5A3D6B','#2B4F7A'];
/* 国ごとの道すじ（レーン）：各段階の箱が順に光り、点が進む。狭い画面では縦に並べる */
function LANES(W){setK(1);var nar=NARROW(),vw=nar?580:900,y=56,s=TTL(vw/2,30,W.t,15,'#0f3558',vw-40),dur=W.lanes[0].s.length*1.6+'s';
 W.lanes.forEach(function(L,li){var col=COL[li%COL.length],n=L.s.length;
  if(!nar){var lx=20,lw=110,bx=lx+lw+10,gap=8,bw=(vw-bx-20-gap*(n-1))/n,bh=0;
   L.s.forEach(function(t){bh=Math.max(bh,LI(t,10.5,bw-12).length*FS(10.5)*1.3+16)});bh=Math.max(bh,44);
   s+=R(lx,y,lw,bh,col,8)+WR(lx+lw/2,y+bh/2+FS(12)*0.3,L.n,12,'#fff',900,lw-10);
   L.s.forEach(function(t,i){var x=bx+i*(bw+gap),a=i/n,b=(i+1)/n;
    s+='<g><rect x="'+x.toFixed(1)+'" y="'+y+'" width="'+bw.toFixed(1)+'" height="'+bh+'" rx="8" fill="#fff" stroke="'+col+'" stroke-width="1.5"/><rect x="'+x.toFixed(1)+'" y="'+y+'" width="'+bw.toFixed(1)+'" height="'+bh+'" rx="8" fill="'+col+'" opacity="0"><animate attributeName="opacity" values="0;0;.16;.16;0" keyTimes="0;'+a.toFixed(3)+';'+(a+0.02).toFixed(3)+';'+b.toFixed(3)+';1" dur="'+dur+'" repeatCount="indefinite"/></rect>'+WR(x+bw/2,y+bh/2+FS(10.5)*0.3,t,10.5,D,800,bw-12)+'</g>';
    if(i<n-1)s+='<path d="M'+(x+bw+1).toFixed(1)+' '+(y+bh/2-5)+' l5 5 l-5 5" fill="none" stroke="'+col+'" stroke-width="2"/>'});
   s+='<circle r="5" fill="'+col+'"><animateMotion dur="'+dur+'" repeatCount="indefinite" path="M'+bx+' '+(y+bh+6)+' L'+(vw-20)+' '+(y+bh+6)+'"/></circle>';y+=bh+18}
  else{var lx=20,lw=540,bh2;s+=R(lx,y,lw,30,col,8)+tx(lx+lw/2,y+20,L.n,12.5,'#fff',900);y+=36;
   L.s.forEach(function(t,i){var nl=LI(t,11,lw-60).length,h=nl*FS(11)*1.3+14,a=i/n,b=(i+1)/n;
    s+='<g><rect x="'+lx+'" y="'+y+'" width="'+lw+'" height="'+h+'" rx="8" fill="#fff" stroke="'+col+'" stroke-width="1.5"/><rect x="'+lx+'" y="'+y+'" width="'+lw+'" height="'+h+'" rx="8" fill="'+col+'" opacity="0"><animate attributeName="opacity" values="0;0;.16;.16;0" keyTimes="0;'+a.toFixed(3)+';'+(a+0.02).toFixed(3)+';'+b.toFixed(3)+';1" dur="'+dur+'" repeatCount="indefinite"/></rect>'+tx(lx+20,y+h/2+5,String(i+1),12,col,900)+WR(lx+40,y+h/2+FS(11)*0.3,t,11,D,800,lw-60,'start')+'</g>';y+=h+(i<n-1?6:12)})}});
 if(W.note){var nl=LI(W.note,10.5,vw-64).length,h=nl*FS(10.5)*1.3+14;s+=R(20,y,vw-40,h,'#fff',10,' stroke="#D9E3EC"')+WR(vw/2,y+7+nl*FS(10.5)*1.3/2+FS(10.5)*0.3,W.note,10.5,G,800,vw-64);y+=h+8}
 return svg(vw,y+6,s)}
function pick(o,l){return o[l]||o.ja}
var F={
/* 1 航空の仕事の地図：国の資格が要る仕事と、会社の訓練・選考で就く仕事 */
car_map:function(l){
 var W=pick({ja:{t:'航空の仕事と必要な資格',a:'国家資格（ライセンス）が必要',b:'会社の採用・訓練を経て就く（資格があれば有利）',ja:[['パイロット','操縦士の技能証明'],['航空管制官','航空管制の資格（主に国の機関に勤務）'],['航空整備士','航空整備士の技能証明'],['運航管理者','技能検定など（制度は国により異なる）']],jb:[['客室乗務員','会社の訓練（国の証明制度がある国も）'],['地上職（旅客・貨物）','社内訓練・危険物の講習など'],['空港の運営・保安','保安検査の教育訓練など'],['航空気象・航空情報','気象・航空情報の関係機関の職員など']]},
  ko:{t:'항공 직무별 자격 요건',a:'국가 자격(면허) 필요',b:'회사 채용·훈련으로 입문(자격증 우대)',ja:[['조종사','조종사 자격증명'],['항공교통관제사','관제사 자격증명(주로 국가기관 근무)'],['항공정비사','항공정비사 자격증명'],['운항관리사','자격증명(나라마다 제도 상이)']],jb:[['객실승무원','회사 훈련(국가 증명을 두는 나라도 있음)'],['지상직(여객·화물)','회사 훈련·위험물 교육 등'],['공항 운영·보안','보안검색 교육 등'],['항공기상·항공정보','기상·항공정보 관련 기관 채용 등']]},
  en:{t:'Aviation jobs and qualifications',a:'National licence required',b:'Company hiring and training (qualifications help)',ja:[['Pilot','Pilot licence'],['Air traffic controller','ATC licence (often in public service)'],['Maintenance engineer','Maintenance engineer licence'],['Flight dispatcher','Licence (systems vary by country)']],jb:[['Cabin crew','Company training (a national certificate in some countries)'],['Ground staff (passenger and cargo)','Company training, dangerous goods training and more'],['Airport operations and security','Security screening training and more'],['Aviation weather and aeronautical information','Hired by weather and information services']]}},l);
 setK(1);var nar=NARROW(),vw=nar?580:900,s=TTL(vw/2,30,W.t,15,'#0f3558',vw-40),y=56;
 function col(x0,w,head,items,c){var g=R(x0,y,w,30,c,8)+tx(x0+w/2,y+20,head,12,'#fff',900),yy=y+38;items.forEach(function(it,i){var nl=LI(it[1],10.5,w-24).length,h=FS(12)*1.4+nl*FS(10.5)*1.3+14;g+='<g>'+R(x0,yy,w,h,'#fff',10,' stroke="'+c+'" stroke-width="1.5"')+tx(x0+14,yy+FS(12)*1.2+4,it[0],12,c,900,'start')+WR(x0+14,yy+FS(12)*1.4+8+nl*FS(10.5)*1.3/2,it[1],10.5,D,800,w-24,'start')+'<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="3s" begin="'+(i*0.4)+'s" repeatCount="indefinite"/></g>';yy+=h+6});return {g:g,y:yy}}
 if(nar){var a=col(20,540,W.a,W.ja,'#2F6FD6');s+=a.g;y=a.y+10;var b=col(20,540,W.b,W.jb,'#1F7A6E');s+=b.g;return svg(vw,b.y+8,s)}
 var a=col(20,420,W.a,W.ja,'#2F6FD6'),b=col(460,420,W.b,W.jb,'#1F7A6E');s+=a.g+b.g;
 return svg(vw,Math.max(a.y,b.y)+8,s)},

/* 2 管制官になる道（4つの地域） */
car_atc:function(l){return LANES(pick({
 ja:{t:'航空管制官への道（4地域）',lanes:[{n:'韓国',s:['大学・専門教育機関で学ぶ','航空交通管制士の資格証明（18歳以上、英語能力）','国土交通部などに採用される','管制機関で現場訓練','管制席ごとの資格を取得']},{n:'日本',s:['航空管制官採用試験（21〜29歳、21歳未満は学歴要件あり）','航空保安大学校で基礎研修','空港・航空交通管制部に配属','現場訓練と部内の試験','管制席ごとの資格を取得']},{n:'米国',s:['応募（米国市民・31歳未満）','適性検査（ATSA）','FAAアカデミー（数か月）','配属先の施設で訓練（2〜3年）','正式な航空管制官（CPC）']},{n:'欧州',s:['各国の管制機関（ANSP）による選考','訓練生用の管制官ライセンス（18歳以上）','基礎訓練・管制席ごとの訓練','航空管制官ライセンス','管制席ごとの資格を取得']}],note:'年齢などの条件は掲載時点の目安です。応募前に必ず各国の募集要項で確認してください。'},
 ko:{t:'항공교통관제사 진로(4개 지역)',lanes:[{n:'한국',s:['대학·전문교육기관 이수','항공교통관제사 자격증명(18세 이상, 영어 능력)','국토교통부 등 채용','관제기관 현장 훈련','관제석별 자격 취득']},{n:'일본',s:['항공관제관 채용시험(21~29세, 21세 미만은 학력 요건 있음)','항공보안대학교 기초 교육','공항·항공교통관제부 배치','현장 훈련·내부 시험','관제석별 자격 취득']},{n:'미국',s:['지원(미국 시민·31세 미만)','적성검사(ATSA)','FAA 아카데미(수개월)','배치 시설 현장 훈련(2~3년)','정식 관제사(CPC)']},{n:'유럽',s:['각국 항행서비스 제공기관(ANSP) 선발','훈련생 관제사 면허(18세 이상)','기초·관제석 훈련','관제사 면허','관제석별 자격 취득']}],note:'나이 등 조건은 게재 시점 기준 참고용입니다. 지원 전 반드시 각국 모집 공고를 확인하세요.'},
 en:{t:'Routes to becoming an air traffic controller (four regions)',lanes:[{n:'Korea',s:['Complete a university or training institution course','ATC licence (18+, English proficiency)','Hired by the transport ministry or other bodies','On-the-job training at an ATC unit','Ratings for each position']},{n:'Japan',s:['National ATC recruitment exam (aged 21–29, or younger with a degree)','Basic training at the Aeronautical Safety College','Posted to an airport or ACC','On-the-job training and internal checks','Ratings for each position']},{n:'USA',s:['Apply (US citizen, under 31)','Aptitude test (ATSA)','FAA Academy (several months)','Facility training (2–3 years)','Certified professional controller (CPC)']},{n:'Europe',s:['Selection by a national ANSP','Student ATCO licence (18+)','Initial and unit training','ATCO licence','Unit endorsements']}],note:'Ages and other conditions are a guide, correct at the time of publication. Always check each country’s recruitment notice before applying.'}},l))},

/* 3 運航管理者になる道 */
car_dsp:function(l){return LANES(pick({
 ja:{t:'運航管理者への道（4地域）',lanes:[{n:'韓国',s:['航空会社での実務経験、または専門教育機関で修了','運航管理士の資格証明（21歳以上）','航空会社の運航管理部門に配属','社内訓練・路線経験','運航管理士として勤務']},{n:'日本',s:['航空会社に入社（運航管理補助業務など）','年齢・経験の要件を満たす','運航管理者技能検定','社内審査','運航管理者として勤務']},{n:'米国',s:['FAA認定の訓練コース','学科試験（21歳以上）','実地試験','運航管理者の資格証明（23歳以上）','航空会社で路線訓練']},{n:'欧州',s:['航空会社に入社','社内訓練','社内認定','運航管理業務を担当','国家資格がない国もある']}],note:'運航管理の制度は国によって大きく異なり、国家資格がない国もあります。詳しくは各国の航空当局の資料で確認してください。'},
 ko:{t:'운항관리사 진로(4개 지역)',lanes:[{n:'한국',s:['항공사 실무 경력 또는 전문교육기관 이수','운항관리사 자격증명(21세 이상)','항공사 운항관리실 배치','회사 훈련·노선 경험','운항관리사로 근무']},{n:'일본',s:['항공사 입사(운항관리 보조 등)','나이·경력 조건 충족','운항관리자 기능검정','회사 심사','운항관리자로 근무']},{n:'미국',s:['FAA 인정 훈련 과정','학과시험(21세 이상)','실기시험','운항관리사 증명(23세 이상)','항공사 노선 훈련']},{n:'유럽',s:['항공사 입사','회사 훈련','회사 자격 인정','운항관리 업무 담당','국가 면허가 없는 나라도 있음']}],note:'운항관리 제도는 나라마다 크게 다르며, 국가 자격이 없는 나라도 있습니다. 자세한 내용은 각국 항공 당국 자료를 확인하세요.'},
 en:{t:'Routes to becoming a flight dispatcher (four regions)',lanes:[{n:'Korea',s:['Airline experience or a training institution course','Flight dispatcher licence (21+)','Assigned to an airline operations centre','Company training and route experience','Work as a dispatcher']},{n:'Japan',s:['Join an airline (e.g. as a dispatch assistant)','Meet age and experience requirements','National dispatcher skill test','Company check','Work as a dispatcher']},{n:'USA',s:['FAA-approved training course','Knowledge test (21+)','Practical test','Aircraft dispatcher certificate (23+)','Route training at an airline']},{n:'Europe',s:['Join an airline','Company training','Company approval','Work as a flight operations officer','Some countries have no national licence']}],note:'Dispatcher qualification systems vary widely, and some countries have no national licence. For details, check each aviation authority’s guidance.'}},l))},

/* 4 パイロットになる道：4つの入口から、事業用→副操縦士→機長 */
car_pilot:function(l){
 var W=pick({ja:{t:'パイロットになる4つのルート',e:['航空会社の自社養成','大学・国立の航空学校','私立の飛行訓練校（自費）','軍（空軍など）'],m:['事業用操縦士・計器飛行証明（またはMPL）','航空会社の副操縦士','機長（定期運送用操縦士）'],h:'経験と審査を重ね、副操縦士から機長への昇格まで10年前後かかることが多い'},
  ko:{t:'조종사 입문 경로 4가지',e:['항공사 자체 양성','대학·국립 항공학교','사설 비행교육기관(자비)','군(공군 등)'],m:['사업용 조종사·계기비행증명(또는 MPL)','항공사 부기장','기장(운송용 조종사)'],h:'경험·심사를 거쳐 부기장에서 기장 승격까지 보통 10년 안팎'},
  en:{t:'Four routes to becoming a pilot',e:['Airline cadet programme','University or national flight school','Private flight school (self-funded)','Military (air force and others)'],m:['Commercial licence + instrument rating (or MPL)','First officer at an airline','Captain (ATPL)'],h:'Promotion from first officer to captain typically takes around ten years, subject to experience and checks'}},l);
 setK(1);var nar=NARROW(),vw=nar?580:640,s=TTL(vw/2,30,W.t,15,'#0f3558',vw-40),y=56,lh=FS(11)*1.3;
 function path(x1,y1,x2,y2,i,vert){var p=vert?'M'+x1+' '+y1+' C'+x1+' '+(y2-20)+' '+x2+' '+(y2-30)+' '+x2+' '+y2:'M'+x1+' '+y1+' C'+(x1+25)+' '+y1+' '+(x2-20)+' '+y2+' '+x2+' '+y2;return '<path d="'+p+'" fill="none" stroke="'+COL[i]+'" stroke-width="2.5"/><circle r="5" fill="'+COL[i]+'"><animateMotion dur="4s" begin="'+(i*0.5)+'s" repeatCount="indefinite" path="'+p+'"/></circle>'}
 function stages(mx,mw,y0){var g='',yy=y0;W.m.forEach(function(t,i){var nl=LI(t,11.5,mw-50).length,h=Math.max(46,nl*FS(11.5)*1.3+18);g+=R(mx,yy,mw,h,'#fff',10,' stroke="#0f3558" stroke-width="2"')+WR(mx+mw/2,yy+h/2+FS(11.5)*0.3,t,11.5,'#0f3558',900,mw-50);if(i<W.m.length-1)g+=ARW(mx+mw/2,yy+h+2,mx+mw/2,yy+h+14,'#0f3558',2.5);if(i==W.m.length-1)g+='<g><g transform="translate('+(mx+mw-30)+' '+(yy+h/2-6)+') scale(1.2)">'+planeS('#fff')+'</g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3s" repeatCount="indefinite"/></g>';yy+=h+16});return {g:g,y:yy-16}}
 var ew=nar?265:190,eh=40;W.e.forEach(function(t){eh=Math.max(eh,LI(t,11,ew-16).length*lh+14)});
 var boxes='',lines='',st;
 if(nar){var top=y+2*(eh+16)+24;W.e.forEach(function(t,i){var x=20+(i%2)*(ew+10),yy=y+Math.floor(i/2)*(eh+16);boxes+=R(x,yy,ew,eh,COL[i],10)+WR(x+ew/2,yy+eh/2+FS(11)*0.3,t,11,'#fff',900,ew-16);lines+=path(x+ew/2,yy+eh/2,vw/2,top,i,1)});
  st=stages(20,540,top);s+=lines+boxes+st.g;y=st.y+14}
 else{var mx=260,mw=360;st=stages(mx,mw,y+10);W.e.forEach(function(t,i){var yy=y+i*(eh+8);boxes+=R(20,yy,ew,eh,COL[i],10)+WR(115,yy+eh/2+FS(11)*0.3,t,11,'#fff',900,ew-16);lines+=path(210,yy+eh/2,mx,y+33,i,0)});
  s+=lines+boxes+st.g;y=Math.max(st.y,y+4*(eh+8))+14}
 var nl=LI(W.h,11,vw-80).length,h=nl*lh+14;s+=R(20,y,vw-40,h,'#fff',10,' stroke="#D9E3EC"')+WR(vw/2,y+7+nl*lh/2+FS(11)*0.3,W.h,11,G,800,vw-80);
 return svg(vw,y+h+10,s)},

/* 5 飛行時間の目安（ICAOの最低の基準） */
car_hours:function(l){
 var W=pick({ja:{t:'資格別の最低飛行時間（ICAO基準）',r:[['自家用（PPL）',40,'40時間以上'],['事業用（CPL）',200,'200時間以上（認定訓練課程の修了で150時間以上）'],['准定期運送用（MPL）',240,'240時間以上の訓練（シミュレーターの比重が大きい）'],['定期運送用（ATPL）',1500,'1,500時間以上']],n:'実際の飛行時間・年齢の基準は各国の規則によります。航空会社の採用条件は通常これより高くなります。'},
  ko:{t:'자격별 최소 비행시간(ICAO 기준)',r:[['자가용(PPL)',40,'40시간 이상'],['사업용(CPL)',200,'200시간 이상(인가 훈련과정 이수 시 150시간 이상)'],['부조종사(MPL)',240,'240시간 이상 훈련(시뮬레이터 비중 큼)'],['운송용(ATPL)',1500,'1,500시간 이상']],n:'실제 비행시간·나이 기준은 각국 규정에 따르며, 항공사 채용 요건은 대개 이보다 높습니다.'},
  en:{t:'Minimum flight hours by licence (ICAO)',r:[['Private (PPL)',40,'At least 40 hours'],['Commercial (CPL)',200,'At least 200 hours (150 on an approved integrated course)'],['Multi-crew (MPL)',240,'At least 240 hours of training (largely in simulators)'],['Airline transport (ATPL)',1500,'At least 1,500 hours']],n:'Actual hours and ages are set by national rules, and airline hiring requirements are often higher'}},l);
 setK(1);var nar=NARROW(),vw=nar?580:640,s=TTL(vw/2,30,W.t,15,'#0f3558',vw-40),y=58,x0=nar?34:200,bw=nar?510:380,sc=bw/1500;
 W.r.forEach(function(r,i){var w=Math.max(6,r[1]*sc),ll=nar?1:LI(r[0],11.5,165).length,tl=LI(r[2],10.5,nar?510:410).length,lab=nar?FS(11.5)*1.5:0,
   rh=nar?lab+24+tl*FS(10.5)*1.3+12:Math.max(52,ll*FS(11.5)*1.3+12,24+tl*FS(10.5)*1.3+10),by=y+(nar?lab+4:10);
  s+=R(20,y,vw-40,rh,i%2?'#fff':'#F4F7FB',8)+(nar?tx(x0,y+FS(11.5)*1.2,r[0],11.5,D,900,'start'):WR(30,y+rh/2+FS(11.5)*0.3,r[0],11.5,D,900,165,'start'));
  s+='<rect x="'+x0+'" y="'+by+'" width="'+w.toFixed(1)+'" height="14" rx="4" fill="'+COL[i]+'"><animate attributeName="width" values="0;'+w.toFixed(1)+';'+w.toFixed(1)+'" keyTimes="0;.5;1" dur="5s" begin="'+(i*0.3)+'s" repeatCount="indefinite"/></rect>';
  s+=WR(x0,by+22+tl*FS(10.5)*1.3/2,r[2],10.5,G,800,nar?510:410,'start');y+=rh+6});
 var nl=LI(W.n,10.5,vw-80).length,h=nl*FS(10.5)*1.3+14;s+=R(20,y+4,vw-40,h,'#fff',10,' stroke="#D9E3EC"')+WR(vw/2,y+11+nl*FS(10.5)*1.3/2+FS(10.5)*0.3,W.n,10.5,G,800,vw-80);
 return svg(vw,y+h+14,s)},

/* 6 整備士になる道 */
car_mx:function(l){return LANES(pick({
 ja:{t:'航空整備士への道（4地域）',lanes:[{n:'韓国',s:['専門教育機関（大学・専門学校）の修了、または実務経験','航空整備士の資格証明（18歳以上）','航空会社・整備会社に入社','機種別の訓練','整備確認の権限']},{n:'日本',s:['指定航空従事者養成施設、または実務経験','一等・二等航空整備士など（年齢・経験の要件あり）','航空会社・整備会社に入社','型式限定を取得','確認主任者']},{n:'米国',s:['FAA認定の整備学校、または実務経験18〜30か月','A&P（機体・発動機）の試験（18歳以上）','航空会社・整備会社に入社','機種別の訓練','検査権限（IAなど）']},{n:'欧州',s:['Part-147の教育機関、または実務経験','Part-66のライセンス（B1・B2など）','整備組織（Part-145）で勤務','型式限定を追加','整備完了の証明を発行する権限']}],note:'資格の種類・名称は国によって異なります。正確な要件は各国の航空当局の資料で確認してください。'},
 ko:{t:'항공정비사 진로(4개 지역)',lanes:[{n:'한국',s:['전문교육기관(대학·전문학교) 이수 또는 실무 경력','항공정비사 자격증명(18세 이상)','항공사·정비업체 입사','기종별 훈련','정비 확인 권한']},{n:'일본',s:['국가 지정 양성시설 또는 실무 경력','1등·2등 항공정비사 등(나이·경력 요건 있음)','항공사·정비업체 입사','형식 한정 취득','확인 주임자']},{n:'미국',s:['FAA 인정 정비학교 또는 실무 18~30개월','A&P(기체·발동기) 시험(18세 이상)','항공사·정비업체 입사','기종별 훈련','검사 권한(IA 등)']},{n:'유럽',s:['Part-147 교육기관 또는 실무 경력','Part-66 면허(B1·B2 등)','정비조직(Part-145) 근무','기종 한정 추가','정비 완료 증명 발급 권한']}],note:'자격 종류와 명칭은 나라마다 다릅니다. 정확한 요건은 각국 항공 당국 자료를 확인하세요.'},
 en:{t:'Routes to becoming a maintenance engineer (four regions)',lanes:[{n:'Korea',s:['Training institution (university or college) or practical experience','Aircraft maintenance engineer licence (18+)','Join an airline or MRO','Type training','Certification privileges']},{n:'Japan',s:['Designated training school or practical experience','First- or second-class engineer licence (age and experience requirements)','Join an airline or MRO','Add type ratings','Certifying staff']},{n:'USA',s:['FAA-approved school (Part 147) or 18–30 months of experience','A&P (airframe and powerplant) tests (18+)','Join an airline or MRO','Type training','Inspection authority (IA and others)']},{n:'Europe',s:['Part-147 school or practical experience','Part-66 licence (B1, B2, etc.)','Work at a Part-145 organisation','Add type ratings','Certification privileges (CRS)']}],note:'Licence types and names differ by country. Check with each aviation authority for exact requirements.'}},l))},

/* 7 客室乗務員：国の証明がある地域と、会社の訓練だけの地域 */
car_cabin:function(l){return LANES(pick({
 ja:{t:'客室乗務員への道（4地域）',lanes:[{n:'韓国',s:['航空会社の採用（書類・面接・英語・水泳などは会社により異なる）','会社の初期訓練（安全・救急処置・サービス）','国の基準に沿った審査','乗務']},{n:'日本',s:['航空会社の採用（正社員・契約社員など会社により異なる）','会社の初期訓練','社内審査','乗務']},{n:'米国',s:['航空会社の採用','社内訓練','FAAの客室乗務員証明','乗務']},{n:'欧州',s:['航空会社の採用（18歳以上）','初期安全訓練','客室乗務員の証明書（CCA）','乗務']}],note:'韓国と日本には客室乗務員の国家資格はありませんが、法令に基づく訓練と審査が必要です。'},
 ko:{t:'객실승무원 진로(4개 지역)',lanes:[{n:'한국',s:['항공사 채용(서류·면접·영어·수영 등 회사별 상이)','회사 초기 훈련(안전·응급처치·서비스)','국가 기준에 따른 심사','비행 근무']},{n:'일본',s:['항공사 채용(정규직·계약직 등 회사별 상이)','회사 초기 훈련','회사 심사','비행 근무']},{n:'미국',s:['항공사 채용','회사 훈련','FAA 객실승무원 증명','비행 근무']},{n:'유럽',s:['항공사 채용(18세 이상)','초기 안전 훈련','객실승무원 증명서(CCA)','비행 근무']}],note:'한국과 일본에는 객실승무원 국가 면허가 없지만, 법령에 따른 훈련과 심사를 거쳐야 합니다.'},
 en:{t:'Routes to becoming cabin crew (four regions)',lanes:[{n:'Korea',s:['Airline recruitment (requirements such as interviews, English and swimming vary by airline)','Initial company training (safety, first aid, service)','Checks under national standards','Line flying']},{n:'Japan',s:['Airline recruitment (permanent or contract, depending on airline)','Initial company training','Company checks','Line flying']},{n:'USA',s:['Airline recruitment','Company training','FAA flight attendant certificate','Line flying']},{n:'Europe',s:['Airline recruitment (18+)','Initial safety training','Cabin crew attestation (CCA)','Line flying']}],note:'Korea and Japan have no national cabin crew licence, but training and checks under national rules are required.'}},l))}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
