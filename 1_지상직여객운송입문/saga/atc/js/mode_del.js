/* AIRLINE SAGA — ATC 비행허가(DEL): 비행계획 확인 → 관제 허가 → 복창 확인 → 지상관제 이양 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;

  function DelSim(o) {
    o = o || {}; o.mode = 'DEL'; ATC.Sim.call(this, o);
    var L = this.level.id, rng = this.rng, i, t = 5, self = this;
    this.rbErrMul = 3;
    this.cfg = ATC.scnCfg(o, [null, { n: 6, gap: 62 }, { n: 10, gap: 52 }, { n: 14, gap: 44 }][L]);
    this.depRwy = this.flow.dep; this.sched = []; this.multi = !!D.depRwyFor;
    var anom = o.scn && o.scn.anom ? o.scn.anom.slice() : L === 1 ? [] : L === 2 ? ['atis', 'atis', 'fl', 'ctot', 'ctot'] : ['atis', 'atis', 'fl', 'fl', 'ctot', 'ctot', 'ctot', 'nofpl'];
    var slots = []; for (i = 1; i < this.cfg.n; i++) slots.push(i);
    var am = {}; anom.forEach(function (a) { if (!slots.length) return; var ix = slots.splice(rng.int(0, slots.length - 1), 1)[0]; am[ix] = a; });
    for (i = 0; i < this.cfg.n; i++) { this.sched.push({ t: t, anom: am[i] || null }); t += this.cfg.gap * (0.7 + rng() * 0.6); }
    this.endT = t;
    if (L >= 2) this.events.push({ k: 'atis', t: this.endT * 0.3, done: false });
    if (L === 3) this.events.push({ k: 'rwychg', t: this.endT * 0.55, done: false });
    this.scnEvents();
    this.sys(ATC.T(D.sidInitGame ? '{apt} 비행허가(Delivery {0}) 근무 시작. 출발 활주로 {1} · 현재 ATIS {2} · QNH {3} · 초기 허가 고도 {4}ft(이 게임의 값).' : '{apt} 비행허가(Delivery {0}) 근무 시작. 출발 활주로 {1} · 현재 ATIS {2} · QNH {3} · SID 초기 고도 {4}ft.', D.freq.DEL.fq, this.multi ? this.flow.deps.join(' · ') : this.depRwy, this.atis, this.qnh, fmt.alt(D.sidInit)));
  }
  ATC.extend(DelSim, ATC.Sim);
  /* SID 이름: 세이라는 「출구 지점 + 1 + 활주로 방향 글자」, 다른 공항은 묶음이 정함(D.sidName · D.sidNames) */
  DelSim.prototype.sidFor = function (gate) { return D.sidName ? D.sidName(gate, this.flow) : gate + ' 1' + this.flow.sfx; };
  DelSim.prototype.sidList = function () { if (D.sidNames) return D.sidNames(); var o = []; Object.keys(D.gateDest).forEach(function (g) { o.push(g + ' 1A'); o.push(g + ' 1B'); }); return o; };
  DelSim.prototype.rwyOf = function (ac) { return D.depRwyFor ? D.depRwyFor(this.flow, ac.gate) : this.depRwy; };
  DelSim.prototype.parityOk = function (ac, fl) { return ((Math.round(fl / 1000) % 2) === 1) === D.gateEast[ac.gate]; };
  DelSim.prototype.spawn = function (s) {
    var rng = this.rng, f = this.mkFlight(), PF = D.planFlight ? D.planFlight(this, f, 'dep') : null;
    var gate = PF ? PF.gate : rng.pick(Object.keys(D.gateDest)), dg = PF ? PF.ap : rng.pick(D.gateDest[gate]), east = D.gateEast[gate], jet = f.perf.k === 'jet';
    var rfl = (jet ? rng.pick(east ? [330, 350, 370, 390] : [320, 340, 360, 380]) : rng.pick(east ? [210, 230] : [220, 240])) * 100;
    if (rfl > f.perf.ceil) rfl -= 2000;
    var stands = Object.keys(D.stands).filter(function (x) { return (PF ? PF.grp : f.al.cargo ? D.standGroups.cargo : D.standGroups.pax).indexOf(D.stands[x].grp) >= 0; });
    var ac = { id: this.nextId++, sim: this, cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf, kind: 'dep', gate: gate, dest: dg[0], destName: dg[1], rfl: rfl, rflFiled: rfl,
      stand: rng.pick(stands), squawk: this.squawk(), eobt: this.utc() + 600 + rng.int(0, 8) * 60, st: 'req', atisRep: this.atis, owner: 'me', alt: 0, hdg: 0, ias: 0, born: this.t, reqT: this.t, route: PF ? gate + ' ' + dg[0] : gate + ' ' + (east ? 'Y10' : 'Y20') + ' ' + dg[0] };
    if (s.anom === 'atis') ac.atisRep = String.fromCharCode(this.atis.charCodeAt(0) - 1);
    if (s.anom === 'fl') { ac.rfl = ac.rflFiled = rfl + 1000; }
    if (s.anom === 'ctot') { ac.ctot = Math.ceil((this.utc() + 60 * rng.int(18, 22)) / 60) * 60; ac.tsat = ac.ctot - 15 * 60; }
    if (s.anom === 'nofpl') { ac.noFpl = true; ac.fplT = this.t + 75; }
    this.acs.push(ac); this.total++; this.emit('spawn', ac);
    this.say(ac, D.freq.DEL.n + ', ' + ATC.csSay(ac) + ', stand ' + ac.stand + ', information ' + ATC.phon(ac.atisRep) + ', request IFR clearance to ' + ac.destName + '.');
    ac.waiting = 'clr';
    return ac;
  };
  DelSim.prototype.validate = function (ac, cmds) {
    for (var i = 0; i < cmds.length; i++) {
      var c = cmds[i];
      if (c.k === 'ho') {
        if (ac.st !== 'cleared' && ac.st !== 'ready') return { refuse: 'we have not received our clearance yet' };
        if (ac.tsat && this.utc() < ac.tsat - 300) { this.inc('slotbust', [ac], ATC.T('{0}: CTOT {1} — 목표 시동 승인 시각(TSAT {2}) 5분 전보다 일찍 지상관제로 이양했습니다.', ac.cs, U.hhmm(ac.ctot), U.hhmm(ac.tsat))); return { refuse: 'our slot time is ' + U.hhmm(ac.ctot) + ', too early for start-up' }; }
      }
      if (c.k === 'rbok' && ac.st !== 'rb') return { refuse: 'say again' };
    }
    return null;
  };
  DelSim.prototype.command = function (ac, cmds, o) {
    if (!ac || ac.gone) return false;
    var clr = null, hasAtis = false, hasAmend = false, hasSlot = false, i, self = this;
    for (i = 0; i < cmds.length; i++) { if (cmds[i].k === 'clr') clr = cmds[i]; if (cmds[i].k === 'atis') hasAtis = true; if (cmds[i].k === 'amendfl') hasAmend = true; if (cmds[i].k === 'slot') hasSlot = true; }
    if (clr) {
      /* 허가 내용 점검(송신 시점) */
      if (ac.noFpl) this.inc('clrerr', [ac], ATC.T('{0}: 비행계획이 접수되지 않은 상태에서 허가를 발부했습니다(먼저 운항관리 확인 요청).', ac.cs));
      if (clr.sid !== this.sidFor(ac.gate)) this.inc('clrerr', [ac], ATC.T('{0}: SID {1} — 목적지 {2}의 출구 지점은 {3}, 사용 활주로 {4}의 SID는 {5}입니다.', ac.cs, clr.sid, ac.dest, ac.gate, this.rwyOf(ac), this.sidFor(ac.gate)));
      if (clr.alt !== D.sidInit) this.inc('clrerr', [ac], D.sidInitGame ? ATC.T('{0}: 초기 고도 {1} — 이 게임의 초기 허가 고도는 {2}ft입니다.', ac.cs, fmt.alt(clr.alt), fmt.alt(D.sidInit)) : ATC.T('{0}: 초기 고도 {1} — SID 초기 상승 고도는 {2}ft입니다.', ac.cs, fmt.alt(clr.alt), fmt.alt(D.sidInit)));
      var fl = hasAmend ? cmds.filter(function (c) { return c.k === 'amendfl'; })[0].v : ac.rfl;
      if (!this.parityOk(ac, fl)) this.inc('wronglvl', [ac], ATC.T('{0}: 순항 고도 {1} — {2} 고도여야 합니다(허가 전 정정).', ac.cs, fmt.alt(fl), (D.gateEast[ac.gate] ? ATC.T('동쪽행은 홀수') : ATC.T('서쪽행은 짝수'))));
      if (ac.atisRep !== this.atis && !hasAtis && !ac.atisFixed) this.inc('atismiss', [ac], ATC.T('{0}: 조종사가 이전 ATIS({1})를 보고했으나 최신 정보({2})를 통보하지 않았습니다.', ac.cs, ac.atisRep, this.atis));
      if (ac.ctot && !hasSlot && !ac.slotTold) { ac.slotMiss = true; }
      if (ac.reqT && this.t - ac.reqT > 150 && !ac.reqLate) { ac.reqLate = true; this.inc('reqlate', [ac], ATC.T('{0}: 허가 요청에 2분 30초 이상 응답하지 않았습니다.', ac.cs)); }
    }
    return ATC.Sim.prototype.command.call(this, ac, cmds, o);
  };
  DelSim.prototype.apply = function (ac, c) {
    switch (c.k) {
      case 'atis': ac.atisFixed = true; ac.atisRep = this.atis; break;
      case 'amendfl': ac.rfl = c.v; break;
      case 'slot': ac.slotTold = true; break;
      case 'clr': ac.st = 'rb'; ac.clr = { sid: c.sid, alt: c.alt, sq: c.sq }; ac.clrFlow = this.flow.id; ac.waiting = 'rb'; ac.rbT = this.t; ac.reclear = false; break;
      case 'rbok':
        if (this.hasWrong(ac.id)) { for (var i = this.pendWrong.length - 1; i >= 0; i--) if (this.pendWrong[i].ac === ac) { this.pendWrong[i].flagged = true; this.pendWrong.splice(i, 1); } this.inc('hearback', [ac], ATC.T('{0}: 복창 오류에 "readback correct"로 응답했습니다.', ac.cs)); }
        ac.st = 'cleared'; ac.waiting = null; ac.readyT = this.t + 25 + this.rng() * 50;
        if (ac.ctot && !ac.slotTold) this.inc('slotbust', [ac], ATC.T('{0}: 조정이륙시간(CTOT {1})을 조종사에게 통보하지 않았습니다.', ac.cs, U.hhmm(ac.ctot)), { pts: -2 });
        break;
      case 'ho': this.sys(ATC.T('{0} → 지상관제 이양 완료.', ac.cs), 'good'); this.remove(ac, true); break;
      case 'stby': if (ac.noFpl) { ac.stbyOk = true; ac.waiting = null; } break;
    }
  };
  DelSim.prototype.onCorrect = function (ac) { ac.st = 'rb'; ac.waiting = 'rb'; };
  DelSim.prototype.update = function (dt) {
    var i, a, self = this;
    while (this.sched.length && this.sched[0].t <= this.t) this.spawn(this.sched.shift());
    for (i = 0; i < this.events.length; i++) {
      var ev = this.events[i]; if (ev.done || this.t < ev.t) continue; ev.done = true;
      if (ev.k === 'atis') { this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1); this.qnh += this.rng.pick([-2, -1, 1, 2]); this.sys(ATC.T('ATIS 갱신: 정보 {0} · QNH {1}. 이전 정보를 보고하는 조종사에게는 최신 정보를 통보하세요.', this.atis, this.qnh), 'alert'); }
      if (ev.k === 'rwychg') {
        this.wind = { dir: U.n360(this.wind.dir + 180), spd: this.wind.spd + 3 }; this.flow = D.flows[this.flowForWind()]; this.depRwy = this.flow.dep; this.atis = String.fromCharCode(this.atis.charCodeAt(0) + 1);
        if (D.sidNames) this.sys(ATC.T('풍향이 {0}(으)로 바뀌어 사용 활주로 변경: 출발 {1} · ATIS {2}. 이 공항의 SID는 활주로가 바뀌어도 명칭이 같습니다 — 새로 요청하는 출발기의 ATIS만 확인하세요.', fmt.wind(this.wind), this.flow.deps.join(' · '), this.atis), 'alert');
        else {
          this.sys(ATC.T('풍향이 {0}(으)로 바뀌어 사용 활주로 변경: 출발 {1} · ATIS {2}. 이미 허가한 출발기도 새 SID(1{3})로 재허가해야 합니다.', fmt.wind(this.wind), this.depRwy, this.atis, this.flow.sfx), 'alert');
          this.acs.forEach(function (x) { if ((x.st === 'cleared' || x.st === 'ready' || x.st === 'rb') && x.clrFlow !== self.flow.id) { x.st = 'req'; x.reclear = true; x.waiting = 'clr'; x.reqT = self.t; x.atisRep = String.fromCharCode(self.atis.charCodeAt(0) - 1); self.say(x, ATC.csSay(x) + ', we copy runway change, request revised clearance.', { kind: 'warn' }); } });
        }
      }
    }
    var acs = this.acs.slice();
    for (i = 0; i < acs.length; i++) {
      a = acs[i];
      if (a.noFpl && this.t >= a.fplT) { a.noFpl = false; this.sys(ATC.T('{0} 비행계획 접수됨.', a.cs), 'info'); if (!a.stbyOk) { } this.say(a, D.freq.DEL.n + ', ' + ATC.csSay(a) + ', flight plan has been filed, request clearance to ' + a.destName + '.'); a.waiting = 'clr'; a.reqT = this.t; }
      if (a.st === 'cleared' && this.t >= a.readyT) {
        a.st = 'ready'; a.waiting = 'ho'; a.hoReqT = this.t;
        if (a.tsat && this.utc() < a.tsat - 300) a.readyHold = true;
        this.say(a, ATC.csSay(a) + ', stand ' + a.stand + ', ready for pushback and start-up.');
      }
      if (a.st === 'ready' && a.hoReqT && !a.hoLate) { var lim = a.tsat ? Math.max(a.hoReqT, a.tsat - 300 - this.t0) + 150 : a.hoReqT + 150; if (this.t > lim) { a.hoLate = true; this.inc('noho', [a], ATC.T('{0}: 준비 완료 보고 후 지상관제 이양이 지연됐습니다.', a.cs)); } }
      if (a.st === 'rb' && this.t - a.rbT > 60 && !a.rbLate) { a.rbLate = true; this.inc('reqlate', [a], ATC.T('{0}: 복창을 듣고도 확인("readback correct")하지 않았습니다.', a.cs)); }
    }
  };
  DelSim.prototype.isFinished = function () { return this.sched.length === 0 && this.acs.length === 0 && this.t > 20; };
  DelSim.prototype.coach = function () {
    var out = [], self = this;
    this.acs.forEach(function (a) {
      if (a.st === 'req') {
        if (a.noFpl) { out.push({ p: 8, ac: a.id, t: ATC.T('{0} — 비행계획 없음(NO FPL). 허가하지 말고 「대기 · 운항관리 확인 요청」.', a.cs) }); return; }
        var t = ATC.T('{0} → {1}: 출구 {2} · 활주로 {3} → SID 「{4}」 · 초기 고도 {5} · 스쿼크 {6}.', a.cs, a.dest, a.gate, self.rwyOf(a), self.sidFor(a.gate), fmt.alt(D.sidInit), a.squawk);
        if (a.atisRep !== self.atis) t += ATC.T(' ATIS {0} 보고(현재 {1}) → 최신 정보 통보.', a.atisRep, self.atis);
        if (!self.parityOk(a, a.rfl)) t += ATC.T(' 순항 고도 {0}은(는) 비행 방향에 맞지 않음 → 정정.', fmt.alt(a.rfl));
        if (a.ctot) t += ATC.T(' CTOT {0} 통보.', U.hhmm(a.ctot));
        out.push({ p: 7, ac: a.id, t: t });
      } else if (a.st === 'rb') out.push({ p: 9, ac: a.id, t: ATC.T('{0} 복창 — 허가 내용과 항목별로 대조. 일치하면 「Readback correct」, 다르면 「정정」.', a.cs) });
      else if (a.st === 'ready') out.push({ p: 6, ac: a.id, t: ATC.T('{0} 준비 완료 — {1}', a.cs, (a.tsat && self.utc() < a.tsat - 300 ? ATC.T('TSAT {0} 5분 전({1})까지 대기.', U.hhmm(a.tsat), U.hhmm(a.tsat - 300)) : ATC.T('Ground({0})로 이양.', D.freq.GND.fq))) });
    });
    out.sort(function (x, y) { return y.p - x.p; }); return out.slice(0, 4);
  };
  ATC.DelSim = DelSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
