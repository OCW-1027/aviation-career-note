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
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
