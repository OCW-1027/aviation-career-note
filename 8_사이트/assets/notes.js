/* 私の学習ノート：レッスンのページの「ノート」パネル（2026.10）
   ・メモ（自動保存）、選んだ文の引用、理解度の自己評価と復習の予定、ブックマーク、学習時間の自動記録
   ・保存はこの端末のブラウザ（localStorage）。学習の進み方は人ごとに違うので、記録はすべて端末ごと・人ごと
     acn-notes-v1 ＝ {"gnd/0-1":{t:メモ,u:更新時刻}}      acn-rate-v1 ＝ {"gnd/0-1":{r:1-3,s:段階,d:評価日,n:次の復習日}}
     acn-bm-v1    ＝ {"gnd/0-1":登録時刻}                acn-time-v1 ＝ {"2026-10-08":{"gnd/0-1":秒}}
     acn-hist-v1  ＝ [{k:"gnd/0-1",t:時刻}]（最近見たレッスン 30件）
   ・一覧・復習・設定・バックアップは study.html（私の学習ノート）
   ・acn_shell.js がレッスンのページ（/ja|ko|en/講座/番号/）でだけ読み込む */
(function(){
if(/jsdom/i.test(navigator.userAgent))return;
var m=decodeURIComponent(location.pathname).match(/\/(ja|ko|en)\/([a-z]+)\/([\d]+-[\d]+)\/?(index\.html)?$/);if(!m)return;
var KEY=m[2]+'/'+m[3],me=document.currentScript&&document.currentScript.src;
var STUDY=me?new URL('../study.html',me).href:'#';
var KN='acn-notes-v1',KR='acn-rate-v1',KB='acn-bm-v1',KT='acn-time-v1',KH='acn-hist-v1';
function ld(k,d){try{var v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
function day(o){var d=o?new Date(o):new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function addDays(n){var d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return day(d)}
/* 復習の間隔（日）：理解度ごとに段階が進むと間隔が延びる */
var IV={1:[1,1,1,1],2:[3,7,14,30],3:[7,21,60,120]};
var T={
 ja:{fab:'ノート',ttl:'学習ノート',rate:'理解度',r:['もう一度読む','だいたい理解','よく理解'],next:'次の復習',none:'まだ評価していません',bm:'ブックマーク',bmOn:'ブックマーク済み',memo:'メモ',ph:'気づいたこと、職場で確かめること、自分の言葉でのまとめ…\n（入力すると自動で保存されます）',saved:'保存しました',saveErr:'保存できませんでした（端末の容量）',chars:'文字',quote:'選んだ文を引用',noSel:'本文の文章を選んでから押してください',all:'私の学習ノートを開く →',dev:'この端末のブラウザにだけ保存されます。別の端末に移すときは「私の学習ノート」のバックアップを使います。',time:'このレッスンの学習時間',close:'閉じる',min:'分'},
 ko:{fab:'노트',ttl:'학습 노트',rate:'이해도',r:['다시 읽기','대체로 이해','완전히 이해'],next:'다음 복습',none:'아직 평가하지 않았습니다',bm:'북마크',bmOn:'북마크함',memo:'메모',ph:'알게 된 점, 현장에서 확인할 것, 내 말로 정리한 내용…\n(입력하면 자동으로 저장됩니다)',saved:'저장했습니다',saveErr:'저장하지 못했습니다(기기 저장 공간)',chars:'자',quote:'선택한 문장 인용',noSel:'본문 문장을 선택한 뒤 누르세요',all:'내 학습 노트 열기 →',dev:'이 기기의 브라우저에만 저장됩니다. 다른 기기로 옮길 때는 「내 학습 노트」의 백업을 사용하세요.',time:'이 레슨의 학습 시간',close:'닫기',min:'분'},
 en:{fab:'Notes',ttl:'Study notes',rate:'Understanding',r:['Read again','Mostly clear','Fully clear'],next:'Next review',none:'Not rated yet',bm:'Bookmark',bmOn:'Bookmarked',memo:'Notes',ph:'What you noticed, what to check at work, a summary in your own words…\n(Saved automatically as you type)',saved:'Saved',saveErr:'Could not save (device storage full)',chars:'chars',quote:'Quote selected text',noSel:'Select text in the lesson first',all:'Open my study notebook →',dev:'Saved only in this browser on this device. To move to another device, use the backup in My Study Notebook.',time:'Time on this lesson',close:'Close',min:'min'}};
function L(){var l=(document.documentElement.lang||m[1]).slice(0,2);return T[l]?l:m[1]}
function E(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

/* 最近見たレッスン */
(function(){var h=ld(KH,[]);if(!Array.isArray(h))h=[];h=h.filter(function(x){return x&&x.k!==KEY});h.unshift({k:KEY,t:Date.now()});sv(KH,h.slice(0,30))})();

/* 学習時間：画面が見えていて、2分以内に操作があったときだけ15秒ずつ足す */
var lastAct=Date.now();['scroll','keydown','mousemove','touchstart','click'].forEach(function(ev){window.addEventListener(ev,function(){lastAct=Date.now()},{passive:true})});
setInterval(function(){if(document.visibilityState!=='visible'||Date.now()-lastAct>120000)return;
 var t=ld(KT,{}),d=day();t[d]=t[d]||{};t[d][KEY]=(t[d][KEY]||0)+15;
 var ks=Object.keys(t).sort();while(ks.length>180){delete t[ks.shift()]}sv(KT,t);if(open)upTime()},15000);
function secOf(){var t=ld(KT,{}),s=0;for(var d in t)s+=t[d][KEY]||0;return s}

/* 選ばれた文（本文の中だけ）を覚えておく。ボタンを押すと選択が消える端末があるため */
var lastSel='';
document.addEventListener('selectionchange',function(){var s=window.getSelection&&window.getSelection();if(!s||s.isCollapsed)return;var n=s.anchorNode;var mainEl=document.getElementById('main')||document.querySelector('main');if(mainEl&&n&&mainEl.contains(n)){var tx=String(s).replace(/\s+/g,' ').trim();if(tx)lastSel=tx.slice(0,600)}});

var css='.acn-nfab{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9000;display:flex;align-items:center;gap:6px;padding:12px 16px;border:0;border-radius:999px;background:#0f3558;color:#fff;font:700 14px/1 system-ui,sans-serif;box-shadow:0 8px 24px rgba(9,28,47,.28);cursor:pointer}'+
'.acn-nfab:hover{background:#1769e0}.acn-nfab .acn-dot{width:8px;height:8px;border-radius:50%;background:#FFD23F;display:none}.acn-nfab.has .acn-dot{display:inline-block}'+
'.nv-fab .acn-nfab{position:static;box-shadow:0 2px 8px rgba(9,28,47,.18);padding:9px 13px;font-size:13px;background:#0f3558!important;color:#fff!important;border:1px solid #0f3558!important;border-radius:999px!important}.nv-fab .acn-nfab:hover{background:#1769e0!important}'+
'.acn-nbg{position:fixed;inset:0;background:rgba(9,28,47,.35);z-index:10001;display:none}.acn-nbg.on{display:block}'+
'.acn-np{position:fixed;top:0;right:0;height:100%;width:min(420px,100%);background:#fff;z-index:10002;box-shadow:-12px 0 40px rgba(9,28,47,.2);transform:translateX(105%);transition:transform .22s ease;display:flex;flex-direction:column;font:15px/1.6 system-ui,"Noto Sans JP","Noto Sans KR",sans-serif;color:#1d2b3a}'+
'.acn-np.on{transform:none}'+
'@media(max-width:699px){.acn-np{top:auto;bottom:0;height:auto;max-height:88vh;width:100%;border-radius:18px 18px 0 0;transform:translateY(105%);box-shadow:0 -12px 40px rgba(9,28,47,.2)}.acn-np.on{transform:none}}'+
'.acn-np .snb-hd{display:flex;align-items:flex-start;gap:10px;padding:16px 18px 12px;border-bottom:1px solid #e3e8ee}.acn-np .snb-hd b{display:block;font-size:12px;color:#5b6b7d;letter-spacing:.04em}.acn-np .snb-hd h3{margin:2px 0 0;font-size:16px;line-height:1.4}'+
'.acn-np .snb-x{margin-left:auto;border:1px solid #d6dde5;background:#fff;border-radius:10px;padding:6px 10px;cursor:pointer;font-size:13px}'+
'.acn-np .snb-bd{padding:14px 18px 18px;overflow:auto;flex:1}'+
'.acn-np .snb-lb{font-size:12px;font-weight:700;color:#5b6b7d;margin:14px 0 6px;letter-spacing:.03em}.acn-np .snb-lb:first-child{margin-top:0}'+
'.acn-np .snb-rt{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.acn-np .snb-rt button{border:1.5px solid #d6dde5;background:#fff;border-radius:10px;padding:9px 4px;font-weight:600;font-size:13px;line-height:1.3;font-family:inherit;cursor:pointer;color:#1d2b3a}'+
'.acn-np .snb-rt button.on1{background:#FDECEC;border-color:#D64545;color:#A12C2C}.acn-np .snb-rt button.on2{background:#FFF4E0;border-color:#E08A2E;color:#94560F}.acn-np .snb-rt button.on3{background:#E5F5EF;border-color:#1F7A6E;color:#155A51}'+
'.acn-np .snb-nx{font-size:13px;color:#5b6b7d;margin-top:6px}'+
'.acn-np .snb-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.acn-np .snb-bm{border:1.5px solid #d6dde5;background:#fff;border-radius:10px;padding:8px 12px;font-weight:600;font-size:13px;font-family:inherit;cursor:pointer}.acn-np .snb-bm.on{background:#FFF7D6;border-color:#E0B000}'+
'.acn-np textarea{width:100%;box-sizing:border-box;min-height:220px;resize:vertical;border:1.5px solid #d6dde5;border-radius:12px;padding:12px;font-size:15px;line-height:1.7;font-family:inherit;color:#1d2b3a}.acn-np textarea:focus{outline:none;border-color:#1769e0;box-shadow:0 0 0 3px rgba(23,105,224,.12)}'+
'.acn-np .snb-tl{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:6px 0;font-size:12px;color:#5b6b7d}.acn-np .snb-q{border:1px solid #d6dde5;background:#F4F7FB;border-radius:8px;padding:6px 10px;font-weight:600;font-size:12px;font-family:inherit;cursor:pointer}'+
'.acn-np .snb-ok{color:#1F7A6E}.acn-np .snb-er{color:#D64545}'+
'.acn-np .snb-ft{padding:12px 18px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid #e3e8ee;font-size:12px;color:#5b6b7d}.acn-np .snb-ft a{display:inline-block;margin-bottom:6px;font-weight:700;color:#1769e0;text-decoration:none;font-size:14px}'+
'@media print{.acn-nfab,.acn-np,.acn-nbg{display:none!important}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

var fab=document.createElement('button');fab.type='button';fab.className='acn-nfab';fab.setAttribute('aria-haspopup','dialog');
var bg=document.createElement('div');bg.className='acn-nbg';
var pn=document.createElement('div');pn.className='acn-np';pn.setAttribute('role','dialog');pn.setAttribute('aria-modal','true');
document.body.appendChild(bg);document.body.appendChild(pn);
/* 画面右下のボタンの列（nav.js の .nv-fab：ホーム・上へ など）があれば、その一番上に並べる。なければ単独で右下に置く */
(function mount(n){var host=document.querySelector('.nv-fab');if(host){host.insertBefore(fab,host.firstChild);return}if(n>0)return setTimeout(function(){mount(n-1)},150);document.body.appendChild(fab)})(20);
var open=false,tmr=null;
function hasNote(){var n=ld(KN,{})[KEY];return !!(n&&n.t&&n.t.trim())}
function paintFab(){var t=T[L()];fab.innerHTML='<span aria-hidden="true">📝</span>'+E(t.fab)+'<span class="acn-dot"></span>';fab.classList.toggle('has',hasNote()||!!ld(KR,{})[KEY]);fab.setAttribute('aria-label',t.ttl)}
function title(){var h=document.getElementById('title')||document.querySelector('h1');return h?h.textContent.trim():KEY}
function upTime(){var el=pn.querySelector('#snb-tm');if(el)el.textContent=Math.max(0,Math.round(secOf()/60))+' '+T[L()].min}
function render(){var t=T[L()],n=ld(KN,{})[KEY]||{t:'',u:0},r=ld(KR,{})[KEY],b=!!ld(KB,{})[KEY];
 pn.setAttribute('aria-label',t.ttl);
 pn.innerHTML='<div class="snb-hd"><div><b>'+E(m[2].toUpperCase()+' '+m[3])+' · '+E(t.ttl)+'</b><h3>'+E(title())+'</h3></div><button type="button" class="snb-x" id="snb-x">'+E(t.close)+'</button></div>'+
 '<div class="snb-bd"><div class="snb-lb">'+E(t.rate)+'</div><div class="snb-rt">'+[1,2,3].map(function(i){return '<button type="button" data-r="'+i+'" class="'+(r&&r.r===i?'on'+i:'')+'">'+E(t.r[i-1])+'</button>'}).join('')+'</div>'+
 '<div class="snb-nx">'+(r?E(t.next)+'：<b>'+E(r.n)+'</b>':E(t.none))+'</div>'+
 '<div class="snb-lb">'+E(t.bm)+'</div><div class="snb-row"><button type="button" class="snb-bm'+(b?' on':'')+'" id="snb-bm">★ '+E(b?t.bmOn:t.bm)+'</button><span class="snb-nx" style="margin:0">'+E(t.time)+'：<b id="snb-tm"></b></span></div>'+
 '<div class="snb-lb">'+E(t.memo)+'</div><div class="snb-tl"><button type="button" class="snb-q" id="snb-q">❝ '+E(t.quote)+'</button><span id="snb-st"></span></div>'+
 '<textarea id="snb-tx" placeholder="'+E(t.ph)+'">'+E(n.t)+'</textarea><div class="snb-tl"><span id="snb-cc"></span><span></span></div></div>'+
 '<div class="snb-ft"><a href="'+STUDY+'?lang='+L()+'">'+E(t.all)+'</a><div>'+E(t.dev)+'</div></div>';
 var tx=pn.querySelector('#snb-tx'),stEl=pn.querySelector('#snb-st'),cc=pn.querySelector('#snb-cc');
 function count(){cc.textContent=tx.value.length+' '+t.chars}count();upTime();
 function save(){var all=ld(KN,{});if(tx.value.trim())all[KEY]={t:tx.value,u:Date.now()};else delete all[KEY];
  if(sv(KN,all)){var d=new Date();stEl.className='snb-ok';stEl.textContent='✓ '+t.saved+' '+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}else{stEl.className='snb-er';stEl.textContent=t.saveErr}paintFab()}
 tx.addEventListener('input',function(){count();clearTimeout(tmr);tmr=setTimeout(save,600)});
 tx.addEventListener('blur',function(){clearTimeout(tmr);save()});
 pn.querySelector('#snb-q').addEventListener('click',function(){if(!lastSel){stEl.className='snb-er';stEl.textContent=t.noSel;return}
  var add='❝ '+lastSel+' ❞\n';tx.value=(tx.value&&!/\n$/.test(tx.value)?tx.value+'\n':tx.value)+add;count();save();tx.focus();tx.selectionStart=tx.selectionEnd=tx.value.length});
 pn.querySelector('#snb-x').addEventListener('click',close);
 pn.querySelectorAll('.snb-rt button').forEach(function(btn){btn.addEventListener('click',function(){var i=+btn.getAttribute('data-r'),all=ld(KR,{}),o=all[KEY]||{s:0};
  var s=(i===1||o.r!==i)?0:Math.min(o.s+1,3);var ivs=IV[i];all[KEY]={r:i,s:s,d:day(),n:addDays(ivs[Math.min(s,ivs.length-1)])};sv(KR,all);render();paintFab()})});
 pn.querySelector('#snb-bm').addEventListener('click',function(){var all=ld(KB,{});if(all[KEY])delete all[KEY];else all[KEY]=Date.now();sv(KB,all);render()});
}
function show(){open=true;render();pn.classList.add('on');bg.classList.add('on');setTimeout(function(){var x=pn.querySelector('#snb-tx');if(x&&window.innerWidth>=700)x.focus()},230)}
function close(){var x=pn.querySelector('#snb-tx');if(x)x.blur();open=false;pn.classList.remove('on');bg.classList.remove('on');paintFab();fab.focus()}
fab.addEventListener('click',function(){open?close():show()});
bg.addEventListener('click',close);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open)close()});
/* 言語を切り替えたらボタンの言葉も変える */
new MutationObserver(function(){paintFab();if(open)render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
/* 別のタブで変わったら反映 */
window.addEventListener('storage',function(e){if([KN,KR,KB].indexOf(e.key)>=0){paintFab();if(open&&document.activeElement!==pn.querySelector('#snb-tx'))render()}});
paintFab();
})();
