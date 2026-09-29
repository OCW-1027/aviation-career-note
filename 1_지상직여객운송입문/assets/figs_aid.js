/* 航行援助施設と飛行場の灯火（Part 12）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR／LBW、題名は TTL、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,LBW=H.LBW,TTL=H.TTL,ARW=H.ARW,SCR=H.SCR,plane=H.plane,NARROW=H.NARROW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G,RD=H.C.RD;
function box(items,x0,y0,w,sz){var y=y0,g='';items.forEach(function(v){var n=LI(v[0],sz,w-40).length,lh=FS(sz)*1.3,h=n*lh+14;g+=R(x0,y,w,h,v[2]||'#fff',10,v[2]?'':' stroke="#D9E3EC"')+WR(x0+w/2,y+7+n*lh/2+FS(sz)*0.3,v[0],sz,v[1],900,w-40);y+=h+6});return {s:g,y:y}}
var F={
/* 1 VORのしくみ（灯台のたとえ）：全方向の光と回る光の時間差で方位が分かる */
aid_vor:function(l){
 var W=({ja:{t:'VOR のしくみ ― 灯台のたとえ',a:'① 磁北（000）を向いたとき、全方向に一度光る（基準）',b:'② 回る光が自分に当たるまでの時間 → 方位',rad:'090°ラジアル＝局から東へ出る線',n:'磁北',note:'本物のVORは光ではなく電波の位相の差で方位を知らせる（VHF 108.00〜117.95MHz）'},
  ko:{t:'VOR의 원리 — 등대 비유',a:'① 자북(000)을 향할 때 모든 방향으로 한 번 번쩍인다(기준)',b:'② 도는 빛이 나에게 닿을 때까지의 시간 → 방위',rad:'090° 레이디얼 = 국에서 동쪽으로 나가는 선',n:'자북',note:'실제 VOR는 빛이 아니라 전파의 위상 차로 방위를 알린다(VHF 108.00~117.95MHz)'},
  en:{t:'How VOR works: the lighthouse analogy',a:'① A flash in all directions when the beam points to magnetic north (000) (reference)',b:'② Time until the rotating beam reaches you → your bearing',rad:'The 090° radial = the line running east from the station',n:'Mag N',note:'A real VOR uses the phase difference between radio signals, not light (VHF 108.00–117.95 MHz)'}})[l];
 if(!W)return F.aid_vor('ja');
 setK(1);var cx=320,cy=250,r=160;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,390,'#0E2238',14);
 for(var a=0;a<360;a+=30){var rr=a*Math.PI/180;s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+Math.sin(rr)*r).toFixed(0)+'" y2="'+(cy-Math.cos(rr)*r).toFixed(0)+'" stroke="#3A5A7A" stroke-width="1.5"/>'+tx(cx+Math.sin(rr)*(r+18),cy-Math.cos(rr)*(r+18)+4,('00'+a).slice(-3),10.5,'#9FB0C2',800)}
 /* 全方向の光（北を向いた瞬間） */
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="20" fill="#FFD23F" opacity="0"><animate attributeName="r" values="20;170" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;0" keyTimes="0;.2;1" dur="4s" repeatCount="indefinite"/></circle>';
 /* 回る光 */
 s+='<g transform="translate('+cx+' '+cy+')"><g><path d="M0 0 L-14 -'+r+' L14 -'+r+' Z" fill="#9FD3F7" opacity=".45"/><animateTransform attributeName="transform" type="rotate" values="0;360" dur="4s" repeatCount="indefinite"/></g></g>';
 s+='<g transform="translate('+cx+' '+cy+')"><path d="M-12 0 L-6 -10 L6 -10 L12 0 L6 10 L-6 10 Z" fill="#fff" stroke="#2F6FD6" stroke-width="3"/><circle r="3" fill="#2F6FD6"/></g>';
 s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'" stroke="#7CF2B0" stroke-width="4"/>'+'<g transform="translate('+(cx+r*0.72)+' '+cy+')">'+plane('#fff')+'</g>';
 
 var b=box([[W.a,'#8a6d00','#FFF7DA'],[W.b,'#1d4d8a','#E3F1FB'],[W.rad,'#1F7A6E','#E8F5F2'],[W.note,G]],20,458,600,11.5);
 var HH=b.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+b.s+'</svg>'},

/* 2 DMEの斜め距離：局の真上 6,000ft でも約1NM と表示される */
aid_dme:function(l){
 var W=({ja:{t:'DME は「斜めの距離」を測る',dme:'DMEの表示',gnd:'地面の上の距離',over:'局の真上でも 6,000ft（約1NM）と表示',far:'遠くでは、斜めの距離と地面の距離はほぼ同じ',rule:'目安：高さ1,000ftごとに局から1NM以上離れていれば、誤差は小さい',st:'DME局'},
  ko:{t:'DME는 ‘비스듬한 거리’를 잰다',dme:'DME 표시',gnd:'지면 위의 거리',over:'국 바로 위에서도 6,000ft(약 1NM)로 표시',far:'멀리서는 비스듬한 거리와 지면 거리가 거의 같다',rule:'기준: 높이 1,000ft마다 국에서 1NM 이상 떨어져 있으면 오차는 작다',st:'DME국'},
  en:{t:'DME measures slant range',dme:'DME reading',gnd:'Ground distance',over:'Even directly overhead at 6,000 ft it reads about 1 NM',far:'Far away, slant range and ground distance are almost equal',rule:'Rule of thumb: the error is small if you are at least 1 NM from the station for every 1,000 ft of height',st:'DME station'}})[l];
 if(!W)return F.aid_dme('ja');
 setK(1);
 var gx=520,gy=320,s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,300,'#DCEEFB',14)+R(20,320,600,36,'#9CC98B');
 s+='<g transform="translate('+gx+' '+gy+')"><rect x="-8" y="-26" width="16" height="26" fill="#6B7785"/><path d="M-14 -26 L0 -40 L14 -26 Z" fill="#2F6FD6"/></g>'+tx(gx,gy+24,W.st,11,'#fff',900);
 var alt=120,path='M60 '+(gy-alt)+' L'+gx+' '+(gy-alt);
 s+='<line x1="60" y1="'+(gy-alt)+'" x2="'+(gx+60)+'" y2="'+(gy-alt)+'" stroke="#9FB0C2" stroke-width="2" stroke-dasharray="4 5"/>';
 /* 動く斜めの線と地面の線 */
 s+='<g><line x1="0" y1="0" x2="0" y2="0" stroke="#D64545" stroke-width="3"><animate attributeName="x1" values="60;'+gx+';'+gx+'" keyTimes="0;.8;1" dur="7s" repeatCount="indefinite"/><animate attributeName="y1" values="'+(gy-alt)+'" dur="7s" repeatCount="indefinite"/><animate attributeName="x2" values="'+gx+'" dur="7s" repeatCount="indefinite"/><animate attributeName="y2" values="'+(gy-34)+'" dur="7s" repeatCount="indefinite"/></line></g>';
 s+='<line x1="60" y1="'+(gy-6)+'" x2="'+gx+'" y2="'+(gy-6)+'" stroke="#1F7A6E" stroke-width="4"><animate attributeName="x1" values="60;'+gx+';'+gx+'" keyTimes="0;.8;1" dur="7s" repeatCount="indefinite"/></line>';
 s+='<g>'+plane('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="linear" path="'+path+'"/></g>';
 s+=LB(150,gy-alt-22,W.dme,11,'#fff','middle','#D64545')+LB(250,gy+22,W.gnd+' →',11,'#1F7A6E','middle','#fff');
 s+='<g opacity="0">'+LBW(gx-160,gy-alt-60,W.over,11.5,'#fff','middle','#D64545',280)+'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.78;.82;1" dur="7s" repeatCount="indefinite"/></g>';
 var b=box([[W.far,D],[W.rule,'#8a3b00','#FFF1E3']],20,368,600,11.5);
 var HH=b.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+b.s+'</svg>'},

/* 3 NDBとADF：機首の向きが変わっても、針はいつも局を指す */
aid_ndb:function(l){
 var W=({ja:{t:'NDB と ADF ― 針はいつも局を指す',ndb:'NDB',rb:'相対方位（RB）',mh:'機首の磁方位（MH）',f:'局の磁方位 ＝ 機首の磁方位 ＋ 相対方位',ex:'例：MH 030°、RB 060° → 局は 090°（真東）',err:'誤差：夜（電離層の反射）、海岸線、雷雨、山。多くの国で廃止が進む'},
  ko:{t:'NDB와 ADF — 바늘은 늘 국을 가리킨다',ndb:'NDB',rb:'상대 방위(RB)',mh:'기수 자방위(MH)',f:'국의 자방위 = 기수 자방위 + 상대 방위',ex:'예: MH 030°, RB 060° → 국은 090°(정동)',err:'오차: 밤(전리층 반사), 해안선, 뇌우, 산. 많은 나라에서 폐지가 진행 중'},
  en:{t:'NDB and ADF: the needle always points to the station',ndb:'NDB',rb:'Relative bearing (RB)',mh:'Magnetic heading (MH)',f:'Magnetic bearing to the station = MH + RB',ex:'Example: MH 030°, RB 060° → station at 090° (due east)',err:'Errors: night effect (ionosphere), coastlines, thunderstorms, mountains. Being withdrawn in many countries'}})[l];
 if(!W)return F.aid_ndb('ja');
 setK(1);
 var sx=520,sy=200,px=230,py=200;
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,300,'#EEF5FB',14);
 s+='<g transform="translate('+sx+' '+sy+')"><circle r="14" fill="#fff" stroke="#6B4FA0" stroke-width="3"/>';for(var i=1;i<=3;i++)s+='<circle r="14" fill="none" stroke="#6B4FA0" stroke-width="2"><animate attributeName="r" values="14;'+(40+i*10)+'" dur="2s" begin="-'+(i*0.6)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2s" begin="-'+(i*0.6)+'s" repeatCount="indefinite"/></circle>';s+='</g>'+tx(sx,sy+40,W.ndb,12,'#6B4FA0',900);
 /* 機首が回る飛行機と、局を指す針 */
 s+='<g transform="translate('+px+' '+py+')"><circle r="92" fill="#fff" stroke="#9FB0C2" stroke-width="2"/><g><g transform="rotate(-90) scale(2.2)">'+plane('#fff')+'</g><animateTransform attributeName="transform" type="rotate" values="30;30;-20;-20;60;60;30" keyTimes="0;.15;.3;.5;.65;.85;1" dur="9s" repeatCount="indefinite"/></g>';
 s+='<line x1="0" y1="0" x2="80" y2="0" stroke="#D64545" stroke-width="5" stroke-linecap="round"/><path d="M80 0 l-14 -8 l0 16 Z" fill="#D64545"/><circle r="6" fill="#243447"/></g>';
 s+='<path d="M'+(px+100)+' '+py+' L'+(sx-24)+' '+sy+'" stroke="#6B4FA0" stroke-width="2" stroke-dasharray="6 5"/>';
 s+=LB(px,py-106,W.mh+' ↑',11,'#2F6FD6','middle','#fff')+LB(px+60,py+110,W.rb,11,'#D64545','middle','#fff');
 var b=box([[W.f,D,'#fff'],[W.ex,'#8a3b00','#FFF1E3'],[W.err,G]],20,368,600,11.5);
 var HH=b.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+b.s+'</svg>'},

/* 4 電波が届く距離：地球は丸いので、高く飛ぶほど遠くのVHFを受けられる */
aid_los:function(l){
 var W=({ja:{t:'VHFの電波が届く距離（見通し距離）',f:'届く距離（NM）≒ 1.23 × √（高さ[ft]）',blk:'地平線の向こうは届かない',st:'VOR',ex:'1,000ft：約39NM　10,000ft：約123NM　36,000ft：約233NM'},
  ko:{t:'VHF 전파가 닿는 거리(가시거리)',f:'닿는 거리(NM) ≒ 1.23 × √(높이[ft])',blk:'지평선 너머로는 닿지 않는다',st:'VOR',ex:'1,000ft: 약 39NM　10,000ft: 약 123NM　36,000ft: 약 233NM'},
  en:{t:'How far VHF signals reach (line of sight)',f:'Range (NM) ≈ 1.23 × √(height in ft)',blk:'No signal beyond the horizon',st:'VOR',ex:'1,000 ft: about 39 NM · 10,000 ft: about 123 NM · 36,000 ft: about 233 NM'}})[l];
 if(!W)return F.aid_los('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,300,'#0E2238',14);
 s+='<path d="M20 356 Q320 250 620 356 Z" fill="#2F6FA8"/><path d="M20 356 Q320 250 620 356" fill="none" stroke="#9FD3F7" stroke-width="2"/>';
 s+='<g transform="translate(100 318)"><path d="M-10 0 L-5 -9 L5 -9 L10 0 L5 9 L-5 9 Z" fill="#fff" stroke="#2F6FD6" stroke-width="3"/></g>'+tx(100,344,W.st,11,'#fff',900);
 [[250,286,'1,000ft','#7CF2B0'],[400,200,'10,000ft','#FFD23F'],[560,120,'36,000ft','#FF9B7A']].forEach(function(v,i){
  s+='<line x1="100" y1="310" x2="'+v[0]+'" y2="'+v[1]+'" stroke="'+v[3]+'" stroke-width="2.5" stroke-dasharray="6 5"><animate attributeName="stroke-dashoffset" values="0;-22" dur="1s" repeatCount="indefinite"/></line><g transform="translate('+v[0]+' '+v[1]+')">'+plane('#fff')+'</g>'+LB(v[0],v[1]-20,v[2],10.5,'#0f3558','middle',v[3])});
 s+='<g transform="translate(575 318)">'+plane('#fff')+'</g><line x1="100" y1="312" x2="296" y2="306" stroke="#D64545" stroke-width="2.5" stroke-dasharray="6 5"/>';
 s+='<g><path d="M290 296 l16 16 M306 296 l-16 16" stroke="#D64545" stroke-width="4" stroke-linecap="round"/><animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite"/></g>'+LBW(520,280,W.blk,10.5,'#fff','middle','#D64545',180);
 var b=box([[W.f,'#8a3b00','#FFF1E3'],[W.ex,D]],20,368,600,11.5);
 var HH=b.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+b.s+'</svg>'},
/* 5 ILSの2つの電波：ローカライザー（左右）とグライドパス（上下3°）。ずれると計器の針が直す向きを示す */
aid_ils:function(l){
 var W=({ja:{t:'ILS ― 左右と上下の2つの電波',top:'上から見る：ローカライザー（左右）',side:'横から見る：グライドパス（上下 約3°）',fl:'右へ直す',fu:'上へ直す',loc:'ローカライザー（滑走路の先）',gp:'グライドパス（滑走路の横）',n1:'針は「進むべき向き」を示す。針のほうへ飛ぶ',n2:'グライドパスには 6°・9° の偽の坂があるので、下から近づいて捕まえる'},
  ko:{t:'ILS — 좌우와 상하의 두 전파',top:'위에서 보기: 로컬라이저(좌우)',side:'옆에서 보기: 글라이드패스(상하 약 3°)',fl:'오른쪽으로 수정',fu:'위로 수정',loc:'로컬라이저(활주로 끝 너머)',gp:'글라이드패스(활주로 옆)',n1:'바늘은 ‘가야 할 방향’을 보여 준다. 바늘 쪽으로 난다',n2:'글라이드패스에는 6°·9°의 가짜 경사가 있으므로 아래에서 다가가 잡는다'},
  en:{t:'ILS: two signals, lateral and vertical',top:'From above: localizer (left/right)',side:'From the side: glide path (up/down, about 3°)',fl:'Fly right',fu:'Fly up',loc:'Localizer (beyond the runway end)',gp:'Glide path (beside the runway)',n1:'The needle shows which way to go: fly towards the needle',n2:'The glide path has false slopes at 6° and 9°, so intercept it from below'}})[l];
 if(!W)return F.aid_ils('ja');
 setK(1);var nar=NARROW();
 function cdi(x,y,dx,dy){return '<g transform="translate('+x+' '+y+')"><circle r="34" fill="#fff" stroke="#243447" stroke-width="3"/>'+[-24,-12,12,24].map(function(v){return '<circle cx="'+v+'" cy="0" r="2.5" fill="#243447"/><circle cx="0" cy="'+v+'" r="2.5" fill="#243447"/>'}).join('')+'<line x1="'+dx+'" y1="-28" x2="'+dx+'" y2="28" stroke="#E08A2F" stroke-width="4"/><line x1="-28" y1="'+dy+'" x2="28" y2="'+dy+'" stroke="#2F6FD6" stroke-width="4"/><path d="M-8 0 h16 M0 -4 v8" stroke="#D64545" stroke-width="3"/></g>'}
 function top(x0,y0,w){var g=R(x0,y0,w,190,'#EEF5FB',14)+tx(x0+w/2,y0+24,W.top,13,'#1F7A6E',900);var ry=y0+110,rx=x0+w-150;
  g+='<path d="M'+(rx+110)+' '+ry+' L'+(x0+30)+' '+(ry-60)+' L'+(x0+30)+' '+ry+' Z" fill="#E08A2F" opacity=".18"/><path d="M'+(rx+110)+' '+ry+' L'+(x0+30)+' '+(ry+60)+' L'+(x0+30)+' '+ry+' Z" fill="#2F6FD6" opacity=".18"/>';
  g+='<line x1="'+(x0+30)+'" y1="'+ry+'" x2="'+(rx+110)+'" y2="'+ry+'" stroke="#1F7A6E" stroke-width="3" stroke-dasharray="10 6"/>'+R(rx,ry-9,100,18,'#5B6770',4)+'<rect x="'+(rx+108)+'" y="'+(ry-16)+'" width="8" height="32" fill="#1F7A6E"/>';
  g+='<g>'+plane('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" path="M'+(x0+40)+' '+(ry-40)+' C'+(x0+w*0.35)+' '+(ry-40)+' '+(x0+w*0.45)+' '+ry+' '+(rx)+' '+ry+'"/></g>';
  g+=LBW(rx+50,ry+46,W.loc,10.5,'#1F7A6E','middle','#fff',180);return g}
 function side(x0,y0,w){var g=R(x0,y0,w,190,'#DCEEFB',14)+tx(x0+w/2,y0+24,W.side,13,'#2F6FD6',900)+R(x0,y0+160,w,30,'#9CC98B',0);var ty=y0+160,tx0=x0+w-150;
  g+=R(tx0,ty-6,110,8,'#5B6770',3)+'<line x1="'+(x0+30)+'" y1="'+(ty-100)+'" x2="'+(tx0+20)+'" y2="'+(ty-4)+'" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="10 6"/>';
  g+='<g transform="translate('+(tx0+30)+' '+(ty-10)+')"><rect x="-4" y="-22" width="8" height="22" fill="#2F6FD6"/></g>';
  g+='<g>'+plane('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" path="M'+(x0+40)+' '+(ty-60)+' C'+(x0+w*0.3)+' '+(ty-60)+' '+(x0+w*0.4)+' '+(ty-60)+' '+(tx0+20)+' '+(ty-6)+'"/></g>';
  g+=LBW(tx0+40,ty-44,W.gp,10.5,'#2F6FD6','middle','#fff',170);return g}
 var s,HH,vw;
 if(nar){vw=580;s=top(20,56,540)+side(20,262,540);var y=468}else{vw=900;s=top(20,56,420)+side(460,56,420);var y=262}
 /* 計器（右・上へ直す） */
 s+='<g transform="translate('+(vw/2-120)+' 0)">'+cdi(0,y+44,16,-14)+'</g>'+LB(vw/2-120,y+96,W.fl+' / '+W.fu,10.5,'#fff','middle','#243447');
 var ix=vw/2+20,items=[[W.n1,D],[W.n2,'#8a3b00']],yy=y+10,body='';
 items.forEach(function(v){var n=LI(v[0],11,vw/2-60).length,lh=FS(11)*1.3;body+=WR(ix,yy+n*lh/2+FS(11)*0.3,v[0],11,v[1],900,vw/2-60,'start');yy+=n*lh+10});
 HH=Math.max(y+112,yy+8);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+vw+' '+HH.toFixed(0)+'" role="img">'+R(0,0,vw,HH,'#F7FAFD')+TTL(vw/2,30,W.t,15,'#0f3558',vw-40)+s+body+'</svg>'},

/* 6 ILSのカテゴリー：決心高度で滑走路の灯火が見えなければ着陸できない。CAT I→III ほど低く、見える距離が短くてもよい */
aid_cat:function(l){
 var W=({ja:{t:'ILS のカテゴリー（決心高度と RVR）',dh:'決心高度（DH）',rvr:'滑走路視距離（RVR）',see:'DHで灯火が見えれば着陸、見えなければやり直し（復行）',rows:[['CAT I','200ft 以上','550m 以上'],['CAT II','100〜200ft','300m 以上'],['CAT IIIA','100ft 未満（なしも）','175m 以上'],['CAT IIIB','50ft 未満（なしも）','50〜175m']],note:'値は ICAO Annex 6 の従来の区分。CAT II・III には機体・乗員・空港それぞれの承認と設備が必要'},
  ko:{t:'ILS 카테고리(결심고도와 RVR)',dh:'결심고도(DH)',rvr:'활주로가시거리(RVR)',see:'DH에서 등화가 보이면 착륙, 안 보이면 다시 시도(복행)',rows:[['CAT I','200ft 이상','550m 이상'],['CAT II','100~200ft','300m 이상'],['CAT IIIA','100ft 미만(없음도)','175m 이상'],['CAT IIIB','50ft 미만(없음도)','50~175m']],note:'값은 ICAO Annex 6의 기존 구분. CAT II·III에는 기체·승무원·공항 각각의 승인과 설비가 필요'},
  en:{t:'ILS categories (decision height and RVR)',dh:'Decision height (DH)',rvr:'Runway visual range (RVR)',see:'If the lights are visible at DH, land; if not, go around',rows:[['CAT I','200 ft or more','550 m or more'],['CAT II','100–200 ft','300 m or more'],['CAT IIIA','Below 100 ft (or none)','175 m or more'],['CAT IIIB','Below 50 ft (or none)','50–175 m']],note:'Values follow the traditional ICAO Annex 6 categories. CAT II and III need approvals and equipment for the aircraft, crew and airport'}})[l];
 if(!W)return F.aid_cat('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,250,'#DCEEFB',14)+R(20,276,600,30,'#9CC98B',0);
 s+='<rect x="20" y="120" width="600" height="156" fill="#E6ECF2" opacity=".85"><animate attributeName="opacity" values=".55;.9;.55" dur="6s" repeatCount="indefinite"/></rect>';
 s+=R(430,270,180,10,'#5B6770',3);for(var i=0;i<6;i++)s+='<circle cx="'+(440+i*30)+'" cy="266" r="4" fill="#FFD23F"><animate attributeName="opacity" values=".3;1;.3" dur="1.2s" begin="-'+(i*0.2)+'s" repeatCount="indefinite"/></circle>';
 s+='<line x1="40" y1="90" x2="440" y2="266" stroke="#2F6FD6" stroke-width="2" stroke-dasharray="8 6"/>';
 s+='<line x1="20" y1="200" x2="620" y2="200" stroke="#D64545" stroke-width="2" stroke-dasharray="4 4"/>'+LB(80,194,W.dh,10.5,'#fff','start','#D64545');
 s+='<g>'+plane('#fff')+'<animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M40 90 L260 187 C300 200 320 170 380 120"/></g>';
 s+=LBW(320,140,W.see,11,'#0f3558','middle','#fff',360);
 var y=320,lh=FS(12)*1.5,cw=[140,220,220];
 s+=R(20,y,600,lh+10,'#243447',8)+tx(90,y+lh*0.8,'CAT',12,'#fff',900)+tx(270,y+lh*0.8,W.dh,11,'#fff',900)+tx(490,y+lh*0.8,W.rvr,11,'#fff',900);y+=lh+14;
 W.rows.forEach(function(r,i){s+=R(20,y,600,lh+6,i%2?'#fff':'#F4F7FB',6)+tx(90,y+lh*0.75,r[0],12,D,900)+tx(270,y+lh*0.75,r[1],11.5,D,800)+tx(490,y+lh*0.75,r[2],11.5,D,800);y+=lh+8});
 var n=LI(W.note,10.5,580).length;s+=WR(320,y+8+n*FS(10.5)*1.3/2,W.note,10.5,G,800,580);y+=n*FS(10.5)*1.3+18;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'},

/* 7 ILSの保護区域：視界が悪いとき、アンテナの前に車や飛行機が入ると電波が乱れる */
aid_crit:function(l){
 var W=({ja:{t:'ILS の保護区域（地上で守ること）',loc:'ローカライザー',gp:'グライドパス',crit:'保護区域（車・飛行機は入らない）',hold:'CAT II／III の停止線',bad:'区域に入ると電波が乱れ、進入中の機の計器の針が揺れる',lvp:'視界が悪いとき（低視程時の運用）は、地上の車両・誘導・牽引もこの区域を避ける'},
  ko:{t:'ILS 보호구역(지상에서 지킬 것)',loc:'로컬라이저',gp:'글라이드패스',crit:'보호구역(차량·항공기 진입 금지)',hold:'CAT II/III 정지선',bad:'구역에 들어가면 전파가 흐트러져 접근 중인 항공기의 계기 바늘이 흔들린다',lvp:'시정이 나쁠 때(저시정 운영)는 지상 차량·유도·견인도 이 구역을 피한다'},
  en:{t:'ILS protected areas (what ground staff must respect)',loc:'Localizer',gp:'Glide path',crit:'Critical area (no vehicles or aircraft)',hold:'CAT II/III holding line',bad:'Entering the area disturbs the signal and the approaching aircraft’s needles swing',lvp:'In low visibility (low-visibility procedures), vehicles, marshalling and towing must also keep out'}})[l];
 if(!W)return F.aid_crit('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,300,'#DDE8D4',14);
 s+=R(60,180,460,40,'#5B6770',4)+'<line x1="70" y1="200" x2="510" y2="200" stroke="#fff" stroke-width="2" stroke-dasharray="16 10"/>'+R(140,240,300,16,'#8C9BAA',3);
 s+='<path d="M520 170 L600 150 L600 250 L520 230 Z" fill="#D64545" opacity=".18" stroke="#D64545" stroke-dasharray="5 4"/>'+'<rect x="590" y="180" width="10" height="40" fill="#1F7A6E"/>'+tx(604,140,W.loc,11,'#1F7A6E',900,'end');
 s+='<path d="M120 120 L220 120 L220 176 L120 176 Z" fill="#D64545" opacity=".18" stroke="#D64545" stroke-dasharray="5 4"/>'+'<rect x="150" y="130" width="8" height="30" fill="#2F6FD6"/>'+tx(170,110,W.gp,11,'#2F6FD6',900);
 s+='<line x1="260" y1="226" x2="260" y2="262" stroke="#F2D233" stroke-width="4"/><line x1="268" y1="226" x2="268" y2="262" stroke="#F2D233" stroke-width="4" stroke-dasharray="4 3"/>'+LB(330,286,W.hold,10.5,'#5a4a00','middle','#F2D233');
 /* 区域に入る車と、乱れる電波 */
 s+='<g><rect x="-14" y="-8" width="28" height="16" rx="3" fill="#E08A2F"/><animateMotion dur="6s" repeatCount="indefinite" path="M380 300 L470 300 L520 240 L520 240"/></g>';
 s+='<path d="M590 200 C560 190 540 210 510 200 C480 190 460 212 430 200" fill="none" stroke="#1F7A6E" stroke-width="3" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.55;.62;.95;1" dur="6s" repeatCount="indefinite"/></path>';
 s+=LBW(320,80,W.crit,11,'#D64545','middle','#fff',400);
 var y=368,body='',items=[[W.bad,'#D64545','#FDEAE3'],[W.lvp,D,'#fff']];
 items.forEach(function(v){var n=LI(v[0],11.5,560).length,lh=FS(11.5)*1.3,h=n*lh+14;body+=R(20,y,600,h,v[2],10,v[2]==='#fff'?' stroke="#D9E3EC"':'')+WR(320,y+7+n*lh/2+FS(11.5)*0.3,v[0],11.5,v[1],900,560);y+=h+6});
 var HH=y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+body+'</svg>'},

/* 8 レーダーの種類：一次レーダー（反射）、二次レーダー（トランスポンダーの応答）、ADS-B（機体が自分の位置を放送） */
aid_radar:function(l){
 var W=({ja:{t:'レーダーと ADS-B',psr:'一次レーダー：電波の反射を受ける（名前・高度は分からない）',ssr:'二次レーダー：機のトランスポンダーが答える（コード・高度）',ads:'ADS-B：機体がGNSSの位置を自分で放送する',codes:'緊急のコード：7500 不法な妨害・7600 通信の故障・7700 緊急事態'},
  ko:{t:'레이더와 ADS-B',psr:'1차 레이더: 전파의 반사를 받는다(이름·고도는 모른다)',ssr:'2차 레이더: 항공기 트랜스폰더가 답한다(코드·고도)',ads:'ADS-B: 항공기가 GNSS 위치를 스스로 방송한다',codes:'비상 코드: 7500 불법 방해·7600 통신 두절·7700 비상사태'},
  en:{t:'Radar and ADS-B',psr:'Primary radar: receives reflections (no identity or altitude)',ssr:'Secondary radar: the aircraft’s transponder replies (code and altitude)',ads:'ADS-B: the aircraft broadcasts its own GNSS position',codes:'Emergency codes: 7500 unlawful interference, 7600 radio failure, 7700 emergency'}})[l];
 if(!W)return F.aid_radar('ja');
 setK(1);
 var s=TTL(320,30,W.t,15,'#0f3558',600)+R(20,56,600,300,'#0E2238',14);
 function ant(x,y,c){return '<g transform="translate('+x+' '+y+')"><rect x="-4" y="-4" width="8" height="30" fill="#6B7785"/><path d="M-22 -10 Q0 -24 22 -10" fill="none" stroke="'+c+'" stroke-width="5"/></g>'}
 s+=ant(110,320,'#9FD3F7')+ant(320,320,'#FFD23F')+'<g transform="translate(530 330)"><rect x="-14" y="-10" width="28" height="20" rx="3" fill="#6B7785"/><path d="M-8 -10 L0 -22 L8 -10" fill="none" stroke="#7CF2B0" stroke-width="3"/></g>';
 s+='<g transform="translate(110 150)">'+plane('#fff')+'</g><g transform="translate(320 150)">'+plane('#fff')+'</g><g transform="translate(530 150)">'+plane('#fff')+'</g>';
 s+='<path d="M110 300 L110 170" stroke="#9FD3F7" stroke-width="3" stroke-dasharray="8 8"><animate attributeName="stroke-dashoffset" values="0;32" dur="1s" repeatCount="indefinite"/></path><path d="M100 170 L100 300" stroke="#9FD3F7" stroke-width="2" stroke-dasharray="3 9" opacity=".6"><animate attributeName="stroke-dashoffset" values="0;-24" dur="1s" repeatCount="indefinite"/></path>';
 s+='<path d="M320 300 L320 170" stroke="#FFD23F" stroke-width="3" stroke-dasharray="8 8"><animate attributeName="stroke-dashoffset" values="0;32" dur="1s" repeatCount="indefinite"/></path><path d="M332 170 L332 300" stroke="#FF9B7A" stroke-width="3" stroke-dasharray="8 8"><animate attributeName="stroke-dashoffset" values="0;-32" dur="1s" repeatCount="indefinite"/></path>'+LB(390,120,'A1234 / FL350',10.5,'#0f3558','middle','#FFD23F');
 for(var i=1;i<=3;i++)s+='<circle cx="530" cy="150" r="10" fill="none" stroke="#7CF2B0" stroke-width="2"><animate attributeName="r" values="10;90" dur="2s" begin="-'+(i*0.66).toFixed(2)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="2s" begin="-'+(i*0.66).toFixed(2)+'s" repeatCount="indefinite"/></circle>';
 s+=tx(110,90,'PSR',13,'#9FD3F7',900)+tx(320,90,'SSR',13,'#FFD23F',900)+tx(530,90,'ADS-B',13,'#7CF2B0',900);
 var y=368,body='',items=[[W.psr,'#1d4d8a','#E3F1FB'],[W.ssr,'#8a6d00','#FFF7DA'],[W.ads,'#1F7A6E','#E8F5F2'],[W.codes,'#D64545','#FDEAE3']];
 items.forEach(function(v){var n=LI(v[0],11.5,560).length,lh=FS(11.5)*1.3,h=n*lh+14;body+=R(20,y,600,h,v[2],10)+WR(320,y+7+n*lh/2+FS(11.5)*0.3,v[0],11.5,v[1],900,560);y+=h+6});
 var HH=y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+body+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
