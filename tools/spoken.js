// How a Pole reads a text aloud: numbers, times, dates, prices and abbreviations written out
// in the right grammatical form ("od 14:00" -> "od czternastej", "w 2024 roku" -> "w dwa
// tysiące dwudziestym czwartym roku", "22,50 zł" -> "dwadzieścia dwa złote pięćdziesiąt groszy").
// Used by tools/list-texts.js so the generated recordings say numbers correctly.
// A few texts need a hand-written version: see OVERRIDES at the end.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ctx = { window: { Slowka: { esc: (x) => x, polish: (x) => x } } };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'numbers.js'), 'utf8'), ctx);
const N = ctx.window.Slowka.Numbers;

const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const MONTH_RE = MONTHS.join('|');
// Ordinals: masculine/neuter genitive (dates), feminine forms (hours), masculine locative (years).
const DAY_GEN = ['', 'pierwszego', 'drugiego', 'trzeciego', 'czwartego', 'piątego', 'szóstego', 'siódmego', 'ósmego', 'dziewiątego', 'dziesiątego', 'jedenastego', 'dwunastego', 'trzynastego', 'czternastego', 'piętnastego', 'szesnastego', 'siedemnastego', 'osiemnastego', 'dziewiętnastego', 'dwudziestego'];
const dayGen = (d) => (d <= 20 ? DAY_GEN[d] : d < 30 ? `dwudziestego ${DAY_GEN[d - 20]}` : d === 30 ? 'trzydziestego' : 'trzydziestego pierwszego');
const HOUR_GEN = ['północy', 'pierwszej', 'drugiej', 'trzeciej', 'czwartej', 'piątej', 'szóstej', 'siódmej', 'ósmej', 'dziewiątej', 'dziesiątej', 'jedenastej', 'dwunastej', 'trzynastej', 'czternastej', 'piętnastej', 'szesnastej', 'siedemnastej', 'osiemnastej', 'dziewiętnastej', 'dwudziestej', 'dwudziestej pierwszej', 'dwudziestej drugiej', 'dwudziestej trzeciej', 'dwudziestej czwartej'];
const hourIns = (h) => HOUR_GEN[h].replace(/ej\b/g, 'ą').replace('północy', 'północą');
const minutes = (m) => (m ? ` ${m < 10 ? `zero ${N.words(m)}` : N.words(m)}` : '');
const ORD_NOM_M = ['', 'pierwszy', 'drugi', 'trzeci', 'czwarty', 'piąty', 'szósty', 'siódmy', 'ósmy', 'dziewiąty', 'dziesiąty'];
const UNIT_LOC = ['', 'pierwszym', 'drugim', 'trzecim', 'czwartym', 'piątym', 'szóstym', 'siódmym', 'ósmym', 'dziewiątym'];
const TEEN_LOC = ['dziesiątym', 'jedenastym', 'dwunastym', 'trzynastym', 'czternastym', 'piętnastym', 'szesnastym', 'siedemnastym', 'osiemnastym', 'dziewiętnastym'];
const TENS_LOC = ['', '', 'dwudziestym', 'trzydziestym', 'czterdziestym', 'pięćdziesiątym', 'sześćdziesiątym', 'siedemdziesiątym', 'osiemdziesiątym', 'dziewięćdziesiątym'];
// "w 1998 roku" -> "w tysiąc dziewięćset dziewięćdziesiątym ósmym roku": only the last two digits are ordinal.
function yearLoc(y) {
  const last = y % 100;
  const head = y - last;
  let tail;
  if (last === 0) return null;
  if (last < 10) tail = UNIT_LOC[last];
  else if (last < 20) tail = TEEN_LOC[last - 10];
  else tail = [TENS_LOC[Math.floor(last / 10)], UNIT_LOC[last % 10]].filter(Boolean).join(' ');
  return `${N.words(head)} ${tail}`;
}
const zl = (n) => `${N.words(n)} ${['złoty', 'złote', 'złotych'][['one', 'few', 'many'].indexOf(N.form(n))]}`;

function spoken(text) {
  let t = text;
  // Phrases that need a particular grammatical form.
  t = t.replace(/w ciągu 30 dni/g, 'w ciągu trzydziestu dni');
  t = t.replace(/OB\.123\.45/g, 'o be, sto dwadzieścia trzy, czterdzieści pięć');
  t = t.replace(/sp\. z o\.o\., zwaną/g, 'spółką z ograniczoną odpowiedzialnością, zwaną');
  // Headings in capitals are read as normal words, not spelled out (short acronyms like PIN, CV stay).
  t = t.replace(/\p{Lu}{4,}(?: \p{Lu}{1,})*/gu, (m) => m.charAt(0) + m.slice(1).toLowerCase());
  // Years and dates.
  t = t.replace(/\b[wW] (\d{4}) roku\b/g, (m, y) => (yearLoc(+y) ? `${m[0]} ${yearLoc(+y)} roku` : m));
  t = t.replace(new RegExp(`\\b(\\d{1,2}) do (\\d{1,2}) (${MONTH_RE})\\b`, 'g'), (m, a, b, mo) => `${dayGen(+a)} do ${dayGen(+b)} ${mo}`);
  t = t.replace(new RegExp(`\\b(\\d{1,2}) (${MONTH_RE})\\b`, 'g'), (m, d, mo) => `${dayGen(+d)} ${mo}`);
  // Times: ranges, "między A a B", then single times by the word before them.
  t = t.replace(/\b(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/g, (m, h1, m1, h2, m2) => `od ${HOUR_GEN[+h1]}${minutes(+m1)} do ${HOUR_GEN[+h2]}${minutes(+m2)}`);
  t = t.replace(/\bmiędzy (\d{1,2}):(\d{2}) a (\d{1,2}):(\d{2})/g, (m, h1, m1, h2, m2) => `między ${hourIns(+h1)}${minutes(+m1)} a ${hourIns(+h2)}${minutes(+m2)}`);
  t = t.replace(/\b(\d{1,2}):(\d{2})\b/g, (m, h, mi) => `${HOUR_GEN[+h]}${minutes(+mi)}`);
  // Prices.
  t = t.replace(/\b(\d+),(\d{2}) zł(?!\p{L})/gu, (m, z, g) => N.price(+z, +g));
  t = t.replace(/\b(\d+) zł(?!\p{L})/gu, (m, z) => zl(+z));
  // Abbreviations and symbols.
  t = t.replace(/§\s?(\d+)\./g, (m, n) => `Paragraf ${ORD_NOM_M[+n]}.`);
  t = t.replace(/\btel\. ((?:\d{3} ?){3})/g, (m, d) => `telefon ${N.phone(d.replace(/\s/g, ''))}. `);
  t = t.replace(/\bnr (\d+)\/(\d+)/g, (m, a, b) => `numer ${N.words(+a)} łamane przez ${N.words(+b)}`);
  t = t.replace(/\bnr (\d+)/g, (m, a) => `numer ${N.words(+a)}`);
  t = t.replace(/\bul\. /g, 'ulica ');
  t = t.replace(/\b(\d+)\/(\d+)\b/g, (m, a, b) => `${N.words(+a)} łamane przez ${N.words(+b)}`);
  t = t.replace(/\b(\d+) m²/g, (m, n) => `${N.words(+n)} metrów kwadratowych`);
  t = t.replace(/\b(\d+) kg\b/g, (m, n) => `${N.words(+n)} kilogramów`);
  t = t.replace(/\bsp\. z o\.o\./g, 'spółka z ograniczoną odpowiedzialnością');
  t = t.replace(/\bZmiana I:/g, 'Zmiana pierwsza:').replace(/\bZmiana II:/g, 'Zmiana druga:');
  t = t.replace(/\bzmiana I\b/g, 'zmiana pierwsza').replace(/\bzmiana II\b/g, 'zmiana druga');
  // Numbered rules: "1. Na terenie" -> "Punkt pierwszy. Na terenie".
  t = t.replace(/(^|\s)(\d)\. (?=\p{Lu})/gu, (m, sp, n) => `${sp}Punkt ${ORD_NOM_M[+n]}. `);
  // Any other number: plain words.
  t = t.replace(/\b\d+\b/g, (n) => N.words(+n));
  return t.replace(/ +/g, ' ').replace(/ \./g, '.').trim();
}

// Texts the rules cannot read naturally: hand-written spoken versions.
const OVERRIDES = {
  L4: 'el cztery',
  '22,50 zł': 'dwadzieścia dwa złote pięćdziesiąt groszy',
  '1500 zł + media': 'tysiąc pięćset złotych plus media',
  'opieka 24h': 'opieka całodobowa',
  '38°C': 'trzydzieści osiem stopni Celsjusza',
  'OB.123.45': 'o be, sto dwadzieścia trzy, czterdzieści pięć',
  'Tak, świeci się czerwona lampka, a na wyświetlaczu jest napis E01.': 'Tak, świeci się czerwona lampka, a na wyświetlaczu jest napis e zero jeden.',
  'Promocja! Kawa + ciasto = 18 zł (od poniedziałku do piątku, od 14:00 do 17:00). Płatność kartą lub gotówką.':
    'Promocja! Kawa i ciasto za osiemnaście złotych, od poniedziałku do piątku, od czternastej do siedemnastej. Płatność kartą lub gotówką.',
  'Grafik pracy – magazyn „Sosna”, tydzień 42. Zmiana I: 6:00–14:00. Zmiana II: 14:00–22:00.':
    'Grafik pracy – magazyn „Sosna”, tydzień czterdziesty drugi. Zmiana pierwsza: od szóstej do czternastej. Zmiana druga: od czternastej do dwudziestej drugiej.',
  'Sklep odzieżowy „Moda dla Wszystkich”, ul. Długa 15, Poznań. PARAGON FISKALNY, 24.10.2026, godz. 17:32.':
    'Sklep odzieżowy „Moda dla Wszystkich”, ulica Długa piętnaście, Poznań. Paragon fiskalny, dwudziestego czwartego października dwa tysiące dwudziestego szóstego roku, godzina siedemnasta trzydzieści dwie.',
  'Kurtka zimowa, rozmiar L – 1 szt. × 249,00 = 249,00. Sweter szary, rozmiar M – 1 szt. × 89,99 = 89,99. Skarpetki (3 pary) – 1 szt. × 19,99 = 19,99.':
    'Kurtka zimowa, rozmiar L, jedna sztuka, dwieście czterdzieści dziewięć złotych. Sweter szary, rozmiar M, jedna sztuka, osiemdziesiąt dziewięć złotych dziewięćdziesiąt dziewięć groszy. Skarpetki, trzy pary, jedna sztuka, dziewiętnaście złotych dziewięćdziesiąt dziewięć groszy.',
  'SUMA PLN 358,98. Zapłacono kartą. Dziękujemy za zakupy!':
    'Suma: trzysta pięćdziesiąt osiem złotych dziewięćdziesiąt osiem groszy. Zapłacono kartą. Dziękujemy za zakupy!',
  'Prognoza pogody na weekend. W sobotę na północy Polski będzie pochmurno i wietrznie. Temperatura: od 8 do 11 stopni.':
    'Prognoza pogody na weekend. W sobotę na północy Polski będzie pochmurno i wietrznie. Temperatura: od ośmiu do jedenastu stopni.',
  'W centrum kraju, w Warszawie i w Łodzi, rano będzie mgła, a po południu wyjdzie słońce. Będzie około 12 stopni.':
    'W centrum kraju, w Warszawie i w Łodzi, rano będzie mgła, a po południu wyjdzie słońce. Będzie około dwunastu stopni.',
  'Typowe objawy grypy to wysoka gorączka (powyżej 38°C), dreszcze, ból głowy, ból mięśni i silne zmęczenie. Często pojawia się też suchy kaszel. Chory człowiek czuje się tak źle, że nie może pracować ani normalnie funkcjonować.':
    'Typowe objawy grypy to wysoka gorączka, powyżej trzydziestu ośmiu stopni, dreszcze, ból głowy, ból mięśni i silne zmęczenie. Często pojawia się też suchy kaszel. Chory człowiek czuje się tak źle, że nie może pracować ani normalnie funkcjonować.',
  'Czynsz wynosi 2200 zł miesięcznie. Do tego dochodzą opłaty za prąd i gaz według zużycia, około 200–250 zł miesięcznie. Przy podpisaniu umowy wymagana jest kaucja w wysokości jednego czynszu. Kaucja zostanie zwrócona po zakończeniu najmu, jeżeli mieszkanie nie będzie zniszczone.':
    'Czynsz wynosi dwa tysiące dwieście złotych miesięcznie. Do tego dochodzą opłaty za prąd i gaz według zużycia, około dwustu do dwustu pięćdziesięciu złotych miesięcznie. Przy podpisaniu umowy wymagana jest kaucja w wysokości jednego czynszu. Kaucja zostanie zwrócona po zakończeniu najmu, jeżeli mieszkanie nie będzie zniszczone.',
};

// Abbreviations in the reading texts (data/reading-gloss.js): "zł" is said "złotych".
const rctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'data', 'reading-gloss.js'), 'utf8'), rctx);
Object.assign(OVERRIDES, rctx.window.SLOWKA_READING_SAY || {});

module.exports = (text) => (Object.prototype.hasOwnProperty.call(OVERRIDES, text) ? OVERRIDES[text] : /\d|§|ul\.|tel\.|sp\. z/.test(text) ? spoken(text) : text);

if (require.main === module) {
  // node tools/spoken.js: show every text the rules change, for checking by eye.
  const said = module.exports;
  const items = JSON.parse(fs.readFileSync(0, 'utf8'));
  for (const { text } of items) { const s = said(text); if (s !== text) console.log(`${text}\n  → ${s}\n`); }
}
