/* AIRLINE SAGA — ATC 지상 이동·활주로 운용 엔진(지상관제·관제탑 공용) */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;
  var KT = 0.5144, NM = 1852;

  /* ---------- 유도로 경로 찾기 ---------- */
  function Net() { this.closed = {}; }
  Net.prototype.route = function (from, to, o) {
    o = o || {}; var N = D.gN, dist = {}, prev = {}, pe = {}, open = [from], seen = {}, cur, i;
    dist[from] = 0;
    while (open.length) {
      var bi = 0; for (i = 1; i < open.length; i++) if (dist[open[i]] < dist[open[bi]]) bi = i;
      cur = open.splice(bi, 1)[0]; if (seen[cur]) continue; seen[cur] = 1; if (cur === to) break;
      var adj = N[cur].adj;
      for (i = 0; i < adj.length; i++) {
        var e = adj[i].e, nx = adj[i].to; if (seen[nx]) continue;
        if (e.kind === 'rwy' || this.closed[e.i]) continue;
        if (e.kind === 'stand' && nx !== to && cur !== from) continue;
        if (N[nx].stand && nx !== to) continue;
        if (e.kind === 'entry' && !o.rwyOk && !(N[nx].rwy && nx === to) && !(N[cur].rwy && cur === from)) continue;
        var w = e.len * (o.pen ? o.pen(e, N[cur], N[nx]) : 1) * (o.mul && o.mul[e.i] ? o.mul[e.i] : 1);
        if (!(w < 1e8)) continue;
        if (dist[nx] === undefined || dist[cur] + w < dist[nx]) { dist[nx] = dist[cur] + w; prev[nx] = cur; pe[nx] = e; open.push(nx); }
      }
    }
    if (dist[to] === undefined) return null;
    var nodes = [], edges = [], n = to, len = 0;
    while (n !== from) { nodes.unshift(n); edges.unshift(pe[n]); len += pe[n].len; n = prev[n]; }
    nodes.unshift(from);
    var via = []; edges.forEach(function (e) { if (e.kind !== 'stand' && via[via.length - 1] !== e.name) via.push(e.name); });
    return { nodes: nodes, edges: edges, len: len, via: via, key: via.join(' ') };
  };
  /* 서로 다른 경로 후보(최대 k개) */
  Net.prototype.routes = function (from, to, o, k) {
    o = o || {}; var out = [], mul = {}, i, r, keys = {};
    for (i = 0; i < (k || 3) + 2 && out.length < (k || 3); i++) {
      var oo = {}; for (var kk in o) oo[kk] = o[kk]; oo.mul = mul;
      r = this.route(from, to, oo); if (!r) break;
      if (!keys[r.key]) { keys[r.key] = 1; out.push(r); }
      r.edges.forEach(function (e) { if (e.kind !== 'stand' && e.kind !== 'entry') mul[e.i] = (mul[e.i] || 1) * 2.6; });
    }
    return out;
  };
  /* 표준 유도 흐름(일방통행 권장)의 벌점 — 공항 묶음이 정함(없으면 벌점 없음) */
  ATC.flowPen = function (flowId, hard) { return D.taxiFlow ? D.taxiFlow(flowId, hard) : function () { return 1; }; };
  ATC.Net = Net;

  /* ---------- 지상·활주로 시뮬레이션 기반 ---------- */
  function GroundSim(o) {
    ATC.Sim.call(this, o);
    this.net = new Net(); this.lastDep = {}; this.rwClosed = {}; this.lastArrSpawn = {};
    this.standBusy = {};
  }
  ATC.extend(GroundSim, ATC.Sim);
  GroundSim.prototype.mk = function (o) {
    var f = o.f || this.mkFlight(o.filter), ac = { id: this.nextId++, sim: this, cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf, u: 0, v: 0, du: 1, dv: 0, spd: 0, alt: 0, st: 'gate', path: [], pi: 0, hs: {}, squawk: this.squawk(), born: this.t, owner: 'me' };
    for (var k in o) if (k !== 'f' && k !== 'filter') ac[k] = o[k];
    this.acs.push(ac); this.total++; this.emit('spawn', ac); return ac;
  };
  GroundSim.prototype.place = function (ac, nodeId, du, dv) { var n = D.gN[nodeId]; ac.u = n.u; ac.v = n.v; ac.node = nodeId; if (du !== undefined) { ac.du = du; ac.dv = dv; } };
  GroundSim.prototype.setPath = function (ac, nodes, hs) { ac.path = nodes.slice(); ac.pi = nodes[0] === ac.node ? 1 : 0; ac.hs = hs || {}; };
  /* 경로 위 활주로 횡단 직전의 정지 지점(정지선) 찾기 */
  GroundSim.prototype.autoHolds = function (nodes) { var hs = {}, N = D.gN; for (var i = 1; i < nodes.length - 1; i++) if (N[nodes[i]].hold && N[nodes[i + 1]].rwy) hs[nodes[i]] = N[nodes[i]].rw; return hs; };
  GroundSim.prototype.onGround = function (ac) { return ac.alt < 5 && ac.st !== 'final' && ac.st !== 'air' && ac.st !== 'gone'; };
  GroundSim.prototype.onRwy = function (ac, rwId) { var e = D.ends[D.rw[rwId].a], s = D.rwAlong(e, ac); return this.onGround(ac) && ac.st !== 'gate' && Math.abs(D.rwLat(e, ac)) < 100 && s > -60 && s < e.len + 60; };
  GroundSim.prototype.rwyBusy = function (rwId, except) { for (var i = 0; i < this.acs.length; i++) if (this.acs[i] !== except && this.onRwy(this.acs[i], rwId)) return this.acs[i]; return null; };
  /* 다른 활주로와의 관계(D.rwX) 때문에 지금 이 활주로를 쓰면 안 되게 만드는 항공기.
     - 교차 활주로: 저쪽에서 이륙 활주 · 착륙 활주 중이면서 교차점을 아직 지나지 않았거나, 짧은 최종 접근(1.3NM 안) 중인 항공기
     - 경로가 만나는 활주로: 연장선 쪽에서는 그 끝으로 접근 중이거나 그쪽으로 막 이륙한 항공기, 지나가는 쪽에서는 만나는 점을 아직 지나지 않은 활주 중 항공기 */
  GroundSim.prototype.crossTraffic = function (rwId, except) {
    var X = D.rwX && D.rwX[rwId], self = this, hit = null; if (!X) return null;
    function before(o, other, sx) {          /* 저쪽 활주로(other)에서 a쪽 시단 기준 sx 지점을 아직 지나지 않았는가 */
      var e = D.ends[o.rwy]; if (!e || e.rw !== other) return false;
      var s = e.id === D.rw[other].a ? sx : e.len - sx, at = D.rwAlong(e, o);
      if (o.st === 'roll' || o.st === 'land') return at < s + 60;
      if (o.st === 'air') return o.alt < 400 && at < s;
      if (o.st === 'final') return o.d < 1.3 * NM && s < e.len;
      return false;
    }
    function extSide(o, x) {                 /* 연장선 쪽 활주로에서 만나는 점으로 오고 있는가 */
      var e = D.ends[o.rwy], en = D.ends[x.end]; if (!e || e.rw !== en.rw) return false;
      if (o.st === 'final') { var dd = o.d - en.disp; return e.id === en.id && dd > x.ext - 200 && dd < x.ext + 2.5 * NM; }   /* 활주로 끝에서 잰 거리로 */
      if (e.id === en.id) return false;      /* 반대쪽 끝에서 이륙해 이쪽으로 오는 경우 */
      return (o.st === 'roll' && o.spd > 15 || o.st === 'air' && o.alt < 1500) && D.rwAlong(e, o) < e.len + x.ext;
    }
    /* 내 연장선이 저쪽 활주로를 지나는 경우: 그 지점을 앞으로 지나갈 항공기에게만 해당
       (그쪽 끝으로 접근 중이고 아직 그 지점 전이거나, 반대쪽 끝에서 그쪽으로 이륙하는 경우). 이미 지나온 착륙기 · 반대쪽으로 이륙하는 항공기에는 해당 없음 */
    var ee = except && D.ends[except.rwy], mine = ee && ee.rw === rwId, landing = mine && (except.st === 'final' || except.st === 'land');
    function passes(x) { if (!mine) return true; if (except.rwy === x.end) return except.st === 'final' && except.d - ee.disp >= x.ext; return !landing; }
    Object.keys(X).forEach(function (other) {
      var x = X[other];
      if (x.kind === 'conv' && x.role === 'ext' && !passes(x)) return;
      self.acs.forEach(function (o) {
        if (hit || o === except) return;
        if (x.kind === 'cross' ? before(o, other, x.o) : x.role === 'ext' ? before(o, other, x.o) : extSide(o, x)) hit = o;
      });
    });
    return hit;
  };
  GroundSim.prototype.finals = function (endId) { return this.acs.filter(function (a) { return a.st === 'final' && a.rwy === endId; }).sort(function (a, b) { return a.d - b.d; }); };
  GroundSim.prototype.etaFinal = function (a) { return a.d / (Math.max(a.spd, 60)); };

  /* 지상 이동 한 걸음 */
  GroundSim.prototype.taxiStep = function (ac, dt) {
    var N = D.gN, self = this;
    if (ac.pi >= ac.path.length) { ac.spd = 0; return 'end'; }
    var tn = N[ac.path[ac.pi]], dx = tn.u - ac.u, dy = tn.v - ac.v, dist = Math.hypot(dx, dy);
    /* 다음 정지 지점까지 거리 */
    var stopD = dist, i, a, b, stopNode = null;
    for (i = ac.pi; i < ac.path.length; i++) {
      if (i > ac.pi) { a = N[ac.path[i - 1]]; b = N[ac.path[i]]; stopD += Math.hypot(a.u - b.u, a.v - b.v); }
      if (ac.hs[ac.path[i]] !== undefined || i === ac.path.length - 1) { stopNode = ac.path[i]; break; }
    }
    var prevNode = ac.pi > 0 ? N[ac.path[ac.pi - 1]] : null, ek = 'twy';
    if (prevNode) { var ad = prevNode.adj; for (i = 0; i < ad.length; i++) if (ad[i].to === tn.id) ek = ad[i].e.kind; }
    var vmax = ac.st === 'push' ? 1.9 : (ek === 'lane' || ek === 'stand') ? 6 : ek === 'entry' ? 7 : 11;
    if (ac.st === 'vacate') vmax = 9;
    if (this.lvp && ac.st !== 'push') vmax = Math.min(vmax, ac.st === 'vacate' ? 6 : 7.5);      /* 저시정: 지상 이동 속도를 낮춤 */
    /* 굽은 길 앞에서 감속 */
    if (ac.pi + 1 < ac.path.length && dist < 60) { var n2 = N[ac.path[ac.pi + 1]], c = ((tn.u - ac.u) * (n2.u - tn.u) + (tn.v - ac.v) * (n2.v - tn.v)) / ((dist || 1) * (Math.hypot(n2.u - tn.u, n2.v - tn.v) || 1)); if (c < 0.7) vmax = Math.min(vmax, 5); }
    /* 활주로 위를 지나는 중(정지선 → 활주로 → 건너편 정지선): 멀리 있는 항공기 때문에 활주로 위에 서지 않고 건너편 정지선까지는 감 */
    var tight = !!(prevNode && (tn.rwy && Math.hypot(ac.u - prevNode.u, ac.v - prevNode.v) >= 6 || prevNode.rwy && tn.hold));
    if (tight) { tight = dist; if (tn.rwy && ac.pi + 1 < ac.path.length) { var fh = N[ac.path[ac.pi + 1]]; tight += Math.hypot(fh.u - tn.u, fh.v - tn.v); } }   /* 건너편 정지선까지 거리 */
    var blk = ac.st === 'push' ? null : this.blocked(ac, stopD, tight);
    ac.blk = blk ? blk.id : 0;
    var want = blk ? 0 : Math.min(vmax, Math.sqrt(2 * 1.2 * Math.max(0, stopD - 0.5)) + 0.4);
    if (ac.halt) want = 0;
    if (ac.spd < want) ac.spd = Math.min(want, ac.spd + 0.9 * dt); else ac.spd = Math.max(want, ac.spd - 2.2 * dt);
    var step = ac.spd * dt;
    if (dist > 0.01) { var sx = dx / dist, sy = dy / dist; if (ac.st === 'push') { ac.du = -sx; ac.dv = -sy; } else { var k = Math.min(1, dt * 1.6); ac.du += (sx - ac.du) * k; ac.dv += (sy - ac.dv) * k; var m = Math.hypot(ac.du, ac.dv) || 1; ac.du /= m; ac.dv /= m; } }
    if (step >= dist) {
      ac.u = tn.u; ac.v = tn.v; ac.node = tn.id; ac.pi++;
      if (ac.hs[tn.id] !== undefined && ac.pi < ac.path.length) { ac.spd = 0; return 'hs'; }
      if (ac.pi >= ac.path.length) { ac.spd = 0; return 'end'; }
      return 'node';
    }
    if (dist > 0) { ac.u += dx / dist * step; ac.v += dy / dist * step; }
    return blk ? 'blk' : 'move';
  };
  /* 앞길 막힘 검사: 경로 앞쪽 110m 안에 다른 항공기가 있으면 조종사가 스스로 멈춤 */
  GroundSim.prototype.blocked = function (ac, stopD, tight) {
    var N = D.gN, pts = [], rem = [30, 55, 80, 108], u = ac.u, v = ac.v, i = ac.pi, walked = 0, ri = 0;
    /* 활주로를 건너기 직전(정지선에 서 있고 다음이 활주로): 건너편까지 길이 비어 있어야 출발 — 활주로 위에 멈춰 서는 일을 막음 */
    var here = N[ac.node], nxt = N[ac.path[ac.pi]];
    if (here && here.hold && nxt && nxt.rwy && ac.pi + 1 < ac.path.length && Math.hypot(u - here.u, v - here.v) < 6) { rem = [30, 55, 80, 108, 140, 175, 210, 250, 290, 330]; stopD = Math.max(stopD, 330); }
    while (ri < rem.length && i < ac.path.length) {
      var n = N[ac.path[i]], dl = Math.hypot(n.u - u, n.v - v);
      while (ri < rem.length && walked + dl >= rem[ri]) { var f = (rem[ri] - walked) / (dl || 1); if (rem[ri] <= stopD + 20 && !(tight && rem[ri] > tight + 5)) pts.push([u + (n.u - u) * f, v + (n.v - v) * f]); ri++; }
      walked += dl; u = n.u; v = n.v; i++;
    }
    if (!pts.length) return null;
    for (var j = 0; j < this.acs.length; j++) {
      var o = this.acs[j]; if (o === ac || !this.onGround(o)) continue;
      if (o.st === 'gate' && !(ac.path.length && D.gN[ac.path[ac.path.length - 1]].stand && Math.hypot(o.u - D.gN[ac.path[ac.path.length - 1]].u, o.v - D.gN[ac.path[ac.path.length - 1]].v) < 5)) continue;
      if (o.st === 'roll' || o.st === 'land') continue;
      var R = tight ? 10 + (o.perf.len + ac.perf.len) / 4 : 26 + (o.perf.len + ac.perf.len) / 3.2;
      for (var p = 0; p < pts.length; p++) if (Math.hypot(pts[p][0] - o.u, pts[p][1] - o.v) < R) {
        if (o.blk === ac.id && (o.st === 'taxi' || o.st === 'vacate' || o.st === 'lineup')) {            /* 서로 막음 */
          var cos = ac.du * o.du + ac.dv * o.dv;
          if (cos < -0.6) { ac.grid = 1; return o; }
          if (ac.id < o.id) continue;
        }
        ac.grid = 0; return o;
      }
    }
    ac.grid = 0; return null;
  };

  /* 착륙 접근(1차원) */
  GroundSim.prototype.spawnFinal = function (endId, o) {
    var e = D.ends[endId]; o = o || {};
    var ac = this.mk({ f: o.f, filter: o.filter, kind: 'arr', st: 'final', rwy: endId, d: (o.dNM || 10) * NM, v: e.tdV, du: e.du, dv: e.dv, clr: false, stand: o.stand, owner: o.owner || 'me' });
    ac.spd = 175 * KT; ac.alt = ATC.gsAlt(ac.d / NM); ac.u = e.tdU - e.du * ac.d; ac.v = e.tdV - e.dv * ac.d; for (var k in o) if (k !== 'f' && k !== 'filter' && k !== 'dNM') ac[k] = o[k];
    return ac;
  };
  GroundSim.prototype.finalStep = function (ac, dt) {
    var e = D.ends[ac.rwy], dn = ac.d / NM, p = ac.perf, tgt = (dn < 4.6 || ac.minSpd) ? p.vapp : dn < 7 ? Math.min(165, p.vapp + 25) : 175;
    if (ac.maxSpd) tgt = Math.min(tgt, ac.maxSpd);
    tgt *= KT; if (ac.spd > tgt) ac.spd = Math.max(tgt, ac.spd - 0.7 * dt); else ac.spd = Math.min(tgt, ac.spd + 0.5 * dt);
    var before = ac.d; ac.d -= ac.spd * dt; ac.alt = ATC.gsAlt(Math.max(0, ac.d) / NM) - 50; ac.u = e.tdU - e.du * ac.d; ac.v = e.tdV - e.dv * ac.d;
    if (before > 900 && ac.d <= 900) return 'short';
    if (ac.d <= 0) return 'td';
    return '';
  };
  GroundSim.prototype.touchdown = function (ac) {
    var e = D.ends[ac.rwy], v0 = ac.spd, i, ex = null, need = (v0 * v0 - 144) / (2 * 1.75) + 280 + e.disp, exits = this.exitsFor(ac);
    for (i = 0; i < exits.length; i++) { var h = D.holds[exits[i]], dd = D.rwAlong(e, D.gN[h.rnode]); if (dd >= need) { ex = h; break; } }
    if (!ex) ex = D.holds[exits[exits.length - 1]];
    ac.st = 'land'; ac.alt = 0; ac.d = 0; ac.exit = ex.name; ac.exitS = D.rwAlong(e, D.gN[ex.rnode]); ac.tdT = this.t; ac.u = e.tdU; ac.v = e.tdV;
    ac.dec = Math.min(2.4, (v0 * v0 - 144) / (2 * Math.max(200, ac.exitS - e.disp - 330)));
  };
  /* 착륙 뒤 빠져나갈 유도로 후보(가까운 것부터). 활주로 양쪽에 유도로가 있는 공항은 묶음의 D.exitList가 주기장 쪽을 고름 */
  GroundSim.prototype.exitsFor = function (ac) { var e = D.ends[ac.rwy]; return (D.exitList && D.exitList(e, ac)) || e.exits; };
  /* 이륙 전 대기 지점 후보(첫 번째 = 활주로 전체 길이). 활주로 양쪽에서 들어갈 수 있는 공항은 묶음의 D.holdList가 주기장 쪽을 고름 */
  GroundSim.prototype.holdsFor = function (ac, rwy) { var e = D.ends[rwy || ac.rwy]; return (D.holdList && D.holdList(e, ac)) || e.holds; };
  GroundSim.prototype.landStep = function (ac, dt) {
    var e = D.ends[ac.rwy], rem = ac.exitS - D.rwAlong(e, ac);
    if (this.t - ac.tdT > 4 && ac.spd > 12 && rem < (ac.spd * ac.spd - 144) / (2 * ac.dec) + 40) ac.spd = Math.max(12, ac.spd - ac.dec * dt);
    if (rem < 60) ac.spd = Math.max(8, ac.spd - 1.5 * dt);
    ac.u += e.du * ac.spd * dt; ac.v += e.dv * ac.spd * dt;
    if (rem <= ac.spd * dt + 1) {
      var h = D.holds[ac.exit]; ac.u = D.gN[h.rnode].u; ac.v = D.gN[h.rnode].v; ac.node = h.rnode; ac.st = 'vacate'; this.setPath(ac, [h.rnode, h.node, h.anode], {}); return 'exit';
    }
    return '';
  };
  /* 이륙 */
  GroundSim.prototype.rollStep = function (ac, dt) {
    var e = D.ends[ac.rwy], p = ac.perf;
    if (ac.alt <= 0) { ac.spd += p.acc * dt; if (ac.spd >= p.vr) { ac.alt = 1; ac.liftT = this.t; ac.st = 'air'; this.lastDep[e.rw] = { t: this.t, wake: ac.wake, full: !ac.inter, cs: ac.cs }; return 'lift'; } }
    ac.u += e.du * ac.spd * dt; ac.v += e.dv * ac.spd * dt; return '';
  };
  GroundSim.prototype.airStep = function (ac, dt) {
    var e = D.ends[ac.rwy], p = ac.perf; ac.alt += p.climb / 60 * dt * (ac.goAround ? 0.8 : 1); if (ac.alt > (ac.maxAlt || 6000)) ac.alt = ac.maxAlt || 6000;
    ac.spd = Math.min(ac.spd + 0.8 * dt, 220 * KT); ac.u += e.du * ac.spd * dt; ac.v += e.dv * ac.spd * dt;
  };
  /* 복행 */
  GroundSim.prototype.goAround = function (ac, why, said) {
    ac.st = 'air'; ac.goAround = true; ac.maxAlt = 3000; ac.clr = false; ac.gaT = this.t; ac.gaWhy = why; ac.alt = Math.max(ac.alt, 60);
    if (!said) this.say(ac, ATC.csSay(ac) + ', going around' + (why ? ', ' + why : '') + '.', { kind: 'warn', front: true });
  };
  GroundSim.prototype.moveGround = function (dt) {
    var acs = this.acs.slice(), i, a, r;
    for (i = 0; i < acs.length; i++) {
      a = acs[i]; if (a.gone) continue;
      switch (a.st) {
        case 'final': r = this.finalStep(a, dt); if (r) this.onFinalEvt(a, r); break;
        case 'land': r = this.landStep(a, dt); break;
        case 'roll': r = this.rollStep(a, dt); if (r === 'lift' && this.onLift) this.onLift(a); break;
        case 'air': this.airStep(a, dt); if (Math.abs(a.u) > 24000 || Math.abs(a.v) > 24000) this.onAirOut(a); break;      /* 남북으로 놓인 활주로에서 뜬 항공기는 v쪽으로 멀어짐 */
        case 'push': case 'taxi': case 'vacate': case 'lineup': case 'cross':
          r = this.taxiStep(a, dt);
          if (r === 'end' || r === 'hs') this.onPathEvt(a, r);
          else if (r === 'node' && this.onNode) this.onNode(a);
          else if (r === 'blk') this.onBlocked(a);
          break;
      }
    }
  };
  GroundSim.prototype.onBlocked = function (a) {
    var o = this.byId(a.blk); if (!o) return;
    if (a.grid > 0) {
      a.gridT = (a.gridT || 0) + 1;
      if (!a.gridHit && a.spd < 0.1 && o.spd < 0.1) { a.gridClock = a.gridClock || this.t; if (this.t - a.gridClock > 18) { a.gridHit = o.gridHit = true; this.gridlock(a, o); } }
      return;
    }
    a.gridClock = 0;
    if (a.spd > 0.2) return;
    var cos = a.du * o.du + a.dv * o.dv, queue = cos > 0.6 && (o.st === 'taxi' || o.st === 'athold' || o.st === 'lineup' || o.st === 'reqtaxi' && o.kind === 'arr' || o.st === 'cross' || o.st === 'vacate');
    if (queue && !(o.st === 'reqtaxi')) return;
    var key = o.id; a.stopSeen = a.stopSeen || {};
    if (!a.stopSeen[key] && a.st === 'taxi') { a.stopClock = a.stopClock || this.t; if (this.t - a.stopClock > 6) { a.stopSeen[key] = 1; a.stopClock = 0; if (this.onStop) this.onStop(a, o); } }
  };
  GroundSim.prototype.gridlock = function (a, o) {
    this.inc('gridlock', [a, o], ATC.T('{0} · {1} 유도로에서 마주 보고 정지했습니다(교착). 견인차로 한 대를 이동시킵니다.', a.cs, o.cs));
    var late = (a.taxiT || 0) > (o.taxiT || 0) ? a : o; this.sys(ATC.T('{0} 견인 조치 — 운항 지연.', late.cs), 'warn'); this.remove(late, false);
  };
  /* ---------- 공통 도우미: 주기장 배정 · 표준 경로 · 주기 ---------- */
  GroundSim.prototype.pickStand = function (f, side) {
    var SG = D.standGroups, grp = f.al.cargo ? SG.cargo : f.al.ga ? SG.ga : side && D.rwStands[side] ? [D.rwStands[side]] : SG.pax, self = this;
    var all = Object.keys(D.stands), c = all.filter(function (s) { return grp.indexOf(D.stands[s].grp) >= 0 && !self.standBusy[s]; });
    if (!c.length) c = all.filter(function (s) { return !self.standBusy[s] && SG.cargo.indexOf(D.stands[s].grp) < 0; });
    if (!c.length) return null;
    var s = this.rng.pick(c); this.standBusy[s] = 1; return s;
  };
  /* 편의 방면 · 공항 · 주기장을 함께 정함(묶음에 D.planFlight가 있을 때). 돌려주는 값: { gate, ap: [ICAO, 이름], intl, rwy, stand } — 주기장이 없으면 stand = null */
  GroundSim.prototype.plan = function (f, kind, rwy) {
    if (!D.planFlight) return null;
    var p = D.planFlight(this, f, kind, rwy), self = this, all = Object.keys(D.stands), pax = !f.al.cargo && !f.al.ga;
    function free(test) { return all.filter(function (s) { return !self.standBusy[s] && test(D.stands[s]); }); }
    var c = free(function (s) { return p.grp.indexOf(s.grp) >= 0; });
    if (!c.length && pax) c = free(function (s) { return D.standGroups.pax.indexOf(s.grp) >= 0 && !!s.intl === p.intl; });
    if (!c.length && pax) c = free(function (s) { return D.standGroups.pax.indexOf(s.grp) >= 0; });
    p.stand = c.length ? this.rng.pick(c) : null; if (p.stand) this.standBusy[p.stand] = 1;
    return p;
  };
  /* 푸시백을 마친 기수 방향(이름 → 지상 좌표 벡터). 공항 축이 다르면 묶음의 D.faceVec */
  GroundSim.prototype.faceDir = function (face) { var V = D.faceVec || { east: [1, 0], west: [-1, 0], north: [0, 1], south: [0, -1] }; return V[face] || V.west || [-1, 0]; };
  GroundSim.prototype.aiRoute = function (from, to, rwyOk) {
    return this.net.route(from, to, { pen: ATC.flowPen(this.flow.id, true), rwyOk: rwyOk }) || this.net.route(from, to, { pen: ATC.flowPen(this.flow.id, false), rwyOk: rwyOk }) || this.net.route(from, to, { rwyOk: true });
  };
  GroundSim.prototype.standDir = function (name) { var s = D.stands[name], l = D.gN[s.lane], m = Math.hypot(s.u - l.u, s.v - l.v) || 1; return [(s.u - l.u) / m, (s.v - l.v) / m]; };
  GroundSim.prototype.park = function (ac) { ac.st = 'gate'; ac.spd = 0; ac.parkT = this.t; ac.parked = true; var d = this.standDir(ac.stand); ac.du = d[0]; ac.dv = d[1]; };
  GroundSim.prototype.needsCross = function (nodes) { for (var i = 0; i < nodes.length; i++) if (D.gN[nodes[i]].rwy) return true; return false; };
  /* 활주로 사용 판단용: 그 활주로(양 끝 포함)의 가장 가까운 착륙기 */
  GroundSim.prototype.nextArr = function (rwId) { var best = null; this.acs.forEach(function (a) { if (a.st === 'final' && D.ends[a.rwy].rw === rwId && (!best || a.d < best.d)) best = a; }); return best; };
  GroundSim.prototype.wakeGap = function (ac, rwId) {
    var ld = this.lastDep[rwId]; if (!ld) return 0;
    var need = (ld.wake === 'H' && ac.wake !== 'H') || (ld.wake === 'M' && ac.wake === 'L') ? ((ac.inter && ld.full) ? 180 : 120) : 0;
    return Math.max(0, need - (this.t - ld.t));
  };
  ATC.GroundSim = GroundSim; ATC.KT = KT; ATC.NMm = NM;
})(typeof globalThis !== 'undefined' ? globalThis : this);
