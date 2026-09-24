/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['','Part 1 準備','Part 2 面接の本番','Part 3 経験者・内定後'],ko:['','Part 1 준비','Part 2 면접 실전','Part 3 경력자·내정 후'],en:['','Part 1 Preparation','Part 2 The Interview','Part 3 Experienced Hires and After the Offer']};
var S={ja:'航空・空港の面接対策',ko:'항공·공항 면접 대비',en:'Interview Prep for Airline and Airport Jobs'};
var DEF={ja:{voice:'面接官のひと言'},ko:{voice:'면접관 한마디'},en:{voice:'From the Interviewer'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_面接対策.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
