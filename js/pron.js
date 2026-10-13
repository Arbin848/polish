// Słówka pronunciation from spelling. Polish is written almost exactly as it is said, so a
// handful of rules turn any Polish word into English-letter and Devanagari pronunciation:
// letters -> sounds, voicing at word ends and in clusters, syllables, stress on the
// second-last syllable. Used for "My words" (words the learner adds) and to check the course.
(() => {
  'use strict';
  const S = window.Slowka;
  const P = (S.Pron = {});

  const VOWELS = 'aeiouyóąę';
  const isV = (ch) => !!ch && VOWELS.includes(ch);
  // Spelling -> sound. Longest match first.
  const SOFT = { dzi: 'dź', ci: 'ć', si: 'ś', zi: 'ź', ni: 'ń' };
  const MULTI = { dż: 'dż', dź: 'dź', dz: 'dz', cz: 'cz', sz: 'sz', rz: 'ż', ch: 'h' };
  const SINGLE = {
    p: 'p', b: 'b', t: 't', d: 'd', k: 'k', g: 'g', f: 'f', w: 'v', v: 'v', s: 's', z: 'z', ż: 'ż', ś: 'ś', ź: 'ź',
    c: 'c', ć: 'ć', h: 'h', m: 'm', n: 'n', ń: 'ń', l: 'l', ł: 'ł', r: 'r', j: 'j', x: 'ks', q: 'k',
  };
  const DEVOICE = { b: 'p', d: 't', g: 'k', v: 'f', z: 's', ż: 'sz', ź: 'ś', dz: 'c', dż: 'cz', dź: 'ć' };
  const VOICELESS = new Set(['p', 't', 'k', 'f', 's', 'sz', 'ś', 'c', 'cz', 'ć', 'h']);

  // One word -> list of sounds: { c } consonant (g: true for the y-glide in "pie") or { v, nasal }.
  function sounds(word) {
    const out = [];
    let i = 0;
    while (i < word.length) {
      const rest = word.slice(i);
      const soft = Object.keys(SOFT).find((k) => rest.startsWith(k));
      if (soft) {
        out.push({ c: SOFT[soft] });
        // "si" + vowel is just ś; "si" + consonant is ś + i.
        i += isV(word[i + soft.length]) ? soft.length : soft.length - 1;
        continue;
      }
      const multi = Object.keys(MULTI).find((k) => rest.startsWith(k));
      if (multi) { out.push({ c: MULTI[multi], rz: multi === 'rz' }); i += 2; continue; }
      const ch = word[i];
      // "au", "eu" are one syllable: a + w ("autobus" -> aw-to-boos).
      if (ch === 'u' && (word[i - 1] === 'a' || word[i - 1] === 'e') && out.length && out[out.length - 1].v) { out.push({ c: 'ł' }); i++; continue; }
      if (ch === 'i' && i > 0 && !isV(word[i - 1]) && isV(word[i + 1])) { out.push({ c: 'j', g: true }); i++; continue; }
      if (isV(ch)) {
        if (ch === 'ą' || ch === 'ę') out.push({ v: ch === 'ą' ? 'o' : 'e', nasal: true });
        else out.push({ v: ch === 'ó' ? 'u' : ch });
        i++;
        continue;
      }
      if (SINGLE[ch]) {
        if (SINGLE[ch] === 'ks') out.push({ c: 'k' }, { c: 's' });
        else out.push({ c: SINGLE[ch] });
      }
      i++;
    }
    // Final ę is said as a plain e; ą/ę before l/ł lose the nasal.
    out.forEach((s, k) => {
      if (!s.nasal) return;
      const next = out[k + 1];
      if ((!next && s.v === 'e') || (next && (next.c === 'l' || next.c === 'ł'))) s.nasal = false;
    });
    // ą/ę before a consonant: a vowel + n (m before p/b): "będę" -> BEN-deh, "kąpiel" -> KOM-pyel.
    for (let k = out.length - 2; k >= 0; k--) {
      const s = out[k];
      const next = out[k + 1];
      if (s.nasal && next.c) { s.nasal = false; out.splice(k + 1, 0, { c: next.c === 'p' || next.c === 'b' ? 'm' : 'n' }); }
    }
    // ł after a consonant at the end is silent ("przyszedł" -> PSHI-shet).
    const last = out[out.length - 1];
    if (last && last.c === 'ł' && out.length > 1 && out[out.length - 2].c) out.pop();
    // ł between two consonants is silent ("jabłko" -> YAP-ko, "mógłbym" -> MOOG-bim).
    for (let k = out.length - 2; k > 0; k--) if (out[k].c === 'ł' && out[k - 1].c && out[k + 1].c) out.splice(k, 1);
    // ń before i or a consonant is written as plain n ("nigdy" -> NEEG-di, "słońce" -> SWON-tse).
    out.forEach((s, k) => { const n = out[k + 1]; if (s.c === 'ń' && n && (n.c || n.v === 'i')) s.c = 'n'; });
    // Voicing: w and rz after a voiceless sound; clusters take the voicing of the last obstruent; word ends are voiceless.
    for (let k = 1; k < out.length; k++) {
      const prev = out[k - 1].c;
      if (prev && VOICELESS.has(prev)) {
        if (out[k].c === 'v') out[k].c = 'f';
        else if (out[k].rz) out[k].c = 'sz';
      }
    }
    // A voiced sound before a voiceless one becomes voiceless ("podpis" -> potpis, "zróbcie" -> zrupche).
    for (let k = out.length - 2; k >= 0; k--) {
      const next = out[k + 1].c;
      if (out[k].c && DEVOICE[out[k].c] && next && VOICELESS.has(next)) out[k].c = DEVOICE[out[k].c];
    }
    // A voiceless sound before a voiced one becomes voiced ("jakby" -> YAG-bi, "także" -> TAG-zheh); not before w or rz.
    const VOICE = Object.fromEntries(Object.entries(DEVOICE).map(([v, u]) => [u, v]));
    for (let k = out.length - 2; k >= 0; k--) {
      const next = out[k + 1];
      if (out[k].c && VOICE[out[k].c] && next.c && DEVOICE[next.c] && next.c !== 'v' && !next.rz && next.c !== 'dź' && next.c !== 'dż' && k + 1 < out.length - 1) out[k].c = VOICE[out[k].c];
    }
    // ć before dź merges into it ("pięćdziesiąt" -> pyen-JEH-shont).
    for (let k = out.length - 2; k >= 0; k--) if ((out[k].c === 'ć' || out[k].c === 'cz') && (out[k + 1].c === 'dź' || out[k + 1].c === 'dż')) out.splice(k, 1);
    // All-consonant end of word: devoice every obstruent ("mózg" -> musk).
    for (let k = out.length - 1; k >= 0 && out[k].c; k--) if (DEVOICE[out[k].c]) out[k].c = DEVOICE[out[k].c];
    return out;
  }

  // Sounds -> syllables. One consonant goes to the next syllable; of two or more, the first
  // closes the syllable before. A consonant with its y-glide ("pie", "mia") stays together.
  function syllables(snd) {
    const vIdx = snd.map((s, k) => (s.v ? k : -1)).filter((k) => k >= 0);
    if (!vIdx.length) return [snd];
    const out = [];
    let start = 0;
    vIdx.forEach((v, n) => {
      const nextV = vIdx[n + 1];
      if (nextV == null) { out.push(snd.slice(start)); return; }
      const between = nextV - v - 1;
      let cut = v + 1; // start of next syllable
      // The consonants that start the next syllable: the last one (with its glide), or an
      // obstruent + r/l/ł pair, which Polish keeps together ("po-pro-sze", "o-glą-dam").
      let onset = snd[nextV - 1].g ? 2 : 1;
      const a = snd[nextV - onset - 1];
      const b = snd[nextV - onset];
      if (a && a.c && onset === 1 && ['r', 'l', 'ł'].includes(b.c) && !['r', 'l', 'ł', 'm', 'n', 'ń', 'j'].includes(a.c)) onset = 2;
      if (between > onset) cut = nextV - onset;
      out.push(snd.slice(start, cut));
      start = cut;
    });
    return out;
  }

  function stressIndex(syl, word) {
    if (syl.length < 2) return -1;
    // Words from Greek/Latin in -ika/-yka (matematyka, muzyka) stress the third-last syllable.
    if (syl.length >= 3 && /[iy]k[aię]$/.test(word)) return syl.length - 3;
    return syl.length - 2;
  }

  const EN_C = { sz: 'sh', ś: 'sh', ż: 'zh', ź: 'zh', cz: 'ch', ć: 'ch', dż: 'j', dź: 'j', c: 'ts', ń: 'ny', ł: 'w', j: 'y', h: 'h' };
  const EN_V = { a: 'a', e: 'e', i: 'ee', o: 'o', u: 'oo', y: 'i' };
  const NE_C = {
    p: 'प', b: 'ब', t: 'त', d: 'द', k: 'क', g: 'ग', f: 'फ़', v: 'भ', s: 'स', z: 'ज़', sz: 'श', ś: 'श', ż: 'झ', ź: 'झ',
    cz: 'च', ć: 'च', dż: 'ज', dź: 'ज', c: 'त्स', dz: 'द्ज़', h: 'ह', m: 'म', n: 'न', ń: 'न्य', l: 'ल', ł: 'व', r: 'र', j: 'य',
  };
  const NE_SIGN = { a: 'ा', e: 'े', i: 'ि', o: 'ो', u: 'ु', y: 'ि' };
  const NE_FULL = { a: 'आ', e: 'ए', i: 'इ', o: 'ओ', u: 'उ', y: 'इ' };

  function enSyl(syl) {
    let txt = '';
    syl.forEach((s, k) => {
      if (s.c) txt += EN_C[s.c] || s.c;
      else {
        const open = k === syl.length - 1;
        // Open "e" is written "eh" so it is not read as English "ee" or silent.
        txt += (s.v === 'e' && open && !s.nasal ? 'eh' : EN_V[s.v]) + (s.nasal ? 'n' : '');
      }
    });
    return txt;
  }

  function neSyl(syl) {
    let txt = '';
    let pending = false; // a consonant waiting for its vowel
    syl.forEach((s) => {
      if (s.c) {
        if (pending) txt += '्';
        txt += NE_C[s.c] || s.c;
        pending = true;
      } else {
        txt += pending ? NE_SIGN[s.v] : NE_FULL[s.v];
        if (s.nasal) txt += 'ं';
        pending = false;
      }
    });
    if (pending) txt += '्';
    return txt;
  }

  const words = (text) => String(text).toLowerCase().replace(/[^a-ząćęłńóśźżvxq\s-]/g, ' ').split(/[\s-]+/).filter(Boolean);

  // Polish text -> { pron, proNe } in the same style as the course data.
  P.of = (text) => {
    const ws = words(text);
    if (!ws.length) return { pron: '', proNe: '' };
    const en = [];
    const ne = [];
    ws.forEach((w, n) => {
      let snd = sounds(w);
      // "w" and "z" on their own join the next word: voiceless before p, t, k, s... ("w Polsce" -> f POL-stseh).
      if (snd.length === 1 && (w === 'w' || w === 'z')) {
        const first = ws[n + 1] ? sounds(ws[n + 1])[0] : null;
        snd = [{ c: first && first.c && VOICELESS.has(first.c) ? DEVOICE[SINGLE[w]] : SINGLE[w] }];
      }
      const syl = syllables(snd);
      const st = stressIndex(syl, w);
      en.push(syl.map((x, k) => { const t = enSyl(x); return k === st ? t.toUpperCase() : t; }).join('-'));
      ne.push(syl.map((x, k) => (k === st ? 'ˈ' : '') + neSyl(x)).join('-'));
    });
    return { pron: en.join(' '), proNe: ne.join(' ') };
  };

  // High-fidelity Polish syllable segmentation & penultimate stress markup
  const VOWEL_SET = new Set(['a', 'e', 'i', 'o', 'u', 'y', 'ó', 'ą', 'ę']);
  const isVChar = (c) => VOWEL_SET.has(c.toLowerCase());
  const DIGRAPHS = ['sz', 'cz', 'rz', 'ch', 'dz', 'dż', 'dź'];
  const ONSET_CLUSTERS = [
    'pr', 'br', 'tr', 'dr', 'kr', 'gr', 'pl', 'bl', 'kl', 'gl', 'fl', 'fr',
    'sp', 'st', 'sk', 'zb', 'zd', 'zg', 'ch', 'sz', 'cz', 'rz', 'dz', 'dż', 'dź',
    'śr', 'źr', 'kw', 'gw', 'wz', 'ws', 'wp', 'wt', 'wk'
  ];

  P.splitWord = (word) => {
    const clean = String(word || '').trim();
    if (!clean || clean.length <= 1) return [clean];
    const nuclei = [];
    let i = 0;
    while (i < clean.length) {
      const ch = clean[i].toLowerCase();
      const next = clean[i + 1] ? clean[i + 1].toLowerCase() : '';
      if ((ch === 'a' || ch === 'e') && next === 'u') {
        nuclei.push({ start: i, end: i + 2 });
        i += 2;
      } else if (ch === 'i' && i + 1 < clean.length && isVChar(clean[i + 1])) {
        nuclei.push({ start: i, end: i + 2 });
        i += 2;
      } else if (isVChar(ch)) {
        nuclei.push({ start: i, end: i + 1 });
        i++;
      } else {
        i++;
      }
    }
    if (nuclei.length <= 1) return [clean];
    const cuts = [];
    for (let k = 0; k < nuclei.length - 1; k++) {
      const n1 = nuclei[k];
      const n2 = nuclei[k + 1];
      const consSpan = clean.slice(n1.end, n2.start);
      const lower = consSpan.toLowerCase();
      if (consSpan.length <= 1 || DIGRAPHS.includes(lower) || ONSET_CLUSTERS.includes(lower)) {
        cuts.push(n1.end);
      } else {
        let cutOffset = 1;
        if (DIGRAPHS.includes(lower.slice(0, 2))) cutOffset = 2;
        cuts.push(n1.end + cutOffset);
      }
    }
    const syls = [];
    let prev = 0;
    for (const c of cuts) {
      syls.push(clean.slice(prev, c));
      prev = c;
    }
    syls.push(clean.slice(prev));
    return syls;
  };

  P.stressHTML = (text) => {
    if (!text) return '';
    return String(text).replace(/[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]+/g, (w) => {
      const syls = P.splitWord(w);
      if (syls.length <= 1) return S.highlight ? S.highlight(w) : w;
      let stIdx = syls.length - 2;
      if (syls.length >= 3 && /[iy]k[aię]$/i.test(w)) stIdx = syls.length - 3;
      return syls.map((s, idx) => {
        const highlighted = S.highlight ? S.highlight(s) : s;
        return idx === stIdx ? ('<strong class="syl-st" title="Stressed syllable">' + highlighted + '</strong>') : ('<span class="syl-un">' + highlighted + '</span>');
      }).join('<span class="syl-sep">·</span>');
    });
  };

// Consonant clusters reference & breakdown guide
  P.CLUSTERS = [
    { pl: 'prz', sound: 'psh', ipa: '/pʂ/', en: 'like English p + sh in "drop-ship"', ne: 'प + श (प्श)', example: 'przepraszam', exampleEn: 'excuse me' },
    { pl: 'trz', sound: 'tsh', ipa: '/tʂ/', en: 'like English t + sh in "cat-show"', ne: 'त + श (त्श)', example: 'trzeba', exampleEn: 'it is necessary' },
    { pl: 'strz', sound: 'stsh', ipa: '/stʂ/', en: 's + t + sh in "first shadow"', ne: 'स् + त् + श', example: 'ostrzeżenie', exampleEn: 'warning' },
    { pl: 'szcz', sound: 'sh-ch', ipa: '/ʂt͡ʂ/', en: 'hard sh + hard ch in "fresh cheese"', ne: 'श + कडा च (श् + च)', example: 'szczęście', exampleEn: 'happiness/luck' },
    { pl: 'ść', sound: 'sh-ch (soft)', ipa: '/ɕt͡ɕ/', en: 'soft sh + soft ch with a smile', ne: 'नरम श + नरम च (हल्का मुस्कानसहित)', example: 'cześć', exampleEn: 'hi/bye' },
    { pl: 'dźw', sound: 'j-v', ipa: '/d͡ʑv/', en: 'soft j + v in "jeep view"', ne: 'नरम ज + भ', example: 'dźwięk', exampleEn: 'sound' },
    { pl: 'chrz', sound: 'h-sh', ipa: '/xʂ/', en: 'throaty h + sh', ne: 'घाँटीबाट ह + श', example: 'chrzan', exampleEn: 'horseradish' }
  ];

  P.clusterGuideHTML = () => {
    return `<div class="cluster-guide-grid">
      ${P.CLUSTERS.map(c => `
        <div class="cluster-card">
          <div class="cluster-head">
            <button type="button" class="cluster-sound-btn" data-action="say" data-text="${c.example}" title="Listen to ${c.pl} sound in ${c.example}"><b class="cluster-pl" lang="pl">${c.pl}</b> 🔊</button>
            <span class="cluster-sound">[${c.sound}]</span>
            <span class="cluster-ipa">${c.ipa}</span>
          </div>
          <div class="cluster-hints">
            <div class="cluster-en"><b>EN:</b> ${c.en}</div>
            <div class="cluster-ne" lang="ne"><b>NE:</b> ${c.ne}</div>
          </div>
          <div class="cluster-example">
            <span class="cluster-ex-word" lang="pl">${c.example}</span>
            <span class="cluster-ex-trans">(– ${c.exampleEn})</span>
            ${S.listenBtn ? S.listenBtn(c.example) : ''}
          </div>
        </div>
      `).join('')}
    </div>`;
  };
})();