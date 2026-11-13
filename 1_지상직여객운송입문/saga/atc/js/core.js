/* AIRLINE SAGA — ATC 공통 엔진: 수학·난수·교신 문구·무선 채널·채점 */
(function (G) {
  'use strict';
  var ATC = G.ATC = G.ATC || {};
  var D = ATC.D, D2R = Math.PI / 180;

  var U = ATC.U = {
    clamp: function (v, a, b) { return v < a ? a : v > b ? b : v; },
    n360: function (a) { a = a % 360; return a < 0 ? a + 360 : a; },
    /* a에서 b로 가는 부호 있는 각(−180..180, +는 우선회) */
    adiff: function (a, b) { var d = (b - a) % 360; if (d > 180) d -= 360; if (d < -180) d += 360; return d; },
    dist: function (a, b) { return Math.hypot(a.x - b.x, a.y - b.y); },
    brg: function (a, b) { return U.n360(Math.atan2(b.x - a.x, b.y - a.y) / D2R); },
    pad: function (n, w) { var s = String(Math.round(n)); while (s.length < w) s = '0' + s; return s; },
    r5: function (h) { h = Math.round(h / 5) * 5; h = U.n360(h); return h === 0 ? 360 : h; },
    inPoly: function (p, pts) {
      var c = false; for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        if (((pts[i].y > p.y) !== (pts[j].y > p.y)) && (p.x < (pts[j].x - pts[i].x) * (p.y - pts[i].y) / (pts[j].y - pts[i].y) + pts[i].x)) c = !c;
      } return c;
    },
    hhmm: function (sec) { sec = Math.floor(sec); var h = Math.floor(sec / 3600) % 24, m = Math.floor(sec / 60) % 60; return U.pad(h, 2) + U.pad(m, 2); },
    mmss: function (sec) { sec = Math.max(0, Math.floor(sec)); return U.pad(Math.floor(sec / 60), 2) + ':' + U.pad(sec % 60, 2); }
  };
  ATC.rng = function (seed) {
    var a = seed >>> 0;
    var f = function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    f.int = function (lo, hi) { return lo + Math.floor(f() * (hi - lo + 1)); };
    f.pick = function (arr) { return arr[Math.floor(f() * arr.length)]; };
    f.wpick = function (arr, wf) { var s = 0, i; for (i = 0; i < arr.length; i++) s += wf(arr[i]); var r = f() * s; for (i = 0; i < arr.length; i++) { r -= wf(arr[i]); if (r <= 0) return arr[i]; } return arr[arr.length - 1]; };
    return f;
  };

  /* ---------- 표기 ---------- */
  var fmt = ATC.fmt = {
    alt: function (ft) { ft = Math.round(ft / 100) * 100; if (ft >= D.airport.transAlt) return 'FL' + U.pad(ft / 100, 3); var k = Math.floor(ft / 1000), r = ft % 1000; return (k ? k + ',' : '') + (k ? U.pad(r, 3) : r); },
    hdg: function (h) { return U.pad(U.r5(h), 3); },
    wind: function (w) { return w.spd < 3 ? 'calm' : U.pad(Math.round(w.dir / 10) * 10 || 360, 3) + ' at ' + Math.round(w.spd); },
    fl: function (ft) { return U.pad(Math.round(ft / 100), 3); }
  };
  var PH = { A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu' };
  ATC.phon = function (s) { return s.split('').map(function (c) { return PH[c] || c; }).join(' '); };
  ATC.PH = PH;
  var DW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'niner'];
  function digs(s) { return s.split('').map(function (c) { return DW[+c] !== undefined && c >= '0' && c <= '9' ? DW[+c] : c; }).join(' '); }
  /* 화면 문구 → 음성 합성용 문구 */
  ATC.tts = function (s) {
    s = s.replace(/FL(\d{3})/g, function (m, a) { return 'flight level ' + digs(a); });
    s = s.replace(/(\d{1,2}),(\d)00\b/g, function (m, a, b) { return digs(a) + ' thousand' + (b !== '0' ? ' ' + DW[+b] + ' hundred' : ''); });
    s = s.replace(/\b(\d{2})([LRC])\b/g, function (m, a, b) { return digs(a) + ' ' + ({ L: 'left', R: 'right', C: 'center' })[b]; });
    s = s.replace(/(\d+)\.(\d+)/g, function (m, a, b) { return digs(a) + ' decimal ' + digs(b.replace(/0+$/, '') || '0'); });
    s = s.replace(/\b([A-Z])(\d)\b/g, function (m, a, b) { return (PH[a] || a) + ' ' + b; });
    s = s.replace(/\b(\d)([A-Z])\b/g, function (m, a, b) { return a + ' ' + (PH[b] || b); });
    s = s.replace(/\d+/g, function (m) { return digs(m); });
    return s.replace(/\bQNH\b/g, 'Q N H').replace(/\bILS\b/g, 'I L S');
  };

  /* ---------- 교신 문구(일본·한국에서 쓰는 형식 기준, 교육용) ---------- */
  function twy(names) { return names.map(function (n) { return n.length <= 2 ? ATC.phon(n.replace(/\d/g, '')) + (n.replace(/\D/g, '') ? ' ' + n.replace(/\D/g, '') : '') : n; }).join(', '); }
  ATC.twySay = twy;
  /* 지시 하나 → [관제 문구, 복창 문구] */
  function one(sim, ac, c) {
    var f = D.freq, w = fmt.wind(sim.wind), s, d;
    switch (c.k) {
      case 'hdg':
        d = c.dir || (U.adiff(ac.hdg, c.v) < 0 ? 'L' : 'R');
        if (Math.abs(U.adiff(ac.hdg, c.v)) < 3 && !c.dir) return ['fly heading ' + fmt.hdg(c.v), 'heading ' + fmt.hdg(c.v)];
        s = (d === 'L' ? 'left' : 'right') + ' heading ' + fmt.hdg(c.v); return ['turn ' + s, s];
      case 'alt':
        d = c.v > ac.alt + 50 ? 'climb' : 'descend'; s = d + ' and maintain ' + fmt.alt(c.v);
        return [(c.exp ? 'expedite, ' : '') + s, s + (c.exp ? ', expediting' : '')];
      case 'spd':
        if (!c.v) return ['resume normal speed', 'normal speed'];
        d = c.v < ac.ias - 2 ? 'reduce' : c.v > ac.ias + 2 ? 'increase' : 'maintain';
        return [d + ' speed ' + (d === 'maintain' ? '' : 'to ') + c.v + ' knots', 'speed ' + c.v];
      case 'dct': return ['proceed direct ' + c.fix, 'direct ' + c.fix];
      case 'ils': return ['cleared for ILS runway ' + c.rwy + ' approach', 'cleared for ILS runway ' + c.rwy + ' approach'];
      case 'hold': return ['hold at ' + c.fix + ' as published, expect further clearance at ' + U.hhmm(sim.utc() + 600), 'hold at ' + c.fix];
      case 'xalt': return ['cross ' + c.fix + ' at ' + fmt.alt(c.v), 'cross ' + c.fix + ' at ' + fmt.alt(c.v)];
      case 'ho':
        var to = c.to, o = to.fq ? to : f[to];
        return ['contact ' + o.n + ' ' + o.fq, o.fq];
      case 'radar': return ['radar contact', null];
      case 'luaw': return ['runway ' + c.rwy + (c.at ? ' at ' + twy([c.at]) : '') + ', line up and wait', 'runway ' + c.rwy + ', line up and wait'];
      case 'cto': return ['wind ' + w + ', runway ' + c.rwy + ', cleared for takeoff', 'runway ' + c.rwy + ', cleared for takeoff'];
      case 'cancelto': return ['hold position, cancel takeoff clearance', 'holding position'];
      case 'ctl': return ['runway ' + c.rwy + ', cleared to land, wind ' + w, 'runway ' + c.rwy + ', cleared to land'];
      case 'cont': return ['continue approach' + (c.n ? ', number ' + c.n : ''), 'continue approach'];
      case 'ga': return ['go around', 'going around'];
      case 'minspd': return ['reduce to minimum approach speed', 'minimum approach speed'];
      case 'hs': return ['hold short of runway ' + c.rwy, 'holding short runway ' + c.rwy];
      case 'cross': return ['cross runway ' + c.rwy, 'crossing runway ' + c.rwy];
      case 'vacate': return ['turn ' + (c.side || 'right') + ' at ' + twy([c.exit]) + ', when vacated contact ground ' + f.GND.fq, twy([c.exit]) + ', when vacated ground ' + f.GND.fq];
      case 'push': return ['pushback approved' + (c.face ? ', face ' + c.face : ''), 'pushback approved' + (c.face ? ', face ' + c.face : '')];
      case 'pushhold': return ['hold position, expect pushback shortly', 'holding position'];
      case 'taxi':
        if (c.stand) { s = c.via && c.via.length ? ' via ' + twy(c.via) : ''; return ['taxi to stand ' + c.stand + s, 'stand ' + c.stand + s]; }
        return ['taxi to holding point ' + twy([c.hp]) + ', runway ' + c.rwy + (c.via && c.via.length ? ' via ' + twy(c.via) : '') + (c.hs ? ', hold short of runway ' + c.hs : ''),
          'holding point ' + twy([c.hp]) + ', runway ' + c.rwy + (c.via && c.via.length ? ' via ' + twy(c.via) : '') + (c.hs ? ', hold short runway ' + c.hs : '')];
      case 'holdpos': return ['hold position', 'holding position'];
      case 'conttaxi': return ['continue taxi', 'continue taxi'];
      case 'giveway': return ['give way to ' + c.to, 'giving way to ' + c.to];
      case 'clr':
        return ['cleared to ' + c.destName + ' airport via ' + c.sid + ' departure, flight planned route, maintain ' + fmt.alt(c.alt) + ', squawk ' + c.sq,
          'cleared to ' + c.destName + ' via ' + c.sid + ' departure, flight planned route, maintain ' + fmt.alt(c.alt) + ', squawk ' + c.sq];
      case 'rbok': return ['readback correct' + (c.then ? ', ' + c.then : ''), null];
      case 'atis': return ['information ' + ATC.phon(c.v) + ' is now current, QNH ' + sim.qnh, 'information ' + ATC.phon(c.v) + ', QNH ' + sim.qnh];
      case 'stby': return [c.text || 'stand by', null];
      case 'slot': return ['your calculated takeoff time is ' + c.v + ', expect start-up at ' + c.tsat, 'takeoff time ' + c.v + ', start-up at ' + c.tsat];
      case 'amendfl': return ['flight level ' + fmt.fl(c.old) + ' not available for your direction of flight, expect ' + fmt.alt(c.v) + ' as final level', 'expect ' + fmt.alt(c.v)];
      case 'rmk': return [c.text, c.rb || 'roger'];
      default: return [c.k, 'roger'];
    }
  }
  ATC.csSay = function (ac) { return ac.csWord + ' ' + ac.num + (ac.type && D.types[ac.type].wake === 'H' ? ' heavy' : ''); };
  ATC.phrase = function (sim, ac, cmds) {
    var a = [], b = [], i, ilsI = -1, altI = -1, hdgI = -1, pos = '';
    for (i = 0; i < cmds.length; i++) { var p = one(sim, ac, cmds[i]); a.push(p[0]); b.push(p[1] || ''); if (cmds[i].k === 'ils') ilsI = i; if (cmds[i].k === 'alt') altI = i; if (cmds[i].k === 'hdg') hdgI = i; }
    /* 레이더 유도 중(기수 비행)에 내는 접근 허가: 위치를 알려 주고, 로컬라이저에 확립할 때까지 지킬 고도를 붙임.
       스스로 경로를 따라 접근 지점으로 가는 항공기에는 붙이지 않음(공시된 경로의 고도를 따르므로) */
    if (ilsI >= 0 && !(ac.appr && ac.appr.loc) && (hdgI >= 0 || (ac.nav && ac.nav.mode === 'hdg'))) {
      var e = D.ends[cmds[ilsI].rwy], faf = e && D.fix[e.FAF];
      if (faf && ac.x !== undefined) { var nm = Math.max(1, Math.round(U.dist(ac, faf))); pos = nm + (nm === 1 ? ' mile from ' : ' miles from ') + e.FAF; }
      if (altI >= 0) { a[altI] += ' until established on the localizer'; b[altI] += ' until established'; }
      else if (ac.tAlt) { a[ilsI] = 'maintain ' + fmt.alt(ac.tAlt) + ' until established on the localizer, ' + a[ilsI]; b[ilsI] = 'maintain ' + fmt.alt(ac.tAlt) + ' until established, ' + b[ilsI]; }
    }
    b = b.filter(function (x) { return x; });
    var cs = ac.csWord + ' ' + ac.num;
    return { atc: cs + ', ' + (pos ? pos + ', ' : '') + a.join(', ') + '.', rb: b.length ? b.join(', ') + ', ' + cs + '.' : null };
  };

  /* ---------- 채점 항목 ---------- */
  ATC.INC = {
    los: { cat: 'S', pts: -15, t: ATC.T('레이더 분리 상실'), les: 'sep' },
    nmac: { cat: 'S', pts: -40, t: ATC.T('공중 근접(충돌 위험)'), les: 'sep', fatal: true },
    wake: { cat: 'S', pts: -10, t: ATC.T('후방난기류 분리 미달'), les: 'wake' },
    terrain: { cat: 'S', pts: -15, t: ATC.T('최저 레이더 유도 고도(MVA) 미만'), les: 'mva' },
    rwysep: { cat: 'S', pts: -25, t: ATC.T('활주로 분리 상실'), les: 'rwy' },
    incursion: { cat: 'S', pts: -25, t: ATC.T('활주로 침범 위험 지시'), les: 'rwy' },
    rwyclosed: { cat: 'S', pts: -15, t: ATC.T('폐쇄 중인 활주로 사용 지시'), les: 'rwy' },
    collision: { cat: 'S', pts: -50, t: ATC.T('지상 충돌'), les: 'gnd', fatal: true },
    restricted: { cat: 'S', pts: -10, t: ATC.T('제한 구역 진입'), les: 'acc' },
    wx: { cat: 'S', pts: -6, t: ATC.T('악기상 구역으로 유도'), les: 'app' },
    ga_forced: { cat: 'E', pts: -8, t: ATC.T('복행 유발(활주로 미개방·간격 부족)'), les: 'rwy' },
    ga_noclr: { cat: 'P', pts: -6, t: ATC.T('착륙 허가 누락으로 복행'), les: 'twr' },
    hearback: { cat: 'P', pts: -6, t: ATC.T('틀린 복창을 바로잡지 않음'), les: 'rb' },
    rbfix: { cat: 'P', pts: 2, t: ATC.T('틀린 복창 정정'), les: 'rb' },
    exitbad: { cat: 'P', pts: -6, t: ATC.T('이양 조건 미충족'), les: 'ho' },
    wronglvl: { cat: 'P', pts: -4, t: ATC.T('비행 방향에 맞지 않는 순항 고도'), les: 'acc' },
    reqlate: { cat: 'E', pts: -2, t: ATC.T('조종사 요청 미응답'), les: 'eff' },
    noho: { cat: 'P', pts: -4, t: ATC.T('이양(주파수 변경) 지연·누락'), les: 'ho' },
    airspace: { cat: 'S', pts: -10, t: ATC.T('이양 없이 관할 공역 이탈'), les: 'ho' },
    unstable: { cat: 'E', pts: -5, t: ATC.T('불안정 접근 유도(너무 높거나 요격 각도 과대)'), les: 'app' },
    holdlong: { cat: 'E', pts: -3, t: ATC.T('불필요한 체공'), les: 'app' },
    delay: { cat: 'E', pts: -2, t: ATC.T('지연 누적'), les: 'eff' },
    stop: { cat: 'E', pts: -2, t: ATC.T('지상 흐름 막힘(조종사 자체 정지)'), les: 'gnd' },
    gridlock: { cat: 'S', pts: -12, t: ATC.T('유도로 정면 대치(교착)'), les: 'gnd' },
    wrongrwy: { cat: 'P', pts: -6, t: ATC.T('사용 활주로·대기 지점 오류'), les: 'gnd' },
    clrerr: { cat: 'P', pts: -6, t: ATC.T('허가 내용 오류'), les: 'del' },
    slotbust: { cat: 'P', pts: -5, t: ATC.T('흐름 관리 시각(CTOT) 미준수'), les: 'del' },
    atismiss: { cat: 'P', pts: -2, t: ATC.T('ATIS 최신 여부 미확인'), les: 'del' },
    emg_ok: { cat: 'P', pts: 5, t: ATC.T('비정상 상황 우선 처리'), les: 'emg' },
    emg_late: { cat: 'S', pts: -10, t: ATC.T('비상기 우선 처리 지연'), les: 'emg' },
    good: { cat: 'E', pts: 0, t: ATC.T('정상 처리'), les: '' },
    expedite: { cat: 'E', pts: 1, t: ATC.T('효율적 처리'), les: 'eff' }
  };

  /* ---------- 시뮬레이션 기반 클래스 ---------- */
  function Sim(o) {
    o = o || {};
    this.mode = o.mode || 'APP'; this.level = D.levels[o.level || 1];
    this.seed = o.seed || 12345; this.rng = ATC.rng(this.seed);
    this.t = 0; this.t0 = (o.startHour !== undefined ? o.startHour : 9) * 3600;   /* 근무 시작 UTC */
    this.acs = []; this.log = []; this.incs = []; this.q = []; this.cur = null;
    this.done = 0; this.total = 0; this.over = false; this.fatal = null;
    this.wind = o.wind || { dir: 60, spd: 8 }; this.qnh = o.qnh || 1013; this.atis = 'C';
    this.flow = D.flows[o.flow || this.flowForWind()];
    this.nextId = 1; this.usedCs = {}; this.sq = 0o4500 + this.rng.int(0, 60);
    this.listeners = [];
    this.events = [];           /* 예정된 비정상 상황 */
    this.notes = [];            /* 코치·알림 */
    this.pendWrong = [];
  }
  /* 바람에 맞는 운용 방향: 정풍 성분이 가장 큰 쪽. 차이가 작으면(0.1 이하) 목록에서 앞선 쪽을 유지 */
  Sim.prototype.flowForWind = function () { var w = this.wind.dir, best = null, bh = 0; Object.keys(D.flows).forEach(function (k) { var h = Math.cos((w - D.flows[k].hdg) * D2R); if (!best || h > bh + 0.1) { best = k; bh = h; } }); return best; };
  Sim.prototype.utc = function () { return this.t0 + this.t; };
  Sim.prototype.emit = function (type, data) { for (var i = 0; i < this.listeners.length; i++) this.listeners[i](type, data); };
  Sim.prototype.squawk = function () { this.sq += 1 + this.rng.int(0, 2); var s = this.sq.toString(8); if (/[89]/.test(s) || s === '7500' || s === '7600' || s === '7700') return this.squawk(); return U.pad(+s, 4); };
  /* 가상 편명 만들기 */
  Sim.prototype.mkFlight = function (filter) {
    var rng = this.rng, self = this, pool = D.airlines.filter(filter || function () { return true; }), al, free, guard = 0;
    function unused(x) { return !self.usedCs[al.code + x.num]; }
    do { al = rng.wpick(pool, function (a) { return a.w; }); free = al.flights.filter(unused); } while (!free.length && guard++ < 40);
    if (!free.length) {           /* 편명을 다 썼으면 지금 화면에 없는 편명부터 다시 씀 */
      var live = {}; this.acs.forEach(function (a) { live[a.cs] = 1; });
      free = al.flights.filter(function (x) { return !live[al.code + x.num]; }); if (!free.length) free = al.flights;
    }
    var f = rng.pick(free), cs = al.code + f.num; this.usedCs[cs] = 1; rng();
    return { cs: cs, csWord: al.cs, num: String(f.num), al: al, type: f.type, wake: D.types[f.type].wake, perf: D.types[f.type] };
  };
  Sim.prototype.addLog = function (e) { e.t = this.t; e.utc = this.utc(); this.log.push(e); if (this.log.length > 400) this.log.shift(); this.emit('log', e); return e; };
  /* 무선 채널: 한 번에 한 송신만 */
  Sim.prototype.enq = function (m, front) {
    var w = m.text.split(/\s+/).length; m.dur = m.dur || U.clamp(1.0 + w * (m.who === 'atc' ? 0.26 : 0.24), 1.5, 8);
    if (front) { var i = 0; while (i < this.q.length && this.q[i].pri) i++; m.pri = 1; this.q.splice(i, 0, m); } else this.q.push(m);
  };
  Sim.prototype.radioTick = function () {
    if (this.cur && this.t >= this.cur.end) { var c = this.cur; this.cur = null; if (c.onDone) c.onDone(); }
    if (!this.cur && this.q.length) {
      var m = this.q.shift();
      if (m.ac && m.ac.gone && m.who === 'pilot') return;
      if (this.onTx) { var rd = this.onTx(m); if (rd > 0) m.dur = rd; }
      m.end = this.t + m.dur; this.cur = m;
      m.entry = this.addLog({ who: m.who, cs: m.ac ? m.ac.cs : '', ac: m.ac ? m.ac.id : 0, text: m.text, kind: m.kind || '', dur: m.dur, noVoice: !!this.onTx });
      if (m.onStart) m.onStart(m.entry);
    }
  };
  /* 조종사 송신 */
  Sim.prototype.say = function (ac, text, o) { o = o || {}; this.enq({ who: 'pilot', ac: ac, text: text, kind: o.kind || '', onDone: o.onDone, dur: o.dur }, o.front); };
  Sim.prototype.sys = function (text, kind) { this.addLog({ who: 'sys', cs: '', text: text, kind: kind || 'info' }); };
  /* 관제 지시: 문구 송신 → 복창 → 적용 */
  Sim.prototype.command = function (ac, cmds, o) {
    var self = this; o = o || {};
    if (!ac || ac.gone) return false;
    var chk = this.validate ? this.validate(ac, cmds) : null;
    var ph = ATC.phrase(this, ac, cmds);
    ac.lastCmdT = this.t; ac.waiting = null;
    if (chk && chk.refuse) {
      this.enq({ who: 'atc', ac: ac, text: ph.atc }, true);
      this.enq({ who: 'pilot', ac: ac, text: 'unable, ' + chk.refuse + ', ' + ac.csWord + ' ' + ac.num + '.', kind: 'warn' }, true);
      return false;
    }
    var wrong = null;
    if (!o.noErr && this.level.rbErr > 0 && this.rng() < this.level.rbErr * (this.rbErrMul || 1)) wrong = this.mutate(ac, cmds);
    var rbText = ph.rb;
    if (wrong) rbText = ATC.phrase(this, ac, wrong).rb;
    this.enq({
      who: 'atc', ac: ac, text: ph.atc, onDone: function () {
        if (!rbText) { self.applyAll(ac, cmds); return; }
        self.enq({
          who: 'pilot', ac: ac, text: rbText[0].toUpperCase() + rbText.slice(1), kind: wrong ? 'rb' : '',
          onStart: function (entry) { if (wrong) { entry.wrong = true; self.pendWrong.push({ ac: ac, right: cmds, wrongCmds: wrong, t: self.t, entry: entry, flagged: false }); } self.applyAll(ac, wrong || cmds); }
        }, true);
      }
    }, true);
    return true;
  };
  Sim.prototype.applyAll = function (ac, cmds) { if (ac.gone) return; for (var i = 0; i < cmds.length; i++) this.apply(ac, cmds[i]); this.emit('applied', ac); };
  /* 복창 오류 만들기: 숫자 하나가 바뀜 */
  Sim.prototype.mutate = function (ac, cmds) {
    var idx = [], i; for (i = 0; i < cmds.length; i++) if (cmds[i].k === 'hdg' || cmds[i].k === 'alt' || cmds[i].k === 'spd' && cmds[i].v || cmds[i].k === 'clr') idx.push(i);
    if (!idx.length) return null;
    var j = this.rng.pick(idx), c = {}, k; for (k in cmds[j]) c[k] = cmds[j][k];
    if (c.k === 'hdg') { c.v = U.r5(c.v + this.rng.pick([-30, -20, 20, 30, 100, -100])); c.dir = cmds[j].dir || (U.adiff(ac.hdg, cmds[j].v) < 0 ? 'L' : 'R'); }
    else if (c.k === 'alt') { var up = c.v > ac.alt; c.v = c.v + (this.rng() < 0.5 ? 1000 : -1000) * (c.v > 14000 ? 1 : 1); if (c.v < 2000) c.v = cmds[j].v + 1000; if ((c.v > ac.alt) !== up) c.v = cmds[j].v + (up ? 1000 : -1000); }
    else if (c.k === 'spd') c.v = c.v + this.rng.pick([-20, 20, 30]);
    else if (c.k === 'clr') { if (this.rng() < 0.5) c.sq = c.sq.slice(0, 2) + c.sq[3] + c.sq[2]; else c.alt = c.alt + 1000; if (c.sq === cmds[j].sq && c.alt === cmds[j].alt) c.alt += 1000; }
    var out = cmds.slice(); out[j] = c; return out;
  };
  /* 틀린 복창 정정 */
  Sim.prototype.correct = function (acId) {
    for (var i = this.pendWrong.length - 1; i >= 0; i--) {
      var p = this.pendWrong[i];
      if (p.ac.id === acId) {
        this.pendWrong.splice(i, 1); p.entry.fixed = true;
        var ph = ATC.phrase(this, p.ac, p.right), self = this;
        this.enq({ who: 'atc', ac: p.ac, text: p.ac.csWord + ' ' + p.ac.num + ', negative, ' + ph.atc.split(', ').slice(1).join(', '), onDone: function () {
          self.enq({ who: 'pilot', ac: p.ac, text: 'Correction, ' + ph.rb, onStart: function () { self.applyAll(p.ac, p.right); if (self.onCorrect) self.onCorrect(p.ac); } }, true);
        } }, true);
        if (!p.flagged) this.inc('rbfix', [p.ac], ATC.T('{0} 복창 오류를 바로잡았습니다.', p.ac.cs));
        return true;
      }
    }
    return false;
  };
  Sim.prototype.wrongTick = function () {
    for (var i = this.pendWrong.length - 1; i >= 0; i--) {
      var p = this.pendWrong[i];
      if (p.ac.gone) { this.pendWrong.splice(i, 1); continue; }
      if (!p.flagged && this.t - p.t > 25) { p.flagged = true; this.inc('hearback', [p.ac], ATC.T('{0}: 조종사가 지시와 다르게 복창했는데 정정하지 않았습니다.', p.ac.cs)); }
      if (this.t - p.t > 120) this.pendWrong.splice(i, 1);
    }
  };
  Sim.prototype.hasWrong = function (acId) { for (var i = 0; i < this.pendWrong.length; i++) if (this.pendWrong[i].ac.id === acId) return true; return false; };
  /* 채점 기록 */
  Sim.prototype.inc = function (code, acs, text, o) {
    var def = ATC.INC[code] || { cat: 'E', pts: 0, t: code };
    var e = { code: code, cat: def.cat, pts: (o && o.pts !== undefined) ? o.pts : def.pts, title: def.t, les: def.les, text: text || def.t, t: this.t, utc: this.utc(), acs: (acs || []).map(function (a) { return a.cs; }) };
    this.incs.push(e);
    if (e.pts < 0 || def.fatal) this.addLog({ who: 'sys', cs: '', text: '⚠ ' + def.t + ' — ' + e.text, kind: def.cat === 'S' ? 'alert' : 'warn' });
    else if (e.pts > 0) this.addLog({ who: 'sys', cs: '', text: '✔ ' + e.text, kind: 'good' });
    if (def.fatal && !this.fatal && !this.noFatal) { this.fatal = e; }
    this.emit('inc', e);
    return e;
  };
  Sim.prototype.score = function () {
    var s = { S: 0, E: 0, P: 0, bonus: 0 }, i;
    for (i = 0; i < this.incs.length; i++) { var e = this.incs[i]; if (e.pts < 0) s[e.cat] += e.pts; else s.bonus += e.pts; }
    var total = U.clamp(100 + s.S + s.E + s.P + Math.min(s.bonus, 10), 0, 100);
    var crit = this.incs.some(function (e) { return e.cat === 'S' && e.pts <= -15; });
    var g = this.fatal ? 'F' : total >= 95 && !crit ? 'S' : total >= 85 ? 'A' : total >= 70 ? 'B' : total >= 55 ? 'C' : 'D';
    return { total: Math.round(total), S: s.S, E: s.E, P: s.P, bonus: Math.min(s.bonus, 10), grade: g, handled: this.done, of: this.total, fatal: this.fatal };
  };
  Sim.prototype.remove = function (ac, ok) { ac.gone = true; var i = this.acs.indexOf(ac); if (i >= 0) this.acs.splice(i, 1); if (ok) this.done++; this.emit('gone', ac); };
  Sim.prototype.byId = function (id) { for (var i = 0; i < this.acs.length; i++) if (this.acs[i].id === id) return this.acs[i]; return null; };
  Sim.prototype.byCs = function (cs) { cs = cs.toUpperCase(); for (var i = 0; i < this.acs.length; i++) if (this.acs[i].cs === cs || this.acs[i].cs.indexOf(cs) === 0 || this.acs[i].num === cs) return this.acs[i]; return null; };
  Sim.prototype.tick = function (dt) {
    if (this.over) return;
    this.t += dt;
    this.update(dt);
    this.radioTick(); this.wrongTick();
    if (this.fatal && !this.over) { this.over = true; this.emit('over', this.score()); }
    else if (this.isFinished && this.isFinished() && !this.over) { this.over = true; this.emit('over', this.score()); }
  };
  ATC.Sim = Sim;
  ATC.extend = function (Child, Parent) { Child.prototype = Object.create(Parent.prototype); Child.prototype.constructor = Child; };
})(typeof globalThis !== 'undefined' ? globalThis : this);
