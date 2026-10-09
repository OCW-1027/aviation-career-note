/* 新しいサイトの共通の枠（試作 2026.10）：試作の注意・メニュー・言語の切り替え・フッター
   各ページは <body data-page="home|business"> と、ページの中身を描く window.PAGE_RENDER(lang) を用意する。
   言語は ?lang= → 保存した言語（art-lang）→ 端末の言語 の順に決め、いまのサイトと同じ場所に保存する */
(function(){
var C={
ja:{proto:['GPTの設計案をもとにした試作です。いまのトップページは','こちら'],brand:'航空キャリアノート',nav:['学ぶ','会社の実務','練習ツール','求人','コーチング','コミュニティ'],mem:'メンバーシップ',
 foot:['航空の専門知識から、求人・コーチング・コミュニティまで。','航空の外でも役立つ、仕事の知識を。'],
 copy:'© 2026 航空キャリアノート　無断転載・複製禁止',terms:'利用規約',privacy:'プライバシーポリシー'},
ko:{proto:['GPT 디자인안을 바탕으로 만든 시안입니다. 지금 홈페이지는','여기'],brand:'항공 커리어 노트',nav:['학습','회사 실무','연습 도구','채용','코칭','커뮤니티'],mem:'멤버십',
 foot:['항공 전문 지식에서 채용, 코칭, 커뮤니티까지.','항공 밖에서도 쓰이는 실무 지식을.'],
 copy:'© 2026 항공 커리어 노트　무단 전재·복제 금지',terms:'이용약관',privacy:'개인정보 처리방침'},
en:{proto:['A prototype based on the GPT design. The current home page is','here'],brand:'Aviation Career Note',nav:['Learn','Business Skills','Practice','Jobs','Coaching','Community'],mem:'Membership',
 foot:['From aviation knowledge to jobs, coaching and community.','Professional Knowledge beyond Aviation.'],
 copy:'© 2026 Aviation Career Note. All rights reserved.',terms:'Terms of use',privacy:'Privacy policy'}};
var NAV=[['index.html#learn','learn'],['business.html','business'],['index.html#practice','practice'],['jobs.html','jobs'],['index.html#coaching','coaching'],['../community/index.html','community']];
/* フッターの項目：[日本語, 韓国語, 英語]（2026.10 日本語・韓国語の画面に英語が多すぎたので、言語ごとの名前に） */
var FOOT=[[['学ぶ','학습','Learn'],[['index.html#learn',['講座','강좌','Courses']],['plan.html',['私の学習プラン','내 학습 플랜','My Learning Plan']],['study.html',['私の学習ノート','내 학습 노트','My Study Notebook']],['guide.html',['学び方ガイド','학습 가이드','Study Guide']],['index.html#practice',['練習ツール','연습 도구','Practice Lab']]]],
 [['会社の実務','회사 실무','Business'],[['../23_재무3표실무/00_シリーズ全体_財務3表.html',['財務','재무','Finance']],['../12_일본지점인사재무실무/00_シリーズ全体_人事財務実務.html',['人事・総務','인사·총무','HR & Admin']],['../15_지점장인수인계가이드/00_シリーズ全体_引き継ぎガイド.html',['管理職','관리자','Management']]]],
 [['キャリア','커리어','Career'],[['jobs.html',['求人','채용','Jobs']],['../5_면접대비가이드/00_シリーズ全体_面接対策.html',['面接対策','면접 대비','Interview']],['index.html#coaching',['コーチング','코칭','Coaching']]]],
 [['つながる','소통','Connect'],[['../community/index.html',['コミュニティ','커뮤니티','Community']],['about.html',['このサイトについて','사이트 소개','About ACN']],['sources.html',['内容の扱い','콘텐츠 정책','Content Policy']]]]];
function FL(x,l){return typeof x==='string'?x:x[{ja:0,ko:1,en:2}[l]||0]}
var LANGS=['ja','ko','en'],lang='ja';window.SITE_LANGS=LANGS;
try{var q=(location.search.match(/[?&]lang=(ja|ko|en)/)||[])[1],sv=localStorage.getItem('art-lang'),nl=String(navigator.language||'').slice(0,2);
 lang=q||(LANGS.indexOf(sv)>=0?sv:(nl==='ko'?'ko':nl==='en'?'en':'ja'));localStorage.setItem('art-lang',lang)}catch(e){}
function E(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function $(i){return document.getElementById(i)}
function draw(){var c=C[lang],page=document.body.getAttribute('data-page');
 document.documentElement.lang=lang;document.body.className=lang;
 if($('navlinks'))$('navlinks').innerHTML=NAV.map(function(n,i){return '<a href="'+n[0]+'"'+(n[1]===page?' aria-current="page" class="on"':'')+'>'+E(c.nav[i])+'</a>'}).join('');
 if($('langs')){$('langs').innerHTML=[['ko','KO'],['ja','JA'],['en','EN']].map(function(x,i){return (i?'<i>/</i>':'')+'<button type="button" data-l="'+x[0]+'" class="'+(x[0]===lang?'on':'')+'" aria-pressed="'+(x[0]===lang)+'">'+x[1]+'</button>'}).join('');
  Array.prototype.forEach.call($('langs').querySelectorAll('button'),function(b){b.onclick=function(){lang=b.getAttribute('data-l');try{localStorage.setItem('art-lang',lang)}catch(e){}draw()}})}
 if($('mem'))$('mem').textContent=c.mem;
 if($('foot'))$('foot').innerHTML='<div><b>'+E(c.brand)+'</b>'+c.foot.map(function(p){return '<p>'+E(p)+'</p>'}).join('')+'</div>'+FOOT.map(function(f){return '<div><b>'+E(FL(f[0],lang))+'</b>'+f[1].map(function(a){return '<a href="'+a[0]+'">'+E(FL(a[1],lang))+'</a>'}).join('')+'</div>'}).join('');
 if($('copy'))$('copy').innerHTML=E(c.copy)+'　<a href="terms.html">'+E(c.terms)+'</a>　<a href="privacy.html">'+E(c.privacy)+'</a>';
 if(typeof window.PAGE_RENDER==='function')window.PAGE_RENDER(lang);
 localLabels();fitL2();}
/* 名前を2行で見せるツールのカード（.lab <b> の中の <br> の後ろ＝.l2。例：搭載管理／（Weight & Balance）の練習）2026.10
   2行目が1行に入らないときは、2行目だけ少し小さくして1行に収める（0.7倍まで）。それでも入らない狭い画面では、ふつうに折り返す */
var RO2=window.ResizeObserver?new ResizeObserver(function(es){es.forEach(function(e){var b=e.target,w=Math.round(e.contentRect.width);if(b.__w2!==w){b.__w2=w;(window.requestAnimationFrame||setTimeout)(function(){fit2(b)})}})}):null; /* 調整は次の描画で（ResizeObserver の中で大きさを変えない） */
function fit2(b){var s=b.querySelector('.l2');if(!s)return;var st=s.style;st.fontSize=st.whiteSpace=st.width='';var w=b.clientWidth;if(!w)return;
 st.whiteSpace='nowrap';st.width='max-content';var n=s.getBoundingClientRect().width;if(n<=w)return;var k=Math.floor(w/n*100)/100;
 for(var i=0;i<6&&k>=.7;i++){st.fontSize=k+'em';if(s.getBoundingClientRect().width<=w)return;k=Math.round((k-.02)*100)/100}st.fontSize=st.whiteSpace=st.width=''}
function fitL2(){Array.prototype.forEach.call(document.querySelectorAll('.lab b'),function(b){if(!b.querySelector('.l2'))return;fit2(b);if(RO2&&!b.__ro2){b.__ro2=1;RO2.observe(b)}})}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){fitL2()});
/* ページの中の小さな英語の見出し（.eyebrow など）を、日本語・韓国語の画面ではその言語にする（2026.10）
   HTML には英語のまま書いておき、ここに [英語, 日本語, 韓国語] を足す。英語の画面ではそのまま */
var LB=[['Start here','はじめに','시작하기'],['Why ACN','航空キャリアノートの特徴','항공 커리어 노트의 특징'],['Aviation Jobs','航空の求人','항공 채용'],
 ['Aviation Learning','航空の講座','항공 강좌'],['Learning Path','学びの順序','학습 순서'],['Professional Business Skills','会社の実務','회사 실무'],
 ['Practice Lab','練習ツール','연습 도구'],['Practice Lab · Finance','練習ツール・財務','연습 도구 · 재무'],['ACN Membership','メンバーシップ','멤버십'],
 ['1:1 Aviation Coaching','1対1のコーチング','1:1 코칭'],['Aviation Community','コミュニティ','커뮤니티'],['Trust & Quality','信頼できる内容のために','믿을 수 있는 내용을 위해'],
 ['Aviation · Career · Professional Learning','航空・キャリア・仕事の学び','항공 · 커리어 · 실무 학습'],['Where to start','どこから始めるか','어디서 시작할까'],['Read alongside','あわせて読む','함께 읽기'],
 ['Career & Interview','就職と面接','취업과 면접'],['My Learning Plan','私の学習プラン','내 학습 플랜'],['My Study Notebook','私の学習ノート','내 학습 노트'],
 ['How to study','学び方','학습 방법'],['Build your plan','プランを作る','플랜 만들기'],['Profile','プロフィール','프로필'],['Dashboard','学習の記録','학습 기록'],['Progress','進み具合','진도'],
 ['Review','復習','복습'],['Notes','メモ','메모'],['Bookmarks','ブックマーク','북마크'],['Backup','バックアップ','백업'],
 ['Your professional route','あなたの仕事の道筋','나의 커리어 경로'],['Today → Next career','いま → 次のキャリア','지금 → 다음 커리어'],
 ['Knowledge to Career.<br>Career back to Knowledge.','知識をキャリアに。<br>キャリアをまた知識に。','지식을 커리어로.<br>커리어를 다시 지식으로.'],
 ['All industries','業種を問わず','업종 무관'],['HR / Admin','人事・総務','인사·총무'],['Management','管理職','관리자'],
 ['Station Management','支店の運営','지점 운영'],['Airline Sales','航空営業','항공 영업'],['Station Launch','支店の開設','지점 개설'],
 ['Passenger Operations','旅客ハンドリング','여객운송'],['Air Cargo','航空貨物','항공화물'],['Flight Operations','運航管理','운항관리'],
 ['Practice · Interview','練習ツール・面接','연습 도구 · 면접'],['Tool','ツール','도구'],['JA · KO · EN','日本語・韓国語・英語','일본어·한국어·영어'],['Membership','メンバーシップ','멤버십'],
 ['Learn','学ぶ','배우기'],['Practice','練習','연습'],['Connect','つながる','연결'],['Career','キャリア','커리어'],
 ['Aviation Career Note · Learn · Jobs · Business Skills · Coaching · Community','航空キャリアノート ・ 学ぶ ・ 求人 ・ 会社の実務 ・ コーチング ・ コミュニティ','항공 커리어 노트 · 학습 · 채용 · 회사 실무 · 코칭 · 커뮤니티']];
function localLabels(){var k=lang==='ja'?1:lang==='ko'?2:0,map={};LB.forEach(function(r){map[r[0].toLowerCase()]=r});
 Array.prototype.forEach.call(document.querySelectorAll('.topbar,.pricebox>b,.eyebrow,.kicker,.sector,.route-head b,.route-head small,.route-title,.ft-n,.meta-row span,.route-flow b,.route-flow span'),function(el){
  if(!el.hasAttribute('data-en'))el.setAttribute('data-en',el.innerHTML);var en=el.getAttribute('data-en'),key=en.replace(/&amp;/g,'&').trim().toLowerCase(),r=map[key];
  if(r){el.innerHTML=k?r[k]:en;return}
  var m=en.match(/^POINT (\d+)$/);if(m){el.textContent=k===1?'ポイント'+m[1]:k===2?'포인트 '+m[1]:en;return}
  m=en.match(/^(\d[\d,]*) Lessons(.*)$/);if(m){el.innerHTML=(k===1?m[1]+'レッスン':k===2?m[1]+'개 레슨':m[1]+' Lessons')+m[2];return}});}
window.ACN={E:E,lang:function(){return lang},fitL2:fitL2};
/* 右下のボタン（上へ・戻る・ホーム）：ほかのページと同じ nav.js を使う。ホームは新しいトップページ（2026.10） */
(function(){var me=document.currentScript&&document.currentScript.src;if(!me)return;window.ACN_HOME=new URL('../index.html',me).href;var n=document.createElement('script');n.src=new URL('../../1_\uc9c0\uc0c1\uc9c1\uc5ec\uac1d\uc6b4\uc1a1\uc785\ubb38/assets/nav.js',me).href;document.head.appendChild(n);var w=document.createElement('script');w.src=new URL('ja_wrap.js',me).href;document.head.appendChild(w)})();
document.addEventListener('DOMContentLoaded',draw);
})();
