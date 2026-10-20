// Słówka Speed Match: 60-second Polish <-> Nepali vocabulary pairing challenge.
// Tap a Polish word on the left, then tap its matching Nepali translation on the right.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const Match = (S.Match = {});

  let timer = null;
  let timeLeft = 60;
  let score = 0;
  let matchesFound = 0;
  let roundPairs = []; // 5 items: [{ id, pl, ne, en, sound }]
  let roundPairsNe = [];
  let selectedPl = null;
  let selectedNe = null;
  let solvedIds = new Set();
  let gameOver = false;

  function newRound() {
    selectedPl = null;
    selectedNe = null;
    solvedIds = new Set();
    const pool = S.ENTRIES.filter((e) => e.pl && e.ne && e.pl.length < 24 && e.ne.length < 24);
    roundPairs = S.shuffle(pool).slice(0, 5).map((e, idx) => ({
      id: `${idx}-${e.pl}`,
      pl: e.pl,
      ne: e.ne,
      en: e.en
    }));
    roundPairsNe = S.shuffle(roundPairs.slice());
  }

  Match.start = (view) => {
    clearInterval(timer);
    timeLeft = 60;
    score = 0;
    matchesFound = 0;
    selectedPl = null;
    selectedNe = null;
    solvedIds = new Set();
    gameOver = false;
    newRound();

    timer = setInterval(() => {
      timeLeft -= 1;
      const tEl = document.getElementById('match-timer');
      if (tEl) {
        tEl.textContent = `${timeLeft}s`;
        if (timeLeft <= 10) tEl.style.color = '#ef4444';
      }
      if (timeLeft <= 0) {
        clearInterval(timer);
        gameOver = true;
        if (S.Celebration && S.Celebration.fire) {
          S.Celebration.fire('match', { icon: '⚡', title: `Challenge Finished!`, titleNe: `स्कोर: ${score} अंक!`, desc: `You paired ${matchesFound} words correctly in 60 seconds.` });
        }
        Match.render(view);
      }
    }, 1000);

    Match.render(view);
  };

  Match.render = (view) => {
    if (!view) return;
    const best = Number(localStorage.getItem('slowka-speed-best') || 0);
    if (score > best) localStorage.setItem('slowka-speed-best', score);

    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head">
        <span class="eyebrow">⚡ Speed Match · छिटो जोडा मिलाउनुहोस्</span>
        <h2>60-Second Vocabulary Challenge</h2>
        <p class="unit-head-ne" lang="ne">६० सेकेन्डको जोडा मिलाउने खेल</p>
      </header>

      <div class="card" style="margin-bottom:16px; padding:16px 20px; background:var(--surface); border:1.5px solid var(--accent); border-radius:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.2rem;">⏱</span>
            <span id="match-timer" style="font-size:1.25rem; font-family:var(--font-mono);">${timeLeft}s</span>
          </div>
          <div>
            Score: <span style="font-size:1.25rem; color:var(--accent); font-family:var(--font-mono);">${score}</span>
          </div>
          <div class="hint" style="margin:0;">
            🏆 Best: ${Math.max(score, best)}
          </div>
        </div>
      </div>

      ${gameOver ? `
        <div class="card summary flip-in" style="text-align:center; padding:32px 20px;">
          <span style="font-size:3rem; line-height:1;">⚡</span>
          <h2 style="margin:10px 0 4px;">Time's Up! · समय सकियो</h2>
          <p class="hint">You matched <b>${matchesFound} pairs</b> and scored <b>${score} points</b>! <span lang="ne">राम्रो प्रयास!</span></p>
          <div class="row" style="justify-content:center; gap:12px; margin-top:20px;">
            <button class="btn primary" data-action="match-restart">Play Again · फेरि खेल्नुहोस् ↺</button>
            <button class="btn" data-action="go" data-to="practice">Back to Practice →</button>
          </div>
        </div>
      ` : `
        <div class="match-game-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
          <!-- Left: Polish Column -->
          <div style="display:flex; flex-direction:column; gap:10px;">
            <span class="label" style="text-align:center;">Polish · पोलिश</span>
            ${roundPairs.map((p) => {
              const isSolved = solvedIds.has(p.id);
              const isSelected = selectedPl === p.id;
              return `
                <button type="button" class="match-tile ${isSolved ? 'solved' : ''} ${isSelected ? 'selected' : ''}"
                  data-action="match-pick-pl" data-id="${p.id}" ${isSolved ? 'disabled' : ''}
                  style="min-height:56px; padding:10px 14px; border-radius:12px; border:1.5px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}; background:${isSelected ? 'var(--sunk)' : 'var(--surface)'}; font-weight:700; font-size:1.05rem; cursor:pointer; text-align:center; transition:all 0.15s ease; ${isSolved ? 'opacity:0.25; pointer-events:none;' : ''}">
                  <span lang="pl">${polish(p.pl)}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Right: Nepali Column (stable shuffle) -->
          <div style="display:flex; flex-direction:column; gap:10px;">
            <span class="label" style="text-align:center;">Nepali · नेपाली</span>
            ${roundPairsNe.map((p) => {
              const isSolved = solvedIds.has(p.id);
              const isSelected = selectedNe === p.id;
              return `
                <button type="button" class="match-tile ${isSolved ? 'solved' : ''} ${isSelected ? 'selected' : ''}"
                  data-action="match-pick-ne" data-id="${p.id}" ${isSolved ? 'disabled' : ''}
                  style="min-height:56px; padding:10px 14px; border-radius:12px; border:1.5px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}; background:${isSelected ? 'var(--sunk)' : 'var(--surface)'}; font-size:0.92rem; font-weight:600; cursor:pointer; text-align:center; transition:all 0.15s ease; ${isSolved ? 'opacity:0.25; pointer-events:none;' : ''}">
                  <span lang="ne">${esc(p.ne)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `}
    `;
  };

  Match.action = (a, el, view) => {
    switch (a) {
      case 'match-start':
      case 'match-restart': {
        Match.start(view);
        return true;
      }
      case 'match-pick-pl': {
        if (gameOver) return true;
        if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
        const id = el.dataset.id;
        selectedPl = selectedPl === id ? null : id;
        checkPair(view);
        return true;
      }
      case 'match-pick-ne': {
        if (gameOver) return true;
        if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
        const id = el.dataset.id;
        selectedNe = selectedNe === id ? null : id;
        checkPair(view);
        return true;
      }
      default: return false;
    }
  };

  function checkPair(view) {
    if (selectedPl && selectedNe) {
      if (selectedPl === selectedNe) {
        // Correct pair!
        const pair = roundPairs.find((p) => p.id === selectedPl);
        if (pair && S.speak) S.speak(pair.pl);
        if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {}
        solvedIds.add(selectedPl);
        score += 10;
        matchesFound += 1;
        selectedPl = null;
        selectedNe = null;

        if (solvedIds.size >= roundPairs.length) {
          score += 25; // Bonus for sweeping the board
          newRound();
        }
      } else {
        // Mistake penalty
        score = Math.max(0, score - 2);
        selectedPl = null;
        selectedNe = null;
        if (navigator.vibrate) try { navigator.vibrate([35, 45, 35]); } catch (e) {}
      }
    }
    Match.render(view);
  }
})();
