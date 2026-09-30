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
 var HH=L.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+L.s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
