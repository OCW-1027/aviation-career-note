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
/* 詳しい横から見た形（2026.10）：jet('737') と jet('787')。単位はメートル（実物の大きさ）。機首は右、胴体の中心線が y=0、地面は y>0。
   737-800：全長約39.5m・高さ約12.5m・胴体の直径約3.8m／787-9：全長約62.8m・高さ約17m・胴体の直径約5.8m。両方を同じ縮尺で描くと大きさの違いも分かる。
   o.tint：'alu'（銀色）・'comp'（複合材の緑がかった色）・既定は白。o.win:false で窓なし。o.gear:false で脚なし。o.stripe：胴体の線の色 */
var JN=0;
function jet(kind,o){o=o||{};var n='jt'+(++JN),L=CUR.line,ns=' vector-effect="non-scaling-stroke"';
 var tints={alu:['#FFFFFF','#E4E9EF','#B8C3CE'],comp:['#F2FAFA','#CFE8E8','#93C2C4'],def:['#FFFFFF','#EEF2F6','#C9D2DC']},t=tints[o.tint]||tints.def;
 var d='<defs><linearGradient id="'+n+'f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+t[0]+'"/><stop offset=".55" stop-color="'+t[1]+'"/><stop offset="1" stop-color="'+t[2]+'"/></linearGradient>'+
  '<linearGradient id="'+n+'e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6EBF0"/><stop offset=".5" stop-color="#C3CCD6"/><stop offset="1" stop-color="#8E9AA8"/></linearGradient>'+
  '<linearGradient id="'+n+'w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9EEF3"/><stop offset="1" stop-color="#B9C4CF"/></linearGradient></defs>';
 function P(dd,fill,sw){return '<path d="'+dd+'" fill="'+fill+'" stroke="'+L+'" stroke-width="'+(sw||1)+'" stroke-linejoin="round"'+ns+'/>'}
 function LN(dd,c,w){return '<path d="'+dd+'" fill="none" stroke="'+(c||L)+'" stroke-width="'+(w||0.8)+'" stroke-linecap="round"'+ns+'/>'}
 var g='';
 if(kind==='787'){
  var fus='M31.4 0.4 C31.2 -1.7 29.4 -2.95 25.4 -2.95 L-18 -2.95 C-24 -2.9 -29 -1.6 -31.4 -0.55 L-31.4 -0.15 C-28 0.7 -24 2.3 -18 2.9 L23 2.9 C28.6 2.9 31.2 2 31.4 0.4 Z';
  var fin='M-14.6 -2.95 C-17.2 -3.2 -18.9 -4.4 -20.4 -6 L-26.4 -11.8 L-30.2 -11.8 L-29.7 -2.3 Z';
  var stab='M-23.6 -1.5 L-33.4 -2.6 L-33.5 -1.95 L-25.2 -0.55 Z';
  var wing='M9 2.45 L-12.8 0.35 L-17.4 0.2 L-5.4 2.75 Z';
  var pyl='M11.8 1.7 L9.2 1.05 L5.2 1.7 L7.6 2.1 Z';
  var nac='M14.3 3.1 C14.4 1.95 13.7 1.5 12.6 1.5 L7.3 1.62';for(var k=0;k<6;k++){var y0=1.62+k*0.49;nac+=' L6.8 '+(y0+0.245).toFixed(2)+' L7.3 '+(y0+0.49).toFixed(2)}nac+=' L12.6 4.62 C13.7 4.62 14.4 4.25 14.3 3.1 Z';
  var core='M6.85 2.35 L4.5 3.06 L6.85 3.8 Z';
  g+=P(fin,'url(#'+n+'f)')+LN('M-28.6 -11.4 L-28.2 -3.2',L,0.7)+P(fus,'url(#'+n+'f)');
  if(o.stripe)g+='<path d="M30.2 0.9 L-26 0.9 L-28.5 0.35" fill="none" stroke="'+o.stripe+'" stroke-width="3"'+ns+'/>';
  if(o.win!==false){for(var x=-19;x<=24;x+=1.05)g+='<rect x="'+(x-0.18).toFixed(2)+'" y="-1.25" width="0.36" height="0.7" rx="0.17" fill="#2F4F73" opacity=".85"/>'}
  [[24.2,1.05],[14.6,1.05],[-4.8,1.05],[-16.2,1.05]].forEach(function(dr){g+='<rect x="'+(dr[0]-dr[1]/2)+'" y="-2.05" width="'+dr[1]+'" height="2.9" rx="0.28" fill="none" stroke="'+L+'" stroke-width="0.7"'+ns+' opacity=".7"/>'});
  g+='<path d="M28.2 -1.65 L30.25 -1.05 L30.6 -0.5 L28.1 -0.72 Z" fill="#2F4F73"/>'+LN('M29.15 -1.38 L29.1 -0.62',t[0],0.9);
  g+=P(stab,'url(#'+n+'w)')+P(wing,'url(#'+n+'w)')+P(pyl,'url(#'+n+'e)')+P(nac,'url(#'+n+'e)')+P(core,'#8E9AA8')+'<ellipse cx="14.2" cy="3.06" rx="0.38" ry="1.42" fill="#2B3642"/>'+LN('M12.6 1.75 L12.6 4.4',L,0.6);
  if(o.gear!==false){g+=LN('M26 2.9 L26 4.3','#2B3642',2)+'<circle cx="26" cy="4.62" r="0.58" fill="#2B3642"/><circle cx="26" cy="4.62" r="0.24" fill="#9AA8B8"/>'+LN('M-1 2.9 L-1 4.0','#2B3642',2.4)+LN('M-2.2 4.05 L0.2 4.05','#2B3642',2)+'<circle cx="-2" cy="4.5" r="0.72" fill="#2B3642"/><circle cx="0" cy="4.5" r="0.72" fill="#2B3642"/><circle cx="-2" cy="4.5" r="0.3" fill="#9AA8B8"/><circle cx="0" cy="4.5" r="0.3" fill="#9AA8B8"/>'}
 }else{
  var fus='M19.75 0.2 C19.6 -1.2 18.1 -1.95 15.6 -1.95 L-11 -1.95 C-14.5 -1.95 -17.6 -1.5 -19.2 -1.05 L-19.75 -0.95 L-19.75 -0.6 C-17.5 0.2 -14 1.4 -9.5 1.9 L14 1.9 C17.4 1.9 19.5 1.3 19.75 0.2 Z';
  var fin='M-9.2 -1.95 C-10.6 -2.1 -11.6 -2.6 -12.3 -3.2 L-17.2 -8.9 L-19.6 -8.9 L-19.2 -1.55 Z';
  var stab='M-15.4 -0.95 L-21 -1.85 L-21.1 -1.4 L-16.4 -0.35 Z';
  var wing='M5.8 1.75 L-6.8 0.45 L-8.7 0.45 L-3.1 1.9 Z';
  var wl='M-6.8 0.45 L-8.1 -1.45 L-8.8 -1.45 L-8.7 0.45 Z';
  var pyl='M7.3 1.35 L5.4 1.15 L3.1 1.5 L4.6 1.7 Z';
  var nac='M9.25 2.05 C9.35 1.5 8.95 1.28 8.4 1.28 L5.05 1.33 L4.35 1.8 L4.35 2.95 L5.05 3.28 L8.4 3.32 C9.0 3.32 9.35 3.05 9.25 2.6 Z';
  var core='M4.4 2.0 L3.55 2.35 L4.4 2.75 Z';
  g+=P(fin,'url(#'+n+'f)')+LN('M-18.75 -8.6 L-18.4 -2.1',L,0.7)+P(fus,'url(#'+n+'f)');
  if(o.stripe)g+='<path d="M18.9 0.55 L-15.5 0.55 L-18 0.05" fill="none" stroke="'+o.stripe+'" stroke-width="3"'+ns+'/>';
  if(o.win!==false){for(var x=-12.6;x<=13.2;x+=0.53)if(x<-0.7||x>1.1)g+='<rect x="'+(x-0.13).toFixed(2)+'" y="-0.95" width="0.26" height="0.48" rx="0.12" fill="#2F4F73" opacity=".85"/>'}
  [[14.45,0.85],[-11.1,0.8]].forEach(function(dr){g+='<rect x="'+(dr[0]-dr[1]/2)+'" y="-1.5" width="'+dr[1]+'" height="1.95" rx="0.2" fill="none" stroke="'+L+'" stroke-width="0.7"'+ns+' opacity=".7"/>'});
  [-0.3,0.65].forEach(function(x){g+='<rect x="'+(x-0.25)+'" y="-1.0" width="0.5" height="0.85" rx="0.12" fill="none" stroke="'+L+'" stroke-width="0.6"'+ns+' opacity=".6"/>'});
  g+='<path d="M17.1 -1.28 L18.65 -0.95 L18.85 -0.55 L17.0 -0.66 Z" fill="#2F4F73"/>'+LN('M17.85 -1.1 L17.8 -0.62',t[0],0.9);
  g+=P(stab,'url(#'+n+'w)')+P(wing,'url(#'+n+'w)')+P(wl,'url(#'+n+'w)')+P(pyl,'url(#'+n+'e)')+P(nac,'url(#'+n+'e)')+P(core,'#8E9AA8')+'<ellipse cx="9.17" cy="2.3" rx="0.24" ry="0.92" fill="#2B3642"/>';
  if(o.gear!==false){g+=LN('M16.4 1.9 L16.4 2.95','#2B3642',2)+'<circle cx="16.4" cy="3.22" r="0.4" fill="#2B3642"/><circle cx="16.4" cy="3.22" r="0.16" fill="#9AA8B8"/>'+LN('M-0.6 1.9 L-0.6 2.75','#2B3642',2.4)+'<circle cx="-0.6" cy="3.05" r="0.56" fill="#2B3642"/><circle cx="-0.6" cy="3.05" r="0.22" fill="#9AA8B8"/>'}
 }
 return d+g}
window.ACFT={top:top,side:side,front:front,jet:jet,colors:K};
})();
