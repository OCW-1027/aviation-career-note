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
   上・正面・後ろは img/ の絵（top_737・front_737・rear_737 と 787）を使う。横は同じ塗装（白い胴体・青い腹・青い尾翼の帯）で jet() が描く。
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
/* 詳しい横から見た形：jet('737') と jet('787')。単位はメートル（実物の大きさ）。機首は右、胴体の中心線が y=0、地面は y>0。
   737-800：全長約39.5m・高さ約12.5m／787-9：全長約62.8m・高さ約17m。塗装は img/ の絵と同じ（白い胴体、青い腹と波の帯、青い尾翼に水色と白の帯）。
   o.gear:false で脚なし、o.shadow:false で地面の影なし、o.win:false で窓なし */
function jet(kind,o){o=o||{};var n='jt'+(++JN),L='#2C3A4A',ns=' vector-effect="non-scaling-stroke"',big=kind==='787';
 var B1='#1B5CC0',B2='#3F8BE0',B3='#A9C9EC';
 function LG(id,st,x2,y2){return '<linearGradient id="'+n+id+'" x1="0" y1="0" x2="'+(x2||0)+'" y2="'+(y2==null?1:y2)+'">'+st.map(function(a){return '<stop offset="'+a[0]+'" stop-color="'+a[1]+'"'+(a[2]!=null?' stop-opacity="'+a[2]+'"':'')+'/>'}).join('')+'</linearGradient>'}
 var G=big?{len:31.4,top:-2.95,bot:2.9,gr:5.2}:{len:19.75,top:-1.95,bot:1.9,gr:3.62};
 var fus,fin,stab,wing,pyl,nac,core,inl;
 if(big){
  fus='M31.4 0.4 C31.3 -1.5 29.9 -2.95 26.2 -2.95 L-18 -2.95 C-24 -2.9 -29 -1.6 -31.4 -0.55 L-31.4 -0.15 C-28 0.7 -24 2.3 -18 2.9 L23 2.9 C28.8 2.9 31.3 2 31.4 0.4 Z';
  fin='M-14.6 -2.95 C-17.2 -3.2 -18.9 -4.4 -20.4 -6 L-26.4 -11.8 L-30.2 -11.8 L-29.7 -2.3 Z';
  stab='M-23.6 -1.5 L-33.4 -2.6 L-33.5 -1.95 L-25.2 -0.55 Z';wing='M9 2.45 L-12.8 0.35 L-17.4 0.2 L-5.4 2.75 Z';pyl='M11.8 1.7 L9.2 1.05 L5.2 1.7 L7.6 2.1 Z';
  nac='M14.3 3.1 C14.4 1.95 13.7 1.5 12.6 1.5 L7.3 1.62';for(var k=0;k<6;k++){var y0=1.62+k*0.49;nac+=' L6.8 '+(y0+0.245).toFixed(2)+' L7.3 '+(y0+0.49).toFixed(2)}nac+=' L12.6 4.62 C13.7 4.62 14.4 4.25 14.3 3.1 Z';
  core='M6.85 2.35 L4.4 3.06 L6.85 3.8 Z';inl={x:14.25,y:3.06,rx:0.42,ry:1.5};
 }else{
  fus='M19.75 0.2 C19.65 -1.1 18.4 -1.95 16 -1.95 L-11 -1.95 C-14.5 -1.95 -17.6 -1.5 -19.2 -1.05 L-19.75 -0.95 L-19.75 -0.6 C-17.5 0.2 -14 1.4 -9.5 1.9 L14 1.9 C17.5 1.9 19.6 1.3 19.75 0.2 Z';
  fin='M-9.2 -1.95 C-10.6 -2.1 -11.6 -2.6 -12.3 -3.2 L-17.2 -8.9 L-19.6 -8.9 L-19.2 -1.55 Z';
  stab='M-15.4 -0.95 L-21 -1.85 L-21.1 -1.4 L-16.4 -0.35 Z';wing='M5.8 1.75 L-6.8 0.45 L-8.7 0.45 L-3.1 1.9 Z';pyl='M7.3 1.35 L5.4 1.15 L3.1 1.5 L4.6 1.7 Z';
  nac='M9.25 2.05 C9.35 1.5 8.95 1.28 8.4 1.28 L5.05 1.33 L4.35 1.8 L4.35 2.95 L5.05 3.28 L8.4 3.32 C9.0 3.32 9.35 3.05 9.25 2.6 Z';
  core='M4.4 2.0 L3.45 2.35 L4.4 2.75 Z';inl={x:9.2,y:2.3,rx:0.27,ry:0.98};
 }
 var d='<defs>'+LG('f',[[0,'#FFFFFF'],[.5,'#F2F5F8'],[.85,'#C9D2DC'],[1,'#98A4B1']])+LG('h',[[0,'#fff',0],[.14,'#fff',0],[.26,'#fff',.9],[.4,'#fff',0],[1,'#fff',0]])+
  LG('b',[[0,B2],[.5,B1],[1,'#123F8A']])+LG('e',[[0,'#FFFFFF'],[.35,'#E6EBF0'],[.75,'#AEB9C5'],[1,'#7C8999']])+LG('w',[[0,'#F4F6F9'],[.6,'#CDD5DE'],[1,'#9DA9B6']])+LG('g',[[0,'#3A4654'],[.5,'#141B22'],[1,'#3A4654']])+
  '<radialGradient id="'+n+'s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0f3558" stop-opacity=".22"/><stop offset="1" stop-color="#0f3558" stop-opacity="0"/></radialGradient>'+
  '<clipPath id="'+n+'c"><path d="'+fus+'"/></clipPath><clipPath id="'+n+'t"><path d="'+fin+'"/></clipPath></defs>';
 function P(dd,fill,sw){return '<path d="'+dd+'" fill="'+fill+'" stroke="'+L+'" stroke-width="'+(sw||1)+'" stroke-linejoin="round"'+ns+'/>'}
 function F(dd,fill,op){return '<path d="'+dd+'" fill="'+fill+'"'+(op!=null?' opacity="'+op+'"':'')+'/>'}
 function LN(dd,c,w,op){return '<path d="'+dd+'" fill="none" stroke="'+(c||L)+'" stroke-width="'+(w||0.8)+'" stroke-linecap="round"'+(op!=null?' opacity="'+op+'"':'')+ns+'/>'}
 var g='',e=G.len,hh=G.bot;
 if(o.shadow!==false)g+='<ellipse cx="0" cy="'+(G.gr+0.15)+'" rx="'+(e*0.95)+'" ry="'+(big?0.9:0.6)+'" fill="url(#'+n+'s)"/>';
 /* 尾翼：青に水色と白の斜めの帯 */
 var fx=big?[-14.6,-30.2,-11.8,-2.3]:[-9.2,-19.6,-8.9,-1.55],fw=fx[0]-fx[1],fh=fx[3]-fx[2];
 function band(a,b,col){return '<path d="M'+(fx[1]-fw*0.2)+' '+(fx[3]-fh*a)+' L'+(fx[0]+fw*0.2)+' '+(fx[3]-fh*a-fh*0.75)+' L'+(fx[0]+fw*0.2)+' '+(fx[3]-fh*b-fh*0.75)+' L'+(fx[1]-fw*0.2)+' '+(fx[3]-fh*b)+' Z" fill="'+col+'"/>'}
 g+='<path d="'+fin+'" fill="url(#'+n+'b)"/><g clip-path="url(#'+n+'t)">'+band(-0.05,0.13,B3)+band(0.13,0.27,'#FFFFFF')+band(-0.5,-0.05,B2)+'</g>'+P(fin,'none')+LN(big?'M-28.6 -11.4 L-28.2 -3.2':'M-18.75 -8.6 L-18.4 -2.1',L,0.7,.45);
 /* 胴体：白＋腹の青い波 */
 g+='<path d="'+fus+'" fill="url(#'+n+'f)"/><g clip-path="url(#'+n+'c)">'+
  '<path d="M'+e+' '+(hh*0.62)+' C'+(e*0.55)+' '+(hh*0.95)+' '+(e*0.25)+' '+(hh*0.05)+' '+(-e*0.1)+' '+(hh*0.12)+' S'+(-e*0.7)+' '+(hh*0.05)+' '+(-e)+' '+(-hh*0.75)+' L'+(-e)+' '+(hh+1)+' L'+e+' '+(hh+1)+' Z" fill="'+B3+'"/>'+
  '<path d="M'+e+' '+(hh*0.74)+' C'+(e*0.55)+' '+(hh*1.05)+' '+(e*0.25)+' '+(hh*0.2)+' '+(-e*0.1)+' '+(hh*0.26)+' S'+(-e*0.7)+' '+(hh*0.2)+' '+(-e)+' '+(-hh*0.55)+' L'+(-e)+' '+(hh+1)+' L'+e+' '+(hh+1)+' Z" fill="#FFFFFF"/>'+
  '<path d="M'+e+' '+(hh*0.82)+' C'+(e*0.55)+' '+(hh*1.12)+' '+(e*0.25)+' '+(hh*0.3)+' '+(-e*0.1)+' '+(hh*0.36)+' S'+(-e*0.7)+' '+(hh*0.3)+' '+(-e)+' '+(-hh*0.4)+' L'+(-e)+' '+(hh+1)+' L'+e+' '+(hh+1)+' Z" fill="url(#'+n+'b)"/></g>'+
  F(fus,'url(#'+n+'h)')+P(fus,'none');
 if(o.win!==false){var wy=big?-1.3:-1.0,ww=big?0.38:0.28,wh=big?0.74:0.5;for(var x=(big?-19:-12.6);x<=(big?24:13.2);x+=(big?1.05:0.53)){if(big?(x>-5.6&&x<-4):(x>-0.75&&x<1.15))continue;g+='<rect x="'+(x-ww/2).toFixed(2)+'" y="'+wy+'" width="'+ww+'" height="'+wh+'" rx="'+(ww/2)+'" fill="#20344D"/>'}}
 (big?[[25,1.0],[14.6,1.05],[-4.8,1.05],[-16.2,1.05]]:[[14.45,0.85],[-11.1,0.8]]).forEach(function(dr){g+='<rect x="'+(dr[0]-dr[1]/2)+'" y="'+(big?-2.1:-1.55)+'" width="'+dr[1]+'" height="'+(big?3:2.05)+'" rx="0.25" fill="none" stroke="#7C8999" stroke-width="0.9"'+ns+'/>'});
 if(!big)[-0.3,0.65].forEach(function(x){g+='<rect x="'+(x-0.25)+'" y="-1.05" width="0.5" height="0.9" rx="0.12" fill="none" stroke="#7C8999" stroke-width="0.7"'+ns+'/>'});
 g+=big?F('M28.1 -1.7 L30.25 -1.08 L30.62 -0.48 L28 -0.7 Z','#14263C')+LN('M29.1 -1.42 L29.05 -0.62','#C9D2DC',1)+LN('M29.75 -1.2 L29.8 -0.56','#C9D2DC',1):F('M17 -1.32 L18.7 -0.98 L18.92 -0.55 L16.9 -0.66 Z','#14263C')+LN('M17.65 -1.2 L17.6 -0.64','#C9D2DC',1)+LN('M18.25 -1.08 L18.25 -0.6','#C9D2DC',1);
 g+=P(stab,'url(#'+n+'w)')+P(wing,'url(#'+n+'w)')+(big?LN('M-4.5 2.55 L-15.5 0.35','#7C8999',0.8,.8):LN('M-2.6 1.75 L-8.2 0.55','#7C8999',0.8,.8));
 g+=P(pyl,'url(#'+n+'e)')+P(nac,'url(#'+n+'e)')+P(core,'#6F7C8A');
 g+='<ellipse cx="'+inl.x+'" cy="'+inl.y+'" rx="'+inl.rx+'" ry="'+inl.ry+'" fill="#D5DDE6" stroke="'+L+'" stroke-width="0.8"'+ns+'/><ellipse cx="'+(inl.x-0.05)+'" cy="'+inl.y+'" rx="'+(inl.rx*0.7)+'" ry="'+(inl.ry*0.82)+'" fill="url(#'+n+'g)"/><ellipse cx="'+(inl.x-0.04)+'" cy="'+inl.y+'" rx="'+(inl.rx*0.25)+'" ry="'+(inl.ry*0.18)+'" fill="#C9D2DC"/>';
 if(o.gear!==false){var tyre=function(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#1E2730"/><circle cx="'+x+'" cy="'+y+'" r="'+(r*0.48)+'" fill="#9AA8B8"/><circle cx="'+x+'" cy="'+y+'" r="'+(r*0.2)+'" fill="#5B6B7D"/>'};
  if(big)g+=LN('M26 2.9 L26 4.15','#5B6B7D',2.2)+tyre(26,4.62,0.58)+LN('M-1 2.9 L-1 4.0','#5B6B7D',2.6)+LN('M-2.2 4.05 L0.2 4.05','#5B6B7D',2)+tyre(-2,4.5,0.72)+tyre(0,4.5,0.72);
  else g+=LN('M16.4 1.9 L16.4 2.85','#5B6B7D',2.2)+tyre(16.4,3.22,0.4)+LN('M-0.6 1.9 L-0.6 2.6','#5B6B7D',2.6)+tyre(-0.6,3.05,0.56)}
 return d+g}
window.ACFT={top:top,side:side,front:front,jet:jet,colors:K};
})();
