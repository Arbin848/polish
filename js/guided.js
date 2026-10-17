// Słówka guided lessons: each unit taught step by step, the way a teacher would run a class.
// Explain one idea at a time → meet the words (listen, repeat, say) → quick check → sentences →
// dialogue → grammar exercises → dictation → summary. Progress is saved per unit.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const G = (S.Guided = {});
  const WORDS_PER_STEP = 4;
  const QUIZ_SIZE = 5;

  const state = () => (S.progress.guided = S.progress.guided || {});
  // The saved place in a lesson. Progress can be re-read from storage at any time (another tab,
  // coming back to the app), so never assume the entry is still there.
  const gstate = (u) => (state()[u.id] = state()[u.id] || { step: 0 });
  G.status = (u) => {
    const g = state()[u.id];
    const total = buildSteps(u).length;
    if (!g) return { started: false, done: false, step: 0, total };
    return { started: true, done: !!g.done, skipped: !!g.skipped, step: Math.min(g.step || 0, total - 1), total };
  };

  // ---------- the teacher ----------

  const TEACHER = `<svg class="teacher-face" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" class="tf-bg"/><path class="tf-hair" d="M9 26c0-11 7-18 15-18s15 7 15 18c-3-6-8-9-15-9S12 20 9 26z"/><circle cx="24" cy="27" r="11" class="tf-skin"/><circle cx="20" cy="26" r="1.6" class="tf-eye"/><circle cx="28" cy="26" r="1.6" class="tf-eye"/><path d="M20 31q4 3 8 0" class="tf-mouth"/></svg>`;
  const say = (en, ne) => `
    <div class="teacher">
      ${TEACHER}
      <div class="teacher-bubble">
        <span class="teacher-name">Your teacher · <span lang="ne">तपाईंको शिक्षिका</span></span>
        ${S.shows('explain', 'en') ? `<p>${S.markup(en)}</p>` : ''}
        ${S.shows('explain', 'ne') ? `<p lang="ne">${S.markup(ne)}</p>` : ''}
      </div>
    </div>`;

  // Polish bits marked *like this* in a lesson paragraph, as listen chips.
  const polishBits = (text) => S.polishBits(text).filter((t) => t.length < 60);

  // ---------- step list ----------

  const cache = new Map();
  function buildSteps(u) {
    if (cache.has(u.id)) return cache.get(u.id);
    const steps = [{ kind: 'intro' }];
    u.lesson.forEach((p, i) => steps.push({ kind: 'explain', i }));
    if ((u.tables || []).length) steps.push({ kind: 'tables' });
    const words = u.entries.filter((e) => e.kind === 'word');
    for (let i = 0; i < words.length; i += WORDS_PER_STEP) steps.push({ kind: 'words', words: words.slice(i, i + WORDS_PER_STEP), part: i / WORDS_PER_STEP + 1, parts: Math.ceil(words.length / WORDS_PER_STEP) });
    if (words.length >= 4) steps.push({ kind: 'quiz' });
    if (u.entries.some((e) => e.kind === 'phrase')) steps.push({ kind: 'sentences' });
    if ((u.dialogue || []).length) steps.push({ kind: 'dialogue' });
    if ((S.DRILLS[u.id] || []).length) steps.push({ kind: 'grammar' });
    if (S.canSpeak && u.entries.some((e) => e.kind === 'phrase')) steps.push({ kind: 'dictation' });
    steps.push({ kind: 'summary' });
    cache.set(u.id, steps);
    return steps;
  }

  const STEP_LABEL = {
    intro: ['Welcome', 'स्वागत'], explain: ['Explanation', 'व्याख्या'], tables: ['Tables', 'तालिका'],
    words: ['New words', 'नयाँ शब्द'], quiz: ['Quick check', 'छोटो जाँच'], sentences: ['Sentences', 'वाक्य'],
    dialogue: ['Dialogue', 'संवाद'], grammar: ['Grammar practice', 'व्याकरण अभ्यास'], dictation: ['Dictation', 'श्रुतलेख'],
    summary: ['Well done', 'स्याबास'],
  };

  // ---------- rendering ----------

  let local = null; // per-visit state: quiz answers, dialogue position, speaking results
  // Results of this sitting of a lesson, for an honest summary: { unit, quiz, grammar, dictation }.
  let run = null;
  const runFor = (u) => { if (!run || run.unit !== u.id) run = { unit: u.id, quiz: null, grammar: null, dictation: null, missed: [] }; return run; };

  G.render = (view, unitId) => {
    const u = S.UNIT.get(unitId);
    if (!u) { S.go('course'); return; }
    const steps = buildSteps(u);
    const fresh = !state()[u.id];
    const g = gstate(u);
    if (fresh) S.saveProgress();
    const idx = Math.min(g.step || 0, steps.length - 1);
    const step = steps[idx];
    if (!local || local.unit !== u.id || local.idx !== idx) local = { unit: u.id, idx, quiz: null, line: 0, said: {} };
    const label = STEP_LABEL[step.kind];
    const level = S.LEVELS[S.levelIndex(u.level)];

    view.innerHTML = `
      <div class="guided">
        <header class="g-head">
          <button class="back" data-action="go" data-to="${u.id}">← ${esc(u.title)}</button>
          <div class="g-meta"><span class="eyebrow">${esc(level.name)} · ${label[0]} · <span lang="ne">${label[1]}</span></span><span class="g-count">${idx + 1} / ${steps.length}</span></div>
          <div class="g-dots" aria-hidden="true">${steps.map((s, i) => `<i class="${i < idx ? 'done' : i === idx ? 'now' : ''}"></i>`).join('')}</div>
        </header>
        <section class="g-body" id="g-body">${stepHTML(u, step, idx, steps)}</section>
        <nav class="g-nav">
          ${idx > 0 ? '<button class="btn" data-action="g-prev">← Back</button>' : '<span></span>'}
          ${step.kind === 'summary' ? '' : `<button class="btn primary" data-action="g-next" ${nextBlocked(step) ? 'disabled' : ''}>${nextLabel(step)}</button>`}
        </nav>
      </div>`;

    if (step.kind === 'grammar') {
      const drills = S.shuffle((S.DRILLS[u.id] || []).map((d, i) => ({ d, unit: u.id, idx: i }))).slice(0, 6);
      S.Practice.render(view.querySelector('#g-stage'), { key: `guided:${u.id}:drill`, mode: 'drill', drills, unitId: u.id, pool: [] });
    } else if (step.kind === 'dictation') {
      S.Practice.render(view.querySelector('#g-stage'), { key: `guided:${u.id}:dict`, mode: 'dictate', pool: u.entries });
    }
    const focus = view.querySelector('[data-autofocus]');
    if (focus) focus.focus({ preventScroll: true });
  };

  const nextBlocked = (step) => step.kind === 'quiz' && local.quiz && local.quiz.i < local.quiz.items.length && local.quiz.picked === null && false;
  const nextLabel = (step) => ({ quiz: 'Continue →', grammar: 'Continue →', dictation: 'Continue →' }[step.kind] || 'Next →');

  function stepHTML(u, step, idx, steps) {
    switch (step.kind) {
      case 'intro': {
        const words = u.entries.filter((e) => e.kind === 'word').length;
        const phrases = u.entries.filter((e) => e.kind === 'phrase').length;
        const items = [
          [`${u.lesson.length} short explanations`, `${u.lesson.length} वटा छोटो व्याख्या`],
          words ? [`${words} new words, with listening and speaking`, `${words} नयाँ शब्द, सुन्ने र बोल्ने अभ्याससहित`] : null,
          phrases ? [`${phrases} useful sentences`, `${phrases} काम लाग्ने वाक्य`] : null,
          (u.dialogue || []).length ? ['a real dialogue', 'एउटा वास्तविक संवाद'] : null,
          (S.DRILLS[u.id] || []).length ? ['grammar exercises', 'व्याकरण अभ्यास'] : null,
        ].filter(Boolean);
        return `
          <h2 class="g-title">${esc(u.title)}</h2>
          <p class="unit-head-ne" lang="ne">${esc(u.titleNe)}</p>
          ${say(`Cześć! Today: **${u.title}**. ${u.summary}`, `नमस्ते! आज: **${u.titleNe}**। ${u.summaryNe}`)}
          <div class="card compact g-plan">
            <span class="label">In this lesson · यो पाठमा</span>
            <ul>${items.map(([en, ne]) => `<li>${esc(en)} · <span lang="ne">${esc(ne)}</span></li>`).join('')}</ul>
            <p class="hint">About ${Math.max(10, Math.round(steps.length * 2))} minutes. You can stop any time; the app remembers where you are. · जुनसुकै बेला रोक्न सक्नुहुन्छ।</p>
          </div>`;
      }
      case 'explain': {
        const p = u.lesson[step.i];
        const bits = polishBits(`${p.en} ${p.ne}`);
        const total = u.lesson.length;
        return `
          <div class="g-explain">
            <span class="label">Explanation ${step.i + 1} of ${total} · व्याख्या</span>
            ${S.shows('explain', 'en') ? `<p class="g-text">${S.markup(p.en)}</p>` : ''}
            ${S.shows('explain', 'ne') ? `<p class="g-text ne" lang="ne">${S.markup(p.ne)}</p>` : ''}
          </div>
          ${bits.length ? `<div class="g-listen"><span class="label">Listen to the Polish in this explanation · सुन्नुहोस्</span><div class="chip-row">${bits.map((b) => `<button class="say-chip" data-action="say" data-text="${esc(b)}">${S.SPEAKER}<span lang="pl">${polish(b)}</span></button>`).join('')}</div></div>` : ''}
          ${step.i === total - 1 ? say('Good. Next we look at the tables and the new words.', 'राम्रो। अब तालिका र नयाँ शब्द हेरौँ।') : ''}`;
      }
      case 'tables':
        return `
          ${say('Look at the table slowly. Read each row out loud.', 'तालिका बिस्तारै हेर्नुहोस्। हरेक पङ्क्ति ठूलो स्वरमा पढ्नुहोस्।')}
          ${(u.tables || []).map((t) => `
            <div class="table-wrap"><table>
              <caption>${esc(t.title)}${t.titleNe ? ` · <span lang="ne">${esc(t.titleNe)}</span>` : ''}</caption>
              <thead><tr>${t.head.map((h) => `<th scope="col">${S.markup(h)}</th>`).join('')}</tr></thead>
              <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${S.markup(c)}</td>`).join('')}</tr>`).join('')}</tbody>
            </table></div>`).join('')}`;
      case 'words':
        return `
          ${step.part === 1 ? say('Now the new words. For each word: **listen**, **repeat out loud** three times, then press **Say it** to check yourself. The coloured block shows where to put the stress.', 'अब नयाँ शब्द। हरेक शब्द: **सुन्नुहोस्**, तीन पटक **ठूलो स्वरमा दोहोर्‍याउनुहोस्**, अनि **बोल्नुहोस्** थिचेर जाँच्नुहोस्। रङ लगाइएको भागमा जोड दिनुहोस्।') : ''}
          <span class="label">Words ${step.part} of ${step.parts} · शब्दहरू</span>
          <div class="word-cards">${step.words.map((e, k) => wordCard(e, k)).join('')}</div>`;
      case 'quiz': return quizHTML(u);
      case 'sentences': {
        const phrases = u.entries.filter((e) => e.kind === 'phrase');
        return `
          ${say('Read each sentence out loud after you hear it. First slowly, then at normal speed.', 'हरेक वाक्य सुनेपछि ठूलो स्वरमा पढ्नुहोस्। पहिले बिस्तारै, अनि सामान्य गतिमा।')}
          <ul class="sentence-list">${phrases.map((e) => `
            <li class="sentence">
              <p class="s-pl" lang="pl">${polish(e.pl)}</p>
              ${S.pronHTML(e)}
              ${S.meaningHTML(e)}
              <div class="row start">${S.listenBtn(e.pl, true)}</div>
            </li>`).join('')}</ul>`;
      }
      case 'dialogue': {
        const lines = u.dialogue;
        const shown = Math.max(1, local.line);
        return `
          ${say('Listen to the conversation one line at a time. Then read it with a friend, or say both parts yourself.', 'कुराकानी एक-एक लाइन सुन्नुहोस्। अनि साथीसँग पढ्नुहोस्, वा दुवै भूमिका आफैँ बोल्नुहोस्।')}
          <div class="dialogue">${lines.slice(0, shown).map(([who, pl, en, ne], i) => `
            <div class="line ${i % 2 ? 'right' : ''}">
              <span class="who">${esc(who)}</span>
              <div class="bubble">
                <div class="bubble-pl"><span lang="pl">${polish(pl)}</span>${S.listenBtn(pl)}</div>
                ${S.shows('meaning', 'en') ? `<div class="m-en">${esc(en)}</div>` : ''}
                ${S.shows('meaning', 'ne') ? `<div class="m-ne" lang="ne">${esc(ne)}</div>` : ''}
              </div>
            </div>`).join('')}</div>
          ${shown < lines.length ? `<div class="row"><button class="btn primary" data-action="g-line" data-autofocus>Next line · अर्को लाइन (${shown}/${lines.length})</button></div>` : `<p class="hint">That is the whole dialogue. · पूरा संवाद सकियो।</p><div class="row start"><button class="btn turn-cta" data-action="go" data-to="turn.${u.id}">${S.MIC} Your turn: speak this dialogue · तपाईंको पालो</button></div>`}`;
      }
      case 'grammar':
        return `${say('Now practise the grammar from this lesson. Read the explanation after each answer: that is where you learn the most.', 'अब यो पाठको व्याकरण अभ्यास गर्नुहोस्। हरेक उत्तरपछिको व्याख्या पढ्नुहोस्: त्यहीँबाट धेरै सिकिन्छ।')}<section class="stage" id="g-stage" aria-live="polite"></section>`;
      case 'dictation':
        return `${say('Last exercise: listen and write what you hear. Do two or three, then continue.', 'अन्तिम अभ्यास: सुनेर लेख्नुहोस्। दुई-तीन वटा गरेर अगाडि बढ्नुहोस्।')}<section class="stage" id="g-stage" aria-live="polite"></section>`;
      case 'summary': {
        const idx2 = S.COURSE.indexOf(u);
        const next = S.COURSE[idx2 + 1];
        const words = u.entries.filter((e) => e.kind === 'word').slice(0, 12);
        // An honest report of this sitting: what went well and what to practise.
        const r = runFor(u);
        const rows = [['quiz', 'Word check', 'शब्द जाँच'], ['grammar', 'Grammar', 'व्याकरण'], ['dictation', 'Dictation', 'श्रुतलेख']]
          .filter(([k]) => r[k] && r[k].total).map(([k, en, ne]) => ({ k, en, ne, pct: Math.round((r[k].score / r[k].total) * 100), ...r[k] }));
        const avg = rows.length ? Math.round(rows.reduce((a, x) => a + x.pct, 0) / rows.length) : null;
        const weak = rows.filter((x) => x.pct < 70);
        const head = avg == null ? ['Dobra robota!', '"Good job!"', '"स्याबास!"'] : avg >= 85 ? ['Świetnie!', '"Excellent!"', '"उत्कृष्ट!"'] : avg >= 60 ? ['Dobrze!', '"Good!" A little more practice will make it stick.', '"राम्रो!" अलि बढी अभ्यासले पक्का हुन्छ।'] : ['Dobry początek', '"A good start." This lesson needs another round: practise the parts below.', '"राम्रो सुरुवात।" तलका भाग फेरि अभ्यास गर्नुहोस्।'];
        const fix = { quiz: ['quiz', 'Practise the words'], grammar: ['drill', 'Practise the grammar'], dictation: ['dictate', 'Practise listening'] };
        return `
          <div class="card summary">
            <span class="label">Lesson complete · पाठ सकियो</span>
            <h2 lang="pl">${head[0]}</h2>
            <p class="hint">${head[1]} <span lang="ne">${head[2]}</span></p>
            ${rows.length ? `<div class="tally">${rows.map((x) => `<div><b class="${x.pct >= 85 ? 't-good' : x.pct < 60 ? 't-again' : ''}">${x.score}/${x.total}</b><span class="label">${x.en} · ${x.ne}</span></div>`).join('')}</div>` : ''}
            ${r.missed.length ? `<p class="hint">Words to watch · ध्यान दिनुपर्ने शब्द: ${r.missed.map((e) => `<b lang="pl">${polish(e.pl)}</b>`).join(', ')}</p>` : ''}
            ${weak.length ? `<div class="row">${weak.map((x) => `<button class="btn" data-action="g-fix" data-tab="${fix[x.k][0]}">${fix[x.k][1]} →</button>`).join('')}</div>` : ''}
          </div>
          ${say(`You finished **${u.title}**. The new words are now in your **daily review**: come back tomorrow and they will return just before you forget them.`, `तपाईंले **${u.titleNe}** सक्नुभयो। नयाँ शब्दहरू अब **दैनिक दोहोर्याइ**मा छन्: भोलि फर्केर आउनुहोस्।`)}
          <div class="chip-row">${words.map((e) => `<button class="say-chip" data-action="say" data-text="${esc(e.pl)}">${S.SPEAKER}<span lang="pl">${polish(e.pl)}</span></button>`).join('')}</div>
          <div class="row start">
            ${next ? `<button class="btn primary" data-action="g-start" data-unit="${next.id}">Next lesson: ${esc(next.title)} →</button>` : ''}
            <button class="btn" data-action="go" data-to="${u.id}">Extra practice for this unit</button>
            <button class="btn" data-action="g-restart">Repeat this lesson</button>
          </div>`;
      }
      default: return '';
    }
  }

  function wordCard(e, k) {
    const r = local.said[e.pl];
    return `
      <article class="word-card">
        <div class="wc-top">
          <span class="wc-word" lang="pl">${polish(e.pl)}</span>
          ${S.boxMeter(e)}
        </div>
        ${S.meaningHTML(e)}
        ${S.pronHTML(e)}
        ${S.soundHints(e.pl)}
        <div class="row start">
          ${S.listenBtn(e.pl, true)}
          ${S.canRecognize ? `<button class="btn mic ${r && r.busy ? 'live' : ''}" data-action="g-say" data-k="${k}" ${r && r.busy ? 'disabled' : ''}>${S.MIC} ${r && r.busy ? 'Listening… · सुन्दै…' : 'Say it · बोल्नुहोस्'}</button>` : ''}
        </div>
        ${r && r.score != null ? `<p class="said ${r.score >= 0.85 ? 'ok' : r.score >= 0.6 ? 'near' : 'bad'}">${r.score >= 0.85 ? '✓ Great!' : r.score >= 0.6 ? 'Close, try again' : 'Try again slowly'} · heard <b lang="pl">${esc(r.heard)}</b> · ${Math.round(r.score * 100)}%</p>` : ''}
        ${r && r.error ? `<p class="hint err">${esc(r.error)}</p>` : ''}
      </article>`;
  }

  // ---------- quick check ----------

  function quizHTML(u) {
    const words = u.entries.filter((e) => e.kind === 'word');
    if (!local.quiz) {
      const make = (list) => list.map((target) => ({ target, options: S.shuffle([target, ...S.distractors(target, words, 'en')]) }));
      // "Practise the missed words": only those, until each one is right.
      const retry = local.retry && local.retry.length ? local.retry : null;
      local.quiz = { items: make(retry ? S.shuffle(retry) : S.shuffle(words).slice(0, QUIZ_SIZE)), i: 0, score: 0, picked: null, missed: [], retry: !!retry };
      local.retry = null;
    }
    const q = local.quiz;
    if (q.i >= q.items.length) {
      const r = runFor(u);
      if (!q.retry || !r.quiz) r.quiz = { score: q.score, total: q.items.length };
      r.missed = q.missed.slice();
      const missed = q.missed;
      return `
        ${missed.length === 0
          ? say(q.retry ? 'All correct now. Well done!' : `Very good: **${q.score} of ${q.items.length}**. You know these words.`, q.retry ? 'अब सबै सही। स्याबास!' : `धेरै राम्रो: **${q.items.length} मध्ये ${q.score}**। तपाईंलाई यी शब्द आउँछन्।`)
          : say(`**${q.score} of ${q.items.length}**. These words need one more look. Listen to them, then practise only these until each one is right.`, `**${q.items.length} मध्ये ${q.score}**। यी शब्द फेरि हेर्नुपर्छ। सुन्नुहोस्, अनि सही नहुन्जेल यिनैको अभ्यास गर्नुहोस्।`)}
        ${missed.length ? `<ul class="entries">${missed.map(S.entryRow).join('')}</ul>
          <div class="row start"><button class="btn primary" data-action="g-quiz-missed" data-autofocus>Practise these ${missed.length} again · फेरि अभ्यास</button></div>`
          : '<div class="row start"><button class="btn" data-action="g-quiz-again">Try the check again</button></div>'}`;
    }
    const it = q.items[q.i];
    const answered = q.picked !== null;
    return `
      ${q.i === 0 && !answered ? say("Let's check. What does each word mean?", 'जाँचौँ। हरेक शब्दको अर्थ के हो?') : ''}
      <div class="meta"><span>Question ${q.i + 1} of ${q.items.length} · Score ${q.score}</span></div>
      <div class="card compact">
        <span class="word" lang="pl">${polish(it.target.pl)}</span>
        ${S.listenBtn(it.target.pl)}
      </div>
      <div class="options">${it.options.map((o, k) => {
        let cls = 'option';
        if (answered && o === it.target) cls += ' right';
        else if (answered && o === it.options[q.picked]) cls += ' wrong';
        return `<button class="${cls}" data-action="g-quiz" data-index="${k}" ${answered ? 'disabled' : ''}><kbd>${k + 1}</kbd>${S.meaningHTML(o)}</button>`;
      }).join('')}</div>
      ${answered ? `<div class="row"><button class="btn primary" data-action="g-quiz-next" data-autofocus>${q.i + 1 < q.items.length ? 'Next question →' : 'See result →'}</button></div>` : ''}`;
  }

  // ---------- actions ----------

  function setStep(u, n) {
    const steps = buildSteps(u);
    const g = (state()[u.id] = state()[u.id] || { step: 0 });
    g.step = Math.max(0, Math.min(n, steps.length - 1));
    // A lesson marked known by the placement test counts as really finished once it is done here.
    if (steps[g.step].kind === 'summary' && (!g.done || g.skipped)) {
      g.done = S.dayKey();
      delete g.skipped;
      // Everything taught in the lesson goes into the daily review.
      u.entries.forEach((e) => { if (!S.itemOf(e)) S.progress.items[e.pl] = { b: 0, due: S.addDays(1) }; });
    }
    if (S.progress.lastUnit !== u.id) S.progress.lastUnit = u.id;
    S.saveProgress();
    S.Practice.reset();
    S.render();
    window.scrollTo(0, 0);
  }

  async function sayCheck(view, u, k) {
    const steps = buildSteps(u);
    const step = steps[gstate(u).step];
    const e = step.words[k];
    local.said[e.pl] = { busy: true };
    S.render();
    try {
      const alts = await S.recognize();
      let best = { heard: alts[0] || '', score: 0 };
      for (const a of alts) { const sc = S.similarity(a, e.pl.replace(/…/g, '')); if (sc > best.score) best = { heard: a, score: sc }; }
      local.said[e.pl] = best;
      S.recordSpeech(e.pl, best.score);
      S.review(e, best.score >= 0.85 ? 1 : 0);
    } catch (err) {
      local.said[e.pl] = { error: S.micErrorText(err) };
    }
    S.render();
  }

  G.action = (a, el, view) => {
    const id = S.route.name === 'learn' ? S.route.arg : null;
    const u = id && S.UNIT.get(id);
    switch (a) {
      case 'g-start': {
        if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
        const target = S.UNIT.get(el.dataset.unit);
        if (!target) return true;
        const g = state()[target.id];
        // A finished lesson starts again from the beginning.
        if (g && g.done && g.step >= buildSteps(target).length - 1) { g.step = 0; run = null; }
        S.go(`learn.${target.id}`);
        return true;
      }
      case 'g-next': {
        if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
        if (!u) return true;
        const step = buildSteps(u)[gstate(u).step];
        const snap = S.Practice.snapshot();
        if (step && snap && snap.total && (step.kind === 'grammar' || step.kind === 'dictation')) runFor(u)[step.kind] = { score: snap.score, total: snap.total };
        setStep(u, gstate(u).step + 1);
        return true;
      }
      case 'g-prev':
        if (navigator.vibrate) try { navigator.vibrate(8); } catch (e) {}
        if (u) setStep(u, gstate(u).step - 1);
        return true;
      case 'g-restart': if (u) { gstate(u).step = 0; run = null; setStep(u, 0); } return true;
      case 'g-line': local.line = Math.max(1, local.line) + 1; S.render(); { const d = u && u.dialogue[local.line - 1]; if (d) S.speak(d[1]); } return true;
      case 'g-say': if (u) sayCheck(view, u, Number(el.dataset.k)); return true;
      case 'g-quiz': {
        const q = local.quiz;
        if (!q || q.picked !== null) return true;
        q.picked = Number(el.dataset.index);
        const it = q.items[q.i];
        const ok = it.options[q.picked] === it.target;
        if (ok) q.score += 1; else q.missed.push(it.target);
        S.review(it.target, ok ? 1 : -1);
        S.render();
        return true;
      }
      case 'g-quiz-next': local.quiz.i += 1; local.quiz.picked = null; S.render(); return true;
      case 'g-quiz-again': local.quiz = null; S.render(); return true;
      case 'g-fix': if (u) { S.go(u.id); S.route.tab = el.dataset.tab; S.render(); } return true;
      case 'g-quiz-missed': local.retry = local.quiz ? local.quiz.missed.slice() : []; local.quiz = null; S.render(); return true;
      default: return false;
    }
  };

  G.key = (ev) => {
    if (S.route.name !== 'learn' || !local) return false;
    const q = local.quiz;
    if (q && q.picked === null && q.i < q.items.length && /^[1-4]$/.test(ev.key)) {
      const btn = document.querySelector(`[data-action="g-quiz"][data-index="${Number(ev.key) - 1}"]`);
      if (btn) { btn.click(); return true; }
    }
    return false;
  };
})();
