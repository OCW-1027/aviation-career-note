/* 항공커리어노트: lesson-linked AI roleplay; lesson_rp_g02.js; 2026-10-10.
   Additive data only. Does not touch ARTS, TALK, TALK_TOPICS, storage, audio or network. */
(function(root){
  "use strict";
  var batch=[
  {
    "id": "lrp-g02-006",
    "course": "1_지상직여객운송입문",
    "lesson": "1-3",
    "lv": 3,
    "lessonTitle": {
      "ko": "체크인 흐름과 여권·비자 확인",
      "ja": "チェックインの流れとパスポート・ビザ確認",
      "en": "The Check-in Flow and Checking Passports and Visas"
    },
    "title": {
      "ko": "환승 서류 판단을 책임자에게 넘기기",
      "ja": "乗り継ぎ書類の判断を責任者へつなぐ",
      "en": "Escalate an unresolved transit-document check"
    },
    "scene": {
      "ko": "여권과 항공권 이름은 일치하지만 경유지에서 입국해야 하는지와 필요한 서류가 아직 확인되지 않았다.",
      "ja": "旅券と航空券の名前は一致していますが、乗り継ぎ地で入国が必要か、必要書類は何かが未確認です。",
      "en": "The passport and ticket names match, but transit-entry requirements and supporting documents remain unverified."
    },
    "ai": {
      "role": {
        "ko": "온라인 설명만 보고 탑승 가능하다고 생각하는 승객",
        "ja": "ネットの説明だけで搭乗できると思っているお客様",
        "en": "A passenger relying on an online explanation"
      },
      "persona": {
        "ko": "정중하지만 빨리 수속을 끝내고 싶어 한다.",
        "ja": "丁寧ですが、早く手続きを終えたがっています。",
        "en": "Polite, but eager to finish check-in quickly."
      }
    },
    "me": {
      "role": {
        "ko": "목적지와 경유지 서류를 확인하는 여객 직원",
        "ja": "目的地と乗り継ぎ地の書類を確認する旅客係員",
        "en": "A passenger agent checking destination and transit documents"
      }
    },
    "goal": {
      "ko": "전체 여정과 여행 서류를 확인하고, 최신 업무용 조건 자료와 책임자 판단이 필요함을 설명한 뒤 수속 보류 사유를 기록한다.",
      "ja": "全旅程と旅行書類を確認し、最新の業務用条件資料と責任者の判断が必要だと説明して、手続き保留の理由を記録します。",
      "en": "Confirm the full itinerary and documents, explain the need for current operational requirements and supervisor review, and record why check-in is on hold."
    },
    "twist": {
      "ko": "승객이 경유지 공항 밖에서 지인을 만나고 싶다고 말한다.",
      "ja": "お客様が、乗り継ぎ空港の外で知人に会いたいと言います。",
      "en": "The passenger says they want to leave the transit airport to meet a friend."
    },
    "opener": {
      "ko": "환승만 하는데도 서류를 더 확인해야 하나요?",
      "ja": "乗り継ぐだけでも、書類をさらに確認する必要がありますか。",
      "en": "Do you still need to check more documents if I am only connecting?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1x.js",
          "line": 98
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "必ず確認する4項目"
          },
          {
            "sectionIndex": 2,
            "heading": "国籍による確認の流れ（例）"
          },
          {
            "sectionIndex": 5,
            "heading": "判断に迷ったとき"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "반드시 확인할 4가지"
          },
          {
            "sectionIndex": 2,
            "heading": "국적별 확인 흐름 (예)"
          },
          {
            "sectionIndex": 5,
            "heading": "판단이 어려울 때"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "Four things to check every time"
          },
          {
            "sectionIndex": 2,
            "heading": "Checking flow by nationality (example)"
          },
          {
            "sectionIndex": 5,
            "heading": "When the decision is difficult"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-checkin-1",
        "air-irrops-passport-damage-1",
        "air-irrops-missed-connection-1"
      ],
      "differenceKo": "이름 철자 오류·여권 훼손·연결편 놓침이 아니라 경유지 입국 의사 변경에 따른 확인과 판단 보류다."
    }
  },
  {
    "id": "lrp-g02-007",
    "course": "1_지상직여객운송입문",
    "lesson": "1-5",
    "lv": 2,
    "lessonTitle": {
      "ko": "좌석 배정·업그레이드와 비상구 열 좌석",
      "ja": "座席指定・アップグレードと非常口座席",
      "en": "Seat Assignment, Upgrades and Exit Row Seats"
    },
    "title": {
      "ko": "비상구 좌석 협조 의사 확인",
      "ja": "非常口座席で協力の意思を確認する",
      "en": "Confirm willingness to assist at an exit-row seat"
    },
    "scene": {
      "ko": "비상구 열 좌석을 구매한 승객에게 좌석의 역할과 협조 조건을 설명하는 중이다.",
      "ja": "非常口座席を購入したお客様に、座席の役割と協力条件を説明しています。",
      "en": "You explain the responsibilities and assistance conditions to a passenger who purchased an exit-row seat."
    },
    "ai": {
      "role": {
        "ko": "다리 공간은 원하지만 비상시 역할은 원하지 않는 승객",
        "ja": "足元の広さは希望しますが、緊急時の役割は望まないお客様",
        "en": "A passenger who wants legroom but does not want an emergency-assistance role"
      },
      "persona": {
        "ko": "불쾌해하지 않지만 구매했으니 그대로 앉을 수 있다고 생각한다.",
        "ja": "穏やかですが、購入したのでそのまま座れると思っています。",
        "en": "Even-tempered, but assumes payment guarantees the seat."
      }
    },
    "me": {
      "role": {
        "ko": "좌석 조건을 확인하는 카운터 직원",
        "ja": "座席の条件を確認するカウンター係員",
        "en": "A counter agent checking exit-row suitability"
      }
    },
    "goal": {
      "ko": "역할 이해와 협조 의사를 확인하고, 거부하면 회사 절차에 따라 대체 좌석을 확인하며 변경·요금 문의를 담당자에게 연결한다.",
      "ja": "役割の理解と協力の意思を確認し、希望しない場合は会社手順に沿って別の席を確認し、変更や料金の相談を担当者へつなぎます。",
      "en": "Check understanding and willingness; if assistance is declined, explore another seat under company procedures and refer change or fee questions appropriately."
    },
    "twist": {
      "ko": "승객이 좌석을 바꾸면 좌석 요금이 자동 환불되는지 묻는다.",
      "ja": "お客様が、席を変えると座席料金は自動で返金されるか尋ねます。",
      "en": "The passenger asks whether changing seats automatically refunds the seat fee."
    },
    "opener": {
      "ko": "좌석은 넓어서 좋은데 비상시 도움은 맡고 싶지 않아요. 괜찮나요?",
      "ja": "広い席はよいのですが、緊急時のお手伝いはしたくありません。大丈夫ですか。",
      "en": "I like the extra space, but I do not want to help in an emergency. Is that okay?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1x.js",
          "line": 196
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "非常口座席の条件"
          },
          {
            "sectionIndex": 2,
            "heading": "非常口座席の割り当ての手順"
          },
          {
            "sectionIndex": 4,
            "heading": "航空会社による違い（例）"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "비상구 열 좌석 조건"
          },
          {
            "sectionIndex": 2,
            "heading": "비상구 열 좌석 배정 절차"
          },
          {
            "sectionIndex": 4,
            "heading": "항공사별 차이 (예)"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "Conditions for exit row seats"
          },
          {
            "sectionIndex": 2,
            "heading": "Procedure for assigning exit row seats"
          },
          {
            "sectionIndex": 4,
            "heading": "How airlines differ (examples)"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-aircraft-change-1"
      ],
      "differenceKo": "기종 변경으로 가족 좌석을 재배정하는 장면이 아니라 협조 의사와 좌석 조건을 확인하는 장면이다."
    }
  },
  {
    "id": "lrp-g02-008",
    "course": "1_지상직여객운송입문",
    "lesson": "1-6",
    "lv": 2,
    "lessonTitle": {
      "ko": "특별 승객 ① 유아·소아, 임산부·의료 배려 승객",
      "ja": "特別対応① 幼児・小児、妊娠中・医療の配慮が必要なお客様",
      "en": "Special Assistance 1: Infants, Children, Pregnant Passengers and Medical Needs"
    },
    "title": {
      "ko": "유아 요람 요청과 가능 여부 확인",
      "ja": "幼児用ベッドの希望と利用可否を確認する",
      "en": "Check an infant bassinet request and availability"
    },
    "scene": {
      "ko": "유아 동반 보호자가 요람을 요청하지만 예약에 신청 내역이 확인되지 않는다.",
      "ja": "幼児を連れた保護者がベビーベッドを希望しますが、予約に申請の記録が見当たりません。",
      "en": "A parent travelling with an infant requests a bassinet, but no request appears in the booking."
    },
    "ai": {
      "role": {
        "ko": "요람과 유모차 처리 방법을 문의하는 보호자",
        "ja": "ベビーベッドとベビーカーの扱いを尋ねる保護者",
        "en": "A parent asking about bassinet and stroller arrangements"
      },
      "persona": {
        "ko": "걱정이 많으며 확정 여부를 분명히 듣고 싶어 한다.",
        "ja": "心配しており、確定したかどうかをはっきり知りたがっています。",
        "en": "Concerned and keen to distinguish a request from a confirmed arrangement."
      }
    },
    "me": {
      "role": {
        "ko": "유아 동반 수속을 맡은 직원",
        "ja": "幼児連れの手続きを担当する係員",
        "en": "An agent checking in a family with an infant"
      }
    },
    "goal": {
      "ko": "유아 정보와 사전 요청을 확인하고 기재·좌석·회사 조건에 따른 가능 여부를 조회한 뒤 확정 사항과 대기 사항을 구분해 안내한다.",
      "ja": "幼児の情報と事前申請を確認し、機材、座席、会社条件に応じた可否を照会して、確定事項と確認中の事項を分けて案内します。",
      "en": "Check infant details and prior requests, verify aircraft, seat and company conditions, and clearly separate confirmed arrangements from pending checks."
    },
    "twist": {
      "ko": "보호자가 유모차도 탑승 직전까지 사용할 수 있다고 확정해 달라고 요청한다.",
      "ja": "保護者が、搭乗直前までベビーカーを使えることも確約してほしいと頼みます。",
      "en": "The parent asks you to guarantee stroller use until the moment of boarding."
    },
    "opener": {
      "ko": "요람을 미리 신청한 줄 알았는데 기록이 없나요? 지금 확인해 주실 수 있을까요?",
      "ja": "ベビーベッドを申し込んだつもりですが、記録がありませんか。今、確認していただけますか。",
      "en": "I thought I requested a bassinet. Is it missing from the booking, and can you check now?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1x.js",
          "line": 294
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "幼児・小児の基本"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "유아·소아 기본"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "Infants and children: the basics"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-aircraft-change-1",
        "air-irrops-missed-connection-1"
      ],
      "differenceKo": "가족 좌석 분리나 연결편 실패가 아니라 유아 서비스의 신청·조회·확정 상태를 구분한다."
    }
  },
  {
    "id": "lrp-g02-009",
    "course": "1_지상직여객운송입문",
    "lesson": "1-7",
    "lv": 3,
    "lessonTitle": {
      "ko": "특별 승객 ② 휠체어·장애인 승객, 비동반 소아",
      "ja": "特別対応② 車いす・お身体の不自由なお客様、お一人で旅行するお子様",
      "en": "Special Assistance 2: Wheelchair Users, Passengers with Disabilities and Unaccompanied Minors"
    },
    "title": {
      "ko": "비동반 소아의 인수 보호자 변경",
      "ja": "一人旅のお子様の迎えの変更を確認する",
      "en": "Verify a change of guardian collecting an unaccompanied child"
    },
    "scene": {
      "ko": "비동반 소아의 출발 서류를 확인하던 중 보호자가 도착지 인수자를 바꾸고 싶다고 말한다.",
      "ja": "一人で旅行するお子様の出発書類を確認中、保護者が到着地の迎えの人を変えたいと言います。",
      "en": "While checking departure paperwork for an unaccompanied child, the parent requests a different collecting guardian."
    },
    "ai": {
      "role": {
        "ko": "인수자 변경을 요청하는 출발지 보호자",
        "ja": "迎えの人の変更を希望する出発地の保護者",
        "en": "The departure guardian requesting the change"
      },
      "persona": {
        "ko": "친절하지만 가족이면 구두 변경만으로 충분하다고 생각한다.",
        "ja": "丁寧ですが、家族なら口頭の変更だけで十分だと思っています。",
        "en": "Friendly, but assumes a verbal change is sufficient for a relative."
      }
    },
    "me": {
      "role": {
        "ko": "UM 서류와 인계 정보를 확인하는 직원",
        "ja": "お子様の一人旅の書類と引継ぎ情報を確認する係員",
        "en": "An agent verifying UM documents and handover information"
      }
    },
    "goal": {
      "ko": "변경 내용을 듣고 지정 서류와 확인 절차를 안내하며, 책임자·객실·도착지에 같은 승인 정보를 전달하고 인계 확인을 기록한다.",
      "ja": "変更内容を聞き、指定書類と確認手順を案内し、責任者、客室、到着地へ同じ承認済み情報を伝えて引継ぎ確認を記録します。",
      "en": "Clarify the change, explain the required document checks, share the same approved information with supervisor, cabin and destination, and record handover confirmation."
    },
    "twist": {
      "ko": "도착지 직원이 기존 인수자 정보만 가지고 있다고 연락한다.",
      "ja": "到着地の係員から、元の迎えの人の情報しかないと連絡が入ります。",
      "en": "The destination agent says only the original guardian details are on file."
    },
    "opener": {
      "ko": "도착해서 아이를 데려갈 사람이 바뀌었어요. 지금 말씀드리면 될까요?",
      "ja": "到着後に子どもを迎える人が変わりました。今、お伝えすればよいですか。",
      "en": "The person collecting my child has changed. Can I just tell you now?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1x.js",
          "line": 376
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 4,
            "heading": "お一人で旅行するお子様（UM）"
          },
          {
            "sectionIndex": 5,
            "heading": "UMの引き継ぎの流れ"
          }
        ],
        "ko": [
          {
            "sectionIndex": 4,
            "heading": "비동반 소아 (UM)"
          },
          {
            "sectionIndex": 5,
            "heading": "UM 인계 흐름"
          }
        ],
        "en": [
          {
            "sectionIndex": 4,
            "heading": "Unaccompanied minors (UM)"
          },
          {
            "sectionIndex": 5,
            "heading": "Handing over a UM"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-wheelchair-1",
        "office-handover-1"
      ],
      "differenceKo": "휠체어 요청과 구별하여 UM의 인수자 변경 승인 및 출발지·객실·도착지 정보 일치를 다룬다."
    }
  },
  {
    "id": "lrp-g02-010",
    "course": "1_지상직여객운송입문",
    "lesson": "1-10",
    "lv": 2,
    "lessonTitle": {
      "ko": "수하물 규정 ① 위탁·기내·초과",
      "ja": "手荷物規定① 受託・機内持ち込み・超過",
      "en": "Baggage Rules 1: Checked, Carry-on and Excess"
    },
    "title": {
      "ko": "다른 운임의 수하물 합산 문의",
      "ja": "異なる運賃の手荷物合算を確認する",
      "en": "Check baggage pooling across different fares"
    },
    "scene": {
      "ko": "함께 여행하는 두 승객이 서로 다른 운임으로 예약했으며 무료 허용량을 합산하고 싶어 한다.",
      "ja": "一緒に旅行する二人が異なる運賃で予約し、無料手荷物許容量を合算したいと希望しています。",
      "en": "Two passengers travelling together on different fares ask to pool their baggage allowances."
    },
    "ai": {
      "role": {
        "ko": "일행과 허용량을 합칠 수 있다고 생각하는 승객",
        "ja": "同行者と許容量を合算できると思っているお客様",
        "en": "A passenger expecting to pool allowances with a companion"
      },
      "persona": {
        "ko": "비용에 민감하지만 근거가 보이면 선택지를 비교한다.",
        "ja": "費用を気にしますが、根拠が分かれば選択肢を比べます。",
        "en": "Cost-conscious, but willing to compare options when the basis is clear."
      }
    },
    "me": {
      "role": {
        "ko": "예약 조건과 수하물을 확인하는 직원",
        "ja": "予約条件と手荷物を確認する係員",
        "en": "An agent checking fare conditions and bags"
      }
    },
    "goal": {
      "ko": "각 운임의 허용량과 합산 가능 여부, 개당 제한을 별도로 확인하고 적용 요금과 안전한 대안을 확정된 조건에 따라 설명한다.",
      "ja": "各運賃の許容量、合算の可否、一個ごとの制限を別々に確認し、確認済み条件に沿って料金と安全な代案を説明します。",
      "en": "Verify each fare allowance, pooling eligibility and per-bag limits separately, then explain confirmed charges and safe alternatives."
    },
    "twist": {
      "ko": "승객이 한 가방에 모두 넣으면 개당 제한도 없어지는지 묻는다.",
      "ja": "お客様が、一つのかばんにまとめれば一個ごとの制限もなくなるか尋ねます。",
      "en": "The passenger asks whether combining everything into one bag removes the per-bag limit."
    },
    "opener": {
      "ko": "함께 가는 일행인데 두 사람의 수하물 허용량을 합칠 수 있을까요?",
      "ja": "同行者と一緒なのですが、二人の手荷物許容量を合算できますか。",
      "en": "We are travelling together. Can we combine our baggage allowances?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1x.js",
          "line": 484
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 1,
            "heading": "覚えておきたいルール"
          },
          {
            "sectionIndex": 4,
            "heading": "超過手荷物の料金"
          }
        ],
        "ko": [
          {
            "sectionIndex": 1,
            "heading": "알아 둘 규칙"
          },
          {
            "sectionIndex": 4,
            "heading": "초과 수하물 요금"
          }
        ],
        "en": [
          {
            "sectionIndex": 1,
            "heading": "Rules to know"
          },
          {
            "sectionIndex": 4,
            "heading": "Excess baggage charges"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-checkin-1"
      ],
      "differenceKo": "예약 이름 수정에 딸린 무게 초과 대응이 아니라 서로 다른 운임의 합산·개당 상한을 분리 확인한다."
    }
  }
];
  if(root.LESSON_RP != null && !Array.isArray(root.LESSON_RP)) { throw new TypeError("LESSON_RP must be an array"); }
  var current=root.LESSON_RP || [];
  var seen=Object.create(null);
  current.forEach(function(item){ if(item && typeof item.id === "string") seen[item.id]=true; });
  root.LESSON_RP=current.concat(batch.filter(function(item){ if(seen[item.id]) return false; seen[item.id]=true; return true; }));
})(typeof window !== "undefined" ? window : globalThis);
