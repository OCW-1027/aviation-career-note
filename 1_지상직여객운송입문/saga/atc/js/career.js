/* AIRLINE SAGA — ATC 관제사 경력: 항공사 · 기종 도감, 연속 무감점(콤보), 배지, 내 관제사 카드 기록 (구현메모 71차)
 * 기록은 이 기기의 localStorage 하나(공항 공통). 점수 · 채점은 바꾸지 않음 — 쌓이는 것과 보이는 것만 더함.
 * ui.js가 부름: Career.attach(sim, 공항, 알림 함수) · Career.endShift({...}) · Career.data() · Career.BADGES · Career.universe() */
(function (G) {
  'use strict';
  var ATC = G.ATC = G.ATC || {}, KEY = 'acn_atc_career_v1';
  var C = ATC.Career = {};
  function rd() { try { return JSON.parse(G.localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function wr(v) { try { G.localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { } }
  function day() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 864e5); }
  C.day = day;
  C.data = function () { var c = rd(); c.al = c.al || {}; c.ty = c.ty || {}; c.bd = c.bd || {}; c.st = c.st || {}; c.st.pos = c.st.pos || {}; c.st.apt = c.st.apt || {}; return c; };
  C.setName = function (n) { var c = C.data(); c.name = String(n || '').trim().slice(0, 20); wr(c); };

  /* 배지: [번호, 이름, 조건] — 조건 글은 화면에 그대로 */
  C.BADGES = function () {
    return [
      ['first', ATC.T('첫 근무'), ATC.T('근무 한 번을 끝까지 마침')],
      ['clean', ATC.T('무사고 근무'), ATC.T('안전 감점 0으로 근무를 마침')],
      ['sgrade', ATC.T('S 등급'), ATC.T('근무 평가 S')],
      ['c10', ATC.T('매끄러운 흐름'), ATC.T('연속 무감점 10편')],
      ['c25', ATC.T('완벽한 줄 세우기'), ATC.T('연속 무감점 25편')],
      ['f100', ATC.T('100편 처리'), ATC.T('누적 처리 100편')],
      ['f500', ATC.T('500편 처리'), ATC.T('누적 처리 500편')],
      ['allpos', ATC.T('다섯 자리 모두'), ATC.T('DEL · GND · TWR · APP · ACC를 모두 근무')],
      ['apt3', ATC.T('세 공항'), ATC.T('세 공항에서 근무')],
      ['real', ATC.T('실제 교통'), ATC.T('실제 교통 근무를 마침')],
      ['rtd7', ATC.T('7일 연속 도전'), ATC.T('오늘의 실제 교통 7일 연속')],
      ['b30', ATC.T('항공사 30곳'), ATC.T('도감에 항공사 30곳')],
      ['b60', ATC.T('항공사 60곳'), ATC.T('도감에 항공사 60곳')],
      ['ins', ATC.T('교관'), ATC.T('어느 자리든 교관 등급')],
      ['scn3', ATC.T('별 세 개'), ATC.T('시나리오 하나를 별 3개로')],
      ['butter', ATC.T('부드러운 착륙'), ATC.T('조종사 체험 직접 착륙 · 접지 강하율 200ft/min 이하')],
      ['mic', ATC.T('또렷한 교신'), ATC.T('마이크 송신 10회 이상 · 표준 문구 일치 90% 이상인 근무')]
    ];
  };
  function give(c, id, out) { if (!c.bd[id]) { c.bd[id] = day(); out.push(id); } }

  /* 도감에 넣기: 근무에서 잘 내보낸 항공기(관할 이양 · 착륙 · 이륙 · 주기 완료) */
  function meet(c, ac, apt) {
    var a = ac.al; if (!a || !a.code) return;
    var e = c.al[a.code] || { n: 0, d: day() }; e.n++; e.cs = a.cs; e.nm = a.name; e.real = a.real ? 1 : 0; if (ac.real) e.rt = (e.rt || 0) + 1; (e.ap = e.ap || {})[apt] = 1; c.al[a.code] = e;
    if (ac.type) { var y = c.ty[ac.type] || { n: 0, d: day() }; y.n++; c.ty[ac.type] = y; }
    c.st.fl = (c.st.fl || 0) + 1;
  }
  C.alCount = function (c) { return Object.keys((c || C.data()).al).length; };

  /* 근무에 붙임: 도감 · 연속 무감점. note(n, 칭찬말, 끊김여부)로 화면에 알림. 조종사 체험에는 붙이지 않음 */
  function word(n) { return n === 5 ? ATC.T('좋은 흐름') : n === 10 ? ATC.T('매끄러운 흐름') : n === 15 ? ATC.T('흔들림 없는 근무') : n === 20 ? ATC.T('완벽한 줄 세우기') : n >= 30 && n % 10 === 0 ? ATC.T('관제탑의 리듬') : ''; }
  C.attach = function (sim, apt, note) {
    var s = C.cur = { n: 0, max: 0, sim: sim };
    if (!sim || sim.pilot) return s;
    sim.listeners.push(function (type, d) {
      if (C.cur !== s) return;
      if (type === 'gone' && d && d.okOut && !d.pilotMe) {
        var c = C.data(); meet(c, d, apt); wr(c);
        s.n++; if (s.n > s.max) s.max = s.n;
        if (note && s.n >= 3) note(s.n, word(s.n), false);
      } else if (type === 'inc' && d && d.pts < 0) {
        if (note && s.n >= 3) note(s.n, '', true);
        s.n = 0;
      }
    });
    return s;
  };

  /* 근무가 끝났을 때(중도 종료 아님): 통계 · 배지. 새로 딴 배지 번호 목록을 돌려줌
     o = { sim, pos, apt, sc, real, rtdStreak, ins, scn3, land, mic } */
  C.endShift = function (o) {
    var c = C.data(), out = [], st = c.st, sc = o.sc || {}, mx = C.cur && C.cur.sim === o.sim ? C.cur.max : 0;
    if (!o.pilot) {
      st.sh = (st.sh || 0) + 1; st.pos[o.pos] = (st.pos[o.pos] || 0) + 1; st.apt[o.apt] = 1; st.mx = Math.max(st.mx || 0, mx);
      if (!sc.fatal) give(c, 'first', out);
      if (sc.S === 0 && !sc.fatal) give(c, 'clean', out);
      if (sc.grade === 'S') give(c, 'sgrade', out);
      if (o.real) give(c, 'real', out);
      if (o.mic && o.mic.n >= 10 && o.mic.sum / o.mic.n >= 90) give(c, 'mic', out);
    }
    if (o.land && -o.land.vs <= 200 && !o.land.crash) give(c, 'butter', out);
    if (mx >= 10 || (st.mx || 0) >= 10) give(c, 'c10', out);
    if (mx >= 25 || (st.mx || 0) >= 25) give(c, 'c25', out);
    if ((st.fl || 0) >= 100) give(c, 'f100', out);
    if ((st.fl || 0) >= 500) give(c, 'f500', out);
    if (['DEL', 'GND', 'TWR', 'APP', 'ACC'].every(function (k) { return st.pos[k]; })) give(c, 'allpos', out);
    if (Object.keys(st.apt).length >= 3) give(c, 'apt3', out);
    if ((o.rtdStreak || 0) >= 7) give(c, 'rtd7', out);
    var na = Object.keys(c.al).length; if (na >= 30) give(c, 'b30', out); if (na >= 60) give(c, 'b60', out);
    if (o.ins) give(c, 'ins', out);
    if (o.scn3) give(c, 'scn3', out);
    wr(c); return { list: out, max: mx };
  };

  /* 도감 전체 목록: 지금 공항의 항공사 표 + 실제 교통 전용(RT.EXTRA) + 다른 공항에서 이미 만난 것 */
  C.universe = function () {
    var D = ATC.D || {}, seen = C.data().al, got = {}, list = [];
    function add(code, cs, nm, kind) { if (!code || got[code]) return; got[code] = 1; list.push({ code: code, cs: cs, nm: nm, kind: kind }); }
    (D.airlines || []).forEach(function (a) { if (!a.gone) add(a.code, a.cs, a.name, a.real ? 'real' : 'fic'); });
    var X = ATC.RT && ATC.RT.EXTRA; if (X) Object.keys(X).forEach(function (k) { add(k, X[k][0], X[k][1], 'rt'); });
    Object.keys(seen).forEach(function (k) { var e = seen[k]; add(k, e.cs, e.nm, e.real ? 'real' : 'fic'); });
    return list;
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
