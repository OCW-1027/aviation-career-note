/* AIRLINE SAGA — 조종사 체험 2단계: 3D 조종석(787식) — three.js(MIT, assets/lib)를 처음 열 때 내려받음
   - 창밖: 바다 · 육지(실제 해안선) · 활주로(표시 · 등화 · 진입등 · PAPI) · 유도로 · 터미널 · 관제탑 · 하늘 · 해 · 안개 · 구름 · 밤 · 주변 항공기
   - 조종석(기본): 787식 조종석 그림(assets/img/cockpit_787.webp, 창 · 화면 자리는 투명) 뒤로 3D 창밖을 그리고, 화면 5개 자리에 PFD · ND · EICAS를 실시간으로 붙임
     카메라는 그림과 같은 원근(가로 시야 80°, 지평선 높이 HOR)으로 맞추고, 끌기 · 확대는 그림과 카메라를 함께 움직임(setViewOffset)
   - 그림을 못 불러오면 예전 방식(상자 모형 조종석: 눈가림판 · MCP · 화면 3개 · 기어 · 플랩 레버)
   - 착륙 뒤 활주 감속(롤아웃)은 여기서 그림(관제 시뮬레이션에서는 접지 순간 빠짐)
   좌표: 레이더 좌표(NM, 동 x · 북 y) → 3D(m): X = x·1852, Z = −y·1852, Y = 고도(m) */
(function () {
  'use strict';
  var ATC = window.ATC, NM = 1852, FT = 0.3048, D2R = Math.PI / 180;
  var BASE = (function () { var s = document.currentScript && document.currentScript.src || ''; return s.replace(/js\/cockpit3d\.js.*$/, ''); })();
  var T = null, C = ATC.Cockpit = { on: false, ok: !!window.WebGLRenderingContext };
  var S = {};      /* 장면 상태 */
  C.dbg = function () { return S; };      /* 시험용 */

  function load(cb) {
    if (T) return cb();
    import(BASE + 'assets/lib/three.module.min.js').then(function (m) { T = m; cb(); }).catch(function (e) { C.err = String(e); cb(e); });
  }
  C.open = function (sim, host) {
    S.sim = sim; S.host = host; C.on = true; host.hidden = false;
    load(function (e) { if (e) { host.innerHTML = '<div class="ckerr">' + ATC.T('3D를 불러오지 못했습니다') + '</div>'; return; } if (!S.r || S.apt !== ATC.aptId) build(); else resize(); S.host.appendChild(S.r.domElement); buildImg(); S.host.appendChild(S.ci.wrap); if (ATC.CkSnd) ATC.CkSnd.start(); });
  };
  C.close = function () { C.on = false; if (S.host) S.host.hidden = true; if (ATC.CkSnd) ATC.CkSnd.stop(); };

  /* ---------- 도우미 ---------- */
  function P(x, y, h) { return new T.Vector3(x * NM, h || 0, -y * NM); }
  function canvasTex(w, h, draw) { var cv = document.createElement('canvas'); cv.width = w; cv.height = h; var c = cv.getContext('2d'); draw(c, w, h); var t = new T.CanvasTexture(cv); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8; return t; }
  function glowTex() { return canvasTex(64, 64, function (c) { var g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.75)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, 64, 64); }); }
  function lightPoints(list, col, size) {
    var g = new T.BufferGeometry(), a = new Float32Array(list.length * 3); list.forEach(function (p, i) { a[i * 3] = p.x; a[i * 3 + 1] = p.y; a[i * 3 + 2] = p.z; });
    g.setAttribute('position', new T.BufferAttribute(a, 3));
    var m = new T.PointsMaterial({ color: col, size: size || 6, sizeAttenuation: false, map: S.glow, transparent: true, depthWrite: false, blending: T.AdditiveBlending });
    var o = new T.Points(g, m); o.renderOrder = 2; return o;
  }

  /* ---------- 장면 만들기 ---------- */
  /* ---------- 그림 조종석 ---------- */
  /* 좌표는 원본 그림(2576×1438) 픽셀. scr = 화면 5개(바깥 PFD · 안쪽 ND · 가운데 EICAS), win = MCP 숫자 창, hot = 누르는 곳 */
  var CKI = {
    W: 2576, H: 1438, HOR: 340, HFOV: 80, PX: 0.36,
    scr: [[713, 813, 893, 1011, 'pfd'], [924, 814, 1105, 1011, 'nd'], [1231, 813, 1409, 1011, 'eicas'], [1531, 813, 1713, 1011, 'nd'], [1743, 812, 1925, 1010, 'pfd']],
    win: [[1125, 630, 1178, 648, 'spd'], [1226, 630, 1279, 648, 'hdg'], [1290, 630, 1344, 648, 'vs'], [1356, 630, 1409, 648, 'alt']],
    hot: [[1130, 655, 1150, 690, 'spd-'], [1150, 655, 1172, 690, 'spd+'], [1232, 643, 1252, 681, 'hdg-'], [1252, 643, 1274, 681, 'hdg+'], [1362, 642, 1382, 681, 'alt-'], [1382, 642, 1404, 681, 'alt+'], [1430, 880, 1482, 1000, 'gear']]
  };
  function buildImg() {
    if (S.ci) return;
    var wrap = document.createElement('div'); wrap.className = 'ckimg'; wrap.style.display = 'none';      /* 첫 장면을 그릴 때 보임 */
    var ci = S.ci = { wrap: wrap, ok: false, scr: [], win: [], key: '' };
    CKI.scr.forEach(function (q) { var cv = document.createElement('canvas'); cv.width = 400; cv.height = Math.round(400 * (q[3] - q[1]) / (q[2] - q[0])); wrap.appendChild(cv); ci.scr.push({ q: q, cv: cv, c: cv.getContext('2d') }); });
    var img = ci.img = new Image(); img.alt = ''; img.draggable = false;
    img.onload = function () { ci.ok = true; ci.key = ''; }; img.onerror = function () { ci.ok = false; };
    img.src = BASE + 'assets/img/' + ((window.innerWidth || 1200) < 900 ? 'cockpit_787_s.webp' : 'cockpit_787.webp');
    wrap.appendChild(img);
    CKI.win.forEach(function (q) { var d = document.createElement('div'); d.className = 'ckwin'; wrap.appendChild(d); ci.win.push({ q: q, el: d }); });
    var gl = ci.gear = document.createElement('div'); gl.className = 'ckgear'; wrap.appendChild(gl);
  }
  function imgOn() { return S.ci && S.ci.ok && S.view === 'ck'; }
  function ivDef() { var w = S.host.clientWidth || 800, h = S.host.clientHeight || 500; return { cx: w / h < 1.1 ? CKI.W * 0.355 : CKI.W / 2, cy: w / h < 1.1 ? CKI.H * 0.6 : CKI.H * 0.53, z: 1 }; }
  /* 그림의 화면 배치: 화면을 덮는 크기 × 확대, 가운데 점(cx, cy)은 그림 밖으로 나가지 않게 */
  function imgLayout() {
    var Wc = S.host.clientWidth || 800, Hc = S.host.clientHeight || 500, iv = S.iv || (S.iv = ivDef());
    var s = Math.max(Wc / CKI.W, Hc / CKI.H) * iv.z, Wi = CKI.W * s, Hi = CKI.H * s;
    var L = Math.min(0, Math.max(Wc - Wi, Wc / 2 - iv.cx * s)), Tp = Math.min(0, Math.max(Hc - Hi, Hc / 2 - iv.cy * s));
    iv.cx = (Wc / 2 - L) / s; iv.cy = (Hc / 2 - Tp) / s;
    return { Wc: Wc, Hc: Hc, s: s, Wi: Wi, Hi: Hi, L: L, T: Tp };
  }
  function imgFrame(st) {
    var ci = S.ci, g = imgLayout(), key = [g.Wc, g.Hc, g.s.toFixed(4), g.L.toFixed(1), g.T.toFixed(1)].join();
    if (key !== ci.key) {
      ci.key = key;
      function place(el, q, pad) { el.style.left = (g.L + q[0] * g.s - pad) + 'px'; el.style.top = (g.T + q[1] * g.s - pad) + 'px'; el.style.width = ((q[2] - q[0]) * g.s + pad * 2) + 'px'; el.style.height = ((q[3] - q[1]) * g.s + pad * 2) + 'px'; }
      ci.scr.forEach(function (d) { place(d.cv, d.q, 2); });
      ci.win.forEach(function (d) { place(d.el, d.q, 0); d.el.style.fontSize = ((d.q[3] - d.q[1]) * g.s * 0.92) + 'px'; });
      place(ci.gear, [1444, 794, 1508, 810], 0); ci.gear.style.fontSize = (13 * g.s) + 'px';
      var im = ci.img.style; im.left = g.L + 'px'; im.top = g.T + 'px'; im.width = g.Wi + 'px'; im.height = g.Hi + 'px';
      /* 카메라: 그림과 같은 원근. 주점(지평선 · 가운데)을 기준으로 한 큰 틀에서 지금 화면 부분만 그림 */
      /* 앞 방향(주점)은 기장석 눈 앞 = 그림 가운데보다 왼쪽(PX) — 그림은 두 좌석 사이에서 찍은 모습이라 정면이 가운데 창틀에 가려지므로 */
      var f = (g.Wi / 2) / Math.tan(CKI.HFOV / 2 * D2R), yp = CKI.HOR * g.s, half = Math.max(yp, g.Hi - yp), xp = CKI.PX * CKI.W * g.s, hw = Math.max(xp, g.Wi - xp);
      S.cam.fov = 2 * Math.atan(half / f) / D2R; S.cam.aspect = hw / half;
      S.cam.setViewOffset(2 * hw, 2 * half, (hw - xp) - g.L, (half - yp) - g.T, g.Wc, g.Hc); S.cam.updateProjectionMatrix();
    }
    ci.img.style.filter = st.night > 0.05 ? 'brightness(' + (1 - st.night * 0.72).toFixed(2) + ')' : '';
    var v = { spd: st.sel.spd, hdg: ('00' + st.sel.hdg).slice(-3), vs: '', alt: st.sel.alt };
    ci.win.forEach(function (d) { var t = String(v[d.q[4]]); if (d.el.textContent !== t) d.el.textContent = t; });
    var gt = st.gear === 'down' ? 'DOWN' : st.gear === 'up' ? 'UP' : '···', gc = 'ckgear ' + (st.gear === 'down' ? 'dn' : st.gear === 'up' ? 'up' : 'tr');
    if (ci.gear.textContent !== gt) ci.gear.textContent = gt; if (ci.gear.className !== gc) ci.gear.className = gc;
  }
  function imgHit(e) {
    var rc = S.host.getBoundingClientRect(), g = imgLayout(), ix = (e.clientX - rc.left - g.L) / g.s, iy = (e.clientY - rc.top - g.T) / g.s;
    CKI.hot.forEach(function (h) { if (ix >= h[0] && ix <= h[2] && iy >= h[1] && iy <= h[3]) act(h[4]); });
  }
  function imgHover(e) {
    var rc = S.host.getBoundingClientRect(), g = imgLayout(), ix = (e.clientX - rc.left - g.L) / g.s, iy = (e.clientY - rc.top - g.T) / g.s;
    return CKI.hot.some(function (h) { return ix >= h[0] && ix <= h[2] && iy >= h[1] && iy <= h[3]; });
  }

  /* ---------- 땅 · 도시 · 공항 사진 · 랜드마크 ---------- */
  function rnd(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  /* 위에서 본 도시: 큰 길 · 골목 · 지붕(회색 · 흰색 · 갈색 · 청회색) · 공원 녹지 — 1024px = 900m */
  function cityTex() {
    return canvasTex(1024, 1024, function (c, w, h) {
      var R = rnd(7); c.fillStyle = '#7d7f7c'; c.fillRect(0, 0, w, h);
      var roofs = ['#9a9c9a', '#b4b5b1', '#8c8f92', '#a59f94', '#6f7478', '#c4c3bd', '#857d72', '#77808a', '#9fa7ad', '#5f6366'];
      var xs = [0], ys = [0]; while (xs[xs.length - 1] < w) xs.push(xs[xs.length - 1] + 70 + R() * 90); while (ys[ys.length - 1] < h) ys.push(ys[ys.length - 1] + 60 + R() * 80);
      for (var i = 0; i < xs.length - 1; i++) for (var j = 0; j < ys.length - 1; j++) {
        var x0 = xs[i] + 4, y0 = ys[j] + 4, bw = xs[i + 1] - xs[i] - 8, bh = ys[j + 1] - ys[j] - 8, r = R();
        if (r < 0.07) { c.fillStyle = ['#4f6440', '#5a6e47', '#475a3a'][Math.floor(R() * 3)]; c.fillRect(x0, y0, bw, bh); for (var t = 0; t < 30; t++) { c.fillStyle = 'rgba(30,48,26,.5)'; c.beginPath(); c.arc(x0 + R() * bw, y0 + R() * bh, 3 + R() * 6, 0, 7); c.fill(); } continue; }
        c.fillStyle = '#8a8b88'; c.fillRect(x0, y0, bw, bh);
        var n = r < 0.25 ? 2 + Math.floor(R() * 3) : 8 + Math.floor(R() * 18);      /* 큰 건물 몇 채 또는 작은 집 여러 채 */
        for (var k = 0; k < n; k++) {
          var rw2 = r < 0.25 ? bw * (0.35 + R() * 0.5) : 8 + R() * 22, rh = r < 0.25 ? bh * (0.35 + R() * 0.5) : 8 + R() * 18, rx = x0 + R() * Math.max(1, bw - rw2), ry = y0 + R() * Math.max(1, bh - rh);
          c.fillStyle = roofs[Math.floor(R() * roofs.length)]; c.fillRect(rx, ry, rw2, rh); c.fillStyle = 'rgba(0,0,0,.28)'; c.fillRect(rx + rw2, ry + 2, 2.5, rh); c.fillRect(rx + 2, ry + rh, rw2, 2.5);
        }
      }
      c.fillStyle = '#5c5e60'; for (i = 0; i < xs.length; i += 3) c.fillRect(xs[i] - 3, 0, 7, h); for (j = 0; j < ys.length; j += 3) c.fillRect(0, ys[j] - 3, w, 7);      /* 큰 길 */
      c.globalAlpha = 0.25; c.fillStyle = '#e8e2c8'; for (i = 0; i < xs.length; i += 3) c.fillRect(xs[i], 0, 1, h); for (j = 0; j < ys.length; j += 3) c.fillRect(0, ys[j], w, 1); c.globalAlpha = 1;
    });
  }
  function noiseTex(n) {
    return canvasTex(n, n, function (c, w, h) { var R = rnd(11); c.fillStyle = '#808080'; c.fillRect(0, 0, w, h); for (var k = 0; k < 220; k++) { var x = R() * w, y = R() * h, r = 10 + R() * 40, v = Math.floor(70 + R() * 120), g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, 'rgba(' + v + ',' + v + ',' + v + ',.55)'); g.addColorStop(1, 'rgba(' + v + ',' + v + ',' + v + ',0)'); [[0, 0], [w, 0], [-w, 0], [0, h], [0, -h]].forEach(function (o) { c.save(); c.translate(o[0], o[1]); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore(); }); } });
  }
  /* 육지 안인지(해안선 다각형) */
  function landIdx() {
    if (S.landIx) return S.landIx;
    var L = []; (S.landRings || []).forEach(function (poly) { poly.forEach(function (r) { if (r.length < 6) return; var a = 1e9, b = 1e9, c2 = -1e9, d = -1e9; for (var i = 0; i < r.length; i += 2) { a = Math.min(a, r[i]); c2 = Math.max(c2, r[i]); b = Math.min(b, r[i + 1]); d = Math.max(d, r[i + 1]); } if (c2 < -40 || a > 40 || d < -40 || b > 40) return; L.push({ r: r, a: a, b: b, c: c2, d: d }); }); });
    return (S.landIx = L);
  }
  function inLand(x, y) {
    var n = 0; landIdx().forEach(function (q) { if (x < q.a || x > q.c || y < q.b || y > q.d) return; var r = q.r, ins = false; for (var i = 0, j = r.length - 2; i < r.length; j = i, i += 2) { var xi = r[i], yi = r[i + 1], xj = r[j], yj = r[j + 1]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins; } if (ins) n++; });
    return n % 2 === 1;
  }
  /* 공항 항공사진: 바다색을 투명하게 오리고 가장자리를 흐려 3D 바다와 잇기 */
  function buildSat(ap, elev) {
    var D = ATC.D, st = D.sat, im = new Image();
    im.onload = function () {
      var cv = document.createElement('canvas'), w = cv.width = Math.min(2048, im.naturalWidth), h = cv.height = Math.round(im.naturalHeight * w / im.naturalWidth), c = cv.getContext('2d'); c.drawImage(im, 0, 0, w, h);
      try {
        var d = c.getImageData(0, 0, w, h), px = d.data, sr = 0, sg = 0, sb = 0, n = 0;
        [[4, 4], [w - 5, 4], [4, h - 5], [w - 5, h - 5], [w >> 1, 4], [4, h >> 1]].forEach(function (q) { var o = (q[1] * w + q[0]) * 4; sr += px[o]; sg += px[o + 1]; sb += px[o + 2]; n++; });
        sr /= n; sg /= n; sb /= n; S.satSea = [sr / 255, sg / 255, sb / 255];
        var f = Math.round(Math.min(w, h) * 0.04);
        for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
          var o = (y * w + x) * 4, dd = Math.abs(px[o] - sr) + Math.abs(px[o + 1] - sg) + Math.abs(px[o + 2] - sb), a = Math.min(1, Math.max(0, (dd - 18) / 30));
          var e = Math.min(x, y, w - 1 - x, h - 1 - y); if (e < f) a *= e / f;
          px[o + 3] = Math.round(a * 255);
        }
        c.putImageData(d, 0, 0);
      } catch (err) { }
      var tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 8;
      var p1 = D.uv2xy(st.u1, st.v2), p2 = D.uv2xy(st.u2, st.v2), p3 = D.uv2xy(st.u1, st.v1), p4 = D.uv2xy(st.u2, st.v1);      /* 그림 왼쪽 위 = (u1, v2) */
      var g = new T.BufferGeometry(), Y = elev + 0.12;
      g.setAttribute('position', new T.Float32BufferAttribute([p1.x * NM, Y, -p1.y * NM, p2.x * NM, Y, -p2.y * NM, p3.x * NM, Y, -p3.y * NM, p4.x * NM, Y, -p4.y * NM], 3));
      g.setAttribute('uv', new T.Float32BufferAttribute([0, 1, 1, 1, 0, 0, 1, 0], 2)); g.setIndex([0, 2, 1, 1, 2, 3]); g.computeVertexNormals();
      var m = new T.Mesh(g, new T.MeshLambertMaterial({ map: tex, transparent: true, depthWrite: false, side: T.DoubleSide })); m.renderOrder = 1; ap.add(m);
    };
    im.src = BASE + st.img;
  }
  /* 건물: 육지 위에 상자(인스턴스). 실제 공항(하네다)은 고층 지구를 실제 자리에 */
  var ZONES = { RJTT: [[-3.17, 8.65, 1.3, 230], [0.27, 7.69, 1.0, 200], [-0.2, 6.74, 0.7, 210], [-1.44, 4.72, 0.8, 150], [0.34, 4.34, 0.8, 110], [1.48, 5.95, 0.7, 150], [-7.96, -4.82, 1.0, 290], [-4.15, -0.83, 0.8, 120], [-5.72, 2.08, 0.6, 180], [13.04, 4.09, 0.9, 150], [-2.09, 4.29, 0.6, 140], [-1.73, 6.69, 0.7, 238], [-3.09, 6.7, 0.6, 180], [-1.71, 10.85, 0.6, 240]] };
  function facadeTex(lit) {
    return canvasTex(64, 128, function (c, w, h) { var R = rnd(lit ? 5 : 3); c.fillStyle = lit ? '#000' : '#d9dbdc'; c.fillRect(0, 0, w, h); for (var y = 6; y < h; y += 10) for (var x = 4; x < w; x += 8) { if (lit) { if (R() < 0.45) { c.fillStyle = ['#ffd99a', '#fff0c8', '#cfe6ff'][Math.floor(R() * 3)]; c.fillRect(x, y, 5, 6); } } else { c.fillStyle = R() < 0.5 ? '#6f8494' : '#596b79'; c.fillRect(x, y, 5, 6); } } });
  }
  function buildCity(sc) {
    var D = ATC.D, R = rnd(ATC.aptId.charCodeAt(0) * 97 + 3), zones = ZONES[ATC.aptId] || [], st = D.sat, lo = [], hi = [];
    function onApt(x, y) { if (!st) return Math.hypot(x, y) < 2.2; var q = D.xy2uv(x, y); return q.u > st.u1 - 400 && q.u < st.u2 + 400 && q.v > st.v1 - 400 && q.v < st.v2 + 400; }
    var MOB = (window.innerWidth || 1200) < 900, NLO = MOB ? 4500 : 9000;      /* 휴대폰은 건물 반만 */
    for (var k = 0; k < 26000 && lo.length < NLO; k++) {
      var r = 2 + Math.pow(R(), 1.6) * 20, a = R() * Math.PI * 2, x = Math.sin(a) * r, y = Math.cos(a) * r;
      if (onApt(x, y) || !inLand(x, y)) continue;
      lo.push([x, y, 8 + Math.pow(R(), 2.2) * 40, 18 + R() * 40, 14 + R() * 30, R() * Math.PI]);
    }
    zones.forEach(function (z) { var n = Math.round(z[2] * 140); for (var k2 = 0; k2 < n * 3 && n > 0; k2++) { var rr = Math.sqrt(R()) * z[2], aa = R() * Math.PI * 2, x2 = z[0] + Math.sin(aa) * rr, y2 = z[1] + Math.cos(aa) * rr; if (!inLand(x2, y2)) continue; n--; hi.push([x2, y2, 50 + Math.pow(R(), 1.5) * (z[3] - 50) * (1 - rr / z[2] * 0.6), 30 + R() * 35, 30 + R() * 35, R() * Math.PI]); } });
    if (!zones.length) for (k = 0; k < 4000 && hi.length < 160; k++) { var r3 = 3 + R() * 9, a3 = R() * Math.PI * 2, x3 = Math.sin(a3) * r3, y3 = Math.cos(a3) * r3; if (!onApt(x3, y3) && inLand(x3, y3)) hi.push([x3, y3, 50 + R() * 120, 30 + R() * 30, 30 + R() * 30, R() * Math.PI]); }
    var wallD = facadeTex(false), wallN = facadeTex(true); wallD.wrapS = wallD.wrapT = wallN.wrapS = wallN.wrapT = T.RepeatWrapping;
    var roof = new T.MeshLambertMaterial({ color: 0x8d9092 });
    S.bldMats = [];
    [[lo, 1.5], [hi, 7]].forEach(function (set) {
      var list = set[0]; if (!list.length) return;
      var geo = new T.BoxGeometry(1, 1, 1); geo.translate(0, 0.5, 0); var uv = geo.attributes.uv; for (var i = 0; i < uv.count; i++) uv.setY(i, uv.getY(i) * set[1]);
      var wall = new T.MeshLambertMaterial({ map: wallD, emissive: 0xffffff, emissiveMap: wallN, emissiveIntensity: 0 }); S.bldMats.push(wall);
      var im = new T.InstancedMesh(geo, [wall, wall, roof, roof, wall, wall], list.length), mt = new T.Matrix4(), q = new T.Quaternion(), sc2 = new T.Vector3(), ps = new T.Vector3(), col = new T.Color();
      list.forEach(function (b, i) { ps.set(b[0] * NM, 0.5, -b[1] * NM); q.setFromAxisAngle(new T.Vector3(0, 1, 0), b[5]); sc2.set(b[3], b[2], b[4]); mt.compose(ps, q, sc2); im.setMatrixAt(i, mt); var t = 0.78 + R() * 0.3; col.setRGB(t, t * (0.97 + R() * 0.05), t * (0.95 + R() * 0.08)); im.setColorAt(i, col); });
      im.frustumCulled = false; sc.add(im);
    });
  }
  /* 랜드마크(하네다): 도쿄 스카이트리 · 도쿄 타워 · 가와사키 굴뚝 · 바다 위 환기탑(가제노토) · 후지산 */
  function buildMarks(sc) {
    S.fuji = null; if (ATC.aptId !== 'RJTT') return;
    var g = new T.Group(); sc.add(g); var marks = [];
    function at(o, x, y, h) { o.position.set(x * NM, h, -y * NM); g.add(o); return o; }
    var wht = new T.MeshLambertMaterial({ color: 0xe6eaee });
    at(new T.Mesh(new T.CylinderGeometry(7, 34, 634, 12), wht), 2.6, 9.14, 317);
    at(new T.Mesh(new T.CylinderGeometry(24, 22, 30, 16), new T.MeshLambertMaterial({ color: 0x9fb2c2 })), 2.6, 9.14, 350);
    at(new T.Mesh(new T.CylinderGeometry(16, 15, 14, 16), new T.MeshLambertMaterial({ color: 0x9fb2c2 })), 2.6, 9.14, 450);
    marks.push(P(2.6, 9.14, 640));
    var band = canvasTex(16, 128, function (c, w, h) { for (var i = 0; i < 10; i++) { c.fillStyle = i % 2 ? '#f1f1ec' : '#e8541e'; c.fillRect(0, i * h / 10, w, h / 10); } });
    var tt = at(new T.Mesh(new T.ConeGeometry(48, 333, 4, 1, true), new T.MeshLambertMaterial({ map: band, side: T.DoubleSide })), -0.95, 6.47, 166); tt.rotation.y = Math.PI / 4;
    at(new T.Mesh(new T.BoxGeometry(30, 14, 30), new T.MeshLambertMaterial({ color: 0xe8541e })), -0.95, 6.47, 150);
    marks.push(P(-0.95, 6.47, 336));
    [[-3.3, -1.6], [-2.9, -1.2], [-2.4, -0.9], [-3.8, -2.4], [-5.0, -3.4], [-1.9, -0.5]].forEach(function (p) { var s2 = at(new T.Mesh(new T.CylinderGeometry(4, 6, 150, 10), new T.MeshLambertMaterial({ map: band })), p[0], p[1], 75); marks.push(P(p[0], p[1], 152)); });
    at(new T.Mesh(new T.CylinderGeometry(22, 26, 90, 16), wht), 2.11, -3.8, 45);      /* 가제노토(아쿠아라인 환기탑) */
    S.markL = lightPoints(marks, 0xff3030, 4); sc.add(S.markL);
    /* 후지산: 서쪽 약 97km. 안개를 받지 않고 원경 색으로 */
    var prof = [[0, 3776], [450, 3720], [1500, 3350], [3500, 2650], [6500, 1800], [10500, 1000], [15000, 400], [21000, 0]].map(function (q) { return new T.Vector2(q[0], q[1]); });
    var fg = new T.LatheGeometry(prof, 48), cols = [], pos = fg.attributes.position, hz = [0.70, 0.76, 0.84];
    for (var i = 0; i < pos.count; i++) { var hh = pos.getY(i), snow = hh > 2500 + Math.sin(pos.getX(i) * 0.002) * 250, b2 = snow ? [0.97, 0.98, 1] : [0.33, 0.40, 0.52], m = 0.45 + 0.25 * (1 - hh / 3776); cols.push(b2[0] * (1 - m) + hz[0] * m, b2[1] * (1 - m) + hz[1] * m, b2[2] * (1 - m) + hz[2] * m); }
    fg.setAttribute('color', new T.Float32BufferAttribute(cols, 3));
    S.fuji = at(new T.Mesh(fg, new T.MeshBasicMaterial({ vertexColors: true, fog: false, transparent: true, opacity: 0.92 })), -52.62, -5.06, 0);
  }
  function build() {
    var D = ATC.D; S.apt = ATC.aptId;
    if (S.r) { S.r.dispose(); }
    var r = S.r = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', logarithmicDepthBuffer: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, (window.innerWidth || 1200) < 900 ? 1.25 : 1.6)); r.outputColorSpace = T.SRGBColorSpace; r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
    var sc = S.scene = new T.Scene();
    S.cam = new T.PerspectiveCamera(70, 1, 0.05, 260000); S.cam.rotation.order = 'YXZ';
    S.glow = glowTex();
    S.fog = sc.fog = new T.FogExp2(0xb9cde0, 0.000045);
    /* 빛 */
    S.hemi = new T.HemisphereLight(0xcfe3ff, 0x5d5f5c, 0.9); sc.add(S.hemi);
    S.sun = new T.DirectionalLight(0xfff2dc, 1.6); sc.add(S.sun); sc.add(S.sun.target);
    /* 하늘(그라데이션 · 해) */
    var skyU = S.skyU = { top: { value: new T.Color(0x2a66b8) }, hor: { value: new T.Color(0xcfe0ee) }, sunDir: { value: new T.Vector3(0, 1, 0) }, sunCol: { value: new T.Color(0xfff3d8) } };
    var sky = new T.Mesh(new T.SphereGeometry(200000, 32, 16), new T.ShaderMaterial({ uniforms: skyU, side: T.BackSide, depthWrite: false, fog: false,
      vertexShader: 'varying vec3 vd; void main(){ vd = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 hor; uniform vec3 sunDir; uniform vec3 sunCol; varying vec3 vd; void main(){ float h = clamp(vd.y, -0.2, 1.0); vec3 c = mix(hor, top, pow(max(h,0.0), 0.55)); if (h < 0.0) c = mix(hor, hor*0.7, -h*4.0); float s = max(dot(normalize(vd), normalize(sunDir)), 0.0); c += sunCol * (pow(s, 900.0) * 6.0 + pow(s, 12.0) * 0.25); gl_FragColor = vec4(c, 1.0); }' }));
    sky.renderOrder = -10; S.sky = sky; sc.add(sky);
    /* 별(밤) */
    var stars = []; for (var i = 0; i < 900; i++) { var u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, rr = Math.sqrt(1 - u * u); if (u < 0.05) continue; stars.push(new T.Vector3(rr * Math.cos(th) * 180000, u * 180000, rr * Math.sin(th) * 180000)); }
    S.stars = lightPoints(stars, 0xffffff, 2); S.stars.material.fog = false; sc.add(S.stars);
    /* 바다 */
    var wave = canvasTex(256, 256, function (c, w, h) { var R = rnd(21); c.fillStyle = '#808080'; c.fillRect(0, 0, w, h); for (var k = 0; k < 900; k++) { var x = R() * w, y = R() * h, v = Math.floor(60 + R() * 140); c.fillStyle = 'rgba(' + v + ',' + v + ',' + v + ',.35)'; c.beginPath(); c.ellipse(x, y, 6 + R() * 14, 2 + R() * 3, 0, 0, 7); c.fill(); } });
    wave.wrapS = wave.wrapT = T.RepeatWrapping; wave.repeat.set(2500, 2500);      /* 잔물결(햇빛 반짝임) */
    var sea = new T.Mesh(new T.PlaneGeometry(500000, 500000), new T.MeshPhongMaterial({ color: 0x1d3f5c, specular: 0x8aa2b8, shininess: 90, bumpMap: wave, bumpScale: 0.6 }));
    sea.rotation.x = -Math.PI / 2; sea.position.y = -1; sc.add(sea); S.sea = sea;
    /* 육지(해안선) */
    var geo = ATC.GEO && ATC.GEO[ATC.aptId], landTex = cityTex();
    landTex.wrapS = landTex.wrapT = T.RepeatWrapping;
    var landMat = new T.MeshLambertMaterial({ map: landTex }), cityLights = [], bigN = noiseTex(256);
    landMat.onBeforeCompile = function (sh) { sh.uniforms.map2 = { value: bigN }; sh.fragmentShader = 'uniform sampler2D map2;\n' + sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n  diffuseColor.rgb *= mix(0.7, 1.2, texture2D(map2, vMapUv * 0.037).r);'); };      /* 큰 얼룩(동네마다 색이 조금씩 다름) */
    if (geo && geo.land) geo.land.forEach(function (poly) {
      poly.forEach(function (ring) {
        if (ring.length < 6) return; var sh = new T.Shape(); for (var k = 0; k < ring.length; k += 2) { if (!k) sh.moveTo(ring[k] * NM, ring[k + 1] * NM); else sh.lineTo(ring[k] * NM, ring[k + 1] * NM); }
        var g = new T.ShapeGeometry(sh); var uv = g.attributes.uv, pos = g.attributes.position; for (var q = 0; q < uv.count; q++) uv.setXY(q, pos.getX(q) / 900, pos.getY(q) / 900);
        var m = new T.Mesh(g, landMat); m.rotation.x = -Math.PI / 2; m.position.y = 0.5; sc.add(m);
        for (var q2 = 0; q2 < ring.length; q2 += 2) if (Math.random() < 0.6) { var bx = ring[q2] * NM, by = ring[q2 + 1] * NM; for (var z = 0; z < 6; z++) cityLights.push(new T.Vector3(bx + (Math.random() - 0.5) * 6000, 2, -(by + (Math.random() - 0.5) * 6000))); }
      });
    });
    S.city = lightPoints(cityLights, 0xffc98a, 2.2); sc.add(S.city);
    S.landRings = geo && geo.land ? geo.land : []; buildCity(sc); buildMarks(sc);
    /* 공항: 유도로 · 계류장 · 활주로 */
    var ap = new T.Group(); sc.add(ap); S.ap = ap;
    var elev = (D.airport.elev || 0) * FT; S.elev = elev;
    var twyMat = new T.MeshLambertMaterial({ color: 0x55585c }), apronMat = new T.MeshLambertMaterial({ color: 0x6b6e70 }), SAT = !!D.sat;
    if (SAT) buildSat(ap, elev);      /* 공항 항공사진(지상 관제 화면과 같은 그림)을 바닥에 깖 — 유도로 · 계류장 · 터미널 모형은 그리지 않음 */
    var twyLights = [];
    (D.gE || []).forEach(function (e) {
      var a = D.gN[e.a], b = D.gN[e.b]; if (!a || !b) return;
      var pa = D.uv2xy(a.u, a.v), pb = D.uv2xy(b.u, b.v), A = P(pa.x, pa.y), B = P(pb.x, pb.y), len = A.distanceTo(B); if (len < 1) return;
      if (!SAT) { var m = new T.Mesh(new T.PlaneGeometry(e.kind === 'rwy' ? 0.1 : 24, len + 20), e.kind === 'stand' || e.kind === 'apron' ? apronMat : twyMat);
      m.rotation.x = -Math.PI / 2; m.rotation.z = Math.atan2(-(B.x - A.x), -(B.z - A.z)); m.position.set((A.x + B.x) / 2, elev + 0.25, (A.z + B.z) / 2); ap.add(m); }
      for (var s = 0; s < len; s += 30) { var t = s / len; twyLights.push(new T.Vector3(A.x + (B.x - A.x) * t, elev + 0.8, A.z + (B.z - A.z) * t)); }
    });
    ap.add(S.twyL = lightPoints(twyLights, 0x3cff6a, 2.5));
    /* 계류장 · 터미널 */
    var groups = {}; Object.keys(D.stands || {}).forEach(function (k) { var s = D.stands[k], g = s.grp || 'X'; (groups[g] = groups[g] || []).push(D.uv2xy(s.u, s.v)); });
    var bldMat = new T.MeshLambertMaterial({ color: 0xc9ccd0 }), glassMat = new T.MeshPhongMaterial({ color: 0x5d7d98, shininess: 80, specular: 0x9ab4cc });
    if (!SAT) Object.keys(groups).forEach(function (g) {
      var ps = groups[g], cx = 0, cy = 0; ps.forEach(function (p) { cx += p.x; cy += p.y; }); cx /= ps.length; cy /= ps.length;
      var spread = 0; ps.forEach(function (p) { spread = Math.max(spread, Math.hypot(p.x - cx, p.y - cy)); });
      var w = Math.max(120, spread * NM * 1.6), apr = new T.Mesh(new T.PlaneGeometry(w + 160, w * 0.7 + 160), apronMat); apr.rotation.x = -Math.PI / 2; apr.position.copy(P(cx, cy, elev + 0.2)); ap.add(apr);
      if (/^(T|K|N)/.test(g)) { var h = /^T/.test(g) ? 28 : 16, b = new T.Mesh(new T.BoxGeometry(w * 0.8, h, 70), /^T/.test(g) ? glassMat : bldMat); b.position.copy(P(cx, cy, elev + h / 2)); b.position.x += 140; ap.add(b); }
    });
    if (D.airport.tower) { var tp = D.uv2xy(D.airport.tower.u, D.airport.tower.v), tw = new T.Mesh(new T.CylinderGeometry(5, 7, 110, 12), bldMat); tw.position.copy(P(tp.x, tp.y, elev + 55)); ap.add(tw); var cab = new T.Mesh(new T.CylinderGeometry(13, 10, 12, 12), glassMat); cab.position.copy(P(tp.x, tp.y, elev + 116)); ap.add(cab); }
    /* 활주로 */
    var edgeL = [], thrG = [], endR = [], clL = [], tdzL = [], alsL = []; S.papi = []; S.rabbit = [];
    Object.keys(D.rw || {}).forEach(function (k) {
      var rw = D.rw[k], ea = D.ends[rw.a], eb = D.ends[rw.b]; if (!ea || !eb) return;
      var A = P(ea.thr.x, ea.thr.y, elev + 0.35), B = P(eb.thr.x, eb.thr.y, elev + 0.35), len = A.distanceTo(B), wid = rw.width || 45;
      var tex = canvasTex(128, 4096, function (c, w, h) { rwyPaint(c, w, h, len, wid, rw.a, rw.b); });
      var m = new T.Mesh(new T.PlaneGeometry(wid, len), new T.MeshLambertMaterial({ map: tex }));
      m.rotation.x = -Math.PI / 2; m.rotation.z = Math.atan2(B.x - A.x, B.z - A.z); m.position.set((A.x + B.x) / 2, elev + 0.35, (A.z + B.z) / 2); ap.add(m);
      var dir = new T.Vector3().subVectors(B, A).normalize(), side = new T.Vector3(-dir.z, 0, dir.x);
      for (var s = 0; s <= len; s += 60) { var p = A.clone().addScaledVector(dir, s); edgeL.push(p.clone().addScaledVector(side, wid / 2 + 1).setY(elev + 1), p.clone().addScaledVector(side, -wid / 2 - 1).setY(elev + 1)); }
      for (s = 0; s <= len; s += 15) clL.push(A.clone().addScaledVector(dir, s).setY(elev + 0.6));
      [[ea, A, dir], [eb, B, dir.clone().negate()]].forEach(function (q) {
        var e = q[0], o = q[1], d = q[2], sd = new T.Vector3(-d.z, 0, d.x);
        for (var w2 = -wid / 2; w2 <= wid / 2; w2 += 4) { thrG.push(o.clone().addScaledVector(sd, w2).setY(elev + 0.8)); endR.push(o.clone().addScaledVector(sd, w2).addScaledVector(d, -2).setY(elev + 0.8)); }
        for (var t2 = 60; t2 <= 900; t2 += 30) [-9, -6, -3, 3, 6, 9].forEach(function (lw) { tdzL.push(o.clone().addScaledVector(d, t2).addScaledVector(sd, lw).setY(elev + 0.6)); });
        /* 진입등(약 900m) · 연속 섬광등 */
        for (var dd = 30; dd <= 900; dd += 30) { [-6, -3, 0, 3, 6].forEach(function (lw) { alsL.push(o.clone().addScaledVector(d, -dd).addScaledVector(sd, lw).setY(elev + 2)); }); if (dd === 300) for (var cb = -15; cb <= 15; cb += 2.5) alsL.push(o.clone().addScaledVector(d, -dd).addScaledVector(sd, cb).setY(elev + 2)); if (dd >= 330) S.rabbit.push({ p: o.clone().addScaledVector(d, -dd).setY(elev + 2.5), k: dd }); }
        /* PAPI: 접지점 옆 왼쪽 4개 */
        var base = o.clone().addScaledVector(d, 320).addScaledVector(sd, -(wid / 2 + 15));
        for (var pi = 0; pi < 4; pi++) S.papi.push({ p: base.clone().addScaledVector(sd, -pi * 9).setY(elev + 1.2), ang: [3.5, 3.17, 2.83, 2.5][pi], end: e.id });
      });
    });
    ap.add(S.edgeL = lightPoints(edgeL, 0xfff3d0, 4)); ap.add(lightPoints(thrG, 0x30ff60, 4)); ap.add(lightPoints(endR, 0xff2a2a, 4)); ap.add(S.clL = lightPoints(clL, 0xfff8e6, 3)); ap.add(S.tdzL = lightPoints(tdzL, 0xffffff, 2.5)); ap.add(S.alsL = lightPoints(alsL, 0xfff1d6, 4.5));
    var pg = new T.BufferGeometry(); pg.setAttribute('position', new T.BufferAttribute(new Float32Array(S.papi.length * 3), 3)); pg.setAttribute('color', new T.BufferAttribute(new Float32Array(S.papi.length * 3), 3));
    S.papi.forEach(function (q, i) { pg.attributes.position.setXYZ(i, q.p.x, q.p.y, q.p.z); });
    S.papiPts = new T.Points(pg, new T.PointsMaterial({ size: 9, sizeAttenuation: false, map: S.glow, vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending })); ap.add(S.papiPts);
    var rg = new T.BufferGeometry(); rg.setAttribute('position', new T.BufferAttribute(new Float32Array(3), 3)); S.rabbitPt = new T.Points(rg, new T.PointsMaterial({ color: 0xffffff, size: 16, sizeAttenuation: false, map: S.glow, transparent: true, depthWrite: false, blending: T.AdditiveBlending })); ap.add(S.rabbitPt);
    /* 구름 */
    S.clouds = new T.Group(); sc.add(S.clouds);
    var ctex = canvasTex(256, 128, function (c, w, h) { for (var k = 0; k < 40; k++) { var x = w * (0.15 + Math.random() * 0.7), y = h * (0.35 + Math.random() * 0.35), rr = 18 + Math.random() * 30, g = c.createRadialGradient(x, y, 0, x, y, rr); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); } });
    for (i = 0; i < 70; i++) { var sp = new T.Sprite(new T.SpriteMaterial({ map: ctex, transparent: true, depthWrite: false, opacity: 0.85, fog: true })); var ang = Math.random() * Math.PI * 2, dist = 6000 + Math.random() * 90000; sp.position.set(Math.cos(ang) * dist, (3500 + Math.random() * 5000) * FT, Math.sin(ang) * dist); var s2 = 2500 + Math.random() * 4000; sp.scale.set(s2, s2 * 0.45, 1); S.clouds.add(sp); }
    /* 주변 항공기 */
    S.others = {}; S.acGeo = mkAcGeo();
    /* 조종석 */
    S.rig = new T.Group(); sc.add(S.rig); S.ck = new T.Group(); S.rig.add(S.ck); S.rig.add(S.cam); buildCockpit();      /* rig = 항공기에 붙은 틀(조종석 모형 + 카메라), 둘러보기는 카메라만 돌림 */
    /* 입력 */
    S.look = { yaw: 0.05, pitch: -0.16, fov: 70 }; S.view = 'ck';
    bindInput(); resize();
    S.vis = null; S.last = performance.now();
  }
  function rwyPaint(c, w, h, len, wid, idA, idB) {
    c.fillStyle = '#3a3c3f'; c.fillRect(0, 0, w, h);
    for (var k = 0; k < 900; k++) { c.fillStyle = 'rgba(0,0,0,' + (0.05 + Math.random() * 0.1) + ')'; c.fillRect(w * 0.3 + Math.random() * w * 0.4, Math.random() * h, 2, 30 + Math.random() * 80); }
    var mpp = h / len, wp = w / wid; c.fillStyle = '#e9ecef';
    c.fillRect(w * 0.03, 0, 1.2 * wp, h); c.fillRect(w * 0.97 - 1.2 * wp, 0, 1.2 * wp, h);
    for (var y = 120; y < len - 120; y += 50) c.fillRect(w / 2 - 0.6 * wp, y * mpp, 1.2 * wp, 30 * mpp);
    [[0, idA, 1], [h, idB, -1]].forEach(function (q) {
      var y0 = q[0], d = q[2];
      for (var b = 0; b < 16; b++) { if (b === 7 || b === 8) continue; var x = w * 0.08 + b * (w * 0.84 / 16); c.fillRect(x, y0 + d * 6 * mpp - (d < 0 ? 30 * mpp : 0), w * 0.84 / 16 * 0.6, 30 * mpp); }
      c.save(); c.translate(w / 2, y0 + d * 60 * mpp); if (d < 0) c.rotate(Math.PI); c.font = 'bold ' + Math.round(18 * wp) + 'px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'top'; c.scale(1, 2.6); c.fillText(q[1], 0, 0); c.restore();
      var ay = y0 + d * 300 * mpp; c.fillRect(w * 0.22, ay - (d < 0 ? 45 * mpp : 0), 8 * wp, 45 * mpp); c.fillRect(w * 0.78 - 8 * wp, ay - (d < 0 ? 45 * mpp : 0), 8 * wp, 45 * mpp);
      [150, 450, 600].forEach(function (t) { var ty = y0 + d * t * mpp; [0.3, 0.7].forEach(function (fx) { c.fillRect(w * fx - 3 * wp, ty - (d < 0 ? 22 * mpp : 0), 1.8 * wp, 22 * mpp); c.fillRect(w * fx + 1.2 * wp, ty - (d < 0 ? 22 * mpp : 0), 1.8 * wp, 22 * mpp); }); });
    });
  }
  function mkAcGeo() {
    /* 787 비슷한 모양: 앞 = −Z. 동체 · 기수 · 뒤로 젖힌 날개 · 엔진 2 · 꼬리날개 */
    var g = new T.Group(), white = new T.MeshStandardMaterial({ color: 0xf2f4f6, roughness: 0.45, metalness: 0.1 }), gray = new T.MeshStandardMaterial({ color: 0xa9b1b8, roughness: 0.55, metalness: 0.2 }), dk = new T.MeshStandardMaterial({ color: 0x30353b, roughness: 0.6 });
    function flat(pts, th, m, y) { var sh = new T.Shape(); pts.forEach(function (q, i) { if (i) sh.lineTo(q[0], q[1]); else sh.moveTo(q[0], q[1]); }); var geo = new T.ExtrudeGeometry(sh, { depth: th, bevelEnabled: false }); geo.rotateX(Math.PI / 2); var o = new T.Mesh(geo, m); o.position.y = y; g.add(o); return o; }
    var fus = new T.Mesh(new T.CylinderGeometry(2.9, 2.9, 44, 20), white); fus.rotation.x = Math.PI / 2; fus.position.z = 1; g.add(fus);
    var nose = new T.Mesh(new T.SphereGeometry(2.9, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), white); nose.scale.set(1, 2.3, 1); nose.rotation.x = -Math.PI / 2; nose.position.z = -21; g.add(nose);
    var tailc = new T.Mesh(new T.ConeGeometry(2.9, 12, 20), white); tailc.rotation.x = Math.PI / 2; tailc.position.set(0, 0.8, 29); g.add(tailc);
    var win = new T.Mesh(new T.BoxGeometry(3.2, 0.7, 1.6), dk); win.position.set(0, 1.5, -23.2); win.rotation.x = 0.5; g.add(win);
    [1, -1].forEach(function (sd) {
      flat([[0, -6], [sd * 30, 8], [sd * 30, 10.5], [sd * 2.5, 6], [0, 6]], 0.7, white, -1.2);                 /* 날개 */
      flat([[0, 22], [sd * 10.5, 29], [sd * 10.5, 31], [0, 29]], 0.4, white, 0.9);                          /* 수평 꼬리날개 */
      var en = new T.Mesh(new T.CylinderGeometry(1.9, 1.6, 6.5, 18), gray); en.rotation.x = Math.PI / 2; en.position.set(sd * 9.5, -3.4, -1.5); g.add(en);
      var inl = new T.Mesh(new T.CircleGeometry(1.75, 18), dk); inl.position.set(sd * 9.5, -3.4, -4.76); inl.rotation.y = Math.PI; g.add(inl);
    });
    var vst = new T.Mesh(new T.ExtrudeGeometry((function () { var sh = new T.Shape(); sh.moveTo(0, 0); sh.lineTo(6.5, 12); sh.lineTo(10, 12); sh.lineTo(9, 0); return sh; })(), { depth: 0.5, bevelEnabled: false }), white);
    vst.rotation.y = -Math.PI / 2; vst.position.set(0.25, 2, 21); vst.name = 'tail'; g.add(vst);
    return g;
  }
  function otherAc(a) {
    var o = S.others[a.id]; if (o) return o;
    var g = S.acGeo.clone(true), col = a.al && a.al.col ? new T.Color(a.al.col) : new T.Color(0x3366aa);
    g.traverse(function (m) { if (m.name === 'tail') m.material = new T.MeshLambertMaterial({ color: col }); });
    var nl = lightPoints([new T.Vector3(-30, -1.2, 9.5), new T.Vector3(30, -1.2, 9.5), new T.Vector3(0, -3, -8), new T.Vector3(0, 1, 35)], 0xffffff, 6);
    var cols = new Float32Array([1, 0.15, 0.15, 0.15, 1, 0.3, 1, 1, 1, 1, 0.2, 0.2]); nl.geometry.setAttribute('color', new T.BufferAttribute(cols, 3)); nl.material.vertexColors = true; nl.material.color.set(0xffffff);
    g.add(nl); g.userData.nl = nl; S.scene.add(g); return (S.others[a.id] = g);
  }

  /* ---------- 조종석 모형 · 화면 ---------- */
  function buildCockpit() {
    /* 눈 = (0,0,0), 앞 = −Z. 기장석이라 가운데(MCP · EICAS)는 오른쪽(+X) */
    var ck = S.ck, dark = new T.MeshStandardMaterial({ color: 0x2b2f35, roughness: 0.9, metalness: 0.05 }), mid = new T.MeshStandardMaterial({ color: 0x3a4047, roughness: 0.85 }), frameM = new T.MeshStandardMaterial({ color: 0xbfc4c9, roughness: 0.75 }), TILT = -0.28;
    function box(w, h, d, m, x, y, z, rx, rz) { var o = new T.Mesh(new T.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.x = rx || 0; o.rotation.z = rz || 0; ck.add(o); return o; }
    box(2.4, 0.5, 0.06, dark, 0.35, -0.53, -0.97, TILT);             /* 계기판 */
    box(2.5, 0.05, 0.36, mid, 0.35, -0.255, -1.06);                   /* 눈가림판 윗면 */
    box(2.5, 0.12, 0.05, dark, 0.35, -0.31, -0.88);                   /* 눈가림판 앞면 */
    box(0.9, 0.35, 1.1, dark, 0.45, -0.95, -0.45);                    /* 가운데 받침대 */
    box(0.05, 1.0, 0.05, frameM, -0.88, 0.12, -1.0, 0, 0.22);         /* 왼쪽 창틀 */
    box(0.04, 0.85, 0.04, frameM, 0.45, 0.16, -1.08);                 /* 가운데 창틀 */
    box(0.05, 1.0, 0.05, frameM, 1.75, 0.12, -0.95, 0, -0.22);        /* 오른쪽 창틀 */
    box(3.6, 0.4, 1.8, frameM, 0.35, 0.68, -0.5);                     /* 천장 */
    box(0.35, 1.7, 1.8, frameM, -1.45, -0.05, -0.3);                   /* 왼쪽 벽 */
    /* 화면: PFD(기장 정면) · ND · EICAS(가운데) */
    S.disp = {};
    [['pfd', -0.15], ['nd', 0.32], ['eicas', 0.8]].forEach(function (d) {
      var cv = document.createElement('canvas'); cv.width = 640; cv.height = 512; var tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 8;
      var m = new T.Mesh(new T.PlaneGeometry(0.44, 0.352), new T.MeshBasicMaterial({ map: tex, toneMapped: false }));
      m.position.set(d[1], -0.5, -0.935); m.rotation.x = TILT; ck.add(m);
      var bez = new T.Mesh(new T.BoxGeometry(0.47, 0.382, 0.02), new T.MeshStandardMaterial({ color: 0x141619, roughness: 0.6 })); bez.position.set(d[1], -0.502, -0.947); bez.rotation.x = TILT; ck.add(bez);
      S.disp[d[0]] = { cv: cv, c: cv.getContext('2d'), tex: tex, mesh: m };
    });
    /* MCP: 눈가림판 앞면 가운데 */
    var mcv = document.createElement('canvas'); mcv.width = 1600; mcv.height = 160; var mtex = new T.CanvasTexture(mcv); mtex.colorSpace = T.SRGBColorSpace; mtex.anisotropy = 8;
    var mcp = new T.Mesh(new T.PlaneGeometry(1.25, 0.125), new T.MeshBasicMaterial({ map: mtex, toneMapped: false })); mcp.position.set(0.45, -0.31, -0.853); mcp.rotation.x = -0.1; ck.add(mcp);
    S.mcp = { cv: mcv, c: mcv.getContext('2d'), tex: mtex, mesh: mcp, hits: [] };
    /* 기어 레버(EICAS 오른쪽) · 플랩 레버 표시(받침대) */
    var gearKnob = new T.Mesh(new T.CylinderGeometry(0.028, 0.028, 0.05, 16), new T.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.4 })); gearKnob.rotation.z = Math.PI / 2; gearKnob.position.set(1.1, -0.47, -0.92); ck.add(gearKnob); S.gearKnob = gearKnob;
    var gearLbl = canvasTex(128, 64, function (c) { c.fillStyle = '#2b2f35'; c.fillRect(0, 0, 128, 64); c.fillStyle = '#fff'; c.font = 'bold 22px sans-serif'; c.textAlign = 'center'; c.fillText('GEAR', 64, 26); c.font = '16px sans-serif'; c.fillText('UP  ·  DN', 64, 52); });
    var gl = new T.Mesh(new T.PlaneGeometry(0.11, 0.055), new T.MeshBasicMaterial({ map: gearLbl })); gl.position.set(1.1, -0.55, -0.9); gl.rotation.x = TILT; ck.add(gl);
    var flapLbl = canvasTex(256, 96, function (c) { c.fillStyle = '#23272c'; c.fillRect(0, 0, 256, 96); c.fillStyle = '#fff'; c.font = 'bold 26px sans-serif'; c.textAlign = 'center'; c.fillText('FLAPS', 128, 30); c.font = 'bold 34px sans-serif'; c.fillText('▲ UP      DN ▼', 128, 76); });
    var fl = new T.Mesh(new T.PlaneGeometry(0.28, 0.105), new T.MeshBasicMaterial({ map: flapLbl })); fl.position.set(0.62, -0.77, -0.72); fl.rotation.x = -1.0; ck.add(fl); S.flapLbl = fl;
  }

  /* ---------- 입력: 둘러보기 · 누르기 ---------- */
  function bindInput() {
    var el = S.r.domElement, drag = null, ray = new T.Raycaster(), ptr = new T.Vector2(), pinch = null;
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', function (e) { var iv = S.iv || {}; drag = { x: e.clientX, y: e.clientY, yaw: S.look.yaw, pitch: S.look.pitch, cx: iv.cx, cy: iv.cy, moved: false }; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', function (e) {
      if (!drag) { if (imgOn()) el.style.cursor = imgHover(e) ? 'pointer' : 'grab'; return; }
      if (pinch) return; var dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true; if (!drag.moved) return;
      if (imgOn()) { var g = imgLayout(); S.iv.cx = drag.cx - dx / g.s; S.iv.cy = drag.cy - dy / g.s; return; }      /* 그림 조종석: 그림 · 카메라를 함께 옮김 */
      var k = S.look.fov / 62 * 0.005; S.look.yaw = Math.max(-2.4, Math.min(2.4, drag.yaw - dx * k)); S.look.pitch = Math.max(-1.0, Math.min(0.7, drag.pitch - dy * k));
    });
    el.addEventListener('pointerup', function (e) {
      if (drag && !drag.moved && imgOn()) imgHit(e);
      else if (drag && !drag.moved) {
        var rc = el.getBoundingClientRect(); ptr.set((e.clientX - rc.left) / rc.width * 2 - 1, -(e.clientY - rc.top) / rc.height * 2 + 1); ray.setFromCamera(ptr, S.cam);
        var hit = ray.intersectObjects([S.mcp.mesh, S.gearKnob, S.flapLbl], false)[0];
        if (hit) {
          if (hit.object === S.mcp.mesh) { var u = hit.uv.x, v = 1 - hit.uv.y; S.mcp.hits.forEach(function (h) { if (u >= h.x && u <= h.x + h.w && v >= h.y && v <= h.y + h.h) act(h.act); }); }
          else if (hit.object === S.gearKnob) act('gear');
          else if (hit.object === S.flapLbl) act(hit.uv.x < 0.5 ? 'flap-' : 'flap+');
        }
      }
      drag = null;
    });
    function zoomImg(z) { S.iv.z = Math.max(1, Math.min(3, z)); }
    el.addEventListener('wheel', function (e) { e.preventDefault(); if (imgOn()) { zoomImg(S.iv.z * (e.deltaY > 0 ? 0.9 : 1.1)); return; } S.look.fov = Math.max(22, Math.min(80, S.look.fov + Math.sign(e.deltaY) * 4)); }, { passive: false });
    el.addEventListener('touchstart', function (e) { if (e.touches.length === 2) pinch = { d: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY), f: S.look.fov, z: S.iv ? S.iv.z : 1 }; }, { passive: true });
    el.addEventListener('touchmove', function (e) { if (pinch && e.touches.length === 2) { var d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); if (imgOn()) zoomImg(pinch.z * d / pinch.d); else S.look.fov = Math.max(22, Math.min(80, pinch.f * pinch.d / d)); } }, { passive: true });
    el.addEventListener('touchend', function (e) { if (e.touches.length < 2) pinch = null; });
    window.addEventListener('resize', resize);
  }
  function act(a) { var p = S.sim && S.sim.pilot; if (!p || !p.ac) return; p.cockpit(a); if (ATC.ui && ATC.ui.redraw) ATC.ui.redraw(); }
  C.view = function (v) { S.view = v || (S.view === 'ck' ? 'out' : 'ck'); S.look.yaw = S.view === 'ck' ? 0.05 : 0; S.look.pitch = S.view === 'ck' ? -0.16 : -0.15; return S.view; };
  C.zoomPanel = function () { if (S.ci && S.ci.ok) { var d = ivDef(); S.iv = { cx: d.cx < CKI.W / 2 ? 909 : CKI.W / 2, cy: 905, z: d.cx < CKI.W / 2 ? 1.9 : 2.2 }; } S.look.pitch = -0.5; S.look.yaw = 0.3; S.look.fov = 44; };
  C.resetLook = function () { if (S.host) S.iv = ivDef(); S.look.pitch = -0.16; S.look.yaw = 0.05; S.look.fov = 70; };
  function resize() { if (!S.r || !S.host) return; var w = S.host.clientWidth || 800, h = S.host.clientHeight || 500; S.r.setSize(w, h, false); S.r.domElement.style.width = '100%'; S.r.domElement.style.height = '100%'; if (S.ci) S.ci.key = ''; if (!S.cam.view) { S.cam.aspect = w / h; S.cam.updateProjectionMatrix(); } }

  /* ---------- 매 프레임 ---------- */
  C.frame = function (dt) {
    if (!C.on || !S.r || !T) return;
    var sim = S.sim, p = sim.pilot, D = ATC.D; if (!p) return;
    if (S.host.clientWidth && Math.abs(S.host.clientWidth / S.host.clientHeight - S.cam.aspect) > 0.01) resize();
    var st = state(dt), now = performance.now();
    if (ATC.CkSnd) { if (p.done || ATC.app && ATC.app.paused) ATC.CkSnd.stop(); else { ATC.CkSnd.start(); ATC.CkSnd.update(st, p); } }      /* 조종석 소리 */
    if (st) {
      /* 내 항공기 자리 · 자세 */
      var pos = P(st.pos.x, st.pos.y, st.altM), q = new T.Euler(st.pitch * D2R, -st.hdg * D2R, -st.bank * D2R, 'YXZ');
      var qa = new T.Quaternion().setFromEuler(q), ql = new T.Quaternion().setFromEuler(new T.Euler(S.look.pitch, S.look.yaw, 0, 'YXZ'));
      S.rig.position.copy(pos); S.rig.position.y += 3; S.rig.quaternion.copy(qa); S.rig.updateMatrixWorld(true);
      if (S.view === 'out') {
        var orb = new T.Vector3(0, 0, 95).applyEuler(new T.Euler(-0.18 + S.look.pitch * 0.5, S.look.yaw, 0, 'YXZ'));
        S.cam.position.copy(orb); S.cam.lookAt(pos); S.ck.visible = false; ownMesh(pos, qa, true);
      } else if (imgOn()) { S.cam.position.set(0, 0, 0); S.cam.quaternion.identity(); S.ck.visible = false; ownMesh(pos, qa, false); }      /* 그림 조종석: 항공기 정면, 원근은 imgFrame에서 */
      else { S.cam.position.set(0, 0, 0); S.cam.quaternion.copy(ql); S.ck.visible = true; ownMesh(pos, qa, false); }
      var io = imgOn(); S.ci && (S.ci.wrap.style.display = io ? '' : 'none');
      if (io) imgFrame(st);
      else {
        if (S.cam.view) { S.cam.clearViewOffset(); S.cam.aspect = S.host.clientWidth / S.host.clientHeight; S.cam.fov = 0; S.ci && (S.ci.key = ''); }
        var fv = S.look.fov * Math.min(1.3, Math.max(1, 0.95 / S.cam.aspect));      /* 세로 화면(휴대폰): 좌우가 좁아지지 않게 넓힘 */
        if (Math.abs(S.cam.fov - fv) > 0.1) { S.cam.fov = fv; S.cam.updateProjectionMatrix(); }
      }
      S.sky.position.copy(S.rig.position); S.stars.position.copy(S.rig.position);
      var cw = new T.Vector3(); S.cam.getWorldPosition(cw);
      /* 낮 · 밤 */
      env(st.night, pos);
      /* PAPI 색 · 연속 섬광등 */
      var col = S.papiPts.geometry.attributes.color;
      S.papi.forEach(function (q2, i) { var dx = q2.p.distanceTo(new T.Vector3(cw.x, q2.p.y, cw.z)), ang = Math.atan2(cw.y - q2.p.y, dx) / D2R, white = ang > q2.ang; col.setXYZ(i, 1, white ? 1 : 0.12, white ? 1 : 0.1); });
      col.needsUpdate = true;
      if (S.rabbit.length) { var ph = (now / 1000 * 2) % 1, rr = S.rabbit.filter(function (x) { return x.k >= 330; }), ix = Math.floor((1 - ph) * rr.length / 2) * 2; var rp = rr[ix % rr.length].p; S.rabbitPt.geometry.attributes.position.setXYZ(0, rp.x, rp.y, rp.z); S.rabbitPt.geometry.attributes.position.needsUpdate = true; S.rabbitPt.material.opacity = 0.4 + st.night * 0.6; }
      /* 주변 항공기 */
      var seen = {};
      sim.acs.forEach(function (a) {
        if (a === p.ac || a.gone) return; seen[a.id] = 1; var o = otherAc(a), pp = P(a.x, a.y, Math.max(S.elev + 3, (a.alt || 0) * FT));
        o.position.copy(pp); o.rotation.set((a.vs || 0) / 6000 * 0.12, -a.hdg * D2R, 0, 'YXZ');
        var bl = (now / 1000) % 1.2 < 0.08; o.userData.nl.material.size = bl ? 12 : 6; o.userData.nl.material.opacity = bl ? 0.35 + st.night * 0.65 : 0.08 + st.night * 0.92;      /* 낮에는 항법등이 작게 */ o.visible = pp.distanceTo(cw) < 90000;
      });
      Object.keys(S.others).forEach(function (id) { if (!seen[id]) { S.scene.remove(S.others[id]); delete S.others[id]; } });
      /* 화면 */
      if (!S.dispT || now - S.dispT > 66) { S.dispT = now; drawDisp(st); }
    }
    S.r.render(S.scene, S.cam);
  };
  function ownMesh(pos, qa, show) {
    if (!S.own) { S.own = S.acGeo.clone(true); S.own.traverse(function (m) { if (m.name === 'tail') m.material = new T.MeshLambertMaterial({ color: 0x1f6fd1 }); }); S.scene.add(S.own); }
    S.own.visible = show; if (show) { S.own.position.copy(pos); S.own.quaternion.copy(qa); }
  }
  function env(k, pos) {
    var day = 1 - k, sunEl = (day * 50 - 8) * D2R, sunAz = 130 * D2R;
    var sd = new T.Vector3(Math.cos(sunEl) * Math.sin(sunAz), Math.sin(sunEl), -Math.cos(sunEl) * Math.cos(sunAz));
    S.skyU.sunDir.value.copy(sd); S.sun.position.copy(pos).addScaledVector(sd, 10000); S.sun.target.position.copy(pos);
    S.skyU.top.value.setRGB(0.16 * day + 0.01, 0.40 * day + 0.02, 0.72 * day + 0.06); S.skyU.hor.value.setRGB(0.80 * day + 0.06 + k * 0.05, 0.86 * day + 0.07, 0.92 * day + 0.12);
    S.sun.intensity = 1.6 * day; S.hemi.intensity = 0.25 + 0.75 * day;
    S.fog.color.setRGB(0.72 * day + 0.04, 0.80 * day + 0.05, 0.88 * day + 0.08); S.fog.density = 0.000035 + k * 0.00002; S.skyU.hor.value.copy(S.fog.color); var sw = S.satSea || (ATC.aptId === 'RJTT' ? [0.21, 0.31, 0.33] : [0.13, 0.27, 0.38]); S.sea.material.color.setRGB(sw[0] * 0.92 * day + 0.02, sw[1] * 0.92 * day + 0.03, sw[2] * 0.92 * day + 0.05);      /* 바다색 = 공항 사진의 바다색에 맞춤 */
    (S.bldMats || []).forEach(function (m) { m.emissiveIntensity = k * 0.95; });
    if (S.fuji) { S.fuji.visible = day > 0.25; S.fuji.material.opacity = 0.92 * day; }
    if (S.markL) S.markL.material.opacity = 0.35 + k * 0.65;
    S.stars.material.opacity = k; S.city.material.opacity = k; S.stars.visible = k > 0.05; S.city.visible = k > 0.05;
    var li = 0.05 + k * 0.95; [S.edgeL, S.clL, S.tdzL, S.twyL].forEach(function (o) { if (o) o.material.opacity = li; }); if (S.alsL) S.alsL.material.opacity = 0.3 + k * 0.7;      /* 낮에는 활주로 등이 거의 안 보임(진입등은 조금) */
    S.clouds.children.forEach(function (c) { c.material.color.setRGB(0.35 + day * 0.65, 0.37 + day * 0.63, 0.42 + day * 0.58); });
  }
  /* 상태값(시뮬레이션 → 계기 · 3D) */
  function state(dt) {
    var sim = S.sim, p = sim.pilot, ac = p.ac, D = ATC.D, ro = p.roll; if (!ac) return null;
    var v = S.vis || (S.vis = { pitch: 0, bank: 0, hdgPrev: ac.hdg, ias: ac.ias, trend: 0 });
    var x, y, alt, hdg, ias, vs, gs;
    if (ro) {      /* 착륙 뒤 활주: 접지점에서 중심선을 따라 감속 */
      var tt = (sim.t - ro.t0), sdt = sim.t - (ro.lt === undefined ? sim.t : ro.lt); ro.lt = sim.t; ro.v = Math.max(0, ro.v0 - Math.max(0, tt - 1.5) * 2.6); ro.s = (ro.s || 0) + ro.v * 0.5144 * sdt / NM;
      x = ro.x + Math.sin(ro.hdg * D2R) * ro.s; y = ro.y + Math.cos(ro.hdg * D2R) * ro.s; hdg = ro.hdg; ias = ro.v; gs = ro.v; vs = 0;
      alt = D.airport.elev + Math.max(0, ro.h0 * (1 - tt / 3));
    } else { x = ac.x; y = ac.y; alt = ac.alt; hdg = ac.hdg; ias = ac.ias; vs = ac.vs || 0; gs = ac.gs; }
    var ra = alt - D.airport.elev, ap = ac.appr;
    /* 자세: 기수 각 = 비행 경로각 + 받음각, 경사 = 선회율에서 */
    var gam = Math.atan2(vs * FT / 60, Math.max(30, gs) * 0.5144) / D2R, aoa = Math.max(1, Math.min(7, 2 + (250 - ias) / 30)) + p.cfg.flapPos / 30 * -1.5;
    var tp = ro ? (sim.t - ro.t0 < 3 ? 4 * (1 - (sim.t - ro.t0) / 3) : 0) : gam + aoa + (ap && ap.gs && ra < 60 ? (60 - ra) / 60 * 3 : 0);
    var sdt = sim.t - (v.tPrev === undefined ? sim.t : v.tPrev), rate = sdt > 0 ? (((hdg - v.hdgPrev + 540) % 360) - 180) / sdt : (v.rate || 0); if (sdt > 0) { v.tPrev = sim.t; v.hdgPrev = hdg; v.rate = rate; }
    var tb = ro ? 0 : Math.max(-25, Math.min(25, Math.atan(gs * 0.5144 * rate * D2R / 9.81) / D2R));
    var kk = Math.min(1, dt * 2); v.pitch += (tp - v.pitch) * kk; v.bank += (tb - v.bank) * Math.min(1, dt * 1.5);
    if (sdt > 0) { v.trend += ((ias - v.ias) / sdt * 10 - v.trend) * Math.min(1, dt * 2); v.ias = ias; }
    var e = ap ? D.ends[ap.rwy] : D.ends[ac.rwy], gsDev = null, locDev = null;
    if (e && ap) { var g = ATC.ilsGeom({ x: x, y: y }, e); locDev = Math.max(-2.5, Math.min(2.5, g.xtk / (0.6 * Math.max(0.15, g.d) / 10 + 0.02))); gsDev = Math.max(-2.5, Math.min(2.5, (alt - ATC.gsAlt(g.d)) / Math.max(40, g.d * 50))); }
    var nav = ac.nav || {}, route = [];
    if (nav.mode === 'route' && nav.route) for (var i = nav.i; i < nav.route.length && route.length < 6; i++) { var f = D.fix[nav.route[i]]; if (f) route.push({ id: nav.route[i], x: f.x, y: f.y }); }
    var cur = route[0], nf = cur ? { id: cur.id, d: Math.hypot(cur.x - x, cur.y - y), eta: '' } : null;
    if (nf) { var secs = nf.d / Math.max(60, gs) * 3600, ut = sim.utc() + secs, h = Math.floor(ut / 3600) % 24, mi = (ut / 60) % 60; nf.eta = (h < 10 ? '0' : '') + h + (mi < 10 ? '0' : '') + mi.toFixed(1) + 'z'; }
    var fixes = []; Object.keys(D.fix).forEach(function (k) { var f = D.fix[k]; if (/^[A-Z]{5}$/.test(k) && Math.hypot(f.x - x, f.y - y) < 40 && !route.some(function (r) { return r.id === k; })) fixes.push({ id: k, x: f.x, y: f.y }); });
    var traffic = sim.acs.filter(function (a) { return a !== ac && !a.gone && !a.onGround; }).map(function (a) { return { x: a.x, y: a.y, alt: a.alt, vs: a.vs || 0 }; });
    var rwys = Object.keys(D.rw || {}).map(function (k) { var r = D.rw[k], a = D.ends[r.a], b = D.ends[r.b]; return a && b ? { a: a.thr, b: b.thr } : null; }).filter(Boolean);
    var flapSpd = [['UP', 230], ['1', 210], ['5', 190], ['15', 170], ['20', 160]].filter(function (f) { return f[1] > ac.perf.vapp + 15; });
    var plc = { 0: 340, 1: 255, 5: 235, 15: 205, 20: 195, 25: 185, 30: 180 }, minS = { 0: 210, 1: 190, 5: 170, 15: 155, 20: 150, 25: 145, 30: ac.perf.vapp - 8 };
    var at = 'SPD', roll = ro ? 'ROLLOUT' : nav.mode === 'route' ? 'LNAV' : ap && ap.loc ? 'LOC' : 'HDG SEL', pitch = ro ? 'ROLLOUT' : ap && ap.gs ? (ra < 60 ? 'FLARE' : 'G/S') : Math.abs(vs) > 50 ? 'FLCH SPD' : 'ALT';
    var fmaNow = at + roll + pitch; if (S.fmaPrev !== fmaNow) { S.fmaChg = { t: performance.now(), roll: S.fmaRoll !== roll, pitch: S.fmaPitch !== pitch }; S.fmaPrev = fmaNow; S.fmaRoll = roll; S.fmaPitch = pitch; }
    var fmaNew = S.fmaChg && performance.now() - S.fmaChg.t < 10000 ? S.fmaChg : null;
    var mins = (D.airport.elev || 0) + 200, mc = p.mcp || {};
    var msgs = []; if (p.cfg.gear !== 'down' && ra < 1600 && ap && ap.loc) msgs.push(['CONFIG GEAR', ra < 1000 ? 'warn' : 'caut']); if (ap && ap.gs && p.cfg.flap < 25 && ra < 2000) msgs.push(['CONFIG FLAPS', 'caut']); if (!p.landOk && ra < 1200 && ap && ap.loc && !ro) msgs.push(['NO LAND CLEARANCE', 'caut']); if (ro) msgs.push(['AUTOBRAKE 2', 'memo']); else if (ap && ap.loc) msgs.push(['AUTOBRAKE 2', 'memo']);
    var n1 = ro ? Math.max(22, 30 - (sim.t - ro.t0) * 0.5) : Math.max(24, Math.min(95, 52 + vs / 100 + (mc.spd - ias) * 0.8 + p.cfg.flapPos * 0.4 + (p.cfg.gear === 'down' ? 6 : 0)));
    var gpws = !ro && ap && ap.gs && p.cfg.gear !== 'down' && ra < 500 ? 'TOO LOW GEAR' : !ro && ra < 1000 && !(ap && ap.loc) && vs < -1500 ? 'SINK RATE' : '';
    return {
      pos: { x: x, y: y }, altM: alt * FT, alt: alt, ias: ias, tas: ias * (1 + alt / 1000 * 0.0165), gs: gs, vs: ro ? 0 : vs, hdg: hdg, pitch: v.pitch, bank: v.bank, slip: 0, trend: v.trend,
      sel: { spd: Math.round(mc.spd || ias), hdg: Math.round(mc.hdg || hdg), alt: mc.alt || Math.round(alt) }, ra: ra, mins: 200, minAlert: ra < 300 && ra > 30 && !ro && ap && ap.gs, elev: D.airport.elev, baro: sim.qnh ? (sim.qnh + ' HPA') : 'STD',
      vmax: plc[p.cfg.flap] || 340, vmin: minS[p.cfg.flap] || 150, vref: ac.perf.vapp - 5, flapSpd: flapSpd,
      fd: true, fdRoll: ((mc.hdg || hdg) - hdg + 540) % 360 - 180, fdPitch: 0, ap: true, at: true,
      fma: { at: at, roll: roll, pitch: pitch, rollArm: ap && !ap.loc ? 'LOC' : nav.mode === 'hdg' && p.asg.dct ? 'LNAV' : '', pitchArm: ap && !ap.gs ? 'G/S' : '', ap: ro ? '' : ap && ap.gs && ra < 1500 ? 'LAND 3' : 'A/P' }, fmaNew: fmaNew,
      ils: { tuned: !!(e && (ap || p.ilsOk)), ident: e && e.ilsId || 'ILS', freq: e && e.ilsFq || '', crs: e ? Math.round(e.crs) : 0, rwy: e ? e.id : '', loc: locDev, gs: gsDev, dme: e ? Math.hypot(e.thr.x - x, e.thr.y - y) : null, thr: e ? e.thr : null },
      gpws: gpws, route: route, next: nf, fixes: fixes, traffic: traffic, rwys: rwys, range: ra < 3000 ? 10 : ra < 9000 ? 20 : 40, wind: sim.wind || { dir: 0, spd: 0 },
      n1: [n1, n1 + 0.4], egt: [380 + n1 * 5, 384 + n1 * 5], tat: Math.round(15 - alt / 1000 * 2), msgs: msgs, gear: p.cfg.gear, flap: p.cfg.flap, flapPos: p.cfg.flapPos, fuel: 14.2 - sim.t / 3600 * 5.4, gw: 196 - sim.t / 3600 * 5.4,
      night: ATC.R && ATC.R.nightK ? ATC.R.nightK(sim) : 0
    };
  }
  function lowStrip(c, x, y, w, h, st) {
    c.fillStyle = '#000'; c.fillRect(x, y, w, h); c.strokeStyle = '#3a4048'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x + 8, y + 2); c.lineTo(x + w - 8, y + 2); c.stroke();
    var f = Math.round(h * 0.2) + 'px ui-monospace,Menlo,Consolas,monospace', r1 = y + h * 0.32, r2 = y + h * 0.72;
    function t(s, xx, yy, col, al) { c.fillStyle = col; c.font = 'bold ' + f; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(s, xx, yy); }
    var wd = st.wind || { dir: 0, spd: 0 };
    t('GS ' + Math.round(st.gs), x + w * 0.04, r1, '#fff'); t('TAS ' + Math.round(st.tas), x + w * 0.38, r1, '#fff'); t(('00' + Math.round(wd.dir || 0)).slice(-3) + '°/' + Math.round(wd.spd || 0), x + w * 0.96, r1, '#fff', 'right');
    var gc = st.gear === 'down' ? '#3ee07a' : st.gear === 'up' ? '#fff' : '#ffb43c';
    t('GEAR ' + (st.gear === 'down' ? 'DN' : st.gear === 'up' ? 'UP' : '···'), x + w * 0.04, r2, gc); t('FLAPS ' + (st.flap || 'UP'), x + w * 0.5, r2, st.flapPos !== undefined && Math.abs(st.flapPos - st.flap) > 0.05 ? '#ffb43c' : '#3ee07a');
  }
  function drawDisp(st) {
    var Dp = ATC.CDisp;
    if (imgOn()) {      /* 그림 조종석: 기장 PFD · ND · EICAS를 그리고 부기장 쪽은 복사 */
      var sc = S.ci.scr; [1, 2].forEach(function (i) { var d = sc[i]; Dp[d.q[4]](d.c, d.cv.width, d.cv.height, st); });
      var pf = sc[0], W = pf.cv.width, H = pf.cv.height, Hp = Math.round(W / 1.18);      /* 세로 화면: 위는 PFD(가로 비율 그대로), 아래 줄은 속도 · 바람 · 기어 · 플랩 */
      pf.c.save(); pf.c.beginPath(); pf.c.rect(0, 0, W, Hp); pf.c.clip(); Dp.pfd(pf.c, W, Hp, st); pf.c.restore();
      lowStrip(pf.c, 0, Hp, W, H - Hp, st);
      sc[3].c.drawImage(sc[1].cv, 0, 0); sc[4].c.drawImage(sc[0].cv, 0, 0);
      return;
    }
    ['pfd', 'nd', 'eicas'].forEach(function (k) { var d = S.disp[k]; Dp[k](d.c, d.cv.width, d.cv.height, st); d.tex.needsUpdate = true; });
    S.mcp.hits = Dp.mcp(S.mcp.c, S.mcp.cv.width, S.mcp.cv.height, st); S.mcp.tex.needsUpdate = true;
  }
})();
