/* 空港支店の運営の実務（STN）Part 5 の図（2026.10）— figs_stn.js の後に読み込み、window.FIGH の部品を使う
   作成ルール：00_그림작성규칙.md（文字は画面で11px以上＝FIX2、文は TW2（折り返し）、高さは行数で計算、縦に積む配置）
   例はすべて考え方を示すための架空のもの */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,FS=H.FS,LI=H.LINES,setK=H.setK,ARW=H.ARW;
var D=H.C.D,G=H.C.G,BL='#2F8FE0',TE='#1F7A6E',OR='#E08A2F',RD='#D0453E',GN='#1F8A5B',NV='#0f3558',GY='#9AA9B8';
function svg(h,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+Math.ceil(h)+'" role="img">'+R(0,0,640,Math.ceil(h),'#F7FAFD')+body+'</svg>'}
function hgt(s,sz,w){return LI(s,sz,w).length*FS(sz)*1.3}
function TW2(x,top,s,sz,c,w,maxw,a){var n=LI(s,sz,maxw).length,lh=FS(sz)*1.3;return WR(x,top+FS(sz)*0.95+(n-1)*lh/2,s,sz,c,w,maxw,a)}
function ttlH(s){return Math.max(58,30+hgt(s,15,600)+14)}
/* 色つきの説明の箱。戻り値は [図, 高さ] */
function BOX(y,s,bg,c,sz){sz=sz||12;var h=hgt(s,sz,560)+18;return [R(20,y,600,h,bg,10)+TW2(320,y+9,s,sz,c,900,560),h]}
/* 左に色の帯がある札。戻り値は [図, 高さ] */
function CARD(x,y,w,head,text,c,fill){var h1=hgt(head,12.5,w-36),h2=text?hgt(text,11.5,w-36):0,h=h1+h2+(text?22:18);
 return [R(x,y,w,h,fill||'#fff',10,' stroke="'+c+'" stroke-width="2"')+R(x,y,8,h,c,4)+TW2(x+22,y+8,head,12.5,c,900,w-36,'start')+(text?TW2(x+22,y+12+h1,text,11.5,D,700,w-36,'start'):''),h]}
/* 矢印つきの1行。dir：1=下向き、-1=上向き。戻り値は [図, 高さ] */
function FLOW(y,t,dir,c){var h=Math.max(hgt(t,11.5,440),26),ax=122;
 return [(dir>=0?ARW(ax,y+2,ax,y+h-2,c||GY,3.5):ARW(ax,y+h-2,ax,y+2,c||GY,3.5))+TW2(164,y+(h-hgt(t,11.5,440))/2,t,11.5,D,800,440,'start'),h]}

/* 1. 3つのきまりの間に立つ支店（5-1）
   [題, 本社の札, 支店の帯, 現地の札2枚, 下向きの矢印の文, 上向きの矢印の文, 注意の箱] */
var RULES={
 ja:['海外の支店は、3つのきまりが重なる場所に立つ',['本社の規程','運送のマニュアルと本社の指示。どの空港でも同じ品質を求める',NV],['支店 ― 3つを同時に満たすやり方を探す','満たせないときは、案をつけて本社に早く上げる'],[['日本の法令と空港のルール','航空法・出入国・税関・検疫・個人情報の保護など。空港会社ごとの規則と告知',RD],['ハンドリング会社との契約','作業の範囲・料金・人数。長く続いてきた現場の慣行',TE]],'規程・指示（韓国語・英語）','守るべき条件・できることの範囲（日本語）','3つがぶつかったら、法令が先。そのうえで本社と相談し、決めたことを書面に残す。'],
 ko:['해외 지점은 세 가지 규칙이 겹치는 곳에 있다',['본사 규정','운송 매뉴얼과 본사 지시. 어느 공항에서나 같은 품질을 요구한다',NV],['지점 — 세 가지를 동시에 충족하는 방법을 찾는다','충족할 수 없으면 대안을 붙여 본사에 빨리 올린다'],[['일본 법령과 공항 규칙','항공법·출입국·세관·검역·개인정보 보호 등. 공항 회사별 규칙과 공지',RD],['조업사와의 계약','작업 범위·요금·인원. 오래 이어져 온 현장의 관행',TE]],'규정·지시(한국어·영어)','지켜야 할 조건·할 수 있는 범위(일본어)','세 가지가 충돌하면 법령이 우선이다. 이어 본사와 상의하고, 결정을 문서로 남긴다.'],
 en:['An overseas station stands where three sets of rules overlap',['Head-office rules','The passenger manual and head-office instructions. The same quality at every airport',NV],['The station finds a way to meet all three','When it cannot, it escalates to head office early, with options'],[['Japanese law and airport rules','Aviation, immigration, customs, quarantine, data protection and more. Each airport company’s rules and notices',RD],['The handling contract','Scope of work, fees, staffing. Long-standing local practice',TE]],'Rules and instructions (Korean, English)','Conditions to meet, limits of what is possible (Japanese)','When the three conflict, the law comes first. Then consult head office and put the decision in writing.']};
function rulesFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),x0=70,w=550;
 var c1=CARD(x0,y,w,d[1][0],d[1][1],d[1][2]);s+=c1[0];y+=c1[1]+6;
 var f1=FLOW(y,d[4],1,NV);s+='<g>'+f1[0]+'<animate attributeName="opacity" values="1;0.35;1" keyTimes="0;0.5;1" dur="2.4s" repeatCount="indefinite"/></g>';y+=f1[1]+6;
 /* 支店の帯（青地に白） */
 var h1=hgt(d[2][0],13,540),h2=hgt(d[2][1],11.5,540),hb=h1+h2+24;
 s+=R(20,y,600,hb,BL,12)+TW2(320,y+9,d[2][0],13,'#fff',900,540)+TW2(320,y+15+h1,d[2][1],11.5,'#fff',700,540);y+=hb+6;
 var f2=FLOW(y,d[5],-1,RD);s+='<g>'+f2[0]+'<animate attributeName="opacity" values="1;0.35;1" keyTimes="0;0.5;1" dur="2.4s" begin="1.2s" repeatCount="indefinite"/></g>';y+=f2[1]+6;
 var top=y,mids=[];d[3].forEach(function(t,i){var c=CARD(x0,y,w,t[0],t[1],t[2]);s+=c[0];mids.push(y+c[1]/2);y+=c[1];if(i===0)y+=8});
 /* 下の2枚は「現地」としてひとまとまり（左の括弧） */
 s+='<path d="M'+(x0-6)+' '+mids[0]+' L46 '+mids[0]+' L46 '+mids[1]+' L'+(x0-6)+' '+mids[1]+' M46 '+((mids[0]+mids[1])/2)+' L30 '+((mids[0]+mids[1])/2)+' L30 '+(top-12)+'" fill="none" stroke="'+GY+'" stroke-width="3" stroke-linejoin="round"/>';
 y+=14;var b=BOX(y,d[6],'#FDECEC','#B42318',12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

/* 2. 本社の指示と現地のきまりが違うとき ― 判断の順番（5-3）
   [題, 段（[見出し, 説明, 色]）, 段の間の矢印の文, 下の箱] */
var GAP={
 ja:['本社の指示と現地のきまりが違うとき ― 判断の順番',[['事実を確かめる','どの指示のどの部分か。どの法令・規則・契約のどの条文か。訳ではなく原文で確かめる',BL],['法令や当局の指示とぶつかる？','はい → 法令に従う。すぐに本社へ報告し、指示の見直しを求める',RD],['空港のルールや契約とぶつかる？','はい → 空港会社・ハンドリング会社と調整できるかを探り、案をつけて本社に判断を求める',OR],['現地の慣行だけが違う？','はい → 本社の指示に合わせ、現場に理由を説明して教える。良い慣行なら規程の改訂を提案する',TE],['決めたことを書面に残す','誰が・いつ・何を決めたか。支店の手順と教育の記録に反映する',GN]],['','いいえ','いいえ',''],'黙って本社の指示を変えない。黙って法令に反しない。どちらの「黙って」も支店は信頼を失う。'],
 ko:['본사 지시와 현지 규칙이 다를 때 — 판단 순서',[['사실을 확인한다','어느 지시의 어느 부분인가. 어느 법령·규칙·계약의 어느 조항인가. 번역이 아니라 원문으로 확인한다',BL],['법령이나 당국 지시와 충돌하나?','예 → 법령을 따른다. 바로 본사에 보고하고 지시 재검토를 요청한다',RD],['공항 규칙이나 계약과 충돌하나?','예 → 공항 회사·조업사와 조정할 수 있는지 알아보고, 대안을 붙여 본사에 판단을 요청한다',OR],['현지 관행만 다른가?','예 → 본사 지시에 맞추고, 현장에 이유를 설명해 교육한다. 좋은 관행이면 규정 개정을 제안한다',TE],['정한 것을 문서로 남긴다','누가·언제·무엇을 정했나. 지점 절차와 교육 기록에 반영한다',GN]],['','아니요','아니요',''],'본사 지시를 말없이 바꾸지 않는다. 말없이 법령을 어기지 않는다. 어느 쪽의 「말없이」든 지점은 신뢰를 잃는다.'],
 en:['When a head-office instruction and local rules differ: the decision steps',[['Check the facts','Which instruction, which part? Which law, rule or contract clause? Check the original, not a translation',BL],['Does it conflict with the law or the authorities?','Yes → follow the law. Report to head office at once and ask for the instruction to be reviewed',RD],['Does it conflict with airport rules or the contract?','Yes → see whether the airport company or handler can adjust, then ask head office to decide, with options',OR],['Is it only local habit that differs?','Yes → follow head office, explain the reason to staff and train them. If the local way is better, propose a manual change',TE],['Put the decision in writing','Who decided what, and when. Reflect it in station procedures and training records',GN]],['','No','No',''],'Never quietly change a head-office instruction. Never quietly break the law. Either kind of “quietly” costs the station its trust.']};
function gapFig(D2){return function(l){setK(1);var d=D2[l]||D2.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),r0=Math.max(13,FS(12)*0.72),n=d[1].length;
 d[1].forEach(function(r,i){var c=r[2],h1=hgt(r[0],12.5,480),h2=hgt(r[1],11.5,480),h=h1+h2+22,cx=70+r0+10,cy=y+h/2;
  s+=R(70,y,550,h,'#fff',10,' stroke="'+c+'" stroke-width="2"')
   +'<circle cx="'+cx+'" cy="'+cy+'" r="'+r0+'" fill="'+c+'"><animate attributeName="r" values="'+r0+';'+(r0*1.25).toFixed(1)+';'+r0+';'+r0+'" keyTimes="0;0.08;0.16;1" dur="'+(n*0.9).toFixed(1)+'s" begin="'+(i*0.9).toFixed(1)+'s" repeatCount="indefinite"/></circle>'
   +tx(cx,cy+FS(12)*0.35,String(i+1),12,'#fff',900)
   +TW2(70+r0*2+24,y+8,r[0],12.5,c,900,480-r0,'start')+TW2(70+r0*2+24,y+12+h1,r[1],11.5,D,700,480-r0,'start');y+=h;
  if(i<n-1){var lb=d[2][i]||'';s+=ARW(345,y+3,345,y+21,GY,3.5)+(lb?tx(362,y+18,lb,11.5,G,800,'start'):'');y+=26}});
 y+=14;var b=BOX(y,d[3],'#FFF3E0','#B45309',12);s+=b[0];y+=b[1]+16;return svg(y,s)}}

window.FIGS=window.FIGS||{};
window.FIGS.stn2_rules=H.FIX2(rulesFig(RULES));window.FIGS.stn2_gap=H.FIX2(gapFig(GAP));
})();

/* 空港支店の運営の実務（STN）Part 5 の図・追加（2026.10.15）— 5-2 要請メールの形、5-4 本社の勤務時間（日本時間で見る）、5-5 選択肢のしぼり方、5-6 小さな約束が信頼になる
   作成ルールは上と同じ（FIX2・TW2・行数で高さ）。例はすべて架空 */
(function(){
var H=window.FIGH;if(!H)return;
var R=H.R,tx=H.tx,WR=H.WR,TTL=H.TTL,FS=H.FS,LI=H.LINES,setK=H.setK,ARW=H.ARW;
var D=H.C.D,G=H.C.G,BL='#2F8FE0',TE='#1F7A6E',OR='#E08A2F',RD='#D0453E',GN='#1F8A5B',NV='#0f3558',GY='#9AA9B8',PU='#7A5CC7';
function svg(h,body){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 '+Math.ceil(h)+'" role="img">'+R(0,0,640,Math.ceil(h),'#F7FAFD')+body+'</svg>'}
function hgt(s,sz,w){return LI(s,sz,w).length*FS(sz)*1.3}
function TW2(x,top,s,sz,c,w,maxw,a){var n=LI(s,sz,maxw).length,lh=FS(sz)*1.3;return WR(x,top+FS(sz)*0.95+(n-1)*lh/2,s,sz,c,w,maxw,a)}
function ttlH(s){return Math.max(58,30+hgt(s,15,600)+14)}
function BOX(y,s,bg,c,sz){sz=sz||12;var h=hgt(s,sz,560)+18;return [R(20,y,600,h,bg,10)+TW2(320,y+9,s,sz,c,900,560),h]}
function BADGE(x,y,n,c){var r=Math.max(12,FS(12)*0.8);return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+c+'"/>'+tx(x,y+FS(12)*0.36,String(n),12,'#fff',900)}
function FADE(i,n,dur){var a=(i/n).toFixed(3),b=Math.min(1,(i+0.6)/n).toFixed(3);return '<animate attributeName="opacity" values="0.15;0.15;1;1" keyTimes="0;'+a+';'+b+';1" dur="'+dur+'s" repeatCount="indefinite"/>'}

/* 1. 5-2 通る要請メールの形 ― 1通のメールの中の5つの部分 */
var MAIL={
 ja:['通る要請メールの形 ― 読む人が迷わない順番','件名：【要請】XX701 10/2 欠航時のホテル費用の承認（本日18時まで）','1行目に「報告・要請・相談」のどれかを書く',[['何を','してほしいことを動作で1文に。「ご検討を」ではなく「承認をお願いします」',BL],['いつまでに','答えが要る期限と、その理由（当局への提出日など）',OR],['なぜ','現地の事実と数字。写真・規則の原文・見積もりを添える',TE],['案','選べる案と支店のおすすめ。費用と影響の違いを短く並べる',PU],['しないとどうなるか','期限までに決まらないときの影響。圧力ではなく事実として',RD]],'5つがそろっていれば、本社の担当者は聞き返さずに決められる。'],
 ko:['통하는 요청 메일의 구성 — 읽는 사람이 헤매지 않는 순서','제목: [요청] XX701 10/2 결항 시 호텔 비용 승인(오늘 18시까지)','첫 줄에 보고·요청·상담 중 무엇인지 쓴다',[['무엇을','요청할 행동을 한 문장으로. ‘검토 부탁드립니다’가 아니라 ‘승인 부탁드립니다’',BL],['언제까지','답이 필요한 기한과 그 이유(당국 제출일 등)',OR],['왜','현지의 사실과 숫자. 사진·규칙 원문·견적을 붙인다',TE],['대안','고를 수 있는 안과 지점의 추천. 비용과 영향의 차이를 짧게 나란히',PU],['안 하면 어떻게 되나','기한까지 정해지지 않을 때의 영향. 압박이 아니라 사실로',RD]],'다섯 가지가 갖춰져 있으면 본사 담당자는 다시 묻지 않고 결정할 수 있다.'],
 en:['A request email that works — an order the reader can follow','Subject: [Request] XX701 2 Oct cancellation hotel cost approval (by 18:00 today)','Say in the first line whether it is a report, a request or a consultation',[['What','What you need, as one action. Not “please consider” but “please approve”',BL],['By when','The deadline for an answer and why (a filing date with the authority, etc.)',OR],['Why','Local facts and figures. Attach photos, the rule text, quotes',TE],['Options','The choices and the station’s recommendation. Cost and impact side by side, briefly',PU],['If nothing is decided','What happens if there is no decision by the deadline. As fact, not pressure',RD]],'With all five in place, the head-office counterpart can decide without coming back to ask.']};
function mailFig(l){setK(1);var d=MAIL[l]||MAIL.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),x0=40,w=560,n=d[3].length;
 /* メールの窓 */
 var hs=hgt(d[1],12,w-40),top=y;
 s+=R(x0,y,w,26,'#E3EAF2',10)+'<circle cx="'+(x0+16)+'" cy="'+(y+13)+'" r="4" fill="#E0605A"/><circle cx="'+(x0+30)+'" cy="'+(y+13)+'" r="4" fill="#E8B04A"/><circle cx="'+(x0+44)+'" cy="'+(y+13)+'" r="4" fill="#5DBB63"/>';y+=26;
 var body='';var by=y+10;
 body+=TW2(x0+20,by,d[1],12,NV,900,w-40,'start');by+=hs+6;
 body+='<line x1="'+(x0+20)+'" y1="'+by+'" x2="'+(x0+w-20)+'" y2="'+by+'" stroke="#D5DEE8" stroke-width="1.5"/>';by+=8;
 var hn=hgt(d[2],11.5,w-60);body+=R(x0+20,by,w-40,hn+12,'#EAF4FD',6)+TW2(x0+30,by+6,d[2],11.5,BL,800,w-60,'start');by+=hn+20;
 d[3].forEach(function(p,i){var hh=hgt(p[0],12.5,w-110),hx=hgt(p[1],11.5,w-110),h=hh+hx+18,r0=Math.max(12,FS(12)*0.8);
  body+='<g>'+R(x0+20,by,w-40,h,'#fff',8,' stroke="'+p[2]+'" stroke-width="1.8"')+R(x0+20,by,6,h,p[2],3)+BADGE(x0+30+r0+6,by+h/2,i+1,p[2])
   +TW2(x0+30+r0*2+18,by+6,p[0],12.5,p[2],900,w-110,'start')+TW2(x0+30+r0*2+18,by+10+hh,p[1],11.5,D,700,w-110,'start')+FADE(i,n+1,10)+'</g>';by+=h+8});
 s+=R(x0,y,w,by-y+4,'#fff',0,' stroke="#C9D5E2" stroke-width="1.5"')+body;y=by+4;
 s='<g>'+s+'</g>';y+=16;var b=BOX(y,d[4],'#EAF7EF','#166534',12);s+=b[0];y+=b[1]+16;return svg(y,s)}

/* 2. 5-4 本社の勤務時間を日本時間で見る（夏時間の例） */
var TZ={
 ja:['本社の勤務時間を日本時間で並べる（夏時間の例）','日本時間',[['東京支店',0,'9〜18時',NV],['ソウル本社（時差なし）',0,'9〜18時',TE],['ヨーロッパ本社（中部欧州・夏 −7時間）',7,'現地9〜18時',BL],['米国東部本社（夏 −13時間）',13,'現地9〜18時',OR]],'重なる時間','重ならない → 本社の当直（24時間窓口）へ','冬はヨーロッパが−8時間、米国東部が−14時間になり、重なる時間は1時間ずつ後ろへずれる。日付も変わるので「日本時間〇日〇時（貴社〇日〇時）」と両方書く。★'],
 ko:['본사 근무 시간을 일본 시간으로 나란히 보기(서머타임 예)','일본 시간',[['도쿄 지점',0,'9~18시',NV],['서울 본사(시차 없음)',0,'9~18시',TE],['유럽 본사(중부 유럽·여름 −7시간)',7,'현지 9~18시',BL],['미국 동부 본사(여름 −13시간)',13,'현지 9~18시',OR]],'겹치는 시간','겹치지 않음 → 본사 당직(24시간 창구)으로','겨울에는 유럽이 −8시간, 미국 동부가 −14시간이 되어 겹치는 시간이 1시간씩 뒤로 밀린다. 날짜도 바뀌므로 ‘일본 시간 ○일 ○시(귀사 시간 ○일 ○시)’처럼 둘 다 쓴다. ★'],
 en:['Head-office hours on Japan time (summer-time example)','Japan time',[['Tokyo station',0,'09:00–18:00',NV],['Seoul head office (no difference)',0,'09:00–18:00',TE],['European head office (Central Europe, summer −7h)',7,'Local 09:00–18:00',BL],['US East head office (summer −13h)',13,'Local 09:00–18:00',OR]],'Overlap','No overlap → use the head-office duty desk (24 hours)','In winter Europe is −8h and US East −14h, so each overlap moves an hour later. Dates change too, so write both: “Japan time, day X 18:00 (your time, day Y 11:00)”. ★']};
function tzFig(l){setK(1);var d=TZ[l]||TZ.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600);
 var X0=40,X1=600,u=(X1-X0)/24,lab=FS(11.5);
 /* 目盛り（日本時間 0〜24） */
 s+=tx(X0,y+lab,d[1],11,G,800,'start');y+=lab+8;
 for(var h=0;h<=24;h+=3){var x=X0+h*u;s+='<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y+6)+'" stroke="'+GY+'" stroke-width="1.5"/>'+tx(x,y+6+FS(10.5),String(h),10.5,G,700)}
 y+=6+FS(10.5)+10;var gy0=y;var pos=s.length;
 /* 各行：名前（上）＋帯（下） */
 var rows=[];d[2].forEach(function(r,i){var hn=hgt(r[0],12,540);s+=TW2(X0,y,r[0],12,r[3],900,540,'start');y+=hn+4;
  var a=(9+r[1])%24,b=(18+r[1])%24,segs=a<b?[[a,b]]:[[a,24],[0,b]],bh=Math.max(22,FS(11)*1.6);
  s+=R(X0,y,X1-X0,bh,'#EEF2F6',6);
  segs.forEach(function(sg){s+=R(X0+sg[0]*u,y,(sg[1]-sg[0])*u,bh,r[3],6,' opacity=".85"')});
  var lg=segs.reduce(function(m,g){return (g[1]-g[0])>(m[1]-m[0])?g:m}),lc=(lg[0]+lg[1])/2;if(lg[0]<18&&lg[1]>18&&lg[0]>9)lc=(18+lg[1])/2;var lx=X0+lc*u;if(segs.length===1)s+=tx(lx,y+bh/2+FS(11)*0.36,r[2],11,'#fff',800);
  rows.push([y,bh,segs]);y+=bh+12});
 /* 東京の 9〜18 と重なる部分を縦の帯で示す */
 var sx=X0+9*u,ex=X0+18*u;
 s=s.slice(0,pos)+'<rect x="'+sx+'" y="'+(gy0-4)+'" width="'+(ex-sx)+'" height="'+(y-gy0)+'" fill="#E6EEF7" stroke="'+NV+'" stroke-width="2" stroke-dasharray="6 4" rx="6" opacity=".7"/>'+s.slice(pos);
 /* ヨーロッパ（16〜18）と米国（なし）の注記 */
 var eu=rows[2],us=rows[3];
 s+='<g>'+R(X0+16*u,eu[0]-3,2*u,eu[1]+6,'#FFD23F',4,' opacity=".9"')+'<animate attributeName="opacity" values="1;0.35;1" keyTimes="0;0.5;1" dur="2.4s" repeatCount="indefinite"/></g>'+tx(X0+16*u+u,eu[0]+eu[1]/2+FS(10.5)*0.36,'2h',10.5,NV,900);
 y+=2;var hn2=hgt(d[3]+'：16〜18',11.5,560);
 s+=R(X0,y,14,14,'#FFD23F',3)+TW2(X0+22,y-3,d[3]+(l==='en'?': 16:00–18:00 (Europe)':(l==='ko'?': 16~18시(유럽)':'：16〜18時（ヨーロッパ）')),11.5,D,800,520,'start');y+=Math.max(18,hn2)+6;
 var hn3=hgt(d[4],11.5,520);s+=R(X0,y+2,14,14,OR,3)+TW2(X0+22,y-1,(l==='en'?'US East: ':(l==='ko'?'미국 동부: ':'米国東部：'))+d[4],11.5,D,800,520,'start');y+=Math.max(18,hn3)+12;
 var b=BOX(y,d[5],'#FFF3E0','#B45309',11.5);s+=b[0];y+=b[1]+16;return svg(y,s)}

/* 3. 5-5 選択肢のしぼり方 ― 規則の外の案は比べる前に外す */
var FUN={
 ja:['選択肢のしぼり方 ― 比べる前に外す案がある',[['近くのホテルに入れるだけ入れ、残りは都心へ',1],['安全確認を省いて次の便を早く出す',0],['都心のホテルとチャーターバス',1],['規程の上限を超えて約束し、あとで本社に頼む',0],['規程にあれば、自分で宿を取る人に上限内で費用を払う',1]],'安全・法令・規程に合わない案は、比べる表に入れない','残った案を4つの物差しで比べる',['時間','費用','満足','負担'],'いま何をいちばん守るかで選び、組み合わせてもよい'],
 ko:['선택지를 좁히는 법 — 비교하기 전에 빼는 안이 있다',[['근처 호텔에 최대한 배정하고 나머지는 도심으로',1],['안전 확인을 생략하고 다음 편을 빨리 띄운다',0],['도심 호텔과 전세 버스',1],['규정 상한을 넘겨 약속하고 나중에 본사에 부탁한다',0],['규정에 있다면, 직접 숙소를 잡는 사람에게 상한 안에서 비용 지급',1]],'안전·법령·규정에 맞지 않는 안은 비교표에 넣지 않는다','남은 안을 네 가지 잣대로 비교한다',['시간','비용','만족','부담'],'지금 무엇을 가장 지킬지로 고르고, 조합해도 된다'],
 en:['Narrowing the options — some are removed before comparing',[['Fill nearby hotels, send the rest into the city',1],['Skip safety checks to get the next flight out sooner',0],['City hotels plus a chartered bus',1],['Promise beyond the rule limit and ask head office later',0],['If the rules allow, pay passengers who book their own room, up to the limit',1]],'Options that break safety, the law or the rules never go into the comparison','Compare what remains on four measures',['Time','Cost','Satisfaction','Workload'],'Choose by what matters most right now; combining options is fine']};
function funFig(l){setK(1);var d=FUN[l]||FUN.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),n=d[1].length,dur=8;
 d[1].forEach(function(o,i){var ok=o[1],hh=hgt(o[0],11.5,460),h=hh+16,c=ok?TE:RD;
  var g=R(60,y,520,h,'#fff',8,' stroke="'+c+'" stroke-width="1.6"')+TW2(76,y+8,o[0],11.5,D,800,460,'start');
  if(!ok){var cx=556,cy=y+h/2;g+='<g opacity="0"><path d="M'+(cx-9)+' '+(cy-9)+' L'+(cx+9)+' '+(cy+9)+' M'+(cx+9)+' '+(cy-9)+' L'+(cx-9)+' '+(cy+9)+'" stroke="'+RD+'" stroke-width="4" stroke-linecap="round"/><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.25;0.35;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
   g='<g>'+g+'<animate attributeName="opacity" values="1;1;0.35;0.35" keyTimes="0;0.35;0.45;1" dur="'+dur+'s" repeatCount="indefinite"/></g>'}
  else g+='<g opacity="0"><path d="M546 '+(y+h/2)+' l7 7 l13 -14" fill="none" stroke="'+TE+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.6;1" dur="'+dur+'s" repeatCount="indefinite"/></g>';
  s+=g;y+=h+6});
 y+=4;var b1=BOX(y,d[2],'#FDECEC','#B42318',11.5);s+=b1[0];y+=b1[1]+8;
 s+=ARW(320,y,320,y+20,GY,3.5);y+=26;
 var hq=hgt(d[3],12,560);s+=TW2(320,y,d[3],12,NV,900,560);y+=hq+8;
 var cw=(600-3*8)/4;d[4].forEach(function(t,i){var x=20+i*(cw+8);s+=R(x,y,cw,Math.max(30,FS(12)*2),'#EAF4FD',8)+tx(x+cw/2,y+Math.max(30,FS(12)*2)/2+FS(12)*0.36,t,12,BL,900)});y+=Math.max(30,FS(12)*2)+8;
 s+=ARW(320,y,320,y+20,GY,3.5);y+=26;
 var b2=BOX(y,d[5],'#EAF7EF','#166534',12);s+=b2[0];y+=b2[1]+16;return svg(y,s)}

/* 4. 5-6 小さな約束が積み重なって信頼になる（1つ崩れると、上の段まで確認が増える） */
var TRUST={
 ja:['小さな約束の積み重ねが信頼になる',['期限を守る','悪い知らせほど早く','数字を正しく','分からないことは分からないと言う','約束を最後まで守る'],'信頼','本社','現地','1回でも数字を間違えると、次からすべて確認されるようになる。積むのは時間がかかり、崩れるのは一瞬。'],
 ko:['작은 약속이 쌓여 신뢰가 된다',['기한을 지킨다','나쁜 소식일수록 빨리','숫자를 정확히','모르는 것은 모른다고 한다','약속은 매듭짓는다'],'신뢰','본사','현지','숫자를 한 번이라도 틀리면 다음부터 전부 확인받게 된다. 쌓는 데는 시간이 걸리고 무너지는 것은 한순간이다.'],
 en:['Small promises build up into trust',['Meet deadlines','Bad news early','Get the numbers right','Say when you don’t know','See promises through'],'Trust','Head office','Local partners','Get a number wrong once and everything gets checked from then on. Trust takes long to build and a moment to lose.']};
function trustFig(l){setK(1);var d=TRUST[l]||TRUST.ja,y=ttlH(d[0]),s=TTL(320,30,d[0],15,NV,600),n=d[1].length,dur=9;
 /* 上：信頼の屋根、左右に本社・現地 */
 var rh=Math.max(40,FS(14)*2.4),top=y;
 s+='<path d="M140 '+(y+rh)+' L320 '+y+' L500 '+(y+rh)+' Z" fill="'+GN+'" opacity=".9"/>'+tx(320,y+rh*0.72,d[2],14,'#fff',900);
 y+=rh+6;
 /* 煉瓦を下から積む：表示順は下（i=0）から */
 var bh=0;d[1].forEach(function(t){bh=Math.max(bh,hgt(t,12,300)+16)});
 var ys=[];for(var i=0;i<n;i++)ys.push(y+(n-1-i)*(bh+6));
 d[1].forEach(function(t,i){var yy=ys[i],c=[BL,OR,TE,PU,NV][i];
  s+='<g>'+R(170,yy,300,bh,'#fff',6,' stroke="'+c+'" stroke-width="2"')+R(170,yy,10,bh,c,3)+TW2(325,yy+8,t,12,c,900,280)
   +'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;'+(i*0.12).toFixed(2)+';'+(i*0.12+0.06).toFixed(2)+';0.92;1" dur="'+dur+'s" repeatCount="indefinite"/></g>'});
 var bot=y+n*(bh+6)-6;
 /* 左右の柱：本社・現地 */
 var pw=110;[[20,d[3],NV],[510,d[4],TE]].forEach(function(p){s+=R(p[0],top+rh*0.5,pw,bot-top-rh*0.5,'#EEF2F6',10)+WR(p[0]+pw/2,(top+bot)/2+rh*0.25,p[1],12,p[2],900,pw-16)});
 s+=R(150,bot+6,340,8,G,4);y=bot+26;
 var b=BOX(y,d[5],'#FDECEC','#B42318',11.5);s+=b[0];y+=b[1]+16;return svg(y,s)}

window.FIGS=window.FIGS||{};
window.FIGS.stn2_mail=H.FIX2(mailFig);window.FIGS.stn2_tz=H.FIX2(tzFig);window.FIGS.stn2_funnel=H.FIX2(funFig);window.FIGS.stn2_trust=H.FIX2(trustFig);
})();
