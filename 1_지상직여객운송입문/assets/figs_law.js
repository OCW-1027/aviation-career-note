/* 航空法規（Part 1 補強）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,planeS=H.planeS,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function BADGE(x,y,n,sz){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
function ROWS(rows,y,w,sz,hl,dur){var g='',n=rows.length;rows.forEach(function(r,i){var t=r[0],laws=r[1].split('|'),nn=LI(t,sz,w-230).length,nl=laws.length,lh=FS(sz)*1.3,h=Math.max(nn,nl)*lh+14;
 g+='<g>'+R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+(hl?'<rect x="20" y="'+y+'" width="'+w+'" height="'+h+'" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.55)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>':'')+BADGE(42,y+h/2,i+1,sz)+WR(64,y+h/2+FS(sz)*0.3,t,sz,D,800,w-230,'start')+laws.map(function(s2,j){return tx(20+w-12,y+h/2-(nl-1)*lh/2+j*lh+FS(sz-0.5)*0.35,s2,sz-0.5,'#1d4d8a',800,'end')}).join('')+'</g>';y+=h+4});return {s:g,y:y}}
var F={
/* 1 機長の権限が及ぶとき：出発前の確認 → ドアが閉まってから開くまで → 危難のとき → 事故の報告 */
law_pic:function(l){
 var W=({ja:{t:'機長の権限と義務（時間の流れで）',door:'すべての乗降口が閉じてから、開くまで',rows:[['出発前の確認：航行に支障がなく、運航の準備が整ったことを確かめる','日：第73条の2'],['乗り組む者を指揮監督する','韓：第62条①|日：第73条'],['機内の安全を害する行為を止め、必要なら拘束・降機させる','日：第73条の4|韓：航空保安法'],['危難のとき：旅客に避難の方法などを命じる。旅客を助け、最後に機を離れる','韓：第62条③④|日：第74条'],['事故・準事故などを国に報告する（できなければ使用者）','韓：第62条⑤|日：第76条']]},
  ko:{t:'기장의 권한과 의무(시간 순서로)',door:'모든 출입문이 닫힌 때부터 열릴 때까지',rows:[['출발 전 확인: 비행에 지장이 없고 운항 준비가 갖춰졌는지 확인','일: 제73조의2'],['승무원을 지휘·감독한다','한: 제62조①|일: 제73조'],['기내 안전을 해치는 행위를 막고 필요하면 구속·하기시킨다','일: 제73조의4|한: 항공보안법'],['위난 때: 여객에게 피난 방법 등을 명한다. 여객을 구조하고 마지막에 떠난다','한: 제62조③④|일: 제74조'],['사고·준사고 등을 국가에 보고(못 하면 소유자 등)','한: 제62조⑤|일: 제76조']]},
  en:{t:'The captain’s authority and duties, in order',door:'From when all doors close until one opens',rows:[['Pre-departure check: the aircraft is fit to fly and preparations are complete','JP: Art. 73-2'],['Directs and supervises those on board','KR: Art. 62(1)|JP: Art. 73'],['Stops acts that endanger safety, restraining or disembarking offenders if needed','JP: Art. 73-4|KR: Aviation Security Act'],['In danger: orders passengers on evacuation, rescues them and leaves the aircraft last','KR: Art. 62(3)(4)|JP: Art. 74'],['Reports accidents and serious incidents to the state (the operator if the captain cannot)','KR: Art. 62(5)|JP: Art. 76']]}})[l];
 if(!W)return F.law_pic('ja');
 setK(1);var dur=12;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,130,'#DCEEFB',14)+R(20,162,600,24,'#9CC98B',0);
 var path='M50 156 L200 156 L260 110 L400 90 L500 130 L590 156';
 s+='<path d="'+path+'" fill="none" stroke="#9FB0C2" stroke-width="2" stroke-dasharray="6 5"/><g>'+planeS('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" rotate="auto" keyPoints="0;0;.25;.9;1" keyTimes="0;.2;.35;.9;1" calcMode="linear" path="'+path+'"/></g>';
 s+='<line x1="110" y1="70" x2="110" y2="160" stroke="#E08A2F" stroke-width="2" stroke-dasharray="4 4"/><line x1="560" y1="70" x2="560" y2="160" stroke="#E08A2F" stroke-width="2" stroke-dasharray="4 4"/>'+ARW(118,76,552,76,'#E08A2F',3)+ARW(552,76,118,76,'#E08A2F',3)+LBW(335,98,W.door,10.5,'#8a3b00','middle','#fff',320);
 var T=ROWS(W.rows,198,600,11,true,dur);
 var HH=T.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+T.s+'</svg>'},

/* 2 飲酒の基準：韓国 0.02％、日本 血中0.2g/L（＝0.02％）・呼気0.09mg/L */
law_alc:function(l){
 var W=({ja:{t:'アルコールの基準（韓国と日本）',kr:'韓国（航空安全法 第57条）',jp:'日本（航空法 第70条・航空局長通達）',k1:'血中アルコール濃度 0.02% 以上は業務禁止',j1:'血中 0.2g/L 以上 または 呼気 0.09mg/L 以上は業務禁止',k2:'業務中の飲酒は禁止。国は呼気の測定ができ、従わなければならない',j2:'操縦士・客室乗務員は飛行勤務の前8時間以内の飲酒禁止。乗務前後に検査',same:'0.2g/L ＝ 0.02%。両国とも同じ水準で、運航管理者も対象'},
  ko:{t:'음주 기준(한국과 일본)',kr:'한국(항공안전법 제57조)',jp:'일본(항공법 제70조·항공국장 통달)',k1:'혈중알코올농도 0.02% 이상이면 업무 금지',j1:'혈중 0.2g/L 이상 또는 호기 0.09mg/L 이상이면 업무 금지',k2:'업무 중 음주 금지. 국가는 호흡 측정을 할 수 있고, 따라야 한다',j2:'조종사·객실승무원은 비행근무 전 8시간 안의 음주 금지. 승무 전후 검사',same:'0.2g/L = 0.02%. 두 나라 모두 같은 수준이며 운항관리사도 대상'},
  en:{t:'Alcohol limits (Korea and Japan)',kr:'Korea (Aviation Safety Act Art. 57)',jp:'Japan (Civil Aeronautics Act Art. 70, JCAB notice)',k1:'Duties prohibited at a blood alcohol concentration of 0.02% or more',j1:'Duties prohibited at 0.2 g/L in blood or 0.09 mg/L in breath, or more',k2:'No drinking while on duty; the state may breath-test staff, who must comply',j2:'Pilots and cabin crew may not drink within 8 hours before flight duty; tested before and after duty',same:'0.2 g/L equals 0.02%: the same level in both countries, and dispatchers are covered too'}})[l];
 if(!W)return F.law_alc('ja');
 setK(1);var nar=NARROW();
 function card(x0,y0,w,title,a,b,col){var lh=FS(11.5)*1.3,na=LI(a,12,w-30).length,nb=LI(b,11,w-30).length,h=FS(13)*1.6+na*FS(12)*1.3+nb*lh+44;
  var g=R(x0,y0,w,h,'#fff',14,' stroke="'+col+'" stroke-width="2.5"')+tx(x0+w/2,y0+FS(13)*1.2,title,13,col,900);
  var y=y0+FS(13)*1.6+10;g+=R(x0+12,y,w-24,na*FS(12)*1.3+12,col,10)+WR(x0+w/2,y+6+na*FS(12)*1.3/2+FS(12)*0.3,a,12,'#fff',900,w-30);y+=na*FS(12)*1.3+22;
  g+=WR(x0+w/2,y+nb*lh/2+FS(11)*0.3,b,11,D,800,w-30);return {s:g,h:h}}
 var s=TTL(320,30,W.t,15,'#0f3558',600),c1,c2,y;
 if(nar){c1=card(20,58,600,W.kr,W.k1,W.k2,'#2F6FD6');c2=card(20,58+c1.h+12,600,W.jp,W.j1,W.j2,'#D64545');y=58+c1.h+12+c2.h+14}
 else{c1=card(20,58,290,W.kr,W.k1,W.k2,'#2F6FD6');c2=card(330,58,290,W.jp,W.j1,W.j2,'#D64545');y=58+Math.max(c1.h,c2.h)+14}
 s+=c1.s+c2.s;
 /* 検査器の表示：OK（0.000）と NG（0.025%）を交互に */
 var fz=FS(16).toFixed(1),cy=y+34;
 s+='<g transform="translate(320 '+cy+')"><rect x="-80" y="-28" width="160" height="56" rx="10" fill="#243447"/><rect x="-68" y="-18" width="136" height="30" rx="4" fill="#0E2238"/>'
  +'<g><text x="0" y="6" font-size="'+fz+'" font-weight="900" fill="#39D98A" text-anchor="middle" font-family="Arial,sans-serif">0.000</text><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.5;.51;.99;1" dur="6s" repeatCount="indefinite"/></g>'
  +'<g opacity="0"><text x="0" y="6" font-size="'+fz+'" font-weight="900" fill="#FF4D4D" text-anchor="middle" font-family="Arial,sans-serif">0.025%</text><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.51;.99;1" dur="6s" repeatCount="indefinite"/></g></g>';
 s+='<g>'+LB(200,cy+6,'OK',12,'#fff','middle','#1F7A6E')+'<animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.5;.51;.99;1" dur="6s" repeatCount="indefinite"/></g><g opacity="0">'+LB(440,cy+6,'NG',12,'#fff','middle','#D64545')+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.51;.99;1" dur="6s" repeatCount="indefinite"/></g>';
 y+=80;var n=LI(W.same,11.5,580).length;s+=R(20,y,600,n*FS(11.5)*1.3+16,'#FFF1E3',10)+WR(320,y+8+n*FS(11.5)*1.3/2+FS(11.5)*0.3,W.same,11.5,'#8a3b00',900,580);y+=n*FS(11.5)*1.3+28;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 3 最低の飛行高度（有視界飛行）：密集地は水平600m内の最も高い障害物から300m、その他は150m */
law_minalt:function(l){
 var W=({ja:{t:'最低の飛行高度（有視界飛行の場合）',city:'人や建物が密集した地域',open:'その他の地域',r600:'水平600mの範囲',h300:'最も高い障害物から300m（1,000ft）',h150:'地面・水面・物件から150m（500ft）',ifr:'計器飛行：半径8km以内の最も高い障害物から300m（山岳地域は600m）',law:'韓：航空安全法 第68条・施行規則 第199条　日：航空法 第81条・施行規則 第174条'},
  ko:{t:'최저비행고도(시계비행의 경우)',city:'사람·건축물이 밀집된 지역',open:'그 밖의 지역',r600:'수평거리 600m 범위',h300:'가장 높은 장애물에서 300m(1,000ft)',h150:'지표면·수면·물건에서 150m(500ft)',ifr:'계기비행: 반지름 8km 안의 가장 높은 장애물에서 300m(산악지역은 600m)',law:'한: 항공안전법 제68조·시행규칙 제199조　일: 항공법 제81조·시행규칙 제174조'},
  en:{t:'Minimum flight altitudes (VFR)',city:'Congested areas',open:'Elsewhere',r600:'Within 600 m horizontally',h300:'300 m (1,000 ft) above the highest obstacle',h150:'150 m (500 ft) above ground, water or objects',ifr:'IFR: 300 m above the highest obstacle within 8 km (600 m in mountainous areas)',law:'KR: Aviation Safety Act Art. 68, Enforcement Rule Art. 199   JP: Civil Aeronautics Act Art. 81, Enforcement Rule Art. 174'}})[l];
 if(!W)return F.law_minalt('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,240,'#DCEEFB',14)+R(20,266,600,30,'#9CC98B',0);
 var bl=[[60,40],[90,70],[120,55],[150,95],[180,60],[210,80],[240,50],[270,45]];bl.forEach(function(b){s+=R(b[0],266-b[1],24,b[1],'#8C9BAA',2)});
 s+='<line x1="30" y1="'+(266-95)+'" x2="300" y2="'+(266-95)+'" stroke="#6B4FA0" stroke-dasharray="4 4"/><line x1="40" y1="'+(266-95-60)+'" x2="300" y2="'+(266-95-60)+'" stroke="#D64545" stroke-width="3"/>'+ARW(60,266-95,60,266-95-60,'#D64545',3)+LBW(175,266-95-26,W.h300,10.5,'#D64545','middle','#fff',220);
 s+='<line x1="40" y1="280" x2="290" y2="280" stroke="#40566B"/>'+LB(165,280,W.r600,10,'#40566B','middle','#fff');
 s+='<line x1="330" y1="216" x2="600" y2="216" stroke="#1F7A6E" stroke-width="3"/>'+ARW(470,266,470,216,'#1F7A6E',3)+LBW(470,204,W.h150,10.5,'#1F7A6E','middle','#fff',250);
 s+='<path d="M330 266 Q400 254 470 262 T600 262 L600 266 Z" fill="#7CB36A"/>';
 s+=LB(165,76,W.city,11,'#fff','middle','#243447')+LB(465,76,W.open,11,'#fff','middle','#243447');
 s+='<g>'+planeS('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" path="M40 '+(266-165)+' L300 '+(266-165)+' C320 '+(266-165)+' 330 206 360 206 L610 206"/></g>';
 var y=308,items=[[W.ifr,'#1d4d8a','#E3F1FB'],[W.law,G,'#F4F7FB']];
 items.forEach(function(v){var n=LI(v[0],11,560).length,lh=FS(11)*1.3,h=n*lh+14;s+=R(20,y,600,h,v[2],10)+WR(320,y+7+n*lh/2+FS(11)*0.3,v[0],11,v[1],900,560);y+=h+6});
 var HH=y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+'</svg>'},

/* 4 義務報告と自発報告 */
law_report:function(l){
 var W=({ja:{t:'安全の報告：義務と自発',duty:'義務の報告',vol:'自発の報告',d1:'事故・重大インシデント（準事故）・義務報告の対象となる安全障害',d2:'韓：航空安全法 第59条・第62条⑤　日：航空法 第76条・第76条の2',v1:'義務報告の対象でない安全障害、ヒヤリとした事例、危険の芽',v2:'韓：第61条（発生から10日以内の報告は、故意・重大な過失でなければ処分しない）　日：VOICES（第三者が運営し、匿名化）',goal:'目的は罰することではなく、同じことをくり返さないこと（安全管理システム）'},
  ko:{t:'안전 보고: 의무와 자율',duty:'의무보고',vol:'자율보고',d1:'항공기사고·준사고·의무보고 대상 항공안전장애',d2:'한: 항공안전법 제59조·제62조⑤　일: 항공법 제76조·제76조의2',v1:'의무보고 대상이 아닌 항공안전장애, 아찔했던 사례, 위해요인',v2:'한: 제61조(발생일부터 10일 안에 보고하면 고의·중과실이 아닌 한 처분하지 않음)　일: VOICES(제3자가 운영하고 비식별화)',goal:'목적은 벌하는 것이 아니라 같은 일을 되풀이하지 않는 것(안전관리시스템)'},
  en:{t:'Safety reporting: mandatory and voluntary',duty:'Mandatory reports',vol:'Voluntary reports',d1:'Accidents, serious incidents and reportable safety occurrences',d2:'KR: Aviation Safety Act Arts. 59 and 62(5)   JP: Civil Aeronautics Act Arts. 76 and 76-2',v1:'Non-mandatory occurrences, near misses and hazards',v2:'KR: Art. 61 (no penalty for reports within 10 days unless intentional or grossly negligent)   JP: VOICES (run by a third party, de-identified)',goal:'The aim is not to punish but to stop the same thing happening again (safety management system)'}})[l];
 if(!W)return F.law_report('ja');
 setK(1);var nar=NARROW();
 function col(x0,y0,w,title,a,b,c,bg){var n1=LI(a,11.5,w-30).length,n2=LI(b,10.5,w-30).length,h=FS(13)*1.7+n1*FS(11.5)*1.3+n2*FS(10.5)*1.3+40;
  var g=R(x0,y0,w,h,bg,14,' stroke="'+c+'" stroke-width="2.5"')+tx(x0+w/2,y0+FS(13)*1.25,title,13,c,900),y=y0+FS(13)*1.7+8;
  g+=WR(x0+w/2,y+n1*FS(11.5)*1.3/2+FS(11.5)*0.3,a,11.5,D,900,w-30);y+=n1*FS(11.5)*1.3+14;g+=WR(x0+w/2,y+n2*FS(10.5)*1.3/2+FS(10.5)*0.3,b,10.5,'#40566B',800,w-30);return {s:g,h:h}}
 var s=TTL(320,30,W.t,15,'#0f3558',600),c1,c2,y;
 if(nar){c1=col(20,58,600,W.duty,W.d1,W.d2,'#D64545','#FDEAE3');c2=col(20,58+c1.h+34,600,W.vol,W.v1,W.v2,'#1F7A6E','#E8F5F2');s+=c1.s+c2.s;y=58+c1.h+34+c2.h}
 else{c1=col(20,58,290,W.duty,W.d1,W.d2,'#D64545','#FDEAE3');c2=col(330,58,290,W.vol,W.v1,W.v2,'#1F7A6E','#E8F5F2');s+=c1.s+c2.s;y=58+Math.max(c1.h,c2.h)}
 /* 報告が集まって分析される流れ */
 y+=16;s+='<g transform="translate(320 '+(y+34)+')"><circle r="30" fill="#2F6FD6"/><path d="M-12 -6 h24 M-12 2 h24 M-12 10 h16" stroke="#fff" stroke-width="3"/></g>';
 for(var i=0;i<5;i++){var sx=60+i*130;s+='<circle r="6" fill="#FFD23F" stroke="#0f3558"><animateMotion dur="3s" begin="-'+(i*0.6)+'s" repeatCount="indefinite" path="M'+sx+' '+(y+4)+' L320 '+(y+34)+'"/></circle>'}
 y+=76;var n=LI(W.goal,11.5,580).length;s+=R(20,y,600,n*FS(11.5)*1.3+16,'#FFF1E3',10)+WR(320,y+8+n*FS(11.5)*1.3/2+FS(11.5)*0.3,W.goal,11.5,'#8a3b00',900,580);y+=n*FS(11.5)*1.3+28;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},
/* 5 航空会社が運航を始めるまで */
law_aoc:function(l){
 var W=({ja:{t:'航空会社が運航を始めるまで',steps:[['事業の免許・許可','韓：航空事業法 第7条|日：第100条'],['安全運航体制の検査と運航証明（人・機材・施設・運航管理・整備）','韓：航空安全法 第90条|日：第102条（施設の検査）'],['運航規程・整備規程の認可','韓：第93条|日：第104条'],['安全管理システム（安全管理規程・安全統括管理者）','韓：第58条②|日：第103条の2（届出）'],['運航開始（その後も体制を保ち、変更は検査を受ける）','韓：第90条⑤|日：第134条（立入検査）']]},
  ko:{t:'항공사가 운항을 시작하기까지',steps:[['사업 면허·허가','한: 항공사업법 제7조|일: 제100조'],['안전운항체계 검사와 운항증명(인력·장비·시설·운항관리·정비)','한: 항공안전법 제90조|일: 제102조(시설 검사)'],['운항규정·정비규정 인가','한: 제93조|일: 제104조'],['안전관리시스템(안전관리규정·안전총괄관리자)','한: 제58조②|일: 제103조의2(신고)'],['운항 시작(그 뒤에도 체계를 유지하고, 바뀌면 검사)','한: 제90조⑤|일: 제134조(출입 검사)']]},
  en:{t:'What an airline needs before it can fly',steps:[['Business licence or permit','KR: Aviation Business Act Art. 7|JP: Art. 100'],['Inspection of the safety system and the air operator certificate (people, aircraft, facilities, dispatch, maintenance)','KR: Aviation Safety Act Art. 90|JP: Art. 102 (facility inspection)'],['Approval of the operations and maintenance manuals','KR: Art. 93|JP: Art. 104'],['Safety management system (safety management rules, accountable manager)','KR: Art. 58(2)|JP: Art. 103-2 (notification)'],['Start of operations (the system must be kept up and changes inspected)','KR: Art. 90(5)|JP: Art. 134 (on-site inspection)']]}})[l];
 if(!W)return F.law_aoc('ja');
 setK(1);var dur=12,n=W.steps.length;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,110,'#DCEEFB',14)+R(20,142,600,24,'#9CC98B',0)+R(40,138,560,8,'#5B6770',3);
 for(var i=0;i<n;i++){var x=70+i*125;s+='<circle cx="'+x+'" cy="92" r="16" fill="#fff" stroke="#9FB0C2" stroke-width="3"/><circle cx="'+x+'" cy="92" r="16" fill="#1F7A6E" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(i/n).toFixed(3)+';'+(i/n+0.01).toFixed(3)+';1" dur="'+dur+'s" repeatCount="indefinite"/></circle>'+tx(x,92+FS(11)*0.35,String(i+1),11,'#243447',900);if(i<n-1)s+='<line x1="'+(x+18)+'" y1="92" x2="'+(x+107)+'" y2="92" stroke="#9FB0C2" stroke-width="3"/>'}
 s+='<g>'+planeS('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" rotate="auto" keyPoints="0;0;.4;1" keyTimes="0;.8;.9;1" calcMode="linear" path="M60 132 L400 132 L600 70"/></g>';
 var y=178,lh=FS(11)*1.3;
 W.steps.forEach(function(r,i){var t=r[0],law=r[1].split('|').join('　'),nn=LI(t,11,520).length,nl=LI(law,10.5,520).length,ll=FS(10.5)*1.3,h=nn*lh+nl*ll+18;
  s+='<g>'+R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="20" y="'+y+'" width="600" height="'+h+'" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.5)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+BADGE(42,y+h/2,i+1,11)+WR(64,y+7+nn*lh/2+FS(11)*0.3,t,11,D,800,520,'start')+WR(64,y+10+nn*lh+nl*ll/2+FS(10.5)*0.3,law,10.5,'#1d4d8a',800,520,'start')+'</g>';y+=h+4});
 var HH=y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+'</svg>'},

/* 6 運航証明と運営基準（OpSpecs）：何を、どこで、どう飛べるかを決める */
law_ops:function(l){
 var W=({ja:{t:'運航証明と運営基準（OpSpecs）',cert:'運航証明書',ops:'運営基準（付属）',items:['使える空港・路線','使う機種・登録記号','EDTO（双発機の長距離洋上飛行）','RVSM・PBN（RNAV／RNP）','CAT II／III の進入','危険物の輸送'],note:'運営基準にない運航はできない。範囲を変えるときは当局の変更の手続きが必要（韓国：航空安全法 第90条②④）'},
  ko:{t:'운항증명과 운영기준(OpSpecs)',cert:'운항증명서',ops:'운영기준(부속)',items:['쓸 수 있는 공항·노선','쓰는 기종·등록기호','EDTO(쌍발기 장거리 해상 비행)','RVSM·PBN(RNAV/RNP)','CAT II/III 접근','위험물 운송'],note:'운영기준에 없는 운항은 할 수 없다. 범위를 바꾸려면 당국의 변경 절차가 필요(한국: 항공안전법 제90조②④)'},
  en:{t:'The air operator certificate and operations specifications (OpSpecs)',cert:'Air operator certificate',ops:'Operations specifications (attached)',items:['Approved airports and routes','Aircraft types and registrations','EDTO (long overwater twin-engine flights)','RVSM and PBN (RNAV/RNP)','CAT II/III approaches','Dangerous goods'],note:'Operations outside the OpSpecs are not allowed; changing their scope needs the authority’s amendment process (Korea: Aviation Safety Act Art. 90(2)(4))'}})[l];
 if(!W)return F.law_ops('ja');
 setK(1);var dur=9,n=W.items.length,nar=NARROW();
 var s=TTL(320,30,W.t,15,'#0f3558',600);
 s+=R(40,62,170,220,'#FFF8E6',10,' stroke="#C9A227" stroke-width="3"')+'<circle cx="125" cy="130" r="30" fill="#C9A227" opacity=".85"/><path d="M110 130 l10 10 l20 -22" fill="none" stroke="#fff" stroke-width="5"/>'+WR(125,200,W.cert,12,'#8a6d00',900,150)+'<line x1="60" y1="240" x2="190" y2="240" stroke="#C9A227" stroke-width="2"/><line x1="60" y1="256" x2="170" y2="256" stroke="#C9A227" stroke-width="2"/>';
 s+=ARW(214,170,246,170,'#9FB0C2',4);
 var x0=250,w=370,y=62,lh=FS(11)*1.3;s+=R(x0,y,w,FS(12)*1.7,'#243447',8)+tx(x0+w/2,y+FS(12)*1.2,W.ops,12,'#fff',900);y+=FS(12)*1.7+4;
 W.items.forEach(function(t,i){var nn=LI(t,11,w-60).length,h=nn*lh+12;s+='<g>'+R(x0,y,w,h,'#fff',8,' stroke="#D9E3EC"')+'<g opacity="0"><circle cx="'+(x0+20)+'" cy="'+(y+h/2)+'" r="9" fill="#1F7A6E"/><path d="M'+(x0+15)+' '+(y+h/2)+' l4 4 l7 -8" fill="none" stroke="#fff" stroke-width="2.5"/><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(i/n*0.8).toFixed(3)+';'+(i/n*0.8+0.02).toFixed(3)+';1" dur="'+dur+'s" repeatCount="indefinite"/></g>'+WR(x0+38,y+h/2+FS(11)*0.3,t,11,D,800,w-60,'start')+'</g>';y+=h+4});
 y=Math.max(y,290)+10;var n2=LI(W.note,11,580).length;s+=R(20,y,600,n2*FS(11)*1.3+16,'#FFF1E3',10)+WR(320,y+8+n2*FS(11)*1.3/2+FS(11)*0.3,W.note,11,'#8a3b00',900,580);y+=n2*FS(11)*1.3+28;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 7 安全管理システム（SMS）の4つの柱と、リスクの評価 */
law_sms:function(l){
 var W=({ja:{t:'安全管理システム（SMS）',p:['安全の方針と目標','リスクの管理','安全の保証','安全の推進'],pd:['経営の約束・責任者','危険の芽を見つけて評価し、対策する','指標で監視・内部監査','教育・情報の共有'],x:'起きやすさ',y:'重大さ',m:'対策（手順・訓練・装備）',note:'ICAO Annex 19 の考え方。航空会社は国の承認・届出を受けたSMSを持つ（韓：航空安全法 第58条②／日：航空法 第103条の2）'},
  ko:{t:'안전관리시스템(SMS)',p:['안전 정책과 목표','위험관리','안전 보증','안전 증진'],pd:['경영의 약속·책임자','위해요인을 찾아 평가하고 대책을 세운다','지표로 감시·내부 감사','교육·정보 공유'],x:'발생 가능성',y:'심각도',m:'대책(절차·훈련·장비)',note:'ICAO Annex 19의 생각. 항공사는 국가의 승인·신고를 거친 SMS를 갖춘다(한: 항공안전법 제58조②/일: 항공법 제103조의2)'},
  en:{t:'Safety management system (SMS)',p:['Safety policy and objectives','Safety risk management','Safety assurance','Safety promotion'],pd:['Management commitment, accountable manager','Find hazards, assess and mitigate risks','Monitor indicators, internal audits','Training and communication'],x:'Likelihood',y:'Severity',m:'Mitigation (procedures, training, equipment)',note:'Based on ICAO Annex 19; airlines must have an SMS approved by or notified to the state (KR: Aviation Safety Act Art. 58(2) / JP: Civil Aeronautics Act Art. 103-2)'}})[l];
 if(!W)return F.law_sms('ja');
 setK(1);var nar=NARROW();
 var s=TTL(320,30,W.t,15,'#0f3558',600),cols=['#2F6FD6','#D64545','#1F7A6E','#E08A2F'];
 var pw=nar?290:145,ph=0,y0=60;
 var cards=W.p.map(function(t,i){var n1=LI(t,11.5,pw-20).length,n2=LI(W.pd[i],10.5,pw-20).length;return {t:t,d:W.pd[i],n1:n1,n2:n2,h:n1*FS(11.5)*1.3+n2*FS(10.5)*1.3+30}});
 var mh=Math.max.apply(null,cards.map(function(c){return c.h}));
 cards.forEach(function(c,i){var x=nar?20+(i%2)*310:20+i*152.5,y=nar?y0+Math.floor(i/2)*(mh+8):y0;
  s+=R(x,y,pw,mh,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2.5"')+'<rect x="'+x+'" y="'+y+'" width="'+pw+'" height="8" rx="4" fill="'+cols[i]+'"/>'+WR(x+pw/2,y+16+c.n1*FS(11.5)*1.3/2+FS(11.5)*0.3,c.t,11.5,cols[i],900,pw-20)+WR(x+pw/2,y+22+c.n1*FS(11.5)*1.3+c.n2*FS(10.5)*1.3/2+FS(10.5)*0.3,c.d,10.5,D,800,pw-20)});
 var y=y0+(nar?2*(mh+8):mh+8)+10;
 /* リスクの表 */
 var gx=150,gy=y+10,cs=46,colr=[['#9CC98B','#9CC98B','#F2D233','#F2D233','#FF9B7A'],['#9CC98B','#F2D233','#F2D233','#FF9B7A','#FF9B7A'],['#F2D233','#F2D233','#FF9B7A','#FF9B7A','#D64545'],['#F2D233','#FF9B7A','#FF9B7A','#D64545','#D64545'],['#FF9B7A','#FF9B7A','#D64545','#D64545','#D64545']];
 for(var r=0;r<5;r++)for(var c=0;c<5;c++)s+='<rect x="'+(gx+c*cs)+'" y="'+(gy+(4-r)*cs)+'" width="'+(cs-3)+'" height="'+(cs-3)+'" rx="4" fill="'+colr[r][c]+'" opacity=".8"/>';
 s+=tx(gx+2.5*cs,gy+5*cs+22,W.x+' →',10.5,G,800)+tx(gx-10,gy+2.5*cs,W.y+' ↑',10.5,G,800,'end');
 s+='<circle r="12" fill="#fff" stroke="#0f3558" stroke-width="3"><animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;.3;.7;1" calcMode="linear" path="M'+(gx+3.5*cs)+' '+(gy+0.5*cs)+' L'+(gx+1.5*cs)+' '+(gy+2.5*cs)+'"/></circle>';
 s+=LBW(gx+5*cs+100,gy+1.5*cs,W.m,10.5,'#1F7A6E','middle','#fff',180)+ARW(gx+5*cs+20,gy+1.5*cs+20,gx+5*cs+4,gy+2*cs,'#1F7A6E',3);
 y=gy+5*cs+36;var n2=LI(W.note,10.5,580).length;s+=WR(320,y+n2*FS(10.5)*1.3/2+FS(10.5)*0.3,W.note,10.5,G,800,580);y+=n2*FS(10.5)*1.3+14;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 8 航空保安：保安検査 → 搭乗 → 機内（機長等の権限・乗客の協力義務・拘束したままの離陸の禁止） */
law_sec:function(l){
 var W=({ja:{t:'航空保安 ― 地上から機内まで',st:['保安検査（旅客・手荷物）','搭乗','機内：機長等の権限'],items:['機長や機長から権限を受けた乗務員は、保安を害する行為・人命や財産に危害を与える行為・機内の秩序を乱す行為を止めるための措置をとれる（韓：航空保安法 第22条①）','機内にいる人は、機長等から求められたら協力しなければならない（同②）','拘束した人を乗せたまま離陸してはならない（本人の同意などの例外を除く、同③）','日本：航空法 第73条の4（機長の措置）、第9章（危害行為の防止・保安検査）'],sq:'不法な妨害 → トランスポンダー 7500'},
  ko:{t:'항공보안 — 지상에서 기내까지',st:['보안검색(여객·수하물)','탑승','기내: 기장 등의 권한'],items:['기장이나 기장에게 권한을 위임받은 승무원은 보안을 해치는 행위·인명이나 재산에 위해를 주는 행위·기내 질서를 어지럽히는 행위를 저지하는 조치를 할 수 있다(한: 항공보안법 제22조①)','기내에 있는 사람은 기장 등이 요청하면 협조해야 한다(같은 조②)','체포한 사람을 태운 채 이륙해서는 안 된다(본인 동의 등 예외 제외, 같은 조③)','일본: 항공법 제73조의4(기장의 조치), 제9장(위해 행위 방지·보안검사)'],sq:'불법 방해 → 트랜스폰더 7500'},
  en:{t:'Aviation security: from the ground to the cabin',st:['Security screening (passengers, bags)','Boarding','On board: authority of the captain and crew'],items:['The captain, or crew delegated by the captain, may act to stop acts that endanger security, threaten life or property, or disturb order on board (KR: Aviation Security Act Art. 22(1))','Everyone on board must cooperate when asked by the captain or crew (Art. 22(2))','A restrained person must not be flown onward after landing, except with their consent or where disembarkation is impossible (Art. 22(3))','Japan: Civil Aeronautics Act Art. 73-4 (captain’s measures) and Chapter 9 (preventing harmful acts, security screening)'],sq:'Unlawful interference → transponder 7500'}})[l];
 if(!W)return F.law_sec('ja');
 setK(1);var dur=9;
 var bh=Math.max(96,FS(11)*1.8+Math.max.apply(null,W.st.map(function(x){return LI(x,10.5,160).length}))*FS(10.5)*1.3+30);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,bh+34,'#EEF5FB',14);
 [[110,'#2F6FD6'],[320,'#1F7A6E'],[530,'#D64545']].forEach(function(p,i){var nl=LI(W.st[i],10.5,160).length,by=72+FS(11)*0.9+6;s+='<g>'+R(p[0]-90,72,180,bh,'#fff',12,' stroke="'+p[1]+'" stroke-width="2.5"')+'<rect x="'+(p[0]-90)+'" y="72" width="180" height="'+bh+'" rx="12" fill="'+p[1]+'" opacity="0"><animate attributeName="opacity" '+SEG(i,3,0,.18)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+BADGE(p[0],by,i+1,11)+WR(p[0],by+FS(11)*0.9+10+nl*FS(10.5)*1.3/2,W.st[i],10.5,p[1],900,160)+'</g>';if(i<2)s+=ARW(p[0]+94,72+bh/2,p[0]+116,72+bh/2,'#9FB0C2',4)});
 s+='<circle r="8" fill="#FFD23F" stroke="#0f3558"><animateMotion dur="'+dur+'s" repeatCount="indefinite" path="M60 '+(72+bh+10)+' L580 '+(72+bh+10)+'"/></circle>';
 var L=LIST(W.items,56+bh+46,600,10.5),y=L.y+6;
 s+=L.s+LB(320,y+14,W.sq,11,'#fff','middle','#D64545');y+=34;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
