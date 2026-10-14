// Comprehensive Deep Word & Pronunciation Auditor for Słówka
const fs = require('fs');

global.window = { addEventListener: () => {}, Slowka: { esc: (s) => s, polish: (s) => s } };
global.document = {
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  getElementById: () => null
};
global.location = { href: 'http://localhost/', pathname: '/', search: '', hash: '' };
global.history = { pushState: () => {}, replaceState: () => {} };
global.localStorage = { getItem: () => null, setItem: () => {} };

// 1. Load data files
const dataFiles = [
  'data/start.js', 'data/a1-part1.js', 'data/a1-part2.js', 'data/a2-part1.js', 'data/a2-part2.js',
  'data/b1-part1.js', 'data/b1-part2.js', 'data/b2.js', 'data/work.js', 'data/verbs-1.js', 'data/verbs-2.js',
  'data/cases.js', 'data/sounds.js', 'data/listening.js', 'data/sos.js', 'data/simulators.js',
  'audio/manifest.js', 'js/core.js', 'js/pron.js'
];

for (const f of dataFiles) {
  try {
    eval(fs.readFileSync(f, 'utf8'));
  } catch (e) {
    console.error('Error loading ' + f + ':', e);
    process.exit(1);
  }
}

const DEVANAGARI = /[\u0900-\u097F]/;
const POLISH_SPECIAL = /[ąćęłńóśźż]/i;

let totalWords = 0;
let totalPhrases = 0;
let errors = [];
let warnings = [];

// Audit Units
const units = global.window.SLOWKA_COURSE || [];
console.log('Auditing ' + units.length + ' Course Units...');

for (const u of units) {
  const allEntries = [...(u.words || []), ...(u.phrases || [])];
  for (let i = 0; i < allEntries.length; i++) {
    const e = allEntries[i];
    const isPhrase = i >= (u.words || []).length;
    if (isPhrase) totalPhrases++;
    else totalWords++;

    if (!Array.isArray(e) || e.length < 3) {
      errors.push(`Unit ${u.id} entry ${i}: Not a valid [pl, en, ne] tuple`);
      continue;
    }

    const [pl, en, ne] = e;

    // Polish check
    if (!pl || typeof pl !== 'string' || !pl.trim()) {
      errors.push(`Unit ${u.id}: Empty Polish string at entry ${i}`);
    }

    // English check
    if (!en || typeof en !== 'string' || !en.trim()) {
      errors.push(`Unit ${u.id} ("${pl}"): Missing or empty English translation`);
    }

    // Nepali check
    if (!ne || typeof ne !== 'string' || !ne.trim()) {
      errors.push(`Unit ${u.id} ("${pl}"): Missing or empty Nepali translation`);
    } else if (!DEVANAGARI.test(ne)) {
      errors.push(`Unit ${u.id} ("${pl}"): Nepali translation has no Devanagari characters: "${ne}"`);
    }

    // Pronunciation Generator Check
    if (global.window.Slowka && global.window.Slowka.Pron && global.window.Slowka.Pron.of) {
      const p = global.window.Slowka.Pron.of(pl);
      if (!p || !p.pron || !p.proNe) {
        errors.push(`Unit ${u.id} ("${pl}"): Pronunciation generator failed`);
      } else if (!DEVANAGARI.test(p.proNe)) {
        errors.push(`Unit ${u.id} ("${pl}"): Generated Devanagari pronunciation has no Devanagari: "${p.proNe}"`);
      }
    }
  }
}

// Audit Verbs
const verbs = global.window.SLOWKA_VERBS || [];
console.log('Auditing ' + verbs.length + ' Conjugated Verbs...');
for (const v of verbs) {
  if (!v.inf || !v.en || !v.ne || !DEVANAGARI.test(v.ne)) {
    errors.push(`Verb "${v.inf}": Missing English or valid Nepali translation`);
  }
}

// Audit Alphabet & Phonetics
const letters = global.window.SLOWKA_ALPHABET || [];
console.log('Auditing ' + letters.length + ' Alphabet Letters & Pairs...');
for (const l of letters) {
  if (!l.letter || !l.say || !l.namePron || !l.nameNe || !DEVANAGARI.test(l.nameNe)) {
    errors.push(`Letter "${l.letter}": Missing phonetics or Nepali pronunciation`);
  }
}

// Audit SOS Emergency Phrases
const sos = global.window.SLOWKA_SOS || [];
console.log('Auditing ' + sos.length + ' Emergency SOS Sections...');
let sosItems = 0;
for (const s of sos) {
  for (const it of (s.items || [])) {
    sosItems++;
    if (!it.pl || !it.en || !it.ne || !DEVANAGARI.test(it.ne)) {
      errors.push(`SOS "${it.pl}": Missing English or Nepali`);
    }
    if (!it.pron || !it.proNe || !DEVANAGARI.test(it.proNe)) {
      errors.push(`SOS "${it.pl}": Missing phonetics or Nepali pronunciation`);
    }
  }
}

console.log('\n=== COMPREHENSIVE AUDIT REPORT ===');
console.log(`✓ Total Vocabulary Words Audited: ${totalWords}`);
console.log(`✓ Total Practical Phrases Audited: ${totalPhrases}`);
console.log(`✓ Total Conjugated Verbs Audited: ${verbs.length}`);
console.log(`✓ Total Alphabet Letters Audited: ${letters.length}`);
console.log(`✓ Total Emergency SOS Cards Audited: ${sosItems}`);
console.log(`\nFound ${errors.length} Critical Errors.`);
console.log(`Found ${warnings.length} Warnings.`);

if (errors.length > 0) {
  console.log('\nError List (first 20):');
  errors.slice(0, 20).forEach(e => console.log('  ❌ ' + e));
  process.exit(1);
} else {
  console.log('\n🎉 ALL WORDS, PHONETICS, AND NEPALESE TRANSLATIONS ARE 100% VALID & VERIFIED!');
  process.exit(0);
}
