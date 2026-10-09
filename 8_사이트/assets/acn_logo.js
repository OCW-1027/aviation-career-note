/* サイトのロゴ（ACN のマーク＋「Aviation Career Note」）2026.10
   ここ1か所で決める。使うところ：トップページなど（v3.js のページ）と、講座・レッスン・ツールの共通の頭（acn_shell.js）、フッター、ファビコン。
   ・マークは3案。下の ACN_LOGO_CHOICE を 'a' / 'b' / 'c' に変えるだけで、サイト全体が切り替わる
       a：角の丸い四角に ACN（細い一筆の線）＋飛行機雲の線
       b：筆記体の acn を一筆で（飛行の軌跡のように、最後は上昇していく）
       c：翼の形のバッジに ACN
   ・お試し：アドレスの後ろに ?logo=b のように付けると、そのページだけ別の案で見られる（保存はしない）
   ・マークは文字のフォントを使わず、線（path）だけで描く。文字の部分（Aviation Career Note）はページの文字（Inter）
   ・ロゴの文字は日本語・韓国語・英語の画面で同じ（ブランド名なので訳さない） */
(function(){
if(window.ACN_LOGO)return;
var ACN_LOGO_CHOICE='a';

var NAVY='#091c2f',BLUE='#1769e0',SKY='#7fb2ff',CYAN='#1ea7b8';
var q=(location.search.match(/[?&]logo=([abc])\b/)||[])[1];
var CHOICE=q||ACN_LOGO_CHOICE;

/* 文字の線（中心線）。x,y＝左上、w,h＝幅と高さ */
function A(x,y,w,h){return 'M'+x+' '+(y+h)+'L'+(x+w/2)+' '+y+'L'+(x+w)+' '+(y+h)+'M'+r(x+w*.24)+' '+r(y+h*.66)+'H'+r(x+w*.76)}
function C(x,y,w,h){return 'M'+(x+w)+' '+r(y+h*.2)+'C'+r(x+w*.83)+' '+r(y+h*.05)+' '+r(x+w*.68)+' '+y+' '+r(x+w*.52)+' '+y+'C'+r(x+w*.2)+' '+y+' '+x+' '+r(y+h*.25)+' '+x+' '+r(y+h*.5)+'C'+x+' '+r(y+h*.75)+' '+r(x+w*.2)+' '+(y+h)+' '+r(x+w*.52)+' '+(y+h)+'C'+r(x+w*.68)+' '+(y+h)+' '+r(x+w*.83)+' '+r(y+h*.95)+' '+(x+w)+' '+r(y+h*.8)}
function N(x,y,w,h){return 'M'+x+' '+(y+h)+'V'+y+'L'+(x+w)+' '+(y+h)+'V'+y}
function r(n){return Math.round(n*100)/100}
function st(c,w,extra){return ' fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"'+(extra||'')}

/* 3つの案。dark＝紺の地の上に置くとき */
var MARKS={
 a:{w:48,h:48,draw:function(dk){
  var tile=dk?'#ffffff':NAVY,ink=dk?NAVY:'#ffffff',trail=dk?BLUE:SKY;
  return '<rect x="1" y="1" width="46" height="46" rx="12" fill="'+tile+'"/>'+
   '<path d="'+A(7.6,10.8,10,17.6)+C(20.9,10.8,8,17.6)+N(32,10.8,8.6,17.6)+'"'+st(ink,2.8)+'/>'+
   /* 飛行機雲：左下から右上へ上昇していく線（2本目は細く薄く） */
   '<path d="M7.6 39.6C18.4 39.2 29.4 37.4 40.4 33"'+st(trail,2)+'/>'+
   '<path d="M7.6 43C15.8 42.7 23.4 41.7 30.6 39.8"'+st(trail,1.3,' opacity=".5"')+'/>'}},
 b:{w:74,h:44,draw:function(dk){
  var ink=dk?'#ffffff':NAVY,trail=dk?SKY:BLUE;
  /* a → c → n を一筆で。n の終わりの線がそのまま上昇していく飛行の軌跡 */
  var d='M21.2 16.4C19.6 13.9 15.6 13.4 13 15.4C10.4 17.4 9.6 22.4 10.6 25.6C11.6 28.8 14.8 29.6 17 28.2C19.2 26.8 20.6 22.4 21.4 15.2'+
   'C20.9 19.8 20.2 25.6 21.2 27.8C22 29.6 24.4 29.4 26.2 27.6'+
   'C28.6 25.2 30.6 18.4 33.4 15.6C35.2 13.8 38.6 13.2 39 15.2C39.3 16.8 36.8 17.4 35.2 16.2'+
   'C32.2 17.6 30.4 21.2 30.6 24.2C30.9 28.2 34.4 29.6 37.4 28.6C39.2 28 40.4 26.6 41.4 24.8'+
   'C42.6 22.4 43.6 18 44.4 14.6L43.4 29'+
   'C44.2 22 46.6 15 50.4 14.6C53.6 14.3 53.6 18 53.1 21C52.6 24 52.2 28.6 55 28.8';
  return '<path d="'+d+'"'+st(ink,3.1)+'/>'+
   '<path d="M55 28.8C59.2 28.8 63.4 25.6 66.6 19.8"'+st(trail,2.8)+'/>'+
   /* 小さな飛行機（上昇の向き） */
   '<path transform="translate(68.4 16.4) rotate(-58) scale(1.05)" d="M5.2 0L1.4-1L-.4-5H-2L-1.2-1H-3.6L-4.6-2.6H-5.6L-4.8 0L-5.6 2.6H-4.6L-3.6 1H-1.2L-2 5H-.4L1.4 1Z" fill="'+trail+'"/>'}},
 c:{w:80,h:44,draw:function(dk){
  var body=dk?'#ffffff':NAVY,ink=dk?NAVY:'#ffffff',feather=dk?SKY:BLUE;
  /* 前に傾いた翼の形のバッジ。左の3本の羽根（線）が後ろへ流れる */
  return '<path d="M24 5.5H72.5C76 5.5 77.6 8.6 76.1 11.6L64.6 35.4C63.4 37.6 61.5 38.5 59 38.5H14C10.6 38.5 9.4 35.6 10.9 33Z" fill="'+body+'"/>'+
   '<path d="M19.5 9.5H3.5M14.5 18H1.5M10.5 26.5H3.5"'+st(feather,3)+'/>'+
   '<g transform="translate(43.5 22) skewX(-14) translate(-43.5 -22)"><path d="'+A(23.5,12.5,11.5,19)+C(38.5,12.5,10,19)+N(52,12.5,9,19)+'"'+st(ink,3.4)+'/></g>'}}
};

function mark(ch,o){o=o||{};var m=MARKS[ch]||MARKS.a;
 return '<svg class="acn-mk acn-mk-'+(MARKS[ch]?ch:'a')+'" viewBox="0 0 '+m.w+' '+m.h+'" width="'+m.w+'" height="'+m.h+'" aria-hidden="true" focusable="false">'+m.draw(!!o.dark)+'</svg>';}
/* ロゴ一式：マーク＋Aviation Career Note（A・C・N だけアクセントの青） */
function lockup(o){o=o||{};var ch=o.choice||CHOICE;
 return '<span class="acn-lk'+(o.dark?' acn-dk':'')+'">'+mark(ch,o)+'<span class="acn-wm"><span class="acn-i">A</span>viation <span class="acn-i">C</span>areer <span class="acn-i">N</span>ote</span></span>';}
/* ファビコン（ブラウザのタブの小さな絵）：紺の四角に、白い線のマーク */
function favicon(ch){ch=ch||CHOICE;var m=MARKS[ch]||MARKS.a,inner;
 if(ch==='a')inner=m.draw(false);
 else{var s=40/m.w,tx=(48-m.w*s)/2,ty=(48-m.h*s)/2;
  inner='<rect x="1" y="1" width="46" height="46" rx="12" fill="'+NAVY+'"/><g transform="translate('+r(tx)+' '+r(ty)+') scale('+r(s)+')">'+m.draw(true).replace(/fill="#ffffff"/,'fill="none" stroke="#ffffff" stroke-width="2.6"').replace(/fill="none" stroke="#091c2f"/g,'fill="none" stroke="#ffffff"')+'</g>';}
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">'+inner+'</svg>';}
function faviconHref(ch){return 'data:image/svg+xml,'+encodeURIComponent(favicon(ch))}

var CSS='.acn-lk{display:inline-flex;align-items:center;gap:10px;line-height:1;white-space:nowrap;vertical-align:middle;text-decoration:none}'+
'.acn-lk .acn-mk{display:block;flex:none;width:auto;height:34px}'+
'.acn-lk .acn-mk-b,.acn-lk .acn-mk-c{height:32px}'+
'.acn-lk .acn-wm{font-family:Inter,"Helvetica Neue",Arial,system-ui,sans-serif;font-weight:800;font-size:18px;letter-spacing:-.02em;color:'+NAVY+';font-style:normal;text-transform:none}'+
'.acn-lk .acn-i{color:'+BLUE+';display:inline;margin:0;font-weight:inherit}'+
'.acn-lk.acn-dk .acn-wm{color:#fff}.acn-lk.acn-dk .acn-i{color:'+SKY+'}'+
'[data-acn-logo]{display:inline-flex;align-items:center;flex:none;text-decoration:none}'+
'.acn-ftb{display:inline-block!important;margin:0 0 12px!important;text-decoration:none!important}'+
'@media(max-width:600px){.acn-lk{gap:8px}.acn-lk .acn-mk{height:30px}.acn-lk .acn-mk-b,.acn-lk .acn-mk-c{height:28px}.acn-lk .acn-wm{font-size:16.5px}}'+
'@media(max-width:360px){.acn-lk .acn-wm{font-size:15px}}';
function css(){if(document.getElementById('acn-logo-css'))return;var s=document.createElement('style');s.id='acn-logo-css';s.textContent=CSS;(document.head||document.documentElement).appendChild(s)}
/* data-acn-logo（＝紺の地は "dark"）を付けた場所にロゴを入れる */
function fill(root){css();Array.prototype.forEach.call((root||document).querySelectorAll('[data-acn-logo]'),function(el){
 var dk=el.getAttribute('data-acn-logo')==='dark';if(el.getAttribute('data-acn-done')===CHOICE+dk)return;
 el.innerHTML=lockup({dark:dk});el.setAttribute('data-acn-done',CHOICE+dk);if(!el.getAttribute('aria-label'))el.setAttribute('aria-label','Aviation Career Note')});}
/* ファビコンが無いページには付ける（ビルドで入れたものがあれば、そのまま） */
function icon(){try{if(document.querySelector('link[rel~="icon"]'))return;var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=faviconHref();(document.head||document.documentElement).appendChild(l)}catch(e){}}

window.ACN_LOGO_CHOICE=ACN_LOGO_CHOICE;
window.ACN_LOGO={choice:CHOICE,marks:MARKS,mark:mark,lockup:lockup,favicon:favicon,faviconHref:faviconHref,css:css,fill:fill};
if(typeof document!=='undefined'&&document.querySelector){css();icon();
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){fill()});else fill();}
})();
