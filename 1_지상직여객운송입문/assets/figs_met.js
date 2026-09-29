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

/* 前線の記号を線に沿って描く。pts：[[x,y],…]、type：cold・warm・stat・occl、side：記号を出す向き（1か−1）、sp：記号の間隔 */
function FR(pts,type,side,sp,sw){sp=sp||34;sw=sw||4;side=side||1;
 var col={cold:'#2F6FD6',warm:'#D64545',stat:'#2F6FD6',occl:'#7B4FB0'}[type];
 var d='M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join(' L');
 var g='<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+sw+'" stroke-linejoin="round" stroke-linecap="round"/>';
 if(type==='stat')g+='<path d="'+d+'" fill="none" stroke="#D64545" stroke-width="'+sw+'" stroke-dasharray="'+sp/2+' '+sp/2+'" stroke-dashoffset="'+(-sp/4)+'"/>';
 var segs=[],tot=0;for(var i=1;i<pts.length;i++){var dx=pts[i][0]-pts[i-1][0],dy=pts[i][1]-pts[i-1][1],l=Math.sqrt(dx*dx+dy*dy);segs.push([pts[i-1],dx/l,dy/l,l]);tot+=l}
 var k=0;for(var s=sp/2;s<tot;s+=sp){var acc=0,sg=null;for(var j=0;j<segs.length;j++){if(acc+segs[j][3]>=s){sg=segs[j];break}acc+=segs[j][3]}if(!sg)break;
  var u=s-acc,px=sg[0][0]+sg[1]*u,py=sg[0][1]+sg[2]*u,tx_=sg[1],ty_=sg[2],nx=-ty_*side,ny=tx_*side,kind;
  if(type==='cold')kind='t';else if(type==='warm')kind='s';else kind=(k%2?'s':'t');
  var c=type==='occl'?col:(kind==='t'?'#2F6FD6':'#D64545'),sd=(type==='stat'&&kind==='s')?-1:1;
  if(kind==='t')g+='<path d="M'+(px-tx_*7).toFixed(1)+' '+(py-ty_*7).toFixed(1)+' L'+(px+nx*sd*10).toFixed(1)+' '+(py+ny*sd*10).toFixed(1)+' L'+(px+tx_*7).toFixed(1)+' '+(py+ty_*7).toFixed(1)+' Z" fill="'+c+'"/>';
  else{var q=[];for(var a=0;a<=8;a++){var th=Math.PI*a/8;q.push((px-tx_*7*Math.cos(th)+nx*sd*7*Math.sin(th)).toFixed(1)+' '+(py-ty_*7*Math.cos(th)+ny*sd*7*Math.sin(th)).toFixed(1))}g+='<path d="M'+q.join(' L')+' Z" fill="'+c+'"/>'}
  k++}
 return g}
function ARW(x1,y1,x2,y2,c,w){var dx=x2-x1,dy=y2-y1,l=Math.sqrt(dx*dx+dy*dy),ux=dx/l,uy=dy/l;return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+c+'" stroke-width="'+(w||4)+'" stroke-linecap="round" fill="none"/><path d="M'+(x2-ux*12-uy*7).toFixed(1)+' '+(y2-uy*12+ux*7).toFixed(1)+' L'+x2+' '+y2+' L'+(x2-ux*12+uy*7).toFixed(1)+' '+(y2-uy*12-ux*7).toFixed(1)+'" stroke="'+c+'" stroke-width="'+(w||4)+'" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'}
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
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 446" role="img">'+R(0,0,900,446,'#F7FAFD')+sS+s+'</svg>'},
/* 5 日本・韓国の周りの気団：季節ごとにやってくる5つの気団 */
met_airmass:function(l){
 var W=({ja:{ttl:'日本・韓国の周りの気団',kr:'韓国',jp:'日本',sea:'海',land:'大陸',
   m:[['シベリア気団','cPk','冬','冷たい・乾いている'],['オホーツク海気団','mPk','梅雨〜初夏','冷たい・湿っている'],['小笠原気団','mTw','夏','暑い・湿っている'],['揚子江気団','cT','春・秋','暖かい・乾いている'],['赤道気団','mE','台風の季節','とても暑く湿っている']],
   lg:'記号の読み方',l1:['c','大陸の上で育つ → 乾いている'],l2:['m','海の上で育つ → 湿っている'],l3:['P・T・E','P：寒い地方　T：暑い地方　E：赤道'],l4:['k・w','k：下の地面より冷たい　w：下の地面より暖かい']},
  ko:{ttl:'한국·일본 주변의 기단',kr:'한국',jp:'일본',sea:'바다',land:'대륙',
   m:[['시베리아 기단','cPk','겨울','차갑고 건조하다'],['오호츠크해 기단','mPk','늦봄~초여름','차갑고 습하다'],['북태평양 기단(오가사와라)','mTw','여름','덥고 습하다'],['양쯔강 기단','cT','봄·가을','따뜻하고 건조하다'],['적도 기단','mE','태풍철','매우 덥고 습하다']],
   lg:'기호 읽는 법',l1:['c','대륙 위에서 생김 → 건조하다'],l2:['m','바다 위에서 생김 → 습하다'],l3:['P·T·E','P: 추운 지방  T: 더운 지방  E: 적도'],l4:['k·w','k: 아래 지면보다 차갑다  w: 아래 지면보다 따뜻하다']},
  en:{ttl:'Air masses around Korea and Japan',kr:'Korea',jp:'Japan',sea:'Ocean',land:'Continent',
   m:[['Siberian air mass','cPk','Winter','Cold and dry'],['Okhotsk Sea air mass','mPk','Rainy season to early summer','Cold and moist'],['Ogasawara (North Pacific) air mass','mTw','Summer','Hot and moist'],['Yangtze air mass','cT','Spring and autumn','Warm and dry'],['Equatorial air mass','mE','Typhoon season','Very hot and moist']],
   lg:'Reading the codes',l1:['c','Formed over land → dry'],l2:['m','Formed over sea → moist'],l3:['P · T · E','P: polar  T: tropical  E: equatorial'],l4:['k · w','k: colder than the ground below  w: warmer than the ground below']}})[l];
 if(!W)return F.met_airmass('ja');
 var nar=NARROW();K=nar?1.25:1;
 var s='<defs><radialGradient id="amg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>';
 s+=R(10,10,560,500,'#CFE8F7',16);
 s+='<path d="M10 10 H430 V40 Q360 70 330 120 L306 146 L302 168 L270 176 Q250 200 236 230 L190 300 Q130 350 10 360 Z" fill="#EADFC6"/>';
 s+=tx(90,200,W.land,16,'#9C8A62',900)+tx(470,330,W.sea,16,'#7FA6C4',900);
 s+='<path d="M268 146 L300 150 L298 214 L288 250 L272 258 L262 232 L256 200 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="2"/>'+tx(250,282,W.kr,13,'#2F5E24',900);
 s+='<path d="M300 300 Q340 288 362 258 Q392 218 402 178 Q412 146 432 124 L442 132 Q428 156 420 184 Q408 228 378 266 Q352 296 312 310 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="2"/>'+tx(392,300,W.jp,13,'#2F5E24',900);
 var C=[[120,92,'#5E8FD9'],[470,82,'#86C5E8'],[478,418,'#F08A5D'],[118,420,'#E8C35A'],[300,448,'#E86A6A']],cx=320,cy=225;
 W.m.forEach(function(m,i){var x=C[i][0],y=C[i][1],c=C[i][2],dx=cx-x,dy=cy-y,dl=Math.sqrt(dx*dx+dy*dy),ux=dx/dl,uy=dy/dl,r=i===4?60:66;
  var ax1=x+ux*(r+6),ay1=y+uy*(r+6),ax2=x+ux*(r+46),ay2=y+uy*(r+46);
  s+='<g>'+ARW(ax1.toFixed(0),ay1.toFixed(0),ax2.toFixed(0),ay2.toFixed(0),c,6)+'<animate attributeName="opacity" values=".25;1;.25" dur="3s" begin="'+(i*0.6)+'s" repeatCount="indefinite"/></g>';
  s+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+c+'" opacity=".9"/><circle cx="'+(x-r*.3)+'" cy="'+(y-r*.35)+'" r="'+r*.55+'" fill="url(#amg)"/>';
  s+=WR(x,y-r*.42,m[0],12.5,'#fff',900,r*1.8)+tx(x,y+2,m[1],15,'#fff',900)+tx(x,y+r*.36,m[2],11.5,'#fff',800)+tx(x,y+r*.36+15*K,m[3],10.5,'#fff',700)});
 s+=tx(290,36,W.ttl,15,'#0f3558',900);
 var sm=s;s='';K=nar?1.1:1;
 s+=R(590,10,300,500,'#fff',16,' stroke="#D9E3EC"')+tx(740,44,W.lg,16,D,900);
 [W.l1,W.l2,W.l3,W.l4].forEach(function(v,i){var y=84+i*104;s+=R(606,y,268,90,['#F4EEDC','#E3F1FB','#FDE9DE','#EAF4EA'][i],12)+tx(740,y+30,v[0],20,D,900)+WR(740,y+62,v[1],12,D,700,250)});
 var lg=s;K=1;
 if(nar)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 1050" role="img">'+R(0,0,580,1050,'#F7FAFD')+sm+'<g transform="translate(20 522) scale(1.8) translate(-596 -8)">'+lg+'</g></svg>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" role="img">'+R(0,0,900,520,'#F7FAFD')+sm+lg+'</svg>'},

/* 6 寒冷前線と温暖前線の断面：冷たい空気がもぐり込む急な前線と、暖かい空気がはい上がるゆるい前線 */
met_fronts:function(l){
 var W=({ja:{c:'寒冷前線',w:'温暖前線',cold:'冷たい空気',warm:'暖かい空気',go:'進む向き',
   c1:'冷たい空気が暖かい空気の下にもぐり込む',c2:'急な坂（約1/50〜1/100）',c3:'積乱雲・強いにわか雨・雷・突風',c4:'悪天の幅はせまい（数十km）',
   w1:'暖かい空気が冷たい空気の上をはい上がる',w2:'ゆるい坂（約1/100〜1/300）',w3:'層状の雲：巻雲→巻層雲→高層雲→乱層雲',w4:'しとしと雨・低い雲が広い範囲（数百km）',rain:'雨'},
  ko:{c:'한랭전선',w:'온난전선',cold:'찬 공기',warm:'따뜻한 공기',go:'나아가는 방향',
   c1:'찬 공기가 따뜻한 공기 아래로 파고든다',c2:'가파른 경사(약 1/50~1/100)',c3:'적란운·강한 소나기·뇌우·돌풍',c4:'악천후 폭은 좁다(수십 km)',
   w1:'따뜻한 공기가 찬 공기 위를 타고 오른다',w2:'완만한 경사(약 1/100~1/300)',w3:'층상 구름: 권운→권층운→고층운→난층운',w4:'부슬비·낮은 구름이 넓은 범위(수백 km)',rain:'비'},
  en:{c:'Cold front',w:'Warm front',cold:'Cold air',warm:'Warm air',go:'Direction of travel',
   c1:'Cold air pushes in under the warm air',c2:'Steep slope (about 1/50–1/100)',c3:'Cumulonimbus, heavy showers, thunder, gusts',c4:'A narrow band of bad weather (tens of km)',
   w1:'Warm air slides up over the cold air',w2:'Gentle slope (about 1/100–1/300)',w3:'Layer cloud: Ci → Cs → As → Ns',w4:'Steady rain and low cloud over a wide area (hundreds of km)',rain:'Rain'}})[l];
 if(!W)return F.met_fronts('ja');
 var nar=NARROW();K=nar?1.2:1;
 function cb(x,y,s){return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-40 60 Q-46 20 -26 8 Q-30 -30 0 -36 Q6 -70 30 -60 Q44 -86 64 -70 L90 -78 L70 -64 Q86 -40 70 -20 Q86 10 60 30 Q66 56 40 60 Z" fill="#DCE3EA" stroke="#8C9BAA" stroke-width="2"/></g>'}
 function panelC(){var g=R(0,0,430,478,'#fff',16,' stroke="#2F6FD6" stroke-width="3"')+tx(215,34,W.c,22,'#2F6FD6',900);
  g+=R(12,50,406,300,'#FFF1E3',10);
  g+='<g><path d="M12 350 L12 176 Q120 190 186 262 Q206 300 218 350 Z" fill="#9CC4F0"/><animateTransform attributeName="transform" type="translate" values="0 0;46 0;46 0" keyTimes="0;.8;1" dur="7s" repeatCount="indefinite"/></g>';
  g+=tx(80,300,W.cold,14,'#1d4d8a',900)+tx(352,262,W.warm,14,'#8a3b00',900);
  g+='<g>'+cb(236,176,1.05)+'<animate attributeName="opacity" values=".6;1;.6" dur="3s" repeatCount="indefinite"/></g>';
  g+='<g stroke="#5E8FD9" stroke-width="2.5" stroke-linecap="round">';for(var i=0;i<6;i++)g+='<line x1="'+(222+i*12)+'" y1="246" x2="'+(216+i*12)+'" y2="262"><animate attributeName="y1" values="246;300" dur=".9s" begin="'+(i*.15)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="262;316" dur=".9s" begin="'+(i*.15)+'s" repeatCount="indefinite"/></line>';g+='</g>';
  g+='<g>'+ARW(248,320,300,180,'#E08A2F',4)+'<animate attributeName="opacity" values=".2;1;.2" dur="2.4s" repeatCount="indefinite"/></g>';
  g+=ARW(40,340,120,340,'#2F6FD6',5)+tx(130,345,W.go,12,'#2F6FD6',800,'start');
  g+=R(12,350,406,6,'#9CC98B');
  g+=WR(215,380,W.c1,12.5,D,800,396)+WR(215,405,W.c2,11.5,G,700,396)+WR(215,428,W.c4,11.5,G,700,396)+WR(215,455,W.c3,12,RD,800,396);
  return g}
 function panelW(){var g=R(0,0,430,478,'#fff',16,' stroke="#D64545" stroke-width="3"')+tx(215,34,W.w,22,'#D64545',900);
  g+=R(12,50,406,300,'#FFF1E3',10);
  g+='<path d="M418 350 L418 238 Q260 290 12 342 L12 350 Z" fill="#9CC4F0"/>';
  g+=tx(360,322,W.cold,14,'#1d4d8a',900)+tx(80,150,W.warm,14,'#8a3b00',900);
  var cl=[[372,82,'Ci',.55],[312,110,'Cs',.7],[236,150,'As',.9],[140,212,'Ns',1.15]];
  cl.forEach(function(c,i){g+='<g opacity="0"><g transform="translate('+c[0]+' '+c[1]+') scale('+c[3]+')"><ellipse cx="0" cy="0" rx="46" ry="'+(i<2?7:14)+'" fill="'+(i<2?'#EDF2F7':'#D5DDE5')+'" stroke="#9FB0C2" stroke-width="1.5"/></g>'+tx(c[0],c[1]+5,c[2],12,'#40566B',900)+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+(0.1+i*0.15).toFixed(2)+';'+(0.18+i*0.15).toFixed(2)+';.92;1" dur="8s" repeatCount="indefinite"/></g>'});
  g+='<g stroke="#5E8FD9" stroke-width="2" stroke-linecap="round" opacity=".85">';for(var i=0;i<10;i++)g+='<line x1="'+(70+i*16)+'" y1="238" x2="'+(66+i*16)+'" y2="252"><animate attributeName="y1" values="238;320" dur="1.6s" begin="'+(i*.16)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="252;334" dur="1.6s" begin="'+(i*.16)+'s" repeatCount="indefinite"/></line>';g+='</g>';
  g+='<g><circle r="7" fill="#E08A2F"/><animateMotion dur="4s" repeatCount="indefinite" path="M40 330 Q200 300 400 250"/></g><g><circle r="7" fill="#E08A2F"/><animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M40 330 Q200 300 400 250"/></g>';
  g+=ARW(40,62,120,62,'#D64545',5)+tx(130,67,W.go,12,'#D64545',800,'start');
  g+=R(12,350,406,6,'#9CC98B');
  g+=WR(215,380,W.w1,12.5,D,800,396)+WR(215,405,W.w2,11.5,G,700,396)+WR(215,428,W.w3,11.5,G,700,396)+WR(215,458,W.w4,12,'#1d4d8a',800,396);
  return g}
 var a=panelC(),b=panelW(),s;K=1;
 if(nar)s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 1000" role="img">'+R(0,0,460,1000,'#F7FAFD')+'<g transform="translate(15 10)">'+a+'</g><g transform="translate(15 508)">'+b+'</g>';
 else s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 498" role="img">'+R(0,0,900,498,'#F7FAFD')+'<g transform="translate(15 10)">'+a+'</g><g transform="translate(455 10)">'+b+'</g>';
 return s+'</svg>'},

/* 7 天気図の前線と低気圧：前線の記号4種類と、低気圧の周りの天気 */
met_front_map:function(l){
 var W=({ja:{t:'天気図の低気圧と前線',L:'低',sec:'暖域（暖かい区域）',sh:'にわか雨・雷',rn:'広い範囲の雨',cold:'寒冷前線',warm:'温暖前線',stat:'停滞前線',occl:'閉塞前線',lg:'前線の記号',
   d:['記号の向きが前線の進む方向','赤い半円が進む方向','ほとんど動かない（梅雨前線など）','寒冷前線が温暖前線に追いついた'],nw:'北西の風に変わる',sw:'南寄りの風'},
  ko:{t:'일기도의 저기압과 전선',L:'저',sec:'난역(따뜻한 구역)',sh:'소나기·뇌우',rn:'넓은 범위의 비',cold:'한랭전선',warm:'온난전선',stat:'정체전선',occl:'폐색전선',lg:'전선 기호',
   d:['기호가 향한 쪽이 전선이 나아가는 방향','빨간 반원이 나아가는 방향','거의 움직이지 않는다(장마전선 등)','한랭전선이 온난전선을 따라잡았다'],nw:'북서풍으로 바뀐다',sw:'남쪽 바람'},
  en:{t:'A low and its fronts on a weather chart',L:'L',sec:'Warm sector',sh:'Showers, thunder',rn:'Widespread rain',cold:'Cold front',warm:'Warm front',stat:'Stationary front',occl:'Occluded front',lg:'Front symbols',
   d:['Triangles point the way the front moves','Semicircles point the way it moves','Hardly moves (e.g. the rainy-season front)','The cold front has caught the warm front'],nw:'Wind shifts to northwest',sw:'Southerly wind'}})[l];
 if(!W)return F.met_front_map('ja');
 var nar=NARROW();K=nar?1.2:1;
 var s=R(10,10,560,480,'#EEF5FB',16)+tx(290,38,W.t,15,'#0f3558',900);
 s+='<g><animateTransform attributeName="transform" type="translate" values="0 0;40 -6;40 -6" keyTimes="0;.85;1" dur="10s" repeatCount="indefinite"/>';
 s+='<path d="M280 180 L470 238 Q420 330 300 400 Q220 380 200 360 Z" fill="#FFE3C8" opacity=".75"/>'+tx(350,300,W.sec,13,'#8a3b00',900);
 [[70,1],[110,.8],[150,.6]].forEach(function(r){s+='<ellipse cx="280" cy="180" rx="'+r[0]*1.5+'" ry="'+r[0]+'" fill="none" stroke="#9FB0C2" stroke-width="1.5" stroke-dasharray="4 4" opacity="'+r[1]+'"/>'});
 s+='<g opacity=".8">';for(var i=0;i<16;i++){var x=330+((i*37)%190),y=110+((i*53)%72);s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x-4)+'" y2="'+(y+10)+'" stroke="#5E8FD9" stroke-width="2"><animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="'+(i*.1)+'s" repeatCount="indefinite"/></line>'}s+='</g>';
 s+=R(356,78,150,24,'#fff',12,' opacity=".85"')+tx(431,95,W.rn,12,'#1d4d8a',900);
 s+=FR([[280,180],[262,240],[232,300],[196,360],[160,410]],'cold',-1,34);
 s+=FR([[280,180],[340,190],[400,206],[470,238]],'warm',-1,34);
 s+='<g><rect x="160" y="300" width="80" height="24" rx="12" fill="#fff" opacity=".9"/><animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite"/></g>'+tx(200,317,W.sh,11,RD,900);
 s+='<circle cx="280" cy="180" r="22" fill="#fff" stroke="#D64545" stroke-width="3"/>'+tx(280,188,W.L,20,'#D64545',900);
 s+=ARW(150,280,120,240,'#6B4FA0',4)+tx(120,228,W.nw,11,'#6B4FA0',800)+ARW(330,370,360,330,'#E08A2F',4)+tx(372,388,W.sw,11,'#8a3b00',800);
 s+='</g>';
 var mp=s;s='';K=nar?1.1:1;
 s+=R(590,10,300,480,'#fff',16,' stroke="#D9E3EC"')+tx(740,42,W.lg,16,D,900);
 [['cold',W.cold,W.d[0]],['warm',W.warm,W.d[1]],['stat',W.stat,W.d[2]],['occl',W.occl,W.d[3]]].forEach(function(v,i){var y=70+i*104;
  s+=R(606,y,268,92,'#F7FAFD',12)+tx(740,y+22,v[1],14,{cold:'#2F6FD6',warm:'#D64545',stat:'#6B7785',occl:'#7B4FB0'}[v[0]],900)+FR([[630,y+50],[850,y+50]],v[0],-1,36,4)+WR(740,y+78,v[2],11,G,700,252)});
 var lg=s;K=1;
 if(nar)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 1010" role="img">'+R(0,0,580,1010,'#F7FAFD')+mp+'<g transform="translate(20 505) scale(1.8) translate(-596 -8)">'+lg+'</g></svg>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" role="img">'+R(0,0,900,500,'#F7FAFD')+mp+lg+'</svg>'},

/* 8 温帯低気圧の一生：波 → 発達 → 閉塞 → 衰える */
met_cyclone_life:function(l){
 var W=({ja:['前線の上に波ができる','低気圧が発達する（暖域が広い）','寒冷前線が追いつく（閉塞が始まる）','閉塞して衰える','寒い','暖かい','エネルギーのもと：寒気と暖気の温度差'],
  ko:['전선 위에 파동이 생긴다','저기압이 발달한다(난역이 넓다)','한랭전선이 따라잡는다(폐색 시작)','폐색되어 약해진다','춥다','따뜻하다','에너지의 원천: 찬 공기와 따뜻한 공기의 온도 차'],
  en:['A wave forms on a front','The low deepens (wide warm sector)','The cold front catches up (occlusion begins)','Fully occluded, the low weakens','Cold','Warm','Energy source: the temperature contrast between cold and warm air']})[l];
 if(!W)return F.met_cyclone_life('ja');
 var nar=NARROW();K=nar?1.25:1;
 function st(i){var g=R(0,0,200,230,'#fff',14,' stroke="#D9E3EC" stroke-width="2"')+'<circle cx="24" cy="24" r="15" fill="#6B4FA0"/>'+tx(24,30,i+1,15,'#fff',900);
  g+=R(10,46,180,62,'#DCEBFA',0)+R(10,108,180,70,'#FDE7D3',0)+tx(160,64,W[4],10,'#1d4d8a',800)+tx(160,172,W[5],10,'#8a3b00',800);
  if(i===0)g+=FR([[14,110],[70,112],[100,98],[130,112],[186,110]],'stat',1,28,3);
  if(i===1)g+='<path d="M100 96 L170 120 L130 176 Z" fill="#FFD2A8" opacity=".8"/>'+FR([[100,96],[140,104],[176,122]],'warm',-1,26,3)+FR([[100,96],[92,130],[74,170]],'cold',-1,26,3)+'<circle cx="100" cy="96" r="9" fill="#fff" stroke="#D64545" stroke-width="2.5"/>';
  if(i===2)g+='<path d="M118 104 L172 124 L136 170 Z" fill="#FFD2A8" opacity=".8"/>'+FR([[96,86],[118,104]],'occl',-1,22,3)+FR([[118,104],[150,112],[178,126]],'warm',-1,26,3)+FR([[118,104],[106,138],[90,174]],'cold',-1,26,3)+'<circle cx="96" cy="86" r="10" fill="#fff" stroke="#D64545" stroke-width="2.5"/>';
  if(i===3)g+=FR([[86,80],[120,104],[146,118]],'occl',-1,22,3)+FR([[146,118],[178,126]],'warm',-1,26,3)+FR([[146,118],[132,150],[118,176]],'cold',-1,26,3)+'<circle cx="86" cy="80" r="12" fill="#fff" stroke="#9FB0C2" stroke-width="2.5"/>';
  g+=WR(100,206,W[i],11.5,D,800,184);
  g+='<rect x="0" y="0" width="200" height="230" rx="14" fill="none" stroke="#6B4FA0" stroke-width="4" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.03;.22;.25;1" dur="8s" begin="'+(i*2)+'s" repeatCount="indefinite"/></rect>';
  return g}
 var s,ar='<path d="M0 0 l14 0 m-6 -6 l6 6 l-6 6" stroke="#6B4FA0" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
 if(nar){s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 560" role="img">'+R(0,0,440,560,'#F7FAFD');
  [[10,10],[230,10],[10,262],[230,262]].forEach(function(p,i){s+='<g transform="translate('+p[0]+' '+p[1]+')">'+st(i)+'</g>'});
  s+=WR(220,528,W[6],12,'#6B4FA0',900,410)}
 else{s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 290" role="img">'+R(0,0,900,290,'#F7FAFD');
  [0,1,2,3].forEach(function(i){s+='<g transform="translate('+(14+i*222)+' 12)">'+st(i)+'</g>';if(i<3)s+='<g transform="translate('+(218+i*222)+' 126)">'+ar+'</g>'});
  s+=tx(450,272,W[6],13,'#6B4FA0',900)}
 K=1;return s+'</svg>'}
};
for(var k in F)window.FIGS[k]=F[k];
})();
