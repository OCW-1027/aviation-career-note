/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 全体像','Part 1 許認可','Part 2 拠点の設立','Part 3 空港の契約とハンドリング会社','Part 4 システムとCIQ','Part 5 保安・安全','Part 6 就航準備と初便','Part 7 営業と運営の定着'],
ko:['Part 0 전체 그림','Part 1 인허가','Part 2 거점 설립','Part 3 공항 계약과 조업사','Part 4 시스템과 CIQ','Part 5 보안·안전','Part 6 취항 준비와 첫 편','Part 7 영업과 운영 정착'],
en:['Part 0 The Big Picture','Part 1 Licenses and Approvals','Part 2 Setting Up the Entity','Part 3 Airport Contracts and Ground Handlers','Part 4 Systems and CIQ','Part 5 Security and Safety','Part 6 Launch Preparation and First Flight','Part 7 Sales and Stable Operations']};
var S={ja:'外国航空会社の日本就航・支店開設ガイド',ko:'외국 항공사 일본 취항·지점 개설 가이드',en:'Launching Flights to Japan: A Station Setup Guide for Foreign Airlines'};
var DEF={};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_日本就航支店開設ガイド.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
