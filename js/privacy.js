// Słówka Privacy Policy & GDPR Compliance Page
(() => {
  'use strict';
  const S = window.Slowka;
  const P = (S.Privacy = {});

  P.render = (view) => {
    view.innerHTML = `
      ${S.backLink('settings', 'Settings · सेटिङ')}
      <article class="privacy-container" style="max-width: 760px; margin: 0 auto; padding: 12px 4px;">
        <header class="unit-head" style="margin-bottom: 24px;">
          <span class="eyebrow">Legal & Compliance · कानुनी जानकारी</span>
          <h2>Privacy Policy & GDPR Compliance</h2>
          <p class="unit-head-ne" lang="ne">गोपनीयता नीति र युरोपेली युनियन GDPR नियम</p>
          <p class="hint">In accordance with the EU General Data Protection Regulation (Regulation (EU) 2016/679 - GDPR) and Polish personal data protection laws (RODO).<br>
          <span lang="ne">तपाईंको व्यक्तिगत डाटा युरोपेली कानुन अनुसार सुरक्षित छ।</span></p>
        </header>

        <section class="card" style="margin-bottom: 16px; padding: 20px;">
          <h3 style="margin-top: 0;">1. Data Controller (डाटा नियन्त्रक)</h3>
          <p>The data controller responsible for the processing of your data within the <b>Słówka</b> language application is:</p>
          <p style="background: var(--sunk); padding: 12px 16px; border-radius: 10px; font-family: monospace; font-size: 0.9rem;">
            <b>Project:</b> Słówka Language Learning Platform<br>
            <b>Contact Email:</b> info.poljobhub@gmail.com<br>
            <b>Jurisdiction:</b> Poland & European Union (EU)
          </p>
        </section>

        <section class="card" style="margin-bottom: 16px; padding: 20px;">
          <h3 style="margin-top: 0;">2. What Data We Collect & Why (हामी कुन डाटा लिन्छौं?)</h3>
          <p>We practice strict <b>Data Minimization</b> (Article 5(1)(c) GDPR). We do not collect your passport, national ID (PESEL), phone number, address, or location.</p>
          <ul style="line-height: 1.6; margin-left: 20px;">
            <li><b>Email Address:</b> Used exclusively as your login identifier and for password recovery (Art. 6(1)(b) GDPR - contract performance).</li>
            <li><b>Study Progress & Statistics:</b> Study streak count, learned vocabulary boxes, quiz scores, and bookmarked words. This data is synced so you do not lose your learning progress when changing devices.</li>
            <li><b>Local Storage & Audio Cache:</b> Cached audio files and app settings stored locally on your device for offline study (no tracking cookies).</li>
          </ul>
        </section>

        <section class="card" style="margin-bottom: 16px; padding: 20px;">
          <h3 style="margin-top: 0;">3. Your GDPR Rights (तपाईंका कानुनी अधिकारहरू)</h3>
          <p>Under GDPR and Polish RODO laws, you have full ownership of your data:</p>
          <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 12px;">
            <div style="background: var(--sunk); padding: 10px 14px; border-radius: 8px;">
              <b>• Right to Access (Art. 15):</b> You can view your stored progress anytime in your account profile.
            </div>
            <div style="background: var(--sunk); padding: 10px 14px; border-radius: 8px;">
              <b>• Right to Erasure / "Be Forgotten" (Art. 17):</b> You have the absolute right to delete your account and wipe all stored progress at any time with one click.
            </div>
            <div style="background: var(--sunk); padding: 10px 14px; border-radius: 8px;">
              <b>• Right to Data Portability (Art. 20):</b> You can export your progress and personal dictionary anytime.
            </div>
            <div style="background: var(--sunk); padding: 10px 14px; border-radius: 8px;">
              <b>• Right to Lodge a Complaint:</b> You have the right to contact the Polish supervisory authority (Urzędu Ochrony Danych Osobowych - UODO).
            </div>
          </div>
        </section>

        <section class="card" style="margin-bottom: 16px; padding: 20px; border-left: 4px solid var(--accent);">
          <h3 style="margin-top: 0;">4. Instant Data Deletion & Export (डाटा मेटाउने वा निकाल्ने)</h3>
          <p>You can manage or permanently delete your account data directly:</p>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px;">
            <button type="button" class="btn" data-action="export-progress">
              📥 Export My Data (JSON)
            </button>
            <button type="button" class="btn" data-action="delete-account-gdpr" style="color: #b91c1c; border-color: #fecaca;">
              🗑️ Delete My Account & Wipe Data
            </button>
          </div>
        </section>

        <section class="card" style="margin-bottom: 16px; padding: 20px;">
          <h3 style="margin-top: 0;">5. Cookies & Tracking</h3>
          <p><b>Słówka does not use third-party advertising cookies, analytics trackers, or social tracking pixels.</b> We do not sell, rent, or trade user data to advertisers or employers.</p>
        </section>
      </article>
    `;
  };
})();
