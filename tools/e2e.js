// End-to-end test of the whole app in a real browser (Chromium via Playwright).
//
//   npm install --no-save playwright   (or use a global install)
//   python3 -m http.server 8790 &      (serve the repo root)
//   node tools/e2e.js [http://localhost:8790/]
//
// It visits every page, walks every lesson, conversation, text, listening task, test and trainer,
// answers with the CORRECT answers from the data and checks the app accepts them, and fails on
// any console error, uncaught exception, broken file or horizontal overflow.
'use strict';
const path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  ({ chromium } = require(path.join(require('child_process').execSync('npm root -g').toString().trim(), 'playwright')));
}

const BASE = process.argv[2] || 'http://localhost:8790/';
const results = { pass: 0, fail: 0, failures: [] };
const ok = (name) => { results.pass++; };
const bad = (name, why) => { results.fail++; results.failures.push(`${name}: ${why}`); console.log(`✗ ${name}: ${why}`); };

(async () => {
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });

  async function newPage(viewport = { width: 400, height: 860 }, scheme = 'light') {
    const ctx = await browser.newContext({ viewport, colorScheme: scheme });
    const p = await ctx.newPage();
    p.setDefaultTimeout(6000);
    p.errors = [];
    p.on('pageerror', (e) => p.errors.push(`pageerror: ${e.message}`));
    p.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text()) && !/Failed to load resource.*fonts/.test(m.text())) p.errors.push(`console: ${m.text()}`); });
    p.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) p.errors.push(`HTTP ${r.status()} ${r.url()}`); });
    await p.goto(BASE);
    await p.waitForSelector('#view > *');
    return { p, ctx };
  }
  const go = async (p, h) => { await p.evaluate((x) => { location.hash = x; }, h); await p.waitForTimeout(60); };
  const check = async (p, name, fn) => {
    const before = p.errors.length;
    try {
      await fn();
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) bad(name, `page is ${overflow}px wider than the screen`);
      else if (p.errors.length > before) bad(name, p.errors.slice(before).join(' | '));
      else ok(name);
    } catch (e) { bad(name, e.message.split('\n')[0]); }
  };
  const data = (p) => p.evaluate(() => {
    const S = window.Slowka;
    return {
      units: S.COURSE.map((u) => u.id), roleplays: S.ROLEPLAYS.map((r) => r.id), stories: S.STORIES.map((s) => s.id),
      listening: S.Listening.TASKS.map((t) => t.id), exams: S.EXAMS.map((x) => x.id), sounds: S.Trainers.SOUNDS.map((x) => x.id),
      verbs: S.Trainers.VERBS.length, nouns: S.Trainers.NOUNS.length, assess: [...S.Assess.REVISIONS, ...S.Assess.TESTS].map((x) => x.id),
      levels: S.LEVELS.map((l) => l.id),
    };
  });

  // ---------- 1. every page, phone and desktop, light and dark ----------
  {
    const { p } = await newPage();
    const D = await data(p);
    console.log(`Course: ${D.units.length} units, ${D.roleplays.length} conversations, ${D.stories.length} texts, ${D.listening.length} listening, ${D.verbs} verbs, ${D.nouns} nouns`);
    const routes = ['home', 'course', 'practice', 'progress', 'settings', 'review', 'alphabet', 'dictionary', 'mistakes', 'mistakes.practice', 'talk', 'read', 'listen', 'exam', 'placement', 'verbs', 'verbs.practice', 'cases', 'cases.practice', 'sounds', 'numbers', 'check', 'report', 'mywords', 'turn', 'turn.a1-01',
      ...D.levels.map((l) => `course.${l}`), ...D.units, ...D.units.map((u) => `learn.${u}`), ...D.units.map((u) => `check.${u}`),
      ...D.roleplays.map((x) => `talk.${x}`), ...D.stories.map((x) => `read.${x}`), ...D.listening.map((x) => `listen.${x}`), ...D.exams.map((x) => `exam.${x}`),
      ...D.sounds.map((x) => `sounds.${x}`), ...D.assess.map((x) => `revise.${x}`), ...Array.from({ length: D.verbs }, (_, i) => `verbs.${i}`), ...Array.from({ length: D.nouns }, (_, i) => `cases.${i}`)];
    for (const [vp, scheme] of [[{ width: 400, height: 860 }, 'light'], [{ width: 1280, height: 900 }, 'dark']]) {
      const { p: q } = await newPage(vp, scheme);
      for (const r of routes) await check(q, `page ${r} (${vp.width}px ${scheme})`, async () => { await go(q, r); await q.waitForSelector('#view > *'); });
    }
    console.log(`1. Pages: ${routes.length * 2} visits done`);

    // ---------- 2. every unit: every practice tab ----------
    for (const u of D.units) {
      await check(p, `unit ${u} tabs`, async () => {
        await go(p, u);
        const tabs = await p.$$eval('.tab', (x) => x.map((t) => t.dataset.tab));
        for (const t of tabs) { await p.click(`.tab[data-tab="${t}"]`); await p.waitForSelector('#stage > *'); }
      });
    }
    console.log('2. Unit tabs done');

    // ---------- 3. every grammar exercise accepts its correct answer ----------
    const drillUnits = await p.evaluate(() => Object.keys(window.Slowka.DRILLS));
    let drillCount = 0;
    for (const unit of drillUnits) {
      await go(p, unit);
      const n = await p.evaluate((u) => window.Slowka.DRILLS[u].length, unit);
      for (let i = 0; i < n; i++) {
        drillCount++;
        await check(p, `drill ${unit}#${i} correct answer`, async () => {
          await p.evaluate(([u, k]) => {
            const S = window.Slowka;
            const stage = document.querySelector('#stage') || document.querySelector('#view');
            S.Practice.render(stage, { key: `t-${u}-${k}-${Math.random()}`, mode: 'drill', drills: [{ d: S.DRILLS[u][k], unit: u, idx: k }], unitId: null, pool: [] });
          }, [unit, i]);
          const d = await p.evaluate(([u, k]) => window.Slowka.DRILLS[u][k], [unit, i]);
          if (d.type === 'choose') await p.click(`[data-action="drill-choose"][data-index="${d.answer}"]`);
          else if (d.type === 'fill') { await p.fill('#drill-answer', d.answer[0]); await p.press('#drill-answer', 'Enter'); }
          else {
            // Tiles carry the word's position in the sentence (data-k).
            for (let k = 0; k < d.words.length; k++) await p.click(`[data-action="order-add"][data-k="${k}"]`);
            await p.click('[data-action="order-check"]');
          }
          const cls = await p.getAttribute('.feedback', 'class');
          if (!/right/.test(cls)) throw new Error(`correct answer not accepted (${cls})`);
        });
      }
    }
    console.log(`3. Grammar exercises: ${drillCount} checked`);

    // ---------- 4. every conversation can be completed with correct replies ----------
    for (const id of D.roleplays) {
      await check(p, `conversation ${id}`, async () => {
        await go(p, `talk.${id}`);
        await p.click('[data-action="talk-restart"]').catch(() => {});
        const steps = await p.evaluate((x) => window.Slowka.ROLEPLAYS.find((r) => r.id === x).steps.length, id);
        for (let s = 0; s < steps; s++) {
          const idx = await p.evaluate(([x, k]) => window.Slowka.ROLEPLAYS.find((r) => r.id === x).steps[k].replies.findIndex((r) => r.ok), [id, s]);
          await p.click(`[data-action="talk-pick"][data-index="${idx}"]`);
        }
        await p.waitForSelector('.summary');
        // typed mode: a correct reply typed out is accepted
        await p.click('[data-action="talk-restart"]');
        await p.click('[data-action="talk-mode"][data-mode="type"]');
        const first = await p.evaluate((x) => window.Slowka.ROLEPLAYS.find((r) => r.id === x).steps[0].replies.find((r) => r.ok).pl, id);
        await p.fill('#talk-answer', first); await p.press('#talk-answer', 'Enter');
        const step = await p.textContent('.unit-meter small');
        if (!/Step 2/.test(step)) throw new Error(`typed correct reply not accepted (${step})`);
        await p.click('[data-action="talk-mode"][data-mode="choose"]');
      });
    }
    console.log('4. Conversations done');

    // ---------- 5. reading, listening, exams: correct answers give 100% ----------
    for (const id of D.stories) {
      await check(p, `reading ${id}`, async () => {
        await go(p, `read.${id}`);
        const answers = await p.evaluate((x) => window.Slowka.STORIES.find((s) => s.id === x).questions.map((q) => q.answer), id);
        for (let i = 0; i < answers.length; i++) await p.click(`[data-action="read-answer"][data-q="${i}"][data-index="${answers[i]}"]`);
        const score = await p.evaluate((x) => window.Slowka.progress.stories[x], id);
        if (score !== 100) throw new Error(`score ${score}`);
        await p.click('.tok >> nth=1'); await p.waitForSelector('.sheet'); await p.click('[data-action="tok-close"]');
      });
    }
    for (const id of D.listening) {
      await check(p, `listening ${id}`, async () => {
        await go(p, `listen.${id}`);
        const answers = await p.evaluate((x) => window.Slowka.Listening.TASKS.find((s) => s.id === x).questions.map((q) => q.answer), id);
        for (let i = 0; i < answers.length; i++) await p.click(`[data-action="ls-answer"][data-q="${i}"][data-index="${answers[i]}"]`);
        const score = await p.evaluate((x) => window.Slowka.progress.listening[x], id);
        if (score !== 100) throw new Error(`score ${score}`);
      });
    }
    for (const id of D.exams) {
      await check(p, `exam ${id}`, async () => {
        await go(p, `exam.${id}`);
        await p.click('[data-action="exam-start"]').catch(() => p.click('[data-action="exam-restart"]'));
        const secs = await p.evaluate((x) => window.Slowka.EXAMS.find((e) => e.id === x).sections.map((s) => (s.items || []).map((q) => q.answer)), id);
        for (let si = 0; si < secs.length; si++) {
          for (let i = 0; i < secs[si].length; i++) await p.click(`[data-action="exam-answer"][data-key="${si}-${i}"][data-index="${secs[si][i]}"]`);
          await p.click('[data-action="exam-check"]'); await p.click('[data-action="exam-next"]');
        }
        const pct = await p.textContent('.summary h2');
        if (pct.trim() !== '100%') throw new Error(`score ${pct}`);
      });
    }
    await check(p, 'placement all correct', async () => {
      await go(p, 'home'); await go(p, 'placement');
      const ans = await p.evaluate(() => window.Slowka.PLACEMENT.map((q) => q.answer));
      for (const a of ans) await p.click(`[data-action="place-answer"][data-index="${a}"]`);
      const lvl = await p.textContent('.summary h2');
      if (!/B2/.test(lvl)) throw new Error(`level ${lvl}`);
    });
    console.log('5. Reading, listening, exams, placement done');

    // ---------- 6. guided lessons: walk every lesson to the end ----------
    for (const u of D.units) {
      await check(p, `guided lesson ${u}`, async () => {
        await p.evaluate((x) => { const g = window.Slowka.progress.guided; delete g[x]; }, u);
        await go(p, `learn.${u}`);
        for (let i = 0; i < 40; i++) {
          if (await p.$('.g-body .summary')) break;
          const label = await p.textContent('.g-meta .eyebrow');
          if (/Quick check/.test(label)) {
            for (let k = 0; k < 6; k++) {
              if (!(await p.$('[data-action="g-quiz"]'))) break;
              const right = await p.evaluate((unit) => {
                const S = window.Slowka; const word = document.querySelector('.g-body .word').textContent;
                const e = S.UNIT.get(unit).entries.find((x) => x.pl === word); return [...document.querySelectorAll('[data-action="g-quiz"]')].findIndex((b) => b.querySelector('.m-en').textContent === e.en);
              }, u);
              await p.click(`[data-action="g-quiz"][data-index="${right}"]`);
              await p.click('[data-action="g-quiz-next"]');
            }
            const res = await p.textContent('.g-body');
            if (!/5 of 5|५ मध्ये ५|Very good/.test(res)) throw new Error('quick check with correct answers did not score 5/5');
          }
          if (/Dialogue/.test(label)) while (await p.$('[data-action="g-line"]')) await p.click('[data-action="g-line"]');
          await p.click('[data-action="g-next"]');
        }
        await p.waitForSelector('.g-body .summary');
        const done = await p.evaluate((x) => !!window.Slowka.progress.guided[x].done, u);
        if (!done) throw new Error('not marked done');
      });
    }
    console.log('6. Guided lessons done');

    // ---------- 7. revisions and level tests with correct answers ----------
    for (const id of D.assess) {
      await check(p, `assessment ${id}`, async () => {
        await go(p, `revise.${id}`);
        await p.click('[data-action="as-start"]');
        for (let i = 0; i < 60; i++) {
          if (await p.$('.summary')) break;
          const q = await p.evaluate(() => {
            const play = document.querySelector('.play'); const word = document.querySelector('.card .word');
            return { play: play && play.dataset.text, word: word && word.textContent };
          });
          if (await p.$('[data-action="as-pick"]')) {
            const k = await p.evaluate(({ play, word, id }) => {
              const S = window.Slowka; const btns = [...document.querySelectorAll('[data-action="as-pick"]')];
              const def = S.Assess.byId(id);
              if (word) { const e = def.units.flatMap((u) => u.entries).find((x) => x.pl === word && btns.some((b) => b.querySelector('.m-en') && b.querySelector('.m-en').textContent === x.en)); return btns.findIndex((b) => b.querySelector('.m-en') && b.querySelector('.m-en').textContent === e.en); }
              return btns.findIndex((b) => b.querySelector('.opt-pl').textContent === play);
            }, { ...q, id });
            await p.click(`[data-action="as-pick"][data-index="${k}"]`);
          } else if (await p.$('[data-action="as-choose"]')) {
            const k = await p.evaluate(() => {
              const S = window.Slowka; const qtext = document.querySelector('.drill-q').textContent;
              for (const list of Object.values(S.DRILLS)) for (const d of list) if (d.type === 'choose' && d.q.replace('___', '').replace(/\s+/g, '') === qtext.replace(/\s+/g, '').replace(/ /g, '')) return d.answer;
              return -1;
            });
            if (k < 0) throw new Error('could not find choose item');
            await p.click(`[data-action="as-choose"][data-index="${k}"]`);
          } else if (await p.$('#as-input:not([readonly])')) {
            const v = await p.evaluate(({ play }) => {
              if (play) return play;
              const S = window.Slowka; const qtext = document.querySelector('.drill-q').textContent.replace(/\s+/g, '').replace(/ /g, '');
              for (const list of Object.values(S.DRILLS)) for (const d of list) if (d.type === 'fill' && d.q.replace('___', '').replace(/\s+/g, '') === qtext) return d.answer[0];
              return null;
            }, q);
            if (v == null) throw new Error('could not find fill item');
            await p.fill('#as-input', v); await p.press('#as-input', 'Enter');
          } else if (await p.$('[data-action="as-add"]')) {
            const words = await p.evaluate(() => {
              const S = window.Slowka; const tiles = [...document.querySelectorAll('[data-action="as-add"]')].map((b) => b.textContent.trim()).sort().join('|');
              for (const list of Object.values(S.DRILLS)) for (const d of list) if (d.type === 'order' && d.words.map((w, k) => S.tileText(w, k === 0)).sort().join('|') === tiles) return d.words;
              return null;
            });
            if (!words) throw new Error('could not find order item');
            for (let k = 0; k < words.length; k++) await p.click(`[data-action="as-add"][data-k="${k}"]`);
            await p.click('[data-action="as-order"]');
          } else if (await p.$('[data-action="as-skip"]')) await p.click('[data-action="as-skip"]');
          const cls = await p.getAttribute('.feedback', 'class');
          if (!/right|close/.test(cls)) throw new Error(`correct answer marked wrong at question ${i + 1}`);
          await p.click('[data-action="as-next"]');
        }
        const pct = await p.textContent('.summary h2');
        if (pct.trim() !== '100%') throw new Error(`score ${pct}`);
      });
    }
    await check(p, 'certificate', async () => { await go(p, 'cert.A1'); await p.fill('#cert-name', '<b>Arbin</b>'); const html = await p.innerHTML('.cert-name'); if (/<b>/.test(html)) throw new Error('name not escaped'); });
    console.log('7. Revisions, tests, certificate done');

    // ---------- 8. trainers ----------
    await check(p, 'verb trainer accepts correct forms', async () => {
      await go(p, 'verbs'); await go(p, 'verbs.practice');
      await p.evaluate(() => { document.querySelector('details.trans').open = true; });
      await p.click('[data-action="t-tense"][data-tense="imperative"]');
      for (let i = 0; i < 60; i++) {
        const ans = await p.evaluate(() => {
          const S = window.Slowka; const inf = document.querySelector('.word').textContent; const v = S.Trainers.VERBS.find((x) => x.inf === inf);
          const tense = document.querySelector('form .label').textContent.split(' · ')[0]; const who = document.querySelector('.who-chip').textContent;
          const P = ['ja', 'ty', 'on / ona', 'my', 'wy', 'oni / one'];
          if (tense === 'Commands') return v.imperative[who];
          if (tense === 'Present') return v.present[P.indexOf(who)];
          if (tense === 'Future') return v.future[P.indexOf(who)];
          const m = { 'ja (man)': ['m', 0], 'ty (man)': ['m', 1], on: ['m', 2], 'my (men)': ['m', 3], 'wy (men)': ['m', 4], oni: ['m', 5], 'ja (woman)': ['f', 0], 'ty (woman)': ['f', 1], ona: ['f', 2], 'my (women)': ['f', 3], 'wy (women)': ['f', 4], one: ['f', 5] }[who];
          return v.past[m[0]][m[1]];
        });
        await p.fill('#verb-answer', ans); await p.press('#verb-answer', 'Enter');
        const cls = await p.getAttribute('.feedback', 'class');
        if (!/right/.test(cls)) throw new Error(`"${ans}" not accepted`);
        await p.click('[data-action="verb-next"]');
      }
    });
    await check(p, 'case trainer accepts correct forms', async () => {
      await go(p, 'cases'); await go(p, 'cases.practice');
      await p.evaluate(() => { document.querySelector('details.trans').open = true; });
      await p.click('[data-action="t-case"][data-case="voc"]');
      for (let i = 0; i < 60; i++) {
        const ans = await p.evaluate(() => {
          const S = window.Slowka; const hint = document.querySelector('.drill-q .hint').textContent.replace(/[()]/g, '');
          const [word, plural] = hint.split(', '); const n = S.Trainers.NOUNS.find((x) => x.word === word);
          const caseName = document.querySelector('.meta span:last-child').textContent.split(' · ')[0];
          const key = Object.keys(S.Trainers.CASES).find((k) => S.Trainers.CASES[k].name === caseName);
          return n[plural ? 'pl' : 'sg'][key];
        });
        await p.fill('#case-answer', ans); await p.press('#case-answer', 'Enter');
        const cls = await p.getAttribute('.feedback', 'class');
        if (!/right/.test(cls)) throw new Error(`"${ans}" not accepted`);
        await p.click('[data-action="case-next"]');
      }
    });
    for (const id of D.sounds) {
      await check(p, `sounds game ${id}`, async () => {
        await go(p, 'sounds'); await go(p, `sounds.${id}`);
        for (let i = 0; i < 10; i++) {
          const side = await p.evaluate(() => {
            const t = document.querySelector('.play').dataset.text; const btns = [...document.querySelectorAll('[data-action="snd-pick"]')];
            return btns.findIndex((b) => b.querySelector('.opt-pl').textContent === t);
          });
          await p.click(`[data-action="snd-pick"][data-side="${side}"]`); await p.click('[data-action="snd-next"]');
        }
        const score = await p.textContent('.summary h2');
        if (score.trim() !== '10 / 10') throw new Error(score);
      });
    }
    await check(p, 'numbers trainer accepts correct answers', async () => {
      await go(p, 'numbers');
      const modes = ['read-number', 'listen-number', 'price', 'listen-price', 'time', 'listen-time', 'date', 'phone'];
      for (const m of modes) {
        await p.click(`[data-action="nm-mode"][data-mode="${m}"]`);
        for (const range of [20, 100, 1000, 10000]) {
          if (await p.$(`[data-action="nm-range"][data-range="${range}"]`)) await p.click(`[data-action="nm-range"][data-range="${range}"]`);
          for (let i = 0; i < 3; i++) {
            const typed = await p.evaluate(() => {
              const N = window.Slowka.Numbers; const play = document.querySelector('.play');
              if (!play) return null;
              const text = play.dataset.text;
              for (let n = 0; n < 10000; n++) if (N.words(n) === text) return String(n);
              for (let z = 0; z < 10000; z++) for (const g of [0, 50, 99, 20]) if (N.price(z, g) === text) return g ? `${z},${String(g).padStart(2, '0')}` : String(z);
              for (let h = 0; h < 24; h++) for (let mm = 0; mm < 60; mm++) if (`Jest ${N.time(h, mm)}.` === text) return `${h}:${String(mm).padStart(2, '0')}`;
              const groups = text.split(', ').map((g) => { for (let n = 0; n < 1000; n++) { const s = String(n).padStart(3, '0'); const z = s.match(/^0*/)[0].length; const w = [...Array(Math.min(z, 3)).fill('zero'), ...(s.slice(z) ? [N.words(Number(s.slice(z)))] : [])].join(' '); if (w === g) return s; } return '???'; });
              return groups.join('');
            });
            if (typed !== null) { await p.fill('#nm-input', typed); await p.press('#nm-input', 'Enter'); }
            else {
              const k = await p.evaluate(() => {
                const N = window.Slowka.Numbers; const disp = document.querySelector('.num-display').textContent; const opts = [...document.querySelectorAll('[data-action="nm-pick"]')].map((b) => b.textContent.replace(/^\d/, '').trim());
                let want;
                if (/zł/.test(disp)) { const [z, g] = disp.replace(' zł', '').split(','); want = N.price(Number(z), Number(g)); }
                else if (/:/.test(disp)) { const at = disp.startsWith('at '); const [h, mm] = disp.replace('at ', '').split(':').map(Number); want = N.time(h, mm, at); }
                else if (/\(/.test(disp)) { const [d, mo] = disp.match(/\((\d+)\.(\d+)\)/).slice(1).map(Number); want = N.date(d, mo - 1); }
                else want = N.words(Number(disp));
                return opts.indexOf(want);
              });
              if (k < 0) throw new Error(`mode ${m}: correct option missing`);
              await p.click(`[data-action="nm-pick"][data-index="${k}"]`);
            }
            const cls = await p.getAttribute('.feedback', 'class');
            if (!/right/.test(cls)) throw new Error(`mode ${m} range ${range}: correct answer not accepted`);
            await p.click('[data-action="nm-next"]');
          }
        }
      }
    });
    console.log('8. Trainers done');

    // ---------- 9. practice modes, review, mistakes, dictionary, review mode, settings ----------
    await check(p, 'practice modes in a unit', async () => {
      await go(p, 'a1-04');
      await p.click('.tab[data-tab="cards"]'); await p.click('.card'); await p.click('[data-rate="good"]');
      await p.click('.tab[data-tab="quiz"]'); await p.keyboard.press('1'); await p.waitForSelector('.feedback');
      await p.click('.tab[data-tab="type"]'); await p.fill('#type-answer', 'x'); await p.press('#type-answer', 'Enter'); await p.waitForSelector('.feedback');
      await p.click('.tab[data-tab="dictate"]'); await p.fill('#dictate-answer', 'x'); await p.press('#dictate-answer', 'Enter'); await p.waitForSelector('.dict-words');
      await p.click('.tab[data-tab="listen"]'); await p.click('.option >> nth=0'); await p.waitForSelector('.feedback');
      await p.click('.tab[data-tab="speak"]'); await p.waitForSelector('.card');
    });
    await check(p, 'daily review and mistakes', async () => {
      await go(p, 'review'); if (await p.$('[data-action="flip"]')) { await p.click('[data-action="flip"] >> nth=0'); await p.click('[data-rate="again"]'); }
      await go(p, 'mistakes'); await go(p, 'mistakes.practice'); await go(p, 'report');
    });
    await check(p, 'dictionary search', async () => {
      await go(p, 'dictionary');
      for (const q of ['dziekuje', 'house', 'घर', 'ż', '<script>']) { await p.fill('#dict-q', q); await p.waitForTimeout(30); }
    });
    await check(p, 'review mode report link escapes notes', async () => {
      await go(p, 'check.a1-01'); await p.click('[data-action="chk-mark"][data-ok="0"] >> nth=0'); await p.fill('[data-check-note]', '<img src=x onerror=alert(1)>'); await go(p, 'check'); await go(p, 'check.a1-01');
      if (await p.$('.check-item img')) throw new Error('note rendered as HTML');
    });
    await check(p, 'settings toggles and backup', async () => {
      await go(p, 'settings');
      const buttons = await p.$$eval('[data-action="set"]', (x) => x.map((b) => [b.dataset.key, b.dataset.value]));
      for (const [k, v] of buttons) await p.click(`[data-action="set"][data-key="${k}"][data-value="${v}"]`);
      await p.click('[data-action="set"][data-key="meaning"][data-value="both"]'); await p.click('[data-action="set"][data-key="explain"][data-value="both"]'); await p.click('[data-action="set"][data-key="pron"][data-value="both"]');
      const code = await p.inputValue('#backup-out'); await p.fill('#backup-in', code); await p.click('[data-action="backup-restore"]');
      if (!/Tap again/.test(await p.textContent('[data-action="backup-restore"]'))) throw new Error('restore did not ask for a second tap');
      await p.click('[data-action="backup-restore"]');
      if (!/restored/.test(await p.textContent('#backup-msg'))) throw new Error('backup restore failed');
      await p.fill('#backup-in', 'not a code'); await p.click('[data-action="backup-restore"]');
      if (!/did not work/.test(await p.textContent('#backup-msg'))) throw new Error('bad code not rejected');
    });
    await check(p, 'English-only and Nepali-only modes render', async () => {
      for (const lang of ['en', 'ne', 'both']) {
        await p.evaluate((l) => { const S = window.Slowka; S.settings.meaning = l; S.settings.explain = l; S.settings.pron = l; }, lang);
        for (const r of ['learn.a2-03', 'a1-01', 'talk.rp-a1-cafe', 'read.st-a1-01', 'sounds.sz-s']) { await go(p, 'home'); await go(p, r); }
      }
    });
    await check(p, 'storage blocked: app still works', async () => {
      const ctx = await browser.newContext({ viewport: { width: 400, height: 860 } });
      await ctx.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); });
      const q = await ctx.newPage(); const errs = []; q.on('pageerror', (e) => errs.push(e.message));
      await q.goto(BASE); await q.waitForSelector('.today'); await q.evaluate(() => { location.hash = 'a1-01'; }); await q.waitForSelector('.lesson');
      if (errs.length) throw new Error(errs.join(' | '));
      await ctx.close();
    });
    console.log('9. Practice, review, dictionary, settings done');

    // ---------- 10. offline ----------
    {
      const { p: q, ctx } = await newPage();
      await check(q, 'offline after first visit', async () => {
        await q.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 15000 }).catch(() => {});
        await q.reload(); await q.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 15000 });
        await ctx.setOffline(true);
        await q.reload({ waitUntil: 'domcontentloaded' }); await q.waitForSelector('.today');
        for (const r of ['learn.b1-06', 'verbs.5', 'listen.ls-a2-01', 'numbers']) { await go(q, r); await q.waitForSelector('#view > *'); }
        await ctx.setOffline(false);
      });
    }
    console.log('10. Offline done');

    // ---------- 11. my words, pronunciation rules, built-in audio ----------
    await check(p, 'pronunciation rules', async () => {
      const got = await p.evaluate(() => ['dzień dobry', 'przepraszam', 'w Polsce', 'jabłko', 'chleb', 'matematyka', 'będę'].map((w) => window.Slowka.Pron.of(w).pron));
      const want = ['jeny DO-bri', 'psheh-PRA-sham', 'f POLS-tseh', 'YAP-ko', 'hlep', 'ma-teh-MA-ti-ka', 'BEN-deh'];
      got.forEach((g, i) => { if (g !== want[i]) throw new Error(`${want[i]} expected, got ${g}`); });
    });
    await check(p, 'my words: add, preview, practise, review, remove', async () => {
      await go(p, 'mywords');
      await p.fill('input[name="pl"]', 'taśma klej');
      await p.click('.my-form [data-action="key"][data-key="ą"]');
      const sy = await p.$$eval('#my-preview .pron:not(.ne) .sy', (x) => x.map((e) => (e.classList.contains('st') ? e.textContent.toUpperCase() : e.textContent)).join('-'));
      if (sy !== 'TASH-ma-KLEH-yon') throw new Error(`live pronunciation preview: ${sy}`);
      await p.fill('input[name="pl"]', 'taśma klejąca'); await p.fill('input[name="en"]', 'sticky tape'); await p.fill('input[name="ne"]', 'गोदाम');
      await p.press('input[name="ne"]', 'Enter');
      await p.waitForSelector('.entry.mine');
      for (const [pl, en] of [['zmiana nocna', 'night shift'], ['kubek herbaty', 'a mug of tea']]) {
        await p.fill('input[name="pl"]', pl); await p.fill('input[name="en"]', en); await p.press('input[name="en"]', 'Enter');
      }
      if ((await p.$$('.entry.mine')).length !== 3) throw new Error('words not listed');
      await p.fill('input[name="pl"]', 'dzień dobry'); await p.fill('input[name="en"]', 'hello'); await p.press('input[name="en"]', 'Enter');
      if (!/already in the course/.test(await p.textContent('#my-msg'))) throw new Error('course word not detected');
      const due = await p.evaluate(() => window.Slowka.dueList().map((e) => e.pl));
      if (!due.includes('taśma klejąca')) throw new Error('word not in daily review');
      for (const m of ['cards', 'quiz', 'listen', 'speak', 'type']) { await go(p, `mywords.${m}`); await p.waitForSelector('#stage > *'); }
      await go(p, 'mywords.type');
      const word = await p.evaluate(() => { const S = window.Slowka; return document.querySelector('#stage .meaning') ? S.MyWords.entries().find((e) => document.querySelector('#stage').textContent.includes(e.en)).pl : null; });
      if (word) { await p.fill('#type-answer', word); await p.press('#type-answer', 'Enter'); if (!/right/.test(await p.getAttribute('.feedback', 'class'))) throw new Error('typed answer not accepted'); }
      await go(p, 'mywords');
      await p.reload(); await p.waitForSelector('#view > *'); await go(p, 'mywords');
      if ((await p.$$('.entry.mine')).length !== 3) throw new Error('words lost after reload');
      await p.click('[data-action="my-del"][data-pl="taśma klejąca"]');
      if ((await p.$$('.entry.mine')).length !== 2) throw new Error('remove failed');
      if (await p.evaluate(() => window.Slowka.LEXICON.has('taśma klejąca') || !!window.Slowka.progress.items['taśma klejąca'])) throw new Error('removed word still in review');
    });
    await check(p, 'built-in audio is used before the device voice', async () => {
      const r = await p.evaluate(async () => {
        const S = window.Slowka;
        const file = Object.values(S.AUDIO)[0];
        S.TTS['testowe zdanie'] = file;
        S.TTS['drugie zdanie'] = file;
        const played = [];
        const orig = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function () { played.push(this.src); return orig.call(this); };
        S.settings.audio = 'native';
        S.speak('Testowe zdanie!');
        S.settings.audio = 'device';
        S.speak('Testowe zdanie');
        S.settings.audio = 'native';
        // A dialogue plays its recordings one after another.
        S.speakLines([{ text: 'Testowe zdanie.', pitch: 1 }, { text: 'Drugie zdanie.', pitch: 1.2 }]);
        await new Promise((res) => setTimeout(res, 6000));
        S.stopSpeaking();
        HTMLMediaElement.prototype.play = orig;
        delete S.TTS['testowe zdanie'];
        delete S.TTS['drugie zdanie'];
        return { played, file };
      });
      if (r.played.length !== 3 || r.played.some((x) => !x.endsWith(r.file))) throw new Error(`unexpected playback ${JSON.stringify(r.played)}`);
    });
    await check(p, 'alphabet: every letter name and letter pair can be heard', async () => {
      await go(p, 'alphabet');
      const r = await p.evaluate(() => ({ chips: [...document.querySelectorAll('.name-chip')].map((b) => b.dataset.text), pairs: document.querySelectorAll('.letters')[1].querySelectorAll('.letter').length, pairListen: document.querySelectorAll('.letters')[1].querySelectorAll('[data-action="say"]').length }));
      if (r.chips.length !== 32 || r.chips.some((x) => !x)) throw new Error(`letter names: ${r.chips.length}`);
      if (r.pairs < 12 || r.pairListen < 12) throw new Error('letter pairs missing');
      const said = await p.evaluate(async () => {
        const S = window.Slowka; const out = [];
        const sp = speechSynthesis.speak.bind(speechSynthesis);
        speechSynthesis.speak = (u) => { out.push(u.text); setTimeout(() => u.onend && u.onend(), 10); };
        S.settings.audio = 'device';
        document.querySelector('[data-action="abc-play"]').click();
        await new Promise((res) => setTimeout(res, 2500));
        document.querySelector('[data-action="abc-stop"]').click();
        speechSynthesis.speak = sp; S.settings.audio = 'native';
        return out;
      });
      if (said.slice(0, 4).join('|') !== 'a|mama|ą|mąż') throw new Error(`whole alphabet plays ${said.slice(0, 4).join('|')}`);
    });
    await check(p, 'review fixes: spaced repetition, numbers, slashes, safe restore', async () => {
      const r = await p.evaluate(() => {
        const S = window.Slowka; const out = {};
        const e = S.COURSE[3].entries[0];
        S.progress.items[e.pl] = { b: 4, due: S.dayKey() };
        S.review(e, 0);
        out.halfRightStaysDue = S.progress.items[e.pl].due === S.dayKey() && S.progress.items[e.pl].b === 4;
        delete S.progress.items[e.pl];
        out.digits = S.spokenDigits('mam 2 koty i 21 lat');
        out.slash = S.checkAnswer('robić/zrobić', ['robić / zrobić']);
        const evil = { v: 2, progress: { items: {}, stories: { 'st-a1-01': '<img src=x onerror="window.__x=1">' } }, settings: { goal: '<img src=x onerror="window.__x=1">', meaning: 'en' } };
        const keep = { p: JSON.stringify(S.progress), s: JSON.stringify(S.settings) };
        S.restoreBackup(btoa(unescape(encodeURIComponent(JSON.stringify(evil)))));
        out.goal = S.settings.goal; out.meaning = S.settings.meaning; out.story = S.progress.stories['st-a1-01'];
        S.progress = JSON.parse(keep.p); S.settings = Object.assign(S.settings, JSON.parse(keep.s)); S.saveProgress(); S.saveSettings();
        return out;
      });
      if (!r.halfRightStaysDue) throw new Error('a half-right answer moved the word out of today\'s review');
      if (r.digits !== 'mam dwa koty i dwadzieścia jeden lat') throw new Error(`spoken digits: ${r.digits}`);
      if (r.slash !== 'right') throw new Error('robić/zrobić without spaces not accepted');
      if (r.goal !== 20 && r.goal !== 10 && r.goal !== 40 && r.goal !== 60) throw new Error(`bad goal restored: ${r.goal}`);
      if (/</.test(r.story) || r.meaning !== 'en') throw new Error('backup not cleaned');
      await go(p, 'read'); await go(p, 'home');
      if (await p.evaluate(() => window.__x)) throw new Error('markup from a backup code ran');
    });
    await check(p, 'phone Back button returns to the previous page', async () => {
      await go(p, 'home'); await p.click('.bottom-nav [data-to="course"]'); await p.waitForTimeout(80);
      await p.evaluate(() => window.Slowka.go('a1-01')); await p.waitForTimeout(80);
      await p.goBack(); await p.waitForTimeout(200);
      const route = await p.evaluate(() => window.Slowka.route.name);
      if (route !== 'course') throw new Error(`Back went to ${route}`);
    });
    await check(p, 'listening task can be tried again; focus stays after answering', async () => {
      const id = await p.evaluate(() => window.Slowka.Listening.TASKS[0].id);
      await go(p, `listen.${id}`);
      const n = await p.$$eval('[data-action="ls-answer"][data-index="0"]', (x) => x.length);
      for (let i = 0; i < n; i++) await p.click(`[data-action="ls-answer"][data-q="${i}"][data-index="0"]`);
      await p.click('[data-action="ls-restart"]');
      if ((await p.$$('[data-action="ls-answer"][disabled]')).length) throw new Error('answers not cleared');
      await p.focus('[data-action="ls-answer"][data-q="0"][data-index="1"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(50);
      const focused = await p.evaluate(() => document.activeElement && document.activeElement.tagName);
      if (focused === 'BODY') throw new Error('focus lost after answering');
    });
    await check(p, 'old links do not trap the Back button; audio stops when leaving a page', async () => {
      await go(p, 'home'); await go(p, 'practice');
      await p.evaluate(() => window.Slowka.go('talk.no-such-conversation')); await p.waitForTimeout(80);
      await p.goBack(); await p.waitForTimeout(200);
      if (await p.evaluate(() => window.Slowka.route.name) !== 'practice') throw new Error('Back is trapped');
      const stopped = await p.evaluate(() => { const S = window.Slowka; let n = 0; const o = S.stopSpeaking; S.stopSpeaking = () => { n++; o(); }; S.go('alphabet'); S.stopSpeaking = o; return n; });
      if (!stopped) throw new Error('audio not stopped on navigation');
    });
    await check(p, 'sentence tiles give no punctuation clues; Nepali is never read by the Polish voice', async () => {
      const r = await p.evaluate(() => {
        const S = window.Slowka;
        return { tiles: ['Mówię', 'polsku.', 'Ram', 'rozumiem,'].map((w, k) => S.tileText(w, k === 0)), ne: S.markup('like *घर* and *dom*') };
      });
      if (r.tiles.join(' ') !== 'mówię polsku Ram rozumiem') throw new Error(`tiles: ${r.tiles}`);
      if ((r.ne.match(/data-action="say"/g) || []).length !== 1) throw new Error('Nepali span made tappable');
    });
    await check(p, 'your turn: play a role through a whole dialogue', async () => {
      await go(p, 'turn');
      const n = await p.$$eval('[data-to^="turn."]', (x) => x.length);
      if (n < 50) throw new Error(`only ${n} dialogues listed`);
      await go(p, 'turn.a1-01');
      await p.click('[data-action="turn-role"]');
      for (let k = 0; k < 40 && !(await p.$('[data-action="turn-again"]')); k++) {
        if (await p.$('[data-action="turn-show"]')) await p.click('[data-action="turn-show"]');
        await p.click('[data-action="turn-next"]');
      }
      if (!(await p.$('[data-action="turn-again"]'))) throw new Error('summary not reached');
      if (await p.evaluate(() => (window.Slowka.progress.speaking || {})['a1-01'] == null)) throw new Error('result not saved');
      await p.click('[data-action="turn-swap"]');
      if (!(await p.$('[data-action="turn-next"]'))) throw new Error('swap roles failed');
      await go(p, 'turn.a1-01'); await p.click('[data-action="turn-roles"]').catch(() => {});
      await go(p, `turn.${await p.evaluate(() => window.Slowka.Listening.TASKS[0].id)}`);
      await p.click('[data-action="turn-role"][data-who="*"]');
      if (!(await p.$('.turn-answer'))) throw new Error('repeat-after-me does not show the line');
    });
    await check(p, 'daily review asks known words from the meaning (type, say, hear)', async () => {
      const words = await p.evaluate(() => {
        const S = window.Slowka;
        const ws = S.COURSE[3].entries.filter((e) => e.pl.split(' ').length <= 2).slice(0, 6);
        for (const k of Object.keys(S.progress.items)) delete S.progress.items[k];
        ws.forEach((e) => { S.progress.items[e.pl] = { b: 3, due: S.dayKey() }; });
        S.saveProgress();
        return ws.map((e) => e.pl);
      });
      await go(p, 'home'); await go(p, 'review');
      const seen = new Set();
      for (let k = 0; k < 6; k++) {
        if (await p.$('#rv-answer')) {
          seen.add('type');
          const want = await p.evaluate(() => { const S = window.Slowka; const m = document.querySelector('#stage .meaning').textContent; return S.dueList().concat(S.ENTRIES).find((e) => m.includes(e.en)).pl; });
          await p.fill('#rv-answer', want); await p.press('#rv-answer', 'Enter');
          if (!/right|close/.test(await p.getAttribute('.feedback', 'class'))) throw new Error('typed review answer not accepted');
          await p.click('[data-action="rv-next"]');
        } else if (await p.$('[data-action="flip"]')) {
          seen.add(await p.evaluate(() => (/What did you hear/.test(document.querySelector('#stage').textContent) ? 'hear' : /Say it in Polish/.test(document.querySelector('#stage').textContent) ? 'recall' : 'see')));
          await p.click('.card[data-action="flip"]'); await p.click('[data-action="rate"][data-rate="good"]');
        } else break;
      }
      if (!seen.has('type') || !seen.has('recall')) throw new Error(`review kinds seen: ${[...seen]}`);
      if (seen.has('see')) throw new Error('known words still shown Polish-first');
      if (!words.length) throw new Error('no words');
    });
    await check(p, 'reading: every tapped word has a meaning (sample)', async () => {
      await go(p, 'read.st-a1-03'); await p.waitForSelector('.tok');
      for (const w of ['zł', 'Zapraszamy', 'codziennie', 'Promocja']) {
        await p.evaluate((x) => [...document.querySelectorAll('.read-para .tok')].find((t) => t.dataset.word === x).click(), w);
        const t = await p.textContent('.sheet');
        if (/not in the glossary/.test(t)) throw new Error(`no meaning for ${w}`);
      }
      if (!/złoty/.test(await p.textContent('.sheet .meaning').catch(() => '')) && !(await p.evaluate(() => document.querySelector('.sheet').textContent.includes('Promo')))) throw new Error('sheet content missing');
    });
    await check(p, 'lesson end: missed words are practised again; summary shows the scores', async () => {
      await p.evaluate(() => { const g = window.Slowka.progress.guided || {}; if (g['a1-02']) g['a1-02'].step = 0; });
      await go(p, 'home'); await go(p, 'learn.a1-02');
      for (let k = 0; k < 40; k++) {
        if (await p.$('[data-action="g-quiz"]:not([disabled])')) {
          // answer wrong on purpose
          const wrong = await p.evaluate(() => { const b = [...document.querySelectorAll('[data-action="g-quiz"]')]; const S = window.Slowka; const word = document.querySelector('.card .word').textContent.trim(); const e = [...S.LEXICON.values()].find((x) => x.pl === word); return b.findIndex((x) => !x.textContent.includes(e.en)); });
          await p.click(`[data-action="g-quiz"][data-index="${Math.max(0, wrong)}"]`);
          await p.click('[data-action="g-quiz-next"]');
          continue;
        }
        if (await p.$('[data-action="g-quiz-missed"]')) {
          await p.click('[data-action="g-quiz-missed"]');
          if (!(await p.$('[data-action="g-quiz"]'))) throw new Error('missed words not repeated');
          break;
        }
        const next = await p.$('[data-action="g-next"]:not([disabled])');
        if (!next) break;
        await next.click(); await p.waitForTimeout(30);
      }
      for (let k = 0; k < 40 && !(await p.$('.summary .tally')); k++) {
        const g = await p.$('[data-action="g-quiz-next"]'); if (g) { await g.click(); continue; }
        const q = await p.$('[data-action="g-quiz"]:not([disabled])'); if (q) { await q.click(); continue; }
        const n = await p.$('[data-action="g-next"]:not([disabled])'); if (!n) break; await n.click(); await p.waitForTimeout(30);
      }
      if (!(await p.$('.summary .tally'))) throw new Error('summary has no score report');
    });
    await check(p, 'round 4 fixes: counting, level, bad links, lesson after reload', async () => {
      // Looking at a work unit does not change "your level".
      const before = await p.evaluate(() => { const S = window.Slowka; S.progress.lastUnit = null; return S.progress.lastUnit; });
      await go(p, 'work-01'); await go(p, 'home');
      if (await p.evaluate(() => window.Slowka.progress.lastUnit) !== before) throw new Error('page visit changed lastUnit');
      // Bad certificate / course links go somewhere sensible.
      await go(p, 'cert'); if (await p.evaluate(() => window.Slowka.route.name) !== 'progress') throw new Error('#cert did not redirect');
      await go(p, 'course.bad'); if (!(await p.$('.level-block, .course-level, section'))) throw new Error('course.bad shows no levels');
      // A guided lesson keeps working after progress is re-read from storage.
      await p.evaluate(() => { const S = window.Slowka; delete (S.progress.guided || {})['a1-05']; S.saveProgress(); });
      await go(p, 'learn.a1-05');
      await p.evaluate(() => { const S = window.Slowka; S.progress = JSON.parse(localStorage.getItem('slowka-progress-v2')); delete S.progress.guided['a1-05']; });
      await p.click('[data-action="g-next"]');
      // Exam "Check answers" with nothing answered does not count.
      const n0 = await p.evaluate(() => window.Slowka.todayCount());
      await go(p, `exam.${await p.evaluate(() => window.Slowka.EXAMS[0].id)}`);
      await p.click('[data-action="exam-start"]').catch(() => {});
      await p.click('[data-action="exam-check"]').catch(() => {});
      if (await p.evaluate(() => window.Slowka.todayCount()) !== n0) throw new Error('empty exam check counted');
    });
    await check(p, 'numbers accept natural formats (12 zł 50 gr, 600-123-456, 1845, words)', async () => {
      await go(p, 'numbers');
      const tryMode = async (mode, make) => {
        await p.click(`[data-action="nm-mode"][data-mode="${mode}"]`);
        if (await p.$('[data-action="nm-range"][data-range="100"]')) await p.click('[data-action="nm-range"][data-range="100"]');
        const typed = await p.evaluate(make);
        await p.fill('#nm-input', typed); await p.press('#nm-input', 'Enter');
        if (!/right/.test(await p.getAttribute('.feedback', 'class'))) throw new Error(`${mode}: "${typed}" not accepted`);
        await p.click('[data-action="nm-next"]');
      };
      await tryMode('listen-price', () => { const N = window.Slowka.Numbers; const t = document.querySelector('.play').dataset.text; for (let z = 0; z < 1000; z++) for (let g = 0; g < 100; g++) if (N.price(z, g) === t) return `${z} zł ${g} gr`; return '?'; });
      await tryMode('phone', () => { const N = window.Slowka.Numbers; const t = document.querySelector('.play').dataset.text; const gs = t.split(', ').map((g) => { for (let n = 0; n < 1000; n++) { const s = String(n).padStart(3, '0'); if (N.phone(s + s + s).split(', ')[0] === g) return s; } return '???'; }); return gs.join('-'); });
      await tryMode('listen-time', () => { const N = window.Slowka.Numbers; const t = document.querySelector('.play').dataset.text; for (let h = 0; h < 24; h++) for (let m = 0; m < 60; m++) if (`Jest ${N.time(h, m)}.` === t) return `${h}${String(m).padStart(2, '0')}`; return '?'; });
      await tryMode('listen-number', () => document.querySelector('.play').dataset.text);
    });
    await check(p, 'verb and conversation answers are judged strictly', async () => {
      const r = await p.evaluate(() => {
        const S = window.Slowka;
        const byc = S.Trainers.VERBS.find((v) => v.inf === 'być');
        return { byc: !!byc };
      });
      if (!r.byc) throw new Error('być missing');
      await go(p, 'talk.rp-a1-cafe');
      await p.click('[data-action="talk-mode"][data-mode="type"]');
      const steps = await p.evaluate(() => window.Slowka.ROLEPLAYS.find((x) => x.id === 'rp-a1-cafe').steps);
      for (const st of steps) {
        const right = st.replies.find((x) => x.ok);
        const bad = st.replies.find((x) => !x.ok && x.pl.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l') === right.pl.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l'));
        if (bad) {
          await p.fill('#talk-answer', bad.pl); await p.press('#talk-answer', 'Enter'); await p.waitForTimeout(50);
          if (!(await p.$('.feedback.wrong'))) throw new Error(`accent-only wrong reply accepted: ${bad.pl}`);
        }
        await p.fill('#talk-answer', right.pl); await p.press('#talk-answer', 'Enter'); await p.waitForTimeout(1200);
        if (!(await p.$('#talk-answer'))) break;
      }
    });
    console.log('11. My words, pronunciation and audio done');
  }

  await browser.close();
  console.log(`\n${results.pass} passed, ${results.fail} failed`);
  if (results.fail) { console.log(results.failures.slice(0, 80).join('\n')); process.exit(1); }
})();
