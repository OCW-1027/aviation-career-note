/* ===== 図の作成ルール（2026.09 再整理。詳しくは 00_그림작성규칙.md） =====
   1. 図の中の文字は画面の上で 11px 以上（FIX2 が自動で保証）
   2. 文は必ず WR／LBW（折り返す）で書く。tx／LB（1行）は短い名札だけ（日韓 約12字・英 約22字まで）
   3. 日本語は1文字ごと、韓国語・英語は単語ごとに折り返す。句読点・括弧の禁則つき（SPLITU）
   4. 枠・凡例の高さは行数（LINES）から計算する。高さの固定は禁止
   5. スマートフォン（幅700px未満）では縦並び・一覧に変える。凡例を scale で拡大しない。縮められない断面図は SCR（横スクロール）
   6. 公開前に自動点検（3言語×スマホ350px・PC740px×アニメ6時点）：重なり0・はみ出し0・11px未満0
   ================================================================== */
/* 航空気象の基礎（Part 10）の図（2026.09）— figs.js の後に読み込み、window.FIGS に追加する
   ・どの図も lang（ja / ko / en）を受け取り、図の中の文字をその言語で書く（受け取れないときは日本語）
   ・小中高生でも分かるように、たとえ（ボール・風船・ふた）と色で見せる。動きは SVG のアニメーション（SMIL） */
(function(){
var D='#243447',B='#2F8FE0',T='#1F7A6E',O='#E08A2F',RD='#D64545',P='#6B4FA0',G='#6B7785';
function R(x,y,w,h,f,rx,ex){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+f+'"'+(ex||'')+'/>'}
function tx(x,y,s,sz,c,w,a){return '<text x="'+x+'" y="'+y+'" font-size="'+FS(sz).toFixed(1)+'" font-weight="'+(w||700)+'" fill="'+(c||D)+'" text-anchor="'+(a||'middle')+'" font-family="Arial,Helvetica,\'Noto Sans JP\',\'Noto Sans KR\',sans-serif">'+s+'</text>'}
var K=1; /* 文字の倍率（スマートフォンの縦並びのときに大きくする） */
/* 文字の最小の大きさ（2026.09 作成ルール）：図の中の文字は、画面の上で FLOORPX（11px）より小さくしない。
   図を一度描いて viewBox の幅と実際の表示幅から倍率を求め、FLOORU（viewBox の単位での最小の大きさ）を決めて描き直す（FIX2） */
var FLOORPX=11,FLOORU=0;
function FS(sz){return Math.max((sz||14)*K,FLOORU)}
function NARROW(){try{return (window.innerWidth||1024)<700}catch(e){return false}}
function TW(s,sz){var w=0;s=String(s);for(var i=0;i<s.length;i++){w+=s.charCodeAt(i)>255?1:0.56}return w*FS(sz)}
/* 幅に収まるように折り返して、複数行の文字にする（2026.09 改訂）
   ・日本語（かな・漢字）は1文字ごとに折り返せる。韓国語・英語は単語（空白）ごと
   ・「、。）」」などは行の先頭に来ないように、前の文字にくっつける（禁則）。「（「」は次の文字にくっつける
   ・1語が幅より長いときは、その語を文字ごとに分ける */
var KIN_END='、。，．）」』】〉》・ー々ゃゅょっぁぃぅぇぉャュョッァィゥェォ！？：；,.)!?:;%℃°’”…';
var KIN_BEG='（「『【〈《‘“(';
function SPLITU(s){var u=[],cur='',i,c,code;
 function flush(){if(cur){u.push(cur);cur=''}}
 for(i=0;i<s.length;i++){c=s.charAt(i);code=c.charCodeAt(0);
  if(c===' '){flush();u.push(' ');continue}
  var cjk=(code>=0x3000&&code<=0x30FF)||(code>=0x3400&&code<=0x9FFF)||(code>=0xFF00&&code<=0xFFEF)||code===0x2192||code===0x2014||code===0x2015||code===0x301C||code===0x2026;
  if(cjk){flush();u.push(c);continue}
  cur+=c}
 flush();
 /* 禁則：行頭に来てはいけない文字は前にくっつけ、行末に残ってはいけない文字は後ろにくっつける */
 var o=[];for(i=0;i<u.length;i++){var x=u[i];
  if(o.length&&x!==' '&&KIN_END.indexOf(x.charAt(0))>=0&&o[o.length-1]!==' '){o[o.length-1]+=x;continue}
  o.push(x)}
 var r=[];for(i=0;i<o.length;i++){if(r.length&&KIN_BEG.indexOf(r[r.length-1].slice(-1))>=0&&r[r.length-1]!==' '&&o[i]!==' '){r[r.length-1]+=o[i]}else r.push(o[i])}
 return r}
function LINES(s,sz,maxw){var units=SPLITU(String(s)),lines=[],cur='';
 units.forEach(function(p){
  if(TW(p,sz)>maxw){for(var j=0;j<p.length;j++){var ch=p.charAt(j);if(TW(cur+ch,sz)>maxw&&cur.trim()){lines.push(cur.trim());cur=ch}else cur+=ch}return}
  var cand=cur+p;if(TW(cand,sz)>maxw&&cur.trim()){lines.push(cur.trim());cur=(p===' '?'':p)}else cur=cand});
 if(cur.trim())lines.push(cur.trim());return lines}
function WR(x,y,s,sz,c,w,maxw,a){var lines=LINES(s,sz,maxw),lh=FS(sz)*1.3,y0=y-(lines.length-1)*lh/2;return lines.map(function(ln,i){return tx(x,y0+i*lh,ln,sz,c,w,a)}).join('')}
/* 白い下地つきの、折り返す文字（長い説明を図の中に置くとき） */
/* 図のいちばん上の題名：折り返したときは、FIX2 が題名より下の中身をその分だけ下にずらす（data-ttl） */
function TTL(x,y,s,sz,c,maxw){var L=LINES(s,sz,maxw),lh=FS(sz)*1.3,yb=Math.max(y,FS(sz)*1.0+8),dy=(L.length-1)*lh+(yb-y);
 return '<g data-ttl="'+L.length+'" data-dy="'+dy.toFixed(1)+'">'+L.map(function(ln,i){return tx(x,yb+i*lh,ln,sz,c,900)}).join('')+'</g>'}
function LBW(x,y,s,sz,c,a,bg,maxw){var lines=LINES(s,sz,maxw),lh=FS(sz)*1.3,w=0;lines.forEach(function(l){w=Math.max(w,TW(l,sz))});w+=14;var h=lines.length*lh+6,x0=a==='start'?x-7:(a==='end'?x-w+7:x-w/2),y0=y-(lines.length-1)*lh/2;
 return '<rect x="'+x0.toFixed(1)+'" y="'+(y0-lh*0.78-3).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="'+Math.min(12,h/2).toFixed(1)+'" fill="'+(bg||'#fff')+'" opacity=".94"/>'+lines.map(function(ln,i){return tx(x,y0+i*lh,ln,sz,c,900,a)}).join('')}
/* 飛行機のアイコン（2026.09 改訂）：機首は右（+x）。長さ約40
   plane(c) … 上から見た形（後退翼・エンジン2つ・後退した水平尾翼）。地図・平面の図に使う
   planeS(c) … 横から見た形（胴体・窓・翼・エンジン・垂直尾翼）。高さの断面・横からの図に使う */
var PLANE_ENG='M6.2 -9.3 C6.2 -10.4 5.4 -10.8 4.2 -10.8 L-2 -10.8 L-2 -7.8 L4.2 -7.8 C5.4 -7.8 6.2 -8.2 6.2 -9.3 Z M6.2 9.3 C6.2 10.4 5.4 10.8 4.2 10.8 L-2 10.8 L-2 7.8 L4.2 7.8 C5.4 7.8 6.2 8.2 6.2 9.3 Z';
var PLANE_TOP='M20 0 C18.5 -2 15 -3 11 -3 L-13 -3 L-18 -1.6 L-20 0 L-18 1.6 L-13 3 L11 3 C15 3 18.5 2 20 0 Z M7 -2.9 L-5 -18 L-9.5 -18 L-3 -2.9 Z M7 2.9 L-5 18 L-9.5 18 L-3 2.9 Z M-12.5 -2.7 L-18 -8.5 L-20.5 -8.5 L-17 -2.7 Z M-12.5 2.7 L-18 8.5 L-20.5 8.5 L-17 2.7 Z';
var PLANE_SIDE='M20 0.8 C19.6 -1.5 17 -3.2 12 -3.2 L-13 -3.2 L-19 -2.4 L-21 -1.2 L-20.8 -0.4 L-16 1.4 L-12 3.2 L12 3.2 C17 3.2 19.6 2.4 20 0.8 Z M-12.5 -3.1 L-17.5 -12.5 L-21 -12.5 L-19.6 -2.9 Z M-15.5 -1.1 L-21 -2.3 L-22.2 -1.8 L-17 -0.1 Z';
var PLANE_SWING='M5 2.6 L-3.5 5 L-7.5 5 L-2.5 2.6 Z';
var PLANE_SENG='M3.6 3.9 L1.2 2.6 L-0.4 2.6 L0.4 3.9 Z M7.2 5.3 C7.2 4 6.4 3.6 5 3.6 L0.8 3.8 L-1.6 4.7 L-1.6 5.9 L0.8 6.8 L5 7 C6.4 7 7.2 6.6 7.2 5.3 Z';
function plane(c){var st=' stroke="#1d2b3a" stroke-width="1.1" stroke-linejoin="round"';return '<path d="'+PLANE_ENG+'" fill="#DCE3EA"'+st+'/><path d="'+PLANE_TOP+'" fill="'+(c||'#fff')+'"'+st+'/>'}
function planeS(c){var st=' stroke="#1d2b3a" stroke-width="1.1" stroke-linejoin="round"',w='';for(var x=-10;x<=10.5;x+=2.3)w+='<circle cx="'+x.toFixed(1)+'" cy="-1" r="0.6" fill="#2F6FD6" opacity=".85"/>';
 return '<path d="'+PLANE_SIDE+'" fill="'+(c||'#fff')+'"'+st+'/>'+w+'<path d="M15.4 -1.9 L18.3 -1.2 L17.9 -0.3 L15 -0.7 Z" fill="#243447"/><path d="'+PLANE_SWING+'" fill="#C9D3DD"'+st+'/><path d="'+PLANE_SENG+'" fill="#DCE3EA"'+st+'/><ellipse cx="6.7" cy="5.3" rx="0.55" ry="1.35" fill="#243447"/>'}
function cloud(x,y,s,c){s=s||1;return '<g transform="translate('+x+' '+y+') scale('+s+')"><ellipse cx="0" cy="0" rx="26" ry="14" fill="'+(c||'#fff')+'"/><ellipse cx="-18" cy="4" rx="16" ry="10" fill="'+(c||'#fff')+'"/><ellipse cx="18" cy="4" rx="17" ry="10" fill="'+(c||'#fff')+'"/><ellipse cx="4" cy="-9" rx="15" ry="11" fill="'+(c||'#fff')+'"/></g>'}

/* 前線の記号を線に沿って描く。pts：[[x,y],…]、type：cold・warm・stat・occl、side：記号を出す向き（1か−1）、sp：記号の間隔 */
function FR(pts,type,side,sp,sw){sp=sp||34;sw=sw||4;side=side||1;
 var col={cold:'#2F6FD6',warm:'#D64545',stat:'#2F6FD6',occl:'#7B4FB0'}[type];
 var d='M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join(' L');
 var g='<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+sw+'" stroke-linejoin="round" stroke-linecap="round"/>';
 if(type==='stat')g+='<path d="'+d+'" fill="none" stroke="#D64545" stroke-width="'+sw+'" stroke-dasharray="'+sp/2+' '+sp/2+'" stroke-dashoffset="'+(-sp/4)+'"/>';
 var segs=[],tot=0;for(var i=1;i<pts.length;i++){var dx=pts[i][0]-pts[i-1][0],dy=pts[i][1]-pts[i-1][1],l=Math.sqrt(dx*dx+dy*dy);segs.push([pts[i-1],dx/l,dy/l,l]);tot+=l}
 var k=0;for(var s=sp/2;s<tot;s+=sp){var acc=0,sg=null;for(var j=0;j<segs.length;j++){if(acc+segs[j][3]>=s){sg=segs[j];break}acc+=segs[j][3]}if(!sg)break;
  var u=s-acc,px=sg[0][0]+sg[1]*u,py=sg[0][1]+sg[2]*u,tx_=sg[1],ty_=sg[2],nx=-ty_*side,ny=tx_*side,kind;
  if(type==='cold')kind='t';else if(type==='warm')kind='s';else kind=(k%2?'s':'t');
  var c=type==='occl'?col:(kind==='t'?'#2F6FD6':'#D64545'),sd=(type==='stat'&&kind==='s')?-1:1;
  if(kind==='t')g+='<path d="M'+(px-tx_*7).toFixed(1)+' '+(py-ty_*7).toFixed(1)+' L'+(px+nx*sd*10).toFixed(1)+' '+(py+ny*sd*10).toFixed(1)+' L'+(px+tx_*7).toFixed(1)+' '+(py+ty_*7).toFixed(1)+' Z" fill="'+c+'"/>';
  else{var q=[];for(var a=0;a<=8;a++){var th=Math.PI*a/8;q.push((px-tx_*7*Math.cos(th)+nx*sd*7*Math.sin(th)).toFixed(1)+' '+(py-ty_*7*Math.cos(th)+ny*sd*7*Math.sin(th)).toFixed(1))}g+='<path d="M'+q.join(' L')+' Z" fill="'+c+'"/>'}
  k++}
 return g}
/* スマートフォンで横に広い断面図は、少し大きく描いて横にスクロールさせる（nav.js が「横にスクロール」の案内を付ける） */
function SCR(svg,mw){return '<div class="figscroll" style="overflow-x:auto;-webkit-overflow-scrolling:touch"><div style="min-width:'+(mw||720)+'px">'+svg+'</div></div>'}
/* 白い下地つきの文字（線と重なっても読めるように） */
function LB(x,y,s,sz,c,a,bg){var w=TW(s,sz)+12,h=FS(sz)*1.45,x0=a==='start'?x-6:(a==='end'?x-w+6:x-w/2);return '<rect x="'+x0.toFixed(1)+'" y="'+(y-h*0.78).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="'+(h/2).toFixed(1)+'" fill="'+(bg||'#fff')+'" opacity=".92"/>'+tx(x,y,s,sz,c,900,a)}
function ARW(x1,y1,x2,y2,c,w){var dx=x2-x1,dy=y2-y1,l=Math.sqrt(dx*dx+dy*dy),ux=dx/l,uy=dy/l;return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+c+'" stroke-width="'+(w||4)+'" stroke-linecap="round" fill="none"/><path d="M'+(x2-ux*12-uy*7).toFixed(1)+' '+(y2-uy*12+ux*7).toFixed(1)+' L'+x2+' '+y2+' L'+(x2-ux*12+uy*7).toFixed(1)+' '+(y2-uy*12-ux*7).toFixed(1)+'" stroke="'+c+'" stroke-width="'+(w||4)+'" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'}
window.FIGS=window.FIGS||{};
var F={
/* 1 空の層：対流圏・成層圏・中間圏・熱圏。気温の線を描き、旅客機は対流圏の上のほうを飛ぶ */
met_layers:function(l){l=l||'ja';
 var T2={ja:1,ko:1,en:1}[l]?l:'ja';
 var W={ja:['熱圏','中間圏','成層圏','対流圏','対流圏界面','成層圏界面','中間圏界面','気温','高さ','雲・雨・雪 ― 天気はここで起きる','オゾン層が紫外線を吸って暖まる','流れ星が光る','オーロラ','旅客機（約10〜12km）','エベレスト（8.8km）','気温が下がる','気温が上がる','低い ← 気温 → 高い'],
  ko:['열권','중간권','성층권','대류권','대류권계면','성층권계면','중간권계면','기온','높이','구름·비·눈 — 날씨는 여기서 생긴다','오존층이 자외선을 흡수해 따뜻해진다','별똥별이 빛난다','오로라','여객기(약 10~12km)','에베레스트(8.8km)','기온이 내려간다','기온이 올라간다','낮음 ← 기온 → 높음'],
  en:['Thermosphere','Mesosphere','Stratosphere','Troposphere','Tropopause','Stratopause','Mesopause','Temperature','Height','Clouds, rain, snow: weather happens here','Ozone absorbs UV and warms the air','Shooting stars glow','Aurora','Airliners (about 10–12 km)','Everest (8.8 km)','Temperature falls','Temperature rises','Cold ← temperature → warm']}[T2];
 /* 高さ（km）→ y。対流圏を大きく見せる区切りの目盛り */
 function Y(h){if(h<=12)return 490-h*14.5;if(h<=50)return 316-(h-12)*3.6;if(h<=85)return 179-(h-50)*2.8;return 81-(h-85)*2.6}
 function X(tc){return 470+(tc+95)*3.1}
 var nar=NARROW();K=nar?1.15:1;
 var s='';
 s+='<defs><linearGradient id="mlT" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9FD3F7"/><stop offset="1" stop-color="#5FA8E6"/></linearGradient><linearGradient id="mlS" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#3F7CC4"/><stop offset="1" stop-color="#2B4F8F"/></linearGradient><linearGradient id="mlM" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#26396B"/><stop offset="1" stop-color="#1B2447"/></linearGradient><linearGradient id="mlH" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#171C35"/><stop offset="1" stop-color="#0E1022"/></linearGradient></defs>';
 /* 層の帯 */
 s+=R(70,Y(12),380,Y(0)-Y(12),'url(#mlT)')+R(70,Y(50),380,Y(12)-Y(50),'url(#mlS)')+R(70,Y(85),380,Y(50)-Y(85),'url(#mlM)')+R(70,Y(100),380,Y(85)-Y(100),'url(#mlH)');
 /* 境界の線と名前 */
 [[12,W[4],'#fff'],[50,W[5],'#fff'],[85,W[6],'#fff']].forEach(function(v){s+='<line x1="70" y1="'+Y(v[0])+'" x2="450" y2="'+Y(v[0])+'" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity=".8"/>'+tx(446,Y(v[0])-6,v[1],11,'#fff',700,'end')});
 s+=tx(86,Y(6)+6,W[3],20,'#0f3558',900,'start')+tx(86,Y(31)+6,W[2],20,'#fff',900,'start')+tx(86,Y(67)+6,W[1],20,'#fff',900,'start')+tx(86,Y(93)+6,W[0],18,'#fff',900,'start');
 /* 対流圏：雲・山・飛行機 */
 s+='<path d="M250 490 L300 '+Y(8.8)+' L318 '+(Y(8.8)+14)+' L335 '+(Y(8.8)+6)+' L380 490 Z" fill="#7C8A74"/><path d="M300 '+Y(8.8)+' L318 '+(Y(8.8)+14)+' L335 '+(Y(8.8)+6)+' L322 '+(Y(8.8)+32)+' L292 '+(Y(8.8)+26)+' Z" fill="#fff"/>';
 s+=tx(315,Y(8.8)-8,W[14],11,'#0f3558',700);
 s+=cloud(140,Y(2.5),1)+cloud(215,Y(4.2),.8)+'<g opacity=".95">'+cloud(400,Y(3),.7)+'</g>';
 s+=tx(260,Y(1)+2,W[9],12,'#0f3558',800);
 s+='<g>'+planeS('#fff')+'<animateMotion dur="9s" repeatCount="indefinite" path="M90 '+Y(10.6)+' L430 '+Y(10.6)+'"/></g>'+tx(86,Y(9.3),W[13],11,'#0f3558',800,'start');
 /* 成層圏：オゾン */
 s+='<g opacity=".9"><circle cx="330" cy="'+Y(25)+'" r="16" fill="#8FD0B5"/>'+tx(330,Y(25)+5,'O₃',13,'#0f3558',900)+'<animate attributeName="opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite"/></g>'+tx(250,Y(25)+26,W[10],11,'#fff',700);
 /* 中間圏：流れ星 */
 s+='<g><line x1="0" y1="0" x2="-40" y2="-18" stroke="#FFE08A" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="0" r="3" fill="#fff"/><animateMotion dur="4s" repeatCount="indefinite" path="M300 '+Y(60)+' L400 '+Y(72)+'"/><animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite"/></g>'+tx(250,Y(78),W[11],11,'#fff',700);
 /* 熱圏：オーロラ */
 s+='<path d="M200 '+(Y(92)+8)+' q30 -16 60 0 t60 0 t60 0" stroke="#7CF2B0" stroke-width="5" fill="none" opacity=".8"><animate attributeName="opacity" values=".3;.9;.3" dur="3.5s" repeatCount="indefinite"/></path>'+tx(290,Y(95),W[12],11,'#7CF2B0',800);
 /* 高さの目盛り */
 [0,5,10,12,20,30,40,50,60,70,80,90,100].forEach(function(h){s+='<line x1="64" y1="'+Y(h)+'" x2="70" y2="'+Y(h)+'" stroke="'+G+'"/>'+tx(58,Y(h)+4,h,10,G,700,'end')});
 s+=tx(30,30,W[8]+' (km)',12,G,800,'start');
 /* 気温の図 */
 var sL=s;s='';
 s+=R(470,Y(100),410,Y(0)-Y(100),'#fff',8,' stroke="#D9E3EC"');
 [-80,-60,-40,-20,0,20].forEach(function(c){s+='<line x1="'+X(c)+'" y1="'+Y(100)+'" x2="'+X(c)+'" y2="'+Y(0)+'" stroke="#EEF2F6"/>'+tx(X(c),Y(0)+16,c+'℃',10,G,700)});
 [12,50,85].forEach(function(h){s+='<line x1="470" y1="'+Y(h)+'" x2="880" y2="'+Y(h)+'" stroke="#C9D6E3" stroke-dasharray="4 4"/>'});
 [[5,W[3]],[30,W[2]],[67,W[1]],[93,W[0]]].forEach(function(v){s+=tx(478,Y(v[0])+4,v[1],11,'#9AA7B4',800,'start')});
 var pts=[[0,15],[11,-56.5],[20,-56.5],[32,-44.5],[47,-2.5],[51,-2.5],[71,-58.5],[85,-86],[100,-55]];
 var d='M'+pts.map(function(p){return X(p[1]).toFixed(1)+' '+Y(p[0]).toFixed(1)}).join(' L');
 s+='<path d="'+d+'" fill="none" stroke="'+RD+'" stroke-width="4" stroke-linejoin="round" stroke-dasharray="1400" stroke-dashoffset="1400"><animate attributeName="stroke-dashoffset" values="1400;0;0" keyTimes="0;.6;1" dur="8s" repeatCount="indefinite"/></path>';
 s+=tx(X(-8),Y(6),'↘ '+W[15],12,RD,800,'start')+tx(X(-12),Y(30),'↗ '+W[16],12,RD,800,'start')+tx(X(-18),Y(62),'↘ '+W[15],12,RD,800,'start')+tx(X(-50),Y(93),'↗ '+W[16],12,RD,800,'start');
 s+=tx(675,Y(0)+34,W[17],12,G,800);
 s+=tx(X(15)+4,Y(0)-6,'15℃',11,RD,800,'start')+tx(X(-56.5)+6,Y(11)-6,'−56.5℃',11,RD,800,'start');
 K=1;
 if(nar)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 1075" role="img">'+R(0,0,460,1075,'#F7FAFD')+'<g transform="translate(-14 0)">'+sL+'</g><g transform="translate(-450 520)">'+s+'</g></svg>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 540" role="img">'+R(0,0,900,540,'#F7FAFD')+sL+s+'</svg>'},

/* 2 ボールで見る「安定」：谷のボール（戻る）・山のボール（転がり落ちる）・平らな所のボール（止まった所にいる） */
met_ball:function(l){
 var W=({ja:['安定','不安定','中立','少し押しても、元の場所に戻る','少し押すと、どんどん離れていく','押した先で、そのまま止まる','大気では：空気が上がっても元の高さに戻る → 雲は横に広がる','大気では：空気が上がり続ける → 雲が縦に伸びる（積乱雲）'],
  ko:['안정','불안정','중립','조금 밀어도 원래 자리로 돌아온다','조금 밀면 점점 멀어진다','민 곳에서 그대로 멈춘다','대기에서는: 공기가 올라가도 원래 높이로 돌아온다 → 구름이 옆으로 퍼진다','대기에서는: 공기가 계속 올라간다 → 구름이 위로 솟는다(적란운)'],
  en:['Stable','Unstable','Neutral','Push it and it rolls back','Push it and it keeps going','Push it and it stays where it stops','In the air: a lifted parcel sinks back → clouds spread sideways','In the air: a lifted parcel keeps rising → clouds tower up (Cb)']})[l];
 if(!W)return F.met_ball('ja');
 var nar=NARROW();K=nar?1.25:1;
 function arrow(x,y){return '<g><path d="M'+(x-34)+' '+y+' l22 0" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/><path d="M'+(x-14)+' '+(y-6)+' l8 6 l-8 6" fill="none" stroke="'+D+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><animate attributeName="opacity" values="0;1;0;0" keyTimes="0;.12;.25;1" dur="4s" repeatCount="indefinite"/></g>'}
 function ball(kp,kt,ks,path){return '<circle r="16" fill="'+O+'" stroke="#7a3e0a" stroke-width="2"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="'+kp+'" keyTimes="'+kt+'" calcMode="spline" keySplines="'+ks+'" path="'+path+'"/></circle>'}
 function panel(ox,oy,i){var col=[T,RD,B][i],g='<g transform="translate('+ox+' '+oy+')">'+R(0,0,270,250,'#fff',16,' stroke="'+col+'" stroke-width="3"')+tx(135,36,W[i],24,col,900);
  if(i===0)g+='<path d="M20 90 Q135 230 250 90" fill="none" stroke="'+T+'" stroke-width="6" stroke-linecap="round"/>'+ball('0.5;0.3;0.62;0.42;0.54;0.48;0.5;0.5','0;.15;.3;.45;.6;.75;.9;1','.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1','M20 74 Q135 214 250 74')+arrow(76,130);
  if(i===1)g+='<path d="M20 194 Q135 40 250 194" fill="none" stroke="'+RD+'" stroke-width="6" stroke-linecap="round"/>'+ball('0.5;0.5;0.56;1;1','0;.2;.35;.8;1','0 0 1 1;.5 0 .9 .6;.4 0 1 1;0 0 1 1','M20 178 Q135 24 250 178')+arrow(85,98);
  if(i===2)g+='<line x1="20" y1="170" x2="250" y2="170" stroke="'+B+'" stroke-width="6" stroke-linecap="round"/>'+ball('0.3;0.3;0.62;0.62','0;.2;.55;1','0 0 1 1;.2 .6 .4 1;0 0 1 1','M20 154 L250 154')+arrow(70,130);
  return g+WR(135,226,W[3+i],13,D,700,250)+'</g>'}
 function box(ox,oy,w,h,s,col,bg){var p=s.split(/：|: /),g=R(ox,oy,w,h,bg,12)+tx(ox+w/2,oy+22,p[0],12,col,900);return g+WR(ox+w/2,oy+(h+22)/2+8,p.slice(1).join(': '),13,D,700,w-24)}
 var s;
 if(nar){s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 1040" role="img">'+R(0,0,310,1040,'#F7FAFD')+panel(20,10,0)+panel(20,275,1)+panel(20,540,2)+box(20,806,270,106,W[6],T,'#E8F5F2')+box(20,922,270,106,W[7],RD,'#FCEBEB')}
 else{s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380" role="img">'+R(0,0,900,380,'#F7FAFD')+panel(20,20,0)+panel(315,20,1)+panel(610,20,2)+box(20,290,418,72,W[6],T,'#E8F5F2')+box(462,290,418,72,W[7],RD,'#FCEBEB')}
 K=1;return s+'</svg>'},

/* 3 空気の風船の実験：持ち上げた空気は 1 km ごとに 約10℃ 冷える。周りより冷たければ戻り、暖かければ上がり続けて雲になる */
met_parcel:function(l){
 var W=({ja:['安定な日','不安定な日','風船（空気）','周りの空気','周りより冷たい → 重い → 元の高さに戻る','周りより暖かい → 軽い → 上がり続けて雲ができる','持ち上げた空気は 1 km 上がるごとに 約10℃ 冷える（乾燥断熱減率）','周りの気温：1 kmで 4℃ 下がる','周りの気温：1 kmで 12℃ 下がる'],
  ko:['안정한 날','불안정한 날','풍선(공기)','주변 공기','주변보다 차갑다 → 무겁다 → 원래 높이로 돌아온다','주변보다 따뜻하다 → 가볍다 → 계속 올라가 구름이 생긴다','들어 올린 공기는 1km 올라갈 때마다 약 10℃ 식는다(건조단열감률)','주변 기온: 1km에 4℃ 내려감','주변 기온: 1km에 12℃ 내려감'],
  en:['A stable day','An unstable day','Balloon (air)','Surrounding air','Colder than its surroundings → heavier → sinks back','Warmer than its surroundings → lighter → keeps rising and forms cloud','Lifted air cools about 10 °C for every km it rises (dry adiabatic lapse rate)','Surroundings: 4 °C colder per km','Surroundings: 12 °C colder per km']})[l]||null;
 if(!W)return F.met_parcel('ja');
 var nar=NARROW();K=nar?1.2:1;
 var s='';
 function side(x0,title,col,env,up,sub,msg){
  var g=R(x0,60,420,428,'#fff',16,' stroke="'+col+'" stroke-width="3"')+tx(x0+210,90,title,20,col,900)+tx(x0+210,112,sub,12,G,800);
  var ys=[396,296,196],bt=[20,10,0];
  g+=tx(x0+246,136,W[2],11,'#8a3b00',900)+tx(x0+353,136,W[3],11,G,900);
  ys.forEach(function(y,i){
   g+='<line x1="'+(x0+20)+'" y1="'+y+'" x2="'+(x0+400)+'" y2="'+y+'" stroke="#E3E9EF" stroke-dasharray="5 5"/>'+tx(x0+26,y-6,i+' km',11,G,800,'start');
   var warm=bt[i]>env[i], cold=bt[i]<env[i];
   g+=R(x0+206,y-34,80,26,warm?'#FDE0C8':(cold?'#DCEBFA':'#EEF3F8'),13)+tx(x0+246,y-16,String(bt[i]).replace('-','−')+'℃',14,warm?'#8a3b00':(cold?'#1d4d8a':D),900);
   g+=tx(x0+302,y-16,warm?'&gt;':(cold?'&lt;':'='),16,D,900);
   g+=R(x0+318,y-34,70,26,'#EEF3F8',13)+tx(x0+353,y-16,String(env[i]).replace('-','−')+'℃',14,D,800)});
  g+=R(x0+20,402,380,14,'#9CC98B',4);
  /* 風船 */
  var top=up?196:296, kp=up?'0;1;1':'0;1;0';
  g+='<g><ellipse cx="0" cy="-20" rx="20" ry="24" fill="'+(up?'#F5A15B':'#8FB8E8')+'" stroke="#34495e" stroke-width="2"/><path d="M0 4 l-4 7 h8 z" fill="#34495e"/><line x1="0" y1="11" x2="0" y2="24" stroke="#34495e" stroke-width="1.5"/>'+
   '<animateMotion dur="8s" repeatCount="indefinite" keyPoints="'+kp+'" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1" path="M'+(x0+110)+' 384 L'+(x0+110)+' '+(top-12)+'"/></g>';
  if(up){g+='<g opacity="0"><g transform="translate('+(x0+110)+' 196)"><ellipse cx="0" cy="-10" rx="44" ry="26" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/><ellipse cx="-30" cy="6" rx="26" ry="16" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/><ellipse cx="30" cy="6" rx="26" ry="16" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/><ellipse cx="0" cy="-34" rx="26" ry="20" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/></g><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.45;.55;.92;1" dur="8s" repeatCount="indefinite"/></g>'}
  else{g+='<g opacity="0"><path d="M'+(x0+140)+' 280 v40" stroke="#1d4d8a" stroke-width="4" stroke-linecap="round"/><path d="M'+(x0+132)+' 312 l8 10 l8 -10" fill="none" stroke="#1d4d8a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.45;.5;.8;1" dur="8s" repeatCount="indefinite"/></g>'}
  g+=R(x0+20,428,380,52,up?'#FDE7D3':'#DCEBFA',12)+WR(x0+210,458,msg,12.5,up?'#8a3b00':'#1d4d8a',900,360);
  return g}
 var A=side(0,W[0],B,[20,16,12],false,W[7],W[4]),Bs=side(0,W[1],O,[20,8,-4],true,W[8],W[5]);
 if(nar){s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 935" role="img">'+R(0,0,460,935,'#F7FAFD')+R(20,6,420,50,'#FFF6E5',10)+WR(230,33,W[6],14,'#8a5a00',800,400)+'<g transform="translate(20 0)">'+A+'</g><g transform="translate(20 445)">'+Bs+'</g>'}
 else{s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" role="img">'+R(0,0,900,500,'#F7FAFD')+R(20,12,860,36,'#FFF6E5',10)+tx(450,36,W[6],14,'#8a5a00',800)+'<g transform="translate(20 0)">'+A+'</g><g transform="translate(460 0)">'+Bs+'</g>'}
 K=1;return s+'</svg>'},

/* 4 逆転層は「暖かいふた」：煙が上がれず横に広がり、下に霧やもやがたまる */
met_inversion:function(l){
 var W=({ja:['逆転層（暖かいふた）','ふたの下：煙・霧・もやがたまる','ふたの上：空気が澄んでいる','気温','高さ','ふつうは上ほど寒い','逆転層では上ほど暖かい','ふたの上と下で風が急に変わる（ウインドシア）'],
  ko:['역전층(따뜻한 뚜껑)','뚜껑 아래: 연기·안개·박무가 고인다','뚜껑 위: 공기가 맑다','기온','높이','보통은 위로 갈수록 춥다','역전층에서는 위로 갈수록 따뜻하다','뚜껑 위아래에서 바람이 갑자기 바뀐다(윈드시어)'],
  en:['Inversion (a warm lid)','Under the lid: smoke, fog and haze are trapped','Above the lid: clear air','Temperature','Height','Normally colder higher up','In an inversion, warmer higher up','Wind changes suddenly above and below the lid (wind shear)']})[l]||['逆転層（暖かいふた）','ふたの下：煙・霧・もやがたまる','ふたの上：空気が澄んでいる','気温','高さ','ふつうは上ほど寒い','逆転層では上ほど暖かい','ふたの上と下で風が急に変わる（ウインドシア）'];
 var nar=NARROW();K=nar?1.3:1;
 var s='';
 s+='<defs><linearGradient id="miL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD9A8" stop-opacity=".2"/><stop offset=".5" stop-color="#FFB870" stop-opacity=".75"/><stop offset="1" stop-color="#FFD9A8" stop-opacity=".2"/></linearGradient></defs>';
 /* 空 */
 s+=R(20,20,560,400,'#DCEEFB',14)+R(20,20,560,120,'#CBE6FA',14);
 /* ふた */
 s+=R(20,150,560,60,'url(#miL)')+tx(300,186,W[0],18,'#8a3b00',900);
 s+=tx(300,70,W[2],14,'#1d4d8a',800);
 /* 町と煙突 */
 s+=R(20,360,560,60,'#9CC98B',0)+R(60,300,60,60,'#C7CFD8')+R(140,320,50,40,'#B4BEC9')+R(420,310,70,50,'#C7CFD8')+R(505,330,50,30,'#B4BEC9');
 s+=R(250,250,26,110,'#8C96A1')+R(246,244,34,10,'#6B7785');
 /* 煙：上がって、ふたで横に広がる */
 for(var i=0;i<6;i++){var dl=(i*1.1).toFixed(1);
  s+='<circle r="12" fill="#9AA3AD" opacity="0"><animateMotion dur="6.6s" begin="-'+dl+'s" repeatCount="indefinite" path="M263 240 L263 222 L263 212 Q263 205 '+(i%2?330:196)+' 210 L'+(i%2?520:60)+' 214"/><animate attributeName="opacity" values="0;.8;.8;.5;0" keyTimes="0;.1;.4;.8;1" dur="6.6s" begin="'+dl+'s" repeatCount="indefinite"/><animate attributeName="r" values="8;14;20;26" dur="6.6s" begin="'+dl+'s" repeatCount="indefinite"/></circle>'}
 /* 霧 */
 s+='<g opacity=".55"><rect x="20" y="300" width="560" height="60" fill="#fff"><animate attributeName="opacity" values=".3;.8;.3" dur="5s" repeatCount="indefinite"/></rect></g>';
 s+=tx(300,290,W[1],13,'#34495e',800);
 /* 風の矢印（ふたの上と下で違う） */
 s+='<g stroke="'+P+'" stroke-width="4" stroke-linecap="round" fill="none"><path d="M60 120 h120"/><path d="M168 112 l12 8 l-12 8"/><path d="M60 240 h40"/><path d="M92 232 l8 8 l-8 8"/></g>'+tx(70,106,'40 kt',12,P,800,'start')+tx(110,244,'5 kt',12,P,800,'start');
 s+=WR(330,138,W[7],12,P,800,480);
 /* 気温の図 */
 var sS=s;s='';K=nar?1.1:1;
 s+=R(610,20,270,416,'#fff',14,' stroke="#D9E3EC"')+tx(745,44,W[3]+' × '+W[4],13,G,800);
 s+='<line x1="650" y1="380" x2="860" y2="380" stroke="'+G+'"/><line x1="650" y1="380" x2="650" y2="70" stroke="'+G+'"/>';
 s+='<path d="M770 380 L722 252 L800 188 L752 70" fill="none" stroke="'+RD+'" stroke-width="4" stroke-linejoin="round" stroke-dasharray="500" stroke-dashoffset="500"><animate attributeName="stroke-dashoffset" values="500;0;0" keyTimes="0;.6;1" dur="6s" repeatCount="indefinite"/></path>';
 s+=R(652,188,206,64,'#FFB870',0,' opacity=".25"');
 s+=tx(745,428,'↖ '+W[5],11,RD,800)+tx(826,226,'↗',18,RD,900)+tx(862,392,W[3]+' →',11,G,800,'end')+tx(660,92,'↑ '+W[4],11,G,800,'start');
 s+=tx(745,410,'↗ '+W[6],12,'#8a3b00',800);
 K=1;
 if(nar)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" role="img">'+R(0,0,600,900,'#F7FAFD')+'<g transform="translate(0 0)">'+sS+'</g><g transform="translate(-445 448)">'+s+'</g></svg>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 446" role="img">'+R(0,0,900,446,'#F7FAFD')+sS+s+'</svg>'},
/* 5 日本・韓国の周りの気団：季節ごとにやってくる5つの気団 */
met_airmass:function(l){
 var W=({ja:{ttl:'日本・韓国の周りの気団',kr:'韓国',jp:'日本',sea:'海',land:'大陸',
   m:[['シベリア気団','cPk','冬','冷たい・乾いている'],['オホーツク海気団','mPk','梅雨〜初夏','冷たい・湿っている'],['小笠原気団','mTw','夏','暑い・湿っている'],['揚子江気団','cT','春・秋','暖かい・乾いている'],['赤道気団','mE','台風の季節','とても暑く湿っている']],
   lg:'記号の読み方',l1:['c','大陸の上で育つ → 乾いている'],l2:['m','海の上で育つ → 湿っている'],l3:['P・T・E','P：寒い地方／T：暑い地方／E：赤道'],l4:['k・w','k：下の地面より冷たい／w：下の地面より暖かい']},
  ko:{ttl:'한국·일본 주변의 기단',kr:'한국',jp:'일본',sea:'바다',land:'대륙',
   m:[['시베리아 기단','cPk','겨울','차갑고 건조하다'],['오호츠크해 기단','mPk','늦봄~초여름','차갑고 습하다'],['북태평양 기단','mTw','여름','덥고 습하다'],['양쯔강 기단','cT','봄·가을','따뜻하고 건조하다'],['적도 기단','mE','태풍철','매우 덥고 습하다']],
   lg:'기호 읽는 법',l1:['c','대륙 위에서 생김 → 건조하다'],l2:['m','바다 위에서 생김 → 습하다'],l3:['P·T·E','P: 추운 지방 / T: 더운 지방 / E: 적도'],l4:['k·w','k: 아래 지면보다 차갑다 / w: 아래 지면보다 따뜻하다']},
  en:{ttl:'Air masses around Korea and Japan',kr:'Korea',jp:'Japan',sea:'Ocean',land:'Continent',
   m:[['Siberian','cPk','Winter','Cold and dry'],['Okhotsk Sea','mPk','Early summer','Cold and moist'],['Ogasawara (N. Pacific)','mTw','Summer','Hot and moist'],['Yangtze','cT','Spring, autumn','Warm and dry'],['Equatorial','mE','Typhoon season','Very hot, moist']],
   lg:'Reading the codes',l1:['c','Formed over land → dry'],l2:['m','Formed over sea → moist'],l3:['P · T · E','P: polar / T: tropical / E: equatorial'],l4:['k · w','k: colder than the ground below / w: warmer than the ground below']}})[l];
 if(!W)return F.met_airmass('ja');
 var nar=NARROW();K=nar?1.25:1;
 var s='<defs><radialGradient id="amg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>';
 s+=R(10,10,560,500,'#CFE8F7',16);
 s+='<path d="M10 10 H430 V40 Q360 70 330 120 L306 146 L302 168 L270 176 Q250 200 236 230 L190 300 Q130 350 10 360 Z" fill="#EADFC6"/>';
 s+=tx(90,200,W.land,16,'#9C8A62',900)+tx(520,262,W.sea,16,'#7FA6C4',900);
 s+='<path d="M268 146 L300 150 L298 214 L288 250 L272 258 L262 232 L256 200 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="2"/>'+tx(250,282,W.kr,13,'#2F5E24',900);
 s+='<path d="M300 300 Q340 288 362 258 Q392 218 402 178 Q412 146 432 124 L442 132 Q428 156 420 184 Q408 228 378 266 Q352 296 312 310 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="2"/>'+tx(392,300,W.jp,13,'#2F5E24',900);
 var C=[[118,112,'#5E8FD9'],[466,112,'#86C5E8'],[474,408,'#F08A5D'],[118,408,'#E8C35A'],[300,436,'#E86A6A']],cx=320,cy=225;
 W.m.forEach(function(m,i){var x=C[i][0],y=C[i][1],c=C[i][2],dx=cx-x,dy=cy-y,dl=Math.sqrt(dx*dx+dy*dy),ux=dx/dl,uy=dy/dl,r=i===4?60:66;
  var ax1=x+ux*(r+6),ay1=y+uy*(r+6),ax2=x+ux*(r+46),ay2=y+uy*(r+46);
  s+='<g>'+ARW(ax1.toFixed(0),ay1.toFixed(0),ax2.toFixed(0),ay2.toFixed(0),c,6)+'<animate attributeName="opacity" values=".25;1;.25" dur="3s" begin="'+(i*0.6)+'s" repeatCount="indefinite"/></g>';
  var mw=(i===4?110:120),L1=LINES(m[0],12,mw),L2=nar?[m[1]]:LINES(m[1]+' · '+m[2],11,mw),L3=nar?LINES(m[2],11,mw):LINES(m[3],11,mw),lh=FS(11.5)*1.25,nl=L1.length+L2.length+L3.length,th=nl*lh,rr=Math.max(r,th/2+18,mw/2+10);
  s+='<circle cx="'+x+'" cy="'+y+'" r="'+rr.toFixed(0)+'" fill="'+c+'" opacity=".92"/><circle cx="'+(x-rr*.3)+'" cy="'+(y-rr*.35)+'" r="'+rr*.55+'" fill="url(#amg)"/>';
  var yy=y-th/2+lh*0.8;L1.forEach(function(v){s+=tx(x,yy,v,12,'#fff',900);yy+=lh});L2.forEach(function(v){s+=tx(x,yy,v,11,'#fff',900);yy+=lh});L3.forEach(function(v){s+=tx(x,yy,v,11,'#fff',700);yy+=lh})});
 s+=TTL(290,36,W.ttl,15,'#0f3558',540);
 var sm=s;K=1;
 function LG(x0,y0,w){var rows=[W.l1,W.l2,W.l3,W.l4],cols=['#F4EEDC','#E3F1FB','#FDE9DE','#EAF4EA'],lh=FS(12)*1.3,y=y0+58,g='';
  rows.forEach(function(v,i){var n=LINES(v[1],12,w-48).length,h=50+n*lh+8;g+=R(x0+14,y,w-28,h,cols[i],12)+tx(x0+w/2,y+32,v[0],20,D,900)+WR(x0+w/2,y+50+n*lh/2+FS(12)*0.3,v[1],12,D,700,w-48);y+=h+10});
  var H=y-y0;return {s:R(x0,y0,w,H,'#fff',16,' stroke="#D9E3EC"')+tx(x0+w/2,y0+36,W.lg,16,D,900)+g,h:H}}
 if(nar){var lg=LG(20,524,540),HH=524+lg.h+16;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 '+HH.toFixed(0)+'" role="img">'+R(0,0,580,HH,'#F7FAFD')+sm+lg.s+'</svg>'}
 var lg2=LG(590,10,300),H2=Math.max(520,lg2.h+20);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 '+H2.toFixed(0)+'" role="img">'+R(0,0,900,H2,'#F7FAFD')+sm+lg2.s+'</svg>'},

/* 6 寒冷前線と温暖前線の断面：冷たい空気がもぐり込む急な前線と、暖かい空気がはい上がるゆるい前線 */
met_fronts:function(l){
 var W=({ja:{c:'寒冷前線',w:'温暖前線',cold:'冷たい空気',warm:'暖かい空気',go:'進む向き',
   c1:'冷たい空気が暖かい空気の下にもぐり込む',c2:'急な坂（約1/50〜1/100）',c3:'積乱雲・強いにわか雨・雷・突風',c4:'悪天の幅はせまい（数十km）',
   w1:'暖かい空気が冷たい空気の上をはい上がる',w2:'ゆるい坂（約1/100〜1/300）',w3:'層状の雲：巻雲→巻層雲→高層雲→乱層雲',w4:'しとしと雨・低い雲が広い範囲（数百km）',rain:'雨'},
  ko:{c:'한랭전선',w:'온난전선',cold:'찬 공기',warm:'따뜻한 공기',go:'나아가는 방향',
   c1:'찬 공기가 따뜻한 공기 아래로 파고든다',c2:'가파른 경사(약 1/50~1/100)',c3:'적란운·강한 소나기·뇌우·돌풍',c4:'악천후 폭은 좁다(수십 km)',
   w1:'따뜻한 공기가 찬 공기 위를 타고 오른다',w2:'완만한 경사(약 1/100~1/300)',w3:'층상 구름: 권운→권층운→고층운→난층운',w4:'부슬비·낮은 구름이 넓은 범위(수백 km)',rain:'비'},
  en:{c:'Cold front',w:'Warm front',cold:'Cold air',warm:'Warm air',go:'Direction of travel',
   c1:'Cold air pushes in under the warm air',c2:'Steep slope (about 1/50–1/100)',c3:'Cumulonimbus, heavy showers, thunder, gusts',c4:'A narrow band of bad weather (tens of km)',
   w1:'Warm air slides up over the cold air',w2:'Gentle slope (about 1/100–1/300)',w3:'Layer cloud: Ci → Cs → As → Ns',w4:'Steady rain and low cloud over a wide area (hundreds of km)',rain:'Rain'}})[l];
 if(!W)return F.met_fronts('ja');
 var nar=NARROW();K=nar?1.2:1;
 function cb(x,y,s){return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-40 60 Q-46 20 -26 8 Q-30 -30 0 -36 Q6 -70 30 -60 Q44 -86 64 -70 L90 -78 L70 -64 Q86 -40 70 -20 Q86 10 60 30 Q66 56 40 60 Z" fill="#DCE3EA" stroke="#8C9BAA" stroke-width="2"/></g>'}
 function panelC(){var g=R(0,0,430,478,'#fff',16,' stroke="#2F6FD6" stroke-width="3"')+tx(215,34,W.c,22,'#2F6FD6',900);
  g+=R(12,50,406,300,'#FFF1E3',10);
  g+='<g><path d="M12 350 L12 176 Q120 190 186 262 Q206 300 218 350 Z" fill="#9CC4F0"/><animateTransform attributeName="transform" type="translate" values="0 0;46 0;46 0" keyTimes="0;.8;1" dur="7s" repeatCount="indefinite"/></g>';
  g+=tx(80,300,W.cold,14,'#1d4d8a',900)+tx(352,262,W.warm,14,'#8a3b00',900);
  g+='<g>'+cb(236,176,1.05)+'<animate attributeName="opacity" values=".6;1;.6" dur="3s" repeatCount="indefinite"/></g>';
  g+='<g stroke="#5E8FD9" stroke-width="2.5" stroke-linecap="round">';for(var i=0;i<6;i++)g+='<line x1="'+(222+i*12)+'" y1="246" x2="'+(216+i*12)+'" y2="262"><animate attributeName="y1" values="246;300" dur=".9s" begin="'+(i*.15)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="262;316" dur=".9s" begin="'+(i*.15)+'s" repeatCount="indefinite"/></line>';g+='</g>';
  g+='<g>'+ARW(248,320,300,180,'#E08A2F',4)+'<animate attributeName="opacity" values=".2;1;.2" dur="2.4s" repeatCount="indefinite"/></g>';
  g+=ARW(40,340,120,340,'#2F6FD6',5)+tx(130,345,W.go,12,'#2F6FD6',800,'start');
  g+=R(12,350,406,6,'#9CC98B');
  g+=WR(215,380,W.c1,12.5,D,800,396)+WR(215,405,W.c2,11.5,G,700,396)+WR(215,428,W.c4,11.5,G,700,396)+WR(215,455,W.c3,12,RD,800,396);
  return g}
 function panelW(){var g=R(0,0,430,478,'#fff',16,' stroke="#D64545" stroke-width="3"')+tx(215,34,W.w,22,'#D64545',900);
  g+=R(12,50,406,300,'#FFF1E3',10);
  g+='<path d="M418 350 L418 238 Q260 290 12 342 L12 350 Z" fill="#9CC4F0"/>';
  g+=tx(360,322,W.cold,14,'#1d4d8a',900)+tx(80,150,W.warm,14,'#8a3b00',900);
  var cl=[[372,82,'Ci',.55],[312,110,'Cs',.7],[236,150,'As',.9],[140,212,'Ns',1.15]];
  cl.forEach(function(c,i){g+='<g opacity="0"><g transform="translate('+c[0]+' '+c[1]+') scale('+c[3]+')"><ellipse cx="0" cy="0" rx="46" ry="'+(i<2?7:14)+'" fill="'+(i<2?'#EDF2F7':'#D5DDE5')+'" stroke="#9FB0C2" stroke-width="1.5"/></g>'+tx(c[0],c[1]+5,c[2],12,'#40566B',900)+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+(0.1+i*0.15).toFixed(2)+';'+(0.18+i*0.15).toFixed(2)+';.92;1" dur="8s" repeatCount="indefinite"/></g>'});
  g+='<g stroke="#5E8FD9" stroke-width="2" stroke-linecap="round" opacity=".85">';for(var i=0;i<10;i++)g+='<line x1="'+(70+i*16)+'" y1="238" x2="'+(66+i*16)+'" y2="252"><animate attributeName="y1" values="238;320" dur="1.6s" begin="'+(i*.16)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="252;334" dur="1.6s" begin="'+(i*.16)+'s" repeatCount="indefinite"/></line>';g+='</g>';
  g+='<g><circle r="7" fill="#E08A2F"/><animateMotion dur="4s" repeatCount="indefinite" path="M40 330 Q200 300 400 250"/></g><g><circle r="7" fill="#E08A2F"/><animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path="M40 330 Q200 300 400 250"/></g>';
  g+=ARW(40,62,120,62,'#D64545',5)+tx(130,67,W.go,12,'#D64545',800,'start');
  g+=R(12,350,406,6,'#9CC98B');
  g+=WR(215,380,W.w1,12.5,D,800,396)+WR(215,405,W.w2,11.5,G,700,396)+WR(215,428,W.w3,11.5,G,700,396)+WR(215,458,W.w4,12,'#1d4d8a',800,396);
  return g}
 var a=panelC(),b=panelW(),s;K=1;
 if(nar)s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 1000" role="img">'+R(0,0,460,1000,'#F7FAFD')+'<g transform="translate(15 10)">'+a+'</g><g transform="translate(15 508)">'+b+'</g>';
 else s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 498" role="img">'+R(0,0,900,498,'#F7FAFD')+'<g transform="translate(15 10)">'+a+'</g><g transform="translate(455 10)">'+b+'</g>';
 return s+'</svg>'},

/* 7 天気図の前線と低気圧：前線の記号4種類と、低気圧の周りの天気 */
met_front_map:function(l){
 var W=({ja:{t:'天気図の低気圧と前線',L:'低',sec:'暖域（暖かい区域）',sh:'にわか雨・雷',rn:'広い範囲の雨',cold:'寒冷前線',warm:'温暖前線',stat:'停滞前線',occl:'閉塞前線',lg:'前線の記号',
   d:['記号の向きが前線の進む方向','赤い半円が進む方向','ほとんど動かない（梅雨前線など）','寒冷前線が温暖前線に追いついた'],nw:'北西の風に変わる',sw:'南寄りの風'},
  ko:{t:'일기도의 저기압과 전선',L:'저',sec:'난역(따뜻한 구역)',sh:'소나기·뇌우',rn:'넓은 범위의 비',cold:'한랭전선',warm:'온난전선',stat:'정체전선',occl:'폐색전선',lg:'전선 기호',
   d:['기호가 향한 쪽이 전선이 나아가는 방향','빨간 반원이 나아가는 방향','거의 움직이지 않는다(장마전선 등)','한랭전선이 온난전선을 따라잡았다'],nw:'북서풍으로 바뀐다',sw:'남쪽 바람'},
  en:{t:'A low and its fronts on a weather chart',L:'L',sec:'Warm sector',sh:'Showers, thunder',rn:'Widespread rain',cold:'Cold front',warm:'Warm front',stat:'Stationary front',occl:'Occluded front',lg:'Front symbols',
   d:['Triangles point the way the front moves','Semicircles point the way it moves','Hardly moves (e.g. the rainy-season front)','The cold front has caught the warm front'],nw:'Wind shifts to northwest',sw:'Southerly wind'}})[l];
 if(!W)return F.met_front_map('ja');
 var nar=NARROW();K=nar?1.2:1;
 var s=R(10,10,560,480,'#EEF5FB',16)+TTL(290,38,W.t,15,'#0f3558',540);
 s+='<g><animateTransform attributeName="transform" type="translate" values="0 0;40 -6;40 -6" keyTimes="0;.85;1" dur="10s" repeatCount="indefinite"/>';
 s+='<path d="M280 180 L470 238 Q420 330 300 400 Q220 380 200 360 Z" fill="#FFE3C8" opacity=".75"/>'+tx(350,300,W.sec,13,'#8a3b00',900);
 [[70,1],[110,.8],[150,.6]].forEach(function(r){s+='<ellipse cx="280" cy="180" rx="'+r[0]*1.5+'" ry="'+r[0]+'" fill="none" stroke="#9FB0C2" stroke-width="1.5" stroke-dasharray="4 4" opacity="'+r[1]+'"/>'});
 s+='<g opacity=".8">';for(var i=0;i<16;i++){var x=330+((i*37)%190),y=110+((i*53)%72);s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x-4)+'" y2="'+(y+10)+'" stroke="#5E8FD9" stroke-width="2"><animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="'+(i*.1)+'s" repeatCount="indefinite"/></line>'}s+='</g>';
 s+=R(356,78,150,24,'#fff',12,' opacity=".85"')+tx(431,95,W.rn,12,'#1d4d8a',900);
 s+=FR([[280,180],[262,240],[232,300],[196,360],[160,410]],'cold',-1,34);
 s+=FR([[280,180],[340,190],[400,206],[470,238]],'warm',-1,34);
 s+='<g><rect x="160" y="300" width="80" height="24" rx="12" fill="#fff" opacity=".9"/><animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite"/></g>'+tx(200,317,W.sh,11,RD,900);
 s+='<circle cx="280" cy="180" r="22" fill="#fff" stroke="#D64545" stroke-width="3"/>'+tx(280,188,W.L,20,'#D64545',900);
 s+=ARW(150,280,120,240,'#6B4FA0',4)+tx(120,228,W.nw,11,'#6B4FA0',800)+ARW(330,370,360,330,'#E08A2F',4)+tx(372,388,W.sw,11,'#8a3b00',800);
 s+='</g>';
 var mp=s;K=1;
 function LG(x0,y0,w){var lh=FS(11)*1.3,y=y0+54,g='';
  [['cold',W.cold,W.d[0]],['warm',W.warm,W.d[1]],['stat',W.stat,W.d[2]],['occl',W.occl,W.d[3]]].forEach(function(v,i){var n=LINES(v[2],11,w-48).length,h=70+n*lh+8;
   g+=R(x0+14,y,w-28,h,'#F7FAFD',12)+tx(x0+w/2,y+26,v[1],14,{cold:'#2F6FD6',warm:'#D64545',stat:'#6B7785',occl:'#7B4FB0'}[v[0]],900)+FR([[x0+40,y+52],[x0+w-40,y+52]],v[0],-1,36,4)+WR(x0+w/2,y+70+n*lh/2+FS(11)*0.3,v[2],11,G,700,w-48);y+=h+10});
  var H=y-y0;return {s:R(x0,y0,w,H,'#fff',16,' stroke="#D9E3EC"')+tx(x0+w/2,y0+34,W.lg,16,D,900)+g,h:H}}
 if(nar){var lg=LG(20,504,540),HH=504+lg.h+16;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 '+HH.toFixed(0)+'" role="img">'+R(0,0,580,HH,'#F7FAFD')+mp+lg.s+'</svg>'}
 var lg2=LG(590,10,300),H2=Math.max(500,lg2.h+20);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 '+H2.toFixed(0)+'" role="img">'+R(0,0,900,H2,'#F7FAFD')+mp+lg2.s+'</svg>'},

/* 8 温帯低気圧の一生：波 → 発達 → 閉塞 → 衰える */
met_cyclone_life:function(l){
 var W=({ja:['前線の上に波ができる','低気圧が発達する（暖域が広い）','寒冷前線が追いつく（閉塞が始まる）','閉塞して衰える','寒い','暖かい','エネルギーのもと：寒気と暖気の温度差'],
  ko:['전선 위에 파동이 생긴다','저기압이 발달한다(난역이 넓다)','한랭전선이 따라잡는다(폐색 시작)','폐색되어 약해진다','춥다','따뜻하다','에너지의 원천: 찬 공기와 따뜻한 공기의 온도 차'],
  en:['A wave forms on a front','The low deepens (wide warm sector)','The cold front catches up (occlusion begins)','Fully occluded, the low weakens','Cold','Warm','Energy source: the temperature contrast between cold and warm air']})[l];
 if(!W)return F.met_cyclone_life('ja');
 var nar=NARROW();K=nar?1.25:1;
 function st(i){var g=R(0,0,200,230,'#fff',14,' stroke="#D9E3EC" stroke-width="2"')+'<circle cx="24" cy="24" r="15" fill="#6B4FA0"/>'+tx(24,30,i+1,15,'#fff',900);
  g+=R(10,46,180,62,'#DCEBFA',0)+R(10,108,180,70,'#FDE7D3',0)+tx(160,64,W[4],10,'#1d4d8a',800)+tx(160,172,W[5],10,'#8a3b00',800);
  if(i===0)g+=FR([[14,110],[70,112],[100,98],[130,112],[186,110]],'stat',1,28,3);
  if(i===1)g+='<path d="M100 96 L170 120 L130 176 Z" fill="#FFD2A8" opacity=".8"/>'+FR([[100,96],[140,104],[176,122]],'warm',-1,26,3)+FR([[100,96],[92,130],[74,170]],'cold',-1,26,3)+'<circle cx="100" cy="96" r="9" fill="#fff" stroke="#D64545" stroke-width="2.5"/>';
  if(i===2)g+='<path d="M118 104 L172 124 L136 170 Z" fill="#FFD2A8" opacity=".8"/>'+FR([[96,86],[118,104]],'occl',-1,22,3)+FR([[118,104],[150,112],[178,126]],'warm',-1,26,3)+FR([[118,104],[106,138],[90,174]],'cold',-1,26,3)+'<circle cx="96" cy="86" r="10" fill="#fff" stroke="#D64545" stroke-width="2.5"/>';
  if(i===3)g+=FR([[86,80],[120,104],[146,118]],'occl',-1,22,3)+FR([[146,118],[178,126]],'warm',-1,26,3)+FR([[146,118],[132,150],[118,176]],'cold',-1,26,3)+'<circle cx="86" cy="80" r="12" fill="#fff" stroke="#9FB0C2" stroke-width="2.5"/>';
  g+=WR(100,206,W[i],11.5,D,800,184);
  g+='<rect x="0" y="0" width="200" height="230" rx="14" fill="none" stroke="#6B4FA0" stroke-width="4" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.03;.22;.25;1" dur="8s" begin="'+(i*2)+'s" repeatCount="indefinite"/></rect>';
  return g}
 var s,ar='<path d="M0 0 l14 0 m-6 -6 l6 6 l-6 6" stroke="#6B4FA0" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
 if(nar){s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 560" role="img">'+R(0,0,440,560,'#F7FAFD');
  [[10,10],[230,10],[10,262],[230,262]].forEach(function(p,i){s+='<g transform="translate('+p[0]+' '+p[1]+')">'+st(i)+'</g>'});
  s+=WR(220,528,W[6],12,'#6B4FA0',900,410)}
 else{s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 290" role="img">'+R(0,0,900,290,'#F7FAFD');
  [0,1,2,3].forEach(function(i){s+='<g transform="translate('+(14+i*222)+' 12)">'+st(i)+'</g>';if(i<3)s+='<g transform="translate('+(218+i*222)+' 126)">'+ar+'</g>'});
  s+=tx(450,272,W[6],13,'#6B4FA0',900)}
 K=1;return s+'</svg>'},
/* 9 ジェット気流の断面：寒帯前線ジェットと亜熱帯ジェット、圏界面の切れ目、晴天乱気流が起きやすい所 */
met_jet_section:function(l){
 var W=({ja:{t:'ジェット気流の断面（北半球・西から見る）',n:'北（極側・寒い）',s:'南（赤道側・暖かい）',pj:'寒帯前線ジェット（約300hPa・9km）',sj:'亜熱帯ジェット（約200hPa・12km）',tp:'対流圏界面',cat:'晴天乱気流が起きやすい',f:'寒帯前線',h:'高さ(km)',in:'風は画面の奥へ（西風）'},
  ko:{t:'제트기류의 단면(북반구·서쪽에서 본 모습)',n:'북(극 쪽·춥다)',s:'남(적도 쪽·따뜻하다)',pj:'한대전선 제트(약 300hPa·9km)',sj:'아열대 제트(약 200hPa·12km)',tp:'대류권계면',cat:'청천난류가 생기기 쉽다',f:'한대전선',h:'높이(km)',in:'바람은 화면 안쪽으로(서풍)'},
  en:{t:'Cross-section of the jet streams (northern hemisphere, looking east)',n:'North (polar side, cold)',s:'South (equator side, warm)',pj:'Polar-front jet (about 300 hPa, 9 km)',sj:'Subtropical jet (about 200 hPa, 12 km)',tp:'Tropopause',cat:'Clear-air turbulence likely',f:'Polar front',h:'Height (km)',in:'Wind blows into the page (westerly)'}})[l];
 if(!W)return F.met_jet_section('ja');
 var nar=NARROW();K=nar?1.1:1;
 function Y(h){return 440-h*24}
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" role="img">'+R(0,0,900,500,'#F7FAFD');
 s+='<defs><linearGradient id="jsg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D6E6F7"/><stop offset="1" stop-color="#FCE6D2"/></linearGradient></defs>';
 s+=R(60,Y(17),800,Y(0)-Y(17),'url(#jsg)',8);
 s+=TTL(450,28,W.t,15,'#0f3558',860);
 /* 圏界面：極側は低く、赤道側は高い。切れ目が2つ */
 s+='<path d="M60 '+Y(8.5)+' L300 '+Y(9.5)+'" stroke="'+G+'" stroke-width="3" stroke-dasharray="8 6"/><path d="M330 '+Y(11.2)+' L560 '+Y(12.2)+'" stroke="'+G+'" stroke-width="3" stroke-dasharray="8 6"/><path d="M590 '+Y(15.5)+' L860 '+Y(16.5)+'" stroke="'+G+'" stroke-width="3" stroke-dasharray="8 6"/>'+LB(110,Y(8.1)+22,W.tp,12,G,'middle');
 /* 寒帯前線（地上から上へ傾く） */
 s+='<path d="M200 '+Y(0)+' Q260 '+Y(4)+' 310 '+Y(9)+'" stroke="#2F6FD6" stroke-width="4" fill="none"/>'+tx(180,Y(1.2),W.f,12,'#2F6FD6',900);
 /* 等風速線（核） */
 function core(x,y,lab,c){var g='';[[110,46,.25],[74,30,.45],[40,17,.9]].forEach(function(r){g+='<ellipse cx="'+x+'" cy="'+y+'" rx="'+r[0]+'" ry="'+r[1]+'" fill="'+c+'" opacity="'+r[2]*.5+'" stroke="'+c+'" stroke-width="1.5"/>'});
  g+='<g><circle cx="'+x+'" cy="'+y+'" r="11" fill="#fff" stroke="'+c+'" stroke-width="3"/><path d="M'+(x-6)+' '+(y-6)+' l12 12 m0 -12 l-12 12" stroke="'+c+'" stroke-width="3"/><animate attributeName="opacity" values=".4;1;.4" dur="1.6s" repeatCount="indefinite"/></g>';
  return g}
 s+=core(318,Y(9.8),W.pj,'#7B4FB0')+core(578,Y(12.6),W.sj,'#C0392B');
 s+=LB(150,Y(14.4),W.pj,12,'#7B4FB0','middle')+'<path d="M190 '+(Y(14.4)+6)+' L300 '+(Y(10.4))+'" stroke="#7B4FB0" stroke-width="2" stroke-dasharray="3 3"/>'+LB(760,Y(10.2),W.sj,12,'#C0392B','middle')+'<path d="M720 '+(Y(10.2)-12)+' L600 '+(Y(12.3))+'" stroke="#C0392B" stroke-width="2" stroke-dasharray="3 3"/>';
 /* 晴天乱気流の所：核の上の傾いた圏界面の近く、核の下の極側（ジェット前線） */
 function catz(x,y,w,h,d){return '<g><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="#F4A340" opacity=".55"/><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="none" stroke="#C26A00" stroke-width="2" stroke-dasharray="5 4"/><animate attributeName="opacity" values=".35;1;.35" dur="2s" begin="'+d+'s" repeatCount="indefinite"/></g>'}
 s+=catz(262,Y(12),100,26,0)+catz(222,Y(8.6),76,40,.5)+catz(520,Y(14.6),100,26,1);
 s+=R(650,Y(4.6)-18,20,20,'#F4A340',5,' opacity=".8"')+tx(678,Y(4.6)-3,W.cat,12,'#8a4a00',900,'start');
 s+='<g><circle cx="690" cy="'+(Y(3)-5)+'" r="9" fill="#fff" stroke="#7B4FB0" stroke-width="2.5"/><path d="M684 '+(Y(3)-11)+' l12 12 m0 -12 l-12 12" stroke="#7B4FB0" stroke-width="2.5"/></g>'+WR(706,Y(3),W.in,11,G,800,170,'start');
 /* 飛行機：乱気流の所で揺れる */
 s+='<g><g>'+planeS('#fff')+'<animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -5;0 5;0 -4;0 3;0 0;0 0" keyTimes="0;.28;.32;.36;.4;.44;.48;1" dur="9s" repeatCount="indefinite" additive="sum"/></g><animateMotion dur="9s" repeatCount="indefinite" path="M80 '+Y(11)+' L840 '+Y(11)+'"/></g>';
 s+=tx(70,Y(0)+26,'← '+W.n,12,'#1d4d8a',900,'start')+tx(850,Y(0)+26,W.s+' →',12,'#8a3b00',900,'end');
 [0,4,8,12,16].forEach(function(h){s+=tx(52,Y(h)+4,h,11,G,700,'end')});s+=tx(20,Y(17)-6,W.h,11,G,800,'start');
 K=1;
 if(nar)return SCR(s+'</svg>',760);
 return s+'</svg>'},

/* 10 ジェット気流の地図：冬は日本の上で強く、夏は北へ移って弱まる。東行きは追い風、西行きは向かい風 */
met_jet_map:function(l){
 var W=({ja:{t:'上空約10kmのジェット気流',w:'冬',su:'夏',kr:'韓国',jp:'日本',cn:'中国',us:'北アメリカへ',wi:'冬は日本の上で世界有数の強さ（150〜200kt以上のことも）',sm:'夏は北へ移り、弱くなる',e:'東へ（韓国・日本→北米）：追い風で速い',wbd:'西へ（北米→韓国・日本）：向かい風で遅い'},
  ko:{t:'상공 약 10km의 제트기류',w:'겨울',su:'여름',kr:'한국',jp:'일본',cn:'중국',us:'북미로',wi:'겨울에는 일본 위에서 세계적으로 강하다(150~200kt 이상일 때도)',sm:'여름에는 북쪽으로 옮겨 가며 약해진다',e:'동쪽으로(한국·일본→북미): 뒷바람으로 빠르다',wbd:'서쪽으로(북미→한국·일본): 맞바람으로 느리다'},
  en:{t:'The jet stream about 10 km up',w:'Winter',su:'Summer',kr:'Korea',jp:'Japan',cn:'China',us:'To North America',wi:'In winter it is among the world’s strongest over Japan (sometimes 150–200 kt or more)',sm:'In summer it moves north and weakens',e:'Eastbound (Korea/Japan → North America): tailwind, faster',wbd:'Westbound (North America → Korea/Japan): headwind, slower'}})[l];
 if(!W)return F.met_jet_map('ja');
 var nar=NARROW();K=nar?1.35:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 470" role="img">'+R(0,0,900,470,'#F7FAFD')+R(10,40,880,330,'#CFE8F7',14);
 s+=tx(nar?450:450,28,W.t,15,'#0f3558',900);
 s+='<path d="M10 40 H420 V120 Q380 170 360 220 Q330 270 300 300 Q220 350 10 370 Z" fill="#EADFC6"/>'+tx(nar?230:120,nar?120:230,W.cn,15,'#9C8A62',900);
 s+='<path d="M300 170 L318 172 L322 205 L312 228 L302 222 L296 195 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="1.5"/>'+tx(300,246,W.kr,12,'#2F5E24',900);
 s+='<path d="M340 250 Q380 238 400 205 Q418 170 440 150 L448 156 Q430 180 418 210 Q396 250 350 262 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="1.5"/>'+tx(430,250,W.jp,12,'#2F5E24',900);
 /* ジェット：冬と夏の位置を行き来する */
 var dW='M20 150 C150 190 260 230 360 210 C470 190 560 200 700 190 C780 185 840 180 890 175',dS='M20 90 C150 70 260 80 360 70 C470 60 560 80 700 70 C780 66 840 62 890 60';
 s+='<path d="'+dW+'" fill="none" stroke="#7B4FB0" stroke-width="30" stroke-linecap="round" opacity=".28"><animate attributeName="d" values="'+dW+';'+dW+';'+dS+';'+dS+';'+dW+'" keyTimes="0;.35;.5;.85;1" dur="12s" repeatCount="indefinite"/><animate attributeName="stroke-width" values="30;30;14;14;30" keyTimes="0;.35;.5;.85;1" dur="12s" repeatCount="indefinite"/></path>';
 s+='<path d="'+dW+'" fill="none" stroke="#7B4FB0" stroke-width="5" stroke-dasharray="18 14"><animate attributeName="d" values="'+dW+';'+dW+';'+dS+';'+dS+';'+dW+'" keyTimes="0;.35;.5;.85;1" dur="12s" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" values="0;-320" dur="2s" repeatCount="indefinite"/></path>';
 var bx=nar?480:560;
 s+='<g>'+R(bx,300,150,34,'#fff',17,' stroke="#7B4FB0" stroke-width="2"')+tx(bx+75,323,W.w,16,'#7B4FB0',900)+'<animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.35;.45;.9;1" dur="12s" repeatCount="indefinite"/></g>';
 s+='<g opacity="0">'+R(bx,300,150,34,'#fff',17,' stroke="#E08A2F" stroke-width="2"')+tx(bx+75,323,W.su,16,'#E08A2F',900)+'<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.4;.5;.85;.95;1" dur="12s" repeatCount="indefinite"/></g>';
 s+=nar?ARW(610,270,735,270,'#2F8FE0',5)+tx(672,258,W.us,12,'#1d4d8a',900):ARW(700,250,860,250,'#2F8FE0',5)+tx(780,240,W.us,12,'#1d4d8a',900);
 /* 説明 */
 if(nar){K=1.35;s=s.replace('viewBox="0 0 900 470"','viewBox="150 0 600 800"').replace(R(0,0,900,470,'#F7FAFD'),R(0,0,900,800,'#F7FAFD'));
  [[W.wi,'#7B4FB0'],[W.sm,'#E08A2F'],[W.e,'#1d4d8a'],[W.wbd,'#8a3b00']].forEach(function(v,i){var y=392+i*100;s+=R(160,y,580,88,'#fff',12,' stroke="#D9E3EC"')+WR(450,y+46,v[0],13,v[1],900,540)})}
 else{s+=R(10,382,880,80,'#fff',12,' stroke="#D9E3EC"');
  s+=WR(230,408,W.wi,12,'#7B4FB0',900,420)+WR(230,442,W.sm,12,'#E08A2F',900,420)+WR(675,408,W.e,12,'#1d4d8a',900,410)+WR(675,442,W.wbd,12,'#8a3b00',900,410)}
 K=1;
 return s+'</svg>'},

/* 11 晴天乱気流のしくみ：速い層と遅い層の境で波が巻き上がって砕ける（ケルビン・ヘルムホルツ波）＋目安の数字 */
met_kh:function(l){
 var W=({ja:{t:'晴天乱気流（CAT）：雲がなくても揺れる',fa:'速い風',sl:'遅い風',br:'境目で波が巻き上がって砕ける',c:['ジェットの中心の風速','110kt以上'],v:['上下の風の差（鉛直シアー）','5kt／1,000ft以上'],h:['横の風の差（水平シアー）','40kt／150NM以上'],tm:['等温線の間隔','5℃／120NMより密'],src:'目安：米国FAA AC 00-30C、日本の試験（等温線）'},
  ko:{t:'청천난류(CAT): 구름이 없어도 흔들린다',fa:'빠른 바람',sl:'느린 바람',br:'경계에서 파도가 말려 올라가 부서진다',c:['제트 중심의 풍속','110kt 이상'],v:['위아래 바람 차이(연직 시어)','5kt/1,000ft 이상'],h:['옆 바람 차이(수평 시어)','40kt/150NM 이상'],tm:['등온선 간격','5℃/120NM보다 촘촘'],src:'기준: 미국 FAA AC 00-30C, 일본 시험(등온선)'},
  en:{t:'Clear-air turbulence (CAT): bumps without cloud',fa:'Fast wind',sl:'Slow wind',br:'Waves curl up and break at the boundary',c:['Jet core speed','110 kt or more'],v:['Vertical wind shear','5 kt per 1,000 ft or more'],h:['Horizontal wind shear','40 kt per 150 NM or more'],tm:['Isotherm spacing','Closer than 5 °C per 120 NM'],src:'Rules of thumb: FAA AC 00-30C; isotherms from the Japanese exam'}})[l];
 if(!W)return F.met_kh('ja');
 var nar=NARROW();K=nar?1.25:1;
 var sc=R(10,40,560,300,'#EAF4FC',14)+TTL(290,30,W.t,15,'#0f3558',540);
 sc+=R(10,40,560,150,'#D2E6F8',14);
 [70,110,150].forEach(function(y,i){sc+='<path d="M20 '+y+' h520" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="26 18" opacity=".7"><animate attributeName="stroke-dashoffset" values="0;-88" dur="'+(0.9+i*.05)+'s" repeatCount="indefinite"/></path>'});
 [250,290].forEach(function(y,i){sc+='<path d="M20 '+y+' h520" stroke="#7FA6C4" stroke-width="3" stroke-dasharray="26 18" opacity=".7"><animate attributeName="stroke-dashoffset" values="0;-88" dur="'+(3+i*.2)+'s" repeatCount="indefinite"/></path>'});
 sc+=tx(470,88,W.fa+' ⇒⇒',14,'#1d4d8a',900)+tx(470,312,W.sl+' →',14,'#40566B',900);
 /* 巻き上がる波 */
 var wave='';for(var i=0;i<5;i++){var x=40+i*110;wave+='<path d="M'+x+' 200 q30 -42 62 -8 q10 12 -6 18 q-14 4 -14 -10" fill="none" stroke="#6B4FA0" stroke-width="4" stroke-linecap="round"/>'}
 sc+='<defs><clipPath id="khc"><rect x="10" y="40" width="560" height="300" rx="14"/></clipPath></defs><g clip-path="url(#khc)"><g transform="translate(-110 0)">'+wave+'<animateTransform attributeName="transform" type="translate" values="-110 0;0 0" dur="3.2s" repeatCount="indefinite"/></g></g>';
 sc+='<path d="M20 200 H550" stroke="#6B4FA0" stroke-width="2" stroke-dasharray="4 5" opacity=".6"/>'+tx(290,236,W.br,13,'#6B4FA0',900);
 sc+='<g><g>'+planeS('#fff')+'<animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 6;0 -5;0 4;0 0" dur="1.2s" repeatCount="indefinite" additive="sum"/></g><animateMotion dur="7s" repeatCount="indefinite" path="M40 190 L540 190"/></g>';
 K=1;
 function CR(x0,y0,w){var lh=FS(11.5)*1.3,y=y0+14,g='',cols=['#F1EAFB','#E3F1FB','#E8F5F2','#FDEEDF'];
  [W.c,W.v,W.h,W.tm].forEach(function(v,i){var n=LINES(v[0],11.5,w-40).length,h=n*lh+FS(15)*1.5+14;g+=R(x0+14,y,w-28,h,cols[i],12)+WR(x0+w/2,y+8+n*lh/2+FS(11.5)*0.35,v[0],11.5,G,800,w-40)+tx(x0+w/2,y+n*lh+FS(15)*1.2+6,v[1],15,D,900);y+=h+8});
  var ns=LINES(W.src,10,w-28).length,sh=ns*FS(10)*1.3+10;g+=WR(x0+w/2,y+sh/2+FS(10)*0.3,W.src,10,G,700,w-28);y+=sh+6;
  var H=y-y0;return {s:R(x0,y0,w,H,'#fff',16,' stroke="#D9E3EC"')+g,h:H}}
 var s;
 if(nar){var c1=CR(20,352,540),HH=352+c1.h+14;s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 '+HH.toFixed(0)+'" role="img">'+R(0,0,580,HH,'#F7FAFD')+sc+c1.s}
 else{var c2=CR(590,10,300),H2=Math.max(350,c2.h+20);s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 '+H2.toFixed(0)+'" role="img">'+R(0,0,900,H2,'#F7FAFD')+sc+c2.s}
 return s+'</svg>'},

/* 12 山岳波：山を越えた風が波打ち、レンズ雲・笠雲・ローター雲ができる。一番激しいのはローター */
met_mtnwave:function(l){
 var W=({ja:{t:'山岳波：山の風下に波ができる',wind:'強い風（山にほぼ直角）',cap:'笠雲',len:'レンズ雲（波の山にできる）',rot:'ローター雲：最も激しい乱気流',dn:'強い下降気流',st:'安定な層',far:'風下へ数百kmまで続くことも'},
  ko:{t:'산악파: 산의 바람 아래쪽에 파도가 생긴다',wind:'강한 바람(산에 거의 직각)',cap:'삿갓구름',len:'렌즈구름(파도 마루에 생긴다)',rot:'로터 구름: 가장 심한 난기류',dn:'강한 하강기류',st:'안정한 층',far:'바람 아래쪽 수백 km까지 이어지기도'},
  en:{t:'Mountain waves: waves form downwind of a ridge',wind:'Strong wind (nearly at right angles to the ridge)',cap:'Cap cloud',len:'Lenticular clouds (on the wave crests)',rot:'Rotor cloud: the most severe turbulence',dn:'Strong downdraft',st:'Stable layer',far:'Can extend hundreds of km downwind'}})[l];
 if(!W)return F.met_mtnwave('ja');
 var nar=NARROW();K=nar?1.1:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 460" role="img">'+R(0,0,900,460,'#DCEEFB')+TTL(450,30,W.t,15,'#0f3558',860);
 s+=R(0,130,900,40,'#FFE3C8',0,' opacity=".5"')+LB(880,188,W.st,11,'#8a3b00','end','#FFF1E3');
 /* 流線 */
 var lines=[[200,'M0 200 C120 200 170 150 230 150 C300 150 320 250 380 250 C440 250 470 170 530 170 C590 170 620 240 680 240 C740 240 770 190 900 190'],[260,'M0 260 C120 260 170 200 230 200 C300 200 320 300 380 300 C440 300 470 230 530 230 C590 230 620 290 680 290 C740 290 770 250 900 250'],[110,'M0 110 C150 110 190 90 250 90 C310 90 330 140 390 140 C450 140 480 105 540 105 C600 105 630 135 690 135 C750 135 800 115 900 115']];
 lines.forEach(function(v,i){s+='<path d="'+v[1]+'" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="22 16" opacity=".75"><animate attributeName="stroke-dashoffset" values="0;-76" dur="1.4s" repeatCount="indefinite"/></path>'});
 /* 山 */
 s+='<path d="M60 460 L230 190 L300 250 L360 460 Z" fill="#7C8A74"/><path d="M230 190 L260 238 L244 236 L230 250 L214 232 L204 236 Z" fill="#fff"/>';
 s+=R(0,440,900,20,'#9CC98B');
 /* 笠雲 */
 s+='<ellipse cx="235" cy="176" rx="62" ry="16" fill="#fff" stroke="#9FB0C2" stroke-width="2"/>'+LB(235,146,W.cap,12,'#40566B','middle');
 /* レンズ雲 */
 [[530,160],[800,175]].forEach(function(p){s+='<g><ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="70" ry="14" fill="#fff" stroke="#9FB0C2" stroke-width="2"/><ellipse cx="'+p[0]+'" cy="'+(p[1]-10)+'" rx="50" ry="9" fill="#fff" stroke="#9FB0C2" stroke-width="2"/><animate attributeName="opacity" values=".7;1;.7" dur="3s" repeatCount="indefinite"/></g>'});
 s+=LB(640,126,W.len,12,'#40566B','middle');
 /* ローター */
 s+='<g transform="translate(520 330)"><ellipse cx="0" cy="0" rx="70" ry="30" fill="#EEF1F4" stroke="#9FB0C2" stroke-width="2"/><g><path d="M-40 0 A40 22 0 1 1 40 0" fill="none" stroke="#D64545" stroke-width="4" stroke-linecap="round"/><path d="M40 0 l-10 -8 m10 8 l-12 4" stroke="#D64545" stroke-width="4" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" values="0;360" dur="3s" repeatCount="indefinite"/></g></g>';
 s+=LB(560,398,W.rot,13,'#D64545','middle');
 /* 下降気流 */
 s+='<g>'+ARW(330,240,380,330,'#D64545',6)+'<animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite"/></g>'+LB(392,232,W.dn,12,'#D64545','start');
 s+=ARW(20,74,110,74,'#2F6FD6',6)+LB(122,79,W.wind,11.5,'#1d4d8a','start')+LB(880,286,W.far+' →',11,G,'end');
 K=1;
 if(nar)return SCR(s+'</svg>',760);
 return s+'</svg>'},
/* 13 雷雨の一生：積雲期・成熟期・消散期 */
met_ts_life:function(l){
 var W=({ja:{t:['積雲期','成熟期','消散期'],d:['上昇気流だけ。雲がぐんぐん伸びる','上昇気流と下降気流が並ぶ。強い雨・雷・ひょう・突風','下降気流だけ。雨が弱まり雲がくずれる'],tm:['約10〜15分','約15〜30分','約30分'],life:'ひとつの雷雨の一生はおよそ1時間。いくつも続くと数時間になる',up:'上昇',dn:'下降'},
  ko:{t:['적운기','성숙기','소산기'],d:['상승기류만 있다. 구름이 쑥쑥 자란다','상승기류와 하강기류가 함께 있다. 강한 비·번개·우박·돌풍','하강기류만 있다. 비가 약해지고 구름이 무너진다'],tm:['약 10~15분','약 15~30분','약 30분'],life:'뇌우 하나의 일생은 약 1시간. 여러 개가 이어지면 몇 시간이 된다',up:'상승',dn:'하강'},
  en:{t:['Cumulus stage','Mature stage','Dissipating stage'],d:['Updrafts only; the cloud grows fast','Updrafts and downdrafts side by side: heavy rain, lightning, hail, gusts','Downdrafts only; rain eases and the cloud collapses'],tm:['About 10–15 min','About 15–30 min','About 30 min'],life:'A single thunderstorm lasts about an hour; a series of cells can go on for hours',up:'Up',dn:'Down'}})[l];
 if(!W)return F.met_ts_life('ja');
 var nar=NARROW();K=nar?1.2:1;
 function up(x,y1,y2,d){return '<g>'+ARW(x,y1,x,y2,'#E08A2F',5)+'<animate attributeName="opacity" values=".3;1;.3" dur="1.4s" begin="'+(d||0)+'s" repeatCount="indefinite"/></g>'}
 function dn(x,y1,y2,d){return '<g>'+ARW(x,y1,x,y2,'#2F6FD6',5)+'<animate attributeName="opacity" values=".3;1;.3" dur="1.4s" begin="'+(d||0)+'s" repeatCount="indefinite"/></g>'}
 function st(i){var g=R(0,0,270,380,'#fff',16,' stroke="#D9E3EC" stroke-width="2"')+'<circle cx="26" cy="28" r="16" fill="#6B4FA0"/>'+tx(26,34,i+1,15,'#fff',900)+tx(150,34,W.t[i],17,D,900)+tx(150,56,W.tm[i],11,G,800);
  g+=R(10,300,250,8,'#9CC98B',3);
  if(i===0){g+='<path d="M80 290 Q70 240 100 220 Q90 170 135 160 Q180 150 190 200 Q215 220 200 260 Q205 290 190 290 Z" fill="#E6ECF2" stroke="#9FB0C2" stroke-width="2"/>'+up(115,280,175,0)+up(160,280,185,.5)}
  if(i===1){g+='<path d="M50 290 Q40 230 70 200 Q60 130 110 110 Q120 80 160 86 L240 76 L200 96 Q230 140 212 200 Q235 240 220 290 Z" fill="#DCE3EA" stroke="#8C9BAA" stroke-width="2"/>'+up(100,280,110,0)+dn(175,130,290,.4);
   g+='<g stroke="#5E8FD9" stroke-width="2.5">';for(var k=0;k<6;k++)g+='<line x1="'+(158+k*8)+'" y1="250" x2="'+(154+k*8)+'" y2="264"><animate attributeName="y1" values="250;296" dur=".8s" begin="'+(k*.12)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="264;310" dur=".8s" begin="'+(k*.12)+'s" repeatCount="indefinite"/></line>';g+='</g>';
   g+='<path d="M140 150 l-14 26 h12 l-10 26 l26 -34 h-12 l10 -18 z" fill="#FFD23F" stroke="#C99A00" stroke-width="1.5" opacity="0"><animate attributeName="opacity" values="0;0;1;0;0;1;0;0" keyTimes="0;.4;.42;.46;.7;.72;.76;1" dur="3s" repeatCount="indefinite"/></path>'}
  if(i===2){g+='<path d="M60 290 Q50 250 80 230 L90 150 Q110 120 150 122 L230 110 L200 136 Q210 180 200 230 Q225 260 210 290 Z" fill="#EEF1F4" stroke="#B4C0CC" stroke-width="2" opacity=".85"/>'+dn(110,160,290,0)+dn(170,160,290,.5);
   g+='<g stroke="#8FB0D8" stroke-width="2">';for(var k=0;k<4;k++)g+='<line x1="'+(100+k*22)+'" y1="262" x2="'+(97+k*22)+'" y2="272"><animate attributeName="y1" values="262;296" dur="1.6s" begin="'+(k*.3)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="272;306" dur="1.6s" begin="'+(k*.3)+'s" repeatCount="indefinite"/></line>';g+='</g>'}
  g+=WR(135,344,W.d[i],12,D,800,244);
  g+='<rect x="0" y="0" width="270" height="380" rx="16" fill="none" stroke="#6B4FA0" stroke-width="4" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.03;.3;.33;1" dur="9s" begin="'+(i*3)+'s" repeatCount="indefinite"/></rect>';
  return g}
 var s;
 if(nar){s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 1240" role="img">'+R(0,0,300,1240,'#F7FAFD');[0,1,2].forEach(function(i){s+='<g transform="translate(15 '+(10+i*395)+')">'+st(i)+'</g>'});s+=WR(150,1210,W.life,12,'#6B4FA0',900,280)}
 else{s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 440" role="img">'+R(0,0,900,440,'#F7FAFD');[0,1,2].forEach(function(i){s+='<g transform="translate('+(20+i*295)+' 10)">'+st(i)+'</g>'});s+=tx(450,420,W.life,13,'#6B4FA0',900)}
 K=1;return s+'</svg>'},

/* 14 積乱雲の危険：かなとこ・ひょう・乱気流・着氷・雷・強い雨・ダウンバースト・ガストフロント */
met_cb_hazards:function(l){
 var W=({ja:{t:'積乱雲の危険',anv:'かなとこ雲（風下へ何百kmも広がる）',ot:'かなとこの上の盛り上がり＝強い上昇気流',hail:'ひょう：雲の外、かなとこの下にも降る',turb:'激しい乱気流：雲の外20マイル先まで',ice:'着氷（0℃〜−20℃の層）',ltg:'雷',rain:'強い雨・視程不良',db:'ダウンバースト',gf:'ガストフロント（初期突風）：風向・風速の急変'},
  ko:{t:'적란운의 위험',anv:'모루구름(바람 아래쪽으로 수백 km 퍼짐)',ot:'모루 위의 솟은 부분=강한 상승기류',hail:'우박: 구름 밖, 모루 아래에도 떨어진다',turb:'심한 난기류: 구름 밖 20마일까지',ice:'착빙(0℃~−20℃ 층)',ltg:'번개',rain:'강한 비·나쁜 시정',db:'다운버스트',gf:'돌풍전선(초기돌풍): 풍향·풍속 급변'},
  en:{t:'The hazards of a cumulonimbus',anv:'Anvil (spreads hundreds of km downwind)',ot:'Overshooting top = strong updraft',hail:'Hail: also outside the cloud, under the anvil',turb:'Severe turbulence: up to 20 miles from the storm',ice:'Icing (0 °C to −20 °C layer)',ltg:'Lightning',rain:'Heavy rain, poor visibility',db:'Downburst',gf:'Gust front (first gust): sudden wind shift'}})[l];
 if(!W)return F.met_cb_hazards('ja');
 var nar=NARROW();K=nar?1.1:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" role="img">'+R(0,0,900,520,'#DCEEFB')+TTL(450,30,W.t,16,'#0f3558',860);
 s+=R(0,470,900,50,'#9CC98B');
 /* 雲 */
 s+='<path d="M250 470 Q230 400 262 360 Q240 300 280 262 Q270 190 320 160 Q330 110 380 100 L620 86 L760 96 L640 118 Q560 124 520 150 Q560 200 540 262 Q580 300 560 360 Q590 420 570 470 Z" fill="#DCE3EA" stroke="#8C9BAA" stroke-width="2.5"/>';
 s+='<path d="M380 100 Q400 60 430 72 Q440 90 420 100 Z" fill="#E8EDF2" stroke="#8C9BAA" stroke-width="2"><animate attributeName="d" values="M380 100 Q400 60 430 72 Q440 90 420 100 Z;M380 100 Q398 48 432 62 Q446 88 420 100 Z;M380 100 Q400 60 430 72 Q440 90 420 100 Z" dur="3s" repeatCount="indefinite"/></path>';
 s+=R(262,262,280,64,'#B5E3F5',0,' opacity=".45"');
 /* 雷 */
 s+='<path d="M430 190 l-22 40 h18 l-16 42 l40 -54 h-18 l14 -28 z" fill="#FFD23F" stroke="#C99A00" stroke-width="1.5" opacity="0"><animate attributeName="opacity" values="0;0;1;0;0;1;0;0" keyTimes="0;.5;.52;.56;.75;.77;.8;1" dur="3s" repeatCount="indefinite"/></path>';
 /* 雨 */
 s+='<g stroke="#5E8FD9" stroke-width="2.5">';for(var k=0;k<10;k++)s+='<line x1="'+(300+k*22)+'" y1="400" x2="'+(296+k*22)+'" y2="416"><animate attributeName="y1" values="400;462" dur=".8s" begin="'+(k*.08)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="416;478" dur=".8s" begin="'+(k*.08)+'s" repeatCount="indefinite"/></line>';s+='</g>';
 /* ひょう（かなとこの下） */
 s+='<g fill="#fff" stroke="#8C9BAA">';for(var k=0;k<5;k++)s+='<circle cx="'+(640+k*20)+'" cy="140" r="5"><animate attributeName="cy" values="130;300" dur="1.8s" begin="'+(k*.3)+'s" repeatCount="indefinite"/></circle>';s+='</g>';
 /* ダウンバースト・ガストフロント */
 s+='<g>'+ARW(420,380,420,455,'#2F6FD6',6)+ARW(420,462,300,462,'#2F6FD6',5)+ARW(420,462,560,462,'#2F6FD6',5)+'<animate attributeName="opacity" values=".35;1;.35" dur="1.6s" repeatCount="indefinite"/></g>';
 s+='<g><path d="M600 470 Q620 440 660 444 Q690 430 720 448 Q740 470 740 470 Z" fill="#C8D1DA" opacity=".9"/><animateTransform attributeName="transform" type="translate" values="-40 0;60 0" dur="4s" repeatCount="indefinite"/></g>';
 /* 乱気流の範囲 */
 s+='<path d="M200 470 Q170 260 270 130 Q380 40 560 60 Q760 70 820 140" fill="none" stroke="#D64545" stroke-width="3" stroke-dasharray="10 8"><animate attributeName="stroke-dashoffset" values="0;-36" dur="1.2s" repeatCount="indefinite"/></path>';
 /* ラベル */
 s+=LB(700,64,W.anv,12,'#40566B','middle')+LB(312,50,W.ot,11.5,'#8a3b00','middle')+LB(730,318,W.hail,12,'#40566B','middle')+LBW(140,170,W.turb,12,'#D64545','middle','#fff',230)+LB(300,294,W.ice,12,'#1d6fa0','start')+LB(470,210,W.ltg,12,'#C99A00','start')+LB(470,396,W.rain,12,'#2F6FD6','start')+LB(420,500,W.db,12,'#2F6FD6','middle')+LB(740,500,W.gf,11.5,'#40566B','middle');
 K=1;
 if(nar)return SCR(s+'</svg>',780);
 return s+'</svg>'},

/* 15 マイクロバーストの中の着陸：向かい風が増える → 下降気流 → 追い風に変わって沈む */
met_microburst:function(l){
 var W=({ja:{t:'マイクロバーストに入った着陸機',p:'予定の降下経路',a:'① 向かい風が増える：速度が増え、経路より上に浮く',b:'② 強い下降気流：押し下げられる',c:'③ 追い風に変わる：速度と揚力が減り、経路より下に沈む（最も危険）',sz:'直径 4km 未満・強い風は数分〜十数分',gd:'地面'},
  ko:{t:'마이크로버스트에 들어간 착륙기',p:'예정 강하 경로',a:'① 맞바람이 늘어난다: 속도가 늘어 경로보다 위로 뜬다',b:'② 강한 하강기류: 아래로 밀린다',c:'③ 뒷바람으로 바뀐다: 속도와 양력이 줄어 경로보다 아래로 가라앉는다(가장 위험)',sz:'지름 4km 미만·강한 바람은 몇 분~십수 분',gd:'지면'},
  en:{t:'A landing aircraft flying into a microburst',p:'Planned glide path',a:'① Headwind increases: airspeed rises, the aircraft floats above the path',b:'② Strong downdraft: the aircraft is pushed down',c:'③ The wind turns to a tailwind: airspeed and lift fall and it sinks below the path (the most dangerous point)',sz:'Less than 4 km across; strong winds last a few minutes to about a quarter of an hour',gd:'Ground'}})[l];
 if(!W)return F.met_microburst('ja');
 var nar=NARROW();K=nar?1.1:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" role="img">'+R(0,0,900,480,'#DCEEFB')+TTL(450,28,W.t,16,'#0f3558',860);
 s+=R(0,420,900,60,'#9CC98B')+R(760,414,140,8,'#5B6770');
 s+='<g transform="translate(0 34)"><path d="M330 60 Q300 40 360 34 Q420 20 480 40 Q540 30 560 60 Q600 80 560 96 L340 96 Q300 90 330 60 Z" fill="#C8D1DA" stroke="#8C9BAA" stroke-width="2"/></g>';
 /* 下降気流と外へ広がる風 */
 s+='<g opacity=".85">';[420,450,480].forEach(function(x){s+='<path d="M'+x+' 132 L'+x+' 370" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="14 10"><animate attributeName="stroke-dashoffset" values="0;-48" dur=".9s" repeatCount="indefinite"/></path>'});
 s+='<path d="M450 370 Q450 408 250 414" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="14 10"><animate attributeName="stroke-dashoffset" values="0;-48" dur=".9s" repeatCount="indefinite"/></path><path d="M450 370 Q450 408 650 414" fill="none" stroke="#2F6FD6" stroke-width="3" stroke-dasharray="14 10"><animate attributeName="stroke-dashoffset" values="0;-48" dur=".9s" repeatCount="indefinite"/></path></g>';
 s+=ARW(300,404,230,404,'#2F6FD6',5)+ARW(600,404,680,404,'#2F6FD6',5);
 /* 予定の経路と実際の経路 */
 s+='<path d="M40 150 L800 414" stroke="#6B7785" stroke-width="3" stroke-dasharray="10 8"/>'+LB(120,160,W.p,12,G,'start');
 var act='M40 150 C200 170 280 190 340 190 C420 200 460 280 520 330 C580 380 620 420 660 440';
 s+='<path d="'+act+'" fill="none" stroke="#D64545" stroke-width="4"/>';
 s+='<g>'+planeS('#fff')+'<animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="'+act+'"/></g>';
 s+='<circle cx="300" cy="190" r="15" fill="#E08A2F"/>'+tx(300,196,'1',14,'#fff',900)+'<circle cx="450" cy="250" r="15" fill="#2F6FD6"/>'+tx(450,256,'2',14,'#fff',900)+'<circle cx="560" cy="360" r="15" fill="#D64545"/>'+tx(560,366,'3',14,'#fff',900);
 s+=LB(450,462,W.sz,12,'#40566B','middle');
 s+=R(610,60,280,190,'#fff',12,' stroke="#D9E3EC" opacity=".96"')+WR(750,96,W.a,11.5,'#8a3b00',800,260)+WR(750,150,W.b,11.5,'#1d4d8a',800,260)+WR(750,210,W.c,11.5,'#D64545',900,260);
 K=1;
 if(nar)return SCR(s+'</svg>',780);
 return s+'</svg>'},

/* 16 雷雨を避ける：強いエコーから20マイル以上、風上側を回る */
met_ts_avoid:function(l){
 var W=({ja:{t:'気象レーダーで雷雨を避ける',r:'強いエコー（赤）',y:'中くらい（黄）',g:'弱い（緑）',w:'上空の風',ok:'風上側を20マイル以上はなれて回る',ng:'エコーの間は40マイル以上ないと通らない',an:'かなとこの下（風下）はひょうの危険',p:'予定の経路'},
  ko:{t:'기상 레이더로 뇌우 피하기',r:'강한 에코(빨강)',y:'중간(노랑)',g:'약함(초록)',w:'상공의 바람',ok:'바람이 불어오는 쪽으로 20마일 이상 떨어져 돌아간다',ng:'에코 사이가 40마일 이상이 아니면 지나가지 않는다',an:'모루 아래(바람 아래쪽)는 우박 위험',p:'예정 경로'},
  en:{t:'Avoiding thunderstorms on weather radar',r:'Strong echo (red)',y:'Moderate (yellow)',g:'Weak (green)',w:'Upper wind',ok:'Go round on the upwind side, 20 miles or more away',ng:'Do not fly between echoes less than 40 miles apart',an:'Under the anvil (downwind): risk of hail',p:'Planned route'}})[l];
 if(!W)return F.met_ts_avoid('ja');
 var nar=NARROW();K=nar?1.3:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 600" role="img">'+R(0,0,640,600,'#0E2238',16)+TTL(320,32,W.t,16,'#fff',600);
 [80,160,240].forEach(function(r){s+='<path d="M'+(320-r)+' 560 A'+r+' '+r+' 0 0 1 '+(320+r)+' 560" fill="none" stroke="#3A5A7A" stroke-width="1.5"/>'});
 function cell(x,y,sc){return '<g transform="translate('+x+' '+y+') scale('+sc+')"><ellipse rx="70" ry="46" fill="#2FAE5A" opacity=".85"/><ellipse rx="46" ry="30" fill="#F2D233"/><ellipse rx="22" ry="15" fill="#E03B3B"><animate attributeName="rx" values="20;25;20" dur="2s" repeatCount="indefinite"/></ellipse></g>'}
 s+=cell(250,250,1)+cell(420,230,.9);
 s+='<path d="M252 262 C300 300 350 330 380 360 L400 340 C360 300 310 270 262 244 Z" fill="#fff" opacity=".12"/>';
 s+=LB(360,392,W.an,11,'#8a3b00','middle','#FFE3C8');
 /* 予定の経路（真上へ）と回避の経路（風上＝左を回る） */
 s+='<path d="M320 560 L320 70" stroke="#9FB0C2" stroke-width="3" stroke-dasharray="10 8"/>'+LB(330,96,W.p,11,'#40566B','start');
 var av='M320 560 C320 480 170 470 130 380 C100 300 120 190 190 130 C240 90 320 90 320 60';
 s+='<path d="'+av+'" fill="none" stroke="#7CF2B0" stroke-width="4"/>';
 s+='<g>'+plane('#fff')+'<animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="'+av+'"/></g>';
 s+='<circle cx="250" cy="250" r="118" fill="none" stroke="#FFB870" stroke-width="2" stroke-dasharray="6 6"/>'+LB(118,236,'20 NM',11,'#8a3b00','middle','#FFE3C8');
 s+=ARW(40,440,100,490,'#9FD3F7',5)+LB(80,424,W.w+' ↘',11,'#1d4d8a','middle','#DCEEFB');
 var lgh=FS(10.5)*1.5,lgw=0;[W.r,W.y,W.g].forEach(function(v){lgw=Math.max(lgw,TW(v,10.5))});s+=R(20,60,lgw+54,lgh*3+14,'#13304E',10);[[W.r,'#E03B3B'],[W.y,'#F2D233'],[W.g,'#2FAE5A']].forEach(function(v,i){var yy=60+10+lgh*(i+0.7);s+='<ellipse cx="38" cy="'+(yy-FS(10.5)*0.3).toFixed(1)+'" rx="8" ry="6" fill="'+v[1]+'"/>'+tx(54,yy,v[0],10.5,'#fff',800,'start')});
 s+=LBW(400,478,W.ok,11.5,'#0f3558','middle','#7CF2B0',420)+LBW(400,548,W.ng,11.5,'#0f3558','middle','#FFE08A',420);
 K=1;return s+'</svg>'},
/* 17 台風の断面：眼・眼の壁・らせん状の雨の帯、下から吸い込み上から吹き出す */
met_ty_section:function(l){
 var W=({ja:{t:'台風の断面',eye:'眼：風が弱く晴れている（下降気流）',wall:'眼の壁：最も強い風と雨',band:'らせん状の雨の帯',in:'下の層：湿った空気が吸い込まれる',out:'上の層：吹き出して巻雲が広がる',warm:'中心は周りより暖かい（暖気核）',sea:'暖かい海（26〜27℃以上）から水蒸気が補給される'},
  ko:{t:'태풍의 단면',eye:'눈: 바람이 약하고 맑다(하강기류)',wall:'눈벽: 가장 강한 바람과 비',band:'나선형 비구름대',in:'아래층: 습한 공기가 빨려 들어간다',out:'위층: 뿜어져 나가 권운이 퍼진다',warm:'중심은 주변보다 따뜻하다(온난핵)',sea:'따뜻한 바다(26~27℃ 이상)에서 수증기가 공급된다'},
  en:{t:'Cross-section of a typhoon',eye:'Eye: light wind, clear sky (sinking air)',wall:'Eyewall: the strongest wind and rain',band:'Spiral rain bands',in:'Low level: moist air is drawn in',out:'Upper level: air flows out and cirrus spreads',warm:'The centre is warmer than its surroundings (warm core)',sea:'A warm sea (26–27 °C or more) supplies water vapour'}})[l];
 if(!W)return F.met_ty_section('ja');
 var nar=NARROW();K=nar?1.1:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 470" role="img">'+R(0,0,900,470,'#DCEEFB')+TTL(450,28,W.t,16,'#0f3558',860);
 s+=R(0,400,900,70,'#3F8FD0')+'<path d="M0 402 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#9FD3F7" stroke-width="3"><animateTransform attributeName="transform" type="translate" values="0 0;-60 0" dur="2s" repeatCount="indefinite"/></path>';
 /* 巻雲の傘 */
 s+='<path d="M90 110 Q450 40 810 110 Q450 90 90 110 Z" fill="#EEF2F6" stroke="#B4C0CC" stroke-width="2"/>';
 /* 雨の帯（左右） */
 [[160,300,.8],[250,250,1],[650,250,1],[740,300,.8]].forEach(function(c){s+='<g transform="translate('+c[0]+' '+c[1]+') scale('+c[2]+')"><path d="M-40 100 Q-50 40 -20 20 Q-30 -30 0 -40 Q30 -30 22 16 Q50 40 40 100 Z" fill="#D5DDE5" stroke="#9FB0C2" stroke-width="2"/></g>'});
 /* 眼の壁 */
 s+='<path d="M330 400 Q300 250 340 150 Q360 100 400 96 L410 400 Z" fill="#C3CDD7" stroke="#8C9BAA" stroke-width="2.5"/><path d="M570 400 Q600 250 560 150 Q540 100 500 96 L490 400 Z" fill="#C3CDD7" stroke="#8C9BAA" stroke-width="2.5"/>';
 s+=R(410,96,80,304,'#EAF6FF',0);
 /* 雨 */
 s+='<g stroke="#5E8FD9" stroke-width="2.5">';[340,360,380,520,540,560].forEach(function(x,k){s+='<line x1="'+x+'" y1="330" x2="'+(x-4)+'" y2="346"><animate attributeName="y1" values="330;396" dur=".7s" begin="'+(k*.1)+'s" repeatCount="indefinite"/><animate attributeName="y2" values="346;412" dur=".7s" begin="'+(k*.1)+'s" repeatCount="indefinite"/></line>'});s+='</g>';
 /* 吸い込み・上昇・吹き出し */
 s+='<g opacity=".9">'+ARW(60,380,300,380,'#E08A2F',5)+ARW(840,380,600,380,'#E08A2F',5)+'<animate attributeName="opacity" values=".35;1;.35" dur="2s" repeatCount="indefinite"/></g>';
 s+='<g>'+ARW(370,360,380,150,'#E08A2F',5)+ARW(530,360,520,150,'#E08A2F',5)+'<animate attributeName="opacity" values=".35;1;.35" dur="2s" begin=".6s" repeatCount="indefinite"/></g>';
 s+='<g>'+ARW(390,110,160,96,'#E08A2F',5)+ARW(510,110,740,96,'#E08A2F',5)+'<animate attributeName="opacity" values=".35;1;.35" dur="2s" begin="1.2s" repeatCount="indefinite"/></g>';
 s+='<g>'+ARW(450,150,450,330,'#2F6FD6',4)+'<animate attributeName="opacity" values=".3;1;.3" dur="2.4s" repeatCount="indefinite"/></g>';
 /* ラベル */
 s+=LB(450,76,W.out,12,'#40566B','middle')+LB(450,236,W.eye,11.5,'#1d4d8a','middle','#fff')+LB(660,190,W.wall,12,'#40566B','middle')+LB(170,196,W.band,12,'#40566B','middle')+LB(180,366,W.in,11.5,'#8a3b00','middle','#FFF1E3')+LB(450,262,W.warm,11,'#8a3b00','middle','#FFE3C8')+LB(450,444,W.sea,12,'#fff','middle','#2F6FA8');
 K=1;
 if(nar)return SCR(s+'</svg>',780);
 return s+'</svg>'},

/* 18 上から見た台風：反時計回りのうず、進む向きの右側が危険（風と進む速さが足し合わさる） */
met_ty_plan:function(l){
 var W=({ja:{t:'上から見た台風（北半球）',go:'進む向き',R:'右側：危険半円（風＋進む速さ）',Lf:'左側：可航半円（風−進む速さ）',st:'強風域（15m/s以上）',vio:'暴風域（25m/s以上）',ex:'例：風40m/s＋移動10m/s＝50m/s',ex2:'例：風40m/s−移動10m/s＝30m/s'},
  ko:{t:'위에서 본 태풍(북반구)',go:'진행 방향',R:'오른쪽: 위험반원(바람+이동 속도)',Lf:'왼쪽: 가항반원(바람−이동 속도)',st:'강풍역(15m/s 이상)',vio:'폭풍역(25m/s 이상)',ex:'예: 바람 40m/s+이동 10m/s=50m/s',ex2:'예: 바람 40m/s−이동 10m/s=30m/s'},
  en:{t:'A typhoon seen from above (northern hemisphere)',go:'Direction of travel',R:'Right: dangerous semicircle (wind + speed of travel)',Lf:'Left: navigable semicircle (wind − speed of travel)',st:'Strong-wind area (15 m/s or more)',vio:'Storm area (25 m/s or more)',ex:'e.g. wind 40 m/s + movement 10 m/s = 50 m/s',ex2:'e.g. wind 40 m/s − movement 10 m/s = 30 m/s'}})[l];
 if(!W)return F.met_ty_plan('ja');
 var nar=NARROW();K=nar?1.3:1;
 var cx=320,cy=360;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 700" role="img">'+R(0,0,640,700,'#0E2238',16)+TTL(320,30,W.t,15,'#fff',600);
 s+='<path d="M'+cx+' '+(cy-230)+' A230 230 0 0 1 '+cx+' '+(cy+230)+' Z" fill="#D64545" opacity=".22"/><path d="M'+cx+' '+(cy-230)+' A230 230 0 0 0 '+cx+' '+(cy+230)+' Z" fill="#2F8FE0" opacity=".14"/>';
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="230" fill="none" stroke="#F2D233" stroke-width="2" stroke-dasharray="8 6"/><circle cx="'+cx+'" cy="'+cy+'" r="130" fill="none" stroke="#E03B3B" stroke-width="3"/>';
 /* 回るうず */
 var sp='';for(var a=0;a<4;a++){sp+='<path d="M0 -24 C 60 -40 110 -10 120 60 C 126 110 90 160 40 190" fill="none" stroke="#fff" stroke-width="'+(12-a*2)+'" stroke-linecap="round" opacity=".55" transform="rotate('+(a*90)+')"/>'}
 s+='<g transform="translate('+cx+' '+cy+')"><g>'+sp+'<circle r="18" fill="#0E2238" stroke="#fff" stroke-width="3"/><animateTransform attributeName="transform" type="rotate" values="0;-360" dur="10s" repeatCount="indefinite"/></g></g>';
 s+=ARW(cx,cy-238,cx,cy-282,'#7CF2B0',6)+LB(cx+14,cy-262,W.go,12,'#0f3558','start','#7CF2B0');
 s+=LBW(cx+150,cy+280,W.R,11.5,'#fff','middle','#B23434',280)+LBW(cx-150,cy+280,W.Lf,11.5,'#fff','middle','#2465A8',280);
 s+=LBW(cx+140,cy-30,W.ex,10.5,'#8a1f1f','middle','#FFD6D6',230)+LBW(cx-140,cy+30,W.ex2,10.5,'#0f3558','middle','#D6E9FF',230);
 s+=LB(cx,cy+220,W.st,10.5,'#5a4a00','middle','#F2D233')+LB(cx,cy+122,W.vio,10.5,'#fff','middle','#E03B3B');
 K=1;return s+'</svg>'},

/* 19 台風の進路と予報円：太平洋高気圧の縁を回り、偏西風に乗って北東へ速く進む */
met_ty_track:function(l){
 var W=({ja:{t:'台風の進み方と予報円',hi:'太平洋高気圧',we:'偏西風',bo:'発生：暖かい海（北緯5〜20°ぐらい）',cur:'転向：向きを北東に変える',fast:'偏西風に乗って速く進む',kr:'韓国',jp:'日本',fc:'予報円：中心が入る確率70%',warn:'暴風警戒域'},
  ko:{t:'태풍의 진로와 예보원',hi:'북태평양 고기압',we:'편서풍',bo:'발생: 따뜻한 바다(북위 5~20° 정도)',cur:'전향: 방향을 북동쪽으로 바꾼다',fast:'편서풍을 타고 빠르게 나아간다',kr:'한국',jp:'일본',fc:'예보원: 중심이 들어갈 확률 70%',warn:'폭풍경계역'},
  en:{t:'How typhoons move, and the forecast circles',hi:'Pacific high',we:'Westerlies',bo:'Forms over warm sea (about 5–20°N)',cur:'Recurvature: turns northeast',fast:'Speeds up on the westerlies',kr:'Korea',jp:'Japan',fc:'Forecast circle: 70% chance the centre is inside',warn:'Storm warning area'}})[l];
 if(!W)return F.met_ty_track('ja');
 var nar=NARROW();K=nar?1.3:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img">'+R(0,0,640,640,'#CFE8F7',16)+TTL(320,30,W.t,15,'#0f3558',600);
 s+='<path d="M0 44 H300 V80 Q262 120 254 152 L240 178 Q210 230 150 260 Q80 300 0 300 Z" fill="#EADFC6"/>';
 s+='<path d="M232 150 L252 154 L256 186 L246 206 L236 200 L230 176 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="1.5"/>'+tx(222,222,W.kr,12,'#2F5E24',900);
 s+='<path d="M270 226 Q300 214 318 186 Q334 156 356 136 L364 142 Q348 166 336 194 Q316 230 278 240 Z" fill="#9CC98B" stroke="#5E8A4F" stroke-width="1.5"/>'+tx(350,236,W.jp,12,'#2F5E24',900);
 s+='<ellipse cx="500" cy="330" rx="150" ry="110" fill="#F7B26B" opacity=".35"/>'+tx(500,336,W.hi,15,'#8a3b00',900);
 s+='<path d="M60 110 Q300 70 620 120" fill="none" stroke="#7B4FB0" stroke-width="10" opacity=".35" stroke-linecap="round"/>'+LB(560,98,W.we+' →',12,'#7B4FB0','middle');
 var tr='M430 560 C380 520 320 480 280 430 C250 390 250 340 280 300 C300 270 330 250 380 220 C430 190 500 160 580 130';
 s+='<path d="'+tr+'" fill="none" stroke="#D64545" stroke-width="4" stroke-dasharray="10 8"/>';
 /* 予報円（だんだん大きく） */
 [[280,430,26],[266,360,40],[300,284,58],[380,220,78]].forEach(function(c,i){s+='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(0.15+i*0.15).toFixed(2)+';'+(0.2+i*0.15).toFixed(2)+';1" dur="8s" repeatCount="indefinite"/></circle>'});
 [[280,430,26],[266,360,40],[300,284,58],[380,220,78]].forEach(function(c){s+='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+(c[2]+26)+'" fill="#D64545" opacity=".10"/>'});
 /* 台風のマーク */
 s+='<g><g><circle r="14" fill="#fff" stroke="#D64545" stroke-width="3"/><path d="M-10 -8 Q0 -20 10 -8 M10 8 Q0 20 -10 8" stroke="#D64545" stroke-width="3" fill="none"/><animateTransform attributeName="transform" type="rotate" values="0;-360" dur="2s" repeatCount="indefinite"/></g><animateMotion dur="8s" repeatCount="indefinite" path="'+tr+'"/></g>';
 s+=WR(440,600,W.bo,11.5,'#8a3b00',900,300)+LBW(140,262,W.cur,11,'#40566B','middle','#fff',230)+LBW(520,174,W.fast,11,'#40566B','middle','#fff',210)+'<path d="M200 452 L256 438" stroke="#0f3558" stroke-width="1.5" stroke-dasharray="3 3"/>'+WR(130,470,W.fc,11,'#0f3558',900,200)+LB(214,392,W.warn,11,'#fff','end','#D64545');
 K=1;return s+'</svg>'},

/* 20 台風の強さと大きさのものさし（気象庁） */
met_ty_scale:function(l){
 var W=({ja:{t1:'強さ（最大風速）',t2:'大きさ（風速15m/s以上の範囲の半径）',s:['強い','非常に強い','猛烈な'],v:['33m/s以上（64kt）','44m/s以上（85kt）','54m/s以上（105kt）'],z:['大型','超大型'],r:['500km以上','800km以上'],n:'台風：最大風速 約17m/s（34kt）以上',jp:'日本列島の長さ（約2,000km）'},
  ko:{t1:'세기(최대풍속)',t2:'크기(풍속 15m/s 이상 범위의 반경)',s:['강한','매우 강한','맹렬한'],v:['33m/s 이상(64kt)','44m/s 이상(85kt)','54m/s 이상(105kt)'],z:['대형','초대형'],r:['500km 이상','800km 이상'],n:'태풍: 최대풍속 약 17m/s(34kt) 이상',jp:'일본 열도 길이(약 2,000km)'},
  en:{t1:'Intensity (maximum wind)',t2:'Size (radius of winds of 15 m/s or more)',s:['Strong','Very strong','Violent'],v:['33 m/s or more (64 kt)','44 m/s or more (85 kt)','54 m/s or more (105 kt)'],z:['Large','Very large'],r:['500 km or more','800 km or more'],n:'Typhoon: maximum wind about 17 m/s (34 kt) or more',jp:'Length of Japan (about 2,000 km)'}})[l];
 if(!W)return F.met_ty_scale('ja');
 var nar=NARROW();K=nar?1.25:1;
 var a=R(0,0,420,330,'#fff',16,' stroke="#D9E3EC"')+tx(210,32,W.t1,15,D,900);
 a+=R(20,52,380,34,'#EEF3F8',10)+tx(210,74,W.n,12,G,800);
 [0,1,2].forEach(function(i){var y=110+i*70,w=[170,230,300][i],c=['#F2B233','#E6772E','#C0392B'][i];
  a+=tx(24,y+22,W.s[i],14,c,900,'start')+'<rect x="130" y="'+y+'" height="34" rx="8" fill="'+c+'" width="0"><animate attributeName="width" values="0;'+(w-40)+';'+(w-40)+'" keyTimes="0;.4;1" dur="4s" begin="'+(i*.3)+'s" repeatCount="indefinite"/></rect>'+tx(140,y+22,W.v[i],12,'#fff',900,'start')});
 var b=R(0,0,420,330,'#fff',16,' stroke="#D9E3EC"')+tx(210,32,W.t2,14,D,900);
 b+='<circle cx="140" cy="190" r="0" fill="#2F8FE0" opacity=".3"><animate attributeName="r" values="0;62;62" keyTimes="0;.4;1" dur="4s" repeatCount="indefinite"/></circle><circle cx="300" cy="190" r="0" fill="#2F6FD6" opacity=".3"><animate attributeName="r" values="0;100;100" keyTimes="0;.4;1" dur="4s" begin=".3s" repeatCount="indefinite"/></circle>';
 b+=tx(140,186,W.z[0],15,'#1d4d8a',900)+tx(140,206,W.r[0],11,'#1d4d8a',800)+tx(300,186,W.z[1],15,'#0f3558',900)+tx(300,206,W.r[1],11,'#0f3558',800);
 b+='<line x1="86" y1="306" x2="334" y2="306" stroke="#6B7785" stroke-width="3"/><line x1="86" y1="300" x2="86" y2="312" stroke="#6B7785" stroke-width="3"/><line x1="334" y1="300" x2="334" y2="312" stroke="#6B7785" stroke-width="3"/>'+tx(210,298,W.jp,10.5,G,800);
 var s;
 if(nar)s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 690" role="img">'+R(0,0,440,690,'#F7FAFD')+'<g transform="translate(10 10)">'+a+'</g><g transform="translate(10 350)">'+b+'</g>';
 else s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 350" role="img">'+R(0,0,880,350,'#F7FAFD')+'<g transform="translate(10 10)">'+a+'</g><g transform="translate(450 10)">'+b+'</g>';
 K=1;return s+'</svg>'},
/* 21 気圧面の高さ：ラジオゾンデが上がると、850〜200hPa の面が順に光る */
met_levels:function(l){
 var W=({ja:{t:'気圧面の高さ（標準大気）',u:['下の層の気温・湿り気、雪か雨か','雲のできやすさ（湿数）、上昇気流','気圧の谷と尾根、上空の寒気','ジェット気流、巡航高度の風','ジェット気流の中心、巡航高度','ジェット気流・圏界面の近く'],son:'ラジオゾンデ（1日2回、世界同時刻に観測）',h:'高さ'},
  ko:{t:'기압면의 높이(표준대기)',u:['아래층의 기온·습도, 눈인지 비인지','구름이 생기기 쉬운지(습수), 상승기류','기압골과 기압마루, 상공의 찬 공기','제트기류, 순항고도의 바람','제트기류의 중심, 순항고도','제트기류·대류권계면 근처'],son:'라디오존데(하루 2회, 세계 동시 관측)',h:'높이'},
  en:{t:'Heights of the pressure levels (standard atmosphere)',u:['Low-level temperature and moisture; snow or rain','Cloud (dew-point depression), rising air','Troughs and ridges, cold air aloft','Jet stream, winds at cruising level','Jet core, cruising level','Jet stream, near the tropopause'],son:'Radiosonde (launched twice a day, worldwide at the same time)',h:'Height'}})[l];
 if(!W)return F.met_levels('ja');
 var nar=NARROW();K=1;
 var L=[['850hPa','約1,500m','5,000ft',70],['700hPa','約3,000m','10,000ft',150],['500hPa','約5,500m','18,000ft',250],['300hPa','約9,000m','FL300',380],['250hPa','約10,400m','FL340',430],['200hPa','約11,800m','FL390',480]];
 if(l!=='ja')L=L.map(function(v){return [v[0],v[1].replace('約',l==='ko'?'약 ':'about '),v[2],v[3]]});
 var H=560,Y=function(v){return H-40-v*0.9};
 var s=R(0,0,640,H,'#F7FAFD')+TTL(320,28,W.t,15,'#0f3558',600);
 s+='<defs><linearGradient id="lvg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#CFE8F7"/><stop offset="1" stop-color="#3F6FA8"/></linearGradient></defs>'+R(20,54,600,H-94,'url(#lvg)',12)+R(20,H-40,600,20,'#9CC98B');
 L.forEach(function(v,i){var y=Y(v[3]).toFixed(0),c=i<2?'#0f3558':'#fff';
  s+='<g><line x1="30" y1="'+y+'" x2="610" y2="'+y+'" stroke="#fff" stroke-width="2" stroke-dasharray="8 6" opacity=".6"/><rect x="30" y="'+(y-22)+'" width="580" height="30" rx="8" fill="#FFD23F" opacity="0"><animate attributeName="opacity" values="0;0;.35;0;0" keyTimes="0;'+(0.08+i*0.13).toFixed(2)+';'+(0.12+i*0.13).toFixed(2)+';'+(0.2+i*0.13).toFixed(2)+';1" dur="8s" repeatCount="indefinite"/></rect></g>';
  s+=tx(40,y-5,v[0],13,c,900,'start')+tx(40+TW(v[0],13)+14,y-5,v[1]+' / '+v[2],11,c,800,'start');
  if(!nar)s+=LB(606,y-5,W.u[i],10.5,'#0f3558','end','#fff')});
 s+='<g><g><ellipse cx="0" cy="-26" rx="16" ry="20" fill="#fff" stroke="#9FB0C2" stroke-width="2"/><line x1="0" y1="-6" x2="0" y2="14" stroke="#6B7785" stroke-width="1.5"/><rect x="-6" y="14" width="12" height="10" fill="#E08A2F"/></g><animateMotion dur="8s" repeatCount="indefinite" path="M'+(nar?560:300)+' '+(H-50)+' L'+(nar?560:300)+' 70"/></g>';
 s+='<g transform="translate(520 '+(Y(430)-12)+')">'+planeS('#fff')+'</g>';
 var y=H+8;
 if(nar){var lh=FS(11)*1.3;L.forEach(function(v,i){var n=LINES(v[0]+(l==='ja'?'：':': ')+W.u[i],11,580).length;s+=WR(30,y+lh*0.8+(n-1)*lh/2,v[0]+(l==='ja'?'：':': ')+W.u[i],11,'#0f3558',800,580,'start');y+=n*lh+8})}
 var ns=LINES(W.son,11,580).length,sh=ns*FS(11)*1.3;s+=WR(320,y+sh/2+FS(11)*0.3,W.son,11,'#40566B',800,580);y+=sh+14;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+y.toFixed(0)+'" role="img">'+s.replace(R(0,0,640,H,'#F7FAFD'),R(0,0,640,y,'#F7FAFD'))+'</svg>'},

/* 22 500hPa の天気図を読む：等高度線、気圧の谷と尾根、線に沿って吹く風 */
met_upper_chart:function(l){
 var W=({ja:{t:'500hPa（上空約5,500m）の天気図',tr:'気圧の谷（トラフ）',ri:'気圧の尾根（リッジ）',lo:'低い（寒い）',hi:'高い（暖かい）',wi:'風は等高度線に沿って吹く（低い方を左に見て）',fast:'線が混む＝風が強い',bad:'谷の前面：上昇気流で天気が悪い',good:'尾根の下：晴れやすい'},
  ko:{t:'500hPa(상공 약 5,500m) 일기도',tr:'기압골(트로프)',ri:'기압마루(리지)',lo:'낮다(춥다)',hi:'높다(따뜻하다)',wi:'바람은 등고도선을 따라 분다(낮은 쪽을 왼쪽에 두고)',fast:'선이 촘촘=바람이 강하다',bad:'기압골 앞쪽: 상승기류로 날씨가 나쁘다',good:'기압마루 아래: 맑기 쉽다'},
  en:{t:'The 500 hPa chart (about 5,500 m up)',tr:'Trough',ri:'Ridge',lo:'Low (cold)',hi:'High (warm)',wi:'Wind blows along the height lines, with low heights on its left',fast:'Crowded lines = strong wind',bad:'Ahead of the trough: rising air, bad weather',good:'Under the ridge: fine weather'}})[l];
 if(!W)return F.met_upper_chart('ja');
 var nar=NARROW();K=nar?1.3:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" role="img">'+R(0,0,640,560,'#F7FAFD')+TTL(320,28,W.t,15,'#0f3558',600)+R(14,44,612,460,'#EEF5FB',12);
 var hs=[5400,5520,5640,5760,5880],cols=['#3F6FD6','#5E8FD9','#8FA7C8','#E3A15B','#D86A3A'];
 function wave(off,amp){return 'M20 '+(150+off)+' C110 '+(150+off)+' 150 '+(150+off+amp)+' 220 '+(150+off+amp)+' C300 '+(150+off+amp)+' 330 '+(150+off-amp*0.7)+' 420 '+(150+off-amp*0.7)+' C500 '+(150+off-amp*0.7)+' 540 '+(150+off)+' 620 '+(150+off)}
 s+='<g><animateTransform attributeName="transform" type="translate" values="-30 0;30 0" dur="12s" repeatCount="indefinite"/>';
 var OFF=[0,28,80,132,184];
 hs.forEach(function(h,i){var off=OFF[i],amp=140-i*10;s+='<path d="'+wave(off,amp)+'" fill="none" stroke="'+cols[i]+'" stroke-width="3"/>'+LB(28,150+off-6,String(h),10,cols[i],'start')});
 s+='<path d="M220 150 L220 470" stroke="#6B4FA0" stroke-width="3" stroke-dasharray="10 6"/>'+LB(220,488,W.tr,11.5,'#fff','middle','#6B4FA0');
 s+='<path d="M420 60 L420 380" stroke="#C0392B" stroke-width="3" stroke-dasharray="4 6"/>'+LB(420,72,W.ri,11.5,'#fff','middle','#C0392B');
 s+='<g opacity=".85">';for(var i=0;i<4;i++){s+='<g><path d="M-10 -5 L6 0 L-10 5 Z" fill="#6B4FA0"/><animateMotion dur="6s" begin="-'+(i*1.5)+'s" repeatCount="indefinite" rotate="auto" path="'+wave(58,125)+'"/></g>'}s+='</g>';
 s+='<ellipse cx="310" cy="300" rx="44" ry="26" fill="#9FB0C2" opacity=".55"/><ellipse cx="290" cy="310" rx="30" ry="18" fill="#9FB0C2" opacity=".55"/>';
 s+='</g>';
 s+=LB(120,96,W.lo+' ↑',11,'#1d4d8a','middle','#DCEBFA')+LB(520,470,W.hi+' ↓',11,'#8a3b00','middle','#FDE7D3');
 s+=LB(320,522,W.wi,11,'#40566B','middle')+LBW(530,120,W.fast,10.5,'#40566B','middle','#fff',180)+LB(300,358,W.bad,10.5,'#fff','middle','#40566B')+LB(430,238,W.good,10.5,'#8a3b00','middle','#FFF1E3');
 K=1;return s+'</svg>'},

/* 23 風の矢羽根を読む：半分の羽根5kt、羽根10kt、旗50kt。気温と湿数も */
met_barbs:function(l){
 var W=({ja:{t:'観測点の記入の読み方',hb:'短い羽根＝5kt',fb:'長い羽根＝10kt',pn:'旗＝50kt',sum:'50＋10＋5＝65kt',from:'棒が出ている方向から風が吹いてくる',tm:'気温',dd:'湿数（気温−露点）',wet:'湿数3℃未満＝湿っていて雲がありそう',ex:'例：西の風 65kt',tms:'気温 −22℃',dds:'湿数 2℃'},
  ko:{t:'관측점 기입 읽는 법',hb:'짧은 깃=5kt',fb:'긴 깃=10kt',pn:'삼각기=50kt',sum:'50+10+5=65kt',from:'막대가 뻗은 방향에서 바람이 불어온다',tm:'기온',dd:'습수(기온−이슬점)',wet:'습수 3℃ 미만=습해서 구름이 있을 듯',ex:'예: 서풍 65kt',tms:'기온 −22℃',dds:'습수 2℃'},
  en:{t:'Reading a station plot',hb:'Short barb = 5 kt',fb:'Long barb = 10 kt',pn:'Pennant = 50 kt',sum:'50 + 10 + 5 = 65 kt',from:'The wind blows from the direction the shaft points',tm:'Temperature',dd:'Dew-point depression (temperature − dew point)',wet:'Depression under 3 °C = moist, cloud likely',ex:'Example: westerly, 65 kt',tms:'Temp −22 °C',dds:'T − Td 2 °C'}})[l];
 if(!W)return F.met_barbs('ja');
 var nar=NARROW();K=nar?1.3:1;
 var cx=380,cy=240;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 520" role="img">'+R(0,0,640,520,'#F7FAFD')+TTL(320,28,W.t,15,'#0f3558',600)+R(14,44,612,300,'#fff',14,' stroke="#D9E3EC"');
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="12" fill="#fff" stroke="#243447" stroke-width="3"/>';
 s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx-230)+'" y2="'+cy+'" stroke="#243447" stroke-width="4"/>';
 function ap(d,g){return '<g opacity="0">'+g+'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+d+';'+(d+.05).toFixed(2)+';.92;1" dur="8s" repeatCount="indefinite"/></g>'}
 s+=ap(.1,'<path d="M'+(cx-230)+' '+cy+' L'+(cx-230)+' '+(cy-50)+' L'+(cx-196)+' '+cy+' Z" fill="#243447"/>');
 s+=ap(.35,'<line x1="'+(cx-186)+'" y1="'+cy+'" x2="'+(cx-200)+'" y2="'+(cy-50)+'" stroke="#243447" stroke-width="4"/>');
 s+=ap(.6,'<line x1="'+(cx-166)+'" y1="'+cy+'" x2="'+(cx-173)+'" y2="'+(cy-25)+'" stroke="#243447" stroke-width="4"/>');
 s+=ap(.1,LB(110,cy-72,W.pn,11.5,'#fff','middle','#243447'))+ap(.35,LB(180,cy+34,W.fb,11.5,'#fff','middle','#40566B'))+ap(.6,LB(270,cy-64,W.hb,11.5,'#fff','middle','#6B7785'))+ap(.8,LB(200,cy+76,W.sum,14,'#fff','middle','#E08A2F'));
 s+=tx(cx+22,cy-10,'−22',16,'#D64545',900,'start')+tx(cx+22,cy+24,'2',16,'#2F6FD6',900,'start');
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="30" fill="#2F6FD6" opacity=".12"/>';
 s+=LB(cx+86,cy-16,'← '+W.tms,11,'#D64545','start','#FDE7D3')+LB(cx+50,cy+20,'← '+W.dds,11,'#1d4d8a','start','#DCEBFA');
 s+=LB(320,318,W.ex,12,'#0f3558','middle','#EEF3F8');
 s+=R(14,358,612,146,'#fff',14,' stroke="#D9E3EC"');
 s+=WR(320,390,W.from,12,D,800,580)+WR(320,432,W.wet,12,'#1d4d8a',800,580);
 s+='<circle cx="80" cy="472" r="12" fill="#fff" stroke="#243447" stroke-width="3"/><circle cx="80" cy="472" r="20" fill="#2F6FD6" opacity=".2"/>'+tx(110,478,W.dd+' < 3℃',11.5,G,800,'start');
 K=1;return s+'</svg>'},

/* 24 渦度：谷では反時計回り（正）、尾根では時計回り（負）。谷の前面で空気が上がる */
met_vort:function(l){
 var W=({ja:{t:'渦度（うずの強さ）',tr:'谷：反時計回り＝正の渦度',ri:'尾根：時計回り＝負の渦度',up:'谷の前面：空気が上がり雲ができる',dn:'谷の後ろ：空気が下がり晴れる',wind:'西風'},
  ko:{t:'와도(소용돌이의 세기)',tr:'기압골: 반시계=양의 와도',ri:'기압마루: 시계 방향=음의 와도',up:'기압골 앞쪽: 공기가 올라가 구름이 생긴다',dn:'기압골 뒤쪽: 공기가 내려가 맑다',wind:'서풍'},
  en:{t:'Vorticity (how strongly the air spins)',tr:'Trough: anticlockwise = positive vorticity',ri:'Ridge: clockwise = negative vorticity',up:'Ahead of the trough: air rises and cloud forms',dn:'Behind the trough: air sinks and skies clear',wind:'Westerly'}})[l];
 if(!W)return F.met_vort('ja');
 var nar=NARROW();K=nar?1.3:1;
 var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img">'+R(0,0,640,480,'#F7FAFD')+TTL(320,28,W.t,15,'#0f3558',600)+R(14,44,612,400,'#EEF5FB',12);
 var wv='M20 150 C120 150 140 330 220 330 C300 330 330 110 430 110 C520 110 560 200 620 200';
 s+='<path d="'+wv+'" fill="none" stroke="#6B7785" stroke-width="10" opacity=".25"/><path d="'+wv+'" fill="none" stroke="#6B4FA0" stroke-width="4" stroke-dasharray="16 12"><animate attributeName="stroke-dashoffset" values="0;-56" dur="1.2s" repeatCount="indefinite"/></path>';
 function wheel(x,y,dir,c){var g='<g transform="translate('+x+' '+y+')"><circle r="34" fill="#fff" stroke="'+c+'" stroke-width="3"/><g>';for(var a=0;a<4;a++)g+='<path d="M0 0 L0 -28 L10 -20 Z" fill="'+c+'" transform="rotate('+(a*90)+')"/>';return g+'<animateTransform attributeName="transform" type="rotate" values="0;'+(dir*360)+'" dur="3s" repeatCount="indefinite"/></g></g>'}
 s+=wheel(220,300,-1,'#2F6FD6')+wheel(430,140,1,'#D64545');
 s+=LB(220,368,W.tr,11,'#fff','middle','#2F6FD6')+LB(430,86,W.ri,11,'#fff','middle','#D64545');
 s+='<g opacity=".9">'+cloud(330,250,1,'#DCE3EA')+'</g><g>'+ARW(330,300,330,262,'#E08A2F',4)+'<animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite"/></g>'+LB(330,420,W.up,11,'#8a3b00','middle','#FFF1E3');
 s+='<g>'+ARW(110,200,110,238,'#2F6FD6',4)+'<animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite"/></g>'+LB(28,262,W.dn,10.5,'#1d4d8a','start','#DCEBFA');
 s+=ARW(40,72,120,72,'#6B4FA0',4)+tx(130,77,W.wind,11,'#6B4FA0',800,'start');
 K=1;return s+'</svg>'}
};
/* 題名が折り返したとき：背景と題名はそのまま、残りの中身を dy だけ下げ、図の高さ（viewBox）と背景を伸ばす */
function SHIFTTTL(h){var m=/<g data-ttl="(\d+)" data-dy="([\d.]+)">/.exec(h);if(!m)return h;var dy=+m[2];if(dy<0.5)return h;
 var so=h.indexOf('<svg'),se=h.indexOf('>',so)+1,ce=h.lastIndexOf('</svg>');if(so<0||ce<0)return h;
 var open=h.slice(so,se),vb=/viewBox="([\d.\-]+) ([\d.\-]+) ([\d.]+) ([\d.]+)"/.exec(open);if(!vb)return h;
 var H0=+vb[4],H1=H0+dy;open=open.replace(vb[0],'viewBox="'+vb[1]+' '+vb[2]+' '+vb[3]+' '+H1.toFixed(1)+'"');
 var inner=h.slice(se,ce),ts=inner.indexOf(m[0]),te=inner.indexOf('</g>',ts)+4,title=inner.slice(ts,te);inner=inner.slice(0,ts)+inner.slice(te);
 var bg='',bm=/^<rect x="0" y="0" width="[\d.]+" height="([\d.]+)"[^>]*\/>/.exec(inner);
 if(bm){bg=bm[0].replace('height="'+bm[1]+'"','height="'+(+bm[1]+dy).toFixed(1)+'"');inner=inner.slice(bm[0].length)}
 return h.slice(0,so)+open+bg+title+'<g transform="translate(0 '+dy.toFixed(1)+')">'+inner+'</g>'+h.slice(ce)}
/* FIX2：一度描いて表示の倍率を求め、最小の文字の大きさを決めて描き直す */
function FIX2(fn){return function(l){FLOORU=0;K=1;var s1=fn(l),m=/viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) [\d.]+"/.exec(s1);if(!m)return s1;
 var vw=+m[1],w=Math.min(740,(function(){try{var iw=window.innerWidth||1024,cw=(document.documentElement&&document.documentElement.clientWidth)||iw;return Math.min(iw,cw)}catch(e){return 1024}})()-40),mm=/min-width:(\d+)px/.exec(s1);if(mm)w=Math.max(w,+mm[1]);
 FLOORU=FLOORPX*vw/w;var s2=SHIFTTTL(fn(l));FLOORU=0;K=1;return s2.replace('<svg ','<svg data-flr="1" ')}}
for(var k in F)window.FIGS[k]=FIX2(F[k]);
/* ほかの図のファイル（figs_nav.js など）から同じ部品を使えるように公開する */
window.FIGH={R:R,tx:tx,WR:WR,LB:LB,LBW:LBW,TTL:TTL,planeS:planeS,LINES:LINES,ARW:ARW,SCR:SCR,plane:plane,cloud:cloud,FR:FR,TW:TW,NARROW:NARROW,FIX2:FIX2,FS:FS,setK:function(v){K=v},C:{D:D,B:B,T:T,O:O,RD:RD,P:P,G:G}};
})();
