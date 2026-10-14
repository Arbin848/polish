// Słówka practice: flashcards, quiz, listening, speaking, typing and grammar drills.
// The app supplies a stage element and a context ({ mode, pool, unitId, title }).
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const SESSION_SIZE = 10;

  let session = null;
  let ctx = null;
  let stage = null;

  const P = (S.Practice = {});
  // Score of the exercise on screen, for the end-of-lesson report: { mode, score, total }.
  P.snapshot = () => {
    if (!session) return null;
    if (session.mode === 'drill') return { mode: 'drill', score: session.score, total: session.i + (session.answered ? 1 : 0) };
    return { mode: session.mode, score: session.score || 0, total: session.total || 0 };
  };
  P.reset = () => {
    session = null;
    if (S.stopRecognition) S.stopRecognition();
    if (S.stopRecording) S.stopRecording();
  };
  P.render = (el, context) => {
    stage = el;
    if (!ctx || ctx.key !== context.key) session = null;
    ctx = context;
    draw();
  };
  function draw() {
    if (!stage || !stage.isConnected) return;
    const m = ctx.mode;
    if (m === 'cards') drawCards();
    else if (m === 'quiz') drawChoice('quiz');
    else if (m === 'listen') drawChoice('listen');
    else if (m === 'speak') drawSpeak();
    else if (m === 'type') drawType();
    else if (m === 'drill') drawDrill();
    else if (m === 'dictate') drawDictate();
    const focus = stage.querySelector('[data-autofocus]');
    if (focus) {
      focus.focus({ preventScroll: true });
      if (focus.select && typeof focus.select === 'function' && focus.tagName === 'INPUT') {
        focus.select();
      }
    }
  }


  // Visual letter-by-letter comparison showing missing Polish accents
  function accentDiffHTML(given, target) {
    if (!given || !target) return '';
    const cleanG = S.clean(given);
    const cleanT = S.clean(target);
    if (cleanG === cleanT) return '';
    // If stripped forms match, highlight exact accents
    if (S.stripMarks(cleanG) === S.stripMarks(cleanT)) {
      let outT = '';
      for (let i = 0; i < target.length; i++) {
        const ct = target[i];
        const cg = given[i] || '';
        if (ct.toLowerCase() !== cg.toLowerCase() && S.stripMarks(ct) === S.stripMarks(cg)) {
          outT += '<b class="accent-diff-hi" title="Missing accent: ' + esc(ct) + '">' + esc(ct) + '</b>';
        } else {
          outT += esc(ct);
        }
      }
      return '<div class="accent-diff-box"><span class="accent-diff-label">Notice accents:</span> <span class="accent-diff-text" lang="pl">' + outT + '</span> <small lang="ne">(मात्रा / चिह्न विचार गर्नुहोस्)</small></div>';
    }
    return '';
  }

  const feedbackHTML = (kind, e, next, given) => {
    const title = { right: 'Dobrze! Correct · सही', close: 'Almost: check the accents · लगभग सही', wrong: 'Not quite · मिलेन' }[kind];
    return `
      <div class="feedback ${kind}" role="status">
        <div class="fb-text">
          <strong>${title}</strong>
          <span class="answer" lang="pl">${polish(e.pl)}</span>
          ${(kind === 'close' && given) ? accentDiffHTML(given, e.pl) : ''}
          ${S.pronHTML(e)}
          ${S.meaningHTML(e)}
        </div>
        <div class="row">${S.listenBtn(e.pl, true)}<button class="btn primary" data-action="${next}" data-autofocus><kbd>Enter</kbd> Next</button></div>
      </div>`;
  };
  const dirToggle = () => `<button class="dir" data-action="dir">${S.settings.dir === 'pl' ? 'Polish → meaning' : 'Meaning → Polish'} ⇄</button>`;
  const emptyHTML = (title, text) => `
    <div class="card summary">
      <span class="label">Nothing here yet · अहिले केही छैन</span>
      <h2>${title}</h2>
      <p class="hint">${text}</p>
    </div>`;

  // ---------- flashcards ----------

  // Daily review asks words you already know a little from the other side: from the meaning
  // (say it, or type it) or from sound. Remembering a word yourself makes memory much stronger
  // than recognising it. New and weak words (box 0–1) are shown in Polish first.
  function reviewKind(e, n) {
    if (S.boxOf(e) < 2) return 'see';
    // When the English meaning gives the word away (Nepal, bank, hobby…), asking from it is no test.
    if (S.fold(e.en).includes(S.fold(e.pl)) || S.fold(e.pl).includes(S.fold(e.en))) return S.canSpeak ? 'hear' : 'see';
    const short = e.pl.split(/\s+/).length <= 3 && !/[…_]/.test(e.pl);
    const kinds = ['recall', ...(short ? ['type'] : []), ...(S.canSpeak ? ['hear'] : [])];
    return kinds[n % kinds.length];
  }
  function startCards() {
    const cards = ctx.review ? ctx.pool.slice(0, 20) : S.pickSession(ctx.pool, SESSION_SIZE);
    const kinds = cards.map((e, n) => (ctx.review ? reviewKind(e, n) : null));
    session = { mode: 'cards', cards, kinds, i: 0, flipped: false, typed: null, tally: { again: 0, good: 0, easy: 0 } };
  }

  function drawCards() {
    if (!session || session.mode !== 'cards') startCards();
    const s = session;
    if (!s.cards.length) {
      // A brand-new learner has nothing to review yet: send them to a lesson instead of "all caught up".
      const started = Object.keys(S.progress.items).length > 0;
      const next = S.COURSE.find((u) => !(S.Guided && S.Guided.status(u).done)) || S.COURSE[0];
      stage.innerHTML = emptyHTML(started ? 'All caught up ✓' : 'Nothing to review yet',
        (started ? 'Words you practise come back here when they are due. Study a unit, then come back tomorrow.<br><span lang="ne">अभ्यास गरेका शब्दहरू समय भएपछि यहाँ आउँछन्। एउटा पाठ पढेर भोलि फर्कनुहोस्।</span>'
          : 'Words come here after you meet them in a lesson. Start with a lesson today.<br><span lang="ne">पाठमा भेटेका शब्दहरू यहाँ आउँछन्। आज एउटा पाठबाट सुरु गर्नुहोस्।</span>')
        + (next ? `<br><button class="btn primary" data-action="go" data-to="learn.${next.id}">Start: ${esc(next.title)} →</button>` : ''));
      return;
    }
    if (s.i >= s.cards.length) {
      if (S.Celebration && S.Celebration.fire) {
        S.Celebration.fire('review', { icon: '🏆', title: 'Review Complete!', titleNe: 'समीक्षा पूरा भयो!' });
      }
      stage.innerHTML = `
        <div class="card summary">
          <span class="label">Round complete · सकियो</span>
          <h2 lang="pl">Dobra robota!</h2>
          <p class="hint">"Good job!" <span lang="ne">"स्याबास!"</span> You went through ${s.cards.length} cards.</p>
          <div class="tally">
            <div><b class="t-again">${s.tally.again}</b><span class="label">Again</span></div>
            <div><b class="t-good">${s.tally.good}</b><span class="label">Good</span></div>
            <div><b>${s.tally.easy}</b><span class="label">Easy</span></div>
          </div>
          <button class="btn primary" data-action="new-cards" data-autofocus>${ctx.review ? 'Check for more' : 'Another round'}</button>
        </div>`;
      return;
    }
    const e = s.cards[s.i];
    const kind = s.kinds[s.i] || (S.settings.dir === 'pl' ? 'see' : 'recall');
    if (kind === 'type') { drawTypeCard(e); return; }
    if (kind === 'hear') { drawHearCard(e); return; }
    const plFirst = kind === 'see';
    const front = plFirst
      ? `<span class="label">Polish · पोलिश</span><span class="word" lang="pl">${polish(e.pl)}</span> ${starBtn}`
      : `<span class="label">Say it in Polish · पोलिशमा भन्नुहोस्</span>${S.meaningHTML(e, 'big')}`;
    const starBtn = `<button type="button" class="star-card-btn ${S.isStarred(e.pl) ? 'active' : ''}" data-action="star-card" data-pl="${esc(e.pl)}" title="Bookmark to My Words">★</button>`;
    const back = plFirst
      ? `<span class="rule"></span>${S.meaningHTML(e, 'big')}${S.pronHTML(e)}`
      : `<span class="rule"></span><span class="word sm" lang="pl">${polish(e.pl)}</span>${S.pronHTML(e)}`;
    stage.innerHTML = `
      <div class="meta"><span>Card ${s.i + 1} of ${s.cards.length}</span>${ctx.review ? '' : dirToggle()}${S.boxMeter(e)}</div>
      <button class="card flip-in" data-action="flip" ${s.flipped ? '' : 'data-autofocus'}>
        ${front}
        ${s.flipped ? back : '<span class="hint">Tap or press Space to see the answer · उत्तर हेर्न थिच्नुहोस्</span>'}
      </button>
      <div class="row">
        ${plFirst || s.flipped ? S.listenBtn(e.pl, true) : ''}
        ${s.flipped
          ? `<button class="btn again" data-action="rate" data-rate="again"><kbd>1</kbd> Again <span lang="ne">फेरि</span></button>
             <button class="btn good" data-action="rate" data-rate="good" data-autofocus><kbd>2</kbd> Good <span lang="ne">ठीक</span></button>
             <button class="btn" data-action="rate" data-rate="easy"><kbd>3</kbd> Easy <span lang="ne">सजिलो</span></button>`
          : '<button class="btn primary" data-action="flip"><kbd>Space</kbd> Show answer</button>'}
      </div>`;
  }
  // Review card: hear the word, then show what it was.
  function drawHearCard(e) {
    const s = session;
    stage.innerHTML = `
      <div class="meta"><span>Card ${s.i + 1} of ${s.cards.length} · Listen · सुन्नुहोस्</span>${S.boxMeter(e)}</div>
      <button class="card flip-in" data-action="flip" ${s.flipped ? '' : 'data-autofocus'}>
        <span class="label">What did you hear? Say what it means · के सुन्नुभयो? अर्थ भन्नुहोस्</span>
        ${s.flipped ? `<span class="word sm" lang="pl">${polish(e.pl)}</span><span class="rule"></span>${S.meaningHTML(e, 'big')}${S.pronHTML(e)}` : '<span class="hint">Tap to see the answer · उत्तर हेर्न थिच्नुहोस्</span>'}
      </button>
      <div class="row">
        <button class="btn listen" data-action="say" data-text="${esc(e.pl)}">${S.SPEAKER} Play again</button>${S.slowBtn(e.pl)}
        ${s.flipped ? rateButtons() : '<button class="btn primary" data-action="flip"><kbd>Space</kbd> Show answer</button>'}
      </div>`;
    if (!s.flipped && s.heard !== s.i) { s.heard = s.i; setTimeout(() => { if (session === s && s.i === s.heard) S.speak(e.pl); }, 200); }
  }
  // Review card: write the Polish from the meaning. Checked like the Type mode.
  function drawTypeCard(e) {
    const s = session;
    const r = s.typed;
    stage.innerHTML = `
      <div class="meta"><span>Card ${s.i + 1} of ${s.cards.length} · Write it · लेख्नुहोस्</span>${S.boxMeter(e)}</div>
      <form class="card" data-form="rv-type" autocomplete="off">
        <span class="label">Write it in Polish · पोलिशमा लेख्नुहोस्</span>
        ${S.meaningHTML(e, 'big')}
        <input class="type-input" id="rv-answer" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off"
          aria-label="Your answer" value="${esc(r ? r.given : '')}" ${r ? 'readonly' : 'data-autofocus'}>
        ${r ? '' : `${S.keysHTML()}<div class="row"><button type="button" class="btn" data-action="rv-giveup">I don't know · थाहा छैन</button><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>`}
      </form>
      ${r ? `<div class="feedback ${r.result}" role="status"><div class="fb-text">
          <strong>${{ right: 'Dobrze! Correct · सही', close: 'Almost: check the accents · लगभग सही', wrong: 'Not quite · मिलेन' }[r.result]}</strong>
          <span class="answer" lang="pl">${polish(e.pl)}</span>${accentDiffHTML(r.given, e.pl)}${S.pronHTML(e)}</div>
        <div class="row">${S.listenBtn(e.pl, true)}<button class="btn primary" data-action="rv-next" data-autofocus><kbd>Enter</kbd> Next</button></div></div>` : ''}`;
  }
  function checkReviewType(giveUp) {
    const s = session;
    if (!s || s.mode !== 'cards' || s.typed) return;
    const e = s.cards[s.i];
    const input = stage.querySelector('#rv-answer');
    const given = giveUp ? '' : (input ? input.value : '');
    if (!giveUp && !given.trim()) { if (input) { input.placeholder = 'Type the Polish, or tap "I don\'t know"'; input.focus(); } return; }
    // Other words with the same meaning are right too ("allergy": alergia or uczulenie).
    const same = S.ENTRIES.filter((x) => x !== e && S.clean(x.en) === S.clean(e.en)).flatMap((x) => [x.pl, ...x.pl.split(' / ')]);
    const result = giveUp ? 'wrong' : S.checkAnswer(given, [e.pl, ...e.pl.split(' / '), ...same]);
    s.typed = { given, result };
    // A wrong answer moves the word one box down (not to zero), like the Type practice.
    S.review(e, result === 'right' ? 1 : result === 'close' ? 0 : -1);
    s.tally[result === 'right' ? 'good' : 'again'] += 1;
    draw();
    if (S.settings.autoplay !== false) S.speak(e.pl);
  }
  function nextReviewCard() {
    const s = session;
    if (!s || s.mode !== 'cards' || !s.typed) return;
    s.typed = null;
    s.flipped = false;
    s.i += 1;
    draw();
  }
  const rateButtons = () => `<button class="btn again" data-action="rate" data-rate="again"><kbd>1</kbd> Again <span lang="ne">फेरि</span></button>
             <button class="btn good" data-action="rate" data-rate="good" data-autofocus><kbd>2</kbd> Good <span lang="ne">ठीक</span></button>
             <button class="btn" data-action="rate" data-rate="easy"><kbd>3</kbd> Easy <span lang="ne">सजिलो</span></button>`;

  function flip() {
    const s = session;
    if (!s || s.mode !== 'cards' || s.flipped || s.i >= s.cards.length) return;
    const kind = s.kinds[s.i] || (S.settings.dir === 'pl' ? 'see' : 'recall');
    if (kind === 'type') return;
    if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
    s.flipped = true;
    draw();
    if (S.settings.autoplay !== false) S.speak(s.cards[s.i].pl);
  }
  function rate(kind) {
    const s = session;
    if (!s || s.mode !== 'cards' || !s.flipped) return;
    if (navigator.vibrate) try { navigator.vibrate(kind === 'again' ? 25 : 12); } catch (e) {}
    S.review(s.cards[s.i], kind === 'again' ? 'reset' : kind === 'good' ? 1 : 2);
    s.tally[kind] += 1;
    s.i += 1;
    s.flipped = false;
    draw();
  }

  // ---------- quiz and listening (multiple choice) ----------

  function newChoice(mode) {
    const prev = session && session.mode === mode ? session : { score: 0, total: 0 };
    const target = S.pickOne(ctx.pool, prev.word);
    const key = mode === 'listen' ? 'pl' : S.settings.dir === 'pl' ? 'en' : 'pl';
    session = { mode, score: prev.score, total: prev.total, word: target, options: S.shuffle([target, ...S.distractors(target, ctx.pool, key)]), picked: null };
    if (mode === 'listen') setTimeout(() => S.speak(target.pl), 150);
  }

  function drawChoice(mode) {
    if (!session || session.mode !== mode) newChoice(mode);
    const s = session;
    const e = s.word;
    const answered = s.picked !== null;
    const plFirst = mode === 'quiz' && S.settings.dir === 'pl';
    let prompt;
    if (mode === 'listen') {
      prompt = `
        <span class="label">What did you hear? · तपाईंले के सुन्नुभयो?</span>
        <button class="play" data-action="say" data-text="${esc(e.pl)}" aria-label="Play again" ${answered ? '' : 'data-autofocus'}>${S.SPEAKER}</button>
        <span class="hint">Tap to play again${S.settings.slow ? '' : ' · slow speech is in Settings'}</span>`;
    } else if (plFirst) {
      prompt = `<span class="label">What does it mean? · यसको अर्थ के हो?</span><span class="word" lang="pl">${polish(e.pl)}</span>${answered ? '' : `<div class="row">${S.listenBtn(e.pl, true)}</div>`}`;
    } else {
      prompt = `<span class="label">Choose the Polish · पोलिश छान्नुहोस्</span>${S.meaningHTML(e, 'big')}`;
    }
    const opts = s.options.map((o, i) => {
      let cls = 'option';
      if (answered && o === e) cls += ' right';
      else if (answered && o === s.picked) cls += ' wrong';
      const text = plFirst ? S.meaningHTML(o) : `<span lang="pl" class="opt-pl">${polish(o.pl)}</span>`;
      return `<button class="${cls}" data-action="answer" data-index="${i}" ${answered ? 'disabled' : ''}><kbd>${i + 1}</kbd>${text}</button>`;
    }).join('');
    stage.innerHTML = `
      <div class="meta"><span>Score ${s.score} / ${s.total}</span>${mode === 'quiz' ? dirToggle() : ''}${S.boxMeter(e)}</div>
      <div class="card">${prompt}</div>
      <div class="options">${opts}</div>
      ${answered ? feedbackHTML(s.picked === e ? 'right' : 'wrong', e, 'next-choice') : ''}`;
  }

  function answer(index) {
    const s = session;
    if (!s || s.picked !== null || !s.options || !s.options[index]) return;
    s.picked = s.options[index];
    s.total += 1;
    const right = s.picked === s.word;
    if (right) s.score += 1;
    S.review(s.word, right ? 1 : -1);
    draw();
    if (s.mode === 'quiz' && S.settings.dir !== 'pl' && S.settings.autoplay !== false) S.speak(s.word.pl);
    // Smooth auto-advance if answer is correct, giving learner a brief moment to celebrate
    if (right && s.mode === 'quiz') {
      setTimeout(() => {
        if (session === s && s.picked !== null) nextQuiz();
      }, 850);
    }
  }

  // ---------- speaking ----------

  function newSpeak() {
    const prev = session && session.mode === 'speak' ? session : { score: 0, total: 0 };
    const pool = ctx.pool.filter((e) => e.pl.split(/\s+/).length <= 6);
    session = { mode: 'speak', score: prev.score, total: prev.total, word: S.pickOne(pool.length ? pool : ctx.pool, prev.word), result: null, busy: '', recUrl: null, error: '' };
  }

  function drawSpeak() {
    if (!session || session.mode !== 'speak') newSpeak();
    const s = session;
    const e = s.word;
    const r = s.result;
    let result = '';
    if (r) {
      const pct = Math.round(r.score * 100);
      const kind = r.score >= 0.85 ? 'right' : r.score >= 0.6 ? 'close' : 'wrong';
      const title = { right: 'Świetnie! Great pronunciation · उत्कृष्ट', close: 'Close. Listen again and repeat · नजिक छ, फेरि सुनेर दोहोर्‍याउनुहोस्', wrong: 'Not yet. Listen slowly and try again · फेरि प्रयास गर्नुहोस्' }[kind];
      result = `
        <div class="feedback ${kind}" role="status">
          <div class="fb-text">
            <strong>${title}</strong>
            <span class="heard">Heard · सुनियो: <b lang="pl">${esc(r.heard || '—')}</b></span>
            <span class="score-line">${S.bar(pct, 100)} <b>${pct}%</b> match</span>
          </div>
          <div class="row"><button class="btn primary" data-action="next-speak" data-autofocus><kbd>Enter</kbd> Next word</button></div>
        </div>`;
    }
    stage.innerHTML = `
      <div class="meta"><span>Score ${s.score} / ${s.total}</span>${S.boxMeter(e)}</div>
      <div class="card">
        <span class="label">Say it out loud · ठूलो स्वरमा भन्नुहोस्</span>
        <span class="word" lang="pl">${polish(e.pl)}</span>
        ${S.pronHTML(e)}
        ${S.meaningHTML(e)}
        <div class="row">
          ${S.listenBtn(e.pl, true)}
          ${S.canRecognize ? `<button class="btn primary mic ${s.busy === 'listening' ? 'live' : ''}" data-action="speak-check" ${s.busy ? 'disabled' : ''}>${S.MIC} ${s.busy === 'listening' ? 'Listening… · सुन्दै…' : 'Say it · बोल्नुहोस्'}</button>` : ''}
          ${S.canRecord ? `<button class="btn ${s.busy === 'recording' ? 'live' : ''}" data-action="${s.busy === 'recording' ? 'record-stop' : 'record'}">${s.busy === 'recording' ? '■ Stop' : '● Record yourself'}</button>` : ''}
        </div>
        ${s.recUrl ? `<div class="compare"><span class="label">Compare · तुलना गर्नुहोस्</span><audio controls src="${s.recUrl}"></audio>${S.listenBtn(e.pl, true)}
          ${S.canRecognize ? '' : `<div class="row"><button class="btn again" data-action="self-rate" data-ok="0">Not yet · अझै होइन</button><button class="btn good" data-action="self-rate" data-ok="1">Sounds right · ठीक सुनियो</button></div>`}</div>` : ''}
        ${s.error ? `<p class="hint err">${esc(s.error)}</p>` : ''}
        ${!S.canRecognize && !S.canRecord ? '<p class="hint">This browser has no microphone support. Listen and repeat out loud, then tap Next. · सुनेर ठूलो स्वरमा दोहोर्‍याउनुहोस्।</p><button class="btn primary" data-action="next-speak">Next word</button>' : ''}
        ${S.canRecognize ? '<p class="hint small">Your browser turns your speech into text (in Chrome this uses an internet service); the app then compares it with the right answer.</p>' : ''}
      </div>
      ${result}`;
  }

  async function speakCheck() {
    const s = session;
    s.busy = 'listening';
    s.error = '';
    draw();
    try {
      const alts = await S.recognize();
      const target = s.word.pl.replace(/…/g, '');
      let best = { heard: alts[0] || '', score: 0 };
      for (const a of alts) {
        const sc = S.similarity(a, target);
        if (sc > best.score) best = { heard: a, score: sc };
      }
      if (session !== s) return;
      s.result = best;
      if (s.word.pl.split(/\s+/).length <= 2) S.recordSpeech(s.word.pl, best.score); // single words feed the sound report
      s.total += 1;
      if (best.score >= 0.85) { s.score += 1; S.review(s.word, 1); } else S.review(s.word, 0);
    } catch (err) {
      if (session !== s) return;
      s.error = S.micErrorText(err);
    }
    s.busy = '';
    draw();
  }

  async function record() {
    const s = session;
    s.busy = 'recording';
    s.error = '';
    draw();
    try {
      const url = await S.recordVoice();
      if (session !== s) return;
      s.recUrl = url;
    } catch (err) {
      if (session !== s) return;
      s.error = S.micErrorText(err);
    }
    s.busy = '';
    draw();
  }

  // ---------- typing ----------

  function newType() {
    const pool = ctx.pool.filter((e) => e.kind === 'word');
    const prev = session && session.mode === 'type' ? session : { score: 0, total: 0 };
    session = { mode: 'type', score: prev.score, total: prev.total, word: S.pickOne(pool.length ? pool : ctx.pool, prev.word), result: null, given: '', hint: 0 };
  }

  function drawType() {
    if (!session || session.mode !== 'type') newType();
    const s = session;
    const e = s.word;
    const target = e.pl.replace(/…/g, '');
    const hint = s.hint ? `${esc(target.slice(0, s.hint))}${'·'.repeat(Math.max(0, target.length - s.hint))}` : '';
    stage.innerHTML = `
      <div class="meta"><span>Score ${s.score} / ${s.total}</span>${S.boxMeter(e)}</div>
      <form class="card" data-form="type" autocomplete="off">
        <span class="label">Write it in Polish · पोलिशमा लेख्नुहोस्</span>
        ${S.meaningHTML(e, 'big')}
        <input class="type-input" id="type-answer" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off"
          aria-label="Your answer in Polish" value="${esc(s.given)}" ${s.result ? 'readonly' : 'data-autofocus'}>
        ${hint ? `<span class="pron hint-letters">${hint}</span>` : ''}
        ${s.result ? '' : `${S.keysHTML()}
          <div class="row">
            <button type="button" class="btn" data-action="hint">Hint <span lang="ne">संकेत</span></button>
            <button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button>
          </div>`}
      </form>
      ${s.result ? feedbackHTML(s.result, e, 'next-type', s.given) : ''}`;
  }

  function checkType() {
    const s = session;
    const input = stage.querySelector('#type-answer');
    if (!s || s.mode !== 'type' || s.result || !input) return;
    const given = input.value;
    if (!given.trim()) return;
    s.given = given;
    // Pairs like "robić / zrobić" accept either form or both.
    s.result = S.checkAnswer(given, [s.word.pl, ...s.word.pl.split(' / ')]);
    s.total += 1;
    if (s.result === 'right') { s.score += 1; S.review(s.word, s.hint ? 0 : 1); }
    else S.review(s.word, s.result === 'close' ? 0 : -1);
    draw();
    if (S.settings.autoplay !== false) S.speak(s.word.pl);
  }

  // ---------- dictation ----------

  // Hear a sentence (or word), write it, then see each word marked right or wrong.
  function newDictate() {
    const prev = session && session.mode === 'dictate' ? session : { score: 0, total: 0 };
    const phrases = ctx.pool.filter((e) => e.kind === 'phrase');
    const pool = phrases.length >= 3 ? phrases : ctx.pool;
    session = { mode: 'dictate', score: prev.score, total: prev.total, word: S.pickOne(pool, prev.word), result: null, given: '' };
    const text = session.word.pl;
    setTimeout(() => S.speak(text), 200);
  }

  function diffWords(target, given) {
    const tw = target.replace(/…/g, '').split(/\s+/).filter(Boolean);
    const gw = S.clean(given).split(' ').filter(Boolean);
    let gi = 0;
    return tw.map((w) => {
      const k = S.clean(w).replace(/\s/g, '');
      // Look a couple of words ahead so one missing word doesn't mark the rest wrong.
      for (let j = gi; j < Math.min(gw.length, gi + 3); j++) {
        if (gw[j] === k) { gi = j + 1; return `<span class="w-ok">${polish(w)}</span>`; }
        if (S.stripMarks(gw[j]) === S.stripMarks(k)) { gi = j + 1; return `<span class="w-bad" title="check the accents: you wrote ${esc(gw[j])}">${polish(w)}</span>`; }
      }
      if (gi < gw.length && S.similarity(gw[gi], k) >= 0.5) { const typed = gw[gi]; gi += 1; return `<span class="w-bad" title="you wrote ${esc(typed)}">${polish(w)}</span>`; }
      return `<span class="w-miss">${polish(w)}</span>`;
    }).join(' ');
  }

  function drawDictate() {
    if (!session || session.mode !== 'dictate') newDictate();
    const s = session;
    const e = s.word;
    const r = s.result;
    stage.innerHTML = `
      <div class="meta"><span>Score ${s.score} / ${s.total}</span>${S.boxMeter(e)}</div>
      <form class="card" data-form="dictate" autocomplete="off">
        <span class="label">Write what you hear · सुनेको कुरा लेख्नुहोस्</span>
        <button type="button" class="play" data-action="say" data-text="${esc(e.pl)}" aria-label="Play again">${S.SPEAKER}</button>
        <span class="hint">Tap to play again · फेरि सुन्न थिच्नुहोस्</span>
        <input class="type-input wide" id="dictate-answer" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="What you heard" value="${esc(s.given)}" ${r ? 'readonly' : 'data-autofocus'}>
        ${r ? '' : `${S.keysHTML()}<div class="row"><button type="button" class="btn" data-action="dictate-giveup">Show me</button><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>`}
      </form>
      ${r ? `
        <div class="feedback ${r.kind}" role="status">
          <div class="fb-text">
            <strong>${{ right: 'Bezbłędnie! Perfect · उत्कृष्ट', close: 'Almost · लगभग', wrong: 'Keep practising · अभ्यास जारी राख्नुहोस्' }[r.kind]} · ${r.pct}%</strong>
            <div class="dict-words" lang="pl">${diffWords(e.pl, s.given)}</div>
            <span class="hint">Green: right · Red underline: misspelled · Dashed: missing</span>
            ${S.pronHTML(e)}${S.meaningHTML(e)}
          </div>
          <div class="row">${S.listenBtn(e.pl, true)}<button class="btn primary" data-action="next-dictate" data-autofocus><kbd>Enter</kbd> Next</button></div>
        </div>` : ''}`;
  }

  function checkDictate(giveUp) {
    const s = session;
    const input = stage.querySelector('#dictate-answer');
    if (!s || s.mode !== 'dictate' || s.result || !input) return;
    if (!giveUp && !input.value.trim()) return;
    s.given = giveUp ? '' : input.value;
    const exact = S.clean(s.given) === S.clean(s.word.pl.replace(/…/g, ''));
    const pct = Math.round(S.similarity(s.given, s.word.pl.replace(/…/g, '')) * 100);
    const kind = exact ? 'right' : pct >= 85 ? 'close' : 'wrong';
    s.result = { kind, pct: exact ? 100 : pct };
    s.total += 1;
    if (kind === 'right') { s.score += 1; S.review(s.word, 1); } else S.review(s.word, kind === 'close' ? 0 : -1);
    draw();
  }

  // ---------- grammar drills ----------

  // ctx.drills is a list of { d, unit, idx } so mistake reviews can mix units.
  function startDrill() {
    session = { mode: 'drill', items: S.shuffle(ctx.drills), i: 0, score: 0, answered: null, picked: [], given: '' };
    prepOrder();
  }
  function prepOrder() {
    const s = session;
    const it = s.items[s.i];
    s.picked = [];
    if (it && it.d.type === 'order') {
      let tiles = S.shuffle(it.d.words.map((w, k) => ({ w, k })));
      if (tiles.every((t, k) => t.k === k) && tiles.length > 1) tiles = tiles.slice(1).concat(tiles[0]);
      s.tiles = tiles;
    }
  }
  const blankHTML = (q, fill, cls) => polish(q).replace('___', `<span class="blank ${cls || ''}">${fill ? polish(fill) : '&nbsp;'}</span>`);
  const mistakeKey = (it) => `${it.unit}#${it.idx}`;

  function drawDrill() {
    if (!session || session.mode !== 'drill') startDrill();
    const s = session;
    if (!s.items.length) { stage.innerHTML = emptyHTML('No exercises', 'There are no grammar exercises here yet.'); return; }
    if (s.i >= s.items.length) {
      const pct = Math.round((s.score / s.items.length) * 100);
      stage.innerHTML = `
        <div class="card summary">
          <span class="label">Exercises complete · अभ्यास सकियो</span>
          <h2>${pct}%</h2>
          <p class="hint">${s.score} of ${s.items.length} right. ${pct >= 80 ? 'Excellent! You can move on. · उत्कृष्ट! अगाडि बढ्नुहोस्।' : 'Read the lesson again and repeat the exercises. · पाठ फेरि पढेर अभ्यास दोहोर्‍याउनुहोस्।'}</p>
          <div class="row"><button class="btn primary" data-action="drill-restart" data-autofocus>Practise again</button></div>
        </div>`;
      if (ctx.unitId && !s.saved) {
        s.saved = true;
        const rec = S.progress.drills[ctx.unitId] || { best: 0, runs: 0 };
        S.progress.drills[ctx.unitId] = { best: Math.max(rec.best, pct), runs: rec.runs + 1, last: pct };
        S.saveProgress();
      }
      return;
    }
    const it = s.items[s.i];
    const d = it.d;
    const a = s.answered;
    let body = '';
    if (d.type === 'choose') {
      body = `
        <p class="drill-q" lang="pl">${blankHTML(d.q, a ? d.options[d.answer] : '', a ? (a.result === 'right' ? 'ok' : 'bad') : '')}</p>
        <div class="options">${d.options.map((o, k) => {
          let cls = 'option';
          if (a && k === d.answer) cls += ' right';
          else if (a && k === a.pick) cls += ' wrong';
          return `<button class="${cls}" data-action="drill-choose" data-index="${k}" ${a ? 'disabled' : ''}><kbd>${k + 1}</kbd><span class="opt-pl" lang="pl">${polish(o)}</span></button>`;
        }).join('')}</div>`;
    } else if (d.type === 'fill') {
      body = `
        <p class="drill-q" lang="pl">${blankHTML(d.q, a ? d.answer[0] : '', a ? (a.result === 'right' ? 'ok' : a.result === 'close' ? 'near' : 'bad') : '')}</p>
        <form class="fill-form" data-form="drill-fill" autocomplete="off">
          <input class="type-input" id="drill-answer" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off"
            aria-label="Missing word" value="${esc(s.given)}" ${a ? 'readonly' : 'data-autofocus'}>
          ${a ? '' : `${S.keysHTML()}<div class="row"><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>`}
        </form>`;
    } else if (d.type === 'order') {
      const used = new Set(s.picked);
      body = `
        <div class="order-line ${a ? (a.result === 'right' ? 'ok' : 'bad') : ''}" aria-label="Your sentence">
          ${s.picked.length ? s.picked.map((k, pos) => `<button class="tile placed" data-action="order-remove" data-pos="${pos}" ${a ? 'disabled' : ''} lang="pl">${polish(S.tileText(d.words[k], k === 0))}</button>`).join('') : '<span class="hint">Tap the words in the right order · सही क्रममा शब्द थिच्नुहोस्</span>'}
        </div>
        ${a ? '' : `<div class="tiles">${s.tiles.map((t) => `<button class="tile" data-action="order-add" data-k="${t.k}" ${used.has(t.k) ? 'disabled' : ''} lang="pl">${polish(S.tileText(t.w, t.k === 0))}</button>`).join('')}</div>
        <div class="row"><button class="btn" data-action="order-clear">Clear</button><button class="btn primary" data-action="order-check" ${s.picked.length === d.words.length ? '' : 'disabled'}>Check</button></div>`}`;
    }

    let fb = '';
    if (a) {
      const title = { right: 'Dobrze! Correct · सही', close: 'Almost: check the accents · लगभग सही', wrong: 'Not quite · मिलेन' }[a.result];
      const correct = S.drillSentence(d);
      fb = `
        <div class="feedback ${a.result}" role="status">
          <div class="fb-text">
            <strong>${title}</strong>
            <span class="answer" lang="pl">${polish(correct)}</span>
            ${(a.result === 'close' && s.given && d.answer) ? accentDiffHTML(s.given, Array.isArray(d.answer) ? d.answer[0] : d.answer) : ''}
            ${S.transHTML(d.en, d.ne)}
            ${S.whyHTML(a.why)}
          </div>
          <div class="row">${S.listenBtn(S.drillSpeech(d), true)}<button class="btn primary" data-action="drill-next" data-autofocus><kbd>Enter</kbd> Next</button></div>
        </div>`;
    }
    const unit = S.UNIT.get(it.unit);
    stage.innerHTML = `
      <div class="meta"><span>Exercise ${s.i + 1} of ${s.items.length} · Score ${s.score}</span>${ctx.mixed && unit ? `<span>${esc(unit.title)}</span>` : ''}</div>
      <div class="card drill">
        <span class="label">${{ choose: 'Choose the right form · सही रूप छान्नुहोस्', fill: 'Write the missing word · छुटेको शब्द लेख्नुहोस्', order: 'Build the sentence · वाक्य बनाउनुहोस्' }[d.type]}</span>
        ${body}
        ${a ? '' : d.type === 'order' ? `<div class="trans prompt">${S.transHTML(d.en, d.ne)}</div>` : `<details class="trans"><summary>Show translation · अनुवाद</summary>${S.transHTML(d.en, d.ne)}</details>`}
      </div>
      ${fb}
      ${a ? `<p class="report-row">${S.reportHTML(d.q || d.words.join(' '), `Grammar exercise, unit ${it.unit}`)}</p>` : ''}`;
  }

  function finishDrill(result, why, extra) {
    const s = session;
    const it = s.items[s.i];
    s.answered = Object.assign({ result, why }, extra);
    if (result === 'right') { s.score += 1; delete S.progress.mistakes[mistakeKey(it)]; }
    else if (result === 'wrong') {
      const m = S.progress.mistakes[mistakeKey(it)];
      S.progress.mistakes[mistakeKey(it)] = { unit: it.unit, idx: it.idx, count: (m ? m.count : 0) + 1, last: S.dayKey() };
    }
    S.logActivity();
    S.saveProgress();
    if (S.onProgress) S.onProgress();
    draw();
  }

  function drillChoose(k) {
    const s = session;
    if (!s || s.answered) return;
    const d = s.items[s.i].d;
    if (k < 0 || k >= d.options.length) return;
    finishDrill(k === d.answer ? 'right' : 'wrong', d.why, { pick: k });
  }
  function drillFill() {
    const s = session;
    const input = stage.querySelector('#drill-answer');
    if (!s || s.answered || !input || !input.value.trim()) return;
    const d = s.items[s.i].d;
    s.given = input.value;
    const result = S.checkAnswer(s.given, d.answer);
    let why = d.why;
    if (result === 'wrong' && d.traps) {
      const key = S.clean(s.given);
      const trap = Object.entries(d.traps).find(([t]) => S.clean(t) === key) || Object.entries(d.traps).find(([t]) => S.fold(t) === S.fold(key));
      if (trap) why = trap[1];
    }
    finishDrill(result, why);
  }
  function orderCheck() {
    const s = session;
    const d = s.items[s.i].d;
    if (s.picked.length !== d.words.length) return;
    const built = s.picked.map((k) => d.words[k]).join(' ');
    // Some sentences have more than one natural order; `alts` lists the others.
    const accepted = [d.words.join(' '), ...(d.alts || [])].map(S.clean);
    finishDrill(accepted.includes(S.clean(built)) ? 'right' : 'wrong', d.why || null);
  }
  function drillNext() {
    const s = session;
    s.i += 1;
    s.answered = null;
    s.given = '';
    prepOrder();
    draw();
  }

  // ---------- actions and keys ----------


  // Mobile swipe gestures for flashcards (Swipe Left: Again, Swipe Right: Good)
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (ev) => {
    if (!session || session.mode !== 'cards') return;
    const cardEl = ev.target.closest('.card.flip-in');
    if (!cardEl) return;
    touchStartX = ev.touches[0].clientX;
    touchStartY = ev.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (ev) => {
    if (!session || session.mode !== 'cards' || !session.flipped) return;
    const cardEl = ev.target.closest('.card.flip-in');
    if (!cardEl) return;
    const diffX = ev.changedTouches[0].clientX - touchStartX;
    const diffY = ev.changedTouches[0].clientY - touchStartY;
    // Horizontal swipe threshold: at least 60px and more horizontal than vertical
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        // Swipe Left: Again
        rate('again');
      } else {
        // Swipe Right: Good
        rate('good');
      }
    }
  }, { passive: true });

  P.action = (a, el) => {
    switch (a) {
      case 'star-card': {
        const pl = el.dataset.pl;
        const entry = ctx.pool.find(x => x.pl === pl) || S.LEXICON.get(pl) || { pl };
        const nowStarred = S.toggleStar(entry);
        el.classList.toggle('active', nowStarred);
        return true;
      }
      case 'flip': flip(); return true;
      case 'rv-giveup': checkReviewType(true); return true;
      case 'rv-next': nextReviewCard(); return true;
      case 'rate': rate(el.dataset.rate); return true;
      case 'new-cards': session = null; if (ctx.review) S.render(); else draw(); return true;
      case 'answer': answer(Number(el.dataset.index)); return true;
      case 'next-choice': newChoice(session.mode); draw(); return true;
      case 'next-type': newType(); draw(); return true;
      case 'next-dictate': newDictate(); draw(); return true;
      case 'dictate-giveup': checkDictate(true); return true;
      case 'hint': {
        const input = stage.querySelector('#type-answer');
        if (input) session.given = input.value;
        session.hint = Math.min(session.hint + 1, session.word.pl.length);
        draw();
        return true;
      }
      case 'dir':
        S.settings.dir = S.settings.dir === 'pl' ? 'meaning' : 'pl';
        S.saveSettings();
        session = null;
        if (ctx.review) S.render(); else draw();
        return true;
      case 'speak-check': speakCheck(); return true;
      case 'record': record(); return true;
      case 'record-stop': if (S.stopRecording) S.stopRecording(); return true;
      case 'self-rate':
        session.total += 1;
        if (el.dataset.ok === '1') { session.score += 1; S.review(session.word, 1); } else S.review(session.word, 0);
        newSpeak(); draw();
        return true;
      case 'next-speak': newSpeak(); draw(); return true;
      case 'drill-choose': drillChoose(Number(el.dataset.index)); return true;
      case 'drill-next': drillNext(); return true;
      case 'drill-restart': if (ctx.key === 'mistakes') { session = null; S.render(); } else { startDrill(); draw(); } return true;
      case 'order-add': if (!session.answered) { session.picked.push(Number(el.dataset.k)); draw(); } return true;
      case 'order-remove': if (!session.answered) { session.picked.splice(Number(el.dataset.pos), 1); draw(); } return true;
      case 'order-clear': session.picked = []; draw(); return true;
      case 'order-check': orderCheck(); return true;
      default: return false;
    }
  };

  P.submit = (form) => {
    if (form.dataset.form === 'rv-type') { checkReviewType(false); return true; }
    if (form.dataset.form === 'type') { checkType(); return true; }
    if (form.dataset.form === 'dictate') { checkDictate(false); return true; }
    if (form.dataset.form === 'drill-fill') { drillFill(); return true; }
    return false;
  };

  P.key = (ev) => {
    const s = session;
    if (!s || !stage || !stage.isConnected) return false;
    const onButton = ev.target.tagName === 'BUTTON';
    if (s.mode === 'cards') {
      if (s.typed && (ev.key === 'Enter' || ev.key === ' ') && !onButton) { ev.preventDefault(); nextReviewCard(); return true; }
      if ((ev.key === ' ' || ev.key === 'Enter') && !s.flipped && !onButton) { ev.preventDefault(); flip(); return true; }
      if (s.flipped && ['1', '2', '3'].includes(ev.key)) { ev.preventDefault(); rate(['again', 'good', 'easy'][Number(ev.key) - 1]); return true; }
    } else if ((s.mode === 'quiz' || s.mode === 'listen') && s.picked === null && /^[1-4]$/.test(ev.key)) {
      answer(Number(ev.key) - 1); return true;
    } else if (s.mode === 'drill' && !s.answered && s.items[s.i] && s.items[s.i].d.type === 'choose' && /^[1-4]$/.test(ev.key)) {
      drillChoose(Number(ev.key) - 1); return true;
    }
    return false;
  };
})();
