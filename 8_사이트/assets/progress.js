/* レッスンの「完了」ボタン（2026.10）：私の学習プラン（plan.html）と同じ記録（localStorage の acn-done-v1）に書く。
   acn_shell.js がレッスンのページ（/ja|ko|en/講座/番号/）でだけ読み込む */
(function(){
if(/jsdom/i.test(navigator.userAgent))return;/* ビルドの下書きでは付けない */
var m=decodeURIComponent(location.pathname).match(/\/(ja|ko|en)\/([a-z]+)\/([\d]+-[\d]+)\/?(index\.html)?$/);if(!m)return;
var KD='acn-done-v1',KP='acn-plan-v1',key=m[2]+'/'+m[3],me=document.currentScript&&document.currentScript.src;
var PLAN=me?new URL('../plan.html',me).href:'#';
var T={ja:{q:'このレッスンを読み終えましたか？',b:'完了にする',d:'✓ 完了しました',u:'取り消す',p:'私の学習プランへ →',n:'プランの次のレッスン'},
 ko:{q:'이 레슨을 다 읽었나요?',b:'완료로 표시',d:'✓ 완료했습니다',u:'취소',p:'내 학습 플랜으로 →',n:'플랜의 다음 레슨'},
 en:{q:'Finished this lesson?',b:'Mark as done',d:'✓ Done',u:'Undo',p:'My learning plan →',n:'Next in your plan'}};
function L(){var l=(document.documentElement.lang||m[1]).slice(0,2);return T[l]?l:m[1]}
function ld(k,d){try{return JSON.parse(localStorage.getItem(k)||'null')||d}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var css='.acn-done{max-width:660px;margin:28px auto 8px;box-sizing:border-box;padding:18px 20px;border:1px solid #dfe4e8;border-radius:16px;background:#fff;display:flex;flex-wrap:wrap;gap:12px;align-items:center;font-family:Inter,"Noto Sans JP","Noto Sans KR",sans-serif}'+
 '.acn-done .acn-dq{flex:1;min-width:200px;font-weight:800;color:#182431}.acn-done button{border:0;border-radius:10px;padding:11px 16px;font-weight:800;cursor:pointer;background:#147d64;color:#fff;font-size:14px}'+
 '.acn-done button.acn-u{background:#fff;color:#65717e;border:1px solid #dfe4e8}.acn-done a{font-weight:800;color:#1769e0;font-size:14px;text-decoration:none}'+
 '.acn-done .acn-ok{color:#147d64;font-weight:900}.acn-done .acn-nx{width:100%;font-size:13px;color:#65717e}.acn-done .acn-nx a{font-size:13px}@media print{.acn-done{display:none}}';
function draw(box){var t=T[L()],done=ld(KD,{}),on=!!done[key],plan=ld(KP,null),nx='';
 if(on&&plan&&window.SEARCH_INDEX){/* 次のレッスンは plan.html と同じ並び（講座の順・Part の範囲）で探す */
  var I=SEARCH_INDEX.l||[],seq=[];(plan.steps||[]).forEach(function(s){var lc=s.c.toLowerCase();I.forEach(function(x){if(x[0]!==lc)return;var k=x[1].split('-')[0];if((!s.p&&!s.n)||(s.p&&s.p.indexOf(k)>=0)||(s.n&&s.n.indexOf(x[1])>=0))seq.push(x)})});
  var r=seq.filter(function(x){return !done[x[0]+'/'+x[1]]})[0];var li=L()==='ja'?2:L()==='ko'?3:4;
  if(r)nx='<div class="acn-nx">'+t.n+'：<a href="../../'+r[0]+'/'+r[1]+'/">'+r[1]+' '+String(r[li]).replace(/</g,'&lt;')+'</a></div>'}
 box.innerHTML=on?'<span class="acn-dq acn-ok">'+t.d+'</span><button type="button" class="acn-u">'+t.u+'</button><a href="'+PLAN+'">'+t.p+'</a>'+nx
  :'<span class="acn-dq">'+t.q+'</span><button type="button">'+t.b+'</button><a href="'+PLAN+'">'+t.p+'</a>';
 box.querySelector('button').onclick=function(){var d=ld(KD,{});if(on)delete d[key];else d[key]=Date.now();sv(KD,d);draw(box)}}
function init(){if(document.querySelector('.acn-done'))return;var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 var box=document.createElement('div');box.className='acn-done';var f=document.getElementById('foot')||document.querySelector('footer');
 if(f&&f.parentNode)f.parentNode.insertBefore(box,f);else document.body.appendChild(box);
 if(!window.SEARCH_INDEX&&me){var s=document.createElement('script');s.src=new URL('../../search_index.js',me).href;s.onload=function(){draw(box)};document.head.appendChild(s)}
 draw(box);new MutationObserver(function(){var t=T[L()];if(box.textContent.indexOf(t.p)<0)draw(box)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
