// Downloads native-speaker recordings of course words from Wiktionary and Lingua Libre (Wikimedia Commons),
// converts them to small MP3 files in audio/, and writes audio/manifest.js and audio/ATTRIBUTION.md.
//
// Usage:  node tools/fetch-audio.js [--limit 200]
// Needs:  Node 18+, ffmpeg, and internet access to commons.wikimedia.org and upload.wikimedia.org.
// Safe to run again: words that already have a recording are skipped.
//
// Recordings are mostly CC BY-SA 4.0 by Lingua Libre volunteers; ATTRIBUTION.md lists each one.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const AUDIO = path.join(ROOT, 'audio');
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'SlowkaCourse/1.0 (https://github.com/Arbin848/Arbin; educational, offline Polish course)';
const limitArg = process.argv.indexOf('--limit');
const LIMIT = limitArg > 0 ? Number(process.argv[limitArg + 1]) : Infinity;

const clean = (s) => String(s).toLowerCase().replace(/[?!.,…¿¡:;"„”«»()–—]/g, ' ').replace(/\s+/g, ' ').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadWords() {
  const ctx = { window: {} };
  for (const f of fs.readdirSync(path.join(ROOT, 'data')).filter((x) => x.endsWith('.js')).sort()) {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'), ctx);
  }
  const w = ctx.window;
  const words = new Set();
  const add = (pl) => {
    // Lingua Libre records single words and short expressions; split "robić / zrobić" pairs.
    for (const part of String(pl).split(' / ')) {
      const c = clean(part);
      if (c && c.split(' ').length <= 3) words.add(c);
    }
  };
  (w.SLOWKA_COURSE || []).forEach((u) => [...(u.words || []), ...(u.phrases || [])].forEach((e) => add(e[0])));
  (w.SLOWKA_ALPHABET || []).forEach((a) => add(a.example));
  (w.SLOWKA_STORIES || []).forEach((s) => (s.glossary || []).forEach((e) => add(e[0])));
  (w.SLOWKA_SOUNDS || []).forEach((x) => x.pairs.forEach((p) => p.forEach((e) => add(e[0]))));
  (w.SLOWKA_VERBS || []).forEach((v) => { add(v.inf); (v.present || []).forEach(add); });
  (w.SLOWKA_NOUNS || []).forEach((n) => { add(n.sg.nom); if (n.pl) add(n.pl.nom); });
  return [...words];
}

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', formatversion: '2', ...params })}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) return res.json();
      if (res.status === 429) { await sleep(5000 * (attempt + 1)); continue; }
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (attempt === 3) throw e;
      await sleep(2000 * (attempt + 1));
    }
  }
  return null;
}

// Find a Lingua Libre file named "LL-Q809 (pol)-<speaker>-<word>.wav".
// Wiktionary recordings are stored as "Pl-<word>.ogg" (sometimes .oga or with a region tag).
async function findWiktionary(word) {
  const titles = [`File:Pl-${word}.ogg`, `File:Pl-${word}.oga`, `File:Pl-${word}.wav`];
  const data = await api({ action: 'query', titles: titles.join('|'), prop: 'imageinfo', iiprop: 'url' });
  const pages = (data && data.query && data.query.pages) || [];
  const hit = pages.find((p) => !p.missing && p.imageinfo);
  return hit ? hit.title : null;
}

async function findRecording(word) {
  const want = `-${word}.wav`; // Lingua Libre names files "LL-Q809 (pol)-<speaker>-<word>.wav"
  const q = word.replace(/"/g, '');
  // Try a strict title search first, then a looser one.
  for (const srsearch of [`intitle:"LL-Q809 (pol)" intitle:"${q}"`, `"LL-Q809 (pol)" "${q}"`]) {
    const data = await api({ action: 'query', list: 'search', srnamespace: '6', srlimit: '30', srsearch });
    const hits = ((data && data.query && data.query.search) || []).map((h) => h.title);
    const hit = hits.find((t) => t.toLowerCase().endsWith(want) && t.includes('LL-Q809 (pol)'));
    if (hit) return hit;
    await sleep(100);
  }
  return null;
}

async function fileInfo(title) {
  const data = await api({ action: 'query', titles: title, prop: 'imageinfo', iiprop: 'url|extmetadata' });
  const page = data && data.query && data.query.pages && data.query.pages[0];
  const info = page && page.imageinfo && page.imageinfo[0];
  if (!info) return null;
  const meta = info.extmetadata || {};
  const strip = (s) => String((s && s.value) || '').replace(/<[^>]+>/g, '').trim();
  return { url: info.url, page: info.descriptionurl, author: strip(meta.Artist) || 'Lingua Libre contributor', license: strip(meta.LicenseShortName) || 'see file page' };
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

function slug(word) {
  const ascii = word.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${ascii.slice(0, 40)}-${crypto.createHash('md5').update(word).digest('hex').slice(0, 6)}`;
}

function readManifest() {
  const file = path.join(AUDIO, 'manifest.js');
  if (!fs.existsSync(file)) return {};
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx);
  return ctx.window.SLOWKA_AUDIO || {};
}
function readCredits() {
  const file = path.join(AUDIO, 'credits.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}

function save(manifest, credits) {
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b, 'pl')));
  fs.writeFileSync(path.join(AUDIO, 'manifest.js'),
    `// Native-speaker recordings, generated by tools/fetch-audio.js. Keys are Polish text in lowercase.\nwindow.SLOWKA_AUDIO = ${JSON.stringify(sorted, null, 1)};\n`);
  fs.writeFileSync(path.join(AUDIO, 'credits.json'), JSON.stringify(credits, null, 1));
  const lines = Object.entries(credits).sort(([a], [b]) => a.localeCompare(b, 'pl'))
    .map(([w, c]) => `- **${w}**: ${c.author}, ${c.license}, [source](${c.page})`);
  fs.writeFileSync(path.join(AUDIO, 'ATTRIBUTION.md'),
    `# Audio credits\n\nThese recordings come from [Wiktionary](https://www.wiktionary.org) and [Lingua Libre](https://lingualibre.org) via Wikimedia Commons, converted to MP3. Each is used under the licence shown.\n\n${lines.join('\n')}\n`);
}

(async () => {
  fs.mkdirSync(AUDIO, { recursive: true });
  try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); } catch (e) { console.error('ffmpeg is required.'); process.exit(1); }
  const manifest = readManifest();
  const credits = readCredits();
  const words = loadWords().filter((w) => !manifest[w]);
  console.log(`${Object.keys(manifest).length} words already have audio; looking for ${Math.min(words.length, LIMIT)} more.`);
  let found = 0;
  let checked = 0;
  const tmp = path.join(AUDIO, '.tmp.wav');
  for (const word of words) {
    if (checked >= LIMIT) break;
    checked += 1;
    try {
      // Wiktionary first for multi-word phrases and common words, then Lingua Libre.
      const title = (await findWiktionary(word)) || (await findRecording(word));
      await sleep(150);
      if (!title) continue;
      const info = await fileInfo(title);
      if (!info) continue;
      const name = `${slug(word)}.mp3`;
      await download(info.url, tmp);
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-ac', '1', '-ar', '22050', '-b:a', '40k', path.join(AUDIO, name)]);
      manifest[word] = `audio/${name}`;
      credits[word] = { file: title, page: info.page, author: info.author, license: info.license };
      found += 1;
      if (found % 20 === 0) { save(manifest, credits); console.log(`  …${found} found (${checked} checked)`); }
    } catch (e) {
      console.warn(`  ${word}: ${e.message}`);
    }
  }
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  save(manifest, credits);
  console.log(`Done: ${found} new recordings, ${Object.keys(manifest).length} in total.`);
})();
