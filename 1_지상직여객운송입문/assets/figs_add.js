/* 追加の図（2026.10.9）：基礎 0-2・2-1・2-3・4-2、運航管理 8-1、旅客 0-3、現場事例 8-1〜8-3。figs_met.js の後に読み込み、window.FIGH の部品を使う。
   部品（TOP・ROWMAP・ZCARDS・STEPS2・LIST・SVG）は figs_gnd.js と同じ定義 */
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
/* 折り返すラベル（長い一文の要点）。y は上端、戻り値は次の y */
function KEY(y,t,bg){var n=LI(t,11,560).length,lh=FS(11)*1.3;return {s:H.LBW(320,y+FS(11)*0.6+(n-1)*lh/2,t,11,'#fff','middle',bg,560),y:y+n*lh+20}}
var F={
/* 基礎 0-2 旅客機の4つの分類 */
bas_types:function(l){
 var W=({ja:{t:'旅客機の4つの分類と座席数の目安（一般的な配置）',c:[['ターボプロップ機','〜80席。プロペラ。短い路線・離島。ATR 72・Q400'],['リージョナルジェット','〜130席。地方の路線。E190-E2・A220'],['単通路機','〜240席。通路が1本。A320neo・B737-8'],['双通路機','250席〜。通路が2本。B787・A350・B777']],n:['翼幅で空港の区分が変わる：A320・B737はC、B767はD、B787・A350・B777はE、A380はF','単通路機はばら積み（バルク）が中心、双通路機はULDで搭載する','大きい機材ほど、手荷物・貨物・給油・清掃に時間がかかる']},
  ko:{t:'여객기의 4가지 분류와 좌석 수 기준(일반적인 배치)',c:[['터보프롭기','~80석. 프로펠러. 단거리·도서 노선. ATR 72·Q400'],['리저널 제트','~130석. 지방 노선. E190-E2·A220'],['단일통로기','~240석. 통로 1개. A320neo·B737-8'],['이중통로기','250석~. 통로 2개. B787·A350·B777']],n:['날개폭에 따라 공항 등급이 달라진다: A320·B737은 C, B767은 D, B787·A350·B777은 E, A380은 F','단일통로기는 벌크 적재가 중심, 이중통로기는 ULD로 적재한다','기재가 클수록 수하물·화물·급유·청소에 시간이 걸린다']},
  en:{t:'Four airliner types and seat counts in typical layouts',c:[['Turboprop','Up to about 80 seats; propellers; short and island routes. ATR 72, Q400'],['Regional jet','Up to about 130 seats; regional routes. E190-E2, A220'],['Narrow-body','Up to about 240 seats; one aisle. A320neo, B737-8'],['Wide-body','About 250 seats and up; two aisles. B787, A350, B777']],n:['Wingspan sets the aerodrome code letter: A320/B737 C, B767 D, B787/A350/B777 E, A380 F','Narrow-bodies mostly carry bulk loads; wide-bodies use ULDs','The bigger the aircraft, the longer baggage, cargo, fuelling and cleaning take']}})[l];
 if(!W)return F.bas_types('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ZCARDS(T.y,W.c,['#2C8C8C','#1769e0','#E08A2E','#7A5CC7']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},

/* 基礎 2-1 スロットの1年の流れ */
bas_slot:function(l){
 var W=({ja:{t:'スロット（発着枠）の1年の流れ（例）',st:['次の季節の希望スケジュールを出す（初期の提出）','調整者が配分の結果を知らせる（初期の配分）','IATAのスロット会議で調整（年2回）','使わないスロットは基準日までに返す','運航し、80%以上使ったかを確かめる'],who:['航空会社','調整者','スロット会議','航空会社','調整者・当局'],k:'80%以上使えば翌年の同じ季節のスロット優先権（ヒストリック）。使わなければ失う',n:['調整空港（レベル3）はスロットがなければ運航できない。日本では成田・羽田・福岡・関西をJSCが配分','天候・空港の閉鎖など航空会社の責任でない理由で使えなかったスロットは、条件付きで使用とみなされることがある。記録が大切']},
  ko:{t:'슬롯(이착륙 시간대)의 1년 흐름(예)',st:['다음 시즌의 희망 스케줄을 낸다(초기 제출)','조정자가 배분 결과를 알린다(초기 배분)','IATA 슬롯 회의에서 조정(연 2회)','쓰지 않을 슬롯은 기준일까지 반납','운항하고 80% 이상 썼는지 확인'],who:['항공사','조정자','슬롯 회의','항공사','조정자·당국'],k:'80% 이상 쓰면 다음 해 같은 시즌의 슬롯 우선권(히스토릭). 쓰지 않으면 잃는다',n:['조정 공항(레벨 3)은 슬롯이 없으면 운항할 수 없다. 일본은 나리타·하네다·후쿠오카·간사이를 JSC가 배분','기상·공항 폐쇄 등 항공사 책임이 아닌 사유로 사용하지 못한 슬롯은 조건부로 사용한 것으로 인정될 수 있다. 기록이 중요']},
  en:{t:'A year of airport slots (example)',st:['Submit the desired schedule for next season (initial submission)','The coordinator sends the allocation (initial allocation)','Adjust at the IATA Slot Conference (twice a year)','Hand back unused slots by the baseline date','Operate, and check that at least 80% was used'],who:['Airline','Coordinator','Slot Conference','Airline','Coordinator, authority'],k:'Use at least 80% for priority to the same slots in the same season next year (historics); use it or lose it',n:['At a coordinated (level 3) airport you cannot operate without a slot. In Japan, JSC allocates Narita, Haneda, Fukuoka and Kansai','Flights lost for reasons beyond the airline, such as weather or closures, may count as used under set conditions; keep records']}})[l];
 if(!W)return F.bas_slot('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#1769e0','#2C8C8C','#7A5CC7','#E08A2E','#2E9B5F'],'10s');s+=A.s;
 var K=KEY(A.y+16,W.k,'#1769e0');s+=K.s;var y=K.y;
 var L=LIST(W.n,y,600,11);return SVG(L.y+8,s+L.s)},

/* 基礎 2-3 3つのアライアンスとLCC */
bas_alli:function(l){
 var W=({ja:{t:'3つのアライアンスと日本・韓国の航空会社（2026年）',c:[['スターアライアンス','1997年。ANA。アシアナは2026年12月16日に脱退'],['ワンワールド','1999年。JAL'],['スカイチーム','2000年。大韓航空。12月17日からアシアナも統合']],n:['アライアンスでできること：マイル・ラウンジ・乗り継ぎ先までの手荷物（インターライン）','LCC：1機種に統一・安い基本運賃＋追加で購入・自社サイト中心・地上の時間は25〜40分が目安']},
  ko:{t:'3대 얼라이언스와 일본·한국 항공사(2026년)',c:[['스타얼라이언스','1997년. ANA. 아시아나는 2026년 12월 16일 탈퇴'],['원월드','1999년. JAL'],['스카이팀','2000년. 대한항공. 12월 17일부터 아시아나도 통합']],n:['얼라이언스로 할 수 있는 것: 마일리지·라운지·환승지까지 수하물 연결(인터라인)','LCC: 한 기종으로 통일·싼 기본 운임＋추가 구매·자사 사이트 중심·지상 시간은 대략 25~40분']},
  en:{t:'The three alliances and Japanese and Korean airlines (2026)',c:[['Star Alliance','1997. ANA. Asiana leaves on 16 December 2026'],['oneworld','1999. JAL'],['SkyTeam','2000. Korean Air; Asiana joins it from 17 December']],n:['What alliances offer: miles, lounges, baggage checked through to the final stop (interline)','LCCs: one aircraft type, low base fares plus paid extras, own website first, 25–40 minutes on the ground']}})[l];
 if(!W)return F.bas_alli('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ZCARDS(T.y,W.c,['#5B6B7D','#C8102E','#1769e0']);s+=A.s;var L=LIST(W.n,A.y+2,600,11);return SVG(L.y+8,s+L.s)},

/* 基礎 4-2 国内線の本人確認：国による違い */
bas_id:function(l){
 var W=({ja:{t:'国内線の本人確認：国によってこんなに違う（2026年9月時点★）',r:[['日本','法令の義務はない。多くは搭乗券だけ（保安検査は全員）','#5B6B7D'],['韓国','義務。身分証の原本・モバイル身分証・生体情報','#1769e0'],['アメリカ','義務（18歳以上）。REAL ID対応の身分証','#D64545'],['中国','義務（実名制）。保安検査で顔と照合','#E08A2E'],['シェンゲン圏の中','国・航空会社による。旅券・身分証を求めるのが一般的','#2C8C8C']],n:['日本から韓国の国内線に乗り継ぐお客様には、身分証（外国人は旅券）が要ると案内する','義務でない場面でも、会社の規則で求める確認は省かない']},
  ko:{t:'국내선 본인 확인: 나라마다 이렇게 다르다(2026년 9월 기준★)',r:[['일본','법령상 의무는 없음. 대부분 탑승권만(보안검색은 전원)','#5B6B7D'],['한국','의무. 신분증 원본·모바일 신분증·생체정보','#1769e0'],['미국','의무(18세 이상). REAL ID 규격 신분증','#D64545'],['중국','의무(실명제). 보안검색에서 얼굴과 대조','#E08A2E'],['솅겐 지역 안','나라·항공사마다 다름. 여권·신분증 요구가 일반적','#2C8C8C']],n:['일본에서 한국 국내선으로 환승하는 승객에게는 신분증(외국인은 여권)이 필요하다고 안내한다','의무가 아닌 경우에도 회사 규정이 요구하는 확인은 생략하지 않는다']},
  en:{t:'Domestic ID checks: how much countries differ (as of September 2026 ★)',r:[['Japan','No legal requirement; usually the boarding pass alone (everyone is screened)','#5B6B7D'],['Korea','Required: original ID, mobile ID or registered biometrics','#1769e0'],['United States','Required (18 and over): REAL ID-compliant ID','#D64545'],['China','Required (real-name system): face matched at screening','#E08A2E'],['Within Schengen','Varies by country and airline; passport/ID usually asked for','#2C8C8C']],n:['Tell passengers connecting from Japan to a Korean domestic flight that they need ID (a passport for foreigners)','Even where checks are not required by law, never skip those your company requires']}})[l];
 if(!W)return F.bas_id('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'12s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 運航管理 8-1 引き返し・ダイバート・緊急着陸 */
dsp_turn:function(l){
 var W=({ja:{t:'予定どおり着けないとき：3つの形',r:[['引き返し（ターンバック）','出発地へ戻る。機材の不具合・急病人・保安の事案など','#1769e0'],['ダイバート','別の空港に着陸。目的地の気象・滑走路の閉鎖・燃料など','#E08A2E'],['緊急着陸','いちばん近い適切な空港へ急いで。火災・急減圧など','#D64545']],n:['決めるのは機長。運航管理者は候補の空港の気象・NOTAM・燃料・受け入れ体制をそろえる','支店は降りた先でお客様と機体を支える（CIQ・宿泊・再出発の準備）']},
  ko:{t:'예정대로 도착할 수 없을 때: 3가지 형태',r:[['회항(턴백)','출발지로 돌아간다. 기재 결함·응급 환자·보안 사안 등','#1769e0'],['다이버트','다른 공항에 착륙. 목적지 기상·활주로 폐쇄·연료 등','#E08A2E'],['비상착륙','가장 가까운 적절한 공항으로 서둘러. 화재·급감압 등','#D64545']],n:['결정은 기장. 운항관리사는 후보 공항의 기상·NOTAM·연료·수용 여건을 챙긴다','지점은 착륙지에서 승객과 기체를 지원한다(CIQ·숙박·재출발 준비)']},
  en:{t:'When the flight cannot arrive as planned: three forms',r:[['Turnback','Return to the departure airport: technical faults, medical cases, security incidents','#1769e0'],['Diversion','Land at another airport: destination weather, runway closure, fuel','#E08A2E'],['Emergency landing','Land quickly at the nearest suitable airport: fire, rapid decompression','#D64545']],n:['The captain decides; the dispatcher gathers weather, NOTAMs, fuel and handling for the candidate airports','The station supports passengers and aircraft where they land (CIQ, hotels, preparing the restart)']}})[l];
 if(!W)return F.dsp_turn('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'9s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 旅客 0-3 定時出発を支える4つのチーム */
gnd_4team:function(l){
 var W=({ja:{t:'定時出発を支える4つのチーム',c:[['カウンター','受付の締め切りを守り、手荷物の個数と重さを機体側へ'],['ゲート','搭乗の順番と人数を管理し、最後の1人まで確認'],['ランプ','決められた順序と時間で、安全に搭載・取り降ろし'],['ロードコントロール','重量と重心を計算し、安全に飛べる搭載か確かめる']],k:'お客様の流れと機体の準備、2つの流れが合ったとき定時に出発できる'},
  ko:{t:'정시 출발을 뒷받침하는 4개 팀',c:[['카운터','수속 마감을 지키고 수하물 개수와 무게를 기체 쪽에 전달'],['게이트','탑승 순서와 인원을 관리하고 마지막 1명까지 확인'],['램프','정해진 순서와 시간으로 안전하게 탑재·하기'],['로드 컨트롤','중량과 무게중심을 계산해 안전하게 비행할 수 있는 탑재인지 확인']],k:'승객의 흐름과 기체 준비, 두 흐름이 맞을 때 정시에 출발할 수 있다'},
  en:{t:'Four teams behind an on-time departure',c:[['Counter','Keeps the cut-off; passes bag count and weight on'],['Gate','Boarding order and numbers, to the last passenger'],['Ramp','Safe loading in the set order and time'],['Load control','Weight and balance: is the load safe?']],k:'A flight leaves on time when the passenger flow and the aircraft flow meet'}})[l];
 if(!W)return F.gnd_4team('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ZCARDS(T.y,W.c,['#1769e0','#2C8C8C','#E08A2E','#7A5CC7']);s+=A.s;
 var K=KEY(A.y+4,W.k,'#0f3558');return SVG(K.y,s+K.s)},

/* 現場事例 8-1 判断の記録の型 */
irr_log:function(l){
 var W=({ja:{t:'イレギュラー時の判断記録：1行の書き方',st:['確かめた事実を、誰から聞いたかまで書く','分からないことは「未確認」へ。誰がいつ確かめるか','決定と理由を1行で。決める人・承認も','次に見直す時刻を書く。過ぎたら必ず見直す'],who:['事実','未確認','決定と理由','次の時刻'],k:'交代のときは、この記録を一緒に見ながら渡す'},
  ko:{t:'비정상 판단 기록: 한 줄 쓰는 법',st:['확인한 사실을 누구에게 들었는지까지 쓴다','모르는 것은 「미확인」으로. 누가 언제 확인할지','결정과 이유를 한 줄로. 결정한 사람·승인도','다음 재검토 시각을 쓴다. 지나면 반드시 재검토한다'],who:['사실','미확인','결정과 이유','다음 시각'],k:'교대 시에는 이 기록을 함께 보며 인계한다'},
  en:{t:'Recording irregularity decisions: how to write one line',st:['Write the confirmed fact, including who told you','Put unknowns under “unconfirmed”, with who checks and when','Write the decision and its reason in one line, with who decided and approved','Set the next review time, and always review once it passes'],who:['Fact','Unconfirmed','Decision and reason','Next time'],k:'At handover, go through this record together'}})[l];
 if(!W)return F.irr_log('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#1769e0','#E08A2E','#2C8C8C','#D64545'],'9s');s+=A.s;
 var K=KEY(A.y+16,W.k,'#0f3558');return SVG(K.y,s+K.s)},

/* 現場事例 8-2 同じ欠航を3つの相手に */
irr_3way:function(l){
 var W=({ja:{t:'同じ欠航でも、相手ごとに伝えることが違う',r:[['旅客','欠航の事実・代わりの便・いますること・次の案内の時刻','#1769e0'],['本社','決定の時刻と理由・人数・手配の状況・お願いしたい判断','#7A5CC7'],['ハンドリング会社','すること・人数・時刻・担当者・完了報告の時刻','#E08A2E']],n:['外すもの：旅客には決まっていない補償の約束、本社には確かめていない数字、ハンドリング会社には社内の事情']},
  ko:{t:'같은 결항이라도 상대마다 전할 내용이 다르다',r:[['승객','결항 사실·대체편·지금 할 일·다음 안내 시각','#1769e0'],['본사','결정 시각과 이유·인원·수배 상황·요청할 판단','#7A5CC7'],['조업사','할 일·인원·시각·담당자·완료 보고 시각','#E08A2E']],n:['뺄 것: 승객에게는 정해지지 않은 보상 약속, 본사에는 확인되지 않은 숫자, 조업사에는 회사 내부 사정']},
  en:{t:'One cancellation, three audiences, three messages',r:[['Passengers','The cancellation, the replacement flight, what to do now, the next update time','#1769e0'],['Head office','Decision time and reason, numbers, arrangements so far, decisions needed','#7A5CC7'],['Handling company','Tasks, numbers, times, the person in charge, when to report completion','#E08A2E']],n:['Leave out: unconfirmed compensation promises for passengers, unchecked numbers for head office, internal matters for the handling company']}})[l];
 if(!W)return F.irr_3way('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=ROWMAP(T.y,W.r,'9s');s+=A.s;var L=LIST(W.n,A.y+4,600,11);return SVG(L.y+8,s+L.s)},

/* 現場事例 8-3 月例会議の進め方 */
irr_meet:function(l){
 var W=({ja:{t:'月例のステーション運営会議：数字から来月の課題へ',st:['実績を目標・前月と並べて見る','安全の報告を先に扱う','平均・合計ではなく内訳を確かめる','足りない資料を相手を決めて頼む','来月の課題と、効果を見る指標を1つずつ決める'],who:['実績','優先順位','原因','依頼','課題と指標'],k:'安全の報告は「減らす数字」ではなく「隠さない」ことが目標'},
  ko:{t:'월례 스테이션 운영 회의: 숫자에서 다음 달 과제로',st:['실적을 목표·전월과 비교한다','안전 보고를 먼저 다룬다','평균·합계가 아니라 내역을 확인한다','부족한 자료는 상대를 정해 요청한다','다음 달 과제와 효과 측정 지표를 하나씩 정한다'],who:['실적','우선순위','원인','요청','과제와 지표'],k:'안전 보고는 「줄일 숫자」가 아니라 「숨기지 않는 것」이 목표'},
  en:{t:'The monthly station meeting: from numbers to next month’s tasks',st:['Read results against target and last month','Take safety reports first','Check the breakdown, not just averages and totals','Ask a named party for the missing data','Set one task and one indicator for next month'],who:['Results','Priority','Cause','Request','Task and indicator'],k:'For safety reports, the aim is not fewer reports but nothing hidden'}})[l];
 if(!W)return F.irr_meet('ja');setK(1);
 var T=TOP(W.t),s=T.s,A=STEPS2(T.y,W.st,W.who,['#1769e0','#D64545','#E08A2E','#7A5CC7','#2E9B5F'],'10s');s+=A.s;
 var K=KEY(A.y+16,W.k,'#0f3558');return SVG(K.y,s+K.s)},
/* 基礎 0-1 旅客機の各部の名前（2026.10.15 描き直し）：サイト共通の飛行機の絵（aircraft.js の ACFT.top・ACFT.jet、B737）に番号を付ける。
   機首は右（絵は左右反転しない）。番号はレッスンの表（1〜18）と同じ。動く翼面などは色の線・面で示す。
   位置は絵の画素（上：800×655、横：1000×311）で書き、TP・SP で図の座標に直す */
aircraft_parts:function(l){
 var W=({ja:{t:'上から見た図',s:'横から見た図',f:'機首',a:'機尾'},ko:{t:'위에서 본 그림',s:'옆에서 본 그림',f:'기수',a:'꼬리'},en:{t:'Top view',s:'Side view',f:'Nose',a:'Tail'}})[l];
 if(!W)return F.aircraft_parts('ja');setK(1);
 var A=window.ACFT,BL='#2F8FE0',OR='#E08A2F',PU='#7A5CC7',TE='#1F7A6E',RE='#D0506A',GY='#5b6b7d',DK='#1D2A3A';
 var s='',VW=640;
 /* 上から見た図：絵の中心 (CX,CY)、1単位 SC（絵の幅40単位） */
 var SC=10,CX=322,y0=12,TH=FS(13)*1.3+8,CY=y0+TH+19*SC;
 function TP(px,py){return [CX+(px-400)*0.05*SC,CY+(py-335)*0.05*SC]}
 var top1=y0,top2=CY+16.6*SC;
 s+=R(14,top1,VW-28,top2-top1,'#EAF1F8',14);
 s+=tx(30,top1+FS(13)*1.05+4,W.t,13,'#0f3558',800,'start');
 s+='<g transform="translate('+CX+' '+CY+') scale('+SC+')">'+(A&&A.top?A.top({type:'737'}):'')+'</g>';
 /* 色の線（翼面）。mir は下側の翼（絵の上下対称） */
 function LN(pts,c,w,mir){var q=pts.map(function(p){return TP(p[0],mir?670-p[1]:p[1])});return '<path d="M'+q.map(function(v){return v[0].toFixed(1)+' '+v[1].toFixed(1)}).join(' L')+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>'}
 function PG(pts,c,op,mir,sp){var q=pts.map(function(p){return (sp||TP)(p[0],mir?670-p[1]:p[1])});return '<path d="M'+q.map(function(v){return v[0].toFixed(1)+' '+v[1].toFixed(1)}).join(' L')+' Z" fill="'+c+'" opacity="'+op+'" stroke="'+c+'" stroke-width="1.5"/>'}
 [false,true].forEach(function(m){
  s+=LN([[372,42],[414,122],[446,186]],BL,5,m);                 /* 3 スラット（前縁） */
  s+=LN([[339,40],[352,82],[366,124]],OR,5,m);                  /* 4 補助翼 */
  s+=LN([[370,138],[383,184],[395,226],[395,282]],TE,5,m);      /* 6 フラップ */
  s+=LN([[46,180],[63,240],[81,302]],RE,4.5,m)});               /* 9 昇降舵 */
 s+=PG([[384,152],[396,150],[416,228],[416,272],[404,272],[403,232]],PU,.55,true);  /* 5 スポイラー（下側の翼に表示） */
 /* 番号：[番号, 指す所(px,py), 番号の位置(図の座標), 色] */
 function BD(x,y,n,c){var r=Math.max(12,FS(13)*0.82);return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+c+'" stroke="#fff" stroke-width="2.5"/>'+tx(x,y+FS(13)*0.36,String(n),13,'#fff',900)}
 function LK(t,b,c){return '<line x1="'+b[0].toFixed(1)+'" y1="'+b[1].toFixed(1)+'" x2="'+t[0].toFixed(1)+'" y2="'+t[1].toFixed(1)+'" stroke="'+c+'" stroke-width="1.6" stroke-dasharray="4 3"/><circle cx="'+t[0].toFixed(1)+'" cy="'+t[1].toFixed(1)+'" r="3" fill="'+c+'"/>'}
 var TB=[[1,[782,335],[890,250],GY],[2,[522,222],[640,150],GY],[3,[414,122],[520,40],BL],[4,[352,82],[230,64],OR],
  [5,[406,212],[262,560],PU],[6,[383,184],[226,170],TE],[7,[372,10],[470,-16],GY],[8,[100,262],[180,128],GY],[9,[63,240],[-50,196],RE]];
 TB.forEach(function(t){var p=TP(t[1][0],t[0]===5?670-t[1][1]:t[1][1]);s+=LK(p,TP(t[2][0],t[2][1]),t[3])});
 TB.forEach(function(t){var b=TP(t[2][0],t[2][1]);s+=BD(b[0],b[1],t[0],t[3])});
 /* 横から見た図：jet('737') は単位メートル（機首は右）。絵の画素 → 単位：x=19.75−(997−px)×0.041、y=(py−213)×0.041 */
 var S2=13.3,y1=top2+12,TH2=FS(13)*1.3+8,OX=VW/2+0.627*S2,OY=y1+TH2+50+8.733*S2;
 function SP(px,py){return [OX+(19.75-(997-px)*0.041)*S2,OY+(py-213)*0.041*S2]}
 var bot=OY+4.02*S2+70;
 s+=R(14,y1,VW-28,bot-y1,'#EAF1F8',14);
 s+=tx(30,y1+FS(13)*1.05+4,W.s,13,'#0f3558',800,'start');
 s+='<g transform="translate('+OX.toFixed(1)+' '+OY.toFixed(1)+') scale('+S2+')">'+(A&&A.jet?A.jet('737'):'')+'</g>';
 s+=PG([[42,12],[59,12],[106,150],[73,152]],RE,.55,false,SP);                  /* 16 方向舵 */
 s+=PG([[768,236],[804,236],[804,262],[768,262]],OR,.6,false,SP)+PG([[318,226],[350,228],[350,252],[318,250]],OR,.6,false,SP); /* 12 貨物室ドア */
 var SB=[[10,[938,201],[SP(938,0)[0]+34,y1+TH2+20],GY],[11,[876,206],[SP(876,0)[0]-40,y1+TH2+20],DK],[12,[786,249],[SP(786,0)[0]-70,bot-24],OR],
  [13,[897,292],[SP(897,0)[0]-6,bot-24],GY],[14,[506,292],[SP(506,0)[0]+8,bot-24],GY],[15,[118,80],[SP(118,0)[0]+82,y1+TH2+26],GY],
  [16,[70,90],[SP(70,0)[0]-34,y1+TH2+56],RE],[17,[47,190],[SP(50,0)[0]-2,bot-24],GY],[18,[958,231],[SP(958,0)[0]+40,bot-30],OR]];
 SB.forEach(function(t){s+=LK(SP(t[1][0],t[1][1]),t[2],t[3])});
 s+=LK(SP(334,239),SB[2][2],OR);  /* 12 は後ろの貨物室ドアも指す */
 SB.forEach(function(t){s+=BD(t[2][0],t[2][1],t[0],t[3])});
 s+=tx(VW-30,y1+FS(13)*1.05+4,'← '+W.a+'　'+W.f+' →',11,GY,700,'end');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+VW+' '+(bot+10).toFixed(0)+'" role="img">'+R(0,0,VW,bot+10,'#ffffff')+s+'</svg>'}
};
for(var k in F)window.FIGS[k]=H.FIX2(F[k]);
})();
