// Słówka listening practice (audio first, text hidden until you answer) and badges.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const L = (S.Listening = {});
  L.TASKS = (window.SLOWKA_LISTENING || []).slice().sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  const TYPE = { phone: ['📞', 'Phone call', 'फोन'], voicemail: ['📨', 'Voicemail', 'भ्वाइस मेल'], announcement: ['📢', 'Announcement', 'घोषणा'], conversation: ['💬', 'Conversation', 'कुराकानी'], radio: ['📻', 'Radio', 'रेडियो'] };
  const store = () => (S.progress.listening = S.progress.listening || {});

  // ---------- listening ----------

  let cur = null;

  L.list = (view) => {
    const res = store();
    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head">
        <span class="eyebrow">Listening · सुनाइ</span>
        <h2>Real-life listening</h2>
        <p class="hint">Phone calls, voicemails, announcements and conversations at natural speed. Listen first and answer the questions; the text appears afterwards.<br><span lang="ne">फोन, घोषणा र कुराकानी सामान्य गतिमा। पहिले सुनेर प्रश्नको उत्तर दिनुहोस्; पाठ पछि देखिन्छ।</span></p>
      </header>
      ${L.TASKS.length ? ['A1', 'A2', 'B1', 'B2'].map((lv) => {
        const items = L.TASKS.filter((t) => t.level === lv);
        if (!items.length) return '';
        return `<section class="level"><header class="level-head"><h2>${lv}</h2></header><ol class="units">${items.map((t) => `
          <li><button class="unit-row ${res[t.id] != null ? 'done' : ''}" data-action="go" data-to="listen.${t.id}">
            <span class="unit-num">${TYPE[t.type][0]}</span>
            <span class="unit-text"><span class="unit-title">${esc(t.title)}</span><span class="unit-ne" lang="ne">${esc(t.titleNe)} · ${TYPE[t.type][2]}</span></span>
            <span class="unit-progress">${res[t.id] != null ? `<small class="ok">${res[t.id]}%</small>` : ''}</span>
          </button></li>`).join('')}</ol></section>`;
      }).join('') : '<p class="empty">The listening tasks did not load.</p>'}`;
  };

  function speakers(t) {
    const names = [...new Set(t.lines.map((l) => l[0]))];
    return (name) => [1, 0.8, 1.2, 0.9][names.indexOf(name) % 4];
  }
  function playAll(t, slow) {
    const pitch = speakers(t);
    S.speakLines(t.lines.map(([who, pl]) => ({ text: pl, pitch: pitch(who) })), slow);
    cur.plays += 1;
  }

  L.task = (view, id) => {
    const t = L.TASKS.find((x) => x.id === id);
    if (!t) { S.go('listen'); return; }
    if (!cur || cur.t !== t) cur = { t, answers: {}, plays: 0, show: false };
    const done = Object.keys(cur.answers).length === t.questions.length;
    const score = t.questions.filter((q, i) => cur.answers[i] === q.answer).length;
    const pitch = speakers(t);
    view.innerHTML = `
      ${S.backLink('listen', 'All listening · सबै सुनाइ')}
      <header class="unit-head">
        <span class="eyebrow">${esc(t.level)} · ${TYPE[t.type][1]} · <span lang="ne">${TYPE[t.type][2]}</span></span>
        <h2>${esc(t.title)}</h2>
        <p class="unit-head-ne" lang="ne">${esc(t.titleNe)}</p>
        <div class="scene">${S.whyHTML(t.context)}</div>
      </header>
      <div class="card compact listen-player">
        <button class="play" data-action="ls-play" aria-label="Play">${S.SPEAKER}</button>
        <div class="row">
          <button class="btn" data-action="ls-play" data-slow="1">🐢 Slow · बिस्तारै</button>
          <button class="btn" data-action="ls-stop">■ Stop</button>
          <button class="btn" data-action="ls-loop" style="background:${cur.loop ? 'var(--accent-soft)' : ''}; color:${cur.loop ? 'var(--accent)' : ''}; border-color:${cur.loop ? 'var(--accent)' : ''};">
            🔁 Continuous · लगातार
          </button>
        </div>
        <span class="hint">${cur.plays ? `Played ${cur.plays}×. Listen as many times as you need.` : 'Tap to play. Try to answer after listening once or twice. · एक-दुई पटक सुनेर उत्तर दिनुहोस्।'}</span>
      </div>
      <h3 class="section-h">Questions <span class="ne-sub" lang="ne">प्रश्नहरू</span>${done ? ` <small>${score} / ${t.questions.length}</small>` : ''}</h3>
      ${t.questions.map((q, i) => {
        const a = cur.answers[i];
        const ans = a !== undefined;
        return `<div class="question">
          <p class="q-pl" lang="pl"><b>${i + 1}.</b> ${polish(q.q)}</p>${S.transHTML(q.en, q.ne)}
          <div class="options single">${q.options.map((o, k) => {
            let cls = 'option';
            if (ans && k === q.answer) cls += ' right'; else if (ans && k === a) cls += ' wrong';
            return `<button class="${cls}" data-action="ls-answer" data-q="${i}" data-index="${k}" ${ans ? 'disabled' : ''}><span class="opt-pl" lang="pl">${polish(o)}</span></button>`;
          }).join('')}</div>
          ${ans ? S.whyHTML(q.why) : ''}
        </div>`;
      }).join('')}
      ${done || cur.show ? `
        <h3 class="section-h">Transcript <span class="ne-sub" lang="ne">लिखित रूप</span></h3>
        <div class="dialogue">${t.lines.map(([who, pl, en, ne], i) => `
          <div class="line ${t.lines.length > 1 && [...new Set(t.lines.map((l) => l[0]))].indexOf(who) % 2 ? 'right' : ''}">
            <span class="who">${esc(who)}</span>
            <div class="bubble">
              <div class="bubble-pl"><span lang="pl">${S.tokenize ? S.tokenize(pl) : polish(pl)}</span><button class="icon-btn" data-action="ls-line" data-i="${i}" aria-label="Play line">${S.SPEAKER}</button></div>
              ${S.shows('meaning', 'en') ? `<div class="m-en">${esc(en)}</div>` : ''}
              ${S.shows('meaning', 'ne') ? `<div class="m-ne" lang="ne">${esc(ne)}</div>` : ''}
            </div>
          </div>`).join('')}</div>`
        : '<div class="row start"><button class="link-btn" data-action="ls-show">I need help: show the text · पाठ देखाउनुहोस्</button></div>'}
      ${done ? `<div class="row start"><button class="btn" data-action="ls-restart">↺ Try again · फेरि प्रयास गर्नुहोस्</button>${t.lines.length >= 2 ? `<button class="btn turn-cta" data-action="go" data-to="turn.${t.id}">${S.MIC} Speak these lines yourself · आफैं बोल्नुहोस्</button>` : ''}</div>` : ''}
      <p class="report-row">${S.reportHTML(t.title, `Listening ${t.id}`)}</p>`;
    L._pitch = pitch;
  };

  L.action = (a, el) => {
    switch (a) {
      case 'ls-loop': {
        cur.loop = !cur.loop;
        if (cur.loop) playAll(cur.t, false);
        S.render();
        return true;
      }
      case 'ls-play': playAll(cur.t, el.dataset.slow === '1'); S.render(); return true;
      case 'ls-stop': S.stopSpeaking(); return true;
      case 'ls-show': cur.show = true; S.render(); return true;
      case 'ls-restart': S.stopSpeaking(); cur = { t: cur.t, answers: {}, plays: 0, show: false }; S.render(); window.scrollTo(0, 0); return true;
      case 'ls-line': { const l = cur.t.lines[Number(el.dataset.i)]; S.speakLines([{ text: l[1], pitch: L._pitch(l[0]) }]); return true; }
      case 'ls-answer': {
        cur.answers[Number(el.dataset.q)] = Number(el.dataset.index);
        const t = cur.t;
        if (Object.keys(cur.answers).length === t.questions.length) {
          const pct = Math.round((t.questions.filter((q, i) => cur.answers[i] === q.answer).length / t.questions.length) * 100);
          if (store()[t.id] == null || pct > store()[t.id]) store()[t.id] = pct;
          const log = (S.progress.skillLog = S.progress.skillLog || []);
          log.push({ d: S.dayKey(), k: 'listening', r: pct / 100 * t.questions.length, t: t.questions.length });
        }
        S.logActivity();
        S.saveProgress();
        S.render();
        return true;
      }
      default: return false;
    }
  };

  // ---------- badges ----------

  const count = (o) => Object.keys(o || {}).length;
  const BADGES = [
    ['first-lesson', '🌱', 'First lesson', 'पहिलो पाठ', 'Finish a lesson with your teacher', (P) => Object.values(P.guided || {}).filter((g) => g.done && !g.skipped).length >= 1],
    ['ten-lessons', '📗', '10 lessons', '१० पाठ', 'Finish 10 lessons', (P) => Object.values(P.guided || {}).filter((g) => g.done && !g.skipped).length >= 10],
    ['all-lessons', '🏆', 'Whole course', 'पूरा पाठ्यक्रम', 'Finish every lesson', () => S.COURSE.every((u) => { const st = S.Guided.status(u); return st.done && !st.skipped; })],
    ['streak-3', '🔥', '3-day streak', '३ दिन लगातार', 'Practise 3 days in a row', () => S.currentStreak() >= 3],
    ['streak-7', '🔥', '7-day streak', '७ दिन लगातार', 'Practise 7 days in a row', () => S.currentStreak() >= 7],
    ['streak-30', '💎', '30-day streak', '३० दिन लगातार', 'Practise 30 days in a row', () => S.currentStreak() >= 30],
    ['words-50', '🧠', '50 words', '५० शब्द', 'Learn 50 words', () => S.ENTRIES.filter(S.isLearned).length >= 50],
    ['words-250', '🧠', '250 words', '२५० शब्द', 'Learn 250 words', () => S.ENTRIES.filter(S.isLearned).length >= 250],
    ['words-1000', '📚', '1000 words', '१००० शब्द', 'Learn 1000 words and sentences', () => S.ENTRIES.filter(S.isLearned).length >= 1000],
    ['talker', '💬', 'First conversation', 'पहिलो संवाद', 'Finish a conversation', (P) => count(P.roleplays) >= 1],
    ['talker-10', '🗣️', '10 conversations', '१० संवाद', 'Finish 10 conversations', (P) => count(P.roleplays) >= 10],
    ['reader', '📖', 'Reader', 'पाठक', 'Answer the questions of 5 texts', (P) => count(P.stories) >= 5],
    ['listener', '🎧', 'Good ears', 'राम्रो कान', 'Finish 5 listening tasks', (P) => count(P.listening) >= 5],
    ['sounds', '👂', 'Sound master', 'ध्वनि मास्टर', 'Score 80% in 5 sound games', (P) => Object.values(P.sounds || {}).filter((x) => x >= 80).length >= 5],
    ['revision', '↻', 'Reviser', 'दोहोर्‍याउने', 'Finish a revision lesson', (P) => Object.keys(P.assess || {}).some((k) => k.startsWith('rev-'))],
    ['certificate', '🎓', 'Certificate', 'प्रमाणपत्र', 'Pass a level test', (P) => count(P.certs) >= 1],
    ['answers-1000', '⚡', '1000 answers', '१००० उत्तर', 'Give 1000 answers in total', (P) => Object.values(P.history || {}).reduce((a, b) => a + b, 0) >= 1000],
  ];

  L.badges = () => {
    const P = S.progress;
    const got = (P.badges = P.badges || {});
    let changed = false;
    const list = BADGES.map(([id, icon, en, ne, how, test]) => {
      let ok = false;
      try { ok = !!test(P); } catch (e) { ok = false; }
      if (ok && !got[id]) { got[id] = S.dayKey(); changed = true; }
      return { id, icon, en, ne, how, date: got[id] || null };
    });
    if (changed) S.saveProgress();
    return list;
  };
  L.badgesHTML = () => {
    const list = L.badges();
    const n = list.filter((b) => b.date).length;
    return `
      <h3 class="section-h">Badges <span class="ne-sub" lang="ne">ब्याज</span> <small>${n} / ${list.length}</small></h3>
      <div class="badges">${list.map((b) => `
        <div class="badge-card ${b.date ? 'on' : ''}" title="${esc(b.how)}${b.date ? ' · Tap to celebrate 🎉' : ''}" ${b.date ? `data-action="celebrate-badge" data-badge-id="${esc(b.id)}" role="button" tabindex="0"` : ''}>
          <span class="badge-icon" aria-hidden="true">${b.icon}</span>
          <b>${esc(b.en)}</b><small lang="ne">${esc(b.ne)}</small>
          <small class="hint">${b.date ? `${esc(b.date)} · 🎉 Tap to celebrate` : esc(b.how)}</small>
        </div>`).join('')}</div>`;
  };
})();
