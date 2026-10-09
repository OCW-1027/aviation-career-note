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
 ko:['해외 지점은 세 가지 규칙이 겹치는 자리에 선다',['본사 규정','운송 매뉴얼과 본사 지시. 어느 공항에서나 같은 품질을 요구한다',NV],['지점 — 세 가지를 동시에 만족하는 방법을 찾는다','만족할 수 없을 때는 대안을 붙여 본사에 빨리 올린다'],[['일본 법령과 공항 규칙','항공법·출입국·세관·검역·개인정보 보호 등. 공항 회사별 규칙과 공지',RD],['조업사와의 계약','작업 범위·요금·인원. 오래 이어져 온 현장의 관행',TE]],'규정·지시(한국어·영어)','지켜야 할 조건·할 수 있는 범위(일본어)','세 가지가 부딪치면 법령이 먼저. 그다음 본사와 상의하고, 정한 것을 문서로 남긴다.'],
 en:['An overseas station stands where three sets of rules overlap',['Head-office rules','The passenger manual and head-office instructions. The same quality at every airport',NV],['The station: finds a way to satisfy all three','When it cannot, it raises the issue early, with options'],[['Japanese law and airport rules','Aviation, immigration, customs, quarantine, data protection and more. Each airport company’s rules and notices',RD],['The handling contract','Scope of work, fees, staffing. Long-standing local practice',TE]],'Rules and instructions (Korean, English)','Conditions to meet, limits of what is possible (Japanese)','When the three conflict, the law comes first. Then agree with head office and put the decision in writing.']};
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
 ja:['本社の指示と現地のきまりが違うとき ― 判断の順番',[['事実を確かめる','どの指示のどの部分か。どの法令・規則・契約のどの条文か。訳ではなく原文で確かめる',BL],['法令や当局の指示とぶつかる？','はい → 法令に従う。すぐに本社へ報告し、指示の見直しを求める',RD],['空港のルールや契約とぶつかる？','はい → 空港会社・ハンドリング会社と調整できるかを探り、案をつけて本社に判断を求める',OR],['現地の慣行だけが違う？','はい → 本社の指示に合わせ、現場に理由を説明して教える。良い慣行なら規程の改訂を提案する',TE],['決めたことを書面に残す','誰が・いつ・何を決めたか。支店の手順と教育の記録に反映する',GN]],['','いいえ','いいえ',''],'黙って本社の指示を変えない。黙って法令に反しない。どちらの「黙って」も支店の信頼を失う。'],
 ko:['본사 지시와 현지 규칙이 다를 때 — 판단의 순서',[['사실을 확인한다','어느 지시의 어느 부분인가. 어느 법령·규칙·계약의 어느 조항인가. 번역이 아니라 원문으로 확인한다',BL],['법령이나 당국 지시와 부딪치나?','예 → 법령을 따른다. 바로 본사에 보고하고 지시 재검토를 요청한다',RD],['공항 규칙이나 계약과 부딪치나?','예 → 공항 회사·조업사와 조정할 수 있는지 알아보고, 대안을 붙여 본사에 판단을 요청한다',OR],['현지 관행만 다른가?','예 → 본사 지시에 맞추고, 현장에 이유를 설명해 교육한다. 좋은 관행이면 규정 개정을 제안한다',TE],['정한 것을 문서로 남긴다','누가·언제·무엇을 정했나. 지점 절차와 교육 기록에 반영한다',GN]],['','아니요','아니요',''],'본사 지시를 말없이 바꾸지 않는다. 말없이 법령을 어기지 않는다. 어느 쪽의 「말없이」도 지점의 신뢰를 잃게 한다.'],
 en:['When a head-office instruction and local rules differ: the order of judgment',[['Check the facts','Which instruction, which part? Which law, rule or contract clause? Check the original, not a translation',BL],['Does it conflict with the law or the authorities?','Yes → follow the law. Report to head office at once and ask for the instruction to be reviewed',RD],['Does it conflict with airport rules or the contract?','Yes → see whether the airport company or handler can adjust, then ask head office to decide, with options',OR],['Is it only local habit that differs?','Yes → follow head office, explain the reason to the floor and train them. If the local way is better, propose a manual change',TE],['Put the decision in writing','Who decided what, and when. Reflect it in station procedures and training records',GN]],['','No','No',''],'Never quietly change a head-office instruction. Never quietly break the law. Either kind of “quietly” costs the station its trust.']};
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
