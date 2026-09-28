/* 会員システムの共通モジュール（2026-09）
   ・Supabase の認証（メールのマジックリンク・Google）と、会員ごとの記録の保存
   ・設定は 8_사이트/assets/member_config.js（url, anonKey）。空なら何も表示しない
   ・上部バー（講座側 shell.js の .shbar／サイト側 site.js の #siteTop）に「ログイン／ニックネーム」のボタンを足す
   使い方：
     window.Member.enabled()            設定があるか
     window.Member.onChange(fn)         ログイン状態が分かったとき／変わったときに fn(user, profile) を呼ぶ
     window.Member.user() / profile()   今の会員（未ログインなら null）
     window.Member.login() / logout()
     window.Member.loadRecords()        study_records を全部読む → [{item_id, ok, marked, answered_at}]
     window.Member.saveRecords(rows)    study_records に upsert（rows: [{item_id, ok, marked, answered_at}]）
     window.Member.loadDoc(kind) / saveDoc(kind, data)   user_docs（JSONの保存。kind: 'story' など）
     window.Member.deleteAccount()      退会（本人の記録も削除） */
(function(){
if(window.Member)return;
var CFG=window.MEMBER_CONFIG||{},ON=!!(CFG.url&&CFG.anonKey);
var SB_SRC='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js';
var T={
ja:{login:'ログイン',logout:'ログアウト',account:'会員ページ',title:'ログイン・会員登録',lead:'無料です。メールアドレスだけで登録できます。',email:'メールアドレス',send:'ログイン用のリンクをメールで受け取る',sent:'メールを送りました。届いたメールのリンクを押すとログインできます（届かないときは迷惑メールを確認してください）。',google:'Googleで続ける',or:'または',nick:'ニックネーム（2〜20文字。掲示板などで表示されます）',nickSave:'決めて始める',nickHead:'ようこそ。ニックネームを決めてください',close:'閉じる',err:'うまくいきませんでした。しばらくしてからもう一度お試しください。',bad:'メールアドレスの形式を確認してください。',privacy:'登録すると、メールアドレス・ニックネーム・学習の記録を会員情報として保存します。詳しくは',pp:'プライバシーポリシー',welcome:'ログインしました'},
ko:{login:'로그인',logout:'로그아웃',account:'회원 페이지',title:'로그인·회원가입',lead:'무료입니다. 이메일 주소만으로 가입할 수 있습니다.',email:'이메일 주소',send:'로그인 링크를 메일로 받기',sent:'메일을 보냈습니다. 받은 메일의 링크를 누르면 로그인됩니다(오지 않으면 스팸함을 확인하세요).',google:'Google로 계속하기',or:'또는',nick:'닉네임(2~20자. 게시판 등에 표시됩니다)',nickSave:'정하고 시작하기',nickHead:'환영합니다. 닉네임을 정해 주세요',close:'닫기',err:'잘 되지 않았습니다. 잠시 후 다시 시도해 주세요.',bad:'이메일 주소 형식을 확인해 주세요.',privacy:'가입하면 이메일 주소·닉네임·학습 기록을 회원 정보로 저장합니다. 자세한 내용은',pp:'개인정보 처리방침',welcome:'로그인했습니다'},
en:{login:'Log in',logout:'Log out',account:'My page',title:'Log in or sign up',lead:'Free. All you need is an email address.',email:'Email address',send:'Email me a login link',sent:'We have sent you an email. Click the link in it to log in (check your spam folder if it does not arrive).',google:'Continue with Google',or:'or',nick:'Nickname (2–20 characters, shown on the community board)',nickSave:'Save and start',nickHead:'Welcome. Please choose a nickname',close:'Close',err:'Something went wrong. Please try again in a moment.',bad:'Please check the email address.',privacy:'When you sign up we store your email address, nickname and study records. See the',pp:'privacy policy',welcome:'You are logged in'}};
function lg(){var l=(document.documentElement.lang||'ja').slice(0,2);return T[l]?l:'ja'}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
/* サイトの最上位（8_사이트 の親）からの相対パスを求める：このスクリプトの src から */
var ROOT=(function(){try{var s=document.currentScript&&document.currentScript.src;if(!s)return '';var u=new URL(s);return u.href.replace(/1_[^/]+\/assets\/member\.js.*$/,'')}catch(e){return ''}})();
var sb=null,user=null,profile=null,listeners=[],ready=false,pending=[];
function fire(){listeners.forEach(function(f){try{f(user,profile)}catch(e){}})}
function css(){if(document.getElementById('mb-css'))return;var s=document.createElement('style');s.id='mb-css';s.textContent=
'.mb-btn{display:inline-flex;align-items:center;gap:6px;font:600 13px "Noto Sans JP","Noto Sans KR",sans-serif;border:1.5px solid #E3E9EF;border-radius:999px;padding:5px 12px;background:#fff;color:#22303F;text-decoration:none;cursor:pointer;white-space:nowrap;flex:none}.mb-btn:hover{border-color:#2F8FE0}.mb-btn.in{background:#EAF4FE;border-color:#BFDDF7;color:#1d5fa0}'+
'.mb-btn i{width:18px;height:18px;border-radius:50%;background:#2F8FE0;color:#fff;display:grid;place-items:center;font-size:11px;font-style:normal;font-weight:800}'+
'.mb-back{position:fixed;inset:0;background:rgba(20,30,40,.45);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px}'+
'.mb-box{background:#fff;color:#1d2a3a;border-radius:18px;max-width:420px;width:100%;padding:20px 20px 16px;box-shadow:0 20px 50px rgba(0,0,0,.25);font-family:"Noto Sans JP","Noto Sans KR",sans-serif;line-height:1.6}'+
'.mb-box h2{font-size:18px;margin:0 0 4px}.mb-box p{margin:6px 0;font-size:14px;color:#5b6b7d}.mb-box label{display:block;font-size:13px;font-weight:700;margin:12px 0 4px}'+
'.mb-box input{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px 12px;border:1.5px solid #E3E9EF;border-radius:10px}'+
'.mb-box .pri,.mb-box .sec{display:block;width:100%;box-sizing:border-box;margin-top:10px;padding:12px;border-radius:12px;font:700 15px inherit;cursor:pointer}'+
'.mb-box .pri{background:#1d5fa0;color:#fff;border:0}.mb-box .sec{background:#fff;color:#1d2a3a;border:1.5px solid #E3E9EF}.mb-box .sec svg{width:18px;height:18px;vertical-align:-4px;margin-right:6px}'+
'.mb-box .or{text-align:center;color:#8a97a6;font-size:12px;margin:12px 0 2px}.mb-box .x{float:right;border:0;background:transparent;font-size:20px;cursor:pointer;color:#5b6b7d;line-height:1}'+
'.mb-box .msg{font-size:14px;margin-top:10px;padding:10px 12px;border-radius:10px;background:#EAF4FE;color:#1d5fa0}.mb-box .msg.ng{background:#FDECEB;color:#a33}.mb-box .pp{font-size:12px;color:#8a97a6;margin-top:12px}.mb-box .pp a{color:#1d5fa0}'+
'@media (prefers-color-scheme:dark){.mb-box{background:#16212d;color:#e8eef5}.mb-box input{background:#0f1720;color:#e8eef5;border-color:#2a3a4c}.mb-box .sec{background:#0f1720;color:#e8eef5;border-color:#2a3a4c}.mb-btn{background:#16212d;color:#e8eef5;border-color:#2a3a4c}.mb-btn.in{background:#12324f;color:#9fcdf7}}';
document.head.appendChild(s)}
function loadSb(cb){if(window.supabase&&window.supabase.createClient)return cb();var s=document.createElement('script');s.src=SB_SRC;s.crossOrigin='anonymous';s.onload=cb;s.onerror=function(){ready=true;fire()};document.head.appendChild(s)}
function start(){
 if(!ON){ready=true;return}
 css();loadSb(function(){
  sb=window.supabase.createClient(CFG.url,CFG.anonKey);
  sb.auth.getSession().then(function(r){user=r.data.session?r.data.session.user:null;return loadProfile()}).then(function(){ready=true;fire();mount();if(user&&!profile)askNick()});
  sb.auth.onAuthStateChange(function(ev,session){var was=user&&user.id;user=session?session.user:null;if((user&&user.id)!==was){loadProfile().then(function(){fire();mount();if(user&&!profile)askNick();if(ev==='SIGNED_IN')toast(T[lg()].welcome)})}});
 });
 /* Google からの戻りなどで URL にトークンが付いていたら消す（supabase-js が読み取ったあと） */
 if(/access_token=|refresh_token=/.test(location.hash))setTimeout(function(){try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}},800);
}
function loadProfile(){profile=null;if(!user)return Promise.resolve();return sb.from('profiles').select('id,nickname,lang').eq('id',user.id).maybeSingle().then(function(r){profile=r.data||null})}
/* ---------- 上部バーのボタン ---------- */
function btnHtml(){var t=T[lg()];if(user){var n=profile?profile.nickname:(user.email||'').split('@')[0];return '<a class="mb-btn in" href="'+esc(ROOT+'8_사이트/account.html')+'"><i>'+esc(n.slice(0,1).toUpperCase())+'</i>'+esc(n)+'</a>'}return '<button type="button" class="mb-btn" data-mb="login">'+esc(t.login)+'</button>'}
function mount(){if(!ON)return;css();
 var host=document.querySelector('.shbar .shlang')||document.querySelector('#siteTop .in');if(!host)return;
 var el=host.querySelector('.mb-slot');if(!el){el=document.createElement('span');el.className='mb-slot';el.style.cssText='display:inline-flex;align-items:center;margin-left:8px';host.appendChild(el)}
 el.innerHTML=btnHtml();var b=el.querySelector('[data-mb=login]');if(b)b.onclick=openLogin}
function watch(){var tries=0,id=setInterval(function(){mount();if(++tries>40||document.querySelector('.mb-slot'))clearInterval(id)},250);
 var mo=new MutationObserver(function(){if(!document.querySelector('.mb-slot'))mount()});mo.observe(document.documentElement,{childList:true,subtree:true})}
/* ---------- ログインの窓 ---------- */
function box(inner){var back=document.createElement('div');back.className='mb-back';back.innerHTML='<div class="mb-box" role="dialog" aria-modal="true">'+inner+'</div>';document.body.appendChild(back);back.addEventListener('click',function(e){if(e.target===back)back.remove()});var x=back.querySelector('.x');if(x)x.onclick=function(){back.remove()};return back}
var GICON='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6C12.3 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg>';
function openLogin(){if(!sb)return;var t=T[lg()];
 var b=box('<button class="x" aria-label="'+esc(t.close)+'">×</button><h2>'+esc(t.title)+'</h2><p>'+esc(t.lead)+'</p><button type="button" class="sec" data-g>'+GICON+esc(t.google)+'</button><div class="or">'+esc(t.or)+'</div><label>'+esc(t.email)+'</label><input type="email" autocomplete="email" inputmode="email" placeholder="name@example.com"><button type="button" class="pri" data-e>'+esc(t.send)+'</button><div class="msg" hidden></div><p class="pp">'+esc(t.privacy)+' <a href="'+esc(ROOT+'8_사이트/privacy.html')+'" target="_blank" rel="noopener">'+esc(t.pp)+'</a></p>');
 var msg=b.querySelector('.msg'),inp=b.querySelector('input');
 function show(m,ng){msg.hidden=false;msg.textContent=m;msg.className='msg'+(ng?' ng':'')}
 b.querySelector('[data-g]').onclick=function(){sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.href.split('#')[0]}}).then(function(r){if(r.error)show(t.err,true)})};
 b.querySelector('[data-e]').onclick=function(){var v=(inp.value||'').trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){show(t.bad,true);return}
  sb.auth.signInWithOtp({email:v,options:{emailRedirectTo:location.href.split('#')[0]}}).then(function(r){if(r.error)show(t.err,true);else show(t.sent,false)})};
 setTimeout(function(){inp.focus()},50)}
function askNick(){var t=T[lg()];var b=box('<h2>'+esc(t.nickHead)+'</h2><label>'+esc(t.nick)+'</label><input type="text" maxlength="20" autocomplete="nickname"><button type="button" class="pri" data-n>'+esc(t.nickSave)+'</button><div class="msg ng" hidden></div>');
 var inp=b.querySelector('input'),msg=b.querySelector('.msg');
 b.querySelector('[data-n]').onclick=function(){var v=(inp.value||'').trim();if(v.length<2||v.length>20){msg.hidden=false;msg.textContent=t.nick;return}
  sb.from('profiles').upsert({id:user.id,nickname:v,lang:lg()}).then(function(r){if(r.error){msg.hidden=false;msg.textContent=t.err;return}profile={id:user.id,nickname:v,lang:lg()};b.remove();fire();mount()})}}
function toast(m){var d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#1d5fa0;color:#fff;padding:10px 18px;border-radius:999px;font:600 14px "Noto Sans JP",sans-serif;z-index:1001;box-shadow:0 8px 24px rgba(0,0,0,.2)';document.body.appendChild(d);setTimeout(function(){d.remove()},2600)}
/* ---------- 記録の読み書き ---------- */
function need(){if(!sb||!user)return Promise.reject(new Error('not logged in'))}
window.Member={
 enabled:function(){return ON},ready:function(){return ready},user:function(){return user},profile:function(){return profile},root:ROOT,lang:lg,
 onChange:function(f){listeners.push(f);if(ready)try{f(user,profile)}catch(e){}},
 login:openLogin,logout:function(){if(sb)return sb.auth.signOut().then(function(){location.reload()})},
 loadRecords:function(){if(!sb||!user)return Promise.resolve([]);return sb.from('study_records').select('item_id,ok,marked,answered_at').eq('user_id',user.id).limit(5000).then(function(r){return r.data||[]})},
 saveRecords:function(rows){if(!sb||!user||!rows.length)return Promise.resolve();var out=rows.map(function(x){return {user_id:user.id,item_id:x.item_id,ok:!!x.ok,marked:!!x.marked,answered_at:x.answered_at||new Date().toISOString()}});
  var p=Promise.resolve();for(var i=0;i<out.length;i+=500){(function(ch){p=p.then(function(){return sb.from('study_records').upsert(ch,{onConflict:'user_id,item_id'})})})(out.slice(i,i+500))}return p},
 loadDoc:function(kind){if(!sb||!user)return Promise.resolve(null);return sb.from('user_docs').select('data,updated_at').eq('user_id',user.id).eq('kind',kind).maybeSingle().then(function(r){return r.data||null})},
 saveDoc:function(kind,data){if(!sb||!user)return Promise.resolve();return sb.from('user_docs').upsert({user_id:user.id,kind:kind,data:data,updated_at:new Date().toISOString()},{onConflict:'user_id,kind'})},
 updateProfile:function(p){if(!sb||!user)return Promise.resolve();return sb.from('profiles').upsert(Object.assign({id:user.id},p)).then(function(r){if(!r.error){profile=Object.assign(profile||{id:user.id},p);fire();mount()}return r})},
 deleteAccount:function(){if(!sb||!user)return Promise.resolve();return sb.rpc('delete_me').then(function(r){if(r.error)throw r.error;return sb.auth.signOut()})},
 client:function(){return sb}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){start();watch()});else{start();watch()}
})();
