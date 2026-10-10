/* 講座連動AIロールプレイの連結ヘルパー（GPT 作成 lesson_rp_bridge.example.js を採用 2026.10.10）。これ単体では画面もAIも動かさない */
(function(root){
  'use strict';
  var langs=['ja','ko','en'];
  function lang(value){if(langs.indexOf(value)<0)throw new Error('Unsupported language: '+value);return value;}
  function all(){return Array.isArray(root.LESSON_RP)?root.LESSON_RP:[];}
  function find(id){return all().filter(function(v){return v.id===id;})[0]||null;}
  function need(id){var r=find(id);if(!r)throw new Error('Unknown lesson roleplay: '+id);return r;}
  function forLesson(course,lesson){return all().filter(function(v){return v.course===course&&v.lesson===String(lesson);});}
  var policy={
    ja:'これは架空の業務会話の練習です。規則、料金、入国条件、医療判断や作業の許可を創作して確約しないでください。条件が未提示なら未確認として扱い、責任者や正規の業務資料への確認を練習してください。装置の操作手順は教えず、確認と連絡を練習します。',
    ko:'가상 업무 대화 훈련입니다. 규정·요금·입국 조건·의학적 판단·작업 승인을 만들어 확약하지 마세요. 조건이 주어지지 않았으면 미확인으로 두고 책임자나 정식 업무 자료에 확인하는 대화를 연습하세요. 장비 조작법 대신 확인과 연락을 연습합니다.',
    en:'This is a fictional operational conversation exercise. Do not invent or guarantee policy, charges, entry eligibility, medical decisions or work authorisation. Treat unspecified conditions as unverified and practise checking with the supervisor or approved operational material. Practise checks and coordination rather than equipment operating instructions.'
  };
  function parts(id,contentLanguage){var r=need(id),l=lang(contentLanguage);return {
    title:r.title[l],sit:r.scene[l],ai:r.ai.role[l]+' — '+r.ai.persona[l],me:r.me.role[l],
    goal:r.goal[l],twist:r.twist[l],keys:[],policy:policy[l]
  };}
  function opener(id,practiceLanguage){return need(id).opener[lang(practiceLanguage)];}
  function query(id,practiceLanguage,helpLanguage,uiLanguage){need(id);return '?lessonRp='+encodeURIComponent(id)+'&practice='+lang(practiceLanguage)+'&help='+lang(helpLanguage)+'&lang='+lang(uiLanguage)+'#ai';}
  root.LESSON_RP_BRIDGE={find:find,forLesson:forLesson,parts:parts,opener:opener,query:query,policy:policy};
})(typeof window!=='undefined'?window:globalThis);
