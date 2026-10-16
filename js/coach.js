// Słówka Pronunciation Coach & Interactive Speech Checker
// Allows learners to tap a microphone button on any word or practice card,
// speak in Polish, and receive instant real-time feedback with accuracy percentage,
// acoustic tips, and guidance in English and Devanagari.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const Coach = (S.Coach = {});

  let activeModal = null;
  let isListening = false;

  Coach.coachBtn = (word, label = 'Check Speech · उच्चारण जाँच्नुहोस्') => {
    if (!S.canRecognize) return '';
    return `<button type="button" class="btn coach-mic-btn" data-action="coach-test" data-word="${esc(word)}" title="Speak and test your pronunciation">${S.MIC} <span>${label}</span></button>`;
  };

  Coach.testWord = (targetWord) => {
    if (!targetWord) return;
    openModal(targetWord);
  };

  function openModal(targetWord) {
    closeModal();
    const cleanTarget = String(targetWord).replace(/…/g, '').replace(/___/g, '').trim();
    const entry = S.ENTRIES.find((x) => S.clean(x.pl) === S.clean(cleanTarget)) || { pl: cleanTarget };
    if (!entry.pron && S.Pron && S.Pron.of) Object.assign(entry, S.Pron.of(cleanTarget));

    const modal = document.createElement('div');
    modal.className = 'coach-modal-overlay';
    modal.id = 'coach-speech-modal';
    modal.innerHTML = `
      <div class="coach-modal-card" role="dialog" aria-modal="true" aria-labelledby="coach-modal-title">
        <header class="coach-modal-head">
          <div class="coach-modal-badge">🎙️ Pronunciation Coach · उच्चारण परीक्षक</div>
          <button type="button" class="coach-modal-close" data-action="coach-close" aria-label="Close modal">✕</button>
        </header>

        <div class="coach-modal-body">
          <div class="coach-target-pl" lang="pl">${polish(cleanTarget)}</div>
          ${S.pronHTML(entry)}
          ${entry.en || entry.ne ? `<div class="coach-target-meaning">${esc(entry.en || '')} ${entry.ne ? `<span lang="ne">· ${esc(entry.ne)}</span>` : ''}</div>` : ''}

          <div class="coach-audio-helpers">
            <button type="button" class="btn listen" data-action="say" data-text="${esc(cleanTarget)}">${S.SPEAKER} Listen Native Model</button>
            <button type="button" class="btn listen slow" data-action="say" data-slow="1" data-text="${esc(cleanTarget)}">🐢 Slow (0.75×)</button>
          </div>

          <div class="coach-mic-stage" id="coach-mic-stage">
            <button type="button" class="coach-big-mic-btn" id="coach-record-btn" data-action="coach-toggle-record" aria-label="Tap to speak in Polish">
              <span class="coach-mic-icon">${S.MIC}</span>
              <span class="coach-mic-status" id="coach-mic-status">Tap and speak in Polish<br><small lang="ne">थिचेर पोलिशमा स्पष्ट बोल्नुहोस्</small></span>
            </button>
          </div>

          <div class="coach-feedback-box" id="coach-feedback-box" hidden>
            <div class="coach-score-row">
              <span class="coach-score-badge" id="coach-score-badge">0%</span>
              <span class="coach-verdict" id="coach-verdict">Evaluating…</span>
            </div>
            <div class="coach-heard-row">
              <span class="coach-heard-label">We heard · सुनिएको शब्द:</span>
              <b class="coach-heard-text" id="coach-heard-text" lang="pl">—</b>
            </div>
            <div class="coach-tip-text" id="coach-tip-text"></div>
          </div>
        </div>

        <footer class="coach-modal-foot">
          <button type="button" class="btn" data-action="coach-close">Close · बन्द गर्नुहोस्</button>
        </footer>
      </div>
    `;

    document.body.appendChild(modal);
    activeModal = { modal, word: cleanTarget };

    // Auto-focus the big mic button
    setTimeout(() => {
      const btn = modal.querySelector('#coach-record-btn');
      if (btn) btn.focus();
    }, 100);
  }

  function closeModal() {
    if (isListening && S.stopRecognition) {
      try { S.stopRecognition(); } catch (e) {}
    }
    isListening = false;
    if (activeModal && activeModal.modal) {
      activeModal.modal.remove();
      activeModal = null;
    }
  }

  async function toggleRecord() {
    if (!activeModal) return;
    if (isListening) {
      if (S.stopRecognition) S.stopRecognition();
      isListening = false;
      updateMicUI(false);
      return;
    }

    const { word } = activeModal;
    const stage = document.getElementById('coach-mic-stage');
    const fbBox = document.getElementById('coach-feedback-box');
    if (fbBox) fbBox.hidden = true;

    isListening = true;
    updateMicUI(true);
    S.stopSpeaking(); // avoid mic picking up app speech

    try {
      const alts = await S.recognize();
      isListening = false;
      updateMicUI(false);

      if (!activeModal || activeModal.word !== word) return;

      let best = { heard: alts[0] || '', score: 0 };
      for (const a of alts) {
        const sc = S.similarity(a, word);
        if (sc > best.score) best = { heard: a, score: sc };
      }

      displayFeedback(word, best);
    } catch (err) {
      isListening = false;
      updateMicUI(false);
      if (!activeModal) return;
      const statusText = document.getElementById('coach-mic-status');
      if (statusText) {
        statusText.innerHTML = `<span style="color:#ef4444;">${esc(S.micErrorText(err))}</span>`;
      }
    }
  }

  function updateMicUI(listening) {
    const btn = document.getElementById('coach-record-btn');
    const status = document.getElementById('coach-mic-status');
    if (!btn || !status) return;

    if (listening) {
      btn.classList.add('recording');
      status.innerHTML = `<strong style="color:#ef4444;">Listening… speak now!</strong><br><small lang="ne">सुन्दैछ… अहिले बोल्नुहोस्!</small>`;
    } else {
      btn.classList.remove('recording');
      status.innerHTML = `Tap to speak again<br><small lang="ne">फेरि बोल्न थिच्नुहोस्</small>`;
    }
  }

  function displayFeedback(target, result) {
    const fbBox = document.getElementById('coach-feedback-box');
    const badge = document.getElementById('coach-score-badge');
    const verdict = document.getElementById('coach-verdict');
    const heardText = document.getElementById('coach-heard-text');
    const tipText = document.getElementById('coach-tip-text');
    if (!fbBox || !badge || !verdict || !heardText || !tipText) return;

    fbBox.hidden = false;
    const pct = Math.round(result.score * 100);
    badge.textContent = `${pct}% Match`;
    heardText.textContent = result.heard || '—';

    // Remove old state classes
    badge.className = 'coach-score-badge ' + (pct >= 85 ? 'great' : pct >= 60 ? 'good' : 'retry');

    if (pct >= 85) {
      verdict.innerHTML = `<strong style="color:#10b981;">Świetnie! Great Polish accent!</strong><br><small lang="ne">उत्कृष्ट उच्चारण! धेरै राम्रो भन्नुभयो।</small>`;
      tipText.innerHTML = `🎉 Your pronunciation is clear and easily understood by native speakers in Poland.`;
      // Play celebratory subtle chime
      if (S.Celebration && S.Celebration.fire) {
        S.Celebration.fire('speech', { icon: '🎙️', title: 'Great Speech!', titleNe: 'उत्कृष्ट उच्चारण!' });
      }
    } else if (pct >= 60) {
      verdict.innerHTML = `<strong style="color:#f59e0b;">Dobrze! Close, understand-able!</strong><br><small lang="ne">लगभग सही! अझै थोरै स्पष्ट गर्नुहोस्।</small>`;
      tipText.innerHTML = `💡 <b>Tip:</b> Listen to the slow model again and pay attention to specific Polish consonants like <i>sz</i>, <i>cz</i>, or nasal vowels <i>ą/ę</i>.`;
    } else {
      verdict.innerHTML = `<strong style="color:#ef4444;">Try again: speak clearly</strong><br><small lang="ne">फेरि प्रयास गर्नुहोस्: स्पष्टसँग बोल्नुहोस्।</small>`;
      tipText.innerHTML = `👂 Tap <b>"🐢 Slow"</b> above to hear syllable-by-syllable breakdown, then tap the mic to try once more.`;
    }
  }

  // Delegated event handling for coach actions
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-action]');
    if (!btn) return;
    const a = btn.dataset.action;
    if (a === 'coach-test') {
      Coach.testWord(btn.dataset.word);
    } else if (a === 'coach-close') {
      closeModal();
    } else if (a === 'coach-toggle-record') {
      toggleRecord();
    }
  });

  // Handle escape key to close modal
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && activeModal) {
      closeModal();
    }
  });
})();
