// Słówka Emergency Pocket Cards & Show-to-Local Screen
// Instant large-screen flashcards with loud one-tap speech, phonetics, and Devanagari.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const SOS = (S.SOS = {});

  let activeCategory = 'all';
  let activeCard = null; // when set, shows high-contrast fullscreen modal
  let filterQuery = '';

  SOS.render = (view, arg) => {
    const list = window.SLOWKA_SOS || [];
    if (arg && list.some((c) => c.id === arg)) {
      activeCategory = arg;
    }
    const categories = [{ id: 'all', category: 'All Emergency Cards', categoryNe: 'सबै आपतकालीन कार्ड', icon: '🚨' }, ...list];
    const activeCat = list.find((c) => c.id === activeCategory) || null;
    const displayCats = activeCat ? [activeCat] : list;
    const q = (filterQuery || '').trim().toLowerCase();

    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head sos-head">
        <span class="eyebrow sos-eyebrow">🚨 Quick Assistance · तत्काल मद्दत</span>
        <h2>"Show to Local" Emergency Cards</h2>
        <p class="unit-head-ne" lang="ne">स्थानीय मानिस वा कर्मचारीलाई फोनको स्क्रिन देखाउनुहोस्</p>
        <p class="hint">In urgent situations (ambulance, doctor, police, lost in town, factory emergency), tap any card to open a <b>giant high-contrast screen</b> you can simply turn and show to a Polish speaker, with instant loud audio.<br>
        <span lang="ne">अप्ठ्यारो परिस्थितिमा तुरुन्त यो स्क्रिन देखाउनुहोस्। ठूलो अक्षर र ठूलो आवाजमा पढ्ने बटन उपलब्ध छ।</span></p>
      </header>

      <div class="row start no-print" style="margin-bottom: 12px;">
        <button class="btn primary" data-action="print-sos" title="Print pocket cheat sheet or save as PDF">
          🖨️ Print / Save Pocket Cheat Sheet · प्रिन्ट वा PDF
        </button>
      </div>
      <div class="sos-phone-strip">
        <div class="sos-phone-badge">
          <span class="sos-badge-num">112</span>
          <span class="sos-badge-desc">Universal Emergency · आपतकाल (EU)</span>
        </div>
        <div class="sos-phone-badge">
          <span class="sos-badge-num">999</span>
          <span class="sos-badge-desc">Ambulance · एम्बुलेन्स (Pogotowie)</span>
        </div>
        <div class="sos-phone-badge">
          <span class="sos-badge-num">997</span>
          <span class="sos-badge-desc">Police · प्रहरी (Policja)</span>
        </div>
      </div>

      <div class="guide-controls">
        <div class="guide-tabs" role="tablist" aria-label="SOS Categories">
          ${categories.map((c) => `
            <button class="guide-tab ${activeCategory === c.id ? 'active' : ''}" data-action="sos-tab" data-cat="${c.id}">
              <span aria-hidden="true">${c.icon}</span>
              <span>${esc(c.category)}</span>
              <small lang="ne">${esc(c.categoryNe)}</small>
            </button>
          `).join('')}
        </div>
        <div class="guide-search-row">
          <input type="search" class="guide-search-input" id="sos-search-input" placeholder="Search emergency phrase (e.g. karetka, lekarz, bilet, policja)..." value="${esc(filterQuery)}">
        </div>
      </div>

      <div class="sos-cards-list">
        ${displayCats.map((cat) => {
          const items = cat.items.filter((item) => {
            if (!q) return true;
            return item.pl.toLowerCase().includes(q) ||
                   item.en.toLowerCase().includes(q) ||
                   item.ne.includes(q) ||
                   (item.tip && item.tip.toLowerCase().includes(q));
          });
          if (!items.length) return '';
          return `
            <section class="sos-section card">
              <header class="sos-section-head">
                <span class="sos-sec-icon" aria-hidden="true">${cat.icon}</span>
                <div>
                  <h3 class="sos-sec-title">${esc(cat.category)} <span class="sos-sec-ne" lang="ne">${esc(cat.categoryNe)}</span></h3>
                  ${cat.number ? `<span class="sos-sec-num">Direct Dial: <b>${esc(cat.number)}</b></span>` : ''}
                </div>
              </header>
              <div class="sos-grid">
                ${items.map((it) => `
                  <article class="sos-card ${it.urgency === 'critical' ? 'critical' : ''}">
                    <div class="sos-card-content" style="cursor:pointer;" data-action="sos-fullscreen" data-id="${esc(it.id)}" title="Tap anywhere to show large screen to local speaker">
                      <div class="sos-card-pl" lang="pl">${polish(it.pl)}</div>
                      <div class="sos-card-pron">
                        <span class="pron-latin">${esc(it.pron)}</span>
                        ${it.proNe ? `<span class="pron-ne" lang="ne">${esc(it.proNe)}</span>` : ''}
                      </div>
                      <div class="sos-card-trans">
                        <div class="sos-en"><b>EN:</b> ${esc(it.en)}</div>
                        <div class="sos-ne" lang="ne"><b>NE:</b> ${esc(it.ne)}</div>
                      </div>
                      ${it.tip ? `<p class="sos-tip">💡 ${esc(it.tip)}</p>` : ''}
                    </div>
                    <div class="sos-card-actions">
                      <button class="btn primary sos-fullscreen-btn" data-action="sos-fullscreen" data-id="${esc(it.id)}">
                        📱 Show to Local · ठूलो देखाउनुहोस्
                      </button>
                      <button class="btn listen" data-action="say" data-text="${esc(it.pl)}">
                        🔊 Loud Audio
                      </button>
                      <button class="btn sos-copy-btn" data-action="sos-copy" data-text="${esc(it.pl)}" title="Copy Polish text to clipboard for SMS or WhatsApp">
                        📋 Copy
                      </button>
                    </div>
                  </article>
                `).join('')}
              </div>
            </section>
          `;
        }).join('')}
      </div>

      ${activeCard ? SOS.modalHTML(activeCard) : ''}
    `;
  };

  SOS.modalHTML = (card) => `
    <div class="sos-modal-overlay" data-action="sos-close-modal" role="dialog" aria-modal="true" aria-label="Show to Polish speaker">
      <div class="sos-modal-box" onclick="event.stopPropagation()">
        <header class="sos-modal-head">
          <span class="sos-modal-tag">🇵🇱 POKAŻ OSOBIE MIEJSCOWEJ / SHOW TO LOCAL</span>
          <button class="sos-modal-close" data-action="sos-close-modal" aria-label="Close">✕</button>
        </header>
        <div class="sos-modal-body">
          <div class="sos-big-pl" lang="pl">${esc(card.pl)}</div>
          <div class="sos-big-actions">
            <button class="btn primary sos-big-say" data-action="say" data-text="${esc(card.pl)}">
              🔊 Odtwórz na głos / Play Loud Audio
            </button>
            <button class="btn listen slow" data-action="say" data-slow="1" data-text="${esc(card.pl)}">
              🐢 Powoli / Slower
            </button>
            <button class="btn sos-copy-btn" data-action="sos-copy" data-text="${esc(card.pl)}" title="Copy text">
              📋 Kopiuj / Copy
            </button>
          </div>
          <hr class="sos-divider">
          <div class="sos-modal-trans">
            <div class="sos-modal-en"><b>English:</b> ${esc(card.en)}</div>
            <div class="sos-modal-ne" lang="ne"><b>नेपाली:</b> ${esc(card.ne)}</div>
            <div class="sos-modal-pron"><b>Pronunciation:</b> ${esc(card.pron)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  SOS.action = (a, el, view) => {
    switch (a) {
      case 'print-sos': {
        window.print();
        return true;
      }
      case 'sos-tab': {
        activeCategory = el.dataset.cat || 'all';
        SOS.render(view, activeCategory);
        return true;
      }
      case 'sos-copy': {
        if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {}
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(el.dataset.text || '').then(() => {
            const original = el.textContent;
            el.textContent = '✓ Copied!';
            setTimeout(() => { el.textContent = original; }, 1500);
          }).catch(() => {});
        }
        return true;
      }
      case 'sos-fullscreen': {
        const id = el.dataset.id;
        const allItems = (window.SLOWKA_SOS || []).flatMap((c) => c.items);
        const match = allItems.find((x) => x.id === id);
        if (match && S.speak) S.speak(match.pl, false);
        let found = null;
        for (const cat of (window.SLOWKA_SOS || [])) {
          for (const item of cat.items) {
            if (item.id === id) { found = item; break; }
          }
          if (found) break;
        }
        if (found) {
          activeCard = found;
          if (S.speak) S.speak(found.pl);
          SOS.render(view, activeCategory);
        }
        return true;
      }
      case 'sos-close-modal': {
        activeCard = null;
        SOS.render(view, activeCategory);
        return true;
      }
      default: return false;
    }
  };

  SOS.input = (el) => {
    if (el.id === 'sos-search-input') {
      filterQuery = el.value;
      const v = document.getElementById('view');
      if (v) SOS.render(v, activeCategory);
      const inp = document.getElementById('sos-search-input');
      if (inp) { inp.focus(); inp.selectionStart = inp.selectionEnd = inp.value.length; }
      return true;
    }
    return false;
  };

  SOS.close = () => {
    activeCard = null;
  };
})();
