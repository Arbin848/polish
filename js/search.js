// Słówka Global Quick Search & Command Palette
// Searches words, phrases, grammar topics, and Poland legal guides in real-time.
// Accessible via Search button in header/sidebar, and hotkeys / or Ctrl+K / Cmd+K.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const Search = (S.Search = {});

  let query = '';
  let activeFilter = 'all'; // 'all' | 'vocab' | 'grammar' | 'guide' | 'sos' | 'sim'
  let results = [];
  let selectedIdx = 0;

  function highlightMatch(text, term) {
    if (!text || !term) return esc(text || '');
    const escaped = esc(text);
    const cleanTerm = esc(term).trim();
    if (!cleanTerm) return escaped;
    try {
      const re = new RegExp('(' + cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      return escaped.replace(re, '<mark class="search-match">$1</mark>');
    } catch (err) {
      return escaped;
    }
  }

  function doSearch(q) {
    query = (q || '').trim();
    if (!query) {
      // Show recent / trending starter suggestions
      results = getSuggestions();
      selectedIdx = 0;
      return;
    }
    const cleanQ = query.toLowerCase();
    const foldQ = S.fold ? S.fold(query) : cleanQ;
    const list = [];

    // Phonetic normalization for learners searching by approximate sound (e.g., sh -> sz, ch -> cz, w -> v, etc.)
    const phoneticNorm = (s) => (s || '')
      .toLowerCase()
      .replace(/rz|ż/g, 'z')
      .replace(/sz|ś/g, 's')
      .replace(/cz|ć/g, 'c')
      .replace(/dż|dź/g, 'dz')
      .replace(/ch/g, 'h')
      .replace(/ł/g, 'w')
      .replace(/ą/g, 'on')
      .replace(/ę/g, 'en');
    const normQ = phoneticNorm(cleanQ);

    // 1. Search vocabulary entries
    if (activeFilter === 'all' || activeFilter === 'vocab') {
      for (const e of S.ENTRIES) {
        if (!e || !e.pl) continue;
        const plLower = e.pl.toLowerCase();
        const plFold = S.fold ? S.fold(e.pl) : plLower;
        const plMatch = plLower.includes(cleanQ) || (foldQ && plFold.includes(foldQ));
        const enMatch = (e.en || '').toLowerCase().includes(cleanQ);
        const neMatch = (e.ne || '').includes(query);
        const pronMatch = (e.pron || '').toLowerCase().includes(cleanQ) || (e.proNe || '').includes(query);
        const phonMatch = normQ.length >= 3 && phoneticNorm(plLower).includes(normQ);

        if (plMatch || enMatch || neMatch || pronMatch || phonMatch) {
          const unit = e.source ? S.UNIT.get(e.source) : null;
          const level = unit ? unit.level : (e.level || '');
          const unitId = unit ? unit.id : (e.source && !['guide', 'mine', 'reading'].includes(e.source) ? e.source : null);
          const isExact = plLower === cleanQ || plFold === foldQ;
          const isPrefix = plLower.startsWith(cleanQ) || plFold.startsWith(foldQ);
          const score = isExact ? 120 : isPrefix ? 80 : (plMatch ? 50 : phonMatch ? 35 : 20);

          list.push({
            type: 'word',
            pl: e.pl,
            en: e.en,
            ne: e.ne,
            pron: e.pron,
            proNe: e.proNe,
            level,
            unitId,
            entry: e,
            score
          });
          if (list.length >= 40) break;
        }
      }

      // 1b. Search 2000 Core Words if not already in list
      if (window.SLOWKA_CORE2000_DATA && window.SLOWKA_CORE2000_DATA.entries) {
        const seenWords = new Set(list.map(w => w.pl.toLowerCase()));
        for (const item of window.SLOWKA_CORE2000_DATA.entries) {
          const [rank, chId, pl, en, ne, pron, proNe] = item;
          if (!pl) continue;
          const plLower = pl.toLowerCase();
          if (seenWords.has(plLower)) continue;
          const plFold = S.fold ? S.fold(pl) : plLower;
          const plMatch = plLower.includes(cleanQ) || (foldQ && plFold.includes(foldQ));
          const enMatch = (en || '').toLowerCase().includes(cleanQ);
          const neMatch = (ne || '').includes(query);
          const pronMatch = (pron || '').toLowerCase().includes(cleanQ) || (proNe || '').includes(query);

          if (plMatch || enMatch || neMatch || pronMatch) {
            seenWords.add(plLower);
            const isExact = plLower === cleanQ || plFold === foldQ;
            const isPrefix = plLower.startsWith(cleanQ) || plFold.startsWith(foldQ);
            const score = isExact ? 115 : isPrefix ? 75 : (plMatch ? 45 : 20);

            list.push({
              type: 'word',
              pl,
              en,
              ne,
              pron,
              proNe,
              level: `Core #${rank}`,
              unitId: 'core2000',
              score
            });
            if (list.length >= 60) break;
          }
        }
      }
    }

    // 2. Search Poland Guide
    if ((activeFilter === 'all' || activeFilter === 'guide') && window.SLOWKA_POLAND_GUIDE) {
      for (const cat of window.SLOWKA_POLAND_GUIDE) {
        for (const it of cat.items) {
          const plLower = it.pl.toLowerCase();
          const plFold = S.fold ? S.fold(it.pl) : plLower;
          const plMatch = plLower.includes(cleanQ) || (foldQ && plFold.includes(foldQ));
          const enMatch = it.en.toLowerCase().includes(cleanQ);
          const neMatch = (it.ne || '').includes(query);
          const tipMatch = (it.tip || '').toLowerCase().includes(cleanQ) || (it.tipNe || '').includes(query);
          if (plMatch || enMatch || neMatch || tipMatch) {
            const isExact = plLower === cleanQ || plFold === foldQ;
            list.push({
              type: 'guide',
              pl: it.pl,
              en: it.en,
              ne: it.ne,
              pron: it.pron,
              proNe: it.proNe,
              tip: it.tip,
              catId: cat.id,
              catTitle: cat.title,
              score: isExact ? 95 : 35
            });
            if (list.length >= 50) break;
          }
        }
      }
    }


    // 2b. Search Emergency SOS Cards
    if ((activeFilter === 'all' || activeFilter === 'sos') && window.SLOWKA_SOS) {
      for (const cat of window.SLOWKA_SOS) {
        for (const it of cat.items) {
          const plLower = it.pl.toLowerCase();
          const plFold = S.fold ? S.fold(it.pl) : plLower;
          const plMatch = plLower.includes(cleanQ) || (foldQ && plFold.includes(foldQ));
          const enMatch = it.en.toLowerCase().includes(cleanQ);
          const neMatch = (it.ne || '').includes(query);
          const tipMatch = (it.tip || '').toLowerCase().includes(cleanQ);
          if (plMatch || enMatch || neMatch || tipMatch) {
            const isExact = plLower === cleanQ || plFold === foldQ;
            list.push({
              type: 'sos',
              pl: it.pl,
              en: it.en,
              ne: it.ne,
              pron: it.pron,
              proNe: it.proNe,
              tip: it.tip,
              catId: cat.id,
              catTitle: cat.category,
              urgency: it.urgency,
              score: isExact ? 110 : (it.urgency === 'critical' ? 50 : 40)
            });
            if (list.length >= 50) break;
          }
        }
      }
    }


    // 2c. Search Daily Simulators
    if ((activeFilter === 'all' || activeFilter === 'sim') && window.SLOWKA_SIMULATORS) {
      for (const sim of window.SLOWKA_SIMULATORS) {
        const titleMatch = sim.title.toLowerCase().includes(cleanQ) || (sim.titleNe || '').includes(query);
        const ctxMatch = (sim.context || '').toLowerCase().includes(cleanQ) || (sim.contextNe || '').includes(query);
        let stepMatch = false;
        for (const step of sim.steps) {
          if (step.pl.toLowerCase().includes(cleanQ) || step.en.toLowerCase().includes(cleanQ) || step.ne.includes(query)) {
            stepMatch = true;
            break;
          }
        }
        if (titleMatch || ctxMatch || stepMatch) {
          list.push({
            type: 'sim',
            pl: sim.title,
            en: sim.context,
            ne: sim.titleNe,
            icon: sim.icon,
            badge: sim.badge,
            simId: sim.id,
            score: titleMatch ? 90 : 35
          });
        }
      }
    }

    // 3. Search Grammar & Lessons
    if (activeFilter === 'all' || activeFilter === 'grammar') {
      for (const u of S.COURSE) {
        if (!u) continue;
        const titleMatch = u.title.toLowerCase().includes(cleanQ) || (u.titleNe || '').includes(query);
        const sumMatch = (u.summary || '').toLowerCase().includes(cleanQ);
        if (titleMatch || sumMatch) {
          list.push({
            type: 'lesson',
            pl: u.title,
            en: u.summary,
            ne: u.titleNe,
            level: u.level,
            unitId: u.id,
            score: 15
          });
        }
      }
    }

    // Sort by relevance score
    list.sort((a, b) => b.score - a.score);
    results = list.slice(0, 30);
    selectedIdx = 0;
  }

  function getSuggestions() {
    const due = S.dueList().slice(0, 5);
    const words = due.length ? due : S.ENTRIES.slice(0, 5);
    return words.map((e) => ({
      type: 'word',
      pl: e.pl,
      en: e.en,
      ne: e.ne,
      pron: e.pron,
      proNe: e.proNe,
      level: e.level,
      unitId: e.unitId,
      entry: e,
      isSuggestion: true
    }));
  }

  Search.open = (initial = '') => {
    let overlay = document.getElementById('search-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'search-overlay';
      overlay.className = 'search-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Search dictionary, lessons, and Poland guide');
      overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay) Search.close();
      });
      document.body.appendChild(overlay);
    }
    query = initial;
    doSearch(query);
    renderModal(overlay);
    const inp = document.getElementById('search-modal-input');
    if (inp) {
      inp.focus();
      inp.select();
    }
  };

  Search.close = () => {
    const overlay = document.getElementById('search-overlay');
    if (overlay) overlay.remove();
  };

  Search.toggle = () => {
    if (document.getElementById('search-overlay')) Search.close();
    else Search.open();
  };

  function renderModal(overlay) {
    overlay.innerHTML = `
      <div class="search-modal" role="document">
        <header class="search-modal-head">
          <div class="search-input-wrap">
            <span class="search-mag-icon" aria-hidden="true">🔍</span>
            <input type="search" id="search-modal-input" class="search-modal-input" placeholder="Search Polish, English, or Nepali (e.g., dzień, contract, काम)..." value="${esc(query)}" autocomplete="off" spellcheck="false">
            <button type="button" class="search-clear-btn" data-action="search-clear" title="Clear search input">✕</button><kbd class="search-esc-kbd" title="Press Escape to close">ESC</kbd>
          </div>
          <div class="search-filters" role="group" aria-label="Search filter">
            <button class="search-filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-action="search-filter" data-filter="all">All</button>
            <button class="search-filter-chip ${activeFilter === 'vocab' ? 'active' : ''}" data-action="search-filter" data-filter="vocab">Vocabulary</button>
            <button class="search-filter-chip ${activeFilter === 'guide' ? 'active' : ''}" data-action="search-filter" data-filter="guide">🇵🇱 Poland Guide</button>
            <button class="search-filter-chip ${activeFilter === 'sos' ? 'active' : ''}" data-action="search-filter" data-filter="sos">🚨 Emergency SOS</button>
            <button class="search-filter-chip ${activeFilter === 'sim' ? 'active' : ''}" data-action="search-filter" data-filter="sim">🏪 Simulators</button>
            <button class="search-filter-chip ${activeFilter === 'grammar' ? 'active' : ''}" data-action="search-filter" data-filter="grammar">Lessons</button>
          </div>
        </header>

        <div class="search-results-list" id="search-results-list" role="listbox">
          ${renderResultsList()}
        </div>

        <footer class="search-modal-footer">
          <span class="search-tip-shortcut"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span class="search-tip-shortcut"><kbd>↵</kbd> listen / open</span>
          <span class="search-tip-shortcut"><kbd>Esc</kbd> close</span>
        </footer>
      </div>
    `;
  }

  function renderResultsList() {
    if (!results.length) {
      return `
        <div class="search-empty-state">
          <span class="empty-icon" aria-hidden="true">🔍</span>
          <p>No results found for "<b>${esc(query)}</b>"</p>
          <small lang="ne">कुनै नतिजा भेटिएन। अर्को शब्द खोज्नुहोस्।</small>
        </div>
      `;
    }

    return results.map((item, idx) => {
      const isSelected = idx === selectedIdx;


      if (item.type === 'sim') {
        return `
          <div class="search-item sim-item ${isSelected ? 'selected' : ''}" data-action="search-select" data-index="${idx}" role="option" aria-selected="${isSelected}">
            <div class="search-item-left">
              <span class="search-tag sim-tag">${item.icon || '🏪'} Simulator · ${esc(item.badge || '')}</span>
              <div class="search-pl">${esc(item.pl)}</div>
              <div class="search-trans">
                <span class="search-en">${esc(item.en.slice(0, 90))}…</span>
                <span class="search-ne" lang="ne">${esc(item.ne)}</span>
              </div>
            </div>
            <div class="search-item-actions">
              <button class="search-action-btn primary" data-action="search-go-sim" data-id="${esc(item.simId)}" title="Open Simulator">Start →</button>
            </div>
          </div>
        `;
      }

      if (item.type === 'sos') {
        return `
          <div class="search-item sos-item ${isSelected ? 'selected' : ''}" data-action="search-select" data-index="${idx}" role="option" aria-selected="${isSelected}">
            <div class="search-item-left">
              <span class="search-tag sos-tag">🚨 SOS · ${esc(item.catTitle || '')}</span>
              <div class="search-pl" lang="pl">${polish(item.pl)}</div>
              <div class="search-trans">
                <span class="search-en">EN: ${esc(item.en)}</span>
                <span class="search-ne" lang="ne">NE: ${esc(item.ne)}</span>
              </div>
              ${item.tip ? `<p class="search-tip-mini">💡 ${esc(item.tip)}</p>` : ''}
            </div>
            <div class="search-item-actions">
              <button class="search-action-btn" data-action="say" data-text="${esc(item.pl)}" title="Play loud audio">🔊</button>
              <button class="search-action-btn primary" data-action="search-go-sos" data-cat="${esc(item.catId)}" title="Open in SOS Cards">Show →</button>
            </div>
          </div>
        `;
      }

      if (item.type === 'guide') {
        return `
          <div class="search-item guide-item ${isSelected ? 'selected' : ''}" data-action="search-select" data-index="${idx}" role="option" aria-selected="${isSelected}">
            <div class="search-item-left">
              <span class="search-tag guide-tag">🇵🇱 Guide · ${esc(item.catTitle || '')}</span>
              <div class="search-pl" lang="pl">${polish(item.pl)}</div>
              <div class="search-trans">
                <span class="search-en">EN: ${esc(item.en)}</span>
                <span class="search-ne" lang="ne">NE: ${esc(item.ne)}</span>
              </div>
              ${item.tip ? `<p class="search-tip-mini">💡 ${esc(item.tip.slice(0, 95))}…</p>` : ''}
            </div>
            <div class="search-item-actions">
              <button class="search-action-btn" data-action="say" data-text="${esc(item.pl)}" title="Listen audio">🔊</button>
              <button class="search-action-btn primary" data-action="search-go-guide" data-cat="${esc(item.catId)}" title="Open in Poland Guide">View →</button>
            </div>
          </div>
        `;
      }

      if (item.type === 'lesson') {
        return `
          <div class="search-item lesson-item ${isSelected ? 'selected' : ''}" data-action="search-select" data-index="${idx}" role="option" aria-selected="${isSelected}">
            <div class="search-item-left">
              <span class="search-tag lesson-tag">📚 Lesson · ${esc(item.level)}</span>
              <div class="search-pl">${esc(item.pl)}</div>
              <div class="search-trans">
                <span class="search-ne" lang="ne">${esc(item.ne)}</span>
              </div>
            </div>
            <div class="search-item-actions">
              <button class="search-action-btn primary" data-action="go" data-to="${esc(item.unitId)}" title="Open Unit">Open →</button>
            </div>
          </div>
        `;
      }

      // Standard Word item
      return `
        <div class="search-item word-item ${isSelected ? 'selected' : ''}" data-action="search-select" data-index="${idx}" role="option" aria-selected="${isSelected}">
          <div class="search-item-left">
            <div class="search-item-headline">
              <span class="search-pl" lang="pl">${highlightMatch(item.pl, query)}</span>
              ${item.pron ? `<span class="search-pron">${esc(item.pron)}</span>` : ''}
              ${item.level ? `<span class="search-level-pill">${esc(item.level)}</span>` : ''}
            </div>
            <div class="search-trans">
              <span class="search-en">${highlightMatch(item.en, query)}</span>
              <span class="search-sep">·</span>
              <span class="search-ne" lang="ne">${highlightMatch(item.ne, query)}</span>
            </div>
          </div>
          <div class="search-item-actions">
            <button class="search-action-btn" data-action="say" data-text="${esc(item.pl)}" title="Listen to Polish native pronunciation">🔊</button>
            <button class="search-action-btn star" data-action="mywords-add" data-pl="${esc(item.pl)}" data-en="${esc(item.en)}" data-ne="${esc(item.ne)}" title="Add to My Words">⭐</button>
            ${item.unitId ? `<button class="search-action-btn mini-jump" data-action="go" data-to="${esc(item.unitId)}" title="Jump to lesson">Unit →</button>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  Search.action = (a, el) => {
    switch (a) {
      case 'open-search':
        Search.open();
        return true;
      case 'search-clear': {
        const inp = document.getElementById('search-modal-input');
        if (inp) { inp.value = ''; inp.focus(); }
        doSearch('');
        const listEl = document.getElementById('search-results-list');
        if (listEl) listEl.innerHTML = renderResultsList();
        return true;
      }
      case 'close-search':
        Search.close();
        return true;
      case 'search-filter': {
        activeFilter = el.dataset.filter || 'all';
        doSearch(query);
        const listEl = document.getElementById('search-results-list');
        if (listEl) listEl.innerHTML = renderResultsList();
        document.querySelectorAll('.search-filter-chip').forEach((c) => {
          c.classList.toggle('active', c === el);
        });
        return true;
      }
      case 'search-select': {
        selectedIdx = parseInt(el.dataset.index, 10) || 0;
        const item = results[selectedIdx];
        if (item && item.pl) S.speak(item.pl);
        return true;
      }
      case 'search-go-sim':
        Search.close();
        S.go('sim.' + (el.dataset.id || 'sim-zabka'));
        return true;
      case 'search-go-sos':
        Search.close();
        S.go('sos.' + (el.dataset.cat || 'all'));
        return true;
      case 'search-go-guide': {
        Search.close();
        S.go('guide.' + (el.dataset.cat || 'all'));
        return true;
      }
      default:
        return false;
    }
  };

  // Keyboard navigation inside search
  document.addEventListener('keydown', (ev) => {
    const overlay = document.getElementById('search-overlay');
    // Global hotkey to open: / or Ctrl+K / Cmd+K (unless typing in another input)
    if (!overlay) {
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
        ev.preventDefault();
        Search.open();
        return;
      }
      if (ev.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName)) {
        ev.preventDefault();
        Search.open();
        return;
      }
      return;
    }

    if (ev.key === 'Escape') {
      ev.preventDefault();
      const inp = document.getElementById('search-modal-input');
      if (inp && inp.value) {
        inp.value = '';
        doSearch('');
        const listEl = document.getElementById('search-results-list');
        if (listEl) listEl.innerHTML = renderResultsList();
        inp.focus();
      } else {
        Search.close();
      }
      return;
    }

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      if (results.length) {
        selectedIdx = (selectedIdx + 1) % results.length;
        updateSelectedUI();
      }
      return;
    }

    if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (results.length) {
        selectedIdx = (selectedIdx - 1 + results.length) % results.length;
        updateSelectedUI();
      }
      return;
    }

    if (ev.key === 'Enter') {
      const item = results[selectedIdx];
      if (item) {
        ev.preventDefault();
        // Shift+Enter jumps to associated unit / scenario
        if (ev.shiftKey) {
          if (item.unitId) {
            Search.close();
            S.go(item.unitId);
            return;
          } else if (item.simId) {
            Search.close();
            S.go('sim.' + item.simId);
            return;
          } else if (item.catId) {
            Search.close();
            S.go((item.type === 'sos' ? 'sos.' : 'guide.') + item.catId);
            return;
          }
        }
        // Standard Enter: plays pronunciation or launches modal/simulator
        if (item.type === 'sim') {
          Search.close();
          S.go('sim.' + (item.simId || 'sim-zabka'));
        } else if (item.type === 'sos') {
          if (item.pl) S.speak(item.pl);
        } else if (item.type === 'guide') {
          if (item.pl) S.speak(item.pl);
        } else if (item.type === 'lesson' && item.unitId) {
          Search.close();
          S.go(item.unitId);
        } else if (item.pl) {
          S.speak(item.pl);
        }
      }
      return;
    }
  });

  function updateSelectedUI() {
    const items = document.querySelectorAll('.search-item');
    items.forEach((it, idx) => {
      const isSel = idx === selectedIdx;
      it.classList.toggle('selected', isSel);
      it.setAttribute('aria-selected', isSel ? 'true' : 'false');
      if (isSel) it.scrollIntoView({ block: 'nearest' });
    });
  }

  // Handle live typing in modal input
  document.addEventListener('input', (ev) => {
    if (ev.target && ev.target.id === 'search-modal-input') {
      doSearch(ev.target.value);
      const listEl = document.getElementById('search-results-list');
      if (listEl) listEl.innerHTML = renderResultsList();
    }
  });
})();
