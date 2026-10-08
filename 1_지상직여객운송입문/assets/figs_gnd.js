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
 y+=124;var L=LIST(W.c,y,600,11);return SVG(L.y+8,s+L.s)}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
