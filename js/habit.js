// Słówka Daily Study Habit & Notification Service
(() => {
  'use strict';
  const S = window.Slowka;
  const H = (S.Habit = {});

  const DAILY_MOTIVATIONS = [
    { pl: 'Mogę prosić o pomoc?', en: 'Can I ask for help?', ne: 'म मद्दत माग्न सक्छु?' },
    { pl: 'Gdzie to odłożyć?', en: 'Where should I put this?', ne: 'यो कहाँ राख्ने?' },
    { pl: 'Miłego dnia!', en: 'Have a nice day!', ne: 'तपाईंको दिन शुभ रहोस्!' },
    { pl: 'Dziękuję bardzo!', en: 'Thank you very much!', ne: 'धेरै धेरै धन्यवाद!' },
    { pl: 'Ile to kosztuje?', en: 'How much does it cost?', ne: 'यसको कति पर्छ?' },
    { pl: 'Zaraz wracam.', en: 'I will be right back.', ne: 'म तुरुन्तै फर्कन्छु।' }
  ];

  // Request browser notification permission
  H.requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Your browser does not support notifications. Add Słówka to Home Screen to get daily reminders.');
      return false;
    }
    const perm = await new Promise((resolve) => {
      try {
        const p = Notification.requestPermission(resolve);
        if (p && p.then) p.then(resolve);
      } catch (e) {
        resolve('denied');
      }
    });
    if (perm === 'granted') {
      localStorage.setItem('slowka-reminder-enabled', 'true');
      H.scheduleNext();
      return true;
    }
    return false;
  };

  H.isEnabled = () => localStorage.getItem('slowka-reminder-enabled') === 'true';

  // Send or schedule daily habit notification
  H.scheduleNext = () => {
    if (!H.isEnabled()) return;
    if (Notification.permission !== 'granted') return;

    // Pick today's phrase
    const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const phrase = DAILY_MOTIVATIONS[day % DAILY_MOTIVATIONS.length];

    // Show a sample habit notification
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(`🇵🇱 Daily Polish Word · आजको शब्द: ${phrase.pl}`, {
            body: `${phrase.en} · ${phrase.ne}\n3 minutes of practice keeps your streak alive! 🔥`,
            icon: 'icon-192.png',
            badge: 'icon-192.png',
            tag: 'slowka-daily-habit'
          });
        });
      } else {
        new Notification(`🇵🇱 Daily Polish: ${phrase.pl}`, {
          body: `${phrase.en} · ${phrase.ne}\nKeep your streak alive! 🔥`,
          icon: 'icon-192.png'
        });
      }
    } catch (e) {}
  };

  // Habit Reminder Modal
  H.showModal = () => {
    let overlay = document.getElementById('habit-modal-overlay');
    if (overlay) overlay.remove();

    const u = S.Auth && S.Auth.getUser ? S.Auth.getUser() : null;
    const isNotify = H.isEnabled();

    overlay = document.createElement('div');
    overlay.id = 'habit-modal-overlay';
    overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(4px);';

    overlay.innerHTML = `
      <div class="habit-modal-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3 style="margin:0; font-size:1.25rem;">⏰ Daily Habit & Reminders</h3>
          <button type="button" class="btn compact" data-action="close-habit-modal" style="font-size:1.1rem; padding:4px 10px;">✕</button>
        </div>

        <p style="margin:0 0 14px; font-size:0.9rem; color:var(--muted);" lang="ne">
          हरेक दिन ३ मिनेट सिक्दा तपाईंको पोलिश भाषा चाँडै सुधारिन्छ। दैनिक सम्झना चालू गर्नुहोस्:
        </p>

        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
          <!-- Notification Option -->
          <div style="background:var(--sunk); border:1px solid var(--line); border-radius:12px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <b>🔔 Phone Daily Reminder</b><br>
                <small style="color:var(--muted);">Get 1 practical Polish phrase every day</small>
              </div>
              <button type="button" class="btn compact ${isNotify ? 'primary' : ''}" id="habit-notify-toggle">
                ${isNotify ? 'Active ✓' : 'Enable'}
              </button>
            </div>
          </div>

          <!-- Email Habit Option -->
          <div style="background:var(--sunk); border:1px solid var(--line); border-radius:12px; padding:14px;">
            <b>✉️ Word of the Day via Email</b><br>
            <small style="color:var(--muted);">
              ${u ? `Registered to send to: <b>${u.email}</b>` : 'Log in to link your email for weekly study summaries.'}
            </small>
            <div style="margin-top:8px;">
              ${u ? `
                <span style="font-size:0.85rem; color:#15803d; font-weight:700;">✓ Synced with your cloud account</span>
              ` : `
                <button type="button" class="btn compact" data-action="auth-modal" style="font-size:0.85rem;">
                  🔑 Login to link email
                </button>
              `}
            </div>
          </div>
        </div>

        <button type="button" class="btn primary wide" data-action="close-habit-modal" style="width:100%; justify-content:center;">
          Done · भयो ✓
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    const notifyBtn = document.getElementById('habit-notify-toggle');
    if (notifyBtn) {
      notifyBtn.addEventListener('click', async () => {
        const ok = await H.requestPermission();
        if (ok) {
          notifyBtn.textContent = 'Active ✓';
          notifyBtn.classList.add('primary');
        }
      });
    }
  };

  // Close habit modal
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="close-habit-modal"]')) {
      const m = document.getElementById('habit-modal-overlay');
      if (m) m.remove();
    }
  });
})();
