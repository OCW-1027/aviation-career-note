/* 新しいサイトの共通の枠（試作 2026.10）：試作の注意・メニュー・言語の切り替え・フッター
   各ページは <body data-page="home|business"> と、ページの中身を描く window.PAGE_RENDER(lang) を用意する。
   言語は ?lang= → 保存した言語（art-lang）→ 端末の言語 の順に決め、いまのサイトと同じ場所に保存する */
(function(){
var C={
ja:{proto:['GPTの設計案をもとにした試作です。いまのトップページは','こちら'],nav:['学ぶ','Business Skills','Practice','求人','Coaching','Community'],mem:'メンバーシップ',
 foot:['航空の専門知識から、求人・コーチング・コミュニティまで。','Professional Knowledge beyond Aviation.'],
 copy:'© 2026 Aviation Career Note　無断転載・複製禁止',terms:'利用規約',privacy:'プライバシーポリシー'},
ko:{proto:['GPT 디자인안을 바탕으로 만든 시안입니다. 지금 홈페이지는','여기'],nav:['학습','Business Skills','Practice','채용','Coaching','Community'],mem:'멤버십',
 foot:['항공 전문 지식에서 채용, 코칭, 커뮤니티까지.','Professional Knowledge beyond Aviation.'],
 copy:'© 2026 Aviation Career Note　무단 전재·복제 금지',terms:'이용약관',privacy:'개인정보 처리방침'},
en:{proto:['A prototype based on the GPT design. The current home page is','here'],nav:['Learn','Business Skills','Practice','Jobs','Coaching','Community'],mem:'Membership',
 foot:['From aviation knowledge to jobs, coaching and community.','Professional Knowledge beyond Aviation.'],
 copy:'© 2026 Aviation Career Note. All rights reserved.',terms:'Terms of use',privacy:'Privacy policy'}};
var NAV=[['index_v3.html#learn','learn'],['business.html','business'],['index_v3.html#practice','practice'],['jobs.html','jobs'],['index_v3.html#coaching','coaching'],['../community/index.html','community']];
var FOOT=[['Learn',[['index_v3.html#learn','Courses'],['index_v3.html#learn','Learning Paths'],['index_v3.html#practice','Practice Lab']]],
 ['Business',[['../23_재무3표실무/00_シリーズ全体_財務3表.html','Finance'],['../12_일본지점인사재무실무/00_シリーズ全体_人事財務実務.html','HR & Admin'],['../15_지점장인수인계가이드/00_シリーズ全体_引き継ぎガイド.html','Management']]],
 ['Career',[['jobs.html','Jobs'],['../5_면접대비가이드/00_シリーズ全体_面接対策.html','Interview'],['index_v3.html#coaching','Coaching']]],
 ['Connect',[['../community/index.html','Community'],['about.html','About ACN'],['sources.html','Content Policy']]]];
var LANGS=['ja','ko','en'],lang='ja';
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
 if($('foot'))$('foot').innerHTML='<div><b>Aviation Career Note</b>'+c.foot.map(function(p){return '<p>'+E(p)+'</p>'}).join('')+'</div>'+FOOT.map(function(f){return '<div><b>'+f[0]+'</b>'+f[1].map(function(a){return '<a href="'+a[0]+'">'+E(a[1])+'</a>'}).join('')+'</div>'}).join('');
 if($('copy'))$('copy').innerHTML=E(c.copy)+'　<a href="terms.html">'+E(c.terms)+'</a>　<a href="privacy.html">'+E(c.privacy)+'</a>';
 if(typeof window.PAGE_RENDER==='function')window.PAGE_RENDER(lang);}
window.ACN={E:E,lang:function(){return lang}};
document.addEventListener('DOMContentLoaded',draw);
})();
