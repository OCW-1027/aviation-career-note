/* AIRLINE SAGA — ATC 지상관제(GND, 램프 포함): 푸시백·지상 이동 경로·활주로 횡단 조정 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt, KT = ATC.KT, NM = ATC.NMm;

  function GndSim(o) {
    o = o || {}; o.mode = 'GND'; ATC.GroundSim.call(this, o);
    var L = this.level.id, rng = this.rng, F = this.flow, i, t;
    this.cfg = [null, { arr: 5, dep: 6, gap: 150, k: 0 }, { arr: 8, dep: 10, gap: 105, k: 2 }, { arr: 12, dep: 15, gap: 78, k: 4 }][L];
    this.arrRwy = F.arr; this.depRwy = F.dep; this.sched = [];
    t = 25; for (i = 0; i < this.cfg.arr; i++) { this.sched.push({ t: t, kind: 'arr' }); t += Math.max(125, this.cfg.gap * 1.25 * (0.75 + rng() * 0.5)); }
    t = 6; for (i = 0; i < this.cfg.dep; i++) { this.sched.push({ t: t, kind: 'dep' }); t += this.cfg.gap * (0.7 + rng() * 0.6); }
    for (i = 0; i < this.cfg.k; i++) this.sched.push({ t: 90 + rng() * (t - 150), kind: i % 2 ? 'arr' : 'dep', cargo: true });
    this.sched.sort(function (a, b) { return a.t - b.t; });
    this.endT = this.sched[this.sched.length - 1].t;
    var pool = L === 2 ? ['closure', 'tech', 'medical'] : L === 3 ? ['closure', 'tech', 'medical'] : [], n = this.level.events;
    while (n-- > 0 && pool.length) { var k = pool.splice(rng.int(0, pool.length - 1), 1)[0]; this.events.push({ k: k, t: this.endT * (0.2 + 0.5 * rng()), done: false }); }
    this.multi = !!D.planFlight;     /* 편마다 방면에 따라 활주로가 달라지는 공항 */
    this.sys(ATC.T('{apt} 지상관제({0}) 근무 시작. 출발 활주로 {1}, 도착 활주로 {2}. 표준 흐름: {3}.', D.freq.GND.fq, this.multi ? F.deps.join(' · ') : F.dep, this.multi ? F.arrs.join(' · ') : F.arr, F.taxiNote));
  }
  ATC.extend(GndSim, ATC.GroundSim);

  GndSim.prototype.spawn = function (s) {
    var self = this, f = s.f || this.mkFlight(s.cargo ? function (a) { return a.cargo; } : function (a) { return !a.cargo; }), ac;
    var P = s.P || (this.multi ? this.plan(f, s.kind, s.rwy) : null);
    function later(dt) { s.t = self.t + dt; s.f = f; s.P = P; self.sched.push(s); self.sched.sort(function (a, b) { return a.t - b.t; }); }
    if (s.kind === 'arr') {
      var arw = P ? P.rwy : this.arrRwy, prev = this.finals(arw), last = prev[prev.length - 1];
      if (last && last.d > 6.2 * NM) return later(20);
      var st = P ? P.stand : this.pickStand(f); if (!st) { s.P = P = null; return later(40); }
      ac = this.spawnFinal(arw, { f: f, dNM: 9, stand: st, owner: 'twr', clr: true }); ac.clr = true; if (s.re) this.total--;
      if (P) ac.orig = P.ap[0];
    } else {
      var stand = P ? P.stand : this.pickStand(f); if (!stand) { s.P = P = null; return later(40); }
      ac = this.mk({ f: f, kind: 'dep', st: 'gate', rwy: P ? P.rwy : this.depRwy, stand: stand, owner: 'me' });
      var d = this.standDir(stand); this.place(ac, D.stands[stand].node, d[0], d[1]);
      if (P) { ac.dest = P.ap[0]; ac.gate = P.gate; } else { var dg = this.rng.pick(D.gateDest[this.rng.pick(Object.keys(D.gateDest))]); ac.dest = dg[0]; }
      ac.callT = this.t + 8 + this.rng() * 20;
    }
    return ac;
  };
  GndSim.prototype.callGround = function (a) {
    if (a.kind === 'dep') { this.say(a, D.freq.GND.n + ', ' + ATC.csSay(a) + ', stand ' + a.stand + ', information ' + ATC.phon(this.atis) + ', request pushback.'); a.waiting = 'push'; a.reqT = this.t; a.st = 'reqpush'; }
  };
  GndSim.prototype.onNode = function (a) {
    /* 다음 구간이 폐쇄됐으면 멈추고 새 경로 요청 */
    if (a.st !== 'taxi' || a.pi >= a.path.length) return;
    var n = D.gN[a.node], nx = a.path[a.pi], i;
    for (i = 0; i < n.adj.length; i++) if (n.adj[i].to === nx && this.net.closed[n.adj[i].e.i]) {
      a.st = 'reqtaxi'; a.spd = 0; a.reroute = true; a.waiting = 'taxi'; a.reqT = this.t;
      this.say(a, ATC.csSay(a) + ', taxiway ' + ATC.twySay([n.adj[i].e.name]) + ' closed ahead, request alternative routing.', { kind: 'warn' });
    }
  };
  GndSim.prototype.onPathEvt = function (a, r) {
    var node = D.gN[a.node], e;
    if (a.st === 'push' && r === 'end') { a.st = 'start'; a.startT = this.t + 30; var fd = this.faceDir(a.face); a.du = fd[0]; a.dv = fd[1]; this.standBusy[a.stand] = 0; return; }
    if (a.st === 'taxi' && r === 'hs') {
      a.st = 'athold'; a.holdKind = 'cross'; a.holdRw = a.hs[a.node]; a.reqT = this.t; a.waiting = 'cross';
      this.say(a, ATC.csSay(a) + ', holding short runway ' + this.flow.use[a.holdRw] + ' at ' + ATC.twySay([node.hold]) + '.'); return;
    }
    if (a.st === 'taxi' && r === 'end') {
      if (node.hold) { a.st = 'athold'; a.holdKind = 'dep'; a.readyT = this.t; a.waiting = 'twr'; this.say(a, ATC.csSay(a) + ', approaching holding point ' + ATC.twySay([node.hold]) + '.'); this.taxiScore(a); }
      else if (node.stand) { this.park(a); this.taxiScore(a); if (a.emg) { if (this.t <= a.emgDue) this.inc('emg_ok', [a], ATC.T('{0} (응급 환자) 를 우선 주기장까지 이동시켰습니다.', a.cs)); else this.inc('emg_late', [a], ATC.T('{0} (응급 환자) 주기장 도착이 {1}분 늦었습니다.', a.cs, Math.round((this.t - a.emgDue) / 60 + 0.5))); } }
      return;
    }
    if (a.st === 'lineup' && r === 'end') { e = D.ends[a.rwy]; a.st = 'roll'; a.du = e.du; a.dv = e.dv; return; }
    if (a.st === 'vacate' && r === 'end') {
      a.st = 'reqtaxi'; a.vacT = this.t; a.owner = 'me'; a.reqT = this.t; a.waiting = 'taxi';
      this.say(a, D.freq.GND.n + ', ' + ATC.csSay(a) + ', vacated runway ' + a.rwy + ' via ' + ATC.twySay([a.exit]) + ', stand ' + a.stand + '.');
    }
  };
  GndSim.prototype.taxiScore = function (a) {
    if (!a.taxiT || !a.nomT) return;
    var over = (this.t - a.taxiT) - a.nomT;
    if (over > 150) this.inc('delay', [a], ATC.T('{0}: 지상 이동이 표준보다 {1}분 더 걸렸습니다.', a.cs, Math.round(over / 60)));
  };
  GndSim.prototype.onFinalEvt = function (a, r) {
    var e = D.ends[a.rwy], busy;
    if (r === 'short') { busy = this.rwyBusy(e.rw, a); if (busy) { this.inc('ga_forced', [a, busy], ATC.T('{0}: 활주로에 {1}가 있어 복행했습니다({2}).', a.cs, busy.cs, (busy.st === 'taxi' ? ATC.T('횡단 지연') : ATC.T('유도로 입구 막힘')))); this.goAround(a, 'runway occupied', true); this.sys(ATC.T('타워: {0} 복행.', a.cs), 'warn'); } }
    else if (r === 'td') { busy = this.rwyBusy(e.rw, a); if (busy) this.inc('rwysep', [a, busy], ATC.T('{0} 착륙 순간 활주로에 {1}가 있었습니다.', a.cs, busy.cs)); this.touchdown(a); }
  };
  GndSim.prototype.onAirOut = function (a) {
    if (a.goAround) { this.sched.push({ t: this.t + 140, kind: 'arr', f: { cs: a.cs, csWord: a.csWord, num: a.num, al: a.al, type: a.type, wake: a.wake, perf: a.perf }, re: true }); this.standBusy[a.stand] = 0; this.sched.sort(function (x, y) { return x.t - y.t; }); this.remove(a, false); return; }
    this.remove(a, true);
  };
  GndSim.prototype.onStop = function (a, o) { this.inc('stop', [a, o], ATC.T('{0}가 {1} 때문에 스스로 멈췄습니다({2}).', a.cs, o.cs, (o.st === 'push' || o.st === 'start' ? ATC.T('푸시백 구역 통과') : o.st === 'gate' ? ATC.T('주기장이 아직 비지 않음') : ATC.T('경로 교차')))); };
  /* 경로 후보: 표준 흐름을 우선으로 최대 3개 */
  GndSim.prototype.routeOptions = function (ac, target) {
    var to = target.stand ? D.stands[target.stand].node : D.holds[target.hp].node, from = ac.node, self = this;
    if (ac.st === 'gate' || ac.st === 'reqpush') from = D.stands[ac.stand].lane;
    var rs = this.net.routes(from, to, { pen: ATC.flowPen(this.flow.id, false), rwyOk: true }, 3);
    rs.forEach(function (r) { r.cross = self.needsCross(r.nodes); r.time = r.len / 8.5 + 20; });
    return rs;
  };
  GndSim.prototype.command = function (ac, cmds, o) {
    if (!ac || ac.gone) return false;
    if (ac.owner !== 'me') { this.sys(ATC.T('{0}: 지금은 타워 주파수에 있습니다.', ac.cs), 'warn'); return false; }
    return ATC.Sim.prototype.command.call(this, ac, cmds, o);
  };
  GndSim.prototype.validate = function (ac, cmds) {
    for (var i = 0; i < cmds.length; i++) {
      var c = cmds[i];
      if (c.k === 'taxi' && c.hp) {
        var drw = ac.rwy || this.depRwy, hl = this.holdsFor(ac, drw), ok = hl.indexOf(c.hp) >= 0;
        if (!ok) { this.inc('wrongrwy', [ac], ATC.T('{0}: 출발 활주로는 {1}인데 대기 지점 {2}(으)로 보냈습니다.', ac.cs, drw, c.hp)); return { refuse: this.multi ? 'confirm runway, our departure runway is ' + drw : 'confirm runway, ATIS says departures runway ' + drw }; }
        if (c.hp !== hl[0] && ac.wake === 'H') return { refuse: 'require full length for departure' };
      }
      if (c.k === 'taxi' && c.stand && c.stand !== ac.stand && !ac.tech) return { refuse: 'our assigned stand is ' + ac.stand };
      if (c.k === 'cross') {
        var rw = ac.holdRw, arr = this.nextArr(rw), busy = this.rwyBusy(rw, ac);
        if ((arr && arr.d < 1.8 * NM) || (busy && busy.st !== 'vacate')) { this.inc('incursion', [ac].concat(arr && arr.d < 1.8 * NM ? [arr] : [busy]), ATC.T('{0}에게 활주로 횡단을 지시했지만 {1}', ac.cs, (busy && busy.st !== 'vacate' ? ATC.T('{0}가 활주로에 있습니다.', busy.cs) : ATC.T('{0}가 {1}NM 최종 접근 중입니다.', arr.cs, (arr.d / NM).toFixed(1))))); return { refuse: 'traffic on the runway' }; }
      }
      if (c.k === 'ho' && c.to === 'TWR' && !(ac.st === 'athold' && ac.holdKind === 'dep') && !(ac.st === 'taxi' && ac.kind === 'dep')) return { refuse: 'not yet at the holding point' };
    }
    return null;
  };
  GndSim.prototype.apply = function (ac, c) {
    var sd = D.stands[ac.stand];
    switch (c.k) {
      case 'push':
        if (ac.st === 'reqpush' || ac.st === 'gate') {
          if (ac.reqT && this.t - ac.reqT > 240 && !ac.pushLate) { ac.pushLate = true; this.inc('delay', [ac], ATC.T('{0}: 푸시백 요청 뒤 {1}분 대기.', ac.cs, Math.round((this.t - ac.reqT) / 60))); }
          ac.st = 'push'; ac.face = c.face || (this.multi && sd.faceRec) || this.flow.push; ac.node = sd.node; this.setPath(ac, [sd.node, sd.lane], {}); ac.waiting = null; ac.reqT = null;
        } break;
      case 'pushhold': ac.waiting = 'push'; break;
      case 'taxi':
        if (c.nodes) {
          ac.st = 'taxi'; ac.halt = false; ac.waiting = null; ac.reqT = null; ac.hp = c.hp || null; ac.inter = c.hp && c.hp !== this.holdsFor(ac, ac.rwy || this.depRwy)[0];
          if (!ac.taxiT || ac.reroute) { ac.taxiT = ac.taxiT || this.t; ac.nomT = (ac.nomT || 0) + c.len / 8.5 + 45; }
          ac.reroute = false; this.setPath(ac, c.nodes, this.autoHolds(c.nodes));
          if (ac.tech && c.stand) { ac.techBack = true; }
        } break;
      case 'holdpos': ac.halt = true; break;
      case 'conttaxi': ac.halt = false; break;
      case 'cross': if (ac.st === 'athold' && ac.holdKind === 'cross') { delete ac.hs[ac.node]; ac.st = 'taxi'; ac.crossing = true; ac.crossT = this.t; ac.waiting = null; } break;
      case 'ho': if (c.to === 'TWR') { ac.owner = 'twr'; ac.waiting = null; ac.hoT = this.t; if (ac.readyT && this.t - ac.readyT > 90) this.inc('noho', [ac], ATC.T('{0}: 대기 지점에 도착하고도 타워 이양이 늦었습니다.', ac.cs)); } break;
    }
  };
  /* 타워(자동): 출발 활주로에서 순서대로 이륙시킴 */
  GndSim.prototype.aiTower = function () {
    var self = this, ends = this.multi ? this.flow.deps : [this.depRwy];
    ends.forEach(function (end) {
      var rw = D.ends[end].rw;
      if (self.rwyBusy(rw)) return;
      var q = self.acs.filter(function (a) { return a.owner === 'twr' && a.st === 'athold' && a.holdKind === 'dep' && (a.rwy || self.depRwy) === end; }).sort(function (a, b) { return a.hoT - b.hoT; });
      if (!q.length) return;
      var a = q[0], ld = self.lastDep[rw];
      if (ld && self.t - ld.t < 55) return;
      if (self.wakeGap(a, rw) > 0) return;
      self.lastLineOn = self.lastLineOn || {};
      if (self.lastLineOn[rw] && self.t - self.lastLineOn[rw] < 45) return;
      if (self.multi) {
        var na = self.nextArr(rw), X = D.rwX[rw] || {}, near = false;
        Object.keys(X).forEach(function (o) { if (X[o].kind !== 'cross') return; var f = self.nextArr(o); if (f && f.d < 3.2 * NM) near = true; });   /* 교차 활주로에 곧 착륙할 항공기 */
        if (na && na.d < 4.2 * NM || near || self.crossTraffic(rw, a)) return;
      }   /* 같은 활주로의 착륙기 · 교차하거나 경로가 만나는 활주로의 항공기 */
      var h = D.holds[a.hp]; a.st = 'lineup'; a.cto = true; self.setPath(a, [h.node, h.rnode], {}); self.lastLineOn[rw] = self.t;
      self.sys(ATC.T('타워: {0} 이륙 허가 ({1}).', a.cs, end), 'info');
    });
  };
  /* 같은 이름의 유도로를 따라 두 마디 사이에 있는 구간들 */
  GndSim.prototype.edgesAlong = function (name, a, b) {
    var prev = {}, pe = {}, q = [a], seen = {}, c; seen[a] = 1;
    while (q.length) { c = q.shift(); if (c === b) break; D.gN[c].adj.forEach(function (x) { if (x.e.name === name && !seen[x.to]) { seen[x.to] = 1; prev[x.to] = c; pe[x.to] = x.e.i; q.push(x.to); } }); }
    var out = []; if (!seen[b]) return out; for (c = b; c !== a; c = prev[c]) out.push(pe[c]); return out;
  };
  GndSim.prototype.fire = function (ev) {
    var self = this, a, c, rng = this.rng;
    if (ev.k === 'closure') {
      var seg = rng.pick(this.flow.closures);
      var ids = [], i; for (i = 1; i + 3 < seg.length; i += 2) this.edgesAlong(seg[0], D.nodeId(seg[i], seg[i + 1]), D.nodeId(seg[i + 2], seg[i + 3])).forEach(function (id) { ids.push(id); });
      /* 그 구간 위에 항공기가 있으면 다음에 */
      var on = this.acs.some(function (x) { return self.onGround(x) && x.st !== 'gate' && ids.some(function (id) { var e = D.gE[id], A = D.gN[e.a], B = D.gN[e.b]; return x.u >= Math.min(A.u, B.u) - 20 && x.u <= Math.max(A.u, B.u) + 20 && x.v >= Math.min(A.v, B.v) - 20 && x.v <= Math.max(A.v, B.v) + 20; }); });
      if (on) return false;
      ids.forEach(function (id) { self.net.closed[id] = 1; }); this.closure = { name: seg[0], ids: ids, t1: this.t + 330 };
      this.sys(ATC.T('유도로 {0} 일부 폐쇄(이물질 제거 작업 · 약 5분). 붉은 구간을 피해 경로를 주세요.', seg[0]), 'alert'); return true;
    }
    if (ev.k === 'tech') { c = this.acs.filter(function (x) { return x.kind === 'dep' && x.st === 'start'; }); if (!c.length) return false; a = c[0]; a.tech = true; return true; }
    if (ev.k === 'medical') {
      c = this.acs.filter(function (x) { return x.kind === 'arr' && (x.st === 'final' && x.d < 4 * NM || x.st === 'land'); }); if (!c.length) return false; a = c[0]; a.emg = 'medical'; a.emgName = ATC.T('응급 환자');
      this.sys(ATC.T('타워 통보: {0} 기내 응급 환자 — 착륙 뒤 주기장 {1}까지 최우선으로 이동시키세요(구급차 대기).', a.cs, a.stand), 'alert'); return true;
    }
    return false;
  };
  GndSim.prototype.update = function (dt) {
    var i, a, self = this;
    while (this.sched.length && this.sched[0].t <= this.t) this.spawn(this.sched.shift());
    for (i = 0; i < this.events.length; i++) { var ev = this.events[i]; if (!ev.done && this.t >= ev.t) { if (this.fire(ev)) ev.done = true; else if (!this.sched.length && this.acs.length < 2) ev.done = true; } }
    if (this.closure && this.t >= this.closure.t1) { this.closure.ids.forEach(function (id) { delete self.net.closed[id]; }); this.sys(ATC.T('유도로 {0} 폐쇄 해제.', this.closure.name), 'good'); this.closure = null; }
    this.moveGround(dt); this.aiTower();
    var acs = this.acs.slice();
    for (i = 0; i < acs.length; i++) {
      a = acs[i]; if (a.gone) continue;
      if (a.st === 'gate' && a.kind === 'dep' && !a.parked && this.t >= a.callT) this.callGround(a);
      if (a.st === 'gate' && a.parked && this.t - a.parkT > 8) { this.standBusy[a.stand] = 0; this.remove(a, true); continue; }
      if (a.st === 'start' && this.t >= a.startT) {
        a.st = 'reqtaxi'; a.reqT = this.t; a.waiting = 'taxi';
        if (a.tech) { this.say(a, ATC.csSay(a) + ', we have a technical problem, request return to stand ' + a.stand + '.', { kind: 'emg' }); this.sys(ATC.T('{0} 기체 이상 — 주기장 {1}(으)로 되돌리는 경로를 주세요.', a.cs, a.stand), 'alert'); this.standBusy[a.stand] = 1; }
        else this.say(a, ATC.csSay(a) + ', request taxi.');
      }
      if (a.crossing && !this.onRwy(a, a.holdRw) && this.t - a.crossT > 8) a.crossing = false;
      if (a.st === 'reqtaxi' && a.kind === 'arr' && a.emg && !a.emgDue) { a.emgDue = this.t + 0; var r = this.net.route(a.node, D.stands[a.stand].node, { rwyOk: true }); a.emgDue = this.t + (r ? r.len / 8.5 : 200) + 75; this.say(a, ATC.csSay(a) + ', medical emergency on board, request priority taxi.', { kind: 'emg' }); }
      if (a.reqT && (a.waiting === 'taxi' || a.waiting === 'push') && this.t - a.reqT > 200 && !a.reqLate) { a.reqLate = true; this.inc('reqlate', [a], ATC.T('{0}: 요청에 3분 넘게 답하지 않았습니다.', a.cs)); }
      if (a.st === 'athold' && a.holdKind === 'dep' && a.owner === 'me' && this.t - a.readyT > 150 && !a.twrLate) { a.twrLate = true; this.inc('noho', [a], ATC.T('{0}: 대기 지점에서 타워 이양을 받지 못하고 기다렸습니다.', a.cs)); }
    }
  };
  GndSim.prototype.isFinished = function () { return this.sched.length === 0 && this.acs.length === 0 && this.t > 30; };
  GndSim.prototype.coach = function () {
    var out = [], self = this, F = this.flow;
    this.acs.forEach(function (a) {
      if (a.owner !== 'me') return;
      if (a.st === 'reqpush') {
        var lane = D.gN[D.stands[a.stand].lane], near = self.acs.filter(function (o) { return o !== a && self.onGround(o) && o.st !== 'gate' && Math.hypot(o.u - lane.u, o.v - lane.v) < 260; });
        out.push({ p: near.length ? 4 : 6, ac: a.id, t: ATC.T('{0} 푸시백 요청(주기장 {1}) — {2}', a.cs, a.stand, (near.length ? ATC.T('{0}가 뒤쪽 유도로를 지나는 중. 지나간 뒤 허가.', near[0].cs) : ATC.T('뒤쪽 유도로가 비었으면 「푸시백 허가」.'))) });
      } else if (a.st === 'reqtaxi') {
        var tg = a.kind === 'dep' && !a.tech ? { hp: self.holdsFor(a, a.rwy || self.depRwy)[0] } : { stand: a.stand }, rs = self.routeOptions(a, tg);
        out.push({ p: a.emg ? 9 : 7, ac: a.id, t: a.cs + (a.kind === 'dep' && !a.tech ? ATC.T(' 지상 이동 요청 — 대기 지점 {0} (추천 경로: ', tg.hp) : ATC.T(' → 주기장 {0} (추천 경로: ', a.stand)) + (rs[0] ? rs[0].via.join(' → ') : '-') + ')' + (rs[0] && rs[0].cross ? ATC.T(' · 활주로 횡단 전 정지') : '') + '.' });
      } else if (a.st === 'athold' && a.holdKind === 'dep') out.push({ p: 8, ac: a.id, t: ATC.T('{0} 대기 지점 도착 — Tower({1})로 이양.', a.cs, D.freq.TWR.fq), c: [{ k: 'ho', to: 'TWR' }] });
      else if (a.st === 'athold' && a.holdKind === 'cross') {
        var ar = self.nextArr(a.holdRw), bz = self.rwyBusy(a.holdRw, a);
        out.push({ p: 6, ac: a.id, t: ATC.T('{0} 활주로 앞 정지 — {1}', a.cs, (bz ? ATC.T('활주로에 {0}, 대기.', bz.cs) : ar && ar.d < 3.2 * NM ? ATC.T('착륙기 {0} {1}NM, 착륙 뒤 횡단.', ar.cs, (ar.d / NM).toFixed(1)) : ATC.T('착륙기 여유 있음 — 「횡단 허가」.'))) });
      } else if (a.st === 'taxi' && a.blk) { var o = self.byId(a.blk); if (o && a.spd < 0.5) out.push({ p: 5, ac: a.id, t: ATC.T('{0}가 {1} 앞에서 멈춤 — 한쪽을 「정지」시켜 순서를 정해 주세요.', a.cs, o.cs) }); }
    });
    out.sort(function (x, y) { return y.p - x.p; }); return out.slice(0, 4);
  };
  ATC.GndSim = GndSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
