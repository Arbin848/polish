// Słówka numbers trainer: numbers, prices, times, dates and phone numbers.
// Everything is generated from Polish number rules, so practice never runs out.
(() => {
  'use strict';
  const S = window.Slowka;
  const { esc, polish } = S;
  const N = (S.Numbers = {});

  // ---------- Polish number words ----------

  const ONES = ['zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć'];
  const TEENS = ['dziesięć', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście'];
  const TENS = ['', '', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt'];
  const HUNDREDS = ['', 'sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset', 'sześćset', 'siedemset', 'osiemset', 'dziewięćset'];

  function under1000(n) {
    const parts = [];
    const h = Math.floor(n / 100);
    const rest = n % 100;
    if (h) parts.push(HUNDREDS[h]);
    if (rest >= 10 && rest < 20) parts.push(TEENS[rest - 10]);
    else {
      if (rest >= 20) parts.push(TENS[Math.floor(rest / 10)]);
      if (rest % 10 || (!h && rest < 10)) parts.push(ONES[rest % 10]);
    }
    return parts.filter((p) => p && !(p === 'zero' && (h || rest))).join(' ');
  }

  // Which noun form follows a number: 1 → one, 2–4 (not 12–14) → few, else many.
  N.form = (n) => {
    if (n === 1) return 'one';
    const d = n % 10;
    const t = n % 100;
    return d >= 2 && d <= 4 && !(t >= 12 && t <= 14) ? 'few' : 'many';
  };
  const pick = (n, [one, few, many]) => ({ one, few, many }[N.form(n)]);

  N.words = (n) => {
    if (n < 1000) return under1000(n);
    const th = Math.floor(n / 1000);
    const rest = n % 1000;
    const thWords = th === 1 ? 'tysiąc' : `${under1000(th)} ${pick(th, ['tysiąc', 'tysiące', 'tysięcy'])}`;
    return rest ? `${thWords} ${under1000(rest)}` : thWords;
  };

  const ZLOTY = ['złoty', 'złote', 'złotych'];
  const GROSZ = ['grosz', 'grosze', 'groszy'];
  N.price = (zl, gr) => {
    const z = zl ? `${N.words(zl)} ${pick(zl, ZLOTY)}` : '';
    const g = gr ? `${N.words(gr)} ${pick(gr, GROSZ)}` : '';
    return [z, g].filter(Boolean).join(' ') || 'zero złotych';
  };

  const HOUR_NOM = ['północ', 'pierwsza', 'druga', 'trzecia', 'czwarta', 'piąta', 'szósta', 'siódma', 'ósma', 'dziewiąta', 'dziesiąta', 'jedenasta', 'dwunasta', 'trzynasta', 'czternasta', 'piętnasta', 'szesnasta', 'siedemnasta', 'osiemnasta', 'dziewiętnasta', 'dwudziesta', 'dwudziesta pierwsza', 'dwudziesta druga', 'dwudziesta trzecia'];
  const HOUR_LOC = ['północy', 'pierwszej', 'drugiej', 'trzeciej', 'czwartej', 'piątej', 'szóstej', 'siódmej', 'ósmej', 'dziewiątej', 'dziesiątej', 'jedenastej', 'dwunastej', 'trzynastej', 'czternastej', 'piętnastej', 'szesnastej', 'siedemnastej', 'osiemnastej', 'dziewiętnastej', 'dwudziestej', 'dwudziestej pierwszej', 'dwudziestej drugiej', 'dwudziestej trzeciej'];
  // "Jest siódma trzydzieści." / "o siódmej trzydzieści" (at 7:30). Minutes are said as numbers.
  N.time = (h, m, at) => {
    const hour = (at ? HOUR_LOC : HOUR_NOM)[h];
    const min = m ? ` ${m < 10 ? `zero ${ONES[m]}` : N.words(m)}` : '';
    return at ? `o ${hour}${min}` : `${hour}${min}`;
  };

  const DAY_GEN = ['', 'pierwszego', 'drugiego', 'trzeciego', 'czwartego', 'piątego', 'szóstego', 'siódmego', 'ósmego', 'dziewiątego', 'dziesiątego', 'jedenastego', 'dwunastego', 'trzynastego', 'czternastego', 'piętnastego', 'szesnastego', 'siedemnastego', 'osiemnastego', 'dziewiętnastego', 'dwudziestego'];
  const dayGen = (d) => (d <= 20 ? DAY_GEN[d] : d < 30 ? `dwudziestego ${DAY_GEN[d - 20]}` : d === 30 ? 'trzydziestego' : 'trzydziestego pierwszego');
  const DAY_NOM_BAD = { 1: 'pierwszy', 2: 'drugi', 3: 'trzeci', 5: 'piąty', 10: 'dziesiąty', 15: 'piętnasty', 20: 'dwudziesty' };
  const MONTHS_GEN = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
  const MONTHS_NOM = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  N.date = (d, mo) => `${dayGen(d)} ${MONTHS_GEN[mo]}`;
  const DAYS_IN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Groups of three; leading zeros are said as "zero": 007 → "zero zero siedem".
  N.phone = (digits) => digits.match(/\d{3}/g).map((g) => {
    const zeros = g.match(/^0*/)[0].length;
    const rest = g.slice(zeros);
    return [...Array(Math.min(zeros, 3)).fill('zero'), ...(rest ? [N.words(Number(rest))] : [])].join(' ');
  }).join(', ');

  // ---------- questions ----------

  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const RANGES = { 20: [0, 20], 100: [0, 100], 1000: [0, 1000], 10000: [1000, 9999] };
  // Learners confuse 13/30, 15/50, 16/60…; use those as wrong answers.
  function nearNumbers(n, max) {
    const c = new Set();
    if (n >= 13 && n <= 19) c.add((n - 10) * 10);
    if (n % 10 === 0 && n >= 30 && n <= 90) c.add(n / 10 + 10);
    [n + 1, n - 1, n + 10, n - 10, n + 100, n - 100, Number(String(n).split('').reverse().join(''))].forEach((x) => c.add(x));
    c.delete(n);
    return S.shuffle([...c].filter((x) => x >= 0 && x <= Math.max(max, 20)));
  }
  const fmtPrice = (z, g) => `${z},${String(g).padStart(2, '0')} zł`;
  const pad = (x) => String(x).padStart(2, '0');

  function makeQuestion(mode, range) {
    const [lo, hi] = RANGES[range];
    if (mode === 'listen-number') {
      const n = rnd(lo, hi);
      return { mode, say: N.words(n), answer: String(n), prompt: 'Write the number you hear', promptNe: 'सुनेको अङ्क लेख्नुहोस्', input: 'numeric', show: String(n) };
    }
    if (mode === 'read-number') {
      const n = rnd(lo, hi);
      const opts = S.shuffle([n, ...nearNumbers(n, hi).slice(0, 3)]);
      return { mode, display: String(n), options: opts.map(N.words), answerIndex: opts.indexOf(n), say: N.words(n), prompt: 'How do you say this number?', promptNe: 'यो अङ्क कसरी भनिन्छ?' };
    }
    if (mode === 'price') {
      const z = rnd(1, Math.max(2, Math.min(range, 9999) - (range > 20 ? 1 : 0))); // prices follow the chosen range
      const g = [0, 10, 20, 49, 50, 99, 2, 5, 25][rnd(0, 8)];
      const right = N.price(z, g);
      const zPart = (f) => `${N.words(z)} ${f}`;
      const gPart = (f) => (g ? ` ${N.words(g)} ${f}` : '');
      const wrongZ = ZLOTY.filter((f) => f !== pick(z, ZLOTY));
      const wrongG = GROSZ.filter((f) => f !== pick(g, GROSZ));
      // Typical mistakes: the wrong noun form after the number (dwa złotych, pięć złote…).
      const opts = new Set([right, zPart(wrongZ[0]) + gPart(pick(g, GROSZ)), zPart(wrongZ[1]) + gPart(pick(g, GROSZ))]);
      if (g) opts.add(zPart(pick(z, ZLOTY)) + gPart(wrongG[0]));
      const alt = nearNumbers(z, 999).find((x) => x > 0);
      if (alt && opts.size < 4) opts.add(N.price(alt, g));
      const options = S.shuffle([...opts]).slice(0, 4);
      if (!options.includes(right)) options[0] = right;
      return { mode, display: fmtPrice(z, g), options, answerIndex: options.indexOf(right), say: right, prompt: 'Say the price', promptNe: 'मूल्य भन्नुहोस्' };
    }
    if (mode === 'listen-price') {
      const z = rnd(1, Math.max(2, Math.min(range, 9999) - (range > 20 ? 1 : 0))); // prices follow the chosen range
      const g = [0, 50, 99, 20][rnd(0, 3)];
      return { mode, say: N.price(z, g), answer: `${z},${pad(g)}`, alt: g ? null : String(z), prompt: 'Write the price you hear (e.g. 12,50)', promptNe: 'सुनेको मूल्य लेख्नुहोस् (जस्तै 12,50)', input: 'price', show: fmtPrice(z, g) };
    }
    if (mode === 'time') {
      const h = rnd(1, 23);
      const m = [0, 15, 30, 45, 5, 10, 20, 50][rnd(0, 7)];
      const at = Math.random() < 0.5;
      const right = N.time(h, m, at);
      const min = m ? ` ${m < 10 ? `zero ${ONES[m]}` : N.words(m)}` : '';
      // Wrong case is the typical mistake: "o siódma" instead of "o siódmej".
      const wrongCase = at ? `o ${HOUR_NOM[h]}${min}` : `${HOUR_LOC[h]}${min}`;
      const opts = new Set([right, wrongCase, N.time(h === 23 ? 22 : h + 1, m, at), N.time(h, m === 30 ? 15 : 30, at)]);
      const options = S.shuffle([...opts].filter(Boolean)).slice(0, 4);
      if (!options.includes(right)) options[0] = right;
      return { mode, display: `${at ? 'at ' : ''}${h}:${pad(m)}`, options, answerIndex: options.indexOf(right), say: right, prompt: at ? 'Say "at" this time (o…)' : 'Say this time (Jest…)', promptNe: at ? '"…बजे" भन्नुहोस्' : 'समय भन्नुहोस्' };
    }
    if (mode === 'listen-time') {
      const h = rnd(1, 23);
      const m = [0, 15, 30, 45, 10, 40][rnd(0, 5)];
      return { mode, say: `Jest ${N.time(h, m)}.`, answer: `${h}:${pad(m)}`, prompt: 'Write the time you hear (e.g. 7:30)', promptNe: 'सुनेको समय लेख्नुहोस् (जस्तै 7:30)', input: 'time', show: `${h}:${pad(m)}` };
    }
    if (mode === 'date') {
      const mo = rnd(0, 11);
      const d = rnd(1, DAYS_IN[mo]);
      const right = N.date(d, mo);
      const opts = new Set([right, `${dayGen(d)} ${MONTHS_NOM[mo]}`, N.date(d, (mo + 1) % 12)]);
      if (DAY_NOM_BAD[d]) opts.add(`${DAY_NOM_BAD[d]} ${MONTHS_GEN[mo]}`);
      else opts.add(N.date(d === DAYS_IN[mo] ? d - 1 : d + 1, mo));
      const options = S.shuffle([...opts]).slice(0, 4);
      if (!options.includes(right)) options[0] = right;
      return { mode, display: `${d} ${MONTHS_EN[mo]} (${d}.${pad(mo + 1)})`, options, answerIndex: options.indexOf(right), say: right, prompt: 'Say the date', promptNe: 'मिति भन्नुहोस्' };
    }
    if (mode === 'phone') {
      const digits = `${[5, 6, 7, 8][rnd(0, 3)]}${String(rnd(0, 99999999)).padStart(8, '0')}`;
      return { mode, say: N.phone(digits), answer: digits, prompt: 'Write the phone number you hear (9 digits)', promptNe: 'सुनेको फोन नम्बर लेख्नुहोस् (९ अङ्क)', input: 'numeric', show: digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') };
    }
    return null;
  }

  // ---------- page ----------

  const MODES = [
    ['read-number', 'Numbers', 'अङ्क'], ['listen-number', 'Hear numbers', 'अङ्क सुन्नुहोस्'],
    ['price', 'Prices', 'मूल्य'], ['listen-price', 'Hear prices', 'मूल्य सुन्नुहोस्'],
    ['time', 'Times', 'समय'], ['listen-time', 'Hear times', 'समय सुन्नुहोस्'],
    ['date', 'Dates', 'मिति'], ['phone', 'Phone numbers', 'फोन नम्बर'],
  ];
  const st = { mode: S.canSpeak ? 'listen-number' : 'read-number', range: 20, q: null, a: null, score: 0, total: 0 };

  const guide = () => `
    <details class="model">
      <summary>Rules to remember · याद गर्नुपर्ने नियम</summary>
      <div class="table-wrap"><table>
        <caption>After a number · अङ्कपछि</caption>
        <thead><tr><th>Number</th><th>złoty</th><th>grosz</th><th>rok (age)</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>złoty</td><td>grosz</td><td>rok</td></tr>
          <tr><td>2, 3, 4, 22, 23, 24…</td><td>złote</td><td>grosze</td><td>lata</td></tr>
          <tr><td>5–21, 25–31…, and 12, 13, 14</td><td>złotych</td><td>groszy</td><td>lat</td></tr>
        </tbody>
      </table></div>
      ${S.whyHTML({ en: 'Times use the feminine ordinal: *Jest siódma* (it is seven), *o siódmej* (at seven). Minutes are plain numbers: *siódma trzydzieści* = 7:30. Dates use the genitive: *piętnastego maja* = 15 May. Phone numbers are read in groups of three: *sześćset jeden, dwieście trzydzieści cztery…*',
        ne: 'समयमा क्रमसूचक स्त्रीलिङ्ग: *Jest siódma* (सात बज्यो), *o siódmej* (सात बजे)। मिनेट सामान्य अङ्क: *siódma trzydzieści* = ७:३०। मितिमा: *piętnastego maja* = मे १५। फोन नम्बर तीन-तीन अङ्कमा पढिन्छ।' })}
      <div class="chip-row">${[1, 2, 5, 12, 21, 22, 100, 1000, 2000, 5000].map((n) => `<button class="say-chip" data-action="say" data-text="${esc(N.words(n))}">${S.SPEAKER}<b>${n}</b>&nbsp;<span lang="pl">${polish(N.words(n))}</span></button>`).join('')}</div>
    </details>`;

  N.render = (view) => {
    if (!st.q) st.q = makeQuestion(st.mode, st.range);
    const q = st.q;
    const a = st.a;
    let body;
    if (q.options) {
      body = `
        <div class="card compact"><span class="label">${esc(q.prompt)} · <span lang="ne">${esc(q.promptNe)}</span></span><span class="word num-display">${esc(q.display)}</span></div>
        <div class="options single">${q.options.map((o, k) => {
          let cls = 'option';
          if (a && k === q.answerIndex) cls += ' right'; else if (a && k === a.pick) cls += ' wrong';
          return `<button class="${cls}" data-action="nm-pick" data-index="${k}" ${a ? 'disabled' : ''}><kbd>${k + 1}</kbd><span class="opt-pl" lang="pl">${polish(o)}</span></button>`;
        }).join('')}</div>`;
    } else {
      body = `
        <form class="card" data-form="nm" autocomplete="off">
          <span class="label">${esc(q.prompt)} · <span lang="ne">${esc(q.promptNe)}</span></span>
          <button type="button" class="play" data-action="say" data-text="${esc(q.say)}" aria-label="Play again">${S.SPEAKER}</button>
          ${S.slowBtn(q.say)}
          <input class="type-input" id="nm-input" inputmode="${q.input === 'numeric' ? 'numeric' : 'decimal'}" autocomplete="off" aria-label="Your answer" value="${esc(a ? a.given : '')}" ${a ? 'readonly' : 'data-autofocus'}>
          ${a ? '' : '<div class="row"><button type="submit" class="btn primary"><kbd>Enter</kbd> Check</button></div>'}
        </form>`;
    }
    const fb = a ? `
      <div class="feedback ${a.ok ? 'right' : 'wrong'}" role="status"><div class="fb-text">
        <strong>${a.ok ? 'Dobrze! Correct · सही' : 'Not quite · मिलेन'}</strong>
        ${q.show ? `<span class="answer">${esc(q.show)}</span>` : ''}
        <span class="answer" lang="pl">${polish(q.options ? q.options[q.answerIndex] : q.say)}</span>${(q.input === "price" && q.say) ? `<div class="nm-spoken-breakdown"><small class="hint">Spoken in Polish: </small><b lang="pl">${esc(q.say)}</b></div>` : ""}
      </div><div class="row">${S.listenBtn(q.say, true)}<button class="btn primary" data-action="nm-next" data-autofocus><kbd>Enter</kbd> Next</button></div></div>` : '';
    view.innerHTML = `
      ${S.backLink('practice', 'Practice · अभ्यास')}
      <header class="unit-head">
        <span class="eyebrow">Numbers · अङ्क</span>
        <h2>Numbers, prices, times and dates</h2>
        <p class="hint">You hear these every day at the shop, at work and in offices. Practise until you understand them at normal speed.<br><span lang="ne">पसल, काम र कार्यालयमा हरेक दिन सुनिन्छ। सामान्य गतिमा नबुझेसम्म अभ्यास गर्नुहोस्।</span></p>
      </header>
      <div class="seg chips" role="group">${MODES.map(([m, en, ne]) => `<button data-action="nm-mode" data-mode="${m}" aria-pressed="${st.mode === m}">${en} · <span lang="ne">${ne}</span></button>`).join('')}</div>
      ${['read-number', 'listen-number', 'price', 'listen-price'].includes(st.mode) ? `<div class="seg chips" role="group">${[[20, '0–20'], [100, '0–100'], [1000, '0–1000'], [10000, '1000+']].map(([r, l]) => `<button data-action="nm-range" data-range="${r}" aria-pressed="${st.range === r}">${l}</button>`).join('')}</div>` : ''}
      <div class="meta"><span>Score ${st.score} / ${st.total}</span></div>
      ${body}
      ${fb}
      ${guide()}`;
    if (!a && q.say && !q.options && !st.spoken) { st.spoken = true; setTimeout(() => { if (S.route.name === 'numbers' && st.q === q) S.speak(q.say); }, 200); }
    const f = view.querySelector('[data-autofocus]');
    if (f) {
      f.focus({ preventScroll: true });
      // Instant auto-submit when exactly 9 digits are entered in phone practice
      if (st.mode === 'phone' && !st.a) {
        f.addEventListener('input', () => {
          const digits = f.value.replace(/\D/g, '');
          if (digits.length === 9) {
            setTimeout(() => {
              const form = view.querySelector('form[data-form="nm"]');
              if (form && !st.a) N.submit(form, view);
            }, 300);
          }
        });
      }
      // Transparently replace '.' with ',' on price inputs to prevent keypad mistypes
      if (q.input === 'price' && !st.a) {
        f.addEventListener('input', () => {
          if (f.value.includes('.')) {
            const start = f.selectionStart;
            f.value = f.value.replace(/\./g, ',');
            f.setSelectionRange(start, start);
          }
        });
      }
    }
  };

  function finish(ok, extra) {
    st.a = { ok, ...extra };
    st.total += 1;
    if (ok) st.score += 1;
    const s = (S.progress.numbers = S.progress.numbers || {});
    const m = s[st.mode] || { r: 0, w: 0 };
    if (ok) m.r += 1; else m.w += 1;
    s[st.mode] = m;
    S.logActivity();
    S.saveProgress();
    if (S.onProgress) S.onProgress();
    S.render();
    S.speak(st.q.say);
  }

  N.action = (a, el) => {
    switch (a) {
      case 'nm-mode': st.mode = el.dataset.mode; st.q = null; st.a = null; st.spoken = false; S.render(); return true;
      case 'nm-range': st.range = Number(el.dataset.range); st.q = null; st.a = null; st.spoken = false; S.render(); return true;
      case 'nm-pick': if (!st.a) { const k = Number(el.dataset.index); finish(k === st.q.answerIndex, { pick: k }); } return true;
      case 'nm-next': st.q = null; st.a = null; st.spoken = false; S.render(); return true;
      default: return false;
    }
  };
  N.submit = (form, view) => {
    if (form.dataset.form !== 'nm' || st.a) return false;
    const input = view.querySelector('#nm-input');
    if (!input || !input.value.trim()) return true;
    const given = input.value.trim();
    const norm = (x) => String(x).replace(/z[łl]\s*$/i, '').replace(/\s+/g, '').replace('.', ',').replace(/^0+(?=\d)/, '');
    const q = st.q;
    const g = norm(given);
    let ok = g === norm(q.answer) || (q.alt && g === norm(q.alt));
    // Numbers and phone numbers: separators don't matter (2 914, 2,914, 2.914, 600-123-456, +48…);
    // the number written as a word is fine too.
    const digits = (x) => String(x).replace(/[^\d]/g, '');
    if (!ok && /^\d[\d\s.,'’-]*$/.test(String(q.answer)) && q.input !== 'price' && q.input !== 'time') {
      let d = digits(given);
      if (d.length === 11 && d.startsWith('48') && digits(q.answer).length === 9) d = d.slice(2);
      ok = d !== '' && d === digits(q.answer);
    }
    if (!ok && q.say && S.clean(given) === S.clean(q.say)) ok = true;
    // Prices compare by value: 12,5 = 12.50 = 12,50 zł = 12 zł 50 gr = 12zł50.
    if (q.input === 'price') {
      const cents = (x) => {
        const m = String(x).trim().toLowerCase().replace(/\s*z[łl]\s*$/, '').replace(/(\d)[\s\u00a0\u202f](?=\d{3}\b)/g, '$1').match(/^(\d+)\s*(?:zł|zl|[.,])?\s*(\d{1,2})?\s*(?:gr|groszy|grosze|grosz)?$/);
        if (!m) return NaN;
        return Number(m[1]) * 100 + (m[2] ? Number(m[2].length === 1 ? `${m[2]}0` : m[2]) : 0);
      };
      ok = cents(given) === cents(q.answer);
    }
    if (q.input === 'time') {
      // 7:30, 07.30, 7 30, 1845, 18h45, 18:45:00, and a plain hour (7) for full hours.
      const [ah, am] = q.answer.split(':').map(Number);
      const m = given.trim().match(/^(\d{1,2})\s*[:.,h\s]?\s*(\d{2})(?::00)?$/i) || given.trim().match(/^(\d{1,2})$/);
      ok = !!m && Number(m[1]) === ah && (m[2] != null ? Number(m[2]) === am : am === 0);
    }
    finish(!!ok, { given });
    return true;
  };
  N.key = (ev) => {
    if (S.route.name !== 'numbers') return false;
    // Press 'r' / 'R' or Ctrl+Space to replay spoken audio
    if (st.q && st.q.say && (ev.key === 'r' || ev.key === 'R' || ((ev.ctrlKey || ev.metaKey) && ev.key === ' '))) {
      const isInput = ev.target.tagName === 'INPUT' || ev.target.tagName === 'TEXTAREA';
      if (!isInput || ev.ctrlKey || ev.metaKey) {
        ev.preventDefault();
        S.speak(st.q.say);
        return true;
      }
    }
    if (!st.a && st.q && st.q.options && /^[1-4]$/.test(ev.key)) {
      const b = document.querySelector(`[data-action="nm-pick"][data-index="${Number(ev.key) - 1}"]`);
      if (b) { b.click(); return true; }
    }
    if (st.a && ev.key === 'Enter' && ev.target.tagName !== 'BUTTON') { const b = document.querySelector('[data-action="nm-next"]'); if (b) { b.click(); return true; } }
    return false;
  };
})();
