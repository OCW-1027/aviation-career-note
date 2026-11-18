/* 共通設定（article.js より前に読み込む）— 航空管制の基礎 */
(function(){
var PARTS={ja:['Part 0 管制とは','Part 1 空域と飛行のルール','Part 2 交信','Part 3 設備と航法','Part 4 交通の流れ','Part 5 最新の動き','Part 6 体験'],ko:['Part 0 관제란 무엇인가','Part 1 공역과 비행 규칙','Part 2 교신','Part 3 장비와 항법','Part 4 교통 흐름 관리','Part 5 최신 동향','Part 6 관제 체험'],en:['Part 0 What Is ATC?','Part 1 Airspace and Flight Rules','Part 2 Communication','Part 3 Systems and Navigation','Part 4 Traffic Flow','Part 5 What’s New','Part 6 Try It Yourself']};
var S={ja:'航空管制の基礎',ko:'항공 관제 기초',en:'Air Traffic Control Basics'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_航空管制の基礎.html';a.meta.from=a.meta.from||'HND';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
