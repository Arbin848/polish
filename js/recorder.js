// Słówka Pronunciation Studio & Voice Recorder
// Interactive voice recording, side-by-side native audio comparison,
// phonetic breakdown, and daily audio ear-training mini-quiz.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const R = (S.Recorder = {});

  // Curated pronunciation challenges with phonetic notes
  const CHALLENGES = [
    {
      cat: 'Essentials · आधारभूत',
      items: [
        { pl: 'Cześć', en: 'Hi / Bye', ne: 'नमस्ते / बाइ', tip: 'Notice the soft "ć" at the end: tongue tip down, lips spread in a smile.' },
        { pl: 'Dzień dobry', en: 'Good morning / Good day', ne: 'शुभ प्रभात / नमस्कार', tip: 'Stress "DOB-ri" on "dob-". "Dzień" has soft "dź" (tongue tip down).' },
        { pl: 'Dziękuję', en: 'Thank you', ne: 'धन्यवाद', tip: 'Final "ę" is spoken as clear "eh" (jen-KOO-yeh). Don\'t make a heavy nasal at the very end.' },
        { pl: 'Przepraszam', en: 'Excuse me / Sorry', ne: 'माफ गर्नुहोस्', tip: '"Prz" sounds like "psh" (voiceless after p). Stress is on "pra": pshe-PRA-sham.' },
        { pl: 'Proszę', en: 'Please / Here you go', ne: 'कृपया / लिनुहोस्', tip: '"sz" is dark with rounded lips; don\'t confuse with "si".' },
        { pl: 'Do widzenia', en: 'Goodbye', ne: 'फेरि भेटौँला', tip: 'Smooth rhythm: do vee-DZEH-nya. "Dze" is soft.' }
      ]
    },
    {
      cat: 'Tough Sounds & Clusters · गाह्रो ध्वनि र गुच्छा',
      items: [
        { pl: 'Szczęście', en: 'Happiness / Good luck', ne: 'खुसी / सौभाग्य', tip: 'Starts with "szcz" (sh-ch) and ends with "ście" (sh-chye). Two different s-sounds!' },
        { pl: 'Chrząszcz', en: 'Beetle (famous tongue-twister)', ne: 'भमरा (जिभ्रो बटारिने शब्द)', tip: '"Chrz" = hsh, "szcz" = shch. Said like: HSHONSHCH.' },
        { pl: 'W porządku', en: 'All right / Fine', ne: 'सबै ठीक छ', tip: 'Common everyday answer. "rz" sounds like "zh" (buzzing).' },
        { pl: 'Rzeczywiście', en: 'Indeed / Really', ne: 'साँच्चै / वास्तवमा', tip: 'Rze-chi-VEESH-chyeh. Stress on "veesh".' },
        { pl: 'Pięćdziesiąt', en: 'Fifty (50)', ne: 'पचास (५०)', tip: 'Notice the merger: pyen-JEH-shont. "ć" before "dź" blends smoothly.' },
        { pl: 'Świetnie', en: 'Great / Fantastic', ne: 'उत्कृष्ट / धेरै राम्रो', tip: 'Starts with soft smiling "ś" (SHVYET-nyeh).' }
      ]
    },
    {
      cat: 'Work & Official Poland · काम र सरकारी कार्यालय',
      items: [
        { pl: 'Urząd Wojewódzki', en: 'Voivodeship Office', ne: 'प्रान्तीय कार्यालय', tip: 'OO-zhont vo-yeh-VOOTS-kee. Final "d" becomes "t" at end of Urząd.' },
        { pl: 'Karta pobytu', en: 'Residence card', ne: 'बसोबास कार्ड', tip: 'Clear vowel "u" in pobytu (po-BI-too).' },
        { pl: 'Wózek widłowy', en: 'Forklift', ne: 'फोर्कलिफ्ट', tip: 'VOO-zek veed-WO-vi. "ł" sounds like English "w" (Nepali व).' },
        { pl: 'Zezwolenie na pracę', en: 'Work permit', ne: 'काम गर्ने अनुमति', tip: 'zeh-zvo-LEH-nyeh na PRA-tseh. Keep "ze" and "zvo" distinct.' },
        { pl: 'Kierownik zmiany', en: 'Shift supervisor', ne: 'सिफ्ट नाइके', tip: 'kye-ROV-neek ZMYA-ni. "kier" starts with a soft k-glide.' },
        { pl: 'Umowa o pracę', en: 'Employment contract', ne: 'रोजगारी सम्झौता', tip: 'oo-MO-va o PRA-tseh. Standard direct labor contract.' }
      ]
    }
  ];

  // State for recording studio
  let selected = CHALLENGES[0].items[0];
  let mediaRecorder = null;
  let audioChunks = [];
  let userAudioBlob = null;
  let userAudioUrl = null;
  let isRecording = false;
  let recordTimer = null;
  let recordSeconds = 0;
  let recognitionResult = null;
  let recordError = '';
  let activeTab = 'curated'; // 'curated' | 'sounds' | 'custom'

  // Daily Quiz State
  const QUIZ_KEY = 'slowka-daily-audio-quiz-v1';
  let quizData = null;

  function initDailyQuiz() {
    const today = S.dayKey();
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(QUIZ_KEY));
    } catch (e) {
      stored = null;
    }
    if (stored && stored.day === today) {
      quizData = stored;
      return;
    }

    // Generate 3 questions for today
    const candidates = [];
    if (Array.isArray(S.ENTRIES) && S.ENTRIES.length) {
      candidates.push(...S.ENTRIES.filter((e) => e.pl && e.en && e.pl.length < 25));
    }
    CHALLENGES.forEach((c) => candidates.push(...c.items));

    // Seeded random pick based on date
    const daySeed = today.split('-').reduce((acc, part) => acc * 31 + parseInt(part, 10), 7);
    const questions = [];
    const pool = candidates.length ? candidates : CHALLENGES[0].items;

    for (let q = 0; q < 3; q++) {
      const idx = Math.abs((daySeed * (q + 1) * 37) % pool.length);
      const target = pool[idx];
      // Pick 2 distractors
      const wrong = [];
      let step = 1;
      while (wrong.length < 2) {
        const wIdx = Math.abs((idx + step * 13) % pool.length);
        const cand = pool[wIdx];
        if (cand && cand.pl !== target.pl && !wrong.some((w) => w.pl === cand.pl)) {
          wrong.push(cand);
        }
        step++;
      }
      const choices = [
        { pl: target.pl, en: target.en, ne: target.ne, correct: true },
        { pl: wrong[0].pl, en: wrong[0].en, ne: wrong[0].ne, correct: false },
        { pl: wrong[1].pl, en: wrong[1].en, ne: wrong[1].ne, correct: false }
      ];
      // Shuffle choices
      choices.sort(() => ((daySeed + q) % 2 === 0 ? 0.5 - Math.random() : Math.random() - 0.5));
      questions.push({
        target: { pl: target.pl, en: target.en, ne: target.ne },
        choices,
        answered: null
      });
    }

    quizData = {
      day: today,
      questions,
      score: 0,
      completed: false
    };
    saveDailyQuiz();
  }

  function saveDailyQuiz() {
    try {
      localStorage.setItem(QUIZ_KEY, JSON.stringify(quizData));
    } catch (e) {
      /* ignore */
    }
  }

  // --- Voice Recorder Studio Methods ---

  R.renderStudio = (view) => {
    const word = selected.pl;
    const pron = S.Pron ? S.Pron.of(word) : { pron: selected.pron || '', proNe: selected.proNe || '' };
    const enPron = selected.pron || pron.pron || '';
    const nePron = selected.proNe || pron.proNe || '';

    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head">
        <span class="eyebrow">Pronunciation Studio · उच्चारण स्टुडियो</span>
        <h2>Voice Recorder & Audio Comparison</h2>
        <p class="hint">Record your Polish pronunciation, listen to your own voice, compare side-by-side with the native model, and check clarity.<br>
        <span lang="ne">आफ्नो आवाज रेकर्ड गर्नुहोस्, सुन्नुहोस्, र पोलिश उच्चारणसँग दाँजेर जाँच्नुहोस्।</span></p>
      </header>

      <!-- Word Selector Tabs -->
      <div class="seg chips" role="group" aria-label="Word list filter">
        <button data-action="rec-tab" data-tab="curated" aria-pressed="${activeTab === 'curated'}">Curated Challenges · महत्त्वपूर्ण शब्द</button>
        <button data-action="rec-tab" data-tab="sounds" aria-pressed="${activeTab === 'sounds'}">Sound Contrasts · ध्वनि भिन्नता</button>
        <button data-action="rec-tab" data-tab="custom" aria-pressed="${activeTab === 'custom'}">Search / Custom · खोजी / आफ्नै</button>
      </div>

      <!-- Word Selection Area -->
      <div class="card compact studio-selector-card">
        ${renderSelectorContent()}
      </div>

      <!-- Studio Workstation Card -->
      <div class="card studio-stage-card">
        <div class="studio-header">
          <span class="studio-badge">Active Word · हालको शब्द</span>
          <div class="studio-word-row">
            <h1 class="studio-target-word" lang="pl">${polish(selected.pl)}</h1>
            <button class="studio-star-btn" data-action="mywords-add" data-pl="${esc(selected.pl)}" data-en="${esc(selected.en || '')}" data-ne="${esc(selected.ne || '')}" title="Save to My Words">⭐</button>
          </div>
          <div class="studio-translations">
            <span class="m-en">${esc(selected.en || '')}</span>
            <span class="m-ne" lang="ne">${esc(selected.ne || '')}</span>
          </div>
          <div class="studio-phonetics">
            ${enPron ? `<span class="pron" title="Stressed syllable is capitalized">${esc(enPron)}</span>` : ''}
            ${nePron ? `<span class="pron ne" lang="ne" title="जोड दिइएको अक्षर">${esc(nePron)}</span>` : ''}
          </div>
        </div>

        ${selected.tip ? `
          <div class="studio-tip-box">
            <span class="tip-icon">💡</span>
            <div class="tip-text">
              <strong>Pronunciation Guide:</strong> ${esc(selected.tip)}
            </div>
          </div>` : ''}

        <!-- Audio Comparison Controls -->
        <div class="studio-controls-panel">
          <!-- Step 1: Native Polish Model -->
          <div class="studio-track-card native-track">
            <div class="track-info">
              <span class="track-icon">🇵🇱</span>
              <div>
                <strong>1. Native Polish Model</strong>
                <small>Listen to native pronunciation · सही उच्चारण सुन्नुहोस्</small>
              </div>
            </div>
            <div class="track-actions">
              <button class="btn primary studio-play-btn" data-action="say" data-text="${esc(selected.pl)}">
                🔊 Listen (Normal)
              </button>
              <button class="btn studio-play-btn" data-action="rec-play-slow" data-text="${esc(selected.pl)}">
                🐢 Listen (Slow)
              </button>
            </div>
          </div>

          <!-- Step 2: User Voice Recording -->
          <div class="studio-track-card user-track ${isRecording ? 'recording' : ''} ${userAudioUrl ? 'has-audio' : ''}">
            <div class="track-info">
              <span class="track-icon">${isRecording ? '🔴' : '🎙️'}</span>
              <div>
                <strong>2. Your Voice Recording</strong>
                <small>${isRecording ? `Recording… ${recordSeconds}s (speak now)` : userAudioUrl ? 'Recording ready to play!' : 'Tap record and say the Polish word'}</small>
              </div>
            </div>

            <div class="track-actions">
              ${!isRecording ? `
                <button class="btn ${userAudioUrl ? '' : 'primary'} studio-rec-btn" data-action="rec-start">
                  🎙️ ${userAudioUrl ? 'Record Again' : 'Record My Voice'}
                </button>
              ` : `
                <button class="btn danger studio-stop-btn" data-action="rec-stop">
                  ⏹️ Stop Recording (${recordSeconds}s)
                </button>
              `}

              ${userAudioUrl && !isRecording ? `
                <button class="btn studio-play-user-btn" data-action="rec-play-user">
                  🎧 Play My Voice
                </button>
              ` : ''}
            </div>

            ${recordError ? `<div class="studio-error-msg" role="alert">⚠️ ${esc(recordError)}</div>` : ''}
          </div>

          <!-- Step 3: Side-by-Side Comparison -->
          ${userAudioUrl && !isRecording ? `
            <div class="studio-compare-bar">
              <button class="btn good studio-duo-btn" data-action="rec-play-both">
                🔁 Compare Both (Native then You)
              </button>
            </div>
          ` : ''}
        </div>

        <!-- Recognition Score Badge -->
        ${recognitionResult ? `
          <div class="studio-score-banner ${recognitionResult.score >= 0.8 ? 'excellent' : recognitionResult.score >= 0.5 ? 'good' : 'try-again'}">
            <div class="score-dial">
              <span class="score-pct">${Math.round(recognitionResult.score * 100)}%</span>
              <span class="score-label">Clarity Score</span>
            </div>
            <div class="score-details">
              <strong>${recognitionResult.score >= 0.8 ? 'Świetnie! Great Polish accent' : recognitionResult.score >= 0.5 ? 'Dobrze! Understandable, keep polishing' : 'Close! Listen to the native model again'}</strong>
              <p>Speech recognizer heard: <b lang="pl">${esc(recognitionResult.heard || '(quiet)')}</b></p>
              <small lang="ne">${recognitionResult.score >= 0.8 ? 'तपाईंको उच्चारण प्रस्ट र उत्कृष्ट छ!' : 'नजिक छ, नेटिभ आवाज सुनेर फेरि दोहोर्‍याउनुहोस्।'}</small>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  };

  function renderSelectorContent() {
    if (activeTab === 'curated') {
      return CHALLENGES.map((cat) => `
        <div class="studio-cat-group">
          <span class="label">${esc(cat.cat)}</span>
          <div class="chip-row">
            ${cat.items.map((it) => `
              <button class="chip-btn ${selected.pl === it.pl ? 'active' : ''}" data-action="rec-select-word" data-pl="${esc(it.pl)}">
                <b lang="pl">${polish(it.pl)}</b> <small>${esc(it.en)}</small>
              </button>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    if (activeTab === 'sounds') {
      const sounds = (window.SLOWKA_SOUNDS || []).slice(0, 8);
      return `
        <span class="label">Minimal Pair Contrasts · ध्वनि अभ्यास जोडी</span>
        <div class="studio-pairs-grid">
          ${sounds.map((s) => `
            <div class="sound-pair-card">
              <strong>${esc(s.title)} <small lang="ne">${esc(s.titleNe || '')}</small></strong>
              <div class="pair-words">
                ${s.pairs.slice(0, 3).map(([wa, wb]) => `
                  <div class="mini-pair-row">
                    <button class="mini-word-chip ${selected.pl === wa[0] ? 'active' : ''}" data-action="rec-select-custom" data-pl="${esc(wa[0])}" data-en="${esc(wa[1])}" data-ne="${esc(wa[2] || '')}">
                      <b lang="pl">${polish(wa[0])}</b>
                    </button>
                    <span class="vs">vs</span>
                    <button class="mini-word-chip ${selected.pl === wb[0] ? 'active' : ''}" data-action="rec-select-custom" data-pl="${esc(wb[0])}" data-en="${esc(wb[1])}" data-ne="${esc(wb[2] || '')}">
                      <b lang="pl">${polish(wb[0])}</b>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Custom / Search
    return `
      <span class="label">Custom Word or Search · आफ्नै शब्द टाइप गर्नुहोस्</span>
      <form class="studio-custom-form" data-action="rec-custom-submit" onsubmit="return false;">
        <input type="text" id="rec-custom-input" class="studio-search-input" placeholder="e.g. jabłko, dziękuję, chrząszcz…" autocomplete="off" />
        <button class="btn primary" type="submit" data-action="rec-custom-go">Load Word · लोड गर्नुहोस्</button>
      </form>
      ${(S.progress.mywords || []).length ? `
        <div style="margin-top: 12px;">
          <span class="label">From My Words · मेरा शब्दबाट</span>
          <div class="chip-row">
            ${(S.progress.mywords || []).slice(0, 8).map((w) => `
              <button class="chip-btn ${selected.pl === w.pl ? 'active' : ''}" data-action="rec-select-custom" data-pl="${esc(w.pl)}" data-en="${esc(w.en || '')}" data-ne="${esc(w.ne || '')}">
                <b lang="pl">${polish(w.pl)}</b>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  // --- Audio Recording Logic via MediaRecorder API ---

  async function startRecording() {
    recordError = '';
    recognitionResult = null;
    audioChunks = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      recordError = 'Microphone access is not supported in this browser. Please use Chrome, Edge, Safari, or Firefox.';
      S.render();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        if (audioChunks.length) {
          userAudioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
          if (userAudioUrl) URL.revokeObjectURL(userAudioUrl);
          userAudioUrl = URL.createObjectURL(userAudioBlob);
        }
        isRecording = false;
        clearInterval(recordTimer);
        S.render();
      };

      mediaRecorder.start();
      isRecording = true;
      recordSeconds = 0;
      recordTimer = setInterval(() => {
        recordSeconds++;
        const timerEl = document.querySelector('.studio-stop-btn');
        if (timerEl) timerEl.textContent = `⏹️ Stop Recording (${recordSeconds}s)`;
        if (recordSeconds >= 12) {
          stopRecording();
        }
      }, 1000);

      // Concurrently run speech recognition if available
      if (S.recognize) {
        runSpeechRecognition(selected.pl);
      }

      S.render();
    } catch (err) {
      recordError = err.name === 'NotAllowedError' ? 'Microphone access was denied. Please allow microphone permissions in your browser.' : `Could not access microphone: ${err.message || err}`;
      isRecording = false;
      S.render();
    }
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      try {
        mediaRecorder.stop();
      } catch (e) {
        /* ignore */
      }
    }
    isRecording = false;
    clearInterval(recordTimer);
    if (S.stopRecognition) S.stopRecognition();
  }

  async function runSpeechRecognition(expectedText) {
    try {
      const alts = await S.recognize();
      let best = { heard: alts[0] || '', score: 0 };
      for (const a of alts) {
        const sc = S.similarity(a, expectedText);
        if (sc > best.score) best = { heard: a, score: sc };
      }
      recognitionResult = best;
      if (S.recordSpeech && expectedText.split(/\s+/).length <= 2) {
        S.recordSpeech(expectedText, best.score);
      }
      S.render();
    } catch (e) {
      // Speech recognition might fail silently without interrupting audio blob
    }
  }

  function playUserAudio() {
    if (!userAudioUrl) return;
    const a = new Audio(userAudioUrl);
    a.play().catch(() => {});
  }

  function playBothAudio() {
    if (!userAudioUrl) return;
    S.speak(selected.pl);
    setTimeout(() => {
      playUserAudio();
    }, 1400);
  }

  // --- Daily Audio Ear-Training Quiz Widget ---

  R.renderQuizWidget = () => {
    initDailyQuiz();
    if (!quizData || !quizData.questions.length) return '';

    const currentQIdx = quizData.questions.findIndex((q) => q.answered == null);
    const isFinished = currentQIdx === -1;
    const q = isFinished ? null : quizData.questions[currentQIdx];

    return `
      <section class="card compact daily-quiz-card" id="daily-audio-quiz-widget">
        <div class="daily-quiz-head">
          <div class="dq-title-row">
            <span class="dq-badge">🎧 Daily Ear-Trainer · दैनिक अडियो क्विज</span>
            <span class="dq-score">Score: ${quizData.score} / ${quizData.questions.length}</span>
          </div>
          <p class="hint">Listen to the Polish audio clip and choose the correct meaning or word.<br>
          <span lang="ne">अडियो सुन्नुहोस् र सही उत्तर छान्नुहोस्।</span></p>
        </div>

        ${!isFinished ? `
          <div class="dq-body">
            <div class="dq-audio-prompt">
              <button class="btn primary dq-listen-btn" data-action="rec-quiz-play" data-text="${esc(q.target.pl)}" aria-label="Play audio">
                ▶️ Play Polish Audio Clip (सुन्नुहोस्)
              </button>
              <small class="hint">Tap button to hear the Polish word</small>
            </div>

            <div class="dq-options-grid">
              ${q.choices.map((ch, idx) => `
                <button class="dq-choice-btn" data-action="rec-quiz-answer" data-qidx="${currentQIdx}" data-cidx="${idx}">
                  <span class="dq-choice-num">${idx + 1}</span>
                  <div class="dq-choice-text">
                    <b lang="pl">${polish(ch.pl)}</b>
                    <small>${esc(ch.en)} · <span lang="ne">${esc(ch.ne || '')}</span></small>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="dq-finished-banner">
            <span class="dq-congrats-icon">🎉</span>
            <div class="dq-congrats-text">
              <strong>Daily Ear-Trainer Completed! · आजको क्विज सकियो!</strong>
              <p>You scored ${quizData.score} of ${quizData.questions.length} correct. Spaced repetition streak updated!</p>
            </div>
            <button class="btn" data-action="rec-quiz-reset">↺ Try again · फेरि</button>
          </div>
        `}
      </section>
    `;
  };

  // --- Actions Handler ---

  R.action = (a, el) => {
    switch (a) {
      case 'rec-tab':
        activeTab = el.dataset.tab;
        S.render();
        return true;

      case 'rec-select-word': {
        const pl = el.dataset.pl;
        for (const cat of CHALLENGES) {
          const found = cat.items.find((i) => i.pl === pl);
          if (found) {
            selected = found;
            userAudioBlob = null;
            userAudioUrl = null;
            recognitionResult = null;
            recordError = '';
            break;
          }
        }
        S.render();
        return true;
      }

      case 'rec-select-custom': {
        selected = {
          pl: el.dataset.pl,
          en: el.dataset.en || '',
          ne: el.dataset.ne || '',
          tip: 'Focus on clear pronunciation, natural stress, and vowel clarity.'
        };
        userAudioBlob = null;
        userAudioUrl = null;
        recognitionResult = null;
        recordError = '';
        S.render();
        return true;
      }

      case 'rec-custom-submit':
      case 'rec-custom-go': {
        const input = document.getElementById('rec-custom-input');
        const val = input ? input.value.trim() : '';
        if (val) {
          const lex = S.LEXICON ? S.LEXICON.get(val) : null;
          selected = {
            pl: val,
            en: lex ? lex.en : '',
            ne: lex ? lex.ne : '',
            tip: 'Work out pronunciation using Polish phonetic rules. Stress the second-to-last syllable.'
          };
          userAudioBlob = null;
          userAudioUrl = null;
          recognitionResult = null;
          recordError = '';
          S.render();
        }
        return true;
      }

      case 'rec-play-slow': {
        const text = el.dataset.text || selected.pl;
        if (S.speak) {
          const prevSlow = S.settings.slow;
          S.settings.slow = true;
          S.speak(text);
          setTimeout(() => { S.settings.slow = prevSlow; }, 1500);
        }
        return true;
      }

      case 'rec-start':
        startRecording();
        return true;

      case 'rec-stop':
        stopRecording();
        return true;

      case 'rec-play-user':
        playUserAudio();
        return true;

      case 'rec-play-both':
        playBothAudio();
        return true;

      case 'rec-quiz-play': {
        const text = el.dataset.text;
        if (text && S.speak) S.speak(text);
        return true;
      }

      case 'rec-quiz-answer': {
        const qidx = parseInt(el.dataset.qidx, 10);
        const cidx = parseInt(el.dataset.cidx, 10);
        if (quizData && quizData.questions[qidx] && quizData.questions[qidx].answered == null) {
          const q = quizData.questions[qidx];
          const chosen = q.choices[cidx];
          q.answered = chosen;
          if (chosen.correct) {
            quizData.score++;
            S.logActivity();
            if (S.Celebration && S.Celebration.playChime) S.Celebration.playChime();
          }
          if (quizData.questions.every((item) => item.answered != null)) {
            quizData.completed = true;
          }
          saveDailyQuiz();
          S.render();
        }
        return true;
      }

      case 'rec-quiz-reset': {
        try { localStorage.removeItem(QUIZ_KEY); } catch (e) {}
        initDailyQuiz();
        S.render();
        return true;
      }

      default:
        return false;
    }
  };

  R.reset = () => {
    stopRecording();
  };
})();
