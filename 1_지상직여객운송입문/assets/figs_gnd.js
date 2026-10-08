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
/* 横の目盛り：区間の色・目盛り・左から右へ動く印 */
function SCALE(y,mx,step,zones,unit,dur){var x0=40,x1=600,X=function(v){return x0+v/mx*(x1-x0)},o='';
 zones.forEach(function(z,i){o+='<rect x="'+X(z[0])+'" y="'+y+'" width="'+(X(z[1])-X(z[0]))+'" height="26" fill="'+z[2]+'"/>'});
 for(var v=0;v<=mx;v+=step){o+='<line x1="'+X(v)+'" y1="'+(y+26)+'" x2="'+X(v)+'" y2="'+(y+34)+'" stroke="#5B6B7D" stroke-width="1.5"/>'+tx(X(v),y+34+FS(9)+4,String(v),9,'#5B6B7D',700)}
 o+=tx(x1,y+34+FS(9)*2.4+8,unit,9,'#5B6B7D',700,'end');
 o+='<path d="M0 0 L-9 -14 L9 -14 Z" fill="#0f3558"><animateMotion dur="'+(dur||'9s')+'" repeatCount="indefinite" path="M'+X(mx*0.02)+' '+(y-2)+' L'+X(mx*0.98)+' '+(y-2)+'"/></path>';
 return {s:o,y:y+34+FS(9)*2.4+22,X:X}}
/* 色の枠のカードを横に並べる（高さはそろえる） */
function ZCARDS(y,z,cols){var cw=(600-12*(z.length-1))/z.length,zh=0,o='';z.forEach(function(c){var h=36+LI(c[1],10,cw-20).length*FS(10)*1.3+16;if(h>zh)zh=h});
 z.forEach(function(c,i){var x=20+i*(cw+12);o+=R(x,y,cw,zh,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="6" rx="3" fill="'+cols[i]+'"/>'+tx(x+cw/2,y+24,c[0],12,cols[i],900)+WR(x+cw/2,y+44,c[1],10,D,800,cw-20)});
 return {s:o,y:y+zh+14}}
/* 縦の手順：左に番号と内容、右に時刻や担当の札。順に光る */
function STEPS2(y,st,who,pc,dur){var s='',lh=FS(11)*1.3,n=st.length;
 st.forEach(function(x,i){var nn=LI(x,11,380).length,nw=LI(who[i],10,130).length,h=Math.max(nn*lh,nw*FS(10)*1.3)+22;
  s+=R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+GLOW(20,y,600,h,i,n,dur)+BADGE(44,y+h/2,i+1,11)+WR(66,y+h/2+FS(11)*0.35-(nn-1)*lh/2,x,11,D,800,380,'start')+R(462,y+6,150,h-12,pc[i%pc.length],8)+WR(537,y+h/2+FS(10)*0.35-(nw-1)*FS(10)*0.65,who[i],10,'#fff',900,130);
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
  [i,i+1].forEach(function(k,j){var m=marks[k];if(!m)return;var x=20+j*306;o+=R(x,yy,294,h,'#fff',8,' stroke="#D5DEE8"')+'<circle cx="'+(x+8+r0)+'" cy="'+(yy+h/2)+'" r="'+r0.toFixed(1)+'" fill="'+m[2]+'"/>'+tx(x+8+r0,yy+h/2+FS(9)*0.36,String(k+1),9,'#fff',900)+WR(x+16+r0*2,yy+h/2+FS(10)*0.35-(LI(m[1],10,250).length-1)*lh/2,m[1],10,D,800,294-24-r0*2,'start')});
  yy+=h+6}
 return {s:o,y:yy+4}}
/* 上から見た機体（機首は右）。x0..x1 が胴体、cy が中心線 */
function PLANE(x0,x1,cy,fw){var o='',L=x1-x0,wx=x0+L*0.42;
 o+='<path d="M'+wx+' '+(cy-fw/2)+' L'+(wx-L*0.12)+' '+(cy-fw/2-120)+' L'+(wx+L*0.02)+' '+(cy-fw/2-120)+' L'+(wx+L*0.2)+' '+(cy-fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+wx+' '+(cy+fw/2)+' L'+(wx-L*0.12)+' '+(cy+fw/2+120)+' L'+(wx+L*0.02)+' '+(cy+fw/2+120)+' L'+(wx+L*0.2)+' '+(cy+fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+(x0+20)+' '+(cy-fw/2)+' L'+(x0-10)+' '+(cy-fw/2-46)+' L'+(x0+14)+' '+(cy-fw/2-46)+' L'+(x0+60)+' '+(cy-fw/2)+' Z M'+(x0+20)+' '+(cy+fw/2)+' L'+(x0-10)+' '+(cy+fw/2+46)+' L'+(x0+14)+' '+(cy+fw/2+46)+' L'+(x0+60)+' '+(cy+fw/2)+' Z" fill="#DCE6F0" stroke="#9FB0C2"/>';
 o+='<path d="M'+x0+' '+(cy-fw/2)+' L'+(x1-40)+' '+(cy-fw/2)+' Q'+(x1+10)+' '+(cy-fw/2)+' '+(x1+14)+' '+cy+' Q'+(x1+10)+' '+(cy+fw/2)+' '+(x1-40)+' '+(cy+fw/2)+' L'+x0+' '+(cy+fw/2)+' Q'+(x0-24)+' '+cy+' '+x0+' '+(cy-fw/2)+' Z" fill="#fff" stroke="#5B6B7D" stroke-width="2"/>';
 return {s:o,wx:wx,L:L}}
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
  var yy=y+46;s+=WR(x+cw/2,yy+FS(10)*0.35,c[1],10,D,800,cw-24);yy+=LI(c[1],10,cw-24).length*FS(10)*1.3+10;
  var qh=LI(c[2],10,cw-28).length*FS(10)*1.3+12;s+=R(x+10,yy,cw-20,qh,'#EEF3F7',8)+WR(x+cw/2,yy+qh/2+FS(10)*0.35-(LI(c[2],10,cw-28).length-1)*FS(10)*0.65,c[2],10,'#0f3558',700,cw-28)});
 y+=ch+14;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 1-3 カウンターで確かめる4項目。1つでも分からなければ責任者へ */
gnd_doc4:function(l){
 var W=({ja:{t:'書類確認の4項目：全部そろって初めて搭乗券を出す',st:['パスポートの有効性：期限・残存期間・種類・破損','写真と本人の一致：帽子・サングラス・マスクは外してもらう','ビザ：目的地と乗り継ぎ地の両方。使用済みでないか','航空券：名前・旅程・有効期限が予約と一致するか'],who:['旅券','本人の顔','入国の条件（TIMATIC など）','予約・航空券'],ok:'4つともOK → 搭乗券を発行',ng:'1つでも分からない → 責任者に相談（独断で通さない）',n:['確認しないまま運ぶと入国拒否（INAD）になり、航空会社が送還の費用や罰金を負うことがある','入国の条件は国と時期で変わる。毎回、最新の情報で確かめる']},
  ko:{t:'서류 확인 4항목: 모두 갖춰져야 탑승권을 발행한다',st:['여권 유효성: 만료일·잔여 기간·종류·훼손','사진과 본인 일치: 모자·선글라스·마스크는 벗어 달라고 한다','비자: 목적지와 환승지 모두. 이미 사용하지 않았는지','항공권: 이름·여정·유효기간이 예약과 일치하는지'],who:['여권','본인 얼굴','입국 조건(TIMATIC 등)','예약·항공권'],ok:'4가지 모두 OK → 탑승권 발행',ng:'하나라도 불확실 → 책임자와 상의(독단으로 통과시키지 않는다)',n:['확인 없이 운송하면 입국 거부(INAD)가 되어, 항공사가 송환 비용이나 벌금을 부담할 수 있다','입국 조건은 나라와 시기에 따라 바뀐다. 매번 최신 정보로 확인한다']},
  en:{t:'Four document checks: issue the boarding pass only when all four are in order',st:['Passport validity: expiry, remaining validity, type, damage','Photo matches the passenger: ask them to remove hats, sunglasses, masks','Visa: for the destination and the transit point; not already used','Ticket: name, itinerary and validity match the booking'],who:['Passport','The passenger','Entry rules (TIMATIC etc.)','Booking and ticket'],ok:'All four OK → issue the boarding pass',ng:'Any doubt → ask the supervisor (never wave it through)',n:['Carrying a passenger without proper checks can lead to refused entry (INAD), and the airline may pay removal costs or fines','Entry rules change by country and over time; check the latest information every time']}})[l];
 if(!W)return F.gnd_doc4('ja');setK(1);
 var T=TOP(W.t),s=T.s,y=T.y,dur='9s',lh=FS(11)*1.3,pc=['#1769e0','#2C8C8C','#E08A2E','#7A5CC7'],n=W.st.length;
 W.st.forEach(function(x,i){var nn=LI(x,11,380).length,nw=LI(W.who[i],10,130).length,h=Math.max(nn*lh,nw*FS(10)*1.3)+24;
  s+=R(20,y,600,h,'#fff',10,' stroke="#C8D3DE"')+GLOW(20,y,600,h,i,n,dur)+BADGE(44,y+h/2,i+1,11)+WR(66,y+h/2+FS(11)*0.35-(nn-1)*lh/2,x,11,D,800,380,'start')+R(462,y+6,150,h-12,pc[i],8)+WR(537,y+h/2+FS(10)*0.35-(nw-1)*FS(10)*0.65,W.who[i],10,'#fff',900,130);
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
  var yy=ly+46;s+=WR(40,yy,W.bp[p],10,D,800,560,'start');yy+=LI(W.bp[p],10,560).length*FS(10)*1.3+4;s+=WR(40,yy,W.bg[p],10,col,900,560,'start');
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
 W.z.forEach(function(z,i){var x=20+i*(cw+12),h=zh;s+=R(x,y,cw,h,'#fff',10,' stroke="'+cols[i]+'" stroke-width="2"')+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="6" rx="3" fill="'+cols[i]+'"/>'+tx(x+cw/2,y+24,z[0],12,cols[i],900)+WR(x+cw/2,y+44,z[1],10,D,800,cw-20)});
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
 W.r.forEach(function(r,j){s+=R(20,y,lw,rh,'#EEF3F7',8)+WR(20+lw/2,y+rh/2+FS(10)*0.35-(LI(r,10,lw-16).length-1)*FS(10)*0.65,r,10,'#0f3558',800,lw-16);
  W.c.forEach(function(c,i){var x=20+lw+10+i*(cw+5),g=ok[i][j];s+=R(x,y,cw,rh,'#fff',8,' stroke="#D5DEE8"')+(g?'<circle cx="'+(x+cw/2)+'" cy="'+(y+rh/2)+'" r="12" fill="none" stroke="#2E9B5F" stroke-width="4"/>':'<path d="M'+(x+cw/2-10)+' '+(y+rh/2-10)+' L'+(x+cw/2+10)+' '+(y+rh/2+10)+' M'+(x+cw/2+10)+' '+(y+rh/2-10)+' L'+(x+cw/2-10)+' '+(y+rh/2+10)+'" stroke="#D64545" stroke-width="4" stroke-linecap="round"/>')});
  y+=rh+5});
 var ah=0;W.c.forEach(function(c){var h=LI(c[1],10,cw-14).length*FS(10)*1.3+26;if(h>ah)ah=h});
 s+=R(20,y,lw,ah,'#0f3558',8)+tx(20+lw/2,y+ah/2+FS(10)*0.35,W.ar,10,'#fff',900);
 W.c.forEach(function(c,i){var x=20+lw+10+i*(cw+5);s+=R(x,y,cw,ah,'#FFF4D6',8)+WR(x+cw/2,y+ah/2+FS(10)*0.35-(LI(c[1],10,cw-14).length-1)*FS(10)*0.65,c[1],10,'#3A2A00',800,cw-14)});
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
  s+=R(x,y,cw,h,'#fff',10,' stroke="'+col+'" stroke-width="2"')+tx(x+cw/2,y+24,c[0],13,col,900)+WR(x+cw/2,y+46,c[1],10,D,800,cw-24)+WR(x+cw/2,y+46+LI(c[1],10,cw-24).length*FS(10)*1.3+8,c[2],11,'#0f3558',900,cw-24)});
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
 W.r.forEach(function(r,i){var h=Math.max(rh,LI(r[0],10,c1-30).length*FS(10)*1.3+12);s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',6)+GLOW(20,y,600,h,i,n,dur,6)+WR(36,y+h/2+FS(10)*0.35-(LI(r[0],10,c1-30).length-1)*FS(10)*0.65,r[0],10,D,800,c1-30,'start');
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
  s+=GLOW(20,y-3,600,h+6,i,n,dur,10)+R(20,y,lw,h,'#fff',10,' stroke="#C8D3DE"')+WR(20+lw/2,y+h/2+FS(11)*0.35-(LI(r[0],11,lw-24).length-1)*FS(11)*0.65,r[0],11,D,800,lw-24)+ARW(20+lw+8,y+h/2,rx-8,y+h/2,r[2],3)+R(rx,y,290,h,r[2],10)+WR(rx+145,y+h/2+FS(10)*0.35-(LI(r[1],10,270).length-1)*FS(10)*0.65,r[1],10,'#fff',900,270);
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
 P.forEach(function(p,i){var w=150,nl=LI(W.p[i],9,140).length,bh=nl*FS(9)*1.3+12,by=up[i]?p[1]-16-bh:p[1]+16;s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="11" fill="'+cl[i]+'"/>'+tx(p[0],p[1]+FS(9)*0.36,String(i+1),9,'#fff',900)+R(p[0]-w/2,by,w,bh,'#fff',8,' stroke="'+cl[i]+'" stroke-width="1.5"')+WR(p[0],by+bh/2+FS(9)*0.35-(nl-1)*FS(9)*0.65,W.p[i],9,D,800,140)});
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
  s+=R(20,y,600,h,i%2?'#fff':'#F4F7FB',4)+WR(26,y+h/2+FS(9)*0.35-(nl-1)*FS(9)*0.65,r[0],9,D,800,lw-10,'start');
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
 var y=wy+22;var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
