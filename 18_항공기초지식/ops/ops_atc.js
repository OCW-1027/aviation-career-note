/* 運航の総合練習 ③管制の交信と復唱（2026.09）
   周波数・スコーク・初期高度は練習用の架空の値（実際はAIP・管制の指示に従う）。用語はICAOの標準用語の考え方にもとづく教育用の簡略版。 */
(function(){
window.OPS_MODS=window.OPS_MODS||{};
function L3(ja,ko,en){return {ja:ja,ko:ko,en:en}}
function tx(o){return o[lang]||o.ja}
var DG={'0':'zero','1':'one','2':'two','3':'tree','4':'four','5':'fife','6':'six','7':'seven','8':'eight','9':'niner'};
var NATO={A:'Alfa',B:'Bravo',C:'Charlie',D:'Delta',E:'Echo',F:'Foxtrot',G:'Golf',H:'Hotel',I:'India',J:'Juliett',K:'Kilo',L:'Lima',M:'Mike',N:'November',O:'Oscar',P:'Papa',Q:'Quebec',R:'Romeo',S:'Sierra',T:'Tango',U:'Uniform',V:'Victor',W:'Whiskey',X:'X-ray',Y:'Yankee',Z:'Zulu'};
var CITY={RKSS:'Gimpo',RKPC:'Jeju',RKSI:'Incheon',RJAA:'Narita'};
var S={sub:'pilot',sc:null,rb:''};
function digits(s){return String(s).split('').map(function(c){return c==='.'?'decimal':DG[c]||c}).join(' ')}
function speak(str){return str.toUpperCase().split(/\s+/).filter(Boolean).map(function(w){
 if(/^FL\d{2,3}$/.test(w))return 'flight level '+digits(w.slice(2));
 if(/^\d{3}\.\d{1,3}$/.test(w))return digits(w);
 if(/^\d+$/.test(w)){if(+w>=1000&&+w%1000===0&&w.length<=5)return digits(String(+w/1000))+' thousand';return digits(w)}
 if(/^[A-Z]{3}\d+[A-Z]?$/.test(w)){var m=w.match(/^([A-Z]{3})(\d+)([A-Z]?)$/);return m[1].split('').map(function(c){return NATO[c]}).join(' ')+' '+digits(m[2])+(m[3]?' '+NATO[m[3]]:'')}
 if(/^[A-Z]{1,5}$/.test(w)&&!/^(SQUAWK|CLIMB|HEADING|CONTACT|CLEARED|TO|VIA|DESCEND|MAINTAIN|FEET|RUNWAY)$/.test(w))return w.length<=3?w.split('').map(function(c){return NATO[c]}).join(' '):w;
 return w.toLowerCase()}).join(' ')}
var W2D={zero:'0',one:'1',two:'2',tree:'3',three:'3',four:'4',fower:'4',five:'5',fife:'5',six:'6',seven:'7',eight:'8',nine:'9',niner:'9',decimal:'.',point:'.',dayseemal:'.'};
function norm(s){var t=String(s).toLowerCase().replace(/[,;:!?]/g,' ').split(/\s+/).filter(Boolean).map(function(w){if(W2D[w]!==undefined)return W2D[w];if(w==='thousand')return '000';var n=Object.keys(NATO).filter(function(k){return NATO[k].toLowerCase()===w})[0];return n||w});
 var o='';t.forEach(function(w,i){var prevD=o.length&&/[0-9.]$/.test(o),curD=/^[0-9.]+$/.test(w);o+=(prevD&&curD?'':' ')+w});return o.toUpperCase().replace(/\s+/g,' ').trim()}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function newScenario(){var r=R[ri],dep=r.s[0][0],arr=r.s[r.s.length-1][0],cs='ACN'+rnd(101,989),alt=[5000,6000,7000][rnd(0,2)],fq=['119.1','120.8','121.35','124.2','125.5','126.9'][rnd(0,5)],sq;do{sq=''+rnd(1,6)+rnd(0,7)+rnd(0,7)+rnd(0,7)}while(/^7[5-7]00$/.test(sq));
 return {cs:cs,dep:dep,arr:arr,city:CITY[arr],alt:alt,fq:fq,sq:sq,first:r.s[1][0]}}
function clearance(c){return c.cs+', cleared to '+c.city+' via '+c.first+' departure, flight planned route. Climb '+c.alt+' feet. Departure frequency '+c.fq+'. Squawk '+c.sq+'.'}
function model(c){return 'Cleared to '+c.city+' via '+c.first+' departure, flight planned route, climb '+c.alt+' feet, departure '+c.fq+', squawk '+c.sq+', '+c.cs+'.'}
function check(c,rb){var n=' '+norm(rb)+' ';return [['cs',n.indexOf(' '+c.cs+' ')>=0||n.indexOf(' '+c.cs)>=0],['dest',n.indexOf(c.city.toUpperCase())>=0||n.indexOf(c.arr)>=0],['route',/FLIGHT PLANNED|PLANNED ROUTE/.test(n)||n.indexOf(c.first)>=0],['alt',n.indexOf(String(c.alt))>=0||n.indexOf(String(c.alt/1000)+'000')>=0],['fq',n.replace(/ /g,'').indexOf(c.fq)>=0],['sq',n.indexOf(c.sq)>=0]]}
var EL={cs:L3('便名（呼出符号）','편명(호출부호)','Call sign'),dest:L3('許可の限界（目的地）','허가 한계(목적지)','Clearance limit (destination)'),route:L3('経路','경로','Route'),alt:L3('初期の高度','초기 고도','Initial altitude'),fq:L3('出発の周波数','출발 주파수','Departure frequency'),sq:L3('スコーク（トランスポンダーの番号）','스쿼크(트랜스폰더 번호)','Squawk (transponder code)')};
var TX={pilot:L3('操縦士：復唱の練習','조종사: 복창 연습','Pilot: readback'),flow:L3('交信の流れ','교신 흐름','Who you talk to'),conv:L3('発音の変換','발음 변환','Phraseology converter'),quiz:L3('問題を解く','문제 풀기','Quiz'),
 hear:L3('管制の許可（英語）','관제 허가(영어)','ATC clearance'),spoken:L3('読み上げ方','읽는 법','Spoken as'),yours:L3('あなたの復唱を入力（数字は 125.5 でも one two five decimal five でも可）','복창을 입력하세요(숫자는 125.5도, one two five decimal five도 가능)','Type your readback (125.5 or “one two five decimal five” both work)'),
 chk:L3('採点','채점','Check'),nw:L3('新しい許可','새 허가','New clearance'),mdl:L3('復唱の例','복창 예시','Model readback'),all:L3('必要な項目がすべて入っています。','필요한 항목이 모두 들어 있습니다.','All required items are there.'),miss:L3('足りない項目があります。管制官は聞き返して確かめます。','빠진 항목이 있습니다. 관제사는 다시 확인합니다.','Items are missing; the controller will query them.'),
 fic:L3('周波数・スコーク・高度は練習用の架空の値です。','주파수·스쿼크·고도는 연습용 가상 값입니다.','Frequencies, codes and altitudes are fictional practice values.'),
 cin:L3('変換したい文（例：ACN123 FL350 126.175 SQUAWK 4521）','변환할 문장(예: ACN123 FL350 126.175 SQUAWK 4521)','Text to convert (e.g. ACN123 FL350 126.175 SQUAWK 4521)'),
 cnote:L3('3＝tree、5＝fife、9＝niner、小数点＝decimal、高度の1000単位＝thousand。アルファベットはフォネティック・コード。','3=tree, 5=fife, 9=niner, 소수점=decimal, 1000 단위 고도=thousand. 알파벳은 음성 문자(포네틱 코드).','3 = tree, 5 = fife, 9 = niner, point = decimal, whole thousands = thousand; letters use the phonetic alphabet.'),
 fnote:L3('実際の周波数は各国のAIPに載っています。ここでは役割の順番を覚えます。国が変わる便（仁川―成田）は、FIRの境界で相手の国の管制に替わります。','실제 주파수는 각국 AIP에 실려 있습니다. 여기서는 역할의 순서를 익힙니다. 나라가 바뀌는 편(인천–나리타)은 FIR 경계에서 상대국 관제로 바뀝니다.','Real frequencies are in each country’s AIP; here you learn the order of roles. On international flights (Incheon–Narita) control passes to the other country at the FIR boundary.')};
var UNIT=function(r){var dep=CITY[r.s[0][0]],arr=CITY[r.s[r.s.length-1][0]];var a=[[L3(dep+' 管制承認（デリバリー）',dep+' 관제 허가(딜리버리)',dep+' Clearance Delivery'),L3('飛行計画どおりの許可をもらう','비행계획대로 허가를 받는다','Receive the route clearance')],[L3(dep+' グランド',dep+' 그라운드',dep+' Ground'),L3('プッシュバック・地上走行','푸시백·지상 이동','Pushback and taxi')],[L3(dep+' タワー',dep+' 타워',dep+' Tower'),L3('離陸の許可','이륙 허가','Take-off clearance')],[L3('出発管制（ディパーチャー）','출발 관제(디파처)','Departure'),L3('出発方式で上昇','출발 절차로 상승','Climb on the departure')]];
 if(r.id==='gc'||r.id==='cg')a=a.concat([[L3('仁川航空路管制所（持ち場1）','인천 항로관제소(구역 1)','Incheon ACC (sector 1)'),L3('巡航','순항','Cruise')],[L3('仁川航空路管制所（持ち場2）','인천 항로관제소(구역 2)','Incheon ACC (sector 2)'),L3('周波数だけ変わる','주파수만 바뀐다','Only the frequency changes')],[L3('仁川航空路管制所（持ち場3）','인천 항로관제소(구역 3)','Incheon ACC (sector 3)'),L3('降下の開始','강하 시작','Start of descent')]]);
 else if(r.id==='in')a=a.concat([[L3('仁川航空路管制所','인천 항로관제소','Incheon ACC'),L3('韓国の上空','한국 상공','Over Korea')],[L3('日本の航空路管制（福岡FIR）','일본 항로관제(후쿠오카 FIR)','Japanese area control (Fukuoka FIR)'),L3('LANATの先で国が替わる','LANAT 뒤에서 나라가 바뀐다','Country changes past LANAT')]]);
 else a=a.concat([[L3('日本の航空路管制（福岡FIR）','일본 항로관제(후쿠오카 FIR)','Japanese area control (Fukuoka FIR)'),L3('日本の上空','일본 상공','Over Japan')],[L3('仁川航空路管制所','인천 항로관제소','Incheon ACC'),L3('SAPRAで韓国へ','SAPRA에서 한국으로','Into Korea at SAPRA')]]);
 return a.concat([[L3(arr+' アプローチ',arr+' 어프로치',arr+' Approach'),L3('到着方式・進入','도착 절차·접근','Arrival and approach')],[L3(arr+' タワー',arr+' 타워',arr+' Tower'),L3('着陸の許可','착륙 허가','Landing clearance')],[L3(arr+' グランド',arr+' 그라운드',arr+' Ground'),L3('駐機場まで','주기장까지','Taxi to the stand')]])};
function render(){var sub='<div class="row tabs" id="atSub" style="margin-top:12px">'+[['pilot',TX.pilot],['flow',TX.flow],['conv',TX.conv],['quiz',TX.quiz]].map(function(m){return '<button class="pill'+(S.sub===m[0]?' on':'')+'" data-s="'+m[0]+'">'+tx(m[1])+'</button>'}).join('')+'</div>',h='',r=R[ri];
 if(!S.sc||S.sc.dep!==r.s[0][0]||S.sc.arr!==r.s[r.s.length-1][0])S.sc=newScenario();var c=S.sc;
 if(S.sub==='pilot'){var cl=clearance(c);h='<div class="card" style="margin-top:12px"><h3>'+tx(TX.hear)+'</h3><div style="font:600 16px/1.6 Consolas,Menlo,monospace;background:#fff;border:1.5px solid var(--line);border-radius:10px;padding:10px">'+cl+'</div><h3 style="margin-top:10px">'+tx(TX.spoken)+'</h3><div style="font-size:14.5px;color:var(--sub)">'+speak(cl.replace(/[.,]/g,' ').replace(/ (\d{3}) (\d)/,' $1.$2'))+'</div>'+
  '<label style="display:block;margin-top:12px;font-size:13px;color:var(--sub)">'+tx(TX.yours)+'</label><textarea id="atRb" rows="3" style="width:100%;font:15px Consolas,Menlo,monospace;padding:10px;border:1.5px solid var(--line);border-radius:10px">'+S.rb+'</textarea>'+
  '<div class="ctl"><button class="btn" id="atCk">'+tx(TX.chk)+'</button><button class="btn sec" id="atNw">'+tx(TX.nw)+'</button></div><div id="atRs"></div><p class="note">'+tx(TX.fic)+'</p></div>'}
 else if(S.sub==='flow'){var U=UNIT(r);h='<div class="card" style="margin-top:12px"><ol style="margin:0;padding-left:22px">'+U.map(function(u){return '<li style="margin:6px 0"><b>'+tx(u[0])+'</b><br><span style="color:var(--sub);font-size:14px">'+tx(u[1])+'</span></li>'}).join('')+'</ol><p class="note">'+tx(TX.fnote)+'</p></div>'}
 else if(S.sub==='conv'){h='<div class="card" style="margin-top:12px"><label style="font-size:13px;color:var(--sub)">'+tx(TX.cin)+'</label><input id="atCv" value="ACN123 FL350 126.175 SQUAWK 4521 HEADING 090 CLIMB 7000" style="width:100%;font:600 16px Consolas,Menlo,monospace;padding:10px;border:1.5px solid var(--line);border-radius:10px;margin:6px 0"><div id="atCo" style="font-size:16px;font-weight:700;margin-top:6px"></div><p class="note">'+tx(TX.cnote)+'</p></div>'}
 else h='<div id="atQ"></div>';
 $('panel').innerHTML=sub+h;
 Array.prototype.forEach.call(document.querySelectorAll('#atSub [data-s]'),function(b){b.onclick=function(){S.sub=b.getAttribute('data-s');render()}});
 if(S.sub==='pilot'){$('atRb').oninput=function(){S.rb=this.value};$('atNw').onclick=function(){S.sc=newScenario();S.rb='';render()};
  $('atCk').onclick=function(){var res=check(c,S.rb),all=res.every(function(x){return x[1]});$('atRs').innerHTML='<div style="margin-top:10px;font-weight:800;color:'+(all?'var(--ok)':'var(--ng)')+'">'+(all?tx(TX.all):tx(TX.miss))+'</div><ul style="margin:6px 0 0;padding-left:20px">'+res.map(function(x){return '<li style="color:'+(x[1]?'var(--ok)':'var(--ng)')+'">'+(x[1]?'\u2714 ':'\u2716 ')+tx(EL[x[0]])+'</li>'}).join('')+'</ul><div style="margin-top:8px;font-size:14px"><b>'+tx(TX.mdl)+'</b><br><code>'+model(c)+'</code></div>'}}
 if(S.sub==='conv'){var up=function(){$('atCo').textContent=speak($('atCv').value)};$('atCv').oninput=up;up()}
 if(S.sub==='quiz')OPS_QUIZ($('atQ'),makeQuiz)}
var Q={hb:L3('管制官として聞き返しをします。許可は「{c}」。操縦士の復唱「{r}」で、まちがっている項目は？','관제사로서 확인 청취를 합니다. 허가는 ‘{c}’. 조종사 복창 ‘{r}’에서 틀린 항목은?','As the controller, check the readback. Clearance: “{c}”. Readback: “{r}”. Which item is wrong?'),
 em:L3('スコーク{c}の意味は？','스쿼크 {c}의 의미는?','What does squawk {c} mean?'),
 ph:L3('「{w}」の正しい読み方は？','‘{w}’의 올바른 읽는 법은?','How is “{w}” spoken?'),
 nx:L3('{a}の次に話す相手は？','{a} 다음에 교신하는 상대는?','After {a}, who do you talk to next?'),
 rb:L3('ふつう必ず復唱するものは？','보통 반드시 복창하는 것은?','Which must normally be read back?'),
 rbx:L3('高度・機首方位・速度・滑走路・周波数・スコーク・許可などの指示は復唱します。天気などの情報は「了解」で足ります。','고도·기수 방위·속도·활주로·주파수·스쿼크·허가 등 지시는 복창합니다. 날씨 등 정보는 ‘라저’로 충분합니다.','Instructions such as levels, headings, speeds, runways, frequencies, squawks and clearances are read back; information such as weather needs only acknowledgement.')};
var EMG=[['7500',L3('不法な妨害（ハイジャック）','불법 방해(하이재킹)','Unlawful interference (hijack)')],['7600',L3('無線の故障','무선 고장','Radio failure')],['7700',L3('緊急事態','비상 상황','Emergency')],['2000',L3('割り当て前の番号','배정 전 번호','Code before assignment')]];
function mq(t,v){var s=tx(Q[t]);for(var k in v)s=s.split('{'+k+'}').join(v[k]);return s}
function makeQuiz(){var out=[],c=newScenario(),cl=clearance(c),o;
 var errs=[['sq',function(){var s=c.sq.split('');s[3]=s[3]==='7'?'6':String(+s[3]+1);return s.join('')}],['alt',function(){return c.alt+1000}],['fq',function(){return c.fq.replace(/.$/,function(d){return d==='9'?'8':String(+d+1)})}]],e=errs[rnd(0,2)],bad=e[1](),rb=model(c).replace(e[0]==='sq'?c.sq:e[0]==='alt'?String(c.alt):c.fq,String(bad));
 o=OPS_OPTS(tx(EL[e[0]]),[tx(EL.cs),tx(EL.dest),tx(EL.route),tx(EL.alt),tx(EL.fq),tx(EL.sq)]);out.push({q:mq('hb',{c:cl,r:rb}),o:o.o,a:o.a});
 var em=EMG[rnd(0,2)];o=OPS_OPTS(tx(em[1]),EMG.map(function(x){return tx(x[1])}));out.push({q:mq('em',{c:em[0]}),o:o.o,a:o.a});
 var wds=['FL350','FL290','119.35','9000'],w=wds[rnd(0,3)],right=speak(w),wr=[right.replace('tree','three').replace('fife','five').replace('niner','nine'),right.replace('decimal','point'),w.replace(/\d/g,function(d){return ['zero','one','two','three','four','five','six','seven','eight','nine'][+d]+' '})];
 if(right===wr[0])wr[0]=right+' feet';o=OPS_OPTS(right,wr);out.push({q:mq('ph',{w:w}),o:o.o,a:o.a});
 var U=UNIT(R[ri]),k=rnd(0,U.length-2);o=OPS_OPTS(tx(U[k+1][0]),shuf(U.filter(function(u,i){return i!==k+1&&i!==k})).map(function(u){return tx(u[0])}));out.push({q:mq('nx',{a:tx(U[k][0])}),o:o.o,a:o.a});
 var yes=[L3('上昇する高度','상승 고도','The cleared level'),L3('新しい周波数','새 주파수','A new frequency'),L3('スコーク','스쿼크','A squawk')][rnd(0,2)],no=[L3('空港の気温','공항 기온','The airport temperature'),L3('ほかの便の位置の情報','다른 편의 위치 정보','Traffic information about other aircraft'),L3('雲の量','구름의 양','Cloud cover')];
 o=OPS_OPTS(tx(yes),no.map(tx));out.push({q:tx(Q.rb),o:o.o,a:o.a,x:tx(Q.rbx)});
 return shuf(out)}
window.OPS_SPEAK=speak;
OPS_MODS.atc={label:L3('② 管制の交信','② 관제 교신','② ATC calls'),render:render};
})();
