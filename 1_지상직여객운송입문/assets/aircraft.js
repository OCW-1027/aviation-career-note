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
window.ACFT={top:top,side:side,front:front,colors:K};
})();
