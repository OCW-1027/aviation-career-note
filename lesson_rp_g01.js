/* 항공커리어노트: lesson-linked AI roleplay; lesson_rp_g01.js; 2026-10-10.
   Additive data only. Does not touch ARTS, TALK, TALK_TOPICS, storage, audio or network. */
(function(root){
  "use strict";
  var batch=[
  {
    "id": "lrp-g01-001",
    "course": "1_지상직여객운송입문",
    "lesson": "0-1",
    "lv": 1,
    "lessonTitle": {
      "ko": "공항을 움직이는 세 주체",
      "ja": "空港を動かす3つの主体",
      "en": "The Three Players That Run an Airport"
    },
    "title": {
      "ko": "세 요청의 담당 부서 정하기",
      "ja": "三つの依頼を担当部署へつなぐ",
      "en": "Route three requests to the right teams"
    },
    "scene": {
      "ko": "출발 브리핑에서 신입 직원이 수하물 규정, 터미널 시설, 출입국 심사 문의를 한꺼번에 받았다.",
      "ja": "出発前の打ち合わせで、新人が手荷物規定、ターミナル設備、出入国審査の問い合わせをまとめて受けました。",
      "en": "During a departure briefing, a new agent receives questions about baggage policy, terminal facilities and border checks."
    },
    "ai": {
      "role": {
        "ko": "업무 배분을 확인하는 조업사 선배",
        "ja": "業務の振り分けを確認する先輩係員",
        "en": "A senior handling agent checking task allocation"
      },
      "persona": {
        "ko": "차분하며 담당 주체와 연락 이유를 하나씩 묻는다.",
        "ja": "落ち着いて、担当する組織と連絡する理由を一つずつ尋ねます。",
        "en": "Calm and curious about who owns each task and why."
      }
    },
    "me": {
      "role": {
        "ko": "브리핑에 참여한 신입 여객 직원",
        "ja": "打ち合わせに参加した新人旅客係員",
        "en": "A new passenger agent at the briefing"
      }
    },
    "goal": {
      "ko": "항공사·조업사·공항 운영사·CIQ의 역할을 구분하고, 각 문의의 확인 창구와 전달할 내용을 설명한다.",
      "ja": "航空会社、取扱会社、空港運営会社、CIQの役割を分け、問い合わせ先と伝える内容を説明します。",
      "en": "Distinguish airline, handler, airport operator and CIQ responsibilities, then name the contact and information needed for each request."
    },
    "twist": {
      "ko": "선배가 시설 문의를 항공사 수하물 규정 담당에게 보내도 되는지 묻는다.",
      "ja": "先輩が、設備の問い合わせも航空会社の手荷物担当へ送ってよいか尋ねます。",
      "en": "The senior agent suggests sending the facilities question to the airline baggage-policy team."
    },
    "opener": {
      "ko": "이 세 문의는 각각 어디로 연결하면 좋을까요?",
      "ja": "この三つの問い合わせは、それぞれどこへつなぎますか。",
      "en": "Which team should receive each of these three questions?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p0.js",
          "line": 4
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "全体像 ― 1便を動かす3つの主体"
          },
          {
            "sectionIndex": 3,
            "heading": "空港運営会社と行政機関 ― 舞台とルール"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "전체 구조 — 한 편을 움직이는 세 주체"
          },
          {
            "sectionIndex": 3,
            "heading": "공항 운영사와 정부기관 — 무대와 규칙"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The big picture — three players behind one flight"
          },
          {
            "sectionIndex": 3,
            "heading": "The airport operator and government agencies — the stage and the rules"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "t-airport-job"
      ],
      "differenceKo": "공항 업무의 보람을 말하는 잡담이 아니라 담당 조직과 전달 근거를 구분하는 브리핑이다."
    }
  },
  {
    "id": "lrp-g01-002",
    "course": "1_지상직여객운송입문",
    "lesson": "0-2",
    "lv": 1,
    "lessonTitle": {
      "ko": "항공사 직원과 조업사 직원",
      "ja": "航空会社の社員とハンドリング会社の社員",
      "en": "Airline Staff and Ground Handling Staff"
    },
    "title": {
      "ko": "채용 공고의 빈칸 확인하기",
      "ja": "求人票にない条件を確認する",
      "en": "Clarify missing details in a job advert"
    },
    "scene": {
      "ko": "공항 여객 업무 공고에는 담당 항공사만 적혀 있고 고용주와 근무 조건이 불명확하다.",
      "ja": "空港の旅客業務の求人には担当航空会社だけが書かれ、雇用主や勤務条件がはっきりしません。",
      "en": "An airport passenger-service advert names the client airline but leaves the employer and working conditions unclear."
    },
    "ai": {
      "role": {
        "ko": "가상 조업사의 채용 문의 담당자",
        "ja": "架空の取扱会社の採用問い合わせ担当者",
        "en": "A recruitment contact at a fictional ground handler"
      },
      "persona": {
        "ko": "친절하지만 지원자가 묻는 조건만 구체적으로 답한다.",
        "ja": "親切ですが、応募者が尋ねた条件だけを具体的に答えます。",
        "en": "Helpful, but gives specific details only when asked."
      }
    },
    "me": {
      "role": {
        "ko": "지원 전에 공고 내용을 확인하는 구직자",
        "ja": "応募前に求人内容を確かめる求職者",
        "en": "A jobseeker clarifying the advert before applying"
      }
    },
    "goal": {
      "ko": "고용주, 고용 형태, 담당 업무, 근무 시간대와 교육 지원을 질문하고 확인되지 않은 조건을 정리한다.",
      "ja": "雇用主、雇用形態、担当業務、勤務時間、研修支援を質問し、未確認の条件を整理します。",
      "en": "Ask about the employer, contract type, duties, shifts and training support, then summarise any unresolved terms."
    },
    "twist": {
      "ko": "담당자가 항공사 로고를 보고 항공사 직접 고용이라고 생각했는지 묻는다.",
      "ja": "担当者が、航空会社のロゴを見て直接雇用だと思ったか尋ねます。",
      "en": "The contact asks whether the airline logo led you to assume direct airline employment."
    },
    "opener": {
      "ko": "공고를 보셨군요. 지원 전에 어떤 조건을 확인하고 싶으세요?",
      "ja": "求人をご覧になったのですね。応募前にどの条件を確認なさいますか。",
      "en": "You have seen the advert. Which conditions would you like to clarify before applying?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p0.js",
          "line": 5
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "ひと目でわかる違い"
          },
          {
            "sectionIndex": 3,
            "heading": "求人票で必ず見る5つのポイント"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "한눈에 보는 차이"
          },
          {
            "sectionIndex": 3,
            "heading": "채용 공고에서 꼭 볼 5가지"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The difference at a glance"
          },
          {
            "sectionIndex": 3,
            "heading": "Five things to check in every job advertisement"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "t-job-interview",
        "t-self-pr",
        "office-recruitment-interview-1"
      ],
      "differenceKo": "면접 답변이나 면접 시간 조율이 아니라 고용주와 공고 조건을 확인하는 사전 문의다."
    }
  },
  {
    "id": "lrp-g01-003",
    "course": "1_지상직여객운송입문",
    "lesson": "0-3",
    "lv": 2,
    "lessonTitle": {
      "ko": "한 편이 뜨기까지 — 출발 편 타임라인",
      "ja": "1便が飛ぶまで ― 出発便のタイムライン",
      "en": "Until a Flight Takes Off — The Departure Timeline"
    },
    "title": {
      "ko": "출발 타임라인의 정보 연결",
      "ja": "出発までの情報を四つのチームでつなぐ",
      "en": "Connect information across the departure timeline"
    },
    "scene": {
      "ko": "카운터·게이트·램프·탑재관리 브리핑에서 각 팀이 준비 완료를 알렸지만 수하물 최종 수량 공유가 빠져 있다.",
      "ja": "カウンター、搭乗口、ランプ、搭載管理の打ち合わせで、受託手荷物の最終個数の共有が抜けています。",
      "en": "Counter, gate, ramp and load-control teams report readiness, but the final checked-bag count has not been shared."
    },
    "ai": {
      "role": {
        "ko": "네 팀의 진행 상황을 묻는 편 책임자",
        "ja": "四つのチームの進み具合を確認する便責任者",
        "en": "A flight supervisor reviewing the four teams"
      },
      "persona": {
        "ko": "시간을 의식하지만 확인되지 않은 완료 보고는 받아들이지 않는다.",
        "ja": "時刻を気にしますが、未確認の完了報告は受け入れません。",
        "en": "Time-conscious, but does not accept unverified completion reports."
      }
    },
    "me": {
      "role": {
        "ko": "여객 쪽 진행 상황을 보고하는 직원",
        "ja": "旅客側の状況を報告する係員",
        "en": "An agent reporting passenger-side progress"
      }
    },
    "goal": {
      "ko": "팀별 역할과 필요한 선행 정보를 설명하고, 누락 정보의 확인 담당·수신 담당·다음 보고 시점을 합의한다.",
      "ja": "各チームの役割と必要な情報を説明し、不足情報の確認担当、受取担当、次の報告時点を決めます。",
      "en": "Explain team responsibilities and dependencies, then agree who checks the missing information, who receives it and when to update."
    },
    "twist": {
      "ko": "게이트와 램프에서 서로 다른 수하물 수량을 전달한다.",
      "ja": "搭乗口とランプから異なる手荷物個数が伝えられます。",
      "en": "The gate and ramp report different bag counts."
    },
    "opener": {
      "ko": "각 팀은 준비됐다고 하는데 아직 연결되지 않은 정보가 있나요?",
      "ja": "各チームは準備できたと言っていますが、まだ共有できていない情報はありますか。",
      "en": "Each team says it is ready. Is any information still missing between teams?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p0.js",
          "line": 6
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "出発便のタイムライン"
          },
          {
            "sectionIndex": 1,
            "heading": "定時出発を支える4つのチーム"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "출발 편 타임라인"
          },
          {
            "sectionIndex": 1,
            "heading": "정시 출발을 받치는 네 팀"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The departure timeline"
          },
          {
            "sectionIndex": 1,
            "heading": "Four teams behind an on-time departure"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "office-handover-1"
      ],
      "differenceKo": "일반 담당자 인수인계가 아니라 출발 단계의 의존 관계와 팀 간 수량 대조를 연습한다."
    }
  },
  {
    "id": "lrp-g01-004",
    "course": "1_지상직여객운송입문",
    "lesson": "0-4",
    "lv": 2,
    "lessonTitle": {
      "ko": "한국 공항과 일본 공항, 무엇이 다른가",
      "ja": "日本の空港と韓国の空港、何が違う？",
      "en": "How Japanese Airports Differ from Airports Elsewhere"
    },
    "title": {
      "ko": "새 공항의 운영 조건 확인",
      "ja": "新しい空港の運用条件を確認する",
      "en": "Verify operating conditions at a new airport"
    },
    "scene": {
      "ko": "새 공항 취항을 준비하며 이전 공항의 방송·시설·운영 시간 절차를 그대로 사용할 수 있는지 협의한다.",
      "ja": "新しい空港への就航準備で、以前の空港の放送、設備、運用時間の手順をそのまま使えるか相談します。",
      "en": "Before opening a station, you discuss whether announcement, facility and operating-hour procedures from another airport can be reused."
    },
    "ai": {
      "role": {
        "ko": "현지 공항 운영사의 업무 조정 담당자",
        "ja": "現地空港の運営会社の調整担当者",
        "en": "A local airport-operator coordinator"
      },
      "persona": {
        "ko": "협조적이며 공항별 확인이 필요한 항목을 되묻는다.",
        "ja": "協力的で、空港ごとに確認が必要な項目を問い返します。",
        "en": "Cooperative and keen to identify airport-specific checks."
      }
    },
    "me": {
      "role": {
        "ko": "새 지점 개설을 준비하는 항공사 직원",
        "ja": "新しい支店の開設を準備する航空会社社員",
        "en": "An airline employee preparing a new station"
      }
    },
    "goal": {
      "ko": "시설 창구, 운영 시간, 방송 절차와 자동 수속 적용 범위의 확인 방법을 묻고 미확정 항목을 기록한다.",
      "ja": "設備窓口、運用時間、放送手順、自動手続きの対象の確認方法を尋ね、未確定事項を記録します。",
      "en": "Ask how to verify facility contacts, operating hours, announcement rules and automated-process eligibility, then record unresolved items."
    },
    "twist": {
      "ko": "자동 수속 기기가 있어도 일부 여정은 직원의 서류 확인이 필요하다는 안내를 받는다.",
      "ja": "自動手続きの機械があっても、一部の旅程では係員の書類確認が必要だと分かります。",
      "en": "You learn that some itineraries still require an agent document check despite automated facilities."
    },
    "opener": {
      "ko": "이전 공항 절차에서 무엇부터 이 공항 기준으로 확인하시겠어요?",
      "ja": "以前の空港の手順について、何から当空港の基準を確認なさいますか。",
      "en": "Which part of the previous airport procedure would you like to verify here first?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p0.js",
          "line": 7
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "空港の運営のしかた"
          },
          {
            "sectionIndex": 1,
            "heading": "お客様の手続き"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "공항 운영 방식"
          },
          {
            "sectionIndex": 1,
            "heading": "승객 수속"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "How airports are run"
          },
          {
            "sectionIndex": 1,
            "heading": "Passenger procedures"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "t-kr-jp-diff",
        "air-irrops-curfew-1"
      ],
      "differenceKo": "생활문화 비교나 운용시간 초과 승객 안내가 아니라 취항 전 공항별 확인 창구 협의다."
    }
  },
  {
    "id": "lrp-g01-005",
    "course": "1_지상직여객운송입문",
    "lesson": "1-1",
    "lv": 1,
    "lessonTitle": {
      "ko": "카운터 오픈 전 준비와 레이아웃",
      "ja": "カウンターオープン前の準備とレイアウト",
      "en": "Getting the Counter Ready, and How to Lay It Out"
    },
    "title": {
      "ko": "오픈 전 장비 점검과 카운터 배분",
      "ja": "開始前の機器確認と窓口の振り分け",
      "en": "Check equipment and allocate counters before opening"
    },
    "scene": {
      "ko": "카운터 오픈 전 시험 인쇄에서 태그 프린터 한 대가 작동하지 않으며 단체 승객도 예정돼 있다.",
      "ja": "窓口を開く前の試し印刷で手荷物タグの印刷機一台が動かず、団体客の予定もあります。",
      "en": "Before counter opening, one bag-tag printer fails a test print and a group booking is expected."
    },
    "ai": {
      "role": {
        "ko": "점검 결과를 확인하는 카운터 리더",
        "ja": "点検結果を確認するカウンター責任者",
        "en": "A counter lead reviewing readiness"
      },
      "persona": {
        "ko": "차분하며 수리 보고와 승객 동선 준비를 함께 확인한다.",
        "ja": "落ち着いて、修理の報告とお客様の動線準備を確認します。",
        "en": "Calm, checking both the fault report and passenger flow."
      }
    },
    "me": {
      "role": {
        "ko": "오픈 전 점검을 맡은 신입 직원",
        "ja": "開始前の点検を担当する新人係員",
        "en": "A new agent carrying out pre-opening checks"
      }
    },
    "goal": {
      "ko": "편 정보·양식·장비·주변 상태를 보고하고, 고장 창구의 사용 보류와 담당자 연락, 단체 대기 동선 조정을 제안한다.",
      "ja": "便情報、用紙、機器、周辺を報告し、不具合窓口の使用保留、担当者への連絡、団体客の列の調整を提案します。",
      "en": "Report flight information, forms, equipment and surroundings; propose holding the faulty counter, contacting support and adjusting the group queue."
    },
    "twist": {
      "ko": "리더가 단체 승객의 도착이 예정보다 빨라졌다고 알린다.",
      "ja": "責任者が、団体客の到着が予定より早まったと伝えます。",
      "en": "The lead says the group will arrive earlier than expected."
    },
    "opener": {
      "ko": "오픈 전 점검 결과부터 알려 주세요. 바로 사용할 수 없는 장비가 있나요?",
      "ja": "開始前の点検結果を教えてください。すぐに使えない機器はありますか。",
      "en": "Please report your pre-opening checks. Is any equipment unavailable?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1x.js",
          "line": 2
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "オープン前の確認① 便の情報"
          },
          {
            "sectionIndex": 2,
            "heading": "オープン前の確認② カウンター・用紙・機器"
          },
          {
            "sectionIndex": 3,
            "heading": "カウンター周りのレイアウト"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "오픈 전 확인 ① 편 정보"
          },
          {
            "sectionIndex": 2,
            "heading": "오픈 전 확인 ② 카운터·양식·장비"
          },
          {
            "sectionIndex": 3,
            "heading": "카운터 주변 레이아웃"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "Before opening (1): flight information"
          },
          {
            "sectionIndex": 2,
            "heading": "Before opening (2): counter, forms and equipment"
          },
          {
            "sectionIndex": 3,
            "heading": "Laying out the counter area"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-gate-system-1",
        "t-meeting-opinion"
      ],
      "differenceKo": "탑승 중 스캐너 장애나 일반 의견 제시가 아니라 오픈 전 예방 점검과 창구 배분이다."
    }
  }
];
  if(root.LESSON_RP != null && !Array.isArray(root.LESSON_RP)) { throw new TypeError("LESSON_RP must be an array"); }
  var current=root.LESSON_RP || [];
  var seen=Object.create(null);
  current.forEach(function(item){ if(item && typeof item.id === "string") seen[item.id]=true; });
  root.LESSON_RP=current.concat(batch.filter(function(item){ if(seen[item.id]) return false; seen[item.id]=true; return true; }));
})(typeof window !== "undefined" ? window : globalThis);
