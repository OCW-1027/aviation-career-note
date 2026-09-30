/* 現場の事例 Part 5・6（イレギュラーのストーリー）の図（2026.09）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は WR、題名は TTL、高さは行数で計算） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D,G=H.C.G;
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
/* 時間の流れ：左に時刻、右に出来事と判断。黄色が順に移る。kind：'d'＝判断の場面（橙の印） */
function TL(title,ev){
 setK(1);var n=ev.length,dur=Math.max(12,n*2.2),y=62,top=y,rows='';
 var s=TTL(320,30,title,15,'#0f3558',600);
 ev.forEach(function(e,i){var n1=LI(e[1],11.5,430).length,n2=LI(e[2],10.5,430).length,h=n1*FS(11.5)*1.3+n2*FS(10.5)*1.3+18,dec=e[3]==='d';
  rows+='<g>'+R(118,y,502,h,dec?'#FFF6EC':'#fff',10,' stroke="'+(dec?'#F0A04B':'#D9E3EC')+'" stroke-width="'+(dec?2:1)+'"')+'<rect x="118" y="'+y+'" width="502" height="'+h+'" rx="10" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.45)+' dur="'+dur+'s" repeatCount="indefinite"/></rect>'+WR(52,y+h/2+FS(11)*0.3,e[0],11,'#2F6FD6',900,76)+WR(134,y+8+n1*FS(11.5)*1.3/2+FS(11.5)*0.3,e[1],11.5,D,900,470,'start')+WR(134,y+12+n1*FS(11.5)*1.3+n2*FS(10.5)*1.3/2+FS(10.5)*0.3,e[2],10.5,G,800,470,'start')+(dec?'<circle cx="606" cy="'+(y+14)+'" r="6" fill="#F08C2C"/>':'')+'</g>';y+=h+8});
 s+='<line x1="104" y1="'+(top+4)+'" x2="104" y2="'+(y-8)+'" stroke="#C8D3DE" stroke-width="4"/>'+rows;
 s+='<circle cx="104" r="7" fill="#FFD23F" stroke="#0f3558"><animate attributeName="cy" values="'+(top+10)+';'+(y-14)+'" dur="'+dur+'s" repeatCount="indefinite"/></circle>';
 y+=6;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+R(0,0,640,y,'#F7FAFD')+s+'</svg>'}
var F={};
window.IRR_TL_DATA=window.IRR_TL_DATA||{};
/* データは data/tl_*.js が window.IRR_TL_DATA[id]={ja:[title,ev],ko:…,en:…} の形で入れる */
function make(id){return function(l){var d=window.IRR_TL_DATA[id];if(!d)return '';var x=d[l]||d.ja;return TL(x[0],x[1])}}
window.IRR_MAKE=function(ids){ids.forEach(function(id){window.FIGS[id]=H.FIX2(make(id))})};
})();
