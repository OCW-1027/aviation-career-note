/* 記事の図（SVG）— 言語に依存しない番号・記号で描き、説明は記事の表で各言語に。window.FIGS[id]() がSVG文字列を返す */
(function(){
var Y='#F2B233',B='#2F8FE0',G='#8a96a3',D='#243447',W='#ffffff',T='#1F7A6E';
function wh(x,y,r){r=r||13;return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+D+'"/><circle cx="'+x+'" cy="'+y+'" r="'+Math.round(r*.4)+'" fill="'+G+'"/>'}
function R(x,y,w,h,f,rx,ex){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+f+'"'+(ex||'')+'/>'}
function badge(n,x,y,r,c){r=r||17;return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(c||T)+'"/><text x="'+x+'" y="'+(y+6)+'" font-size="'+(r+1)+'" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">'+n+'</text>'}
function cab(x){return R(x,112,60,48,D,8)+R(x+6,118,40,20,'#9fd3fa',3)}
var GSE={
1:R(40,110,200,50,Y,10)+R(150,80,60,34,D,6)+R(158,86,44,20,'#9fd3fa',3)+R(236,130,30,10,G)+wh(80,165,16)+wh(200,165,16),
2:R(40,130,150,30,Y,8)+'<polygon points="60,128 250,60 262,72 74,140" fill="'+D+'"/>'+R(60,104,30,26,D,4)+wh(70,165)+wh(165,165),
3:R(30,130,230,28,Y,6)+R(60,76,200,12,G)+'<g stroke="'+D+'" stroke-width="6"><line x1="90" y1="88" x2="170" y2="130"/><line x1="170" y1="88" x2="90" y2="130"/></g>'+R(120,44,90,32,B,4)+R(30,98,34,32,D,4)+wh(60,164)+wh(230,164),
4:R(20,126,60,34,Y,8)+R(36,104,30,24,D,4)+wh(38,164,11)+wh(68,164,11)+R(100,104,80,50,B,4)+R(196,104,80,50,B,4)+R(104,112,70,36,'#6fb3e6')+R(200,112,72,36,'#6fb3e6')+'<g stroke="'+D+'" stroke-width="4"><line x1="80" y1="150" x2="100" y2="150"/><line x1="180" y1="150" x2="196" y2="150"/></g>'+wh(115,164,10)+wh(165,164,10)+wh(212,164,10)+wh(262,164,10),
5:R(50,80,190,80,W,10,' stroke="'+G+'" stroke-width="3"')+R(60,92,80,40,'#dbe3ec',4)+'<polygon points="104,98 90,118 100,118 94,134 112,110 102,110 108,98" fill="'+B+'"/><path d="M240 110 C 270 110 270 60 285 60" stroke="'+D+'" stroke-width="7" fill="none"/>'+wh(85,165)+wh(205,165),
6:R(40,84,190,76,W,10,' stroke="'+G+'" stroke-width="3"')+'<circle cx="100" cy="122" r="26" fill="#dbe3ec"/><g stroke="'+B+'" stroke-width="4"><line x1="100" y1="100" x2="100" y2="144"/><line x1="80" y1="112" x2="120" y2="132"/><line x1="80" y1="132" x2="120" y2="112"/></g><path d="M230 120 C 262 120 262 150 290 150" stroke="'+B+'" stroke-width="16" fill="none" stroke-linecap="round"/>'+wh(75,165)+wh(195,165),
7:R(30,130,140,30,Y,8)+R(40,104,40,28,D,4)+'<polygon points="120,130 240,50 262,50 262,62 145,140" fill="'+W+'" stroke="'+G+'" stroke-width="3"/>'+R(240,30,30,22,'none',0,' stroke="'+G+'" stroke-width="3"')+wh(60,165)+wh(150,165),
8:R(30,130,230,28,G,6)+R(36,96,44,34,D,4)+'<g stroke="'+D+'" stroke-width="6"><line x1="110" y1="80" x2="220" y2="128"/><line x1="220" y1="80" x2="110" y2="128"/></g>'+R(96,20,160,60,W,4,' stroke="'+G+'" stroke-width="3"')+R(172,34,56,34,Y,4)+wh(60,164)+wh(230,164),
9:cab(30)+R(92,100,170,60,'#7A5CC7',22)+'<path d="M262 118 C 280 118 280 80 292 80" stroke="'+D+'" stroke-width="6" fill="none"/><text x="178" y="140" font-size="22" font-weight="700" fill="#fff" text-anchor="middle" font-family="Arial">LAV</text>'+wh(60,165)+wh(130,165)+wh(230,165),
10:cab(30)+R(92,100,170,60,B,22)+'<path d="M262 118 C 280 118 280 80 292 80" stroke="'+D+'" stroke-width="6" fill="none"/><path d="M178 112 C 190 128 192 134 192 138 A 14 14 0 0 1 164 138 C 164 134 166 128 178 112 Z" fill="#fff"/>'+wh(60,165)+wh(130,165)+wh(230,165),
11:cab(40)+R(100,120,160,40,'#D0506A',6)+R(170,70,70,50,G,4)+R(176,60,58,12,Y)+'<path d="M110 150 C 90 150 80 172 60 172" stroke="'+D+'" stroke-width="7" fill="none"/><text x="135" y="147" font-size="18" font-weight="700" fill="#fff" font-family="Arial">FUEL</text>'+wh(70,165)+wh(225,165),
12:cab(30)+R(92,110,150,50,'#E08A2F',12)+'<line x1="170" y1="110" x2="230" y2="50" stroke="'+D+'" stroke-width="10"/>'+R(220,30,46,30,Y,6)+'<path d="M266 40 q 16 10 26 30" stroke="#E08A2F" stroke-width="4" stroke-dasharray="4 4" fill="none"/>'+wh(60,165)+wh(130,165)+wh(215,165)};
function plane(y0){/* 上から見た機体（機首が上） */
 var y=y0||0;return '<g transform="translate(0,'+y+')"><path d="M444 150 C 470 150 478 190 478 230 L 478 520 C 478 560 460 600 444 610 C 428 600 410 560 410 520 L 410 230 C 410 190 418 150 444 150 Z" fill="#fff" stroke="#5b6b7d" stroke-width="3"/><path d="M410 320 L 170 400 L 170 425 L 410 385 Z M478 320 L 718 400 L 718 425 L 478 385 Z" fill="#fff" stroke="#5b6b7d" stroke-width="3"/><path d="M420 560 L 350 600 L 350 612 L 430 595 Z M468 560 L 538 600 L 538 612 L 458 595 Z" fill="#fff" stroke="#5b6b7d" stroke-width="3"/>'+R(290,372,28,56,'#dbe3ec',10,' stroke="#5b6b7d" stroke-width="2"')+R(570,372,28,56,'#dbe3ec',10,' stroke="#5b6b7d" stroke-width="2"')+'</g>'}
var DUR=14;
function show(t){var a=Math.max(.001,t/DUR-.001),b=t/DUR;return '<animate attributeName="opacity" dur="'+DUR+'s" repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;'+a.toFixed(3)+';'+b.toFixed(3)+';0.93;1"/>'}
function veh(x,y,w,h,c,t,rot){return '<g opacity="0"'+(rot?' transform="rotate('+rot+' '+(x+w/2)+' '+(y+h/2)+')"':'')+'>'+show(t)+R(x,y,w,h,c,6,' stroke="'+D+'" stroke-width="2"')+'</g>'}
function num(x,y,n,t){return '<g opacity="0">'+show(t)+badge(n,x,y,15)+'</g>'}
function cone(x,y){return '<polygon points="'+(x-7)+','+(y+15)+' '+x+','+y+' '+(x+7)+','+(y+15)+'" fill="#E08A2F"/>'}
window.FIGS={
gse_catalog:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 660" role="img"><rect width="1200" height="660" fill="#F7FAFD"/>';
 for(var n=1;n<=12;n++){var c=(n-1)%4,r=Math.floor((n-1)/4);s+='<g transform="translate('+(c*300)+','+(r*220+10)+')">'+R(8,0,284,200,W,16,' stroke="#e3eaf2"')+R(10,176,280,4,'#dbe3ec',2)+GSE[n]+badge(n,34,28)+'</g>'}
 return s+'</svg>'},
turnaround:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" role="img"><rect width="900" height="640" fill="#9aa5b1"/>'+R(0,0,900,110,'#e8eef5')+'<text x="20" y="40" font-size="20" fill="#5b6b7d" font-family="Arial">TERMINAL</text>'+R(440,120,8,500,'#FFE08A')+plane();
 s+='<g opacity="0">'+show(.3)+R(436,226,16,8,Y)+R(420,470,10,16,Y)+R(458,470,10,16,Y)+cone(172,425)+cone(716,425)+cone(444,615)+cone(303,427)+cone(585,427)+'</g>';
 s+='<g opacity="0">'+show(1)+'<rect x="300" y="100" width="40" height="120" fill="#cfd8e2" stroke="'+D+'" stroke-width="2" transform="rotate(-30 320 160)"/>'+R(386,196,30,24,'#cfd8e2',0,' stroke="'+D+'" stroke-width="2"')+'</g>'+num(300,120,7,1);
 var L=[[470,130,60,34,W,2,0,545,130,5],[340,260,40,60,W,2.5,0,330,250,6],[478,260,90,26,Y,3.5,-15,585,250,2],[478,470,100,44,Y,4,0,595,480,3],[478,180,70,40,G,6,0,560,180,8],[478,540,70,40,G,6.3,0],[330,520,70,34,'#7A5CC7',7,0,318,520,9],[330,460,70,34,B,7.5,0,318,462,10],[560,420,70,34,'#D0506A',8.5,0,645,440,11],[426,110,36,40,Y,11,0,470,96,1]];
 L.forEach(function(v){s+=veh(v[0],v[1],v[2],v[3],v[4],v[5],v[6]);if(v[9])s+=num(v[7],v[8],v[9],v[5])});
 s+='<g opacity="0">'+show(4.5)+R(620,250,40,26,B,0,' stroke="'+D+'" stroke-width="2"')+R(670,250,40,26,B,0,' stroke="'+D+'" stroke-width="2"')+R(620,480,50,34,B,0,' stroke="'+D+'" stroke-width="2"')+R(680,480,50,34,B,0,' stroke="'+D+'" stroke-width="2"')+'</g>'+num(740,262,4,4.5);
 s+='<text x="880" y="40" font-size="18" text-anchor="end" fill="#5b6b7d" font-family="Arial">STA → STD</text>'+R(700,55,180,10,'#dbe3ec',5)+'<rect x="700" y="55" width="0" height="10" rx="5" fill="'+T+'"><animate attributeName="width" dur="'+DUR+'s" values="0;180;180" keyTimes="0;0.93;1" repeatCount="indefinite"/></rect>';
 return s+'</svg>'},
loadsheet:function(){var L=[
['LOADSHEET             CHECKED       APPROVED        EDNO',2],
['ALL WEIGHTS IN KILOS  T.TANAKA      CAPT.SMITH      01',2],
['FROM/TO  FLIGHT     A/C REG  VERSION   CREW   DATE     TIME',1],
['NRT BKK  ZZ0712/24  HS-ZZA   C12Y162   2/6    24SEP26  1040',1],
['                     WEIGHT   DISTRIBUTION',0],
['LOAD IN COMPARTMENTS   5700   1/1500 3/2100 4/1800 5/300',3],
['PASSENGER/CABIN BAG   11390   150/4/1  TTL 155  CAB 0',4],
['TOTAL TRAFFIC LOAD    17090',0],
['DRY OPERATING WEIGHT  43600',5],
['ZERO FUEL WEIGHT ACTUAL 60690  MAX 62700   L',6],
['TAKE OFF FUEL         12600',7],
['TAKE OFF WEIGHT ACTUAL  73290  MAX 79000',7],
['TRIP FUEL             10300',8],
['LANDING WEIGHT ACTUAL   62990  MAX 66300',8],
['UNDERLOAD BEFORE LMC    2010              LMC TOTAL',9],
['BALANCE AND SEATING CONDITIONS   LAST MINUTE CHANGES',0],
['DOI 47.30  DLI 41.20            DEST SPEC CL/CPT  +/-  WEIGHT',12],
['LIZFW 44.70  LITOW 46.80  LILAW 45.90',10],
['MACZFW 26.2  MACTOW 27.4   STAB TO 1.0 UP',10],
['SEATING  0A/40  0B/60  0C/54',11],
['PREPARED BY  T.TANAKA   SIGNATURE  ...........',13]];
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" role="img"><rect width="900" height="700" fill="#F7FAFD"/>'+R(30,20,760,660,W,10,' stroke="'+G+'" stroke-width="2"');
 var seen={};L.forEach(function(l,i){var y=58+i*30;if(l[1]){var c=['','#2F8FE0','#7A5CC7','#E08A2F','#E08A2F',T,'#D0506A','#D0506A','#D0506A','#1F7A6E','#2C6BAE','#2C6BAE','#8a96a3','#5b6b7d'][l[1]]||T;s+=R(42,y-20,736,26,c,4,' opacity=".10"');if(!seen[l[1]]){seen[l[1]]=1;s+=badge(l[1],826,y-7,15,c)+'<line x1="778" y1="'+(y-7)+'" x2="810" y2="'+(y-7)+'" stroke="'+c+'" stroke-width="2" stroke-dasharray="4 3"/>'}}
  s+='<text x="52" y="'+y+'" font-size="16" fill="'+D+'" font-family="Consolas,Menlo,monospace" xml:space="preserve">'+l[0].replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text>'});
 return s+'</svg>'},
lir:function(){var L=[
['LOADING INSTRUCTION/REPORT      PREPARED T.TANAKA  EDNO 01',1],
['FLT ZZ0712/24  NRT-BKK  HS-ZZA  ZA-174  STD 1040',1],
['CPT  MAX   PLANNED LOAD               LOADED (REPORT)',2],
[' 1   3400  BKK/B  900  BKK/C  600      ................',3],
[' 3   2600  BKK/C 1500  BKK/M  600      ................',3],
[' 4   2600  BKK/B 1800                  ................',3],
[' 5   1500  BKK/B  260  AVIH 1/40       ................',3],
['SPECIAL LOADS  ICE UN1845 40KG CPT3   AVIH 1 CPT5',4],
['               SEE NOTOC',4],
['INSTRUCTIONS   AVIH LOAD LAST  KEEP AWAY FROM ICE',5],
['               PRIORITY BAGS NEAR DOOR CPT4',5],
['LOADED AS SHOWN  EXCEPT ........................',6],
['SUPERVISOR  ........   SIGNATURE ........  TIME ....',7]];
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 470" role="img"><rect width="900" height="470" fill="#F7FAFD"/>'+R(30,20,760,430,W,10,' stroke="'+G+'" stroke-width="2"');
 var seen={};L.forEach(function(l,i){var y=58+i*30,c=['',T,'#2C6BAE','#2F8FE0','#D0506A','#E08A2F','#7A5CC7','#5b6b7d'][l[1]];s+=R(42,y-20,736,26,c,4,' opacity=".10"');if(!seen[l[1]]){seen[l[1]]=1;s+=badge(l[1],826,y-7,15,c)+'<line x1="778" y1="'+(y-7)+'" x2="810" y2="'+(y-7)+'" stroke="'+c+'" stroke-width="2" stroke-dasharray="4 3"/>'}
  s+='<text x="52" y="'+y+'" font-size="16" fill="'+D+'" font-family="Consolas,Menlo,monospace" xml:space="preserve">'+l[0]+'</text>'});
 return s+'</svg>'},
hold_layout:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560" role="img"><rect width="900" height="560" fill="#F7FAFD"/>';
 function ac(y,h,holds,w1,w2,cont){var x0=70,x1=800,fl=y+h*0.52;
  s+='<path d="M'+(x0+70)+' '+y+' L'+x1+' '+y+' L'+(x1+60)+' '+(y-55)+' L'+(x1+80)+' '+(y-55)+' L'+(x1+70)+' '+(y+h*0.45)+' L'+(x1-10)+' '+(y+h)+' L'+(x0+70)+' '+(y+h)+' Q'+x0+' '+(y+h)+' '+(x0-10)+' '+(y+h*0.55)+' Q'+(x0+10)+' '+y+' '+(x0+70)+' '+y+' Z" fill="#fff" stroke="'+D+'" stroke-width="3"/>';
  for(var wx=x0+110;wx<x1-30;wx+=34)s+='<circle cx="'+wx+'" cy="'+(y+h*0.25)+'" r="5" fill="#9fd3fa"/>';
  s+='<line x1="'+(x0+20)+'" y1="'+fl+'" x2="'+(x1-20)+'" y2="'+fl+'" stroke="'+G+'" stroke-width="2" stroke-dasharray="6 5"/>';
  s+='<polygon points="'+w1+','+(y+h*0.6)+' '+w2+','+(y+h*0.6)+' '+(w2+60)+','+(y+h+45)+' '+(w1+80)+','+(y+h+45)+'" fill="'+G+'" opacity=".55"/>';
  holds.forEach(function(k){var hx=k[1],hw=k[2],hy=fl+8,hh=y+h-10-hy;s+=R(hx,hy,hw,hh,k[3],6,' opacity=".85"');
   if(cont&&k[0]!=='5'){for(var cx=hx+6;cx+30<=hx+hw-4;cx+=36)s+=R(cx,hy+6,30,hh-12,'#ffffff',3,' opacity=".55"')}
   s+='<text x="'+(hx+hw/2)+'" y="'+(hy+hh/2+9)+'" font-size="26" font-weight="700" text-anchor="middle" fill="'+D+'" font-family="Arial,sans-serif">'+k[0]+'</text>'});
  s+=R((w1+w2)/2-45,y-26,90,14,T,7,' opacity=".55"')+badge('A',(w1+w2)/2,y-44,15,T);
  s+=badge('B',holds[0][1]+holds[0][2]-20,fl-16,13,'#E08A2F')+badge('B',holds[holds.length-2][1]+30,fl-16,13,'#E08A2F');}
 ac(90,160,[['1',150,180,B],['3',470,105,B],['4',582,105,B],['5',694,70,Y]],345,455,false);
 ac(345,180,[['1',140,118,B],['2',262,118,B],['3',482,118,B],['4',604,110,B],['5',718,62,Y]],385,475,true);
 s+='<text x="30" y="548" font-size="18" font-weight="700" fill="'+D+'" font-family="Arial,sans-serif">← FWD</text><text x="870" y="548" font-size="18" font-weight="700" text-anchor="end" fill="'+D+'" font-family="Arial,sans-serif">AFT →</text>';
 s+=badge('C',40,170,16,D)+badge('D',40,435,16,D);
 return s+'</svg>'},
cg_balance:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" role="img"><rect width="900" height="420" fill="#F7FAFD"/>';
 s+=R(120,150,660,14,D,7)+'<polygon points="450,166 420,226 480,226" fill="'+G+'"/>'+R(385,140,130,34,T,6,' opacity=".35"');
 s+='<line x1="385" y1="120" x2="385" y2="190" stroke="#D0506A" stroke-width="4"/><line x1="515" y1="120" x2="515" y2="190" stroke="#D0506A" stroke-width="4"/>';
 s+=badge('A',385,100,16,'#D0506A')+badge('B',515,100,16,'#D0506A')+badge('C',450,250,16,T);
 s+=R(170,100,70,50,B,6)+R(260,110,50,40,B,6)+R(600,105,60,45,B,6)+R(680,115,40,35,B,6);
 s+='<text x="120" y="60" font-size="18" font-weight="700" fill="'+D+'" font-family="Arial,sans-serif">← FWD</text><text x="780" y="60" font-size="18" font-weight="700" text-anchor="end" fill="'+D+'" font-family="Arial,sans-serif">AFT →</text>';
 function mini(x,ang,lab,c,m){s+='<g transform="translate('+x+',340) rotate('+ang+')">'+R(-140,-7,280,14,c,7)+(m?R(70,-40,50,33,B,5)+R(-120,-35,40,28,B,5):R(-120,-40,50,33,B,5)+R(70,-35,40,28,B,5))+'</g><polygon points="'+x+',348 '+(x-20)+',392 '+(x+20)+',392" fill="'+G+'"/>'+badge(lab,x,300,15,c)}
 mini(230,-12,'D','#D0506A');mini(670,12,'E','#E08A2F',1);
 s+='<line x1="520" y1="392" x2="820" y2="392" stroke="'+G+'" stroke-width="3"/><line x1="80" y1="392" x2="380" y2="392" stroke="'+G+'" stroke-width="3"/>';
 return s+'</svg>'},
taf_example:function(){var L=[
['TAF RJTT 250500Z 2506/2612',1],
['    18012KT 9999 FEW020 SCT040',4],
['    BECMG 2509/2511 22018G30KT',5],
['    TEMPO 2512/2518 4000 SHRA BKN015',6],
['    PROB30 TEMPO 2518/2521 1500 TSRA BKN010CB',7],
['    FM260300 34010KT 9999 FEW030=',8]];
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" role="img"><rect width="900" height="300" fill="#F7FAFD"/>'+R(30,20,760,260,W,10,' stroke="'+G+'" stroke-width="2"');
 var C={1:T,2:'#2C6BAE',3:'#7A5CC7',4:'#1F7A6E',5:'#E08A2F',6:'#D0506A',7:'#8a5cc7',8:'#2F8FE0'};
 L.forEach(function(l,i){var y=66+i*38,c=C[l[1]];s+=R(42,y-24,736,32,c,5,' opacity=".10"');s+='<text x="54" y="'+y+'" font-size="19" fill="'+D+'" font-family="Consolas,Menlo,monospace" xml:space="preserve">'+l[0]+'</text>';
  if(i===0){s+='<line x1="115" y1="'+(y+6)+'" x2="165" y2="'+(y+6)+'" stroke="'+T+'" stroke-width="3"/>'+'<line x1="175" y1="'+(y+6)+'" x2="250" y2="'+(y+6)+'" stroke="#2C6BAE" stroke-width="3"/>'+'<line x1="260" y1="'+(y+6)+'" x2="355" y2="'+(y+6)+'" stroke="#7A5CC7" stroke-width="3"/>';s+=badge(1,826,y-8,15,T)+badge(2,650,y-8,15,'#2C6BAE')+badge(3,700,y-8,15,'#7A5CC7')}
  else s+=badge(l[1],826,y-8,15,c)});
 return s+'</svg>'},
taf_timeline:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img"><rect width="900" height="360" fill="#F7FAFD"/>',x0=120,x1=860,W2=x1-x0;
 function X(h){return x0+W2*h/30}
 s+='<line x1="'+x0+'" y1="320" x2="'+x1+'" y2="320" stroke="'+D+'" stroke-width="2"/>';
 for(var h=0;h<=30;h+=3){s+='<line x1="'+X(h)+'" y1="316" x2="'+X(h)+'" y2="324" stroke="'+D+'"/><text x="'+X(h)+'" y="344" font-size="13" text-anchor="middle" fill="'+D+'" font-family="Consolas,monospace">'+String((6+h)%24).padStart(2,'0')+'Z</text>'}
 var rows=[[4,'#1F7A6E',0,21,'base'],[5,'#E08A2F',3,21,'becmg'],[6,'#D0506A',6,12,'tempo'],[7,'#8a5cc7',12,15,'prob'],[8,'#2F8FE0',21,30,'fm']];
 rows.forEach(function(r,i){var y=40+i*54;s+=badge(r[0],60,y+14,15,r[1]);
  if(r[4]==='base')s+=R(X(r[2]),y,X(r[3])-X(r[2]),28,r[1],6,' opacity=".55"');
  if(r[4]==='becmg'){s+='<polygon points="'+X(3)+','+(y+28)+' '+X(5)+','+y+' '+X(21)+','+y+' '+X(21)+','+(y+28)+'" fill="'+r[1]+'" opacity=".55"/>'}
  if(r[4]==='tempo'){[6.3,7.6,9.1,10.6].forEach(function(t){s+=R(X(t),y,X(t+.7)-X(t),28,r[1],4,' opacity=".75"')});s+=R(X(6),y,X(12)-X(6),28,'none',6,' stroke="'+r[1]+'" stroke-dasharray="6 4" stroke-width="2"')}
  if(r[4]==='prob'){s+=R(X(12),y,X(15)-X(12),28,r[1],6,' opacity=".25"')+R(X(12.8),y,X(13.5)-X(12.8),28,r[1],4,' opacity=".6"')}
  if(r[4]==='fm')s+=R(X(21),y,X(30)-X(21),28,r[1],6,' opacity=".55"')+'<line x1="'+X(21)+'" y1="'+(y-6)+'" x2="'+X(21)+'" y2="'+(y+34)+'" stroke="'+r[1]+'" stroke-width="4"/>'});
 return s+'</svg>'},
aircraft_parts:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" role="img"><rect width="900" height="640" fill="#F7FAFD"/>',F='#ffffff',Sd=D;
 /* top view (nose to the left) */
 s+='<path d="M60 170 Q60 150 100 146 L700 146 L780 158 L800 170 L780 182 L700 194 L100 194 Q60 190 60 170 Z" fill="'+F+'" stroke="'+Sd+'" stroke-width="3"/>';
 s+='<path d="M330 146 L460 40 L500 40 L470 146 Z" fill="'+F+'" stroke="'+Sd+'" stroke-width="3"/><path d="M330 194 L460 300 L500 300 L470 194 Z" fill="'+F+'" stroke="'+Sd+'" stroke-width="3"/>';
 s+='<path d="M700 146 L760 96 L785 96 L770 150 Z" fill="'+F+'" stroke="'+Sd+'" stroke-width="3"/><path d="M700 194 L760 244 L785 244 L770 190 Z" fill="'+F+'" stroke="'+Sd+'" stroke-width="3"/>';
 s+='<path d="M352 128 L462 38" stroke="#2F8FE0" stroke-width="6" opacity=".7"/><path d="M352 212 L462 302" stroke="#2F8FE0" stroke-width="6" opacity=".7"/>';
 s+='<path d="M478 120 L497 44" stroke="#E08A2F" stroke-width="6" opacity=".8"/><path d="M478 220 L497 296" stroke="#E08A2F" stroke-width="6" opacity=".8"/>';
 s+='<path d="M472 140 L478 120" stroke="#1F7A6E" stroke-width="6"/><path d="M472 200 L478 220" stroke="#1F7A6E" stroke-width="6"/>';
 s+=R(430,96,34,14,'#7A5CC7',3,' opacity=".8"')+R(430,230,34,14,'#7A5CC7',3,' opacity=".8"');
 s+='<path d="M500 40 L512 26" stroke="'+Sd+'" stroke-width="5"/><path d="M500 300 L512 314" stroke="'+Sd+'" stroke-width="5"/>';
 s+=R(378,92,40,16,G,6)+R(378,232,40,16,G,6);
 s+='<path d="M772 102 L783 150" stroke="#D0506A" stroke-width="5" opacity=".8"/><path d="M772 238 L783 190" stroke="#D0506A" stroke-width="5" opacity=".8"/>';
 var tb=[[1,70,170,'#5b6b7d'],[2,398,100,'#5b6b7d'],[3,420,72,'#2F8FE0'],[4,490,72,'#E08A2F'],[5,447,237,'#7A5CC7'],[6,475,130,'#1F7A6E'],[7,507,31,'#5b6b7d'],[8,745,112,'#5b6b7d'],[9,778,126,'#D0506A']];
 var pos={1:[40,110],2:[330,60],3:[400,20],4:[560,60],5:[420,330],6:[560,140],7:[570,20],8:[700,60],9:[850,110]};
 tb.forEach(function(t){var p=pos[t[0]];s+='<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+t[1]+'" y2="'+t[2]+'" stroke="'+t[3]+'" stroke-width="1.5" stroke-dasharray="4 3"/>'+badge(t[0],p[0],p[1],14,t[3])});
 /* side view */
 var y=470;
 s+='<path d="M70 '+y+' Q70 430 130 426 L700 426 L760 400 L800 330 L840 330 L830 426 L840 470 L760 486 L130 490 Q70 490 70 '+y+' Z" fill="'+F+'" stroke="'+Sd+'" stroke-width="3"/>';
 s+='<path d="M90 450 L120 438 L140 442 L120 454 Z" fill="#9fd3fa"/>';
 for(var wx=170;wx<700;wx+=24)s+='<rect x="'+wx+'" y="442" width="10" height="12" rx="4" fill="#9fd3fa"/>';
 s+=R(150,436,16,42,'#1D2A3A',3,' opacity=".75"')+R(650,436,16,42,'#1D2A3A',3,' opacity=".75"');
 s+=R(230,468,60,20,'#E08A2F',3,' opacity=".65"')+R(560,468,50,20,'#E08A2F',3,' opacity=".65"');
 s+='<path d="M812 336 L840 336 L832 424 L806 424 Z" fill="#D0506A" opacity=".5"/>';
 s+='<circle cx="838" cy="448" r="6" fill="'+Sd+'"/>';
 s+=R(380,478,70,26,G,10);
 s+='<line x1="160" y1="490" x2="160" y2="525" stroke="'+Sd+'" stroke-width="4"/><circle cx="160" cy="532" r="9" fill="'+Sd+'"/><line x1="470" y1="490" x2="470" y2="525" stroke="'+Sd+'" stroke-width="5"/><circle cx="462" cy="534" r="11" fill="'+Sd+'"/><circle cx="482" cy="534" r="11" fill="'+Sd+'"/>';
 s+='<circle cx="84" cy="470" r="4" fill="#E08A2F"/>';
 var sb=[[10,110,446,70,400,'#5b6b7d'],[11,158,450,180,390,'#1D2A3A'],[12,260,478,260,590,'#E08A2F'],[13,160,528,110,590,'#5b6b7d'],[14,472,525,520,600,'#5b6b7d'],[15,795,370,720,330,'#5b6b7d'],[16,822,380,880,340,'#D0506A'],[17,838,448,880,510,'#5b6b7d'],[18,84,470,40,520,'#E08A2F']];
 sb.forEach(function(t){s+='<line x1="'+t[3]+'" y1="'+t[4]+'" x2="'+t[1]+'" y2="'+t[2]+'" stroke="'+t[5]+'" stroke-width="1.5" stroke-dasharray="4 3"/>'+badge(t[0],t[3],t[4],14,t[5])});
 s+='<text x="20" y="630" font-size="14" fill="'+Sd+'" font-family="Arial,sans-serif">← FWD</text><text x="880" y="630" font-size="14" text-anchor="end" fill="'+Sd+'" font-family="Arial,sans-serif">AFT →</text>';
 return s+'</svg>'},
forces_anim:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 460" role="img"><defs><marker id="fa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker></defs><rect width="900" height="460" fill="#EAF4FD"/>';
 [[120,80,1],[520,60,1.3],[760,120,.9],[300,380,1.1]].forEach(function(c,i){s+='<g opacity=".9"><ellipse cx="'+c[0]+'" cy="'+c[1]+'" rx="'+(46*c[2])+'" ry="'+(16*c[2])+'" fill="#fff"/><ellipse cx="'+(c[0]+30*c[2])+'" cy="'+(c[1]-10*c[2])+'" rx="'+(30*c[2])+'" ry="'+(16*c[2])+'" fill="#fff"/><animateTransform attributeName="transform" type="translate" values="0 0;260 0" dur="'+(7+i*2)+'s" repeatCount="indefinite"/></g>'});
 s+='<g transform="translate(450 230)"><path d="M-170 0 Q-170 -22 -140 -24 L130 -24 L160 -40 L185 -95 L205 -95 L200 -24 L210 0 L160 12 L-140 14 Q-170 14 -170 0 Z" fill="#fff" stroke="'+D+'" stroke-width="3"/><path d="M-40 -2 L40 -2 L70 10 L-20 10 Z" fill="#cfd8e2" stroke="'+D+'" stroke-width="2"/>';
 for(var wx=-120;wx<120;wx+=18)s+='<rect x="'+wx+'" y="-14" width="8" height="8" rx="3" fill="#9fd3fa"/>';
 s+='</g>';
 function arr(x1,y1,x2,y2,c,v){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="10" stroke-linecap="round" marker-end="url(#fa)"><animate attributeName="'+(x1===x2?'y2':'x2')+'" values="'+v+'" dur="2.4s" repeatCount="indefinite"/></line>'}
 s+=arr(450,200,450,70,'#2F8FE0','90;60;90')+arr(450,250,450,400,'#5b6b7d','390;410;390')+arr(270,230,130,230,'#E08A2F','150;110;150')+arr(670,230,800,230,'#D0506A','780;810;780');
 s+=badge('A',490,80,16,'#2F8FE0')+badge('B',490,395,16,'#5b6b7d')+badge('C',160,195,16,'#E08A2F')+badge('D',770,195,16,'#D0506A');
 s+='<text x="20" y="448" font-size="14" fill="'+D+'" font-family="Arial,sans-serif">← FWD</text>';
 return s+'</svg>'},
wing_airflow:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" role="img"><defs><marker id="wa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#2F8FE0"/></marker></defs><rect width="900" height="400" fill="#F7FAFD"/>';
 s+='<path d="M190 215 C 260 120, 520 110, 730 205 C 540 230, 320 238, 190 215 Z" fill="#dbe9f7" opacity=".0"/>';
 s+='<ellipse cx="450" cy="120" rx="260" ry="55" fill="#2F8FE0" opacity=".10"/><ellipse cx="450" cy="285" rx="260" ry="40" fill="#E08A2F" opacity=".10"/>';
 ['360,110','450,95','540,108'].forEach(function(p){var q=p.split(',');s+='<text x="'+q[0]+'" y="'+q[1]+'" font-size="34" font-weight="700" fill="#2F8FE0" text-anchor="middle" font-family="Arial">−</text>'});
 ['360,300','450,308','540,300'].forEach(function(p){var q=p.split(',');s+='<text x="'+q[0]+'" y="'+q[1]+'" font-size="30" font-weight="700" fill="#E08A2F" text-anchor="middle" font-family="Arial">+</text>'});
 [[150,0],[128,1],[106,2]].forEach(function(l,i){var y=l[0];s+='<path d="M40 '+(y+50)+' C 200 '+(y+45)+', 330 '+(y-20+i*6)+', 460 '+(y-26+i*8)+' S 720 '+(y+40)+', 870 '+(y+70)+'" fill="none" stroke="#2F8FE0" stroke-width="3" stroke-dasharray="14 12"><animate attributeName="stroke-dashoffset" values="52;0" dur="0.7s" repeatCount="indefinite"/></path>'});
 [[262,0],[290,1],[318,2]].forEach(function(l,i){var y=l[0];s+='<path d="M40 '+(y-8)+' C 220 '+(y-4)+', 420 '+(y-6)+', 600 '+(y-14)+' S 780 '+(y-20)+', 870 '+(y-20)+'" fill="none" stroke="#E08A2F" stroke-width="3" stroke-dasharray="14 12"><animate attributeName="stroke-dashoffset" values="52;0" dur="1.5s" repeatCount="indefinite"/></path>'});
 s+='<path d="M190 215 C 260 130, 520 118, 730 205 C 540 228, 320 236, 190 215 Z" fill="#fff" stroke="'+D+'" stroke-width="3"/>';
 s+='<line x1="450" y1="170" x2="450" y2="40" stroke="#1F7A6E" stroke-width="10" stroke-linecap="round"><animate attributeName="y2" values="60;30;60" dur="2s" repeatCount="indefinite"/></line><polygon points="450,14 436,40 464,40" fill="#1F7A6E"><animateTransform attributeName="transform" type="translate" values="0 20;0 -10;0 20" dur="2s" repeatCount="indefinite"/></polygon>';
 s+=badge('A',120,130,16,'#2F8FE0')+badge('B',120,285,16,'#E08A2F')+badge('C',490,50,16,'#1F7A6E');
 s+='<text x="40" y="388" font-size="14" fill="'+D+'" font-family="Arial,sans-serif">AIR →</text>';
 return s+'</svg>'},
flaps_anim:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" role="img"><rect width="900" height="340" fill="#F7FAFD"/>';
 s+='<path d="M200 200 C 260 130, 480 120, 640 185 L 640 205 C 480 215, 300 222, 200 200 Z" fill="#fff" stroke="'+D+'" stroke-width="3"/>';
 s+='<g><path d="M645 188 C 700 200, 740 205, 780 206 L 645 210 Z" fill="#1F7A6E" opacity=".85"/><animateTransform attributeName="transform" type="rotate" values="0 645 198;0 645 198;26 645 198;26 645 198;0 645 198" keyTimes="0;.15;.45;.75;1" dur="5s" repeatCount="indefinite"/></g>';
 s+='<g><path d="M205 196 C 190 180, 190 168, 215 158 L 232 178 Z" fill="#2F8FE0" opacity=".85"/><animateTransform attributeName="transform" type="translate" values="0 0;0 0;-22 18;-22 18;0 0" keyTimes="0;.15;.45;.75;1" dur="5s" repeatCount="indefinite"/></g>';
 s+='<line x1="440" y1="160" x2="440" y2="90" stroke="#D0506A" stroke-width="10" stroke-linecap="round"><animate attributeName="y2" values="90;90;30;30;90" keyTimes="0;.15;.45;.75;1" dur="5s" repeatCount="indefinite"/></line>';
 s+=badge('A',790,250,16,'#1F7A6E')+badge('B',150,120,16,'#2F8FE0')+badge('C',480,70,16,'#D0506A');
 return s+'</svg>'},
baggage_flow:function(){var D3=12,s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img"><rect width="900" height="360" fill="#F7FAFD"/>';
 var P=[[70,120],[210,120],[350,120],[490,240],[650,240],[820,160]];
 s+='<path d="M70 120 L 350 120 L 350 240 L 650 240 L 820 160" fill="none" stroke="#cfd8e2" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>';
 s+='<path d="M70 120 L 350 120 L 350 240 L 650 240 L 820 160" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="10 10"><animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite"/></path>';
 var ic=[R(-26,-22,52,30,'#e8eef5',6,' stroke="'+G+'" stroke-width="2"')+R(-18,-34,36,12,B,3),R(-28,-26,56,40,'#dbe3ec',8,' stroke="'+G+'" stroke-width="2"')+R(-14,-18,28,22,'#9fd3fa',4),'<path d="M-28 6 L 0 -24 L 28 6" fill="none" stroke="'+D+'" stroke-width="5"/><path d="M0 -24 L 0 10" stroke="'+D+'" stroke-width="5"/>',R(-30,-16,24,20,B,3)+R(2,-16,24,20,B,3)+R(-40,-2,8,6,Y),'<path d="M-40 -8 L 30 -8 C 44 -8 44 12 30 12 L -40 12 Z" fill="#fff" stroke="'+G+'" stroke-width="2"/>'+R(-20,-2,30,10,'#dbe3ec',3),R(-30,-10,60,20,'#e8eef5',10,' stroke="'+G+'" stroke-width="2"')];
 P.forEach(function(p,i){s+='<g transform="translate('+p[0]+','+(p[1]-54)+')">'+ic[i]+'</g>'+badge(i+1,p[0]-38,p[1]-62,14)});
 [[140,120],[350,180],[650,240],[760,188]].forEach(function(w){s+='<g><circle cx="'+w[0]+'" cy="'+(w[1]+34)+'" r="13" fill="#D0506A"><animate attributeName="r" values="11;15;11" dur="1.6s" repeatCount="indefinite"/></circle><text x="'+w[0]+'" y="'+(w[1]+40)+'" font-size="16" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">!</text></g>'});
 var path='M70 120 L 350 120 L 350 240 L 650 240 L 820 160';
 [0,3,6,9].forEach(function(t,k){var c=[Y,B,'#7A5CC7',T][k];s+='<g>'+R(-11,-9,22,18,c,4,' stroke="'+D+'" stroke-width="1.5"')+'<animateMotion dur="'+D3+'s" begin="-'+t+'s" repeatCount="indefinite" path="'+path+'"/></g>'});
 return s+'</svg>'},
boarding_order:function(){var D2=12,s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" role="img"><rect width="900" height="420" fill="#F7FAFD"/>'+R(20,60,200,300,'#e8eef5',16)+'<text x="120" y="90" font-size="18" text-anchor="middle" fill="#5b6b7d" font-family="Arial">GATE</text>'+R(220,188,120,24,'#cfd8e2',4,' stroke="'+D+'" stroke-width="1.5"');
 s+='<path d="M340 150 L 840 150 C 875 150 890 175 890 200 C 890 225 875 250 840 250 L 340 250 C 320 250 305 225 305 200 C 305 175 320 150 340 150 Z" fill="#fff" stroke="#5b6b7d" stroke-width="3"/>';
 s+=R(360,160,110,80,'#FFF4D6',8)+R(475,160,200,80,'#EAF5FF',8)+R(680,160,160,80,'#E6F4F1',8);
 var G=[[1,'#7A5CC7',1,410,180],[2,Y,3,445,222],[3,T,5,780,200],[4,B,7,600,200],[5,'#D0506A',9,530,200]];
 G.forEach(function(g,i){var y0=120+i*50,x0=120,a=g[2]/D2,b=a+.06,c=a+.13,dx=g[3]-x0,dy=g[4]-y0,bx=280-x0,by=200-y0;
  s+='<g><animateTransform attributeName="transform" type="translate" dur="'+D2+'s" repeatCount="indefinite" values="0,0;0,0;'+bx+','+by+';'+dx+','+dy+';'+dx+','+dy+'" keyTimes="0;'+a.toFixed(3)+';'+b.toFixed(3)+';'+c.toFixed(3)+';1"/>';
  [[-11,-9],[9,-9],[-11,9],[9,9]].forEach(function(o){s+='<circle cx="'+(x0+o[0])+'" cy="'+(y0+o[1])+'" r="6" fill="'+g[1]+'"/>'});
  s+=badge(g[0],x0-38,y0,13,g[1])+'</g>'});
 s+='<text x="880" y="40" font-size="16" text-anchor="end" fill="#5b6b7d" font-family="Arial">BOARDING → CLOSE</text>'+R(700,52,180,10,'#dbe3ec',5)+'<rect x="700" y="52" width="0" height="10" rx="5" fill="'+T+'"><animate attributeName="width" dur="'+D2+'s" values="0;180;180" keyTimes="0;0.9;1" repeatCount="indefinite"/></rect>';
 return s+'</svg>'},
ramp_safety:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" role="img"><rect width="900" height="640" fill="#9aa5b1"/><rect x="170" y="110" width="560" height="500" fill="none" stroke="#FFE08A" stroke-width="4" stroke-dasharray="14 10"/>';
 [303,585].forEach(function(x){s+='<circle cx="'+x+'" cy="330" r="60" fill="#D0506A" opacity=".45"/><circle cx="'+x+'" cy="330" r="60" fill="none" stroke="#D0506A" stroke-width="3"><animate attributeName="r" values="52;64;52" dur="2s" repeatCount="indefinite"/></circle><path d="M'+(x-23)+' 460 L '+(x-53)+' 630 L '+(x+53)+' 630 L '+(x+23)+' 460 Z" fill="#E08A2F" opacity=".45"/>'});
 s+=plane(0)+cone(172,425)+cone(716,425)+cone(444,615)+'<g stroke="'+T+'" stroke-width="4" stroke-dasharray="8 6"><line x1="444" y1="20" x2="444" y2="140"/></g>';
 s+=badge('A',230,270,18,'#D0506A')+badge('A',660,270,18,'#D0506A')+badge('B',230,590,18,'#E08A2F')+badge('B',660,590,18,'#E08A2F')+badge('C',200,140,18,D)+badge('D',760,430,18,'#E08A2F')+badge('E',480,60,18,T);
 return s+'</svg>'},
checkin_layout:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 460" role="img"><rect width="900" height="460" fill="#F7FAFD"/>'+R(40,40,820,40,'#8a96a3',6)+'<text x="450" y="66" font-size="16" fill="#fff" text-anchor="middle" font-family="Arial">BHS</text>';
 var L=[['A',80,'#7A5CC7'],['B',250,B],['C',520,'#2C8C8C'],['D',690,'#E08A2F']];
 L.forEach(function(v){for(var k=0;k<(v[0]=='B'?3:1);k++){s+=R(v[1]+k*80,95,64,44,W,6,' stroke="'+D+'" stroke-width="2"')+R(v[1]+k*80+20,139,24,10,v[2],3)}s+=badge(v[0],v[1]+32,190,18,v[2])});
 s+='<g stroke="#b9c4d0" stroke-width="4" fill="none"><path d="M250 230 H 460 M 250 280 H 460 M 250 330 H 460 M 250 380 H 460"/></g>';
 for(var i=0;i<6;i++){s+='<circle r="9" fill="'+B+'"><animateMotion dur="9s" begin="-'+(i*1.5)+'s" repeatCount="indefinite" path="M470 405 H 240 V 355 H 470 V 305 H 240 V 255 H 470 V 215 H 330 V 170"/></circle>'}
 s+=R(100,230,20,60,'#7A5CC7',4,' opacity=".25"')+'<circle cx="110" cy="250" r="9" fill="#7A5CC7"/>';
 [60,110,160].forEach(function(x){s+=R(x,330,38,58,D,6)+R(x+5,336,28,22,'#9fd3fa',3)});s+=badge('E',110,420,18,D);
 s+=R(540,230,40,30,'#2C8C8C',4,' opacity=".3"')+R(590,230,40,30,'#2C8C8C',4,' opacity=".3"')+R(710,230,40,30,'#E08A2F',4,' opacity=".3"');
 return s+'</svg>'},
_old_boarding_order:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" role="img"><rect width="900" height="420" fill="#F7FAFD"/>'+R(0,0,900,70,'#9aa5b1')+'<path d="M620 10 C 700 0 860 0 890 20 L 890 60 C 860 70 700 70 620 60 Z" fill="#fff" stroke="#5b6b7d" stroke-width="3"/>'+R(560,60,40,140,'#cfd8e2',0,' stroke="'+D+'" stroke-width="2"')+R(520,190,120,40,'#dbe3ec',6,' stroke="'+D+'" stroke-width="2"')+'<text x="580" y="215" font-size="14" text-anchor="middle" fill="'+D+'" font-family="Arial">GATE</text>';
 var col=['#7A5CC7','#2C8C8C','#E08A2F',B];
 for(var n=0;n<4;n++){var y=250+n*40;s+=R(60,y,440,28,'#fff',14,' stroke="#e3eaf2"')+badge(n+1,40,y+14,15,col[n]);
  for(var k=0;k<5;k++){var a=((n*2.5+k*0.3)/12).toFixed(3),b1=((n*2.5+k*0.3+1)/12).toFixed(3),b2=((n*2.5+k*0.3+1.4)/12).toFixed(3),o1=((n*2.5+k*0.3+1.3)/12).toFixed(3),o2=((n*2.5+k*0.3+1.5)/12).toFixed(3),x0=460-k*40;
   s+='<circle cx="'+x0+'" cy="'+(y+14)+'" r="9" fill="'+col[n]+'"><animate attributeName="cx" dur="12s" repeatCount="indefinite" values="'+x0+';'+x0+';580;580" keyTimes="0;'+a+';'+b1+';1"/><animate attributeName="cy" dur="12s" repeatCount="indefinite" values="'+(y+14)+';'+(y+14)+';70;70" keyTimes="0;'+a+';'+b2+';1"/><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;'+o1+';'+o2+';1"/></circle>'}}
 return s+'</svg>'},
_old_baggage_flow:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img"><rect width="900" height="360" fill="#F7FAFD"/>';
 var P=[[80,110],[230,110],[380,110],[530,110],[690,110],[690,260]];var col=[B,'#7A5CC7','#2C8C8C',Y,'#5b6b7d','#E08A2F'];
 s+='<path d="M80 110 H 690 V 260" stroke="#b9c4d0" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M690 260 H 820" stroke="#b9c4d0" stroke-width="10" stroke-dasharray="4 10" fill="none"/>';
 P.forEach(function(p,i){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="34" fill="#fff" stroke="'+col[i]+'" stroke-width="5"/>'+badge(i+1,p[0],p[1],16,col[i])});
 [[230,60],[380,60],[610,60],[690,320]].forEach(function(p){s+=badge('!',p[0],p[1],14,'#D0506A')});
 s+='<g><rect x="-11" y="-9" width="22" height="18" rx="4" fill="#E08A2F" stroke="'+D+'" stroke-width="2"/><animateMotion dur="8s" repeatCount="indefinite" path="M80 110 H 690 V 260 H 820"/></g>';
 s+='<text x="820" y="300" font-size="14" text-anchor="middle" fill="#5b6b7d" font-family="Arial">ARR</text>';
 return s+'</svg>'}
};
})();
