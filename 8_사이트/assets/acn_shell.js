/* サイト共通の頭とフッター（新しいデザイン v3・2026.10 第1段階）
   nav.js が読み込む。一般のページ（site.js）・講座の目次（hub.js）・レッスン（article.js）に、
   index.html と同じメニュー・言語の切り替え・フッターを付け、古い頭の行とフッターを隠す。
   ・言語のボタンは、ページにもともとある言語ボタン（data-l）を押す。ページの描き直しの仕組みはそのまま使う
   ・表示中の言語は <html lang> を見て合わせる
   ・対象外：トップページ index.html・business.html・jobs.html（自分で同じ頭を持つ）、
     資料・ツール（shell.js のページ）とコミュニティにも付ける（2026.10） */
(function(){
if(window.__ACN_SHELL)return;window.__ACN_SHELL=1;
var me=document.currentScript&&document.currentScript.src||'';if(!me)return;
var SITE=new URL('../',me).href; /* 8_사이트/ */
function U(p){return new URL(p,SITE).href}
var path=decodeURIComponent(location.pathname);
var HOME=U('index.html');window.ACN_HOME=HOME;
/* 日本語の改行（語の途中で切らない）：ja_wrap.js */
(function(){var w=document.createElement('script');w.src=new URL('ja_wrap.js',me).href;document.head.appendChild(w)})();
/* ロゴ（マーク＋Aviation Career Note）：acn_logo.js。読み込めたら頭とフッターを描き直す 2026.10 */
(function(){if(window.ACN_LOGO)return;var g=document.createElement('script');g.src=new URL('acn_logo.js',me).href;g.onload=function(){if(hd){last='';draw()}};document.head.appendChild(g)})();
/* レッスンの「完了」ボタン（私の学習プランと共通の記録）：progress.js 2026.10 */
if(/\/(ja|ko|en)\/[a-z]+\/\d+-\d+\/?(index\.html)?$/.test(path)&&!/jsdom/i.test(navigator.userAgent)){var pg=document.createElement('script');pg.src=new URL('progress.js',me).href;document.head.appendChild(pg);
 /* 私の学習ノート（メモ・理解度・復習・ブックマーク・学習時間）：notes.js 2026.10 */
 var nt=document.createElement('script');nt.src=new URL('notes.js',me).href;document.head.appendChild(nt)}
var C={
ja:{brand:'航空キャリアノート',nav:['学ぶ','会社実務','練習ツール','求人','コーチング','コミュニティ'],mem:'メンバーシップ',foot:['航空の専門知識から、求人・コーチング・コミュニティまで。','航空の外でも役立つ、仕事の知識を。'],copy:'© 2026 航空キャリアノート　無断転載・複製禁止',terms:'利用規約',privacy:'プライバシーポリシー',notice:'内容の扱いと免責'},
ko:{brand:'항공 커리어 노트',nav:['학습','회사 실무','연습 도구','채용','코칭','커뮤니티'],mem:'멤버십',foot:['항공 전문 지식에서 채용, 코칭, 커뮤니티까지.','항공 밖에서도 쓰이는 실무 지식을.'],copy:'© 2026 항공 커리어 노트　무단 전재·복제 금지',terms:'이용약관',privacy:'개인정보 처리방침',notice:'콘텐츠 이용 안내·면책'},
en:{brand:'Aviation Career Note',nav:['Learn','Business Skills','Practice','Jobs','Coaching','Community'],mem:'Membership',foot:['From aviation knowledge to jobs, coaching and community.','Professional Knowledge beyond Aviation.'],copy:'© 2026 Aviation Career Note. All rights reserved.',terms:'Terms of use',privacy:'Privacy policy',notice:'Content notice'}};
var NAV=[['index.html#learn','learn'],['business.html','business'],['index.html#practice','practice'],['jobs.html','jobs'],['index.html#coaching','coaching'],['../community/index.html','community']];
/* フッターの項目：[日本語, 韓国語, 英語]（2026.10 日本語・韓国語の画面に英語が多すぎたので、言語ごとの名前に） */
var FOOT=[[['学ぶ','학습','Learn'],[['index.html#learn',['講座','강좌','Courses']],['plan.html',['私の学習プラン','내 학습 플랜','My Learning Plan']],['study.html',['私の学習ノート','내 학습 노트','My Study Notebook']],['guide.html',['学び方ガイド','학습 가이드','Study Guide']],['index.html#practice',['練習ツール','연습 도구','Practice Lab']]]],
 [['会社実務','회사 실무','Business'],[['../23_재무3표실무/00_シリーズ全体_財務3表.html',['財務','재무','Finance']],['../12_일본지점인사재무실무/00_シリーズ全体_人事財務実務.html',['人事・総務','인사·총무','HR & Admin']],['../15_지점장인수인계가이드/00_シリーズ全体_引き継ぎガイド.html',['管理職','관리자','Management']]]],
 [['キャリア','커리어','Career'],[['jobs.html',['求人','채용','Jobs']],['../5_면접대비가이드/00_シリーズ全体_面接対策.html',['面接対策','면접 대비','Interview']],['index.html#coaching',['コーチング','코칭','Coaching']]]],
 [['つながる','소통','Connect'],[['../community/index.html',['コミュニティ','커뮤니티','Community']],['about.html',['このサイトについて','사이트 소개','About ACN']],['sources.html',['内容の扱い','콘텐츠 정책','Content Policy']]]]];
function FL(x,l){return typeof x==='string'?x:x[{ja:0,ko:1,en:2}[l]||0]}
/* いまのページがどの項目か（メニューの色を変える） */
var cur=/8_사이트\/jobs\.html$/.test(path)?'jobs':(/\/(ja|ko|en)\/[a-z]+\/[\d-]+\/?$/.test(path)||/view\.html$/.test(path)||/00_シリーズ全体_/.test(path))?'learn':'';
function E(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function L(){var l=(document.documentElement.getAttribute('data-ui')||document.documentElement.lang||'ja').slice(0,2);return C[l]?l:'ja'}

var CSS='@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap");'+
/* 古い頭の行とフッターを隠す（中身の仕組みは残す） */
'#siteTop,.wrap>.top,.board-top,#siteFoot,footer#foot{display:none!important}'+
'.acn-hd{position:relative;z-index:50;background:#fff;border-bottom:1px solid #dfe4e8;font-family:Inter,"Noto Sans JP","Noto Sans KR",system-ui,sans-serif;line-height:1.5}'+
'.acn-hd *{box-sizing:border-box}'+
'.acn-in{max-width:1200px;margin:auto;min-height:72px;padding:10px 24px;display:flex;align-items:center;gap:26px}'+
'.acn-brand{display:inline-flex;align-items:center;flex:none;white-space:nowrap;color:#091c2f!important;text-decoration:none!important;font-weight:800;font-size:18px;letter-spacing:-.02em}'+
'.acn-menu{display:flex;gap:22px;flex:1;font-size:14px}.acn-menu a{color:#4e5966!important;text-decoration:none!important}.acn-menu a:hover,.acn-menu a.on{color:#1769e0!important}.acn-menu a.on{font-weight:800}'+
'.acn-act{display:flex;align-items:center;gap:10px}'+
'.acn-pill{border:1px solid #dfe4e8;border-radius:999px;padding:4px 6px;font-size:12px;color:#4f5e69;display:inline-flex;align-items:center;gap:2px}'+
'.acn-pill button{border:0;background:transparent;color:#4f5e69;font:inherit;font-size:12px;padding:3px 5px;border-radius:999px;cursor:pointer;min-height:0;min-width:0}'+
'.acn-pill button.on{color:#1769e0;font-weight:800}.acn-pill i{font-style:normal;opacity:.5}'+
'.acn-cta{display:inline-flex;align-items:center;background:#1769e0;color:#fff!important;border-radius:10px;padding:10px 15px;text-decoration:none!important;font-weight:800;font-size:13px}'+
'.acn-crumb{max-width:1200px;margin:0 auto;padding:12px 24px 0;font:600 13px Inter,"Noto Sans JP","Noto Sans KR",sans-serif}.acn-crumb a{color:#1769e0!important;text-decoration:none}.acn-crumb a::before{content:"\\2190  "}.acn-crumb .pict{display:none}.acn-crumb .series{display:inline;font:inherit}'+
'.acn-ft{background:#081828;color:#fff!important;max-width:none!important;margin:60px 0 0!important;padding:52px 24px 40px!important;font-size:14px!important;font-family:Inter,"Noto Sans JP","Noto Sans KR",system-ui,sans-serif;line-height:1.6}'+
/* ページの CSS の footer{max-width…}・header{…} に引きずられないように */
'.acn-hd{max-width:none!important;margin:0!important;padding:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#182431!important}'+
'.acn-ft-in{max-width:1200px;margin:auto;display:grid;grid-template-columns:2fr repeat(4,1fr);gap:26px}'+
'.acn-ft b{display:block;margin-bottom:10px;color:#fff}.acn-ft p,.acn-ft a{display:block;color:#9fb0bf!important;font-size:12px;margin:6px 0;text-decoration:none!important}.acn-ft a:hover{color:#fff!important}'+
'.acn-copy{max-width:1200px;margin:28px auto 0;font-size:11px;color:#6f8394}.acn-copy a{display:inline!important;margin:0 0 0 10px!important}'+
/* 右下のボタン（nav.js）を新しいデザインに合わせる */
'.nv-fab button{background:#fff!important;color:#182431!important;border:1px solid #dfe4e8!important;border-radius:10px!important;font-family:Inter,"Noto Sans JP","Noto Sans KR",sans-serif!important;font-weight:700!important;box-shadow:0 8px 22px rgba(9,28,47,.10)!important}'+
'.nv-fab button:hover{border-color:#9bbbf0!important;color:#1769e0!important}'+
'@media(max-width:980px){.acn-in{flex-wrap:wrap;padding:12px 18px;gap:10px 14px}.acn-menu{order:3;flex:1 1 100%;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:13px}.acn-menu a{border:1px solid #dfe4e8;border-radius:9px;padding:7px 4px;text-align:center;background:#fff}.acn-act{margin-left:auto}.acn-ft-in{grid-template-columns:1fr 1fr}}'+
'@media(max-width:600px){.acn-brand{font-size:16px}.acn-cta{padding:9px 12px}.acn-ft-in{grid-template-columns:1fr}.acn-crumb{padding:10px 16px 0}}'+
/* 資料・ツールのページ（shell.js）：ロゴと言語ボタンは新しい頭にまとめ、「資料・ツール › このページ」だけ残す */
'.shbar .shbrand,.shbar .shlang{display:none!important}.shbar{margin:14px 0 10px!important}.shcrumb{font-family:Inter,"Noto Sans JP","Noto Sans KR",sans-serif!important;font-size:13px!important}.shcrumb a{color:#1769e0!important}'+
'@media print{.acn-hd,.acn-ft,.acn-crumb{display:none!important}}';

var hd,ft,crumb,last='';
function draw(){var l=L();if(l===last&&hd)return;last=l;var c=C[l];
 hd.innerHTML='<div class="acn-in" role="navigation" aria-label="menu"><a class="acn-brand" href="'+HOME+'" aria-label="Aviation Career Note">'+(window.ACN_LOGO?ACN_LOGO.lockup():'Aviation Career Note')+'</a><div class="acn-menu">'+NAV.map(function(n,i){return '<a href="'+U(n[0])+'"'+(n[1]===cur?' class="on" aria-current="page"':'')+'>'+E(c.nav[i])+'</a>'}).join('')+'</div><div class="acn-act"><span class="acn-pill" role="group" aria-label="Language">'+[['ko','KO'],['ja','JA'],['en','EN']].map(function(x,i){return (i?'<i>/</i>':'')+'<button type="button" data-al="'+x[0]+'" class="'+(x[0]===l?'on':'')+'" aria-pressed="'+(x[0]===l)+'">'+x[1]+'</button>'}).join('')+'</span><a class="acn-cta" href="'+U('account.html')+'">'+E(c.mem)+'</a></div></div>';
 Array.prototype.forEach.call(hd.querySelectorAll('button[data-al]'),function(b){b.onclick=function(){setLang(b.getAttribute('data-al'))}});
 ft.innerHTML='<div class="acn-ft-in"><div>'+(window.ACN_LOGO?'<a class="acn-ftb" href="'+HOME+'" aria-label="Aviation Career Note">'+ACN_LOGO.lockup({dark:true})+'</a>'+(l==='en'?'':'<p>'+E(c.brand)+'</p>'):'<b>'+E(c.brand)+'</b>')+c.foot.map(function(p){return '<p>'+E(p)+'</p>'}).join('')+'</div>'+FOOT.map(function(f){return '<div><b>'+E(FL(f[0],l))+'</b>'+f[1].map(function(a){return '<a href="'+U(a[0])+'">'+E(FL(a[1],l))+'</a>'}).join('')+'</div>'}).join('')+'</div><div class="acn-copy">'+E(c.copy)+'<a href="'+U('terms.html')+'">'+E(c.terms)+'</a><a href="'+U('privacy.html')+'">'+E(c.privacy)+'</a><a href="'+U('notice.html')+'">'+E(c.notice)+'</a></div>';}
/* ページにもともとある言語ボタンを押す（無ければ ?lang= を付けて読み直す） */
function setLang(l){var b=document.querySelector('#siteLang button[data-l="'+l+'"],#langs button[data-l="'+l+'"],#langGroup button[data-l="'+l+'"],#lang button[data-l="'+l+'"],.shlang button[data-l="'+l+'"]');
 if(b){b.click();setTimeout(draw,0);return}
 try{localStorage.setItem('art-lang',l)}catch(e){}var u=new URL(location.href);u.searchParams.set('lang',l);location.href=u.href}
function init(){if(document.querySelector('.acn-hd')||document.getElementById('navlinks'))return;
 if(window.__SHELL||/\/community\//.test(path))cur=window.__SHELL?'practice':'community';
 var st=document.createElement('style');st.id='acn-shell-css';st.textContent=CSS;document.head.appendChild(st);
 hd=document.createElement('header');hd.className='acn-hd';document.body.insertBefore(hd,document.body.firstChild);
 /* レッスン：講座の目次へ戻るリンク（もとの頭の行にあったもの）を、新しい頭の下に移す */
 var sr=document.getElementById('series');if(sr){crumb=document.createElement('div');crumb.className='acn-crumb';crumb.appendChild(sr);hd.parentNode.insertBefore(crumb,hd.nextSibling)}
 ft=document.createElement('footer');ft.className='acn-ft';document.body.appendChild(ft);
 draw();
 new MutationObserver(function(){draw()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
