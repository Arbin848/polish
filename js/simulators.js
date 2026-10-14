// Słówka Everyday Polish Simulators: Żabka, Paczkomat, and Clinic
// Interactive branching dialogue trainer with instant native feedback.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const SIM = (S.Simulator = {});

  let activeSimId = 'sim-zabka';
  let currentStep = 0;
  let userChoices = []; // record choices made
  let completedSims = new Set();

  SIM.render = (view, arg) => {
    const list = window.SLOWKA_SIMULATORS || [];
    if (arg && list.some((s) => s.id === arg)) {
      if (activeSimId !== arg) {
        activeSimId = arg;
        currentStep = 0;
        userChoices = [];
      }
    }
    const currentSim = list.find((s) => s.id === activeSimId) || list[0];
    const isCompleted = currentStep >= currentSim.steps.length;

    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head sim-head">
        <span class="eyebrow sim-eyebrow">🏪 Real-Life Simulators · वास्तविक जीवन सिमुलेटर</span>
        <h2>Polish Everyday Situations</h2>
        <p class="unit-head-ne" lang="ne">पसल, पार्सल मेसिन र क्लिनिकमा दैनिक बोलिने पोलिश भाषा</p>
        <p class="hint">Interactive simulation scenarios where Polish locals speak to you in typical daily routines. Practise what to answer quickly, naturally, and with the right grammar.<br>
        <span lang="ne">वास्तविक जीवनमा जस्तै सुन्नुहोस् र सही उत्तर छान्नुहोस्।</span></p>
      </header>

      <div class="sim-selector-tabs" role="tablist">
        ${list.map((s) => `
          <button class="sim-tab ${s.id === currentSim.id ? 'active' : ''}" data-action="sim-select" data-id="${s.id}">
            <span class="sim-tab-icon">${s.icon}</span>
            <div class="sim-tab-info">
              <span class="sim-tab-title">${esc(s.title)}</span>
              <small class="sim-tab-ne" lang="ne">${esc(s.titleNe)}</small>
            </div>
            ${completedSims.has(s.id) ? '<span class="sim-tab-check">✓</span>' : ''}
          </button>
        `).join('')}
      </div>

      <section class="card sim-stage">
        <div class="sim-context-bar">
          <span class="sim-context-badge">${esc(currentSim.badge)}</span>
          <p class="sim-context-text">${esc(currentSim.context)}</p>
          <p class="sim-context-ne" lang="ne">${esc(currentSim.contextNe)}</p>
        </div>

        <div class="sim-dialogue-flow">
          ${userChoices.map((c, i) => `
            <div class="sim-history-turn">
              <div class="sim-bubble them">
                <div class="sim-bubble-speaker">${esc(currentSim.steps[i].speaker)}</div>
                <div class="sim-bubble-pl" lang="pl">${polish(currentSim.steps[i].pl)}</div>
                <div class="sim-bubble-en">${esc(currentSim.steps[i].en)}</div>
              </div>
              <div class="sim-bubble you ${c.correct ? 'correct' : 'incorrect'}">
                <div class="sim-bubble-speaker">Ty (You) ${c.correct ? '✓' : '⚠️'}</div>
                <div class="sim-bubble-pl" lang="pl">${polish(c.pl)}</div>
                <div class="sim-bubble-en">${esc(c.en)}</div>
                ${c.tip ? `<div class="sim-bubble-tip">💡 ${esc(c.tip)}</div>` : ''}
              </div>
            </div>
          `).join('')}

          ${!isCompleted ? (() => {
            const step = currentSim.steps[currentStep];
            return `
              <div class="sim-active-turn">
                <div class="sim-bubble them active-them">
                  <div class="sim-bubble-head">
                    <span class="sim-avatar">${step.avatar}</span>
                    <strong class="sim-bubble-speaker">${esc(step.speaker)}</strong>
                    <button class="icon-btn sim-audio-btn" data-action="say" data-text="${esc(step.audioText || step.pl)}" title="Listen to cashier / receptionist">
                      🔊 Listen
                    </button>
                  </div>
                  <div class="sim-bubble-pl large" lang="pl">${polish(step.pl)}</div>
                  <div class="sim-bubble-pron">
                    <span class="pron-latin">${esc((S.Pron && S.Pron.of ? S.Pron.of(step.audioText || step.pl).pron : ""))}</span>
                    <span class="pron-ne" lang="ne">${esc((S.Pron && S.Pron.of ? S.Pron.of(step.audioText || step.pl).proNe : ""))}</span>
                  </div>
                  <div class="sim-bubble-en">${esc(step.en)}</div>
                  <div class="sim-bubble-ne" lang="ne">${esc(step.ne)}</div>
                </div>

                <div class="sim-options-prompt">
                  <b>Choose your response · आफ्नो उत्तर छान्नुहोस्:</b>
                </div>

                <div class="sim-options-grid">
                  ${step.options.map((opt, optIdx) => `
                    <button class="sim-option-card" data-action="sim-choose" data-step="${currentStep}" data-opt="${optIdx}">
                      <div class="sim-opt-pl-row"><div class="sim-opt-pl" lang="pl">${polish(opt.pl)}</div><span class="sim-copy-icon" data-action="sim-copy" data-text="${esc(opt.pl)}" title="Copy Polish phrase">📋</span></div>
                      <div class="sim-opt-en">${esc(opt.en)}</div>
                      <div class="sim-opt-ne" lang="ne">${esc(opt.ne)}</div>
                    </button>
                  `).join('')}
                </div>
              </div>
            `;
          })() : `
            <div class="sim-complete-banner">
              <span class="sim-complete-trophy">🎉</span>
              <h3>Scenario Complete! · परिदृश्य पूरा भयो!</h3>
              <p>You successfully completed the <b>${esc(currentSim.title)}</b> dialogue simulator.</p>
              <p lang="ne">तपाईंले सफलतापूर्वक अभ्यास पूरा गर्नुभयो।</p>
              <div class="row center">
                <button class="btn primary" data-action="sim-restart">Try Again · फेरि अभ्यास गर्नुहोस् ↻</button>
                <button class="btn" data-action="go" data-to="practice">Back to Practice · अभ्यासमा फर्कनुहोस् →</button>
              </div>
            </div>
          `}
        </div>
      </section>
    `;

    if (!isCompleted) {
      const step = currentSim.steps[currentStep];
      if (step && S.speak) {
        S.speak(step.audioText || step.pl);
      }
    }
  };

  SIM.action = (a, el, view) => {
    const list = window.SLOWKA_SIMULATORS || [];
    switch (a) {
      case 'sim-select': {
        activeSimId = el.dataset.id;
        currentStep = 0;
        userChoices = [];
        SIM.render(view, activeSimId);
        return true;
      }
      case 'sim-choose': {
        const stepIdx = Number(el.dataset.step);
        const optIdx = Number(el.dataset.opt);
        const currentSim = list.find((s) => s.id === activeSimId) || list[0];
        const step = currentSim.steps[stepIdx];
        const opt = step.options[optIdx];
        userChoices.push(opt);

        if (opt.correct) {
          if (S.playSFX) S.playSFX('correct');
        }
        if (S.speak) S.speak(opt.pl);

        currentStep++;
        if (currentStep >= currentSim.steps.length) {
          completedSims.add(currentSim.id);
          if (S.Celebration) {
            S.Celebration.fire('dialogue', {
              icon: currentSim.icon,
              title: currentSim.title,
              titleNe: currentSim.titleNe,
              desc: 'Completed simulation scenario'
            });
          }
        }

        setTimeout(() => {
          SIM.render(view, activeSimId);
          // Smooth scroll to the latest active turn or options prompt
          const activeTurn = view.querySelector('.sim-active-turn, .sim-complete-banner');
          if (activeTurn) {
            activeTurn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 300);
        return true;
      }
      case 'sim-copy': {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(el.dataset.text || '').then(() => {
            el.textContent = '✓';
            setTimeout(() => { el.textContent = '📋'; }, 1500);
          }).catch(() => {});
        }
        return true;
      }
      case 'sim-restart': {
        currentStep = 0;
        userChoices = [];
        SIM.render(view, activeSimId);
        return true;
      }
      default: return false;
    }
  };
})();
