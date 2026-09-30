/* 航空機（Part 14）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算）
   飛行機の絵：plane（上から）・planeS（横から）、正面の絵は FRONT をこのファイルで描く */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,plane=H.plane,planeS=H.planeS,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function BADGE(x,y,n,sz){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="#FFD23F" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
/* 正面から見た旅客機（胴体・上反角のある主翼・翼の下のエンジン・垂直尾翼）。幅約80 */
function FRONT(){var st=' stroke="#1d2b3a" stroke-width="1.4" stroke-linejoin="round"';
 return '<path d="M-6 -14 L-3 -30 L3 -30 L6 -14 Z" fill="#fff"'+st+'/><path d="M-40 -2 L-6 -6 L6 -6 L40 -2 L40 1 L6 2 L-6 2 L-40 1 Z" fill="#fff"'+st+'/><path d="M-26 -6 L-29 -6 L-29 1 L-26 1 Z M26 -6 L29 -6 L29 1 L26 1 Z" fill="#fff"'+st+'/><circle cx="-18" cy="5" r="4.5" fill="#DCE3EA"'+st+'/><circle cx="18" cy="5" r="4.5" fill="#DCE3EA"'+st+'/><circle cx="-18" cy="5" r="1.8" fill="#243447"/><circle cx="18" cy="5" r="1.8" fill="#243447"/><circle cx="0" cy="-4" r="8.5" fill="#fff"'+st+'/><path d="M-4 -8 L4 -8 L3 -5.5 L-3 -5.5 Z" fill="#243447"/>'}
var F={
/* 1 4つの力：揚力と重さ、推力と抗力がつり合う */
ac_forces:function(l){
 var W=({ja:{t:'飛行機にはたらく4つの力',L:'揚力',Wt:'重さ',T:'推力',Dr:'抗力',eq:'揚力 ＝ ½ × 空気の密度 × 速さ² × 翼の面積 × 揚力係数',n:['水平にまっすぐ飛ぶとき：揚力＝重さ、推力＝抗力','速さが2倍になると、揚力は4倍（速さの2乗）','空気が薄い（高い所・暑い日）と、同じ速さでも揚力は小さい']},
  ko:{t:'비행기에 작용하는 4가지 힘',L:'양력',Wt:'중력(무게)',T:'추력',Dr:'항력',eq:'양력 = ½ × 공기 밀도 × 속도² × 날개 면적 × 양력계수',n:['수평으로 똑바로 날 때: 양력=무게, 추력=항력','속도가 2배가 되면 양력은 4배(속도의 제곱)','공기가 옅으면(높은 곳·더운 날) 같은 속도라도 양력이 작다']},
  en:{t:'The four forces on an aircraft',L:'Lift',Wt:'Weight',T:'Thrust',Dr:'Drag',eq:'Lift = ½ × air density × speed² × wing area × lift coefficient',n:['In straight and level flight: lift = weight and thrust = drag','Double the speed and lift becomes four times greater (speed squared)','In thin air (high altitude, hot days) there is less lift at the same speed']}})[l];
 if(!W)return F.ac_forces('ja');
 setK(1);var cx=320,cy=160;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,220,'#DCEEFB',14);
 s+='<g transform="translate('+cx+' '+cy+') scale(3.2)">'+planeS('#fff')+'</g>';
 function arr(x1,y1,x2,y2,c,lab,lx,ly,a){return '<g>'+ARW(x1,y1,x2,y2,c,6)+'<animate attributeName="opacity" values=".55;1;.55" dur="2.4s" repeatCount="indefinite"/></g>'+LB(lx,ly,lab,12,'#fff',a||'middle',c)}
 s+=arr(cx,cy-20,cx,cy-92,'#1F7A6E',W.L,cx,cy-100)+arr(cx,cy+26,cx,cy+98,'#D64545',W.Wt,cx,cy+116)+arr(cx+72,cy,cx+160,cy,'#2F6FD6',W.T,cx+168,cy+5,'start')+arr(cx-76,cy,cx-164,cy,'#E08A2F',W.Dr,cx-172,cy+5,'end');
 var n=LI(W.eq,12,560).length,lh=FS(12)*1.3,y=288;s+=R(20,y,600,n*lh+16,'#FFF1E3',10)+WR(320,y+8+n*lh/2+FS(12)*0.3,W.eq,12,'#8a3b00',900,560);y+=n*lh+26;
 var L=LIST(W.n,y,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 2 迎え角と失速：迎え角が大きくなると揚力が増えるが、臨界の角度を超えると空気がはがれて揚力が急に減る */
ac_stall:function(l){
 var W=({ja:{t:'迎え角と失速',aoa:'迎え角',ok:'空気が翼に沿って流れる',st:'失速：上面から空気がはがれる',gx:'迎え角',gy:'揚力係数',crit:'臨界迎え角（約15°〜18°）',n:['失速は「速さ」ではなく「迎え角」で起きる。どの速さでも臨界迎え角を超えると失速する','フラップ・スラットを出すと、低い速さでも大きな揚力が得られ、失速速度が下がる','翼に氷や雪が付くと、形がくずれて失速しやすくなる（離陸前の防除雪氷）']},
  ko:{t:'받음각과 실속',aoa:'받음각',ok:'공기가 날개를 따라 흐른다',st:'실속: 윗면에서 공기가 떨어져 나간다',gx:'받음각',gy:'양력계수',crit:'임계 받음각(약 15°~18°)',n:['실속은 ‘속도’가 아니라 ‘받음각’으로 일어난다. 어떤 속도에서도 임계 받음각을 넘으면 실속한다','플랩·슬랫을 내리면 낮은 속도에서도 큰 양력을 얻어 실속 속도가 내려간다','날개에 얼음이나 눈이 붙으면 모양이 망가져 실속하기 쉬워진다(이륙 전 방빙·제빙)']},
  en:{t:'Angle of attack and the stall',aoa:'Angle of attack',ok:'Air flows smoothly along the wing',st:'Stall: the airflow separates from the upper surface',gx:'Angle of attack',gy:'Lift coefficient',crit:'Critical angle (about 15°–18°)',n:['A stall is caused by angle of attack, not speed: exceed the critical angle at any speed and the wing stalls','Flaps and slats give more lift at low speed and lower the stall speed','Ice or snow on the wing spoils its shape and makes a stall more likely (hence de-icing before take-off)']}})[l];
 if(!W)return F.ac_stall('ja');
 setK(1);var nar=NARROW();
 var foil='M-90 0 C-86 -14 -50 -24 0 -22 C40 -20 80 -10 100 0 C60 4 0 8 -60 6 C-80 5 -90 3 -90 0 Z';
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,210,'#EEF5FB',14),cx=200,cy=165;
 var angs=[0,8,14,20],dur=10;
 angs.forEach(function(a,i){var stall=a>=20,g='',wing='<g transform="translate('+cx+' '+cy+') rotate('+a+')"><path d="'+foil+'" fill="#fff" stroke="#1d2b3a" stroke-width="2"/></g>';
  for(var k=0;k<4;k++){var yy=cy-66+k*16;if(!stall||k<2)g+='<path d="M20 '+yy+' C120 '+yy+' '+(cx-40)+' '+(yy-a*1.2)+' '+(cx+110)+' '+(yy+a*1.6)+' L360 '+(yy+a*2.2)+'" fill="none" stroke="#2F6FD6" stroke-width="2" stroke-dasharray="8 6"><animate attributeName="stroke-dashoffset" values="0;-28" dur="1s" repeatCount="indefinite"/></path>';
   else g+='<path d="M20 '+yy+' C100 '+yy+' '+(cx-70)+' '+(yy-6)+' '+(cx-40)+' '+(yy-10)+'" fill="none" stroke="#2F6FD6" stroke-width="2" stroke-dasharray="8 6"><animate attributeName="stroke-dashoffset" values="0;-28" dur="1s" repeatCount="indefinite"/></path>'}
  for(var k=0;k<4;k++)g+='<path d="M20 '+(cy+30+k*16)+' L360 '+(cy+30+k*16+a*1.4)+'" fill="none" stroke="#2F6FD6" stroke-width="2" stroke-dasharray="8 6" opacity=".6"><animate attributeName="stroke-dashoffset" values="0;-28" dur="1s" repeatCount="indefinite"/></path>';
  g+=wing;
  if(stall){for(var e=0;e<3;e++){var vx=cx+14+e*34,vy=cy-26+e*14;g+='<circle cx="'+vx+'" cy="'+vy+'" r="11" fill="none" stroke="#D64545" stroke-width="2.5" stroke-dasharray="20 8"><animateTransform attributeName="transform" type="rotate" values="0 '+vx+' '+vy+';360 '+vx+' '+vy+'" dur="1s" repeatCount="indefinite"/></circle>'}}
  g+=LB(cx,84,W.aoa+' '+a+'°',12,'#fff','middle',stall?'#D64545':'#1F7A6E')+LBW(cx,244,stall?W.st:W.ok,10.5,stall?'#D64545':'#1F7A6E','middle','#fff',320);
  s+='<g opacity="'+(i===0?1:0)+'"><clipPath id="stc'+i+'"><rect x="20" y="56" width="370" height="210"/></clipPath><g clip-path="url(#stc'+i+')">'+g+'</g><animate attributeName="opacity" '+SEG(i,4,0,1)+' dur="'+dur+'s" repeatCount="indefinite"/></g>'});
 /* 揚力係数の曲線 */
 var gx0=410,gy0=240,gw=190,gh=150,X=function(a){return gx0+a/22*gw},Y=function(c){return gy0-c/1.6*gh};
 s+='<line x1="'+gx0+'" y1="'+gy0+'" x2="'+(gx0+gw)+'" y2="'+gy0+'" stroke="#40566B" stroke-width="2"/><line x1="'+gx0+'" y1="'+gy0+'" x2="'+gx0+'" y2="'+(gy0-gh)+'" stroke="#40566B" stroke-width="2"/>';
 s+='<path d="M'+X(0)+' '+Y(0.2)+' L'+X(14)+' '+Y(1.45)+' Q'+X(16)+' '+Y(1.6)+' '+X(17.5)+' '+Y(1.35)+' L'+X(22)+' '+Y(0.8)+'" fill="none" stroke="#1F7A6E" stroke-width="3"/>';
 s+='<line x1="'+X(16)+'" y1="'+gy0+'" x2="'+X(16)+'" y2="'+Y(1.6)+'" stroke="#D64545" stroke-width="2" stroke-dasharray="4 4"/>';
 angs.forEach(function(a,i){var c=a<=14?0.2+a/14*1.25:(a<=17.5?1.5:1.35-(a-17.5)/4.5*0.55);s+='<circle cx="'+X(a)+'" cy="'+Y(c)+'" r="6" fill="#FFD23F" stroke="#0f3558" opacity="0"><animate attributeName="opacity" '+SEG(i,4,0,1)+' dur="'+dur+'s" repeatCount="indefinite"/></circle>'});
 s+=tx(gx0+gw/2,gy0+22,W.gx,10.5,G,800)+tx(gx0+6,gy0-gh-8,W.gy,10.5,G,800,'start');
 var y=278,n=LI(W.crit,11,580).length;s+=WR(320,y+n*FS(11)*1.3/2+FS(11)*0.3,W.crit,11,'#D64545',900,580);y+=n*FS(11)*1.3+12;
 var L=LIST(W.n,y,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 3 旋回と荷重倍数：傾きが大きいほど荷重倍数と失速速度が大きくなる */
ac_bank:function(l){
 var W=({ja:{t:'旋回と荷重倍数',bank:'傾き',n:'荷重倍数',vs:'失速速度',rows:[['0°','1.0','×1.00'],['30°','1.15','×1.07'],['45°','1.41','×1.19'],['60°','2.0','×1.41']],f:'荷重倍数 ＝ 1 ÷ cos（傾き）　失速速度 ∝ √荷重倍数',lim:'輸送用の飛行機の強さの限界（フラップを上げた状態）：＋2.5g〜−1.0g'},
  ko:{t:'선회와 하중배수',bank:'경사',n:'하중배수',vs:'실속 속도',rows:[['0°','1.0','×1.00'],['30°','1.15','×1.07'],['45°','1.41','×1.19'],['60°','2.0','×1.41']],f:'하중배수 = 1 ÷ cos(경사)　실속 속도 ∝ √하중배수',lim:'수송용 비행기의 강도 한계(플랩을 올린 상태): +2.5g~−1.0g'},
  en:{t:'Turns and load factor',bank:'Bank',n:'Load factor',vs:'Stall speed',rows:[['0°','1.0','×1.00'],['30°','1.15','×1.07'],['45°','1.41','×1.19'],['60°','2.0','×1.41']],f:'Load factor = 1 ÷ cos(bank)   stall speed ∝ √load factor',lim:'Strength limits for transport aeroplanes (flaps up): +2.5 g to −1.0 g'}})[l];
 if(!W)return F.ac_bank('ja');
 setK(1);var dur=10,cx=320,cy=150;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,180,'#DCEEFB',14)+'<line x1="60" y1="'+cy+'" x2="580" y2="'+cy+'" stroke="#9FB0C2" stroke-dasharray="6 6"/>';
 s+='<g transform="translate('+cx+' '+cy+')"><g><g transform="scale(2.4)">'+FRONT()+'</g><animateTransform attributeName="transform" type="rotate" values="0;0;-30;-30;-45;-45;-60;-60;0" keyTimes="0;.2;.27;.45;.52;.7;.77;.95;1" dur="'+dur+'s" repeatCount="indefinite"/></g></g>';
 var lh=FS(12)*1.6,y=248,cols=[120,320,520];
 s+=R(20,y,600,lh,'#243447',8)+tx(cols[0],y+lh*0.7,W.bank,11.5,'#fff',900)+tx(cols[1],y+lh*0.7,W.n,11.5,'#fff',900)+tx(cols[2],y+lh*0.7,W.vs,11.5,'#fff',900);y+=lh+6;
 W.rows.forEach(function(r,i){var k0=[0,.27,.52,.77][i],k1=[.2,.45,.7,.95][i];
  s+=R(20,y,600,lh,i%2?'#fff':'#F4F7FB',8)+'<rect x="20" y="'+y+'" width="600" height="'+lh+'" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" values="0;0;.6;.6;0;0" keyTimes="0;'+Math.max(0,k0-0.001).toFixed(3)+';'+k0.toFixed(3)+';'+k1.toFixed(3)+';'+(k1+0.001).toFixed(3)+';1" dur="'+dur+'s" repeatCount="indefinite"/></rect>'+tx(cols[0],y+lh*0.7,r[0],12,D,900)+tx(cols[1],y+lh*0.7,r[1],12,'#1F7A6E',900)+tx(cols[2],y+lh*0.7,r[2],12,'#D64545',900);y+=lh+4});
 var y2=y+10,items=[[W.f,'#8a3b00','#FFF1E3'],[W.lim,D,'#fff']];
 items.forEach(function(v){var n=LI(v[0],11.5,560).length,lh2=FS(11.5)*1.3,h=n*lh2+14;s+=R(20,y2,600,h,v[2],10,v[2]==='#fff'?' stroke="#D9E3EC"':'')+WR(320,y2+7+n*lh2/2+FS(11.5)*0.3,v[0],11.5,v[1],900,560);y2+=h+6});
 var HH=y2+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+'</svg>'},

/* 4 高い所の速さの幅（コフィン・コーナー）：高く上がるほど、低速のバフェットと高速のバフェットの間が狭くなる */
ac_coffin:function(l){
 var W=({ja:{t:'高い所では速さの幅が狭くなる',lo:'低速のバフェット（失速に近い）',hi:'高速のバフェット（マック数の限界）',cc:'コフィン・コーナー',hv:'重いと幅はさらに狭い',x:'速さ',y:'高度',n:['高く上がるほど空気が薄く、失速に近い速さは上がり、マック数の限界の速さは下がる','重い飛行機ほど、上がれる高さ（最適高度・最大高度）が低い','会社は、揺れ（1.3gなど）に耐える余裕を残して上がれる高さを決める']},
  ko:{t:'높은 곳에서는 속도 폭이 좁아진다',lo:'저속 버핏(실속에 가깝다)',hi:'고속 버핏(마하수 한계)',cc:'코핀 코너',hv:'무거우면 폭이 더 좁다',x:'속도',y:'고도',n:['높이 올라갈수록 공기가 옅어져 실속에 가까운 속도는 오르고, 마하수 한계 속도는 내려간다','무거운 비행기일수록 올라갈 수 있는 높이(최적 고도·최대 고도)가 낮다','회사는 흔들림(1.3g 등)을 견딜 여유를 남겨 올라갈 수 있는 높이를 정한다']},
  en:{t:'The speed range narrows at altitude',lo:'Low-speed buffet (near the stall)',hi:'High-speed buffet (Mach limit)',cc:'Coffin corner',hv:'Heavier: narrower still',x:'Speed',y:'Altitude',n:['Higher up, the air is thinner: the near-stall speed rises and the Mach-limit speed falls','The heavier the aircraft, the lower the altitude it can reach (optimum and maximum altitude)','Operators set the usable altitude so that a margin remains for turbulence (e.g. 1.3 g)']}})[l];
 if(!W)return F.ac_coffin('ja');
 setK(1);
 var gx0=90,gy0=270,gw=500,gh=200;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,250,'#EEF5FB',14);
 s+='<line x1="'+gx0+'" y1="'+gy0+'" x2="'+(gx0+gw)+'" y2="'+gy0+'" stroke="#40566B" stroke-width="2"/><line x1="'+gx0+'" y1="'+gy0+'" x2="'+gx0+'" y2="'+(gy0-gh)+'" stroke="#40566B" stroke-width="2"/>'+tx(gx0+gw-10,gy0+22,W.x+' →',10.5,G,800,'end')+tx(gx0-10,gy0-gh-6,W.y+' ↑',10.5,G,800,'start');
 var lo='M'+(gx0+40)+' '+gy0+' C'+(gx0+60)+' '+(gy0-100)+' '+(gx0+140)+' '+(gy0-170)+' '+(gx0+250)+' '+(gy0-190);
 var hi='M'+(gx0+460)+' '+gy0+' C'+(gx0+440)+' '+(gy0-100)+' '+(gx0+360)+' '+(gy0-170)+' '+(gx0+250)+' '+(gy0-190);
 s+='<path d="'+lo+'" fill="none" stroke="#D64545" stroke-width="3"/><path d="'+hi+'" fill="none" stroke="#6B4FA0" stroke-width="3"/>';
 var hlo='M'+(gx0+50)+' '+gy0+' C'+(gx0+75)+' '+(gy0-80)+' '+(gx0+160)+' '+(gy0-140)+' '+(gx0+250)+' '+(gy0-155),hhi='M'+(gx0+450)+' '+gy0+' C'+(gx0+425)+' '+(gy0-80)+' '+(gx0+340)+' '+(gy0-140)+' '+(gx0+250)+' '+(gy0-155);
 s+='<g opacity="0"><path d="'+hlo+'" fill="none" stroke="#D64545" stroke-width="2.5" stroke-dasharray="6 5"/><path d="'+hhi+'" fill="none" stroke="#6B4FA0" stroke-width="2.5" stroke-dasharray="6 5"/>'+LB(gx0+250,gy0-128,W.hv,10.5,'#fff','middle','#40566B')+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.5;.55;1" dur="8s" repeatCount="indefinite"/></g>';
 s+=LB(gx0+250,gy0-204,W.cc,11,'#fff','middle','#243447')+LBW(gx0+95,gy0-40,W.lo,10.5,'#D64545','middle','#fff',150)+LBW(gx0+405,gy0-40,W.hi,10.5,'#6B4FA0','middle','#fff',150);
 s+='<g>'+planeS('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" path="M'+(gx0+250)+' '+(gy0-20)+' L'+(gx0+250)+' '+(gy0-160)+' L'+(gx0+250)+' '+(gy0-160)+'" keyPoints="0;1;1" keyTimes="0;.45;1" calcMode="linear"/></g>';
 var L=LIST(W.n,318,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},
/* 5 離陸の速さ：V1（決心速度）→ VR（機首上げ）→ V2（35ftでの安全速度） */
ac_vspeeds:function(l){
 var W=({ja:{t:'離陸の速さ V1・VR・V2',v1:'V1：これを超えたら止まらずに離陸を続ける',vr:'VR：機首を上げ始める',v2:'V2：エンジン1つが止まっても安全に上昇できる速さ（高さ35ftまでに）',ft:'35ft',n:['V1 ≦ VR ≦ V2 の順。重さ・気温・滑走路の長さと状態で毎回変わる','V1の前に大きな故障が起きたら離陸を中止し、V1の後なら離陸を続けるのが原則']},
  ko:{t:'이륙 속도 V1·VR·V2',v1:'V1: 이 속도를 넘으면 멈추지 않고 이륙을 계속한다',vr:'VR: 기수를 들기 시작한다',v2:'V2: 엔진 하나가 멈춰도 안전하게 상승할 수 있는 속도(높이 35ft까지)',ft:'35ft',n:['V1 ≦ VR ≦ V2 순서. 무게·기온·활주로 길이와 상태에 따라 매번 바뀐다','V1 전에 큰 고장이 나면 이륙을 중단하고, V1 뒤라면 이륙을 계속하는 것이 원칙']},
  en:{t:'Take-off speeds V1, VR and V2',v1:'V1: beyond this speed, continue the take-off rather than stop',vr:'VR: start to raise the nose',v2:'V2: the speed at which the aircraft can climb safely with one engine out (by 35 ft)',ft:'35 ft',n:['Always V1 ≤ VR ≤ V2; they change every flight with weight, temperature and runway length and condition','As a rule, reject the take-off for a serious failure before V1, and continue after V1']}})[l];
 if(!W)return F.ac_vspeeds('ja');
 setK(1);var dur=9;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,190,'#DCEEFB',14)+R(20,218,600,28,'#9CC98B',0)+R(40,214,560,8,'#5B6770',3);
 var path='M60 206 L330 206 L400 200 L520 150 L600 118';
 s+='<g>'+planeS('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" rotate="auto" keyPoints="0;.53;.66;.9;1" keyTimes="0;.45;.6;.85;1" calcMode="linear" path="'+path+'"/></g>';
 s+='<line x1="420" y1="162" x2="600" y2="162" stroke="#6B4FA0" stroke-width="2" stroke-dasharray="5 4"/>'+LB(430,162,W.ft,10.5,'#6B4FA0','start','#fff');
 [[250,'V1','#D64545',.28],[330,'VR','#E08A2F',.45],[505,'V2','#1F7A6E',.8]].forEach(function(v){s+='<g opacity="0"><line x1="'+v[0]+'" y1="70" x2="'+v[0]+'" y2="214" stroke="'+v[2]+'" stroke-width="2.5"/>'+LB(v[0],84,v[1],13,'#fff','middle',v[2])+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+v[3]+';'+(v[3]+0.03)+';.97;1" dur="'+dur+'s" repeatCount="indefinite"/></g>'});
 var y=258,items=[[W.v1,'#D64545'],[W.vr,'#E08A2F'],[W.v2,'#1F7A6E']];
 items.forEach(function(v){var n=LI(v[0],11.5,560).length,lh=FS(11.5)*1.3,h=n*lh+14;s+=R(20,y,600,h,'#fff',10,' stroke="'+v[1]+'" stroke-width="2"')+WR(320,y+7+n*lh/2+FS(11.5)*0.3,v[0],11.5,v[1],900,560);y+=h+6});
 var L=LIST(W.n,y+4,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 6 公示された距離：TORA・TODA（＋クリアウェイ）・ASDA（＋ストップウェイ）・LDA（移設された進入端） */
ac_decl:function(l){
 var W=({ja:{t:'空港が公示する4つの距離',rw:'滑走路',sw:'ストップウェイ',cw:'クリアウェイ',dt:'移設された進入端',rows:[['TORA','離陸滑走に使える長さ','滑走路'],['TODA','離陸（35ftまで）に使える長さ','滑走路＋クリアウェイ'],['ASDA','加速して止まるまでに使える長さ','滑走路＋ストップウェイ'],['LDA','着陸に使える長さ','移設された進入端から']],note:'長さはAIPの飛行場の項（AD 2）に空港・滑走路ごとに載っている。工事などで変わるときはNOTAMで知らせる'},
  ko:{t:'공항이 공시하는 4가지 거리',rw:'활주로',sw:'정지로',cw:'개방로',dt:'이설된 시단',rows:[['TORA','이륙 활주에 쓸 수 있는 길이','활주로'],['TODA','이륙(35ft까지)에 쓸 수 있는 길이','활주로+개방로'],['ASDA','가속해 멈출 때까지 쓸 수 있는 길이','활주로+정지로'],['LDA','착륙에 쓸 수 있는 길이','이설된 시단부터']],note:'길이는 AIP의 비행장 항목(AD 2)에 공항·활주로별로 실려 있다. 공사 등으로 바뀔 때는 NOTAM으로 알린다'},
  en:{t:'The four declared distances',rw:'Runway',sw:'Stopway',cw:'Clearway',dt:'Displaced threshold',rows:[['TORA','Length available for the take-off run','Runway'],['TODA','Length available for take-off (to 35 ft)','Runway + clearway'],['ASDA','Length available to accelerate and stop','Runway + stopway'],['LDA','Length available for landing','From the displaced threshold']],note:'Published per airport and runway in the aerodrome section of the AIP (AD 2); changes, e.g. for works, are notified by NOTAM'}})[l];
 if(!W)return F.ac_decl('ja');
 setK(1);
 var x0=40,xr=480,xs=530,xc=600,xd=120;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,150,'#DDE8D4',14);
 s+=R(x0,104,xr-x0,34,'#4A545E',3)+'<rect x="'+xr+'" y="104" width="'+(xs-xr)+'" height="34" fill="#8C9BAA"/><rect x="'+xr+'" y="96" width="'+(xc-xr)+'" height="50" fill="none" stroke="#1F7A6E" stroke-width="2" stroke-dasharray="6 4"/>';
 s+='<line x1="'+xd+'" y1="100" x2="'+xd+'" y2="142" stroke="#fff" stroke-width="3"/>';for(var i=0;i<3;i++)s+='<path d="M'+(x0+14+i*22)+' 121 l12 0 l-4 -4 M'+(x0+26+i*22)+' 121 l-4 4" stroke="#fff" stroke-width="2" fill="none"/>';
 s+=tx((x0+xr)/2,127,W.rw,11,'#fff',900)+LB(xs-10,86,W.sw,10,'#fff','end','#6B7785')+LB(xc-2,160,W.cw,10,'#1F7A6E','end','#fff')+LB(xd,178,W.dt,10,'#fff','middle','#40566B');
 var bars=[[x0,xr,'#2F6FD6'],[x0,xc,'#1F7A6E'],[x0,xs,'#E08A2F'],[xd,xr,'#6B4FA0']],y=220,lh=FS(12)*1.5;
 W.rows.forEach(function(r,i){var b=bars[i],op=l==='ja'?'（':' (',cl=l==='ja'?'）':')',txt=r[1]+op+r[2]+cl,ld=FS(10.5)*1.3,nn=LI(txt,10.5,480).length,h=Math.max(lh,nn*ld)+26;
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+tx(34,y+lh*0.8,r[0],12,b[2],900,'start')+WR(120,y+6+nn*ld/2+FS(10.5)*0.3,txt,10.5,D,800,480,'start');
  var by=y+Math.max(lh,nn*ld)+10;
  s+='<rect x="'+b[0]+'" y="'+by+'" width="0" height="8" rx="4" fill="'+b[2]+'"><animate attributeName="width" values="0;'+(b[1]-b[0])+';'+(b[1]-b[0])+'" keyTimes="0;.35;1" dur="6s" begin="-'+(i*0.3)+'s" repeatCount="indefinite"/></rect>';
  y+=h+4});
 var n2=LI(W.note,10.5,580).length;s+=WR(320,y+8+n2*FS(10.5)*1.3/2,W.note,10.5,G,800,580);y+=n2*FS(10.5)*1.3+18;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 7 V1でエンジンが止まったら：続ければ TODA の中で35ftに、やめれば ASDA の中で止まる */
ac_go_stop:function(l){
 var W=({ja:{t:'V1でエンジンが止まったら',go:'離陸を続ける：TODAの中で高さ35ftに届く',stop:'離陸をやめる：ASDAの中で止まる',fail:'エンジン停止',note:'この2つが両方成り立つように、重さとV1を決める。滑走路が濡れていると、止まるための距離が長くなる'},
  ko:{t:'V1에서 엔진이 멈추면',go:'이륙을 계속한다: TODA 안에서 높이 35ft에 닿는다',stop:'이륙을 멈춘다: ASDA 안에서 선다',fail:'엔진 정지',note:'이 두 가지가 모두 성립하도록 무게와 V1을 정한다. 활주로가 젖어 있으면 멈추는 거리가 길어진다'},
  en:{t:'If an engine fails at V1',go:'Continue: reach 35 ft within the TODA',stop:'Reject: stop within the ASDA',fail:'Engine failure',note:'Weight and V1 are chosen so that both are possible; on a wet runway the stopping distance is longer'}})[l];
 if(!W)return F.ac_go_stop('ja');
 setK(1);
 function lane(y0,go){var g=R(20,y0,600,120,go?'#DCEEFB':'#EEF5FB',12)+R(20,y0+92,600,28,'#9CC98B',0)+R(40,y0+88,500,8,'#5B6770',3)+(go?'<rect x="540" y="'+(y0+80)+'" width="70" height="20" fill="none" stroke="#1F7A6E" stroke-dasharray="5 4"/>':'<rect x="540" y="'+(y0+88)+'" width="40" height="8" fill="#8C9BAA"/>');
  g+='<line x1="260" y1="'+(y0+30)+'" x2="260" y2="'+(y0+100)+'" stroke="#D64545" stroke-width="2" stroke-dasharray="4 4"/>'+LB(260,y0+26,'V1 ✕ '+W.fail,10.5,'#fff','middle','#D64545');
  var p=go?'M60 '+(y0+80)+' L260 '+(y0+80)+' L440 '+(y0+80)+' L600 '+(y0+56):'M60 '+(y0+80)+' L260 '+(y0+80)+' L560 '+(y0+80);
  g+='<g>'+planeS('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" rotate="auto" keyPoints="'+(go?'0;.38;1;1':'0;.4;1;1')+'" keyTimes="0;.4;.85;1" calcMode="'+(go?'linear':'spline')+'"'+(go?'':' keySplines="0 0 1 1;0 0 .3 1;0 0 1 1"')+' path="'+p+'"/></g>';
  var t=go?W.go:W.stop;g+=LBW(320,y0+56,t,11.5,go?'#1F7A6E':'#8a3b00','middle','#fff',540);
  return g}
 var s=TTL(320,30,W.t,15,'#0f3558',600)+lane(56,true)+lane(188,false),y=320;
 var n2=LI(W.note,11,580).length;s+=R(20,y,600,n2*FS(11)*1.3+16,'#FFF1E3',10)+WR(320,y+8+n2*FS(11)*1.3/2+FS(11)*0.3,W.note,11,'#8a3b00',900,580);y+=n2*FS(11)*1.3+28;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 8 性能で決まる最大離陸重量：いくつかの制限のうち、いちばん小さい値 */
ac_mtow:function(l){
 var W=({ja:{t:'その日の最大離陸重量は「いちばん小さい制限」',lims:['構造の限界（機体の強さ）','滑走路の長さ','上昇の勾配（エンジン1つ停止）','障害物を越える','タイヤ・ブレーキ','着陸重量から逆算'],pick:'この日の最大離陸重量',n:['暑い・高い空港・濡れた滑走路・追い風は、多くの制限を小さくする','最大離陸重量から、燃料（出発に必要な量）を引いた残りが、旅客・貨物に使える重さ（ペイロード）の上限になる']},
  ko:{t:'그날의 최대 이륙 중량은 ‘가장 작은 제한’',lims:['구조 한계(기체 강도)','활주로 길이','상승 경사(엔진 하나 정지)','장애물 넘기','타이어·브레이크','착륙 중량에서 역산'],pick:'이날의 최대 이륙 중량',n:['덥고·높은 공항·젖은 활주로·뒷바람은 많은 제한을 작게 만든다','최대 이륙 중량에서 연료(출발에 필요한 양)를 뺀 나머지가 승객·화물에 쓸 수 있는 무게(페이로드)의 상한이 된다']},
  en:{t:'Today’s maximum take-off weight is the smallest limit',lims:['Structural limit (airframe strength)','Runway length','Climb gradient (one engine out)','Obstacle clearance','Tyres and brakes','Back-calculated from landing weight'],pick:'Today’s maximum take-off weight',n:['Hot, high airports, wet runways and tailwinds shrink many of the limits','Maximum take-off weight minus the fuel needed for departure caps the weight available for passengers and cargo (payload)']}})[l];
 if(!W)return F.ac_mtow('ja');
 setK(1);
 var vals=[100,86,82,90,95,88],mn=Math.min.apply(null,vals),y=64,lh=FS(11)*1.3;
 var s=TTL(320,30,W.t,15,'#0f3558',600);
 W.lims.forEach(function(t,i){var nn=LI(t,11,230).length,h=Math.max(FS(11)*1.9,nn*lh+10),bw=(vals[i]-60)/40*300,isMin=vals[i]===mn;
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+WR(30,y+h/2-(nn-1)*lh/2+FS(11)*0.35,t,11,D,800,230,'start');
  s+='<rect x="290" y="'+(y+h/2-9)+'" width="0" height="18" rx="6" fill="'+(isMin?'#D64545':'#2F6FD6')+'" opacity="'+(isMin?1:.55)+'"><animate attributeName="width" values="0;'+bw+';'+bw+'" keyTimes="0;.35;1" dur="7s" repeatCount="indefinite"/></rect>';
  y+=h+4});
 var xm=290+(mn-60)/40*300;s+='<line x1="'+xm+'" y1="60" x2="'+xm+'" y2="'+y+'" stroke="#D64545" stroke-width="2.5" stroke-dasharray="6 4"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.4;.45;1" dur="7s" repeatCount="indefinite"/></line>';
 s+=LBW(xm,y+18,W.pick+' ↑',11.5,'#fff','middle','#D64545',260);y+=40;
 var L=LIST(W.n,y,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},
/* 9 ターボファンの中：ファンが吸った空気の大部分は外側（バイパス）へ、一部が圧縮機→燃焼室→タービン→ノズルを通る */
ac_engine:function(l){
 var W=({ja:{t:'ターボファン・エンジンのしくみ',items:['ファン：たくさんの空気を後ろへ押し出す。推力の大部分はここから','圧縮機：空気を何十分の一に押し縮める','燃焼室：燃料を燃やして高温・高圧のガスにする','タービン：ガスの力で回り、ファンと圧縮機を回す','ノズル：ガスを後ろへ噴き出す'],by:'バイパス（外側を流れる空気）',core:'コア（中を通る空気）',ratio:'今の旅客機はバイパス比 約9〜12：外側を流れる空気が中の約10倍。静かで燃料の効率がよい'},
  ko:{t:'터보팬 엔진의 원리',items:['팬: 많은 공기를 뒤로 밀어낸다. 추력 대부분은 여기서 나온다','압축기: 공기를 몇십 분의 일로 압축한다','연소실: 연료를 태워 고온·고압 가스로 만든다','터빈: 가스의 힘으로 돌며 팬과 압축기를 돌린다','노즐: 가스를 뒤로 내뿜는다'],by:'바이패스(바깥을 흐르는 공기)',core:'코어(안을 지나는 공기)',ratio:'지금 여객기는 바이패스비 약 9~12: 바깥을 흐르는 공기가 안의 약 10배. 조용하고 연료 효율이 좋다'},
  en:{t:'How a turbofan engine works',items:['Fan: pushes a large mass of air backwards and produces most of the thrust','Compressor: squeezes the air to a small fraction of its volume','Combustor: burns fuel to make hot, high-pressure gas','Turbine: driven by the gas, it turns the fan and compressor','Nozzle: exhausts the gas rearwards'],by:'Bypass air (around the outside)',core:'Core air (through the middle)',ratio:'Modern airliners have bypass ratios of about 9–12: roughly ten times as much air flows around the core as through it, making them quiet and fuel-efficient'}})[l];
 if(!W)return F.ac_engine('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,230,'#EEF5FB',14);
 /* ナセル（外殻）とコア */
 s+='<path d="M70 90 C90 76 150 72 200 74 L520 88 C560 92 580 110 590 124" fill="none" stroke="#243447" stroke-width="5"/><path d="M70 250 C90 264 150 268 200 266 L520 252 C560 248 580 230 590 216" fill="none" stroke="#243447" stroke-width="5"/>';
 s+='<path d="M150 170 C160 130 190 118 240 116 L450 120 C500 124 540 150 560 170 C540 190 500 216 450 220 L240 224 C190 222 160 210 150 170 Z" fill="#DCE3EA" stroke="#243447" stroke-width="3"/>';
 /* スピナーとファンの羽根 */
 s+='<path d="M92 170 C96 158 108 152 122 152 L122 188 C108 188 96 182 92 170 Z" fill="#8C9BAA" stroke="#243447" stroke-width="2"/>';
 for(var b=0;b<7;b++){var bx=112+b*2.2;s+='<line x1="'+bx+'" y1="'+(84+b%2*4)+'" x2="'+(bx+6)+'" y2="'+(256-b%2*4)+'" stroke="#2F6FD6" stroke-width="3" opacity=".8"><animate attributeName="opacity" values=".9;.3;.9" dur=".25s" begin="-'+(b*0.035).toFixed(3)+'s" repeatCount="indefinite"/></line>'}
 /* 圧縮機（後ろほど短い羽根） */
 s+='<rect x="230" y="140" width="70" height="60" fill="#DCEBFA"/>';for(var c=0;c<8;c++){var cx2=234+c*8.5,hh=28-c*2.2;s+='<line x1="'+cx2+'" y1="'+(170-hh)+'" x2="'+cx2+'" y2="'+(170+hh)+'" stroke="#2F6FD6" stroke-width="2.4"/>'}
 /* 燃焼室の炎 */
 s+='<rect x="300" y="140" width="50" height="60" fill="#FFE3D6"/>';for(var fl=0;fl<3;fl++)s+='<ellipse cx="'+(314+fl*11)+'" cy="170" rx="5" ry="16" fill="#FF7A45"><animate attributeName="ry" values="12;19;12" dur=".5s" begin="-'+(fl*0.15)+'s" repeatCount="indefinite"/></ellipse>';
 /* タービン（羽根の列） */
 s+='<rect x="350" y="140" width="70" height="60" fill="#FFF1C9"/>';for(var tb=0;tb<6;tb++){var tx2=356+tb*11,hh2=18+tb*1.6;s+='<line x1="'+tx2+'" y1="'+(170-hh2)+'" x2="'+tx2+'" y2="'+(170+hh2)+'" stroke="#C98A00" stroke-width="3"/>'}
 /* 排気コーン */
 s+='<path d="M430 150 L560 170 L430 190 Z" fill="#8C9BAA" stroke="#243447" stroke-width="2"/>';
 for(var i=0;i<6;i++){var y1=98+i*5,y2=242-i*5;s+='<circle r="3" fill="#2F6FD6"><animateMotion dur="2s" begin="-'+(i*0.33).toFixed(2)+'s" repeatCount="indefinite" path="M60 '+y1+' L590 '+(y1+12)+'"/></circle><circle r="3" fill="#2F6FD6"><animateMotion dur="2s" begin="-'+(i*0.33+0.15).toFixed(2)+'s" repeatCount="indefinite" path="M60 '+y2+' L590 '+(y2-12)+'"/></circle>'}
 for(var i=0;i<4;i++)s+='<circle r="3.5" fill="#D64545"><animateMotion dur="2.6s" begin="-'+(i*0.65).toFixed(2)+'s" repeatCount="indefinite" path="M60 170 L230 170 L520 170 L600 170"/></circle>';
 [[118,70,1],[265,126,2],[325,126,3],[385,126,4],[572,112,5]].forEach(function(p){s+=BADGE(p[0],p[1],p[2],11)});
 s+=LB(330,102,W.by,10,'#2F6FD6','middle','#fff')+LB(330,214,W.core,10,'#8a3b00','middle','#fff');
 var L=LIST(W.items,298,600,11),y=L.y+6,n=LI(W.ratio,11,580).length,note=R(20,y,600,n*FS(11)*1.3+16,'#FFF1E3',10)+WR(320,y+8+n*FS(11)*1.3/2+FS(11)*0.3,W.ratio,11,'#8a3b00',900,580);y+=n*FS(11)*1.3+28;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+L.s+note+'</svg>'},

/* 10 気温と離陸推力：ある気温（フラット・レート）までは同じ推力、それより暑いと減る */
ac_thrust:function(l){
 var W=({ja:{t:'気温と離陸の推力',x:'外気温度',y:'離陸推力',flat:'ここまでは同じ推力（フラット・レート）',down:'暑いと推力が減る',n:['エンジンは、ある気温（例：ISA＋15℃ 前後）までは同じ最大推力を出せるように作られている','それより暑いと、エンジンの温度の限界を守るため推力が下がる。夏の昼に離陸重量が制限されやすいのはこのため','高い所ほど空気が薄く、推力は小さいが、燃料の効率はよくなる（だから高く飛ぶ）']},
  ko:{t:'기온과 이륙 추력',x:'외기온도',y:'이륙 추력',flat:'여기까지는 같은 추력(평탄 정격)',down:'더우면 추력이 준다',n:['엔진은 어느 기온(예: ISA+15℃ 전후)까지는 같은 최대 추력을 낼 수 있도록 만들어져 있다','그보다 더우면 엔진 온도 한계를 지키려고 추력이 내려간다. 여름 낮에 이륙 무게가 제한되기 쉬운 이유','높은 곳일수록 공기가 옅어 추력은 작지만 연료 효율은 좋아진다(그래서 높이 난다)']},
  en:{t:'Temperature and take-off thrust',x:'Outside air temperature',y:'Take-off thrust',flat:'Same thrust up to here (flat rating)',down:'Less thrust in the heat',n:['Engines are built to give the same maximum thrust up to a certain temperature (e.g. around ISA+15 °C)','Above that, thrust is reduced to stay within engine temperature limits, which is why take-off weight is often limited on summer afternoons','Higher up the air is thinner, so there is less thrust but better fuel efficiency (which is why aircraft cruise high)']}})[l];
 if(!W)return F.ac_thrust('ja');
 setK(1);var gx0=90,gy0=250,gw=500,gh=170;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,230,'#EEF5FB',14);
 s+='<line x1="'+gx0+'" y1="'+gy0+'" x2="'+(gx0+gw)+'" y2="'+gy0+'" stroke="#40566B" stroke-width="2"/><line x1="'+gx0+'" y1="'+gy0+'" x2="'+gx0+'" y2="'+(gy0-gh)+'" stroke="#40566B" stroke-width="2"/>'+tx(gx0+gw,gy0+22,W.x+' →',10.5,G,800,'end')+tx(gx0+6,gy0-gh-8,W.y+' ↑',10.5,G,800,'start');
 var fx=gx0+280,top=gy0-140;
 s+='<path d="M'+gx0+' '+top+' L'+fx+' '+top+' L'+(gx0+gw-10)+' '+(gy0-50)+'" fill="none" stroke="#2F6FD6" stroke-width="3.5"/>';
 s+='<line x1="'+fx+'" y1="'+top+'" x2="'+fx+'" y2="'+gy0+'" stroke="#E08A2F" stroke-width="2" stroke-dasharray="5 4"/>';
 s+='<circle r="7" fill="#FFD23F" stroke="#0f3558"><animateMotion dur="7s" repeatCount="indefinite" path="M'+gx0+' '+top+' L'+fx+' '+top+' L'+(gx0+gw-10)+' '+(gy0-50)+'"/></circle>';
 s+=LBW(gx0+140,top+26,W.flat,10.5,'#2F6FD6','middle','#fff',240)+LBW(fx+110,gy0-110,W.down,10.5,'#D64545','middle','#fff',160);
 var L=LIST(W.n,298,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'},

/* 11 燃料の計画の中身（ICAO Annex 6 の考え方） */
ac_fuel:function(l){
 var W=({ja:{t:'燃料の計画の中身',items:[['地上走行','出発前の地上走行・APU'],['飛行','目的地に着くまでに使う量'],['予備（コンティンジェンシー）','予想とのずれに備える。飛行の燃料の5％など'],['代替空港','目的地に降りられず、代替空港へ行く量'],['最終予備','代替空港の上空1,500ftで30分待機できる量（ジェット機）'],['追加・機長の判断','待機の予想、特別な事情、機長の判断で足す量']],note:'細かい決まりは各国の規則と会社の運航規程による。「最終予備に手をつけそうなら緊急（MAYDAY FUEL）」'},
  ko:{t:'연료 계획의 구성',items:[['지상 이동','출발 전 지상 이동·APU'],['운항','목적지에 닿을 때까지 쓰는 양'],['예비(컨틴전시)','예상과의 차이에 대비한다. 운항 연료의 5% 등'],['교체공항','목적지에 내리지 못하고 교체공항으로 가는 양'],['최종 예비','교체공항 상공 1,500ft에서 30분 대기할 수 있는 양(제트기)'],['추가·기장 판단','대기 예상, 특별한 사정, 기장 판단으로 더하는 양']],note:'세부 규정은 각국 규칙과 회사 운항규정에 따른다. ‘최종 예비에 손댈 것 같으면 비상(MAYDAY FUEL)’'},
  en:{t:'What goes into the fuel plan',items:[['Taxi','Taxiing and APU use before departure'],['Trip','Fuel to reach the destination'],['Contingency','For deviations from the plan, e.g. 5% of trip fuel'],['Alternate','Fuel to go on to the alternate if the destination is unusable'],['Final reserve','30 minutes holding at 1,500 ft over the alternate (turbine aircraft)'],['Additional and discretionary','For expected holding, special circumstances or the captain’s decision']],note:'Details follow national rules and the operations manual. If final reserve is about to be used, declare an emergency (MAYDAY FUEL)'}})[l];
 if(!W)return F.ac_fuel('ja');
 setK(1);
 var cols=['#9FB0C2','#2F6FD6','#1F7A6E','#E08A2F','#D64545','#6B4FA0'],vals=[4,60,6,12,8,10],tot=0;vals.forEach(function(v){tot+=v});
 var s=TTL(320,30,W.t,15,'#0f3558',600),x=40,bw=560,y0=66,bh=40,acc=0,n=vals.length;
 vals.forEach(function(v,i){var w=v/tot*bw,a0=(i/n*0.8).toFixed(2);
  s+='<rect x="'+(x+acc)+'" y="'+y0+'" width="'+w.toFixed(1)+'" height="'+bh+'" fill="'+cols[i]+'" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+a0+';'+(+a0+0.05).toFixed(2)+';1" dur="8s" repeatCount="indefinite"/></rect>';
  s+=BADGE(x+acc+w/2,y0+bh+20,i+1,10.5);acc+=w});
 var y=y0+bh+46,lh=FS(11)*1.3;
 W.items.forEach(function(r,i){var nn=LI(r[1],11,360).length,h=Math.max(FS(11.5)*1.6,nn*lh+12);s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',8)+'<rect x="20" y="'+y+'" width="8" height="'+h+'" rx="3" fill="'+cols[i]+'"/>'+BADGE(48,y+h/2,i+1,10.5)+WR(72,y+h/2+FS(11.5)*0.35,r[0],11.5,cols[i]===cols[0]?'#40566B':cols[i],900,160,'start')+WR(250,y+h/2+FS(11)*0.35,r[1],11,D,800,360,'start');y+=h+4});
 var n2=LI(W.note,10.5,580).length;s+=WR(320,y+8+n2*FS(10.5)*1.3/2,W.note,10.5,'#8a3b00',900,580);y+=n2*FS(10.5)*1.3+18;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 12 燃料が凍らないように：長い巡航で燃料の温度が下がる。凍る温度に近づいたら降下するか速さを上げる */
ac_freeze:function(l){
 var W=({ja:{t:'燃料の温度に気をつける',x:'飛行時間',y:'燃料の温度',fp:'Jet A-1 の凍る温度 −47℃',act:'近づいたら：降下する・速さを上げる（空気との摩擦で温める）',n:['日本・韓国の空港の燃料は多くが Jet A-1（凍る温度 −47℃）。米国の国内は Jet A（−40℃）も使われる','寒い上空を長く飛ぶと、燃料の温度はゆっくり下がる。極地に近い経路では特に注意','燃料は体積（リットル）で入れ、計画は重さ（kg）で行う。密度 約0.8で換算する（10,000L ≒ 8,000kg）']},
  ko:{t:'연료 온도에 주의한다',x:'비행시간',y:'연료 온도',fp:'Jet A-1의 어는점 −47℃',act:'가까워지면: 강하하거나 속도를 올린다(공기와의 마찰로 데운다)',n:['한국·일본 공항 연료는 대부분 Jet A-1(어는점 −47℃). 미국 국내에서는 Jet A(−40℃)도 쓴다','추운 상공을 오래 날면 연료 온도가 천천히 내려간다. 극지에 가까운 경로에서 특히 주의','연료는 부피(리터)로 넣고 계획은 무게(kg)로 한다. 밀도 약 0.8로 환산한다(10,000L ≒ 8,000kg)']},
  en:{t:'Watch the fuel temperature',x:'Flight time',y:'Fuel temperature',fp:'Jet A-1 freezing point −47 °C',act:'If it gets close: descend or fly faster (warming from air friction)',n:['Most fuel at Korean and Japanese airports is Jet A-1 (freezing point −47 °C); Jet A (−40 °C) is also used within the US','On long flights in very cold air the fuel slowly cools, especially on routes near the poles','Fuel is uplifted by volume (litres) but planned by mass (kg), converted with a density of about 0.8 (10,000 L ≈ 8,000 kg)']}})[l];
 if(!W)return F.ac_freeze('ja');
 setK(1);var gx0=90,gy0=250,gw=500,gh=170;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,230,'#EEF5FB',14);
 s+='<line x1="'+gx0+'" y1="'+gy0+'" x2="'+(gx0+gw)+'" y2="'+gy0+'" stroke="#40566B" stroke-width="2"/><line x1="'+gx0+'" y1="'+gy0+'" x2="'+gx0+'" y2="'+(gy0-gh)+'" stroke="#40566B" stroke-width="2"/>'+tx(gx0+gw,gy0+22,W.x+' →',10.5,G,800,'end')+tx(gx0+6,gy0-gh-8,W.y+' ↑',10.5,G,800,'start');
 var fpY=gy0-40;s+='<line x1="'+gx0+'" y1="'+fpY+'" x2="'+(gx0+gw)+'" y2="'+fpY+'" stroke="#D64545" stroke-width="2.5" stroke-dasharray="8 5"/>'+LB(gx0+gw-6,fpY+16,W.fp,10.5,'#fff','end','#D64545');
 var cur='M'+gx0+' '+(gy0-150)+' C'+(gx0+120)+' '+(gy0-100)+' '+(gx0+230)+' '+(gy0-60)+' '+(gx0+300)+' '+(gy0-54)+' C'+(gx0+340)+' '+(gy0-50)+' '+(gx0+380)+' '+(gy0-80)+' '+(gx0+480)+' '+(gy0-96);
 s+='<path d="'+cur+'" fill="none" stroke="#2F6FD6" stroke-width="3.5"/><circle r="7" fill="#FFD23F" stroke="#0f3558"><animateMotion dur="8s" repeatCount="indefinite" path="'+cur+'"/></circle>';
 s+='<g opacity="0">'+LBW(gx0+300,gy0-128,W.act,10.5,'#1F7A6E','middle','#fff',300)+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.55;.6;.95;1" dur="8s" repeatCount="indefinite"/></g>';
 var L=LIST(W.n,298,600,11);
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
