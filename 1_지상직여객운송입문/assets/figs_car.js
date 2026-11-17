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
 var W=pick({ja:{t:'航空の仕事の地図',a:'国の資格（ライセンス）が要る',b:'会社の選考・訓練で就く（資格が役立つ）',ja:[['パイロット','操縦士の技能証明'],['航空管制官','管制の資格（国の職員が多い）'],['整備士','整備士の技能証明'],['運航管理者','国の試験（国による）']],jb:[['客室乗務員','会社の訓練（国の証明がある国も）'],['地上職（旅客・貨物）','会社の訓練、危険物などの講習'],['空港の運営・保安','保安検査の講習など'],['航空気象・航空情報','気象・情報の機関の職員など']]},
  ko:{t:'항공 일의 지도',a:'나라의 자격(면허)이 필요',b:'회사 선발·훈련으로 들어감(자격이 도움)',ja:[['조종사','조종사 자격증명'],['항공교통관제사','관제 자격(나라 소속이 많다)'],['정비사','항공정비사 자격증명'],['운항관리사','나라 시험(나라에 따라)']],jb:[['객실승무원','회사 훈련(나라 증명이 있는 나라도)'],['지상직(여객·화물)','회사 훈련, 위험물 등 교육'],['공항 운영·보안','보안검색 교육 등'],['항공기상·항공정보','기상·정보 기관 직원 등']]},
  en:{t:'A map of aviation jobs',a:'Need a national licence',b:'Hired and trained by companies (qualifications help)',ja:[['Pilot','Pilot licence'],['Air traffic controller','ATC licence (often a public employee)'],['Maintenance engineer','Engineer licence'],['Flight dispatcher','National exam (in some countries)']],jb:[['Cabin crew','Company training (a national certificate in some countries)'],['Ground staff (passenger, cargo)','Company training, dangerous goods and other courses'],['Airport operations and security','Screening courses and others'],['Aviation weather and information','Staff of weather and information services']]}},l);
 setK(1);var nar=NARROW(),vw=nar?580:900,s=TTL(vw/2,30,W.t,15,'#0f3558',vw-40),y=56;
 function col(x0,w,head,items,c){var g=R(x0,y,w,30,c,8)+tx(x0+w/2,y+20,head,12,'#fff',900),yy=y+38;items.forEach(function(it,i){var nl=LI(it[1],10.5,w-24).length,h=FS(12)*1.4+nl*FS(10.5)*1.3+14;g+='<g>'+R(x0,yy,w,h,'#fff',10,' stroke="'+c+'" stroke-width="1.5"')+tx(x0+14,yy+FS(12)*1.2+4,it[0],12,c,900,'start')+WR(x0+14,yy+FS(12)*1.4+8+nl*FS(10.5)*1.3/2,it[1],10.5,D,800,w-24,'start')+'<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="3s" begin="'+(i*0.4)+'s" repeatCount="indefinite"/></g>';yy+=h+6});return {g:g,y:yy}}
 if(nar){var a=col(20,540,W.a,W.ja,'#2F6FD6');s+=a.g;y=a.y+10;var b=col(20,540,W.b,W.jb,'#1F7A6E');s+=b.g;return svg(vw,b.y+8,s)}
 var a=col(20,420,W.a,W.ja,'#2F6FD6'),b=col(460,420,W.b,W.jb,'#1F7A6E');s+=a.g+b.g;
 return svg(vw,Math.max(a.y,b.y)+8,s)},

/* 2 管制官になる道（4つの地域） */
car_atc:function(l){return LANES(pick({
 ja:{t:'航空管制官になる道（4つの地域）',lanes:[{n:'韓国',s:['大学・教育機関などで学ぶ','航空交通管制士の資格（18歳〜、英語）','国土交通部などに採用','管制施設で現場の訓練','持ち場ごとの資格']},{n:'日本',s:['航空管制官採用試験（大卒程度・30歳まで）','航空保安大学校で基礎研修','空港・管制部に配属','現場の訓練と内部の試験','持ち場ごとの資格']},{n:'米国',s:['応募（米国市民・31歳未満）','適性検査（ATSA）','FAAアカデミー（数か月）','施設で訓練（2〜3年）','一人前の管制官（CPC）']},{n:'欧州',s:['国の管制機関（ANSP）の選考','学生の管制官ライセンス（18歳〜）','基礎と持ち場の訓練','管制官ライセンス','持ち場の資格']}],note:'年齢・条件は公表時点の目安です。応募の前に、必ず各国の募集要項で確かめてください。'},
 ko:{t:'항공교통관제사가 되는 길(네 지역)',lanes:[{n:'한국',s:['대학·교육기관 등에서 공부','항공교통관제사 자격증명(18세~, 영어)','국토교통부 등에 채용','관제시설에서 현장 훈련','자리별 자격']},{n:'일본',s:['항공관제관 채용시험(대졸 정도·30세까지)','항공보안대학교 기초 연수','공항·관제부 배치','현장 훈련과 내부 시험','자리별 자격']},{n:'미국',s:['지원(미국 시민·31세 미만)','적성검사(ATSA)','FAA 아카데미(몇 개월)','시설 훈련(2~3년)','한 사람 몫의 관제사(CPC)']},{n:'유럽',s:['나라 관제기관(ANSP) 선발','학생 관제사 면허(18세~)','기초와 자리 훈련','관제사 면허','자리별 자격']}],note:'나이·조건은 발표 시점의 참고입니다. 지원 전에 반드시 각국 모집 요강으로 확인하세요.'},
 en:{t:'Routes to becoming an air traffic controller (four regions)',lanes:[{n:'Korea',s:['Study at a university or training institution','ATC licence (18+, English)','Hired by the transport ministry and others','On-the-job training at a facility','Ratings for each position']},{n:'Japan',s:['National ATC recruitment exam (degree level, up to about 30)','Basic training at the Aeronautical Safety College','Posted to an airport or ACC','On-the-job training and internal checks','Ratings for each position']},{n:'USA',s:['Apply (US citizen, under 31)','Aptitude test (ATSA)','FAA Academy (several months)','Facility training (2–3 years)','Certified professional controller (CPC)']},{n:'Europe',s:['Selection by a national ANSP','Student ATCO licence (18+)','Initial and unit training','ATCO licence','Unit endorsements']}],note:'Ages and conditions are a guide as published. Always check each country’s recruitment notice before applying.'}},l))},

/* 3 運航管理者になる道 */
car_dsp:function(l){return LANES(pick({
 ja:{t:'運航管理者になる道（4つの地域）',lanes:[{n:'韓国',s:['航空会社などで経験、または教育機関','運航管理士の資格（21歳〜）','航空会社の運航管理に配属','社内の訓練・路線の経験','運航管理士として勤務']},{n:'日本',s:['航空会社に入社（運航管理の補助など）','年齢・経験の条件を満たす','運航管理者技能検定','社内の審査','運航管理者']},{n:'米国',s:['FAAが認めた訓練コース','知識試験（21歳〜）','実地試験','運航管理者の証明（23歳〜）','航空会社で路線の訓練']},{n:'欧州',s:['航空会社に入社','会社の訓練','会社の認定','運航管理の担当','国の免許はない国が多い']}],note:'運航管理の制度は国によって大きく違います（国の資格がない国もある）。各国の航空当局の資料で確かめてください。'},
 ko:{t:'운항관리사가 되는 길(네 지역)',lanes:[{n:'한국',s:['항공사 등에서 경력, 또는 교육기관','운항관리사 자격증명(21세~)','항공사 운항관리실 배치','회사 훈련·노선 경험','운항관리사로 근무']},{n:'일본',s:['항공사 입사(운항관리 보조 등)','나이·경력 조건 충족','운항관리자 기능검정','회사 심사','운항관리자']},{n:'미국',s:['FAA 인정 훈련 과정','지식 시험(21세~)','실기 시험','운항관리사 증명(23세~)','항공사 노선 훈련']},{n:'유럽',s:['항공사 입사','회사 훈련','회사 인정','운항관리 담당','나라 면허가 없는 나라가 많다']}],note:'운항관리 제도는 나라마다 크게 다릅니다(나라 자격이 없는 나라도 있다). 각국 항공 당국 자료로 확인하세요.'},
 en:{t:'Routes to becoming a flight dispatcher (four regions)',lanes:[{n:'Korea',s:['Experience at an airline, or a training institution','Flight dispatcher licence (21+)','Assigned to an airline operations centre','Company training and route experience','Work as a dispatcher']},{n:'Japan',s:['Join an airline (dispatch assistant and similar)','Meet age and experience conditions','National dispatcher skill test','Company check','Flight dispatcher']},{n:'USA',s:['FAA-approved training course','Knowledge test (21+)','Practical test','Aircraft dispatcher certificate (23+)','Route training at an airline']},{n:'Europe',s:['Join an airline','Company training','Company approval','Flight operations officer','Many countries have no national licence']}],note:'Dispatch systems differ widely (some countries have no national licence). Check each aviation authority’s documents.'}},l))},

/* 4 パイロットになる道：4つの入口から、事業用→副操縦士→機長 */
car_pilot:function(l){
 var W=pick({ja:{t:'パイロットになる4つの入口',e:['航空会社の自社養成','大学・国の航空学校','自費の訓練校','軍（空軍など）'],m:['事業用操縦士＋計器飛行（またはMPL）','航空会社で副操縦士','機長（定期運送用操縦士）'],h:'経験と審査を重ねて、副操縦士から機長まで10年前後かかることが多い'},
  ko:{t:'조종사가 되는 네 가지 입구',e:['항공사 자체 양성','대학·나라 항공학교','자비 훈련 기관','군(공군 등)'],m:['사업용 조종사+계기비행(또는 MPL)','항공사 부기장','기장(운송용 조종사)'],h:'경험과 심사를 거듭해 부기장에서 기장까지 10년 안팎 걸리는 경우가 많다'},
  en:{t:'Four entry routes to becoming a pilot',e:['Airline cadet programme','University or national flight school','Self-funded flight school','Military (air force and others)'],m:['Commercial licence + instrument rating (or MPL)','First officer at an airline','Captain (airline transport pilot licence)'],h:'With experience and checks, it often takes around ten years from first officer to captain'}},l);
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
 var W=pick({ja:{t:'ライセンスと飛行時間の目安（ICAOの最低の基準）',r:[['自家用（PPL）',40,'40時間〜'],['事業用（CPL）',200,'200時間〜（決まった訓練課程なら150時間〜）'],['准定期運送用（MPL）',240,'240時間〜の訓練（シミュレーターが多い）'],['定期運送用（ATPL）',1500,'1,500時間〜']],n:'実際の時間・年齢は国の規則で決まり、航空会社の採用の条件はさらに高いことが多い'},
  ko:{t:'면허와 비행시간 기준(ICAO 최저 기준)',r:[['자가용(PPL)',40,'40시간~'],['사업용(CPL)',200,'200시간~(정해진 훈련 과정이면 150시간~)'],['부조종사(MPL)',240,'240시간~의 훈련(시뮬레이터가 많다)'],['운송용(ATPL)',1500,'1,500시간~']],n:'실제 시간·나이는 나라 규정으로 정해지며, 항공사 채용 조건은 더 높은 경우가 많다'},
  en:{t:'Licences and flight hours (ICAO minimums)',r:[['Private (PPL)',40,'From 40 hours'],['Commercial (CPL)',200,'From 200 hours (150 on an approved integrated course)'],['Multi-crew (MPL)',240,'From 240 hours of training (much of it in simulators)'],['Airline transport (ATPL)',1500,'From 1,500 hours']],n:'Actual hours and ages are set by national rules, and airline hiring requirements are often higher'}},l);
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
 ja:{t:'整備士になる道（4つの地域）',lanes:[{n:'韓国',s:['教育機関（大学・専門の学校）または実務の経験','航空整備士の資格（18歳〜）','航空会社・整備会社に入社','機種ごとの訓練','確認の権限']},{n:'日本',s:['国の指定の養成施設、または実務の経験','二等・一等航空整備士など（年齢・経験の条件）','航空会社・整備会社に入社','型式の限定を取る','確認主任者']},{n:'米国',s:['FAAが認めた整備学校、または実務18〜30か月','A&P（機体・発動機）の試験（18歳〜）','整備会社・航空会社','型式の訓練','検査の権限（IAなど）']},{n:'欧州',s:['Part-147の学校、または実務','Part-66のライセンス（B1・B2など）','整備組織（Part-145）で勤務','型式の資格を加える','整備の完了を証明する権限']}],note:'資格の種類・名前は国によって違います。正確な条件は各国の航空当局の資料で確かめてください。'},
 ko:{t:'정비사가 되는 길(네 지역)',lanes:[{n:'한국',s:['교육기관(대학·전문학교) 또는 실무 경력','항공정비사 자격증명(18세~)','항공사·정비회사 입사','기종별 훈련','확인 권한']},{n:'일본',s:['나라 지정 양성시설 또는 실무 경력','이등·일등 항공정비사 등(나이·경력 조건)','항공사·정비회사 입사','형식 한정 취득','확인 주임자']},{n:'미국',s:['FAA 인정 정비학교 또는 실무 18~30개월','A&P(기체·발동기) 시험(18세~)','정비회사·항공사','형식 훈련','검사 권한(IA 등)']},{n:'유럽',s:['Part-147 학교 또는 실무','Part-66 면허(B1·B2 등)','정비조직(Part-145) 근무','형식 자격 추가','정비 완료 증명 권한']}],note:'자격의 종류·이름은 나라마다 다릅니다. 정확한 조건은 각국 항공 당국 자료로 확인하세요.'},
 en:{t:'Routes to becoming a maintenance engineer (four regions)',lanes:[{n:'Korea',s:['Training institution (university, college) or practical experience','Aircraft maintenance engineer licence (18+)','Join an airline or MRO','Type training','Certifying authority']},{n:'Japan',s:['Designated training school or practical experience','Second- or first-class engineer licence (age and experience conditions)','Join an airline or MRO','Add type ratings','Certifying staff']},{n:'USA',s:['FAA-approved school (Part 147) or 18–30 months of experience','A&P (airframe and powerplant) tests (18+)','MRO or airline','Type training','Inspection authority (IA and others)']},{n:'Europe',s:['Part-147 school or practical experience','Part-66 licence (B1, B2 and others)','Work at a Part-145 organisation','Add type ratings','Authority to issue certificates of release']}],note:'Licence types and names differ by country. Check each aviation authority for exact conditions.'}},l))},

/* 7 客室乗務員：国の証明がある地域と、会社の訓練だけの地域 */
car_cabin:function(l){return LANES(pick({
 ja:{t:'客室乗務員になる道（4つの地域）',lanes:[{n:'韓国',s:['航空会社の採用（書類・面接・英語・水泳などは会社ごと）','会社の初期の訓練（安全・救急・サービス）','国の基準にそった審査','乗務']},{n:'日本',s:['航空会社の採用（正社員・契約など会社ごと）','会社の初期の訓練','社内の審査','乗務']},{n:'米国',s:['航空会社の採用','会社の訓練','FAAの客室乗務員の証明','乗務']},{n:'欧州',s:['航空会社の採用（18歳〜）','初期の安全訓練','客室乗務員の証明書（CCA）','乗務']}],note:'韓国と日本には客室乗務員の国の免許はありませんが、国の規則にそった訓練と審査が必要です。'},
 ko:{t:'객실승무원이 되는 길(네 지역)',lanes:[{n:'한국',s:['항공사 채용(서류·면접·영어·수영 등은 회사마다)','회사 초기 훈련(안전·응급·서비스)','나라 기준에 따른 심사','탑승 근무']},{n:'일본',s:['항공사 채용(정규직·계약직 등 회사마다)','회사 초기 훈련','회사 심사','탑승 근무']},{n:'미국',s:['항공사 채용','회사 훈련','FAA 객실승무원 증명','탑승 근무']},{n:'유럽',s:['항공사 채용(18세~)','초기 안전 훈련','객실승무원 증명서(CCA)','탑승 근무']}],note:'한국과 일본에는 객실승무원 나라 면허는 없지만, 나라 규정에 따른 훈련과 심사가 필요합니다.'},
 en:{t:'Routes to becoming cabin crew (four regions)',lanes:[{n:'Korea',s:['Airline recruitment (documents, interviews, English, swimming and more vary by airline)','Initial company training (safety, first aid, service)','Checks under national standards','Fly']},{n:'Japan',s:['Airline recruitment (permanent or contract, by airline)','Initial company training','Company checks','Fly']},{n:'USA',s:['Airline recruitment','Company training','FAA flight attendant certificate','Fly']},{n:'Europe',s:['Airline recruitment (18+)','Initial safety training','Cabin crew attestation (CCA)','Fly']}],note:'Korea and Japan have no national cabin crew licence, but training and checks under national rules are required.'}},l))}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
