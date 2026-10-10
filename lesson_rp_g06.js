/* 항공커리어노트: lesson-linked AI roleplay; lesson_rp_g06.js; 2026-10-10.
   Additive data only. Does not touch ARTS, TALK, TALK_TOPICS, storage, audio or network. */
(function(root){
  "use strict";
  var batch=[
  {
    "id": "lrp-g06-026",
    "course": "1_지상직여객운송입문",
    "lesson": "6-3",
    "lv": 1,
    "lessonTitle": {
      "ko": "공항 출입증 관리",
      "ja": "空港IDパスの管理",
      "en": "Managing Airport ID Passes"
    },
    "title": {
      "ko": "분실 출입증의 즉시 보고",
      "ja": "紛失した入場証をすぐに報告する",
      "en": "Report a lost airport pass immediately"
    },
    "scene": {
      "ko": "근무 직전 공항 출입증이 없어진 것을 알게 되어 출입증 관리 담당자에게 연락한다.",
      "ja": "勤務直前に空港の入場証が見当たらないと分かり、管理担当者へ連絡します。",
      "en": "Just before duty, you discover your airport pass is missing and contact the pass controller."
    },
    "ai": {
      "role": {
        "ko": "분실 보고를 접수하는 출입증 관리 담당자",
        "ja": "紛失報告を受ける入場証管理担当者",
        "en": "A pass controller receiving the loss report"
      },
      "persona": {
        "ko": "침착하며 분실 경위와 필요한 후속 조치를 확인한다.",
        "ja": "落ち着いて、紛失の経緯と必要な対応を確認します。",
        "en": "Calm, checking the circumstances and required next steps."
      }
    },
    "me": {
      "role": {
        "ko": "출입증을 분실한 직원",
        "ja": "入場証を紛失した社員",
        "en": "An employee whose airport pass is missing"
      }
    },
    "goal": {
      "ko": "마지막 확인 장소와 시점을 보고하고 출입증 정지·지정 창구 보고를 요청하며, 승인된 출입 방법이 확인될 때까지 제한구역에 들어가지 않는다.",
      "ja": "最後に確認した場所と時点を報告し、使用停止と指定窓口への報告を依頼して、承認済みの入場方法を確認するまで制限区域へ入りません。",
      "en": "Report where and when the pass was last seen, request deactivation and designated reporting, and wait for an authorised entry arrangement."
    },
    "twist": {
      "ko": "동료가 자기 출입증을 빌려주겠다고 제안한다.",
      "ja": "同僚が自分の入場証を貸すと申し出ます。",
      "en": "A colleague offers to lend you their airport pass."
    },
    "opener": {
      "ko": "출입증 분실 보고군요. 마지막으로 확인한 때와 장소가 어디인가요?",
      "ja": "入場証の紛失ですね。最後に確認したのはいつ、どこですか。",
      "en": "You are reporting a missing pass. When and where did you last see it?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p6x.js",
          "line": 180
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 2,
            "heading": "管理責任者の役割"
          },
          {
            "sectionIndex": 3,
            "heading": "紛失したとき"
          }
        ],
        "ko": [
          {
            "sectionIndex": 2,
            "heading": "관리 책임자의 역할"
          },
          {
            "sectionIndex": 3,
            "heading": "분실했을 때"
          }
        ],
        "en": [
          {
            "sectionIndex": 2,
            "heading": "The pass controller’s role"
          },
          {
            "sectionIndex": 3,
            "heading": "If a pass is lost"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "life-bank-card-freeze-1"
      ],
      "differenceKo": "은행 카드 정지가 아니라 공항 출입증 무효화·대여 금지·제한구역 출입 통제를 다룬다."
    }
  },
  {
    "id": "lrp-g06-027",
    "course": "1_지상직여객운송입문",
    "lesson": "6-4",
    "lv": 3,
    "lessonTitle": {
      "ko": "각종 수검 대비 — 본사·당국",
      "ja": "監査への備え ― 本社・当局",
      "en": "Preparing for Audits"
    },
    "title": {
      "ko": "감사 전 교육 기록 누락 대응",
      "ja": "監査前の研修記録不足に対応する",
      "en": "Address a missing training record before an audit"
    },
    "scene": {
      "ko": "감사 자료를 준비하다 직원의 교육 이수 주장과 보관된 증빙이 일치하지 않는 것을 발견했다.",
      "ja": "監査資料の準備中、社員の受講申告と保管された証拠が一致しないことが分かりました。",
      "en": "While preparing audit materials, you find a mismatch between an employee’s training claim and the stored evidence."
    },
    "ai": {
      "role": {
        "ko": "증빙과 시정 계획을 묻는 내부 감사 준비 담당자",
        "ja": "証拠と改善計画を尋ねる社内の監査準備担当者",
        "en": "An internal audit-preparation reviewer asking for evidence and actions"
      },
      "persona": {
        "ko": "비난하지 않지만 추측이나 소급 작성은 받아들이지 않는다.",
        "ja": "責めませんが、推測や日付をさかのぼった作成は受け入れません。",
        "en": "Non-accusatory, but does not accept guesses or backdated records."
      }
    },
    "me": {
      "role": {
        "ko": "교육 기록을 점검하는 지점 직원",
        "ja": "研修記録を点検する支店社員",
        "en": "A station employee reviewing training records"
      }
    },
    "goal": {
      "ko": "원 기록과 보관 위치를 확인하고 미확인 상태를 그대로 보고하며, 책임자와 보완·필요 교육·재확인 담당 및 기한을 정한다.",
      "ja": "元記録と保管場所を確認し、未確認の状態をそのまま報告して、責任者と補完、必要な教育、再確認の担当と期限を決めます。",
      "en": "Check original evidence and storage, report the unresolved status accurately, and agree evidence recovery, any required training, owners and deadlines."
    },
    "twist": {
      "ko": "동료가 참석했다고 하니 확인 전이라도 완료로 적자고 한다.",
      "ja": "同僚が、受講したと言っているので確認前でも完了と書こうと提案します。",
      "en": "A colleague suggests marking the training complete based on the employee’s statement alone."
    },
    "opener": {
      "ko": "교육 기록에서 어떤 사실은 확인됐고 어떤 증빙이 아직 없나요?",
      "ja": "研修記録で何が確認済みで、どの証拠がまだありませんか。",
      "en": "What is verified in the training record, and what evidence is still missing?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p6x.js",
          "line": 228
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "監査で見られること"
          },
          {
            "sectionIndex": 3,
            "heading": "監査に強い支店の習慣"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "수검에서 보는 것"
          },
          {
            "sectionIndex": 3,
            "heading": "수검에 강한 지점의 습관"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "What auditors look at"
          },
          {
            "sectionIndex": 3,
            "heading": "The habits of a station that does well"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "office-handover-1"
      ],
      "differenceKo": "일반 인수인계 대신 교육 증빙의 미확인 상태 보고와 감사 전 시정 추적을 연습한다."
    }
  },
  {
    "id": "lrp-g06-028",
    "course": "1_지상직여객운송입문",
    "lesson": "6-8",
    "lv": 3,
    "lessonTitle": {
      "ko": "청구 확인과 지점 비용 관리 — 공항·조업사 청구서 읽기",
      "ja": "請求の確認と支店の費用管理 ― 空港運営会社・ハンドリング会社の請求書を確認する",
      "en": "Checking Invoices and Managing Station Costs: Reading Airport and Handler Invoices"
    },
    "title": {
      "ko": "추가 조업 청구의 중복 대조",
      "ja": "追加作業の二重請求を照合する",
      "en": "Reconcile a potentially duplicated handling charge"
    },
    "scene": {
      "ko": "월간 청구서의 추가 작업 한 건이 전월 명세에도 있어 계약과 작업 기록을 대조한다.",
      "ja": "月次請求の追加作業一件が前月の明細にもあり、契約と作業記録を照合します。",
      "en": "An extra-handling item appears in both this month’s invoice and last month’s statement, prompting a contract and work-record check."
    },
    "ai": {
      "role": {
        "ko": "추가 작업 명세를 설명하는 조업사 청구 담당자",
        "ja": "追加作業の明細を説明する取扱会社の請求担当者",
        "en": "A handler billing contact explaining the extra-work item"
      },
      "persona": {
        "ko": "협조적이며 편별 근거를 제시하면 재확인한다.",
        "ja": "協力的で、便ごとの根拠を示されれば再確認します。",
        "en": "Cooperative and willing to recheck flight-level evidence."
      }
    },
    "me": {
      "role": {
        "ko": "청구를 검수하는 항공사 지점 직원",
        "ja": "請求を確認する航空会社支店社員",
        "en": "An airline station employee reviewing the invoice"
      }
    },
    "goal": {
      "ko": "편·실제 작업·요청 기록·계약 단가와 전월 청구를 대조하고 차이 근거를 전달하며, 승인권자 판단과 답변 기한을 기록한다.",
      "ja": "便、実作業、依頼記録、契約単価、前月請求を照合し、差異の根拠を伝えて、承認者の判断と回答期限を記録します。",
      "en": "Compare flight, work performed, request records, contract rates and prior invoices; present the discrepancy and record approval routing and the response deadline."
    },
    "twist": {
      "ko": "조업사가 한 항목은 기본 조업이고 다른 항목은 연장 작업이라고 설명한다.",
      "ja": "取扱会社が、一方は基本作業、もう一方は延長作業だと説明します。",
      "en": "The handler says one item is basic handling and the other is extended work."
    },
    "opener": {
      "ko": "두 달 명세에 같은 편의 항목이 있군요. 어떤 차이를 확인하고 싶으신가요?",
      "ja": "二か月の明細に同じ便の項目がありますね。どの差を確認なさいますか。",
      "en": "The same flight appears on both statements. Which difference would you like us to verify?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p6b.js",
          "line": 3
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "請求内容を確認する流れ"
          },
          {
            "sectionIndex": 2,
            "heading": "照合のポイント"
          },
          {
            "sectionIndex": 4,
            "heading": "ハンドリング会社との約束"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "청구 확인 흐름"
          },
          {
            "sectionIndex": 2,
            "heading": "대조 포인트"
          },
          {
            "sectionIndex": 4,
            "heading": "조업사와의 약속"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "How to check an invoice"
          },
          {
            "sectionIndex": 2,
            "heading": "What to compare"
          },
          {
            "sectionIndex": 4,
            "heading": "Agreements with your handler"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "office-expense-report-1",
        "life-utility-bill-1"
      ],
      "differenceKo": "개인 출장비·생활요금 문의가 아니라 SGHA 계약과 편별 작업 요청의 이중 청구 검수다."
    }
  },
  {
    "id": "lrp-g06-029",
    "course": "1_지상직여객운송입문",
    "lesson": "6-9",
    "lv": 3,
    "lessonTitle": {
      "ko": "지점 KPI 월간 보고서 만들기 — 숫자·이유·대책을 한 장에",
      "ja": "支店のKPI月報をつくる ― 数字・理由・対策を1枚に",
      "en": "Writing the Station’s Monthly KPI Report: Figures, Reasons and Actions on One Page"
    },
    "title": {
      "ko": "KPI 분모 변경을 설명하기",
      "ja": "KPIの分母変更を説明する",
      "en": "Explain a changed KPI denominator"
    },
    "scene": {
      "ko": "월간 보고에서 정시율이 좋아졌지만 전월과 운항 편수 집계 기준이 다른 것을 발견했다.",
      "ja": "月次報告で定時率が改善していますが、前月と運航便数の集計基準が違うと分かりました。",
      "en": "A monthly report shows improved punctuality, but the flight-count basis differs from the previous month."
    },
    "ai": {
      "role": {
        "ko": "보고 숫자의 의미를 묻는 지점장",
        "ja": "報告数値の意味を尋ねる支店長",
        "en": "A station manager asking what the report figures mean"
      },
      "persona": {
        "ko": "짧은 결론을 원하며 숫자의 출처와 비교 가능성을 확인한다.",
        "ja": "短い結論を求め、数値の出所と比較できるかを確認します。",
        "en": "Wants a concise conclusion and checks sources and comparability."
      }
    },
    "me": {
      "role": {
        "ko": "월간 KPI 보고서를 작성한 직원",
        "ja": "月次KPI報告を作成した社員",
        "en": "The employee preparing the monthly KPI report"
      }
    },
    "goal": {
      "ko": "지표 정의·분자·분모·원 기록을 확인하고 같은 기준으로 비교하며, 미확인 원인은 구분해 숫자·이유·대책을 설명한다.",
      "ja": "指標の定義、分子、分母、元記録を確認して同じ基準で比べ、未確認の原因を分けながら数値、理由、対策を説明します。",
      "en": "Verify definition, numerator, denominator and source records; compare on a consistent basis and explain figures, reasons and actions while identifying unverified causes."
    },
    "twist": {
      "ko": "보고서 작성 중 이번 달에는 결항 편을 분모에서 제외했지만 전월에는 포함했다는 설명을 듣는다.",
      "ja": "今月は欠航便を分母から外し、前月は含めていたと分かります。",
      "en": "You learn that cancellations were excluded this month but included last month."
    },
    "opener": {
      "ko": "정시율이 올랐다고 했는데 두 달을 같은 기준으로 비교한 건가요?",
      "ja": "定時率が上がったとのことですが、二か月を同じ基準で比べていますか。",
      "en": "You reported improved punctuality. Are the two months measured on the same basis?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p6k.js",
          "line": 3
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "主な指標の計算（例）"
          },
          {
            "sectionIndex": 3,
            "heading": "伝わる月報のコツ"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "주요 지표 계산 (예)"
          },
          {
            "sectionIndex": 3,
            "heading": "읽히는 월간 보고의 요령"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "How the main indicators are calculated (example)"
          },
          {
            "sectionIndex": 3,
            "heading": "Writing a report people read"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "t-meeting-opinion",
        "t-goals"
      ],
      "differenceKo": "일반 회의 의견·개인 목표 면담이 아니라 KPI 정의와 분모를 통일한 월간 성과 설명이다."
    }
  },
  {
    "id": "lrp-g06-030",
    "course": "1_지상직여객운송입문",
    "lesson": "9-2",
    "lv": 2,
    "lessonTitle": {
      "ko": "지상에서 객실로의 인계 — 비상구 좌석·특별 승객·기내 서류",
      "ja": "地上から客室への引き継ぎ ― 非常口座席・特別対応のお客様・搭載書類",
      "en": "Handover from Ground to Cabin: Exit Rows, Special Passengers and Flight Documents"
    },
    "title": {
      "ko": "객실 인계의 미완료 항목 복창",
      "ja": "客室への引継ぎで未完了事項を復唱する",
      "en": "Read back unresolved items in a cabin handover"
    },
    "scene": {
      "ko": "최종 특별 승객 목록을 객실에 전달할 때 좌석 변경과 도착지 지원 확인이 한 항목 남아 있다.",
      "ja": "最終の特別対応旅客一覧を客室へ渡す際、座席変更と到着地支援の確認が一件残っています。",
      "en": "At the final special-assistance handover, one seat change and destination-support confirmation remain unresolved."
    },
    "ai": {
      "role": {
        "ko": "지상 인계 내용을 받는 객실 책임자",
        "ja": "地上からの引継ぎを受ける客室責任者",
        "en": "A cabin supervisor receiving the ground handover"
      },
      "persona": {
        "ko": "간결하며 최종 버전과 미완료 항목을 되묻는다.",
        "ja": "簡潔で、最終版と未完了事項を問い返します。",
        "en": "Concise, asking which version is final and what is still outstanding."
      }
    },
    "me": {
      "role": {
        "ko": "최종 자료와 변경 사항을 인계하는 게이트 직원",
        "ja": "最終資料と変更事項を引き継ぐ搭乗口係員",
        "en": "A gate agent handing over final documents and changes"
      }
    },
    "goal": {
      "ko": "최종 목록 버전과 변경 좌석·지원 내용을 대조하고 미완료 항목의 담당자·확인 시점을 정하며, 수신자의 복창과 인수 사실을 기록한다.",
      "ja": "最終一覧の版、変更座席、支援内容を照合し、未完了事項の担当者と確認時点を決めて、受取者の復唱と受領を記録します。",
      "en": "Cross-check the final list version, seat changes and assistance details; assign owners and update points, and record recipient readback and receipt."
    },
    "twist": {
      "ko": "객실 책임자가 이전 버전 목록을 받았다고 말한다.",
      "ja": "客室責任者が前の版の一覧を受け取っていたと伝えます。",
      "en": "The cabin supervisor says they received an earlier version of the list."
    },
    "opener": {
      "ko": "이 목록이 최종본인가요? 변경 사항과 아직 확인 중인 항목을 알려 주세요.",
      "ja": "この一覧は最終版ですか。変更事項と、まだ確認中の項目を教えてください。",
      "en": "Is this the final list? Please identify the changes and anything still awaiting confirmation."
    },
    "source": {
      "definitions": [
        {
          "file": "data/p9c.js",
          "line": 77
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "特別なお客様の引き継ぎ（例）"
          },
          {
            "sectionIndex": 2,
            "heading": "機内へ引き渡す書類（例）"
          },
          {
            "sectionIndex": 3,
            "heading": "搭乗での連携"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "특별 승객 인계 (예)"
          },
          {
            "sectionIndex": 2,
            "heading": "기내 탑재 서류 (예)"
          },
          {
            "sectionIndex": 3,
            "heading": "탑승 시 연계"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "Handing over special passengers (examples)"
          },
          {
            "sectionIndex": 2,
            "heading": "Documents carried on board (examples)"
          },
          {
            "sectionIndex": 3,
            "heading": "Working together at boarding"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-wheelchair-1",
        "office-handover-1"
      ],
      "differenceKo": "휠체어 접수·일반 인수인계를 넘어 지상→객실 최종 문서 버전, 미완료 상태, 수신 복창을 확인한다."
    }
  }
];
  if(root.LESSON_RP != null && !Array.isArray(root.LESSON_RP)) { throw new TypeError("LESSON_RP must be an array"); }
  var current=root.LESSON_RP || [];
  var seen=Object.create(null);
  current.forEach(function(item){ if(item && typeof item.id === "string") seen[item.id]=true; });
  root.LESSON_RP=current.concat(batch.filter(function(item){ if(seen[item.id]) return false; seen[item.id]=true; return true; }));
})(typeof window !== "undefined" ? window : globalThis);
