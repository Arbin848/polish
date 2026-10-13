// Słówka assessments: revision lessons every few units, level tests with a certificate,
// and the weak-spot report that turns saved mistakes into a practice plan.
// All questions are built from the course data; nothing calls an AI.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const A = (S.Assess = {});
  const PASS = 70;
  const CHUNK = 5;

  const SKILLS = {
    vocab: ['Vocabulary', 'शब्द'],
    listening: ['Listening', 'सुनाइ'],
    grammar: ['Grammar', 'व्याकरण'],
    writing: ['Writing', 'लेखाइ'],
    speaking: ['Speaking', 'बोलाइ'],
  };
  const store = (k) => (S.progress[k] = S.progress[k] || {});

  // ---------- revisions and tests ----------

  // A revision after every 5 lessons of a level (the last few join the level test).
  A.REVISIONS = [];
  S.LEVELS.filter((l) => l.id !== 'Work').forEach((level) => {
    const units = S.COURSE.filter((u) => u.level === level.id);
    for (let i = 0, n = 1; i + CHUNK <= units.length; i += CHUNK, n++) {
      const group = units.slice(i, i + CHUNK);
      A.REVISIONS.push({
        id: `rev-${level.id}-${n}`, kind: 'revision', level: level.id, units: group, after: group[group.length - 1].id,
        title: `Revision ${n}: ${level.id === 'Start' ? 'Start' : level.id} lessons ${i + 1}–${i + group.length}`,
        titleNe: `दोहोर्याइ ${n}: पाठ ${i + 1}–${i + group.length}`,
      });
    }
  });
  A.TESTS = S.LEVELS.filter((l) => l.id !== 'Work' && S.COURSE.some((u) => u.level === l.id)).map((level) => ({
    id: `test-${level.id}`, kind: 'test', level: level.id, units: S.COURSE.filter((u) => u.level === level.id),
    title: `${level.name}: level test`, titleNe: `${level.ne}: स्तर परीक्षा`,
  }));
  A.byId = (id) => A.REVISIONS.find((r) => r.id === id) || A.TESTS.find((t) => t.id === id);
  A.result = (id) => store('assess')[id] || null;
  A.revisionAfter = (unitId) => A.REVISIONS.find((r) => r.after === unitId);
  A.testFor = (levelId) => A.TESTS.find((t) => t.level === levelId);
  // Next revision whose lessons are all finished but which hasn't been passed yet.
  // Lessons marked known by the placement test don't make revisions or tests due (they stay available).
  const studied = (u) => { const st = S.Guided.status(u); return st.done && !st.skipped; };
  A.dueRevision = () => A.REVISIONS.find((r) => !A.result(r.id) && r.units.every(studied));
  A.dueTest = () => A.TESTS.find((t) => !(A.result(t.id) && A.result(t.id).passed) && t.units.every(studied));

  function buildQuestions(def) {
    const sizes = def.kind === 'test'
      ? { meaning: 10, listen: 5, drill: 10, dictate: 3, speak: 2 }
      : { meaning: 8, listen: 5, drill: 6, dictate: 3, speak: 3 };
    const entries = def.units.flatMap((u) => u.entries);
    const words = entries.filter((e) => e.kind === 'word');
    const phrases = entries.filter((e) => e.kind === 'phrase' && e.pl.split(/\s+/).length <= 8);
    // Words you forget more often come up first.
    const weighted = (list) => list.map((e) => ({ e, k: Math.random() * 2 - S.boxOf(e) * 0.3 + ((S.progress.lapses || {})[e.pl] || 0) * 0.5 }))
      .sort((a, b) => b.k - a.k).map((x) => x.e);
    const qs = [];
    weighted(words).slice(0, sizes.meaning).forEach((e) => qs.push({ t: 'meaning', skill: 'vocab', e, options: S.shuffle([e, ...S.distractors(e, words, 'en')]) }));
    if (S.canSpeak) S.shuffle(words).slice(0, sizes.listen).forEach((e) => qs.push({ t: 'listen', skill: 'listening', e, options: S.shuffle([e, ...S.distractors(e, words, 'pl')]) }));
    const drills = S.shuffle(def.units.flatMap((u) => (S.DRILLS[u.id] || []).map((d, idx) => ({ d, unit: u.id, idx }))));
    drills.slice(0, sizes.drill).forEach((x) => qs.push({ t: 'drill', skill: 'grammar', ...x }));
    if (S.canSpeak) S.shuffle(phrases).slice(0, sizes.dictate).forEach((e) => qs.push({ t: 'dictate', skill: 'writing', e }));
    if (S.canRecognize) S.shuffle(words).slice(0, sizes.speak).forEach((e) => qs.push({ t: 'speak', skill: 'speaking', e }));
    return qs;
  }

  // ---------- running an assessment ----------

  let run = null;

  function start(def) {
    run = { def, qs: buildQuestions(def), i: 0, answer: null, scores: [], tiles: null, picked: [] };
    prepOrder();
  }
  function prepOrder() {
    const q = run.qs[run.i];
    run.picked = [];
    if (q && q.t === 'drill' && q.d.type === 'order') {
      let tiles = S.shuffle(q.d.words.map((w, k) => ({ w, k })));
      if (tiles.length > 1 && tiles.every((t, k) => t.k === k)) tiles = tiles.slice(1).concat(tiles[0]);
      run.tiles = tiles;
    }
    if (q && (q.t === 'listen' || q.t === 'dictate')) setTimeout(() => { if (run && run.qs[run.i] === q && S.route.name === 'revise') S.speak(q.e.pl); }, 250);
  }

  const head = (def) => `
    ${S.backLink('course', 'Course · पाठ्यक्रम')}
    <header class="unit-head">
      <span class="eyebrow">${def.kind === 'test' ? 'Level test · स्तर परीक्षा' : 'Revision · दोहोर्याइ'}</span>
      <h2>${esc(def.title)}</h2>
      <p class="unit-head-ne" lang="ne">${esc(def.titleNe)}</p>
    </header>`;

  A.render = (view, id) => {
    const def = A.byId(id);
    if (!def) { S.go('course'); return; }
    if (!run || run.def !== def) run = null;
    if (!run) {
      const prev = A.result(def.id);
      const lessons = def.units.length;
      const done = def.units.filter((u) => S.Guided.status(u).done).length;
      view.innerHTML = `
        ${head(def)}
        <div class="teacher">
          <div class="teacher-bubble">
            <span class="teacher-name">Your teacher · <span lang="ne">तपाईंको शिक्षिका</span></span>
            ${def.kind === 'test'
              ? `<p>This test checks everything from the ${lessons} lessons of this level: words, listening, grammar, writing${S.canRecognize ? ' and speaking' : ''}. Score at least <b>${PASS}%</b> to pass and get your certificate.</p><p lang="ne">यो परीक्षाले यस स्तरका ${lessons} पाठ जाँच्छ। प्रमाणपत्रका लागि कम्तीमा <b>${PASS}%</b> ल्याउनुहोस्।</p>`
              : `<p>Time to revise! This mixes words, listening and grammar from the last ${lessons} lessons, so you don't forget them. It takes about 10 minutes.</p><p lang="ne">दोहोर्‍याउने समय! अघिल्ला ${lessons} पाठका शब्द, सुनाइ र व्याकरण मिसाइएको छ। करिब १० मिनेट लाग्छ।</p>`}
          </div>
        </div>
        <ul class="hint-list">${def.units.map((u) => `<li>${S.Guided.status(u).done ? '✓' : '○'} ${esc(u.title)}</li>`).join('')}</ul>
        ${done < lessons ? `<p class="hint">You have finished ${done} of ${lessons} lessons. You can start now, but it's easier after all of them. · सबै पाठ सकेपछि सजिलो हुन्छ।</p>` : ''}
        ${prev ? `<p class="hint">Last result: <b>${prev.last}%</b> · best ${prev.best}%${prev.passed ? ' · passed ✓' : ''}</p>` : ''}
        <div class="row start"><button class="btn primary" data-action="as-start" data-id="${def.id}">${prev ? 'Start again' : 'Start'} · सुरु गर्नुहोस्</button>
        ${def.kind === 'test' && prev && prev.passed ? `<button class="btn" data-action="go" data-to="cert.${def.level}">View certificate</button>` : ''}</div>`;
      return;
    }
    if (run.i >= run.qs.length) { renderResult(view); return; }
    const q = run.qs[run.i];
    const a = run.answer;
    view.innerHTML = `
      ${head(def)}
      <div class="meta"><span>Question ${run.i + 1} of ${run.qs.length}</span><span>${SKILLS[q.skill][0]} · <span lang="ne">${SKILLS[q.skill][1]}</span></span></div>
      <div class="g-dots" aria-hidden="true">${run.qs.map((x, k) => `<i class="${k < run.i ? 'done' : k === run.i ? 'now' : ''}"></i>`).join('')}</div>
      ${questionHTML(q, a)}
      ${a ? feedbackHTML(q, a) : ''}`;
    const f = view.querySelector('[data-autofocus]');
    if (f) f.focus({ preventScroll: true });
  };

  function questionHTML(q, a) {
    const opt = (o, k, isPl) => {
      let cls = 'option';
      if (a && o === q.e) cls += ' right';
      else if (a && k === a.pick) cls += ' wrong';
      return `<button class="${cls}" data-action="as-pick" data-index="${k}" ${a ? 'disabled' : ''}><kbd>${k + 1}</kbd>${isPl ? `<span class="opt-pl" lang="pl">${polish(o.pl)}</span>` : S.meaningHTML(o)}</button>`;
    };
    if (q.t === 'meaning') {
      return `<div class="card compact"><span class="label">What does it mean? · अर्थ के हो?</span><span class="word" lang="pl">${polish(q.e.pl)}</span>${S.listenBtn(q.e.pl)}</div>
        <div class="options">${q.options.map((o, k) => opt(o, k, false)).join('')}</div>`;
    }
    if (q.t === 'listen') {
      return `<div class="card compact"><span class="label">What did you hear? · के सुन्नुभयो?</span><button class="play" data-action="say" data-text="${esc(q.e.pl)}" aria-label="Play again">${S.SPEAKER}</button></div>
        <div class="options">${q.options.map((o, k) => opt(o, k, true)).join('')}</div>`;
    }
    if (q.t === 'dictate') {
      return `<form class="card" data-form="as-text" autocomplete="off">
          <span class="label">Write what you hear · सुनेर लेख्नुहोस्</span>
          <button type="button" class="play" data-action="say" data-text="${esc(q.e.pl)}" aria-label="Play again">${S.SPEAKER}</button>
          <input class="type-input wide" id="as-input" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="What you heard" value="${esc(a ? a.given : '')}" ${a ? 'readonly' : 'data-autofocus'}>
          ${a ? '' : `${S.keysHTML()}<div class="row"><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>`}
        </form>`;
    }
    if (q.t === 'speak') {
      return `<div class="card compact"><span class="label">Say it out loud · ठूलो स्वरमा भन्नुहोस्</span><span class="word" lang="pl">${polish(q.e.pl)}</span>${S.meaningHTML(q.e)}
          ${a ? '' : `<div class="row"><button class="btn primary mic ${run.busy ? 'live' : ''}" data-action="as-speak" ${run.busy ? 'disabled' : ''}>${S.MIC} ${run.busy ? 'Listening… · सुन्दै…' : 'Say it · बोल्नुहोस्'}</button><button class="btn" data-action="as-skip" ${run.busy ? 'disabled' : ''}>Skip</button></div>`}
          ${run.micError ? `<p class="hint err">${esc(run.micError)}</p>` : ''}</div>`;
    }
    // Grammar: the same three exercise types as the unit drills.
    const d = q.d;
    if (d.type === 'choose') {
      return `<div class="card compact drill"><span class="label">Choose the right form · सही रूप छान्नुहोस्</span>
          <p class="drill-q" lang="pl">${polish(d.q).replace('___', `<span class="blank">${a ? polish(d.options[d.answer]) : '&nbsp;'}</span>`)}</p></div>
        <div class="options">${d.options.map((o, k) => {
          let cls = 'option';
          if (a && k === d.answer) cls += ' right'; else if (a && k === a.pick) cls += ' wrong';
          return `<button class="${cls}" data-action="as-choose" data-index="${k}" ${a ? 'disabled' : ''}><kbd>${k + 1}</kbd><span class="opt-pl" lang="pl">${polish(o)}</span></button>`;
        }).join('')}</div>`;
    }
    if (d.type === 'fill') {
      return `<form class="card drill" data-form="as-text" autocomplete="off"><span class="label">Write the missing word · छुटेको शब्द लेख्नुहोस्</span>
          <p class="drill-q" lang="pl">${polish(d.q).replace('___', `<span class="blank">${a ? polish(d.answer[0]) : '&nbsp;'}</span>`)}</p>
          <input class="type-input" id="as-input" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="Missing word" value="${esc(a ? a.given : '')}" ${a ? 'readonly' : 'data-autofocus'}>
          ${a ? '' : `${S.keysHTML()}<div class="row"><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>`}
        </form>`;
    }
    const used = new Set(run.picked);
    return `<div class="card compact drill"><span class="label">Build the sentence · वाक्य बनाउनुहोस्</span>
        <div class="order-line ${a ? (a.score === 1 ? 'ok' : 'bad') : ''}">${run.picked.length ? run.picked.map((k, pos) => `<button class="tile placed" data-action="as-remove" data-pos="${pos}" ${a ? 'disabled' : ''} lang="pl">${polish(S.tileText(d.words[k], k === 0))}</button>`).join('') : '<span class="hint">Tap the words in order · क्रममा थिच्नुहोस्</span>'}</div>
        ${a ? '' : `<div class="tiles">${run.tiles.map((t) => `<button class="tile" data-action="as-add" data-k="${t.k}" ${used.has(t.k) ? 'disabled' : ''} lang="pl">${polish(S.tileText(t.w, t.k === 0))}</button>`).join('')}</div>
        <div class="row"><button class="btn" data-action="as-clear">Clear</button><button class="btn primary" data-action="as-order" ${run.picked.length === d.words.length ? '' : 'disabled'}>Check</button></div>`}</div>`;
  }

  function feedbackHTML(q, a) {
    const kind = a.skipped ? 'close' : a.score >= 1 ? 'right' : a.score > 0 ? 'close' : 'wrong';
    const title = a.skipped ? 'Skipped: not counted · छोडियो' : { right: 'Dobrze! Correct · सही', close: 'Almost · लगभग', wrong: 'Not quite · मिलेन' }[kind];
    let body = '';
    if (q.t === 'drill') {
      const d = q.d;
      const correct = S.drillSentence(d);
      body = `<span class="answer" lang="pl">${polish(correct)}</span>${S.transHTML(d.en, d.ne)}${S.whyHTML(a.why || d.why)}`;
    } else if (q.t === 'speak') {
      body = `<span class="answer" lang="pl">${polish(q.e.pl)}</span>${a.heard != null ? `<span class="heard">Heard · सुनियो: <b lang="pl">${esc(a.heard)}</b> · ${Math.round(a.match * 100)}%</span>` : '<span class="hint">Skipped</span>'}${S.pronHTML(q.e)}`;
    } else {
      body = `<span class="answer" lang="pl">${polish(q.e.pl)}</span>${S.pronHTML(q.e)}${S.meaningHTML(q.e)}`;
    }
    return `<div class="feedback ${kind}" role="status"><div class="fb-text"><strong>${title}</strong>${body}</div>
      <div class="row">${S.listenBtn(q.t === 'drill' ? S.drillSpeech(q.d) : q.e.pl)}<button class="btn primary" data-action="as-next" data-autofocus><kbd>Enter</kbd> ${run.i + 1 < run.qs.length ? 'Next' : 'See result'}</button></div></div>`;
  }

  function answer(score, extra = {}) {
    const q = run.qs[run.i];
    run.answer = { score, ...extra };
    // A skipped speaking question (no microphone, noisy place) doesn't count.
    if (!extra.skipped) run.scores.push({ skill: q.skill, score, q });
    // S.review already counts the answer toward today's goal.
    let counted = false;
    if (q.e && (q.t === 'meaning' || q.t === 'listen')) { S.review(q.e, score >= 1 ? 1 : -1); counted = true; }
    if (q.t === 'drill') {
      const key = `${q.unit}#${q.idx}`;
      if (score >= 1) delete S.progress.mistakes[key];
      else if (score === 0) { const m = S.progress.mistakes[key]; S.progress.mistakes[key] = { unit: q.unit, idx: q.idx, count: (m ? m.count : 0) + 1, last: S.dayKey() }; }
    }
    if (q.t === 'dictate') { S.review(q.e, score >= 1 ? 1 : score > 0 ? 0 : -1); counted = true; }
    if (!counted && !extra.skipped) S.logActivity();
    S.saveProgress();
    if (S.onProgress) S.onProgress();
    S.render();
  }

  function skillTable(scores) {
    const out = {};
    for (const { skill, score } of scores) { out[skill] = out[skill] || [0, 0]; out[skill][0] += score; out[skill][1] += 1; }
    return out;
  }

  function renderResult(view) {
    const def = run.def;
    const total = run.scores.reduce((n, x) => n + x.score, 0);
    const exactPct = run.scores.length ? (total / run.scores.length) * 100 : 0;
    const pct = Math.round(exactPct); // shown; passing uses the exact value (69.6% is not a pass)
    const skills = skillTable(run.scores);
    if (!run.saved) {
      run.saved = true;
      const prev = A.result(def.id);
      store('assess')[def.id] = { last: pct, best: Math.max(pct, prev ? prev.best : 0), date: S.dayKey(), passed: def.kind === 'test' ? (exactPct >= PASS || !!(prev && prev.passed)) : true, skills };
      if (def.kind === 'test' && exactPct >= PASS && !(prev && prev.passed)) store('certs')[def.level] = { date: S.dayKey(), score: pct };
      const log = (S.progress.skillLog = S.progress.skillLog || []);
      Object.entries(skills).forEach(([k, [r, t]]) => log.push({ d: S.dayKey(), k, r, t }));
      if (log.length > 120) log.splice(0, log.length - 120);
      S.saveProgress();
    }
    const passed = def.kind === 'test' && exactPct >= PASS;
    const passedBefore = def.kind === 'test' && !passed && !!(A.result(def.id) || {}).passed && !!(S.progress.certs || {})[def.level];
    const weak = run.scores.filter((x) => x.score < 1);
    const weakest = Object.entries(skills).map(([k, [r, t]]) => [k, r / t]).sort((a, b) => a[1] - b[1])[0];
    view.innerHTML = `
      ${head(def)}
      <div class="card summary">
        <span class="label">${def.kind === 'test' ? (passed ? 'Passed · उत्तीर्ण' : passedBefore ? 'Not passed this time · your certificate is kept' : 'Not passed yet · अझै उत्तीर्ण भएन') : 'Revision complete · दोहोर्याइ सकियो'}</span>
        <h2>${pct}%</h2>
        <p class="hint">${def.kind === 'test'
          ? (passed ? `Congratulations! You passed ${esc(def.level)}. · बधाई छ!` : `You need ${PASS}% to pass. Practise your weak spots below, then try again. · उत्तीर्ण हुन ${PASS}% चाहिन्छ।`)
          : pct >= 80 ? 'Great memory! · उत्कृष्ट सम्झना!' : 'Good work. The words you missed are back in your daily review. · छुटेका शब्द दैनिक दोहोर्याइमा फर्किए।'}</p>
        ${passed || passedBefore ? `<button class="btn primary" data-action="go" data-to="cert.${def.level}">View your certificate 🎓</button>` : ''}
      </div>
      <h3 class="section-h">By skill <span class="ne-sub" lang="ne">सीप अनुसार</span></h3>
      <ul class="result-list">${Object.entries(skills).map(([k, [r, t]]) => `<li><span>${SKILLS[k][0]} · <span lang="ne">${SKILLS[k][1]}</span></span>${S.bar(r, t)}<b>${Math.round((r / t) * 100)}%</b></li>`).join('')}</ul>
      ${weakest && weakest[1] < 0.8 ? `<p class="hint">Your weakest skill here: <b>${SKILLS[weakest[0]][0]}</b>. ${adviceFor(weakest[0])}</p>` : ''}
      ${weak.length ? `<h3 class="section-h">To practise <span class="ne-sub" lang="ne">अभ्यास गर्नुपर्ने</span></h3>
        <ul class="entries">${weak.filter((x) => x.q.e).map((x) => S.entryRow(x.q.e)).join('')}</ul>
        ${weak.some((x) => x.q.t === 'drill') ? '<div class="row start"><button class="btn" data-action="go" data-to="mistakes.practice">Practise the grammar I got wrong</button></div>' : ''}` : ''}
      <div class="row start"><button class="btn" data-action="as-start" data-id="${def.id}">Try again</button><button class="btn" data-action="go" data-to="report">My weak-spot report</button><button class="btn primary" data-action="go" data-to="home">Back to today's plan</button></div>`;
  }

  const ADVICE = {
    vocab: ['Do the daily review every day and the Cards tab in each unit.', 'हरेक दिन दैनिक दोहोर्याइ गर्नुहोस्।'],
    listening: ['Use the Listen tab and the Dictation tab; play words slowly first.', 'Listen र Dictation ट्याब प्रयोग गर्नुहोस्।'],
    grammar: ['Practise your saved mistakes, and the verb and case trainers.', 'गल्ती, क्रियापद र विभक्ति अभ्यास गर्नुहोस्।'],
    writing: ['Use Dictation and the Type tab; check the accents ą ę ł ś ć ż ź ó ń.', 'Dictation र Type ट्याब प्रयोग गर्नुहोस्।'],
    speaking: ['Use the Speak tab and the Sounds lab; repeat each word three times.', 'Speak ट्याब र ध्वनि अभ्यास प्रयोग गर्नुहोस्।'],
  };
  const adviceFor = (k) => `${esc(ADVICE[k][0])} · <span lang="ne">${esc(ADVICE[k][1])}</span>`;

  // ---------- certificate ----------

  A.certificate = (view, levelId) => {
    const cert = store('certs')[levelId];
    const level = S.LEVELS[S.levelIndex(levelId)];
    // No such level, or a level without a test (Work): back to Progress.
    if (!levelId || !level || !A.testFor(levelId)) { S.go('progress'); return; }
    if (!cert) {
      view.innerHTML = `${S.backLink('progress', 'Progress · प्रगति')}<p class="empty">Pass the ${esc(levelId)} level test to get this certificate.</p>`;
      return;
    }
    const name = S.settings.name || '';
    view.innerHTML = `
      ${S.backLink('progress', 'Progress · प्रगति')}
      <article class="cert lv-${level.id}">
        <span class="cert-brand" lang="pl">S<span class="dia">ł</span><span class="dia">ó</span>wka</span>
        <span class="label">Certificate of completion · प्रमाणपत्र</span>
        <p class="cert-line">This is to certify that</p>
        <h2 class="cert-name">${name ? esc(name) : '<span class="hint">Your name</span>'}</h2>
        <p class="cert-line">has completed the level</p>
        <p class="cert-level">${esc(level.name)}</p>
        <p class="cert-line" lang="ne">${esc(level.ne)} स्तर सफलतापूर्वक पूरा गर्नुभयो</p>
        <div class="cert-foot"><span>Score <b>${cert.score}%</b></span><span>${esc(cert.date)}</span></div>
        <p class="cert-note">Słówka course certificate. This is not an official state exam certificate. · यो आधिकारिक सरकारी प्रमाणपत्र होइन।</p>
      </article>
      <label class="setting" for="cert-name"><b>Name on the certificate · प्रमाणपत्रमा नाम</b>
        <input class="search" id="cert-name" data-cert-name value="${esc(name)}" placeholder="Your name"></label>
      <p class="hint">Take a screenshot to save or share it. · सेभ गर्न स्क्रिनसट लिनुहोस्।</p>`;
  };

  // ---------- weak-spot report ----------

  const CASE_NAMES = { gen: 'Genitive', dat: 'Dative', acc: 'Accusative', ins: 'Instrumental', loc: 'Locative', voc: 'Vocative' };
  const TENSE_NAMES = { present: 'Present', past: 'Past', future: 'Future', imperative: 'Commands' };

  // The words forgotten most often (shown in the report and practised by its button).
  const mostForgotten = () => Object.entries(S.progress.lapses || {}).map(([pl, n]) => ({ e: S.LEXICON.get(pl), n })).filter((x) => x.e && !S.isLearned(x.e))
    .sort((a, b) => b.n - a.n).slice(0, 12);
  A.report = (view) => {
    const forgotten = mostForgotten();

    const byUnit = {};
    Object.values(S.progress.mistakes || {}).forEach((m) => { byUnit[m.unit] = (byUnit[m.unit] || 0) + m.count; });
    const grammar = Object.entries(byUnit).map(([id, n]) => ({ u: S.UNIT.get(id), n })).filter((x) => x.u).sort((a, b) => b.n - a.n).slice(0, 5);

    const rate = (o) => Object.entries(o || {}).filter(([, v]) => v.r + v.w >= 3).map(([k, v]) => ({ k, pct: Math.round((v.r / (v.r + v.w)) * 100), n: v.r + v.w })).sort((a, b) => a.pct - b.pct);
    const cases = rate(store('caseStats'));
    const tenses = rate(store('tenseStats'));

    // Letters that appear most in words you pronounced badly.
    const speech = S.progress.speech || {};
    const badWords = Object.entries(speech).filter(([, sc]) => sc < 0.8).map(([pl]) => pl);
    const sounds = {};
    const SOUND_KEYS = [['sz', 'sz-s'], ['cz', 'cz-c'], ['rz', 'rz-z'], ['ż', 'rz-z'], ['ś', 'sz-s'], ['si', 'sz-s'], ['ć', 'cz-c'], ['ci', 'cz-c'], ['ł', 'l-l'], ['y', 'y-i'], ['ą', 'o-a'], ['ę', 'e-e'], ['ch', 'h-k'], ['h', 'h-k']];
    badWords.forEach((w) => {
      const lw = w.toLowerCase();
      const seen = new Set();
      SOUND_KEYS.forEach(([k, lab]) => { if (lw.includes(k) && !seen.has(lab)) { seen.add(lab); sounds[lab] = (sounds[lab] || 0) + 1; } });
    });
    const soundLab = store('sounds');
    const weakSounds = (S.Trainers ? S.Trainers.SOUNDS : []).map((x) => ({ x, n: sounds[x.id] || 0, lab: soundLab[x.id] }))
      .filter((s) => s.n > 0 || (s.lab != null && s.lab < 80)).sort((a, b) => b.n - a.n || (a.lab || 0) - (b.lab || 0)).slice(0, 4);

    const log = S.progress.skillLog || [];
    const skills = {};
    log.slice(-60).forEach(({ k, r, t }) => { skills[k] = skills[k] || [0, 0]; skills[k][0] += r; skills[k][1] += t; });

    const empty = !forgotten.length && !grammar.length && !cases.length && !tenses.length && !weakSounds.length && !Object.keys(skills).length;
    const section = (title, ne, body) => `<section class="report-sec"><h3 class="section-h">${title} <span class="ne-sub" lang="ne">${ne}</span></h3>${body}</section>`;
    const pctRow = (label, pct, n, to) => `<li><span>${label}</span>${S.bar(pct, 100)}<b>${pct}%</b><small>${n} answers</small>${to ? `<button class="link-btn" data-action="go" data-to="${to}">practise</button>` : ''}</li>`;

    view.innerHTML = `
      ${S.backLink('progress', 'Progress · प्रगति')}
      <header class="unit-head">
        <span class="eyebrow">Weak-spot report · कमजोरी रिपोर्ट</span>
        <h2>What to practise next</h2>
        <p class="hint">Built from your own answers: forgotten words, grammar mistakes, cases, tenses, pronunciation and test results.<br><span lang="ne">तपाईंकै उत्तरबाट बनाइएको: बिर्सिएका शब्द, व्याकरणका गल्ती, विभक्ति, काल, उच्चारण र परीक्षाको नतिजा।</span></p>
      </header>
      ${empty ? '<div class="card summary"><h2>Not enough data yet</h2><p class="hint">Do a few lessons, the verb and case trainers, and a revision. Your report will appear here. · केही पाठ र अभ्यास गरेपछि रिपोर्ट देखिन्छ।</p></div>' : ''}
      ${Object.keys(skills).length ? section('Skills from your tests', 'परीक्षाका सीप', `<ul class="result-list">${Object.entries(skills).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).map(([k, [r, t]]) => `<li><span>${SKILLS[k][0]} · <span lang="ne">${SKILLS[k][1]}</span></span>${S.bar(r, t)}<b>${Math.round((r / t) * 100)}%</b></li>`).join('')}</ul>
        ${(() => { const w = Object.entries(skills).map(([k, [r, t]]) => [k, r / t]).sort((a, b) => a[1] - b[1])[0]; return w && w[1] < 0.8 ? `<p class="hint">Focus on <b>${SKILLS[w[0]][0]}</b>: ${adviceFor(w[0])}</p>` : ''; })()}`) : ''}
      ${forgotten.length ? section('Words you keep forgetting', 'बारम्बार बिर्सिने शब्द', `<ul class="entries">${forgotten.map((x) => S.entryRow(x.e).replace(/<\/li>\s*$/, `<small class="from">forgotten ${x.n}×</small></li>`)).join('')}</ul>
        <div class="row start"><button class="btn primary" data-action="as-weak-words">⚡ Practise My Weak Words Now (1-Tap Focus Review)</button></div>`) : ''}
      ${grammar.length ? section('Grammar topics with most mistakes', 'धेरै गल्ती भएका व्याकरण', `<ul class="result-list">${grammar.map((x) => `<li><span>${esc(x.u.title)}</span><b>${x.n}×</b><button class="link-btn" data-action="go" data-to="${x.u.id}">open lesson</button></li>`).join('')}</ul>
        <div class="row start"><button class="btn" data-action="go" data-to="mistakes.practice">Practise my grammar mistakes</button></div>`) : ''}
      ${cases.length ? section('Cases', 'विभक्ति', `<ul class="result-list">${cases.map((c) => { const [k, num] = c.k.split('-'); return pctRow(`${CASE_NAMES[k] || k}${num === 'pl' ? ' plural' : ''}`, c.pct, c.n, 'cases.practice'); }).join('')}</ul>`) : ''}
      ${tenses.length ? section('Verb tenses', 'क्रियाका काल', `<ul class="result-list">${tenses.map((c) => pctRow(TENSE_NAMES[c.k] || c.k, c.pct, c.n, 'verbs.practice')).join('')}</ul>`) : ''}
      ${weakSounds.length ? section('Sounds to work on', 'अभ्यास गर्नुपर्ने ध्वनि', `<ul class="result-list">${weakSounds.map((s) => `<li><span><b lang="pl">${polish(s.x.a.label)} / ${polish(s.x.b.label)}</b> ${esc(s.x.title)}</span><small>${[s.n ? `${s.n} hard ${s.n === 1 ? 'word' : 'words'}` : '', s.lab != null ? `game ${s.lab}%` : ''].filter(Boolean).join(' · ')}</small><button class="link-btn" data-action="go" data-to="sounds.${s.x.id}">practise</button></li>`).join('')}</ul>`) : ''}`;
  };

  // ---------- actions ----------

  A.action = (a, el) => {
    switch (a) {
      case 'as-start': start(A.byId(el.dataset.id)); S.render(); window.scrollTo(0, 0); return true;
      case 'as-pick': { const q = run.qs[run.i]; if (run.answer) return true; const k = Number(el.dataset.index); answer(q.options[k] === q.e ? 1 : 0, { pick: k }); return true; }
      case 'as-choose': { const q = run.qs[run.i]; if (run.answer) return true; const k = Number(el.dataset.index); answer(k === q.d.answer ? 1 : 0, { pick: k }); return true; }
      case 'as-add': if (!run.answer) { run.picked.push(Number(el.dataset.k)); S.render(); } return true;
      case 'as-remove': if (!run.answer) { run.picked.splice(Number(el.dataset.pos), 1); S.render(); } return true;
      case 'as-clear': run.picked = []; S.render(); return true;
      case 'as-order': {
        const d = run.qs[run.i].d;
        const built = S.clean(run.picked.map((k) => d.words[k]).join(' '));
        answer([d.words.join(' '), ...(d.alts || [])].map(S.clean).includes(built) ? 1 : 0);
        return true;
      }
      case 'as-speak': speak(); return true;
      case 'as-skip': answer(0, { heard: null, match: 0, skipped: true }); return true;
      case 'as-next': if (S.stopRecognition) S.stopRecognition(); run.busy = false; run.i += 1; run.answer = null; run.micError = ''; prepOrder(); S.render(); window.scrollTo(0, 0); return true;
      case 'as-weak-words': {
        // Only the words shown in the report, not every word ever forgotten.
        mostForgotten().forEach(({ e }) => { S.progress.items[e.pl] = { b: Math.min(S.boxOf(e), 1), due: S.dayKey() }; });
        S.saveProgress();
        S.go('review');
        return true;
      }
      default: return false;
    }
  };

  async function speak() {
    const r = run;
    const q = r.qs[r.i];
    r.busy = true; r.micError = '';
    S.render();
    // A result that arrives after the learner skipped, moved on or left is ignored.
    const stale = () => run !== r || r.qs[r.i] !== q || r.answer;
    try {
      const alts = await S.recognize();
      if (stale()) { r.busy = false; return; }
      let best = { heard: alts[0] || '', match: 0 };
      for (const x of alts) { const m = S.similarity(x, q.e.pl.replace(/…/g, '')); if (m > best.match) best = { heard: x, match: m }; }
      run.busy = false;
      S.recordSpeech(q.e.pl, best.match);
      answer(best.match >= 0.85 ? 1 : best.match >= 0.6 ? 0.5 : 0, best);
    } catch (err) {
      r.busy = false;
      if (stale()) return;
      r.micError = S.micErrorText(err);
      S.render();
    }
  }

  A.submit = (form, view) => {
    if (form.dataset.form !== 'as-text' || !run || run.answer) return false;
    const input = view.querySelector('#as-input');
    if (!input || !input.value.trim()) return true;
    const q = run.qs[run.i];
    const given = input.value;
    if (q.t === 'dictate') {
      const target = q.e.pl.replace(/…/g, '');
      const exact = S.clean(given) === S.clean(target);
      const sim = S.similarity(given, target);
      answer(exact ? 1 : sim >= 0.85 ? 0.5 : 0, { given });
    } else {
      const d = q.d;
      const r = S.checkAnswer(given, d.answer);
      let why = d.why;
      if (r === 'wrong' && d.traps) {
        const t = Object.entries(d.traps).find(([k]) => S.clean(k) === S.clean(given));
        if (t) why = t[1];
      }
      answer(r === 'right' ? 1 : r === 'close' ? 0.5 : 0, { given, why });
    }
    return true;
  };

  A.input = (el) => {
    if (el.dataset.certName !== undefined) {
      S.settings.name = el.value.slice(0, 60);
      S.saveSettings();
      const n = document.querySelector('.cert-name');
      if (n) n.innerHTML = S.settings.name ? S.esc(S.settings.name) : '<span class="hint">Your name</span>';
      return true;
    }
    return false;
  };

  A.key = (ev) => {
    if (S.route.name !== 'revise' || !run || run.i >= run.qs.length) return false;
    const q = run.qs[run.i];
    if (!run.answer && /^[1-4]$/.test(ev.key)) {
      const sel = q.t === 'drill' && q.d.type === 'choose' ? 'as-choose' : (q.t === 'meaning' || q.t === 'listen') ? 'as-pick' : null;
      const btn = sel && document.querySelector(`[data-action="${sel}"][data-index="${Number(ev.key) - 1}"]`);
      if (btn) { btn.click(); return true; }
    }
    if (run.answer && ev.key === 'Enter' && ev.target.tagName !== 'BUTTON') {
      const next = document.querySelector('[data-action="as-next"]');
      if (next) { next.click(); return true; }
    }
    return false;
  };

  A.reset = () => { run = null; };
})();
