/* AIRLINE SAGA — ATC 접근관제(APP/DEP): 세이라 접근관제구(TMA) 레이더 유도 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;

  function AppSim(o) {
    o = o || {}; o.mode = 'APP'; o.sweep = 4; o.minH = 3;
    ATC.RadarSim.call(this, o);
    var L = this.level.id, rng = this.rng, self = this;
    this.cfg = ATC.scnCfg(o, [null,
      { arr: 8, dep: 0, gap: 165, both: false },
      { arr: 13, dep: 7, gap: 115, both: false },
      { arr: 20, dep: 11, gap: 82, both: true }][L]);
    this.rwys = this.cfg.both ? this.flow.arrs.slice() : [this.flow.appArr || this.flow.arr];
    this.lastLand = {}; this.wx = []; this.sched = []; this.arrFlow = this.flow;      /* arrFlow = 새로 들어오는 도착기가 쓰는 운용 방향(활주로 전환을 예고한 뒤로는 새 방향) */
    var by = this.flow.arrBy, rw = this.rwys, t = 4, i, gates = Object.keys(D.star[this.flow.id]).filter(function (x) { return !by || rw.indexOf(by[x]) >= 0; }), lastGate = {}, g;   /* 방면마다 활주로가 정해진 공항은 쓰는 활주로로 오는 방면만 */
    this.gates = gates;
    for (i = 0; i < this.cfg.arr; i++) {
      var tries = 0; do { g = rng.pick(gates); } while (lastGate[g] !== undefined && t - lastGate[g] < 150 && tries++ < 8);
      lastGate[g] = t; this.sched.push({ t: t, kind: 'arr', gate: g, warm: i < 2, wi: i });
      t += this.cfg.gap * (0.75 + rng() * 0.5);
    }
    t = 40;
    for (i = 0; i < this.cfg.dep; i++) { this.sched.push({ t: t, kind: 'dep', gate: rng.pick(Object.keys(D.gateDest)) }); t += this.cfg.gap * 1.55 * (0.75 + rng() * 0.5); }
    this.sched.sort(function (a, b) { return a.t - b.t; });
    this.endT = this.sched[this.sched.length - 1].t;
    /* 비정상 상황 예약 */
    var pool = L === 2 ? ['medical', 'missed'] : L === 3 ? ['mayday', 'wx', 'missed', 'minfuel', 'nordo'] : [];
    var n = this.level.events, used = {};
    while (n-- > 0 && pool.length) { var k = pool.splice(rng.int(0, pool.length - 1), 1)[0]; this.events.push({ k: k, t: this.endT * (0.2 + 0.5 * rng()), done: false }); }
    this.events.sort(function (a, b) { return a.t - b.t; });
    this.scnEvents();
    /* 화면에 그릴 지점: 이번 근무에 쓰는 도착 · 출발 경로의 것만 */
    if (D.sidRoute) { var use = this.fixUse = {}, fl = this.flow; gates.forEach(function (x) { D.star[fl.id][x].forEach(function (n) { use[n] = 1; }); }); Object.keys(D.gateDest).forEach(function (x) { D.sidRoute(D.depRwyFor(fl, x), x).forEach(function (n) { use[n] = 1; }); }); }
    this.sys(ATC.T('{apt} 접근관제({0}) 근무 시작. 사용 활주로: 도착 {1} / 출발 {2}. 바람 {3}, QNH {4}.', D.freq.APP.fq, this.rwys.join('·'), (D.depRwyFor && this.flow.deps ? this.flow.deps.join('·') : this.flow.dep), fmt.wind(this.wind), this.qnh));
  }
  ATC.extend(AppSim, ATC.RadarSim);

  /* 출발기가 공역을 벗어나기까지 남은 거리(NM). 원형 공역 = 반지름까지, 다각형 공역 = 출구 지점까지(밖이면 음수) */
  function polyDist(p, P) { var m = 1e9, i, a, b, t, dx, dy; for (i = 0; i < P.length; i++) { a = P[i]; b = P[(i + 1) % P.length]; dx = b.x - a.x; dy = b.y - a.y; t = U.clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy), 0, 1); m = Math.min(m, Math.hypot(p.x - a.x - dx * t, p.y - a.y - dy * t)); } return m; }
  function tmaOut(a) { return D.tmaPoly ? (U.inPoly(a, D.tmaPoly) ? -polyDist(a, D.tmaPoly) : polyDist(a, D.tmaPoly)) : U.dist(a, D.center) - D.tmaR; }   /* 공역 밖으로 나간 거리(안이면 음수) */
  function depRem(a) { if (!D.tmaPoly) return D.tmaR - U.dist(a, D.center); var o = tmaOut(a); return o > 0 ? -o : U.dist(a, D.fix[a.gate]) + 3; }
  AppSim.depRem = depRem;
  /* 지금 경로대로 갈 때 그 지점까지 걸리는 시간(초). 경로에 없으면 null */
  function etaFix(a, fix) { if (a.nav.mode !== 'route') return null; var r = a.nav.route, k = r.indexOf(fix, a.nav.i), d, i; if (k < 0) return null; d = U.dist(a, D.fix[r[a.nav.i]]); for (i = a.nav.i; i < k; i++) d += U.dist(D.fix[r[i]], D.fix[r[i + 1]]); return d / Math.max(120, a.gs) * 3600; }
  function routeLen(r) { var n = 0, i; for (i = 1; i < r.length; i++) n += U.dist(D.fix[r[i - 1]], D.fix[r[i]]); return n; }
  /* STAR의 다음 고도 제한(공항 묶음에 D.starAlt가 있을 때): 지금 경로에서 앞으로 처음 만나는 제한 지점이 지금 배정 고도보다 낮으면 그 지점 · 고도 · 남은 거리 */
  AppSim.prototype.starWant = function (a) {
    if (!D.starAlt || a.nav.mode !== 'route') return null;
    var r = a.nav.route, d = 0, p = a, i, f, alt, e = D.ends[a.rwy];
    for (i = a.nav.i; i < r.length; i++) { f = D.fix[r[i]]; d += U.dist(p, f); p = f; alt = D.starAlt[r[i]] || (e && e.IF === r[i] ? e.apAlt : 0); if (alt) return alt < a.tAlt - 400 ? { fix: r[i], alt: alt, d: d } : null; }
    return null;
  };
  AppSim.prototype.mvaAt = function (a) { for (var i = 0; i < D.mva.length; i++) if (U.dist(a, D.mva[i].c) < D.mva[i].r) return D.mva[i].alt; return D.mvaBase; };

  AppSim.prototype.spawnArr = function (s) {
    var AF = this.arrFlow, cg = this.rwChg, RW = cg ? cg.newR : this.rwys, f = this.mkFlight(function (a) { return !a.ga || true; }), route = D.star[AF.id][s.gate], f0 = D.fix[route[0]], f1 = D.fix[route[1]];
    var hd = U.brg(f0, f1), p = D.off(f0, hd + 180, 7), alt = D.entryAlt[s.gate], og = this.rng.pick(D.gateOrig[s.gate]), from = 1;
    var by = AF.arrBy, rwy = by && RW.indexOf(by[s.gate]) >= 0 ? by[s.gate] : (RW.indexOf(AF.arr) >= 0 ? AF.arr : RW[0]);
    if (s.warm && D.flyBy && route.length > 5) {      /* 긴 경로: 근무를 시작할 때 이미 경로 가운데쯤에 있는 항공기 */
      from = 1 + this.rng.int(0, route.length - 6); f0 = D.fix[route[from]]; f1 = D.fix[route[from + 1]]; hd = U.brg(f0, f1); var fq = 0.2 + 0.6 * this.rng();
      p = { x: f0.x + (f1.x - f0.x) * fq, y: f0.y + (f1.y - f0.y) * fq }; alt = Math.min(alt, 10000 + 1000 * (s.wi || 0)); from++;
    } else if (s.warm) { var fr = 0.35 + 0.3 * this.rng(); p = { x: f0.x + (f1.x - f0.x) * fr, y: f0.y + (f1.y - f0.y) * fr }; alt = 10000; }
    var perf = f.perf, ias = perf.k === 'tp' ? 220 : 250;
    var ac = this.spawnAc({
      cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: perf,
      x: p.x, y: p.y, alt: alt, hdg: hd, ias: ias, normIas: ias, kind: 'arr', gate: s.gate, orig: og[0], origName: og[1], dest: D.airport.icao,
      fpRoute: route, squawk: this.squawk(), rwy: rwy, owner: (this.level.id === 1 || s.warm) ? 'me' : 'in', entT: this.t
    });
    ac.setRoute(s.warm ? route.slice(from) : route);
    if (D.appDelay) ac.planMin = (routeLen(route) + (D.ends[rwy].ifD || 12)) * D.appDelay.perNM + D.appDelay.plus;
    if (D.starName) ac.star = D.starName[AF.id][s.gate];
    if (ac.owner === 'me') this.checkIn(ac); else ac.hoT = this.t;
    return ac;
  };
  AppSim.prototype.spawnDep = function (s) {
    if (this.apClosed && this.t < this.apClosed.t1) { s.t = this.apClosed.t1 + 30 + (this.apClosed.dn = (this.apClosed.dn || 0) + 1) * 100; this.sched.push(s); this.sched.sort(function (x, y) { return x.t - y.t; }); return; }      /* 공항 폐쇄 중에는 출발도 멈춤 */
    var cg = this.rwChg; if (cg && this.t > cg.t1 - 90 && (this.t < cg.t1 + 120 || this.acs.some(function (a) { return a.chgKeep; }))) { s.t = this.t + 30; this.sched.push(s); this.sched.sort(function (x, y) { return x.t - y.t; }); return; }      /* 활주로 전환 앞뒤로는 출발을 잠시 멈춤 */
    var drw = D.depRwyFor ? D.depRwyFor(this.flow, s.gate) : this.flow.dep, dRw = D.ends[drw].rw;
    if (!s.held || s.held < 6) { if (this.acs.some(function (a) { return a.missed && a.alt < 3000 && D.ends[a.rwy] && D.ends[a.rwy].rw === dRw; })) { s.held = (s.held || 0) + 1; s.t = this.t + 30; this.sched.unshift(s); this.sched.sort(function (x, y) { return x.t - y.t; }); return; } }
    var f = this.mkFlight(), end = D.ends[drw], p = D.off(end.end, end.crs, 1.2), dg = this.rng.pick(D.gateDest[s.gate]);
    var east = D.gateEast[s.gate], rfl = (east ? this.rng.pick([330, 350, 370, 390]) : this.rng.pick([320, 340, 360, 380])) * 100;
    if (f.perf.ceil < rfl) rfl = east ? 23000 : 24000;
    var ac = this.spawnAc({
      cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf,
      x: p.x, y: p.y, alt: 1300, hdg: end.crs, ias: 180, tIas: 250, normIas: 250, tAlt: D.sidInit, kind: 'dep', gate: s.gate, dest: dg[0], destName: dg[1], orig: D.airport.icao,
      fpRoute: D.sidRoute ? D.sidRoute(drw, s.gate) : [s.gate], squawk: this.squawk(), rwy: drw, owner: 'me', justDep: true, rfl: rfl, entT: this.t, sidT: this.t
    });
    ac.sid = D.sidName ? D.sidName(s.gate) : s.gate + ' 1' + this.flow.sfx;
    this.say(ac, D.freq.DEP.n + ', ' + ac.csWord + ' ' + ac.num + ', passing ' + fmt.alt(Math.max(500, Math.round(ac.alt / 100) * 100)) + ', climbing ' + fmt.alt(D.sidInit) + ', ' + ac.sid + ' departure.');
    return ac;
  };
  AppSim.prototype.checkIn = function (ac) {
    var lv = Math.abs(ac.alt - ac.tAlt) < 200 ? 'level ' + fmt.alt(ac.alt) : 'descending ' + fmt.alt(ac.tAlt);
    this.say(ac, D.freq.APP.n + ', ' + ATC.csSay(ac) + ', ' + lv + ', information ' + ATC.phon(this.atis) + '.');
    ac.waiting = 'checkin';
  };
  /* 핸드오프 수락(관제 간 조정 — 무선 교신 아님) */
  AppSim.prototype.accept = function (ac) { if (!ac || ac.owner !== 'in') return false; ac.owner = 'me'; this.checkIn(ac); this.emit('applied', ac); return true; };

  AppSim.prototype.command = function (ac, cmds, o) {
    if (!ac || ac.gone) return false;
    if (ac.owner === 'in') { this.sys(ATC.T('{0}: 아직 이 주파수에 있지 않습니다. 먼저 핸드오프를 수락하세요.', ac.cs), 'warn'); return false; }
    if (ac.owner === 'out') { this.sys(ATC.T('{0}: 이미 다른 관제석으로 이양했습니다.', ac.cs), 'warn'); return false; }
    var cl = this.apClosed;
    if (cl && this.t < cl.t1 - 150 && cmds.some(function (c) { return c.k === 'ils'; })) { this.inc('rwyclosed', [ac], ATC.T('{0}: 공항 폐쇄 중에 접근을 허가했습니다(재개 2분 30초 전부터 허가할 수 있습니다).', ac.cs)); return false; }
    if (ac.nordo) { var ph = ATC.phrase(this, ac, cmds); this.enq({ who: 'atc', ac: ac, text: ph.atc }, true); this.sys(ATC.T('{0}: 응답 없음(무선통신 두절 · 7600)', ac.cs), 'warn'); return false; }
    return ATC.Sim.prototype.command.call(this, ac, cmds, o);
  };
  AppSim.prototype.validate = function (ac, cmds) {
    for (var i = 0; i < cmds.length; i++) {
      var c = cmds[i];
      if (c.k === 'spd' && c.v && c.v < ac.perf.vapp + 20 && !(ac.appr && ac.appr.loc)) return { refuse: 'minimum speed ' + (Math.ceil((ac.perf.vapp + 20) / 10) * 10) + ' knots in this configuration' };
      if (c.k === 'spd' && c.v > 250 && ac.alt < 10000 && c.v > 250) return { refuse: 'speed limit 250 knots below 10,000' };
      if (c.k === 'alt' && c.v > D.tmaTop) return { refuse: 'that is above your airspace' };
      if (c.k === 'ils' && this.rwys.indexOf(c.rwy) < 0) return { refuse: 'runway ' + c.rwy + ' is not in use' };
      if (c.k === 'ils' && ac.kind !== 'arr') return { refuse: 'we are a departure' };
      if (c.k === 'alt' && ac.emg === 'mayday' && c.v > ac.alt + 500) return { refuse: 'unable to climb, engine failure' };
    }
    return null;
  };
  AppSim.prototype.apply = function (ac, c) {
    if (this.applyAir(ac, c)) {
      if (c.k === 'alt' && ac.kind === 'dep') ac.sidT = null;
      if (c.k === 'hdg' || c.k === 'dct' || c.k === 'ils') ac.holdWarn = false;
      if (c.k === 'hold' && this.apClosed && this.t < this.apClosed.t1) { ac.eat = this.efc(ac); ac.eatTold = true; if (ac.waiting === 'eat' || ac.waiting === 'hold') ac.waiting = null; }      /* 폐쇄 중의 체공 지시 = 예상 접근 시각 통보 */
      if (c.k === 'ils') { ac.rwy = c.rwy; ac.missed = false; if (D.flyBy && ac.nav.mode === 'hdg') { var eg = D.ends[c.rwy], gg = ATC.ilsGeom(ac, eg); if (Math.abs(gg.xtk) < 1.5 && Math.abs(U.adiff(ac.hdg, eg.crs)) < 15) ac.appr.steer = true; } }   /* 이미 최종 접근로 가까이에서 나란히 가고 있으면 조종사가 알아서 맞춰 들어감 */
      return;
    }
    if (c.k === 'divert') {      /* 회항: 출구 지점으로 올라가 지역관제에 넘김 — 그 뒤로는 출발기처럼 다룸 */
      if (ac.divAsk && !ac.divDone) { ac.divDone = true; if (this.t - ac.divAsk <= 240) this.inc('divert_ok', [ac], ATC.T('{0}의 회항 요청을 즉시 처리했습니다.', ac.cs)); }
      ac.kind = 'dep'; ac.divert = true; ac.gate = c.gate; ac.dest = c.dest; ac.destName = c.destName; ac.sid = ATC.T('회항'); ac.fpRoute = [c.gate]; ac.sidOn = true; ac.setRoute([c.gate]);
      ac.tAlt = c.alt; ac.spdAsg = 0; ac.normIas = 250; ac.tIas = 250; ac.appr = null; ac.missed = false; ac.hoAsk = false; ac.sidT = null; ac.justDep = false; ac.waiting = null; ac.emg = null; ac.eat = 0;
      return;
    }
    if (c.k === 'ho') {
      if (c.to === 'TWR') {
        if (!(ac.appr && ac.appr.loc)) this.inc('exitbad', [ac], ATC.T('{0}: 로컬라이저 확립 전에 관제탑으로 이양했습니다.', ac.cs));
        ac.owner = 'out'; ac.hoOk = true;
      } else {
        var ok = ac.tAlt >= D.tmaTop - 100 && ac.nav.mode === 'route' && ac.nav.route[ac.nav.route.length - 1] === ac.gate;
        if (!ok) this.inc('exitbad', [ac], ATC.T('{0}: 지역관제 이양 조건({2} 상승 지시 + 출구 지점 {1} 경로)이 충족되지 않았습니다.', ac.cs, ac.gate, fmt.alt(D.tmaTop)));
        ac.owner = 'out'; ac.hoOk = true;
      }
    }
  };
  /* 체공 지시에 붙는 「다음 허가 예정 시각」: 공항 폐쇄 중이면 재개 2분 전부터 3분 간격으로 한 대씩(먼저 받은 순서) */
  AppSim.prototype.efc = function (ac) {
    var c = this.apClosed; if (!c || this.t >= c.t1) return this.utc() + 600;
    if (ac.eat) return ac.eat;
    var n = this.acs.filter(function (a) { return a.eat && a !== ac; }).length;
    return Math.ceil((this.t0 + c.t1 - 120 + 180 * n) / 60) * 60;
  };
  /* 회항지: 지금 위치에서 가장 가까운 출구 지점과 그 방면의 공항 */
  AppSim.prototype.divertTo = function (ac) { var best = null, bd = 1e9; Object.keys(D.gateDest).forEach(function (g) { var d = U.dist(ac, D.fix[g]); if (d < bd) { bd = d; best = g; } }); var dg = D.gateDest[best][0]; return { gate: best, dest: dg[0], destName: dg[1], alt: D.tmaTop }; };
  AppSim.prototype.onRouteEnd = function (ac, fn) {
    if (ac.kind !== 'arr') return;
    if (ac.appr) { if (D.flyBy && !ac.appr.loc && D.fix[fn].k === 'if' && D.ends[ac.appr.rwy].IF === fn) { ac.tHdg = D.ends[ac.appr.rwy].crs; ac.appr.steer = true; } return; }   /* 접근 허가를 받은 채 IF에 닿으면 최종 접근 방향으로 돌며 로컬라이저를 잡음 */
    if (ac.nordo) { ac.nordoPh = 1; ac.tAlt = 3000; ac.tIas = 200; return; }
    if (D.fix[fn].k === 'if') { ac.nav = { mode: 'hdg' }; ac.tHdg = D.ends[ac.rwy].crs; this.say(ac, ATC.csSay(ac) + ', passing ' + fn + ', request approach clearance.', { kind: 'warn' }); ac.waiting = 'appr'; return; }
    ac.nav = { mode: 'hold', fix: fn, ph: 1, tm: 0, inb: ac.hdg }; ac.tHdg = U.n360(ac.hdg + 180); ac.turnDir = 1; ac.holdT = this.t;
    this.say(ac, ATC.csSay(ac) + ', no further clearance, entering hold at ' + fn + '.', { kind: 'warn' }); ac.waiting = 'hold';
    if (!(this.apClosed && this.t < this.apClosed.t1)) this.inc('holdlong', [ac], ATC.T('{0}: STAR 종점({1})까지 후속 지시가 없어 체공에 진입했습니다.', ac.cs, fn));
  };
  AppSim.prototype.onLoc = function (ac) {
    if (ac.appr.capAng > 45) this.inc('unstable', [ac], ATC.T('{0}: 로컬라이저 진입각 {1}°(30° 이내 권장, 45° 초과는 과대).', ac.cs, Math.round(ac.appr.capAng)));
    if (ac.owner === 'me') { this.say(ac, ATC.csSay(ac) + ', established localizer runway ' + ac.appr.rwy + '.'); ac.waiting = 'tower'; }
  };
  AppSim.prototype.goAround = function (ac, why) {
    var e = D.ends[ac.appr ? ac.appr.rwy : ac.rwy];
    ac.appr = null; ac.nav = { mode: 'hdg' }; ac.tHdg = e.crs; ac.tAlt = 3000; ac.tIas = 210; ac.spdAsg = 0; ac.missed = true; ac.owner = 'me'; ac.exp = false; ac.gaN = (ac.gaN || 0) + 1;
    /* 통신 두절기는 말이 없음: 스스로 한 바퀴 돌아 다시 접근(3단계) */
    if (ac.nordo) { ac.nordoPh = 3; ac.nordoT = this.t; ac.missed = false; ac.waiting = null; this.sys(ATC.T('{0}(통신 두절) 복행 — 장주를 한 바퀴 돌아 스스로 재접근합니다. 예상 경로를 비워 두세요.', ac.cs), 'alert'); return; }
    this.say(ac, D.freq.APP.n + ', ' + ATC.csSay(ac) + ', going around' + (why ? ', ' + why : '') + ', runway heading, climbing 3,000.', { kind: 'warn', front: true }); ac.waiting = 'missed';
  };
  AppSim.prototype.onApprFail = function (ac, why) {
    if (ac.nordo) { if (why === 'high') this.goAround(ac); else { ac.appr = null; ac.nordoPh = 3; ac.nordoT = this.t - 60; } return; }      /* 통신 두절기가 스스로 한 접근의 실패는 관제사 감점이 아님 — 한 바퀴 돌아 다시 */
    if (why === 'high') { this.inc('unstable', [ac], ATC.T('{0}: 활공각보다 지나치게 높은 고도로 최종 접근에 진입해 복행했습니다.', ac.cs)); this.goAround(ac, 'too high'); }
    else {
      this.inc('unstable', [ac], ac.cs + (why === 'angle' ? ATC.T(': 진입각이 60°를 초과해 로컬라이저를 지나쳤습니다.') : ATC.T(': 로컬라이저를 포착하지 못하고 지나쳤습니다(진입 기수 · 위치 확인).')));
      ac.appr = null; this.say(ac, ATC.csSay(ac) + ', unable to establish on the localizer, request vectors.', { kind: 'warn' }); ac.waiting = 'vector';
    }
  };
  AppSim.prototype.onTouchdown = function (ac) {
    var r = ac.appr.rwy, last = this.lastLand[r];
    if (this.apClosed && this.t < this.apClosed.t1 && !ac.closeOk) { this.inc('ga_forced', [ac], ATC.T('{0}: 공항이 아직 폐쇄 중이어서 관제탑이 복행을 지시했습니다(접근 허가가 너무 빨랐습니다).', ac.cs)); this.goAround(ac, 'airport closed'); return; }
    var cg = this.rwChg;
    if (cg && cg.oldR.indexOf(r) < 0 && (this.t < cg.t1 || this.acs.some(function (a) { return a.chgKeep && a !== ac; }))) { this.inc('ga_forced', [ac], ATC.T('{0}: 반대 방향 활주로를 아직 사용 중이어서 관제탑이 복행을 지시했습니다(전환 시각과 마지막 착륙기를 확인하세요).', ac.cs)); this.goAround(ac, 'runway occupied'); return; }
    if (last !== undefined && this.t - last < 52) { this.inc('ga_forced', [ac], ATC.T('{0}: 선행 착륙기가 아직 활주로에 있어 관제탑이 복행을 지시했습니다(착륙 간격 {1}초).', ac.cs, Math.round(this.t - last))); this.goAround(ac, 'runway occupied'); return; }
    if (ac.owner === 'me') this.inc('noho', [ac], ATC.T('{0}: 관제탑으로 이양하지 않은 채 착륙했습니다.', ac.cs));
    this.lastLand[r] = this.t;
    var dur = this.t - ac.entT;
    if (ac.emg) {
      if (this.t <= ac.emgDue) this.inc('emg_ok', [ac], ATC.T('{0}({1})을(를) 우선 착륙시켰습니다.', ac.cs, ac.emgName)); else this.inc('emg_late', [ac], ATC.T('{0}({1})의 착륙이 {2}분 지연됐습니다.', ac.cs, ac.emgName, Math.round((this.t - ac.emgDue) / 60)));
    } else if (dur > (ac.planMin || 23) * 60 + (ac.chgIn ? 540 : 0) + (this.apClosed && ac.entT < this.apClosed.t1 ? this.apClosed.t1 - Math.max(ac.entT, this.apClosed.t0) + 360 : 0)) this.inc('delay', [ac], ATC.T('{0}: 관할 공역 내 비행 시간 {1}분.', ac.cs, Math.round(dur / 60)));
    this.sys(ATC.T('{0} 착륙 ({1})', ac.cs, r), 'good');
    this.remove(ac, true);
  };

  /* 활주로 전환: 착륙까지 남은 시간(초) 어림 · 새 방향에서 쓸 활주로 */
  AppSim.prototype.landEta = function (a) {
    var e = D.ends[a.rwy], g = ATC.ilsGeom(a, e), d, i, p = a, r;
    if (a.appr && a.appr.loc) return a.appr.d / 2.6 * 60;
    if (a.nav.mode === 'route') { r = a.nav.route; d = 0; for (i = a.nav.i; i < r.length; i++) { d += U.dist(p, D.fix[r[i]]); p = D.fix[r[i]]; } d += Math.max(ATC.ilsGeom(p, e).d, 5) + (D.fix[r[r.length - 1]].k === 'if' ? 0 : 3); }
    else d = Math.max(g.d, 5) + Math.abs(g.xtk);
    return d / 3.3 * 60 + 40;
  };
  AppSim.prototype.newRwyFor = function (a) { var cg = this.rwChg, by = cg.to.arrBy; return by && cg.newR.indexOf(by[a.gate]) >= 0 ? by[a.gate] : (cg.newR.indexOf(cg.to.arr) >= 0 ? cg.to.arr : cg.newR[0]); };
  /* 비정상 상황 */
  AppSim.prototype.fire = function (ev) {
    var self = this, mine = this.acs.filter(function (a) { return a.kind === 'arr' && a.owner === 'me' && !a.emg && !a.nordo; });
    var far = mine.filter(function (a) { return !(a.appr && a.appr.loc) && U.dist(a, D.center) > 14; });
    var ac;
    if (ev.k === 'medical' || ev.k === 'mayday' || ev.k === 'minfuel') {
      if (!far.length) return false; ac = this.rng.pick(far);
      var dtg = U.dist(ac, D.fix[D.ends[ac.rwy].IF]) + (D.ends[ac.rwy].ifD || 12);
      ac.emg = ev.k; ac.emgT = this.t;
      if (ev.k === 'medical') { ac.emgName = ATC.T('응급환자'); ac.emgDue = this.t + dtg / 3.4 * 60 + 300; this.say(ac, 'PAN-PAN, PAN-PAN, PAN-PAN, ' + ATC.csSay(ac) + ', medical emergency on board, request priority landing and ambulance on arrival.', { kind: 'emg', front: true }); }
      if (ev.k === 'mayday') { ac.emgName = ATC.T('엔진 고장'); ac.emgDue = this.t + dtg / 3.2 * 60 + 240; ac.squawk = '7700'; ac.tIas = Math.min(ac.tIas, 220); ac.normIas = 220; this.say(ac, 'MAYDAY, MAYDAY, MAYDAY, ' + ATC.csSay(ac) + ', engine failure, request vectors for immediate landing, ' + this.rng.pick(D.pobList) + ' persons on board.', { kind: 'emg', front: true }); }
      if (ev.k === 'minfuel') { ac.emgName = ATC.T('최소 연료'); ac.emgDue = this.t + dtg / 3.4 * 60 + 420; this.say(ac, ATC.csSay(ac) + ', minimum fuel.', { kind: 'emg', front: true }); }
      ac.waiting = 'emg';
      this.sys(ATC.T('{0} — {1}. 다른 항공기보다 우선 착륙시키세요.', ac.cs, ac.emgName), 'alert');
      return true;
    }
    if (ev.k === 'apclose') {
      /* 공항 폐쇄(dur초): 착륙 불가. fuel = 최소 연료를 선언할 항공기 수, divert = 회항을 요청할 항공기 수 */
      var dur = ev.dur || 480, sf = this, cl = this.apClosed = { t0: this.t, t1: this.t + dur, asks: [] }, k;
      for (k = 0; k < (ev.fuel || 0); k++) cl.asks.push({ k: 'fuel', t: this.t + 200 + k * 110 });
      for (k = 0; k < (ev.divert || 0); k++) cl.asks.push({ k: 'div', t: this.t + 260 + k * 120 });
      this.acs.slice().forEach(function (a) { if (a.kind !== 'arr' || !a.appr) return; if (a.appr.loc && a.appr.d < 3) { a.closeOk = true; return; } if (a.owner !== 'me') sf.sys(ATC.T('관제탑 통보: {0}을(를) 복행시켰습니다 — 다시 인수해 체공시키세요.', a.cs), 'warn'); sf.goAround(a, 'airport closed'); });
      this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1);
      this.sys(ATC.T('공항 폐쇄 — {0}. 약 {1}분간 이착륙이 중단됩니다. 도착기를 체공시키고 예상접근시간(EAT)을 통보하세요(체공 지시와 함께 송신됩니다). 같은 지점의 체공 항공기는 고도를 1,000ft씩 분리하세요.', ev.why || ATC.T('활주로상에 고장으로 이동하지 못하는 항공기가 있습니다'), Math.round(dur / 60)), 'alert');
      return true;
    }
    if (ev.k === 'rwchg') {
      /* 운용 방향 전환: 지금 예고 → lead초 뒤 전환. 새로 들어오는 도착기는 곧바로 새 방향 STAR, 관할 안의 도착기는 전환 시각까지 착륙할 수 있으면 지금 활주로, 아니면 새 활주로 */
      var to = D.flows[ev.to], lead = ev.lead || 420, sf2 = this, oldR = this.rwys.slice(), newR = this.cfg.both ? to.arrs.slice() : [to.appArr || to.arr];
      var cg = this.rwChg = { t0: this.t, t1: this.t + lead, from: this.flow, to: to, oldR: oldR, newR: newR, w0: { dir: this.wind.dir, spd: this.wind.spd }, w1: ev.wind || { dir: to.wind.dir, spd: to.wind.spd + 3 } }, keep = [], moved = [];
      this.arrFlow = to; this.rwys = oldR.concat(newR.filter(function (x) { return oldR.indexOf(x) < 0; })); this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1);
      this.acs.forEach(function (a) {
        if (a.kind !== 'arr' || a.divert) return; a.chgIn = true;
        if (a.appr && a.appr.loc) { keep.push(a.cs); return; }
        if (sf2.t + sf2.landEta(a) > cg.t1 - 20 && !a.emg) { a.rwy = sf2.newRwyFor(a); a.rwNew = true; a.appr = null; moved.push(a.cs); } else keep.push(a.cs);
      });
      this.sys(ATC.T('활주로 전환 예고 — 풍향이 {0}° 쪽으로 돌고 있습니다. {1} UTC부터 도착 {2} / 출발 {3}. 그때까지 {4}에 착륙하지 못하는 항공기는 {2}(으)로 유도하세요. 새로 진입하는 도착기는 {2} 방향 STAR로 들어옵니다.', fmt.hdg(cg.w1.dir), U.hhmm(this.t0 + cg.t1), newR.join(' · '), (D.depRwyFor && to.deps ? to.deps.join(' · ') : to.dep), oldR.join(' · ')) + (moved.length ? ' ' + ATC.T('새 활주로 배정: {0}.', moved.join(', ')) : '') + (keep.length ? ' ' + ATC.T('지금 활주로로 계속: {0}.', keep.join(', ')) : ''), 'alert');
      this.emit('notice', ATC.T('활주로 전환 예고 — {0} UTC부터 {1}', U.hhmm(this.t0 + cg.t1), newR.join(' · ')));
      return true;
    }
    if (ev.k === 'missed') {
      var fin = this.acs.filter(function (a) { return a.kind === 'arr' && a.appr && a.appr.loc && a.appr.d < 4 && a.appr.d > 1.5 && !a.emg; });
      if (!fin.length) return false; ac = fin[0]; this.goAround(ac, this.lvp ? 'runway not in sight' : this.rng.pick(['wind shear', 'unstable approach'])); this.sys(ATC.T('{0} 복행 — 착륙 순서에 다시 넣어 유도하세요.', ac.cs), 'alert'); return true;
    }
    if (ev.k === 'wx') {
      var base = D.fix[this.rng.pick(this.flow.vecFix)];
      var c = D.off(base, this.rng.int(0, 359), 5 + this.rng() * 4);
      this.wx.push({ x: c.x, y: c.y, r: 4.5, vx: (this.rng() - 0.5) * 6, vy: (this.rng() - 0.5) * 6, hit: {} });
      this.sys(ATC.T('기상 레이더: 발달한 적란운(CB) 관측. 붉은 구역으로는 유도하지 마세요.'), 'alert'); this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1); return true;
    }
    if (ev.k === 'nordo') {
      if (!far.length) return false; ac = this.rng.pick(far); ac.nordo = true; ac.squawk = '7600'; ac.emg = 'nordo'; ac.emgName = ATC.T('무선통신 두절'); ac.emgDue = this.t + 3600; ac.waiting = null;
      ac.tAlt = Math.min(ac.tAlt, 4000);
      this.sys(ATC.T('{0} 스쿼크 7600(무선통신 두절). 이 게임에서는 정해진 경로 → {1} ILS로 스스로 접근합니다. 다른 항공기를 그 경로에서 분리하세요.', ac.cs, ac.rwy), 'alert'); return true;
    }
    return false;
  };

  AppSim.prototype.update = function (dt) {
    var i, a, self = this;
    while (this.sched.length && this.sched[0].t <= this.t) { var s = this.sched.shift(); if (s.kind === 'arr') this.spawnArr(s); else this.spawnDep(s); }
    for (i = 0; i < this.events.length; i++) { var ev = this.events[i]; if (!ev.done && this.t >= ev.t) { if (this.fire(ev)) ev.done = true; else { ev.t = this.t + 30; if (this.sched.length === 0 && ev.t > this.endT + 600) ev.done = true; } } }
    for (i = 0; i < this.wx.length; i++) { var w = this.wx[i]; w.x += w.vx / 3600 * dt; w.y += w.vy / 3600 * dt; }
    this.moveAll(dt);
    var cg = this.rwChg;
    if (cg) {
      if (!cg.done && this.t < cg.t1) { var kk = (this.t - cg.t0) / (cg.t1 - cg.t0); this.wind = { dir: Math.round(U.n360(cg.w0.dir + U.adiff(cg.w0.dir, cg.w1.dir) * kk) / 10) * 10 || 360, spd: Math.round(cg.w0.spd + (cg.w1.spd - cg.w0.spd) * kk) }; }
      if (!cg.done && this.t >= cg.t1) {
        cg.done = true; this.flow = cg.to; this.rwys = cg.newR.slice(); this.wind = cg.w1; this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1); var kept = [];
        this.acs.slice().forEach(function (a) {
          if (a.kind !== 'arr' || !a.appr || cg.oldR.indexOf(a.appr.rwy) < 0 || cg.newR.indexOf(a.appr.rwy) >= 0) return;
          if (a.appr.loc && a.appr.d < 8) { a.chgKeep = true; kept.push(a.cs); return; }
          self.inc('rwchg_late', [a], ATC.T('{0}: 전환 시각까지 {1}에 착륙하지 못해 접근을 중단시켰습니다. {2}(으)로 다시 유도하세요.', a.cs, a.appr.rwy, cg.newR.join(' · ')));
          if (!a.appr.loc) { a.appr = null; return; }      /* 아직 로컬라이저에 오르지 않은 항공기는 접근 허가만 취소 */
          if (a.owner !== 'me') self.sys(ATC.T('관제탑 통보: {0}을(를) 복행시켰습니다 — 다시 인수해 새 활주로로 유도하세요.', a.cs), 'warn'); self.goAround(a);
        });
        this.emit('notice', ATC.T('활주로 전환 — 도착 {0}', cg.newR.join(' · ')));
        this.sys(ATC.T('활주로 전환 — 지금부터 도착 {0} / 출발 {1}. ATIS {2}.', cg.newR.join(' · '), (D.depRwyFor && cg.to.deps ? cg.to.deps.join(' · ') : cg.to.dep), this.atis) + (kept.length ? ' ' + ATC.T('{0}은(는) {1}에 그대로 착륙합니다 — 착륙할 때까지 {2} 착륙기를 최종 접근 구간에 넣지 마세요.', kept.join(', '), cg.oldR.join(' · '), cg.newR.join(' · ')) : ''), 'alert');
      }
      if (cg.done) this.acs.forEach(function (a) { if (a.kind === 'arr' && !a.divert && !a.appr && cg.newR.indexOf(a.rwy) < 0) { a.rwy = self.newRwyFor(a); a.rwNew = true; a.chgKeep = false; } });
    }
    var cl = this.apClosed, shut = cl && this.t < cl.t1;
    if (cl) {
      if (!cl.soon && this.t >= cl.t1 - 150) { cl.soon = true; this.sys(ATC.T('공항 재개 2분 30초 전 — 지금부터 접근을 허가할 수 있습니다. 예상접근시간 순서대로, 최소 연료 통보기는 우선 접근시키세요.'), 'info'); }
      if (!cl.open && this.t >= cl.t1) { cl.open = true; this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1); this.acs.forEach(function (x) { if (x.nav.mode === 'hold') x.holdT = self.t; }); this.sys(ATC.T('공항 운영 재개 — 이착륙을 다시 시작합니다.'), 'good'); }
      while (shut && cl.asks.length && this.t >= cl.asks[0].t) {
        var ask = cl.asks[0], cand = this.acs.filter(function (x) { return x.kind === 'arr' && x.owner === 'me' && !x.emg && !x.nordo && !x.divAsk && !x.appr; }).sort(function (x, y) { return y.entT - x.entT; });
        if (!cand.length) { ask.t = this.t + 30; break; }
        cl.asks.shift(); var q = cand[ask.k === 'fuel' ? 0 : cand.length - 1];      /* 최소 연료 = 가장 늦게 들어온 항공기(순서를 바꿔야 함) / 회항 = 가장 오래 기다린 항공기 */
        if (ask.k === 'fuel') { q.emg = 'minfuel'; q.emgT = this.t; q.emgName = ATC.T('최소 연료'); q.emgDue = cl.t1 + 600; q.waiting = 'emg'; this.say(q, ATC.csSay(q) + ', minimum fuel.', { kind: 'emg', front: true }); this.sys(ATC.T('{0} 최소 연료(Minimum fuel) 통보 — 재개 후 가장 먼저 접근시키세요. 지연되면 연료 비상(MAYDAY fuel)을 선언합니다.', q.cs), 'alert'); }
        else { var dv = this.divertTo(q); q.divAsk = this.t; q.waiting = 'divert'; this.say(q, ATC.csSay(q) + ', unable to hold any longer, request diversion to ' + dv.destName + '.', { kind: 'emg', front: true }); this.sys(ATC.T('{0} 회항 요청({1}) — 「회항 허가」를 발부하고, 출구 지점 {2}에 접근하면 지역관제로 이양하세요.', q.cs, dv.destName, dv.gate), 'alert'); }
      }
    }
    var acs = this.acs.slice();
    for (i = 0; i < acs.length; i++) {
      a = acs[i]; if (a.gone) continue;
      var dc = U.dist(a, D.center);
      if (a.justDep && a.alt > 3000) a.justDep = false;
      if (a.missed && a.alt >= 2900) a.missedLvl = true;
      if (a.kind === 'dep') {
        /* SID: 활주로 방위 3NM 뒤 출구 지점으로 */
        if (a.nav.mode === 'hdg' && !a.vec && !a.sidOn && U.dist(a, D.ends[a.rwy].end) > (D.sidAt || 3)) { a.sidOn = true; a.setRoute(a.fpRoute); }
        if (a.sidT && this.t - a.sidT > 150 && a.owner === 'me' && Math.abs(a.alt - D.sidInit) < 100) { a.sidT = this.t; this.say(a, ATC.csSay(a) + ', level ' + fmt.alt(D.sidInit) + ', request higher.'); a.waiting = 'climb'; if (!a.lowHit) { a.lowHit = true; this.inc('delay', [a], ATC.T('{0}: 초기 고도 {1}에서 장시간 수평 비행(상승 지시 지연).', a.cs, fmt.alt(D.sidInit))); } }
        var rem = depRem(a);
        if (a.owner === 'out' && (rem < 2 || a.alt > D.tmaTop - 500 && rem < 15)) { this.remove(a, true); continue; }
        if (a.owner === 'me' && rem < 9 && !a.hoAsk) { a.hoAsk = true; this.say(a, ATC.csSay(a) + ', approaching ' + a.gate + ', request frequency change.', { kind: 'warn' }); a.waiting = 'ho'; }
        if (a.owner === 'me' && rem < -1) { this.inc('airspace', [a], ATC.T('{0}: 지역관제로 이양하지 않은 채 접근관제구역을 이탈했습니다.', a.cs)); this.remove(a, false); continue; }
      } else {
        if (a.owner === 'in' && this.t - a.hoT > 75 && !a.hoLate) { a.hoLate = true; this.inc('noho', [a], ATC.T('{0}: 핸드오프 수락이 지연됐습니다.', a.cs)); this.accept(a); }
        var to = tmaOut(a);
        if (a.entered === undefined && to < -1) a.entered = true;
        if (a.entered && to > 2 && !(a.appr && a.appr.loc)) { this.inc('airspace', [a], ATC.T('{0}: 도착기가 접근관제구역을 이탈했습니다.', a.cs)); this.remove(a, false); continue; }
        if (a.appr && a.appr.loc && a.owner === 'me') {
          if (a.appr.d < 5.5 && !a.twrAsk) { a.twrAsk = true; this.say(a, ATC.csSay(a) + ', ' + Math.round(a.appr.d) + ' miles final runway ' + a.appr.rwy + '.', { kind: 'warn' }); a.waiting = 'tower'; }
        }
        if (shut && a.nav.mode === 'hold' && !a.eatTold && !a.eatAsk && this.t - a.holdT > 90) { a.eatAsk = this.t; this.say(a, ATC.csSay(a) + ', holding at ' + a.nav.fix + ', request expected approach time.', { kind: 'warn' }); a.waiting = 'eat'; }
        if (a.eatAsk && !a.eatTold && !a.eatLate && this.t - a.eatAsk > 180) { a.eatLate = true; this.inc('reqlate', [a], ATC.T('{0}: 예상접근시간 요청에 3분 이상 응답하지 않았습니다(체공 지시를 다시 내면 함께 송신됩니다).', a.cs)); }
        if (a.divAsk && !a.divDone && this.t - a.divAsk > 300) { a.divDone = true; this.inc('emg_late', [a], ATC.T('{0}: 회항 요청이 5분 이상 처리되지 않아 자체적으로 회항을 시작했습니다.', a.cs)); this.apply(a, Object.assign({ k: 'divert' }, this.divertTo(a))); continue; }
        if (!shut && a.nav.mode === 'hold' && a.holdT && this.t - a.holdT > 420 && !a.holdWarn) { a.holdWarn = true; this.say(a, ATC.csSay(a) + ', holding, request expected approach time.', { kind: 'warn' }); a.waiting = 'hold'; this.inc('holdlong', [a], ATC.T('{0}: 체공 시간이 7분을 초과했습니다.', a.cs)); }
        if (a.emg && a.emg !== 'nordo' && !a.emgLate && this.t > a.emgDue + 1) { a.emgLate = true; if (a.emg === 'minfuel') { a.emg = 'mayday'; a.squawk = '7700'; a.emgName = ATC.T('연료 비상'); this.say(a, 'MAYDAY, MAYDAY, MAYDAY, ' + ATC.csSay(a) + ', fuel emergency, request immediate landing.', { kind: 'emg', front: true }); } }
        if (a.nordo && !(a.appr && a.appr.loc)) {
          /* 통신 두절기: STAR 끝 → 베이스 → 30° 요격으로 스스로 접근 */
          var ne = D.ends[a.rwy], ng = ATC.ilsGeom(a, ne);
          if (a.nordoPh === 3) {      /* 복행 뒤: 활주로 방향 60초 → 옆으로 50초 → 반대 방향으로 11NM 밖까지 → 다시 베이스 */
            var ndt = this.t - a.nordoT, nsd = /L$/.test(a.rwy) ? -1 : 1; a.nav = { mode: 'hdg' }; a.tAlt = 3000; a.tIas = 200;
            if (ndt < 60) a.tHdg = ne.crs; else if (ndt < 110) a.tHdg = U.n360(ne.crs + nsd * 90); else if (ng.d < 11) a.tHdg = U.n360(ne.crs + 180); else a.nordoPh = 1;
          }
          if (!a.nordoPh && a.nav.mode === 'hdg') a.nordoPh = 1;
          if (a.nordoPh === 1) { a.nav = { mode: 'hdg' }; a.tAlt = 3000; a.tIas = 200; if (Math.abs(ng.xtk) < 2.6) { a.nordoPh = 2; a.tHdg = U.n360(ne.crs + (ng.xtk > 0 ? -30 : 30)); a.appr = { rwy: a.rwy, loc: false, gs: false }; } else a.tHdg = U.n360(ne.crs + (ng.xtk > 0 ? -90 : 90)); }
          if (a.nordoPh === 2 && !a.appr) a.nordoPh = 1;
        }
      }
      /* 악기상 */
      for (var k = 0; k < this.wx.length; k++) { var w2 = this.wx[k]; if (a.alt < 26000 && U.dist(a, w2) < w2.r && !w2.hit[a.id] && a.owner === 'me') { w2.hit[a.id] = 1; this.inc('wx', [a], ATC.T('{0}: 적란운 구역을 통과했습니다(심한 난기류).', a.cs)); this.say(a, ATC.csSay(a) + ', severe turbulence, request heading to avoid weather.', { kind: 'warn' }); } }
    }
  };
  AppSim.prototype.isFinished = function () { return this.sched.length === 0 && this.acs.length === 0 && this.t > 30; };

  /* 초급용 코치: 지금 할 일을 우선순위대로 */
  AppSim.prototype.coach = function () {
    var out = [], self = this;
    this.alerts.stca.forEach(function (p) { out.push({ p: 9, ac: p[0].id, t: ATC.T('{0} · {1} 근접 예상 — 한쪽 고도를 1,000ft 이상 분리하거나 기수를 변경하세요.', p[0].cs, p[1].cs) }); });
    this.acs.forEach(function (a) {
      if (a.owner === 'in') { out.push({ p: 8, ac: a.id, t: ATC.T('{0} 핸드오프 수락(깜박이는 표적을 선택하고 「수락」).', a.cs) }); return; }
      if (a.owner !== 'me') return;
      var dc = U.dist(a, D.center);
      if (a.kind === 'dep') {
        if (a.tAlt < D.tmaTop - 100) out.push({ p: 5, ac: a.id, t: ATC.T('{0} 출발기 — 상공에 도착기가 없으면 {1}까지 상승시키세요.', a.cs, fmt.alt(D.tmaTop)) });
        else if (depRem(a) < 23) out.push({ p: 6, ac: a.id, t: ATC.T('{0} — {aptEn} Control로 이양({2} 상승 중 · {1} 경로).', a.cs, a.gate, fmt.alt(D.tmaTop)) });
        return;
      }
      var e = D.ends[a.rwy], g = ATC.ilsGeom(a, e);
      if (a.missed && !a.appr) { out.push({ p: 7, ac: a.id, t: ATC.T('{0} 복행 — 4,000ft로 상승시키고 다운윈드(기수 {1})로 선회시켜 최종 접근로에 다시 진입시키세요.', a.cs, fmt.hdg(e.crs + 180)) }); return; }
      if (a.appr && a.appr.loc) { if (g.d < 10) out.push({ p: 7, ac: a.id, t: ATC.T('{0} 로컬라이저 확립 — {aptEn} Tower로 이양.', a.cs), c: [{ k: 'ho', to: 'TWR' }] }); return; }
      if (a.appr) return;
      if (a.nav.mode === 'hold') { out.push({ p: 7, ac: a.id, t: ATC.T('{0} 체공 중 — 기수를 지시해 최종 접근로로 유도하세요.', a.cs) }); return; }
      if (a.rwNew && self.rwChg && (Math.abs(g.xtk) > 4.5 || g.d < 6)) { out.push({ p: 7, ac: a.id, t: ATC.T('{0} 새 활주로 {1} 배정 — 기존 STAR에서 벗어나 다운윈드(기수 {2})로 공항을 지나 {1} 최종 접근로 쪽으로 유도하세요. 고도는 최저 레이더 유도 고도(MVA) 이상.', a.cs, a.rwy, fmt.hdg(e.crs + 180)) }); }
      var apA = e.apAlt || 3000, ifD = e.ifD || 12, wantAlt = dc > 28 ? 8000 : dc > 18 ? Math.max(5000, apA) : apA;
      var lastF = a.nav.mode === 'route' ? a.nav.route[a.nav.route.length - 1] : null, cut = D.starCut && a.nav.mode === 'route' ? D.starCut[self.flow.id][a.gate] : null, ci = cut ? a.nav.route.indexOf(cut, a.nav.i) : -1, cl = null;
      /* 여러 흐름이 만나는 지점에 다른 도착기와 거의 같이 닿는지 · 앞뒤가 비어 직행으로 줄여도 되는지 */
      if (ci >= 0) {
        var mine = etaFix(a, cut), dir = U.dist(a, D.fix[cut]) / a.gs * 3600, tight = null, free = ci > a.nav.i && mine - dir > 100;
        self.acs.forEach(function (b) { if (b === a || b.kind !== 'arr' || b.owner === 'out' || b.rwy !== a.rwy) return; var eb = etaFix(b, cut); if (eb === null) { if (!(b.appr && b.appr.loc) && U.dist(b, D.fix[cut]) < 12) free = false; return; } if (Math.abs(eb - mine) < 75 && Math.abs(a.alt - b.alt) < 1500 && b.id > a.id) tight = b; if (Math.abs(eb - dir) < 150) free = false; });
        if (tight) cl = { p: 6, ac: a.id, t: ATC.T('{0} · {1} — {2}에 거의 동시에 도달합니다. 한쪽을 감속시키거나 고도를 1,000ft 분리해 간격을 확보하세요.', a.cs, tight.cs, cut) };
        else if (free && mine > 240) cl = { p: 2, ac: a.id, t: ATC.T('{0} 전후 간격 여유 — {1} 직행으로 경로를 단축할 수 있습니다(다른 도착 흐름을 가로지르므로 고도 분리 확인).', a.cs, cut), c: [{ k: 'dct', fix: cut }] };
      }
      var sw = self.starWant(a);
      if (lastF && D.fix[lastF].k === 'if' && lastF === e.IF && D.flyBy && a.nav.i >= a.nav.route.length - 2 && U.dist(a, D.fix[lastF]) < 9 && a.tAlt <= apA + 1000) {
        out.push({ p: 8, ac: a.id, t: ATC.T('{0} 곧 {1} 도달 — 「ILS {2} 접근 허가」. {1}에서 최종 접근로에 진입합니다.', a.cs, lastF, a.rwy), c: [{ k: 'ils', rwy: a.rwy }] });
      } else if (g.d > 6 && g.d < ifD + 8 && Math.abs(g.xtk) < 4.5 && Math.abs(U.adiff(a.hdg, e.crs)) > 20 && a.tAlt <= apA + 1000 && !(D.flyBy && lastF === e.IF)) {
        var ih = U.n360(e.crs + (g.xtk > 0 ? -30 : 30));
        out.push({ p: 8, ac: a.id, t: ATC.T('{0} 최종 접근로 측방 {1}NM — 기수 {2}(30° 진입) + 「ILS {3} 접근 허가」.', a.cs, Math.abs(g.xtk).toFixed(1), fmt.hdg(ih), a.rwy), c: [{ k: 'hdg', v: ih }, { k: 'ils', rwy: a.rwy }] });
      } else if (sw) { if (sw.d < (a.tAlt - sw.alt) / 1000 * 3.2 + 6) out.push({ p: 5, ac: a.id, t: (sw.fix === e.IF ? ATC.T('{0} — 최종 접근 시작 지점 {1}까지 {3}NM. {2}ft로 강하시키세요.', a.cs, sw.fix, fmt.alt(sw.alt), Math.round(sw.d)) : ATC.T('{0} — {1}의 고도 제한 {2}ft까지 {3}NM. {2}ft로 강하시키세요.', a.cs, sw.fix, fmt.alt(sw.alt), Math.round(sw.d))), c: [{ k: 'alt', v: sw.alt }] }); }
      else if (!(D.starAlt && a.nav.mode === 'route') && a.tAlt > wantAlt + 500) out.push({ p: 4, ac: a.id, t: ATC.T('{0} 공항까지 {1}NM — {2}{3}로 강하시키세요.', a.cs, Math.round(dc), fmt.alt(wantAlt), (wantAlt >= 14000 ? '' : 'ft')) });
      else if (a.nav.mode === 'route' && a.nav.i >= a.nav.route.length - 1 && U.dist(a, D.fix[a.nav.route[a.nav.route.length - 1]]) < 6 && D.fix[a.nav.route[a.nav.route.length - 1]].k === 'base') {
        var bh = U.n360(e.crs + (g.xtk > 0 ? -90 : 90));
        out.push({ p: 6, ac: a.id, t: ATC.T('{0} 곧 STAR 종점 — 기수 {1}(베이스 레그)로 최종 접근로 쪽으로 선회시키세요. 속도 210kt 이하 권장.', a.cs, fmt.hdg(bh)) });
      } else if (a.ias > 215 && g.d < ifD + 4 && dc < ifD + 8) out.push({ p: 3, ac: a.id, t: ATC.T('{0} 속도 {1}kt — 최종 접근 전에 210 → 180kt로 감속시키세요.', a.cs, Math.round(a.ias)) });
      if (cl) out.push(cl);
    });
    out.sort(function (x, y) { return y.p - x.p; });
    return out.slice(0, 4);
  };
  ATC.AppSim = AppSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
