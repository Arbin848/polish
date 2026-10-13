# Słówka content guide

Course content lives in `data/*.js`. Each file adds units to a global list:

```js
window.SLOWKA_COURSE = window.SLOWKA_COURSE || [];
window.SLOWKA_COURSE.push(
  { /* unit */ },
  { /* unit */ }
);
```

Run `node tools/validate.js data/<file>.js` after every change. It must print "All good".

The learner speaks **Nepali** and some **English** and is starting Polish from zero.
Many Nepali learners are going to Poland to work, so practical, everyday,
work-and-life-in-Poland language is especially valuable.

## Unit shape

```js
{
  id: "a1-03",                 // level prefix + two-digit number, unique
  level: "A1",                 // "Start" | "A1" | "A2" | "B1" | "B2"
  title: "Numbers 0–20",
  titleNe: "अंकहरू ०–२०",
  summary: "Count, say your phone number and ask how many.",   // one sentence
  summaryNe: "गन्न, फोन नम्बर भन्न र कति भनेर सोध्न सिक्नुहोस्।",
  lesson: [                    // 3–6 paragraphs, each in English AND Nepali
    { en: "…", ne: "…" }
  ],
  tables: [                    // optional; grammar/conjugation tables
    { title: "być — to be", titleNe: "być — हुनु", head: ["Person", "Polish", "English"], rows: [["I", "*ja jestem*", "I am"]] }
  ],
  words:   [ [pl, en, ne, pron, proNe], … ],   // 12–18 vocabulary items
  phrases: [ [pl, en, ne, pron, proNe], … ],   // 5–8 example sentences using the unit's words/grammar
  dialogue: [ [speaker, pl, en, ne], … ]      // 4–8 lines, a short realistic conversation (optional but strongly preferred)
}
```

### Text markup (lesson paragraphs and table cells only)

- `*słowo*` marks a Polish word or phrase (shown highlighted).
- `**bold**` for emphasis.
- No HTML.

### Writing the lessons

- Explain like a patient teacher talking to a complete beginner. Short sentences.
- The `ne` text is a natural Nepali explanation of the same point (not a word-for-word translation). Use simple, everyday Nepali in Devanagari. Polish words inside Nepali text stay in Latin script with `*…*`.
- Each lesson should teach a real rule or pattern, give examples, and mention one common mistake or tip.
- Compare with Nepali where it genuinely helps (e.g. Polish, like Nepali, often drops the pronoun: *jestem* = "म हुँ"; Polish word order is flexible; Nepali also has formal/informal "you" like Pan/Pani vs ty ≈ तपाईं vs तिमी).

## Entry fields

`[pl, en, ne, pron, proNe]`

| field | what | example |
|---|---|---|
| `pl` | Polish, correct spelling with all diacritics, lowercase unless a proper noun | `dzień dobry` |
| `en` | short English meaning; add `(formal)`, `(m)`, `(f)`, `(informal)` etc. when it matters | `good morning / hello (formal)` |
| `ne` | short Nepali meaning in Devanagari | `शुभ प्रभात / नमस्ते (औपचारिक)` |
| `pron` | English-letter pronunciation, syllables split with `-`, **stressed syllable in CAPITALS**, words separated by spaces. One-syllable words are lowercase. | `jen DOB-ri` |
| `proNe` | Devanagari pronunciation, syllables split with `-`, stressed syllable preceded by `ˈ` (when a word has 2+ syllables) | `जेन् ˈदोब्-रि` |

Stress: Polish stresses the **second-to-last syllable** almost always. Exceptions worth knowing: past-tense forms like *byliśmy* (BI-lish-mi), conditional *zrobiłbym*, and words in *-yka/-ika* such as *muzyka* (MOO-zi-ka), *fabryka* (FA-bri-ka) and *matematyka* (ma-teh-MA-ti-ka), which stress the third-to-last syllable in standard Polish. Write what the learner should actually say.

Pronunciation must reflect the **real sound**, not the spelling: final consonants devoice (*chleb* → hlep, *mąż* → monsh), *w* after voiceless consonants becomes f (*twój* → tfooy), *ó* = u, nasal *ę* at the end of a word is just "eh".

### English-letter pronunciation conventions (`pron`)

| Polish | write | Polish | write |
|---|---|---|---|
| a | a / ah | ą | on (om before p/b) |
| e | eh / e | ę | en (em before p/b), final ę → eh |
| i | ee | y | i (as in "bit") |
| o | o | u, ó | oo |
| c | ts | ch, h | h |
| cz | ch | ć, ci | ch |
| sz | sh | ś, si | sh |
| rz, ż | zh | ź, zi | zh |
| dz | dz | dź, dzi, dż | j |
| j | y | ł | w |
| w | v (f when devoiced) | ń, ni | ny |
| g | g (always hard) | r | r (rolled) |

### Devanagari pronunciation conventions (`proNe`)

Write how a Nepali speaker should say it. Use these consistently:

| Polish | Devanagari | Polish | Devanagari |
|---|---|---|---|
| a | आ (or ा) | ą | ओं / ओम् before p,b |
| e | ए (े) | ę | एं / एम् before p,b; final ę → ए |
| i | इ (ि) | y | इ (ि) — sounds between इ and उ |
| o | ओ (ो) | u, ó | उ (ु) |
| b | ब | p | प |
| c | त्स | cz | च |
| ć, ci | च्य़ → just use च (soft) | ch, h | ह |
| d | द | t | त |
| dz | द्ज़ | dź, dzi, dż | ज |
| f | फ़ | w | भ (व also acceptable; be consistent: use भ) |
| g | ग | k | क |
| j | य | ł | व |
| l | ल | r | र |
| m | म | n | न |
| ń, ni | न्य (or ञ before vowel: use न्य) | s | स |
| sz | श | ś, si | श (soft) |
| z | ज़ | rz, ż | झ़ (use झ) |
| ź, zi | झ (soft) | | |

- Use halant (्) for consonant clusters and word-final consonants: *chleb* → `ह्लेप्`, *dzień* → `जेन्य्`.
- Polish vowels are short and pure: do not write long ई/ऊ; use इ, उ.
- Examples: *cześć* → `चेश्च्`, *dziękuję* → `जेन्-ˈकु-ये`, *przepraszam* → `प्शे-ˈप्रा-शाम्`, *dobry wieczór* → `ˈदोब्-रि ˈभ्ये-चुर्`, *woda* → `ˈभो-दा`, *miło mi* → `ˈमि-वो मि`.

## Quality bar

- Every Polish form must be correct (spelling, case endings, gender agreement). If unsure, choose a simpler example you are sure of.
- Nepali must be natural and correct.
- Prefer the most common, useful words. No duplicates within a unit.
- Phrases are full, natural sentences a learner would really use.
- Keep `en` and `ne` meanings short (they appear on flashcards).
