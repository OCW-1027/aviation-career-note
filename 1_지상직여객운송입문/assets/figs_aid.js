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
 var HH=b.y+8;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+HH.toFixed(0)+'" role="img">'+R(0,0,640,HH,'#F7FAFD')+s+b.s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
