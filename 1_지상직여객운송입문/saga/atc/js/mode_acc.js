/* AIRLINE SAGA — ATC 지역관제(ACC): 세이라 비행정보구역(FIR) 항로 관제 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;

  function AccSim(o) {
    o = o || {}; o.mode = 'ACC'; o.sweep = 6; o.minH = 5;
    ATC.RadarSim.call(this, o);
    var L = this.level.id, rng = this.rng, i, t = 3;
    this.cfg = [null, { ovf: 6, arr: 2, dep: 2, gap: 120 }, { ovf: 10, arr: 4, dep: 4, gap: 85 }, { ovf: 15, arr: 7, dep: 6, gap: 58 }][L];
    var kinds = []; for (i = 0; i < this.cfg.ovf; i++) kinds.push('ovf'); for (i = 0; i < this.cfg.arr; i++) kinds.push('arr'); for (i = 0; i < this.cfg.dep; i++) kinds.push('dep');
    for (i = kinds.length - 1; i > 0; i--) { var j = rng.int(0, i), x = kinds[i]; kinds[i] = kinds[j]; kinds[j] = x; }
    this.sched = []; this.wx = []; this.rActive = false; this.lastAt = {};
    for (i = 0; i < kinds.length; i++) { this.sched.push({ t: t, kind: kinds[i], warm: i < 3 }); t += this.cfg.gap * (0.7 + rng() * 0.6); }
    this.endT = t;
    /* 설계된 교차 상황: 같은 고도·같은 시각에 한 지점에서 만나는 통과기 */
    var nc = [0, 2, 3, 5][L], ov = this.sched.filter(function (s, ix) { return s.kind === 'ovf' && ix >= 3; });
    while (nc-- > 0 && ov.length) ov.splice(rng.int(0, ov.length - 1), 1)[0].conf = true;
    var pool = L === 2 ? ['turb', 'medical', 'wx'] : L === 3 ? ['decomp', 'restricted', 'wx', 'medical', 'turb'] : [];
    var n = this.level.events + (L === 3 ? 1 : 0);
    while (n-- > 0 && pool.length) { var k = pool.splice(rng.int(0, pool.length - 1), 1)[0]; this.events.push({ k: k, t: this.endT * (0.15 + 0.55 * rng()), done: false }); }
    this.sys(ATC.T('{apt} 지역관제({aptEn} Control {0}) 근무 시작. 레이더 분리 기준 5NM 또는 1,000ft. 도착기는 진입 지점을 {1}ft로 통과시켜 접근관제에 넘깁니다.', D.freq.ACC.fq, fmt.alt(D.accArrAlt)));
  }
  ATC.extend(AccSim, ATC.RadarSim);
  function trackEast(a, b) { return U.brg(a, b) < 180; }
  function lvlFor(rng, east, lo, hi) { var c = [], f; for (f = lo; f <= hi; f += 10) if (((f / 10) % 2 === 1) === east) c.push(f); return rng.pick(c) * 100; }
  AccSim.prototype.iasFor = function (perf, alt) { return Math.round(perf.crz / (1 + alt / 1000 * 0.0165)); };
  AccSim.prototype.spawnConflict = function () {
    var rng = this.rng, self = this, cands = this.acs.filter(function (b) { return b.kind === 'ovf' && !b.emg && b.nav.mode === 'route' && Math.abs(b.alt - b.tAlt) < 100 && !b.confWith; });
    for (var n = 0; n < cands.length; n++) {
      var b = cands[n], rem = b.nav.route.slice(b.nav.i), eta = 0, prev = b, k;
      for (k = 0; k < rem.length - 1; k++) {
        eta += U.dist(prev, D.fix[rem[k]]) / b.gs * 3600; prev = D.fix[rem[k]];
        var X = rem[k]; if (eta < 380 || eta > 1500) continue;
        var routes = D.ovfRoutes.filter(function (r) { var ix = r.indexOf(X); return ix > 0 && ix < r.length - 1 && r.join() !== b.fpRoute.join() && r.slice().reverse().join() !== b.fpRoute.join() && trackEast(D.fix[r[0]], D.fix[r[r.length - 1]]) === b.east; });
        if (!routes.length) continue;
        var route = rng.pick(routes), f = this.mkFlight(function (a) { return !a.ga && a.code !== 'KCM'; });
        if (f.perf.ceil < b.alt) continue;
        var ias = this.iasFor(f.perf, b.alt), gs = ias * (1 + b.alt / 1000 * 0.0165), need = eta * gs / 3600 + (rng() - 0.5) * 3, ix = route.indexOf(X), p = D.fix[X], seg = ix, hd;
        while (need > 0 && seg > 0) { var q = D.fix[route[seg - 1]], dl = U.dist(p, q); hd = U.brg(q, p); if (dl >= need) { p = D.off(p, hd + 180, need); need = 0; } else { need -= dl; p = q; seg--; } }
        if (need > 32) continue;
        if (need > 0) { hd = U.brg(D.fix[route[0]], D.fix[route[1]]); p = D.off(D.fix[route[0]], hd + 180, need); seg = 0; }
        var inside = p.x > D.acc.x1 && p.x < D.acc.x2 && p.y > D.acc.y1 && p.y < D.acc.y2;
        var ac = this.spawnAc({ cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf, x: p.x, y: p.y, alt: b.alt, hdg: hd, ias: ias, normIas: ias, fast: true, kind: 'ovf', fpRoute: route, squawk: this.squawk(), entT: this.t, rfl: b.alt, exitFix: route[route.length - 1], east: b.east, orig: 'ZSPD', dest: 'RJAA', owner: (inside || this.level.id === 1) ? 'me' : 'in', confWith: b.id });
        ac.setRoute(route.slice(seg === 0 && need > 0 ? 0 : seg)); b.confWith = ac.id; if (ac.owner === 'in') ac.hoT = this.t; else if (!inside) this.checkIn(ac);
        return true;
      }
    }
    return false;
  };
  AccSim.prototype.spawn = function (s) {
    if (s.conf && this.spawnConflict()) return;
    var rng = this.rng, f, route, alt, east, o, kind = s.kind, guard = 0, key;
    do {
      if (kind === 'ovf') route = rng.pick(D.ovfRoutes);
      else if (kind === 'arr') { var g = rng.pick(Object.keys(D.accArr)); route = [rng.pick(D.accArr[g]), g]; }
      else { var g2 = rng.pick(Object.keys(D.accDep)); route = [g2, rng.pick(D.accDep[g2])]; }
      key = route[0];
    } while (this.lastAt[key] !== undefined && this.t - this.lastAt[key] < 200 && guard++ < 12);
    this.lastAt[key] = this.t;
    f = this.mkFlight(kind === 'ovf' ? function (a) { return !a.ga && a.code !== 'KCM'; } : function (a) { return a.code !== 'SVJ' || true; });
    var f0 = D.fix[route[0]], f1 = D.fix[route[1]], last = D.fix[route[route.length - 1]], hd = U.brg(f0, f1), p;
    east = trackEast(f0, last);
    o = { cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf, hdg: hd, kind: kind, fpRoute: route, squawk: this.squawk(), entT: this.t };
    var jet = f.perf.k === 'jet', top = Math.min(f.perf.ceil / 100, 400);
    if (kind === 'ovf') {
      alt = jet ? lvlFor(rng, east, this.level.id === 1 ? 330 : 350, Math.min(top, 380)) : lvlFor(rng, east, 220, 250);
      p = D.off(f0, hd + 180, 14); o.rfl = alt; o.exitFix = route[route.length - 1];
      var a0 = rng.pick(D.gateOrig[rng.pick(Object.keys(D.gateOrig))]), a1 = rng.pick(D.gateDest[rng.pick(Object.keys(D.gateDest))]); o.orig = a0[0]; o.dest = a1[0] === a0[0] ? 'WSSS' : a1[0];
      if (s.warm) { var fr = 0.15 + 0.3 * rng(); p = { x: f0.x + (f1.x - f0.x) * fr, y: f0.y + (f1.y - f0.y) * fr }; }
    } else if (kind === 'arr') {
      alt = jet ? rng.pick([250, 260, 270, 280, 290]) * 100 : rng.pick([200, 210, 220]) * 100;
      p = D.off(f0, hd + 180, 14); o.rfl = alt; o.gate = route[1]; o.dest = D.airport.icao; var og = rng.pick(D.gateOrig[route[1]]); o.orig = og[0];
    } else {
      alt = 17000 + rng.int(0, 10) * 100; p = { x: f0.x, y: f0.y }; o.tAlt = D.tmaTop; o.gate = route[0]; o.orig = D.airport.icao; var dg = rng.pick(D.gateDest[route[0]]); o.dest = dg[0];
      o.rfl = jet ? lvlFor(rng, east, this.level.id === 1 ? 330 : 350, Math.min(top, 380)) : lvlFor(rng, east, 220, 250); o.exitFix = route[1];
    }
    o.x = p.x; o.y = p.y; o.alt = alt; o.east = east;
    o.ias = kind === 'dep' ? 290 : this.iasFor(f.perf, alt); o.normIas = this.iasFor(f.perf, o.rfl); o.fast = true;
    o.owner = (this.level.id === 1 || s.warm) ? 'me' : 'in';
    var ac = this.spawnAc(o); ac.setRoute(s.warm ? route.slice(1) : (kind === 'dep' ? route.slice(1) : route));
    if (ac.owner === 'me') { if (!s.warm) this.checkIn(ac); } else ac.hoT = this.t;
    return ac;
  };
  AccSim.prototype.checkIn = function (ac) {
    var t = D.freq.ACC.n + ', ' + ATC.csSay(ac) + ', ';
    if (ac.kind === 'dep') { t += 'climbing ' + fmt.alt(ac.tAlt) + ', request ' + fmt.alt(ac.rfl) + '.'; ac.waiting = 'climb'; ac.reqT = this.t; }
    else if (ac.kind === 'arr') { t += 'maintaining ' + fmt.alt(ac.alt) + ', inbound ' + ac.gate + '.'; ac.waiting = 'checkin'; }
    else { t += 'maintaining ' + fmt.alt(ac.alt) + '.'; ac.waiting = 'checkin'; }
    this.say(ac, t);
  };
  AccSim.prototype.accept = function (ac) { if (!ac || ac.owner !== 'in') return false; ac.owner = 'me'; this.checkIn(ac); this.emit('applied', ac); return true; };
  AccSim.prototype.command = function (ac, cmds, o) {
    if (!ac || ac.gone) return false;
    if (ac.owner === 'in') { this.sys(ATC.T('{0}: 아직 이 주파수에 없습니다. 먼저 핸드오프를 수락하세요.', ac.cs), 'warn'); return false; }
    if (ac.owner === 'out') { this.sys(ATC.T('{0}: 이미 다음 관제 구역으로 이양했습니다.', ac.cs), 'warn'); return false; }
    return ATC.Sim.prototype.command.call(this, ac, cmds, o);
  };
  AccSim.prototype.validate = function (ac, cmds) {
    for (var i = 0; i < cmds.length; i++) {
      var c = cmds[i];
      if (c.k === 'alt' && c.v > ac.perf.ceil) return { refuse: fmt.alt(c.v) + ' is above our maximum altitude' };
      if (c.k === 'alt' && ac.emg === 'decomp' && c.v > 10000) return { refuse: 'unable to climb, cabin pressure' };
      if (c.k === 'alt' && c.v < D.accArrAlt && !(ac.kind === 'arr' || ac.divert)) return { refuse: 'that is below your airspace' };
    }
    return null;
  };
  /* 다음 구역(경계 지점 기준) */
  AccSim.prototype.nextSector = function (ac) {
    if (ac.kind === 'arr' || ac.divert) return { key: 'APP', n: D.freq.APP.n, fq: D.freq.APP.fq };
    var side = D.bdSide[ac.exitFix], nb = D.neighbor[side]; return { key: side, n: nb.n, fq: nb.fq };
  };
  AccSim.prototype.apply = function (ac, c) {
    if (this.applyAir(ac, c)) {
      if (c.k === 'alt' && c.v <= 14000) { ac.tIas = Math.min(ac.tIas, 280); ac.normIas = 280; }
      if (c.k === 'alt') { if (ac.waiting === 'climb' || ac.waiting === 'lvl' || ac.waiting === 'desc') ac.waiting = null; ac.reqT = null; }
      if ((c.k === 'hdg') && ac.waiting === 'dev') { ac.waiting = null; ac.reqT = null; ac.devT = this.t; }
      return;
    }
    if (c.k === 'ho') {
      var prob = [];
      if (ac.kind === 'arr' || ac.divert) {
        if (ac.tAlt !== D.accArrAlt) prob.push(ATC.T('진입 지점 통과 고도 {0}ft 강하 지시가 없습니다', fmt.alt(D.accArrAlt)));
        if (!(ac.nav.mode === 'route' && ac.nav.route[ac.nav.route.length - 1] === ac.gate)) prob.push(ATC.T('{0} 직행 경로가 아닙니다', ac.gate));
        if (U.dist(ac, D.fix[ac.gate]) > 45) prob.push(ATC.T('너무 이릅니다(진입 지점 45NM 밖)'));
      } else {
        var odd = (Math.round(ac.tAlt / 1000) % 2) === 1;
        if (ac.tAlt >= 29000 || ac.tAlt >= 20000) { if (odd !== ac.east) { this.inc('wronglvl', [ac], ATC.T('{0}: {1}행인데 {2} 배정(동쪽행 = 홀수, 서쪽행 = 짝수 고도).', ac.cs, (ac.east ? ATC.T('동쪽') : ATC.T('서쪽')), fmt.alt(ac.tAlt))); } }
        if (!(ac.nav.mode === 'route' && ac.nav.route[ac.nav.route.length - 1] === ac.exitFix)) prob.push(ATC.T('경계 지점 {0}로 가는 경로가 아닙니다', ac.exitFix));
        if (U.dist(ac, D.fix[ac.exitFix]) > 50) prob.push(ATC.T('너무 이릅니다(경계 50NM 밖)'));
        if (ac.tAlt < 20000) prob.push(ATC.T('순항 고도 상승 지시가 없습니다'));
      }
      if (prob.length) this.inc('exitbad', [ac], ac.cs + ': ' + prob.join(' · ') + '.');
      ac.owner = 'out'; ac.waiting = null;
      if (ac.emg && ac.divert && !ac.emgDone) { ac.emgDone = true; if (this.t <= ac.emgDue) this.inc('emg_ok', [ac], ATC.T('{0} ({1}) 을 {apt} 접근관제로 신속히 넘겼습니다.', ac.cs, ac.emgName)); else this.inc('emg_late', [ac], ATC.T('{0} ({1}) 처리가 늦었습니다.', ac.cs, ac.emgName)); }
    }
  };
  AccSim.prototype.onRouteEnd = function (ac, fn) {
    if (ac.gone) return;
    if (ac.kind === 'arr' || ac.divert) {
      if (ac.alt > D.accArrAlt + 500) this.inc('exitbad', [ac], ATC.T('{0}: {1} 통과 고도 {2} — 협정 고도 {3}ft보다 높습니다.', ac.cs, fn, fmt.alt(ac.alt), fmt.alt(D.accArrAlt)));
      if (ac.owner === 'me') this.inc('noho', [ac], ATC.T('{0}: 접근관제로 이양하지 않은 채 진입 지점을 지났습니다.', ac.cs));
      this.remove(ac, true); return;
    }
    if (ac.owner === 'me') { this.inc('airspace', [ac], ATC.T('{0}: 다음 구역으로 이양하지 않은 채 경계 지점 {1}을 지났습니다.', ac.cs, fn)); this.remove(ac, false); }
    else this.remove(ac, true);
  };
  AccSim.prototype.fire = function (ev) {
    var self = this, rng = this.rng, cand, ac;
    var mine = this.acs.filter(function (a) { return a.owner === 'me' && !a.emg && Math.abs(a.x) < 105 && Math.abs(a.y) < 78; });
    if (ev.k === 'turb') {
      cand = mine.filter(function (a) { return a.kind === 'ovf' && a.alt > 29000 && Math.abs(a.alt - a.tAlt) < 100; }); if (!cand.length) return false;
      ac = rng.pick(cand); var nl = ac.alt + (ac.alt + 2000 <= ac.perf.ceil && rng() < 0.6 ? 2000 : -2000);
      ac.reqLvl = nl; ac.waiting = 'lvl'; ac.reqT = this.t; this.say(ac, ATC.csSay(ac) + ', moderate turbulence, request ' + fmt.alt(nl) + '.', { kind: 'warn' }); return true;
    }
    if (ev.k === 'medical' || ev.k === 'decomp') {
      cand = mine.filter(function (a) { return a.kind === 'ovf' && a.alt > 28000; }); if (!cand.length) return false;
      ac = rng.pick(cand); ac.emg = ev.k; ac.emgT = this.t;
      var best = null, bd = 1e9; Object.keys(D.star.E).forEach(function (g) { var d = U.dist(ac, D.fix[g]); if (d < bd) { bd = d; best = g; } });
      ac.gate = best; ac.divert = true; ac.dest = D.airport.icao; ac.emgDue = this.t + bd / 7 * 60 + 420;
      if (ev.k === 'medical') { ac.emgName = ATC.T('응급 환자 · {apt} 회항'); this.say(ac, 'PAN-PAN, PAN-PAN, PAN-PAN, ' + ATC.csSay(ac) + ', passenger medical emergency, request diversion to ' + D.airport.call + '.', { kind: 'emg', front: true }); }
      else { ac.emgName = ATC.T('객실 여압 상실 · 비상 강하'); ac.squawk = '7700'; ac.tAlt = 10000; ac.exp = true; ac.nav = { mode: 'hdg' }; ac.tHdg = U.n360(ac.hdg + 30); this.say(ac, 'MAYDAY, MAYDAY, MAYDAY, ' + ATC.csSay(ac) + ', cabin depressurization, emergency descent to 10,000, turning right.', { kind: 'emg', front: true }); }
      ac.waiting = 'emg';
      this.sys(ATC.T('{0} — {1}. {2}{3} 직행 + {4}ft{5} {apt} 접근관제로 넘기세요.', ac.cs, ac.emgName, (ev.k === 'decomp' ? ATC.T('아래 고도의 항공기를 먼저 비키고, ') : ''), ac.gate, fmt.alt(D.accArrAlt), (ev.k === 'decomp' ? ATC.T(' 이하 확인 뒤') : ATC.T(' 강하 지시 뒤'))), 'alert');
      return true;
    }
    if (ev.k === 'wx') {
      var aw = rng.pick(D.airways), a0 = D.fix[aw.f[rng.int(0, aw.f.length - 2)]], a1 = D.fix[aw.f[aw.f.indexOf(a0.n) + 1]], fr = 0.3 + 0.4 * rng();
      this.wx.push({ x: a0.x + (a1.x - a0.x) * fr, y: a0.y + (a1.y - a0.y) * fr, r: 9, vx: (rng() - 0.5) * 10, vy: (rng() - 0.5) * 10, hit: {}, asked: {} });
      this.sys(ATC.T('기상 레이더: 항로 {0} 부근에 발달한 적란운(CB). 조종사의 회피 요청에 응하고 붉은 구역으로 유도하지 마세요.', aw.n), 'alert'); return true;
    }
    if (ev.k === 'restricted') { this.rActive = true; this.rHit = {}; this.sys(ATC.T('군 훈련 공역 {0} 사용 개시(지표 ~ FL350). 통과 예정기는 FL360 이상으로 올리거나 우회시키세요.', D.restricted.n), 'alert'); return true; }
    return false;
  };
  AccSim.prototype.update = function (dt) {
    var i, a, k;
    while (this.sched.length && this.sched[0].t <= this.t) this.spawn(this.sched.shift());
    for (i = 0; i < this.events.length; i++) { var ev = this.events[i]; if (!ev.done && this.t >= ev.t) { if (this.fire(ev)) ev.done = true; else { ev.t = this.t + 40; if (!this.sched.length && this.acs.length < 2) ev.done = true; } } }
    for (i = 0; i < this.wx.length; i++) { var w = this.wx[i]; w.x += w.vx / 3600 * dt; w.y += w.vy / 3600 * dt; }
    this.moveAll(dt);
    var acs = this.acs.slice(), B = D.acc;
    for (i = 0; i < acs.length; i++) {
      a = acs[i]; if (a.gone) continue;
      if (a.owner === 'in' && this.t - a.hoT > 110 && !a.hoLate) { a.hoLate = true; this.inc('noho', [a], ATC.T('{0}: 핸드오프 수락이 늦었습니다.', a.cs)); this.accept(a); }
      var out = a.x < B.x1 - 16 || a.x > B.x2 + 16 || a.y < B.y1 - 16 || a.y > B.y2 + 16;
      if (out) { if (a.owner === 'me') this.inc('airspace', [a], ATC.T('{0}: 이양 없이 관할 구역을 벗어났습니다.', a.cs)); this.remove(a, a.owner === 'out'); continue; }
      if (a.owner !== 'me') continue;
      /* 요청 미응답 */
      if (a.reqT && this.t - a.reqT > 240 && !a.reqLate) { a.reqLate = true; this.inc('reqlate', [a], ATC.T('{0}: 조종사 요청에 4분 넘게 답하지 않았습니다.', a.cs)); }
      /* 도착기 강하 시점 */
      if ((a.kind === 'arr' || a.divert) && a.tAlt > D.accArrAlt && !a.todAsk && a.nav.mode === 'route') {
        var dg = U.dist(a, D.fix[a.gate]), need = (a.alt - D.accArrAlt) / (a.perf.desc * 0.95) * (a.gs / 60) + 6;
        if (dg < need) { a.todAsk = true; a.waiting = 'desc'; a.reqT = this.t; this.say(a, ATC.csSay(a) + ', request descent.', { kind: 'warn' }); }
      }
      /* 이양 요청 */
      var tgt = (a.kind === 'arr' || a.divert) ? a.gate : a.exitFix;
      if (tgt && !a.hoAsk && U.dist(a, D.fix[tgt]) < 12 && a.nav.mode === 'route') { a.hoAsk = true; a.waiting = 'ho'; this.say(a, ATC.csSay(a) + ', approaching ' + tgt + ', request frequency change.', { kind: 'warn' }); }
      /* 비상 강하 수평 뒤 회항 요청 */
      if (a.emg === 'decomp' && !a.divAsk && a.alt <= 10100) { a.divAsk = true; a.exp = false; a.waiting = 'emg'; this.say(a, ATC.csSay(a) + ', level 10,000, request vectors to ' + D.airport.call + '.', { kind: 'emg' }); }
      /* 악기상 */
      for (k = 0; k < this.wx.length; k++) {
        var w2 = this.wx[k], dw = U.dist(a, w2);
        if (dw < w2.r && !w2.hit[a.id] && a.alt < 41000) { w2.hit[a.id] = 1; this.inc('wx', [a], ATC.T('{0}: 적란운 구역을 통과했습니다(심한 난기류).', a.cs)); }
        if (!w2.asked[a.id] && dw < w2.r + 28 && dw > w2.r) {
          var bw = U.brg(a, w2), off = U.adiff(a.hdg, bw);
          if (Math.abs(off) < 18) { w2.asked[a.id] = 1; a.waiting = 'dev'; a.reqT = this.t; a.devSide = off >= 0 ? 'L' : 'R'; this.say(a, ATC.csSay(a) + ', request ' + (25) + ' degrees ' + (a.devSide === 'L' ? 'left' : 'right') + ' of track due weather.', { kind: 'warn' }); }
        }
      }
      if (a.devT && this.t - a.devT > 200 && a.nav.mode === 'hdg' && !a.devBack) { a.devBack = true; this.say(a, ATC.csSay(a) + ', clear of weather, request direct ' + (a.exitFix || a.gate) + '.', { kind: 'warn' }); a.waiting = 'dct'; }
      /* 제한 구역 */
      if (this.rActive && a.alt < D.restricted.top && !this.rHit[a.id] && U.inPoly(a, D.restricted.pts)) { this.rHit[a.id] = 1; this.inc('restricted', [a], ATC.T('{0}: 사용 중인 {1}에 FL350 이하로 들어갔습니다.', a.cs, D.restricted.n)); }
    }
  };
  AccSim.prototype.isFinished = function () { return this.sched.length === 0 && this.acs.length === 0 && this.t > 30; };
  AccSim.prototype.coach = function () {
    var out = [], self = this;
    this.alerts.stca.forEach(function (p) { out.push({ p: 9, ac: p[0].id, t: ATC.T('{0} · {1} 같은 고도대에서 곧 5NM 안으로 접근 — 한쪽 고도를 바꾸거나(방향에 맞는 홀·짝 고도) 기수를 돌리세요.', p[0].cs, p[1].cs) }); });
    this.acs.forEach(function (a) {
      if (a.owner === 'in') { out.push({ p: 8, ac: a.id, t: ATC.T('{0} 핸드오프 수락.', a.cs) }); return; }
      if (a.owner !== 'me') return;
      if (a.emg) { out.push({ p: 9, ac: a.id, t: ATC.T('{0} {1} — {2} 직행 · {3}ft 강하 뒤 접근관제로 이양.', a.cs, a.emgName, a.gate, fmt.alt(D.accArrAlt)) }); return; }
      if (a.waiting === 'lvl') out.push({ p: 6, ac: a.id, t: ATC.T('{0} 고도 변경 요청({1}) — 그 고도에 다른 항공기가 없는지 보고 승인.', a.cs, fmt.alt(a.reqLvl)) });
      if (a.waiting === 'dev') out.push({ p: 7, ac: a.id, t: ATC.T('{0} 기상 회피 요청 — 요청 방향으로 기수 25° 변경 승인, 지난 뒤 직행 복귀.', a.cs) });
      if (a.kind === 'dep' && a.tAlt < 20000) out.push({ p: 5, ac: a.id, t: ATC.T('{0} 출발기 — 요청 고도 {1}까지 상승(중간에 가로지르는 항공기 확인).', a.cs, fmt.alt(a.rfl)) });
      if (a.kind === 'arr' && a.tAlt > D.accArrAlt && U.dist(a, D.fix[a.gate]) < 75) out.push({ p: 6, ac: a.id, t: ATC.T('{0} 도착기 — {1}ft 강하 지시({2} 통과 고도).', a.cs, fmt.alt(D.accArrAlt), a.gate) });
      var tgt = a.kind === 'arr' ? a.gate : a.exitFix, d = tgt ? U.dist(a, D.fix[tgt]) : 99;
      if (d < 30 && (a.kind !== 'arr' || a.tAlt === D.accArrAlt)) out.push({ p: 7, ac: a.id, t: ATC.T('{0} — {1}(으)로 이양.', a.cs, self.nextSector(a).n) });
    });
    out.sort(function (x, y) { return y.p - x.p; }); return out.slice(0, 4);
  };
  ATC.AccSim = AccSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
