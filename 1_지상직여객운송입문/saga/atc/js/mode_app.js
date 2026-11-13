/* AIRLINE SAGA — ATC 접근관제(APP/DEP): 세이라 접근관제구(TMA) 레이더 유도 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;

  function AppSim(o) {
    o = o || {}; o.mode = 'APP'; o.sweep = 4; o.minH = 3;
    ATC.RadarSim.call(this, o);
    var L = this.level.id, rng = this.rng, self = this;
    this.cfg = [null,
      { arr: 8, dep: 0, gap: 165, both: false },
      { arr: 13, dep: 7, gap: 115, both: false },
      { arr: 20, dep: 11, gap: 82, both: true }][L];
    this.rwys = this.cfg.both ? this.flow.arrs.slice() : [this.flow.arr];
    this.lastLand = {}; this.wx = []; this.sched = [];
    var t = 4, i, gates = Object.keys(D.star[this.flow.id]), lastGate = {}, g;
    for (i = 0; i < this.cfg.arr; i++) {
      var tries = 0; do { g = rng.pick(gates); } while (lastGate[g] !== undefined && t - lastGate[g] < 150 && tries++ < 8);
      lastGate[g] = t; this.sched.push({ t: t, kind: 'arr', gate: g, warm: i < 2 });
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
    this.sys(ATC.T('{apt} 접근관제({0}) 근무 시작. 사용 활주로: 도착 {1} / 출발 {2}. 바람 {3}, QNH {4}.', D.freq.APP.fq, this.rwys.join('·'), this.flow.dep, fmt.wind(this.wind), this.qnh));
  }
  ATC.extend(AppSim, ATC.RadarSim);

  AppSim.prototype.mvaAt = function (a) { for (var i = 0; i < D.mva.length; i++) if (U.dist(a, D.mva[i].c) < D.mva[i].r) return D.mva[i].alt; return D.mvaBase; };

  AppSim.prototype.spawnArr = function (s) {
    var f = this.mkFlight(function (a) { return !a.ga || true; }), route = D.star[this.flow.id][s.gate], f0 = D.fix[route[0]], f1 = D.fix[route[1]];
    var hd = U.brg(f0, f1), p = D.off(f0, hd + 180, 7), alt = D.entryAlt[s.gate], og = this.rng.pick(D.gateOrig[s.gate]);
    if (s.warm) { var fr = 0.35 + 0.3 * this.rng(); p = { x: f0.x + (f1.x - f0.x) * fr, y: f0.y + (f1.y - f0.y) * fr }; alt = 10000; }
    var perf = f.perf, ias = perf.k === 'tp' ? 220 : 250;
    var ac = this.spawnAc({
      cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: perf,
      x: p.x, y: p.y, alt: alt, hdg: hd, ias: ias, normIas: ias, kind: 'arr', gate: s.gate, orig: og[0], origName: og[1], dest: D.airport.icao,
      fpRoute: route, squawk: this.squawk(), rwy: this.flow.arr, owner: (this.level.id === 1 || s.warm) ? 'me' : 'in', entT: this.t
    });
    ac.setRoute(s.warm ? route.slice(1) : route);
    if (ac.owner === 'me') this.checkIn(ac); else ac.hoT = this.t;
    return ac;
  };
  AppSim.prototype.spawnDep = function (s) {
    var dRw = D.ends[this.flow.dep].rw;
    if (!s.held || s.held < 6) { if (this.acs.some(function (a) { return a.missed && a.alt < 3000 && D.ends[a.rwy] && D.ends[a.rwy].rw === dRw; })) { s.held = (s.held || 0) + 1; s.t = this.t + 30; this.sched.unshift(s); this.sched.sort(function (x, y) { return x.t - y.t; }); return; } }
    var f = this.mkFlight(), end = D.ends[this.flow.dep], p = D.off(end.end, end.crs, 1.2), dg = this.rng.pick(D.gateDest[s.gate]);
    var east = D.gateEast[s.gate], rfl = (east ? this.rng.pick([330, 350, 370, 390]) : this.rng.pick([320, 340, 360, 380])) * 100;
    if (f.perf.ceil < rfl) rfl = east ? 23000 : 24000;
    var ac = this.spawnAc({
      cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf,
      x: p.x, y: p.y, alt: 1300, hdg: end.crs, ias: 180, tIas: 250, normIas: 250, tAlt: D.sidInit, kind: 'dep', gate: s.gate, dest: dg[0], destName: dg[1], orig: D.airport.icao,
      fpRoute: [s.gate], squawk: this.squawk(), rwy: this.flow.dep, owner: 'me', justDep: true, rfl: rfl, entT: this.t, sidT: this.t
    });
    ac.sid = s.gate + ' 1' + this.flow.sfx;
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
    if (ac.owner === 'in') { this.sys(ATC.T('{0}: 아직 이 주파수에 없습니다. 먼저 핸드오프를 수락하세요.', ac.cs), 'warn'); return false; }
    if (ac.owner === 'out') { this.sys(ATC.T('{0}: 이미 다른 관제석으로 이양했습니다.', ac.cs), 'warn'); return false; }
    if (ac.nordo) { var ph = ATC.phrase(this, ac, cmds); this.enq({ who: 'atc', ac: ac, text: ph.atc }, true); this.sys(ATC.T('{0}: 응답 없음(무선 통신 두절 · 7600)', ac.cs), 'warn'); return false; }
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
      if (c.k === 'ils') { ac.rwy = c.rwy; ac.missed = false; }
      return;
    }
    if (c.k === 'ho') {
      if (c.to === 'TWR') {
        if (!(ac.appr && ac.appr.loc)) this.inc('exitbad', [ac], ATC.T('{0}: 로컬라이저에 확립하기 전에 타워로 넘겼습니다.', ac.cs));
        ac.owner = 'out'; ac.hoOk = true;
      } else {
        var ok = ac.tAlt >= D.tmaTop - 100 && ac.nav.mode === 'route' && ac.nav.route[ac.nav.route.length - 1] === ac.gate;
        if (!ok) this.inc('exitbad', [ac], ATC.T('{0}: 지역관제 이양 조건(FL190 상승 지시 + 출구 지점 {1} 직행)이 갖춰지지 않았습니다.', ac.cs, ac.gate));
        ac.owner = 'out'; ac.hoOk = true;
      }
    }
  };
  AppSim.prototype.onRouteEnd = function (ac, fn) {
    if (ac.kind !== 'arr' || ac.appr) return;
    if (ac.nordo) { ac.nordoPh = 1; ac.tAlt = 3000; ac.tIas = 200; return; }
    if (D.fix[fn].k === 'if') { ac.nav = { mode: 'hdg' }; ac.tHdg = D.ends[ac.rwy].crs; this.say(ac, ATC.csSay(ac) + ', passing ' + fn + ', request approach clearance.', { kind: 'warn' }); ac.waiting = 'appr'; return; }
    ac.nav = { mode: 'hold', fix: fn, ph: 1, tm: 0, inb: ac.hdg }; ac.tHdg = U.n360(ac.hdg + 180); ac.turnDir = 1; ac.holdT = this.t;
    this.say(ac, ATC.csSay(ac) + ', no further clearance, entering hold at ' + fn + '.', { kind: 'warn' }); ac.waiting = 'hold';
    this.inc('holdlong', [ac], ATC.T('{0}: STAR 끝({1})까지 다음 지시가 없어 체공에 들어갔습니다.', ac.cs, fn));
  };
  AppSim.prototype.onLoc = function (ac) {
    if (ac.appr.capAng > 45) this.inc('unstable', [ac], ATC.T('{0}: 로컬라이저 요격 각도 {1}° (30° 이하 권장, 45° 초과는 과대).', ac.cs, Math.round(ac.appr.capAng)));
    if (ac.owner === 'me') { this.say(ac, ATC.csSay(ac) + ', established localizer runway ' + ac.appr.rwy + '.'); ac.waiting = 'tower'; }
  };
  AppSim.prototype.goAround = function (ac, why) {
    var e = D.ends[ac.appr ? ac.appr.rwy : ac.rwy];
    ac.appr = null; ac.nav = { mode: 'hdg' }; ac.tHdg = e.crs; ac.tAlt = 3000; ac.tIas = 210; ac.spdAsg = 0; ac.missed = true; ac.owner = 'me'; ac.exp = false; ac.gaN = (ac.gaN || 0) + 1;
    this.say(ac, D.freq.APP.n + ', ' + ATC.csSay(ac) + ', going around' + (why ? ', ' + why : '') + ', runway heading, climbing 3,000.', { kind: 'warn', front: true }); ac.waiting = 'missed';
  };
  AppSim.prototype.onApprFail = function (ac, why) {
    if (why === 'high') { this.inc('unstable', [ac], ATC.T('{0}: 활공각보다 너무 높은 상태로 최종 접근에 들어와 복행했습니다.', ac.cs)); this.goAround(ac, 'too high'); }
    else {
      this.inc('unstable', [ac], ac.cs + (why === 'angle' ? ATC.T(': 요격 각도가 60°를 넘어 로컬라이저를 지나쳤습니다.') : ATC.T(': 로컬라이저를 포착하지 못하고 지나쳤습니다(요격 기수·위치 확인).')));
      ac.appr = null; this.say(ac, ATC.csSay(ac) + ', unable to establish on the localizer, request vectors.', { kind: 'warn' }); ac.waiting = 'vector';
    }
  };
  AppSim.prototype.onTouchdown = function (ac) {
    var r = ac.appr.rwy, last = this.lastLand[r];
    if (last !== undefined && this.t - last < 52) { this.inc('ga_forced', [ac], ATC.T('{0}: 앞 착륙기가 아직 활주로에 있어 타워가 복행을 지시했습니다(착륙 간격 {1}초).', ac.cs, Math.round(this.t - last))); this.goAround(ac, 'runway occupied'); return; }
    if (ac.owner === 'me') this.inc('noho', [ac], ATC.T('{0}: 타워로 이양하지 않은 채 착륙했습니다.', ac.cs));
    this.lastLand[r] = this.t;
    var dur = this.t - ac.entT;
    if (ac.emg) {
      if (this.t <= ac.emgDue) this.inc('emg_ok', [ac], ATC.T('{0} ({1}) 을 우선 착륙시켰습니다.', ac.cs, ac.emgName)); else this.inc('emg_late', [ac], ATC.T('{0} ({1}) 착륙이 {2}분 늦었습니다.', ac.cs, ac.emgName, Math.round((this.t - ac.emgDue) / 60)));
    } else if (dur > 23 * 60) this.inc('delay', [ac], ATC.T('{0}: 공역 안 비행 시간 {1}분.', ac.cs, Math.round(dur / 60)));
    this.sys(ATC.T('{0} 착륙 ({1})', ac.cs, r), 'good');
    this.remove(ac, true);
  };

  /* 비정상 상황 */
  AppSim.prototype.fire = function (ev) {
    var self = this, mine = this.acs.filter(function (a) { return a.kind === 'arr' && a.owner === 'me' && !a.emg && !a.nordo; });
    var far = mine.filter(function (a) { return !(a.appr && a.appr.loc) && U.dist(a, D.center) > 14; });
    var ac;
    if (ev.k === 'medical' || ev.k === 'mayday' || ev.k === 'minfuel') {
      if (!far.length) return false; ac = this.rng.pick(far);
      var dtg = U.dist(ac, D.fix[D.ends[ac.rwy].IF]) + 12;
      ac.emg = ev.k; ac.emgT = this.t;
      if (ev.k === 'medical') { ac.emgName = ATC.T('응급 환자'); ac.emgDue = this.t + dtg / 3.4 * 60 + 300; this.say(ac, 'PAN-PAN, PAN-PAN, PAN-PAN, ' + ATC.csSay(ac) + ', medical emergency on board, request priority landing and ambulance on arrival.', { kind: 'emg', front: true }); }
      if (ev.k === 'mayday') { ac.emgName = ATC.T('엔진 고장'); ac.emgDue = this.t + dtg / 3.2 * 60 + 240; ac.squawk = '7700'; ac.tIas = Math.min(ac.tIas, 220); ac.normIas = 220; this.say(ac, 'MAYDAY, MAYDAY, MAYDAY, ' + ATC.csSay(ac) + ', engine failure, request vectors for immediate landing, ' + this.rng.pick(D.pobList) + ' persons on board.', { kind: 'emg', front: true }); }
      if (ev.k === 'minfuel') { ac.emgName = ATC.T('최소 연료'); ac.emgDue = this.t + dtg / 3.4 * 60 + 420; this.say(ac, ATC.csSay(ac) + ', minimum fuel.', { kind: 'emg', front: true }); }
      ac.waiting = 'emg';
      this.sys(ATC.T('{0} — {1}. 다른 항공기보다 먼저 착륙시키세요.', ac.cs, ac.emgName), 'alert');
      return true;
    }
    if (ev.k === 'missed') {
      var fin = this.acs.filter(function (a) { return a.kind === 'arr' && a.appr && a.appr.loc && a.appr.d < 4 && a.appr.d > 1.5 && !a.emg; });
      if (!fin.length) return false; ac = fin[0]; this.goAround(ac, this.rng.pick(['wind shear', 'unstable approach'])); this.sys(ATC.T('{0} 복행 — 다시 순서에 넣어 유도하세요.', ac.cs), 'alert'); return true;
    }
    if (ev.k === 'wx') {
      var base = D.fix[this.rng.pick(this.flow.vecFix)];
      var c = D.off(base, this.rng.int(0, 359), 5 + this.rng() * 4);
      this.wx.push({ x: c.x, y: c.y, r: 4.5, vx: (this.rng() - 0.5) * 6, vy: (this.rng() - 0.5) * 6, hit: {} });
      this.sys(ATC.T('기상 레이더: 발달한 적란운(CB) 관측. 붉은 구역으로 유도하지 마세요.'), 'alert'); this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1); return true;
    }
    if (ev.k === 'nordo') {
      if (!far.length) return false; ac = this.rng.pick(far); ac.nordo = true; ac.squawk = '7600'; ac.emg = 'nordo'; ac.emgName = ATC.T('무선 통신 두절'); ac.emgDue = this.t + 3600; ac.waiting = null;
      ac.tAlt = Math.min(ac.tAlt, 4000);
      this.sys(ATC.T('{0} 스쿼크 7600(무선 통신 두절). 이 게임에서는 정해진 경로 → {1} ILS로 스스로 접근합니다. 다른 항공기를 비켜 주세요.', ac.cs, ac.rwy), 'alert'); return true;
    }
    return false;
  };

  AppSim.prototype.update = function (dt) {
    var i, a, self = this;
    while (this.sched.length && this.sched[0].t <= this.t) { var s = this.sched.shift(); if (s.kind === 'arr') this.spawnArr(s); else this.spawnDep(s); }
    for (i = 0; i < this.events.length; i++) { var ev = this.events[i]; if (!ev.done && this.t >= ev.t) { if (this.fire(ev)) ev.done = true; else { ev.t = this.t + 30; if (this.sched.length === 0 && ev.t > this.endT + 600) ev.done = true; } } }
    for (i = 0; i < this.wx.length; i++) { var w = this.wx[i]; w.x += w.vx / 3600 * dt; w.y += w.vy / 3600 * dt; }
    this.moveAll(dt);
    var acs = this.acs.slice();
    for (i = 0; i < acs.length; i++) {
      a = acs[i]; if (a.gone) continue;
      var dc = U.dist(a, D.center);
      if (a.justDep && a.alt > 3000) a.justDep = false;
      if (a.missed && a.alt >= 2900) a.missedLvl = true;
      if (a.kind === 'dep') {
        /* SID: 활주로 방위 3NM 뒤 출구 지점으로 */
        if (a.nav.mode === 'hdg' && !a.vec && !a.sidOn && U.dist(a, D.ends[a.rwy].end) > 3) { a.sidOn = true; a.setRoute([a.gate]); }
        if (a.sidT && this.t - a.sidT > 150 && a.owner === 'me' && Math.abs(a.alt - D.sidInit) < 100) { a.sidT = this.t; this.say(a, ATC.csSay(a) + ', level ' + fmt.alt(D.sidInit) + ', request higher.'); a.waiting = 'climb'; if (!a.lowHit) { a.lowHit = true; this.inc('delay', [a], ATC.T('{0}: 초기 고도 {1}에서 오래 수평 비행(상승 지시 지연).', a.cs, fmt.alt(D.sidInit))); } }
        if (a.owner === 'out' && (dc > D.tmaR - 2 || a.alt > D.tmaTop - 500 && dc > 30)) { this.remove(a, true); continue; }
        if (a.owner === 'me' && dc > D.tmaR - 9 && !a.hoAsk) { a.hoAsk = true; this.say(a, ATC.csSay(a) + ', approaching ' + a.gate + ', request frequency change.', { kind: 'warn' }); a.waiting = 'ho'; }
        if (a.owner === 'me' && dc > D.tmaR + 1) { this.inc('airspace', [a], ATC.T('{0}: 지역관제로 이양하지 않은 채 접근관제구를 벗어났습니다.', a.cs)); this.remove(a, false); continue; }
      } else {
        if (a.owner === 'in' && this.t - a.hoT > 75 && !a.hoLate) { a.hoLate = true; this.inc('noho', [a], ATC.T('{0}: 핸드오프 수락이 늦었습니다.', a.cs)); this.accept(a); }
        if (a.entered === undefined && dc < D.tmaR - 1) a.entered = true;
        if (a.entered && dc > D.tmaR + 2 && !(a.appr && a.appr.loc)) { this.inc('airspace', [a], ATC.T('{0}: 도착기가 접근관제구 밖으로 나갔습니다.', a.cs)); this.remove(a, false); continue; }
        if (a.appr && a.appr.loc && a.owner === 'me') {
          if (a.appr.d < 5.5 && !a.twrAsk) { a.twrAsk = true; this.say(a, ATC.csSay(a) + ', ' + Math.round(a.appr.d) + ' miles final runway ' + a.appr.rwy + '.', { kind: 'warn' }); a.waiting = 'tower'; }
        }
        if (a.nav.mode === 'hold' && a.holdT && this.t - a.holdT > 420 && !a.holdWarn) { a.holdWarn = true; this.say(a, ATC.csSay(a) + ', holding, request expected approach time.', { kind: 'warn' }); a.waiting = 'hold'; this.inc('holdlong', [a], ATC.T('{0}: 체공이 7분을 넘었습니다.', a.cs)); }
        if (a.emg && a.emg !== 'nordo' && !a.emgLate && this.t > a.emgDue + 1) { a.emgLate = true; if (a.emg === 'minfuel') { a.emg = 'mayday'; a.squawk = '7700'; a.emgName = ATC.T('연료 비상'); this.say(a, 'MAYDAY, MAYDAY, MAYDAY, ' + ATC.csSay(a) + ', fuel emergency, request immediate landing.', { kind: 'emg', front: true }); } }
        if (a.nordo && !(a.appr && a.appr.loc)) {
          /* 통신 두절기: STAR 끝 → 베이스 → 30° 요격으로 스스로 접근 */
          var ne = D.ends[a.rwy], ng = ATC.ilsGeom(a, ne);
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
    this.alerts.stca.forEach(function (p) { out.push({ p: 9, ac: p[0].id, t: ATC.T('{0} · {1} 곧 가까워집니다 — 한쪽 고도를 1,000ft 이상 다르게 하거나 기수를 바꾸세요.', p[0].cs, p[1].cs) }); });
    this.acs.forEach(function (a) {
      if (a.owner === 'in') { out.push({ p: 8, ac: a.id, t: ATC.T('{0} 핸드오프 수락(깜박이는 표지를 누르고 「수락」).', a.cs) }); return; }
      if (a.owner !== 'me') return;
      var dc = U.dist(a, D.center);
      if (a.kind === 'dep') {
        if (a.tAlt < D.tmaTop - 100) out.push({ p: 5, ac: a.id, t: ATC.T('{0} 출발기 — 위에 도착기가 없으면 FL190까지 상승시키세요.', a.cs) });
        else if (dc > 22) out.push({ p: 6, ac: a.id, t: ATC.T('{0} — {aptEn} Control로 이양(FL190 상승 중 · {1} 직행).', a.cs, a.gate) });
        return;
      }
      var e = D.ends[a.rwy], g = ATC.ilsGeom(a, e);
      if (a.missed && !a.appr) { out.push({ p: 7, ac: a.id, t: ATC.T('{0} 복행 — 4,000ft로 올리고 장주 방향(기수 {1})으로 돌려 다시 최종 접근로에 넣으세요.', a.cs, fmt.hdg(e.crs + 180)) }); return; }
      if (a.appr && a.appr.loc) { if (g.d < 10) out.push({ p: 7, ac: a.id, t: ATC.T('{0} 로컬라이저 확립 — {aptEn} Tower로 이양.', a.cs), c: [{ k: 'ho', to: 'TWR' }] }); return; }
      if (a.appr) return;
      if (a.nav.mode === 'hold') { out.push({ p: 7, ac: a.id, t: ATC.T('{0} 체공 중 — 기수를 주어 최종 접근로로 유도하세요.', a.cs) }); return; }
      var wantAlt = dc > 28 ? 8000 : dc > 18 ? 5000 : 3000;
      if (g.d > 6 && g.d < 20 && Math.abs(g.xtk) < 4.5 && Math.abs(U.adiff(a.hdg, e.crs)) > 20 && a.tAlt <= 4000) {
        var ih = U.n360(e.crs + (g.xtk > 0 ? -30 : 30));
        out.push({ p: 8, ac: a.id, t: ATC.T('{0} 최종 접근로 {1}NM 옆 — 기수 {2}(30° 요격) + 「ILS {3} 접근 허가」.', a.cs, Math.abs(g.xtk).toFixed(1), fmt.hdg(ih), a.rwy), c: [{ k: 'hdg', v: ih }, { k: 'ils', rwy: a.rwy }] });
      } else if (a.tAlt > wantAlt + 500) out.push({ p: 4, ac: a.id, t: ATC.T('{0} 공항까지 {1}NM — {2}{3}로 강하시키세요.', a.cs, Math.round(dc), fmt.alt(wantAlt), (wantAlt >= 14000 ? '' : 'ft')) });
      else if (a.nav.mode === 'route' && a.nav.i >= a.nav.route.length - 1 && U.dist(a, D.fix[a.nav.route[a.nav.route.length - 1]]) < 6 && D.fix[a.nav.route[a.nav.route.length - 1]].k === 'base') {
        var bh = U.n360(e.crs + (g.xtk > 0 ? -90 : 90));
        out.push({ p: 6, ac: a.id, t: ATC.T('{0} 곧 STAR 끝 — 기수 {1}(베이스 구간)로 최종 접근로 쪽으로 돌리세요. 속도 210 이하 권장.', a.cs, fmt.hdg(bh)) });
      } else if (a.ias > 215 && g.d < 16 && dc < 20) out.push({ p: 3, ac: a.id, t: ATC.T('{0} 속도 {1} — 최종 접근 전 210 → 180으로 줄이세요.', a.cs, Math.round(a.ias)) });
    });
    out.sort(function (x, y) { return y.p - x.p; });
    return out.slice(0, 4);
  };
  ATC.AppSim = AppSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
