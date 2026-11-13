/* AIRLINE SAGA — ATC 화면 조작: 로비 · 근무 화면 · 지시판 · 스트립 · 교신 기록 · 결과 */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt, R = ATC.R, POS = ATC.POS, NM = 1852;
  var $ = function (id) { return document.getElementById(id); };
  var app = ATC.app = { sim: null, sel: 0, pend: [], speed: 1, paused: false, view: null, voice: true, vmode: 'radio', vfx: 'strong', vrate: 'n', vatc: 'm', ttsEnds: false, coach: true, gloss: true, inst: false, level: 1, flow: 'auto', hit: [], btns: [], mx: 0, my: 0, gt: null, del: {} };
  var REC_KEY = 'acn_atc_rec_v1' + (ATC.aptId && ATC.aptId !== 'XSRA' ? '_' + ATC.aptId : ''), OPT_KEY = 'acn_atc_opt_v1';   /* 근무 기록은 공항별로 따로 */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function imgUrl(rel) { rel = (ATC.base || '') + rel; try { return new URL(rel, location.href).href.replace(/'/g, '%27'); } catch (e) { return rel; } }   /* 스타일시트 기준이 아니라 문서 기준 주소로 */
  function load(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }

  /* ================= 로비 ================= */
  function showLobby() {
    app.sim = null; $('game').hidden = true; $('lobby').hidden = false; closeModal();
    if (window.speechSynthesis) speechSynthesis.cancel(); if (ATC.Radio.ctx) ATC.Radio.stop();      /* 로비로 나오면 남은 소리를 모두 끊음 */
    var opt = load(OPT_KEY, {}), rec = load(REC_KEY, {}); if (opt.level) app.level = opt.level; if (opt.voice !== undefined) app.voice = opt.voice; if (opt.vm2) app.vmode = opt.vm2; if (opt.vfx) app.vfx = opt.vfx; if (opt.vrate) app.vrate = opt.vrate; if (opt.vatc) app.vatc = opt.vatc; voiceSet(); if (opt.flow) app.flow = opt.flow; if (opt.gloss !== undefined) app.gloss = opt.gloss; if (opt.inst !== undefined) app.inst = opt.inst;
    var h = '';
    ATC.POS_ORDER.forEach(function (k, ix) {
      var p = POS[k], r = rec[k + app.level], shut = D.modes && D.modes.indexOf(k) < 0;      /* 이 공항에서 아직 열지 않은 자리 */
      h += '<button class="pcard' + (shut ? ' shut' : '') + '"' + (shut ? ' disabled' : '') + ' data-pos="' + k + '" style="--img:url(\'' + imgUrl('assets/img/pos_' + k.toLowerCase() + '.webp') + '\')"><span class="pnum">0' + (ix + 1) + '</span><span class="pen">' + p.en + '</span><span class="pko">' + p.ko + '</span><span class="pfq">' + p.call + ' · ' + p.fq + '</span><span class="psum">' + p.sum + '</span><span class="prec">' + (shut ? ATC.T('이 공항에서는 준비 중') : r ? ATC.T('최고 {0}점 · {1} ({2}회)', r.best, r.grade, r.n) : ATC.T('기록 없음')) + '</span></button>';
    });
    $('pcards').innerHTML = h;
    /* 실제 공항을 바탕으로 한 묶음은 바닥 글을 그 공항의 안내로 바꿈 */
    if (D.airport.note) { var ft = document.querySelector('.foot'); if (ft && !ft.dataset.base) { ft.dataset.base = '1'; ft.textContent = ATC.T('{0} — 활주로 · 유도로 이름 · 주기장 · 주파수는 공개된 항공정보간행물(AIP)을 바탕으로 줄여 옮긴 것이고, 항공사 · 편명 · 교통량 · 관제 절차의 세부 수치는 가상입니다. 교신 음성은 합성 음성(Kokoro)에 무선 음질을 입힌 것입니다.', D.airport.note); } }
    Array.prototype.forEach.call(document.querySelectorAll('#lvls button'), function (b) { b.classList.toggle('on', +b.dataset.lv === app.level); });
    if (app.flow !== 'auto' && !D.flows[app.flow]) app.flow = 'auto';
    Array.prototype.forEach.call(document.querySelectorAll('#flows button'), function (b) { b.classList.toggle('on', b.dataset.fl === app.flow); });
    Array.prototype.forEach.call(document.querySelectorAll('#vmodes button'), function (b) { b.classList.toggle('on', b.dataset.vm === app.vmode); });
    Array.prototype.forEach.call(document.querySelectorAll('#vfxs button'), function (b) { b.classList.toggle('on', b.dataset.fx === app.vfx); });
    Array.prototype.forEach.call(document.querySelectorAll('#vrates button'), function (b) { b.classList.toggle('on', b.dataset.vr === app.vrate); });
    Array.prototype.forEach.call(document.querySelectorAll('#vatcs button'), function (b) { b.classList.toggle('on', b.dataset.va === app.vatc); });
    $('vmodes').hidden = !app.voice || !ATC.VPARTS; $('vfxs').hidden = !app.voice || app.vmode !== 'radio'; $('vrates').hidden = !app.voice || !packOn(); $('vatcs').hidden = !app.voice || !packOn() || !(ATC.VPARTS && ATC.VPARTS.ctlf);
    var vn = $('vnote'); if (vn) { vn.hidden = !(app.voice && app.vmode === 'radio' && D.voice === false); vn.textContent = ATC.T('이 공항은 아직 녹음한 음성 조각이 없어 브라우저의 영어 음성으로 읽습니다(무선 잡음은 「무선 음질」 설정을 따릅니다).'); }
    $('optVoice').classList.toggle('on', app.voice); $('optVoice').textContent = ATC.T('교신 음성 {0}', (app.voice ? ATC.T('켬') : ATC.T('끔')));
    $('optInst').classList.toggle('on', app.inst); $('optInst').textContent = ATC.T('교관 동행 {0}', (app.inst ? ATC.T('켬') : ATC.T('끔')));
  }
  /* 무선 음질·말 빠르기 설정을 재생기에 넘김 */
  function voiceSet() { var RD = ATC.Radio; RD.fx = app.vfx === 'weak' ? 'weak' : 'strong'; RD.rate = app.vrate === 's' ? 0.9 : app.vrate === 'f' ? 1.12 : 1; RD.atc = app.vatc === 'f' ? 'ctlf' : 'ctl'; if (RD.ctx && app.voice && packOn()) RD.loadAll(); }
  /* 녹음 조각(무선 음성)을 쓰는가: 음성 방식이 「무선 음성」이고, 이 공항의 조각이 있을 때. 조각이 없는 공항(D.voice === false)은 브라우저 음성으로 */
  function packOn() { return app.vmode === 'radio' && D.voice !== false && !!ATC.VPARTS; }      /* 음성 묶음 파일이 아예 없는 판(사이트판)도 브라우저 음성으로 */
  function saveOpt() { save(OPT_KEY, { level: app.level, voice: app.voice, vm2: app.vmode, vfx: app.vfx, vrate: app.vrate, vatc: app.vatc, flow: app.flow, gloss: app.gloss, inst: app.inst }); }
  function briefing(k) {
    var p = POS[k], L = D.levels[app.level], les = ATC.LEARN_BY[p.les];
    var lvTxt = ['', ATC.T('교통량 적음 · 코치가 다음 할 일을 알려 줌 · 비정상 상황 없음 · 복창 오류 없음'), ATC.T('교통량 보통 · 코치 없음 · 비정상 상황 1건 · 가끔 복창 오류'), ATC.T('교통량 많음 · 비정상 상황 여러 건 · 복창 오류 잦음 · 두 활주로 동시 운용')][app.level];
    openModal(ATC.T('<div class="mhead"><span class="pen">{0}</span><h2>{1} <small>{2} {3}</small></h2></div><div class="mbody"><p class="bsum">{4}</p><h4>근무 순서</h4><ol class="bl">{5}</ol><h4>오늘의 난이도 — {6}</h4><p>{7}</p>{11}<details class="bles"><summary>학습 노트: {8} (펼치기)</summary>{9}</details></div><div class="mfoot"><button class="btn" data-m="learn">학습 노트 전체</button><span class="sp"></span><button class="btn" data-m="close">돌아가기</button>{12}<button class="btn pri" data-m="start" data-pos="{10}">근무 시작</button></div>', p.en, p.ko, p.call, p.fq, p.sum, p.brief.map(function (b) { return '<li>' + b + '</li>'; }).join(''), L.ko, lvTxt, les.t, les.h, k,
      app.level === 1 ? ATC.T('<div class="bfirst"><b>처음이라면 이 순서만 기억하세요</b><ol><li>항공기를 누른다(화면의 표지 또는 오른쪽 스트립)</li><li>아래 지시판에서 지시를 고른다</li><li>「송신」을 누른다(Enter)</li><li>조종사의 복창이 내 지시와 같은지 듣는다</li></ol><p>「교관 동행」으로 시작하면, 할 일이 생길 때마다 시간을 멈추고 무엇을 어떻게 말할지 알려 줍니다.</p></div>') : '',
      app.level === 1 && !app.inst ? ATC.T('<button class="btn hi" data-m="startinst" data-pos="{0}">교관 동행으로 시작</button>', k) : ''));
  }

  /* 「바람대로」: 운용 방식마다 정해 둔 비율(w)로 하나를 뽑음 */
  function pickFlow(r) { var ks = Object.keys(D.flows), i, acc = 0; for (i = 0; i < ks.length; i++) { acc += D.flows[ks[i]].w || 1 / ks.length; if (r < acc) return ks[i]; } return ks[ks.length - 1]; }
  /* ================= 근무 시작 ================= */
  function start(k, seed) {
    var Cls = { DEL: ATC.DelSim, GND: ATC.GndSim, TWR: ATC.TwrSim, APP: ATC.AppSim, ACC: ATC.AccSim }[k];
    seed = seed || (Date.now() % 1000000);
    var rng = ATC.rng(seed + 7), flow = app.flow === 'auto' || !D.flows[app.flow] ? pickFlow(rng()) : app.flow;
    var fw = D.flows[flow].wind, wind = { dir: U.n360(fw.dir + rng.int(0, 6) * 10) || 360, spd: fw.spd + rng.int(0, fw.spdN) };
    var sim = app.sim = new Cls({ level: app.level, seed: seed, flow: flow, wind: wind, qnh: 1005 + rng.int(0, 18), startHour: 6 + rng.int(0, 9) });
    app.pos = POS[k]; app.sel = 0; app.pend = []; app.paused = false; app.speed = app.level === 1 ? Math.min(app.pos.spd, 2) : app.pos.spd; app.coach = app.level === 1;   /* 초급은 ×2까지만으로 시작 */ app.gt = null; app.routePrev = null; app.del = {}; app.cmdSig = ''; app.stripSig = ''; app.logN = 0; app.seed = seed; app.over = false; app.recSaved = false;
    $('lobby').hidden = true; $('game').hidden = false; closeModal();
    $('game').className = 'v-' + app.pos.view + (app.gloss ? '' : ' nogloss'); $('logList').innerHTML = ''; $('banner').className = '';
    var cv = $('cv'); resize();
    if (app.pos.view === 'radar') { app.view = R.radarView(k); R.fitRadar(app.view, cv.clientWidth, cv.clientHeight, k); }
    else if (app.pos.view === 'ground') { app.view = R.groundView(); R.fitGround(app.view, cv.clientWidth, cv.clientHeight); }
    sim.log.forEach(addLog);
    if (app.voice) { ATC.Radio.init(); if (packOn()) ATC.Radio.loadAll(); }
    /* 송신이 시작될 때 음성을 틀고, 그 실제 길이만큼 주파수를 점유(글자·소리·항공기 움직임을 맞춤) */
    sim.onTx = function (m) {
      if (m.who === 'sys' || !app.voice || app.paused) return 0;
      var cs = m.ac ? m.ac.cs : '', e = { who: m.who, text: m.text, cs: cs }, busy = ATC.Radio.playing() || (window.speechSynthesis && speechSynthesis.speaking);
      if (app.speed > 2) {   /* ×4·×8: 시간은 맞추지 않고, 무선이 비어 있을 때만 들려줌(겹쳐 들리지 않게) */
        if (!busy) { if (!packOn() || !ATC.Radio.speak(m.text, m.who, cs, true)) tts(e); }
        return 0;
      }
      if (packOn()) { var real = ATC.Radio.speak(m.text, m.who, cs, app.speed > 1); if (real) return real * app.speed; }
      /* 표준 음성: 길이를 미리 알 수 없어 넉넉히 잡아 두고, 말이 실제로 끝나는 순간 송신을 닫음 */
      var est = tts(e, function () { if (app.sim === sim && sim.cur === m) m.end = Math.min(m.end, sim.t); });
      if (est < 0) return -est * 1.05 * app.speed;      /* 소리 없이 넘긴 문장 */
      return est * (app.ttsEnds ? 1.7 : 1.05) * app.speed;
    };
    app.instSeen = {}; app.instT = 0; hideInst();
    sim.listeners.push(function (type, d) {
      if (type === 'log') { addLog(d); }
      else if (type === 'inc') { if (d.pts < 0) banner(d.title, d.cat === 'S' ? 'bad' : 'warn'); }
      else if (type === 'over') { app.over = true; setTimeout(showResult, 900); }
      else if (type === 'sweep') { }
      else if (type === 'gone') { if (d.id === app.sel) { app.sel = 0; app.pend = []; app.gt = null; app.routePrev = null; } }

    });
    $('cli').hidden = app.pos.view !== 'radar';
    renderTop(true); last = 0;
  }
  function resize() {
    var cv = $('cv'), dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  }

  /* ================= 주 반복 ================= */
  var last = 0, accT = 0, uiT = 0;
  function frame(ts) {
    requestAnimationFrame(frame);
    var sim = app.sim; if (!sim || $('game').hidden) { last = ts; return; }
    var dt = last ? Math.min(0.12, (ts - last) / 1000) : 0; last = ts;
    if (!app.paused && !sim.over) {
      accT += dt * app.speed; var step = app.pos.view === 'radar' ? 0.5 : 0.25, n = 0;
      while (accT >= step && n++ < 60) { sim.tick(step); accT -= step; }
      if (n >= 60) accT = 0;
    }
    draw();
    if (app.inst && !app.paused && !sim.over && sim.coach && ts - app.instT > 5000) instCheck(ts);
    uiT += dt; if (uiT > 0.3) { uiT = 0; renderTop(); renderStrips(); renderCmd(); renderCoach(); if (app.pos.view === 'del') renderDel(); }
  }
  function draw() {
    if (app.pos.view === 'del') return;
    var cv = $('cv'), ctx = cv.getContext('2d'), dpr = window.devicePixelRatio || 1; resize();
    var W = cv.clientWidth, H = cv.clientHeight; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (app.pos.view === 'radar') R.drawRadar(ctx, W, H, app); else R.drawGround(ctx, W, H, app);
    if (app.paused && app.instOn) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(0, 0, W, H); }
    else if (app.paused) { ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#fff'; ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(ATC.T('일시 정지'), W / 2, H - 22); ctx.textAlign = 'left'; }
  }

  /* ================= 상단 ================= */
  function renderTop(force) {
    var sim = app.sim, p = app.pos, sc = sim.score();
    $('tPos').innerHTML = '<b>' + p.call.toUpperCase() + '</b><span>' + p.fq + '</span><em>' + p.ko + ' · ' + sim.level.ko + '</em>';
    $('tClock').textContent = U.hhmm(sim.utc()) + ':' + U.pad(Math.floor(sim.utc()) % 60, 2) + ' UTC';
    var rw = sim.mode === 'APP' ? 'ARR ' + sim.rwys.join('/') + ' · DEP ' + sim.flow.dep : sim.mode === 'TWR' ? 'LDG ' + sim.arrRw.join('/') + ' · T/O ' + sim.depRw.join('/') : sim.mode === 'ACC' ? 'FIR SEIRA' : sim.multi ? 'ARR ' + sim.flow.arrs.join('/') + ' · DEP ' + sim.flow.deps.join('/') : 'ARR ' + sim.flow.arr + ' · DEP ' + sim.flow.dep;
    $('tAtis').innerHTML = '<i>ATIS ' + sim.atis + '</i><span>' + rw + '</span><span>WIND ' + fmt.wind(sim.wind).replace(' at ', '/') + 'KT</span><span>QNH ' + sim.qnh + '</span>';
    $('tScore').innerHTML = ATC.T('<span class="sc">{0}<small>점</small></span><span class="k s" title="안전">안전 {1}</span><span class="k e" title="효율">효율 {2}</span><span class="k p" title="절차·교신">절차 {3}</span><span class="k">처리 {4}/{5}</span>', sc.total, sc.S, sc.E, sc.P, sc.handled, (sim.total + sim.sched.length));
    Array.prototype.forEach.call(document.querySelectorAll('#tSpeed button'), function (b) { var s = b.dataset.s; b.classList.toggle('on', s === 'p' ? app.paused : (!app.paused && +s === app.speed)); });
    $('bCoach').classList.toggle('on', app.coach); $('bVoice').classList.toggle('on', app.voice); $('bGloss').classList.toggle('on', app.gloss);
    fitTop();
    var cu = sim.cur, rl = $('tRadio'); rl.className = cu ? (cu.who === 'atc' ? 'tx' : 'rx') : ''; rl.textContent = cu ? (cu.who === 'atc' ? 'TX ▲ ' : 'RX ▼ ') + (cu.ac ? cu.ac.cs : '') : (sim.q.length ? ATC.T('대기 {0}', sim.q.length) : ATC.T('— 수신 대기 —'));
  }
  /* 상단 바가 넘치면 덜 급한 항목부터 통째로 접음(글자를 자르지 않음) */
  var TOPSEL = ['#tAtis span:nth-child(4)', '#tAtis span:nth-child(3)', '#tScore .k:nth-child(5)', '#tPos em', '#tScore .k:nth-child(4)', '#tScore .k:nth-child(3)', '#tScore .k:nth-child(2)', '#tAtis span:nth-child(2)'];
  function fitTop() {
    var top = $('top'), w = top.clientWidth, i, n = app.topLvl || 0;
    function set(k) { for (var j = 0; j < TOPSEL.length; j++) Array.prototype.forEach.call(top.querySelectorAll(TOPSEL[j]), function (e) { e.classList.toggle('fh', j < k); }); }
    if (app.topW !== w) { app.topW = w; n = 0; }
    set(n);
    while (n < TOPSEL.length && top.scrollWidth > top.clientWidth + 1) { n++; set(n); }
    app.topLvl = n;
  }
  var banT = 0;
  function banner(t, cls) { var b = $('banner'); b.textContent = '⚠ ' + t; b.className = 'show ' + cls; clearTimeout(banT); banT = setTimeout(function () { b.className = ''; }, 3200); beep(cls === 'bad' ? 520 : 760, 0.18); }

  /* ================= 스트립 ================= */
  function stripBays() {
    var sim = app.sim, a = sim.acs, m = sim.mode, f = function (fn) { return a.filter(fn); };
    if (m === 'APP') return [[ATC.T('핸드오프 대기'), f(function (x) { return x.owner === 'in'; })], [ATC.T('도착'), f(function (x) { return x.kind === 'arr' && x.owner !== 'in'; }).sort(function (x, y) { return distAp(x) - distAp(y); })], [ATC.T('출발'), f(function (x) { return x.kind === 'dep'; })]];
    if (m === 'ACC') return [[ATC.T('핸드오프 대기'), f(function (x) { return x.owner === 'in'; })], [ATC.T('관할 중'), f(function (x) { return x.owner === 'me'; })], [ATC.T('이양 완료'), f(function (x) { return x.owner === 'out'; })]];
    if (m === 'TWR') return [[ATC.T('착륙 접근'), f(function (x) { return x.st === 'final'; }).sort(function (x, y) { return x.d - y.d; })], [ATC.T('활주로 · 이륙'), f(function (x) { return x.st === 'lineup' || x.st === 'linedup' || x.st === 'roll' || x.st === 'land' || x.st === 'air' || x.st === 'vacate'; })], [ATC.T('대기 지점 · 횡단'), f(function (x) { return x.st === 'athold' || x.st === 'reqtaxi'; })], [ATC.T('지상 이동(지상관제)'), f(function (x) { return x.st === 'taxi' || x.st === 'gate'; })]];
    if (m === 'GND') return [[ATC.T('요청 대기'), f(function (x) { return x.owner === 'me' && (x.st === 'reqpush' || x.st === 'reqtaxi' || x.st === 'athold'); })], [ATC.T('이동 중'), f(function (x) { return x.owner === 'me' && (x.st === 'push' || x.st === 'start' || x.st === 'taxi'); })], [ATC.T('주기 중(출발 준비)'), f(function (x) { return x.st === 'gate' && !x.parked; })], [ATC.T('타워 관할'), f(function (x) { return x.owner === 'twr'; })]];
    return [[ATC.T('허가 요청'), f(function (x) { return x.st === 'req'; })], [ATC.T('복창 확인'), f(function (x) { return x.st === 'rb'; })], [ATC.T('허가 완료 · 출발 준비'), f(function (x) { return x.st === 'cleared' || x.st === 'ready'; })]];
  }
  function distAp(a) { return a.appr && a.appr.loc ? a.appr.d : 30 + U.dist(a, D.center); }
  function stripHtml(a) {
    var sim = app.sim, m = sim.mode, l2 = '', tag = '', cls = (a.kind || 'ovf') + (a.id === app.sel ? ' sel' : '') + (a.emg ? ' emg' : '') + (a.owner === 'in' ? ' inn' : '') + ((a.owner === 'out' || a.owner === 'twr' || a.owner === 'gnd') ? ' dim' : '') + (a.waiting && a.owner === 'me' ? ' wait' : '') + (sim.hasWrong(a.id) ? ' wrong' : '');
    if (m === 'APP' || m === 'ACC') {
      l2 = fmt.alt(a.alt) + (Math.abs(a.alt - a.tAlt) > 150 ? (a.tAlt > a.alt ? '↑' : '↓') + fmt.alt(a.tAlt) : '') + ' · ' + Math.round(a.ias) + 'kt · ' + (a.nav.mode === 'route' ? '→' + a.nav.route[a.nav.i] : a.nav.mode === 'hold' ? 'HOLD ' + a.nav.fix : a.nav.mode === 'loc' ? 'ILS' : 'H' + fmt.hdg(a.tHdg));
      tag = m === 'APP' ? (a.kind === 'arr' ? (a.appr ? (a.appr.loc ? 'ILS ' + a.appr.rwy + ' ' + a.appr.d.toFixed(0) + 'NM' : 'APP ' + a.appr.rwy) : a.gate + ' ' + a.rwy) : a.sid + ' → ' + a.dest) : (a.kind === 'arr' || a.divert ? ATC.T('도착 {0}', a.gate) : a.kind === 'dep' ? ATC.T('출발 → {0} RFL{1}', a.exitFix, fmt.fl(a.rfl)) : a.fpRoute[0] + '→' + a.exitFix);
    } else if (m === 'TWR' || m === 'GND') {
      var stt = { final: (a.d / NM).toFixed(1) + 'NM ' + (a.clr ? ATC.T('착륙 허가됨') : ATC.T('허가 전')), land: ATC.T('착륙 활주'), vacate: ATC.T('활주로 이탈 중'), reqtaxi: a.kind === 'arr' ? ATC.T('활주로 이탈 · {0}', (m === 'TWR' ? ATC.T('Ground 이양 필요') : ATC.T('경로 요청'))) : (a.tech ? ATC.T('기체 이상 · 복귀 요청') : ATC.T('지상 이동 요청')), taxi: (a.halt ? ATC.T('정지 지시 중') : a.spd < 0.3 && a.blk ? ATC.T('앞 막힘') : ATC.T('이동 중')) + (a.hp ? ' → ' + a.hp : a.kind === 'arr' ? ' → ' + a.stand : ''), athold: a.holdKind === 'cross' ? ATC.T('활주로 앞 정지 · 횡단 대기') : ATC.T('대기 지점 {0}{1}', a.hp, (m === 'GND' && a.owner === 'me' ? ATC.T(' · Tower 이양 필요') : ATC.T(' · 준비 완료'))), lineup: ATC.T('활주로 진입'), linedup: a.cto ? ATC.T('이륙 활주 시작') : ATC.T('활주로 정렬 · 이륙 허가 대기'), roll: ATC.T('이륙 활주'), air: a.goAround ? ATC.T('복행') : ATC.T('이륙 {0}ft', fmt.alt(a.alt)), gate: a.parked ? ATC.T('주기 완료') : ATC.T('주기장 {0}', a.stand), reqpush: ATC.T('푸시백 요청'), push: ATC.T('푸시백 중'), start: ATC.T('엔진 시동 중') }[a.st] || a.st;
      l2 = stt; tag = (a.kind === 'dep' ? 'DEP ' + (a.rwy || '') + ' · ' + (a.dest || '') : ATC.T('ARR {0} · 주기장 {1}', a.rwy, a.stand));
    } else {
      l2 = ATC.T('주기장 {0} · EOBT {1}{2}', a.stand, U.hhmm(a.eobt), (a.ctot ? ' · CTOT ' + U.hhmm(a.ctot) : '')); tag = (a.noFpl ? 'NO FPL' : a.dest + ' · ' + a.gate) + (a.reclear ? ATC.T(' · 재허가') : '');
    }
    return '<div class="strip ' + cls + '" data-id="' + a.id + '"><i style="background:' + a.al.col + '"></i><div class="s1"><b>' + a.cs + '</b><span>' + a.type + '/' + a.wake + '</span><span class="sq">' + a.squawk + '</span></div><div class="s2">' + esc(tag) + '</div><div class="s3">' + esc(l2) + (a.emg ? ' · <u>' + esc(a.emgName || 'EMG') + '</u>' : '') + '</div></div>';
  }
  function renderStrips() {
    var bays = stripBays(), h = '';
    bays.forEach(function (b) { h += '<div class="bay"><h5>' + b[0] + ' <small>' + b[1].length + '</small></h5>' + b[1].map(stripHtml).join('') + '</div>'; });
    if (h !== app.stripSig) { app.stripSig = h; $('strips').innerHTML = h; }
  }

  /* ================= 지시판 ================= */
  function addPend(c) { var i; for (i = 0; i < app.pend.length; i++) if (app.pend[i].k === c.k) { app.pend[i] = c; app.cmdSig = ''; renderCmd(); return; } app.pend.push(c); app.cmdSig = ''; renderCmd(); }
  function sendPend(extra) {
    var sim = app.sim, ac = sim.byId(app.sel), cmds = app.pend.concat(extra || []); if (!ac || !cmds.length) return;
    /* 문구 순서: 기수 → 고도 → 속도 → 그 밖 */
    var ord = { atis: 0, amendfl: 1, slot: 2, clr: 3, hdg: 1, dct: 1, alt: 2, xalt: 2, spd: 3, ils: 4, hold: 4, ho: 9 };
    cmds.sort(function (a, b) { return (ord[a.k] === undefined ? 5 : ord[a.k]) - (ord[b.k] === undefined ? 5 : ord[b.k]); });
    sim.command(ac, cmds); app.pend = []; app.gt = null; app.routePrev = null; app.cmdSig = ''; resumeInst();
  }
  function now1(c) { var sim = app.sim, ac = sim.byId(app.sel); if (ac) { sim.command(ac, [c]); app.pend = []; app.gt = null; app.routePrev = null; app.cmdSig = ''; resumeInst(); } }
  function B(label, fn, o) { o = o || {}; app.btns.push(fn); return '<button class="cb' + (o.cls ? ' ' + o.cls : '') + '" data-i="' + (app.btns.length - 1) + '"' + (o.dis ? ' disabled' : '') + (o.tip ? ' title="' + esc(o.tip) + '"' : '') + (o.prev !== undefined ? ' data-prev="' + o.prev + '"' : '') + '>' + label + '</button>'; }
  function Gp(title, body, w) { return '<div class="cg"><h6>' + title + '</h6><div class="cgb"' + (w ? ' style="width:' + w + 'px;max-width:' + w + 'px"' : '') + '>' + body + '</div></div>'; }
  function pendHas(k, v) { for (var i = 0; i < app.pend.length; i++) if (app.pend[i].k === k && (v === undefined || app.pend[i].v === v || app.pend[i].fix === v || app.pend[i].rwy === v)) return true; return false; }
  function chipText(c) { var sim = app.sim, ac = sim.byId(app.sel); return ATC.phrase(sim, ac, [c]).atc.split(', ').slice(1).join(', ').replace(/\.$/, ''); }

  function renderCmd() {
    var sim = app.sim, ac = sim.byId(app.sel), m = sim.mode, sig, h = '';
    sig = [app.sel, ac ? [ac.owner, ac.st, ac.waiting, ac.kind, ac.appr ? (ac.appr.loc ? 2 : 1) : 0, sim.hasWrong(ac.id), Math.round((ac.alt || 0) / 1000), ac.halt, ac.clr, ac.cto, ac.holdKind, ac.nav ? ac.nav.mode + (ac.nav.i || 0) : '', ac.tech, ac.noFpl, ac.reclear].join() : '', JSON.stringify(app.pend), JSON.stringify(app.gt), app.routes ? app.routes.length : 0, JSON.stringify(app.del), sim.atis, sim.flow.id, m === 'TWR' || m === 'GND' ? Math.floor(sim.t / 3) : 0].join('|');
    if (sig === app.cmdSig) return; app.cmdSig = sig; app.btns = [];
    if (!ac) { $('cmd').innerHTML = ATC.T('<div class="cnone">항공기를 선택하세요 — 화면의 표지나 오른쪽 스트립을 누릅니다.<br><small>노란 점·깜박임 = 조종사가 답을 기다리는 중</small></div>'); return; }
    var head = '<div class="chead"><b style="border-color:' + ac.al.col + '">' + ac.cs + '</b><span>' + ac.csWord + ' ' + ac.num + ' · ' + ac.perf.n + ' · ' + D.wakeName[ac.wake] + ' · ' + ac.al.name + '</span></div>';
    var body = '';
    if (sim.hasWrong(ac.id)) body += ATC.T('<div class="cwrong">복창이 지시와 다릅니다. {0}</div>', B(ATC.T('정정 (Negative)'), function () { sim.correct(ac.id); app.cmdSig = ''; }, { cls: 'red' }));
    if (m === 'APP' || m === 'ACC') body += cmdRadar(ac); else if (m === 'TWR') body += cmdTwr(ac); else if (m === 'GND') body += cmdGnd(ac); else body += cmdDel(ac);
    var chips = app.pend.map(function (c, i) { return '<span class="chip">' + esc(chipText(c)) + B('×', function () { app.pend.splice(i, 1); app.cmdSig = ''; if (c.k === 'taxi') { app.routePrev = null; } }, { cls: 'x' }) + '</span>'; }).join('');
    var foot = '<div class="cfoot"><div class="chips">' + (chips || ATC.T('<span class="hintt">지시를 고르면 여기에 쌓입니다</span>')) + '</div>' + B(ATC.T('지움'), function () { app.pend = []; app.gt = null; app.routePrev = null; app.cmdSig = ''; }, { cls: 'ghost', dis: !app.pend.length }) + B(ATC.T('송신 ⏎'), function () { sendPend(); }, { cls: 'send', dis: !app.pend.length }) + '</div>';
    $('cmd').innerHTML = head + '<div class="cbody">' + body + '</div>' + (m === 'DEL' || m === 'TWR' ? '' : foot);
    drawDial();
  }
  function cmdRadar(ac) {
    var sim = app.sim, m = sim.mode, h = '', i, lst, acc = m === 'ACC';
    if (ac.owner === 'in') return ATC.T('{0}<p class="cinfo">수락하면 조종사가 이 주파수로 호출해 옵니다.</p>', Gp(ATC.T('핸드오프'), B(ATC.T('핸드오프 수락 (A)'), function () { sim.accept(ac); app.cmdSig = ''; resumeInst(); }, { cls: 'pri' })));
    if (ac.owner === 'out') return ATC.T('<p class="cinfo">다음 관제석으로 이양한 항공기입니다.</p>');
    /* 기수 */
    h += Gp(ATC.T('기수 <small>눈금판을 누르거나 H + 화면</small>'), '<canvas id="dial" width="104" height="104"></canvas><div class="col">' + B(ATC.T('좌선회'), function () { setDir('L'); }, { cls: pendDir() === 'L' ? 'on' : '' }) + B(ATC.T('우선회'), function () { setDir('R'); }, { cls: pendDir() === 'R' ? 'on' : '' }) + B('−10°', function () { nudge(-10); }) + B('+10°', function () { nudge(10); }) + '</div>', 172);
    /* 고도 */
    var alts = [];
    if (!acc) { if (ac.kind === 'arr') for (i = 3; i <= 12; i++) alts.push(i * 1000); else alts = [5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000, 16000, 19000]; }
    else { if (ac.kind === 'arr' || ac.divert) alts = [13000, 15000, 17000, 19000, 21000, 23000, 25000, 27000, 29000]; else { var base = Math.round(ac.alt / 1000) * 1000; for (i = -5; i <= 5; i++) { var v = base + i * 1000; if (v >= 20000 && v <= Math.min(41000, ac.perf.ceil)) alts.push(v); } if (ac.rfl && alts.indexOf(ac.rfl) < 0) alts.push(ac.rfl); alts.sort(function (a, b) { return a - b; }); } }
    h += Gp(ATC.T('고도'), alts.map(function (v) { var par = acc && v >= 20000 && ac.east !== undefined ? ((Math.round(v / 1000) % 2 === 1) === ac.east ? ' par' : ' npar') : ''; return B(fmt.alt(v), function () { addPend({ k: 'alt', v: v }); }, { cls: (pendHas('alt', v) ? 'on' : '') + (Math.abs(ac.tAlt - v) < 50 ? ' cur' : '') + par + (v === ac.rfl ? ' rfl' : '') }); }).join('') + B(ATC.T('신속히'), function () { for (var j = 0; j < app.pend.length; j++) if (app.pend[j].k === 'alt') { app.pend[j].exp = !app.pend[j].exp; app.cmdSig = ''; } }, { cls: 'ghost', tip: ATC.T('고른 고도 변경을 신속히(expedite)') }), 252);
    /* 속도 */
    var sp = acc ? [250, 270, 290] : [160, 170, 180, 190, 200, 210, 220, 230, 250];
    h += Gp(ATC.T('속도'), sp.map(function (v) { return B(v, function () { addPend({ k: 'spd', v: v }); }, { cls: (pendHas('spd', v) ? 'on' : '') + (ac.spdAsg === v ? ' cur' : '') }); }).join('') + B(ATC.T('정상'), function () { addPend({ k: 'spd', v: 0 }); }, { cls: 'ghost' }), 132);
    /* 직행 */
    lst = (ac.nav.mode === 'route' ? ac.nav.route.slice(ac.nav.i) : (ac.fpRoute || []).slice(-2)).slice(0, 4);
    if (!acc && ac.kind === 'arr') sim.rwys.forEach(function (r) { var f = D.ends[r].IF; if (lst.indexOf(f) < 0) lst.push(f); });
    if (acc && (ac.kind === 'arr' || ac.divert) && lst.indexOf(ac.gate) < 0) lst.push(ac.gate);
    if (acc && ac.exitFix && lst.indexOf(ac.exitFix) < 0) lst.push(ac.exitFix);
    h += '<div class="cstack">' + Gp(ATC.T('직행 <small>지점 이름을 눌러도 됨</small>'), lst.map(function (f) { return B(f, function () { addPend({ k: 'dct', fix: f }); }, { cls: pendHas('dct', f) ? 'on' : '' }); }).join(''), 236);
    /* 접근 · 체공 · 이양 */
    var x = '';
    if (!acc && ac.kind === 'arr') { sim.rwys.forEach(function (r) { x += B(ATC.T('ILS {0} 접근 허가', r), function () { addPend({ k: 'ils', rwy: r }); }, { cls: 'wide' + (pendHas('ils', r) ? ' on' : '') }); }); var hf = (ac.fpRoute || [])[ac.fpRoute.length - 1]; if (hf && D.fix[hf].k !== 'if') x += B(ATC.T('체공 {0}', hf), function () { addPend({ k: 'hold', fix: hf }); }, { cls: 'ghost' }); }
    if (!acc) x += ac.kind === 'arr' ? B(ATC.T('Tower 이양'), function () { addPend({ k: 'ho', to: 'TWR' }); }, { cls: 'ho' + (pendHas('ho') ? ' on' : '') }) : B(ATC.T('Control 이양'), function () { addPend({ k: 'ho', to: 'ACC' }); }, { cls: 'ho' + (pendHas('ho') ? ' on' : '') });
    else { var ns = sim.nextSector(ac); if (ac.kind === 'arr' || ac.divert) x += B(ATC.T('{0} + {1} 직행', fmt.alt(D.accArrAlt), ac.gate), function () { addPend({ k: 'alt', v: D.accArrAlt }); addPend({ k: 'dct', fix: ac.gate }); }, { cls: 'wide' }); x += B(ATC.T('{0} 이양', ns.n.replace(D.airport.call + ' ', '')), function () { addPend({ k: 'ho', to: ns }); }, { cls: 'ho' + (pendHas('ho') ? ' on' : '') }); if (ac.waiting === 'lvl') x += B(ATC.T('요청 고도 {0} 승인', fmt.alt(ac.reqLvl)), function () { addPend({ k: 'alt', v: ac.reqLvl }); }, { cls: 'wide' }); if (ac.waiting === 'dev') x += B(ATC.T('회피 기수 승인({0} 25°)', (ac.devSide === 'L' ? ATC.T('좌') : ATC.T('우'))), function () { addPend({ k: 'hdg', v: U.r5(ac.hdg + (ac.devSide === 'L' ? -25 : 25)), dir: ac.devSide }); }, { cls: 'wide' }); }
    h += Gp(acc ? ATC.T('이양 · 요청 처리') : ATC.T('접근 · 이양'), x, 236) + '</div>';
    return h;
  }
  function pendDir() { for (var i = 0; i < app.pend.length; i++) if (app.pend[i].k === 'hdg') return app.pend[i].dir || ''; return ''; }
  function setDir(d) { var ac = app.sim.byId(app.sel), i; for (i = 0; i < app.pend.length; i++) if (app.pend[i].k === 'hdg') { app.pend[i].dir = app.pend[i].dir === d ? null : d; app.cmdSig = ''; return; } addPend({ k: 'hdg', v: U.r5(ac.hdg + (d === 'L' ? -30 : 30)), dir: d }); }
  function nudge(dv) { var ac = app.sim.byId(app.sel), i; for (i = 0; i < app.pend.length; i++) if (app.pend[i].k === 'hdg') { app.pend[i].v = U.r5(app.pend[i].v + dv); app.cmdSig = ''; return; } addPend({ k: 'hdg', v: U.r5((ac.nav.mode === 'hdg' ? ac.tHdg : ac.hdg) + dv) }); }
  function drawDial() {
    var c = $('dial'); if (!c) return; var ctx = c.getContext('2d'), ac = app.sim.byId(app.sel), r = 44, cx = 52, cy = 52, i, ph = null;
    for (i = 0; i < app.pend.length; i++) if (app.pend[i].k === 'hdg') ph = app.pend[i].v;
    ctx.clearRect(0, 0, 104, 104); ctx.fillStyle = '#0a1118'; ctx.beginPath(); ctx.arc(cx, cy, r + 6, 0, 7); ctx.fill(); ctx.strokeStyle = '#2b4a66'; ctx.stroke();
    ctx.font = '9px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (i = 0; i < 36; i++) { var a = i * 10 * Math.PI / 180, r1 = i % 3 === 0 ? r - 7 : r - 3; ctx.strokeStyle = '#47627a'; ctx.beginPath(); ctx.moveTo(cx + Math.sin(a) * r, cy - Math.cos(a) * r); ctx.lineTo(cx + Math.sin(a) * r1, cy - Math.cos(a) * r1); ctx.stroke(); if (i % 9 === 0) { ctx.fillStyle = '#8fa9c0'; ctx.fillText(['36', '09', '18', '27'][i / 9], cx + Math.sin(a) * (r - 15), cy - Math.cos(a) * (r - 15)); } }
    function hand(hd, col, w) { var a2 = hd * Math.PI / 180; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(a2) * (r - 4), cy - Math.cos(a2) * (r - 4)); ctx.stroke(); ctx.lineWidth = 1; }
    if (ac && ac.hdg !== undefined) hand(ac.hdg, '#7f93a5', 1.5);
    if (ph !== null) { hand(ph, '#4fd8ff', 2.5); ctx.fillStyle = '#4fd8ff'; ctx.font = 'bold 11px monospace'; ctx.fillText(fmt.hdg(ph), cx, cy + 16); }
  }
  function cmdTwr(ac) {
    var sim = app.sim, h = '', e = D.ends[ac.rwy], rw = e.rw, arr = sim.nextArr(rw), info = '';
    if (ac.owner !== 'me') return '<p class="cinfo">' + (ac.owner === 'gnd' ? ATC.T('지상관제(자동)가 이동시키는 중입니다.') : ATC.T('다른 관제석으로 이양했습니다.')) + '</p>';
    var busy = sim.rwyBusy(rw, ac), gap = sim.wakeGap(ac, rw);
    info = ATC.T('<p class="cinfo">활주로 {0}: {1}{2}{3}</p>', ac.rwy, (sim.rwClosed[rw] > sim.t ? ATC.T('<b class="r">폐쇄 중</b>') : busy ? ATC.T('<b class="r">{0} 사용 중</b>', busy.cs) : ATC.T('<b class="g">비어 있음</b>')), (arr && arr !== ac ? ATC.T(' · 다음 착륙기 {0} {1}NM', arr.cs, (arr.d / NM).toFixed(1)) : ''), (ac.kind === 'dep' && gap > 0 ? ATC.T(' · <b class="y">후방난기류 {0}초</b>', Math.ceil(gap)) : ''));
    if (ac.st === 'final') h += Gp(ATC.T('착륙기 {0}NM', (ac.d / NM).toFixed(1)), B(ATC.T('착륙 허가'), function () { now1({ k: 'ctl', rwy: ac.rwy }); }, { cls: 'pri wide', dis: ac.clr }) + B(ATC.T('접근 계속'), function () { now1({ k: 'cont' }); }) + B(ATC.T('최소 속도'), function () { now1({ k: 'minspd' }); }, { dis: ac.minSpd }) + B(ATC.T('복행'), function () { now1({ k: 'ga' }); }, { cls: 'red' }));
    else if (ac.st === 'athold' && ac.holdKind === 'dep') h += Gp(ATC.T('출발기 · 대기 지점 {0}', ac.hp), B(ATC.T('이륙 허가'), function () { now1({ k: 'cto', rwy: ac.rwy }); }, { cls: 'pri wide' }) + B(ATC.T('활주로 진입 후 대기'), function () { now1({ k: 'luaw', rwy: ac.rwy, at: ac.inter ? ac.hp : null }); }, { cls: 'wide' }) + B(ATC.T('활주로 앞 대기'), function () { now1({ k: 'hs', rwy: ac.rwy }); }, { cls: 'ghost' }));
    else if (ac.st === 'lineup' || ac.st === 'linedup') h += Gp(ATC.T('활주로 위'), B(ATC.T('이륙 허가'), function () { now1({ k: 'cto', rwy: ac.rwy }); }, { cls: 'pri wide', dis: ac.cto }) + B(ATC.T('이륙 허가 취소'), function () { now1({ k: 'cancelto' }); }, { cls: 'red', dis: !ac.cto || ac.st === 'roll' }));
    else if (ac.st === 'air') h += Gp(ATC.T('공중'), B(ac.goAround ? ATC.T('Approach 이양') : ATC.T('Departure 이양'), function () { now1({ k: 'ho', to: ac.goAround ? 'APP' : 'DEP' }); }, { cls: 'ho wide' }));
    else if (ac.st === 'reqtaxi') h += Gp(ATC.T('활주로 이탈'), B(ATC.T('Ground 이양'), function () { now1({ k: 'ho', to: 'GND' }); }, { cls: 'ho wide' }));
    else if (ac.st === 'athold' && ac.holdKind === 'cross') { var ar = sim.nextArr(ac.holdRw), bz = sim.rwyBusy(ac.holdRw, ac), er = sim.endOf(ac.holdRw); info = ATC.T('<p class="cinfo">횡단할 활주로 {0}: {1}{2}</p>', er, (bz ? ATC.T('<b class="r">{0} 사용 중</b>', bz.cs) : ATC.T('<b class="g">비어 있음</b>')), (ar ? ATC.T(' · 착륙기 {0} {1}NM', ar.cs, (ar.d / NM).toFixed(1)) : ATC.T(' · 착륙기 없음'))); h += Gp(ATC.T('활주로 횡단'), B(ATC.T('횡단 허가'), function () { now1({ k: 'cross', rwy: er }); }, { cls: 'pri wide' }) + B(ATC.T('계속 대기'), function () { now1({ k: 'hs', rwy: er }); }, { cls: 'ghost' })); }
    else h += ATC.T('<p class="cinfo">지금 줄 지시가 없습니다({0}).</p>', ({ roll: ATC.T('이륙 활주 중'), land: ATC.T('착륙 활주 중'), vacate: ATC.T('활주로 이탈 중'), taxi: ATC.T('지상 이동 중') }[ac.st] || ac.st));
    return info + h;
  }
  function cmdGnd(ac) {
    var sim = app.sim, h = '', i;
    if (ac.owner !== 'me') return ATC.T('<p class="cinfo">관제탑 관할입니다{0}.</p>', (ac.st === 'final' ? ATC.T(' — 착륙 접근 중 {0}NM, 주기장 {1}', (ac.d / NM).toFixed(1), ac.stand) : ''));
    if (ac.st === 'gate') return ATC.T('<p class="cinfo">주기장 {0} — 아직 호출 전입니다.</p>', ac.stand);
    if (ac.st === 'reqpush') { var sd = D.stands[ac.stand], FN = { north: ATC.T('북'), south: ATC.T('남'), west: ATC.T('서'), east: ATC.T('동') }, f1 = [sd.faces[0], sd.faces[1], FN[sd.faces[0]], FN[sd.faces[1]]], rec = sd.faceRec || sim.flow.push;
      return ATC.T('{0}<p class="cinfo">푸시백하면 주기장 뒤 유도로를 약 2분간 막습니다. 표준 흐름은 기수 {1}쪽.</p>', Gp(ATC.T('푸시백 · 주기장 {0}', ac.stand), B(ATC.T('허가 · 기수 {0}쪽', f1[2]), function () { now1({ k: 'push', face: f1[0] }); }, { cls: 'wide' + (rec === f1[0] ? ' pri' : '') }) + B(ATC.T('허가 · 기수 {0}쪽', f1[3]), function () { now1({ k: 'push', face: f1[1] }); }, { cls: 'wide' + (rec === f1[1] ? ' pri' : '') }) + B(ATC.T('대기 지시'), function () { now1({ k: 'pushhold' }); }, { cls: 'ghost' })), FN[sim.flow.push]); }
    if (ac.st === 'reqtaxi') {
      var dep = ac.kind === 'dep' && !ac.tech, tg = app.gt, holds;
      if (dep) { var drw = ac.rwy || sim.depRwy, orw = sim.multi ? (sim.flow.deps.filter(function (r) { return r !== drw; })[0] || sim.flow.arr) : sim.arrRwy; var hl0 = sim.holdsFor(ac, drw), ho0 = sim.holdsFor(ac, orw)[0]; holds = hl0.slice(); if (sim.level.id > 1) holds.push(ho0); h += Gp(ATC.T('목적지 — 대기 지점'), holds.map(function (hp) { var he = D.ends[drw], rem = he.len - D.rwAlong(he, D.gN[D.holds[hp].rnode]);      /* 그 지점에서 이륙할 때 남는 활주로 길이 */
        return B(hp + ' <small>' + (hp === ho0 ? orw : sim.multi && rem < he.len - 30 ? ATC.T('{0} · 남은 길이 {1}m', drw, (Math.floor(rem / 10) * 10).toLocaleString('en-US')) : hp === hl0[0] ? ATC.T('{0} 전체 길이', drw) : ATC.T('{0} 중간 진입', drw)) + '</small>', function () { app.gt = { hp: hp }; app.pend = []; app.routePrev = null; app.cmdSig = ''; }, { cls: tg && tg.hp === hp ? 'on' : '' }); }).join('')); }
      else if (!tg) { app.gt = tg = { stand: ac.stand }; }
      if (tg) {
        var rs = sim.routeOptions(ac, tg); app.routes = rs;
        h += Gp(ATC.T('{0} <small>올려 보면 화면에 표시</small>', (dep ? ATC.T('경로') : ATC.T('주기장 {0}까지 경로', ac.stand))), rs.map(function (r, ix) { return B(ATC.T('{0} <small>{1}m · 약 {2}분{3}</small>', ((ix === 0 ? ATC.T('표준 ') : '') + r.via.join(' → ')), Math.round(r.len / 10) * 10, Math.max(1, Math.round(r.time / 60)), (r.cross ? ATC.T(' · 활주로 횡단') : '')), function () { var e = D.ends[sim.depRwy]; app.routePrev = r; var c = { k: 'taxi', via: r.via, nodes: r.nodes, len: r.len }; if (tg.hp) { c.hp = tg.hp; c.rwy = D.gN[D.holds[tg.hp].node].rw === e.rw ? sim.depRwy : sim.arrRwy; } else c.stand = tg.stand; if (r.cross) c.hs = sim.arrRwy; app.pend = []; addPend(c); }, { cls: 'route' + (app.routePrev === r || pendRoute(r) ? ' on' : ''), prev: ix }); }).join('') || ATC.T('<span class="hintt">갈 수 있는 경로가 없습니다(폐쇄 구간 확인)</span>'));
      }
      return h;
    }
    if (ac.st === 'push' || ac.st === 'start') return '<p class="cinfo">' + (ac.st === 'push' ? ATC.T('푸시백 중') : ATC.T('엔진 시동 중 — 곧 지상 이동을 요청합니다')) + '.</p>';
    if (ac.st === 'taxi') { h += Gp(ATC.T('이동 중'), (ac.halt ? B(ATC.T('계속 이동'), function () { now1({ k: 'conttaxi' }); }, { cls: 'pri wide' }) : B(ATC.T('정지'), function () { now1({ k: 'holdpos' }); }, { cls: 'red wide' })) + (ac.kind === 'dep' && ac.hp ? B(ATC.T('Tower 이양'), function () { now1({ k: 'ho', to: 'TWR' }); }, { cls: 'ho' }) : '')); return h; }
    if (ac.st === 'athold' && ac.holdKind === 'dep') return Gp(ATC.T('대기 지점 {0}', ac.hp), B(ATC.T('Tower 이양'), function () { now1({ k: 'ho', to: 'TWR' }); }, { cls: 'ho pri wide' }));
    if (ac.st === 'athold' && ac.holdKind === 'cross') { var ar = sim.nextArr(ac.holdRw), bz = sim.rwyBusy(ac.holdRw, ac); return ATC.T('<p class="cinfo">활주로 {0}: {1}{2}</p>{3}', sim.flow.use[ac.holdRw] || sim.arrRwy, (bz ? ATC.T('<b class="r">{0} 사용 중</b>', bz.cs) : ATC.T('<b class="g">비어 있음</b>')), (ar ? ATC.T(' · 착륙기 {0} {1}NM (약 {2}초)', ar.cs, (ar.d / NM).toFixed(1), Math.round(sim.etaFinal(ar))) : ATC.T(' · 착륙기 없음')), Gp(ATC.T('활주로 횡단(타워와 조정)'), B(ATC.T('횡단 허가'), function () { now1({ k: 'cross', rwy: sim.arrRwy }); }, { cls: 'pri wide' }) + B(ATC.T('계속 대기'), function () { now1({ k: 'holdpos' }); }, { cls: 'ghost' }))); }
    return ATC.T('<p class="cinfo">지금 줄 지시가 없습니다.</p>');
  }
  function pendRoute(r) { for (var i = 0; i < app.pend.length; i++) if (app.pend[i].k === 'taxi' && app.pend[i].nodes === r.nodes) return true; return false; }
  function cmdDel(ac) {
    var sim = app.sim, d = app.del, h = '';
    if (d.id !== ac.id) { app.del = d = { id: ac.id, sid: null, alt: null, atis: false, fl: null, slot: false }; }
    if (ac.st === 'req') {
      if (ac.noFpl) return ATC.T('{0}<p class="cinfo">비행계획이 접수되기 전에는 허가를 낼 수 없습니다.</p>', Gp(ATC.T('비행계획 없음'), B(ATC.T('대기 · 운항관리 확인 요청'), function () { now1({ k: 'stby', text: 'stand by, flight plan not received, check with your dispatch' }); }, { cls: 'pri wide' })));
      h += Gp(ATC.T('① 사전 확인 <small>필요한 것만 켬</small>'), B(ATC.T('ATIS {0} 통보', sim.atis), function () { d.atis = !d.atis; app.cmdSig = ''; }, { cls: d.atis ? 'on' : '' }) + B(ATC.T('순항 고도 −1,000'), function () { d.fl = d.fl === -1000 ? null : -1000; app.cmdSig = ''; }, { cls: d.fl === -1000 ? 'on' : '' }) + B(ATC.T('순항 고도 +1,000'), function () { d.fl = d.fl === 1000 ? null : 1000; app.cmdSig = ''; }, { cls: d.fl === 1000 ? 'on' : '' }) + B(ATC.T('CTOT 통보'), function () { d.slot = !d.slot; app.cmdSig = ''; }, { cls: d.slot ? 'on' : '', dis: !ac.ctot }));
      h += Gp('② SID', sim.sidList().map(function (s) { return B(s, function () { d.sid = s; app.cmdSig = ''; }, { cls: d.sid === s ? 'on' : '' }); }).join(''));
      h += Gp(ATC.T('③ 초기 고도'), (D.sidInit === 6000 ? [5000, 6000, 7000] : [D.sidInit - 2000, D.sidInit, D.sidInit + 2000]).map(function (v) { return B(fmt.alt(v), function () { d.alt = v; app.cmdSig = ''; }, { cls: d.alt === v ? 'on' : '' }); }).join(''));
      h += Gp(ATC.T('④ 송신'), B(ATC.T('허가 송신'), function () { var c = []; if (d.atis) c.push({ k: 'atis', v: sim.atis }); if (d.fl) c.push({ k: 'amendfl', old: ac.rfl, v: ac.rfl + d.fl }); if (d.slot && ac.ctot) c.push({ k: 'slot', v: U.hhmm(ac.ctot), tsat: U.hhmm(ac.tsat) }); c.push({ k: 'clr', destName: ac.destName, sid: d.sid, alt: d.alt, sq: ac.squawk }); sim.command(ac, c); app.del = {}; app.cmdSig = ''; resumeInst(); }, { cls: 'send wide', dis: !d.sid || !d.alt }));
      return h;
    }
    if (ac.st === 'rb') return ATC.T('{0}<p class="cinfo">허가: {1} · {2} · 스쿼크 {3} — 교신 기록의 복창과 한 글자씩 대조하세요.</p>', Gp(ATC.T('복창 확인'), B('Readback correct', function () { now1({ k: 'rbok' }); }, { cls: 'pri wide' }) + B(ATC.T('정정 (Negative)'), function () { if (!sim.correct(ac.id)) sim.sys(ATC.T('복창은 허가 내용과 같습니다 — 정정할 것이 없습니다.'), 'warn'); app.cmdSig = ''; }, { cls: 'red' })), ac.clr.sid, fmt.alt(ac.clr.alt), ac.clr.sq);
    if (ac.st === 'cleared') return ATC.T('<p class="cinfo">허가 완료. 조종사의 준비 완료 보고를 기다립니다{0}.</p>', (ac.ctot ? ' · CTOT ' + U.hhmm(ac.ctot) + ' (TSAT ' + U.hhmm(ac.tsat) + ')' : ''));
    if (ac.st === 'ready') return (ac.ctot ? ATC.T('<p class="cinfo">CTOT {0} · TSAT {1} · 이양 가능 {2}부터 (지금 {3})</p>', U.hhmm(ac.ctot), U.hhmm(ac.tsat), U.hhmm(ac.tsat - 300), U.hhmm(sim.utc())) : '') + Gp(ATC.T('출발 준비 완료'), B(ATC.T('Ground 이양'), function () { now1({ k: 'ho', to: 'GND' }); }, { cls: 'ho pri wide' }) + (ac.ctot ? B(ATC.T('시동 시각 안내'), function () { now1({ k: 'slot', v: U.hhmm(ac.ctot), tsat: U.hhmm(ac.tsat) }); }, { cls: 'ghost' }) : ''));
    return '';
  }
  /* 허가중계 가운데 화면: 비행계획 + 참조표 */
  function renderDel() {
    var sim = app.sim, ac = sim.byId(app.sel), h = '<div class="dcol">';
    if (ac) {
      var par = sim.parityOk(ac, ac.rfl);
      h += ATC.T('<div class="fpl"><h4>FLIGHT PLAN <small>비행계획</small></h4>{0}</div>', (ac.noFpl ? ATC.T('<div class="nofpl">NO FLIGHT PLAN RECEIVED<br><small>비행계획 미접수</small></div>') :
        ATC.T('<table><tr><th>CALLSIGN</th><td><b>{0}</b> {1} {2}</td><th>TYPE / WAKE</th><td>{3} / {4}</td></tr><tr><th>DEP</th><td>{icao} · 주기장 {5}</td><th>EOBT</th><td>{6}</td></tr><tr><th>DEST</th><td><b>{7}</b> {8}</td><th>RFL</th><td>{9} <small>(신청 {10})</small></td></tr><tr><th>ROUTE</th><td colspan="3">{11}</td></tr><tr><th>SQUAWK</th><td><b>{12}</b></td><th>CTOT</th><td>{13}</td></tr><tr><th>보고 ATIS</th><td>{14}</td><th>상태</th><td>{15}</td></tr></table>', ac.cs, ac.csWord, ac.num, ac.type, ac.wake, ac.stand, U.hhmm(ac.eobt), ac.dest, ac.destName, fmt.alt(ac.rfl), fmt.alt(ac.rflFiled), ac.route, ac.squawk, (ac.ctot ? '<b class="y">' + U.hhmm(ac.ctot) + '</b> · TSAT ' + U.hhmm(ac.tsat) : '—'), ac.atisRep, ({ req: ac.reclear ? ATC.T('재허가 요청') : ATC.T('허가 요청'), rb: ATC.T('복창 확인 중'), cleared: ATC.T('허가 완료'), ready: ATC.T('출발 준비 완료') }[ac.st] || ''))));
      if (ac.st === 'req' && !ac.noFpl) {
        var d = app.del.id === ac.id ? app.del : {}, pc = [];
        if (d.atis) pc.push({ k: 'atis', v: sim.atis }); if (d.fl) pc.push({ k: 'amendfl', old: ac.rfl, v: ac.rfl + d.fl }); if (d.slot && ac.ctot) pc.push({ k: 'slot', v: U.hhmm(ac.ctot), tsat: U.hhmm(ac.tsat) });
        pc.push({ k: 'clr', destName: ac.destName, sid: d.sid || '＿＿＿', alt: d.alt || 0, sq: ac.squawk });
        h += ATC.T('<div class="dref"><h4>송신 문구 미리보기</h4><p class="prev">{0}</p></div>', esc(ATC.phrase(sim, ac, pc).atc).replace('maintain 0,', 'maintain ＿＿＿,'));
      } else if (ac.clr) h += ATC.T('<div class="dref"><h4>내준 허가</h4><p class="prev">{0} departure · maintain {1} · squawk {2}</p></div>', ac.clr.sid, fmt.alt(ac.clr.alt), ac.clr.sq);
    } else h += ATC.T('<div class="fpl empty">오른쪽 스트립에서 항공기를 선택하면 비행계획이 표시됩니다.</div>');
    h += ATC.T('<div class="dref"><h4>현재 조건</h4><p>ATIS <b>{0}</b> · 출발 활주로 <b>{1}</b> · 바람 {2} · QNH {3} · 지금 {4} UTC</p></div></div><div class="dcol">', sim.atis, sim.multi ? sim.flow.deps.join(' · ') : sim.depRwy, fmt.wind(sim.wind), sim.qnh, U.hhmm(sim.utc()));
    var fk = Object.keys(D.flows), gk = Object.keys(D.gateDest), CMP = [ATC.T('북'), ATC.T('북동'), ATC.T('동'), ATC.T('남동'), ATC.T('남'), ATC.T('남서'), ATC.T('서'), ATC.T('북서')];
    if (D.sidName) {      /* SID 이름이 활주로와 상관없는 공항: 출구 지점 → SID 하나, 활주로는 방면에 따라 배정 */
      h += ATC.T('<div class="dref"><h4>SID 참조표</h4><table><tr><th>출구 지점</th><th>방향 · 목적지</th><th>SID</th>{0}<th>순항 고도</th></tr>{1}</table><p>SID는 출구 지점마다 하나이고 활주로가 달라도 이름이 같습니다. 출발 활주로는 방면에 따라 배정합니다. {2}.</p><p>초기 허가 고도 <b>{3}ft</b>(이 게임에서 정한 값 — 실제로는 편마다 관제가 정합니다) · 출발 주파수 {4} · 지상관제 {5}</p><p>CTOT가 있으면 TSAT = CTOT − 15분, 그 5분 전부터 지상관제로 이양.</p></div></div>',
        fk.map(function (k) { return '<th>' + D.flows[k].label + '</th>'; }).join(''),
        gk.map(function (g) { return '<tr><td><b>' + g + '</b></td><td>' + CMP[Math.round(U.brg(D.center, D.fix[g]) / 45) % 8] + ' — ' + D.gateDest[g].map(function (d) { return d[0]; }).join(' ') + '</td><td>' + D.sidName(g) + '</td>' + fk.map(function (k) { return '<td>' + D.depRwyFor(D.flows[k], g) + '</td>'; }).join('') + '<td>' + (D.gateEast[g] ? ATC.T('홀수 FL') : ATC.T('짝수 FL')) + '</td></tr>'; }).join(''),
        ATC.T('동쪽행({0})은 홀수, 서쪽행({1})은 짝수 순항 고도', gk.filter(function (g) { return D.gateEast[g]; }).join('·'), gk.filter(function (g) { return !D.gateEast[g]; }).join('·')),
        fmt.alt(D.sidInit), D.freq.DEP.fq, D.freq.GND.fq);
      h += ATC.T('<div class="dref"><h4>확인 순서</h4><ol class="chk"><li>비행계획이 접수됐는가 (NO FPL이면 허가 금지)</li><li>조종사가 말한 ATIS 문자 = 현재 문자인가</li><li>순항 고도(RFL)가 방향에 맞는가</li><li>SID = 비행계획의 출구 지점에 맞는 것</li><li>CTOT가 있으면 통보, 이양 시각 확인</li><li>복창을 허가 내용과 대조</li></ol></div></div>');
    } else {
      h += ATC.T('<div class="dref"><h4>SID 참조표</h4><table><tr><th>출구 지점</th><th>방향 · 목적지</th>{0}<th>순항 고도</th></tr>{1}</table><p>{2}. {3}.</p><p>SID 초기 고도 <b>{4}ft</b> · 출발 주파수 {5} · 지상관제 {6}</p><p>CTOT가 있으면 TSAT = CTOT − 15분, 그 5분 전부터 지상관제로 이양.</p></div></div>',
        fk.map(function (k) { return '<th>' + D.flows[k].dep + '</th>'; }).join(''),
        gk.map(function (g) { return '<tr><td><b>' + g + '</b></td><td>' + CMP[Math.round(U.brg(D.center, D.fix[g]) / 45) % 8] + ' — ' + D.gateDest[g].map(function (d) { return d[0]; }).join(' ') + '</td>' + fk.map(function (k) { return '<td>' + g + ' 1' + D.flows[k].sfx + '</td>'; }).join('') + '<td>' + (D.gateEast[g] ? ATC.T('홀수 FL') : ATC.T('짝수 FL')) + '</td></tr>'; }).join(''),
        fk.map(function (k) { return ATC.T('활주로 {0}에서는 1{1}', D.flows[k].dep, D.flows[k].sfx); }).join(', '),
        ATC.T('동쪽행({0})은 홀수, 서쪽행({1})은 짝수 순항 고도', gk.filter(function (g) { return D.gateEast[g]; }).join('·'), gk.filter(function (g) { return !D.gateEast[g]; }).join('·')),
        fmt.alt(D.sidInit), D.freq.DEP.fq, D.freq.GND.fq);
      h += ATC.T('<div class="dref"><h4>확인 순서</h4><ol class="chk"><li>비행계획이 접수됐는가 (NO FPL이면 허가 금지)</li><li>조종사가 말한 ATIS 문자 = 현재 문자인가</li><li>순항 고도(RFL)가 방향에 맞는가</li><li>SID = 출구 지점 + 사용 활주로</li><li>CTOT가 있으면 통보, 이양 시각 확인</li><li>복창을 허가 내용과 대조</li></ol></div></div>');
    }
    h = h.replace(ATC.T('</div></div><div class="dref"><h4>확인 순서'), ATC.T('</div><div class="dref"><h4>확인 순서'));
    if (h !== app.delSig) { app.delSig = h; $('delview').innerHTML = h; }
  }

  /* ================= 교신 기록 · 코치 ================= */
  function addLog(e) {
    var el = document.createElement('div'), sim = app.sim; el.className = 'lg ' + e.who + (e.kind ? ' ' + e.kind : '') + (e.wrong ? ' rbw' : '');
    var who = e.who === 'atc' ? app.pos.id : e.who === 'pilot' ? e.cs : ATC.T('알림');
    var ko = e.who !== 'sys' && ATC.gloss ? ATC.gloss(e.text) : '';
    el.innerHTML = '<time>' + U.hhmm(e.utc) + '</time><b>' + who + '</b><span>' + esc(e.text) + (ko && ko !== e.text ? '<em class="ko">' + esc(ko) + '</em>' : '') + '</span>' + (e.wrong ? ATC.T('<button class="fixb" data-fix="{0}">정정</button>', e.ac) : '');
    if (e.ac) el.dataset.ac = e.ac;
    var box = $('logList'); box.appendChild(el); while (box.children.length > 160) box.removeChild(box.firstChild); box.scrollTop = box.scrollHeight;
  }
  function renderCoach() {
    var sim = app.sim, h = '', list = [];
    sim.acs.forEach(function (a) { if (a.waiting && (a.owner === 'me' || a.owner === 'in' || sim.mode === 'DEL')) list.push(a); });
    var al = sim.alerts || { ca: [], stca: [], msaw: [] };
    al.ca.forEach(function (p) { h += ATC.T('<div class="al bad" data-id="{0}">분리 상실 {1} · {2}</div>', p[0].id, p[0].cs, p[1].cs); });
    al.stca.forEach(function (p) { h += ATC.T('<div class="al warn" data-id="{0}">접근 예고 {1} · {2}</div>', p[0].id, p[0].cs, p[1].cs); });
    al.msaw.forEach(function (a) { h += ATC.T('<div class="al bad" data-id="{0}">저고도 {1}</div>', a.id, a.cs); });
    if (app.coach && sim.coach) { var c = sim.coach(); h += ATC.T('<h5>코치</h5>{0}', (c.length ? c.map(function (x) { return '<div class="co" data-id="' + x.ac + '">' + esc(x.t) + '</div>'; }).join('') : ATC.T('<div class="co none">지금은 지켜보면 됩니다.</div>'))); }
    else { h += ATC.T('<h5>응답 대기 <small>{0}</small></h5>{1}', list.length, (list.length ? list.slice(0, 7).map(function (a) { return '<div class="co" data-id="' + a.id + '">' + a.cs + ' — ' + ({ checkin: ATC.T('호출(응답 필요 없음, 지시 가능)'), tower: ATC.T('Tower 이양 대기'), ho: ATC.T('이양 요청'), climb: ATC.T('상승 요청'), desc: ATC.T('강하 요청'), lvl: ATC.T('고도 변경 요청'), dev: ATC.T('기상 회피 요청'), dct: ATC.T('직행 요청'), emg: ATC.T('비상'), missed: ATC.T('복행 — 재유도'), vector: ATC.T('유도 요청'), hold: ATC.T('체공 중'), appr: ATC.T('접근 허가 요청'), land: ATC.T('착륙 허가 대기'), dep: ATC.T('이륙 준비 완료'), cto: ATC.T('이륙 허가 대기'), gnd: ATC.T('Ground 이양 대기'), cross: ATC.T('횡단 대기'), gaho: ATC.T('복행 — 이양 대기'), dep2: ATC.T('Departure 이양 대기'), push: ATC.T('푸시백 요청'), taxi: ATC.T('지상 이동 요청'), twr: ATC.T('Tower 이양 대기'), clr: ATC.T('허가 요청'), rb: ATC.T('복창 확인') }[a.waiting] || a.waiting) + '</div>'; }).join('') : ATC.T('<div class="co none">없음</div>'))); }
    if (h !== app.coachSig) { app.coachSig = h; $('coach').innerHTML = h; }
  }

  /* ================= 입력 ================= */
  function select(id) { if (app.sel !== id) { app.sel = id; app.pend = []; app.gt = null; app.routePrev = null; app.del = {}; } app.cmdSig = ''; app.stripSig = ''; renderCmd(); renderStrips(); if (app.pos.view === 'del') renderDel(); }
  function hitTest(x, y) { var i, hbest = 0, bd = 1e9; for (i = app.hit.length - 1; i >= 0; i--) { var h = app.hit[i]; if (x >= h.x0 && x <= h.x1 && y >= h.y0 && y <= h.y1) return h.id; var d = Math.hypot(x - h.px, y - h.py); if (d < (h.r || 11) && d < bd) { bd = d; hbest = h.id; } } return hbest; }
  function fixAt(x, y) { var best = null, bd = 16; Object.keys(D.fix).forEach(function (n) { var f = D.fix[n]; if (f._sx === undefined) return; var d = Math.hypot(x - (f._sx + 20), y - (f._sy - 4)); if (Math.hypot(x - f._sx, y - f._sy) < 9) d = 0; if (d < bd) { bd = d; best = n; } }); return best; }
  function bindCanvas() {
    var cv = $('cv'), down = null, moved = false;
    cv.addEventListener('pointerdown', function (e) { down = { x: e.offsetX, y: e.offsetY, cx: app.view.cx, cy: app.view.cy, cu: app.view.cu, cv: app.view.cv }; moved = false; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', function (e) {
      app.mx = e.offsetX; app.my = e.offsetY; if (!app.sim) return;
      if (down) { var dx = e.offsetX - down.x, dy = e.offsetY - down.y; if (Math.abs(dx) + Math.abs(dy) > 5) moved = true; if (moved) { if (app.pos.view === 'radar') { app.view.cx = down.cx - dx / app.view.scale; app.view.cy = down.cy + dy / app.view.scale; } else { app.view.cu = down.cu - dx / app.view.scale; app.view.cv = down.cv + dy / app.view.scale; } } }
      else if (app.pos.view === 'radar') app.hoverFix = fixAt(e.offsetX, e.offsetY);
    });
    cv.addEventListener('pointerup', function (e) {
      if (!down) return; var wasMoved = moved; down = null; if (wasMoved || !app.sim) return;
      var x = e.offsetX, y = e.offsetY, sim = app.sim, id = hitTest(x, y), ac = sim.byId(app.sel);
      if (app.pos.view === 'radar' && ac && ac.owner === 'me' && (app.hdgAim || e.shiftKey) && !id) { var w = R.radarToWorld(app.view, cv.clientWidth, cv.clientHeight, x, y); addPend({ k: 'hdg', v: U.r5(U.brg({ x: ac.rx, y: ac.ry }, w)) }); app.hdgAim = false; $('bAim') && $('bAim').classList.remove('on'); return; }
      if (id) { select(id); return; }
      if (app.pos.view === 'radar' && ac && ac.owner === 'me') { var f = fixAt(x, y); if (f) { addPend({ k: 'dct', fix: f }); return; } }
    });
    cv.addEventListener('wheel', function (e) {
      e.preventDefault(); if (!app.sim) return; var v = app.view, k = e.deltaY < 0 ? 1.15 : 1 / 1.15, W = cv.clientWidth, H = cv.clientHeight, ns = U.clamp(v.scale * k, v.min, v.max);
      if (app.pos.view === 'radar') { var w0 = R.radarToWorld(v, W, H, e.offsetX, e.offsetY); v.scale = ns; var w1 = R.radarToWorld(v, W, H, e.offsetX, e.offsetY); v.cx += w0.x - w1.x; v.cy += w0.y - w1.y; }
      else { var g0 = R.groundToUV(v, W, H, e.offsetX, e.offsetY); v.scale = ns; var g1 = R.groundToUV(v, W, H, e.offsetX, e.offsetY); v.cu += g0.u - g1.u; v.cv += g0.v - g1.v; }
    }, { passive: false });
  }
  function fit() { var cv = $('cv'); if (app.pos.view === 'radar') R.fitRadar(app.view, cv.clientWidth, cv.clientHeight, app.sim.mode); else if (app.pos.view === 'ground') R.fitGround(app.view, cv.clientWidth, cv.clientHeight); }
  /* 명령 줄: VLA301 H100 A30 S180 ILS */
  function cli(text) {
    var sim = app.sim, tk = text.trim().toUpperCase().split(/\s+/), ac = sim.byId(app.sel), i, m, cmds = [];
    if (tk.length && sim.byCs(tk[0]) && !/^[HLRASD]\d+$/.test(tk[0])) { ac = sim.byCs(tk.shift()); select(ac.id); }
    if (!ac) { sim.sys(ATC.T('항공기를 먼저 고르거나 호출부호를 앞에 쓰세요.'), 'warn'); return; }
    for (i = 0; i < tk.length; i++) {
      var t = tk[i];
      if ((m = /^([HLR])(\d{1,3})$/.exec(t))) cmds.push({ k: 'hdg', v: U.r5(+m[2]), dir: m[1] === 'H' ? null : m[1] });
      else if ((m = /^(?:A|C|FL)(\d{2,3})$/.exec(t))) cmds.push({ k: 'alt', v: +m[1] * 100 });
      else if ((m = /^S(\d{1,3})$/.exec(t))) cmds.push({ k: 'spd', v: +m[1] });
      else if (t === 'D' && tk[i + 1] && D.fix[tk[i + 1]]) cmds.push({ k: 'dct', fix: tk[++i] });
      else if (D.fix[t]) cmds.push({ k: 'dct', fix: t });
      else if ((m = /^D([A-Z]{3,5})$/.exec(t)) && D.fix[m[1]]) cmds.push({ k: 'dct', fix: m[1] });
      else if (t === 'ILS' || t === 'I') { var r = tk[i + 1] && D.ends[tk[i + 1]] ? tk[++i] : ac.rwy; cmds.push({ k: 'ils', rwy: r }); }
      else if (t === 'HO') cmds.push({ k: 'ho', to: sim.mode === 'ACC' ? sim.nextSector(ac) : ac.kind === 'arr' ? 'TWR' : 'ACC' });
      else if (t === 'HOLD') cmds.push({ k: 'hold', fix: ac.fpRoute[ac.fpRoute.length - 1] });
      else if (t === 'ACC' || t === 'ACP') { sim.accept(ac); app.cmdSig = ''; }
      else if (t === 'X') { cmds.forEach(function (c) { if (c.k === 'alt') c.exp = true; }); }
      else { sim.sys(ATC.T('알 수 없는 입력: {0}', t), 'warn'); return; }
    }
    if (cmds.length) { app.pend = []; sendPend(cmds); }
  }
  function bind() {
    /* 운용 방향 단추와 공항 단추는 공항 묶음에서 만듦 */
    Object.keys(D.flows).forEach(function (k) { var b = document.createElement('button'); b.dataset.fl = k; b.textContent = D.flows[k].label || k; $('flows').appendChild(b); });
    /* 사이트판(window.ATC_SITE = { back: '게임 고르기 페이지 주소' }): 시험판 공항은 목록에 내놓지 않고, 로비에 「게임 고르기」로 돌아가는 단추를 둠 */
    var SITE = window.ATC_SITE;
    if (SITE && SITE.back) { var bk = document.createElement('a'); bk.className = 'tog'; bk.id = 'optBack'; try { bk.href = new URL(SITE.back, location.href).href; } catch (e) { bk.href = SITE.back; }      /* 문서 주소 기준(<base>가 있어도 같음) */ bk.textContent = ATC.T('← 게임 고르기'); var op = document.querySelector('.opts'); if (op) op.appendChild(bk); }
    var aps = ATC.airports().filter(function (a) { return !(a.hidden || SITE && a.preview) || a.id === ATC.aptId; });
    if (aps.length > 1) { $('apts').hidden = false; aps.forEach(function (a) { var b = document.createElement('button'); b.dataset.ap = a.id; b.textContent = a.name; if (a.id === ATC.aptId) b.className = 'on'; $('apts').appendChild(b); }); $('apts').addEventListener('click', function (e) { var b = e.target.closest('[data-ap]'); if (b) ATC.setAirport(b.dataset.ap); }); }
    bindCanvas();
    $('pcards').addEventListener('click', function (e) { var b = e.target.closest('.pcard'); if (b) briefing(b.dataset.pos); });
    $('lvls').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { app.level = +b.dataset.lv; saveOpt(); showLobby(); } });
    $('flows').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { app.flow = b.dataset.fl; saveOpt(); showLobby(); } });
    $('optVoice').addEventListener('click', function () { app.voice = !app.voice; saveOpt(); showLobby(); });
    $('optLearn').addEventListener('click', function () { openLearn('flow'); });
    /* 로비에서 처음 누르는 순간 음성을 미리 읽어 둠 → 근무 첫 교신부터 무선 음성 */
    ['mousedown', 'keydown', 'touchend'].forEach(function (ev) { document.addEventListener(ev, function pre() { document.removeEventListener(ev, pre); if (app.voice) { ATC.Radio.init(); if (packOn()) ATC.Radio.loadAll(); } }); });
    $('optSound').addEventListener('click', soundTest);
    $('vmodes').addEventListener('click', function (e) { var b = e.target.closest('[data-vm]'); if (!b) return; app.vmode = b.dataset.vm; saveOpt(); showLobby(); if (packOn()) ATC.Radio.loadAll(); });
    $('vfxs').addEventListener('click', function (e) { var b = e.target.closest('[data-fx]'); if (!b) return; app.vfx = b.dataset.fx; voiceSet(); saveOpt(); showLobby(); });
    $('vatcs').addEventListener('click', function (e) { var b = e.target.closest('[data-va]'); if (!b) return; app.vatc = b.dataset.va; voiceSet(); saveOpt(); showLobby(); });
    $('vrates').addEventListener('click', function (e) { var b = e.target.closest('[data-vr]'); if (!b) return; app.vrate = b.dataset.vr; voiceSet(); saveOpt(); showLobby(); });
    $('optDrill').addEventListener('click', function () { ATC.Radio.init(); ATC.drill.open(); });
    $('optInst').addEventListener('click', function () { app.inst = !app.inst; saveOpt(); showLobby(); });
    $('bGloss').addEventListener('click', function () { app.gloss = !app.gloss; $('game').classList.toggle('nogloss', !app.gloss); saveOpt(); });
    $('instOk').addEventListener('click', function () { resumeInst(); });
    $('instLearn').addEventListener('click', function () { openLearn(app.pos.les); });
    $('modal').addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]'); if (!b) { if (e.target === $('modal') && !app.over) closeModal(); return; }
      var m = b.dataset.m;
      if (m === 'close') { closeModal(); if (app.sim && !app.over && $('lobby').hidden) app.paused = app.wasPaused || false; }
      else if (m === 'start') start(b.dataset.pos);
      else if (m === 'startinst') { app.inst = true; saveOpt(); start(b.dataset.pos); }
      else if (m === 'learn') openLearn(b.dataset.les || 'flow');
      else if (m === 'tab') openLearn(b.dataset.les);
      else if (m === 'lobby') showLobby();
      else if (m === 'result') showResult();
      else if (m === 'again') start(app.pos.id);
      else if (m === 'same') start(app.pos.id, app.seed);
      else if (m === 'quit') { app.sim.over = true; app.over = true; showResult(); }
    });
    $('strips').addEventListener('click', function (e) { var s = e.target.closest('.strip'); if (s) select(+s.dataset.id); });
    $('coach').addEventListener('click', function (e) { var s = e.target.closest('[data-id]'); if (s) select(+s.dataset.id); });
    $('logList').addEventListener('click', function (e) { var f = e.target.closest('.fixb'); if (f) { app.sim.correct(+f.dataset.fix); f.remove(); app.cmdSig = ''; return; } var l = e.target.closest('.lg'); if (l && l.dataset.ac && app.sim.byId(+l.dataset.ac)) select(+l.dataset.ac); });
    $('cmd').addEventListener('click', function (e) {
      var d = e.target.closest('#dial'); if (d) { var r = d.getBoundingClientRect(), x = e.clientX - r.left - 52, y = e.clientY - r.top - 52, hd = U.n360(Math.atan2(x, -y) * 180 / Math.PI), sn = e.shiftKey ? 5 : 10; hd = Math.round(hd / sn) * sn || 360; var dir = pendDir(); addPend({ k: 'hdg', v: hd, dir: dir || null }); return; }
      var b = e.target.closest('button[data-i]'); if (b && !b.disabled) { var fn = app.btns[+b.dataset.i]; if (fn) fn(); app.cmdSig = ''; renderCmd(); renderStrips(); }
    });
    $('cmd').addEventListener('mouseover', function (e) { var b = e.target.closest('button[data-prev]'); if (b && app.routes) app.routePrev = app.routes[+b.dataset.prev]; });
    $('cmd').addEventListener('mouseout', function (e) { var b = e.target.closest('button[data-prev]'); if (b) { var keep = null; app.pend.forEach(function (c) { if (c.k === 'taxi') (app.routes || []).forEach(function (r) { if (r.nodes === c.nodes) keep = r; }); }); app.routePrev = keep; } });
    $('tSpeed').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; if (b.dataset.s === 'p') app.paused = !app.paused; else { app.speed = +b.dataset.s; app.paused = false; } renderTop(); });
    $('bCoach').addEventListener('click', function () { app.coach = !app.coach; app.coachSig = ''; });
    $('bVoice').addEventListener('click', function () { app.voice = !app.voice; if (!app.voice) { if (window.speechSynthesis) speechSynthesis.cancel(); ATC.Radio.stop(); } else if (packOn()) ATC.Radio.loadAll(); saveOpt(); });
    $('bLearn').addEventListener('click', function () { app.wasPaused = app.paused; app.paused = true; openLearn(app.pos.les); });
    $('bFit').addEventListener('click', fit);
    $('bQuit').addEventListener('click', function () { app.wasPaused = app.paused; app.paused = true; openModal(ATC.T('<div class="mhead"><h2>근무를 마칠까요?</h2></div><div class="mbody"><p>지금까지의 결과로 평가를 봅니다.</p></div><div class="mfoot"><span class="sp"></span><button class="btn" data-m="close">계속 근무</button><button class="btn" data-m="lobby">평가 없이 나가기</button><button class="btn pri" data-m="quit">마치고 평가 보기</button></div>')); });
    $('cli').addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Enter') { cli(this.value); this.value = ''; } if (e.key === 'Escape') this.blur(); });
    window.addEventListener('resize', function () { resize(); });
    window.addEventListener('keydown', function (e) {
      if (!app.sim || $('game').hidden || !$('modal').hidden) { if (e.key === 'Escape' && !$('modal').hidden && !app.over) { closeModal(); if (app.sim) app.paused = app.wasPaused || false; } return; }
      var k = e.key.toLowerCase();
      if (k === 'enter') { sendPend(); e.preventDefault(); }
      else if (k === 'escape') { if (app.pend.length) { app.pend = []; app.gt = null; app.routePrev = null; } else app.sel = 0; app.cmdSig = ''; }
      else if (k === ' ') { if (app.instOn) resumeInst(); else app.paused = !app.paused; e.preventDefault(); }
      else if (k === 'a') { var ac = app.sim.byId(app.sel); if (ac && app.sim.accept) { if (!app.sim.accept(ac)) { var w = app.sim.acs.filter(function (x) { return x.owner === 'in'; })[0]; if (w) { app.sim.accept(w); select(w.id); } } app.cmdSig = ''; } else if (app.sim.accept) { var w2 = app.sim.acs.filter(function (x) { return x.owner === 'in'; })[0]; if (w2) { app.sim.accept(w2); select(w2.id); } } if (app.instOn) resumeInst(); }
      else if (k === 'h') app.hdgAim = true;
      else if (k === 'f') fit();
      else if (k === '1' || k === '2' || k === '3' || k === '4') { app.speed = [1, 2, 4, 8][+k - 1]; app.paused = false; }
      else if (k === 'tab') { e.preventDefault(); var ws = app.sim.acs.filter(function (x) { return x.waiting && x.owner !== 'out'; }); if (ws.length) { var ix = ws.map(function (x) { return x.id; }).indexOf(app.sel); select(ws[(ix + 1) % ws.length].id); } }
      else if (k === '/') { $('cli').focus(); e.preventDefault(); }
    });
    window.addEventListener('keyup', function (e) { if (e.key.toLowerCase() === 'h') app.hdgAim = false; });
  }

  /* ================= 모달 · 학습 · 결과 ================= */
  function openModal(html) { $('modalBox').innerHTML = html; $('modal').hidden = false; }
  function closeModal() { $('modal').hidden = true; }
  function openLearn(id) {
    var s = ATC.LEARN_BY[id] || ATC.LEARN[0];
    openModal(ATC.T('<div class="mhead"><h2>학습 노트</h2></div><div class="mbody learn"><nav>{0}</nav><article><h3>{1}</h3>{2}</article></div><div class="mfoot"><span class="sp"></span>{3}</div>', ATC.LEARN.map(function (x) { return '<button data-m="tab" data-les="' + x.id + '" class="' + (x.id === s.id ? 'on' : '') + '">' + x.t + '</button>'; }).join(''), s.t, s.h, (app.over ? ATC.T('<button class="btn" data-m="lobby">로비로</button><button class="btn pri" data-m="result">평가로 돌아가기</button>') : ATC.T('<button class="btn pri" data-m="close">닫기</button>'))));
  }
  function showResult() {
    var sim = app.sim, sc = sim.score(), rec = load(REC_KEY, {}), key = app.pos.id + app.level, r = rec[key] || { best: 0, grade: '-', n: 0 };
    var early = !sim.fatal && !(sim.isFinished && sim.isFinished());
    if (early) { sc.grade = '–'; } else if (!app.recSaved) { app.recSaved = true; r.n++; if (sc.total >= r.best) { r.best = sc.total; r.grade = sc.grade; } rec[key] = r; save(REC_KEY, rec); }
    if (window.speechSynthesis) speechSynthesis.cancel(); ATC.Radio.stop(); hideInst();
    var neg = sim.incs.filter(function (i) { return i.pts < 0; }), pos = sim.incs.filter(function (i) { return i.pts > 0; }), by = {};
    neg.forEach(function (i) { (by[i.code] = by[i.code] || { def: i, list: [] }).list.push(i); });
    var rows = Object.keys(by).sort(function (a, b) { return by[a].def.pts - by[b].def.pts; }).map(function (k) { var g = by[k], sum = g.list.reduce(function (s, x) { return s + x.pts; }, 0); return ATC.T('<div class="ri {0}"><div class="rh"><b>{1}</b><span>{2}건 · {3}점</span>{4}</div><ul>{5}{6}</ul></div>', g.def.cat, g.def.title, g.list.length, sum, (g.def.les ? ATC.T('<button class="lk" data-m="learn" data-les="{0}">학습 노트 보기</button>', g.def.les) : ''), g.list.slice(0, 6).map(function (x) { return '<li><time>' + U.hhmm(x.utc) + '</time> ' + esc(x.text) + '</li>'; }).join(''), (g.list.length > 6 ? ATC.T('<li>… 외 {0}건</li>', (g.list.length - 6)) : '')); }).join('');
    var msg = early ? ATC.T('근무를 도중에 마쳤습니다(남은 항공기 {0}대). 기록에는 남기지 않습니다.', (sim.acs.length + sim.sched.length)) : sc.fatal ? ATC.T('중대 사고로 근무가 중단됐습니다.') : sc.grade === 'S' ? ATC.T('완벽에 가까운 근무였습니다.') : sc.grade === 'A' ? ATC.T('안정적인 근무였습니다.') : sc.grade === 'B' ? ATC.T('큰 문제 없이 마쳤습니다. 아래 항목을 다듬어 보세요.') : ATC.T('기준에 못 미쳤습니다. 감점 항목의 학습 노트를 확인하세요.');
    openModal(ATC.T('<div class="mhead"><span class="pen">{0} · {1}</span><h2>근무 평가</h2></div><div class="mbody result"><div class="rtop"><div class="grade g{2}">{3}</div><div class="rsum"><div class="rscore">{4}<small> / 100</small></div><p>{5}</p><div class="rk"><span class="k s">안전 {6}</span><span class="k e">효율 {7}</span><span class="k p">절차·교신 {8}</span><span class="k b">가점 +{9}</span></div><p class="rmeta">처리 {10}대 · 근무 시간 {11}분 · 최고 기록 {12}점{13}</p></div></div>{14}{15}</div><div class="mfoot"><button class="btn" data-m="learn" data-les="{16}">학습 노트</button><span class="sp"></span><button class="btn" data-m="lobby">로비로</button><button class="btn" data-m="same">같은 상황 다시</button><button class="btn pri" data-m="again">새 근무</button></div>', app.pos.en, sim.level.ko, sc.grade, sc.grade, sc.total, msg, sc.S, sc.E, sc.P, sc.bonus, sc.handled, Math.round(sim.t / 60), r.best, (app.coach ? ATC.T(' · 코치 사용') : ''), (rows ? ATC.T('<h4>감점 항목</h4>{0}', rows) : ATC.T('<p class="clean">감점 없이 마쳤습니다.</p>')), (pos.length ? ATC.T('<h4>잘한 점</h4><ul class="good">{0}</ul>', pos.map(function (x) { return '<li>' + esc(x.text) + ' (+' + x.pts + ')</li>'; }).join('')) : ''), app.pos.les));
  }

  /* ================= 소리 ================= */
  var actx = null, voices = [];
  function beep(f, d) { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); var o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = f; o.type = 'square'; g.gain.value = 0.025; o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + d); } catch (e) { } }
  /* 음성 묶음이 없을 때의 대체: 브라우저 음성 합성. 돌려주는 값 = 예상 길이(초) */
  /* 표준 음성: 브라우저의 영어 음성 + 무선 분위기(딸깍 · 바탕 잡음 · 잡음 꼬리). onEnd는 말이 실제로 끝났을 때 불림. 돌려주는 값 = 어림 길이(초) */
  function tts(e, onEnd) {
    if (!window.speechSynthesis) return 0;
    try {
      if (!voices.length) { var all = speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); }), loc = all.filter(function (v) { return v.localService; }); voices = loc.length >= 2 ? loc : all; }   /* PC에 깔린 음성을 먼저(인터넷 음성은 시작이 늦음) */
      var txt = ATC.tts(e.text), rate = (e.who === 'atc' ? 1.25 : 1.18) * (app.speed > 1 ? 1.2 : 1), u = new SpeechSynthesisUtterance(txt); u.lang = 'en-US'; u.rate = rate; u.volume = 0.85;
      if (voices.length) { var hsh = 0, i; for (i = 0; i < e.cs.length; i++) hsh = (hsh * 31 + e.cs.charCodeAt(i)) % 997; u.voice = e.who === 'atc' ? voices[0] : voices[1 + hsh % Math.max(1, voices.length - 1)] || voices[0]; u.pitch = e.who === 'atc' ? 1 : 0.8 + (hsh % 5) * 0.1; }
      var est = (txt.split(/\s+/).length * 0.37 + 0.5) / rate, amb = null, fin = false, dead = false;
      /* 브라우저가 앞 문장을 아직 읽지 못하고 쌓아 두었으면 이번 문장은 소리 없이 넘김 — 소리가 화면보다 뒤처지거나 한꺼번에 밀려 나오지 않게 */
      if (speechSynthesis.pending) return -est;
      var end = function () { if (fin) return; fin = true; app.ttsEnds = true; if (amb) amb.stop(); if (onEnd) onEnd(); };
      u.onstart = function () { if (!fin && !dead) amb = ATC.Radio.amb(e.who, e.cs, est * 1.6 + 1.5); }; u.onend = end; u.onerror = end;
      ttsKeep.push(u); if (ttsKeep.length > 12) ttsKeep.shift();      /* 말하는 도중에 객체가 치워져 끝남 알림이 사라지는 것을 막음 */
      setTimeout(function () { if (!fin) { dead = true; if (amb) amb.stop(); } }, est * 2600 + 1500);      /* 끝남 알림이 끝내 오지 않을 때: 잡음을 끄고, 뒤늦게 시작돼도 다시 켜지 않음 */
      speechSynthesis.speak(u);
      return est;
    } catch (err) { return 0; }
  }
  var ttsKeep = [];
  /* 교관 동행: 꼭 해야 할 일이 생기면 멈추고 알려 줌 */
  function instCheck(ts) {
    var c = app.sim.coach(), top = c[0]; if (!top || top.p < 6) return;
    var key = top.ac + '|' + top.t.replace(/[\d.]+/g, '#'); if (app.instSeen[key]) return; app.instSeen[key] = 1;
    app.paused = true; app.instOn = true; select(top.ac); $('instText').textContent = top.t;
    var say = '', ac = app.sim.byId(top.ac);
    if (top.c && ac) { try { var ph = ATC.phrase(app.sim, ac, top.c); if (ph && ph.atc) say = '<div class="isay"><i>' + ATC.T('이렇게 말합니다') + '</i>' + esc(ph.atc) + '<small>' + esc(ATC.gloss(ph.atc)) + '</small></div>'; } catch (err) { say = ''; } }
    $('instSay').innerHTML = say; $('inst').className = 'show';
  }
  /* 소리 시험: 무선 음성을 한 번 틀고, 안 되면 까닭을 화면에 적음 */
  function soundTest() {
    var el = $('soundMsg'), RD = ATC.Radio, n = 0;
    if (!packOn()) {   /* 표준 음성 */
      RD.init(); el.className = 'show';
      var ok = tts({ who: 'atc', text: 'VELA 301, runway 07L, cleared to land, wind 040 at 10.', cs: 'VLA301' }, function () { tts({ who: 'pilot', text: 'Runway 07L, cleared to land, VELA 301.', cs: 'VLA301' }); });
      el.textContent = ok ? ATC.T('표준 음성(브라우저의 영어 음성 + 무선 잡음)을 재생했습니다. 들리지 않으면 ① 브라우저 탭·사이트 음소거 ② PC 소리 장치·음량 ③ PC에 영어 음성이 설치돼 있는지 확인해 주세요.') : ATC.T('이 브라우저에는 음성 합성 기능이 없습니다. 크롬이나 엣지에서 열어 주세요.');
      return;
    }
    RD.loadAll(); el.className = 'show'; el.textContent = ATC.T('음성을 읽어 들이는 중…');
    var T1 = 'VELA 301, runway 07L, cleared to land, wind 040 at 10.', T2 = 'Runway 07L, cleared to land, VELA 301.';
    (function go() {
      var d = RD.diag(), sec = 0, can = RD.plan(T1, 'atc', 'VLA301') && RD.plan(T2, 'pilot', 'VLA301');
      if (!can && !RD.ready() && n++ < 100 && d.ctx !== 'none' && !d.err && ATC.VPARTS) { el.textContent = ATC.T('음성을 읽어 들이는 중… {0}', d.packs); setTimeout(go, 150); return; }
      if (can) sec = RD.speak(T1, 'atc', 'VLA301', false);
      if (sec > 0) { el.textContent = ATC.T('무선 음성을 재생했습니다(약 {0}초). 들리지 않으면 ① 브라우저 탭·사이트 음소거 ② PC 소리 장치·음량을 확인해 주세요.', Math.round(sec)); setTimeout(function () { RD.speak(T2, 'pilot', 'VLA301', false); }, sec * 1000 + 250); return; }
      d = RD.diag();
      var why = d.ctx === 'none' ? ATC.T('이 브라우저에서 소리 장치를 열 수 없습니다{0}', (d.err ? '(' + d.err + ')' : '')) : d.ctx !== 'running' ? ATC.T('브라우저가 소리를 막고 있습니다(상태: {0}). 화면을 한 번 누른 뒤 다시 시험해 주세요', d.ctx) : !can ? ATC.T('음성 파일(assets/voice)을 읽지 못했습니다 — {0}{1}', d.packs, (d.err ? ' / ' + d.err : '')) : ATC.T('음성 조각이 모자랍니다{0}', (d.err ? '(' + d.err + ')' : ''));
      el.textContent = ATC.T('무선 음성 재생 실패: {0}. 브라우저 기본 음성으로 대신 읽습니다.', why);
      tts({ who: 'atc', text: 'VELA 301, runway 07L, cleared to land.', cs: 'VLA301' });
    })();
  }
  function hideInst() { var el = $('inst'); if (el) el.className = ''; app.instOn = false; }
  function resumeInst() { beep(1250, 0.03); if (app.instOn) { hideInst(); app.paused = false; app.instT = performance.now(); } }
  /* ================= 시작 ================= */
  /* index.html에 직접 적힌 글(글자 마디·title·placeholder)을 지금 언어로 바꿈 — 원문이 곧 열쇠 */
  function applyStatic() {
    var HAN = /[\uAC00-\uD7A3]/, w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) if (HAN.test(n.nodeValue) && n.parentNode.nodeName !== 'SCRIPT') list.push(n);
    list.forEach(function (t) { var raw = t.nodeValue, k = raw.trim(); t.nodeValue = raw.replace(k, ATC.T(k)); });
    Array.prototype.forEach.call(document.querySelectorAll('[title],[placeholder]'), function (e) { ['title', 'placeholder'].forEach(function (a) { var v = e.getAttribute(a); if (v && HAN.test(v)) e.setAttribute(a, ATC.T(v)); }); });
    if (HAN.test(document.title)) document.title = ATC.T(document.title);
    document.documentElement.lang = ATC.lang();
    /* 언어 고르기: 등록된 언어가 둘 이상일 때만 보임 */
    var ls = ATC.langs(), el = $('langs');
    if (el && ls.length > 1) { el.hidden = false; el.innerHTML = '<span>Language</span>' + ls.map(function (l) { return '<button data-lang="' + l.id + '" class="' + (l.id === ATC.lang() ? 'on' : '') + '">' + esc(l.name) + '</button>'; }).join(''); el.addEventListener('click', function (e) { var b = e.target.closest('[data-lang]'); if (b && b.dataset.lang !== ATC.lang()) ATC.setLang(b.dataset.lang); }); }
  }
  window.addEventListener('DOMContentLoaded', function () {
    applyStatic(); if (ATC.learnInit) ATC.learnInit();
    if (/[?&]guide=1/.test(location.search)) {   /* 그림 의뢰용 배치도: 글자 없이 지형만 */
      document.body.innerHTML = '<canvas id="g" width="3200" height="2000" style="display:block"></canvas>'; document.body.style.overflow = 'auto';
      var gc = document.getElementById('g').getContext('2d'), SAT = D.guide || { u1: -2400, u2: 2400, v1: -1500, v2: 1500 };
      R.drawGround(gc, 3200, 2000, { guide: true, sel: 0, hit: [], view: { cu: (SAT.u1 + SAT.u2) / 2, cv: (SAT.v1 + SAT.v2) / 2, scale: 3200 / (SAT.u2 - SAT.u1) }, sim: { acs: [], t: 0, mode: 'GUIDE', flow: D.flows[Object.keys(D.flows)[0]], rwClosed: {}, net: { closed: {} }, byId: function () { return null; }, finals: function () { return []; } } });
      return;
    }
    bind(); if (!(D.sat && D.sat.img === null)) R.loadSat((ATC.base || '') + ((D.sat && D.sat.img) || 'assets/img/ground_sat.webp')); showLobby(); requestAnimationFrame(frame);
    var q = /[?&]auto=([A-Z]{3})(\d)?(?:&seed=(\d+))?/.exec(location.search); if (q) { app.level = +(q[2] || 1); start(q[1], q[3] ? +q[3] : 0); }
  });
  ATC.ui = { start: start, select: select, showLobby: showLobby, showResult: showResult, openLearn: openLearn, briefing: briefing, addPend: addPend, sendPend: sendPend, openModal: openModal, closeModal: closeModal, tts: tts };
})();
