/* AIRLINE SAGA — ATC 교신 해석: 영어 교신 문구를 한국어 뜻으로(학습용 풀이 — 실제 교신은 영어) */
(function (G) {
  'use strict';
  var ATC = G.ATC, AP = ATC.D.airport;
  var FAC = { Delivery: '비행허가', Ground: '지상관제', Tower: '관제탑', Approach: '접근관제', Departure: '출발관제', Control: '지역관제' };
  var DIR = { west: '서', east: '동', north: '북', south: '남', left: '좌', right: '우' };
  var A = '(FL\\d+|\\d{1,2},\\d{3}|\\d{3,5})';
  function AK(x) { return /^FL/i.test(x) ? x.toUpperCase() : x + '피트'; }   /* 고도 풀이: FL은 그대로, 그 밖은 피트를 붙임 */
  var T = [
    [/MAYDAY, MAYDAY, MAYDAY/g, '메이데이(조난)'], [/PAN-PAN, PAN-PAN, PAN-PAN/g, '팬팬(긴급)'],
    [/cleared to (.+?) airport via (\w+ \w+) departure, flight planned route, maintain (FL\d+|\d{1,2},\d{3}), squawk (\d+)/gi, '$1 공항까지 허가 — $2 출발 절차, 계획한 경로, $3 유지, 스쿼크 $4'],
    [/cleared to (.+?) via (\w+ \w+) departure, flight planned route, maintain (FL\d+|\d{1,2},\d{3}), squawk (\d+)/gi, '$1까지 허가 — $2 출발 절차, 계획한 경로, $3 유지, 스쿼크 $4'],
    [/request IFR clearance to ([^.,]+)/gi, '$1까지 계기비행 허가 요청'], [/flight plan has been filed, request clearance to ([^.,]+)/gi, '비행계획 접수됨, $1까지 허가 요청'],
    [/we copy runway change, request revised clearance/gi, '활주로 변경 확인, 재허가 요청'],
    [/stand by, flight plan not received, check with your dispatch/gi, '대기 — 비행계획 미접수, 운항관리에 확인 바람'],
    [/your calculated takeoff time is (\d+), expect start-up at (\d+)/gi, '이륙 지정 시각(CTOT) $1, 시동 예정 $2'], [/takeoff time (\d+), start-up at (\d+)/gi, '이륙 시각 $1, 시동 $2'],
    [/flight level (\d+) not available for your direction of flight, expect (FL\d+|[\d,]+) as final level/gi, 'FL$1은 비행 방향에 맞지 않음, 최종 고도는 $2 예정'],
    [/information (\w+) is now current, QNH (\d+)/gi, '현재 ATIS는 $1, QNH $2'], [/information (\w+), QNH (\d+)/gi, 'ATIS $1, QNH $2'], [/information (\w+)/gi, 'ATIS $1 수신'],
    [/readback correct/gi, '복창 맞음'], [/ready for pushback and start-up/gi, '푸시백·시동 준비 완료'],
    [new RegExp(AP.call + ' (Delivery|Ground|Tower|Approach|Departure|Control)', 'g'), function (m, a) { return AP.short + ' ' + FAC[a]; }], [/(Jade|Akitsu|Haneul|Coral) Control/g, '$1 지역관제'],
    [/turn (left|right) at ([\w ]+?), when vacated contact ground ([\d.]+)/gi, function (m, a, b, c) { return b + '에서 ' + DIR[a.toLowerCase()] + '회전, 활주로를 벗어난 뒤 지상관제(' + c + ')와 교신'; }], [/when vacated ground ([\d.]+)/gi, '활주로를 벗어난 뒤 지상관제($1)'],
    [/contact (.+?) (\d{3}\.\d+)/gi, '$1($2)와 교신'],
    [/turn left heading (\d+)/gi, '좌선회, 기수 $1'], [/turn right heading (\d+)/gi, '우선회, 기수 $1'], [/\bleft heading (\d+)/gi, '좌선회 기수 $1'], [/\bright heading (\d+)/gi, '우선회 기수 $1'], [/fly heading (\d+)/gi, '기수 $1'],
    [/runway heading, climbing (FL\d+|[\d,]+)/gi, function (m, a) { return '활주로 방향 기수 유지, ' + AK(a) + '까지 상승 중'; }], [/runway heading, (FL\d+|[\d,]+), request further instructions/gi, function (m, a) { return '활주로 방향 기수 유지, 고도 ' + AK(a) + ', 다음 지시 요청'; }], [/\bheading (\d+)/gi, '기수 $1'],
    [/expedite, /gi, '신속히 '], [/, expediting/gi, '(신속히)'],
    [new RegExp('(descend|climb) and maintain ' + A + ' until established(?: on the localizer)?', 'gi'), function (m, d, a) { return AK(a) + '까지 ' + (d.toLowerCase() === 'climb' ? '상승' : '강하') + ', 로컬라이저에 확립할 때까지 유지'; }], [new RegExp('maintain ' + A + ' until established(?: on the localizer)?', 'gi'), function (m, a) { return '로컬라이저에 확립할 때까지 ' + AK(a) + ' 유지'; }],
    [new RegExp('descend and maintain ' + A, 'gi'), function (m, a) { return AK(a) + '까지 강하 후 유지'; }], [new RegExp('climb and maintain ' + A, 'gi'), function (m, a) { return AK(a) + '까지 상승 후 유지'; }],
    [/reduce speed to (\d+) knots/gi, '속도 $1노트로 감속'], [/increase speed to (\d+) knots/gi, '속도 $1노트로 증속'], [/maintain speed (\d+) knots/gi, '속도 $1노트 유지'], [/resume normal speed|normal speed/gi, '정상 속도로'],
    [/reduce to minimum approach speed|minimum approach speed/gi, '최소 접근 속도로'], [/minimum speed (\d+) knots in this configuration/gi, '지금 형상의 최소 속도는 $1노트'], [/speed limit 250 knots below 10,000/gi, '10,000피트 아래는 250노트 제한'], [/\bspeed (\d+)/gi, '속도 $1'],
    [/clear of weather, request direct (\w+)/gi, '기상 구역 벗어남, $1 직행 요청'], [/proceed direct (\w+)/gi, '$1 직행'], [/\bdirect (\w+)/gi, '$1 직행'],
    [/cleared (?:for )?ILS runway (\w+) approach/gi, 'ILS $1 접근 허가'], [/(\d+) miles from ([A-Z]{3,5})\b/g, '$2에서 $1마일'], [/established localizer runway (\w+)/gi, '활주로 $1 로컬라이저 확립'], [/unable to establish on the localizer, request vectors/gi, '로컬라이저 포착 실패, 유도 요청'],
    [/no further clearance, entering hold at (\w+)/gi, '다음 허가가 없어 $1에서 체공 진입'], [/holding, request expected approach time/gi, '체공 중, 접근 예정 시각 요청'],
    [/hold at (\w+) as published, expect further clearance at (\d{4})/gi, '$1에서 공시된 절차대로 체공, 다음 허가는 $2 예정'], [/hold at (\w+)/gi, '$1에서 체공'],
    [new RegExp('cross (\\w+) at ' + A, 'gi'), '$1 지점을 $2로 통과'], [/radar contact/gi, '레이더 식별'],
    [/runway (\w+)(?: at [\w ]+?)?, line up and wait/gi, '활주로 $1에 들어가 대기'], [/wind calm/gi, '무풍'], [/wind (\d+) at (\d+)/gi, '바람 $1도 $2노트'],
    [/runway (\w+), cleared for takeoff/gi, '활주로 $1 이륙 허가'], [/runway (\w+), cleared to land/gi, '활주로 $1 착륙 허가'],
    [/hold position, cancel takeoff clearance/gi, '정지, 이륙 허가 취소'], [/hold position, expect pushback shortly/gi, '대기, 곧 푸시백 예정'], [/holding position/gi, '정지함'], [/hold position/gi, '그 자리에 정지'],
    [/continue approach, number (\d)/gi, '접근 계속, 착륙 순서 $1번'], [/continue approach/gi, '접근 계속'], [/continue taxi/gi, '계속 이동'],
    [/unable to go around, hydraulic failure/gi, '복행 불가(유압 고장)'], [/going around/gi, '복행함'], [/go around/gi, '복행하라'],
    [/wind shear/gi, '윈드시어'], [/unstable approach/gi, '불안정 접근'], [/too high/gi, '고도 과다'], [/runway occupied|runway is occupied/gi, '활주로 사용 중'], [/runway closed|runway is closed for inspection/gi, '활주로 폐쇄'], [/no landing clearance/gi, '착륙 허가 없음'],
    [/holding short runway (\w+) at ([\w ]+?), request crossing/gi, '활주로 $1 앞($2) 정지, 횡단 요청'], [/hold short of runway (\w+)/gi, '활주로 $1 앞에서 정지'], [/holding short runway (\w+)(?: at ([\w ]+))?/gi, '활주로 $1 앞 정지'],
    [/cross runway (\w+)/gi, '활주로 $1 횡단 허가'], [/crossing runway (\w+)/gi, '활주로 $1 횡단함'],
    [/pushback approved/gi, '푸시백 허가'], [/face (west|east|north|south)/gi, function (m, a) { return '기수는 ' + DIR[a.toLowerCase()] + '쪽'; }], [/request pushback/gi, '푸시백 요청'],
    [/taxi to holding point ([\w ]+?), runway (\w+) via/gi, '대기 지점 $1(활주로 $2)까지 이동, 경로:'], [/holding point ([\w ]+?), runway (\w+) via/gi, '대기 지점 $1(활주로 $2), 경로:'],
    [/taxi to stand (\w+) via/gi, '주기장 $1까지 이동, 경로:'], [/stand (\w+) via/gi, '주기장 $1, 경로:'],
    [/holding point ([\w ]+?), runway (\w+), ready for departure/gi, '대기 지점 $1(활주로 $2), 이륙 준비 완료'], [/approaching holding point ([\w ]+)/gi, '대기 지점 $1 접근 중'],
    [/vacated runway (\w+) via ([\w ]+?), stand (\w+)/gi, '활주로 $1 이탈($2), 주기장 $3'], [/runway vacated via ([\w ]+)/gi, '활주로 이탈($1)'], [/runway vacated, request taxi back to stand/gi, '활주로 이탈, 주기장 복귀 요청'],
    [/taxiway ([\w ]+?) closed ahead, request alternative routing/gi, '앞쪽 유도로 $1 폐쇄, 다른 경로 요청'], [/we have a technical problem, request return to stand (\w+)/gi, '기체 이상, 주기장 $1 복귀 요청'],
    [/medical emergency on board, request priority taxi/gi, '기내 응급 환자, 우선 이동 요청'], [/request taxi/gi, '지상 이동 요청'],
    [/medical emergency on board, request priority landing and ambulance on arrival/gi, '기내 응급 환자 — 우선 착륙과 구급차 요청'],
    [/engine failure, request vectors for immediate landing/gi, '엔진 고장 — 즉시 착륙 유도 요청'], [/(\d+) persons on board/gi, '탑승 $1명'],
    [/fuel emergency, request immediate landing/gi, '연료 비상 — 즉시 착륙 요청'], [/minimum fuel/gi, '최저 연료(더 지연되면 연료 비상이 될 수 있음 — 예상 지연을 알려 줄 것)'],
    [/severe turbulence, request heading to avoid weather/gi, '심한 난기류, 기상 회피 기수 요청'], [/moderate turbulence, request (FL\d+)/gi, '난기류로 $1 요청'],
    [/request (\d+) degrees (left|right) of track due weather/gi, function (m, a, b) { return '기상 회피를 위해 항로 ' + DIR[b.toLowerCase()] + '측 ' + a + '도 요청'; }],
    [new RegExp('passenger medical emergency, request diversion to ' + AP.call, 'gi'), '승객 응급 환자 — ' + AP.short + ' 회항 요청'], [/cabin depressurization, emergency descent to 10,000, turning right/gi, '객실 여압 상실 — 10,000피트로 비상 강하, 우선회 중'],
    [new RegExp('level 10,000, request vectors to ' + AP.call, 'gi'), '10,000피트 수평, ' + AP.short + '까지 유도 요청'], [/hydraulic failure, request emergency services on standby/gi, '유압 고장 — 소방 · 구조대 대기 요청'],
    [/stopping on the runway, request fire service inspection/gi, '활주로 위 정지, 소방 점검 요청'], [/rejecting takeoff, engine warning/gi, '이륙 중단(엔진 경고)'], [/bird strike on departure, continuing, suggest runway inspection/gi, '이륙 중 조류 충돌, 비행 계속 — 활주로 점검 권고'],
    [/approaching (\w+), request frequency change/gi, '$1 접근 중, 주파수 변경 요청'], [/request frequency change/gi, '주파수 변경 요청'], [/request approach clearance/gi, '접근 허가 요청'], [/request higher/gi, '더 높은 고도 요청'], [/request descent/gi, '강하 요청'],
    [new RegExp('passing ' + A + ', climbing ' + A, 'gi'), '$1 통과, $2로 상승 중'], [new RegExp('climbing ' + A + ', request ' + A, 'gi'), '$1로 상승 중, $2 요청'], [new RegExp('passing ' + A, 'gi'), '$1 통과 중'], [/passing (\w+)/gi, '$1 통과'],
    [new RegExp('descending ' + A, 'gi'), '$1로 강하 중'], [new RegExp('maintaining ' + A, 'gi'), '$1 유지 중'], [new RegExp('level ' + A, 'gi'), '$1 수평 비행'], [/inbound (\w+)/gi, '$1 향해 비행'],
    [/(\d+) miles final runway (\w+)/gi, '최종 접근 $1마일(활주로 $2)'], [/ILS runway (\w+)/gi, 'ILS $1 접근 중'], [/(\w+ 1[AB]) departure/gi, '$1 출발 절차'],
    [/ready for departure/gi, '이륙 준비 완료'], [/request crossing/gi, '횡단 요청'],
    [/traffic on short final/gi, '최종 접근 중인 항공기가 있음'], [/landing traffic on the runway|traffic on the runway/gi, '활주로에 항공기가 있음'], [/that is (above|below) your airspace/gi, '관할 공역 밖 고도'], [/we are a departure/gi, '우리는 출발기임'],
    [/unable to climb, (engine failure|cabin pressure)/gi, '상승 불가'], [/we have not received our clearance yet/gi, '아직 허가를 받지 못했음'], [/our slot time is (\d+), too early for start-up/gi, 'CTOT $1 — 시동하기엔 이름'], [/not yet at the holding point/gi, '아직 대기 지점 전'],
    [/confirm runway, ATIS says departures runway (\w+)/gi, '활주로 확인 바람 — ATIS는 출발 활주로 $1'], [/require full length for departure/gi, '활주로 전체 길이가 필요함'], [/our assigned stand is (\w+)/gi, '배정 주기장은 $1'], [/runway (\w+) is not in use/gi, '활주로 $1은 사용하지 않음'],
    [/is above our maximum altitude/gi, '은 최대 운용 고도보다 높음'], [/say again/gi, '다시 말해 달라'], [/stand ?by/gi, '잠시 대기'], [/\bstand ([A-Z]?\d\w*)/gi, '주기장 $1'],
    [/give way to (\w[\w ]*? \d+)/gi, '$1에게 양보'], [/giving way to (\w[\w ]*? \d+)/gi, '$1에게 양보함'], [/hold short runway (\w+)/gi, '활주로 $1 앞 정지'], [/ground (\d{3}\.\d+)/gi, '지상관제 $1'], [/expect (FL\d+)/gi, '최종 고도 $1 예정'],
    [/\bnegative\b/gi, '아님(정정)'], [/\bCorrection\b/g, '정정'], [/\bunable\b/gi, '불가'], [/\broger\b/gi, '수신 확인'], [/\bheavy\b/g, '(대형기)'], [/(\d{3}\.\d+)/g, '$1']
  ];
  /* 교신 풀이는 언어별 내용 묶음: ATC.GLOSS.<언어> = function (영어 교신) → 그 언어 풀이. 풀이가 필요 없는 언어(영어)는 빈 글을 돌려주면 됨 */
  ATC.GLOSS = ATC.GLOSS || {};
  ATC.GLOSS.ko = function (text) { var s = text, i; for (i = 0; i < T.length; i++) s = s.replace(T[i][0], T[i][1]); return s; };
  ATC.gloss = function (text) { return ATC.pick(ATC.GLOSS)(text); };
})(typeof globalThis !== 'undefined' ? globalThis : this);
