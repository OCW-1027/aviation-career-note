/* AIRLINE SAGA — ATC 화면 그리기: 레이더 스코프 · 지상 감시 화면 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt, D2R = Math.PI / 180, NM = 1852;
  var R = ATC.R = {};
  var MONO = '"Roboto Mono","DejaVu Sans Mono","Consolas","Menlo",monospace';
  var C = R.C = {
    bg: '#05090e', ring: '#132030', map: '#1d3044', fix: '#4a6a86', fixT: '#6c8aa6', rwy: '#c8d6e4', loc: '#2f5273',
    mine: '#dff5e4', inn: '#ffd24a', out: '#647a8c', emg: '#ff6b6b', sel: '#4fd8ff', ca: '#ff3b3b', stca: '#ffae2b', dep: '#bfe0ff', arr: '#f7efc4',
    grass: '#18261b', grass2: '#1c2c1f', pave: '#3a4047', apron: '#474e56', rw: '#23272c', line: '#d2a92a', white: '#e9edf1', bld: '#70787f', bld2: '#8a939b'
  };

  /* 표지(라벨) 자리 잡기: 다른 표지·항공기 그림·고정 표시와 가장 덜 겹치는 자리를 고름. 한 번 정한 자리는 겹칠 때만 옮김 */
  function ov(ax, ay, aw, ah, bx, by, bw, bh) { var w = Math.min(ax + aw, bx + bw) - Math.max(ax, bx), h = Math.min(ay + ah, by + bh) - Math.max(ay, by); return w > 0 && h > 0 ? w * h : 0; }
  R.place = function (items, W, H, obs, selId) {
    var placed = [], order = items.slice().sort(function (a, b) { return (b.id === selId) - (a.id === selId) || a.id - b.id; }), BASE = [0, 30, 60, 30, 90, 90, 130, 130, 240, 270, 300, 270];
    order.forEach(function (it) {
      var g = it.g, w = it.w, h = it.h, px = it.px, py = it.py, f = 2.1, best = -1, bc = 1e12, c, i, k, x, y, cost;
      var cand = [[px + g, py - g - h], [px + g, py + g], [px - g - w, py + g], [px - g - w, py - g - h], [px + g + 8, py - h / 2], [px - g - 8 - w, py - h / 2], [px - w / 2, py - g - 10 - h], [px - w / 2, py + g + 10],
        [px + g * f, py - g * f - h], [px + g * f, py + g * f], [px - g * f - w, py + g * f], [px - g * f - w, py - g * f - h]];
      for (c = 0; c < cand.length; c++) {
        x = cand[c][0]; y = cand[c][1]; cost = BASE[c] + (c === it.prev ? 0 : 420);
        cost += 6 * (w * h - ov(x, y, w, h, 2, 2, W - 4, H - 4));
        for (i = 0; i < placed.length; i++) cost += 4 * ov(x, y, w, h, placed[i].x - 2, placed[i].y - 2, placed[i].w + 4, placed[i].h + 4);
        for (i = 0; i < items.length; i++) { k = items[i]; if (k !== it) cost += 3 * ov(x, y, w, h, k.px - k.r, k.py - k.r, k.r * 2, k.r * 2); }
        for (i = 0; i < obs.length; i++) cost += (obs[i].wt || 2) * ov(x, y, w, h, obs[i].x, obs[i].y, obs[i].w, obs[i].h);
        if (cost < bc) { bc = cost; best = c; }
      }
      it.pos = best; it.x = cand[best][0]; it.y = cand[best][1]; placed.push(it);
    });
  };
  function leader(ctx, it, col) { var tx = U.clamp(it.px, it.x, it.x + it.w), ty = U.clamp(it.py, it.y, it.y + it.h), d = Math.hypot(tx - it.px, ty - it.py) || 1, r0 = Math.min(it.r * 0.6, d); ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(it.px + (tx - it.px) / d * r0, it.py + (ty - it.py) / d * r0); ctx.lineTo(tx, ty); ctx.stroke(); }

  /* ================= 레이더 ================= */
  R.radarView = function (mode) { return mode === 'ACC' ? { cx: 0, cy: 0, scale: 3.1, min: 1.6, max: 14 } : { cx: 0, cy: 0, scale: 8.2, min: 4, max: 40 }; };
  R.fitRadar = function (v, W, H, mode) { var ext = mode === 'ACC' ? [286, 216] : [98, 98]; v.scale = Math.min(W / ext[0], H / ext[1]); v.cx = 0; v.cy = 0; };
  function rs(v, W, H, p) { return [W / 2 + (p.x - v.cx) * v.scale, H / 2 - (p.y - v.cy) * v.scale]; }
  R.radarToWorld = function (v, W, H, sx, sy) { return { x: (sx - W / 2) / v.scale + v.cx, y: -(sy - H / 2) / v.scale + v.cy }; };
  R.rs = rs;

  R.drawRadar = function (ctx, W, H, app) {
    var sim = app.sim, v = app.view, acc = sim.mode === 'ACC', i, p, q, k, now = performance.now();
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 1; ctx.font = '10px ' + MONO; ctx.textBaseline = 'middle';
    var o = rs(v, W, H, { x: 0, y: 0 });
    /* 거리 원 */
    ctx.strokeStyle = C.ring; var step = acc ? 50 : 10, maxR = acc ? 200 : 60;
    for (i = step; i <= maxR; i += step) { ctx.beginPath(); ctx.arc(o[0], o[1], i * v.scale, 0, 7); ctx.stroke(); ctx.fillStyle = '#22364a'; ctx.fillText(i, o[0] + 3, o[1] - i * v.scale + 7); }
    if (acc) {
      /* 구역 경계 · 항로 · TMA */
      var B = D.acc, a = rs(v, W, H, { x: B.x1, y: B.y2 }), b = rs(v, W, H, { x: B.x2, y: B.y1 });
      ctx.strokeStyle = '#2c5a7c'; ctx.setLineDash([10, 5]); ctx.lineWidth = 1.4; ctx.strokeRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); ctx.setLineDash([]);
      ctx.fillStyle = '#2c5a7c'; ctx.font = '11px ' + MONO; ctx.fillText('SEIRA FIR / ACC', a[0] + 8, a[1] + 12);
      [['W', B.x1 - 2, 0, 'right'], ['E', B.x2 + 2, 0, 'left'], ['N', 0, B.y2 + 5, 'center'], ['S', 0, B.y1 - 5, 'center']].forEach(function (s) { var pp = rs(v, W, H, { x: s[1], y: s[2] }); ctx.textAlign = s[3]; ctx.fillStyle = '#35556f'; ctx.fillText(D.neighbor[s[0]].n.toUpperCase(), pp[0], pp[1]); }); ctx.textAlign = 'left';
      ctx.strokeStyle = C.map; ctx.lineWidth = 1;
      D.airways.forEach(function (aw) { ctx.beginPath(); aw.f.forEach(function (n, ix) { var pp = rs(v, W, H, D.fix[n]); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.stroke(); var m0 = D.fix[aw.f[0]], m1 = D.fix[aw.f[1]], mm = rs(v, W, H, { x: (m0.x * 2 + m1.x) / 3, y: (m0.y * 2 + m1.y) / 3 }); ctx.fillStyle = '#2b4860'; ctx.fillText(aw.n, mm[0] + 4, mm[1] - 6); });
      Object.keys(D.accArr).forEach(function (g) { D.accArr[g].forEach(function (bf) { line(ctx, rs(v, W, H, D.fix[bf]), rs(v, W, H, D.fix[g]), '#172a3a', [3, 5]); }); });
      Object.keys(D.accDep).forEach(function (g) { D.accDep[g].forEach(function (bf) { line(ctx, rs(v, W, H, D.fix[g]), rs(v, W, H, D.fix[bf]), '#172a3a', [3, 5]); }); });
      ctx.strokeStyle = '#27506e'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(o[0], o[1], D.tmaR * v.scale, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#27506e'; ctx.fillText(D.airport.call.toUpperCase() + ' TMA  SFC-' + ATC.fmt.alt(D.tmaTop), o[0] - 58, o[1] + D.tmaR * v.scale - 9);
      var rp = D.restricted.pts; ctx.beginPath(); rp.forEach(function (pt, ix) { var pp = rs(v, W, H, pt); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.closePath();
      if (sim.rActive) { ctx.fillStyle = 'rgba(255,70,70,.13)'; ctx.fill(); ctx.strokeStyle = '#ff5b5b'; } else ctx.strokeStyle = '#3a3140';
      ctx.setLineDash([5, 3]); ctx.stroke(); ctx.setLineDash([]); p = rs(v, W, H, rp[3]); ctx.fillStyle = sim.rActive ? '#ff7b7b' : '#4b4152'; ctx.fillText(D.restricted.n + (sim.rActive ? ' ACTIVE SFC-FL350' : ''), p[0] + 4, p[1] + 10);
    } else {
      ctx.strokeStyle = '#27506e'; ctx.setLineDash([8, 5]); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(o[0], o[1], D.tmaR * v.scale, 0, 7); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
      /* STAR · SID */
      var st = D.star[sim.flow.id];
      Object.keys(st).forEach(function (g) { ctx.strokeStyle = '#1b3348'; ctx.beginPath(); st[g].forEach(function (n, ix) { var pp = rs(v, W, H, D.fix[n]); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.stroke(); });
      var de = D.ends[sim.flow.dep], d3 = D.off(de.end, de.crs, 3);
      Object.keys(D.gateDest).forEach(function (g) { line(ctx, rs(v, W, H, d3), rs(v, W, H, D.fix[g]), '#15283a', [2, 5]); });
      /* MVA */
      D.mva.forEach(function (m) { var c = rs(v, W, H, m.c); ctx.strokeStyle = '#5a4a2a'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(c[0], c[1], m.r * v.scale, 0, 7); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#8a7340'; ctx.fillText('MVA ' + (m.alt / 100), c[0] - 18, c[1]); ctx.fillStyle = '#5a4a2a'; ctx.fillText('▲' + m.peak, c[0] - 16, c[1] + 12); });
      /* 로컬라이저(연장 중심선 15NM, 1NM 눈금) */
      Object.keys(D.ends).forEach(function (id) {
        var e = D.ends[id], act = (sim.rwys || []).indexOf(id) >= 0, t0 = rs(v, W, H, e.thr), t1 = rs(v, W, H, D.off(e.thr, e.crs + 180, 16));
        if (!act && id !== sim.flow.dep) return;
        if (act) { line(ctx, t0, t1, C.loc, [9, 4]); for (k = 2; k <= 16; k += 2) { var tp = D.off(e.thr, e.crs + 180, k), l1 = rs(v, W, H, D.off(tp, e.crs + 90, k % 10 === 0 ? 0.7 : 0.35)), l2 = rs(v, W, H, D.off(tp, e.crs - 90, k % 10 === 0 ? 0.7 : 0.35)); line(ctx, l1, l2, C.loc); } }
      });
    }
    /* 활주로 */
    ctx.strokeStyle = C.rwy; ctx.lineWidth = Math.max(1.6, v.scale * 0.05);
    Object.keys(D.rw).forEach(function (id) { var r = D.rw[id], a2 = rs(v, W, H, D.uv2xy(r.ua, r.va)), b2 = rs(v, W, H, D.uv2xy(r.ub, r.vb)); ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke(); });
    ctx.lineWidth = 1;
    /* 지점 */
    ctx.font = '10px ' + MONO;
    Object.keys(D.fix).forEach(function (n) {
      var f = D.fix[n]; f._on = false; if (acc ? (f.k === 'if' || f.k === 'faf' || f.k === 'base' || f.k === 'dw') : (f.k === 'bd' || f.k === 'en')) return;
      if (!acc && (f.k === 'if' || f.k === 'faf')) { var own = Object.keys(D.ends).filter(function (id) { return D.ends[id].IF === n || D.ends[id].FAF === n; })[0]; if ((sim.rwys || []).indexOf(own) < 0) return; }
      if (!acc && (f.k === 'base' || f.k === 'dw')) { var used = false; var ss = D.star[sim.flow.id]; Object.keys(ss).forEach(function (g) { if (ss[g].indexOf(n) >= 0) used = true; }); if (!used) return; }
      var pp = rs(v, W, H, f); if (pp[0] < -40 || pp[0] > W + 40 || pp[1] < -20 || pp[1] > H + 20) return;
      var col = f.k === 'in' ? '#7d8f4e' : f.k === 'out' ? '#4e7f8f' : C.fix; ctx.strokeStyle = col; ctx.fillStyle = col;
      ctx.beginPath(); if (f.k === 'vor') { ctx.arc(pp[0], pp[1], 4, 0, 7); } else { ctx.moveTo(pp[0], pp[1] - 4); ctx.lineTo(pp[0] + 4, pp[1] + 3); ctx.lineTo(pp[0] - 4, pp[1] + 3); ctx.closePath(); } ctx.stroke();
      var fy = pp[1] + (f.k === 'faf' ? 9 : -6), fw = n.length * 6.2 + 2, hid = false, li;
      if (app.hoverFix !== n && R._lab) for (li = 0; li < R._lab.length; li++) if (ov(pp[0] + 6, fy - 6, fw, 12, R._lab[li].x - 2, R._lab[li].y - 2, R._lab[li].w + 4, R._lab[li].h + 4) > 0) { hid = true; break; }
      if (!hid) { ctx.fillStyle = app.hoverFix === n ? C.sel : (f.k === 'in' ? '#9bb062' : f.k === 'out' ? '#62a0b4' : C.fixT); ctx.fillText(n, pp[0] + 7, fy); }
      f._sx = pp[0]; f._sy = pp[1]; f._on = !hid;
    });
    /* 악기상 */
    (sim.wx || []).forEach(function (w) { var c = rs(v, W, H, w), rr = w.r * v.scale, g = ctx.createRadialGradient(c[0], c[1], rr * 0.15, c[0], c[1], rr); g.addColorStop(0, 'rgba(255,60,60,.55)'); g.addColorStop(0.55, 'rgba(255,170,40,.32)'); g.addColorStop(1, 'rgba(240,220,60,.05)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c[0], c[1], rr, 0, 7); ctx.fill(); ctx.fillStyle = '#ffb347'; ctx.fillText('CB', c[0] - 6, c[1]); });
    /* 선택 항공기의 예정 경로 · 분리 원 */
    var sel = sim.byId(app.sel);
    if (sel && !sel.gone) {
      p = rs(v, W, H, { x: sel.rx, y: sel.ry });
      if (sel.nav.mode === 'route') { ctx.strokeStyle = 'rgba(79,216,255,.55)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(p[0], p[1]); for (i = sel.nav.i; i < sel.nav.route.length; i++) { q = rs(v, W, H, D.fix[sel.nav.route[i]]); ctx.lineTo(q[0], q[1]); } ctx.stroke(); ctx.setLineDash([]); }
      else { q = rs(v, W, H, D.off({ x: sel.rx, y: sel.ry }, sel.tHdg, sel.gs / 60 * 3)); line(ctx, p, q, 'rgba(79,216,255,.5)', [4, 4]); }
      ctx.strokeStyle = 'rgba(79,216,255,.35)'; ctx.beginPath(); ctx.arc(p[0], p[1], sim.minH * v.scale, 0, 7); ctx.stroke();
      if (app.hdgAim) { q = [app.mx, app.my]; line(ctx, p, q, C.sel); var wq = R.radarToWorld(v, W, H, app.mx, app.my), hh = U.r5(U.brg({ x: sel.rx, y: sel.ry }, wq)); ctx.fillStyle = C.sel; ctx.font = 'bold 12px ' + MONO; ctx.fillText('HDG ' + fmt.hdg(hh), q[0] + 10, q[1] - 10); ctx.font = '10px ' + MONO; }
    }
    /* 충돌 경고선 */
    sim.alerts.stca.forEach(function (pr) { line(ctx, rs(v, W, H, { x: pr[0].rx, y: pr[0].ry }), rs(v, W, H, { x: pr[1].rx, y: pr[1].ry }), C.stca, [3, 3]); });
    sim.alerts.ca.forEach(function (pr) { line(ctx, rs(v, W, H, { x: pr[0].rx, y: pr[0].ry }), rs(v, W, H, { x: pr[1].rx, y: pr[1].ry }), C.ca); });
    /* 표적 */
    var blink = Math.floor(now / 450) % 2 === 0, caSet = {}, stSet = {};
    sim.alerts.ca.forEach(function (pr) { caSet[pr[0].id] = caSet[pr[1].id] = 1; }); sim.alerts.stca.forEach(function (pr) { stSet[pr[0].id] = stSet[pr[1].id] = 1; });
    var msaw = {}; sim.alerts.msaw.forEach(function (a) { msaw[a.id] = 1; });
    app.hit = [];
    var items = [], fobs = [];
    Object.keys(D.fix).forEach(function (n) { var f = D.fix[n]; if (f._sx !== undefined && f._on) fobs.push({ x: f._sx + 5, y: f._sy - 12, w: n.length * 6.2 + 4, h: 12, wt: 0.8 }); });
    fobs.push({ x: 0, y: 0, w: 350, h: 44, wt: 3 });
    sim.acs.forEach(function (a) {
      var pp = rs(v, W, H, { x: a.rx, y: a.ry }), col = a.emg ? C.emg : a.owner === 'in' ? C.inn : a.owner === 'out' ? C.out : (a.kind === 'dep' ? C.dep : a.kind === 'arr' ? C.arr : C.mine);
      if (a.owner === 'in' && !blink) col = '#8a7430';
      var tr = a.rvs > 200 ? '↑' : a.rvs < -200 ? '↓' : '=', l1 = a.cs + (a.wake === 'H' ? ' H' : a.wake === 'L' ? ' L' : '') + (a.squawk === '7700' ? ' 7700' : a.squawk === '7600' ? ' 7600' : ''), l2, l3;
      var asg = a.appr && a.appr.gs ? 'ILS' : U.pad(Math.round(a.tAlt / 100), 3);
      l2 = U.pad(Math.round(a.ralt / 100), 3) + tr + asg + (a.appr && !a.appr.gs ? (a.appr.loc ? ' LOC' : ' APP') : '');
      l3 = U.pad(Math.round(a.rgs / 10), 2) + ' ' + a.type + ' ' + (acc ? (a.kind === 'arr' || a.divert ? a.gate : a.exitFix || '') : (a.kind === 'arr' ? a.rwy : a.gate));
      ctx.font = (a.id === app.sel ? 'bold ' : '') + '11px ' + MONO;
      var tw = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width, ctx.measureText(l3).width) + 8;
      items.push({ id: a.id, a: a, px: pp[0], py: pp[1], w: tw, h: 42, r: 9, g: 20, prev: a._lp, col: col, l: [l1, l2, l3] });
    });
    R.place(items, W, H, fobs, app.sel);
    R._lab = items.map(function (it) { return { x: it.x, y: it.y, w: it.w, h: it.h }; });
    items.forEach(function (it) {
      var a = it.a, pp = [it.px, it.py], col = it.col, bx = it.x, by = it.y, tw = it.w; a._lp = it.pos;
      /* 항적 */
      for (k = 0; k < a.hist.length - 1; k++) { var hp = rs(v, W, H, a.hist[k]); ctx.fillStyle = col; ctx.globalAlpha = 0.18 + 0.1 * k; ctx.fillRect(hp[0] - 1.2, hp[1] - 1.2, 2.4, 2.4); } ctx.globalAlpha = 1;
      /* 속도 벡터(1분) */
      var vq = rs(v, W, H, D.off({ x: a.rx, y: a.ry }, a.rhdg, a.rgs / 60)); line(ctx, pp, vq, col);
      ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.strokeRect(pp[0] - 3.5, pp[1] - 3.5, 7, 7); ctx.lineWidth = 1;
      if (caSet[a.id] && blink) { ctx.strokeStyle = C.ca; ctx.lineWidth = 2; ctx.strokeRect(pp[0] - 8, pp[1] - 8, 16, 16); ctx.lineWidth = 1; }
      leader(ctx, it, col);
      var hot = a.id === app.sel || stSet[a.id] || caSet[a.id] || msaw[a.id];
      ctx.fillStyle = hot ? 'rgba(5,9,14,.9)' : 'rgba(5,9,14,.62)'; ctx.fillRect(bx, by, tw, it.h);
      if (hot) { ctx.strokeStyle = caSet[a.id] || msaw[a.id] ? C.ca : stSet[a.id] ? C.stca : C.sel; ctx.strokeRect(bx - 0.5, by - 0.5, tw + 1, it.h + 1); }
      ctx.font = (a.id === app.sel ? 'bold ' : '') + '11px ' + MONO;
      ctx.fillStyle = col; ctx.fillText(it.l[0], bx + 4, by + 8); ctx.fillText(it.l[1], bx + 4, by + 21); ctx.fillStyle = a.id === app.sel ? col : shade(col); ctx.fillText(it.l[2], bx + 4, by + 34);
      if (a.waiting && a.owner === 'me') { ctx.fillStyle = a.emg ? C.emg : C.inn; ctx.beginPath(); ctx.arc(bx + tw - 5, by + 7, 3, 0, 7); ctx.fill(); }
      if (msaw[a.id]) { ctx.fillStyle = C.ca; ctx.fillText('LOW ALT', bx + 4, by + it.h + 8); }
      app.hit.push({ id: a.id, x0: bx - 2, y0: by - 2, x1: bx + tw + 2, y1: by + it.h + 2, px: pp[0], py: pp[1] });
    });
    /* 축척 · 정보 */
    ctx.fillStyle = '#35556f'; ctx.font = '10px ' + MONO; var sb = (acc ? 20 : 5) * v.scale; ctx.fillRect(14, H - 16, sb, 2); ctx.fillText((acc ? 20 : 5) + ' NM', 18 + sb, H - 15);
    ctx.fillText('RADAR UPDATE ' + sim.sweep + 's · SEP ' + sim.minH + 'NM/1000ft', 14, H - 30);
  };
  function shade(c) { return c === C.emg ? '#c75252' : c === C.out ? '#4c5f6f' : '#9fb3a6'; }
  function line(ctx, a, b, col, dash) { ctx.strokeStyle = col; if (dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); if (dash) ctx.setLineDash([]); }
  /* 데이터 블록 위치: 주변 표적이 적은 쪽으로 */
  R.placeLabels = function (sim) {
    var acs = sim.acs, i, j;
    for (i = 0; i < acs.length; i++) {
      var a = acs[i], cnt = [0, 0, 0, 0];
      for (j = 0; j < acs.length; j++) if (i !== j) { var b = acs[j], dx = b.rx - a.rx, dy = b.ry - a.ry, d = Math.hypot(dx, dy), lim = sim.mode === 'ACC' ? 30 : 9; if (d < lim) { var qd = dx >= 0 ? (dy >= 0 ? 0 : 1) : (dy >= 0 ? 3 : 2); cnt[qd] += (lim - d); } }
      var best = a.lblQ || 0; for (j = 0; j < 4; j++) if (cnt[j] < cnt[best] - 0.5) best = j; a.lblQ = best;
    }
  };

  /* ================= 지상 ================= */
  /* 지상 화면을 처음 열 때의 범위: 공항 묶음의 D.view = { cu, cv, w, h }(m)가 있으면 그것으로 */
  R.groundView = function () { return { cu: 0, cv: 60, scale: 0.2, min: D.view ? 0.05 : 0.1, max: 1.6 }; };
  R.fitGround = function (v, W, H) { var V = D.view || { cu: 0, cv: 250, w: 4300, h: 2440 }; v.scale = Math.min(W / V.w, H / V.h); v.cu = V.cu; v.cv = V.cv; };
  function gs(v, W, H, u, w) { return [W / 2 + (u - v.cu) * v.scale, H / 2 - (w - v.cv) * v.scale]; }
  R.gs = gs;
  R.groundToUV = function (v, W, H, sx, sy) { return { u: (sx - W / 2) / v.scale + v.cu, v: -(sy - H / 2) / v.scale + v.cv }; };
  var satImg = null, satOk = false;
  R.loadSat = function (url) { if (typeof Image === 'undefined') return; satImg = new Image(); satImg.onload = function () { satOk = true; }; satImg.onerror = function () { satOk = false; }; satImg.src = url; };
  R.SAT = D.sat || { u1: -2400, u2: 2400, v1: -1500, v2: 1500 };   /* 바탕 그림이 덮는 범위(m) — 공항 자료에서 옴 */

  function rectUV(ctx, v, W, H, u1, v1, u2, v2, col) { var a = gs(v, W, H, u1, v2), b = gs(v, W, H, u2, v1); ctx.fillStyle = col; ctx.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); }
  function sign(ctx, x, y, t, s) { ctx.font = 'bold ' + s + 'px ' + MONO; var w = ctx.measureText(t).width + 5; if (R._tags) R._tags.push({ x: x - w / 2 - 1, y: y - s * 0.62 - 1, w: w + 2, h: s * 1.24 + 2, wt: 1.6 }); ctx.fillStyle = '#0c0c0c'; ctx.fillRect(x - w / 2, y - s * 0.62, w, s * 1.24); ctx.fillStyle = '#f2c230'; ctx.textAlign = 'center'; ctx.fillText(t, x, y + 0.5); ctx.textAlign = 'left'; }

  R.drawGround = function (ctx, W, H, app) {
    var sim = app.sim, v = app.view, s = v.scale, i, a, b, N = D.gN, now = performance.now();
    ctx.fillStyle = C.grass; ctx.fillRect(0, 0, W, H); ctx.textBaseline = 'middle';
    if (satOk) {
      a = gs(v, W, H, R.SAT.u1, R.SAT.v2); b = gs(v, W, H, R.SAT.u2, R.SAT.v1);
      ctx.fillStyle = R.SAT.edge || '#60634a'; ctx.fillRect(0, 0, W, H);                       /* 그림 바깥은 가장자리 색으로 */
      ctx.drawImage(satImg, a[0], a[1], b[0] - a[0], b[1] - a[1]);
      var fw = Math.min(60, (b[0] - a[0]) * 0.03), gr, ec = R.SAT.edge || '#60634a';          /* 이음매를 흐리게 */
      [[a[0], a[1], fw, 0], [b[0], a[1], -fw, 0], [a[0], a[1], 0, fw], [a[0], b[1], 0, -fw]].forEach(function (e) {
        gr = ctx.createLinearGradient(e[0], e[1], e[0] + e[2], e[1] + e[3]); gr.addColorStop(0, ec); gr.addColorStop(1, 'rgba(96,99,74,0)'); ctx.fillStyle = gr;
        if (e[2]) ctx.fillRect(Math.min(e[0], e[0] + e[2]), a[1], Math.abs(e[2]), b[1] - a[1]); else ctx.fillRect(a[0], Math.min(e[1], e[1] + e[3]), b[0] - a[0], Math.abs(e[3]));
      });
      ctx.fillStyle = 'rgba(5,9,14,.30)'; ctx.fillRect(0, 0, W, H);
    }
    else {
      /* 잔디 무늬 · 계류장 · 건물 */
      ctx.fillStyle = C.grass2; for (i = Math.floor(Math.min(-2600, R.SAT.u1) / 240) * 240; i < Math.max(2600, R.SAT.u2); i += 240) { a = gs(v, W, H, i, 1700); ctx.fillRect(a[0], 0, 120 * s, H); }
      if (D.decor) D.decor(function (u1, v1, u2, v2, col) { rectUV(ctx, v, W, H, u1, v1, u2, v2, col); }, C);
    }
    ctx.lineCap = 'butt';
    /* 유도로 포장 */
    function strip(e, w, col) { var A = N[e.a], B = N[e.b], p = gs(v, W, H, A.u, A.v), q = gs(v, W, H, B.u, B.v); ctx.strokeStyle = col; ctx.lineWidth = Math.max(1.5, w * s); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
    if (!satOk) { ctx.lineCap = 'round'; D.gE.forEach(function (e) { if (e.kind !== 'rwy') strip(e, e.kind === 'stand' ? 30 : e.kind === 'lane' ? 44 : 38, e.kind === 'stand' || e.kind === 'lane' ? C.apron : C.pave); }); ctx.lineCap = 'butt'; }
    /* 활주로 */
    Object.keys(D.rw).forEach(function (id) {
      /* 활주로마다 a쪽 시단을 원점으로, 활주로 방향을 가로축으로 돌려 놓고 그림(어느 방향 활주로든 같은 코드) */
      var r = D.rw[id], pa = gs(v, W, H, r.ua, r.va), pb = gs(v, W, H, r.ub, r.vb), Lr = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]);
      var p = [-60 * s, -r.width / 2 * s], q = [Lr + 60 * s, r.width / 2 * s], cy = 0, closed = sim.rwClosed && sim.rwClosed[id] > sim.t;
      ctx.save(); ctx.translate(pa[0], pa[1]); ctx.rotate(Math.atan2(pb[1] - pa[1], pb[0] - pa[0]));
      if (!satOk) { ctx.fillStyle = C.rw; ctx.fillRect(p[0], p[1], q[0] - p[0], q[1] - p[1]); }
      ctx.strokeStyle = C.white; ctx.lineWidth = Math.max(0.6, 1.2 * s);
      if (!satOk) { ctx.strokeRect(p[0] + 60 * s, p[1] + 1, q[0] - p[0] - 120 * s, q[1] - p[1] - 2); ctx.setLineDash([30 * s, 22 * s]); ctx.lineWidth = Math.max(0.7, 1 * s); ctx.beginPath(); ctx.moveTo(p[0] + 150 * s, cy); ctx.lineTo(q[0] - 150 * s, cy); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = C.white; for (var k = 0; k < 8; k++) { var yy = p[1] + (4 + k * 6.8) * s; ctx.fillRect(p[0] + 66 * s, yy, 34 * s, 3.4 * s); ctx.fillRect(q[0] - 100 * s, yy, 34 * s, 3.4 * s); }
        [300, 450, 600].forEach(function (dd) { ctx.fillRect(p[0] + (60 + dd) * s, cy - 14 * s, 22 * s, 6 * s); ctx.fillRect(p[0] + (60 + dd) * s, cy + 8 * s, 22 * s, 6 * s); ctx.fillRect(q[0] - (82 + dd) * s, cy - 14 * s, 22 * s, 6 * s); ctx.fillRect(q[0] - (82 + dd) * s, cy + 8 * s, 22 * s, 6 * s); }); }
      var fs = Math.max(9, 34 * s); ctx.font = 'bold ' + fs + 'px ' + MONO; ctx.fillStyle = satOk ? '#ffffff' : C.white; ctx.textAlign = 'center';
      ctx.save(); ctx.translate(p[0] + 135 * s, cy); ctx.rotate(Math.PI / 2); ctx.fillText(r.a, 0, 0); ctx.restore();
      ctx.save(); ctx.translate(q[0] - 135 * s, cy); ctx.rotate(-Math.PI / 2); ctx.fillText(r.b, 0, 0); ctx.restore(); ctx.textAlign = 'left';
      if (closed) { ctx.fillStyle = 'rgba(255,60,60,' + (0.16 + 0.1 * Math.sin(now / 250)) + ')'; ctx.fillRect(p[0], p[1], q[0] - p[0], q[1] - p[1]); ctx.fillStyle = '#ff8a8a'; ctx.font = 'bold 13px ' + MONO; ctx.fillText('RWY CLOSED — INSPECTION ' + U.mmss(sim.rwClosed[id] - sim.t), (p[0] + q[0]) / 2 - 110, cy - 26 * s - 10);
        var fr = (sim.t - sim.insp.t0) / (sim.insp.t1 - sim.insp.t0), cp = [Lr * fr, 0]; ctx.fillStyle = '#ffd24a'; ctx.fillRect(cp[0] - 5, cp[1] - 3, 10, 6); ctx.fillStyle = Math.floor(now / 300) % 2 ? '#ff9a1f' : '#fff'; ctx.fillRect(cp[0] - 2, cp[1] - 5, 4, 2); }
      ctx.restore();
    });
    /* 유도로 중심선 · 폐쇄 · 표지 */
    D.gE.forEach(function (e) {
      if (e.kind === 'rwy') return; var A = N[e.a], B = N[e.b], p = gs(v, W, H, A.u, A.v), q = gs(v, W, H, B.u, B.v), cl = sim.net && sim.net.closed[e.i];
      ctx.strokeStyle = cl ? '#ff4a4a' : e.kind === 'stand' ? 'rgba(210,169,42,.5)' : C.line; ctx.lineWidth = cl ? Math.max(3, 20 * s) : Math.max(0.8, 1.4 * s); if (cl) ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); ctx.setLineDash([]);
    });
    /* 정지선 */
    /* 정지선: 활주로로 들어가는 구간과 직각으로(실선), 활주로 반대쪽에 점선 */
    Object.keys(N).forEach(function (id) {
      var n = N[id]; if (!n.hold) return; var p = gs(v, W, H, n.u, n.v), r = null, k;
      for (k = 0; k < n.adj.length; k++) if (n.adj[k].e.kind === 'entry') r = N[n.adj[k].to];
      var q = r ? gs(v, W, H, r.u, r.v) : [p[0], p[1] - 1], m = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1, dx = (q[0] - p[0]) / m, dy = (q[1] - p[1]) / m, hx = -dy * 22 * s, hy = dx * 22 * s, ox = -dx * 5 * s, oy = -dy * 5 * s;
      ctx.strokeStyle = '#f2c230'; ctx.lineWidth = Math.max(1.5, 3 * s); ctx.beginPath(); ctx.moveTo(p[0] - hx, p[1] - hy); ctx.lineTo(p[0] + hx, p[1] + hy); ctx.stroke();
      ctx.setLineDash([4 * s + 1, 3 * s + 1]); ctx.beginPath(); ctx.moveTo(p[0] - hx + ox, p[1] - hy + oy); ctx.lineTo(p[0] + hx + ox, p[1] + hy + oy); ctx.stroke(); ctx.setLineDash([]);
    });
    if (app.guide) return;
    R._tags = [];
    var ss = Math.max(9, Math.min(15, 46 * s));
    (D.gLabels || []).forEach(function (t) { var p = gs(v, W, H, t[1], t[2]); sign(ctx, p[0], p[1], t[0], ss); });
    Object.keys(D.holds).forEach(function (h) { var o = D.holds[h], p = gs(v, W, H, o.lu, o.lv); sign(ctx, p[0], p[1], h, ss * 0.92); });
    var pe = gs(v, W, H, -438, 652); sign(ctx, pe[0], pe[1], 'E', ss * 0.92);
    /* 주기장 번호 */
    ctx.font = 'bold ' + Math.max(8, Math.min(13, 40 * s)) + 'px ' + MONO; ctx.textAlign = 'center';
    Object.keys(D.stands).forEach(function (n) { var st = D.stands[n], p = gs(v, W, H, st.u + st.lab[0], st.v + st.lab[1]); ctx.fillStyle = app.hoverStand === n ? C.sel : '#d9dfe5'; ctx.fillText(n, p[0], p[1]); R._tags.push({ x: p[0] - 13, y: p[1] - 7, w: 26, h: 14, wt: 1.2 }); });
    ctx.textAlign = 'left';
    /* 관제탑 */
    var tp = gs(v, W, H, 0, 0); ctx.fillStyle = '#2c3238'; ctx.beginPath(); ctx.arc(tp[0], tp[1], Math.max(4, 16 * s), 0, 7); ctx.fill(); ctx.strokeStyle = '#9fd0ff'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#9fd0ff'; ctx.font = '9px ' + MONO; ctx.fillText('TWR', tp[0] - 9, tp[1] + Math.max(4, 16 * s) + 8);
    /* 경로 미리보기 · 선택기의 남은 경로 */
    function path(nodes, col, wd, dash, from) { if (!nodes || nodes.length < 1) return; ctx.strokeStyle = col; ctx.lineWidth = wd; if (dash) ctx.setLineDash(dash); ctx.lineCap = 'round'; ctx.beginPath(); var st0 = 0; if (from) { var f = gs(v, W, H, from.u, from.v); ctx.moveTo(f[0], f[1]); } nodes.forEach(function (id, ix) { var p = gs(v, W, H, N[id].u, N[id].v); if (ix === 0 && !from) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); }); ctx.stroke(); ctx.setLineDash([]); ctx.lineCap = 'butt'; }
    var sel = sim.byId(app.sel);
    if (sel && sel.path && sel.pi < sel.path.length && (sel.st === 'taxi' || sel.st === 'athold')) path(sel.path.slice(sel.pi), 'rgba(90,230,140,.75)', Math.max(2, 9 * s), null, sel);
    if (app.routePrev) path(app.routePrev.nodes, 'rgba(79,216,255,.9)', Math.max(2.5, 11 * s), [8, 6]);
    /* 항공기 */
    app.hit = [];
    var list = sim.acs.slice().sort(function (x, y) { return (x.alt || 0) - (y.alt || 0); }), items = [], obs = R.finalLayout(app, W, H);
    if (sim.mode === 'TWR' || sim.mode === 'GND') { var mr = Math.min(78, W * 0.11); obs.push({ x: (sim.flow.mini !== 'L' ? W - mr * 2 - 20 : 4), y: 4, w: mr * 2 + 16, h: mr * 2 + 16, wt: 3 }); }
    list.forEach(function (ac) {
      if (ac.st === 'final' && ac.d > 2600) return;
      var p = gs(v, W, H, ac.u, ac.v); if (p[0] < -60 || p[0] > W + 60) return;
      var k = Math.max(s * 1.3, 21 / ac.perf.len) * (1 + Math.min(0.35, (ac.alt || 0) / 6000));
      var own = ac.owner === 'me', col = ac.emg ? C.emg : own ? (ac.kind === 'dep' ? C.dep : C.arr) : '#8496a6', l1 = ac.cs + (ac.st === 'taxi' && ac.spd < 0.3 && ac.blk ? ' STOP' : ac.halt ? ' HOLD' : ''), l2 = ac.type + (ac.wake === 'H' ? '/H' : ac.wake === 'L' ? '/L' : '') + ' ' + (ac.kind === 'dep' ? (ac.hp || ac.rwy || '') : (ac.st === 'final' || ac.st === 'land' ? ac.rwy : ac.stand || ''));
      ctx.font = (ac.id === app.sel ? 'bold ' : '') + '11px ' + MONO; var tw = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width) + 9;
      var rr = Math.max(11, Math.max(ac.perf.len, ac.perf.span) * k * 0.5);
      items.push({ id: ac.id, ac: ac, px: p[0], py: p[1], w: tw, h: 29, r: rr, g: rr * 0.72 + 3, prev: ac._lp, col: col, own: own, k: k, l: [l1, l2] });
    });
    if (R._tags) obs = obs.concat(R._tags);
    R.place(items, W, H, obs, app.sel);
    /* 그림 먼저, 표지는 그 위에 */
    items.forEach(function (it) {
      var ac = it.ac, k = it.k, ang = Math.atan2(ac.du, ac.dv);
      if (ac.alt > 20) { ctx.save(); ctx.translate(it.px + ac.alt * 0.012 + 3, it.py + ac.alt * 0.012 + 3); ctx.rotate(ang); ctx.globalAlpha = 0.25; R.plane(ctx, ac.perf, '#000', k, true); ctx.restore(); ctx.globalAlpha = 1; }
      if (satOk) { ctx.save(); ctx.translate(it.px, it.py); ctx.rotate(ang); ctx.globalAlpha = 0.8; R.plane(ctx, ac.perf, '#070a0e', k * 1.16, true); ctx.restore(); ctx.globalAlpha = 1; }   /* 밝은 바닥 위에서도 보이게 어두운 테두리 */
      ctx.save(); ctx.translate(it.px, it.py); ctx.rotate(ang); R.plane(ctx, ac.perf, ac.al.col, k); ctx.restore();
      if (ac.st === 'push') { ctx.fillStyle = '#ffd24a'; var tq = gs(v, W, H, ac.u + ac.du * (ac.perf.len / 2 + 9), ac.v + ac.dv * (ac.perf.len / 2 + 9)); ctx.fillRect(tq[0] - 3, tq[1] - 2, 6, 4); }
      if (ac.id === app.sel) { ctx.strokeStyle = C.sel; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.arc(it.px, it.py, it.r + 4, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
    });
    items.forEach(function (it) {
      var ac = it.ac, col = it.col, bx = it.x, by = it.y, tw = it.w; ac._lp = it.pos;
      leader(ctx, it, col);
      ctx.fillStyle = ac.id === app.sel ? 'rgba(10,40,58,.94)' : 'rgba(8,12,17,.84)'; ctx.fillRect(bx, by, tw, it.h);
      ctx.strokeStyle = ac.id === app.sel ? C.sel : (ac.waiting && it.own && Math.floor(now / 500) % 2 ? C.inn : 'rgba(255,255,255,.16)'); ctx.lineWidth = 1; ctx.strokeRect(bx - 0.5, by - 0.5, tw + 1, it.h + 1);
      ctx.font = (ac.id === app.sel ? 'bold ' : '') + '11px ' + MONO;
      ctx.fillStyle = / (STOP|HOLD)$/.test(it.l[0]) ? C.stca : col; ctx.fillText(it.l[0], bx + 4, by + 8); ctx.fillStyle = it.own ? '#b9c7d3' : '#6f7f8d'; ctx.fillText(it.l[1], bx + 4, by + 21);
      app.hit.push({ id: ac.id, x0: bx - 2, y0: by - 2, x1: bx + tw + 2, y1: by + it.h + 2, px: it.px, py: it.py, r: it.r + 2 });
    });
    /* 북쪽 화살표 */
    ctx.save(); ctx.translate(W - 34, H - 38); ctx.rotate((90 - D.gridHdg) * D2R); ctx.strokeStyle = '#9fb3c8'; ctx.fillStyle = '#9fb3c8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(0, -14); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(5, -10); ctx.lineTo(-5, -10); ctx.closePath(); ctx.fill(); ctx.font = 'bold 10px ' + MONO; ctx.fillText('N', -3.5, -28); ctx.restore();
    /* 최종 접근 표시(화면 밖 항공기) + 타워 레이더 */
    R.finalBars(ctx, W, H, app);
    if (sim.mode === 'TWR' || sim.mode === 'GND') R.miniRadar(ctx, W, H, app);
  };
  /* 위에서 본 항공기(코가 위쪽) */
  R.plane = function (ctx, perf, col, k, shadow) {
    var L = perf.len * k, Wd = perf.span * k, fw = Math.max(2.4, L * 0.105), body = shadow ? '#000' : '#f1f4f7', wing = shadow ? '#000' : '#cdd5dc';
    ctx.fillStyle = wing; ctx.beginPath();
    if (perf.k === 'tp') { ctx.rect(-Wd / 2, -L * 0.1, Wd, L * 0.1); }
    else { ctx.moveTo(-fw / 2, -L * 0.13); ctx.lineTo(-Wd / 2, L * 0.1); ctx.lineTo(-Wd / 2, L * 0.17); ctx.lineTo(-fw / 2, L * 0.1); ctx.lineTo(fw / 2, L * 0.1); ctx.lineTo(Wd / 2, L * 0.17); ctx.lineTo(Wd / 2, L * 0.1); ctx.lineTo(fw / 2, -L * 0.13); }
    ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-fw / 2, L * 0.36); ctx.lineTo(-Wd * 0.19, L * 0.46); ctx.lineTo(-Wd * 0.19, L * 0.5); ctx.lineTo(Wd * 0.19, L * 0.5); ctx.lineTo(Wd * 0.19, L * 0.46); ctx.lineTo(fw / 2, L * 0.36); ctx.closePath(); ctx.fill();
    if (!shadow) { ctx.fillStyle = '#8d979f'; var ey = perf.k === 'tp' ? -L * 0.14 : -L * 0.04, ex = Wd * (perf.wake === 'H' ? 0.17 : 0.2); ctx.fillRect(-ex - fw * 0.22, ey, fw * 0.44, L * 0.1); ctx.fillRect(ex - fw * 0.22, ey, fw * 0.44, L * 0.1); }
    ctx.fillStyle = body; ctx.beginPath(); ctx.moveTo(0, -L / 2); ctx.quadraticCurveTo(fw / 2, -L * 0.43, fw / 2, -L * 0.34); ctx.lineTo(fw / 2, L * 0.3); ctx.lineTo(fw * 0.16, L / 2); ctx.lineTo(-fw * 0.16, L / 2); ctx.lineTo(-fw / 2, L * 0.3); ctx.lineTo(-fw / 2, -L * 0.34); ctx.quadraticCurveTo(-fw / 2, -L * 0.43, 0, -L / 2); ctx.closePath(); ctx.fill();
    if (!shadow) { ctx.fillStyle = col; ctx.fillRect(-fw * 0.5, L * 0.2, fw, L * 0.12); ctx.fillRect(-fw * 0.14, L * 0.3, fw * 0.28, L * 0.2); ctx.fillStyle = '#2b3a48'; ctx.fillRect(-fw * 0.3, -L * 0.44, fw * 0.6, L * 0.025); }
  };
  /* 활주로 접근 끝 쪽의 도착 목록(자리 계산 → 그리기) */
  R.finalLayout = function (app, W, H) {
    var sim = app.sim, v = app.view, out = [];
    Object.keys(D.ends).forEach(function (id) {
      var fl = sim.finals ? sim.finals(id) : []; if (!fl.length) return; var e = D.ends[id], p = gs(v, W, H, e.thrU - e.du * 330, e.thrV - e.dv * 330), hh = fl.length * 17 + 20, x = e.du > 0 ? Math.max(8, p[0] - 196) : Math.min(W - 196, p[0] + 10), y = p[1] + (e.thrV > 0 ? -18 - hh : 20);
      y = Math.max(6, Math.min(y, H - hh - 6)); out.push({ id: id, x: x, y: y - 3, w: 188, h: hh, list: fl, wt: 3 });
    });
    return out;
  };
  R.finalBars = function (ctx, W, H, app) {
    var sim = app.sim; ctx.font = '11px ' + MONO;
    R.finalLayout(app, W, H).forEach(function (b) {
      var x = b.x, y = b.y + 3;
      ctx.fillStyle = 'rgba(6,10,15,.88)'; ctx.fillRect(x, b.y, b.w, b.h); ctx.strokeStyle = '#2b4a66'; ctx.strokeRect(x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
      ctx.fillStyle = '#6c8aa6'; ctx.fillText('FINAL ' + b.id + '  ILS', x + 6, y + 6);
      b.list.forEach(function (a, ix) { var yy = y + 23 + ix * 17, own = a.owner === 'me'; ctx.fillStyle = a.emg ? C.emg : a.id === app.sel ? C.sel : own ? C.arr : '#8496a6'; ctx.fillText(a.cs + (a.wake === 'H' ? ' H' : ''), x + 6, yy); ctx.fillText((a.d / NM).toFixed(1) + 'NM', x + 82, yy); ctx.fillStyle = a.clr ? '#6fe08d' : '#ffb347'; ctx.fillText(a.clr ? 'CLRD' : (sim.mode === 'TWR' ? 'NO CLR' : ''), x + 136, yy); app.hit.push({ id: a.id, x0: x, y0: yy - 8, x1: x + 186, y1: yy + 8, px: -99, py: -99, r: 0 }); });
    });
  };
  R.miniRadar = function (ctx, W, H, app) {
    var sim = app.sim, r = Math.min(78, W * 0.11), cx = sim.flow.mini !== 'L' ? W - r - 12 : r + 12, cy = r + 12, sc = r / 13, i;
    ctx.fillStyle = 'rgba(4,8,12,.9)'; ctx.beginPath(); ctx.arc(cx, cy, r + 4, 0, 7); ctx.fill(); ctx.strokeStyle = '#2b4a66'; ctx.lineWidth = 1; ctx.stroke();
    ctx.strokeStyle = '#132030'; [5, 10].forEach(function (d) { ctx.beginPath(); ctx.arc(cx, cy, d * sc, 0, 7); ctx.stroke(); });
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r + 3, 0, 7); ctx.clip();
    function mp(u, w) { return [cx + u / NM * sc, cy - w / NM * sc]; }
    ctx.strokeStyle = C.rwy; ctx.lineWidth = 2; Object.keys(D.rw).forEach(function (id) { var rw = D.rw[id], a = mp(rw.ua, rw.va), b = mp(rw.ub, rw.vb); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); });
    ctx.lineWidth = 1; ctx.font = '9px ' + MONO;
    var mb = [];
    sim.acs.forEach(function (a) {
      if (a.st !== 'final' && a.st !== 'air') return; var p = mp(a.u, a.v), col = a.emg ? C.emg : a.st === 'air' ? C.dep : C.arr; ctx.strokeStyle = col; ctx.strokeRect(p[0] - 2.5, p[1] - 2.5, 5, 5);
      var tw = a.cs.length * 5.5, cs = [[p[0] - tw / 2, p[1] - 14], [p[0] - tw / 2, p[1] + 5], [p[0] - tw / 2, p[1] - 25], [p[0] - tw / 2, p[1] + 16], [p[0] + 6, p[1] - 5], [p[0] - tw - 6, p[1] - 5]], bi = 0, bc = 1e9, i, j, c;
      for (i = 0; i < cs.length; i++) { c = i * 2; for (j = 0; j < mb.length; j++) c += ov(cs[i][0], cs[i][1], tw, 10, mb[j].x - 1, mb[j].y - 1, mb[j].w + 2, mb[j].h + 2); if (c < bc) { bc = c; bi = i; } }
      mb.push({ x: cs[bi][0], y: cs[bi][1], w: tw, h: 10 }); mb.push({ x: p[0] - 4, y: p[1] - 4, w: 8, h: 8 });
      ctx.fillStyle = col; ctx.fillText(a.cs, cs[bi][0], cs[bi][1] + 5);
    });
    ctx.restore(); ctx.fillStyle = '#6c8aa6'; ctx.font = '9px ' + MONO; ctx.fillText('TWR RADAR 13NM', cx - 40, cy + r - 6);
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
