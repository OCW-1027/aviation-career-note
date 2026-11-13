/* AIRLINE SAGA — ATC 관제탑(TWR): 활주로 사용 순서·이착륙 허가·활주로 횡단 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt, KT = ATC.KT, NM = ATC.NMm;

  function TwrSim(o) {
    o = o || {}; o.mode = 'TWR'; ATC.GroundSim.call(this, o);
    var L = this.level.id, rng = this.rng, F = this.flow, i, t, self = this;
    /* 초급: 북쪽 활주로 하나로 이착륙 / 중급: 도착 북·출발 남 분리 / 고급: 두 활주로 혼합 */
    this.cfg = [null, { arr: 6, dep: 6, gap: 230, k: 0 }, { arr: 9, dep: 10, gap: 150, k: 2 }, { arr: 14, dep: 14, gap: 120, k: 3 }][L];
    this.arrRw = L === 3 ? F.arrs.slice() : [F.arr];
    this.depRw = L === 1 ? [F.arr] : L === 2 ? [F.dep] : F.deps.slice();
    if (F.twr && F.twr[L]) { this.arrRw = F.twr[L].arr.slice(); this.depRw = F.twr[L].dep.slice(); }   /* 공항 묶음이 난이도별 활주로 조합을 따로 정한 경우 */
    var arr0 = this.arrRw[0];
    /* 고급: 첫 활주로를 64%, 나머지를 고르게 */
    function pickRw(list) { var r = rng(); return r < 0.64 || list.length < 2 ? list[0] : list[1 + Math.min(list.length - 2, Math.floor((r - 0.64) / 0.36 * (list.length - 1)))]; }
    this.active = {}; this.arrRw.concat(this.depRw).forEach(function (e) { self.active[e] = 1; });
    this.sched = []; t = 5;
    var lastOn = {};
    for (i = 0; i < this.cfg.arr; i++) {
      var rw = L === 3 ? pickRw(F.arrs) : arr0;
      var tt = Math.max(t, (lastOn[rw] || -999) + (L === 1 ? 200 : 115));
      this.sched.push({ t: tt, kind: 'arr', rwy: rw, warm: i === 0 }); lastOn[rw] = tt;
      t += this.cfg.gap * (0.7 + rng() * 0.6) / (L === 3 ? 1.5 : 1);
    }
    t = 20;
    for (i = 0; i < this.cfg.dep; i++) { this.sched.push({ t: t, kind: 'dep', rwy: L === 3 ? pickRw(F.deps) : this.depRw[0], inter: L === 3 && rng() < 0.3 }); t += this.cfg.gap * (0.7 + rng() * 0.6) / (L === 3 ? 1.5 : 1); }
    for (i = 0; i < this.cfg.k; i++) this.sched.push({ t: 120 + rng() * (t - 200), kind: i % 2 ? 'arr' : 'dep', rwy: i % 2 ? arr0 : this.depRw[0], cargo: true });
    this.sched.sort(function (a, b) { return a.t - b.t; });
    this.endT = this.sched[this.sched.length - 1].t;
    var pool = L === 2 ? ['ga_pilot', 'bird', 'rto'] : L === 3 ? ['ga_pilot', 'rto', 'bird', 'emg'] : [], n = this.level.events;
    while (n-- > 0 && pool.length) { var k = pool.splice(rng.int(0, pool.length - 1), 1)[0]; this.events.push({ k: k, t: this.endT * (0.2 + 0.55 * rng()), done: false }); }
    this.sys(ATC.T('{apt} 관제탑({0}) 근무 시작. 착륙 {1} / 이륙 {2}. 바람 {3}, QNH {4}.', D.freq.TWR.fq, this.arrRw.join('·'), this.depRw.join('·'), fmt.wind(this.wind), this.qnh));
  }
  ATC.extend(TwrSim, ATC.GroundSim);

  TwrSim.prototype.spawn = function (s) {
    var self = this, f = s.f || this.mkFlight(s.cargo ? function (a) { return a.cargo; } : function (a) { return !a.cargo; }), ac, e = D.ends[s.rwy];
    if (s.kind === 'arr') {
      var prev = this.finals(s.rwy), last = prev[prev.length - 1];
      if (last && last.d > (s.warm ? 5 : 10) * NM - 3.2 * NM) { s.t = this.t + 20; this.sched.push(s); this.sched.sort(function (a, b) { return a.t - b.t; }); s.f = f; return; }
      var P = !s.stand && D.planFlight ? this.plan(f, 'arr', s.rwy) : null;
      var side = this.level.id === 3 ? e.rw : null, st = s.stand || (P ? P.stand : this.pickStand(f, side)) || D.spareStand;
      ac = this.spawnFinal(s.rwy, { f: f, dNM: s.warm ? 5 : 10, stand: st, emg: s.emg, emgName: s.emgName });
      if (P) ac.orig = P.ap[0];
      if (s.re) this.total--;
      this.say(ac, (s.emg ? 'MAYDAY, MAYDAY, MAYDAY, ' : '') + D.freq.TWR.n + ', ' + ATC.csSay(ac) + ', ILS runway ' + s.rwy + (s.emg ? ', hydraulic failure, request emergency services on standby.' : '.'), { kind: s.emg ? 'emg' : '' });
      ac.waiting = 'land';
      if (s.emg) this.sys(ATC.T('{0} — 유압 계통 고장(비상). 복행시키지 말고 활주로를 비워 착륙시키세요. 착륙 뒤 활주로 위에 잠시 멈춥니다.', ac.cs), 'alert');
    } else {
      var PD = D.planFlight ? this.plan(f, 'dep', s.rwy) : null;
      var stand = PD ? PD.stand : this.pickStand(f, this.level.id === 3 ? e.rw : null); if (!stand) stand = D.spareStand;
      var sd = D.stands[stand], hl = this.holdsFor({ stand: stand }, s.rwy), hp = hl[s.inter && f.wake !== 'H' ? 1 : 0], h = D.holds[hp];
      var r = this.aiRoute(sd.lane, h.node, true);
      ac = this.mk({ f: f, kind: 'dep', st: 'taxi', rwy: s.rwy, stand: stand, hp: hp, inter: hp !== hl[0], owner: 'gnd', taxiT: this.t });
      this.place(ac, sd.lane, this.flow.pushDu, 0); this.setPath(ac, r.nodes, this.autoHolds(r.nodes));
      if (PD) { ac.dest = PD.ap[0]; ac.gate = PD.gate; } else { var dg = this.rng.pick(D.gateDest[this.rng.pick(Object.keys(D.gateDest))]); ac.dest = dg[0]; }
      this.standBusy[stand] = 0;
    }
    return ac;
  };
  TwrSim.prototype.onNode = function () { };
  TwrSim.prototype.onPathEvt = function (a, r) {
    var N = D.gN, node = N[a.node], e;
    if (a.st === 'taxi' && r === 'hs') {
      a.st = 'athold'; a.holdKind = 'cross'; a.holdRw = a.hs[a.node]; a.owner = 'me'; a.reqT = this.t;
      var end = this.endOf(a.holdRw); this.say(a, D.freq.TWR.n + ', ' + ATC.csSay(a) + ', holding short runway ' + end + ' at ' + ATC.twySay([node.hold]) + ', request crossing.'); a.waiting = 'cross'; return;
    }
    if (a.st === 'taxi' && r === 'end') {
      if (node.hold) { a.st = 'athold'; a.holdKind = 'dep'; a.owner = 'me'; a.readyT = this.t; this.say(a, D.freq.TWR.n + ', ' + ATC.csSay(a) + ', holding point ' + ATC.twySay([node.hold]) + ', runway ' + a.rwy + ', ready for departure.'); a.waiting = 'dep'; }
      else if (node.stand) { this.park(a); }
      return;
    }
    if (a.st === 'lineup' && r === 'end') { e = D.ends[a.rwy]; a.st = 'linedup'; a.du = e.du; a.dv = e.dv; a.linedT = this.t; if (!a.cto) a.waiting = 'cto'; return; }
    if (a.st === 'vacate' && r === 'end') {
      a.st = 'reqtaxi'; a.vacT = this.t; a.owner = 'me';
      if (a.rto) { this.say(a, ATC.csSay(a) + ', runway vacated, request taxi back to stand.', { kind: 'warn' }); }
      else this.say(a, ATC.csSay(a) + ', runway vacated via ' + ATC.twySay([a.exit]) + '.');
      a.waiting = 'gnd';
    }
  };
  TwrSim.prototype.endOf = function (rwId) { return this.flow.use[rwId]; };
  TwrSim.prototype.onFinalEvt = function (a, r) {
    var e = D.ends[a.rwy], busy;
    if (r === 'short') {
      if (this.rwClosed[e.rw] > this.t) { this.inc('ga_forced', [a], ATC.T('{0}: 폐쇄 중인 활주로로 접근해 복행했습니다(미리 복행을 지시해야 합니다).', a.cs)); this.goAround(a, 'runway closed'); return; }
      if (!a.clr) { this.inc('ga_noclr', [a], ATC.T('{0}: 0.5NM까지 착륙 허가가 없어 스스로 복행했습니다.', a.cs)); this.goAround(a, 'no landing clearance'); return; }
      busy = this.rwyBusy(e.rw, a) || this.crossTraffic(e.rw, a);
      if (busy) { if (a.emg) { this.inc('emg_late', [a], ATC.T('{0} (비상기): 활주로에 {1}가 있어 복행했습니다.', a.cs, busy.cs)); } else this.inc('ga_forced', [a], ATC.T('{0}: 활주로에 {1}가 있어 복행했습니다.', a.cs, busy.cs)); this.goAround(a, 'runway occupied'); }
      return;
    }
    if (r === 'td') {
      busy = this.rwyBusy(e.rw, a) || this.crossTraffic(e.rw, a);
      if (busy) this.inc('rwysep', [a, busy], ATC.T('{0} 착륙 순간 활주로에 {1}가 있었습니다.', a.cs, busy.cs));
      this.touchdown(a); a.waiting = null;
      if (a.emg) { a.stopHold = this.t + 85; this.inc('emg_ok', [a], ATC.T('{0} 비상기를 지체 없이 착륙시켰습니다.', a.cs)); this.say(a, ATC.csSay(a) + ', stopping on the runway, request fire service inspection.', { kind: 'emg' }); }
    }
  };
  TwrSim.prototype.onLift = function (a) { a.waiting = null; };
  TwrSim.prototype.onAirOut = function (a) {
    if (a.goAround) { if (a.owner === 'me') this.inc('noho', [a], ATC.T('{0}: 복행기를 접근관제로 넘기지 않았습니다.', a.cs)); this.sched.push({ t: this.t + 150, kind: 'arr', rwy: a.rwy, f: { cs: a.cs, csWord: a.csWord, num: a.num, al: a.al, type: a.type, wake: a.wake, perf: a.perf }, stand: a.stand, re: true, emg: a.emg, emgName: a.emgName }); this.sched.sort(function (x, y) { return x.t - y.t; }); this.remove(a, false); return; }
    if (a.owner === 'me') this.inc('noho', [a], ATC.T('{0}: 이륙기를 출발관제(Departure)로 넘기지 않았습니다.', a.cs));
    this.remove(a, true);
  };
  TwrSim.prototype.command = function (ac, cmds, o) {
    if (!ac || ac.gone) return false;
    if (ac.owner !== 'me') { this.sys(ATC.T('{0}: 지금은 {1} 주파수에 있습니다.', ac.cs, (ac.owner === 'gnd' ? ATC.T('지상관제') : ATC.T('다른 관제석'))), 'warn'); return false; }
    return ATC.Sim.prototype.command.call(this, ac, cmds, o);
  };
  TwrSim.prototype.validate = function (ac, cmds) {
    for (var i = 0; i < cmds.length; i++) {
      var c = cmds[i], e, rw, arr, busy;
      if (c.k === 'luaw' || c.k === 'cto' || c.k === 'cross' || c.k === 'ctl') {
        rw = c.k === 'cross' ? ac.holdRw : D.ends[c.rwy || ac.rwy].rw;
        if (this.rwClosed[rw] > this.t) { this.inc('rwyclosed', [ac], ATC.T('{0}: 점검으로 폐쇄 중인 활주로를 쓰라고 지시했습니다.', ac.cs)); return { refuse: 'runway is closed for inspection' }; }
      }
      if (c.k === 'luaw' || c.k === 'cto' && ac.st === 'athold') {
        rw = D.ends[ac.rwy].rw; arr = this.nextArr(rw);
        if (arr && arr.d < 1.3 * NM) { this.inc('incursion', [ac, arr], ATC.T('{0}에게 활주로 진입을 지시했지만 {1}가 {2}NM 최종 접근 중입니다.', ac.cs, arr.cs, (arr.d / NM).toFixed(1))); return { refuse: 'traffic on short final' }; }
        busy = this.rwyBusy(rw, ac); if (busy && busy.st === 'land' && D.rwAlong(D.ends[busy.rwy], ac) > D.rwAlong(D.ends[busy.rwy], busy)) { this.inc('incursion', [ac, busy], ATC.T('{0}에게 활주로 진입을 지시했지만 {1}가 착륙 활주 중입니다.', ac.cs, busy.cs)); return { refuse: 'landing traffic on the runway' }; }
      }
      if (c.k === 'cto') {
        rw = D.ends[ac.rwy].rw; busy = this.rwyBusy(rw, ac);
        if (busy) { this.inc('rwysep', [ac, busy], ATC.T('{0} 이륙 허가 시점에 활주로에 {1}가 있습니다.', ac.cs, busy.cs)); return { refuse: 'runway is occupied' }; }
        busy = this.crossTraffic(rw, ac);
        if (busy) { this.inc('rwysep', [ac, busy], ATC.T('{0} 이륙 허가 시점에 교차하는 활주로 {1}의 {2}가 아직 교차 지점을 지나지 않았습니다.', ac.cs, busy.rwy, busy.cs)); return { refuse: 'traffic on crossing runway' }; }
        var gap = this.wakeGap(ac, rw);
        if (gap > 5) this.inc('wake', [ac], ATC.T('{0}: 앞선 {1} 출발기({2}) 뒤 후방난기류 간격이 {3}초 모자랍니다.', ac.cs, D.wakeName[this.lastDep[rw].wake], this.lastDep[rw].cs, Math.round(gap)));
      }
      if (c.k === 'cross') {
        rw = ac.holdRw; arr = this.nextArr(rw); busy = this.rwyBusy(rw, ac);
        var roll = busy && (busy.st === 'roll' || busy.st === 'land' || busy.st === 'linedup' && busy.cto);
        if ((arr && arr.d < 1.6 * NM) || roll) { this.inc('incursion', [ac].concat(arr && arr.d < 1.6 * NM ? [arr] : [busy]), ATC.T('{0}에게 활주로 횡단을 지시했지만 {1} 있습니다.', ac.cs, (roll ? ATC.T('{0}가 활주로에서 움직이고', busy.cs) : ATC.T('{0}가 {1}NM 최종 접근 중이고', arr.cs, (arr.d / NM).toFixed(1))))); return { refuse: roll ? 'traffic on the runway' : 'traffic on short final' }; }
      }
      if (c.k === 'ga' && ac.emg) return { refuse: 'unable to go around, hydraulic failure' };
    }
    return null;
  };
  TwrSim.prototype.apply = function (ac, c) {
    var h, e = D.ends[ac.rwy];
    switch (c.k) {
      case 'luaw': if (ac.st === 'athold') { h = D.holds[ac.hp]; ac.st = 'lineup'; this.setPath(ac, [h.node, h.rnode], {}); ac.waiting = null; } break;
      case 'cto':
        ac.cto = true; ac.ctoT = this.t; ac.waiting = null;
        if (ac.readyT && this.t - ac.readyT > 330 && !ac.delayHit) { ac.delayHit = true; this.inc('delay', [ac], ATC.T('{0}: 대기 지점에서 {1}분 기다렸습니다.', ac.cs, Math.round((this.t - ac.readyT) / 60))); }
        if (ac.st === 'athold') { h = D.holds[ac.hp]; ac.st = 'lineup'; this.setPath(ac, [h.node, h.rnode], {}); }
        break;
      case 'cancelto': if (ac.st === 'linedup' || ac.st === 'lineup') { ac.cto = false; ac.waiting = 'cto'; } break;
      case 'ctl': ac.clr = true; ac.waiting = null; break;
      case 'cont': ac.waiting = null; break;
      case 'minspd': ac.minSpd = true; break;
      case 'ga': if (ac.st === 'final') { this.goAround(ac, '', true); ac.waiting = 'gaho'; } break;
      case 'cross': if (ac.st === 'athold' && ac.holdKind === 'cross') { delete ac.hs[ac.node]; ac.st = 'taxi'; ac.crossing = true; ac.waiting = null; ac.owner = 'me'; ac.crossT = this.t; } break;
      case 'ho':
        if (c.to === 'GND') { if (ac.st === 'reqtaxi') this.toGround(ac); }
        else { ac.owner = 'out'; ac.waiting = null; }
        break;
    }
  };
  /* 지상관제(자동)로 넘어간 뒤: 주기장까지 표준 경로 */
  TwrSim.prototype.toGround = function (ac) {
    var sd = D.stands[ac.stand], r = this.aiRoute(ac.node, sd.node, true);
    ac.owner = 'gnd'; ac.st = 'taxi'; ac.waiting = null; ac.taxiT = this.t; this.setPath(ac, r.nodes, this.autoHolds(r.nodes));
  };
  TwrSim.prototype.fire = function (ev) {
    var self = this, a, c;
    if (ev.k === 'ga_pilot') { c = this.acs.filter(function (x) { return x.st === 'final' && x.d < 3 * NM && x.d > 1.6 * NM && !x.emg; }); if (!c.length) return false; a = c[0]; this.goAround(a, this.rng.pick(['unstable approach', 'wind shear'])); a.waiting = 'gaho'; this.sys(ATC.T('{0} 스스로 복행 — 접근관제(Approach)로 넘기세요.', a.cs), 'alert'); return true; }
    if (ev.k === 'rto') {
      c = this.acs.filter(function (x) { return x.st === 'roll' && x.alt <= 0 && x.spd > 28 && x.spd < 45; }); if (!c.length) return false; a = c[0];
      var e = D.ends[a.rwy], need = a.spd * a.spd / (2 * 2.3) + 120, ex = null;
      var xs = this.exitsFor(a); xs.forEach(function (n) { var h = D.holds[n]; if (!ex && D.rwAlong(e, D.gN[h.rnode]) - D.rwAlong(e, a) >= need) ex = h; }); if (!ex) ex = D.holds[xs[xs.length - 1]];
      a.st = 'land'; a.rto = true; a.exit = ex.name; a.exitS = D.rwAlong(e, D.gN[ex.rnode]); a.tdT = this.t - 10; a.dec = 2.3; a.cto = false; a.owner = 'me';
      this.say(a, ATC.csSay(a) + ', rejecting takeoff, engine warning.', { kind: 'emg', front: true }); this.sys(ATC.T('{0} 이륙 중단 — 활주로를 벗어날 때까지 그 활주로의 이착륙을 멈추세요.', a.cs), 'alert'); return true;
    }
    if (ev.k === 'bird') {
      c = this.acs.filter(function (x) { return x.st === 'air' && !x.goAround && x.alt < 1500 && x.alt > 200; }); if (!c.length) return false; a = c[0];
      var rw = D.ends[a.rwy].rw; this.rwClosed[rw] = this.t + 170; this.insp = { rw: rw, t0: this.t, t1: this.t + 170 };
      this.say(a, ATC.csSay(a) + ', bird strike on departure, continuing, suggest runway inspection.', { kind: 'emg', front: true });
      this.sys(ATC.T('활주로 {0} 점검 차량 진입 — 약 3분간 폐쇄. 이 활주로의 이륙·착륙·횡단을 멈추고 접근 중인 항공기는 복행시키세요.', this.endOf(rw)), 'alert'); return true;
    }
    if (ev.k === 'emg') {
      var rwy = this.arrRw[0]; if (this.finals(rwy).some(function (x) { return x.d > 6 * NM; })) return false;
      this.sched.push({ t: this.t, kind: 'arr', rwy: rwy, emg: 'mayday', emgName: ATC.T('유압 계통 고장') }); this.sched.sort(function (x, y) { return x.t - y.t; }); return true;
    }
    return false;
  };
  TwrSim.prototype.update = function (dt) {
    var i, a, self = this;
    while (this.sched.length && this.sched[0].t <= this.t) this.spawn(this.sched.shift());
    for (i = 0; i < this.events.length; i++) { var ev = this.events[i]; if (!ev.done && this.t >= ev.t) { if (this.fire(ev)) ev.done = true; else if (!this.sched.length && this.acs.length < 2) ev.done = true; } }
    if (this.insp && this.t >= this.insp.t1) { this.sys(ATC.T('활주로 {0} 점검 완료 — 사용 재개.', this.endOf(this.insp.rw)), 'good'); this.insp = null; }
    this.moveGround(dt);
    var acs = this.acs.slice();
    for (i = 0; i < acs.length; i++) {
      a = acs[i]; if (a.gone) continue;
      if (a.st === 'gate' && a.parked && this.t - a.parkT > 6) { this.standBusy[a.stand] = 0; this.remove(a, true); continue; }
      if (a.st === 'linedup' && a.cto && this.t - Math.max(a.linedT, a.ctoT) > 3) { a.st = 'roll'; a.rollT = this.t; }
      if (a.st === 'land' && a.stopHold) { if (this.t < a.stopHold) { a.spd = Math.max(0, a.spd - 3 * dt); if (a.spd <= 0) a.u -= 0; } else { a.stopHold = 0; a.spd = Math.max(a.spd, 12); this.sys(ATC.T('{0} 점검 완료 — 활주로를 벗어납니다.', a.cs), 'info'); } }
      if (a.crossing && !this.onRwy(a, a.holdRw) && this.t - a.crossT > 8) { a.crossing = false; a.owner = 'gnd'; }
      if (a.st === 'final' && !a.clr && !a.callFinal && a.d < 4 * NM) { a.callFinal = true; this.say(a, ATC.csSay(a) + ', 4 miles final runway ' + a.rwy + '.', { kind: 'warn' }); a.waiting = 'land'; }
      if (a.st === 'air' && a.owner === 'me' && !a.hoAsk && a.alt > 2200) { a.hoAsk = true; this.say(a, ATC.csSay(a) + (a.goAround ? ', runway heading, 3,000, request further instructions.' : ', passing ' + fmt.alt(Math.max(500, Math.round(a.alt / 100) * 100)) + ', request frequency change.'), { kind: 'warn' }); a.waiting = a.goAround ? 'gaho' : 'dep2'; }
      if (a.st === 'reqtaxi' && a.owner === 'me' && this.t - a.vacT > 35) { this.inc('noho', [a], ATC.T('{0}: 활주로를 벗어난 항공기를 지상관제로 넘기지 않아 유도로 입구를 막았습니다.', a.cs)); this.toGround(a); }
      if (a.st === 'athold' && a.holdKind === 'cross' && a.reqT && this.t - a.reqT > 300 && !a.crossLate) { a.crossLate = true; this.inc('delay', [a], ATC.T('{0}: 활주로 횡단 대기 5분 초과.', a.cs)); }
    }
  };
  TwrSim.prototype.isFinished = function () { return this.sched.length === 0 && this.acs.length === 0 && this.t > 30; };
  TwrSim.prototype.onStop = function () { };
  /* 지상 이동은 지상관제(자동) 책임 — 관제탑 채점에 넣지 않음 */
  TwrSim.prototype.gridlock = function (a, o) { var late = (a.taxiT || 0) > (o.taxiT || 0) ? a : o; this.sys(ATC.T('지상관제: {0} 견인 조치(유도로 정체).', late.cs), 'info'); this.total--; this.remove(late, false); };
  TwrSim.prototype.coach = function () {
    var out = [], self = this;
    this.acs.forEach(function (a) {
      if (a.owner !== 'me') return;
      var e = D.ends[a.rwy], rw = e.rw, arr = self.nextArr(rw), busy = self.rwyBusy(rw, a), closed = self.rwClosed[rw] > self.t;
      if (a.st === 'final') {
        if (closed) { out.push({ p: 9, ac: a.id, t: ATC.T('{0} — 활주로 폐쇄 중. 「복행(Go around)」을 지시하세요.', a.cs), c: [{ k: 'ga' }] }); return; }
        if (!a.clr) {
          if (busy && a.d < 2.2 * NM && busy.st !== 'roll') out.push({ p: 9, ac: a.id, t: ATC.T('{0} {1}NM — 활주로에 {2}. 비워지지 않으면 복행을 지시하세요.', a.cs, (a.d / NM).toFixed(1), busy.cs) });
          else if (a.d < 7 * NM) out.push({ p: a.d < 3 * NM ? 8 : 5, ac: a.id, t: ATC.T('{0} {1}NM — 활주로가 비면 「착륙 허가」(바람 정보 포함).', a.cs, (a.d / NM).toFixed(1)), c: [{ k: 'ctl', rwy: a.rwy }] });
        }
      } else if (a.st === 'athold' && a.holdKind === 'dep') {
        var gap = self.wakeGap(a, rw);
        if (closed) out.push({ p: 4, ac: a.id, t: ATC.T('{0} — 활주로 폐쇄 중, 대기.', a.cs) });
        else if (busy) out.push({ p: 4, ac: a.id, t: ATC.T('{0} — 활주로에 {1}, 벗어난 뒤 진입시키세요.', a.cs, busy.cs) });
        else if (self.crossTraffic(rw, a)) out.push({ p: 4, ac: a.id, t: ATC.T('{0} — 교차하는 활주로의 {1}가 교차 지점을 지난 뒤 이륙 허가.', a.cs, self.crossTraffic(rw, a).cs) });
        else if (arr && arr.d < 3.5 * NM) out.push({ p: 4, ac: a.id, t: ATC.T('{0} — 착륙기 {1} {2}NM. 착륙 뒤에 진입.', a.cs, arr.cs, (arr.d / NM).toFixed(1)) });
        else if (gap > 0) out.push({ p: 5, ac: a.id, t: ATC.T('{0} — 앞 출발기가 더 무거운 등급. 후방난기류 간격 {1}초 더 기다린 뒤 이륙 허가(먼저 line up은 가능).', a.cs, Math.ceil(gap)) });
        else out.push({ p: 7, ac: a.id, t: ATC.T('{0} — 활주로 비었음{1}. 「이륙 허가」.', a.cs, (arr ? ATC.T('(착륙기 {0}NM)', (arr.d / NM).toFixed(1)) : '')), c: [{ k: 'cto', rwy: a.rwy }] });
      } else if (a.st === 'linedup' && !a.cto) out.push({ p: 8, ac: a.id, t: ATC.T('{0} 활주로에 정렬해 대기 중 — 앞 항공기가 떠났으면 「이륙 허가」.', a.cs), c: [{ k: 'cto', rwy: a.rwy }] });
      else if (a.st === 'air') out.push({ p: 6, ac: a.id, t: a.cs + (a.goAround ? ATC.T(' 복행 — Approach로 이양.') : ATC.T(' 이륙 — Departure로 이양.')), c: [{ k: 'ho', to: a.goAround ? 'APP' : 'DEP' }] });
      else if (a.st === 'reqtaxi') out.push({ p: 7, ac: a.id, t: ATC.T('{0} 활주로 이탈 — Ground로 이양.', a.cs), c: [{ k: 'ho', to: 'GND' }] });
      else if (a.st === 'athold' && a.holdKind === 'cross') {
        var ar = self.nextArr(a.holdRw), bz = self.rwyBusy(a.holdRw, a);
        out.push({ p: 6, ac: a.id, t: ATC.T('{0} 횡단 요청 — {1}', a.cs, (bz ? ATC.T('활주로에 {0}, 대기.', bz.cs) : ar && ar.d < 3 * NM ? ATC.T('착륙기 {0}NM, 착륙 뒤 허가.', (ar.d / NM).toFixed(1)) : ATC.T('지금 「횡단 허가」 가능.'))) });
      }
    });
    out.sort(function (x, y) { return y.p - x.p; }); return out.slice(0, 4);
  };
  ATC.TwrSim = TwrSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
