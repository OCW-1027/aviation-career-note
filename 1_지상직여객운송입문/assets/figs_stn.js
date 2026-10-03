/* 空港支店の運営の実務（STN）の図（2026.10）— figs_met.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は TW2（折り返し）、高さは行数で計算、縦に積む配置）
   数字はすべて考え方を示すための架空の例。飛行機を描くときは aircraft.js（H.plane・H.planeS）を使う */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,FS=H.FS,LI=H.LINES,setK=H.setK,ARW=H.ARW;
var D=H.C.D,G=H.C.G,BL='#2F8FE0',TE='#1F7A6E',OR='#E08A2F',RD='#D0453E',GN='#1F8A5B',NV='#0f3558',GY='#9AA9B8';
function svg(h,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+Math.ceil(h)+'" role="img">'+R(0,0,640,Math.ceil(h),'#F7FAFD')+body+'</svg>'}
function hgt(s,sz,w){return LI(s,sz,w).length*FS(sz)*1.3}
function TW2(x,top,s,sz,c,w,maxw,a){var n=LI(s,sz,maxw).length,lh=FS(sz)*1.3;return WR(x,top+FS(sz)*0.95+(n-1)*lh/2,s,sz,c,w,maxw,a)}
function ttlH(s){return Math.max(58,30+hgt(s,15,600)+14)}
function fade(a,b,dur){return '<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+a+';'+b+';0.95;1" dur="'+dur+'s" repeatCount="indefinite"/>'}
/* 色つきの説明の箱。戻り値は [図, 高さ] */
function BOX(y,s,bg,c,sz){sz=sz||12;var h=hgt(s,sz,560)+18;return [R(20,y,600,h,bg,10)+TW2(320,y+9,s,sz,c,900,560),h]}
/* 凡例の1行（色の四角＋文）。戻り値は [図, 高さ] */
function LEG(y,s,c){var h=hgt(s,11.5,550);return [R(24,y+FS(11.5)*0.28,18,FS(11.5)*0.75,c,4)+TW2(52,y,s,11.5,D,700,550,'start'),h+8]}
function num(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')}

/* 1. 支店の評価：業績と能力の2つの柱が総合の等級にまとまる（1-1） */
var EVAL={
 ja:['業績と能力、2つの柱で総合の等級が決まる（例）',['業績（結果）― 数字に出た結果',['定時性：運送・ハンドリングが原因の遅延の件数・定時率','自動化：オンラインチェックイン・キオスクの利用率','付帯収入：アップグレード・超過手荷物などの1便あたりの収入']],['能力（過程）― 仕事の進め方',['協業・規定の遵守：違反や未実施は減点、お褒めは加点','品質管理：ハンドリング会社との月例会議・品質審査、同じ是正の繰り返し','手荷物事故の管理：事故の指数（MBR）の水準と増減']],'総合評価（重みを掛けて合計 ＋ 評価者の総合判断）','目標を達成すればB。目標を上回ればA・S、届かなければC・D','※ 項目・配点は航空会社ごとに違います。複数の会社の方式をもとにした一般的な例です。'],
 ko:['업적과 역량, 두 축으로 종합 등급이 정해진다(예)',['업적(결과) — 숫자로 나온 결과',['정시성: 운송·조업이 원인인 지연 건수·정시율','자동화: 온라인 체크인·키오스크 이용률','부대수익: 업그레이드·초과 수하물 등 편당 수익']],['역량(과정) — 일하는 방식',['협업·규정 준수: 위반이나 미이행은 감점, 칭찬은 가점','품질 관리: 조업사 월간 회의·품질심사, 같은 시정조치의 반복','수하물 사고 관리: 사고 지수(MBR)의 수준과 증감']],'종합 평가(가중치를 곱해 합산 + 평가자의 종합 판단)','목표를 달성하면 B. 목표를 넘으면 A·S, 못 미치면 C·D','※ 항목·배점은 항공사마다 다릅니다. 여러 회사의 방식을 바탕으로 한 일반적인 예입니다.'],
 en:['Two axes, performance and capability, make up the overall grade (example)',['Performance (results): what the numbers show',['Punctuality: delays caused by passenger services or handling; on-time rate','Automation: use of online check-in and kiosks','Ancillary revenue: per-flight revenue from upgrades, excess baggage and so on']],['Capability (process): how the work is done',['Cooperation and compliance: points off for breaches or omissions, points added for compliments','Quality management: monthly handler meetings, audits, repeated corrective actions','Baggage management: level and trend of the mishandled bag rate (MBR)']],'Overall evaluation (weighted total plus the evaluator’s overall judgment)','Meeting the target earns a B. Beating it earns A or S; missing it, C or D','* Items and weights differ by airline. A general example based on several companies’ methods.']};
function evalFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),ymax=0;
 /* PCは左右に2列、スマートフォンは上下に積む */
 var nar=H.NARROW(),cw=nar?600:290,tw=cw-28;
 [[d[1],BL,20],[d[2],TE,nar?20:330]].forEach(function(c){var yy=nar?Math.max(y,ymax):y,hh=hgt(c[0][0],12.5,tw)+16;s+=R(c[2],yy,cw,hh,c[1],10)+TW2(c[2]+cw/2,yy+8,c[0][0],12.5,'#fff',900,tw);yy+=hh+8;
  c[0][1].forEach(function(t){var h=hgt(t,11.5,tw)+16;s+=R(c[2],yy,cw,h,'#fff',8,' stroke="'+c[1]+'" stroke-width="1.5"')+TW2(c[2]+cw/2,yy+8,t,11.5,D,700,tw);yy+=h+6});ymax=Math.max(ymax,yy+(nar?6:0))});
 y=ymax+4;s+=nar?ARW(320,y,320,y+24,NV,4):(ARW(165,y,165,y+24,BL,4)+ARW(475,y,475,y+24,TE,4));y+=36;
 var hc=hgt(d[3],12.5,560)+16;s+=R(20,y,600,hc,NV,10)+TW2(320,y+8,d[3],12.5,'#fff',900,560);y+=hc+12;
 var gh=Math.max(50,FS(18)*1.9);
 ['S','A','B','C','D'].forEach(function(g,i){var x=20+i*122,on=g==='B';s+=R(x,y,112,gh,on?OR:'#fff',10,' stroke="'+(on?OR:'#C8D3DE')+'" stroke-width="2"')+tx(x+56,y+gh/2+FS(18)*0.35,g,18,on?'#fff':D,900)+(on?'<rect x="'+(x-5)+'" y="'+(y-5)+'" width="122" height="'+(gh+10)+'" rx="14" fill="none" stroke="'+OR+'" stroke-width="3"><animate attributeName="opacity" values="1;0.15;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/></rect>':'')});
 y+=gh+14;var ht=hgt(d[4],12.5,580);s+=TW2(320,y,d[4],12.5,'#B45309',900,580);y+=ht+12;
 var b=BOX(y,d[5],'#EEF4FA',G,11.5);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 2. D0とD15：10便が順に出発し、基準で数字が変わる（1-2） */
var OTP={
 ja:['D0とD15 ― 同じ10便でも、基準で数字が変わる',['出発予定時刻（STD）ちょうど、またはその前に出発 ― D0に入る','15分以内に出発 ― D15に入る','15分を超えて出発 ― 遅延'],'出発予定時刻（STD）からの分',['D0 ＝ 4便 ÷ 10便 ＝ 40%','D15 ＝ 8便 ÷ 10便 ＝ 80%'],'架空の10便の例。出発時刻は、ふつう機体がスポットから動き出した時刻（オフブロック）で測ります。'],
 ko:['D0와 D15 — 같은 10편이라도 기준에 따라 숫자가 달라진다',['출발 예정 시각(STD) 정각 또는 그 전에 출발 — D0에 들어간다','15분 이내에 출발 — D15에 들어간다','15분을 넘겨 출발 — 지연'],'출발 예정 시각(STD)부터의 분',['D0 = 4편 ÷ 10편 = 40%','D15 = 8편 ÷ 10편 = 80%'],'가상의 10편 예. 출발 시각은 보통 항공기가 주기장에서 움직이기 시작한 시각(오프블록)으로 잽니다.'],
 en:['D0 and D15: the same ten flights give different numbers',['Left at or before the scheduled time (STD): counts for D0','Left within 15 minutes: counts for D15','Left more than 15 minutes late: delayed'],'Minutes from scheduled departure (STD)',['D0 = 4 of 10 flights = 40%','D15 = 8 of 10 flights = 80%'],'Ten fictional flights. Departure is usually timed when the aircraft starts to move off the stand (off-block).']};
function otpFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),dur=11;
 var off=[-3,-1,0,0,2,5,9,14,22,38],x0=40,w=560,mn=-10,mx=45,X=function(m){return x0+w*(m-mn)/(mx-mn)},top=y+8,rh=19,ch=off.length*rh+14,f=FS(11);
 s+=R(X(mn),top,X(0)-X(mn),ch,'#E3F4EA',0)+R(X(0),top,X(15)-X(0),ch,'#E4F0FB',0)+R(X(15),top,X(mx)-X(15),ch,'#FDECEC',0);
 s+='<line x1="'+X(0)+'" y1="'+(top-6)+'" x2="'+X(0)+'" y2="'+(top+ch)+'" stroke="'+GN+'" stroke-width="3"/><line x1="'+X(15)+'" y1="'+(top-6)+'" x2="'+X(15)+'" y2="'+(top+ch)+'" stroke="'+BL+'" stroke-width="3" stroke-dasharray="7 5"/>';
 off.forEach(function(m,i){var c=m<=0?GN:(m<=15?BL:RD),cy=top+16+i*rh,a=(0.04+i*0.07).toFixed(3),b=(0.06+i*0.07).toFixed(3);
  s+='<g opacity="0">'+fade(a,b,dur)+'<line x1="'+X(0).toFixed(1)+'" y1="'+cy+'" x2="'+X(m).toFixed(1)+'" y2="'+cy+'" stroke="'+c+'" stroke-width="3" opacity=".45"/><circle cx="'+X(m).toFixed(1)+'" cy="'+cy+'" r="6.5" fill="'+c+'" stroke="#fff" stroke-width="1.5"/></g>'});
 y=top+ch+f*1.25;s+=tx(X(0),y,'STD',11,GN,900)+tx(X(15),y,'+15',11,BL,900)+tx(X(30),y,'+30',11,G,700)+tx(X(45)-4,y,'+45',11,G,700,'end');
 y+=f*0.6;var ha=hgt(d[2],11,560);s+=TW2(320,y,d[2],11,G,700,560);y+=ha+12;
 [GN,BL,RD].forEach(function(c,i){var g=LEG(y,d[1][i],c);s+=g[0];y+=g[1]});y+=6;
 [[d[3][0],'#E3F4EA','#14633F','0.78','0.82'],[d[3][1],'#E4F0FB','#1B5FA6','0.84','0.88']].forEach(function(r){var b=BOX(y,r[0],r[1],r[2],14);s+='<g opacity="0">'+fade(r[3],r[4],dur)+b[0]+'</g>';y+=b[1]+8});
 y+=4;var hn=hgt(d[4],11.5,580);s+=TW2(320,y,d[4],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 3. 遅延コードごとの遅延時間：支店が減らせる遅延と外の要因（1-2） */
var DLY={
 ja:['遅延コードで分けると、どこから直すかが見える',[['93','前の便の到着の遅れ（機材の連結）',310,0],['89','管制・空港の制限',180,0],['15','搭乗（未搭乗客の捜索・手荷物の取り降ろし）',150,1],['32','搭載・取り降ろし',120,1],['18','手荷物の処理',90,1],['71','気象',70,0]],['支店・ハンドリング会社が管理できる遅延（コード11〜39）','外の要因（前の便・管制・気象など）'],'支店が直接減らせる遅延は360分（全体920分の39%）。いちばん大きいコード15から原因を探します。','ある支店の1か月の遅延時間をコード別に集めた架空の例です。','分'],
 ko:['지연 코드로 나누면 어디부터 고칠지 보인다',[['93','앞 편 도착 지연(기재 연결)',310,0],['89','관제·공항의 제한',180,0],['15','탑승(미탑승객 찾기·수하물 하기)',150,1],['32','탑재·하기',120,1],['18','수하물 처리',90,1],['71','기상',70,0]],['지점·조업사가 관리할 수 있는 지연(코드 11~39)','외부 요인(앞 편·관제·기상 등)'],'지점이 직접 줄일 수 있는 지연은 360분(전체 920분의 39%). 가장 큰 코드 15부터 원인을 찾습니다.','한 지점의 한 달 지연 시간을 코드별로 모은 가상의 예입니다.','분'],
 en:['Sorting delays by code shows where to start',[['93','Late inbound aircraft',310,0],['89','ATC and airport restrictions',180,0],['15','Boarding (missing passengers, bag offload)',150,1],['32','Loading and unloading',120,1],['18','Baggage processing',90,1],['71','Weather',70,0]],['Delays the station and handler can control (codes 11–39)','Outside causes (inbound aircraft, ATC, weather)'],'The station can directly reduce 360 minutes (39% of 920). Start with the largest, code 15.','One station’s delay minutes for a month by code; a fictional example.',' min']};
function delayFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),mxv=0;d[1].forEach(function(r){mxv=Math.max(mxv,r[2])});
 d[1].forEach(function(r){var c=r[3]?BL:GY,lab=r[0]+'  '+r[1],hl=hgt(lab,12,590),bw=Math.round(430*r[2]/mxv),bh=Math.max(18,FS(12)*0.95);
  s+=TW2(24,y,lab,12,D,800,590,'start');y+=hl+4;s+=R(24,y,bw,bh,c,5)+tx(24+bw+8,y+bh/2+FS(12)*0.35,num(r[2])+d[5],12,r[3]?'#1B5FA6':G,900,'start');y+=bh+12});
 y+=2;[BL,GY].forEach(function(c,i){var g=LEG(y,d[2][i],c);s+=g[0];y+=g[1]});y+=6;
 var b=BOX(y,d[3],'#E4F0FB','#1B5FA6',12.5);s+=b[0];y+=b[1]+10;var hn=hgt(d[4],11.5,580);s+=TW2(320,y,d[4],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 4. ターンアラウンドの工程とクリティカルパス（1-3）。行：[名前, 開始, 終了, クリティカルか] */
var CRIT={
 ja:['出発までの60分 ― クリティカルパスを守る（例）',[['降機（お客様）',0,8,1],['取り降ろし（手荷物・貨物）',2,18,0],['清掃',8,24,1],['機内食・給油',6,26,0],['搭載',20,46,0],['搭乗',24,52,1],['ロードシート',44,52,0],['ドアクローズ・プッシュバック',52,60,1]],'到着（ブロックイン）からの分',['クリティカルパス：1分遅れると、出発も1分遅れる','余裕のある工程：少し遅れても出発には響かない'],'見守る順番は、降機 → 清掃 → 搭乗 → ドアクローズ。この鎖の始まる時刻を早めることが「前倒し」です。','地上にいる時間が60分の小型機を想定した例。工程と時間は、機種・空港・会社の標準で決まります。'],
 ko:['출발까지의 60분 — 크리티컬 패스를 지킨다(예)',[['하기(승객)',0,8,1],['하역(수하물·화물)',2,18,0],['청소',8,24,1],['기내식·급유',6,26,0],['탑재',20,46,0],['탑승',24,52,1],['로드시트',44,52,0],['도어 클로즈·푸시백',52,60,1]],'도착(블록인)부터의 분',['크리티컬 패스: 1분 늦으면 출발도 1분 늦는다','여유가 있는 공정: 조금 늦어도 출발에는 영향이 없다'],'지켜볼 순서는 하기 → 청소 → 탑승 → 도어 클로즈. 이 사슬의 시작 시각을 앞당기는 것이 「당겨서 하기」입니다.','지상 체류 시간이 60분인 소형기를 가정한 예. 공정과 시간은 기종·공항·회사의 표준으로 정해집니다.'],
 en:['Sixty minutes to departure: protect the critical path (example)',[['Disembarking',0,8,1],['Unloading (bags, cargo)',2,18,0],['Cleaning',8,24,1],['Catering and fuel',6,26,0],['Loading',20,46,0],['Boarding',24,52,1],['Loadsheet',44,52,0],['Door close and pushback',52,60,1]],'Minutes from arrival (block-in)',['Critical path: one minute late here means one minute late off the stand','Tasks with slack: a small delay does not affect departure'],'Watch disembarking, cleaning, boarding and door close in that order. Starting this chain earlier is what “working ahead” means.','An example for a narrow-body with 60 minutes on the ground. Tasks and timings follow the standard for the aircraft type, airport and airline.']};
function critFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),dur=10,lx=20,lw=172,bx=206,bw=414,X=function(m){return bx+bw*m/60},f=FS(11),bars='',bh=20;
 [0,10,20,30,40,50,60].forEach(function(m){s+=tx(m===60?X(m)-2:X(m),y+f,String(m),11,G,700,m===60?'end':(m===0?'start':'middle'))});y+=f+8;var gtop=y;
 d[1].forEach(function(r,i){var h=Math.max(hgt(r[0],11.5,lw),bh)+12,c=r[3]?OR:'#8FB4D9';
  bars+=(i%2?'':R(lx,y,600,h,'#EEF4FA',6))+TW2(lx+6,y+(h-hgt(r[0],11.5,lw))/2,r[0],11.5,r[3]?'#B45309':D,r[3]?900:700,lw,'start')+R(X(r[1]),y+(h-bh)/2,X(r[2])-X(r[1]),bh,c,6);y+=h});
 var gbot=y,grid='';[0,10,20,30,40,50,60].forEach(function(m){grid+='<line x1="'+X(m)+'" y1="'+gtop+'" x2="'+X(m)+'" y2="'+gbot+'" stroke="#D5DEE8" stroke-width="1"/>'});
 s+=grid+bars+'<line x1="0" y1="'+gtop+'" x2="0" y2="'+gbot+'" stroke="'+RD+'" stroke-width="3"><animateTransform attributeName="transform" type="translate" values="'+X(0)+' 0;'+X(60)+' 0;'+X(60)+' 0" keyTimes="0;0.9;1" dur="'+dur+'s" repeatCount="indefinite"/></line>';
 y+=8;var ha=hgt(d[2],11,560);s+=TW2(X(30),y,d[2],11,G,700,400);y+=ha+12;
 [OR,'#8FB4D9'].forEach(function(c,i){var g=LEG(y,d[3][i],c);s+=g[0];y+=g[1]});y+=6;
 var b=BOX(y,d[4],'#FFF3E0','#B45309',12.5);s+=b[0];y+=b[1]+10;var hn=hgt(d[5],11.5,580);s+=TW2(320,y,d[5],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 5. 件数ではなく率で比べる（1-4）。行：[見出し, 件数, 率, ひとこと, 色] */
var RATIO={
 ja:['件数ではなく、率で比べる',['手荷物事故の率 ＝ 事故の件数 ÷ 旅客数 × 1,000'],[['4月 ― 旅客 24,000人',12,0.5,'基準にする月',BL],['5月 ― 旅客 36,000人',18,0.5,'件数は6件増えたが、率は同じ。悪くなってはいない',GN],['6月 ― 旅客 20,000人',12,0.6,'件数は4月と同じだが、率は上がった。原因を探す',RD]],['事故の件数','千人あたり','件'],'件数だけを見ると5月がいちばん悪く見えますが、実際に悪くなったのは6月です。'],
 ko:['건수가 아니라 비율로 비교한다',['수하물 사고 비율 = 사고 건수 ÷ 승객 수 × 1,000'],[['4월 — 승객 24,000명',12,0.5,'기준이 되는 달',BL],['5월 — 승객 36,000명',18,0.5,'건수는 6건 늘었지만 비율은 같다. 나빠진 것이 아니다',GN],['6월 — 승객 20,000명',12,0.6,'건수는 4월과 같지만 비율은 올랐다. 원인을 찾는다',RD]],['사고 건수','1,000명당','건'],'건수만 보면 5월이 가장 나빠 보이지만, 실제로 나빠진 달은 6월입니다.'],
 en:['Compare rates, not counts',['Mishandled bag rate = mishandled bags ÷ passengers × 1,000'],[['April: 24,000 passengers',12,0.5,'The month used as the baseline',BL],['May: 36,000 passengers',18,0.5,'Six more cases, but the same rate. Things have not got worse',GN],['June: 20,000 passengers',12,0.6,'The same count as April, but a higher rate. Look for the cause',RD]],['Cases','Per 1,000',''],'By count alone May looks worst, but the month that actually got worse is June.']};
function ratioFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),lw=150,bx=196,bm=290,bh=Math.max(16,FS(12)*0.9);
 var b0=BOX(y,d[1][0],'#EEF4FA',NV,12.5);s+=b0[0];y+=b0[1]+12;
 d[2].forEach(function(r){var c=r[4],y0=y,yy=y+10,inner='',hh=hgt(r[0],13,560);inner+=TW2(36,yy,r[0],13,D,900,560,'start');yy+=hh+8;
  [[d[3][0],r[1]/18,GY,num(r[1])+d[3][2],D],[d[3][1],r[2]/0.6,c,r[2].toFixed(2),c]].forEach(function(v){var hl=hgt(v[0],11.5,lw),h=Math.max(hl,bh);
   inner+=TW2(36,yy+(h-hl)/2,v[0],11.5,G,700,lw,'start')+R(bx,yy+(h-bh)/2,Math.round(bm*v[1]),bh,v[2],5)+tx(bx+Math.round(bm*v[1])+8,yy+h/2+FS(12)*0.35,v[3],12,v[4],900,'start');yy+=h+8});
  var hc=hgt(r[3],11.5,560);inner+=TW2(36,yy,r[3],11.5,c,800,560,'start');yy+=hc+12;
  s+=R(20,y0,600,yy-y0,'#fff',10,' stroke="#DCE3EA" stroke-width="1.5"')+R(20,y0,8,yy-y0,c,4)+inner;y=yy+10});
 var b=BOX(y,d[4],'#FDECEC','#B42318',12.5);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 6. SPI：月ごとの数字と警報値、先行指標から事故まで（1-5） */
var SPI={
 ja:['SPIは「線を越えたら動く」ための数字（例）','1,000便あたりの件数',['注意','警戒','深刻'],'目標（SPT）は0件。警報の線は、過去の平均とばらつきから会社が決めます。','7月に「注意」の線を越えた → 事故になる前に原因を調べる',[['先行指標（先に打つ手）','教育、品質審査、月例会議、搭載のモニタリング、他支店の事例の共有'],['前兆（危ないサイン）','会議が開かれない、署名の漏れ・再確認の省略、変更の伝達漏れ'],['事故・誤り（あとから数える数字）','搭載管理の誤り、危険物の誤申告など。SPIとして集計される']],'緑の2つが、総括が毎日動かせるところです。','数字と警報値は考え方を示すための架空の例です。'],
 ko:['SPI는 「선을 넘으면 움직이기」 위한 숫자(예)','1,000편당 건수',['주의','경계','심각'],'목표(SPT)는 0건. 경보선은 과거 평균과 편차로 회사가 정합니다.','7월에 「주의」 선을 넘었다 → 사고가 나기 전에 원인을 조사한다',[['예방지표(먼저 쓰는 수)','교육, 품질심사, 월간 회의, 탑재 모니터링, 타 지점 사례 공유'],['전조징후(위험 신호)','회의가 열리지 않음, 서명 누락·재확인 생략, 변경 전파 누락'],['사고·오류(나중에 세는 숫자)','탑재관리 오류, 위험물 오신고 등. SPI로 집계된다']],'초록 두 칸이 총괄이 매일 움직일 수 있는 곳입니다.','숫자와 경보치는 개념을 보여 주기 위한 가상의 예입니다.'],
 en:['SPIs are numbers that tell you to act when a line is crossed (example)','Occurrences per 1,000 flights',['Caution','Warning','Critical'],'The target (SPT) is zero. The airline sets the alert lines from the past average and its spread.','In July the caution line was crossed: investigate the cause before it becomes an accident',[['Leading indicators (actions taken first)','Training, audits, monthly meetings, load monitoring, sharing cases from other stations'],['Precursors (warning signs)','Meetings not held, missing signatures or skipped cross-checks, changes not passed on'],['Accidents and errors (counted afterwards)','Load control errors, misdeclared dangerous goods and so on, counted as SPIs']],'The two green boxes are where a duty manager can act every day.','The figures and alert levels are fictional, to show the idea.']};
function spiFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),dur=10,f=FS(11);
 var v=[0.4,0.6,0.3,0.8,0.5,0.9,1.4,0.7,0.4,0.6,0.5,0.3],al=[1.2,2.0,2.8],ac=['#C99A1E',OR,RD],cx=58,cw=556,mxv=3.3;
 var hy=hgt(d[1],11,560);s+=TW2(cx,y,d[1],11,G,700,540,'start');y+=hy+6;var top=y,ch=Math.max(200,f*11),X=function(i){return cx+cw*(i+0.5)/12},Y=function(q){return top+ch*(1-q/mxv)};
 s+=R(cx,top,cw,ch,'#fff',8,' stroke="#DCE3EA"');
 [0,1,2,3].forEach(function(q){s+='<line x1="'+cx+'" y1="'+Y(q)+'" x2="'+(cx+cw)+'" y2="'+Y(q)+'" stroke="#EEF2F6"/>'+tx(cx-8,Y(q)+f*0.35,String(q),11,G,700,'end')});
 al.forEach(function(a,i){s+='<line x1="'+cx+'" y1="'+Y(a)+'" x2="'+(cx+cw)+'" y2="'+Y(a)+'" stroke="'+ac[i]+'" stroke-width="2" stroke-dasharray="8 5"/>'+tx(cx+cw-8,Y(a)-f*0.35,d[2][i],11,ac[i],900,'end')});
 var p=v.map(function(q,i){return (i?'L':'M')+X(i).toFixed(1)+' '+Y(q).toFixed(1)}).join(' '),L=1200;
 s+='<path d="'+p+'" fill="none" stroke="'+BL+'" stroke-width="3.5" stroke-linejoin="round" stroke-dasharray="'+L+'" stroke-dashoffset="'+L+'"><animate attributeName="stroke-dashoffset" values="'+L+';'+L+';0;0;'+L+'" keyTimes="0;0.04;0.5;0.95;1" dur="'+dur+'s" repeatCount="indefinite"/></path>';
 v.forEach(function(q,i){var hot=q>al[0];s+='<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(q).toFixed(1)+'" r="'+(hot?7:4.5)+'" fill="'+(hot?RD:BL)+'" stroke="#fff" stroke-width="1.5"/>'+(hot?'<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(q).toFixed(1)+'" r="15" fill="none" stroke="'+RD+'" stroke-width="3"><animate attributeName="opacity" values="1;0.1;1" keyTimes="0;0.5;1" dur="1.6s" repeatCount="indefinite"/></circle>':'')});
 y=top+ch+f*1.25;for(var i=0;i<12;i++)s+=tx(X(i),y,String(i+1),11,i===6?RD:G,i===6?900:700);y+=f*0.7;
 var ht=hgt(d[3],11.5,580);s+=TW2(320,y,d[3],11.5,G,700,580);y+=ht+10;
 var b=BOX(y,d[4],'#FDECEC','#B42318',12.5);s+=b[0];y+=b[1]+14;
 d[5].forEach(function(r,i){var c=i<2?GN:GY,h1=hgt(r[0],12.5,540),h2=hgt(r[1],11.5,540),h=h1+h2+22;
  s+=R(40,y,580,h,i<2?'#F0F9F3':'#fff',10,' stroke="'+c+'" stroke-width="'+(i<2?2:1.5)+'"')+R(40,y,8,h,c,4)+TW2(60,y+8,r[0],12.5,i<2?'#14633F':D,900,540,'start')+TW2(60,y+12+h1,r[1],11.5,D,700,540,'start');y+=h;
  if(i<2){s+=ARW(330,y+3,330,y+19,GY,3.5);y+=26}else y+=10});
 var hb=hgt(d[6],12,580);s+=TW2(320,y,d[6],12,'#14633F',900,580);y+=hb+8;var hn=hgt(d[7],11.5,580);s+=TW2(320,y,d[7],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 7. 自動化の割合と付帯収入（1-6） */
var SELF={
 ja:['自動化と付帯収入 ― 運送部門が会社に貢献する2つの数字（例）','チェックインの手段の割合',['オンラインチェックイン','キオスク','カウンター'],[['第1四半期',30,15],['第2四半期',34,18],['第3四半期',38,20],['第4四半期',42,23]],'自動化の割合','付帯収入 ― 1便あたり',[['座席のアップグレード',30000],['超過手荷物',24000],['有料座席（前方・非常口など）',18000],['大型手荷物',8000]],'円','合計：1便あたり80,000円。規定どおりにいただき、無理に勧めません。','自動化の割合 ＝ オンラインチェックイン ＋ キオスク。目標は路線・空港の設備で違います。数字は架空の例です。'],
 ko:['자동화와 부대수익 — 운송 부문이 회사에 기여하는 두 숫자(예)','체크인 수단의 비율',['온라인 체크인','키오스크','카운터'],[['1분기',30,15],['2분기',34,18],['3분기',38,20],['4분기',42,23]],'자동화율','부대수익 — 한 편당',[['좌석 업그레이드',30000],['초과 수하물',24000],['유료 좌석(앞좌석·비상구 등)',18000],['대형 수하물',8000]],'엔','합계: 편당 80,000엔. 규정대로 받고, 강매하지 않습니다.','자동화율 = 온라인 체크인 + 키오스크. 목표는 노선·공항 설비에 따라 다릅니다. 숫자는 가상의 예입니다.'],
 en:['Automation and ancillary revenue: two numbers that show passenger services contributing (example)','Share of each check-in channel',['Online check-in','Kiosk','Counter'],[['Q1',30,15],['Q2',34,18],['Q3',38,20],['Q4',42,23]],'Automation','Ancillary revenue per flight',[['Seat upgrades',30000],['Excess baggage',24000],['Paid seats (front rows, exit rows)',18000],['Oversize baggage',8000]],' yen','Total: 80,000 yen per flight. Charge by the rules and never push.','Automation = online check-in + kiosk. Targets differ by route and airport facilities. The figures are fictional.']};
function selfFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),cs=[BL,TE,'#C8D3DE'],f=FS(12);
 function head(t,c){var h=hgt(t,12.5,560)+14;s+=R(20,y,600,h,c,10)+TW2(320,y+7,t,12.5,'#fff',900,560);y+=h+10}
 head(d[1],NV);s+=tx(616,y+f*0.9,d[4],11,G,700,'end');y+=f*1.3+2;
 var lw=Math.max(70,H.TW(d[3][0][0],12)+10),bx=24+lw,bw=600-lw-Math.max(64,f*3.4),rh=Math.max(26,f*1.5);
 d[3].forEach(function(r,i){var a=r[1],k=r[2],c=100-a-k,x=bx,last=i===d[3].length-1;s+=tx(24,y+rh/2+f*0.35,r[0],12,D,800,'start');
  [a,k,c].forEach(function(p,j){var w=bw*p/100;s+=R(x,y+2,w,rh-4,cs[j],j===0?5:0);x+=w});
  s+=tx(bx+bw+8,y+rh/2+f*0.35,(a+k)+'%',12,last?'#1B5FA6':D,900,'start')+(last?'<rect x="'+(bx-3)+'" y="'+(y-1)+'" width="'+(bw*(a+k)/100+6)+'" height="'+(rh+2)+'" rx="7" fill="none" stroke="'+OR+'" stroke-width="3"><animate attributeName="opacity" values="1;0.15;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/></rect>':'');y+=rh+6});
 y+=4;cs.forEach(function(c,i){var g=LEG(y,d[2][i],c);s+=g[0];y+=g[1]});y+=8;
 head(d[5],'#B45309');var mxv=d[6][0][1];
 d[6].forEach(function(r){var hl=hgt(r[0],12,590),w=Math.round(400*r[1]/mxv),bh=Math.max(18,f*0.95);s+=TW2(24,y,r[0],12,D,800,590,'start');y+=hl+4;s+=R(24,y,w,bh,OR,5)+tx(24+w+8,y+bh/2+f*0.35,num(r[1])+d[7],12,'#B45309',900,'start');y+=bh+12});
 var b=BOX(y,d[8],'#FFF3E0','#B45309',12.5);s+=b[0];y+=b[1]+10;var hn=hgt(d[9],11.5,580);s+=TW2(320,y,d[9],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 8. SGHAとSLA、SLAの実績表（2-1）。行：[指標, 目標, 今月の結果, 達成か] */
var SLA={
 ja:['SGHAで「何をするか」、SLAで「どこまでやるか」を決める',['SLA ― どこまでやるか','業務の水準（時間・正確さ・人員）、測り方、改善の手順。会社ごとに作り、実績を見て半年〜1年ごとに見直す'],['SGHA ― 何をするか','委託する業務の範囲、料金、責任・補償。IATAの標準様式（本文＋付属書A・B）'],'SLAの実績表（例）― 毎月、同じ形で見せる',[['カウンターの待ち時間','目標：90%のお客様が15分以内','今月 92% ― 達成',1],['最初の手荷物','目標：到着後15分以内','今月 88% ― 未達 → 是正計画',0],['ロードシートの確定','目標：出発の20分前まで','今月 100% ― 達成',1],['地上起因の遅延','目標：月3件以下','今月 5件 ― 未達 → 原因の分析',0]],'数字は例です。数字で約束すれば、会議の話し合いも感情ではなく数字でできます。'],
 ko:['SGHA로 「무엇을 할지」, SLA로 「어디까지 할지」를 정한다',['SLA — 어디까지 할지','업무 수준(시간·정확성·인원), 측정 방법, 개선 절차. 회사마다 만들고, 실적을 보고 반년~1년마다 재검토'],['SGHA — 무엇을 할지','위탁 업무 범위, 요금, 책임·배상. IATA 표준 양식(본문 + 부속서 A·B)'],'SLA 실적표(예) — 매달 같은 형식으로 보여 준다',[['카운터 대기 시간','목표: 승객의 90%가 15분 이내','이번 달 92% — 달성',1],['첫 수하물','목표: 도착 후 15분 이내','이번 달 88% — 미달 → 시정 계획',0],['로드시트 확정','목표: 출발 20분 전까지','이번 달 100% — 달성',1],['지상 원인 지연','목표: 월 3건 이하','이번 달 5건 — 미달 → 원인 분석',0]],'숫자는 예시입니다. 숫자로 약속하면 회의의 논의도 감정이 아니라 숫자로 할 수 있습니다.'],
 en:['The SGHA settles what is done; the SLA settles how well',['SLA: how well','Service standards (times, accuracy, staffing), how they are measured and how shortfalls are fixed. Written by each company and reviewed against results every six to twelve months'],['SGHA: what is done','Scope of services, charges, liability and indemnity. IATA standard form (main agreement plus Annexes A and B)'],'An SLA scorecard (example): show it in the same form every month',[['Check-in queue','Target: 90% of passengers within 15 min','This month 92%: met',1],['First bag','Target: within 15 min of arrival','This month 88%: missed, corrective plan',0],['Load sheet finalised','Target: by 20 min before departure','This month 100%: met',1],['Ground-caused delays','Target: 3 or fewer a month','This month 5: missed, cause analysis',0]],'The figures are examples. Promise in numbers and the meeting can be about numbers, not feelings.']};
function slaFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 [[d[1],BL,60,520],[d[2],NV,20,600]].forEach(function(b){var h1=hgt(b[0][0],13,b[3]-40),h2=hgt(b[0][1],11.5,b[3]-40),h=h1+h2+24;
  s+=R(b[2],y,b[3],h,b[1],10)+TW2(b[2]+b[3]/2,y+9,b[0][0],13,'#fff',900,b[3]-40)+TW2(b[2]+b[3]/2,y+13+h1,b[0][1],11.5,'#E6EEF7',700,b[3]-40);y+=h+4});
 y+=14;var hh=hgt(d[3],12.5,560)+14;s+=R(20,y,600,hh,TE,10)+TW2(320,y+7,d[3],12.5,'#fff',900,560);y+=hh+8;
 d[4].forEach(function(r){var c=r[3]?GN:RD,h1=hgt(r[0],12.5,530),h2=hgt(r[1],11.5,530),h3=hgt(r[2],12,530),h=h1+h2+h3+26,rr=Math.max(9,FS(12)*0.5);
  s+=R(20,y,600,h,'#fff',10,' stroke="#DCE3EA" stroke-width="1.5"')+'<circle cx="'+(40+rr*0.4)+'" cy="'+(y+h/2)+'" r="'+rr+'" fill="'+c+'"/>'
   +TW2(70,y+8,r[0],12.5,D,900,530,'start')+TW2(70,y+12+h1,r[1],11.5,G,700,530,'start')+TW2(70,y+16+h1+h2,r[2],12,r[3]?'#14633F':'#B42318',900,530,'start');y+=h+8});
 y+=4;var hn=hgt(d[5],11.5,580);s+=TW2(320,y,d[5],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 9. 品質審査の回し方：前回の指摘から始めて、次の点検で確かめる（2-2） */
var AUD={
 ja:['品質審査は「前回の指摘」から始まり、次の点検で確かめる',[['前回の指摘を確かめる','前回の問題が直っているかを最初に見る'],['工程の順に点検する','到着前 → 到着 → 搭載 → 出発'],['事実で所見を書く','時刻・人数・台数など、見たことを書く'],['措置を分ける','その場で直した／改善の勧告／是正措置'],['責任者と一緒に確かめる','指摘を一緒に読み、事実に違いがないかを確かめて確定する']],'次の点検では、また最初に戻って「直っているか」を見ます。','所見の書き方',['感想','「遅かった」'],['事実','「到着予定の15分前に器材がそろっていなかった（実際は5分前）」'],'点数を付けることが目的ではありません。前回の指摘が直ったかを確かめる道具です。'],
 ko:['품질심사는 「지난 지적」에서 시작해 다음 점검에서 확인한다',[['지난 지적을 확인한다','지난번 문제가 고쳐졌는지부터 본다'],['공정 순서로 점검한다','도착 전 → 도착 → 탑재 → 출발'],['사실로 소견을 쓴다','시각·인원·대수 등 본 것을 쓴다'],['조치를 구분한다','현장에서 고쳤다 / 개선 권고 / 시정조치'],['책임자와 함께 확인한다','지적을 함께 읽고 사실에 어긋남이 없는지 확인한 뒤 확정한다']],'다음 점검에서는 다시 처음으로 돌아가 「고쳐졌는지」를 봅니다.','소견 쓰는 법',['감상','「늦었다」'],['사실','「도착 예정 15분 전에 장비가 갖춰지지 않았다(실제는 5분 전)」'],'점수를 매기는 것이 목적이 아닙니다. 지난번 지적이 고쳐졌는지 확인하는 도구입니다.'],
 en:['An audit starts from the last findings and is confirmed at the next one',[['Check the previous findings','First see whether last time’s problems have been fixed'],['Check in process order','Before arrival, arrival, loading, departure'],['Write remarks as facts','Times, headcounts, equipment: what you actually saw'],['Classify the action','Fixed on the spot / recommendation / corrective action'],['Confirm with the manager','Read the findings together, check the facts and finalise them']],'At the next audit you return to the start and check whether things were fixed.','How to write a remark',['Impression','“Slow”'],['Fact','“Equipment not in position 15 minutes before arrival (it arrived 5 minutes before)”'],'The point is not to give a score. It is a tool for confirming that last time’s findings were fixed.']};
function audFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),mid=[],r0=Math.max(13,FS(12)*0.72);
 d[1].forEach(function(r,i){var h1=hgt(r[0],12.5,480),h2=hgt(r[1],11.5,480),h=h1+h2+22,c=i===0?OR:BL;
  s+=R(70,y,550,h,'#fff',10,' stroke="'+c+'" stroke-width="'+(i===0?2.5:1.5)+'"')+'<circle cx="'+(70+r0+10)+'" cy="'+(y+h/2)+'" r="'+r0+'" fill="'+c+'"/>'+tx(70+r0+10,y+h/2+FS(12)*0.35,String(i+1),12,'#fff',900)
   +TW2(70+r0*2+24,y+8,r[0],12.5,i===0?'#B45309':D,900,480-r0,'start')+TW2(70+r0*2+24,y+12+h1,r[1],11.5,G,700,480-r0,'start');mid.push(y+h/2);y+=h;
  if(i<d[1].length-1){s+=ARW(345,y+3,345,y+17,GY,3.5);y+=22}});
 var a=mid[0],b=mid[mid.length-1];
 s+='<path d="M70 '+b+' L40 '+b+' L40 '+a+' L60 '+a+'" fill="none" stroke="'+OR+'" stroke-width="3.5" stroke-dasharray="9 6" stroke-linejoin="round"><animate attributeName="stroke-dashoffset" values="30;0" keyTimes="0;1" dur="1.2s" repeatCount="indefinite"/></path><path d="M58 '+(a-7)+' L68 '+a+' L58 '+(a+7)+'" fill="none" stroke="'+OR+'" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
 y+=12;var hl=hgt(d[2],12,560);s+=TW2(320,y,d[2],12,'#B45309',900,560);y+=hl+16;
 var hh=hgt(d[3],12.5,560)+14;s+=R(20,y,600,hh,NV,10)+TW2(320,y+7,d[3],12.5,'#fff',900,560);y+=hh+8;
 [[d[4],'#FDECEC','#B42318','✕'],[d[5],'#E3F4EA','#14633F','○']].forEach(function(e){var t=e[3]+' '+e[0][0],h1=hgt(t,12,540),h2=hgt(e[0][1],12,540),h=h1+h2+22;
  s+=R(20,y,600,h,e[1],10)+TW2(36,y+8,t,12,e[2],900,540,'start')+TW2(36,y+12+h1,e[0][1],12,D,700,540,'start');y+=h+8});
 y+=4;var hn=hgt(d[6],11.5,580);s+=TW2(320,y,d[6],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 10. 是正措置を追いかける：3か月で閉じる指摘と、繰り返す指摘（2-3）。状態：f=見つかった p=対策中 c=完了 n=未完了 a=同じ指摘 */
var CAPA={
 ja:['是正措置は、閉じるまで追いかける（例）',['4月の会議','5月の会議','6月の会議'],[['最初の手荷物が15分を超える',[['見つかった','f'],['対策を実行中','p'],['完了','c']],1,'原因（人の配置）を直し、3か月で閉じた'],['到着前に器材がそろっていない',[['見つかった','f'],['対策が未完了','n'],['同じ指摘','a']],0,'同じ指摘が3か月続いた ＝ 会議が機能していない']],'対策には担当と期限を付け、次の会議の最初の議題で「前回の約束」を確かめます。','同じ是正の繰り返しは、多くの会社で支店側の減点にもなります。'],
 ko:['시정조치는 닫힐 때까지 따라간다(예)',['4월 회의','5월 회의','6월 회의'],[['첫 수하물이 15분을 넘는다',[['발견','f'],['대책 실행 중','p'],['종결','c']],1,'원인(인원 배치)을 고쳐 석 달 만에 닫았다'],['도착 전에 장비가 갖춰지지 않는다',[['발견','f'],['대책 미완료','n'],['같은 지적','a']],0,'같은 지적이 석 달 이어졌다 = 회의가 작동하지 않는다']],'대책에는 담당과 기한을 붙이고, 다음 회의의 첫 안건으로 「지난 약속」을 확인합니다.','같은 시정조치의 반복은 많은 회사에서 지점 쪽 감점도 됩니다.'],
 en:['Follow each corrective action until it is closed (example)',['April meeting','May meeting','June meeting'],[['First bag takes more than 15 minutes',[['Found','f'],['Action under way','p'],['Closed','c']],1,'The cause (staff allocation) was fixed and it closed in three months'],['Equipment not in position before arrival',[['Found','f'],['Action not done','n'],['Found again','a']],0,'The same finding for three months means the meeting is not working']],'Give every action an owner and a deadline, and open the next meeting by checking last time’s promises.','At many airlines a repeated corrective action also costs the station points.']};
function capaFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),xs=[28,224,420],pw=184,ST={f:['#E4F0FB','#1B5FA6'],p:['#FFF3E0','#B45309'],c:['#1F8A5B','#fff'],n:['#FFF3E0','#B45309'],a:['#D0453E','#fff']};
 var hm=0;d[1].forEach(function(m){hm=Math.max(hm,hgt(m,11.5,pw-10))});d[1].forEach(function(m,i){s+=TW2(xs[i]+pw/2,y,m,11.5,G,800,pw-10)});y+=hm+8;
 d[2].forEach(function(r){var c=r[2]?GN:RD,y0=y,yy=y+10,inner='',h1=hgt(r[0],12.5,560);inner+=TW2(36,yy,r[0],12.5,D,900,560,'start');yy+=h1+8;
  var hp=0;r[1].forEach(function(p){hp=Math.max(hp,hgt(p[0],11.5,pw-16)+12)});
  r[1].forEach(function(p,i){var k=ST[p[1]];inner+=R(xs[i],yy,pw,hp,k[0],hp/2>16?14:hp/2)+TW2(xs[i]+pw/2,yy+(hp-hgt(p[0],11.5,pw-16))/2,p[0],11.5,k[1],900,pw-16)+(i<2?'<path d="M'+(xs[i]+pw+2)+' '+(yy+hp/2)+' L'+(xs[i+1]-2)+' '+(yy+hp/2)+'" stroke="#9AA9B8" stroke-width="3"/>':'')});yy+=hp+8;
  var h3=hgt(r[3],11.5,560);inner+=TW2(36,yy,r[3],11.5,r[2]?'#14633F':'#B42318',800,560,'start');yy+=h3+12;
  s+=R(20,y0,600,yy-y0,'#fff',10,' stroke="'+c+'" stroke-width="2"')+inner;y=yy+10});
 var b=BOX(y,d[3],'#EEF4FA',NV,12.5);s+=b[0];y+=b[1]+10;var hn=hgt(d[4],11.5,580);s+=TW2(320,y,d[4],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 11. 総括の立ち位置：ハンドリング会社・本社・支店の社員との窓口（2-4） */
var TEAM={
 ja:['総括は、3つの相手をつなぐ1つの窓口',['総括 ― 窓口は一本','相手ごとに、伝えることと受け取ることがある'],[['ハンドリング会社','自社の基準を伝え、できる方法を一緒に探す','現場の困りごと（人員・器材）を聞く',TE],['本社','現場の事情を数字と事実で伝える','必要な支援（人員・予算・規定の解釈）を受ける',BL],['支店の社員','ハンドリング会社への指摘は総括を通すルールにする','現場で見たことを総括に集める','#7A5CC7']],['総括から','総括へ'],'よい支店のハンドリング会社は「あの航空会社の便は気持ちよく働ける」と言います。その評判が、イレギュラーの夜に効きます。'],
 ko:['총괄은 세 상대를 잇는 하나의 창구',['총괄 — 창구는 하나','상대마다 전하는 것과 받는 것이 있다'],[['조업사','자사 기준을 전하고, 되는 방법을 함께 찾는다','현장의 어려움(인력·장비)을 듣는다',TE],['본사','현장 사정을 숫자와 사실로 전한다','필요한 지원(인력·예산·규정 해석)을 받는다',BL],['지점 직원','조업사에 대한 지적은 총괄을 거치는 규칙으로 한다','현장에서 본 것을 총괄에게 모은다','#7A5CC7']],['총괄이','총괄에게'],'좋은 지점의 조업사는 「그 항공사 편은 기분 좋게 일할 수 있다」고 말합니다. 그 평판이 비정상의 밤에 힘을 발휘합니다.'],
 en:['The duty manager is the single point of contact for three partners',['Duty manager: one point of contact','With each partner there is something to give and something to take'],[['The handler','Explain the airline’s standards and look together for ways to make things work','Hear the floor’s problems (staffing, equipment)',TE],['Head office','Explain local realities in facts and numbers','Receive the support needed (people, budget, rule interpretations)',BL],['Station staff','Make it a rule that findings for the handler go through the duty manager','Bring what they see on the floor to the duty manager','#7A5CC7']],['Gives','Takes'],'At a good station the handler says “that airline’s flights are a pleasure to work”. That reputation pays off on the night things go wrong.']};
function teamFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 var h1=hgt(d[1][0],13.5,560),h2=hgt(d[1][1],11.5,560),hc=h1+h2+24;s+=R(20,y,600,hc,NV,12)+TW2(320,y+9,d[1][0],13.5,'#fff',900,560)+TW2(320,y+13+h1,d[1][1],11.5,'#DCE7F2',700,560);var top=y+hc;y+=hc+16;
 var tw=Math.max(H.TW(d[3][0],11)+18,H.TW(d[3][1],11)+18),lines='',cards='',last=top;
 d[2].forEach(function(r){var c=r[3],hn=hgt(r[0],13,480)+14,y0=y,yy=y+hn+10,tx0=84+tw+10,mw=620-tx0-16;
  var inner=R(70,y,550,hn,c,10)+TW2(86,y+7,r[0],13,'#fff',900,480,'start');
  [[d[3][0],r[1],c,'#fff'],[d[3][1],r[2],'#EEF2F6',D]].forEach(function(v){var hv=Math.max(hgt(v[1],11.5,mw),FS(11)*1.5);
   inner+=R(84,yy+(hv-FS(11)*1.5)/2,tw,FS(11)*1.5,v[2],FS(11)*0.75)+tx(84+tw/2,yy+hv/2+FS(11)*0.35,v[0],11,v[3],900)+TW2(tx0,yy+(hv-hgt(v[1],11.5,mw))/2,v[1],11.5,D,700,mw,'start');yy+=hv+8});
  yy+=4;cards+=R(70,y0,550,yy-y0,'#fff',10,' stroke="'+c+'" stroke-width="2"')+inner;last=y0+hn/2;lines+='<line x1="42" y1="'+last+'" x2="70" y2="'+last+'" stroke="#C8D3DE" stroke-width="3"/>';y=yy+12});
 s+='<line x1="42" y1="'+top+'" x2="42" y2="'+last+'" stroke="#C8D3DE" stroke-width="3" stroke-linecap="round"/>'+lines+cards;
 var b=BOX(y,d[4],'#E3F4EA','#14633F',12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 12. 総括の1日と、5分のブリーフィング（3-1） */
var DAY={
 ja:['総括の1日と、5分のブリーフィング（例）',[['前日','予約・特別なお客様・変更の確認'],['出勤','運航情報・天候・人員の確認'],['ブリーフィング','カウンターオープンの前'],['便の監督','カウンター・ゲート・ランプを回る'],['振り返り','締めと記録・報告']],'5分のブリーフィング ― 毎日同じ順番で話す',['今日の便と人員','注意する便','昨日の振り返り（良かったこと1つ、直すこと1つ）','安全の一言','質問'],'分','便が出る前の10分が、その日の品質を決めます。時間は目安です。'],
 ko:['총괄의 하루와 5분 브리핑(예)',[['전날','예약·특별 승객·변경 확인'],['출근','운항 정보·기상·인원 확인'],['브리핑','카운터 오픈 전'],['편 감독','카운터·게이트·램프를 돈다'],['디브리핑','마감과 기록·보고']],'5분 브리핑 — 매일 같은 순서로 말한다',['오늘의 편과 인원','주의할 편','어제 되돌아보기(잘된 것 하나, 고칠 것 하나)','안전 한마디','질문'],'분','편이 뜨기 전 10분이 그날의 품질을 정합니다. 시간은 기준입니다.'],
 en:['A duty manager’s day and the five-minute briefing (example)',[['The day before','Bookings, special passengers, changes'],['Arriving','Operational info, weather, staffing'],['Briefing','Before the counter opens'],['Supervising','Counter, gate and ramp rounds'],['Debrief','Closing, records, reports']],'The five-minute briefing: the same order every day',['Today’s flights and staff','Flights to watch','Yesterday: one thing that went well, one to fix','A safety point','Questions'],' min','The ten minutes before a flight leaves set the quality of the day. Timings are a guide.']};
function dayFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),dur=10,r0=Math.max(12,FS(12)*0.7),top=y,mids=[],body='';
 d[1].forEach(function(r,i){var on=i===2,h1=hgt(r[0],12.5,490),h2=hgt(r[1],11.5,490),h=h1+h2+20;
  body+=R(86,y,534,h,on?'#FFF3E0':'#fff',10,' stroke="'+(on?OR:'#C8D3DE')+'" stroke-width="'+(on?2.5:1.5)+'"')+TW2(102,y+7,r[0],12.5,on?'#B45309':D,900,490,'start')+TW2(102,y+11+h1,r[1],11.5,G,700,490,'start');mids.push(y+h/2);y+=h+8});
 s+='<line x1="48" y1="'+mids[0]+'" x2="48" y2="'+mids[4]+'" stroke="#C8D3DE" stroke-width="4"/>';
 mids.forEach(function(m,i){s+='<circle cx="48" cy="'+m+'" r="'+r0+'" fill="'+(i===2?OR:BL)+'"/>'+tx(48,m+FS(12)*0.35,String(i+1),12,'#fff',900)+'<line x1="'+(48+r0)+'" y1="'+m+'" x2="86" y2="'+m+'" stroke="#C8D3DE" stroke-width="3"/>'});
 s+=body;y+=8;var hh=hgt(d[2],12.5,560)+14;s+=R(20,y,600,hh,OR,10)+TW2(320,y+7,d[2],12.5,'#fff',900,560);y+=hh+10;
 var bw=116,gh=Math.max(34,FS(14)*1.8);
 for(var i=0;i<5;i++){var x=20+i*121,a=(i*0.18).toFixed(2),b=(i*0.18+0.02).toFixed(2),c=(i*0.18+0.16).toFixed(2),e=(i*0.18+0.18).toFixed(2);
  s+=R(x,y,bw,gh,'#FFE7C7',8)+'<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+gh+'" rx="8" fill="'+OR+'" opacity="0"><animate attributeName="opacity" values="'+(i?'0;0;1;1;0;0':'1;1;0;0')+'" keyTimes="'+(i?'0;'+a+';'+b+';'+c+';'+e+';1':'0;'+c+';'+e+';1')+'" dur="'+dur+'s" repeatCount="indefinite"/></rect>'+tx(x+bw/2,y+gh/2+FS(14)*0.35,String(i+1),14,'#7A3E0A',900)}
 y+=gh+10;
 d[3].forEach(function(t,i){var lab=(i+1)+'  '+t,h=hgt(lab,12,570);s+=TW2(28,y,lab,12,D,800,570,'start');y+=h+6});
 y+=6;var b2=BOX(y,d[5],'#EEF4FA',NV,12);s+=b2[0];y+=b2[1]+16;return svg(y,s)}}

/* 13. 判断の優先順位（3-2） */
var PRIO={
 ja:['迷ったときの順番を、先に決めておく',[['安全','運航と人の安全'],['保安','手荷物と旅客の一致など'],['規定と法令','当局・会社の規定'],['お客様の保護','案内・配慮・補償'],['定時性','遅らせない工夫'],['費用','最後に考える']],['定時のために、安全を削らない（1は5より先）','お客様の求めでも、規定は曲げない（3は4より先）'],'上の段が下の段より先です。ただし、規定の範囲でできることはすべて行います。'],
 ko:['망설일 때의 순서를 먼저 정해 둔다',[['안전','운항과 사람의 안전'],['보안','승객·수하물 일치 등'],['규정과 법령','당국·회사 규정'],['승객 보호','안내·배려·보상'],['정시성','늦추지 않는 노력'],['비용','마지막에 생각한다']],['정시를 위해 안전을 깎지 않는다(1이 5보다 먼저)','승객 요청이라도 규정은 굽히지 않는다(3이 4보다 먼저)'],'위 단계가 아래 단계보다 먼저입니다. 다만 규정 범위에서 할 수 있는 것은 모두 합니다.'],
 en:['Decide the order in advance, for the moments you are unsure',[['Safety','Of the flight and people'],['Security','Passenger–bag reconciliation and more'],['Rules and law','Authority and company rules'],['Passenger care','Information, assistance, compensation'],['Punctuality','Keeping delays out'],['Cost','Considered last']],['Never trade safety for punctuality (1 comes before 5)','Rules are not bent even at a passenger’s request (3 comes before 4)'],'Higher steps come before lower ones. But do everything the rules allow.']};
function prioFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),cs=['#D0453E','#E0672F',OR,'#2F8FE0','#5B8DB8','#9AA9B8'],r0=Math.max(13,FS(13)*0.72);
 d[1].forEach(function(r,i){var x=20+i*22,w=600-i*22,tw=w-r0*2-44,h1=hgt(r[0],13,tw),h2=hgt(r[1],11.5,tw),h=h1+h2+20;
  s+=R(x,y,w,h,'#fff',10,' stroke="'+cs[i]+'" stroke-width="2"')+R(x,y,10,h,cs[i],5)+'<circle cx="'+(x+r0+20)+'" cy="'+(y+h/2)+'" r="'+r0+'" fill="'+cs[i]+'"/>'+tx(x+r0+20,y+h/2+FS(13)*0.35,String(i+1),13,'#fff',900)
   +TW2(x+r0*2+32,y+7,r[0],13,D,900,tw,'start')+TW2(x+r0*2+32,y+11+h1,r[1],11.5,G,700,tw,'start');y+=h+6});
 y+=8;d[2].forEach(function(t){var b=BOX(y,t,'#FDECEC','#B42318',12);s+=b[0];y+=b[1]+6});
 y+=4;var hn=hgt(d[3],11.5,580);s+=TW2(320,y,d[3],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 14. イレギュラーのとき：4つの仕事を同時に回す（3-3） */
var IRR={
 ja:['イレギュラーのとき、4つの仕事を同時に回す','最初の5分で「誰が何をするか」を決め、声に出して伝える',[['決める','本社・運航管理と、新しい出発時刻・欠航・代替の手段を決める',RD],['知らせる','お客様、ハンドリング会社、空港会社、旅行会社へ',BL],['届け出る','スケジュール調整の窓口・航空当局へ（手順は国・空港ごと）',TE],['手配する','食事の券・ホテル・バス、他社便の座席、人員の追加','#7A5CC7']],'4本の線が同時に進みます。1つずつ順番に片づけるのではありません。','総括は現場に立ち、声を出し、判断を記録します。'],
 ko:['비정상 때는 네 가지 일을 동시에 돌린다','처음 5분 안에 「누가 무엇을 할지」 정해 소리 내어 말한다',[['결정','본사·운항관리와 새 출발 시각·결항·대체 수단을 정한다',RD],['안내','승객, 조업사, 공항공사, 여행사에게',BL],['신고','스케줄 조정 창구·항공당국에(절차는 나라·공항마다)',TE],['수배','식사 쿠폰·호텔·버스, 타사편 좌석, 인원 추가','#7A5CC7']],'네 개의 선이 동시에 나아갑니다. 하나씩 차례로 끝내는 것이 아닙니다.','총괄은 현장에 서고, 목소리를 내고, 판단을 기록합니다.'],
 en:['In an irregularity, four jobs run at once','In the first five minutes decide who does what, and say it out loud',[['Decide','With head office and operations control: new time, cancellation or alternative',RD],['Inform','Passengers, the handler, the airport company, travel agencies',BL],['Notify','Slot coordination and the aviation authority (procedure differs by country and airport)',TE],['Arrange','Meal vouchers, hotels, buses, seats on other airlines, extra staff','#7A5CC7']],'The four lines move together. They are not finished one after another.','The duty manager stands on the floor, speaks up and records every decision.']};
function irrFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),dur=6;
 var b0=BOX(y,d[1],NV,'#fff',12.5);s+=b0[0];y+=b0[1]+6;s+=ARW(320,y,320,y+18,GY,3.5);y+=26;
 d[2].forEach(function(r){var c=r[2],h1=hgt(r[0],13,560),h2=hgt(r[1],11.5,560),h=h1+h2+38;
  s+=R(20,y,600,h,'#fff',10,' stroke="'+c+'" stroke-width="2"')+R(20,y,10,h,c,5)+TW2(42,y+8,r[0],13,c,900,560,'start')+TW2(42,y+12+h1,r[1],11.5,D,700,560,'start')
   +R(42,y+h-18,560,8,'#E6ECF2',4)+'<rect x="42" y="'+(y+h-18)+'" width="0" height="8" rx="4" fill="'+c+'"><animate attributeName="width" values="0;560;560" keyTimes="0;0.85;1" dur="'+dur+'s" repeatCount="indefinite"/></rect>';y+=h+8});
 y+=4;var ht=hgt(d[3],12,580);s+=TW2(320,y,d[3],12,'#B45309',900,580);y+=ht+10;
 var b=BOX(y,d[4],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 15. 経緯報告書：早い第一報と、5つの部分（3-4） */
var REP={
 ja:['経緯報告書 ― 早い第一報と、5つの部分',[['第一報','当日のうちに。遅い完璧より、早い第一報'],['詳しい報告','あとから。事実と数字で']],[['概要','1〜2行で',''],['時系列','時刻と事実','事実だけを書く'],['対応','何をしたか',''],['原因','直接と背景','意見はここに分けて書く'],['再発の防止','誰が何をいつまでに','']],'数字で書きます：遅延の分、対象のお客様の数、費用の見込み。','報告は本社への義務であり、支店の努力を知らせる機会でもあります。'],
 ko:['경위서 — 빠른 1차 보고와 다섯 부분',[['1차 보고','당일 안에. 늦은 완벽보다 빠른 1차 보고'],['자세한 보고','나중에. 사실과 숫자로']],[['개요','1~2줄로',''],['시간순 경과','시각과 사실','사실만 쓴다'],['조치','무엇을 했나',''],['원인','직접 원인과 배경','의견은 여기에 나눠 쓴다'],['재발 방지','누가 무엇을 언제까지','']],'숫자로 씁니다: 지연 분, 대상 승객 수, 비용 예상.','보고는 본사에 대한 의무이자 지점의 노력을 알리는 기회입니다.'],
 en:['The incident report: a fast first report, and five parts',[['First report','The same day. A fast first report beats a late perfect one'],['Full report','Later, in facts and numbers']],[['Summary','One or two lines',''],['Timeline','Times and facts','Facts only'],['Actions','What was done',''],['Cause','Direct and underlying','Opinions go here, kept separate'],['Prevention','Who, what, by when','']],'Write in numbers: minutes of delay, passengers affected, expected cost.','A report is a duty to head office and a chance to show what the station did.']};
function repFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),nar=H.NARROW(),cw=nar?600:292,ymax=y;
 d[1].forEach(function(r,i){var x=nar?20:(i?328:20),yy=nar?ymax:y,c=i?BL:OR,h1=hgt(r[0],13,cw-30),h2=hgt(r[1],11.5,cw-30),h=h1+h2+22;
  s+=R(x,yy,cw,h,c,10)+TW2(x+cw/2,yy+8,r[0],13,'#fff',900,cw-30)+TW2(x+cw/2,yy+12+h1,r[1],11.5,'#fff',700,cw-30);
  if(!nar&&i===0)s+=ARW(314,yy+h/2,326,yy+h/2,GY,3);ymax=Math.max(ymax,yy+h+(nar?8:0))});
 y=ymax+(nar?8:16);
 var x0=60,w=520,top=y;y+=12;var inner='';
 d[2].forEach(function(r,i){var tag=r[2],h1=hgt(r[0],12.5,w-48),h2=hgt(r[1],11.5,w-48),ht=tag?hgt(tag,11,w-64)+10:0,h=h1+h2+ht+(tag?26:18);
  inner+=R(x0+14,y,w-28,h,i%2?'#F4F7FB':'#EAF1F8',6)+TW2(x0+26,y+6,r[0],12.5,D,900,w-48,'start')+TW2(x0+26,y+10+h1,r[1],11.5,G,700,w-48,'start')
   +(tag?R(x0+26,y+14+h1+h2,w-52,ht,i===1?'#E3F4EA':'#FFF3E0',6)+TW2(x0+34,y+19+h1+h2,tag,11,i===1?'#14633F':'#B45309',900,w-64,'start'):'');y+=h+6});
 y+=8;s+=R(x0,top,w,y-top,'#fff',8,' stroke="#9AA9B8" stroke-width="2"')+inner;y+=12;
 var b=BOX(y,d[3],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+10;var hn=hgt(d[4],11.5,580);s+=TW2(320,y,d[4],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

/* 16. 独り立ちまでの5つの段階：先輩の関わりが減り、本人の判断が増える（3-5）。数字は先輩の割合（目安） */
var GROW={
 ja:['独り立ちまでの段階 ― 先輩の関わりが減り、本人の判断が増える（例）',[['見る','先輩の判断を横で見て、理由を聞く',90],['一緒にやる','小さな判断から、先輩と一緒に決める',65],['任せて見守る','本人が決め、先輩はそばで見ている',35],['任せる','一人で担当し、あとで振り返る',12],['教える側に','次の人に教えることで、自分の理解を確かめる',0]],['先輩の関わり','本人の判断'],'段階を飛ばさず、段階ごとに「何ができたら次へ進むか」を本人と共有します。','帯の長さは考え方を示す目安です。'],
 ko:['독립 근무까지의 단계 — 선배의 관여가 줄고 본인의 판단이 늘어난다(예)',[['본다','선배의 판단을 옆에서 보고 이유를 묻는다',90],['함께 한다','작은 판단부터 선배와 함께 정한다',65],['맡기고 지켜본다','본인이 정하고 선배는 곁에서 본다',35],['맡긴다','혼자 담당하고 나중에 되돌아본다',12],['가르치는 쪽으로','다음 사람을 가르치며 자신의 이해를 확인한다',0]],['선배의 관여','본인의 판단'],'단계를 건너뛰지 말고, 단계마다 「무엇을 할 수 있으면 다음으로 가는지」를 본인과 공유합니다.','띠의 길이는 개념을 보여 주는 기준입니다.'],
 en:['Steps to working alone: the senior steps back as the trainee decides more (example)',[['Watch','Observe a senior’s decisions and ask why',90],['Do it together','Make small decisions jointly with a senior',65],['Lead with support','They decide; the senior stays close by',35],['Take charge','Handle it alone and review afterwards',12],['Teach','Check their own understanding by teaching the next person',0]],['Senior’s involvement','Trainee’s own decisions'],'Do not skip steps, and agree at each one what must be mastered before moving on.','Bar lengths are only a guide to the idea.']};
function growFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),r0=Math.max(13,FS(12)*0.72);
 [GY,BL].forEach(function(c,i){var g=LEG(y,d[2][i],c);s+=g[0];y+=g[1]});y+=6;
 d[1].forEach(function(r,i){var h1=hgt(r[0],12.5,510),h2=hgt(r[1],11.5,510),h=h1+h2+40,bw=536,sw=Math.round(bw*r[2]/100);
  s+=R(20,y,600,h,'#fff',10,' stroke="#DCE3EA" stroke-width="1.5"')+'<circle cx="'+(34+r0)+'" cy="'+(y+10+r0)+'" r="'+r0+'" fill="'+BL+'"/>'+tx(34+r0,y+10+r0+FS(12)*0.35,String(i+1),12,'#fff',900)
   +TW2(46+r0*2,y+8,r[0],12.5,D,900,510-r0,'start')+TW2(46+r0*2,y+12+h1,r[1],11.5,G,700,510-r0,'start')
   +R(52,y+h-22,bw,12,BL,6)+(sw>0?R(52,y+h-22,sw,12,GY,6)+(sw<bw?R(52+sw-6,y+h-22,6,12,GY,0):''):'');y+=h+6});
 y+=6;var b=BOX(y,d[3],'#EEF4FA',NV,12);s+=b[0];y+=b[1]+10;var hn=hgt(d[4],11.5,580);s+=TW2(320,y,d[4],11.5,G,700,580);y+=hn+16;return svg(y,s)}}

window.FIGS=window.FIGS||{};
window.FIGS.stn_eval=H.FIX2(evalFig(EVAL));window.FIGS.stn_otp=H.FIX2(otpFig(OTP));window.FIGS.stn_delay=H.FIX2(delayFig(DLY));
window.FIGS.stn_crit=H.FIX2(critFig(CRIT));window.FIGS.stn_ratio=H.FIX2(ratioFig(RATIO));window.FIGS.stn_spi=H.FIX2(spiFig(SPI));window.FIGS.stn_self=H.FIX2(selfFig(SELF));
window.FIGS.stn_sla=H.FIX2(slaFig(SLA));window.FIGS.stn_audit=H.FIX2(audFig(AUD));window.FIGS.stn_capa=H.FIX2(capaFig(CAPA));window.FIGS.stn_team=H.FIX2(teamFig(TEAM));
window.FIGS.stn_day=H.FIX2(dayFig(DAY));window.FIGS.stn_prio=H.FIX2(prioFig(PRIO));window.FIGS.stn_irr=H.FIX2(irrFig(IRR));window.FIGS.stn_report=H.FIX2(repFig(REP));window.FIGS.stn_grow=H.FIX2(growFig(GROW));
})();
