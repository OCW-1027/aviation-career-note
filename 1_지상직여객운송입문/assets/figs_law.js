/* 航空法規（Part 1 補強）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,planeS=H.planeS,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function BADGE(x,y,n,sz){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
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
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
