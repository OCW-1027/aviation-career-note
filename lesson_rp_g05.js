/* 항공커리어노트: lesson-linked AI roleplay; lesson_rp_g05.js; 2026-10-10.
   Additive data only. Does not touch ARTS, TALK, TALK_TOPICS, storage, audio or network. */
(function(root){
  "use strict";
  var batch=[
  {
    "id": "lrp-g05-021",
    "course": "1_지상직여객운송입문",
    "lesson": "3-5",
    "lv": 1,
    "lessonTitle": {
      "ko": "램프 안전의 기본",
      "ja": "ランプ安全の基本",
      "en": "Ramp Safety Basics"
    },
    "title": {
      "ko": "램프의 이물질 발견 보고",
      "ja": "ランプの異物を見つけて報告する",
      "en": "Report foreign objects on the ramp"
    },
    "scene": {
      "ko": "장비 이동 준비 중 통행 구역에 포장 조각이 보여 담당자에게 위험을 알린다.",
      "ja": "機器を移動する準備中、通行する場所に包装の切れ端が見え、担当者へ危険を伝えます。",
      "en": "While equipment movement is being prepared, packing debris is spotted in a traffic area and must be reported."
    },
    "ai": {
      "role": {
        "ko": "상황을 확인하는 램프 선배",
        "ja": "状況を確認するランプの先輩",
        "en": "A senior ramp colleague checking the hazard"
      },
      "persona": {
        "ko": "차분하며 접근과 처리 권한을 먼저 확인한다.",
        "ja": "落ち着いて、近づく条件と処理の権限を先に確認します。",
        "en": "Calm, checking access conditions and handling authority first."
      }
    },
    "me": {
      "role": {
        "ko": "이물질을 발견한 신입 직원",
        "ja": "異物を見つけた新人係員",
        "en": "A new employee who spotted the debris"
      }
    },
    "goal": {
      "ko": "위치와 관찰 사실을 간단히 보고하고 승인된 안전 절차에 따른 작업 중지·담당자 연락·처리 완료 확인을 요청한다.",
      "ja": "場所と見た事実を簡潔に報告し、承認済みの安全手順に従った作業停止、担当者への連絡、処理完了確認を求めます。",
      "en": "Briefly report location and observed facts, request a pause and authorised handling under the safety procedure, and confirm resolution."
    },
    "twist": {
      "ko": "동료가 출발 준비가 바쁘니 나중에 처리하자고 한다.",
      "ja": "同僚が出発準備で忙しいので後で処理しようと言います。",
      "en": "A colleague suggests leaving it until later because departure preparations are busy."
    },
    "opener": {
      "ko": "통행 구역에서 무엇을 보셨나요? 위치부터 알려 주세요.",
      "ja": "通行する場所で何を見ましたか。まず場所を教えてください。",
      "en": "What did you see in the traffic area? Tell me the location first."
    },
    "source": {
      "definitions": [
        {
          "file": "data/p3x.js",
          "line": 320
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "ランプの主な危険"
          },
          {
            "sectionIndex": 1,
            "heading": "全員が守る基本ルール"
          },
          {
            "sectionIndex": 2,
            "heading": "安全を支える仕組み（SMS）"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "램프의 주요 위험"
          },
          {
            "sectionIndex": 1,
            "heading": "모두가 지키는 기본 규칙"
          },
          {
            "sectionIndex": 2,
            "heading": "안전을 뒷받침하는 체계 (SMS)"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The main hazards"
          },
          {
            "sectionIndex": 1,
            "heading": "Rules everyone follows"
          },
          {
            "sectionIndex": 2,
            "heading": "The safety management system (SMS)"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "t-airport-job"
      ],
      "differenceKo": "업무 소감이 아니라 현장 관찰 사실 보고와 권한 있는 위험 처리 요청이다."
    }
  },
  {
    "id": "lrp-g05-022",
    "course": "1_지상직여객운송입문",
    "lesson": "3-6",
    "lv": 2,
    "lessonTitle": {
      "ko": "램프 차량과 장비(GSE) — 무엇이, 어디서, 무엇을 하나",
      "ja": "ランプの車両と器材（GSE）― 何が、どこで、何をするか",
      "en": "Ramp Vehicles and Equipment (GSE): What, Where and Why"
    },
    "title": {
      "ko": "장비 용도와 점검 이상 확인",
      "ja": "機器の用途と点検の異常を確認する",
      "en": "Check equipment purpose and a failed inspection"
    },
    "scene": {
      "ko": "램프 장비 배치 브리핑에서 요청 장비와 준비된 장비가 다르며 한 대의 점검도 미완료다.",
      "ja": "ランプの機器配置の打ち合わせで、依頼した機器と準備済みの機器が違い、一台は点検も未完了です。",
      "en": "At a GSE allocation briefing, requested and prepared equipment differ, and one unit has not completed its inspection."
    },
    "ai": {
      "role": {
        "ko": "장비 배치를 조정하는 램프 담당자",
        "ja": "機器の配置を調整するランプ担当者",
        "en": "A ramp equipment coordinator"
      },
      "persona": {
        "ko": "협조적이며 장비 용도와 자격·점검 상태를 확인한다.",
        "ja": "協力的で、機器の用途、資格、点検状況を確認します。",
        "en": "Cooperative, checking purpose, operator qualification and inspection status."
      }
    },
    "me": {
      "role": {
        "ko": "배치 요청과 점검 결과를 보고하는 직원",
        "ja": "配置依頼と点検結果を報告する係員",
        "en": "An employee reporting allocation needs and inspection results"
      }
    },
    "goal": {
      "ko": "필요 장비의 용도를 설명하고 기재별 배치·운전자 자격·점검 상태를 확인하여 부적합 장비 사용을 보류하고 대체 준비를 요청한다.",
      "ja": "必要な機器の用途を説明し、機材別配置、運転資格、点検状況を確認して、不適合機器の使用を保留し代替を依頼します。",
      "en": "Explain the equipment purpose, check aircraft layout, operator authorisation and inspection status, and request an approved alternative instead of using an unsuitable unit."
    },
    "twist": {
      "ko": "동료가 자격 없는 직원을 임시 운전자로 배정하자고 제안한다.",
      "ja": "同僚が資格のない社員を臨時の運転者にしようと提案します。",
      "en": "A colleague suggests using an employee without the required authorisation as a temporary operator."
    },
    "opener": {
      "ko": "이번 작업에 필요한 장비와 준비된 장비가 어떻게 다른가요?",
      "ja": "今回必要な機器と準備された機器は、どのように違いますか。",
      "en": "How does the equipment provided differ from what this task requires?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p3g.js",
          "line": 3
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "主なGSE"
          },
          {
            "sectionIndex": 3,
            "heading": "GSEの安全ルール（例）"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "주요 GSE"
          },
          {
            "sectionIndex": 3,
            "heading": "GSE 안전 규칙 (예)"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The main GSE"
          },
          {
            "sectionIndex": 3,
            "heading": "GSE safety rules (examples)"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-deicing-1"
      ],
      "differenceKo": "제빙 지연 승객 설명이 아니라 장비 목적·점검·운전 자격 검증이다."
    }
  },
  {
    "id": "lrp-g05-023",
    "course": "1_지상직여객운송입문",
    "lesson": "4-3",
    "lv": 2,
    "lessonTitle": {
      "ko": "수하물 추적 시스템의 원리",
      "ja": "手荷物追跡システムのしくみ",
      "en": "How the Baggage Tracing System Works"
    },
    "title": {
      "ko": "추적 후보 수하물의 일치 확인",
      "ja": "手荷物追跡の候補を照合する",
      "en": "Verify a candidate match in baggage tracing"
    },
    "scene": {
      "ko": "추적 시스템이 미착 신고와 비슷한 주인 없는 가방을 제시했지만 태그 번호 일부가 다르다.",
      "ja": "追跡システムが未着の申告に似た持ち主不明のかばんを示しましたが、タグ番号の一部が違います。",
      "en": "The tracing system suggests an unclaimed bag matching a delayed-bag report, but part of the tag number differs."
    },
    "ai": {
      "role": {
        "ko": "후보 수하물 정보를 제공하는 타 공항 직원",
        "ja": "候補の手荷物情報を伝える他空港の係員",
        "en": "An agent at another airport providing candidate-bag details"
      },
      "persona": {
        "ko": "협조적이며 확인된 단서와 추정 단서를 구분한다.",
        "ja": "協力的で、確認済みの手掛かりと推測を分けます。",
        "en": "Helpful and clear about confirmed clues versus assumptions."
      }
    },
    "me": {
      "role": {
        "ko": "추적 등록 정보를 대조하는 수하물 담당자",
        "ja": "追跡登録を照合する手荷物担当者",
        "en": "A baggage agent comparing tracing records"
      }
    },
    "goal": {
      "ko": "태그·여정·색과 모양·특징을 원 자료와 대조하고 추가 단서를 요청하며, 후보를 확정 수하물처럼 안내하지 않고 확인 결과를 갱신한다.",
      "ja": "タグ、旅程、色と形、特徴を元資料と照合して追加情報を求め、候補を確定した手荷物として案内せず結果を更新します。",
      "en": "Compare tag, itinerary, colour, shape and distinctive features with source records; seek more clues and update the case without treating a candidate as confirmed."
    },
    "twist": {
      "ko": "상대 공항이 특징 사진은 같지만 등록 색상 코드가 잘못됐을 수 있다고 말한다.",
      "ja": "相手空港が、特徴の写真は一致しますが色の登録が誤っているかもしれないと言います。",
      "en": "The other station says the distinctive photo matches, but the colour code may be wrong."
    },
    "opener": {
      "ko": "비슷한 가방을 찾았습니다. 일치로 처리하기 전에 어떤 항목을 더 맞춰 볼까요?",
      "ja": "似たかばんが見つかりました。一致とする前に、どの項目をさらに照合しますか。",
      "en": "We found a similar bag. What else should we compare before confirming a match?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p4x.js",
          "line": 146
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "照合のしくみ"
          },
          {
            "sectionIndex": 1,
            "heading": "登録に使う主な情報"
          },
          {
            "sectionIndex": 2,
            "heading": "登録の質が結果を決める"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "대조 원리"
          },
          {
            "sectionIndex": 1,
            "heading": "등록에 쓰는 주요 정보"
          },
          {
            "sectionIndex": 2,
            "heading": "등록 품질이 결과를 좌우한다"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "How matching works"
          },
          {
            "sectionIndex": 1,
            "heading": "The information used"
          },
          {
            "sectionIndex": 2,
            "heading": "Registration quality decides the result"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-baggage-1",
        "air-irrops-baggage-misconnect-1"
      ],
      "differenceKo": "승객 미착 접수가 아니라 공항 간 AHL·OHD 후보의 일치 검증과 등록 품질 개선이다."
    }
  },
  {
    "id": "lrp-g05-024",
    "course": "1_지상직여객운송입문",
    "lesson": "4-4",
    "lv": 2,
    "lessonTitle": {
      "ko": "분실물 대응",
      "ja": "忘れ物・落とし物への対応",
      "en": "Lost Property"
    },
    "title": {
      "ko": "발견 물품의 인계 기록 확인",
      "ja": "拾得物の引継ぎ記録を確認する",
      "en": "Check the handover record for a found item"
    },
    "scene": {
      "ko": "청소 담당이 객실에서 찾은 지갑을 인계하려는데 발견 장소와 인수 기록이 빠져 있다.",
      "ja": "清掃担当が客室で見つけた財布を引き渡そうとしていますが、発見場所と受取記録が抜けています。",
      "en": "A cleaner hands over a wallet found in the cabin, but the location and receipt record are missing."
    },
    "ai": {
      "role": {
        "ko": "발견 물품을 가져온 청소 담당자",
        "ja": "拾得物を持ってきた清掃担当者",
        "en": "A cleaner handing over found property"
      },
      "persona": {
        "ko": "협조적이며 기억나는 사실과 모르는 사실을 분명히 말한다.",
        "ja": "協力的で、覚えている事実と分からない事実をはっきり伝えます。",
        "en": "Cooperative, clearly distinguishing remembered details from unknowns."
      }
    },
    "me": {
      "role": {
        "ko": "유실물 접수와 보관을 맡은 직원",
        "ja": "拾得物の受付と保管を担当する係員",
        "en": "An agent receiving and storing lost property"
      }
    },
    "goal": {
      "ko": "발견 시각·장소·편·특징·발견자를 확인하고 회사 절차에 따라 인수·보관 기록을 남기며 반환 전 본인 확인 방법을 정한다.",
      "ja": "発見時刻、場所、便、特徴、発見者を確認し、会社手順に沿って受取と保管を記録して、返却前の本人確認方法を決めます。",
      "en": "Verify time, location, flight, features and finder; record receipt and storage under company procedures and establish verification before return."
    },
    "twist": {
      "ko": "다른 직원이 가족을 대신해 찾으러 왔다는 사람에게 바로 전달하자고 한다.",
      "ja": "別の係員が、家族の代わりに受け取りに来た人へすぐ渡そうと言います。",
      "en": "Another employee suggests handing it directly to someone claiming to collect it for a relative."
    },
    "opener": {
      "ko": "기내에서 지갑을 찾았는데 인계할 때 무엇을 기록해야 하나요?",
      "ja": "機内で財布を見つけました。引き渡すときは何を記録しますか。",
      "en": "I found a wallet in the cabin. What do we need to record when I hand it over?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p4x.js",
          "line": 210
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "見つけてから返すまで"
          },
          {
            "sectionIndex": 1,
            "heading": "特に注意が必要な物"
          },
          {
            "sectionIndex": 3,
            "heading": "問い合わせへの対応"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "발견부터 반환까지"
          },
          {
            "sectionIndex": 1,
            "heading": "특히 주의가 필요한 물건"
          },
          {
            "sectionIndex": 3,
            "heading": "문의 대응"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "From finding to returning"
          },
          {
            "sectionIndex": 1,
            "heading": "Items needing particular care"
          },
          {
            "sectionIndex": 3,
            "heading": "Handling enquiries"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "travel-lost-phone-1",
        "air-baggage-1"
      ],
      "differenceKo": "여행자의 분실 신고가 아니라 발견자→보관 담당의 증거·인수 기록과 반환 전 확인이다."
    }
  },
  {
    "id": "lrp-g05-025",
    "course": "1_지상직여객운송입문",
    "lesson": "6-2",
    "lv": 3,
    "lessonTitle": {
      "ko": "조업사 관리 — 월간 회의·품질점검·교육",
      "ja": "ハンドリング会社の管理 ― 月例会議・品質監査・教育",
      "en": "Managing the Handling Company: Meetings, Quality Checks and Training"
    },
    "title": {
      "ko": "월간 조업 회의의 시정 계획",
      "ja": "月例会議で改善計画を決める",
      "en": "Agree corrective actions at the monthly handler meeting"
    },
    "scene": {
      "ko": "월간 회의에서 게이트 준비 지적이 반복돼 조업사와 원인·대책을 협의한다.",
      "ja": "月例会議で搭乗口の準備に同じ指摘が続き、取扱会社と原因と対策を相談します。",
      "en": "Repeated gate-readiness findings are discussed with the handler at the monthly meeting."
    },
    "ai": {
      "role": {
        "ko": "현장 사정을 설명하는 조업사 수퍼바이저",
        "ja": "現場事情を説明する取扱会社の責任者",
        "en": "A handler supervisor explaining local constraints"
      },
      "persona": {
        "ko": "방어적이기보다 사실에 근거한 공동 개선을 원한다.",
        "ja": "事実に基づいて一緒に改善したいと考えています。",
        "en": "Interested in evidence-based improvement rather than blame."
      }
    },
    "me": {
      "role": {
        "ko": "품질 점검 결과를 제시하는 항공사 지점 직원",
        "ja": "品質点検の結果を示す航空会社支店の社員",
        "en": "An airline station employee presenting quality findings"
      }
    },
    "goal": {
      "ko": "점검 근거와 영향 범위를 제시하고 원인을 구분하며, 담당자·기한·교육·재점검 방법을 포함한 시정 계획을 회의록에 합의한다.",
      "ja": "点検の根拠と影響を示して原因を分け、担当者、期限、教育、再点検を含む改善計画を議事録で合意します。",
      "en": "Present the evidence and impact, distinguish causes and agree recorded corrective actions with owners, deadlines, training and follow-up checks."
    },
    "twist": {
      "ko": "조업사가 절차 변경 공지를 받은 직원과 받지 못한 직원이 섞여 있다고 말한다.",
      "ja": "取扱会社が、手順変更の通知を受けた社員と受けていない社員が混在していると伝えます。",
      "en": "The handler reports that some employees received the procedure-change notice and others did not."
    },
    "opener": {
      "ko": "이번에도 준비 지적이 나왔는데 어떤 기록을 근거로 함께 개선하면 좋을까요?",
      "ja": "今回も準備の指摘がありました。どの記録を基に一緒に改善しましょうか。",
      "en": "There is another readiness finding. Which records should we use to agree improvements together?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p6x.js",
          "line": 90
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "月例会議の進め方"
          },
          {
            "sectionIndex": 2,
            "heading": "品質監査"
          },
          {
            "sectionIndex": 3,
            "heading": "教育"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "월간 회의 진행"
          },
          {
            "sectionIndex": 2,
            "heading": "품질 점검"
          },
          {
            "sectionIndex": 3,
            "heading": "교육"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "Running the monthly meeting"
          },
          {
            "sectionIndex": 2,
            "heading": "Quality checks"
          },
          {
            "sectionIndex": 3,
            "heading": "Training"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "t-meeting-opinion",
        "office-client-complaint-1"
      ],
      "differenceKo": "일반 회의 의견·납품 불만 대응이 아니라 조업 점검 근거와 교육 변경 이력을 반영한 시정 계획 합의다."
    }
  }
];
  if(root.LESSON_RP != null && !Array.isArray(root.LESSON_RP)) { throw new TypeError("LESSON_RP must be an array"); }
  var current=root.LESSON_RP || [];
  var seen=Object.create(null);
  current.forEach(function(item){ if(item && typeof item.id === "string") seen[item.id]=true; });
  root.LESSON_RP=current.concat(batch.filter(function(item){ if(seen[item.id]) return false; seen[item.id]=true; return true; }));
})(typeof window !== "undefined" ? window : globalThis);
