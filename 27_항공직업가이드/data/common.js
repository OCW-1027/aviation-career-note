/* 共通設定（article.js より前に読み込む）— 航空の仕事ガイド */
(function(){
var PARTS={ja:['Part 0 航空の仕事の地図','Part 1 航空管制官','Part 2 運航管理者','Part 3 パイロット','Part 4 整備士','Part 5 客室乗務員・地上の仕事','Part 6 世界の早見表と準備'],ko:['Part 0 항공 직무 개관','Part 1 항공교통관제사','Part 2 운항관리사','Part 3 조종사','Part 4 항공정비사','Part 5 객실승무원·지상직','Part 6 국가별 자격 정보와 취업 준비'],en:['Part 0 A Map of Aviation Jobs','Part 1 Air Traffic Controller','Part 2 Flight Dispatcher','Part 3 Pilot','Part 4 Maintenance Engineer','Part 5 Cabin Crew and Ground Jobs','Part 6 World Quick Reference and Preparation']};
var S={ja:'航空の仕事ガイド',ko:'항공 직업 가이드',en:'Aviation Careers Guide'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_航空の仕事ガイド.html';a.meta.from=a.meta.from||'ICN';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
