/* 空中航法と計算（Part 11）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使って window.FIGS に追加する
   ・どの図も lang（ja / ko / en）を受け取り、図の中の文字をその言語で書く
   ・スマートフォン（幅700px未満）では縦に並べるか、横にスクロールさせる */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,ARW=H.ARW,SCR=H.SCR,plane=H.plane,NARROW=H.NARROW,setK=H.setK;
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
  s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 1080" role="img">'+R(0,0,460,1080,'#F7FAFD')+WR(230,30,W.t,15,'#0f3558',900,420);
  W.s.forEach(function(v,i){var y=70+i*200,c=cols[i];
   s+='<g>'+R(20,y,420,150,'#fff',16,' stroke="'+c+'" stroke-width="3"')+tx(70,y+62,v[0],30,c,900)+tx(150,y+50,v[1],15,D,900,'start')+WR(290,y+92,v[2],12,G,800,270)+LB(290,y+132,W.use[i],11,'#fff','middle',c)+'<animate attributeName="opacity" values=".45;1;1;.45" keyTimes="0;'+(i*0.18).toFixed(2)+';'+(i*0.18+0.2).toFixed(2)+';1" dur="9s" repeatCount="indefinite"/></g>';
   if(i<4)s+=ARW(230,y+156,230,y+194,'#9FB0C2',5)+LB(300,y+178,W.fx[i],11,'#40566B','start')});
 }else{
  s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+R(0,0,900,380,'#F7FAFD')+tx(450,30,W.t,15,'#0f3558',900);
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
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" role="img">'+R(0,0,640,560,'#F7FAFD')+WR(320,28,W.t,15,'#0f3558',900,600);
 s+='<defs><linearGradient id="itg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9FD3F7"/><stop offset="1" stop-color="#2B4F8F"/></linearGradient></defs>'+R(20,54,340,440,'url(#itg)',14)+R(20,494,340,16,'#9CC98B',0);
 /* 空気の粒：下ほど多く */
 var dots='';for(var r=0;r<14;r++){var y=480-r*30,n=Math.max(1,Math.round(14*Math.pow(1-r/14,1.6)));for(var j=0;j<n;j++){var x=32+(j+0.5)*(320/n)+((r%2)?8:-8);dots+='<circle cx="'+x.toFixed(0)+'" cy="'+y+'" r="3.2" fill="#fff" opacity=".65"/>'}}
 s+=dots+LB(190,86,W.thin,11,'#fff','middle','#2B4F8F')+LB(190,466,W.thick,11,'#0f3558','middle','#CFE8F7');
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
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 520" role="img">'+R(0,0,640,520,'#F7FAFD')+WR(320,28,W.t,15,'#0f3558',900,600);
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
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 520" role="img">'+R(0,0,640,520,'#F7FAFD')+WR(320,28,W.t,15,'#0f3558',900,600);
 s+=rw(50,W.cool,W.da0,'#2F8FE0',330,5,false)+rw(214,W.hot,W.da1,'#D64545',470,5,true);
 s+=R(20,380,600,126,'#fff',14,' stroke="#D9E3EC"')+WR(320,414,W.eff,12,D,900,570)+WR(320,462,W.rule,11.5,'#8a3b00',900,570);
 setK(1);return s+'</svg>'}
};
for(var k in F)window.FIGS[k]=F[k];
})();
