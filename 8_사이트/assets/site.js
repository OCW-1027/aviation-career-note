/* サイト共通の上部メニュー・フッター・言語切替（日本語・한국어・English）
   各ページは <body data-page="home|learn|tools|jobs|biz|about"> と、ページ固有の render(lang) 関数を持つ */
(function(){
var BASE=(document.currentScript&&document.currentScript.src)?new URL('../',document.currentScript.src).href:'';
function U(p){try{return BASE?new URL(p,BASE).href:p}catch(e){return p}}
var SITE={ja:{name:'航空キャリアノート',menu:[['index.html','home','ホーム'],['index.html#learn','learn','講座'],['guide.html','guide','学び方'],['index.html#tools','tools','資料・ツール'],['jobs.html','jobs','求人'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','企業の方へ'],['about.html','about','このサイトについて']],
 foot:[['about.html','このサイトについて'],['account.html','会員ページ'],['terms.html','利用規約'],['sources.html','出典と利用条件'],['privacy.html','プライバシーポリシー'],['../7_구인게재_기업용/求人掲載のご案内.html','求人掲載のご案内']],copy:'© 2026 航空キャリアノート　無断転載・複製禁止'},
ko:{name:'항공 커리어 노트',menu:[['index.html','home','홈'],['index.html#learn','learn','강좌'],['guide.html','guide','학습 가이드'],['index.html#tools','tools','자료실'],['jobs.html','jobs','구인'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','기업 담당자께'],['about.html','about','사이트 소개']],
 foot:[['about.html','사이트 소개'],['account.html','회원 페이지'],['terms.html','이용약관'],['sources.html','출처와 이용 조건'],['privacy.html','개인정보 처리방침'],['../7_구인게재_기업용/求人掲載のご案内.html','구인 게재 안내']],copy:'© 2026 항공 커리어 노트　무단 전재·복제 금지'},
en:{name:'Aviation Career Note',menu:[['index.html','home','Home'],['index.html#learn','learn','Courses'],['guide.html','guide','Study guide'],['index.html#tools','tools','Resources'],['jobs.html','jobs','Jobs'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','For employers'],['about.html','about','About']],
 foot:[['about.html','About this site'],['account.html','My page'],['terms.html','Terms of use'],['sources.html','Sources'],['privacy.html','Privacy policy'],['../7_구인게재_기업용/求人掲載のご案内.html','Post a job']],copy:'© 2026 Aviation Career Note. All rights reserved.'}};
/* 新しいトップページ（index_v2.html・business.html）の上部メニュー。ページで window.SITE_V2=1 のときだけ使う（2026.10 試作） */
var MENU2={ja:[['index_v2.html','home','ホーム'],['index_v2.html#learn','learn','航空の講座'],['business.html','business','Business Skills'],['index_v2.html#practice','tools','実習・ツール'],['jobs.html','jobs','求人'],['../community/index.html','community','コミュニティ'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','企業の方へ']],
ko:[['index_v2.html','home','홈'],['index_v2.html#learn','learn','항공 강좌'],['business.html','business','Business Skills'],['index_v2.html#practice','tools','실습·도구'],['jobs.html','jobs','채용'],['../community/index.html','community','커뮤니티'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','기업 담당자께']],
en:[['index_v2.html','home','Home'],['index_v2.html#learn','learn','Aviation courses'],['business.html','business','Business Skills'],['index_v2.html#practice','tools','Practice & tools'],['jobs.html','jobs','Jobs'],['../community/index.html','community','Community'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','For employers']]};
if(window.SITE_V2){['ja','ko','en'].forEach(function(l){SITE[l].menu=MENU2[l]})}
var LANGS=['ja','ko','en'],LBL={ja:'日本語',ko:'한국어',en:'English'};
/* 言語：?lang= → 保存した言語 → 端末の言語の順。決まった言語は保存する（2026.10） */
var lang='ja';try{var _q=(location.search.match(/[?&]lang=(ja|ko|en)/)||[])[1],_s=localStorage.getItem('art-lang');lang=_q||(LANGS.indexOf(_s)>=0?_s:(function(){var a=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];for(var i=0;i<a.length;i++){var c=String(a[i]).toLowerCase().slice(0,2);if(c==='ko'||c==='ja'||c==='en')return c}return a.length&&a[0]?'en':'ja'})());localStorage.setItem('art-lang',lang)}catch(e){}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var logo='<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect x="1" y="6" width="28" height="18" rx="4" fill="#2F8FE0"/><path d="M7 17l6-2 5-5 2 .6-3 5 5-1.5 1.4 1.2-6 3-8 1z" fill="#fff"/><circle cx="24" cy="10" r="2.5" fill="#FFE08A"/></svg>';
/* スマートフォンの上部バー：メニューを横スクロールさせず、7項目を4列でぜんぶ見せる。
   site.css を読まないページ（独自のスタイルを持つページ）でも同じにするため、上部バーを作るこのファイルで入れる */
(function(){if(document.getElementById('st-topbar-m'))return;var c='@media (max-width:720px){'+
'html body .topbar{position:static!important}'+
'html body .topbar .in{flex-wrap:wrap!important;gap:8px 10px!important;padding:8px 12px!important}'+
'html body .topbar .in .brand{order:1}html body .topbar .in .langs{order:3;margin-left:auto!important}'+
'html body .topbar .in .mb-slot{order:2;margin-left:auto!important}html body .topbar .in:has(.mb-slot) .langs{margin-left:0!important}'+
'html body .topbar nav.menu{order:4;flex:1 1 100%!important;display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:5px!important;overflow:visible!important;margin:0!important;padding:0!important}'+
'html body .topbar nav.menu a{display:flex!important;align-items:center;justify-content:center;text-align:center;padding:6px 3px!important;font-size:13px!important;line-height:1.25;white-space:normal!important;min-height:38px;border:1px solid var(--line,#dfe8f2)!important;border-radius:10px!important;flex:none!important}'+
'html body .topbar nav.menu a.on{border-color:#9cc7ee!important}}';
var st=document.createElement('style');st.id='st-topbar-m';st.textContent=c;(document.head||document.documentElement).appendChild(st)})();
function draw(){var s=SITE[lang],page=document.body.getAttribute('data-page');
 document.body.className=lang;document.documentElement.lang=lang;
 var top=document.getElementById('siteTop');
 if(top)top.innerHTML='<div class="in"><a class="brand" href="'+U(window.SITE_V2?'index_v2.html':'index.html')+'">'+logo+'<span>'+esc(s.name)+'</span></a><nav class="menu" aria-label="menu">'+s.menu.map(function(m){return '<a href="'+U(m[0])+'"'+(m[1]===page?' class="on"':'')+'>'+esc(m[2])+'</a>'}).join('')+'</nav><span class="langs" id="siteLang" role="group" aria-label="Language">'+LANGS.map(function(l){return '<button type="button" data-l="'+l+'" lang="'+l+'" class="'+(l===lang?'on':'')+'" aria-pressed="'+(l===lang)+'">'+LBL[l]+'</button>'}).join('')+'</span></div>';
 var ft=document.getElementById('siteFoot');
 if(ft)ft.innerHTML='<div class="in">'+s.foot.map(function(f){return '<a href="'+U(f[0])+'">'+esc(f[1])+'</a>'}).join('')+'<span style="margin-left:auto">'+s.copy+'</span></div>';
 var g=document.getElementById('siteLang');
 if(g)Array.prototype.forEach.call(g.querySelectorAll('button'),function(b){b.onclick=function(){lang=b.getAttribute('data-l');try{localStorage.setItem('art-lang',lang)}catch(e){}draw()}});
 if(typeof window.render==='function')window.render(lang);}
window.SITE_ESC=esc;window.SITE_NAME=function(){return SITE[lang].name};
document.addEventListener('DOMContentLoaded',draw);
})();
(function(){var s=document.currentScript&&document.currentScript.src;if(!s)return;var e=document.createElement('script');e.src=new URL('../../1_지상직여객운송입문/assets/nav.js',s).href;document.head.appendChild(e);
 /* 会員（ログインのボタン）：設定と共通モジュールを読み込む。ページが先に読んでいれば二重には読まない */
 function lm(){if(window.Member)return;var m=document.createElement('script');m.src=new URL('../../1_지상직여객운송입문/assets/member.js',s).href;document.head.appendChild(m)}
 if(window.MEMBER_CONFIG)lm();else{var c=document.createElement('script');c.src=new URL('member_config.js',s).href;c.onload=lm;document.head.appendChild(c)}})();
