/* 面接対策 Part 4 の図（2026.09）
   int_story：結論（核の一文）に向かって、過去→現在→接点→未来を一本の線でつなぐ図。
   表示している言語（html の lang）に合わせて文字を変える。figs.js の後に読み込む。 */
(function(){
window.FIGS=window.FIGS||{};
var TX={
ja:{top:'結論（核の一文）',p:[['過去','経験'],['現在','強み・軸'],['接点','なぜここか'],['未来','入社後の計画']],q:[['職務経歴','学生時代の経験'],['自己PR','長所・短所'],['志望動機','転職の理由'],['5年後','最後の質問']],line:'一本の線',aria:'過去・現在・接点・未来を一本の線でつなぎ、すべてが結論（核の一文）に向かう図'},
ko:{top:'결론(핵심 한 문장)',p:[['과거','경험'],['현재','강점·축'],['접점','왜 여기인가'],['미래','입사 후 계획']],q:[['경력','학창 시절 경험'],['자기 PR','장점·단점'],['지원 동기','이직 사유'],['5년 후','마지막 질문']],line:'한 줄',aria:'과거·현재·접점·미래를 한 줄로 잇고, 모두 결론(핵심 한 문장)을 향하는 그림'},
en:{top:'Conclusion (core sentence)',p:[['Past','Experience'],['Present','Strength, core value'],['Fit','Why here'],['Future','Plan after joining']],q:[['Career history','Student experience'],['Self-PR','Strengths, weaknesses'],['Motivation','Reason for moving'],['Five years on','Last question']],line:'One line',aria:'Past, present, point of fit and future joined in one line, all pointing to the conclusion (core sentence)'}};
var C=['#2F8FE0','#1F7A6E','#7A6FF0','#E08A2F'];
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
window.FIGS.int_story=function(){
 var l=(document.documentElement.lang||'ja').slice(0,2);var t=TX[l]||TX.ja;
 var W=760,bx=[30,215,400,585],bw=150,by=150,bh=78,f='font-family="Noto Sans JP,Noto Sans KR,Hiragino Sans,Malgun Gothic,sans-serif"';
 var s='<svg viewBox="0 0 '+W+' 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(t.aria)+'" style="width:100%;height:auto;display:block">';
 s+='<style>.ist-th{stroke-dasharray:640;stroke-dashoffset:640;animation:istd 2.4s .3s ease forwards}.ist-up{opacity:0;animation:istf .6s ease forwards}@keyframes istd{to{stroke-dashoffset:0}}@keyframes istf{to{opacity:1}}@media (prefers-reduced-motion:reduce){.ist-th{animation:none;stroke-dashoffset:0}.ist-up{animation:none;opacity:1}}</style>';
 /* 結論の帯 */
 s+='<rect x="170" y="14" width="420" height="50" rx="25" fill="#FFF6DD" stroke="#F2B233" stroke-width="2.5"/>';
 s+='<text x="380" y="46" text-anchor="middle" font-size="19" font-weight="700" fill="#5A4200" '+f+'>★ '+esc(t.top)+'</text>';
 /* 各部分から結論へ向かう矢印 */
 bx.forEach(function(x,i){var cx=x+bw/2,tx=230+i*100;
  s+='<path class="ist-up" style="animation-delay:'+(2.4+i*.15)+'s" d="M'+cx+' '+(by-4)+' C '+cx+' 100, '+tx+' 100, '+tx+' 70" fill="none" stroke="'+C[i]+'" stroke-width="2" stroke-dasharray="5 4"/>';
  s+='<polygon class="ist-up" style="animation-delay:'+(2.4+i*.15)+'s" points="'+(tx-5)+',74 '+(tx+5)+',74 '+tx+',66" fill="'+C[i]+'"/>';});
 /* 一本の線 */
 s+='<path class="ist-th" d="M18 '+(by+bh/2)+' L742 '+(by+bh/2)+'" stroke="#F2B233" stroke-width="6" stroke-linecap="round" fill="none"/>';
 /* 4つの箱 */
 bx.forEach(function(x,i){
  s+='<rect x="'+x+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="14" fill="#fff" stroke="'+C[i]+'" stroke-width="2.5"/>';
  s+='<circle cx="'+(x+22)+'" cy="'+(by+22)+'" r="13" fill="'+C[i]+'"/><text x="'+(x+22)+'" y="'+(by+27)+'" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial,sans-serif">'+(i+1)+'</text>';
  s+='<text x="'+(x+42)+'" y="'+(by+28)+'" font-size="18" font-weight="700" fill="'+C[i]+'" '+f+'>'+esc(t.p[i][0])+'</text>';
  s+='<text x="'+(x+bw/2)+'" y="'+(by+60)+'" text-anchor="middle" font-size="14" fill="#243447" '+f+'>'+esc(t.p[i][1])+'</text>';
  if(i<3)s+='<polygon points="'+(x+bw+8)+','+(by+bh/2-9)+' '+(x+bw+27)+','+(by+bh/2)+' '+(x+bw+8)+','+(by+bh/2+9)+'" fill="'+C[i]+'"/>';
  /* 対応する書類・質問 */
  s+='<rect x="'+x+'" y="'+(by+bh+22)+'" width="'+bw+'" height="58" rx="10" fill="#F4F7FB"/>';
  s+='<text x="'+(x+bw/2)+'" y="'+(by+bh+46)+'" text-anchor="middle" font-size="13" fill="#3A4A5C" '+f+'>'+esc(t.q[i][0])+'</text>';
  s+='<text x="'+(x+bw/2)+'" y="'+(by+bh+68)+'" text-anchor="middle" font-size="13" fill="#3A4A5C" '+f+'>'+esc(t.q[i][1])+'</text>';});
 return s+'</svg>';};
})();
