/* シリーズ2 1-1 外国人国際航空運送事業の許可 の図（2026.09.28）
   fao_flow：申請→審査→許可→運賃・計画・発着枠→初便→就航後の安全監視の流れ（飛行機が線の上を進み、通った段階が点灯する）
   fao_docs：添付書類がどこから来るか（5つの出どころから書類が順に現れ、国際航空課へ集まる）
   表示している言語（html の lang）に合わせて文字を変える。国土交通省の公開資料をもとに、このサイトが整理した図。 */
(function(){
window.FIGS=window.FIGS||{};
var T={
ja:{flow:{m:[['事前の相談','本社・国際航空課'],['申請','3か月前まで'],['審査','事業面＋安全面'],['許可','報道発表'],['運賃・事業計画・発着枠','1-2〜1-5'],['初便',''],['就航後の安全監視','ランプ・インスペクション']],
 lanes:['事業面：国際航空課','安全面：安全部'],ask:'本国・登録国の当局へ照会',br:'3か月以上',aria:'申請から審査、許可、就航後の安全監視までの流れ'},
 docs:{to:'申請書＋添付書類 → 国際航空課',cols:[
  ['本国の航空安全当局',['事業許可証（AOC）','運航仕様書','路線の許可の証明','整備・運航管理・訓練施設の承認']],
  ['登録国（機材ごと）',['登録証明書','耐空証明書','騒音・排出物の証明','83条の2協定（該当時）']],
  ['乗組員（一人ごと）',['技能証明（型式限定）','航空身体検査証明','航空英語能力証明']],
  ['会社（申請者）',['定款','3年分の財務諸表','運送約款＋和訳','保険証明','委任状','脱落防止措置（署名）']],
  ['日本側で作る',['移動支援措置計画','落下物協定の同意確認書','保安計画','路線図・ダイヤグラム']]],aria:'添付書類の5つの出どころ'}},
ko:{flow:{m:[['사전 상담','본사·국제항공과'],['신청','3개월 전까지'],['심사','사업 면+안전 면'],['허가','보도자료'],['운임·사업계획·슬롯','1-2~1-5'],['첫 편',''],['취항 후 안전 감시','램프 인스펙션']],
 lanes:['사업 면: 국제항공과','안전 면: 안전부'],ask:'본국·등록국 당국에 조회',br:'3개월 이상',aria:'신청부터 심사, 허가, 취항 후 안전 감시까지의 흐름'},
 docs:{to:'신청서+첨부 서류 → 국제항공과',cols:[
  ['본국 항공안전당국',['사업 허가증(AOC)','운항 사양서','노선 허가 증명','정비·운항관리·훈련 시설 승인']],
  ['등록국(기재별)',['등록증명서','감항증명서','소음·배출물 증명','83조의2 협정(해당 시)']],
  ['승무원(각자)',['기능증명(형식 한정)','항공신체검사증명','항공영어능력증명']],
  ['회사(신청자)',['정관','3년분 재무제표','운송약관+일본어 번역','보험증명','위임장','탈락 방지 조치(서명)']],
  ['일본 측에서 작성',['이동 지원 조치 계획','낙하물 협정 동의 확인서','보안계획','노선도·다이어그램']]],aria:'첨부 서류의 다섯 출처'}},
en:{flow:{m:[['Consultation','Head office, MLIT'],['Filing','3 months before'],['Review','Business + safety'],['Permit','Press release'],['Fares, plan, slots','1-2 to 1-5'],['First flight',''],['Oversight after launch','Ramp inspections']],
 lanes:['Business: Int’l Air Transport Div.','Safety: Safety Department'],ask:'Queries to home / registry authority',br:'3 months or more',aria:'From application through review, permit and post-launch oversight'},
 docs:{to:'Application + attachments → Int’l Air Transport Division',cols:[
  ['Home-state authority',['AOC','Operations specifications','Route licence evidence','Approval of maintenance, dispatch, training']],
  ['State of registry (per aircraft)',['Registration certificate','Airworthiness certificate','Noise and emissions','Art. 83 bis agreement (if any)']],
  ['Crew (each member)',['Licence (type rating)','Medical certificate','English proficiency']],
  ['Company (applicant)',['Articles of incorporation','3 years of financials','Conditions of carriage + JP','Insurance certificate','Power of attorney','Falling-object measures (signed)']],
  ['Prepared in Japan',['Accessibility plan','Falling-object consent','Security programme','Route map, diagram']]],aria:'The five sources of the attachments'}}};
var F='font-family="Noto Sans JP,Noto Sans KR,Hiragino Sans,Malgun Gothic,sans-serif"';
var C={b:'#2F8FE0',t:'#1F7A6E',p:'#7A6FF0',o:'#E08A2F',y:'#F2B233',d:'#243447',g:'#5F6F80',l:'#E3E9EF'};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function lang(){var l=(document.documentElement.lang||'ja').slice(0,2);return T[l]?l:'ja'}
function txt(x,y,s,sz,col,anchor,w){return '<text x="'+x+'" y="'+y+'" font-size="'+sz+'" fill="'+col+'" text-anchor="'+(anchor||'middle')+'" '+(w?'font-weight="700" ':'')+F+'>'+esc(s)+'</text>'}
var RM='@media (prefers-reduced-motion:reduce){.an{animation:none!important;opacity:1!important}.pl{animation:none!important;offset-distance:0!important}}';

window.FIGS.fao_flow=function(){
 var t=T[lang()].flow,W=760,H=330,y=150,x0=66,x1=652,n=t.m.length,step=(x1-x0)/(n-1),D=16,s='';
 s+='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(t.aria)+'" style="width:100%;height:auto;display:block">';
 s+='<style>.pl{offset-path:path("M'+x0+' '+y+' L'+x1+' '+y+'");animation:ff-pl '+D+'s linear infinite}@keyframes ff-pl{0%{offset-distance:0%}86%{offset-distance:100%}100%{offset-distance:100%}}'+RM+'</style>';
 /* 線 */
 s+='<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="'+C.l+'" stroke-width="6" stroke-linecap="round"/>';
 /* 3か月のかっこ（申請→初便） */
 var bx1=x0+step*1,bx2=x0+step*5,by=y+62;
 s+='<path d="M'+bx1+' '+(by-8)+' V'+by+' H'+bx2+' V'+(by-8)+'" fill="none" stroke="'+C.o+'" stroke-width="2"/>'+txt((bx1+bx2)/2,by+16,t.br,12,C.o);
 /* 節目 */
 for(var i=0;i<n;i++){var cx=x0+step*i,col=[C.g,C.b,C.p,C.t,C.b,C.y,C.o][i],p=Math.round(i/(n-1)*86),up=i%2===0;
  /* 通過した段階が点灯：各要素ごとに keyframes を別に作る */
  s+='<style>@keyframes ff-k'+i+'{0%{opacity:.35}'+Math.max(0,p-1)+'%{opacity:.35}'+p+'%{opacity:1}100%{opacity:1}}.k'+i+'{opacity:.35;animation:ff-k'+i+' '+D+'s linear infinite}@media (prefers-reduced-motion:reduce){.k'+i+'{animation:none;opacity:1}}</style>';
  s+='<g class="k'+i+'"><circle cx="'+cx+'" cy="'+y+'" r="13" fill="#fff" stroke="'+col+'" stroke-width="3"/><circle cx="'+cx+'" cy="'+y+'" r="5" fill="'+col+'"/>';
  var ty=up?y-38:y+38;
  s+=txt(cx,ty,t.m[i][0],14,C.d,'middle',true)+(t.m[i][1]?txt(cx,ty+(up?-16:16),t.m[i][1],11,C.g):'')+'</g>';}
 /* 審査の2つのレーンと照会 */
 var rx=x0+step*2,lw=lang()==='en'?236:156,lh=lw/2;
 s+='<g class="k2"><rect x="'+(rx-lh)+'" y="'+(y+90)+'" width="'+lw+'" height="30" rx="8" fill="#F1EEFF" stroke="'+C.p+'" stroke-width="1.5"/>'+txt(rx,y+110,t.lanes[0],12,C.d)+
    '<rect x="'+(rx-lh)+'" y="'+(y+128)+'" width="'+lw+'" height="30" rx="8" fill="#F1EEFF" stroke="'+C.p+'" stroke-width="1.5"/>'+txt(rx,y+148,t.lanes[1],12,C.d)+
    '<path d="M'+rx+' '+(y+13)+' V'+(y+88)+'" stroke="'+C.p+'" stroke-width="2" stroke-dasharray="4 3"/>'+
    '<path d="M'+(rx+lh)+' '+(y+143)+' H'+(rx+lh+42)+'" stroke="'+C.p+'" stroke-width="1.5" stroke-dasharray="4 3"/>'+txt(rx+lh+46,y+147,t.ask,11,C.g,'start')+'</g>';
 /* 飛行機 */
 s+='<g class="pl"><path d="M-11 0 L9 0 L4 -5 M9 0 L4 5 M-5 -6 L-2 0 L-5 6" stroke="'+C.d+'" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
 return s+'</svg>';};

window.FIGS.fao_docs=function(){
 var t=T[lang()].docs,W=760,H=372,cols=t.cols,cw=140,gap=12,x0=(W-(cw*5+gap*4))/2,s='',col=[C.b,C.t,C.o,C.p,C.y],k=0;
 s+='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(t.aria)+'" style="width:100%;height:auto;display:block">';
 s+='<style>.an{opacity:0;animation:fd-in .5s ease forwards}@keyframes fd-in{to{opacity:1}}.ln{stroke-dasharray:200;stroke-dashoffset:200;animation:fd-ln 1.2s ease forwards;animation-delay:3.2s}@keyframes fd-ln{to{stroke-dashoffset:0}}@media (prefers-reduced-motion:reduce){.an{animation:none;opacity:1}.ln{animation:none;stroke-dashoffset:0}}</style>';
 var ty=H-34;
 s+='<rect class="an" style="animation-delay:3.6s" x="'+(W/2-190)+'" y="'+(ty-22)+'" width="380" height="34" rx="17" fill="#FFF6DD" stroke="'+C.y+'" stroke-width="2"/>'+'<g class="an" style="animation-delay:3.6s">'+txt(W/2,ty,t.to,13,'#5A4200','middle',true)+'</g>';
 for(var i=0;i<5;i++){var x=x0+i*(cw+gap),cx=x+cw/2,c=col[i];
  s+='<g class="an" style="animation-delay:'+(i*.25)+'s"><rect x="'+x+'" y="14" width="'+cw+'" height="40" rx="10" fill="'+c+'"/>';
  var h=cols[i][0];s+=(h.length>13&&lang()!=='en')||(h.length>18)?'<foreignObject x="'+x+'" y="14" width="'+cw+'" height="40"><div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:40px;font:700 11.5px Noto Sans JP,Noto Sans KR,Hiragino Sans,Malgun Gothic,sans-serif;color:#fff;text-align:center;line-height:1.15;padding:0 4px">'+esc(h)+'</div></foreignObject>':txt(cx,39,h,12,'#fff','middle',true);
  s+='</g>';
  cols[i][1].forEach(function(d,j){var yy=64+j*36;k++;
   s+='<g class="an" style="animation-delay:'+(1.3+k*.13)+'s"><rect x="'+(x+4)+'" y="'+yy+'" width="'+(cw-8)+'" height="30" rx="8" fill="#fff" stroke="'+c+'" stroke-width="1.5"/>'+
      '<foreignObject x="'+(x+4)+'" y="'+yy+'" width="'+(cw-8)+'" height="30"><div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:30px;font:500 10.5px Noto Sans JP,Noto Sans KR,Hiragino Sans,Malgun Gothic,sans-serif;color:'+C.d+';text-align:center;line-height:1.1;padding:0 3px">'+esc(d)+'</div></foreignObject></g>';});
  var by=64+cols[i][1].length*36+2;
  s+='<path class="ln" d="M'+cx+' '+by+' C '+cx+' '+(by+40)+', '+(W/2)+' '+(ty-60)+', '+(W/2)+' '+(ty-24)+'" fill="none" stroke="'+c+'" stroke-width="2" stroke-dasharray="4 3"/>';}
 return s+'</svg>';};
})();
