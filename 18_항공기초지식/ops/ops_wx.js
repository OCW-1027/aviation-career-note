/* 運航の総合練習 ⑤天気とNOTAM（2026.09）
   TAF・NOTAMは練習用に作った例（実在の発出ではない）。代替空港の判断は教育用の簡略な方法：
   到着予定の前後1時間で、基本の予報・BECMG（変化の後）・TEMPO/PROB を含めていちばん悪い視程と雲底を使い、
   着陸の最低気象条件、代替空港の計画用の最低条件（着陸の最低条件に雲底+200ft・視程+800mを加えた値）と比べる。
   実際の基準は国の規則と各社の運航規程による。 */
(function(){
window.OPS_MODS=window.OPS_MODS||{};
function L3(ja,ko,en){return {ja:ja,ko:ko,en:en}}
function tx(o){return o[lang]||o.ja}
var TAF={RKPC:'TAF RKPC 270500Z 2706/2812 27015KT 9999 FEW030 TEMPO 2708/2712 27025G38KT 4000 -SHRA BKN012 BECMG 2800/2802 32010KT CAVOK',
 RKSS:'TAF RKSS 270500Z 2706/2812 VRB03KT 6000 BR SCT040 BECMG 2710/2712 02008KT 9999 FEW030 TEMPO 2721/2724 1500 BR BKN008',
 RJAA:'TAF RJAA 270500Z 2706/2812 36008KT 9999 FEW020 BECMG 2709/2711 05012KT 3000 BR BKN006 TEMPO 2711/2716 0600 FG VV002',
 RKSI:'TAF RKSI 270500Z 2706/2812 29012KT 9999 SCT025 PROB30 TEMPO 2709/2713 3000 RA BKN009',
  RJTT:'TAF RJTT 270500Z 2706/2812 18012KT 9999 SCT030 BECMG 2710/2712 34010KT TEMPO 2712/2716 3000 -RA BKN010',
  RJFF:'TAF RJFF 270500Z 2706/2812 36010KT 9999 FEW025 TEMPO 2707/2710 4000 SHRA BKN012 BECMG 2800/2802 VRB03KT'};
var ETA={RKPC:'2709',RKSS:'2709',RJAA:'2712',RKSI:'2710',RJTT:'2713',RJFF:'2708'};
var S={sub:'taf',taf:null,eta:null,dh:200,vis:800,rid:null,nt:0};
function dh(s){var m=String(s).match(/^(\d{2})(\d{2})$/);return m?(+m[1])*24+ +m[2]:null}
function parseWx(tokens){var v=null,c=null;tokens.forEach(function(t){if(t==='CAVOK'){v=10000;c=c===null?99999:c}else if(/^\d{4}$/.test(t)){v=+t===9999?10000:+t}else{var m=t.match(/^(BKN|OVC)(\d{3})/)||t.match(/^(VV)(\d{3})/);if(m){var h=+m[2]*100;c=c===null?h:Math.min(c,h)}}});return {v:v,c:c}}
function analyze(text,eta){var t=text.trim().toUpperCase().replace(/=/g,'').split(/\s+/),i=t.findIndex(function(x){return /^\d{4}\/\d{4}$/.test(x)}),groups=[],cur={type:'BASE',from:null,to:null,tok:[]};if(i<0)return null;
 var vp=t[i].split('/');cur.from=dh(vp[0]);cur.to=dh(vp[1]);var end=cur.to;
 for(var k=i+1;k<t.length;k++){var w=t[k];if(w==='BECMG'||w==='TEMPO'||/^PROB\d{2}$/.test(w)){groups.push(cur);var ty=w;if(/^PROB/.test(w)&&t[k+1]==='TEMPO'){ty=w+' TEMPO';k++}var per=t[k+1]&&/^\d{4}\/\d{4}$/.test(t[k+1])?t[k+1].split('/'):null;cur={type:ty,from:per?dh(per[0]):null,to:per?dh(per[1]):null,tok:[]};if(per)k++}else cur.tok.push(w)}
 groups.push(cur);var e=dh(eta),lo=e-1,hi=e+1,worst={v:99999,c:99999},used=[],base=parseWx(groups[0].tok),st={v:base.v,c:base.c===null?99999:base.c};
 groups.slice(1).forEach(function(g){if(g.type==='BECMG'&&g.to!==null&&g.to<=lo){var w=parseWx(g.tok);if(w.v!==null)st.v=w.v;if(w.c!==null)st.c=w.c}});
 worst.v=st.v;worst.c=st.c;used.push(['BASE',st.v,st.c]);
 groups.slice(1).forEach(function(g){if(g.from===null)return;var ov=g.from<hi&&g.to>lo;if(!ov)return;var w=parseWx(g.tok);if(w.v!==null)worst.v=Math.min(worst.v,w.v);if(w.c!==null)worst.c=Math.min(worst.c,w.c);used.push([g.type,w.v,w.c])});
 return {worst:worst,used:used,groups:groups,end:end}}
var NT=[{id:'D1234/26',txt:'D1234/26 NOTAMN\nQ)RKRR/QARLC/IV/NBO/E/200/300/3530N12650E050\nA)RKRR B)2609270000 C)2610052359\nE)ATS RTE Y711 SEGMENT MANGI - DALSU CLSD BTN FL200 AND FL300.',
  q:L3('航空路（ATS Route）が閉鎖','항공로(ATS Route) 폐쇄','ATS route closed'),aff:L3('Y711をFL240で飛ぶ金浦→済州便は影響あり。','Y711을 FL240으로 나는 김포→제주 편은 영향 있음.','Affects a Gimpo→Jeju flight on Y711 at FL240.'),act:L3('閉鎖の外の高度（偶数：FL180以下かFL320以上）を計画する。燃料・時間を見直す。','폐쇄 범위 밖의 고도(짝수: FL180 이하나 FL320 이상)로 계획. 연료·시간 재검토.','Plan a level outside the closure (even: FL180 or below, or FL320 or above); recheck fuel and time.')},
 {id:'A0567/26',txt:'A0567/26 NOTAMN\nQ)RKRR/QMRLC/IV/NBO/A/000/999/3330N12630E005\nA)RKPC B)2609270130 C)2609270530\nE)RWY 07/25 CLSD DUE TO WIP.',
  q:L3('滑走路が閉鎖（工事）','활주로 폐쇄(공사)','Runway closed (works)'),aff:L3('閉鎖の時間に済州に着く便は着陸できない。','폐쇄 시간에 제주에 도착하는 편은 착륙할 수 없음.','Flights arriving at Jeju during the closure cannot land.'),act:L3('到着時刻が時間帯に入るか確かめ、入るなら出発を遅らせるか、ほかの滑走路・代替空港を検討する。','도착 시각이 시간대에 들어가는지 확인하고, 들어가면 출발을 늦추거나 다른 활주로·교체 공항 검토.','Check whether the ETA falls in the window; if so, delay departure or consider another runway or the alternate.')},
 {id:'B2201/26',txt:'B2201/26 NOTAMN\nQ)RJJJ/QICAS/I/NBO/A/000/999/3546N14023E025\nA)RJAA B)2609270000 C)2609301200\nE)ILS RWY 34L NOT AVBL.',
  q:L3('ILS（計器着陸装置）が使えない','ILS(계기 착륙 장치) 사용 불가','ILS not available'),aff:L3('その滑走路は精密進入ができず、最低気象条件が上がる。','그 활주로는 정밀 접근이 안 되어 최저 기상 조건이 올라감.','No precision approach to that runway; landing minima rise.'),act:L3('上がった最低条件でTAFを見直し、代替空港と燃料を再検討する（⑤の上のタブで確かめられる）。','올라간 최저 조건으로 TAF를 다시 보고 교체 공항과 연료를 재검토(⑤ 위 탭에서 확인 가능).','Re-check the TAF against the higher minima and review the alternate and fuel (use the TAF tab).')},
 {id:'A0891/26',txt:'A0891/26 NOTAMN\nQ)RKRR/QNVAS/IV/BO/AE/000/999/3706N12702E025\nA)RKRR B)2609270000 C)2609282359\nE)SONGTAN VORTAC SOT U/S.',
  q:L3('VOR（無線施設）が使えない','VOR(무선시설) 사용 불가','VOR unserviceable'),aff:L3('衛星航法（RNAV）で飛ぶ便は多くの場合影響が小さい。VORに頼る手順は使えない。','위성 항법(RNAV)으로 나는 편은 대부분 영향이 작음. VOR에 의존하는 절차는 못 씀.','RNAV flights are usually little affected; procedures relying on the VOR cannot be used.'),act:L3('使う出発・到着方式がこのVORを必要としないか確かめる。','쓰는 출발·도착 절차가 이 VOR을 필요로 하지 않는지 확인.','Check that the planned departure and arrival procedures do not need this VOR.')},
 {id:'E0934/26',txt:'E0934/26 NOTAMN\nQ)RKRR/QRTCA/IV/BO/W/000/250/3600N12700E020\nA)RKRR B)2609270200 C)2609270600\nE)TEMPO RESTRICTED AREA ACT WI 20NM RADIUS OF 3600N12700E SFC-FL250.',
  q:L3('一時的な制限空域が有効','임시 제한 공역 활성','Temporary restricted area active'),aff:L3('航空路の近くで、FL250以下の上昇・降下や迂回に影響することがある。','항공로 근처에서 FL250 이하의 상승·강하나 우회에 영향이 있을 수 있음.','Near the airway; may affect climbs, descents or deviations below FL250.'),act:L3('空域の位置と経路の関係、雷雲を避ける余地が減ることを確かめる。','공역 위치와 경로의 관계, 뇌운 회피 여지가 줄어드는지 확인.','Check the area against the route and the reduced room to avoid storms.')}];
var QC={QARLC:L3('AR＝航空路（ATSルート）、LC＝閉鎖','AR=항공로(ATS 루트), LC=폐쇄','AR = ATS route, LC = closed'),QMRLC:L3('MR＝滑走路、LC＝閉鎖','MR=활주로, LC=폐쇄','MR = runway, LC = closed'),QICAS:L3('IC＝ILS、AS＝使えない','IC=ILS, AS=사용 불가','IC = ILS, AS = unserviceable'),QNVAS:L3('NV＝VOR、AS＝使えない','NV=VOR, AS=사용 불가','NV = VOR, AS = unserviceable'),QRTCA:L3('RT＝一時的な制限空域、CA＝有効','RT=임시 제한 공역, CA=활성','RT = temporary restricted area, CA = activated')};
var TX={taf:L3('TAFと代替空港','TAF와 교체 공항','TAF and alternates'),notam:L3('NOTAMを読む','NOTAM 읽기','Read a NOTAM'),quiz:L3('問題を解く','문제 풀기','Quiz'),
 tl:L3('到着空港のTAF（貼り付けて変えられます）','도착 공항 TAF(붙여 넣어 바꿀 수 있음)','Destination TAF (you can paste your own)'),eta:L3('到着予定（日時 DDHH、UTC）','도착 예정(일시 DDHH, UTC)','ETA (DDHH, UTC)'),min:L3('着陸の最低気象条件（雲底 ft／視程 m）','착륙 최저 기상 조건(운고 ft/시정 m)','Landing minima (ceiling ft / visibility m)'),
 grp:L3('到着予定の前後1時間にかかる予報','도착 예정 전후 1시간에 걸리는 예보','Forecast groups within ETA ±1 h'),worst:L3('いちばん悪い値','가장 나쁜 값','Worst values'),vis:L3('視程','시정','Visibility'),ceil:L3('雲底','운고','Ceiling'),none:L3('なし','없음','none'),
 r1:L3('着陸の最低条件を上回ります。代替空港は通常どおり1つ計画します（国際線の基本）。','착륙 최저 조건을 웃돕니다. 교체 공항은 보통대로 1곳 계획합니다(국제선 기본).','Above landing minima: plan one alternate as usual.'),
 r2:L3('代替空港の計画用の最低条件（雲底+200ft・視程+800m）を下回る時間があります。代替空港を必ず計画し、追加の燃料（待機など）を検討します。','교체 공항 계획용 최저 조건(운고+200ft·시정+800m)을 밑도는 시간이 있습니다. 교체 공항을 반드시 계획하고 추가 연료(대기 등)를 검토합니다.','Below planning minima (ceiling +200 ft, visibility +800 m) at times: an alternate is required; consider extra fuel for holding.'),
 r3:L3('着陸の最低条件を下回る予報があります。出発の見合わせ、到着時刻の変更、2つ目の代替空港、十分な追加燃料を検討します（会社の規程に従う）。','착륙 최저 조건을 밑도는 예보가 있습니다. 출발 보류, 도착 시각 변경, 두 번째 교체 공항, 충분한 추가 연료를 검토합니다(회사 규정에 따름).','Forecast below landing minima: consider delaying, changing the ETA, a second alternate and ample extra fuel, per company rules.'),
 tnote:L3('TAFは練習用に作った例です。判断の方法は教育用に簡略にしたもので、実際の基準は国の規則と各社の運航規程によります。','TAF는 연습용으로 만든 예입니다. 판단 방법은 교육용으로 간략하게 한 것이며, 실제 기준은 국가 규칙과 각 회사 운항 규정에 따릅니다.','These TAFs are made up for practice; the method is simplified for teaching. Real criteria follow national rules and company operations manuals.'),
 nsel:L3('NOTAMを選ぶ','NOTAM 고르기','Choose a NOTAM'),fq:L3('Q）行：FIR／内容の記号','Q) 줄: FIR/내용 부호','Q) line: FIR / subject code'),fa:L3('A）場所','A) 장소','A) Location'),fb:L3('B）開始 → C）終了（UTC）','B) 시작 → C) 종료(UTC)','B) From → C) To (UTC)'),fe:L3('E）本文','E) 본문','E) Text'),fl:L3('高さの範囲（下限／上限）','높이 범위(하한/상한)','Levels (lower / upper)'),
 mean:L3('意味','의미','Meaning'),aff:L3('影響','영향','Effect'),act:L3('運航管理の対応','운항관리 대응','Dispatch action'),nnote:L3('NOTAMは練習用に作った例で、実在の発出ではありません。','NOTAM은 연습용으로 만든 예이며 실제 발행된 것이 아닙니다.','These NOTAMs are made up for practice and were not actually issued.'),
 q1:L3('次のNOTAMの内容は？<br><code>{n}</code>','다음 NOTAM의 내용은?<br><code>{n}</code>','What does this NOTAM say?<br><code>{n}</code>'),
 q2:L3('TAFの「TEMPO 2711/2716 0600 FG」の意味は？','TAF의 ‘TEMPO 2711/2716 0600 FG’의 의미는?','What does “TEMPO 2711/2716 0600 FG” mean in a TAF?'),
 q3:L3('TAFで雲底（シーリング）として数えるのは？','TAF에서 운고(실링)로 치는 것은?','Which cloud layers count as a ceiling in a TAF?'),
 q4:L3('NOTAMの「C)」の欄が表すのは？','NOTAM의 ‘C)’ 칸이 나타내는 것은?','What does field C) of a NOTAM show?'),
 q5:L3('到着予定に「着陸の最低条件を下回るTEMPO」がかかるとき、運航管理として適切なのは？','도착 예정에 ‘착륙 최저 조건을 밑도는 TEMPO’가 걸릴 때 운항관리로서 적절한 것은?','A TEMPO below landing minima covers the ETA. What is an appropriate dispatch response?')};
function hmx(v){return v>=10000?'10 km+':v+' m'}
function render(){var r=R[ri],arr=r.s[r.s.length-1][0];if(S.rid!==r.id){S.rid=r.id;S.taf=TAF[arr];S.eta=ETA[arr]}
 var sub='<div class="row tabs" id="wxSub" style="margin-top:12px">'+[['taf',TX.taf],['notam',TX.notam],['quiz',TX.quiz]].map(function(q){return '<button class="pill'+(S.sub===q[0]?' on':'')+'" data-s="'+q[0]+'">'+tx(q[1])+'</button>'}).join('')+'</div>',h='';
 if(S.sub==='taf')h='<div class="card" style="margin-top:12px"><label style="font-size:13px;color:var(--sub)">'+tx(TX.tl)+'</label><textarea id="wxT" rows="3" style="width:100%;font:14.5px Consolas,Menlo,monospace;padding:10px;border:1.5px solid var(--line);border-radius:10px;margin:6px 0">'+S.taf+'</textarea>'+
  '<div class="kv" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px"><label>'+tx(TX.eta)+'<br><input id="wxE" value="'+S.eta+'" maxlength="4" style="width:100%"></label><label>'+tx(TX.min)+'<br><input id="wxD" value="'+S.dh+'" style="width:45%"> / <input id="wxV" value="'+S.vis+'" style="width:45%"></label></div><div id="wxO"></div><p class="note">'+tx(TX.tnote)+'</p></div>';
 else if(S.sub==='notam')h='<div class="card" style="margin-top:12px"><div class="row" style="margin:0 0 8px">'+NT.map(function(n,i){return '<button class="pill'+(S.nt===i?' on':'')+'" data-n="'+i+'">'+n.id+'</button>'}).join('')+'</div><pre style="white-space:pre-wrap;background:#fff;border:1.5px solid var(--line);border-radius:10px;padding:10px;font-size:14px">'+NT[S.nt].txt+'</pre><div id="wxN"></div><p class="note">'+tx(TX.nnote)+'</p></div>';
 else h='<div id="wxQ"></div>';
 $('panel').innerHTML=sub+h;
 Array.prototype.forEach.call(document.querySelectorAll('#wxSub [data-s]'),function(b){b.onclick=function(){S.sub=b.getAttribute('data-s');render()}});
 if(S.sub==='taf'){var up=function(){S.taf=$('wxT').value;S.eta=$('wxE').value;S.dh=+$('wxD').value||0;S.vis=+$('wxV').value||0;var a=analyze(S.taf,S.eta);if(!a){$('wxO').innerHTML='';return}
   var w=a.worst,pc=S.dh+200,pv=S.vis+800,lvl=(w.c<S.dh||w.v<S.vis)?'r3':(w.c<pc||w.v<pv)?'r2':'r1';
   $('wxO').innerHTML='<h3 style="margin-top:10px">'+tx(TX.grp)+'</h3><table style="width:100%;font-size:14px;border-collapse:collapse"><tr><th style="text-align:left"></th><th style="text-align:right">'+tx(TX.vis)+'</th><th style="text-align:right">'+tx(TX.ceil)+'</th></tr>'+a.used.map(function(u){return '<tr><td>'+u[0]+'</td><td style="text-align:right">'+(u[1]===null?'—':hmx(u[1]))+'</td><td style="text-align:right">'+(u[2]===null||u[2]>=99999?tx(TX.none):u[2]+' ft')+'</td></tr>'}).join('')+'<tr style="font-weight:800;border-top:1.5px solid var(--ink)"><td>'+tx(TX.worst)+'</td><td style="text-align:right">'+hmx(w.v)+'</td><td style="text-align:right">'+(w.c>=99999?tx(TX.none):w.c+' ft')+'</td></tr></table>'+
    '<div style="margin-top:10px;font-weight:800;color:'+(lvl==='r1'?'var(--ok)':lvl==='r2'?'#B3600A':'var(--ng)')+'">'+tx(TX[lvl])+'</div>'};
  ['wxT','wxE','wxD','wxV'].forEach(function(i){$(i).oninput=up});up()}
 if(S.sub==='notam'){Array.prototype.forEach.call(document.querySelectorAll('[data-n]'),function(b){b.onclick=function(){S.nt=+b.getAttribute('data-n');render()}});
  var n=NT[S.nt],q=n.txt.match(/Q\)([A-Z]{4})\/(Q[A-Z]{4})\/[^/]*\/[^/]*\/[^/]*\/(\d{3})\/(\d{3})/),a=n.txt.match(/A\)(\S+)/),bb=n.txt.match(/B\)(\d{10})/),cc=n.txt.match(/C\)(\d{10})/),e=n.txt.match(/E\)([\s\S]+)$/);
  function d10(s){return '20'+s.slice(0,2)+'-'+s.slice(2,4)+'-'+s.slice(4,6)+' '+s.slice(6,8)+':'+s.slice(8,10)}
  $('wxN').innerHTML='<table style="width:100%;font-size:14.5px;border-collapse:collapse">'+
   [[tx(TX.fq),q[1]+' / '+q[2]+' — '+tx(QC[q[2]])],[tx(TX.fl),(q[3]==='000'?'SFC':'FL'+q[3])+' / '+(q[4]==='999'?'UNL':'FL'+q[4])],[tx(TX.fa),a[1]],[tx(TX.fb),d10(bb[1])+' → '+d10(cc[1])],[tx(TX.fe),e[1]],[tx(TX.mean),tx(n.q)],[tx(TX.aff),tx(n.aff)],[tx(TX.act),tx(n.act)]].map(function(x){return '<tr><td style="padding:6px 8px 6px 0;vertical-align:top;color:var(--sub);white-space:nowrap">'+x[0]+'</td><td style="padding:6px 0">'+x[1]+'</td></tr>'}).join('')+'</table>'}
 if(S.sub==='quiz')OPS_QUIZ($('wxQ'),makeQuiz)}
function makeQuiz(){var out=[],o,n=NT[Math.floor(Math.random()*NT.length)];
 o=OPS_OPTS(tx(n.q),NT.map(function(x){return tx(x.q)}));out.push({q:tx(TX.q1).replace('{n}',n.txt.split('\n').slice(-1)[0]),o:o.o,a:o.a});
 o=OPS_OPTS(tx(L3('11時〜16時（UTC）の間、一時的に視程600mの霧','11시~16시(UTC) 사이 일시적으로 시정 600m 안개','Temporarily 600 m visibility in fog between 11 and 16 UTC')),[tx(L3('11時から霧に変わり、そのまま続く','11시부터 안개로 바뀌어 계속된다','Fog from 11 UTC onwards, persisting')),tx(L3('視程6,000mの霧','시정 6,000m 안개','Fog with 6,000 m visibility')),tx(L3('16時に空港が閉まる','16시에 공항이 닫힌다','The airport closes at 16 UTC'))]);out.push({q:tx(TX.q2),o:o.o,a:o.a});
 o=OPS_OPTS('BKN / OVC / VV',['FEW / SCT','FEW only','SKC / NSC']);out.push({q:tx(TX.q3),o:o.o,a:o.a});
 o=OPS_OPTS(tx(L3('終わる日時','끝나는 일시','When it ends')),[tx(L3('始まる日時','시작 일시','When it starts')),tx(L3('場所','장소','The location')),tx(L3('本文','본문','The text'))]);out.push({q:tx(TX.q4),o:o.o,a:o.a});
 o=OPS_OPTS(tx(L3('代替空港と追加燃料を見直し、出発時刻の調整も検討する','교체 공항과 추가 연료를 재검토하고 출발 시각 조정도 검토한다','Review the alternate and extra fuel, and consider adjusting departure')),[tx(L3('TEMPOは一時的なので無視する','TEMPO는 일시적이므로 무시한다','Ignore it because TEMPO is temporary')),tx(L3('燃料を減らして軽くする','연료를 줄여 가볍게 한다','Reduce fuel to save weight')),tx(L3('到着後に考える','도착 후에 생각한다','Think about it after arrival'))]);out.push({q:tx(TX.q5),o:o.o,a:o.a});
 return shuf(out)}
OPS_MODS.wx={label:L3('⑤ 天気・NOTAM','⑤ 기상·NOTAM','⑤ Weather & NOTAM'),render:render};
})();
