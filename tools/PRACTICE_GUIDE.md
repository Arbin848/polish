# Słówka practice content guide

This extends `tools/CONTENT_GUIDE.md` (read that first: audience, pronunciation conventions, quality bar).
Everything here is **fixed, hand-written content**. The app never calls an AI, so every explanation a
learner might need must be written into the data. Write explanations the way a kind, clear teacher
would: say what is wrong, why, and what the right form is. Always give both `en` and `ne`.

Validate after every change: `node tools/validate.js data/<file>.js` must print "All good".

Entries use the same five-field shape as the course: `[pl, en, ne, pron, proNe]`.

Strings use double quotes. Polish inside explanations is marked with `*…*` (as in lessons).

---

## 1. Grammar drills — `window.SLOWKA_DRILLS`

```js
window.SLOWKA_DRILLS = window.SLOWKA_DRILLS || {};
window.SLOWKA_DRILLS["a1-05"] = [ /* 10–12 items */ ];
```

Keys are unit ids from `data/*.js`. Each unit gets **10–12 items**: about 4 `choose`, 4–5 `fill`, 2–3 `order`.
Drills must practise **that unit's grammar and words** (open the unit file and read it first). Start-level
units practise sounds and spelling (which letter makes this sound, which spelling is right, stress).

### choose — pick the right form
```js
{ type: "choose",
  q: "To jest ___ mama.",                     // exactly one ___
  options: ["moja", "mój", "moje"],           // 2–4 options, all plausible
  answer: 0,                                  // index of the right option
  en: "This is my mum.", ne: "यो मेरी आमा हुनुहुन्छ।",   // translation of the full correct sentence
  why: { en: "*mama* ends in -a, so it is feminine: use *moja*.", ne: "*mama* -a मा टुंगिन्छ, त्यसैले स्त्रीलिङ्ग हो: *moja* प्रयोग गर्नुहोस्।" } }
```

### fill — type the missing word
```js
{ type: "fill",
  q: "Mam brata i ___. (siostra)",            // exactly one ___; base form in brackets at the end
  answer: ["siostrę"],                        // every accepted answer, correct spelling
  en: "I have a brother and a sister.", ne: "मेरो एक दाजु/भाइ र एक दिदी/बहिनी छन्।",
  why: { en: "After *mam* (I have) a feminine noun takes the accusative: -a → -ę.", ne: "…" },
  traps: {                                    // OPTIONAL but strongly wanted: likely wrong answers → targeted explanation
    "siostra": { en: "*siostra* is the dictionary form. After *mam* it must change to *siostrę*.", ne: "…" },
    "siostry": { en: "*siostry* is genitive (used after *nie mam*). Here you have one, so: *siostrę*.", ne: "…" } } }
```
Write 1–3 `traps` per fill item for the mistakes learners really make (dictionary form, wrong case,
wrong gender, missing diacritics are handled automatically — don't add those).

### order — put the words in order
```js
{ type: "order",
  words: ["Nie", "mam", "dzisiaj", "czasu."],  // 3–8 tokens IN THE CORRECT ORDER; app shuffles them
  en: "I don't have time today.", ne: "आज मसँग समय छैन।",
  why: { en: "*nie* goes directly before the verb.", ne: "*nie* क्रियाको ठीक अगाडि आउँछ।" } }
```
Pick sentences with one clearly natural order (Polish word order is flexible, so avoid ambiguous ones).
If another order is also natural, list it in `alts: ["…"]` (same words, other order) so it is accepted.
Punctuation stays attached to the last token. Capitalise the first token.

---

## 2. Conversation practice (role-plays) — `window.SLOWKA_ROLEPLAYS`

```js
window.SLOWKA_ROLEPLAYS = window.SLOWKA_ROLEPLAYS || [];
window.SLOWKA_ROLEPLAYS.push({
  id: "rp-a1-cafe",                 // "rp-" + level + "-" + slug, unique
  level: "A1",                      // A1 | A2 | B1 | B2
  title: "Ordering at a café", titleNe: "क्याफेमा अर्डर गर्दै",
  scene: { en: "You walk into a small café in Warsaw. You want a coffee with milk and a cake.",
           ne: "तपाईं वार्सामा एउटा सानो क्याफेमा पस्नुहुन्छ। तपाईंलाई दूधसहितको कफी र केक चाहिएको छ।" },
  them: "Kelnerka",                 // who you talk to (Polish word for the role, or a first name)
  themEn: "Waitress", themNe: "वेट्रेस",
  steps: [                          // 6–9 steps
    { them: ["Dzień dobry! Co podać?", "Hello! What can I get you?", "नमस्ते! के ल्याऊँ?"],
      replies: [                    // exactly 3 replies; 1 or 2 have ok:true
        { pl: "Poproszę kawę z mlekiem.", en: "A coffee with milk, please.", ne: "दूधसहितको कफी दिनुहोस्।", ok: true },
        { pl: "Poproszę kawa z mleko.", en: "(wrong forms)", ne: "(गलत रूप)", ok: false,
          why: { en: "After *poproszę*, *kawa* becomes *kawę*, and after *z* (with), *mleko* becomes *mlekiem*.", ne: "…" } },
        { pl: "Do widzenia!", en: "Goodbye!", ne: "बिदा!", ok: false,
          why: { en: "*Do widzenia* means goodbye. You have only just arrived.", ne: "…" } } ] },
    …
  ],
  end: { en: "Well done! You ordered, paid and said goodbye politely.", ne: "…" },
  useful: [ [pl, en, ne, pron, proNe], … ]   // 5–8 key phrases from this conversation
});
```
Wrong replies should teach something: a grammar slip a learner would really make, a wrong politeness level
(using *ty* with an official), or a reply that doesn't fit the situation. Each `why` explains it clearly.
The conversation should flow as a realistic exchange regardless of which correct reply was chosen.
Practical, real-life Poland situations for Nepali workers are the priority.

---

## 3. Reading — `window.SLOWKA_STORIES`

```js
window.SLOWKA_STORIES = window.SLOWKA_STORIES || [];
window.SLOWKA_STORIES.push({
  id: "st-a1-01", level: "A1",       // A1 | A2 | B1 | B2
  kind: "story",                     // story | message | notice | document | article | email
  title: "Ram's first day", titleNe: "रामको पहिलो दिन",
  paragraphs: [                      // 3–6 paragraphs; A1 short and simple, B2 longer and richer
    { pl: "Ram jest z Nepalu. …", en: "Ram is from Nepal. …", ne: "राम नेपालबाट हुनुहुन्छ। …" } ],
  glossary: [ [pl, en, ne, pron, proNe], … ],   // 10–20 words AS THEY APPEAR IN THE TEXT (inflected forms), lowercase
  questions: [                       // 3–5 comprehension questions, in Polish
    { q: "Skąd jest Ram?", en: "Where is Ram from?", ne: "राम कहाँबाट हुनुहुन्छ?",
      options: ["Z Nepalu.", "Z Polski.", "Z Indii."], answer: 0,
      why: { en: "The first sentence says *Ram jest z Nepalu*.", ne: "…" } } ]
});
```
`message`/`notice`/`document`/`email` are realistic texts a worker in Poland meets: an SMS from a boss,
a notice in the stairwell, a shift schedule, a receipt, a rental advert, a contract excerpt, a letter from an office.
Keep names and places realistic but fictional (no real companies or people).

---

## 4. Exams and placement — `window.SLOWKA_PLACEMENT`, `window.SLOWKA_EXAMS`

```js
window.SLOWKA_PLACEMENT = [          // exactly 30 items: 6 Start/A1-basic, 6 A1, 6 A2, 6 B1, 6 B2, in that order
  { level: "A1", q: "___ jest Anna.", en: "This is Anna.", ne: "यो आन्ना हो।", options: ["To", "Ta", "Ten"], answer: 0 } ];

window.SLOWKA_EXAMS = [ {
  id: "b1-practice-1", level: "B1",
  title: "B1 practice test 1", titleNe: "B1 अभ्यास परीक्षा १",
  intro: { en: "…what the real exam is like and how to use this test…", ne: "…" },
  sections: [
    { kind: "listening", title: "Listening", titleNe: "सुनाइ",
      items: [ { audio: "Polish text the app will read aloud (2–5 sentences)",
                 en: "translation of the audio", ne: "…",
                 q: "Polish question", qEn: "…", qNe: "…",
                 options: ["…", "…", "…"], answer: 1, why: { en: "…", ne: "…" } } ] },   // 5 items
    { kind: "reading", title: "Reading", titleNe: "पढाइ",
      text: { pl: "…", en: "…", ne: "…" },
      items: [ { q, qEn, qNe, options, answer, why } ] },                                // 5 items
    { kind: "grammar", title: "Grammar", titleNe: "व्याकरण",
      items: [ { q: "sentence with ___", en, ne, options, answer, why } ] },             // 10 items
    { kind: "writing", title: "Writing", titleNe: "लेखाइ",
      tasks: [ { prompt: { pl: "…", en: "…", ne: "…" }, minWords: 60,
                 model: { pl: "model answer", en: "…", ne: "…" },
                 checklist: [ { en: "Did you greet the reader politely?", ne: "…" } ] } ] }   // 2 tasks, 4–6 checklist points each
  ] } ];
```
Exam questions are in Polish like the real *egzamin certyfikatowy*; translations help learners check themselves.

---

## 5. Work word packs

Work packs are ordinary course units (same shape as in `CONTENT_GUIDE.md`) with `level: "Work"` and ids
`work-01`…. They may have up to 25 words. Lessons explain the job context, safety rules and the most
important phrases in English and Nepali.

---

## 6. Verbs — `window.SLOWKA_VERBS`

```js
window.SLOWKA_VERBS = window.SLOWKA_VERBS || [];
window.SLOWKA_VERBS.push({
  inf: "mówić", en: "to speak", ne: "बोल्नु",
  level: "A1",                     // A1 | A2 | B1 | B2 (when a learner needs it)
  aspect: "impf",                  // "impf" (imperfective) | "pf" (perfective)
  pair: "powiedzieć",              // the aspect partner's infinitive, or "" if none
  group: "-ić/-yć: -ę, -isz",      // short conjugation pattern label (same label for verbs that conjugate alike)
  present: ["mówię", "mówisz", "mówi", "mówimy", "mówicie", "mówią"],   // ja, ty, on/ona, my, wy, oni/one; null for perfective verbs
  past: {
    m: ["mówiłem", "mówiłeś", "mówił", "mówiliśmy", "mówiliście", "mówili"],
    f: ["mówiłam", "mówiłaś", "mówiła", "mówiłyśmy", "mówiłyście", "mówiły"]
  },
  future: ["będę mówić", "będziesz mówić", "będzie mówić", "będziemy mówić", "będziecie mówić", "będą mówić"],
                                   // imperfective: będę + infinitive; perfective: the simple future (powiem, powiesz…)
  imperative: { ty: "mów", my: "mówmy", wy: "mówcie" },
  note: { en: "…", ne: "…" }       // OPTIONAL: an irregularity or tip worth knowing
});
```
All forms in lowercase with correct diacritics. Past plural "m" = masculine-personal (men or mixed group), "f" = everything else.

## 7. Nouns and cases — `window.SLOWKA_NOUNS`, `window.SLOWKA_CASES`, `window.SLOWKA_CASE_FRAMES`

```js
window.SLOWKA_CASES = {            // exactly these 7 keys
  nom: { name: "Nominative", pl: "mianownik", ne: "कर्ता", q: "kto? co?", use: { en: "…", ne: "…" } },
  gen: …, dat: …, acc: …, ins: …, loc: …, voc: …
};

window.SLOWKA_NOUNS = window.SLOWKA_NOUNS || [];
window.SLOWKA_NOUNS.push({
  word: "kawa", en: "coffee", ne: "कफी", level: "A1",
  gender: "f",                     // "m-pers" (male person) | "m-anim" (animal) | "m-inan" | "f" | "n"
  person: false,                   // true for people (used to pick sentence frames)
  abstract: true,                  // OPTIONAL: time words and names (rok, noc, Polska) — practised only in locative "about" frames
  sg: { nom: "kawa", gen: "kawy", dat: "kawie", acc: "kawę", ins: "kawą", loc: "kawie", voc: "kawo" },
  pl: { nom: "kawy", gen: "kaw", dat: "kawom", acc: "kawy", ins: "kawami", loc: "kawach", voc: "kawy" }   // or null if not normally plural
});

window.SLOWKA_CASE_FRAMES = [      // sentence frames used to practise one case; ___ is the noun
  { case: "gen", number: "sg", who: "any",    q: "Nie ma ___.",  en: "There is no …", ne: "… छैन।" },
  { case: "dat", number: "sg", who: "person", q: "Daję prezent ___.", en: "I give a present to …", ne: "म …लाई उपहार दिन्छु।" }
];
// who: "any" | "person" | "thing". Frames must be grammatical for EVERY noun they can apply to.
// No frames for "nom". Use "…" in en/ne where the noun goes.
```

## 8. Sounds — `window.SLOWKA_SOUNDS`

```js
window.SLOWKA_SOUNDS = [{
  id: "sz-s", title: "sz or ś", titleNe: "sz कि ś",
  a: { label: "sz", mouth: "retro" },     // mouth: "retro" (tongue tip up and back: sz, cz, rz/ż, dż)
  b: { label: "ś",  mouth: "palatal" },   //        "palatal" (tongue middle raised, lips spread: ś, ć, ź, dź, ń)
                                          //        "dental" (tongue tip behind teeth: s, c, z, dz, t, d)
                                          //        "back" (back of tongue raised: k, g, ch/h)
                                          //        "nasal" (air through the nose: ą, ę)
                                          //        "front-vowel" (i), "mid-vowel" (y), "round" (u/ó, o)
  tip: { en: "how to make each sound, for a Nepali speaker", ne: "…" },
  pairs: [ [ ["kasza", "porridge", "दलिया"], ["Kasia", "Kasia (a name)", "कासिया (नाम)"] ], … ]   // 5–8 real word pairs
}];
```

---

## 9. Listening — `window.SLOWKA_LISTENING`

Audio-first practice: the app reads the lines aloud (each speaker with a slightly different voice) and hides the text until the learner has answered.

```js
window.SLOWKA_LISTENING = window.SLOWKA_LISTENING || [];
window.SLOWKA_LISTENING.push({
  id: "ls-a1-01", level: "A1",            // A1 | A2 | B1 | B2
  type: "phone",                           // phone | voicemail | announcement | conversation | radio
  title: "A call from the warehouse", titleNe: "गोदामबाट फोन",
  context: { en: "Your supervisor calls you on Sunday evening.", ne: "आइतबार बेलुका तपाईंको सुपरभाइजरले फोन गर्छन्।" },
  lines: [ ["Kierownik", "Dzień dobry, tu Marek z magazynu.", "Hello, this is Marek from the warehouse.", "नमस्ते, म गोदामबाट मारेक बोल्दैछु।"], … ],   // 4–12 lines; one speaker for voicemail/announcement
  questions: [ { q: "Kto dzwoni?", en: "Who is calling?", ne: "को फोन गर्दैछ?", options: ["…", "…", "…"], answer: 0,
                 why: { en: "He says *tu Marek z magazynu*.", ne: "…" } } ]   // 3–4 questions, in Polish
});
```
Use realistic, natural spoken Polish at the level (A1 slow and simple; B2 natural and fast, with fillers like *no*, *wie Pan*, *znaczy*). Numbers, times and dates are written as WORDS in `lines` so the speech engine reads them correctly. Fictional people and companies.
