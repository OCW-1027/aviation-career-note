/* 航空キャリアノート：飛行機の形（2026.10 全面改訂）。サイトのすべての飛行機はこの形を使う。
   どれも原点が機体の中心、長さ約40（x −20〜20）。使う側で translate・rotate・scale する。
   ACFT.top(o)   … 上から見た形。機首は右（+x）。後退翼、エンジンは主翼の前の下（前の部分だけ見える）、後退した水平尾翼
   ACFT.side(o)  … 横から見た形。機首は右。低翼、エンジンは主翼の下の前、後退した垂直尾翼、客室の窓
   ACFT.front(o) … 正面から見た形（機首がこちら）。低翼で翼は少し上に反る、エンジンは翼の下、脚は o.gear で表示
   o.c：胴体の色（既定は白に近い灰色）、o.w：翼の色、o.line：線の色、o.vs:false で線も一緒に拡大・縮小（遠ざかる動きなど）、o.rear：front を後ろから見た形に（操縦室の窓なし、エンジンは排気口）、o.eng：エンジンの数（top は 2 か 4、既定 2）、o.sw：線の太さ（画面上のpx。拡大しても太くならない、既定1.2）、o.win：窓（side、既定あり） */
(function(){
var K={line:'#2C3A4A',body:'#F6F8FA',wing:'#DCE3EA',eng:'#BCC6D1',dark:'#2B3642',glass:'#2F4F73'};
var CUR={line:K.line,vs:true};
function at(o){o=o||{};CUR.line=o.line||K.line;CUR.vs=o.vs!==false;return {c:o.c||K.body,w:o.w||K.wing,sw:o.sw||1.2,eng:o.eng===4?4:2,win:o.win!==false,gear:!!o.gear,rear:!!o.rear}}
function st(sw){return ' stroke="'+CUR.line+'" stroke-width="'+sw+'" stroke-linejoin="round"'+(CUR.vs?' vector-effect="non-scaling-stroke"':'')}
/* 上から見た形 */
function nacTop(x,y){/* エンジンの筒（前が x、長さ 6、幅 2.4）。主翼より先に描き、後ろ半分は翼に隠れる */
 return 'M'+x+' '+(y-1.2)+' L'+(x-6)+' '+(y-1.1)+' L'+(x-6)+' '+(y+1.1)+' L'+x+' '+(y+1.2)+' Q'+(x+0.5)+' '+y+' '+x+' '+(y-1.2)+' Z'}
function top(o){o=at(o);var s=st(o.sw),e='',ys=o.eng===4?[[6.2,3.2],[12.4,-0.6]]:[[7.4,2.3]];
 ys.forEach(function(p){[1,-1].forEach(function(sg){e+=nacTop(p[1]+3.4,sg*p[0])+' '})});
 var fus='M20 0 C19.5 -1.4 17.8 -2.3 15 -2.3 L-11 -2.3 C-14.5 -2.3 -18.6 -1.1 -20.4 -0.3 L-20.4 0.3 C-18.6 1.1 -14.5 2.3 -11 2.3 L15 2.3 C17.8 2.3 19.5 1.4 20 0 Z';
 var wing='M5.6 -2.2 L-6.2 -19 L-9.2 -19 L-4.6 -7.2 L-4.2 -2.2 Z M5.6 2.2 L-6.2 19 L-9.2 19 L-4.6 7.2 L-4.2 2.2 Z';
 var tail='M-13.4 -1.7 L-18.2 -7.6 L-19.9 -7.6 L-18.6 -1.5 Z M-13.4 1.7 L-18.2 7.6 L-19.9 7.6 L-18.6 1.5 Z';
 var fin='M-13.8 -0.45 L-20.6 -0.25 L-20.6 0.25 L-13.8 0.45 Z';
 var intakes='';ys.forEach(function(p){[1,-1].forEach(function(sg){var x=p[1]+3.4,y=sg*p[0];intakes+='<ellipse cx="'+(x+0.15)+'" cy="'+y+'" rx="0.45" ry="1.05" fill="'+K.dark+'"/>'})});
 return '<path d="'+e+'" fill="'+K.eng+'"'+s+'/>'+intakes+'<path d="'+wing+'" fill="'+o.w+'"'+s+'/><path d="'+tail+'" fill="'+o.w+'"'+s+'/><path d="'+fus+'" fill="'+o.c+'"'+s+'/><path d="'+fin+'" fill="'+K.eng+'"'+s+'/><path d="M18.4 -1.1 Q19.3 0 18.4 1.1 L17.5 0.9 Q18.1 0 17.5 -0.9 Z" fill="'+K.glass+'"/>'}
/* 横から見た形 */
function side(o){o=at(o);var s=st(o.sw),w='';
 if(o.win)for(var x=-10.5;x<=13;x+=1.75)w+='<rect x="'+(x-0.3).toFixed(2)+'" y="-1.35" width="0.6" height="0.85" rx="0.25" fill="'+K.glass+'" opacity=".85"/>';
 var fus='M20 0.7 C19.8 -0.9 18.7 -2.5 15.6 -2.9 L-10.5 -2.9 L-16.8 -2.4 L-20.6 -1.6 L-20.8 -0.9 L-16.5 0.9 L-12 2.4 L12.5 2.4 C16.5 2.4 19.6 2 20 0.7 Z';
 var fin='M-11.2 -2.9 L-16.9 -11.6 L-20.2 -11.6 L-19.4 -2.2 Z';
 var stab='M-15.2 -1.3 L-21.4 -2 L-21.8 -1.3 L-16.2 -0.5 Z';
 var wing='M5.2 1.7 L-6.4 3.7 L-8.9 3.7 L-3.4 2 Z';
 var pylon='M3.9 3.2 L2.4 2 L0.6 2 L1.2 3.3 Z';
 var eng='M6.6 4.4 C6.6 3.5 6 3.1 4.9 3.1 L1 3.2 L0 3.8 L0 5 L1 5.6 L4.9 5.7 C6 5.7 6.6 5.3 6.6 4.4 Z';
 return '<path d="'+fin+'" fill="'+o.w+'"'+s+'/><path d="'+fus+'" fill="'+o.c+'"'+s+'/>'+w+'<path d="M15.7 -1.95 L18.5 -1.4 L18.2 -0.55 L15.4 -0.85 Z" fill="'+K.glass+'"/><path d="'+stab+'" fill="'+o.w+'"'+s+'/><path d="'+wing+'" fill="'+o.w+'"'+s+'/><path d="'+pylon+'" fill="'+K.eng+'"'+s+'/><path d="'+eng+'" fill="'+K.eng+'"'+s+'/><ellipse cx="6.35" cy="4.4" rx="0.5" ry="1.15" fill="'+K.dark+'"/>'}
/* 正面から見た形（幅 約46、胴体の中心が原点）。低翼：翼のつけ根は胴体の下の方で、先に向かって少し上がる。エンジンは翼の下 */
function front(o){o=at(o);var s=st(o.sw),g='';
 var wing='M-2.4 1.3 L-22.6 -1.1 L-22.8 0 L-2.2 2.9 Z M2.4 1.3 L22.6 -1.1 L22.8 0 L2.2 2.9 Z';
 var stab='M-0.9 -1.5 L-9.4 -2.9 L-9.5 -2.1 L-0.9 -0.9 Z M0.9 -1.5 L9.4 -2.9 L9.5 -2.1 L0.9 -0.9 Z';
 var fin='M-0.55 -3 L-0.35 -10.2 L0.35 -10.2 L0.55 -3 Z';
 var py='M-8.3 0.75 L-8.3 2 L-7.5 2 L-7.5 0.65 Z M8.3 0.75 L8.3 2 L7.5 2 L7.5 0.65 Z';
 if(o.gear)g='<path d="M0 3 L0 6 M-3.4 2.4 L-3.4 6.2 M3.4 2.4 L3.4 6.2" stroke="'+K.dark+'" stroke-width="'+(CUR.vs?o.sw:0.45)+'"'+(CUR.vs?' vector-effect="non-scaling-stroke"':'')+'/><rect x="-0.8" y="5.7" width="1.6" height="1.5" rx="0.4" fill="'+K.dark+'"/><rect x="-4.4" y="5.9" width="2" height="1.7" rx="0.4" fill="'+K.dark+'"/><rect x="2.4" y="5.9" width="2" height="1.7" rx="0.4" fill="'+K.dark+'"/>';
 return '<path d="'+fin+'" fill="'+o.w+'"'+s+'/><path d="'+stab+'" fill="'+o.w+'"'+s+'/><path d="'+wing+'" fill="'+o.w+'"'+s+'/>'+g+'<path d="'+py+'" fill="'+K.eng+'"'+s+'/><circle cx="-7.9" cy="3.4" r="1.9" fill="'+K.eng+'"'+s+'/><circle cx="7.9" cy="3.4" r="1.9" fill="'+K.eng+'"'+s+'/><circle cx="-7.9" cy="3.4" r="1.15" fill="'+K.dark+'"/><circle cx="7.9" cy="3.4" r="1.15" fill="'+K.dark+'"/><circle cx="-7.9" cy="3.4" r="'+(o.rear?0.7:0.35)+'" fill="'+(o.rear?'#6B7785':K.eng)+'"/><circle cx="7.9" cy="3.4" r="'+(o.rear?0.7:0.35)+'" fill="'+(o.rear?'#6B7785':K.eng)+'"/><circle cx="0" cy="0" r="3.1" fill="'+o.c+'"'+s+'/>'+(o.rear?'<circle cx="0" cy="0.4" r="0.8" fill="'+K.eng+'"/>':'<path d="M-1.7 -1.2 L-0.25 -1.45 L-0.25 -0.55 L-1.8 -0.4 Z M1.7 -1.2 L0.25 -1.45 L0.25 -0.55 L1.8 -0.4 Z" fill="'+K.glass+'"/>')}
/* ===== 写真風の絵（2026.10）=====
   上・正面・後ろ・横は img/ の絵（top_・front_・rear_・side_ の737と787）を使う。横は jet() が返す。
   どれも今までと同じ座標（原点が機体の中心、長さ約40、機首は右）に合わせるので、図の側は変えなくてよい。
   o.type:'787' で787の絵。o.eng:4 と o.vec:true は今までの線の絵。色（o.c）が鮮やかなときは、絵のまわりにその色の光をつけて区別できるようにする */
var IB=((document.currentScript&&document.currentScript.src)||'').split('?')[0].replace(/[^\/]*$/,'')+'img/';
var PIX={top737:[800,655,335],top787:[800,659,334],front737:[800,257,183],front787:[800,256,178],rear737:[800,313,227],rear787:[800,268,179]};
var JN=0;
function strong(c){if(!c||c.charAt(0)!=='#')return false;var h=c.length===4?c.replace(/#(.)(.)(.)/,'#$1$1$2$2$3$3'):c,r=parseInt(h.substr(1,2),16),g=parseInt(h.substr(3,2),16),b=parseInt(h.substr(5,2),16);return Math.max(r,g,b)-Math.min(r,g,b)>70}
function halo(inner,c,sd){if(!strong(c))return inner;var id='jh'+(++JN);return '<filter id="'+id+'" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="'+sd+'" flood-color="'+c+'" flood-opacity="1"/><feDropShadow dx="0" dy="0" stdDeviation="'+(sd/2)+'" flood-color="'+c+'" flood-opacity="1"/></filter><g filter="url(#'+id+')">'+inner+'</g>'}
function pic(k,ww){var p=PIX[k],u=ww/p[0];return '<image href="'+IB+k.replace(/(\d+)$/,'_$1')+'.webp" x="'+(-ww/2)+'" y="'+(-p[2]*u).toFixed(2)+'" width="'+ww+'" height="'+(p[1]*u).toFixed(2)+'" preserveAspectRatio="none"/>'}
var topV=top,sideV=side,frontV=front;
top=function(o){o=o||{};if(o.vec||o.eng===4)return topV(o);return halo(pic('top'+(o.type==='787'?'787':'737'),40),o.c,0.9)};
front=function(o){o=o||{};if(o.vec)return frontV(o);var t=o.type==='787'?'787':'737',g='';
 if(o.rear)return halo(pic('rear'+t,46),o.c,0.9);
 if(o.gear){var gy=t==='787'?3.5:3.0,mx=t==='787'?3.6:2.9,wy=t==='787'?5.3:4.9,tw=function(x){return '<rect x="'+(x-0.62)+'" y="'+wy+'" width="0.55" height="1.05" rx="0.22" fill="#1E2730"/><rect x="'+(x+0.07)+'" y="'+wy+'" width="0.55" height="1.05" rx="0.22" fill="#1E2730"/>'};
  g='<path d="M0 '+gy+' L0 '+(wy+0.5)+' M'+(-mx)+' '+(gy-0.5)+' L'+(-mx)+' '+(wy+0.5)+' M'+mx+' '+(gy-0.5)+' L'+mx+' '+(wy+0.5)+'" stroke="#5B6B7D" stroke-width="0.32" fill="none"/><rect x="-0.5" y="'+(wy+0.15)+'" width="0.42" height="0.8" rx="0.18" fill="#1E2730"/><rect x="0.08" y="'+(wy+0.15)+'" width="0.42" height="0.8" rx="0.18" fill="#1E2730"/>'+tw(-mx)+tw(mx)}
 return halo(g+pic('front'+t,46),o.c,0.9)};
side=function(o){o=o||{};if(o.vec)return sideV(o);var big=o.type==='787';return halo('<g transform="scale('+(big?0.637:1.013)+')">'+jet(big?'787':'737',{gear:!!o.gear,shadow:false,win:o.win})+'</g>',o.c,0.9)};
/* 横から見た形：jet('737') と jet('787')。img/side_737・side_787 の絵（利用者が作った絵、機首は右、脚は出た状態）を使う。
   単位はメートル（実物の大きさ）。機首は右、胴体の中心線が y=0、地面（タイヤの下）は y>0。737-800：全長約39.5m、787-9：全長約62.8m。
   同じ縮尺で描くと大きさの違いも分かる。o.tint・o.gear・o.win は互換のために受け取るだけ（絵は1種類） */
var SIDE={'737':{f:'side_737',w:41,nose:19.75,iw:1000,ih:311,nx:997,cy:213},'787':{f:'side_787',w:64,nose:31.4,iw:1000,ih:265,nx:998,cy:174}};
function jet(kind,o){var d=SIDE[kind==='787'?'787':'737'],u=d.w/d.iw,x0=d.nose-d.nx*u;
 return '<image href="'+IB+d.f+'.webp" x="'+x0.toFixed(2)+'" y="'+(-d.cy*u).toFixed(2)+'" width="'+d.w+'" height="'+(d.ih*u).toFixed(2)+'" preserveAspectRatio="none"/>'}
window.ACFT={top:top,side:side,front:front,jet:jet,colors:K};
})();
