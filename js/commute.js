// Słówka Commute & Hands-free Audio Mode
// Loops through vocabulary automatically with natural audio, pauses for speaking, and bilingual translations.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const C = (S.Commute = {});

  let state = {
    running: false,
    timer: null,
    pool: [],
    idx: 0,
    source: 'due', // 'due' | 'level' | 'unit'
    level: 'A1',
    unitId: null,
    pauseSeconds: 2.5,
    speakMeaning: true,
    pocketMode: false,
    step: 'idle', // 'pl' | 'gap' | 'meaning' | 'wait'
    loopToken: 0,
  };

  C.getState = () => state;

  function buildPool() {
    if (state.source === 'due') {
      const due = S.dueList();
      if (due.length) return due;
      // If no due words, fallback to current level or first 20 words
      const curL = S.getProficiencyLevel ? S.getProficiencyLevel().id : 'A1';
      const lvlUnits = S.COURSE.filter((u) => u.level === curL);
      const pool = lvlUnits.flatMap((u) => u.entries);
      return pool.slice(0, 30);
    }
    if (state.source === 'level') {
      const lvlUnits = S.COURSE.filter((u) => u.level === state.level);
      return lvlUnits.flatMap((u) => u.entries);
    }
    if (state.source === 'unit') {
      const u = S.UNIT.get(state.unitId) || S.COURSE[0];
      return u ? u.entries : [];
    }
    return S.ENTRIES.slice(0, 30);
  }

  function stop() {
    state.running = false;
    state.loopToken++;
    if (state.timer) clearTimeout(state.timer);
    state.timer = null;
    state.step = 'idle';
    S.stopSpeaking();
    updateUI();
  }


  function next() {
    if (!state.pool.length) return;
    clearTimeout(state.timer);
    state.idx = (state.idx + 1) % state.pool.length;
    if (state.running) playCurrent();
    else updateUI();
  }

  function prev() {
    if (!state.pool.length) return;
    clearTimeout(state.timer);
    state.idx = (state.idx - 1 + state.pool.length) % state.pool.length;
    if (state.running) playCurrent();
    else updateUI();
  }

  function playCurrent() {
    if (!state.running || !state.pool.length) return;
    const token = ++state.loopToken;
    const e = state.pool[state.idx];
    if (!e) {
      state.idx = 0;
      if (!state.pool.length) { stop(); return; }
    }
    const curEntry = state.pool[state.idx];
    state.step = 'pl';
    updateUI();

    // Update Navigator MediaSession for Lockscreen / Headphone buttons
    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: curEntry.pl,
          artist: 'Słówka Polish Audio · ' + (curEntry.en || ''),
          album: 'Commute Review (' + (state.idx + 1) + '/' + state.pool.length + ')',
          artwork: [
            { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
          ]
        });
        navigator.mediaSession.setActionHandler('play', () => start());
        navigator.mediaSession.setActionHandler('pause', () => stop());
        navigator.mediaSession.setActionHandler('nexttrack', () => { next(); });
        navigator.mediaSession.setActionHandler('previoustrack', () => { prev(); });
      } catch (err) {}
    }

    // 1. Play Polish native audio / TTS
    S.speak(curEntry.pl, false);

    // Approximate duration or audio play time
    const plDuration = Math.max(1200, (curEntry.pl.length * 90));

    state.timer = setTimeout(() => {
      if (token !== state.loopToken || !state.running) return;
      // 2. Pause gap for the learner to repeat aloud
      state.step = 'gap';
      updateUI();

      state.timer = setTimeout(() => {
        if (token !== state.loopToken || !state.running) return;

        // 3. Optionally speak English/Nepali translation
        if (state.speakMeaning && ('speechSynthesis' in window)) {
          state.step = 'meaning';
          updateUI();
          try {
            const explainLang = S.settings.explain || 'both';
            const textToSpeak = explainLang === 'ne' ? (curEntry.ne || curEntry.en) : curEntry.en;
            if (textToSpeak) {
              const u = new SpeechSynthesisUtterance(textToSpeak);
              u.lang = explainLang === 'ne' ? 'ne-NP' : 'en-US';
              u.rate = 1.0;
              window.speechSynthesis.speak(u);
            }
          } catch (err) {}
        }

        const meaningDelay = state.speakMeaning ? 1800 : 400;
        state.timer = setTimeout(() => {
          if (token !== state.loopToken || !state.running) return;
          // Advance to next word
          state.idx = (state.idx + 1) % state.pool.length;
          playCurrent();
        }, meaningDelay);

      }, state.pauseSeconds * 1000);

    }, plDuration);
  }

  function start() {
    state.pool = buildPool();
    if (!state.pool.length) {
      const stepBadge = document.getElementById('commute-step-badge');
      if (stepBadge) {
        stepBadge.textContent = 'No words found in this section · कुनै शब्द छैन';
        stepBadge.className = 'commute-badge ready';
      }
      return;
    }
    state.running = true;
    if (state.idx >= state.pool.length) state.idx = 0;
    updateUI();
    playCurrent();
  }

  function toggle() {
    if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {}
    if (state.running) stop();
    else start();
  }

  function next() {
    if (!state.pool.length) state.pool = buildPool();
    if (!state.pool.length) return;
    state.idx = (state.idx + 1) % state.pool.length;
    if (state.running) {
      state.loopToken++;
      if (state.timer) clearTimeout(state.timer);
      playCurrent();
    } else {
      updateUI();
    }
  }

  function prev() {
    if (!state.pool.length) state.pool = buildPool();
    if (!state.pool.length) return;
    state.idx = (state.idx - 1 + state.pool.length) % state.pool.length;
    if (state.running) {
      state.loopToken++;
      if (state.timer) clearTimeout(state.timer);
      playCurrent();
    } else {
      updateUI();
    }
  }

  function updateUI() {
    const view = document.getElementById('view');
    if (!view || S.route.name !== 'commute') return;
    const playBtn = document.getElementById('commute-play-btn');
    const playIcon = document.getElementById('commute-play-icon');
    const playText = document.getElementById('commute-play-text');
    const stepBadge = document.getElementById('commute-step-badge');
    const cardEl = document.getElementById('commute-active-card');
    const waveEl = document.getElementById('commute-waveform');
    const countEl = document.getElementById('commute-count');

    if (playBtn) {
      playBtn.setAttribute('aria-pressed', state.running ? 'true' : 'false');
      if (playIcon) playIcon.textContent = state.running ? '⏸' : '▶';
      if (playText) playText.textContent = state.running ? 'Pause loop · रोक्नुहोस्' : 'Start loop · सुरु गर्नुहोस्';
    }

    if (waveEl) {
      waveEl.classList.toggle('active', state.running && (state.step === 'pl' || state.step === 'meaning'));
    }

    if (countEl && state.pool.length) {
      countEl.textContent = `${state.idx + 1} / ${state.pool.length}`;
    }

    if (stepBadge) {
      if (!state.running) {
        stepBadge.textContent = 'Ready · तयार';
        stepBadge.className = 'commute-badge ready';
      } else if (state.step === 'pl') {
        stepBadge.textContent = '🎧 Listen (Polish) · सुन्नुहोस्';
        stepBadge.className = 'commute-badge pl';
      } else if (state.step === 'gap') {
        stepBadge.textContent = '🗣️ Your turn to repeat! · दोहोर्‍याउनुहोस्';
        stepBadge.className = 'commute-badge repeat';
      } else if (state.step === 'meaning') {
        stepBadge.textContent = '💡 Meaning · अर्थ';
        stepBadge.className = 'commute-badge meaning';
      }
    }

    if (cardEl && state.pool.length) {
      const e = state.pool[state.idx];
      if (e) {
        cardEl.innerHTML = `
          <div class="commute-pl" lang="pl">${polish(e.pl)}</div>
          <div class="commute-pron">${S.pronHTML(e)}</div>
          <div class="commute-meaning">${S.meaningHTML(e, 'big')}</div>
        `;
      }
    }
  }

  C.render = (view) => {
    state.pool = buildPool();
    const dueCount = S.dueList().length;
    const curEntry = state.pool[state.idx] || state.pool[0] || { pl: 'Dzień dobry', en: 'Good morning', ne: 'शुभ प्रभात' };

    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head">
        <span class="eyebrow">Audio Loop · हेडफोन अभ्यास</span>
        <h2>Commute & Hands-free Mode</h2>
        <p class="unit-head-ne" lang="ne">यात्रा र कामको बेला सुन्ने अभ्यास (ह्यान्ड्स-फ्री)</p>
        <p class="hint">Continuous audio playback for walks, bus rides, or while working. The app speaks the Polish word, pauses so you can repeat it aloud, and speaks the meaning in your language.<br>
        <span lang="ne">बस, हिंड्दा वा काम गर्दा मोबाइल नछोई सुन्नुहोस्। पोलिश शब्द बोल्छ, दोहोर्‍याउन समय दिन्छ, र नेपाली/अंग्रेजी अर्थ भन्छ।</span></p>
      </header>

      <div class="commute-container ${state.pocketMode ? 'pocket-dim' : ''}">
        <!-- Source Selector -->
        <div class="commute-controls-bar">
          <div class="commute-sources" role="group" aria-label="Audio loop source">
            <button class="source-chip ${state.source === 'due' ? 'active' : ''}" data-action="commute-source" data-source="due">
              <span>⏱️ Due reviews (${dueCount})</span>
            </button>
            <button class="source-chip ${state.source === 'level' && state.level === 'A1' ? 'active' : ''}" data-action="commute-source" data-source="level" data-level="A1">
              <span>📗 Level A1</span>
            </button>
            <button class="source-chip ${state.source === 'level' && state.level === 'A2' ? 'active' : ''}" data-action="commute-source" data-source="level" data-level="A2">
              <span>📘 Level A2</span>
            </button>
            <button class="source-chip ${state.source === 'level' && state.level === 'Work' ? 'active' : ''}" data-action="commute-source" data-source="level" data-level="Work">
              <span>💼 Polish for Work</span>
            </button>
          </div>

          <div class="commute-options">
            <label class="commute-toggle-label">
              <input type="checkbox" id="commute-meaning-toggle" ${state.speakMeaning ? 'checked' : ''} data-action="commute-meaning">
              <span>Speak meanings · अर्थ पनि बोल्ने</span>
            </label>
            <button type="button" class="chip-btn commute-pocket-btn ${state.pocketMode ? 'active' : ''}" data-action="commute-pocket" title="OLED black battery saver screen">
              🌙 Pocket Mode
            </button>
            <div class="commute-pause-picker">
              <span>Pause gap:</span>
              <button class="chip-btn ${state.pauseSeconds === 1.5 ? 'current' : ''}" data-action="commute-pause" data-sec="1.5">1.5s</button>
              <button class="chip-btn ${state.pauseSeconds === 2.5 ? 'current' : ''}" data-action="commute-pause" data-sec="2.5">2.5s</button>
              <button class="chip-btn ${state.pauseSeconds === 4.0 ? 'current' : ''}" data-action="commute-pause" data-sec="4.0">4.0s</button>
            </div>
          </div>
        </div>

        <!-- Big Display Card -->
        <div class="commute-stage-card">
          <div class="commute-top-status">
            <span class="commute-badge ready" id="commute-step-badge">${state.running ? 'Running' : 'Ready · तयार'}</span>
            <span class="commute-counter" id="commute-count">${state.idx + 1} / ${state.pool.length}</span>
          </div>

          <!-- Soundwave Animation -->
          <div class="commute-waveform ${state.running ? 'active' : ''}" id="commute-waveform" aria-hidden="true">
            <span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span>
            <span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span>
          </div>

          <div class="commute-active-content" id="commute-active-card">
            <div class="commute-pl" lang="pl">${polish(curEntry.pl)}</div>
            <div class="commute-pron">${S.pronHTML(curEntry)}</div>
            <div class="commute-meaning">${S.meaningHTML(curEntry, 'big')}</div>
          </div>

          <!-- Player Controls -->
          <div class="commute-player-dock">
            <button class="commute-nav-btn prev" data-action="commute-prev" title="Previous word (Left arrow)">⏮</button>
            <button class="commute-main-btn" id="commute-play-btn" data-action="commute-toggle" title="Play / Pause (Spacebar)">
              <span class="commute-play-icon" id="commute-play-icon">${state.running ? '⏸' : '▶'}</span>
              <span class="commute-play-text" id="commute-play-text">${state.running ? 'Pause loop · रोक्नुहोस्' : 'Start loop · सुरु गर्नुहोस्'}</span>
            </button>
            <button class="commute-nav-btn next" data-action="commute-next" title="Next word (Right arrow)">⏭</button>
          </div>
        </div>
      </div>
    `;
  };

  C.action = (a, el) => {
    switch (a) {
      case 'commute-toggle': toggle(); return true;
      case 'commute-next': next(); return true;
      case 'commute-prev': prev(); return true;
      case 'commute-source': {
        stop();
        state.source = el.dataset.source;
        if (el.dataset.level) state.level = el.dataset.level;
        state.idx = 0;
        state.pool = buildPool();
        C.render(document.getElementById('view'));
        return true;
      }
      case 'commute-pocket': {
        state.pocketMode = !state.pocketMode;
        const container = document.querySelector('.commute-container');
        if (container) container.classList.toggle('pocket-dim', state.pocketMode);
        el.classList.toggle('active', state.pocketMode);
        return true;
      }
      case 'commute-meaning': {
        state.speakMeaning = el.checked;
        return true;
      }
      case 'commute-pause': {
        state.pauseSeconds = parseFloat(el.dataset.sec) || 2.5;
        document.querySelectorAll('.commute-pause-picker .chip-btn').forEach((b) => {
          b.classList.toggle('current', b === el);
        });
        return true;
      }
      default: return false;
    }
  };


  // Auto-recovery guard on visibilitychange: ensure audio playback continues smoothly
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.running) {
      updateUI();
    }
  });

  C.stop = stop;
})();
