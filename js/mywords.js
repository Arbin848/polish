// Słówka "My words": the learner adds Polish words or sentences from their own life (work,
// signs, letters). Pronunciation is worked out from the spelling (js/pron.js), and the words
// join the daily review and every practice mode, like course words.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const M = (S.MyWords = {});

  const MODES = [
    { id: 'cards', en: 'Cards', ne: 'कार्ड' },
    { id: 'quiz', en: 'Quiz', ne: 'प्रश्न', min: 2 },
    { id: 'listen', en: 'Listen', ne: 'सुनाइ', min: 2, show: () => S.canSpeak },
    { id: 'speak', en: 'Speak', ne: 'बोलाइ' },
    { id: 'type', en: 'Type', ne: 'लेखाइ' },
  ];
  const MAX = 500;

  const list = () => (Array.isArray(S.progress.mywords) ? S.progress.mywords : []);
  const toEntry = (w) => ({ pl: w.pl, en: w.en, ne: w.ne || '', pron: w.pron, proNe: w.proNe, kind: /\s/.test(w.pl.trim()) ? 'phrase' : 'word', source: 'mine', mine: true });
  M.entries = () => list().map((w) => S.LEXICON.get(w.pl)).filter(Boolean);

  // My words join the lexicon (so they come back in the daily review), unless the course has them.
  M.register = () => {
    for (const w of list()) {
      if (!w || !w.pl || S.LEXICON.has(w.pl)) continue;
      S.LEXICON.set(w.pl, toEntry(w));
    }
  };
  M.register();

  const tidy = (s) => String(s || '').replace(/\s+/g, ' ').trim();
  // The course entry for a word, ignoring capitals and punctuation ("Dom" finds "dom").
  const courseEntry = (pl) => {
    const k = S.clean(pl);
    const exact = S.LEXICON.get(tidy(pl));
    if (exact && !exact.mine) return exact;
    for (const e of S.LEXICON.values()) if (!e.mine && S.clean(e.pl) === k) return e;
    return null;
  };

  function previewHTML(pl) {
    if (!tidy(pl)) return '<p class="hint">Type a Polish word to see how it is said. · उच्चारण हेर्न पोलिश शब्द लेख्नुहोस्।</p>';
    const p = S.Pron.of(pl);
    const course = courseEntry(pl);
    const e = course || { pl: tidy(pl), ...p };
    const hints = S.soundHints ? S.soundHints(e.pl) : '';
    return `
      <div class="my-preview-word"><span lang="pl">${polish(e.pl)}</span>${S.pronHTML(e)}${S.listenBtn(e.pl)}</div>
      ${course ? `<p class="hint ok">This is already in the course: “${esc(course.en)}”. · यो पाठ्यक्रममा पहिले नै छ।</p>` : ''}
      ${hints || ''}`;
  }

  M.render = (view, mode) => {
    const entries = M.entries();
    const modes = MODES.filter((m) => (!m.show || m.show()) && entries.length >= (m.min || 1));
    const active = modes.find((m) => m.id === mode);
    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">My words · मेरा शब्द (${entries.length} saved · सुरक्षित)</span>
        <h2>Add your own words</h2>
        <p class="hint">Saw a word at work, on a sign or in a letter? Add it here. The app writes how to say it, reads it aloud and brings it back in your daily review.<br>
        <span lang="ne">काममा, सूचनामा वा चिठीमा नयाँ शब्द देख्नुभयो? यहाँ थप्नुहोस्। एपले उच्चारण लेख्छ, पढेर सुनाउँछ र दैनिक दोहोर्याइमा फर्काउँछ।</span></p>
      </header>
      <form class="card my-form" data-form="my-add" autocomplete="off">
        <label class="field"><span>Polish · पोलिश</span><input class="type-input wide" name="pl" lang="pl" autocapitalize="off" autocorrect="off" data-keys-target required maxlength="120" placeholder="e.g. magazyn" spellcheck="false"></label>
        ${S.keysHTML()}
        <div class="my-preview" id="my-preview" aria-live="polite">${previewHTML('')}</div>
        <label class="field"><span>Meaning in English · अङ्ग्रेजी अर्थ</span><input class="type-input wide" name="en" required maxlength="120" placeholder="e.g. warehouse"></label>
        <label class="field"><span>Meaning in Nepali (optional) · नेपाली अर्थ (ऐच्छिक)</span><input class="type-input wide" name="ne" lang="ne" maxlength="120" placeholder="जस्तै: गोदाम"></label>
        <p class="hint" id="my-msg" role="status"></p>
        <div class="row"><button type="submit" class="btn primary">Add word · थप्नुहोस्</button></div>
      </form>
      ${entries.length ? `
        <h3 class="section-h">Practise my words <span class="ne-sub" lang="ne">मेरा शब्द अभ्यास</span></h3>
        <nav class="tabs" role="tablist">${modes.map((m) => `<button class="tab" role="tab" aria-selected="${active && active.id === m.id}" data-action="go" data-to="mywords.${m.id}">${m.en}<small lang="ne">${m.ne}</small></button>`).join('')}</nav>
        ${active ? '<section class="stage" id="stage"></section>' : ''}
        <h3 class="section-h">My list <span class="ne-sub" lang="ne">मेरो सूची</span> <small>${entries.length}</small></h3>
        <ul class="entries">${entries.map((e) => S.entryRow(e).replace('class="entry"', 'class="entry mine"').replace('</li>', `<button type="button" class="icon-btn my-del" data-action="my-del" data-pl="${esc(e.pl)}" aria-label="Remove ${esc(e.pl)}" title="Remove">×</button></li>`)).join('')}</ul>
        <p class="hint">Pronunciation for your words is worked out from the spelling by rules, so it can miss for names and foreign words. Always listen too. · आफ्ना शब्दको उच्चारण नियमबाट बनाइन्छ, त्यसैले नाम र विदेशी शब्दमा फरक हुन सक्छ।</p>`
        : '<p class="empty">No words yet. Add your first one above. · अहिलेसम्म कुनै शब्द छैन।</p>'}`;
    if (active) S.Practice.render(view.querySelector('#stage'), { key: 'mywords', mode: active.id, pool: entries, title: 'My words' });
  };

  M.input = (el) => {
    if (!el.closest || !el.closest('[data-form="my-add"]') || el.name !== 'pl') return false;
    const box = document.getElementById('my-preview');
    if (box) box.innerHTML = previewHTML(el.value);
    return true;
  };

  M.submit = (form, view) => {
    if (form.dataset.form !== 'my-add') return false;
    const pl = tidy(form.elements.pl.value);
    const en = tidy(form.elements.en.value);
    const ne = tidy(form.elements.ne.value);
    const msg = form.querySelector('#my-msg');
    const say = (t) => { if (msg) msg.textContent = t; };
    if (!pl || !/[a-ząćęłńóśźż]/i.test(pl)) { say('Type the Polish word first. · पहिले पोलिश शब्द लेख्नुहोस्।'); return true; }
    if (!en) { say('Add what it means. · अर्थ पनि लेख्नुहोस्।'); form.elements.en.focus(); return true; }
    const course = courseEntry(pl);
    if (course) {
      // Already taught in the course: just put it into the review.
      S.addToReview(course);
      say(`“${pl}” is already in the course; it is now in your review. · यो दोहोर्याइमा थपियो।`);
      return true;
    }
    if (!Array.isArray(S.progress.mywords)) S.progress.mywords = [];
    if (S.progress.mywords.some((w) => S.clean(w.pl) === S.clean(pl))) { say('You already have this word. · यो शब्द पहिले नै छ।'); return true; }
    if (S.progress.mywords.length >= MAX) { say(`You can keep up to ${MAX} words. Remove some first.`); return true; }
    const p = S.Pron.of(pl);
    const w = { pl, en, ne, pron: p.pron, proNe: p.proNe, added: S.dayKey() };
    S.progress.mywords.push(w);
    S.LEXICON.set(pl, toEntry(w));
    S.addToReview(S.LEXICON.get(pl));
    S.saveProgress();
    if (S.Practice && S.Practice.reset) S.Practice.reset(); // the next practice round includes the new word
    M.render(view, S.route.arg);
    const again = view.querySelector('[data-form="my-add"] input[name="pl"]');
    if (again) again.focus();
    const m2 = view.querySelector('#my-msg');
    if (m2) m2.textContent = `Added “${pl}” ✓ It will come back in your daily review. · थपियो ✓`;
    return true;
  };

  M.addWord = (pl, en = '', ne = '') => {
    const cleanPl = tidy(pl);
    if (!cleanPl) return false;
    const course = courseEntry(cleanPl);
    if (course) {
      S.addToReview(course);
      return true;
    }
    if (!Array.isArray(S.progress.mywords)) S.progress.mywords = [];
    if (S.progress.mywords.some((w) => S.clean(w.pl) === S.clean(cleanPl))) {
      const existing = S.LEXICON.get(cleanPl);
      if (existing) S.addToReview(existing);
      return true;
    }
    if (S.progress.mywords.length >= MAX) return false;
    const p = S.Pron.of(cleanPl);
    const w = { pl: cleanPl, en: en || '', ne: ne || '', pron: p.pron, proNe: p.proNe, added: S.dayKey() };
    S.progress.mywords.push(w);
    S.LEXICON.set(cleanPl, toEntry(w));
    S.addToReview(S.LEXICON.get(cleanPl));
    S.saveProgress();
    if (S.onProgress) S.onProgress();
    if (S.Practice && S.Practice.reset) S.Practice.reset();
    return true;
  };

  M.action = (a, el, view) => {
    if (a === 'mywords-add') {
      const pl = el.dataset.pl;
      const en = el.dataset.en || '';
      const ne = el.dataset.ne || '';
      if (pl) {
        const ok = M.addWord(pl, en, ne);
        if (ok) {
          el.textContent = '⭐ Saved';
          el.classList.add('saved');
          if (S.playSFX) S.playSFX('correct');
        }
      }
      return true;
    }
    if (a !== 'my-del') return false;
    const pl = el.dataset.pl;
    S.progress.mywords = list().filter((w) => w.pl !== pl);
    const e = S.LEXICON.get(pl);
    if (e && e.mine) {
      S.LEXICON.delete(pl);
      delete S.progress.items[pl];
    }
    S.saveProgress();
    if (S.onProgress) S.onProgress();
    if (S.Practice && S.Practice.reset) S.Practice.reset();
    M.render(view, S.route.arg);
    return true;
  };
})();
