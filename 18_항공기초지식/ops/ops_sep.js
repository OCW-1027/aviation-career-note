/* 運航の総合練習 ④高度と間隔（2026.09）
   高度の決まりはICAO附属書2の半円方式（RVSMを含む）の考え方。間隔の最低値（レーダー5海里・時間10分）は教育用の代表値で、実際の値は空域・装備・各国の規程で決まる。 */
(function(){
window.OPS_MODS=window.OPS_MODS||{};
function L3(ja,ko,en){return {ja:ja,ko:ko,en:en}}
function tx(o){return o[lang]||o.ja}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function hmS(m){m=((Math.round(m)%1440)+1440)%1440;return ('0'+Math.floor(m/60)).slice(-2)+':'+('0'+m%60).slice(-2)}
function toM(s){var m=String(s).match(/(\d{1,2}):?(\d{2})/);return m?+m[1]*60+ +m[2]:0}
var S={sub:'level',mc:193,a:{t:'10:02',g:430},b:{t:'10:05',g:470},min:'r',j:{d1:40,g1:300,t1:'10:00',d2:44,g2:330,t2:'09:58'}};
var TX={level:L3('高度を選ぶ','고도 고르기','Choose a level'),lon:L3('前後の間隔','앞뒤 간격','In-trail separation'),merge:L3('合流の判断','합류 판단','Merging traffic'),quiz:L3('問題を解く','문제 풀기','Quiz'),
 mc:L3('磁方位（°）','자방위(°)','Magnetic course (°)'),use:L3('この向きで使える高度','이 방향에서 쓸 수 있는 고도','Levels for this direction'),odd:L3('奇数（000〜179°）','홀수(000~179°)','Odd (000–179°)'),even:L3('偶数（180〜359°）','짝수(180~359°)','Even (180–359°)'),
 lnote:L3('FL290〜FL410はRVSM（上下1,000フィートの間隔）の空域。同じ向きの便どうしは、1段上か下の同じ種類（奇数どうし・偶数どうし）で2,000フィート離れます。金浦→済州のY711は偶数、済州→金浦のY722は奇数と韓国AIPで決められています。','FL290~FL410은 RVSM(위아래 1,000피트 간격) 공역. 같은 방향 편끼리는 한 단계 위나 아래의 같은 종류(홀수끼리·짝수끼리)로 2,000피트 떨어집니다. 김포→제주 Y711은 짝수, 제주→김포 Y722는 홀수로 한국 AIP에 정해져 있습니다.','FL290–FL410 is RVSM airspace (1,000 ft vertical separation). Same-direction traffic uses the next level of the same series, 2,000 ft apart. The Korea AIP sets Y711 (Gimpo→Jeju) to even levels and Y722 (Jeju→Gimpo) to odd.'),
 fa:L3('前の便 A','앞 편 A','Leading A'),fb:L3('後ろの便 B','뒤 편 B','Following B'),at:L3('{x}の通過時刻','{x} 통과 시각','Time over {x}'),gs:L3('対地速度（kt）','대지속도(kt)','Groundspeed (kt)'),minl:L3('最低の間隔','최소 간격','Minimum'),radar:L3('レーダー 5海里','레이더 5해리','Radar 5 NM'),proc:L3('時間 10分','시간 10분','Procedural 10 min'),
 sepAt:L3('{x}での間隔','{x}에서의 간격','Separation at {x}'),ok:L3('間隔は保たれます。','간격이 유지됩니다.','Separation is maintained.'),ng:L3('間隔が足りなくなります。','간격이 부족해집니다.','Separation will be lost.'),catch:L3('Bの方が速いので、間隔は{x}に向かって縮みます。','B가 더 빨라 {x}로 갈수록 간격이 줄어듭니다.','B is faster, so the gap closes towards {x}.'),
 fix:L3('解決の例：Bの速度をA以下（{g}kt以下）にする／Bに同じ種類の別の高度（2,000フィート上か下）を指示する／Aを先に行かせるため、Bの出発を遅らせる。','해결 예: B의 속도를 A 이하({g}kt 이하)로 / B에게 같은 종류의 다른 고도(2,000피트 위나 아래) 지시 / B의 출발을 늦춘다.','Fixes: slow B to A’s speed or less ({g} kt) / give B another level of the same series (2,000 ft) / delay B’s departure.'),
 j1:L3('便1：{x}まで','편1: {x}까지','Aircraft 1: to {x}'),j2:L3('便2（別の空港から合流）：{x}まで','편2(다른 공항에서 합류): {x}까지','Aircraft 2 (joining from another airport): to {x}'),dist:L3('距離（NM）','거리(NM)','Distance (NM)'),now:L3('今の時刻','현재 시각','Time now'),eta:L3('{x}に着く予定','{x} 도착 예정','ETA {x}'),diff:L3('到着の差','도착 차이','Difference'),
 mok:L3('差は十分です（同じ高度でも合流できる目安）。','차이가 충분합니다(같은 고도라도 합류 가능한 기준).','Enough spacing (could join at the same level).'),mng:L3('差が小さすぎます。管制は高度を分ける・速度を調整する・誘導するなどで順番をつけます。','차이가 너무 작습니다. 관제는 고도 분리·속도 조정·레이더 유도 등으로 순서를 정합니다.','Too close. ATC will separate by level, speed control or vectors.'),
 mnote:L3('時刻・速度・距離は練習用の架空の値です。','시각·속도·거리는 연습용 가상 값입니다.','Times, speeds and distances are fictional practice values.')};
function m(k,v){var s=tx(TX[k]);for(var x in v)s=s.split('{'+x+'}').join(v[x]);return s}
function levels(odd){var o=[];for(var f=200;f<=410;f+=10){var th=f/10;if(f<290){if((th%2===1)===odd)o.push(f)}else if((th%2===1)===odd)o.push(f)}return o}
function inp(id,v,w){return '<input id="'+id+'" value="'+v+'" style="width:'+(w||'100%')+'">'}
function fixes(){var r=R[ri],pts=r.s.slice(1,r.s.length-1).map(function(x){return x[0]}),a=pts[1]||pts[0],b=pts[pts.length-2]||pts[pts.length-1];var d=0,on=false;for(var i=0;i<r.s.length-1;i++){if(r.s[i][0]===a)on=true;if(on&&r.s[i][0]!==b)d+=hav(PT[r.s[i][0]],PT[r.s[i+1][0]])[0];if(r.s[i+1][0]===b)break}return {x:a,y:b,d:Math.round(d),merge:pts[1]||pts[0]}}
function render(){var sub='<div class="row tabs" id="spSub" style="margin-top:12px">'+[['level',TX.level],['lon',TX.lon],['merge',TX.merge],['quiz',TX.quiz]].map(function(q){return '<button class="pill'+(S.sub===q[0]?' on':'')+'" data-s="'+q[0]+'">'+tx(q[1])+'</button>'}).join('')+'</div>',h='',F=fixes();
 if(S.sub==='level'){var L=legs(R[ri]),main=L.slice(1,L.length-1).reduce(function(p,x){return x.nm>p.nm?x:p},L[0]);if(S._r!==ri){S._r=ri;S.mc=main.mc}
  h='<div class="card" style="margin-top:12px"><label>'+tx(TX.mc)+' '+inp('spMc',S.mc,'90px')+'</label><div id="spLv"></div><p class="note">'+tx(TX.lnote)+'</p></div>'}
 else if(S.sub==='lon'){h='<div class="card" style="margin-top:12px"><div class="grid" style="margin-top:0"><div><h3>'+tx(TX.fa)+'</h3><label>'+m('at',{x:F.x})+' '+inp('spAt',S.a.t,'90px')+'</label><br><label>'+tx(TX.gs)+' '+inp('spAg',S.a.g,'90px')+'</label></div><div><h3>'+tx(TX.fb)+'</h3><label>'+m('at',{x:F.x})+' '+inp('spBt',S.b.t,'90px')+'</label><br><label>'+tx(TX.gs)+' '+inp('spBg',S.b.g,'90px')+'</label></div></div>'+
  '<div style="margin-top:10px">'+tx(TX.minl)+'：<label><input type="radio" name="spMin" value="r"'+(S.min==='r'?' checked':'')+'> '+tx(TX.radar)+'</label> <label><input type="radio" name="spMin" value="p"'+(S.min==='p'?' checked':'')+'> '+tx(TX.proc)+'</label></div><div id="spOut"></div><p class="note">'+tx(TX.mnote)+'</p></div>'}
 else if(S.sub==='merge'){h='<div class="card" style="margin-top:12px"><label>'+tx(TX.now)+' '+inp('spNow',S.j.t1,'90px')+'</label><div class="grid"><div><h3>'+m('j1',{x:F.merge})+'</h3><label>'+tx(TX.dist)+' '+inp('spD1',S.j.d1,'80px')+'</label><br><label>'+tx(TX.gs)+' '+inp('spG1',S.j.g1,'80px')+'</label></div><div><h3>'+m('j2',{x:F.merge})+'</h3><label>'+tx(TX.dist)+' '+inp('spD2',S.j.d2,'80px')+'</label><br><label>'+tx(TX.gs)+' '+inp('spG2',S.j.g2,'80px')+'</label></div></div><div id="spMo"></div><p class="note">'+tx(TX.mnote)+'</p></div>'}
 else h='<div id="spQ"></div>';
 $('panel').innerHTML=sub+h;
 Array.prototype.forEach.call(document.querySelectorAll('#spSub [data-s]'),function(b){b.onclick=function(){S.sub=b.getAttribute('data-s');render()}});
 if(S.sub==='level'){var up=function(){S.mc=+$('spMc').value||0;var odd=((S.mc%360)+360)%360<180,lv=levels(odd);$('spLv').innerHTML='<h3 style="margin-top:10px">'+tx(TX.use)+' — '+tx(odd?TX.odd:TX.even)+'</h3><div style="display:flex;flex-wrap:wrap;gap:6px">'+lv.map(function(f){return '<span class="pill" style="cursor:default;'+(f>=290?'border-color:var(--acc)':'')+'">FL'+f+'</span>'}).join('')+'</div>'};$('spMc').oninput=up;up()}
 if(S.sub==='lon'){var up2=function(){S.a={t:$('spAt').value,g:+$('spAg').value||1};S.b={t:$('spBt').value,g:+$('spBg').value||1};var mn=document.querySelector('input[name=spMin]:checked');S.min=mn?mn.value:'r';
   var dt=toM(S.b.t)-toM(S.a.t),sepX=dt,nmX=dt*S.a.g/60,ay=toM(S.a.t)+F.d/S.a.g*60,by=toM(S.b.t)+F.d/S.b.g*60,sepY=by-ay,nmY=sepY*S.a.g/60,need=S.min==='r'?[nmY>=5,'5 NM']:[sepY>=10,'10 min'];
   $('spOut').innerHTML='<table style="width:100%;margin-top:10px;font-size:14.5px;border-collapse:collapse"><tr><th></th><th style="text-align:right">min</th><th style="text-align:right">NM</th></tr><tr><td>'+m('sepAt',{x:F.x})+'</td><td style="text-align:right">'+sepX.toFixed(1)+'</td><td style="text-align:right">'+nmX.toFixed(1)+'</td></tr><tr><td>'+m('sepAt',{x:F.y})+' ('+F.d+' NM)</td><td style="text-align:right">'+sepY.toFixed(1)+'</td><td style="text-align:right">'+nmY.toFixed(1)+'</td></tr></table>'+
    '<div style="margin-top:8px;font-weight:800;color:'+(need[0]?'var(--ok)':'var(--ng)')+'">'+(need[0]?tx(TX.ok):tx(TX.ng))+' ('+need[1]+')</div>'+(S.b.g>S.a.g?'<div style="margin-top:4px">'+m('catch',{x:F.y})+'</div>':'')+(need[0]?'':'<div style="margin-top:6px;font-size:14px">'+m('fix',{g:S.a.g})+'</div>')};
  ['spAt','spAg','spBt','spBg'].forEach(function(i){$(i).oninput=up2});Array.prototype.forEach.call(document.querySelectorAll('input[name=spMin]'),function(x){x.onchange=up2});up2()}
 if(S.sub==='merge'){var up3=function(){S.j={t1:$('spNow').value,d1:+$('spD1').value||0,g1:+$('spG1').value||1,d2:+$('spD2').value||0,g2:+$('spG2').value||1};var n=toM(S.j.t1),e1=n+S.j.d1/S.j.g1*60,e2=n+S.j.d2/S.j.g2*60,df=Math.abs(e1-e2),nm=df*Math.min(S.j.g1,S.j.g2)/60,ok=nm>=5;
   $('spMo').innerHTML='<div class="kv" style="margin-top:10px"><b>'+m('eta',{x:F.merge})+' 1</b><span>'+hmS(e1)+'</span><b>'+m('eta',{x:F.merge})+' 2</b><span>'+hmS(e2)+'</span><b>'+tx(TX.diff)+'</b><span>'+df.toFixed(1)+' min ≈ '+nm.toFixed(1)+' NM</span></div><div style="margin-top:8px;font-weight:800;color:'+(ok?'var(--ok)':'var(--ng)')+'">'+(ok?tx(TX.mok):tx(TX.mng))+'</div>'};
  ['spNow','spD1','spG1','spD2','spG2'].forEach(function(i){$(i).oninput=up3});up3()}
 if(S.sub==='quiz')OPS_QUIZ($('spQ'),makeQuiz)}
var QQ={lv:L3('磁方位{m}°の便の巡航高度として正しいのは？','자방위 {m}° 편의 순항 고도로 맞는 것은?','Which is a correct cruising level for a {m}° magnetic course?'),
 rv:L3('RVSMの空域で、上下の最低の間隔は？','RVSM 공역에서 위아래 최소 간격은?','What is the vertical minimum in RVSM airspace?'),
 tm:L3('同じ高度の2便が、同じ地点を{d}分の差で通過。前の便の対地速度が{g}ktなら、距離の差は約？','같은 고도의 두 편이 같은 지점을 {d}분 차이로 통과. 앞 편 대지속도가 {g}kt면 거리 차이는 약?','Two aircraft at the same level pass a fix {d} min apart. The leader’s groundspeed is {g} kt. The gap is about?'),
 ct:L3('同じ航空路・同じ高度で、後ろの便が前の便より速いとき、間隔はどうなる？','같은 항공로·같은 고도에서 뒤 편이 앞 편보다 빠르면 간격은?','Same airway and level, the follower is faster. What happens to the gap?'),
 fx:L3('合流点で間隔が足りないとき、管制の対応として適切でないものは？','합류 지점에서 간격이 부족할 때 관제 대응으로 적절하지 않은 것은?','Which is NOT a suitable ATC response to insufficient spacing at a merge point?')};
function makeQuiz(){var out=[],o,mc=rnd(1,35)*10,odd=mc<180,lv=levels(odd),wr=levels(!odd);
 var ans='FL'+lv[rnd(0,lv.length-1)];o=OPS_OPTS(ans,shuf(wr).slice(0,3).map(function(f){return 'FL'+f}));out.push({q:tx(QQ.lv).replace('{m}',('00'+mc).slice(-3)),o:o.o,a:o.a,x:tx(odd?TX.odd:TX.even)});
 o=OPS_OPTS('1,000 ft',['500 ft','2,000 ft','4,000 ft']);out.push({q:tx(QQ.rv),o:o.o,a:o.a});
 var d=rnd(2,6),g=rnd(40,48)*10,n=Math.round(d*g/60);o=OPS_OPTS(n+' NM',[(n*2)+' NM',Math.round(n/2)+' NM',(n+10)+' NM']);out.push({q:tx(QQ.tm).replace('{d}',d).replace('{g}',g),o:o.o,a:o.a,x:d+' \u00D7 '+g+' \u00F7 60'});
 o=OPS_OPTS(tx(L3('縮んでいく','줄어든다','It shrinks')),[tx(L3('広がっていく','넓어진다','It grows')),tx(L3('変わらない','변하지 않는다','It stays the same')),tx(L3('高度が自動で変わる','고도가 자동으로 바뀐다','Levels change automatically'))]);out.push({q:tx(QQ.ct),o:o.o,a:o.a});
 o=OPS_OPTS(tx(L3('両方の便に同じ高度を維持させて、そのまま合流させる','두 편 모두 같은 고도를 유지시켜 그대로 합류시킨다','Keep both at the same level and let them merge as they are')),[tx(L3('片方の高度を2,000フィート変える','한쪽 고도를 2,000피트 바꾼다','Change one aircraft’s level by 2,000 ft')),tx(L3('速度を調整する','속도를 조정한다','Adjust speeds')),tx(L3('レーダーで誘導して順番をつける','레이더 유도로 순서를 정한다','Vector one aircraft to sequence it'))]);out.push({q:tx(QQ.fx),o:o.o,a:o.a});
 return shuf(out)}
OPS_MODS.sep={label:L3('③ 高度・間隔','③ 고도·간격','③ Levels & separation'),render:render};
})();
