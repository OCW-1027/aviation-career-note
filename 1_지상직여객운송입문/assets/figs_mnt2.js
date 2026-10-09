/* 航空機と整備：機体の形を使った図（2026.10）— 1-4 mnt_zones、4-4 mnt_deice_ac、5-4 mnt_cond_ac。
   aircraft.js の上から見た絵（ACFT.top：原点が機体の中心、長さ40、機首は右）の上に番号の印を置き、説明は下の一覧に書く。
   figs_met.js の後に読み込み、window.FIGH の部品を使う。印の位置は絵の単位（機体の長さ40）で書く */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D;
function BADGE(x,y,n,sz,bg,fc){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+(bg||'#FFD23F')+'" stroke="#fff" stroke-width="2.5"/><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="none" stroke="#0f3558" stroke-width="1.2"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,fc||'#0f3558',900)}
/* 一覧：番号の色を項目ごとに変えられる */
function LIST(items,y,w,sz,cols,fcs){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz,cols&&cols[i],fcs&&fcs[i])+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
function SVG(h,s){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+h.toFixed(0)+'" role="img">'+R(0,0,640,h,'#F7FAFD')+s+'</svg>'}
function TOP(t){return {s:TTL(320,30,t,15,'#0f3558',600),y:24+LI(t,15,600).length*FS(15)*1.3+16}}
function KEY(y,t,bg){var n=LI(t,11,560).length,lh=FS(11)*1.3;return {s:H.LBW(320,y+FS(11)*0.6+(n-1)*lh/2,t,11,'#fff','middle',bg,560),y:y+n*lh+20}}
/* 上から見た機体。sc は1単位の大きさ。戻り値の P(ux,uy) で絵の上の位置を図の座標に直す */
var SC=12.5;
function PLANE(y){var cx=320,cy=y+16.75*SC+8,s=R(20,y-6,600,32.75*SC+28,'#EAF1F8',14);
 s+='<g transform="translate('+cx+' '+cy+') scale('+SC+')">'+(window.ACFT&&window.ACFT.top?window.ACFT.top({type:'737'}):'')+'</g>';
 return {s:s,y:cy+16*SC+18,P:function(ux,uy){return [cx+ux*SC,cy+uy*SC]}}}
function poly(P,pts,c,op){return '<path d="M'+pts.map(function(p){var q=P(p[0],p[1]);return q[0].toFixed(1)+' '+q[1].toFixed(1)}).join(' L')+' Z" fill="'+c+'" opacity="'+(op||.35)+'"/>'}
function mirror(pts){return pts.map(function(p){return [p[0],-p[1]*0.97]})}
/* ゆっくり点滅する輪（どこを見るかを示す） */
function PULSE(x,y,c,d){return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="14" fill="none" stroke="'+c+'" stroke-width="3" opacity="0"><animate attributeName="r" values="12;24" dur="2.4s" begin="'+(d||0)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="2.4s" begin="'+(d||0)+'s" repeatCount="indefinite"/></circle>'}
function MARKS(P,list,sz,bg,fc,pulse){var s='';list.forEach(function(m,i){var q=P(m[1],m[2]);if(pulse)s+=PULSE(q[0],q[1],pulse,(i%4)*0.6);s+=BADGE(q[0],q[1],m[0],sz,bg,fc)});return s}

var LW=[[5,-2.4],[-0.6,-15.6],[-2.6,-15.2],[-0.4,-2.3]];          /* 左の主翼（上面のだいたいの形） */
var LS=[[-12,-1.6],[-16.4,-7.9],[-17.8,-7.7],[-15.4,-1.6]];        /* 左の水平尾翼 */
var LT=[[4.4,-2.3],[0.9,-11.6],[-1.3,-11.2],[-0.3,-2.3]];          /* 左の主翼の燃料タンク（内側） */

var F={
/* 航空機と整備 1-4 エンジン・APU・燃料タンクの位置 */
mnt_zones:function(l){
 var W=({ja:{t:'エンジン・APU・燃料タンクの位置（B737の例）',n:['エンジン（左右）：主翼の下に1基ずつ','APU：尾部の先にある小さなガスタービン。地上で電気（B737は空気も）をつくる','主翼の燃料タンク（左右）：主翼の中がそのまま燃料タンクになっている','中央のタンク：胴体の中、左右の主翼の付け根の間','給油口：B737は右主翼の下面（場所は機種で違う）★'],k:'燃料は左右の釣り合いを保って入れる。左右の量の差には上限がある★'},
  ko:{t:'엔진·APU·연료탱크의 위치(B737의 예)',n:['엔진(좌우): 주날개 아래에 1기씩','APU: 꼬리 끝에 있는 작은 가스터빈. 지상에서 전기(B737은 공기도)를 만든다','주날개 연료탱크(좌우): 주날개 안이 그대로 연료탱크다','중앙 탱크: 동체 안, 좌우 주날개 뿌리 사이','급유구: B737은 오른쪽 주날개 아랫면(위치는 기종마다 다름)★'],k:'연료는 좌우 균형을 맞춰 넣는다. 좌우 연료량 차이에는 한도가 있다★'},
  en:{t:'Where the engines, APU and fuel tanks are (B737 example)',n:['Engines (left and right): one under each wing','APU: a small gas turbine in the tail cone. On the ground it makes electrical power (and, on the B737, air)','Wing tanks (left and right): the inside of each wing is itself a fuel tank','Centre tank: inside the fuselage, between the two wing roots','Refuelling point: on the B737, under the right wing (the place differs by type)★'],k:'Fuel is loaded keeping left and right in balance; there is a limit on the difference between the two sides★'}})[l];
 if(!W)return F.mnt_zones('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=PLANE(T.y),P=A.P;s+=A.s;
 s+=poly(P,LT,'#E08A2E',.45)+poly(P,mirror(LT),'#E08A2E',.45)+poly(P,[[4.4,-1.9],[-0.3,-1.9],[-0.3,1.9],[4.4,1.9]],'#C9561E',.4);
 s+=MARKS(P,[[1,8.6,-5.5],[1,8.6,5.3],[2,-18.6,0],[3,0.9,-8.6],[3,0.9,8.4],[4,2.1,0],[5,3.3,10.2]],12,'#FFD23F','#0f3558','#E08A2E');
 var L=LIST(W.n,A.y+4,600,11);s+=L.s;var K=KEY(L.y+12,W.k,'#0f3558');return SVG(K.y,s+K.s)},

/* 航空機と整備 4-4 雪・霜・氷を確かめる面と、液をかけない所 */
mnt_deice_ac:function(l){
 var W=({ja:{t:'確かめて取り除く面と、液を直接かけない所（B737の例）',n:['主翼の上面：雪・霜・氷を残さない。離陸の揚力にいちばん影響する','水平尾翼：上の面も下の面も確かめる','胴体の上面：積もった雪は、翼や尾翼に落ちる前に取り除く','垂直尾翼：左右の両面','液を直接かけない所：エンジンの空気の取り入れ口・APU・ピトー管と静圧孔・操縦室の窓など（機種の手順による）★'],k:'作業車の位置と散布の順番は、機種の手順と各社の防除雪氷の手順で決まる★'},
  ko:{t:'확인하고 제거하는 면과 제빙액을 직접 뿌리지 않는 곳(B737의 예)',n:['주날개 윗면: 눈·서리·얼음을 남기지 않는다. 이륙 양력에 가장 크게 영향을 준다','수평꼬리날개: 윗면과 아랫면 모두 확인한다','동체 윗면: 쌓인 눈은 날개나 꼬리날개로 떨어지기 전에 제거한다','수직꼬리날개: 좌우 양면','직접 뿌리지 않는 곳: 엔진 공기흡입구·APU·피토관과 정압공·조종실 창문 등(기종 절차에 따름)★'],k:'작업 차량의 위치와 살포 순서는 기종 절차와 각 사의 제빙·방빙 절차로 정한다★'},
  en:{t:'Surfaces to check and clear, and places fluid must not be sprayed directly (B737 example)',n:['Upper wing surfaces: leave no snow, frost or ice; they matter most for lift on take-off','Horizontal stabilisers: check both the upper and lower surfaces','Top of the fuselage: clear built-up snow before it slides onto the wings and tail','Vertical stabiliser (fin): both sides','Do not spray directly: engine inlets, the APU, pitot tubes and static ports, flight deck windows and similar (per the type’s procedure)★'],k:'Truck positions and spraying order follow the aircraft type’s procedure and each airline’s de-icing procedure★'}})[l];
 if(!W)return F.mnt_deice_ac('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=PLANE(T.y),P=A.P;s+=A.s;
 s+=poly(P,LW,'#2F8FE0',.32)+poly(P,mirror(LW),'#2F8FE0',.32)+poly(P,LS,'#2F8FE0',.32)+poly(P,mirror(LS),'#2F8FE0',.32)+poly(P,[[17,-1.6],[-11,-1.6],[-11,1.6],[17,1.6]],'#2F8FE0',.22);
 /* 作業車（左右の主翼の前）と、液の霧 */
 [[-1,1],[1,1]].forEach(function(sg,i){var q=P(9.5,sg[0]*12.2),x=q[0],y=q[1];
  s+='<g><rect x="'+(x-26)+'" y="'+(y-13)+'" width="52" height="26" rx="6" fill="#E08A2E" stroke="#fff" stroke-width="2"/><rect x="'+(x+12)+'" y="'+(y-9)+'" width="12" height="18" rx="3" fill="#fff" opacity=".85"/>';
  var t=P(2.2,sg[0]*9.8);s+='<line x1="'+(x-18)+'" y1="'+y+'" x2="'+t[0]+'" y2="'+t[1]+'" stroke="#8a5a1e" stroke-width="3" stroke-linecap="round"/>';
  for(var k=0;k<3;k++)s+='<circle cx="'+(t[0]-6+k*6)+'" cy="'+(t[1]+(k-1)*6)+'" r="5" fill="#9FD4FF" opacity="0"><animate attributeName="opacity" values="0;.9;0" dur="1.6s" begin="'+(i*0.5+k*0.25)+'s" repeatCount="indefinite"/></circle>';
  s+='</g>'});
 s+=MARKS(P,[[1,-0.4,-7.8],[1,-0.4,7.6],[2,-15.3,-5.2],[2,-15.3,5.1],[3,-5.5,0],[4,-14,0]],12,'#FFD23F','#0f3558','#2F8FE0');
 s+=MARKS(P,[[5,8.9,-5.5],[5,8.9,5.3],[5,-19.2,0],[5,16.6,-2.6]],12,'#D64545','#fff');
 var cols=['#FFD23F','#FFD23F','#FFD23F','#FFD23F','#D64545'],fcs=['#0f3558','#0f3558','#0f3558','#0f3558','#fff'];
 var L=LIST(W.n,A.y+4,600,11,cols,fcs);s+=L.s;var K=KEY(L.y+12,W.k,'#0f3558');return SVG(K.y,s+K.s)},

/* 航空機と整備 5-4 臨時の点検：機体のどこを見るか */
mnt_cond_ac:function(l){
 var W=({ja:{t:'臨時の点検：機体のどこを見るか（B737の例）',n:['落雷：電流が入った所と出た所。機首・翼の先・水平尾翼の先・尾部などに小さな焦げ跡がないか','鳥衝突：当たった所。機首・操縦室の窓・エンジン・翼の前縁。エンジンは内部まで見ることがある','ハードランディング：脚と脚の取付部、胴体と主翼の付け根まわりの構造'],k:'実際の範囲と方法は、製造者の手順書と各社の整備規程で決まる★'},
  ko:{t:'비정기 점검: 기체의 어디를 보는가(B737의 예)',n:['낙뢰: 전류가 들어간 곳과 나간 곳. 기수·날개 끝·수평꼬리날개 끝·꼬리 부분 등에 작은 그을음 자국이 없는지','조류 충돌: 부딪힌 곳. 기수·조종실 창문·엔진·날개 앞전. 엔진은 내부까지 보기도 한다','하드 랜딩: 착륙장치와 그 장착부, 동체와 주날개 뿌리 주변 구조'],k:'실제 범위와 방법은 제작사 매뉴얼과 각 사의 정비규정으로 정한다★'},
  en:{t:'Unscheduled inspections: where on the aircraft to look (B737 example)',n:['Lightning: where the current entered and left. Look for small burn marks at the nose, wing tips, stabiliser tips, tail and similar places','Bird strike: where it hit. Nose, flight deck windows, engines, wing leading edges. Engines may be inspected inside','Hard landing: the landing gear and its attachments, and the structure around the wing-to-body joint'],k:'The actual scope and method follow the manufacturer’s manual and each airline’s maintenance rules★'}})[l];
 if(!W)return F.mnt_cond_ac('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=PLANE(T.y),P=A.P;s+=A.s;
 var C=['#7A5CC7','#D64545','#E08A2E'];
 s+=MARKS(P,[[1,19.3,0],[1,-1.6,-15.4],[1,-1.6,14.8],[1,-17.4,-7.6],[1,-17.4,7.4],[1,-19.6,0]],12,C[0],'#fff',C[0]);
 s+=MARKS(P,[[2,16,-2.8],[2,8.9,-5.5],[2,8.9,5.3],[2,2.6,-9.4],[2,2.6,9.2]],12,C[1],'#fff',C[1]);
 s+=MARKS(P,[[3,1.4,-3.4],[3,1.4,3.4],[3,12.6,0]],12,C[2],'#fff',C[2]);
 var L=LIST(W.n,A.y+4,600,11,C,['#fff','#fff','#fff']);s+=L.s;var K=KEY(L.y+12,W.k,'#0f3558');return SVG(K.y,s+K.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
