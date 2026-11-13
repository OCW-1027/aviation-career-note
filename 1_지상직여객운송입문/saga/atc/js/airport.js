/* AIRLINE SAGA — ATC(관제편) 공항 고르기: 등록된 묶음 가운데 하나로 ATC.D를 채움
 * 고르는 순서: 주소의 ?apt=XXXX → 저장해 둔 값 → 첫 묶음. 바꾸면 화면을 다시 읽음(다른 파일들이 ATC.D를 처음에 읽어 두므로). */
(function (G) {
  'use strict';
  var ATC = G.ATC, defs = ATC.AIRPORT_DEFS, ids = Object.keys(defs), want = null, KEY = 'acn_atc_apt_v1';
  try { var m = /[?&]apt=([A-Za-z]{4})/.exec(G.location ? G.location.search : ''); want = m && m[1].toUpperCase(); if (!want && G.localStorage) want = G.localStorage.getItem(KEY); } catch (e) { }
  if (!want && G.process && G.process.env) want = G.process.env.ATC_APT;
  if (!defs[want] || G.ATC_SITE && defs[want].preview) want = ids[0];      /* 사이트판에서는 시험판 공항을 주소나 저장값으로도 열지 않음 */
  defs[want](ATC.D, ATC.aptHelpers);
  ATC.aptId = want; ATC.AIRPORTS[want] = ATC.D;
  ATC.airports = function () { return ids.map(function (id) { return { id: id, name: defs[id].title || id, hidden: !!defs[id].hidden, preview: !!defs[id].preview }; }); };
  ATC.setAirport = function (id) { if (!defs[id] || id === want) return; try { G.localStorage.setItem(KEY, id); } catch (e) { } var u = G.location.href.replace(/([?&])apt=[A-Za-z]{4}&?/, '$1').replace(/[?&]$/, ''); G.location.href = u; };
})(typeof globalThis !== 'undefined' ? globalThis : this);
