/* AIRLINE SAGA — 조종사 체험 2단계: 3D 조종석(787식) — three.js(MIT, assets/lib)를 처음 열 때 내려받음
   - 창밖: 바다 · 육지(실제 해안선) · 활주로(표시 · 등화 · 진입등 · PAPI) · 유도로 · 터미널 · 관제탑 · 하늘 · 해 · 안개 · 구름 · 밤 · 주변 항공기
   - 조종석: 눈가림판 · MCP · 화면 3개(PFD · ND · EICAS) · 창틀 · 기어 레버 · 플랩 레버 — 마우스 · 손가락으로 둘러보기, 눌러서 조작
   - 착륙 뒤 활주 감속(롤아웃)은 여기서 그림(관제 시뮬레이션에서는 접지 순간 빠짐)
   좌표: 레이더 좌표(NM, 동 x · 북 y) → 3D(m): X = x·1852, Z = −y·1852, Y = 고도(m) */
(function () {
  'use strict';
  var ATC = window.ATC, NM = 1852, FT = 0.3048, D2R = Math.PI / 180;
  var BASE = (function () { var s = document.currentScript && document.currentScript.src || ''; return s.replace(/js\/cockpit3d\.js.*$/, ''); })();
  var T = null, C = ATC.Cockpit = { on: false, ok: !!window.WebGLRenderingContext };
  var S = {};      /* 장면 상태 */

  function load(cb) {
    if (T) return cb();
    import(BASE + 'assets/lib/three.module.min.js').then(function (m) { T = m; cb(); }).catch(function (e) { C.err = String(e); cb(e); });
  }
  C.open = function (sim, host) {
    S.sim = sim; S.host = host; C.on = true; host.hidden = false;
    load(function (e) { if (e) { host.innerHTML = '<div class="ckerr">' + ATC.T('3D를 불러오지 못했습니다') + '</div>'; return; } if (!S.r || S.apt !== ATC.aptId) build(); else resize(); S.host.appendChild(S.r.domElement); });
  };
  C.close = function () { C.on = false; if (S.host) S.host.hidden = true; };

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
  function build() {
    var D = ATC.D; S.apt = ATC.aptId;
    if (S.r) { S.r.dispose(); }
    var r = S.r = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', logarithmicDepthBuffer: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6)); r.outputColorSpace = T.SRGBColorSpace; r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
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
    var sea = new T.Mesh(new T.PlaneGeometry(500000, 500000), new T.MeshPhongMaterial({ color: 0x1d3f5c, specular: 0x6a8aa8, shininess: 60 }));
    sea.rotation.x = -Math.PI / 2; sea.position.y = -1; sc.add(sea); S.sea = sea;
    /* 육지(해안선) */
    var geo = ATC.GEO && ATC.GEO[ATC.aptId], landTex = canvasTex(512, 512, function (c, w, h) { c.fillStyle = '#6f7a5e'; c.fillRect(0, 0, w, h); for (var k = 0; k < 2600; k++) { var s = 3 + Math.random() * 14; c.fillStyle = ['#7c8570', '#8a8d84', '#646f56', '#9a9a92', '#5d6a4d', '#888f7c'][k % 6]; c.fillRect(Math.random() * w, Math.random() * h, s, s * (0.6 + Math.random())); } });
    landTex.wrapS = landTex.wrapT = T.RepeatWrapping;
    var landMat = new T.MeshLambertMaterial({ map: landTex }), cityLights = [];
    if (geo && geo.land) geo.land.forEach(function (poly) {
      poly.forEach(function (ring) {
        if (ring.length < 6) return; var sh = new T.Shape(); for (var k = 0; k < ring.length; k += 2) { if (!k) sh.moveTo(ring[k] * NM, ring[k + 1] * NM); else sh.lineTo(ring[k] * NM, ring[k + 1] * NM); }
        var g = new T.ShapeGeometry(sh); var uv = g.attributes.uv, pos = g.attributes.position; for (var q = 0; q < uv.count; q++) uv.setXY(q, pos.getX(q) / 1500, pos.getY(q) / 1500);
        var m = new T.Mesh(g, landMat); m.rotation.x = -Math.PI / 2; m.position.y = 0.5; sc.add(m);
        for (var q2 = 0; q2 < ring.length; q2 += 2) if (Math.random() < 0.6) { var bx = ring[q2] * NM, by = ring[q2 + 1] * NM; for (var z = 0; z < 6; z++) cityLights.push(new T.Vector3(bx + (Math.random() - 0.5) * 6000, 2, -(by + (Math.random() - 0.5) * 6000))); }
      });
    });
    S.city = lightPoints(cityLights, 0xffc98a, 2.2); sc.add(S.city);
    /* 공항: 유도로 · 계류장 · 활주로 */
    var ap = new T.Group(); sc.add(ap); S.ap = ap;
    var elev = (D.airport.elev || 0) * FT; S.elev = elev;
    var twyMat = new T.MeshLambertMaterial({ color: 0x55585c }), apronMat = new T.MeshLambertMaterial({ color: 0x6b6e70 });
    var twyLights = [];
    (D.gE || []).forEach(function (e) {
      var a = D.gN[e.a], b = D.gN[e.b]; if (!a || !b) return;
      var pa = D.uv2xy(a.u, a.v), pb = D.uv2xy(b.u, b.v), A = P(pa.x, pa.y), B = P(pb.x, pb.y), len = A.distanceTo(B); if (len < 1) return;
      var m = new T.Mesh(new T.PlaneGeometry(e.kind === 'rwy' ? 0.1 : 24, len + 20), e.kind === 'stand' || e.kind === 'apron' ? apronMat : twyMat);
      m.rotation.x = -Math.PI / 2; m.rotation.z = Math.atan2(-(B.x - A.x), -(B.z - A.z)); m.position.set((A.x + B.x) / 2, elev + 0.25, (A.z + B.z) / 2); ap.add(m);
      for (var s = 0; s < len; s += 30) { var t = s / len; twyLights.push(new T.Vector3(A.x + (B.x - A.x) * t, elev + 0.8, A.z + (B.z - A.z) * t)); }
    });
    ap.add(S.twyL = lightPoints(twyLights, 0x3cff6a, 2.5));
    /* 계류장 · 터미널 */
    var groups = {}; Object.keys(D.stands || {}).forEach(function (k) { var s = D.stands[k], g = s.grp || 'X'; (groups[g] = groups[g] || []).push(D.uv2xy(s.u, s.v)); });
    var bldMat = new T.MeshLambertMaterial({ color: 0xc9ccd0 }), glassMat = new T.MeshPhongMaterial({ color: 0x5d7d98, shininess: 80, specular: 0x9ab4cc });
    Object.keys(groups).forEach(function (g) {
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
    el.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, yaw: S.look.yaw, pitch: S.look.pitch, moved: false }; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', function (e) { if (!drag || pinch) return; var dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true; if (drag.moved) { var k = S.look.fov / 62 * 0.005; S.look.yaw = Math.max(-2.4, Math.min(2.4, drag.yaw - dx * k)); S.look.pitch = Math.max(-1.0, Math.min(0.7, drag.pitch - dy * k)); } });
    el.addEventListener('pointerup', function (e) {
      if (drag && !drag.moved) {
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
    el.addEventListener('wheel', function (e) { e.preventDefault(); S.look.fov = Math.max(22, Math.min(80, S.look.fov + Math.sign(e.deltaY) * 4)); }, { passive: false });
    el.addEventListener('touchstart', function (e) { if (e.touches.length === 2) pinch = { d: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY), f: S.look.fov }; }, { passive: true });
    el.addEventListener('touchmove', function (e) { if (pinch && e.touches.length === 2) { var d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); S.look.fov = Math.max(22, Math.min(80, pinch.f * pinch.d / d)); } }, { passive: true });
    el.addEventListener('touchend', function (e) { if (e.touches.length < 2) pinch = null; });
    window.addEventListener('resize', resize);
  }
  function act(a) { var p = S.sim && S.sim.pilot; if (!p || !p.ac) return; p.cockpit(a); if (ATC.ui && ATC.ui.redraw) ATC.ui.redraw(); }
  C.view = function (v) { S.view = v || (S.view === 'ck' ? 'out' : 'ck'); S.look.yaw = S.view === 'ck' ? 0.05 : 0; S.look.pitch = S.view === 'ck' ? -0.16 : -0.15; return S.view; };
  C.zoomPanel = function () { S.look.pitch = -0.5; S.look.yaw = 0.3; S.look.fov = 44; };
  C.resetLook = function () { S.look.pitch = -0.16; S.look.yaw = 0.05; S.look.fov = 70; };
  function resize() { if (!S.r || !S.host) return; var w = S.host.clientWidth || 800, h = S.host.clientHeight || 500; S.r.setSize(w, h, false); S.r.domElement.style.width = '100%'; S.r.domElement.style.height = '100%'; S.cam.aspect = w / h; S.cam.updateProjectionMatrix(); }

  /* ---------- 매 프레임 ---------- */
  C.frame = function (dt) {
    if (!C.on || !S.r || !T) return;
    var sim = S.sim, p = sim.pilot, D = ATC.D; if (!p) return;
    if (S.host.clientWidth && Math.abs(S.host.clientWidth / S.host.clientHeight - S.cam.aspect) > 0.01) resize();
    var st = state(dt), now = performance.now();
    if (st) {
      /* 내 항공기 자리 · 자세 */
      var pos = P(st.pos.x, st.pos.y, st.altM), q = new T.Euler(st.pitch * D2R, -st.hdg * D2R, -st.bank * D2R, 'YXZ');
      var qa = new T.Quaternion().setFromEuler(q), ql = new T.Quaternion().setFromEuler(new T.Euler(S.look.pitch, S.look.yaw, 0, 'YXZ'));
      S.rig.position.copy(pos); S.rig.position.y += 3; S.rig.quaternion.copy(qa); S.rig.updateMatrixWorld(true);
      if (S.view === 'out') {
        var orb = new T.Vector3(0, 0, 95).applyEuler(new T.Euler(-0.18 + S.look.pitch * 0.5, S.look.yaw, 0, 'YXZ'));
        S.cam.position.copy(orb); S.cam.lookAt(pos); S.ck.visible = false; ownMesh(pos, qa, true);
      } else { S.cam.position.set(0, 0, 0); S.cam.quaternion.copy(ql); S.ck.visible = true; ownMesh(pos, qa, false); }
      var fv = S.look.fov * Math.min(1.3, Math.max(1, 0.95 / S.cam.aspect));      /* 세로 화면(휴대폰): 좌우가 좁아지지 않게 넓힘 */
      if (Math.abs(S.cam.fov - fv) > 0.1) { S.cam.fov = fv; S.cam.updateProjectionMatrix(); }
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
        var bl = (now / 1000) % 1.2 < 0.08; o.userData.nl.material.size = bl ? 12 : 6; o.visible = pp.distanceTo(cw) < 90000;
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
    S.fog.color.setRGB(0.72 * day + 0.04, 0.80 * day + 0.05, 0.88 * day + 0.08); S.fog.density = 0.000035 + k * 0.00002; S.skyU.hor.value.copy(S.fog.color); S.sea.material.color.setRGB(0.11 * day + 0.02, 0.24 * day + 0.03, 0.36 * day + 0.05);
    S.stars.material.opacity = k; S.city.material.opacity = k; S.stars.visible = k > 0.05; S.city.visible = k > 0.05;
    var li = 0.25 + k * 0.75; [S.edgeL, S.clL, S.tdzL, S.alsL, S.twyL].forEach(function (o) { if (o) o.material.opacity = li; });
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
  function drawDisp(st) {
    var Dp = ATC.CDisp;
    ['pfd', 'nd', 'eicas'].forEach(function (k) { var d = S.disp[k]; Dp[k](d.c, d.cv.width, d.cv.height, st); d.tex.needsUpdate = true; });
    S.mcp.hits = Dp.mcp(S.mcp.c, S.mcp.cv.width, S.mcp.cv.height, st); S.mcp.tex.needsUpdate = true;
  }
})();
