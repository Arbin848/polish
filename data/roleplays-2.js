window.SLOWKA_ROLEPLAYS = window.SLOWKA_ROLEPLAYS || [];

// ---------------------------------------------------------------- B1

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b1-doctor",
  level: "B1",
  title: "At the GP: fever and a sick note",
  titleNe: "डाक्टरकहाँ: ज्वरो र बिरामी बिदाको पत्र",
  scene: {
    en: "For three days you have had a fever and a sore throat. You are at your family doctor (*lekarz rodzinny*) in a clinic. You need medicine and a sick note (*L4*) for work. (Replies use the forms a man says; a woman says *miałam*, *brałam*.)",
    ne: "तीन दिनदेखि तपाईंलाई ज्वरो छ र घाँटी दुखेको छ। तपाईं क्लिनिकमा आफ्नो पारिवारिक डाक्टर (*lekarz rodzinny*) कहाँ हुनुहुन्छ। तपाईंलाई औषधि र कामका लागि बिरामी बिदाको पत्र (*L4*) चाहिएको छ। (जवाफहरू पुरुषले बोल्ने रूपमा छन्; महिलाले *miałam*, *brałam* भन्छन्।)"
  },
  them: "Lekarka",
  themEn: "Doctor (woman)",
  themNe: "डाक्टर (महिला)",
  steps: [
    {
      them: ["Dzień dobry, proszę usiąść. Co Panu dolega?", "Hello, please sit down. What's troubling you?", "नमस्ते, बस्नुहोस्। तपाईंलाई के समस्या छ?"],
      replies: [
        { pl: "Dzień dobry. Od trzech dni mam gorączkę i boli mnie gardło.", en: "Hello. I've had a fever for three days and my throat hurts.", ne: "नमस्ते। तीन दिनदेखि मलाई ज्वरो छ र घाँटी दुखेको छ।", ok: true },
        { pl: "Dzień dobry. Od trzech dni mam gorączkę i ja boli gardło.", en: "(wrong: 'I hurts throat')", ne: "(गलत: 'म घाँटी दुख्छ')", ok: false,
          why: { en: "With *boleć* (to hurt) the thing that hurts is the subject and the person is the object: *boli mnie gardło* — literally 'the throat hurts me'. Nepali works the same way: 'मलाई घाँटी दुख्छ', not 'म घाँटी दुख्छु'.",
                 ne: "*boleć* (दुख्नु) मा दुख्ने अंग कर्ता हुन्छ र मान्छे कर्म हुन्छ: *boli mnie gardło* — शाब्दिक रूपमा 'घाँटीले मलाई दुखाउँछ'। नेपालीमा पनि यस्तै हो: 'मलाई घाँटी दुख्छ' भनिन्छ, 'म घाँटी दुख्छु' होइन।" } },
        { pl: "Cześć! Słuchaj, jestem chory.", en: "Hi! Listen, I'm ill.", ne: "हाई! सुन, म बिरामी छु।", ok: false,
          why: { en: "*Cześć* and *słuchaj* (a *ty* command) are for friends. A doctor is spoken to formally: *Dzień dobry*, and *Pan/Pani* forms. Like तपाईं, not तिमी.",
                 ne: "*Cześć* र *słuchaj* (*ty* को आदेश रूप) साथीहरूसँग मात्र भनिन्छ। डाक्टरसँग औपचारिक बोलिन्छ: *Dzień dobry* र *Pan/Pani* का रूपहरू। तिमी होइन, तपाईं जस्तै।" } }
      ]
    },
    {
      them: ["Ile ma Pan gorączki? Mierzył Pan temperaturę?", "How high is your fever? Did you take your temperature?", "ज्वरो कति छ? तपाईंले तापक्रम नाप्नुभयो?"],
      replies: [
        { pl: "Tak, wczoraj wieczorem miałem trzydzieści osiem i pół.", en: "Yes, last night I had 38.5.", ne: "हो, हिजो बेलुका मलाई ३८.५ थियो।", ok: true },
        { pl: "Tak, rano było prawie trzydzieści dziewięć stopni.", en: "Yes, this morning it was almost 39 degrees.", ne: "हो, बिहान झन्डै ३९ डिग्री थियो।", ok: true },
        { pl: "Tak, mierzyłem jutro rano.", en: "(wrong: 'I measured tomorrow morning')", ne: "(गलत: 'मैले भोलि बिहान नापें')", ok: false,
          why: { en: "*Jutro* means tomorrow. For the past use *wczoraj* (yesterday) or *dzisiaj rano* (this morning): *Mierzyłem wczoraj wieczorem.*",
                 ne: "*Jutro* को अर्थ भोलि हो। भूतकालका लागि *wczoraj* (हिजो) वा *dzisiaj rano* (आज बिहान) भन्नुहोस्: *Mierzyłem wczoraj wieczorem.*" } }
      ]
    },
    {
      them: ["Ma Pan jeszcze inne objawy? Kaszel, katar?", "Do you have any other symptoms? A cough, a runny nose?", "अरू कुनै लक्षण छन्? खोकी, रुघा?"],
      replies: [
        { pl: "Mam suchy kaszel, ale kataru nie mam.", en: "I have a dry cough, but no runny nose.", ne: "सुक्खा खोकी छ, तर रुघा छैन।", ok: true },
        { pl: "Mam suchy kaszel, ale nie mam katar.", en: "(wrong form after 'nie mam')", ne: "(*nie mam* पछि गलत रूप)", ok: false,
          why: { en: "After a negative verb the object goes into the genitive: *mam katar* → *nie mam kataru*. This is one of the most common mistakes, so listen for it.",
                 ne: "नकारात्मक क्रियापछि कर्म षष्ठी (genitive) मा जान्छ: *mam katar* → *nie mam kataru*। यो धेरै सामान्य गल्ती हो, ध्यान दिनुहोस्।" } },
        { pl: "Tak, mam kaszlę i katar.", en: "(wrong: noun and verb mixed)", ne: "(गलत: नाम र क्रिया मिसिएको)", ok: false,
          why: { en: "*Kaszlę* is the verb 'I cough'. *Kaszel* is the noun 'a cough'. Say *mam kaszel* (I have a cough) or simply *kaszlę* (I cough) — not a mix.",
                 ne: "*Kaszlę* क्रिया हो: 'म खोक्छु'। *Kaszel* नाम हो: 'खोकी'। *mam kaszel* (मलाई खोकी छ) वा सिधै *kaszlę* (म खोक्छु) भन्नुहोस् — दुवै मिसाएर होइन।" } }
      ]
    },
    {
      them: ["Proszę otworzyć usta… Gardło jest mocno czerwone. Czy bierze Pan jakieś leki?", "Please open your mouth… Your throat is very red. Are you taking any medicines?", "मुख खोल्नुहोस्… घाँटी धेरै रातो छ। तपाईं कुनै औषधि खाँदै हुनुहुन्छ?"],
      replies: [
        { pl: "Brałem tylko paracetamol, ale nie pomógł.", en: "I only took paracetamol, but it didn't help.", ne: "मैले पारासिटामोल मात्र खाएँ, तर फाइदा भएन।", ok: true },
        { pl: "Nie, nie biorę żadnych leków. Nie mam też alergii.", en: "No, I'm not taking any medicines. I don't have any allergies either.", ne: "होइन, म कुनै औषधि खाँदिनँ। मलाई कुनै एलर्जी पनि छैन।", ok: true },
        { pl: "Nie, nie biorę żadne leki.", en: "(wrong form after 'nie')", ne: "(*nie* पछि गलत रूप)", ok: false,
          why: { en: "Again the negative rule: *biorę leki* → *nie biorę żadnych leków* (genitive plural). *Żadne leki* is the basic (nominative) form, e.g. *Żadne leki nie pomagają* (No medicines help).",
                 ne: "फेरि नकारात्मक नियम: *biorę leki* → *nie biorę żadnych leków* (षष्ठी बहुवचन)। *Żadne leki* मूल (प्रथमा) रूप हो, जस्तै *Żadne leki nie pomagają* (कुनै औषधिले काम गर्दैन)।" } }
      ]
    },
    {
      them: ["To wygląda na anginę. Wypiszę Panu antybiotyk. Recepta będzie elektroniczna — dostanie Pan SMS z kodem.", "It looks like tonsillitis. I'll prescribe you an antibiotic. The prescription will be electronic — you'll get an SMS with a code.", "यो टन्सिलको संक्रमण जस्तो देखिन्छ। म तपाईंलाई एन्टिबायोटिक लेखिदिन्छु। पुर्जा इलेक्ट्रोनिक हुनेछ — तपाईंलाई कोडसहितको SMS आउँछ।"],
      replies: [
        { pl: "Dobrze. Jak często mam brać ten antybiotyk?", en: "OK. How often should I take this antibiotic?", ne: "ठीक छ। यो एन्टिबायोटिक कति पटक खानुपर्छ?", ok: true },
        { pl: "Dobrze. Jak często mam wziąć ten antybiotyk?", en: "(wrong aspect)", ne: "(गलत पक्ष/aspect)", ok: false,
          why: { en: "*Jak często* (how often) is about a repeated action, so use the imperfective *brać*. *Wziąć* is perfective — one single time: *Proszę wziąć jedną tabletkę teraz.*",
                 ne: "*Jak często* (कति पटक) बारम्बार हुने कामको कुरा हो, त्यसैले अपूर्ण क्रिया *brać* प्रयोग गर्नुहोस्। *Wziąć* पूर्ण क्रिया हो — एक पटक मात्र: *Proszę wziąć jedną tabletkę teraz.*" } },
        { pl: "Dobra, dawaj receptę.", en: "OK, give me the prescription.", ne: "ठिकै छ, पुर्जा देऊ।", ok: false,
          why: { en: "*Dawaj* is a rough informal *ty* command — it sounds rude to a doctor. If you need something, ask: *Czy mogę prosić o receptę?*",
                 ne: "*Dawaj* *ty* को झर्को लाग्ने आदेश रूप हो — डाक्टरलाई भन्दा असभ्य सुनिन्छ। केही चाहिए यसरी सोध्नुहोस्: *Czy mogę prosić o receptę?*" } }
      ]
    },
    {
      them: ["Dwa razy dziennie, co dwanaście godzin, przez siedem dni. Proszę nie przerywać kuracji, nawet jeśli poczuje się Pan lepiej.", "Twice a day, every twelve hours, for seven days. Please don't stop the treatment, even if you feel better.", "दिनको दुई पटक, हरेक बाह्र घण्टामा, सात दिनसम्म। राम्रो महसुस भए पनि उपचार बीचमा नरोक्नुहोस्।"],
      replies: [
        { pl: "Rozumiem. Potrzebuję też zwolnienia lekarskiego do pracy.", en: "I understand. I also need a sick note for work.", ne: "बुझें। मलाई कामका लागि बिरामी बिदाको पत्र पनि चाहिन्छ।", ok: true },
        { pl: "Rozumiem. Czy mogę dostać zwolnienie? Pracuję fizycznie w magazynie.", en: "I see. Can I get a sick note? I do physical work in a warehouse.", ne: "बुझें। के मलाई बिदाको पत्र पाउन सकिन्छ? म गोदाममा शारीरिक काम गर्छु।", ok: true },
        { pl: "Rozumiem. Potrzebuję też zwolnienie lekarskie.", en: "(wrong form after 'potrzebuję')", ne: "(*potrzebuję* पछि गलत रूप)", ok: false,
          why: { en: "*Potrzebować* (to need) takes the genitive: *potrzebuję zwolnienia lekarskiego*, *potrzebuję pomocy*. (After *dostać* the accusative is right: *dostać zwolnienie*.)",
                 ne: "*Potrzebować* (चाहिनु) पछि षष्ठी (genitive) आउँछ: *potrzebuję zwolnienia lekarskiego*, *potrzebuję pomocy*। (*dostać* पछि भने द्वितीया ठीक हो: *dostać zwolnienie*।)" } }
      ]
    },
    {
      them: ["Oczywiście. Wystawię zwolnienie na pięć dni, do piątku włącznie. Jest elektroniczne, pracodawca zobaczy je w systemie.", "Of course. I'll issue a sick note for five days, up to and including Friday. It's electronic; your employer will see it in the system.", "अवश्य। म शुक्रबारसम्म (शुक्रबार पनि) पाँच दिनको बिदा लेखिदिन्छु। यो इलेक्ट्रोनिक हो, रोजगारदाताले सिस्टममा देख्नुहुन्छ।"],
      replies: [
        { pl: "Czyli nie muszę zanosić żadnego papieru do pracy?", en: "So I don't have to take any paper to work?", ne: "मतलब मैले कुनै कागज कामसम्म लैजानु पर्दैन?", ok: true },
        { pl: "Dziękuję. Zadzwonię do kierownika i powiem mu, że jestem na zwolnieniu.", en: "Thank you. I'll call my manager and tell him I'm on sick leave.", ne: "धन्यवाद। म मेरो म्यानेजरलाई फोन गरेर बिरामी बिदामा छु भनेर भन्छु।", ok: true },
        { pl: "Dziękuję. Zadzwonię do kierownik i powiem jemu.", en: "(wrong forms)", ne: "(गलत रूपहरू)", ok: false,
          why: { en: "*Do* takes the genitive: *do kierownika*. And after a verb, the short pronoun is used: *powiem mu*. *Jemu* is only for emphasis or contrast (*jemu, nie jej* — to him, not to her).",
                 ne: "*Do* पछि षष्ठी आउँछ: *do kierownika*। क्रियापछि छोटो सर्वनाम प्रयोग हुन्छ: *powiem mu*। *Jemu* जोड दिँदा वा तुलना गर्दा मात्र (*jemu, nie jej* — उसलाई, उनलाई होइन)।" } }
      ]
    },
    {
      them: ["Zgadza się. Proszę dużo pić, odpoczywać i przyjść na kontrolę, jeśli za trzy dni nie będzie lepiej.", "That's right. Please drink a lot, rest, and come for a check-up if it isn't better in three days.", "हो। धेरै पानी पिउनुहोस्, आराम गर्नुहोस्, र तीन दिनमा ठीक भएन भने जाँच गराउन आउनुहोस्।"],
      replies: [
        { pl: "Dobrze, dziękuję bardzo. Do widzenia!", en: "OK, thank you very much. Goodbye!", ne: "हुन्छ, धेरै धन्यवाद। नमस्ते!", ok: true },
        { pl: "Dobrze, przyjdę na kontrolę, jeśli będzie lepiej.", en: "OK, I'll come for a check-up if it's better.", ne: "हुन्छ, ठीक भयो भने जाँच गराउन आउँछु।", ok: false,
          why: { en: "Listen carefully: she said *jeśli nie będzie lepiej* — come back if it is **not** better. The little word *nie* changes everything.",
                 ne: "ध्यान दिएर सुन्नुहोस्: उहाँले *jeśli nie będzie lepiej* भन्नुभयो — ठीक **भएन** भने फेरि आउनुहोस्। सानो शब्द *nie* ले पूरै अर्थ बदल्छ।" } },
        { pl: "Dobrze, dzięki. Na razie!", en: "OK, thanks. See ya!", ne: "ठिकै छ, थ्याङ्क्स। पछि भेटौंला!", ok: false,
          why: { en: "*Dzięki* and *na razie* are casual — fine with friends. With a doctor say *dziękuję* and *do widzenia*.",
                 ne: "*Dzięki* र *na razie* अनौपचारिक हुन् — साथीसँग ठीक छ। डाक्टरसँग *dziękuję* र *do widzenia* भन्नुहोस्।" } }
      ]
    }
  ],
  end: {
    en: "Well done! You described your symptoms, understood how to take the medicine and got your sick note. Remember: the e-prescription code comes by SMS — take it with your PESEL to the pharmacy.",
    ne: "स्याबास! तपाईंले लक्षण बताउनुभयो, औषधि कसरी खाने बुझ्नुभयो र बिरामी बिदाको पत्र पाउनुभयो। याद राख्नुहोस्: ई-पुर्जाको कोड SMS मा आउँछ — त्यो र आफ्नो PESEL लिएर फार्मेसी जानुहोस्।"
  },
  useful: [
    ["co Panu dolega?", "what's troubling you? (to a man)", "तपाईंलाई के समस्या छ? (पुरुषलाई)", "tso PA-noo do-LE-ga", "त्सो ˈपा-नु दो-ˈले-गा"],
    ["boli mnie gardło", "my throat hurts", "मेरो घाँटी दुख्छ", "BO-lee mnyeh GAR-dwo", "ˈबो-लि म्न्ये ˈगार्-द्वो"],
    ["od trzech dni mam gorączkę", "I've had a fever for three days", "तीन दिनदेखि मलाई ज्वरो छ", "ot tsheh dnee mam go-RONCH-keh", "ओत् त्शेह् द्नि माम् गो-ˈरोंच्-के"],
    ["suchy kaszel", "dry cough", "सुक्खा खोकी", "SOO-hi KA-shel", "ˈसु-हि ˈका-शेल्"],
    ["jak często mam brać ten lek?", "how often should I take this medicine?", "यो औषधि कति पटक खानुपर्छ?", "yak CHEN-sto mam brach ten lek", "याक् ˈचेन्-स्तो माम् ब्राच् तेन् लेक्"],
    ["potrzebuję zwolnienia lekarskiego", "I need a sick note", "मलाई बिरामी बिदाको पत्र चाहिन्छ", "po-tshe-BOO-yeh zvol-NYE-nya le-kar-SKYE-go", "पो-त्शे-ˈबु-ये ज़्भोल्-ˈन्ये-न्या ले-कार्-ˈस्क्ये-गो"],
    ["proszę nie przerywać kuracji", "please don't stop the treatment", "उपचार बीचमा नरोक्नुहोस्", "PRO-sheh nyeh pshe-RI-vach koo-RATS-yee", "ˈप्रो-शे न्ये प्शे-ˈरि-भाच् कु-ˈरात्स्-यि"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b1-office",
  level: "B1",
  title: "At the provincial office: residence card",
  titleNe: "प्रदेश कार्यालयमा: बसोबास कार्ड",
  scene: {
    en: "You have an appointment at the *urząd wojewódzki* (provincial office) about your residence card (*karta pobytu*). Today they take your fingerprints and signature. This is language practice only — always check the real rules on the office's website.",
    ne: "बसोबास कार्ड (*karta pobytu*) को काममा तपाईंको *urząd wojewódzki* (प्रदेश कार्यालय) मा समय तोकिएको छ। आज औंलाको छाप र हस्ताक्षर लिइन्छ। यो भाषा अभ्यास मात्र हो — वास्तविक नियम सधैं कार्यालयको वेबसाइटमा जाँच्नुहोस्।"
  },
  them: "Urzędniczka",
  themEn: "Clerk (woman)",
  themNe: "कार्यालयकी कर्मचारी (महिला)",
  steps: [
    {
      them: ["Dzień dobry. Na którą godzinę jest Pan umówiony?", "Hello. What time is your appointment?", "नमस्ते। तपाईंको कति बजेको समय तोकिएको छ?"],
      replies: [
        { pl: "Dzień dobry. Jestem umówiony na dziesiątą piętnaście, w sprawie karty pobytu.", en: "Hello. My appointment is at 10:15, about the residence card.", ne: "नमस्ते। मेरो सवा दस बजे बसोबास कार्डको सम्बन्धमा समय छ।", ok: true },
        { pl: "Dzień dobry. Jestem umówiony na dziesięć piętnaście.", en: "(wrong number form)", ne: "(संख्याको गलत रूप)", ok: false,
          why: { en: "Clock times use **ordinal** numbers in the feminine (because *godzina* is feminine): *na dziesiątą piętnaście*, *o dziesiątej*. *Dziesięć* is just 'ten' for counting.",
                 ne: "घडीको समयमा **क्रमसूचक** संख्या स्त्रीलिङ्गमा आउँछ (किनभने *godzina* स्त्रीलिङ्ग हो): *na dziesiątą piętnaście*, *o dziesiątej*। *Dziesięć* गन्ने 'दस' मात्र हो।" } },
        { pl: "Siema, jestem na dziesiątą.", en: "Hiya, I'm here for ten.", ne: "के छ, म दस बजेको लागि आएँ।", ok: false,
          why: { en: "*Siema* is slang between young friends. In an office always start with *Dzień dobry* and speak formally.",
                 ne: "*Siema* युवा साथीहरूबीचको बोलचालको शब्द हो। सरकारी कार्यालयमा सधैं *Dzień dobry* बाट सुरु गर्नुहोस् र औपचारिक बोल्नुहोस्।" } }
      ]
    },
    {
      them: ["Proszę podać imię, nazwisko i numer sprawy.", "Please give your first name, surname and case number.", "आफ्नो नाम, थर र फाइल नम्बर बताउनुहोस्।"],
      replies: [
        { pl: "Nazywam się Ram Thapa. Numer sprawy mam tutaj, na piśmie z urzędu.", en: "My name is Ram Thapa. I have the case number here, on the letter from the office.", ne: "मेरो नाम राम थापा हो। फाइल नम्बर यहाँ कार्यालयको चिठीमा छ।", ok: true },
        { pl: "Ram Thapa, numer sprawy: dwanaście trzydzieści cztery łamane przez dwa tysiące dwadzieścia sześć.", en: "Ram Thapa, case number 1234/2026.", ne: "राम थापा, फाइल नम्बर १२३४/२०२६।", ok: true },
        { pl: "Moje imię jest Ram Thapa.", en: "(translated word for word from English)", ne: "(अंग्रेजीबाट शब्दशः अनुवाद)", ok: false,
          why: { en: "This copies English 'My name is'. In Polish say *Nazywam się Ram Thapa* (full name) or *Mam na imię Ram* (first name only). Tip: the slash in numbers like 1234/2026 is read *łamane przez*.",
                 ne: "यो अंग्रेजीको 'My name is' को नक्कल हो। पोलिशमा *Nazywam się Ram Thapa* (पूरा नाम) वा *Mam na imię Ram* (पहिलो नाम मात्र) भन्नुहोस्। सुझाव: 1234/2026 जस्ता नम्बरमा स्ल्यास (/) लाई *łamane przez* भनेर पढिन्छ।" } }
      ]
    },
    {
      them: ["Dziękuję. Mam tu Pana wniosek. Czy ma Pan przy sobie paszport i aktualne zdjęcie?", "Thank you. I have your application here. Do you have your passport and a recent photo with you?", "धन्यवाद। तपाईंको निवेदन यहाँ छ। तपाईंसँग राहदानी र भर्खरको फोटो छ?"],
      replies: [
        { pl: "Tak, proszę. Tu jest paszport, a tu zdjęcie.", en: "Yes, here you are. Here's the passport, and here's the photo.", ne: "छ, लिनुहोस्। यो राहदानी, र यो फोटो।", ok: true },
        { pl: "Tak, daj mi chwilę, szukam.", en: "Yes, give me a sec, I'm looking.", ne: "छ, एकछिन देऊ, खोज्दैछु।", ok: false,
          why: { en: "*Daj* is the *ty* command (like 'देऊ'). To an official say *Proszę chwilę poczekać* or simply *Momencik, proszę*.",
                 ne: "*Daj* *ty* को आदेश रूप हो ('देऊ' जस्तै)। कर्मचारीलाई *Proszę chwilę poczekać* वा सिधै *Momencik, proszę* भन्नुहोस्।" } },
        { pl: "Paszport mam w domu, ale mam zdjęcie paszportu w telefonie.", en: "I have the passport at home, but I have a photo of it on my phone.", ne: "राहदानी घरमा छ, तर मोबाइलमा यसको फोटो छ।", ok: false,
          why: { en: "Offices almost always need the **original** document. A photo on your phone is usually not accepted. Bring everything listed in the letter.",
                 ne: "कार्यालयलाई प्रायः **सक्कल** कागजात चाहिन्छ। मोबाइलको फोटो सामान्यतया मानिँदैन। चिठीमा लेखिएका सबै कागजात लिएर जानुहोस्।" } }
      ]
    },
    {
      them: ["W porządku. Teraz pobierzemy odciski palców. Proszę położyć palec wskazujący na czytniku.", "Fine. Now we'll take your fingerprints. Please put your index finger on the reader.", "ठीक छ। अब औंलाको छाप लिन्छौं। चोर औंला रिडरमाथि राख्नुहोस्।"],
      replies: [
        { pl: "Dobrze. Prawą czy lewą rękę?", en: "OK. Right or left hand?", ne: "हुन्छ। दायाँ हात कि बायाँ?", ok: true },
        { pl: "Przepraszam, nie zrozumiałem. Który palec mam położyć?", en: "Sorry, I didn't understand. Which finger should I put there?", ne: "माफ गर्नुहोस्, मैले बुझिनँ। कुन औंला राख्ने?", ok: true },
        { pl: "Przepraszam, mógłbyś powtórzyć?", en: "Sorry, could you (informal) repeat?", ne: "माफ गर, फेरि भन्न सक्छौ?", ok: false,
          why: { en: "*Mógłbyś* is informal and for a man. To a woman official: *Czy mogłaby Pani powtórzyć?* (to a man: *Czy mógłby Pan powtórzyć?*).",
                 ne: "*Mógłbyś* अनौपचारिक हो र पुरुषलाई भनिन्छ। महिला कर्मचारीलाई: *Czy mogłaby Pani powtórzyć?* (पुरुषलाई: *Czy mógłby Pan powtórzyć?*)।" } }
      ]
    },
    {
      them: ["Dziękuję. Teraz proszę złożyć podpis w tej ramce. Podpis nie może wychodzić poza linię.", "Thank you. Now please sign inside this box. The signature must not go outside the line.", "धन्यवाद। अब यो कोठाभित्र हस्ताक्षर गर्नुहोस्। हस्ताक्षर रेखाबाहिर जानु हुँदैन।"],
      replies: [
        { pl: "Dobrze. Czy mam się podpisać pełnym imieniem i nazwiskiem?", en: "OK. Should I sign with my full name and surname?", ne: "हुन्छ। पूरा नाम र थर लेखेर हस्ताक्षर गर्ने?", ok: true },
        { pl: "Przepraszam, nie mam długopisu. Czy mogę pożyczyć?", en: "Sorry, I don't have a pen. May I borrow one?", ne: "माफ गर्नुहोस्, मसँग कलम छैन। सापटी पाउन सक्छु?", ok: true },
        { pl: "Dobrze, podpiszę na dole, pod ramką.", en: "OK, I'll sign at the bottom, under the box.", ne: "हुन्छ, म तल, कोठामुनि हस्ताक्षर गर्छु।", ok: false,
          why: { en: "She said *w tej ramce* — **inside** this box. *Pod ramką* means under the box. *W* = in, *pod* = under, *nad* = above.",
                 ne: "उहाँले *w tej ramce* भन्नुभयो — यो कोठा**भित्र**। *Pod ramką* को अर्थ कोठामुनि हो। *W* = भित्र, *pod* = मुनि, *nad* = माथि।" } }
      ]
    },
    {
      them: ["Wszystko się zgadza. Karta będzie gotowa za kilka tygodni. Dostanie Pan informację listownie albo SMS-em.", "Everything is in order. The card will be ready in a few weeks. You'll be informed by letter or by SMS.", "सबै मिल्यो। कार्ड केही हप्तामा तयार हुन्छ। तपाईंलाई चिठी वा SMS बाट खबर आउँछ।"],
      replies: [
        { pl: "Rozumiem. Czy mogę sprawdzić status sprawy przez internet?", en: "I see. Can I check the status of my case online?", ne: "बुझें। के म मेरो फाइलको अवस्था इन्टरनेटबाट हेर्न सक्छु?", ok: true },
        { pl: "Rozumiem. Czyli karta będzie gotowa jutro?", en: "I see. So the card will be ready tomorrow?", ne: "बुझें। मतलब कार्ड भोलि तयार हुन्छ?", ok: false,
          why: { en: "She said *za kilka tygodni* — in a few weeks. *Za* + time means 'in (from now)': *za tydzień* (in a week), *za dwa dni* (in two days).",
                 ne: "उहाँले *za kilka tygodni* भन्नुभयो — केही हप्तापछि। *Za* + समय = 'अबदेखि … पछि': *za tydzień* (एक हप्तापछि), *za dwa dni* (दुई दिनपछि)।" } },
        { pl: "Rozumiem. Czy mogę sprawdzić status sprawy przez internetu?", en: "(wrong case after 'przez')", ne: "(*przez* पछि गलत विभक्ति)", ok: false,
          why: { en: "*Przez* takes the accusative, and *internet* looks the same in the accusative: *przez internet*, *przez telefon*.",
                 ne: "*Przez* पछि द्वितीया (accusative) आउँछ, र *internet* को द्वितीया रूप उस्तै हुन्छ: *przez internet*, *przez telefon*।" } }
      ]
    },
    {
      them: ["Tak, na stronie urzędu, po wpisaniu numeru sprawy. Czy ma Pan jeszcze jakieś pytania?", "Yes, on the office's website, after entering the case number. Do you have any other questions?", "हो, कार्यालयको वेबसाइटमा, फाइल नम्बर हालेर। अरू केही प्रश्न छ?"],
      replies: [
        { pl: "Nie, to wszystko. Bardzo dziękuję za pomoc.", en: "No, that's all. Thank you very much for your help.", ne: "छैन, यति नै हो। सहयोगका लागि धेरै धन्यवाद।", ok: true },
        { pl: "Tak, czy mogę dostać potwierdzenie, że byłem dzisiaj w urzędzie?", en: "Yes, can I get a confirmation that I was at the office today?", ne: "छ, आज म कार्यालय आएको प्रमाण पाउन सक्छु?", ok: true },
        { pl: "Nie, dzięki, nara!", en: "Nope, thanks, bye!", ne: "छैन, थ्याङ्क्स, बाई!", ok: false,
          why: { en: "*Nara* is slang for 'bye' among friends. In an office: *Nie, to wszystko. Dziękuję, do widzenia.*",
                 ne: "*Nara* साथीहरूबीच 'बाई' भन्ने बोलचालको शब्द हो। कार्यालयमा: *Nie, to wszystko. Dziękuję, do widzenia.*" } }
      ]
    },
    {
      them: ["Proszę, to jest potwierdzenie z dzisiejszej wizyty. Proszę je zachować. Do widzenia.", "Here is a confirmation of today's visit. Please keep it. Goodbye.", "लिनुहोस्, यो आजको भेटको प्रमाणपत्र हो। यसलाई राख्नुहोस्। नमस्ते।"],
      replies: [
        { pl: "Dziękuję bardzo. Do widzenia, miłego dnia!", en: "Thank you very much. Goodbye, have a nice day!", ne: "धेरै धन्यवाद। नमस्ते, शुभ दिन!", ok: true },
        { pl: "Dziękuję, zachowam go.", en: "(wrong pronoun)", ne: "(गलत सर्वनाम)", ok: false,
          why: { en: "*Potwierdzenie* ends in *-e*, so it is neuter. The object pronoun for 'it' (neuter) is *je*: *zachowam je*. *Go* is for masculine nouns (*paszport → mam go*).",
                 ne: "*Potwierdzenie* *-e* मा टुंगिन्छ, त्यसैले नपुंसकलिङ्ग हो। नपुंसकलिङ्गको 'यसलाई' *je* हो: *zachowam je*। *Go* पुल्लिङ्ग नामका लागि हो (*paszport → mam go*)।" } },
        { pl: "Dziękuję, smacznego!", en: "Thank you, enjoy your meal!", ne: "धन्यवाद, मीठोसँग खानुहोस्!", ok: false,
          why: { en: "*Smacznego* is said to people who are eating. Leaving an office, say *Do widzenia* or *Miłego dnia*.",
                 ne: "*Smacznego* खाना खाँदै गरेका मान्छेलाई भनिन्छ। कार्यालयबाट निस्कँदा *Do widzenia* वा *Miłego dnia* भन्नुहोस्।" } }
      ]
    }
  ],
  end: {
    en: "Well done! You gave your details, followed the instructions for fingerprints and signature, and asked how to check your case. Keep the case number and the confirmation in a safe place.",
    ne: "स्याबास! तपाईंले आफ्नो विवरण दिनुभयो, औंलाको छाप र हस्ताक्षरको निर्देशन पालना गर्नुभयो, र फाइल कसरी हेर्ने भनेर सोध्नुभयो। फाइल नम्बर र प्रमाणपत्र सुरक्षित ठाउँमा राख्नुहोस्।"
  },
  useful: [
    ["jestem umówiony na dziesiątą", "I have an appointment at ten (m)", "मेरो दस बजेको समय तोकिएको छ (पुरुष)", "YES-tem oo-moo-VYO-ni na je-SHON-ton", "ˈयेस्-तेम् उ-मु-ˈभ्यो-नि ना जे-ˈशोन्-तों"],
    ["w sprawie karty pobytu", "about the residence card", "बसोबास कार्डको सम्बन्धमा", "f SPRA-vyeh KAR-ti po-BI-too", "फ् ˈस्प्रा-भ्ये ˈकार्-ति पो-ˈबि-तु"],
    ["numer sprawy", "case number", "फाइल नम्बर", "NOO-mer SPRA-vi", "ˈनु-मेर् ˈस्प्रा-भि"],
    ["łamane przez", "slash (/) when reading numbers", "स्ल्यास (/) पढ्दा", "wa-MA-neh pshes", "वा-ˈमा-ने प्शेस्"],
    ["odciski palców", "fingerprints", "औंलाको छाप", "ot-CHEES-kee PAL-tsoof", "ओत्-ˈचिस्-कि ˈपाल्-त्सुफ्"],
    ["proszę złożyć podpis", "please sign", "कृपया हस्ताक्षर गर्नुहोस्", "PRO-sheh ZWO-zhich POT-pees", "ˈप्रो-शे ˈज़्वो-झिच् ˈपोत्-पिस्"],
    ["czy mogłaby Pani powtórzyć?", "could you repeat? (to a woman, formal)", "फेरि भनिदिनुहुन्छ? (महिलालाई)", "chi MO-gwa-bi PA-nee pof-TOO-zhich", "चि ˈमो-ग्वा-बि ˈपा-नि पोफ्-ˈतु-झिच्"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b1-overtime",
  level: "B1",
  title: "Missing overtime pay",
  titleNe: "तलबमा छुटेको ओभरटाइम",
  scene: {
    en: "Your September payslip (*pasek wypłaty*) shows 160 hours, but you worked 12 hours of overtime (*nadgodziny*). Before your shift you go to your supervisor, Mr Marek.",
    ne: "सेप्टेम्बरको तलबको पर्ची (*pasek wypłaty*) मा १६० घण्टा मात्र देखिन्छ, तर तपाईंले १२ घण्टा ओभरटाइम (*nadgodziny*) काम गर्नुभएको थियो। सिफ्टअघि तपाईं आफ्ना सुपरभाइजर मारेक जीकहाँ जानुहुन्छ।"
  },
  them: "Pan Marek",
  themEn: "Mr Marek, your supervisor",
  themNe: "मारेक जी, तपाईंका सुपरभाइजर",
  steps: [
    {
      them: ["O, dzień dobry. Coś się stało?", "Oh, hello. Is something wrong?", "ए, नमस्ते। केही भयो?"],
      replies: [
        { pl: "Dzień dobry, Panie Marku. Czy ma Pan chwilę? Chciałbym zapytać o wypłatę.", en: "Hello, Mr Marek. Do you have a moment? I'd like to ask about my pay.", ne: "नमस्ते, मारेक जी। तपाईंसँग एकछिन समय छ? म तलबबारे सोध्न चाहन्छु।", ok: true },
        { pl: "Dzień dobry, Pan Marek. Czy ma Pan chwilę?", en: "(wrong form when addressing him)", ne: "(सम्बोधनको गलत रूप)", ok: false,
          why: { en: "When you speak **to** someone, Polish uses the vocative: *Pan Marek* → *Panie Marku*, *Pani Anna* → *Pani Anno*. Saying *Pan Marek* to his face sounds like you are talking about him.",
                 ne: "कसैलाई **सिधै** बोलाउँदा पोलिशमा सम्बोधन (vocative) रूप प्रयोग हुन्छ: *Pan Marek* → *Panie Marku*, *Pani Anna* → *Pani Anno*। अनुहारमै *Pan Marek* भन्दा उहाँको बारेमा अरूसँग कुरा गरेजस्तो सुनिन्छ।" } },
        { pl: "Marek, gdzie są moje pieniądze?!", en: "Marek, where's my money?!", ne: "मारेक, मेरो पैसा कहाँ छ?!", ok: false,
          why: { en: "Even if you are angry, starting like this makes people defensive. Be polite and calm: ask for a moment, then explain the problem with facts.",
                 ne: "रिस उठे पनि यसरी सुरु गर्दा मान्छे रक्षात्मक हुन्छ। नम्र र शान्त हुनुहोस्: पहिला एकछिन समय माग्नुहोस्, अनि तथ्यसहित समस्या बताउनुहोस्।" } }
      ]
    },
    {
      them: ["Jasne, słucham. O co chodzi?", "Sure, I'm listening. What's it about?", "हुन्छ, भन्नुहोस्। के कुरा हो?"],
      replies: [
        { pl: "Na pasku wypłaty za wrzesień mam tylko sto sześćdziesiąt godzin. Brakuje moich nadgodzin.", en: "My September payslip shows only 160 hours. My overtime is missing.", ne: "सेप्टेम्बरको तलबको पर्चीमा १६० घण्टा मात्र छ। मेरो ओभरटाइम छुटेको छ।", ok: true },
        { pl: "Na pasku wypłaty za wrzesień brakuje moje nadgodziny.", en: "(wrong form after 'brakuje')", ne: "(*brakuje* पछि गलत रूप)", ok: false,
          why: { en: "*Brakuje* (is missing) takes the genitive: *brakuje moich nadgodzin*, *brakuje pieniędzy*. Think of it as 'there is a lack **of** my overtime'.",
                 ne: "*Brakuje* (छुटेको/नपुगेको छ) पछि षष्ठी आउँछ: *brakuje moich nadgodzin*, *brakuje pieniędzy*। 'मेरो ओभरटाइम**को** कमी छ' भनेर सोच्नुहोस्।" } },
        { pl: "Na pasku za wrzesień mam tylko sto sześćdziesiąt godziny.", en: "(wrong form after the number)", ne: "(संख्यापछि गलत रूप)", ok: false,
          why: { en: "After 5 and higher (and numbers ending in 5–9, 0) the noun goes into the genitive plural: *sto sześćdziesiąt godzin*. *Godziny* is only after 2, 3, 4: *dwie godziny*.",
                 ne: "५ वा माथिका संख्यापछि (र ५–९, ० मा टुंगिने संख्यापछि) नाम षष्ठी बहुवचनमा जान्छ: *sto sześćdziesiąt godzin*। *Godziny* २, ३, ४ पछि मात्र: *dwie godziny*।" } }
      ]
    },
    {
      them: ["Hmm. A ile nadgodzin Pan przepracował?", "Hmm. And how many overtime hours did you work?", "हम्म। अनि तपाईंले कति घण्टा ओभरटाइम काम गर्नुभयो?"],
      replies: [
        { pl: "Dwanaście godzin. Sześć razy zostałem o dwie godziny dłużej.", en: "Twelve hours. Six times I stayed two hours longer.", ne: "बाह्र घण्टा। छ पटक म दुई घण्टा बढी बसें।", ok: true },
        { pl: "Dwanaście godzin. Mam zapisane wszystkie daty w telefonie.", en: "Twelve hours. I have all the dates written down on my phone.", ne: "बाह्र घण्टा। मसँग सबै मितिहरू मोबाइलमा लेखिएका छन्।", ok: true },
        { pl: "Dwanaście godzin. Sześć razy zostanę o dwie godziny dłużej.", en: "(wrong tense: 'I will stay')", ne: "(गलत काल: 'म बस्नेछु')", ok: false,
          why: { en: "*Zostanę* is future ('I will stay'). You are talking about last month, so use the past: *zostałem* (a woman: *zostałam*).",
                 ne: "*Zostanę* भविष्यत् काल हो ('म बस्नेछु')। तपाईं गएको महिनाको कुरा गर्दै हुनुहुन्छ, त्यसैले भूतकाल: *zostałem* (महिलाले: *zostałam*)।" } }
      ]
    },
    {
      them: ["Pamiętam, że w tamtym miesiącu było dużo transportów. Ma Pan te daty?", "I remember there were a lot of deliveries that month. Do you have the dates?", "मलाई याद छ, त्यो महिना धेरै ढुवानी आएको थियो। तपाईंसँग ती मितिहरू छन्?"],
      replies: [
        { pl: "Tak. To było dwunastego, trzynastego, piętnastego, dziewiętnastego, dwudziestego i dwudziestego drugiego września.", en: "Yes. It was the 12th, 13th, 15th, 19th, 20th and 22nd of September.", ne: "छ। सेप्टेम्बर १२, १३, १५, १९, २० र २२ तारिख थियो।", ok: true },
        { pl: "Tak. To było dwanaście, trzynaście i piętnaście września.", en: "(wrong number form for dates)", ne: "(मितिका लागि संख्याको गलत रूप)", ok: false,
          why: { en: "Dates use **ordinal** numbers in the genitive: *dwunastego września* (on the 12th of September), *pierwszego maja*. Plain numbers (*dwanaście*) are for counting.",
                 ne: "मितिमा **क्रमसूचक** संख्या षष्ठीमा आउँछ: *dwunastego września* (सेप्टेम्बर १२ तारिखमा), *pierwszego maja*। साधारण संख्या (*dwanaście*) गन्नका लागि हो।" } },
        { pl: "Nie pamiętam, ale Pan musi mi zapłacić.", en: "I don't remember, but you have to pay me.", ne: "याद छैन, तर तपाईंले मलाई तिर्नैपर्छ।", ok: false,
          why: { en: "Without dates it is hard for anyone to check, and *Pan musi* sounds like an order. Keep a note of your extra hours, and say: *Sprawdzę daty i jutro Panu podam.*",
                 ne: "मिति बिना कसैलाई पनि जाँच्न गाह्रो हुन्छ, र *Pan musi* आदेशजस्तो सुनिन्छ। आफ्नो थप घण्टा लेखेर राख्नुहोस्, र भन्नुहोस्: *Sprawdzę daty i jutro Panu podam.*" } }
      ]
    },
    {
      them: ["Dobrze. Sprawdzę to z kadrami. Może ktoś nie wpisał godzin do systemu.", "OK. I'll check it with HR. Maybe someone didn't enter the hours into the system.", "ठीक छ। म HR सँग जाँच्छु। सायद कसैले सिस्टममा घण्टा हालेन होला।"],
      replies: [
        { pl: "Dziękuję. Kiedy mniej więcej będzie wiadomo?", en: "Thank you. Roughly when will we know?", ne: "धन्यवाद। लगभग कहिले थाहा हुन्छ?", ok: true },
        { pl: "Dziękuję. Czy mógłbym dostać odpowiedź do końca tygodnia?", en: "Thank you. Could I get an answer by the end of the week?", ne: "धन्यवाद। के मलाई हप्ताको अन्त्यसम्ममा जवाफ पाउन सकिन्छ?", ok: true },
        { pl: "Dziękuję. Czy mógłbyś mi dać odpowiedź do piątku?", en: "(informal 'could you')", ne: "(अनौपचारिक 'सक्छौ')", ok: false,
          why: { en: "*Mógłbyś* is the *ty* form. Your supervisor uses *Pan* with you, so answer the same way: *Czy mógłby Pan dać mi odpowiedź do piątku?*",
                 ne: "*Mógłbyś* *ty* को रूप हो। सुपरभाइजरले तपाईंलाई *Pan* भन्नुहुन्छ, त्यसैले तपाईं पनि त्यसरी नै: *Czy mógłby Pan dać mi odpowiedź do piątku?*" } }
      ]
    },
    {
      them: ["Myślę, że do piątku. Jeśli to błąd, wyrównanie dostanie Pan z następną wypłatą.", "I think by Friday. If it's a mistake, you'll get the back pay with your next salary.", "शुक्रबारसम्म होला जस्तो लाग्छ। गल्ती भएको रहेछ भने बाँकी रकम अर्को तलबसँगै पाउनुहुन्छ।"],
      replies: [
        { pl: "Rozumiem. Czyli dostanę pieniądze za nadgodziny w przyszłym miesiącu?", en: "I see. So I'll get the money for the overtime next month?", ne: "बुझें। मतलब ओभरटाइमको पैसा अर्को महिना पाउँछु?", ok: true },
        { pl: "Rozumiem. Czyli dostałem już pieniądze wczoraj?", en: "I see. So I already got the money yesterday?", ne: "बुझें। मतलब मैले हिजो नै पैसा पाइसकें?", ok: false,
          why: { en: "*Z następną wypłatą* means with the **next** salary — in the future: *dostanę*, not *dostałem*.",
                 ne: "*Z następną wypłatą* को अर्थ **अर्को** तलबसँग — भविष्यमा: *dostanę*, *dostałem* होइन।" } },
        { pl: "Rozumiem. Czyli dostanę pieniędzy w przyszłym miesiącu?", en: "(wrong form of 'money')", ne: "('पैसा' को गलत रूप)", ok: false,
          why: { en: "*Dostać* takes the accusative: *dostanę pieniądze*. *Pieniędzy* is the genitive, used after *nie*, *ile*, *dużo*: *nie mam pieniędzy*, *ile pieniędzy?*",
                 ne: "*Dostać* पछि द्वितीया आउँछ: *dostanę pieniądze*। *Pieniędzy* षष्ठी हो, *nie*, *ile*, *dużo* पछि प्रयोग हुन्छ: *nie mam pieniędzy*, *ile pieniędzy?*" } }
      ]
    },
    {
      them: ["Tak. A na przyszłość: proszę zawsze zapisywać nadgodziny na liście u brygadzisty.", "Yes. And for the future: please always write your overtime on the list at the foreman's.", "हो। अनि अबदेखि: ओभरटाइम सधैं फोरम्यानसँग भएको सूचीमा लेख्नुहोस्।"],
      replies: [
        { pl: "Dobrze, od teraz będę zapisywał wszystkie nadgodziny na liście.", en: "OK, from now on I'll write all my overtime on the list.", ne: "हुन्छ, अबदेखि म सबै ओभरटाइम सूचीमा लेख्नेछु।", ok: true },
        { pl: "Nie wiedziałem o tej liście. Dziękuję za informację.", en: "I didn't know about that list. Thanks for the information.", ne: "मलाई त्यो सूचीबारे थाहा थिएन। जानकारीका लागि धन्यवाद।", ok: true },
        { pl: "Dobrze, zapiszę nadgodziny codziennie.", en: "(wrong aspect)", ne: "(गलत पक्ष/aspect)", ok: false,
          why: { en: "*Codziennie* and *zawsze* describe a repeated habit, so use the imperfective: *będę zapisywał* (a woman: *będę zapisywała*). *Zapiszę* is one finished action: *Zapiszę to teraz.*",
                 ne: "*Codziennie* र *zawsze* ले बारम्बार हुने बानी जनाउँछन्, त्यसैले अपूर्ण क्रिया: *będę zapisywał* (महिलाले: *będę zapisywała*)। *Zapiszę* एक पटक सकिने काम हो: *Zapiszę to teraz.*" } }
      ]
    },
    {
      them: ["W porządku. To ja się odezwę w piątek.", "All right. I'll get back to you on Friday then.", "ठीक छ। म शुक्रबार खबर गर्छु।"],
      replies: [
        { pl: "Dziękuję, Panie Marku. Miłego dnia!", en: "Thank you, Mr Marek. Have a nice day!", ne: "धन्यवाद, मारेक जी। शुभ दिन!", ok: true },
        { pl: "Dzięki, stary!", en: "Thanks, mate!", ne: "थ्याङ्क्स, यार!", ok: false,
          why: { en: "*Stary* (mate, buddy) is for close friends. Your supervisor uses *Pan*, so stay formal: *Dziękuję, Panie Marku.*",
                 ne: "*Stary* (यार/दोस्त) नजिकका साथीका लागि हो। सुपरभाइजरले *Pan* प्रयोग गर्नुहुन्छ, त्यसैले औपचारिक रहनुहोस्: *Dziękuję, Panie Marku.*" } },
        { pl: "Dziękuję. To ja się odezwę w piątek.", en: "Thank you. I'll get back to you on Friday then.", ne: "धन्यवाद। म शुक्रबार खबर गर्छु।", ok: false,
          why: { en: "He said **he** will contact you. If you repeat *ja się odezwę*, you promise to contact him. Better: *To czekam na wiadomość w piątek.* (So I'll wait for news on Friday.)",
                 ne: "उहाँले **उहाँ** आफैं खबर गर्छु भन्नुभयो। तपाईंले *ja się odezwę* दोहोर्‍याउँदा तपाईं खबर गर्छु भनेको हुन्छ। राम्रो: *To czekam na wiadomość w piątek.* (म शुक्रबार खबर पर्खन्छु।)" } }
      ]
    }
  ],
  end: {
    en: "Well done! You raised a money problem politely, gave clear facts and dates, and agreed on the next step. Tip: always keep your own record of your hours.",
    ne: "स्याबास! तपाईंले पैसाको समस्या नम्र भएर उठाउनुभयो, स्पष्ट तथ्य र मिति दिनुभयो, र अर्को कदममा सहमति गर्नुभयो। सुझाव: आफ्नो कामको घण्टा सधैं आफैं पनि लेखेर राख्नुहोस्।"
  },
  useful: [
    ["Panie Marku", "Mr Marek (speaking to him)", "मारेक जी (सिधै बोलाउँदा)", "PA-nyeh MAR-koo", "ˈपा-न्ये ˈमार्-कु"],
    ["czy ma Pan chwilę?", "do you have a moment? (to a man)", "तपाईंसँग एकछिन समय छ? (पुरुषलाई)", "chi ma pan HFEE-leh", "चि मा पान् ˈह्फि-ले"],
    ["pasek wypłaty", "payslip", "तलबको पर्ची", "PA-sek vi-PWA-ti", "ˈपा-सेक् भि-ˈप्वा-ति"],
    ["brakuje moich nadgodzin", "my overtime is missing", "मेरो ओभरटाइम छुटेको छ", "bra-KOO-yeh MO-eeh nad-GO-jeen", "ब्रा-ˈकु-ये ˈमो-इह् नाद्-ˈगो-जिन्"],
    ["dwunastego września", "on the 12th of September", "सेप्टेम्बर १२ तारिखमा", "dvoo-nas-TE-go VZHESH-nya", "द्भु-नास्-ˈते-गो ˈभ्झेश्-न्या"],
    ["sprawdzę to z kadrami", "I'll check it with HR", "म यो HR सँग जाँच्छु", "SPRAV-dzeh to s ka-DRA-mee", "ˈस्प्राभ्-द्ज़े तो स् का-ˈद्रा-मि"],
    ["wyrównanie", "back pay (the missing difference)", "बाँकी रकमको भुक्तानी", "vi-roov-NA-nyeh", "भि-रुभ्-ˈना-न्ये"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b1-landlord",
  level: "B1",
  title: "Calling the landlord: no heating",
  titleNe: "घरधनीलाई फोन: हिटिङ बिग्रियो",
  scene: {
    en: "It's January. Since yesterday the radiators in your rented flat on Lipowa Street have been cold. You phone your landlord, Mr Kowalski.",
    ne: "जनवरी महिना हो। हिजोदेखि लिपोभा सडकमा रहेको तपाईंको भाडाको फ्ल्याटका रेडिएटरहरू चिसो छन्। तपाईं घरधनी कोवाल्स्की जीलाई फोन गर्नुहुन्छ।"
  },
  them: "Pan Kowalski",
  themEn: "Mr Kowalski, the landlord",
  themNe: "कोवाल्स्की जी, घरधनी",
  steps: [
    {
      them: ["Halo, Kowalski, słucham?", "Hello, Kowalski speaking?", "हेलो, कोवाल्स्की बोल्दैछु?"],
      replies: [
        { pl: "Dzień dobry, mówi Ram Thapa. Wynajmuję od Pana mieszkanie na ulicy Lipowej.", en: "Good morning, this is Ram Thapa. I rent your flat on Lipowa Street.", ne: "नमस्ते, म राम थापा बोल्दैछु। म तपाईंको लिपोभा सडकको फ्ल्याट भाडामा बस्छु।", ok: true },
        { pl: "Halo, kto mówi?", en: "Hello, who's speaking?", ne: "हेलो, को बोल्दै हुनुहुन्छ?", ok: false,
          why: { en: "You made the call and he has already said his name. Now introduce yourself: *Dzień dobry, mówi…* (on the phone *mówi* = 'this is … speaking').",
                 ne: "फोन तपाईंले गर्नुभएको हो र उहाँले आफ्नो नाम भनिसक्नुभयो। अब आफ्नो परिचय दिनुहोस्: *Dzień dobry, mówi…* (फोनमा *mówi* = '… बोल्दैछु')।" } },
        { pl: "Dzień dobry, mówi Ram. Wynajmuję od Pana mieszkanie na ulica Lipowa.", en: "(wrong case after 'na')", ne: "(*na* पछि गलत विभक्ति)", ok: false,
          why: { en: "For a place, *na* takes the locative: *na ulicy Lipowej*. Both the noun and the adjective-like street name change: *ulica → ulicy*, *Lipowa → Lipowej*.",
                 ne: "ठाउँ जनाउँदा *na* पछि अधिकरण (locative) आउँछ: *na ulicy Lipowej*। नाम र सडकको विशेषण-जस्तो नाम दुवै फेरिन्छन्: *ulica → ulicy*, *Lipowa → Lipowej*।" } }
      ]
    },
    {
      them: ["Ach tak, dzień dobry. W czym mogę pomóc?", "Ah yes, hello. How can I help?", "अँ, नमस्ते। म के सहयोग गर्न सक्छु?"],
      replies: [
        { pl: "Od wczoraj nie działa ogrzewanie. Kaloryfery są zupełnie zimne.", en: "Since yesterday the heating hasn't been working. The radiators are completely cold.", ne: "हिजोदेखि हिटिङ चलेको छैन। रेडिएटरहरू पूरै चिसो छन्।", ok: true },
        { pl: "Od wczoraj nie działa ogrzewania.", en: "(wrong form of the subject)", ne: "(कर्ताको गलत रूप)", ok: false,
          why: { en: "Here *ogrzewanie* is the **subject** (the heating doesn't work), so it stays in the nominative. The 'genitive after *nie*' rule is only for objects: *nie mam ogrzewania*.",
                 ne: "यहाँ *ogrzewanie* **कर्ता** हो (हिटिङ चल्दैन), त्यसैले प्रथमा (nominative) मै रहन्छ। '*nie* पछि षष्ठी' नियम कर्मका लागि मात्र हो: *nie mam ogrzewania*।" } },
        { pl: "Od jutra nie działa ogrzewanie.", en: "(wrong: 'from tomorrow')", ne: "(गलत: 'भोलिदेखि')", ok: false,
          why: { en: "*Od jutra* means 'from tomorrow'. The problem started in the past: *od wczoraj* (since yesterday), *od rana* (since the morning).",
                 ne: "*Od jutra* को अर्थ 'भोलिदेखि' हो। समस्या पहिले नै सुरु भइसक्यो: *od wczoraj* (हिजोदेखि), *od rana* (बिहानदेखि)।" } }
      ]
    },
    {
      them: ["Wszystkie kaloryfery? Sprawdzał Pan zawory?", "All the radiators? Did you check the valves?", "सबै रेडिएटर? तपाईंले भल्भ जाँच्नुभयो?"],
      replies: [
        { pl: "Tak, wszystkie. Odkręciłem zawory do końca, ale nic się nie zmieniło.", en: "Yes, all of them. I opened the valves all the way, but nothing changed.", ne: "हो, सबै। मैले भल्भ पूरै खोलें, तर केही फरक परेन।", ok: true },
        { pl: "Tak, sprawdzałem. W kuchni jest trochę ciepło, ale w pokojach jest bardzo zimno.", en: "Yes, I checked. It's a bit warm in the kitchen, but very cold in the rooms.", ne: "हो, जाँचें। भान्सामा अलि तातो छ, तर कोठाहरूमा धेरै चिसो छ।", ok: true },
        { pl: "Tak, wszystkie. W pokojach jest bardzo zimny.", en: "(adjective instead of adverb)", ne: "(क्रियाविशेषणको सट्टा विशेषण)", ok: false,
          why: { en: "To say how it feels **in a place**, use the adverb: *jest zimno* (it is cold), *jest ciepło*. *Zimny* is an adjective for a thing: *kaloryfer jest zimny*.",
                 ne: "**कुनै ठाउँमा** कस्तो छ भन्न क्रियाविशेषण प्रयोग गर्नुहोस्: *jest zimno* (चिसो छ), *jest ciepło*। *Zimny* वस्तुका लागि विशेषण हो: *kaloryfer jest zimny*।" } }
      ]
    },
    {
      them: ["Rozumiem. Może to piec gazowy. Czy na piecu świeci się jakaś lampka?", "I see. Maybe it's the gas boiler. Is any light on, on the boiler?", "बुझें। सायद ग्यास बोइलर होला। बोइलरमा कुनै बत्ती बलेको छ?"],
      replies: [
        { pl: "Tak, świeci się czerwona lampka, a na wyświetlaczu jest napis E01.", en: "Yes, a red light is on, and the display says E01.", ne: "हो, रातो बत्ती बलेको छ, र स्क्रिनमा E01 लेखिएको छ।", ok: true },
        { pl: "Tak, świeci się czerwony lampka.", en: "(wrong gender)", ne: "(गलत लिङ्ग)", ok: false,
          why: { en: "*Lampka* ends in *-a*, so it is feminine; the adjective must agree: *czerwona lampka*. (Masculine: *czerwony kaloryfer*.)",
                 ne: "*Lampka* *-a* मा टुंगिन्छ, त्यसैले स्त्रीलिङ्ग हो; विशेषण पनि मिल्नुपर्छ: *czerwona lampka*। (पुल्लिङ्ग: *czerwony kaloryfer*।)" } },
        { pl: "Proszę Pana, to nie jest mój problem. Pan musi to naprawić.", en: "Sir, that's not my problem. You have to fix it.", ne: "हजुर, यो मेरो समस्या होइन। तपाईंले नै बनाउनुपर्छ।", ok: false,
          why: { en: "He is trying to help, so answer his question first. A demanding tone (*Pan musi*) rarely makes things faster. Polite but clear: *Czy może Pan przysłać kogoś do naprawy?*",
                 ne: "उहाँ सहयोग गर्न खोज्दै हुनुहुन्छ, त्यसैले पहिला उहाँको प्रश्नको जवाफ दिनुहोस्। आदेश दिने स्वरले (*Pan musi*) काम छिटो हुँदैन। नम्र तर स्पष्ट: *Czy może Pan przysłać kogoś do naprawy?*" } }
      ]
    },
    {
      them: ["Dobrze, to trzeba wezwać serwisanta. Kiedy będzie Pan w domu?", "OK, we need to call out a technician. When will you be at home?", "ठीक छ, मर्मत गर्ने मान्छे बोलाउनुपर्छ। तपाईं घरमा कहिले हुनुहुन्छ?"],
      replies: [
        { pl: "Jutro pracuję do czternastej, więc będę w domu od piętnastej.", en: "Tomorrow I work until two, so I'll be home from three.", ne: "भोलि म दुई बजेसम्म काम गर्छु, त्यसैले तीन बजेदेखि घरमा हुन्छु।", ok: true },
        { pl: "W tym tygodniu pracuję na rano, więc po południu jestem w domu.", en: "This week I'm on the morning shift, so I'm home in the afternoons.", ne: "यो हप्ता म बिहानको सिफ्टमा छु, त्यसैले दिउँसो घरमा हुन्छु।", ok: true },
        { pl: "Jutro pracuję do czternaście.", en: "(wrong number form)", ne: "(संख्याको गलत रूप)", ok: false,
          why: { en: "Times use feminine ordinals, and *do* (until) needs the genitive: *do czternastej* (until 14:00), *od piętnastej* (from 15:00).",
                 ne: "समयमा स्त्रीलिङ्ग क्रमसूचक संख्या आउँछ, र *do* (सम्म) पछि षष्ठी चाहिन्छ: *do czternastej* (२ बजेसम्म), *od piętnastej* (३ बजेदेखि)।" } }
      ]
    },
    {
      them: ["To może jutro o szesnastej? Przyjdzie pan Nowak, nasz serwisant.", "How about tomorrow at four? Mr Nowak, our technician, will come.", "त्यसो भए भोलि चार बजे? हाम्रा मर्मतकर्ता नोभाक जी आउनुहुन्छ।"],
      replies: [
        { pl: "Szesnasta mi pasuje. Będę czekał.", en: "Four o'clock suits me. I'll be waiting.", ne: "चार बजे मलाई मिल्छ। म पर्खिरहन्छु।", ok: true },
        { pl: "Niestety o szesnastej mnie nie będzie. Czy może być o siedemnastej?", en: "Unfortunately I won't be there at four. Could it be at five?", ne: "दुर्भाग्यवश चार बजे म हुँदिनँ। पाँच बजे हुन सक्छ?", ok: true },
        { pl: "Szesnasta ja pasuje.", en: "(wrong pronoun case)", ne: "(सर्वनामको गलत विभक्ति)", ok: false,
          why: { en: "*Pasować* (to suit) takes the dative, like Nepali 'मलाई मिल्छ' (not 'म मिल्छ'): *mi pasuje* (stressed: *mnie pasuje*), *Panu pasuje?* *Ja* is the nominative ('I') and can't be used here.",
                 ne: "*Pasować* (मिल्नु) पछि सम्प्रदान (dative) आउँछ, नेपालीको 'मलाई मिल्छ' जस्तै ('म मिल्छ' होइन): *mi pasuje* (जोड दिँदा: *mnie pasuje*), *Panu pasuje?* *Ja* प्रथमा ('म') हो, यहाँ प्रयोग हुँदैन।" } }
      ]
    },
    {
      them: ["Dobrze, potwierdzę to z serwisantem i wyślę Panu SMS-a. A do tego czasu ma Pan czym się ogrzać?", "OK, I'll confirm with the technician and text you. Until then, do you have anything to keep warm with?", "ठीक छ, म मर्मतकर्तासँग पक्का गरेर तपाईंलाई SMS पठाउँछु। त्यतिन्जेल न्यानो हुने केही छ?"],
      replies: [
        { pl: "Mam mały grzejnik elektryczny, więc jakoś damy radę.", en: "I have a small electric heater, so we'll manage somehow.", ne: "मसँग सानो बिजुलीको हिटर छ, त्यसैले जसोतसो चल्छ।", ok: true },
        { pl: "Niestety nie. Czy mógłby Pan pożyczyć mi farelkę?", en: "Unfortunately not. Could you lend me a fan heater?", ne: "दुर्भाग्यवश छैन। के तपाईं मलाई एउटा फ्यान हिटर सापटी दिन सक्नुहुन्छ?", ok: true },
        { pl: "Mam mała grzejnik elektryczna.", en: "(wrong gender)", ne: "(गलत लिङ्ग)", ok: false,
          why: { en: "*Grzejnik* ends in a consonant, so it is masculine: *mały grzejnik elektryczny*. Check the noun's ending before choosing the adjective ending.",
                 ne: "*Grzejnik* व्यञ्जनमा टुंगिन्छ, त्यसैले पुल्लिङ्ग हो: *mały grzejnik elektryczny*। विशेषणको अन्त्य छान्नुअघि नामको अन्त्य हेर्नुहोस्।" } }
      ]
    },
    {
      them: ["W porządku. Przepraszam za kłopot. Do usłyszenia.", "All right. Sorry for the trouble. Speak soon.", "ठीक छ। दुःख दिएकोमा माफ गर्नुहोस्। फेरि कुरा गरौंला।"],
      replies: [
        { pl: "Nic się nie stało. Dziękuję za szybką reakcję. Do usłyszenia!", en: "No problem. Thanks for reacting so quickly. Speak soon!", ne: "केही भएन। छिटो ध्यान दिनुभएकोमा धन्यवाद। फेरि कुरा गरौंला!", ok: true },
        { pl: "Nie ma za co. Do zobaczenia jutro o szesnastej!", en: "You're welcome. See you tomorrow at four!", ne: "केही छैन। भोलि चार बजे भेटौंला!", ok: false,
          why: { en: "*Nie ma za co* answers **thanks**; to an apology say *Nic się nie stało*. Also, Mr Kowalski isn't coming — the technician is. On the phone the goodbye is *Do usłyszenia*.",
                 ne: "*Nie ma za co* **धन्यवाद**को जवाफ हो; माफीको जवाफमा *Nic się nie stało* भन्नुहोस्। साथै कोवाल्स्की जी आउने होइन — मर्मतकर्ता आउने हो। फोनमा बिदा हुँदा *Do usłyszenia* भनिन्छ।" } },
        { pl: "Dobra, cześć!", en: "OK, bye!", ne: "ल, बाई!", ok: false,
          why: { en: "*Cześć* is for friends. With your landlord stay formal: *Dziękuję, do usłyszenia* or *do widzenia*.",
                 ne: "*Cześć* साथीहरूका लागि हो। घरधनीसँग औपचारिक रहनुहोस्: *Dziękuję, do usłyszenia* वा *do widzenia*।" } }
      ]
    }
  ],
  end: {
    en: "Well done! You introduced yourself on the phone, described the fault clearly and agreed a time for the repair. Phone tip: *mówi…* to introduce yourself, *do usłyszenia* to say goodbye.",
    ne: "स्याबास! तपाईंले फोनमा आफ्नो परिचय दिनुभयो, बिग्रेको कुरा स्पष्ट बताउनुभयो र मर्मतको समय मिलाउनुभयो। फोनको सुझाव: परिचय दिन *mówi…*, बिदा हुन *do usłyszenia*।"
  },
  useful: [
    ["mówi Ram Thapa", "this is Ram Thapa speaking (phone)", "म राम थापा बोल्दैछु (फोनमा)", "MOO-vee ram TA-pa", "ˈमु-भि राम् ˈता-पा"],
    ["nie działa ogrzewanie", "the heating isn't working", "हिटिङ चलेको छैन", "nyeh JA-wa o-gzhe-VA-nyeh", "न्ये ˈजा-वा ओ-ग्झे-ˈभा-न्ये"],
    ["kaloryfery są zimne", "the radiators are cold", "रेडिएटरहरू चिसो छन्", "ka-lo-ri-FE-ri son ZHEEM-neh", "का-लो-रि-ˈफे-रि सों ˈझिम्-ने"],
    ["wezwać serwisanta", "to call out a technician", "मर्मत गर्ने मान्छे बोलाउनु", "VEZ-vach ser-vee-SAN-ta", "ˈभेज़्-भाच् सेर्-भि-ˈसान्-ता"],
    ["szesnasta mi pasuje", "four p.m. suits me", "चार बजे मलाई मिल्छ", "shes-NAS-ta mee pa-SOO-yeh", "शेस्-ˈनास्-ता मि पा-ˈसु-ये"],
    ["przepraszam za kłopot", "sorry for the trouble", "दुःख दिएकोमा माफ गर्नुहोस्", "pshe-PRA-sham za KWO-pot", "प्शे-ˈप्रा-शाम् ज़ा ˈक्वो-पोत्"],
    ["nic się nie stało", "no problem (answer to sorry)", "केही भएन (माफीको जवाफ)", "neets sheh nyeh STA-wo", "नित्स् शे न्ये ˈस्ता-वो"],
    ["do usłyszenia", "speak soon (goodbye on the phone)", "फेरि कुरा गरौंला (फोनमा बिदा)", "do oo-swi-SHE-nya", "दो उ-स्वि-ˈशे-न्या"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b1-bank",
  level: "B1",
  title: "Opening a bank account",
  titleNe: "बैंक खाता खोल्दै",
  scene: {
    en: "You have just started a new job and your employer needs your account number (*numer konta*) to pay your salary. You go to a bank branch.",
    ne: "तपाईंले भर्खर नयाँ काम सुरु गर्नुभयो र तलब पठाउन रोजगारदातालाई तपाईंको खाता नम्बर (*numer konta*) चाहिएको छ। तपाईं बैंकको शाखामा जानुहुन्छ।"
  },
  them: "Konsultantka",
  themEn: "Bank adviser (woman)",
  themNe: "बैंक सल्लाहकार (महिला)",
  steps: [
    {
      them: ["Dzień dobry, w czym mogę pomóc?", "Hello, how can I help?", "नमस्ते, म के सहयोग गर्न सक्छु?"],
      replies: [
        { pl: "Dzień dobry. Chciałbym założyć konto osobiste.", en: "Hello. I'd like to open a personal account.", ne: "नमस्ते। म व्यक्तिगत खाता खोल्न चाहन्छु।", ok: true },
        { pl: "Dzień dobry. Chciałbym kupić konto.", en: "Hello. I'd like to buy an account.", ne: "नमस्ते। म खाता किन्न चाहन्छु।", ok: false,
          why: { en: "You don't 'buy' an account. The fixed phrase is *założyć konto* (to set up / open an account). Learn verbs together with their nouns: *założyć konto*, *wypłacić pieniądze*.",
                 ne: "खाता 'किनिँदैन'। निश्चित वाक्यांश *założyć konto* (खाता खोल्नु) हो। क्रियालाई नामसँगै सिक्नुहोस्: *założyć konto*, *wypłacić pieniądze*।" } },
        { pl: "Dzień dobry. Chciałbym założyć konta.", en: "(wrong form of 'account')", ne: "('खाता' को गलत रूप)", ok: false,
          why: { en: "You want one account, and after *założyć* the accusative of *konto* is *konto* (same as the basic form). *Konta* is plural or genitive.",
                 ne: "तपाईंलाई एउटा खाता चाहिएको हो, र *założyć* पछि *konto* को द्वितीया रूप *konto* नै हुन्छ (मूल रूपजस्तै)। *Konta* बहुवचन वा षष्ठी हो।" } }
      ]
    },
    {
      them: ["Oczywiście. Poproszę dokument tożsamości. Jest Pan obywatelem Polski?", "Of course. Your ID document, please. Are you a Polish citizen?", "अवश्य। परिचय पत्र दिनुहोस्। तपाईं पोल्यान्डको नागरिक हुनुहुन्छ?"],
      replies: [
        { pl: "Nie, jestem z Nepalu. Mam paszport i kartę pobytu.", en: "No, I'm from Nepal. I have a passport and a residence card.", ne: "होइन, म नेपालबाट हुँ। मसँग राहदानी र बसोबास कार्ड छ।", ok: true },
        { pl: "Nie, jestem z Nepal.", en: "(wrong form after 'z')", ne: "(*z* पछि गलत रूप)", ok: false,
          why: { en: "*Z* (from) takes the genitive: *z Nepalu*, *z Polski*, *z Indii*. Country names change too.",
                 ne: "*Z* (बाट) पछि षष्ठी आउँछ: *z Nepalu*, *z Polski*, *z Indii*। देशका नाम पनि फेरिन्छन्।" } },
        { pl: "Nie, jestem Nepalem.", en: "(wrong: 'I am Nepal')", ne: "(गलत: 'म नेपाल हुँ')", ok: false,
          why: { en: "*Nepal* is the country. The person is *Nepalczyk* (man) / *Nepalka* (woman): *Jestem Nepalczykiem* (instrumental after *jestem*). Or simply: *Jestem z Nepalu.*",
                 ne: "*Nepal* देश हो। मान्छे *Nepalczyk* (पुरुष) / *Nepalka* (महिला) हो: *Jestem Nepalczykiem* (*jestem* पछि तृतीया)। वा सजिलै: *Jestem z Nepalu.*" } }
      ]
    },
    {
      them: ["Dziękuję. Czy ma Pan numer PESEL?", "Thank you. Do you have a PESEL number?", "धन्यवाद। तपाईंसँग PESEL नम्बर छ?"],
      replies: [
        { pl: "Tak, mam. Tu jest zapisany na kartce.", en: "Yes, I do. It's written here on a piece of paper.", ne: "छ। यहाँ कागजमा लेखेको छ।", ok: true },
        { pl: "Jeszcze nie mam. Czekam na niego.", en: "Not yet. I'm waiting for it.", ne: "अहिलेसम्म छैन। पर्खिरहेको छु।", ok: true },
        { pl: "Tak, mam ją.", en: "(wrong pronoun)", ne: "(गलत सर्वनाम)", ok: false,
          why: { en: "*PESEL* is masculine (*ten PESEL*), so 'I have it' is *mam go*. *Ją* is for feminine nouns: *karta → mam ją*.",
                 ne: "*PESEL* पुल्लिङ्ग हो (*ten PESEL*), त्यसैले 'मसँग छ' = *mam go*। *Ją* स्त्रीलिङ्ग नामका लागि हो: *karta → mam ją*।" } }
      ]
    },
    {
      them: ["Dobrze. Proszę podać adres zamieszkania w Polsce i numer telefonu.", "Fine. Please give your home address in Poland and your phone number.", "ठीक छ। पोल्यान्डको बसोबास ठेगाना र फोन नम्बर बताउनुहोस्।"],
      replies: [
        { pl: "Mieszkam w Poznaniu, na ulicy Długiej czternaście, mieszkanie numer pięć.", en: "I live in Poznań, at 14 Długa Street, flat number 5.", ne: "म पोज्नानमा, द्वुगा सडक १४, फ्ल्याट नम्बर ५ मा बस्छु।", ok: true },
        { pl: "Mieszkam w Poznań, na ulicy Długa.", en: "(wrong case after 'w' and 'na')", ne: "(*w* र *na* पछि गलत विभक्ति)", ok: false,
          why: { en: "*W* and *na* for a place take the locative: *w Poznaniu*, *w Warszawie*, *na ulicy Długiej*.",
                 ne: "ठाउँ जनाउने *w* र *na* पछि अधिकरण (locative) आउँछ: *w Poznaniu*, *w Warszawie*, *na ulicy Długiej*।" } },
        { pl: "Mój telefon to Samsung.", en: "My phone is a Samsung.", ne: "मेरो फोन सामसुङ हो।", ok: false,
          why: { en: "She asked for your phone **number** (*numer telefonu*), not the brand. Say the digits in pairs or threes: *pięćset jeden, dwieście trzydzieści…*",
                 ne: "उहाँले फोनको **नम्बर** (*numer telefonu*) सोध्नुभएको हो, ब्रान्ड होइन। अंकहरू दुई-दुई वा तीन-तीन गरेर भन्नुहोस्: *pięćset jeden, dwieście trzydzieści…*" } }
      ]
    },
    {
      them: ["Dziękuję. Do konta dostanie Pan kartę debetową — przyjdzie pocztą w ciągu tygodnia. Chce Pan też aplikację mobilną?", "Thank you. With the account you'll get a debit card — it will come by post within a week. Would you like the mobile app too?", "धन्यवाद। खातासँगै तपाईंलाई डेबिट कार्ड आउँछ — एक हप्ताभित्र हुलाकबाट आउँछ। मोबाइल एप पनि चाहिन्छ?"],
      replies: [
        { pl: "Tak, poproszę. Wolę płacić telefonem.", en: "Yes, please. I prefer paying with my phone.", ne: "हो, दिनुहोस्। मलाई फोनबाट तिर्न मन पर्छ।", ok: true },
        { pl: "Tak. Czy aplikacja jest też po angielsku?", en: "Yes. Is the app in English too?", ne: "हो। के एप अंग्रेजीमा पनि छ?", ok: true },
        { pl: "Tak, poproszę aplikacja mobilna.", en: "(wrong form after 'poproszę')", ne: "(*poproszę* पछि गलत रूप)", ok: false,
          why: { en: "*Poproszę* takes the accusative. Feminine *-a* becomes *-ę* and the adjective *-a* becomes *-ą*: *poproszę aplikację mobilną*.",
                 ne: "*Poproszę* पछि द्वितीया आउँछ। स्त्रीलिङ्ग *-a* *-ę* हुन्छ र विशेषणको *-a* *-ą* हुन्छ: *poproszę aplikację mobilną*।" } }
      ]
    },
    {
      them: ["Aplikacja jest po polsku i po angielsku. Może Pan w niej też płacić BLIK-iem.", "The app is in Polish and English. You can also pay with BLIK in it.", "एप पोलिश र अंग्रेजी दुवैमा छ। यसमा BLIK बाट पनि तिर्न सकिन्छ।"],
      replies: [
        { pl: "Co to jest BLIK? Jak to działa?", en: "What is BLIK? How does it work?", ne: "BLIK भनेको के हो? कसरी चल्छ?", ok: true },
        { pl: "Co to jest BLIK? Jak to działać?", en: "(infinitive instead of 'it works')", ne: "('चल्छ' को सट्टा मूल क्रिया)", ok: false,
          why: { en: "*Działać* is the dictionary form (to work). In a question you need the conjugated form: *Jak to działa?* (How does it work?)",
                 ne: "*Działać* शब्दकोशको रूप हो (चल्नु)। प्रश्नमा रूपान्तरित क्रिया चाहिन्छ: *Jak to działa?* (कसरी चल्छ?)" } },
        { pl: "Mogłabyś mi wytłumaczyć, co to jest BLIK?", en: "Could you (informal) explain what BLIK is?", ne: "मलाई BLIK के हो बुझाइदिन सक्छ्यौ?", ok: false,
          why: { en: "*Mogłabyś* is the *ty* form. With a bank adviser use *Pani*: *Czy mogłaby Pani wytłumaczyć, co to jest BLIK?*",
                 ne: "*Mogłabyś* *ty* को रूप हो। बैंक सल्लाहकारसँग *Pani* प्रयोग गर्नुहोस्: *Czy mogłaby Pani wytłumaczyć, co to jest BLIK?*" } }
      ]
    },
    {
      them: ["To szybkie płatności telefonem. W aplikacji generuje Pan sześciocyfrowy kod i wpisuje go w sklepie albo w internecie. Można też wypłacić gotówkę z bankomatu bez karty.", "It's fast payment by phone. In the app you generate a six-digit code and enter it in a shop or online. You can also withdraw cash from an ATM without a card.", "यो फोनबाट छिटो भुक्तानी हो। एपमा छ अंकको कोड बनाउनुहुन्छ र पसलमा वा अनलाइनमा हाल्नुहुन्छ। कार्ड बिना एटीएमबाट नगद पनि झिक्न सकिन्छ।"],
      replies: [
        { pl: "Super, to bardzo wygodne. A czy prowadzenie konta jest bezpłatne?", en: "Great, that's very convenient. And is the account free?", ne: "राम्रो, यो धेरै सजिलो छ। अनि खाता चलाउन निःशुल्क हो?", ok: true },
        { pl: "Rozumiem. Ile kosztuje prowadzenie konta miesięcznie?", en: "I see. How much does the account cost per month?", ne: "बुझें। खाता चलाउन महिनाको कति लाग्छ?", ok: true },
        { pl: "Rozumiem, czyli kod ma sześć cyfry?", en: "(wrong form after 'sześć')", ne: "(*sześć* पछि गलत रूप)", ok: false,
          why: { en: "After 5 and more, use the genitive plural: *sześć cyfr*, *pięć złotych*, *sześć dni*. *Cyfry* is only after 2–4: *cztery cyfry*.",
                 ne: "५ वा बढीपछि षष्ठी बहुवचन: *sześć cyfr*, *pięć złotych*, *sześć dni*। *Cyfry* २–४ पछि मात्र: *cztery cyfry*।" } }
      ]
    },
    {
      them: ["Konto jest bezpłatne, jeśli co miesiąc wpływa na nie wynagrodzenie. Proszę jeszcze podpisać umowę na tablecie, tutaj.", "The account is free if your salary comes into it every month. Now please sign the agreement on the tablet, here.", "हरेक महिना तलब आउँछ भने खाता निःशुल्क हो। अब यहाँ ट्याब्लेटमा सम्झौतामा हस्ताक्षर गर्नुहोस्।"],
      replies: [
        { pl: "Dobrze. Czy mogę najpierw spokojnie przeczytać umowę?", en: "OK. May I read the agreement calmly first?", ne: "हुन्छ। के म पहिला सम्झौता शान्तसँग पढ्न सक्छु?", ok: true },
        { pl: "Dobrze, już podpisuję. Kiedy dostanę numer konta?", en: "OK, I'm signing now. When will I get the account number?", ne: "हुन्छ, अहिले नै हस्ताक्षर गर्दैछु। खाता नम्बर कहिले पाउँछु?", ok: true },
        { pl: "Dobrze, podpiszę bez czytanie.", en: "(wrong form after 'bez')", ne: "(*bez* पछि गलत रूप)", ok: false,
          why: { en: "*Bez* (without) takes the genitive: *bez czytania*, *bez karty*. And a tip: you can always ask to read a contract before you sign it.",
                 ne: "*Bez* (बिना) पछि षष्ठी आउँछ: *bez czytania*, *bez karty*। अनि सुझाव: हस्ताक्षर गर्नुअघि सम्झौता पढ्न माग्न सधैं पाइन्छ।" } }
      ]
    }
  ],
  end: {
    en: "Well done! You opened an account, asked about the card, the app and BLIK, and checked the fees. Give your new account number (26 digits) to your employer's HR.",
    ne: "स्याबास! तपाईंले खाता खोल्नुभयो, कार्ड, एप र BLIK बारे सोध्नुभयो, र शुल्क जाँच्नुभयो। नयाँ खाता नम्बर (२६ अंकको) रोजगारदाताको HR लाई दिनुहोस्।"
  },
  useful: [
    ["chciałbym założyć konto", "I'd like to open an account (m)", "म खाता खोल्न चाहन्छु (पुरुष)", "HCHAW-bim za-WO-zhich KON-to", "ˈह्चाव्-बिम् ज़ा-ˈवो-झिच् ˈकोन्-तो"],
    ["dokument tożsamości", "ID document", "परिचय पत्र", "do-KOO-ment tosh-sa-MOSH-chee", "दो-ˈकु-मेन्त् तोश्-सा-ˈमोश्-चि"],
    ["karta debetowa", "debit card", "डेबिट कार्ड", "KAR-ta de-be-TO-va", "ˈकार्-ता दे-बे-ˈतो-भा"],
    ["aplikacja mobilna", "mobile app", "मोबाइल एप", "a-plee-KATS-ya mo-BEEL-na", "आ-प्लि-ˈकात्स्-या मो-ˈबिल्-ना"],
    ["płacić BLIK-iem", "to pay with BLIK", "BLIK बाट तिर्नु", "PWA-cheech BLEE-kyem", "ˈप्वा-चिच् ˈब्लि-क्येम्"],
    ["numer konta", "account number", "खाता नम्बर", "NOO-mer KON-ta", "ˈनु-मेर् ˈकोन्-ता"],
    ["prowadzenie konta", "account maintenance (fee)", "खाता सञ्चालन (शुल्क)", "pro-va-DZE-nyeh KON-ta", "प्रो-भा-ˈद्ज़े-न्ये ˈकोन्-ता"],
    ["wypłacić gotówkę z bankomatu", "to withdraw cash from an ATM", "एटीएमबाट नगद झिक्नु", "vi-PWA-cheech go-TOOF-keh z ban-ko-MA-too", "भि-ˈप्वा-चिच् गो-ˈतुफ्-के ज़् बान्-को-ˈमा-तु"]
  ]
});

// ---------------------------------------------------------------- B2

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b2-interview",
  level: "B2",
  title: "Job interview: warehouse team leader",
  titleNe: "जागिरको अन्तर्वार्ता: गोदामको टोली नेता",
  scene: {
    en: "You are applying for a team-leader job (*lider zmiany*) in a large distribution warehouse. You have four years of warehouse experience in Poland. The logistics manager, Ms Wróbel, interviews you. (Replies use the forms a man says; a woman says *pracowałam*, *kierowałam*, *jestem dyspozycyjna*.)",
    ne: "तपाईं एउटा ठूलो वितरण गोदाममा टोली नेता (*lider zmiany*) को जागिरका लागि आवेदन दिँदै हुनुहुन्छ। तपाईंसँग पोल्यान्डमा चार वर्ष गोदाममा कामको अनुभव छ। लजिस्टिक्स प्रबन्धक भ्रुबेल जीले अन्तर्वार्ता लिनुहुन्छ। (जवाफहरू पुरुषले बोल्ने रूपमा छन्; महिलाले *pracowałam*, *kierowałam*, *jestem dyspozycyjna* भन्छन्।)"
  },
  them: "Pani Wróbel",
  themEn: "Ms Wróbel, logistics manager",
  themNe: "भ्रुबेल जी, लजिस्टिक्स प्रबन्धक",
  steps: [
    {
      them: ["Dzień dobry, proszę usiąść. Na początek proszę powiedzieć kilka słów o sobie.", "Hello, please sit down. To start, please tell me a few words about yourself.", "नमस्ते, बस्नुहोस्। सुरुमा आफ्नो बारेमा केही शब्द भन्नुहोस्।"],
      replies: [
        { pl: "Dzień dobry, dziękuję za zaproszenie. Nazywam się Ram Thapa i od czterech lat pracuję w logistyce w Polsce.", en: "Hello, thank you for the invitation. My name is Ram Thapa and I've been working in logistics in Poland for four years.", ne: "नमस्ते, निम्तोका लागि धन्यवाद। मेरो नाम राम थापा हो र म चार वर्षदेखि पोल्यान्डमा लजिस्टिक्समा काम गर्दैछु।", ok: true },
        { pl: "Mam na imię Ram, mam trzydzieści lat, lubię piłkę nożną i gotowanie.", en: "My name is Ram, I'm thirty, I like football and cooking.", ne: "मेरो नाम राम हो, म तीस वर्षको हुँ, मलाई फुटबल र खाना पकाउन मन पर्छ।", ok: false,
          why: { en: "The grammar is fine, but in an interview 'about yourself' means your **professional** story: experience, skills, why this job. Hobbies come at most briefly at the end.",
                 ne: "व्याकरण ठीक छ, तर अन्तर्वार्तामा 'आफ्नो बारेमा' भनेको **पेसागत** कुरा हो: अनुभव, सीप, किन यो जागिर। सोखहरू बढीमा अन्त्यमा छोटकरीमा।" } },
        { pl: "Dzięki za zaproszenie. Od czterech lat pracuję w logistyki.", en: "(too casual, wrong case)", ne: "(धेरै अनौपचारिक, गलत विभक्ति)", ok: false,
          why: { en: "*Dzięki* is casual — say *dziękuję*. And *w* for a place or field takes the locative: *w logistyce* (*k* changes to *c* before *-e*).",
                 ne: "*Dzięki* अनौपचारिक हो — *dziękuję* भन्नुहोस्। अनि ठाउँ वा क्षेत्र जनाउने *w* पछि अधिकरण आउँछ: *w logistyce* (*-e* अगाडि *k* *c* मा फेरिन्छ)।" } }
      ]
    },
    {
      them: ["Czym się Pan zajmuje w obecnej pracy?", "What do you do in your current job?", "हालको काममा तपाईं के गर्नुहुन्छ?"],
      replies: [
        { pl: "Pracuję jako operator wózka widłowego. Odpowiadam też za szkolenie nowych pracowników na zmianie.", en: "I work as a forklift operator. I'm also responsible for training new workers on my shift.", ne: "म फोर्कलिफ्ट चालकको रूपमा काम गर्छु। आफ्नो सिफ्टमा नयाँ कामदारलाई तालिम दिने जिम्मा पनि मेरो हो।", ok: true },
        { pl: "Pracuję jako operatorem wózka widłowego.", en: "(wrong case after 'jako')", ne: "(*jako* पछि गलत विभक्ति)", ok: false,
          why: { en: "After *jako* (as) use the nominative: *pracuję jako operator*. The instrumental is used after *być*: *jestem operatorem*. Both are correct — just don't mix them.",
                 ne: "*jako* (को रूपमा) पछि प्रथमा: *pracuję jako operator*। *być* पछि तृतीया: *jestem operatorem*। दुवै ठीक छन् — मिसाउनु मात्र हुँदैन।" } },
        { pl: "Pracuję jako operator wózek widłowy.", en: "(missing genitive)", ne: "(षष्ठी छुट्यो)", ok: false,
          why: { en: "An operator **of** a forklift: the second noun goes into the genitive: *operator wózka widłowego*, *kierowca autobusu*.",
                 ne: "फोर्कलिफ्ट**को** चालक: दोस्रो नाम षष्ठीमा जान्छ: *operator wózka widłowego*, *kierowca autobusu*।" } }
      ]
    },
    {
      them: ["Ma Pan doświadczenie w kierowaniu zespołem?", "Do you have experience in managing a team?", "तपाईंसँग टोली सञ्चालन गरेको अनुभव छ?"],
      replies: [
        { pl: "Tak. Kiedy brygadzista był na urlopie, przez dwa miesiące kierowałem zespołem dwunastu osób.", en: "Yes. When the foreman was on leave, I managed a team of twelve people for two months.", ne: "छ। फोरम्यान बिदामा हुँदा मैले दुई महिना बाह्र जनाको टोली सम्हालें।", ok: true },
        { pl: "Formalnie nie, ale na co dzień koordynuję pracę kolegów i wdrażam nowe osoby.", en: "Not formally, but every day I coordinate my colleagues' work and train new people.", ne: "औपचारिक रूपमा छैन, तर दैनिक रूपमा म सहकर्मीहरूको काम मिलाउँछु र नयाँ मान्छेलाई काम सिकाउँछु।", ok: true },
        { pl: "Tak, przez dwa miesiące kierowałem zespół dwunastu osób.", en: "(wrong case after 'kierować')", ne: "(*kierować* पछि गलत विभक्ति)", ok: false,
          why: { en: "*Kierować* (to manage, to lead) takes the instrumental: *kierować zespołem*, *kierować firmą*. The same goes for *zarządzać* and *dowodzić*.",
                 ne: "*Kierować* (नेतृत्व/सञ्चालन गर्नु) पछि तृतीया आउँछ: *kierować zespołem*, *kierować firmą*। *zarządzać* र *dowodzić* मा पनि त्यस्तै।" } }
      ]
    },
    {
      them: ["Jakie są Pana mocne strony?", "What are your strengths?", "तपाईंका बलिया पक्ष के हुन्?"],
      replies: [
        { pl: "Jestem dokładny i zachowuję spokój w stresujących sytuacjach. Poza tym mówię po polsku, angielsku i nepalsku, więc łatwo dogaduję się z ludźmi z różnych krajów.", en: "I'm precise and stay calm in stressful situations. Also, I speak Polish, English and Nepali, so I get on easily with people from different countries.", ne: "म ध्यान दिएर काम गर्छु र तनावमा पनि शान्त रहन्छु। साथै म पोलिश, अंग्रेजी र नेपाली बोल्छु, त्यसैले विभिन्न देशका मान्छेसँग सजिलै मिल्छु।", ok: true },
        { pl: "Jestem najlepszy pracownik w całym magazynie.", en: "(wrong case, and boastful)", ne: "(गलत विभक्ति, र घमण्डी)", ok: false,
          why: { en: "After *jestem* + noun use the instrumental: *jestem najlepszym pracownikiem*. But even correctly, it sounds boastful — give concrete examples instead.",
                 ne: "*jestem* + नाम पछि तृतीया: *jestem najlepszym pracownikiem*। तर सही भए पनि घमण्डी सुनिन्छ — बरु ठोस उदाहरण दिनुहोस्।" } },
        { pl: "Nie wiem, chyba nie mam mocnych stron.", en: "I don't know, I probably don't have any strengths.", ne: "थाहा छैन, सायद मेरो कुनै बलियो पक्ष छैन।", ok: false,
          why: { en: "Modesty is nice, but in an interview you must present yourself. Prepare two or three strengths with a short example for each.",
                 ne: "नम्रता राम्रो हो, तर अन्तर्वार्तामा आफूलाई प्रस्तुत गर्नैपर्छ। दुई-तीन बलिया पक्ष र हरेकको छोटो उदाहरण तयार राख्नुहोस्।" } }
      ]
    },
    {
      them: ["A nad czym musi Pan jeszcze popracować?", "And what do you still need to work on?", "अनि तपाईंले अझै केमा सुधार गर्नुपर्छ?"],
      replies: [
        { pl: "Czasami biorę za dużo zadań na siebie. Teraz uczę się delegować pracę innym.", en: "Sometimes I take too many tasks on myself. Now I'm learning to delegate work to others.", ne: "कहिलेकाहीँ म धेरै काम आफैंमाथि लिन्छु। अहिले अरूलाई काम बाँड्न सिक्दैछु।", ok: true },
        { pl: "Moja słaba strona jest pisanie raportów po polsku.", en: "(wrong case with 'jest')", ne: "(*jest* सँग गलत विभक्ति)", ok: false,
          why: { en: "With *jest* linking two nouns, the first goes into the instrumental: *Moją słabą stroną jest pisanie raportów.* An easier way: *Moja słaba strona to pisanie raportów.* (*to* keeps the nominative).",
                 ne: "*jest* ले दुई नाम जोड्दा पहिलो तृतीयामा जान्छ: *Moją słabą stroną jest pisanie raportów.* सजिलो तरिका: *Moja słaba strona to pisanie raportów.* (*to* सँग प्रथमा नै रहन्छ)।" } },
        { pl: "Nie mam żadnych słabych stron.", en: "I don't have any weaknesses.", ne: "मेरो कुनै कमजोरी छैन।", ok: false,
          why: { en: "Nobody believes this. Recruiters expect one honest, small weakness and what you are doing about it (*pracuję nad tym*, *chodzę na kurs*).",
                 ne: "यो कसैले पत्याउँदैन। भर्ती गर्नेहरू एउटा इमानदार, सानो कमजोरी र त्यसका लागि तपाईं के गर्दै हुनुहुन्छ भन्ने सुन्न चाहन्छन् (*pracuję nad tym*, *chodzę na kurs*)।" } }
      ]
    },
    {
      them: ["Praca jest w systemie trzyzmianowym, także w niektóre soboty. Czy to dla Pana problem?", "The job is on three shifts, also on some Saturdays. Is that a problem for you?", "काम तीन सिफ्ट प्रणालीमा हुन्छ, केही शनिबार पनि। के यो तपाईंलाई समस्या हो?"],
      replies: [
        { pl: "Nie, jestem dyspozycyjny. Mogę pracować na wszystkie zmiany, również w soboty.", en: "No, I'm flexible. I can work all shifts, Saturdays too.", ne: "होइन, म जुनसुकै समय काम गर्न तयार छु। सबै सिफ्टमा, शनिबार पनि काम गर्न सक्छु।", ok: true },
        { pl: "Trzy zmiany to nie problem. Wolałbym tylko nie pracować w każdą sobotę, ale raz czy dwa razy w miesiącu jest w porządku.", en: "Three shifts aren't a problem. I'd just prefer not to work every Saturday, but once or twice a month is fine.", ne: "तीन सिफ्ट समस्या होइन। हरेक शनिबार काम नगर्न रुचाउँछु, तर महिनामा एक-दुई पटक ठीक छ।", ok: true },
        { pl: "Nie, mogę pracować nawet w każdy sobota.", en: "(wrong gender and case)", ne: "(गलत लिङ्ग र विभक्ति)", ok: false,
          why: { en: "*Sobota* is feminine, and *w* + day takes the accusative: *w sobotę*, *w każdą sobotę*. Compare masculine: *w każdy poniedziałek*.",
                 ne: "*Sobota* स्त्रीलिङ्ग हो, र *w* + बार पछि द्वितीया आउँछ: *w sobotę*, *w każdą sobotę*। पुल्लिङ्गसँग तुलना: *w każdy poniedziałek*।" } }
      ]
    },
    {
      them: ["Jakie ma Pan oczekiwania finansowe?", "What are your salary expectations?", "तपाईंको तलबको अपेक्षा कति हो?"],
      replies: [
        { pl: "Biorąc pod uwagę moje doświadczenie i zakres obowiązków, oczekuję około sześciu tysięcy złotych brutto.", en: "Considering my experience and the scope of duties, I expect about six thousand zlotys gross.", ne: "मेरो अनुभव र जिम्मेवारीको दायरा हेरेर, म करिब छ हजार ज्लोती (कर कट्टी अघि) अपेक्षा गर्छु।", ok: true },
        { pl: "Na podobnych stanowiskach stawki są zwykle od pięciu do sześciu tysięcy brutto. Jestem otwarty na rozmowę.", en: "For similar positions, pay is usually five to six thousand gross. I'm open to discussion.", ne: "यस्तै पदमा तलब सामान्यतया पाँचदेखि छ हजार (कर कट्टी अघि) हुन्छ। म छलफलका लागि खुला छु।", ok: true },
        { pl: "Oczekuję około sześć tysięcy złotych brutto.", en: "(wrong form after 'około')", ne: "(*około* पछि गलत रूप)", ok: false,
          why: { en: "*Około* (about) takes the genitive, and numbers change too: *około sześciu tysięcy*, *około pięciuset złotych*, *około dwóch godzin*. Also say clearly *brutto* (gross) or *netto* (net).",
                 ne: "*Około* (करिब) पछि षष्ठी आउँछ, र संख्या पनि फेरिन्छ: *około sześciu tysięcy*, *około pięciuset złotych*, *około dwóch godzin*। साथै *brutto* (कर कट्टी अघि) कि *netto* (कट्टीपछि) स्पष्ट भन्नुहोस्।" } }
      ]
    },
    {
      them: ["Dziękuję. Czy ma Pan do nas jakieś pytania?", "Thank you. Do you have any questions for us?", "धन्यवाद। हामीलाई केही प्रश्न छ?"],
      replies: [
        { pl: "Tak. Jak wygląda okres wdrożenia na tym stanowisku i ile osób liczy zespół?", en: "Yes. What does the induction period look like in this position, and how many people are in the team?", ne: "छ। यो पदमा काम सिकाउने सुरुको अवधि कस्तो हुन्छ, र टोलीमा कति जना छन्?", ok: true },
        { pl: "Nie, nie mam pytań. Kiedy mogę zacząć?", en: "No, no questions. When can I start?", ne: "छैन, प्रश्न छैन। म कहिले सुरु गर्न सक्छु?", ok: false,
          why: { en: "*Kiedy mogę zacząć?* assumes you already have the job. Asking one or two good questions about the work shows real interest.",
                 ne: "*Kiedy mogę zacząć?* ले जागिर पाइसकेको जस्तो मान्छ। कामबारे एक-दुई राम्रा प्रश्न सोध्दा साँचो रुचि देखिन्छ।" } },
        { pl: "Tak, a ty jak długo tu pracujesz?", en: "Yes, and how long have you (informal) worked here?", ne: "छ, अनि तिमी यहाँ कति समयदेखि काम गर्छौ?", ok: false,
          why: { en: "*Ty* with an interviewer is far too familiar. Use *Pani*: *A jak długo Pani tu pracuje?* (the verb is 3rd person with *Pan/Pani*).",
                 ne: "अन्तर्वार्ता लिनेलाई *ty* भन्नु धेरै अनौपचारिक हो। *Pani* प्रयोग गर्नुहोस्: *A jak długo Pani tu pracuje?* (*Pan/Pani* सँग क्रिया तृतीय पुरुषमा हुन्छ)।" } }
      ]
    },
    {
      them: ["Dziękuję za rozmowę. Odezwiemy się do Pana w ciągu tygodnia.", "Thank you for the interview. We'll get back to you within a week.", "कुराकानीका लागि धन्यवाद। हामी एक हप्ताभित्र तपाईंलाई सम्पर्क गर्नेछौं।"],
      replies: [
        { pl: "Ja również dziękuję za spotkanie. Czekam na informację. Do widzenia.", en: "Thank you for the meeting too. I'll wait for news. Goodbye.", ne: "भेटका लागि मेरो तर्फबाट पनि धन्यवाद। म खबर पर्खन्छु। नमस्ते।", ok: true },
        { pl: "Dziękuję. Odezwę się do Pani w ciągu tygodnia.", en: "Thank you. I'll get back to you within a week.", ne: "धन्यवाद। म एक हप्ताभित्र तपाईंलाई सम्पर्क गर्छु।", ok: false,
          why: { en: "*Odezwiemy się* = **we** will contact you. If you say *odezwę się*, you promise to contact them. Just thank her and say you are waiting: *Czekam na informację.*",
                 ne: "*Odezwiemy się* = **हामी** सम्पर्क गर्छौं। *odezwę się* भन्दा तपाईं सम्पर्क गर्छु भनेको हुन्छ। धन्यवाद दिएर खबर पर्खन्छु भन्नुहोस्: *Czekam na informację.*" } },
        { pl: "Dziękuję, to do zobaczenia w poniedziałek w pracy!", en: "Thanks, see you on Monday at work then!", ne: "धन्यवाद, सोमबार काममा भेटौंला!", ok: false,
          why: { en: "You don't have the job yet — this sounds presumptuous. End politely and neutrally: *Dziękuję za spotkanie, do widzenia.*",
                 ne: "तपाईंले अझै जागिर पाउनुभएको छैन — यो अति आत्मविश्वासी सुनिन्छ। नम्र र सामान्य ढंगले टुंग्याउनुहोस्: *Dziękuję za spotkanie, do widzenia.*" } }
      ]
    }
  ],
  end: {
    en: "Excellent! You presented your experience, talked about strengths and a weakness, named a salary range and asked good questions — all in formal Polish.",
    ne: "उत्कृष्ट! तपाईंले आफ्नो अनुभव प्रस्तुत गर्नुभयो, बलियो पक्ष र एउटा कमजोरीबारे बोल्नुभयो, तलबको दायरा भन्नुभयो र राम्रा प्रश्न सोध्नुभयो — सबै औपचारिक पोलिशमा।"
  },
  useful: [
    ["dziękuję za zaproszenie", "thank you for the invitation", "निम्तोका लागि धन्यवाद", "jen-KOO-yeh za za-pro-SHE-nyeh", "जेन्-ˈकु-ये ज़ा ज़ा-प्रो-ˈशे-न्ये"],
    ["kierować zespołem", "to manage a team", "टोलीको नेतृत्व गर्नु", "kye-RO-vach zes-PO-wem", "क्ये-ˈरो-भाच् ज़ेस्-ˈपो-वेम्"],
    ["moją mocną stroną jest…", "my strength is…", "मेरो बलियो पक्ष … हो", "MO-yon MOTS-non STRO-non yest", "ˈमो-यों ˈमोत्स्-नों ˈस्त्रो-नों येस्त्"],
    ["jestem dyspozycyjny", "I'm flexible / available (m)", "म जुनसुकै समय काम गर्न तयार छु (पुरुष)", "YES-tem dis-po-zi-TSIY-ni", "ˈयेस्-तेम् दिस्-पो-ज़ि-ˈत्सिय्-नि"],
    ["oczekiwania finansowe", "salary expectations", "तलबको अपेक्षा", "o-che-kee-VA-nya fee-nan-SO-veh", "ओ-चे-कि-ˈभा-न्या फि-नान्-ˈसो-भे"],
    ["około sześciu tysięcy brutto", "about six thousand gross", "करिब छ हजार (कर कट्टी अघि)", "o-KO-wo SHESH-choo ti-SHEN-tsi BROOT-to", "ओ-ˈको-वो ˈशेश्-चु ति-ˈशेन्-त्सि ˈब्रुत्-तो"],
    ["okres wdrożenia", "induction / onboarding period", "काम सिकाउने सुरुको अवधि", "O-kres vdro-ZHE-nya", "ˈओ-क्रेस् भ्द्रो-ˈझे-न्या"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b2-complaint",
  level: "B2",
  title: "Returning a faulty phone",
  titleNe: "बिग्रेको फोन फिर्ता गर्दै",
  scene: {
    en: "Three weeks ago you bought a phone in an electronics shop. Now it switches itself off and the battery lasts only two hours. You have the receipt. You want a replacement or your money back — politely but firmly. (Language practice only: check your exact consumer rights with a consumer adviser, *rzecznik konsumentów*.)",
    ne: "तीन हप्ता अघि तपाईंले एउटा इलेक्ट्रोनिक्स पसलबाट फोन किन्नुभयो। अहिले यो आफैं बन्द हुन्छ र ब्याट्री दुई घण्टा मात्र टिक्छ। तपाईंसँग रसिद छ। तपाईं नयाँ फोन वा पैसा फिर्ता चाहनुहुन्छ — नम्र तर दृढ भएर। (भाषा अभ्यास मात्र: आफ्नो ठ्याक्कै उपभोक्ता अधिकार उपभोक्ता सल्लाहकार, *rzecznik konsumentów* सँग बुझ्नुहोस्।)"
  },
  them: "Sprzedawca",
  themEn: "Shop assistant",
  themNe: "पसलको कर्मचारी",
  steps: [
    {
      them: ["Dzień dobry, słucham Pana.", "Hello, how can I help you?", "नमस्ते, भन्नुहोस्।"],
      replies: [
        { pl: "Dzień dobry. Chciałbym złożyć reklamację. Trzy tygodnie temu kupiłem u Państwa ten telefon.", en: "Hello. I'd like to make a complaint. I bought this phone from you three weeks ago.", ne: "नमस्ते। म उजुरी दर्ता गर्न चाहन्छु। तीन हप्ता अघि मैले तपाईंहरूकहाँबाट यो फोन किनेको थिएँ।", ok: true },
        { pl: "Dzień dobry. Chciałbym zrobić reklamę.", en: "Hello. I'd like to make an advertisement.", ne: "नमस्ते। म विज्ञापन बनाउन चाहन्छु।", ok: false,
          why: { en: "False friend! *Reklama* is an advertisement. A complaint about a faulty product is *reklamacja*, and the verb is *złożyć reklamację*.",
                 ne: "धोका दिने शब्द! *Reklama* को अर्थ विज्ञापन हो। बिग्रेको सामानको उजुरी *reklamacja* हो, र क्रिया *złożyć reklamację* हो।" } },
        { pl: "Kupiłem u was ten telefon i jest do niczego!", en: "I bought this phone from you lot and it's rubbish!", ne: "तिमीहरूकहाँबाट यो फोन किनें र यो बेकार छ!", ok: false,
          why: { en: "Anger makes the conversation harder. When speaking to a shop or company, use the polite plural *Państwo* (*u Państwa*), not *wy* (*u was*), and describe the problem calmly.",
                 ne: "रिसले कुराकानी झन् गाह्रो बनाउँछ। पसल वा कम्पनीसँग बोल्दा आदरार्थी बहुवचन *Państwo* (*u Państwa*) प्रयोग गर्नुहोस्, *wy* (*u was*) होइन, र समस्या शान्तसँग बताउनुहोस्।" } }
      ]
    },
    {
      them: ["Co się dzieje z telefonem?", "What's wrong with the phone?", "फोनलाई के भयो?"],
      replies: [
        { pl: "Sam się wyłącza, kilka razy dziennie. Poza tym bateria rozładowuje się w dwie godziny.", en: "It switches itself off several times a day. Also, the battery goes flat in two hours.", ne: "दिनमा धेरै पटक आफैं बन्द हुन्छ। साथै ब्याट्री दुई घण्टामै सकिन्छ।", ok: true },
        { pl: "Sam wyłącza, kilka razy dziennie.", en: "(missing 'się')", ne: "(*się* छुट्यो)", ok: false,
          why: { en: "Without *się*, *wyłączać* needs an object: *wyłączam telefon* (I switch the phone off). When the phone does it by itself, add *się*: *telefon sam się wyłącza*.",
                 ne: "*się* बिना *wyłączać* लाई कर्म चाहिन्छ: *wyłączam telefon* (म फोन बन्द गर्छु)। फोन आफैं बन्द हुँदा *się* थप्नुहोस्: *telefon sam się wyłącza*।" } },
        { pl: "Bateria rozładowuje się w dwa godziny.", en: "(wrong form of 'two')", ne: "('दुई' को गलत रूप)", ok: false,
          why: { en: "*Godzina* is feminine, so 'two' is *dwie*: *dwie godziny*. *Dwa* is for masculine and neuter nouns: *dwa dni*, *dwa telefony*.",
                 ne: "*Godzina* स्त्रीलिङ्ग हो, त्यसैले 'दुई' = *dwie*: *dwie godziny*। *Dwa* पुल्लिङ्ग र नपुंसकलिङ्ग नामका लागि हो: *dwa dni*, *dwa telefony*।" } }
      ]
    },
    {
      them: ["Ma Pan paragon albo fakturę?", "Do you have the receipt or an invoice?", "तपाईंसँग रसिद वा बिल छ?"],
      replies: [
        { pl: "Tak, oto paragon. Mam też potwierdzenie płatności kartą.", en: "Yes, here's the receipt. I also have the card payment confirmation.", ne: "छ, यो रसिद। मसँग कार्डबाट तिरेको प्रमाण पनि छ।", ok: true },
        { pl: "Tak, oto paragonu.", en: "(wrong form after 'oto')", ne: "(*oto* पछि गलत रूप)", ok: false,
          why: { en: "*Oto* (here is) is followed by the nominative — the basic form: *oto paragon*, *oto moja karta*.",
                 ne: "*Oto* (यो हो/लिनुहोस्) पछि प्रथमा — मूल रूप — आउँछ: *oto paragon*, *oto moja karta*।" } },
        { pl: "Paragon zostawiłem w domu, ale proszę mi uwierzyć.", en: "I left the receipt at home, but please believe me.", ne: "रसिद घरमै छोडें, तर मलाई विश्वास गर्नुहोस्।", ok: false,
          why: { en: "The Polish is fine, but practically: always bring the receipt or proof of payment (a bank statement also helps). Without it the shop will usually ask you to come back.",
                 ne: "पोलिश ठीक छ, तर व्यवहारमा: सधैं रसिद वा भुक्तानीको प्रमाण लिएर जानुहोस् (बैंक स्टेटमेन्टले पनि काम गर्छ)। नत्र पसलले प्रायः फेरि आउन भन्छ।" } }
      ]
    },
    {
      them: ["Możemy wysłać telefon do serwisu producenta. Naprawa trwa zwykle do trzydziestu dni.", "We can send the phone to the manufacturer's service centre. Repair usually takes up to thirty days.", "हामी फोन उत्पादकको सर्भिस सेन्टरमा पठाउन सक्छौं। मर्मतमा सामान्यतया तीस दिनसम्म लाग्छ।"],
      replies: [
        { pl: "Trzydzieści dni bez telefonu to dla mnie bardzo długo. Czy jest możliwość wymiany na nowy egzemplarz?", en: "Thirty days without a phone is very long for me. Is it possible to exchange it for a new one?", ne: "तीस दिन फोन बिना बस्नु मेरा लागि धेरै लामो हो। नयाँसँग साट्ने सम्भावना छ?", ok: true },
        { pl: "Wolałbym złożyć reklamację u Państwa, w sklepie, a nie w serwisie producenta.", en: "I'd prefer to file the complaint with you, in the shop, not with the manufacturer's service.", ne: "म उत्पादकको सर्भिसमा होइन, यहीँ पसलमा तपाईंहरूसँग उजुरी दर्ता गर्न चाहन्छु।", ok: true },
        { pl: "Trzydzieści dni? Pan chyba żartuje! Nie ma mowy!", en: "Thirty days? You must be joking! No way!", ne: "तीस दिन? तपाईं ठट्टा गर्दै हुनुहुन्छ! कुनै हालतमा हुँदैन!", ok: false,
          why: { en: "Firm is good, aggressive is not. Say clearly what you want, politely: *To dla mnie za długo. Czy jest inna możliwość?* (That's too long for me. Is there another option?)",
                 ne: "दृढ हुनु राम्रो, आक्रामक होइन। आफूलाई के चाहिन्छ नम्र भएर स्पष्ट भन्नुहोस्: *To dla mnie za długo. Czy jest inna możliwość?* (मेरा लागि धेरै लामो हो। अर्को उपाय छ?)" } }
      ]
    },
    {
      them: ["Wymiana jest możliwa dopiero wtedy, gdy wada zostanie potwierdzona. Takie są procedury.", "An exchange is only possible once the defect is confirmed. Those are the procedures.", "खराबी पुष्टि भएपछि मात्र साट्न मिल्छ। प्रक्रिया यस्तै छ।"],
      replies: [
        { pl: "Rozumiem procedury, ale telefon ma dopiero trzy tygodnie. Proszę, żeby reklamacja została przyjęta na piśmie, z opisem usterki.", en: "I understand the procedures, but the phone is only three weeks old. I'd like the complaint accepted in writing, with a description of the fault.", ne: "प्रक्रिया बुझें, तर फोन तीन हप्ता मात्र पुरानो हो। उजुरी खराबीको विवरणसहित लिखित रूपमा दर्ता गरियोस् भन्ने अनुरोध गर्छु।", ok: true },
        { pl: "Rozumiem, ale proszę, żeby Pan przyjmie reklamację na piśmie.", en: "(wrong verb form after 'żeby')", ne: "(*żeby* पछि गलत क्रिया रूप)", ok: false,
          why: { en: "After *żeby* (so that / that) in a request, the verb takes the **past-tense** form: *proszę, żeby Pan przyjął reklamację* (to a woman: *żeby Pani przyjęła*). Never the future *przyjmie*.",
                 ne: "अनुरोधमा *żeby* पछि क्रिया **भूतकाल**को रूपमा आउँछ: *proszę, żeby Pan przyjął reklamację* (महिलालाई: *żeby Pani przyjęła*)। भविष्यत् *przyjmie* कहिल्यै होइन।" } },
        { pl: "No dobra, to ja już nic nie chcę.", en: "Oh well, then I don't want anything.", ne: "ल ठिकै छ, मलाई अब केही चाहिँदैन।", ok: false,
          why: { en: "Don't give up just because there is a procedure. Ask for the complaint to be written down — that is your record. Calm persistence works best in Poland.",
                 ne: "प्रक्रिया छ भन्दैमा हार नमान्नुहोस्। उजुरी लिखित रूपमा दर्ता गर्न माग्नुहोस् — त्यो तपाईंको प्रमाण हो। पोल्यान्डमा शान्त तर निरन्तर आग्रह नै सबैभन्दा काम लाग्छ।" } }
      ]
    },
    {
      them: ["Dobrze. Proszę wypełnić formularz reklamacyjny. Czego Pan żąda: naprawy, wymiany czy zwrotu pieniędzy?", "OK. Please fill in the complaint form. What do you request: repair, replacement or a refund?", "ठीक छ। उजुरी फारम भर्नुहोस्। तपाईं के माग गर्नुहुन्छ: मर्मत, साट्ने कि पैसा फिर्ता?"],
      replies: [
        { pl: "Proszę o wymianę telefonu na nowy, a jeśli to niemożliwe — o zwrot pieniędzy.", en: "I'm asking for the phone to be replaced with a new one, and if that's impossible — for a refund.", ne: "फोनलाई नयाँसँग साटिदिन अनुरोध गर्छु, त्यो सम्भव नभए — पैसा फिर्ता।", ok: true },
        { pl: "Proszę o wymiana telefonu.", en: "(wrong form after 'proszę o')", ne: "(*proszę o* पछि गलत रूप)", ok: false,
          why: { en: "*Prosić o* (to ask for) takes the accusative: *proszę o wymianę*, *proszę o zwrot pieniędzy*, *proszę o pomoc*.",
                 ne: "*Prosić o* (माग्नु) पछि द्वितीया आउँछ: *proszę o wymianę*, *proszę o zwrot pieniędzy*, *proszę o pomoc*।" } },
        { pl: "Chcę kasę z powrotem.", en: "I want my cash back.", ne: "मलाई मेरो पैसा फिर्ता चाहियो।", ok: false,
          why: { en: "*Kasa* (cash, dosh) is slang. In a written complaint and with staff use the official words: *zwrot pieniędzy* (refund), *wymiana* (replacement), *naprawa* (repair).",
                 ne: "*Kasa* (पैसा) बोलचालको शब्द हो। लिखित उजुरीमा र कर्मचारीसँग आधिकारिक शब्द प्रयोग गर्नुहोस्: *zwrot pieniędzy* (पैसा फिर्ता), *wymiana* (साट्नु), *naprawa* (मर्मत)।" } }
      ]
    },
    {
      them: ["Zapisałem. Odpowiedź na reklamację dostanie Pan w ciągu czternastu dni — mailem albo SMS-em.", "I've written it down. You'll get an answer to your complaint within fourteen days — by email or SMS.", "लेखें। उजुरीको जवाफ तपाईंलाई चौध दिनभित्र इमेल वा SMS बाट आउँछ।"],
      replies: [
        { pl: "Dziękuję. Czy mogę dostać kopię formularza z datą i pieczątką sklepu?", en: "Thank you. Can I get a copy of the form with the date and the shop's stamp?", ne: "धन्यवाद। के मलाई मिति र पसलको छाप भएको फारमको प्रतिलिपि पाउन सकिन्छ?", ok: true },
        { pl: "Dziękuję. Czy mogę dostać kopia formularza?", en: "(wrong form after 'dostać')", ne: "(*dostać* पछि गलत रूप)", ok: false,
          why: { en: "*Dostać* takes the accusative: feminine *kopia* → *kopię*. Always ask for a dated copy — it proves when you complained.",
                 ne: "*Dostać* पछि द्वितीया: स्त्रीलिङ्ग *kopia* → *kopię*। मिति भएको प्रतिलिपि सधैं माग्नुहोस् — कहिले उजुरी गर्नुभयो भन्ने प्रमाण हुन्छ।" } },
        { pl: "Czyli odpowiedź będzie za dwa dni?", en: "So the answer will be in two days?", ne: "मतलब जवाफ दुई दिनमा आउँछ?", ok: false,
          why: { en: "He said *czternastu* — fourteen (*czternaście*), not two. Numbers 11–19 end in *-naście*: *jedenaście, dwanaście… czternaście*.",
                 ne: "उहाँले *czternastu* भन्नुभयो — चौध (*czternaście*), दुई होइन। ११–१९ का संख्या *-naście* मा टुंगिन्छन्: *jedenaście, dwanaście… czternaście*।" } }
      ]
    },
    {
      them: ["Proszę, to Pana kopia. Numer reklamacji jest na górze. Czy mogę jeszcze w czymś pomóc?", "Here is your copy. The complaint number is at the top. Can I help with anything else?", "लिनुहोस्, यो तपाईंको प्रतिलिपि। उजुरी नम्बर माथि छ। अरू केही सहयोग गरूँ?"],
      replies: [
        { pl: "Nie, dziękuję. Doceniam pomoc. Do widzenia.", en: "No, thank you. I appreciate the help. Goodbye.", ne: "पर्दैन, धन्यवाद। सहयोगको कदर गर्छु। नमस्ते।", ok: true },
        { pl: "Nie, dziękuję. Mam nadzieję, że następnym razem sprzedacie mi coś, co działa!", en: "No, thanks. I hope next time you'll sell me something that works!", ne: "पर्दैन, धन्यवाद। आशा छ अर्को पटक तिमीहरूले चल्ने सामान बेच्नेछौ!", ok: false,
          why: { en: "A sarcastic goodbye spoils a conversation that went well. The assistant helped you — end politely. You can still be firm later if the answer is negative.",
                 ne: "व्यंग्य गरेर बिदा हुँदा राम्रो भएको कुराकानी बिग्रन्छ। कर्मचारीले सहयोग गर्नुभयो — नम्र भएर टुंग्याउनुहोस्। जवाफ नकारात्मक आए पछि पनि दृढ हुन सकिन्छ।" } },
        { pl: "Tak, proszę mi teraz oddać pieniądze.", en: "Yes, please give me my money back now.", ne: "हो, अहिले नै मेरो पैसा फिर्ता दिनुहोस्।", ok: false,
          why: { en: "You have just agreed to the complaint procedure and the 14-day answer. Asking for money now contradicts that. Wait for the answer and keep the complaint number.",
                 ne: "तपाईंले भर्खरै उजुरी प्रक्रिया र १४ दिनमा जवाफ आउने कुरामा सहमति जनाउनुभयो। अहिले पैसा माग्नु त्यसको विपरीत हो। जवाफ पर्खनुहोस् र उजुरी नम्बर राख्नुहोस्।" } }
      ]
    }
  ],
  end: {
    en: "Excellent! You made a complaint calmly and firmly, said exactly what you wanted and got a dated copy with a complaint number. That is how complaints work best in Poland.",
    ne: "उत्कृष्ट! तपाईंले शान्त र दृढ भएर उजुरी गर्नुभयो, ठ्याक्कै के चाहिन्छ भन्नुभयो र उजुरी नम्बरसहितको मिति भएको प्रतिलिपि पाउनुभयो। पोल्यान्डमा उजुरी यसरी नै राम्रोसँग काम गर्छ।"
  },
  useful: [
    ["chciałbym złożyć reklamację", "I'd like to make a complaint (m)", "म उजुरी दर्ता गर्न चाहन्छु (पुरुष)", "HCHAW-bim ZWO-zhich re-kla-MATS-yeh", "ˈह्चाव्-बिम् ˈज़्वो-झिच् रे-क्ला-ˈमात्स्-ये"],
    ["sam się wyłącza", "it switches itself off", "आफैं बन्द हुन्छ", "sam sheh vi-WON-cha", "साम् शे भि-ˈवों-चा"],
    ["paragon", "receipt", "रसिद", "pa-RA-gon", "पा-ˈरा-गोन्"],
    ["wymiana na nowy", "replacement with a new one", "नयाँसँग साट्ने", "vi-MYA-na na NO-vi", "भि-ˈम्या-ना ना ˈनो-भि"],
    ["zwrot pieniędzy", "refund", "पैसा फिर्ता", "zvrot pye-NYEN-dzi", "ज़्भ्रोत् प्ये-ˈन्येन्-द्ज़ि"],
    ["opis usterki", "description of the fault", "खराबीको विवरण", "O-pees oos-TER-kee", "ˈओ-पिस् उस्-ˈतेर्-कि"],
    ["proszę o kopię z pieczątką", "please give me a stamped copy", "छाप लगाएको प्रतिलिपि दिनुहोस्", "PRO-sheh o KO-pyeh s pye-CHONT-kon", "ˈप्रो-शे ओ ˈको-प्ये स् प्ये-ˈचोंत्-कों"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b2-police",
  level: "B2",
  title: "A police check on the street",
  titleNe: "सडकमा प्रहरी जाँच",
  scene: {
    en: "It's late evening. You are cycling home from your shift when a police patrol stops you. Your rear light isn't working. Stay calm and polite and answer clearly.",
    ne: "राति ढिलो भएको छ। तपाईं सिफ्ट सकेर साइकलमा घर फर्कंदै हुनुहुन्छ, प्रहरी गस्तीले तपाईंलाई रोक्छ। तपाईंको पछाडिको बत्ती चलेको छैन। शान्त र नम्र रहनुहोस् र स्पष्ट जवाफ दिनुहोस्।"
  },
  them: "Policjant",
  themEn: "Police officer",
  themNe: "प्रहरी",
  steps: [
    {
      them: ["Dobry wieczór. Sierżant Nowicki, policja. Zatrzymałem Pana do kontroli.", "Good evening. Sergeant Nowicki, police. I've stopped you for a check.", "शुभ साँझ। सार्जेन्ट नोभित्स्की, प्रहरी। मैले तपाईंलाई जाँचका लागि रोकेँ।"],
      replies: [
        { pl: "Dobry wieczór. Rozumiem. Czy coś się stało?", en: "Good evening. I understand. Has something happened?", ne: "शुभ साँझ। बुझें। केही भयो?", ok: true },
        { pl: "Ja nic nie zrobiłem! Muszę jechać do domu.", en: "I haven't done anything! I have to get home.", ne: "मैले केही गरेको छैन! मलाई घर जानुपर्छ।", ok: false,
          why: { en: "A check is routine — nobody has accused you. Getting upset only makes it longer. Greet the officer and listen: *Dobry wieczór. W czym problem?*",
                 ne: "जाँच सामान्य कुरा हो — कसैले तपाईंलाई दोष लगाएको छैन। आत्तिँदा झन् लामो हुन्छ। प्रहरीलाई अभिवादन गरेर सुन्नुहोस्: *Dobry wieczór. W czym problem?*" } },
        { pl: "Cześć, o co chodzi?", en: "Hi, what's up?", ne: "हाई, के भयो?", ok: false,
          why: { en: "*Cześć* is for friends. With the police always use *Dobry wieczór / Dzień dobry* and *Pan/Pani*.",
                 ne: "*Cześć* साथीहरूका लागि हो। प्रहरीसँग सधैं *Dobry wieczór / Dzień dobry* र *Pan/Pani* प्रयोग गर्नुहोस्।" } }
      ]
    },
    {
      them: ["Nie działa Panu tylne światło. Po zmroku jest obowiązkowe. Poproszę dokument tożsamości.", "Your rear light isn't working. After dark it's compulsory. Your ID document, please.", "तपाईंको पछाडिको बत्ती चलेको छैन। अँध्यारो भएपछि यो अनिवार्य हुन्छ। परिचय पत्र दिनुहोस्।"],
      replies: [
        { pl: "Przepraszam, nie zauważyłem. Proszę, oto moja karta pobytu.", en: "Sorry, I didn't notice. Here is my residence card.", ne: "माफ गर्नुहोस्, मैले याद गरिनँ। लिनुहोस्, यो मेरो बसोबास कार्ड।", ok: true },
        { pl: "Naprawdę? Rano jeszcze działało. Proszę, tu jest mój paszport.", en: "Really? It was still working this morning. Here's my passport.", ne: "साँच्चै? बिहानसम्म त चलेको थियो। लिनुहोस्, यो मेरो राहदानी।", ok: true },
        { pl: "Przepraszam, nie zauważyłem. Proszę, oto mój karta pobytu.", en: "(wrong gender)", ne: "(गलत लिङ्ग)", ok: false,
          why: { en: "*Karta* is feminine, so 'my' is *moja*: *moja karta pobytu*. *Mój* goes with masculine nouns: *mój paszport*.",
                 ne: "*Karta* स्त्रीलिङ्ग हो, त्यसैले 'मेरो' = *moja*: *moja karta pobytu*। *Mój* पुल्लिङ्ग नामसँग: *mój paszport*।" } }
      ]
    },
    {
      them: ["Dziękuję. Gdzie Pan mieszka i dokąd Pan jedzie?", "Thank you. Where do you live and where are you going?", "धन्यवाद। तपाईं कहाँ बस्नुहुन्छ र कता जाँदै हुनुहुन्छ?"],
      replies: [
        { pl: "Mieszkam niedaleko, na ulicy Kościuszki. Wracam z pracy do domu.", en: "I live nearby, on Kościuszki Street. I'm going home from work.", ne: "म नजिकै, कोश्चुश्की सडकमा बस्छु। कामबाट घर फर्कंदैछु।", ok: true },
        { pl: "Mieszkam na ulicy Kościuszki. Jadę z pracy w domu.", en: "(wrong preposition)", ne: "(गलत पूर्वसर्ग)", ok: false,
          why: { en: "Direction 'to' is *do* + genitive: *jadę do domu*. *W domu* means 'at home' (place, not direction): *jestem w domu*.",
                 ne: "दिशा ('तर्फ/सम्म') = *do* + षष्ठी: *jadę do domu*। *W domu* को अर्थ 'घरमा' (ठाउँ, दिशा होइन): *jestem w domu*।" } },
        { pl: "Dlaczego Pan pyta? To moja prywatna sprawa.", en: "Why are you asking? That's my private business.", ne: "किन सोध्नुहुन्छ? यो मेरो निजी कुरा हो।", ok: false,
          why: { en: "In a calm routine check, short and polite answers end things fastest. A defensive tone makes the officer more careful, not less.",
                 ne: "शान्त सामान्य जाँचमा छोटो र नम्र जवाफले काम छिटो सकिन्छ। रक्षात्मक स्वरले प्रहरीलाई झन् सतर्क बनाउँछ।" } }
      ]
    },
    {
      them: ["Gdzie Pan pracuje?", "Where do you work?", "तपाईं कहाँ काम गर्नुहुन्छ?"],
      replies: [
        { pl: "W magazynie firmy kurierskiej. Dzisiaj miałem drugą zmianę, do dwudziestej drugiej.", en: "In a courier company's warehouse. Today I had the second shift, until ten p.m.", ne: "एउटा कुरियर कम्पनीको गोदाममा। आज मेरो दोस्रो सिफ्ट थियो, राति दस बजेसम्म।", ok: true },
        { pl: "Pracuję w magazynie. Mam przy sobie identyfikator z pracy, jeśli trzeba.", en: "I work in a warehouse. I have my work ID badge with me, if needed.", ne: "म गोदाममा काम गर्छु। चाहिए भने मसँग कामको परिचय कार्ड छ।", ok: true },
        { pl: "W magazynie. Pracuję na druga zmiana.", en: "(wrong case after 'na')", ne: "(*na* पछि गलत विभक्ति)", ok: false,
          why: { en: "After *na* the shift can't stay in the basic form. Say *pracuję na drugiej zmianie* (locative: I'm on the second shift) or *pracuję na drugą zmianę* (accusative) — both are heard.",
                 ne: "*na* पछि सिफ्ट मूल रूपमा रहन सक्दैन। *pracuję na drugiej zmianie* (अधिकरण: दोस्रो सिफ्टमा छु) वा *pracuję na drugą zmianę* (द्वितीया) भन्नुहोस् — दुवै सुनिन्छन्।" } }
      ]
    },
    {
      them: ["Dobrze. Czy pił Pan dzisiaj alkohol?", "All right. Have you drunk any alcohol today?", "ठीक छ। आज तपाईंले रक्सी पिउनुभयो?"],
      replies: [
        { pl: "Nie, nie piłem. Jadę prosto z pracy.", en: "No, I haven't. I'm coming straight from work.", ne: "होइन, पिइनँ। म सिधै कामबाट आउँदैछु।", ok: true },
        { pl: "Nie, nie piję alkohol.", en: "(wrong form after 'nie')", ne: "(*nie* पछि गलत रूप)", ok: false,
          why: { en: "After a negative verb the object is genitive: *nie piję alkoholu*. Also notice the tense: he asked about today, so *nie piłem* fits best.",
                 ne: "नकारात्मक क्रियापछि कर्म षष्ठीमा: *nie piję alkoholu*। कालमा पनि ध्यान दिनुहोस्: उहाँले आजको कुरा सोध्नुभयो, त्यसैले *nie piłem* सबैभन्दा मिल्छ।" } },
        { pl: "Tak, piłem dzisiaj dużo wody.", en: "Yes, I drank a lot of water today.", ne: "हो, आज मैले धेरै पानी पिएँ।", ok: false,
          why: { en: "Jokes with the police can easily be misunderstood, especially in a second language. Answer the question directly: *Nie, nie piłem alkoholu.*",
                 ne: "प्रहरीसँग ठट्टा सजिलै गलत बुझिन सक्छ, त्यो पनि दोस्रो भाषामा। प्रश्नको सिधा जवाफ दिनुहोस्: *Nie, nie piłem alkoholu.*" } }
      ]
    },
    {
      them: ["Proszę dmuchnąć w alkomat. Długo i równo, aż usłyszy Pan sygnał.", "Please blow into the breathalyser. Long and steady, until you hear a beep.", "अल्कोमिटरमा फुक्नुहोस्। लामो र एकनास, बिप सुन्नुहुन्जेल।"],
      replies: [
        { pl: "Dobrze. Czy tak wystarczy?", en: "OK. Is that enough?", ne: "हुन्छ। यति भयो?", ok: true },
        { pl: "Przepraszam, nie zrozumiałem. Mam dmuchać długo czy krótko?", en: "Sorry, I didn't understand. Should I blow long or short?", ne: "माफ गर्नुहोस्, मैले बुझिनँ। लामो फुक्ने कि छोटो?", ok: true },
        { pl: "Dobrze, ale możesz mi pokazać, jak?", en: "OK, but can you (informal) show me how?", ne: "हुन्छ, तर कसरी हो देखाइदिन सक्छौ?", ok: false,
          why: { en: "Never use *ty* with a police officer. Say *Czy może Pan pokazać, jak?* — with *Pan* the verb is 3rd person (*może*, not *możesz*).",
                 ne: "प्रहरीसँग कहिल्यै *ty* प्रयोग नगर्नुहोस्। *Czy może Pan pokazać, jak?* भन्नुहोस् — *Pan* सँग क्रिया तृतीय पुरुषमा हुन्छ (*może*, *możesz* होइन)।" } }
      ]
    },
    {
      them: ["Zero promili, w porządku. Za brak oświetlenia mógłbym dać mandat, ale tym razem skończy się na pouczeniu.", "Zero per mille, fine. For having no light I could give you a fine, but this time it will end with a warning.", "शून्य प्रोमिल, ठीक छ। बत्ती नभएकोमा म जरिवाना गर्न सक्थें, तर यस पटक चेतावनीमै टुंगिन्छ।"],
      replies: [
        { pl: "Dziękuję bardzo. Jutro rano kupię nową lampkę.", en: "Thank you very much. Tomorrow morning I'll buy a new light.", ne: "धेरै धन्यवाद। भोलि बिहान नयाँ बत्ती किन्छु।", ok: true },
        { pl: "Dziękuję. Czyli muszę zapłacić mandat?", en: "Thank you. So I have to pay a fine?", ne: "धन्यवाद। मतलब मैले जरिवाना तिर्नुपर्छ?", ok: false,
          why: { en: "*Mógłbym dać mandat* = I **could** give a fine (conditional) — *ale* (but) this time only *pouczenie*, a warning. No fine to pay.",
                 ne: "*Mógłbym dać mandat* = म जरिवाना गर्न **सक्थें** (सम्भावना) — *ale* (तर) यस पटक *pouczenie* मात्र, अर्थात् चेतावनी। जरिवाना तिर्नु पर्दैन।" } },
        { pl: "Dziękuję! Może zaproszę Pana na kawę?", en: "Thank you! Maybe I could buy you a coffee?", ne: "धन्यवाद! तपाईंलाई एक कप कफी खुवाऊँ?", ok: false,
          why: { en: "Offering anything to an officer during a check can look like a bribe (*łapówka*), which is a crime in Poland. A simple *dziękuję* is enough.",
                 ne: "जाँचको बेला प्रहरीलाई केही दिन खोज्दा घूस (*łapówka*) जस्तो देखिन सक्छ, जुन पोल्यान्डमा अपराध हो। *dziękuję* मात्र भने पुग्छ।" } }
      ]
    },
    {
      them: ["Dzisiaj proszę już nie jechać, tylko prowadzić rower. Oto Pana dokument.", "Tonight please don't ride any more — walk the bike. Here's your document.", "आज अब साइकल नचलाउनुहोस्, डोर्याएर लैजानुहोस्। यो तपाईंको कागजात।"],
      replies: [
        { pl: "Dobrze, poprowadzę rower do domu. Dziękuję, dobranoc.", en: "OK, I'll walk the bike home. Thank you, good night.", ne: "हुन्छ, म साइकल डोर्याएर घर लैजान्छु। धन्यवाद, शुभ रात्रि।", ok: true },
        { pl: "Dobrze, to szybko pojadę do domu.", en: "OK, then I'll ride home quickly.", ne: "हुन्छ, त्यसो भए म छिटो साइकल चलाएर घर जान्छु।", ok: false,
          why: { en: "*Prowadzić rower* means to walk beside the bike and push it — not ride it. *Jechać na rowerze* = to ride. He asked you not to ride.",
                 ne: "*Prowadzić rower* भनेको साइकलसँगै हिँडेर डोर्याउनु हो — चलाउनु होइन। *Jechać na rowerze* = चलाउनु। उहाँले नचलाउन भन्नुभयो।" } },
        { pl: "Dobrze, dziękuję. Dobry wieczór!", en: "OK, thank you. Good evening!", ne: "हुन्छ, धन्यवाद। शुभ साँझ!", ok: false,
          why: { en: "*Dobry wieczór* is a greeting when you **meet** someone. When leaving in the evening say *Do widzenia* or, late at night, *Dobranoc*.",
                 ne: "*Dobry wieczór* कसैलाई **भेट्दा** भन्ने अभिवादन हो। साँझ छुट्टिँदा *Do widzenia*, राति ढिलो भए *Dobranoc* भन्नुहोस्।" } }
      ]
    }
  ],
  end: {
    en: "Well done! You stayed calm, showed your document, answered clearly and politely and understood that it ended with only a warning. Polite, short answers are the best strategy in any check.",
    ne: "स्याबास! तपाईं शान्त रहनुभयो, कागजात देखाउनुभयो, स्पष्ट र नम्र जवाफ दिनुभयो र चेतावनीमै टुंगिएको बुझ्नुभयो। जुनसुकै जाँचमा नम्र र छोटो जवाफ नै उत्तम उपाय हो।"
  },
  useful: [
    ["zatrzymałem Pana do kontroli", "I've stopped you for a check", "मैले तपाईंलाई जाँचका लागि रोकेँ", "za-tshi-MA-wem PA-na do kon-TRO-lee", "ज़ा-त्शि-ˈमा-वेम् ˈपा-ना दो कोन्-ˈत्रो-लि"],
    ["oto moja karta pobytu", "here is my residence card", "यो मेरो बसोबास कार्ड हो", "O-to MO-ya KAR-ta po-BI-too", "ˈओ-तो ˈमो-या ˈकार्-ता पो-ˈबि-तु"],
    ["wracam z pracy do domu", "I'm going home from work", "म कामबाट घर फर्कंदैछु", "VRA-tsam s PRA-tsi do DO-moo", "ˈभ्रा-त्साम् स् ˈप्रा-त्सि दो ˈदो-मु"],
    ["dmuchnąć w alkomat", "to blow into the breathalyser", "अल्कोमिटरमा फुक्नु", "DMOOH-nonch v al-KO-mat", "ˈद्मुह्-नोंच् भ् आल्-ˈको-मात्"],
    ["mandat", "fine (penalty ticket)", "जरिवाना", "MAN-dat", "ˈमान्-दात्"],
    ["pouczenie", "(official) warning", "चेतावनी", "po-oo-CHE-nyeh", "पो-उ-ˈचे-न्ये"],
    ["prowadzić rower", "to walk (push) a bike", "साइकल डोर्याएर हिँड्नु", "pro-VA-jeech RO-ver", "प्रो-ˈभा-जिच् ˈरो-भेर्"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b2-contract",
  level: "B2",
  title: "Asking HR about two types of contract",
  titleNe: "दुई प्रकारका सम्झौताबारे HR सँग सोध्दै",
  scene: {
    en: "A company offers you either an *umowa o pracę* (employment contract) or an *umowa zlecenie* (civil-law contract of mandate). You ask Ms Joanna from HR to explain the difference. This practises the language only — for your own case, ask the labour inspectorate (*PIP*) or a lawyer.",
    ne: "एउटा कम्पनीले तपाईंलाई *umowa o pracę* (रोजगार सम्झौता) वा *umowa zlecenie* (नागरिक कानुनअन्तर्गतको करार) दिन्छु भनेको छ। तपाईं HR की योआना जीलाई फरक बुझाइदिन भन्नुहुन्छ। यो भाषा अभ्यास मात्र हो — आफ्नो मामलाका लागि श्रम निरीक्षण कार्यालय (*PIP*) वा वकिलसँग सोध्नुहोस्।"
  },
  them: "Pani Joanna",
  themEn: "Ms Joanna from HR",
  themNe: "योआना जी (HR)",
  steps: [
    {
      them: ["Dzień dobry, proszę wejść. Rozumiem, że ma Pan pytania dotyczące umowy?", "Hello, come in. I understand you have questions about the contract?", "नमस्ते, भित्र आउनुहोस्। तपाईंसँग सम्झौताबारे प्रश्न छन् भनेर बुझें?"],
      replies: [
        { pl: "Dzień dobry. Tak, dostałem dwie propozycje: umowę o pracę i umowę zlecenie. Nie do końca rozumiem różnicę.", en: "Hello. Yes, I got two offers: an employment contract and a contract of mandate. I don't fully understand the difference.", ne: "नमस्ते। हो, मलाई दुई प्रस्ताव आएका छन्: रोजगार सम्झौता र करार सम्झौता। मलाई फरक पूरै बुझिएको छैन।", ok: true },
        { pl: "Tak. Nie rozumiem różnica między tymi umowami.", en: "(wrong form after 'nie rozumiem')", ne: "(*nie rozumiem* पछि गलत रूप)", ok: false,
          why: { en: "After a negative verb the object goes into the genitive: *rozumiem różnicę* → *nie rozumiem różnicy*. (*Między* + instrumental is right: *między tymi umowami*.)",
                 ne: "नकारात्मक क्रियापछि कर्म षष्ठीमा जान्छ: *rozumiem różnicę* → *nie rozumiem różnicy*। (*Między* + तृतीया ठीक छ: *między tymi umowami*।)" } },
        { pl: "Tak, Joanna, wytłumacz mi to szybko.", en: "Yes, Joanna, explain it to me quickly.", ne: "हो, योआना, छिटो बुझाइदेऊ।", ok: false,
          why: { en: "A bare first name with *ty* is too familiar with someone you don't know well. Use *Pani* + the vocative of the name: *Pani Joanno, czy mogłaby Pani mi to wytłumaczyć?*",
                 ne: "राम्रोसँग नचिनेको मान्छेलाई *ty* र नाम मात्र भन्नु धेरै अनौपचारिक हो। *Pani* + नामको सम्बोधन रूप प्रयोग गर्नुहोस्: *Pani Joanno, czy mogłaby Pani mi to wytłumaczyć?*" } }
      ]
    },
    {
      them: ["Oczywiście. Umowa o pracę podlega Kodeksowi pracy. Ma Pan wtedy płatny urlop, płatne zwolnienie chorobowe i okres wypowiedzenia.", "Of course. An employment contract falls under the Labour Code. Then you have paid holiday, paid sick leave and a notice period.", "अवश्य। रोजगार सम्झौता श्रम संहिताअन्तर्गत पर्छ। त्यसमा तपाईंलाई तलबी बिदा, तलबी बिरामी बिदा र सूचना अवधि हुन्छ।"],
      replies: [
        { pl: "Czyli przy umowie o pracę mam prawo do płatnego urlopu?", en: "So with an employment contract I'm entitled to paid holiday?", ne: "मतलब रोजगार सम्झौतामा मलाई तलबी बिदाको अधिकार हुन्छ?", ok: true },
        { pl: "Przepraszam, co dokładnie znaczy okres wypowiedzenia?", en: "Sorry, what exactly does 'notice period' mean?", ne: "माफ गर्नुहोस्, सूचना अवधि भनेको ठ्याक्कै के हो?", ok: true },
        { pl: "Czyli mam prawo do płatny urlop?", en: "(wrong form after 'do')", ne: "(*do* पछि गलत रूप)", ok: false,
          why: { en: "*Prawo do* (the right to) takes the genitive: *prawo do płatnego urlopu*, *prawo do odpoczynku*. Both the adjective and the noun change.",
                 ne: "*Prawo do* (… को अधिकार) पछि षष्ठी आउँछ: *prawo do płatnego urlopu*, *prawo do odpoczynku*। विशेषण र नाम दुवै फेरिन्छन्।" } }
      ]
    },
    {
      them: ["Tak. Przy krótszym stażu to dwadzieścia dni urlopu w roku. A okres wypowiedzenia to czas między wypowiedzeniem umowy a ostatnim dniem pracy — na przykład dwa tygodnie albo miesiąc.", "Yes. With shorter work experience it's twenty days of holiday a year. And the notice period is the time between giving notice and the last day of work — for example two weeks or a month.", "हो। कम कार्यअनुभव भए वर्षमा बीस दिन बिदा हुन्छ। अनि सूचना अवधि भनेको सम्झौता अन्त्यको सूचना दिएदेखि कामको अन्तिम दिनसम्मको समय हो — जस्तै दुई हप्ता वा एक महिना।"],
      replies: [
        { pl: "Rozumiem. A jak to wygląda przy umowie zlecenie?", en: "I see. And how does it work with a contract of mandate?", ne: "बुझें। अनि करार सम्झौतामा कस्तो हुन्छ?", ok: true },
        { pl: "Rozumiem. Czyli mam dwadzieścia dni urlopu w miesiącu?", en: "I see. So I get twenty days of holiday a month?", ne: "बुझें। मतलब महिनामा बीस दिन बिदा हुन्छ?", ok: false,
          why: { en: "She said *w roku* — per **year**. *W miesiącu* = per month, *w tygodniu* = per week. Listen for these small time words.",
                 ne: "उहाँले *w roku* भन्नुभयो — **वर्ष**मा। *W miesiącu* = महिनामा, *w tygodniu* = हप्तामा। यस्ता साना समयका शब्दमा ध्यान दिनुहोस्।" } },
        { pl: "Rozumiem. A jak to wygląda przy umowa zlecenie?", en: "(wrong case after 'przy')", ne: "(*przy* पछि गलत विभक्ति)", ok: false,
          why: { en: "*Przy* takes the locative: *przy umowie*. In everyday speech *zlecenie* usually stays as it is, like a label: *przy umowie zlecenie*.",
                 ne: "*Przy* पछि अधिकरण आउँछ: *przy umowie*। दैनिक बोलीमा *zlecenie* प्रायः लेबलजस्तै उस्तै रहन्छ: *przy umowie zlecenie*।" } }
      ]
    },
    {
      them: ["Umowa zlecenie to umowa cywilnoprawna. Jest bardziej elastyczna, ale z mocy prawa nie daje płatnego urlopu. Obowiązuje za to minimalna stawka godzinowa.", "A contract of mandate is a civil-law contract. It's more flexible, but by law it gives no paid holiday. On the other hand, a minimum hourly rate applies.", "करार सम्झौता नागरिक कानुनअन्तर्गतको सम्झौता हो। यो बढी लचिलो हुन्छ, तर कानुनले यसमा तलबी बिदा दिँदैन। बरु न्यूनतम प्रतिघण्टा दर लागू हुन्छ।"],
      replies: [
        { pl: "A czy przy umowie zlecenie mam ubezpieczenie zdrowotne?", en: "And with a contract of mandate, do I have health insurance?", ne: "अनि करार सम्झौतामा मेरो स्वास्थ्य बीमा हुन्छ?", ok: true },
        { pl: "Czyli jeśli wezmę wolne na zleceniu, nie dostanę za te dni pieniędzy?", en: "So if I take time off on the mandate contract, I won't get paid for those days?", ne: "मतलब करार सम्झौतामा छुट्टी लिएँ भने ती दिनको पैसा पाउँदिनँ?", ok: true },
        { pl: "Czyli umowa zlecenie jest bardziej elastyczny?", en: "(wrong gender)", ne: "(गलत लिङ्ग)", ok: false,
          why: { en: "The main noun is *umowa* (feminine), so the adjective is *elastyczna*. In *umowa zlecenie*, *zlecenie* is just a label — agree with *umowa*.",
                 ne: "मुख्य नाम *umowa* (स्त्रीलिङ्ग) हो, त्यसैले विशेषण *elastyczna* हुन्छ। *umowa zlecenie* मा *zlecenie* लेबल मात्र हो — *umowa* सँग मिलाउनुहोस्।" } }
      ]
    },
    {
      them: ["Dobre pytanie. Ubezpieczenie zdrowotne zwykle jest w obu przypadkach, ale płatny urlop tylko na umowie o pracę. Na zleceniu za dni wolne po prostu nie ma wynagrodzenia.", "Good question. Health insurance is usually there in both cases, but paid holiday only with an employment contract. On a mandate contract there's simply no pay for days off.", "राम्रो प्रश्न। स्वास्थ्य बीमा सामान्यतया दुवैमा हुन्छ, तर तलबी बिदा रोजगार सम्झौतामा मात्र। करार सम्झौतामा छुट्टीका दिनको पारिश्रमिक हुँदैन।"],
      replies: [
        { pl: "Rozumiem. Czy mógłbym zabrać obie umowy do domu i spokojnie je przeczytać?", en: "I see. Could I take both contracts home and read them calmly?", ne: "बुझें। के म दुवै सम्झौता घर लगेर शान्तसँग पढ्न सक्छु?", ok: true },
        { pl: "Dziękuję, teraz jest jaśniej. Czy mogę się zastanowić do jutra?", en: "Thank you, it's clearer now. May I think about it until tomorrow?", ne: "धन्यवाद, अब बढी स्पष्ट भयो। के म भोलिसम्म सोच्न सक्छु?", ok: true },
        { pl: "Czy mógłbym zabrać oba umowy do domu?", en: "(wrong form of 'both')", ne: "('दुवै' को गलत रूप)", ok: false,
          why: { en: "'Both' has gender: *obie* for feminine nouns (*obie umowy*), *oba* for masculine and neuter (*oba dokumenty*), *obaj* for two men (*obaj koledzy*).",
                 ne: "'दुवै' को पनि लिङ्ग हुन्छ: स्त्रीलिङ्गमा *obie* (*obie umowy*), पुल्लिङ्ग र नपुंसकलिङ्गमा *oba* (*oba dokumenty*), दुई पुरुषका लागि *obaj* (*obaj koledzy*)।" } }
      ]
    },
    {
      them: ["Oczywiście. Proszę mi dać znać do środy, którą umowę Pan wybiera. Jeśli coś będzie niejasne, proszę pytać.", "Of course. Please let me know by Wednesday which contract you choose. If anything is unclear, please ask.", "अवश्य। कुन सम्झौता रोज्नुहुन्छ, बुधबारसम्म मलाई खबर गर्नुहोस्। केही अस्पष्ट भए सोध्नुहोस्।"],
      replies: [
        { pl: "Dobrze, odezwę się najpóźniej w środę.", en: "OK, I'll get back to you on Wednesday at the latest.", ne: "हुन्छ, म बढीमा बुधबारसम्म खबर गर्छु।", ok: true },
        { pl: "Dobrze, odezwę się najpóźniej w środa.", en: "(wrong case after 'w')", ne: "(*w* पछि गलत विभक्ति)", ok: false,
          why: { en: "With days of the week, *w* takes the accusative: *w środę*, *w sobotę*, *w poniedziałek*. Feminine *-a* becomes *-ę*.",
                 ne: "हप्ताका दिनसँग *w* पछि द्वितीया आउँछ: *w środę*, *w sobotę*, *w poniedziałek*। स्त्रीलिङ्ग *-a* *-ę* हुन्छ।" } },
        { pl: "Nie trzeba, podpiszę od razu. Nie czytałem, ale ufam Pani.", en: "No need, I'll sign straight away. I haven't read it, but I trust you.", ne: "पर्दैन, म अहिल्यै हस्ताक्षर गर्छु। पढेको छैन, तर तपाईंलाई विश्वास गर्छु।", ok: false,
          why: { en: "Never sign a contract you haven't read and understood, however friendly the person is. Taking time to read is normal and nobody will be offended.",
                 ne: "मान्छे जति नै मिलनसार भए पनि नपढेको र नबुझेको सम्झौतामा कहिल्यै हस्ताक्षर नगर्नुहोस्। पढ्न समय लिनु सामान्य कुरा हो, कसैलाई नराम्रो लाग्दैन।" } }
      ]
    },
    {
      them: ["Czy chciałby Pan jeszcze coś wiedzieć?", "Is there anything else you'd like to know?", "अरू केही जान्न चाहनुहुन्छ?"],
      replies: [
        { pl: "Tak, jeszcze jedno: czy umowa o pracę jest najpierw na okres próbny?", en: "Yes, one more thing: is the employment contract first for a trial period?", ne: "हो, अर्को एउटा कुरा: रोजगार सम्झौता सुरुमा परीक्षण अवधिका लागि हुन्छ?", ok: true },
        { pl: "Nie, na razie to wszystko. Bardzo dziękuję za cierpliwość.", en: "No, that's all for now. Thank you very much for your patience.", ne: "छैन, अहिलेलाई यति नै। धैर्यका लागि धेरै धन्यवाद।", ok: true },
        { pl: "Tak, mam jeszcze jeden pytanie.", en: "(wrong gender)", ne: "(गलत लिङ्ग)", ok: false,
          why: { en: "*Pytanie* ends in *-e*, so it is neuter: *jedno pytanie*. (*jeden* is masculine: *jeden problem*; *jedna* is feminine: *jedna sprawa*.)",
                 ne: "*Pytanie* *-e* मा टुंगिन्छ, त्यसैले नपुंसकलिङ्ग हो: *jedno pytanie*। (*jeden* पुल्लिङ्ग: *jeden problem*; *jedna* स्त्रीलिङ्ग: *jedna sprawa*।)" } }
      ]
    },
    {
      them: ["Dla jasności: u nas umowa o pracę zaczyna się zwykle od trzymiesięcznego okresu próbnego. W razie pytań jestem w pokoju dwieście trzy.", "To be clear: here an employment contract usually starts with a three-month trial period. If you have questions, I'm in room 203.", "स्पष्ट पार्न: हाम्रोमा रोजगार सम्झौता सामान्यतया तीन महिनाको परीक्षण अवधिबाट सुरु हुन्छ। प्रश्न भए म कोठा नम्बर २०३ मा हुन्छु।"],
      replies: [
        { pl: "Dziękuję, Pani Joanno. Do widzenia.", en: "Thank you, Ms Joanna. Goodbye.", ne: "धन्यवाद, योआना जी। नमस्ते।", ok: true },
        { pl: "Dziękuję, Pani Joanna. Do widzenia.", en: "(wrong form when addressing her)", ne: "(सम्बोधनको गलत रूप)", ok: false,
          why: { en: "Speaking directly to someone, use the vocative: *Joanna* → *Pani Joanno*, *Kasia* → *Kasiu*, *Marek* → *Panie Marku*. Using the basic form sounds clumsy.",
                 ne: "कसैलाई सिधै बोलाउँदा सम्बोधन रूप प्रयोग गर्नुहोस्: *Joanna* → *Pani Joanno*, *Kasia* → *Kasiu*, *Marek* → *Panie Marku*। मूल रूप भन्दा अप्ठ्यारो सुनिन्छ।" } },
        { pl: "Czyli po trzech miesiącach muszę odejść z firmy?", en: "So after three months I have to leave the company?", ne: "मतलब तीन महिनापछि मैले कम्पनी छोड्नुपर्छ?", ok: false,
          why: { en: "*Okres próbny* is a trial period at the **start**, not the end of the job. If you want to know what comes after it, ask: *A co po okresie próbnym?*",
                 ne: "*Okres próbny* कामको **सुरु**को परीक्षण अवधि हो, कामको अन्त्य होइन। त्यसपछि के हुन्छ जान्न चाहे सोध्नुहोस्: *A co po okresie próbnym?*" } }
      ]
    }
  ],
  end: {
    en: "Excellent! You asked HR clear questions about holiday, notice period and insurance, checked what you didn't understand and took time to read before signing.",
    ne: "उत्कृष्ट! तपाईंले HR लाई बिदा, सूचना अवधि र बीमाबारे स्पष्ट प्रश्न सोध्नुभयो, नबुझेको कुरा जाँच्नुभयो र हस्ताक्षर गर्नुअघि पढ्न समय लिनुभयो।"
  },
  useful: [
    ["umowa o pracę", "employment contract", "रोजगार सम्झौता", "oo-MO-va o PRA-tseh", "उ-ˈमो-भा ओ ˈप्रा-त्से"],
    ["umowa zlecenie", "contract of mandate (civil-law contract)", "करार सम्झौता (नागरिक कानुनअन्तर्गत)", "oo-MO-va zle-TSE-nyeh", "उ-ˈमो-भा ज़्ले-ˈत्से-न्ये"],
    ["płatny urlop", "paid holiday", "तलबी बिदा", "PWAT-ni OOR-lop", "ˈप्वात्-नि ˈउर्-लोप्"],
    ["okres wypowiedzenia", "notice period", "सूचना अवधि", "O-kres vi-po-vye-DZE-nya", "ˈओ-क्रेस् भि-पो-भ्ये-ˈद्ज़े-न्या"],
    ["okres próbny", "trial period", "परीक्षण अवधि", "O-kres PROOB-ni", "ˈओ-क्रेस् ˈप्रुब्-नि"],
    ["minimalna stawka godzinowa", "minimum hourly rate", "न्यूनतम प्रतिघण्टा दर", "mee-nee-MAL-na STAF-ka go-jee-NO-va", "मि-नि-ˈमाल्-ना ˈस्ताफ्-का गो-जि-ˈनो-भा"],
    ["czy mógłbym zabrać obie umowy do domu?", "could I take both contracts home?", "के म दुवै सम्झौता घर लैजान सक्छु?", "chi MOOG-bim ZA-brach O-bye oo-MO-vi do DO-moo", "चि ˈमुग्-बिम् ˈज़ा-ब्राच् ˈओ-ब्ये उ-ˈमो-भि दो ˈदो-मु"]
  ]
});

window.SLOWKA_ROLEPLAYS.push({
  id: "rp-b2-smalltalk",
  level: "B2",
  title: "Lunch break small talk",
  titleNe: "खाजा बिदामा गफगाफ",
  scene: {
    en: "Lunch break in the canteen. Your coworker Kasia, whom you have known for months, invites you to sit with her. Between coworkers *ty* is normal — here sounding too formal is the mistake.",
    ne: "क्यान्टिनमा खाजा बिदा। महिनौंदेखि चिनेकी सहकर्मी कासियाले तपाईंलाई आफूसँग बस्न बोलाउँछिन्। सहकर्मीहरूबीच *ty* सामान्य हो — यहाँ धेरै औपचारिक सुनिनु नै गल्ती हो।"
  },
  them: "Kasia",
  themEn: "Kasia, a coworker",
  themNe: "कासिया, सहकर्मी",
  steps: [
    {
      them: ["Hej! Siadaj z nami. Jak minął weekend?", "Hey! Sit with us. How was your weekend?", "हे! हामीसँग बस। सप्ताहान्त कस्तो बित्यो?"],
      replies: [
        { pl: "Dzięki! Całkiem nieźle. W sobotę byłem z kolegami nad jeziorem, a w niedzielę odpoczywałem.", en: "Thanks! Pretty good. On Saturday I was at a lake with friends, and on Sunday I rested.", ne: "धन्यवाद! निकै राम्रो। शनिबार साथीहरूसँग तालमा गएँ, आइतबार आराम गरें।", ok: true },
        { pl: "Dziękuję, proszę Pani. Weekend minął mi dobrze.", en: "Thank you, madam. My weekend went well.", ne: "धन्यवाद, हजुर। मेरो सप्ताहान्त राम्रो बित्यो।", ok: false,
          why: { en: "Kasia uses *ty* and *hej* with you, so *proszę Pani* sounds cold and strange. Mirror the other person: if they use *ty*, answer with *ty*.",
                 ne: "कासियाले तपाईंसँग *ty* र *hej* प्रयोग गर्छिन्, त्यसैले *proszę Pani* चिसो र अनौठो सुनिन्छ। अर्को व्यक्तिलाई पछ्याउनुहोस्: उनी *ty* भन्छिन् भने तपाईं पनि *ty*।" } },
        { pl: "Dzięki! W sobotę byłem z kolegami nad jezioro.", en: "(wrong case after 'nad')", ne: "(*nad* पछि गलत विभक्ति)", ok: false,
          why: { en: "For a place, *nad* (by, on the shore of) takes the instrumental: *nad jeziorem*, *nad morzem*. With movement it takes the accusative: *jadę nad jezioro*.",
                 ne: "ठाउँ जनाउँदा *nad* (को किनारमा) पछि तृतीया आउँछ: *nad jeziorem*, *nad morzem*। गति जनाउँदा द्वितीया: *jadę nad jezioro*।" } }
      ]
    },
    {
      them: ["O, super. Ja byłam w górach, ale cały czas padało.", "Oh, great. I was in the mountains, but it rained the whole time.", "ओहो, राम्रो। म पहाडतिर गएकी थिएँ, तर पूरै समय पानी पर्‍यो।"],
      replies: [
        { pl: "Szkoda, że miałaś pecha z pogodą! W jakich górach byłaś?", en: "Too bad you were unlucky with the weather! Which mountains were you in?", ne: "मौसमले साथ नदिएकोमा दुःख लाग्यो! कुन पहाडमा गएकी थियौ?", ok: true },
        { pl: "Szkoda! A gdzie byłeś w górach?", en: "(wrong gender of the verb)", ne: "(क्रियाको गलत लिङ्ग)", ok: false,
          why: { en: "Kasia is a woman — she said *byłam*. Talking to her, the past tense is *byłaś* (to a man: *byłeś*). Polish past tense always shows gender.",
                 ne: "कासिया महिला हुन् — उनले *byłam* भनिन्। उनलाई भन्दा भूतकाल *byłaś* हुन्छ (पुरुषलाई: *byłeś*)। पोलिश भूतकालले सधैं लिङ्ग देखाउँछ।" } },
        { pl: "Szkoda. U nas na szczęście było słonecznie. A w jakich górach byłaś?", en: "Pity. Where we were it was luckily sunny. And which mountains were you in?", ne: "दुःखको कुरा। हामीतिर भने भाग्यवश घमाइलो थियो। अनि तिमी कुन पहाडमा गएकी थियौ?", ok: true }
      ]
    },
    {
      them: ["W Bieszczadach. Ale ty pewnie śmiejesz się z naszych gór — w Nepalu macie Himalaje!", "In the Bieszczady. But you probably laugh at our mountains — in Nepal you have the Himalayas!", "बिएश्चादीमा। तर तिमी त हाम्रा पहाडलाई हाँस्छौ होला — नेपालमा त हिमालय छ!"],
      replies: [
        { pl: "Nie no, wasze góry też mi się podobają. Chociaż przyznaję, że Himalaje to inna liga.", en: "No way, I like your mountains too. Although I admit the Himalayas are in a different league.", ne: "होइन, तिमीहरूका पहाड पनि मलाई मन पर्छन्। तर मान्नैपर्छ, हिमालय त अर्कै स्तरको हो।", ok: true },
        { pl: "Ha, ha, trochę tak! Ale Bieszczady są piękne, byłem tam w zeszłym roku.", en: "Ha ha, a bit! But the Bieszczady are beautiful, I was there last year.", ne: "हाहा, अलिअलि! तर बिएश्चादी सुन्दर छ, म गत वर्ष त्यहाँ गएको थिएँ।", ok: true },
        { pl: "Tak, nasze góry są wyższe niż wasz.", en: "(wrong form of 'yours')", ne: "('तिमीहरूको' को गलत रूप)", ok: false,
          why: { en: "*Góry* is plural (and not about men), so 'yours' must agree: *wasze*. *Nasze góry są wyższe niż wasze.* (And a little joke is fine — but be kind about her country.)",
                 ne: "*Góry* बहुवचन हो (पुरुषबारे होइन), त्यसैले 'तिमीहरूको' मिल्नुपर्छ: *wasze*। *Nasze góry są wyższe niż wasze.* (सानो ठट्टा ठीक छ — तर उनको देशबारे दयालु हुनुहोस्।)" } }
      ]
    },
    {
      them: ["A co jecie w Nepalu na co dzień? Bo ty zawsze masz w pudełku coś pachnącego.", "And what do you eat in Nepal every day? Because you always have something that smells great in your lunchbox.", "अनि नेपालमा दैनिक के खान्छौ? किनभने तिम्रो टिफिनमा सधैं केही मीठो बास्ना आउने कुरा हुन्छ।"],
      replies: [
        { pl: "Najczęściej dal bhat, czyli ryż z soczewicą i warzywami. Jemy to nawet dwa razy dziennie.", en: "Mostly dal bhat — rice with lentils and vegetables. We eat it even twice a day.", ne: "प्रायः दालभात — चामल, दाल र तरकारी। हामी यो दिनको दुई पटकसम्म खान्छौं।", ok: true },
        { pl: "Najczęściej ryż z soczewica i warzywa.", en: "(wrong case after 'z')", ne: "(*z* पछि गलत विभक्ति)", ok: false,
          why: { en: "*Z* meaning 'with' takes the instrumental: *z soczewicą*, *z warzywami*, *z mlekiem*. (*Z* meaning 'from' takes the genitive: *z Nepalu*.)",
                 ne: "'सँग/सहित' अर्थको *z* पछि तृतीया आउँछ: *z soczewicą*, *z warzywami*, *z mlekiem*। ('बाट' अर्थको *z* पछि षष्ठी: *z Nepalu*।)" } },
        { pl: "Dziękuję, ja już jadłem.", en: "Thanks, I've already eaten.", ne: "धन्यवाद, मैले खाइसकें।", ok: false,
          why: { en: "She isn't offering you food — she asked **what you eat** in Nepal (*co jecie*). Listen to the question word: *co* = what.",
                 ne: "उनले खाना दिन खोजेकी होइनन् — नेपालमा **के खान्छौ** भनेर सोधेकी हुन् (*co jecie*)। प्रश्नवाचक शब्दमा ध्यान दिनुहोस्: *co* = के।" } }
      ]
    },
    {
      them: ["Dwa razy dziennie to samo? Nie nudzi wam się?", "The same thing twice a day? Don't you get bored?", "दिनको दुई पटक एउटै कुरा? दिक्क लाग्दैन?"],
      replies: [
        { pl: "Wcale! Każdy dal smakuje trochę inaczej. Jak chcesz, jutro przyniosę ci trochę do spróbowania.", en: "Not at all! Every dal tastes a bit different. If you like, tomorrow I'll bring you some to try.", ne: "पटक्कै लाग्दैन! हरेक दालको स्वाद अलि फरक हुन्छ। चाहन्छ्यौ भने भोलि चाख्नका लागि अलिकति ल्याइदिन्छु।", ok: true },
        { pl: "Wcale! Jak chcesz, jutro przyniosę cię trochę.", en: "(wrong pronoun: 'I'll bring you' as an object)", ne: "(गलत सर्वनाम)", ok: false,
          why: { en: "'To you' is dative: *ci*. *Cię* is accusative ('you' as the object), so *przyniosę cię* means 'I'll carry you in'! Compare: *dam ci*, *powiem ci* vs *widzę cię*, *kocham cię*.",
                 ne: "'तिमीलाई (दिनका लागि)' सम्प्रदान हो: *ci*। *Cię* द्वितीया हो ('तिमीलाई' कर्मको रूपमा), त्यसैले *przyniosę cię* को अर्थ 'म तिमीलाई बोकेर ल्याउँछु' हुन्छ! तुलना: *dam ci*, *powiem ci* बनाम *widzę cię*, *kocham cię*।" } },
        { pl: "Wcale! Jak Pani chce, przyniosę Pani jutro trochę.", en: "Not at all! If you (formal) like, I'll bring you some tomorrow.", ne: "पटक्कै होइन! हजुरलाई चाहिन्छ भने भोलि अलिकति ल्याइदिन्छु।", ok: false,
          why: { en: "You've been using *ty* with Kasia — switching back to *Pani* suddenly sounds distant, as if you were offended. Keep *ty*: *Jak chcesz, przyniosę ci.*",
                 ne: "तपाईं कासियासँग *ty* बोल्दै हुनुहुन्थ्यो — अचानक *Pani* मा फर्कँदा टाढिएको, रिसाएको जस्तो सुनिन्छ। *ty* नै राख्नुहोस्: *Jak chcesz, przyniosę ci.*" } }
      ]
    },
    {
      them: ["Chętnie! A jak tam z polskim jedzeniem? Masz już swoje ulubione danie?", "I'd love that! And how about Polish food? Do you have a favourite dish yet?", "पक्कै! अनि पोलिश खाना कस्तो लाग्छ? तिम्रो मनपर्ने परिकार भइसक्यो?"],
      replies: [
        { pl: "Uwielbiam pierogi ruskie. Ale bigosu chyba nigdy nie polubię.", en: "I love pierogi ruskie. But I'll probably never get to like bigos.", ne: "मलाई पिएरोगी रुस्किए असाध्यै मन पर्छ। तर बिगोस चाहिँ सायद कहिल्यै मन पराउन सक्दिनँ।", ok: true },
        { pl: "Bardzo lubię żurek, zwłaszcza zimą. Jest trochę kwaśny, ale pyszny.", en: "I really like żurek, especially in winter. It's a bit sour, but delicious.", ne: "मलाई झुरेक धेरै मन पर्छ, खास गरी जाडोमा। अलि अमिलो हुन्छ, तर मीठो।", ok: true },
        { pl: "Uwielbiam pierogi, ale nie lubię bigos.", en: "(wrong form after 'nie lubię')", ne: "(*nie lubię* पछि गलत रूप)", ok: false,
          why: { en: "Negation again: *lubię bigos* → *nie lubię bigosu* (genitive). It's normal to keep making this mistake for a while — keep listening for it.",
                 ne: "फेरि नकारात्मक नियम: *lubię bigos* → *nie lubię bigosu* (षष्ठी)। यो गल्ती केही समय भइरहनु सामान्य हो — सुन्दै अभ्यास गरिरहनुहोस्।" } }
      ]
    },
    {
      them: ["A na święta jedziesz do Nepalu czy zostajesz w Polsce?", "And for Christmas, are you going to Nepal or staying in Poland?", "अनि क्रिसमसमा नेपाल जान्छौ कि पोल्यान्डमै बस्छौ?"],
      replies: [
        { pl: "W tym roku zostaję. Bilety są strasznie drogie, a nasze najważniejsze święto, Dashain, i tak jest jesienią.", en: "This year I'm staying. Tickets are terribly expensive, and our most important festival, Dashain, is in autumn anyway.", ne: "यस वर्ष यहीँ बस्छु। टिकट असाध्यै महँगो छ, अनि हाम्रो सबैभन्दा ठूलो चाड दशैं त शरद ऋतुमै पर्छ।", ok: true },
        { pl: "W tym roku zostaję, bo bilety są strasznie drogi.", en: "(wrong adjective ending)", ne: "(विशेषणको गलत अन्त्य)", ok: false,
          why: { en: "*Bilety* is plural and not about men, so the adjective ends in *-e*: *bilety są drogie*. The *-i/-y* plural is only for groups of men: *koledzy są mili*.",
                 ne: "*Bilety* बहुवचन हो र पुरुषबारे होइन, त्यसैले विशेषण *-e* मा टुंगिन्छ: *bilety są drogie*। *-i/-y* बहुवचन पुरुषहरूको समूहका लागि मात्र: *koledzy są mili*।" } },
        { pl: "Pojadę do Nepal na Boże Narodzenie.", en: "(wrong case after 'do')", ne: "(*do* पछि गलत विभक्ति)", ok: false,
          why: { en: "*Do* takes the genitive: *do Nepalu*, *do Polski*, *do Indii*. Country names change after prepositions just like other nouns.",
                 ne: "*Do* पछि षष्ठी आउँछ: *do Nepalu*, *do Polski*, *do Indii*। पूर्वसर्गपछि देशका नाम पनि अरू नामजस्तै फेरिन्छन्।" } }
      ]
    },
    {
      them: ["To przyjdź do nas na Wigilię, jeśli chcesz! Moja mama zawsze robi dwanaście potraw.", "Then come to us for Christmas Eve if you like! My mum always makes twelve dishes.", "त्यसो भए क्रिसमसको अघिल्लो साँझ हाम्रो घर आऊ न! मेरी आमाले सधैं बाह्र परिकार बनाउनुहुन्छ।"],
      replies: [
        { pl: "Naprawdę? Bardzo dziękuję, z przyjemnością! Co mam przynieść?", en: "Really? Thank you so much, with pleasure! What should I bring?", ne: "साँच्चै? धेरै धन्यवाद, खुसीसाथ! के ल्याऊँ?", ok: true },
        { pl: "To bardzo miłe, dzięki! Muszę jeszcze sprawdzić grafik, ale bardzo chętnie.", en: "That's really kind, thanks! I still have to check my work schedule, but I'd love to.", ne: "कति राम्रो, धन्यवाद! कामको तालिका हेर्नुपर्छ, तर मलाई आउन मन छ।", ok: true },
        { pl: "Dziękuję, ale nie jem żadne mięso.", en: "(wrong form after 'nie jem')", ne: "(*nie jem* पछि गलत रूप)", ok: false,
          why: { en: "After *nie jem* use the genitive: *nie jem żadnego mięsa*. Good news, by the way: the traditional *Wigilia* dinner has no meat — mostly fish, *pierogi*, *barszcz* and cabbage dishes.",
                 ne: "*nie jem* पछि षष्ठी: *nie jem żadnego mięsa*। अनि खुसीको कुरा: परम्परागत *Wigilia* भोजमा मासु हुँदैन — प्रायः माछा, *pierogi*, *barszcz* र बन्दाका परिकार हुन्छन्।" } }
      ]
    },
    {
      them: ["Super! Dobra, kończy się przerwa. Lecimy?", "Great! OK, the break's over. Shall we go?", "राम्रो! ल, बिदा सकियो। जाऔं?"],
      replies: [
        { pl: "Lecimy! Dzięki za miłą rozmowę.", en: "Let's go! Thanks for the nice chat.", ne: "जाऔं! रमाइलो गफका लागि धन्यवाद।", ok: true },
        { pl: "Dokąd lecimy? Nie mam biletu na samolot.", en: "Where are we flying? I don't have a plane ticket.", ne: "कहाँ उड्ने? मसँग हवाईजहाजको टिकट छैन।", ok: false,
          why: { en: "*Lecimy?* literally means 'are we flying?', but in casual Polish it simply means 'let's go / shall we?'. Similar: *Spadam!* = 'I'm off!'.",
                 ne: "*Lecimy?* को शाब्दिक अर्थ 'उडौं?' हो, तर बोलचालको पोलिशमा यसको अर्थ 'जाऔं' मात्र हो। यस्तै: *Spadam!* = 'म हिँडें!'।" } },
        { pl: "Lecimy! Dzięki za miła rozmowa.", en: "(wrong case after 'za')", ne: "(*za* पछि गलत विभक्ति)", ok: false,
          why: { en: "*Dzięki za* / *dziękuję za* takes the accusative: *za miłą rozmowę*, *za pomoc*, *za kawę*.",
                 ne: "*Dzięki za* / *dziękuję za* पछि द्वितीया आउँछ: *za miłą rozmowę*, *za pomoc*, *za kawę*।" } }
      ]
    }
  ],
  end: {
    en: "Great job! You chatted naturally with a coworker using *ty*, talked about the weekend, Nepal, food and holidays, and even got invited to *Wigilia*. Small talk like this builds real friendships at work.",
    ne: "धेरै राम्रो! तपाईंले सहकर्मीसँग *ty* प्रयोग गरेर सहज रूपमा गफ गर्नुभयो, सप्ताहान्त, नेपाल, खाना र चाडबारे कुरा गर्नुभयो, र *Wigilia* मा निम्तो पनि पाउनुभयो। यस्तो गफगाफले काममा साँचो मित्रता बनाउँछ।"
  },
  useful: [
    ["jak minął weekend?", "how was your weekend?", "सप्ताहान्त कस्तो बित्यो?", "yak MEE-now WEE-kent", "याक् ˈमि-नोव् ˈवि-केन्त्"],
    ["nad jeziorem", "at the lake", "तालको किनारमा", "nat ye-ZHO-rem", "नात् ये-ˈझो-रेम्"],
    ["to inna liga", "that's a different league", "त्यो त अर्कै स्तरको कुरा हो", "to EEN-na LEE-ga", "तो ˈइन्-ना ˈलि-गा"],
    ["ryż z soczewicą", "rice with lentils", "दालभात (चामल र दाल)", "rish s so-che-VEE-tson", "रिश् स् सो-चे-ˈभि-त्सों"],
    ["przyniosę ci trochę", "I'll bring you some", "म तिमीलाई अलिकति ल्याइदिन्छु", "pshi-NYO-seh chee TRO-heh", "प्शि-ˈन्यो-से चि ˈत्रो-हे"],
    ["z przyjemnością!", "with pleasure!", "खुसीसाथ!", "s pshi-yem-NOSH-chon", "स् प्शि-येम्-ˈनोश्-चों"],
    ["lecimy?", "shall we go? (casual)", "जाऔं? (बोलचाल)", "le-CHEE-mi", "ले-ˈचि-मि"]
  ]
});
