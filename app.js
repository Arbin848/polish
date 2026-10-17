// Słówka app: navigation, home, unit pages, review, alphabet, dictionary and settings.
// Practice engines live in js/practice.js, conversations/reading/exams in js/extras.js.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const $ = (sel) => document.querySelector(sel);
  const view = $('#view');

  // ---------- navigation ----------

  // Routes are bare tokens so they survive in a link's #anchor: "a1-03", "talk.rp-a1-cafe", "review".
  S.route = { name: 'home' };
  const PAGES = ['match', 'privacy', 'feedback', 'sos', 'sim', 'commute', 'guide', 'pronstudio', 'turn', 'mywords', 'numbers', 'listen', 'revise', 'cert', 'report', 'course', 'practice', 'learn', 'review', 'alphabet', 'dictionary', 'settings', 'talk', 'read', 'exam', 'placement', 'mistakes', 'progress', 'verbs', 'cases', 'sounds', 'check'];

  let currentHash = null;
  S.go = (to, opts = {}) => {
    S.stopSpeaking();
    if (S.Commute && String(to).split('.')[0] !== 'commute') S.Commute.stop();
    if (S.Recorder && String(to).split('.')[0] !== 'pronstudio') S.Recorder.reset();
    if (S.Assess && !String(to).startsWith('revise.')) S.Assess.reset(); // a test opened again starts fresh
    if (S.Speaking) S.Speaking.reset(); // a dialogue starts fresh each time it is opened
    S.Practice.reset();
    S.Trainers.resetSessions(opts.keep);
    const [name, arg] = String(to || 'home').split(/\.(.+)/);
    if (S.UNIT.has(to)) S.route = { name: 'unit', id: to, tab: 'learn' };
    else if (PAGES.includes(name)) S.route = { name, arg: arg || null, q: opts.q || '' };
    else S.route = { name: 'home' };
    if (S.route.name === 'placement') S.Extras.resetPlacement();
    // Each new page is a history entry, so the phone's Back button returns to the previous page.
    const hash = S.route.name === 'home' ? '' : `#${to}`;
    currentHash = opts.fromHistory ? (location.hash || '') : hash;
    if (!opts.fromHistory) {
      try {
        const url = hash || location.pathname + location.search;
        // A page that redirects while drawing (e.g. an old link) replaces its entry, so Back still works.
        if ((location.hash || '') !== hash && !rendering) history.pushState(null, '', url);
        else history.replaceState(null, '', url);
      } catch (e) { /* not allowed here */ }
    }
    S.render();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Screen readers: start reading the new page from its heading.
    const h = view.querySelector('h2');
    if (h && !view.querySelector('[data-autofocus]')) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  };

  let rendering = 0;
  S.render = () => {
    rendering++;
    try { renderPage(); } finally { rendering--; }
  };
  function renderPage() {
    document.body.className = document.body.className.replace(/\bpage-[\w-]+\b/g, '').trim() + ' page-' + (S.route.name || 'home');
    renderStats(); if (S.Auth && S.Auth.renderAuthButton) S.Auth.renderAuthButton();
    renderNav();
    const r = S.route;
    if (r.name === 'unit') renderUnit();
    else if (r.name === 'review') renderReview();
    else if (r.name === 'alphabet') renderAlphabet();
    else if (r.name === 'dictionary') renderDictionary();
    else if (r.name === 'privacy') { if (S.Privacy && S.Privacy.render) S.Privacy.render(view); }
    else if (r.name === 'feedback') renderFeedback();
    else if (r.name === 'settings') renderSettings();
    else if (r.name === 'talk') r.arg ? S.Extras.talk(view, r.arg) : S.Extras.talkList(view);
    else if (r.name === 'read') r.arg ? S.Extras.read(view, r.arg) : S.Extras.readList(view);
    else if (r.name === 'exam') r.arg ? S.Extras.exam(view, r.arg) : S.Extras.examList(view);
    else if (r.name === 'placement') S.Extras.placement(view);
    else if (r.name === 'mistakes') r.arg === 'practice' ? renderMistakePractice() : S.Extras.mistakes(view);
    else if (r.name === 'progress') {
      S.Extras.progressPage(view);
      const done = S.COURSE.filter((u) => { const st = S.Guided.status(u); return st.done && !st.skipped; }).length;
      view.insertAdjacentHTML('beforeend', `
        <p class="hint">Lessons finished with your teacher: <b>${done} of ${S.COURSE.length}</b>.</p>
        ${S.Listening.badgesHTML()}
        <section class="card compact report-cta"><b>Weak-spot report · कमजोरी रिपोर्ट</b><span class="hint">See which words, grammar and sounds need more practice.</span><button class="btn primary" data-action="go" data-to="report">Open my report →</button></section>
        ${(() => {
          const certs = S.progress.certs || {};
          const ids = Object.keys(certs);
          return `<h3 class="section-h">Certificates <span class="ne-sub" lang="ne">प्रमाणपत्र</span></h3>
            ${ids.length ? `<div class="chip-row">${ids.map((l) => `<button class="chip-btn" data-action="go" data-to="cert.${esc(l)}">🎓 ${esc(l)} · ${Number(certs[l].score) || 0}%</button>`).join('')}</div>`
              : '<p class="hint">Pass a level test (at the end of each level in the Course) to earn a certificate. · हरेक स्तरको अन्त्यमा परीक्षा पास गरेर प्रमाणपत्र पाउनुहोस्।</p>'}`;
        })()}
        <div class="row start"><button class="btn" data-action="go" data-to="settings">⚙ Settings · सेटिङ</button><button class="btn" data-action="go" data-to="feedback">📢 Report / Feedback · समस्या तथा सुझाव</button><button class="btn" data-action="go" data-to="check">Review mode for native speakers</button></div>`);
      checkProgressMilestones();
    }
    else if (r.name === 'match') S.Match ? S.Match.start(view) : null;
    else if (r.name === 'sos') S.SOS ? S.SOS.render(view, r.arg) : null;
    else if (r.name === 'sim') S.Simulator ? S.Simulator.render(view, r.arg) : null;
    else if (r.name === 'commute') S.Commute ? S.Commute.render(view) : null;
    else if (r.name === 'guide') S.Extras ? S.Extras.renderGuide(view, r.arg) : null;
    else if (r.name === 'pronstudio') S.Recorder ? S.Recorder.renderStudio(view) : null;
    else if (r.name === 'verbs') r.arg === 'practice' ? S.Trainers.verbPractice(view) : r.arg ? S.Trainers.verb(view, r.arg) : S.Trainers.verbList(view);
    else if (r.name === 'cases') r.arg === 'practice' ? S.Trainers.casePractice(view) : r.arg ? S.Trainers.noun(view, r.arg) : S.Trainers.caseList(view);
    else if (r.name === 'sounds') r.arg ? S.Trainers.sound(view, r.arg) : S.Trainers.soundList(view);
    else if (r.name === 'numbers') S.Numbers.render(view);
    else if (r.name === 'mywords') S.MyWords.render(view, r.arg);
    else if (r.name === 'turn') S.Speaking.render(view, r.arg);
    else if (r.name === 'listen') r.arg ? S.Listening.task(view, r.arg) : S.Listening.list(view);
    else if (r.name === 'revise') S.Assess.render(view, r.arg);
    else if (r.name === 'cert') S.Assess.certificate(view, r.arg);
    else if (r.name === 'report') S.Assess.report(view);
    else if (r.name === 'course') renderCourse();
    else if (r.name === 'practice') renderPractice();
    else if (r.name === 'learn') S.Guided.render(view, r.arg);
    else if (r.name === 'check') r.arg ? S.Trainers.checkUnit(view, r.arg) : S.Trainers.checkList(view);
    else renderHome();
  }
  S.onProgress = () => renderStats();
  const NAV = { sos: 'practice', sim: 'practice', commute: 'practice', guide: 'practice', pronstudio: 'practice', turn: 'practice', mywords: 'practice', numbers: 'practice', listen: 'practice', revise: 'course', cert: 'progress', report: 'progress', home: 'home', course: 'course', unit: 'course', learn: 'course', practice: 'practice', review: 'practice', verbs: 'practice', cases: 'practice', sounds: 'practice', alphabet: 'practice', dictionary: 'dictionary', mistakes: 'practice', talk: 'practice', read: 'practice', exam: 'practice', placement: 'practice', progress: 'progress', settings: 'progress', check: 'progress' };
  
  function applyFontSize(size) {
    size = size || 'normal';
    document.documentElement.setAttribute('data-fontsize', size);
  }

  function applyTheme(theme) {
    theme = theme || 'auto';
    localStorage.setItem('slowka-theme', theme);
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    updateThemeUI();
  }

  function updateThemeUI() {
    if (S.settings && S.settings.fontsize) {
      applyFontSize(S.settings.fontsize);
    } else {
      applyFontSize('normal');
    }
    const theme = localStorage.getItem('slowka-theme') || 'auto';
    document.querySelectorAll('.theme-btn').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.theme === theme ? 'true' : 'false');
    });
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    if (mobileThemeIcon) {
      mobileThemeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  const Celebration = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,

    playChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.55);
        });
      } catch (e) {}
    },

    startConfetti() {
      if (this.animId) cancelAnimationFrame(this.animId);
      let canvas = document.getElementById('celebration-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'celebration-canvas';
        canvas.className = 'celebration-canvas';
        document.body.appendChild(canvas);
      }
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      this.ctx.scale(dpr, dpr);

      const colors = ['#dc2626', '#ffffff', '#fbbf24', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
      this.particles = [];
      for (let i = 0; i < 90; i++) {
        const originX = w * (0.25 + Math.random() * 0.5);
        const originY = h * (0.25 + Math.random() * 0.4);
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 8;
        this.particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3.5,
          size: 6 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2,
          gravity: 0.18 + Math.random() * 0.1,
          drag: 0.98,
          alpha: 1,
          shape: Math.random() > 0.4 ? 'rect' : 'circle'
        });
      }

      let frameCount = 0;
      const render = () => {
        frameCount++;
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, w, h);
        let alive = 0;
        for (const p of this.particles) {
          p.vx *= p.drag;
          p.vy = p.vy * p.drag + p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.vRot;
          if (frameCount > 60) p.alpha -= 0.015;
          if (p.alpha <= 0) continue;
          alive++;

          this.ctx.save();
          this.ctx.globalAlpha = Math.max(0, p.alpha);
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.rotation);
          this.ctx.fillStyle = p.color;

          if (p.shape === 'rect') {
            this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
            this.ctx.fill();
          }
          this.ctx.restore();
        }

        if (alive > 0 && frameCount < 180) {
          this.animId = requestAnimationFrame(render);
        } else {
          this.stopConfetti();
        }
      };
      this.animId = requestAnimationFrame(render);
    },

    stopConfetti() {
      if (this.animId) cancelAnimationFrame(this.animId);
      this.animId = null;
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.canvas = null;
    },

    fire(type, data) {
      this.playChime();
      this.startConfetti();
      if (navigator.vibrate) try { navigator.vibrate([20, 60, 40, 80, 60]); } catch (e) {}
      try { S.speak('Super!'); } catch (e) {}

      const oldModal = document.getElementById('celebration-overlay');
      if (oldModal) oldModal.remove();

      const isLevel = type === 'level';
      const tagText = isLevel ? '🏆 Level Up Reached! · नयाँ स्तर!' : '🎉 Badge Unlocked! · नयाँ उपलब्धि!';
      const cheerText = 'Gratulacje! Świetna robota! · बधाई छ! धेरै राम्रो काम!';

      const overlay = document.createElement('div');
      overlay.id = 'celebration-overlay';
      overlay.className = 'celebration-backdrop';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = `
        <div class="celebration-modal" role="document">
          <div class="celebrate-icon-box" aria-hidden="true">${data.icon || (isLevel ? '🏆' : '⭐')}</div>
          <span class="celebrate-tag">${tagText}</span>
          <h2 class="celebrate-title">${esc(data.title)}</h2>
          ${data.titleNe ? `<p class="unit-head-ne" lang="ne">${esc(data.titleNe)}</p>` : ''}
          <p class="celebrate-cheer">${cheerText}</p>
          <p class="celebrate-desc">${esc(data.desc || '')}</p>
          <button class="btn primary celebrate-btn-main" data-action="close-celebration">Continue · जारी राख्नुहोस् →</button>
        </div>
      `;
      overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay) this.close();
      });
      document.body.appendChild(overlay);
    },

    close() {
      const modal = document.getElementById('celebration-overlay');
      if (modal) modal.remove();
    }
  };
  S.Celebration = Celebration;

  function checkProgressMilestones() {
    const P = S.progress || {};
    const celebratedBadges = (P.celebratedBadges = P.celebratedBadges || {});
    const list = S.Listening ? S.Listening.badges() : [];
    const earnedBadges = list.filter((b) => b.date);

    const uncelebratedBadge = earnedBadges.find((b) => !celebratedBadges[b.id]);

    const curLevel = S.getProficiencyLevel ? S.getProficiencyLevel() : S.LEVELS[0];
    const prevCelebratedLevel = P.celebratedLevel || 'Start';
    const isNewLevel = S.levelIndex(curLevel.id) > S.levelIndex(prevCelebratedLevel);

    if (uncelebratedBadge) {
      celebratedBadges[uncelebratedBadge.id] = true;
      S.saveProgress();
      setTimeout(() => {
        S.Celebration.fire('badge', {
          icon: uncelebratedBadge.icon,
          title: uncelebratedBadge.en,
          titleNe: uncelebratedBadge.ne,
          desc: uncelebratedBadge.how,
          date: uncelebratedBadge.date
        });
      }, 350);
    } else if (isNewLevel) {
      P.celebratedLevel = curLevel.id;
      S.saveProgress();
      setTimeout(() => {
        S.Celebration.fire('level', {
          icon: '🏆',
          title: curLevel.name,
          titleNe: curLevel.ne,
          desc: curLevel.blurb,
          levelId: curLevel.id
        });
      }, 350);
    }
  }

  function renderNav() {
    const cur = NAV[S.route.name] || 'home';
    document.querySelectorAll('.bottom-nav button, .top-nav button, .sidebar-nav-btn').forEach((b) => {
      b.setAttribute('aria-current', b.dataset.to === cur ? 'page' : 'false');
    });
    updateLangUI();
    updateThemeUI();
    const due = S.dueList().length;
    const pBadge = document.getElementById('nav-practice-badge');
    const mpBadge = document.getElementById('mobile-practice-badge');
    if (pBadge) {
      if (due > 0) {
        pBadge.textContent = due;
        pBadge.hidden = false;
      } else {
        pBadge.hidden = true;
      }
    }
    if (mpBadge) {
      if (due > 0) {
        mpBadge.textContent = due;
        mpBadge.hidden = false;
      } else {
        mpBadge.hidden = true;
      }
    }
    // Update browser title bar with due review count to remind desktop / browser tab users
    const baseTitle = 'Słówka - Learn Polish in Nepali';
    document.title = due > 0 ? `(${due}) ${baseTitle}` : baseTitle;
  }

  function updateLangUI() {
    const cur = S.settings.explain || 'both';
    document.querySelectorAll('.lang-btn').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.lang === cur ? 'true' : 'false');
    });
    const mobileLabel = document.getElementById('mobile-lang-label');
    if (mobileLabel) {
      mobileLabel.textContent = cur === 'both' ? 'EN + NE' : cur === 'en' ? 'EN only' : 'नेपाली';
    }
  }

  function renderStats() {
    const learned = S.ENTRIES.filter(S.isLearned).length;
    // "Met" counts every word in practice, so progress shows from the first lesson; "learned" needs a week of reviews.
    const met = Object.keys(S.progress.items).filter((k) => S.LEXICON.has(k)).length;
    const shieldActive = S.hasStreakShield && S.hasStreakShield();
    $('#stats').innerHTML = `
      <div class="stat" title="Consecutive daily study streak${shieldActive ? ' · 🛡️ Weekly Streak Shield active' : ''}"><span class="stat-badge-icon">🔥</span><b>${S.currentStreak()}${shieldActive ? '<span class="shield-badge-dot" title="Streak Shield Active">🛡️</span>' : ''}</b><span>streak</span></div>
      <div class="stat" title="Words encountered in lessons and practice"><span class="stat-badge-icon">📖</span><b>${met}</b><span>words</span></div>
      <div class="stat" title="Words remembered over several days"><span class="stat-badge-icon">🧠</span><b>${learned}<small>/${S.ENTRIES.length}</small></b><span>learned</span></div>
      <div class="stat" title="Words ready for spaced-repetition review"><span class="stat-badge-icon">⏱</span><b>${S.dueList().length}</b><span>review</span></div>`;
  }

  // Without arguments, "back" goes to the section the page belongs to.
  const PARENT = { course: ['course', 'Course · पाठ्यक्रम'], practice: ['practice', 'Practice · अभ्यास'], progress: ['progress', 'Progress · प्रगति'], home: ['home', 'Home · गृह'] };
  S.backLink = (to, label) => {
    if (!to) [to, label] = PARENT[NAV[S.route.name] === S.route.name ? 'home' : NAV[S.route.name] || 'home'];
    const [en, ne] = String(label).split(' · ');
    return `<button class="back" data-action="go" data-to="${to}">← ${en}${ne ? ` · <span lang="ne">${ne}</span>` : ''}</button>`;
  };

  S.entryRow = (e) => (e ? `
    <li class="entry">
      <div class="entry-pl"><span lang="pl">${polish(e.pl)}</span>${S.pronHTML(e)}</div>
      ${S.meaningHTML(e)}
      <div class="entry-side">${S.boxMeter(e)}${S.listenBtn(e.pl)}</div>
    </li>` : '');

  // ---------- home, course and practice ----------

  // What a learner can do after each level (CEFR "can do" statements, simplified).
  const CAN_DO = {
    Start: [['Read any Polish word aloud', 'कुनै पनि पोलिश शब्द ठूलो स्वरमा पढ्न'], ['Know all 32 letters and the hard sounds', '३२ अक्षर र गाह्रा आवाज चिन्न'], ['Say hello, thank you and sorry', 'नमस्ते, धन्यवाद र माफ गर्नुहोस् भन्न']],
    A1: [['Introduce yourself and your family', 'आफ्नो र परिवारको परिचय दिन'], ['Order food, shop and ask prices', 'खाना अर्डर गर्न, किनमेल गर्न, मूल्य सोध्न'], ['Tell the time, ask the way, say what hurts', 'समय भन्न, बाटो सोध्न, कहाँ दुख्छ भन्न']],
    A2: [['Talk about yesterday and tomorrow', 'हिजो र भोलिको कुरा गर्न'], ['Use all 7 cases in everyday sentences', 'दैनिक वाक्यमा ७ विभक्ति प्रयोग गर्न'], ['Talk about work, shifts, weather and free time', 'काम, सिफ्ट, मौसम र फुर्सदको कुरा गर्न']],
    B1: [['Handle the doctor, offices and the phone', 'डाक्टर, कार्यालय र फोनमा काम चलाउन'], ['Speak politely with Pan/Pani and "would"', 'Pan/Pani र विनम्र रूपमा बोल्न'], ['Give opinions and explain problems', 'राय दिन र समस्या बुझाउन']],
    B2: [['Write formal emails and do a job interview', 'औपचारिक इमेल लेख्न र अन्तर्वार्ता दिन'], ['Understand contracts, news and idioms', 'सम्झौता, समाचार र टुक्का बुझ्न'], ['Connect ideas in long, fluent sentences', 'लामो र धाराप्रवाह वाक्यमा विचार जोड्न']],
    Work: [['Understand safety rules and signs at work', 'कामको सुरक्षा नियम र चिन्ह बुझ्न'], ['Talk to your supervisor about tasks', 'सुपरभाइजरसँग कामबारे कुरा गर्न'], ['Know the key words for your job', 'आफ्नो कामका मुख्य शब्द जान्न']],
  };

  function nextUnit() {
    const main = S.COURSE.filter((u) => u.level !== 'Work');
    // The lesson you last studied with the teacher (not a page you only looked at); work units are extra.
    const last = S.UNIT.get(S.progress.lastUnit);
    if (last && last.level !== 'Work' && !S.Guided.status(last).done) return last;
    // After the whole course, stay on the last lesson instead of jumping back to the alphabet.
    return main.find((u) => !S.Guided.status(u).done && S.unitLearned(u) < u.entries.length * 0.8) || main[main.length - 1];
  }

  const ring = (done, total) => {
    const pct = total ? Math.min(1, done / total) : 0;
    const c = 2 * Math.PI * 26;
    return `<svg class="ring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" class="ring-bg"/><circle cx="32" cy="32" r="26" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}"/></svg>`;
  };

  function unitButton(u) {
    const st = S.Guided.status(u);
    const n = u.entries.length;
    const l = S.unitLearned(u);
    const state = st.done ? 'done' : st.started || S.unitStarted(u) ? 'started' : '';
    const drill = S.progress.drills[u.id];
    return `
      <li>
        <button class="unit-row ${state}" data-action="go" data-to="${u.id}">
          <span class="unit-num">${st.done ? (st.skipped ? '•' : '✓') : esc(u.id.split('-')[1])}</span>
          <span class="unit-text">
            <span class="unit-title">${esc(u.title)}</span>
            <span class="unit-ne" lang="ne">${esc(u.titleNe)}</span>
          </span>
          <span class="unit-progress">${drill ? `<small class="ok" title="Best grammar score">${Number(drill.best) || 0}%</small>` : ''}${S.bar(l, n)}<small>${l}/${n}</small></span>
        </button>
      </li>`;
  }

  function checkpointRow(def, icon, en, ne) {
    const r = S.Assess.result(def.id);
    const done = r && (def.kind === 'test' ? r.passed : true);
    return `
      <li class="checkpoint ${def.kind}">
        <button class="unit-row ${done ? 'done' : ''}" data-action="go" data-to="revise.${def.id}">
          <span class="unit-num">${done ? '✓' : icon}</span>
          <span class="unit-text"><span class="unit-title">${esc(def.title)}</span><span class="unit-ne" lang="ne">${en} · ${ne}</span></span>
          <span class="unit-progress">${r ? `<small class="${done ? 'ok' : 'err'}">${r.best}%</small>` : '<small class="hint">not taken</small>'}</span>
        </button>
      </li>`;
  }

  
  const DAILY_PHRASES = [
    { pl: 'Mogę prosić o pomoc?', en: 'Can I ask for help?', ne: 'म मद्दत माग्न सक्छु?', tip: 'Essential when starting a new job task or looking for something.' },
    { pl: 'Gdzie to odłożyć?', en: 'Where should I put this?', ne: 'यो कहाँ राख्ने?', tip: 'Most common question in warehouses, shops, and factories.' },
    { pl: 'Nie ma problemu!', en: 'No problem!', ne: 'केही समस्या छैन!', tip: 'Friendly and polite reply to Polish colleagues and supervisors.' },
    { pl: 'Zaraz wracam.', en: 'I will be right back.', ne: 'म तुरुन्तै फर्कन्छु।', tip: 'Use when stepping away for a restroom or equipment break.' },
    { pl: 'Czy to jest gotowe?', en: 'Is this ready?', ne: 'के यो तयार भयो?', tip: 'Useful when checking order status or package sorting.' },
    { pl: 'Dziękuję bardzo za pomoc!', en: 'Thank you very much for help!', ne: 'मद्दतको लागि धेरै धन्यवाद!', tip: 'Polite phrase that builds great relationships with local staff.' },
    { pl: 'Miłego dnia!', en: 'Have a nice day!', ne: 'तपाईंको दिन शुभ रहोस्!', tip: 'Standard farewell in shops, buses, and work.' }
  ];

  function getDailyPhrase() {
    const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return DAILY_PHRASES[day % DAILY_PHRASES.length];
  }

  function renderHome() {
    if (!S.COURSE.length) {
      view.innerHTML = '<p class="empty">The course content did not load. Check that the files in the <code>data</code> folder are next to this page.</p>';
      return;
    }
    const next = nextUnit();
    const st = S.Guided.status(next);
    const due = S.dueList().length;
    const today = S.todayCount();
    const goal = S.settings.goal;
    const mistakes = S.Extras.mistakeItems().length;
    const level = S.LEVELS[S.levelIndex(next.level)];
    const rp = S.ROLEPLAYS.find((r) => r.level === next.level && !S.progress.roleplays[r.id]) || S.ROLEPLAYS.find((r) => !S.progress.roleplays[r.id]);
    const story = S.STORIES.find((x) => x.level === next.level && S.progress.stories[x.id] == null);
    const hour = new Date().getHours();
    const hello = hour < 12
      ? ['Dzień dobry! Miłego dnia w pracy.', 'Good morning · Have a good day at work', 'शुभ प्रभात · काममा राम्रो दिन बितोस्!']
      : hour < 18
      ? ['Dzień dobry! Smacznego obiadu.', 'Good afternoon · Enjoy your break/lunch', 'नमस्ते · खाजा/खाना मिठो होस्!']
      : ['Dobry wieczór! Odpocznij po pracy.', 'Good evening · Rest well after work', 'शुभ सन्ध्या · कामपछि आराम गर्नुहोस्!'];

    const plan = [
      due ? { to: 'review', icon: '↻', en: `Review ${due} ${due === 1 ? 'word' : 'words'}`, ne: 'शब्द दोहोर्‍याउनुहोस्', sub: 'A few minutes · केही मिनेट' } : null,
      { action: 'g-start', unit: next.id, icon: '▶', en: st.done ? `Repeat: ${next.title}` : st.started ? `Continue: ${next.title}` : `Lesson: ${next.title}`, ne: next.titleNe, sub: st.started && !st.done ? `Step ${st.step + 1} of ${st.total} · with your teacher` : 'With your teacher · शिक्षिकासँग', main: true },
      (() => { const r = S.Assess.dueRevision(); return r ? { to: `revise.${r.id}`, icon: '↻', en: r.title, ne: r.titleNe, sub: 'Revise the last 5 lessons · पछिल्ला ५ पाठ दोहोर्‍याउनुहोस्' } : null; })(),
      (() => { const t = S.Assess.dueTest(); return t ? { to: `revise.${t.id}`, icon: '🎓', en: t.title, ne: t.titleNe, sub: 'Pass with 70% to get your certificate' } : null; })(),
      mistakes ? { to: 'mistakes.practice', icon: '✎', en: `Fix ${mistakes} grammar ${mistakes === 1 ? 'mistake' : 'mistakes'}`, ne: 'व्याकरणका गल्ती सुधार्नुहोस्', sub: '' } : null,
      rp && S.levelIndex(next.level) >= 1 ? { to: `talk.${rp.id}`, icon: '💬', en: `Talk: ${rp.title}`, ne: rp.titleNe, sub: 'Conversation practice · संवाद' } : null,
      story && !rp ? { to: `read.${story.id}`, icon: '📖', en: `Read: ${story.title}`, ne: story.titleNe, sub: 'Reading · पढाइ' } : null,
    ].filter(Boolean);

    view.innerHTML = `
      <!-- Quick Status Strip -->
      <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:8px; margin-bottom:10px; font-size:0.82rem;">
        <div style="display:flex; align-items:center; gap:6px; color:#15803d; background:var(--sunk); border:1px solid var(--line); border-radius:14px; padding:4px 10px;">
          <span>⚡</span>
          <span><b>100% Offline</b> · <span lang="ne">इन्टरनेट बिना चल्छ</span></span>
        </div>
        <button type="button" class="btn compact" data-action="habit-modal" style="font-size:0.8rem; border-radius:14px; padding:4px 10px;">
          ⏰ Set Reminder · सम्झना
        </button>
      </div>
      <div class="streak-counter-bar">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:12px;">
          <div class="streak-counter-left">
            <span class="streak-flame-icon">🔥</span>
            <div class="streak-counter-text">
              <b>${S.currentStreak() || 1} Day Streak · ${S.currentStreak() || 1} दिन लगातार!</b>
              <small>${today >= goal ? '✅ <span lang="ne" style="color:var(--good); font-weight:700;">आजको लक्ष्य पूरा भयो! स्ट्रिक सुरक्षित छ ✓</span>' : `⚠️ <span lang="ne" style="color:#d97706; font-weight:600;">आज बाँकी: ${Math.max(0, goal - today)} शब्द — स्ट्रिक बचाउनुहोस्!</span>`}</small>
            </div>
          </div>
          <button type="button" class="btn streak-share-btn" data-action="share-app" title="Share with Nepali friends on WhatsApp">
            📲 Share · पठाउनुहोस्
          </button>
        </div>
        <div class="streak-7day-row" aria-label="Last 7 days study consistency">
          ${(() => {
            const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const dayNamesNe = ['सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि', 'आइत'];
            const out = [];
            for (let i = 6; i >= 0; i--) {
              const k = S.addDays(-i);
              const count = S.progress.history[k] || 0;
              const d = new Date(k + 'T12:00:00Z');
              const dayIdx = (d.getUTCDay() + 6) % 7; // Mon=0 .. Sun=6
              const isToday = i === 0;
              out.push(`
                <div class="streak-day-cell ${count > 0 ? 'active' : ''} ${isToday ? 'today' : ''}" title="${k}: ${count} reviews">
                  <span class="streak-day-name">${dayNames[dayIdx]}</span>
                  <span class="streak-day-icon">${count > 0 ? '🔥' : '·'}</span>
                </div>
              `);
            }
            return out.join('');
          })()}
        </div>
      </div>

      <!-- Install to Phone Banner -->
      <div class="install-app-banner" id="install-banner">
        <div class="install-banner-text">
          <b>📱 Add to Home Screen · फोनमा इन्स्टल गर्नुहोस्</b>
          <small>Use offline anytime without opening the browser · ब्राउजर नखोली सिधै चलाउनुहोस्</small>
        </div>
        <button type="button" class="btn install-banner-btn" data-action="install-pwa">
          Install · राख्नुहोस्
        </button>
      </div>

      <!-- 🌟 Today's Essential Polish Phrase -->
      ${(() => {
        const dp = getDailyPhrase();
        return `
          <div class="wotd-card">
            <div class="wotd-top">
              <span class="label">🌟 Phrase of the day · आजको उपयोगी वाक्यांश</span>
              <div style="display:flex; align-items:center; gap:6px;">
                <button type="button" class="star-card-btn ${S.isStarred(dp.pl) ? 'active' : ''}" data-action="star-card" data-pl="${esc(dp.pl)}" title="Save to My Words" style="font-size:1.3rem; padding:2px 6px;">★</button>
                <button class="btn compact listen" data-action="say" data-text="${esc(dp.pl)}">🔊 Listen</button>
              </div>
            </div>
            <div class="wotd-pl-row" style="cursor:pointer; user-select:none;" data-action="say" data-text="${esc(dp.pl)}" title="Tap to listen">
              <span class="wotd-pl" lang="pl">${polish(dp.pl)}</span>
            </div>
            <div class="wotd-meaning">
              <b>${esc(dp.en)}</b> · <span lang="ne">${esc(dp.ne)}</span>
            </div>
            <div class="wotd-tip">
              💡 <i>${esc(dp.tip)}</i>
            </div>
          </div>
        `;
      })()}

      <!-- 🎯 First 7 Days Survival Polish Quick Card -->
      <section class="card" style="border:1.5px solid var(--accent); background:var(--surface); margin-bottom:14px; padding:16px 18px; border-radius:16px; box-shadow:0 4px 16px -4px var(--shadow);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.8rem; font-weight:800; text-transform:uppercase; color:var(--accent); letter-spacing:0.5px;">⚡ Quick Polish for Work & Life</span>
          <span style="font-size:0.8rem; background:var(--sunk); padding:2px 8px; border-radius:12px; font-weight:700;">Day 1 Ready</span>
        </div>
        <h3 style="margin:0 0 4px; font-size:1.15rem;">First 7 Days Survival · पहिलो ७ दिनमा चाहिने पोलिश</h3>
        <p style="margin:0 0 12px; font-size:0.88rem; color:var(--muted);" lang="ne">पसल (Żabka/Biedronka), काम (सिफ्ट/सामान) र आपतकालीन कुराकानी सिधै अभ्यास गर्नुहोस्:</p>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <button type="button" class="btn compact" data-action="go" data-to="sim.zabka" style="background:var(--sunk); border:1px solid var(--line); font-size:0.85rem; font-weight:600;">
            🛒 Shopping · किनमेल
          </button>
          <button type="button" class="btn compact" data-action="go" data-to="work-01" style="background:var(--sunk); border:1px solid var(--line); font-size:0.85rem; font-weight:600;">
            🏭 Work Shifts · काम र सिफ्ट
          </button>
          <button type="button" class="btn compact" data-action="go" data-to="sim.paczkomat" style="background:var(--sunk); border:1px solid var(--line); font-size:0.85rem; font-weight:600;">
            📦 InPost Paczkomat
          </button>
          <button type="button" class="btn compact" data-action="go" data-to="sos" style="background:#fee2e2; color:#991b1b; border:1px solid #fecaca; font-size:0.85rem; font-weight:700;">
            🚨 SOS Pocket Cards
          </button>
        </div>
      </section>

      <!-- Big Hero Start Card for Beginners -->
      <section class="hero-start-banner">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
          <span class="hero-start-badge">🚀 Start Here · यहाँबाट सुरु गर्नुहोस्</span>
          <span style="font-size:0.8rem; background:rgba(255,255,255,0.22); color:#ffffff; padding:3px 10px; border-radius:12px; font-weight:700;">⏱️ 3 min · ३ मिनेटको पाठ</span>
        </div>
        <h2 class="hero-start-title">${st.started && !st.done ? 'Continue: ' + esc(next.title) : 'Lesson: ' + esc(next.title)}</h2>
        <p class="hero-start-sub" lang="ne">${esc(next.titleNe)} — शिक्षिकासँगै एक-एक शब्द सुन्दै, बोल्दै र अभ्यास गर्दै सिक्नुहोस्। (३ मिनेट मात्र)</p>
        ${due > 0 ? `<div class="hero-review-hint" style="background:rgba(0,0,0,0.22); border-radius:10px; padding:8px 12px; font-size:0.88rem; display:flex; align-items:center; gap:8px;">
          <span>🔄</span>
          <span><b>${due} ${due === 1 ? 'word' : 'words'} due for review</b> · ${due} शब्द दोहोर्‍याउन बाँकी</span>
          <button type="button" class="btn compact" data-action="go" data-to="review" style="margin-left:auto; background:#fff; color:#b91c1c; border:0; padding:4px 10px; font-size:0.8rem; font-weight:700;">Review now →</button>
        </div>` : ''}
        <button type="button" class="btn hero-start-btn" data-action="g-start" data-unit="${next.id}">
          ▶ ${st.started && !st.done ? 'Continue Lesson (' + (st.step + 1) + '/' + st.total + ')' : 'Start Lesson Now · पाठ सुरु गर्नुहोस्'}
        </button>
      </section>

      <!-- 3 Clear Actions: Learn, Revise, Everyday Phrases -->
      <div class="beginner-steps-bar" role="group" aria-label="Quick start steps">
        <button type="button" class="beginner-step-card" data-action="g-start" data-unit="${next.id}">
          <span class="beginner-step-num">STEP 1</span>
          <span class="beginner-step-text">📖 Learn</span>
          <span class="beginner-step-ne" lang="ne">सिक्नुहोस्</span>
        </button>
        <button type="button" class="beginner-step-card" data-action="go" data-to="review">
          <span class="beginner-step-num">STEP 2</span>
          <span class="beginner-step-text">🔄 Review (${due})</span>
          <span class="beginner-step-ne" lang="ne">दोहोर्‍याउनुहोस्</span>
        </button>
        <button type="button" class="beginner-step-card" data-action="go" data-to="sos">
          <span class="beginner-step-num">STEP 3</span>
          <span class="beginner-step-text">🚨 Emergency SOS</span>
          <span class="beginner-step-ne" lang="ne">आपतकालीन</span>
        </button>
      </div>

      <div class="home-grid">
        <div class="home-col-main">
          <section class="today">
            <div class="today-top">
              <div>
                <span class="eyebrow">${hello[1]} · <span lang="ne">${hello[2]}</span></span>
                <h2 lang="pl">${hello[0]}</h2>
                <p class="hint">Your level now: <b>${esc(level.name)}</b> · <span lang="ne">${esc(level.ne)}</span></p>
              </div>
              <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                <div class="goal-ring" title="Today's goal">${ring(today, goal)}<span><b>${today}</b>/${goal}</span></div>
                <small style="font-size:0.75rem; color:var(--muted); text-align:center; white-space:nowrap;">
                  ${today >= goal ? '✓ Goal done!' : (new Date().getDay() === 0 || new Date().getDay() === 6) ? '☕ हप्ताको अन्त्य: छोटो रिभ्यु' : Math.max(0, goal - today) <= 3 ? '🔥 अन्तिम केही शब्द!' : `⏱️ ~${Math.ceil(Math.max(0, goal - today) / 3)} मिनेट बाँकी`}
                </small>
              </div>
            </div>
            <h3 class="section-h">Today's plan <span class="ne-sub" lang="ne">आजको योजना</span></h3>
            <ol class="plan">${plan.map((x) => `
              <li><button class="plan-item ${x.main ? 'main' : ''}" ${x.action ? `data-action="${x.action}" data-unit="${x.unit}"` : `data-action="go" data-to="${x.to}"`}>
                <span class="plan-icon" aria-hidden="true">${x.icon}</span>
                <span class="plan-text"><b>${esc(x.en)}</b><span lang="ne">${esc(x.ne)}</span>${x.sub ? `<small>${esc(x.sub)}</small>` : ''}</span>
                <span class="plan-go" aria-hidden="true">→</span>
              </button></li>`).join('')}</ol>
            <p class="hint">${today >= goal ? '🎉 Daily goal reached! · आजको लक्ष्य पूरा भयो!' : `${goal - today} more answers to reach today's goal. · आजको लक्ष्यका लागि ${goal - today} उत्तर बाँकी।`}</p>
            <div style="display:flex; align-items:center; gap:6px; font-size:0.84rem; color:var(--muted); margin-top:4px;">
              <span>✨</span>
              <span><b>${today} answers practiced today</b> (आज ${today} पटक अभ्यास गरियो)</span>
            </div>
          </section>
          ${S.Recorder ? S.Recorder.renderQuizWidget() : ''}
          ${!S.COURSE.some(S.unitStarted) && !S.progress.placement ? `
            <section class="card compact first-time">
              <p><b>New here?</b> Start with the first lesson. Already know some Polish? Take the placement test to find your level.<br><span lang="ne">नयाँ हुनुहुन्छ? पहिलो पाठबाट सुरु गर्नुहोस्। अलि पोलिश आउँछ भने स्तर परीक्षा दिनुहोस्।</span></p>
              <div class="row start"><button class="btn primary" data-action="go" data-to="placement">Find my level · स्तर परीक्षा →</button></div>
            </section>` : ''}
        </div>
        <div class="home-col-side">
          <section class="card compact">
            <h3 class="section-h">Your course <span class="ne-sub" lang="ne">तपाईंको पाठ्यक्रम</span></h3>
            <p class="hint">Select a level to jump to units: · स्तर छान्नुहोस्:</p>
            <div class="level-strip">${S.LEVELS.filter((l) => S.COURSE.some((u) => u.level === l.id)).map((l) => {
              const units = S.COURSE.filter((u) => u.level === l.id);
              const done = units.filter((u) => S.Guided.status(u).done).length;
              return `<button class="level-chip lv-${l.id} ${l.id === next.level ? 'current' : ''}" data-action="go" data-to="course.${l.id}">
                <b>${esc(l.id === 'Start' ? 'Start' : l.id)}</b><small>${done}/${units.length}</small>${S.bar(done, units.length)}</button>`;
            }).join('')}</div>
          </section>
          <section class="card compact quick-tools-card">
            <h3 class="section-h">Quick practice <span class="ne-sub" lang="ne">द्रुत अभ्यास</span></h3>
            <div class="quick-tools-grid">
              <button class="quick-tool-btn" data-action="go" data-to="sos">
                <span class="qt-icon">🚨</span>
                <div class="qt-text"><b>Emergency SOS</b><small lang="ne">स्थानीयलाई देखाउने</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="sim">
                <span class="qt-icon">🏪</span>
                <div class="qt-text"><b>Żabka / Paczkomat</b><small lang="ne">दैनिक सिमुलेटर</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="review">
                <span class="qt-icon">↻</span>
                <div class="qt-text"><b>Daily review (${due})</b><small lang="ne">दोहोर्‍याइ</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="pronstudio">
                <span class="qt-icon">🎙️</span>
                <div class="qt-text"><b>Voice Studio</b><small lang="ne">उच्चारण रेकर्डर</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="turn">
                <span class="qt-icon">🎤</span>
                <div class="qt-text"><b>Your turn</b><small lang="ne">बोल्ने अभ्यास</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="verbs">
                <span class="qt-icon">⚡</span>
                <div class="qt-text"><b>Verb trainer</b><small lang="ne">क्रियापद</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="match" style="border:1px solid #f59e0b; background:#fffbeb;">
                <span class="qt-icon">⚡</span>
                <div class="qt-text"><b style="color:#b45309;">Speed Match</b><small lang="ne" style="color:#92400e;">६० सेकेन्ड खेल</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="guide">
                <span class="qt-icon">📘</span>
                <div class="qt-text"><b>Living in Poland</b><small lang="ne">बस, तलब, कानुनी जानकारी</small></div>
              </button>
              <button class="quick-tool-btn" data-action="go" data-to="numbers">
                <span class="qt-icon">123</span>
                <div class="qt-text"><b>Numbers</b><small lang="ne">अङ्क र मूल्य</small></div>
              </button>
            </div>
          </section>
        </div>
      </div>`;
  }

  function renderCourse() {
    const only = S.route.arg && S.levelIndex(S.route.arg) >= 0 ? S.route.arg : null; // ignore an unknown level
    view.innerHTML = `
      <header class="unit-head">
        <span class="eyebrow">Course · पाठ्यक्रम</span>
        <h2>From zero to fluent</h2>
        <p class="hint">Six parts, from the alphabet to upper-intermediate (B2), plus Polish for work. Do the lessons in order; each one takes 10–20 minutes with your teacher.<br><span lang="ne">वर्णमालादेखि उच्च-मध्यम (B2) सम्म, साथै कामको पोलिश। पाठहरू क्रमैसँग गर्नुहोस्।</span></p>
        <div class="seg chips" role="group">${S.LEVELS.filter((l) => S.COURSE.some((u) => u.level === l.id)).map((l) => `<button data-action="go" data-to="course.${l.id}" aria-pressed="${only === l.id}">${esc(l.id)}</button>`).join('')}<button data-action="go" data-to="course" aria-pressed="${!only}">All</button></div>
      </header>
      ${S.LEVELS.filter((l) => !only || l.id === only).map((level) => {
        const units = S.COURSE.filter((u) => u.level === level.id);
        if (!units.length) return '';
        const done = units.filter((u) => S.Guided.status(u).done).length;
        const rps = S.ROLEPLAYS.filter((r) => r.level === level.id);
        const sts = S.STORIES.filter((x) => x.level === level.id);
        return `
          <section class="chapter lv-${level.id}" aria-labelledby="lvl-${level.id}">
            <header class="chapter-head">
              <div>
                <span class="chapter-tag">${level.id === 'Start' ? 'Level 0' : level.id === 'Work' ? 'Extra' : `Level ${level.id}`}</span>
                <h2 id="lvl-${level.id}">${esc(level.name)} <span class="ne-sub" lang="ne">${esc(level.ne)}</span></h2>
                <p>${esc(level.blurb)} · <span lang="ne">${esc(level.blurbNe)}</span></p>
              </div>
              <span class="chapter-count">${done}/${units.length}<small>lessons</small></span>
            </header>
            <div class="can-do">
              <span class="label">After this level you can · यो स्तरपछि तपाईं सक्नुहुन्छ</span>
              <ul>${(CAN_DO[level.id] || []).map(([en, ne]) => `<li>${esc(en)} · <span lang="ne">${esc(ne)}</span></li>`).join('')}</ul>
            </div>
            <ol class="units">${units.map((u) => {
              const rev = S.Assess.revisionAfter(u.id);
              return unitButton(u) + (rev ? checkpointRow(rev, '↻', 'Revision', 'दोहोर्याइ') : '');
            }).join('')}${(() => { const t = S.Assess.testFor(level.id); return t ? checkpointRow(t, '🎓', 'Level test', 'स्तर परीक्षा') : ''; })()}</ol>
            ${rps.length || sts.length || level.id === 'B1' ? `
              <div class="chapter-extra">
                <span class="label">Also at this level · यो स्तरमा अरू</span>
                <div class="chip-row">
                  ${rps.length ? `<button class="chip-btn" data-action="go" data-to="talk">💬 ${rps.length} conversations</button>` : ''}
                  ${sts.length ? `<button class="chip-btn" data-action="go" data-to="read">📖 ${sts.length} texts</button>` : ''}
                  ${level.id === 'B1' ? '<button class="chip-btn" data-action="go" data-to="exam">🎓 B1 exam practice</button>' : ''}
                </div>
              </div>` : ''}
          </section>`;
      }).join('')}`;
  }

  function renderPractice() {
    const due = S.dueList().length;
    const mistakes = S.Extras.mistakeItems().length;
    const group = (title, ne, items) => `
      <section class="pgroup">
        <h3 class="section-h">${title} <span class="ne-sub" lang="ne">${ne}</span></h3>
        <div class="tools">${items.map(([to, big, en, sub, hot]) => `<button class="tool ${hot ? 'hot' : ''}" data-action="go" data-to="${to}"><b>${big}</b><span>${en}</span><small lang="ne">${sub}</small></button>`).join('')}</div>
      </section>`;
    view.innerHTML = `
      <header class="unit-head">
        <span class="eyebrow">Practice · अभ्यास</span>
        <h2>Train each skill</h2>
        <p class="hint">Use these any time, next to your lessons. · पाठसँगै जुनसुकै बेला प्रयोग गर्नुहोस्।</p>
      </header>
      ${group('Vocabulary', 'शब्द', [
        ['commute', '🎧', 'Commute Mode', 'ह्यान्ड्स-फ्री', true],
        ['review', due, 'Daily review', 'दैनिक दोहोर्याइ', due > 0],
        ['mywords', (S.progress.mywords || []).length || '+', 'My words', 'मेरा शब्द'],
        ['numbers', '123', 'Numbers & prices', 'अङ्क र मूल्य'],
        ['dictionary', S.ENTRIES.length, 'Dictionary', 'शब्दकोश']
      ])}
      ${group('Grammar', 'व्याकरण', [['verbs', S.Trainers.VERBS.length, 'Verbs', 'क्रियापद'], ['cases', 7, 'Cases', 'विभक्ति'], ['mistakes', mistakes, 'My mistakes', 'मेरा गल्ती', mistakes > 0]])}
      ${group('Pronunciation', 'उच्चारण', [
        ['pronstudio', '🎙️', 'Voice Studio', 'आवाज रेकर्डर र तुलना', true],
        ['alphabet', '<span lang="pl">Ąą</span>', 'Alphabet', 'वर्णमाला'],
        ['sounds', S.Trainers.SOUNDS.length, 'Sounds lab', 'ध्वनि अभ्यास']
      ])}
      ${group('Real life & Work', 'वास्तविक जीवन र काम', [
        ['sos', '🚨', '"Show to Local"', 'आपतकालीन कार्ड', true],
        ['sim', '🏪', 'Everyday Polish', 'झाब्का/क्लिनिक सिमुलेटर', true],
        ['guide', '🇵🇱', 'Life in Poland', 'पोल्यान्ड गाइड', true],
        ['turn', S.Speaking.list().length, 'Speaking: your turn', 'बोल्ने अभ्यास', true],
        ['listen', S.Listening.TASKS.length, 'Listening', 'सुनाइ'],
        ['talk', S.ROLEPLAYS.length, 'Conversations', 'संवाद'],
        ['read', S.STORIES.length, 'Reading', 'पढाइ']
      ])}
      ${group('Tests', 'परीक्षा', [['placement', '30', 'Find my level', 'स्तर परीक्षा'], ['exam', 'B1', 'B1 exam practice', 'B1 परीक्षा']])}`;
  }

  // ---------- unit ----------

  const TABS = [
    { id: 'learn', en: 'Learn', ne: 'पाठ' },
    { id: 'cards', en: 'Cards', ne: 'कार्ड' },
    { id: 'quiz', en: 'Quiz', ne: 'प्रश्न' },
    { id: 'listen', en: 'Listen', ne: 'सुनाइ', show: () => S.canSpeak },
    { id: 'speak', en: 'Speak', ne: 'बोलाइ' },
    { id: 'type', en: 'Type', ne: 'लेखाइ' },
    { id: 'dictate', en: 'Dictation', ne: 'श्रुतलेख', show: () => S.canSpeak },
    { id: 'drill', en: 'Grammar', ne: 'व्याकरण', show: (u) => (S.DRILLS[u.id] || []).length > 0 },
  ];

  function renderUnit() {
    const u = S.UNIT.get(S.route.id);
    const idx = S.COURSE.indexOf(u);
    const level = S.LEVELS[S.levelIndex(u.level)];
    const n = u.entries.length;
    const l = S.unitLearned(u);
    const tabs = TABS.filter((t) => !t.show || t.show(u));
    if (!tabs.some((t) => t.id === S.route.tab)) S.route.tab = 'learn';
    const drill = S.progress.drills[u.id];

    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">${esc(level.name)} · Unit ${esc(u.id.split('-')[1])}</span>
        <h2>${esc(u.title)}</h2>
        <p class="unit-head-ne" lang="ne">${esc(u.titleNe)}</p>
        <p class="hint">${esc(u.summary)}<br><span lang="ne">${esc(u.summaryNe)}</span></p>
        <div class="unit-meter">${S.bar(l, n)}<small>${l} of ${n} learned${drill ? ` · grammar best ${Number(drill.best) || 0}%` : ''}</small></div>
      </header>
      ${(() => {
        const st = S.Guided.status(u);
        return `<div class="teach-cta">
          <div><b>${st.done ? 'Lesson finished ✓' : st.started ? `Continue the lesson · step ${st.step + 1} of ${st.total}` : 'Learn this unit with your teacher'}</b>
          <span lang="ne">${st.done ? 'पाठ सकियो · फेरि गर्न सक्नुहुन्छ' : st.started ? 'पाठ जारी राख्नुहोस्' : 'शिक्षिकासँग चरणबद्ध रूपमा सिक्नुहोस्'}</span></div>
          <button class="btn primary" data-action="g-start" data-unit="${u.id}">${st.done ? 'Repeat lesson' : st.started ? 'Continue →' : 'Start lesson →'}</button>
        </div>
        <h3 class="section-h">Or practise freely <span class="ne-sub" lang="ne">वा आफैँ अभ्यास गर्नुहोस्</span></h3>`;
      })()}
      <nav class="tabs" role="tablist" aria-label="Lesson sections">
        ${tabs.map((t) => `<button class="tab" role="tab" aria-selected="${S.route.tab === t.id}" data-action="tab" data-tab="${t.id}">${t.en}<small lang="ne">${t.ne}</small></button>`).join('')}
      </nav>
      <section class="stage" id="stage"></section>
      <nav class="pager">
        ${idx > 0 ? `<button class="btn" data-action="go" data-to="${S.COURSE[idx - 1].id}">← ${esc(S.COURSE[idx - 1].title)}</button>` : '<span></span>'}
        ${idx < S.COURSE.length - 1 ? `<button class="btn" data-action="go" data-to="${S.COURSE[idx + 1].id}">${esc(S.COURSE[idx + 1].title)} →</button>` : ''}
      </nav>
      ${S.route.tab === 'learn' ? `<p class="report-row">${S.reportHTML(u.title, `Unit ${u.id}`)}</p>` : ''}`;

    const stage = $('#stage');
    if (S.route.tab === 'learn') stage.innerHTML = learnHTML(u);
    else {
      const drills = (S.DRILLS[u.id] || []).map((d, i) => ({ d, unit: u.id, idx: i }));
      S.Practice.render(stage, { key: `${u.id}:${S.route.tab}`, mode: S.route.tab, pool: u.entries, unitId: u.id, drills });
    }
  }

  function learnHTML(u) {
    const paragraphs = u.lesson.map((p) => `
      <div class="para">
        ${S.shows('explain', 'en') ? `<p>${S.markup(p.en)}</p>` : ''}
        ${S.shows('explain', 'ne') ? `<p class="ne" lang="ne">${S.markup(p.ne)}</p>` : ''}
      </div>`).join('');
    const tables = (u.tables || []).map((t) => `
      <div class="table-wrap">
        <table>
          <caption>${esc(t.title)}${t.titleNe ? ` · <span lang="ne">${esc(t.titleNe)}</span>` : ''}</caption>
          <thead><tr>${t.head.map((h) => `<th scope="col">${S.markup(h)}</th>`).join('')}</tr></thead>
          <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${S.markup(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`).join('');
    const alphabet = u.id === 'start-01' && S.ALPHABET.length ? `<h3>All 32 letters <span class="ne-sub" lang="ne">सबै ३२ अक्षर</span></h3>${alphabetGrid()}` : '';
    const words = u.entries.filter((e) => e.kind === 'word');
    const phrases = u.entries.filter((e) => e.kind === 'phrase');
    const dialogue = (u.dialogue || []).length ? `
      <h3>Dialogue <span class="ne-sub" lang="ne">संवाद</span></h3>
      <div class="dialogue">
        ${u.dialogue.map(([who, pl, en, ne], i) => `
          <div class="line ${i % 2 ? 'right' : ''}">
            <span class="who">${esc(who)}</span>
            <div class="bubble">
              <div class="bubble-pl"><span lang="pl">${polish(pl)}</span>${S.listenBtn(pl)}</div>
              ${S.shows('meaning', 'en') ? `<div class="m-en">${esc(en)}</div>` : ''}
              ${S.shows('meaning', 'ne') ? `<div class="m-ne" lang="ne">${esc(ne)}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>
      <div class="row start"><button class="btn turn-cta" data-action="go" data-to="turn.${u.id}">${S.MIC} Your turn: speak this dialogue · तपाईंको पालो</button></div>` : '';
    const hasDrills = (S.DRILLS[u.id] || []).length > 0;
    return `
      <article class="lesson">
        <h3>Lesson <span class="ne-sub" lang="ne">पाठ</span></h3>
        ${paragraphs}
        ${tables}
        ${alphabet}
        <h3>Words <span class="ne-sub" lang="ne">शब्दहरू</span> <small>${words.length}</small></h3>
        <ul class="entries">${words.map(S.entryRow).join('')}</ul>
        ${phrases.length ? `<h3>Sentences <span class="ne-sub" lang="ne">वाक्यहरू</span> <small>${phrases.length}</small></h3><ul class="entries">${phrases.map(S.entryRow).join('')}</ul>` : ''}
        ${dialogue}
        <div class="row start">
          <button class="btn primary" data-action="tab" data-tab="cards">Practise the words → <span lang="ne">अभ्यास</span></button>
          ${hasDrills ? '<button class="btn" data-action="tab" data-tab="drill">Grammar exercises → <span lang="ne">व्याकरण</span></button>' : ''}
        </div>
      </article>`;
  }

  // ---------- review and mistakes practice ----------

  function renderReview() {
    const due = S.dueList();
    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">Daily review · दैनिक दोहोर्याइ</span>
        <h2>${due.length ? `${due.length} ${due.length === 1 ? 'word is' : 'words are'} due today` : 'Daily review'}</h2>
        <p class="hint">Words you have practised come back on a schedule: tomorrow, then in 2, 4, 7 and 14 days. Words you already know a little are asked the other way round: from the meaning (say or write the Polish) or from sound. A few minutes every day is the fastest way to remember.<br>
        <span lang="ne">अभ्यास गरेका शब्दहरू तालिका अनुसार फर्कन्छन्: भोलि, अनि २, ४, ७ र १४ दिनपछि। अलि-अलि जानेका शब्दहरू उल्टो तरिकाले सोधिन्छन्: अर्थबाट पोलिश भन्नुहोस् वा लेख्नुहोस्, वा सुनेर चिन्नुहोस्। हरेक दिन केही मिनेट दोहोर्‍याउनु नै छिटो सम्झने उपाय हो।</span></p>
      </header>
      <section class="stage" id="stage"></section>
      ${S.Extras.mistakeItems().length ? `<section class="card compact extra-review"><span class="label">Also due · यो पनि दोहोर्‍याउनुहोस्</span>
        <p>You have <b>${S.Extras.mistakeItems().length}</b> grammar ${S.Extras.mistakeItems().length === 1 ? 'mistake' : 'mistakes'} to practise again.</p>
        <button class="btn" data-action="go" data-to="mistakes.practice">Practise my mistakes →</button></section>` : ''}`;
    S.Practice.render($('#stage'), { key: 'review', mode: 'cards', pool: due, review: true });
  }

  function renderMistakePractice() {
    const items = S.Extras.mistakeItems().map(({ m }) => ({ d: S.DRILLS[m.unit][m.idx], unit: m.unit, idx: m.idx }));
    view.innerHTML = `
      ${S.backLink('mistakes', 'My mistakes · मेरा गल्ती')}
      <header class="unit-head"><span class="eyebrow">Mistakes notebook · गल्ती कापी</span><h2>Practise my mistakes</h2></header>
      <section class="stage" id="stage"></section>`;
    S.Practice.render($('#stage'), { key: 'mistakes', mode: 'drill', drills: items, mixed: true, pool: [] });
  }

  // ---------- alphabet ----------

  const pronPair = (pron, proNe) => S.pronHTML({ pron, proNe });
  const meaningPair = (en, ne) => `<span class="ex-m">${S.shows('meaning', 'en') ? esc(en) : ''}${S.settings.meaning === 'both' ? ' · ' : ''}${S.shows('meaning', 'ne') ? `<span lang="ne">${esc(ne)}</span>` : ''}</span>`;
  const soundLines = (a) => `${S.shows('explain', 'en') ? `<span class="sound">${esc(a.soundEn)}</span>` : ''}${S.shows('explain', 'ne') ? `<span class="sound" lang="ne">${esc(a.soundNe)}</span>` : ''}`;
  const exampleHTML = (a) => `
        <span class="example">
          <span class="ex-word"><b lang="pl">${polish(a.example)}</b>${S.listenBtn(a.example)}</span>
          ${pronPair(a.pron, a.proNe)}
          ${meaningPair(a.exampleEn, a.exampleNe)}
        </span>`;

  function alphabetGrid() {
    return `
      ${S.canSpeak ? `<div class="row start abc-play"><button type="button" class="btn primary" data-action="abc-play">${S.SPEAKER} Listen to the whole alphabet <span lang="ne">पूरा वर्णमाला सुन्नुहोस्</span></button><button type="button" class="btn" data-action="abc-stop">■ Stop</button></div>` : ''}
      <div class="letters">${S.ALPHABET.map((a) => `
      <div class="letter" data-letter-glyph="${esc(a.letter)}">
        <div class="letter-top">
          <button type="button" class="glyph-btn" data-action="say" data-text="${esc(a.say)}" style="background:none; border:none; padding:0; text-align:left; cursor:pointer;" title="Listen to letter"><span class="glyph" lang="pl">${polish(a.letter)}</span></button>
          ${a.say ? `<button type="button" class="name-chip" data-action="say" data-text="${esc(a.say)}" title="Hear the name of the letter" aria-label="Hear the letter ${esc(a.say)}">${S.SPEAKER}<span class="name-pl" lang="pl">${polish(a.say)}</span></button>` : ''}
        </div>
        ${a.namePron ? `<span class="letter-name"><span class="label">Name · नाम</span>${pronPair(a.namePron, a.nameNe)}</span>` : ''}
        ${soundLines(a)}
        ${exampleHTML(a)}
      </div>`).join('')}</div>
      ${S.LETTER_PAIRS.length ? `
      <h3 class="section-h">Letter pairs: two letters, one sound <span class="ne-sub" lang="ne">दुई अक्षर, एउटा आवाज</span></h3>
      <p class="hint">These pairs are always read as one sound. · यी जोडी सधैं एउटै आवाजमा पढिन्छन्।</p>
      <div class="letters">${S.LETTER_PAIRS.map((a) => `
      <div class="letter">
        <div class="letter-top"><button type="button" class="glyph-btn" data-action="say" data-text="${esc(a.example)}" style="background:none; border:none; padding:0; text-align:left; cursor:pointer;" title="Listen to sound"><span class="glyph" lang="pl">${polish(a.letters)}</span></button></div>
        ${soundLines(a)}
        ${exampleHTML(a)}
      </div>`).join('')}</div>` : ''}`;
  }

  function renderAlphabet() {
    const first = S.COURSE.find((u) => u.level === 'Start');
    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">Reference · सन्दर्भ</span>
        <h2>The Polish alphabet</h2>
        <p class="unit-head-ne" lang="ne">पोलिश वर्णमाला</p>
        <p class="hint">32 letters. Polish is read exactly as it is written, so once you know these sounds you can read any word. Stress falls on the second-to-last syllable.<br>
        <span lang="ne">३२ अक्षर। पोलिश जस्तो लेखिन्छ त्यस्तै पढिन्छ। जोड प्राय: अन्तिमभन्दा अघिल्लो शब्दांशमा पर्छ।</span></p>
      </header>
      ${S.ALPHABET.length ? alphabetGrid() : '<p class="empty">The alphabet did not load.</p>'}
      <section class="card compact cluster-guide-section" style="margin-top:24px;">
        <h3 class="section-h">Tricky Consonant Clusters <span class="ne-sub" lang="ne">गाह्रो पोलिश व्यञ्जन समूह (szcz, prz, trz...)</span></h3>
        <p class="hint">Foreign learners often get stuck on combinations like <b>prz</b>, <b>trz</b>, <b>strz</b> and <b>szcz</b>. Here is the native sound breakdown with audio examples and Nepali approximations.<br>
        <span lang="ne">यी गाह्रा संयुक्त व्यञ्जनहरूको ठेट उच्चारण, उदाहरण र नेपाली रूप।</span></p>
        ${S.Pron && S.Pron.clusterGuideHTML ? S.Pron.clusterGuideHTML() : ''}
      </section>
      ${first ? `<div class="row start"><button class="btn primary" data-action="go" data-to="${first.id}">Start the first lesson →</button></div>` : ''}`;
  }

  
  // =====================================================================
  // Feedback & Problem Reporting Mega Section (समस्या तथा सुझाव रिपोर्ट)
  // =====================================================================
  function renderFeedback() {
    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">Help & Feedback · समस्या तथा सुझाव</span>
        <h2>Report an issue or give feedback</h2>
        <p class="unit-head-ne" lang="ne">समस्या रिपोर्ट गर्नुहोस् वा सुझाव दिनुहोस्</p>
        <p class="hint">Found a mistake, broken audio, confusing explanation, or want to suggest a new feature? Select your issue below. Your feedback helps thousands of Nepali learners in Poland!<br>
        <span lang="ne">अनुवादमा गल्ती, नबजेको आवाज, नबुझिएको नियम वा नयाँ सुझाव भए यहाँ छान्नुहोस्। तपाईंको सुझावबाट हामी एपलाई अझै राम्रो बनाउनेछौं।</span></p>
      </header>

      <form class="card feedback-mega-form" data-form="user-feedback" autocomplete="off">
        <div class="feedback-category-group">
          <span class="label">What kind of problem are you facing? · समस्याको प्रकार छान्नुहोस्:</span>
          <div class="fb-chips-grid">
            <label class="fb-chip-option">
              <input type="radio" name="fb_cat" value="mistake" checked>
              <span>❌ Translation or grammar error <small lang="ne">अनुवाद वा व्याकरण गल्ती</small></span>
            </label>
            <label class="fb-chip-option">
              <input type="radio" name="fb_cat" value="audio">
              <span>🔇 Audio / Sound issue <small lang="ne">आवाज नबजेको वा अस्पष्ट</small></span>
            </label>
            <label class="fb-chip-option">
              <input type="radio" name="fb_cat" value="confusing">
              <span>🤔 Confusing explanation <small lang="ne">नियम बुझ्न गाह्रो भएको</small></span>
            </label>
            <label class="fb-chip-option">
              <input type="radio" name="fb_cat" value="bug">
              <span>📱 App button or screen stuck <small lang="ne">बटन नथिचिएको वा अड्किएको</small></span>
            </label>
            <label class="fb-chip-option">
              <input type="radio" name="fb_cat" value="feature">
              <span>💡 Suggest a new word/topic <small lang="ne">नयाँ शब्द वा विषय थप्ने सुझाव</small></span>
            </label>
            <label class="fb-chip-option">
              <input type="radio" name="fb_cat" value="other">
              <span>💬 Other feedback <small lang="ne">अन्य प्रतिक्रिया</small></span>
            </label>
          </div>
        </div>

        <label class="field">
          <span>Which lesson, word, or screen? · कुन पाठ, शब्द वा स्क्रिनमा?</span>
          <input class="type-input wide" name="fb_location" id="fb-location" placeholder="e.g. Unit A1-02, Verb table, Żabka simulator, etc.">
        </label>

        <label class="field">
          <span>Describe the problem or what it should be · समस्या वा सही रूप लेख्नुहोस्:</span>
          <textarea class="type-input wide" name="fb_details" id="fb-details" rows="4" required placeholder="Explain what happened or what needs to be improved... (तपाईंले नेपाली वा अंग्रेजीमा लेख्न सक्नुहुन्छ)"></textarea>
        </label>

        <label class="field">
          <span>Your contact email (optional for replies) · तपाईंको इमेल (ऐच्छिक):</span>
          <input class="type-input wide" type="email" name="fb_email" id="fb-email" placeholder="name@example.com">
        </label>

        <div class="row start" style="margin-top: 14px; gap: 10px;">
          <button type="submit" class="btn primary">🚀 Submit Report · पठाउनुहोस्</button>
          <button type="button" class="btn" data-action="fb-github-issue">Open GitHub Issue →</button>
        </div>

        <div id="fb-status-msg" class="feedback-status-box" style="display:none;" role="status"></div>
      </form>

      <section class="card compact" style="margin-top: 24px; text-align: left; background: var(--sunk);">
        <span class="label">Direct contact · सिधै सम्पर्क</span>
        <p style="margin: 6px 0; font-size: 0.95rem;">You can also email directly: <b>info.poljobhub@gmail.com</b></p>
        <p class="hint">All feedback reports are saved locally and forwarded to GitHub Issues to keep improving the app.</p>
      </section>
    `;
  }

// ---------- dictionary ----------

  function renderDictionary() {
    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">Reference · सन्दर्भ</span>
        <h2>Dictionary</h2>
        <p class="unit-head-ne" lang="ne">शब्दकोश</p>
        <p class="hint">Search every word and sentence in Polish, English or Nepali. You can type Polish without accents.</p>
      </header>
      <div class="row start" style="margin-bottom: 8px; gap: 8px; align-items:center;">
        <div style="position:relative; flex:1; display:flex; align-items:center;">
          <input class="search" id="dict-q" type="search" placeholder="Search: dom, house, घर…" aria-label="Search the dictionary" value="${esc(S.route.q || '')}" style="width:100%; padding-right:32px;">
          <button type="button" class="dict-clear-btn" data-action="dict-clear" title="Clear input" style="position:absolute; right:8px; background:none; border:none; color:var(--muted); font-size:1.1rem; cursor:pointer; padding:4px;">✕</button>
        </div>
        <button type="button" class="dict-filter-chip" id="dict-work-filter" data-action="dict-toggle-work" style="border-radius:10px; padding:6px 12px; font-size:0.84rem; cursor:pointer;" title="Show workplace words">🏭 Work Polish</button>
        <button type="button" class="dict-filter-chip" id="dict-star-filter" data-action="dict-toggle-stars" style="border-radius:10px; padding:6px 12px; font-size:0.84rem; cursor:pointer;" title="Show only starred words">⭐ Starred</button>
      </div>
      <p class="hint" id="dict-count"></p>
      <ul class="entries" id="dict-results"></ul>`;
    const input = $('#dict-q');
    // Wait until typing pauses, so a phone is not slowed down by drawing the list on every letter.
    let timer = 0;
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { if (input.isConnected) updateDictionary(); }, 150); });
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && input.value) {
        input.value = '';
        updateDictionary();
      }
    });
    updateDictionary();
    input.focus({ preventScroll: true });
  }

  let dictStarredOnly = false;
  let dictWorkOnly = false;
  const dictCache = new Map();
  function updateDictionary() {
    const raw = $('#dict-q').value.trim();
    const q = S.fold(raw);
    const rawLow = raw.toLowerCase();
    let hits;

    const starredSet = (S.MyWords && S.MyWords.getWords) ? new Set(S.MyWords.getWords().map((w) => w.pl)) : new Set();
    if (!raw) {
      hits = S.ENTRIES.filter((e) => e.kind === 'word');
    } else if (dictCache.has(rawLow) && !dictStarredOnly) {
      hits = dictCache.get(rawLow);
    } else {
      const all = [...S.LEXICON.values()];
      const fold = (e) => e._fold || (e._fold = S.fold(e.pl));
      const low = (e) => e._low || (e._low = String(e.en).toLowerCase());
      hits = all.filter((e) => fold(e).includes(q) || low(e).includes(rawLow) || String(e.ne).includes(raw));
      const pre = new Map(hits.map((e) => [e, fold(e).startsWith(q) ? 1 : 0]));
      hits.sort((a, b) => (pre.get(b) - pre.get(a)) || a.pl.length - b.pl.length);
      if (dictCache.size > 200) dictCache.clear();
      dictCache.set(rawLow, hits);
    }

    if (dictStarredOnly) {
      hits = hits.filter((e) => starredSet.has(e.pl));
    }
    if (dictWorkOnly) {
      hits = hits.filter((e) => e.source && e.source.startsWith('work'));
    }
    const shown = hits.slice(0, 80);
    $('#dict-count').textContent = raw
      ? `${hits.length} ${hits.length === 1 ? 'result' : 'results'}${hits.length > shown.length ? `, showing the first ${shown.length}` : ''}`
      : `Showing the first ${shown.length} of ${hits.length} words. Type to search.`;
    $('#dict-results').innerHTML = shown.map((e) => {
      const u = S.UNIT.get(e.source);
      const link = u ? `<button class="from" data-action="go" data-to="${u.id}">${esc(u.level)} · ${esc(u.title)}</button>` : '';
      return S.entryRow(e).replace(/<\/li>\s*$/, `${link}</li>`);
    }).join('');
  }

  // ---------- settings ----------

  function segmented(key, label, labelNe, options) {
    return `
      <fieldset class="setting">
        <legend>${label} <span lang="ne">${labelNe}</span></legend>
        <div class="seg">
          ${options.map(([value, text]) => `<button type="button" data-action="set" data-key="${key}" data-value="${value}" aria-pressed="${String(S.settings[key]) === String(value)}">${text}</button>`).join('')}
        </div>
      </fieldset>`;
  }

  function renderSettings() {
    const langs = [['both', 'Both · दुवै'], ['en', 'English'], ['ne', 'नेपाली']];
    const audioCount = Object.keys(S.AUDIO).length;
    const ttsCount = Object.keys(S.TTS).length;
    view.innerHTML = `
      ${S.backLink()}
      <header class="unit-head">
        <span class="eyebrow">Settings · सेटिङ</span>
        <h2>Make it yours</h2>
      </header>
      <div class="settings">
        ${segmented('meaning', 'Show meanings in', 'अर्थ देखाउने भाषा', langs)}
        ${segmented('pron', 'Show pronunciation in', 'उच्चारण देखाउने लिपि', [['both', 'Both · दुवै'], ['en', 'English letters'], ['ne', 'देवनागरी']])}
        ${segmented('explain', 'Explain lessons in', 'पाठको व्याख्या', langs)}
        ${segmented('dir', 'Cards and quiz show', 'कार्डमा पहिले देखाउने', [['pl', 'Polish first'], ['meaning', 'Meaning first']])}
        <fieldset class="setting">
          <legend>Theme · रंगको थिम</legend>
          <div class="seg">
            <button type="button" data-action="set-theme" data-theme="light" aria-pressed="${(localStorage.getItem('slowka-theme') || 'auto') === 'light'}">☀️ Light</button>
            <button type="button" data-action="set-theme" data-theme="dark" aria-pressed="${(localStorage.getItem('slowka-theme') || 'auto') === 'dark'}">🌙 Dark</button>
            <button type="button" data-action="set-theme" data-theme="auto" aria-pressed="${(localStorage.getItem('slowka-theme') || 'auto') === 'auto'}">💻 Auto (System)</button>
          </div>
        </fieldset>
        ${segmented('goal', 'Daily goal (answers)', 'दैनिक लक्ष्य', [['10', '10 · relaxed'], ['20', '20 · normal'], ['40', '40 · serious'], ['60', '60 · intense']])}
        ${S.canSpeak ? segmented('slow', 'Speaking speed', 'बोल्ने गति', [['false', 'Normal'], ['true', 'Slow · बिस्तारै']]) : ''}
        ${audioCount || ttsCount ? segmented('audio', `Voice (${audioCount} native recordings${ttsCount ? ` + ${ttsCount} built-in` : ''})`, 'आवाज', [['native', 'Recordings first'], ['device', 'Device voice only']]) : ''}
        <div class="card compact" style="margin: 8px 0; background: var(--sunk); font-size: 0.88rem;"><span class="badge">Offline audio ✓</span> Native audio files and models are cached by the Service Worker for offline study.</div>
        ${segmented('sfx', 'Sound effects (chimes on answer)', 'ध्वनि प्रभाव (सही/गलत आवाज)', [['true', 'On · चालु'], ['false', 'Muted · बन्द']])}
        ${segmented('autoplay', 'Auto-play speech (words play automatically)', 'स्वतः आवाज बजाउने', [['true', 'On · चालु'], ['false', 'Manual only (tap to play)']])}
        ${segmented('stress', 'Syllable-stress visualizer', 'अक्षर जोड (पेनल्टिमेट स्ट्रेस)', [['false', 'Off · बन्द'], ['true', 'On · Dzię·KU·ję']])}
        ${segmented('studyquiz', 'Hide translations (Self-quiz mode)', 'अर्थ लुकाउने मोड (स्वयं परीक्षण)', [['false', 'Show normally'], ['true', 'Mask meanings (tap to reveal)']])}
        ${segmented('fontsize', 'Reading font size', 'अक्षरको आकार', [['normal', 'Standard'], ['large', 'Large · ठूलो'], ['xlarge', 'Extra Large']])}

        <fieldset class="setting">
          <legend>Use on another phone or computer <span lang="ne">अर्को फोन वा कम्प्युटरमा</span></legend>
          <p class="hint">Your progress is saved in this browser. Copy this backup code and paste it on your other device to move your progress. · यो कोड अर्को उपकरणमा टाँस्नुहोस्।</p>
          <textarea class="code" id="backup-out" readonly rows="3" aria-label="Your backup code">${esc(S.backupCode())}</textarea>
          <div class="row start"><button class="btn" data-action="backup-copy">Copy backup code</button></div>
          <textarea class="code" id="backup-in" rows="3" aria-label="Paste a backup code" placeholder="Paste a backup code here…"></textarea>
          <div class="row start"><button class="btn" data-action="backup-restore">Restore from code</button><span class="hint" id="backup-msg"></span></div>
        </fieldset>

        <fieldset class="setting">
          <legend>Install and use offline <span lang="ne">इन्स्टल र अफलाइन प्रयोग</span></legend>
          <p class="hint">Open the app's website in Chrome (Android) or Safari (iPhone). Then choose <b>Add to Home screen</b> from the browser menu. It then opens like an app and works without internet. The microphone and speaking practice also work there.<br>
          <span lang="ne">एपको वेबसाइट Chrome वा Safari मा खोल्नुहोस्, अनि मेनुबाट <b>Add to Home screen</b> छान्नुहोस्। त्यसपछि यो एपजस्तै खुल्छ र इन्टरनेटबिना पनि चल्छ।</span></p>
          ${audioCount || ttsCount ? `<div class="row start"><button class="btn" data-action="audio-offline" ${dl.running ? 'disabled' : ''}>Download all ${audioCount + ttsCount} recordings for offline (about ${Math.round((audioCount + ttsCount) * 6.9 / 1000)} MB, use Wi-Fi)</button><span class="hint" id="audio-msg" role="status">${esc(dl.msg)}</span></div>` : ''}
          ${S.canSpeak ? '' : '<p class="hint">This browser has no text-to-speech, so Listen buttons are hidden.</p>'}
          <p class="hint">No Polish voice? Android: Settings → Text-to-speech → install Polish. iPhone: Settings → Accessibility → Spoken Content → Voices → Polish.</p>
        </fieldset>

        <fieldset class="setting">
          <legend>Cache & Updates <span lang="ne">क्यास र अपडेट</span></legend>
          <p class="hint">Ensure you have the latest design and lesson content. Clears browser offline caches and reloads immediately. · क्यास हटाएर नयाँ संस्करण लोड गर्नुहोस्।</p>
          <div class="row start"><button class="btn" data-action="clear-cache">Refresh app & clear cache · क्यास खाली गर्नुहोस्</button></div>
        </fieldset>

        <fieldset class="setting">
          <legend>Progress <span lang="ne">प्रगति</span></legend>
          <p class="hint">Clearing your progress cannot be undone. Copy your backup code first.</p>
          <button class="btn again" data-action="reset">Clear all progress</button>
        </fieldset>
        <fieldset class="setting">
          <legend>Native speakers <span lang="ne">मातृभाषी</span></legend>
          <p class="hint">Do you speak Polish or Nepali as your first language? Help check this course. · यो कोर्स जाँच्न सहयोग गर्नुहोस्।</p>
          <button class="btn" data-action="go" data-to="check">Open review mode</button>
        </fieldset>
        <p class="hint">How pronunciation is written: words are split into syllable blocks and the <b>stressed syllable is coloured</b>, in English letters and in Devanagari: ${S.pronHTML({ pron: 'jeny DOB-ri', proNe: 'जेन्य् ˈदोब्-रि' })}. In Polish the stress is almost always on the second-to-last syllable. Both spellings are approximations: always listen too.</p>
      </div>`;
  }

  // ---------- saving all recordings for offline ----------
  // The service worker keeps each recording it serves, so fetching them all fills its cache.
  // The state lives here, so redrawing Settings neither hides the progress nor starts a second run.
  const dl = { running: false, msg: '' };
  const showDl = (text) => { dl.msg = text; const m = $('#audio-msg'); if (m) m.textContent = text; };
  async function startAudioDownload() {
    if (dl.running) return;
    const files = [...new Set([...Object.values(S.AUDIO), ...Object.values(S.TTS)])];
    try {
      const est = navigator.storage && navigator.storage.estimate ? await navigator.storage.estimate() : null;
      if (est && est.quota && est.quota - est.usage < files.length * 7000 * 1.2) {
        showDl('Not enough free storage on this device for all recordings. Free some space and try again. · यो उपकरणमा ठाउँ पुगेन।');
        return;
      }
    } catch (e) { /* estimate unavailable */ }
    dl.running = true;
    const btn = $('[data-action="audio-offline"]');
    if (btn) btn.disabled = true;
    const total = files.length;
    const cache = 'caches' in window ? await caches.open('slowka-audio-v1').catch(() => null) : null;
    let done = 0;
    let failed = 0;
    let failsInRow = 0;
    let stopped = '';
    const next = async () => {
      while (files.length && !stopped) {
        const f = files.shift();
        try {
          if (cache && (await cache.match(new URL(f, location.href).href))) { done++; continue; } // already saved
          const r = await fetch(f);
          if (r.ok) failsInRow = 0; else { failed++; failsInRow++; }
        } catch (e) { failed++; failsInRow++; }
        done++;
        if (!navigator.onLine) stopped = 'offline';
        else if (failsInRow >= 20) stopped = 'failing';
        if (done % 25 === 0 || !files.length) showDl(`${done} / ${total}`);
      }
    };
    await Promise.all(Array.from({ length: 8 }, next));
    dl.running = false;
    const b2 = $('[data-action="audio-offline"]');
    if (b2) b2.disabled = false;
    showDl(stopped === 'offline' ? `Stopped: no internet. ${done} / ${total} done; tap again later to continue. · इन्टरनेट छैन।`
      : stopped === 'failing' ? `Stopped: downloads keep failing (no internet or storage full). ${done} / ${total} done; try again later.`
      : failed ? `Done, ${failed} could not be downloaded (no internet or storage full). Tap again to retry. · फेरि प्रयास गर्नुहोस्।`
      : 'All recordings saved for offline ✓ · सबै रेकर्डिङ अफलाइनका लागि सुरक्षित ✓');
  }

  // ---------- events ----------

  // After an answer re-draws the page, keep keyboard and screen-reader focus where the learner was:
  // on the same button, or on the next question's first option if that one is now answered.
  function keepFocus(el) {
    if (!view.contains(el) || el.dataset.action === 'go') return;
    const sel = [...el.attributes].filter((x) => x.name.startsWith('data-') && x.name !== 'data-autofocus')
      .map((x) => `[${x.name}="${CSS.escape(x.value)}"]`).join('');
    const hash = location.hash;
    queueMicrotask(() => {
      // Only when the page was re-drawn and the tapped button is gone.
      if (el.isConnected || location.hash !== hash) return;
      const active = document.activeElement;
      if (active && active !== document.body && document.contains(active)) return;
      const same = view.querySelector(sel);
      if (!same) return;
      let target = same.disabled ? null : same;
      if (!target) {
        const all = [...view.querySelectorAll('button:not([disabled]), input:not([disabled]), [data-autofocus]')];
        target = all.find((x) => same.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING) || null;
      }
      if (target) target.focus({ preventScroll: true });
    });
  }

  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-action]');
    if (!el) return;
    ev.stopPropagation();
    const a = el.dataset.action;
    if (el.tagName !== 'INPUT') ev.preventDefault();
    keepFocus(el);
    if (S.Practice.action(a, el)) return;
    if (S.Guided.action(a, el, view)) return;
    if (S.Assess.action(a, el, view)) return;
    if (S.Numbers.action(a, el, view)) return;
    if (S.SOS && S.SOS.action && S.SOS.action(a, el, view)) return;
    if (S.Match && S.Match.action && S.Match.action(a, el, view)) return;
    if (S.Simulator && S.Simulator.action && S.Simulator.action(a, el, view)) return;
    if (S.Commute && S.Commute.action && S.Commute.action(a, el, view)) return;
    if (S.Search && S.Search.action && S.Search.action(a, el, view)) return;
    if (S.Recorder && S.Recorder.action && S.Recorder.action(a, el, view)) return;
    if (S.MyWords.action(a, el, view)) return;
    if (S.Speaking.action(a, el, view)) return;
    if (S.Listening.action(a, el, view)) return;
    if (S.Extras.action(a, el, view)) return;
    if (S.Trainers.action(a, el, view)) return;
    switch (a) {
      case 'set-lang': {
        const lang = el.dataset.lang || 'both';
        S.settings.explain = lang;
        S.settings.pron = lang;
        S.saveSettings();
        updateLangUI();
        S.render();
        break;
      }
      case 'toggle-lang': {
        const cur = S.settings.explain || 'both';
        const next = cur === 'both' ? 'en' : cur === 'en' ? 'ne' : 'both';
        S.settings.explain = next;
        S.settings.pron = next;
        S.saveSettings();
        updateLangUI();
        S.render();
        break;
      }
      case 'set-theme': {
        const theme = el.dataset.theme || 'auto';
        applyTheme(theme);
        renderNav();
        break;
      }
      case 'habit-modal': {
        if (S.Habit && S.Habit.showModal) S.Habit.showModal();
        break;
      }
      case 'auth-modal': {
        if (S.Auth && S.Auth.showModal) S.Auth.showModal();
        break;
      }
      case 'toggle-theme': {
        const current = localStorage.getItem('slowka-theme') || 'auto';
        const next = current === 'dark' ? 'light' : current === 'light' ? 'auto' : 'dark';
        applyTheme(next);
        renderNav();
        break;
      }
      case 'clear-cache': {
        el.disabled = true;
        el.textContent = 'Clearing…';
        if ('caches' in window) {
          caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name)))).catch(() => {});
        }
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((r) => r.unregister());
          }).catch(() => {});
        }
        setTimeout(() => {
          window.location.replace(window.location.pathname + '?refresh=' + Date.now());
        }, 300);
        break;
      }
      case 'celebrate-badge': {
        const id = el.dataset.badgeId;
        const list = S.Listening ? S.Listening.badges() : [];
        const b = list.find((item) => item.id === id) || { icon: '⭐', en: 'Achievement', ne: 'उपलब्धि', how: 'Badge unlocked' };
        S.Celebration.fire('badge', {
          icon: b.icon,
          title: b.en,
          titleNe: b.ne,
          desc: b.how,
          date: b.date
        });
        break;
      }
      case 'celebrate-level': {
        const curLevel = S.getProficiencyLevel ? S.getProficiencyLevel() : S.LEVELS[0];
        S.Celebration.fire('level', {
          icon: '🏆',
          title: curLevel.name,
          titleNe: curLevel.ne,
          desc: curLevel.blurb,
          levelId: curLevel.id
        });
        break;
      }
      case 'close-celebration': {
        S.Celebration.close();
        break;
      }
      case 'go': {
        if (el.dataset.to === 'sos' || el.dataset.to.startsWith('sos.')) {
          if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {}
        }
        S.go(el.dataset.to, { q: el.dataset.q });
        break;
      }
      case 'tab':
        S.stopSpeaking();
        S.route.tab = el.dataset.tab;
        S.Practice.reset();
        renderUnit();
        $('.tabs').scrollIntoView({ block: 'nearest' });
        break;
      case 'say': {
        if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
        S.speak(el.dataset.text, el.dataset.slow === '1');
        break;
      }
      case 'abc-play': {
        // Each letter: its name, then the example word.
        const lines = [];
        S.ALPHABET.forEach((x) => {
          if (x.say) lines.push({ text: x.say, pitch: 1, letter: x.letter });
          lines.push({ text: x.example, pitch: 1, letter: x.letter });
        });
        document.querySelectorAll('.letter.speaking-letter').forEach((c) => c.classList.remove('speaking-letter'));
        S.speakLines(lines, S.settings.slow, (item) => {
          document.querySelectorAll('.letter.speaking-letter').forEach((c) => c.classList.remove('speaking-letter'));
          if (item && item.letter) {
            const card = document.querySelector(`.letter[data-letter-glyph="${item.letter}"]`);
            if (card) {
              card.classList.add('speaking-letter');
              card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        });
        break;
      }
      case 'abc-stop': {
        S.stopSpeaking();
        document.querySelectorAll('.letter.speaking-letter').forEach((c) => c.classList.remove('speaking-letter'));
        break;
      }
      case 'app-reload': location.reload(); break;
      case 'key': S.insertKey(el.dataset.key, el); break;
      case 'unmask-meaning': {
        const cover = el.querySelector('.masked-cover');
        const cont = el.querySelector('.masked-content');
        if (cover && cont) {
          cover.style.display = 'none';
          cont.style.display = 'inline';
        }
        break;
      }
      case 'set': {
        const v = el.dataset.value;
        S.settings[el.dataset.key] = v === 'true' ? true : v === 'false' ? false : /^\d+$/.test(v) ? Number(v) : v;
        S.saveSettings();
        renderSettings();
        break;
      }
      case 'audio-offline': startAudioDownload(); break;
      case 'install-pwa': {
        if (window.deferredPrompt) {
          window.deferredPrompt.prompt();
          window.deferredPrompt.userChoice.then(() => { window.deferredPrompt = null; });
        } else {
          let modal = document.getElementById('install-modal-overlay');
          if (!modal) {
            modal = document.createElement('div');
            modal.id = 'install-modal-overlay';
            modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(4px);';
            modal.innerHTML = `
              <div class="card" style="max-width:440px; width:100%; text-align:left; padding:24px; background:var(--surface); border:2px solid var(--accent); box-shadow:0 12px 40px rgba(0,0,0,0.4);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <h3 style="margin:0; font-size:1.25rem;">📲 Install Słówka App</h3>
                  <button type="button" class="btn compact" data-action="close-install-modal" style="font-size:1.1rem; padding:4px 10px;">✕</button>
                </div>
                <p style="margin:0 0 14px; font-size:0.92rem; color:var(--muted);" lang="ne">फोनको होम स्क्रिनमा एप जस्तै राख्नुहोस्:</p>
                <div style="display:flex; flex-direction:column; gap:12px; font-size:0.95rem; line-height:1.4;">
                  <div style="background:var(--sunk); padding:12px 14px; border-radius:12px;">
                    <b>🍏 iPhone (Safari):</b><br>
                    1. तलको <b>Share (शेयर ⬆)</b> आइकन थिच्नुहोस्।<br>
                    2. थोरै तल सारेर <b>"Add to Home Screen"</b> छान्नुहोस्।
                  </div>
                  <div style="background:var(--sunk); padding:12px 14px; border-radius:12px;">
                    <b>🤖 Android (Chrome):</b><br>
                    1. माथिको <b>३-डट (⋮)</b> मेनु थिच्नुहोस्।<br>
                    2. <b>"Install app"</b> वा <b>"Add to Home screen"</b> छान्नुहोस्।
                  </div>
                </div>
                <button type="button" class="btn primary wide" data-action="close-install-modal" style="margin-top:16px; width:100%; justify-content:center;">
                  बुझें · Got it! ✓
                </button>
              </div>
            `;
            document.body.appendChild(modal);
          }
        }
        break;
      }
      case 'close-install-modal': {
        const m = document.getElementById('install-modal-overlay');
        if (m) m.remove();
        break;
      }
      case 'star-card': {
        const pl = el.dataset.pl;
        const entry = S.LEXICON.get(pl) || { pl };
        const nowStarred = S.toggleStar(entry);
        el.classList.toggle('active', nowStarred);
        if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {}
        return true;
      }
      case 'dict-clear': {
        const inp = $('#dict-q');
        if (inp) {
          inp.value = '';
          updateDictionary();
          inp.focus();
        }
        return true;
      }
      case 'share-app': {
        const streakDays = (S.progress && S.progress.streak) ? S.progress.streak : 0;
        const totalItems = Object.keys((S.progress && S.progress.items) || {}).length;
        const streakMention = streakDays > 0 ? ` (मेरो दैनिक स्ट्रिक: ${streakDays} दिन, अभ्यास: ${totalItems} शब्द)` : '';
        const text = `नमस्ते साथीहरू! पोल्याण्डमा काम गर्न र बस्न चाहिने निःशुल्क पोलिश भाषा एप${streakMention} (नेपाली अर्थ र उच्चारण सहित): https://arbin848.github.io/polish/`;
        if (navigator.share) {
          navigator.share({ title: 'Słówka - Learn Polish in Nepali', text, url: 'https://arbin848.github.io/polish/' }).catch(() => {});
        } else {
          window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(text), '_blank');
        }
        return true;
      }
      case 'fb-github-issue': {
        const cat = document.querySelector('input[name="fb_cat"]:checked')?.value || 'general';
        const loc = document.querySelector('#fb-location')?.value || '';
        const details = document.querySelector('#fb-details')?.value || '';
        const title = `Feedback [${cat}]: ${loc || 'General app report'}`;
        const body = `### Problem / Feedback Report\n- **Category:** ${cat}\n- **Location in App:** ${loc || 'Not specified'}\n- **Details:**\n${details || 'No details provided'}\n\n*Submitted via Słówka in-app feedback mega section*`;
        const url = `https://github.com/${S.REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
        window.open(url, '_blank', 'noopener');
        return true;
      }
      case 'backup-copy': {
        const out = $('#backup-out');
        const fallback = () => { out.focus(); out.select(); el.textContent = 'Selected: copy it now'; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(out.value).then(() => { el.textContent = 'Copied ✓'; }, fallback);
        else fallback();
        break;
      }
      case 'backup-restore': {
        // Restoring replaces everything on this device, so it takes a second tap.
        const code = $('#backup-in').value;
        try { S.readBackup(code); } catch (e) {
          $('#backup-msg').textContent = 'That code did not work. Copy the whole code and try again.';
          el.dataset.armed = 'false';
          el.textContent = 'Restore from code';
          break;
        }
        if (el.dataset.armed !== 'true' || el.dataset.code !== code) {
          el.dataset.armed = 'true';
          el.dataset.code = code;
          el.textContent = 'Tap again to replace my progress';
          $('#backup-msg').textContent = 'This replaces the progress saved on this device. · यसले यो उपकरणको प्रगति बदल्छ।';
          break;
        }
        S.restoreBackup(code);
        // Forget words and open exercises from before the restore.
        for (const [k, e] of S.LEXICON) if (e.mine) S.LEXICON.delete(k);
        S.MyWords.register();
        S.Practice.reset();
        S.Trainers.resetSessions();
        renderStats();
        renderSettings();
        $('#backup-msg').textContent = 'Progress restored ✓';
        break;
      }
      case 'reset':
        if (el.dataset.armed === 'true') {
          S.progress = S.freshProgress();
          S.saveProgress();
          // Start fresh everywhere (open exercises, my words, sessions).
          location.reload();
        } else {
          el.dataset.armed = 'true';
          el.textContent = 'Tap again to clear everything';
        }
        break;
      default: break;
    }
  });

  document.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (S.Practice.submit(ev.target)) return;
    if (S.Assess.submit(ev.target, view)) return;
    if (S.Numbers.submit(ev.target, view)) return;
    if (S.MyWords.submit(ev.target, view)) return;
    if (S.Trainers.submit(ev.target, view)) return;
    S.Extras.submit(ev.target);
  });
  document.addEventListener('input', (ev) => { if (S.SOS && S.SOS.input && S.SOS.input(ev.target)) return; if (!S.MyWords.input(ev.target) && !S.Trainers.input(ev.target) && !S.Assess.input(ev.target)) S.Extras.input(ev.target); });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && document.getElementById('celebration-overlay')) {
      S.Celebration.close();
      return;
    }
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    // Tappable Polish words in explanations work from the keyboard too.
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches && ev.target.matches('span[role="button"][data-action]')) { ev.preventDefault(); ev.target.click(); return; }
    if (/^(INPUT|TEXTAREA)$/.test(ev.target.tagName) && !ev.target.readOnly) return;
    if (ev.key === ' ' && ev.target.tagName !== 'BUTTON') {
      const playBtn = view.querySelector('.stage .listen, .card .listen, .today .listen, [data-action="say"]');
      if (playBtn) { ev.preventDefault(); playBtn.click(); return; }
    }
    if (S.Practice.key(ev)) return;
    if (S.Trainers.key(ev)) return;
    if (S.Guided.key(ev)) return;
    if (S.Assess.key(ev)) return;
    if (S.Numbers.key(ev)) return;
    if (S.Speaking.key(ev)) return;
    S.Extras.key(ev);
  });

  // ---------- offline support ----------

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    try {
      navigator.serviceWorker.register('sw.js').then((reg) => {
        // An app left open for days still finds new versions: check when it comes back to the front.
        document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
      }).catch(() => {});
    } catch (e) { /* not available here */ }
    // A new version has taken over: offer a reload so the learner is not left on old files.
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || document.getElementById('update-bar')) return;
      document.body.insertAdjacentHTML('beforeend', `<div class="update-bar" id="update-bar" role="status">A new version of the app is ready · नयाँ संस्करण तयार छ <button type="button" class="btn primary" data-action="app-reload">Reload</button></div>`);
    });
  }
  // Ask the browser to keep saved progress (Safari may otherwise delete it after some weeks unused).
  if (navigator.storage && navigator.storage.persist) {
    try { navigator.storage.persist().catch(() => {}); } catch (e) { /* not available */ }
  }

  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    const banner = document.getElementById('install-banner');
    if (banner) banner.style.display = 'flex';
  });

// ---------- start ----------

  // Back/forward buttons and links to #pages.
  const fromHistory = () => {
    const hash = location.hash || '';
    if (hash === currentHash) return;
    S.go(hash.slice(1) || 'home', { fromHistory: true });
  };
  window.addEventListener('popstate', fromHistory);
  window.addEventListener('hashchange', fromHistory);
  
  // Theme initialization
  applyTheme(localStorage.getItem('slowka-theme') || 'auto');
  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => updateThemeUI());
    } catch (e) {}
  }

  const initial = (location.hash || '').slice(1);
  if (initial) S.go(initial);
  else S.render();
})();
