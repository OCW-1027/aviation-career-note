/* AIRLINE SAGA — ATC 조종사 체험 「한 편 비행」 하네다 → 인천 (구현메모 73차 · 한편비행_설계_v2)
 * 실제 항로(일본 AIP ENR 3.3 · 한국 eAIP ENR 3.3): RJTT BEKLA3A BEKLA Y18 PIGAP Y182 BIDIK Y16 SAPRA Y685 GUKDO + GUKDO 2E/3C → RKSI
 * 순항 화면 = XcSim(mode 'XC') + XcPilot(출발편 조종사의 하늘 단계를 이어받음). 지도는 이 파일의 위경도 좌표계(공항 좌표계와 따로).
 * 일본 구간(하네다 페이지): Tokyo Control 120.5 → Fukuoka Control 128.125 · 133.025 · 124.15 → SAPRA 앞에서 Daegu Control 120.575 이양
 * → 주파수를 바꾸면 이 기기 세션에 상태를 적고 인천 페이지로 다시 읽음 → 한국 구간: Daegu Control(ATIS · 강하 · STAR 허가) → Seoul Approach 이양
 * → 인천 접근관제 시뮬레이션의 도착편 조종사로 이어 감(ATC.Pilot, xcIn). */
(function (G) {
  'use strict';
  var ATC = G.ATC, U = ATC.U, fmt = ATC.fmt, D2R = Math.PI / 180;
  var XC = ATC.XC = {};
  function dm(d, m, s) { return d + m / 60 + s / 3600; }
  XC.P = {
    BEKLA: [dm(35, 49, 59), dm(139, 10, 10)], OLBER: [dm(35, 48, 28), dm(138, 39, 45)], AGSEB: [dm(35, 47, 41), dm(138, 25, 9)], PIGAP: [dm(35, 47, 21), dm(138, 19, 1)],
    IDMEN: [dm(35, 51, 40), dm(138, 3, 9)], OGISO: [dm(35, 56, 27), dm(137, 45, 22)], AKNOM: [dm(35, 58, 19), dm(137, 38, 22)], BIDIK: [dm(36, 0, 46), dm(137, 29, 10)],
    ADGOM: [dm(36, 0, 29), dm(136, 23, 13)], MADUL: [dm(35, 58, 59), dm(134, 46, 13)], SUGNO: [dm(35, 57, 42), dm(133, 56, 22)], SAPRA: [dm(35, 49, 26), dm(130, 43, 25)],
    BULGA: [dm(35, 56, 9), dm(129, 49, 24)], KPO: [dm(35, 58, 38), dm(129, 28, 28)], ELAPI: [dm(36, 20, 14), dm(128, 50, 51)], CUN: [dm(36, 37, 55), dm(128, 19, 31)],
    BIGOB: [dm(36, 43, 25), dm(128, 9, 52)], BASEM: [dm(36, 50, 37), dm(127, 57, 10)], ENSAL: [dm(36, 55, 54), dm(127, 47, 47)], GUKDO: [dm(37, 1, 11), dm(127, 38, 23)]
  };
  XC.AP = { RJTT: [35.5533, 139.7811, 'Tokyo Haneda'], RKSI: [37.4692, 126.4505, 'Seoul Incheon'], RKSS: [37.5583, 126.7906, 'Gimpo'] };
  XC.ROUTE = ['BEKLA', 'OLBER', 'AGSEB', 'PIGAP', 'IDMEN', 'OGISO', 'AKNOM', 'BIDIK', 'ADGOM', 'MADUL', 'SUGNO', 'SAPRA', 'BULGA', 'KPO', 'ELAPI', 'CUN', 'BIGOB', 'BASEM', 'ENSAL', 'GUKDO'];
  XC.AWY = { OLBER: 'Y18', AGSEB: 'Y18', PIGAP: 'Y18', IDMEN: 'Y182', OGISO: 'Y182', AKNOM: 'Y182', BIDIK: 'Y182', ADGOM: 'Y16', MADUL: 'Y16', SUGNO: 'Y16', SAPRA: 'Y16', BULGA: 'Y685', KPO: 'Y685', ELAPI: 'Y685', CUN: 'Y685', BIGOB: 'Y685', BASEM: 'Y685', ENSAL: 'Y685', GUKDO: 'Y685' };
  XC.STR = 'BEKLA3A BEKLA Y18 PIGAP Y182 BIDIK Y16 SAPRA Y685 GUKDO';
  XC.FQ = { TOK: { n: 'Tokyo Control', fq: '120.50' }, FUK1: { n: 'Fukuoka Control', fq: '128.125' }, FUK2: { n: 'Fukuoka Control', fq: '133.025' }, FUK3: { n: 'Fukuoka Control', fq: '124.15' }, DAE: { n: 'Daegu Control', fq: '120.575' }, KOB: { n: 'Kobe Control', fq: '132.45' } };
  /* 후쿠오카 · 인천 비행정보구역 경계(개략: AIP의 경계 지점 KANSU · ANDOL · IGRAS · SAPRA · SAMDO · RUGMA를 이은 선) */
  XC.FIR = [[38.6333, 132.475], [37.6661, 133.0], [37.3128, 132.7364], [35.8239, 130.7236], [33.5842, 128.3158], [32.5033, 126.9647]];
  XC.CRZ = 36000; XC.STAR_ALT = 18000;      /* 서쪽 방향 짝수 FL · GUKDO 진입 +FL180(인천 AD 2.24) */
  /* 좌표계: 위경도 → NM(동 x · 북 y), 자북이 위가 되게 편차 8°W만큼 돌림(관제 화면 · 기수 표시가 자방위) */
  var LAT0 = 36.0, LON0 = 133.5, VAR = 8 * D2R, KY = 60, KX = 60 * Math.cos(LAT0 * D2R);
  XC.xy = function (la, lo) { var X = (lo - LON0) * KX, Y = (la - LAT0) * KY; return { x: X * Math.cos(VAR) + Y * Math.sin(VAR), y: -X * Math.sin(VAR) + Y * Math.cos(VAR) }; };
  XC.ll = function (x, y) { var X = x * Math.cos(VAR) - y * Math.sin(VAR), Y = x * Math.sin(VAR) + y * Math.cos(VAR); return [LAT0 + Y / KY, LON0 + X / KX]; };

  /* 순항 화면이 쓰는 지점: D.fix를 이 구간 지점만 가진 표로 잠시 바꿈(공항 지점과 좌표계가 달라 섞지 않음) — 다른 근무를 시작할 때 되돌림 */
  XC.install = function () { var D = ATC.D; if (!XC.orig) XC.orig = D.fix; var F = {}; Object.keys(XC.P).forEach(function (n) { var p = XC.xy(XC.P[n][0], XC.P[n][1]); F[n] = { x: p.x, y: p.y, n: n }; }); Object.keys(XC.AP).forEach(function (n) { var p = XC.xy(XC.AP[n][0], XC.AP[n][1]); F[n] = { x: p.x, y: p.y, n: n, apt: 1 }; }); D.fix = F; XC.F = F; };
  XC.restore = function () { if (XC.orig) { ATC.D.fix = XC.orig; XC.orig = null; } };
  function F(n) { return XC.F[n]; }
  /* 경로를 따라 지점 n까지 남은 거리(NM) */
  XC.togo = function (ac, n) { var r = ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [], d = 0, p = ac, i; if (r.indexOf(n) < 0) return U.dist(ac, F(n)); for (i = 0; i < r.length; i++) { d += U.dist(p, F(r[i])); p = F(r[i]); if (r[i] === n) break; } return d; };
  XC.passed = function (ac, n) { var r = ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : null; return !!r && r.indexOf(n) < 0 && XC.ROUTE.indexOf(n) < XC.ROUTE.indexOf(r[0] || 'GUKDO'); };
  XC.todNM = function (ac) { return (Math.max(0, ac.alt - XC.STAR_ALT) / 1000) * 3 + 8; };      /* 강하 시작: 1,000ft에 3NM + 감속 여유 8NM(게임 계산) */

  /* ================= 순항 시뮬레이션 ================= */
  function XcSim(o) {
    o = o || {}; o.mode = 'XC'; o.sweep = 4; o.minH = 5;
    XC.install(); XC.loadGeo();
    ATC.RadarSim.call(this, o);
    this.seg = o.seg || 'jp'; this.sched = []; this.events = []; this.endT = 1e9; this.xs = { st: 0, t: 0 };
    this.atis = o.atis || String.fromCharCode(65 + this.rng.int(0, 11));      /* 인천 ATIS 기호 */
    if (this.seg === 'kr') { this.krFlow = this.flow.id; this.krWind = this.wind; this.krQnh = this.qnh; }      /* 인천 페이지: 오늘 인천 운용 방향 · 바람 · QNH */
  }
  ATC.extend(XcSim, ATC.RadarSim);
  XcSim.prototype.update = function (dt) { this.moveAll(dt); };
  XcSim.prototype.apply = function (ac, c) {
    if (c.k === 'star') { if (this.pilot) this.pilot.star = c.name; return true; }      /* STAR는 FMC에 들어감(GUKDO에서 시작 — 순항 화면에서는 GUKDO까지만 그림) */
    if (c.k === 'radar' || c.k === 'roger' || c.k === 'ho') return true;
    return this.applyAir(ac, c);
  };
  XcSim.prototype.checkIn = function () { };
  /* 인천 ATIS(게임 — 인천 운용 방향 · 바람 · QNH는 이 판의 값) */
  XcSim.prototype.atisText = function () {
    var D = ATC.D, kr = this.seg === 'kr', fl = kr && D.flows ? D.flows[this.krFlow || 'N'] : null, arr = this.krFlow === 'S' ? '15L' : '33R';
    var w = this.krWind || { dir: 320, spd: 12 }, nm = ATC.PH ? ATC.PH[this.atis] || this.atis : this.atis;
    return 'Incheon International Airport information ' + nm + ', ' + U.hhmm(this.utc()) + ' UTC. ILS approach. Runway ' + arr + ' and ' + (this.krFlow === 'S' ? '16R' : '34L') + ' in use for arrival. Wind ' + U.pad(w.dir, 3) + ' degrees ' + w.spd + ' knots. Visibility 10 kilometers. QNH ' + (this.krQnh || 1016) + '. Advise on initial contact you have information ' + nm + '.';
  };
  ATC.XcSim = XcSim;
  if (ATC.POS) ATC.POS.XC = { id: 'XC', ko: ATC.T('순항(한 편 비행)'), en: 'EN ROUTE', nm: 'En route', call: 'Fukuoka Control', fq: '124.15', les: 'acc', view: 'radar', spd: 1, sum: '', brief: [] };
  /* 순항 지도 육지(45KB)는 순항 화면을 처음 열 때 읽음 */
  XC.loadGeo = function () { if (ATC.GEO_XC || XC.geoAsk || typeof document === 'undefined') return; XC.geoAsk = true; var t = document.querySelector('script[src*="js/xc.js"]'), m = t && /[?&]v=([^&]+)/.exec(t.getAttribute('src')), sc = document.createElement('script'); sc.src = (ATC.base || '') + 'js/geo/xc.js' + (m ? '?v=' + m[1] : ''); document.head.appendChild(sc); };

  /* ================= 순항 조종사(출발편 조종사의 하늘 단계를 이어받음) ================= */
  var DP = ATC.DepPilot;
  function XcPilot(sim, o) {
    o = o || {}; var c = o.carry, j = o.json, me = this;
    this.sim = sim; sim.pilot = this; this.dep = true; this.xc = true; this.xcMode = true; this.phase = 'air'; this.ver = 0;
    this.prompt = null; this.clr = null; this.asg = {}; this.done = false; this.ci = false; this.freqTo = null; this.called = true;
    this.fly = ATC.Manual ? ATC.Manual.newFly() : { mode: 'auto', on: false }; this.eng = { st: 'on', t0: 0, n1: 90 }; this.apOn = true; this.pbrake = false;
    var src = c || j || {}, f;
    if (src.f) { f = this.f = src.f; if (!f.perf && ATC.D.types) f.perf = ATC.D.types.B789; if (ATC.D.alBy && f.al && ATC.D.alBy[f.al.code]) f.al = ATC.D.alBy[f.al.code];      /* 다른 페이지에서 넘어온 편: 성능 · 항공사 자료는 이 페이지 것으로 */
 this.fp = src.fp; this.sid = src.sid; this.sidK = src.sidK || 'A'; this.cur = src.cur || { hdg: null, alt: null, spd: null }; this.mcp = src.mcp || { hdg: 270, alt: 32000, spd: 290 }; this.nRb = src.nRb || 0; this.nRbOk = src.nRbOk || 0; this.rt = src.rt || []; this.xpdr = src.xpdr || { code: '2000', set: '2000' }; this.vs = src.vs; this.cfg = src.cfg || { gear: 'up', gearT: 0, flap: 0, flapPos: 0 }; this.tAcc = (src.tAcc || 0) + (c && c.sim ? c.sim.t : 0); this.star = src.star || null; this.atisGot = src.atisGot || null; this.descReq = !!src.descReq; }
    else {      /* 「순항부터」 · 「강하부터」: 새로 만든 Vela Air 787 편 */
      f = sim.mkFlight(function (a) { return a.code === 'VLA'; }, 'dep'); f.type = 'B789'; if (ATC.D.types && ATC.D.types.B789) f.perf = ATC.D.types.B789; f.wake = 'H';
      this.f = f; this.fp = { gate: 'BEKLA', dest: 'RKSI', destName: 'Seoul Incheon', rfl: XC.CRZ }; this.sid = 'BEKLA 3A'; this.sidK = 'A'; this.cur = { hdg: null, alt: null, spd: null }; this.mcp = { hdg: 270, alt: 32000, spd: 290 };
      this.nRb = 0; this.nRbOk = 0; this.rt = []; this.xpdr = { code: sim.squawk(), set: null }; this.xpdr.set = this.xpdr.code; this.cfg = { gear: 'up', gearT: 0, flap: 0, flapPos: 0 }; this.tAcc = 0;
    }
    if (f.perf && f.perf.vr && !this.vs) { var KT = ATC.KT || 0.5144; this.vs = { v1: Math.round(f.perf.vr / KT) - 5, vr: Math.round(f.perf.vr / KT), v2: Math.round(f.perf.vr / KT) + 5 }; }
    if (j) { if (j.incs) sim.incs = j.incs.slice(); if (j.log) sim.log = j.log.slice(); if (j.atis) sim.atis = j.atis; if (j.utc) sim.t0 = j.utc - sim.t; }
    sim.usedCs[f.cs] = 1; this.sidR = []; this.sidOn = false;      /* SID 고도 제한은 출발 단계에서 끝남 */
    sim.isFinished = function () { return this.pilot.done; };
    var sys0 = sim.sys; sim.sys = function (t, k) { if (me.own) sys0.call(this, t, k); }; sim.phone = function () { };
    this.mkAc(src, o);
  }
  XcPilot.prototype = Object.create(DP.prototype);
  XcPilot.prototype.constructor = XcPilot;
  XcPilot.prototype.mkAc = function (src, o) {
    var sim = this.sim, f = this.f, kr = sim.seg === 'kr', st = src.ac, p, alt, hdg, ias, tAlt, route, from;
    if (st && st.lat !== undefined) { p = XC.xy(st.lat, st.lon); alt = st.alt; hdg = st.hdg; ias = st.ias; tAlt = st.tAlt; from = st.next; }
    else if (st && st.x !== undefined) {      /* 같은 페이지(하네다 Departure)에서 이어받음: 공항 좌표의 BEKLA 기준 위치를 순항 좌표의 BEKLA 기준으로 옮김(둘 다 자북이 위인 NM 좌표) */
      var B0 = XC.orig && XC.orig.BEKLA, bx = F('BEKLA'), rr = st.nav && st.nav.route ? st.nav.route.slice(st.nav.i || 0) : [];
      p = B0 ? { x: bx.x + (st.x - B0.x), y: bx.y + (st.y - B0.y) } : { x: bx.x, y: bx.y }; alt = st.alt; hdg = st.hdg; ias = st.ias; tAlt = st.tAlt; from = rr.indexOf('BEKLA') >= 0 || (B0 && U.dist(st, B0) > 3 && U.brg(st, B0) > 200) ? 'BEKLA' : 'OLBER';
    }
    if (!p) {      /* 시작 지점: 일본 구간 = BEKLA 지나 Tokyo Control에 첫 호출(FL230 상승 중), 한국 구간 = SAPRA 지나 Daegu Control에 첫 호출(FL360) */
      var a0 = kr ? F('SAPRA') : F('BEKLA'), a1 = kr ? F('BULGA') : F('OLBER'), k = kr ? 0.25 : 0.15; p = { x: a0.x + (a1.x - a0.x) * k, y: a0.y + (a1.y - a0.y) * k }; hdg = U.brg(a0, a1); alt = kr ? XC.CRZ : 21000; tAlt = kr ? XC.CRZ : 23000; ias = kr ? 262 : 290; from = kr ? 'BULGA' : 'OLBER';
    }
    if (o.carryAc) { var ca = o.carryAc; p = XC.xy(ca.lat, ca.lon); alt = ca.alt; hdg = ca.hdg; ias = ca.ias; tAlt = ca.tAlt; from = ca.next || from; }
    var i0 = Math.max(0, XC.ROUTE.indexOf(from)); route = XC.ROUTE.slice(i0);
    var pf = {}, k2; for (k2 in f.perf) pf[k2] = f.perf[k2];
    var ac = sim.spawnAc({ cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: pf, kind: 'dep', gate: 'BEKLA', dest: 'RKSI', destName: 'Seoul Incheon', orig: 'RJTT', squawk: this.xpdr.code, owner: 'me', rfl: this.fp.rfl, entT: sim.t,
      x: p.x, y: p.y, alt: alt, hdg: hdg, ias: ias, tAlt: tAlt, normIas: 290, tIas: ias, fpRoute: XC.ROUTE.slice() });
    ac.setRoute(route); ac.pilotMe = true; this.ac = ac; this.cs = ac.cs;
    if (this.cur.alt === null || this.cur.alt === undefined) this.cur.alt = tAlt;
    this.mcp.alt = this.cur.alt || tAlt; this.mcp.spd = Math.round(ias / 10) * 10; this.mcp.hdg = Math.round(hdg / 5) * 5 || 360;
    var q = kr ? XC.FQ.DAE : XC.FQ.TOK; this.freqNow = 'XC'; this.freqNowN = q.n; this.freqNowFq = q.fq;
    this.note(kr ? ATC.T('{0} {1} — 후쿠오카에서 인천 비행정보구역으로 들어왔습니다. 첫 호출을 하세요.', q.n, q.fq) : ATC.T('{0} {1} — 첫 호출을 하세요(지나는 고도 · 허가 고도 · 요청 순항 고도).', q.n, q.fq), 'info');
    this.ci = false; this.onSay(this.ciText(q));
    this.bump();
  };
  XcPilot.prototype.ciText = function (q) {
    var ac = this.ac, lvl = Math.abs(ac.alt - ac.tAlt) < 150, a = function (v) { return fmt.alt(v >= 9950 && v < 23950 ? Math.round(v / 100) * 100 : Math.round(v / 1000) * 1000); };
    return q.n + ', ' + ATC.csSay(ac) + ', ' + (lvl ? 'maintaining ' + fmt.alt(ac.tAlt) : 'passing ' + a(ac.alt) + ', climbing ' + fmt.alt(ac.tAlt)) + (this.sim.seg === 'jp' && q === XC.FQ.TOK ? ', request ' + fmt.alt(this.fp.rfl) : '') + '.';
  };
  XcPilot.prototype.ciDesc = function (q) { var ac = this.ac, lvl = Math.abs(ac.alt - ac.tAlt) < 150; return q.n + ', ' + ATC.csSay(ac) + ', ' + (lvl ? 'maintaining ' + fmt.alt(ac.tAlt) : 'descending ' + fmt.alt(ac.tAlt)) + ', information ' + (ATC.PH ? ATC.PH[this.sim.atis] || this.sim.atis : this.sim.atis) + '.'; };
  XcPilot.prototype.freqOpts = function () {
    var f = this.freqTo, o = [{ to: 'OK', n: f.n, fq: f.fq }], pool = [XC.FQ.FUK1, XC.FQ.FUK2, XC.FQ.FUK3, XC.FQ.DAE, XC.FQ.KOB, XC.FQ.TOK, { n: 'Seoul Approach', fq: '119.75' }].filter(function (x) { return x.fq !== f.fq; });
    var near = pool.filter(function (x) { return x.n === f.n; }).concat(pool.filter(function (x) { return x.n !== f.n; }));
    o.push({ to: 'X1', n: near[0].n, fq: near[0].fq }); o.push({ to: 'X2', n: f.n, fq: (near[1] || near[0]).fq === f.fq ? '127.65' : (near[1] || near[0]).fq });
    return o.sort(function (a, b) { return a.fq < b.fq ? -1 : 1; });
  };
  XcPilot.prototype.tune = function (to) {
    var sim = this.sim, ac = this.ac, f = this.freqTo; if (!f || f.sent) return;
    var pick = this.freqOpts().filter(function (q) { return q.to === to; })[0] || {};
    if (to !== 'OK') { sim.inc('p_freq_bad', [ac], ATC.T('{0}: 지시받은 주파수가 아닙니다({1}) — 지시는 {2} {3}', ac.cs, pick.fq || '?', f.n, f.fq)); this.bump(); return; }
    f.sent = true; this.freqNow = 'XC'; this.freqNowN = f.n; this.freqNowFq = f.fq; this.ci = false;
    if (f.next === 'kr') { this.phase = 'relay'; this.bump(); XC.toKorea(this); return; }      /* 대구 관제 → 인천 페이지로 */
    if (f.next === 'app') { this.phase = 'relay'; this.bump(); XC.toApp(this); return; }      /* Seoul Approach → 인천 접근관제 시뮬레이션의 도착편으로 */
    this.onSay(this.ciText(f)); this.bump();
  };
  XcPilot.prototype.reqDescent = function () { if (this.descReq || this.prompt || this.clr) return; this.descReq = true; this.onSay(this.freqNowN + ', ' + ATC.csSay(this.ac) + ', request descent.'); this.bump(); };
  XcPilot.prototype.getAtis = function () { var s = this.sim; if (this.atisGot === s.atis) return; this.atisGot = s.atis; s.addLog({ who: 'sys', cs: '', text: 'ATIS — ' + s.atisText(), kind: 'info' }); s.inc('p_atis_ok', [this.ac], ATC.T('{0}: 인천 ATIS(information {1})를 받았습니다.', this.ac.cs, s.atis)); this.bump(); };
  /* AI 관제사(한 편 비행 대본): 단계마다 조건이 맞으면 지시 하나 */
  XcPilot.prototype.xcAi = function () {
    var sim = this.sim, ac = this.ac, x = sim.xs, me = this; if (!ac || this.done || this.phase !== 'air' || this.clr || this.prompt || (this.freqTo && !this.freqTo.sent) || sim.cur || sim.q.length) return;
    if (!this.ci) return;      /* 첫 호출 · 요청을 아직 보내지 않음 */
    if (sim.t < (x.t || 0)) return;
    function say(cmds, wait) { x.t = sim.t + (wait || 6); me.onClr(cmds, {}); }
    function ho(q, next) { var to = { n: q.n, fq: q.fq }; say([{ k: 'ho', to: to }]); me.hoNext = next || ''; }
    if (sim.seg === 'jp') {
      if (x.st === 0) { x.st = 1; say([{ k: 'radar' }, { k: 'alt', v: 32000 }]); return; }      /* Tokyo Control: FL335 아래 구역 → FL320까지 */
      if (x.st === 1 && (ac.alt >= 31500 || XC.passed(ac, 'PIGAP'))) { x.st = 2; ho(XC.FQ.FUK1); return; }      /* FL335 이상 = Fukuoka ACC */
      if (x.st === 2 && this.freqNowFq === XC.FQ.FUK1.fq) { x.st = 3; say([{ k: 'alt', v: this.fp.rfl }]); return; }
      if (x.st === 3 && XC.passed(ac, 'AKNOM')) { x.st = 4; ho(XC.FQ.FUK2); return; }
      if (x.st === 4 && this.freqNowFq === XC.FQ.FUK2.fq) { x.st = 5; say([{ k: 'roger' }]); return; }
      if (x.st === 5 && XC.passed(ac, 'ADGOM')) { x.st = 6; ho(XC.FQ.FUK3); return; }
      if (x.st === 6 && this.freqNowFq === XC.FQ.FUK3.fq) { x.st = 7; say([{ k: 'dct', fix: 'SUGNO' }], 20); return; }      /* 「proceed direct SUGNO」 — FMC에서 DIRECT TO */
      if (x.st === 7 && XC.togo(ac, 'SAPRA') < 25) { x.st = 8; ho(XC.FQ.DAE, 'kr'); return; }      /* 경계 앞에서 대구 관제로 */
    } else {
      if (x.st === 0) { x.st = 1; say([{ k: 'radar' }], 4); return; }
      var tod = XC.togo(ac, 'GUKDO') - XC.todNM(ac);
      if (x.st === 1 && (this.descReq || tod < -2)) { x.st = 2; if (!this.descReq) this.lateDesc = true; say([{ k: 'alt', v: 24000 }]); return; }      /* 강하 요청(또는 강하 시작점을 지나면 관제가 먼저) */
      if (x.st === 2 && (ac.alt < 27000 || XC.togo(ac, 'GUKDO') < 45)) { x.st = 3; say([{ k: 'star', name: this.starName() }, { k: 'alt', v: XC.STAR_ALT }]); return; }
      if (x.st === 3 && XC.togo(ac, 'GUKDO') < 18 && ac.alt < 21000) { x.st = 4; var D = ATC.D; ho(D.freq && D.freq.APP ? D.freq.APP : { n: 'Seoul Approach', fq: '119.75' }, 'app'); return; }
    }
  };
  XcPilot.prototype.starName = function () { var D = ATC.D; return (D.starName && D.starName[this.sim.krFlow || 'N'] && D.starName[this.sim.krFlow || 'N'].GUKDO) || 'GUKDO 2E'; };
  var take0 = DP.prototype.take;
  XcPilot.prototype.take = function (cmds) { var self = this; cmds.forEach(function (c) { if (c.k === 'ho') self.hoTo = c.to; }); take0.call(this, cmds); if (this.freqTo && this.hoTo) { this.freqTo.n = this.hoTo.n; this.freqTo.fq = this.hoTo.fq; this.freqTo.next = this.hoNext || ''; } };
  XcPilot.prototype.tick = function () {
    var keep = ATC.AI; ATC.AI = null; try { DP.prototype.tick.call(this); } finally { ATC.AI = keep; }      /* 순항은 아래 대본 관제사가 맡음 */
    this.xcAi();
  };
  XcPilot.prototype.curText = function () { return ATC.Pilot.prototype.curText.call(this); };
  /* 화면이 바뀌어야 할 때(남은 거리 · 강하 시작점) */
  XcPilot.prototype.xcSig = function () { var ac = this.ac; return ac ? Math.round(XC.togo(ac, ac.nav && ac.nav.route ? ac.nav.route[ac.nav.route.length - 1] : 'GUKDO') / 4) + (ac.nav && ac.nav.i) : ''; };
  /* 바쁜 순간(교신 · 설정할 것)이면 빠르게 감기를 멈춤 */
  XcPilot.prototype.busy = function () { var s = this.sim; return !!(this.prompt || this.clr || (this.freqTo && !this.freqTo.sent) || Object.keys(this.asg).length || s.cur || s.q.length || this.phase !== 'air' || (s.seg === 'kr' && this.ac && !this.descReq && XC.togo(this.ac, 'GUKDO') - XC.todNM(this.ac) < 6 && s.xs.st === 1)); };
  /* 이어 받을 상태(같은 페이지 · 다른 페이지 공통 — 다른 페이지는 JSON) */
  XcPilot.prototype.pack = function () {
    var ac = this.ac, ll = XC.ll(ac.x, ac.y), al = ac.al || {}, r = ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [];
    return { f: { cs: this.f.cs, csWord: this.f.csWord, num: this.f.num, type: 'B789', wake: 'H', al: { code: al.code, cs: al.cs, name: al.name, col: al.col, col2: al.col2 } }, fp: this.fp, sid: this.sid, sidK: this.sidK, cur: this.cur, mcp: this.mcp, nRb: this.nRb, nRbOk: this.nRbOk, rt: this.rt, xpdr: this.xpdr, vs: this.vs, cfg: this.cfg, tAcc: (this.tAcc || 0) + this.sim.t, star: this.star, atisGot: this.atisGot, descReq: this.descReq,
      ac: { lat: ll[0], lon: ll[1], alt: ac.alt, hdg: ac.hdg, ias: ac.ias, tAlt: ac.tAlt, next: r[0] || 'GUKDO' }, incs: this.sim.incs.slice(), log: this.sim.log.slice(-40), atis: this.sim.atis, utc: this.sim.utc(), seed: this.sim.seed, level: this.sim.level.id, t: Date.now() };
  };
  XC.KEY = 'acn_atc_xc_carry_v1';
  ATC.XcPilot = XcPilot;
  ATC.INC.p_atis_ok = { cat: 'P', pts: 1, t: ATC.T('ATIS 받음'), les: 'app' };
  ATC.INC.p_desc_ok = { cat: 'P', pts: 1, t: ATC.T('제때 강하 요청'), les: 'acc' };
  ATC.INC.p_dct_ok = { cat: 'P', pts: 1, t: ATC.T('FMC 직행 입력'), les: 'acc' };

  /* ================= 화면: 순항 지도(ND 같은 넓은 지도) ================= */
  ATC.R.drawXc = function (ctx, W, H, app) {
    var sim = app.sim, v = app.view, p = sim.pilot, ac = p && p.ac, GX = ATC.GEO_XC;
    if (!v.fit) { v.fit = true; var b0 = F('BEKLA'), b1 = F('GUKDO'), bw = Math.abs(b0.x - b1.x) + 220, bh = Math.abs(b0.y - b1.y) + 160; v.scale = Math.max(v.min, Math.min(W / bw, H / bh)); v.cx = (b0.x + b1.x) / 2 + (W / bw < H / bh ? 45 : 0); v.cy = (b0.y + b1.y) / 2; app.follow = false; }      /* 처음: 항로 전체가 보이게 */
    if (ac && app.follow === true) { v.cx = ac.x; v.cy = ac.y; }
    function S(q) { return [W / 2 + (q.x - v.cx) * v.scale, H / 2 - (q.y - v.cy) * v.scale]; }
    function SL(la, lo) { return S(XC.xy(la, lo)); }
    ctx.fillStyle = '#071019'; ctx.fillRect(0, 0, W, H);
    if (GX) { ctx.fillStyle = '#11202c'; ctx.strokeStyle = '#2a4458'; ctx.lineWidth = 1; GX.land.forEach(function (pg) { ctx.beginPath(); pg.forEach(function (q, i) { var s = SL(q[0], q[1]); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); }); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    }
    /* 글자 겹침 줄이기: 먼저 놓인 글자와 겹치면 생략(중요한 것부터 놓음) */
    var occ = [];
    function put(t, x, y, al, force) { var w = ctx.measureText(t).width, x0 = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x, r = [x0 - 2, y - 11, x0 + w + 2, y + 3];
      if (!force) for (var i = 0; i < occ.length; i++) { var o = occ[i]; if (r[0] < o[2] && r[2] > o[0] && r[1] < o[3] && r[3] > o[1]) return false; }
      occ.push(r); ctx.textAlign = al || 'left'; ctx.fillText(t, x, y); ctx.textAlign = 'left'; return true; }
    function putAny(t, s, force) { return put(t, s[0] + 7, s[1] - 6, 'left') || put(t, s[0] - 7, s[1] - 6, 'right') || put(t, s[0] + 7, s[1] + 13, 'left') || (force && put(t, s[0] + 7, s[1] - 6, 'left', true)); }
    var sa = ac ? S(ac) : null, laL = sa && sa[0] + 220 > W; if (sa) occ.push([sa[0] - 12, sa[1] - 12, sa[0] + 12, sa[1] + 12], laL ? [sa[0] - 220, sa[1] + 12, sa[0] + 4, sa[1] + 30] : [sa[0] + 12, sa[1] - 24, sa[0] + 210, sa[1] - 8]);      /* 내 항공기 · 글자 자리 먼저 */
    /* 비행정보구역 경계 */
    ctx.strokeStyle = '#6b5a2a'; ctx.setLineDash([10, 6]); ctx.lineWidth = 1.4; ctx.beginPath(); XC.FIR.forEach(function (q, i) { var s = SL(q[0], q[1]); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); }); ctx.stroke(); ctx.setLineDash([]);
    var fb = SL(36.7, 131.6);
    /* 항로 · 지점 */
    var R0 = XC.ROUTE, act = ac && ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [];
    ctx.lineWidth = 2; ctx.strokeStyle = '#3a6f90'; ctx.beginPath(); R0.forEach(function (n, i) { var s = S(F(n)); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); }); ctx.stroke();
    if (ac && act.length) { ctx.strokeStyle = '#e04bd6'; ctx.lineWidth = 2.4; ctx.beginPath(); var s0 = S(ac); ctx.moveTo(s0[0], s0[1]); act.forEach(function (n) { var s = S(F(n)); ctx.lineTo(s[0], s[1]); }); ctx.stroke(); }      /* 지금 따라가는 경로(자홍색 — FMC 경로) */
    ctx.font = '10px monospace'; ctx.textAlign = 'left';
    R0.forEach(function (n) { var s = S(F(n)), on = act[0] === n; ctx.strokeStyle = on ? '#e04bd6' : '#7fb0cf'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(s[0], s[1] - 5); ctx.lineTo(s[0] + 5, s[1]); ctx.lineTo(s[0], s[1] + 5); ctx.lineTo(s[0] - 5, s[1]); ctx.closePath(); ctx.stroke(); });
    ['RJTT', 'RKSI'].forEach(function (n) { var s = S(F(n)); ctx.strokeStyle = '#9fd0ff'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(s[0], s[1], 5, 0, 7); ctx.stroke(); ctx.fillStyle = '#9fd0ff'; put(n, s[0] + 8, s[1] + 4, 'left', true); });
    var key = ['SAPRA', 'BEKLA', 'GUKDO'], rest = R0.filter(function (n) { return n !== act[0] && key.indexOf(n) < 0; });      /* 지점 이름: 다음 지점 → 주요 지점 → 나머지 */
    (act[0] ? [act[0]] : []).concat(key.filter(function (n) { return n !== act[0]; }), rest).forEach(function (n) { var on = act[0] === n; ctx.fillStyle = on ? '#ff8af5' : '#8fb4cc'; putAny(n, S(F(n)), on || key.indexOf(n) >= 0); });
    var aw = [['Y18', 'OLBER', 'AGSEB'], ['Y182', 'OGISO', 'AKNOM'], ['Y16', 'MADUL', 'SUGNO'], ['Y685', 'ELAPI', 'CUN']]; ctx.fillStyle = '#4f7f9e'; if (v.scale > 0.45) aw.forEach(function (a) { var p1 = F(a[1]), p2 = F(a[2]), s = S({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }); put(a[0], s[0] + 4, s[1] + 14, 'left'); });
    ctx.fillStyle = '#8a7640'; put('INCHEON FIR', fb[0] - 8, fb[1], 'right'); put('FUKUOKA FIR', fb[0] + 8, fb[1], 'left');
    if (GX) { ctx.fillStyle = '#4a6578'; ctx.font = '11px sans-serif'; GX.labs.forEach(function (l) { put(l[0], SL(l[1], l[2])[0], SL(l[1], l[2])[1], 'center'); }); ctx.font = '10px monospace'; }      /* 도시 이름은 마지막(겹치면 생략) */
    /* 강하 시작점(TOD) */
    if (ac && sim.seg === 'kr' || (ac && XC.togo(ac, 'GUKDO') < 260)) { var dd = XC.togo(ac, 'GUKDO') - XC.todNM(ac); if (dd > 0) { var pt = along(ac, dd); if (pt) { var st = S(pt); ctx.strokeStyle = '#3fe08a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(st[0], st[1], 6, 0, 7); ctx.stroke(); ctx.fillStyle = '#3fe08a'; ctx.fillText('T/D', st[0] + 9, st[1] + 4); } } }
    /* 내 항공기 */
    if (ac) {
      var h = ac.hdg * D2R; ctx.save(); ctx.translate(sa[0], sa[1]); ctx.rotate(h); ctx.strokeStyle = '#ffd479'; ctx.fillStyle = '#ffd479'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(0, 10); ctx.moveTo(-9, 0); ctx.lineTo(9, 0); ctx.moveTo(-4, 8); ctx.lineTo(4, 8); ctx.stroke(); ctx.restore();
      var nm = 2 * ac.gs / 60; var sp = S({ x: ac.x + Math.sin(h) * nm, y: ac.y + Math.cos(h) * nm }); ctx.strokeStyle = 'rgba(255,212,121,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sa[0], sa[1]); ctx.lineTo(sp[0], sp[1]); ctx.stroke();      /* 2분 뒤 위치 */
      ctx.fillStyle = '#ffd479'; ctx.font = 'bold 11px monospace'; ctx.textAlign = laL ? 'right' : 'left'; ctx.fillText(ac.cs + '  FL' + U.pad(Math.round(ac.alt / 100), 3) + (Math.abs(ac.alt - ac.tAlt) > 150 ? (ac.tAlt > ac.alt ? '↑' : '↓') + U.pad(Math.round(ac.tAlt / 100), 3) : '') + '  ' + Math.round(ac.gs) + 'KT', laL ? sa[0] + 4 : sa[0] + 14, laL ? sa[1] + 26 : sa[1] - 12); ctx.textAlign = 'left';
    }
    /* 거리 눈금 */
    var nmBar = v.scale > 2 ? 20 : v.scale > 0.8 ? 50 : 100, px = nmBar * v.scale; ctx.strokeStyle = '#5d7f95'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(14, H - 40); ctx.lineTo(14 + px, H - 40); ctx.stroke(); ctx.fillStyle = '#7f9fb4'; ctx.font = '10px monospace'; ctx.fillText(nmBar + ' NM', 14, H - 46);
    ctx.fillStyle = 'rgba(120,150,160,.55)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right'; var cr1 = 'Map: Natural Earth · ' + ATC.T('항로 · 지점: AIP(일본 ENR 3.3 · 한국 ENR 3.3)'), cr2 = ATC.T('비행정보구역 경계는 개략');
    if (ctx.measureText(cr1 + ' · ' + cr2).width < W - 200) ctx.fillText(cr1 + ' · ' + cr2, W - 8, H - 8); else { ctx.fillText(cr1, W - 8, H - 20); ctx.fillText(cr2, W - 8, H - 8); } ctx.textAlign = 'left';
  };
  /* 경로를 따라 d NM 앞의 위치 */
  function along(ac, d) { var r = ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [], p = { x: ac.x, y: ac.y }, i; for (i = 0; i < r.length; i++) { var q = F(r[i]), l = U.dist(p, q); if (l >= d) { var k = d / l; return { x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k }; } d -= l; p = q; } return null; }
  XC.along = along;
})(typeof globalThis !== 'undefined' ? globalThis : this);
