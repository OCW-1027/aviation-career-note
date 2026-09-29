/* 空中航法と計算（Part 11）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使って window.FIGS に追加する
   ・どの図も lang（ja / ko / en）を受け取り、図の中の文字をその言語で書く
   ・スマートフォン（幅700px未満）では縦に並べるか、横にスクロールさせる */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,ARW=H.ARW,SCR=H.SCR,plane=H.plane,NARROW=H.NARROW,setK=H.setK;
var LBW=H.LBW,TTL=H.TTL;
var D=H.C.D,B=H.C.B,T=H.C.T,O=H.C.O,RD=H.C.RD,P=H.C.P,G=H.C.G;
var F={
/* 1 速度のはしご：IAS → CAS → EAS → TAS → GS */
nav_speeds:function(l){
 var W=({ja:{t:'速度のはしご ― 計器の速度から地面に対する速度まで',s:[['IAS','指示対気速度','計器の針が示す速度'],['CAS','較正対気速度','計器・取り付け位置の誤差を直す'],['EAS','等価対気速度','空気の圧縮の影響を直す（高速・高高度）'],['TAS','真対気速度','空気の薄さ（密度）を直す＝空気に対する本当の速さ'],['GS','対地速度','風を足し引き＝地面に対する速さ']],fx:['誤差の修正','圧縮性の修正','密度の修正','風の修正'],use:['操縦・失速の目安','性能表','高高度の計算','航法・燃料','到着時刻']},
  ko:{t:'속도의 사다리 — 계기 속도에서 지면에 대한 속도까지',s:[['IAS','지시대기속도','계기 바늘이 가리키는 속도'],['CAS','수정대기속도','계기·장착 위치의 오차를 바로잡는다'],['EAS','등가대기속도','공기 압축의 영향을 바로잡는다(고속·고고도)'],['TAS','진대기속도','공기의 옅음(밀도)을 바로잡는다=공기에 대한 진짜 속도'],['GS','대지속도','바람을 더하고 뺀다=지면에 대한 속도']],fx:['오차 수정','압축성 수정','밀도 수정','바람 수정'],use:['조종·실속의 기준','성능표','고고도 계산','항법·연료','도착 시각']},
  en:{t:'The speed ladder: from the instrument to speed over the ground',s:[['IAS','Indicated airspeed','What the needle shows'],['CAS','Calibrated airspeed','Corrects instrument and position error'],['EAS','Equivalent airspeed','Corrects for compressibility (high speed and altitude)'],['TAS','True airspeed','Corrects for air density: true speed through the air'],['GS','Ground speed','Adds or subtracts the wind: speed over the ground']],fx:['Error correction','Compressibility','Density','Wind'],use:['Handling, stall margins','Performance charts','High-altitude calculations','Navigation, fuel','Arrival time']}})[l];
 if(!W)return F.nav_speeds('ja');
 var nar=NARROW();setK(nar?1.3:1);
 var cols=['#6B7785','#2F8FE0','#1F7A6E','#E08A2F','#D64545'];
 var s='';
 if(nar){
  s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 1080" role="img">'+R(0,0,460,1080,'#F7FAFD')+TTL(230,30,W.t,15,'#0f3558',420);
  W.s.forEach(function(v,i){var y=70+i*200,c=cols[i];
   s+='<g>'+R(20,y,420,150,'#fff',16,' stroke="'+c+'" stroke-width="3"')+tx(70,y+62,v[0],30,c,900)+tx(150,y+50,v[1],15,D,900,'start')+WR(290,y+92,v[2],12,G,800,270)+LB(290,y+132,W.use[i],11,'#fff','middle',c)+'<animate attributeName="opacity" values=".45;1;1;.45" keyTimes="0;'+(i*0.18).toFixed(2)+';'+(i*0.18+0.2).toFixed(2)+';1" dur="9s" repeatCount="indefinite"/></g>';
   if(i<4)s+=ARW(230,y+156,230,y+194,'#9FB0C2',5)+LB(300,y+178,W.fx[i],11,'#40566B','start')});
 }else{
  s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+R(0,0,900,380,'#F7FAFD')+TTL(450,30,W.t,15,'#0f3558',860);
  W.s.forEach(function(v,i){var x=14+i*178,c=cols[i];
   s+='<g>'+R(x,60,160,230,'#fff',16,' stroke="'+c+'" stroke-width="3"')+tx(x+80,108,v[0],30,c,900)+WR(x+80,140,v[1],13,D,900,150)+WR(x+80,196,v[2],11.5,G,800,146)+LB(x+80,270,W.use[i],10.5,'#fff','middle',c)+'<animate attributeName="opacity" values=".45;1;1;.45" keyTimes="0;'+(i*0.18).toFixed(2)+';'+(i*0.18+0.2).toFixed(2)+';1" dur="9s" repeatCount="indefinite"/></g>';
   if(i<4)s+=ARW(x+162,176,x+176,176,'#9FB0C2',4)+WR(x+170,330,W.fx[i],10.5,'#40566B',800,120)});
 }
 setK(1);return s+'</svg>'},

/* 2 高く上がると、同じIASでも実際は速い：IAS 250kt のまま TAS が増える */
nav_ias_tas:function(l){
 var W=({ja:{t:'同じIAS 250ktでも、高い所ほど実際は速い',ias:'IAS（計器）',tas:'TAS（本当の速さ）',thin:'高い所は空気が薄い',thick:'低い所は空気が濃い',rule:'目安：TAS ≒ IAS × (1 ＋ 0.02 × 高度[千ft])',h:'高度'},
  ko:{t:'같은 IAS 250kt라도 높은 곳일수록 실제로는 빠르다',ias:'IAS(계기)',tas:'TAS(진짜 속도)',thin:'높은 곳은 공기가 옅다',thick:'낮은 곳은 공기가 짙다',rule:'기준: TAS ≒ IAS × (1 + 0.02 × 고도[천 ft])',h:'고도'},
  en:{t:'Same 250 kt IAS, but faster in reality the higher you go',ias:'IAS (instrument)',tas:'TAS (true speed)',thin:'Thin air up high',thick:'Dense air down low',rule:'Rule of thumb: TAS ≈ IAS × (1 + 0.02 × altitude in thousands of ft)',h:'Altitude'}})[l];
 if(!W)return F.nav_ias_tas('ja');
 var nar=NARROW();setK(nar?1.35:1);
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" role="img">'+R(0,0,640,560,'#F7FAFD')+TTL(320,28,W.t,15,'#0f3558',600);
 s+='<defs><linearGradient id="itg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9FD3F7"/><stop offset="1" stop-color="#2B4F8F"/></linearGradient></defs>'+R(20,54,340,440,'url(#itg)',14)+R(20,494,340,16,'#9CC98B',0);
 /* 空気の粒：下ほど多く */
 var dots='';for(var r=0;r<14;r++){var y=480-r*30,n=Math.max(1,Math.round(14*Math.pow(1-r/14,1.6)));for(var j=0;j<n;j++){var x=32+(j+0.5)*(320/n)+((r%2)?8:-8);dots+='<circle cx="'+x.toFixed(0)+'" cy="'+y+'" r="3.2" fill="#fff" opacity=".65"/>'}}
 s+=dots+LB(190,124,W.thin,11,'#fff','middle','#2B4F8F')+LB(190,466,W.thick,11,'#0f3558','middle','#CFE8F7');
 [[0,'0'],[10,'10,000'],[20,'20,000'],[30,'30,000']].forEach(function(v){var y=494-v[0]*13.5;s+='<line x1="20" y1="'+y+'" x2="360" y2="'+y+'" stroke="#fff" stroke-dasharray="6 6" opacity=".5"/>'+tx(30,y-4,v[1]+' ft',10.5,'#fff',800,'start')});
 s+='<g>'+plane('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;.85;1" calcMode="linear" path="M70 494 L320 89"/></g>';
 /* 計器：値を時間で切り替える */
 function gauge(cx,cy,lab,col,vals){var g='<circle cx="'+cx+'" cy="'+cy+'" r="62" fill="#fff" stroke="'+col+'" stroke-width="4"/>'+tx(cx,cy-74,lab,12,col,900),fs=(26*(nar?1.3:1)).toFixed(0),n=vals.length;
  vals.forEach(function(v,i){var a=i/n*0.85,b=(i+1)/n*0.85;if(i===n-1)b=1;var kt,vs;
   if(n===1){g+='<text x="'+cx+'" y="'+(cy+10)+'" font-size="'+fs+'" font-weight="900" fill="'+col+'" text-anchor="middle" font-family="Arial,sans-serif">'+v+'</text>';return}
   if(i===0){kt='0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1';vs='1;1;0;0'}
   else if(i===n-1){kt='0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1';vs='0;0;1;1'}
   else{kt='0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1';vs='0;0;1;1;0;0'}
   g+='<text x="'+cx+'" y="'+(cy+10)+'" font-size="'+fs+'" font-weight="900" fill="'+col+'" text-anchor="middle" font-family="Arial,sans-serif" opacity="'+(i===0?1:0)+'">'+v+'<animate attributeName="opacity" values="'+vs+'" keyTimes="'+kt+'" dur="8s" repeatCount="indefinite"/></text>'});
  return g+tx(cx,cy+34,'kt',12,G,800)}
 s+=gauge(500,150,W.ias,'#6B7785',['250'])+gauge(500,360,W.tas,'#E08A2F',['265','295','325','355','385','400']);
 s+=LB(320,540,W.rule,11,'#0f3558','middle','#FFF1E3');
 setK(1);return s+'</svg>'},

/* 3 音の速さとマック数：気温が下がると音は遅くなる。同じM0.80でも高い所では実際の速さが小さい */
nav_mach:function(l){
 var W=({ja:{t:'音の速さとマック数',a0:'地上（15℃）：音の速さ 約661kt',a1:'上空（−56.5℃）：音の速さ 約573kt',m0:'M0.80 ＝ 約529kt',m1:'M0.80 ＝ 約458kt',rule:'音の速さ（kt）≒ 38.94 × √（気温[℃] ＋ 273）',why:'空気が冷たいほど、音はゆっくり伝わる',cr:'上昇はIAS一定 → ある高度からマック数一定（クロスオーバー）'},
  ko:{t:'소리의 빠르기와 마하수',a0:'지상(15℃): 소리의 빠르기 약 661kt',a1:'상공(−56.5℃): 소리의 빠르기 약 573kt',m0:'M0.80 = 약 529kt',m1:'M0.80 = 약 458kt',rule:'소리의 빠르기(kt) ≒ 38.94 × √(기온[℃] + 273)',why:'공기가 찰수록 소리는 천천히 전해진다',cr:'상승은 IAS 일정 → 어느 고도부터 마하수 일정(크로스오버)'},
  en:{t:'The speed of sound and Mach number',a0:'Ground (15 °C): speed of sound about 661 kt',a1:'Aloft (−56.5 °C): speed of sound about 573 kt',m0:'M0.80 = about 529 kt',m1:'M0.80 = about 458 kt',rule:'Speed of sound (kt) ≈ 38.94 × √(temperature in °C + 273)',why:'The colder the air, the more slowly sound travels',cr:'Climb at constant IAS, then constant Mach above the crossover altitude'}})[l];
 if(!W)return F.nav_mach('ja');
 var nar=NARROW();setK(nar?1.3:1);
 function lane(y,col,ac,mc,dur){var g=R(20,y,600,120,'#fff',14,' stroke="'+col+'" stroke-width="2"');
  g+='<g>';for(var i=0;i<4;i++)g+='<circle cx="80" cy="'+(y+60)+'" r="10" fill="none" stroke="'+col+'" stroke-width="3" opacity="0"><animate attributeName="r" values="10;520" dur="'+dur+'s" begin="'+(i*dur/4).toFixed(2)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="'+dur+'s" begin="'+(i*dur/4).toFixed(2)+'s" repeatCount="indefinite"/></circle>';g+='</g>';
  g+='<circle cx="80" cy="'+(y+60)+'" r="12" fill="'+col+'"/>'+tx(80,y+65,'♪',14,'#fff',900);
  g+=LB(340,y+36,ac,12,col,'middle')+LB(340,y+96,mc,13,'#fff','middle',col);
  return g}
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 520" role="img">'+R(0,0,640,520,'#F7FAFD')+TTL(320,28,W.t,15,'#0f3558',600);
 s+='<defs><clipPath id="mcl1"><rect x="20" y="56" width="600" height="120" rx="14"/></clipPath><clipPath id="mcl2"><rect x="20" y="196" width="600" height="120" rx="14"/></clipPath></defs>';
 s+='<g clip-path="url(#mcl1)">'+lane(56,'#E08A2F',W.a0,W.m0,2.4)+'</g><g clip-path="url(#mcl2)">'+lane(196,'#2F6FD6',W.a1,W.m1,2.8)+'</g>';
 s+=R(20,334,600,170,'#fff',14,' stroke="#D9E3EC"')+WR(320,366,W.why,12.5,D,900,570)+WR(320,408,W.rule,12,'#8a3b00',900,570);
 s+=WR(320,462,W.cr,11.5,'#40566B',800,570);
 setK(1);return s+'</svg>'},

/* 4 暑い日の離陸：同じ空港でも、暑いと空気が薄く、離陸の滑走が長くなる（密度高度） */
nav_densalt:function(l){
 var W=({ja:{t:'密度高度：暑い日は「高い空港」と同じ',cool:'涼しい日（15℃）',hot:'暑い日（35℃）',da0:'密度高度 ≒ 空港の標高',da1:'密度高度 ≒ 標高 ＋ 約2,400ft',roll:'離陸の滑走',rule:'目安：密度高度 ≒ 気圧高度 ＋ 120ft ×（気温 − 標準の気温）',eff:'空気が薄い → エンジンの力と翼の揚力が小さい → 長く走る'},
  ko:{t:'밀도고도: 더운 날은 ‘높은 공항’과 같다',cool:'선선한 날(15℃)',hot:'더운 날(35℃)',da0:'밀도고도 ≒ 공항 표고',da1:'밀도고도 ≒ 표고 + 약 2,400ft',roll:'이륙 활주',rule:'기준: 밀도고도 ≒ 기압고도 + 120ft × (기온 − 표준 기온)',eff:'공기가 옅다 → 엔진 힘과 날개 양력이 작다 → 오래 달린다'},
  en:{t:'Density altitude: a hot day is like a higher airport',cool:'Cool day (15 °C)',hot:'Hot day (35 °C)',da0:'Density altitude ≈ field elevation',da1:'Density altitude ≈ elevation + about 2,400 ft',roll:'Take-off roll',rule:'Rule of thumb: density altitude ≈ pressure altitude + 120 ft × (temperature − standard temperature)',eff:'Thinner air → less engine thrust and wing lift → a longer run'}})[l];
 if(!W)return F.nav_densalt('ja');
 var nar=NARROW();setK(nar?1.3:1);
 function rw(y,lab,da,col,end,dur,sun){var g=R(20,y,600,150,'#fff',14,' stroke="'+col+'" stroke-width="2"')+tx(40,y+30,lab,14,col,900,'start')+(sun?'<circle cx="590" cy="'+(y+28)+'" r="14" fill="#F2B233"><animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/></circle>':'');
  g+=R(40,y+96,560,26,'#5B6770',6)+'<line x1="50" y1="'+(y+109)+'" x2="590" y2="'+(y+109)+'" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>';
  g+='<rect x="60" y="'+(y+86)+'" width="0" height="6" rx="3" fill="'+col+'" opacity=".6"><animate attributeName="width" values="0;'+(end-60)+';'+(end-60)+'" keyTimes="0;.7;1" dur="'+dur+'s" repeatCount="indefinite"/></rect>';
  g+='<g>'+plane('#fff')+'<animateMotion dur="'+dur+'s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.7;1" calcMode="linear" path="M60 '+(y+100)+' L'+end+' '+(y+100)+' L'+(end+40)+' '+(y+70)+'"/></g>';
  g+=LB(330,y+62,da,11.5,'#fff','middle',col)+tx(end,y+144,'▲',12,col,900);
  return g}
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 520" role="img">'+R(0,0,640,520,'#F7FAFD')+TTL(320,28,W.t,15,'#0f3558',600);
 s+=rw(50,W.cool,W.da0,'#2F8FE0',330,5,false)+rw(214,W.hot,W.da1,'#D64545',470,5,true);
 var LI=H.LINES,FS=H.FS,n1=LI(W.eff,12,560).length,n2=LI(W.rule,11.5,560).length,l1=FS(12)*1.3,l2=FS(11.5)*1.3,y=392,bh=n1*l1+n2*l2+34;
 s+=R(20,y,600,bh,'#fff',14,' stroke="#D9E3EC"')+WR(320,y+12+n1*l1/2+FS(12)*0.3,W.eff,12,D,900,560)+WR(320,y+22+n1*l1+n2*l2/2+FS(11.5)*0.3,W.rule,11.5,'#8a3b00',900,560);
 var HH=y+bh+12;s=s.replace('viewBox="0 0 640 520"','viewBox="0 0 640 '+HH.toFixed(0)+'"').replace(R(0,0,640,520,'#F7FAFD'),R(0,0,640,HH,'#F7FAFD'));
 setK(1);return s+'</svg>'},
/* 5 川を渡る船：流れに負けないように、へさきを上流に向ける（偏流修正） */
nav_river:function(l){
 var W=({ja:{t:'川を渡る船で考える偏流',a:'へさきをまっすぐ向けると…',b:'へさきを上流に向けると…',drift:'流されて、目的地の下流に着く',ok:'まっすぐ目的地に着く',cur:'川の流れ＝風',goal:'目的地',wca:'修正角'},
  ko:{t:'강을 건너는 배로 생각하는 편류',a:'뱃머리를 똑바로 향하면…',b:'뱃머리를 상류로 향하면…',drift:'떠밀려서 목적지 하류에 닿는다',ok:'똑바로 목적지에 닿는다',cur:'강물의 흐름=바람',goal:'목적지',wca:'수정각'},
  en:{t:'Drift, explained with a boat crossing a river',a:'Point the bow straight across…',b:'Point the bow upstream…',drift:'…and the current carries you downstream of the target',ok:'…and you arrive straight at the target',cur:'River current = wind',goal:'Target',wca:'Correction angle'}})[l];
 if(!W)return F.nav_river('ja');
 var nar=NARROW();setK(nar?1.3:1);
 function panel(ox,oy,corr){var g='<g transform="translate('+ox+' '+oy+')">'+R(0,0,420,380,'#fff',16,' stroke="'+(corr?T:RD)+'" stroke-width="3"')+tx(210,30,corr?W.b:W.a,14,corr?T:RD,900);
  g+=R(14,70,392,230,'#9FD3F7',0)+R(14,50,392,20,'#9CC98B')+R(14,300,392,20,'#9CC98B');
  for(var i=0;i<5;i++)g+='<path d="M'+(30+i*80)+' '+(110+i%2*90)+' h40" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"><animateTransform attributeName="transform" type="translate" values="0 0;80 0" dur="2s" repeatCount="indefinite"/></path>';
  g+='<g transform="translate(210 46)"><path d="M0 -14 L10 0 L0 14 L-10 0 Z" fill="#D64545"/></g>'+tx(250,48,W.goal,12,'#D64545',900,'start');
  var path=corr?'M210 300 L210 70':'M210 300 L330 70',rot=corr?-28:0;
  g+='<g><g transform="rotate('+rot+')"><path d="M-10 14 L-10 -6 L0 -20 L10 -6 L10 14 Z" fill="#E08A2F" stroke="#7a3e0a" stroke-width="1.5"/></g><animateMotion dur="5s" repeatCount="indefinite" path="'+path+'"/></g>';
  g+='<path d="'+path+'" stroke="'+(corr?T:RD)+'" stroke-width="2.5" stroke-dasharray="6 6" fill="none"/>';
  if(corr)g+=LB(150,190,W.wca,11,'#fff','middle',T);
  g+=WR(210,350,corr?W.ok:W.drift,12,corr?T:RD,900,390);
  return g+'</g>'}
 var s;
 if(nar)s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 890" role="img">'+R(0,0,460,890,'#F7FAFD')+TTL(230,30,W.t,15,'#0f3558',420)+panel(20,56,false)+panel(20,450,true)+LB(230,880,W.cur+' →',11,'#1d4d8a','middle','#DCEBFA');
 else s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 470" role="img">'+R(0,0,900,470,'#F7FAFD')+TTL(450,30,W.t,15,'#0f3558',860)+panel(20,50,false)+panel(460,50,true)+LB(450,456,W.cur+' →',11,'#1d4d8a','middle','#DCEBFA');
 setK(1);return s+'</svg>'},

/* 6 風の三角形：機首方位とTAS ＋ 風 ＝ 航跡とGS。機体は少し斜めに（クラブ）飛ぶ */
nav_windtri:function(l){
 var W=({ja:{t:'風の三角形',th:'機首方位（TH）とTAS',wv:'風（W/V）',tr:'航跡（TR）とGS',wca:'偏流修正角（WCA）',crab:'機首は風上に向け、航跡は目的地へ',n:'北'},
  ko:{t:'바람 삼각형',th:'기수 방위(TH)와 TAS',wv:'바람(W/V)',tr:'항적(TR)과 GS',wca:'편류 수정각(WCA)',crab:'기수는 바람 불어오는 쪽으로, 항적은 목적지로',n:'북'},
  en:{t:'The wind triangle',th:'Heading (TH) and TAS',wv:'Wind (W/V)',tr:'Track (TR) and GS',wca:'Wind correction angle (WCA)',crab:'Nose into wind, track to the destination',n:'N'}})[l];
 if(!W)return F.nav_windtri('ja');
 var nar=NARROW();setK(nar?1.3:1);
 var o=[120,470],hd=[380,120],tr=[470,170];
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" role="img">'+R(0,0,640,560,'#F7FAFD')+TTL(320,30,W.t,16,'#0f3558',600)+R(20,50,600,450,'#EEF5FB',14);
 s+='<g opacity=".5"><path d="M60 110 L60 70" stroke="#6B7785" stroke-width="3"/><path d="M52 82 L60 66 L68 82" fill="#6B7785"/>'+tx(60,128,W.n,12,G,900)+'</g>';
 function vec(a,b,c,lab,d,lx,ly){return '<g opacity="0">'+ARW(a[0],a[1],b[0],b[1],c,6)+LB(lx,ly,lab,12,'#fff','middle',c)+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+d+';'+(d+0.08)+';1" dur="9s" repeatCount="indefinite"/></g>'}
 s+=vec(o,hd,'#2F6FD6',W.th,0.02,210,280)+vec(hd,tr,'#E08A2F',W.wv,0.2,500,120)+vec(o,tr,'#D64545',W.tr,0.38,370,370);
 s+='<g opacity="0"><path d="M'+(o[0]+70)+' '+(o[1]-95)+' A120 120 0 0 1 '+(o[0]+100)+' '+(o[1]-70)+'" fill="none" stroke="#6B4FA0" stroke-width="3"/>'+LB(o[0]+160,o[1]-60,W.wca,11,'#fff','middle','#6B4FA0')+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.5;.58;1" dur="9s" repeatCount="indefinite"/></g>';
 /* 航跡に沿って斜めに飛ぶ飛行機 */
 var ang=Math.atan2(hd[1]-o[1],hd[0]-o[0])*180/Math.PI;
 s+='<g opacity="0"><g><g transform="rotate('+ang.toFixed(1)+')">'+plane('#fff')+'</g><animateMotion dur="3s" begin="0s" repeatCount="indefinite" path="M'+o[0]+' '+o[1]+' L'+tr[0]+' '+tr[1]+'"/></g><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.62;.66;1" dur="9s" repeatCount="indefinite"/></g>';
 s+=LB(320,530,W.crab,12,'#0f3558','middle','#FFF1E3');
 setK(1);return s+'</svg>'},

/* 7 風の成分：滑走路に対する角度で、向かい風と横風が変わる（時計の方法） */
nav_comp:function(l){
 var W=({ja:{t:'風の成分 ― 角度で向かい風と横風が変わる',rw:'滑走路',hw:'向かい風',xw:'横風',wind:'風 20kt',clk:'時計の方法：15°＝¼、30°＝½、45°＝¾、60°以上＝ほぼ全部が横風',ang:'風と滑走路の角度'},
  ko:{t:'바람 성분 — 각도에 따라 맞바람과 측풍이 달라진다',rw:'활주로',hw:'맞바람',xw:'측풍',wind:'바람 20kt',clk:'시계 방법: 15°=¼, 30°=½, 45°=¾, 60° 이상=거의 전부가 측풍',ang:'바람과 활주로의 각도'},
  en:{t:'Wind components: the angle sets headwind and crosswind',rw:'Runway',hw:'Headwind',xw:'Crosswind',wind:'Wind 20 kt',clk:'Clock method: 15° = ¼, 30° = ½, 45° = ¾, 60° or more = almost all crosswind',ang:'Angle between wind and runway'}})[l];
 if(!W)return F.nav_comp('ja');
 var nar=NARROW();setK(nar?1.3:1);
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 612" role="img">'+R(0,0,640,612,'#F7FAFD')+TTL(320,30,W.t,15,'#0f3558',600)+R(20,54,600,380,'#EEF5FB',14);
 s+=R(270,90,60,320,'#5B6770',6)+'<line x1="300" y1="100" x2="300" y2="400" stroke="#fff" stroke-width="3" stroke-dasharray="16 12"/>'+tx(300,425,W.rw,12,G,900);
 var angs=[0,15,30,45,60,90],n=angs.length,dur=12;
 angs.forEach(function(a,i){var r=a*Math.PI/180,hw=20*Math.cos(r),xw=20*Math.sin(r),k0=(i/n).toFixed(3),k1=((i+1)/n).toFixed(3);
  var kt='0;'+k0+';'+(+k0+0.005).toFixed(3)+';'+k1+';'+(+k1+0.005).toFixed(3)+';1',vs=i===0?'1;1;1;1;0;0':'0;0;1;1;0;0';
  if(i===0)kt='0;'+k1+';'+(+k1+0.005).toFixed(3)+';1',vs='1;1;0;0';
  if(i===n-1)kt='0;'+k0+';'+(+k0+0.005).toFixed(3)+';1',vs='0;0;1;1';
  var ex=300+Math.sin(r)*170,ey=250-Math.cos(r)*170;
  var g='<g opacity="'+(i===0?1:0)+'">'+ARW(ex.toFixed(0),ey.toFixed(0),(300+Math.sin(r)*60).toFixed(0),(250-Math.cos(r)*60).toFixed(0),'#2F6FD6',7)+LB(ex,ey-14,W.wind,11,'#fff','middle','#2F6FD6');
  g+=R(60,470,Math.max(4,hw*13),26,'#1F7A6E',6)+tx(70,462,W.hw+' '+hw.toFixed(0)+'kt',12,'#1F7A6E',900,'start');
  g+=R(60,530,Math.max(4,xw*13),26,'#D64545',6)+tx(70,522,W.xw+' '+xw.toFixed(0)+'kt',12,'#D64545',900,'start');
  g+=H.LBW(150,96,W.ang+' '+a+'°',12,'#0f3558','middle','#FFF1E3',220);
  g+='<animate attributeName="opacity" values="'+vs+'" keyTimes="'+kt+'" dur="'+dur+'s" repeatCount="indefinite"/></g>';
  s+=g});
 s+=WR(320,588,W.clk,11,'#40566B',800,580);
 setK(1);return s+'</svg>'},

/* 8 真北と磁北（偏差）：方位磁針は磁北を指す。日本・韓国は西偏 */
nav_var:function(l){
 var W=({ja:{t:'真北と磁北のずれ（偏差）',tn:'真北（地図の北）',mn:'磁北（方位磁針の北）',var:'偏差 7°W',rule:'西偏（W）は足す、東偏（E）は引く：磁方位 ＝ 真方位 ＋ 西偏',ex:'例：真針路 100° ＋ 7°W ＝ 磁針路 107°',rwy:'滑走路の番号と管制の風は磁方位、METARの風は真方位'},
  ko:{t:'진북과 자북의 차이(편차)',tn:'진북(지도의 북)',mn:'자북(나침반의 북)',var:'편차 7°W',rule:'서편(W)은 더하고, 동편(E)은 뺀다: 자방위 = 진방위 + 서편',ex:'예: 진침로 100° + 7°W = 자침로 107°',rwy:'활주로 번호와 관제가 알려 주는 바람은 자방위, METAR의 바람은 진방위'},
  en:{t:'True north and magnetic north (variation)',tn:'True north (map north)',mn:'Magnetic north (compass north)',var:'Variation 7°W',rule:'West is best (add), east is least (subtract): magnetic = true + westerly variation',ex:'Example: true course 100° + 7°W = magnetic course 107°',rwy:'Runway numbers and ATC winds are magnetic; METAR winds are true'}})[l];
 if(!W)return F.nav_var('ja');
 var nar=NARROW();setK(nar?1.3:1);
 var cx=320,cy=290;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 630" role="img">'+R(0,0,640,630,'#F7FAFD')+TTL(320,30,W.t,15,'#0f3558',600);
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="170" fill="#fff" stroke="#D9E3EC" stroke-width="3"/>';
 for(var a=0;a<360;a+=30){var r=a*Math.PI/180;s+='<line x1="'+(cx+Math.sin(r)*150).toFixed(0)+'" y1="'+(cy-Math.cos(r)*150).toFixed(0)+'" x2="'+(cx+Math.sin(r)*165).toFixed(0)+'" y2="'+(cy-Math.cos(r)*165).toFixed(0)+'" stroke="#9FB0C2" stroke-width="3"/>'}
 s+=ARW(cx,cy,cx,cy-190,'#2F6FD6',6)+LB(cx,cy-206,W.tn,12,'#fff','middle','#2F6FD6');
 s+='<g transform="translate('+cx+' '+cy+')"><g><path d="M0 -150 L11 0 L-11 0 Z" fill="#D64545"/><path d="M0 150 L11 0 L-11 0 Z" fill="#9FB0C2"/><animateTransform attributeName="transform" type="rotate" values="0;-12;-4;-9;-7;-7" keyTimes="0;.15;.3;.45;.6;1" dur="5s" repeatCount="indefinite"/></g><circle r="10" fill="#243447"/></g>';
 s+=LB(cx-110,cy-150,W.mn,11,'#fff','middle','#D64545')+LB(cx+70,cy-120,W.var,12,'#6B4FA0','middle','#EFE7FA');
 var LI=H.LINES,FS=H.FS,items=[[W.rule,12,D,900],[W.ex,12,'#8a3b00',900],[W.rwy,11,'#40566B',800]],y=478,yy=y+12,body='';
 items.forEach(function(v){var n=LI(v[0],v[1],560).length,lh=FS(v[1])*1.3;body+=WR(320,yy+n*lh/2+FS(v[1])*0.3,v[0],v[1],v[2],v[3],560);yy+=n*lh+10});
 var bh=yy-y+4;s+=R(20,y,600,bh,'#fff',14,' stroke="#D9E3EC"')+body;var HH=y+bh+12;
 s=s.replace('viewBox="0 0 640 630"','viewBox="0 0 640 '+HH.toFixed(0)+'"').replace(R(0,0,640,630,'#F7FAFD'),R(0,0,640,HH,'#F7FAFD'));
 setK(1);return s+'</svg>'},
/* 9 1 in 60 の法則：1°ずれると、60NM 先で約1NM ずれる */
nav_1in60:function(l){
 var W=({ja:{t:'1 in 60 の法則',p:'予定の針路',e:'1°ずれた航跡',r:'1°のずれ → 60NM 先で約1NM',r2:'30NM で約0.5NM、120NM で約2NM',f:'ずれ（NM）≒ 角度（度）× 距離（NM）÷ 60'},
  ko:{t:'1 in 60 법칙',p:'예정 침로',e:'1° 벗어난 항적',r:'1° 벗어나면 → 60NM 앞에서 약 1NM',r2:'30NM에서 약 0.5NM, 120NM에서 약 2NM',f:'벗어난 거리(NM) ≒ 각도(도) × 거리(NM) ÷ 60'},
  en:{t:'The 1-in-60 rule',p:'Planned course',e:'Track 1° off',r:'1° off → about 1 NM off after 60 NM',r2:'About 0.5 NM at 30 NM and 2 NM at 120 NM',f:'Off-track distance (NM) ≈ angle (°) × distance (NM) ÷ 60'}})[l];
 if(!W)return F.nav_1in60('ja');
 setK(1);
 var x0=50,y0=250,px=4.3; /* 1NM = 4.3（横）、ずれは見やすいように縦を大きくする */
 var s=R(0,0,640,420,'#F7FAFD')+TTL(320,30,W.t,16,'#0f3558',600)+R(20,54,600,260,'#EEF5FB',14);
 s+='<line x1="'+x0+'" y1="'+y0+'" x2="600" y2="'+y0+'" stroke="#2F6FD6" stroke-width="4"/>'+LBW(420,y0+48,W.p,11,'#2F6FD6','middle','#fff',200);
 var ey=function(nm){return y0-nm/60*60}; /* 60NM で 60px 上（誇張） */
 s+='<line x1="'+x0+'" y1="'+y0+'" x2="'+(x0+120*px)+'" y2="'+ey(120)+'" stroke="#D64545" stroke-width="3" stroke-dasharray="8 6"/>';
 [[30,'0.5NM'],[60,'1NM'],[120,'2NM']].forEach(function(v,i){var x=x0+v[0]*px;s+='<g opacity="0"><line x1="'+x+'" y1="'+y0+'" x2="'+x+'" y2="'+ey(v[0])+'" stroke="#6B4FA0" stroke-width="3"/>'+tx(x,y0+22,v[0]+'NM',11,G,800)+LB(x+4,ey(v[0])-12,v[1],11,'#fff','start','#6B4FA0')+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(0.2+i*0.25).toFixed(2)+';'+(0.25+i*0.25).toFixed(2)+';1" dur="8s" repeatCount="indefinite"/></g>'});
 s+='<g><g transform="rotate(-6.5)">'+plane('#fff')+'</g><animateMotion dur="8s" repeatCount="indefinite" path="M'+x0+' '+y0+' L'+(x0+120*px)+' '+ey(120)+'"/></g>';
 s+=LBW(150,110,W.e,11,'#D64545','middle','#fff',200);
 var lh=H.FS(12)*1.3,n1=H.LINES(W.r,12,560).length,n2=H.LINES(W.r2,11,560).length,n3=H.LINES(W.f,12,560).length,y=330,bh=(n1+n3)*lh+n2*H.FS(11)*1.3+36;
 s+=R(20,y,600,bh,'#fff',14,' stroke="#D9E3EC"')+WR(320,y+10+n1*lh/2+H.FS(12)*0.3,W.r,12,D,900,560)+WR(320,y+18+n1*lh+n2*H.FS(11)*1.3/2+H.FS(11)*0.3,W.r2,11,G,800,560)+WR(320,y+26+n1*lh+n2*H.FS(11)*1.3+n3*lh/2+H.FS(12)*0.3,W.f,12,'#8a3b00',900,560);
 var HH=y+bh+12;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+s.replace(R(0,0,640,420,'#F7FAFD'),R(0,0,640,HH,'#F7FAFD'))+'</svg>'},

/* 10 航路からのずれの修正：ずれた角度＋合流の角度で、目的地に向かう */
nav_offtrack:function(l){
 var W=({ja:{t:'針路からずれたときの修正',a:'出発地',b:'目的地',x:'今の位置',off:'4NM ずれている',flown:'40NM 飛んだ',togo:'残り 80NM',te:'ずれた角度 4×60÷40＝6°',ca:'合流の角度 4×60÷80＝3°',tot:'右へ 6°＋3°＝9° 変えて目的地へ'},
  ko:{t:'침로에서 벗어났을 때의 수정',a:'출발지',b:'목적지',x:'현재 위치',off:'4NM 벗어나 있다',flown:'40NM 비행',togo:'남은 80NM',te:'벗어난 각도 4×60÷40=6°',ca:'합류 각도 4×60÷80=3°',tot:'오른쪽으로 6°+3°=9° 바꿔 목적지로'},
  en:{t:'Correcting after drifting off course',a:'Departure',b:'Destination',x:'Present position',off:'4 NM off course',flown:'40 NM flown',togo:'80 NM to go',te:'Track error 4 × 60 ÷ 40 = 6°',ca:'Closing angle 4 × 60 ÷ 80 = 3°',tot:'Turn right 6° + 3° = 9° to reach the destination'}})[l];
 if(!W)return F.nav_offtrack('ja');
 setK(1);
 var A=[60,320],B=[580,320],X=[233,248];
 var s=R(0,0,640,440,'#F7FAFD')+TTL(320,30,W.t,16,'#0f3558',600)+R(20,54,600,330,'#EEF5FB',14);
 s+='<line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="#2F6FD6" stroke-width="4" stroke-dasharray="12 8"/>';
 s+='<circle cx="'+A[0]+'" cy="'+A[1]+'" r="10" fill="#2F6FD6"/>'+tx(A[0],A[1]+34,W.a,12,'#2F6FD6',900)+'<circle cx="'+B[0]+'" cy="'+B[1]+'" r="10" fill="#D64545"/>'+tx(B[0]-10,B[1]+34,W.b,12,'#D64545',900);
 s+='<line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+X[0]+'" y2="'+X[1]+'" stroke="#E08A2F" stroke-width="4"/>';
 s+='<line x1="'+X[0]+'" y1="'+X[1]+'" x2="'+X[0]+'" y2="'+A[1]+'" stroke="#6B4FA0" stroke-width="3" stroke-dasharray="4 4"/>'+LBW(X[0]+10,284,W.off,11,'#6B4FA0','start','#fff',150);
 s+='<g opacity="0"><line x1="'+X[0]+'" y1="'+X[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="#1F7A6E" stroke-width="4"/><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.45;.5;1" dur="10s" repeatCount="indefinite"/></g>';
 s+='<circle cx="'+X[0]+'" cy="'+X[1]+'" r="8" fill="#E08A2F"/>'+LB(X[0],X[1]-18,W.x,11,'#fff','middle','#E08A2F');
 s+=tx((A[0]+X[0])/2+20,A[1]+62,W.flown,11,G,800)+tx((X[0]+B[0])/2,A[1]+62,W.togo,11,G,800);
 s+='<g><g>'+plane('#fff')+'</g><animateMotion dur="10s" repeatCount="indefinite" rotate="auto" keyPoints="0;.35;.35;1;1" keyTimes="0;.35;.5;.9;1" calcMode="linear" path="M'+A[0]+' '+A[1]+' L'+X[0]+' '+X[1]+' L'+B[0]+' '+B[1]+'"/></g>';
 var lines=[[W.te,'#E08A2F'],[W.ca,'#1F7A6E'],[W.tot,D]],y=400,body='',lh=H.FS(12)*1.3;
 lines.forEach(function(v){var n=H.LINES(v[0],12,560).length;body+=WR(320,y+n*lh/2+H.FS(12)*0.3,v[0],12,v[1],900,560);y+=n*lh+8});
 var bh=y-392;s+=R(20,392,600,bh+6,'#fff',14,' stroke="#D9E3EC"')+body;
 var HH=392+bh+18;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+s.replace(R(0,0,640,440,'#F7FAFD'),R(0,0,640,HH,'#F7FAFD'))+'</svg>'},

/* 11 時間・速さ・距離：隠したところを残りの2つで計算する。GS 480kt は1分に8NM */
nav_tsd:function(l){
 var W=({ja:{t:'時間・速さ・距離の三角形',d:'距離',s:'速さ',tm:'時間',f1:'距離 ＝ 速さ × 時間',f2:'時間 ＝ 距離 ÷ 速さ',f3:'速さ ＝ 距離 ÷ 時間',ex:'GS 480kt ＝ 1分に8NM → 240NM は30分',min:'分'},
  ko:{t:'시간·속도·거리 삼각형',d:'거리',s:'속도',tm:'시간',f1:'거리 = 속도 × 시간',f2:'시간 = 거리 ÷ 속도',f3:'속도 = 거리 ÷ 시간',ex:'GS 480kt = 1분에 8NM → 240NM은 30분',min:'분'},
  en:{t:'The time–speed–distance triangle',d:'Distance',s:'Speed',tm:'Time',f1:'Distance = speed × time',f2:'Time = distance ÷ speed',f3:'Speed = distance ÷ time',ex:'GS 480 kt = 8 NM a minute → 240 NM takes 30 minutes',min:'min'}})[l];
 if(!W)return F.nav_tsd('ja');
 setK(1);
 var s=R(0,0,640,560,'#F7FAFD')+TTL(320,30,W.t,16,'#0f3558',600);
 s+='<path d="M320 70 L500 330 L140 330 Z" fill="#fff" stroke="#243447" stroke-width="3"/><line x1="200" y1="240" x2="440" y2="240" stroke="#243447" stroke-width="3"/><line x1="320" y1="240" x2="320" y2="330" stroke="#243447" stroke-width="3"/>';
 s+=tx(320,200,W.d,18,'#2F6FD6',900)+tx(250,300,W.s,18,'#E08A2F',900)+tx(390,300,W.tm,18,'#1F7A6E',900);
 var fs=[W.f1,W.f2,W.f3],cov=[[250,290,140,40],[330,290,120,40],[290,180,60,40]];
 fs.forEach(function(f,i){var k0=(i/3).toFixed(3),k1=((i+1)/3).toFixed(3);var vs=i===0?'1;1;0;0':(i===2?'0;0;1;1':'0;0;1;1;0;0'),kt=i===0?'0;'+k1+';'+(+k1+0.005).toFixed(3)+';1':(i===2?'0;'+k0+';'+(+k0+0.005).toFixed(3)+';1':'0;'+k0+';'+(+k0+0.005).toFixed(3)+';'+k1+';'+(+k1+0.005).toFixed(3)+';1');
  var c=[[320,200],[250,300],[390,300]][[0,2,1][i]];
  s+='<g opacity="'+(i===0?1:0)+'"><circle cx="'+c[0]+'" cy="'+(c[1]-7)+'" r="34" fill="#FFD23F" opacity=".45"/>'+LBW(320,372,f,14,'#fff','middle','#243447',560)+'<animate attributeName="opacity" values="'+vs+'" keyTimes="'+kt+'" dur="9s" repeatCount="indefinite"/></g>'});
 /* 飛行機と距離の目盛り、時計 */
 s+=R(20,410,600,90,'#EEF5FB',12);for(var i=0;i<=6;i++){var x=60+i*80;s+='<line x1="'+x+'" y1="452" x2="'+x+'" y2="460" stroke="#6B7785" stroke-width="2"/>'+tx(x,488,(i*40)+'NM',10.5,G,800)}
 s+='<g>'+plane('#fff')+'<animateMotion dur="6s" repeatCount="indefinite" path="M60 440 L540 440"/></g>';
 s+='<g transform="translate(570 90)"><circle r="40" fill="#fff" stroke="#243447" stroke-width="3"/><line x1="0" y1="0" x2="0" y2="-30" stroke="#D64545" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0;180" dur="6s" repeatCount="indefinite"/></line><circle r="4" fill="#243447"/></g>'+tx(570,150,'0–30'+W.min,11,G,800);
 var n=H.LINES(W.ex,12,560).length,lh=H.FS(12)*1.3;s+=WR(320,522+n*lh/2,W.ex,12,'#8a3b00',900,560);
 var HH=522+n*lh+20;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+s.replace(R(0,0,640,560,'#F7FAFD'),R(0,0,640,HH,'#F7FAFD'))+'</svg>'},

/* 12 3°の降下：1NMで約300ft、降下を始める距離は「高さ（千ft）× 3」、降下率は GS × 5 */
nav_descent:function(l){
 var W=({ja:{t:'3°で降りる計画',tod:'降下開始（TOD）',rw:'滑走路',r1:'3°の坂 ＝ 1NMで約300ft',r2:'降下を始める距離（NM）≒ 降りる高さ（千ft）× 3',r3:'降下率（ft/分）≒ GS（kt）× 5',ex:'例：FL350 から 3,000ft まで → 32 × 3 ＝ 約96NM 手前から'},
  ko:{t:'3°로 내려오는 계획',tod:'강하 시작(TOD)',rw:'활주로',r1:'3° 경사 = 1NM에 약 300ft',r2:'강하 시작 거리(NM) ≒ 내려갈 높이(천 ft) × 3',r3:'강하율(ft/분) ≒ GS(kt) × 5',ex:'예: FL350에서 3,000ft까지 → 32 × 3 = 약 96NM 전부터'},
  en:{t:'Planning a 3° descent',tod:'Top of descent (TOD)',rw:'Runway',r1:'3° slope = about 300 ft per NM',r2:'Distance to start descent (NM) ≈ height to lose (thousands of ft) × 3',r3:'Rate of descent (ft/min) ≈ GS (kt) × 5',ex:'Example: FL350 to 3,000 ft → 32 × 3 = start about 96 NM out'}})[l];
 if(!W)return F.nav_descent('ja');
 setK(1);
 var s=R(0,0,640,560,'#F7FAFD')+TTL(320,30,W.t,16,'#0f3558',600)+R(20,54,600,280,'#DCEEFB',14)+R(20,310,600,24,'#9CC98B',0);
 s+='<line x1="40" y1="90" x2="150" y2="90" stroke="#6B7785" stroke-width="3"/><path d="M150 90 L560 300" stroke="#D64545" stroke-width="4"/>'+R(540,298,70,10,'#5B6770',3);
 s+='<circle cx="150" cy="90" r="7" fill="#D64545"/>'+LBW(200,74,W.tod,11,'#fff','start','#D64545',240)+tx(575,330,W.rw,11,G,900);
 s+='<g><g>'+plane('#fff')+'</g><animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="M40 90 L150 90 L560 300"/></g>';
 var y=348,body='',items=[[W.r1,12,D],[W.r2,12,'#2F6FD6'],[W.r3,12,'#1F7A6E'],[W.ex,11.5,'#8a3b00']];
 items.forEach(function(v){var n=H.LINES(v[0],v[1],560).length,lh=H.FS(v[1])*1.3;body+=WR(320,y+10+n*lh/2+H.FS(v[1])*0.3,v[0],v[1],v[2],900,560);y+=n*lh+10});
 var bh=y-348+12;s+=R(20,344,600,bh,'#fff',14,' stroke="#D9E3EC"')+body;
 var HH=344+bh+12;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+s.replace(R(0,0,640,560,'#F7FAFD'),R(0,0,640,HH,'#F7FAFD'))+'</svg>'},
/* 13 従来の航法とRNAV：無線施設を順に通る道と、ウェイポイントをまっすぐ結ぶ道 */
nav_rnav:function(l){
 var W=({ja:{t:'従来の航法とRNAV（広域航法）',a:'従来の航法',b:'RNAV',vor:'VOR（地上の無線施設）',wp:'ウェイポイント（座標の点）',na:'無線施設の上を順に通るので、道が曲がり長くなる',nb:'座標の点をまっすぐ結べるので、道が短く自由になる',dep:'出発',arr:'到着'},
  ko:{t:'기존 항법과 RNAV(광역항법)',a:'기존 항법',b:'RNAV',vor:'VOR(지상 무선시설)',wp:'웨이포인트(좌표 지점)',na:'무선시설 위를 차례로 지나므로 길이 굽고 길어진다',nb:'좌표 지점을 곧게 이을 수 있어 길이 짧고 자유롭다',dep:'출발',arr:'도착'},
  en:{t:'Conventional navigation and RNAV (area navigation)',a:'Conventional',b:'RNAV',vor:'VOR (ground radio station)',wp:'Waypoint (a set of coordinates)',na:'Flying over each station in turn bends and lengthens the route',nb:'Joining coordinates directly makes routes shorter and more flexible',dep:'Dep',arr:'Arr'}})[l];
 if(!W)return F.nav_rnav('ja');
 setK(1);var nar=NARROW(),FS=H.FS,LI=H.LINES;
 function vor(x,y){return '<g transform="translate('+x+' '+y+')"><path d="M-12 0 L-6 -10 L6 -10 L12 0 L6 10 L-6 10 Z" fill="#fff" stroke="#2F6FD6" stroke-width="3"/><circle r="3" fill="#2F6FD6"/></g>'}
 function wpt(x,y){return '<g transform="translate('+x+' '+y+')"><path d="M0 -11 L10 7 L-10 7 Z" fill="#fff" stroke="#1F7A6E" stroke-width="3"/></g>'}
 function panel(x0,y0,w,conv){var h=250,g=R(x0,y0,w,h,'#fff',16,' stroke="'+(conv?'#2F6FD6':'#1F7A6E')+'" stroke-width="3"')+tx(x0+w/2,y0+30,conv?W.a:W.b,15,conv?'#2F6FD6':'#1F7A6E',900);
  var A=[x0+34,y0+200],B=[x0+w-34,y0+80];
  g+='<circle cx="'+A[0]+'" cy="'+A[1]+'" r="8" fill="#6B7785"/>'+tx(A[0],A[1]+26,W.dep,11,G,800)+'<circle cx="'+B[0]+'" cy="'+B[1]+'" r="8" fill="#D64545"/>'+tx(B[0],B[1]-16,W.arr,11,'#D64545',800);
  var pts;
  if(conv){pts=[A,[x0+w*0.3,y0+110],[x0+w*0.55,y0+190],[x0+w*0.78,y0+100],B];pts.slice(1,4).forEach(function(p){g+=vor(p[0],p[1])})}
  else{pts=[A,[x0+w*0.35,y0+160],[x0+w*0.68,y0+120],B];pts.slice(1,3).forEach(function(p){g+=wpt(p[0],p[1])})}
  var d='M'+pts.map(function(p){return p[0].toFixed(0)+' '+p[1].toFixed(0)}).join(' L');
  g+='<path d="'+d+'" fill="none" stroke="'+(conv?'#2F6FD6':'#1F7A6E')+'" stroke-width="3" stroke-dasharray="8 6"/>';
  g+='<g>'+plane('#fff')+'<animateMotion dur="'+(conv?8:6)+'s" repeatCount="indefinite" rotate="auto" path="'+d+'"/></g>';
  var n=LI(conv?W.na:W.nb,11.5,w-30).length,lh=FS(11.5)*1.3;
  g+=R(x0,y0+h+10,w,n*lh+18,conv?'#E3F1FB':'#E8F5F2',12)+WR(x0+w/2,y0+h+19+n*lh/2+FS(11.5)*0.3,conv?W.na:W.nb,11.5,D,800,w-30);
  return {s:g,h:h+10+n*lh+18}}
 var s,HH;
 if(nar){var p1=panel(20,56,540,true),p2=panel(20,56+p1.h+20,540,false);HH=56+p1.h+20+p2.h+14;s=R(0,0,580,HH,'#F7FAFD')+TTL(290,30,W.t,15,'#0f3558',540)+p1.s+p2.s;
  var H0=HH,ln=LI(W.vor+' / '+W.wp,10.5,520).length,llh=FS(10.5)*1.3;s+=LBW(290,H0+10+llh*0.8+(ln-1)*llh/2,W.vor+' / '+W.wp,10.5,'#40566B','middle','#fff',520);HH=H0+ln*llh+28;s=s.replace(R(0,0,580,H0,'#F7FAFD'),R(0,0,580,HH,'#F7FAFD'));return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 '+HH.toFixed(0)+'" role="img">'+s+'</svg>'}
 var q1=panel(20,56,420,true),q2=panel(460,56,420,false);HH=56+Math.max(q1.h,q2.h)+52;
 s=R(0,0,900,HH,'#F7FAFD')+TTL(450,30,W.t,16,'#0f3558',860)+q1.s+q2.s+vor(200,HH-26)+tx(220,HH-21,W.vor,11,'#2F6FD6',800,'start')+wpt(520,HH-26)+tx(540,HH-21,W.wp,11,'#1F7A6E',800,'start');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 '+HH.toFixed(0)+'" role="img">'+s+'</svg>'},

/* 14 RNPの「トンネル」：±x NM の幅の中を飛行時間の95%以上で飛び、はみ出すと機内で警報が出る */
nav_rnp:function(l){
 var W=({ja:{t:'RNP ― 決められた幅の中を飛ぶ',band:'±1NM（RNP 1）',alert:'警報',in:'飛行時間の95%以上はこの幅の中',mon:'RNPは機体が自分の精度を監視し、守れないと警報を出す（RNAVにはこの機能の決まりがない）',sp:'主な仕様と幅',rows:[['RNAV 10','洋上・遠隔地','10NM',10],['RNP 4','洋上','4NM',4],['RNAV 5','大陸の航空路','5NM',5],['RNAV 1・RNP 1','出発（SID）・到着（STAR）','1NM',1],['RNP APCH','計器進入（最終進入は0.3NM）','0.3NM',0.3],['RNP AR APCH','特別な承認が必要な進入','0.3〜0.1NM',0.1]]},
  ko:{t:'RNP — 정해진 폭 안을 난다',band:'±1NM(RNP 1)',alert:'경보',in:'비행시간의 95% 이상은 이 폭 안',mon:'RNP는 기체가 스스로 정밀도를 감시하고, 지키지 못하면 경보를 낸다(RNAV에는 이 기능의 규정이 없다)',sp:'주요 사양과 폭',rows:[['RNAV 10','해상·원격지','10NM',10],['RNP 4','해상','4NM',4],['RNAV 5','대륙 항공로','5NM',5],['RNAV 1·RNP 1','출발(SID)·도착(STAR)','1NM',1],['RNP APCH','계기접근(최종접근은 0.3NM)','0.3NM',0.3],['RNP AR APCH','특별 승인이 필요한 접근','0.3~0.1NM',0.1]]},
  en:{t:'RNP: flying inside a set width',band:'±1 NM (RNP 1)',alert:'Alert',in:'Inside this width for at least 95% of flight time',mon:'Under RNP the aircraft monitors its own accuracy and alerts if it cannot meet it (RNAV has no such requirement)',sp:'Main specifications and widths',rows:[['RNAV 10','Oceanic, remote','10 NM',10],['RNP 4','Oceanic','4 NM',4],['RNAV 5','Continental en route','5 NM',5],['RNAV 1 · RNP 1','Departures (SID), arrivals (STAR)','1 NM',1],['RNP APCH','Instrument approach (0.3 NM on final)','0.3 NM',0.3],['RNP AR APCH','Approach needing special approval','0.3–0.1 NM',0.1]]}})[l];
 if(!W)return F.nav_rnp('ja');
 setK(1);var FS=H.FS,LI=H.LINES;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,200,'#EEF5FB',14);
 s+=R(30,106,580,100,'#1F7A6E',0,' opacity=".15"')+'<line x1="30" y1="156" x2="610" y2="156" stroke="#1F7A6E" stroke-width="3" stroke-dasharray="10 6"/><line x1="30" y1="106" x2="610" y2="106" stroke="#1F7A6E" stroke-width="2"/><line x1="30" y1="206" x2="610" y2="206" stroke="#1F7A6E" stroke-width="2"/>';
 s+=LB(40,100,W.band,11,'#1F7A6E','start','#fff');
 s+='<g>'+plane('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" path="M40 156 C140 130 220 180 320 150 C420 120 480 170 560 226"/></g>';
 s+='<g opacity="0">'+LB(560,246,'⚠ '+W.alert,13,'#fff','middle','#D64545')+'<animate attributeName="opacity" values="0;0;1;0;1;0" keyTimes="0;.88;.9;.94;.97;1" dur="8s" repeatCount="indefinite"/></g>';
 s+=LBW(320,238,W.in,11,'#1F7A6E','middle','#fff',420);
 var y=272,n=LI(W.mon,11.5,560).length,lh=FS(11.5)*1.3;s+=R(20,y,600,n*lh+18,'#FFF1E3',12)+WR(320,y+9+n*lh/2+FS(11.5)*0.3,W.mon,11.5,'#8a3b00',800,560);y+=n*lh+30;
 s+=tx(320,y+FS(13)*0.9,W.sp,13,D,900);y+=FS(13)*1.4+8;
 W.rows.forEach(function(r,i){var nl=LI(r[1],10.5,200).length,rh=Math.max(FS(12)*1.4,nl*FS(10.5)*1.3)+12,bw=Math.max(6,Math.log(r[3]*10+1)/Math.log(101)*170);
  s+=R(20,y,600,rh,i%2?'#fff':'#F4F7FB',8)+tx(30,y+rh/2+FS(12)*0.35,r[0],12,D,900,'start')+WR(270,y+rh/2+FS(10.5)*0.3,r[1],10.5,G,800,200)+R(380,y+rh/2-8,bw,16,'#1F7A6E',8,' opacity=".75"')+tx(380+bw+8,y+rh/2+FS(11)*0.35,r[2],11,'#1F7A6E',900,'start');y+=rh+4});
 var HH=y+12;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+'</svg>'},

/* 15 GNSS：4機で位置、5機で異常を見つけ（RAIM）、6機で異常な衛星を外す（FDE）。静止衛星（SBAS）が補正を送る */
nav_gnss:function(l){
 var W=({ja:{t:'GNSS（衛星航法）のしくみ',s4:'4機：位置（緯度・経度・高さ）と時計のずれを求める',s5:'5機：おかしな衛星がないかを見つける（RAIM）',s6:'6機：おかしな衛星を外して使い続ける（FDE）',sbas:'静止衛星（SBAS）：地上の基準局で求めた補正と信頼性の情報を送る',names:'GPS（米）・GLONASS（露）・Galileo（欧）・BeiDou（中）。日本の「みちびき」はGPSを補う',ref:'基準局'},
  ko:{t:'GNSS(위성항법)의 원리',s4:'4기: 위치(위도·경도·높이)와 시계 오차를 구한다',s5:'5기: 이상한 위성이 없는지 찾아낸다(RAIM)',s6:'6기: 이상한 위성을 빼고 계속 쓴다(FDE)',sbas:'정지위성(SBAS): 지상 기준국에서 구한 보정과 신뢰성 정보를 보낸다',names:'GPS(미)·GLONASS(러)·Galileo(유럽)·BeiDou(중). 일본의 ‘미치비키’는 GPS를 보완',ref:'기준국'},
  en:{t:'How GNSS (satellite navigation) works',s4:'4 satellites: position (latitude, longitude, height) and receiver clock error',s5:'5 satellites: detect a faulty satellite (RAIM)',s6:'6 satellites: exclude the faulty one and carry on (FDE)',sbas:'Geostationary satellite (SBAS): sends corrections and integrity data worked out by ground reference stations',names:'GPS (US), GLONASS (Russia), Galileo (EU), BeiDou (China); Japan’s QZSS (Michibiki) supplements GPS',ref:'Reference station'}})[l];
 if(!W)return F.nav_gnss('ja');
 setK(1);var FS=H.FS,LI=H.LINES;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,330,'#0E2238',14);
 s+='<path d="M20 386 Q320 300 620 386 Z" fill="#2F6FA8"/><path d="M20 386 Q320 330 620 386" fill="none" stroke="#9FD3F7" stroke-width="2"/>';
 var sats=[[90,110],[200,80],[330,70],[450,95],[500,160],[140,190]],rx=320,ry=300;
 sats.forEach(function(p,i){s+='<g transform="translate('+p[0]+' '+p[1]+')"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#F2D233"/><rect x="-24" y="-3" width="14" height="6" fill="#9FD3F7"/><rect x="10" y="-3" width="14" height="6" fill="#9FD3F7"/></g>'});
 /* 何機の衛星を使うかを順に示す */
 [[0,4,'#7CF2B0'],[1,5,'#FFD23F'],[2,6,'#FF9B7A']].forEach(function(v,k){var g='';for(var i=0;i<v[1];i++)g+='<line x1="'+sats[i][0]+'" y1="'+sats[i][1]+'" x2="'+rx+'" y2="'+ry+'" stroke="'+v[2]+'" stroke-width="2.5" stroke-dasharray="6 5"/>';
  s+='<g opacity="0">'+g+'<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;'+(k/3).toFixed(2)+';'+(k/3+0.02).toFixed(2)+';'+((k+1)/3-0.02).toFixed(2)+';'+((k+1)/3).toFixed(2)+';1" dur="9s" repeatCount="indefinite"/></g>'});
 s+='<g transform="translate('+rx+' '+ry+')">'+plane('#fff')+'</g>';
 /* SBAS */
 s+='<g transform="translate(575 78)"><circle r="14" fill="#E08A2F"/><rect x="-26" y="-4" width="12" height="8" fill="#9FD3F7"/><rect x="14" y="-4" width="12" height="8" fill="#9FD3F7"/></g>'+tx(575,110,'SBAS',11,'#FFB870',900);
 s+='<g transform="translate(520 360)"><path d="M-8 0 L0 -22 L8 0 Z" fill="#fff"/></g>'+tx(520,378,W.ref,10.5,'#fff',800);
 s+='<path d="M520 336 L570 96" stroke="#E08A2F" stroke-width="2" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/></path><path d="M565 96 L340 290" stroke="#E08A2F" stroke-width="2" stroke-dasharray="4 4" opacity=".8"><animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/></path>';
 var y=398,items=[[W.s4,'#1F7A6E'],[W.s5,'#8a6d00'],[W.s6,'#B8451F'],[W.sbas,'#8a3b00'],[W.names,G]];
 items.forEach(function(v,i){var n=LI(v[0],11.5,540).length,lh=FS(11.5)*1.3,h=n*lh+14;s+=R(20,y,600,h,['#E8F5F2','#FFF7DA','#FDEAE3','#FFF1E3','#F4F7FB'][i],10)+WR(40,y+7+n*lh/2+FS(11.5)*0.3,v[0],11.5,v[1],800,540,'start');y+=h+6});
 var HH=y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+'</svg>'},

/* 16 ウェイポイントでの曲がり方：フライバイ・フライオーバー・RF（一定の半径の円弧） */
nav_turns:function(l){
 var W=({ja:{t:'ウェイポイントでの曲がり方',fb:'フライバイ',fo:'フライオーバー',rf:'RF（円弧）',dfb:'手前から曲がり始め、点の内側を回る。ふつうはこちら',dfo:'点の真上を通ってから曲がるので、外へふくらむ',drf:'決まった半径の円弧を正確に飛ぶ。RNP AR などで使う'},
  ko:{t:'웨이포인트에서 도는 방법',fb:'플라이바이',fo:'플라이오버',rf:'RF(원호)',dfb:'앞에서부터 돌기 시작해 점의 안쪽을 돈다. 보통은 이쪽',dfo:'점 바로 위를 지난 뒤 돌기 때문에 바깥으로 부푼다',drf:'정해진 반지름의 원호를 정확히 난다. RNP AR 등에서 쓴다'},
  en:{t:'How aircraft turn at waypoints',fb:'Fly-by',fo:'Fly-over',rf:'RF (arc)',dfb:'Starts turning early and cuts inside the point; the usual case',dfo:'Passes directly over the point before turning, so it swings wide',drf:'Flies an arc of a fixed radius precisely; used in RNP AR and similar'}})[l];
 if(!W)return F.nav_turns('ja');
 setK(1);var nar=NARROW(),FS=H.FS,LI=H.LINES;
 function panel(x0,y0,w,k){var name=[W.fb,W.fo,W.rf][k],desc=[W.dfb,W.dfo,W.drf][k],col=['#2F6FD6','#E08A2F','#1F7A6E'][k];
  var g=R(x0,y0,w,200,'#fff',14,' stroke="'+col+'" stroke-width="3"')+tx(x0+w/2,y0+28,name,14,col,900);
  var A=[x0+30,y0+170],P=[x0+w*0.5,y0+70],B=[x0+w-30,y0+170];
  g+='<path d="M'+A[0]+' '+A[1]+' L'+P[0]+' '+P[1]+' L'+B[0]+' '+B[1]+'" fill="none" stroke="#9FB0C2" stroke-width="2" stroke-dasharray="6 5"/>';
  if(k<2)g+='<g transform="translate('+P[0]+' '+P[1]+')"><path d="M0 -10 L9 6 L-9 6 Z" fill="#fff" stroke="'+col+'" stroke-width="3"/>'+(k===1?'<circle r="14" fill="none" stroke="'+col+'" stroke-width="2"/>':'')+'</g>';
  var path;
  if(k===0){var a1=[A[0]+(P[0]-A[0])*0.68,A[1]+(P[1]-A[1])*0.68],b1=[P[0]+(B[0]-P[0])*0.32,P[1]+(B[1]-P[1])*0.32];path='M'+A[0]+' '+A[1]+' L'+a1[0].toFixed(0)+' '+a1[1].toFixed(0)+' Q'+P[0]+' '+P[1]+' '+b1[0].toFixed(0)+' '+b1[1].toFixed(0)+' L'+B[0]+' '+B[1]}
  else if(k===1){var dx=P[0]-A[0],dy=P[1]-A[1],dl=Math.sqrt(dx*dx+dy*dy),ux=dx/dl,uy=dy/dl,ex=B[0]-P[0],ey=B[1]-P[1],el=Math.sqrt(ex*ex+ey*ey),vx=ex/el,vy=ey/el,O=[P[0]+ux*34,P[1]+uy*34],J=[P[0]+ex*0.62,P[1]+ey*0.62];
   path='M'+A[0]+' '+A[1]+' L'+P[0]+' '+P[1]+' L'+O[0].toFixed(0)+' '+O[1].toFixed(0)+' C'+(O[0]+ux*40).toFixed(0)+' '+(O[1]+uy*40).toFixed(0)+' '+(J[0]-vx*50).toFixed(0)+' '+(J[1]-vy*50).toFixed(0)+' '+J[0].toFixed(0)+' '+J[1].toFixed(0)+' L'+B[0]+' '+B[1]}
  else{var cx=x0+w/2,cy=y0+170,r=w*0.34;path='M'+(cx-r)+' '+cy+' A'+r+' '+r+' 0 0 1 '+(cx+r)+' '+cy;g+='<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="'+col+'"/><line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r*0.7).toFixed(0)+'" y2="'+(cy-r*0.7).toFixed(0)+'" stroke="'+col+'" stroke-width="1.5" stroke-dasharray="3 3"/>'}
  g+='<path d="'+path+'" fill="none" stroke="'+col+'" stroke-width="4"/>';
  g+='<g>'+plane('#fff')+'<animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path="'+path+'"/></g>';
  var n=LI(desc,11,w-24).length,lh=FS(11)*1.3;g+=R(x0,y0+208,w,n*lh+16,'#F4F7FB',10)+WR(x0+w/2,y0+216+n*lh/2+FS(11)*0.3,desc,11,D,800,w-24);
  return {s:g,h:208+n*lh+16}}
 var s,HH;
 if(nar){var y=56,body='';for(var k=0;k<3;k++){var p=panel(20,y,540,k);body+=p.s;y+=p.h+14}HH=y+4;s=R(0,0,580,HH,'#F7FAFD')+TTL(290,30,W.t,15,'#0f3558',540)+body;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 '+HH.toFixed(0)+'" role="img">'+s+'</svg>'}
 var ps=[0,1,2].map(function(k){return panel(20+k*290,56,270,k)}),mh=Math.max(ps[0].h,ps[1].h,ps[2].h);HH=56+mh+14;
 s=R(0,0,900,HH,'#F7FAFD')+TTL(450,30,W.t,16,'#0f3558',860)+ps.map(function(p){return p.s}).join('');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 '+HH.toFixed(0)+'" role="img">'+s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
