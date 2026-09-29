/* 共通設定（article.js より前に読み込む）— 運航管理の実務 */
(function(){
var PARTS={ja:['Part 0 運航管理とは','Part 1 航空法規','Part 2 気象','Part 3 NOTAM','Part 4 飛行計画書','Part 5 燃料','Part 6 乗務割と勤務時間','Part 7 ランプと冬の運航','Part 8 イレギュラーな運航','Part 9 通信と記録','Part 10 航空気象の基礎'],ko:['Part 0 운항관리란','Part 1 항공법규','Part 2 기상','Part 3 NOTAM','Part 4 비행계획서','Part 5 연료','Part 6 편조와 근무시간','Part 7 램프와 겨울철 운항','Part 8 비정상 운항','Part 9 통신과 기록','Part 10 항공기상 기초'],en:['Part 0 What Is Flight Dispatch?','Part 1 Aviation Law','Part 2 Weather','Part 3 NOTAM','Part 4 Flight Plans','Part 5 Fuel','Part 6 Crew Scheduling','Part 7 Ramp and Winter Operations','Part 8 Irregular Operations','Part 9 Communications and Records','Part 10 Aviation Weather Basics']};
var S={ja:'運航管理の実務',ko:'운항관리 실무',en:'Flight Dispatch Operations'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_運航管理の実務.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
