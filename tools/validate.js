// Checks course data files: node tools/validate.js [data/file.js ...]
// With no arguments it checks every file in data/.
// Formats: tools/CONTENT_GUIDE.md (units) and tools/PRACTICE_GUIDE.md (drills, role-plays, stories, exams).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = path.join(__dirname, '..', 'data');
const args = process.argv.slice(2);
const files = args.length
  ? args
  : fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort().map((f) => path.join(dir, f));

const UNIT_LEVELS = ['Start', 'A1', 'A2', 'B1', 'B2', 'Work'];
const CEFR = ['A1', 'A2', 'B1', 'B2'];
const DEVANAGARI = /[ऀ-ॿ]/;
let errors = 0;
const fail = (where, msg) => { errors++; console.log(`✗ ${where}: ${msg}`); };
const str = (x) => typeof x === 'string' && x.trim().length > 0;
const ne = (x) => str(x) && DEVANAGARI.test(x);

// Load every data file into one shared window, so drills can be checked against unit ids.
const shared = { window: {} };
const perFile = [];
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort().map((f) => path.join(dir, f))) {
  try { vm.runInNewContext(fs.readFileSync(file, 'utf8'), shared, { filename: file }); } catch (e) { /* reported below */ }
}
const knownUnits = new Set((shared.window.SLOWKA_COURSE || []).map((u) => u.id));

const six = (x) => Array.isArray(x) && x.length === 6 && x.every(str);
const seenVerbs = new Set();
const CASE_KEYS = ['nom', 'gen', 'dat', 'acc', 'ins', 'loc', 'voc'];
const seenNouns = new Set();
const MOUTHS = ['retro', 'palatal', 'dental', 'back', 'nasal', 'front-vowel', 'mid-vowel', 'round'];
const S_clean = (x) => String(x).toLowerCase().replace(/[?!.,…:;]/g, ' ').replace(/\s+/g, ' ').trim();
const seenIds = new Set();
function uniqueId(at, id, pattern, example) {
  if (!pattern.test(id || '')) fail(at, `id must look like "${example}"`);
  if (seenIds.has(id)) fail(at, `duplicate id ${id}`);
  seenIds.add(id);
}
function bilingual(at, obj, key) {
  if (!obj || !str(obj.en) || !ne(obj.ne)) fail(at, `${key} needs en and Nepali ne`);
}
function checkEntry(where, e) {
  if (!Array.isArray(e) || e.length !== 5 || e.some((x) => !str(x))) { fail(where, 'must be [pl, en, ne, pron, proNe] with no empty fields'); return; }
  if (!DEVANAGARI.test(e[2])) fail(where, 'Nepali meaning must be in Devanagari');
  if (!DEVANAGARI.test(e[4])) fail(where, 'Devanagari pronunciation missing');
  if (DEVANAGARI.test(e[3])) fail(where, 'English pronunciation contains Devanagari');
  if (e[3].includes('-') && !/[A-Z]/.test(e[3])) fail(where, 'English pronunciation should mark the stressed syllable in CAPS');
}
function checkEntries(at, key, list, min) {
  if (!Array.isArray(list) || list.length < min) { fail(at, `${key} needs at least ${min} entries`); return; }
  list.forEach((e, i) => checkEntry(`${at} ${key}[${i}] ${Array.isArray(e) ? e[0] : ''}`, e));
}
function checkOptions(at, item) {
  if (!Array.isArray(item.options) || item.options.length < 2 || item.options.some((o) => !str(o))) fail(at, 'options must be 2+ non-empty strings');
  else if (new Set(item.options).size !== item.options.length) fail(at, 'options repeat');
  if (!Number.isInteger(item.answer) || !item.options || item.answer < 0 || item.answer >= item.options.length) fail(at, 'answer must be a valid option index');
}

for (const file of files) {
  const ctx = { window: {} };
  try {
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
  } catch (e) { fail(file, `does not run: ${e.message}`); continue; }
  const w = ctx.window;
  const name = path.basename(file);
  const counts = [];

  if (w.SLOWKA_ALPHABET) { checkAlphabet(name, w.SLOWKA_ALPHABET); counts.push(`${w.SLOWKA_ALPHABET.length} letters`); }
  if (w.SLOWKA_LETTER_PAIRS) {
    w.SLOWKA_LETTER_PAIRS.forEach((l, i) => { for (const k of ['letters', 'soundEn', 'soundNe', 'example', 'exampleEn', 'exampleNe', 'pron', 'proNe']) if (!str(l[k])) fail(name, `letter pair ${i} missing ${k}`); });
    counts.push(`${w.SLOWKA_LETTER_PAIRS.length} letter pairs`);
  }
  if (w.SLOWKA_COURSE) { w.SLOWKA_COURSE.forEach((u) => checkUnit(name, u)); counts.push(`${w.SLOWKA_COURSE.length} units, ${w.SLOWKA_COURSE.reduce((n, u) => n + (u.words || []).length + (u.phrases || []).length, 0)} entries`); }
  if (w.SLOWKA_DRILLS) {
    const ids = Object.keys(w.SLOWKA_DRILLS);
    ids.forEach((id) => checkDrills(`${name} drills ${id}`, id, w.SLOWKA_DRILLS[id]));
    counts.push(`drills for ${ids.length} units, ${ids.reduce((n, id) => n + (w.SLOWKA_DRILLS[id] || []).length, 0)} items`);
  }
  if (w.SLOWKA_ROLEPLAYS) { w.SLOWKA_ROLEPLAYS.forEach((r) => checkRoleplay(name, r)); counts.push(`${w.SLOWKA_ROLEPLAYS.length} role-plays`); }
  if (w.SLOWKA_STORIES) { w.SLOWKA_STORIES.forEach((s) => checkStory(name, s)); counts.push(`${w.SLOWKA_STORIES.length} texts`); }
  if (w.SLOWKA_PLACEMENT) { checkPlacement(name, w.SLOWKA_PLACEMENT); counts.push(`${w.SLOWKA_PLACEMENT.length} placement questions`); }
  if (w.SLOWKA_EXAMS) { w.SLOWKA_EXAMS.forEach((x) => checkExam(name, x)); counts.push(`${w.SLOWKA_EXAMS.length} exams`); }
  if (w.SLOWKA_VERBS) { w.SLOWKA_VERBS.forEach((v) => checkVerb(name, v)); counts.push(`${w.SLOWKA_VERBS.length} verbs`); }
  if (w.SLOWKA_CASES) { checkCases(name, w.SLOWKA_CASES); counts.push('case guide'); }
  if (w.SLOWKA_NOUNS) { w.SLOWKA_NOUNS.forEach((n) => checkNoun(name, n)); counts.push(`${w.SLOWKA_NOUNS.length} nouns`); }
  if (w.SLOWKA_CASE_FRAMES) { w.SLOWKA_CASE_FRAMES.forEach((f, i) => checkFrame(`${name} frames[${i}]`, f)); counts.push(`${w.SLOWKA_CASE_FRAMES.length} case frames`); }
  if (w.SLOWKA_LISTENING) { w.SLOWKA_LISTENING.forEach((x) => checkListening(name, x)); counts.push(`${w.SLOWKA_LISTENING.length} listening tasks`); }
  if (w.SLOWKA_SOUNDS) { w.SLOWKA_SOUNDS.forEach((x) => checkSound(name, x)); counts.push(`${w.SLOWKA_SOUNDS.length} sound groups`); }
  if (w.SLOWKA_READING_GLOSS) counts.push(`${Object.keys(w.SLOWKA_READING_GLOSS).length} reading words`);
  if (w.SLOWKA_SOS) {
    w.SLOWKA_SOS.forEach((c) => {
      if (!c.id || !c.category || !c.categoryNe || !Array.isArray(c.items)) fail(name, 'SOS category missing required fields');
      c.items.forEach((it) => {
        if (!it.pl || !it.en || !it.ne) fail(name, 'SOS item missing pl/en/ne');
        if (!DEVANAGARI.test(it.ne)) fail(name, 'SOS item Nepali must contain Devanagari');
      });
    });
    counts.push(`${w.SLOWKA_SOS.length} emergency SOS sections`);
  }
  if (w.SLOWKA_SIMULATORS) {
    w.SLOWKA_SIMULATORS.forEach((s) => {
      if (!s.id || !s.title || !s.titleNe || !Array.isArray(s.steps)) fail(name, 'Simulator missing required fields');
      s.steps.forEach((st) => {
        if (!st.speaker || !st.pl || !st.en || !st.ne || !Array.isArray(st.options)) fail(name, 'Simulator step missing fields');
        if (!DEVANAGARI.test(st.ne)) fail(name, 'Simulator step Nepali must contain Devanagari');
      });
    });
    counts.push(`${w.SLOWKA_SIMULATORS.length} everyday simulators`);
  }
  if (w.SLOWKA_POLAND_GUIDE) {
    w.SLOWKA_POLAND_GUIDE.forEach((c) => {
      if (!c.id || !c.title || !c.titleNe || !Array.isArray(c.items)) fail(name, `guide category missing required fields`);
      c.items.forEach((it) => {
        if (!it.pl || !it.en || !it.ne) fail(name, `guide item missing pl/en/ne`);
        if (!DEVANAGARI.test(it.ne)) fail(name, `guide item Nepali meaning must contain Devanagari`);
      });
    });
    counts.push(`${w.SLOWKA_POLAND_GUIDE.length} practical guide sections`);
  }
  if (!counts.length) fail(name, 'defines no known content');
  perFile.push(`${name}: ${counts.join(', ')}`);
}

function checkUnit(file, u) {
  const at = `${file} ${u.id || '(no id)'}`;
  uniqueId(at, u.id, /^[a-z0-9]+-\d{2}$/, 'a1-03');
  if (!UNIT_LEVELS.includes(u.level)) fail(at, `level must be one of ${UNIT_LEVELS.join(', ')}`);
  for (const k of ['title', 'titleNe', 'summary', 'summaryNe']) if (!str(u[k])) fail(at, `missing ${k}`);
  if (u.titleNe && !DEVANAGARI.test(u.titleNe)) fail(at, 'titleNe must be in Devanagari');
  if (!Array.isArray(u.lesson) || u.lesson.length < 2) fail(at, 'lesson needs at least 2 paragraphs');
  (u.lesson || []).forEach((p, i) => bilingual(at, p, `lesson[${i}]`));
  (u.tables || []).forEach((t, i) => {
    if (!t.title || !Array.isArray(t.head) || !Array.isArray(t.rows)) fail(at, `tables[${i}] needs title, head, rows`);
    else t.rows.forEach((r, j) => { if (!Array.isArray(r) || r.length !== t.head.length) fail(at, `tables[${i}].rows[${j}] has ${r && r.length} cells, head has ${t.head.length}`); });
  });
  checkEntries(at, 'words', u.words, 8);
  checkEntries(at, 'phrases', u.phrases, 3);
  (u.dialogue || []).forEach((d, i) => {
    if (!Array.isArray(d) || d.length !== 4 || d.some((x) => !str(x))) fail(at, `dialogue[${i}] must be [speaker, pl, en, ne]`);
    else if (!DEVANAGARI.test(d[3])) fail(at, `dialogue[${i}] Nepali must be in Devanagari`);
  });
}

function checkDrills(at, unitId, items) {
  if (!knownUnits.has(unitId)) fail(at, `no course unit with id ${unitId}`);
  if (!Array.isArray(items) || items.length < 8) { fail(at, 'needs at least 8 items'); return; }
  items.forEach((d, i) => {
    const where = `${at}[${i}]`;
    if (!str(d.en) || !ne(d.ne)) fail(where, 'needs en and Nepali ne translation');
    if (d.type === 'choose' || d.type === 'fill') {
      if (!str(d.q) || d.q.split('___').length !== 2) fail(where, 'q must contain exactly one ___');
      bilingual(where, d.why, 'why');
    }
    if (d.type === 'choose') checkOptions(where, d);
    else if (d.type === 'fill') {
      if (!Array.isArray(d.answer) || !d.answer.length || d.answer.some((a) => !str(a))) fail(where, 'answer must be a list of accepted strings');
      Object.entries(d.traps || {}).forEach(([k, v]) => { if (!str(k)) fail(where, 'empty trap key'); bilingual(where, v, `traps.${k}`); });
      if (d.traps && d.answer && Object.keys(d.traps).some((k) => d.answer.includes(k))) fail(where, 'a trap repeats a correct answer');
    } else if (d.type === 'order') {
      if (!Array.isArray(d.words) || d.words.length < 3 || d.words.length > 9 || d.words.some((x) => !str(x) || /\s/.test(x.trim()))) fail(where, 'words must be 3–9 single tokens');
      if (d.why) bilingual(where, d.why, 'why');
      const key = (x) => S_clean(x).split(' ').sort().join(' ');
      (d.alts || []).forEach((a, k) => { if (!str(a) || key(a) !== key(d.words.join(' '))) fail(where, `alts[${k}] must use exactly the same words`); });
    } else fail(where, 'type must be choose, fill or order');
  });
}

function checkRoleplay(file, r) {
  const at = `${file} ${r.id || '(no id)'}`;
  uniqueId(at, r.id, /^rp-(a1|a2|b1|b2)-[a-z0-9-]+$/, 'rp-a1-cafe');
  if (!CEFR.includes(r.level)) fail(at, 'level must be A1, A2, B1 or B2');
  if (!str(r.title) || !ne(r.titleNe)) fail(at, 'needs title and Nepali titleNe');
  bilingual(at, r.scene, 'scene');
  bilingual(at, r.end, 'end');
  if (!str(r.them) || !str(r.themEn) || !ne(r.themNe)) fail(at, 'needs them, themEn, themNe');
  if (!Array.isArray(r.steps) || r.steps.length < 5) { fail(at, 'needs at least 5 steps'); return; }
  r.steps.forEach((s, i) => {
    const where = `${at} steps[${i}]`;
    if (!Array.isArray(s.them) || s.them.length !== 3 || s.them.some((x) => !str(x)) || !DEVANAGARI.test(s.them[2])) fail(where, 'them must be [pl, en, ne]');
    if (!Array.isArray(s.replies) || s.replies.length !== 3) { fail(where, 'needs exactly 3 replies'); return; }
    const good = s.replies.filter((x) => x.ok === true).length;
    if (good < 1 || good > 2) fail(where, '1 or 2 replies must have ok: true');
    s.replies.forEach((x, j) => {
      if (!str(x.pl) || !str(x.en) || !ne(x.ne)) fail(`${where} replies[${j}]`, 'needs pl, en and Nepali ne');
      if (x.ok !== true) { if (x.ok !== false) fail(`${where} replies[${j}]`, 'ok must be true or false'); bilingual(`${where} replies[${j}]`, x.why, 'why'); }
    });
  });
  checkEntries(at, 'useful', r.useful, 4);
}

function checkStory(file, s) {
  const at = `${file} ${s.id || '(no id)'}`;
  uniqueId(at, s.id, /^st-(a1|a2|b1|b2)-\d{2}$/, 'st-a1-01');
  if (!CEFR.includes(s.level)) fail(at, 'level must be A1, A2, B1 or B2');
  if (!['story', 'message', 'notice', 'document', 'article', 'email'].includes(s.kind)) fail(at, 'unknown kind');
  if (!str(s.title) || !ne(s.titleNe)) fail(at, 'needs title and Nepali titleNe');
  if (!Array.isArray(s.paragraphs) || s.paragraphs.length < 2) fail(at, 'needs at least 2 paragraphs');
  (s.paragraphs || []).forEach((p, i) => { if (!str(p.pl)) fail(at, `paragraphs[${i}] needs pl`); bilingual(at, p, `paragraphs[${i}]`); });
  checkEntries(at, 'glossary', s.glossary, 8);
  if (!Array.isArray(s.questions) || s.questions.length < 3) fail(at, 'needs at least 3 questions');
  (s.questions || []).forEach((q, i) => {
    const where = `${at} questions[${i}]`;
    if (!str(q.q) || !str(q.en) || !ne(q.ne)) fail(where, 'needs q, en and Nepali ne');
    checkOptions(where, q);
    bilingual(where, q.why, 'why');
  });
}

function checkPlacement(file, items) {
  if (!Array.isArray(items) || items.length !== 30) fail(file, 'SLOWKA_PLACEMENT needs exactly 30 items');
  (items || []).forEach((q, i) => {
    const where = `${file} placement[${i}]`;
    if (!CEFR.includes(q.level)) fail(where, 'level must be A1, A2, B1 or B2');
    if (!str(q.q) || !str(q.en) || !ne(q.ne)) fail(where, 'needs q, en and Nepali ne');
    checkOptions(where, q);
  });
}

function checkExam(file, x) {
  const at = `${file} ${x.id || '(no id)'}`;
  uniqueId(at, x.id, /^[a-z0-9]+-practice-\d+$/, 'b1-practice-1');
  if (!str(x.title) || !ne(x.titleNe)) fail(at, 'needs title and Nepali titleNe');
  bilingual(at, x.intro, 'intro');
  const kinds = (x.sections || []).map((s) => s.kind);
  for (const k of ['listening', 'reading', 'grammar', 'writing']) if (!kinds.includes(k)) fail(at, `missing ${k} section`);
  (x.sections || []).forEach((s) => {
    const where = `${at} ${s.kind}`;
    if (!str(s.title) || !ne(s.titleNe)) fail(where, 'needs title and Nepali titleNe');
    if (s.kind === 'writing') {
      if (!Array.isArray(s.tasks) || !s.tasks.length) { fail(where, 'needs tasks'); return; }
      s.tasks.forEach((t, i) => {
        const w2 = `${where} tasks[${i}]`;
        if (!t.prompt || !str(t.prompt.pl)) fail(w2, 'prompt needs pl');
        bilingual(w2, t.prompt, 'prompt');
        if (!t.model || !str(t.model.pl)) fail(w2, 'model needs pl');
        bilingual(w2, t.model, 'model');
        if (!Array.isArray(t.checklist) || t.checklist.length < 3) fail(w2, 'checklist needs 3+ points');
        (t.checklist || []).forEach((c, j) => bilingual(w2, c, `checklist[${j}]`));
      });
      return;
    }
    if (s.kind === 'reading') { if (!s.text || !str(s.text.pl)) fail(where, 'text needs pl'); bilingual(where, s.text, 'text'); }
    if (!Array.isArray(s.items) || s.items.length < 3) { fail(where, 'needs at least 3 items'); return; }
    s.items.forEach((q, i) => {
      const w2 = `${where}[${i}]`;
      if (s.kind === 'listening') { if (!str(q.audio)) fail(w2, 'needs audio text'); bilingual(w2, q, 'translation'); }
      if (s.kind === 'grammar') { if (!str(q.q) || q.q.split('___').length !== 2) fail(w2, 'q must contain exactly one ___'); bilingual(w2, q, 'translation'); }
      if (s.kind !== 'grammar' && (!str(q.q) || !str(q.qEn) || !ne(q.qNe))) fail(w2, 'needs q, qEn, qNe');
      checkOptions(w2, q);
      bilingual(w2, q.why, 'why');
    });
  });
}

function checkVerb(file, v) {
  const at = `${file} verb ${v.inf || '(no inf)'}`;
  if (!str(v.inf) || !str(v.en) || !ne(v.ne)) fail(at, 'needs inf, en, Nepali ne');
  if (seenVerbs.has(v.inf)) fail(at, 'duplicate verb');
  seenVerbs.add(v.inf);
  if (!CEFR.includes(v.level)) fail(at, 'level must be A1, A2, B1 or B2');
  if (!['impf', 'pf'].includes(v.aspect)) fail(at, 'aspect must be impf or pf');
  if (typeof v.pair !== 'string') fail(at, 'pair must be a string ("" if none)');
  if (!str(v.group)) fail(at, 'needs group');
  if (v.aspect === 'impf' ? !six(v.present) : v.present !== null) fail(at, v.aspect === 'impf' ? 'present needs 6 forms' : 'perfective present must be null');
  if (!v.past || !six(v.past.m) || !six(v.past.f)) fail(at, 'past needs m and f with 6 forms each');
  if (!six(v.future)) fail(at, 'future needs 6 forms');
  if (!v.imperative || !str(v.imperative.ty) || !str(v.imperative.my) || !str(v.imperative.wy)) fail(at, 'imperative needs ty, my, wy');
  if (v.note) bilingual(at, v.note, 'note');
  const all = [v.inf, ...(v.present || []), ...(v.past ? [...(v.past.m || []), ...(v.past.f || [])] : []), ...(v.future || [])];
  if (all.some((f) => typeof f === 'string' && f !== f.toLowerCase())) fail(at, 'forms must be lowercase');
}
function checkCases(file, c) {
  CASE_KEYS.forEach((k) => {
    const x = c[k];
    if (!x || !str(x.name) || !str(x.pl) || !ne(x.ne) || !str(x.q)) fail(`${file} cases.${k}`, 'needs name, pl, Nepali ne, q');
    else bilingual(`${file} cases.${k}`, x.use, 'use');
  });
}
function checkNoun(file, n) {
  const at = `${file} noun ${n.word || '(no word)'}`;
  if (!str(n.word) || !str(n.en) || !ne(n.ne)) fail(at, 'needs word, en, Nepali ne');
  if (seenNouns.has(n.word)) fail(at, 'duplicate noun');
  seenNouns.add(n.word);
  if (!CEFR.includes(n.level)) fail(at, 'level must be A1, A2, B1 or B2');
  if (!['m-pers', 'm-anim', 'm-inan', 'f', 'n'].includes(n.gender)) fail(at, 'bad gender');
  if (typeof n.person !== 'boolean') fail(at, 'person must be true or false');
  const table = (t, key) => { if (!t || CASE_KEYS.some((k) => !str(t[k]))) fail(at, `${key} needs all 7 cases`); };
  table(n.sg, 'sg');
  if (n.pl !== null) table(n.pl, 'pl');
  if (n.sg && n.sg.nom !== n.word) fail(at, 'sg.nom must equal word');
}
function checkFrame(at, f) {
  if (!CASE_KEYS.slice(1).includes(f.case)) fail(at, 'case must be gen, dat, acc, ins, loc or voc');
  if (!['sg', 'pl'].includes(f.number)) fail(at, 'number must be sg or pl');
  if (!['any', 'person', 'thing'].includes(f.who)) fail(at, 'who must be any, person or thing');
  if (!str(f.q) || f.q.split('___').length !== 2) fail(at, 'q must contain exactly one ___');
  if (!str(f.en) || !ne(f.ne)) fail(at, 'needs en and Nepali ne');
}
function checkSound(file, x) {
  const at = `${file} sound ${x.id || '(no id)'}`;
  uniqueId(at, x.id, /^[a-z0-9-]+$/, 'sz-s');
  if (!str(x.title) || !ne(x.titleNe)) fail(at, 'needs title and Nepali titleNe');
  for (const k of ['a', 'b']) if (!x[k] || !str(x[k].label) || !MOUTHS.includes(x[k].mouth)) fail(at, `${k} needs label and a known mouth`);
  bilingual(at, x.tip, 'tip');
  if (!Array.isArray(x.pairs) || x.pairs.length < 5) fail(at, 'needs at least 5 pairs');
  (x.pairs || []).forEach((p, i) => {
    if (!Array.isArray(p) || p.length !== 2 || p.some((w) => !Array.isArray(w) || w.length !== 3 || !str(w[0]) || !str(w[1]) || !ne(w[2]))) fail(at, `pairs[${i}] must be [[pl, en, ne], [pl, en, ne]]`);
  });
}

function checkListening(file, x) {
  const at = `${file} ${x.id || '(no id)'}`;
  uniqueId(at, x.id, /^ls-(a1|a2|b1|b2)-\d{2}$/, 'ls-a1-01');
  if (!CEFR.includes(x.level)) fail(at, 'level must be A1, A2, B1 or B2');
  if (!['phone', 'voicemail', 'announcement', 'conversation', 'radio'].includes(x.type)) fail(at, 'unknown type');
  if (!str(x.title) || !ne(x.titleNe)) fail(at, 'needs title and Nepali titleNe');
  bilingual(at, x.context, 'context');
  if (!Array.isArray(x.lines) || x.lines.length < 2) fail(at, 'needs at least 2 lines');
  (x.lines || []).forEach((l, i) => { if (!Array.isArray(l) || l.length !== 4 || l.some((v) => !str(v)) || !DEVANAGARI.test(l[3])) fail(at, `lines[${i}] must be [speaker, pl, en, ne]`); else if (/\d/.test(l[1])) fail(at, `lines[${i}] has digits; write numbers as words`); });
  if (!Array.isArray(x.questions) || x.questions.length < 3) fail(at, 'needs at least 3 questions');
  (x.questions || []).forEach((q, i) => { const w2 = `${at} questions[${i}]`; if (!str(q.q) || !str(q.en) || !ne(q.ne)) fail(w2, 'needs q, en, Nepali ne'); checkOptions(w2, q); bilingual(w2, q.why, 'why'); });
}

function checkAlphabet(file, letters) {
  if (!Array.isArray(letters) || letters.length < 32) fail(file, `SLOWKA_ALPHABET needs all 32 letters, has ${letters && letters.length}`);
  (letters || []).forEach((l, i) => {
    for (const k of ['letter', 'say', 'namePron', 'nameNe', 'soundEn', 'soundNe', 'example', 'exampleEn', 'exampleNe', 'pron', 'proNe']) if (!str(l[k])) fail(file, `alphabet[${i}] missing ${k}`);
  });
}

perFile.forEach((line) => console.log(line));
// Every word in a reading text must have a meaning when tapped (lesson word, glossary or reading glossary).
{
  const W = shared.window;
  const clean = (x) => String(x).toLowerCase().replace(/[?!.,…¿¡:;"„”«»()–—]/g, ' ').replace(/\s+/g, ' ').trim();
  const key = (x) => clean(x).replace(/\s/g, '');
  const known = new Set();
  const addE = (e) => { if (!/\s/.test(String(e[0]).trim())) known.add(key(e[0])); };
  (W.SLOWKA_COURSE || []).forEach((u) => [...(u.words || []), ...(u.phrases || [])].forEach(addE));
  (W.SLOWKA_ROLEPLAYS || []).forEach((r) => (r.useful || []).forEach(addE));
  (W.SLOWKA_STORIES || []).forEach((st) => (st.glossary || []).forEach(addE));
  Object.entries(W.SLOWKA_READING_GLOSS || {}).forEach(([k, v]) => {
    if (!Array.isArray(v) || v.length !== 3 || !v.every(str) || !ne(v[1])) fail('reading-gloss', `"${k}" needs [English, Nepali, dictionary form]`);
    known.add(key(k));
  });
  const texts = [];
  (W.SLOWKA_STORIES || []).forEach((st) => st.paragraphs.forEach((p) => texts.push([st.id, p.pl])));
  (W.SLOWKA_EXAMS || []).forEach((x) => x.sections.forEach((sec) => { if (sec.text && sec.text.pl) texts.push([x.id, sec.text.pl]); }));
  const missing = new Map();
  for (const [id, text] of texts) {
    text.split(/\s+/).forEach((part) => {
      const m = part.match(/^([„"«(]*)(.*?)([.,!?;:…"”»)]*)$/);
      const w = m ? m[2] : part;
      if (w && /\p{L}/u.test(w) && !known.has(key(w))) missing.set(w, id);
    });
  }
  for (const [w, id] of missing) fail(id, `reading word "${w}" has no meaning: add it to data/reading-gloss.js or the text's glossary`);
  console.log(`reading glossary: ${Object.keys(W.SLOWKA_READING_GLOSS || {}).length} words, every reading word covered`);
}

console.log(errors ? `\n${errors} problem(s) found` : '\nAll good');
process.exit(errors ? 1 : 0);
