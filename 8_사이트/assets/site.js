/* サイト共通の上部メニュー・フッター・言語切替（日本語・한국어・English）
   各ページは <body data-page="home|learn|tools|jobs|biz|about"> と、ページ固有の render(lang) 関数を持つ */
(function(){
var BASE=(document.currentScript&&document.currentScript.src)?new URL('../',document.currentScript.src).href:'';
function U(p){try{return BASE?new URL(p,BASE).href:p}catch(e){return p}}
var SITE={ja:{name:'航空キャリアノート',menu:[['index.html','home','ホーム'],['index.html#learn','learn','講座'],['guide.html','guide','学び方'],['index.html#tools','tools','資料・ツール'],['jobs.html','jobs','求人'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','企業の方へ'],['about.html','about','このサイトについて']],
 foot:[['about.html','このサイトについて'],['terms.html','利用規約'],['sources.html','出典と利用条件'],['privacy.html','プライバシーポリシー'],['../7_구인게재_기업용/求人掲載のご案内.html','求人掲載のご案内']],copy:'© 2026 航空キャリアノート　無断転載・複製禁止'},
ko:{name:'항공 커리어 노트',menu:[['index.html','home','홈'],['index.html#learn','learn','강좌'],['guide.html','guide','학습 가이드'],['index.html#tools','tools','자료실'],['jobs.html','jobs','구인'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','기업 담당자께'],['about.html','about','사이트 소개']],
 foot:[['about.html','사이트 소개'],['terms.html','이용약관'],['sources.html','출처와 이용 조건'],['privacy.html','개인정보 처리방침'],['../7_구인게재_기업용/求人掲載のご案内.html','구인 게재 안내']],copy:'© 2026 항공 커리어 노트　무단 전재·복제 금지'},
en:{name:'Aviation Career Note',menu:[['index.html','home','Home'],['index.html#learn','learn','Courses'],['guide.html','guide','Study guide'],['index.html#tools','tools','Resources'],['jobs.html','jobs','Jobs'],['../7_구인게재_기업용/求人掲載のご案内.html','biz','For employers'],['about.html','about','About']],
 foot:[['about.html','About this site'],['terms.html','Terms of use'],['sources.html','Sources'],['privacy.html','Privacy policy'],['../7_구인게재_기업용/求人掲載のご案内.html','Post a job']],copy:'© 2026 Aviation Career Note. All rights reserved.'}};
var LANGS=['ja','ko','en'],LBL={ja:'日本語',ko:'한국어',en:'English'};
var lang='ja';try{var _s=localStorage.getItem('art-lang');if(LANGS.indexOf(_s)>=0)lang=_s}catch(e){}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var logo='<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect x="1" y="6" width="28" height="18" rx="4" fill="#2F8FE0"/><path d="M7 17l6-2 5-5 2 .6-3 5 5-1.5 1.4 1.2-6 3-8 1z" fill="#fff"/><circle cx="24" cy="10" r="2.5" fill="#FFE08A"/></svg>';
function draw(){var s=SITE[lang],page=document.body.getAttribute('data-page');
 document.body.className=lang;document.documentElement.lang=lang;
 var top=document.getElementById('siteTop');
 if(top)top.innerHTML='<div class="in"><a class="brand" href="'+U('index.html')+'">'+logo+'<span>'+esc(s.name)+'</span></a><nav class="menu" aria-label="menu">'+s.menu.map(function(m){return '<a href="'+U(m[0])+'"'+(m[1]===page?' class="on"':'')+'>'+esc(m[2])+'</a>'}).join('')+'</nav><span class="langs" id="siteLang" role="group" aria-label="Language">'+LANGS.map(function(l){return '<button type="button" data-l="'+l+'" lang="'+l+'" class="'+(l===lang?'on':'')+'" aria-pressed="'+(l===lang)+'">'+LBL[l]+'</button>'}).join('')+'</span></div>';
 var ft=document.getElementById('siteFoot');
 if(ft)ft.innerHTML='<div class="in">'+s.foot.map(function(f){return '<a href="'+U(f[0])+'">'+esc(f[1])+'</a>'}).join('')+'<span style="margin-left:auto">'+s.copy+'</span></div>';
 var g=document.getElementById('siteLang');
 if(g)Array.prototype.forEach.call(g.querySelectorAll('button'),function(b){b.onclick=function(){lang=b.getAttribute('data-l');try{localStorage.setItem('art-lang',lang)}catch(e){}draw()}});
 if(typeof window.render==='function')window.render(lang);}
window.SITE_ESC=esc;window.SITE_NAME=function(){return SITE[lang].name};
document.addEventListener('DOMContentLoaded',draw);
})();
(function(){var s=document.currentScript&&document.currentScript.src;if(!s)return;var e=document.createElement('script');e.src=new URL('../../1_지상직여객운송입문/assets/nav.js',s).href;document.head.appendChild(e)})();
