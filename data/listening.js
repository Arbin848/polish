// Listening tasks: A1–B2 (ls-a1-01…05, ls-a2-01…05, ls-b1-01…05, ls-b2-01…05). Format: tools/PRACTICE_GUIDE.md section 9.
window.SLOWKA_LISTENING = window.SLOWKA_LISTENING || [];
window.SLOWKA_LISTENING.push(

  // ───────────────────────────── A1 ─────────────────────────────

  {
    id: "ls-a1-01", level: "A1", type: "phone",
    title: "A call from the warehouse", titleNe: "गोदामबाट फोन",
    context: { en: "Your supervisor calls you on Sunday evening about tomorrow's shift.",
               ne: "आइतबार बेलुका तपाईंको सुपरभाइजरले भोलिको सिफ्टबारे फोन गर्छन्।" },
    lines: [
      ["Kierownik", "Halo, dobry wieczór. Tu Marek z magazynu.", "Hello, good evening. This is Marek from the warehouse.", "हेलो, नमस्ते। म गोदामबाट मारेक बोल्दैछु।"],
      ["Ram", "Dobry wieczór, panie Marku.", "Good evening, Mr Marek.", "नमस्ते, मारेकजी।"],
      ["Kierownik", "Ram, jutro zaczynamy wcześniej. O szóstej, nie o siódmej.", "Ram, tomorrow we start earlier. At six, not at seven.", "राम, भोलि हामी चाँडो सुरु गर्छौं। सात बजे होइन, छ बजे।"],
      ["Ram", "O szóstej? Dobrze.", "At six? OK.", "छ बजे? हुन्छ।"],
      ["Kierownik", "Tak. I proszę wziąć buty robocze.", "Yes. And please bring your work boots.", "हो। अनि कामको जुत्ता ल्याउनुहोला।"],
      ["Ram", "Dobrze. A do której pracujemy?", "OK. And until what time do we work?", "हुन्छ। अनि हामी कति बजेसम्म काम गर्छौं?"],
      ["Kierownik", "Do czternastej. Do jutra!", "Until two p.m. See you tomorrow!", "दिउँसो दुई बजेसम्म। भोलि भेटौंला!"],
      ["Ram", "Dziękuję. Do widzenia!", "Thank you. Goodbye!", "धन्यवाद। नमस्ते!"]
    ],
    questions: [
      { q: "Kto dzwoni?", en: "Who is calling?", ne: "को फोन गर्दैछ?",
        options: ["Lekarz.", "Marek z magazynu.", "Kolega z Nepalu."], answer: 1,
        why: { en: "He says *tu Marek z magazynu* – \"this is Marek from the warehouse\". *Tu* + name is how Poles introduce themselves on the phone.",
               ne: "उनी *tu Marek z magazynu* भन्छन् – \"म गोदामबाट मारेक\"। फोनमा पोलिश मानिसहरू *tu* + नाम भनेर आफ्नो परिचय दिन्छन्।" } },
      { q: "O której Ram zaczyna jutro pracę?", en: "What time does Ram start work tomorrow?", ne: "राम भोलि कति बजे काम सुरु गर्छन्?",
        options: ["O siódmej.", "O czternastej.", "O szóstej."], answer: 2,
        why: { en: "*O szóstej, nie o siódmej* – at six, not at seven. Listen for *nie*: it tells you which time is wrong.",
               ne: "*O szóstej, nie o siódmej* – सात बजे होइन, छ बजे। *nie* ध्यान दिएर सुन्नुहोस्: यसले कुन समय गलत हो भन्छ।" } },
      { q: "Co Ram ma wziąć?", en: "What should Ram bring?", ne: "रामले के ल्याउनुपर्छ?",
        options: ["Buty robocze.", "Kurtkę.", "Dokumenty."], answer: 0,
        why: { en: "Marek says *proszę wziąć buty robocze* – please bring work boots.",
               ne: "मारेक भन्छन् *proszę wziąć buty robocze* – कामको जुत्ता ल्याउनुहोस्।" } },
      { q: "Do której pracują?", en: "Until what time do they work?", ne: "उनीहरू कति बजेसम्म काम गर्छन्?",
        options: ["Do czternastej.", "Do szesnastej.", "Do dwunastej."], answer: 0,
        why: { en: "*Do czternastej* = until 14:00 (2 p.m.). Poland uses the 24-hour clock, so *czternasta* is two in the afternoon.",
               ne: "*Do czternastej* = १४:०० सम्म (दिउँसो २ बजे)। पोल्याण्डमा २४ घण्टाको घडी चल्छ, त्यसैले *czternasta* भनेको दिउँसो दुई बजे हो।" } }
    ]
  },

  {
    id: "ls-a1-02", level: "A1", type: "announcement",
    title: "Supermarket announcement", titleNe: "सुपरमार्केटको घोषणा",
    context: { en: "You are shopping after work. You hear an announcement from the loudspeaker.",
               ne: "कामपछि तपाईं किनमेल गर्दै हुनुहुन्छ। लाउडस्पिकरबाट घोषणा सुनिन्छ।" },
    lines: [
      ["Komunikat", "Szanowni klienci, dzień dobry!", "Dear customers, good afternoon!", "आदरणीय ग्राहकहरू, नमस्ते!"],
      ["Komunikat", "Dzisiaj nasz sklep jest otwarty do dwudziestej pierwszej.", "Today our shop is open until nine p.m.", "आज हाम्रो पसल राति नौ बजेसम्म खुला छ।"],
      ["Komunikat", "Mamy dla Państwa promocję: banany za cztery złote za kilogram.", "We have a special offer for you: bananas for four złoty a kilo.", "तपाईंहरूका लागि छुट छ: केरा किलोको चार ज्लोती।"],
      ["Komunikat", "Kawa: druga sztuka za pół ceny.", "Coffee: the second pack at half price.", "कफी: दोस्रो प्याकेट आधा मूल्यमा।"],
      ["Komunikat", "Zapraszamy do kasy numer pięć.", "Please come to till number five.", "कृपया पाँच नम्बर काउन्टरमा आउनुहोस्।"],
      ["Komunikat", "Dziękujemy za zakupy!", "Thank you for shopping with us!", "किनमेलका लागि धन्यवाद!"]
    ],
    questions: [
      { q: "Do której jest otwarty sklep?", en: "Until what time is the shop open?", ne: "पसल कति बजेसम्म खुला हुन्छ?",
        options: ["Do dwudziestej.", "Do dwudziestej pierwszej.", "Do dwudziestej drugiej."], answer: 1,
        why: { en: "*Do dwudziestej pierwszej* = until 21:00 (9 p.m.). *Dwudziesta* is 20, *pierwsza* adds 1.",
               ne: "*Do dwudziestej pierwszej* = २१:०० सम्म (राति ९ बजे)। *dwudziesta* = २०, *pierwsza* ले १ थप्छ।" } },
      { q: "Ile kosztuje kilogram bananów?", en: "How much is a kilo of bananas?", ne: "एक किलो केराको कति पर्छ?",
        options: ["Cztery złote.", "Pięć złotych.", "Trzy złote."], answer: 0,
        why: { en: "*Banany za cztery złote za kilogram* – four złoty per kilo. Note: 2–4 take *złote*, 5 and more take *złotych*.",
               ne: "*Banany za cztery złote za kilogram* – किलोको चार ज्लोती। याद राख्नुहोस्: २–४ सँग *złote*, ५ वा बढीसँग *złotych*।" } },
      { q: "Jaka jest promocja na kawę?", en: "What is the offer on coffee?", ne: "कफीमा के छुट छ?",
        options: ["Kawa jest gratis.", "Druga kawa za pół ceny.", "Kawa za cztery złote."], answer: 1,
        why: { en: "*Druga sztuka za pół ceny* – the second item at half price. *Pół* = half.",
               ne: "*Druga sztuka za pół ceny* – दोस्रो सामान आधा मूल्यमा। *pół* = आधा।" } },
      { q: "Która kasa jest otwarta?", en: "Which till is open?", ne: "कुन काउन्टर खुला छ?",
        options: ["Kasa numer dwa.", "Kasa numer siedem.", "Kasa numer pięć."], answer: 2,
        why: { en: "*Zapraszamy do kasy numer pięć* – they invite you to till number five.",
               ne: "*Zapraszamy do kasy numer pięć* – पाँच नम्बर काउन्टरमा बोलाउँदैछन्।" } }
    ]
  },

  {
    id: "ls-a1-03", level: "A1", type: "voicemail",
    title: "A message from Sita", titleNe: "सीताको सन्देश",
    context: { en: "You missed a call. Your friend Sita left you a voicemail.",
               ne: "तपाईंले एउटा फोन उठाउन सक्नुभएन। तपाईंकी साथी सीताले भ्वाइसमेल छोडिन्।" },
    lines: [
      ["Sita", "Cześć Ram, tu Sita.", "Hi Ram, it's Sita.", "हाई राम, म सीता।"],
      ["Sita", "W sobotę mam urodziny.", "On Saturday it's my birthday.", "शनिबार मेरो जन्मदिन हो।"],
      ["Sita", "Zapraszam cię na kolację o siódmej wieczorem.", "I invite you to dinner at seven in the evening.", "म तिमीलाई बेलुका सात बजे खानामा बोलाउँछु।"],
      ["Sita", "Mieszkam na ulicy Długiej, numer dwanaście.", "I live on Długa Street, number twelve.", "म द्लुगा सडक, बाह्र नम्बरमा बस्छु।"],
      ["Sita", "Możesz kupić sok? Ja mam chleb i ciasto.", "Can you buy juice? I have bread and cake.", "तिमी जुस किनेर ल्याउन सक्छौ? मसँग पाउरोटी र केक छ।"],
      ["Sita", "Zadzwoń do mnie, dobrze? Pa!", "Call me, OK? Bye!", "मलाई फोन गर है? बाइ!"]
    ],
    questions: [
      { q: "Kiedy Sita ma urodziny?", en: "When is Sita's birthday?", ne: "सीताको जन्मदिन कहिले हो?",
        options: ["W piątek.", "W sobotę.", "W niedzielę."], answer: 1,
        why: { en: "*W sobotę mam urodziny* – on Saturday I have my birthday. *Sobota* = Saturday.",
               ne: "*W sobotę mam urodziny* – शनिबार मेरो जन्मदिन। *sobota* = शनिबार।" } },
      { q: "O której jest kolacja?", en: "What time is the dinner?", ne: "खाना कति बजे हो?",
        options: ["O szóstej.", "O ósmej.", "O siódmej."], answer: 2,
        why: { en: "*O siódmej wieczorem* – at seven in the evening.",
               ne: "*O siódmej wieczorem* – बेलुका सात बजे।" } },
      { q: "Gdzie mieszka Sita?", en: "Where does Sita live?", ne: "सीता कहाँ बस्छिन्?",
        options: ["Na ulicy Długiej dwanaście.", "Na ulicy Długiej dwa.", "Na ulicy Krótkiej dwanaście."], answer: 0,
        why: { en: "She says *na ulicy Długiej, numer dwanaście*. *Dwanaście* = 12, *dwa* = 2 – they sound similar, so listen to the end of the word.",
               ne: "उनी *na ulicy Długiej, numer dwanaście* भन्छिन्। *dwanaście* = १२, *dwa* = २ – सुन्दा उस्तै लाग्छ, त्यसैले शब्दको अन्त्य ध्यान दिएर सुन्नुहोस्।" } },
      { q: "Co Ram ma kupić?", en: "What should Ram buy?", ne: "रामले के किन्नुपर्छ?",
        options: ["Chleb.", "Sok.", "Ciasto."], answer: 1,
        why: { en: "*Możesz kupić sok?* – can you buy juice? Sita already has bread and cake (*ja mam chleb i ciasto*).",
               ne: "*Możesz kupić sok?* – जुस किन्न सक्छौ? पाउरोटी र केक सीतासँग पहिल्यै छ (*ja mam chleb i ciasto*)।" } }
    ]
  },

  {
    id: "ls-a1-04", level: "A1", type: "conversation",
    title: "At the café counter", titleNe: "क्याफेको काउन्टरमा",
    context: { en: "You order a coffee before your shift.",
               ne: "सिफ्ट सुरु हुनुअघि तपाईं कफी अर्डर गर्नुहुन्छ।" },
    lines: [
      ["Barista", "Dzień dobry! Co dla pana?", "Hello! What would you like?", "नमस्ते! तपाईंलाई के दिऊँ?"],
      ["Ram", "Dzień dobry. Poproszę dużą kawę z mlekiem.", "Hello. A large coffee with milk, please.", "नमस्ते। एउटा ठूलो दूधवाला कफी दिनुहोस्।"],
      ["Barista", "Na miejscu czy na wynos?", "For here or to take away?", "यहीँ खाने कि लिएर जाने?"],
      ["Ram", "Na wynos, proszę.", "To take away, please.", "लिएर जान्छु।"],
      ["Barista", "Coś jeszcze?", "Anything else?", "अरू केही?"],
      ["Ram", "Tak, jeden rogalik.", "Yes, one croissant.", "हो, एउटा क्रोसाँ।"],
      ["Barista", "Razem osiemnaście złotych.", "Eighteen złoty altogether.", "जम्मा अठार ज्लोती।"],
      ["Ram", "Mogę zapłacić kartą?", "Can I pay by card?", "कार्डले तिर्न मिल्छ?"],
      ["Barista", "Tak, oczywiście. Proszę.", "Yes, of course. Here you are.", "हजुर, अवश्य। लिनुहोस्।"]
    ],
    questions: [
      { q: "Jaką kawę zamawia Ram?", en: "What coffee does Ram order?", ne: "रामले कस्तो कफी अर्डर गर्छन्?",
        options: ["Dużą kawę z mlekiem.", "Małą czarną kawę.", "Dużą kawę bez mleka."], answer: 0,
        why: { en: "*Poproszę dużą kawę z mlekiem* – a large coffee with milk. *Z mlekiem* = with milk, *bez mleka* = without milk.",
               ne: "*Poproszę dużą kawę z mlekiem* – ठूलो दूधवाला कफी। *z mlekiem* = दूधसहित, *bez mleka* = दूधबिना।" } },
      { q: "Ram pije kawę na miejscu?", en: "Does Ram drink the coffee in the café?", ne: "के राम कफी क्याफेमै पिउँछन्?",
        options: ["Tak, na miejscu.", "Nie, bierze kawę na wynos."], answer: 1,
        why: { en: "He answers *na wynos* – to take away. *Na miejscu* would mean he stays and drinks it there.",
               ne: "उनी *na wynos* भन्छन् – लिएर जाने। *na miejscu* भनेको त्यहीँ बसेर पिउने हो।" } },
      { q: "Ile płaci Ram?", en: "How much does Ram pay?", ne: "रामले कति तिर्छन्?",
        options: ["Osiem złotych.", "Osiemdziesiąt złotych.", "Osiemnaście złotych."], answer: 2,
        why: { en: "*Razem osiemnaście złotych* – 18 złoty altogether. *Osiem* = 8, *osiemnaście* = 18, *osiemdziesiąt* = 80: the endings *-naście* (teens) and *-dziesiąt* (tens) make the difference.",
               ne: "*Razem osiemnaście złotych* – जम्मा १८ ज्लोती। *osiem* = ८, *osiemnaście* = १८, *osiemdziesiąt* = ८०: *-naście* (११–१९) र *-dziesiąt* (दहाइ) ले फरक बनाउँछ।" } },
      { q: "Jak płaci Ram?", en: "How does Ram pay?", ne: "रामले कसरी तिर्छन्?",
        options: ["Kartą.", "Gotówką.", "Telefonem."], answer: 0,
        why: { en: "He asks *mogę zapłacić kartą?* and the barista says yes.",
               ne: "उनी *mogę zapłacić kartą?* सोध्छन् र बरिस्टा हुन्छ भन्छिन्।" } }
    ]
  },

  {
    id: "ls-a1-05", level: "A1", type: "announcement",
    title: "At the bus stop", titleNe: "बस बिसौनीमा",
    context: { en: "You are waiting at a bus stop. An announcement comes from the speaker on the stop.",
               ne: "तपाईं बस बिसौनीमा पर्खँदै हुनुहुन्छ। बिसौनीको स्पिकरबाट घोषणा आउँछ।" },
    lines: [
      ["Komunikat", "Uwaga, uwaga!", "Attention, please!", "ध्यान दिनुहोस्!"],
      ["Komunikat", "Autobus numer sto dwadzieścia osiem przyjedzie za dziesięć minut.", "Bus number one hundred twenty-eight will arrive in ten minutes.", "एक सय अट्ठाइस नम्बरको बस दस मिनेटमा आउँछ।"],
      ["Komunikat", "Autobus jedzie do Dworca Głównego.", "The bus goes to the Main Station.", "बस मुख्य रेल स्टेसनसम्म जान्छ।"],
      ["Komunikat", "Bilety można kupić w automacie na przystanku.", "You can buy tickets at the machine at the stop.", "टिकट बिसौनीमा रहेको मेसिनबाट किन्न सकिन्छ।"],
      ["Komunikat", "Bilet normalny kosztuje cztery złote.", "A standard ticket costs four złoty.", "साधारण टिकटको चार ज्लोती पर्छ।"],
      ["Komunikat", "Proszę skasować bilet w autobusie. Dziękujemy.", "Please validate your ticket on the bus. Thank you.", "कृपया बसमा टिकट पन्च (भ्यालिडेट) गर्नुहोस्। धन्यवाद।"]
    ],
    questions: [
      { q: "Który autobus przyjedzie?", en: "Which bus will arrive?", ne: "कुन बस आउँछ?",
        options: ["Dwadzieścia osiem.", "Sto osiemnaście.", "Sto dwadzieścia osiem."], answer: 2,
        why: { en: "*Sto dwadzieścia osiem* = 100 + 20 + 8 = 128. Polish says big numbers piece by piece, just like Nepali counts in parts.",
               ne: "*sto dwadzieścia osiem* = १०० + २० + ८ = १२८। पोलिशमा ठूला अंक टुक्रा-टुक्रा गरेर भनिन्छ।" } },
      { q: "Kiedy przyjedzie autobus?", en: "When will the bus arrive?", ne: "बस कहिले आउँछ?",
        options: ["Za dziesięć minut.", "Za dwie minuty.", "Za godzinę."], answer: 0,
        why: { en: "*Przyjedzie za dziesięć minut* – it will arrive in ten minutes. *Za* + time = \"in (time from now)\".",
               ne: "*Przyjedzie za dziesięć minut* – दस मिनेटमा आउँछ। *za* + समय = \"अबदेखि त्यति समयपछि\"।" } },
      { q: "Gdzie można kupić bilet?", en: "Where can you buy a ticket?", ne: "टिकट कहाँ किन्न सकिन्छ?",
        options: ["U kierowcy.", "W automacie na przystanku.", "W sklepie."], answer: 1,
        why: { en: "*Bilety można kupić w automacie na przystanku* – at the machine at the stop. *Automat* = ticket machine.",
               ne: "*Bilety można kupić w automacie na przystanku* – बिसौनीको मेसिनमा। *automat* = टिकट मेसिन।" } },
      { q: "Co trzeba zrobić z biletem w autobusie?", en: "What must you do with the ticket on the bus?", ne: "बसमा टिकटलाई के गर्नुपर्छ?",
        options: ["Skasować go.", "Dać go kierowcy.", "Nic."], answer: 0,
        why: { en: "*Proszę skasować bilet* – please validate the ticket in the small machine on the bus. An unvalidated paper ticket counts as no ticket, and inspectors give fines.",
               ne: "*Proszę skasować bilet* – बसभित्रको सानो मेसिनमा टिकट पन्च गर्नुहोस्। पन्च नगरेको कागजी टिकट टिकट नभएसरह हो, र जाँचकर्ताले जरिवाना गर्छन्।" } }
    ]
  },

  // ───────────────────────────── A2 ─────────────────────────────

  {
    id: "ls-a2-01", level: "A2", type: "announcement",
    title: "Train delay", titleNe: "रेल ढिलो",
    context: { en: "You are at the station in Poznań, waiting for a train to Wrocław.",
               ne: "तपाईं पोज्नान स्टेसनमा भ्रोत्स्वाफ जाने रेल पर्खँदै हुनुहुन्छ।" },
    lines: [
      ["Komunikat", "Proszę o uwagę.", "Your attention, please.", "कृपया ध्यान दिनुहोस्।"],
      ["Komunikat", "Pociąg regionalny z Poznania do Wrocławia, planowy odjazd godzina czternasta piętnaście, jest opóźniony o około dwadzieścia minut.", "The regional train from Poznań to Wrocław, scheduled departure fourteen fifteen, is delayed by about twenty minutes.", "पोज्नानबाट भ्रोत्स्वाफ जाने क्षेत्रीय रेल, तालिका अनुसार १४:१५ मा छुट्ने, करिब बीस मिनेट ढिलो छ।"],
      ["Komunikat", "Opóźnienie może ulec zmianie.", "The delay may change.", "ढिलाइ घटबढ हुन सक्छ।"],
      ["Komunikat", "Pociąg wjedzie na tor czwarty przy peronie drugim.", "The train will arrive at track four, platform two.", "रेल दोस्रो प्लेटफर्मको चौथो ट्र्याकमा आउँछ।"],
      ["Komunikat", "Przypominamy, że bilet należy kupić przed wejściem do pociągu.", "We remind you that you must buy a ticket before boarding the train.", "रेल चढ्नुअघि नै टिकट किन्नुपर्छ भनेर सम्झाउँछौं।"],
      ["Komunikat", "Za utrudnienia przepraszamy.", "We apologise for the inconvenience.", "असुविधाका लागि क्षमा चाहन्छौं।"]
    ],
    questions: [
      { q: "Dokąd jedzie pociąg?", en: "Where is the train going?", ne: "रेल कहाँ जाँदैछ?",
        options: ["Do Poznania.", "Do Wrocławia.", "Do Łodzi."], answer: 1,
        why: { en: "*Z Poznania do Wrocławia* – from Poznań to Wrocław. *Z* = from, *do* = to.",
               ne: "*Z Poznania do Wrocławia* – पोज्नानबाट भ्रोत्स्वाफसम्म। *z* = बाट, *do* = सम्म/तिर।" } },
      { q: "Jak duże jest opóźnienie?", en: "How long is the delay?", ne: "कति ढिलाइ छ?",
        options: ["Około piętnastu minut.", "Około dwudziestu minut.", "Około czternastu minut."], answer: 1,
        why: { en: "*Opóźniony o około dwadzieścia minut* – about twenty minutes late. *Czternasta piętnaście* is the planned time (14:15), not the delay.",
               ne: "*opóźniony o około dwadzieścia minut* – करिब बीस मिनेट ढिलो। *czternasta piętnaście* (१४:१५) तालिकाको समय हो, ढिलाइ होइन।" } },
      { q: "Przy którym peronie stanie pociąg?", en: "At which platform will the train stop?", ne: "रेल कुन प्लेटफर्ममा रोकिन्छ?",
        options: ["Przy peronie czwartym.", "Przy peronie pierwszym.", "Przy peronie drugim."], answer: 2,
        why: { en: "*Tor czwarty przy peronie drugim* – track four at platform two. In Poland a *peron* (platform) has two *tory* (tracks), so look for the platform number first.",
               ne: "*tor czwarty przy peronie drugim* – दोस्रो प्लेटफर्मको चौथो ट्र्याक। पोल्याण्डमा एउटा *peron* (प्लेटफर्म) मा दुईवटा *tor* (ट्र्याक) हुन्छन्, त्यसैले पहिले प्लेटफर्म नम्बर हेर्नुहोस्।" } },
      { q: "Kiedy trzeba kupić bilet?", en: "When must you buy a ticket?", ne: "टिकट कहिले किन्नुपर्छ?",
        options: ["Przed wejściem do pociągu.", "W pociągu.", "Po podróży."], answer: 0,
        why: { en: "*Bilet należy kupić przed wejściem do pociągu* – before getting on. *Przed* = before.",
               ne: "*Bilet należy kupić przed wejściem do pociągu* – रेल चढ्नुअघि। *przed* = अघि।" } }
    ]
  },

  {
    id: "ls-a2-02", level: "A2", type: "phone",
    title: "Booking a doctor's appointment", titleNe: "डाक्टरसँग समय लिँदै",
    context: { en: "You have felt ill for a few days. You call your local clinic to book a visit.",
               ne: "केही दिनदेखि तपाईंलाई सन्चो छैन। तपाईं नजिकको क्लिनिकमा भेटको समय लिन फोन गर्नुहुन्छ।" },
    lines: [
      ["Rejestratorka", "Przychodnia Zdrowa Rodzina, dzień dobry. W czym mogę pomóc?", "Healthy Family Clinic, good morning. How can I help?", "स्वस्थ परिवार क्लिनिक, नमस्ते। म के मद्दत गरूँ?"],
      ["Ram", "Dzień dobry. Chciałbym umówić się na wizytę u lekarza rodzinnego.", "Good morning. I'd like to book an appointment with the family doctor.", "नमस्ते। म पारिवारिक डाक्टरसँग भेटको समय लिन चाहन्छु।"],
      ["Rejestratorka", "Czy jest pan naszym pacjentem?", "Are you our patient?", "तपाईं हाम्रो बिरामी (दर्ता भएको) हुनुहुन्छ?"],
      ["Ram", "Tak, jestem zapisany od zeszłego roku. Nazywam się Ram Thapa.", "Yes, I've been registered since last year. My name is Ram Thapa.", "हो, म गत वर्षदेखि दर्ता छु। मेरो नाम राम थापा हो।"],
      ["Rejestratorka", "Dziękuję. Mam wolny termin w czwartek o dziesiątej trzydzieści albo w piątek o szesnastej.", "Thank you. I have a free slot on Thursday at ten thirty or on Friday at four p.m.", "धन्यवाद। बिहीबार साढे दस बजे वा शुक्रबार दिउँसो चार बजे समय खाली छ।"],
      ["Ram", "W czwartek pracuję. Poproszę piątek o szesnastej.", "I work on Thursday. Friday at four p.m., please.", "बिहीबार मेरो काम छ। शुक्रबार चार बजे दिनुहोस्।"],
      ["Rejestratorka", "Dobrze, zapisuję pana na piątek, godzina szesnasta, do doktor Nowak, gabinet numer siedem.", "OK, I'm booking you for Friday at four p.m. with Dr Nowak, room number seven.", "ठीक छ, शुक्रबार चार बजे डाक्टर नोभाकसँग, कोठा नम्बर सातमा तपाईंको नाम लेखें।"],
      ["Rejestratorka", "Proszę przyjść dziesięć minut wcześniej i zabrać dokument tożsamości.", "Please come ten minutes early and bring an ID document.", "कृपया दस मिनेट अगाडि आउनुहोस् र परिचयपत्र ल्याउनुहोस्।"],
      ["Ram", "Dobrze, dziękuję bardzo. Do widzenia.", "OK, thank you very much. Goodbye.", "हुन्छ, धेरै धन्यवाद। नमस्ते।"]
    ],
    questions: [
      { q: "Po co Ram dzwoni do przychodni?", en: "Why does Ram call the clinic?", ne: "राम किन क्लिनिकमा फोन गर्छन्?",
        options: ["Żeby odwołać wizytę.", "Żeby umówić się na wizytę.", "Żeby zamówić leki."], answer: 1,
        why: { en: "*Chciałbym umówić się na wizytę* – I'd like to book an appointment. *Odwołać* would mean to cancel.",
               ne: "*Chciałbym umówić się na wizytę* – म भेटको समय लिन चाहन्छु। *odwołać* भनेको रद्द गर्नु हो।" } },
      { q: "Kiedy Ram ma wizytę?", en: "When is Ram's appointment?", ne: "रामको भेट कहिले हो?",
        options: ["W czwartek o dziesiątej trzydzieści.", "W piątek o dziesiątej.", "W piątek o szesnastej."], answer: 2,
        why: { en: "Two times are offered, but Ram chooses *piątek o szesnastej* – Friday at 16:00.",
               ne: "दुईवटा समय दिइन्छ, तर राम *piątek o szesnastej* – शुक्रबार १६:०० रोज्छन्।" } },
      { q: "Dlaczego Ram nie może przyjść w czwartek?", en: "Why can't Ram come on Thursday?", ne: "राम बिहीबार किन आउन सक्दैनन्?",
        options: ["Bo pracuje.", "Bo jest chory.", "Bo ma kurs."], answer: 0,
        why: { en: "He says *w czwartek pracuję* – I work on Thursday.",
               ne: "उनी *w czwartek pracuję* भन्छन् – बिहीबार मेरो काम छ।" } },
      { q: "Co Ram ma zabrać?", en: "What must Ram bring?", ne: "रामले के लिएर जानुपर्छ?",
        options: ["Receptę.", "Dokument tożsamości.", "Zdjęcie."], answer: 1,
        why: { en: "*Proszę zabrać dokument tożsamości* – an ID document (passport or residence card).",
               ne: "*Proszę zabrać dokument tożsamości* – परिचयपत्र (राहदानी वा बसोबास कार्ड) ल्याउनुहोस्।" } }
    ]
  },

  {
    id: "ls-a2-03", level: "A2", type: "voicemail",
    title: "The landlord about a repair", titleNe: "मर्मतबारे घरबेटीको सन्देश",
    context: { en: "Yesterday you texted your landlord that the bathroom tap is leaking. Today he leaves you a voicemail.",
               ne: "हिजो तपाईंले घरबेटीलाई बाथरुमको धारा चुहिन्छ भनेर म्यासेज गर्नुभयो। आज उनले भ्वाइसमेल छोड्छन्।" },
    lines: [
      ["Pan Zieliński", "Dzień dobry, tu Andrzej Zieliński, właściciel mieszkania na ulicy Polnej.", "Hello, this is Andrzej Zieliński, the owner of the flat on Polna Street.", "नमस्ते, म पोल्ना सडकको फ्ल्याटको मालिक आन्द्जेई जिएलिन्स्की।"],
      ["Pan Zieliński", "Dzwonię w sprawie kranu w łazience.", "I'm calling about the tap in the bathroom.", "म बाथरुमको धाराबारे फोन गर्दैछु।"],
      ["Pan Zieliński", "Hydraulik przyjdzie w środę między dziewiątą a dwunastą.", "The plumber will come on Wednesday between nine and twelve.", "प्लम्बर बुधबार बिहान नौ देखि बाह्र बजेसम्मको बीचमा आउँछन्।"],
      ["Pan Zieliński", "Czy ktoś będzie wtedy w domu? Jeśli nie, przyjdę z drugim kluczem.", "Will someone be at home then? If not, I'll come with the spare key.", "त्यतिबेला घरमा कोही हुनुहुन्छ? नभए म अर्को साँचो लिएर आउँछु।"],
      ["Pan Zieliński", "Do tego czasu proszę zakręcić wodę pod umywalką.", "Until then, please turn off the water under the sink.", "त्यतिन्जेल कृपया हात धुने बेसिनमुनिको पानी बन्द गर्नुहोस्।"],
      ["Pan Zieliński", "Proszę oddzwonić albo napisać SMS-a do wtorku wieczorem. Dziękuję, do usłyszenia.", "Please call back or send a text by Tuesday evening. Thank you, talk soon.", "मंगलबार बेलुकासम्म फोन फर्काउनुहोस् वा एसएमएस पठाउनुहोस्। धन्यवाद, फेरि कुरा गरौंला।"]
    ],
    questions: [
      { q: "Jaki jest problem w mieszkaniu?", en: "What is the problem in the flat?", ne: "फ्ल्याटमा के समस्या छ?",
        options: ["Nie działa pralka.", "Kran w łazience.", "Nie ma prądu."], answer: 1,
        why: { en: "*Dzwonię w sprawie kranu w łazience* – I'm calling about the bathroom tap. *W sprawie* + genitive = \"about / regarding\".",
               ne: "*Dzwonię w sprawie kranu w łazience* – बाथरुमको धाराबारे फोन गर्दैछु। *w sprawie* = \"…को बारेमा\"।" } },
      { q: "Kiedy przyjdzie hydraulik?", en: "When will the plumber come?", ne: "प्लम्बर कहिले आउँछन्?",
        options: ["We wtorek wieczorem.", "W środę między dziewiątą a dwunastą.", "W środę o dwunastej."], answer: 1,
        why: { en: "*W środę między dziewiątą a dwunastą* – on Wednesday between 9 and 12. Tuesday evening is only the deadline for your answer.",
               ne: "*W środę między dziewiątą a dwunastą* – बुधबार ९ देखि १२ बजेबीच। मंगलबार बेलुका त तपाईंले जवाफ दिने अन्तिम समय मात्र हो।" } },
      { q: "Co lokator ma zrobić teraz?", en: "What should the tenant do now?", ne: "भाडामा बस्नेले अहिले के गर्नुपर्छ?",
        options: ["Zakręcić wodę pod umywalką.", "Naprawić kran.", "Kupić nowy kran."], answer: 0,
        why: { en: "*Proszę zakręcić wodę pod umywalką* – turn off the water under the sink. *Zakręcić* = to turn off (a tap or valve).",
               ne: "*Proszę zakręcić wodę pod umywalką* – बेसिनमुनिको पानी बन्द गर्नुहोस्। *zakręcić* = (धारा वा भल्भ) घुमाएर बन्द गर्नु।" } },
      { q: "Co zrobi właściciel, jeśli nikogo nie będzie w domu?", en: "What will the owner do if nobody is at home?", ne: "घरमा कोही नभए घरधनीले के गर्छन्?",
        options: ["Przełoży wizytę hydraulika.", "Zadzwoni na policję.", "Przyjdzie z drugim kluczem."], answer: 2,
        why: { en: "*Jeśli nie, przyjdę z drugim kluczem* – if not, I'll come with the second (spare) key.",
               ne: "*Jeśli nie, przyjdę z drugim kluczem* – नभए म अर्को साँचो लिएर आउँछु।" } }
    ]
  },

  {
    id: "ls-a2-04", level: "A2", type: "conversation",
    title: "Plans for the weekend", titleNe: "सप्ताहान्तको योजना",
    context: { en: "During the break your coworker Kasia asks about your weekend.",
               ne: "ब्रेकमा तपाईंकी सहकर्मी कासियाले तपाईंको सप्ताहान्तबारे सोध्छिन्।" },
    lines: [
      ["Kasia", "Ram, co robisz w ten weekend?", "Ram, what are you doing this weekend?", "राम, यो सप्ताहान्त के गर्दैछौ?"],
      ["Ram", "W sobotę pracuję do południa. Potem nie mam planów.", "On Saturday I work until noon. After that I have no plans.", "शनिबार म मध्याह्नसम्म काम गर्छु। त्यसपछि कुनै योजना छैन।"],
      ["Kasia", "Może pojedziesz z nami w niedzielę nad jezioro? Jadą też Tomek i Anita.", "Maybe you'll come with us to the lake on Sunday? Tomek and Anita are going too.", "आइतबार हामीसँग तालतिर जाने? टोमेक र अनिता पनि जाँदैछन्।"],
      ["Ram", "Super! Jak tam pojedziemy?", "Great! How will we get there?", "राम्रो! हामी त्यहाँ कसरी जाने?"],
      ["Kasia", "Tomek ma samochód. Spotykamy się o dziewiątej rano przed sklepem na ulicy Leśnej.", "Tomek has a car. We're meeting at nine in the morning in front of the shop on Leśna Street.", "टोमेकसँग कार छ। हामी बिहान नौ बजे लेश्ना सडकको पसलअगाडि भेट्छौं।"],
      ["Ram", "Co mam wziąć?", "What should I bring?", "म के लिएर आऊँ?"],
      ["Kasia", "Weź coś do jedzenia i strój kąpielowy.", "Bring something to eat and a swimsuit.", "केही खानेकुरा र पौडी खेल्ने लुगा ल्याऊ।"],
      ["Ram", "Mogę zrobić momo dla wszystkich!", "I can make momo for everyone!", "म सबैका लागि मःम बनाउन सक्छु!"],
      ["Kasia", "Świetnie, nigdy nie jadłam momo!", "Great, I've never eaten momo!", "वाह, मैले कहिल्यै मःम खाएकी छैन!"],
      ["Ram", "A jeśli będzie padać?", "And if it rains?", "अनि पानी पर्‍यो भने?"],
      ["Kasia", "To pójdziemy do kina. Napiszę do ciebie w sobotę wieczorem.", "Then we'll go to the cinema. I'll text you on Saturday evening.", "त्यसो भए सिनेमा हेर्न जान्छौं। म शनिबार बेलुका तिमीलाई म्यासेज गर्छु।"]
    ],
    questions: [
      { q: "Kiedy jadą nad jezioro?", en: "When are they going to the lake?", ne: "उनीहरू तालतिर कहिले जाँदैछन्?",
        options: ["W sobotę rano.", "W niedzielę.", "W sobotę po południu."], answer: 1,
        why: { en: "*Może pojedziesz z nami w niedzielę nad jezioro?* – on Sunday. On Saturday Ram works until noon.",
               ne: "*Może pojedziesz z nami w niedzielę nad jezioro?* – आइतबार। शनिबार राम मध्याह्नसम्म काम गर्छन्।" } },
      { q: "Kto ma samochód?", en: "Who has a car?", ne: "कोसँग कार छ?",
        options: ["Kasia.", "Anita.", "Tomek."], answer: 2,
        why: { en: "*Tomek ma samochód* – Tomek has a car.",
               ne: "*Tomek ma samochód* – टोमेकसँग कार छ।" } },
      { q: "Gdzie i o której się spotykają?", en: "Where and when are they meeting?", ne: "उनीहरू कहाँ र कति बजे भेट्छन्?",
        options: ["O dziewiątej przed sklepem na ulicy Leśnej.", "O dziewiątej nad jeziorem.", "O dziesiątej przed sklepem na ulicy Leśnej."], answer: 0,
        why: { en: "*Spotykamy się o dziewiątej rano przed sklepem na ulicy Leśnej* – at nine, in front of the shop on Leśna Street.",
               ne: "*Spotykamy się o dziewiątej rano przed sklepem na ulicy Leśnej* – बिहान नौ बजे, लेश्ना सडकको पसलअगाडि।" } },
      { q: "Co zrobią, jeśli będzie padać?", en: "What will they do if it rains?", ne: "पानी पर्‍यो भने उनीहरू के गर्छन्?",
        options: ["Zostaną w domu.", "Pójdą do kina.", "Pojadą nad jezioro."], answer: 1,
        why: { en: "*To pójdziemy do kina* – then we'll go to the cinema. *Jeśli będzie padać* = if it rains.",
               ne: "*To pójdziemy do kina* – त्यसो भए सिनेमा जान्छौं। *jeśli będzie padać* = पानी पर्‍यो भने।" } }
    ]
  },

  {
    id: "ls-a2-05", level: "A2", type: "radio",
    title: "Weather forecast", titleNe: "मौसम पूर्वानुमान",
    context: { en: "You listen to the radio on the bus home. The weather forecast for the weekend comes on.",
               ne: "घर फर्कंदा बसमा तपाईं रेडियो सुन्दै हुनुहुन्छ। सप्ताहान्तको मौसम पूर्वानुमान सुरु हुन्छ।" },
    lines: [
      ["Prezenterka", "A teraz prognoza pogody na jutro, czyli na sobotę.", "And now the weather forecast for tomorrow, that is, Saturday.", "अब भोलि, अर्थात् शनिबारको मौसम पूर्वानुमान।"],
      ["Prezenterka", "Rano na północy kraju będzie pochmurno i chłodno, około pięciu stopni.", "In the morning in the north of the country it will be cloudy and cool, about five degrees.", "बिहान देशको उत्तरमा बादल लाग्ने र चिसो हुनेछ, करिब पाँच डिग्री।"],
      ["Prezenterka", "W ciągu dnia w centrum i na zachodzie będzie padać deszcz.", "During the day it will rain in the centre and in the west.", "दिउँसो देशको मध्य र पश्चिम भागमा पानी पर्नेछ।"],
      ["Prezenterka", "Na południu, w górach, może padać śnieg.", "In the south, in the mountains, it may snow.", "दक्षिणमा, पहाडी भागमा हिउँ पर्न सक्छ।"],
      ["Prezenterka", "Temperatura w dzień od ośmiu do dwunastu stopni. Nad morzem wieje silny wiatr.", "Daytime temperature from eight to twelve degrees. There is a strong wind by the sea.", "दिउँसोको तापक्रम आठ देखि बाह्र डिग्री। समुद्र किनारमा बलियो हावा चल्छ।"],
      ["Prezenterka", "W niedzielę będzie cieplej i słonecznie, nawet do piętnastu stopni.", "On Sunday it will be warmer and sunny, even up to fifteen degrees.", "आइतबार अलि न्यानो र घमाइलो हुनेछ, पन्ध्र डिग्रीसम्म पुग्न सक्छ।"],
      ["Prezenterka", "Jeśli jutro wychodzą Państwo z domu, warto wziąć parasol.", "If you are going out tomorrow, it's worth taking an umbrella.", "भोलि घरबाट बाहिर निस्कँदै हुनुहुन्छ भने छाता लिएर जानु राम्रो हुन्छ।"]
    ],
    questions: [
      { q: "Jaka pogoda będzie w sobotę w centrum kraju?", en: "What will the weather be like on Saturday in the centre of the country?", ne: "शनिबार देशको मध्य भागमा मौसम कस्तो हुन्छ?",
        options: ["Będzie padać deszcz.", "Będzie padać śnieg.", "Będzie słonecznie."], answer: 0,
        why: { en: "*W centrum i na zachodzie będzie padać deszcz* – rain in the centre and west. Snow is only in the mountains in the south.",
               ne: "*W centrum i na zachodzie będzie padać deszcz* – मध्य र पश्चिममा पानी। हिउँ दक्षिणका पहाडमा मात्र।" } },
      { q: "Gdzie może padać śnieg?", en: "Where might it snow?", ne: "हिउँ कहाँ पर्न सक्छ?",
        options: ["Nad morzem.", "Na północy.", "W górach na południu."], answer: 2,
        why: { en: "*Na południu, w górach, może padać śnieg.* *Południe* = south (it also means noon!).",
               ne: "*Na południu, w górach, może padać śnieg.* *południe* = दक्षिण (यसको अर्थ मध्याह्न पनि हुन्छ!)।" } },
      { q: "Jaka będzie temperatura w sobotę w dzień?", en: "What will the temperature be on Saturday during the day?", ne: "शनिबार दिउँसो तापक्रम कति हुन्छ?",
        options: ["Od pięciu do ośmiu stopni.", "Od ośmiu do dwunastu stopni.", "Do piętnastu stopni."], answer: 1,
        why: { en: "*Temperatura w dzień od ośmiu do dwunastu stopni.* Five degrees is the morning in the north; fifteen is Sunday.",
               ne: "*Temperatura w dzień od ośmiu do dwunastu stopni.* पाँच डिग्री उत्तरको बिहानको हो; पन्ध्र डिग्री आइतबारको।" } },
      { q: "Jaka będzie niedziela?", en: "What will Sunday be like?", ne: "आइतबार कस्तो हुन्छ?",
        options: ["Zimniejsza i deszczowa.", "Cieplejsza i słoneczna.", "Wietrzna i pochmurna."], answer: 1,
        why: { en: "*W niedzielę będzie cieplej i słonecznie* – warmer and sunny.",
               ne: "*W niedzielę będzie cieplej i słonecznie* – अलि न्यानो र घमाइलो।" } }
    ]
  },

  // ───────────────────────────── B1 ─────────────────────────────

  {
    id: "ls-b1-01", level: "B1", type: "phone",
    title: "Missing documents", titleNe: "नपुगेका कागजातहरू",
    context: { en: "You applied for a temporary residence and work permit. An official from the foreigners' office calls you.",
               ne: "तपाईंले अस्थायी बसोबास र कामको अनुमतिका लागि निवेदन दिनुभएको छ। विदेशी मामिला कार्यालयबाट एक कर्मचारीले फोन गर्छिन्।" },
    lines: [
      ["Urzędniczka", "Dzień dobry, Anna Wiśniewska, wydział spraw cudzoziemców urzędu wojewódzkiego. Czy rozmawiam z panem Ramem Thapą?", "Good morning, Anna Wiśniewska, foreigners' department of the voivodeship office. Am I speaking with Mr Ram Thapa?", "नमस्ते, म प्रदेश कार्यालयको विदेशी मामिला शाखाबाट आन्ना भिश्निएभ्स्का। के म राम थापाजीसँग कुरा गर्दैछु?"],
      ["Ram", "Tak, słucham.", "Yes, speaking.", "हजुर, भन्नुहोस्।"],
      ["Urzędniczka", "Dzwonię w sprawie pana wniosku o zezwolenie na pobyt czasowy i pracę. Brakuje nam dwóch dokumentów.", "I'm calling about your application for a temporary residence and work permit. We are missing two documents.", "तपाईंको अस्थायी बसोबास र कामको अनुमतिको निवेदनबारे फोन गरेकी हुँ। हामीसँग दुईवटा कागजात नपुगेको छ।"],
      ["Ram", "Rozumiem. Jakich dokumentów?", "I see. Which documents?", "बुझें। कुन कागजातहरू?"],
      ["Urzędniczka", "Po pierwsze, umowy najmu albo innego potwierdzenia, gdzie pan mieszka. Po drugie, załącznika numer jeden podpisanego przez pracodawcę.", "First, a rental agreement or other proof of where you live. Second, annex number one signed by your employer.", "पहिलो, भाडा सम्झौता वा तपाईं कहाँ बस्नुहुन्छ भन्ने अरू प्रमाण। दोस्रो, रोजगारदाताले हस्ताक्षर गरेको अनुसूची नम्बर एक।"],
      ["Ram", "Do kiedy muszę je dostarczyć?", "By when do I have to deliver them?", "मैले यी कहिलेसम्म बुझाउनुपर्छ?"],
      ["Urzędniczka", "Ma pan czternaście dni od otrzymania wezwania. Wezwanie wyślemy też pocztą.", "You have fourteen days from receiving the official request. We'll also send the request by post.", "सूचना पाएको मितिदेखि तपाईंसँग चौध दिन छ। सूचना हामी हुलाकबाट पनि पठाउँछौं।"],
      ["Ram", "A czy mogę wysłać dokumenty mailem?", "And can I send the documents by email?", "के म कागजातहरू इमेलबाट पठाउन सक्छु?"],
      ["Urzędniczka", "Niestety nie. Trzeba je złożyć osobiście albo wysłać listem poleconym. Proszę podać na kopercie numer sprawy.", "Unfortunately not. You have to hand them in in person or send them by registered letter. Please write the case number on the envelope.", "दुर्भाग्यवश मिल्दैन। आफैं आएर बुझाउनुपर्छ वा रजिस्ट्री चिठीबाट पठाउनुपर्छ। खाममा आफ्नो फाइल नम्बर लेख्नुहोला।"],
      ["Ram", "A jeśli nie zdążę?", "And if I don't make it in time?", "अनि समयमै बुझाउन भ्याइनँ भने?"],
      ["Urzędniczka", "Wtedy wniosek może zostać pozostawiony bez rozpatrzenia, więc proszę nie zwlekać.", "Then the application may be left unprocessed, so please don't delay.", "त्यसो भए निवेदनमाथि कारबाही नै नहुन सक्छ, त्यसैले ढिला नगर्नुहोला।"],
      ["Ram", "Dobrze, dziękuję za informację.", "OK, thank you for the information.", "हुन्छ, जानकारीका लागि धन्यवाद।"]
    ],
    questions: [
      { q: "Dlaczego dzwoni urzędniczka?", en: "Why is the official calling?", ne: "कर्मचारीले किन फोन गर्छिन्?",
        options: ["Bo wniosek został odrzucony.", "Bo brakuje dokumentów do wniosku.", "Bo Ram musi zapłacić karę."], answer: 1,
        why: { en: "*Brakuje nam dwóch dokumentów* – we are missing two documents. Nothing is rejected yet; she is asking you to complete the file.",
               ne: "*Brakuje nam dwóch dokumentów* – दुईवटा कागजात नपुगेको छ। निवेदन अस्वीकार भएको छैन; उनी फाइल पूरा गर्न भन्दैछिन्।" } },
      { q: "Jakich dokumentów brakuje?", en: "Which documents are missing?", ne: "कुन कागजातहरू नपुगेका छन्?",
        options: ["Umowy najmu i załącznika numer jeden.", "Paszportu i zdjęć.", "Umowy o pracę i zaświadczenia lekarskiego."], answer: 0,
        why: { en: "First *umowa najmu* (rental agreement / proof of address), second *załącznik numer jeden* signed by the employer.",
               ne: "पहिलो *umowa najmu* (भाडा सम्झौता / ठेगानाको प्रमाण), दोस्रो रोजगारदाताले हस्ताक्षर गरेको *załącznik numer jeden*।" } },
      { q: "Ile czasu ma Ram?", en: "How much time does Ram have?", ne: "रामसँग कति समय छ?",
        options: ["Czternaście dni od otrzymania wezwania.", "Czternaście dni od dzisiaj.", "Cztery dni."], answer: 0,
        why: { en: "*Czternaście dni od otrzymania wezwania* – 14 days from receiving the letter, not from today. Keep the envelope: the post date matters.",
               ne: "*Czternaście dni od otrzymania wezwania* – चिठी पाएको दिनदेखि १४ दिन, आजदेखि होइन। खाम राखिराख्नुहोस्: हुलाकको मिति महत्त्वपूर्ण हुन्छ।" } },
      { q: "Jak można złożyć dokumenty?", en: "How can the documents be submitted?", ne: "कागजातहरू कसरी बुझाउन सकिन्छ?",
        options: ["Mailem.", "Przez telefon.", "Osobiście albo listem poleconym."], answer: 2,
        why: { en: "*Niestety nie* (not by email) – *osobiście albo listem poleconym*: in person or by registered letter, with the case number on the envelope.",
               ne: "*Niestety nie* (इमेलबाट होइन) – *osobiście albo listem poleconym*: आफैं गएर वा रजिस्ट्री चिठीबाट, खाममा फाइल नम्बर लेखेर।" } }
    ]
  },

  {
    id: "ls-b1-02", level: "B1", type: "conversation",
    title: "At the pharmacy", titleNe: "औषधि पसलमा",
    context: { en: "The doctor gave you an e-prescription for an antibiotic. The pharmacist explains how to take it.",
               ne: "डाक्टरले तपाईंलाई एन्टिबायोटिकको ई-प्रेस्क्रिप्सन दिनुभयो। फार्मासिस्टले यो कसरी खाने भनेर बुझाउँछिन्।" },
    lines: [
      ["Ram", "Dzień dobry, mam e-receptę. Tu jest kod z SMS-a.", "Hello, I have an e-prescription. Here's the code from the text message.", "नमस्ते, मसँग ई-प्रेस्क्रिप्सन छ। यो एसएमएसमा आएको कोड हो।"],
      ["Farmaceutka", "Dziękuję. To jest antybiotyk. Bierze pan jedną tabletkę dwa razy dziennie, co dwanaście godzin, na przykład o ósmej rano i o ósmej wieczorem.", "Thank you. This is an antibiotic. You take one tablet twice a day, every twelve hours, for example at eight in the morning and eight in the evening.", "धन्यवाद। यो एन्टिबायोटिक हो। दिनको दुई पटक, हरेक बाह्र घण्टामा एउटा चक्की खानुहोस्, जस्तै बिहान आठ र बेलुका आठ बजे।"],
      ["Ram", "Przed jedzeniem czy po jedzeniu?", "Before or after eating?", "खाना खानुअघि कि पछि?"],
      ["Farmaceutka", "Po jedzeniu. I proszę popijać wodą, nie mlekiem ani sokiem.", "After eating. And please take it with water, not milk or juice.", "खाना खाएपछि। अनि पानीसँग खानुहोस्, दूध वा जुससँग होइन।"],
      ["Ram", "Jak długo mam go brać?", "How long should I take it?", "कति दिनसम्म खानुपर्छ?"],
      ["Farmaceutka", "Przez siedem dni, do końca opakowania. Nawet jeśli po trzech dniach poczuje się pan lepiej, proszę nie przerywać.", "For seven days, until the pack is finished. Even if you feel better after three days, please don't stop.", "सात दिनसम्म, प्याकेट नसकिउन्जेल। तीन दिनमा सन्चो भएजस्तो लागे पनि बीचमै नछोड्नुहोला।"],
      ["Farmaceutka", "I bardzo ważne: w czasie kuracji nie wolno pić alkoholu.", "And very important: during the treatment you must not drink alcohol.", "अनि धेरै महत्त्वपूर्ण: औषधि खाँदाखाँदै रक्सी पिउनु हुँदैन।"],
      ["Ram", "Rozumiem. A mogę brać coś na gorączkę?", "I understand. And can I take something for fever?", "बुझें। ज्वरोका लागि केही खान मिल्छ?"],
      ["Farmaceutka", "Tak, paracetamol można, ale nie więcej niż cztery razy na dobę.", "Yes, paracetamol is fine, but not more than four times in twenty-four hours.", "हुन्छ, पारासिटामोल खान मिल्छ, तर चौबीस घण्टामा चार पटकभन्दा बढी होइन।"],
      ["Ram", "Dobrze. Ile płacę?", "OK. How much do I pay?", "ठीक छ। कति तिर्नुपर्छ?"],
      ["Farmaceutka", "Dwadzieścia sześć złotych czterdzieści groszy.", "Twenty-six złoty forty groszy.", "छब्बीस ज्लोती चालीस ग्रोस।"]
    ],
    questions: [
      { q: "Jak często trzeba brać antybiotyk?", en: "How often must the antibiotic be taken?", ne: "एन्टिबायोटिक कति पटक खानुपर्छ?",
        options: ["Raz dziennie.", "Dwa razy dziennie, co dwanaście godzin.", "Cztery razy na dobę."], answer: 1,
        why: { en: "*Jedną tabletkę dwa razy dziennie, co dwanaście godzin.* \"Four times\" is the limit for paracetamol, not for the antibiotic.",
               ne: "*Jedną tabletkę dwa razy dziennie, co dwanaście godzin.* \"चार पटक\" पारासिटामोलको सीमा हो, एन्टिबायोटिकको होइन।" } },
      { q: "Czym trzeba popijać tabletki?", en: "What should you take the tablets with?", ne: "चक्की केसँग खानुपर्छ?",
        options: ["Wodą.", "Mlekiem.", "Sokiem."], answer: 0,
        why: { en: "*Proszę popijać wodą, nie mlekiem ani sokiem.* Milk can stop some antibiotics from working well.",
               ne: "*Proszę popijać wodą, nie mlekiem ani sokiem.* दूधले केही एन्टिबायोटिकको असर कम गर्न सक्छ।" } },
      { q: "Co zrobić, jeśli po trzech dniach Ram poczuje się lepiej?", en: "What should Ram do if he feels better after three days?", ne: "तीन दिनमा सन्चो भयो भने रामले के गर्नुपर्छ?",
        options: ["Przestać brać lek.", "Brać jedną tabletkę dziennie.", "Brać lek dalej, do końca opakowania."], answer: 2,
        why: { en: "*Nawet jeśli poczuje się pan lepiej, proszę nie przerywać* – finish all seven days. Stopping early lets the infection come back.",
               ne: "*Nawet jeśli poczuje się pan lepiej, proszę nie przerywać* – सातै दिन पूरा गर्नुहोस्। बीचमै छोडे संक्रमण फर्किन सक्छ।" } },
      { q: "Czego nie wolno robić w czasie kuracji?", en: "What is not allowed during the treatment?", ne: "औषधि खाँदा के गर्न हुँदैन?",
        options: ["Brać paracetamolu.", "Pić alkoholu.", "Jeść przed tabletką."], answer: 1,
        why: { en: "*W czasie kuracji nie wolno pić alkoholu.* *Nie wolno* = it is not allowed. Paracetamol is allowed.",
               ne: "*W czasie kuracji nie wolno pić alkoholu.* *nie wolno* = गर्न पाइँदैन। पारासिटामोल भने खान मिल्छ।" } }
    ]
  },

  {
    id: "ls-b1-03", level: "B1", type: "phone",
    title: "A new work schedule", titleNe: "कामको नयाँ तालिका",
    context: { en: "Someone from the HR department calls you about changes to the shift system.",
               ne: "मानव संसाधन (HR) विभागबाट कसैले सिफ्ट प्रणालीमा भएको परिवर्तनबारे फोन गर्छन्।" },
    lines: [
      ["Kadrowa", "Dzień dobry, Monika Lewandowska z działu kadr firmy Logimax. Dzwonię, bo od przyszłego miesiąca zmienia się grafik na pana dziale.", "Hello, Monika Lewandowska from the HR department of Logimax. I'm calling because from next month the schedule in your section is changing.", "नमस्ते, म लोजिम्याक्स कम्पनीको कर्मचारी प्रशासन विभागबाट मोनिका लेभान्दोभ्स्का। अर्को महिनादेखि तपाईंको विभागको तालिका बदलिँदैछ, त्यसैले फोन गरेकी हुँ।"],
      ["Ram", "Aha. A co się zmienia?", "Oh. And what's changing?", "ए। के बदलिँदैछ?"],
      ["Kadrowa", "Zamiast dwóch zmian będą trzy. Pan będzie pracował na zmianie popołudniowej, od czternastej do dwudziestej drugiej.", "Instead of two shifts there will be three. You will work the afternoon shift, from two p.m. to ten p.m.", "दुई सिफ्टको सट्टा तीन सिफ्ट हुनेछ। तपाईं दिउँसोको सिफ्टमा, दुई बजेदेखि राति दस बजेसम्म काम गर्नुहुनेछ।"],
      ["Ram", "No dobrze. A soboty?", "Well, OK. And Saturdays?", "ल ठीक छ। अनि शनिबार?"],
      ["Kadrowa", "Raz w miesiącu będzie pracująca sobota. Za nią dostanie pan dzień wolny w tygodniu albo dodatek, do wyboru.", "Once a month there will be a working Saturday. For it you'll get a day off during the week or extra pay – your choice.", "महिनामा एक पटक शनिबार काम हुनेछ। त्यसको बदलामा हप्ताभित्र एक दिन बिदा वा थप भत्ता पाउनुहुन्छ, जुन रोज्नुहुन्छ।"],
      ["Ram", "Rozumiem. Tylko że w czwartki po południu mam kurs polskiego. Czy wtedy mogę czasem zamienić zmianę?", "I see. It's just that on Thursday afternoons I have a Polish course. Could I sometimes swap shifts then?", "बुझें। तर बिहीबार दिउँसो मेरो पोलिश भाषाको कक्षा हुन्छ। त्यसबेला कहिलेकाहीँ सिफ्ट साट्न मिल्छ?"],
      ["Kadrowa", "Proszę napisać prośbę do kierownika zmiany. Jeśli ktoś się z panem zamieni, nie będzie problemu.", "Please write a request to the shift manager. If someone swaps with you, there won't be a problem.", "सिफ्ट प्रबन्धकलाई लिखित अनुरोध दिनुहोस्। कसैले तपाईंसँग साट्यो भने कुनै समस्या हुँदैन।"],
      ["Kadrowa", "Nowy grafik wyślę mailem do piątku. Proszę go podpisać i oddać w kadrach.", "I'll email the new schedule by Friday. Please sign it and return it to HR.", "नयाँ तालिका शुक्रबारसम्म इमेलबाट पठाउँछु। त्यसमा हस्ताक्षर गरेर HR मा बुझाउनुहोला।"],
      ["Ram", "Dobrze, dziękuję. Do usłyszenia.", "OK, thank you. Talk soon.", "हुन्छ, धन्यवाद। फेरि कुरा गरौंला।"]
    ],
    questions: [
      { q: "Na jakiej zmianie będzie pracował Ram?", en: "Which shift will Ram work?", ne: "राम कुन सिफ्टमा काम गर्नेछन्?",
        options: ["Na porannej, od szóstej do czternastej.", "Na popołudniowej, od czternastej do dwudziestej drugiej.", "Na nocnej, od dwudziestej drugiej do szóstej."], answer: 1,
        why: { en: "*Na zmianie popołudniowej, od czternastej do dwudziestej drugiej* – 14:00 to 22:00.",
               ne: "*Na zmianie popołudniowej, od czternastej do dwudziestej drugiej* – १४:०० देखि २२:०० सम्म।" } },
      { q: "Co Ram dostanie za pracującą sobotę?", en: "What will Ram get for a working Saturday?", ne: "शनिबार काम गरेबापत रामले के पाउँछन्?",
        options: ["Nic, to obowiązek.", "Tylko dodatek.", "Dzień wolny albo dodatek."], answer: 2,
        why: { en: "*Dzień wolny w tygodniu albo dodatek, do wyboru* – a day off or extra pay, he chooses. *Do wyboru* = your choice.",
               ne: "*Dzień wolny w tygodniu albo dodatek, do wyboru* – बिदा वा भत्ता, आफैं रोज्ने। *do wyboru* = रोज्न पाइने।" } },
      { q: "Co Ram ma zrobić, żeby zamienić zmianę w czwartek?", en: "What must Ram do to swap a Thursday shift?", ne: "बिहीबारको सिफ्ट साट्न रामले के गर्नुपर्छ?",
        options: ["Napisać prośbę do kierownika zmiany.", "Zadzwonić do kadr.", "Nic, może po prostu nie przyjść."], answer: 0,
        why: { en: "*Proszę napisać prośbę do kierownika zmiany* – write a request to the shift manager. Never just stay away: that counts as an unexcused absence.",
               ne: "*Proszę napisać prośbę do kierownika zmiany* – सिफ्ट प्रबन्धकलाई लिखित अनुरोध दिने। खबर नगरी नआउनु कहिल्यै नगर्नुहोस्: त्यो बिना कारणको गयल मानिन्छ।" } },
      { q: "Co Ram ma zrobić z nowym grafikiem?", en: "What must Ram do with the new schedule?", ne: "नयाँ तालिकासँग रामले के गर्नुपर्छ?",
        options: ["Wysłać go mailem do kierownika.", "Podpisać go i oddać w kadrach.", "Wydrukować go i powiesić na hali."], answer: 1,
        why: { en: "*Proszę go podpisać i oddać w kadrach* – sign it and return it to HR. *Kadry* = the HR / personnel office.",
               ne: "*Proszę go podpisać i oddać w kadrach* – हस्ताक्षर गरेर HR मा बुझाउने। *kadry* = कर्मचारी प्रशासन शाखा।" } }
    ]
  },

  {
    id: "ls-b1-04", level: "B1", type: "phone",
    title: "No internet at home", titleNe: "घरमा इन्टरनेट छैन",
    context: { en: "Your home internet has not worked for three days. You call your provider's helpline to complain.",
               ne: "तीन दिनदेखि घरको इन्टरनेट चलेको छैन। तपाईं उजुरी गर्न इन्टरनेट कम्पनीको हेल्पलाइनमा फोन गर्नुहुन्छ।" },
    lines: [
      ["Konsultant", "NetFala, dzień dobry, nazywam się Paweł. W czym mogę pomóc?", "NetFala, good morning, my name is Paweł. How can I help?", "नेटफाला, नमस्ते, मेरो नाम पावेल हो। म के मद्दत गर्न सक्छु?"],
      ["Ram", "Dzień dobry. Od trzech dni nie mam internetu w domu. Router świeci na czerwono.", "Good morning. I haven't had internet at home for three days. The router light is red.", "नमस्ते। तीन दिनदेखि घरमा इन्टरनेट छैन। राउटरमा रातो बत्ती बलिरहेको छ।"],
      ["Konsultant", "Przykro mi. Poproszę adres instalacji.", "I'm sorry. Can I have the installation address, please?", "माफ गर्नुहोस्। जडान भएको ठेगाना भन्नुहोस् त।"],
      ["Ram", "Ulica Ogrodowa piętnaście, mieszkanie cztery.", "Ogrodowa Street fifteen, flat four.", "ओग्रोदोभा सडक पन्ध्र, फ्ल्याट नम्बर चार।"],
      ["Konsultant", "Dziękuję. Widzę, że w pana okolicy była awaria, ale już powinno działać. Czy próbował pan zrestartować router?", "Thank you. I can see there was a fault in your area, but it should be working now. Have you tried restarting the router?", "धन्यवाद। तपाईंको क्षेत्रमा खराबी आएको थियो, तर अहिले चल्नुपर्ने हो। तपाईंले राउटर रिस्टार्ट गरेर हेर्नुभयो?"],
      ["Ram", "Tak, dwa razy. Nic nie pomogło.", "Yes, twice. Nothing helped.", "हो, दुई पटक। केही भएन।"],
      ["Konsultant", "W takim razie wyślę technika. Najbliższy termin to wtorek, między dwunastą a szesnastą.", "In that case I'll send a technician. The earliest slot is Tuesday, between twelve and four p.m.", "त्यसो भए म प्राविधिक पठाउँछु। सबैभन्दा छिटो मंगलबार, बाह्र देखि चार बजेबीच।"],
      ["Ram", "Dobrze. A czy dostanę zwrot pieniędzy za te dni bez internetu?", "OK. And will I get money back for these days without internet?", "ठीक छ। इन्टरनेट नभएका दिनहरूको पैसा फिर्ता पाउँछु?"],
      ["Konsultant", "Tak, przysługuje panu obniżka. Złożę reklamację w pana imieniu i obniżka pojawi się na następnej fakturze.", "Yes, you're entitled to a reduction. I'll file the complaint on your behalf and the reduction will appear on your next invoice.", "हो, तपाईंले छुट पाउनुहुन्छ। म तपाईंको तर्फबाट उजुरी दर्ता गर्छु र छुट अर्को बिलमा देखिन्छ।"],
      ["Ram", "Świetnie. Poproszę jeszcze numer zgłoszenia.", "Great. I'd also like the reference number, please.", "राम्रो। उजुरीको नम्बर पनि दिनुहोस् न।"],
      ["Konsultant", "Oczywiście, wyślę go panu SMS-em.", "Of course, I'll send it to you by text message.", "अवश्य, म एसएमएसबाट पठाउँछु।"]
    ],
    questions: [
      { q: "Od kiedy Ram nie ma internetu?", en: "Since when has Ram had no internet?", ne: "रामको इन्टरनेट कहिलेदेखि छैन?",
        options: ["Od wczoraj.", "Od trzech dni.", "Od tygodnia."], answer: 1,
        why: { en: "*Od trzech dni nie mam internetu* – for three days. *Od* + time = for / since.",
               ne: "*Od trzech dni nie mam internetu* – तीन दिनदेखि। *od* + समय = …देखि।" } },
      { q: "Co Ram już zrobił?", en: "What has Ram already done?", ne: "रामले पहिल्यै के गरिसके?",
        options: ["Wezwał technika.", "Kupił nowy router.", "Dwa razy zrestartował router."], answer: 2,
        why: { en: "To the question about restarting he says *tak, dwa razy* – yes, twice.",
               ne: "रिस्टार्टबारे सोध्दा उनी *tak, dwa razy* भन्छन् – हो, दुई पटक।" } },
      { q: "Kiedy przyjdzie technik?", en: "When will the technician come?", ne: "प्राविधिक कहिले आउँछन्?",
        options: ["We wtorek między dwunastą a szesnastą.", "W czwartek rano.", "Jutro o dwunastej."], answer: 0,
        why: { en: "*Najbliższy termin to wtorek, między dwunastą a szesnastą* – Tuesday, 12:00–16:00.",
               ne: "*Najbliższy termin to wtorek, między dwunastą a szesnastą* – मंगलबार, १२:०० देखि १६:०० बीच।" } },
      { q: "Jak Ram dostanie pieniądze za dni bez internetu?", en: "How will Ram get money for the days without internet?", ne: "इन्टरनेट नभएका दिनको पैसा रामले कसरी पाउँछन्?",
        options: ["Gotówką od technika.", "Przelewem jutro.", "Jako obniżkę na następnej fakturze."], answer: 2,
        why: { en: "*Obniżka pojawi się na następnej fakturze* – a reduction on the next invoice. *Reklamacja* is the official word for a complaint.",
               ne: "*Obniżka pojawi się na następnej fakturze* – अर्को बिलमा छुट। *reklamacja* भनेको आधिकारिक उजुरी हो।" } }
    ]
  },

  {
    id: "ls-b1-05", level: "B1", type: "conversation",
    title: "An accident in the warehouse", titleNe: "गोदाममा भएको दुर्घटना",
    context: { en: "At the start of your shift your colleague Bartek tells you what happened yesterday.",
               ne: "सिफ्टको सुरुमा तपाईंको सहकर्मी बार्तेकले हिजो के भयो भनेर सुनाउँछन्।" },
    lines: [
      ["Bartek", "Słyszałeś, co się wczoraj stało na drugiej zmianie?", "Did you hear what happened on the second shift yesterday?", "हिजो दोस्रो सिफ्टमा के भयो, सुन्यौ?"],
      ["Ram", "Nie, co się stało?", "No, what happened?", "अहँ, के भयो?"],
      ["Bartek", "No, paleta spadła z regału, bo wózek widłowy uderzył w półkę. Na szczęście nikt nie stał obok.", "Well, a pallet fell off the rack because a forklift hit the shelf. Luckily nobody was standing nearby.", "खै, फोर्कलिफ्टले र्‍याकमा ठोक्दा प्यालेट तल खस्यो। भाग्यवश नजिकै कोही थिएन।"],
      ["Ram", "O rany! Kto prowadził wózek?", "Oh no! Who was driving the forklift?", "बाप रे! फोर्कलिफ्ट कसले चलाउँदै थियो?"],
      ["Bartek", "Ten nowy, Kuba. Jechał za szybko i patrzył w telefon.", "The new guy, Kuba. He was driving too fast and looking at his phone.", "त्यो नयाँ केटा, कुबा। ऊ धेरै छिटो चलाउँदै थियो र फोन हेर्दै थियो।"],
      ["Ram", "To bardzo niebezpieczne. Ktoś to zgłosił?", "That's very dangerous. Did someone report it?", "यो त धेरै खतरनाक हो। कसैले रिपोर्ट गर्‍यो?"],
      ["Bartek", "Tak, brygadzista od razu spisał raport. I kierownik mówi, że od poniedziałku telefony w strefie wózków są zakazane.", "Yes, the foreman wrote a report straight away. And the manager says that from Monday phones are banned in the forklift zone.", "हो, फोरम्यानले तुरुन्तै रिपोर्ट लेखे। अनि म्यानेजर भन्छन्, सोमबारदेखि फोर्कलिफ्ट क्षेत्रमा फोन चलाउन पूरै प्रतिबन्ध छ।"],
      ["Ram", "A co z tym regałem?", "And what about that rack?", "अनि त्यो र्‍याकको के भयो?"],
      ["Bartek", "Jest zamknięty, dopóki nie sprawdzi go specjalista. Nie wolno stamtąd brać towaru.", "It's closed until a specialist checks it. You mustn't take goods from there.", "विशेषज्ञले जाँच नगरेसम्म बन्द छ। त्यहाँबाट सामान निकाल्न पाइँदैन।"],
      ["Ram", "Dobrze wiedzieć. Zawsze noszę kask i kamizelkę, ale chyba muszę bardziej uważać.", "Good to know. I always wear a helmet and a vest, but I guess I need to be more careful.", "थाहा पाएर राम्रो भयो। म सधैं हेलमेट र भेस्ट लगाउँछु, तर अझै होसियार हुनुपर्ने रहेछ।"],
      ["Bartek", "No, wszyscy musimy. W czwartek jest dodatkowe szkolenie BHP, obowiązkowe dla wszystkich.", "Yeah, we all do. On Thursday there's an extra health and safety training, compulsory for everyone.", "हो, हामी सबैले। बिहीबार थप सुरक्षा तालिम छ, सबैका लागि अनिवार्य।"]
    ],
    questions: [
      { q: "Co się stało wczoraj?", en: "What happened yesterday?", ne: "हिजो के भयो?",
        options: ["Ktoś spadł z regału.", "Paleta spadła z regału.", "Wózek się zepsuł."], answer: 1,
        why: { en: "*Paleta spadła z regału* – a pallet fell off the rack. *Nikt nie stał obok* – nobody was hurt.",
               ne: "*Paleta spadła z regału* – र्‍याकबाट प्यालेट खस्यो। *nikt nie stał obok* – कसैलाई चोट लागेन।" } },
      { q: "Dlaczego doszło do wypadku?", en: "Why did the accident happen?", ne: "दुर्घटना किन भयो?",
        options: ["Kierowca wózka jechał za szybko i patrzył w telefon.", "Regał był stary.", "Ktoś źle położył paletę."], answer: 0,
        why: { en: "*Jechał za szybko i patrzył w telefon* – he drove too fast and looked at his phone. That's why phones are now banned.",
               ne: "*Jechał za szybko i patrzył w telefon* – ऊ छिटो चलाउँदै र फोन हेर्दै थियो। त्यसैले अब फोनमा प्रतिबन्ध लगाइयो।" } },
      { q: "Jaka nowa zasada obowiązuje od poniedziałku?", en: "What new rule applies from Monday?", ne: "सोमबारदेखि कुन नयाँ नियम लागू हुन्छ?",
        options: ["Wszyscy muszą nosić kask.", "Nowi pracownicy nie mogą jeździć wózkiem.", "Telefony w strefie wózków są zakazane."], answer: 2,
        why: { en: "*Od poniedziałku telefony w strefie wózków są zakazane.* *Zakazane* = forbidden.",
               ne: "*Od poniedziałku telefony w strefie wózków są zakazane.* *zakazane* = निषेधित।" } },
      { q: "Co będzie w czwartek?", en: "What will happen on Thursday?", ne: "बिहीबार के हुन्छ?",
        options: ["Kontrola regałów.", "Obowiązkowe szkolenie BHP.", "Zebranie z kierownikiem."], answer: 1,
        why: { en: "*W czwartek jest dodatkowe szkolenie BHP, obowiązkowe dla wszystkich.* *BHP* = health and safety at work.",
               ne: "*W czwartek jest dodatkowe szkolenie BHP, obowiązkowe dla wszystkich.* *BHP* = कार्यस्थलको स्वास्थ्य र सुरक्षा।" } }
    ]
  },

  // ───────────────────────────── B2 ─────────────────────────────

  {
    id: "ls-b2-01", level: "B2", type: "radio",
    title: "News: transport strike", titleNe: "समाचार: यातायात हडताल",
    context: { en: "You hear the morning news on the radio while making breakfast.",
               ne: "बिहानको खाजा बनाउँदै गर्दा तपाईं रेडियोमा बिहानको समाचार सुन्नुहुन्छ।" },
    lines: [
      ["Prezenterka", "Jest godzina siódma, zapraszamy na wiadomości.", "It's seven o'clock, welcome to the news.", "सात बजेको छ, समाचारमा स्वागत छ।"],
      ["Prezenterka", "W poniedziałek kierowcy autobusów i motorniczowie tramwajów w naszym mieście rozpoczną strajk ostrzegawczy. Między szóstą a ósmą rano pojazdy nie wyjadą z zajezdni.", "On Monday bus drivers and tram drivers in our city will begin a warning strike. Between six and eight in the morning, vehicles will not leave the depots.", "सोमबार हाम्रो सहरका बस चालक र ट्राम चालकहरूले चेतावनीमूलक हडताल सुरु गर्दैछन्। बिहान छ देखि आठ बजेसम्म गाडीहरू डिपोबाट निस्कने छैनन्।"],
      ["Prezenterka", "Chodzi przede wszystkim o płace. Związkowcy twierdzą, że od kilku lat pensje nie nadążają za rosnącymi cenami, zwłaszcza żywności i mieszkań.", "It's mainly about pay. Union members say that for several years wages have not kept up with rising prices, especially of food and housing.", "मुख्य कुरा तलबको हो। युनियनका सदस्यहरू भन्छन्, केही वर्षदेखि तलब बढ्दो महँगी, खासगरी खाना र घरभाडासँग तालमेल राख्न सकेको छैन।"],
      ["Kierowca", "No wie pani, wszystko idzie w górę: czynsz, prąd, zakupy... a my od dwóch lat stoimy w miejscu. Nikt nie chce strajkować, ale, znaczy, nie mamy wyjścia.", "Well, you know, everything is going up: rent, electricity, shopping... and we've been stuck in the same place for two years. Nobody wants to strike, but, I mean, we have no choice.", "हेर्नुस् न, सबै कुरा महँगो हुँदैछ: भाडा, बिजुली, किनमेल... अनि हाम्रो तलब दुई वर्षदेखि उस्तै छ। कसैलाई हडताल गर्न मन छैन, तर, मतलब, अरू उपाय छैन।"],
      ["Prezenterka", "Władze miasta odpowiadają, że budżet jest napięty, ale deklarują gotowość do dalszych rozmów.", "The city authorities reply that the budget is tight, but they say they are ready for further talks.", "नगर प्रशासन भन्छ, बजेट कसिलो छ, तर थप वार्ताका लागि तयार रहेको बताउँछ।"],
      ["Prezenterka", "Jeśli do końca miesiąca nie dojdzie do porozumienia, związkowcy nie wykluczają strajku generalnego.", "If no agreement is reached by the end of the month, the unions do not rule out a general strike.", "महिनाको अन्त्यसम्म सहमति भएन भने युनियनले आम हडताल पनि हुन सक्ने बताएका छन्।"],
      ["Prezenterka", "Ratusz radzi pasażerom, żeby w poniedziałek wcześniej zaplanowali podróż, skorzystali z pociągów podmiejskich albo, jeśli to możliwe, pracowali zdalnie.", "City hall advises passengers to plan their journey earlier on Monday, use suburban trains or, if possible, work from home.", "नगरपालिकाले यात्रुहरूलाई सोमबार यात्रा अगाडि नै योजना बनाउन, उपनगरीय रेल प्रयोग गर्न, वा सम्भव भए घरबाटै काम गर्न सल्लाह दिएको छ।"]
    ],
    questions: [
      { q: "Kiedy autobusy i tramwaje nie będą jeździć?", en: "When will buses and trams not run?", ne: "बस र ट्राम कहिले चल्दैनन्?",
        options: ["Cały poniedziałek.", "W poniedziałek między szóstą a ósmą rano.", "Do końca miesiąca."], answer: 1,
        why: { en: "*Między szóstą a ósmą rano pojazdy nie wyjadą z zajezdni.* A *strajk ostrzegawczy* (warning strike) is short – only two hours here.",
               ne: "*Między szóstą a ósmą rano pojazdy nie wyjadą z zajezdni.* *strajk ostrzegawczy* (चेतावनीमूलक हडताल) छोटो हुन्छ – यहाँ दुई घण्टा मात्र।" } },
      { q: "O co głównie chodzi strajkującym?", en: "What do the strikers mainly want?", ne: "हडताल गर्नेहरूको मुख्य माग के हो?",
        options: ["O krótsze zmiany.", "O nowe autobusy.", "O wyższe płace, bo ceny rosną."], answer: 2,
        why: { en: "*Chodzi przede wszystkim o płace* – wages don't keep up with prices (*nie nadążają za rosnącymi cenami*). The driver confirms: rent and electricity go up, pay stays the same.",
               ne: "*Chodzi przede wszystkim o płace* – तलब महँगीसँगै बढेको छैन (*nie nadążają za rosnącymi cenami*)। चालक पनि भन्छन्: भाडा र बिजुली महँगो, तलब उस्तै।" } },
      { q: "Co może się stać, jeśli nie będzie porozumienia do końca miesiąca?", en: "What may happen if there is no agreement by the end of the month?", ne: "महिनाको अन्त्यसम्म सहमति नभए के हुन सक्छ?",
        options: ["Strajk generalny.", "Nic, rozmowy będą trwały.", "Miasto podniesie ceny biletów."], answer: 0,
        why: { en: "*Związkowcy nie wykluczają strajku generalnego* – they don't rule out a general strike. *Nie wykluczać* = to not rule out, i.e. it's possible.",
               ne: "*Związkowcy nie wykluczają strajku generalnego* – आम हडतालको सम्भावना नकार्दैनन्। *nie wykluczać* = सम्भव छ भन्नु।" } },
      { q: "Czego ratusz NIE radzi pasażerom?", en: "What does city hall NOT advise passengers to do?", ne: "नगरपालिकाले यात्रुहरूलाई के गर्न सल्लाह दिएको छैन?",
        options: ["Pracować zdalnie.", "Jechać pociągiem podmiejskim.", "Zostać w poniedziałek w domu bez pracy."], answer: 2,
        why: { en: "The advice is: plan earlier, use suburban trains or work remotely *if possible*. Nobody says to skip work – if you'll be late, tell your supervisor early.",
               ne: "सल्लाह यस्तो छ: यात्रा अगाडि नै योजना बनाउने, उपनगरीय रेल चढ्ने वा *सम्भव भए* घरबाट काम गर्ने। कामबाट बिदा बस्न कसैले भनेको छैन – ढिलो हुने भए सुपरभाइजरलाई चाँडै खबर गर्नुहोस्।" } }
    ]
  },

  {
    id: "ls-b2-02", level: "B2", type: "phone",
    title: "A job interview by phone", titleNe: "फोनमा जागिरको अन्तर्वार्ता",
    context: { en: "You applied for a forklift operator job. A recruiter from an agency calls you for a short first interview.",
               ne: "तपाईंले फोर्कलिफ्ट अपरेटरको जागिरका लागि आवेदन दिनुभयो। एउटा एजेन्सीकी भर्ती अधिकारीले छोटो प्रारम्भिक अन्तर्वार्ताका लागि फोन गर्छिन्।" },
    lines: [
      ["Rekruterka", "Dzień dobry, Karolina Mazur z agencji pracy Horyzont. Czy to dobry moment na krótką rozmowę?", "Hello, Karolina Mazur from the Horyzont job agency. Is this a good moment for a short conversation?", "नमस्ते, म होरिजोन्ट रोजगार एजेन्सीबाट कारोलिना माजुर। छोटो कुराकानीका लागि यो ठीक समय हो?"],
      ["Ram", "Tak, oczywiście, słucham.", "Yes, of course, go ahead.", "हजुर, अवश्य, भन्नुहोस्।"],
      ["Rekruterka", "Super. Aplikował pan na stanowisko operatora wózka widłowego. Proszę mi tak w skrócie powiedzieć o swoim doświadczeniu.", "Great. You applied for the position of forklift operator. Please tell me briefly about your experience.", "राम्रो। तपाईंले फोर्कलिफ्ट अपरेटरको पदका लागि आवेदन दिनुभएको छ। आफ्नो अनुभवबारे छोटकरीमा भन्नुहोस् त।"],
      ["Ram", "Pracuję w magazynie od trzech lat, z czego od dwóch jako operator wózka. Mam polskie uprawnienia UDT.", "I've worked in a warehouse for three years, the last two as a forklift operator. I have the Polish UDT licence.", "म तीन वर्षदेखि गोदाममा काम गर्छु, त्यसमध्ये दुई वर्षदेखि फोर्कलिफ्ट अपरेटरको रूपमा। मसँग पोल्याण्डको UDT लाइसेन्स छ।"],
      ["Rekruterka", "Bardzo dobrze. A jak u pana z polskim? Bo wie pan, dokumentacja i szkolenia BHP są tylko po polsku.", "Very good. And how is your Polish? Because, you know, the paperwork and safety trainings are only in Polish.", "धेरै राम्रो। अनि तपाईंको पोलिश कस्तो छ? किनभने, थाहै छ, कागजपत्र र सुरक्षा तालिम पोलिशमा मात्र हुन्छ।"],
      ["Ram", "Rozumiem prawie wszystko, a mówię, no, komunikatywnie. Cały czas się uczę, chodzę na kurs.", "I understand almost everything, and I speak, well, well enough to communicate. I'm learning all the time, I go to a course.", "म लगभग सबै बुझ्छु, र बोल्न, खै, काम चल्ने गरी बोल्छु। म निरन्तर सिक्दैछु, कक्षामा पनि जान्छु।"],
      ["Rekruterka", "W porządku. Praca jest w systemie trzyzmianowym, również w nocy. Czy to dla pana problem?", "All right. The work is in a three-shift system, including nights. Is that a problem for you?", "ठीक छ। काम तीन सिफ्टमा हुन्छ, रातिको सिफ्ट पनि। तपाईंलाई समस्या हुन्छ?"],
      ["Ram", "Nie, wolałbym tylko znać grafik z wyprzedzeniem.", "No, I'd just prefer to know the schedule in advance.", "हुँदैन, तर तालिका अगाडि नै थाहा पाए राम्रो हुन्थ्यो।"],
      ["Rekruterka", "Grafik jest na miesiąc do przodu. Stawka na start to trzydzieści dwa złote brutto za godzinę plus dodatek za noce.", "The schedule is made a month ahead. The starting rate is thirty-two złoty gross per hour plus a night bonus.", "तालिका एक महिना अगाडि नै बन्छ। सुरुको दर प्रतिघण्टा बत्तीस ज्लोती (कर कट्टीअघि) र रातिको भत्ता छुट्टै।"],
      ["Ram", "Szczerze mówiąc, liczyłem na trochę więcej, bo mam doświadczenie. Czy jest szansa na podwyżkę po okresie próbnym?", "To be honest, I was hoping for a bit more, because I have experience. Is there a chance of a raise after the probation period?", "साँचो भन्नुपर्दा, मसँग अनुभव भएकाले अलि बढीको आशा गरेको थिएँ। परीक्षणकालपछि तलब बढ्ने सम्भावना छ?"],
      ["Rekruterka", "Tak, po trzech miesiącach jest ocena i, znaczy, zwykle wtedy stawka rośnie. Zapraszam pana na rozmowę na miejscu w środę o dziesiątej.", "Yes, after three months there's an evaluation and, I mean, the rate usually goes up then. I invite you to an interview on site on Wednesday at ten.", "हो, तीन महिनापछि मूल्यांकन हुन्छ र, मतलब, प्रायः त्यतिबेला दर बढ्छ। बुधबार दस बजे कार्यस्थलमै अन्तर्वार्ताका लागि आउनुहोस्।"]
    ],
    questions: [
      { q: "Od ilu lat Ram pracuje jako operator wózka?", en: "For how many years has Ram worked as a forklift operator?", ne: "राम कति वर्षदेखि फोर्कलिफ्ट अपरेटरको काम गर्दैछन्?",
        options: ["Od trzech lat.", "Od dwóch lat.", "Od roku."], answer: 1,
        why: { en: "*Od trzech lat* is his total time in the warehouse; *z czego od dwóch jako operator* – of which two years as an operator. *Z czego* = \"of which\".",
               ne: "*Od trzech lat* गोदाममा काम गरेको जम्मा समय हो; *z czego od dwóch jako operator* – त्यसमध्ये दुई वर्ष अपरेटरको रूपमा। *z czego* = \"त्यसमध्ये\"।" } },
      { q: "Dlaczego dobry polski jest ważny w tej pracy?", en: "Why is good Polish important in this job?", ne: "यस काममा राम्रो पोलिश किन महत्त्वपूर्ण छ?",
        options: ["Bo dokumentacja i szkolenia BHP są tylko po polsku.", "Bo Ram będzie rozmawiał z klientami.", "Bo kierownik nie mówi po angielsku."], answer: 0,
        why: { en: "*Dokumentacja i szkolenia BHP są tylko po polsku* – paperwork and safety trainings are only in Polish.",
               ne: "*Dokumentacja i szkolenia BHP są tylko po polsku* – कागजपत्र र सुरक्षा तालिम पोलिशमा मात्र हुन्छ।" } },
      { q: "Jaka jest stawka na start?", en: "What is the starting rate?", ne: "सुरुको दर कति हो?",
        options: ["Trzydzieści dwa złote netto za godzinę.", "Dwadzieścia trzy złote brutto za godzinę.", "Trzydzieści dwa złote brutto za godzinę."], answer: 2,
        why: { en: "*Trzydzieści dwa złote brutto za godzinę.* *Brutto* = before tax and contributions; what you actually receive (*netto*) is less. Always ask which one is meant.",
               ne: "*Trzydzieści dwa złote brutto za godzinę.* *brutto* = कर र योगदान कट्टी गर्नुअघिको रकम; हातमा आउने (*netto*) यो भन्दा कम हुन्छ। सधैं कुन हो भनेर सोध्नुहोस्।" } },
      { q: "Co się dzieje po okresie próbnym?", en: "What happens after the probation period?", ne: "परीक्षणकालपछि के हुन्छ?",
        options: ["Ram musi zmienić stanowisko.", "Jest ocena i zwykle podwyżka.", "Kończy się umowa."], answer: 1,
        why: { en: "*Po trzech miesiącach jest ocena i zwykle wtedy stawka rośnie* – an evaluation, and the rate usually rises. Asking politely about a raise, as Ram does, is normal in Poland.",
               ne: "*Po trzech miesiącach jest ocena i zwykle wtedy stawka rośnie* – मूल्यांकन हुन्छ र प्रायः दर बढ्छ। रामले जस्तै शिष्ट तरिकाले तलबवृद्धिबारे सोध्नु पोल्याण्डमा सामान्य कुरा हो।" } }
    ]
  },

  {
    id: "ls-b2-03", level: "B2", type: "conversation",
    title: "Getting the deposit back", titleNe: "धरौटी फिर्ता लिँदै",
    context: { en: "You are moving out. The landlady has checked the flat and wants to keep part of your 3,000 zł deposit.",
               ne: "तपाईं फ्ल्याट छोड्दै हुनुहुन्छ। घरबेटीले फ्ल्याट जाँचेर तपाईंको ३,००० ज्लोती धरौटीको केही भाग राख्न चाहन्छिन्।" },
    lines: [
      ["Pani Jadwiga", "No więc obejrzałam mieszkanie i, szczerze mówiąc, muszę zatrzymać część kaucji.", "So, I've looked at the flat and, to be honest, I have to keep part of the deposit.", "त्यसो भए, मैले फ्ल्याट हेरें र, साँचो भन्नुपर्दा, धरौटीको केही भाग राख्नैपर्छ।"],
      ["Ram", "Rozumiem, ale co dokładnie jest nie tak?", "I understand, but what exactly is wrong?", "बुझें, तर ठ्याक्कै के गडबड छ?"],
      ["Pani Jadwiga", "Ściana w pokoju jest porysowana, a w kuchni jest dziura po wieszaku. Malowanie to, wie pan, minimum osiemset złotych.", "The wall in the room is scratched, and there's a hole from a hook in the kitchen. Painting is, you know, at least eight hundred złoty.", "कोठाको भित्ता कोरिएको छ, अनि भान्सामा ह्याङ्गरको प्वाल छ। रङ लगाउन, थाहै छ, कम्तीमा आठ सय ज्लोती लाग्छ।"],
      ["Ram", "Ta dziura w kuchni była już, kiedy się wprowadzałem. Mam zdjęcia z protokołu zdawczo-odbiorczego.", "That hole in the kitchen was already there when I moved in. I have photos from the handover report.", "भान्साको त्यो प्वाल म सरेर आउँदा नै थियो। मसँग हस्तान्तरण प्रतिवेदनका फोटोहरू छन्।"],
      ["Pani Jadwiga", "Zdjęcia? No... pokaże mi pan?", "Photos? Well... will you show me?", "फोटो? ल... देखाउनुहोस् त।"],
      ["Ram", "Proszę, tutaj. Data jest z dnia, kiedy się wprowadziłem.", "Here you are. The date is from the day I moved in.", "यी हेर्नुहोस्। मिति म सरेर आएकै दिनको छ।"],
      ["Pani Jadwiga", "Hm, faktycznie. No dobrze, kuchnia odpada. Ale ta ściana w pokoju...", "Hm, that's true. All right, the kitchen is off the list. But that wall in the room...", "हम्, साँच्चै रहेछ। ल ठीक छ, भान्साको कुरा हटाऊँ। तर कोठाको त्यो भित्ता…"],
      ["Ram", "Zgadzam się, rysy na ścianie są moje. Ale osiemset złotych za jedną ścianę to za dużo. Może trzysta?", "I agree, the scratches on the wall are mine. But eight hundred złoty for one wall is too much. Maybe three hundred?", "म मान्छु, भित्ताका धर्साहरू मेरै कारणले हो। तर एउटा भित्ताको आठ सय ज्लोती धेरै भयो। तीन सय गरौं कि?"],
      ["Pani Jadwiga", "Czterysta i się dogadamy. Resztę kaucji, czyli dwa tysiące sześćset złotych, przeleję panu w ciągu tygodnia.", "Four hundred and we have a deal. The rest of the deposit, that is two thousand six hundred złoty, I'll transfer to you within a week.", "चार सय भए सहमति हुन्छ। बाँकी धरौटी, अर्थात् दुई हजार छ सय ज्लोती, एक हप्ताभित्र तपाईंको खातामा पठाउँछु।"],
      ["Ram", "Dobrze, czterysta. Tylko zapiszmy to w protokole i oboje podpiszmy, dobrze?", "OK, four hundred. But let's write it in the report and both sign it, OK?", "हुन्छ, चार सय। तर यो कुरा प्रतिवेदनमा लेखौं र दुवैले हस्ताक्षर गरौं, हुन्छ?"],
      ["Pani Jadwiga", "Zgoda. Znaczy, tak będzie uczciwie.", "Agreed. I mean, that's fair.", "ठीक छ। मतलब, यसो गर्दा न्यायोचित हुन्छ।"]
    ],
    questions: [
      { q: "Dlaczego właścicielka chce zatrzymać część kaucji?", en: "Why does the landlady want to keep part of the deposit?", ne: "घरबेटी किन धरौटीको केही भाग राख्न चाहन्छिन्?",
        options: ["Bo Ram nie zapłacił czynszu.", "Bo ściana jest porysowana i w kuchni jest dziura.", "Bo Ram zgubił klucze."], answer: 1,
        why: { en: "*Ściana w pokoju jest porysowana, a w kuchni jest dziura po wieszaku.*",
               ne: "*Ściana w pokoju jest porysowana, a w kuchni jest dziura po wieszaku.* – कोठाको भित्ता कोरिएको र भान्सामा प्वाल।" } },
      { q: "Jak Ram udowodnił, że dziura w kuchni była wcześniej?", en: "How did Ram prove the kitchen hole was there before?", ne: "भान्साको प्वाल पहिले नै थियो भनेर रामले कसरी प्रमाणित गरे?",
        options: ["Pokazał zdjęcia z protokołu z dnia wprowadzenia.", "Zadzwonił do poprzedniego lokatora.", "Pokazał umowę najmu."], answer: 0,
        why: { en: "*Mam zdjęcia z protokołu zdawczo-odbiorczego* – photos from the handover report, dated the day he moved in. Tip: always photograph a flat when you move in.",
               ne: "*Mam zdjęcia z protokołu zdawczo-odbiorczego* – सरेर आएकै दिनको मिति भएको हस्तान्तरण प्रतिवेदनका फोटो। सुझाव: फ्ल्याटमा सर्दा सधैं फोटो खिच्नुहोस्।" } },
      { q: "Ile pieniędzy z kaucji zatrzyma właścicielka?", en: "How much of the deposit will the landlady keep?", ne: "घरबेटीले धरौटीबाट कति राख्छिन्?",
        options: ["Osiemset złotych.", "Trzysta złotych.", "Czterysta złotych."], answer: 2,
        why: { en: "She asked for 800, Ram offered 300, they agreed on *czterysta* (400): *Czterysta i się dogadamy* – \"four hundred and we have a deal\".",
               ne: "उनले ८०० मागिन्, रामले ३०० भने, अन्त्यमा *czterysta* (४००) मा सहमति भयो: *Czterysta i się dogadamy* – \"चार सय भए कुरा मिल्छ\"।" } },
      { q: "Co Ram chce zrobić na koniec?", en: "What does Ram want to do at the end?", ne: "अन्त्यमा राम के गर्न चाहन्छन्?",
        options: ["Zapisać umowę w protokole i oboje podpisać.", "Zapłacić gotówką od razu.", "Zadzwonić do prawnika."], answer: 0,
        why: { en: "*Zapiszmy to w protokole i oboje podpiszmy* – a signed written record protects both sides if there is a dispute later.",
               ne: "*Zapiszmy to w protokole i oboje podpiszmy* – हस्ताक्षर भएको लिखित प्रमाणले पछि विवाद भए दुवै पक्षलाई सुरक्षा दिन्छ।" } }
    ]
  },

  {
    id: "ls-b2-04", level: "B2", type: "voicemail",
    title: "A message from the bank", titleNe: "बैंकबाट आएको सन्देश",
    context: { en: "You find a voicemail from your bank's security department about your card.",
               ne: "तपाईंको कार्डबारे बैंकको सुरक्षा विभागबाट आएको भ्वाइसमेल भेट्टाउनुहुन्छ।" },
    lines: [
      ["Konsultantka", "Dzień dobry, tu Agnieszka z działu bezpieczeństwa Banku Zielonego. Wiadomość dla pana Rama Thapy.", "Good morning, this is Agnieszka from the security department of Bank Zielony. A message for Mr Ram Thapa.", "नमस्ते, म बैंक जिएलोनीको सुरक्षा विभागबाट आग्निएश्का। राम थापाजीका लागि सन्देश।"],
      ["Konsultantka", "Dzwonię w sprawie, no, podejrzanej transakcji na pana karcie debetowej.", "I'm calling about, well, a suspicious transaction on your debit card.", "तपाईंको डेबिट कार्डमा भएको, खै, शंकास्पद कारोबारबारे फोन गरेकी हुँ।"],
      ["Konsultantka", "Dziś o trzeciej czterdzieści w nocy ktoś próbował zapłacić pana kartą tysiąc dwieście złotych w zagranicznym sklepie internetowym.", "Today at three forty in the night someone tried to pay one thousand two hundred złoty with your card in a foreign online shop.", "आज राति तीन बजेर चालीस मिनेटमा कसैले तपाईंको कार्डबाट विदेशी अनलाइन पसलमा एक हजार दुई सय ज्लोती तिर्न खोज्यो।"],
      ["Konsultantka", "Ze względów bezpieczeństwa czasowo zablokowaliśmy kartę.", "For security reasons we have temporarily blocked the card.", "सुरक्षाका कारण हामीले कार्ड अस्थायी रूपमा बन्द गरेका छौं।"],
      ["Konsultantka", "Jeśli to nie była pana transakcja, proszę oddzwonić na numer infolinii, który jest na odwrocie karty albo w aplikacji banku.", "If it wasn't your transaction, please call back on the helpline number printed on the back of the card or in the bank's app.", "यदि यो कारोबार तपाईंले गर्नुभएको होइन भने, कार्डको पछाडि वा बैंकको एपमा रहेको हेल्पलाइन नम्बरमा फोन गर्नुहोस्।"],
      ["Konsultantka", "I bardzo ważne: bank nigdy nie prosi o PIN, pełny numer karty, hasła ani kody z SMS-ów. Jeśli ktoś o to prosi, to na pewno nie jest pracownik banku. Proszę się wtedy od razu rozłączyć.", "And very important: the bank never asks for your PIN, full card number, passwords or codes from text messages. If someone asks for that, then, I mean, it's definitely not a bank employee. Please hang up immediately.", "अनि धेरै महत्त्वपूर्ण: बैंकले कहिल्यै PIN, कार्डको पूरा नम्बर, पासवर्ड वा एसएमएसमा आएको कोड माग्दैन। कसैले यस्तो माग्छ भने, मतलब, त्यो पक्कै बैंकको कर्मचारी होइन। त्यसबेला तुरुन्तै फोन काट्नुहोस्।"],
      ["Konsultantka", "Nie musi pan też instalować żadnych aplikacji ani przelewać pieniędzy na tak zwane bezpieczne konto. Dziękuję i do usłyszenia.", "You also don't need to install any apps or transfer money to a so-called safe account. Thank you, goodbye.", "तपाईंले कुनै एप इन्स्टल गर्नु वा तथाकथित सुरक्षित खातामा पैसा पठाउनु पनि पर्दैन। धन्यवाद, फेरि कुरा गरौंला।"]
    ],
    questions: [
      { q: "Dlaczego dzwoni bank?", en: "Why is the bank calling?", ne: "बैंकले किन फोन गर्‍यो?",
        options: ["Bo Ram ma dług.", "Bo była podejrzana transakcja na karcie.", "Bo karta jest nieważna."], answer: 1,
        why: { en: "*W sprawie podejrzanej transakcji* – about a suspicious transaction: someone tried to pay 1,200 zł at night in a foreign online shop.",
               ne: "*W sprawie podejrzanej transakcji* – शंकास्पद कारोबारबारे: कसैले राति विदेशी अनलाइन पसलमा १,२०० ज्लोती तिर्न खोज्यो।" } },
      { q: "Co bank zrobił z kartą?", en: "What did the bank do with the card?", ne: "बैंकले कार्डलाई के गर्‍यो?",
        options: ["Zablokował ją czasowo.", "Wysłał nową kartę.", "Nic, karta działa."], answer: 0,
        why: { en: "*Czasowo zablokowaliśmy kartę* – we temporarily blocked the card. *Czasowo* = for a time.",
               ne: "*Czasowo zablokowaliśmy kartę* – कार्ड अस्थायी रूपमा बन्द गर्‍यौं। *czasowo* = केही समयका लागि।" } },
      { q: "Na jaki numer Ram powinien oddzwonić?", en: "Which number should Ram call back?", ne: "रामले कुन नम्बरमा फोन गर्नुपर्छ?",
        options: ["Na numer, z którego przyszła wiadomość.", "Na numer podany na odwrocie karty albo w aplikacji banku.", "Na numer policji."], answer: 1,
        why: { en: "*Numer infolinii, który jest na odwrocie karty albo w aplikacji.* Always use the number from the card or the app, never one given in a call: fraudsters can fake a bank's caller ID.",
               ne: "*Numer infolinii, który jest na odwrocie karty albo w aplikacji.* सधैं कार्ड वा एपमा भएको नम्बर प्रयोग गर्नुहोस्, फोनमा दिइएको नम्बर होइन: ठगहरूले बैंकको नम्बर देखिने गरी नक्कली फोन गर्न सक्छन्।" } },
      { q: "O co bank NIGDY nie prosi?", en: "What does the bank NEVER ask for?", ne: "बैंकले कहिल्यै के माग्दैन?",
        options: ["O imię i nazwisko.", "O informację, czy to była pana transakcja.", "O PIN i kody z SMS-ów."], answer: 2,
        why: { en: "*Bank nigdy nie prosi o PIN, pełny numer karty, hasła ani kody z SMS-ów.* Never give your PIN to anyone – if someone asks, hang up. The same goes for \"install this app\" or \"move money to a safe account\".",
               ne: "*Bank nigdy nie prosi o PIN, pełny numer karty, hasła ani kody z SMS-ów.* आफ्नो PIN कसैलाई कहिल्यै नदिनुहोस् – कसैले मागे फोन काटिदिनुहोस्। \"यो एप इन्स्टल गर्नुहोस्\" वा \"सुरक्षित खातामा पैसा सार्नुहोस्\" भन्दा पनि त्यस्तै गर्नुहोस्।" } }
    ]
  },

  {
    id: "ls-b2-05", level: "B2", type: "conversation",
    title: "Team meeting: new rules", titleNe: "टोली बैठक: नयाँ नियमहरू",
    context: { en: "Before the shift, your manager Ewa holds a short meeting about new rules in the factory.",
               ne: "सिफ्ट सुरु हुनुअघि तपाईंकी म्यानेजर एभाले कारखानाका नयाँ नियमबारे छोटो बैठक गर्छिन्।" },
    lines: [
      ["Ewa", "Dobra, zaczynamy, bo mamy tylko piętnaście minut. Od pierwszego listopada wchodzą nowe zasady na hali.", "OK, let's start, because we only have fifteen minutes. From the first of November new rules come in on the shop floor.", "ल, सुरु गरौं, किनभने हामीसँग पन्ध्र मिनेट मात्र छ। नोभेम्बर एक तारिखदेखि कारखानामा नयाँ नियम लागू हुँदैछन्।"],
      ["Ewa", "Po pierwsze, znaczy, najważniejsze: wszyscy rejestrują wejście i wyjście kartą. Koniec z wpisywaniem godzin na kartce.", "First, I mean, most importantly: everyone registers coming in and going out with a card. No more writing hours on a sheet.", "पहिलो, मतलब, सबैभन्दा महत्त्वपूर्ण: सबैले आउँदा र जाँदा कार्डले दर्ता गर्नुपर्छ। कागजमा समय लेख्ने चलन अब बन्द।"],
      ["Marta", "A jak ktoś zapomni karty?", "And if someone forgets their card?", "अनि कसैले कार्ड बिर्स्यो भने?"],
      ["Ewa", "To idzie do ochrony i dostaje kartę tymczasową. Ale, no, trzy razy w miesiącu i jest rozmowa z kierownikiem.", "Then they go to security and get a temporary card. But, well, three times in a month and there's a talk with the manager.", "त्यसो भए सुरक्षा गार्डकहाँ गएर अस्थायी कार्ड लिने। तर, खै, महिनामा तीन पटक बिर्से म्यानेजरसँग कुरा गर्नुपर्छ।"],
      ["Ewa", "Po drugie: przerwy. Zamiast dwóch po piętnaście minut będzie jedna, trzydziestominutowa, i trzeba ją zgłosić liderowi zmiany.", "Second: breaks. Instead of two fifteen-minute ones there will be one thirty-minute break, and you have to report it to the shift leader.", "दोस्रो: ब्रेक। पन्ध्र-पन्ध्र मिनेटका दुई ब्रेकको सट्टा तीस मिनेटको एउटै ब्रेक हुनेछ, र त्यो सिफ्ट लिडरलाई जानकारी दिएर लिनुपर्छ।"],
      ["Ram", "Przepraszam, a czy możemy sami wybrać, kiedy idziemy na przerwę?", "Excuse me, can we choose ourselves when we go on break?", "माफ गर्नुहोस्, ब्रेक कहिले लिने भनेर हामी आफैं रोज्न पाउँछौं?"],
      ["Ewa", "W miarę możliwości tak, ale nie więcej niż trzy osoby z jednej linii naraz.", "As far as possible, yes, but no more than three people from one line at a time.", "सकेसम्म पाउनुहुन्छ, तर एउटै लाइनबाट एकैपटक तीन जनाभन्दा बढी होइन।"],
      ["Ewa", "Po trzecie: na linii telefon ma być w szafce. Wyjątek tylko wtedy, jak ktoś czeka na pilny telefon, na przykład od lekarza. Wtedy trzeba to zgłosić liderowi.", "Third: on the line your phone must be in the locker. The only exception is when someone is waiting for an urgent call, for example from a doctor. Then you have to tell the leader.", "तेस्रो: लाइनमा काम गर्दा फोन लकरमा राख्नुपर्छ। कसैलाई डाक्टरबाट जस्तो जरुरी फोन आउनु छ भने मात्र छुट, तर त्यो पनि लिडरलाई भन्नुपर्छ।"],
      ["Marta", "No dobra, a nadgodziny? Bo ostatnio było zamieszanie z wypłatą.", "Well, OK, and overtime? Because recently there was a mix-up with the pay.", "ल ठीक छ, अनि ओभरटाइम? किनभने हालै तलबमा गडबड भएको थियो।"],
      ["Ewa", "Nadgodziny tylko po wcześniejszej zgodzie lidera, na piśmie albo w aplikacji. Bez zgody nie będą płatne. Wiem, wie pani, trochę biurokracji, ale chodzi o to, żeby każdy dostał za nie pieniądze.", "Overtime only with the leader's prior approval, in writing or in the app. Without approval it won't be paid. I know, you know, it's a bit of bureaucracy, but the point is that everyone gets paid for it.", "ओभरटाइम लिडरको पूर्वस्वीकृतिमा मात्र, लिखित वा एपमार्फत। स्वीकृति बिना ओभरटाइमको पैसा दिइँदैन। थाहा छ, अलि झन्झट छ, तर उद्देश्य भनेको सबैले आफ्नो ओभरटाइमको पैसा पाऊन् भन्ने हो।"]
    ],
    questions: [
      { q: "Od kiedy obowiązują nowe zasady?", en: "From when do the new rules apply?", ne: "नयाँ नियम कहिलेदेखि लागू हुन्छन्?",
        options: ["Od jutra.", "Od pierwszego listopada.", "Od przyszłego tygodnia."], answer: 1,
        why: { en: "*Od pierwszego listopada wchodzą nowe zasady* – from 1 November. *Wchodzić* here means \"to come into force\".",
               ne: "*Od pierwszego listopada wchodzą nowe zasady* – नोभेम्बर १ देखि। यहाँ *wchodzić* को अर्थ \"लागू हुनु\" हो।" } },
      { q: "Co trzeba zrobić, jeśli zapomni się karty?", en: "What do you have to do if you forget your card?", ne: "कार्ड बिर्सियो भने के गर्नुपर्छ?",
        options: ["Wpisać godziny na kartce.", "Wrócić do domu po kartę.", "Pójść do ochrony po kartę tymczasową."], answer: 2,
        why: { en: "*Idzie do ochrony i dostaje kartę tymczasową.* Writing hours on paper is exactly what is ending (*koniec z wpisywaniem godzin na kartce*).",
               ne: "*Idzie do ochrony i dostaje kartę tymczasową.* कागजमा समय लेख्ने चलन नै बन्द भएको हो (*koniec z wpisywaniem godzin na kartce*)।" } },
      { q: "Jak będą wyglądać przerwy?", en: "What will the breaks be like?", ne: "ब्रेक कस्तो हुनेछ?",
        options: ["Jedna przerwa, trzydzieści minut.", "Dwie przerwy po piętnaście minut.", "Każdy robi przerwę, kiedy chce, bez zgłaszania."], answer: 0,
        why: { en: "*Zamiast dwóch po piętnaście minut będzie jedna, trzydziestominutowa* – the two 15-minute breaks become one 30-minute break, reported to the shift leader.",
               ne: "*Zamiast dwóch po piętnaście minut będzie jedna, trzydziestominutowa* – १५ मिनेटका दुई ब्रेकको सट्टा ३० मिनेटको एउटा, सिफ्ट लिडरलाई भनेर।" } },
      { q: "Kiedy nadgodziny będą płatne?", en: "When will overtime be paid?", ne: "ओभरटाइमको पैसा कहिले पाइन्छ?",
        options: ["Zawsze.", "Tylko po wcześniejszej zgodzie lidera.", "Tylko w weekendy."], answer: 1,
        why: { en: "*Nadgodziny tylko po wcześniejszej zgodzie lidera… Bez zgody nie będą płatne.* Get approval first (in writing or in the app), then stay late.",
               ne: "*Nadgodziny tylko po wcześniejszej zgodzie lidera… Bez zgody nie będą płatne.* पहिले स्वीकृति लिनुहोस् (लिखित वा एपमा), अनि मात्र थप समय काम गर्नुहोस्।" } }
    ]
  }

);
