/* 旅客ハンドリングの実務（GND）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う。
   数字は一般的な例（★は確認が要る値）。作り方は figs_cgo.js と同じ（640幅・動く図・日本語／韓国語／英語） */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,LB=H.LB,TTL=H.TTL,ARW=H.ARW,setK=H.setK,FS=H.FS,LI=H.LINES;
var D=H.C.D;
function BADGE(x,y,n,sz,bg){var r=Math.max(11,FS(sz)*0.72);return '<circle cx="'+x+'" cy="'+y+'" r="'+r.toFixed(1)+'" fill="'+(bg||'#FFD23F')+'" stroke="#0f3558" stroke-width="1.5"/>'+tx(x,y+FS(sz)*0.35,String(n),sz,'#0f3558',900)}
function SEG(i,n,lo,hi){var a=i/n,b=(i+1)/n;if(i===n-1)return 'values="'+lo+';'+lo+';'+hi+';'+hi+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';1"';if(i===0)return 'values="'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"';return 'values="'+lo+';'+lo+';'+hi+';'+hi+';'+lo+';'+lo+'" keyTimes="0;'+a.toFixed(3)+';'+(a+0.005).toFixed(3)+';'+b.toFixed(3)+';'+(b+0.005).toFixed(3)+';1"'}
function GLOW(x,y,w,h,i,n,dur,rx){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||10)+'" fill="#FFD23F" opacity="0"><animate attributeName="opacity" '+SEG(i,n,0,.45)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'}
function LIST(items,y,w,sz){var g='';items.forEach(function(v,i){var n=LI(v,sz,w-80).length,lh=FS(sz)*1.3,h=n*lh+12;g+=R(20,y,w,h,i%2?'#fff':'#F4F7FB',8)+BADGE(42,y+h/2,i+1,sz)+WR(64,y+6+n*lh/2+FS(sz)*0.3,v,sz,D,800,w-80,'start');y+=h+4});return {s:g,y:y}}
function SVG(h,s){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+h.toFixed(0)+'" role="img">'+R(0,0,640,h,'#F7FAFD')+s+'</svg>'}
function TOP(t){return {s:TTL(320,30,t,15,'#0f3558',600),y:24+LI(t,15,600).length*FS(15)*1.3+16}}
/* 上端をそろえて折り返す（WR は中央合わせなので、行数の半分だけ下げる） */
function WT(x,y,t,sz,c,w,mw,a){return WR(x,y+(LI(t,sz,mw).length-1)*FS(sz)*1.3/2,t,sz,c,w,mw,a)}
/* 横の目盛り：区間の色・目盛り・左から右へ動く印 */
function SCALE(y,mx,step,zones,unit,dur){var x0=40,x1=600,X=function(v){return x0+v/mx*(x1-x0)},o='';
 zones.forEach(function(z,i){o+='<rect x="'+X(z[0])+'" y="'+y+'" width="'+(X(z[1])-X(z[0]))+'" height="26" fill="'+z[2]+'"/>'});
 for(var v=0;v<=mx;v+=step){o+='<line x1="'+X(v)+'" y1="'+(y+26)+'" x2="'+X(v)+'" y2="'+(y+34)+'" stroke="#5B6B7D" stroke-width="1.5"/>'+tx(X(v),y+34+FS(9)+4,String(v),9,'#5B6B7D',700)}
 o+=tx(x1,y+34+FS(9)*2.4+8,unit,9,'#5B6B7D',700,'end');
 o+='<path d="M0 0 L-9 -14 L9 -14 Z" fill="#0f3558"><animateMotion dur="'+(dur||'9s')+'" repeatCount="indefinite" path="M'+X(mx*0.02)+' '+(y-2)+' L'+X(mx*0.98)+' '+(y-2)+'"/></path>';
 return {s:o,y:y+34+FS(9)*2.4+22,X:X}}
/* 色の枠のカードを横に並べる（高さはそろえる） */
function ZCARDS(y,z,cols){var cw=(600-12*(z.length-1))/z.length,zh=0,th=0,o='';z.forEach(function(c){var t=LI(c[0],12,cw-16).length*FS(12)*1.3;if(t>th)th=t});z.forEach(function(c){var h=14+th+8+LI(c[1],10,cw-20).length*FS(10)*1.3+14;if(h>zh)zh=h});
 z.forEach(function(c,i){var x=20+i*(cw+12);o+=R(x,y,cw,zh,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="6" rx="3" fill="'+cols[i]+'"/>'+WT(x+cw/2,y+12+FS(12),c[0],12,cols[i],900,cw-16)+WT(x+cw/2,y+14+th+8+FS(10),c[1],10,D,800,cw-20)});
 return {s:o,y:y+zh+14}}
/* 縦の手順：左に番号と内容、右に時刻や担当の札。順に光る */
function STEPS2(y,st,who,pc,dur){var s='',lh=FS(11)*1.3,n=st.length;
 st.forEach(function(x,i){var nn=LI(x,11,380).length,nw=LI(who[i],10,130).length,h=Math.max(nn*lh,nw*FS(10)*1.3)+22;
  s+=R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+GLOW(20,y,600,h,i,n,dur)+BADGE(44,y+h/2,i+1,11)+WR(66,y+h/2+FS(11)*0.35,x,11,D,800,380,'start')+R(462,y+6,150,h-12,pc[i%pc.length],8)+WR(537,y+h/2+FS(10)*0.35,who[i],10,'#fff',900,130);
  y+=h;if(i<n-1){s+=ARW(240,y+2,240,y+12,'#9FB0C2',3);y+=14}});
 return {s:s,y:y}}
/* 時間の軸（出発前の逆算）：番号の印を軸に置き、説明は下に2列で */
function TL(y,mx,step,marks,unit,dur){var x0=50,x1=600,X=function(v){return x0+(mx-v)/mx*(x1-x0)},r0=FS(9)*0.75+3,o='';y+=r0*4+30;
 o+='<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="#9FB0C2" stroke-width="5" stroke-linecap="round"/>';
 for(var v=0;v<=mx;v+=step){o+='<line x1="'+X(v)+'" y1="'+(y-6)+'" x2="'+X(v)+'" y2="'+(y+6)+'" stroke="#5B6B7D" stroke-width="2"/>'+tx(X(v),y+FS(9)+14,String(v),9,'#5B6B7D',700)}
 o+=tx(x0,y+FS(9)*2.4+18,unit,9,'#5B6B7D',700,'start');
 marks.forEach(function(m,i){var cx=X(m[0]),cy=y-28-(i%2)*(r0*2+6);o+='<line x1="'+cx+'" y1="'+(cy+r0)+'" x2="'+cx+'" y2="'+y+'" stroke="'+m[2]+'" stroke-width="2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r0.toFixed(1)+'" fill="'+m[2]+'"/>'+tx(cx,cy+FS(9)*0.36,String(i+1),9,'#fff',900)});
 o+='<circle cx="0" cy="'+y+'" r="7" fill="#0f3558"><animateMotion dur="'+(dur||'8s')+'" repeatCount="indefinite" path="M'+x0+' 0 L'+x1+' 0"/></circle>';
 var yy=y+FS(9)*2.4+30,lh=FS(10)*1.3;
 for(var i=0;i<marks.length;i+=2){var h=0;[i,i+1].forEach(function(k){if(marks[k]){var hh=Math.max(LI(marks[k][1],10,250).length*lh,r0*2)+12;if(hh>h)h=hh}});
  [i,i+1].forEach(function(k,j){var m=marks[k];if(!m)return;var x=20+j*306;o+=R(x,yy,294,h,'#fff',8,' stroke="#D5DEE8"')+'<circle cx="'+(x+8+r0)+'" cy="'+(yy+h/2)+'" r="'+r0.toFixed(1)+'" fill="'+m[2]+'"/>'+tx(x+8+r0,yy+h/2+FS(9)*0.36,String(k+1),9,'#fff',900)+WR(x+16+r0*2,yy+h/2+FS(10)*0.35,m[1],10,D,800,294-24-r0*2,'start')});
  yy+=h+6}
 return {s:o,y:yy+4}}
/* 上から見た機体（機首は右）。x0..x1 が胴体、cy が中心線 */
function PLANE(x0,x1,cy,fw){var o='',L=x1-x0,wx=x0+L*0.42;
 o+='<path d="M'+wx+' '+(cy-fw/2)+' L'+(wx-L*0.12)+' '+(cy-fw/2-120)+' L'+(wx+L*0.02)+' '+(cy-fw/2-120)+' L'+(wx+L*0.2)+' '+(cy-fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+wx+' '+(cy+fw/2)+' L'+(wx-L*0.12)+' '+(cy+fw/2+120)+' L'+(wx+L*0.02)+' '+(cy+fw/2+120)+' L'+(wx+L*0.2)+' '+(cy+fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+(x0+20)+' '+(cy-fw/2)+' L'+(x0-10)+' '+(cy-fw/2-46)+' L'+(x0+14)+' '+(cy-fw/2-46)+' L'+(x0+60)+' '+(cy-fw/2)+' Z M'+(x0+20)+' '+(cy+fw/2)+' L'+(x0-10)+' '+(cy+fw/2+46)+' L'+(x0+14)+' '+(cy+fw/2+46)+' L'+(x0+60)+' '+(cy+fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+x0+' '+(cy-fw/2)+' L'+(x1-40)+' '+(cy-fw/2)+' Q'+(x1+10)+' '+(cy-fw/2)+' '+(x1+14)+' '+cy+' Q'+(x1+10)+' '+(cy+fw/2)+' '+(x1-40)+' '+(cy+fw/2)+' L'+x0+' '+(cy+fw/2)+' Q'+(x0-24)+' '+cy+' '+x0+' '+(cy-fw/2)+' Z" fill="#fff" stroke="#5B6B7D" stroke-width="2"/>';
 return {s:o,wx:wx,L:L}}
/* 左の項目 → 右の扱い。行が順に光る */
function ROWMAP(y,rows,dur){var s='',n=rows.length,lw=250,rx=330;
 rows.forEach(function(r,i){var nl=Math.max(LI(r[0],11,lw-24).length,LI(r[1],10,270).length),h=nl*FS(11)*1.3+20;
  s+=GLOW(20,y-3,600,h+6,i,n,dur,10)+R(20,y,lw,h,'#fff',10,' stroke="#C8D3DE"')+WR(20+lw/2,y+h/2+FS(11)*0.35,r[0],11,D,800,lw-24)+ARW(20+lw+8,y+h/2,rx-8,y+h/2,r[2],3)+R(rx,y,290,h,r[2],10)+WR(rx+145,y+h/2+FS(10)*0.35,r[1],10,'#fff',900,270);
  y+=h+10});
 return {s:s,y:y}}
var F={
/* 1-2 案内に入れる3つのこと：なぜ・いつ・何を（文例は一つの例） */
gnd_ann3:function(l){
 var W=({ja:{t:'お客様が知りたい3つのこと：1回の案内で全部伝える',c:[['なぜ','遅れている理由','「出発機の到着が遅れているため」'],['いつ','出発の見込み・次の案内','「出発は15時30分の予定です」'],['何を','してもらえること','「お食事券をお配りします」']],n:['理由は分かりやすい言葉で。専門用語や外国語は避ける','時刻が決まらないときは「次のご案内の時刻」を約束する','日本語・英語など、どの言語でも同じ内容を伝える']},
  ko:{t:'승객이 알고 싶은 세 가지: 한 번의 안내로 모두 전한다',c:[['왜','늦어지는 이유','「출발 항공기의 도착이 늦어져」'],['언제','출발 예정·다음 안내','「출발은 15시 30분 예정입니다」'],['무엇을','받을 수 있는 것','「식사권을 나눠 드립니다」']],n:['이유는 알기 쉬운 말로. 전문 용어나 외국어는 피한다','시각이 정해지지 않으면 「다음 안내 시각」을 약속한다','한국어·영어 등 어느 언어로도 같은 내용을 전한다']},
  en:{t:'The three things passengers want to know: cover them all in one announcement',c:[['Why','The reason for the delay','“Because the inbound aircraft is arriving late”'],['When','Expected departure, next update','“Departure is now expected at 15:30”'],['What','What we will do for you','“We will hand out meal vouchers”']],n:['Give the reason in plain words; avoid jargon','If the time is not fixed, promise the time of the next announcement','Give the same content in every language you announce in']}})[l];
 if(!W)return F.gnd_ann3('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='9s',cw=192,ch=0;
 W.c.forEach(function(c){var h=36+LI(c[1],10,cw-24).length*FS(10)*1.3+LI(c[2],10,cw-28).length*FS(10)*1.3+44;if(h>ch)ch=h});
 var cols=['#1769e0','#E08A2E','#2E9B5F'];
 W.c.forEach(function(c,i){var x=20+i*(cw+12);
  s+=R(x,y,cw,ch,'#fff',12,' stroke="#C8D3DE"')+GLOW(x,y,cw,ch,i,3,dur,12)+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="34" rx="12" fill="'+cols[i]+'"/><rect x="'+x+'" y="'+(y+20)+'" width="'+cw+'" height="14" fill="'+cols[i]+'"/>';
  s+=BADGE(x+20,y+17,i+1,10,'#fff')+tx(x+cw/2+8,y+17+FS(13)*0.35,c[0],13,'#fff',900);
  var yy=y+46;s+=WT(x+cw/2,yy+FS(10)*0.35,c[1],10,D,800,cw-24);yy+=LI(c[1],10,cw-24).length*FS(10)*1.3+10;
  var qh=LI(c[2],10,cw-28).length*FS(10)*1.3+12;s+=R(x+10,yy,cw-20,qh,'#EEF3F7',8)+WR(x+cw/2,yy+qh/2+FS(10)*0.35,c[2],10,'#0f3558',700,cw-28)});
 y+=ch+14;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-3 カウンターで確かめる4項目。1つでも分からなければ責任者へ */
gnd_doc4:function(l){
 var W=({ja:{t:'書類確認の4項目：全部そろって初めて搭乗券を出す',st:['パスポートの有効性：期限・残存期間・種類・破損','写真と本人の一致：帽子・サングラス・マスクは外してもらう','ビザ：目的地と乗り継ぎ地の両方。使用済みでないか','航空券：名前・旅程・有効期限が予約と一致するか'],who:['旅券','本人の顔','入国の条件（TIMATIC など）','予約・航空券'],ok:'4つともOK → 搭乗券を発行',ng:'1つでも分からない → 責任者に相談（独断で通さない）',n:['確認しないまま運ぶと入国拒否（INAD）になり、航空会社が送還の費用や罰金を負うことがある','入国の条件は国と時期で変わる。毎回、最新の情報で確かめる']},
  ko:{t:'서류 확인 4항목: 모두 갖춰져야 탑승권을 발행한다',st:['여권 유효성: 만료일·잔여 기간·종류·훼손','사진과 본인 일치: 모자·선글라스·마스크는 벗어 달라고 한다','비자: 목적지와 환승지 모두. 이미 사용하지 않았는지','항공권: 이름·여정·유효기간이 예약과 일치하는지'],who:['여권','본인 얼굴','입국 조건(TIMATIC 등)','예약·항공권'],ok:'4가지 모두 OK → 탑승권 발행',ng:'하나라도 불확실 → 책임자와 상의(독단으로 통과시키지 않는다)',n:['확인 없이 운송하면 입국 거부(INAD)가 되어, 항공사가 송환 비용이나 벌금을 부담할 수 있다','입국 조건은 나라와 시기에 따라 바뀐다. 매번 최신 정보로 확인한다']},
  en:{t:'Four document checks: issue the boarding pass only when all four are in order',st:['Passport validity: expiry, remaining validity, type, damage','Photo matches the passenger: ask them to remove hats, sunglasses, masks','Visa: for the destination and the transit point; not already used','Ticket: name, itinerary and validity match the booking'],who:['Passport','The passenger','Entry rules (TIMATIC etc.)','Booking and ticket'],ok:'All four OK → issue the boarding pass',ng:'Any doubt → ask the supervisor (never wave it through)',n:['Carrying a passenger without proper checks can lead to refused entry (INAD), and the airline may pay removal costs or fines','Entry rules change by country and over time; check the latest information every time']}})[l];
 if(!W)return F.gnd_doc4('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='9s',lh=FS(11)*1.3,pc=['#1769e0','#2C8C8C','#E08A2E','#7A5CC7'],n=W.st.length;
 W.st.forEach(function(x,i){var nn=LI(x,11,380).length,nw=LI(W.who[i],10,130).length,h=Math.max(nn*lh,nw*FS(10)*1.3)+24;
  s+=R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+GLOW(20,y,600,h,i,n,dur)+BADGE(44,y+h/2,i+1,11)+WR(66,y+h/2+FS(11)*0.35,x,11,D,800,380,'start')+R(462,y+6,150,h-12,pc[i],8)+WR(537,y+h/2+FS(10)*0.35,W.who[i],10,'#fff',900,130);
  y+=h;if(i<n-1){s+=ARW(240,y+2,240,y+12,'#9FB0C2',3);y+=14}});
 y+=12;s+=LB(320,y+FS(11)*0.6,W.ok,11,'#fff','middle','#2E9B5F');y+=FS(11)*1.3+14;
 s+=LB(320,y+FS(11)*0.6,W.ng,11,'#fff','middle','#D64545');y+=FS(11)*1.3+18;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-4 乗り継ぎの2つのパターン：搭乗券と手荷物がどこまで通るか */
gnd_conx:function(l){
 var W=({ja:{t:'乗り継ぎ：搭乗券と手荷物はどこまで通るか',p:['自社便どうし','他社便との乗り継ぎ'],a:['出発地','乗継地','目的地'],bp:['搭乗券：最終目的地まで発行できることが多い','搭乗券：提携（インターライン）があれば発行'],bg:['手荷物：最終目的地までスルー','手荷物：取り決めがあれば目的地まで。なければ乗継地で受け取り、預け直し'],n:['乗り継ぎ時間が最低乗り継ぎ時間（MCT）以上あるか確かめる','乗り継ぎ地の書類（通過のビザなど）も、最初のカウンターで確かめる']},
  ko:{t:'환승: 탑승권과 수하물은 어디까지 연결되는가',p:['자사편끼리','타사편과의 환승'],a:['출발지','환승지','목적지'],bp:['탑승권: 최종 목적지까지 발행할 수 있는 경우가 많다','탑승권: 제휴(인터라인)가 있으면 발행'],bg:['수하물: 최종 목적지까지 스루','수하물: 협정이 있으면 목적지까지. 없으면 환승지에서 찾아 다시 부친다'],n:['환승 시간이 최소 환승 시간(MCT) 이상인지 확인한다','환승지의 서류(통과 비자 등)도 첫 카운터에서 확인한다']},
  en:{t:'Connections: how far boarding passes and bags go',p:['Same airline throughout','Connecting to another airline'],a:['Origin','Transfer','Destination'],bp:['Boarding pass: usually issued to the final destination','Boarding pass: issued if there is an interline agreement'],bg:['Bags: checked through to the final destination','Bags: through if there is an agreement; otherwise collected and re-checked at the transfer point'],n:['Check the connection time is at least the minimum connecting time (MCT)','Check documents for the transfer point (such as a transit visa) at the first counter']}})[l];
 if(!W)return F.gnd_conx('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='6s';
 [0,1].forEach(function(p){var top=y,col=p?'#E08A2E':'#2E9B5F',xs=[90,320,550],ly=top+70;
  var h=86+LI(W.bp[p],10,560).length*FS(10)*1.3+LI(W.bg[p],10,560).length*FS(10)*1.3+30;
  s+=R(20,top,600,h,'#fff',12,' stroke="#C8D3DE"')+'<rect x="20" y="'+top+'" width="8" height="'+h+'" rx="4" fill="'+col+'"/>'+tx(40,top+24,W.p[p],13,'#0f3558',900,'start');
  s+='<line x1="'+xs[0]+'" y1="'+ly+'" x2="'+xs[2]+'" y2="'+ly+'" stroke="#9FB0C2" stroke-width="4"'+(p?' stroke-dasharray="10 6"':'')+'/>';
  xs.forEach(function(x,i){s+='<circle cx="'+x+'" cy="'+ly+'" r="9" fill="#0f3558"/>'+tx(x,ly+26,W.a[i],10,'#5B6B7D',800)});
  var to=p?xs[1]:xs[2];s+='<rect x="-9" y="-9" width="18" height="16" rx="3" fill="'+col+'" stroke="#0f3558" stroke-width="1.2"><animateMotion dur="'+dur+'" repeatCount="indefinite" path="M'+xs[0]+' '+(ly-22)+' L'+to+' '+(ly-22)+'"/></rect>';
  if(p)s+=tx(xs[1]+(xs[2]-xs[1])/2,ly-30,'?',16,col,900);
  var yy=ly+46;s+=WT(40,yy,W.bp[p],10,D,800,560,'start');yy+=LI(W.bp[p],10,560).length*FS(10)*1.3+4;s+=WT(40,yy,W.bg[p],10,col,900,560,'start');
  y=top+h+12});
 var L=LIST(W.n,y+2,600,11);return SVG(L.y+8,s+L.s)},

/* 1-5 非常口座席：7つの条件をすべて満たす人だけ（15歳は韓国の基準の例） */
gnd_exit:function(l){
 var W=({ja:{t:'非常口座席に座れる人：7つの条件をすべて満たす',ex:'非常口',c:['体力・動作：ドアや非常口を操作し、すぐに脱出できる','年齢：15歳未満は不可（韓国の基準の例）','理解・伝達：脱出の案内と乗務員の指示が分かり、ほかの人に伝えられる','視覚・聴覚：一般的な眼鏡・補聴器以外の補助具なしで役割を果たせる','同行者：世話が必要な子ども・お客様を連れていない','意思：決まりを守り、役割を引き受ける意思がある','特別なお客様でない：妊娠中の方、幼児・小児連れの方は不可']},
  ko:{t:'비상구 좌석에 앉을 수 있는 사람: 7가지 조건을 모두 충족',ex:'비상구',c:['체력·동작: 문과 비상구를 조작하고 바로 탈출할 수 있다','나이: 15세 미만 불가(한국 기준의 예)','이해·전달: 탈출 안내와 승무원 지시를 이해하고 다른 사람에게 전할 수 있다','시각·청각: 일반 안경·보청기 외의 보조 기구 없이 역할을 할 수 있다','동반자: 돌봄이 필요한 아이·승객을 데리고 있지 않다','의사: 규칙을 지키고 역할을 맡을 의사가 있다','특별 승객이 아님: 임신 중인 분, 유아·소아 동반은 불가']},
  en:{t:'Who may sit in an exit row: all seven conditions must be met',ex:'EXIT',c:['Strength and mobility: can operate doors and exits and get out quickly','Age: not under 15 (an example from the Korean standard)','Understanding: follows the evacuation guidance and crew instructions, and can pass them on','Sight and hearing: can do the job without aids other than ordinary glasses or hearing aids','Companions: not travelling with a child or passenger who needs their care','Willingness: will follow the rules and accept the role','Not a special passenger: not pregnant, not travelling with an infant or child']}})[l];
 if(!W)return F.gnd_exit('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='4s',cx0=60,cw=520,rows=20,sw=cw/rows;
 s+='<path d="M'+(cx0-30)+' '+(y+45)+' Q'+(cx0-30)+' '+y+' '+cx0+' '+y+' L'+(cx0+cw)+' '+y+' L'+(cx0+cw+20)+' '+(y+45)+' L'+(cx0+cw)+' '+(y+90)+' L'+cx0+' '+(y+90)+' Q'+(cx0-30)+' '+(y+90)+' '+(cx0-30)+' '+(y+45)+' Z" fill="#fff" stroke="#9FB0C2" stroke-width="2"/>';
 for(var r=0;r<rows;r++){var ex=(r===9||r===10),x=cx0+r*sw+2;
  [y+10,y+24,y+56,y+70].forEach(function(sy){s+='<rect x="'+x+'" y="'+sy+'" width="'+(sw-5)+'" height="11" rx="2" fill="'+(ex?'#FFD23F':'#DCE6F0')+'"'+(ex?'><animate attributeName="fill" values="#FFD23F;#F2A93B;#FFD23F" dur="'+dur+'" repeatCount="indefinite"/></rect>':'/>')})}
 var ex0=cx0+9*sw;s+=LB(ex0+sw,y-6,W.ex,9,'#fff','middle','#D64545')+LB(ex0+sw,y+104,W.ex,9,'#fff','middle','#D64545');
 y+=124;var L=LIST(W.c,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-6 妊娠週数による扱い（区切りの週数は会社で違う例★） */
gnd_preg:function(l){
 var W=({ja:{t:'妊娠中のお客様：週数で扱いが変わる（例★）',wk:'週',z:[['32週未満','一般のお客様と同じ'],['32〜36週','産婦人科医の診断書が必要'],['37週以上','搭乗をお断りする']],mt:'多胎妊娠は33週以上でお断り（例）',n:['区切りの週数は会社で違う（28・32・36週などを使う）。自社の規定で確かめる','診断書は搭乗日から一定期間内（例：7日以内）に書かれたもの','非常口座席は不可。希望があれば搭乗の補助をする']},
  ko:{t:'임신 중인 승객: 주수에 따라 취급이 달라진다(예★)',wk:'주',z:[['32주 미만','일반 승객과 같음'],['32~36주','산부인과 진단서 필요'],['37주 이상','탑승 거절']],mt:'다태 임신은 33주 이상 거절(예)',n:['기준 주수는 회사마다 다르다(28·32·36주 등). 자사 규정으로 확인한다','진단서는 탑승일 기준 일정 기간 내(예: 7일 이내)에 작성된 것','비상구 좌석은 불가. 원하면 탑승을 보조한다']},
  en:{t:'Pregnant passengers: the rules change with the weeks of pregnancy (example ★)',wk:'weeks',z:[['Under 32 weeks','Same as any passenger'],['32 to 36 weeks','Obstetrician’s certificate needed'],['37 weeks or more','Not accepted for travel']],mt:'Multiple pregnancy: not accepted from 33 weeks (example)',n:['The cut-off weeks differ by airline (28, 32 or 36 weeks are common); check your own rules','The certificate must be written within a set period before travel (for example 7 days)','Not in an exit row; offer help with boarding if wanted']}})[l];
 if(!W)return F.gnd_preg('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+34,x0=40,x1=600,X=function(w){return x0+w/40*(x1-x0)},cols=['#2E9B5F','#E08A2E','#D64545'],b=[[0,32],[32,37],[37,40]];
 b.forEach(function(z,i){s+='<rect x="'+X(z[0])+'" y="'+y+'" width="'+(X(z[1])-X(z[0]))+'" height="26" fill="'+cols[i]+'"'+(i===0?' rx="6"':'')+'/>'});
 for(var w=0;w<=40;w+=4){s+='<line x1="'+X(w)+'" y1="'+(y+26)+'" x2="'+X(w)+'" y2="'+(y+34)+'" stroke="#5B6B7D" stroke-width="1.5"/>'+tx(X(w),y+34+FS(9)+4,String(w),9,'#5B6B7D',700)}
 s+=tx(x1,y+34+FS(9)*2.4+8,W.wk,9,'#5B6B7D',700,'end');
 s+='<path d="M0 0 L-9 -14 L9 -14 Z" fill="#0f3558"><animateMotion dur="9s" repeatCount="indefinite" path="M'+X(1)+' '+(y-2)+' L'+X(39.5)+' '+(y-2)+'"/></path>';
 y+=34+FS(9)*2.4+22;var cw=192;
 var zh=0;W.z.forEach(function(z){var h=36+LI(z[1],10,cw-20).length*FS(10)*1.3+16;if(h>zh)zh=h});
 W.z.forEach(function(z,i){var x=20+i*(cw+12),h=zh;s+=R(x,y,cw,h,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="6" rx="3" fill="'+cols[i]+'"/>'+tx(x+cw/2,y+24,z[0],12,cols[i],900)+WT(x+cw/2,y+44,z[1],10,D,800,cw-20)});
 y+=zh+14;s+=LB(320,y+FS(10)*0.6,W.mt,10,'#fff','middle','#7A5CC7');y+=FS(10)*1.3+18;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-7 車いすの3つのコード：どこまで自分で動けるか */
gnd_wch:function(l){
 var W=({ja:{t:'車いすの3つのコード：どこまで自分で動けるか',r:['長い距離を歩く','階段の上り下り','機内で座席まで'],ar:'主な手配',c:[['WCHR','ゲートまで車いす'],['WCHS','車いす＋搭乗橋かリフト車'],['WCHC','機内用車いす＋介助']],n:['お客様の状態を本人・同行者によく聞いて、コードを正しく選ぶ','車いすのお客様の便は、搭乗橋のあるスポットを空港に依頼する']},
  ko:{t:'휠체어 세 가지 코드: 어디까지 스스로 움직일 수 있나',r:['먼 거리 걷기','계단 오르내리기','기내에서 좌석까지'],ar:'주요 준비',c:[['WCHR','게이트까지 휠체어'],['WCHS','휠체어+탑승교 또는 리프트차'],['WCHC','기내용 휠체어+보조']],n:['승객 본인·동행자에게 상태를 잘 물어 코드를 정확히 고른다','휠체어 승객의 편은 탑승교가 있는 주기장을 공항에 요청한다']},
  en:{t:'The three wheelchair codes: how far can the passenger move unaided?',r:['Walk long distances','Use stairs','Get to the seat in the cabin'],ar:'Main arrangements',c:[['WCHR','Wheelchair to the gate'],['WCHS','Wheelchair plus jet bridge or lift vehicle'],['WCHC','On-board wheelchair and assistance']],n:['Ask the passenger and companions carefully, and choose the right code','For flights with wheelchair passengers, ask the airport for a stand with a jet bridge']}})[l];
 if(!W)return F.gnd_wch('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='9s',lw=170,cw=(600-lw-20)/3,ok=[[0,1,1],[0,0,1],[0,0,0]],rh=Math.max(40,LI(W.r[0],10,lw-16).length*FS(10)*1.3+18);
 W.c.forEach(function(c,i){var x=20+lw+10+i*(cw+5);s+=R(x,y,cw,34,['#1769e0','#E08A2E','#D64545'][i],8)+tx(x+cw/2,y+22,c[0],13,'#fff',900)});
 var top=y;y+=40;
 W.r.forEach(function(r,j){s+=R(20,y,lw,rh,'#EEF3F7',8)+WR(20+lw/2,y+rh/2+FS(10)*0.35,r,10,'#0f3558',800,lw-16);
  W.c.forEach(function(c,i){var x=20+lw+10+i*(cw+5),g=ok[i][j];s+=R(x,y,cw,rh,'#fff',8,' stroke="#D5DEE8"')+(g?'<circle cx="'+(x+cw/2)+'" cy="'+(y+rh/2)+'" r="12" fill="none" stroke="#2E9B5F" stroke-width="4"/>':'<path d="M'+(x+cw/2-10)+' '+(y+rh/2-10)+' L'+(x+cw/2+10)+' '+(y+rh/2+10)+' M'+(x+cw/2+10)+' '+(y+rh/2-10)+' L'+(x+cw/2-10)+' '+(y+rh/2+10)+'" stroke="#D64545" stroke-width="4" stroke-linecap="round"/>')});
  y+=rh+5});
 var ah=0;W.c.forEach(function(c){var h=LI(c[1],10,cw-14).length*FS(10)*1.3+26;if(h>ah)ah=h});
 s+=R(20,y,lw,ah,'#0f3558',8)+tx(20+lw/2,y+ah/2+FS(10)*0.35,W.ar,10,'#fff',900);
 W.c.forEach(function(c,i){var x=20+lw+10+i*(cw+5);s+=R(x,y,cw,ah,'#FFF4D6',8)+WR(x+cw/2,y+ah/2+FS(10)*0.35,c[1],10,'#3A2A00',800,cw-14)});
 W.c.forEach(function(c,i){var x=20+lw+10+i*(cw+5);s+='<rect x="'+(x-2)+'" y="'+(top-2)+'" width="'+(cw+4)+'" height="'+(y+ah-top+4)+'" rx="10" fill="none" stroke="#F2A93B" stroke-width="5" opacity="0"><animate attributeName="opacity" '+SEG(i,3,0,1)+' dur="'+dur+'" repeatCount="indefinite"/></rect>'});
 y+=ah+16;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-8 ペットの2つの運び方：客室（PETC）と貨物室（AVIH）。重さは目安★ */
gnd_pet:function(l){
 var W=({ja:{t:'ペットの2つの運び方：客室か貨物室か（重さは目安★）',a:['客室（PETC）','前の座席の下に入るケース','ケージ込み 7〜10kg 程度まで'],b:['貨物室（AVIH）','温度と気圧が保たれる区画','ケージ込み 32〜45kg 程度まで'],n:['重さ・大きさ・年齢・数の上限は会社と機材で違う。機内に持ち込めない会社もある','盲導犬・介助犬はペットとして扱わない（無料で機内に同伴）','客室・搭載管理・機長・経由地・到着地に情報を伝える']},
  ko:{t:'반려동물 운송 두 가지: 객실인가 화물칸인가(무게는 기준★)',a:['객실(PETC)','앞 좌석 아래에 들어가는 케이스','케이지 포함 7~10kg 정도까지'],b:['화물칸(AVIH)','온도와 기압이 유지되는 구역','케이지 포함 32~45kg 정도까지'],n:['무게·크기·나이·마릿수 상한은 회사와 기종마다 다르다. 기내 반입을 허용하지 않는 회사도 있다','안내견·보조견은 반려동물로 취급하지 않는다(무료로 기내 동반)','객실·탑재관리·기장·경유지·도착지에 정보를 전한다']},
  en:{t:'Two ways to carry pets: cabin or hold (weights are guides ★)',a:['Cabin (PETC)','A carrier that fits under the seat in front','Up to about 7–10 kg including the carrier'],b:['Hold (AVIH)','A compartment kept at a safe temperature and pressure','Up to about 32–45 kg including the cage'],n:['Limits on weight, size, age and number differ by airline and aircraft; some airlines do not allow pets in the cabin','Guide and assistance dogs are not treated as pets (they travel free in the cabin)','Tell the cabin crew, load control, the captain, transit and arrival stations']}})[l];
 if(!W)return F.gnd_pet('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,fx=40,fw=560,fh=150,mid=y+86;
 s+='<path d="M'+(fx+30)+' '+y+' L'+(fx+fw-10)+' '+y+' Q'+(fx+fw+20)+' '+(y+fh/2)+' '+(fx+fw-10)+' '+(y+fh)+' L'+(fx+30)+' '+(y+fh)+' Q'+(fx-10)+' '+(y+fh/2)+' '+(fx+30)+' '+y+' Z" fill="#fff" stroke="#9FB0C2" stroke-width="2"/>';
 s+='<line x1="'+(fx+14)+'" y1="'+mid+'" x2="'+(fx+fw+4)+'" y2="'+mid+'" stroke="#9FB0C2" stroke-width="3"/>';
 for(var i=0;i<7;i++){var sx=fx+70+i*64;s+='<rect x="'+sx+'" y="'+(mid-44)+'" width="30" height="34" rx="5" fill="#DCE6F0"/><rect x="'+(sx-4)+'" y="'+(mid-14)+'" width="38" height="8" rx="3" fill="#C9D6E4"/>'}
 var px=fx+70+3*64+38;s+='<rect x="'+px+'" y="'+(mid-24)+'" width="26" height="18" rx="4" fill="#1769e0"><animate attributeName="opacity" values="1;.4;1" dur="2.4s" repeatCount="indefinite"/></rect>';
 s+='<rect x="'+(fx+300)+'" y="'+(mid+14)+'" width="120" height="44" rx="6" fill="#FFF4D6" stroke="#E08A2E" stroke-width="2"/><rect x="'+(fx+330)+'" y="'+(mid+24)+'" width="40" height="28" rx="4" fill="#E08A2E"><animate attributeName="opacity" values="1;.4;1" dur="2.4s" begin="1.2s" repeatCount="indefinite"/></rect>';
 s+=LB(px+13,mid-54,'PETC',9,'#fff','middle','#1769e0')+LB(fx+460,mid+38,'AVIH',9,'#fff','middle','#E08A2E');
 y+=fh+16;var cw=294;
 [W.a,W.b].forEach(function(c,i){var x=20+i*(cw+12),col=i?'#E08A2E':'#1769e0',h=34+LI(c[1],10,cw-24).length*FS(10)*1.3+LI(c[2],11,cw-24).length*FS(11)*1.3+20;
  s+=R(x,y,cw,h,'#fff',10,' stroke="'+col+'" stroke-width="2"')+tx(x+cw/2,y+24,c[0],13,col,900)+WT(x+cw/2,y+46,c[1],10,D,800,cw-24)+WT(x+cw/2,y+46+LI(c[1],10,cw-24).length*FS(10)*1.3+8,c[2],11,'#0f3558',900,cw-24)});
 y+=34+FS(10)*1.3*2+FS(11)*1.3+20+16;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-9 座席番号の読み方：数字は列、アルファベットは横の位置（配置は機材で違う） */
gnd_seat:function(l){
 var W=({ja:{t:'座席番号の読み方：数字は列、文字は横の位置',nb:'ナローボディ（例：横6席）',wb:'ワイドボディ（例：横9席）',w:'窓',a:'通路',n:['数字は前から数えた列、アルファベットは横の位置','「I」は数字の1と紛らわしいので使わない機材が多い。13列を欠番にする会社もある','窓側・通路側の文字は機材で違う。必ず座席表で確かめる']},
  ko:{t:'좌석 번호 읽는 법: 숫자는 열, 문자는 가로 위치',nb:'협동체(예: 가로 6석)',wb:'광동체(예: 가로 9석)',w:'창',a:'통로',n:['숫자는 앞에서부터 센 열, 알파벳은 가로 위치','「I」는 숫자 1과 헷갈려 쓰지 않는 기종이 많다. 13열을 결번으로 하는 회사도 있다','창가·통로 쪽 문자는 기종마다 다르다. 반드시 좌석 배치도로 확인한다']},
  en:{t:'Reading seat numbers: the number is the row, the letter is the position across',nb:'Narrow-body (e.g. 6 abreast)',wb:'Wide-body (e.g. 9 abreast)',w:'Window',a:'Aisle',n:['The number is the row counted from the front; the letter is the position across the cabin','Many aircraft skip “I” because it looks like 1; some airlines skip row 13','Which letters are window or aisle depends on the aircraft; always check the seat map']}})[l];
 if(!W)return F.gnd_seat('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,sw=30,sh=24,g=4,ag=26;
 function MAP(title,groups,x0,yy,hl){var lt=[].concat.apply([],groups),out=tx(x0,yy,title,11,'#0f3558',900,'start'),x,cx={};yy+=14;
  x=x0+40;groups.forEach(function(gr,gi){gr.forEach(function(L){cx[L]=x;out+=tx(x+sw/2,yy+FS(10),L,10,'#0f3558',900);x+=sw+g});x+=ag-g});
  yy+=FS(10)+8;[22,23,24].forEach(function(r){out+=tx(x0+18,yy+sh/2+FS(10)*0.35,String(r),10,'#5B6B7D',800);lt.forEach(function(L){var on=(r===23&&hl.indexOf(L)>=0);out+='<rect x="'+cx[L]+'" y="'+yy+'" width="'+sw+'" height="'+sh+'" rx="5" fill="'+(on?'#FFD23F':'#DCE6F0')+'"'+(on?'><animate attributeName="fill" values="#FFD23F;#F2A93B;#FFD23F" dur="3s" repeatCount="indefinite"/></rect>':'/>')});yy+=sh+6});
  var first=cx[lt[0]],last=cx[lt[lt.length-1]];out+=tx(first+sw/2,yy+FS(9)+2,W.w,9,'#1769e0',800)+tx(last+sw/2,yy+FS(9)+2,W.w,9,'#1769e0',800);
  return {s:out,y:yy+FS(9)+14}}
 var A=MAP(W.nb+'　23A・23F',[['A','B','C'],['D','E','F']],20,y+FS(11),['A','F']);s+=A.s;y=A.y+10;
 var B=MAP(W.wb+'　23A・23J',[['A','B','C'],['D','E','F'],['G','H','J']],20,y+FS(11),['A','J']);s+=B.s;y=B.y+6;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-10 機内持ち込み手荷物：大きさ・重さ（例）と液体のルール */
gnd_cabin:function(l){
 var W=({ja:{t:'機内持ち込み手荷物：大きさ・重さと液体（例★）',bag:'3辺の合計 115cm 以内',kg:'1個 10kg 以下（会社により 7〜12kg）',liq:'液体（国際線）',ml:'100ml 以下の容器',bg:'1L 以下の透明な袋 1つ',n:['刃物・はさみ・工具など武器になりうる物は受託手荷物へ','大きすぎるときはカウンターで受託に切り替える（収納の都合なら無料の会社が多い）','非常口座席の足元には何も置けない']},
  ko:{t:'기내 반입 수하물: 크기·무게와 액체(예★)',bag:'세 변의 합 115cm 이내',kg:'1개 10kg 이하(회사에 따라 7~12kg)',liq:'액체(국제선)',ml:'100ml 이하 용기',bg:'1L 이하 투명 봉투 1개',n:['칼·가위·공구 등 무기가 될 수 있는 물건은 위탁 수하물로','너무 크면 카운터에서 위탁으로 바꾼다(수납 사정이면 무료인 회사가 많다)','비상구 좌석 발밑에는 아무것도 둘 수 없다']},
  en:{t:'Cabin baggage: size, weight and liquids (examples ★)',bag:'Total of three sides up to 115 cm',kg:'Up to 10 kg per bag (7–12 kg depending on airline)',liq:'Liquids (international)',ml:'Containers of 100 ml or less',bg:'One clear bag of 1 L or less',n:['Knives, scissors, tools and anything that could be a weapon go in checked baggage','If it is too big, switch it to checked baggage at the counter (many airlines do this free when cabin space is the reason)','Nothing may be placed at the feet of an exit row seat']}})[l];
 if(!W)return F.gnd_cabin('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+10,bx=70,by=y+30,bw=150,bh=200,dx=40,dy=-26;
 s+='<path d="M'+bx+' '+by+' l'+dx+' '+dy+' l'+bw+' 0 l0 '+bh+' l'+(-dx)+' '+(-dy)+' Z" fill="#C9D6E4"/><rect x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="10" fill="#1769e0"/><path d="M'+bx+' '+by+' l'+dx+' '+dy+' l'+bw+' 0 l'+(-dx)+' '+(-dy)+' Z" fill="#5B97E8"/>';
 s+='<rect x="'+(bx+dx/2+bw/2-26)+'" y="'+(by+dy/2-16)+'" width="52" height="16" rx="6" fill="none" stroke="#0f3558" stroke-width="5"/>';
 s+=ARW(bx-14,by+bh,bx-14,by,'#0f3558',2)+tx(bx-24,by+bh/2,'55',11,'#0f3558',900,'end')+ARW(bx,by+bh+16,bx+bw,by+bh+16,'#0f3558',2)+tx(bx+bw/2,by+bh+34,'40',11,'#0f3558',900)+tx(bx+bw+dx/2+14,by+dy/2-4,'20',11,'#0f3558',900,'start')+tx(bx+bw/2,by+bh/2,'cm',12,'#fff',900);
 var ix=330;s+=LB(ix+130,y+20,W.bag,11,'#fff','middle','#1769e0')+LB(ix+130,y+54,W.kg,10,'#fff','middle','#0f3558');
 var ly=y+96;s+=tx(ix+130,ly,W.liq,12,'#0f3558',900);
 var bagx=ix+40,bagy=ly+16,bgw=180,bgh=118;s+='<rect x="'+bagx+'" y="'+bagy+'" width="'+bgw+'" height="'+bgh+'" rx="10" fill="#EAF7F0" stroke="#2E9B5F" stroke-width="2.5" stroke-dasharray="6 4"/>';
 for(var i=0;i<4;i++){var cx=bagx+26+i*40;s+='<g><rect x="'+(cx-11)+'" y="'+(bagy+40)+'" width="22" height="50" rx="5" fill="#fff" stroke="#0f3558" stroke-width="2"/><rect x="'+(cx-6)+'" y="'+(bagy+32)+'" width="12" height="10" fill="#0f3558"/><animateTransform attributeName="transform" type="translate" values="0 -70;0 0;0 0" keyTimes="0;'+(0.15+i*0.1).toFixed(2)+';1" dur="6s" repeatCount="indefinite"/></g>'}
 s+=tx(bagx+bgw/2,bagy+bgh+18,W.ml,10,'#0f3558',800)+tx(bagx+bgw/2,bagy+bgh+18+FS(10)*1.3,W.bg,10,'#2E9B5F',900);
 y=Math.max(by+bh+50,bagy+bgh+18+FS(10)*1.3+16);var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-11 ゴルフバッグ：かばんとの合計の重さで扱いが変わる（エコノミー23kg×1個の例★） */
gnd_golf:function(l){
 var W=({ja:{t:'ゴルフバッグ＋かばんの合計の重さで扱いが変わる（例★）',u:'kg',z:[['23kg以下','1個として無料'],['23〜32kg','1個＋重さの超過料金'],['32〜45kg','2個として扱う']],n:['エコノミー（23kg×1個）のお客様の例。扱いは会社ごとに違う','サーフボード・自転車などは受託手荷物1個として数える（292cm以内なら大きさの超過料金なし）','楽器や貴重品は、座席を買って機内に置く方法（CBBG）もある']},
  ko:{t:'골프백+가방의 합계 무게로 취급이 달라진다(예★)',u:'kg',z:[['23kg 이하','1개로 무료'],['23~32kg','1개+무게 초과 요금'],['32~45kg','2개로 취급']],n:['이코노미(23kg×1개) 승객의 예. 취급은 회사마다 다르다','서프보드·자전거 등은 위탁 수하물 1개로 센다(292cm 이내면 크기 초과 요금 없음)','악기나 귀중품은 좌석을 사서 기내에 두는 방법(CBBG)도 있다']},
  en:{t:'Golf bag plus one bag: the total weight decides the charge (example ★)',u:'kg',z:[['23 kg or less','Free, as one piece'],['23 to 32 kg','One piece plus an overweight charge'],['32 to 45 kg','Counted as two pieces']],n:['Example for an economy passenger allowed 1 × 23 kg; rules differ by airline','Surfboards, bicycles and similar count as one checked piece (no size charge up to 292 cm)','Instruments and valuables can also travel in a purchased seat (CBBG)']}})[l];
 if(!W)return F.gnd_golf('ja');setK(1);
 var cols=['#2E9B5F','#E08A2E','#D64545'],T=TOP(W.t),s=T.s,y=T.y+34;
 var S=SCALE(y,45,5,[[0,23,cols[0]],[23,32,cols[1]],[32,45,cols[2]]],W.u,'9s');s+=S.s;
 [23,32].forEach(function(v){s+='<line x1="'+S.X(v)+'" y1="'+(y-4)+'" x2="'+S.X(v)+'" y2="'+(y+30)+'" stroke="#fff" stroke-width="3"/>'});
 var C=ZCARDS(S.y,W.z,cols);s+=C.s;var L=LIST(W.n,C.y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-12 手荷物の危険物：機内持ち込みと預け入れの○×（代表例★） */
gnd_dgbag:function(l){
 var W=({ja:{t:'お客様の手荷物の危険物：持ち込みと預け入れ（代表例★）',c:['品目','機内','預け'],r:[['喫煙用ライター・マッチ（1人1個）',1,0],['電子たばこ・加熱式たばこ',1,0],['化粧品・医薬品のスプレー（1容器0.5L以下）',1,1],['引火性ガスのスプレー（潤滑油・塗料など）',0,0],['アルコール 24〜70%（1人5Lまで）',1,1],['アルコール 70%超',0,0],['ドライアイス（1人2.5kgまで）',1,1],['花火・キャンプ用ガス・燃料',0,0]],n:['国・航空会社によってはさらに厳しい。迷う物は危険物の担当・規定で確かめる','リチウム電池・モバイルバッテリーは次の回（1-13）で']},
  ko:{t:'승객 수하물의 위험물: 기내 반입과 위탁(대표 예★)',c:['품목','기내','위탁'],r:[['흡연용 라이터·성냥(1인 1개)',1,0],['전자담배·가열식 담배',1,0],['화장품·의약품 스프레이(1용기 0.5L 이하)',1,1],['인화성 가스 스프레이(윤활유·도료 등)',0,0],['알코올 24~70%(1인 5L까지)',1,1],['알코올 70% 초과',0,0],['드라이아이스(1인 2.5kg까지)',1,1],['불꽃놀이·캠핑용 가스·연료',0,0]],n:['나라·항공사에 따라 더 엄격할 수 있다. 헷갈리는 물건은 위험물 담당·규정으로 확인한다','리튬전지·보조배터리는 다음 편(1-13)에서']},
  en:{t:'Dangerous goods in passenger baggage: cabin or checked (typical examples ★)',c:['Item','Cabin','Checked'],r:[['Lighter or matches for smoking (one per person)',1,0],['E-cigarettes and heated tobacco',1,0],['Toiletry and medical aerosols (0.5 L per container)',1,1],['Flammable-gas aerosols (lubricants, paint)',0,0],['Alcohol 24–70% (up to 5 L per person)',1,1],['Alcohol over 70%',0,0],['Dry ice (up to 2.5 kg per person)',1,1],['Fireworks, camping gas, fuel',0,0]],n:['Some countries and airlines are stricter; check doubtful items with your DG specialist or manual','Lithium batteries and power banks are covered in the next lesson (1-13)']}})[l];
 if(!W)return F.gnd_dgbag('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='12s',c1=420,cw=88,n=W.r.length,rh=34;
 s+=R(20,y,c1,30,'#0f3558',8)+tx(36,y+20,W.c[0],11,'#fff',900,'start');[1,2].forEach(function(j){s+=R(20+c1+6+(j-1)*(cw+6),y,cw,30,'#0f3558',8)+tx(20+c1+6+(j-1)*(cw+6)+cw/2,y+20,W.c[j],11,'#fff',900)});y+=36;
 W.r.forEach(function(r,i){var h=Math.max(rh,LI(r[0],10,c1-30).length*FS(10)*1.3+12);s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',6)+GLOW(20,y,600,h,i,n,dur,6)+WR(36,y+h/2+FS(10)*0.35,r[0],10,D,800,c1-30,'start');
  [1,2].forEach(function(j){var cx=20+c1+6+(j-1)*(cw+6)+cw/2,cy=y+h/2;s+=r[j]?'<circle cx="'+cx+'" cy="'+cy+'" r="10" fill="none" stroke="#2E9B5F" stroke-width="3.5"/>':'<path d="M'+(cx-8)+' '+(cy-8)+' L'+(cx+8)+' '+(cy+8)+' M'+(cx+8)+' '+(cy-8)+' L'+(cx-8)+' '+(cy+8)+'" stroke="#D64545" stroke-width="3.5" stroke-linecap="round"/>'});
  y+=h+3});
 y+=10;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-13 リチウム電池：Wh で3つに分かれる。計算の例（Wh＝mAh×V÷1000） */
gnd_wh:function(l){
 var W=({ja:{t:'リチウム電池は Wh で分かれる（モバイルバッテリーの例★）',u:'Wh',z:[['100Wh以下','機内持ち込み○（1人2個まで）'],['100〜160Wh','機内持ち込み○（1人2個まで）'],['160Wh超','持ち込みも預け入れも×']],calc:'計算の例：10,000mAh × 3.7V ÷ 1000 ＝ 37Wh',n:['モバイルバッテリーは預け入れ不可。機内で本体に充電しない・ほかの機器に給電しない（日本 2026年4月24日〜）','収納棚に入れず手元で保管し、端子を絶縁する','航空会社によってはさらに厳しい。各社の案内も確かめる']},
  ko:{t:'리튬전지는 Wh로 나뉜다(보조배터리의 예★)',u:'Wh',z:[['100Wh 이하','기내 반입 ○(1인 2개까지)'],['100~160Wh','기내 반입 ○(1인 2개까지)'],['160Wh 초과','반입도 위탁도 ×']],calc:'계산 예: 10,000mAh × 3.7V ÷ 1000 = 37Wh',n:['보조배터리는 위탁 불가. 기내에서 본체 충전·다른 기기 급전 금지(일본 2026년 4월 24일~)','선반에 넣지 말고 손 닿는 곳에 보관하고 단자를 절연한다','항공사에 따라 더 엄격할 수 있다. 각 사의 안내도 확인한다']},
  en:{t:'Lithium batteries are grouped by Wh (power bank example ★)',u:'Wh',z:[['100 Wh or less','Cabin only (up to 2 per person)'],['100 to 160 Wh','Cabin only (up to 2 per person)'],['Over 160 Wh','Neither cabin nor checked']],calc:'Example: 10,000 mAh × 3.7 V ÷ 1000 = 37 Wh',n:['Power banks may not be checked; on board, do not charge them or use them to charge other devices (Japan, from 24 April 2026)','Keep them at hand, not in the overhead bin, with terminals insulated','Some airlines are stricter; check each airline’s guidance']}})[l];
 if(!W)return F.gnd_wh('ja');setK(1);
 var cols=['#2E9B5F','#E08A2E','#D64545'],T=TOP(W.t),s=T.s,y=T.y+34;
 var S=SCALE(y,200,20,[[0,100,cols[0]],[100,160,cols[1]],[160,200,cols[2]]],W.u,'9s');s+=S.s;
 s+='<circle cx="'+S.X(37)+'" cy="'+(y+13)+'" r="7" fill="#fff" stroke="#0f3558" stroke-width="3"><animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite"/></circle>';
 var C=ZCARDS(S.y,W.z,cols);s+=C.s;y=C.y;s+=LB(320,y+FS(11)*0.6,W.calc,11,'#fff','middle','#0f3558');y+=FS(11)*1.3+18;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 2-1 ゲート業務の時間の目安（国際線の例・出発前の逆算★） */
gnd_gatetime:function(l){
 var W=({ja:{t:'ゲート業務の時間の目安：搭乗締め切りから逆算（国際線の例★）',u:'出発の何分前',m:[[70,'ゲートに着く（60〜75分前）'],[52,'搭乗前の案内放送（書類・順番）'],[40,'搭乗開始（30〜45分前・大型機は早め）'],[22,'最終案内・呼び出し'],[10,'搭乗締め切り（10分前前後）'],[6,'人数の照合・書類 → ドアクローズ']],n:['基準は「搭乗締め切り」。そこから逆算して案内を早めに始める','バス搭乗・大型機・乗り継ぎのお客様が多い便は早める']},
  ko:{t:'게이트 업무 시간 기준: 탑승 마감에서 역산(국제선 예★)',u:'출발 몇 분 전',m:[[70,'게이트 도착(60~75분 전)'],[52,'탑승 전 안내 방송(서류·순서)'],[40,'탑승 시작(30~45분 전·대형기는 빠르게)'],[22,'최종 안내·호출'],[10,'탑승 마감(10분 전 전후)'],[6,'인원 대조·서류 → 도어 클로즈']],n:['기준은 「탑승 마감」. 거기서 역산해 안내를 일찍 시작한다','버스 탑승·대형기·환승 승객이 많은 편은 앞당긴다']},
  en:{t:'Gate timings: count back from boarding close (international example ★)',u:'minutes before departure',m:[[70,'Arrive at the gate (60–75 min before)'],[52,'Pre-boarding announcement (documents, order)'],[40,'Start boarding (30–45 min before; earlier for large aircraft)'],[22,'Final call and paging'],[10,'Boarding closes (around 10 min before)'],[6,'Head count and documents → door closed']],n:['Boarding close is the anchor: count back from it and start announcements early','Start earlier for bus boarding, large aircraft and flights with many transfer passengers']}})[l];
 if(!W)return F.gnd_gatetime('ja');setK(1);
 var cols=['#5B6B7D','#2C8C8C','#1769e0','#E08A2E','#D64545','#0f3558'],T=TOP(W.t),s=T.s;
 var A=TL(T.y,90,15,W.m.map(function(m,i){return [m[0],m[1],cols[i]]}),W.u,'9s');s+=A.s;
 var L=LIST(W.n,A.y,600,11);return SVG(L.y+8,s+L.s)},

/* 2-2 収納棚がいっぱいになる前に、ゲートで預かる */
gnd_bins:function(l){
 var W=({ja:{t:'収納棚がいっぱいになる前に、ゲートで預かる',bin:'収納棚',full:'満杯',gc:'ゲートで受託に切り替え（タグを発行し控えを渡す）',n:['準備が済んだら、搭乗の前から大きな手荷物・個数の多いお客様を見極める','通路をふさぐ手荷物は、非常時の脱出の妨げになる','預かる手荷物からモバイルバッテリーなどを必ず取り出してもらう（1-13）']},
  ko:{t:'선반이 가득 차기 전에 게이트에서 맡긴다',bin:'선반',full:'만석',gc:'게이트에서 위탁으로 전환(태그 발행·영수증 전달)',n:['준비가 끝나면 탑승 전부터 큰 짐·개수가 많은 승객을 미리 파악한다','통로를 막는 짐은 비상시 탈출을 방해한다','맡기는 짐에서 보조배터리 등은 반드시 꺼내게 한다(1-13)']},
  en:{t:'Check bags in at the gate before the overhead bins fill up',bin:'Bins',full:'Full',gc:'Gate check-in (issue a tag and hand over the receipt)',n:['Once preparations are done, spot large bags and passengers with many items before boarding starts','Bags blocking the aisle get in the way of an emergency evacuation','Make sure power banks and similar are taken out of bags checked at the gate (1-13)']}})[l];
 if(!W)return F.gnd_bins('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+6,bw=88,bh=50,n=6,dur='8s';
 s+=tx(20,y+12,W.bin,11,'#0f3558',900,'start');y+=22;
 for(var i=0;i<n;i++){var x=24+i*(bw+10);s+=R(x,y,bw,bh,'#EEF3F7',8,' stroke="#9FB0C2" stroke-width="2"');
  for(var k=0;k<3;k++){var t0=(i*3+k)/(n*3)*0.7;s+='<rect x="'+(x+6+k*27)+'" y="'+(y+12)+'" width="22" height="32" rx="4" fill="#1769e0" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+t0.toFixed(3)+';'+(t0+0.01).toFixed(3)+';0.95;1" dur="'+dur+'" repeatCount="indefinite"/></rect>'}}
 s+='<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.72;0.74;0.95;1" dur="'+dur+'" repeatCount="indefinite"/>'+LB(600,y-14,W.full,10,'#fff','middle','#D64545')+'</g>';
 y+=bh+26;var gx=320;s+=ARW(gx,y-14,gx,y+6,'#9FB0C2',3);
 s+='<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.75;0.77;0.95;1" dur="'+dur+'" repeatCount="indefinite"/>'+LB(gx,y+FS(11)*0.6+14,W.gc,11,'#fff','middle','#E08A2E')+'</g>';
 y+=FS(11)*1.3+34;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 2-3 開披検査で見つかる物と処理（例） */
gnd_open:function(l){
 var W=({ja:{t:'開披検査で見つかる物と処理（例）',r:[['モバイルバッテリー・予備の電池','取り出して機内へ','#1769e0'],['電子たばこ・ライター','取り出して機内へ（ライターは1個）','#1769e0'],['スプレー缶','量の範囲内なら可。引火性などは放棄','#E08A2E'],['刃物・工具','受託ならそのまま可が多い','#2E9B5F'],['規定外の危険物','放棄、または別の方法を案内','#D64545']],n:['開けるのは必ずお客様の立ち会いのもとで','処理の経緯を記録し、再検査してから搭載する']},
  ko:{t:'개방 검사에서 발견되는 물건과 처리(예)',r:[['보조배터리·예비 배터리','꺼내서 기내로','#1769e0'],['전자담배·라이터','꺼내서 기내로(라이터는 1개)','#1769e0'],['스프레이 캔','허용량 이내면 가능. 인화성 등은 포기','#E08A2E'],['칼·공구','위탁이면 그대로 가능한 경우가 많다','#2E9B5F'],['규정 외 위험물','포기 또는 다른 방법 안내','#D64545']],n:['여는 것은 반드시 승객 입회하에','처리 경위를 기록하고 재검사한 뒤 탑재한다']},
  en:{t:'Items found in an open-bag inspection and what to do (examples)',r:[['Power banks and spare batteries','Take out and carry in the cabin','#1769e0'],['E-cigarettes and lighters','Take out and carry in the cabin (one lighter)','#1769e0'],['Aerosol cans','Allowed within limits; flammable ones surrendered','#E08A2E'],['Knives and tools','Often fine in checked baggage','#2E9B5F'],['Other dangerous goods','Surrender, or advise another way to send','#D64545']],n:['Always open the bag in the passenger’s presence','Record what was done, and re-screen before loading']}})[l];
 if(!W)return F.gnd_open('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='10s',n=W.r.length,lw=250,rx=330;
 W.r.forEach(function(r,i){var nl=Math.max(LI(r[0],11,lw-24).length,LI(r[1],10,270).length),h=nl*FS(11)*1.3+20;
  s+=GLOW(20,y-3,600,h+6,i,n,dur,10)+R(20,y,lw,h,'#fff',10,' stroke="#C8D3DE"')+WR(20+lw/2,y+h/2+FS(11)*0.35,r[0],11,D,800,lw-24)+ARW(20+lw+8,y+h/2,rx-8,y+h/2,r[2],3)+R(rx,y,290,h,r[2],10)+WR(rx+145,y+h/2+FS(10)*0.35,r[1],10,'#fff',900,270);
  y+=h+10});
 var L=LIST(W.n,y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 2-5 搭乗遅れのお客様：時刻で動く手順（例★） */
gnd_late:function(l){
 var W=({ja:{t:'搭乗遅れのお客様：決めた時刻に、決めた人が動く（例★）',st:['未搭乗の一覧を出す（乗り継ぎ・団体・手荷物の有無）','名前で呼び出し。電話・同行者・ラウンジに連絡','降ろす可能性のある手荷物をハンドリング会社に予告','責任者がオフロードを決める（後から来ても原則乗せない）','手荷物を降ろし、人数・ロードシート・旅客情報を直す','タグ番号で降ろせたか照合 → 機長・客室に伝えドアクローズ'],who:['搭乗開始の直後','締め切りの15分前','締め切りの10分前','搭乗締め切り','決定の直後','降ろし終わり'],n:['1人を待つ数分が、後の便・乗り継ぎ・乗務員の勤務時間に響く','毎回の判断を記録し、遅れが多い時間帯や理由を振り返る']},
  ko:{t:'탑승 지연 승객: 정한 시각에, 정한 사람이 움직인다(예★)',st:['미탑승 목록을 뽑는다(환승·단체·수하물 유무)','이름으로 호출. 전화·동행자·라운지에 연락','내릴 가능성이 있는 수하물을 조업사에 예고','책임자가 오프로드를 결정(늦게 와도 원칙적으로 태우지 않음)','수하물을 내리고 인원·로드시트·승객 정보를 수정','태그 번호로 하기 확인 → 기장·객실에 전하고 도어 클로즈'],who:['탑승 시작 직후','마감 15분 전','마감 10분 전','탑승 마감','결정 직후','하기 완료'],n:['한 명을 기다리는 몇 분이 다음 편·환승·승무원 근무시간에 영향을 준다','매번 판단을 기록하고 지연이 많은 시간대와 이유를 돌아본다']},
  en:{t:'Late passengers: the agreed person acts at the agreed time (example ★)',st:['List passengers not yet boarded (transfers, groups, checked bags)','Page by name; call them, their companions and the lounge','Warn the handler which bags may need offloading','The supervisor decides to offload (late arrivals are not boarded as a rule)','Offload bags; correct the count, loadsheet and passenger data','Confirm by tag number, tell the captain and cabin, close the door'],who:['Just after boarding starts','15 min before close','10 min before close','Boarding closes','Right after the decision','Bags off'],n:['A few minutes waiting for one person affect later flights, connections and crew duty time','Record every decision and review which times and reasons cause the most delays']}})[l];
 if(!W)return F.gnd_late('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#5B6B7D','#1769e0','#2C8C8C','#D64545','#E08A2E','#0f3558'],'12s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},

/* 2-6 出国取消：係員が同行して、決められた経路で一般区域へ戻る */
gnd_cancel:function(l){
 var W=({ja:{t:'出国取消：係員が同行し、決められた経路で戻る',air:'出国エリア（制限区域）',land:'一般区域',p:['ゲート','出入国管理：出国の記録を取り消す','税関：免税品・申告品','手荷物を返す'],n:['受託手荷物は必ず降ろして返す（2-5）','乗客名簿・ロードシート・事前旅客情報（API）を直す','細かな手順と連絡先は空港ごとに違う。支店の手順書に書いておく']},
  ko:{t:'출국 취소: 직원이 동행해 정해진 경로로 돌아간다',air:'출국 구역(보호구역)',land:'일반 구역',p:['게이트','출입국: 출국 기록 취소','세관: 면세품·신고품','수하물 반환'],n:['위탁 수하물은 반드시 내려서 돌려준다(2-5)','승객 명단·로드시트·사전 승객 정보(API)를 수정한다','세부 절차와 연락처는 공항마다 다르다. 지점 절차서에 적어 둔다']},
  en:{t:'Cancelling departure: staff escort the passenger back by a set route',air:'Airside (restricted area)',land:'Landside',p:['Gate','Immigration: cancel the departure record','Customs: duty-free and declared goods','Return checked bags'],n:['Always offload and return checked bags (2-5)','Correct the passenger list, loadsheet and advance passenger information (API)','Detailed steps and contacts differ by airport; write them in the station manual']}})[l];
 if(!W)return F.gnd_cancel('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,h=230,mid=380;
 s+=R(20,y,mid-20,h,'#EAF1FB',12)+R(mid,y,620-mid,h,'#F1F3F5',12)+tx(30,y+22,W.air,11,'#1769e0',900,'start')+tx(mid+10,y+22,W.land,11,'#5B6B7D',900,'start');
 s+='<line x1="'+mid+'" y1="'+y+'" x2="'+mid+'" y2="'+(y+h)+'" stroke="#0f3558" stroke-width="3" stroke-dasharray="8 6"/>';
 var P=[[100,y+130],[mid-70,y+110],[mid+90,y+150],[540,y+115]],cl=['#0f3558','#1769e0','#2C8C8C','#E08A2E'],up=[0,1,0,1];
 var d='M'+P.map(function(p){return p[0]+' '+p[1]}).join(' L');s+='<path d="'+d+'" fill="none" stroke="#9FB0C2" stroke-width="4" stroke-dasharray="2 8" stroke-linecap="round"/>';
 P.forEach(function(p,i){var w=150,nl=LI(W.p[i],9,140).length,bh=nl*FS(9)*1.3+12,by=up[i]?p[1]-16-bh:p[1]+16;s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="11" fill="'+cl[i]+'"/>'+tx(p[0],p[1]+FS(9)*0.36,String(i+1),9,'#fff',900)+R(p[0]-w/2,by,w,bh,'#fff',8,' stroke="'+cl[i]+'" stroke-width="1.5"')+WR(p[0],by+bh/2+FS(9)*0.35,W.p[i],9,D,800,140)});
 s+='<g><circle r="9" fill="#FFD23F" stroke="#0f3558" stroke-width="2"/><circle cx="14" r="7" fill="#fff" stroke="#0f3558" stroke-width="2"/><animateMotion dur="8s" repeatCount="indefinite" path="'+d+'"/></g>';
 y+=h+16;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 2-7 ドアクローズ前の人数の照合：3つの数が一致してから合図 */
gnd_count:function(l){
 var W=({ja:{t:'ドアクローズの前に：3つの数が一致してから合図する',c:['チェックイン数','搭乗した人数','客室の確認'],ok:'一致 → 書類を渡し、ドアクローズの合図',ng:'不一致 → 客室に伝え、不正・二重の搭乗がないか確認',n:['人数の照合は、保安と重量・重心の両方に関わる','「たぶん合っている」でドアを閉めない']},
  ko:{t:'도어 클로즈 전에: 세 숫자가 일치한 뒤 신호한다',c:['체크인 수','탑승 인원','객실 확인'],ok:'일치 → 서류 전달, 도어 클로즈 신호',ng:'불일치 → 객실에 알리고 부정·중복 탑승 여부 확인',n:['인원 대조는 보안과 중량·무게중심 모두에 관계된다','「아마 맞을 것」이라며 문을 닫지 않는다']},
  en:{t:'Before closing the door: signal only when all three numbers match',c:['Checked in','Boarded','Cabin count'],ok:'Match → hand over documents, signal door close',ng:'Mismatch → tell the cabin crew and check for unauthorised or duplicate boarding',n:['The head count matters for both security and weight and balance','Never close the door on “probably right”']}})[l];
 if(!W)return F.gnd_count('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='8s',cw=150;
 [[152,152,152,'#2E9B5F',W.ok,0],[152,151,152,'#D64545',W.ng,1]].forEach(function(r,ri){var top=y;
  s+='<g><animate attributeName="opacity" values="'+(ri?'.25;.25;1;1':'1;1;.25;.25')+'" keyTimes="0;.48;.5;1" dur="'+dur+'" repeatCount="indefinite"/>';
  W.c.forEach(function(c,i){var x=20+i*(cw+12);s+=R(x,y,cw,70,'#fff',10,' stroke="#C8D3DE"')+tx(x+cw/2,y+22,c,10,'#5B6B7D',800)+tx(x+cw/2,y+56,String(r[i]),22,(ri&&i===1)?'#D64545':'#0f3558',900)});
  var bx=20+3*(cw+12),bw=600-3*(cw+12);s+=R(bx,y,bw,70,r[3],10)+tx(bx+bw/2,y+46,ri?'≠':'=',26,'#fff',900);
  y+=90;s+=LB(320,y+FS(10)*0.6,r[4],10,'#fff','middle',r[3])+'</g>';y+=FS(10)*1.3+26});
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 3-1 ドアの番号：前から1・2・3…、L（左）が乗り降り、R（右）はサービス */
gnd_doors:function(l){
 var W=({ja:{t:'ドアの番号：前から1・2・3…、左（L）と右（R）',bb:'搭乗橋',ct:'機内食の車',sig:'窓越しに客室乗務員と合図（スライドの解除を確認）→ 合図がなければ開けない',n:['L（左）が通常の乗り降り、R（右）は機内食の積み込み・清掃などに使う','貨物室のドアは主に右側。数と位置は機材で違う（1-9）','スライドが作動したまま開けると飛び出し、遅延・欠航やけがにつながる']},
  ko:{t:'도어 번호: 앞에서부터 1·2·3…, 왼쪽(L)과 오른쪽(R)',bb:'탑승교',ct:'기내식 차량',sig:'창 너머로 객실 승무원과 신호(슬라이드 해제 확인) → 신호가 없으면 열지 않는다',n:['L(왼쪽)이 일반 승하기, R(오른쪽)은 기내식 탑재·청소 등에 쓴다','화물칸 도어는 주로 오른쪽. 수와 위치는 기종마다 다르다(1-9)','슬라이드가 작동 상태인 채 열면 튀어나와 지연·결항이나 부상으로 이어진다']},
  en:{t:'Door numbers: 1, 2, 3… from the front, left (L) and right (R)',bb:'Jet bridge',ct:'Catering truck',sig:'Signal with the cabin crew through the window (slide disarmed) → no signal, no opening',n:['The left (L) doors are normally used for passengers; the right (R) doors for catering and cleaning','Cargo doors are mostly on the right; their number and position depend on the aircraft (1-9)','Opening a door with the slide armed deploys it, causing delays or cancellations and possible injury']}})[l];
 if(!W)return F.gnd_doors('ja');setK(1);
 var T=TOP(W.t),s=T.s,cy=T.y+150,x0=110,x1=560,fw=62,P=PLANE(x0,x1,cy,fw);s+=P.s;
 var dx=[x1-50,x1-170,x0+150,x0+40];
 dx.forEach(function(x,i){var n=i+1;
  s+='<rect x="'+(x-9)+'" y="'+(cy-fw/2-4)+'" width="18" height="8" rx="2" fill="'+(n===1?'#1769e0':'#0f3558')+'"'+(n===1?'><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></rect>':'/>')+tx(x,cy-fw/2+20,n+'L',9,'#1769e0',900);
  s+='<rect x="'+(x-9)+'" y="'+(cy+fw/2-4)+'" width="18" height="8" rx="2" fill="#E08A2E"/>'+tx(x,cy+fw/2-10,n+'R',9,'#E08A2E',900)});
 s+='<rect x="'+(dx[0]-14)+'" y="'+(cy-fw/2-80)+'" width="28" height="74" rx="4" fill="#C9D6E4" stroke="#5B6B7D"/>'+tx(dx[0]+20,cy-fw/2-60,W.bb,9,'#0f3558',800,'start');
 s+='<rect x="'+(dx[0]-18)+'" y="'+(cy+fw/2+8)+'" width="36" height="40" rx="4" fill="#FFF4D6" stroke="#E08A2E"/>'+tx(dx[0]+24,cy+fw/2+34,W.ct,9,'#E08A2E',800,'start');
 var y=cy+fw/2+140;s+=LB(320,y,W.sig,10,'#fff','middle','#0f3558');y+=FS(10)*1.3+18;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 3-2 出発便：段階ごとに確かめること */
gnd_depchk:function(l){
 var W=({ja:{t:'出発便の確認：段階ごとに、決まった順番で',st:['機内食・機内用品の搭載、清掃、整備点検の完了、客室乗務員の準備','お客様・書類・手荷物・貨物、特別な搭載物（外交文書・危険物・貴重品）、名簿と人数','出入国の書類、正確な搭乗人数、ドアの閉鎖、地上機材が安全な場所に下がったか','運航の電報を送り、特記事項を到着地・経由地に伝える'],who:['搭乗前','搭乗中','プッシュバック前','出発後'],n:['どの段階で誰が何を確かめるかを、便ごとに同じ順番で','「出発後」の連絡まで終えて、その便の仕事が終わる']},
  ko:{t:'출발편 확인: 단계별로, 정해진 순서대로',st:['기내식·기내용품 탑재, 청소, 정비 점검 완료, 객실 승무원 준비','승객·서류·수하물·화물, 특수 탑재물(외교 문서·위험물·귀중품), 명단과 인원','출입국 서류, 정확한 탑승 인원, 도어 닫힘, 지상 장비가 안전한 곳으로 물러났는지','운항 전문을 보내고 특기 사항을 도착지·경유지에 알린다'],who:['탑승 전','탑승 중','푸시백 전','출발 후'],n:['어느 단계에서 누가 무엇을 확인할지 편마다 같은 순서로','「출발 후」 연락까지 마쳐야 그 편의 일이 끝난다']},
  en:{t:'Departure checks: stage by stage, in a fixed order',st:['Catering and supplies loaded, cleaning, maintenance checks done, cabin crew ready','Passengers, documents, bags and cargo; special loads (diplomatic mail, DG, valuables); manifest against head count','Border documents, exact passenger count, doors closed, ground equipment pulled back to a safe place','Send the movement message and pass special notes to the arrival and transit stations'],who:['Before boarding','During boarding','Before pushback','After departure'],n:['Check the same things, by the same people, in the same order on every flight','The flight’s work ends only when the after-departure messages are sent']}})[l];
 if(!W)return F.gnd_depchk('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#5B6B7D','#1769e0','#D64545','#2E9B5F'],'10s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},

/* 3-3 ターンアラウンドの工程表（国際線・短距離70分の例★）。赤はクリティカルパス */
gnd_turn:function(l){
 var W=({ja:{t:'ターンアラウンドの工程表（70分の例★）：赤がクリティカルパス',u:'出発までの分',r:[['到着・ドアオープン',70,68,0],['降機',68,60,1],['手荷物・貨物の積み下ろし→積み込み',68,12,0],['清掃・保安点検',60,36,1],['機内食',60,36,0],['給油',60,40,0],['搭乗',35,12,1],['人数の照合・書類・ドアクローズ',10,5,1]],n:['同時にできる作業（清掃・機内食・給油）は、いちばん長い作業の時間で考える','降機 → 清掃・点検 → 搭乗のように順番が決まった作業が1つ遅れると、出発がそのまま遅れる']},
  ko:{t:'턴어라운드 공정표(70분 예★): 빨간색이 크리티컬 패스',u:'출발까지 분',r:[['도착·도어 오픈',70,68,0],['하기',68,60,1],['수하물·화물 하기→탑재',68,12,0],['청소·보안 점검',60,36,1],['기내식',60,36,0],['급유',60,40,0],['탑승',35,12,1],['인원 대조·서류·도어 클로즈',10,5,1]],n:['동시에 할 수 있는 작업(청소·기내식·급유)은 가장 긴 작업 시간으로 생각한다','하기 → 청소·점검 → 탑승처럼 순서가 정해진 작업이 하나 늦으면 출발이 그대로 늦어진다']},
  en:{t:'Turnaround chart (70-minute example ★): red is the critical path',u:'minutes to departure',r:[['Arrival, door open',70,68,0],['Deplaning',68,60,1],['Bags and cargo off, then on',68,12,0],['Cleaning and security check',60,36,1],['Catering',60,36,0],['Fuelling',60,40,0],['Boarding',35,12,1],['Head count, documents, door close',10,5,1]],n:['Tasks done at the same time (cleaning, catering, fuelling) take as long as the longest of them','In a fixed sequence such as deplaning → cleaning and checks → boarding, one delay delays the departure']}})[l];
 if(!W)return F.gnd_turn('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+10,lw=200,x0=230,x1=610,X=function(v){return x0+(70-v)/70*(x1-x0)},rh=26,top=y;
 W.r.forEach(function(r,i){var nl=LI(r[0],9,lw-10).length,h=Math.max(rh,nl*FS(9)*1.3+8);
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',4)+WR(26,y+h/2+FS(9)*0.35,r[0],9,D,800,lw-10,'start');
  var bx=X(r[1]),bw=X(r[2])-X(r[1]);s+='<rect x="'+bx+'" y="'+(y+5)+'" width="'+Math.max(bw,4)+'" height="'+(h-10)+'" rx="4" fill="'+(r[3]?'#D64545':'#1769e0')+'" opacity="'+(r[3]?1:.55)+'"/>';y+=h+2});
 for(var v=70;v>=0;v-=10){s+='<line x1="'+X(v)+'" y1="'+top+'" x2="'+X(v)+'" y2="'+y+'" stroke="#C8D3DE" stroke-dasharray="3 4"/>'+tx(X(v),y+FS(9)+6,'-'+v,9,'#5B6B7D',700)}
 s+=tx(x1,y+FS(9)*2.4+10,W.u,9,'#5B6B7D',700,'end');
 s+='<line x1="0" y1="'+(top-4)+'" x2="0" y2="'+(y+2)+'" stroke="#0f3558" stroke-width="2.5"><animateTransform attributeName="transform" type="translate" values="'+X(70)+' 0;'+X(0)+' 0" dur="10s" repeatCount="indefinite"/></line>';
 y+=FS(9)*2.4+26;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 3-4 3つの重量と上限（数字は説明のための例★） */
gnd_wts:function(l){
 var W=({ja:{t:'3つの重量：それぞれの上限を超えない（数字は例★）',u:'トン',lab:{dow:'運航重量（DOW）',pl:'お客様・手荷物・貨物',fu:'離陸時の燃料',tr:'飛行で使う燃料'},r:[['無燃料重量（ZFW）','上限（MZFW）'],['離陸重量（TOW）','上限（MTOW）'],['着陸重量（LDW）','上限（MLW）']],n:['ZFW・TOW・LDW の3つが、それぞれの上限を超えないように積む','上限に近いときは、貨物・燃料・人数のどれで調整するかを早めに決める','数字は説明のための例。機材ごとの上限は会社の資料で確かめる']},
  ko:{t:'세 가지 중량: 각각의 상한을 넘지 않는다(숫자는 예★)',u:'톤',lab:{dow:'운항 중량(DOW)',pl:'승객·수하물·화물',fu:'이륙 연료',tr:'비행 중 쓰는 연료'},r:[['무연료 중량(ZFW)','상한(MZFW)'],['이륙 중량(TOW)','상한(MTOW)'],['착륙 중량(LDW)','상한(MLW)']],n:['ZFW·TOW·LDW 세 가지가 각각 상한을 넘지 않도록 싣는다','상한에 가까우면 화물·연료·인원 중 무엇으로 조정할지 일찍 정한다','숫자는 설명을 위한 예. 기종별 상한은 회사 자료로 확인한다']},
  en:{t:'Three weights, each within its limit (figures are examples ★)',u:'tonnes',lab:{dow:'Dry operating weight (DOW)',pl:'Passengers, bags, cargo',fu:'Take-off fuel',tr:'Fuel burned in flight'},r:[['Zero fuel weight (ZFW)','Limit (MZFW)'],['Take-off weight (TOW)','Limit (MTOW)'],['Landing weight (LDW)','Limit (MLW)']],n:['Load so that ZFW, TOW and LDW each stay within their limits','When close to a limit, decide early whether to adjust cargo, fuel or passengers','The figures are for explanation only; check each aircraft’s limits in company data']}})[l];
 if(!W)return F.gnd_wts('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+4,lw=150,x0=180,x1=600,mx=80,X=function(v){return x0+v/mx*(x1-x0)},C={dow:'#5B6B7D',pl:'#1769e0',fu:'#E08A2E',tr:'#F2C48A'};
 var TW=function(t,z){var w=0;for(var c=0;c<t.length;c++)w+=t.charCodeAt(c)>255?FS(z)*1.02:FS(z)*0.58;return w},lg=20;['dow','pl','fu','tr'].forEach(function(k){var w=TW(W.lab[k],9)+34;if(lg+w>620){lg=20;y+=22}s+='<rect x="'+lg+'" y="'+y+'" width="14" height="14" rx="3" fill="'+C[k]+'"/>'+tx(lg+20,y+11,W.lab[k],9,D,800,'start');lg+=w});y+=32;
 var rows=[[[42,'dow'],[14,'pl']],[[42,'dow'],[14,'pl'],[13,'fu']],[[42,'dow'],[14,'pl'],[4,'fu'],[9,'tr']]],lim=[62.5,77,66],tot=[56,69,60];
 rows.forEach(function(segs,i){var h=40,acc=0;s+=WR(20,y+h/2+FS(10)*0.35,W.r[i][0],10,'#0f3558',900,lw,'start');
  segs.forEach(function(g,j){var bx=X(acc),bw=X(acc+g[0])-X(acc);acc+=g[0];var tr=g[1]==='tr';
   s+='<rect x="'+bx+'" y="'+(y+6)+'" width="'+bw+'" height="'+(h-12)+'" fill="'+C[g[1]]+'"'+(tr?' opacity=".55" stroke="#E08A2E" stroke-dasharray="4 3"':'')+'/>'});
  var tv=tot[i],lx=X(lim[i]);s+='<line x1="'+lx+'" y1="'+(y-2)+'" x2="'+lx+'" y2="'+(y+h+2)+'" stroke="#D64545" stroke-width="2.5" stroke-dasharray="6 4"><animate attributeName="opacity" values="1;.35;1" dur="2s" repeatCount="indefinite"/></line>'+tx(lx,y-6,W.r[i][1]+' '+lim[i],8,'#D64545',800)+'<line x1="'+X(tv)+'" y1="'+(y+2)+'" x2="'+X(tv)+'" y2="'+(y+h-2)+'" stroke="#0f3558" stroke-width="2.5"/>'+tx(X(tv),y+h+FS(9)+2,String(tv),9,'#0f3558',900);
  y+=h+FS(9)+16});
 for(var v=0;v<=mx;v+=10){s+=tx(X(v),y,String(v),8,'#5B6B7D',700)}s+=tx(x1,y+FS(8)*1.6+4,W.u,8,'#5B6B7D',700,'end');
 y+=FS(8)*1.6+18;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 3-5 ランプの危険：エンジンの前は吸い込み、後ろは噴射。衝突防止灯が点いたら近づかない */
gnd_ramp:function(l){
 var W=({ja:{t:'ランプの危険：エンジンの前は吸い込み、後ろは噴射',in:'吸い込み',ex:'噴射',bc:'衝突防止灯',walk:'決められた歩行ルート',n:['衝突防止灯が点いている機体には近づかない（エンジンが動いている・動き出す合図）','決められた歩行ルートを歩き、機体の下や車両の間を近道しない','落ちている物（FOD）は拾う。エンジンに吸い込まれると重大な損傷になる']},
  ko:{t:'램프의 위험: 엔진 앞은 흡입, 뒤는 분사',in:'흡입',ex:'분사',bc:'충돌 방지등',walk:'정해진 보행 경로',n:['충돌 방지등이 켜진 항공기에는 다가가지 않는다(엔진이 돌고 있거나 곧 시동한다는 신호)','정해진 보행 경로로 걷고, 기체 아래나 차량 사이로 지름길을 가지 않는다','떨어진 물건(FOD)은 줍는다. 엔진에 빨려 들어가면 큰 손상이 된다']},
  en:{t:'Ramp hazards: intake in front of the engine, blast behind it',in:'Intake',ex:'Jet blast',bc:'Anti-collision light',walk:'Marked walkway',n:['Keep away from an aircraft whose anti-collision light is on (engines running or about to start)','Use the marked walkways; never cut under the aircraft or between vehicles','Pick up anything on the ramp (FOD); an engine that swallows it can be badly damaged']}})[l];
 if(!W)return F.gnd_ramp('ja');setK(1);
 var T=TOP(W.t),s=T.s,cy=T.y+150,x0=150,x1=560,fw=56,P=PLANE(x0,x1,cy,fw);
 var ex=P.wx+(x1-x0)*0.06;
 [-1,1].forEach(function(sg){var ey=cy+sg*(fw/2+58);
  s+='<path d="M'+(ex+24)+' '+ey+' m0 -34 a34 34 0 0 1 0 68 Z" fill="#D64545" opacity=".25"><animate attributeName="opacity" values=".15;.4;.15" dur="2s" repeatCount="indefinite"/></path>';
  s+='<path d="M'+(ex-24)+' '+(ey-12)+' L'+(ex-210)+' '+(ey-sg*0-44)+' L'+(ex-210)+' '+(ey+44)+' L'+(ex-24)+' '+(ey+12)+' Z" fill="#E08A2E" opacity=".22"><animate attributeName="opacity" values=".12;.35;.12" dur="2s" begin="1s" repeatCount="indefinite"/></path>'});
 s+=P.s;
 [-1,1].forEach(function(sg){var ey=cy+sg*(fw/2+58);s+='<rect x="'+(ex-24)+'" y="'+(ey-12)+'" width="48" height="24" rx="10" fill="#9FB0C2" stroke="#5B6B7D"/>'});
 s+=tx(ex+70,cy-fw/2-58+4,W.in,10,'#D64545',900,'start')+tx(ex-170,cy-fw/2-58-48,W.ex,10,'#E08A2E',900,'start');
 s+='<circle cx="'+(x0+(x1-x0)*0.55)+'" cy="'+cy+'" r="7" fill="#D64545"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/></circle>'+tx(x0+(x1-x0)*0.55+12,cy+4,W.bc,9,'#D64545',900,'start');
 var wy=cy+fw/2+160;s+='<line x1="20" y1="'+wy+'" x2="620" y2="'+wy+'" stroke="#2E9B5F" stroke-width="5" stroke-dasharray="14 8"/>'+tx(24,wy-8,W.walk,10,'#2E9B5F',900,'start');
 var y=wy+22;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 4-2 未着手荷物：見つけた空港から後の便で転送し、到着地からお客様へ配達 */
gnd_rush:function(l){
 var W=({ja:{t:'未着手荷物：見つけた空港から転送し、到着地から配達',a:['出発地','乗り継ぎ地','到着地'],r:['積み残し・誤搭載がないか確認。見つかれば早い便で転送','積み替えられなかった手荷物を確認して転送','受付・お客様への連絡・配達・当面の必需品'],tag:'転送タグ',home:'お客様へ配達',ohd:'どこでも：持ち主のいない手荷物を追跡システムに登録（OHD）',n:['転送タグを付けた手荷物は、お客様が乗っていなくても後の便で運べる','お客様には「見つかった」より「いつ・どこへ届くか」を確定して伝える','残ったかばん（OHD）と届かない申し出（AHL）が同時にあれば、取り違えを疑う']},
  ko:{t:'지연 수하물: 찾은 공항에서 전송하고 도착지에서 배송',a:['출발지','환승지','도착지'],r:['미탑재·오탑재가 없는지 확인. 찾으면 빠른 편으로 전송','환적되지 못한 수하물을 확인해 전송','접수·승객 연락·배송·당장 필요한 물품'],tag:'러시 태그',home:'승객에게 배송',ohd:'어디서나: 주인 없는 수하물을 추적 시스템에 등록(OHD)',n:['러시 태그를 단 수하물은 승객이 타지 않아도 다음 편으로 운송할 수 있다','승객에게는 「찾았다」보다 「언제·어디로 도착하는지」를 확정해 전한다','남은 가방(OHD)과 미도착 신고(AHL)가 동시에 있으면 크로스 픽업을 의심한다']},
  en:{t:'Delayed bags: forwarded from where they are found, delivered from the destination',a:['Origin','Transfer','Destination'],r:['Check for bags left behind or misloaded; send any found on an earlier flight','Check bags that missed the transfer and forward them','Take the report, contact the passenger, deliver, cover interim needs'],tag:'Rush tag',home:'Delivered to the passenger',ohd:'Everywhere: register bags with no owner in the tracing system (OHD)',n:['A bag with a rush tag can travel on a later flight without its passenger','Passengers care more about when and where the bag will arrive than about “it has been found”','A bag left over (OHD) and a missing-bag report (AHL) at the same time suggest a cross pick-up']}})[l];
 if(!W)return F.gnd_rush('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+78,xs=[110,320,530],cw=180;
 s+='<line x1="'+xs[0]+'" y1="'+y+'" x2="'+xs[2]+'" y2="'+y+'" stroke="#9FB0C2" stroke-width="4" stroke-dasharray="10 6"/>';
 xs.forEach(function(x,i){s+='<circle cx="'+x+'" cy="'+y+'" r="12" fill="'+(i===2?'#1769e0':'#0f3558')+'"/>'+tx(x,y-22,W.a[i],11,'#0f3558',900)});
 s+='<g><rect x="-14" y="-12" width="28" height="22" rx="4" fill="#E08A2E" stroke="#0f3558" stroke-width="1.5"/><rect x="8" y="-18" width="16" height="10" rx="2" fill="#D64545"/><animateMotion dur="6s" repeatCount="indefinite" path="M'+xs[0]+' '+(y-34)+' L'+xs[2]+' '+(y-34)+'"/></g>';
 s+=LB(xs[0]+120,y-60,W.tag,9,'#fff','middle','#D64545');
 var ch=0;W.r.forEach(function(r){var h=LI(r,10,cw-20).length*FS(10)*1.3+30;if(h>ch)ch=h});
 W.r.forEach(function(r,i){var x=xs[i]-cw/2;s+=R(x,y+24,cw,ch,'#fff',10,' stroke="'+(i===2?'#1769e0':'#C8D3DE')+'"'+(i===2?' stroke-width="2"':''))+WR(xs[i],y+24+ch/2+FS(10)*0.35,r,10,D,800,cw-20)});
 y+=24+ch+14;s+=ARW(xs[2],y-8,xs[2],y+14,'#1769e0',3);y+=20;s+=LB(xs[2],y+FS(10)*0.6,W.home,10,'#fff','middle','#1769e0');
 y+=FS(10)*1.3+18;s+=LB(320,y+FS(10)*0.6,W.ohd,10,'#fff','middle','#5B6B7D');y+=FS(10)*1.3+20;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 4-3 照合：探している手荷物（AHL）と持ち主のいない手荷物（OHD）を、項目ごとに照らし合わせる */
gnd_match:function(l){
 var W=({ja:{t:'追跡システムの照合：2つの登録を項目ごとに照らし合わせる',L:['探している手荷物（AHL）','到着地で登録'],R:['持ち主のいない手荷物（OHD）','各空港で登録'],f:['タグ番号（10桁）','名前・便・乗り継ぎ地','色・形のコード','特徴（名札・リボン・傷）','中身（例：赤いセーター）'],res:'一致の可能性が高い → 担当者が確認 → 転送',n:['タグ番号がいちばん強い手がかり。10桁を正確に登録する','色・形は IATA の早見表のコードで。特徴と中身は具体的に','登録の質が、見つかるまでの時間を決める']},
  ko:{t:'추적 시스템 대조: 두 등록을 항목별로 맞춰 본다',L:['찾는 수하물(AHL)','도착지에서 등록'],R:['주인 없는 수하물(OHD)','각 공항에서 등록'],f:['태그 번호(10자리)','이름·편·환승지','색·형태 코드','특징(이름표·리본·흠집)','내용물(예: 빨간 스웨터)'],res:'일치 가능성 높음 → 담당자 확인 → 전송',n:['태그 번호가 가장 강력한 단서. 10자리를 정확히 등록한다','색·형태는 IATA 조견표 코드로. 특징과 내용물은 구체적으로','등록의 질이 찾을 때까지의 시간을 정한다']},
  en:{t:'Tracing system matching: two records compared field by field',L:['Missing bag (AHL)','Registered at destination'],R:['Bag with no owner (OHD)','Registered at any station'],f:['Tag number (10 digits)','Name, flight, transfer point','Colour and type code','Features (name tag, ribbon, damage)','Contents (e.g. a red sweater)'],res:'Likely match → staff check → forward',n:['The tag number is the strongest clue; register all 10 digits correctly','Use the IATA chart codes for colour and type; describe features and contents specifically','The quality of registration decides how quickly a bag is found']}})[l];
 if(!W)return F.gnd_match('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,cw=200,lx=20,rx=420,dur='10s',n=W.f.length;
 s+=R(lx,y,cw,48,'#1769e0',10)+WR(lx+cw/2,y+20,W.L[0],11,'#fff',900,cw-16)+tx(lx+cw/2,y+40,W.L[1],9,'#DCE8FA',700);
 s+=R(rx,y,cw,48,'#E08A2E',10)+WR(rx+cw/2,y+20,W.R[0],11,'#fff',900,cw-16)+tx(rx+cw/2,y+40,W.R[1],9,'#FFF1DE',700);
 y+=58;
 W.f.forEach(function(f,i){var h=Math.max(30,LI(f,10,cw-20).length*FS(10)*1.3+12);
  var oy=y+h/2+FS(10)*0.35;s+=R(lx,y,cw,h,'#fff',8,' stroke="#C8D3DE"')+WR(lx+cw/2,oy,f,10,D,800,cw-20)+R(rx,y,cw,h,'#fff',8,' stroke="#C8D3DE"')+WR(rx+cw/2,oy,f,10,D,800,cw-20);
  s+='<line x1="'+(lx+cw)+'" y1="'+(y+h/2)+'" x2="'+rx+'" y2="'+(y+h/2)+'" stroke="#2E9B5F" stroke-width="3" stroke-dasharray="6 4" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;'+(i/n*0.8).toFixed(2)+';'+(i/n*0.8+0.02).toFixed(2)+';1" dur="'+dur+'" repeatCount="indefinite"/></line>';
  y+=h+6});
 s+='<circle cx="320" cy="'+(y-((y-T.y-58)/2))+'" r="22" fill="#2E9B5F" opacity=".15"><animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite"/></circle>';
 y+=8;s+=LB(320,y+FS(11)*0.6,W.res,11,'#fff','middle','#2E9B5F');y+=FS(11)*1.3+18;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 4-4 忘れ物：特に注意が必要な物と扱い */
gnd_lost:function(l){
 var W=({ja:{t:'忘れ物：特に注意が必要な物と扱い',r:[['パスポート・身分証','すぐに持ち主を探し、関係機関と連携','#D64545'],['現金・貴重品','2人以上で確認・記録し、封をして保管','#E08A2E'],['スマートフォン・PC','中身は見ない。個人情報に配慮する','#1769e0'],['食品・液体','規定に沿って短期間で処分することが多い','#2E9B5F'],['危険物・不審物','触らず、保安の担当・警察に連絡','#0f3558']],n:['見つけたら日時・場所・便名・品目・特徴・発見者を記録し、鍵のかかる場所に','返すときは本人確認と受領の署名','期限を過ぎた物は法令に沿って警察などへ（日本は遺失物法）']},
  ko:{t:'유실물: 특히 주의가 필요한 물건과 처리',r:[['여권·신분증','즉시 주인을 찾고 관계 기관과 연계','#D64545'],['현금·귀중품','2명 이상이 확인·기록하고 봉인해 보관','#E08A2E'],['스마트폰·PC','내용은 보지 않는다. 개인정보에 배려','#1769e0'],['식품·액체','규정에 따라 단기간에 폐기하는 경우가 많다','#2E9B5F'],['위험물·수상한 물건','만지지 말고 보안 담당·경찰에 연락','#0f3558']],n:['발견하면 일시·장소·편명·품목·특징·발견자를 기록하고 잠금 장소에','돌려줄 때는 본인 확인과 수령 서명','기한이 지난 물건은 법령에 따라 경찰 등에(일본은 유실물법)']},
  en:{t:'Lost property: items needing particular care',r:[['Passports and ID','Find the owner at once; work with the authorities','#D64545'],['Cash and valuables','Check and record with two or more people; seal and store','#E08A2E'],['Phones and computers','Do not look at the contents; respect personal data','#1769e0'],['Food and liquids','Often disposed of quickly, following the rules','#2E9B5F'],['Dangerous or suspicious items','Do not touch; call security or the police','#0f3558']],n:['Record date, place, flight, item, description and finder; keep it locked away','On return, check identity and get a signed receipt','Items not claimed in time go to the police as the law requires (Japan’s Lost Property Act)']}})[l];
 if(!W)return F.gnd_lost('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'10s');s+=A.s;
 var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 5-1 入国拒否（INAD）：到着地で拒否 → 送り返し。出発地では違反通知を調べる */
gnd_inad:function(l){
 var W=({ja:{t:'入国拒否（INAD）：到着地で送り返し、出発地で原因を調べる',a:['出発地','到着地'],x:'入国拒否',arr:['到着地','引き取り → 最も早い便を手配 → 待機中の対応 → パスポートを乗務員に預けて搭乗 → 出発地・本社に報告'],dep:['出発地','違反通知を受ける → チェックインの記録と担当者の説明を調べる'],ok:'過失なし → 反論書で罰金の免除を求める',ng:'過失あり → 是正措置・再教育',n:['主な原因：ビザ・パスポートの不備、入国条件の不足（帰りの航空券・滞在費・滞在先）、入国目的の疑い、過去の記録','いちばんの予防は、出発地のチェックインでの書類確認（1-3）']},
  ko:{t:'입국 거부(INAD): 도착지에서 송환하고, 출발지에서 원인을 조사한다',a:['출발지','도착지'],x:'입국 거부',arr:['도착지','인수 → 가장 빠른 편 수배 → 대기 중 대응 → 여권을 승무원에게 맡기고 탑승 → 출발지·본사에 보고'],dep:['출발지','위반 통지 접수 → 체크인 기록과 담당자 설명을 조사'],ok:'과실 없음 → 반론서로 벌금 면제 요청',ng:'과실 있음 → 시정 조치·재교육',n:['주요 원인: 비자·여권 미비, 입국 조건 부족(귀국 항공권·체재비·체류지), 입국 목적 의심, 과거 기록','가장 좋은 예방은 출발지 체크인의 서류 확인(1-3)']},
  en:{t:'Refused entry (INAD): returned from the destination, investigated at the origin',a:['Origin','Destination'],x:'Entry refused',arr:['Destination','Take custody → book the earliest flight → care while waiting → passport handed to the crew → report to origin and head office'],dep:['Origin','Receive the infringement notice → review the check-in record and staff account'],ok:'No fault → appeal for the fine to be waived',ng:'Fault found → corrective action and retraining',n:['Main causes: visa or passport problems, missing entry conditions (return ticket, funds, address), doubts about purpose, past records','The best prevention is the document check at the origin check-in (1-3)']}})[l];
 if(!W)return F.gnd_inad('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+40,x0=120,x1=520;
 s+='<path d="M'+x0+' '+y+' Q320 '+(y-50)+' '+x1+' '+y+'" fill="none" stroke="#1769e0" stroke-width="3"/><path d="M'+x1+' '+(y+10)+' Q320 '+(y+60)+' '+x0+' '+(y+10)+'" fill="none" stroke="#D64545" stroke-width="3" stroke-dasharray="8 6"/>';
 [x0,x1].forEach(function(x,i){s+='<circle cx="'+x+'" cy="'+(y+5)+'" r="13" fill="#0f3558"/>'+tx(x+(i?30:-30),y+9,W.a[i],11,'#0f3558',900,i?'start':'end')});
 s+='<circle r="7" fill="#1769e0"><animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.45;1" calcMode="linear" path="M'+x0+' '+y+' Q320 '+(y-50)+' '+x1+' '+y+'"/></circle>';
 s+='<circle r="7" fill="#D64545" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.52;.98;1" dur="6s" repeatCount="indefinite"/><animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;0;1" keyTimes="0;.5;1" calcMode="linear" path="M'+x1+' '+(y+10)+' Q320 '+(y+60)+' '+x0+' '+(y+10)+'"/></circle>';
 s+=LB(x1,y-30,W.x,10,'#fff','middle','#D64545');
 y+=60;var cw=294,ha=LI(W.arr[1],10,cw-24).length*FS(10)*1.3+44,hd=LI(W.dep[1],10,cw-24).length*FS(10)*1.3+44+2*(FS(10)*1.3+14),h=Math.max(ha,hd);
 s+=R(326,y,cw,h,'#fff',10,' stroke="#1769e0" stroke-width="2"')+tx(326+cw/2,y+22,W.arr[0],12,'#1769e0',900)+WT(326+cw/2,y+44,W.arr[1],10,D,800,cw-24);
 s+=R(20,y,cw,h,'#fff',10,' stroke="#0f3558" stroke-width="2"')+tx(20+cw/2,y+22,W.dep[0],12,'#0f3558',900)+WT(20+cw/2,y+44,W.dep[1],10,D,800,cw-24);
 var by=y+44+LI(W.dep[1],10,cw-24).length*FS(10)*1.3+8;s+=LB(20+cw/2,by,W.ok,9,'#fff','middle','#2E9B5F')+LB(20+cw/2,by+FS(9)*1.3+14,W.ng,9,'#fff','middle','#E08A2E');
 y+=h+16;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 5-2 ミスを見つける仕組み：何枚も重ねて、どこかで止める */
gnd_layers:function(l){
 var W=({ja:{t:'ミスは1つの仕組みでは防げない：重ねて、どこかで止める',ly:['予約番号（PNR）で検索','名前を言ってもらいパスポートと照合','搭乗券読み取り機の警告','人数の照合','手荷物の照合'],m:'ミス',n:['名前で検索しない。PNRが一致すればその人の予約。そのあと名前を本人に言ってもらい、パスポートと照合する','気づいたらすぐ報告。責めるより、すぐ言える雰囲気が被害を小さくする']},
  ko:{t:'실수는 하나의 장치로 막을 수 없다: 겹쳐서 어디선가 멈춘다',ly:['예약번호(PNR)로 검색','이름을 말하게 하고 여권과 대조','탑승권 리더기 경고','인원 대조','수하물 대조'],m:'실수',n:['이름으로 검색하지 않는다. PNR이 일치하면 그 사람의 예약. 그다음 이름을 본인이 말하게 하고 여권과 대조한다','알게 되면 즉시 보고. 탓하기보다 바로 말할 수 있는 분위기가 피해를 줄인다']},
  en:{t:'No single check catches every mistake: layer them so one of them does',ly:['Search by booking reference (PNR)','Passenger says their name; check passport','Boarding pass reader alerts','Head count reconciliation','Baggage reconciliation'],m:'Mistake',n:['Never search by name: a matching PNR means it is that person’s booking; then have them say their name and check the passport','Report at once; a culture where people speak up limits the damage more than blame does']}})[l];
 if(!W)return F.gnd_layers('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+10,n=W.ly.length,sx=90,gap=105,lh=150;
 var HO=[[60,100],[60,100],[100,30],[30,125],[78]];
 W.ly.forEach(function(t,i){var x=sx+i*gap;s+='<rect x="'+(x-9)+'" y="'+y+'" width="18" height="'+lh+'" rx="6" fill="#DCE6F0" stroke="#9FB0C2"/>';
  HO[i].forEach(function(h){s+='<rect x="'+(x-10)+'" y="'+(y+h-11)+'" width="20" height="22" fill="#F7FAFD"/>'});
  s+=WT(x,y+lh+14,t,9,D,800,96)});
 [[0,30],[2,60],[3,100]].forEach(function(d,k){var stop=sx+d[0]*gap-16,yy=y+d[1],d0=k*0.15,d1=d0+0.45;
  s+='<g><circle r="7" fill="#D64545"/><animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;'+d0.toFixed(2)+';'+d1.toFixed(2)+';1" calcMode="linear" path="M30 '+yy+' L'+stop+' '+yy+'"/></g>'});
 s+=tx(24,y-6,W.m,9,'#D64545',900,'start');
 y+=lh+14+FS(9)*1.3*3+10;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 5-3 機内の事故の種類と、到着地での地上の対応 */
gnd_med:function(l){
 var W=({ja:{t:'機内の事故：種類ごとに、到着前に地上の準備を決める',r:[['急病','空港の医療担当・救急車を待機。必要なら検疫に連絡','#D64545'],['熱い飲み物によるやけど','状態を事前に確かめて医療の待機を決める。重ければ病院へ','#E08A2E'],['収納棚からの落下物','医療を待機。当事者どうしの話し合いを仲介する','#7A5CC7'],['揺れ（タービュランス）によるけが','重いけがもあるため救急車を事前に待機させ、速やかに病院へ','#1769e0']],n:['機内から状態を早く聞き出し、到着前に準備を決める','時刻・状態・対応・関係者を記録し、本社と関係先に報告する']},
  ko:{t:'기내 사고: 유형별로 도착 전에 지상 준비를 정한다',r:[['급환','공항 의료 담당·구급차 대기. 필요하면 검역에 연락','#D64545'],['뜨거운 음료로 인한 화상','상태를 미리 확인해 의료 대기를 정한다. 심하면 병원으로','#E08A2E'],['선반에서 떨어진 물건','의료 대기. 당사자 간 협의를 중재한다','#7A5CC7'],['흔들림(난기류)으로 인한 부상','중상도 있으므로 구급차를 미리 대기시켜 신속히 병원으로','#1769e0']],n:['기내에서 상태를 빨리 파악해 도착 전에 준비를 정한다','시각·상태·대응·관계자를 기록해 본사와 관계처에 보고한다']},
  en:{t:'Incidents on board: decide ground preparations before arrival, by type',r:[['Sudden illness','Have the airport medical team and an ambulance standing by; contact quarantine if needed','#D64545'],['Burns from hot drinks','Check the condition in advance and arrange medical standby; hospital if serious','#E08A2E'],['Items falling from bins','Medical standby; help the parties talk it through','#7A5CC7'],['Injuries from turbulence','Injuries can be serious: have an ambulance ready and get to hospital quickly','#1769e0']],n:['Get details of the condition from the aircraft early and decide preparations before arrival','Record times, condition, actions and people involved; report to head office and others concerned']}})[l];
 if(!W)return F.gnd_med('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'9s');s+=A.s;
 var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 5-4 遅延の長さとサービス（例★） */
gnd_delay:function(l){
 var W=({ja:{t:'遅延の長さとサービス（例★）',u:'時間',z:[['〜2時間','理由と見込みをご案内'],['2〜4時間','飲み物・軽食'],['4〜6時間','食事・交通・連絡手段'],['6時間以上','ホテル（日中・宿泊）']],n:['天候・航空管制などの不可抗力は対象外になることが多い','宿泊は1人1室が原則。予想出発時刻と空港への出発時刻を必ず伝える','補償の例（韓国の基準、航空会社の責任による国際線の遅延）：2〜4時間 10%、4〜12時間 20%、12時間以上 30%']},
  ko:{t:'지연 시간과 서비스(예★)',u:'시간',z:[['~2시간','이유와 예상 시각 안내'],['2~4시간','음료·간식'],['4~6시간','식사·교통·연락 수단'],['6시간 이상','호텔(낮 이용·숙박)']],n:['날씨·항공 관제 등 불가항력은 대상에서 빠지는 경우가 많다','숙박은 1인 1실이 원칙. 예상 출발 시각과 공항 출발 시각을 반드시 알린다','보상 예(한국 기준, 항공사 책임 국제선 지연): 2~4시간 10%, 4~12시간 20%, 12시간 이상 30%']},
  en:{t:'Length of delay and services (example ★)',u:'hours',z:[['Up to 2 h','Explain the reason and the estimate'],['2–4 h','Drinks and snacks'],['4–6 h','Meals, transport, a way to call'],['6 h or more','Hotel (day use or overnight)']],n:['Force majeure such as weather or air traffic control is often excluded','One room per person for overnight stays; always give the expected departure and the time to leave for the airport','Example compensation (Korean standard, international delays the airline caused): 2–4 h 10%, 4–12 h 20%, 12 h+ 30%']}})[l];
 if(!W)return F.gnd_delay('ja');setK(1);
 var cols=['#5B6B7D','#2E9B5F','#E08A2E','#D64545'],T=TOP(W.t),s=T.s,y=T.y+34;
 var S=SCALE(y,8,1,[[0,2,cols[0]],[2,4,cols[1]],[4,6,cols[2]],[6,8,cols[3]]],W.u,'10s');s+=S.s;
 var C=ZCARDS(S.y,W.z,cols);s+=C.s;var L=LIST(W.n,C.y,600,11);return SVG(L.y+8,s+L.s)},
/* 5-5 ダイバートとリターン */
gnd_divert:function(l){
 var W=({ja:{t:'ダイバートとリターン：降りる空港で担当が変わる',o:'出発地',d:'目的地',a:'代わりの空港',dv:'ダイバート',rt:'リターン',c:[['支店がある空港','その空港の支店が担当し、支店のスタッフで対応'],['支店がない空港','近くの支店か会社が指定した支店が担当。現地のハンドリング会社に依頼']],n:['以遠の旅程があるお客様・急病人・VIP・車いすのお客様の情報を共有する','代わりの空港ごとの手順書（連絡先・ハンドリング会社・ホテル）を事前に用意する']},
  ko:{t:'다이버트와 리턴: 내리는 공항에 따라 담당이 바뀐다',o:'출발지',d:'목적지',a:'대체 공항',dv:'다이버트',rt:'리턴',c:[['지점이 있는 공항','그 공항 지점이 담당하고 지점 직원이 대응'],['지점이 없는 공항','가까운 지점이나 회사가 지정한 지점이 담당. 현지 조업사에 의뢰']],n:['이원 여정 승객·응급 환자·VIP·휠체어 승객 정보를 공유한다','대체 공항별 절차서(연락처·조업사·호텔)를 미리 준비한다']},
  en:{t:'Diversions and returns: who handles it depends on where the aircraft lands',o:'Origin',d:'Destination',a:'Alternate',dv:'Diversion',rt:'Return',c:[['Airport with our station','That station handles it with its own staff'],['Airport without a station','The nearest or designated station takes charge and engages the local handler']],n:['Share details of passengers with onward journeys, medical cases, VIPs and wheelchair users','Prepare a procedure for each alternate in advance (contacts, handler, hotels)']}})[l];
 if(!W)return F.gnd_divert('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+50,O=[80,y+30],Dd=[560,y+30],A=[430,y+110];
 s+='<path d="M'+O[0]+' '+O[1]+' Q320 '+(y-40)+' '+Dd[0]+' '+Dd[1]+'" fill="none" stroke="#9FB0C2" stroke-width="3" stroke-dasharray="6 6"/>';
 var pd='M'+O[0]+' '+O[1]+' Q300 '+(y-30)+' 470 '+(y+10)+' Q500 '+(y+60)+' '+A[0]+' '+A[1],pr='M'+O[0]+' '+O[1]+' Q300 '+(y-30)+' 470 '+(y+10)+' Q380 '+(y+90)+' '+O[0]+' '+(O[1]+8);
 s+='<path d="'+pd+'" fill="none" stroke="#E08A2E" stroke-width="3"/><path d="'+pr+'" fill="none" stroke="#D64545" stroke-width="3" stroke-dasharray="8 5"/>';
 [[O,W.o,'#0f3558'],[Dd,W.d,'#5B6B7D'],[A,W.a,'#E08A2E']].forEach(function(p){s+='<circle cx="'+p[0][0]+'" cy="'+p[0][1]+'" r="12" fill="'+p[2]+'"/>'+tx(p[0][0],p[0][1]+30,p[1],10,p[2],900)});
 s+='<path d="M'+(Dd[0]-12)+' '+(Dd[1]-12)+' l24 24 m0 -24 l-24 24" stroke="#D64545" stroke-width="4"/>';
 s+='<circle r="7" fill="#E08A2E"><animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.45;1" calcMode="linear" path="'+pd+'"/></circle><circle r="7" fill="#D64545" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.5;.52;1" dur="8s" repeatCount="indefinite"/><animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;.5;.95;1" calcMode="linear" path="'+pr+'"/></circle>';
 s+=LB(560,y+100,W.dv,10,'#fff','middle','#E08A2E')+LB(180,y+110,W.rt,10,'#fff','middle','#D64545');
 var C=ZCARDS(y+150,W.c,['#1769e0','#5B6B7D']);s+=C.s;var L=LIST(W.n,C.y,600,11);return SVG(L.y+8,s+L.s)},

/* 5-6 振り替えの選択肢 */
gnd_reacc:function(l){
 var W=({ja:{t:'欠航のときの振り替え：4つの選択肢',r:[['自社の次の便','最も多い対応。空席と優先順位で割り当てる','#1769e0'],['他社便へのエンドース','取り決めのある他社の便に乗れるようにする','#2C8C8C'],['経路の変更（リルート）','別の経由地を使って最終目的地へ','#7A5CC7'],['払い戻し','旅行をやめるお客様に。航空会社都合なら手数料なしが一般的','#E08A2E']],n:['欠航が決まったら、お客様への連絡・振り替え・補償の案内を同時に進める','苦情は記録し、事実と対応を本社と共有する']},
  ko:{t:'결항 시 대체 수송: 네 가지 선택지',r:[['자사 다음 편','가장 많은 대응. 빈 좌석과 우선순위로 배정','#1769e0'],['타사편 엔도스','협정이 있는 타사 편에 탈 수 있게 한다','#2C8C8C'],['경로 변경(리루트)','다른 경유지를 거쳐 최종 목적지로','#7A5CC7'],['환불','여행을 포기하는 승객에게. 항공사 사정이면 수수료 없음이 일반적','#E08A2E']],n:['결항이 정해지면 승객 연락·대체 수송·보상 안내를 동시에 진행한다','불만은 기록하고 사실과 대응을 본사와 공유한다']},
  en:{t:'Re-accommodation after a cancellation: four options',r:[['Our next flight','The most common option; seats allocated by availability and priority','#1769e0'],['Endorse to another airline','Put passengers on a partner airline’s flight','#2C8C8C'],['Reroute','Reach the final destination via another point','#7A5CC7'],['Refund','For passengers who give up the trip; usually free of charge if the airline cancelled','#E08A2E']],n:['Once a cancellation is decided, contact passengers, rebook and explain compensation in parallel','Record complaints and share the facts and actions with head office']}})[l];
 if(!W)return F.gnd_reacc('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'9s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 5-7 機内での長時間待機：時間と対応（国の規則の例★） */
gnd_tarmac:function(l){
 var W=({ja:{t:'機内での長時間待機：時間で対応が変わる（例★）',u:'ドアを閉めてからの時間',z:[['〜2時間','30分ごとに理由と状況を案内'],['2〜3時間','飲食物・トイレ（米国の例）、会社の基準で降機を検討'],['3時間','国内線の上限（韓国・米国の例）'],['4時間','国際線の上限（韓国・米国の例）']],n:['日本は法律上の一律の上限がなく、航空会社の基準による','機長の安全上の判断など例外がある。最新の規則を確かめる','超えたときの報告と記録（韓国は資料を2年間保管）']},
  ko:{t:'기내 장시간 대기: 시간에 따라 대응이 달라진다(예★)',u:'도어 클로즈 후 시간',z:[['~2시간','30분마다 이유와 상황 안내'],['2~3시간','음식·화장실(미국 예), 회사 기준으로 하기 검토'],['3시간','국내선 상한(한국·미국 예)'],['4시간','국제선 상한(한국·미국 예)']],n:['일본은 법률상 일률 상한이 없고 항공사 기준에 따른다','기장의 안전상 판단 등 예외가 있다. 최신 규정을 확인한다','초과 시 보고와 기록(한국은 자료를 2년간 보관)']},
  en:{t:'Long waits on board: what to do changes with time (example ★)',u:'hours after door close',z:[['Up to 2 h','Update every 30 minutes on the reason and situation'],['2–3 h','Food, drink and toilets (US example); consider deplaning under company rules'],['3 h','Domestic limit (Korea and US example)'],['4 h','International limit (Korea and US example)']],n:['Japan has no single legal limit; airlines set their own standards','Exceptions apply, such as the captain’s safety judgement; check the latest rules','Report and record any excess (Korea requires records to be kept for 2 years)']}})[l];
 if(!W)return F.gnd_tarmac('ja');setK(1);
 var cols=['#2E9B5F','#E08A2E','#D64545','#0f3558'],T=TOP(W.t),s=T.s,y=T.y+34;
 var S=SCALE(y,5,1,[[0,2,cols[0]],[2,3,cols[1]],[3,4,cols[2]],[4,5,cols[3]]],W.u,'10s');s+=S.s;
 [3,4].forEach(function(v,i){s+='<line x1="'+S.X(v)+'" y1="'+(y-6)+'" x2="'+S.X(v)+'" y2="'+(y+32)+'" stroke="#fff" stroke-width="3"/>'});
 var C=ZCARDS(S.y,W.z,cols);s+=C.s;var L=LIST(W.n,C.y,600,11);return SVG(L.y+8,s+L.s)},

/* 5-8 「知った時刻」と「伝えた時刻」の差：韓国で公表された処分の例★ */
gnd_gap:function(l){
 var W=({ja:{t:'記録するのは「知った時刻」と「伝えた時刻」：その差を短く',k:'知った時刻',g:'伝えた時刻',gp:'この差が問われる',c:[['遅延の案内の遅れ（2024年）','7便 × 200万ウォン ＝ 1,400万ウォン'],['遅延の未案内・遅れ（2025年）','9便 × 200万ウォン ＝ 1,800万ウォン'],['手荷物を積めないことを離陸後に通知（2025年）','合計 1,200万ウォン']],n:['日本の支店でも、韓国発着の便は韓国の基準の対象になる','金額・基準は改正される。最新の法令を確かめる（国土交通部の発表・報道による例）']},
  ko:{t:'기록할 것은 「안 시각」과 「알린 시각」: 그 차이를 짧게',k:'안 시각',g:'알린 시각',gp:'이 차이가 문제가 된다',c:[['지연 안내 지연(2024년)','7편 × 200만 원 = 1,400만 원'],['지연 미안내·지연(2025년)','9편 × 200만 원 = 1,800만 원'],['수하물 미탑재를 이륙 후 통지(2025년)','합계 1,200만 원']],n:['일본 지점이라도 한국 출도착편은 한국 기준의 대상이 된다','금액·기준은 개정된다. 최신 법령을 확인한다(국토교통부 발표·보도에 따른 예)']},
  en:{t:'Record when you knew and when you told: keep the gap short',k:'Time known',g:'Time told',gp:'This gap is what regulators look at',c:[['Late delay notices (2024)','7 flights × KRW 2m = KRW 14m'],['Delays not notified or notified late (2025)','9 flights × KRW 2m = KRW 18m'],['Bags left behind notified after take-off (2025)','KRW 12m in total']],n:['Flights to and from Korea fall under Korean rules even when handled by a Japan station','Amounts and rules change; check the latest law (examples from ministry releases and press reports)']}})[l];
 if(!W)return F.gnd_gap('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+40,x0=120;
 s+='<line x1="40" y1="'+y+'" x2="600" y2="'+y+'" stroke="#9FB0C2" stroke-width="4"/>';
 s+='<circle cx="'+x0+'" cy="'+y+'" r="10" fill="#1769e0"/>'+tx(x0,y-18,W.k,10,'#1769e0',900);
 s+='<rect x="'+x0+'" y="'+(y-6)+'" width="0" height="12" fill="#D64545" opacity=".5"><animate attributeName="width" values="0;380;380;0" keyTimes="0;.7;.9;1" dur="7s" repeatCount="indefinite"/></rect>';
 s+='<g><circle r="10" fill="#D64545"/><animateMotion dur="7s" repeatCount="indefinite" keyPoints="0;1;1;0" keyTimes="0;.7;.9;1" calcMode="linear" path="M'+x0+' '+y+' L500 '+y+'"/></g>'+tx(500,y-18,W.g,10,'#D64545',900);
 s+=LB(310,y+28,W.gp,10,'#fff','middle','#D64545');
 var C=ZCARDS(y+52,W.c,['#E08A2E','#D64545','#7A5CC7']);s+=C.s;var L=LIST(W.n,C.y,600,11);return SVG(L.y+8,s+L.s)},

/* 6-1 運送マネージャーの1日（1日1往復の国際線の例★） */
gnd_day:function(l){
 var W=({ja:{t:'運送マネージャーの1日（1日1往復の国際線の例★）',st:['便の情報と本社の指示を確認、ハンドリング会社と打ち合わせ','カウンターの準備を確認、チェックイン開始','チェックイン締め切り、ゲートへ。搭載の状況を確認','搭乗・人数の照合・書類・ドアクローズ、プッシュバックの見届け','出発の電報と特記事項の連絡','締め作業。空き時間に教育・書類・会議・次の日の準備'],who:['出発4〜3時間前','出発3時間前','出発1時間前','出発前後','出発後','出発後1〜2時間'],n:['便ごとの仕事を決まった時刻に終え、空き時間を育成と改善に使う']},
  ko:{t:'운송 매니저의 하루(하루 1왕복 국제선 예★)',st:['편 정보와 본사 지시 확인, 조업사와 협의','카운터 준비 확인, 체크인 시작','체크인 마감, 게이트로. 탑재 상황 확인','탑승·인원 대조·서류·도어 클로즈, 푸시백 확인','출발 전문과 특기 사항 연락','마감 작업. 빈 시간에 교육·서류·회의·다음 날 준비'],who:['출발 4~3시간 전','출발 3시간 전','출발 1시간 전','출발 전후','출발 후','출발 후 1~2시간'],n:['편마다 할 일을 정해진 시각에 끝내고, 빈 시간을 육성과 개선에 쓴다']},
  en:{t:'A day for a passenger services manager (one daily international rotation ★)',st:['Check flight information and head office instructions; brief the handler','Confirm counter readiness; open check-in','Close check-in, go to the gate; check loading status','Boarding, head count, documents, door close; watch the pushback','Send the departure message and special notes','Close the flight; use spare time for training, paperwork, meetings and tomorrow’s preparation'],who:['4–3 h before','3 h before','1 h before','Around departure','After departure','1–2 h after'],n:['Finish each flight’s tasks at set times, and spend the spare time on training and improvement']}})[l];
 if(!W)return F.gnd_day('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#5B6B7D','#1769e0','#2C8C8C','#D64545','#E08A2E','#0f3558'],'12s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},

/* 6-2 ハンドリング会社の管理：5つの柱 */
gnd_5p:function(l){
 var W=({ja:{t:'ハンドリング会社の管理：5つの柱で品質を支える',roof:'ハンドリングの品質',p:[['月例会議','実績・問題点・改善策・次月の予定'],['品質監査','点検表で作業を評価'],['教育','手順・新人・指導者の育成'],['安全の審査','定期審査と是正の確認'],['費用の確認','請求と実際の作業を照合']],n:['どれか1本が欠けると、品質は保てない','会議・監査・教育の記録は、監査に備えて保管する（6-4）']},
  ko:{t:'조업사 관리: 다섯 개의 기둥으로 품질을 지탱한다',roof:'조업 품질',p:[['월례 회의','실적·문제점·개선책·다음 달 일정'],['품질 감사','점검표로 작업 평가'],['교육','절차·신입·지도자 육성'],['안전 심사','정기 심사와 시정 확인'],['비용 확인','청구와 실제 작업 대조']],n:['하나라도 빠지면 품질을 유지할 수 없다','회의·감사·교육 기록은 감사에 대비해 보관한다(6-4)']},
  en:{t:'Managing the handling company: five pillars hold up quality',roof:'Handling quality',p:[['Monthly meeting','Results, issues, fixes, next month'],['Quality audit','Score the work against checklists'],['Training','Procedures, new staff, trainers'],['Safety review','Regular reviews and follow-up'],['Cost check','Match invoices to work done']],n:['Take away any one pillar and quality cannot be kept','Keep records of meetings, audits and training for audits (6-4)']}})[l];
 if(!W)return F.gnd_5p('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y+4,cw=104,g=20,x0=30,cols=['#1769e0','#2C8C8C','#2E9B5F','#E08A2E','#7A5CC7'];
 s+='<path d="M20 '+(y+50)+' L320 '+y+' L620 '+(y+50)+' Z" fill="#0f3558"/>'+tx(320,y+38,W.roof,12,'#fff',900);
 y+=56;var ph=0;W.p.forEach(function(p){var h=36+LI(p[1],9,cw-12).length*FS(9)*1.3+16;if(h>ph)ph=h});ph=Math.max(ph,130);
 W.p.forEach(function(p,i){var x=x0+i*(cw+g);s+=R(x,y,cw,ph,'#fff',6,' stroke="'+cols[i]+'" stroke-width="2"')+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="30" fill="'+cols[i]+'"/>'+WR(x+cw/2,y+19,p[0],10,'#fff',900,cw-8)+WT(x+cw/2,y+50,p[1],9,D,800,cw-12)+GLOW(x,y,cw,ph,i,5,'10s',6)});
 y+=ph;s+=R(20,y,600,14,'#9FB0C2',4);y+=30;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 6-3 空港IDパスの一生：申請から返却まで */
gnd_pass:function(l){
 var W=({ja:{t:'空港IDパスの一生：申請から返却まで',st:['申請（書類・身元の確認）','保安教育を受講','発行（受け取りと記録）','使用・更新（期限の管理）','返却（退職・異動のとき必ず回収）'],c:'紛失したら\nすぐ報告',n:['期限の一覧を作り、更新の申請を早めに','退職・異動の日に回収できるよう、手続きを人事の流れに組み込む']},
  ko:{t:'공항 ID 패스의 일생: 신청부터 반납까지',st:['신청(서류·신원 확인)','보안 교육 수강','발급(수령과 기록)','사용·갱신(기한 관리)','반납(퇴직·이동 시 반드시 회수)'],c:'분실하면\n즉시 보고',n:['기한 목록을 만들어 갱신 신청을 일찍','퇴직·이동 날 회수할 수 있도록 절차를 인사 흐름에 넣는다']},
  en:{t:'The life of an airport ID pass: from application to return',st:['Apply (documents, identity check)','Attend security training','Issue (receipt and record)','Use and renew (track expiry)','Return (always collect on leaving or transfer)'],c:'If lost,\nreport at once',n:['Keep a list of expiry dates and apply for renewal early','Build collection into the HR process so passes come back on the leaving date']}})[l];
 if(!W)return F.gnd_pass('ja');setK(1);
 var T=TOP(W.t),s=T.s,cx=320,cy=T.y+150,r=120,n=W.st.length,cols=['#1769e0','#2C8C8C','#2E9B5F','#E08A2E','#7A5CC7'];
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#C8D3DE" stroke-width="4" stroke-dasharray="8 6"/>';
 W.st.forEach(function(t,i){var a=-Math.PI/2+i*2*Math.PI/n,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a),bw=150,nl=LI(t,9,bw-14).length,bh=nl*FS(9)*1.3+30;
  s+=R(x-bw/2,y-bh/2,bw,bh,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+GLOW(x-bw/2,y-bh/2,bw,bh,i,n,'10s',10)+'<circle cx="'+(x-bw/2+14)+'" cy="'+(y-bh/2+14)+'" r="9" fill="'+cols[i]+'"/>'+tx(x-bw/2+14,y-bh/2+18,String(i+1),9,'#fff',900)+WR(x,y+FS(9)*0.35+6,t,9,D,800,bw-14)});
 var c=W.c.split('\n');s+='<circle cx="'+cx+'" cy="'+cy+'" r="46" fill="#D64545"/>'+tx(cx,cy-2,c[0],10,'#fff',900)+tx(cx,cy+FS(10)+2,c[1],10,'#fff',900);
 var y=cy+r+50;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 6-4 主な監査 */
gnd_audit:function(l){
 var W=({ja:{t:'支店が受ける主な監査',r:[['本社の安全・品質監査','マニュアルどおりの運用、教育の記録、ハンドリング会社の管理','#1769e0'],['自国の航空当局の点検','運航の安全基準、保安、危険物、旅客の手順','#D64545'],['駐在国の当局の監査','保安計画・保安教育・危険物など（日本は国土交通省）','#E08A2E'],['支店の自己評価','点検表で自ら評価し、改善につなげる','#2E9B5F']],n:['監査は「記録」で答える。教育・点検・是正の記録を決めた期間保管する','日ごろの自己評価が、外部の監査へのいちばんの備え']},
  ko:{t:'지점이 받는 주요 감사',r:[['본사 안전·품질 감사','매뉴얼대로의 운용, 교육 기록, 조업사 관리','#1769e0'],['자국 항공 당국 점검','운항 안전 기준, 보안, 위험물, 여객 절차','#D64545'],['주재국 당국 감사','보안 계획·보안 교육·위험물 등(일본은 국토교통성)','#E08A2E'],['지점 자체 평가','점검표로 스스로 평가해 개선으로','#2E9B5F']],n:['감사는 「기록」으로 답한다. 교육·점검·시정 기록을 정한 기간 보관한다','평소의 자체 평가가 외부 감사에 대한 가장 좋은 대비']},
  en:{t:'The main audits a station faces',r:[['Head office safety and quality audit','Working to the manual, training records, oversight of the handler','#1769e0'],['Home-country regulator inspection','Operational safety standards, security, DG, passenger procedures','#D64545'],['Host-country regulator audit','Security programme and training, DG and more (MLIT in Japan)','#E08A2E'],['Station self-assessment','Score yourself on checklists and improve','#2E9B5F']],n:['Audits are answered with records: keep training, inspection and corrective-action records for the set period','Regular self-assessment is the best preparation for outside audits']}})[l];
 if(!W)return F.gnd_audit('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'9s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 6-5 空港協議会（AOC）で扱うテーマ */
gnd_aoc:function(l){
 var W=({ja:{t:'空港協議会（AOC）：航空会社が集まって空港の課題を話し合う',c:'AOC',r:[['施設','カウンター・改修・手荷物設備'],['運用','混雑・定時性・除雪'],['料金','使用料の改定・割引'],['保安','検査の変更・教育・パス'],['緊急時','緊急時計画・合同訓練'],['情報共有','新規就航・行政の変更']],n:['1社では言いにくい要望も、協議会を通せば空港に届きやすい','支店長が出席し、決まったことを本社と現場に伝える']},
  ko:{t:'공항 운영위원회(AOC): 항공사들이 모여 공항 과제를 논의한다',c:'AOC',r:[['시설','카운터·개보수·수하물 설비'],['운용','혼잡·정시성·제설'],['요금','사용료 개정·할인'],['보안','검색 변경·교육·패스'],['비상시','비상 계획·합동 훈련'],['정보 공유','신규 취항·행정 변경']],n:['한 회사로는 말하기 어려운 요청도 위원회를 통하면 공항에 전달되기 쉽다','지점장이 참석해 결정 사항을 본사와 현장에 전한다']},
  en:{t:'Airline Operators Committee (AOC): airlines tackle airport issues together',c:'AOC',r:[['Facilities','Counters, works, baggage systems'],['Operations','Congestion, punctuality, snow'],['Charges','Fee changes, discounts'],['Security','Screening, training, passes'],['Emergencies','Plans and joint exercises'],['Information','New routes, policy changes']],n:['Requests that are hard for one airline to make carry more weight through the committee','The station manager attends and passes decisions to head office and the front line']}})[l];
 if(!W)return F.gnd_aoc('ja');setK(1);
 var T=TOP(W.t),s=T.s,cx=320,cy=T.y+140,r=118,n=W.r.length,cols=['#1769e0','#2C8C8C','#E08A2E','#D64545','#7A5CC7','#2E9B5F'];
 W.r.forEach(function(p,i){var a=-Math.PI/2+i*2*Math.PI/n,x=cx+r*1.5*Math.cos(a),y=cy+r*Math.sin(a),bw=170,bh=52;
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+x+'" y2="'+y+'" stroke="#C8D3DE" stroke-width="2"/>'});
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="40" fill="#0f3558"/>'+tx(cx,cy+6,W.c,16,'#fff',900);
 W.r.forEach(function(p,i){var a=-Math.PI/2+i*2*Math.PI/n,x=cx+r*1.5*Math.cos(a),y=cy+r*Math.sin(a),bw=170,bh=40+LI(p[1],9,bw-12).length*FS(9)*1.3;
  s+=R(x-bw/2,y-bh/2,bw,bh,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+GLOW(x-bw/2,y-bh/2,bw,bh,i,n,'12s',10)+tx(x,y-bh/2+20,p[0],11,cols[i],900)+WT(x,y-bh/2+34+FS(9)*0.4,p[1],9,D,800,bw-12)});
 var y=cy+r+44;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 6-6 支店の1年（例★） */
gnd_year:function(l){
 var W=({ja:{t:'支店の1年（日本・3月決算の例★）',per:['1月','2〜3月','4〜5月','6〜8月','9〜10月','11〜12月'],tr:[['運航・季節','人事・経理'],[['夏ダイヤの準備','運賃申請・夏ダイヤ確定','夏ダイヤ開始・大型連休','冬ダイヤの準備・台風・夏休み','冬ダイヤ確定・除氷の準備','冬ダイヤ開始・年末年始'],['法定調書（1月末）','予算・決算の準備','法人税の申告（5月）','労働保険・算定基礎届','上半期の振り返り','年末調整・翌年度予算']]],n:['通年：当局の監査、IDパスの更新、ハンドリング会社との契約の見直し','就航先の国の祝日（旧正月など）は年初に確認して要員を計画する','税・社会保険の期限は毎年、専門家や当局の案内で確かめる']},
  ko:{t:'지점의 1년(일본·3월 결산 예★)',per:['1월','2~3월','4~5월','6~8월','9~10월','11~12월'],tr:[['운항·계절','인사·경리'],[['하계 스케줄 준비','운임 신청·하계 확정','하계 시작·대형 연휴','동계 준비·태풍·여름휴가','동계 확정·제빙 준비','동계 시작·연말연시'],['법정 조서(1월 말)','예산·결산 준비','법인세 신고(5월)','노동보험·산정기초신고','상반기 돌아보기','연말정산·다음 연도 예산']]],n:['연중: 당국 감사, ID 패스 갱신, 조업사 계약 재검토','취항국 공휴일(설날 등)은 연초에 확인해 인원을 계획한다','세금·사회보험 기한은 매년 전문가나 당국 안내로 확인한다']},
  en:{t:'A station’s year (Japan, March year-end example ★)',per:['Jan','Feb–Mar','Apr–May','Jun–Aug','Sep–Oct','Nov–Dec'],tr:[['Operations & season','HR & accounts'],[['Prepare summer schedule','Fares filed, summer schedule fixed','Summer starts, Golden Week','Prepare winter, typhoons, summer peak','Winter fixed, de-icing ready','Winter starts, year-end peak'],['Statutory returns (end Jan)','Budget and closing prep','Corporate tax return (May)','Labour insurance, social insurance filing','Half-year review','Year-end tax adjustment, budget']]],n:['All year: regulator audits, ID pass renewals, handler contract reviews','Check destination-country holidays (Lunar New Year etc.) early in the year and plan staffing','Confirm tax and social insurance deadlines each year with advisers or authorities']}})[l];
 if(!W)return F.gnd_year('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,lw=90,x0=20+lw+6,cw=(600-lw-6-5*4)/6,cols=['#1769e0','#E08A2E'];
 W.per.forEach(function(p,i){var x=x0+i*(cw+4);s+=R(x,y,cw,28,'#0f3558',6)+tx(x+cw/2,y+19,p,10,'#fff',900)});
 var top=y;y+=34;
 [0,1].forEach(function(t){var h=0;W.tr[1][t].forEach(function(c){var hh=LI(c,9,cw-10).length*FS(9)*1.3+16;if(hh>h)h=hh});
  s+=R(20,y,lw,h,cols[t],8)+WR(20+lw/2,y+h/2+FS(9)*0.35,W.tr[0][t],9,'#fff',900,lw-10);
  W.tr[1][t].forEach(function(c,i){var x=x0+i*(cw+4),nl=LI(c,9,cw-10).length;s+=R(x,y,cw,h,'#fff',8,' stroke="'+cols[t]+'"')+WR(x+cw/2,y+h/2+FS(9)*0.35,c,9,D,800,cw-10)});
  y+=h+6});
 W.per.forEach(function(p,i){var x=x0+i*(cw+4);s+=GLOW(x-2,top-2,cw+4,y-top,i,6,'12s',8)});
 y+=8;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},
/* 6-7 ハンドリング会社のオペレーション部門：担当と仕事（例★） */
gnd_ops:function(l){
 var W=({ja:{t:'ハンドリング会社のオペレーション部門：担当と仕事（例★）',r:[['運営の統括（デスク）','便ごとの進み具合の監視・現場への指示・航空会社との連絡','#0f3558'],['資源の割り当て','勤務・要員・GSEの配置、スポット変更への対応','#1769e0'],['搭載管理','LIR・ロードシート・最後の変更の処理','#7A5CC7'],['運航の情報・電報','MVT・LDM・CPM・PTMの送信、遅延コードの記録','#2C8C8C'],['品質・教育','品質の点検、教育の記録、監査への対応','#2E9B5F']],n:['遅れの原因を最初に記録するのはオペレーション部門。遅延コードの付け方を支店と合わせておく','小さな会社では1人が複数の担当を兼ねる']},
  ko:{t:'조업사의 오퍼레이션 부문: 담당과 업무(예★)',r:[['운영 총괄(데스크)','편별 진행 감시·현장 지시·항공사와 연락','#0f3558'],['자원 배정','근무·인원·GSE 배치, 스폿 변경 대응','#1769e0'],['탑재 관리','LIR·로드시트·막판 변경 처리','#7A5CC7'],['운항 정보·전문','MVT·LDM·CPM·PTM 송신, 지연 코드 기록','#2C8C8C'],['품질·교육','품질 점검, 교육 기록, 감사 대응','#2E9B5F']],n:['지연 원인을 맨 처음 기록하는 곳은 오퍼레이션 부문. 지연 코드 기준을 지점과 미리 맞춘다','작은 회사에서는 한 사람이 여러 담당을 겸한다']},
  en:{t:'The handler’s operations department: roles and work (example ★)',r:[['Operations control (desk)','Monitor each flight, direct the front line, liaise with the airline','#0f3558'],['Resource allocation','Rosters, staff and GSE per flight, stand changes','#1769e0'],['Load control','LIR, load sheet, last-minute changes','#7A5CC7'],['Movement messages','Send MVT, LDM, CPM, PTM; record delay codes','#2C8C8C'],['Quality and training','Quality checks, training records, audits','#2E9B5F']],n:['Operations is the first to record the cause of a delay; agree delay-code rules with the station in advance','In small companies one person may cover several roles']}})[l];
 if(!W)return F.gnd_ops('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'10s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 6-8 請求書の照合：確かめることと確かめ方 */
gnd_bill:function(l){
 var W=({ja:{t:'ハンドリング会社の請求書：何を、何と照らすか',r:[['便数・機材','運航の実績（MVT・日報）と照合','#1769e0'],['時間外・深夜の割増','予定ではなく実際のブロック時刻で確認','#E08A2E'],['遅延・欠航時の追加作業','遅延コードと原因の記録で責任を確認','#D64545'],['単価','契約（SGHAの付属書）と最新の料金表','#7A5CC7'],['重複','前月・同じ便の請求と並べて確認','#2C8C8C'],['特別な対応','依頼の記録（誰が・いつ・何を）','#2E9B5F']],n:['確認の出発点は支店自身の記録。便ごとの実際の時刻・機材・追加作業の依頼を残す','差があれば根拠を添えて問い合わせ、費目ごとに月次で分析する']},
  ko:{t:'조업사 청구서: 무엇을 무엇과 대조하나',r:[['편수·기재','운항 실적(MVT·일보)과 대조','#1769e0'],['시간외·심야 할증','예정이 아닌 실제 블록 시각으로 확인','#E08A2E'],['지연·결항 시 추가 작업','지연 코드와 원인 기록으로 책임 확인','#D64545'],['단가','계약(SGHA 부속서)과 최신 요금표','#7A5CC7'],['중복','전월·같은 편 청구와 나란히 확인','#2C8C8C'],['특별 대응','의뢰 기록(누가·언제·무엇을)','#2E9B5F']],n:['확인의 출발점은 지점 자신의 기록. 편별 실제 시각·기재·추가 작업 의뢰를 남긴다','차이가 있으면 근거를 붙여 문의하고, 비목별로 월별 분석한다']},
  en:{t:'Handler invoices: what to check, and against what',r:[['Flights and aircraft','Movement records (MVT, daily reports)','#1769e0'],['Overtime and night premiums','Actual block times, not scheduled ones','#E08A2E'],['Extra work for delays and cancellations','Delay codes and cause records to confirm responsibility','#D64545'],['Unit rates','The contract (SGHA annex) and the latest price list','#7A5CC7'],['Duplicates','Compare with last month and the same flight','#2C8C8C'],['Special requests','Request records (who, when, what)','#2E9B5F']],n:['Checking starts from the station’s own records: actual times, aircraft and requests for each flight','Query differences with evidence, and analyse costs by item every month']}})[l];
 if(!W)return F.gnd_bill('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 6-9 KPI月報の主な指標と計算（例★） */
gnd_kpi:function(l){
 var W=({ja:{t:'支店のKPI：主な指標と計算（例★）',r:[['出発の定時率（D15）','定刻から15分以内に出発した便 ÷ 運航便数','#1769e0'],['地上起因の遅延','支店・ハンドリング会社が原因の遅延の件数','#D64545'],['搭乗率','旅客数 ÷ 提供座席数','#2C8C8C'],['手荷物事故率','事故の件数 ÷ 旅客数 × 1,000','#E08A2E'],['苦情率','苦情の件数 ÷ 旅客数 × 10,000','#7A5CC7'],['1便あたりの費用','費用の合計 ÷ 運航便数','#2E9B5F']],n:['数字だけでなく「理由」と「対策」を1枚にまとめる','指標の定義・分母・目標は本社の定義書に合わせる']},
  ko:{t:'지점 KPI: 주요 지표와 계산(예★)',r:[['출발 정시율(D15)','정시 15분 이내 출발 편 ÷ 운항 편수','#1769e0'],['지상 원인 지연','지점·조업사 원인 지연 건수','#D64545'],['탑승률','여객 수 ÷ 제공 좌석 수','#2C8C8C'],['수하물 사고율','사고 건수 ÷ 여객 수 × 1,000','#E08A2E'],['불만율','불만 건수 ÷ 여객 수 × 10,000','#7A5CC7'],['편당 비용','비용 합계 ÷ 운항 편수','#2E9B5F']],n:['숫자만이 아니라 「이유」와 「대책」을 한 장에 정리한다','지표의 정의·분모·목표는 본사 정의서에 맞춘다']},
  en:{t:'Station KPIs: key measures and formulas (example ★)',r:[['On-time departure (D15)','Flights leaving within 15 minutes ÷ flights operated','#1769e0'],['Ground-caused delays','Number of delays caused by station or handler','#D64545'],['Load factor','Passengers ÷ seats offered','#2C8C8C'],['Mishandled bag rate','Incidents ÷ passengers × 1,000','#E08A2E'],['Complaint rate','Complaints ÷ passengers × 10,000','#7A5CC7'],['Cost per flight','Total cost ÷ flights operated','#2E9B5F']],n:['Put the numbers, the reasons and the actions on one page','Use head office definitions for each measure, denominator and target']}})[l];
 if(!W)return F.gnd_kpi('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 6-10 新しいスタッフの30日（例★） */
gnd_30d:function(l){
 var W=({ja:{t:'新しいスタッフの30日：着任から独り立ちまで（例★）',st:['迷わず出勤でき、安全の基本の決まりを知る','保安・危険物・安全の初期教育を受け、記録に残す','指導者が見ている中で簡単な手続きができる','一人でできる業務の一覧ができる','独り立ちの判定と記録、今後の教育の計画'],who:['1日目','1週目','2週目','3週目','4週目（30日）'],n:['指導者（バディ）を決め、毎週短い面談で進み具合を確かめる','経験者は短く、未経験者は長くなることがある']},
  ko:{t:'신입 직원의 30일: 부임부터 독립까지(예★)',st:['헤매지 않고 출근하고, 안전의 기본 규칙을 안다','보안·위험물·안전 초기 교육을 받고 기록으로 남긴다','지도자가 보는 가운데 간단한 수속을 할 수 있다','혼자 할 수 있는 업무 목록이 생긴다','독립 판정과 기록, 앞으로의 교육 계획'],who:['1일째','1주차','2주차','3주차','4주차(30일)'],n:['지도자(버디)를 정하고 매주 짧은 면담으로 진행을 확인한다','경력자는 짧게, 미경험자는 길어질 수 있다']},
  en:{t:'A new staff member’s first 30 days: from arrival to working solo (example ★)',st:['Can find the way in and knows the basic safety rules','Completes initial security, DG and safety training, recorded','Can do simple tasks while the trainer watches','Has a list of tasks they can do alone','Sign-off for solo work, recorded, with a training plan'],who:['Day 1','Week 1','Week 2','Week 3','Week 4 (day 30)'],n:['Assign a buddy and check progress in a short weekly talk','Experienced hires may need less time, newcomers more']}})[l];
 if(!W)return F.gnd_30d('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#5B6B7D','#1769e0','#2C8C8C','#E08A2E','#2E9B5F'],'10s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},

/* 6-11 カスハラ対策：事業主が講じる4つの柱 */
gnd_kh4:function(l){
 var W=({ja:{t:'カスタマーハラスメント対策：会社が講じる4つの柱',c:[['方針','許さない方針を決め、社員とお客様に示す'],['相談の体制','窓口を決め、受けた人が対応できるようにする'],['起きたあと','事実の確認、被害を受けた社員への配慮、行為者への対応'],['抑止','対応ルール・研修・録音や録画']],g:'あわせて：相談した人のプライバシーを守り、不利益な扱いをしない',n:['空港では支店とハンドリング会社で方針・窓口・記録の様式をそろえる','現場の具体的な対応の手順は次の回（6-12）']},
  ko:{t:'고객 괴롭힘(카스하라) 대책: 회사가 갖출 네 가지 기둥',c:[['방침','용납하지 않는 방침을 정해 직원과 고객에게 알린다'],['상담 체계','창구를 정하고, 상담을 받은 사람이 대응할 수 있게 한다'],['발생 후','사실 확인, 피해 직원 배려, 행위자 대응'],['억지','대응 규칙·연수·녹음과 녹화']],g:'함께: 상담한 사람의 사생활을 지키고 불이익을 주지 않는다',n:['공항에서는 지점과 조업사의 방침·창구·기록 양식을 맞춘다','현장의 구체적인 대응 절차는 다음 편(6-12)']},
  en:{t:'Customer harassment: the four pillars an employer puts in place',c:[['Policy','Set a no-tolerance policy and show it to staff and customers'],['Consultation','Name a contact point and prepare those who receive reports'],['After an incident','Confirm facts, care for the staff member, deal with the person'],['Prevention','Response rules, training, recording']],g:'Also: protect the privacy of those who report, and never penalise them',n:['At an airport, align policy, contact points and record forms between station and handler','The step-by-step response on the front line is in the next lesson (6-12)']}})[l];
 if(!W)return F.gnd_kh4('ja');setK(1);
 var T=TOP(W.t),s=T.s,C=ZCARDS(T.y,W.c,['#0f3558','#1769e0','#E08A2E','#2E9B5F']);s+=C.s;
 var y=C.y;s+=LB(320,y+FS(10)*0.6,W.g,10,'#fff','middle','#7A5CC7');y+=FS(10)*1.3+20;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 6-12 現場でのカスハラ対応：段階を上げて区切る */
gnd_khstep:function(l){
 var W=({ja:{t:'現場でのカスハラ対応：1人で抱えず、段階を上げて区切る',st:['事実と要望を落ち着いて聞く','できること・できないことを規程を根拠に説明する','複数で対応し、責任者に交代する','時間・回数の区切りを伝える','続くなら利用をお断りし、空港の保安・警察へ'],who:['担当者','担当者','2人以上・責任者','責任者','責任者・警備・警察'],dg:'暴力・脅迫・物を壊す → 手順を飛ばしてすぐ離れ、通報する',n:['日時・場所・言動・対応した人を、その場か直後に記録する','対応した社員の休息と心のケアまでが対応']},
  ko:{t:'현장의 카스하라 대응: 혼자 떠안지 말고 단계를 올려 끊는다',st:['사실과 요청을 차분히 듣는다','할 수 있는 것·없는 것을 규정을 근거로 설명한다','여럿이 대응하고 책임자로 교대한다','시간·횟수의 한계를 알린다','계속되면 이용을 거절하고 공항 보안·경찰로'],who:['담당자','담당자','2인 이상·책임자','책임자','책임자·경비·경찰'],dg:'폭력·협박·기물 파손 → 절차를 건너뛰고 즉시 벗어나 신고',n:['일시·장소·언동·대응한 사람을 그 자리나 직후에 기록한다','대응한 직원의 휴식과 마음 돌봄까지가 대응']},
  en:{t:'Handling harassment at the front line: do not handle it alone, escalate in steps',st:['Listen calmly to the facts and what is wanted','Explain what can and cannot be done, citing the rules','Respond as a team and hand over to a supervisor','Set limits on time and repetition','If it continues, refuse service and call airport security or police'],who:['Agent','Agent','Two or more, supervisor','Supervisor','Supervisor, security, police'],dg:'Violence, threats or damage → skip the steps, move away and call for help',n:['Record date, place, words and actions, and who responded, on the spot or straight after','Rest and support for the staff involved are part of the response']}})[l];
 if(!W)return F.gnd_khstep('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#2E9B5F','#2C8C8C','#E08A2E','#D64545','#7A1F1F'],'10s');s+=A.s;
 var y=A.y+16;s+=LB(320,y+FS(11)*0.6,W.dg,11,'#fff','middle','#D64545');y+=FS(11)*1.3+20;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 7-1 日本の空港で働くための主な在留資格（例★） */
gnd_visa:function(l){
 var W=({ja:{t:'日本の空港で働くための主な在留資格（例★）',r:[['特定技能（航空分野）','空港グランドハンドリング・整備。技能試験と日本語の条件','#1769e0'],['技術・人文知識・国際業務','語学・専門知識を活かす業務。学歴・経歴との関連を審査','#2C8C8C'],['企業内転勤','本社から日本の支店へ異動する社員（駐在員など）','#7A5CC7'],['ワーキングホリデー','協定国の若者（韓国は18〜30歳）。原則1年','#E08A2E'],['永住者・日本人の配偶者等','身分にもとづく資格。仕事の内容の制限がない','#2E9B5F']],n:['主な採用先：日本の航空会社のグループ会社、独立系のハンドリング会社、外国航空会社の日本支店、空港会社','要件は改正されることがある。出入国在留管理庁の最新情報と専門家（行政書士など）で確かめる']},
  ko:{t:'일본 공항에서 일하기 위한 주요 재류자격(예★)',r:[['특정기능(항공 분야)','공항 지상조업·정비. 기능시험과 일본어 조건','#1769e0'],['기술·인문지식·국제업무','어학·전문 지식을 살리는 업무. 학력·경력과의 관련성 심사','#2C8C8C'],['기업 내 전근','본사에서 일본 지점으로 이동하는 직원(주재원 등)','#7A5CC7'],['워킹홀리데이','협정국 청년(한국은 18~30세). 원칙 1년','#E08A2E'],['영주자·일본인 배우자 등','신분에 따른 자격. 업무 내용 제한 없음','#2E9B5F']],n:['주요 채용처: 일본 항공사 그룹사, 독립계 조업사, 외국 항공사 일본 지점, 공항 회사','요건은 개정될 수 있다. 출입국재류관리청 최신 정보와 전문가(행정서사 등)로 확인한다']},
  en:{t:'Main residence statuses for working at Japanese airports (example ★)',r:[['Specified Skilled Worker (aviation)','Ground handling and maintenance; skills test and Japanese requirement','#1769e0'],['Engineer / Specialist in Humanities / International Services','Work using languages or expertise; link to education is checked','#2C8C8C'],['Intra-company Transferee','Staff moved from head office to the Japan station','#7A5CC7'],['Working Holiday','Young people from partner countries (Korea 18–30), usually one year','#E08A2E'],['Permanent resident, spouse of a Japanese national, etc.','Status-based; no limit on type of work','#2E9B5F']],n:['Main employers: Japanese airline group companies, independent handlers, foreign airlines’ Japan stations, airport companies','Requirements change; check the Immigration Services Agency and a qualified adviser']}})[l];
 if(!W)return F.gnd_visa('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'10s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 7-2 韓国から日本の空港就職を準備する5つのステップ */
gnd_jprep:function(l){
 var W=({ja:{t:'韓国から日本の空港就職へ：準備の5つのステップ',st:['日本語力：カウンターならJLPT N2以上、できればN1。敬語での接客とアナウンス','情報収集：求人・採用先・在留資格を調べる','書類：日本式の履歴書・職務経歴書','面接：オンライン・現地。志望動機と韓国での経験','入国準備：在留資格の手続き'],who:['日本語','情報','書類','面接','入国'],n:['ランプ・貨物は業務の指示と安全の用語が分かるレベル。支店ではビジネスの読み書き','会社ごとに基準は違う。求人票の条件を必ず確かめる']},
  ko:{t:'한국에서 일본 공항 취업으로: 준비 5단계',st:['일본어: 카운터라면 JLPT N2 이상, 가능하면 N1. 경어 접객과 안내방송','정보 수집: 채용 공고·채용처·재류자격 조사','서류: 일본식 이력서·직무경력서','면접: 온라인·현지. 지원 동기와 한국에서의 경험','입국 준비: 재류자격 절차'],who:['일본어','정보','서류','면접','입국'],n:['램프·화물은 업무 지시와 안전 용어를 이해하는 수준. 지점은 비즈니스 읽기·쓰기','회사마다 기준이 다르다. 채용 공고의 조건을 반드시 확인한다']},
  en:{t:'From abroad to a job at a Japanese airport: five steps',st:['Japanese: N2 or above for counter work, ideally N1; polite service and announcements','Research: openings, employers and residence status','Documents: Japanese-style CV and career history','Interview: online or in Japan; motivation and your experience at home','Arrival: residence status procedures'],who:['Japanese','Research','Documents','Interview','Arrival'],n:['Ramp and cargo need enough to follow work instructions and safety terms; station roles need business reading and writing','Standards differ by company; always check the job listing']}})[l];
 if(!W)return F.gnd_jprep('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#1769e0','#2C8C8C','#7A5CC7','#E08A2E','#2E9B5F'],'10s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},

/* 7-3 キャリアに役立つ教育・資格と活かせる場面 */
gnd_cert:function(l){
 var W=({ja:{t:'キャリアに役立つ教育・資格と、活かせる場面',r:[['危険物','チェックイン・貨物・ロードコントロール','#D64545'],['航空保安','支店の保安管理・教育担当（保安インストラクター）','#0f3558'],['ロードコントロール','搭載管理の専門職','#7A5CC7'],['安全管理システム（SMS）','すべての職種','#2E9B5F'],['交通弱者へのサービス','旅客ハンドリング','#1769e0'],['車両・機材','ランプ業務','#E08A2E'],['品質監査','品質管理・支店運営','#2C8C8C']],n:['危険物・保安は職種ごとの区分があり、定期的な更新が必要','語学も立派な武器。日本語・韓国語・英語の3つは強みになる']},
  ko:{t:'경력에 도움이 되는 교육·자격과 활용 장면',r:[['위험물','체크인·화물·로드컨트롤','#D64545'],['항공 보안','지점 보안 관리·교육 담당(보안 강사)','#0f3558'],['로드컨트롤','탑재 관리 전문직','#7A5CC7'],['안전관리시스템(SMS)','모든 직종','#2E9B5F'],['교통약자 서비스','여객 조업','#1769e0'],['차량·장비','램프 업무','#E08A2E'],['품질 감사','품질 관리·지점 운영','#2C8C8C']],n:['위험물·보안은 직종별 구분이 있고 정기 갱신이 필요하다','어학도 훌륭한 무기. 일본어·한국어·영어 세 가지는 강점이 된다']},
  en:{t:'Training and qualifications that help a career, and where they count',r:[['Dangerous goods','Check-in, cargo, load control','#D64545'],['Aviation security','Station security management and training (security instructor)','#0f3558'],['Load control','Load control specialist','#7A5CC7'],['Safety management (SMS)','Every role','#2E9B5F'],['Service for passengers with reduced mobility','Passenger handling','#1769e0'],['Vehicles and equipment','Ramp work','#E08A2E'],['Quality audit','Quality management, station operations','#2C8C8C']],n:['DG and security training is graded by role and must be renewed regularly','Languages are a real asset: Japanese, Korean and English together set you apart']}})[l];
 if(!W)return F.gnd_cert('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 7-4 キャリアの階段：ハンドリング会社から支店長まで（例） */
gnd_career:function(l){
 var W=({ja:{t:'キャリアの階段：ハンドリング会社から支店長まで（例）',s:[['エージェント','規定の正確な理解・接客・報告の習慣'],['リーダー・SV','判断力・後輩の指導・イレギュラー対応'],['インストラクター','教える力・評価・手順書の作成'],['運送マネージャー','ハンドリング会社との調整・品質・本社との連携'],['支店長','行政対応・営業・財務と人事・危機管理']],n:['次の段階の仕事を、今の段階のうちに一部引き受けて練習する','段階が上がるほど「現場の手順」から「人・数字・外部との交渉」に重心が移る']},
  ko:{t:'경력의 계단: 조업사에서 지점장까지(예)',s:[['에이전트','규정의 정확한 이해·접객·보고 습관'],['리더·SV','판단력·후배 지도·비정상 대응'],['강사','가르치는 힘·평가·절차서 작성'],['운송 매니저','조업사와 조정·품질·본사와 연계'],['지점장','행정 대응·영업·재무와 인사·위기관리']],n:['다음 단계의 일을 지금 단계에서 일부 맡아 연습한다','단계가 오를수록 「현장 절차」에서 「사람·숫자·외부 교섭」으로 무게가 옮겨 간다']},
  en:{t:'The career ladder: from handling agent to station manager (example)',s:[['Agent','Accurate rules, customer service, reporting habits'],['Leader / supervisor','Judgement, coaching juniors, disruptions'],['Instructor','Teaching, assessment, writing procedures'],['Duty manager','Coordinating the handler, quality, head office'],['Station manager','Authorities, sales, finance and HR, crisis management']],n:['Practise part of the next level’s work while still at your current level','The higher you go, the more the weight shifts from procedures to people, numbers and negotiation']}})[l];
 if(!W)return F.gnd_career('ja');setK(1);
 var T=TOP(W.t),s=T.s,n=W.s.length,cw=114,gap=7,base=T.y+330,cols=['#5B6B7D','#2C8C8C','#1769e0','#7A5CC7','#0f3558'];
 W.s.forEach(function(st,i){var x=20+i*(cw+gap),h=110+i*50,y=base-h;
  s+=R(x,y,cw,h,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+GLOW(x,y,cw,h,i,n,'10s',10)+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="8" rx="4" fill="'+cols[i]+'"/>';
  s+=WT(x+cw/2,y+16+FS(10),st[0],10,cols[i],900,cw-12);var tl=LI(st[0],10,cw-12).length;s+=WT(x+cw/2,y+16+FS(10)+tl*FS(10)*1.3+6+FS(9),st[1],9,D,800,cw-14)});
 var pts=W.s.map(function(st,i){return (20+i*(cw+gap)+cw/2)+' '+(base-110-i*50-14)}).join(' L');
 s+='<path d="M'+pts+'" fill="none" stroke="#C8D3DE" stroke-width="2" stroke-dasharray="4 5"/><circle r="8" fill="#FFD23F" stroke="#0f3558" stroke-width="2"><animateMotion dur="10s" repeatCount="indefinite" path="M'+pts+'"/></circle>';
 s+='<line x1="20" y1="'+base+'" x2="620" y2="'+base+'" stroke="#9FB0C2" stroke-width="3"/>';
 var L=LIST(W.n,base+16,600,11);return SVG(L.y+8,s+L.s)},
/* 8-1 安全と保安の違い、SMSの4つの柱 */
gnd_ss:function(l){
 var W=({ja:{t:'安全（Safety）と保安（Security）：防ぐものが違う',c:[['安全（Safety）','意図しない事故・故障・ミスを防ぐ。例：車両の接触、搭載の間違い。ICAO 第19附属書・SMS'],['保安（Security）','意図的な不法な妨害を防ぐ。例：不審な手荷物、身元を偽った搭乗。ICAO 第17附属書・保安計画']],ov:'重なる例：乗らないお客様の手荷物を降ろす（保安）→ 搭載の重さが変わる（安全）',n:['SMSの柱1 方針と目標：支店長が安全の責任者として方針と年間の目標を立てる','柱2 リスクの管理：新しい空港・機材・手順の前にハザードを洗い出す','柱3 安全の保証：接触・搭載の間違いなどの指標を毎月確かめる','柱4 安全の推進：安全会議・事例の共有・定期教育']},
  ko:{t:'안전(Safety)과 보안(Security): 막는 대상이 다르다',c:[['안전(Safety)','의도하지 않은 사고·고장·실수를 막는다. 예: 차량 접촉, 탑재 착오. ICAO 부속서 19·SMS'],['보안(Security)','의도적인 불법 방해를 막는다. 예: 수상한 수하물, 신원을 속인 탑승. ICAO 부속서 17·보안 계획']],ov:'겹치는 예: 타지 않는 승객의 수하물을 내린다(보안) → 탑재 중량이 바뀐다(안전)',n:['SMS 축 1 방침과 목표: 지점장이 안전 책임자로 방침과 연간 목표를 세운다','축 2 위험 관리: 새 공항·기재·절차 전에 위해 요인을 찾아낸다','축 3 안전 보증: 접촉·탑재 착오 등 지표를 매월 확인한다','축 4 안전 증진: 안전 회의·사례 공유·정기 교육']},
  en:{t:'Safety and security: they protect against different things',c:[['Safety','Prevents unintended accidents, failures and errors. e.g. vehicle contact, loading errors. ICAO Annex 19, SMS'],['Security','Prevents deliberate unlawful interference. e.g. suspicious bags, boarding under a false identity. ICAO Annex 17, security programme']],ov:'Where they overlap: offloading a no-show’s bags (security) changes the load (safety)',n:['SMS pillar 1, policy and objectives: the station manager sets the safety policy and annual targets','Pillar 2, risk management: identify hazards before a new airport, aircraft or procedure','Pillar 3, assurance: check indicators such as contacts and loading errors every month','Pillar 4, promotion: safety meetings, shared cases, recurrent training']}})[l];
 if(!W)return F.gnd_ss('ja');setK(1);
 var T=TOP(W.t),s=T.s,C=ZCARDS(T.y,W.c,['#2E9B5F','#0f3558']);s+=C.s;var y=C.y;
 s+=LB(320,y+FS(10)*0.6,W.ov,10,'#fff','middle','#7A5CC7');y+=FS(10)*1.3+20;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 8-2 保安の分担（例★） */
gnd_secrole:function(l){
 var W=({ja:{t:'保安の分担：誰が何をするか（例★）',r:[['航空会社（委託先を含む）','本人確認・保安の質問・手荷物と旅客の照合・ゲートの最終確認','#1769e0'],['空港・保安検査会社','お客様と手荷物の保安検査、制限区域の出入りの管理','#0f3558'],['警察・入国管理・税関','事件の対応、出入国の審査、税関の検査','#7A5CC7'],['ハンドリング会社','委託された業務の中での保安の手順の実施','#2C8C8C']],n:['乗らないお客様の手荷物は積んだまま出発させない（手荷物と旅客の照合）','分担は国・空港・契約で違う。支店の保安計画で確かめる']},
  ko:{t:'보안 분담: 누가 무엇을 하나(예★)',r:[['항공사(위탁처 포함)','신원 확인·보안 질문·수하물과 승객 대조·게이트 최종 확인','#1769e0'],['공항·보안검색 회사','승객과 수하물 보안검색, 보호구역 출입 관리','#0f3558'],['경찰·출입국·세관','사건 대응, 출입국 심사, 세관 검사','#7A5CC7'],['조업사','위탁받은 업무 안에서 보안 절차 실시','#2C8C8C']],n:['타지 않는 승객의 수하물은 실은 채로 출발시키지 않는다(수하물과 승객 대조)','분담은 나라·공항·계약마다 다르다. 지점 보안 계획에서 확인한다']},
  en:{t:'Who does what in security (example ★)',r:[['Airline (including contractors)','ID checks, security questions, bag–passenger reconciliation, final gate check','#1769e0'],['Airport and screening company','Screening of passengers and bags, access to restricted areas','#0f3558'],['Police, immigration, customs','Incidents, border checks, customs inspection','#7A5CC7'],['Handling company','Security steps within the contracted work','#2C8C8C']],n:['Never let a bag fly without its passenger (bag–passenger reconciliation)','The split differs by country, airport and contract; check the station security programme']}})[l];
 if(!W)return F.gnd_secrole('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'9s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 8-3 保安教育の種類と記録（例★） */
gnd_sectr:function(l){
 var W=({ja:{t:'保安教育の4つの種類（例★）',r:[['初期教育','仕事を始める前。新人・他の部署から来た人','#1769e0'],['定期教育','決められた周期（例：年1回）。資格を保つ全員','#2E9B5F'],['改正時の教育','基準・手順が変わったとき。その業務の担当者全員','#E08A2E'],['臨時の教育','事案・指摘のあと、脅威の水準が変わったとき','#D64545']],n:['ハンドリング会社・委託先のスタッフも、保安の手順を行う人は対象','記録は最低3年以上さかのぼれるように（例★）。年度のフォルダ・個人の台帳・期限の一覧の3つを用意する']},
  ko:{t:'보안 교육의 네 가지 종류(예★)',r:[['초기 교육','업무 시작 전. 신입·다른 부서에서 온 사람','#1769e0'],['정기 교육','정해진 주기(예: 연 1회). 자격을 유지하는 전원','#2E9B5F'],['개정 시 교육','기준·절차가 바뀌었을 때. 그 업무 담당자 전원','#E08A2E'],['임시 교육','사안·지적 후, 위협 수준이 바뀌었을 때','#D64545']],n:['조업사·위탁처 직원도 보안 절차를 수행하는 사람은 대상','기록은 최소 3년 이상 거슬러 확인할 수 있게(예★). 연도별 폴더·개인 대장·기한 목록 세 가지를 갖춘다']},
  en:{t:'Four kinds of security training (example ★)',r:[['Initial','Before starting work; new staff and transfers','#1769e0'],['Recurrent','At a set interval (e.g. yearly); everyone keeping the qualification','#2E9B5F'],['On change','When standards or procedures change; everyone doing that work','#E08A2E'],['Ad hoc','After an incident or finding, or when the threat level changes','#D64545']],n:['Handler and contractor staff who carry out security steps must be trained too','Keep records for at least three years (example ★): yearly folders, individual logs and an expiry list']}})[l];
 if(!W)return F.gnd_sectr('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'9s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 8-4 監査の流れ（例） */
gnd_audflow:function(l){
 var W=({ja:{t:'監査の流れ：通知から是正の報告まで（例）',st:['日程と対象の通知（予告なしの場合もある）','計画・記録の提出を求められることがある','書類の確認・現場の確認・スタッフへの質問','良い点と指摘を聞く','原因・対策・期限を決めて回答する'],who:['通知','事前の資料','当日','講評','是正の報告'],n:['1〜2か月前から教育の記録・点検表・指示の記録をそろえる','当日の質問には、知っていることを手順書に沿って答え、分からなければ確かめて答える']},
  ko:{t:'감사의 흐름: 통지부터 시정 보고까지(예)',st:['일정과 대상 통지(예고 없는 경우도 있음)','계획·기록 제출을 요구받기도 한다','서류 확인·현장 확인·직원 질문','좋은 점과 지적을 듣는다','원인·대책·기한을 정해 회신한다'],who:['통지','사전 자료','당일','강평','시정 보고'],n:['1~2개월 전부터 교육 기록·점검표·지시 기록을 갖춘다','당일 질문에는 아는 것을 절차서에 따라 답하고, 모르면 확인해서 답한다']},
  en:{t:'The audit: from notice to corrective-action report (example)',st:['Notice of dates and scope (sometimes unannounced)','You may be asked to submit plans and records','Document review, site checks, questions to staff','Hear the good points and the findings','Reply with causes, actions and deadlines'],who:['Notice','Advance documents','On the day','Debrief','Corrective action'],n:['Start gathering training records, checklists and instruction records one to two months ahead','On the day, answer from the procedures; if unsure, check and then answer']}})[l];
 if(!W)return F.gnd_audflow('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#5B6B7D','#1769e0','#E08A2E','#2C8C8C','#2E9B5F'],'10s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},

/* 8-5 事故・インシデントの報告の流れ */
gnd_rep:function(l){
 var W=({ja:{t:'事故・インシデントの報告：まず安全、次に早い第一報',st:['けが人の救護、危険の除去','責任者・運航管理・本社へ（分かっていることだけで）','時刻・場所・人・状況・対応を記録','決められた期限・様式で当局へ','原因の分析と対策の共有'],who:['すぐに','早く','その場で','期限内','後日'],k:'第一報は完ぺきを待たない。分からないことは「確認中」と書く',n:['第一報に入れる5つ：いつ・どこで／何が／誰が関わったか／何をしたか／報告者','個人情報の扱いに注意し、追加の報告で情報を足していく']},
  ko:{t:'사고·준사고 보고: 먼저 안전, 다음은 빠른 1차 보고',st:['부상자 구호, 위험 제거','책임자·운항관리·본사에(아는 것만으로)','시각·장소·사람·상황·대응을 기록','정해진 기한·양식으로 당국에','원인 분석과 대책 공유'],who:['즉시','빠르게','그 자리에서','기한 내','추후'],k:'1차 보고는 완벽을 기다리지 않는다. 모르는 것은 「확인 중」이라고 쓴다',n:['1차 보고에 넣을 다섯 가지: 언제·어디서 / 무엇이 / 누가 관련됐나 / 무엇을 했나 / 보고자','개인정보 취급에 주의하고, 추가 보고로 정보를 보탠다']},
  en:{t:'Reporting accidents and incidents: safety first, then a fast initial report',st:['Care for the injured, remove the hazard','To the supervisor, operations control and head office, with what you know','Record times, place, people, situation and actions','To the authority by the set deadline and form','Analyse causes and share the fixes'],who:['At once','Quickly','On the spot','By the deadline','Later'],k:'Do not wait for a perfect initial report; mark unknowns as “being confirmed”',n:['Five items in an initial report: when and where / what happened / who was involved / what was done / who is reporting','Take care with personal data, and add detail in follow-up reports']}})[l];
 if(!W)return F.gnd_rep('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#D64545','#E08A2E','#1769e0','#7A5CC7','#2E9B5F'],'10s');s+=A.s;
 var y=A.y+16;s+=LB(320,y+FS(11)*0.6,W.k,11,'#fff','middle','#E08A2E');y+=FS(11)*1.3+20;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 9-1 客室乗務員の主な仕事：場面ごと */
gnd_crew:function(l){
 var W=({ja:{t:'客室乗務員の仕事：保安要員としての役割が中心',r:[['出発前','ブリーフィング、非常用の装備と客室の点検','#5B6B7D'],['搭乗','お出迎え、手荷物の収納、非常口の座席の確認','#1769e0'],['出発','ドアの操作、安全の案内、離陸前の安全確認','#2C8C8C'],['飛行中','サービス、見回り、急病・トラブルへの対応','#2E9B5F'],['緊急時','消火、減圧への対応、緊急脱出の誘導','#D64545'],['到着','ドアの操作、特別なお客様の地上への引き継ぎ','#7A5CC7']],n:['人数は座席50席ごとに1名が基本（乗っている人数ではなく座席の数）★','乗務員が足りないと座席を減らすか運航できない。地上では座席のブロック・振り替えが必要']},
  ko:{t:'객실승무원의 업무: 안전 요원으로서의 역할이 중심',r:[['출발 전','브리핑, 비상 장비와 객실 점검','#5B6B7D'],['탑승','영접, 수하물 수납, 비상구 좌석 확인','#1769e0'],['출발','도어 조작, 안전 안내, 이륙 전 안전 확인','#2C8C8C'],['비행 중','서비스, 순회, 급환·문제 대응','#2E9B5F'],['비상시','소화, 감압 대응, 비상 탈출 유도','#D64545'],['도착','도어 조작, 특별 승객의 지상 인계','#7A5CC7']],n:['인원은 좌석 50석마다 1명이 기본(탑승 인원이 아니라 좌석 수)★','승무원이 부족하면 좌석을 줄이거나 운항할 수 없다. 지상에서는 좌석 블록·대체 수송이 필요']},
  en:{t:'Cabin crew work: centred on their role as safety and security staff',r:[['Before departure','Briefing; check emergency equipment and the cabin','#5B6B7D'],['Boarding','Welcome, stow bags, check exit-row seating','#1769e0'],['Departure','Doors, safety demonstration, pre-take-off checks','#2C8C8C'],['In flight','Service, cabin checks, illness and incidents','#2E9B5F'],['Emergency','Firefighting, decompression, evacuation','#D64545'],['Arrival','Doors; hand over special passengers to the ground','#7A5CC7']],n:['Crew numbers are based on one per 50 seats installed, not passengers on board ★','If short of crew, seats must be blocked or the flight cannot operate; the ground then blocks seats or rebooks']}})[l];
 if(!W)return F.gnd_crew('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 9-2 特別なお客様の引き継ぎ（例） */
gnd_hand:function(l){
 var W=({ja:{t:'地上から客室へ：特別なお客様の引き継ぎ（例）',r:[['一人旅の子ども（UM）','書類と保護者の誓約書の写しを客室責任者へ。到着地で保護者を確認して引き渡す','#1769e0'],['妊娠中のお客様','週数と、必要なら診断書の確認。優先搭乗','#E08A2E'],['目の不自由なお客様と補助犬','補助犬の書類・検疫の確認、到着地の介助の手配','#2C8C8C'],['車いすのお客様','区分（WCHR・WCHS・WCHC）、機内用の車いす、到着地の手配','#7A5CC7'],['担架・酸素・医療の付き添い','MEDIFの承認、座席、到着地の救急の手配','#D64545'],['護送・強制退去（DEPU・DEPA）','当局・護送者の情報、座席、書類の受け渡し','#0f3558']],n:['非常口の座席の条件（1-5）は搭乗のときにも客室と一緒に確かめる','特別なお客様の一覧（PIL）と機内に積む書類を、ドアクローズ前に客室責任者へ渡す']},
  ko:{t:'지상에서 객실로: 특별 승객 인계(예)',r:[['혼자 여행하는 어린이(UM)','서류와 보호자 서약서 사본을 객실 사무장에게. 도착지에서 보호자를 확인해 인도','#1769e0'],['임신 중인 승객','주수와 필요하면 진단서 확인. 우선 탑승','#E08A2E'],['시각장애 승객과 보조견','보조견 서류·검역 확인, 도착지 보조 준비','#2C8C8C'],['휠체어 승객','구분(WCHR·WCHS·WCHC), 기내용 휠체어, 도착지 준비','#7A5CC7'],['들것·산소·의료 동반','MEDIF 승인, 좌석, 도착지 구급 준비','#D64545'],['호송·강제퇴거(DEPU·DEPA)','당국·호송자 정보, 좌석, 서류 인계','#0f3558']],n:['비상구 좌석 조건(1-5)은 탑승 때도 객실과 함께 확인한다','특별 승객 목록(PIL)과 기내 탑재 서류를 도어 클로즈 전에 객실 사무장에게 건넨다']},
  en:{t:'From ground to cabin: handing over special passengers (example)',r:[['Unaccompanied minors (UM)','Documents and a copy of the guardian’s form to the senior crew; release at arrival after checking the guardian','#1769e0'],['Pregnant passengers','Weeks and, if needed, a medical certificate; priority boarding','#E08A2E'],['Visually impaired passengers and guide dogs','Dog documents and quarantine; assistance at arrival','#2C8C8C'],['Wheelchair passengers','Code (WCHR, WCHS, WCHC), onboard wheelchair, arrival arrangements','#7A5CC7'],['Stretcher, oxygen, medical escort','MEDIF approval, seating, ambulance at arrival','#D64545'],['Escorted and deportees (DEPU, DEPA)','Authority and escort details, seats, documents','#0f3558']],n:['Check exit-row conditions (1-5) with the cabin again at boarding','Hand the special passenger list (PIL) and onboard documents to the senior crew before door close']}})[l];
 if(!W)return F.gnd_hand('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 9-3 乗務員の勤務時間：遅れが欠航になるまで、飲酒の基準（★） */
gnd_ftl:function(l){
 var W=({ja:{t:'乗務員の勤務の上限：遅れが欠航になるまで',st:['天候・機材・前の便で大きく遅れる','乗務員の残り時間を運航管理と確かめる','上限を超えそうなら交代の乗務員を探す','交代できなければ、休息のあと出発するか欠航','案内・宿泊・振り替え（Part 5）'],who:['遅れ','残り時間','交代','判断','地上の対応'],k:'乗務員の時間の上限は安全の決まり。延ばすことはできない',n:['遅れが長くなりそうなら、早めに「乗務員の残り時間」を運航管理と共有する','飲酒の基準（★）：日本は血中0.2g/L・呼気0.09mg/L以上で乗務できず、乗務前8時間以内は飲酒禁止。韓国は血中0.02%以上で業務できない']},
  ko:{t:'승무원 근무 상한: 지연이 결항이 되기까지',st:['기상·기재·앞 편 때문에 크게 지연','승무원 잔여 시간을 운항관리와 확인','상한을 넘을 것 같으면 교대 승무원을 찾는다','교대가 안 되면 휴식 후 출발하거나 결항','안내·숙박·대체 수송(Part 5)'],who:['지연','잔여 시간','교대','판단','지상 대응'],k:'승무원 시간 상한은 안전 규정. 늘릴 수 없다',n:['지연이 길어질 것 같으면 일찍 「승무원 잔여 시간」을 운항관리와 공유한다','음주 기준(★): 일본은 혈중 0.2g/L·호기 0.09mg/L 이상이면 승무 불가, 승무 전 8시간 이내 음주 금지. 한국은 혈중 0.02% 이상이면 업무 불가']},
  en:{t:'Crew duty limits: how a delay becomes a cancellation',st:['A long delay from weather, the aircraft or the inbound','Check the crew’s remaining duty time with operations control','If the limit may be exceeded, look for replacement crew','If no replacement, depart after rest or cancel','Inform, accommodate and rebook passengers (Part 5)'],who:['Delay','Time left','Replace','Decide','Ground response'],k:'Crew duty limits are safety rules; they cannot be extended',n:['If a delay may run long, share the crew’s remaining time with operations control early','Alcohol limits (★): in Japan no duty at 0.2 g/L blood or 0.09 mg/L breath and above, no drinking within 8 hours of duty; in Korea 0.02% blood or above means unfit for duty']}})[l];
 if(!W)return F.gnd_ftl('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#E08A2E','#1769e0','#2C8C8C','#D64545','#2E9B5F'],'10s');s+=A.s;
 var y=A.y+16;s+=LB(320,y+FS(11)*0.6,W.k,11,'#fff','middle','#D64545');y+=FS(11)*1.3+20;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 9-4 機内の迷惑行為：到着時の引き継ぎ */
gnd_unruly:function(l){
 var W=({ja:{t:'機内の迷惑行為：到着時の引き継ぎの流れ',st:['機長・客室から到着前に連絡が入る','空港の警察・保安・責任者を手配する','引き渡し。ほかのお客様の降機の順番も調整','乗務員・目撃者の証言と書類を集める','本社・当局へ報告（8-5）'],who:['機内から連絡','地上の手配','到着・引き渡し','証言と記録','報告'],n:['記録すること：いつ・誰が・誰に引き渡したか、乗務員の報告書の受け取り','搭乗前に防ぐ：酔ったお客様・暴言は、責任者・機長と相談して運送約款にもとづき搭乗をお断りする']},
  ko:{t:'기내 난동: 도착 시 인계 흐름',st:['기장·객실에서 도착 전에 연락이 온다','공항 경찰·보안·책임자를 수배한다','인도. 다른 승객의 하기 순서도 조정','승무원·목격자 진술과 서류를 모은다','본사·당국에 보고(8-5)'],who:['기내 연락','지상 수배','도착·인도','진술과 기록','보고'],n:['기록할 것: 언제·누가·누구에게 인도했는지, 승무원 보고서 수령','탑승 전에 막는다: 만취·폭언 승객은 책임자·기장과 상의해 운송약관에 따라 탑승을 거절한다']},
  en:{t:'Disruptive passengers: the handover on arrival',st:['The captain or cabin calls before arrival','Arrange airport police, security and a supervisor','Hand over; adjust the order in which others disembark','Collect statements from crew and witnesses, and documents','Report to head office and the authority (8-5)'],who:['Call from aircraft','Ground arrangements','Arrival and handover','Statements and records','Report'],n:['Record when, by whom and to whom the passenger was handed over, and receipt of the crew report','Prevent it before boarding: with the supervisor and captain, refuse intoxicated or abusive passengers under the conditions of carriage']}})[l];
 if(!W)return F.gnd_unruly('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#7A5CC7','#0f3558','#D64545','#E08A2E','#2E9B5F'],'10s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},
/* ── 航空営業 Part 8（イレギュラーと営業）の図 2026.10 ── */
/* 8-1 販売の約束と、空港で試される場面 */
sls_promise:function(l){
 var W=({ja:{t:'売った約束は、空港で試される（例★）',r:[['出発時刻','チェックイン・搭乗口の締め切り','#1769e0'],['座席の指定','機材の変更で並びが変わることがある','#2C8C8C'],['手荷物の許容量','カウンターで重さ・個数を確認、超えると料金','#E08A2E'],['乗り継ぎ','最小乗り継ぎ時間（MCT）、別切りは保護されないことが多い','#7A5CC7'],['特別なサービス','車いす・一人旅の子ども・ペット・医療は事前の申し込み','#D64545'],['旅行の書類','パスポート・ビザ・電子渡航認証がないと乗れない','#0f3558']],n:['売るときに締め切り・許容量・申し込みの期限まで伝えると、当日のトラブルが減る','大きな団体・VIP・キャンペーンは前日までに空港の支店へ伝える']},
  ko:{t:'판매한 약속은 공항에서 시험받는다(예★)',r:[['출발 시각','체크인·탑승구 마감','#1769e0'],['좌석 지정','기재 변경으로 배열이 바뀔 수 있다','#2C8C8C'],['수하물 허용량','카운터에서 무게·개수 확인, 넘으면 요금','#E08A2E'],['연결','최소 연결 시간(MCT), 따로 산 항공권은 보호되지 않는 경우가 많다','#7A5CC7'],['특별 서비스','휠체어·비동반 소아·반려동물·의료는 사전 신청','#D64545'],['여행 서류','여권·비자·전자여행허가가 없으면 탑승 불가','#0f3558']],n:['판매할 때 마감·허용량·신청 기한까지 알리면 당일 문제가 줄어든다','큰 단체·VIP·캠페인은 전날까지 공항 지점에 알린다']},
  en:{t:'What you sell is tested at the airport (example ★)',r:[['Departure time','Check-in and gate deadlines','#1769e0'],['Seat assignment','An aircraft change can change the seat map','#2C8C8C'],['Baggage allowance','Weight and pieces checked at the counter; excess charged','#E08A2E'],['Connections','Minimum connecting time (MCT); separate tickets often not protected','#7A5CC7'],['Special services','Wheelchairs, unaccompanied minors, pets, medical: request in advance','#D64545'],['Travel documents','No passport, visa or travel authorisation means no boarding','#0f3558']],n:['Telling customers the deadlines, allowances and request deadlines when selling prevents trouble on the day','Tell the airport station about large groups, VIPs and campaigns by the day before']}})[l];
 if(!W)return F.sls_promise('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 8-2 イレギュラーの情報の流れ */
sls_flow:function(l){
 var W=({ja:{t:'イレギュラーの情報の流れ：同じ内容を、同じ時刻に（例★）',st:['遅延・欠航・代わりの便を判断する','案内の文と、振り替え・払い戻しの条件（ウェーバー）を決める','空港の支店・営業・コールセンターが同じ内容を受け取る','空港はその場のお客様へ、営業は旅行会社・法人へ、自社は直販のお客様へ','変われば同じ順で更新し、誰に・いつ・何を伝えたかを記録'],who:['運航管理・本社','本社の運送・営業','社内で共有','外へ案内','更新と記録'],n:['最初の1時間：窓口を1つに／事実の確認／空港と同じ文で／影響の大きいお客様から／次の案内の時刻／記録','韓国発着便は「知った時刻」と「伝えた時刻」の差が問われる（旅客5-8）']},
  ko:{t:'비정상 운항 정보의 흐름: 같은 내용을 같은 시각에(예★)',st:['지연·결항·대체 편을 판단한다','안내 문안과 대체 수송·환불 조건(웨이버)을 정한다','공항 지점·영업·콜센터가 같은 내용을 받는다','공항은 현장 고객에게, 영업은 여행사·법인에게, 자사는 직판 고객에게','바뀌면 같은 순서로 갱신하고 누구에게·언제·무엇을 알렸는지 기록'],who:['운항통제·본사','본사 운송·영업','사내 공유','외부 안내','갱신과 기록'],n:['첫 1시간: 창구를 하나로 / 사실 확인 / 공항과 같은 문안 / 영향이 큰 고객부터 / 다음 안내 시각 / 기록','한국 출도착편은 「안 시각」과 「알린 시각」의 차이가 문제 된다(여객 5-8)']},
  en:{t:'How disruption information flows: same content, same time (example ★)',st:['Decide on the delay, cancellation or replacement flight','Set the wording and the rebooking and refund conditions (waiver)','Airport station, sales and call centre receive the same content','Airport informs passengers there; sales informs agencies and corporates; the airline informs direct customers','Update in the same order when things change; record who was told what and when'],who:['OCC and head office','Head office teams','Shared internally','Informing outside','Updates and records'],n:['First hour: one source / check facts / same words as the airport / most affected first / next update time / record','For flights to and from Korea, the gap between the time known and the time told is scrutinised (Passenger 5-8)']}})[l];
 if(!W)return F.sls_flow('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#0f3558','#7A5CC7','#1769e0','#E08A2E','#2E9B5F'],'10s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)},

/* 8-3 旅行会社に届けるもの */
sls_agent:function(l){
 var W=({ja:{t:'イレギュラーのとき旅行会社に届けるもの（例★）',r:[['予約の変更（GDS）','スケジュール変更の通知 → 旅行会社のキューで処理','#1769e0'],['条件（ウェーバー）','対象・期間・変えられる便・払い戻し・航空券への記載','#D64545'],['一斉の案内','旅行会社への一斉メール・専用サイト。版と時刻を明記','#2C8C8C'],['問い合わせの窓口','旅行会社専用の電話・メール、受付時間の延長','#7A5CC7'],['団体・ブロック','担当者が個別に連絡し、代わりの座席を先に確保','#E08A2E'],['払い戻し','BSPの手続き。条件どおり手数料なし','#2E9B5F']],n:['条件があいまいだと旅行会社が動けず、条件と違う処理はADMの原因になる','お客様の連絡先がない予約は、旅行会社からお客様へ知らせてもらう']},
  ko:{t:'비정상 운항 때 여행사에 전할 것(예★)',r:[['예약 변경(GDS)','스케줄 변경 통지 → 여행사 큐에서 처리','#1769e0'],['조건(웨이버)','대상·기간·바꿀 수 있는 편·환불·항공권 기재','#D64545'],['일괄 안내','여행사 일괄 메일·전용 사이트. 판과 시각 명기','#2C8C8C'],['문의 창구','여행사 전용 전화·메일, 접수 시간 연장','#7A5CC7'],['단체·블록','담당자가 개별 연락하고 대체 좌석을 먼저 확보','#E08A2E'],['환불','BSP 절차. 조건대로 수수료 없음','#2E9B5F']],n:['조건이 모호하면 여행사가 움직일 수 없고, 조건과 다른 처리는 ADM의 원인이 된다','고객 연락처가 없는 예약은 여행사가 고객에게 알리도록 한다']},
  en:{t:'What to send travel agencies in a disruption (example ★)',r:[['Booking changes (GDS)','Schedule change notification → processed from the agency queue','#1769e0'],['Conditions (waiver)','Scope, dates, permitted flights, refunds, ticket entries','#D64545'],['Mass notification','One email to all agencies and the agency site, with version and time','#2C8C8C'],['Point of contact','Dedicated agency phone and email, extended hours','#7A5CC7'],['Groups and blocks','Account manager calls each agency and secures seats first','#E08A2E'],['Refunds','Through BSP; no fee where the conditions say so','#2E9B5F']],n:['Vague conditions stop agencies acting, and processing outside them leads to ADMs','Where the booking has no customer contact, ask the agency to inform the customer']}})[l];
 if(!W)return F.sls_agent('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 8-4 インダイレクトと直販：誰が知らせ、誰が処理するか */
sls_inddir:function(l){
 var W=({ja:{t:'インダイレクトと直販：誰が知らせ、誰が処理するか',a:['インダイレクト（旅行会社）','直販（自社）'],n1:['航空会社','旅行会社','お客様'],n2:['航空会社','お客様'],e1:['GDS・ウェーバー','旅行会社が連絡・処理'],e2:'メール・SMS・アプリで直接。変更・払い戻しも自社で',n:['同じ便でも買った経路で知らせが違う。条件と内容をそろえ、不公平を出さない','直販は連絡先の誤り・未登録、旅行会社経由は連絡先のない予約に注意']},
  ko:{t:'간접판매와 직판: 누가 알리고 누가 처리하나',a:['간접판매(여행사)','직판(자사)'],n1:['항공사','여행사','고객'],n2:['항공사','고객'],e1:['GDS·웨이버','여행사가 연락·처리'],e2:'메일·문자·앱으로 직접. 변경·환불도 자사가',n:['같은 편이라도 산 경로에 따라 통지가 다르다. 조건과 내용을 맞춰 불공평이 없게','직판은 연락처 오류·미등록, 여행사 경유는 연락처가 없는 예약에 주의']},
  en:{t:'Indirect and direct: who informs, and who handles it',a:['Indirect (travel agency)','Direct (airline)'],n1:['Airline','Agency','Customer'],n2:['Airline','Customer'],e1:['GDS and waiver','Agency informs and processes'],e2:'Direct by email, SMS or app; changes and refunds handled by the airline',n:['Passengers on one flight get different notices depending on where they bought: align terms so no one is treated unfairly','Direct: watch for wrong or missing contacts. Indirect: watch for bookings without contacts']}})[l];
 if(!W)return F.sls_inddir('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,bw=140,bh=44;
 function lane(y,lab,nodes,edges,col){var o=R(20,y,600,128,'#F4F7FB',12)+tx(36,y+24,lab,11,col,900,'start');var xs=nodes.length===3?[40,250,460]:[40,460];
  nodes.forEach(function(n,i){o+=R(xs[i],y+44,bw,bh,i===nodes.length-1?'#2E9B5F':col,10)+WR(xs[i]+bw/2,y+44+bh/2+FS(11)*0.35,n,11,'#fff',900,bw-12)});
  for(var i=0;i<xs.length-1;i++){var x1=xs[i]+bw+6,x2=xs[i+1]-6,e=typeof edges==='string'?edges:edges[i];o+=ARW(x1,y+66,x2,y+66,'#9FB0C2',3)+WR((x1+x2)/2,y+108,e,9,'#5B6B7D',800,x2-x1+20)}
  o+='<circle r="8" fill="#FFD23F" stroke="#0f3558" stroke-width="2"><animateMotion dur="6s" repeatCount="indefinite" path="M'+(xs[0]+bw/2)+' '+(y+38)+' L'+(xs[xs.length-1]+bw/2)+' '+(y+38)+'"/></circle>';return o}
 s+=lane(y,W.a[0],W.n1,W.e1,'#1769e0');y+=140;s+=lane(y,W.a[1],W.n2,W.e2,'#E08A2E');y+=144;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 8-4 直販のお客様への知らせ方 */
sls_direct:function(l){
 var W=({ja:{t:'直販のお客様への知らせ方（例）',st:['対象の便のお客様全員に、予約の言語で','お知らせの欄とSNSに同じ内容。更新の時刻も','条件に合う変更・払い戻しをサイト・アプリで自分でできるように','人数と受付時間を増やし、待ち時間・折り返しを案内','空港・旅行会社への案内と内容をそろえる','メールが戻った人・連絡先のない人を一覧にして電話・空港で'],who:['一斉の通知','サイト・SNS','オンラインで変更','コールセンター','内容をそろえる','届かない人'],n:['法人・上級会員・乗り継ぎ・特別なサービスのお客様には個別に','補償は原因で変わる。その場で約束せず、会社の基準と窓口を案内する']},
  ko:{t:'직판 고객에게 알리는 법(예)',st:['대상 편 고객 전원에게, 예약한 언어로','공지란과 SNS에 같은 내용. 갱신 시각도','조건에 맞는 변경·환불을 사이트·앱에서 스스로 할 수 있게','인원과 접수 시간을 늘리고 대기 시간·콜백 안내','공항·여행사 안내와 내용을 맞춘다','메일이 반송된 사람·연락처가 없는 사람을 목록으로 만들어 전화·공항에서'],who:['일괄 통지','사이트·SNS','온라인 변경','콜센터','내용 맞추기','닿지 않는 사람'],n:['법인·상위 등급 회원·연결·특별 서비스 고객에게는 개별로','보상은 원인에 따라 다르다. 그 자리에서 약속하지 말고 회사 기준과 창구를 안내한다']},
  en:{t:'How to inform direct customers (example)',st:['Everyone on affected flights, in the language they booked in','Same content in the news section and on social media, with update times','Open self-service changes and refunds that match the conditions','Add staff and hours; give waiting times and offer call-backs','Align with what the airport and agencies are told','List bounced emails and missing contacts; follow up by phone or at the airport'],who:['Mass notice','Website and social','Self-service','Call centre','Align content','Not reached'],n:['Contact corporate clients, elite members, connecting and special-service customers individually','Compensation depends on the cause: do not promise on the spot; explain the standards and where to apply']}})[l];
 if(!W)return F.sls_direct('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#E08A2E','#2C8C8C','#1769e0','#7A5CC7','#0f3558','#D64545'],'12s');s+=A.s;
 var L=LIST(W.n,A.y+16,600,11);return SVG(L.y+8,s+L.s)}

};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
