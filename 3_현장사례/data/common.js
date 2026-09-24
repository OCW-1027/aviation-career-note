/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['','Part 1 空港の大規模イレギュラー','Part 2 プロジェクトを動かす','Part 3 取引先と資源','Part 4 当局と国境'],
ko:['','Part 1 공항의 대규모 비정상','Part 2 프로젝트를 움직이다','Part 3 거래처와 자원','Part 4 당국과 국경'],
en:['','Part 1 Large-scale Airport Disruptions','Part 2 Running Projects','Part 3 Partners and Resources','Part 4 Authorities and Borders']};
var S={ja:'現場の事例から学ぶ',ko:'현장 사례로 배우기',en:'Lessons from the Field: Case Studies'};
var DEF={ja:{voice:'当事者のひと言'},ko:{voice:'당사자 한마디'},en:{voice:'In Their Own Words'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_現場の事例.html';a.meta.from=a.meta.from||'KIX';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
