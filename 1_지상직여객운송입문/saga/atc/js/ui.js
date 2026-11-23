/* AIRLINE SAGA — ATC 화면 조작: 로비 · 근무 화면 · 지시판 · 스트립 · 교신 기록 · 결과 */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt, R = ATC.R, POS = ATC.POS, NM = 1852;
  var $ = function (id) { return document.getElementById(id); };
  var app = ATC.app = { sim: null, aq: [], sel: 0, pend: [], speed: 1, paused: false, view: null, voice: true, vmode: 'radio', vfx: 'strong', vrate: 'n', vatc: 'm', ttsEnds: false, coach: true, gloss: true, inst: false, level: 1, flow: 'auto', tab: 'free', scn: null, hit: [], btns: [], mx: 0, my: 0, gt: null, del: {} };
  var REC_KEY = 'acn_atc_rec_v1' + (ATC.aptId && ATC.aptId !== 'XSRA' ? '_' + ATC.aptId : ''), OPT_KEY = 'acn_atc_opt_v1', SCN_KEY = 'acn_atc_scn_v1', SCN_GO = 'acn_atc_scn_go', DAILY_KEY = 'acn_atc_daily_v1_' + (ATC.aptId || 'XSRA'), ENDLESS_KEY = 'acn_atc_endless_v1_' + (ATC.aptId || 'XSRA'), PILOT_KEY = 'acn_atc_pilot_v1_' + (ATC.aptId || 'XSRA');   /* 근무 기록은 공항별로 따로 */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function imgUrl(rel) { rel = (ATC.base || '') + rel; try { return new URL(rel, location.href).href.replace(/'/g, '%27'); } catch (e) { return rel; } }   /* 스타일시트 기준이 아니라 문서 기준 주소로 */
  function load(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }

  /* ================= 로비 ================= */
  /* ---- 새로고침 대비: 근무 중에는 당겨서 새로고침을 막고(CSS), 새로고침 전에 묻고, 끊기면 같은 조건으로 다시 시작 ---- */
  var RESUME_K = 'acn_atc_resume_v1';
  /* 휴대폰: 근무 중 화면을 위에서 아래로 당겨도 새로고침되지 않게 — CSS(overscroll-behavior)를 따르지 않는 브라우저(삼성 인터넷 등)용.
     페이지가 맨 위이고, 손가락 아래의 칸도 더 올릴 것이 없을 때 아래로 끄는 움직임만 막음(가로 끌기 · 안쪽 칸 스크롤은 그대로) */
  (function () {
    var x0 = 0, y0 = 0, el0 = null;
    document.addEventListener('touchstart', function (e) { if (e.touches.length !== 1) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; el0 = e.target; }, { passive: true });
    document.addEventListener('touchmove', function (e) {
      if (!document.documentElement.classList.contains('ingame') || e.touches.length !== 1 || !e.cancelable) return;
      var dx = e.touches[0].clientX - x0, dy = e.touches[0].clientY - y0; if (dy <= 0 || dy < Math.abs(dx)) return;
      if ((window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0) > 0) return;
      for (var n = el0; n && n.nodeType === 1 && n !== document.body; n = n.parentNode) if (n.scrollTop > 0) return;
      e.preventDefault();
    }, { passive: false });
  })();
  function endPlay() { try { sessionStorage.removeItem(RESUME_K); } catch (e) { } document.documentElement.classList.remove('ingame'); }
  function resumeOffer() {
    var r = app.resume0; app.resume0 = null;      /* 처음 읽을 때 받아 둔 것(로비를 그리며 지워지므로) */
    if (!r || r.apt !== ATC.aptId || Date.now() - r.t > 12 * 3600 * 1000) return;
    var el = document.createElement('div'); el.id = 'resume';
    el.innerHTML = '<p>' + ATC.T('새로고침으로 하던 근무가 끊겼습니다. 진행 상황은 이어 갈 수 없지만, 같은 조건(같은 교통 · 날씨)으로 처음부터 다시 시작할 수 있습니다.') + '</p><div><button class="btn pri" data-r="go">' + ATC.T('같은 조건으로 다시 시작') + '</button><button class="btn" data-r="no">' + ATC.T('닫기') + '</button></div>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; el.remove(); if (b.dataset.r !== 'go') { endPlay(); return; }
      var x = r.xo; if (r.scn && ATC.SCN_BY[r.scn]) { var sc = ATC.SCN_BY[r.scn]; start(sc.pos, sc.seed, sc); }
      else if (x && x.pilotDep) start(x.k0 || 'DEL', r.seed, null, x);
      else start(r.k, x && x.daily ? x.seed : r.seed, null, x); });
  }
  /* 휴대폰: 지도 · 조종석 위 자막(최근 교신 2개) · 교신 기록 크게 보기 */
  var caps = [];
  function capPush(e) {
    if (!(e.who === 'atc' || e.who === 'pilot') || e.blocked) return;
    var c = $('cap'); if (!c) return; var who = e.who === 'atc' ? (app.sim && app.sim.pilot ? ATC.T('관제') : app.sim && app.sim.apron ? 'APN' : app.pos.id) : e.cs;
    caps.push({ who: who, t: e.text, at: Date.now(), atc: e.who === 'atc' }); if (caps.length > 2) caps.shift(); capDraw();
  }
  function capDraw() { var c = $('cap'); if (!c) return; var now = Date.now(); caps = caps.filter(function (x) { return now - x.at < 14000; }); c.innerHTML = caps.map(function (x) { return '<div class="' + (x.atc ? 'a' : 'p') + '"><b>' + esc(x.who) + '</b> ' + esc(x.t) + '</div>'; }).join(''); c.hidden = !caps.length; }
  function setLogBig(on) { app.logBig = !!on; $('game').classList.toggle('logbig', app.logBig); var b = $('bLogBig'); if (b) b.textContent = app.logBig ? ATC.T('↩ 지시판') : ATC.T('⤢ 크게'); }
  function showLobby() {
    endPlay();
    if (ATC.Cockpit) ATC.Cockpit.close();
    app.sim = null; $('game').hidden = true; $('lobby').hidden = false; closeModal();
    app.aq = []; if (window.speechSynthesis) speechSynthesis.cancel(); if (ATC.Radio.ctx) ATC.Radio.stop();      /* 로비로 나오면 남은 소리를 모두 끊음 */
    var opt = load(OPT_KEY, {}), rec = load(REC_KEY, {}); if (opt.level) app.level = opt.level; if (opt.rtPos) app.rtPos = opt.rtPos; if (opt.voice !== undefined) app.voice = opt.voice; if (opt.micEx !== undefined) app.micEx = opt.micEx; if (opt.vdock !== undefined) app.vdock = opt.vdock; app.vdockSeen = !!opt.vdockSeen; if (opt.vm2) app.vmode = opt.vm2; if (opt.vfx) app.vfx = opt.vfx; if (opt.vrate) app.vrate = opt.vrate; if (opt.vatc) app.vatc = opt.vatc; voiceSet(); if (opt.flow) app.flow = opt.flow; if (opt.gloss !== undefined) app.gloss = opt.gloss; if (opt.inst !== undefined) app.inst = opt.inst; if (opt.wx) app.wx = opt.wx; if (opt.tab && !app.tabSet) app.tab = opt.tab; app.scn = null;
    var h = '';
    ATC.POS_ORDER.forEach(function (k, ix) {
      var p = POS[k], r = rec[k + app.level], shut = D.modes && D.modes.indexOf(k) < 0;      /* 이 공항에서 아직 열지 않은 자리 */
      h += '<button class="pcard' + (shut ? ' shut' : '') + '"' + (shut ? ' disabled' : '') + ' data-pos="' + k + '" style="--img:url(\'' + imgUrl('assets/img/pos_' + k.toLowerCase() + '.webp') + '\')"><span class="pnum">0' + (ix + 1) + '</span><span class="pko">' + p.nm + '</span>' + (p.ko !== p.nm ? '<span class="plo">' + p.ko + '</span>' : '') + '<span class="pfq">' + p.call + ' · ' + p.fq + '</span><span class="psum">' + p.sum + '</span>' + (shut ? '' : '<span class="prate r' + rating(rec, k) + '">' + RATE_NM()[rating(rec, k)] + '</span>') + '<span class="prec">' + (shut ? ATC.T('이 공항에서는 준비 중') : r ? ATC.T('최고 {0}점 · {1} ({2}회)', r.best, r.grade, r.n) : ATC.T('기록 없음')) + '</span></button>';
    });
    $('pcards').innerHTML = h; renderX(rec);
    /* 자유 근무 / 시나리오 — 고른 쪽만 보임. 시나리오는 난이도 · 운용 방향이 판마다 정해져 있어 그 두 줄은 숨김 */
    var scnOn = app.tab === 'scn' && scnList().length > 0;
    $('tabs').hidden = !scnList().length; Array.prototype.forEach.call(document.querySelectorAll('#tabs button'), function (b) { b.classList.toggle('on', (b.dataset.tab === 'scn') === scnOn); });
    $('pcards').hidden = scnOn; $('xmodes').hidden = scnOn; $('scns').hidden = !scnOn; $('lvls').hidden = scnOn; $('flows').hidden = scnOn;
    if (scnOn) renderScns();
    /* 실제 공항을 바탕으로 한 묶음은 바닥 글을 그 공항의 안내로 바꿈 */
    if (D.airport.note) { var ft = document.querySelector('.foot'); if (ft && !ft.dataset.base) { ft.dataset.base = '1'; ft.textContent = (D.airlines.some(function (a) { return a.real; }) ? ATC.T('{0} — 활주로 · 유도로 이름 · 주기장 · 주파수는 공개된 항공정보간행물(AIP)을 바탕으로 간략화해 옮긴 것입니다. 실제 항공사의 이름 · 호출부호는 교육용으로만 씁니다. 이 게임은 항공사의 공식 제품이 아니며 제휴 · 후원 · 승인 관계가 없습니다(로고 · 도장 없음). 항공사 명칭 · 상표에 관한 권리는 각 권리자에게 있습니다. 항공사 · 노선은 2026년 11월 공개 자료 기준이고, 편명 · 기종 배정 · 교통량 · 출발 · 도착 방면 · 관제 절차의 세부 수치는 가상입니다. 게임이 훈련용으로 일으키는 돌발 상황(비상 · 조종사 스스로의 복행 · 규정 위반 등)은 가상 항공사에만 배정합니다. 실제 항공사도 관제 지시나 활주로 폐쇄 같은 공항 운용의 결과로는 복행할 수 있습니다. 교신 음성은 합성 음성(Kokoro)에 무선 음질 효과를 적용한 것입니다.', D.airport.note) : ATC.T('{0} — 활주로 · 유도로 이름 · 주기장 · 주파수는 공개된 항공정보간행물(AIP)을 바탕으로 간략화해 옮긴 것이며, 항공사 · 편명 · 교통량 · 관제 절차의 세부 수치는 가상입니다. 교신 음성은 합성 음성(Kokoro)에 무선 음질 효과를 적용한 것입니다.', D.airport.note)); } }
    Array.prototype.forEach.call(document.querySelectorAll('#lvls button'), function (b) { b.classList.toggle('on', +b.dataset.lv === app.level); });
    if (app.flow !== 'auto' && !D.flows[app.flow]) app.flow = 'auto';
    Array.prototype.forEach.call(document.querySelectorAll('#flows button'), function (b) { b.classList.toggle('on', b.dataset.fl === app.flow); });
    Array.prototype.forEach.call(document.querySelectorAll('#vmodes button'), function (b) { b.classList.toggle('on', b.dataset.vm === app.vmode); });
    Array.prototype.forEach.call(document.querySelectorAll('#vfxs button'), function (b) { b.classList.toggle('on', b.dataset.fx === app.vfx); });
    Array.prototype.forEach.call(document.querySelectorAll('#vrates button'), function (b) { b.classList.toggle('on', b.dataset.vr === app.vrate); });
    Array.prototype.forEach.call(document.querySelectorAll('#vatcs button'), function (b) { b.classList.toggle('on', b.dataset.va === app.vatc); });
    $('vmodes').hidden = !app.voice || !ATC.VPARTS; $('vfxs').hidden = !app.voice || app.vmode !== 'radio'; $('vrates').hidden = !app.voice || !packOn(); $('vatcs').hidden = !app.voice || !packOn() || !(ATC.VPARTS && ATC.VPARTS.ctlf);
    var vn = $('vnote'); if (vn) { vn.hidden = !(app.voice && app.vmode === 'radio' && (D.voice === false || D.voice && D.voice.note && packOn())); vn.textContent = D.voice === false ? ATC.T('이 공항은 아직 녹음 음성이 없어 브라우저의 영어 음성으로 재생합니다(무선 잡음은 「무선 음질」 설정을 따릅니다).') : D.voice ? D.voice.note : ''; }
    $('optVoice').classList.toggle('on', app.voice); $('optVoice').textContent = ATC.T('교신 음성 {0}', (app.voice ? ATC.T('켬') : ATC.T('끔')));
    $('optInst').classList.toggle('on', app.inst); $('optInst').textContent = ATC.T('교관 동석 {0}', (app.inst ? ATC.T('켬') : ATC.T('끔')));
  }
  /* 무선 음질·말 빠르기 설정을 재생기에 넘김 */
  function voiceSet() { var RD = ATC.Radio; RD.fx = app.vfx === 'weak' ? 'weak' : 'strong'; RD.rate = app.vrate === 's' ? 0.9 : app.vrate === 'f' ? 1.12 : 1; RD.atc = app.vatc === 'f' ? 'ctlf' : 'ctl'; if (RD.ctx && app.voice && packOn()) RD.loadAll(); }
  /* 녹음 조각(무선 음성)을 쓰는가: 음성 방식이 「무선 음성」이고, 이 공항의 조각이 있을 때. 조각이 없는 공항(D.voice === false)은 브라우저 음성으로 */
  function packOn() { return app.vmode === 'radio' && D.voice !== false && !!ATC.VPARTS; }      /* 음성 묶음 파일이 아예 없는 판(사이트판)도 브라우저 음성으로 */
  function saveOpt() { save(OPT_KEY, { micEx: !!app.micEx, vdock: !!app.vdock, vdockSeen: !!app.vdockSeen, tab: app.tab, level: app.level, voice: app.voice, vm2: app.vmode, vfx: app.vfx, vrate: app.vrate, vatc: app.vatc, flow: app.flow, gloss: app.gloss, inst: app.inst, wx: app.wx, rtPos: app.rtPos }); }
  function briefing(k) {
    var p = POS[k], L = D.levels[app.level], les = ATC.LEARN_BY[p.les];
    var lvTxt = ['', ATC.T('교통량 적음 · 코치가 다음 조치를 안내 · 비정상 상황 없음 · 복창 오류 없음'), ATC.T('교통량 보통 · 코치 없음 · 비정상 상황 1건 · 간헐적 복창 오류'), ATC.T('교통량 많음 · 비정상 상황 다수 · 복창 오류 빈번 · 복수 활주로 동시 운용')][app.level];
    openModal(ATC.T('<div class="mhead"><span class="pen">{0}</span><h2>{1} <small>{2} {3}</small></h2></div><div class="mbody"><p class="bsum">{4}</p><h4>근무 절차</h4><ol class="bl">{5}</ol><h4>오늘의 난이도 — {6}</h4><p>{7}</p>{11}<details class="bles"><summary>학습 노트: {8} (펼치기)</summary>{9}</details></div><div class="mfoot"><button class="btn" data-m="learn">학습 노트 전체</button><span class="sp"></span><button class="btn" data-m="close">돌아가기</button>{12}<button class="btn pri" data-m="start" data-pos="{10}">근무 시작</button></div>', p.en, p.ko !== p.nm ? p.nm + ' · ' + p.ko : p.nm, p.call, p.fq, p.sum, p.brief.map(function (b) { return '<li>' + b + '</li>'; }).join(''), L.ko, lvTxt, les.t, les.h, k,
      app.level === 1 ? ATC.T('<div class="bfirst"><b>처음이라면 이 순서만 기억하세요</b><ol><li>항공기를 선택한다(화면의 표적 또는 스트립)</li><li>하단 지시판에서 지시를 선택한다</li><li>「송신」을 누른다(Enter)</li><li>조종사의 복창이 지시와 일치하는지 확인한다</li></ol><p>「교관 동석」으로 시작하면, 조치가 필요할 때마다 일시 정지하고 무엇을 어떻게 지시할지 안내합니다.</p></div>') : '',
      (app.level === 1 && !app.inst ? ATC.T('<button class="btn hi" data-m="startinst" data-pos="{0}">교관 동석으로 시작</button>', k) : '') + (k === 'GND' && D.tcp ? ATC.T('<button class="btn" data-m="startapn" data-pos="GND">계류장 관제(Apron)로 시작</button>') : '')));      /* 인천: 푸시백 ~ TCP만 맡는 계류장 관제 */
  }

  /* ================= 시나리오 ================= */
  /* 이 판에서 고를 수 있는 판: 공항 묶음이 있고, 사이트판이면 시험판 공항의 판은 뺌 */
  function scnList() { var ok = {}; ATC.airports().forEach(function (a) { if (!(a.hidden || window.ATC_SITE && a.preview) || a.id === ATC.aptId) ok[a.id] = a.name; }); return (ATC.SCN || []).filter(function (x) { return ok[x.apt]; }); }
  function aptName(id) { var n = id; ATC.airports().forEach(function (a) { if (a.id === id) n = a.name; }); return String(n).replace(/\s*[(（].*$/, ''); }
  function starHtml(st) { return '<span class="stars">' + [0, 1, 2].map(function (i) { return '<i class="' + (st && st[i] ? 'on' : '') + '">★</i>'; }).join('') + '</span>'; }
  function renderScns() {
    var rec = load(SCN_KEY, {}), all = scnList(), list, h = '', got = 0, apts = [];
    all.forEach(function (x) { var r = rec[x.id]; if (r) got += r.st[0] + r.st[1] + r.st[2]; if (apts.indexOf(x.apt) < 0) apts.push(x.apt); });
    if (apts.indexOf(app.scnApt) < 0) app.scnApt = '';
    list = all.filter(function (x) { return !app.scnApt || x.apt === app.scnApt; });
    h += ATC.T('<p class="scnintro">한 가지 상황에 집중하는 짧은 근무입니다. 교통 흐름 · 기상 · 발생 상황이 매번 같아, 반복해서 기록을 비교할 수 있습니다. 순서에 관계없이 원하는 시나리오를 선택하세요. <b>획득한 별 {0} / {1}</b></p>', got, all.length * 3);
    if (apts.length > 1) h += '<div class="seg scnf"><span>' + ATC.T('공항') + '</span><button data-sapt="" class="' + (app.scnApt ? '' : 'on') + '">' + ATC.T('전체 {0}', all.length) + '</button>' + apts.map(function (a) { return '<button data-sapt="' + a + '" class="' + (app.scnApt === a ? 'on' : '') + '">' + esc(aptName(a).replace(/^.* · /, '').replace(/\s*국제공항$/, '')) + ' ' + all.filter(function (x) { return x.apt === a; }).length + '</button>'; }).join('') + '</div>';
    ATC.SCN_CH.forEach(function (c) {
      var its = list.filter(function (x) { return x.ch === c.id; }); if (!its.length) return;
      h += '<h3 class="sch"><span>' + ATC.T('제{0}장', c.id) + '</span> ' + c.t + '</h3><div class="scg">';
      its.forEach(function (x) { var r = rec[x.id], P = ATC.POS[x.pos];
        var lock = x.wip && window.ATC_SITE;      /* 준비 중인 판: 표시는 하되, 사이트판에서는 검수가 끝날 때까지 열지 않음 */
        h += '<button class="scard' + (x.wip ? ' wip' : '') + '"' + (lock ? ' disabled' : '') + ' data-scn="' + x.id + '"><span class="sno">' + x.no + (x.wip ? ' <i class="swip">' + ATC.T('준비 중') + '</i>' : '') + '</span><b>' + x.title + '</b><span class="smeta">' + P.nm + ' · ' + esc(aptName(x.apt)) + ' · ' + ATC.T('약 {0}분', x.min) + '</span><span class="ssum">' + x.learn + '</span><span class="srec">' + starHtml(r && r.st) + (lock ? ATC.T('검수를 마친 뒤 공개합니다') : r ? ATC.T('최고 {0}점 ({1}회)', r.best, r.n) : ATC.T('기록 없음')) + '</span></button>'; });
      h += '</div>';
    });
    $('scns').innerHTML = h;
  }
  function scnBrief(id) {
    var w0 = ATC.SCN.filter(function (x) { return x.id === id; })[0]; if (w0 && w0.wip && window.ATC_SITE) return;
    var x = ATC.SCN_BY[id]; if (!x) return; var P = ATC.POS[x.pos], here = x.apt === ATC.aptId, rec = load(SCN_KEY, {})[id];
    openModal(ATC.T('<div class="mhead"><span class="pen">SCENARIO {0} · {1}</span><h2>{2} <small>{3} · {4} · 약 {5}분</small></h2></div><div class="mbody"><p class="bsum">{6}</p><h4>브리핑</h4><table class="sbrief"><tr><th>기상</th><td>{7}</td></tr><tr><th>상황</th><td>{8}</td></tr><tr><th>임무</th><td>{9}</td></tr></table><h4>평가 기준 — 별 3개</h4><ol class="sgoal"><li><b>안전</b> 안전 감점(분리 상실 · 활주로 침범 등) 없음</li><li><b>목표</b> {10}</li><li><b>효율</b> {11}점 이상</li></ol><p class="snote">{12}</p></div><div class="mfoot"><button class="btn" data-m="learn" data-les="{13}">학습 노트</button><span class="sp"></span><button class="btn" data-m="close">돌아가기</button><button class="btn pri" data-m="scnstart" data-scn="{14}">{15}</button></div>',
      x.no, P.en, x.title, esc(aptName(x.apt)), P.nm, x.min, x.learn, x.brief.wx, x.brief.what, x.brief.todo, x.goal.t, x.eff,
      (rec ? ATC.T('이전 기록: 별 {0}개 · 최고 {1}점 · {2}회. ', rec.st[0] + rec.st[1] + rec.st[2], rec.best, rec.n) : '') + (here ? ATC.T('소요 시간은 ×{0} 배속 기준입니다.', P.spd) : ATC.T('이 시나리오는 {0}에서 진행합니다. 선택하면 공항을 전환한 뒤 이 브리핑을 다시 표시합니다.', esc(aptName(x.apt)))),
      P.les, x.id, here ? ATC.T('시작') : ATC.T('공항 전환')));
  }
  /* 다른 공항의 판: 고른 판을 적어 두고 공항을 바꿈(화면을 다시 읽음) → 다시 읽은 뒤 안내를 엶 */
  function scnGo(id) { var x = ATC.SCN_BY[id]; if (!x) return; if (x.apt === ATC.aptId) { start(x.pos, x.seed, x); return; } app.tab = 'scn'; saveOpt(); try { localStorage.setItem(SCN_GO, JSON.stringify({ id: id, t: Date.now() })); } catch (e) { } ATC.setAirport(x.apt); }
  function scnPending() { var g = null; try { g = JSON.parse(localStorage.getItem(SCN_GO)); localStorage.removeItem(SCN_GO); } catch (e) { } if (g && g.id && Date.now() - g.t < 120000 && ATC.SCN_BY[g.id] && ATC.SCN_BY[g.id].apt === ATC.aptId) { app.tab = 'scn'; app.tabSet = true; showLobby(); scnBrief(g.id); } }

  /* 「바람대로」: 운용 방식마다 정해 둔 비율(w)로 하나를 뽑음 */
  function pickFlow(r) { var ks = Object.keys(D.flows), i, acc = 0; for (i = 0; i < ks.length; i++) { acc += D.flows[ks[i]].w || 1 / ks.length; if (r < acc) return ks[i]; } return ks[ks.length - 1]; }
  /* ================= 근무 시작 ================= */
  /* ================= 자격 등급 · 오늘의 과제 · 무한 근무 ================= */
  /* 자격: 훈련생(0) → 자격(1: 중급 이상 85점 · 안전 감점 0) → 교관(2: 고급 95점 · 안전 감점 0). 자리마다 따로 */
  function RATE_NM() { return [ATC.T('훈련생'), ATC.T('자격'), ATC.T('교관')]; }
  function rating(rec, k) { return rec[k + 3] && rec[k + 3].ins ? 2 : (rec[k + 2] && rec[k + 2].chk) || (rec[k + 3] && rec[k + 3].chk) ? 1 : 0; }
  function openPos() { return ATC.POS_ORDER.filter(function (k) { return !D.modes || D.modes.indexOf(k) >= 0; }); }
  function dayNo(d) { return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 864e5); }      /* 이 기기의 날짜 기준 일수 */
  function daily() {
    var d = new Date(), ds = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(), h = 7, s = ds + (ATC.aptId || 'XSRA'), i, op = openPos();
    for (i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000003;
    return { daily: true, ds: ds, day: dayNo(d), pos: op[(dayNo(d) % op.length + op.length) % op.length], seed: h % 900000 + 1000, level: 2 };
  }
  function streak(dr, day) { var n = 0, set = {}; (dr.days || []).forEach(function (x) { set[x] = 1; }); while (set[day - n]) n++; return n; }
  function renderX(rec) {
    var el = $('xmodes'); if (!el) return;
    var dy = daily(), dr = load(DAILY_KEY, {}), today = dr.ds === dy.ds ? dr : null, er = load(ENDLESS_KEY, {}), op = openPos(), ca = [], cb = [];
    /* 로비 아래 칸: 「도전 근무」(오늘의 과제 · 무한 근무)와 「조종사 체험」(비행 순서대로 출발 → 도착) 두 묶음 */
    ca.push('<button class="xbtn daily" data-x="daily"><i>' + ATC.T('오늘의 과제') + '</i><b>' + POS[dy.pos].nm + ' · ' + ATC.T('중급') + '</b><small>' + (today ? ATC.T('오늘 최고 {0}점 · {1}회 · 연속 {2}일', today.best, today.n, streak(dr, dy.day)) : ATC.T('모두 같은 교통 · 같은 날씨 — 날마다 자리가 바뀝니다')) + '</small></button>');
    ['TWR', 'APP'].forEach(function (k) { if (op.indexOf(k) < 0) return; var b = er[k + app.level]; ca.push('<button class="xbtn endless" data-x="endless" data-pos="' + k + '"><i>' + ATC.T('무한 근무') + '</i><b>' + POS[k].nm + ' · ' + LVNM()[app.level] + '</b><small>' + (b ? ATC.T('최고 {0}대 처리', b.best) : ATC.T('교통이 점점 늘어남 — 안전 감점 3번이면 끝')) + '</small></button>'); });
    if (ATC.RT && D.realTraffic && D.ll2xy && op.indexOf('APP') >= 0) ca.push('<button class="xbtn real" data-x="real"><i>' + ATC.T('실제 교통') + '</i><b>' + ['APP', 'TWR', 'GND'].filter(function (k) { return op.indexOf(k) >= 0; }).join(' · ') + ' · ' + LVNM()[app.level] + '</b><small>' + ATC.T('최근 15분 안의 실제 항공기 위치 · 편명으로 시작 — 그 뒤로는 직접 관제') + '</small></button>');      /* 실제 교통 근무(realtraffic.js) */
    if (ATC.DepPilot && (ATC.aptId === 'RJTT' || D.pilotDep) && op.indexOf('DEL') >= 0) cb.push('<button class="xbtn pilot" data-x="pilotdep"><i>' + ATC.T('출발편') + '</i><b>' + ATC.T('Vela Air {apt} 출발(주기장 → 순항)') + '</b><small>' + ATC.T('비행계획 → Delivery → 푸시백 · 지상 이동 → Tower 이륙 → Departure → {aptEn} Control · 순항 고도까지') + '</small></button>' + (op.indexOf('GND') >= 0 ? '<button class="xbtn pilot" data-x="pilotdep2"><i>' + ATC.T('출발편') + '</i><b>' + ATC.T('푸시백부터 시작(2단계)') + '</b><small>' + ATC.T('허가는 받은 상태 — 푸시백 요청 · 엔진 시동 · 지상 이동 경로 복창 · 활주로 앞 정지') + '</small></button>' : '') + (op.indexOf('TWR') >= 0 ? '<button class="xbtn pilot" data-x="pilotdep3"><i>' + ATC.T('출발편') + '</i><b>' + ATC.T('이륙부터 시작(3단계)') + '</b><small>' + ATC.T('대기 지점에서 — 이륙 준비 보고 · 이륙 허가 복창 · 이륙 추력 · 기어 · 자동조종') + '</small></button>' : ''));
    if (op.indexOf('APP') >= 0 && ATC.Pilot) { var pb = load(PILOT_KEY, {})[app.level]; cb.push('<button class="xbtn pilot" data-x="pilot"><i>' + ATC.T('도착편') + '</i><b>' + ATC.T('Vela Air 도착 · {0}', LVNM()[app.level]) + '</b><small>' + (pb ? ATC.T('최고 {0}점 · {1}회', pb.best, pb.n) : ATC.T('Approach 레이더 유도 → ILS 접근 → Tower 착륙 허가 → 착륙 — 직접 조종 착륙도 선택')) + '</small></button>'); }
    function grp(cls, t, sub, x, ex) { var j = x.join(''), n = j.split('<button').length - 1; return n ? '<section class="xgrp ' + cls + '" style="--n:' + n + '"><h5>' + t + ' <small>' + sub + '</small></h5>' + (ex || '') + '<div class="xrow">' + j + '</div></section>' : ''; }
    var WX = [['day', ATC.T('맑은 낮')], ['night', ATC.T('밤')], ['xwind', ATC.T('옆바람')], ['lowvis', ATC.T('저시정')], ['rand', ATC.T('무작위')]], wxv = app.wx || 'day';
    var wxs = '<div class="seg xwx"><span>' + ATC.T('날씨 · 시간') + '</span>' + WX.map(function (w) { return '<button data-wx="' + w[0] + '" class="' + (w[0] === wxv ? 'on' : '') + '">' + w[1] + '</button>'; }).join('') + '</div>';
    var h = grp('chal', ATC.T('도전 근무'), D.realTraffic ? ATC.T('오늘의 과제 · 무한 근무 · 실제 교통') : ATC.T('오늘의 과제 · 무한 근무'), ca) + grp('pil', ATC.T('조종사 체험'), ATC.T('Vela Air 조종사가 되어 AI 관제사의 지시를 듣고 복창 · 조작'), cb, wxs);
    var cnt = [0, 0, 0]; op.forEach(function (k) { cnt[rating(rec, k)]++; });
    var nx = op.map(function (k) { var r = rating(rec, k); return '<li class="r' + r + '"><b>' + k + '</b><span>' + RATE_NM()[r] + '</span></li>'; }).join('');
    el.innerHTML = h;
    /* 관제 자격은 자유 근무 / 시나리오 단추 옆의 긴 칸에 한 줄로 */
    var lr = $('lrates'); if (lr) lr.innerHTML = '<h4>' + ATC.T('관제 자격') + ' <small>' + ATC.T('교관 {0} · 자격 {1} · 훈련생 {2}', cnt[2], cnt[1], cnt[0]) + '</small></h4><ul>' + nx + '</ul><p>' + ATC.T('자격 = 중급 이상 85점 · 안전 감점 0 / 교관 = 고급 95점 · 안전 감점 0 (자리마다 따로)') + '</p>';
  }
  function LVNM() { return [null, ATC.T('초급'), ATC.T('중급'), ATC.T('고급')]; }
  /* 실제 교통 근무: 어느 때의 교통으로 할지 고름 → 받아서 접근관제 근무 시작(못 받으면 마지막 자료 · 아니면 평소 교통) */
  function realPick() {
    var K = [['', ATC.T('최근'), ATC.T('15분마다 새로 받음 — 밤에는 기체가 적을 수 있음')], ['am', ATC.T('아침 07:30'), ATC.T('가장 최근 아침 기록')], ['noon', ATC.T('낮 12:00'), ATC.T('가장 최근 낮 기록')], ['pm', ATC.T('저녁 18:00'), ATC.T('가장 최근 저녁 기록')]];
    var op = openPos(), PS = ['APP', 'TWR', 'GND'].filter(function (k) { return op.indexOf(k) >= 0; }), pos = PS.indexOf(app.rtPos) >= 0 ? app.rtPos : PS[0];
    var PD = { APP: ATC.T('하늘의 실제 기체를 그 자리 · 고도 그대로 넘겨받음'), TWR: ATC.T('내려오는 실제 기체가 차례로 결승 진입 · 지상의 실제 기체가 이륙하러 나옴'), GND: ATC.T('지상의 실제 기체가 푸시백 요청 · 내려오는 실제 기체가 착륙 뒤 주기장으로') };
    openModal('<div class="mhead"><h2>' + ATC.T('실제 교통 근무 — {apt}') + '</h2></div><div class="mbody"><p>' + ATC.T('실제 항공기(ADS-B)의 위치 · 고도 · 기수 · 편명 · 기종으로 근무를 시작합니다. 지시를 내리면 그 뒤로는 게임 속에서 움직이고, 새로 들어오는 편은 게임이 만듭니다. 게임에 없는 항공사 · 편명 없는 기체는 뺍니다.') + '</p><div class="seg rtpos">' + PS.map(function (k) { return '<button data-rtpos="' + k + '" class="' + (k === pos ? 'on' : '') + '"><b>' + k + '</b> ' + POS[k].nm.split(' / ').pop() + '</button>'; }).join('') + '</div><p class="rtpd" id="rtpd">' + PD[pos] + '</p><div class="rtk">' +
      K.map(function (k) { return '<button class="btn" data-rtk="' + k[0] + '"><b>' + k[1] + '</b><small>' + k[2] + '</small></button>'; }).join('') + '</div><p class="rtmsg" id="rtmsg"></p><p class="rtsrc">' + ATC.T('교통 데이터: ADSB.lol (ODbL 1.0) · 15분마다 받아 둔 자료라 실제보다 최대 20분쯤 늦음 · 교육용') + '</p></div><div class="mfoot"><span class="sp"></span><button class="btn" data-rtk="x">' + ATC.T('닫기') + '</button></div>');
    $('modalBox').onclick = function (e) {
      var pb = e.target.closest('[data-rtpos]'); if (pb) { pos = app.rtPos = pb.dataset.rtpos; saveOpt(); $('modalBox').querySelectorAll('[data-rtpos]').forEach(function (x) { x.classList.toggle('on', x === pb); }); $('rtpd').textContent = PD[pos]; return; }
      var b = e.target.closest('[data-rtk]'); if (!b) return; var k = b.dataset.rtk; if (k === 'x') { closeModal(); $('modalBox').onclick = null; return; }
      $('rtmsg').textContent = ATC.T('불러오는 중…'); $('modalBox').querySelectorAll('[data-rtk]').forEach(function (x) { x.disabled = true; });
      ATC.RT.load(ATC.aptId, k, function (d, how) {
        $('modalBox').onclick = null;
        if (!d) { closeModal(); start(pos, null, null, { level: app.level, realFail: 1 }); return; }
        var P = ATC.RT.parse(d); if (!P.list.length && !(pos !== 'APP' && P.gnd.length)) { closeModal(); start(pos, null, null, { level: app.level, realFail: 2, realT: d.t }); return; }
        closeModal(); start(pos, null, null, { level: app.level, real: d, realHow: how, realK: k });
      });
    };
  }
  function start(k, seed, scn, xo) {
    try { window.scrollTo(0, 0); } catch (e) { }      /* 휴대폰 세로: 로비를 내린 채 들어와도 게임 화면은 맨 위에서 시작 */
    var Cls = { DEL: ATC.DelSim, GND: ATC.GndSim, TWR: ATC.TwrSim, APP: ATC.AppSim, ACC: ATC.AccSim }[k];
    seed = seed || (Date.now() % 1000000);
    var rng = ATC.rng(seed + 7), flow = app.flow === 'auto' || !D.flows[app.flow] ? pickFlow(rng()) : app.flow;
    var fw = D.flows[flow].wind, wind = { dir: U.n360(fw.dir + rng.int(0, 6) * 10) || 360, spd: fw.spd + rng.int(0, fw.spdN) };
    xo = scn ? null : xo || null; app.xo = xo; app.pxr = '';
    if (!(xo && xo.carry)) { var xs = null, xk; if (xo) { xs = {}; for (xk in xo) if (xk !== 'carry') xs[xk] = xo[xk]; } try { sessionStorage.setItem(RESUME_K, JSON.stringify({ apt: ATC.aptId, k: k, seed: seed, scn: scn ? scn.id : null, xo: xs, t: Date.now() })); } catch (e) { } }      /* 새로고침(휴대폰에서 화면을 아래로 당김)으로 끊겼을 때 같은 조건으로 다시 시작하게 */
    document.documentElement.classList.add('ingame');
    var cr = xo && xo.carry || null; if (cr) { flow = cr.sim.flow.id; wind = cr.sim.wind; }      /* 조종사 체험 출발편: 앞 단계(비행허가)의 날씨 · 시각 · 기록을 이어받음 */      /* xo = 오늘의 과제(daily) · 무한 근무(endless) */
    if (xo && xo.daily) flow = pickFlow(rng());      /* 오늘의 과제는 운용 방향도 모두 같게 */
    if (xo && xo.real) { var rfl = ATC.RT.flowOf(ATC.RT.parse(xo.real).list) || (D.flows.N ? 'N' : Object.keys(D.flows)[0]); if (rfl && D.flows[rfl]) {      /* 기체로 운용 방향을 못 짐작하면 무작위 대신 북풍 운용(겨울철 주 운용) */  flow = rfl; fw = D.flows[flow].wind; wind = { dir: U.n360(fw.dir + rng.int(0, 6) * 10) || 360, spd: fw.spd + rng.int(0, fw.spdN) }; } }      /* 실제 교통: 그때 실제로 쓰던 방향(가까운 기체로 짐작) */
    var lv = scn ? scn.level : xo && xo.level || app.level; app.scn = scn || null;
    /* 조종사 체험 날씨 · 시간(로비에서 고름): 맑은 낮 · 밤 · 옆바람 · 저시정 · 무작위 — 출발편 다음 단계는 앞 단계의 것을 이어받음 */
    var wxo = null, nightH = null;
    if (!scn && xo && (xo.pilot || xo.pilotDep)) {
      if (cr && cr.sim.pwx) wxo = cr.sim.pwx;
      else {
        var wk = xo.wx || app.wx || 'day'; if (wk === 'rand') wk = ['day', 'night', 'xwind', 'lowvis'][rng.int(0, 3)];
        wxo = { k: wk };
        if (wk === 'night') nightH = (((20 + rng.int(0, 2)) - (D.tz !== undefined ? D.tz : 9)) % 24 + 24) % 24;      /* 현지 20 ~ 22시 */
        if (wk === 'xwind') { var rw0 = D.ends[xo.pilotDep ? D.flows[flow].dep : D.flows[flow].arr]; if (rw0) { wind = { dir: U.n360(Math.round((rw0.crs + (rng() < 0.5 ? 70 : -70)) / 10) * 10) || 360, spd: 22 + rng.int(0, 6) }; wxo.rwy = rw0.id; } }      /* 활주로와 70° — 옆바람 약 19 ~ 24kt(787 실증 옆바람 한계 안) */
        if (wk === 'lowvis') { wind = { dir: wind.dir, spd: Math.min(wind.spd, 8) }; wxo.rvr = 550; wxo.ceil = 300; wxo.vis = [rng() < 0.6, true, true]; }      /* RVR 550m · 구름 밑 300ft(게임 설정) — 첫 접근의 결심 고도에서 보일지는 판마다 */
      }
    }
    var sim = app.sim = scn ? new Cls({ level: lv, seed: scn.seed, flow: scn.flow, wind: scn.wind, qnh: scn.qnh, startHour: scn.hour, scn: scn }) : new Cls({ level: lv, seed: seed, flow: flow, wind: wind, qnh: cr ? cr.sim.qnh : 1005 + rng.int(0, 18), startHour: cr ? cr.sim.utc() / 3600 : xo && xo.real && xo.real.t ? (xo.real.t % 86400) / 3600 :      /* 실제 교통 근무: 자료를 받은 시각(UTC)으로 시작 — 시간대별 SID · 야간 규정도 실제와 맞게 */ nightH !== null ? nightH : xo && xo.pilotDep ? [23, 3, 6.5][rng.int(0, 2)] :      /* 조종사 체험 출발편: 이륙 시각대를 B(08시) · A(12시) · C(15시 반, 현지) 가운데 — 하네다 시간대별 SID */ xo && xo.pilot ? ((8 + rng.int(0, 7) - (D.tz !== undefined ? D.tz : 9)) % 24 + 24) % 24 : 6 + rng.int(0, 9), endless: !!(xo && xo.endless), wx: wxo, apron: !!(xo && xo.apron) });      /* 조종사 체험은 현지 낮(8 ~ 15시) */
    if (xo && xo.daily) sim.sys(ATC.T('오늘의 과제 — 오늘은 누구나 같은 교통 · 같은 날씨로 근무합니다.'), 'info');
    if (xo && xo.real) { var rr = k === 'APP' ? ATC.RT.apply(sim, xo.real) : ATC.RT.applyGround(sim, xo.real); sim.sys(ATC.T('실제 교통 근무 — {0}의 실제 교통으로 시작합니다(도착 {1} · 출발 {2}대, 그 밖의 {3}대는 공역 밖 · 순항 · 지상 등으로 뺌). 교통 데이터: ADSB.lol(ODbL).', ATC.RT.when(rr.t), rr.arr, rr.dep, rr.other + rr.skip.noCs + rr.skip.ground + rr.skip.unknownAl), 'info'); if (xo.realHow === 'cache') sim.sys(ATC.T('새 자료를 받지 못해 마지막으로 받은 자료를 씁니다.'), 'info'); if (Date.now() / 1000 - rr.t > ATC.RT.MAXAGE[xo.realK || '']) sim.sys(ATC.T('자료가 오래되었습니다({0}).', ATC.RT.when(rr.t)), 'info'); if (!rr.arr && !rr.dep) sim.sys(ATC.T('지금 공역 안에 쓸 수 있는 실제 기체가 없어 게임 교통으로 이어갑니다.'), 'info'); }
    if (xo && xo.realFail) sim.sys(xo.realFail === 1 ? ATC.T('실제 교통 자료를 받지 못해 평소 교통으로 시작합니다.') : ATC.T('받은 자료({0})에 쓸 수 있는 기체가 없어 평소 교통으로 시작합니다.', ATC.RT.when(xo.realT)), 'info');
    if (xo && xo.endless) sim.sys(ATC.T('무한 근무 — 교통이 계속 들어오고 점점 늘어납니다. 안전 감점 3번이면 근무가 끝납니다.'), 'info');
    if (cr) { sim.log = cr.sim.log.slice(); sim.incs = cr.sim.incs.slice(); sim.atis = cr.sim.atis; }
    if (xo && xo.pilotDep && ATC.DepPilot) new ATC.DepPilot(sim, { carry: cr, from: xo.from }); else if (xo && xo.pilot) new ATC.Pilot(sim);      /* 조종사 체험: 관제는 AI, 플레이어는 Vela Air 조종사 */
    if (ATC.Cockpit) { if (sim.pilot && ATC.Cockpit.ok && app.ck3d !== false) ATC.Cockpit.open(sim, $('ck3d')); else ATC.Cockpit.close(); }      /* 2단계: 3D 조종석(WebGL이 되면 기본) */
    if (scn) sim.sys(ATC.T('시나리오 {0} 「{1}」 — 목표: {2} · {3}점 이상.', scn.no, scn.title, scn.goal.t, scn.eff), 'info');
    app.pos = POS[k]; app.sel = 0; app.pend = []; app.aq = []; app.paused = false; app.speed = lv === 1 ? Math.min(app.pos.spd, 2) : app.pos.spd; app.coach = scn ? !!scn.coach : lv === 1;   /* 초급은 ×2까지만으로 시작 */ app.gt = null; app.routePrev = null; app.del = {}; app.cmdSig = ''; app.stripSig = ''; app.logN = 0; app.seed = seed; app.over = false; app.recSaved = false;
    $('lobby').hidden = true; $('game').hidden = false; closeModal();
    $('game').className = 'v-' + app.pos.view + ' m-' + app.pos.id + (app.gloss ? '' : ' nogloss'); $('logList').innerHTML = ''; $('banner').className = '';
    var cv = $('cv'); resize();
    if (app.pos.view === 'radar') app.view = R.radarView(k); else if (app.pos.view === 'ground') app.view = R.groundView();
    if (app.view && app.pos.view !== 'del') fitView();
    sim.log.forEach(addLog);
    if (sim.pilot) { app.speed = 1; app.coach = false; app.inst = false; }
    $('game').classList.toggle('pilotm', !!sim.pilot);
    if (!scn && !sim.pilot && !app.guide && !/[?&]auto=/.test(location.search)) handover(sim);      /* 근무 인수인계(시험용 auto 주소에서는 생략) */
    if (app.voice) { ATC.Radio.init(); if (packOn()) { ATC.Radio.loadAll(); if (!ATC.Radio.ready()) { app.paused = true; app.packHold = Date.now(); } packWait(); } }      /* 무선 음성이 다 내려받아질 때까지(최대 25초) 시작을 멈춤 — 첫 호출이 브라우저 기계음으로 나가지 않게 */
    /* 송신이 시작될 때 음성을 틀고, 그 실제 길이만큼 주파수를 점유(글자·소리·항공기 움직임을 맞춤) */
    sim.onTx = function (m) {
      if (m.spoken) return 0.6 * app.speed;      /* 마이크로 이미 말한 관제 송신: 소리 없이 짧게 */
      if (m.who === 'sys' || !app.voice || app.paused) return 0;
      if (m.blocked) { var sq = packOn() && app.speed <= 2 ? ATC.Radio.squeal(m.dur / app.speed) : 0; return sq ? sq * app.speed : 0; }      /* 혼신: 말 대신 삑— 소리 */
      var cs = m.ac ? m.ac.cs : '', e = { who: m.who, text: m.text, cs: cs }, busy = ATC.Radio.playing() || (window.speechSynthesis && speechSynthesis.speaking);
      if (app.speed > 2) {   /* ×4·×8: 시간은 맞추지 않음. 무선이 말하는 중이면 뒤에 줄 세워 이어서 들려줌 — 전에는 그냥 건너뛰어, 지시 바로 뒤의 조종사 복창이 늘 안 들렸음 */
        if (!busy && !app.aq.length) fastPlay(e); else { e.at = Date.now(); app.aq.push(e); if (app.aq.length > 3) app.aq.splice(app.aq[0].who === 'pilot' && app.aq.length > 1 && app.aq[1].who !== 'pilot' ? 1 : 0, 1); }
        return 0;
      }
      if (packOn()) { var real = ATC.Radio.speak(m.text, m.who, cs, app.speed > 1); if (real) return real * app.speed; }
      if (packOn() && !ATC.Radio.diag().err) return ((m.text.split(/\s+/).length * 0.37 + 0.5) / 1.2) * app.speed;      /* 무선 음성 방식: 아직 내려받는 중이거나 녹음에 없는 문장은 기계음 대신 소리 없이 글자만(내려받기에 실패했을 때만 브라우저 음성) */
      /* 표준 음성: 길이를 미리 알 수 없어 넉넉히 잡아 두고, 말이 실제로 끝나는 순간 송신을 닫음 */
      var est = tts(e, function () { if (app.sim === sim && sim.cur === m) m.end = Math.min(m.end, sim.t); });
      if (est < 0) return -est * 1.05 * app.speed;      /* 소리 없이 넘긴 문장 */
      return est * (app.ttsEnds ? 1.7 : 1.05) * app.speed;
    };
    app.instSeen = {}; app.instT = 0; hideInst();
    sim.listeners.push(function (type, d) {
      if (type === 'log') { addLog(d); capPush(d); }
      else if (type === 'inc') { if (d.pts < 0) banner(d.title, d.cat === 'S' ? 'bad' : 'warn'); }
      else if (type === 'notice') { banner(d, 'warn'); }      /* 감점은 아니지만 꼭 봐야 하는 알림(활주로 전환 등) */
      else if (type === 'over') { app.over = true; setTimeout(showResult, 900); }
      else if (type === 'sweep') { }
      else if (type === 'gone') { if (d.id === app.sel) { app.sel = 0; app.pend = []; app.gt = null; app.routePrev = null; } }

    });
    $('cli').hidden = app.pos.view !== 'radar'; $('vBtn').classList.toggle('solo', app.pos.view !== 'radar'); $('vBtn').hidden = app.pos.view === 'ground' || !!(app.sim && app.sim.pilot); app.dockSig = ''; renderDock();      /* 지상 · 관제탑은 위쪽 단추 줄, 조종사 체험은 아래 교신 칸에 마이크 단추 */
    app.follow = false; app.viewTo = null; renderGnav(); if (app.view && app.pos.view === 'ground') fitView();   /* 단추 너비가 정해진 뒤 한 번 더(좁은 화면의 위쪽 띠 높이) */
    renderTop(true); last = 0;
  }
  function resize() {
    var cv = $('cv'), dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      /* 화면 크기가 바뀜(휴대폰 돌리기 · 주소창): 아직 전체 보기 그대로이거나 처음에 크기 0으로 맞춰졌으면 다시 맞춤 */
      if (app.sim && app.view && app.pos && app.pos.view !== 'del' && (app.viewFit || !(app.view.scale > 0))) fitView();
    }
  }
  function fitView() { var cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight; app.viewFit = true; if (!W || !H) return; if (app.pos.view === 'radar') R.fitRadar(app.view, W, H, app.sim.mode); else if (app.pos.view === 'ground') R.fitGround(app.view, W, H); }

  /* ================= 주 반복 ================= */
  var last = 0, accT = 0, uiT = 0;
  /* ×4·×8 음성 줄: 앞의 말이 끝나면 다음 말을 틀고, 8초 넘게 기다린 말은 버림(화면과 너무 어긋나지 않게) */
  function fastPlay(e) { if (!packOn()) return tts(e); if (!ATC.Radio.speak(e.text, e.who, e.cs, true) && ATC.Radio.diag().err) tts(e); }
  function aqPump() {
    if (!app.aq.length) return;
    if (!app.voice || app.paused || app.speed <= 2) { app.aq = []; return; }
    if (ATC.Radio.playing() || (window.speechSynthesis && speechSynthesis.speaking)) return;
    while (app.aq.length) { var e = app.aq.shift(); if (Date.now() - e.at <= 8000) { fastPlay(e); return; } }
  }
  function frame(ts) {
    requestAnimationFrame(frame); aqPump();
    var sim = app.sim; if (!sim || $('game').hidden) { last = ts; return; }
    var dt = last ? Math.min(0.12, (ts - last) / 1000) : 0; last = ts;
    var sab = $('sayAgain'); if (!sab && $('log')) { sab = document.createElement('button'); sab.id = 'sayAgain'; sab.className = 'sayag'; sab.textContent = ATC.T('혼신 — Say again'); sab.title = ATC.T('두 송신이 겹쳤습니다. 다시 송신하게 합니다(명령 줄: SA)'); sab.onclick = function () { if (app.sim) app.sim.sayAgain(); }; var lh = $('log').querySelector('h5'); if (lh) lh.appendChild(sab); }
    if (sab) sab.hidden = !sim.rxBlock;
    var cab = $('coordAck'); if (!cab && $('log')) { cab = document.createElement('button'); cab.id = 'coordAck'; cab.className = 'sayag phoneb'; cab.textContent = ATC.T('☎ 요청 수락'); cab.title = ATC.T('인접 관제석의 요청을 수락합니다(명령 줄: ACK)'); cab.onclick = function () { if (app.sim) app.sim.coordAck(); }; var lh2 = $('log').querySelector('h5'); if (lh2) lh2.appendChild(cab); }
    if (cab) cab.hidden = !(sim.coordAsk && !sim.coordAsk.done);
    if (!app.paused && !sim.over) {
      accT += dt * app.speed; var step = sim.pilot ? 0.1 : app.pos.view === 'radar' ? 0.5 : 0.25, n = 0;
      while (accT >= step && n++ < 60) { sim.tick(step); accT -= step; }
      if (n >= 60) accT = 0;
    }
    moveView(dt);
    if (sim.pilot && ATC.Cockpit && ATC.Cockpit.on) ATC.Cockpit.frame(app.paused ? 0 : dt); else draw();      /* 조종사 체험 3D: 레이더 그리기 대신 3D */
    if (app.inst && !app.paused && !sim.over && sim.coach && ts - app.instT > 5000) instCheck(ts);
    uiT += dt; if (uiT > 0.3) { uiT = 0; renderTop(); renderStrips(); renderCmd(); renderCoach(); renderDock(); if (app.pos.view === 'del') renderDel(); }
  }
  function draw() {
    if (app.pos.view === 'del') return;
    var cv = $('cv'), ctx = cv.getContext('2d'), dpr = window.devicePixelRatio || 1; resize();
    var W = cv.clientWidth, H = cv.clientHeight; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (app.pos.view === 'radar') R.drawRadar(ctx, W, H, app); else R.drawGround(ctx, W, H, app);
    var ht = app.pos.view === 'ground' ? R.hudTop(W, H) : 0; if (ht !== app.hudPx) { app.hudPx = ht; $('scope').style.setProperty('--hud', ht + 'px'); $('banner').style.top = ht ? (ht + 8) + 'px' : ''; }   /* 좁은 화면의 위쪽 띠 높이(알림 띠가 그 아래에 뜨게) */
    if (app.paused && app.instOn) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(0, 0, W, H); }
    else if (app.paused) { ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#fff'; ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(ATC.T('일시 정지'), W / 2, H - 22); ctx.textAlign = 'left'; }
  }

  /* ================= 상단 ================= */
  function renderTop(force) {
    var sim = app.sim, p = app.pos, sc = sim.score();
    var dq = sim.pilot && sim.pilot.dep && sim.pilot.freqNowFq ? sim.pilot : null;      /* 출발편: 지금 맞춘 주파수(구역별 Ground 등) */
    if (sim.apron && D.freq.APN) dq = { freqNowN: D.freq.APN.n, freqNowFq: D.freq.APN.fq };      /* 인천 계류장 관제 */
    $('tPos').innerHTML = '<b>' + (dq && dq.freqNowN ? dq.freqNowN : p.call).toUpperCase() + '</b><span>' + (dq ? dq.freqNowFq : p.fq) + '</span><em>' + (sim.apron ? ATC.T('계류장 관제') : p.ko) + ' · ' + (app.scn ? ATC.T('시나리오 {0}', app.scn.no) : sim.level.ko) + '</em>';
    $('tClock').textContent = U.hhmm(sim.utc()) + ':' + U.pad(Math.floor(sim.utc()) % 60, 2) + ' UTC';
    var rw = sim.mode === 'APP' ? 'ARR ' + sim.rwys.join('/') + ' · DEP ' + (D.depRwyFor && sim.flow.deps ? sim.flow.deps.join('/') : sim.flow.dep) : sim.mode === 'TWR' ? 'LDG ' + sim.arrRw.join('/') + ' · T/O ' + sim.depRw.join('/') : sim.mode === 'ACC' ? (D.accLabel ? D.airport.call.toUpperCase() + ' CONTROL' : 'FIR SEIRA') : sim.multi ? 'ARR ' + sim.flow.arrs.join('/') + ' · DEP ' + sim.flow.deps.join('/') : 'ARR ' + sim.flow.arr + ' · DEP ' + sim.flow.dep;
    if (sim.mode === 'APP' && sim.rwChg && !sim.rwChg.done) rw = 'ARR ' + sim.rwChg.oldR.join('/') + ' → ' + sim.rwChg.newR.join('/') + ' ' + U.hhmm(sim.t0 + sim.rwChg.t1) + 'Z';      /* 활주로 전환 예고 중: 전환 시각을 함께 */
    $('tAtis').innerHTML = '<i>ATIS ' + sim.atis + '</i><span>' + rw + '</span><span>WIND ' + fmt.wind(sim.wind).replace(' at ', '/') + 'KT</span><span>QNH ' + sim.qnh + '</span>' + (sim.pwx && sim.pwx.k === 'lowvis' ? '<span>RVR ' + sim.pwx.rvr + 'M · BKN' + U.pad(Math.round(sim.pwx.ceil / 100), 3) + '</span>' : '');
    var op = $('ops'); if (op) { op.hidden = sim.mode === 'ACC'; if (op.dataset.sig !== $('tAtis').innerHTML) { op.dataset.sig = $('tAtis').innerHTML; op.innerHTML = op.dataset.sig; } }   /* 휴대폰 가로: 위 막대에 자리가 없어 지도 왼쪽 아래에 같은 요약을 둠 */
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
  var banT = 0, pwT = 0;
  /* 무선 음성 묶음을 받는 동안 알림 띠에 진행을 보임(휴대폰에서는 수십 초 걸릴 수 있고, 그동안은 브라우저 음성이라 소리가 안 날 수도 있음) */
  function packWait() {
    clearInterval(pwT); var RD = ATC.Radio, n = 0;
    function tick() {
      var b = $('banner'), d = RD.diag(), busy = b.className.indexOf('show') >= 0 && !b.dataset.pw;
      if (app.packHold && (RD.ready() || d.err || !app.sim || Date.now() - app.packHold > 25000)) { app.packHold = 0; if (app.sim && !app.over && $('modal').hidden && !app.instOn) app.paused = false; }
      if (!app.sim || !app.voice || !packOn() || RD.ready() || d.err || n++ > 600) {
        clearInterval(pwT); if (b.dataset.pw) { delete b.dataset.pw; if (RD.ready() && app.sim) { b.textContent = ATC.T('무선 음성 준비 완료'); b.className = 'show'; setTimeout(function () { if (!b.dataset.pw && b.textContent === ATC.T('무선 음성 준비 완료')) b.className = ''; }, 1500); } else b.className = ''; }
        return;
      }
      if (busy) return;                                   /* 경고가 떠 있는 동안은 그대로 둠 */
      b.dataset.pw = '1'; b.textContent = app.packHold ? ATC.T('무선 음성 내려받는 중 {0} — 준비되면 근무를 시작합니다', d.packs) : ATC.T('무선 음성 내려받는 중 {0} · 관제사 음성부터 준비', d.packs); b.className = 'show';
    }
    if (!RD.ready()) { tick(); pwT = setInterval(tick, 500); }
  }
  function banner(t, cls) { var b = $('banner'); delete b.dataset.pw; b.textContent = '⚠ ' + t; b.className = 'show ' + cls; clearTimeout(banT); banT = setTimeout(function () { b.className = ''; }, 3200); beep(cls === 'bad' ? 520 : 760, 0.18); }

  /* ================= 스트립 ================= */
  function stripBays() {
    var sim = app.sim, a = sim.acs, m = sim.mode, f = function (fn) { return a.filter(fn); };
    if (m === 'APP') return [[ATC.T('핸드오프 대기'), f(function (x) { return x.owner === 'in'; })], [ATC.T('도착'), f(function (x) { return x.kind === 'arr' && x.owner !== 'in'; }).sort(function (x, y) { return distAp(x) - distAp(y); })], [ATC.T('출발'), f(function (x) { return x.kind === 'dep'; })]];
    if (m === 'ACC') return [[ATC.T('핸드오프 대기'), f(function (x) { return x.owner === 'in'; })], [ATC.T('관할 중'), f(function (x) { return x.owner === 'me'; })], [ATC.T('이양 완료'), f(function (x) { return x.owner === 'out'; })]];
    if (m === 'TWR') return [[ATC.T('최종 접근'), f(function (x) { return x.st === 'final'; }).sort(function (x, y) { return x.d - y.d; })], [ATC.T('활주로 · 이륙'), f(function (x) { return x.st === 'lineup' || x.st === 'linedup' || x.st === 'roll' || x.st === 'land' || x.st === 'air' || x.st === 'vacate'; })], [ATC.T('대기 지점 · 횡단'), f(function (x) { return x.st === 'athold' || x.st === 'reqtaxi'; })], [ATC.T('지상 이동(지상관제)'), f(function (x) { return x.st === 'taxi' || x.st === 'gate'; })]];
    if (m === 'GND') return [[ATC.T('요청 대기'), f(function (x) { return x.owner === 'me' && (x.st === 'reqpush' || x.st === 'reqtaxi' || x.st === 'athold'); })], [ATC.T('이동 중'), f(function (x) { return x.owner === 'me' && (x.st === 'push' || x.st === 'start' || x.st === 'taxi'); })], [ATC.T('주기 중(출발 준비)'), f(function (x) { return x.st === 'gate' && !x.parked; })], [ATC.T('관제탑 관할'), f(function (x) { return x.owner === 'twr'; })]];
    return [[ATC.T('허가 요청'), f(function (x) { return x.st === 'req'; })], [ATC.T('복창 확인'), f(function (x) { return x.st === 'rb'; })], [ATC.T('허가 완료 · 출발 준비'), f(function (x) { return x.st === 'cleared' || x.st === 'ready'; })]];
  }
  function distAp(a) { return a.appr && a.appr.loc ? a.appr.d : 30 + U.dist(a, D.center); }
  function stripHtml(a) {
    var sim = app.sim, m = sim.mode, l2 = '', tag = '', s4 = '', cls = (a.kind || 'ovf') + (a.id === app.sel ? ' sel' : '') + (a.emg ? ' emg' : '') + (a.owner === 'in' ? ' inn' : '') + ((a.owner === 'out' || a.owner === 'twr' || a.owner === 'gnd') ? ' dim' : '') + (a.waiting && a.owner === 'me' ? ' wait' : '') + (sim.hasWrong(a.id) ? ' wrong' : '');
    if (m === 'APP' || m === 'ACC') {
      l2 = fmt.alt(a.alt) + (Math.abs(a.alt - a.tAlt) > 150 ? (a.tAlt > a.alt ? '↑' : '↓') + fmt.alt(a.tAlt) : '') + ' · ' + Math.round(a.ias) + 'kt · ' + (a.nav.mode === 'route' ? '→' + a.nav.route[a.nav.i] : a.nav.mode === 'hold' ? 'HOLD ' + a.nav.fix + (a.eat ? ' EAT ' + U.hhmm(a.eat) : '') : a.nav.mode === 'loc' ? 'ILS' : 'H' + fmt.hdg(a.tHdg));
      tag = m === 'APP' ? (a.kind === 'arr' ? (a.appr ? (a.appr.loc ? 'ILS ' + a.appr.rwy + ' ' + a.appr.d.toFixed(0) + 'NM' : 'APP ' + a.appr.rwy) : (a.star || a.gate) + ' ' + a.rwy) : a.sid + ' → ' + a.dest) : (a.kind === 'arr' || a.divert ? ATC.T('도착 {0}', a.gate) : a.kind === 'dep' ? ATC.T('출발 → {0} RFL{1}', a.exitFix, fmt.fl(a.rfl)) : a.fpRoute[0] + '→' + a.exitFix);
      if (a.kind === 'dep' && a.sidR && a.owner !== 'out' && ATC.sidPend(a).length) s4 = '<div class="s4' + (a.sidVia ? '' : ' off') + '">SID ' + esc(ATC.sidPend(a).map(ATC.sidTxt).join(' · ')) + (a.sidVia ? '' : ' — ' + ATC.T('취소')) + '</div>';      /* 남은 SID 고도 제한 */
    } else if (m === 'TWR' || m === 'GND') {
      var stt = { final: (a.d / NM).toFixed(1) + 'NM ' + (a.clr ? ATC.T('착륙 허가 발부') : ATC.T('허가 대기')), land: ATC.T('착륙 활주'), vacate: ATC.T('활주로 이탈 중'), reqtaxi: a.kind === 'arr' ? (app.sim.apron ? ATC.T('계류장 진입 · 경로 요청') : ATC.T('활주로 이탈 · {0}', (m === 'TWR' ? ATC.T('Ground 이양 필요') : ATC.T('경로 요청')))) : (a.tech ? ATC.T('기체 이상 · 복귀 요청') : ATC.T('지상 이동 요청')), taxi: (a.halt ? ATC.T('정지 지시 중') : a.spd < 0.3 && a.blk ? ATC.T('전방 정체') : ATC.T('이동 중')) + (a.hp ? ' → ' + a.hp : a.kind === 'arr' ? ' → ' + a.stand : ''), athold: a.holdKind === 'cross' ? ATC.T('활주로 진입 전 정지 · 횡단 대기') : ATC.T('대기 지점 {0}{1}', a.hp, (m === 'GND' && a.owner === 'me' ? ATC.T(' · Tower 이양 필요') : ATC.T(' · 준비 완료'))), lineup: ATC.T('활주로 진입'), linedup: a.cto ? ATC.T('이륙 활주 시작') : ATC.T('활주로 진입 대기 · 이륙 허가 대기'), roll: ATC.T('이륙 활주'), air: a.goAround ? ATC.T('복행') : ATC.T('이륙 {0}ft', fmt.alt(a.alt)), gate: a.parked ? ATC.T('주기 완료') : ATC.T('주기장 {0}', a.stand), reqpush: ATC.T('푸시백 요청'), push: ATC.T('푸시백 중'), start: ATC.T('엔진 시동 중') }[a.st] || a.st;
      l2 = stt; tag = (a.kind === 'dep' ? 'DEP ' + (a.rwy || '') + ' · ' + (a.dest || '') : ATC.T('ARR {0} · 주기장 {1}', a.rwy, a.stand));
    } else {
      l2 = ATC.T('주기장 {0} · EOBT {1}{2}', a.stand, U.hhmm(a.eobt), (a.ctot ? ' · CTOT ' + U.hhmm(a.ctot) : '')); tag = (a.noFpl ? 'NO FPL' : a.dest + ' · ' + a.gate) + (a.reclear ? ATC.T(' · 재허가') : '');
    }
    return '<div class="strip ' + cls + '" data-id="' + a.id + '"><i style="background:' + a.al.col + '"></i><div class="s1"><b>' + a.cs + '</b><span>' + a.type + '/' + a.wake + '</span><span class="sq">' + a.squawk + '</span></div><div class="s2">' + esc(tag) + '</div><div class="s3">' + esc(l2) + (a.emg ? ' · <u>' + esc(a.emgName || 'EMG') + '</u>' : '') + '</div>' + s4 + '</div>';
  }
  function renderStrips() {
    var bays = stripBays(), h = '';
    bays.forEach(function (b) { h += '<div class="bay' + (b[1].length ? '' : ' empty') + '"><h5>' + b[0] + ' <small>' + b[1].length + '</small></h5>' + b[1].map(stripHtml).join('') + '</div>'; });
    if (h !== app.stripSig) { app.stripSig = h; $('strips').innerHTML = '<button class="smore" id="smA" hidden></button>' + h + '<button class="smore" id="smB" hidden></button>'; stripMore(); }
  }
  /* 목록이 넘칠 때: 고른 스트립을 보이는 자리로 옮기고, 화면 밖에서 기다리는 요청 수를 가장자리에 알림 */
  function stripOut(c) {
    var q = c.getBoundingClientRect(), hz = c.scrollWidth > c.clientWidth + 2, o = { a: [], b: [], hz: hz };
    if (hz || c.scrollHeight > c.clientHeight + 2) Array.prototype.forEach.call(c.querySelectorAll('.strip.wait,.strip.inn'), function (s) {
      var r = s.getBoundingClientRect();
      if (hz ? r.right < q.left + 24 : r.bottom < q.top + 14) o.a.push(s); else if (hz ? r.left > q.right - 24 : r.top > q.bottom - 14) o.b.push(s);
    });
    return o;
  }
  function stripMore() {
    var c = $('strips'), A = $('smA'), B = $('smB'); if (!A || !B) return;
    var o = stripOut(c);
    A.hidden = !o.a.length; B.hidden = !o.b.length; c.classList.toggle('hz', o.hz);
    A.textContent = (o.hz ? '◀ ' : '▲ ') + ATC.T('요청 {0}', o.a.length); B.textContent = ATC.T('요청 {0}', o.b.length) + (o.hz ? ' ▶' : ' ▼');
  }
  function stripShow(s) {
    var c = $('strips'); if (!s) return;
    var r = s.getBoundingClientRect(), q = c.getBoundingClientRect(), hz = c.scrollWidth > c.clientWidth + 2, pad = hz ? (q.width > 340 ? 70 : 10) : 10, pv = !hz && c.scrollHeight > c.clientHeight + 2 && q.height > 90 ? 22 : 8;   /* 가장자리 알림 단추에 가리지 않을 만큼 안쪽으로 */
    if (r.left < q.left + pad) c.scrollLeft -= q.left + pad - r.left; else if (r.right > q.right - pad) c.scrollLeft += r.right - q.right + pad;
    if (r.top < q.top + pv) c.scrollTop -= q.top + pv - r.top; else if (r.bottom > q.bottom - pv) c.scrollTop += r.bottom - q.bottom + pv;
    stripMore();
  }

  /* ================= 지시판 ================= */
  /* 출발기의 상승 지시: SID 고도 제한이 살아 있으면 기본은 「climb via SID to」(제한 유지) — 「via SID」 단추로 끔. 기수와 함께 보내면 경로가 바뀌므로 via를 붙이지 않음.
     직행과 함께는 via를 붙일 수 있음(직행 지점 뒤의 제한 유지 — GPT 18차 F18-04). 직행을 고르면 via는 꺼 두고, 「via SID」 단추로 켬 */
  function altCmd(ac, v, cmds) { var c = { k: 'alt', v: v }, pd = cmds || app.pend; if (ATC.sidCan && ATC.sidCan(ac, v) && ac.sidVia && !pd.some(function (x) { return x.k === 'hdg' || x.k === 'dct'; })) c.via = true; return c; }
  function viaOff(list) { if (list.some(function (x) { return x.k === 'hdg'; })) list.forEach(function (x) { if (x.k === 'alt') delete x.via; }); }
  function addPend(c) { var i; if (c.k === 'hdg' || c.k === 'dct') app.pend.forEach(function (x) { if (x.k === 'alt') delete x.via; }); for (i = 0; i < app.pend.length; i++) if (app.pend[i].k === c.k) { app.pend[i] = c; app.cmdSig = ''; renderCmd(); return; } app.pend.push(c); app.cmdSig = ''; renderCmd(); }
  function sendPend(extra, o) {
    var sim = app.sim, ac = sim.byId(app.sel), cmds = app.pend.concat(extra || []); if (!ac || !cmds.length) return; viaOff(cmds);
    /* 문구 순서: 기수 → 고도 → 속도 → 그 밖 */
    var ord = { atis: 0, amendfl: 1, slot: 2, clr: 3, hdg: 1, dct: 1, alt: 2, xalt: 2, spd: 3, ils: 4, hold: 4, ho: 9 };
    cmds.sort(function (a, b) { return (ord[a.k] === undefined ? 5 : ord[a.k]) - (ord[b.k] === undefined ? 5 : ord[b.k]); });
    sim.command(ac, cmds, o); app.pend = []; app.gt = null; app.routePrev = null; app.cmdSig = ''; resumeInst();
  }
  function now1(c) { var sim = app.sim, ac = sim.byId(app.sel); if (ac) { sim.command(ac, [c]); app.pend = []; app.gt = null; app.routePrev = null; app.cmdSig = ''; resumeInst(); } }
  function B(label, fn, o) { o = o || {}; app.btns.push(fn); return '<button class="cb' + (o.cls ? ' ' + o.cls : '') + '" data-i="' + (app.btns.length - 1) + '"' + (o.dis ? ' disabled' : '') + (o.tip ? ' title="' + esc(o.tip) + '"' : '') + (o.prev !== undefined ? ' data-prev="' + o.prev + '"' : '') + '>' + label + '</button>'; }
  function Gp(title, body, w) { return '<div class="cg"><h6>' + title + '</h6><div class="cgb"' + (w ? ' style="width:' + w + 'px;max-width:' + w + 'px"' : '') + '>' + body + '</div></div>'; }
  function pendHas(k, v) { for (var i = 0; i < app.pend.length; i++) if (app.pend[i].k === k && (v === undefined || app.pend[i].v === v || app.pend[i].fix === v || app.pend[i].rwy === v)) return true; return false; }
  function chipText(c) { var sim = app.sim, ac = sim.byId(app.sel); if (c.k === 'taxi' && c.via) return 'taxi ' + (c.hp || (ac && ac.stand ? 'stand ' + ac.stand : '')) + ' via ' + c.via.join(' ');      /* 보낼 지시 칸: 긴 지상 이동 문구 대신 목적지와 유도로만 */
    if (narrow()) {      /* 휴대폰 세로: 보낼 지시를 줄임말로(칸이 좁아 지시 단추가 가려지던 문제) — 송신하면 교신 기록에 전체 문구가 남음 */
      var sh = { hdg: function () { return (c.dir === 'L' ? ATC.T('좌') : c.dir === 'R' ? ATC.T('우') : '') + ' ' + ATC.T('기수') + ' ' + ('00' + c.v).slice(-3); }, alt: function () { return (ac && c.v < ac.alt ? '↓' : '↑') + ' ' + fmt.alt(c.v) + (c.exp ? ' !' : '') + (c.via ? ' via SID' : ''); }, spd: function () { return c.v ? c.v + 'kt' : ATC.T('속도 해제'); }, dct: function () { return '→ ' + c.fix; }, ils: function () { return 'ILS ' + c.rwy; }, hold: function () { return ATC.T('체공') + ' ' + c.fix; } }[c.k];
      if (sh) return sh().trim();
    }
    return ATC.phrase(sim, ac, [c]).atc.split(', ').slice(1).join(', ').replace(/\.$/, ''); }
  function narrow() { return !!(window.matchMedia && matchMedia('(max-width:900px) and (orientation:portrait)').matches); }

  function renderCmd() {
    if (app.sim.pilot) return renderPilot(app.sim);
    var sim = app.sim, ac = sim.byId(app.sel), m = sim.mode, sig, h = '';
    sig = [app.sel, ac ? [ac.owner, ac.st, ac.waiting, ac.kind, ac.appr ? (ac.appr.loc ? 2 : 1) : 0, sim.hasWrong(ac.id), Math.round((ac.alt || 0) / 1000), ac.halt, ac.clr, ac.cto, ac.holdKind, ac.nav ? ac.nav.mode + (ac.nav.i || 0) : '', ac.tech, ac.noFpl, ac.reclear].join() : '', JSON.stringify(app.pend), JSON.stringify(app.gt), app.routes ? app.routes.length : 0, JSON.stringify(app.del), sim.atis, sim.flow.id, m === 'TWR' || m === 'GND' ? Math.floor(sim.t / 3) : 0].join('|');
    if (sig === app.cmdSig) return; app.cmdSig = sig; app.btns = [];
    if (!ac) { $('cmd').innerHTML = ATC.T('<div class="cnone">항공기를 선택하세요 — 화면의 표적 또는 스트립을 누릅니다.<br><small>노란 점 · 깜박임 = 조종사가 응답을 기다리는 중</small></div>'); return; }
    var head = '<div class="chead"><b style="border-color:' + ac.al.col + '">' + ac.cs + '</b><span>' + ac.csWord + ' ' + ac.num + ' · ' + ac.perf.n + ' · ' + D.wakeName[ac.wake] + ' · ' + ac.al.name + '</span></div>';
    var body = '';
    if (sim.hasWrong(ac.id)) body += ATC.T('<div class="cwrong">복창이 지시와 다릅니다. {0}</div>', B(ATC.T('정정 (Negative)'), function () { sim.correct(ac.id); app.cmdSig = ''; }, { cls: 'red' }));
    if (m === 'APP' || m === 'ACC') body += cmdRadar(ac); else if (m === 'TWR') body += cmdTwr(ac); else if (m === 'GND') body += cmdGnd(ac); else body += cmdDel(ac);
    var chips = app.pend.map(function (c, i) { return '<span class="chip"><span class="ct">' + esc(chipText(c)) + '</span>' + B('×', function () { app.pend.splice(i, 1); app.cmdSig = ''; if (c.k === 'taxi') { app.routePrev = null; } }, { cls: 'x' }) + '</span>'; }).join('');
    var foot = '<div class="cfoot"><div class="chips">' + (chips || ATC.T('<span class="hintt">선택한 지시가 여기에 표시됩니다</span>')) + '</div>' + B(ATC.T('지우기'), function () { app.pend = []; app.gt = null; app.routePrev = null; app.cmdSig = ''; }, { cls: 'ghost', dis: !app.pend.length }) + B(ATC.T('송신 ⏎'), function () { sendPend(); }, { cls: 'send', dis: !app.pend.length }) + '</div>';
    $('cmd').innerHTML = head + '<div class="cbody">' + body + '</div>' + (m === 'DEL' || m === 'TWR' ? '' : foot);
    drawDial();
  }
  /* 출발기의 SID 고도 제한: 「via SID」 단추(고른 상승 지시를 「climb via SID to」로) + 남은 제한 한 줄 */
  function sidRow(ac) {
    if (!ATC.sidPend || ac.kind !== 'dep' || !ac.sidR) return '';
    var pend = ATC.sidPend(ac); if (!pend.length) return '';
    var pa = app.pend.filter(function (x) { return x.k === 'alt'; })[0], on = !!(pa && pa.via), vec = app.pend.some(function (x) { return x.k === 'hdg'; }), list = pend.map(ATC.sidTxt).join(' · ');
    return B('via SID', function () { var q = app.pend.filter(function (x) { return x.k === 'alt'; })[0]; if (!q) return; if (q.via) delete q.via; else if (ATC.sidCan(ac, q.v) && !vec) q.via = true; app.cmdSig = ''; }, { cls: 'ghost' + (on ? ' on' : ''), dis: !pa || vec || !ATC.sidCan(ac, pa.v), tip: ATC.T('켜면 「climb via SID to」(SID 고도 제한을 지키며 상승 — 직행과 함께면 직행 지점 뒤의 제한), 끄면 「climb and maintain」(남은 SID 고도 제한 취소)') }) +
      '<small class="csid' + (ac.sidVia ? '' : ' off') + '">' + esc(ac.sidVia ? ATC.T('SID 제한 유지 중: {0}', list) : ATC.T('SID 제한 취소됨({0}) — 「via SID」로 다시 지키게 할 수 있음', list)) + '</small>';
  }
  function cmdRadar(ac) {
    var sim = app.sim, m = sim.mode, h = '', i, lst, acc = m === 'ACC';
    if (ac.owner === 'in') return ATC.T('{0}<p class="cinfo">수락하면 조종사가 이 주파수로 호출합니다.</p>', Gp(ATC.T('핸드오프'), B(ATC.T('핸드오프 수락 (A)'), function () { sim.accept(ac); app.cmdSig = ''; resumeInst(); }, { cls: 'pri' })));
    if (ac.owner === 'out') return ATC.T('<p class="cinfo">다음 관제석으로 이양한 항공기입니다.</p>');
    /* 조종사 요청 · 보고 응답 */
    if (ac.waiting === 'dctreq') h += Gp(ATC.T('직행 요청 {0}', ac.reqFix), B(ATC.T('직행 승인'), function () { now1({ k: 'dct', fix: ac.reqFix }); }, { cls: 'pri' }) + B(ATC.T('불가 — 현 경로 유지'), function () { now1({ k: 'unable' }); }), 236);
    if (ac.atisOld) h += Gp(ATC.T('새 ATIS'), B(ATC.T('ATIS {0} 통보', ac.atisOld), function () { now1({ k: 'atis', v: ac.atisOld, wind: true }); }), 236);
    if (ac.waiting === 'pirep') h += Gp(ATC.T('난기류 보고'), B(ATC.T('Roger(수신 확인)'), function () { now1({ k: 'ack' }); }, { cls: 'pri' }), 236);
    /* 기수 */
    h += Gp(ATC.T('기수 <small>방위 눈금판을 누르거나 H + 화면</small>'), '<canvas id="dial" width="104" height="104"></canvas><div class="col">' + B(ATC.T('좌선회'), function () { setDir('L'); }, { cls: pendDir() === 'L' ? 'on' : '' }) + B(ATC.T('우선회'), function () { setDir('R'); }, { cls: pendDir() === 'R' ? 'on' : '' }) + B('−10°', function () { nudge(-10); }) + B('+10°', function () { nudge(10); }) + '</div>', 172);
    /* 고도 */
    var alts = [];
    if (!acc && D.arrAlts) alts = (ac.kind === 'arr' ? D.arrAlts : D.depAlts).slice();      /* 공항이 정한 고도 단추(인천 — 낮은 쪽 접근 1,600ft · 상한 FL180) */
    else if (!acc) { if (ac.kind === 'arr') for (i = 3; i <= (D.tmaTop > 19000 ? 13 : 12); i++) alts.push(i * 1000); else alts = D.tmaTop > 19000 ? [7000, 8000, 9000, 10000, 11000, 12000, 13000, 15000, 17000, 19000, 21000, D.tmaTop] : [5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000, 16000, 19000]; }
    else { if (ac.kind === 'arr' || ac.divert) { alts = [13000, 15000, 17000, 19000, 21000, 23000, 25000, 27000, 29000]; var ga = ATC.accAlt(ac); if (alts.indexOf(ga) < 0) { alts.unshift(ga); alts.sort(function (a, b) { return a - b; }); } } else { var base = Math.round(ac.alt / 1000) * 1000; for (i = -5; i <= 5; i++) { var v = base + i * 1000; if (v >= 20000 && v <= Math.min(41000, ac.perf.ceil)) alts.push(v); } if (ac.rfl && alts.indexOf(ac.rfl) < 0) alts.push(ac.rfl); alts.sort(function (a, b) { return a - b; }); } }
    h += Gp(ATC.T('고도'), alts.map(function (v) { var par = acc && v >= 20000 && ac.east !== undefined ? ((Math.round(v / 1000) % 2 === 1) === ac.east ? ' par' : ' npar') : ''; return B(fmt.alt(v), function () { addPend(altCmd(ac, v)); }, { cls: (pendHas('alt', v) ? 'on' : '') + (Math.abs(ac.tAlt - v) < 50 ? ' cur' : '') + par + (v === ac.rfl ? ' rfl' : '') }); }).join('') + B(ATC.T('신속히'), function () { for (var j = 0; j < app.pend.length; j++) if (app.pend[j].k === 'alt') { app.pend[j].exp = !app.pend[j].exp; app.cmdSig = ''; } }, { cls: 'ghost', tip: ATC.T('선택한 고도 변경을 신속히(expedite)') }) + sidRow(ac), 252);
    /* 속도 */
    var sp = acc ? [250, 270, 290] : [160, 170, 180, 190, 200, 210, 220, 230, 250];
    h += Gp(ATC.T('속도'), sp.map(function (v) { return B(v, function () { addPend({ k: 'spd', v: v }); }, { cls: (pendHas('spd', v) ? 'on' : '') + (ac.spdAsg === v ? ' cur' : '') }); }).join('') + B(ATC.T('정상'), function () { addPend({ k: 'spd', v: 0 }); }, { cls: 'ghost' }), 132);
    /* 직행 */
    lst = (ac.nav.mode === 'route' ? ac.nav.route.slice(ac.nav.i) : (ac.fpRoute || []).slice(-2));
    if (D.flyBy) { var named = lst.filter(function (f) { return D.fix[f].k !== 'tt'; }); lst = named.slice(0, 3); named.slice(-2).forEach(function (f) { if (lst.indexOf(f) < 0) lst.push(f); }); }      /* 긴 경로: 이름 있는 지점 가운데 앞의 셋 + 끝의 둘(흐름이 만나는 곳 · 경로 끝) */
    else lst = lst.slice(0, 4);
    if (!acc && ac.kind === 'arr') sim.rwys.forEach(function (r) { var f = D.ends[r].IF; if (lst.indexOf(f) < 0) lst.push(f); });
    if (acc && (ac.kind === 'arr' || ac.divert) && lst.indexOf(ac.gate) < 0) lst.push(ac.gate);
    if (acc && ac.exitFix && lst.indexOf(ac.exitFix) < 0) lst.push(ac.exitFix);
    h += '<div class="cstack">' + Gp(ATC.T('직행 <small>화면의 지점 이름을 눌러도 됨</small>'), lst.map(function (f) { return B(f, function () { addPend({ k: 'dct', fix: f }); }, { cls: pendHas('dct', f) ? 'on' : '' }); }).join(''), 236);
    /* 접근 · 체공 · 이양 */
    var x = '';
    if (!acc && ac.kind === 'arr') { sim.rwys.forEach(function (r) { x += B(ATC.T('ILS {0} 접근 허가', r), function () { addPend({ k: 'ils', rwy: r }); }, { cls: 'wide' + (pendHas('ils', r) ? ' on' : '') }); }); var hf = (ac.fpRoute || [])[ac.fpRoute.length - 1]; if (hf && D.fix[hf].k !== 'if') x += B(ATC.T('체공 {0}', hf), function () { addPend({ k: 'hold', fix: hf }); }, { cls: 'ghost' + (pendHas('hold') ? ' on' : '') }); if (ac.waiting === 'divert' && sim.divertTo) { var dv = sim.divertTo(ac); x += B(ATC.T('회항 허가 → {0}', dv.destName), function () { addPend({ k: 'divert', gate: dv.gate, dest: dv.dest, destName: dv.destName, alt: dv.alt }); }, { cls: 'wide' + (pendHas('divert') ? ' on' : '') }); } }
    if (!acc) x += ac.kind === 'arr' ? B(ATC.T('Tower 이양'), function () { addPend({ k: 'ho', to: 'TWR' }); }, { cls: 'ho' + (pendHas('ho') ? ' on' : '') }) : B(ATC.T('Control 이양'), function () { addPend({ k: 'ho', to: 'ACC' }); }, { cls: 'ho' + (pendHas('ho') ? ' on' : '') });
    else { var ns = sim.nextSector(ac); if (ac.kind === 'arr' && (sim.apClosed || sim.mit) && ac.gate) x += B(ATC.T('체공 {0}', ac.gate), function () { addPend({ k: 'hold', fix: ac.gate }); }, { cls: 'ghost' + (pendHas('hold') ? ' on' : '') }); if (ac.waiting === 'divert' && sim.divertTo) { var dv2 = sim.divertTo(ac); x += B(ATC.T('회항 허가 → {0}', dv2.destName), function () { addPend({ k: 'divert', fix: dv2.fix, dest: dv2.dest, destName: dv2.destName, alt: dv2.alt }); }, { cls: 'wide' + (pendHas('divert') ? ' on' : '') }); } if (ac.kind === 'arr' || ac.divert) x += B(ATC.T('{0} + {1} 직행', fmt.alt(ATC.accAlt(ac)), ac.gate), function () { addPend({ k: 'alt', v: ATC.accAlt(ac) }); addPend({ k: 'dct', fix: ac.gate }); }, { cls: 'wide' }); x += B(ATC.T('{0} 이양', ns.n.replace(D.airport.call + ' ', '')), function () { addPend({ k: 'ho', to: ns }); }, { cls: 'ho' + (pendHas('ho') ? ' on' : '') }); if (ac.waiting === 'lvl') x += B(ATC.T('요청 고도 {0} 승인', fmt.alt(ac.reqLvl)), function () { addPend({ k: 'alt', v: ac.reqLvl }); }, { cls: 'wide' }); if (ac.waiting === 'dev') x += B(ATC.T('회피 기수 승인({0} 25°)', (ac.devSide === 'L' ? ATC.T('좌') : ATC.T('우'))), function () { addPend({ k: 'hdg', v: U.r5(ac.hdg + (ac.devSide === 'L' ? -25 : 25)), dir: ac.devSide }); }, { cls: 'wide' }); }
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
    if (ac.owner !== 'me') return '<p class="cinfo">' + (ac.owner === 'gnd' ? ATC.T('지상관제(자동)가 이동시키는 중입니다.') : ATC.T('다른 관제석으로 이양했습니다.')) + '</p>' + (ac.owner === 'gnd' && ac.kind === 'dep' && sim.coordOn && sim.coordOn() && !sim.relOk(ac) ? Gp(ATC.T('출발 승인(Approach) — 미리 요청'), B(ac.rel === 'req' ? ATC.T('☎ 요청함 — 응답 대기') : ATC.T('☎ 출발 승인 요청'), function () { sim.reqRelease(ac); app.cmdSig = ''; }, { cls: 'wide', dis: ac.rel === 'req' })) : '');
    var busy = sim.rwyBusy(rw, ac), gap = sim.wakeGap(ac, rw);
    if (ac.atisOld) h += Gp(ATC.T('새 ATIS'), B(ATC.T('ATIS {0} 통보', ac.atisOld), function () { now1({ k: 'atis', v: ac.atisOld, wind: true }); }));
    if (ac.kind === 'dep' && sim.coordOn && sim.coordOn() && (ac.st === 'athold' && ac.holdKind === 'dep' || ac.st === 'lineup' || ac.st === 'linedup') && !sim.relOk(ac)) h += Gp(ATC.T('출발 승인(Approach)'), B(ac.rel === 'req' ? ATC.T('☎ 요청함 — 응답 대기') : ATC.T('☎ 출발 승인 요청'), function () { sim.reqRelease(ac); app.cmdSig = ''; }, { cls: 'pri wide', dis: ac.rel === 'req' }));
    else if (ac.kind === 'dep' && ac.rel && ac.rel.t1 && !ac.cto && (ac.st === 'athold' || ac.st === 'lineup' || ac.st === 'linedup')) info += ATC.T('<p class="cinfo">출발 승인 받음 — {0}초 안에 이륙</p>', Math.max(0, Math.round(ac.rel.t1 - sim.t)));
    if (ac.waiting === 'laser') h += Gp(ATC.T('레이저 조사 보고'), B(ATC.T('레이저 보고 확인'), function () { now1({ k: 'laserack' }); }, { cls: 'pri wide' }));
    info = ATC.T('<p class="cinfo">활주로 {0}: {1}{2}{3}</p>', ac.rwy, (sim.rwClosed[rw] > sim.t ? ATC.T('<b class="r">폐쇄 중</b>') : busy ? ATC.T('<b class="r">{0} 사용 중</b>', busy.cs) : ATC.T('<b class="g">비어 있음</b>')), (arr && arr !== ac ? ATC.T(' · 다음 착륙기 {0} {1}NM', arr.cs, (arr.d / NM).toFixed(1)) : ''), (ac.kind === 'dep' && gap > 0 ? ATC.T(' · <b class="y">항적난기류 {0}초</b>', Math.ceil(gap)) : ''));
    if (ac.st === 'final') h += Gp(ATC.T('착륙기 {0}NM', (ac.d / NM).toFixed(1)), B(ATC.T('착륙 허가'), function () { now1({ k: 'ctl', rwy: ac.rwy }); }, { cls: 'pri wide', dis: ac.clr }) + B(ATC.T('접근 계속'), function () { now1({ k: 'cont' }); }) + B(ATC.T('최소 속도'), function () { now1({ k: 'minspd' }); }, { dis: ac.minSpd }) + B(ATC.T('복행'), function () { now1({ k: 'ga' }); }, { cls: 'red' }));
    else if (ac.st === 'athold' && ac.holdKind === 'dep') h += Gp(ATC.T('출발기 · 대기 지점 {0}', ac.hp), B(ATC.T('이륙 허가'), function () { now1({ k: 'cto', rwy: ac.rwy }); }, { cls: 'pri wide' }) + B(ATC.T('활주로 진입 후 대기'), function () { now1({ k: 'luaw', rwy: ac.rwy, at: ac.inter ? ac.hp : null }); }, { cls: 'wide' }) + B(ATC.T('활주로 진입 전 대기'), function () { now1({ k: 'hs', rwy: ac.rwy }); }, { cls: 'ghost' }));
    else if (ac.st === 'lineup' || ac.st === 'linedup') h += Gp(ATC.T('활주로 위'), B(ATC.T('이륙 허가'), function () { now1({ k: 'cto', rwy: ac.rwy }); }, { cls: 'pri wide', dis: ac.cto }) + B(ATC.T('이륙 허가 취소'), function () { now1({ k: 'cancelto' }); }, { cls: 'red', dis: !ac.cto || ac.st === 'roll' }));
    else if (ac.st === 'air') h += Gp(ATC.T('공중'), B(ac.goAround || ac.efato ? ATC.T('Approach 이양') : ATC.T('Departure 이양'), function () { now1({ k: 'ho', to: ac.goAround || ac.efato ? 'APP' : 'DEP' }); }, { cls: 'ho wide' }));
    else if (ac.st === 'reqtaxi') h += Gp(ATC.T('활주로 이탈'), B(ATC.T('Ground 이양'), function () { now1({ k: 'ho', to: 'GND' }); }, { cls: 'ho wide' }));
    else if (ac.st === 'athold' && ac.holdKind === 'cross') { var ar = sim.nextArr(ac.holdRw), bz = sim.rwyBusy(ac.holdRw, ac), er = sim.endOf(ac.holdRw); info = ATC.T('<p class="cinfo">횡단할 활주로 {0}: {1}{2}</p>', er, (bz ? ATC.T('<b class="r">{0} 사용 중</b>', bz.cs) : ATC.T('<b class="g">비어 있음</b>')), (ar ? ATC.T(' · 착륙기 {0} {1}NM', ar.cs, (ar.d / NM).toFixed(1)) : ATC.T(' · 착륙기 없음'))); h += Gp(ATC.T('활주로 횡단'), B(ATC.T('횡단 허가'), function () { now1({ k: 'cross', rwy: er }); }, { cls: 'pri wide' }) + B(ATC.T('계속 대기'), function () { now1({ k: 'hs', rwy: er }); }, { cls: 'ghost' })); }
    else h += ATC.T('<p class="cinfo">현재 발부할 지시가 없습니다({0}).</p>', ({ roll: ATC.T('이륙 활주 중'), land: ATC.T('착륙 활주 중'), vacate: ATC.T('활주로 이탈 중'), taxi: ATC.T('지상 이동 중') }[ac.st] || ac.st));
    return info + h;
  }
  function cmdGnd(ac) {
    var sim = app.sim, h = '', i;
    if (ac.owner !== 'me') return ATC.T('<p class="cinfo">관제탑 관할입니다{0}.</p>', (ac.st === 'final' ? ATC.T(' — 착륙 접근 중 {0}NM, 주기장 {1}', (ac.d / NM).toFixed(1), ac.stand) : ''));
    if (ac.st === 'gate') return ATC.T('<p class="cinfo">주기장 {0} — 아직 호출 전입니다.</p>', ac.stand);
    if (ac.st === 'reqpush') { var sd = D.stands[ac.stand], FN = { north: ATC.T('북'), south: ATC.T('남'), west: ATC.T('서'), east: ATC.T('동') }, f1 = [sd.faces[0], sd.faces[1], FN[sd.faces[0]], FN[sd.faces[1]]], rec = sd.faceRec || sim.flow.push;
      return ATC.T('{0}<p class="cinfo">푸시백 시 주기장 후방 유도로를 약 2분간 점유합니다. 표준 흐름은 기수 {1}쪽입니다.</p>', Gp(ATC.T('푸시백 · 주기장 {0}', ac.stand), B(ATC.T('허가 · 기수 {0}쪽', f1[2]), function () { now1({ k: 'push', face: f1[0] }); }, { cls: 'wide' + (rec === f1[0] ? ' pri' : '') }) + B(ATC.T('허가 · 기수 {0}쪽', f1[3]), function () { now1({ k: 'push', face: f1[1] }); }, { cls: 'wide' + (rec === f1[1] ? ' pri' : '') }) + B(ATC.T('대기 지시'), function () { now1({ k: 'pushhold' }); }, { cls: 'ghost' })), FN[sim.flow.push]); }
    if (ac.st === 'reqtaxi') {
      var dep = ac.kind === 'dep' && !ac.tech, tg = app.gt, holds;
      if (dep && sim.apron) { holds = sim.holdsFor(ac, ac.rwy || sim.depRwy); h += Gp(ATC.T('TCP(관제 이양 지점) — 활주로 {0} 쪽', ac.rwy || sim.depRwy), holds.map(function (hp, ix) { return B(hp + (ix === 0 ? ' <small>' + ATC.T('가장 가까움') + '</small>' : ''), function () { app.gt = { hp: hp }; app.pend = []; app.routePrev = null; app.cmdSig = ''; }, { cls: tg && tg.hp === hp ? 'on' : '' }); }).join('')); }
      else if (dep) { var drw = ac.rwy || sim.depRwy, orw = sim.multi ? (sim.flow.deps.filter(function (r) { return r !== drw; })[0] || sim.flow.arr) : sim.arrRwy; var hl0 = sim.holdsFor(ac, drw), ho0 = sim.holdsFor(ac, orw)[0]; holds = hl0.slice(); if (sim.level.id > 1) holds.push(ho0); h += Gp(ATC.T('목적지 — 대기 지점'), holds.map(function (hp) { var he = D.ends[drw], rem = he.len - D.rwAlong(he, D.gN[D.holds[hp].rnode]);      /* 그 지점에서 이륙할 때 남는 활주로 길이 */
        return B(hp + ' <small>' + (hp === ho0 ? orw : sim.multi && rem < he.len - 30 ? ATC.T('{0} · 남은 길이 {1}m', drw, (Math.floor(rem / 10) * 10).toLocaleString('en-US')) : hp === hl0[0] ? ATC.T('{0} 전체 길이', drw) : ATC.T('{0} 중간 진입', drw)) + '</small>', function () { app.gt = { hp: hp }; app.pend = []; app.routePrev = null; app.cmdSig = ''; }, { cls: tg && tg.hp === hp ? 'on' : '' }); }).join('')); }
      else if (!tg) { app.gt = tg = { stand: ac.stand }; }
      if (tg) {
        var rs = sim.routeOptions(ac, tg); app.routes = rs;
        h += Gp(ATC.T('{0} <small>고르면 지도에 표시</small>', (dep ? ATC.T('경로') : ATC.T('주기장 {0}까지 경로', ac.stand))), rs.map(function (r, ix) { return B(ATC.T('{0} <small>{1}m · 약 {2}분{3}</small>', ((ix === 0 ? ATC.T('표준 ') : '') + r.via.join(' → ')), Math.round(r.len / 10) * 10, Math.max(1, Math.round(r.time / 60)), (r.cross ? ATC.T(' · 활주로 횡단') : '')), function () { var e = D.ends[sim.depRwy]; app.routePrev = r; var c = { k: 'taxi', via: r.via, nodes: r.nodes, len: r.len }; if (tg.hp) { c.hp = tg.hp; c.rwy = sim.rwyOfHold ? sim.rwyOfHold(ac, tg.hp) : sim.apron ? ac.rwy || sim.depRwy : D.gN[D.holds[tg.hp].node].rw === e.rw ? sim.depRwy : sim.arrRwy; } else c.stand = tg.stand; if (r.cross) c.hs = sim.arrRwy; app.pend = []; addPend(c); }, { cls: 'route' + (app.routePrev === r || pendRoute(r) ? ' on' : ''), prev: ix }); }).join('') || ATC.T('<span class="hintt">가능한 경로가 없습니다(폐쇄 구간 확인)</span>'));
      }
      return h;
    }
    if (ac.st === 'push' || ac.st === 'start') return '<p class="cinfo">' + (ac.st === 'push' ? ATC.T('푸시백 중') : ATC.T('엔진 시동 중 — 곧 지상 이동을 요청합니다')) + '.</p>';
    if (ac.st === 'taxi') { h += Gp(ATC.T('이동 중'), (ac.halt ? B(ATC.T('계속 이동'), function () { now1({ k: 'conttaxi' }); }, { cls: 'pri wide' }) : B(ATC.T('정지'), function () { now1({ k: 'holdpos' }); }, { cls: 'red wide' })) + (ac.kind === 'dep' && ac.hp ? B(ATC.T('Tower 이양'), function () { now1({ k: 'ho', to: 'TWR' }); }, { cls: 'ho' }) : '')); return h; }
    if (ac.st === 'athold' && ac.holdKind === 'dep' && sim.apron) return Gp(ATC.T('TCP {0}', ac.hp), B(ATC.T('Ground 이양'), function () { now1({ k: 'ho', to: 'GND' }); }, { cls: 'ho pri wide' }));
    if (ac.st === 'athold' && ac.holdKind === 'dep') return Gp(ATC.T('대기 지점 {0}', ac.hp), B(ATC.T('Tower 이양'), function () { now1({ k: 'ho', to: 'TWR' }); }, { cls: 'ho pri wide' }));
    if (ac.st === 'athold' && ac.holdKind === 'cross') { var ar = sim.nextArr(ac.holdRw), bz = sim.rwyBusy(ac.holdRw, ac); return ATC.T('<p class="cinfo">활주로 {0}: {1}{2}</p>{3}', sim.flow.use[ac.holdRw] || sim.arrRwy, (bz ? ATC.T('<b class="r">{0} 사용 중</b>', bz.cs) : ATC.T('<b class="g">비어 있음</b>')), (ar ? ATC.T(' · 착륙기 {0} {1}NM (약 {2}초)', ar.cs, (ar.d / NM).toFixed(1), Math.round(sim.etaFinal(ar))) : ATC.T(' · 착륙기 없음')), Gp(ATC.T('활주로 횡단(관제탑과 협의)'), (sim.coordOn && sim.coordOn() && !sim.crossOk(ac) ? B(ac.xco === 'req' ? ATC.T('☎ 협조 요청함 — 응답 대기') : ATC.T('☎ 횡단 협조 요청(Tower)'), function () { sim.reqCross(ac); app.cmdSig = ''; }, { cls: 'pri wide', dis: ac.xco === 'req' }) : '') + B(ATC.T('횡단 허가'), function () { now1({ k: 'cross', rwy: sim.arrRwy }); }, { cls: (sim.crossOk && !sim.crossOk(ac) ? '' : 'pri ') + 'wide' }) + B(ATC.T('계속 대기'), function () { now1({ k: 'holdpos' }); }, { cls: 'ghost' }))); }
    return ATC.T('<p class="cinfo">현재 발부할 지시가 없습니다.</p>');
  }
  function pendRoute(r) { for (var i = 0; i < app.pend.length; i++) if (app.pend[i].k === 'taxi' && app.pend[i].nodes === r.nodes) return true; return false; }
  /* 고른 SID에 딸린 transition 이름들(하네다 ROVER 3A → BRUCE · INUBO) */
  function delTrans(sid) { var o = []; if (sid && D.sidTrans && D.sidName) Object.keys(D.sidTrans).forEach(function (g) { if (['A', 'B', 'C'].some(function (k) { return D.sidName(g, k) === sid; })) o = Object.keys(D.sidTrans[g]); }); return o; }      /* ROVER 3A · 4B · 4C 모두 같은 transition */
  function clrCmd(ac, d) { var c = { k: 'clr', destName: ac.destName, sid: d.sid, alt: d.alt, sq: ac.squawk }; if (d.trans) c.trans = d.trans; return c; }
  function cmdDel(ac) {
    var sim = app.sim, d = app.del, h = '';
    if (d.id !== ac.id) { app.del = d = { id: ac.id, sid: null, trans: null, alt: null, atis: false, fl: null, slot: false }; }
    if (ac.st === 'req') {
      if (ac.noFpl) return ATC.T('{0}<p class="cinfo">비행계획이 접수되기 전에는 허가를 발부할 수 없습니다.</p>', Gp(ATC.T('비행계획 없음'), B(ATC.T('대기 · 운항관리 확인 요청'), function () { now1({ k: 'stby', text: 'stand by, flight plan not received, check with your dispatch' }); }, { cls: 'pri wide' })));
      h += Gp(ATC.T('① 사전 확인 <small>필요한 항목만 선택</small>'), B(ATC.T('ATIS {0} 통보', sim.atis), function () { d.atis = !d.atis; app.cmdSig = ''; }, { cls: d.atis ? 'on' : '' }) + B(ATC.T('순항 고도 −1,000'), function () { d.fl = d.fl === -1000 ? null : -1000; app.cmdSig = ''; }, { cls: d.fl === -1000 ? 'on' : '' }) + B(ATC.T('순항 고도 +1,000'), function () { d.fl = d.fl === 1000 ? null : 1000; app.cmdSig = ''; }, { cls: d.fl === 1000 ? 'on' : '' }) + B(ATC.T('CTOT 통보'), function () { d.slot = !d.slot; app.cmdSig = ''; }, { cls: d.slot ? 'on' : '', dis: !ac.ctot }));
      h += Gp('② SID', sim.sidList().map(function (s) { return B(s, function () { d.sid = s; d.trans = null; app.cmdSig = ''; }, { cls: d.sid === s ? 'on' : '' }); }).join(''));
      var tls = delTrans(d.sid);
      if (tls.length) h += Gp(ATC.T('transition <small>비행계획 경로에 맞춰</small>'), tls.map(function (t) { return B(t, function () { d.trans = d.trans === t ? null : t; app.cmdSig = ''; }, { cls: d.trans === t ? 'on' : '' }); }).join(''));
      h += Gp(ATC.T('③ 초기 고도'), (D.sidInit === 6000 ? [5000, 6000, 7000] : [D.sidInit - 2000, D.sidInit, D.sidInit + 2000]).map(function (v) { return B(fmt.alt(v), function () { d.alt = v; app.cmdSig = ''; }, { cls: d.alt === v ? 'on' : '' }); }).join(''));
      h += Gp(ATC.T('④ 송신'), B(ATC.T('허가 송신'), function () { var c = []; if (d.atis) c.push({ k: 'atis', v: sim.atis }); if (d.fl) c.push({ k: 'amendfl', old: ac.rfl, v: ac.rfl + d.fl }); if (d.slot && ac.ctot) c.push({ k: 'slot', v: U.hhmm(ac.ctot), tsat: U.hhmm(ac.tsat) }); c.push(clrCmd(ac, d)); sim.command(ac, c); app.del = {}; app.cmdSig = ''; resumeInst(); }, { cls: 'send wide', dis: !d.sid || !d.alt }));
      return h;
    }
    if (ac.st === 'rb') return ATC.T('{0}<p class="cinfo">허가: {1} · {2} · 스쿼크 {3} — 교신 기록의 복창과 항목별로 대조하세요.</p>', Gp(ATC.T('복창 확인'), B('Readback correct', function () { now1({ k: 'rbok' }); }, { cls: 'pri wide' }) + B(ATC.T('정정 (Negative)'), function () { if (!sim.correct(ac.id)) sim.sys(ATC.T('복창이 허가 내용과 일치합니다 — 정정할 사항이 없습니다.'), 'warn'); app.cmdSig = ''; }, { cls: 'red' })), ac.clr.sid + (ac.clr.trans ? ' · ' + ac.clr.trans + ' transition' : ''), fmt.alt(ac.clr.alt), ac.clr.sq);
    if (ac.st === 'cleared') return ATC.T('<p class="cinfo">허가 완료. 조종사의 준비 완료 보고를 기다립니다{0}.</p>', (ac.ctot ? ' · CTOT ' + U.hhmm(ac.ctot) + ' (TSAT ' + U.hhmm(ac.tsat) + ')' : ''));
    if (ac.st === 'ready') return (ac.ctot ? ATC.T('<p class="cinfo">CTOT {0} · TSAT {1} · 이양 가능 {2}부터(현재 {3})</p>', U.hhmm(ac.ctot), U.hhmm(ac.tsat), U.hhmm(ac.tsat - 300), U.hhmm(sim.utc())) : '') + Gp(ATC.T('출발 준비 완료'), B(ATC.T('Ground 이양'), function () { now1({ k: 'ho', to: 'GND' }); }, { cls: 'ho pri wide' }) + (ac.ctot ? B(ATC.T('시동 시각 안내'), function () { now1({ k: 'slot', v: U.hhmm(ac.ctot), tsat: U.hhmm(ac.tsat) }); }, { cls: 'ghost' }) : ''));
    return '';
  }
  /* 비행허가 가운데 화면: 비행계획 + 참조표 */
  function renderDel() {
    var sim = app.sim, ac = sim.byId(app.sel), h = '<div class="dcol">';
    if (ac) {
      var par = sim.parityOk(ac, ac.rfl);
      h += ATC.T('<div class="fpl"><h4>FLIGHT PLAN <small>비행계획</small></h4>{0}</div>', (ac.noFpl ? ATC.T('<div class="nofpl">NO FLIGHT PLAN RECEIVED<br><small>비행계획 미접수</small></div>') :
        ATC.T('<table><tr><th>CALLSIGN</th><td><b>{0}</b> {1} {2}</td><th>TYPE / WAKE</th><td>{3} / {4}</td></tr><tr><th>DEP</th><td>{icao} · 주기장 {5}</td><th>EOBT</th><td>{6}</td></tr><tr><th>DEST</th><td><b>{7}</b> {8}</td><th>RFL</th><td>{9} <small>(신청 {10})</small></td></tr><tr><th>ROUTE</th><td colspan="3">{11}</td></tr><tr><th>SQUAWK</th><td><b>{12}</b></td><th>CTOT</th><td>{13}</td></tr><tr><th>보고 ATIS</th><td>{14}</td><th>상태</th><td>{15}</td></tr></table>', ac.cs, ac.csWord, ac.num, ac.type, ac.wake, ac.stand, U.hhmm(ac.eobt), ac.dest, ac.destName, fmt.alt(ac.rfl), fmt.alt(ac.rflFiled), ac.route, ac.squawk, (ac.ctot ? '<b class="y">' + U.hhmm(ac.ctot) + '</b> · TSAT ' + U.hhmm(ac.tsat) : '—'), ac.atisRep, ({ req: ac.reclear ? ATC.T('재허가 요청') : ATC.T('허가 요청'), rb: ATC.T('복창 확인 중'), cleared: ATC.T('허가 완료'), ready: ATC.T('출발 준비 완료') }[ac.st] || ''))));
      if (ac.st === 'req' && !ac.noFpl) {
        var d = app.del.id === ac.id ? app.del : {}, pc = [];
        if (d.atis) pc.push({ k: 'atis', v: sim.atis }); if (d.fl) pc.push({ k: 'amendfl', old: ac.rfl, v: ac.rfl + d.fl }); if (d.slot && ac.ctot) pc.push({ k: 'slot', v: U.hhmm(ac.ctot), tsat: U.hhmm(ac.tsat) });
        var pq = { k: 'clr', destName: ac.destName, sid: d.sid || '＿＿＿', alt: d.alt || 0, sq: ac.squawk }; if (d.trans) pq.trans = d.trans; pc.push(pq);
        h += ATC.T('<div class="dref"><h4>송신 문구 미리보기</h4><p class="prev">{0}</p></div>', esc(ATC.phrase(sim, ac, pc).atc).replace('maintain 0,', 'maintain ＿＿＿,'));
      } else if (ac.clr) h += ATC.T('<div class="dref"><h4>발부한 허가</h4><p class="prev">{0} departure · maintain {1} · squawk {2}</p></div>', ac.clr.sid, fmt.alt(ac.clr.alt), ac.clr.sq).replace(' departure · ', ' departure' + (ac.clr.trans ? ', ' + ac.clr.trans + ' transition' : '') + ' · ');
    } else h += ATC.T('<div class="fpl empty">스트립(항공기 목록)에서 항공기를 선택하면 비행계획이 표시됩니다.</div>');
    h += ATC.T('<div class="dref"><h4>현재 조건</h4><p>ATIS <b>{0}</b> · 출발 활주로 <b>{1}</b> · 바람 {2} · QNH {3} · 지금 {4} UTC</p></div></div><div class="dcol">', sim.atis, sim.multi ? sim.flow.deps.join(' · ') : sim.depRwy, fmt.wind(sim.wind), sim.qnh, U.hhmm(sim.utc()));
    var fk = Object.keys(D.flows), gk = Object.keys(D.gateDest), CMP = [ATC.T('북'), ATC.T('북동'), ATC.T('동'), ATC.T('남동'), ATC.T('남'), ATC.T('남서'), ATC.T('서'), ATC.T('북서')];
    if (D.sidName) {      /* SID 이름이 활주로와 상관없는 공항: 출구 지점 → SID 하나, 활주로는 방면에 따라 배정 */
      h += ATC.T('<div class="dref"><h4>SID 참조표</h4><table><tr><th>출구 지점</th><th>방향 · 목적지</th><th>SID</th>{0}<th>순항 고도</th></tr>{1}</table><p>SID는 출구 지점마다 하나이며 활주로가 달라도 명칭이 같습니다. 출발 활주로는 방면에 따라 배정합니다. {2}.</p><p>초기 허가 고도 <b>{3}ft</b>(이 게임에서 정한 값 — 실제로는 편마다 관제가 정합니다) · 출발 주파수 {4} · 지상관제 {5}</p><p>CTOT가 있으면 TSAT = CTOT − 15분, 그 5분 전부터 지상관제로 이양.</p></div></div>',
        fk.map(function (k) { return '<th>' + D.flows[k].label + '</th>'; }).join(''),
        gk.map(function (g) { return '<tr><td><b>' + g + '</b></td><td>' + CMP[Math.round(U.brg(D.center, D.fix[g]) / 45) % 8] + ' — ' + D.gateDest[g].map(function (d) { return d[0]; }).join(' ') + '</td><td>' + (D.sidByRwy && !(sim.flow.depBy || {})[g] ? '—' : D.sidName(g, sim)) + '</td>' + fk.map(function (k) { return '<td>' + (D.sidByRwy ? ((D.flows[k].depBy || {})[g] ? D.flows[k].depBy[g] + ' · ' + D.sidName(g, { flow: D.flows[k] }) : '—') : D.depRwyFor(D.flows[k], g)) + '</td>'; }).join('') + '<td>' + (D.gateEast[g] ? ATC.T('홀수 FL') : ATC.T('짝수 FL')) + '</td></tr>'; }).join(''),
        ATC.T('동쪽행({0})은 홀수, 서쪽행({1})은 짝수 순항 고도', gk.filter(function (g) { return D.gateEast[g]; }).join('·'), gk.filter(function (g) { return !D.gateEast[g]; }).join('·')),
        fmt.alt(D.sidInit), D.freq.DEP.fq, D.freq.GND.fq);
      if (D.sidByRwy) h = h.replace(ATC.T('SID는 출구 지점마다 하나이며 활주로가 달라도 명칭이 같습니다.'), ATC.T('SID 이름은 활주로 방향에 따라 다릅니다(방향 칸에 활주로 · SID, 「—」는 그 방향에 쓰지 않는 출구 지점).'));      /* 인천 */
      h += ATC.T('<div class="dref"><h4>확인 절차</h4><ol class="chk"><li>비행계획이 접수됐는가(NO FPL이면 허가 금지)</li><li>조종사가 보고한 ATIS 식별 문자가 현재 문자와 같은가</li><li>순항 고도(RFL)가 비행 방향에 맞는가</li><li>SID가 비행계획의 출구 지점과 맞는가</li><li>CTOT가 있으면 통보, 이양 시각 확인</li><li>복창을 허가 내용과 대조</li></ol></div></div>');
    } else {
      h += ATC.T('<div class="dref"><h4>SID 참조표</h4><table><tr><th>출구 지점</th><th>방향 · 목적지</th>{0}<th>순항 고도</th></tr>{1}</table><p>{2}. {3}.</p><p>SID 초기 고도 <b>{4}ft</b> · 출발 주파수 {5} · 지상관제 {6}</p><p>CTOT가 있으면 TSAT = CTOT − 15분, 그 5분 전부터 지상관제로 이양.</p></div></div>',
        fk.map(function (k) { return '<th>' + D.flows[k].dep + '</th>'; }).join(''),
        gk.map(function (g) { return '<tr><td><b>' + g + '</b></td><td>' + CMP[Math.round(U.brg(D.center, D.fix[g]) / 45) % 8] + ' — ' + D.gateDest[g].map(function (d) { return d[0]; }).join(' ') + '</td>' + fk.map(function (k) { return '<td>' + g + ' 1' + D.flows[k].sfx + '</td>'; }).join('') + '<td>' + (D.gateEast[g] ? ATC.T('홀수 FL') : ATC.T('짝수 FL')) + '</td></tr>'; }).join(''),
        fk.map(function (k) { return ATC.T('활주로 {0}에서는 1{1}', D.flows[k].dep, D.flows[k].sfx); }).join(', '),
        ATC.T('동쪽행({0})은 홀수, 서쪽행({1})은 짝수 순항 고도', gk.filter(function (g) { return D.gateEast[g]; }).join('·'), gk.filter(function (g) { return !D.gateEast[g]; }).join('·')),
        fmt.alt(D.sidInit), D.freq.DEP.fq, D.freq.GND.fq);
      h += ATC.T('<div class="dref"><h4>확인 절차</h4><ol class="chk"><li>비행계획이 접수됐는가(NO FPL이면 허가 금지)</li><li>조종사가 보고한 ATIS 식별 문자가 현재 문자와 같은가</li><li>순항 고도(RFL)가 비행 방향에 맞는가</li><li>SID가 출구 지점 · 사용 활주로와 맞는가</li><li>CTOT가 있으면 통보, 이양 시각 확인</li><li>복창을 허가 내용과 대조</li></ol></div></div>');
    }
    h = h.replace(ATC.T('</div></div><div class="dref"><h4>확인 절차'), ATC.T('</div><div class="dref"><h4>확인 절차'));
    if (D.sidSet) {      /* 하네다: 이륙 시각에 따른 SID(A · B · C) */
      var sk0 = D.sidSet(sim), rowsK = [['A', ATC.T('2100 ~ 1400UTC(B · C 시간 빼고)')], ['B', '2200 ~ 0230UTC'], ['C', ATC.T('0600 ~ 0900UTC(AIP: 0600 ~ 1000UTC 가운데 약 3시간 — 게임값)')]];
      h = h.replace(/<\/div><\/div>$/, '</div><div class="dref"><h4>' + ATC.T('시간대별 SID') + '</h4><table><tr><th>' + ATC.T('시간대') + '</th><th>' + ATC.T('이륙 시각') + '</th><th>ROVER</th><th>BEKLA</th><th>GUSRO</th></tr>' + rowsK.map(function (r) { return '<tr' + (r[0] === sk0 ? ' class="on"' : '') + '><td><b>' + r[0] + '</b>' + (r[0] === sk0 ? ' ◀' : '') + '</td><td>' + r[1] + '</td><td>' + D.sidName('ROVER', r[0]) + '</td><td>' + D.sidName('BEKLA', r[0]) + '</td><td>' + D.sidName('GUSRO', r[0]) + '</td></tr>'; }).join('') + '</table><p>' + ATC.T('ROVER · BEKLA · TIARA(GUSRO)로 나가는 편은 이륙 시각에 따라 SID가 바뀝니다(AIP RJTT AD2.20 1.3(2)). B · C는 소음 대책 SID — 경로가 A와 다릅니다. 이 게임은 지금 시각 + 10분(이륙 예정)으로 고릅니다. NINOX · LAXAS는 늘 같음.') + '</p></div></div>');
    }
    if (D.sidTrans && D.sidName) Object.keys(D.sidTrans).forEach(function (g) {      /* transition이 딸린 SID: 비행계획 경로를 보고 고름 */
      var ts = Object.keys(D.sidTrans[g]); if (!ts.length) return;
      h = h.replace(/<\/div><\/div>$/, '</div><div class="dref"><h4>transition</h4><p>' + ATC.T('{0}에는 transition이 붙습니다 — 비행계획의 ROUTE를 보고 고릅니다: {1}. 허가에서는 SID 바로 뒤에 말합니다(「{0} departure, {2} transition, flight planned route」).', D.sidName(g, sim), ts.map(function (t) { return '「' + g + ' ' + (D.sidTrans[g][t].fpl || t) + '」 → <b>' + t + '</b>'; }).join(' · '), ts[0]) + ' ' + ATC.T('ROUTE 칸은 게임용 경로 요약입니다 — 정식 비행계획(ICAO FPL)의 경로 표기와 같지 않습니다.') + '</p></div></div>');
    });
    if (h !== app.delSig) { app.delSig = h; $('delview').innerHTML = h; }
  }

  /* ================= 교신 기록 · 코치 ================= */
  function addLog(e) {
    var el = document.createElement('div'), sim = app.sim; el.className = 'lg ' + e.who + (e.kind ? ' ' + e.kind : '') + (e.wrong ? ' rbw' : '');
    var who = e.who === 'atc' ? (app.sim && app.sim.apron ? 'APN' : app.pos.id) : e.who === 'pilot' ? e.cs : e.who === 'phone' ? '☎ ' + e.cs : ATC.T('알림');
    var ko = e.who !== 'sys' && e.who !== 'phone' && !e.blocked && ATC.gloss ? ATC.gloss(e.text) : '';
    el.innerHTML = '<time>' + U.hhmm(e.utc) + '</time><b>' + who + '</b><span>' + esc(e.text) + (ko && ko !== e.text ? '<em class="ko">' + esc(ko) + '</em>' : '') + '</span>' + (e.wrong ? ATC.T('<button class="fixb" data-fix="{0}">정정</button>', e.ac) : '');
    if (e.ac) el.dataset.ac = e.ac;
    var box = $('logList'); box.appendChild(el); while (box.children.length > 160) box.removeChild(box.firstChild); box.scrollTop = box.scrollHeight;
  }
  function renderCoach() {
    if (app.sim.pilot && app.sim.pilot.dep) { var pgd = (app.sim.mode === 'APP' || app.sim.mode === 'ACC' ? '<div class="cgrp"><h5>' + ATC.T('조종사 체험 출발 — 하늘에서 하는 일') + '</h5><ol class="pguide"><li>' + ATC.T('Departure 첫 호출: 지나는 고도 · 허가 고도 · SID') + '</li><li>' + ATC.T('가속 높이부터 가속 — 속도가 붙는 대로 플랩 1 → UP, 그 뒤 250kt') + '</li><li>' + ATC.T('Departure가 처음 레이더로 식별하면 「radar contact」 — 이미 식별된 채 넘겨받는 {aptEn} Control은 다시 말하지 않음') + '</li><li>' + ATC.T('상승 지시 복창 → 「제한 유지 / 취소」 고르기 → MCP 고도에 설정(설정해야 올라감)') + '</li><li>' + ATC.T('「climb via SID to」 = SID 고도 제한을 지키며 상승. 「climb and maintain」(새 고도)이나 기수 · 직행 지시 = 남은 제한 모두 취소(AIP ENR 1.5)') + '</li><li>' + ATC.T('「이하」 · 「그 고도」 제한(SPOON FL150 이하, LEWIS · SILVA FL170)에서는 VNAV가 잠깐 수평 비행 — 지나면 허가 고도까지 다시 상승') + '</li><li>' + ATC.T('250kt 제한은 접근관제구 안 10,000ft 미만(지시 속도) — 관제가 따로 속도를 주면 그 지시가 먼저') + '</li><li>' + ATC.T('「contact {aptEn} Control」 복창 → 주파수 → 첫 호출(지나는 고도 · 허가 고도 · 요청 순항 고도)') + '</li><li>' + ATC.T('순항 고도에 오르면 체험 끝 — 길면 ×4 · ×8로') + '</li></ol></div>' : app.sim.mode === 'TWR' ? '<div class="cgrp"><h5>' + ATC.T('조종사 체험 출발 — 이륙에서 하는 일') + '</h5><ol class="pguide"><li>' + ATC.T('Tower에 「ready for departure」 보고(대기 지점 · 활주로)') + '</li><li>' + ATC.T('「line up and wait」는 활주로에 들어가 기다리라는 뜻 — 이륙 허가가 아님') + '</li><li>' + ATC.T('「cleared for takeoff」 복창(활주로 번호) → 정렬 확인 → 이륙 추력(TO/GA)') + '</li><li>' + ATC.T('SID 첫 구간: 정해진 기수 방위로 500 · 700ft 이상까지 오른 뒤 첫 지점으로(LNAV가 따라감) — 그 전에 돌지 않음') + '</li><li>' + ATC.T('V1 · Rotate 뒤 떠오르면 「Positive rate」 → 기어 올림') + '</li><li>' + ATC.T('400ft 지나 자동조종(A/P) — LNAV · VNAV는 이륙 전에 걸어 둔 모드. 가속 높이부터 가속하며 플랩 1 → UP(높이 · 속도는 게임값)') + '</li><li>' + ATC.T('직접 이륙(선택, 3D 조종석에서 Z — 피치 조작만 체험): VR에서 부드럽게 기수를 들고(게임 목표 초당 약 2.5°, 바퀴가 닿은 채 10°를 넘기지 않게), 떠오르면 기수 약 15°로 V2+15kt, 400ft 지나 자동조종. 자홍색 막대는 게임 도움 표시(실제 FD와 다름)') + '</li><li>' + ATC.T('「contact Departure」 복창 → 불러 준 주파수로 바꾸기') + '</li></ol></div>' : app.sim.mode === 'GND' ? '<div class="cgrp"><h5>' + ATC.T('조종사 체험 출발 — 지상에서 하는 일') + '</h5><ol class="pguide"><li>' + ATC.T('Ground에 푸시백 요청(주기장 · ATIS)') + '</li><li>' + ATC.T('「pushback approved」 복창 — 기수 방향까지. 엔진 시동 · 지상 이동 허가는 아님') + '</li><li>' + ATC.T('주차 브레이크 풀기 → 푸시백 중 엔진 시동 → 플랩 5') + '</li><li>' + ATC.T('지상 이동 요청 → 경로 · 대기 지점 · 활주로 복창') + '</li><li>' + ATC.T('「hold short of runway」가 붙으면 그 활주로 앞에서 정지 — 「cross runway」를 받아야 건넘. 허가 시점은 관제가 활주로 사용 상황을 보고 정함') + '</li><li>' + ATC.T('대기 지점 도착 보고 → 「contact Tower」 복창 → 불러 준 주파수로 바꾸기(Tower 주파수는 여럿 — 늘 지시받은 값)') + '</li></ol></div>' : '<div class="cgrp"><h5>' + ATC.T('조종사 체험 출발 — 하는 일') + '</h5><ol class="pguide"><li>' + ATC.T('비행계획 확인(SID · 목적지 · 순항 고도) → 「비행계획 확정」. SID 카드에서 지점별 고도 제한과 transition을 미리 봄') + '</li><li>' + ATC.T('Delivery에 허가 요청(주기장 · ATIS · 목적지)') + '</li><li>' + ATC.T('허가 복창 — 목적지 · SID(+ transition) · 고도({0}ft는 게임값) · 스쿼크', ATC.fmt.alt(D.sidInit || 9000).replace(/^FL/, '')) + '</li><li>' + ATC.T('트랜스폰더에 스쿼크 네 자리 넣기') + '</li><li>' + ATC.T('준비 완료 보고 → 「contact Ground」 복창 → 주파수 바꾸기') + '</li></ol></div>') + '<div class="cgrp"><h5>' + ATC.T('이 체험의 범위') + '</h5><p class="pscope">' + depScope() + '</p></div>'; if (pgd !== app.coachSig) { app.coachSig = pgd; $('coach').innerHTML = pgd; } return; }
    if (app.sim.pilot) { var pg = '<div class="cgrp"><h5>' + ATC.T('조종사 체험 — 하는 일') + '</h5><ol class="pguide"><li>' + ATC.T('주파수에 들어오면 첫 호출(호출부호 · 고도 · ATIS)') + '</li><li>' + ATC.T('관제 지시를 끝까지 듣고 바로 복창') + '</li><li>' + ATC.T('복창한 대로 자동조종(MCP)에 설정 — 노란 칸이 설정할 지시') + '</li><li>' + ATC.T('허가 없이 기수 · 고도를 바꾸지 않기, ILS는 접근 허가를 받은 뒤') + '</li><li>' + ATC.T('「contact Tower」 → 복창 → 주파수 바꾸기 → 관제탑 첫 호출') + '</li><li>' + ATC.T('복행(TO/GA · G 키): 최종 접근 중 언제든 — 「플랩 20」 → 상승 확인(Positive rate) 뒤 「기어 올림」 → 관제에 「going around」 보고 → 「contact Approach」 복창 · 주파수 → 다시 유도받아 재접근. Approach가 기수를 줄 때까지 공시 복행 절차를 따라감') + '</li><li>' + ATC.T('중급 이상에서는 관제탑이 「go around」를 지시할 수 있음 — 바로 복창하고 TO/GA') + '</li>' + (app.sim.pwx && app.sim.pwx.k === 'lowvis' ? '<li>' + ATC.T('저시정: 결심 고도(DA — 게임은 활주로 높이 +200ft) 「Minimums」에서 진입등이나 활주로가 보이면 LANDING(D), 보이지 않으면 GO AROUND(G) — 4초 안에') + '</li>' : app.sim.pwx && app.sim.pwx.k === 'xwind' ? '<li>' + ATC.T('옆바람: 자동조종은 기수를 바람 쪽으로 틀어(크랩) 접근. 직접 착륙이라면 접지 직전 러더(Q · E · 화면 러더 버튼)로 기수를 활주로 방향에 맞춤(디크랩)') + '</li>' : '') + '</ol></div>'; if (pg !== app.coachSig) { app.coachSig = pg; $('coach').innerHTML = pg; } return; }
    var sim = app.sim, h = '', list = [];
    sim.acs.forEach(function (a) { if (a.waiting && (a.owner === 'me' || a.owner === 'in' || sim.mode === 'DEL')) list.push(a); });
    var al = sim.alerts || { ca: [], stca: [], msaw: [] };
    al.ca.forEach(function (p) { h += ATC.T('<div class="al bad" data-id="{0}">분리 상실 {1} · {2}</div>', p[0].id, p[0].cs, p[1].cs); });
    al.stca.forEach(function (p) { h += ATC.T('<div class="al warn" data-id="{0}">근접 경고 {1} · {2}</div>', p[0].id, p[0].cs, p[1].cs); });
    al.msaw.forEach(function (a) { h += ATC.T('<div class="al bad" data-id="{0}">최저고도 경고 {1}</div>', a.id, a.cs); });
    if (app.coach && sim.coach) { var c = sim.coach(); h += ATC.T('<h5>코치</h5>{0}', (c.length ? c.map(function (x) { return '<div class="co" data-id="' + x.ac + '">' + esc(x.t) + '</div>'; }).join('') : ATC.T('<div class="co none">현재 필요한 조치가 없습니다.</div>'))); }
    else { h += ATC.T('<h5>응답 대기 <small>{0}</small></h5>{1}', list.length, (list.length ? list.slice(0, 7).map(function (a) { return '<div class="co" data-id="' + a.id + '">' + a.cs + ' — ' + ({ checkin: ATC.T('호출(응답 필요 없음, 지시 가능)'), tower: ATC.T('Tower 이양 대기'), ho: ATC.T('이양 요청'), climb: ATC.T('상승 요청'), desc: ATC.T('강하 요청'), lvl: ATC.T('고도 변경 요청'), dev: ATC.T('악기상 회피 요청'), dct: ATC.T('직행 요청'), emg: ATC.T('비상'), missed: ATC.T('복행 — 재유도'), vector: ATC.T('유도 요청'), hold: ATC.T('체공 중'), appr: ATC.T('접근 허가 요청'), land: ATC.T('착륙 허가 대기'), dep: ATC.T('이륙 준비 완료'), cto: ATC.T('이륙 허가 대기'), gnd: ATC.T('Ground 이양 대기'), cross: ATC.T('횡단 대기'), gaho: ATC.T('복행 — 이양 대기'), dep2: ATC.T('Departure 이양 대기'), push: ATC.T('푸시백 요청'), taxi: ATC.T('지상 이동 요청'), twr: ATC.T('Tower 이양 대기'), clr: ATC.T('허가 요청'), rb: ATC.T('복창 확인'), dctreq: ATC.T('직행 요청'), eat: ATC.T('예상 접근 시각 요청'), divert: ATC.T('회항 요청'), pirep: ATC.T('난기류 보고'), laser: ATC.T('레이저 보고'), efato: ATC.T('비상') }[a.waiting] || a.waiting) + '</div>'; }).join('') : ATC.T('<div class="co none">없음</div>'))); }
    if (h !== app.coachSig) { app.coachSig = h; $('coach').innerHTML = h; }
  }

  /* ================= 입력 ================= */
  function select(id) { if (app.sel !== id) { app.sel = id; app.pend = []; app.gt = null; app.routePrev = null; app.del = {}; } app.cmdSig = ''; app.stripSig = ''; renderCmd(); renderStrips(); stripShow($('strips').querySelector('.strip.sel')); if (app.pos.view === 'del') renderDel(); }
  function hitTest(x, y) { var i, hbest = 0, bd = 1e9; for (i = app.hit.length - 1; i >= 0; i--) { var h = app.hit[i]; if (x >= h.x0 && x <= h.x1 && y >= h.y0 && y <= h.y1) return h.id; var d = Math.hypot(x - h.px, y - h.py); if (d < (h.r || 11) && d < bd) { bd = d; hbest = h.id; } } return hbest; }
  function fixAt(x, y) { var best = null, bd = 16; Object.keys(D.fix).forEach(function (n) { var f = D.fix[n]; if (f._sx === undefined) return; var d = Math.hypot(x - (f._sx + 20), y - (f._sy - 4)); if (Math.hypot(x - f._sx, y - f._sy) < 9) d = 0; if (d < bd) { bd = d; best = n; } }); return best; }
  /* ---- 화면 이동 · 확대(단추 · 휠 · 두 손가락 · 작은 지도 · 따라가기 공용) ---- */
  /* 조종사 체험 출발편의 범위 안내(GPT 16차 R16-04) */
  function depScope() { return ATC.T('교신과 기본 조작 순서를 익히는 체험입니다. SID의 지점별 고도 제한 · 이륙 직후 구간 · transition(ROVER)은 AIP대로 넣었습니다(이 SID들에는 지점별 속도 제한이 없음). 재현하지 않는 것: 시간대에 따라 바뀌는 B · C SID, 상승경사 계산, 관제 근무 화면의 SID 제한. 9,000ft · FL240 상승 허가, 이양 · 가속 높이, V 속도 · 플랩 속도, 상승률은 게임에서 정한 값입니다. 일본에서는 비행 중 새 고도 · 경로 지시가 SID 고도 제한을 모두 취소하고, 「climb via SID to」는 제한을 지키며 오르라는 뜻입니다(AIP ENR 1.5).'); }
  /* SID 카드: 이륙 직후 구간 · 지점 차례 · 고도 제한(≥ 이상 · ≤ 이하 · 숫자만 = 그 고도) · transition. live = 하늘 단계(통과 결과 · VNAV 상태) */
  function sidCard(p, live) {
    if (!p.sidView) return ''; var v = p.sidView(); if (!v.any && !v.leg) return '';
    var RT = ATC.DepPilot.rTxt, lg = v.leg, tw = { R: ATC.T('우선회 '), L: ATC.T('좌선회 ') }, sec = v.fixes[1] && !v.fixes[1].tr ? v.fixes[1].n : '';
    var legT = lg ? ATC.T('HDG {0}° 유지 · {1}ft 이상 도달 후', U.pad(lg.hdg, 3), lg.alt) + ' → ' + (tw[lg.turn] || '') + v.first + (D.flyOver && D.flyOver[v.first] && sec ? ATC.T('(상공 통과) → 우선회 {0}', sec) : '') + (lg.grad ? ' · ' + ATC.T('{0}ft까지 최소 상승경사 {1}%(고도는 해수면 기준)', lg.alt, lg.grad.toFixed(1)) : '') : '';      /* GPT 18차 R18-04 */
    var ST = { ok: ['ok', '✔'], x: ['x', ATC.T('취소')], clr: ['m', ATC.T('허가 고도')], low: ['ng', '✖'], high: ['ng', '✖'], skip: ['x', '—'] }, trd = false;
    var chips = v.fixes.map(function (f) {
      var r = f.r, h = '';
      if (f.tr && !trd) { trd = true; h = '<em>' + esc(v.trans) + ' transition</em>'; }
      var st = r && r.st ? ST[r.st] : null, cls = 'f' + (r ? ' r' : '') + (st ? ' ' + st[0] : '') + (live && v.next === f.n ? ' nx' : '') + (live && r && !r.st && !v.via ? ' x' : '');
      return h + '<span class="' + cls + '">' + f.n + (r ? ' <i>' + RT(r) + '</i>' : '') + (st ? ' <u>' + (r.at !== undefined ? fmt.alt(r.at) + ' ' : '') + st[1] + '</u>' : '') + '</span>';
    }).join('');
    var stat = '';
    if (live && p.sidPend().length) stat = '<div class="pss"><span class="' + (v.via ? 'on' : 'off') + '">' + (v.via ? ATC.T('고도 제한: 유지') : ATC.T('고도 제한: 취소됨')) + '</span>' + (v.cap ? '<span class="cap">' + ATC.T('VNAV {0} — {1}까지', fmt.alt(v.cap.v), v.cap.fix) + '</span>' : '') + (v.pred && v.via ? '<span class="' + (v.pred.low ? 'ng' : '') + '">' + ATC.T('{0} 예상 {1}', v.pred.fix, fmt.alt(v.pred.alt)) + '</span>' : '') + '</div>';
    return '<div class="psid"><div class="psh"><b>' + esc(v.sid) + '</b> RWY ' + esc(v.rwy) + (v.sidK && v.sidK !== 'A' && /[BC]$/.test(v.sid) ? ' <em class="psk">' + esc(v.sidK === 'B' ? ATC.T('B 시간대 · 소음 대책 SID') : ATC.T('C 시간대 · 소음 대책 SID')) + '</em>' : '') + (legT ? ' <small>' + esc(legT) + '</small>' : '') + '</div><div class="psf">' + chips + '</div>' + stat + (live ? '' : '<small class="psl">' + ATC.T('≥ 이상 · ≤ 이하 · 숫자만 = 그 고도(AIP SID 고도 제한). 허가 고도(지금 {0})보다 위의 제한은 상승 허가를 받아야 지킬 수 있습니다.', fmt.alt(p.cur && p.cur.alt || D.sidInit)) + '</small>') + '</div>';
  }
  function toWorld(sx, sy) { var cv = $('cv'), v = app.view; if (app.pos.view === 'radar') { var w = R.radarToWorld(v, cv.clientWidth, cv.clientHeight, sx, sy); return { a: w.x, b: w.y }; } var g = R.groundToUV(v, cv.clientWidth, cv.clientHeight, sx, sy); return { a: g.u, b: g.v }; }
  function shiftView(da, db) { var v = app.view; if (app.pos.view === 'radar') { v.cx += da; v.cy += db; } else { v.cu += da; v.cv += db; } }
  function zoomAt(ns, sx, sy) { app.viewFit = false; var v = app.view, w0 = toWorld(sx, sy); v.scale = U.clamp(ns, v.min, v.max); var w1 = toWorld(sx, sy); shiftView(w0.a - w1.a, w0.b - w1.b); }
  function stopAuto() { app.viewTo = null; app.viewFit = false; if (app.follow) { app.follow = false; renderGnav(); } }
  function moveView(dt) {
    var v = app.view; if (!v || app.pos.view !== 'ground') return; var f = 1 - Math.exp(-dt * 6), t = app.viewTo;
    if (t) { v.cu += (t.cu - v.cu) * f; v.cv += (t.cv - v.cv) * f; v.scale *= Math.pow(t.scale / v.scale, f); if (Math.abs(t.cu - v.cu) * v.scale < 0.6 && Math.abs(t.cv - v.cv) * v.scale < 0.6 && Math.abs(t.scale / v.scale - 1) < 0.004) { v.cu = t.cu; v.cv = t.cv; v.scale = t.scale; app.viewTo = null; } }
    if (app.follow) { var ac = app.sim.byId(app.sel), B = D.sat && D.sat.img ? D.sat : null; if (ac && ac.u !== undefined && ac.st !== 'air' && (!B || ac.u > B.u1 - 800 && ac.u < B.u2 + 800 && ac.v > B.v1 - 800 && ac.v < B.v2 + 800)) { var g = 1 - Math.exp(-dt * 3); v.cu += (ac.u - v.cu) * g; v.cv += (ac.v - v.cv) * g; if (t) { t.cu = v.cu; t.cv = v.cv; } } }
  }
  function goArea(b) { var cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight; app.follow = false; app.viewFit = false; app.viewTo = R.fitBox(W, H, [b[0] - 60, b[1] - 60, b[2] + 60, b[3] + 60]); app.viewTo.scale = U.clamp(app.viewTo.scale, app.view.min, app.view.max); renderGnav(); }
  function zoomBtn(k) { if (!app.view) return; var cv = $('cv');      /* 비행허가처럼 지도가 없는 화면에서는 아무 일 없음(예전: 오류) */ app.viewTo = null; zoomAt(app.view.scale * k, cv.clientWidth / 2, cv.clientHeight / 2); }   /* 화면 가운데 기준(따라가기는 그대로) */
  function setFollow(on) {
    if (!app.view) return;
    app.follow = on; app.viewTo = null; if (on) app.viewFit = false; var cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    if (on && app.view.scale < R.fitScale(W, H) * 2.2) app.viewTo = { cu: app.view.cu, cv: app.view.cv, scale: U.clamp(Math.min(W, H) / 1300, app.view.min, app.view.max) };   /* 전체 보기 상태면 1.3km 범위로 다가감 */
    renderGnav();
  }
  function renderGnav() {
    var el = $('gnav'); if (!el) return; var g = app.pos && app.pos.view === 'ground', r = app.pos && app.pos.view === 'radar'; el.hidden = !(g || r); if (el.hidden) return;
    var h = '<button class="zm" data-z="in" title="' + ATC.T('확대 (+)') + '">+</button><button class="zm" data-z="out" title="' + ATC.T('축소 (-)') + '">−</button><button class="zm fitb" data-z="fit" title="' + ATC.T('전체 보기 (F)') + '">⤢</button>';
    if (g) {
      if (D.areas && $('cv').clientWidth < 760) h += '<select data-areas="1" aria-label="' + ATC.T('구역') + '"><option value="">' + ATC.T('구역 ▾') + '</option>' + D.areas.map(function (a, i) { return '<option value="' + i + '">' + esc(a.label) + '</option>'; }).join('') + '</select>';   /* 좁은 화면은 고르기 칸 하나로 */
      else (D.areas || []).forEach(function (a, i) { h += '<button data-area="' + i + '">' + esc(a.label) + '</button>'; });
      h += '<button data-g="follow" class="' + (app.follow ? 'on' : '') + '" title="' + ATC.T('선택한 항공기를 화면 중앙에 두고 추적합니다 (G)') + '">' + ATC.T('추적') + '</button>' + vdB('gvd');
    }
    el.innerHTML = h;
  }
  function bindGnav() {
    $('gnav').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !app.sim) return;
      if (b.dataset.z === 'fit') fit(); else if (b.dataset.z) zoomBtn(b.dataset.z === 'in' ? 1.4 : 1 / 1.4);
      else if (b.dataset.area) goArea(D.areas[+b.dataset.area].box);
      else if (b.dataset.g === 'follow') setFollow(!app.follow);
    });
    $('gnav').addEventListener('change', function (e) { var s = e.target; if (!s.dataset.areas || s.value === '' || !app.sim) return; goArea(D.areas[+s.value].box); s.value = ''; });
  }
  function bindCanvas() {
    var cv = $('cv'), down = null, moved = false, pts = {}, pinch = null, mini = false;
    function npts() { return Object.keys(pts).length; }
    function miniGo(x, y) { var m = R.miniBox, g = m.toUV(x, y); stopAuto(); app.view.cu = g.u; app.view.cv = g.v; }
    cv.addEventListener('pointerdown', function (e) {
      pts[e.pointerId] = { x: e.offsetX, y: e.offsetY }; cv.setPointerCapture(e.pointerId);
      if (npts() === 2) { var P = Object.keys(pts).map(function (k) { return pts[k]; }), mx = (P[0].x + P[1].x) / 2, my = (P[0].y + P[1].y) / 2; pinch = { d: Math.hypot(P[0].x - P[1].x, P[0].y - P[1].y) || 1, s: app.view.scale, w: toWorld(mx, my) }; down = null; mini = false; stopAuto(); return; }
      if (npts() > 2) return;
      var m = R.miniBox; if (app.pos.view === 'ground' && m && e.offsetX >= m.x && e.offsetX <= m.x + m.w && e.offsetY >= m.y && e.offsetY <= m.y + m.h) { mini = true; miniGo(e.offsetX, e.offsetY); return; }
      down = { x: e.offsetX, y: e.offsetY, cx: app.view.cx, cy: app.view.cy, cu: app.view.cu, cv: app.view.cv }; moved = false;
    });
    cv.addEventListener('pointermove', function (e) {
      app.mx = e.offsetX; app.my = e.offsetY; if (pts[e.pointerId]) pts[e.pointerId] = { x: e.offsetX, y: e.offsetY }; if (!app.sim) return;
      if (pinch && npts() >= 2) { var P = Object.keys(pts).map(function (k) { return pts[k]; }), mx = (P[0].x + P[1].x) / 2, my = (P[0].y + P[1].y) / 2, d = Math.hypot(P[0].x - P[1].x, P[0].y - P[1].y) || 1; app.view.scale = U.clamp(pinch.s * d / pinch.d, app.view.min, app.view.max); var w1 = toWorld(mx, my); shiftView(pinch.w.a - w1.a, pinch.w.b - w1.b); return; }
      if (mini) { if (R.miniBox) miniGo(U.clamp(e.offsetX, R.miniBox.x, R.miniBox.x + R.miniBox.w), U.clamp(e.offsetY, R.miniBox.y, R.miniBox.y + R.miniBox.h)); return; }
      if (down) { var dx = e.offsetX - down.x, dy = e.offsetY - down.y; if (Math.abs(dx) + Math.abs(dy) > 5) { if (!moved) stopAuto(); moved = true; } if (moved) { if (app.pos.view === 'radar') { app.view.cx = down.cx - dx / app.view.scale; app.view.cy = down.cy + dy / app.view.scale; } else { app.view.cu = down.cu - dx / app.view.scale; app.view.cv = down.cv + dy / app.view.scale; } } }
      else if (app.pos.view === 'radar') app.hoverFix = fixAt(e.offsetX, e.offsetY);
    });
    function lift(e) { delete pts[e.pointerId]; if (npts() < 2 && pinch) { pinch = null; down = null; moved = true; } if (!npts()) mini = false; }
    cv.addEventListener('pointercancel', function (e) { lift(e); down = null; });
    cv.addEventListener('pointerup', function (e) {
      var wasMini = mini; lift(e); if (wasMini) return;
      if (!down) return; var wasMoved = moved; down = null; if (wasMoved || !app.sim) return;
      var x = e.offsetX, y = e.offsetY, sim = app.sim, id = hitTest(x, y), ac = sim.byId(app.sel);
      if (app.pos.view === 'radar' && ac && ac.owner === 'me' && (app.hdgAim || e.shiftKey) && !id) { var w = R.radarToWorld(app.view, cv.clientWidth, cv.clientHeight, x, y); addPend({ k: 'hdg', v: U.r5(U.brg({ x: ac.rx, y: ac.ry }, w)) }); app.hdgAim = false; $('bAim') && $('bAim').classList.remove('on'); return; }
      if (id) { select(id); return; }
      if (app.pos.view === 'radar' && ac && ac.owner === 'me') { var f = fixAt(x, y); if (f) { addPend({ k: 'dct', fix: f }); return; } }
    });
    cv.addEventListener('wheel', function (e) {
      e.preventDefault(); if (!app.sim) return; var k = e.deltaY < 0 ? 1.15 : 1 / 1.15; app.viewTo = null;
      if (app.follow) { var cvw = $('cv'); zoomAt(app.view.scale * k, cvw.clientWidth / 2, cvw.clientHeight / 2); } else zoomAt(app.view.scale * k, e.offsetX, e.offsetY);   /* 따라가는 중에는 화면 가운데를 기준으로 */
    }, { passive: false });
  }
  function fit() { if (!app.view) return; app.viewTo = null; if (app.follow) { app.follow = false; renderGnav(); } fitView(); }
  /* 명령 줄: VLA301 H100 A30 S180 ILS */
  function cli(text) {
    var sim = app.sim, tk = text.trim().toUpperCase().split(/\s+/), ac = sim.byId(app.sel), i, m, cmds = [];
    if (/^(ACK|OK)$/.test(tk.join(' ')) && sim.coordAsk) { sim.coordAck(); return; }
    if (tk[0] === 'REL' && ac && sim.reqRelease) { if (!sim.reqRelease(ac)) sim.sys(ATC.T('출발 승인을 요청할 수 없습니다(대기 지점 · 활주로 위의 출발기만).'), 'warn'); return; }
    if (tk[0] === 'XC' && ac && sim.reqCross) { if (!sim.reqCross(ac)) sim.sys(ATC.T('횡단 협조를 요청할 수 없습니다(횡단 대기 중인 항공기만).'), 'warn'); return; }
    if (/^(SA|SAY AGAIN|BLOCKED)$/.test(tk.join(' '))) { if (!sim.sayAgain()) sim.sys(ATC.T('지금은 혼신이 없습니다.'), 'warn'); return; }      /* 혼신 → 재송신 요청 */
    if (tk.length && sim.byCs(tk[0]) && !/^[HLRASDVN]\d+$/.test(tk[0])) { ac = sim.byCs(tk.shift()); select(ac.id); }
    if (!ac) { sim.sys(ATC.T('항공기를 먼저 선택하거나 호출부호를 앞에 입력하세요.'), 'warn'); return; }
    for (i = 0; i < tk.length; i++) {
      var t = tk[i];
      if ((m = /^([HLR])(\d{1,3})$/.exec(t))) cmds.push({ k: 'hdg', v: U.r5(+m[2]), dir: m[1] === 'H' ? null : m[1] });
      else if ((m = /^(?:A|C|FL)(\d{2,3})$/.exec(t))) cmds.push(altCmd(ac, +m[1] * 100, cmds));
      else if ((m = /^V(\d{2,3})$/.exec(t))) { var cv = { k: 'alt', v: +m[1] * 100 }; if (ATC.sidCan && ATC.sidCan(ac, cv.v)) cv.via = true; cmds.push(cv); }      /* V240 = climb via SID to FL240 */
      else if ((m = /^N(\d{2,3})$/.exec(t))) cmds.push({ k: 'alt', v: +m[1] * 100 });      /* N240 = climb and maintain(SID 제한 취소) */
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


  if (ATC.DepPilot) ATC.DepPilot.relay = function (p, k) { var x0 = app.xo || {}; start(k, app.seed, null, { pilotDep: true, level: x0.level || app.level, k0: x0.k0 || 'DEL', from: x0.from, carry: p }); };      /* 출발편: 다음 관제석의 시뮬레이션으로 이어 감 */
  /* ================= 조종사 체험 패널 ================= */
  function renderPilot(sim) {
    var pq = sim.pilot; if (app.logBig && (pq.prompt || pq.clr && pq.clr.opts || pq.freqTo && !pq.freqTo.sent || Object.keys(pq.asg || {}).length || pq.gaTodo && pq.gaTodo() || pq.dhAsk && pq.dhAsk() || pq.todo && pq.todo() || pq.sidAsk)) setLogBig(false);      /* 교신 기록을 크게 보던 중 할 일이 생기면 지시판으로 */
    if (sim.pilot.dep && sim.pilot.phase !== 'air') return renderDep(sim);      /* 출발편: 하늘 단계는 도착편과 같은 MCP 패널 */
    var p = sim.pilot, ac = p.ac, mc = p.mcp || {}, sig = 'P' + p.ver + (ATC.Cockpit && ATC.Cockpit.on ? 'C' : '') + '|' + (ac ? [ac.nav && ac.nav.mode, ac.appr ? (ac.appr.loc ? 2 : 1) : 0, mc.hdg, mc.alt, mc.spd, p.cfg.gear, p.cfg.flap, p.fly && p.fly.mode, p.fly && p.fly.on, p.fly && p.fly.at, p.dep && ac.nextFix ? ac.nextFix() : '', p.dep && p.sidView ? Math.round(((p.sidView().pred || {}).alt || 0) / 500) : '', p.gaTodo && p.gaTodo() ? p.gaTodo().k : '', p.canGa && p.canGa() ? 'G' : '', p.dhAsk && p.dhAsk() ? 'DH' : ''].join() : '') + (sim.cur && sim.cur.ac === ac ? sim.cur.who : '');
    /* 계기 숫자(기수 · 고도 · 속도)는 글자만 바꿈 — 패널 전체를 다시 그리면 누르는 도중의 단추가 사라져 선택이 먹지 않음 */
    if (sig === app.cmdSig) { var pe = document.querySelector('#cmd .pins'); if (pe && ac) { var bb = pe.querySelectorAll('b'); if (bb.length > 2) { bb[0].textContent = fmt.hdg(Math.round(ac.hdg)); bb[1].textContent = Math.round(ac.alt / 10) * 10; bb[2].textContent = Math.round(ac.ias); } } return; }
    app.cmdSig = sig; app.btns = [];
    if (ac && app.sel !== ac.id) app.sel = ac.id;
    if (!ac) { $('cmd').innerHTML = '<div class="cnone">' + ATC.T('내 항공기(Vela Air)가 관할 구역에 들어오기를 기다리는 중…') + '</div>'; return; }
    var head = '<div class="chead pil"><b style="border-color:' + ac.al.col + '">✈ ' + ac.cs + '</b><span>' + ac.csWord + ' ' + ac.num + ' · ' + ac.perf.n + ' · ' + ATC.T('조종사 체험') + ' · ' + esc(p.dep ? p.freqNowN + ' ' + p.freqNowFq : D.freq[p.freqTo && p.freqTo.sent ? p.freqTo.to : 'APP'].n + ' ' + D.freq[p.freqTo && p.freqTo.sent ? p.freqTo.to : 'APP'].fq) + '</span></div>';
    var rx = '', c = p.clr, mic = '<span class="pmicw">' + exB('pexb') + micB('pmicb') + '</span>';
    if (p.prompt) rx = '<h6 class="hmic">' + ATC.T('보낼 교신을 고르세요') + mic + '</h6>' + pEx(p.prompt.opts) + '<div class="popts">' + p.prompt.opts.map(function (o, i) { return B(o.t, function () { p.sendPrompt(i); app.cmdSig = ''; }, { cls: 'popt' }); }).join('') + '</div>';
    else if (c && c.opts) rx = '<h6>' + ATC.T('관제 지시') + '</h6><div class="patc">' + esc(c.ph.atc) + (app.gloss ? '<small>' + esc(ATC.gloss(c.ph.atc)) + '</small>' : '') + '</div><h6 class="hmic">' + ATC.T('복창을 고르세요') + mic + '</h6>' + pEx(c.opts) + '<div class="popts">' + c.opts.map(function (o, i) { return B(o.t, function () { p.readback(i); app.cmdSig = ''; }, { cls: 'popt' }); }).join('') + '</div>';
    else if (c) rx = '<div class="pwait">' + ATC.T('관제사가 말하는 중 — 잘 들으세요') + '</div>';
    else if (p.freqTo && !p.freqTo.sent) rx = '<h6>' + ATC.T('주파수를 바꾸세요') + '</h6><div class="popts">' + p.freqOpts().map(function (f) { return B(f.n + ' ' + f.fq, function () { p.tune(f.to); app.cmdSig = ''; }, { cls: 'popt' }); }).join('') + '</div>';
    else if (p.dep && p.sidAsk) rx = '<h6>' + ATC.T('SID 고도 제한을 어떻게 할까요?') + '</h6><div class="pwait">' + ATC.T('방금 복창: 「{0}」 — 이 지시가 SID의 공시 고도 제한을 그대로 두는지, 취소하는지 골라 VNAV에 반영합니다.', esc(p.sidAsk.said || '')) + '</div><div class="popts">' + B(ATC.T('제한 유지 — 공시 제한을 지키며 상승'), function () { p.sidAnswer(true); app.cmdSig = ''; }, { cls: 'popt pdo' }) + B(ATC.T('제한 취소 — 제한 없이 허가 고도까지'), function () { p.sidAnswer(false); app.cmdSig = ''; }, { cls: 'popt pdo' }) + '</div>';
    else if (p.dep && p.todo && p.todo()) { var td = p.todo(); rx = '<h6>' + ATC.T('조종석에서 할 일') + '</h6><div class="pwait">' + esc(td.why) + '</div><div class="popts">' + B(td.t, function () { p.act(td.k); app.cmdSig = ''; }, { cls: 'popt pdo' }) + '</div>'; }
    else if (Object.keys(p.asg).length) {      /* 복창 다음 단계: 받은 지시를 자동조종에 넣어야 항공기가 움직임 */
      rx = '<h6>' + ATC.T('복창한 지시를 자동조종(MCP)에 설정하세요') + '</h6><div class="popts">' + Object.keys(p.asg).map(function (k) {
        var x = p.asg[k].c, lab = k === 'dct' ? ATC.T('DCT {0} 설정', x.fix) : k === 'ils' ? ATC.T('APP 켜기 (ILS {0})', x.rwy) : k === 'hdg' ? ATC.T('HDG {0} 설정', fmt.hdg(x.v)) : k === 'alt' ? ATC.T('ALT {0} 설정', fmt.alt(x.v)) : x.v ? ATC.T('SPD {0}kt 설정', x.v) : ATC.T('속도 제한 풀기(NORMAL SPEED)');
        return B(lab, function () { if (x.v) mc[k] = x.v; p.set(k); app.cmdSig = ''; }, { cls: 'popt pdo' });
      }).join('') + '</div><small class="pmic">' + ATC.T('복창만으로는 항공기가 움직이지 않습니다 — 조종사가 MCP에 넣어야 따라갑니다(오른쪽 노란 칸에서 직접 돌려도 됨)') + '</small>';
    }
    else rx = '<div class="pwait">' + ATC.T('다음 지시를 기다립니다 — 지금 허가: {0}', esc(p.curText())) + '</div>';
    var gt = !p.dep && p.gaTodo ? p.gaTodo() : null;
    if (gt) rx = '<h6>' + ATC.T('복행 — 조종석에서 할 일') + '</h6><div class="pwait">' + esc(gt.why) + '</div><div class="popts">' + B(gt.t, function () { p.gaAct(gt.k); app.cmdSig = ''; }, { cls: 'popt pdo' }) + '</div>' + rx;
    if (!p.dep && p.dhAsk && p.dhAsk()) rx = '<h6>' + ATC.T('결심 고도(DA) — 판단') + '</h6><div class="pwait">' + esc(p.dh.vis ? ATC.T('진입등이 보입니다.') : ATC.T('구름 속 — 진입등도 활주로도 보이지 않습니다.')) + '</div><div class="popts">' + B(ATC.T('LANDING — 착륙 계속(D)'), function () { p.dhDecide('land'); app.cmdSig = ''; }, { cls: 'popt pdo' }) + B(ATC.T('GO AROUND — 복행(G)'), function () { p.dhDecide('ga'); app.cmdSig = ''; }, { cls: 'popt pdo pga' }) + '</div>' + rx;      /* 저시정 결심 고도 판단 · 윗줄 = 복행 형태(플랩 20 · 기어 올림) · 가속 때 플랩 올림 */
    var A = p.asg, todo = Object.keys(A).map(function (k) { var x = A[k].c; return '<span class="ptodo">' + esc(k === 'dct' ? 'DCT ' + x.fix : k === 'ils' ? 'ILS ' + x.rwy : k === 'hdg' ? 'HDG ' + fmt.hdg(x.v) + (x.dir ? ' ' + x.dir : '') : k === 'alt' ? fmt.alt(x.v) : x.v ? x.v + 'kt' : 'NORMAL SPEED') + '</span>'; }).join('');
    function row(k, lab, val, steps) { return '<div class="prow' + (A[k] ? ' due' : '') + '"><b>' + lab + '</b>' + steps.map(function (d) { return B((d > 0 ? '+' : '−') + Math.abs(d), function () { var v = mc[k] + d; if (k === 'hdg') v = U.n360(v) || 360; if (k === 'alt') v = U.clamp(v, 1000, 41000); if (k === 'spd') v = U.clamp(v, 140, 320); mc[k] = v; app.cmdSig = ''; }, { cls: 'pstep' }); }).slice(0, steps.length / 2).join('') + '<span class="pval">' + val + '</span>' + steps.map(function (d) { return B((d > 0 ? '+' : '−') + Math.abs(d), function () { var v = mc[k] + d; if (k === 'hdg') v = U.n360(v) || 360; if (k === 'alt') v = U.clamp(v, 1000, 41000); if (k === 'spd') v = U.clamp(v, 140, 320); mc[k] = v; app.cmdSig = ''; }, { cls: 'pstep' }); }).slice(steps.length / 2).join('') + B(ATC.T('설정'), function () { p.set(k); app.cmdSig = ''; }, { cls: 'pset' }) + '</div>'; }
    var mcp = '<h6>' + ATC.T('자동조종(MCP)') + (todo ? ' <span class="pdue">' + ATC.T('설정할 지시') + ' ' + todo + '</span>' : '') + '</h6>' +
      row('hdg', 'HDG', fmt.hdg(mc.hdg), [-10, -5, 5, 10]) + row('alt', 'ALT', fmt.alt(mc.alt), [-1000, 1000]) + row('spd', 'SPD', mc.spd + 'kt', [-10, 10]) +
      '<div class="prow">' + (A.dct ? B('DCT ' + A.dct.c.fix, function () { p.set('dct'); app.cmdSig = ''; }, { cls: 'pset due' }) : '') + (p.dep ? '' : B(ATC.T('APP (ILS {0})', p.ilsOk || ac.rwy), function () { p.set('ils'); app.cmdSig = ''; }, { cls: 'pset' + (A.ils ? ' due' : '') + (ac.appr ? ' on' : '') })) + '</div>';
    var md = ac.appr ? (ac.appr.loc ? 'LOC' + (ac.appr.gs ? ' · G/S' : '') : 'APP ARM') : ac.nav ? { route: 'LNAV', hdg: 'HDG SEL', hold: 'HOLD' }[ac.nav.mode] || ac.nav.mode : '';
    var ins = '<div class="pins"><span>HDG <b>' + fmt.hdg(Math.round(ac.hdg)) + '</b></span><span>ALT <b>' + Math.round(ac.alt / 10) * 10 + '</b></span><span>IAS <b>' + Math.round(ac.ias) + '</b></span><span>' + esc(md) + '</span></div>';
    var cf = p.cfg, ck = ATC.Cockpit, cfgRow = '<div class="prow pcfg">' + B(cf.gear === 'down' ? ATC.T('기어 ▲ 올림') : cf.gear === 'transit' ? ATC.T('기어 움직이는 중') : ATC.T('기어 ▼ 내림'), function () { p.gear(); app.cmdSig = ''; }, { cls: 'pset' + (cf.gear === 'down' ? ' on' : '') }) + B('FLAP ▲', function () { p.flap(-1); app.cmdSig = ''; }, { cls: 'pstep' }) + '<span class="pval">' + (cf.flap || 'UP') + '</span>' + B('FLAP ▼', function () { p.flap(1); app.cmdSig = ''; }, { cls: 'pstep' }) + '</div>';
    var vrow = ck && ck.ok ? '<div class="prow pview">' + B(ck.on ? ATC.T('레이더 화면') : ATC.T('3D 조종석'), function () { if (ck.on) { ck.close(); app.ck3d = false; } else { app.ck3d = true; ck.open(sim, $('ck3d')); } app.cmdSig = ''; }, { cls: 'pset' }) + (ck.on ? B(ATC.T('조종석 · 바깥'), function () { ck.view(); app.cmdSig = ''; }, { cls: 'pset' }) + B(ATC.T('계기 크게'), function () { ck.zoomPanel(); }, { cls: 'pset' }) + B(ATC.T('앞 보기'), function () { ck.resetLook(); }, { cls: 'pset' }) + (ATC.CkSnd ? B(ATC.CkSnd.mute ? ATC.T('🔇 소리 켜기') : ATC.T('🔊 소리 끄기'), function () { ATC.CkSnd.toggle(); app.cmdSig = ''; }, { cls: 'pset' }) : '') : '') + '</div>' : '';
    var F = p.fly, MN = ATC.Manual, flyRow = F && MN ? '<div class="prow pfly"><b>' + ATC.T('조종') + '</b>' + [['auto', ATC.T('자동')], ['last', ATC.T('1,000ft부터 직접')], ['full', ATC.T('처음부터 직접')]].map(function (m) { return B(m[1], function () { p.setFly(m[0]); app.cmdSig = ''; }, { cls: 'pstep' + (F.mode === m[0] ? ' on' : '') }); }).join('') + '</div><div class="prow pfly2">' +
      (F.on ? B(ATC.T('A/P 연결'), function () { MN.release(p); app.cmdSig = ''; }, { cls: 'pset' }) + B(F.at ? ATC.T('A/T 켜짐') : ATC.T('A/T 꺼짐'), function () { MN.toggleAT(p); app.cmdSig = ''; }, { cls: 'pset' + (F.at ? ' on' : '') }) + (p.canGa && p.canGa() ? B(ATC.T('TO/GA 복행(G)'), function () { p.goAround('pilot'); app.cmdSig = ''; }, { cls: 'pset pga' }) : '')
        : B(ATC.T('A/P 해제 — 직접 조종'), function () { MN.engage(p, 'btn'); app.cmdSig = ''; }, { cls: 'pset' }) + (p.canGa && p.canGa() ? B(ATC.T('TO/GA 복행(G)'), function () { p.goAround('pilot'); app.cmdSig = ''; }, { cls: 'pset pga' }) : '')) + '<small class="pmic">' + (F.on ? ATC.T('직접 조종 중 — 방향키(↓ 기수 올림) · 화면 조종간 · 게임패드, 자홍색 게임 조종 도움 막대를 따라가세요(실제 FD와 다름)') : ATC.T('Z 키 = 자동조종 연결/해제')) + '</small></div>' : '';
    if (p.dep) { rx += sidCard(p, true); cfgRow = '<div class="pins pgst"><span>GEAR <b class="on">UP</b></span><span>FLAP <b class="' + (cf.flap ? '' : 'on') + '">' + (cf.flap || 'UP') + '</b></span><span>' + esc((p.sid || '') + ' · FL' + Math.round(p.fp.rfl / 100)) + '</span></div>'; flyRow = ''; }      /* 출발편: 기어 · 플랩은 「조종석에서 할 일」로, 직접 조종은 없음 */
    $('cmd').innerHTML = head + '<div class="cbody pilotp"><div class="prx">' + rx + '</div><div class="pmcp">' + ins + mcp + cfgRow + flyRow + vrow + '</div></div>';
  }
  /* 조종사 체험 출발편(D1): 비행계획 · 허가 · 트랜스폰더 */
  function renderDep(sim) {
    if ((sim.mode === 'GND' || sim.mode === 'TWR') && sim.pilot.ac) app.sel = sim.pilot.ac.id;      /* 지상 지도에서 내 편 · 남은 경로가 늘 보이게 */
    var p = sim.pilot, ac = p.ac, fp = p.fp, x = p.xpdr, sig = 'D' + p.ver + (ATC.Cockpit && ATC.Cockpit.on ? 'C' : '') + (sim.cur && sim.cur.ac === ac ? sim.cur.who : '');
    if (sig === app.cmdSig) return; app.cmdSig = sig; app.btns = [];
    var G = p.phase === 'gnd' || p.phase === 'twr' || p.stage >= 2, W3 = p.phase === 'twr' || p.stage === 3, fq = p.freqNowFq ? { n: p.freqNowN || p.gnd.n, fq: p.freqNowFq } : D.freq[p.freqNow] || D.freq.DEL, mic = '<span class="pmicw">' + exB('pexb') + micB('pmicb') + '</span>';
    var head = '<div class="chead pil"><b style="border-color:' + ac.al.col + '">✈ ' + ac.cs + '</b><span>' + ac.csWord + ' ' + ac.num + ' · B787-9 · ' + ATC.T('조종사 체험 출발') + ' · ' + esc(fq.n + ' ' + fq.fq) + ' · STAND ' + esc(ac.stand) + '</span></div>';
    var rx = '', c = p.clr;
    if (p.phase === 'fpl') {
      var gs = p.gates(), dl = D.gateDest[fp.gate], fls = p.flOpts(), ck = p.check();
      rx = '<h6>' + ATC.T('비행계획(자동으로 만든 계획 — 그대로 확인하거나 바꾸세요)') + '</h6>' +
        '<div class="pfpl"><div class="prow"><b>SID</b>' + gs.map(function (g) { return B(esc((D.sidName ? D.sidName(g, p.sidK) : g)) + ' <small>RWY ' + p.rwyFor(g) + '</small>', function () { p.setFp('gate', g); app.cmdSig = ''; }, { cls: 'pstep' + (fp.gate === g ? ' on' : '') }); }).join('') + '</div>' +
        '<div class="prow"><b>' + ATC.T('목적지') + '</b>' + dl.map(function (d) { return B(d[0] + ' <small>' + esc(d[1]) + '</small>', function () { p.setFp('dest', d[0]); app.cmdSig = ''; }, { cls: 'pstep' + (fp.dest === d[0] ? ' on' : '') }); }).join('') + '</div>' +
        '<div class="prow"><b>' + ATC.T('순항 고도') + '</b>' + B('−', function () { var i = fls.indexOf(fp.rfl); p.setFp('rfl', fls[Math.max(0, i - 1)]); app.cmdSig = ''; }, { cls: 'pstep' }) + '<span class="pval">FL' + (fp.rfl / 100) + '</span>' + B('+', function () { var i = fls.indexOf(fp.rfl); p.setFp('rfl', fls[Math.min(fls.length - 1, i + 1)]); app.cmdSig = ''; }, { cls: 'pstep' }) + '</div>' +
        '<div class="proute">' + esc(p.route()) + '</div>' +
        '<ul class="pchk">' + ck.map(function (q) { return '<li class="' + (q.ok ? 'ok' : 'ng') + '">' + (q.ok ? '✔ ' : '✖ ') + esc(q.t) + '</li>'; }).join('') + '</ul>' +
        '<div class="prow">' + B(ATC.T('자동 계획으로 되돌리기'), function () { p.setFp('auto'); app.cmdSig = ''; }, { cls: 'pset' }) + B(ATC.T('비행계획 확정 → 허가 요청'), function () { p.confirm(); app.cmdSig = ''; }, { cls: 'pset pdo' }) + '</div></div>' +
        '<small class="pmic">' + ATC.T('SID와 출발 활주로는 오늘의 운용({0})에 맞춰 정해집니다. 순항 고도는 비행 방향에 따라 홀수 · 짝수.', esc(sim.flow.label)) + '</small><small class="pmic">' + depScope() + '</small>';
    }
    else if (p.prompt) rx = '<h6 class="hmic">' + ATC.T('보낼 교신을 고르세요') + mic + '</h6>' + pEx(p.prompt.opts) + '<div class="popts">' + p.prompt.opts.map(function (o, i) { return B(o.t, function () { p.sendPrompt(i); app.cmdSig = ''; }, { cls: 'popt' }); }).join('') + '</div>';
    else if (c && c.opts) rx = '<h6>' + ATC.T('관제 지시') + '</h6><div class="patc">' + esc(c.ph.atc) + (app.gloss ? '<small>' + esc(ATC.gloss(c.ph.atc)) + '</small>' : '') + '</div><h6 class="hmic">' + ATC.T('복창을 고르세요') + mic + '</h6>' + pEx(c.opts) + '<div class="popts">' + c.opts.map(function (o, i) { return B(o.t, function () { p.readback(i); app.cmdSig = ''; }, { cls: 'popt' }); }).join('') + '</div>';
    else if (c) rx = '<div class="pwait">' + ATC.T('관제사가 말하는 중 — 잘 들으세요') + '</div>';
    else if (x.want && !x.set) rx = '<h6>' + ATC.T('허가받은 스쿼크를 트랜스폰더에 넣으세요') + '</h6><div class="pwait">' + ATC.T('복창한 허가의 「squawk」 네 자리(숫자 0 ~ 7)') + '</div>';
    else if (p.freqTo && !p.freqTo.sent) rx = '<h6>' + ATC.T('주파수를 바꾸세요') + '</h6><div class="popts">' + p.freqOpts().map(function (f) { return B(f.n + ' ' + f.fq, function () { p.tune(f.to); app.cmdSig = ''; }, { cls: 'popt' }); }).join('') + '</div>';
    else if (p.todo && p.todo()) { var td = p.todo(); rx = '<h6>' + ATC.T('조종석에서 할 일') + '</h6><div class="pwait">' + esc(td.why) + '</div><div class="popts">' + B(td.t, function () { p.act(td.k); app.cmdSig = ''; }, { cls: 'popt pdo' }) + '</div>'; }
    else if (p.done) rx = '<div class="pwait">' + (p.stage === 4 ? (p.endHow === 'ho' ? ATC.T('다음 구역으로 넘어갔습니다 — 조종사 체험 출발편 끝.') : ATC.T('순항 고도에 올랐습니다 — 조종사 체험 출발편 끝.')) : p.stage === 3 ? ATC.T('출발편 3단계 끝.') : p.stage === 2 ? ATC.T('출발편 2단계 끝 — 이륙 · 출발 관제는 다음 판에서 이어집니다.') : ATC.T('출발편 1단계 끝 — 푸시백 · 지상 이동 · 이륙은 다음 판에서 이어집니다.')) + '</div>';
    else if (p.phase === 'relay') rx = '<div class="pwait">' + ATC.T('다음 주파수로 넘어가는 중…') + '</div>';
    else rx = '<div class="pwait">' + ATC.T('다음 교신을 기다립니다 — 지금 허가: {0}', esc(p.curText())) + '</div>';
    var keys = [1, 2, 3, 4, 5, 6, 7, 0].map(function (d) { return B(String(d), function () { p.key(d); app.cmdSig = ''; }, { cls: 'pstep' }); }).join('') + B('CLR', function () { p.key('clr'); app.cmdSig = ''; }, { cls: 'pstep' });
    var shown = x.entry ? (x.entry + '····').slice(0, 4) : x.code;
    var side = '<h6>' + ATC.T('비행계획') + '</h6><div class="pins"><span>' + esc(fp.dest) + '</span><span>' + esc(D.sidName ? D.sidName(fp.gate, p.sidK) : fp.gate) + '</span><span>RWY <b>' + esc(ac.rwy) + '</b></span><span>FL<b>' + (fp.rfl / 100) + '</b></span>' + (p.depFq ? '<span>DEP <b>' + esc(p.depFq) + '</b></span>' : '') + (p.transName && p.transName() ? '<span>' + esc(p.transName()) + ' TRANS</span>' : '') + '</div>' + sidCard(p, false) +
      (G ? '<h6>' + ATC.T('항공기 상태') + '</h6><div class="pins pgst"><span>' + (W3 ? 'GEAR <b class="' + (p.cfg.gear === 'up' ? 'on' : '') + '">' + (p.cfg.gear === 'up' ? 'UP' : p.cfg.gear === 'down' ? 'DOWN' : '···') + '</b></span><span>A/P <b class="' + (p.apOn ? 'on' : '') + '">' + (p.apOn ? 'ON' : 'OFF') + '</b>' : ATC.T('주차 브레이크') + ' <b class="' + (p.pbrake ? 'on' : '') + '">' + (p.pbrake ? 'SET' : 'OFF') + '</b>') + '</span><span>ENG <b class="' + (p.eng.st === 'on' ? 'on' : '') + '">' + (p.eng.st === 'on' ? 'RUN' : p.eng.st === 'start' ? 'START' : 'OFF') + '</b></span><span>FLAP <b>' + p.cfg.flap + '</b></span></div>' + (p.taxi && !W3 ? '<div class="proute">' + esc(p.taxi.via.join(' → ') + ' → ' + p.taxi.hp + ' (RWY ' + p.taxi.rwy + ')' + (p.taxi.hs ? ' · HOLD SHORT RWY ' + p.taxi.hs : '')) + '</div>' : '') : '') +
      '<h6>' + ATC.T('트랜스폰더') + (x.want && !x.set ? ' <span class="pdue">' + ATC.T('설정할 것') + '</span>' : '') + '</h6><div class="prow pxpdr' + (x.want && !x.set ? ' due' : '') + '"><span class="pval">' + shown + '</span>' + keys + '</div>';
    var ck3 = ATC.Cockpit, vrow = ck3 && ck3.ok ? '<div class="prow pview">' + B(ck3.on ? ATC.T('조종석 · 바깥') : ATC.T('3D 조종석'), function () { if (ck3.on) ck3.view(); else { app.ck3d = true; ck3.open(sim, $('ck3d')); } app.cmdSig = ''; }, { cls: 'pset' }) + (ck3.on ? B(ATC.T('앞 보기'), function () { ck3.resetLook(); }, { cls: 'pset' }) : '') + (G && !p.done && ck3.on && !(p.ac && p.ac.st === 'air') ? B(ATC.T('지상 지도'), function () { ck3.close(); app.ck3d = false; app.cmdSig = ''; }, { cls: 'pset' }) : '') + '</div>' : '';
    if (p.phase === 'gnd' && p.manOk && p.manOk() && ck3 && ck3.on) vrow += '<div class="prow pview">' + B(p.fly.on ? ATC.T('지상 이동 자동으로(Z)') : ATC.T('지상 이동 직접 조종(Z)'), function () { p.manTaxi(); app.cmdSig = ''; }, { cls: 'pset' + (p.fly.on ? ' on' : '') }) + '</div>';
    if (p.phase === 'twr' && p.manToOk && p.manToOk() && ck3 && ck3.on) vrow += '<div class="prow pview">' + B(p.fly.on ? ATC.T('이륙 자동으로(Z)') : ATC.T('직접 이륙(Z)'), function () { p.manTO(); app.cmdSig = ''; }, { cls: 'pset' + (p.fly.on ? ' on' : '') }) + '</div>';      /* 직접 이륙(선택) — 떠오른 뒤에는 자동조종을 켜면 끝 */
    if (p.phase === 'twr' && p.fly.on) vrow += '<small class="pmic">' + ATC.T('직접 이륙 — 피치 조작만 체험(추력 · 좌우 방향은 게임이 맡음). 자홍색 막대는 이 게임의 조종 도움 표시이며 실제 787 FD와 다릅니다 — 실제 이륙에서는 땅에서 FD 막대를 따라 기수를 들지 않습니다.') + '</small>';      /* GPT 17차 F17-01 · R17-05 */
    $('cmd').innerHTML = head + '<div class="cbody pilotp"><div class="prx">' + rx + '</div><div class="pmcp">' + side + vrow + '</div></div>';
  }
  /* ================= 마이크 관제(1단계) ================= */
  /* 누르고 있는 동안 듣기(🎤 단추 또는 M 키) → 영어 음성 인식(브라우저) → ATC.mic.parse → 지시 송신 · 표준 문구 비교 */
  var MIC = { rec: null, on: false, want: false, again: false, fin: [], tmr: null, err: '' };
  var SRC = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  /* 말하기 예시(연습용 · 켜고 끄기): 마이크로 무엇을 말하면 되는지 표준 문구를 보여 줌
     ① 단추로 고른 지시가 있으면 그 문구 ② 고른 항공기(없으면 응답을 기다리는 첫 항공기)의 지금 상태에 맞는 대표 지시 — 숫자는 예시 */
  function micExample() {
    var sim = app.sim; if (!sim || sim.pilot || app.over) return null;
    var ac = sim.byId(app.sel), mine = function (a) { return a && !a.gone && a.owner !== 'out'; };
    if (!mine(ac)) ac = sim.acs.filter(function (a) { return mine(a) && a.waiting && (a.owner === 'me' || sim.mode === 'DEL'); })[0] || null;
    if (!ac) return { t: '', n: ATC.T('항공기를 고르면 그 항공기에 말할 예시가 나옵니다.') };
    if (app.pend.length && ac.id === app.sel) return { t: ATC.phrase(sim, ac, app.pend).atc, n: ATC.T('고른 지시 — 이대로 말해 보세요') };
    var c = [], st = ac.st, rw = ac.rwy, r10 = function (h) { return U.n360(Math.round(h / 10) * 10) || 360; };
    try {
      if (sim.mode === 'DEL') { if (st === 'req' && !ac.noFpl) { var g = ac.gate; c = [{ k: 'clr', destName: ac.destName, sid: D.sidName ? D.sidName(g, sim) : (sim.sidFor ? sim.sidFor(g) : ''), alt: D.sidInit || 9000, sq: ac.squawk }]; } }
      else if (st === 'reqpush') c = [{ k: 'push' }];
      else if (st === 'reqtaxi' && sim.routeOptions) { var tg = ac.kind === 'dep' && !ac.tech ? { hp: (sim.holdsFor(ac) || [])[0] } : { stand: ac.stand }, ro = sim.routeOptions(ac, tg)[0]; if (ro) { var tc = Object.assign({ k: 'taxi', via: ro.via, nodes: ro.nodes, len: ro.len }, tg); if (tg.hp) tc.rwy = sim.rwyOfHold ? sim.rwyOfHold(ac, tg.hp) : ac.rwy; if (ro.cross) tc.hs = sim.arrRwy; c = [tc]; } }
      else if (st === 'athold' && ac.holdKind === 'cross') c = [{ k: 'cross', rwy: ac.holdRw }];
      else if (st === 'athold' && ac.holdKind === 'dep') c = sim.mode === 'TWR' ? [{ k: 'luaw', rwy: rw }] : [{ k: 'ho', to: sim.apron ? 'GND' : 'TWR' }];
      else if (st === 'linedup') c = [{ k: 'cto', rwy: rw }];
      else if (st === 'final' && sim.mode === 'TWR') c = [{ k: 'ctl', rwy: rw }];
      else if (st === 'air' && sim.mode === 'TWR') c = [{ k: 'ho', to: ac.goAround ? 'APP' : 'DEP' }];
      else if (sim.mode === 'APP' || sim.mode === 'ACC') {
        var arr = ac.kind === 'arr', alt = Math.round(ac.alt / 1000) * 1000;
        if (arr && sim.mode === 'APP' && ac.d !== undefined && ac.d < 16 * 1852 && !ac.appr) c = [{ k: 'hdg', v: r10(ac.hdg), dir: null }, { k: 'ils', rwy: rw }];
        else c = [{ k: 'hdg', v: r10(ac.hdg - 20), dir: 'L' }, { k: 'alt', v: arr ? Math.max(3000, alt - 2000) : alt + 2000 }];
      }
    } catch (e) { c = []; }
    if (!c.length) return { t: '', n: ATC.T('{0}: 지금은 줄 지시가 없습니다.', ac.cs) };
    return { t: ATC.phrase(sim, ac, c).atc, n: ATC.T('예시 — 숫자 · 지점은 상황에 맞게 바꿔 말하세요') };
  }
  /* 음성 관제 줄(지도 아래 고정) — 큰 「누르고 말하기」 단추 · 말하기 예시 · 알아들은 말. 지도 위에 얹지 않음 */
  var TOUCH = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;      /* 휴대폰 · 태블릿: M 키 안내를 빼고 단추만 */
  function vdB(cls) { return '<button type="button" data-vdock="1" class="' + cls + (app.vdock ? ' on' : '') + '" title="' + esc(ATC.T('음성 관제 줄 열기 · 닫기 — 누르고 영어로 말하기 · 말하기 예시')) + '">🎤 ' + ATC.T('음성') + '</button>'; }
  function renderDock() {
    var d = $('vdock'), sc = $('scope'); if (!d || !sc) return;
    var on = !!(app.vdock && app.sim && !app.sim.pilot && !app.over);
    document.querySelectorAll('[data-vdock]').forEach(function (e) { e.classList.toggle('on', !!app.vdock); });
    if (sc.classList.contains('vd') !== on) { sc.classList.toggle('vd', on); d.hidden = !on; requestAnimationFrame(function () { resize(); if (app.pos && app.pos.view !== 'del') fitView(); }); }
    if (!on) return;
    if (!d.firstChild) d.innerHTML = '<button type="button" data-mic="1" class="vptt">🎤<span>' + ATC.T('누르고 말하기') + '</span><small>' + (TOUCH ? ATC.T('떼면 송신') : ATC.T('떼면 송신 · M 키')) + '</small></button><div class="vb"><div class="vex"></div><div id="vfb"></div></div><button type="button" data-vdock="1" class="vcl" title="' + esc(ATC.T('음성 관제 줄 닫기')) + '">✕</button>';
    var x = app.micEx ? micExample() : null, sw = '<button type="button" data-micex="1" class="vexb' + (app.micEx ? ' on' : '') + '">' + ATC.T('말하기 예시') + ' ' + (app.micEx ? ATC.T('켬') : ATC.T('끔')) + '</button>';
    var h = '<div class="vh">' + sw + (x ? ' <small>' + esc(x.n) + '</small>' : ' <small>' + ATC.T('켜면 고른 항공기에 맞는 표준 문구가 여기 나옵니다') + '</small>') + '</div>' + (x && x.t ? '<p class="vx">' + esc(x.t) + '</p>' : '');
    if (h !== app.dockSig) { app.dockSig = h; d.querySelector('.vex').innerHTML = h; }
  }
  function pEx(opts) { if (!app.micEx) return ''; var g = (opts || []).filter(function (o) { return o.ok; })[0]; return g ? '<div class="pex"><b>🎤 ' + ATC.T('말하기 예시') + '</b> ' + esc(g.t) + '</div>' : ''; }
  function exB(cls) { return '<button type="button" data-micex="1" class="' + cls + (app.micEx ? ' on' : '') + '" title="' + esc(ATC.T('말하기 예시 켜기 · 끄기 — 마이크로 무엇을 말하면 되는지 표준 문구를 보여 줍니다(연습용)')) + '">' + ATC.T('예시') + '</button>'; }
  /* 마이크 단추(누르고 있는 동안 듣기) — 레이더 · 지상 · 조종사 체험 모두 data-mic 하나로 처리 */
  function micB(cls) { return '<button type="button" data-mic="1" class="' + cls + (MIC.on && MIC.want ? ' on' : '') + '" title="' + esc(TOUCH ? ATC.T('누르고 있는 동안 영어로 말하고, 다 말한 뒤 떼면 보냅니다') : ATC.T('누르고 있는 동안 영어로 말하고, 다 말한 뒤 떼면 보냅니다 (M 키) — 크롬 · 엣지')) + '">🎤' + (cls === 'pmicb' ? ' <span>' + (TOUCH ? ATC.T('누르고 영어로 말하기') : ATC.T('누르고 영어로 말하기 (M)')) + '</span>' : '') + '</button>'; }
  function micMark() { document.querySelectorAll('[data-mic]').forEach(function (b) { b.classList.toggle('on', MIC.on && MIC.want); b.classList.toggle('busy', MIC.on && !MIC.want); }); }
  function micFb(html, cls) { var vf = $('vfb'), dk = $('vdock'); if (vf && $('scope').classList.contains('vd')) {      /* 음성 관제 줄이 열려 있으면 줄 안에: 듣는 동안은 예시 아래 한 줄, 결과는 8초 동안 예시 자리에 */
      var ln = String(html).split('<br>'), ix = ln.findIndex(function (l) { return l.indexOf('class="mp"') >= 0; }); if (ix > 0) ln.unshift(ln.splice(ix, 1)[0]);      /* 좁은 줄: 일치 %를 맨 위로 */
      vf.innerHTML = ln.join('<br>'); vf.className = cls || ''; clearTimeout(MIC.dtmr); dk.classList.toggle('fb', cls !== 'live');
      if (cls !== 'live') MIC.dtmr = setTimeout(function () { dk.classList.remove('fb'); }, 8000); return; }
    var b = $('micfb'); if (!b) return; b.innerHTML = html; b.className = cls || ''; b.hidden = false; clearTimeout(MIC.tmr); MIC.tmr = setTimeout(function () { b.hidden = true; }, cls === 'live' ? 15000 : 9000); }
  function micStart() {
    if (!app.sim) return;
    MIC.want = true;
    if (MIC.on) { MIC.again = true; micMark(); return; }      /* 앞 말을 아직 알아듣는 중(떼고 1 ~ 2초) — 끝나는 대로 이어서 듣기(예전에는 이때 누른 키가 무시됨) */
    if (!SRC) { micFb(ATC.T('이 브라우저는 음성 인식을 지원하지 않습니다 — 크롬 · 엣지(PC)에서 써 보세요.'), 'no'); return; }
    var r = MIC.rec = new SRC(); r.lang = 'en-US'; r.interimResults = true; r.maxAlternatives = 5; r.continuous = true;      /* 누르고 있는 동안은 말을 잠깐 멈춰도 끊기지 않음 */
    MIC.fin = []; MIC.err = ''; MIC.on = true; MIC.again = false; micMark();
    micFb('<span class="mh">● ' + ATC.T('준비 중') + '</span>', 'live');
    r.onstart = function () { if (!MIC.want) { if (!r.stopped) try { r.stopped = true; r.stop(); } catch (e) { } return; } micFb('<span class="mh">● ' + ATC.T('듣는 중 — 다 말한 뒤 떼세요') + '</span>', 'live'); };
    r.onresult = function (e) {
      var live = '';
      for (var i = e.resultIndex; i < e.results.length; i++) {
        var res = e.results[i];
        if (res.isFinal) { var al = []; for (var j = 0; j < res.length; j++) al.push(res[j].transcript.trim()); MIC.fin.push(al); }
        else live += res[0].transcript;
      }
      var said = MIC.fin.map(function (a) { return a[0]; }).join(' ') + (live ? ' ' + live : '');
      micFb('<span class="mh">● ' + (MIC.want ? ATC.T('듣는 중') : ATC.T('알아듣는 중')) + '</span> ' + esc(said.trim()), 'live');
    };
    r.onerror = function (e) { MIC.err = e.error; var m = { 'not-allowed': ATC.T('마이크 사용을 허용해 주세요(주소창의 마이크 표시).'), 'service-not-allowed': ATC.T('마이크 사용을 허용해 주세요(주소창의 마이크 표시).'), network: ATC.T('음성 인식 서버에 연결할 수 없습니다(인터넷 연결이 필요합니다).'), 'no-speech': ATC.T('말소리가 들리지 않았습니다 — 마이크를 확인하고 다시 눌러 말해 보세요.'), 'audio-capture': ATC.T('마이크를 찾을 수 없습니다.') }[e.error]; if (m) micFb(m, 'no'); };
    r.onend = function () {
      MIC.on = false; MIC.rec = null;
      var alts = []; if (MIC.fin.length) for (var i = 0; i < 5; i++) { var t = MIC.fin.map(function (a) { return a[i] || a[0]; }).join(' ').trim(); if (t && alts.indexOf(t) < 0) alts.push(t); }
      if (alts.length) micHandle(alts);
      else if (!MIC.err || MIC.err === 'aborted') micFb(TOUCH ? ATC.T('알아들은 말이 없습니다 — 🎤를 누르고 말한 뒤, 다 말하면 떼세요.') : ATC.T('알아들은 말이 없습니다 — 🎤(M 키)를 누른 채 말하고, 다 말한 뒤 떼세요.'), 'no');
      var ag = MIC.again && MIC.want; MIC.again = false; micMark();
      if (ag) micStart();      /* 알아듣는 사이 다시 눌러 둔 경우 */
    };
    try { r.start(); } catch (err) { MIC.on = false; MIC.rec = null; micMark(); micFb(ATC.T('마이크를 시작하지 못했습니다 — 잠시 뒤 다시 눌러 보세요.'), 'no'); }
  }
  function micStop() {
    if (!MIC.want) return;
    MIC.want = false; micMark();
    if (MIC.again) { MIC.again = false; return; }
    if (MIC.rec && MIC.on && !MIC.rec.stopped) { MIC.rec.stopped = true; micFb('<span class="mh">● ' + ATC.T('알아듣는 중') + '</span> ' + esc(MIC.fin.map(function (a) { return a[0]; }).join(' ')), 'live'); try { MIC.rec.stop(); } catch (e) { } }
  }
  /* 단추에서 떼든, 손가락이 단추 밖으로 나가서 떼든 같은 처리(예전: 단추 밖으로 조금만 움직여도 끊김) */
  function micHold(e) {
    e.preventDefault(); micStart();
    var up = function () { window.removeEventListener('pointerup', up, true); window.removeEventListener('pointercancel', up, true); micStop(); };
    window.addEventListener('pointerup', up, true); window.addEventListener('pointercancel', up, true);
  }
  function micHandle(alts) {
    var sim = app.sim; if (!sim || app.over) return;
    if (sim.pilot) { if (!sim.pilot.wantSpeech()) { micFb('<b>' + ATC.T('들은 말') + '</b> ' + esc(alts[0]) + '<br><span class="me">' + ATC.T('지금은 보낼 교신 · 복창이 없습니다.') + '</span>', 'no'); return; } var pc = sim.pilot.clr && sim.pilot.clr.opts ? sim.pilot.clr.opts : sim.pilot.prompt.opts, good = pc.filter(function (o) { return o.ok; })[0].t, sg = sim.pilot.speak(alts[0]); app.cmdSig = ''; micFb('<b>' + ATC.T('들은 말') + '</b> ' + esc(alts[0]) + '<br><b>' + ATC.T('표준 문구') + '</b> ' + esc(good) + '<br><span class="mp">' + ATC.T('일치 {0}%', sg) + '</span>' + (sg >= 80 ? '' : ' · <span class="me">' + ATC.T('80% 미만 — 틀린 교신으로 처리') + '</span>'), sg >= 80 ? 'ok' : 'no'); return; }
    var sel = sim.byId(app.sel), rs = alts.map(function (t) { return ATC.mic.parse(t, sim, sel); }), r = rs.filter(function (x) { return x.sp || x.cmds.length && !x.err; })[0] || rs[0];
    if (r.sp === 'sayagain') { if (!sim.sayAgain()) micFb(ATC.T('지금은 혼신이 없습니다.'), 'no'); else micFb('<b>' + ATC.T('들은 말') + '</b> ' + esc(r.heard), 'ok'); return; }
    if (r.sp === 'correct') { select(r.ac.id); sim.correct(r.ac.id); micFb('<b>' + ATC.T('들은 말') + '</b> ' + esc(r.heard) + '<br>' + ATC.T('복창 정정을 송신했습니다.'), 'ok'); return; }
    if (r.err || !r.cmds.length) { micFb('<b>' + ATC.T('들은 말') + '</b> ' + esc(r.heard) + '<br><span class="me">' + esc(r.err || '') + '</span>', 'no'); return; }
    var ac = r.ac; select(ac.id); app.pend = [];
    var std = ATC.phrase(sim, ac, r.cmds).atc, sc = ATC.mic.score(r.heard, std);
    var ca = r.cmds.filter(function (c) { return c.k === 'alt'; })[0], vw = ca && r.verb && (r.verb === 'climb' ? ca.v < ac.alt - 150 : ca.v > ac.alt + 150) ? ATC.T('「{0}」이라고 말했지만 {1}은(는) 지금 고도({2})보다 {3} — 「{4}」입니다.', r.verb, ATC.fmt.alt(ca.v), ATC.fmt.alt(Math.round(ac.alt / 100) * 100), r.verb === 'climb' ? ATC.T('낮습니다') : ATC.T('높습니다'), r.verb === 'climb' ? 'descend' : 'climb') : '';      /* climb · descend를 거꾸로 말함 */
    sim.mic = sim.mic || { n: 0, sum: 0 }; sim.mic.n++; sim.mic.sum += sc.pct;
    sendPend(r.cmds, { spoken: true });
    micFb('<b>' + ATC.T('들은 말') + '</b> ' + esc(r.heard) + '<br><b>' + ATC.T('표준 문구') + '</b> ' + esc(std) + '<br><span class="mp">' + ATC.T('일치 {0}%', sc.pct) + '</span>' + (sc.miss.length ? ' · ' + ATC.T('빠진 말: {0}', esc(sc.miss.slice(0, 6).join(' '))) : '') + (r.csSaid ? '' : '<br><span class="me">' + ATC.T('호출부호 없이 말해 고른 항공기로 보냈습니다 — 실제 교신은 호출부호부터 말합니다.') + '</span>') + (vw ? '<br><span class="me">' + esc(vw) + '</span>' : ''), sc.pct >= 80 && !vw ? 'ok' : 'mid');
  }
  function bind() {
    /* 운용 방향 단추와 공항 단추는 공항 묶음에서 만듦 */
    Object.keys(D.flows).forEach(function (k) { var b = document.createElement('button'); b.dataset.fl = k; b.textContent = D.flows[k].label || k; $('flows').appendChild(b); });
    if ($('flows').querySelectorAll('button').length > 3) $('flows').classList.add('many');      /* 운용 방향이 넷 이상(아스테라 4방향): 휴대폰에서 두 칸씩 접음(css) */
    /* 사이트판(window.ATC_SITE = { back: '게임 고르기 페이지 주소' }): 시험판 공항은 목록에 내놓지 않고, 로비에 「게임 고르기」로 돌아가는 단추를 둠 */
    var SITE = window.ATC_SITE;
    if (SITE && SITE.back) { var bk = document.createElement('a'); bk.className = 'tog'; bk.id = 'optBack'; try { bk.href = new URL(SITE.back, location.href).href; } catch (e) { bk.href = SITE.back; }      /* 문서 주소 기준(<base>가 있어도 같음) */ bk.textContent = ATC.T('← 게임 선택'); var op = document.querySelector('.opts'); if (op) op.appendChild(bk); }
    var aps = ATC.airports().filter(function (a) { return !(a.hidden || SITE && a.preview) || a.id === ATC.aptId; });
    if (aps.length > 1) { $('apts').hidden = false; aps.forEach(function (a) { var b = document.createElement('button'); b.dataset.ap = a.id; b.textContent = a.name + (a.beta ? ' · ' + ATC.T('시험판') : ''); if (a.id === ATC.aptId) b.className = 'on'; $('apts').appendChild(b); }); $('apts').addEventListener('click', function (e) { var b = e.target.closest('[data-ap]'); if (b) ATC.setAirport(b.dataset.ap); }); }
    bindCanvas();
    $('pcards').addEventListener('click', function (e) { var b = e.target.closest('.pcard'); if (b) briefing(b.dataset.pos); });
    $('xmodes').addEventListener('click', function (e) { var w = e.target.closest('[data-wx]'); if (w) { app.wx = w.dataset.wx; saveOpt(); renderX(load(REC_KEY, {})); return; } var b = e.target.closest('.xbtn'); if (!b) return; if (b.dataset.x === 'daily') { var dy = daily(); start(dy.pos, dy.seed, null, dy); } else if (b.dataset.x === 'real') realPick(); else if (b.dataset.x === 'pilot') start('APP', null, null, { pilot: true, level: app.level }); else if (b.dataset.x === 'pilotdep') start('DEL', null, null, { pilotDep: true, level: app.level, k0: 'DEL' }); else if (b.dataset.x === 'pilotdep2') start('GND', null, null, { pilotDep: true, level: app.level, k0: 'GND', from: 'gnd' }); else if (b.dataset.x === 'pilotdep3') start('TWR', null, null, { pilotDep: true, level: app.level, k0: 'TWR', from: 'twr' }); else start(b.dataset.pos, null, null, { endless: true, level: app.level }); });
    $('scns').addEventListener('click', function (e) { var f = e.target.closest('[data-sapt]'); if (f) { app.scnApt = f.dataset.sapt; renderScns(); return; } var b = e.target.closest('.scard'); if (b) scnBrief(b.dataset.scn); });
    $('tabs').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { app.tab = b.dataset.tab; app.tabSet = true; saveOpt(); showLobby(); } });
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
      else if (m === 'startapn') start('GND', null, null, { apron: true });
      else if (m === 'learn') openLearn(b.dataset.les || 'flow');
      else if (m === 'tab') openLearn(b.dataset.les);
      else if (m === 'lobby') showLobby();
      else if (m === 'result') showResult();
      else if ((m === 'again' || m === 'same') && app.xo && app.xo.pilotDep) start(app.xo.k0 || 'DEL', m === 'same' ? app.seed : null, null, { pilotDep: true, level: app.xo.level, k0: app.xo.k0, from: app.xo.from });      /* 출발편은 처음 단계부터 다시 */
      else if (m === 'again') start(app.pos.id, app.xo && app.xo.daily ? app.xo.seed : null, null, app.xo);
      else if (m === 'same') start(app.pos.id, app.seed, null, app.xo);
      else if (m === 'scnstart') scnGo(b.dataset.scn);
      else if (m === 'scnagain') start(app.scn.pos, app.scn.seed, app.scn);
      else if (m === 'scnlist') { app.tab = 'scn'; app.tabSet = true; showLobby(); }
      else if (m === 'quit') { app.sim.over = true; app.over = true; showResult(); }
    });
    $('strips').addEventListener('click', function (e) { var s = e.target.closest('.strip'), m = e.target.closest('.smore'), o; if (m) { o = stripOut($('strips')); stripShow(m.id === 'smA' ? o.a[o.a.length - 1] : o.b[0]); } else if (s) select(+s.dataset.id); });
    $('strips').addEventListener('scroll', stripMore);
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
    $('bFit').addEventListener('click', fit); bindGnav();
    $('bQuit').addEventListener('click', function () { app.wasPaused = app.paused; app.paused = true; openModal(ATC.T('<div class="mhead"><h2>근무를 종료할까요?</h2></div><div class="mbody"><p>현재까지의 결과로 평가합니다.</p></div><div class="mfoot"><span class="sp"></span><button class="btn" data-m="close">계속 근무</button><button class="btn" data-m="lobby">평가 없이 나가기</button><button class="btn pri" data-m="quit">종료하고 평가 보기</button></div>')); });
    $('cli').addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Enter') { cli(this.value); this.value = ''; } if (e.key === 'Escape') this.blur(); });
    window.addEventListener('resize', function () { resize(); if (app.sim && !$('game').hidden) { renderGnav(); if (app.viewFit && app.view && app.pos.view === 'ground') fitView(); } });
    window.addEventListener('keydown', function (e) {
      if (!app.sim || $('game').hidden || !$('modal').hidden) { if (e.key === 'Escape' && !$('modal').hidden && !app.over) { closeModal(); if (app.sim) app.paused = app.wasPaused || false; } return; }
      var t0 = e.target; if (t0 && (t0.tagName === 'INPUT' || t0.tagName === 'TEXTAREA' || t0.tagName === 'SELECT')) return;      /* 입력 칸에서 친 글자는 단축키가 아님 */
      var k = ATC.keyOf(e);
      if (app.sim.pilot && app.sim.pilot.ac) { var pk = app.sim.pilot; if (k === 'g') { if (e.defaultPrevented || pk.gKeyGa && pk.gKeyGa()) return; pk.gear(); app.cmdSig = ''; return; }      /* 최종 접근 중 기어가 내려가 있으면 G는 TO/GA(manual.js) — 기어는 건드리지 않음 */ if (k === '[') { pk.flap(-1); app.cmdSig = ''; return; } if (k === ']') { pk.flap(1); app.cmdSig = ''; return; } if (k === 'v' && ATC.Cockpit && ATC.Cockpit.on) { ATC.Cockpit.view(); return; } }      /* 조종사 체험: G 기어 · [ ] 플랩 · V 시점 */
      if (app.sim.pilot && /^(enter|escape|a|tab|\/)$/.test(k)) { if (k === 'tab') e.preventDefault(); return; }      /* 조종사 체험: 관제 단축키는 쓰지 않음 */
      if (k === 'enter') { sendPend(); e.preventDefault(); }
      else if (k === 'escape') { if (app.pend.length) { app.pend = []; app.gt = null; app.routePrev = null; } else app.sel = 0; app.cmdSig = ''; }
      else if (k === ' ') { if (app.instOn) resumeInst(); else app.paused = !app.paused; e.preventDefault(); }
      else if (k === 'a') { var ac = app.sim.byId(app.sel); if (ac && app.sim.accept) { if (!app.sim.accept(ac)) { var w = app.sim.acs.filter(function (x) { return x.owner === 'in'; })[0]; if (w) { app.sim.accept(w); select(w.id); } } app.cmdSig = ''; } else if (app.sim.accept) { var w2 = app.sim.acs.filter(function (x) { return x.owner === 'in'; })[0]; if (w2) { app.sim.accept(w2); select(w2.id); } } if (app.instOn) resumeInst(); }
      else if (k === 'h') app.hdgAim = true;
      else if (k === 'f') fit();
      else if (k === '+' || k === '=') zoomBtn(1.4);
      else if (k === '-' || k === '_') zoomBtn(1 / 1.4);
      else if (k === 'g' && app.pos.view === 'ground') setFollow(!app.follow);
      else if (k === '1' || k === '2' || k === '3' || k === '4') { app.speed = [1, 2, 4, 8][+k - 1]; app.paused = false; }
      else if (k === 'tab') { e.preventDefault(); var ws = app.sim.acs.filter(function (x) { return x.waiting && x.owner !== 'out'; }); if (ws.length) { var ix = ws.map(function (x) { return x.id; }).indexOf(app.sel); select(ws[(ix + 1) % ws.length].id); } }
      else if (k === '/') { $('cli').focus(); e.preventDefault(); }
      else if (k === 'm' && !e.repeat) micStart();
    });
    window.addEventListener('keyup', function (e) { var k = ATC.keyOf(e); if (k === 'h') app.hdgAim = false; if (k === 'm') micStop(); });
    window.addEventListener('blur', function () { app.hdgAim = false; if (MIC.want) micStop(); });      /* 다른 창으로 가면 듣기 끝 */
    document.addEventListener('pointerdown', function (e) { var b = e.target.closest && e.target.closest('[data-mic]'); if (b && app.sim && !app.over) micHold(e); }, true);
    document.addEventListener('contextmenu', function (e) { if (e.target.closest && e.target.closest('[data-mic]')) e.preventDefault(); });
    document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-vdock]'); if (!b) return; e.preventDefault(); app.vdock = !app.vdock; if (app.vdock && !app.vdockSeen) { app.vdockSeen = true; app.micEx = true; } app.dockSig = ''; saveOpt(); renderDock(); });      /* 처음 열 때는 말하기 예시도 켬 */
    document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-micex]'); if (!b) return; e.preventDefault(); app.micEx = !app.micEx; app.dockSig = ''; app.cmdSig = ''; saveOpt(); renderDock(); if (app.sim && app.sim.pilot) renderCmd(); });      /* 휴대폰 길게 누르기 메뉴 막기 */
  }

  /* ================= 모달 · 학습 · 결과 ================= */
  /* 근무 인수인계: 자유 근무를 시작할 때 이전 관제사가 짧게 브리핑 → 「인수 확인」을 누르면 시작 */
  function handover(sim) {
    var f = sim.flow || {}, mine = sim.acs.filter(function (a) { return a.owner === 'me'; }), soon = (sim.sched || []).filter(function (s) { return s.t < sim.t + 600; }).length, L = sim.level.id, notes = [];
    if (sim.lvp) notes.push(ATC.T('저시정 절차(LVP) 운용 중'));
    if (L >= 2) notes.push(ATC.T('주파수가 붐비면 두 송신이 겹칠 수 있습니다(혼신 → 「Say again」)'));
    if (sim.coordOn && sim.coordOn()) notes.push({ TWR: ATC.T('이륙 전에 Approach의 출발 승인(release)을 받습니다 — 이 게임은 편마다 받는 운용을 연습합니다(실제 적용 조건은 기관 간 협정)'), GND: ATC.T('활주로 횡단은 Tower와 협조한 뒤 허가합니다'), APP: ATC.T('Tower에서 착륙 간격 요청이 올 수 있습니다') }[sim.mode] || '');
    if (L >= 2 && (sim.mode === 'TWR' || sim.mode === 'APP')) notes.push(ATC.T('바람이 바뀌면 새 ATIS가 나옵니다 — 주파수의 항공기에 알립니다'));
    var rws = (sim.rwys || f.arrs || []).join(' · ') || sim.arrRwy || '';
    var rows = [[ATC.T('운용'), (f.label || '') + (rws ? ' — ' + rws : '')], [ATC.T('바람 · QNH'), fmt.wind(sim.wind) + ' · QNH ' + sim.qnh + ' · ATIS ' + sim.atis], [ATC.T('관할 중'), ATC.T('{0}대', mine.length) + (mine.filter(function (a) { return a.waiting; }).length ? ATC.T(' · 응답 기다리는 항공기 {0}대', mine.filter(function (a) { return a.waiting; }).length) : '')], [ATC.T('10분 안에 들어올 교통'), ATC.T('{0}대', soon)]];
    var shut = Object.keys(sim.rwClosed || {}).filter(function (k) { return sim.rwClosed[k] > sim.t; }).map(function (k) { return D.rw && D.rw[k] ? D.rw[k].a + '/' + D.rw[k].b : k; });      /* 지금 닫힌 활주로도 넘겨줌(GPT 10차 R10-05) */
    rows.push([ATC.T('폐쇄 · 설비'), shut.length ? ATC.T('활주로 {0} 폐쇄 중', shut.join(' · ')) : ATC.T('이상 없음')]);
    var h = ATC.T('<div class="mhead"><span class="pen">HANDOVER · {0}</span><h2>근무 인수인계</h2></div>', app.pos.id) + '<div class="mbody"><table class="sbrief hov">' + rows.map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</table>' + (notes.filter(Boolean).length ? ATC.T('<h4>주의 사항</h4>') + '<ul class="bl">' + notes.filter(Boolean).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' : '') + ATC.T('<p class="snote">실제 인수인계에서는 교통 하나하나의 상태 · 진행 중인 조정 · 설비 이상까지 넘겨줍니다. 이 창은 그 가운데 핵심만 간추린 것입니다.</p>') + '</div>' + ATC.T('<div class="mfoot"><span class="sp"></span><button class="btn pri" id="hovOk">인수 확인 — 근무 시작</button></div>');
    app.paused = true; openModal(h);
    var b = $('hovOk'); if (b) b.onclick = function () { closeModal(); if (!app.packHold) app.paused = false; };
  }
  function openModal(html) { $('modalBox').innerHTML = html; $('modal').hidden = false; }
  function closeModal() { $('modal').hidden = true; }
  function openLearn(id) {
    var s = ATC.LEARN_BY[id] || ATC.LEARN[0];
    openModal(ATC.T('<div class="mhead"><h2>학습 노트</h2></div><div class="mbody learn"><nav>{0}</nav><article><h3>{1}</h3>{2}</article></div><div class="mfoot"><span class="sp"></span>{3}</div>', ATC.LEARN.map(function (x) { return '<button data-m="tab" data-les="' + x.id + '" class="' + (x.id === s.id ? 'on' : '') + '">' + x.t + '</button>'; }).join(''), s.t, s.h, (app.over ? ATC.T('<button class="btn" data-m="lobby">로비로</button><button class="btn pri" data-m="result">평가로 돌아가기</button>') : ATC.T('<button class="btn pri" data-m="close">닫기</button>'))));
  }
  function showResult() {
    endPlay();
    var sim = app.sim, sc = sim.score(), rec = load(REC_KEY, {}), key = app.pos.id + sim.level.id, r = rec[key] || { best: 0, grade: '-', n: 0 };
    var xo = app.xo, early = !sim.endless && !sim.fatal && !(sim.isFinished && sim.isFinished()), xr = '';
    var scn = app.scn, st = scn ? ATC.scnStars(scn, sim, early) : null, srec = scn ? load(SCN_KEY, {}) : null, sr = scn ? srec[scn.id] || { st: [0, 0, 0], best: 0, n: 0 } : null;
    if (early) { sc.grade = '–'; } else if (!app.recSaved) {
      app.recSaved = true;
      if (scn) { sr.n++; sr.best = Math.max(sr.best, sc.total); sr.st = [0, 1, 2].map(function (i) { return sr.st[i] || st[i] ? 1 : 0; }); srec[scn.id] = sr; save(SCN_KEY, srec); }      /* 시나리오 기록은 자유 근무 기록과 따로, 별은 한 번 딴 것을 유지 */
      else if (sim.pilot) { var pk = (sim.pilot.dep ? 'dep' : '') + sim.level.id, pr = load(PILOT_KEY, {}), pb = pr[pk] || { best: 0, n: 0 }; pb.n++; app.pxr = sc.total > pb.best ? ATC.T(' · 새 최고 기록') : ''; pb.best = Math.max(pb.best, sc.total); pr[pk] = pb; save(PILOT_KEY, pr); }      /* 조종사 체험 기록은 관제 자격과 따로 */
      else if (sim.endless) { var er = load(ENDLESS_KEY, {}), eb = er[key] || { best: 0, n: 0 }; eb.n++; xr = sc.handled > eb.best ? ATC.T(' · 새 최고 기록') : ''; eb.best = Math.max(eb.best, sc.handled); er[key] = eb; save(ENDLESS_KEY, er); }      /* 무한 근무는 처리 대수로만 기록 */
      else {
        var r0 = rating(rec, app.pos.id);
        r.n++; if (sc.total >= r.best) { r.best = sc.total; r.grade = sc.grade; }
        if (sim.level.id >= 2 && sc.total >= 85 && sc.S === 0 && !sc.fatal) r.chk = 1;
        if (sim.level.id === 3 && sc.total >= 95 && sc.S === 0 && !sc.fatal) r.ins = 1;
        rec[key] = r; save(REC_KEY, rec);
        var r1 = rating(rec, app.pos.id); if (r1 > r0) xr = ATC.T('<div class="rup r{0}">{1} — <b>{2}</b> 등급을 땄습니다</div>', r1, app.pos.nm, RATE_NM()[r1]);
        if (xo && xo.daily) { var dr = load(DAILY_KEY, {}); if (dr.ds !== xo.ds) { dr.ds = xo.ds; dr.best = 0; dr.n = 0; } dr.n++; dr.best = Math.max(dr.best, sc.total); dr.days = (dr.days || []).filter(function (x) { return x !== xo.day && x > xo.day - 60; }).concat([xo.day]); save(DAILY_KEY, dr); }
      }
    }
    app.aq = []; if (window.speechSynthesis) speechSynthesis.cancel(); ATC.Radio.stop(); hideInst();
    var neg = sim.incs.filter(function (i) { return i.pts < 0; }), pos = sim.incs.filter(function (i) { return i.pts > 0; }), by = {};
    neg.forEach(function (i) { (by[i.code] = by[i.code] || { def: i, list: [] }).list.push(i); });
    var rows = Object.keys(by).sort(function (a, b) { return by[a].def.pts - by[b].def.pts; }).map(function (k) { var g = by[k], sum = g.list.reduce(function (s, x) { return s + x.pts; }, 0); return ATC.T('<div class="ri {0}"><div class="rh"><b>{1}</b><span>{2}건 · {3}점</span>{4}</div><ul>{5}{6}</ul></div>', g.def.cat, g.def.title, g.list.length, sum, (g.def.les ? ATC.T('<button class="lk" data-m="learn" data-les="{0}">학습 노트 보기</button>', g.def.les) : ''), g.list.slice(0, 6).map(function (x) { return '<li><time>' + U.hhmm(x.utc) + '</time> ' + esc(x.text) + '</li>'; }).join(''), (g.list.length > 6 ? ATC.T('<li>… 외 {0}건</li>', (g.list.length - 6)) : '')); }).join('');
    var eb2 = sim.endless ? (load(ENDLESS_KEY, {})[key] || { best: 0 }) : null;
    var pl = sim.pilot, prt = pl && pl.rt.length ? Math.round(pl.rt.reduce(function (x, y) { return x + y; }, 0) / pl.rt.length) : 0;
    var msg = pl && !early ? ATC.T('조종사 체험 끝 — 복창 {0} / {1}회 정확 · 평균 복창 {2}초{3}.', pl.nRbOk, pl.nRb, prt, app.pxr || '') : sim.endless ? (sc.fatal ? ATC.T('중대 사고로 무한 근무가 끝났습니다 — 처리 {0}대.', sc.handled) : ATC.T('무한 근무 종료 — {0}대 처리 (최고 {1}대){2}.', sc.handled, eb2.best, xr)) : early ? ATC.T('근무를 중도에 종료했습니다(잔여 항공기 {0}대). 기록에는 반영하지 않습니다.', (sim.acs.length + sim.sched.length)) : sc.fatal ? ATC.T('중대 사고로 근무가 중단됐습니다.') : sc.grade === 'S' ? ATC.T('완벽에 가까운 근무였습니다.') : sc.grade === 'A' ? ATC.T('안정적인 근무였습니다.') : sc.grade === 'B' ? ATC.T('큰 문제 없이 마쳤습니다. 아래 항목을 보완해 보세요.') : ATC.T('기준에 미달했습니다. 감점 항목의 학습 노트를 확인하세요.');
    if (scn) { openModal(ATC.T('<div class="mhead"><span class="pen">SCENARIO {1} · {0}</span><h2>{17} <small>시나리오 평가</small></h2></div><div class="mbody result"><div class="rtop"><div class="grade g{2}">{3}</div><div class="rsum"><div class="rscore">{4}<small> / 100</small></div><p>{5}</p><div class="rk"><span class="k s">안전 {6}</span><span class="k e">효율 {7}</span><span class="k p">절차·교신 {8}</span><span class="k b">가점 +{9}</span></div><p class="rmeta">처리 {10}대 · 근무 시간 {11}분 · 최고 기록 {12}점{13}</p></div></div>{18}{14}{15}{19}</div><div class="mfoot"><button class="btn" data-m="learn" data-les="{16}">학습 노트</button><span class="sp"></span><button class="btn" data-m="scnlist">목록</button><button class="btn pri" data-m="scnagain">재도전</button></div>', app.pos.en, scn.no, sc.grade, sc.grade, sc.total, msg, sc.S, sc.E, sc.P, sc.bonus, sc.handled, Math.round(sim.t / 60), Math.max(sr.best, early ? 0 : sc.total), (app.coach ? ATC.T(' · 코치 사용') : ''), (rows ? ATC.T('<h4>감점 항목</h4>{0}', rows) : ATC.T('<p class="clean">감점 없이 마쳤습니다.</p>')), (pos.length ? ATC.T('<h4>잘한 점</h4><ul class="good">{0}</ul>', pos.map(function (x) { return '<li>' + esc(x.text) + ' (+' + x.pts + ')</li>'; }).join('')) : ''), app.pos.les, scn.title,
      ATC.T('<div class="sres"><h4>별 {0} / 3</h4><ul>{1}</ul></div>', st[0] + st[1] + st[2], [[ATC.T('안전'), ATC.T('안전 감점 없음')], [ATC.T('목표'), scn.goal.t], [ATC.T('효율'), ATC.T('{0}점 이상', scn.eff)]].map(function (g, i) { return '<li class="' + (st[i] ? 'on' : '') + '"><i>★</i><b>' + g[0] + '</b> ' + g[1] + '</li>'; }).join('')),
      ATC.T('<h4>디브리핑 — 핵심 포인트</h4><ul class="stips">{0}</ul>', scn.tips.map(function (t) { return '<li>' + t + '</li>'; }).join('')) + resultExtra(sim))); return; }
    openModal(ATC.T('<div class="mhead"><span class="pen">{0} · {1}</span><h2>근무 평가</h2></div><div class="mbody result">{17}<div class="rtop"><div class="grade g{2}">{3}</div><div class="rsum"><div class="rscore">{4}<small> / 100</small></div><p>{5}</p><div class="rk"><span class="k s">안전 {6}</span><span class="k e">효율 {7}</span><span class="k p">절차·교신 {8}</span><span class="k b">가점 +{9}</span></div><p class="rmeta">처리 {10}대 · 근무 시간 {11}분 · 최고 기록 {12}점{13}</p></div></div>{14}{15}</div><div class="mfoot"><button class="btn" data-m="learn" data-les="{16}">학습 노트</button><span class="sp"></span><button class="btn" data-m="lobby">로비로</button><button class="btn" data-m="same">같은 조건으로 재도전</button><button class="btn pri" data-m="again">새 근무</button></div>', app.pos.en, sim.level.ko, sc.grade, sc.grade, sc.total, msg, sc.S, sc.E, sc.P, sc.bonus, sc.handled, Math.round(sim.t / 60), r.best, (app.coach ? ATC.T(' · 코치 사용') : ''), (rows ? ATC.T('<h4>감점 항목</h4>{0}', rows) : ATC.T('<p class="clean">감점 없이 마쳤습니다.</p>')), (pos.length ? ATC.T('<h4>잘한 점</h4><ul class="good">{0}</ul>', pos.map(function (x) { return '<li>' + esc(x.text) + ' (+' + x.pts + ')</li>'; }).join('')) + resultExtra(sim) : resultExtra(sim)), app.pos.les, (sim.endless ? '' : xr) + (xo && xo.daily ? ATC.T('<div class="rup daily">오늘의 과제 {0} — 오늘 최고 {1}점 · 연속 {2}일</div>', String(xo.ds).replace(/(\d{4})(\d\d)(\d\d)/, '$1.$2.$3'), (load(DAILY_KEY, {}).best || sc.total), streak(load(DAILY_KEY, {}), xo.day)) : '')));
    if (pl && pl.land) { var rt0 = document.querySelector('.mbody.result .rtop'), L = pl.land; if (rt0) rt0.insertAdjacentHTML('afterend', '<div class="pland"><h4>' + ATC.T('착륙 평가 — {0}', esc(L.word || '')) + '</h4><ul>' +
      [[ATC.T('접지 순간 강하율'), -L.vs + ' ft/min', -L.vs <= 420 ? 'g' : -L.vs <= 600 ? 'm' : 'b'], [ATC.T('중심선'), Math.abs(L.cl) + ' ft ' + (L.cl > 0 ? ATC.T('오른쪽') : L.cl < 0 ? ATC.T('왼쪽') : ''), Math.abs(L.cl) <= 15 ? 'g' : Math.abs(L.cl) <= 35 ? 'm' : 'b'], [ATC.T('접지 거리(시단부터)'), L.dist + ' ft', L.dist >= 500 && L.dist <= 2500 ? 'g' : L.dist <= 3500 ? 'm' : 'b'], [ATC.T('접지 속도'), L.ias + ' kt (Vref ' + L.vref + ')', L.ias >= L.vref - 5 && L.ias <= L.vref + 20 ? 'g' : 'b'], [ATC.T('기수 각 · 경사'), L.pitch + '° · ' + Math.abs(L.bank) + '°', L.pitch >= 0 && L.pitch <= 9.5 && Math.abs(L.bank) <= 7 ? 'g' : 'b'], [ATC.T('접지 시 기수 정렬각'), Math.abs(L.crab) + '°', Math.abs(L.crab) <= 8 ? 'g' : 'm']].map(function (r) { return '<li class="' + r[2] + '"><b>' + r[0] + '</b><span>' + r[1] + '</span></li>'; }).join('') + '</ul><p>' + ATC.T('이 게임의 착륙 평가 목표: 접지 순간 강하율 100 ~ 400ft/min · 중심선 15ft 안 · 시단에서 1,000 ~ 2,500ft · Vref ~ Vref+10kt · 기수 2 ~ 6°. 등급 숫자는 게임 기준이며 실제 운항 · 정비 기준이 아닙니다.') + '</p></div>'); }      /* 직접 착륙 평가 */
    if (pl && !pl.dep && pl.gaLog && pl.gaLog.length) { var rt3 = document.querySelector('.mbody.result .rtop'), GS = { pilot: ATC.T('조종사 판단'), twr: ATC.T('관제탑 지시'), fo: ATC.T('관제탑 지시 — 부기장이 TO/GA'), sys: ATC.T('접근 계속 불가'), dh: ATC.T('결심 고도에서 판단'), dhfo: ATC.T('결심 고도 — 판단 없어 부기장이 TO/GA'), dhbad: ATC.T('결심 고도 — 보이지 않는데 착륙 선택') }; if (rt3) rt3.insertAdjacentHTML('afterend', '<div class="pland"><h4>' + ATC.T('복행 · 재접근') + ' — ' + ATC.T('{0}회', pl.gaLog.length) + '</h4><ul>' +
      pl.gaLog.map(function (g) { return '<li class="' + (g.src === 'fo' || g.cfg === 'fo' ? 'b' : g.cfg === 'ok' ? 'g' : 'm') + '"><b>' + ATC.T('{0}번째 — 활주로 {1} · {2}ft', g.n, g.rwy, g.ra) + '</b><span>' + (GS[g.src] || '') + (g.unst ? ' · ' + ATC.T('불안정 접근') : '') + ' · ' + (g.cfg === 'ok' ? ATC.T('플랩 20 · 기어 올림 제때') : g.cfg === 'fo' ? ATC.T('플랩 · 기어를 부기장이') : ATC.T('형태 미완')) + '</span></li>'; }).join('') +
      '<li class="' + (pl.roll ? 'g' : 'b') + '"><b>' + ATC.T('재접근') + '</b><span>' + (pl.roll ? ATC.T('착륙') : pl.gaN > 2 ? ATC.T('세 번째 복행에서 체험 끝') : ATC.T('착륙하지 못함')) + '</span></li></ul><p>' + ATC.T('복행 순서(게임): TO/GA → 플랩 20 → 상승 확인(Positive rate) 뒤 기어 올림 → 관제에 「going around」 보고 → 이양 지시 · Approach 첫 호출 → 레이더 유도. Approach가 기수를 줄 때까지는 공시 복행 절차(차트의 기수 · 선회 높이 · 복행 고도)를 따릅니다. 15초 기준 · 세 번째 복행에서 끝은 게임값입니다.') + '</p></div>'); }
    if (pl && pl.dep && pl.sidR && pl.sidR.some(function (r) { return r.st; })) { var rt2 = document.querySelector('.mbody.result .rtop'), SV = { ok: [ATC.T('지킴'), 'g'], x: [ATC.T('취소됨(새 고도 · 경로 지시)'), 'm'], clr: [ATC.T('허가 고도가 낮아 못 지킴'), 'm'], low: [ATC.T('미달'), 'b'], high: [ATC.T('초과'), 'b'], skip: [ATC.T('지나지 않음'), 'm'] }; if (rt2) rt2.insertAdjacentHTML('afterend', '<div class="pland"><h4>' + ATC.T('SID 고도 제한') + ' — ' + esc(pl.sid || '') + (pl.transName && pl.transName() ? ' · ' + esc(pl.transName()) + ' transition' : '') + '</h4><ul>' +
      pl.sidR.filter(function (r) { return r.st; }).map(function (r) { var q = SV[r.st] || ['', 'm']; return '<li class="' + q[1] + '"><b>' + r.fix + ' ' + ATC.DepPilot.rTxt(r) + '</b><span>' + (r.at !== undefined ? ATC.T('통과 {0}', fmt.alt(r.at)) + ' · ' : '') + q[0] + '</span></li>'; }).join('') + '</ul><p>' + ATC.T('≥ 이상 · ≤ 이하 · 숫자만 = 그 고도. 「climb via SID to」를 받으면 제한이 유효하고, 새 고도나 경로를 지시받으면 남은 제한은 모두 취소됩니다(AIP ENR 1.5). 허용 오차 200ft는 게임값입니다.') + '</p></div>'); }      /* SID 고도 제한 결과 */
    if (pl && pl.dep && pl.to) { var rt1 = document.querySelector('.mbody.result .rtop'), T0 = pl.to; if (rt1) rt1.insertAdjacentHTML('afterend', '<div class="pland"><h4>' + ATC.T('직접 이륙 평가 — 피치 조작') + '</h4><ul>' +
      [[ATC.T('기수 들기 시작 속도(rotation)'), T0.rs + ' kt (VR ' + T0.vr + ')', T0.rs >= T0.vr - 3 && T0.rs <= T0.vr + 8 ? 'g' : 'b'], [ATC.T('평균 기수 회전율'), ATC.T('초당 {0}°', T0.rate), T0.rate >= 1.5 && T0.rate <= 3.2 ? 'g' : 'b'], [ATC.T('이륙 순간 피치각 · 속도'), T0.lofP + '° · ' + T0.lofIas + ' kt', 'g'], [ATC.T('이륙 전 지상 최대 피치각'), T0.maxG + '° (' + ATC.T('게임의 테일 스트라이크 판정 {0}°', 10) + ')', T0.tail ? 'b' : T0.maxG > 9.5 ? 'm' : 'g']].concat(T0.minIas ? [[ATC.T('자동조종까지 가장 느린 속도'), T0.minIas + ' kt (V2 ' + T0.v2 + ')', T0.minIas >= T0.v2 ? 'g' : 'b'], [ATC.T('V2+5 ~ V2+35kt 밖에 있던 시간'), ATC.T('{0}초', T0.badT), T0.badT < 5 ? 'g' : 'm']] : []).map(function (r) { return '<li class="' + r[2] + '"><b>' + r[0] + '</b><span>' + r[1] + '</span></li>'; }).join('') + '</ul><p>' + ATC.T('이 게임의 기준: VR ~ VR+8kt에서 기수 들기 시작 · 평균 초당 1.5 ~ 3.2° · 바퀴가 닿은 채 10° 넘지 않기 · 이륙 후 V2+15kt 안팎. 실제 787 참고값은 회전율 약 2 ~ 2.5°/s, 이륙 순간 피치각 약 6 ~ 7.5°, 초기 상승 V2+15 ~ 25kt입니다. 10°는 게임 판정값이며 실제 접촉각은 착륙장치 상태에 따라 달라집니다. 피치 조작만 체험하는 것으로, 추력 · 좌우 방향 · 옆바람은 재현하지 않습니다.') + '</p></div>'); }      /* 직접 이륙 평가 */
    if (pl) { var mh = document.querySelector('#modal .mhead'), rm = document.querySelector('.mbody.result .rmeta'), pr0 = load(PILOT_KEY, {})[(pl.dep ? 'dep' : '') + sim.level.id]; if (mh) mh.innerHTML = '<span class="pen">PILOT · ' + (pl.dep ? (pl.stage === 4 ? ATC.T('{apt} 출발편 — 순항까지') : ATC.T('{apt} 출발편 {0}단계까지', pl.stage || 1)) : esc(D.freq.APP.n)) + ' · ' + sim.level.ko + '</span><h2>' + ATC.T('조종사 체험 평가') + '</h2>'; if (rm) rm.textContent = ATC.T('체험 시간 {0}분 · 최고 기록 {1}점', Math.round((sim.t + (pl.tAcc || 0)) / 60), pr0 ? pr0.best : sc.total) + (pl.dep && pl.fp ? ' · ' + pl.cs + ' → ' + (pl.fp.destName || pl.fp.dest) + ' · ' + (pl.sid || '') + ' · RWY ' + pl.rwyFor(pl.fp.gate) + ' · FL' + Math.round(pl.fp.rfl / 100) : ''); }      /* 조종사 체험: 제목 · 기록 줄 */
    if (sim.endless) { var gb = document.querySelector('.mbody.result .grade'), rsc = document.querySelector('.mbody.result .rscore'); if (gb) { gb.textContent = '∞'; gb.className = 'grade gA'; } if (rsc) rsc.innerHTML = sc.handled + '<small> ' + ATC.T('대 처리') + '</small>'; }      /* 무한 근무는 처리 대수가 기록 */
  }
  /* 결과 화면 보강: 교통량 흐름 그래프 · 아까웠던 순간 3가지 · 교신 통계 */
  function resultExtra(sim) {
    var h = '', smp = (sim.smp || []).slice(), n, W = 600, H = 96;
    if (smp.length && sim.t - smp[smp.length - 1][0] > 20) smp.push([Math.round(sim.t), sim.acs.filter(function (a) { return a.owner === 'me'; }).length]);
    n = smp.length;
    if (n >= 3) {
      var tE = Math.max(60, sim.t), mx = Math.max(3, Math.max.apply(null, smp.map(function (p) { return p[1]; }))), X = function (t) { return 8 + t / tE * (W - 16); }, Y = function (c) { return H - 16 - c / mx * (H - 30); };
      var line = smp.map(function (p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join(' ');
      var ticks = sim.incs.filter(function (e) { return e.pts < 0; }).map(function (e) { return '<line class="c' + e.cat + '" x1="' + X(e.t).toFixed(1) + '" x2="' + X(e.t).toFixed(1) + '" y1="' + (H - 12) + '" y2="' + (H - 3) + '"/>'; }).join('');
      var pk = smp.reduce(function (a, p) { return p[1] > a[1] ? p : a; }, smp[0]);
      h += ATC.T('<h4>교통량 흐름</h4>') + '<div class="rgraph"><svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><polygon class="ar" points="' + X(smp[0][0]).toFixed(1) + ',' + Y(0) + ' ' + line + ' ' + X(smp[n - 1][0]).toFixed(1) + ',' + Y(0) + '"/><polyline class="ln" points="' + line + '"/>' + ticks + '<circle class="pk" cx="' + X(pk[0]).toFixed(1) + '" cy="' + Y(pk[1]).toFixed(1) + '" r="3.5"/></svg>' +
        '<p class="rgcap">' + ATC.T('선 = 맡고 있던 항공기 수(1분마다) · 가장 바빴던 때 {0}분째 {1}대 · 아래 눈금 = 감점이 난 때(빨강 안전 · 주황 효율 · 파랑 절차)', Math.round(pk[0] / 60), pk[1]) + '</p></div>';
    }
    var top = sim.incs.filter(function (e) { return e.pts < 0; }).sort(function (a, b) { return a.pts - b.pts || a.t - b.t; }).slice(0, 3);
    if (top.length) h += ATC.T('<h4>아까웠던 순간</h4>') + '<ol class="rtop3">' + top.map(function (e) { return '<li class="' + e.cat + '"><time>' + U.hhmm(e.utc) + ' · ' + ATC.T('{0}분째', Math.floor(e.t / 60)) + '</time><b>' + esc(e.title) + ' <span>' + e.pts + '</span></b>' + (e.text && e.text !== e.title ? '<p>' + esc(e.text) + '</p>' : '') + '</li>'; }).join('') + '</ol>';
    var rs = sim.rs;
    if (rs && (rs.atc + rs.plt) > 0) {
      var avg = rs.rt.length ? rs.rt.reduce(function (s, x) { return s + x; }, 0) / rs.rt.length : 0, slow = rs.rt.filter(function (x) { return x > 20; }).length;
      h += ATC.T('<h4>교신 통계</h4>') + '<div class="rstat">' + [[rs.atc, ATC.T('관제 송신')], [rs.plt, ATC.T('조종사 송신')], [Math.round(Math.min(100, rs.air / Math.max(1, sim.t) * 100)) + '%', ATC.T('주파수 점유')], [rs.rt.length ? avg.toFixed(1) + ATC.T('초') : '–', ATC.T('평균 응답 시간')], [slow, ATC.T('20초 넘긴 응답')], [rs.blk, ATC.T('혼신')]].concat(sim.mic && sim.mic.n ? [[sim.mic.n, ATC.T('마이크 송신')], [Math.round(sim.mic.sum / sim.mic.n) + '%', ATC.T('표준 문구 일치')]] : []).map(function (x) { return '<span><b>' + x[0] + '</b>' + x[1] + '</span>'; }).join('') + '</div>' +
        '<p class="rgcap">' + ATC.T('응답 시간 = 조종사가 먼저 부른 뒤 관제사가 그 항공기에 처음 답하기까지 걸린 시간') + '</p>';
    }
    return h;
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
  /* 교관 동석: 꼭 해야 할 일이 생기면 멈추고 알려 줌 */
  function instCheck(ts) {
    var c = app.sim.coach(), top = c[0]; if (!top || top.p < 6) return;
    var key = top.ac + '|' + top.t.replace(/[\d.]+/g, '#'); if (app.instSeen[key]) return; app.instSeen[key] = 1;
    app.paused = true; app.instOn = true; select(top.ac); $('instText').textContent = top.t;
    var say = '', ac = app.sim.byId(top.ac);
    if (top.c && ac) { try { var ph = ATC.phrase(app.sim, ac, top.c); if (ph && ph.atc) say = '<div class="isay"><i>' + ATC.T('표준 교신 문구') + '</i>' + esc(ph.atc) + '<small>' + esc(ATC.gloss(ph.atc)) + '</small></div>'; } catch (err) { say = ''; } }
    $('instSay').innerHTML = say; $('inst').className = 'show';
  }
  /* 소리 시험: 무선 음성을 한 번 틀고, 안 되면 까닭을 화면에 적음 */
  /* 문제 확인용 한 줄(화면을 찍어 보내면 원인을 가릴 수 있게): 소리 장치 상태 · 받은 묶음 · 표본율 · 무음 스위치 우회 · 소리 종류 · 음성 합성 유무 */
  function diagLine() { var d = ATC.Radio.diag(); return '[' + [d.ctx, d.packs, d.rate, 'm:' + d.sil, 's:' + d.ses, 't:' + (window.speechSynthesis ? speechSynthesis.getVoices().length : 'x'), ATC.aptId].join(' · ') + (d.err ? ' · ' + d.err : '') + ']'; }
  function soundTest() {
    var el = $('soundMsg'), RD = ATC.Radio, n = 0;
    if (!packOn()) {   /* 표준 음성 */
      RD.init(); el.className = 'show';
      var ok = tts({ who: 'atc', text: 'VELA 301, runway 07L, cleared to land, wind 040 at 10.', cs: 'VLA301' }, function () { tts({ who: 'pilot', text: 'Runway 07L, cleared to land, VELA 301.', cs: 'VLA301' }); });
      el.textContent = ok ? ATC.T('표준 음성(브라우저의 영어 음성 + 무선 잡음)을 재생했습니다. 들리지 않으면 ① 브라우저 탭·사이트 음소거 ② PC 소리 장치·음량 ③ PC에 영어 음성이 설치돼 있는지 확인해 주세요.') : ATC.T('이 브라우저에는 음성 합성 기능이 없습니다. 크롬이나 엣지에서 열어 주세요.'); el.textContent += ' ' + diagLine();
      return;
    }
    RD.loadAll(); el.className = 'show'; el.textContent = ATC.T('음성을 읽어 들이는 중…');
    var RW = D.flows[Object.keys(D.flows)[0]].arr, T1 = 'VELA 301, runway ' + RW + ', cleared to land, wind 040 at 10.', T2 = 'Runway ' + RW + ', cleared to land, VELA 301.';      /* 이 공항의 활주로 이름으로(다른 공항의 이름은 녹음 조각에 없음) */
    (function go() {
      var d = RD.diag(), sec = 0, can = RD.plan(T1, 'atc', 'VLA301') && RD.plan(T2, 'pilot', 'VLA301');
      can = RD.plan(T1, 'atc', 'VLA301');      /* 관제사 목소리만 준비되면 바로 들려줌(조종사 목소리는 받는 대로) */
      if (!can && !RD.ready() && n++ < 1200 && d.ctx !== 'none' && !d.err && ATC.VPARTS) { el.textContent = ATC.T('무선 음성을 내려받는 중입니다 {0} — 관제사 음성부터 받아 준비되는 대로 재생합니다. 처음 한 번은 시간이 걸립니다.', d.packs); setTimeout(go, 250); return; }
      if (can) sec = RD.speak(T1, 'atc', 'VLA301', false);
      if (sec > 0) { el.textContent = ATC.T('무선 음성을 재생했습니다(약 {0}초). 들리지 않으면 ① 휴대폰은 매체 음량과 무음 스위치 ② 브라우저 탭·사이트 음소거 ③ PC 소리 장치·음량을 확인해 주세요.', Math.round(sec)) + ' ' + diagLine(); var pt = 0; setTimeout(function pl() { if (!RD.speak(T2, 'pilot', 'VLA301', false) && !RD.ready() && pt++ < 240) setTimeout(pl, 500); }, sec * 1000 + 250); return; }
      d = RD.diag();
      var why = d.ctx === 'none' ? ATC.T('이 브라우저에서 오디오 장치를 열 수 없습니다{0}', (d.err ? '(' + d.err + ')' : '')) : d.ctx !== 'running' ? ATC.T('브라우저가 소리 재생을 차단하고 있습니다(상태: {0}). 화면을 한 번 누른 뒤 다시 테스트해 주세요', d.ctx) : !can ? ATC.T('음성 파일(assets/voice)을 읽지 못했습니다 — {0}{1}', d.packs, (d.err ? ' / ' + d.err : '')) : ATC.T('음성 데이터가 부족합니다{0}', (d.err ? '(' + d.err + ')' : ''));
      el.textContent = ATC.T('무선 음성 재생 실패: {0}. 브라우저 기본 음성으로 대신 읽습니다.', why) + ' ' + diagLine();
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
    try { app.resume0 = JSON.parse(sessionStorage.getItem(RESUME_K) || 'null'); } catch (e) { }      /* 새로고침 전에 하던 근무(로비를 그리면 지워짐) */
    applyStatic(); if (ATC.learnInit) ATC.learnInit();
    if (/[?&]guide=1/.test(location.search)) {   /* 그림 의뢰용 배치도: 글자 없이 지형만 */
      document.body.innerHTML = '<canvas id="g" width="3200" height="2000" style="display:block"></canvas>'; document.body.style.overflow = 'auto';
      var gc = document.getElementById('g').getContext('2d'), SAT = D.guide || { u1: -2400, u2: 2400, v1: -1500, v2: 1500 };
      R.drawGround(gc, 3200, 2000, { guide: true, sel: 0, hit: [], view: { cu: (SAT.u1 + SAT.u2) / 2, cv: (SAT.v1 + SAT.v2) / 2, scale: 3200 / (SAT.u2 - SAT.u1) }, sim: { acs: [], t: 0, mode: 'GUIDE', flow: D.flows[Object.keys(D.flows)[0]], rwClosed: {}, net: { closed: {} }, byId: function () { return null; }, finals: function () { return []; } } });
      return;
    }
    if (ATC.VPARTS && D.voice && D.voice.parts) ATC.VPARTS = D.voice.parts;
    if (D.lobby) { var hero = document.querySelector('.hero'); if (hero) hero.style.backgroundImage = 'linear-gradient(90deg,rgba(7,11,16,.96) 0,rgba(7,11,16,.72) 55%,rgba(7,11,16,.35) 100%),url("' + (ATC.base || '') + D.lobby + '"),repeating-radial-gradient(circle at 84% 40%,transparent 0 58px,rgba(79,216,255,.07) 58px 59px)'; }   /* 공항마다 첫 화면 배경 */   /* 이 공항만의 음성 묶음(음성 파일을 올리지 않은 사이트판에서는 ATC.VPARTS가 없어 그대로 브라우저 음성) */
    bind(); if (!(D.sat && D.sat.img === null)) R.loadSat((ATC.base || '') + ((D.sat && D.sat.img) || 'assets/img/ground_sat.webp'));
    (function () { var t = document.querySelector('script[src*="js/render.js"]'), m = t && /[?&]v=([^&]+)/.exec(t.getAttribute('src')); R.loadGeo((ATC.base || '') + 'js/geo/' + String(ATC.aptId || 'XSRA').toLowerCase() + '.js' + (m ? '?v=' + m[1] : '')); })();   /* 주변 지리는 고른 공항 것만 내려받음 */ showLobby(); requestAnimationFrame(frame);
    var q = /[?&]auto=([A-Z]{3})(\d)?(?:&seed=(\d+))?/.exec(location.search), qf = /[?&]flow=([A-Z])\b/.exec(location.search); if (q && qf && D.flows[qf[1]]) app.flow = qf[1]; if (q) { app.level = +(q[2] || 1); start(q[1], q[3] ? +q[3] : 0); }
    /* 시나리오: 공항을 바꿔 다시 읽은 뒤 고른 판의 안내를 엶. 주소의 ?scn=판이름(&go=1이면 바로 시작)은 시험용 */
    var qs = /[?&]scn=([a-z0-9-]+)/.exec(location.search), qx = qs && ATC.SCN_BY[qs[1]]; if (qx && qx.wip && window.ATC_SITE) qx = null;
    if (qx && qx.apt === ATC.aptId) { app.tab = 'scn'; app.tabSet = true; showLobby(); if (/[?&]go=1/.test(location.search)) start(qx.pos, qx.seed, qx); else scnBrief(qx.id); } else if (!q) scnPending();
    /* 휴대폰: 자막 칸 · 교신 기록 크게 단추 · 새로고침 대비 */
    var cp = document.createElement('div'); cp.id = 'cap'; cp.hidden = true; $('scope').appendChild(cp); setInterval(function () { if (caps.length) capDraw(); }, 1000);
    var lb = document.createElement('button'); lb.id = 'bLogBig'; lb.type = 'button'; lb.textContent = ATC.T('⤢ 크게'); lb.addEventListener('click', function () { setLogBig(!app.logBig); app.cmdSig = ''; }); $('log').querySelector('h5').appendChild(lb);
    window.addEventListener('beforeunload', function (e) { if (app.sim && !app.over && !app.sim.over && !$('game').hidden) { e.preventDefault(); e.returnValue = ''; return ''; } });      /* 근무 중 새로고침 · 닫기: 브라우저가 한 번 물음(휴대폰은 브라우저에 따라 안 물을 수 있음) */
    if (!q && !(qx && qx.apt === ATC.aptId)) resumeOffer();
  });
  ATC.ui = { redraw: function () { app.cmdSig = ''; }, sim: function () { return app.sim; }, start: start, select: select, showLobby: showLobby, showResult: showResult, openLearn: openLearn, briefing: briefing, addPend: addPend, sendPend: sendPend, openModal: openModal, closeModal: closeModal, tts: tts, micHandle: micHandle };
})();
