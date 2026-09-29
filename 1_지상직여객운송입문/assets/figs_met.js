/* 航空気象の基礎（Part 10）の図（2026.09）— figs.js の後に読み込み、window.FIGS に追加する
   ・どの図も lang（ja / ko / en）を受け取り、図の中の文字をその言語で書く（受け取れないときは日本語）
   ・小中高生でも分かるように、たとえ（ボール・風船・ふた）と色で見せる。動きは SVG のアニメーション（SMIL） */
(function(){
var D='#243447',B='#2F8FE0',T='#1F7A6E',O='#E08A2F',RD='#D64545',P='#6B4FA0',G='#6B7785';
function R(x,y,w,h,f,rx,ex){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+f+'"'+(ex||'')+'/>'}
function tx(x,y,s,sz,c,w,a){return '<text x="'+x+'" y="'+y+'" font-size="'+((sz||14)*K).toFixed(1)+'" font-weight="'+(w||700)+'" fill="'+(c||D)+'" text-anchor="'+(a||'middle')+'" font-family="Arial,Helvetica,\'Noto Sans JP\',\'Noto Sans KR\',sans-serif">'+s+'</text>'}
var K=1; /* 文字の倍率（スマートフォンの縦並びのときに大きくする） */
function NARROW(){try{return (window.innerWidth||1024)<700}catch(e){return false}}
function TW(s,sz){var w=0;s=String(s);for(var i=0;i<s.length;i++){w+=s.charCodeAt(i)>255?1:0.56}return w*sz*K}
/* 幅に収まるように「 → 」や空白で折り返して、複数行の文字にする */
function WR(x,y,s,sz,c,w,maxw,a){var parts=String(s).split(/( → |、|，|, | )/),lines=[],cur='';parts.forEach(function(p){if(!p)return;var cand=cur+p;if(TW(cand,sz)>maxw&&cur.trim()){lines.push(cur.trim());cur=p.replace(/^ /,'')}else cur=cand});if(cur.trim())lines.push(cur.trim());var lh=sz*K*1.35,y0=y-(lines.length-1)*lh/2;return lines.map(function(ln,i){return tx(x,y0+i*lh,ln,sz,c,w,a)}).join('')}
function plane(c){return '<path d="M-16 0 L12 -3 L18 0 L12 3 Z M-5 -2 L4 -14 L8 -14 L4 -2 Z M-5 2 L4 14 L8 14 L4 2 Z M-15 -1 L-12 -7 L-9 -7 L-11 -1 Z" fill="'+(c||'#fff')+'" stroke="#1d2b3a" stroke-width="1.2"/>'}
function cloud(x,y,s,c){s=s||1;return '<g transform="translate('+x+' '+y+') scale('+s+')"><ellipse cx="0" cy="0" rx="26" ry="14" fill="'+(c||'#fff')+'"/><ellipse cx="-18" cy="4" rx="16" ry="10" fill="'+(c||'#fff')+'"/><ellipse cx="18" cy="4" rx="17" ry="10" fill="'+(c||'#fff')+'"/><ellipse cx="4" cy="-9" rx="15" ry="11" fill="'+(c||'#fff')+'"/></g>'}
window.FIGS=window.FIGS||{};
var F={
/* 1 空の層：対流圏・成層圏・中間圏・熱圏。気温の線を描き、旅客機は対流圏の上のほうを飛ぶ */
met_layers:function(l){l=l||'ja';
 var T2={ja:1,ko:1,en:1}[l]?l:'ja';
 var W={ja:['熱圏','中間圏','成層圏','対流圏','対流圏界面','成層圏界面','中間圏界面','気温','高さ','雲・雨・雪 ― 天気はここで起きる','オゾン層が紫外線を吸って暖まる','流れ星が光る','オーロラ','旅客機（約10〜12km）','エベレスト（8.8km）','気温が下がる','気温が上がる','低い ← 気温 → 高い'],
  ko:['열권','중간권','성층권','대류권','대류권계면','성층권계면','중간권계면','기온','높이','구름·비·눈 — 날씨는 여기서 생긴다','오존층이 자외선을 흡수해 따뜻해진다','별똥별이 빛난다','오로라','여객기(약 10~12km)','에베레스트(8.8km)','기온이 내려간다','기온이 올라간다','낮음 ← 기온 → 높음'],
  en:['Thermosphere','Mesosphere','Stratosphere','Troposphere','Tropopause','Stratopause','Mesopause','Temperature','Height','Clouds, rain, snow: weather happens here','Ozone absorbs UV and warms the air','Shooting stars glow','Aurora','Airliners (about 10–12 km)','Everest (8.8 km)','Temperature falls','Temperature rises','Cold ← temperature → warm']}[T2];
 /* 高さ（km）→ y。対流圏を大きく見せる区切りの目盛り */
 function Y(h){if(h<=12)return 490-h*14.5;if(h<=50)return 316-(h-12)*3.6;if(h<=85)return 179-(h-50)*2.8;return 81-(h-85)*2.6}
 function X(tc){return 470+(tc+95)*3.1}
 var nar=NARROW();K=nar?1.15:1;
 var s='';
 s+='<defs><linearGradient id="mlT" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9FD3F7"/><stop offset="1" stop-color="#5FA8E6"/></linearGradient><linearGradient id="mlS" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#3F7CC4"/><stop offset="1" stop-color="#2B4F8F"/></linearGradient><linearGradient id="mlM" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#26396B"/><stop offset="1" stop-color="#1B2447"/></linearGradient><linearGradient id="mlH" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#171C35"/><stop offset="1" stop-color="#0E1022"/></linearGradient></defs>';
 /* 層の帯 */
 s+=R(70,Y(12),380,Y(0)-Y(12),'url(#mlT)')+R(70,Y(50),380,Y(12)-Y(50),'url(#mlS)')+R(70,Y(85),380,Y(50)-Y(85),'url(#mlM)')+R(70,Y(100),380,Y(85)-Y(100),'url(#mlH)');
 /* 境界の線と名前 */
 [[12,W[4],'#fff'],[50,W[5],'#fff'],[85,W[6],'#fff']].forEach(function(v){s+='<line x1="70" y1="'+Y(v[0])+'" x2="450" y2="'+Y(v[0])+'" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity=".8"/>'+tx(446,Y(v[0])-6,v[1],11,'#fff',700,'end')});
 s+=tx(86,Y(6)+6,W[3],20,'#0f3558',900,'start')+tx(86,Y(31)+6,W[2],20,'#fff',900,'start')+tx(86,Y(67)+6,W[1],20,'#fff',900,'start')+tx(86,Y(93)+6,W[0],18,'#fff',900,'start');
 /* 対流圏：雲・山・飛行機 */
 s+='<path d="M250 490 L300 '+Y(8.8)+' L318 '+(Y(8.8)+14)+' L335 '+(Y(8.8)+6)+' L380 490 Z" fill="#7C8A74"/><path d="M300 '+Y(8.8)+' L318 '+(Y(8.8)+14)+' L335 '+(Y(8.8)+6)+' L322 '+(Y(8.8)+32)+' L292 '+(Y(8.8)+26)+' Z" fill="#fff"/>';
 s+=tx(315,Y(8.8)-8,W[14],11,'#0f3558',700);
 s+=cloud(140,Y(2.5),1)+cloud(215,Y(4.2),.8)+'<g opacity=".95">'+cloud(400,Y(3),.7)+'</g>';
 s+=tx(260,Y(1)+2,W[9],12,'#0f3558',800);
 s+='<g>'+plane('#fff')+'<animateMotion dur="9s" repeatCount="indefinite" path="M90 '+Y(10.6)+' L430 '+Y(10.6)+'"/></g>'+tx(86,Y(9.3),W[13],11,'#0f3558',800,'start');
 /* 成層圏：オゾン */
 s+='<g opacity=".9"><circle cx="330" cy="'+Y(25)+'" r="16" fill="#8FD0B5"/>'+tx(330,Y(25)+5,'O₃',13,'#0f3558',900)+'<animate attributeName="opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite"/></g>'+tx(250,Y(25)+26,W[10],11,'#fff',700);
 /* 中間圏：流れ星 */
 s+='<g><line x1="0" y1="0" x2="-40" y2="-18" stroke="#FFE08A" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="0" r="3" fill="#fff"/><animateMotion dur="4s" repeatCount="indefinite" path="M300 '+Y(60)+' L400 '+Y(72)+'"/><animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite"/></g>'+tx(250,Y(78),W[11],11,'#fff',700);
 /* 熱圏：オーロラ */
 s+='<path d="M200 '+(Y(92)+8)+' q30 -16 60 0 t60 0 t60 0" stroke="#7CF2B0" stroke-width="5" fill="none" opacity=".8"><animate attributeName="opacity" values=".3;.9;.3" dur="3.5s" repeatCount="indefinite"/></path>'+tx(290,Y(95),W[12],11,'#7CF2B0',800);
 /* 高さの目盛り */
 [0,5,10,12,20,30,40,50,60,70,80,90,100].forEach(function(h){s+='<line x1="64" y1="'+Y(h)+'" x2="70" y2="'+Y(h)+'" stroke="'+G+'"/>'+tx(58,Y(h)+4,h,10,G,700,'end')});
 s+=tx(30,30,W[8]+' (km)',12,G,800,'start');
 /* 気温の図 */
 var sL=s;s='';
 s+=R(470,Y(100),410,Y(0)-Y(100),'#fff',8,' stroke="#D9E3EC"');
 [-80,-60,-40,-20,0,20].forEach(function(c){s+='<line x1="'+X(c)+'" y1="'+Y(100)+'" x2="'+X(c)+'" y2="'+Y(0)+'" stroke="#EEF2F6"/>'+tx(X(c),Y(0)+16,c+'℃',10,G,700)});
 [12,50,85].forEach(function(h){s+='<line x1="470" y1="'+Y(h)+'" x2="880" y2="'+Y(h)+'" stroke="#C9D6E3" stroke-dasharray="4 4"/>'});
 [[5,W[3]],[30,W[2]],[67,W[1]],[93,W[0]]].forEach(function(v){s+=tx(478,Y(v[0])+4,v[1],11,'#9AA7B4',800,'start')});
 var pts=[[0,15],[11,-56.5],[20,-56.5],[32,-44.5],[47,-2.5],[51,-2.5],[71,-58.5],[85,-86],[100,-55]];
 var d='M'+pts.map(function(p){return X(p[1]).toFixed(1)+' '+Y(p[0]).toFixed(1)}).join(' L');
 s+='<path d="'+d+'" fill="none" stroke="'+RD+'" stroke-width="4" stroke-linejoin="round" stroke-dasharray="1400" stroke-dashoffset="1400"><animate attributeName="stroke-dashoffset" values="1400;0;0" keyTimes="0;.6;1" dur="8s" repeatCount="indefinite"/></path>';
 s+=tx(X(-8),Y(6),'↘ '+W[15],12,RD,800,'start')+tx(X(-12),Y(30),'↗ '+W[16],12,RD,800,'start')+tx(X(-18),Y(62),'↘ '+W[15],12,RD,800,'start')+tx(X(-50),Y(93),'↗ '+W[16],12,RD,800,'start');
 s+=tx(675,Y(0)+34,W[17],12,G,800);
 s+=tx(X(15)+4,Y(0)-6,'15℃',11,RD,800,'start')+tx(X(-56.5)+6,Y(11)-6,'−56.5℃',11,RD,800,'start');
 K=1;
 if(nar)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 1075" role="img">'+R(0,0,460,1075,'#F7FAFD')+'<g transform="translate(-14 0)">'+sL+'</g><g transform="translate(-450 520)">'+s+'</g></svg>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 540" role="img">'+R(0,0,900,540,'#F7FAFD')+sL+s+'</svg>'},

/* 2 ボールで見る「安定」：谷のボール（戻る）・山のボール（転がり落ちる）・平らな所のボール（止まった所にいる） */
met_ball:function(l){
 var W=({ja:['安定','不安定','中立','少し押しても、元の場所に戻る','少し押すと、どんどん離れていく','押した先で、そのまま止まる','大気では：空気が上がっても元の高さに戻る → 雲は横に広がる','大気では：空気が上がり続ける → 雲が縦に伸びる（積乱雲）'],
  ko:['안정','불안정','중립','조금 밀어도 원래 자리로 돌아온다','조금 밀면 점점 멀어진다','민 곳에서 그대로 멈춘다','대기에서는: 공기가 올라가도 원래 높이로 돌아온다 → 구름이 옆으로 퍼진다','대기에서는: 공기가 계속 올라간다 → 구름이 위로 솟는다(적란운)'],
  en:['Stable','Unstable','Neutral','Push it and it rolls back','Push it and it keeps going','Push it and it stays where it stops','In the air: a lifted parcel sinks back → clouds spread sideways','In the air: a lifted parcel keeps rising → clouds tower up (Cb)']})[l];
 if(!W)return F.met_ball('ja');
 var nar=NARROW();K=nar?1.25:1;
 function arrow(x,y){return '<g><path d="M'+(x-34)+' '+y+' l22 0" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/><path d="M'+(x-14)+' '+(y-6)+' l8 6 l-8 6" fill="none" stroke="'+D+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><animate attributeName="opacity" values="0;1;0;0" keyTimes="0;.12;.25;1" dur="4s" repeatCount="indefinite"/></g>'}
 function ball(kp,kt,ks,path){return '<circle r="16" fill="'+O+'" stroke="#7a3e0a" stroke-width="2"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="'+kp+'" keyTimes="'+kt+'" calcMode="spline" keySplines="'+ks+'" path="'+path+'"/></circle>'}
 function panel(ox,oy,i){var col=[T,RD,B][i],g='<g transform="translate('+ox+' '+oy+')">'+R(0,0,270,250,'#fff',16,' stroke="'+col+'" stroke-width="3"')+tx(135,36,W[i],24,col,900);
  if(i===0)g+='<path d="M20 90 Q135 230 250 90" fill="none" stroke="'+T+'" stroke-width="6" stroke-linecap="round"/>'+ball('0.5;0.3;0.62;0.42;0.54;0.48;0.5;0.5','0;.15;.3;.45;.6;.75;.9;1','.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1','M20 74 Q135 214 250 74')+arrow(76,130);
  if(i===1)g+='<path d="M20 194 Q135 40 250 194" fill="none" stroke="'+RD+'" stroke-width="6" stroke-linecap="round"/>'+ball('0.5;0.5;0.56;1;1','0;.2;.35;.8;1','0 0 1 1;.5 0 .9 .6;.4 0 1 1;0 0 1 1','M20 178 Q135 24 250 178')+arrow(85,98);
  if(i===2)g+='<line x1="20" y1="170" x2="250" y2="170" stroke="'+B+'" stroke-width="6" stroke-linecap="round"/>'+ball('0.3;0.3;0.62;0.62','0;.2;.55;1','0 0 1 1;.2 .6 .4 1;0 0 1 1','M20 154 L250 154')+arrow(70,130);
  return g+WR(135,226,W[3+i],13,D,700,250)+'</g>'}
 function box(ox,oy,w,h,s,col,bg){var p=s.split(/：|: /),g=R(ox,oy,w,h,bg,12)+tx(ox+w/2,oy+22,p[0],12,col,900);return g+WR(ox+w/2,oy+(h+22)/2+8,p.slice(1).join(': '),13,D,700,w-24)}
 var s;
 if(nar){s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 1040" role="img">'+R(0,0,310,1040,'#F7FAFD')+panel(20,10,0)+panel(20,275,1)+panel(20,540,2)+box(20,806,270,106,W[6],T,'#E8F5F2')+box(20,922,270,106,W[7],RD,'#FCEBEB')}
 else{s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+R(0,0,900,380,'#F7FAFD')+panel(20,20,0)+panel(315,20,1)+panel(610,20,2)+box(20,290,418,72,W[6],T,'#E8F5F2')+box(462,290,418,72,W[7],RD,'#FCEBEB')}
 K=1;return s+'</svg>'},

/* 3 空気の風船の実験：持ち上げた空気は 1 km ごとに 約10℃ 冷える。周りより冷たければ戻り、暖かければ上がり続けて雲になる */
met_parcel:function(l){
 var W=({ja:['安定な日','不安定な日','風船（空気）','周りの空気','周りより冷たい → 重い → 元の高さに戻る','周りより暖かい → 軽い → 上がり続けて雲ができる','持ち上げた空気は 1 km 上がるごとに 約10℃ 冷える（乾燥断熱減率）','周りの気温：1 kmで 4℃ 下がる','周りの気温：1 kmで 12℃ 下がる'],
  ko:['안정한 날','불안정한 날','풍선(공기)','주변 공기','주변보다 차갑다 → 무겁다 → 원래 높이로 돌아온다','주변보다 따뜻하다 → 가볍다 → 계속 올라가 구름이 생긴다','들어 올린 공기는 1km 올라갈 때마다 약 10℃ 식는다(건조단열감률)','주변 기온: 1km에 4℃ 내려감','주변 기온: 1km에 12℃ 내려감'],
  en:['A stable day','An unstable day','Balloon (air)','Surrounding air','Colder than its surroundings → heavier → sinks back','Warmer than its surroundings → lighter → keeps rising and forms cloud','Lifted air cools about 10 °C for every km it rises (dry adiabatic lapse rate)','Surroundings: 4 °C colder per km','Surroundings: 12 °C colder per km']})[l]||null;
 if(!W)return F.met_parcel('ja');
 var nar=NARROW();K=nar?1.2:1;
 var s='';
 function side(x0,title,col,env,up,sub,msg){
  var g=R(x0,60,420,428,'#fff',16,' stroke="'+col+'" stroke-width="3"')+tx(x0+210,90,title,20,col,900)+tx(x0+210,112,sub,12,G,800);
  var ys=[396,296,196],bt=[20,10,0];
  g+=tx(x0+246,136,W[2],11,'#8a3b00',900)+tx(x0+353,136,W[3],11,G,900);
  ys.forEach(function(y,i){
   g+='<line x1="'+(x0+20)+'" y1="'+y+'" x2="'+(x0+400)+'" y2="'+y+'" stroke="#E3E9EF" stroke-dasharray="5 5"/>'+tx(x0+26,y-6,i+' km',11,G,800,'start');
   var warm=bt[i]>env[i], cold=bt[i]<env[i];
   g+=R(x0+206,y-34,80,26,warm?'#FDE0C8':(cold?'#DCEBFA':'#EEF3F8'),13)+tx(x0+246,y-16,String(bt[i]).replace('-','−')+'℃',14,warm?'#8a3b00':(cold?'#1d4d8a':D),900);
   g+=tx(x0+302,y-16,warm?'&gt;':(cold?'&lt;':'='),16,D,900);
   g+=R(x0+318,y-34,70,26,'#EEF3F8',13)+tx(x0+353,y-16,String(env[i]).replace('-','−')+'℃',14,D,800)});
  g+=R(x0+20,402,380,14,'#9CC98B',4);
  /* 風船 */
  var top=up?196:296, kp=up?'0;1;1':'0;1;0';
  g+='<g><ellipse cx="0" cy="-20" rx="20" ry="24" fill="'+(up?'#F5A15B':'#8FB8E8')+'" stroke="#34495e" stroke-width="2"/><path d="M0 4 l-4 7 h8 z" fill="#34495e"/><line x1="0" y1="11" x2="0" y2="24" stroke="#34495e" stroke-width="1.5"/>'+
   '<animateMotion dur="8s" repeatCount="indefinite" keyPoints="'+kp+'" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1" path="M'+(x0+110)+' 384 L'+(x0+110)+' '+(top-12)+'"/></g>';
  if(up){g+='<g opacity="0"><g transform="translate('+(x0+110)+' 196)"><ellipse cx="0" cy="-10" rx="44" ry="26" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/><ellipse cx="-30" cy="6" rx="26" ry="16" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/><ellipse cx="30" cy="6" rx="26" ry="16" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/><ellipse cx="0" cy="-34" rx="26" ry="20" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/></g><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.45;.55;.92;1" dur="8s" repeatCount="indefinite"/></g>'}
  else{g+='<g opacity="0"><path d="M'+(x0+140)+' 280 v40" stroke="#1d4d8a" stroke-width="4" stroke-linecap="round"/><path d="M'+(x0+132)+' 312 l8 10 l8 -10" fill="none" stroke="#1d4d8a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.45;.5;.8;1" dur="8s" repeatCount="indefinite"/></g>'}
  g+=R(x0+20,428,380,52,up?'#FDE7D3':'#DCEBFA',12)+WR(x0+210,458,msg,12.5,up?'#8a3b00':'#1d4d8a',900,360);
  return g}
 var A=side(0,W[0],B,[20,16,12],false,W[7],W[4]),Bs=side(0,W[1],O,[20,8,-4],true,W[8],W[5]);
 if(nar){s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 935" role="img">'+R(0,0,460,935,'#F7FAFD')+R(20,6,420,50,'#FFF6E5',10)+WR(230,33,W[6],14,'#8a5a00',800,400)+'<g transform="translate(20 0)">'+A+'</g><g transform="translate(20 445)">'+Bs+'</g>'}
 else{s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" role="img">'+R(0,0,900,500,'#F7FAFD')+R(20,12,860,36,'#FFF6E5',10)+tx(450,36,W[6],14,'#8a5a00',800)+'<g transform="translate(20 0)">'+A+'</g><g transform="translate(460 0)">'+Bs+'</g>'}
 K=1;return s+'</svg>'},

/* 4 逆転層は「暖かいふた」：煙が上がれず横に広がり、下に霧やもやがたまる */
met_inversion:function(l){
 var W=({ja:['逆転層（暖かいふた）','ふたの下：煙・霧・もやがたまる','ふたの上：空気が澄んでいる','気温','高さ','ふつうは上ほど寒い','逆転層では上ほど暖かい','ふたの上と下で風が急に変わる（ウインドシア）'],
  ko:['역전층(따뜻한 뚜껑)','뚜껑 아래: 연기·안개·박무가 고인다','뚜껑 위: 공기가 맑다','기온','높이','보통은 위로 갈수록 춥다','역전층에서는 위로 갈수록 따뜻하다','뚜껑 위아래에서 바람이 갑자기 바뀐다(윈드시어)'],
  en:['Inversion (a warm lid)','Under the lid: smoke, fog and haze are trapped','Above the lid: clear air','Temperature','Height','Normally colder higher up','In an inversion, warmer higher up','Wind changes suddenly above and below the lid (wind shear)']})[l]||['逆転層（暖かいふた）','ふたの下：煙・霧・もやがたまる','ふたの上：空気が澄んでいる','気温','高さ','ふつうは上ほど寒い','逆転層では上ほど暖かい','ふたの上と下で風が急に変わる（ウインドシア）'];
 var nar=NARROW();K=nar?1.3:1;
 var s='';
 s+='<defs><linearGradient id="miL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD9A8" stop-opacity=".2"/><stop offset=".5" stop-color="#FFB870" stop-opacity=".75"/><stop offset="1" stop-color="#FFD9A8" stop-opacity=".2"/></linearGradient></defs>';
 /* 空 */
 s+=R(20,20,560,400,'#DCEEFB',14)+R(20,20,560,120,'#CBE6FA',14);
 /* ふた */
 s+=R(20,150,560,60,'url(#miL)')+tx(300,186,W[0],18,'#8a3b00',900);
 s+=tx(300,70,W[2],14,'#1d4d8a',800);
 /* 町と煙突 */
 s+=R(20,360,560,60,'#9CC98B',0)+R(60,300,60,60,'#C7CFD8')+R(140,320,50,40,'#B4BEC9')+R(420,310,70,50,'#C7CFD8')+R(505,330,50,30,'#B4BEC9');
 s+=R(250,250,26,110,'#8C96A1')+R(246,244,34,10,'#6B7785');
 /* 煙：上がって、ふたで横に広がる */
 for(var i=0;i<6;i++){var dl=(i*1.1).toFixed(1);
  s+='<circle r="12" fill="#9AA3AD" opacity="0"><animateMotion dur="6.6s" begin="'+dl+'s" repeatCount="indefinite" path="M263 240 L263 222 L263 212 Q263 205 '+(i%2?330:196)+' 210 L'+(i%2?520:60)+' 214"/><animate attributeName="opacity" values="0;.8;.8;.5;0" keyTimes="0;.1;.4;.8;1" dur="6.6s" begin="'+dl+'s" repeatCount="indefinite"/><animate attributeName="r" values="8;14;20;26" dur="6.6s" begin="'+dl+'s" repeatCount="indefinite"/></circle>'}
 /* 霧 */
 s+='<g opacity=".55"><rect x="20" y="300" width="560" height="60" fill="#fff"><animate attributeName="opacity" values=".3;.8;.3" dur="5s" repeatCount="indefinite"/></rect></g>';
 s+=tx(300,290,W[1],13,'#34495e',800);
 /* 風の矢印（ふたの上と下で違う） */
 s+='<g stroke="'+P+'" stroke-width="4" stroke-linecap="round" fill="none"><path d="M60 120 h120"/><path d="M168 112 l12 8 l-12 8"/><path d="M60 240 h40"/><path d="M92 232 l8 8 l-8 8"/></g>'+tx(190,124,'40 kt',12,P,800,'start')+tx(110,244,'5 kt',12,P,800,'start');
 s+=WR(300,142,W[7],12,P,800,540);
 /* 気温の図 */
 var sS=s;s='';K=nar?1.1:1;
 s+=R(610,20,270,416,'#fff',14,' stroke="#D9E3EC"')+tx(745,48,W[3]+' × '+W[4],13,G,800);
 s+='<line x1="650" y1="380" x2="860" y2="380" stroke="'+G+'"/><line x1="650" y1="380" x2="650" y2="70" stroke="'+G+'"/>';
 s+='<path d="M770 380 L722 252 L800 188 L752 70" fill="none" stroke="'+RD+'" stroke-width="4" stroke-linejoin="round" stroke-dasharray="500" stroke-dashoffset="500"><animate attributeName="stroke-dashoffset" values="500;0;0" keyTimes="0;.6;1" dur="6s" repeatCount="indefinite"/></path>';
 s+=R(652,188,206,64,'#FFB870',0,' opacity=".25"');
 s+=tx(745,428,'↖ '+W[5],11,RD,800)+tx(826,226,'↗',18,RD,900)+tx(862,392,W[3]+' →',11,G,800,'end')+tx(660,64,'↑ '+W[4],11,G,800,'start');
 s+=tx(745,410,'↗ '+W[6],12,'#8a3b00',800);
 K=1;
 if(nar)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" role="img">'+R(0,0,600,900,'#F7FAFD')+'<g transform="translate(0 0)">'+sS+'</g><g transform="translate(-445 448)">'+s+'</g></svg>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 446" role="img">'+R(0,0,900,446,'#F7FAFD')+sS+s+'</svg>'}
};
for(var k in F)window.FIGS[k]=F[k];
})();
