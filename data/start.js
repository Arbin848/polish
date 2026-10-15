// Level "Start": alphabet, sounds and reading for absolute beginners.

window.SLOWKA_ALPHABET = [
  { letter: "A a", name: "a", say: "a", namePron: "a", nameNe: "आ", soundEn: "short 'a' as in 'father'", soundNe: "छोटो 'आ'", example: "mama", exampleEn: "mum", exampleNe: "आमा", pron: "MA-ma", proNe: "ˈमा-मा" },
  { letter: "Ą ą", name: "ą (nasal o)", say: "ą", namePron: "on", nameNe: "ओं", soundEn: "nasal 'on', like French 'bon'", soundNe: "नाकबाट बोलिने 'ओं'", example: "mąż", exampleEn: "husband", exampleNe: "पति", pron: "monsh", proNe: "मोंश्" },
  { letter: "B b", name: "be", say: "be", namePron: "beh", nameNe: "बे", soundEn: "like English b", soundNe: "'ब' जस्तै", example: "brat", exampleEn: "brother", exampleNe: "दाजु / भाइ", pron: "brat", proNe: "ब्रात्" },
  { letter: "C c", name: "ce", say: "ce", namePron: "tseh", nameNe: "त्से", soundEn: "always 'ts' as in 'cats', never k or s", soundNe: "सधैं 'त्स' — 'क' वा 'स' होइन", example: "co", exampleEn: "what", exampleNe: "के", pron: "tso", proNe: "त्सो" },
  { letter: "Ć ć", name: "cie", say: "cie", namePron: "cheh", nameNe: "चे", soundEn: "soft 'ch': smile, middle of the tongue up", soundNe: "नरम 'च' (च्य जस्तो)", example: "być", exampleEn: "to be", exampleNe: "हुनु", pron: "bich", proNe: "बिच्" },
  { letter: "D d", name: "de", say: "de", namePron: "deh", nameNe: "दे", soundEn: "like English d, tongue on the teeth", soundNe: "'द' जस्तै", example: "dom", exampleEn: "house, home", exampleNe: "घर", pron: "dom", proNe: "दोम्" },
  { letter: "E e", name: "e", say: "e", namePron: "eh", nameNe: "ए", soundEn: "short 'e' as in 'bed'", soundNe: "छोटो 'ए'", example: "ser", exampleEn: "cheese", exampleNe: "चिज", pron: "ser", proNe: "सेर्" },
  { letter: "Ę ę", name: "ę (nasal e)", say: "ę", namePron: "en", nameNe: "एं", soundEn: "nasal 'en'; at the end of a word just 'e'", soundNe: "नाकबाट 'एं'; शब्दको अन्त्यमा 'ए' मात्र", example: "ręka", exampleEn: "hand", exampleNe: "हात", pron: "REN-ka", proNe: "ˈरेन्-का" },
  { letter: "F f", name: "ef", say: "ef", namePron: "ef", nameNe: "एफ़्", soundEn: "like English f", soundNe: "'फ़' (अंग्रेजी f जस्तै)", example: "film", exampleEn: "film", exampleNe: "फिल्म", pron: "feelm", proNe: "फ़िल्म्" },
  { letter: "G g", name: "gie", say: "gie", namePron: "gyeh", nameNe: "ग्ये", soundEn: "always hard 'g' as in 'go'", soundNe: "सधैं 'ग'", example: "góra", exampleEn: "mountain", exampleNe: "पहाड", pron: "GOO-ra", proNe: "ˈगु-रा" },
  { letter: "H h", name: "ha", say: "ha", namePron: "ha", nameNe: "हा", soundEn: "'h', a bit stronger, from the throat (same as ch)", soundNe: "'ह' (घाँटीबाट अलि कडा; ch जस्तै)", example: "herbata", exampleEn: "tea", exampleNe: "चिया", pron: "her-BA-ta", proNe: "हेर्-ˈबा-ता" },
  { letter: "I i", name: "i", say: "i", namePron: "ee", nameNe: "इ", soundEn: "'ee' as in 'see', but short", soundNe: "छोटो 'इ'", example: "imię", exampleEn: "first name", exampleNe: "नाम", pron: "EE-myeh", proNe: "ˈइ-म्ये" },
  { letter: "J j", name: "jot", say: "jot", namePron: "yot", nameNe: "योत्", soundEn: "'y' as in 'yes'", soundNe: "'य' जस्तै", example: "jajko", exampleEn: "egg", exampleNe: "अण्डा", pron: "YAY-ko", proNe: "ˈयाय्-को" },
  { letter: "K k", name: "ka", say: "ka", namePron: "ka", nameNe: "का", soundEn: "like English k, without a puff of air", soundNe: "'क' जस्तै ('ख' होइन)", example: "kot", exampleEn: "cat", exampleNe: "बिरालो", pron: "kot", proNe: "कोत्" },
  { letter: "L l", name: "el", say: "el", namePron: "el", nameNe: "एल्", soundEn: "like English l", soundNe: "'ल' जस्तै", example: "lato", exampleEn: "summer", exampleNe: "गर्मी याम", pron: "LA-to", proNe: "ˈला-तो" },
  { letter: "Ł ł", name: "eł", say: "eł", namePron: "ew", nameNe: "एव्", soundEn: "'w' as in 'water'", soundNe: "'व' (अंग्रेजी w जस्तै)", example: "mały", exampleEn: "small", exampleNe: "सानो", pron: "MA-wi", proNe: "ˈमा-वि" },
  { letter: "M m", name: "em", say: "em", namePron: "em", nameNe: "एम्", soundEn: "like English m", soundNe: "'म' जस्तै", example: "miasto", exampleEn: "city, town", exampleNe: "शहर", pron: "MYAS-to", proNe: "ˈम्यास्-तो" },
  { letter: "N n", name: "en", say: "en", namePron: "en", nameNe: "एन्", soundEn: "like English n", soundNe: "'न' जस्तै", example: "nos", exampleEn: "nose", exampleNe: "नाक", pron: "nos", proNe: "नोस्" },
  { letter: "Ń ń", name: "eń", say: "eń", namePron: "eny", nameNe: "एन्य्", soundEn: "soft 'ny' as in 'canyon'", soundNe: "'न्य' (नरम न)", example: "koń", exampleEn: "horse", exampleNe: "घोडा", pron: "kony", proNe: "कोन्य्" },
  { letter: "O o", name: "o", say: "o", namePron: "o", nameNe: "ओ", soundEn: "short 'o' as in British 'hot'", soundNe: "छोटो 'ओ'", example: "okno", exampleEn: "window", exampleNe: "झ्याल", pron: "OK-no", proNe: "ˈओक्-नो" },
  { letter: "Ó ó", name: "o kreskowane", say: "o kreskowane", namePron: "o kres-ko-VA-neh", nameNe: "ओ क्रेस्-को-ˈभा-ने", soundEn: "exactly like u: 'oo' as in 'book'", soundNe: "'उ' — u सँग ठ्याक्कै उस्तै", example: "mój", exampleEn: "my (m)", exampleNe: "मेरो", pron: "mooy", proNe: "मुय्" },
  { letter: "P p", name: "pe", say: "pe", namePron: "peh", nameNe: "पे", soundEn: "like English p, without a puff of air", soundNe: "'प' जस्तै ('फ' होइन)", example: "pies", exampleEn: "dog", exampleNe: "कुकुर", pron: "pyes", proNe: "प्येस्" },
  { letter: "R r", name: "er", say: "er", namePron: "er", nameNe: "एर्", soundEn: "rolled r, the tongue taps", soundNe: "'र' जस्तै (जिब्रो थर्काएर)", example: "ryba", exampleEn: "fish", exampleNe: "माछा", pron: "RI-ba", proNe: "ˈरि-बा" },
  { letter: "S s", name: "es", say: "es", namePron: "es", nameNe: "एस्", soundEn: "always 's' as in 'sun', never z", soundNe: "सधैं 'स'", example: "syn", exampleEn: "son", exampleNe: "छोरा", pron: "sin", proNe: "सिन्" },
  { letter: "Ś ś", name: "eś", say: "eś", namePron: "esh", nameNe: "एश्", soundEn: "soft 'sh': smile, middle of the tongue up", soundNe: "नरम 'श' (श्य जस्तो)", example: "śnieg", exampleEn: "snow", exampleNe: "हिउँ", pron: "shnyek", proNe: "श्न्येक्" },
  { letter: "T t", name: "te", say: "te", namePron: "teh", nameNe: "ते", soundEn: "tongue on the teeth, no puff of air", soundNe: "'त' जस्तै ('ट' वा 'थ' होइन)", example: "tata", exampleEn: "dad", exampleNe: "बुबा", pron: "TA-ta", proNe: "ˈता-ता" },
  { letter: "U u", name: "u", say: "u", namePron: "oo", nameNe: "उ", soundEn: "'oo' as in 'book'", soundNe: "छोटो 'उ'", example: "ucho", exampleEn: "ear", exampleNe: "कान", pron: "OO-ho", proNe: "ˈउ-हो" },
  { letter: "W w", name: "wu", say: "wu", namePron: "voo", nameNe: "भु", soundEn: "like English v", soundNe: "'भ/व' (अंग्रेजी v जस्तै)", example: "woda", exampleEn: "water", exampleNe: "पानी", pron: "VO-da", proNe: "ˈभो-दा" },
  { letter: "Y y", name: "igrek", say: "igrek", namePron: "EE-grek", nameNe: "ˈइ-ग्रेक्", soundEn: "like 'i' in 'bit', between i and u", soundNe: "'इ' र 'उ' को बीचको आवाज", example: "my", exampleEn: "we", exampleNe: "हामी", pron: "mi", proNe: "मि" },
  { letter: "Z z", name: "zet", say: "zet", namePron: "zet", nameNe: "ज़ेत्", soundEn: "'z' as in 'zoo'", soundNe: "'ज़' (अंग्रेजी z जस्तै)", example: "zupa", exampleEn: "soup", exampleNe: "सुप", pron: "ZOO-pa", proNe: "ˈज़ु-पा" },
  { letter: "Ź ź", name: "ziet", say: "ziet", namePron: "zhyet", nameNe: "झ्येत्", soundEn: "soft 'zh': smile, middle of the tongue up", soundNe: "नरम 'झ' (ज़्य जस्तो)", example: "źle", exampleEn: "badly", exampleNe: "नराम्रो गरी", pron: "zhleh", proNe: "झ्ले" },
  { letter: "Ż ż", name: "żet", say: "żet", namePron: "zhet", nameNe: "झेत्", soundEn: "'s' in 'pleasure' (same as rz)", soundNe: "'झ' (अंग्रेजी pleasure को s जस्तै; rz सँग उस्तै)", example: "żona", exampleEn: "wife", exampleNe: "श्रीमती", pron: "ZHO-na", proNe: "ˈझो-ना" }
];

window.SLOWKA_COURSE = window.SLOWKA_COURSE || [];
window.SLOWKA_COURSE.push(
  {
    id: "start-01",
    level: "Start",
    title: "The Polish alphabet",
    titleNe: "पोलिश वर्णमाला",
    summary: "Meet the 32 letters of Polish and learn that it is read exactly as it is written.",
    summaryNe: "पोलिशका ३२ अक्षर चिन्नुहोस् र यो जस्तो लेखिन्छ उस्तै पढिन्छ भन्ने सिक्नुहोस्।",
    lesson: [
      {
        en: "Good news: Polish is read exactly as it is written. Each letter (or letter pair) almost always has the same sound, just like in Nepali Devanagari. English is different: in 'know' you don't say the k. In Polish every letter is spoken. Once you know the letters, you can read any Polish word aloud — even one you have never seen before.",
        ne: "राम्रो खबर: पोलिश जस्तो लेखिन्छ, उस्तै पढिन्छ। नेपाली देवनागरीमा जस्तै, हरेक अक्षर (वा अक्षर जोडी) को प्रायः सधैं एउटै आवाज हुन्छ। अंग्रेजीमा 'know' को k बोलिँदैन, तर पोलिशमा हरेक अक्षर बोलिन्छ। अक्षरहरू चिनेपछि तपाईं कुनै पनि पोलिश शब्द पढ्न सक्नुहुन्छ, अर्थ नजाने पनि।"
      },
      {
        en: "The Polish alphabet has 32 letters. 23 of them look like English letters. 9 are special letters with small marks: *ą ć ę ł ń ó ś ź ż*. The marks are not decoration — they change the sound and the meaning: *sad* means orchard, but *sąd* means court. **Tip:** add a Polish keyboard to your phone so you can type these letters.",
        ne: "पोलिश वर्णमालामा ३२ अक्षर छन्। तीमध्ये २३ वटा अंग्रेजी अक्षर जस्तै देखिन्छन्। ९ वटा विशेष अक्षरमा सानो चिन्ह हुन्छ: *ą ć ę ł ń ó ś ź ż*। यी चिन्ह सजावट होइनन्, यिनले आवाज र अर्थ दुवै बदल्छन्: *sad* भनेको फलफूलको बगैंचा, तर *sąd* भनेको अदालत। **सुझाव:** यी अक्षर लेख्न आफ्नो फोनमा पोलिश किबोर्ड थप्नुहोस्।"
      },
      {
        en: "The letters *q*, *v* and *x* are not part of the Polish alphabet. You only see them in foreign names and words, like *Volvo* or *VAT*. Polish writes these sounds differently: the v sound is *w* (*woda* = water), x is *ks* (*taksówka* = taxi) and qu is *kw*. **Common mistake:** writing *v* instead of *w* in Polish words.",
        ne: "*q*, *v* र *x* पोलिश वर्णमालामा पर्दैनन्। यी अक्षर विदेशी नाम र शब्दमा मात्र देखिन्छन्, जस्तै *Volvo* वा *VAT*। पोलिशमा अंग्रेजी v को आवाज *w* ले लेखिन्छ (*woda* = पानी), x लाई *ks* (*taksówka* = ट्याक्सी) र qu लाई *kw* लेखिन्छ। **सामान्य गल्ती:** पोलिश शब्दमा *w* को सट्टा *v* लेख्नु।"
      },
      {
        en: "Some letters look English but sound different. *c* is always 'ts' (*co* = what), never k or s. *w* is v (*woda*). *j* is y (*jajko* = egg). *ł* is like English w (*mały* = small). *ch* and *h* are both h. Vowels are short and clear, and an *e* at the end of a word is always spoken: *morze* (sea) = MO-zheh.",
        ne: "केही अक्षर अंग्रेजी जस्तै देखिन्छन् तर आवाज फरक हुन्छ। *c* सधैं 'त्स' हो (*co* = के), 'क' वा 'स' होइन। *w* अंग्रेजी v जस्तै 'भ' हो (*woda*)। *j* 'य' हो (*jajko* = अण्डा)। *ł* अंग्रेजी w जस्तै 'व' हो (*mały* = सानो)। *ch* र *h* दुवै 'ह' हुन्। स्वर छोटा र स्पष्ट हुन्छन्, शब्दको अन्त्यको *e* पनि बोलिन्छ: *morze* (समुद्र) = ˈमो-झे।"
      },
      {
        en: "Nepali speakers already know many Polish sounds: त, द, च, ज, श, य, र are all there. But Polish *p*, *t*, *k* have no puff of air: say प, त, क — never फ, थ, ख. And English t sounds like ट to Nepali ears, but Polish *t* is a clean त. (In this course, भ in the Nepali pronunciation simply means the Polish *w*, the English v sound.)",
        ne: "नेपालीभाषीलाई धेरै पोलिश आवाज पहिल्यै आउँछन्: त, द, च, ज, श, य, र सबै पोलिशमा छन्। तर पोलिश *p*, *t*, *k* बोल्दा हावा फ्याँकिँदैन: प, त, क भन्नुहोस् — फ, थ, ख होइन। अंग्रेजीको t नेपाली कानलाई 'ट' जस्तो सुनिन्छ, तर पोलिश *t* सफा 'त' हो। (यस कोर्सको नेपाली उच्चारणमा 'भ' ले पोलिश *w*, अर्थात् अंग्रेजी v को आवाज जनाउँछ।)"
      }
    ],
    tables: [
      {
        title: "The 9 special letters",
        titleNe: "९ विशेष अक्षर",
        head: ["Letter", "Sound", "Nepali", "Example"],
        rows: [
          ["*ą*", "nasal 'on'", "ओं", "*mąż* (husband)"],
          ["*ć*", "soft 'ch'", "च (नरम)", "*być* (to be)"],
          ["*ę*", "nasal 'en'", "एं", "*ręka* (hand)"],
          ["*ł*", "w in 'water'", "व", "*mały* (small)"],
          ["*ń*", "ny in 'canyon'", "न्य", "*koń* (horse)"],
          ["*ó*", "oo (same as u)", "उ", "*mój* (my)"],
          ["*ś*", "soft 'sh'", "श (नरम)", "*coś* (something)"],
          ["*ź*", "soft 'zh'", "झ (नरम)", "*źle* (badly)"],
          ["*ż*", "s in 'pleasure'", "झ", "*żona* (wife)"]
        ]
      }
    ],
    words: [
      ["dom", "house, home", "घर", "dom", "दोम्"],
      ["kot", "cat", "बिरालो", "kot", "कोत्"],
      ["pies", "dog", "कुकुर", "pyes", "प्येस्"],
      ["mama", "mum", "आमा", "MA-ma", "ˈमा-मा"],
      ["tata", "dad", "बुबा", "TA-ta", "ˈता-ता"],
      ["woda", "water", "पानी", "VO-da", "ˈभो-दा"],
      ["mleko", "milk", "दूध", "MLE-ko", "ˈम्ले-को"],
      ["chleb", "bread", "पाउरोटी", "hlep", "ह्लेप्"],
      ["ser", "cheese", "चिज", "ser", "सेर्"],
      ["ryba", "fish", "माछा", "RI-ba", "ˈरि-बा"],
      ["jabłko", "apple", "स्याउ", "YAP-ko", "ˈयाप्-को"],
      ["okno", "window", "झ्याल", "OK-no", "ˈओक्-नो"],
      ["ręka", "hand", "हात", "REN-ka", "ˈरेन्-का"],
      ["mąż", "husband", "पति", "monsh", "मोंश्"],
      ["żona", "wife", "श्रीमती", "ZHO-na", "ˈझो-ना"],
      ["ulica", "street", "सडक", "oo-LEE-tsa", "उ-ˈलि-त्सा"]
    ],
    phrases: [
      ["Ala ma kota.", "Ala has a cat. (first sentence Polish kids read)", "आलासँग बिरालो छ।", "A-la ma KO-ta", "ˈआ-ला मा ˈको-ता"],
      ["To jest dom.", "This is a house.", "यो घर हो।", "to yest dom", "तो येस्त् दोम्"],
      ["To jest mój kot.", "This is my cat.", "यो मेरो बिरालो हो।", "to yest mooy kot", "तो येस्त् मुय् कोत्"],
      ["Gdzie jest woda?", "Where is the water?", "पानी कहाँ छ?", "gjeh yest VO-da", "ग्जे येस्त् ˈभो-दा"],
      ["Proszę wodę.", "Water, please.", "पानी दिनुहोस्।", "PRO-sheh VO-deh", "ˈप्रो-शे ˈभो-दे"],
      ["Mleko i chleb, proszę.", "Milk and bread, please.", "दूध र पाउरोटी दिनुहोस्।", "MLE-ko ee hlep PRO-sheh", "ˈम्ले-को इ ह्लेप् ˈप्रो-शे"]
    ],
    dialogue: [
      ["Anna", "Co to jest?", "What is this?", "यो के हो?"],
      ["Ram", "To jest kot.", "This is a cat.", "यो बिरालो हो।"],
      ["Anna", "A to?", "And this?", "अनि यो नि?"],
      ["Ram", "To jest pies.", "This is a dog.", "यो कुकुर हो।"],
      ["Anna", "Brawo! Dziękuję.", "Well done! Thank you.", "स्याबास! धन्यवाद।"],
      ["Ram", "Proszę.", "You're welcome.", "केही छैन।"]
    ]
  },

  {
    id: "start-02",
    level: "Start",
    title: "Letter pairs: sz, cz, rz, ch, dz, dż",
    titleNe: "अक्षर जोडी: sz, cz, rz, ch, dz, dż",
    summary: "Read the two-letter sounds sz, cz, rz, ch, dz and dż as one sound each.",
    summaryNe: "sz, cz, rz, ch, dz र dż जस्ता दुई अक्षरका आवाजलाई एउटै आवाजका रूपमा पढ्न सिक्नुहोस्।",
    lesson: [
      {
        en: "Some Polish sounds are written with two letters: *sz, cz, rz, ch, dz, dż*. Each pair is ONE sound. Never read them letter by letter: *szkoła* (school) is SHKO-wa, not s-z-ko-wa. It works like English 'sh' and 'ch': two letters, one sound.",
        ne: "केही पोलिश आवाज दुई अक्षरले लेखिन्छन्: *sz, cz, rz, ch, dz, dż*। हरेक जोडी एउटै आवाज हो। यिनलाई अक्षर-अक्षर छुट्याएर नपढ्नुहोस्: *szkoła* (विद्यालय) लाई ˈश्को-वा भनिन्छ, 'स-ज़-को-वा' होइन। अंग्रेजीको 'sh' र 'ch' जस्तै, दुई अक्षर मिलेर एउटा आवाज बन्छ।"
      },
      {
        en: "*sz* = sh (श) and *cz* = ch (च). These are 'hard' sounds: the tip of your tongue goes up behind your top teeth and your lips push slightly forward. *szafa* (wardrobe), *czas* (time), *czarny* (black). The group *szcz* is simply sh + ch, as in English 'fresh cheese': *szczotka* (brush).",
        ne: "*sz* = श र *cz* = च। यी 'कडा' आवाज हुन्: जिब्रोको टुप्पो माथिल्लो दाँतको पछाडि माथि उठ्छ र ओठ अलिकति अगाडि निस्कन्छ। *szafa* (दराज), *czas* (समय), *czarny* (कालो)। *szcz* भनेको श + च मात्र हो: *szczotka* (बुरुस) = ˈश्चोत्-का।"
      },
      {
        en: "Same sound, different spelling. *rz* and *ż* sound exactly the same — like the s in 'pleasure' (झ): *rzeka* (river), *żaba* (frog). *ch* and *h* are the same h sound (ह): *chleb* (bread), *herbata* (tea). And *ó* sounds exactly like *u* (उ). You just have to remember the spelling — even Polish children make mistakes here! When speaking, don't worry about it.",
        ne: "आवाज एउटै, लेखाइ फरक। *rz* र *ż* को आवाज ठ्याक्कै उस्तै हुन्छ — अंग्रेजी 'pleasure' को s जस्तै (झ): *rzeka* (नदी), *żaba* (भ्यागुतो)। *ch* र *h* दुवै 'ह' हुन्: *chleb* (पाउरोटी), *herbata* (चिया)। *ó* र *u* पनि ठ्याक्कै उस्तै 'उ' हुन्। लेखाइ मात्र सम्झनुपर्छ — पोलिश बच्चाहरूले पनि यहाँ गल्ती गर्छन्! बोल्दा यसको चिन्ता नगर्नुहोस्।"
      },
      {
        en: "*dz* is like 'ds' in 'kids' (द्ज़): *dzwon* (bell). *dż* is like j in 'jam' (ज): *dżem* (jam), *dżinsy* (jeans). *dż* is quite rare and appears mostly in borrowed words. There is also a soft *dź* — you will meet it in the next unit.",
        ne: "*dz* अंग्रेजी 'kids' को 'ds' जस्तै हो (द्ज़): *dzwon* (घण्टी)। *dż* अंग्रेजी 'jam' को j जस्तै 'ज' हो: *dżem* (जाम), *dżinsy* (जिन्स)। *dż* कमै आउँछ, प्रायः विदेशी शब्दमा। नरम *dź* पनि छ — त्यो अर्को पाठमा सिक्नुहुनेछ।"
      },
      {
        en: "**Tip:** after *p, t, k* and *ch*, the pair *rz* loses its voice and sounds like *sz*: *przepraszam* (sorry) = pshe-PRA-sham, *trzy* (three) = tshi, *krzesło* (chair) = KSHES-wo. You will see *prz* very often, so learn it as 'psh'.",
        ne: "**सुझाव:** *p, t, k* र *ch* पछि आउने *rz* को आवाज *sz* (श) जस्तै हुन्छ: *przepraszam* (माफ गर्नुहोस्) = प्शे-ˈप्रा-शाम्, *trzy* (तीन) = त्शि, *krzesło* (कुर्सी) = ˈक्शेस्-वो। *prz* धेरै आउँछ, त्यसैले यसलाई 'प्श' भनेर सम्झनुहोस्।"
      }
    ],
    tables: [
      {
        title: "Letter pairs",
        titleNe: "अक्षर जोडीहरू",
        head: ["Polish", "Sounds like (English)", "Nepali", "Example"],
        rows: [
          ["*sz*", "sh in 'shop'", "श", "*szafa* (wardrobe)"],
          ["*cz*", "ch in 'church'", "च", "*czas* (time)"],
          ["*rz*", "s in 'pleasure'", "झ", "*rzeka* (river)"],
          ["*ż*", "s in 'pleasure' (same as rz)", "झ", "*żaba* (frog)"],
          ["*ch*", "h, a bit stronger", "ह", "*chleb* (bread)"],
          ["*h*", "h (same as ch)", "ह", "*herbata* (tea)"],
          ["*dz*", "ds in 'kids'", "द्ज़", "*dzwon* (bell)"],
          ["*dż*", "j in 'jam'", "ज", "*dżem* (jam)"],
          ["*szcz*", "sh + ch, as in 'fresh cheese'", "श्च", "*szczotka* (brush)"],
          ["*prz, trz, krz*", "psh, tsh, ksh", "प्श, त्श, क्श", "*trzy* (three)"]
        ]
      }
    ],
    words: [
      ["szkoła", "school", "विद्यालय", "SHKO-wa", "ˈश्को-वा"],
      ["czas", "time", "समय", "chas", "चास्"],
      ["szafa", "wardrobe", "दराज", "SHA-fa", "ˈशा-फ़ा"],
      ["czarny", "black", "कालो", "CHAR-ni", "ˈचार्-नि"],
      ["rzeka", "river", "नदी", "ZHE-ka", "ˈझे-का"],
      ["rzecz", "thing", "वस्तु / चीज", "zhech", "झेच्"],
      ["żaba", "frog", "भ्यागुतो", "ZHA-ba", "ˈझा-बा"],
      ["morze", "sea", "समुद्र", "MO-zheh", "ˈमो-झे"],
      ["chłopak", "boy", "केटा", "HWO-pak", "ˈह्वो-पाक्"],
      ["herbata", "tea", "चिया", "her-BA-ta", "हेर्-ˈबा-ता"],
      ["dzwon", "bell", "घण्टी", "dzvon", "द्ज़्भोन्"],
      ["dżem", "jam", "जाम", "jem", "जेम्"],
      ["trzy", "three", "तीन", "tshi", "त्शि"],
      ["przepraszam", "sorry / excuse me", "माफ गर्नुहोस्", "pshe-PRA-sham", "प्शे-ˈप्रा-शाम्"],
      ["szczotka", "brush", "बुरुस", "SHCHOT-ka", "ˈश्चोत्-का"],
      ["cześć", "hi / bye (informal)", "नमस्ते / बाइ (अनौपचारिक)", "cheshch", "चेश्च्"],
      ["czekolada", "chocolate", "चकलेट", "che-ko-LA-da", "चे-को-ˈला-दा"]
    ],
    phrases: [
      ["Przepraszam, gdzie jest szkoła?", "Excuse me, where is the school?", "माफ गर्नुहोस्, विद्यालय कहाँ छ?", "pshe-PRA-sham gjeh yest SHKO-wa", "प्शे-ˈप्रा-शाम् ग्जे येस्त् ˈश्को-वा"],
      ["Nie mam czasu.", "I don't have time.", "मसँग समय छैन।", "nyeh mam CHA-soo", "न्ये माम् ˈचा-सु"],
      ["Herbata czy kawa?", "Tea or coffee?", "चिया कि कफी?", "her-BA-ta chi KA-va", "हेर्-ˈबा-ता चि ˈका-भा"],
      ["To jest duża rzeka.", "This is a big river.", "यो ठूलो नदी हो।", "to yest DOO-zha ZHE-ka", "तो येस्त् ˈदु-झा ˈझे-का"],
      ["Czarny kot jest duży.", "The black cat is big.", "कालो बिरालो ठूलो छ।", "CHAR-ni kot yest DOO-zhi", "ˈचार्-नि कोत् येस्त् ˈदु-झि"],
      ["Proszę chleb i dżem.", "Bread and jam, please.", "पाउरोटी र जाम दिनुहोस्।", "PRO-sheh hlep ee jem", "ˈप्रो-शे ह्लेप् इ जेम्"]
    ],
    dialogue: [
      ["Kelnerka", "Dzień dobry! Herbata czy kawa?", "Hello! Tea or coffee?", "नमस्ते! चिया कि कफी?"],
      ["Ram", "Poproszę herbatę.", "Tea, please.", "चिया दिनुहोस्।"],
      ["Kelnerka", "Z cukrem?", "With sugar?", "चिनी हालेर?"],
      ["Ram", "Nie, dziękuję. I czekoladę, proszę.", "No, thank you. And a chocolate, please.", "पर्दैन, धन्यवाद। अनि एउटा चकलेट पनि दिनुहोस्।"],
      ["Kelnerka", "Proszę bardzo.", "Here you are.", "लिनुहोस्।"],
      ["Ram", "Dziękuję!", "Thank you!", "धन्यवाद!"]
    ]
  },

  {
    id: "start-03",
    level: "Start",
    title: "Soft sounds: ś ć ź ń dź and si ci zi ni dzi",
    titleNe: "नरम आवाज: ś ć ź ń dź र si ci zi ni dzi",
    summary: "Make the soft sounds ś, ć, ź, ń, dź and learn when they are written si, ci, zi, ni, dzi.",
    summaryNe: "ś, ć, ź, ń, dź जस्ता नरम आवाज बोल्न र ती कहिले si, ci, zi, ni, dzi लेखिन्छन् भनेर सिक्नुहोस्।",
    lesson: [
      {
        en: "Polish has a family of **soft** sounds: *ś, ć, ź, ń, dź*. To make them, press the middle of your tongue up against the roof of your mouth and spread your lips a little, as if smiling. It feels like a tiny y (य) is hidden inside: *ń* is like 'ny' in 'canyon' (न्य), *ć* is a soft ch, *ś* is a soft sh.",
        ne: "पोलिशमा **नरम** आवाजहरूको एउटा परिवार छ: *ś, ć, ź, ń, dź*। यिनलाई बोल्न जिब्रोको बीचको भाग तालुमा माथि थिच्नुहोस् र मुस्कुराए जसरी ओठ अलिकति तन्काउनुहोस्। भित्र सानो 'य' लुकेको जस्तो लाग्छ: *ń* = न्य, *ć* = नरम च, *ś* = नरम श।"
      },
      {
        en: "The spelling rule: the accent mark is used only at the end of a word or before a consonant: *koń* (horse), *coś* (something), *być* (to be). Before a vowel, Polish writes the letter + *i* instead: *si, ci, zi, ni, dzi*. So *siostra* (sister) is really ś-ostra, and *ciocia* (aunt) is ć-o-ć-a. Here the *i* is not a separate vowel: *nie* (no) is one syllable — nyeh.",
        ne: "लेखाइको नियम: चिन्ह (´) शब्दको अन्त्यमा वा व्यञ्जनअघि मात्र लेखिन्छ: *koń* (घोडा), *coś* (केही), *być* (हुनु)। स्वरअघि भने चिन्हको सट्टा अक्षरपछि *i* लेखिन्छ: *si, ci, zi, ni, dzi*। त्यसैले *siostra* (दिदी/बहिनी) वास्तवमा ś-ostra हो, र *ciocia* (काकी) ć-o-ć-a। यहाँ *i* छुट्टै स्वर होइन: *nie* (होइन) एउटै अक्षर हो — 'न्ये'।"
      },
      {
        en: "When the *i* is followed by a consonant or ends the word, you hear both the soft sound and an 'ee': *ci* (to you) = chee, *nic* (nothing) = neets, *zima* (winter) = ZHEE-ma. **Common mistake:** reading *si* like English 'see': *siostra* is SHOS-tra, not see-OS-tra.",
        ne: "*i* पछि व्यञ्जन आयो वा *i* शब्दको अन्त्यमा छ भने नरम आवाज र 'इ' दुवै सुनिन्छ: *ci* (तिमीलाई) = चि, *nic* (केही पनि होइन) = नित्स्, *zima* (जाडो) = ˈझि-मा। **सामान्य गल्ती:** *si* लाई अंग्रेजी 'see' जस्तो पढ्नु: *siostra* = ˈशोस्-त्रा, 'सि-ओस्-त्रा' होइन।"
      },
      {
        en: "Hard vs soft: to a Nepali ear *sz* and *ś* both sound like श, and *cz* and *ć* both sound like च. Many Nepali learners find this hard — that's normal! The difference is in the tongue. Hard *sz, cz*: tongue tip up, lips pushed forward as for a kiss. Soft *ś, ć*: tongue tip down behind the lower teeth, middle of the tongue up, lips smiling. Listen: *kasza* (porridge) vs *Kasia* (Kate), *proszę* (please) vs *prosię* (piglet).",
        ne: "कडा र नरम: नेपाली कानलाई *sz* र *ś* दुवै 'श', अनि *cz* र *ć* दुवै 'च' जस्तै सुनिन्छन्। धेरै नेपाली विद्यार्थीलाई यो गाह्रो लाग्छ — यो सामान्य हो! फरक जिब्रोमा छ। कडा *sz, cz*: जिब्रोको टुप्पो माथि, ओठ चुम्बन गर्ने जस्तो अगाडि। नरम *ś, ć*: जिब्रोको टुप्पो तल्लो दाँतपछाडि, जिब्रोको बीच भाग माथि, ओठ मुस्कुराउँदै। सुन्नुहोस्: *kasza* (दलिया) र *Kasia* (कासिया, एउटा नाम), *proszę* (कृपया) र *prosię* (सुँगुरको बच्चा)।"
      },
      {
        en: "**Trick:** for a soft sound, smile and imagine a little y after it: *ś* ≈ 'sy', *ć* ≈ 'chy' (च्य). For a hard sound, make 'duck lips'. Practise with *cześć* (hi): it has a hard *cz* at the start and a soft *ść* at the end. If you mix them up, Poles will still understand you from context — so keep talking!",
        ne: "**उपाय:** नरम आवाजका लागि मुस्कुराउनुहोस् र पछाडि सानो 'य' छ भनेर सोच्नुहोस्: *ś* ≈ 'श्य', *ć* ≈ 'च्य'। कडा आवाजका लागि ओठ हाँसको चुच्चो जस्तो अगाडि बनाउनुहोस्। *cześć* (नमस्ते) बाट अभ्यास गर्नुहोस्: सुरुमा कडा *cz*, अन्त्यमा नरम *ść*। मिसिए पनि पोलिशहरूले प्रसङ्गबाट बुझ्छन् — त्यसैले बोलिरहनुहोस्!"
      }
    ],
    tables: [
      {
        title: "Soft sounds and their two spellings",
        titleNe: "नरम आवाज र तिनका दुई लेखाइ",
        head: ["Soft sound", "Before a vowel", "Sounds like", "Nepali", "Example"],
        rows: [
          ["*ś*", "*si*", "soft sh, smiling", "श (नरम)", "*coś* (something), *siostra* (sister)"],
          ["*ć*", "*ci*", "soft ch", "च (नरम)", "*być* (to be), *ciocia* (aunt)"],
          ["*ź*", "*zi*", "soft zh", "झ (नरम)", "*źle* (badly), *zima* (winter)"],
          ["*ń*", "*ni*", "ny in 'canyon'", "न्य", "*koń* (horse), *nie* (no)"],
          ["*dź*", "*dzi*", "soft j", "ज (नरम)", "*dźwig* (crane), *dzień* (day)"]
        ]
      },
      {
        title: "Hard vs soft",
        titleNe: "कडा र नरम",
        head: ["Hard (tongue tip up, lips forward)", "Soft (tongue middle up, smile)", "Examples"],
        rows: [
          ["*sz*", "*ś / si*", "*kasza* (porridge) — *Kasia* (Kate)"],
          ["*cz*", "*ć / ci*", "*czas* (time) — *ciocia* (aunt)"],
          ["*ż / rz*", "*ź / zi*", "*żaba* (frog) — *zima* (winter)"],
          ["*dż*", "*dź / dzi*", "*dżem* (jam) — *dzień* (day)"]
        ]
      }
    ],
    words: [
      ["siostra", "sister", "दिदी / बहिनी", "SHOS-tra", "ˈशोस्-त्रा"],
      ["ciocia", "aunt", "काकी / फुपू / सानिमा", "CHO-cha", "ˈचो-चा"],
      ["dziecko", "child", "बच्चा", "JETS-ko", "ˈजेत्स्-को"],
      ["dzień", "day", "दिन", "jeny", "जेन्य्"],
      ["nie", "no / not", "होइन / नाइँ", "nyeh", "न्ये"],
      ["koń", "horse", "घोडा", "kony", "कोन्य्"],
      ["zima", "winter", "जाडो", "ZHEE-ma", "ˈझि-मा"],
      ["źle", "badly / wrong", "नराम्रो / गलत", "zhleh", "झ्ले"],
      ["coś", "something", "केही", "tsosh", "त्सोश्"],
      ["cześć", "hi / bye (informal)", "नमस्ते / बाइ (अनौपचारिक)", "cheshch", "चेश्च्"],
      ["być", "to be", "हुनु", "bich", "बिच्"],
      ["ciepło", "warm (it is warm)", "न्यानो", "CHEP-wo", "ˈचेप्-वो"],
      ["dziękuję", "thank you", "धन्यवाद", "jen-KOO-yeh", "जेन्-ˈकु-ये"],
      ["niebo", "sky", "आकाश", "NYE-bo", "ˈन्ये-बो"],
      ["ziemniak", "potato", "आलु", "ZHEM-nyak", "ˈझेम्-न्याक्"],
      ["pieniądze", "money", "पैसा", "pye-NYON-dzeh", "प्ये-ˈन्योन्-द्ज़े"]
    ],
    phrases: [
      ["To jest moja siostra.", "This is my sister.", "यिनी मेरी दिदी/बहिनी हुन्।", "to yest MO-ya SHOS-tra", "तो येस्त् ˈमो-या ˈशोस्-त्रा"],
      ["Dzień dobry!", "Good morning! / Hello! (formal)", "नमस्ते! (औपचारिक)", "jeny DOB-ri", "जेन्य् ˈदोब्-रि"],
      ["Nie mam pieniędzy.", "I have no money.", "मसँग पैसा छैन।", "nyeh mam pye-NYEN-dzi", "न्ये माम् प्ये-ˈन्येन्-द्ज़ि"],
      ["Dziś jest ciepło.", "It's warm today.", "आज न्यानो छ।", "jeesh yest CHEP-wo", "जिश् येस्त् ˈचेप्-वो"],
      ["Źle się czuję.", "I feel unwell.", "मलाई सन्चो छैन।", "zhleh sheh CHOO-yeh", "झ्ले शे ˈचु-ये"],
      ["Coś do picia?", "Something to drink?", "केही पिउने?", "tsosh do PEE-cha", "त्सोश् दो ˈपि-चा"],
      ["Moje dziecko ma pięć lat.", "My child is five years old.", "मेरो बच्चा पाँच वर्षको छ।", "MO-yeh JETS-ko ma pyench lat", "ˈमो-ये ˈजेत्स्-को मा प्येन्च् लात्"]
    ],
    dialogue: [
      ["Kasia", "Cześć, Ram! To jest moja ciocia.", "Hi Ram! This is my aunt.", "नमस्ते राम! यिनी मेरी काकी हुन्।"],
      ["Ram", "Dzień dobry!", "Hello! (formal)", "नमस्ते!"],
      ["Ciocia", "Dzień dobry! Coś do picia?", "Hello! Something to drink?", "नमस्ते! केही पिउनुहुन्छ?"],
      ["Ram", "Tak, poproszę herbatę.", "Yes, tea please.", "हजुर, चिया दिनुहोस्।"],
      ["Ciocia", "Proszę bardzo.", "Here you are.", "लिनुहोस्।"],
      ["Ram", "Dziękuję!", "Thank you!", "धन्यवाद!"]
    ]
  },

  {
    id: "start-04",
    level: "Start",
    title: "Vowels: y, ó, ą, ę",
    titleNe: "स्वरहरू: y, ó, ą, ę",
    summary: "Tell i from y, read ó as u, and say the nasal vowels ą and ę correctly.",
    summaryNe: "i र y छुट्याउन, ó लाई u जस्तै पढ्न र नाके स्वर ą र ę सही बोल्न सिक्नुहोस्।",
    lesson: [
      {
        en: "Polish has six vowel sounds: *a, e, i, o, u, y* (*ó* is just another way to write *u*). They are always short and pure. Don't glide: English 'go' sounds like 'go-u', but Polish *o* stays o. Don't make them long either: say इ and उ, not ई and ऊ.",
        ne: "पोलिशमा छवटा स्वर आवाज छन्: *a, e, i, o, u, y* (*ó* भनेको *u* लेख्ने अर्को तरिका मात्र हो)। यी सधैं छोटा र सफा हुन्छन्। अंग्रेजी 'go' लाई 'गो-उ' जस्तो भनिन्छ, तर पोलिश *o* सधैं 'ओ' नै रहन्छ। लामो पनि नतान्नुहोस्: ई, ऊ होइन, इ, उ भन्नुहोस्।"
      },
      {
        en: "*i* vs *y*: *i* is a clear इ, like 'ee' in 'see' but short. *y* is a deeper sound between इ and उ, close to the 'i' in English 'bit'. Nepali has no letter for it. **Trick:** say इ, then pull your tongue a little back and relax your lips. These pairs differ only in i/y: *mi* (to me) – *my* (we), *bić* (to hit) – *być* (to be). Polish words almost never start with *y*.",
        ne: "*i* र *y*: *i* सफा 'इ' हो। *y* भने 'इ' र 'उ' को बीचको गहिरो आवाज हो, अंग्रेजी 'bit' को i जस्तै। नेपालीमा यसको अक्षर छैन। **उपाय:** 'इ' भन्नुहोस्, अनि जिब्रो अलिकति पछाडि तान्नुहोस् र ओठ खुकुलो छोड्नुहोस्। यी जोडीमा i/y मात्र फरक छ: *mi* (मलाई) – *my* (हामी), *bić* (कुट्नु) – *być* (हुनु)। पोलिश शब्द प्रायः *y* बाट सुरु हुँदैनन्।"
      },
      {
        en: "*ó* sounds exactly like *u* (उ). The different spelling is only history. Often *ó* changes to *o* in another form of the same word: *mój* (my, masculine) but *moja* (my, feminine); *stół* (table) but *stoły* (tables). So if a related word has *o*, the spelling is *ó*, not *u*.",
        ne: "*ó* को आवाज ठ्याक्कै *u* (उ) जस्तै हो। फरक लेखाइ इतिहासका कारण मात्र हो। एउटै शब्दको अर्को रूपमा *ó* प्रायः *o* मा बदलिन्छ: *mój* (मेरो, पुलिङ्ग) तर *moja* (मेरी, स्त्रीलिङ्ग); *stół* (टेबल) तर *stoły* (टेबलहरू)। त्यसैले सम्बन्धित शब्दमा *o* देखियो भने त्यहाँ *u* होइन, *ó* लेखिन्छ।"
      },
      {
        en: "*ą* and *ę* are nasal vowels: air goes out through the nose, like the चन्द्रबिन्दु in Nepali गाउँ or हाँस. *ą* is a nasal o (ओं), *ę* a nasal e (एं). Their sound changes with the next letter: before *p, b* they become om/em (*zęby* = ZEM-bi), before *t, d, c, cz* on/en (*mądry* = MON-dri), before *k, g* ong/eng (*ręka*). Before *s, z, sz, ż, w, f, ch* they stay a pure nasal vowel (*mąż*, *język*).",
        ne: "*ą* र *ę* नाकबाट बोलिने स्वर हुन् — नेपालीको 'गाउँ', 'हाँस' को चन्द्रबिन्दुमा जस्तै हावा नाकबाट निस्कन्छ। *ą* = ओं, *ę* = एं। पछि आउने अक्षर अनुसार आवाज बदलिन्छ: *p, b* अघि 'ओम्/एम्' (*zęby* = ˈज़ेम्-बि), *t, d, c, cz* अघि 'ओन्/एन्' (*mądry* = ˈमोन्-द्रि), *k, g* अघि 'ओङ्/एङ्' (*ręka*)। *s, z, sz, ż, w, f, ch* अघि शुद्ध नाके स्वर नै रहन्छ (*mąż*, *język*)।"
      },
      {
        en: "At the end of a word *ę* loses its nasal sound and is just e: *proszę* = PRO-sheh, *dziękuję* = jen-KOO-yeh. But a final *ą* stays nasal: *są* (they are) = son, through the nose. **Common mistake:** saying a strong n in *proszę* ('pro-shen') — Poles never do this.",
        ne: "शब्दको अन्त्यमा *ę* को नाके आवाज हराउँछ र 'ए' मात्र रहन्छ: *proszę* = ˈप्रो-शे, *dziękuję* = जेन्-ˈकु-ये। तर अन्त्यको *ą* नाकबाटै बोलिन्छ: *są* (छन्/हुन्) = सों। **सामान्य गल्ती:** *proszę* लाई 'प्रो-शेन्' भन्नु — पोलिशहरू यसो भन्दैनन्।"
      }
    ],
    tables: [
      {
        title: "i or y?",
        titleNe: "i कि y?",
        head: ["Polish", "Sounds like", "Meaning", "Nepali"],
        rows: [
          ["*mi*", "mee (इ)", "to me", "मलाई"],
          ["*my*", "mi, as in 'bit'", "we", "हामी"],
          ["*bić*", "beech", "to hit", "कुट्नु"],
          ["*być*", "bich", "to be", "हुनु"]
        ]
      },
      {
        title: "How ą and ę change",
        titleNe: "ą र ę कसरी बदलिन्छन्",
        head: ["Before", "ą sounds", "ę sounds", "Examples"],
        rows: [
          ["*p, b*", "om", "em", "*zęby* (teeth), *gołąb* (pigeon)"],
          ["*t, d, c, cz, dz*", "on", "en", "*mądry* (wise), *będę* (I will be)"],
          ["*k, g*", "ong", "eng", "*ręka* (hand), *pociąg* (train)"],
          ["*s, z, sz, ż, w, f, ch*", "nasal o", "nasal e", "*mąż* (husband), *język* (language)"],
          ["*l, ł*", "o", "e", "*wziął* (he took), *zaczęli* (they began)"],
          ["end of word", "nasal o", "e (not nasal)", "*są* (they are), *proszę* (please)"]
        ]
      }
    ],
    words: [
      ["my", "we", "हामी", "mi", "मि"],
      ["być", "to be", "हुनु", "bich", "बिच्"],
      ["syn", "son", "छोरा", "sin", "सिन्"],
      ["mysz", "mouse", "मुसो", "mish", "मिश्"],
      ["mój", "my (m)", "मेरो", "mooy", "मुय्"],
      ["góra", "mountain", "पहाड", "GOO-ra", "ˈगु-रा"],
      ["stół", "table", "टेबल", "stoow", "स्तुव्"],
      ["ogród", "garden", "बगैंचा", "OG-root", "ˈओग्-रुत्"],
      ["mąż", "husband", "पति / श्रीमान्", "monsh", "मोंश्"],
      ["są", "(they) are", "(उनीहरू) छन् / हुन्", "son", "सों"],
      ["ręka", "hand / arm", "हात", "REN-ka", "ˈरेन्-का"],
      ["zęby", "teeth", "दाँतहरू", "ZEM-bi", "ˈज़ेम्-बि"],
      ["język", "language / tongue", "भाषा / जिब्रो", "YEN-zik", "ˈयेन्-ज़िक्"],
      ["pięć", "five", "पाँच", "pyench", "प्येन्च्"],
      ["mięso", "meat", "मासु", "MYEN-so", "ˈम्येन्-सो"],
      ["proszę", "please", "कृपया", "PRO-sheh", "ˈप्रो-शे"],
      ["idę", "I'm going", "म जाँदैछु", "EE-deh", "ˈइ-दे"]
    ],
    phrases: [
      ["My jesteśmy z Nepalu.", "We are from Nepal.", "हामी नेपालबाट हौं।", "mi yes-TESH-mi z ne-PA-loo", "मि येस्-ˈतेश्-मि ज़् ने-ˈपा-लु"],
      ["To jest mój syn.", "This is my son.", "यो मेरो छोरा हो।", "to yest mooy sin", "तो येस्त् मुय् सिन्"],
      ["Ręka mnie boli.", "My hand hurts.", "मेरो हात दुख्छ।", "REN-ka mnyeh BO-lee", "ˈरेन्-का म्न्ये ˈबो-लि"],
      ["Idę do domu.", "I'm going home.", "म घर जाँदैछु।", "EE-deh do DO-moo", "ˈइ-दे दो ˈदो-मु"],
      ["Oni są w domu.", "They are at home.", "उनीहरू घरमा छन्।", "O-nee son v DO-moo", "ˈओ-नि सों भ् ˈदो-मु"],
      ["Nie jem mięsa.", "I don't eat meat.", "म मासु खान्नँ।", "nyeh yem MYEN-sa", "न्ये येम् ˈम्येन्-सा"]
    ],
    dialogue: [
      ["Sprzedawca", "Dzień dobry! Co dla pana?", "Hello! What can I get you, sir?", "नमस्ते! तपाईंलाई के दिऊँ?"],
      ["Ram", "Dzień dobry. Pięć jabłek, proszę.", "Hello. Five apples, please.", "नमस्ते। पाँचवटा स्याउ दिनुहोस्।"],
      ["Sprzedawca", "A mięso?", "And some meat?", "अनि मासु?"],
      ["Ram", "Nie, dziękuję. Nie jem mięsa.", "No, thank you. I don't eat meat.", "पर्दैन, धन्यवाद। म मासु खान्नँ।"],
      ["Sprzedawca", "Dobrze. Dziesięć złotych.", "OK. Ten zlotys.", "ठीक छ। दस ज्लोटी भयो।"],
      ["Ram", "Proszę. Do widzenia!", "Here you are. Goodbye!", "लिनुहोस्। फेरि भेटौंला!"]
    ]
  },

  {
    id: "start-05",
    level: "Start",
    title: "Stress and reading rules",
    titleNe: "जोड (stress) र पढ्ने नियम",
    summary: "Put the stress in the right place and read words the way Poles really say them.",
    summaryNe: "सही ठाउँमा जोड दिन र पोलिशहरूले वास्तवमा बोल्ने जसरी शब्द पढ्न सिक्नुहोस्।",
    lesson: [
      {
        en: "Polish stress is easy: it falls on the **second-to-last syllable** of almost every word. *Pol-ska* → POL-ska, *te-le-fon* → te-LE-fon, *dzię-ku-ję* → jen-KOO-yeh. When a word gets longer, the stress moves: *telefon* → *telefonu* (te-le-FO-noo). There are a few exceptions, like *byliśmy* (we were), which you will learn later.",
        ne: "पोलिशमा जोड (stress) सजिलो छ: लगभग हरेक शब्दमा **अन्तिमभन्दा अघिल्लो शब्दांश (syllable)** मा जोड पर्छ। *Pol-ska* → ˈपोल्-स्का, *te-le-fon* → ते-ˈले-फ़ोन्, *dzię-ku-ję* → जेन्-ˈकु-ये। शब्द लामो भयो भने जोड पनि सर्छ: *telefon* → *telefonu* (ते-ले-ˈफ़ो-नु)। *byliśmy* (हामी थियौं) जस्ता केही अपवाद छन्, ती पछि सिक्नुहुनेछ।"
      },
      {
        en: "To count syllables, count the vowels (*a, ą, e, ę, i, o, ó, u, y*). But remember: an *i* before another vowel only softens the consonant — it is not a vowel of its own. *nie* = 1 syllable; *pieniądze* (money) = pie-nią-dze, 3 syllables → pye-NYON-dzeh.",
        ne: "शब्दांश (syllable) गन्न स्वरहरू (*a, ą, e, ę, i, o, ó, u, y*) गन्नुहोस्। तर सम्झनुहोस्: अर्को स्वरअघिको *i* ले व्यञ्जनलाई नरम मात्र बनाउँछ, आफैं स्वर होइन। *nie* = १ शब्दांश; *pieniądze* (पैसा) = pie-nią-dze, ३ अक्षर → प्ये-ˈन्योन्-द्ज़े।"
      },
      {
        en: "**Final devoicing:** at the end of a word, 'voiced' consonants lose their voice: b→p, d→t, g→k, w→f, z→s, ż/rz→sz, dź→ć. So *chleb* (bread) = hlep, *róg* (corner) = rook, *mąż* (husband) = monsh, *krew* (blood) = kref. Don't add a vowel after the last consonant: say hlep, not hle-bu.",
        ne: "**अन्तिम व्यञ्जन अघोष हुन्छ:** शब्दको अन्त्यमा घोष व्यञ्जन अघोष बन्छन्: b→p (ब→प), d→t (द→त), g→k (ग→क), w→f (भ→फ़), z→s, ż/rz→sz (झ→श), dź→ć (ज→च)। त्यसैले *chleb* (पाउरोटी) = ह्लेप्, *róg* (कुना) = रुक्, *mąż* (पति) = मोंश्, *krew* (रगत) = क्रेफ़्। अन्तिम व्यञ्जनपछि स्वर नथप्नुहोस्: 'ह्लेप्' भन्नुहोस्, 'ह्ले-बु' होइन।"
      },
      {
        en: "**Neighbours match:** two consonants side by side become both voiced or both voiceless. Usually the second one decides: *wtorek* (Tuesday) = FTO-rek, *wszystko* (everything) = FSHIST-ko, *także* (also) = TAG-zheh. But *w* and *rz* are special: after a voiceless consonant they turn into f and sh: *twój* (your) = tfooy, *kwiat* (flower) = kfyat, *trzy* (three) = tshi.",
        ne: "**छिमेकी व्यञ्जन मिल्छन्:** दुई व्यञ्जन सँगै आए दुवै घोष वा दुवै अघोष बन्छन्। प्रायः दोस्रोले निर्णय गर्छ: *wtorek* (मंगलबार) = ˈफ़्तो-रेक्, *wszystko* (सबै) = ˈफ़्शिस्त्-को, *także* (पनि) = ˈताग्-झे। तर *w* र *rz* विशेष छन्: अघोष व्यञ्जनपछि ती 'फ़' र 'श' बन्छन्: *twój* (तिम्रो) = त्फ़ुय्, *kwiat* (फूल) = क्फ़्यात्, *trzy* (तीन) = त्शि।"
      },
      {
        en: "Short words like *w* (in) and *z* (with, from) are read together with the next word: *w domu* (at home) = v DO-moo, *w Polsce* (in Poland) = f POL-stseh. **Common mistake for Nepali speakers:** adding a vowel inside consonant groups, like saying 'iskul' for school. Polish clusters are said tight: *wszystko*, *pstrąg* (trout), *Szczecin*.",
        ne: "*w* (मा) र *z* (सँग/बाट) जस्ता साना शब्द अर्को शब्दसँग जोडेर पढिन्छन्: *w domu* (घरमा) = भ् ˈदो-मु, *w Polsce* (पोल्याण्डमा) = फ़् ˈपोल्-स्त्से। **नेपालीभाषीको सामान्य गल्ती:** व्यञ्जनको झुण्डबीच स्वर थप्नु, जस्तै school लाई 'इस्कुल' भन्नु। पोलिशमा व्यञ्जन झुण्ड कसिलो गरी बोलिन्छ: *wszystko*, *pstrąg* (ट्राउट माछा), *Szczecin*।"
      },
      {
        en: "**How to read a new word:** 1) find the letter pairs (*sz, cz, rz, ch, dz, si, ci…*), 2) count the vowels and stress the second-to-last syllable, 3) check the last consonant and the clusters. Try *przepraszam*: prz-e-pr-a-sz-a-m → 3 syllables → pshe-PRA-sham.",
        ne: "**नयाँ शब्द कसरी पढ्ने:** १) अक्षर जोडी खोज्नुहोस् (*sz, cz, rz, ch, dz, si, ci…*), २) स्वर गनेर अन्तिमभन्दा अघिल्लो शब्दांशमा जोड दिनुहोस्, ३) अन्तिम व्यञ्जन र व्यञ्जन झुण्ड जाँच्नुहोस्। *przepraszam* पढेर हेर्नुहोस्: ३ शब्दांश → प्शे-ˈप्रा-शाम्।"
      }
    ],
    tables: [
      {
        title: "Final devoicing",
        titleNe: "शब्दको अन्त्यमा अघोष हुने व्यञ्जन",
        head: ["Written", "Said", "Example", "Pronounced"],
        rows: [
          ["*b*", "p", "*chleb* (bread)", "hlep"],
          ["*d*", "t", "*sąsiad* (neighbour)", "SON-shat"],
          ["*g*", "k", "*róg* (corner)", "rook"],
          ["*w*", "f", "*krew* (blood)", "kref"],
          ["*z*", "s", "*raz* (once)", "ras"],
          ["*ż / rz*", "sh", "*mąż* (husband)", "monsh"],
          ["*dź*", "ch (soft)", "*niedźwiedź* (bear)", "NYEJ-vyech"]
        ]
      },
      {
        title: "w → f and rz → sz",
        titleNe: "w → f र rz → sz",
        head: ["Spelling", "Sound", "Example", "Pronounced"],
        rows: [
          ["*tw*", "tf", "*twój* (your)", "tfooy"],
          ["*kw*", "kf", "*kwiat* (flower)", "kfyat"],
          ["*św*", "shf", "*świat* (world)", "shfyat"],
          ["*w* + voiceless", "f", "*wtorek* (Tuesday)", "FTO-rek"],
          ["*prz*", "psh", "*przepraszam* (sorry)", "pshe-PRA-sham"],
          ["*trz*", "tsh", "*trzy* (three)", "tshi"]
        ]
      }
    ],
    words: [
      ["Polska", "Poland", "पोल्याण्ड", "POL-ska", "ˈपोल्-स्का"],
      ["telefon", "phone", "फोन", "te-LE-fon", "ते-ˈले-फ़ोन्"],
      ["róg", "corner", "कुना", "rook", "रुक्"],
      ["sąsiad", "neighbour (m)", "छिमेकी", "SON-shat", "ˈसोन्-शात्"],
      ["krew", "blood", "रगत", "kref", "क्रेफ़्"],
      ["twój", "your (informal, m)", "तिम्रो", "tfooy", "त्फ़ुय्"],
      ["kwiat", "flower", "फूल", "kfyat", "क्फ़्यात्"],
      ["świat", "world", "संसार", "shfyat", "श्फ़्यात्"],
      ["wtorek", "Tuesday", "मंगलबार", "FTO-rek", "ˈफ़्तो-रेक्"],
      ["wszystko", "everything", "सबै", "FSHIST-ko", "ˈफ़्शिस्त्-को"],
      ["także", "also", "पनि", "TAG-zheh", "ˈताग्-झे"],
      ["ząb", "tooth", "दाँत", "zomp", "ज़ोम्प्"],
      ["lekarz", "doctor (m)", "डाक्टर", "LE-kash", "ˈले-काश्"],
      ["nóż", "knife", "चक्कु", "noosh", "नुश्"],
      ["obiad", "lunch (main meal)", "दिउँसोको खाना", "O-byat", "ˈओ-ब्यात्"],
      ["pociąg", "train", "रेल", "PO-chonk", "ˈपो-चोंक्"],
      ["samochód", "car", "गाडी / कार", "sa-MO-hoot", "सा-ˈमो-हुत्"]
    ],
    phrases: [
      ["Mój sąsiad jest lekarzem.", "My neighbour is a doctor.", "मेरो छिमेकी डाक्टर हुनुहुन्छ।", "mooy SON-shat yest le-KA-zhem", "मुय् ˈसोन्-शात् येस्त् ले-ˈका-झेम्"],
      ["We wtorek idę do lekarza.", "On Tuesday I'm going to the doctor.", "मंगलबार म डाक्टरकहाँ जाँदैछु।", "veh FTO-rek EE-deh do le-KA-zha", "भे ˈफ़्तो-रेक् ˈइ-दे दो ले-ˈका-झा"],
      ["Gdzie jest pociąg do Krakowa?", "Where is the train to Kraków?", "क्राकोभ जाने रेल कहाँ छ?", "gjeh yest PO-chonk do kra-KO-va", "ग्जे येस्त् ˈपो-चोंक् दो क्रा-ˈको-भा"],
      ["Twój samochód jest tam.", "Your car is over there.", "तिम्रो गाडी उता छ।", "tfooy sa-MO-hoot yest tam", "त्फ़ुय् सा-ˈमो-हुत् येस्त् ताम्"],
      ["Wszystko w porządku.", "Everything is OK.", "सबै ठीक छ।", "FSHIST-ko f po-ZHONT-koo", "ˈफ़्शिस्त्-को फ़् पो-ˈझोन्त्-कु"],
      ["Mieszkam w Polsce.", "I live in Poland.", "म पोल्याण्डमा बस्छु।", "MYESH-kam f POL-stseh", "ˈम्येश्-काम् फ़् ˈपोल्-स्त्से"]
    ],
    dialogue: [
      ["Ola", "Cześć! Gdzie jest twój samochód?", "Hi! Where is your car?", "नमस्ते! तिम्रो गाडी कहाँ छ?"],
      ["Ram", "Nie mam samochodu. Jeżdżę pociągiem.", "I don't have a car. I travel by train.", "मसँग गाडी छैन। म रेलमा यात्रा गर्छु।"],
      ["Ola", "A gdzie mieszkasz?", "And where do you live?", "अनि तिमी कहाँ बस्छौ?"],
      ["Ram", "Mieszkam we Wrocławiu.", "I live in Wrocław.", "म भ्रोत्स्वाफमा बस्छु।"],
      ["Ola", "Super! Wszystko w porządku?", "Great! Is everything OK?", "राम्रो! सबै ठीक छ?"],
      ["Ram", "Tak, wszystko w porządku. Dziękuję!", "Yes, everything is fine. Thanks!", "हो, सबै ठीक छ। धन्यवाद!"]
    ]
  },

  {
    id: "start-06",
    level: "Start",
    title: "Survival kit: your first 20 words",
    titleNe: "जरुरी शब्दहरू: तपाईंका पहिला २० शब्द",
    summary: "The words and phrases you need on your very first day in Poland.",
    summaryNe: "पोल्याण्डमा पहिलो दिनै चाहिने शब्द र वाक्यहरू।",
    lesson: [
      {
        en: "These are the words you will need on your very first day in Poland. Learn them by heart. The most useful word of all is *proszę*: it means 'please', 'here you are', 'you're welcome' and — said as a question — 'pardon?' (*Proszę?*).",
        ne: "पोल्याण्डमा पहिलो दिनदेखि नै चाहिने शब्दहरू यिनै हुन्। यिनलाई कण्ठ गर्नुहोस्। सबैभन्दा काम लाग्ने शब्द *proszę* हो: यसको अर्थ 'कृपया', 'लिनुहोस्', 'केही छैन' (धन्यवादको जवाफ) र प्रश्नको लयमा 'के भन्नुभयो?' (*Proszę?*) हुन्छ।"
      },
      {
        en: "Formal or informal? Use *dzień dobry* (hello, used all day until the evening) and *do widzenia* (goodbye) with strangers, in shops, at work and in offices. In the evening say *dobry wieczór*. Use *cześć* (hi / bye) only with friends, family, children and colleagues your age. It's like तपाईं and तिमी in Nepali. **Common mistake:** saying *cześć* to your boss or a shop assistant.",
        ne: "औपचारिक कि अनौपचारिक? अपरिचित मान्छे, पसल, काम र कार्यालयमा *dzień dobry* (नमस्ते, साँझसम्म) र *do widzenia* (फेरि भेटौंला) भन्नुहोस्। साँझ *dobry wieczór* भनिन्छ। *cześć* (नमस्ते / बाइ) साथी, परिवार, बच्चा र उमेर मिल्ने सहकर्मीसँग मात्र प्रयोग गर्नुहोस्। यो नेपालीको 'तपाईं' र 'तिमी' जस्तै हो। **सामान्य गल्ती:** हाकिम वा पसलेलाई *cześć* भन्नु।"
      },
      {
        en: "*Nie* means 'no', and it also makes a verb negative when you put it in front: *wiem* (I know) → *nie wiem* (I don't know), *rozumiem* (I understand) → *nie rozumiem* (I don't understand). It's a bit like the Nepali न- in गर → नगर: the 'not' goes before the verb.",
        ne: "*Nie* को अर्थ 'होइन/नाइँ' हो, र क्रियापदअघि राख्दा क्रियालाई नकारात्मक बनाउँछ: *wiem* (मलाई थाहा छ) → *nie wiem* (मलाई थाहा छैन), *rozumiem* (म बुझ्छु) → *nie rozumiem* (मैले बुझिनँ)। नेपालीको 'गर' → 'नगर' मा 'न' जस्तै, पोलिशमा पनि *nie* क्रियाअघि आउँछ।"
      },
      {
        en: "To ask for something, start with *Przepraszam* (excuse me) to get attention, then use a question word: *Gdzie jest toaleta?* (Where is the toilet?), *Ile to kosztuje?* (How much is it?). Even two words with a question voice work: *Toaleta? Gdzie?*",
        ne: "केही सोध्नुपर्दा ध्यान खिच्न *Przepraszam* (माफ गर्नुहोस्) बाट सुरु गर्नुहोस्, अनि प्रश्नवाचक शब्द प्रयोग गर्नुहोस्: *Gdzie jest toaleta?* (शौचालय कहाँ छ?), *Ile to kosztuje?* (यसको कति पर्छ?)। प्रश्नको लयमा दुई शब्द मात्र भने पनि काम चल्छ: *Toaleta? Gdzie?*"
      },
      {
        en: "If you get stuck, say *Nie mówię po polsku* (I don't speak Polish) and *Mówię po angielsku* (I speak English) — many young Poles speak English. In an emergency shout *Pomocy!* (Help!) and call **112**, the emergency number in Poland.",
        ne: "अड्किनुभयो भने *Nie mówię po polsku* (म पोलिश बोल्दिनँ) र *Mówię po angielsku* (म अंग्रेजी बोल्छु) भन्नुहोस् — धेरै युवा पोलिशहरू अंग्रेजी बोल्छन्। आपत्कालमा *Pomocy!* (गुहार!) भनेर कराउनुहोस् र **112** मा फोन गर्नुहोस् — यो पोल्याण्डको आपत्कालीन नम्बर हो।"
      }
    ],
    tables: [
      {
        title: "Greetings: formal and informal",
        titleNe: "अभिवादन: औपचारिक र अनौपचारिक",
        head: ["Situation", "Formal", "Informal"],
        rows: [
          ["Hello (daytime)", "*dzień dobry*", "*cześć*"],
          ["Good evening", "*dobry wieczór*", "*cześć*"],
          ["Goodbye", "*do widzenia*", "*cześć* / *na razie*"],
          ["Good night", "*dobranoc*", "*dobranoc*"]
        ]
      }
    ],
    words: [
      ["tak", "yes", "हो / हजुर", "tak", "ताक्"],
      ["nie", "no / not", "होइन / नाइँ", "nyeh", "न्ये"],
      ["proszę", "please / here you are", "कृपया / लिनुहोस्", "PRO-sheh", "ˈप्रो-शे"],
      ["dziękuję", "thank you", "धन्यवाद", "jen-KOO-yeh", "जेन्-ˈकु-ये"],
      ["przepraszam", "sorry / excuse me", "माफ गर्नुहोस्", "pshe-PRA-sham", "प्शे-ˈप्रा-शाम्"],
      ["dzień dobry", "good morning / hello (formal)", "शुभ प्रभात / नमस्ते (औपचारिक)", "jeny DOB-ri", "जेन्य् ˈदोब्-रि"],
      ["cześć", "hi / bye (informal)", "नमस्ते / बाइ (अनौपचारिक)", "cheshch", "चेश्च्"],
      ["do widzenia", "goodbye (formal)", "फेरि भेटौंला (औपचारिक)", "do vee-DZE-nya", "दो भि-ˈद्ज़े-न्या"],
      ["nie rozumiem", "I don't understand", "मैले बुझिनँ", "nyeh ro-ZOO-myem", "न्ये रो-ˈज़ु-म्येम्"],
      ["nie wiem", "I don't know", "मलाई थाहा छैन", "nyeh vyem", "न्ये भ्येम्"],
      ["pomocy!", "help!", "गुहार! / मद्दत गर्नुहोस्!", "po-MO-tsi", "पो-ˈमो-त्सि"],
      ["toaleta", "toilet", "शौचालय", "to-a-LE-ta", "तो-आ-ˈले-ता"],
      ["woda", "water", "पानी", "VO-da", "ˈभो-दा"],
      ["ile?", "how much? / how many?", "कति?", "EE-leh", "ˈइ-ले"],
      ["gdzie?", "where?", "कहाँ?", "gjeh", "ग्जे"],
      ["dobrze", "good / OK / fine", "ठीक छ / राम्रो", "DOB-zheh", "ˈदोब्-झे"],
      ["nie mówię po polsku", "I don't speak Polish", "म पोलिश बोल्दिनँ", "nyeh MOO-vyeh po POL-skoo", "न्ये ˈमु-भ्ये पो ˈपोल्-स्कु"],
      ["mówię po angielsku", "I speak English", "म अंग्रेजी बोल्छु", "MOO-vyeh po an-GYEL-skoo", "ˈमु-भ्ये पो आन्-ˈग्येल्-स्कु"]
    ],
    phrases: [
      ["Gdzie jest toaleta?", "Where is the toilet?", "शौचालय कहाँ छ?", "gjeh yest to-a-LE-ta", "ग्जे येस्त् तो-आ-ˈले-ता"],
      ["Ile to kosztuje?", "How much does it cost?", "यसको कति पर्छ?", "EE-leh to kosh-TOO-yeh", "ˈइ-ले तो कोश्-ˈतु-ये"],
      ["Proszę mówić wolniej.", "Please speak more slowly.", "कृपया अलि बिस्तारै बोल्नुहोस्।", "PRO-sheh MOO-veech VOL-nyey", "ˈप्रो-शे ˈमु-भिच् ˈभोल्-न्येय्"],
      ["Czy mówi pan po angielsku?", "Do you speak English? (to a man)", "तपाईं अंग्रेजी बोल्नुहुन्छ? (पुरुषलाई)", "chi MOO-vee pan po an-GYEL-skoo", "चि ˈमु-भि पान् पो आन्-ˈग्येल्-स्कु"],
      ["Jeszcze raz, proszę.", "Once more, please.", "फेरि एक पटक भन्नुहोस् न।", "YESH-cheh ras PRO-sheh", "ˈयेश्-चे रास् ˈप्रो-शे"],
      ["Nazywam się Ram.", "My name is Ram.", "मेरो नाम राम हो।", "na-ZI-vam sheh ram", "ना-ˈज़ि-भाम् शे राम्"],
      ["Jestem z Nepalu.", "I'm from Nepal.", "म नेपालबाट हुँ।", "YES-tem z ne-PA-loo", "ˈयेस्-तेम् ज़् ने-ˈपा-लु"],
      ["Potrzebuję lekarza.", "I need a doctor.", "मलाई डाक्टर चाहियो।", "po-tshe-BOO-yeh le-KA-zha", "पो-त्शे-ˈबु-ये ले-ˈका-झा"]
    ],
    dialogue: [
      ["Ram", "Przepraszam! Dzień dobry!", "Excuse me! Hello!", "माफ गर्नुहोस्! नमस्ते!"],
      ["Pani", "Dzień dobry.", "Hello.", "नमस्ते।"],
      ["Ram", "Nie mówię po polsku. Mówi pani po angielsku?", "I don't speak Polish. Do you speak English?", "म पोलिश बोल्दिनँ। तपाईं अंग्रेजी बोल्नुहुन्छ?"],
      ["Pani", "Nie, przepraszam. Nie rozumiem.", "No, sorry. I don't understand.", "अहँ, माफ गर्नुहोस्। मैले बुझिनँ।"],
      ["Ram", "Toaleta? Gdzie?", "Toilet? Where?", "शौचालय? कहाँ?"],
      ["Pani", "Tam, prosto.", "Over there, straight ahead.", "उता, सिधा।"],
      ["Ram", "Dziękuję! Do widzenia!", "Thank you! Goodbye!", "धन्यवाद! फेरि भेटौंला!"],
      ["Pani", "Do widzenia!", "Goodbye!", "फेरि भेटौंला!"]
    ]
  }
);

// Letter pairs that make one sound. Shown on the alphabet page.
window.SLOWKA_LETTER_PAIRS = [
  { letters: "ch", soundEn: "throaty h, the same sound as h", soundNe: "घाँटीबाट 'ह' (h जस्तै)", example: "chleb", exampleEn: "bread", exampleNe: "पाउरोटी", pron: "hlep", proNe: "ह्लेप्" },
  { letters: "cz", soundEn: "hard ch, as in 'church'", soundNe: "कडा 'च'", example: "czas", exampleEn: "time", exampleNe: "समय", pron: "chas", proNe: "चास्" },
  { letters: "sz", soundEn: "hard sh: tongue up, lips round", soundNe: "कडा 'श' (जिब्रो माथि, ओठ गोलो)", example: "szkoła", exampleEn: "school", exampleNe: "विद्यालय", pron: "SHKO-wa", proNe: "ˈश्को-वा" },
  { letters: "rz", soundEn: "zh as in 'pleasure', the same sound as ż", soundNe: "'झ' (ż जस्तै)", example: "rzeka", exampleEn: "river", exampleNe: "नदी", pron: "ZHEH-ka", proNe: "ˈझे-का" },
  { letters: "dz", soundEn: "dz as in 'adze'", soundNe: "'द्ज़'", example: "dzwon", exampleEn: "bell", exampleNe: "घण्टी", pron: "dzvon", proNe: "द्ज़्भोन्" },
  { letters: "dź", soundEn: "soft j, as in 'jeep' (the same as dzi)", soundNe: "नरम 'ज'", example: "dźwięk", exampleEn: "sound", exampleNe: "आवाज", pron: "jvyenk", proNe: "ज्भ्येंक्" },
  { letters: "dż", soundEn: "hard j, as in 'jam'", soundNe: "कडा 'ज'", example: "dżem", exampleEn: "jam", exampleNe: "जाम", pron: "jem", proNe: "जेम्" },
  { letters: "ci", soundEn: "before a vowel: soft ch, the same as ć", soundNe: "स्वरअघि: नरम 'च' (ć जस्तै)", example: "ciocia", exampleEn: "aunt", exampleNe: "काकी / फुपू", pron: "CHO-cha", proNe: "ˈचो-चा" },
  { letters: "si", soundEn: "before a vowel: soft sh, the same as ś", soundNe: "स्वरअघि: नरम 'श' (ś जस्तै)", example: "siostra", exampleEn: "sister", exampleNe: "दिदी / बहिनी", pron: "SHOS-tra", proNe: "ˈशोस्-त्रा" },
  { letters: "zi", soundEn: "before a vowel: soft zh, the same as ź", soundNe: "स्वरअघि: नरम 'झ' (ź जस्तै)", example: "zima", exampleEn: "winter", exampleNe: "जाडो", pron: "ZHEE-ma", proNe: "ˈझि-मा" },
  { letters: "ni", soundEn: "before a vowel: ny, the same as ń", soundNe: "स्वरअघि: 'न्य' (ń जस्तै)", example: "nie", exampleEn: "no, not", exampleNe: "होइन", pron: "nyeh", proNe: "न्ये" },
  { letters: "dzi", soundEn: "before a vowel: soft j, the same as dź", soundNe: "स्वरअघि: नरम 'ज' (dź जस्तै)", example: "dziecko", exampleEn: "child", exampleNe: "बच्चा", pron: "JETS-ko", proNe: "ˈजेत्स्-को" },
];
