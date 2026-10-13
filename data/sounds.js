// Sound contrasts that are hard for Nepali speakers (minimal pairs).
// Format: tools/PRACTICE_GUIDE.md section 8. In each pair the first word has sound "a", the second sound "b".
window.SLOWKA_SOUNDS = [
  {
    id: "sz-s", title: "sz or ś", titleNe: "sz कि ś",
    a: { label: "sz", mouth: "retro" },
    b: { label: "ś", mouth: "palatal" },
    tip: {
      en: "Both sounds are close to Nepali श, but Polish keeps them apart. For *sz*, lift the tip of your tongue up and a little back behind the gum ridge, keep the tongue fairly flat and push the lips slightly forward: it sounds deep and \"dark\", like English \"sh\" in \"shop\". For *ś* (also written *si*), keep the tongue tip down behind the lower teeth, press the middle of the tongue up towards the roof of the mouth and spread your lips as if smiling: it sounds thin and soft, like श्य. Test yourself: *sz* has round lips, *ś* has a smile.",
      ne: "दुवै आवाज नेपालीको श जस्तै सुनिन्छन्, तर पोलिशमा यी फरक हुन्। *sz* भन्दा जिब्रोको टुप्पो माथि, गिजाको अलि पछाडि उठाउनुहोस्, जिब्रो अलि चेप्टो राख्नुहोस् र ओठ अलिकति अगाडि निकाल्नुहोस्: आवाज गहिरो र भारी सुनिन्छ, अंग्रेजी \"shop\" को \"sh\" जस्तै। *ś* (*si* पनि लेखिन्छ) भन्दा जिब्रोको टुप्पो तलका दाँतपछाडि राख्नुहोस्, जिब्रोको बीच भाग तालुतिर उठाउनुहोस् र मुस्कुराए जस्तै ओठ फैलाउनुहोस्: आवाज पातलो र नरम, श्य जस्तो सुनिन्छ। आफैं जाँच्नुहोस्: *sz* मा ओठ गोलो, *ś* मा मुस्कान।"
    },
    pairs: [
      [["kasza", "groats, porridge", "दलिया"], ["Kasia", "Kasia (a name)", "काशा (नाम)"]],
      [["proszę", "please", "कृपया"], ["prosię", "piglet", "सुँगुरको बच्चा"]],
      [["kosz", "basket, bin", "टोकरी, फोहोर फाल्ने भाँडो"], ["koś", "mow! (cut the grass)", "(घाँस) काट!"]],
      [["nosze", "stretcher", "स्ट्रेचर"], ["nosie", "nose (w nosie = in the nose)", "नाक (नाकमा)"]],
      [["szyna", "rail", "रेलको पटरी"], ["sina", "blue-grey, bluish (f.)", "निलो-खैरो (स्त्रीलिङ्ग)"]],
      [["kaszka", "baby porridge", "बच्चाको दलिया"], ["Kaśka", "Kaśka (a name)", "काश्का (नाम)"]]
    ]
  },
  {
    id: "cz-c", title: "cz or ć", titleNe: "cz कि ć",
    a: { label: "cz", mouth: "retro" },
    b: { label: "ć", mouth: "palatal" },
    tip: {
      en: "Both sounds are like Nepali च, but they are made in different places. For *cz*, put the tip of your tongue up behind the gum ridge (almost where you say ट) and round your lips a little: it is hard and deep, like English \"ch\" in \"church\". For *ć* (also written *ci*), keep the tongue tip down, press the flat middle of the tongue against the roof of the mouth and spread your lips: it is soft and thin, like च्य. Do not add air after either sound: say च, not छ.",
      ne: "दुवै आवाज नेपालीको च जस्तै हुन्, तर मुखको फरक ठाउँमा बन्छन्। *cz* भन्दा जिब्रोको टुप्पो गिजाको पछाडि माथि (ट भन्ने ठाउँ नजिक) लैजानुहोस् र ओठ अलिकति गोलो बनाउनुहोस्: आवाज कडा र गहिरो हुन्छ, अंग्रेजी \"church\" को \"ch\" जस्तै। *ć* (*ci* पनि लेखिन्छ) भन्दा जिब्रोको टुप्पो तल राख्नुहोस्, जिब्रोको चेप्टो बीच भाग तालुमा थिच्नुहोस् र ओठ फैलाउनुहोस्: आवाज नरम र पातलो, च्य जस्तो हुन्छ। कुनै पनि आवाजपछि हावा नफाल्नुहोस्: च भन्नुहोस्, छ होइन।"
    },
    pairs: [
      [["czy", "question word; whether, or", "के (प्रश्न); कि"], ["ci", "to you (informal)", "तिमीलाई"]],
      [["lecz", "but (formal)", "तर (औपचारिक)"], ["leć", "fly! run!", "उड! दौड!"]],
      [["płacz", "crying", "रुवाइ"], ["płać", "pay!", "पैसा तिर!"]],
      [["bicz", "whip", "कोर्रा"], ["bić", "to beat, to hit", "पिट्नु"]],
      [["rycz", "roar! bawl!", "गर्ज! ठूलो स्वरले रो!"], ["ryć", "to dig (like a pig), to burrow", "(सुँगुरले झैं) खन्नु"]],
      [["życz", "wish (me)! (życz mi szczęścia)", "शुभकामना देऊ!"], ["żyć", "to live", "बाँच्नु"]]
    ]
  },
  {
    id: "rz-z", title: "ż/rz or ź", titleNe: "ż/rz कि ź",
    a: { label: "ż/rz", mouth: "retro" },
    b: { label: "ź", mouth: "palatal" },
    tip: {
      en: "*ż* and *rz* are the same sound. They are the buzzing (voiced) partners of *sz* and *ś*: make *sz* and *ś* first, then switch on your voice. For *ż/rz*, lift the tongue tip up behind the gum ridge and round the lips a little, like the \"s\" in English \"measure\"; it is close to a buzzing झ without the extra breath. For *ź* (also written *zi*), keep the tongue tip down, raise the middle of the tongue to the roof of the mouth and smile: a soft, thin buzz, like ज़्य. Put your hand on your throat: you should feel it vibrate for both.",
      ne: "*ż* र *rz* एउटै आवाज हुन्। यी *sz* र *ś* का भनभनाउने (घोष) जोडी हुन्: पहिले *sz* र *ś* भन्नुहोस्, अनि घाँटीबाट स्वर थप्नुहोस्। *ż/rz* भन्दा जिब्रोको टुप्पो गिजाको पछाडि माथि उठाउनुहोस् र ओठ अलिकति गोलो पार्नुहोस्, अंग्रेजी \"measure\" को \"s\" जस्तै; यो हावा नफालेको भनभनाउने झ जस्तो हो। *ź* (*zi* पनि लेखिन्छ) भन्दा जिब्रोको टुप्पो तल राख्नुहोस्, बीच भाग तालुतिर उठाउनुहोस् र मुस्कुराउनुहोस्: नरम र पातलो भनभनाहट, ज़्य जस्तो। घाँटीमा हात राख्नुहोस्: दुवैमा कम्पन महसुस हुनुपर्छ।"
    },
    pairs: [
      [["wieże", "towers", "धरहराहरू"], ["wiezie", "carries, drives (by vehicle)", "(गाडीमा) लैजान्छ"]],
      [["wożę", "I carry, I drive (by vehicle)", "म (गाडीमा) ओसार्छु"], ["wozie", "cart (na wozie = on the cart)", "गाडा (गाडामा)"]],
      [["ważę", "I weigh", "म तौलिन्छु, म तौल गर्छु"], ["wazie", "vase (w wazie = in the vase)", "फूलदान (फूलदानमा)"]],
      [["burze", "storms", "आँधीबेहरीहरू"], ["buzie", "faces, mouths (informal)", "मुखहरू (बोलीचालीमा)"]],
      [["porze", "time (o tej porze = at this time)", "समय (यो समयमा)"], ["pozie", "pose (w pozie = in a pose)", "पोज, मुद्रा (पोजमा)"]],
      [["mrożę", "I freeze (food)", "म (खाना) फ्रिज गर्छु"], ["mrozie", "frost (na mrozie = out in the frost)", "कडा जाडो (बाहिर जाडोमा)"]]
    ]
  },
  {
    id: "sz-s2", title: "sz or s", titleNe: "sz कि s",
    a: { label: "sz", mouth: "retro" },
    b: { label: "s", mouth: "dental" },
    tip: {
      en: "Nepali speakers often say श and स in the same way, but in Polish this changes the word. For *s*, put the tip of your tongue just behind the upper front teeth and spread your lips a little: a sharp, hissing sound like स. For *sz*, pull the tongue tip up and back behind the gum ridge and push your lips slightly forward: a deeper, rounder sound like English \"sh\". Say *sok* (juice) and *szok* (shock) slowly, one after the other, and feel your tongue move back.",
      ne: "धेरै नेपाली वक्ताले श र स एउटै तरिकाले भन्छन्, तर पोलिशमा यसले शब्दै बदलिन्छ। *s* भन्दा जिब्रोको टुप्पो माथिका अगाडिका दाँतको ठीक पछाडि राख्नुहोस् र ओठ अलिकति फैलाउनुहोस्: स जस्तै तीखो, सुसाउने आवाज। *sz* भन्दा जिब्रोको टुप्पो माथि र पछाडि, गिजाको पछाडि तान्नुहोस् र ओठ अलिकति अगाडि निकाल्नुहोस्: अंग्रेजी \"sh\" जस्तै गहिरो, गोलो आवाज। *sok* (जुस) र *szok* (झट्का) बिस्तारै एकपछि अर्को भन्नुहोस् र जिब्रो पछाडि सरेको महसुस गर्नुहोस्।"
    },
    pairs: [
      [["szum", "noise, rustle", "सुसाइ, आवाज"], ["sum", "catfish", "क्याटफिस माछा"]],
      [["szok", "shock", "झट्का"], ["sok", "juice", "जुस"]],
      [["kasza", "groats, porridge", "दलिया"], ["kasa", "till, checkout", "क्यास काउन्टर"]],
      [["kosz", "basket, bin", "टोकरी, फोहोर फाल्ने भाँडो"], ["kos", "blackbird", "कालो चरा (ब्ल्याकबर्ड)"]],
      [["nasz", "our", "हाम्रो"], ["nas", "us", "हामीलाई"]],
      [["wasz", "your (plural)", "तिमीहरूको, तपाईंहरूको"], ["was", "you (plural, object)", "तिमीहरूलाई, तपाईंहरूलाई"]]
    ]
  },
  {
    id: "cz-c2", title: "cz or c", titleNe: "cz कि c",
    a: { label: "cz", mouth: "retro" },
    b: { label: "c", mouth: "dental" },
    tip: {
      en: "Polish *c* is not \"k\": it is always \"ts\", like त्स said as one quick sound. Put the tongue tip behind the upper front teeth, touch, and let the air hiss out: *c* = त + स together. For *cz*, the tongue tip goes further back and up, behind the gum ridge, and the lips round a little: like च in चिया, or English \"ch\". If you are not sure, think: *c* hisses like a snake (त्स), *cz* sounds like a train (च).",
      ne: "पोलिश *c* \"क\" होइन: यो सधैं \"त्स\" हो, त र स लाई एउटै छिटो आवाजमा भनेजस्तो। जिब्रोको टुप्पो माथिका अगाडिका दाँतपछाडि छुनुहोस् र हावा सुसाउँदै निकाल्नुहोस्: *c* = त + स सँगै। *cz* भन्दा जिब्रोको टुप्पो अझ पछाडि र माथि, गिजाको पछाडि जान्छ र ओठ अलिकति गोलो हुन्छ: चिया को च जस्तै, वा अंग्रेजी \"ch\"। शंका लागे सम्झनुहोस्: *c* सर्प जस्तै सुसाउँछ (त्स), *cz* रेल जस्तो सुनिन्छ (च)।"
    },
    pairs: [
      [["czar", "charm, magic spell", "जादु"], ["car", "tsar (Russian emperor)", "जार (रुसी सम्राट)"]],
      [["piecz", "bake!", "(ओभनमा) पका!"], ["piec", "oven, stove", "ओभन, चुलो"]],
      [["taczka", "wheelbarrow", "ठेलागाडा (एक पाङ्ग्रे)"], ["tacka", "small tray", "सानो ट्रे"]],
      [["moczy", "soaks, makes wet", "भिजाउँछ"], ["mocy", "power (bez mocy = without power)", "शक्ति (शक्तिबिना)"]],
      [["czysta", "clean (f.)", "सफा (स्त्रीलिङ्ग)"], ["cysta", "cyst", "सिस्ट (गाँठो)"]],
      [["Czech", "a Czech (man)", "चेक मानिस"], ["cech", "guild (of craftsmen)", "कारीगरहरूको संघ"]]
    ]
  },
  {
    id: "y-i", title: "y or i", titleNe: "y कि i",
    a: { label: "y", mouth: "mid-vowel" },
    b: { label: "i", mouth: "front-vowel" },
    tip: {
      en: "Polish *i* is like a short Nepali इ: tongue high and forward, lips spread in a smile. Polish *y* has no exact Nepali letter: start from इ, then pull your tongue a little back and let your jaw drop slightly, so the sound moves towards उ without rounding the lips. It is close to the vowel in English \"bit\". Do not say *y* as इ: *my* (we) and *mi* (to me) are different words.",
      ne: "पोलिश *i* छोटो नेपाली इ जस्तै हो: जिब्रो माथि र अगाडि, ओठ मुस्कुराए जस्तै फैलिएको। पोलिश *y* को लागि नेपालीमा ठ्याक्कै अक्षर छैन: इ बाट सुरु गर्नुहोस्, अनि जिब्रो अलिकति पछाडि तान्नुहोस् र बङ्गारा अलिकति तल झार्नुहोस्, ताकि आवाज उ तिर सरोस् तर ओठ गोलो नहोस्। यो अंग्रेजी \"bit\" को स्वर जस्तै हो। *y* लाई इ नभन्नुहोस्: *my* (हामी) र *mi* (मलाई) फरक शब्द हुन्।"
    },
    pairs: [
      [["my", "we", "हामी"], ["mi", "to me", "मलाई"]],
      [["być", "to be", "हुनु"], ["bić", "to beat, to hit", "पिट्नु"]],
      [["pył", "dust", "धुलो"], ["pił", "(he) drank", "(उसले) पियो"]],
      [["myły", "(they, f.) washed", "(उनीहरूले) धोए"], ["miły", "nice, kind (m.)", "राम्रो, दयालु (पुलिङ्ग)"]],
      [["byli", "(they) were", "(उनीहरू) थिए"], ["bili", "(they) beat, hit", "(उनीहरूले) पिटे"]],
      [["wyć", "to howl", "(कुकुरले झैं) कराउनु"], ["wić", "to weave, to twist", "बुन्नु, बटार्नु"]],
      [["pysk", "snout, muzzle", "जनावरको थुतुनो"], ["pisk", "squeak, squeal", "चिच्याहट"]]
    ]
  },
  {
    id: "e-e", title: "e or ę", titleNe: "e कि ę",
    a: { label: "e", mouth: "mid-vowel" },
    b: { label: "ę", mouth: "nasal" },
    tip: {
      en: "Polish *e* is a short, clear ए, with the mouth half open. *ę* is the same ए, but some air goes out through the nose, like the nasal sound in Nepali गएँ or हुँ (चन्द्रबिन्दु). Before *k* or *g* it sounds like \"en\" (*lęk* = लेन्क), and before *p* or *b* like \"em\". At the very end of a word *ę* is weak and many people say it almost like *e*, but in careful speech keep a little nose sound. Pinch your nose while saying *ę*: if the sound changes, you are doing it right.",
      ne: "पोलिश *e* छोटो, सफा ए हो, मुख आधा खुला। *ę* पनि त्यही ए हो, तर केही हावा नाकबाट निस्कन्छ, नेपालीको गएँ वा हुँ (चन्द्रबिन्दु) को आवाज जस्तै। *k* वा *g* अगाडि यो \"एन्\" जस्तो सुनिन्छ (*lęk* = लेन्क), र *p* वा *b* अगाडि \"एम्\" जस्तो। शब्दको अन्तिममा *ę* कमजोर हुन्छ र धेरैले लगभग *e* जस्तै भन्छन्, तर ध्यान दिएर बोल्दा अलिकति नाके आवाज राख्नुहोस्। *ę* भन्दा नाक थिचेर हेर्नुहोस्: आवाज बदलियो भने तपाईंले ठीक भन्दै हुनुहुन्छ।"
    },
    pairs: [
      [["lek", "medicine, medication", "औषधि"], ["lęk", "fear, anxiety", "डर, चिन्ता"]],
      [["gesty", "gestures", "इसाराहरू"], ["gęsty", "thick, dense", "बाक्लो"]],
      [["krety", "moles (animals)", "जमिनमुनि बस्ने मुसा जस्ता जनावर (मोल)"], ["kręty", "winding, twisting", "घुमाउरो"]],
      [["wieź", "drive (someone)! carry (by vehicle)!", "(गाडीमा) लैजाऊ!"], ["więź", "bond, tie", "नाता, सम्बन्ध"]],
      [["te", "these", "यी"], ["tę", "this (f., object)", "यो (स्त्रीलिङ्ग, कर्म)"]],
      [["chce", "(he/she) wants", "(ऊ) चाहन्छ"], ["chcę", "I want", "म चाहन्छु"]]
    ]
  },
  {
    id: "o-a", title: "ą or o", titleNe: "ą कि o",
    a: { label: "ą", mouth: "nasal" },
    b: { label: "o", mouth: "round" },
    tip: {
      en: "Polish *o* is a short, pure ओ with round lips. *ą* is the same ओ, but with air going through the nose too, like Nepali ओं (छौं, हौं). Before *k*, *t* or *d* it sounds like \"on\" (*kąt* = कोन्त), and before *p* or *b* like \"om\" (*ząb* = ज़ोम्प). Do not say *ą* as आ: the letter looks like *a*, but the sound is ओ. Keep your lips round for both, and only open the nose for *ą*.",
      ne: "पोलिश *o* छोटो, शुद्ध ओ हो, ओठ गोलो। *ą* पनि त्यही ओ हो, तर हावा नाकबाट पनि जान्छ, नेपालीको ओं (छौं, हौं) जस्तै। *k*, *t* वा *d* अगाडि यो \"ओन्\" जस्तो सुनिन्छ (*kąt* = कोन्त), र *p* वा *b* अगाडि \"ओम्\" जस्तो (*ząb* = ज़ोम्प)। *ą* लाई आ नभन्नुहोस्: अक्षर *a* जस्तो देखिन्छ, तर आवाज ओ हो। दुवैमा ओठ गोलो राख्नुहोस्, र *ą* मा मात्र नाक खोल्नुहोस्।"
    },
    pairs: [
      [["kąt", "corner, angle", "कुना, कोण"], ["kot", "cat", "बिरालो"]],
      [["bąk", "bumblebee", "भमरा"], ["bok", "side", "छेउ, कोखा"]],
      [["rąk", "of hands (dwóch rąk = of two hands)", "हातहरूको"], ["rok", "year", "वर्ष"]],
      [["kąsa", "bites (insect, dog)", "टोक्छ"], ["kosa", "scythe", "घाँस काट्ने लामो हँसिया"]],
      [["wąski", "narrow", "साँघुरो"], ["woski", "waxes", "मैनहरू"]],
      [["sądy", "courts (of law)", "अदालतहरू"], ["sody", "soda (bez sody = without soda)", "सोडा (सोडाबिना)"]]
    ]
  },
  {
    id: "l-l", title: "l or ł", titleNe: "l कि ł",
    a: { label: "l", mouth: "dental" },
    b: { label: "ł", mouth: "round" },
    tip: {
      en: "Polish *l* is like Nepali ल: the tongue tip touches the back of the upper front teeth. Polish *ł* is not an \"l\" at all: it sounds like English \"w\" in \"water\", or a quick उ/व. For *ł*, the tongue does not touch anything; just round your lips quickly and open them into the next vowel. So *łata* (patch) sounds like \"वाता\", and *lata* (years) like \"लाता\".",
      ne: "पोलिश *l* नेपालीको ल जस्तै हो: जिब्रोको टुप्पोले माथिका अगाडिका दाँतको पछाडि छुन्छ। पोलिश *ł* \"ल\" होइन: यो अंग्रेजी \"water\" को \"w\" जस्तै, वा छिटो उ/व जस्तो सुनिन्छ। *ł* भन्दा जिब्रोले कतै छुँदैन; ओठ छिटो गोलो पार्नुहोस् र अर्को स्वरमा खोल्नुहोस्। त्यसैले *łata* (टालो) \"वाता\" जस्तो, र *lata* (वर्षहरू) \"लाता\" जस्तो सुनिन्छ।"
    },
    pairs: [
      [["lata", "years; summers", "वर्षहरू; गर्मीहरू"], ["łata", "patch", "टालो"]],
      [["laska", "walking stick", "लट्ठी"], ["łaska", "grace, favour", "कृपा, दया"]],
      [["mila", "mile", "माइल"], ["miła", "nice, kind (f.)", "राम्री, दयालु (स्त्रीलिङ्ग)"]],
      [["lawa", "lava", "लाभा"], ["ława", "bench", "बेन्च"]],
      [["luk", "hatch (on a ship or plane)", "(जहाजको) ढोका, प्वाल"], ["łuk", "bow; arch", "धनु; आर्च"]],
      [["wola", "will", "इच्छा"], ["woła", "calls, shouts", "बोलाउँछ, कराउँछ"]]
    ]
  },
  {
    id: "h-k", title: "ch/h or k", titleNe: "ch/h कि k",
    a: { label: "ch/h", mouth: "back" },
    b: { label: "k", mouth: "back" },
    tip: {
      en: "*ch* and *h* are the same sound in Polish. It is not the soft Nepali ह: raise the back of your tongue close to the soft palate, but do not touch it, and push air through the narrow gap so it sounds rough, like clearing your throat gently (like Hindi/Urdu ख़). For *k*, the back of the tongue really touches the soft palate and then lets go: like Nepali क. Say *k* without a puff of air (क, not ख). Both are made in the same place, so the only difference is: *k* stops the air, *ch/h* lets it rub through.",
      ne: "पोलिशमा *ch* र *h* एउटै आवाज हुन्। यो नेपालीको नरम ह होइन: जिब्रोको पछाडिको भाग नरम तालुको नजिक उठाउनुहोस्, तर नछुनुहोस्, र साँघुरो ठाउँबाट हावा धकेल्नुहोस् ताकि आवाज खस्रो सुनियोस्, बिस्तारै घाँटी सफा गरेजस्तो (हिन्दी/उर्दूको ख़ जस्तै)। *k* भन्दा जिब्रोको पछाडिको भागले साँच्चै नरम तालु छुन्छ र छोड्छ: नेपालीको क जस्तै। *k* पछि हावा नफाल्नुहोस् (क, ख होइन)। दुवै एउटै ठाउँमा बन्छन्, फरक यति मात्र: *k* ले हावा रोक्छ, *ch/h* ले हावालाई घस्रिँदै निस्कन दिन्छ।"
    },
    pairs: [
      [["hura", "hooray!", "हुर्रे! जय!"], ["kura", "hen", "कुखुरा"]],
      [["hula", "(the wind) blows wildly; parties hard", "(हावा) हुरी चल्छ; रमाइलो गर्छ"], ["kula", "ball, sphere; crutch", "गोला; बैसाखी"]],
      [["huta", "steelworks", "फलाम/स्टिल कारखाना"], ["kuta", "forged, wrought (f.)", "पिटेर बनाइएको (स्त्रीलिङ्ग)"]],
      [["chory", "sick, ill", "बिरामी"], ["kory", "tree bark (bez kory = without bark)", "रुखको बोक्रा (बोक्राबिना)"]],
      [["chart", "greyhound", "सिकारी कुकुर (ग्रेहाउन्ड)"], ["kart", "of cards (talia kart = a deck of cards)", "तासका पत्तीहरूको"]],
      [["hit", "hit (song)", "चर्चित गीत"], ["kit", "putty, filler", "पुट्टी"]]
    ]
  }
];
