# Słówka

A complete Polish course for Nepali and English speakers, from the alphabet up to B2.
It works fully offline, with no AI, no account and no server. Everything is in this repository.

पोलिस भाषा सुरुदेखि सिक्ने कोर्स: वर्णमाला, उच्चारण, व्याकरण, संवाद, पढाइ र परीक्षा तयारी, अंग्रेजी र नेपाली व्याख्यासहित। इन्टरनेट, AI वा खाता बिना चल्छ।

## How it works

- **Home** shows today's plan: your daily review, the next lesson with your teacher, and a conversation or text at your level.
- **Course** is divided into clear levels: Start (alphabet and sounds) → A1 → A2 → B1 → B2, plus Polish for work. Each level lists what you will be able to do.
- **Lessons with your teacher**: every unit is taught step by step, like a class: short explanations one at a time, new words one by one (listen, slow, repeat, say it), a quick check, sentences, the dialogue line by line, grammar exercises, dictation and a summary. The app remembers where you stopped.
- **Practice** groups every tool by skill: vocabulary, grammar, pronunciation, real life and tests.
- **Revision lessons** after every 5 lessons mix words, listening, grammar, dictation and speaking from those lessons, so nothing is forgotten.
- **Level tests** at the end of each level (Start, A1, A2, B1, B2): score 70% to pass and get a course certificate (not an official state certificate).
- **Numbers trainer**: numbers, prices (*dwa złote* / *pięć złotych*), times (*o siódmej trzydzieści*), dates (*piętnastego maja*) and phone numbers, generated from Polish rules so practice never runs out.
- **Listening**: 20 phone calls, voicemails, announcements and conversations (A1–B2) at natural speed, with questions; the transcript appears after you answer.
- **Placement auto-start**: after the placement test, lessons below your level are marked as known and you start at the right lesson.
- **Badges** for lessons, streaks, words learned, conversations, listening, sounds and certificates.
- **Weak-spot report** (Progress → report): the words you keep forgetting, the grammar topics, cases and tenses you get wrong most, the sounds you find hardest, and your skill scores, each with a button to practise it.
- **Pronunciation help everywhere**: words split into syllable blocks with the stressed one highlighted (English letters and Devanagari), tips for the hard letters in each word, slow playback, and native recordings from Wiktionary and Lingua Libre.
- **Built-in audio for everything**: every word, sentence, dialogue line, story, verb form, case sentence and number the app can read aloud has its own recording in the app (native speakers where available, otherwise a natural Polish voice generated once with Piper), so it sounds the same on every phone, also offline, even without a Polish voice installed.
- **Your turn (speaking)**: play one person in any of the 56 lesson dialogues or 20 listening dialogues. You see what to say in English and Nepali, say it in Polish, check it with speech recognition and hear the right way; or repeat every line after the speaker (shadowing).
- **Recall in daily review**: words you already know a little are asked the other way round, from the meaning (say it or write it) or from sound, which builds much stronger memory than recognising them.
- **My words**: add Polish words from your own life (work, signs, letters). The app writes the pronunciation in English letters and Devanagari by itself, reads them aloud and brings them back in your daily review and every practice mode.

## What's inside

**Course (56 units, 1,200+ words and sentences)**
- **Start here**: the 32-letter alphabet, letter pairs, soft sounds, nasal vowels, stress and reading rules.
- **A1 → A2 → B1 → B2**: everyday topics and all core grammar (gender, the seven cases, tenses, aspect, the imperative, the conditional, verbs of motion, participles, formal Polish).
- **Polish for work**: warehouse, construction, factory, restaurant and hotel, cleaning, driving, care work, farming.

Every unit has a lesson in English and Nepali with grammar tables, words and sentences (meaning in English and Nepali, pronunciation in English letters and Devanagari), and a dialogue.

**Practice in every unit**
- **Cards**: spaced-repetition flashcards.
- **Quiz** and **Listen**: multiple choice from text or sound.
- **Speak**: say the word and the app checks it with your browser's speech recognition, or record yourself and compare with the model.
- **Type**: write the Polish, with keys for ą ć ę ł ń ó ś ź ż.
- **Grammar**: 550 exercises (choose the form, fill the gap, build the sentence). Every wrong answer gets an explanation in English and Nepali, including targeted explanations for common mistakes.

**Beyond the units**
- **Conversations**: 20 real-life role-plays (café, doctor, supervisor, office for foreigners, landlord, bank, job interview…). Choose, type or speak your reply; wrong replies are explained.
- **Reading**: 22 stories and real-life texts (SMS from a boss, notices, receipts, a contract, news) with tap-to-translate words and comprehension questions.
- **Exam prep**: a 30-question placement test and two full B1 certificate practice tests (listening, reading, grammar, writing with model answers).
- **My mistakes**: every grammar mistake is saved with its explanation, to practise again.
- **Daily review**: words come back after 1, 2, 4, 7 and 14 days.
- **Progress**: streak, daily goal, activity chart and level-by-level progress.
- **Verb trainer**: 97 verbs with full tables (present, past for men and women, future, commands) and typing practice.
- **Case trainer**: the 7 cases explained with Nepali comparisons, 60 nouns with full singular and plural tables, and practice in real sentences that names the case you used by mistake.
- **Sounds lab**: 10 sound contrasts that are hard for Nepali speakers (sz/ś, cz/ć, y/i, ą/o, l/ł…), with mouth diagrams, tips and a minimal-pair listening game.
- **Dictation** in every unit: hear a sentence, write it, and see each word marked.
- **Review mode for native speakers**: mark each line of a unit as correct or wrong and send the corrections as a GitHub issue (Settings → Native speakers).
- **Dictionary** in Polish, English or Nepali, and an **alphabet** reference.
- **Settings**: meanings, pronunciation and explanations in English, Nepali or both; slow speech; daily goal; a **backup code** to move progress to another device.
- **Report a mistake** links open a pre-filled GitHub issue.
- **Installable and offline**: add it to your phone's home screen; it keeps working without internet.

## Run it

There's no build step. Serve the folder with any web server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

Opening `index.html` directly also works, but offline mode and the microphone need a web server (or GitHub Pages).

## Publish it free on GitHub Pages

1. Merge this into the `main` branch.
2. In the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` checks the content and publishes the app at `https://<your-username>.github.io/<repository>/` on every push to `main`.

## Native-speaker audio (optional)

The Listen buttons use your device's Polish voice. To add real recordings by native speakers from
[Wiktionary](https://www.wiktionary.org) and [Lingua Libre](https://lingualibre.org) (free licences, credited in `audio/ATTRIBUTION.md`):

```sh
node tools/fetch-audio.js          # needs Node 18+, ffmpeg and internet access to Wikimedia
```

The files are saved in `audio/` and used automatically, offline. Words without a recording keep using the device voice.

## Built-in speech for everything else

The **Generate speech** workflow (Actions tab → Generate speech → Run workflow) lists every Polish text the
app can read aloud (`tools/list-texts.js`), records each one that has no native recording with the free
offline voices of [Piper](https://github.com/OHF-Voice/piper1-gpl) (`tools/gen-speech.py`), plays every
clip to an offline Polish speech recognizer to check it is understandable (`tools/check-speech.py`,
results in `audio/tts/QUALITY.md`), commits the MP3s and republishes the site. Run it again after
adding content; existing clips are kept. Nothing runs at app time: the app just plays files.

## Test everything

`tools/e2e.js` tests the whole app in a real browser: every page on phone and desktop, every lesson tab, every grammar exercise, conversation, text, listening task, exam, revision, level test and trainer (answered with the correct answers), settings, backup and offline use.

```sh
npm install --no-save playwright
python3 -m http.server 8790 &
node tools/e2e.js http://localhost:8790/
```

## Add or edit content

All content is plain data in `data/*.js`:

| File | What |
|---|---|
| `start.js`, `a1-*.js`, `a2-*.js`, `b1-*.js`, `b2.js`, `work.js` | units: lessons, words, sentences, dialogues |
| `drills-*.js` | grammar exercises for each unit |
| `roleplays-*.js` | conversations |
| `stories-*.js` | reading texts |
| `exams.js` | placement test and B1 practice tests |
| `verbs-*.js` | verb tables |
| `cases.js` | case guide, noun tables and practice sentences |
| `sounds.js` | sound contrasts and minimal pairs |

The formats are described in [`tools/CONTENT_GUIDE.md`](tools/CONTENT_GUIDE.md) and [`tools/PRACTICE_GUIDE.md`](tools/PRACTICE_GUIDE.md). Check your changes with:

```sh
node tools/validate.js
```

The content was written with AI help and checked automatically. A review by native Polish and Nepali speakers is welcome: use the "Report a mistake" links or open an issue.
