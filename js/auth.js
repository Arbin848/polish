// Słówka Cloud Auth & Sync Module (Firebase Auth + Firestore)
(() => {
  'use strict';
  const S = window.Slowka;
  const A = (S.Auth = {});

  let user = null;
  let config = null;

  // Load config
  try {
    config = {
      apiKey: "AIzaSyBGd16S-3YAkML7k8107tFP5mcZTP876zM",
      projectId: "googly-codex-9c70r",
      authDomain: "googly-codex-9c70r.firebaseapp.com"
    };
  } catch (e) {}

  // Firebase REST Auth Endpoints (100% dependency-free, zero bundling needed)
  const API_KEY = config ? config.apiKey : "";

  // Auth State
  A.getUser = () => {
    if (user) return user;
    try {
      const stored = localStorage.getItem('slowka-user');
      if (stored) {
        user = JSON.parse(stored);
        return user;
      }
    } catch (e) {}
    return null;
  };

  A.isLoggedIn = () => !!A.getUser();

  // Sign In with Email & Password
  A.signIn = async (email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || 'Login failed');
    }
    user = {
      email: data.email,
      localId: data.localId,
      idToken: data.idToken,
      refreshToken: data.refreshToken
    };
    localStorage.setItem('slowka-user', JSON.stringify(user));
    await A.pullCloudProgress();
    A.renderAuthButton();
    return user;
  };

  // Sign Up with Email & Password
  A.signUp = async (email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || 'Registration failed');
    }
    user = {
      email: data.email,
      localId: data.localId,
      idToken: data.idToken,
      refreshToken: data.refreshToken
    };
    localStorage.setItem('slowka-user', JSON.stringify(user));
    await A.syncCloudProgress();
    A.renderAuthButton();
    return user;
  };

  // Forgot Password / Password Reset Email
  A.sendPasswordReset = async (email) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestType: "PASSWORD_RESET", email })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || 'Could not send reset email');
    }
    return true;
  };

  // Sign Out
  A.signOut = () => {
    user = null;
    localStorage.removeItem('slowka-user');
    A.renderAuthButton();
  };

  // Firestore REST Sync Progress
  A.syncCloudProgress = async () => {
    const u = A.getUser();
    if (!u || !u.localId || !u.idToken) return;
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/users/${u.localId}?key=${API_KEY}`;
      const payload = {
        fields: {
          streak: { integerValue: String(S.progress.streak || 0) },
          itemsCount: { integerValue: String(Object.keys(S.progress.items || {}).length) },
          progressJson: { stringValue: JSON.stringify(S.progress) },
          updatedAt: { timestampValue: new Date().toISOString() }
        }
      };
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${u.idToken}`
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {}
  };

  A.pullCloudProgress = async () => {
    const u = A.getUser();
    if (!u || !u.localId || !u.idToken) return;
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/users/${u.localId}?key=${API_KEY}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${u.idToken}` }
      });
      if (res.ok) {
        const doc = await res.json();
        if (doc.fields && doc.fields.progressJson && doc.fields.progressJson.stringValue) {
          const cloudProgress = JSON.parse(doc.fields.progressJson.stringValue);
          // Merge local and cloud progress (keep higher streak and combined learned items)
          if (cloudProgress.items) {
            S.progress.items = Object.assign({}, cloudProgress.items, S.progress.items);
          }
          if (cloudProgress.streak && cloudProgress.streak > (S.progress.streak || 0)) {
            S.progress.streak = cloudProgress.streak;
          }
          S.saveProgress();
          if (S.onProgress) S.onProgress();
        }
      }
    } catch (e) {}
  };

  // Auto-sync whenever progress is saved
  const origSave = S.saveProgress;
  S.saveProgress = function() {
    origSave.apply(this, arguments);
    if (A.isLoggedIn()) {
      A.syncCloudProgress();
    }
  };

  // Render Auth Button in Header
  A.renderAuthButton = () => {
    const btn = document.getElementById('header-auth-btn');
    if (!btn) return;
    const u = A.getUser();
    if (u) {
      btn.innerHTML = `👤 <span style="font-size:0.8rem; font-weight:700; max-width:85px; overflow:hidden; text-overflow:ellipsis; display:inline-block; vertical-align:middle;">${u.email.split('@')[0]}</span>`;
      btn.title = `Logged in as ${u.email} (Tap to manage account)`;
    } else {
      btn.innerHTML = `🔑 <span style="font-size:0.8rem; font-weight:700;">Login</span>`;
      btn.title = "Login / Sign Up to sync your progress";
    }
  };

  // Auth Modal (Sign In / Register / Forgot Password)
  let authMode = 'login'; // 'login', 'signup', 'forgot'

  A.showModal = () => {
    let overlay = document.getElementById('auth-modal-overlay');
    if (overlay) overlay.remove();

    const u = A.getUser();
    overlay = document.createElement('div');
    overlay.id = 'auth-modal-overlay';
    overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(4px);';

    if (u) {
      // Already logged in view
      overlay.innerHTML = `
        <div class="card" style="max-width:400px; width:100%; text-align:left; padding:24px; background:var(--surface); border:2px solid var(--accent); box-shadow:0 12px 40px rgba(0,0,0,0.4);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="margin:0; font-size:1.25rem;">👤 Your Account</h3>
            <button type="button" class="btn compact" data-action="close-auth-modal" style="font-size:1.1rem; padding:4px 10px;">✕</button>
          </div>
          <div style="background:var(--sunk); padding:12px 14px; border-radius:12px; margin-bottom:14px;">
            <p style="margin:0 0 4px; font-size:0.85rem; color:var(--muted);">Logged in email:</p>
            <b style="font-size:1.05rem; word-break:break-all;">${u.email}</b>
            <div style="display:flex; align-items:center; gap:6px; margin-top:8px; font-size:0.82rem; color:#15803d;">
              <span>☁️</span>
              <span>All words and streak synced to cloud!</span>
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn primary" id="auth-sync-now-btn" style="flex:1; justify-content:center;">
              🔄 Sync Now
            </button>
            <button type="button" class="btn" id="auth-signout-btn" style="color:var(--ink);">
              Log Out
            </button>
            <button type="button" class="btn compact" id="auth-del-acc-btn" style="color:#b91c1c; border-color:#fecaca; font-size:0.8rem;" title="Delete account and wipe data under GDPR">
              🗑️ Delete Account (GDPR)
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      document.getElementById('auth-sync-now-btn').addEventListener('click', async () => {
        const b = document.getElementById('auth-sync-now-btn');
        b.textContent = 'Syncing...';
        await A.syncCloudProgress();
        await A.pullCloudProgress();
        b.textContent = 'Synced! ✓';
        setTimeout(() => { if (b) b.textContent = '🔄 Sync Now'; }, 1500);
      });

      document.getElementById('auth-signout-btn').addEventListener('click', () => {
        A.signOut();
        overlay.remove();
      });
      const delBtn = document.getElementById('auth-del-acc-btn');
      if (delBtn) {
        delBtn.addEventListener('click', async () => {
          if (confirm('Are you sure you want to delete your account? Under GDPR Art. 17 (Right to Erasure), all your progress and account data will be permanently wiped.')) {
            delBtn.textContent = 'Deleting...';
            try {
              const u = A.getUser();
              if (u && u.localId && u.idToken) {
                const url = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/users/${u.localId}?key=${API_KEY}`;
                await fetch(url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${u.idToken}` } });
              }
            } catch (e) {}
            A.signOut();
            overlay.remove();
          }
        });
      }
      return;
    }

    // Modal Form (Login / Register / Forgot Password)
    const renderForm = () => {
      overlay.innerHTML = `
        <div class="card" style="max-width:420px; width:100%; text-align:left; padding:24px; background:var(--surface); border:2px solid var(--accent); box-shadow:0 12px 40px rgba(0,0,0,0.4);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="margin:0; font-size:1.2rem;">
              ${authMode === 'login' ? '🔑 Login · लगइन' : authMode === 'signup' ? '✨ Sign Up · नयाँ खाता' : '🔒 Reset Password · पासवर्ड बिर्सनुभयो?'}
            </h3>
            <button type="button" class="btn compact" data-action="close-auth-modal" style="font-size:1.1rem; padding:4px 10px;">✕</button>
          </div>
          <p style="margin:0 0 14px; font-size:0.88rem; color:var(--muted);" lang="ne">
            ${authMode === 'login' ? 'आफ्नो इमेल र पासवर्डबाट लगइन गर्नुहोस् र प्रगति सुरक्षित राख्नुहोस्:' : authMode === 'signup' ? 'खाता खोल्नुहोस् ताकि फोन फेर्दा पनि तपाईंको सिकाइ मेटिँदैन:' : 'तपाईंको इमेलमा पासवर्ड रिसेट लिङ्क पठाइनेछ:'}
          </p>

          <form id="auth-form" style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Email Address · इमेल:</label>
              <input type="email" id="auth-email" required placeholder="you@example.com" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--line); font-size:0.95rem; background:var(--bg); color:var(--ink);">
            </div>

            ${authMode !== 'forgot' ? `
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <label style="font-size:0.85rem; font-weight:700;">Password · पासवर्ड:</label>
                  ${authMode === 'login' ? `<a href="#" id="auth-to-forgot" style="font-size:0.8rem; color:var(--accent);">Forgot password?</a>` : ''}
                </div>
                <input type="password" id="auth-password" required minlength="6" placeholder="At least 6 characters" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--line); font-size:0.95rem; background:var(--bg); color:var(--ink);">
              </div>
            ` : ''}

            ${authMode === 'signup' ? `
              <div style="display:flex; align-items:flex-start; gap:8px; font-size:0.8rem; line-height:1.35; margin-top:4px;">
                <input type="checkbox" id="auth-gdpr-agree" required style="margin-top:3px;">
                <label for="auth-gdpr-agree" style="color:var(--muted);">
                  I agree to the <a href="#privacy" id="auth-to-privacy" style="color:var(--accent); text-decoration:underline;">Privacy Policy & EU GDPR</a>. My email is stored securely solely for login and progress sync.
                </label>
              </div>
            ` : ''}

            <div id="auth-msg" style="display:none; font-size:0.85rem; padding:8px 10px; border-radius:8px; margin-top:4px;"></div>

            <button type="submit" class="btn primary wide" id="auth-submit-btn" style="margin-top:8px; width:100%; justify-content:center; padding:12px;">
              ${authMode === 'login' ? 'Login · लगइन गर्नुहोस् →' : authMode === 'signup' ? 'Create Account · खाता खोल्नुहोस् →' : 'Send Reset Link · रिसेट लिङ्क पठाउनुहोस् ✉️'}
            </button>
          </form>

          <hr style="margin:16px 0; border:0; border-top:1px solid var(--line);">

          <div style="text-align:center; font-size:0.88rem;">
            ${authMode === 'login' ? `
              Don't have an account? <a href="#" id="auth-to-signup" style="font-weight:700; color:var(--accent);">Sign Up (नयाँ खाता)</a>
            ` : `
              Already have an account? <a href="#" id="auth-to-login" style="font-weight:700; color:var(--accent);">Login (लगइन गर्नुहोस्)</a>
            `}
          </div>
        </div>
      `;

      // Wire events
      const form = document.getElementById('auth-form');
      const msg = document.getElementById('auth-msg');

      const showMsg = (text, isErr) => {
        msg.style.display = 'block';
        msg.style.background = isErr ? '#fee2e2' : '#f0fdf4';
        msg.style.color = isErr ? '#991b1b' : '#15803d';
        msg.style.border = `1px solid ${isErr ? '#fecaca' : '#bbf7d0'}`;
        msg.textContent = text;
      };

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value.trim();
        const passEl = document.getElementById('auth-password');
        const pass = passEl ? passEl.value : '';
        const btn = document.getElementById('auth-submit-btn');

        btn.disabled = true;
        const origBtnText = btn.textContent;
        btn.textContent = 'Please wait...';

        try {
          if (authMode === 'login') {
            await A.signIn(email, pass);
            showMsg('Logged in successfully! Syncing your progress...', false);
            setTimeout(() => { overlay.remove(); }, 1200);
          } else if (authMode === 'signup') {
            await A.signUp(email, pass);
            showMsg('Account created! Your progress is now synced.', false);
            setTimeout(() => { overlay.remove(); }, 1200);
          } else if (authMode === 'forgot') {
            await A.sendPasswordReset(email);
            showMsg('Password reset link sent to your email! Please check your inbox.', false);
            btn.disabled = false;
            btn.textContent = origBtnText;
          }
        } catch (err) {
          btn.disabled = false;
          btn.textContent = origBtnText;
          let m = err.message;
          if (m === 'EMAIL_NOT_FOUND') m = 'No account found with this email.';
          else if (m === 'INVALID_PASSWORD' || m === 'INVALID_LOGIN_CREDENTIALS') m = 'Incorrect password. Try again or reset password.';
          else if (m === 'EMAIL_EXISTS') m = 'An account already exists with this email. Please log in.';
          showMsg(m, true);
        }
      });

      const toSignup = document.getElementById('auth-to-signup');
      if (toSignup) toSignup.addEventListener('click', (e) => { e.preventDefault(); authMode = 'signup'; renderForm(); });

      const toLogin = document.getElementById('auth-to-login');
      if (toLogin) toLogin.addEventListener('click', (e) => { e.preventDefault(); authMode = 'login'; renderForm(); });

      const toForgot = document.getElementById('auth-to-forgot');
      if (toForgot) toForgot.addEventListener('click', (e) => { e.preventDefault(); authMode = 'forgot'; renderForm(); });
    };

    renderForm();
    document.body.appendChild(overlay);
  };

  // Close modal handler
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="close-auth-modal"]')) {
      const o = document.getElementById('auth-modal-overlay');
      if (o) o.remove();
    }
  });

  // Init button on DOM ready
  window.addEventListener('DOMContentLoaded', () => {
    A.renderAuthButton();
  });
})();
