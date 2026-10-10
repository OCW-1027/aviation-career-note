/* 항공커리어노트: lesson-linked AI roleplay; lesson_rp_g03.js; 2026-10-10.
   Additive data only. Does not touch ARTS, TALK, TALK_TOPICS, storage, audio or network. */
(function(root){
  "use strict";
  var batch=[
  {
    "id": "lrp-g03-011",
    "course": "1_지상직여객운송입문",
    "lesson": "1-2",
    "lv": 2,
    "lessonTitle": {
      "ko": "공항 안내방송의 기본 (평시·비정상시)",
      "ja": "空港アナウンスの基本（平常時・イレギュラー時）",
      "en": "The Basics of Airport Announcements (Normal and Irregular Operations)"
    },
    "title": {
      "ko": "방송 초안과 표시 정보 맞추기",
      "ja": "放送原稿と案内表示をそろえる",
      "en": "Align an announcement draft with display information"
    },
    "scene": {
      "ko": "출발 안내 방송 초안을 검토하는데 모니터와 직원 메모의 안내 시각이 다르다.",
      "ja": "出発案内の放送原稿を確認すると、表示画面と係員のメモで案内時刻が異なっています。",
      "en": "An announcement draft is under review, but the screen and staff notes show different update times."
    },
    "ai": {
      "role": {
        "ko": "방송을 시작하려는 동료",
        "ja": "放送を始めようとしている同僚",
        "en": "A colleague about to make the announcement"
      },
      "persona": {
        "ko": "협조적이지만 빨리 방송하고 싶어 한다.",
        "ja": "協力的ですが、早く放送したがっています。",
        "en": "Cooperative, but keen to announce immediately."
      }
    },
    "me": {
      "role": {
        "ko": "방송 내용과 정보 출처를 검토하는 직원",
        "ja": "放送内容と情報の出所を確認する係員",
        "en": "An agent reviewing the wording and information source"
      }
    },
    "goal": {
      "ko": "확정 정보의 출처를 확인하고 방송·표시·직원 안내를 통일한 뒤, 미정 출발 시각 대신 다음 안내 시점을 넣어 짧게 전달한다.",
      "ja": "確定情報の出所を確認し、放送、表示、係員の案内をそろえ、未定の出発時刻の代わりに次の案内時点を簡潔に伝えます。",
      "en": "Verify the authoritative source, align announcement, displays and staff guidance, and state the next update instead of inventing a departure time."
    },
    "twist": {
      "ko": "동료가 확인되지 않은 출발 전망을 방송에 덧붙이자고 한다.",
      "ja": "同僚が、未確認の出発見込みも放送に加えようと提案します。",
      "en": "The colleague proposes adding an unconfirmed departure estimate."
    },
    "opener": {
      "ko": "메모와 화면 시각이 다른데 이 초안으로 방송해도 될까요?",
      "ja": "メモと画面の時刻が違いますが、この原稿で放送してもよいですか。",
      "en": "The notes and display disagree. Can I use this announcement draft?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1y.js",
          "line": 2
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "アナウンスの基本的な心構え"
          },
          {
            "sectionIndex": 4,
            "heading": "イレギュラー時のアナウンス"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "방송의 기본자세"
          },
          {
            "sectionIndex": 4,
            "heading": "비정상 상황 방송"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The basic approach"
          },
          {
            "sectionIndex": 4,
            "heading": "Announcements in irregular operations"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-gate-delay-1",
        "air-irrops-maintenance-check-1"
      ],
      "differenceKo": "승객에게 지연을 설명하는 회화가 아니라 방송 전 출처 확인과 채널 간 정보 동기화다."
    }
  },
  {
    "id": "lrp-g03-012",
    "course": "1_지상직여객운송입문",
    "lesson": "1-4",
    "lv": 2,
    "lessonTitle": {
      "ko": "이원 구간·환승 승객 수속",
      "ja": "以遠区間・乗り継ぎのお客様の手続き",
      "en": "Passengers with Onward and Connecting Flights"
    },
    "title": {
      "ko": "환승 수하물 수취 장소 확인",
      "ja": "乗り継ぎ時の手荷物受取場所を確認する",
      "en": "Confirm where bags must be collected during a connection"
    },
    "scene": {
      "ko": "제휴사 연결 여정을 수속하며 탑승권 발행 범위와 수하물 연결 범위가 같은지 확인한다.",
      "ja": "提携会社への乗り継ぎ手続きで、搭乗券を発行できる区間と手荷物を預かれる区間を確認します。",
      "en": "For an interline connection, you check whether boarding-pass issuance and baggage through-check cover the same segments."
    },
    "ai": {
      "role": {
        "ko": "최종 목적지에서만 수하물을 찾으면 된다고 생각하는 승객",
        "ja": "最終目的地でだけ手荷物を受け取ればよいと思っているお客様",
        "en": "A passenger assuming bags are collected only at the final destination"
      },
      "persona": {
        "ko": "협조적이며 안내를 자신의 말로 확인한다.",
        "ja": "協力的で、説明を自分の言葉で確認します。",
        "en": "Cooperative and willing to repeat the instructions back."
      }
    },
    "me": {
      "role": {
        "ko": "연결편과 수하물 태그를 확인하는 직원",
        "ja": "乗り継ぎ便と手荷物タグを確認する係員",
        "en": "An agent checking onward flights and bag tags"
      }
    },
    "goal": {
      "ko": "협정·여정·환승 조건을 조회하고 태그 행선지와 중간 수취 필요 여부를 설명한 뒤 승객의 이해를 확인한다.",
      "ja": "協定、旅程、乗り継ぎ条件を照会し、タグの行き先と途中での受取の要否を説明して、お客様の理解を確認します。",
      "en": "Check agreements, itinerary and connection requirements, explain the tag destination and any intermediate collection, and verify the passenger understands."
    },
    "twist": {
      "ko": "승객이 중간 도시에서 하루 체류한다는 사실을 뒤늦게 알린다.",
      "ja": "お客様が、途中の都市で一泊すると後から伝えます。",
      "en": "The passenger then reveals an overnight stop in the intermediate city."
    },
    "opener": {
      "ko": "다음 항공사 탑승권도 받았으니 짐도 끝까지 연결되는 거죠?",
      "ja": "次の航空会社の搭乗券も受け取ったので、手荷物も最後まで預けられますよね。",
      "en": "I have the next airline’s boarding pass, so my bag goes all the way through, right?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1y.js",
          "line": 108
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "乗り継ぎの2つのパターン"
          },
          {
            "sectionIndex": 1,
            "heading": "必ず確認する4つのこと"
          },
          {
            "sectionIndex": 2,
            "heading": "途中降機（ストップオーバー）と超過料金"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "환승의 두 가지 유형"
          },
          {
            "sectionIndex": 1,
            "heading": "반드시 확인할 네 가지"
          },
          {
            "sectionIndex": 2,
            "heading": "도중 체류(스톱오버)와 초과 요금"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "Two types of connection"
          },
          {
            "sectionIndex": 1,
            "heading": "Four things to check every time"
          },
          {
            "sectionIndex": 2,
            "heading": "Stopovers and excess charges"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-missed-connection-1",
        "air-irrops-baggage-misconnect-1"
      ],
      "differenceKo": "연결 실패 사후 재예약이나 미착 신고가 아니라 출발 전 태그 범위와 중간 수취를 확인한다."
    }
  },
  {
    "id": "lrp-g03-013",
    "course": "1_지상직여객운송입문",
    "lesson": "1-8",
    "lv": 2,
    "lessonTitle": {
      "ko": "특별 승객 ③ 반려동물 운송",
      "ja": "特別対応③ ペットの輸送",
      "en": "Special Assistance 3: Carrying Pets"
    },
    "title": {
      "ko": "반려동물 운송 승인 상태 확인",
      "ja": "ペットの輸送承認を確認する",
      "en": "Verify the approval status of a pet carriage request"
    },
    "scene": {
      "ko": "반려동물 동반 승객의 예약에는 문의 메모만 있고 운송 승인 여부가 확정되지 않았다.",
      "ja": "ペット連れのお客様の予約に問い合わせメモはありますが、輸送承認が確定していません。",
      "en": "A pet traveller’s booking contains an enquiry note but no confirmed carriage approval."
    },
    "ai": {
      "role": {
        "ko": "문의 접수를 운송 승인으로 이해한 승객",
        "ja": "問い合わせの受付を輸送承認だと思っているお客様",
        "en": "A passenger who confuses an enquiry with approval"
      },
      "persona": {
        "ko": "동물을 걱정하며 필요한 확인 순서를 알고 싶어 한다.",
        "ja": "ペットを心配し、必要な確認の順番を知りたがっています。",
        "en": "Concerned about the animal and keen to understand the checks."
      }
    },
    "me": {
      "role": {
        "ko": "반려동물 예약과 서류를 확인하는 직원",
        "ja": "ペットの予約と書類を確認する係員",
        "en": "An agent checking pet bookings and documents"
      }
    },
    "goal": {
      "ko": "예약 승인, 기재·케이지 조건, 경유지·도착지 서류를 조회하고 미확정 항목을 책임자에게 연결한 뒤 확정 운송 정보를 공유한다.",
      "ja": "予約承認、機材と容器の条件、乗り継ぎ地と到着地の書類を照会し、未確定事項を責任者へつないで確定情報を共有します。",
      "en": "Verify booking approval, aircraft and carrier requirements, and transit/destination documents; escalate unresolved items and share only confirmed carriage details."
    },
    "twist": {
      "ko": "승객이 왕편 승인만으로 다른 기재의 복편도 승인된 것인지 묻는다.",
      "ja": "お客様が、往路の承認で機材の異なる復路も承認済みか尋ねます。",
      "en": "The passenger asks whether outbound approval also covers the return flight on a different aircraft."
    },
    "opener": {
      "ko": "전화로 문의했는데 반려동물 운송이 승인된 건지 확인해 주실 수 있나요?",
      "ja": "電話で問い合わせたのですが、ペットの輸送が承認されているか確認していただけますか。",
      "en": "I called about bringing my pet. Can you check whether carriage was actually approved?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1y.js",
          "line": 168
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "2つの運び方"
          },
          {
            "sectionIndex": 2,
            "heading": "手続きと情報共有"
          },
          {
            "sectionIndex": 3,
            "heading": "日本に犬・猫を連れて入るとき"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "두 가지 운송 방법"
          },
          {
            "sectionIndex": 2,
            "heading": "절차와 정보 공유"
          },
          {
            "sectionIndex": 3,
            "heading": "일본에 개·고양이를 데리고 입국할 때"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "Two ways to carry pets"
          },
          {
            "sectionIndex": 2,
            "heading": "Procedure and information sharing"
          },
          {
            "sectionIndex": 3,
            "heading": "Taking dogs and cats into Japan"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "t-animals"
      ],
      "differenceKo": "반려동물 잡담이 아니라 예약 승인 상태와 각 구간 조건 확인을 연습한다."
    }
  },
  {
    "id": "lrp-g03-014",
    "course": "1_지상직여객운송입문",
    "lesson": "1-11",
    "lv": 2,
    "lessonTitle": {
      "ko": "수하물 규정 ② 스포츠 장비·악기 등 특수 수하물",
      "ja": "手荷物規定② スポーツ用品・楽器などの特殊手荷物",
      "en": "Baggage Rules 2: Sports Equipment, Musical Instruments and Other Special Items"
    },
    "title": {
      "ko": "악기 좌석 운송의 사전 승인",
      "ja": "楽器の座席輸送の事前承認を確認する",
      "en": "Verify advance approval for an instrument seat"
    },
    "scene": {
      "ko": "큰 악기를 가지고 온 승객이 빈 좌석에 놓으면 되는지 묻지만 좌석 점유 수하물 신청은 없다.",
      "ja": "大きな楽器を持ったお客様が空席に置けるか尋ねますが、座席占有手荷物の申請がありません。",
      "en": "A traveller with a large instrument asks to place it on an empty seat, but no cabin-baggage seat request exists."
    },
    "ai": {
      "role": {
        "ko": "악기의 파손을 걱정하는 승객",
        "ja": "楽器の破損を心配するお客様",
        "en": "A passenger worried about instrument damage"
      },
      "persona": {
        "ko": "신중하며 운송 방법과 필요한 승인을 비교한다.",
        "ja": "慎重で、運送方法と必要な承認を比べます。",
        "en": "Careful and willing to compare transport methods and approvals."
      }
    },
    "me": {
      "role": {
        "ko": "특수 수하물 조건을 확인하는 직원",
        "ja": "特殊手荷物の条件を確認する係員",
        "en": "An agent checking special-baggage conditions"
      }
    },
    "goal": {
      "ko": "크기·포장·예약을 확인하고 좌석 운송의 신청·승인·배치 조건을 조회해 가능한 선택지와 객실 인계 내용을 설명한다.",
      "ja": "大きさ、梱包、予約を確認し、座席輸送の申請、承認、配置条件を照会して、可能な選択肢と客室への引継ぎを説明します。",
      "en": "Check dimensions, packing and booking; verify seat-carriage approval and placement requirements, then explain available options and cabin handover details."
    },
    "twist": {
      "ko": "승객이 비상구 근처 빈 좌석을 악기 자리로 지정해 달라고 한다.",
      "ja": "お客様が非常口近くの空席を楽器用に指定してほしいと頼みます。",
      "en": "The passenger requests an empty seat near an exit for the instrument."
    },
    "opener": {
      "ko": "악기가 큰데 빈 좌석에 두고 갈 수 있을까요?",
      "ja": "楽器が大きいのですが、空いている席に置いて運べますか。",
      "en": "My instrument is large. Could it travel on an empty seat?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p1y.js",
          "line": 290
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 2,
            "heading": "楽器・貴重品は「座席占有手荷物」も"
          },
          {
            "sectionIndex": 3,
            "heading": "壊れやすい物・梱包の不十分な物"
          }
        ],
        "ko": [
          {
            "sectionIndex": 2,
            "heading": "악기·귀중품은 “좌석 점유 수하물”도"
          },
          {
            "sectionIndex": 3,
            "heading": "파손 쉬운 물품·포장 불충분 물품"
          }
        ],
        "en": [
          {
            "sectionIndex": 2,
            "heading": "Instruments and valuables can also be “cabin bulky baggage”"
          },
          {
            "sectionIndex": 3,
            "heading": "Fragile and poorly packed items"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-aircraft-change-1"
      ],
      "differenceKo": "일반 승객 좌석 변경이 아니라 CBBG 사전 승인·포장·배치 확인이다."
    }
  },
  {
    "id": "lrp-g03-015",
    "course": "1_지상직여객운송입문",
    "lesson": "2-1",
    "lv": 1,
    "lessonTitle": {
      "ko": "게이트 업무 준비",
      "ja": "ゲート業務の準備",
      "en": "Preparing for Gate Duty"
    },
    "title": {
      "ko": "게이트 오픈 전 편 정보 대조",
      "ja": "搭乗口を開く前に便情報を照合する",
      "en": "Cross-check flight information before opening the gate"
    },
    "scene": {
      "ko": "게이트 준비 중 표시 화면과 브리핑 자료의 목적지가 다르게 보인다.",
      "ja": "搭乗口の準備中、案内画面と打ち合わせ資料の行き先が異なって見えます。",
      "en": "During gate setup, the display and briefing sheet appear to show different destinations."
    },
    "ai": {
      "role": {
        "ko": "게이트 준비를 함께하는 동료",
        "ja": "搭乗口の準備を一緒に行う同僚",
        "en": "A colleague preparing the gate"
      },
      "persona": {
        "ko": "확인에 협조하며 점검 항목을 순서대로 묻는다.",
        "ja": "確認に協力し、点検項目を順に尋ねます。",
        "en": "Cooperative, asking about readiness checks in order."
      }
    },
    "me": {
      "role": {
        "ko": "게이트 준비 점검을 맡은 직원",
        "ja": "搭乗口の準備点検を担当する係員",
        "en": "An agent performing gate readiness checks"
      }
    },
    "goal": {
      "ko": "편명·목적지·출발 시각과 장비·서류를 대조하고, 표시 오류 확인과 담당자 연락을 마친 뒤 준비 완료 여부를 보고한다.",
      "ja": "便名、行き先、出発時刻、機器、書類を照合し、表示の確認と担当者への連絡を済ませて準備状況を報告します。",
      "en": "Cross-check flight, destination, departure time, equipment and documents; contact the display owner and report whether the gate is ready."
    },
    "twist": {
      "ko": "특별 지원 승객 정보가 카운터 인계 자료에만 있다는 사실이 드러난다.",
      "ja": "特別なお手伝いが必要なお客様の情報が、カウンターの引継ぎ資料にしかないと分かります。",
      "en": "Special-assistance information turns out to be present only in the counter handover sheet."
    },
    "opener": {
      "ko": "화면과 브리핑 자료가 다른데 게이트 준비 점검을 어디서부터 할까요?",
      "ja": "画面と資料が違いますが、搭乗口の準備は何から確認しましょうか。",
      "en": "The display and briefing sheet disagree. Where should we begin our gate checks?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p2x.js",
          "line": 2
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 2,
            "heading": "準備のチェック項目"
          },
          {
            "sectionIndex": 3,
            "heading": "客室との打ち合わせ"
          }
        ],
        "ko": [
          {
            "sectionIndex": 2,
            "heading": "준비 체크 항목"
          },
          {
            "sectionIndex": 3,
            "heading": "객실과의 협의"
          }
        ],
        "en": [
          {
            "sectionIndex": 2,
            "heading": "Preparation checklist"
          },
          {
            "sectionIndex": 3,
            "heading": "Coordinating with the cabin"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-gate-system-1",
        "air-irrops-terminal-change-1"
      ],
      "differenceKo": "시스템 장애나 터미널 변경 후 안내가 아니라 탑승 전 편 정보·특별 지원 인계 대조다."
    }
  }
];
  if(root.LESSON_RP != null && !Array.isArray(root.LESSON_RP)) { throw new TypeError("LESSON_RP must be an array"); }
  var current=root.LESSON_RP || [];
  var seen=Object.create(null);
  current.forEach(function(item){ if(item && typeof item.id === "string") seen[item.id]=true; });
  root.LESSON_RP=current.concat(batch.filter(function(item){ if(seen[item.id]) return false; seen[item.id]=true; return true; }));
})(typeof window !== "undefined" ? window : globalThis);
