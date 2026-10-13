// Słówka "Your turn": speaking practice with the course dialogues.
// The learner plays one person in a dialogue: the other lines are played, and for their own lines
// they see only the meaning, say the Polish out loud, then check (speech recognition when the
// browser has it) and hear the model. "Repeat after me" (shadowing) plays every line for repeating.
// Works with every lesson dialogue and every listening task.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const K = (S.Speaking = {});

  // All dialogues: { id, title, titleNe, level, lines: [[who, pl, en, ne]] }
  K.list = () => [
    ...S.COURSE.filter((u) => (u.dialogue || []).length >= 2).map((u) => ({ id: u.id, title: u.title, titleNe: u.titleNe, level: u.level, lines: u.dialogue, kind: 'lesson' })),
    ...S.Listening.TASKS.filter((t) => (t.lines || []).length >= 2).map((t) => ({ id: t.id, title: t.title, titleNe: t.titleNe, level: t.level, lines: t.lines, kind: 'listening' })),
  ];
  K.get = (id) => K.list().find((d) => d.id === id) || null;
  const speakers = (d) => [...new Set(d.lines.map((l) => l[0]))];
  const store = () => (S.progress.speaking = S.progress.speaking || {});

  let cur = null; // { d, me, i, shown: {i: true}, results: {i: {heard, score}}, busy, error }

  function start(d, me) {
    cur = { d, me, i: 0, shown: {}, results: {}, busy: '', error: '' };
    playPartner();
  }
  const mine = (i) => cur.me === '*' || cur.d.lines[i][0] === cur.me;
  // Partner lines (and every line in "repeat after me") are played as they come.
  function playPartner() {
    const l = cur.d.lines[cur.i];
    if (l && (!mine(cur.i) || cur.me === '*')) setTimeout(() => { if (cur && cur.d.lines[cur.i] === l && S.route.name === 'turn' && S.route.arg === cur.d.id) S.speak(l[1]); }, 250);
  }

  // ---------- list ----------

  K.render = (view, id) => {
    draw(view, id);
    // Keep keyboard and screen-reader users in place: focus the main button of the page.
    const f = view.querySelector('[data-autofocus]');
    if (f && (document.activeElement === document.body || !document.contains(document.activeElement) || !view.contains(document.activeElement))) f.focus({ preventScroll: true });
  };
  function draw(view, id) {
    if (!id) return listPage(view);
    const d = K.get(id);
    if (!d) { S.go('turn'); return; }
    if (!cur || cur.d.id !== d.id || cur.me == null) { if (cur && cur.d.id !== d.id) cur = null; return rolePage(view, d); }
    if (cur.i >= d.lines.length) return summaryPage(view);
    return linePage(view);
  }

  function listPage(view) {
    const done = store();
    const byLevel = {};
    K.list().forEach((d) => { (byLevel[d.level] = byLevel[d.level] || []).push(d); });
    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">Speaking · बोलाइ</span>
        <h2>Your turn: speak the dialogues</h2>
        <p class="hint">Play one person in a real dialogue. You see what to say in English and Nepali; you say it in Polish, then check and hear the right way. Or repeat every line after the speaker.<br>
        <span lang="ne">संवादमा एक जना पात्र बन्नुहोस्। के भन्ने भनेर अङ्ग्रेजी र नेपालीमा देखिन्छ; तपाईं पोलिशमा भन्नुहोस्, अनि जाँच्नुहोस् र सही उच्चारण सुन्नुहोस्।</span></p>
      </header>
      ${S.LEVELS.filter((l) => byLevel[l.id]).map((l) => `
        <h3 class="section-h">${esc(l.name)} <span class="ne-sub" lang="ne">${esc(l.ne)}</span></h3>
        <ul class="unit-list">${byLevel[l.id].map((d) => `
          <li><button class="unit-row ${done[d.id] != null ? 'done' : ''}" data-action="go" data-to="turn.${d.id}">
            <span class="u-title">${esc(d.title)}<small lang="ne">${esc(d.titleNe || '')} · ${d.kind === 'lesson' ? 'lesson dialogue · पाठ' : 'listening · सुनाइ'} · ${d.lines.length} lines</small></span>
            ${done[d.id] != null ? `<small class="ok">${typeof done[d.id] === 'number' ? `${done[d.id]}%` : '✓'}</small>` : ''}
          </button></li>`).join('')}</ul>`).join('')}`;
  }

  function rolePage(view, d) {
    const who = speakers(d);
    view.innerHTML = `
      ${S.backLink('turn', 'Speaking · बोलाइ')}
      <header class="unit-head">
        <span class="eyebrow">${esc(d.level)} · Your turn · तपाईंको पालो</span>
        <h2>${esc(d.title)}</h2>
        ${d.titleNe ? `<p class="unit-head-ne" lang="ne">${esc(d.titleNe)}</p>` : ''}
      </header>
      <section class="card compact">
        <span class="label">Who do you want to be? · तपाईं को बन्ने?</span>
        <div class="options single">${who.map((w) => `
          <button class="option" data-action="turn-role" data-who="${esc(w)}"><span class="opt-col"><b>${esc(w)}</b><span class="hint">You say ${d.lines.filter((l) => l[0] === w).length} lines · ${d.lines.filter((l) => l[0] === w).length} वटा वाक्य</span></span></button>`).join('')}
          <button class="option" data-action="turn-role" data-who="*"><span class="opt-col"><b>Repeat after me · पछि-पछि दोहोर्‍याउनुहोस्</b><span class="hint">Hear every line, then say it yourself (shadowing) · हरेक वाक्य सुनेर आफैं भन्नुहोस्</span></span></button>
        </div>
      </section>
      <p class="hint">Tip: say each line out loud, even quietly. Speaking, not reading, is what makes words come out when you need them. · ठूलो स्वरमा भन्नुहोस्।</p>`;
  }

  function bubble(i, text) {
    const [who, pl, en, ne] = cur.d.lines[i];
    const right = mine(i) && cur.me !== '*';
    const r = cur.results[i];
    return `
      <div class="line ${right ? 'right' : ''}">
        <span class="who">${esc(who)}${right ? ' · you' : ''}</span>
        <div class="bubble">
          <div class="bubble-pl"><span lang="pl">${text || polish(pl)}</span>${S.listenBtn(pl)}</div>
          ${S.shows('meaning', 'en') ? `<div class="m-en">${esc(en)}</div>` : ''}
          ${S.shows('meaning', 'ne') ? `<div class="m-ne" lang="ne">${esc(ne)}</div>` : ''}
          ${r && r.score != null ? `<div class="turn-score ${r.score >= 0.85 ? 'ok' : r.score >= 0.6 ? 'close' : 'bad'}">${Math.round(r.score * 100)}%</div>` : ''}
        </div>
      </div>`;
  }

  function linePage(view) {
    const { d, i } = cur;
    const [, pl, en, ne] = d.lines[i];
    const me = mine(i);
    const shadow = cur.me === '*';
    const shown = cur.shown[i] || !me || shadow;
    const r = cur.results[i];
    const history = d.lines.slice(Math.max(0, i - 3), i).map((_, k) => bubble(Math.max(0, i - 3) + k)).join('');
    let task;
    if (!me) {
      task = `
        <div class="dialogue">${bubble(i)}</div>
        <div class="row"><button class="btn primary" data-action="turn-next" data-autofocus><kbd>Enter</kbd> Next · अर्को</button></div>`;
    } else {
      const mic = S.canRecognize
        ? (cur.busy
          ? `<button class="btn mic live" data-action="turn-stop" data-autofocus>■ Stop listening · रोक्नुहोस्</button>`
          : `<button class="btn ${shown ? '' : 'primary'} mic" data-action="turn-say" ${!shown && !r ? 'data-autofocus' : ''}>${S.MIC} ${r ? 'Say it again · फेरि भन्नुहोस्' : 'Say it · बोल्नुहोस्'}</button>`)
        : '';
      task = `
        <div class="card turn-card">
          <span class="label">${shadow ? 'Listen, then say it yourself · सुनेर आफैं भन्नुहोस्' : 'Your turn: say this in Polish · तपाईंको पालो: पोलिशमा भन्नुहोस्'}</span>
          ${shadow ? '' : `${S.shows('meaning', 'en') ? `<p class="turn-meaning">${esc(en)}</p>` : ''}${S.shows('meaning', 'ne') ? `<p class="turn-meaning" lang="ne">${esc(ne)}</p>` : ''}`}
          ${shown ? `<div class="turn-answer"><span class="word sm" lang="pl">${polish(pl)}</span>${S.pronHTML({ ...S.Pron.of(pl), ...(S.LEXICON.get(pl) || {}) })}${S.listenBtn(pl, true)}</div>` : ''}
          ${r ? `<div class="feedback ${r.score >= 0.85 ? 'right' : r.score >= 0.6 ? 'close' : 'wrong'}" role="status"><div class="fb-text">
              <strong>${r.score >= 0.85 ? 'Dobrze! Well said · राम्रो भन्नुभयो' : r.score >= 0.6 ? 'Almost · लगभग' : 'Not yet: listen and try again · फेरि सुनेर प्रयास गर्नुहोस्'}</strong>
              <span class="heard">Heard · सुनियो: <b lang="pl">${esc(r.heard || '—')}</b> · ${Math.round(r.score * 100)}%</span></div></div>` : ''}
          ${cur.error ? `<p class="hint err">${esc(cur.error)}</p>` : ''}
          <div class="row">
            ${mic}
            ${shown ? '' : `<button class="btn" data-action="turn-show" ${S.canRecognize ? '' : 'data-autofocus'}>Show &amp; hear the answer · उत्तर हेर्नुहोस्</button>`}
            ${shown || r ? `<button class="btn primary" data-action="turn-next" ${S.canRecognize && !r && !shadow ? '' : 'data-autofocus'}><kbd>Enter</kbd> Next · अर्को</button>` : ''}
          </div>
          ${!S.canRecognize ? '<p class="hint small">Say it out loud, then tap "Show & hear the answer" and compare. · ठूलो स्वरमा भनेर उत्तरसँग तुलना गर्नुहोस्।</p>' : ''}
        </div>`;
    }
    view.innerHTML = `
      <button class="back" data-action="turn-roles">← Change role · भूमिका बदल्नुहोस्</button>
      <header class="unit-head"><span class="eyebrow">${esc(d.level)} · ${shadow ? 'Repeat after me' : `You are ${esc(cur.me)}`}</span><h2>${esc(d.title)}</h2></header>
      <div class="meta"><span>Line ${i + 1} of ${d.lines.length}</span>${S.bar(i, d.lines.length)}</div>
      ${history ? `<div class="dialogue faded">${history}</div>` : ''}
      ${task}`;
  }

  function summaryPage(view) {
    const { d } = cur;
    const mineIdx = d.lines.map((_, i) => i).filter(mine);
    const scored = mineIdx.filter((i) => cur.results[i]);
    const avg = scored.length ? Math.round((scored.reduce((a, i) => a + cur.results[i].score, 0) / scored.length) * 100) : null;
    const weak = mineIdx.filter((i) => !cur.results[i] || cur.results[i].score < 0.85);
    view.innerHTML = `
      ${S.backLink('turn', 'Speaking · बोलाइ')}
      <div class="card summary">
        <span class="label">Dialogue finished · संवाद सकियो</span>
        <h2>${avg == null ? 'Dobra robota!' : avg >= 85 ? 'Świetnie! Great speaking' : avg >= 60 ? 'Dobrze! Good, keep going' : 'Keep practising · अभ्यास जारी राख्नुहोस्'}</h2>
        <p class="hint">${avg == null ? `You said ${mineIdx.length} lines out loud. · तपाईंले ${mineIdx.length} वाक्य बोल्नुभयो।` : `Your lines were understood ${avg}% on average. · औसत ${avg}%।`}</p>
        <div class="row">
          <button class="btn primary" data-action="turn-again" data-autofocus>↺ Again · फेरि</button>
          ${speakers(d).length > 1 && cur.me !== '*' ? '<button class="btn" data-action="turn-swap">⇄ Swap roles · भूमिका साट्नुहोस्</button>' : ''}
        </div>
      </div>
      ${weak.length && avg != null ? `<h3 class="section-h">Practise these again <span class="ne-sub" lang="ne">यी फेरि अभ्यास गर्नुहोस्</span></h3>
        <div class="dialogue">${weak.map((i) => bubble(i)).join('')}</div>` : ''}`;
  }

  async function sayLine() {
    const c = cur;
    const pl = c.d.lines[c.i][1].replace(/…/g, '');
    const i = c.i;
    S.stopSpeaking(); // never let the microphone hear the app's own voice
    c.busy = 'listening';
    c.error = '';
    S.render();
    try {
      const alts = await S.recognize();
      let best = { heard: alts[0] || '', score: 0 };
      for (const a of alts) { const sc = S.similarity(a, pl); if (sc > best.score) best = { heard: a, score: sc }; }
      // Left the page, or moved on, while listening: forget this result.
      if (cur !== c || c.i !== i || S.route.name !== 'turn' || S.route.arg !== c.d.id) return;
      c.results[c.i] = best;
      c.shown[c.i] = true;
      // Single words feed the weak-sound report; whole sentences would skew it.
      if (pl.split(/\s+/).length <= 2) S.recordSpeech(pl, best.score);
      S.logActivity();
      S.saveProgress();
      if (best.score < 0.85) S.speak(pl);
    } catch (err) {
      if (cur !== c || S.route.name !== 'turn') return;
      if (!c.stopped) c.error = S.micErrorText(err);
    }
    c.busy = '';
    c.stopped = false;
    if (S.route.name === 'turn' && S.route.arg === c.d.id) S.render();
  }

  function next() {
    if (!cur || cur.busy) return;
    // A line counts once: when it was checked (counted then) or when its answer was revealed.
    if (mine(cur.i) && !cur.results[cur.i] && cur.shown[cur.i]) { S.logActivity(); S.saveProgress(); }
    cur.i += 1;
    cur.error = '';
    if (cur.i >= cur.d.lines.length) {
      const mineIdx = cur.d.lines.map((_, i) => i).filter(mine);
      const scored = mineIdx.filter((i) => cur.results[i]);
      const st = store();
      // A score only when lines were checked by speech recognition; otherwise just "done".
      if (scored.length) {
        const pct = Math.round((scored.reduce((a, i) => a + cur.results[i].score, 0) / scored.length) * 100);
        st[cur.d.id] = Math.max(typeof st[cur.d.id] === 'number' ? st[cur.d.id] : 0, pct);
      } else if (st[cur.d.id] == null) st[cur.d.id] = true;
      S.saveProgress();
      if (S.onProgress) S.onProgress();
    }
    S.render();
    window.scrollTo(0, 0);
    playPartner();
  }

  K.action = (a, el) => {
    switch (a) {
      case 'turn-role': {
        const d = K.get(S.route.arg);
        if (d) start(d, el.dataset.who);
        S.render();
        return true;
      }
      case 'turn-roles': if (S.stopRecognition) S.stopRecognition(); if (cur) { cur.me = null; cur.busy = ''; } S.stopSpeaking(); S.render(); return true;
      case 'turn-stop': if (cur) cur.stopped = true; if (S.stopRecognition) S.stopRecognition(); return true;
      case 'turn-show': if (cur) { cur.shown[cur.i] = true; S.render(); S.speak(cur.d.lines[cur.i][1]); } return true;
      case 'turn-say': if (cur && !cur.busy) sayLine(); return true;
      case 'turn-next': next(); return true;
      case 'turn-again': if (cur) start(cur.d, cur.me); S.render(); return true;
      case 'turn-swap': if (cur) { const who = speakers(cur.d); start(cur.d, who[(who.indexOf(cur.me) + 1) % who.length]); } S.render(); return true;
      default: return false;
    }
  };

  K.key = (ev) => {
    if (!cur || S.route.name !== 'turn' || !S.route.arg || ev.key !== 'Enter') return false;
    // Enter on another button (Say it again, Listen…) does that button's job.
    if (ev.target.tagName === 'BUTTON' && ev.target.dataset.action !== 'turn-next') return false;
    if (document.querySelector('[data-action="turn-next"]')) { ev.preventDefault(); next(); return true; }
    if (document.querySelector('[data-action="turn-show"]')) { ev.preventDefault(); cur.shown[cur.i] = true; S.render(); S.speak(cur.d.lines[cur.i][1]); return true; }
    return false;
  };

  // Leaving the page or opening another dialogue forgets the current one.
  K.reset = () => { cur = null; };
})();
