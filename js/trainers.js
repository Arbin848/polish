// Słówka trainers: verb conjugation, noun cases, the sounds lab (minimal pairs with mouth
// diagrams) and the native-speaker review mode. All content is fixed data; nothing calls an AI.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const T = (S.Trainers = {});
  const W = window;

  T.VERBS = (W.SLOWKA_VERBS || []).slice().sort((a, b) => a.level.localeCompare(b.level) || a.inf.localeCompare(b.inf, 'pl'));
  T.NOUNS = (W.SLOWKA_NOUNS || []).slice().sort((a, b) => a.level.localeCompare(b.level) || a.word.localeCompare(b.word, 'pl'));
  T.CASES = W.SLOWKA_CASES || {};
  T.FRAMES = W.SLOWKA_CASE_FRAMES || [];
  T.SOUNDS = W.SLOWKA_SOUNDS || [];
  const CASE_KEYS = ['nom', 'gen', 'dat', 'acc', 'ins', 'loc', 'voc'];
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];

  const prog = (key) => (S.progress[key] = S.progress[key] || {});
  const head = (eyebrow, title, titleNe, text, back, backLabel) => `
    ${S.backLink(back, backLabel)}
    <header class="unit-head">
      <span class="eyebrow">${eyebrow}</span>
      <h2>${title}</h2>
      ${titleNe ? `<p class="unit-head-ne" lang="ne">${esc(titleNe)}</p>` : ''}
      ${text ? `<p class="hint">${text}</p>` : ''}
    </header>`;
  const sayBtn = (text) => (text && text !== '—' ? S.listenBtn(text) : '');
  const focusFirst = (view) => { const f = view.querySelector('[data-autofocus]'); if (f) f.focus({ preventScroll: true }); };
  const filterChips = (key, current, options) => `<div class="seg chips" role="group">${options.map(([v, label]) =>
    `<button data-action="t-filter" data-key="${key}" data-value="${v}" aria-pressed="${current === v}">${label}</button>`).join('')}</div>`;

  // =====================================================================
  // Verbs
  // =====================================================================

  const PERSONS = ['ja', 'ty', 'on / ona', 'my', 'wy', 'oni / one'];
  const PERSONS_NE = ['म', 'तँ / तिमी', 'ऊ', 'हामी', 'तिमीहरू', 'उनीहरू'];
  const TENSES = {
    present: { en: 'Present', ne: 'वर्तमान' },
    past: { en: 'Past', ne: 'भूत' },
    future: { en: 'Future', ne: 'भविष्य' },
    imperative: { en: 'Commands', ne: 'आज्ञा' },
  };
  const vstate = { level: 'all', q: '', tenses: { present: true, past: true, future: true, imperative: false } };
  let vsession = null;

  T.verbList = (view) => {
    if (!T.VERBS.length) { view.innerHTML = `${head('Verbs · क्रिया', 'Verb trainer', 'क्रियापद अभ्यास')}<p class="empty">The verb tables did not load.</p>`; return; }
    const q = S.fold(vstate.q);
    const list = T.VERBS.filter((v) => (vstate.level === 'all' || v.level === vstate.level)
      && (!q || S.fold(v.inf).includes(q) || v.en.toLowerCase().includes(vstate.q.toLowerCase()) || v.ne.includes(vstate.q)));
    const stats = prog('verbs');
    const listHTML = (items) => items.map((v) => {
        const st = stats[v.inf];
        const i = T.VERBS.indexOf(v);
        return `<li class="entry">
          <button class="entry-link" data-action="go" data-to="verbs.${i}">
            <span class="entry-pl"><span lang="pl">${polish(v.inf)}</span><small class="hint">${esc(v.group)}</small></span>
            ${S.transHTML(v.en, v.ne)}
            <span class="entry-side"><span class="badge">${v.aspect === 'pf' ? 'finished' : 'ongoing'}</span><small class="hint">${esc(v.level)}${st ? ` · ${st.r}/${st.r + st.w}` : ''}</small></span>
          </button></li>`;
      }).join('') || '<li class="empty"><p>No verbs match this filter.</p><button type="button" class="btn compact" data-action="vlevel" data-value="all">Show All Levels · सबै स्तर देखाउनुहोस्</button></li>';
    view.innerHTML = `
      ${head('Verbs · क्रिया', 'Verb trainer', 'क्रियापद अभ्यास',
        `${T.VERBS.length} verbs with every form: present, past (man and woman), future and commands. Open a verb to see its table, or practise many verbs at once.<br><span lang="ne">हरेक क्रियाका सबै रूप: वर्तमान, भूत (पुरुष र महिला), भविष्य र आज्ञा।</span>`)}
      <div class="row start"><button class="btn primary" data-action="go" data-to="verbs.practice">Practise verbs · अभ्यास गर्नुहोस्</button></div>
      ${filterChips('vlevel', vstate.level, [['all', 'All'], ...LEVELS.map((l) => [l, l])])}
      <input class="search" id="verb-q" type="search" placeholder="Search: mówić, to speak, बोल्नु…" aria-label="Search verbs" value="${esc(vstate.q)}">
      <ul class="entries verb-list">${listHTML(list)}</ul>`;
    // Typing only refreshes the list, so the search box keeps focus (and mobile keyboards keep working).
    const input = view.querySelector('#verb-q');
    input.addEventListener('input', (ev) => {
      if (ev.isComposing) return;
      vstate.q = input.value;
      const qq = S.fold(vstate.q);
      const items = T.VERBS.filter((v) => (vstate.level === 'all' || v.level === vstate.level)
        && (!qq || S.fold(v.inf).includes(qq) || v.en.toLowerCase().includes(vstate.q.toLowerCase()) || v.ne.includes(vstate.q)));
      view.querySelector('.verb-list').innerHTML = listHTML(items);
    });
  };

  const formCell = (f) => (f && f !== '—' ? `<button type="button" class="verb-cell-btn" data-action="say" data-text="${esc(f)}" title="Tap to hear ${esc(f)}"><span lang="pl">${polish(f)}</span> ${sayBtn(f)}</button>` : '<span class="hint">—</span>');

  T.verbTable = (v, mark) => {
    const hl = (tense, i, g) => (mark && mark.tense === tense && mark.i === i && (!g || mark.g === g) ? ' class="hl"' : '');
    const present = v.present ? `
      <div class="table-wrap"><table>
        <caption>Present · <span lang="ne">वर्तमान</span></caption>
        <tbody>${v.present.map((f, i) => `<tr${hl('present', i)}><th scope="row">${PERSONS[i]} <small lang="ne">${PERSONS_NE[i]}</small></th><td>${formCell(f)}</td></tr>`).join('')}</tbody>
      </table></div>`
      : `<p class="hint">${esc(v.inf)} is a "finished" (perfective) verb, so it has no present tense. Its future describes one finished action. · यो पूर्ण क्रिया हो, त्यसैले वर्तमान काल हुँदैन।</p>`;
    const pastPersons = ['ja', 'ty', 'on · ona', 'my', 'wy', 'oni · one'];
    return `
      ${present}
      <div class="table-wrap"><table>
        <caption>Past · <span lang="ne">भूत</span></caption>
        <thead><tr><th></th><th scope="col">man / men · पुरुष</th><th scope="col">woman / others · महिला / अरू</th></tr></thead>
        <tbody>${v.past.m.map((f, i) => `<tr><th scope="row">${pastPersons[i]}</th><td${hl('past', i, 'm')}>${formCell(f)}</td><td${hl('past', i, 'f')}>${formCell(v.past.f[i])}</td></tr>`).join('')}</tbody>
      </table></div>
      <div class="table-wrap"><table>
        <caption>Future · <span lang="ne">भविष्य</span></caption>
        <tbody>${v.future.map((f, i) => `<tr${hl('future', i)}><th scope="row">${PERSONS[i]} <small lang="ne">${PERSONS_NE[i]}</small></th><td>${formCell(f)}</td></tr>`).join('')}</tbody>
      </table></div>
      <div class="table-wrap"><table>
        <caption>Commands · <span lang="ne">आज्ञा</span></caption>
        <tbody>${[['ty', 'to one person · एक जनालाई'], ['my', "let's · हामी"], ['wy', 'to a group · धेरैलाई']].map(([k, label]) =>
          `<tr${hl('imperative', k)}><th scope="row">${k} <small>${label}</small></th><td>${formCell(v.imperative[k])}</td></tr>`).join('')}</tbody>
      </table></div>`;
  };

  T.verb = (view, idx) => {
    const v = T.VERBS[Number(idx)];
    if (!v) { S.go('verbs'); return; }
    const pairIdx = v.pair ? T.VERBS.findIndex((x) => x.inf === v.pair) : -1;
    view.innerHTML = `
      ${head(`${esc(v.level)} · ${v.aspect === 'pf' ? 'Finished action (perfective) · पूर्ण' : 'Ongoing action (imperfective) · अपूर्ण'}`,
        `<span lang="pl">${polish(v.inf)}</span> ${sayBtn(v.inf)}`, '', `${esc(v.en)} · <span lang="ne">${esc(v.ne)}</span><br>Pattern: ${esc(v.group)}`, 'verbs', 'All verbs · सबै क्रिया')}
      ${v.pair ? `<p class="hint">Aspect partner · जोडी: ${pairIdx >= 0 ? `<button class="link-btn" data-action="go" data-to="verbs.${pairIdx}" lang="pl">${polish(v.pair)}</button>` : `<b lang="pl">${polish(v.pair)}</b>`}</p>` : ''}
      ${v.note ? `<div class="scene">${S.whyHTML(v.note)}</div>` : ''}
      ${T.verbTable(v)}
      <div class="row start"><button class="btn primary" data-action="verb-practise" data-index="${idx}">Practise this verb · यो क्रिया अभ्यास</button></div>
      <p class="report-row">${S.reportHTML(v.inf, 'Verb table')}</p>`;
  };

  function verbPool() {
    if (vsession && vsession.only) return [vsession.only];
    return T.VERBS.filter((v) => vstate.level === 'all' || v.level === vstate.level);
  }
  function newVerbQuestion() {
    const pool = verbPool();
    const tenses = Object.keys(vstate.tenses).filter((k) => vstate.tenses[k]);
    if (!pool.length || !tenses.length) return null;
    const stats = prog('verbs');
    for (let tries = 0; tries < 50; tries++) {
      // Weaker verbs come up more often.
      const weights = pool.map((v) => { const s = stats[v.inf]; return s ? 1 + (s.w * 2) / (s.r + s.w + 1) : 1.5; });
      let r = Math.random() * weights.reduce((a, b) => a + b, 0);
      let v = pool[pool.length - 1];
      for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) { v = pool[i]; break; } }
      const tense = tenses[Math.floor(Math.random() * tenses.length)];
      if (tense === 'present' && !v.present) continue;
      if (tense === 'imperative') {
        const k = ['ty', 'my', 'wy'][Math.floor(Math.random() * 3)];
        if (!v.imperative[k] || v.imperative[k] === '—') continue;
        return { v, tense, i: k, answer: v.imperative[k], who: k };
      }
      const i = Math.floor(Math.random() * 6);
      if (tense === 'past') {
        const g = Math.random() < 0.5 ? 'm' : 'f';
        const who = g === 'm' ? ['ja (man)', 'ty (man)', 'on', 'my (men)', 'wy (men)', 'oni'][i] : ['ja (woman)', 'ty (woman)', 'ona', 'my (women)', 'wy (women)', 'one'][i];
        return { v, tense, i, g, answer: v.past[g][i], who };
      }
      const form = (tense === 'present' ? v.present : v.future)[i];
      const answers = [form];
      // Imperfective future: "będę + infinitive" or "będę + past form" are both correct.
      // (Not for być itself, whose future is just "będę": "będę był" is wrong.)
      if (tense === 'future' && v.aspect === 'impf' && /^będ\S* \S/.test(form)) {
        const aux = form.split(' ')[0];
        const sie = /\bsię\b/.test(v.inf) ? ' się' : '';
        const pastM = v.past.m[i < 3 ? 2 : 5].replace(/ się$/, '');
        const pastF = v.past.f[i < 3 ? 2 : 5].replace(/ się$/, '');
        answers.push(`${aux}${sie} ${pastM}`, `${aux}${sie} ${pastF}`, `${aux} ${pastM}${sie}`, `${aux} ${pastF}${sie}`);
        // "będę się uczyć" and "będę uczyć się" are both fine.
        if (sie) { const inf = v.inf.replace(/ się$/, ''); answers.push(`${aux} się ${inf}`, `${aux} ${inf} się`); }
      }
      return { v, tense, i, answer: form, answers, who: PERSONS[i] };
    }
    return null;
  }

  T.verbPractice = (view) => {
    if (!vsession) vsession = { score: 0, total: 0 };
    if (!vsession.q && !vsession.result) vsession.q = newVerbQuestion();
    const s = vsession;
    const q = s.q;
    const settings = `
      <details class="trans" ${q ? '' : 'open'}><summary>Choose what to practise · के अभ्यास गर्ने</summary>
        ${s.only ? `<p class="hint">Only <b lang="pl">${polish(s.only.inf)}</b>. <button class="link-btn" data-action="verb-all">Practise all verbs</button></p>` : filterChips('vlevel', vstate.level, [['all', 'All levels'], ...LEVELS.map((l) => [l, l])])}
        <div class="seg chips" role="group">${Object.entries(TENSES).map(([k, t]) => `<button data-action="t-tense" data-tense="${k}" aria-pressed="${!!vstate.tenses[k]}">${t.en} · <span lang="ne">${t.ne}</span></button>`).join('')}</div>
      </details>`;
    if (!q) {
      view.innerHTML = `${head('Verbs · क्रिया', 'Practise verbs', 'क्रिया अभ्यास', '', 'verbs', 'All verbs · सबै क्रिया')}${settings}<p class="empty">${Object.values(vstate.tenses).some(Boolean) ? 'This verb has no form for the chosen tense (for example, finished verbs have no present tense). Choose another tense. · यो कालमा यस क्रियाको रूप छैन।' : 'Choose at least one tense.'}</p>`;
      return;
    }
    const tense = TENSES[q.tense];
    let fb = '';
    if (s.result) {
      const title = { right: 'Dobrze! Correct · सही', close: 'Almost: check the accents · लगभग सही', wrong: 'Not quite · मिलेन' }[s.result];
      fb = `
        <div class="feedback ${s.result}" role="status">
          <div class="fb-text">
            <strong>${title}</strong>
            <span class="answer" lang="pl">${polish(q.answer)}</span>
            ${s.given && s.result !== 'right' ? `<span class="hint">You wrote · तपाईंले लेख्नुभयो: <b lang="pl">${esc(s.given)}</b></span>` : ''}
            ${q.v.note && s.result === 'wrong' ? S.whyHTML(q.v.note) : ''}
          </div>
          <div class="row">${sayBtn(q.answer)}<button class="btn primary" data-action="verb-next" data-autofocus><kbd>Enter</kbd> Next</button></div>
        </div>
        <details class="model"><summary>Full table of <span lang="pl">${polish(q.v.inf)}</span></summary>${T.verbTable(q.v, { tense: q.tense, i: q.i, g: q.g })}</details>`;
    }
    view.innerHTML = `
      ${head('Verbs · क्रिया', 'Practise verbs', 'क्रिया अभ्यास', '', 'verbs', 'All verbs · सबै क्रिया')}
      ${settings}
      <div class="meta"><span>Score ${s.score} / ${s.total}</span></div>
      <form class="card" data-form="verb" autocomplete="off">
        <span class="label">${tense.en} · <span lang="ne">${tense.ne}</span></span>
        <span class="word sm" lang="pl">${polish(q.v.inf)}</span>
        ${S.transHTML(q.v.en, q.v.ne)}
        <p class="drill-q"><span class="who-chip">${esc(q.who)}</span> <span class="blank">${s.result ? polish(q.answer) : '&nbsp;'}</span>${q.tense === 'imperative' ? ' !' : ''}</p>
        <input class="type-input" id="verb-answer" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="The verb form" value="${esc(s.given || '')}" ${s.result ? 'readonly' : 'data-autofocus'}>
        ${s.result ? '' : `${S.keysHTML()}<div class="row"><button type="button" class="btn" data-action="verb-hint">Pattern hint</button><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>`}
        ${s.hint && !s.result ? `<p class="hint">Pattern · ढाँचा: ${esc(q.v.group)}</p>` : ''}
      </form>
      ${fb}`;
    focusFirst(view);
  };

  function verbCheck(view) {
    const s = vsession;
    const input = view.querySelector('#verb-answer');
    if (!s || !s.q || s.result || !input || !input.value.trim()) return;
    s.given = input.value;
    const answers = [...(s.q.answers || [s.q.answer])];
    // "ja robię" is fine when the prompt is "ja ___": drop a leading pronoun; with it,
    // "ja się uczę" is fine too.
    const PRON = /^(ja|ty|on|ona|ono|my|wy|oni|one)\s+/i;
    let given = s.given.trim();
    if (PRON.test(given)) {
      given = given.replace(PRON, '');
      answers.slice().forEach((a) => { const m = a.match(/^(\S+) się$/); if (m) answers.push(`się ${m[1]}`); });
    }
    s.result = S.checkAnswer(given, answers);
    s.total += 1;
    const st = prog('verbs')[s.q.v.inf] || { r: 0, w: 0 };
    const ts = prog('tenseStats')[s.q.tense] || { r: 0, w: 0 };
    if (s.result === 'right') { s.score += 1; st.r += 1; ts.r += 1; } else { st.w += 1; ts.w += 1; }
    prog('tenseStats')[s.q.tense] = ts;
    prog('verbs')[s.q.v.inf] = st;
    S.logActivity();
    S.saveProgress();
    if (S.onProgress) S.onProgress();
    T.verbPractice(view);
    S.speak(s.q.answer);
  }

  // =====================================================================
  // Cases
  // =====================================================================

  const cstate = { gender: 'all', cases: { gen: true, dat: true, acc: true, ins: true, loc: true, voc: false }, plural: true };
  let csession = null;
  const GENDERS = { 'm-pers': 'man / male person', 'm-anim': 'masculine: animal', 'm-inan': 'masculine: thing', f: 'feminine', n: 'neuter' };
  const GENDERS_NE = { 'm-pers': 'पुरुष व्यक्ति', 'm-anim': 'पुलिङ्ग: जनावर', 'm-inan': 'पुलिङ्ग: वस्तु', f: 'स्त्रीलिङ्ग', n: 'नपुंसकलिङ्ग' };

  T.caseList = (view) => {
    const guide = CASE_KEYS.filter((k) => T.CASES[k]).map((k) => {
      const c = T.CASES[k];
      return `<details class="question case-card"><summary><b>${esc(c.name)}</b> · <span lang="pl">${polish(c.pl)}</span> · <span lang="ne">${esc(c.ne)}</span> <small class="hint" lang="pl">${esc(c.q)}</small></summary>${S.whyHTML(c.use)}</details>`;
    }).join('');
    const list = T.NOUNS.filter((n) => cstate.gender === 'all' || n.gender === cstate.gender);
    const stats = prog('cases');
    view.innerHTML = `
      ${head('Cases · विभक्ति', 'Case trainer', 'विभक्ति अभ्यास',
        'Polish nouns change their ending depending on their job in the sentence, like Nepali adds -लाई, -को, -मा, -ले. Learn the 7 cases, see full tables for common nouns, and practise in real sentences.<br><span lang="ne">पोलिश नामको अन्त्य वाक्यमा भूमिका अनुसार बदलिन्छ, जसरी नेपालीमा -लाई, -को, -मा, -ले थपिन्छ।</span>')}
      <div class="row start"><button class="btn primary" data-action="go" data-to="cases.practice">Practise cases · अभ्यास गर्नुहोस्</button></div>
      <h3 class="section-h">The 7 cases <span class="ne-sub" lang="ne">७ विभक्ति</span></h3>
      ${guide || '<p class="empty">The case guide did not load.</p>'}
      <h3 class="section-h">Nouns <span class="ne-sub" lang="ne">नामहरू</span> <small>${T.NOUNS.length}</small></h3>
      ${filterChips('cgender', cstate.gender, [['all', 'All'], ...Object.entries(GENDERS).map(([k, v]) => [k, v])])}
      <ul class="entries">${list.map((n) => {
        const i = T.NOUNS.indexOf(n);
        const st = stats[n.word];
        return `<li class="entry"><button class="entry-link" data-action="go" data-to="cases.${i}">
          <span class="entry-pl"><span lang="pl">${polish(n.word)}</span><small class="hint">${esc(GENDERS[n.gender])}</small></span>
          ${S.transHTML(n.en, n.ne)}
          <span class="entry-side"><small class="hint">${esc(n.level)}${st ? ` · ${st.r}/${st.r + st.w}` : ''}</small></span>
        </button></li>`;
      }).join('')}</ul>`;
  };

  T.nounTable = (n, mark) => `
    <div class="table-wrap"><table>
      <caption>${esc(GENDERS[n.gender])} · <span lang="ne">${esc(GENDERS_NE[n.gender])}</span></caption>
      <thead><tr><th scope="col">Case</th><th scope="col">Singular · एकवचन</th>${n.pl ? '<th scope="col">Plural · बहुवचन</th>' : ''}</tr></thead>
      <tbody>${CASE_KEYS.map((k) => {
        const c = T.CASES[k] || { name: k, q: '' };
        const cell = (num) => `<td${mark && mark.case === k && mark.number === num ? ' class="hl"' : ''}>${formCell(n[num][k])}</td>`;
        return `<tr><th scope="row">${esc(c.name)}<br><small lang="pl">${esc(c.q)}</small></th>${cell('sg')}${n.pl ? cell('pl') : ''}</tr>`;
      }).join('')}</tbody>
    </table></div>`;

  T.noun = (view, idx) => {
    const n = T.NOUNS[Number(idx)];
    if (!n) { S.go('cases'); return; }
    view.innerHTML = `
      ${head(`${esc(n.level)} · Noun · नाम`, `<span lang="pl">${polish(n.word)}</span> ${sayBtn(n.word)}`, '', `${esc(n.en)} · <span lang="ne">${esc(n.ne)}</span>`, 'cases', 'Case trainer · विभक्ति')}
      ${T.nounTable(n)}
      <div class="row start"><button class="btn primary" data-action="noun-practise" data-index="${idx}">Practise this noun</button></div>
      <p class="report-row">${S.reportHTML(n.word, 'Noun table')}</p>`;
  };

  function newCaseQuestion() {
    const only = csession && csession.only;
    const nouns = only ? [only] : T.NOUNS.filter((n) => cstate.gender === 'all' || n.gender === cstate.gender);
    const frames = T.FRAMES.filter((f) => cstate.cases[f.case] && (cstate.plural || f.number === 'sg'));
    if (!nouns.length || !frames.length) return null;
    for (let tries = 0; tries < 80; tries++) {
      const n = nouns[Math.floor(Math.random() * nouns.length)];
      const f = frames[Math.floor(Math.random() * frames.length)];
      if (f.number === 'pl' && !n.pl) continue;
      if (f.who === 'person' && !n.person) continue;
      if (f.who === 'thing' && n.person) continue;
      // Time words and names like "rok" or "Polska" only fit "talking/thinking about" sentences.
      if (n.abstract && f.case !== 'loc') continue;
      const answer = n[f.number][f.case];
      if (!answer || answer === '—') continue;
      return { n, f, answer };
    }
    return null;
  }

  T.casePractice = (view) => {
    if (!csession) csession = { score: 0, total: 0 };
    if (!csession.q && !csession.result) csession.q = newCaseQuestion();
    const s = csession;
    const q = s.q;
    const settings = `
      <details class="trans" ${q ? '' : 'open'}><summary>Choose what to practise · के अभ्यास गर्ने</summary>
        ${s.only ? `<p class="hint">Only <b lang="pl">${polish(s.only.word)}</b>. <button class="link-btn" data-action="case-all">Practise all nouns</button></p>`
          : filterChips('cgender', cstate.gender, [['all', 'All nouns'], ...Object.entries(GENDERS).map(([k, v]) => [k, v])])}
        <div class="seg chips" role="group">${CASE_KEYS.slice(1).map((k) => `<button data-action="t-case" data-case="${k}" aria-pressed="${!!cstate.cases[k]}">${esc((T.CASES[k] || { name: k }).name)}</button>`).join('')}</div>
        <div class="seg chips" role="group"><button data-action="t-plural" aria-pressed="${cstate.plural}">Include plural · बहुवचन पनि</button></div>
      </details>`;
    if (!q) {
      view.innerHTML = `${head('Cases · विभक्ति', 'Practise cases', 'विभक्ति अभ्यास', '', 'cases', 'Case trainer · विभक्ति')}${settings}<p class="empty">No sentences match this choice. Choose more cases or nouns.</p>`;
      return;
    }
    const c = T.CASES[q.f.case] || { name: q.f.case, use: null };
    const base = q.f.number === 'pl' ? `${q.n.word}, plural` : q.n.word;
    let fb = '';
    if (s.result) {
      const title = { right: 'Dobrze! Correct · सही', close: 'Almost: check the accents · लगभग सही', wrong: 'Not quite · मिलेन' }[s.result];
      fb = `
        <div class="feedback ${s.result}" role="status">
          <div class="fb-text">
            <strong>${title}</strong>
            <span class="answer" lang="pl">${polish(q.f.q.replace('___', q.answer))}</span>
            ${s.trap ? `<div class="trap-hint-box"><p class="hint">⚠️ You wrote the <b>${esc(s.trap)}</b> form. This sentence needs the <b>${esc(c.name)}</b>${q.f.number === 'pl' ? ' plural' : ''}.<br><span lang="ne">तपाईंले अर्को विभक्तिको रूप लेख्नुभयो। यहाँ <b>${esc(c.ne || c.name)}</b> चाहिन्छ।</span></p></div>` : ''}
            <p class="hint"><b>${esc(c.name)}</b> · <span lang="pl">${esc(c.pl || '')}</span> · <span lang="ne">${esc(c.ne || '')}</span></p>
            ${s.result !== 'right' && c.use ? S.whyHTML(c.use) : ''}
          </div>
          <div class="row">${sayBtn(q.f.q.replace('___', q.answer))}<button class="btn primary" data-action="case-next" data-autofocus><kbd>Enter</kbd> Next</button></div>
        </div>
        <details class="model"><summary>Full table of <span lang="pl">${polish(q.n.word)}</span></summary>${T.nounTable(q.n, { case: q.f.case, number: q.f.number })}</details>`;
    }
    const plural = q.f.number === 'pl';
    const en = q.f.en.replace('…', plural ? `[${q.n.en}, plural]` : q.n.en);
    const ne = q.f.ne.replace('…', plural && !/[\s/]/.test(q.n.ne) ? `${q.n.ne}हरू` : q.n.ne);
    view.innerHTML = `
      ${head('Cases · विभक्ति', 'Practise cases', 'विभक्ति अभ्यास', '', 'cases', 'Case trainer · विभक्ति')}
      ${settings}
      <div class="meta"><span>Score ${s.score} / ${s.total}</span><span>${esc(c.name)}${q.f.number === 'pl' ? ' · plural' : ''}</span></div>
      <form class="card" data-form="case" autocomplete="off">
        <span class="label">Put the word in the right form · सही रूपमा लेख्नुहोस्</span>
        <p class="drill-q" lang="pl">${polish(q.f.q).replace('___', `<span class="blank">${s.result ? polish(q.answer) : '&nbsp;'}</span>`)} <span class="hint">(${esc(base)})</span></p>
        ${S.transHTML(en, ne)}
        <input class="type-input" id="case-answer" data-keys-target lang="pl" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="The noun form" value="${esc(s.given || '')}" ${s.result ? 'readonly' : 'data-autofocus'}>
        ${s.result ? '' : `${S.keysHTML()}<div class="row"><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>`}
      </form>
      ${fb}`;
    focusFirst(view);
  };

  function caseCheck(view) {
    const s = csession;
    const input = view.querySelector('#case-answer');
    if (!s || !s.q || s.result || !input || !input.value.trim()) return;
    s.given = input.value;
    s.result = S.checkAnswer(s.given, [s.q.answer]);
    s.trap = null;
    // "mama" for "mamą" is not an accent slip but the wrong case: say which case it was.
    if (s.result !== 'right') {
      // Name the case the learner actually used, when it is another form of the same noun.
      for (const num of ['sg', 'pl']) {
        if (!s.q.n[num]) continue;
        for (const k of CASE_KEYS) {
          if (S.clean(s.q.n[num][k]) === S.clean(s.given)) { s.trap = `${(T.CASES[k] || { name: k }).name}${num === 'pl' ? ' plural' : ''}`; s.result = 'wrong'; break; }
        }
        if (s.trap) break;
      }
    }
    s.total += 1;
    const st = prog('cases')[s.q.n.word] || { r: 0, w: 0 };
    const key = `${s.q.f.case}-${s.q.f.number}`;
    const cs = prog('caseStats')[key] || { r: 0, w: 0 };
    if (s.result === 'right') { s.score += 1; st.r += 1; cs.r += 1; } else { st.w += 1; cs.w += 1; }
    prog('caseStats')[key] = cs;
    prog('cases')[s.q.n.word] = st;
    S.logActivity();
    S.saveProgress();
    if (S.onProgress) S.onProgress();
    T.casePractice(view);
    S.speak(s.q.f.q.replace('___', s.q.answer));
  }

  // =====================================================================
  // Sounds lab
  // =====================================================================

  // Side view of the mouth: lips on the left, throat on the right. Each preset draws the tongue
  // where it should be, plus a marker at the place of contact.
  const TONGUES = {
    retro: { d: 'M30 70 Q40 66 46 56 Q48 44 56 46 Q66 52 80 58 Q96 62 104 74', dot: [54, 40], label: { en: 'tongue tip up and back', ne: 'जिब्रोको टुप्पो माथि र पछाडि' } },
    palatal: { d: 'M30 72 Q38 70 42 66 Q56 42 76 44 Q94 50 104 74', dot: [66, 38], label: { en: 'middle of tongue up, tip down', ne: 'जिब्रोको बीच भाग माथि, टुप्पो तल' } },
    dental: { d: 'M28 60 Q34 54 40 56 Q54 60 70 60 Q92 62 104 74', dot: [33, 51], label: { en: 'tip behind the upper teeth', ne: 'टुप्पो माथिल्लो दाँतको पछाडि' } },
    back: { d: 'M30 72 Q48 72 62 62 Q78 42 92 46 Q102 54 104 74', dot: [88, 40], label: { en: 'back of tongue up', ne: 'जिब्रोको पछाडिको भाग माथि' } },
    nasal: { d: 'M30 72 Q50 70 66 66 Q88 62 104 74', dot: null, nose: true, label: { en: 'air also through the nose', ne: 'हावा नाकबाट पनि' } },
    'front-vowel': { d: 'M30 70 Q40 58 56 52 Q74 50 90 58 Q100 64 104 74', dot: null, label: { en: 'tongue high and forward', ne: 'जिब्रो माथि र अगाडि' } },
    'mid-vowel': { d: 'M30 72 Q44 64 60 58 Q78 56 92 60 Q100 66 104 74', dot: null, label: { en: 'tongue a little lower and back', ne: 'जिब्रो अलि तल र पछाडि' } },
    round: { d: 'M30 74 Q50 72 66 64 Q82 56 94 60 Q102 66 104 74', dot: null, round: true, label: { en: 'lips rounded forward', ne: 'ओठ गोलो पारेर अगाडि' } },
  };

  T.mouthSVG = (preset, caption) => {
    const t = TONGUES[preset] || TONGUES.dental;
    return `
      <figure class="mouth">
        <svg viewBox="0 0 120 100" role="img" aria-label="${esc(t.label.en)}">
          <path class="m-head" d="M18 18 Q60 4 104 20 L112 96" />
          <path class="m-palate" d="M28 44 Q34 34 50 32 Q70 30 88 36 Q100 42 106 54" />
          <path class="m-nose" d="M18 18 Q10 26 16 34 L26 36" />
          ${t.nose ? '<path class="m-air" d="M30 30 Q20 24 8 24" /><path class="m-air" d="M30 34 Q18 34 6 36" />' : ''}
          <rect class="m-teeth" x="29" y="44" width="5" height="8" rx="1" />
          <rect class="m-teeth" x="29" y="70" width="5" height="7" rx="1" />
          <path class="m-lip" d="${t.round ? 'M28 42 Q14 44 16 56' : 'M28 42 Q20 44 22 54'}" />
          <path class="m-lip" d="${t.round ? 'M28 82 Q14 80 16 66' : 'M28 82 Q20 80 22 70'}" />
          <path class="m-jaw" d="M28 82 Q50 92 104 84" />
          <path class="m-tongue" d="${t.d} L104 84 Q60 86 30 80 Z" />
          ${t.dot ? `<circle class="m-dot" cx="${t.dot[0]}" cy="${t.dot[1]}" r="3.5" />` : ''}
        </svg>
        <figcaption>${caption ? `<b lang="pl">${polish(caption)}</b> · ` : ''}${esc(t.label.en)}<br><span lang="ne">${esc(t.label.ne)}</span></figcaption>
      </figure>`;
  };

  let game = null;

  T.soundList = (view) => {
    const stats = prog('sounds');
    view.innerHTML = `
      ${head('Sounds lab · ध्वनि', 'Hear the difference', 'फरक सुन्नुहोस्',
        'Polish has sounds that Nepali does not, such as sz and ś, or y and i. Learn how to make each one with your mouth, then train your ear with word pairs.<br><span lang="ne">पोलिशमा नेपालीमा नभएका आवाज छन्। मुख कसरी चलाउने सिक्नुहोस्, अनि शब्द-जोडीले कान तालिम दिनुहोस्।</span>')}
      ${T.SOUNDS.length ? `<ol class="units">${T.SOUNDS.map((x) => `
        <li><button class="unit-row ${stats[x.id] >= 80 ? 'done' : ''}" data-action="go" data-to="sounds.${x.id}">
          <span class="unit-num" lang="pl">${polish(x.a.label)}·${polish(x.b.label)}</span>
          <span class="unit-text"><span class="unit-title">${esc(x.title)}</span><span class="unit-ne" lang="ne">${esc(x.titleNe)}</span></span>
          <span class="unit-progress">${stats[x.id] != null ? `<small class="ok">best ${stats[x.id]}%</small>` : ''}</span>
        </button></li>`).join('')}</ol>` : '<p class="empty">The sounds did not load.</p>'}`;
  };

  T.sound = (view, id) => {
    const x = T.SOUNDS.find((s) => s.id === id);
    if (!x) { S.go('sounds'); return; }
    if (!game || game.x !== x) game = { x, round: 0, score: 0, q: null, answered: null, total: 10 };
    const g = game;
    if (!g.q && g.round < g.total) {
      const pair = x.pairs[Math.floor(Math.random() * x.pairs.length)];
      g.q = { pair, side: Math.random() < 0.5 ? 0 : 1 };
      const first = g.q.pair[g.q.side][0];
      setTimeout(() => { if (game === g) S.speak(first); }, 200);
    }
    let gameHTML;
    if (g.round >= g.total) {
      const pct = Math.round((g.score / g.total) * 100);
      if (prog('sounds')[x.id] == null || pct > prog('sounds')[x.id]) { prog('sounds')[x.id] = pct; S.saveProgress(); }
      gameHTML = `
        <div class="card summary"><span class="label">Result · नतिजा</span><h2>${g.score} / ${g.total}</h2>
          <p class="hint">${pct >= 80 ? 'Your ear hears the difference! · तपाईंको कानले फरक छुट्याउँछ!' : 'Listen to the pairs above a few times, then try again. · माथिका जोडी केही पटक सुनेर फेरि प्रयास गर्नुहोस्।'}</p>
          <button class="btn primary" data-action="snd-restart" data-autofocus>Play again</button></div>`;
    } else {
      const [wa, wb] = g.q.pair;
      const a = g.answered;
      const opt = (w, side) => {
        let cls = 'option';
        if (a && side === g.q.side) cls += ' right';
        else if (a && a.pick === side) cls += ' wrong';
        return `<button class="${cls}" data-action="snd-pick" data-side="${side}" ${a ? 'disabled' : ''}><kbd>${side + 1}</kbd><span class="opt-col"><span class="opt-pl" lang="pl">${polish(w[0])}</span>${S.transHTML(w[1], w[2])}</span></button>`;
      };
      gameHTML = `
        <div class="meta"><span>Round ${g.round + 1} of ${g.total} · Score ${g.score}</span></div>
        <div class="card compact">
          <span class="label">Which word do you hear? · कुन शब्द सुन्नुभयो?</span>
          <button class="play" data-action="say" data-text="${esc(g.q.pair[g.q.side][0])}" aria-label="Play again">${S.SPEAKER}</button>
        </div>
        <div class="options">${opt(wa, 0)}${opt(wb, 1)}</div>
        ${a ? `<div class="feedback ${a.ok ? 'right' : 'wrong'}" role="status"><div class="fb-text"><strong>${a.ok ? 'Dobrze! · सही' : 'Not quite · मिलेन'}</strong>
          <span>It was <b lang="pl">${polish(g.q.pair[g.q.side][0])}</b>. Compare: ${sayBtn(wa[0])} <span lang="pl">${polish(wa[0])}</span> · ${sayBtn(wb[0])} <span lang="pl">${polish(wb[0])}</span></span></div>
          <div class="row"><button class="btn primary" data-action="snd-next" data-autofocus><kbd>Enter</kbd> Next</button></div></div>` : ''}`;
    }
    view.innerHTML = `
      ${head('Sounds lab · ध्वनि', esc(x.title), x.titleNe, '', 'sounds', 'All sounds · सबै ध्वनि')}
      <div class="mouths">${T.mouthSVG(x.a.mouth, x.a.label)}${T.mouthSVG(x.b.mouth, x.b.label)}</div>
      <div class="scene">${S.whyHTML(x.tip)}</div>
      <h3 class="section-h">Word pairs <span class="ne-sub" lang="ne">शब्द जोडी</span></h3>
      <div class="row start" style="margin-bottom: 10px;">
        <button type="button" class="btn snd-compare-btn" data-action="snd-compare-first" data-wa="${esc(x.pairs[0][0][0])}" data-wb="${esc(x.pairs[0][1][0])}">
          ⇄ Compare Sound Pair (दाँज्नुहोस्): <b lang="pl">${polish(x.pairs[0][0][0])}</b> vs <b lang="pl">${polish(x.pairs[0][1][0])}</b>
        </button>
      </div>
      <ul class="pairs">${x.pairs.map(([wa, wb]) => `
        <li><span>${sayBtn(wa[0])} <b lang="pl">${polish(wa[0])}</b> <small class="hint">${esc(wa[1])}</small></span>
            <span>${sayBtn(wb[0])} <b lang="pl">${polish(wb[0])}</b> <small class="hint">${esc(wb[1])}</small></span></li>`).join('')}</ul>
      <h3 class="section-h">Listening game <span class="ne-sub" lang="ne">सुनाइ खेल</span></h3>
      ${gameHTML}`;
    focusFirst(view);
  };

  // =====================================================================
  // Native-speaker review mode
  // =====================================================================

  const CHECK_KEY = 'slowka-check-v1';
  const check = (() => { try { return JSON.parse(localStorage.getItem(CHECK_KEY)) || {}; } catch (e) { return {}; } })();
  check.who = check.who || 'both';
  check.marks = check.marks || {};
  const saveCheck = () => { try { localStorage.setItem(CHECK_KEY, JSON.stringify(check)); } catch (e) { /* storage unavailable */ } };

  function checkItems(u) {
    const items = [];
    u.lesson.forEach((p, i) => items.push({ key: `lesson-${i}`, kind: 'Lesson', pl: '', en: p.en, ne: p.ne }));
    (u.words || []).forEach((e, i) => items.push({ key: `word-${i}`, kind: 'Word', pl: e[0], en: e[1], ne: e[2], pron: e[3], proNe: e[4] }));
    (u.phrases || []).forEach((e, i) => items.push({ key: `phrase-${i}`, kind: 'Sentence', pl: e[0], en: e[1], ne: e[2], pron: e[3], proNe: e[4] }));
    (u.dialogue || []).forEach((d, i) => items.push({ key: `dialogue-${i}`, kind: 'Dialogue', pl: d[1], en: d[2], ne: d[3] }));
    return items;
  }

  T.checkList = (view) => {
    view.innerHTML = `
      ${head('For reviewers · समीक्षकका लागि', 'Check the content', 'सामग्री जाँच्नुहोस्',
        'Are you a native Polish or Nepali speaker? Help improve this course: open a unit, mark each line as correct ✓ or wrong ✗ with a short note, then send the problems as a GitHub issue. Your marks are saved in this browser.<br><span lang="ne">तपाईं पोलिश वा नेपाली मातृभाषी हुनुहुन्छ? हरेक लाइनलाई ✓ वा ✗ चिन्ह लगाउनुहोस् र समस्याहरू पठाउनुहोस्।</span>')}
      <fieldset class="setting"><legend>I am checking · म जाँच्दैछु</legend>
        <div class="seg">${[['pl', 'Polish · पोलिश'], ['ne', 'Nepali · नेपाली'], ['both', 'Both · दुवै']].map(([v, l]) => `<button data-action="chk-who" data-value="${v}" aria-pressed="${check.who === v}">${l}</button>`).join('')}</div>
      </fieldset>
      ${S.LEVELS.map((l) => {
        const units = S.COURSE.filter((u) => u.level === l.id);
        if (!units.length) return '';
        return `<section class="level"><header class="level-head"><h2>${esc(l.name)}</h2></header><ol class="units">${units.map((u) => {
          const items = checkItems(u);
          const marks = check.marks[u.id] || {};
          const done = items.filter((it) => marks[it.key]).length;
          const bad = items.filter((it) => marks[it.key] && marks[it.key].ok === false).length;
          return `<li><button class="unit-row ${done === items.length ? 'done' : done ? 'started' : ''}" data-action="go" data-to="check.${u.id}">
            <span class="unit-num">${esc(u.id.split('-')[1])}</span>
            <span class="unit-text"><span class="unit-title">${esc(u.title)}</span><span class="unit-ne" lang="ne">${esc(u.titleNe)}</span></span>
            <span class="unit-progress">${bad ? `<small class="err">${bad} ✗</small>` : ''}${S.bar(done, items.length)}<small>${done}/${items.length}</small></span>
          </button></li>`;
        }).join('')}</ol></section>`;
      }).join('')}`;
  };

  function reportChunks(u) {
    const marks = check.marks[u.id] || {};
    const who = { pl: 'Polish', ne: 'Nepali', both: 'Polish and Nepali' }[check.who];
    const lines = checkItems(u).filter((it) => marks[it.key] && marks[it.key].ok === false).map((it) => {
      const what = it.pl || it.en.slice(0, 80);
      const note = (marks[it.key].note || '(no note)').replace(/\n/g, ' ');
      return `- [ ] **${it.kind}** \`${it.key}\`: ${what}${it.ne ? ` / ${it.ne.slice(0, 80)}` : ''}\n  - Reviewer note: ${note.length > 300 ? `${note.slice(0, 300)}…` : note}`;
    });
    // GitHub refuses very long links, so split by the length of the encoded URL (Devanagari grows ~9×).
    const LIMIT = 6000;
    const chunks = [];
    let cur = [];
    let len = 0;
    for (const l of lines) {
      const n = encodeURIComponent(`${l}\n`).length;
      if (len + n > LIMIT && cur.length) { chunks.push(cur); cur = []; len = 0; }
      cur.push(l);
      len += n;
    }
    if (cur.length) chunks.push(cur);
    return chunks.map((c, i) => ({
      title: `Content review: ${u.id} ${u.title}${chunks.length > 1 ? ` (${i + 1}/${chunks.length})` : ''}`,
      body: `Native-speaker review of unit **${u.id} · ${u.title}** (checking: ${who}).\n\n${c.join('\n')}\n`,
    }));
  }

  T.checkUnit = (view, id) => {
    const u = S.UNIT.get(id);
    if (!u) { S.go('check'); return; }
    const marks = (check.marks[u.id] = check.marks[u.id] || {});
    const items = checkItems(u);
    view.innerHTML = `
      ${head(`Reviewing · ${esc(u.level)}`, esc(u.title), u.titleNe, 'Mark each line. For anything wrong, write what it should be. · हरेक लाइन चिन्ह लगाउनुहोस्; गलत भएमा सही रूप लेख्नुहोस्।', 'check', 'All units · सबै पाठ')}
      <ol class="check-list">${items.map((it) => {
        const m = marks[it.key];
        return `<li class="check-item ${m && m.ok === true ? 'is-ok' : m && m.ok === false ? 'is-bad' : ''}">
          <span class="badge">${it.kind}</span>
          ${it.pl ? `<p class="q-pl" lang="pl"><b>${polish(it.pl)}</b> ${sayBtn(it.pl)}</p>` : ''}
          ${it.pron ? `<p class="prons"><span class="pron">${esc(it.pron)}</span><span class="pron ne" lang="ne">${esc(it.proNe)}</span></p>` : ''}
          <p>${it.kind === 'Lesson' ? S.markup(it.en) : esc(it.en)}</p>
          <p lang="ne">${it.kind === 'Lesson' ? S.markup(it.ne) : esc(it.ne)}</p>
          <div class="row start">
            <button class="btn good" data-action="chk-mark" data-key="${it.key}" data-ok="1" aria-pressed="${!!(m && m.ok)}">✓ Correct</button>
            <button class="btn again" data-action="chk-mark" data-key="${it.key}" data-ok="0" aria-pressed="${!!(m && m.ok === false)}">✗ Wrong</button>
          </div>
          ${m && m.ok === false ? `<textarea class="code" data-check-note="${it.key}" rows="2" placeholder="What is wrong, and what should it be?">${esc(m.note || '')}</textarea>` : ''}
        </li>`;
      }).join('')}</ol>
      <section class="card compact report-box">${reportBoxHTML(u)}</section>`;
  };

  function reportBoxHTML(u) {
    const chunks = reportChunks(u);
    return `
        <h3 class="section-h">Send your corrections · सुधार पठाउनुहोस्</h3>
        ${chunks.length ? `
          <p class="hint">${((n) => `${n} ${n === 1 ? 'problem' : 'problems'}`)(chunks.reduce((n, c) => n + c.body.split('\n- [ ]').length - 1, 0))} marked. Each button opens a pre-filled issue on GitHub (you need a free GitHub account).</p>
          <div class="row start">${chunks.map((c, i) => `<a class="btn primary" target="_blank" rel="noopener" href="https://github.com/${S.REPO}/issues/new?title=${encodeURIComponent(c.title)}&body=${encodeURIComponent(c.body)}">Open report${chunks.length > 1 ? ` ${i + 1}/${chunks.length}` : ''} on GitHub</a>`).join('')}</div>
          <p class="hint">No GitHub account? Copy the text and send it by message or email instead.</p>
          <textarea class="code" readonly rows="5" id="chk-text">${esc(chunks.map((c) => `${c.title}\n\n${c.body}`).join('\n\n'))}</textarea>
          <div class="row start"><button class="btn" data-action="chk-copy">Copy report</button></div>`
          : '<p class="hint">Nothing marked wrong yet. When you mark lines with ✗, the report appears here.</p>'}`;
  }

  // =====================================================================
  // Actions
  // =====================================================================

  T.action = (a, el, view) => {
    switch (a) {
      case 't-filter':
        if (el.dataset.key === 'vlevel') { vstate.level = el.dataset.value; if (vsession) { vsession.q = null; vsession.result = null; vsession.given = ''; vsession.hint = false; } }
        if (el.dataset.key === 'cgender') { cstate.gender = el.dataset.value; if (csession) { csession.q = null; csession.result = null; csession.given = ''; csession.trap = null; } }
        S.render();
        return true;
      case 't-tense': vstate.tenses[el.dataset.tense] = !vstate.tenses[el.dataset.tense]; if (vsession) { vsession.q = null; vsession.result = null; vsession.given = ''; } S.render(); return true;
      case 'verb-practise': vsession = { score: 0, total: 0, only: T.VERBS[Number(el.dataset.index)] }; S.go('verbs.practice', { keep: true }); return true;
      case 'verb-all': vsession = { score: vsession ? vsession.score : 0, total: vsession ? vsession.total : 0 }; S.render(); return true;
      case 'verb-hint': vsession.hint = true; vsession.given = view.querySelector('#verb-answer').value; S.render(); return true;
      case 'verb-next': vsession.q = null; vsession.result = null; vsession.given = ''; vsession.hint = false; S.render(); return true;
      case 't-case': cstate.cases[el.dataset.case] = !cstate.cases[el.dataset.case]; if (csession) { csession.q = null; csession.result = null; csession.given = ''; } S.render(); return true;
      case 't-plural': cstate.plural = !cstate.plural; if (csession) { csession.q = null; csession.result = null; csession.given = ''; } S.render(); return true;
      case 'noun-practise': csession = { score: 0, total: 0, only: T.NOUNS[Number(el.dataset.index)] }; S.go('cases.practice', { keep: true }); return true;
      case 'case-all': csession = { score: csession ? csession.score : 0, total: csession ? csession.total : 0 }; S.render(); return true;
      case 'case-next': csession.q = null; csession.result = null; csession.given = ''; csession.trap = null; S.render(); return true;
      case 'snd-pick': {
        const side = Number(el.dataset.side);
        const ok = side === game.q.side;
        game.answered = { pick: side, ok };
        if (ok) game.score += 1;
        S.logActivity();
        S.saveProgress();
        S.render();
        return true;
      }
      case 'snd-next': game.round += 1; game.q = null; game.answered = null; S.render(); return true;
      case 'snd-restart': game = null; S.render(); return true;
      case 'chk-who': check.who = el.dataset.value; saveCheck(); S.render(); return true;
      case 'chk-mark': {
        const id = S.route.arg;
        const marks = (check.marks[id] = check.marks[id] || {});
        const ok = el.dataset.ok === '1';
        const prev = marks[el.dataset.key];
        // Tapping the same mark again removes it, but a typed note is kept (as an unmarked note).
        if (prev && prev.ok === ok) { if (prev.note) marks[el.dataset.key] = { ok: null, note: prev.note }; else delete marks[el.dataset.key]; }
        else marks[el.dataset.key] = { ok, note: prev ? prev.note : '' };
        saveCheck();
        const y = window.scrollY;
        S.render();
        window.scrollTo(0, y);
        return true;
      }
      case 'chk-copy': {
        const t = view.querySelector('#chk-text');
        const fallback = () => { t.focus(); t.select(); el.textContent = 'Selected: copy it now'; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t.value).then(() => { el.textContent = 'Copied ✓'; }, fallback);
        else fallback();
        return true;
      }
      default: return false;
    }
  };

  T.submit = (form, view) => {
    if (form.dataset.form === 'verb') { verbCheck(view); return true; }
    if (form.dataset.form === 'case') { caseCheck(view); return true; }
    return false;
  };

  T.input = (el) => {
    if (el.dataset.checkNote) {
      const id = S.route.arg;
      const m = check.marks[id] && check.marks[id][el.dataset.checkNote];
      if (m) {
        m.note = el.value;
        saveCheck();
        const box = document.querySelector('.report-box');
        const u = S.UNIT.get(id);
        if (box && u) box.innerHTML = reportBoxHTML(u);
      }
      return true;
    }
    return false;
  };

  T.key = (ev) => {
    if (S.route.name === 'sounds' && game && game.q && !game.answered && /^[12]$/.test(ev.key)) {
      const btn = document.querySelector(`[data-action="snd-pick"][data-side="${Number(ev.key) - 1}"]`);
      if (btn) { btn.click(); return true; }
    }
    if (ev.key === 'Enter') {
      const next = document.querySelector('[data-action="verb-next"], [data-action="case-next"], [data-action="snd-next"]');
      if (next && ev.target.tagName !== 'BUTTON') { next.click(); return true; }
    }
    return false;
  };

  T.resetSessions = (keep) => { if (!keep) { vsession = null; csession = null; } };

  // Home-page counts.
  T.summary = () => ({ verbs: T.VERBS.length, nouns: T.NOUNS.length, sounds: T.SOUNDS.length });
})();
