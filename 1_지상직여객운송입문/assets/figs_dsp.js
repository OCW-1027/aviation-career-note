/* 運航管理の実務（DSP）の図（2026.09）— figs.js の後に読み込み、window.FIGS に追加する */
(function(){
var D='#243447',B='#2F8FE0',T='#1F7A6E',O='#E08A2F',P='#6B4FA0',G='#8A96A3';
function R(x,y,w,h,f,rx,ex){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+f+'"'+(ex||'')+'/>'}
function tx(x,y,s,sz,c,w,a){return '<text x="'+x+'" y="'+y+'" font-size="'+(sz||14)+'" font-weight="'+(w||700)+'" fill="'+(c||D)+'" text-anchor="'+(a||'middle')+'" font-family="Arial,Helvetica,sans-serif">'+s+'</text>'}
function badge(n,x,y,r,c){r=r||15;return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(c||T)+'"/>'+tx(x,y+5,n,r+1,'#fff',800)}
window.FIGS=window.FIGS||{};
var F={
/* 運航管理の流れ：計画 → 書類 → 合意 → 出発の承認 → 監視 → 変更・回航の助言 → 終了 */
dsp_flow:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img">'+R(0,0,900,360,'#F7FAFD'),DUR=14,
 st=[['PLAN','OFP',B],['BRIEF','WX / NOTAM',B],['AGREE','PIC + DSP',P],['RELEASE','GO',P],['MONITOR','ACARS',T],['ADVISE','CHANGE / DIVERT',O],['CLOSE','ARRIVED',D]];
 s+='<line x1="70" y1="120" x2="830" y2="120" stroke="#C9D6E3" stroke-width="6" stroke-linecap="round"/>';
 st.forEach(function(v,i){var x=70+i*126.7;s+='<g><circle cx="'+x+'" cy="120" r="30" fill="#fff" stroke="'+v[2]+'" stroke-width="4"/>'+tx(x,126,i+1,20,v[2],800)+
  '<animate attributeName="opacity" values="0.35;1;1;0.35" keyTimes="0;'+(i/7).toFixed(3)+';'+((i+1)/7).toFixed(3)+';1" dur="'+DUR+'s" repeatCount="indefinite"/></g>'+tx(x,178,v[0],14,v[2],800)+tx(x,198,v[1],12,G,700)});
 s+='<g><path d="M-14 0 L10 -3 L16 0 L10 3 Z M-4 -2 L4 -13 L8 -13 L4 -2 Z M-4 2 L4 13 L8 13 L4 2 Z" fill="'+O+'" stroke="#7a3e0a" stroke-width="1"/><animateMotion dur="'+DUR+'s" repeatCount="indefinite" path="M70 80 L830 80"/></g>';
 s+=R(120,236,300,92,'#fff',14,' stroke="'+P+'" stroke-width="2"')+tx(270,268,'PIC',18,P,800)+tx(270,294,'CAPTAIN',12,G)+tx(270,314,'final authority in flight',11,G,600);
 s+=R(480,236,300,92,'#fff',14,' stroke="'+P+'" stroke-width="2"')+tx(630,268,'DISPATCHER',18,P,800)+tx(630,294,'OPERATIONAL CONTROL',12,G)+tx(630,314,'plan, fuel, monitor',11,G,600);
 s+='<path d="M424 282 L476 282" stroke="'+P+'" stroke-width="3" marker-end="url(#da)" marker-start="url(#da)"/><defs><marker id="da" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9Z" fill="'+P+'"/></marker></defs>';
 s+=tx(450,262,'JOINT',11,P,800)+'<circle cx="450" cy="282" r="5" fill="'+O+'"><animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite"/></circle>';
 return s+'</svg>'},
/* 法規のしくみ：ICAO／韓国／日本 */
dsp_law:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 470" role="img">'+R(0,0,900,470,'#F7FAFD'),DUR=10,
 col=[['ICAO',B,[['Chicago Convention','1944'],['Annex 6 (SARPs)','Operation of Aircraft'],['Doc / Manuals','guidance']]],
      ['KOREA',T,[['Aviation Safety Act','Act No. 21268 (2025)'],['Enforcement Decree','Presidential'],['Enforcement Rule','MOLIT Ordinance (2026.7)'],['Flight Safety Regulations','MOLIT Notice 2026-154'],['Company OM','approved by MOLIT']]],
      ['JAPAN',O,[['Civil Aeronautics Act','Act No. 231 (1952)'],['Enforcement Order','Cabinet Order'],['Enforcement Regulations','MLIT Ordinance (2026.6)'],['Notices / Circulars','e.g. OM review guideline'],['Company OM','approved by MLIT']]]];
 col.forEach(function(c,ci){var x=40+ci*290;s+=R(x,20,250,40,c[1],10)+tx(x+125,47,c[0],17,'#fff',800);
  c[2].forEach(function(r,ri){var y=76+ri*76,w=250-ri*10,xx=x+(250-w)/2;s+='<g>'+R(xx,y,w,60,'#fff',10,' stroke="'+c[1]+'" stroke-width="2"')+tx(x+125,y+27,r[0],14,D,800)+tx(x+125,y+46,r[1],11,G,700)+
   '<animate attributeName="opacity" values="0.4;1;1;0.4" keyTimes="0;'+(ri/5).toFixed(2)+';'+((ri+1)/5).toFixed(2)+';1" dur="'+DUR+'s" repeatCount="indefinite"/></g>';
   if(ri<c[2].length-1)s+='<path d="M'+(x+125)+' '+(y+62)+' L'+(x+125)+' '+(y+74)+'" stroke="'+c[1]+'" stroke-width="3"/>'})});
 s+='<path d="M290 110 C320 110 320 110 330 110" stroke="'+B+'" stroke-width="2" stroke-dasharray="5 4"/><path d="M290 110 C560 60 600 80 620 110" fill="none" stroke="'+B+'" stroke-width="2" stroke-dasharray="5 4"/>';
 s+=tx(450,460,'ICAO standards are adopted into each country\u2019s own laws and rules',12,G,700);
 return s+'</svg>'},
/* OCC と支店・機体のつながり */
dsp_occ:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" role="img">'+R(0,0,900,420,'#F7FAFD'),DUR=6,
 c=[450,200],desk=[['DISPATCH',P,450,80],['MX CONTROL',T,640,140],['CREW CONTROL',B,640,262],['WEATHER',G,450,322],['LOAD / OPS SUPPORT',O,260,262],['NETWORK / SCHEDULE',D,260,140]];
 s+='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="62" fill="#fff" stroke="'+P+'" stroke-width="4"/>'+tx(c[0],c[1]-4,'OCC',24,P,900)+tx(c[0],c[1]+18,'Operations Control',11,G);
 desk.forEach(function(d){s+='<line x1="'+c[0]+'" y1="'+c[1]+'" x2="'+d[2]+'" y2="'+d[3]+'" stroke="#D3DCE6" stroke-width="3"/>'+R(d[2]-78,d[3]-20,156,40,'#fff',10,' stroke="'+d[1]+'" stroke-width="2"')+tx(d[2],d[3]+5,d[0],12,d[1],800)});
 s+='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="62" fill="#fff" stroke="'+P+'" stroke-width="4"/>'+tx(c[0],c[1]-4,'OCC',24,P,900)+tx(c[0],c[1]+18,'Operations Control',11,G);
 s+=R(40,40,150,70,'#fff',12,' stroke="'+T+'" stroke-width="2"')+tx(115,70,'STATION',15,T,800)+tx(115,92,'airport branch',11,G);
 s+=R(710,40,150,70,'#fff',12,' stroke="'+O+'" stroke-width="2"')+tx(785,70,'AIRCRAFT',15,O,800)+tx(785,92,'ACARS / radio',11,G);
 s+='<path id="oc1" d="M190 75 C290 75 360 150 400 170" fill="none" stroke="'+T+'" stroke-width="2" stroke-dasharray="6 5"/><path id="oc2" d="M500 170 C560 130 640 75 710 75" fill="none" stroke="'+O+'" stroke-width="2" stroke-dasharray="6 5"/>';
 [['M190 75 C290 75 360 150 400 170',T,0],['M400 170 C360 150 290 75 190 75',T,-3],['M500 170 C560 130 640 75 710 75',O,-1],['M710 75 C640 75 560 130 500 170',O,-4]].forEach(function(m){s+='<circle r="6" fill="'+m[1]+'"><animateMotion dur="'+DUR+'s" begin="'+m[2]+'s" repeatCount="indefinite" path="'+m[0]+'"/></circle>'});
 s+=badge(1,115,140,14,T)+badge(2,785,140,14,O);
 return s+'</svg>'},
/* METAR を1語ずつ読む */
dsp_metar:function(){var tk=[['METAR','REPORT TYPE'],['RKSI','STATION (ICAO)'],['270600Z','DAY 27, 06:00 UTC'],['33015G25KT','WIND 330° 15 KT, GUST 25'],['4000','VISIBILITY 4,000 m'],['-SHRA','LIGHT RAIN SHOWERS'],['BR','MIST'],['BKN012','BROKEN 1,200 ft = CEILING'],['OVC030','OVERCAST 3,000 ft'],['16/13','TEMP 16 / DEW POINT 13'],['Q1009','QNH 1009 hPa'],['TEMPO 2000 SHRA','TREND: TEMPORARILY 2,000 m']],N=tk.length,DUR=N*1.6,s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" role="img">'+R(0,0,900,300,'#F7FAFD');
 var x=24,y=60,pos=[];tk.forEach(function(t){var w=t[0].length*11+22;if(x+w>880){x=24;y+=70}pos.push([x,y,w]);x+=w+10});
 tk.forEach(function(t,i){var p=pos[i],a=(i/N).toFixed(3),b=((i+1)/N).toFixed(3);
  s+='<g>'+R(p[0],p[1],p[2],40,'#fff',8,' stroke="#C9D6E3" stroke-width="2"')+'<text x="'+(p[0]+p[2]/2)+'" y="'+(p[1]+26)+'" font-size="17" font-weight="800" fill="'+D+'" text-anchor="middle" font-family="Consolas,Menlo,monospace">'+t[0]+'</text>'+
  '<rect x="'+p[0]+'" y="'+p[1]+'" width="'+p[2]+'" height="40" rx="8" fill="none" stroke="'+O+'" stroke-width="3" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+b+';'+b+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></rect></g>';
  s+='<text x="450" y="262" font-size="20" font-weight="800" fill="'+O+'" text-anchor="middle" font-family="Arial" opacity="0">'+t[1]+'<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+b+';'+b+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></text>'});
 s+=tx(450,222,'READ ONE GROUP AT A TIME',12,G,700);
 return s+'</svg>'},
/* 到着予定の前後1時間と予報の重なり */
dsp_window:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" role="img">'+R(0,0,900,330,'#F7FAFD'),X=function(h){return 80+(h-6)*80};
 for(var h=6;h<=15;h++){s+='<line x1="'+X(h)+'" y1="50" x2="'+X(h)+'" y2="250" stroke="#E3E9EF"/>'+tx(X(h),272,('0'+h).slice(-2)+'Z',12,G,700)}
 s+=R(X(9),40,X(11)-X(9),220,'#FFE9CC',0,' opacity="0.8"')+tx(X(10),34,'ETA ±1 h',13,O,800)+'<line x1="'+X(10)+'" y1="40" x2="'+X(10)+'" y2="260" stroke="'+O+'" stroke-width="3"/>';
 s+=R(X(6),80,X(15)-X(6),28,'#DDEFE9',6)+tx(X(6)+8,99,'BASE 9999 FEW020',13,T,800,'start');
 s+=R(X(9),126,X(11)-X(9),28,'#E3EDFA',6)+tx(X(9)+8,145,'BECMG 3000 BR BKN006',13,B,800,'start');
 s+=R(X(10.5),172,X(15)-X(10.5),28,'#FBE3E3',6)+tx(X(10.5)+8,191,'TEMPO 0600 FG VV002',13,'#C2344F',800,'start');
 s+='<g><rect x="'+(X(10)-110)+'" y="210" width="220" height="34" rx="8" fill="#C2344F"/>'+tx(X(10),232,'WORST: 600 m / 200 ft',14,'#fff',800)+'<animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/></g>';
 s+=tx(450,310,'Groups overlapping ETA ±1 h decide the planning weather',12,G,700);
 return s+'</svg>'},
/* NOTAM を項目ごとに読む */
dsp_notam:function(){var L=[['D1234/26 NOTAMN','SERIES D, No.1234 of 2026, NEW'],['Q) RKRR','FIR: INCHEON'],['/QARLC','SUBJECT AR (ATS ROUTE) + CONDITION LC (CLOSED)'],['/IV/NBO/E','IFR+VFR / PURPOSE / SCOPE: EN ROUTE'],['/200/300','LOWER FL200 / UPPER FL300'],['/3530N12650E050','CENTRE AND RADIUS 50 NM'],['A) RKRR','LOCATION'],['B) 2609270000','FROM 27 SEP 2026 00:00 UTC'],['C) 2610052359','TO 05 OCT 2026 23:59 UTC'],['E) ATS RTE Y711 ...','PLAIN-LANGUAGE TEXT']],N=L.length,DUR=N*1.7,s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img">'+R(0,0,900,360,'#F7FAFD');
 var pos=[[30,40],[270,40],[390,40],[540,40],[30,100],[180,100],[30,160],[190,160],[430,160],[30,220]];
 L.forEach(function(t,i){var p=pos[i],w=t[0].length*11+24,a=(i/N).toFixed(3),b=((i+1)/N).toFixed(3);
  s+=R(p[0],p[1],w,40,'#fff',8,' stroke="#C9D6E3" stroke-width="2"')+'<text x="'+(p[0]+w/2)+'" y="'+(p[1]+26)+'" font-size="16" font-weight="800" fill="'+D+'" text-anchor="middle" font-family="Consolas,Menlo,monospace">'+t[0]+'</text>'+
  '<rect x="'+p[0]+'" y="'+p[1]+'" width="'+w+'" height="40" rx="8" fill="none" stroke="'+O+'" stroke-width="3" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+b+';'+b+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></rect>'+
  '<text x="450" y="320" font-size="19" font-weight="800" fill="'+O+'" text-anchor="middle" font-family="Arial" opacity="0">'+t[1]+'<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+b+';'+b+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></text>'});
 s+=tx(450,282,'PRACTICE EXAMPLE — NOT A REAL NOTAM',12,G,700);
 return s+'</svg>'},
/* 滑走路の3分の1ごとの状態コード（GRF） */
dsp_rwycc:function(){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" role="img">'+R(0,0,900,330,'#F7FAFD'),col={6:'#1F7A6E',5:'#4A9C6B',4:'#8DB24A',3:'#E0B32F',2:'#E08A2F',1:'#C2344F',0:'#6E1F2E'},DUR=9,
 sets=[[5,5,5],[5,3,2],[3,2,1]];
 s+=R(60,110,780,90,'#3A4350',6);for(var i=1;i<3;i++)s+='<line x1="'+(60+i*260)+'" y1="110" x2="'+(60+i*260)+'" y2="200" stroke="#fff" stroke-width="2" stroke-dasharray="8 6"/>';
 s+='<line x1="70" y1="155" x2="830" y2="155" stroke="#fff" stroke-width="3" stroke-dasharray="30 20"/>'+tx(80,100,'RWY 14R',14,D,800,'start')+tx(820,100,'32L',14,D,800,'end');
 ['TOUCHDOWN','MIDPOINT','STOP-END'].forEach(function(n,i){s+=tx(190+i*260,228,n,12,G,700)});
 sets.forEach(function(v,k){var a=(k/3).toFixed(3),b=((k+1)/3).toFixed(3);s+='<g opacity="0">';
  v.forEach(function(c,i){var x=190+i*260;s+='<circle cx="'+x+'" cy="155" r="32" fill="'+col[c]+'" stroke="#fff" stroke-width="3"/>'+tx(x,165,c,30,'#fff',900)});
  s+=R(250,250,400,40,'#fff',8,' stroke="#C9D6E3" stroke-width="2"')+'<text x="450" y="277" font-size="18" font-weight="800" fill="'+D+'" text-anchor="middle" font-family="Consolas,Menlo,monospace">RWYCC '+v.join('/')+'</text>';
  s+='<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+b+';'+b+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></g>'});
 var lg=[[6,'DRY'],[5,'GOOD'],[4,'GOOD TO MEDIUM'],[3,'MEDIUM'],[2,'MEDIUM TO POOR'],[1,'POOR'],[0,'LESS THAN POOR']];
 var lx=80;lg.forEach(function(l){s+='<rect x="'+lx+'" y="26" width="24" height="24" rx="5" fill="'+col[l[0]]+'"/>'+tx(lx+12,43,l[0],14,'#fff',900)+tx(lx+30,43,l[1],10,D,700,'start');lx+=48+l[1].length*6.4});
 s+=tx(450,316,'Code for each third of the runway (6 = dry … 0 = nil braking, runway closure considered)',12,G,700);
 return s+'</svg>'},
/* 運航飛行計画書（OFP）をブロックごとに読む（練習用）。韓国版：金浦→済州、日本版：羽田→福岡（Y20の地点・距離は日本AIP ENR 3.3、2024年3月版） */
dsp_ofp:function(){return ofpFig([
 [40,['ACN123  RKSS-RKPC  27SEP26  A20N HL8XXX','STD 0100Z  STA 0205Z  CI 30'],'HEADER: FLIGHT, DATE, AIRCRAFT, TIMES'],
 [100,['RKSS MONSI Y711 KIDOS RKPC','FL240   GND DIST 251NM   AIR DIST 262NM'],'ROUTE, CRUISING LEVEL, DISTANCE'],
 [160,['TRIP  2900   CONT   150   ALTN  1300','FINRES 1100   EXTRA    0   TAXI   200   BLOCK 5650'],'FUEL (kg): TRIP → BLOCK'],
 [220,['ZFW 61200/64300   TOW 66650/79000','LW  63750/67400   (ACTUAL/MAXIMUM)'],'WEIGHTS vs LIMITS'],
 [280,['WPT    AWY   FL   W/V     DIST  ETE  FUEL','MONSI  Y711  240  290/45    38  0:09  5000'],'NAV LOG: POINT BY POINT'],
 [340,['ALTN RKPK  DIST 150NM  FL150  1300','NOTAM / WX ATTACHED'],'ALTERNATE, ATTACHED NOTAM AND WEATHER'],
 [400,['DISPATCHER ________','CAPTAIN ________'],'SIGNATURES: DISPATCHER, THEN CAPTAIN']],'KOREA · PRACTICE OFP')},
dsp_ofp_jp:function(){return ofpFig([
 [40,['ACN801  RJTT-RJFF  27SEP26  A20N JA00XX','STD 0000Z  STA 0130Z  CI 30'],'HEADER: FLIGHT, DATE, AIRCRAFT, TIMES'],
 [100,['RJTT TIARA GUSRO Y20 KIRIN RJFF','FL380   Y20 GUSRO-KIRIN 420.5NM (AIP)'],'ROUTE, CRUISING LEVEL, DISTANCE'],
 [160,['TRIP  3600   CONT  190 (5%/5MIN)   ALTN RJFR  900','HOLD 30MIN 1100   TAXI  150   BLOCK 5940'],'FUEL (kg): ART. 153 + NOTICE 319'],
 [220,['ZFW 60500/64300   TOW 66290/79000','LW  62690/67400   (ACTUAL/MAXIMUM)'],'WEIGHTS vs LIMITS'],
 [280,['WPT    AWY   FL   W/V     DIST  ETE  FUEL','SUGAL  Y20   380  270/80  13.0  0:02  4900'],'NAV LOG: TOKYO → KOBE → FUKUOKA ACC'],
 [340,['ALTN RJFR  DIST 45NM  FL120  900','NOTAM / WX ATTACHED'],'ALTERNATE, ATTACHED NOTAM AND WEATHER'],
 [400,['DISPATCHER ________','CAPTAIN ________'],'SIGNATURES: DISPATCHER APPROVES, CAPTAIN CONFIRMS']],'JAPAN · PRACTICE OFP')}
};
function ofpFig(B,label){var N=B.length,DUR=N*2,
 s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" role="img">'+R(0,0,900,520,'#F7FAFD')+R(60,24,560,440,'#fff',6,' stroke="#C9D6E3" stroke-width="2"');
 B.forEach(function(b,i){var a=(i/N).toFixed(3),e=((i+1)/N).toFixed(3);
  b[1].forEach(function(l,j){s+='<text x="80" y="'+(b[0]+18+j*20)+'" font-size="14" font-weight="700" fill="'+D+'" font-family="Consolas,Menlo,monospace" xml:space="preserve">'+l+'</text>'});
  if(i<N-1)s+='<line x1="70" y1="'+(b[0]+54)+'" x2="610" y2="'+(b[0]+54)+'" stroke="#E3E9EF"/>';
  s+='<rect x="66" y="'+(b[0]-2)+'" width="548" height="52" rx="6" fill="none" stroke="'+O+'" stroke-width="3" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+e+';'+e+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></rect>';
  s+='<g opacity="0">'+badge(i+1,660,b[0]+24,14,O)+'<line x1="614" y1="'+(b[0]+24)+'" x2="644" y2="'+(b[0]+24)+'" stroke="'+O+'" stroke-width="2"/><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+e+';'+e+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></g>';
  s+='<text x="450" y="496" font-size="17" font-weight="800" fill="'+O+'" text-anchor="middle" font-family="Arial" opacity="0">'+b[2]+'<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;'+a+';'+e+';'+e+';1" calcMode="discrete" dur="'+DUR+'s" repeatCount="indefinite"/></text>'});
 s+=tx(770,60,label,13,G,800)+tx(770,80,'not a real flight',11,G,700);
 return s+'</svg>'}
for(var k in F)window.FIGS[k]=F[k];
})();
