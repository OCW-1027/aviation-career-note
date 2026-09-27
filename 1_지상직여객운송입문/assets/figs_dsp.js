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
 return s+'</svg>'}
};
for(var k in F)window.FIGS[k]=F[k];
})();
