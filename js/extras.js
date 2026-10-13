// Słówka extras: conversation practice, reading, exam prep, placement test,
// the mistakes notebook and the progress page. All content is fixed text; nothing calls an AI.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const X = (S.Extras = {});

  const head = (eyebrow, title, titleNe, text) => `
    ${S.backLink()}
    <header class="unit-head">
      <span class="eyebrow">${eyebrow}</span>
      <h2>${esc(title)}</h2>
      ${titleNe ? `<p class="unit-head-ne" lang="ne">${esc(titleNe)}</p>` : ''}
      ${text ? `<p class="hint">${text}</p>` : ''}
    </header>`;
  const byLevel = (list, row) => ['A1', 'A2', 'B1', 'B2'].map((lv) => {
    const items = list.filter((x) => x.level === lv);
    if (!items.length) return '';
    return `<section class="level"><header class="level-head"><h2>${lv}</h2></header><ol class="units">${items.map(row).join('')}</ol></section>`;
  }).join('');
  const listRow = (to, num, title, sub, done, extra = '') => `
    <li><button class="unit-row ${done ? 'done' : ''}" data-action="go" data-to="${to}">
      <span class="unit-num">${esc(num)}</span>
      <span class="unit-text"><span class="unit-title">${esc(title)}</span><span class="unit-ne" lang="ne">${esc(sub)}</span></span>
      <span class="unit-progress">${extra || (done ? '<small class="ok">✓ done</small>' : '')}</span>
    </button></li>`;

  // =====================================================================
  // Conversation practice
  // =====================================================================

  let talk = null;

  X.talkList = (view) => {
    view.innerHTML = `
      ${head('Conversation practice · संवाद अभ्यास', 'Real conversations', 'वास्तविक कुराकानी',
        'Practise real situations in Poland: the café, the doctor, your supervisor, the office, a job interview. Choose, type or say your reply. Wrong replies are explained in English and Nepali.<br><span lang="ne">पोल्यान्डका वास्तविक परिस्थितिमा अभ्यास गर्नुहोस्। जवाफ छान्नुहोस्, लेख्नुहोस् वा बोल्नुहोस्। गलत जवाफको कारण अंग्रेजी र नेपालीमा बताइन्छ।</span>')}
      ${S.ROLEPLAYS.length ? byLevel(S.ROLEPLAYS, (r, i) => listRow(`talk.${r.id}`, r.level, r.title, r.titleNe, S.progress.roleplays[r.id])) : '<p class="empty">No conversations loaded.</p>'}`;
  };

  function startTalk(rp, mode) {
    talk = { rp, step: 0, chat: [], mode: mode || (talk && talk.mode) || 'choose', wrong: null, done: false, mistakes: 0, order: null, hint: false, busy: false, typed: '' };
    pushThem();
  }
  // delay: time to let the learner's own reply play before the other person answers.
  function pushThem(delay = 200) {
    const t = talk;
    const st = t.rp.steps[t.step];
    const [pl, en, ne] = st.them;
    t.chat.push({ who: 'them', pl, en, ne });
    t.order = S.shuffle(st.replies.map((r, i) => i));
    t.hint = false;
    // Not while the microphone is listening, or it would hear the app.
    setTimeout(() => { if (talk === t && !t.busy && S.route.name === 'talk') S.speak(pl); }, delay);
  }
  function accept(reply) {
    talk.chat.push({ who: 'me', pl: reply.pl, en: reply.en, ne: reply.ne });
    talk.wrong = null;
    talk.typed = '';
    talk.step += 1;
    if (talk.step >= talk.rp.steps.length) {
      talk.done = true;
      const prev = S.progress.roleplays[talk.rp.id];
      S.progress.roleplays[talk.rp.id] = { done: true, best: prev ? Math.min(prev.best, talk.mistakes) : talk.mistakes, last: S.dayKey() };
    } else pushThem(900 + reply.pl.length * 70);
    S.logActivity();
    S.saveProgress();
    if (S.onProgress) S.onProgress();
  }
  function reject(reply, heard) {
    talk.mistakes += 1;
    talk.wrong = { reply, heard };
    S.logActivity();
    S.saveProgress();
  }
  // Match free text (typed or spoken) against the three replies.
  function judge(text) {
    const st = talk.rp.steps[talk.step];
    let best = null;
    // Accents count: "karta" and "kartą" are different answers. An exact match wins; on a tie in
    // the accent-free score, the reply that also matches the accents wins.
    const exact = (a, b) => (S.clean(a) === S.clean(b) ? 1 : 0);
    const raw = (a, b) => { const x = S.clean(a), y = S.clean(b); let same = 0; for (let i = 0; i < Math.min(x.length, y.length); i++) if (x[i] === y[i]) same++; return same / Math.max(x.length, y.length, 1); };
    for (const r of st.replies) {
      const sc = S.similarity(text, r.pl) + exact(text, r.pl) + raw(text, r.pl) / 100;
      if (!best || sc > best.sc) best = { r, sc };
    }
    best.sc = Math.min(1, best.sc);
    if (best.sc >= 0.75 && best.r.ok) accept(best.r);
    else if (best.sc >= 0.75) reject(best.r, text);
    else { talk.mistakes += 1; talk.wrong = { reply: null, heard: text }; talk.hint = true; }
  }

  X.talk = (view, id) => {
    const rp = S.ROLEPLAYS.find((r) => r.id === id);
    if (!rp) { S.go('talk'); return; }
    if (!talk || talk.rp !== rp) startTalk(rp);
    const t = talk;
    const bubbles = t.chat.map((c) => `
      <div class="line ${c.who === 'me' ? 'right' : ''}">
        <span class="who">${c.who === 'me' ? 'You · तपाईं' : esc(rp.them)}</span>
        <div class="bubble">
          <div class="bubble-pl"><span lang="pl">${polish(c.pl)}</span>${S.listenBtn(c.pl)}</div>
          ${S.shows('meaning', 'en') ? `<div class="m-en">${esc(c.en)}</div>` : ''}
          ${S.shows('meaning', 'ne') ? `<div class="m-ne" lang="ne">${esc(c.ne)}</div>` : ''}
        </div>
      </div>`).join('');

    let panel = '';
    if (t.done) {
      panel = `
        <div class="card summary">
          <span class="label">Conversation complete · कुराकानी सकियो</span>
          <h2 lang="pl">Brawo!</h2>
          ${S.whyHTML(rp.end)}
          <p class="hint">${t.mistakes ? `${t.mistakes} wrong ${t.mistakes === 1 ? 'reply' : 'replies'} on the way. Try again to get a clean run.` : 'A clean run with no mistakes!'}</p>
          <div class="row"><button class="btn primary" data-action="talk-restart">Practise again</button><button class="btn" data-action="go" data-to="talk">More conversations</button></div>
        </div>
        <h3>Useful phrases <span class="ne-sub" lang="ne">काम लाग्ने वाक्यहरू</span></h3>
        <ul class="entries">${(rp.useful || []).map((x) => S.entryRow(S.LEXICON.get(x[0]))).join('')}</ul>
        <div class="row start"><button class="btn" data-action="talk-add">Add these to my daily review · दैनिक दोहोर्याइमा थप्नुहोस्</button></div>`;
    } else {
      const st = rp.steps[t.step];
      const replies = t.order.map((i) => st.replies[i]);
      let wrong = '';
      if (t.wrong) {
        wrong = t.wrong.reply
          ? `<div class="feedback wrong" role="status"><div class="fb-text"><strong>That reply doesn't work here · यो जवाफ यहाँ मिल्दैन</strong>
               <span class="answer" lang="pl">${polish(t.wrong.reply.pl)}</span>${S.whyHTML(t.wrong.reply.why)}<span class="hint">Try again · फेरि प्रयास गर्नुहोस्</span></div></div>`
          : `<div class="feedback close" role="status"><div class="fb-text"><strong>I didn't understand that · बुझिएन</strong>
               ${t.wrong.heard ? `<span class="heard">You said · तपाईंले भन्नुभयो: <b lang="pl">${esc(t.wrong.heard)}</b></span>` : ''}
               <span class="hint">Look at the suggested replies below and try again. · तलका जवाफ हेरेर फेरि प्रयास गर्नुहोस्।</span></div></div>`;
      }
      // Replies are shown in Polish only, so the learner has to read them; meanings are a hint on request.
      const hint = t.hintStep === t.step;
      const choices = `<div class="options single">${replies.map((r, k) => `
        <button class="option" data-action="talk-pick" data-index="${st.replies.indexOf(r)}"><kbd>${k + 1}</kbd><span class="opt-col"><span class="opt-pl" lang="pl">${polish(r.pl)}</span>${hint && !/^\(/.test(r.en) ? S.transHTML(r.en, r.ne) : ''}</span></button>`).join('')}</div>
        ${hint ? '' : '<div class="row start"><button type="button" class="link-btn" data-action="talk-meanings">Hint: show what the replies mean · अर्थ देखाउनुहोस्</button></div>'}`;
      let input = '';
      if (t.mode === 'choose') input = choices;
      else if (t.mode === 'type') {
        input = `
          <form class="card compact" data-form="talk-type" autocomplete="off">
            <input class="type-input wide" id="talk-answer" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="Your reply in Polish" placeholder="Write your reply in Polish…" value="${esc(t.typed)}" data-autofocus>
            ${S.keysHTML()}
            <div class="row"><button type="button" class="btn" data-action="talk-hint">Show replies · जवाफ देखाउनुहोस्</button><button type="submit" class="btn primary"><kbd>Enter</kbd> Send</button></div>
          </form>
          ${t.hint ? choices : ''}`;
      } else {
        input = `
          <div class="card compact">
            <button class="btn primary mic ${t.busy ? 'live' : ''}" data-action="talk-say" ${t.busy ? 'disabled' : ''}>${S.MIC} ${t.busy ? 'Listening… · सुन्दै…' : 'Say your reply · जवाफ बोल्नुहोस्'}</button>
            <button class="btn" data-action="talk-hint">Show replies · जवाफ देखाउनुहोस्</button>
            ${t.micError ? `<p class="hint err">${esc(t.micError)}</p>` : ''}
          </div>
          ${t.hint ? choices : ''}`;
      }
      panel = `
        ${wrong}
        <div class="talk-mode seg" role="group" aria-label="How to reply">
          <button data-action="talk-mode" data-mode="choose" aria-pressed="${t.mode === 'choose'}">Choose · छान्नुहोस्</button>
          <button data-action="talk-mode" data-mode="type" aria-pressed="${t.mode === 'type'}">Type · लेख्नुहोस्</button>
          ${S.canRecognize ? `<button data-action="talk-mode" data-mode="say" aria-pressed="${t.mode === 'say'}">Speak · बोल्नुहोस्</button>` : ''}
        </div>
        ${input}`;
    }

    view.innerHTML = `
      ${S.backLink('talk', 'All conversations · सबै संवाद')}
      <header class="unit-head">
        <span class="eyebrow">${esc(rp.level)} · Conversation · संवाद</span>
        <h2>${esc(rp.title)}</h2>
        <p class="unit-head-ne" lang="ne">${esc(rp.titleNe)}</p>
        <div class="scene">${S.whyHTML(rp.scene)}<p class="hint">You are talking to: <b lang="pl">${esc(rp.them)}</b> (${esc(rp.themEn)} · <span lang="ne">${esc(rp.themNe)}</span>)</p></div>
        <div class="unit-meter">${S.bar(t.step, rp.steps.length)}<small>Step ${Math.min(t.step + 1, rp.steps.length)} of ${rp.steps.length}</small></div>
      </header>
      <div class="dialogue chat">${bubbles}</div>
      ${panel}
      <p class="report-row">${S.reportHTML(rp.title, `Conversation ${rp.id}, step ${t.step + 1}`)}</p>`;
    const focus = view.querySelector('[data-autofocus]');
    if (focus) focus.focus({ preventScroll: true });
    const last = view.querySelector('.chat .line:last-child');
    if (last && t.chat.length > 1) last.scrollIntoView({ block: 'nearest' });
  };

  async function talkSay(view) {
    const t = talk;
    S.stopSpeaking(); // the microphone must not hear the app's own voice
    t.busy = true; t.micError = '';
    X.talk(view, t.rp.id);
    const step = t.step;
    try {
      const alts = await S.recognize();
      // Ignore the result if the learner moved on while the microphone was listening.
      if (talk !== t || t.done || t.step !== step) { t.busy = false; return; }
      const st = t.rp.steps[t.step];
      let best = alts[0] || '';
      let bestSc = -1;
      for (const a of alts) for (const r of st.replies) { const sc = S.similarity(a, r.pl); if (sc > bestSc) { bestSc = sc; best = a; } }
      judge(best);
    } catch (err) {
      if (talk === t) t.micError = S.micErrorText(err);
    }
    t.busy = false;
    S.render();
  }

  // =====================================================================
  // Reading
  // =====================================================================

  let reading = null;

  X.readList = (view) => {
    const kindNe = { story: 'कथा', message: 'सन्देश', notice: 'सूचना', document: 'कागजात', article: 'लेख', email: 'इमेल' };
    view.innerHTML = `
      ${head('Reading · पढाइ', 'Stories and real-life texts', 'कथा र वास्तविक जीवनका पाठ',
        'Short stories, messages from a boss, notices, receipts, contracts and news, from A1 to B2. Tap any word to see its meaning and pronunciation.<br><span lang="ne">कथा, हाकिमको सन्देश, सूचना, बिल, सम्झौता र समाचार। अर्थ र उच्चारण हेर्न कुनै पनि शब्द थिच्नुहोस्।</span>')}
      ${S.STORIES.length ? byLevel(S.STORIES, (s) => listRow(`read.${s.id}`, s.kind, s.title, `${s.titleNe} · ${kindNe[s.kind] || ''}`, S.progress.stories[s.id] != null,
        S.progress.stories[s.id] != null ? `<small class="ok">${S.progress.stories[s.id]}%</small>` : '')) : '<p class="empty">No texts loaded.</p>'}`;
  };

  const tokenize = (text) => text.split(/(\s+)/).map((part) => {
    if (/^\s+$/.test(part) || !part) return esc(part);
    const m = part.match(/^([„"«(]*)(.*?)([.,!?;:…"”»)]*)$/);
    const word = m ? m[2] : part;
    if (!word || !/[\p{L}]/u.test(word)) return esc(part);
    return `${esc(m[1])}<button class="tok" data-action="tok" data-word="${esc(word)}" lang="pl">${polish(word)}</button>${esc(m[3])}`;
  }).join('');
  S.tokenize = tokenize;

  // A course sentence that contains this exact word form, for words with no glossary entry.
  const usedInCache = new Map();
  function usedIn(key) {
    if (!usedInCache.has(key)) {
      let found = null;
      for (const e of S.LEXICON.values()) {
        if (e.pl.split(/\s+/).some((w) => S.tokenKey(w) === key)) { found = e; break; }
      }
      usedInCache.set(key, found);
    }
    return usedInCache.get(key);
  }

  function lookupWord(st, word) {
    const key = S.tokenKey(word);
    return st.glossaryMap.get(key) || S.WORD_INDEX.get(key) || [...st.glossaryMap.values()].find((g) => S.fold(g.pl) === S.fold(word));
  }

  X.read = (view, id) => {
    const st = S.STORIES.find((s) => s.id === id);
    if (!st) { S.go('read'); return; }
    if (!reading || reading.st !== st) reading = { st, open: new Set(), answers: {}, word: null };
    const r = reading;
    const answered = Object.keys(r.answers).length;
    const score = st.questions.filter((q, i) => r.answers[i] === q.answer).length;

    const paras = st.paragraphs.map((p, i) => `
      <div class="read-para">
        <p class="pl-text" lang="pl">${tokenize(p.pl)}</p>
        <div class="row start small-row">
          ${S.listenBtn(p.pl)}
          ${S.canSpeak ? `<button type="button" class="link-btn" data-action="say" data-slow="1" data-text="${esc(p.pl)}" title="Listen slowly">🐢 Slow</button>` : ''}
          <button class="link-btn" data-action="read-trans" data-index="${i}">${r.open.has(i) ? 'Hide translation' : 'Show translation'} · अनुवाद</button>
        </div>
        ${r.open.has(i) ? `<div class="para trans-block">${S.shows('meaning', 'en') ? `<p>${esc(p.en)}</p>` : ''}${S.shows('meaning', 'ne') ? `<p class="ne" lang="ne">${esc(p.ne)}</p>` : ''}</div>` : ''}
      </div>`).join('');

    const qs = st.questions.map((q, i) => {
      const a = r.answers[i];
      const done = a !== undefined;
      return `
        <div class="question">
          <p class="q-pl" lang="pl"><b>${i + 1}.</b> ${polish(q.q)}</p>
          ${S.transHTML(q.en, q.ne)}
          <div class="options single">${q.options.map((o, k) => {
            let cls = 'option';
            if (done && k === q.answer) cls += ' right';
            else if (done && k === a) cls += ' wrong';
            return `<button class="${cls}" data-action="read-answer" data-q="${i}" data-index="${k}" ${done ? 'disabled' : ''}><span class="opt-pl" lang="pl">${polish(o)}</span></button>`;
          }).join('')}</div>
          ${done ? S.whyHTML(q.why) : ''}
        </div>`;
    }).join('');

    let pop = '';
    if (r.word) {
      const key = S.tokenKey(r.word);
      const e = lookupWord(st, r.word);
      pop = `
        <div class="sheet" role="dialog" aria-label="Word">
          <button class="sheet-close" data-action="tok-close" aria-label="Close">×</button>
          ${e ? `
            <div class="sheet-word"><span lang="pl">${polish(e.pl)}</span>${S.listenBtn(e.pl)}</div>
            ${S.pronHTML(e)}${S.meaningHTML(e)}
            ${e.base && S.clean(e.base) !== S.clean(e.pl) ? `<p class="hint">Dictionary form · शब्दकोशको रूप: <b lang="pl">${polish(e.base)}</b></p>` : ''}
            <div class="row start"><button class="btn" data-action="tok-add">${S.itemOf(e) ? 'In your review ✓' : 'Add to my review · दोहोर्याइमा थप्नुहोस्'}</button></div>`
          : `<div class="sheet-word"><span lang="pl">${polish(r.word)}</span>${S.listenBtn(r.word)}</div>
             ${usedIn(key) ? `<p class="hint">Used in this course sentence · यो वाक्यमा प्रयोग भएको:</p>
               <p lang="pl"><b>${polish(usedIn(key).pl)}</b></p>${S.meaningHTML(usedIn(key))}`
             : '<p class="hint">This form is not in the glossary. Try the dictionary with the start of the word. · यो रूप शब्दसूचीमा छैन।</p>'}
             <button class="btn" data-action="go" data-to="dictionary" data-q="${esc(r.word.slice(0, Math.max(3, r.word.length - 2)))}">Search the dictionary</button>`}
        </div>`;
    }

    view.innerHTML = `
      ${S.backLink('read', 'All texts · सबै पाठ')}
      <header class="unit-head">
        <span class="eyebrow">${esc(st.level)} · ${esc(st.kind)}</span>
        <h2>${esc(st.title)}</h2>
        <p class="unit-head-ne" lang="ne">${esc(st.titleNe)}</p>
        <p class="hint">Tap any word for its meaning. · अर्थ हेर्न शब्द थिच्नुहोस्।</p>
      </header>
      <article class="reader kind-${esc(st.kind)}">${paras}</article>
      <h3 class="section-h">Questions <span class="ne-sub" lang="ne">प्रश्नहरू</span>${answered === st.questions.length ? ` <small>${score} / ${st.questions.length}</small>` : ''}</h3>
      ${qs}
      <h3 class="section-h">Words in this text <span class="ne-sub" lang="ne">यस पाठका शब्द</span></h3>
      <ul class="entries">${(st.glossary || []).map((x) => S.entryRow(st.glossaryMap.get(S.tokenKey(x[0])))).join('')}</ul>
      <div class="row start"><button class="btn" data-action="read-add-all">Add all to my daily review · सबै दोहोर्याइमा थप्नुहोस्</button></div>
      <p class="report-row">${S.reportHTML(st.title, `Reading text ${st.id}`)}</p>
      ${pop}`;
  };

  // =====================================================================
  // Exams
  // =====================================================================

  let exam = null;

  X.examList = (view) => {
    const pl = S.progress.placement;
    view.innerHTML = `
      ${head('Exam prep · परीक्षा तयारी', 'Tests and the B1 certificate', 'परीक्षा र B1 प्रमाणपत्र',
        'Find your level with the placement test, then practise for the official Polish B1 certificate exam with full practice tests.<br><span lang="ne">स्तर पत्ता लगाउने परीक्षा दिनुहोस्, अनि आधिकारिक B1 प्रमाणपत्र परीक्षाको पूर्ण अभ्यास गर्नुहोस्।</span>')}
      <section class="level">
        <header class="level-head"><h2>Placement test <span class="ne-sub" lang="ne">स्तर परीक्षा</span></h2></header>
        <ol class="units">${listRow('placement', '30 Q', 'Find your level', pl ? `Last result: ${pl.level} · ${pl.date}` : '३० प्रश्न, करिब १० मिनेट', !!pl)}</ol>
      </section>
      <section class="level">
        <header class="level-head"><h2>B1 practice tests <span class="ne-sub" lang="ne">B1 अभ्यास परीक्षा</span></h2></header>
        <ol class="units">${S.EXAMS.map((x) => listRow(`exam.${x.id}`, x.level, x.title, x.titleNe, S.progress.exams[x.id] != null,
          S.progress.exams[x.id] != null ? `<small class="ok">best ${S.progress.exams[x.id]}%</small>` : '')).join('') || '<li class="empty">No tests loaded.</li>'}</ol>
      </section>`;
  };

  function startExam(x) { exam = { x, si: -1, answers: {}, checked: {}, writing: {}, ticks: {}, plays: {} }; }

  X.exam = (view, id) => {
    const x = S.EXAMS.find((e) => e.id === id);
    if (!x) { S.go('exam'); return; }
    if (!exam || exam.x !== x) startExam(x);
    const ex = exam;
    let body;
    if (ex.si < 0) {
      body = `
        <div class="lesson">${S.whyHTML(x.intro)}</div>
        <ol class="sections-list">${x.sections.map((s) => `<li>${esc(s.title)} · <span lang="ne">${esc(s.titleNe)}</span></li>`).join('')}</ol>
        <div class="row start"><button class="btn primary" data-action="exam-start">Start the test · परीक्षा सुरु गर्नुहोस्</button></div>`;
    } else if (ex.si >= x.sections.length) {
      const rows = x.sections.filter((s) => s.kind !== 'writing').map((s) => {
        const si = x.sections.indexOf(s);
        const right = s.items.filter((q, i) => ex.answers[`${si}-${i}`] === q.answer).length;
        return { s, right, total: s.items.length };
      });
      const right = rows.reduce((n, r) => n + r.right, 0);
      const total = rows.reduce((n, r) => n + r.total, 0);
      const pct = total ? Math.round((right / total) * 100) : 0;
      if (S.progress.exams[x.id] == null || pct > S.progress.exams[x.id]) { S.progress.exams[x.id] = pct; S.saveProgress(); }
      body = `
        <div class="card summary">
          <span class="label">Result · नतिजा</span>
          <h2>${pct}%</h2>
          <p class="hint">Aim for at least 60% in every part before the real exam. Practise the parts below 60% again.<br><span lang="ne">वास्तविक परीक्षाअघि हरेक भागमा कम्तीमा ६०% ल्याउने लक्ष्य राख्नुहोस्।</span></p>
        </div>
        <ul class="result-list">${rows.map((r) => `<li><span>${esc(r.s.title)} · <span lang="ne">${esc(r.s.titleNe)}</span></span>${S.bar(r.right, r.total)}<b>${r.right}/${r.total}</b></li>`).join('')}</ul>
        <p class="hint">The writing part is checked by you, using the model answers and checklists. For the speaking part of the real exam, use Conversation practice and the Speak tab in every unit.</p>
        <div class="row start"><button class="btn primary" data-action="exam-restart">Take the test again</button><button class="btn" data-action="go" data-to="exam">All tests</button></div>`;
    } else {
      body = sectionHTML(x.sections[ex.si], ex.si);
    }
    view.innerHTML = `
      ${S.backLink('exam', 'Exam prep · परीक्षा तयारी')}
      <header class="unit-head">
        <span class="eyebrow">${esc(x.level)} · Practice test${ex.si >= 0 && ex.si < x.sections.length ? ` · Part ${ex.si + 1} of ${x.sections.length}` : ''}</span>
        <h2>${esc(x.title)}</h2>
        <p class="unit-head-ne" lang="ne">${esc(x.titleNe)}</p>
      </header>
      ${body}`;
  };

  function sectionHTML(s, si) {
    const ex = exam;
    const checked = !!ex.checked[si];
    let inner = '';
    if (s.kind === 'writing') {
      inner = s.tasks.map((t, ti) => {
        const key = `${si}-${ti}`;
        const text = ex.writing[key] || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        return `
          <div class="question">
            <p class="q-pl" lang="pl"><b>${ti + 1}.</b> ${polish(t.prompt.pl)}</p>
            ${S.transHTML(t.prompt.en, t.prompt.ne)}
            <textarea class="writing" id="w-${key}" data-keys-target data-writing="${key}" lang="pl" spellcheck="false" rows="7" placeholder="Write in Polish…">${esc(text)}</textarea>
            ${S.keysHTML()}
            <p class="hint" data-min="${t.minWords || ''}">${words} words${t.minWords ? ` · aim for at least ${t.minWords}` : ''}</p>
            ${checked ? `
              <details class="model" open><summary>Model answer · नमुना उत्तर</summary>
                <p lang="pl">${polish(t.model.pl)}</p>${S.listenBtn(t.model.pl)}
                ${S.shows('meaning', 'en') ? `<p class="hint">${esc(t.model.en)}</p>` : ''}${S.shows('meaning', 'ne') ? `<p class="hint" lang="ne">${esc(t.model.ne)}</p>` : ''}
              </details>
              <fieldset class="checklist"><legend>Check your text · आफ्नो लेख जाँच्नुहोस्</legend>
                ${t.checklist.map((c, ci) => `<label><input type="checkbox" data-action="exam-tick" data-key="${key}-${ci}" ${ex.ticks[`${key}-${ci}`] ? 'checked' : ''}> ${esc(c.en)} · <span lang="ne">${esc(c.ne)}</span></label>`).join('')}
              </fieldset>` : ''}
          </div>`;
      }).join('');
    } else {
      const text = s.kind === 'reading' ? `
        <article class="reader exam-text"><p class="pl-text" lang="pl">${tokenize(s.text.pl)}</p>
          ${checked ? `<details><summary>Translation · अनुवाद</summary>${S.shows('meaning', 'en') ? `<p>${esc(s.text.en)}</p>` : ''}${S.shows('meaning', 'ne') ? `<p lang="ne">${esc(s.text.ne)}</p>` : ''}</details>` : ''}
        </article>` : '';
      inner = text + s.items.map((q, i) => {
        const key = `${si}-${i}`;
        const a = ex.answers[key];
        const audio = s.kind === 'listening' ? `
          <div class="row start"><button class="btn listen" data-action="exam-play" data-key="${key}" data-text="${esc(q.audio)}">${S.SPEAKER} Play recording${ex.plays[key] ? ` (${ex.plays[key]})` : ''}</button></div>
          ${checked ? `<details class="model"><summary>Transcript · लिखित रूप</summary><p lang="pl">${polish(q.audio)}</p>${S.transHTML(q.en, q.ne)}</details>` : ''}` : '';
        const prompt = s.kind === 'grammar'
          ? `<p class="q-pl" lang="pl"><b>${i + 1}.</b> ${polish(q.q).replace('___', '<span class="blank">&nbsp;</span>')}</p>${checked ? S.transHTML(q.en, q.ne) : ''}`
          : `<p class="q-pl" lang="pl"><b>${i + 1}.</b> ${polish(q.q)}</p>${S.transHTML(q.qEn, q.qNe)}`;
        return `
          <div class="question">
            ${audio}${prompt}
            <div class="options single">${q.options.map((o, k) => {
              let cls = 'option';
              if (!checked && a === k) cls += ' picked';
              if (checked && k === q.answer) cls += ' right';
              else if (checked && k === a) cls += ' wrong';
              return `<button class="${cls}" data-action="exam-answer" data-key="${key}" data-index="${k}" ${checked ? 'disabled' : ''}><span class="opt-pl" lang="pl">${polish(o)}</span></button>`;
            }).join('')}</div>
            ${checked ? S.whyHTML(q.why) : ''}
          </div>`;
      }).join('');
    }
    return `
      <h3 class="section-h">${esc(s.title)} <span class="ne-sub" lang="ne">${esc(s.titleNe)}</span></h3>
      ${inner}
      <div class="row start">
        ${checked ? '' : `<button class="btn primary" data-action="exam-check">${s.kind === 'writing' ? 'Show model answers · नमुना हेर्नुहोस्' : 'Check answers · उत्तर जाँच्नुहोस्'}</button>`}
        ${checked ? `<button class="btn primary" data-action="exam-next">${si + 1 < exam.x.sections.length ? 'Next part →' : 'See the result →'}</button>` : ''}
      </div>`;
  }

  // ---------- placement ----------

  let placement = null;
  const BANDS = [
    { name: 'Start', from: 0 }, { name: 'A1', from: 6 }, { name: 'A2', from: 12 }, { name: 'B1', from: 18 }, { name: 'B2', from: 24 },
  ];

  X.placement = (view) => {
    const items = S.PLACEMENT;
    if (!placement) placement = { i: 0, answers: [] };
    const p = placement;
    let body;
    if (!items.length) body = '<p class="empty">The placement test did not load.</p>';
    else if (p.i < items.length) {
      const q = items[p.i];
      body = `
        <div class="meta"><span>Question ${p.i + 1} of ${items.length}</span>${S.bar(p.i, items.length)}</div>
        <div class="card">
          <span class="label">Choose the right answer · सही उत्तर छान्नुहोस्</span>
          <p class="drill-q" lang="pl">${polish(q.q).replace('___', '<span class="blank">&nbsp;</span>')}</p>
        </div>
        <div class="options">${q.options.map((o, k) => `<button class="option" data-action="place-answer" data-index="${k}"><kbd>${k + 1}</kbd><span class="opt-pl" lang="pl">${polish(o)}</span></button>`).join('')}</div>
        <div class="row"><button class="btn" data-action="place-answer" data-index="-1">I don't know · थाहा छैन</button></div>`;
    } else {
      const bandScores = BANDS.map((b) => items.slice(b.from, b.from + 6).filter((q, k) => p.answers[b.from + k] === q.answer).length);
      let passed = 0;
      while (passed < BANDS.length && bandScores[passed] >= 4) passed += 1;
      const targetLevel = ['Start', 'A1', 'A2', 'B1', 'B2', 'B2'][passed];
      const unit = S.COURSE.find((u) => u.level === targetLevel) || S.COURSE[0];
      const label = passed >= 5 ? 'B2 and above' : passed === 0 ? 'Beginner' : `${BANDS[passed - 1].name === 'Start' ? 'A1 (basic)' : BANDS[passed - 1].name}`;
      if (!p.saved) { S.progress.placement = { level: label, date: S.dayKey(), unit: unit.id }; S.saveProgress(); p.saved = true; }
      body = `
        <div class="card summary">
          <span class="label">Your level · तपाईंको स्तर</span>
          <h2>${esc(label)}</h2>
          <p class="hint">Start with <b>${esc(unit.title)}</b> (<span lang="ne">${esc(unit.titleNe)}</span>). You can still open any unit at any time.</p>
          ${S.COURSE.indexOf(unit) > 0 ? `<div class="row"><button class="btn primary" data-action="place-skip" data-unit="${unit.id}">Start here: mark earlier lessons as known · यहाँबाट सुरु गर्नुहोस्</button></div>
            <p class="hint">Earlier lessons stay open, so you can go back to them any time. · अघिल्ला पाठ जुनसुकै बेला खोल्न सकिन्छ।</p>` : ''}
          <div class="row"><button class="btn ${S.COURSE.indexOf(unit) > 0 ? '' : 'primary'}" data-action="go" data-to="${unit.id}">Go to ${esc(unit.title)}</button><button class="btn" data-action="place-restart">Take the test again</button></div>
        </div>
        <ul class="result-list">${BANDS.map((b, k) => `<li><span>${b.name === 'Start' ? 'Basics' : b.name}</span>${S.bar(bandScores[k], 6)}<b>${bandScores[k]}/6</b></li>`).join('')}</ul>
        <h3 class="section-h">Your answers <span class="ne-sub" lang="ne">तपाईंका उत्तर</span></h3>
        ${items.map((q, k) => {
          const ok = p.answers[k] === q.answer;
          return `<div class="question ${ok ? 'q-ok' : 'q-bad'}"><p class="q-pl" lang="pl">${ok ? '✓' : '✗'} ${polish(q.q.replace('___', q.options[q.answer]))}</p>${S.transHTML(q.en, q.ne)}</div>`;
        }).join('')}`;
    }
    view.innerHTML = `${head('Placement test · स्तर परीक्षा', 'Find your level', 'आफ्नो स्तर पत्ता लगाउनुहोस्', p.i === 0 ? '30 questions from easy to hard. Choose "I don\'t know" instead of guessing. · ३० प्रश्न, सजिलोदेखि गाह्रोसम्म। अनुमान नगर्नुहोस्।' : '')}${body}`;
  };

  // =====================================================================
  // Mistakes notebook
  // =====================================================================

  X.mistakeItems = () => Object.values(S.progress.mistakes)
    .map((m) => ({ m, d: (S.DRILLS[m.unit] || [])[m.idx] }))
    .filter((x) => x.d)
    .sort((a, b) => b.m.count - a.m.count);

  X.mistakes = (view) => {
    const list = X.mistakeItems();
    view.innerHTML = `
      ${head('My mistakes · मेरा गल्तीहरू', 'Mistakes notebook', 'गल्ती कापी',
        'Every grammar exercise you get wrong is saved here with its explanation. Practise them until they disappear.<br><span lang="ne">गलत भएका व्याकरण अभ्यासहरू यहाँ व्याख्यासहित बस्छन्। सही नभएसम्म अभ्यास गर्नुहोस्।</span>')}
      ${list.length ? `<div class="row start"><button class="btn primary" data-action="go" data-to="mistakes.practice">Practise my ${list.length} ${list.length === 1 ? 'mistake' : 'mistakes'}</button></div>
        ${list.map(({ m, d }) => {
          const correct = S.drillSentence(d);
          const u = S.UNIT.get(m.unit);
          return `<details class="question"><summary><span lang="pl">${polish(correct)}</span> <small class="hint">× ${m.count} · ${esc(u ? u.title : m.unit)}</small></summary>${S.transHTML(d.en, d.ne)}${S.whyHTML(d.why)}</details>`;
        }).join('')}`
      : '<div class="card summary"><h2>No mistakes saved</h2><p class="hint">Do the grammar exercises in any unit. Anything you get wrong will appear here. · कुनै पाठको व्याकरण अभ्यास गर्नुहोस्।</p></div>'}`;
  };

  // =====================================================================
  // Progress
  // =====================================================================

  X.progressPage = (view) => {
    const days = [];
    for (let i = 13; i >= 0; i--) { const k = S.addDays(-i); days.push({ k, n: S.progress.history[k] || 0 }); }
    const max = Math.max(S.settings.goal, ...days.map((d) => d.n));
    const levels = S.LEVELS.map((l) => {
      const units = S.COURSE.filter((u) => u.level === l.id);
      if (!units.length) return '';
      const total = units.reduce((n, u) => n + u.entries.length, 0);
      const done = units.reduce((n, u) => n + S.unitLearned(u), 0);
      const drills = units.filter((u) => S.progress.drills[u.id]);
      const avg = drills.length ? Math.round(drills.reduce((n, u) => n + S.progress.drills[u.id].best, 0) / drills.length) : null;
      return `<li><span>${esc(l.name)}</span>${S.bar(done, total)}<b>${done}/${total}</b><small>${avg != null ? `grammar ${avg}%` : ''}</small></li>`;
    }).join('');
    const learned = S.ENTRIES.filter(S.isLearned).length;
    const rpDone = S.ROLEPLAYS.filter((r) => S.progress.roleplays[r.id]).length;
    const stDone = S.STORIES.filter((s) => S.progress.stories[s.id] != null).length;
    const curLevel = S.getProficiencyLevel ? S.getProficiencyLevel() : S.LEVELS[0];
    view.innerHTML = `
      ${head('Progress · प्रगति', 'Your progress', 'तपाईंको प्रगति', '')}
      <section class="proficiency-showcase" aria-label="Language Proficiency">
        <div class="proficiency-left">
          <div class="proficiency-shield">
            <span class="prof-crest" aria-hidden="true">🇵🇱</span>
            <span class="prof-rank">${esc(curLevel.id === 'Start' ? '0' : curLevel.id)}</span>
          </div>
          <div class="proficiency-info">
            <span class="eyebrow">Language Proficiency · भाषाको स्तर</span>
            <h3>${esc(curLevel.name)} <span class="ne-sub" lang="ne">${esc(curLevel.ne)}</span></h3>
            <p class="hint">${esc(curLevel.blurb)} · <span lang="ne">${esc(curLevel.blurbNe || '')}</span></p>
          </div>
        </div>
        <button class="btn celebrate-btn" data-action="celebrate-level" title="Celebrate your proficiency level with animation">
          <span>🎉 Celebrate level</span>
        </button>
      </section>
      <div class="stat-grid">
        <div class="stat-tile"><b>${S.currentStreak()}</b><span>day streak · लगातार दिन</span></div>
        <div class="stat-tile"><b>${learned}</b><span>words learned · सिकेका शब्द</span></div>
        <div class="stat-tile"><b>${rpDone}/${S.ROLEPLAYS.length}</b><span>conversations · संवाद</span></div>
        <div class="stat-tile"><b>${stDone}/${S.STORIES.length}</b><span>texts read · पढेका पाठ</span></div>
      </div>
      <h3 class="section-h">Study Activity Heatmap <span class="ne-sub" lang="ne">दैनिक अध्ययन क्यालेन्डर (पछिल्ला १० हप्ता)</span></h3>
      ${(() => {
        const weeks = 10;
        const totalDays = weeks * 7;
        const cells = [];
        const today = new Date();
        const dayOfWeek = (today.getDay() + 6) % 7; // Monday = 0, Sunday = 6
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - (totalDays - 1 - (6 - dayOfWeek)));

        for (let i = 0; i < totalDays; i++) {
          const d = new Date(startDate);
          d.setDate(startDate.getDate() + i);
          const key = S.dayKey(d);
          const count = S.progress.history[key] || 0;
          let level = 0;
          if (count >= S.settings.goal * 1.5) level = 4;
          else if (count >= S.settings.goal) level = 3;
          else if (count >= Math.round(S.settings.goal * 0.5)) level = 2;
          else if (count > 0) level = 1;
          const isToday = key === S.dayKey();
          cells.push({ key, count, level, isToday, dateStr: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) });
        }

        return `
          <div class="srs-heatmap-card card compact">
            <div class="srs-heatmap-header">
              <span class="srs-hm-title"><b>Daily Review Consistency</b> · नियमितता</span>
              <div class="srs-hm-legend">
                <small>Less</small>
                <i class="hm-cell lvl-0"></i>
                <i class="hm-cell lvl-1"></i>
                <i class="hm-cell lvl-2"></i>
                <i class="hm-cell lvl-3"></i>
                <i class="hm-cell lvl-4"></i>
                <small>More</small>
              </div>
            </div>
            <div class="srs-heatmap-grid" role="grid" aria-label="Study heatmap for the last 10 weeks">
              ${cells.map(c => `
                <div class="hm-cell lvl-${c.level} ${c.isToday ? 'today' : ''}" title="${c.key} (${c.dateStr}): ${c.count} reviews / exercises"></div>
              `).join('')}
            </div>
          </div>
        `;
      })()}
      <h3 class="section-h">Last 14 days (Bar chart) <span class="ne-sub" lang="ne">पछिल्ला १४ दिन</span></h3>
      <div class="chart" role="img" aria-label="Answers per day for the last 14 days">
        <div class="goal-line" style="bottom:${(S.settings.goal / max) * 100}%"><span>goal ${S.settings.goal}</span></div>
        ${days.map((d) => `<div class="col" title="${d.k}: ${d.n}"><i class="${d.n >= S.settings.goal ? 'met' : ''}" style="height:${(d.n / max) * 100}%"></i><span>${Number(d.k.slice(8))}</span></div>`).join('')}
      </div>
      <h3 class="section-h">By level <span class="ne-sub" lang="ne">स्तर अनुसार</span></h3>
      <ul class="result-list">${levels}</ul>
      ${S.progress.placement ? `<p class="hint">Placement test: <b>${esc(S.progress.placement.level)}</b> on ${esc(S.progress.placement.date)}</p>` : ''}
      ${Object.keys(S.progress.exams).length ? `<p class="hint">Best exam scores: ${S.EXAMS.filter((x) => S.progress.exams[x.id] != null).map((x) => `${esc(x.title)} ${S.progress.exams[x.id]}%`).join(', ')}</p>` : ''}`;
  };

  // =====================================================================
  // Actions
  // =====================================================================

  X.action = (a, el, view) => {
    switch (a) {
      case 'talk-meanings': talk.hintStep = talk.step; S.render(); return true;
      case 'talk-pick': {
        if (talk.busy || talk.done) return true;
        const st = talk.rp.steps[talk.step];
        const r = st.replies[Number(el.dataset.index)];
        if (r.ok) { S.speak(r.pl); accept(r); } else reject(r);
        S.render();
        return true;
      }
      case 'talk-mode': if (talk.busy) return true; talk.mode = el.dataset.mode; talk.wrong = null; talk.hint = false; S.render(); return true;
      case 'talk-hint': talk.hint = !talk.hint; S.render(); return true;
      case 'talk-say': talkSay(view); return true;
      case 'talk-restart': startTalk(talk.rp, talk.mode); S.render(); return true;
      case 'talk-add': (talk.rp.useful || []).forEach((x) => S.addToReview(S.LEXICON.get(x[0]))); el.textContent = 'Added ✓'; return true;
      case 'tok':
        S.speak(el.dataset.word);
        // Tappable words also appear in exam texts, which have no word popup: there they only speak.
        if (S.route.name === 'read' && reading) {
          reading.word = el.dataset.word;
          S.render();
          // The word sheet is a dialog: focus moves into it, and back to the word when it closes.
          const c = document.querySelector('.sheet-close');
          if (c) c.focus({ preventScroll: true });
        }
        return true;
      case 'tok-close': closeSheet(); return true;
      case 'tok-add': {
        const e = reading && lookupWord(reading.st, reading.word);
        if (e) S.addToReview(e);
        S.render();
        return true;
      }
      case 'read-trans': {
        const i = Number(el.dataset.index);
        if (reading.open.has(i)) reading.open.delete(i); else reading.open.add(i);
        S.render();
        return true;
      }
      case 'read-answer': {
        const q = Number(el.dataset.q);
        reading.answers[q] = Number(el.dataset.index);
        const st = reading.st;
        if (Object.keys(reading.answers).length === st.questions.length) {
          const pct = Math.round((st.questions.filter((x, i) => reading.answers[i] === x.answer).length / st.questions.length) * 100);
          if (S.progress.stories[st.id] == null || pct > S.progress.stories[st.id]) S.progress.stories[st.id] = pct;
        }
        S.logActivity();
        S.saveProgress();
        S.render();
        return true;
      }
      case 'read-add-all': reading.st.glossaryMap.forEach((e) => S.addToReview(e)); el.textContent = 'Added ✓'; return true;
      case 'exam-start': exam.si = 0; S.render(); window.scrollTo(0, 0); return true;
      case 'exam-play': exam.plays[el.dataset.key] = (exam.plays[el.dataset.key] || 0) + 1; S.speak(el.dataset.text); S.render(); return true;
      case 'exam-answer': exam.answers[el.dataset.key] = Number(el.dataset.index); S.render(); return true;
      case 'exam-check': {
        exam.checked[exam.si] = true;
        // Counts toward today's goal only if something was answered or written in this part.
        const mine = (k) => k.startsWith(`${exam.si}-`);
        const did = Object.keys(exam.answers).some(mine) || Object.entries(exam.writing).some(([k, v]) => mine(k) && String(v).trim());
        if (did) S.logActivity();
        S.saveProgress(); S.render(); return true;
      }
      case 'exam-next': exam.si += 1; S.render(); window.scrollTo(0, 0); return true;
      case 'exam-restart': startExam(exam.x); exam.si = 0; S.render(); window.scrollTo(0, 0); return true;
      case 'exam-tick': exam.ticks[el.dataset.key] = el.checked; return true;
      case 'place-answer': placement.answers[placement.i] = Number(el.dataset.index); placement.i += 1; S.render(); return true;
      case 'place-skip': {
        // Mark every main-course lesson before the placement result as known.
        const target = S.UNIT.get(el.dataset.unit);
        const main = S.COURSE.filter((u) => u.level !== 'Work');
        const g = (S.progress.guided = S.progress.guided || {});
        main.slice(0, main.indexOf(target)).forEach((u) => { if (!(g[u.id] && g[u.id].done)) g[u.id] = { step: 0, done: S.dayKey(), skipped: true }; });
        S.progress.lastUnit = target.id;
        S.saveProgress();
        S.go('home');
        return true;
      }
      case 'place-restart': placement = null; S.render(); return true;
      case 'guide-tab':
        guideCategory = el.dataset.cat;
        X.renderGuide(view, guideCategory);
        return true;
      default: return false;
    }
  };

  X.submit = (form) => {
    if (form.dataset.form === 'talk-type') {
      const input = form.querySelector('#talk-answer');
      if (!input.value.trim()) return true;
      talk.typed = input.value;
      judge(input.value);
      S.render();
      return true;
    }
    return false;
  };
  X.input = (el) => {
    if (el.id === 'guide-search-input') {
      guideSearch = el.value;
      const v = document.getElementById('view');
      if (v) X.renderGuide(v, guideCategory);
      const inp = document.getElementById('guide-search-input');
      if (inp) { inp.focus(); inp.selectionStart = inp.selectionEnd = inp.value.length; }
      return true;
    }
    if (el.dataset.writing && exam) { exam.writing[el.dataset.writing] = el.value; const hint = el.parentElement.querySelector('.hint'); if (hint) hint.textContent = `${el.value.trim() ? el.value.trim().split(/\s+/).length : 0} words${hint.dataset.min ? ` · aim for at least ${hint.dataset.min}` : ''}`; return true; }
    if (el.id === 'talk-answer' && talk) { talk.typed = el.value; return true; }
    return false;
  };
  function closeSheet() {
    if (!reading || !reading.word) return;
    const w = reading.word;
    reading.word = null;
    S.render();
    const t = [...document.querySelectorAll('.tok')].find((x) => x.dataset.word === w);
    if (t) t.focus({ preventScroll: true });
  }
  X.key = (ev) => {
    if (ev.key === 'Escape' && reading && reading.word && S.route.name === 'read') { closeSheet(); return true; }
    if (talk && S.route.name === 'talk' && S.route.arg && !talk.done && !talk.busy && /^[1-3]$/.test(ev.key) && (talk.mode === 'choose' || talk.hint)) {
      const st = talk.rp.steps[talk.step];
      const r = st.replies[talk.order[Number(ev.key) - 1]];
      if (r) { if (r.ok) { S.speak(r.pl); accept(r); } else reject(r); S.render(); return true; }
    }
    if (placement && S.route.name === 'placement' && /^[1-4]$/.test(ev.key) && placement.i < S.PLACEMENT.length && Number(ev.key) <= S.PLACEMENT[placement.i].options.length) {
      placement.answers[placement.i] = Number(ev.key) - 1; placement.i += 1; S.render(); return true;
    }
    return false;
  };
  X.resetPlacement = () => { if (!(placement && placement.saved)) placement = null; };

  // =====================================================================
  // Practical Poland Life, Legal & Work Guide
  // =====================================================================
  let guideCategory = 'all';
  let guideSearch = '';

  X.renderGuide = (view, arg) => {
    const list = window.SLOWKA_POLAND_GUIDE || [];
    if (arg && list.some((c) => c.id === arg)) {
      guideCategory = arg;
    }
    const categories = [{ id: 'all', title: 'All Topics', titleNe: 'सबै विषय', icon: '🇵🇱' }, ...list];
    const activeCat = list.find((c) => c.id === guideCategory) || null;
    const filterQuery = (guideSearch || '').trim().toLowerCase();

    const displayCats = activeCat ? [activeCat] : list;

    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head">
        <span class="eyebrow">Practical Guide · व्यावहारिक ज्ञान</span>
        <h2>Life & Work in Poland</h2>
        <p class="unit-head-ne" lang="ne">पोल्यान्डमा जीवन, काम र कानुनी नियम</p>
        <p class="hint">Essential Polish legal terms, immigration procedures (Urząd, Karta Pobytu, PESEL), work contracts, healthcare, and everyday Polish slang with native audio, phonetic guides, and Nepali advice.<br>
        <span lang="ne">अध्यागमन (Urząd), भिसा, कामको सम्झौता, स्वास्थ्य बीमा र बोलिने ठेट पोलिश भाषाका मुख्य शब्द र सुझावहरू।</span></p>
      </header>

      <div class="guide-controls">
        <div class="guide-tabs" role="tablist" aria-label="Guide Categories">
          ${categories.map((c) => `
            <button class="guide-tab ${guideCategory === c.id ? 'active' : ''}" data-action="guide-tab" data-cat="${c.id}">
              <span aria-hidden="true">${c.icon}</span>
              <span>${esc(c.title)}</span>
              <small lang="ne">${esc(c.titleNe)}</small>
            </button>
          `).join('')}
        </div>

        <div class="guide-search-row">
          <input type="search" class="guide-search-input" id="guide-search-input" placeholder="Search guide (e.g. wniosek, contract, zus, doctor, spoko)..." value="${esc(guideSearch)}">
        </div>
      </div>

      <div class="guide-body">
        ${displayCats.map((cat) => {
          const items = cat.items.filter((item) => {
            if (!filterQuery) return true;
            return item.pl.toLowerCase().includes(filterQuery) ||
                   item.en.toLowerCase().includes(filterQuery) ||
                   item.ne.includes(filterQuery) ||
                   (item.tip && item.tip.toLowerCase().includes(filterQuery));
          });
          if (!items.length) return '';
          return `
            <section class="guide-section card">
              <header class="guide-section-head">
                <span class="guide-sec-icon" aria-hidden="true">${cat.icon}</span>
                <div>
                  <h3 class="guide-sec-title">${esc(cat.title)}</h3>
                  <p class="guide-sec-ne" lang="ne">${esc(cat.titleNe)}</p>
                  <p class="guide-sec-desc">${esc(cat.desc)}</p>
                </div>
              </header>

              <div class="guide-items-grid">
                ${items.map((it) => `
                  <article class="guide-card">
                    <div class="guide-card-top">
                      <div class="guide-pl-row">
                        <span class="guide-pl" lang="pl">${polish(it.pl)}</span>
                        ${S.listenBtn(it.pl)}
                      </div>
                      <div class="guide-pron">
                        <span class="pron-latin">${esc(it.pron)}</span>
                        ${it.proNe ? `<span class="pron-ne" lang="ne">${esc(it.proNe)}</span>` : ''}
                      </div>
                    </div>

                    <div class="guide-meanings">
                      <div class="guide-en"><b>EN:</b> ${esc(it.en)}</div>
                      <div class="guide-ne" lang="ne"><b>NE:</b> ${esc(it.ne)}</div>
                    </div>

                    ${(it.tip || it.tipNe) ? `
                      <div class="guide-tip-box">
                        <div class="guide-tip-label">💡 Official & Practical Tip · सुझाव:</div>
                        ${it.tip ? `<p class="guide-tip-en">${esc(it.tip)}</p>` : ''}
                        ${it.tipNe ? `<p class="guide-tip-ne" lang="ne">${esc(it.tipNe)}</p>` : ''}
                      </div>
                    ` : ''}

                    <div class="guide-card-actions">
                      <button class="chip-btn" data-action="say" data-text="${esc(it.pl)}">🔊 Listen</button>
                      <button class="chip-btn" data-action="mywords-add" data-pl="${esc(it.pl)}" data-en="${esc(it.en)}" data-ne="${esc(it.ne)}">⭐ Add to My Words</button>
                    </div>
                  </article>
                `).join('')}
              </div>
            </section>
          `;
        }).join('')}
      </div>
    `;
  };
})();
