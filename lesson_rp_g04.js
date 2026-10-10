/* 항공커리어노트: lesson-linked AI roleplay; lesson_rp_g04.js; 2026-10-10.
   Additive data only. Does not touch ARTS, TALK, TALK_TOPICS, storage, audio or network. */
(function(root){
  "use strict";
  var batch=[
  {
    "id": "lrp-g04-016",
    "course": "1_지상직여객운송입문",
    "lesson": "2-3",
    "lv": 2,
    "lessonTitle": {
      "ko": "개방 검사 대응",
      "ja": "開披検査への対応",
      "en": "Handling a Bag Search with the Passenger"
    },
    "title": {
      "ko": "수하물 개방 검사 호출 조정",
      "ja": "手荷物検査の呼び出しを調整する",
      "en": "Coordinate a passenger call for a bag inspection"
    },
    "scene": {
      "ko": "보안 담당이 수하물 확인을 위해 승객과 연락해 달라고 게이트에 요청했다.",
      "ja": "保安担当から、手荷物確認のためお客様と連絡を取ってほしいと搭乗口に依頼が来ました。",
      "en": "Security asks the gate to contact a passenger needed for a bag inspection."
    },
    "ai": {
      "role": {
        "ko": "승객 호출과 일정 조정을 요청하는 보안 담당자",
        "ja": "お客様の呼び出しと予定調整を依頼する保安担当者",
        "en": "A security contact requesting a passenger call and coordination"
      },
      "persona": {
        "ko": "간결하며 확인된 사실과 담당 경계를 구분한다.",
        "ja": "簡潔に話し、確認済みの事実と担当範囲を分けます。",
        "en": "Concise and clear about verified facts and responsibility boundaries."
      }
    },
    "me": {
      "role": {
        "ko": "승객 연락과 인계를 맡은 게이트 직원",
        "ja": "お客様への連絡と引継ぎを担当する搭乗口係員",
        "en": "A gate agent arranging contact and handover"
      }
    },
    "goal": {
      "ko": "승객 식별과 연락 장소를 확인하고 이유를 공개하지 않는 호출을 조정하며, 검사 담당·승객·편 책임자 사이에 진행 상태를 전달한다.",
      "ja": "お客様の特定と連絡場所を確認し、理由を公表しない呼び出しを調整して、検査担当、お客様、便責任者へ状況を伝えます。",
      "en": "Verify passenger identification and the contact point, arrange a discreet call, and share inspection status with security, the passenger and flight supervisor."
    },
    "twist": {
      "ko": "승객이 이미 탑승 대기 줄에 있어 검사 담당에게 이동 안내를 다시 확인해야 한다.",
      "ja": "お客様が既に搭乗待ちの列にいて、検査担当へ移動案内を再確認する必要があります。",
      "en": "The passenger is already in the boarding queue, requiring the transfer instructions to be reconfirmed."
    },
    "opener": {
      "ko": "수하물 확인이 필요한 승객에게 연락해 주실 수 있나요? 인계 장소도 맞추고 싶습니다.",
      "ja": "手荷物確認が必要なお客様に連絡していただけますか。引継ぎ場所も確認したいです。",
      "en": "Could you contact the passenger needed for a bag check? We also need to agree on the handover point."
    },
    "source": {
      "definitions": [
        {
          "file": "data/p2x.js",
          "line": 136
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "開披検査の流れ（一般的な例）"
          },
          {
            "sectionIndex": 2,
            "heading": "呼び出しのタイミング"
          },
          {
            "sectionIndex": 3,
            "heading": "対応のポイント"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "개방 검사 흐름 (일반적 예)"
          },
          {
            "sectionIndex": 2,
            "heading": "호출 타이밍"
          },
          {
            "sectionIndex": 3,
            "heading": "대응 포인트"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "Flow of an open-bag inspection (typical example)"
          },
          {
            "sectionIndex": 2,
            "heading": "When to call the passenger"
          },
          {
            "sectionIndex": 3,
            "heading": "Key points in handling it"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-security-rescreen-1"
      ],
      "differenceKo": "보안구역 재검색에 대한 승객 안내가 아니라 개방 검사 대상자 호출과 담당자 인계 조정이다."
    }
  },
  {
    "id": "lrp-g04-017",
    "course": "1_지상직여객운송입문",
    "lesson": "2-4",
    "lv": 1,
    "lessonTitle": {
      "ko": "탑승 절차와 안내 순서",
      "ja": "搭乗の流れとご案内の順番",
      "en": "The Boarding Procedure and Boarding Order"
    },
    "title": {
      "ko": "우선 탑승 두 줄 안내",
      "ja": "優先搭乗の二つの列を案内する",
      "en": "Guide two priority boarding queues"
    },
    "scene": {
      "ko": "우선 탑승 대상자와 일반 승객이 같은 줄에 서서 탑승 순서를 다시 안내해야 한다.",
      "ja": "優先搭乗のお客様と一般のお客様が同じ列に並び、順番をもう一度案内する必要があります。",
      "en": "Priority and general passengers have joined the same queue, so boarding order must be explained again."
    },
    "ai": {
      "role": {
        "ko": "자기 차례인지 묻는 승객",
        "ja": "自分の順番か尋ねるお客様",
        "en": "A passenger asking whether it is their turn"
      },
      "persona": {
        "ko": "순서를 헷갈려 하지만 짧은 설명에는 협조한다.",
        "ja": "順番を迷っていますが、短い説明には協力します。",
        "en": "Confused about the order, but responsive to a short explanation."
      }
    },
    "me": {
      "role": {
        "ko": "탑승 줄을 안내하는 게이트 직원",
        "ja": "搭乗の列を案内する搭乗口係員",
        "en": "A gate agent guiding the boarding queue"
      }
    },
    "goal": {
      "ko": "현재 호출 대상과 대기 위치를 정중히 설명하고 필요한 서류 준비를 안내하며, 지원이 필요한 승객을 동료에게 연결한다.",
      "ja": "現在の呼び出し対象と待つ場所を丁寧に説明し、必要書類の準備を案内して、お手伝いが必要なお客様を同僚へつなぎます。",
      "en": "Politely explain the current boarding group and waiting area, ask for required documents and connect passengers needing assistance with a colleague."
    },
    "twist": {
      "ko": "승객이 동행자가 별도 지원을 기다리는 중이라고 말한다.",
      "ja": "お客様が、同行者が別のお手伝いを待っていると伝えます。",
      "en": "The passenger says their companion is waiting for separate assistance."
    },
    "opener": {
      "ko": "저도 지금 탑승해도 되나요? 어느 줄인지 잘 모르겠어요.",
      "ja": "私も今、搭乗してよいですか。どの列かよく分かりません。",
      "en": "May I board now? I am not sure which queue to use."
    },
    "source": {
      "definitions": [
        {
          "file": "data/p2x.js",
          "line": 192
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "搭乗の流れ"
          },
          {
            "sectionIndex": 1,
            "heading": "搭乗の順番（例）"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "탑승 흐름"
          },
          {
            "sectionIndex": 1,
            "heading": "탑승 순서 (예)"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The flow of boarding"
          },
          {
            "sectionIndex": 1,
            "heading": "Boarding order (example)"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-wheelchair-1"
      ],
      "differenceKo": "휠체어 신청 자체가 아니라 탑승 그룹·대기 위치 안내와 지원 담당 연결을 다룬다."
    }
  },
  {
    "id": "lrp-g04-018",
    "course": "1_지상직여객운송입문",
    "lesson": "3-2",
    "lv": 2,
    "lessonTitle": {
      "ko": "도착 업무와 출발 업무",
      "ja": "到着業務と出発業務",
      "en": "Arrival and Departure Duties"
    },
    "title": {
      "ko": "도착편 준비에서 다음 출발편으로 인계",
      "ja": "到着便の準備を次の出発へ引き継ぐ",
      "en": "Hand over arrival readiness to the next departure team"
    },
    "scene": {
      "ko": "도착 업무 담당과 다음 출발 담당이 항공기 도착 예상, 지원 승객과 현장 준비 상태를 공유한다.",
      "ja": "到着担当と次の出発担当が、到着見込み、支援が必要なお客様、現場準備を共有します。",
      "en": "Arrival and next-departure teams share the aircraft arrival estimate, assistance needs and local readiness."
    },
    "ai": {
      "role": {
        "ko": "도착 준비 상황을 묻는 다음 편 리더",
        "ja": "到着準備の状況を尋ねる次の便の責任者",
        "en": "The next-flight lead checking arrival readiness"
      },
      "persona": {
        "ko": "확정 정보와 예상 정보를 구분해서 듣는다.",
        "ja": "確定情報と見込みを分けて聞きます。",
        "en": "Careful to distinguish confirmed facts from estimates."
      }
    },
    "me": {
      "role": {
        "ko": "도착 업무를 인계하는 직원",
        "ja": "到着業務を引き継ぐ係員",
        "en": "An agent handing over arrival duties"
      }
    },
    "goal": {
      "ko": "도착 전 준비·도착 후 확인·출발 준비로 넘길 사항을 구분하고, 미완료 항목의 담당자와 확인 시점을 정한다.",
      "ja": "到着前の準備、到着後の確認、出発へ引き継ぐ事項を分け、未完了項目の担当者と確認時点を決めます。",
      "en": "Separate pre-arrival preparation, post-arrival checks and departure handover items, then assign owners and update points for unfinished tasks."
    },
    "twist": {
      "ko": "도착 예상이 변경되어 지원 인력의 대기 장소를 다시 조정해야 한다.",
      "ja": "到着見込みが変わり、支援担当の待機場所を調整し直す必要があります。",
      "en": "The arrival estimate changes and assistance-team positioning must be adjusted."
    },
    "opener": {
      "ko": "도착편에서 다음 출발편으로 넘길 준비 사항을 알려 주세요.",
      "ja": "到着便から次の出発便へ引き継ぐ準備事項を教えてください。",
      "en": "What readiness information needs to pass from the arrival team to the next departure?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p3x.js",
          "line": 66
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "到着便を迎える準備"
          },
          {
            "sectionIndex": 1,
            "heading": "出発便の確認項目"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "도착편 맞이 준비"
          },
          {
            "sectionIndex": 1,
            "heading": "출발편 확인 항목"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "Preparing to receive an arrival"
          },
          {
            "sectionIndex": 1,
            "heading": "What to confirm on a departure"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "office-handover-1",
        "air-irrops-crew-connection-1"
      ],
      "differenceKo": "일반 업무 인수인계나 승무원 도착 지연 안내가 아니라 도착·출발 담당의 현장 준비 상태 공유다."
    }
  },
  {
    "id": "lrp-g04-019",
    "course": "1_지상직여객운송입문",
    "lesson": "3-3",
    "lv": 2,
    "lessonTitle": {
      "ko": "턴어라운드 — 도착부터 출발까지 무슨 일이 일어나나",
      "ja": "ターンアラウンド ― 到着から出発まで何が起きるか",
      "en": "Turnaround: What Happens Between Arrival and Departure"
    },
    "title": {
      "ko": "턴어라운드 작업 완료 확인",
      "ja": "折り返し作業の完了を確認する",
      "en": "Verify turnaround task completion"
    },
    "scene": {
      "ko": "다음 편 탑승 준비를 앞두고 청소와 객실 준비 완료 보고가 서로 맞지 않는다.",
      "ja": "次便の搭乗準備前に、清掃と客室準備の完了報告が食い違っています。",
      "en": "Before the next flight boards, cleaning and cabin-readiness completion reports disagree."
    },
    "ai": {
      "role": {
        "ko": "작업 상황을 종합하는 턴어라운드 리더",
        "ja": "作業状況をまとめる折り返し担当責任者",
        "en": "A turnaround lead consolidating task status"
      },
      "persona": {
        "ko": "정시성을 중시하지만 완료 근거와 담당 확인을 요구한다.",
        "ja": "定時性を重視しつつ、完了の根拠と担当者の確認を求めます。",
        "en": "Focused on punctuality, but asks for confirmation and evidence of completion."
      }
    },
    "me": {
      "role": {
        "ko": "여객 탑승 준비를 보고하는 조정 직원",
        "ja": "搭乗準備を報告する調整係員",
        "en": "A coordinator reporting passenger-boarding readiness"
      }
    },
    "goal": {
      "ko": "작업 간 선후 관계와 현재 상태를 설명하고, 미확정 완료 항목을 재확인한 뒤 객실 준비 신호와 다음 보고를 합의한다.",
      "ja": "作業の順序と現状を説明し、未確定の完了項目を再確認して、客室準備の合図と次の報告を決めます。",
      "en": "Explain task dependencies and current status, reconfirm unresolved completion reports, and agree on the cabin-ready signal and next update."
    },
    "twist": {
      "ko": "청소 완료 보고가 이전 편 기록이었다는 사실이 확인된다.",
      "ja": "清掃完了の報告が前の便の記録だったと分かります。",
      "en": "The cleaning-complete report turns out to belong to the previous flight."
    },
    "opener": {
      "ko": "탑승 준비와 객실 준비 보고가 다른데 현재 어느 단계까지 확인됐나요?",
      "ja": "搭乗準備と客室準備の報告が違いますが、今どこまで確認できていますか。",
      "en": "Boarding and cabin readiness reports differ. What has actually been confirmed?"
    },
    "source": {
      "definitions": [
        {
          "file": "data/p3x.js",
          "line": 134
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 0,
            "heading": "主な作業"
          },
          {
            "sectionIndex": 1,
            "heading": "クリティカルパスとは"
          },
          {
            "sectionIndex": 4,
            "heading": "遅れを生まないために"
          }
        ],
        "ko": [
          {
            "sectionIndex": 0,
            "heading": "주요 작업"
          },
          {
            "sectionIndex": 1,
            "heading": "크리티컬 패스란"
          },
          {
            "sectionIndex": 4,
            "heading": "지연을 만들지 않으려면"
          }
        ],
        "en": [
          {
            "sectionIndex": 0,
            "heading": "The main tasks"
          },
          {
            "sectionIndex": 1,
            "heading": "What the critical path means"
          },
          {
            "sectionIndex": 4,
            "heading": "Keeping delays from building"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-maintenance-check-1",
        "air-irrops-deicing-1"
      ],
      "differenceKo": "정비·제빙 지연에 대한 승객 안내가 아니라 턴어라운드 완료 기록의 편 식별과 선행 작업 대조다."
    }
  },
  {
    "id": "lrp-g04-020",
    "course": "1_지상직여객운송입문",
    "lesson": "3-4",
    "lv": 3,
    "lessonTitle": {
      "ko": "탑재관리 입문 — 무게와 균형",
      "ja": "ロードコントロール入門 ― 重量と重心",
      "en": "Load Control: Weight and Balance"
    },
    "title": {
      "ko": "추가 수하물 정보의 탑재관리 전달",
      "ja": "追加手荷物の情報を搭載管理へ伝える",
      "en": "Relay late bag information to load control"
    },
    "scene": {
      "ko": "탑재 정보가 집계된 뒤 추가 수하물 보고가 들어와 최종 자료 반영 여부를 확인해야 한다.",
      "ja": "搭載情報を集計した後に追加手荷物の報告が入り、最終資料への反映を確認する必要があります。",
      "en": "After load information is compiled, additional bags are reported and their inclusion in final documents must be checked."
    },
    "ai": {
      "role": {
        "ko": "최종 반영 여부를 확인하는 탑재관리 담당자",
        "ja": "最終資料への反映を確認する搭載管理担当者",
        "en": "A load controller checking final inclusion"
      },
      "persona": {
        "ko": "정확한 수량·무게·출처·변경 시점을 요구한다.",
        "ja": "正確な個数、重量、出所、変更時点を求めます。",
        "en": "Requires precise counts, weights, sources and change timing."
      }
    },
    "me": {
      "role": {
        "ko": "수하물 변경 정보를 전달하는 여객 직원",
        "ja": "手荷物の変更情報を伝える旅客係員",
        "en": "A passenger agent relaying bag changes"
      }
    },
    "goal": {
      "ko": "변경 전후의 확인된 정보를 구분해 전달하고, 탑재관리의 재확인과 최종 서류 반영 상태를 복창하여 기록한다.",
      "ja": "変更前後の確認済み情報を分けて伝え、搭載管理の再確認と最終書類への反映状況を復唱して記録します。",
      "en": "Clearly distinguish verified before-and-after information, obtain load-control confirmation, and read back and record the final-document status."
    },
    "twist": {
      "ko": "새 수량은 확인됐지만 무게 정보가 아직 확인되지 않았다고 연락받는다.",
      "ja": "新しい個数は確認できましたが、重量はまだ未確認だと連絡が入ります。",
      "en": "The updated count is confirmed, but the weight is still unverified."
    },
    "opener": {
      "ko": "추가 수하물 보고의 출처와 확인된 수량·무게부터 알려 주세요.",
      "ja": "追加手荷物の報告元と、確認済みの個数、重量を教えてください。",
      "en": "Please give me the source and verified count and weight of the additional bags."
    },
    "source": {
      "definitions": [
        {
          "file": "data/p3x.js",
          "line": 226
        }
      ],
      "learningBasis": {
        "ja": [
          {
            "sectionIndex": 4,
            "heading": "搭載指示書とロードシート"
          },
          {
            "sectionIndex": 5,
            "heading": "最終変更（LMC）"
          }
        ],
        "ko": [
          {
            "sectionIndex": 4,
            "heading": "탑재 지시서와 로드시트"
          },
          {
            "sectionIndex": 5,
            "heading": "최종 변경(LMC)"
          }
        ],
        "en": [
          {
            "sectionIndex": 4,
            "heading": "The loading instruction and the loadsheet"
          },
          {
            "sectionIndex": 5,
            "heading": "Last minute changes (LMC)"
          }
        ]
      }
    },
    "review": {
      "relatedExistingIds": [
        "air-irrops-baggage-offload-1",
        "air-irrops-baggage-offload-2"
      ],
      "differenceKo": "승객 탑승 포기 후 하기 요청이 아니라 추가 수하물의 정보 품질과 최종 탑재 문서 반영 확인이다."
    }
  }
];
  if(root.LESSON_RP != null && !Array.isArray(root.LESSON_RP)) { throw new TypeError("LESSON_RP must be an array"); }
  var current=root.LESSON_RP || [];
  var seen=Object.create(null);
  current.forEach(function(item){ if(item && typeof item.id === "string") seen[item.id]=true; });
  root.LESSON_RP=current.concat(batch.filter(function(item){ if(seen[item.id]) return false; seen[item.id]=true; return true; }));
})(typeof window !== "undefined" ? window : globalThis);
