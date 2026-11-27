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
  XC.along = function (ac, d) { var r = ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [], p = { x: ac.x, y: ac.y }, i; for (i = 0; i < r.length; i++) { var q = F(r[i]); if (!q) continue; var l = U.dist(p, q); if (l >= d) { var k = d / l; return { x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k }; } d -= l; p = q; } return null; };      /* 87차: 기상 · 교통 배치 */
  /* 88차: 한 편 비행 비정상 상황 고르기 — 시드 · 난이도(초급 1 · 1 / 중급 2 · 2 / 고급 3 · 2 + 세기). 일본 구간: 난기류 · TCAS · 고도 변경 · 응급 환자 / 인천 구간: 뇌우 · 고도 변경 · 응급 환자(한 번만) */
  XC.pickEvs = function (sim) {
    var lv = ATC.app && ATC.app.level || 2, r = ATC.rng((sim.seed || 1) * 31 + lv * 7 + 3), sh = function (a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    var nj = lv <= 1 ? 1 : lv === 2 ? 2 : 3, nk = lv <= 1 ? 1 : 2, jp = sh(['turb', 'tcas', 'rrt', 'med', 'turb', 'tcas']).filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, nj), e = { lv: lv };
    jp.forEach(function (k) { e[k] = 'jp'; }); var kr = sh(['cb', 'rrtK', e.med ? 'cb' : 'med', 'cb']).filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, nk); kr.forEach(function (k) { if (k === 'med') e.med = 'kr'; else e[k] = 'kr'; });
    e.medT = 60 + Math.floor(r() * 150); e.rrtT = 40 + Math.floor(r() * 90); return e;
  };
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
    if (c.k === 'radar' || c.k === 'roger' || c.k === 'ho' || c.k === 'stby' || c.k === 'rmk') return true;
    return this.applyAir(ac, c);
  };
  XcSim.prototype.checkIn = function () { };
  XcSim.prototype.posLabel = function () { var n = (this.pilot && this.pilot.freqNowN) || 'Tokyo Control'; return n.replace(/ Control$/, '').toUpperCase(); };      /* 교신 기록의 관제 이름(TOKYO · FUKUOKA · DAEGU) */
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
 this.fp = src.fp; this.sid = src.sid; this.sidK = src.sidK || 'A'; this.cur = src.cur || { hdg: null, alt: null, spd: null }; this.mcp = src.mcp || { hdg: 270, alt: 32000, spd: 290 }; this.nRb = src.nRb || 0; this.nRbOk = src.nRbOk || 0; this.rt = src.rt || []; this.xpdr = src.xpdr || { code: '2000', set: '2000' }; this.vs = src.vs; this.cfg = src.cfg || { gear: 'up', gearT: 0, flap: 0, flapPos: 0 }; this.tAcc = (src.tAcc || 0) + (c && c.sim ? c.sim.t : 0); this.star = src.star || null; this.atisGot = src.atisGot || null; this.descReq = !!src.descReq; this.belt = src.belt !== false; this.turb = src.turb || null; }
    else {      /* 「순항부터」 · 「강하부터」: 새로 만든 Vela Air 787 편 */
      f = sim.mkFlight(function (a) { return a.code === 'VLA'; }, 'dep'); f.type = 'B789'; if (ATC.D.types && ATC.D.types.B789) f.perf = ATC.D.types.B789; f.wake = 'H';
      this.f = f; this.fp = { gate: 'BEKLA', dest: 'RKSI', destName: 'Seoul Incheon', rfl: XC.CRZ }; this.sid = 'BEKLA 3A'; this.sidK = 'A'; this.cur = { hdg: null, alt: null, spd: null }; this.mcp = { hdg: 270, alt: 32000, spd: 290 };
      this.belt = true; this.nRb = 0; this.nRbOk = 0; this.rt = []; this.xpdr = { code: sim.squawk(), set: null }; this.xpdr.set = this.xpdr.code; this.cfg = { gear: 'up', gearT: 0, flap: 0, flapPos: 0 }; this.tAcc = 0;
    }
    if (f.perf && f.perf.vr && !this.vs) { var KT = ATC.KT || 0.5144; this.vs = { v1: Math.round(f.perf.vr / KT) - 5, vr: Math.round(f.perf.vr / KT), v2: Math.round(f.perf.vr / KT) + 5 }; }
    if (j) { if (j.incs) sim.incs = j.incs.slice(); if (j.log) sim.log = j.log.slice(); if (j.atis) sim.atis = j.atis; if (j.utc) sim.t0 = j.utc - sim.t; }
    sim.usedCs[f.cs] = 1; this.sidR = []; this.sidOn = false;      /* SID 고도 제한은 출발 단계에서 끝남 */
    sim.isFinished = function () { return this.pilot.done; };
    var sys0 = sim.sys; sim.sys = function (t, k) { if (me.own) sys0.call(this, t, k); }; sim.phone = function () { };
    this.mkAc(src, o);
    this.evs = src.evs || XC.pickEvs(sim); if (src.med) this.med = src.med;      /* 88차: 이번 비행의 비정상 상황(매번 다르게 · 난이도에 따라 개수) */
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
    var me = this, fc = this.fcu = new XC.Fcu(src.fcu); if (!src.fcu) { fc.n1 = alt < tAlt - 100 ? 92 : 84; fc.vs = alt < tAlt - 100 ? 1500 : 0; } ac.fcu = fc;      /* 자동조종 모드 · 추력(81차) */
    fc.onWarn = function (m) { var k = m === 'OVERSPEED' ? 'p_ovsp' : 'p_lowspd'; if ((me.warnT || {})[k] > sim.t - 90) return; (me.warnT = me.warnT || {})[k] = sim.t; sim.inc(k, [ac], m === 'OVERSPEED' ? ATC.T('{0}: {1}kt — 추력을 줄이거나 스피드브레이크를 쓰세요.', ac.cs, Math.round(ac.ias)) : ATC.T('{0}: {1}kt — 추력을 올리거나 기수를 낮추세요(A/T 켜기 · LVL CHG).', ac.cs, Math.round(ac.ias))); me.bump(); };
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
      if (x.st >= 5 && !this.turb && this.evs.turb && XC.togo(ac, 'ADGOM') < 35) { this.turb = { fl: Math.round(ac.tAlt / 100), lo: Math.round(ac.tAlt / 100) - 20, t: sim.t }; say([{ k: 'stby', text: 'moderate turbulence reported at ' + fmt.alt(ac.tAlt) + ' between ADGOM and SUGNO, by a Boeing 777' }]); this.note(ATC.T('{0}: 앞 구간(ADGOM ~ SUGNO) {1}에 중간 정도 난기류 보고 — 좌석벨트 사인을 켜고, 고도를 바꿀지 정하세요.', ac.cs, fmt.alt(ac.tAlt)), 'info'); return; }      /* 겨울 제트기류 — 규슈 · 대한해협 상공(게임 설정) */
      var tf = this.tfc; if (tf && !tf.info && !tf.gone && tf.rng < 22) { tf.info = true; say([{ k: 'stby', text: 'traffic, 12 o\'clock, 20 miles, opposite direction, Boeing 767, descending to ' + fmt.alt(tf.tAlt) }]); return; }      /* 87차: 맞은편 교통 정보 */
      var md = this.med; if (md && md.ans === 'pan' && !md.ack) { md.ack = true; say([{ k: 'stby', text: 'roger PAN PAN, priority approved, I will advise Daegu' }]); return; }      /* 88차: 응급 환자 — 우선권 */
      if (this.evs.rrt && !this.rrt && x.st >= 6 && x.st <= 7 && this.freqNowFq === XC.FQ.FUK3.fq && sim.t > (this.st6T || (this.st6T = sim.t)) + this.evs.rrtT && !(this.turb && !this.turb.outT && this.turb.inT) && !(tf && !tf.gone && tf.info)) { this.rrt = { v: ac.tAlt < 36000 ? 36000 : 38000 }; this.note(ATC.T('{0}: 관제가 다른 교통 때문에 순항 고도를 바꿉니다 — 복창하고 MCP 고도 · 모드를 맞추세요.', ac.cs), 'info'); say([{ k: 'alt', v: this.rrt.v }]); return; }      /* 88차: 고도 변경(교통) */
      if (this.turb && this.turb.req && !this.turb.clr) { this.turb.clr = true; say([{ k: 'alt', v: this.turb.req }]); return; }
      if (x.st === 5 && XC.passed(ac, 'ADGOM')) { x.st = 6; ho(XC.FQ.FUK3); return; }
      if (x.st === 6 && this.freqNowFq === XC.FQ.FUK3.fq) { x.st = 7; say([{ k: 'dct', fix: 'SUGNO' }], 20); return; }      /* 「proceed direct SUGNO」 — FMC에서 DIRECT TO */
      if (x.st === 7 && XC.togo(ac, 'SAPRA') < 25) { x.st = 8; ho(XC.FQ.DAE, 'kr'); return; }      /* 경계 앞에서 대구 관제로 */
    } else {
      if (x.st === 0) { x.st = 1; say([{ k: 'radar' }], 4); return; }
      var wx = this.wx; if (wx && wx.req && !wx.appr) { wx.appr = true; var sd = wx.req, cs0 = ac.csWord + ' ' + ac.num; say([{ k: 'rmk', dev: sd, text: 'deviation ' + sd + ' of track approved, report clear of weather', rb: 'deviation ' + sd + ' of track approved, wilco', alts: ['Deviation ' + (sd === 'left' ? 'right' : 'left') + ' of track approved, wilco, ' + cs0 + '.', 'Roger, proceeding direct GUKDO, ' + cs0 + '.'] }]); return; }      /* 87차: 기상 회피 허가 */
      if (wx && wx.clrReq && !wx.clrOk) { wx.clrOk = true; say([{ k: 'dct', fix: 'GUKDO' }]); return; }
      var md = this.med; if (md && (md.ans === 'pan' || md.ans === 'dct') && !md.dct && x.st <= 2 && !(wx && wx.appr && !wx.clrOk)) { md.dct = true; var r0 = ac.nav && ac.nav.route ? ac.nav.route[ac.nav.i || 0] : null; if (r0 === 'GUKDO') return; if (md.ans === 'pan' && md.seg === 'jp') this.note(ATC.T('{0}: 후쿠오카 관제가 응급 환자(PAN PAN)를 대구에 알렸습니다 — 우선권 · 직선 경로.', ac.cs), 'info'); say([{ k: 'dct', fix: 'GUKDO' }]); return; }      /* 응급 환자: GUKDO 직행 */
      if (this.evs.rrtK && !this.rrt && x.st === 1 && sim.t > (this.krT || (this.krT = sim.t)) + this.evs.rrtT && XC.togo(ac, 'GUKDO') - XC.todNM(ac) > (wx ? 15 : 35) && !(wx && !wx.clrReq && !(wx.past && wx.ans === 'cont') && !(wx.d > 48 && !wx.ans)) && ac.tAlt >= 34000) { this.rrt = { v: ac.tAlt - 2000 }; this.note(ATC.T('{0}: 관제가 다른 교통 때문에 순항 고도를 바꿉니다 — 복창하고 MCP 고도 · 모드를 맞추세요.', ac.cs), 'info'); say([{ k: 'alt', v: this.rrt.v }]); return; }
      var tod = XC.togo(ac, 'GUKDO') - XC.todNM(ac);
      if (x.st === 1 && (this.descReq || tod < -2)) { x.st = 2; if (!this.descReq) this.lateDesc = true; say([{ k: 'alt', v: 24000 }]); return; }      /* 강하 요청(또는 강하 시작점을 지나면 관제가 먼저) */
      if (x.st === 2 && (ac.alt < 27000 || XC.togo(ac, 'GUKDO') < 45)) { x.st = 3; if (!this.belt) sim.inc('p_belt_desc', [ac], ATC.T('{0}: 강하 중인데 좌석벨트 사인이 꺼져 있습니다 — 강하 전에 켜세요.', ac.cs)); say([{ k: 'star', name: this.starName() }, { k: 'alt', v: XC.STAR_ALT }]); return; }
      if (x.st === 3 && XC.togo(ac, 'GUKDO') < 18 && ac.alt < 21000) { x.st = 4; var D = ATC.D; ho(D.freq && D.freq.APP ? D.freq.APP : { n: 'Seoul Approach', fq: '119.75' }, 'app'); return; }
    }
  };
  XcPilot.prototype.starName = function () { var D = ATC.D; return (D.starName && D.starName[this.sim.krFlow || 'N'] && D.starName[this.sim.krFlow || 'N'].GUKDO) || 'GUKDO 2E'; };
  var take0 = DP.prototype.take;
  XcPilot.prototype.take = function (cmds) { var self = this; cmds.forEach(function (c) { if (c.k === 'ho') self.hoTo = c.to; if (c.k === 'rmk' && c.dev && self.wx) { var h = Math.round(U.n360(self.ac.hdg + (c.dev === 'left' ? -20 : 20)) / 5) * 5 || 360; self.wx.hdg = h; self.asg.hdg = { c: { k: 'hdg', v: h, dir: c.dev === 'left' ? 'L' : 'R' }, t: self.sim.t, auto: true }; self.mcp.hdg = h; self.note(ATC.T('{0}: 기상 회피 — MCP 기수 {1}(HDG SEL)로 비켜 가고, 지나면 「clear of weather」를 보고하세요.', self.ac.cs, fmt.hdg(h)), 'info'); } }); take0.call(this, cmds); if (this.freqTo && this.hoTo) { this.freqTo.n = this.hoTo.n; this.freqTo.fq = this.hoTo.fq; this.freqTo.next = this.hoNext || ''; } };
  XcPilot.prototype.rbOpts = function (cmds, ph) {
    var c0 = cmds[0]; if (!(c0 && c0.k === 'rmk' && c0.alts)) return DP.prototype.rbOpts.call(this, cmds, ph);
    var ok = ph.rb.charAt(0).toUpperCase() + ph.rb.slice(1), o = [{ t: ok, ok: true }].concat(c0.alts.map(function (t) { return { t: t, ok: false }; })), r = this.sim.rng;
    for (var i = o.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = o[i]; o[i] = o[j]; o[j] = t; } return o;
  };
  XcPilot.prototype.tick = function () {
    var keep = ATC.AI; ATC.AI = null; try { DP.prototype.tick.call(this); } finally { ATC.AI = keep; }      /* 순항은 아래 대본 관제사가 맡음 */
    this.xcTfc(); this.xcWx(); this.xcMed(); this.xcAi(); this.xcMan(); this.xcTurb();
  };
  /* ---- 87차: 맞은편 교통(TCAS) — 일본 구간 SUGNO를 지나 45NM 앞, 1.2NM 왼쪽 · 우리보다 3,300ft 위에서 1,000fpm으로 1,000ft 위 고도까지 강하(서쪽 짝수 · 동쪽 홀수). 강하 중에 가까워져 TA(교통 주의)가 울림 — TA만으로는 기동하지 않음 ---- */
  XcPilot.prototype.xcTfc = function () {
    var sim = this.sim, ac = this.ac, tf = this.tfc; if (!ac || sim.seg !== 'jp' || this.phase !== 'air') return;
    if (!tf) { if (!this.evs.tcas || !XC.passed(ac, 'SUGNO') || !this.ci) return; var p = XC.along(ac, 45); if (!p) return; var dx = p.x - ac.x, dy = p.y - ac.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, own = Math.round(ac.tAlt / 1000) * 1000;
      tf = this.tfc = { x: p.x - uy * 1.2, y: p.y + ux * 1.2, ux: -ux, uy: -uy, alt: own + 3300, tAlt: own + 1000, vs: -1000, t: sim.t, rng: 45, info: false, ta: false }; return; }
    if (tf.gone) return; var dt = Math.max(0, sim.t - tf.t); tf.t = sim.t; if (!dt) return;
    tf.x += tf.ux * 480 / 3600 * dt; tf.y += tf.uy * 480 / 3600 * dt; if (tf.alt > tf.tAlt) { tf.alt = Math.max(tf.tAlt, tf.alt - 1000 / 60 * dt); tf.vs = tf.alt > tf.tAlt ? -1000 : 0; } else tf.vs = 0;
    var r = Math.hypot(tf.x - ac.x, tf.y - ac.y), cl = (tf.rng - r) / dt * 3600; tf.cl = cl; tf.rng = r;      /* 다가오는 빠르기(kt) */
    var tau = cl > 50 ? r / cl * 3600 : 9e9, dz = tf.alt - ac.alt, dzP = dz + (tf.vs - (ac.vs || 0)) / 60 * Math.min(tau, 60);
    if (!tf.ta && !tf.taEnd && tau < 48 && Math.abs(dzP) < 850 && r < 14) { tf.ta = true; tf.taT = sim.t; this.call = { t: 'TRAFFIC', at: sim.t }; this.note(ATC.T('{0}: TCAS 「TRAFFIC, TRAFFIC」 — 교통 주의(TA). 피하라는 지시(RA)가 아니므로 기동하지 않고, 허가 고도를 지키며 지켜봅니다.', ac.cs), 'warn'); this.bump(); }
    if (tf.ta && cl < 0 && r > 2) { tf.ta = false; tf.taEnd = sim.t; this.bump(); }
    if (cl < 0 && r > 30) { tf.gone = true; this.bump(); }
  };
  /* ---- 88차: 응급 환자(승객) — 객실 승무원 보고 → PAN PAN(긴급)으로 알리고 우선권 · 직선 경로를 받음(의료 지원은 회사 · 지상 의료 상담과 함께 — 게임은 교신만) ---- */
  XcPilot.prototype.xcMed = function () {
    var sim = this.sim, ac = this.ac, x = sim.xs, e = this.evs; if (!ac || this.med || !e || e.med !== sim.seg || this.phase !== 'air' || !this.ci) return;
    if (sim.seg === 'jp' ? x.st < 5 : x.st < 1) return; this.medT0 = this.medT0 || sim.t; if (sim.t < this.medT0 + e.medT || sim.cur || this.clr || this.prompt) return;
    this.med = { seg: sim.seg, t: sim.t }; this.note(ATC.T('{0}: 객실 승무원 — 승객 한 명이 가슴 통증을 호소합니다. 승객 중 의사를 찾고 있습니다. 관제에 알릴지 정하세요.', ac.cs), 'warn'); this.bump();
  };
  XcPilot.prototype.medDue = function () { var m = this.med; return !!(m && !m.ans && !this.sim.cur && !this.clr); };
  XcPilot.prototype.medAns = function (k) { var m = this.med, ac = this.ac, sim = this.sim; if (!m || m.ans) return; m.ans = k; var jp = sim.seg === 'jp';
    if (k === 'pan') { this.onSay('PAN PAN, PAN PAN, PAN PAN, ' + this.freqNowN + ', ' + ATC.csSay(ac) + ', medical emergency on board, request priority' + (jp ? '' : ' and direct GUKDO') + '.'); sim.inc('p_med_ok', [ac], ATC.T('{0}: 응급 환자를 PAN PAN(긴급)으로 알렸습니다 — 우선권 · 지상 구급차 준비.', ac.cs)); }
    else if (k === 'dct') { this.onSay(this.freqNowN + ', ' + ATC.csSay(ac) + ', request direct GUKDO.'); this.note(ATC.T('{0}: 응급 상황은 「PAN PAN」(생명이 위태로우면 「MAYDAY」)으로 알려야 우선권과 지상 지원(구급차)을 받습니다.', ac.cs), 'info'); }
    else sim.inc('p_med_none', [ac], ATC.T('{0}: 응급 환자를 관제에 알리지 않았습니다 — 우선권 · 도착 뒤 구급차를 준비할 수 없습니다.', ac.cs));
    this.bump(); };
  XcPilot.prototype.tfcDue = function () { var tf = this.tfc; return !!(tf && tf.info && !tf.ans && !tf.gone && !this.sim.cur); };
  XcPilot.prototype.taDue = function () { var tf = this.tfc; return !!(tf && tf.taT && !tf.taAns && !tf.gone); };
  XcPilot.prototype.tfcAns = function (k) { var tf = this.tfc, ac = this.ac; if (!tf || tf.ans) return; tf.ans = k; this.onSay((k === 'see' ? 'Traffic in sight, ' : 'Looking out, ') + ATC.csSay(ac) + '.'); this.bump(); };
  XcPilot.prototype.taAns = function (k) { var tf = this.tfc, ac = this.ac, sim = this.sim; if (!tf || tf.taAns) return; tf.taAns = k;
    if (k === 'hold') sim.inc('p_ta_ok', [ac], ATC.T('{0}: TA에 기동하지 않고 허가 고도를 지켰습니다.', ac.cs)); else sim.inc('p_ta_man', [ac], ATC.T('{0}: TA(교통 주의)만으로 고도를 바꾸려 했습니다 — TA에서는 기동하지 않고, 피하는 기동은 RA(회피 지시)일 때만 합니다.', ac.cs));
    this.bump(); };
  /* ---- 87차: 뇌우(적란운) 기상 회피 — 인천 구간 처음에 경로 60NM 앞 · 4NM 오른쪽. 기상 레이더(ND)에 보임. 회피 요청 → 허가 → MCP 기수(HDG SEL) → 지나면 「clear of weather」 → direct GUKDO ---- */
  XcPilot.prototype.xcWx = function () {
    var sim = this.sim, ac = this.ac, wx = this.wx; if (!ac || sim.seg !== 'kr' || this.phase !== 'air') return;
    if (!wx) { if (this.noWx || !this.ci || !this.evs.cb) return; if (XC.togo(ac, 'GUKDO') < 125) { this.noWx = true; return; } var p = XC.along(ac, 55); if (!p) { this.noWx = true; return; } var dx = p.x - ac.x, dy = p.y - ac.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
      wx = this.wx = { x: p.x + uy * 4, y: p.y - ux * 4, seed: (sim.seed || 1) % 997 }; this.bump(); }
    var d = Math.hypot(wx.x - ac.x, wx.y - ac.y), h = ac.hdg * Math.PI / 180, fw = (wx.x - ac.x) * Math.sin(h) + (wx.y - ac.y) * Math.cos(h); wx.d = d; wx.fw = fw;
    wx.k = d < 6 ? 1.6 : d < 11 ? 1 : d < 15 ? 0.35 : 0;      /* 가운데(빨강) · 노랑 · 초록 */
    if (d < 6 && !wx.core) { wx.core = true; sim.inc('p_cb', [ac], ATC.T('{0}: 뇌우 구름(적란운) 한가운데를 지났습니다 — 심한 난기류 · 우박 · 번개 위험. 기상 레이더에서 빨간 곳은 20NM 넘게 떨어져 비켜 갑니다.', ac.cs)); this.note(ATC.T('{0}: 심한 난기류 — 뇌우 구름 속입니다.', ac.cs), 'warn'); this.bump(); }
    if (d < 11 && !this.belt && !wx.hurt) { wx.hurt = true; sim.inc('p_belt_turb', [ac], ATC.T('{0}: 좌석벨트 사인이 꺼진 채 뇌우 구름 가까이의 난기류에 들어갔습니다.', ac.cs)); }
    if (!wx.past && fw < -8) { wx.past = true; this.bump(); }
  };
  XcPilot.prototype.wxDue = function () { var wx = this.wx; return !!(wx && !wx.ans && !wx.past && wx.d < 40 && wx.fw > 10 && !this.sim.cur); };      /* 88차: ND 「40」 원 안에 들어오면 */
  XcPilot.prototype.wxClrDue = function () { var wx = this.wx; return !!(wx && wx.appr && wx.past && !wx.clrReq && !this.clr && !this.sim.cur); };
  XcPilot.prototype.wxAns = function (k) { var wx = this.wx, ac = this.ac, sim = this.sim; if (!wx || wx.ans) return; wx.ans = k;
    if (k === 'left' || k === 'right') { wx.req = k; this.onSay(this.freqNowN + ', ' + ATC.csSay(ac) + ', request deviation ' + k + ' of track due weather.'); if (k === 'left') sim.inc('p_wx_ok', [ac], ATC.T('{0}: 뇌우 구름에서 먼 쪽(왼쪽)으로 비켜 가기로 했습니다.', ac.cs)); }
    this.bump(); };
  XcPilot.prototype.wxClr = function () { var wx = this.wx, ac = this.ac; if (!wx || wx.clrReq) return; wx.clrReq = true; this.onSay(this.freqNowN + ', ' + ATC.csSay(ac) + ', clear of weather, request direct GUKDO.'); this.bump(); };
  /* 난기류(86차): 보고된 구간(ADGOM ~ SUGNO)의 보고 고도 ±1,500ft = 중간(MOD), 그 밖의 같은 구간 = 약함(LGT). 속도 · 고도가 조금씩 흔들림(3D 화면도) */
  XcPilot.prototype.turbZone = function () { var ac = this.ac, t = this.turb; if (!t || !ac) return 0; if (!(XC.passed(ac, 'ADGOM') || XC.togo(ac, 'ADGOM') < 1) || XC.passed(ac, 'SUGNO') || this.sim.seg !== 'jp') return 0; return Math.abs(ac.alt - t.fl * 100) < 1500 ? 2 : 1; };
  XcPilot.prototype.xcTurb = function () {
    var ac = this.ac, sim = this.sim, z = this.turbZone(); if (!ac) return; ac.turb = Math.max(z === 2 ? 1 : z === 1 ? 0.35 : 0, this.wx && this.wx.k || 0);
    this.lvlT = ac.alt > 28000 && Math.abs(ac.alt - ac.tAlt) < 200 && !z ? this.lvlT || sim.t : 0;      /* 순항 고도에서 안정된 때부터(좌석벨트 끄기 알림) */
    if (!z && this.wx && this.wx.k) { var r0 = this.trng || (this.trng = ATC.rng((sim.seed || 1) + 77)), k0 = ac.turb; ac.ias += (r0() - 0.5) * 3 * k0; if (!ac.man && Math.abs(ac.alt - ac.tAlt) < 150) ac.alt = Math.max(ac.tAlt - 100, Math.min(ac.tAlt + 100, ac.alt + (r0() - 0.5) * 40 * k0)); }
    if (z) { var r = this.trng || (this.trng = ATC.rng((sim.seed || 1) + 77)), k = ac.turb; ac.ias += (r() - 0.5) * 3 * k; if (!ac.man && Math.abs(ac.alt - ac.tAlt) < 150) ac.alt = Math.max(ac.tAlt - 100, Math.min(ac.tAlt + 100, ac.alt + (r() - 0.5) * 40 * k)); }      /* 수평 비행 중만 ±100ft 안에서 흔들림 */
    if (z === 2 && !this.belt && !this.turb.hurt) { this.turb.hurt = true; sim.inc('p_belt_turb', [ac], ATC.T('{0}: 좌석벨트 사인이 꺼진 채 중간 정도 난기류에 들어갔습니다 — 객실에서 다칠 수 있습니다.', ac.cs)); this.bump(); }
    if (z && !this.turb.inT) { this.turb.inT = sim.t; this.note(z === 2 ? ATC.T('{0}: 난기류(중간) — 흔들림이 큽니다.', ac.cs) : ATC.T('{0}: 난기류(약함) — 고도를 바꿔 흔들림이 줄었습니다.', ac.cs), z === 2 ? 'warn' : 'info'); this.bump(); }
    if (!z && this.turb && this.turb.inT && !this.turb.outT) { this.turb.outT = sim.t; this.note(ATC.T('{0}: 난기류 구간을 벗어났습니다 — 안정되면 좌석벨트 사인을 꺼도 됩니다.', ac.cs), 'info'); this.bump(); }
  };
  /* 좌석벨트 사인(86차) — 켜기 · 끄기는 객실 방송과 함께(게임은 방송 생략) */
  XcPilot.prototype.setBelt = function (on) {
    var sim = this.sim, ac = this.ac, t = this.turb; if (this.belt === on) return; this.belt = on;
    this.note(on ? ATC.T('{0}: 좌석벨트 사인 켬', ac.cs) : ATC.T('{0}: 좌석벨트 사인 끔', ac.cs), 'info');
    if (on && t && !t.inT && !t.beltOk) { t.beltOk = true; sim.inc('p_belt_ok', [ac], ATC.T('{0}: 난기류 구간 전에 좌석벨트 사인을 켰습니다.', ac.cs)); }
    if (on && sim.seg === 'kr' && !this.beltDescOk && sim.xs.st <= 2) { this.beltDescOk = true; sim.inc('p_belt_ok', [ac], ATC.T('{0}: 강하 전에 좌석벨트 사인을 켰습니다.', ac.cs)); }
    this.bump();
  };
  /* 난기류 정보에 대한 응답: 고도 변경 요청(서쪽 방향 짝수 — 보고 고도 −2,000ft) 또는 그대로 */
  XcPilot.prototype.turbAns = function (k) {
    var t = this.turb, ac = this.ac; if (!t || t.ans) return; t.ans = k;
    if (k === 'req') { t.req = t.lo * 100; this.onSay(this.freqNowN + ', ' + ATC.csSay(ac) + ', request ' + fmt.alt(t.req) + ' due turbulence.'); }
    else this.onSay('Roger, maintaining ' + fmt.alt(ac.tAlt) + ', ' + ATC.csSay(ac) + '.');
    this.bump();
  };
  XcPilot.prototype.beltOffDue = function () { var s = this.sim, ac = this.ac, t = this.turb; var wx = this.wx, tf = this.tfc; return !!(this.belt && this.lvlT && s.t - this.lvlT > 40 && (!t || t.outT) && !(wx && !(wx.clrOk || (wx.past && !wx.appr))) && !(tf && !tf.gone && tf.info) && !this.prompt && !this.clr && !(s.seg === 'kr' && XC.togo(ac, 'GUKDO') - XC.todNM(ac) < 70)); };      /* 88차: 강하 70NM 앞부터는 끄라고 하지 않음 */
  XcPilot.prototype.turbDue = function () { var t = this.turb; return !!(t && !t.ans && !t.inT); };
  /* 순항 손 조종(82차): A/P를 풀면 manual.js가 기체를 움직이고, 다시 연결하면 지금 상태(ALT HOLD 또는 V/S)로 이어받음. 허가 고도를 ±300ft 넘게 지나치면 고도 이탈 */
  XcPilot.prototype.xcMan = function () {
    var ac = this.ac, fc = this.fcu, sim = this.sim, F = this.fly; if (!ac || !fc || ac.gone) return;
    if (ac.man) { fc.wasMan = true; fc.vs = ac.vs || 0; if (F) fc.n1 = 25 + (F.thr || 0) * 72; }
    else if (fc.wasMan) { fc.wasMan = false; if (Math.abs(ac.vs || 0) < 300) { fc.mode = 'ALT'; fc.hold = Math.round(ac.alt / 100) * 100; } else { fc.mode = 'VS'; fc.vsSel = Math.round(ac.vs / 100) * 100; } fc.at = true; fc.ver++;
      this.note(ATC.T('{0}: 자동조종 연결 — 지금 상태({1})로 이어받았습니다. 원하는 고도 모드(VNAV · LVL CHG · V/S)를 누르세요.', ac.cs, fc.mode === 'ALT' ? 'ALT HOLD' : 'V/S ' + fc.vsSel)); this.bump(); }
    var ta = ac.tAlt; if (this.bustRef !== ta) { this.bustRef = ta; this.bustDir = Math.abs(ta - ac.alt) < 150 ? 0 : ta > ac.alt ? 1 : -1; }
    if (this.bustDir && (this.bustDir > 0 ? ac.alt >= ta - 100 : ac.alt <= ta + 100)) this.bustDir = 0;      /* 허가 고도에 닿음 → 이제부터 ±300ft */
    var bust = this.bustDir > 0 ? ac.alt > ta + 300 : this.bustDir < 0 ? ac.alt < ta - 300 : Math.abs(ac.alt - ta) > 300;
    if (bust && !(this.bustT > sim.t - 60)) { this.bustT = sim.t; sim.inc('p_alt_bust', [ac], ATC.T('{0}: 허가 고도 {1}에서 {2}ft 벗어났습니다(±300ft 안을 지키세요).', ac.cs, fmt.alt(ta), Math.round(Math.abs(ac.alt - ta)))); this.bump(); }
  };
  /* 출발편 지상용 키 · 조종간 글을 물려받지 않게(84차): Z = 자동조종 연결/해제, 조종간 = 기수 */
  XcPilot.prototype.manKey = null; XcPilot.prototype.taxiHint = null;
  XcPilot.prototype.stickLbl = function () { return ATC.T('↓ 당기면 기수 올림'); };
  XcPilot.prototype.curText = function () { return ATC.Pilot.prototype.curText.call(this); };
  /* 화면이 바뀌어야 할 때(남은 거리 · 강하 시작점) */
  XcPilot.prototype.xcSig = function () { var ac = this.ac, fc = this.fcu; return (fc ? fc.ver + fc.mode : '') + (ac ? Math.round(XC.togo(ac, ac.nav && ac.nav.route ? ac.nav.route[ac.nav.route.length - 1] : 'GUKDO') / 4) + (ac.nav && ac.nav.i) : ''); };
  /* 바쁜 순간(교신 · 설정할 것)이면 빠르게 감기를 멈춤 */
  /* 다음 할 일까지 남은 시간(게임 초) — 「▶▶ 빠르게」가 그 전에 미리 ×1로 돌아오게(83차) */
  XcPilot.prototype.nextEv = function () {
    var sim = this.sim, ac = this.ac, x = sim.xs; if (!ac || this.phase !== 'air' || !this.ci) return null;
    var g = Math.max(150, ac.gs || 400) / 3600, T = function (nm) { return Math.max(0, nm) / g; }, up = function (a) { return ac.vs > 100 ? Math.max(0, a - ac.alt) / ac.vs * 60 : 9e9; }, dn = function (a) { return ac.vs < -100 ? Math.max(0, ac.alt - a) / -ac.vs * 60 : 9e9; };
    var e = this.evs || {}, ev0 = null; if (e.med === sim.seg && !this.med && this.medT0) ev0 = { t: this.medT0 + e.medT - sim.t, n: ATC.T('객실 보고') };      /* 88차 */
    var ev1 = this.nextEv0(); return ev0 && (!ev1 || ev0.t < ev1.t) ? ev0 : ev1;
  };
  XcPilot.prototype.nextEv0 = function () {
    var sim = this.sim, ac = this.ac, x = sim.xs;
    var g = Math.max(150, ac.gs || 400) / 3600, T = function (nm) { return Math.max(0, nm) / g; }, up = function (a) { return ac.vs > 100 ? Math.max(0, a - ac.alt) / ac.vs * 60 : 9e9; }, dn = function (a) { return ac.vs < -100 ? Math.max(0, ac.alt - a) / -ac.vs * 60 : 9e9; };
    if (sim.seg === 'jp') {
      if (x.st === 1) return { t: Math.min(up(31500), XC.passed(ac, 'PIGAP') ? 0 : T(XC.togo(ac, 'PIGAP'))), n: 'Fukuoka Control' };
      if (x.st === 3) return { t: T(XC.togo(ac, 'AKNOM')), n: 'Fukuoka Control (AKNOM)' };
      if (x.st === 5) return this.turb || !this.evs.turb ? { t: T(XC.togo(ac, 'ADGOM')), n: 'Fukuoka Control (ADGOM)' } : { t: T(XC.togo(ac, 'ADGOM') - 35), n: ATC.T('난기류 정보') };
      var tf = this.tfc; if (x.st === 7 && !tf && this.evs.tcas) return { t: T(XC.togo(ac, 'SUGNO')) + 60, n: ATC.T('교통 정보') }; if (tf && !tf.info && tf.cl > 0) return { t: Math.max(0, tf.rng - 22) / tf.cl * 3600, n: ATC.T('교통 정보') }; if (tf && tf.info && !tf.taT && !tf.gone && tf.cl > 0) return { t: Math.max(0, tf.rng - 13) / tf.cl * 3600, n: 'TCAS' };
      if (x.st === 7) return { t: T(XC.togo(ac, 'SAPRA') - 25), n: 'Daegu Control' };
    } else {
      var tod = XC.togo(ac, 'GUKDO') - XC.todNM(ac), wx = this.wx;
      if (wx && !wx.ans && !wx.past && wx.fw > 10) return { t: T(wx.d - 40), n: ATC.T('기상 회피') }; if (wx && wx.appr && !wx.past) return { t: T(wx.fw + 8), n: 'clear of weather' };
      if (x.st === 1) return this.atisGot ? (this.belt ? { t: this.descReq ? 0 : T(tod - 6), n: ATC.T('강하 요청(T/D)') } : { t: T(tod - 15), n: ATC.T('좌석벨트 사인(강하 전)') }) : { t: T(tod - 40), n: ATC.T('인천 ATIS 듣기') };
      if (x.st === 2) return { t: Math.min(T(XC.togo(ac, 'GUKDO') - 45), dn(27000)), n: ATC.T('STAR 허가') };
      if (x.st === 3) return { t: Math.max(T(XC.togo(ac, 'GUKDO') - 18), dn(21000) < 9e8 ? dn(21000) : 0), n: 'Seoul Approach' };
    }
    return null;
  };
  XcPilot.prototype.busy = function () { var s = this.sim; return !!(this.medDue() || this.turbDue() || this.tfcDue() || this.taDue() || this.wxDue() || this.wxClrDue() || this.prompt || this.clr || (this.freqTo && !this.freqTo.sent) || Object.keys(this.asg).length || s.cur || s.q.length || this.phase !== 'air' || (s.seg === 'kr' && this.ac && !this.descReq && XC.togo(this.ac, 'GUKDO') - XC.todNM(this.ac) < 6 && s.xs.st === 1)); };
  /* 이어 받을 상태(같은 페이지 · 다른 페이지 공통 — 다른 페이지는 JSON) */
  XcPilot.prototype.pack = function () {
    var ac = this.ac, ll = XC.ll(ac.x, ac.y), al = ac.al || {}, r = ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [];
    return { f: { cs: this.f.cs, csWord: this.f.csWord, num: this.f.num, type: 'B789', wake: 'H', al: { code: al.code, cs: al.cs, name: al.name, col: al.col, col2: al.col2 } }, fp: this.fp, sid: this.sid, sidK: this.sidK, cur: this.cur, mcp: this.mcp, nRb: this.nRb, nRbOk: this.nRbOk, rt: this.rt, xpdr: this.xpdr, vs: this.vs, cfg: this.cfg, tAcc: (this.tAcc || 0) + this.sim.t, star: this.star, atisGot: this.atisGot, descReq: this.descReq, belt: this.belt, turb: this.turb, evs: this.evs, med: this.med,
      fcu: this.fcu ? this.fcu.pack() : null, ac: { lat: ll[0], lon: ll[1], alt: ac.alt, hdg: ac.hdg, ias: ac.ias, tAlt: ac.tAlt, next: r[0] || 'GUKDO' }, incs: this.sim.incs.slice(), log: this.sim.log.slice(-40), atis: this.sim.atis, utc: this.sim.utc(), seed: this.sim.seed, level: this.sim.level.id, t: Date.now() };
  };

  /* ---------- 자동조종 고도 모드 · 오토스로틀 · 스피드브레이크(81차) ----------
   * VNAV = FMC가 허가 고도(MCP 고도 창)까지 계획대로 오르내림 · LVL CHG = 속도는 기수로, 추력은 상승(CLB) · 강하(IDLE) · V/S = 정한 분당 상승 · 강하율 · ALT HOLD = 누른 순간의 고도 유지
   * 추력: A/T 켜짐이면 모드에 맞게 자동, 꺼지면 추력 레버(N1) 그대로 → 속도가 남거나 모자람. 스피드브레이크 = 항력(같은 추력에서 더 빨리 강하 · 감속). 수치는 게임용 단순 모형 */
  function Fcu(o) { o = o || {}; this.mode = o.mode || 'VNAV'; this.vsSel = o.vsSel || -1000; this.at = o.at !== false; this.thr = o.thr || 0.8; this.sb = o.sb || 0; this.n1 = o.n1 || 85; this.vs = 0; this.hold = o.hold; this.msg = ''; this.ver = 0; }
  XC.Fcu = Fcu;
  Fcu.prototype.pack = function () { return { mode: this.mode, vsSel: this.vsSel, at: this.at, thr: this.thr, sb: this.sb, n1: this.n1, hold: this.hold }; };
  Fcu.prototype.nlev = function (ac) { return Math.min(94, 56 + ac.alt / 1000 * 0.62 + (ac.ias - 250) * 0.16 + this.sb * 16); };      /* 수평 비행에 필요한 N1(%) */
  Fcu.prototype.cr = function (ac) { var c = (ac.perf && ac.perf.climb) || 2500; return c * (ac.alt > 28000 ? 0.45 : ac.alt > 18000 ? 0.65 : ac.alt > 10000 ? 0.85 : 1); };
  Fcu.prototype.vmo = function (ac) { return ac.alt > 26000 ? 330 - (ac.alt - 26000) / 1000 * 3.2 : 340; };      /* 마하 한계를 대신하는 높은 고도의 최대 속도(대략 M0.89) */
  Fcu.prototype.vmin = function (ac) { return ac.alt > 30000 ? 215 + (ac.alt - 30000) / 1000 * 2 : 210; };
  Fcu.prototype.set = function (k, v, ac) {
    if (k === 'mode') { if (v === 'ALT' && ac) this.hold = Math.round(ac.alt / 100) * 100; if (v === 'VS' && ac) this.vsSel = Math.round((this.vs || (ac.tAlt > ac.alt ? 1000 : -1000)) / 100) * 100 || (ac.tAlt > ac.alt ? 1000 : -1000); this.mode = v; }
    else if (k === 'vs') this.vsSel = U.clamp(Math.round((this.vsSel + v) / 100) * 100, -6000, 6000);
    else if (k === 'at') { this.at = !this.at; if (!this.at) this.thr = U.clamp((this.n1 - 25) / 72, 0, 1); }
    else if (k === 'thr') { this.at = false; this.thr = U.clamp(this.thr + v, 0, 1); }
    else if (k === 'sb') this.sb = v;
    this.ver++;
  };
  Fcu.prototype.step = function (ac, dt) {
    if (!dt) return true;
    var md = this.mode, lv = this.nlev(ac), cr = this.cr(ac), dr = 2400 + this.sb * 1700, tA = ac.tAlt, da = tA - ac.alt, tgt = U.clamp(ac.tIas || 280, 180, 330);
    if ((md === 'FLCH' || md === 'VS') && Math.abs(da) < 80 && (md === 'FLCH' || this.vsSel * da >= 0)) { md = this.mode = 'ALT'; this.hold = tA; this.ver++; }      /* 고도 창에 닿으면 ALT로 잡음 */
    var hold = md === 'ALT' ? (this.hold === undefined ? (this.hold = Math.round(ac.alt / 100) * 100) : this.hold) : md === 'VNAV' && Math.abs(da) < 80 ? tA : null;
    var avail = function (n1) { return n1 >= lv ? (n1 - lv) / Math.max(4, 97 - lv) * cr * 1.15 : (n1 - lv) / Math.max(4, lv - 27) * dr; };      /* 이 추력으로 낼 수 있는 상승률(속도 그대로일 때, ft/min) */
    var vsCmd, n1T;
    if (hold !== null) vsCmd = U.clamp((hold - ac.alt) * 3, -1000, 1000);
    else if (md === 'VS') vsCmd = this.vsSel;
    else if (md === 'VNAV' && da > 0) vsCmd = cr * U.clamp(1 - (tgt - ac.ias - 5) / 30, 0, 1);      /* VNAV 상승: 계획 상승률(속도가 많이 모자라면 상승을 줄여 속도 먼저), 속도는 추력이 맞춤 */
    else {      /* LVL CHG 오르내림 · VNAV 강하: 추력은 상승 · 아이들, 속도는 기수로 */
      var up = da > 0; n1T = this.at ? (up ? Math.min(97, lv + 15) : 27) : 25 + this.thr * 72;
      vsCmd = avail(this.n1) + U.clamp((ac.ias - tgt) * 90, -1800, 1800); vsCmd = up ? U.clamp(vsCmd, 0, cr * 1.3) : U.clamp(vsCmd, -dr * 1.6, 0);
      if (md === 'VNAV' && up) vsCmd = Math.min(vsCmd, cr);
    }
    var vmin = this.vmin(ac); if (ac.ias < vmin - 20) vsCmd = Math.min(vsCmd, -1200 - (vmin - 20 - ac.ias) * 60);      /* 너무 느리면 고도를 지키지 못하고 가라앉음 */
    if (n1T === undefined) n1T = this.at ? U.clamp(lv + (vsCmd >= 0 ? vsCmd / (cr * 1.15) * (97 - lv) : vsCmd / dr * (lv - 27)) + (tgt - ac.ias) * 0.9, 27, 97) : 25 + this.thr * 72;
    this.n1 += U.clamp(n1T - this.n1, -4 * dt, 4 * dt);      /* 엔진이 따라오는 속도 */
    this.vs += U.clamp(vsCmd - this.vs, -700 * dt, 700 * dt);      /* 기수가 따라오는 속도 */
    var st = this.vs / 60 * dt; if (hold !== null && ac.ias >= vmin - 20 && Math.abs(hold - ac.alt) < Math.abs(st)) st = hold - ac.alt;
    ac.alt += st; ac.vs = Math.round(this.vs);
    ac.ias = U.clamp(ac.ias + (avail(this.n1) - this.vs) / 1000 * 0.6 * dt, vmin - 45, 380);      /* 남는 힘 → 가속, 모자라면 감속 */
    var m = ac.ias > this.vmo(ac) + 2 ? 'OVERSPEED' : ac.ias < vmin - 3 ? 'AIRSPEED LOW' : '';
    if (m !== this.msg) { this.msg = m; this.ver++; if (m && this.onWarn) this.onWarn(m); }
    return true;
  };
  XC.KEY = 'acn_atc_xc_carry_v1';
  ATC.XcPilot = XcPilot;
  ATC.INC.p_atis_ok = { cat: 'P', pts: 1, t: ATC.T('ATIS 받음'), les: 'app' };
  ATC.INC.p_desc_ok = { cat: 'P', pts: 1, t: ATC.T('제때 강하 요청'), les: 'acc' };
  ATC.INC.p_dct_ok = { cat: 'P', pts: 1, t: ATC.T('FMC 직행 입력'), les: 'acc' };
  ATC.INC.p_alt_bust = { cat: 'P', pts: -4, t: ATC.T('고도 이탈(허가 고도 ±300ft 밖)'), les: 'acc' };
  ATC.INC.p_ovsp = { cat: 'P', pts: -2, t: ATC.T('과속(OVERSPEED)'), les: 'acc' };
  ATC.INC.p_lowspd = { cat: 'P', pts: -3, t: ATC.T('속도 부족(AIRSPEED LOW)'), les: 'acc' };
  ATC.INC.p_belt_ok = { cat: 'P', pts: 1, t: ATC.T('제때 좌석벨트 사인'), les: 'acc' };
  ATC.INC.p_belt_turb = { cat: 'P', pts: -3, t: ATC.T('난기류 중 좌석벨트 사인 꺼짐'), les: 'acc' };
  ATC.INC.p_med_ok = { cat: 'P', pts: 2, t: ATC.T('응급 환자를 PAN PAN으로 알림'), les: 'acc' };
  ATC.INC.p_med_none = { cat: 'P', pts: -3, t: ATC.T('응급 환자를 알리지 않음'), les: 'acc' };
  ATC.INC.p_ta_ok = { cat: 'P', pts: 1, t: ATC.T('TA에 바르게 대응'), les: 'acc' };
  ATC.INC.p_ta_man = { cat: 'P', pts: -3, t: ATC.T('TA만으로 기동'), les: 'acc' };
  ATC.INC.p_wx_ok = { cat: 'P', pts: 1, t: ATC.T('뇌우를 먼 쪽으로 회피'), les: 'acc' };
  ATC.INC.p_cb = { cat: 'P', pts: -4, t: ATC.T('뇌우 구름 속 통과'), les: 'acc' };
  ATC.INC.p_belt_desc = { cat: 'P', pts: -1, t: ATC.T('강하 중 좌석벨트 사인 꺼짐'), les: 'acc' };

  /* ================= 화면: 순항 지도(ND 같은 넓은 지도) ================= */
  /* 89차: 위에서 본 항공기(787 비율 — 길이 63m · 날개폭 60m) — 순항 지도용. 기수 방향 h(라디안, 0 = 위), 크기 z = 길이(px) */
  var XBASE = (function () { try { var c = document.currentScript && document.currentScript.src || ''; return c.replace(/js\/xc\.js.*$/, ''); } catch (e) { return ''; } })();
  var PIMG = {}; function pimg(k) { if (PIMG[k] !== undefined) return PIMG[k]; if (typeof Image === 'undefined') return (PIMG[k] = null); var im = new Image(); im.onload = function () { im.ok = true; }; im.src = XBASE + 'assets/img/xc_top_' + k + '.webp'; return (PIMG[k] = im); }      /* 89차: 강좌 영상에 쓰던 위에서 본 787 그림(기수 위) — 내 항공기 = Vela 도장, 다른 교통 = 회색 */
  XC.plane = function (ctx, x, y, h, z, o) {
    o = o || {}; var im = pimg(o.img || '787');
    if (im && im.ok) { ctx.save(); ctx.translate(x, y); if (o.ring) { ctx.strokeStyle = o.ring; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, z * 0.62, 0, 7); ctx.stroke(); } ctx.rotate(h); if (o.glow) { ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 6; } var wz = z * im.width / im.height; ctx.drawImage(im, -wz / 2, -z / 2, wz, z); ctx.restore(); return; }
    ctx.save(); ctx.translate(x, y); ctx.rotate(h); ctx.scale(z, z); ctx.lineJoin = 'round';
    if (o.glow) { ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 0.12; ctx.shadowOffsetY = 0; }
    if (o.ring) { ctx.strokeStyle = o.ring; ctx.lineWidth = 0.06; ctx.beginPath(); ctx.arc(0, 0, 0.62, 0, 7); ctx.stroke(); }
    ctx.fillStyle = o.body || '#eef1f4'; ctx.strokeStyle = 'rgba(20,30,40,.75)'; ctx.lineWidth = 0.025;
    var wing = [[0.045, -0.06], [0.475, 0.19], [0.485, 0.245], [0.43, 0.24], [0.045, 0.12]], stab = [[0.035, 0.34], [0.19, 0.455], [0.19, 0.49], [0.035, 0.465]];
    [wing, stab].forEach(function (P) { [1, -1].forEach(function (sx) { ctx.beginPath(); P.forEach(function (q, i) { if (i) ctx.lineTo(q[0] * sx, q[1]); else ctx.moveTo(q[0] * sx, q[1]); }); ctx.closePath(); ctx.fill(); ctx.stroke(); }); });
    ctx.fillStyle = o.body || '#eef1f4'; ctx.beginPath(); ctx.moveTo(0, -0.5); ctx.bezierCurveTo(0.03, -0.49, 0.047, -0.44, 0.047, -0.38); ctx.lineTo(0.047, 0.3); ctx.bezierCurveTo(0.045, 0.42, 0.02, 0.49, 0, 0.5); ctx.bezierCurveTo(-0.02, 0.49, -0.045, 0.42, -0.047, 0.3); ctx.lineTo(-0.047, -0.38); ctx.bezierCurveTo(-0.047, -0.44, -0.03, -0.49, 0, -0.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0; ctx.fillStyle = o.tail || '#1f6fd0'; ctx.beginPath(); ctx.moveTo(-0.012, 0.33); ctx.lineTo(0.012, 0.33); ctx.lineTo(0.01, 0.5); ctx.lineTo(-0.01, 0.5); ctx.closePath(); ctx.fill();      /* 수직 꼬리 */
    ctx.fillStyle = 'rgba(30,50,70,.85)'; ctx.beginPath(); ctx.moveTo(-0.03, -0.43); ctx.lineTo(0.03, -0.43); ctx.lineTo(0.022, -0.405); ctx.lineTo(-0.022, -0.405); ctx.closePath(); ctx.fill();      /* 조종석 창 */
    ctx.restore();
  };
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
    var sa = ac ? S(ac) : null, laL = sa && sa[0] + 220 > W; if (sa) occ.push([sa[0] - 22, sa[1] - 22, sa[0] + 22, sa[1] + 22], laL ? [sa[0] - 230, sa[1] - 80, sa[0] - 18, sa[1] - 6] : [sa[0] + 18, sa[1] - 80, sa[0] + 230, sa[1] - 6]);      /* 내 항공기 · 글자 자리 먼저 */
    ctx.font = '10px monospace'; if (ac && sim.seg === 'kr' || (ac && XC.togo(ac, 'GUKDO') < 260)) { var dd = XC.togo(ac, 'GUKDO') - XC.todNM(ac); if (dd > 0) { var pt = along(ac, dd); if (pt) { var st = S(pt); ctx.strokeStyle = '#3fe08a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(st[0], st[1], 6, 0, 7); ctx.stroke(); occ.push([st[0] - 8, st[1] - 8, st[0] + 8, st[1] + 8]); ctx.fillStyle = '#3fe08a'; put('T/D', st[0] + 9, st[1] + 4, 'left', true); } } }      /* T/D 자리도 먼저(지점 이름이 피함) */
    /* 비행정보구역 경계 */
    ctx.strokeStyle = '#6b5a2a'; ctx.setLineDash([10, 6]); ctx.lineWidth = 1.4; ctx.beginPath(); XC.FIR.forEach(function (q, i) { var s = SL(q[0], q[1]); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); }); ctx.stroke(); ctx.setLineDash([]);
    var fb = SL(36.7, 131.6);
    /* 항로 · 지점 */
    var R0 = XC.ROUTE, act = ac && ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [];
    ctx.lineWidth = 2; ctx.strokeStyle = '#3a6f90'; ctx.beginPath(); R0.forEach(function (n, i) { var s = S(F(n)); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); }); ctx.stroke();
    if (ac && act.length) { ctx.strokeStyle = '#e04bd6'; ctx.lineWidth = 2.4; ctx.beginPath(); var s0 = S(ac); ctx.moveTo(s0[0], s0[1]); act.forEach(function (n) { var s = S(F(n)); ctx.lineTo(s[0], s[1]); }); ctx.stroke(); }      /* 지금 따라가는 경로(자홍색 — FMC 경로) */
    var pl = sim.pilot; if (pl && pl.wx) { var w0 = S(pl.wx), w1 = S({ x: pl.wx.x + 10, y: pl.wx.y }), pr = Math.max(0.3, Math.abs(w1[0] - w0[0]) / 10); [[15, 'rgba(40,200,80,.45)'], [11, 'rgba(240,210,40,.6)'], [6, 'rgba(230,40,40,.75)']].forEach(function (lv) { ctx.fillStyle = lv[1]; ctx.beginPath(); ctx.arc(w0[0], w0[1], lv[0] * pr, 0, 7); ctx.fill(); }); }      /* 87차: 뇌우(기상 레이더) */
    if (pl && pl.tfc && !pl.tfc.gone) { var t0 = S(pl.tfc), tz = Math.max(30, Math.min(80, 0.03 * v.scale)); XC.plane(ctx, t0[0], t0[1], Math.atan2(pl.tfc.ux, pl.tfc.uy), tz, { img: 'other', body: '#d9dee4', tail: '#9aa4ae', ring: pl.tfc.ta ? '#ffb000' : null }); ctx.font = '10px monospace'; ctx.fillStyle = pl.tfc.ta ? '#ffb000' : '#c9d3dc'; var tl = 'B767 FL' + U.pad(Math.round(pl.tfc.alt / 100), 3) + (pl.tfc.vs < -100 ? '↓' : pl.tfc.vs > 100 ? '↑' : ''); put(tl, t0[0] - tz * 0.7, t0[1] + tz * 0.75, 'right') || put(tl, t0[0] + tz * 0.7, t0[1] + tz * 0.75, 'left') || put(tl, t0[0], t0[1] - tz * 0.75, 'center', true); }      /* 맞은편 교통 — 89차: 레이더 마름모 대신 위에서 본 항공기 */
    ctx.font = '10px monospace'; ctx.textAlign = 'left';
    R0.forEach(function (n) { var s = S(F(n)), on = act[0] === n; ctx.strokeStyle = on ? '#e04bd6' : '#7fb0cf'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(s[0], s[1] - 5); ctx.lineTo(s[0] + 5, s[1]); ctx.lineTo(s[0], s[1] + 5); ctx.lineTo(s[0] - 5, s[1]); ctx.closePath(); ctx.stroke(); });
    ['RJTT', 'RKSI'].forEach(function (n) { var s = S(F(n)); ctx.strokeStyle = '#9fd0ff'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(s[0], s[1], 5, 0, 7); ctx.stroke(); ctx.fillStyle = '#9fd0ff'; put(n, s[0] + 8, s[1] + 4, 'left', true); });
    var key = ['SAPRA', 'BEKLA', 'GUKDO'], rest = R0.filter(function (n) { return n !== act[0] && key.indexOf(n) < 0; });      /* 지점 이름: 다음 지점 → 주요 지점 → 나머지 */
    (act[0] ? [act[0]] : []).concat(key.filter(function (n) { return n !== act[0]; }), rest).forEach(function (n) { var on = act[0] === n; ctx.fillStyle = on ? '#ff8af5' : '#8fb4cc'; putAny(n, S(F(n)), on || key.indexOf(n) >= 0); });
    var aw = [['Y18', 'OLBER', 'AGSEB'], ['Y182', 'OGISO', 'AKNOM'], ['Y16', 'MADUL', 'SUGNO'], ['Y685', 'ELAPI', 'CUN']]; ctx.fillStyle = '#4f7f9e'; if (v.scale > 0.45) aw.forEach(function (a) { var p1 = F(a[1]), p2 = F(a[2]), s = S({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }); put(a[0], s[0] + 4, s[1] + 14, 'left'); });
    ctx.fillStyle = '#8a7640'; put('INCHEON FIR', fb[0] - 8, fb[1], 'right'); put('FUKUOKA FIR', fb[0] + 8, fb[1], 'left');
    if (GX) { ctx.fillStyle = '#4a6578'; ctx.font = '11px sans-serif'; GX.labs.forEach(function (l) { put(l[0], SL(l[1], l[2])[0], SL(l[1], l[2])[1], 'center'); }); ctx.font = '10px monospace'; }      /* 도시 이름은 마지막(겹치면 생략) */
    /* 강하 시작점(TOD) */
    /* 내 항공기 */
    if (ac) {
      var h = ac.hdg * D2R, tr = sim._trail || (sim._trail = []), lt = tr[tr.length - 1];      /* 89차: 기내 에어쇼 지도처럼 — 지나온 길 · 위에서 본 787 · 정보 칸(레이더 기호 · 데이터 태그 대신) */
      if (!lt || U.dist(lt, ac) > 2) { tr.push({ x: ac.x, y: ac.y }); if (tr.length > 600) tr.shift(); }
      if (tr.length > 1) { ctx.strokeStyle = 'rgba(255,212,121,.45)'; ctx.lineWidth = 2; ctx.setLineDash([2, 4]); ctx.beginPath(); tr.forEach(function (q, i) { var s1 = S(q); if (i) ctx.lineTo(s1[0], s1[1]); else ctx.moveTo(s1[0], s1[1]); }); ctx.lineTo(sa[0], sa[1]); ctx.stroke(); ctx.setLineDash([]); }
      var nm = 2 * ac.gs / 60; var sp = S({ x: ac.x + Math.sin(h) * nm, y: ac.y + Math.cos(h) * nm }); ctx.strokeStyle = 'rgba(255,212,121,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sa[0], sa[1]); ctx.lineTo(sp[0], sp[1]); ctx.stroke();      /* 2분 뒤 위치 */
      XC.plane(ctx, sa[0], sa[1], h, Math.max(54, Math.min(120, 0.034 * v.scale)), { body: '#f4f6f8', tail: '#1f6fd0', eng: '#1f6fd0', glow: true });
      var tg = XC.togo(ac, 'GUKDO'), eta = sim.utc ? sim.utc() + (tg + 45) / Math.max(200, ac.gs) * 3600 : 0, eh = Math.floor(eta / 3600) % 24, em = Math.floor(eta / 60) % 60,
        L = [ac.cs + ' · B787-9', 'ALT FL' + U.pad(Math.round(ac.alt / 100), 3) + (Math.abs(ac.alt - ac.tAlt) > 150 ? (ac.tAlt > ac.alt ? ' ↑' : ' ↓') + 'FL' + U.pad(Math.round(ac.tAlt / 100), 3) : ''), 'GS ' + Math.round(ac.gs) + ' KT', (sim.seg === 'kr' || tg < 400 ? 'GUKDO ' + Math.round(tg) + ' NM · ' : '') + 'ETA ' + U.pad(eh, 2) + U.pad(em, 2) + 'Z'];
      ctx.font = 'bold 11px monospace'; var bw = Math.max.apply(null, L.map(function (t) { return ctx.measureText(t).width; })) + 14, bh = L.length * 14 + 8, bx = laL ? sa[0] - bw - 22 : sa[0] + 22, by = sa[1] - bh - 10;
      if (by < 4) by = sa[1] + 18; ctx.fillStyle = 'rgba(7,16,25,.82)'; ctx.strokeStyle = 'rgba(255,212,121,.55)'; ctx.lineWidth = 1; ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 6); else ctx.rect(bx, by, bw, bh); ctx.fill(); ctx.stroke();
      L.forEach(function (t, i) { ctx.fillStyle = i ? '#e8eef4' : '#ffd479'; ctx.font = (i ? '' : 'bold ') + '11px monospace'; ctx.fillText(t, bx + 7, by + 16 + i * 14); }); ctx.textAlign = 'left';
    }
    /* 거리 눈금 */
    var nmBar = v.scale > 2 ? 20 : v.scale > 0.8 ? 50 : 100, px = nmBar * v.scale; ctx.strokeStyle = '#5d7f95'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(14, H - 40); ctx.lineTo(14 + px, H - 40); ctx.stroke(); ctx.fillStyle = '#7f9fb4'; ctx.font = '10px monospace'; ctx.fillText(nmBar + ' NM', 14, H - 46);
    ctx.fillStyle = 'rgba(120,150,160,.55)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right'; var cr1 = 'Map: Natural Earth · ' + ATC.T('항로 · 지점: AIP(일본 ENR 3.3 · 한국 ENR 3.3)'), cr2 = ATC.T('비행정보구역 경계는 개략');
    if (ctx.measureText(cr1 + ' · ' + cr2).width < W - 200) ctx.fillText(cr1 + ' · ' + cr2, W - 8, H - 8); else { ctx.fillText(cr1, W - 8, H - 20); ctx.fillText(cr2, W - 8, H - 8); } ctx.textAlign = 'left';
  };
  /* 경로를 따라 d NM 앞의 위치 */
  function along(ac, d) { var r = ac.nav && ac.nav.route ? ac.nav.route.slice(ac.nav.i || 0) : [], p = { x: ac.x, y: ac.y }, i; for (i = 0; i < r.length; i++) { var q = F(r[i]); if (!q) continue; var l = U.dist(p, q); if (l >= d) { var k = d / l; return { x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k }; } d -= l; p = q; } return null; }
  XC.along = along;
})(typeof globalThis !== 'undefined' ? globalThis : this);
