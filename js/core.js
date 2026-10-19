// Słówka core: course data, saved progress, spaced repetition, audio and shared UI helpers.
// Everything here works offline. Nothing calls an AI or any server.
(() => {
  'use strict';
  const S = (window.Slowka = window.Slowka || {});

  // ---------- levels and data ----------

  S.LEVELS = [
    { id: 'Start', name: 'Start here', ne: 'यहाँबाट सुरु गर्नुहोस्', blurb: 'Alphabet, sounds and reading rules', blurbNe: 'वर्णमाला, उच्चारण र पढ्ने नियम' },
    { id: 'A1', name: 'A1 · Beginner', ne: 'सुरुआती', blurb: 'Everyday words and simple sentences', blurbNe: 'दैनिक शब्द र सरल वाक्य' },
    { id: 'A2', name: 'A2 · Elementary', ne: 'प्रारम्भिक', blurb: 'Cases, past and future, daily life and work', blurbNe: 'विभक्ति, भूत र भविष्य काल, दैनिक जीवन र काम' },
    { id: 'B1', name: 'B1 · Intermediate', ne: 'मध्यम', blurb: 'Aspect, polite Polish, life in Poland', blurbNe: 'क्रियाको पक्ष, विनम्र पोलिश, पोल्यान्डमा जीवन' },
    { id: 'B2', name: 'B2 · Upper intermediate', ne: 'उच्च-मध्यम', blurb: 'Fluent, formal and idiomatic Polish', blurbNe: 'धाराप्रवाह, औपचारिक र मुहावरेदार पोलिश' },
    { id: 'Work', name: 'Polish for work', ne: 'कामको लागि पोलिश', blurb: 'Word packs for common jobs in Poland', blurbNe: 'पोल्यान्डका सामान्य कामका शब्दहरू' },
  ];
  S.levelIndex = (id) => S.LEVELS.findIndex((l) => l.id === id);

  S.getProficiencyLevel = () => {
    const P = S.progress || {};
    const certs = P.certs || {};
    const placement = P.placement ? P.placement.level : null;

    if (certs['B2']) return S.LEVELS.find((l) => l.id === 'B2');
    if (certs['B1']) return S.LEVELS.find((l) => l.id === 'B1');
    if (certs['A2']) return S.LEVELS.find((l) => l.id === 'A2');
    if (certs['A1']) return S.LEVELS.find((l) => l.id === 'A1');

    const b1Units = S.COURSE.filter((u) => u.level === 'B1');
    if (b1Units.length && b1Units.every((u) => S.Guided.status(u).done)) return S.LEVELS.find((l) => l.id === 'B2');

    const a2Units = S.COURSE.filter((u) => u.level === 'A2');
    if (a2Units.length && a2Units.every((u) => S.Guided.status(u).done)) return S.LEVELS.find((l) => l.id === 'B1');

    const a1Units = S.COURSE.filter((u) => u.level === 'A1');
    if (a1Units.length && a1Units.every((u) => S.Guided.status(u).done)) return S.LEVELS.find((l) => l.id === 'A2');

    const startUnits = S.COURSE.filter((u) => u.level === 'Start');
    if (startUnits.length && startUnits.every((u) => S.Guided.status(u).done)) return S.LEVELS.find((l) => l.id === 'A1');

    if (placement && S.levelIndex(placement) >= 0) {
      return S.LEVELS.find((l) => l.id === placement) || S.LEVELS[0];
    }

    return S.LEVELS[0];
  };

  const W = window;
  S.COURSE = (W.SLOWKA_COURSE || [])
    .filter((u) => u && u.id && S.levelIndex(u.level) >= 0)
    .sort((a, b) => S.levelIndex(a.level) - S.levelIndex(b.level) || a.id.localeCompare(b.id, 'en', { numeric: true }));
  S.ALPHABET = W.SLOWKA_ALPHABET || [];
  S.LETTER_PAIRS = W.SLOWKA_LETTER_PAIRS || [];
  S.DRILLS = W.SLOWKA_DRILLS || {};
  S.ROLEPLAYS = (W.SLOWKA_ROLEPLAYS || []).slice().sort((a, b) => a.level.localeCompare(b.level));
  S.STORIES = (W.SLOWKA_STORIES || []).slice().sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  S.EXAMS = W.SLOWKA_EXAMS || [];
  S.PLACEMENT = W.SLOWKA_PLACEMENT || [];
  S.AUDIO = W.SLOWKA_AUDIO || {};
  S.TTS = W.SLOWKA_TTS || {};

  // Every Polish form the app can teach, keyed by its exact text. Course entries win.
  S.LEXICON = new Map();
  const toEntry = (kind, source) => ([pl, en, ne, pron, proNe]) => ({ pl, en, ne, pron, proNe, kind, source });
  S.COURSE.forEach((u) => {
    u.entries = [...(u.words || []).map(toEntry('word', u.id)), ...(u.phrases || []).map(toEntry('phrase', u.id))];
    u.entries.forEach((e) => { if (!S.LEXICON.has(e.pl)) S.LEXICON.set(e.pl, e); });
  });
  S.ENTRIES = [...S.LEXICON.values()]; // course entries only (for the dictionary and stats)
  S.ROLEPLAYS.forEach((r) => (r.useful || []).forEach((x) => {
    const e = toEntry('phrase', r.id)(x);
    if (!S.LEXICON.has(e.pl)) S.LEXICON.set(e.pl, e);
  }));
  S.STORIES.forEach((s) => (s.glossary || []).forEach((x) => {
    const e = toEntry('word', s.id)(x);
    if (!S.LEXICON.has(e.pl)) S.LEXICON.set(e.pl, e);
  }));
  // Word forms from the reading texts (meaning, Nepali, dictionary form); pronunciation is worked out
  // from the spelling when shown.
  Object.entries(W.SLOWKA_READING_GLOSS || {}).forEach(([pl, [en, ne, base]]) => {
    if (!S.LEXICON.has(pl)) S.LEXICON.set(pl, { pl, en, ne, kind: 'word', source: 'reading', base, say: (W.SLOWKA_READING_SAY || {})[pl] });
  });
  // Poland practical life, legal and work guide items
  (W.SLOWKA_POLAND_GUIDE || []).forEach((cat) => (cat.items || []).forEach((item) => {
    if (!S.LEXICON.has(item.pl)) {
      S.LEXICON.set(item.pl, {
        pl: item.pl,
        en: item.en,
        ne: item.ne,
        pron: item.pron,
        proNe: item.proNe,
        kind: 'phrase',
        source: 'guide',
        tip: item.tip,
        tipNe: item.tipNe
      });
    }
  }));
  // 2000 Core Vocabulary & Practical Polish
  (W.SLOWKA_CORE2000 || []).forEach(([pl, en, ne, pron, proNe, exPl, exEn, exNe]) => {
    let entry = S.LEXICON.get(pl);
    if (!entry) {
      entry = {
        pl,
        en,
        ne,
        pron,
        proNe,
        kind: 'word',
        source: 'core2000',
        exPl,
        exEn,
        exNe
      };
      S.LEXICON.set(pl, entry);
      S.ENTRIES.push(entry);
    }
    entry.isCore2000 = true;
    if (exPl && !entry.exPl) {
      entry.exPl = exPl;
      entry.exEn = exEn;
      entry.exNe = exNe;
    }
  });
  S.UNIT = new Map(S.COURSE.map((u) => [u.id, u]));

  // ---------- text helpers ----------

  S.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  S.highlight = (escaped) => escaped.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, '<span class="dia">$&</span>');
  S.polish = (s) => (S.settings && S.settings.stress && S.Pron && S.Pron.stressHTML ? S.Pron.stressHTML(S.esc(s)) : S.highlight(S.esc(s)));
  // Lesson markup on escaped text: *polish words* and **bold**.
  S.markup = (s) => S.esc(s)
    // Bold markers are set aside first, so "**always a comma before *że***" nests correctly.
    .replace(/(\S)\*\*\*/g, '$1*\u0001').replace(/\*\*\*(?=\S)/g, '\u0001*')
    .replace(/\*\*/g, '\u0001')
    // Polish in explanations can be tapped to hear it (only spans with Latin letters are Polish).
    .replace(/\*([^*\u0001]+)\*/g, (_, t) => (/[a-ząćęłńóśźż]/i.test(t)
      ? `<span class="pl say-tap" lang="pl" role="button" tabindex="0" data-action="say" data-text="${t}" title="Listen">${S.highlight(t)}</span>`
      : `<span class="pl">${t}</span>`))
    .replace(/\u0001(.+?)\u0001/g, '<strong>$1</strong>')
    .replace(/\u0001/g, '')
    // Nepali inside English text (tables, tips) is marked as Nepali for screen readers and fonts.
    .split(/(<[^>]+>)/).map((part) => (part.startsWith('<') ? part : part.replace(/[\u0900-\u097F][\u0900-\u097F\s।,()\-–/]*[\u0900-\u097F।]|[\u0900-\u097F]/g, (m) => `<span lang="ne">${m}</span>`))).join('');
  // The Polish bits of a marked-up text, found the same way S.markup finds them.
  S.polishBits = (text) => {
    const out = [];
    String(text).replace(/(\S)\*\*\*/g, '$1*\u0001').replace(/\*\*\*(?=\S)/g, '\u0001*').replace(/\*\*/g, '\u0001')
      .replace(/\*([^*\u0001]+)\*/g, (_, t) => { if (/[a-ząćęłńóśźż]/i.test(t) && !out.includes(t)) out.push(t); return ''; });
    return out;
  };

  S.stripMarks = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/Ł/g, 'L');
  S.clean = (s) => String(s).toLowerCase().replace(/[?!.,…¿¡:;"„”«»()–—]/g, ' ').replace(/\s+/g, ' ').trim();
  S.fold = (s) => S.stripMarks(S.clean(s));
  S.tokenKey = (w) => S.clean(w).replace(/\s/g, '');

  // Story glossaries are looked up by the word as written in the text.
  S.STORIES.forEach((s) => {
    s.glossaryMap = new Map((s.glossary || []).map((x) => [S.tokenKey(x[0]), toEntry('word', s.id)(x)]));
  });
  // Single words from the whole course, for tap-to-translate in reading.
  S.WORD_INDEX = new Map();
  for (const e of S.LEXICON.values()) {
    if (!/\s/.test(e.pl.trim())) { const k = S.tokenKey(e.pl); if (!S.WORD_INDEX.has(k)) S.WORD_INDEX.set(k, e); }
  }

  // A word tile in "build the sentence": no full stop or comma and no capital on the first word,
  // so the order can't be read from punctuation. Names keep their capital.
  const NAME_RE = /^(Ram|Sita|Bikash|Bishal|Prakash|Ramesh|Kasi|Kasia|Ani|Ania|Ann|Ewa|Mare|Tom|Piotr|Polsk|Polak|Nepal|Warszaw|Krak|Wrocław|Pozna|Gdańsk|Łód|Pan\b|Pani\b|Państw|Panie)/;
  S.tileText = (w, first) => {
    let t = String(w).replace(/[.,!?;:…]+$/u, '');
    if (first && !NAME_RE.test(t)) t = t.charAt(0).toLowerCase() + t.slice(1);
    return t;
  };

  // The Polish a grammar exercise's Listen button says: the finished sentence without English hints.
  // ("(Walking into a shop at 8 pm) ___!" -> "Dobry wieczór!"; "co? — it sounds like 'tso'" -> "co?")
  // Exercises about sounds give the word to say in d.say. tools/list-texts.js uses the same rule.
  S.drillSentence = (d) => (d.type === 'order' ? d.words.join(' ') : d.type === 'choose' ? d.q.replace('___', d.options[d.answer]) : d.q.replace(/\s*\([^)]*\)\s*$/, '').replace('___', d.answer[0]));
  S.drillSpeech = (d) => {
    if (d.say) return d.say;
    return S.drillSentence(d).split(' — ')[0].replace(/\([^)]*\)/g, ' ').replace(/\s+([,.!?;:])/g, '$1').replace(/\s+/g, ' ').trim();
  };

  // Similarity 0–1 between two strings (Levenshtein), on folded text.
  S.similarity = (a, b) => {
    a = S.fold(a); b = S.fold(b);
    if (!a.length && !b.length) return 1;
    const m = a.length, n = b.length;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return 1 - prev[n] / Math.max(m, n);
  };

  S.shuffle = (list) => {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // ---------- storage ----------

  const PROGRESS_KEY = 'slowka-progress-v2';
  const SETTINGS_KEY = 'slowka-settings-v2';
  function readJSON(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch (e) { return null; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }

  S.freshProgress = () => ({
    items: {}, streak: 0, lastDay: null, history: {}, lastUnit: null,
    drills: {}, mistakes: {}, exams: {}, roleplays: {}, stories: {}, placement: null,
  });
  S.progress = Object.assign(S.freshProgress(), readJSON(PROGRESS_KEY));
  // Older saves lack the newer fields.
  for (const [k, v] of Object.entries(S.freshProgress())) if (S.progress[k] == null && v !== null) S.progress[k] = v;
  if (S.progress.todayDay && S.progress.todayCount && !S.progress.history[S.progress.todayDay]) {
    S.progress.history[S.progress.todayDay] = S.progress.todayCount;
  }
  S.saveProgress = () => writeJSON(PROGRESS_KEY, S.progress);
  // Another open copy of the app saved progress: use it, so the two copies don't overwrite each other.
  // A phone may freeze a background tab, so it misses changes made elsewhere: re-read on return.
  const reread = () => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved && saved !== JSON.stringify(S.progress)) {
        S.progress = Object.assign(S.freshProgress(), JSON.parse(saved));
        if (S.MyWords) S.MyWords.register();
        if (S.onProgress) S.onProgress();
      }
    } catch (e) { /* storage unavailable */ }
  };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reread(); });
  window.addEventListener('pageshow', (ev) => { if (ev.persisted) reread(); });
  window.addEventListener('storage', (ev) => {
    if (ev.key !== PROGRESS_KEY || !ev.newValue) return;
    try {
      S.progress = Object.assign(S.freshProgress(), JSON.parse(ev.newValue));
      if (S.MyWords) S.MyWords.register();
      if (S.onProgress) S.onProgress();
    } catch (e) { /* ignore a broken value */ }
  });

  S.settings = Object.assign(
    { meaning: 'both', pron: 'both', explain: 'both', dir: 'pl', slow: false, goal: 20, audio: 'native', sfx: true, stress: false, studyquiz: false, fontsize: 'normal', autoplay: true },
    readJSON(SETTINGS_KEY)
  );
  S.saveSettings = () => writeJSON(SETTINGS_KEY, S.settings);
  S.shows = (key, lang) => S.settings[key] === 'both' || S.settings[key] === lang;

  // Backup code: everything saved, as text the learner can copy to another device.
  S.backupCode = () => {
    const json = JSON.stringify({ v: 2, progress: S.progress, settings: S.settings });
    return btoa(unescape(encodeURIComponent(json)));
  };
  // A backup code can come from anyone, so nothing in it may contain markup: text loses <, >,
  // quotes and backticks, and settings must be one of the allowed values.
  const SETTING_VALUES = {
    meaning: ['both', 'en', 'ne'], pron: ['both', 'en', 'ne'], explain: ['both', 'en', 'ne'], dir: ['pl', 'meaning'],
    slow: [true, false], goal: [10, 20, 40, 60], audio: ['native', 'device'], sfx: [true, false], stress: [true, false], studyquiz: [true, false], fontsize: ['normal', 'large', 'xlarge'], autoplay: [true, false],
  };
  const cleanData = (v, depth = 0) => {
    if (depth > 8) return null;
    if (typeof v === 'string') return v.replace(/[<>`]/g, '').replace(/"/g, '”').slice(0, 2000);
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    if (typeof v === 'boolean' || v === null) return v;
    if (Array.isArray(v)) return v.slice(0, 5000).map((x) => cleanData(x, depth + 1));
    if (typeof v === 'object') {
      const out = {};
      for (const [k, x] of Object.entries(v)) if (!/^__proto__$|^constructor$|^prototype$/.test(k)) out[cleanData(k)] = cleanData(x, depth + 1);
      return out;
    }
    return null;
  };
  S.readBackup = (code) => {
    const data = JSON.parse(decodeURIComponent(escape(atob(String(code).trim()))));
    if (!data || !data.progress || !data.progress.items) throw new Error('not a Słówka backup');
    return data;
  };
  S.restoreBackup = (code) => {
    const data = S.readBackup(code);
    // Every field must have the type a fresh save has (object, array, number…), or it is dropped.
    const fresh = S.freshProgress();
    const kind = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);
    const got = cleanData(data.progress);
    for (const [k, v] of Object.entries(got)) if (!(k in fresh) || fresh[k] === null || kind(v) === kind(fresh[k])) fresh[k] = v;
    S.progress = fresh;
    for (const [k, allowed] of Object.entries(SETTING_VALUES)) {
      const v = data.settings && data.settings[k];
      if (allowed.includes(v)) S.settings[k] = v;
    }
    // The name printed on certificates: plain text only.
    if (data.settings && typeof data.settings.name === 'string') S.settings.name = cleanData(data.settings.name).slice(0, 60);
    if (S.MyWords) S.MyWords.register();
    S.saveProgress();
    S.saveSettings();
  };

  // ---------- days, activity and spaced repetition ----------

  S.dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  S.addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return S.dayKey(d); };
  S.daysBetween = (a, b) => Math.round((new Date(`${b}T12:00`) - new Date(`${a}T12:00`)) / 864e5);

  // Leitner boxes 0–5 with intervals in days. Box 3+ counts as learned.
  S.INTERVALS = [0, 1, 2, 4, 7, 14];
  S.MAX_BOX = 5;
  S.LEARNED_BOX = 3;

  S.itemOf = (e) => S.progress.items[e.pl];
  S.boxOf = (e) => (S.itemOf(e) ? S.itemOf(e).b : 0);
  S.isLearned = (e) => S.boxOf(e) >= S.LEARNED_BOX;

  // Streak Shield: 1 free streak freeze every week so learners don't lose motivation if they miss a single day.
  S.hasStreakShield = () => {
    const p = S.progress;
    if (!p) return false;
    const week = S.dayKey().slice(0, 7) + '-W' + Math.ceil(new Date().getDate() / 7);
    if (!p.shieldWeek || p.shieldWeek !== week) {
      p.shieldWeek = week;
      p.shields = 1;
    }
    return (p.shields || 0) > 0;
  };

  S.useStreakShield = () => {
    const p = S.progress;
    if (S.hasStreakShield()) {
      p.shields = Math.max(0, (p.shields || 1) - 1);
      p.shieldUsed = S.dayKey();
      S.saveProgress();
    }
  };

  // Web Audio SFX synthesizer (zero latency, procedural, subtle feedback)
  let audioCtx = null;
  S.playSFX = (type = 'correct') => {
    // Subtle mobile haptic feedback on physical phone touches
    try {
      if (navigator && navigator.vibrate) {
        if (type === 'correct') navigator.vibrate(18);
        else if (type === 'wrong') navigator.vibrate([30, 40, 30]);
        else navigator.vibrate(12);
      }
    } catch (e) {}
    if (S.settings.sfx === false) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const hour = new Date().getHours();
      const isLateNight = hour >= 22 || hour < 6;
      const volMultiplier = isLateNight ? 0.55 : 1.0;

      if (type === 'correct') {
        // Cheerful major arpeggio chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
        gain.gain.setValueAtTime(0.12 * volMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'wrong') {
        // Soft low buzz/thud (gentle, not jarring)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.linearRampToValueAtTime(164.81, now + 0.14); // E3
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.24);
      } else if (type === 'fanfare') {
        // Triumphant fanfare
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.09);
        osc.frequency.setValueAtTime(659.25, now + 0.18);
        osc.frequency.setValueAtTime(880, now + 0.28);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.58);
      }
    } catch (err) {}
  };

  // Any practice answer counts toward today's goal and the streak.
  S.logActivity = () => {
    const today = S.dayKey();
    const prevCount = S.progress.history[today] || 0;
    S.progress.history[today] = prevCount + 1;
    if (prevCount < S.settings.goal && S.progress.history[today] >= S.settings.goal) {
      if (S.Celebration && S.Celebration.fire) {
        S.Celebration.fire('goal', { icon: '🎯', title: 'Daily Goal Reached!', titleNe: 'दैनिक लक्ष्य पूरा भयो!' });
      }
    }
    if (S.progress.lastDay !== today) {
      if (S.progress.lastDay && S.daysBetween(S.progress.lastDay, today) === 1) {
        S.progress.streak = (S.progress.streak || 0) + 1;
      } else if (S.progress.lastDay && S.daysBetween(S.progress.lastDay, today) === 2 && S.hasStreakShield()) {
        // Protected by weekly streak shield
        S.useStreakShield();
        S.progress.streak = (S.progress.streak || 0) + 1;
      } else {
        S.progress.streak = 1;
      }
      S.progress.lastDay = today;
    }
  };
  S.todayCount = () => S.progress.history[S.dayKey()] || 0;
  S.currentStreak = () => {
    if (!S.progress.lastDay) return 0;
    const diff = S.daysBetween(S.progress.lastDay, S.dayKey());
    if (diff <= 1) return S.progress.streak || 0;
    if (diff === 2 && S.hasStreakShield()) return S.progress.streak || 0;
    return 0;
  };

  S.review = (entry, change) => {
    // Sound effect on answer
    if (change > 0) S.playSFX('correct');
    else if (change < 0 || change === 'reset') S.playSFX('wrong');

    // Count forgotten answers per word for the weak-spot report.
    if (change === 'reset' || change < 0) {
      S.progress.lapses = S.progress.lapses || {};
      S.progress.lapses[entry.pl] = (S.progress.lapses[entry.pl] || 0) + 1;
    }
    // Correct answers only move a word up when it is due (or new), so repeating a word
    // many times in one sitting doesn't mark it "learned". Mistakes always count.
    const item = S.itemOf(entry);
    const notDue = item && item.due > S.dayKey();
    if (change === 0) {
      // Half right (accents missing, after a hint, unclear speech): keep the box and keep the
      // word due, so it comes back in today's review instead of disappearing for days.
      S.progress.items[entry.pl] = { b: S.boxOf(entry), due: notDue ? item.due : S.dayKey() };
    } else if (!(notDue && change !== 'reset' && change > 0)) {
      const b = change === 'reset' ? 0 : Math.max(0, Math.min(S.MAX_BOX, S.boxOf(entry) + change));
      S.progress.items[entry.pl] = { b, due: S.addDays(S.INTERVALS[b]) };
    }
    S.logActivity();
    S.saveProgress();
    if (S.onProgress) S.onProgress();
  };
  S.addToReview = (entry) => {
    if (!S.itemOf(entry)) { S.progress.items[entry.pl] = { b: 0, due: S.dayKey() }; S.saveProgress(); }
    if (S.onProgress) S.onProgress();
  };
  S.dueList = () => {
    const today = S.dayKey();
    const list = [];
    for (const [pl, item] of Object.entries(S.progress.items)) {
      const e = S.LEXICON.get(pl);
      if (e && item.due <= today) list.push(e);
    }
    return list.sort((a, b) => S.itemOf(a).due.localeCompare(S.itemOf(b).due) || S.boxOf(a) - S.boxOf(b));
  };
  // Latest speaking score per word (0–1), for the weak-spot report.
  S.recordSpeech = (pl, score) => {
    S.progress.speech = S.progress.speech || {};
    S.progress.speech[pl] = Math.round(score * 100) / 100;
    S.saveProgress();
  };
  S.unitLearned = (u) => u.entries.filter(S.isLearned).length;
  S.unitStarted = (u) => u.entries.some((e) => S.itemOf(e)) || !!S.progress.drills[u.id];

  // Weak items first, with jitter so rounds differ.
  S.pickSession = (list, n) => list.map((e) => ({ e, k: S.boxOf(e) + Math.random() * 1.5 }))
    .sort((a, b) => a.k - b.k).slice(0, n).map((x) => x.e);
  S.pickOne = (list, avoid) => {
    const c = list.length > 1 ? list.filter((e) => e !== avoid) : list;
    const weights = c.map((e) => (S.MAX_BOX + 1 - S.boxOf(e)) ** 2);
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < c.length; i++) { r -= weights[i]; if (r <= 0) return c[i]; }
    return c[c.length - 1];
  };
  // Wrong options of the same kind: the given pool first, then the whole course.
  S.distractors = (target, list, key) => {
    const differs = (e) => e.pl !== target.pl && e.en !== target.en && e.ne !== target.ne;
    const same = (pool) => S.shuffle(pool.filter((e) => e.kind === target.kind && e[key] !== target[key] && differs(e)));
    const any = S.shuffle(S.ENTRIES.filter((e) => e[key] !== target[key] && differs(e)));
    const picked = [];
    const seen = new Set([target[key]]);
    for (const e of [...same(list), ...same(S.ENTRIES), ...any]) {
      if (picked.length === 3) break;
      if (!seen.has(e[key])) { seen.add(e[key]); picked.push(e); }
    }
    return picked;
  };

  // ---------- audio: native recordings, device voice, microphone ----------

  const synth = window.speechSynthesis;
  S.canSpeak = !!synth || Object.keys(S.AUDIO).length > 0 || Object.keys(S.TTS).length > 0;
  let polishVoice = null;
  function findVoice() {
    try {
      if (!synth || !synth.getVoices) return;
      const voices = synth.getVoices() || [];
      // Prefer high-quality/natural Polish voices (e.g. Google polski, Ewa, Zosia, Maja, Jan, Paulina)
      const plVoices = voices.filter((v) => /^pl\b/i.test(v.lang));
      polishVoice = plVoices.find((v) => /natural|premium|online|google|ewa|zosia|maja/i.test(v.name))
        || plVoices[0]
        || null;
    } catch (e) { polishVoice = null; }
  }
  if (synth) {
    findVoice();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', findVoice);
  }
  S.audioKey = (text) => S.clean(text);
  S.hasNative = (text) => !!S.AUDIO[S.audioKey(text)];

  // Audio file for a text: native speaker first, then the built-in generated voice.
  // "Device voice only" in Settings skips both.
  S.audioFile = (text) => {
    if (S.settings.audio === 'device') return null;
    const k = S.audioKey(text);
    return S.AUDIO[k] || S.TTS[k] || null;
  };
  S.hasAudio = (text) => !!S.AUDIO[S.audioKey(text)] || !!S.TTS[S.audioKey(text)];

  let current = null;
  let playToken = 0;
  // One shared player: phones (especially iPhones) allow it to keep playing, e.g. the next line
  // of a dialogue, once the learner has tapped Listen; new players started later can be blocked.
  let player = null;
  let fileToken = 0;
  function playFile(src, isSlow, onEnd, onFail) {
    const t = ++fileToken;
    try {
      if (synth) {
        try { synth.cancel(); } catch (e) {}
      }
      if (current) {
        try { current.pause(); current.currentTime = 0; current.onended = null; current.onerror = null; } catch (e) {}
      }
      const audio = new Audio(src);
      current = audio;
      audio.volume = 1.0;
      audio.playbackRate = isSlow ? 0.75 : 0.95;
      audio.onplay = () => document.body.classList.add('audio-playing');
      audio.onended = () => {
        document.body.classList.remove('audio-playing');
        if (t === fileToken && onEnd) onEnd();
      };
      audio.onerror = () => {
        document.body.classList.remove('audio-playing');
        if (t === fileToken && onFail) onFail();
      };
      const p = audio.play();
      if (p && p.catch) {
        p.catch((err) => {
          document.body.classList.remove('audio-playing');
          if (t === fileToken && onFail) onFail();
        });
      }
    } catch (e) {
      if (onFail) onFail();
    }
  }
  // slow: true plays this one item slowly, whatever the Settings say.
  let speakTimer = 0;
  let lastSpokenText = '';
  let lastSpokenTime = 0;
  
  // Pre-warm SpeechSynthesis and AudioContext on first user touch to eliminate delay
  let hasPrewarmed = false;
  const prewarmAudio = () => {
    if (hasPrewarmed) return;
    hasPrewarmed = true;
    try {
      if (synth) {
        if (synth.resume) synth.resume();
        if (synth.getVoices) { synth.getVoices(); findVoice(); }
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!audioCtx) audioCtx = new AudioCtx();
        if (audioCtx.state === 'suspended') audioCtx.resume();
      }
    } catch (e) {}
    window.removeEventListener('touchstart', prewarmAudio);
    window.removeEventListener('pointerdown', prewarmAudio);
  };
  window.addEventListener('touchstart', prewarmAudio, { passive: true });
  window.addEventListener('pointerdown', prewarmAudio, { passive: true });

  let lastSpokenInvocation = 0;

  S.speak = (text, slow) => {
    if (!text) return;
    const now = Date.now();
    // Guard against double triggers (e.g. pointerup + click or synthetic tap within 250ms)
    if (now - lastSpokenInvocation < 250 && lastSpokenText === text) {
      return;
    }
    lastSpokenInvocation = now;

    // Intelligent auto-slowdown: if tapped again within 3.5s, speak slower so learner catches sounds
    const repeatQuick = (lastSpokenText === text && (now - lastSpokenTime) > 350 && (now - lastSpokenTime) < 3500);
    lastSpokenText = text;
    lastSpokenTime = now;
    const isSlow = slow || S.settings.slow || repeatQuick;
    if (isSlow) {
      let badge = document.getElementById('audio-speed-toast');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'audio-speed-toast';
        badge.style.cssText = 'position:fixed; top:70px; right:20px; z-index:99999; background:rgba(0,0,0,0.85); color:#fef08a; padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; pointer-events:none; transition:opacity 0.2s; box-shadow:0 4px 12px rgba(0,0,0,0.3);';
        badge.innerHTML = '🐢 Slow Speed · बिस्तारै';
        document.body.appendChild(badge);
        setTimeout(() => { if (badge && badge.parentElement) badge.remove(); }, 1800);
      }
    }
    clearTimeout(speakTimer);
    S.stopSpeaking();
    // Execute synchronously to preserve mobile touch gesture autoplay permission
    const src = S.audioFile(text);
    if (src) {
      playFile(src, isSlow, null, () => tts(text, isSlow));
    } else {
      tts(text, isSlow);
    }
  };
  // Read several lines in a row: recorded files where they exist, the device voice for the rest
  // (each speaker then gets a slightly different pitch).
  S.speakLines = (lines, slow, onStep) => {
    S.stopSpeaking();
    const token = ++playToken;
    let i = 0;
    const next = () => {
      if (token !== playToken || i >= lines.length) {
        document.body.classList.remove('audio-playing');
        if (onStep) onStep(null);
        return;
      }
      const item = lines[i++];
      const { text, pitch } = item;
      if (onStep) onStep(item, i - 1);
      const src = S.audioFile(text);
      const device = () => tts(text, slow, pitch, () => setTimeout(next, 250));
      if (src) { try { if (synth) synth.cancel(); } catch (e) { /* ignore */ } playFile(src, slow, () => setTimeout(next, 350), device); }
      else device();
    };
    next();
  };
  S.stopSpeaking = () => {
    playToken++;
    document.body.classList.remove('audio-playing');
    try {
      if (synth) synth.cancel();
      if (current) {
        fileToken++;
        current.onended = null;
        current.onerror = null;
        current.pause();
        current.currentTime = 0;
      }
    } catch (e) { /* ignore */ }
  };
  function tts(text, isSlow, pitch, onEnd) {
    if (!synth) { if (onEnd) onEnd(); return; }
    try {
      if (current) {
        try { current.pause(); current.currentTime = 0; current.onended = null; } catch (e) {}
      }
      if (!polishVoice && synth.getVoices) {
        findVoice();
      }
      const cleanText = String(text).replace(/…/g, '').replace(/\s\/\s/g, ', ').replace(/___/g, '…');
      const u = new SpeechSynthesisUtterance(cleanText);
      u.lang = 'pl-PL';
      if (polishVoice) u.voice = polishVoice;
      u.volume = 1.0;
      // Adaptive pacing: single words 0.80x, full sentences 0.86x, slow mode 0.65x
      const wordCount = cleanText.trim().split(/\s+/).length;
      u.rate = isSlow ? 0.65 : (wordCount > 3 ? 0.86 : 0.80);
      if (pitch) u.pitch = pitch;
      let done = false;
      const finish = () => {
        if (!done) {
          done = true;
          document.body.classList.remove('audio-playing');
          clearTimeout(timer);
          if (onEnd) onEnd();
        }
      };
      const timer = setTimeout(finish, 2000 + (cleanText.length * 90) / u.rate);
      u.onstart = () => document.body.classList.add('audio-playing');
      u.onend = finish;
      u.onerror = finish;
      speaking = u;
      if (synth.paused && synth.resume) synth.resume();
      synth.speak(u);
    } catch (e) {
      if (onEnd) onEnd();
    }
  }

  let speaking = null;

  // Speech recognition (Chrome, Edge, Safari). The browser does the listening; the app only compares text.
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  S.canRecognize = !!Recognition;
  // Speech recognition writes numbers as digits ("2", "20"); the course writes them as words.
  S.spokenDigits = (text) => (S.Numbers ? String(text).replace(/\d+/g, (n) => (n.length <= 6 ? S.Numbers.words(Number(n)) : n)) : String(text));
  S.recognize = () => new Promise((resolve, reject) => {
    if (!Recognition) { reject(new Error('unsupported')); return; }
    const r = new Recognition();
    r.lang = 'pl-PL';
    r.maxAlternatives = 5;
    r.interimResults = false;
    let done = false;
    r.onresult = (ev) => {
      done = true;
      const alts = [];
      for (let i = 0; i < ev.results[0].length; i++) alts.push(S.spokenDigits(ev.results[0][i].transcript));
      resolve(alts);
    };
    r.onerror = (ev) => { done = true; reject(new Error(ev.error || 'error')); };
    r.onend = () => { if (!done) reject(new Error('no-speech')); };
    try { r.start(); } catch (e) { reject(e); }
    S.stopRecognition = () => { try { r.stop(); } catch (e) { /* ignore */ } };
  });

  // Record the learner's voice to compare with the model. Stays on the device.
  S.canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  S.recordVoice = async (maxMs = 6000) => {
    let cancelled = false;
    S.stopRecording = () => { cancelled = true; };
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    try {
      if (cancelled) throw new Error('cancelled');
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = (ev) => { if (ev.data.size) chunks.push(ev.data); };
      const stopped = new Promise((resolve) => { rec.onstop = resolve; });
      rec.start();
      const timer = setTimeout(() => { if (rec.state !== 'inactive') rec.stop(); }, maxMs);
      S.stopRecording = () => { clearTimeout(timer); if (rec.state !== 'inactive') rec.stop(); };
      await stopped;
      if (S.lastRecording) URL.revokeObjectURL(S.lastRecording);
      S.lastRecording = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
      return S.lastRecording;
    } finally {
      // The microphone is always switched off, even if recording failed.
      stream.getTracks().forEach((t) => t.stop());
    }
  };
  S.micErrorText = (err) => {
    const m = String(err && err.message || err);
    if (/not-allowed|NotAllowed|denied|Permission|service-not-allowed/i.test(m)) {
      return 'The microphone is blocked here. Open the app as a website (see Settings → Install) and allow the microphone when the browser asks. · माइक्रोफोन बन्द छ। एपलाई वेबसाइटको रूपमा खोल्नुहोस् र माइक्रोफोनलाई अनुमति दिनुहोस्।';
    }
    if (/no-speech/i.test(m)) return 'No speech heard. Tap and speak clearly, close to the phone. · आवाज सुनिएन। नजिकबाट स्पष्ट बोल्नुहोस्।';
    if (/network/i.test(m)) return 'Speech checking needs an internet connection in this browser. You can still record yourself and compare. · यो ब्राउजरमा बोली जाँच्न इन्टरनेट चाहिन्छ।';
    if (/unsupported/i.test(m)) return 'This browser cannot check speech. Use Chrome, Edge or Safari, or record yourself and compare. · यो ब्राउजरले बोली जाँच्न सक्दैन।';
    return `Something went wrong with the microphone (${m}).`;
  };

  // ---------- shared UI pieces ----------

  const { esc } = S;
  S.SPEAKER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  S.MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';

  S.meaningHTML = (e, cls = '') => {
    const parts = [];
    if (S.shows('meaning', 'en')) parts.push(`<span class="m-en">${esc(e.en)}</span>`);
    if (S.shows('meaning', 'ne')) parts.push(`<span class="m-ne" lang="ne">${esc(e.ne)}</span>`);
    const inner = parts.join('');
    if (S.settings && S.settings.studyquiz) {
      return `<span class="meaning ${cls} quiz-masked" data-action="unmask-meaning" role="button" tabindex="0" title="Tap to reveal translation"><span class="masked-content">${inner}</span><span class="masked-cover">👁️ Tap to reveal · अर्थ हेर्नुहोस्</span></span>`;
    }
    return `<span class="meaning ${cls}">${inner}</span>`;
  };
  // Pronunciation as syllable blocks; the stressed syllable is highlighted.
  // English letters mark stress with CAPITALS, Devanagari with ˈ before the syllable.
  const sylChips = (text, isStressed, clean) => String(text).split(/\s+/).filter(Boolean).map((word) => {
    const syl = word.split('-');
    return `<span class="sw">${syl.map((x) => `<span class="sy${syl.length > 1 && isStressed(x) ? ' st' : ''}" data-action="say" data-text="${esc(clean(x))}" role="button" tabindex="0" title="Tap to listen: ${esc(clean(x))}">${esc(clean(x))}</span>`).join('')}</span>`;
  }).join(' ');
  S.pronHTML = (e) => {
    if (e && !e.pron && e.pl && S.Pron) Object.assign(e, S.Pron.of(e.say || e.pl));
    const parts = [];
    if (S.shows('pron', 'en') && e.pron) parts.push(`<span class="pron" title="The highlighted syllable is stressed">${sylChips(e.pron, (x) => /[A-Z]/.test(x), (x) => x.toLowerCase())}</span>`);
    if (S.shows('pron', 'ne') && e.proNe) parts.push(`<span class="pron ne" lang="ne" title="रङ लगाइएको अक्षरमा जोड दिनुहोस्">${sylChips(e.proNe, (x) => x.includes('ˈ'), (x) => x.replace(/ˈ/g, ''))}</span>`);
    return `<span class="prons">${parts.join('')}</span>`;
  };

  // Tips for the letters in a word that are new for Nepali speakers.
  const HINTS = [
    ['dzi', 'soft j, as in jeep', 'नरम ज', null, /^dzi[aeouyąęó]/],
    ['dź', 'soft j, as in jeep', 'नरम ज', null],
    ['dż', 'hard j, as in jam', 'कडा ज', null],
    ['dz', 'dz, as in adze', 'द्ज़', null],
    ['sz', 'sh, tongue up, lips round', 'श (ओठ गोलो)', 'sz-s'],
    ['cz', 'ch, hard, as in church', 'कडा च', 'cz-c'],
    ['rz', 'zh, as in pleasure (= ż)', 'झ (= ż)', 'rz-z'],
    ['ch', 'throaty h (= h)', 'घाँटीबाट ह', 'h-k'],
    ['si', 'soft sh (= ś), smile', 'नरम श (= ś)', 'sz-s', /^si[aeouyąęó]/],
    ['ci', 'soft ch (= ć), smile', 'नरम च (= ć)', 'cz-c', /^ci[aeouyąęó]/],
    ['zi', 'soft zh (= ź)', 'नरम झ (= ź)', 'rz-z', /^zi[aeouyąęó]/],
    ['ni', 'ny, as in canyon (= ń)', 'न्य (= ń)', null, /^ni[aeouyąęó]/],
    ['ż', 'zh, as in pleasure', 'झ', 'rz-z'],
    ['ś', 'soft sh, smile', 'नरम श', 'sz-s'],
    ['ć', 'soft ch, smile', 'नरम च', 'cz-c'],
    ['ź', 'soft zh', 'नरम झ', 'rz-z'],
    ['ń', 'ny, as in canyon', 'न्य', null],
    ['ł', 'w, as in water', 'व', 'l-l'],
    ['w', 'v, as in van', 'भ', null],
    ['y', 'between i and u (bit)', 'इ र उ बीच', 'y-i'],
    ['ó', 'u, as in put (= u)', 'उ', null],
    ['ą', 'nasal on', 'नाकबाट ओं', 'o-a'],
    ['ę', 'nasal en; at the end just e', 'नाकबाट एं', 'e-e'],
    ['c', 'ts, as in cats', 'त्स', 'cz-c2'],
    ['h', 'throaty h', 'घाँटीबाट ह', 'h-k'],
    ['j', 'y, as in yes', 'य', null],
  ];
  S.soundHints = (text, max = 4) => {
    const w = String(text).toLowerCase();
    const found = [];
    for (let i = 0; i < w.length;) {
      const hit = HINTS.find(([k, , , , re]) => w.startsWith(k, i) && (!re || re.test(w.slice(i))));
      if (hit) {
        if (!found.some((f) => f[1] === hit[1])) found.push(hit);
        i += hit[0].length;
      } else i += 1;
    }
    if (!found.length) return '';
    return `<span class="hints">${found.slice(0, max).map(([k, en, ne, lab]) => {
      const inner = `<b lang="pl">${esc(k)}</b> ${S.shows('explain', 'en') ? esc(en) : ''}${S.settings.explain === 'both' ? ' · ' : ''}${S.shows('explain', 'ne') ? `<span lang="ne">${esc(ne)}</span>` : ''}`;
      return lab ? `<button type="button" class="hint-chip" data-action="go" data-to="sounds.${lab}" title="Open the sounds lab">${inner}</button>` : `<span class="hint-chip">${inner}</span>`;
    }).join('')}</span>`;
  };
  // Explanations written as {en, ne}, shown per the "explain" setting.
  S.whyHTML = (why) => {
    if (!why) return '';
    const parts = [];
    if (S.shows('explain', 'en')) parts.push(`<p>${S.markup(why.en)}</p>`);
    if (S.shows('explain', 'ne')) parts.push(`<p lang="ne">${S.markup(why.ne)}</p>`);
    return `<div class="why">${parts.join('')}</div>`;
  };
  S.transHTML = (en, ne) => {
    const parts = [];
    if (S.shows('meaning', 'en') && en) parts.push(`<span class="m-en">${esc(en)}</span>`);
    if (S.shows('meaning', 'ne') && ne) parts.push(`<span class="m-ne" lang="ne">${esc(ne)}</span>`);
    return `<span class="meaning">${parts.join('')}</span>`;
  };
  S.slowBtn = (text) => (S.canSpeak ? `<button type="button" class="btn listen slow" data-action="say" data-slow="1" data-text="${esc(text)}" title="Play slowly at 0.75× speed with preserved pitch">${S.SPEAKER} Slow (0.75×) <span lang="ne">बिस्तारै</span></button>` : '');
  S.listenBtn = (text, big) => {
    if (!S.canSpeak) return '';
    const coach = (big && S.Coach && S.Coach.coachBtn) ? S.Coach.coachBtn(text) : '';
    return big
      ? `<button type="button" class="btn listen" data-action="say" data-text="${esc(text)}">${S.SPEAKER} Listen <span lang="ne">सुन्नुहोस्</span></button>${S.slowBtn(text)}${coach}`
      : `<button type="button" class="icon-btn" data-action="say" data-text="${esc(text)}" aria-label="Listen to ${esc(text)}">${S.SPEAKER}</button>`;
  };
  S.boxMeter = (e) => {
    const b = S.boxOf(e);
    let cells = '';
    for (let i = 1; i <= S.MAX_BOX; i++) cells += `<i class="${i <= b ? 'on' : ''}"></i>`;
    return `<span class="boxes" role="img" title="Memory strength ${b} of ${S.MAX_BOX}" aria-label="Memory strength ${b} of ${S.MAX_BOX}">${cells}</span>`;
  };
  S.bar = (done, total) => {
    const pct = total ? Math.round((done / total) * 100) : 0;
    return `<span class="bar" role="progressbar" aria-label="Progress" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></span>`;
  };
  S.POLISH_KEYS = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];
  S.keysHTML = () => `<div class="keys" aria-label="Polish letters">${S.POLISH_KEYS.map((k) => `<button type="button" class="key" data-action="key" data-key="${k}">${k}</button>`).join('')}</div>`;
  S.insertKey = (ch, keyEl) => {
    const near = keyEl && keyEl.closest('.question, form, .card');
    const input = (near && near.querySelector('[data-keys-target]'))
      || (document.activeElement && /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName) ? document.activeElement : document.querySelector('[data-keys-target]'));
    if (!input || input.readOnly) return null;
    if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + ch + input.value.slice(end);
    input.focus();
    input.setSelectionRange(start + 1, start + 1);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return input;
  };

  // "Report a mistake" opens a pre-filled GitHub issue in a new tab.
  S.REPO = 'Arbin848/polish';
  
  // Star / Bookmark word to 'My words'
  S.isStarred = (pl) => {
    if (!pl) return false;
    const list = Array.isArray(S.progress.mywords) ? S.progress.mywords : [];
    return list.some(w => S.clean(w.pl) === S.clean(pl));
  };

  S.toggleStar = (entry) => {
    if (!entry || !entry.pl) return false;
    if (!Array.isArray(S.progress.mywords)) S.progress.mywords = [];
    const k = S.clean(entry.pl);
    const idx = S.progress.mywords.findIndex(w => S.clean(w.pl) === k);
    if (idx >= 0) {
      S.progress.mywords.splice(idx, 1);
      S.saveProgress();
      return false; // unstarred
    } else {
      S.progress.mywords.push({
        pl: entry.pl,
        en: entry.en || '',
        ne: entry.ne || '',
        pron: entry.pron || (S.Pron && S.Pron.of ? S.Pron.of(entry.pl).pron : ''),
        proNe: entry.proNe || (S.Pron && S.Pron.of ? S.Pron.of(entry.pl).proNe : ''),
        added: Date.now()
      });
      S.saveProgress();
      if (S.MyWords && S.MyWords.register) S.MyWords.register();
      return true; // starred
    }
  };

  S.reportLink = (what, where) => {
    const title = `Mistake: ${what}`.slice(0, 120);
    const body = `**Where:** ${where}\n**Text:** ${what}\n\n**What is wrong / what it should be:**\n\n`;
    return `https://github.com/${S.REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  };
  S.reportHTML = (what, where) => `<a class="report" href="${esc(S.reportLink(what, where))}" target="_blank" rel="noopener">Report a mistake · गल्ती रिपोर्ट गर्नुहोस्</a>`;

  // Answer checking shared by typing practice, drills and conversations.
  // Returns 'right', 'close' (only accents differ) or 'wrong'.
  S.checkAnswer = (given, answers) => {
    // "robić/zrobić" and "robić / zrobić" are the same answer.
    const norm = (x) => S.clean(x).replace(/\s*\/\s*/g, ' / ');
    const got = norm(given);
    const list = answers.map(norm);
    if (list.includes(got)) return 'right';
    if (list.map(S.stripMarks).includes(S.stripMarks(got))) return 'close';
    return 'wrong';
  };
})();
