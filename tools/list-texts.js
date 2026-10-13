// Lists every Polish text the app can read aloud, with the voice to use.
// Output: JSON array of { text, voice } where voice is "f" (female) or "m" (male).
// Used by tools/gen-speech.py.   node tools/list-texts.js > texts.json
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const spoken = require('./spoken');
const ctx = { window: {} };
for (const f of fs.readdirSync(path.join(ROOT, 'data')).filter((x) => x.endsWith('.js')).sort()) {
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'), ctx);
}
const W = ctx.window;
const out = new Map();
const add = (text, voice = 'f') => {
  if (typeof text !== 'string') return;
  const t = text.trim();
  if (!t || t === '—' || t.length > 700 || !/[a-ząćęłńóśźż]/i.test(t)) return;
  if (!out.has(t)) out.set(t, voice);
};
// Speakers in a dialogue alternate between the two voices.
const voicer = (lines) => {
  const names = [...new Set(lines.map((l) => l[0]))];
  return (name) => (names.indexOf(name) % 2 ? 'm' : 'f');
};
// Polish marked *like this* anywhere in the data (same rule as S.polishBits in js/core.js):
// lesson text, tables, explanations, notes. Every bit can be tapped in the app.
const polishBits = (text) => {
  const out = [];
  String(text).replace(/(\S)\*\*\*/g, '$1*\u0001').replace(/\*\*\*(?=\S)/g, '\u0001*').replace(/\*\*/g, '\u0001')
    .replace(/\*([^*\u0001]+)\*/g, (_, t) => { if (/[a-ząćęłńóśźż]/i.test(t)) out.push(t); return ''; });
  return out;
};
// Each word of a reading text can be tapped and heard (same split as tokenize() in js/extras.js).
const words = (text) => text.split(/\s+/).forEach((part) => {
  const m = part.match(/^([„"«(]*)(.*?)([.,!?;:…"”»)]*)$/);
  const w = m ? m[2] : part;
  if (w && /\p{L}/u.test(w)) add(w);
});

(W.SLOWKA_ALPHABET || []).forEach((a) => { add(a.say); add(a.example); });
(W.SLOWKA_LETTER_PAIRS || []).forEach((a) => add(a.example));
(W.SLOWKA_COURSE || []).forEach((u) => {
  [...(u.words || []), ...(u.phrases || [])].forEach((e) => { add(e[0]); if (e[0].includes(' / ')) e[0].split(' / ').forEach((x) => add(x)); });
  const v = voicer(u.dialogue || []);
  (u.dialogue || []).forEach((d) => add(d[1], v(d[0])));
});
// Same as S.drillSentence / S.drillSpeech in js/core.js.
const drillSentence = (d) => (d.type === 'order' ? d.words.join(' ') : d.type === 'choose' ? d.q.replace('___', d.options[d.answer]) : d.q.replace(/\s*\([^)]*\)\s*$/, '').replace('___', d.answer[0]));
const drillSpeech = (d) => d.say || drillSentence(d).split(' — ')[0].replace(/\([^)]*\)/g, ' ').replace(/\s+([,.!?;:])/g, '$1').replace(/\s+/g, ' ').trim();
Object.values(W.SLOWKA_DRILLS || {}).forEach((list) => list.forEach((d) => add(drillSpeech(d))));
(W.SLOWKA_ROLEPLAYS || []).forEach((r) => {
  r.steps.forEach((s) => { add(s.them[0], 'm'); s.replies.forEach((x) => add(x.pl, 'f')); });
  (r.useful || []).forEach((e) => add(e[0]));
});
(W.SLOWKA_STORIES || []).forEach((s) => {
  s.paragraphs.forEach((p) => { add(p.pl); words(p.pl); });
  (s.glossary || []).forEach((e) => add(e[0]));
});
(W.SLOWKA_LISTENING || []).forEach((t) => { const v = voicer(t.lines); t.lines.forEach((l) => add(l[1], v(l[0]))); });
(W.SLOWKA_EXAMS || []).forEach((x) => x.sections.forEach((s) => {
  (s.items || []).forEach((q) => { if (q.audio) add(q.audio); });
  if (s.text && s.text.pl) words(s.text.pl);
  (s.tasks || []).forEach((t) => add(t.model && t.model.pl));
}));
(W.SLOWKA_VERBS || []).forEach((v) => {
  [v.inf, ...(v.present || []), ...v.past.m, ...v.past.f, ...v.future, v.imperative.ty, v.imperative.my, v.imperative.wy].forEach((f) => add(f, 'm'));
});
(W.SLOWKA_NOUNS || []).forEach((n) => [n.sg, n.pl].filter(Boolean).forEach((t) => Object.values(t).forEach((f) => add(f, 'm'))));
// Case trainer: every sentence it can build (same rules as newCaseQuestion() in js/trainers.js).
(W.SLOWKA_CASE_FRAMES || []).forEach((f) => (W.SLOWKA_NOUNS || []).forEach((n) => {
  if (f.number === 'pl' && !n.pl) return;
  if ((f.who === 'person' && !n.person) || (f.who === 'thing' && n.person)) return;
  if (n.abstract && f.case !== 'loc') return;
  const a = n[f.number][f.case];
  if (a && a !== '—') add(f.q.replace('___', a));
}));
// Numbers trainer: the example numbers and every number word from 0 to 100, hundreds and thousands.
{
  const nctx = { window: { Slowka: { esc: (x) => x, polish: (x) => x } } };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js', 'numbers.js'), 'utf8'), nctx);
  const N = nctx.window.Slowka.Numbers;
  if (N && N.words) {
    const ns = [...Array(101).keys(), 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 5000, 10000];
    ns.forEach((x) => add(N.words(x), 'm'));
  } else process.stderr.write('numbers.js: words() not found, skipped\n');
}
(W.SLOWKA_SOUNDS || []).forEach((x) => x.pairs.forEach((p) => p.forEach((w) => add(w[0]))));

// Every *marked* Polish bit in every data file.
const walk = (v) => {
  if (typeof v === 'string') polishBits(v).forEach((t) => { if (t.length <= 160) add(t); });
  else if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === 'object') Object.values(v).forEach(walk);
};
Object.values(W).forEach(walk);

// "say" is how the text is read aloud when that differs from the spelling (numbers, dates, abbreviations).
process.stdout.write(JSON.stringify([...out].map(([text, voice]) => {
  const say = spoken(text);
  return say === text ? { text, voice } : { text, voice, say };
}), null, 0));
