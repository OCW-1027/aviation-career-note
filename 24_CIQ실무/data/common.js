/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 CIQの全体像','Part 1 出入国','Part 2 税関','Part 3 検疫','Part 4 世界のCIQ','Part 5 航空会社・支店の実務','Part 6 事例とQ&A'],ko:['Part 0 CIQ의 전체 모습','Part 1 출입국','Part 2 세관','Part 3 검역','Part 4 세계의 CIQ','Part 5 항공사·지점 실무','Part 6 사례와 Q&A'],en:['Part 0 The Big Picture','Part 1 Immigration','Part 2 Customs','Part 3 Quarantine','Part 4 CIQ Around the World','Part 5 Airline and Station Practice','Part 6 Cases and Q&A']};
var S={ja:'CIQの役割 ― 税関・出入国・検疫',ko:'CIQ의 역할 — 세관·출입국·검역',en:'What CIQ Does: Customs, Immigration and Quarantine'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장의 한마디'},en:{voice:'From the Floor'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_CIQの役割.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
