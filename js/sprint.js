// Słówka Audio Sprint (Audio Pop): Rapid 5-second listening challenge.
// Trains workers to recognize spoken Polish immediately without freezing.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const Sprint = (S.AudioSprint = {});

  let round = 0;
  const TOTAL_ROUNDS = 10;
  let score = 0;
  let combo = 0;
  let maxCombo = 0;
  let currentTarget = null;
  let options = [];
  let answerState = null; // null | 'correct' | 'wrong' | 'timeout'
  let timer = null;
  let timeLimit = Number(localStorage.getItem('slowka-sprint-limit') || 5.0); // 5.0s standard | 3.5s pro
  let timeLeft = timeLimit;
  let timerInterval = null;
  let gameOver = false;
  let answered = false;

  Sprint.start = (view) => {
    clearInterval(timerInterval);
    round = 0;
    score = 0;
    combo = 0;
    maxCombo = 0;
    gameOver = false;
    nextQuestion(view);
  };

  function nextQuestion(view) {
    if (round >= TOTAL_ROUNDS) {
      endGame(view);
      return;
    }
    round += 1;
    answered = false;
    answerState = null;
    timeLimit = Number(localStorage.getItem('slowka-sprint-limit') || 5.0);
    timeLeft = timeLimit;

    // Filter clear words with Nepali translations
    const pool = S.ENTRIES.filter((e) => e.pl && e.ne && e.pl.length < 24 && e.ne.length < 24);
    currentTarget = pool[Math.floor(Math.random() * pool.length)];

    // 3 distinct distractors
    const distractors = S.shuffle(pool.filter((e) => e.pl !== currentTarget.pl)).slice(0, 3);
    options = S.shuffle([currentTarget, ...distractors]);

    // Speak word immediately
    setTimeout(() => {
      if (currentTarget && S.speak) S.speak(currentTarget.pl);
    }, 150);

    // 5-second countdown timer
    clearInterval(timerInterval);
    const startTs = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = (Date.now() - startTs) / 1000;
      timeLeft = Math.max(0, 5.0 - elapsed);
      const bar = document.getElementById('sprint-time-bar');
      const text = document.getElementById('sprint-time-text');
      if (bar) bar.style.width = `${(timeLeft / 5.0) * 100}%`;
      if (text) text.textContent = `${timeLeft.toFixed(1)}s`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeout(view);
      }
    }, 50);

    Sprint.render(view);
  }

  function handleTimeout(view) {
    if (answered) return;
    answered = true;
    answerState = 'timeout';
    combo = 0;
    if (navigator.vibrate) try { navigator.vibrate([40, 60, 40]); } catch (e) {}
    Sprint.render(view);
    setTimeout(() => nextQuestion(view), 1400);
  }

  function handlePick(pl, view) {
    if (answered || gameOver) return;
    answered = true;
    clearInterval(timerInterval);

    if (pl === currentTarget.pl) {
      // Correct!
      combo += 1;
      if (combo > maxCombo) maxCombo = combo;
      const speedBonus = Math.round(timeLeft * 4); // up to +20 speed bonus
      const comboMultiplier = combo > 4 ? 3 : combo > 2 ? 2 : 1;
      const roundPoints = (15 + speedBonus) * comboMultiplier;
      score += roundPoints;
      answerState = 'correct';
      if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {}
    } else {
      // Mistake
      combo = 0;
      answerState = 'wrong';
      if (navigator.vibrate) try { navigator.vibrate([35, 45, 35]); } catch (e) {}
    }

    Sprint.render(view);
    setTimeout(() => nextQuestion(view), 1200);
  }

  function endGame(view) {
    gameOver = true;
    clearInterval(timerInterval);
    const best = Number(localStorage.getItem('slowka-sprint-best') || 0);
    if (score > best) localStorage.setItem('slowka-sprint-best', score);

    if (S.Celebration && S.Celebration.fire) {
      S.Celebration.fire('sprint', {
        icon: '🎧',
        title: `Audio Sprint Completed!`,
        titleNe: `स्कोर: ${score} अंक!`,
        desc: `You caught ${Math.round((score / 350) * 10)} / 10 words at fast speed. Max combo: ${maxCombo}x!`
      });
    }
    Sprint.render(view);
  }

  Sprint.render = (view) => {
    if (!view) return;
    const best = Number(localStorage.getItem('slowka-sprint-best') || 0);

    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head">
        <span class="eyebrow">🎧 Fast Polish Ears · द्रुत सुनाइ खेल</span>
        <h2>Audio Sprint (5-Sec Challenge)</h2>
        <p class="unit-head-ne" lang="ne">सुनेर ५ सेकेन्डमा अर्थ छान्नुहोस् — बोली बुझ्ने क्षमता बढाउनुहोस्</p>
      </header>

      ${gameOver ? `
        <div class="card summary flip-in" style="text-align:center; padding:32px 20px; border-radius:18px;">
          <span style="font-size:3.5rem; line-height:1;">🎧</span>
          <h2 style="margin:12px 0 4px;">Sprint Finished! · खेल सकियो</h2>
          <p class="hint">Your Score: <b style="font-size:1.3rem; color:var(--accent);">${score} pts</b> · Max Combo: <b>${maxCombo}🔥</b></p>
          <p style="margin:8px 0 16px; font-size:0.92rem; color:var(--muted);" lang="ne">
            ${score > 200 ? 'उत्कृष्ट! तपाईंको सुनाइ क्षमता काममा सिफ्ट सम्हाल्न तयार छ!' : 'राम्रो प्रयास! दैनिक अभ्यासले वास्तविक बोली सुन्ने बानी बस्छ।'}
          </p>
          <div class="row" style="justify-content:center; gap:12px; margin-top:20px;">
            <button class="btn primary" data-action="sprint-restart">Play Again · फेरि खेल्नुहोस् ↺</button>
            <button class="btn" data-action="go" data-to="practice">Back to Practice →</button>
          </div>
        </div>
      ` : `
        <!-- Game HUD -->
        <div class="card" style="margin-bottom:14px; padding:14px 18px; border-radius:16px; border:1.5px solid var(--accent); background:var(--surface);">
          <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700; margin-bottom:8px;">
            <span>Question ${round} of ${TOTAL_ROUNDS}</span>
            <span style="color:#d97706;">${combo > 1 ? `🔥 ${combo}× Combo!` : ''}</span>
            <span style="font-family:var(--font-mono); color:var(--accent); font-size:1.15rem;">${score} pts</span>
          </div>
          <!-- Animated Progress Countdown Bar -->
          <div style="width:100%; height:8px; background:var(--sunk); border-radius:4px; overflow:hidden;">
            <div id="sprint-time-bar" style="width:${(timeLeft / timeLimit) * 100}%; height:100%; background:var(--accent); transition:width 0.05s linear;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--muted); margin-top:6px;">
            <span id="sprint-time-text">${timeLeft.toFixed(1)}s</span>
            <div style="display:flex; align-items:center; gap:6px;">
              <button type="button" class="btn compact" data-action="sprint-toggle-limit" style="font-size:0.7rem; padding:2px 8px; border-radius:10px;">
                ⚡ Pace: <b>${timeLimit === 3.5 ? 'Pro (3.5s)' : 'Standard (5s)'}</b>
              </button>
              <span>🏆 Best: ${Math.max(score, best)}</span>
            </div>
          </div>
        </div>

        <!-- Speaker Center Button -->
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px; margin:20px 0 24px;">
          <button type="button" class="btn" data-action="sprint-replay"
            style="width:84px; height:84px; border-radius:50%; background:var(--surface); border:2.5px solid var(--accent); box-shadow:0 6px 20px -4px rgba(200, 16, 46, 0.3); font-size:2.2rem; display:grid; place-items:center; cursor:pointer;"
            title="Tap to listen again">
            🔊
          </button>
          <span style="font-size:0.85rem; font-weight:700; color:var(--muted);">Tap 🔊 to replay audio · फेरि सुन्नुहोस्</span>
          ${answered ? `
            <div style="margin-top:4px; font-size:1.15rem; font-weight:800; color:${answerState === 'correct' ? 'var(--good)' : 'var(--accent)'};">
              <span lang="pl">${polish(currentTarget.pl)}</span> = <span lang="ne">${esc(currentTarget.ne)}</span>
            </div>
          ` : ''}
        </div>

        <!-- 4 Fast Tap Choices -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
          ${options.map((opt) => {
            let stateClass = '';
            let style = 'min-height:64px; padding:12px 14px; border-radius:14px; border:1.5px solid var(--line); background:var(--surface); font-weight:700; font-size:0.98rem; text-align:center; cursor:pointer; transition:all 0.12s ease;';
            if (answered) {
              if (opt.pl === currentTarget.pl) {
                style += 'border-color:var(--good); background:#ecfdf5; color:#065f46; font-weight:800;';
              } else {
                style += 'opacity:0.4; pointer-events:none;';
              }
            }
            return `
              <button type="button" class="sprint-opt-btn" data-action="sprint-pick" data-pl="${esc(opt.pl)}"
                ${answered ? 'disabled' : ''} style="${style}">
                <span lang="ne">${esc(opt.ne)}</span>
                <small style="display:block; font-size:0.75rem; font-weight:400; opacity:0.75; margin-top:2px;">${esc(opt.en)}</small>
              </button>
            `;
          }).join('')}
        </div>
      `}
    `;
  };

  Sprint.action = (a, el, view) => {
    switch (a) {
      case 'sprint-start':
      case 'sprint-restart': {
        Sprint.start(view);
        return true;
      }
      case 'sprint-replay': {
        if (currentTarget && S.speak) S.speak(currentTarget.pl);
        return true;
      }
      case 'sprint-pick': {
        const pl = el.dataset.pl;
        handlePick(pl, view);
        return true;
      }
      case 'sprint-toggle-limit': {
        const newLim = timeLimit === 5.0 ? 3.5 : 5.0;
        timeLimit = newLim;
        localStorage.setItem('slowka-sprint-limit', newLim);
        Sprint.render(view);
        return true;
      }
      default: return false;
    }
  };
})();
