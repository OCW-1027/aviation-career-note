/* AIRLINE SAGA — ATC(관제편) 공통 자료와 공항 묶음 틀
 * 공항 하나 = js/airports/<icao>.js 의 묶음 하나. 고른 묶음이 ATC.D를 채움(js/airport.js).
 * 여기에는 어느 공항에서나 같은 것(기종 · 항공사 · 난이도)과 묶음이 쓰는 도우미만 둠. 전부 가상 · 교육용 값.
 * 좌표: x=동(NM), y=북(NM), 방위는 진방위. 지상: u · v(m) — 공항마다 정한 축(gridHdg = u축의 진방위).
 */
(function (G) {
  'use strict';
  var ATC = G.ATC = G.ATC || {};
  var D2R = Math.PI / 180;
  var D = ATC.D = {};
  ATC.AIRPORT_DEFS = {};   /* 공항 묶음: ATC.AIRPORT_DEFS.XSRA = function (D, mk) { var h = mk(70); … } */
  ATC.AIRPORTS = {};

  /* 공항 묶음이 쓰는 도우미. gridHdg = 지상 좌표 u축이 향하는 진방위 */
  ATC.aptHelpers = function (gridHdg) {
    var ux = Math.sin(gridHdg * D2R), uy = Math.cos(gridHdg * D2R), vx = Math.sin((gridHdg - 90) * D2R), vy = Math.cos((gridHdg - 90) * D2R);
    function uv2xy(u, v) { return { x: (u * ux + v * vx) / 1852, y: (u * uy + v * vy) / 1852 }; }
    function xy2uv(x, y) { var X = x * 1852, Y = y * 1852; return { u: X * ux + Y * uy, v: X * vx + Y * vy }; }
    function pol(brg, d) { return { x: Math.sin(brg * D2R) * d, y: Math.cos(brg * D2R) * d }; }
    function off(p, brg, d) { return { x: p.x + Math.sin(brg * D2R) * d, y: p.y + Math.cos(brg * D2R) * d }; }
    var F = D.fix = {}, gN = D.gN = {}, gE = D.gE = [];
    D.RWY_HDG = D.gridHdg = gridHdg; D.uv2xy = uv2xy; D.xy2uv = xy2uv; D.pol = pol; D.off = off; D.holds = {}; D.stands = {}; D.nodeId = function (u, v) { return u + ',' + v; };
    function fx(n, p, k) { F[n] = { n: n, x: p.x, y: p.y, k: k || 'wp' }; }
    /* 활주로 끝의 최종 접근 지점: IF(12NM) · FAF(6NM) */
    function fin(end, ifn, faf) {
      var e = D.ends[end]; fx(ifn, off(e.thr, e.crs + 180, 12), 'if'); fx(faf, off(e.thr, e.crs + 180, 6), 'faf');
      e.IF = ifn; e.FAF = faf;
    }
    /* 유도로 그물: 마디(N) · 구간(E) · 꺾은선(line) */
    function N(u, v, o) { var id = u + ',' + v; if (!gN[id]) gN[id] = { id: id, u: u, v: v, adj: [] }; if (o) for (var k in o) gN[id][k] = o[k]; return id; }
    function E(a, b, name, o) {
      var A = gN[a], B = gN[b], e = { a: a, b: b, name: name, len: Math.hypot(A.u - B.u, A.v - B.v), kind: 'twy' };
      if (o) for (var k in o) e[k] = o[k];
      e.i = gE.length; gE.push(e); A.adj.push({ to: b, e: e }); B.adj.push({ to: a, e: e });
    }
    function line(name, pts, o) { for (var i = 0; i < pts.length - 1; i++) E(N(pts[i][0], pts[i][1]), N(pts[i + 1][0], pts[i + 1][1]), name, o); }
    /* 꺾은선 여러 개를 한 번에 그물로: [{ n: 이름, p: [[u, v], …], o: { kind … } }] — 서로 만나는 곳(교차 · 끝이 다른 선에 닿는 곳)마다 마디를 만들어 이음.
       좌표는 m 단위 정수. 같은 직선 위에서 겹치는 두 선은 다루지 않음(자료에서 피할 것) */
    function mesh(lines) {
      var segs = [], i, j, EPS = 2;
      lines.forEach(function (L, li) { for (var k = 0; k < L.p.length - 1; k++) segs.push({ L: L, li: li, a: L.p[k], b: L.p[k + 1], cut: [[0, L.p[k]], [1, L.p[k + 1]]] }); });
      for (i = 0; i < segs.length; i++) for (j = i + 1; j < segs.length; j++) {
        var s = segs[i], t = segs[j]; if (s.li === t.li) continue;
        var rx = s.b[0] - s.a[0], ry = s.b[1] - s.a[1], qx = t.b[0] - t.a[0], qy = t.b[1] - t.a[1], den = rx * qy - ry * qx;
        if (Math.abs(den) < 1e-9) continue;
        var wx = t.a[0] - s.a[0], wy = t.a[1] - s.a[1], ps = (wx * qy - wy * qx) / den, pt = (wx * ry - wy * rx) / den, ls = Math.hypot(rx, ry), lt = Math.hypot(qx, qy);
        if (ps * ls < -EPS || ps * ls > ls + EPS || pt * lt < -EPS || pt * lt > lt + EPS) continue;
        /* 끝점에 닿으면 그 끝점을, 아니면 교점을 마디로 */
        var P = pt * lt < EPS ? t.a : pt * lt > lt - EPS ? t.b : ps * ls < EPS ? s.a : ps * ls > ls - EPS ? s.b : [Math.round(s.a[0] + rx * ps), Math.round(s.a[1] + ry * ps)];
        s.cut.push([Math.max(0, Math.min(1, ps)), P]); t.cut.push([Math.max(0, Math.min(1, pt)), P]);
      }
      segs.forEach(function (s) {
        var prev = null; s.cut.sort(function (x, y) { return x[0] - y[0]; });
        s.cut.forEach(function (c) { var id = N(c[1][0], c[1][1]); if (prev && prev !== id) E(prev, id, s.L.n, s.L.o); prev = id; });
      });
    }
    function hline(name, v, us, o) { line(name, us.map(function (u) { return [u, v]; }), o); }
    function vline(name, u, vs, o) { line(name, vs.map(function (v) { return [u, v]; }), o); }
    /* 활주로 자료를 다 적은 뒤 부름: 끝마다 시단 위치 · 방향 벡터 · 길이를 채움 */
    function finishRunways() {
      Object.keys(D.ends).forEach(function (k) {
        var e = D.ends[k], r = D.rw[e.rw];
        e.v = r.v; e.thr = uv2xy(e.thrU, r.v); e.end = uv2xy(e.endU, r.v); e.len = Math.abs(e.endU - e.thrU);
        /* 아래 값만 있으면 활주로가 어느 방향이든 됨: 시단 위치(thrU, thrV) · 진행 방향 단위 벡터(du, dv) · 길이(len).
           새 공항은 thrU·thrV·endU2·endV2를 직접 적으면 되고, 세이라처럼 u축과 나란한 활주로는 위 값에서 계산 */
        if (e.thrV === undefined) e.thrV = r.v;
        var eu = e.endU2 !== undefined ? e.endU2 : e.endU, ev = e.endV2 !== undefined ? e.endV2 : r.v, L = Math.hypot(eu - e.thrU, ev - e.thrV);
        e.du = (eu - e.thrU) / L; e.dv = (ev - e.thrV) / L; e.len = L; e.thr = uv2xy(e.thrU, e.thrV); e.end = uv2xy(eu, ev);
        /* 이설 시단(disp, m): 착륙은 활주로 시작점에서 disp만큼 안쪽 시단으로 — 접근 경로(thr) · 접지 위치(tdU · tdV)에만 반영하고 이륙은 활주로 시작점에서 */
        e.disp = e.disp || 0; e.tdU = e.thrU + e.du * e.disp; e.tdV = e.thrV + e.dv * e.disp; if (e.disp) e.thr = uv2xy(e.tdU, e.tdV);
      });
      Object.keys(D.rw).forEach(function (k) { var r = D.rw[k], a = D.ends[r.a], b = D.ends[r.b]; r.ua = a.thrU; r.va = a.thrV; r.ub = b.thrU; r.vb = b.thrV; });
      /* 활주로 사이 관계 D.rwX[가][나]:
         cross = 두 활주로가 실제로 교차(s = 가의 a쪽 시단에서 교차점까지, o = 나의 a쪽 시단에서 교차점까지 — m)
         conv  = 한쪽의 연장선이 다른 쪽 활주로를 지남(이륙 · 접근 경로가 만남). role 'ext' = 내 연장선이 저쪽을 지남, 'phys' = 저쪽 연장선이 나를 지남.
                 end = 연장선 쪽 활주로의 그쪽 끝, ext = 그 시단에서 만나는 점까지(m), s/o = 지나가는 쪽 활주로의 a쪽 시단에서 만나는 점까지 */
      var ids = Object.keys(D.rw), X = D.rwX = {}, i, j, EXT = 5000;
      ids.forEach(function (k) { X[k] = {}; });
      for (i = 0; i < ids.length; i++) for (j = i + 1; j < ids.length; j++) {
        var A = D.rw[ids[i]], B = D.rw[ids[j]], ea = D.ends[A.a], eb = D.ends[B.a], den = ea.du * eb.dv - ea.dv * eb.du;
        if (Math.abs(den) < 0.02) continue;                                   /* 나란함 */
        var wu = eb.thrU - ea.thrU, wv = eb.thrV - ea.thrV, sA = (wu * eb.dv - wv * eb.du) / den, sB = (wu * ea.dv - wv * ea.du) / den;
        var inA = sA >= 0 && sA <= ea.len, inB = sB >= 0 && sB <= eb.len;
        if (inA && inB) { X[A.id][B.id] = { kind: 'cross', s: sA, o: sB }; X[B.id][A.id] = { kind: 'cross', s: sB, o: sA }; continue; }
        var outA = sA < 0 ? -sA : sA - ea.len, outB = sB < 0 ? -sB : sB - eb.len;
        if (inB && !inA && outA <= EXT) { var endA = sA < 0 ? A.a : A.b; X[A.id][B.id] = { kind: 'conv', role: 'ext', end: endA, ext: outA, o: sB }; X[B.id][A.id] = { kind: 'conv', role: 'phys', end: endA, ext: outA, s: sB, other: A.id }; }
        else if (inA && !inB && outB <= EXT) { var endB = sB < 0 ? B.a : B.b; X[B.id][A.id] = { kind: 'conv', role: 'ext', end: endB, ext: outB, o: sA }; X[A.id][B.id] = { kind: 'conv', role: 'phys', end: endB, ext: outB, s: sA, other: B.id }; }
      }
    }
    /* 운용 방식을 다 적은 뒤 부름: 기준 방위(hdg) · 활주로별로 쓰는 끝(use) · 착륙/이륙 활주로 목록(arrs · deps) */
    function finishFlows() {
      Object.keys(D.flows).forEach(function (k) {
        var f = D.flows[k], h = D.ends[f.arr]; f.hdg = h.crs; f.use = {};
        Object.keys(D.rw).forEach(function (id) { var r = D.rw[id], a = D.ends[r.a], b = D.ends[r.b]; f.use[id] = a.du * h.du + a.dv * h.dv >= b.du * h.du + b.dv * h.dv ? r.a : r.b; });
        if (!f.arrs) f.arrs = f.arr2 ? [f.arr, f.arr2] : [f.arr];
        if (!f.deps) f.deps = f.dep2 ? [f.dep, f.dep2] : [f.dep];
      });
    }
    return { uv2xy: uv2xy, xy2uv: xy2uv, pol: pol, off: off, fx: fx, fin: fin, N: N, E: E, line: line, hline: hline, vline: vline, mesh: mesh, finishRunways: finishRunways, finishFlows: finishFlows };
  };

  /* 활주로 기준 위치: 시단에서 진행 방향으로 잰 거리(m) · 중심선에서 옆으로 벗어난 거리(m) · 그 반대 변환 */
  D.rwAlong = function (e, p) { return (p.u - e.thrU) * e.du + (p.v - e.thrV) * e.dv; };
  D.rwLat = function (e, p) { return (p.v - e.thrV) * e.du - (p.u - e.thrU) * e.dv; };
  D.rwPos = function (e, s) { return { u: e.thrU + e.du * s, v: e.thrV + e.dv * s }; };
  /* 두 활주로 끝의 관계: same(같은 활주로) · parallel(나란한 다른 활주로, 같은 방향) · other(교차·수렴·반대 방향 등) */
  D.rwRel = function (a, b) { var ea = D.ends[a], eb = D.ends[b]; if (!ea || !eb) return 'other'; if (ea.rw === eb.rw) return 'same'; return ea.du * eb.du + ea.dv * eb.dv > 0.999 ? 'parallel' : 'other'; };

  D.pobList = [96, 124, 148, 163, 182, 215, 248, 276];   /* 비상 선언 때 알리는 탑승 인원(음성 조각이 있는 값만) */

  /* ---------- 기종(교육용 대표값) ---------- */
  D.types = {
    B738: { n: 'B737-800', wake: 'M', len: 39.5, span: 35.8, vapp: 140, vr: 74, acc: 2.3, climb: 2600, desc: 2200, crz: 450, ceil: 41000, k: 'jet' },
    A320: { n: 'A320', wake: 'M', len: 37.6, span: 35.8, vapp: 136, vr: 72, acc: 2.3, climb: 2600, desc: 2200, crz: 447, ceil: 39000, k: 'jet' },
    A321: { n: 'A321', wake: 'M', len: 44.5, span: 35.8, vapp: 142, vr: 76, acc: 2.2, climb: 2400, desc: 2200, crz: 447, ceil: 39000, k: 'jet' },
    B789: { n: 'B787-9', wake: 'H', len: 63, span: 60, vapp: 145, vr: 82, acc: 2.0, climb: 2400, desc: 2300, crz: 488, ceil: 43000, k: 'jet' },
    B77W: { n: 'B777-300ER', wake: 'H', len: 74, span: 65, vapp: 149, vr: 86, acc: 1.8, climb: 2000, desc: 2300, crz: 490, ceil: 43000, k: 'jet' },
    A359: { n: 'A350-900', wake: 'H', len: 67, span: 65, vapp: 142, vr: 80, acc: 2.0, climb: 2300, desc: 2300, crz: 488, ceil: 43000, k: 'jet' },
    A333: { n: 'A330-300', wake: 'H', len: 64, span: 60, vapp: 138, vr: 78, acc: 1.9, climb: 2000, desc: 2200, crz: 470, ceil: 41000, k: 'jet' },
    B77F: { n: 'B777F', wake: 'H', len: 64, span: 65, vapp: 150, vr: 86, acc: 1.7, climb: 1900, desc: 2300, crz: 485, ceil: 43000, k: 'jet' },
    B763: { n: 'B767-300F', wake: 'H', len: 55, span: 48, vapp: 140, vr: 78, acc: 2.0, climb: 2200, desc: 2200, crz: 460, ceil: 43000, k: 'jet' },
    DH8D: { n: 'DHC-8-400', wake: 'M', len: 33, span: 28, vapp: 120, vr: 62, acc: 1.9, climb: 1800, desc: 1800, crz: 350, ceil: 25000, k: 'tp' },
    AT76: { n: 'ATR 72-600', wake: 'M', len: 27, span: 27, vapp: 113, vr: 58, acc: 1.7, climb: 1400, desc: 1600, crz: 275, ceil: 25000, k: 'tp' },
    C56X: { n: 'Citation Excel', wake: 'M', len: 16, span: 17, vapp: 115, vr: 58, acc: 2.6, climb: 3000, desc: 2500, crz: 430, ceil: 45000, k: 'jet' },
    PC12: { n: 'PC-12', wake: 'L', len: 14, span: 16, vapp: 90, vr: 44, acc: 1.8, climb: 1500, desc: 1500, crz: 270, ceil: 30000, k: 'tp' }
  };
  /* 항적난기류 거리 분리(NM) — ICAO PANS-ATM(Doc 4444) 4분류 기준: [선행][후속] */
  D.wakeNM = { H: { H: 4, M: 5, L: 6 }, M: { L: 5 }, L: {} };
  D.wakeName = { L: 'LIGHT', M: 'MEDIUM', H: 'HEAVY' };

  /* ---------- 항공사(전부 가상) ---------- */
  D.airlines = [
    { code: 'VLA', cs: 'VELA', name: 'Vela Air', col: '#1f6fd0', col2: '#bfe3ff', types: ['B738', 'B738', 'B789'], w: 5 },
    { code: 'AOP', cs: 'AOZORA', name: 'Aozora Pacific', jp: true, col: '#0e9aa7', col2: '#d8f6f8', types: ['A320', 'A359'], w: 3 },
    { code: 'HNB', cs: 'HANBIT', name: 'Hanbit Airways', col: '#d94f4f', col2: '#ffe3e3', types: ['A321', 'A333'], w: 3 },
    { code: 'NCE', cs: 'NORTHCRANE', name: 'Northern Crane Airlines', col: '#a8232a', col2: '#f4f4f4', types: ['B738', 'B77W'], w: 2 },
    { code: 'CKY', cs: 'CORAL', name: 'Coral Sky', col: '#ff7f50', col2: '#fff0e8', types: ['A320'], w: 3 },
    { code: 'SOG', cs: 'SOLARA', name: 'Solara Global', col: '#6a4fb3', col2: '#ece6fb', types: ['B77W', 'A359', 'B789'], w: 2 },
    { code: 'LMN', cs: 'LUMEN', name: 'Lumen Airways', col: '#e0a100', col2: '#fff6d6', types: ['A320', 'A321'], w: 2 },
    { code: 'TSB', cs: 'TASBLUE', name: 'Tasman Blue', col: '#2a52be', col2: '#e1e9ff', types: ['B789', 'A333'], w: 1 },
    { code: 'KCM', cs: 'PETAL', name: 'Sakura Commuter', jp: true, col: '#e87aa4', col2: '#ffeef5', types: ['DH8D', 'AT76'], w: 2 },
    { code: 'OSG', cs: 'ORIENT STAR', name: 'Orient Star Cargo', col: '#3d8b3d', col2: '#e6f4e6', types: ['B77F', 'B763'], cargo: true, w: 1 },
    { code: 'SNX', cs: 'SNOWFOX', name: 'Snowfox Cargo', col: '#7f95ad', col2: '#eef3f8', types: ['B763'], cargo: true, w: 1 },
    { code: 'SVJ', cs: 'SILVERBELL', name: 'Silverline Jet', col: '#8d949b', col2: '#f2f2f2', types: ['C56X', 'PC12'], ga: true, w: 1 }
  ];
  D.alBy = {}; D.airlines.forEach(function (a) { D.alBy[a.code] = a; });
  /* 편명 목록: 항공사마다 정해 둔 편명만 쓰고, 편명마다 기종도 정해 둠(이 게임의 설정 — 실제로는 같은 편명이라도 기종이 바뀔 수 있음).
     호출부호를 통째로 녹음한 음성 조각을 쓰기 위한 것 — 편명을 바꾸면 tools/voice_bank.js 부터 다시 돌려야 함 */
  (function () {
    var cnt = { 5: 22, 3: 14, 2: 10, 1: 8 };
    D.airlines.forEach(function (a, ai) {
      var n = cnt[a.w] || 8, lo = a.ga ? 11 : a.cargo ? 801 : 101, hi = a.ga ? 98 : a.cargo ? 899 : 799, seen = {}, s = 7 + ai * 131, out = ai ? [] : [301];
      seen[301] = 1;
      while (out.length < n) { s = (s * 48271) % 2147483647; var v = lo + s % (hi - lo + 1); if (!seen[v] && v % 100 !== 0) { seen[v] = 1; out.push(v); } }
      a.flights = out.map(function (num, i) { return { num: num, type: a.types[i % a.types.length] }; });
    });
  })();

  /* ---------- 난이도 ---------- */
  D.levels = {
    1: { id: 1, ko: ATC.T('초급'), en: 'STUDENT', hint: true, rbErr: 0, events: 0, stca: 150 },
    2: { id: 2, ko: ATC.T('중급'), en: 'CONTROLLER', hint: false, rbErr: 0.03, events: 1, stca: 120 },
    3: { id: 3, ko: ATC.T('고급'), en: 'SENIOR', hint: false, rbErr: 0.07, events: 3, stca: 90 }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
