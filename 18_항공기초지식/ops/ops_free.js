/* 運航管理の練習 ― 経路を自分で作る（2026.10.25）
   航空路図の練習.html から読み込む。ページ側の R・ri・lang・PT・hav・pad・$・render・C・DEP・KAC・JAC を使う。
   データ：route_net.js（window.RNET。日本AIP ENR 3.1・3.3 2026-10-01版の地点・区間・向き、韓国は既存の4経路、空港は OurAirports）
   書き方：飛行計画書の経路の欄と同じ「出発空港 最初の地点 航空路 地点 航空路 地点 … 到着空港」。DCT（直行）も使える
   ・出発・到着の方式（SID・STAR）のデータはないので、日本の空港は「空港から 15〜100NM（到着は 10〜100NM）の航空路上の地点」を最初・最後の地点の目安にする。
     韓国の空港は既存の方式の地点だけ（仁川 EGOBA／SEL、金浦 MONSI／SOT、済州 LOSNI／KIDOS）
   ・航空路の向き：表の矢印から判定した一方通行を守る（逆向きはまちがいとして知らせる）
   ・教育用の略図・データで、航法には使えない */
(function(){
var N=window.RNET;if(!N)return;
function L3(ja,ko,en){return {ja:ja,ko:ko,en:en}}
function tx(o){return o[lang]||o.ja}
function E(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var NEAR=100,KR={};N.kr.forEach(function(k){KR[k]=1});
var BND={LANAT:1,SAPRA:1};   /* 仁川FIRと福岡FIRの境界の地点 */
var TX={
 h:L3('経路を自分で作る','경로 직접 만들기','Build your own route'),
 lead:L3('出発・到着の空港を選び、飛行計画書の経路の欄と同じ書き方で経路を書きます。下の候補を押すと続きを足せます。完成すると、たどる・問題・飛行計画などのタブでその経路を練習できます。','출발·도착 공항을 고르고, 비행계획서 경로 칸과 같은 방식으로 경로를 씁니다. 아래 후보를 누르면 이어서 추가됩니다. 완성하면 따라가기·문제·비행계획 등의 탭에서 그 경로로 연습할 수 있습니다.','Choose the departure and arrival airports, then write the route the way it goes in a flight plan. Tap a suggestion to add the next part. When the route is complete, practise it in Follow, Quiz, Flight plan and the other tabs.'),
 dep:L3('出発','출발','From'),arr:L3('到着','도착','To'),rt:L3('経路','경로','Route'),
 sug:L3('経路の例を作る','경로 예 만들기','Suggest a route'),back:L3('1つ戻す','하나 지우기','Undo'),clr:L3('消す','지우기','Clear'),
 nx:L3('次に書けるもの：','다음에 쓸 수 있는 것:','Next:'),
 ok:L3('経路ができました','경로가 완성되었습니다','Route complete'),
 sum:L3('{n} 区間 · 約 {d} NM · 巡航高度の例 {f}','{n}개 구간 · 약 {d} NM · 순항 고도 예 {f}','{n} legs · about {d} NM · example cruise level {f}'),
 need:L3('経路を完成させると、地図と各タブで練習できます。','경로를 완성하면 지도와 각 탭에서 연습할 수 있습니다.','Complete the route to practise it on the map and in each tab.'),
 nosug:L3('この組み合わせでは、データにある航空路で経路を作れませんでした（韓国側は既存の4経路だけです）。','이 조합으로는 데이터에 있는 항공로로 경로를 만들지 못했습니다(한국 쪽은 기존 4개 경로뿐입니다).','No route could be made with the airways in the data for this pair (Korea has only the four existing routes).'),
 same:L3('出発と到着が同じです。','출발과 도착이 같습니다.','Departure and arrival are the same.'),
 e_dep:L3('最初は出発空港 {x} を書きます。','처음에는 출발 공항 {x}를 씁니다.','Start with the departure airport {x}.'),
 e_sid:L3('{t} は出発方式の終点としては遠すぎるか、データにない地点です（目安：空港から15〜100NMの航空路上の地点）。','{t}는 출발 절차의 종료 지점으로는 너무 멀거나 데이터에 없는 지점입니다(기준: 공항에서 15~100NM 거리의 항공로 위 지점).','{t} is too far from the airport, or unknown, to end a departure (guide: a point on an airway 15–100 NM away).'),
 e_star:L3('{c} から到着空港へは遠すぎます（目安：100NM以内の地点から到着方式へ）。','{c}에서 도착 공항까지는 너무 멉니다(기준: 100NM 이내 지점에서 도착 절차로).','{c} is too far from the arrival airport (guide: start the arrival within 100 NM).'),
 e_after:L3('到着空港のあとには何も書きません。','도착 공항 뒤에는 아무것도 쓰지 않습니다.','Nothing goes after the arrival airport.'),
 e_awy:L3('{t} はデータにない航空路か地点です。','{t}는 데이터에 없는 항공로 또는 지점입니다.','{t} is not an airway or point in the data.'),
 e_noton:L3('{c} は {t} の上にありません。','{c}는 {t} 위에 없습니다.','{c} is not on {t}.'),
 e_notonq:L3('{q} は {t} の上にありません。','{q}는 {t} 위에 없습니다.','{q} is not on {t}.'),
 e_dir:L3('{t} は {a} → {b} の向きには飛べません（一方通行）。','{t}는 {a} → {b} 방향으로는 비행할 수 없습니다(일방통행).','{t} cannot be flown from {a} to {b} (one-way).'),
 e_dct:L3('DCT のあとには地点を書きます。','DCT 뒤에는 지점을 씁니다.','Write a point after DCT.'),
 w_dct:L3('DCT（直行）は練習用に使えますが、実際は管制の許可や空域の条件が必要です。','DCT(직행)는 연습용으로 쓸 수 있지만, 실제로는 관제 허가나 공역 조건이 필요합니다.','DCT is allowed here for practice; in real operations it needs ATC approval and airspace conditions.'),
 data:L3('データ：{j}・{k}。空港の座標：OurAirports。教育用で、航法には使えません。','데이터: {j}·{k}. 공항 좌표: OurAirports. 교육용이며 항법에 쓸 수 없습니다.','Data: {j} / {k}. Airport positions: OurAirports. For learning only, not for navigation.'),
 apt:L3('空港','공항','Airport'),
 part:L3('書きかけ：{n} 区間 · 約 {d} NM。到着空港まで続けてください。','작성 중: {n}개 구간 · 약 {d} NM. 도착 공항까지 이어 써 주세요.','In progress: {n} legs · about {d} NM. Continue to the arrival airport.'),
 APPC:L3('到着の管制（アプローチ）','도착 관제(어프로치)','Approach control'),
 HOFF:L3('ここで隣のFIRの管制へ引き継ぎ','여기서 인접 FIR 관제로 이양','Hand-off to the next FIR here')};
function msg(k,v){var s=tx(TX[k]);for(var x in v)s=s.split('{'+x+'}').join(v[x]);return s}
function pos(k){return N.pt[k]||(N.apt[k]&&[N.apt[k][0],N.apt[k][1]])}
function dist(a,b){var p=pos(a),q=pos(b);return p&&q?hav(p,q)[0]:1e9}
function aptName(k){var a=N.apt[k];return a?(lang==='en'?a[4]:lang==='ko'?a[3]:a[2]):k}
/* 航空路：区間 i（p[i]→p[i+1]）の向き。D＝表の順、U＝逆、B＝両方 */
function canFly(w,i,fwd){var c=N.aw[w].d.charAt(i);return c==='B'||(fwd?c==='D':c==='U')}
/* 地点 c から、航空路 w で行ける地点（向きを守る） */
function reach(w,c){var A=N.aw[w];if(!A)return [];var p=A.p,i=p.indexOf(c),o=[];if(i<0)return o;
 for(var j=i;j<p.length-1&&canFly(w,j,true);j++)o.push(p[j+1]);for(j=i;j>0&&canFly(w,j-1,false);j--)o.push(p[j-1]);return o}
var BYPT=null;function awAt(c){if(!BYPT){BYPT={};Object.keys(N.aw).forEach(function(w){N.aw[w].p.forEach(function(k){(BYPT[k]=BYPT[k]||[]).push(w)})})}return (BYPT[c]||[]).filter(function(w){return reach(w,c).length})}
function onNet(k){return !!(BYPT||awAt(k)&&BYPT)[k]}
function isKrApt(k){return /^RK/.test(k)}
function sidOk(dep,f){if(isKrApt(dep))return (N.sid[dep]||[]).indexOf(f)>=0;var d=dist(dep,f);return !!N.pt[f]&&onNet(f)&&!KR[f]&&d>=15&&d<=NEAR}
function starOk(arr,f){if(isKrApt(arr))return (N.star[arr]||[]).indexOf(f)>=0;var d=dist(arr,f);return !!N.pt[f]&&!KR[f]&&d>=10&&d<=NEAR}
function sidList(dep){if(isKrApt(dep))return (N.sid[dep]||[]).slice();awAt('');return Object.keys(BYPT).filter(function(k){return sidOk(dep,k)}).sort(function(a,b){return dist(dep,a)-dist(dep,b)})}
function nextAfterFix(c,arr){var o=awAt(c).slice();if(starOk(arr,c))o.push(arr);o.push('DCT');return o}
/* 経路の文字を読む。{ok, legs:[{a,b,via}], err:[位置,文], next:[…], warn} */
function parse(str,dep,arr){var t=String(str||'').trim().toUpperCase().split(/\s+/).filter(Boolean),legs=[],cur,i,warn='';
 if(!dep||!arr)return {legs:legs,next:[]};
 if(!t.length)return {legs:legs,next:[dep]};
 if(t[0]!==dep)return {err:[0,msg('e_dep',{x:dep})],legs:legs,next:[dep]};
 if(t.length===1)return {legs:legs,next:sidList(dep).slice(0,14)};
 if(!sidOk(dep,t[1]))return {err:[1,msg('e_sid',{t:t[1]})],legs:legs,next:sidList(dep).slice(0,14)};
 legs.push({a:dep,b:t[1],via:'SID'});cur=t[1];i=2;
 while(i<t.length){var tk=t[i];
  if(tk===arr){if(!starOk(arr,cur))return {err:[i,msg('e_star',{c:cur})],legs:legs,next:nextAfterFix(cur,arr)};legs.push({a:cur,b:arr,via:'APP'});if(i!==t.length-1)return {err:[i+1,msg('e_after')],legs:legs};return {ok:true,legs:legs,warn:warn}}
  if(tk==='DCT'){var q0=t[i+1];if(!q0)return {legs:legs,next:[],warn:warn,dct:1};if(!N.pt[q0])return {err:[i+1,msg('e_dct')],legs:legs,next:[]};legs.push({a:cur,b:q0,via:'DCT'});cur=q0;i+=2;warn=msg('w_dct');continue}
  var A=N.aw[tk];if(!A)return {err:[i,msg('e_awy',{t:tk})],legs:legs,next:nextAfterFix(cur,arr)};
  var ia=A.p.indexOf(cur);if(ia<0)return {err:[i,msg('e_noton',{c:cur,t:tk})],legs:legs,next:nextAfterFix(cur,arr)};
  if(i+1>=t.length)return {legs:legs,next:reach(tk,cur),warn:warn};
  var q=t[i+1],ib=A.p.indexOf(q);if(ib<0)return {err:[i+1,msg('e_notonq',{q:q,t:tk})],legs:legs,next:reach(tk,cur)};
  if(ib===ia)return {err:[i+1,msg('e_notonq',{q:q,t:tk})],legs:legs,next:reach(tk,cur)};
  var fwd=ib>ia,j;for(j=ia;fwd?j<ib:j>ib;j+=fwd?1:-1){if(!canFly(tk,fwd?j:j-1,fwd))return {err:[i,msg('e_dir',{t:tk,a:A.p[j],b:A.p[j+(fwd?1:-1)]})],legs:legs,next:reach(tk,cur)};legs.push({a:A.p[j],b:A.p[j+(fwd?1:-1)],via:tk})}
  cur=q;i+=2}
 return {legs:legs,next:nextAfterFix(cur,arr),warn:warn}}
/* 経路の例：航空路の網で一番短い道（向きを守る）。DCT と低い高度用の V・W 経路は使わない */
function suggest(dep,arr){if(!dep||!arr||dep===arr)return '';awAt('');var st=sidList(dep),best={},prev={},Q=[];
 st.forEach(function(k){best[k]=dist(dep,k);prev[k]=null;Q.push(k)});
 var done={},goal=null,gd=1e9;
 while(Q.length){Q.sort(function(a,b){return best[a]-best[b]});var c=Q.shift();if(done[c])continue;done[c]=1;
  if(best[c]>=gd)break;if(starOk(arr,c)){var g=best[c]+dist(c,arr);if(g<gd){gd=g;goal=c}}
  awAt(c).forEach(function(w){if(/^[VW]\d/.test(w))return;var A=N.aw[w],p=A.p,i=p.indexOf(c);[[1,true],[-1,false]].forEach(function(dd){var j=i;while(true){var n=j+dd[0];if(n<0||n>=p.length||!canFly(w,dd[1]?j:j-1,dd[1]))break;var nd=best[c]+dist(c,p[n])*1.0;if(best[p[n]]===undefined||nd<best[p[n]]-1e-6){best[p[n]]=nd;prev[p[n]]=[c,w];Q.push(p[n])}j=n;break}})})}
 if(!goal)return '';var seq=[],k=goal;while(prev[k]){seq.unshift([prev[k][1],k]);k=prev[k][0]}
 var out=[dep,k],lastW=null;seq.forEach(function(x){if(x[0]===lastW)out[out.length-1]=x[1];else{out.push(x[0],x[1]);lastW=x[0]}});out.push(arr);return out.join(' ')}
/* 代替空港の目安：到着空港から 40〜250NM で一番近い空港 */
function alt(dest){var b=null,bd=1e9;Object.keys(N.apt).forEach(function(k){if(k===dest||isKrApt(k)!==isKrApt(dest))return;var d=dist(dest,k);if(d>=40&&d<=250&&d<bd){bd=d;b=k}});if(b)PT[b]=pos(b);return b}
/* 練習用の便を組み立てる（R の形） */
function build(dep,arr,p){var legs=p.legs,pts=[dep].concat(legs.map(function(l){return l.b}));pts.forEach(function(k){PT[k]=pos(k)});
 var cum=[0];for(var i=1;i<pts.length;i++)cum.push(cum[i-1]+dist(pts[i-1],pts[i]));var tot=cum[cum.length-1],cl=Math.min(150,tot*.3),ds=tot-Math.min(160,tot*.35);
 var hasK=pts.some(function(k){return KR[k]||isKrApt(k)}),hasJ=pts.some(function(k){return !KR[k]&&!isKrApt(k)&&!BND[k]}),fir='';
 if(hasK&&hasJ)pts.forEach(function(k){if(BND[k]&&!fir)fir=k});
 var main=0,mc=0;legs.forEach(function(l){var h=hav(pos(l.a),pos(l.b));if(h[0]>main){main=h[0];mc=(h[1]+8+360)%360}});
 var odd=mc<180,fl=tot<220?(odd?230:240):tot<450?(odd?310:320):(odd?350:360);
 var s=pts.map(function(k,i){var via=i<legs.length?legs[i].via:'',ph=i===0?'dep':i===pts.length-1?'arr':cum[i]<=cl?'clb':cum[i]>=ds?'des':'crz';
  var ctl=i===0?DEP:i===pts.length-1?C('到着','도착','Arrival'):via==='APP'?TX.APPC:k===fir?TX.HOFF:(KR[k]?KAC:JAC);return [k,via,ctl,ph]});
 var aws=[];legs.forEach(function(l){if(/^[A-Z]{1,2}\d/.test(l.via)&&aws.indexOf(l.via)<0)aws.push(l.via)});
 var pool=Object.keys(N.aw).filter(function(w){return aws.indexOf(w)<0&&!/^[ABGRVW]\d/.test(w)});
 return {id:'free',map:'free',name:R[ri].name,fl:'FL'+fl,odd:odd,fir:fir,s:s,ex:[dep].concat(compact(legs)).join(' '),awOpts:aws.concat(pool.sort(function(){return Math.random()-.5}).slice(0,6))}}
function compact(legs){var o=[],w=null;legs.forEach(function(l,i){if(i===0){o.push(l.b);return}if(l.via==='APP'){o.push(l.b);return}if(l.via===w&&l.via!=='DCT')o[o.length-1]=l.b;else{o.push(l.via,l.b);w=l.via}});return o}
/* 地図（自由な経路用。緯度経度をそのまま平面に。表示の範囲は経路に合わせる） */
function prj(k){var p=pos(k);if(!p)return null;var P=N.prj;return [(p[1]-P[0])*P[2]*P[3],(P[1]-p[0])*P[2]]}
function mapSVG(r,cur,partial){var INK='#1B2B4B',MAG='#8E3B8A',ks=r&&r.s.length?r.s.map(function(x){return x[0]}):partial||[],pts=ks.map(prj).filter(Boolean);
 var x0,y0,x1,y1;if(pts.length){x0=Math.min.apply(null,pts.map(function(p){return p[0]}));x1=Math.max.apply(null,pts.map(function(p){return p[0]}));y0=Math.min.apply(null,pts.map(function(p){return p[1]}));y1=Math.max.apply(null,pts.map(function(p){return p[1]}))}
 else{var a=prj('RJTT'),b=prj('RKSI');x0=b[0]-40;x1=a[0]+60;y0=a[1]-140;y1=a[1]+80}
 var w=Math.max(x1-x0,60),h=Math.max(y1-y0,40),cx=(x0+x1)/2,cy=(y0+y1)/2,ar=Math.max(.85,Math.min(1.7,w/h));w*=1.3;h*=1.3;if(w/h<ar)w=h*ar;else h=w/ar;var vb=[cx-w/2,cy-h/2,w,h],k=Math.max(w,h*1.2)/900;
 var s='<svg viewBox="'+vb.map(function(v){return v.toFixed(1)}).join(' ')+'" role="img"><defs><clipPath id="fc"><rect x="'+vb[0]+'" y="'+vb[1]+'" width="'+w+'" height="'+h+'"/></clipPath></defs><rect x="'+vb[0]+'" y="'+vb[1]+'" width="'+w+'" height="'+h+'" fill="#DDEBF6"/><g clip-path="url(#fc)"><path d="'+N.land+'" fill="#EDE3C8" stroke="#A89B78" stroke-width="'+(.6*k).toFixed(2)+'"/>';
 /* 航空路の網（薄く） */
 var net='';Object.keys(N.aw).forEach(function(nm){var P=N.aw[nm].p.map(prj);for(var i=0;i<P.length-1;i++){var a=P[i],b=P[i+1];if(!a||!b)continue;if(Math.max(a[0],b[0])<vb[0]||Math.min(a[0],b[0])>vb[0]+w||Math.max(a[1],b[1])<vb[1]||Math.min(a[1],b[1])>vb[1]+h)continue;net+='M'+a[0].toFixed(1)+' '+a[1].toFixed(1)+'L'+b[0].toFixed(1)+' '+b[1].toFixed(1)}});
 s+='<path d="'+net+'" stroke="#9FB3C8" stroke-width="'+(1.1*k).toFixed(2)+'" fill="none" opacity=".75"/>';
 if(pts.length>1){s+='<polyline points="'+pts.map(function(p){return p.join(',')}).join(' ')+'" fill="none" stroke="'+(r?'#9AA7B5':'#2F8FE0')+'" stroke-width="'+(3*k).toFixed(2)+'" stroke-dasharray="'+(7*k)+' '+(5*k)+'"/>';
  if(r&&cur>0)s+='<polyline points="'+pts.slice(0,cur+1).map(function(p){return p.join(',')}).join(' ')+'" fill="none" stroke="#2F8FE0" stroke-width="'+(4*k).toFixed(2)+'"/>';
  if(r&&cur<pts.length-1)s+='<line x1="'+pts[cur][0]+'" y1="'+pts[cur][1]+'" x2="'+pts[cur+1][0]+'" y2="'+pts[cur+1][1]+'" stroke="#E08A2F" stroke-width="'+(4*k).toFixed(2)+'"/>'}
 var many=ks.length>18;ks.forEach(function(nm,i){var p=prj(nm);if(!p)return;var apt=!!N.apt[nm],on=r&&i===cur,col=r&&i<=cur?'#2F8FE0':INK;
  if(apt)s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(7*k)+'" fill="#fff" stroke="'+col+'" stroke-width="'+(2.4*k)+'"/>';
  else s+='<path d="M'+p[0]+' '+(p[1]-7*k)+' L'+(p[0]+6.5*k)+' '+(p[1]+4.5*k)+' L'+(p[0]-6.5*k)+' '+(p[1]+4.5*k)+' Z" fill="#fff" stroke="'+col+'" stroke-width="'+(1.8*k)+'"/>';
  if(r&&nm===r.fir)s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(13*k)+'" fill="none" stroke="'+MAG+'" stroke-width="'+(2*k)+'"/>';
  if(!many||apt||on||i%2===0)s+='<text x="'+p[0]+'" y="'+(p[1]+(i%2?20:-12)*k)+'" font-size="'+((on?13:11)*k).toFixed(2)+'" font-weight="800" text-anchor="middle" fill="'+(on?'#b3600a':col)+'" font-family="Arial" paint-order="stroke" stroke="#fff" stroke-width="'+(2.5*k).toFixed(2)+'">'+nm+'</text>'});
 if(r&&pts.length){var p=pts[cur],q=pts[Math.min(cur+1,pts.length-1)],pv=pts[Math.max(cur-1,0)],ang=cur<pts.length-1?Math.atan2(q[1]-p[1],q[0]-p[0]):Math.atan2(p[1]-pv[1],p[0]-pv[0]);
  s+='<g transform="translate('+p[0]+','+p[1]+') rotate('+(ang*180/Math.PI)+') scale('+k+')"><circle r="17" fill="#FFE9CC" opacity=".8"/>'+(window.ACFT?'<g transform="scale(.68)">'+window.ACFT.top({c:'#E08A2F',w:'#F4B979',line:'#7a3e0a'})+'</g>':'<path transform="scale(.68)" d="M20 0 L-20 -6 L-14 0 L-20 6 Z" fill="#E08A2F"/>')+'</g>'}
 return s+'</g><rect x="'+vb[0]+'" y="'+vb[1]+'" width="'+w+'" height="'+h+'" fill="none" stroke="'+INK+'" stroke-width="'+(1.5*k)+'"/></svg>'}
/* 入力の画面 */
var S={dep:'RJTT',arr:'RJCC',route:''};try{var sv=JSON.parse(localStorage.getItem('acn-free-route')||'null');if(sv&&N.apt[sv.dep]&&N.apt[sv.arr])S=sv}catch(e){}
function save(){try{localStorage.setItem('acn-free-route',JSON.stringify(S))}catch(e){}}
function aptOpts(sel){var ks=Object.keys(N.apt).sort(function(a,b){var ka=isKrApt(a),kb=isKrApt(b);return ka!==kb?(ka?-1:1):a<b?-1:1});return ks.map(function(k){return '<option value="'+k+'"'+(k===sel?' selected':'')+'>'+k+' '+E(aptName(k))+'</option>'}).join('')}
var lastKey='';
function apply(){var p=parse(S.route,S.dep,S.arr),key=p.ok?S.dep+'|'+S.arr+'|'+p.legs.map(function(l){return l.b+l.via}).join(','):'';save();
 var r=R[ri];if(p.ok){if(key!==lastKey){var b=build(S.dep,S.arr,p);for(var x in b)r[x]=b[x];lastKey=key;step=0;QZ=null;render();return}}else{if(r.s.length){r.s=[];lastKey='';render();return}}
 status(p)}
function status(p){p=p||parse(S.route,S.dep,S.arr);var st=$('frSt'),nx=$('frNx');if(!st)return;
 if(S.dep===S.arr){st.innerHTML='<span style="color:var(--ng)">'+tx(TX.same)+'</span>';nx.innerHTML='';return}
 var h='';if(p.err)h='<span style="color:var(--ng);font-weight:700">'+E(p.err[1])+'</span>';
 else if(!p.ok&&p.legs&&p.legs.length){var dd=0;p.legs.forEach(function(l){dd+=dist(l.a,l.b)});h='<span style="color:var(--sub)">'+msg('part',{n:p.legs.length,d:Math.round(dd)})+'</span>'}
 else if(p.ok){var r=R[ri],L=legs(r);h='<span style="color:var(--ok);font-weight:800">✔ '+tx(TX.ok)+'</span> · '+msg('sum',{n:L.length-1,d:L.total,f:r.fl})}
 if(p.warn)h+='<div style="color:#9A6B12;font-size:13px;margin-top:4px">'+E(p.warn)+'</div>';st.innerHTML=h;
 var n=(p.next||[]).slice(0,16);nx.innerHTML=n.length?'<span style="color:var(--sub)">'+tx(TX.nx)+'</span>'+n.map(function(k){return '<button type="button" class="pill" data-nx="'+k+'" style="min-height:32px;padding:4px 10px;font-size:13px">'+k+(N.apt[k]?' ('+E(aptName(k))+')':'')+'</button>'}).join(''):'';
 Array.prototype.forEach.call(nx.querySelectorAll('[data-nx]'),function(b){b.onclick=function(){var v=b.getAttribute('data-nx'),t=S.route.trim().split(/\s+/).filter(Boolean);if(p.err)t=t.slice(0,p.err[0]);t.push(v);S.route=t.join(' ')+' ';$('frRt').value=S.route;apply();try{$('frRt').focus()}catch(e){}}});
 if(!R[ri].s.length){var ks=[S.dep].concat((p.legs||[]).map(function(l){return l.b}));$('map').innerHTML=mapSVG(null,0,ks)}}
function ui(box){if(box.getAttribute('data-l')===lang&&$('frRt')){status();return}box.setAttribute('data-l',lang);
 box.innerHTML='<div class="card" style="margin-top:4px"><h3 style="margin:0 0 4px">'+tx(TX.h)+'</h3><p style="margin:0 0 10px;font-size:13.5px;color:var(--sub)">'+tx(TX.lead)+'</p>'+
  '<div class="kv" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px"><label>'+tx(TX.dep)+'<br><select id="frDep" style="width:100%;min-height:38px">'+aptOpts(S.dep)+'</select></label><label>'+tx(TX.arr)+'<br><select id="frArr" style="width:100%;min-height:38px">'+aptOpts(S.arr)+'</select></label></div>'+
  '<label style="display:block;margin-top:8px;font-size:13px;color:var(--sub)">'+tx(TX.rt)+'</label><input id="frRt" value="'+E(S.route)+'" placeholder="'+S.dep+' …" style="width:100%;box-sizing:border-box;font:600 16px Consolas,Menlo,monospace;padding:10px;border:1.5px solid var(--line);border-radius:10px;margin:6px 0" autocomplete="off" autocapitalize="characters" spellcheck="false">'+
  '<div id="frSt" style="font-size:14px;min-height:20px"></div><div id="frNx" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px"></div>'+
  '<div class="ctl" style="margin-top:10px"><button type="button" class="btn" id="frSg">'+tx(TX.sug)+'</button><button type="button" class="btn sec" id="frBk">'+tx(TX.back)+'</button><button type="button" class="btn sec" id="frCl">'+tx(TX.clr)+'</button></div>'+
  '<p style="margin:10px 0 0;font-size:12px;color:var(--sub)">'+E(msg('data',{j:N.ver.jp,k:tx({ja:N.ver.kr,ko:'한국 AIP(기존 4개 경로)',en:'Korean AIP (four existing routes)'})}))+'</p></div>';
 $('frDep').onchange=function(){S.dep=this.value;S.route=S.dep+' ';$('frRt').value=S.route;apply()};
 $('frArr').onchange=function(){S.arr=this.value;apply()};
 $('frRt').oninput=function(){S.route=this.value.toUpperCase();apply()};
 $('frSg').onclick=function(){var g=suggest(S.dep,S.arr);if(!g){$('frSt').innerHTML='<span style="color:var(--ng)">'+tx(TX.nosug)+'</span>';return}S.route=g;$('frRt').value=g;apply()};
 $('frBk').onclick=function(){var t=S.route.trim().split(/\s+/).filter(Boolean);t.pop();S.route=t.join(' ')+(t.length?' ':'');$('frRt').value=S.route;apply()};
 $('frCl').onclick=function(){S.route=S.dep+' ';$('frRt').value=S.route;apply()};
 status()}
function init(){var r=R[ri];if(r.id!=='free'||r.s.length)return;var p=parse(S.route,S.dep,S.arr);if(p.ok){var b=build(S.dep,S.arr,p);for(var x in b)r[x]=b[x];lastKey=S.dep+'|'+S.arr+'|'+p.legs.map(function(l){return l.b+l.via}).join(',')}}
/* ほかのタブ用 */
function wrongAw(cur){var ks=Object.keys(N.aw).filter(function(w){return w!==cur&&/^Y\d/.test(w)});return ks[Math.floor(Math.random()*ks.length)]}
function wrongFix(r){var ks=Object.keys(N.pt).filter(function(k){return !KR[k]&&r.s.every(function(x){return x[0]!==k})}).filter(function(k){return dist(k,r.s[r.s.length-1][0])>150});return ks[Math.floor(Math.random()*ks.length)]||'LANAT'}
window.FREE={parse:parse,build:build,suggest:suggest,alt:alt,ui:ui,init:init,mapSVG:mapSVG,need:function(){return tx(TX.need)},city:function(k){var a=N.apt[k];return a?a[4]:k},pos:pos,wrongAw:wrongAw,wrongFix:wrongFix,
 name:L3('✎ 経路を自分で作る','✎ 경로 직접 만들기','✎ Build your own route')};
})();
