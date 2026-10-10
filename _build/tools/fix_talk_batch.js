/* GPT の回話データ（talk_data_g01〜g05：空港・イレギュラー25場面）を、Claude の検収に合わせて直して出力する（2026.10.10）
   1) 不自然な日本語の行を直す（ja・jr・ko・en）
   2) 確認問題：同じ3択を回していて誤答も正解になり得たので、誤答を「別の場面の具体的なせりふ」に入れ替え、正解の位置もばらす
   使い方：node _build/tools/fix_talk_batch.js <GPT WORK フォルダ> <出力フォルダ> */
const fs=require('fs'),path=require('path'),vm=require('vm');
const [src,out]=process.argv.slice(2);
function load(f){const ctx={window:{TALK:[]}};vm.runInNewContext(fs.readFileSync(f,'utf8'),ctx);return ctx.window.TALK}
const files=[1,2,3,4,5].map(i=>path.join(src,'talk_data_g0'+i+'.js'));
const batches=files.map(load);const ALL=[].concat(...batches);
const BY={};ALL.forEach(s=>BY[s.id]=s);
/* 1) 行の直し：[場面id, 行番号, {ja,jr,ko,en}] */
const FIX=[
 ['air-irregular-cancel-2',0,{ja:'欠航のご案内が遅くなり、申し訳ございません。',jr:'けっこうの ごあんないが おそくなり、もうしわけ ございません。'}],
 ['air-irregular-cancel-2',10,{ja:'同僚の方と連絡が取れるまで、ご予約は変更せずに確認を進めます。',jr:'どうりょうの かたと れんらくが とれるまで、ごよやくは へんこうせずに かくにんを すすめます。',ko:'동료분과 연락이 닿을 때까지 예약은 바꾸지 않고 확인을 진행하겠습니다.',en:'Until we can reach your colleague, I’ll keep checking without changing their booking.'}],
 ['air-irrops-longdelay-1',2,{ja:'お食事券の対象になるかどうか、今回の状況を確認してご案内いたします。',jr:'おしょくじけんの たいしょうに なるか どうか、こんかいの じょうきょうを かくにんして ごあんないいたします。',ko:'식사권 대상이 되는지 이번 상황을 확인해서 안내드리겠습니다.',en:'I’ll check whether meal vouchers apply in this situation and let you know.'}],
 ['air-irrops-longdelay-1',4,{ja:'最新の情報はこの搭乗口でお知らせします。係員にもお気軽にお声がけください。',jr:'さいしんの じょうほうは この とうじょうぐちで おしらせします。かかりいんにも おきがるに おこえがけ ください。',ko:'최신 정보는 이 탑승구에서 알려 드립니다. 직원에게도 편하게 말씀해 주세요.',en:'We’ll give updates here at the gate. Please feel free to ask any of our staff.'}],
 ['air-irrops-diversion-1',4,{ja:'手荷物のお渡し方法も、決まり次第お知らせします。',jr:'てにもつの おわたし ほうほうも、きまりしだい おしらせします。'}],
 ['air-irrops-overbooking-1',12,{ja:'ありがとうございます。条件がまとまりましたら、改めてご案内いたします。',jr:'ありがとうございます。じょうけんが まとまりましたら、あらためて ごあんないいたします。',ko:'감사합니다. 조건이 정리되면 다시 안내드리겠습니다.',en:'Thank you. Once the conditions are confirmed, I’ll come back to you.'}],
 ['air-irrops-medical-diversion-1',10,{ja:'今いる空港と、まだ決まっていない点を分けてお伝えいただくと安心です。',jr:'いま いる くうこうと、まだ きまっていない てんを わけて おつたえ いただくと あんしんです。',ko:'지금 있는 공항과 아직 정해지지 않은 점을 나눠서 전하시면 가족분도 안심하실 거예요.',en:'It helps to tell them where you are now and which plans are still undecided.'}],
 ['air-irrops-airport-closure-1',4,{ja:'運航するかどうかは確認中のため、今の段階では申し上げられません。',jr:'うんこうするか どうかは かくにんちゅうの ため、いまの だんかいでは もうしあげられません。',ko:'운항 여부는 확인 중이라 지금 단계에서는 말씀드리기 어렵습니다.',en:'Whether the flight will operate is still being reviewed, so I can’t say at this stage.'}],
 ['air-irrops-maintenance-check-1',8,{ja:'放送が聞こえる範囲でお待ちいただけますと助かります。',jr:'ほうそうが きこえる はんいで おまち いただけますと たすかります。',ko:'안내 방송이 들리는 곳에서 기다려 주시면 감사하겠습니다.',en:'It would help if you could wait where you can hear the announcements.'}],
 ['air-irrops-curfew-1',10,{ja:'申し訳ございません。費用の扱いはまだ確認中のため、今はお約束できません。',jr:'もうしわけ ございません。ひようの あつかいは まだ かくにんちゅうの ため、いまは おやくそく できません。',ko:'죄송합니다. 비용 처리는 아직 확인 중이라 지금은 약속드릴 수 없습니다.',en:'I’m sorry. How costs are handled is still being checked, so I can’t promise anything yet.'}],
 ['air-irrops-crew-connection-1',2,{ja:'はい。ただ、運航には乗務員がそろっていることの確認が必要です。',jr:'はい。ただ、うんこうには じょうむいんが そろっている ことの かくにんが ひつようです。',ko:'네. 다만 운항하려면 승무원이 모두 갖춰졌는지 확인이 필요합니다.',en:'Yes, but we also need to confirm that the full crew is available.'}],
 ['air-irrops-passport-damage-1',12,{ja:'ありがとうございます。必要になりましたら、こちらからお願いいたします。',jr:'ありがとうございます。ひつように なりましたら、こちらから おねがいいたします。',ko:'감사합니다. 필요하게 되면 저희가 말씀드리겠습니다.',en:'Thank you. If we need them, we’ll let you know.'}],
];
const ORIG={};ALL.forEach(s=>s.lines.forEach((l,i)=>{ORIG[s.id+'|'+l.ja]=i}));
FIX.forEach(([id,i,o])=>{const L=BY[id].lines[i];Object.assign(L,o)});
/* 2) 確認問題の作り直し */
const GEN=/^(はい|いいえ|承知|分かり|わかり|ありがとう|よろしく|お願い|申し訳|ご不便|お待たせ)|確認(いたし|し)ます。$|お知らせします。$|ご案内(いたし|し)ます。$|お待ちください。$/;
function staffish(s,r){const n=(s.roles[r]||{}).ja||'';return /係|責任者|乗務員|担当|スタッフ/.test(n)}
/* 誤答は「別の話題に固有の言葉」を含むせりふだけ（今の場面に出てこない言葉）。一般的な「表示をご確認ください」などは誤答にしない */
const KW=['除氷','雪','氷','給油','旅券','破損','管制','滑走路','座席数','ターミナル','読み取り機','機材の変更','乗務員','整備','医療','介助','車いす','通路','検査場','宿泊','ホテル','食事','払い戻し','薬','乗り継ぎ','手荷物','荷物','空席','予約番号','同僚','会議','書類','電池','席','給油','搭乗券','送迎','終電','タクシー','到着空港','臨時','保安','勤務時間'];
function pool(scene,wantStaff){const txt=scene.lines.map(l=>l.ja).join(' ')+scene.title.ja+scene.scene.ja;const out=[];ALL.forEach(s=>{if(s.id===scene.id)return;s.lines.forEach(l=>{if(staffish(s,l.r)!==wantStaff)return;const j=l.ja||'';if(j.length<12||j.length>36||/^はい/.test(j))return;const ks=KW.filter(k=>j.indexOf(k)>=0);if(!ks.length||ks.some(k=>txt.indexOf(k)>=0))return;out.push({ja:l.ja,ko:l.ko,en:l.en,from:s.id})})});return out}
function hash(str){let h=2166136261;for(const c of str){h^=c.codePointAt(0);h=Math.imul(h,16777619)}return h>>>0}
const report=[];
ALL.forEach(s=>{s.check.forEach((c,qi)=>{const ans=c.opts[c.a];
  // 正解の行を探す（直した行なら最新の文にそろえる）
  let li=ORIG[s.id+'|'+ans.ja];if(li==null)li=s.lines.findIndex(l=>(l.alt||[]).some(a=>a.ja===ans.ja));
  let correct=ans;if(li>=0){const L=s.lines[li];if(!(L.alt||[]).some(a=>a.ja===ans.ja))correct={ja:L.ja,ko:L.ko,en:L.en}}
  if(li==null||li<0)console.log('NO LINE',s.id,qi,ans.ja);
  const ws=li>=0?staffish(s,s.lines[li].r):true;
  const P=pool(s,ws);const h=hash(s.id+qi);const used=new Set();const ds=[];
  for(let k=0;ds.length<2&&k<P.length;k++){const p=P[(h+k*7919)%P.length];if(used.has(p.from)||ds.some(d=>d.ja===p.ja))continue;used.add(p.from);ds.push(p)}
  const pos=h%3;const opts=[ds[0],ds[1]];opts.splice(pos,0,correct);
  c.opts=opts.map(o=>({ja:o.ja,ko:o.ko,en:o.en}));c.a=pos;
  report.push([s.id,qi,c.q.ja,c.opts.map((o,j)=>(j===c.a?'○ ':'× ')+o.ja).join(' / ')]);
})});
/* 行を直したので、問題文に引用した相手のせりふも最新にそろえる */
ALL.forEach(s=>s.check.forEach(c=>{const m=/「(.+?)」/.exec(c.q.ja);if(!m)return;const L=s.lines.find(l=>l.ja===m[1]);if(!L){/* 古い引用 */}}));
fs.mkdirSync(out,{recursive:true});
batches.forEach((b,i)=>{const n='talk_data_g0'+(i+1)+'.js';const head='/* ACN 会話練習 追加データ（GPT 作成 '+n+' を Claude が検収・修正：日本語の不自然な行、確認問題の誤答 2026.10.10）。架空の訓練用会話 */\nwindow.TALK=window.TALK||[];window.TALK.push(\n';
  fs.writeFileSync(path.join(out,n),head+b.map(s=>JSON.stringify(s,null,1)).join(',\n')+'\n);\n')});
fs.writeFileSync(path.join(out,'_check_report.txt'),report.map(r=>r.join(' | ')).join('\n'));
console.log('scenes',ALL.length,'checks',report.length);
