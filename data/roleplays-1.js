// Conversation practice (role-plays), levels A1 and A2. Format: tools/PRACTICE_GUIDE.md section 2.
window.SLOWKA_ROLEPLAYS = window.SLOWKA_ROLEPLAYS || [];
window.SLOWKA_ROLEPLAYS.push(

  // ───────────────────────────── A1 ─────────────────────────────

  {
    id: "rp-a1-cafe",
    level: "A1",
    title: "Ordering at a café", titleNe: "क्याफेमा अर्डर गर्दै",
    scene: {
      en: "You walk into a small café in the city centre. You want a coffee with milk and a piece of apple pie. Then you pay and leave.",
      ne: "तपाईं सहरको बीचमा रहेको एउटा सानो क्याफेमा पस्नुहुन्छ। तपाईंलाई दूधसहितको कफी र एक टुक्रा स्याउको केक (एप्पल पाई) चाहिएको छ। त्यसपछि पैसा तिरेर निस्कनुहुन्छ।"
    },
    them: "Kelnerka", themEn: "Waitress", themNe: "वेट्रेस",
    steps: [
      { them: ["Dzień dobry! Co podać?", "Hello! What can I get you?", "नमस्ते! के ल्याइदिऊँ?"],
        replies: [
          { pl: "Dzień dobry! Poproszę kawę z mlekiem.", en: "Hello! A coffee with milk, please.", ne: "नमस्ते! दूधसहितको कफी दिनुहोस्।", ok: true },
          { pl: "Dzień dobry! Poproszę kawa z mleko.", en: "(wrong word endings)", ne: "(शब्दको अन्त्य गलत)", ok: false,
            why: { en: "Two endings must change. After *poproszę* (I'd like), a feminine word in -a changes to -ę: *kawa* → *kawę*. After *z* (with), *mleko* changes to *mlekiem*. Say: *Poproszę kawę z mlekiem.*",
                   ne: "यहाँ दुईवटा अन्त्य बदलिनुपर्छ। *poproszę* (दिनुहोस्) पछि -a मा टुंगिने स्त्रीलिङ्ग शब्द -ę मा बदलिन्छ: *kawa* → *kawę*। *z* (सँग/सहित) पछि *mleko* बदलिएर *mlekiem* हुन्छ। भन्नुहोस्: *Poproszę kawę z mlekiem.*" } },
          { pl: "Cześć! Daj kawę.", en: "Hi! Give me a coffee.", ne: "हाइ! कफी देऊ।", ok: false,
            why: { en: "*Cześć* and *daj* (give!) are for friends and family. To a waitress you don't know, be polite: *Dzień dobry* and *poproszę* (I'd like / please). In Nepali it is like saying 'कफी देऊ' to a stranger instead of 'कफी दिनुहोस्'.",
                   ne: "*Cześć* र *daj* (देऊ!) साथी र परिवारसँग मात्र प्रयोग हुन्छन्। नचिनेकी वेट्रेससँग नम्र हुनुहोस्: *Dzień dobry* र *poproszę* (दिनुहोस्) भन्नुहोस्। यो नचिनेको मान्छेलाई 'कफी दिनुहोस्' को सट्टा 'कफी देऊ' भनेजस्तै हो।" } }
        ] },
      { them: ["Dużą czy małą?", "Large or small?", "ठूलो कि सानो?"],
        replies: [
          { pl: "Dużą, proszę.", en: "Large, please.", ne: "ठूलो, दिनुहोस्।", ok: true },
          { pl: "Małą, poproszę.", en: "Small, please.", ne: "सानो दिनुहोस्।", ok: true },
          { pl: "Duży, proszę.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "The adjective must match *kawę* (feminine, after *poproszę*). So it is *dużą* (large) or *małą* (small), with -ą. *Duży* is the masculine form, for words like *chleb*.",
                   ne: "विशेषण *kawę* सँग मिल्नुपर्छ (स्त्रीलिङ्ग, *poproszę* पछि)। त्यसैले -ą सहित *dużą* (ठूलो) वा *małą* (सानो) भन्नुपर्छ। *Duży* पुलिङ्ग रूप हो, *chleb* जस्ता शब्दका लागि।" } }
        ] },
      { them: ["Coś jeszcze?", "Anything else?", "अरू केही?"],
        replies: [
          { pl: "Tak, poproszę szarlotkę.", en: "Yes, an apple pie, please.", ne: "हजुर, एप्पल पाई दिनुहोस्।", ok: true },
          { pl: "Tak, poproszę szarlotka.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "Same rule as with coffee: after *poproszę*, feminine -a becomes -ę. *szarlotka* → *szarlotkę*.",
                   ne: "कफीको जस्तै नियम: *poproszę* पछि स्त्रीलिङ्गको -a, -ę मा बदलिन्छ। *szarlotka* → *szarlotkę*।" } },
          { pl: "Nie ma.", en: "There isn't any.", ne: "छैन।", ok: false,
            why: { en: "*Nie ma* means 'there isn't (any)'. It does not mean 'no, thanks'. If you want nothing more, say *Nie, dziękuję* or *To wszystko* (That's all). Here you want the pie, so say *Tak, poproszę szarlotkę.*",
                   ne: "*Nie ma* को अर्थ 'छैन' हो, 'पर्दैन, धन्यवाद' होइन। अरू केही नचाहिए *Nie, dziękuję* वा *To wszystko* (यति नै हो) भन्नुहोस्। यहाँ तपाईंलाई केक चाहिएको छ, त्यसैले *Tak, poproszę szarlotkę.* भन्नुहोस्।" } }
        ] },
      { them: ["Na miejscu czy na wynos?", "For here or to take away?", "यहीँ खाने कि लैजाने?"],
        replies: [
          { pl: "Na miejscu, proszę.", en: "For here, please.", ne: "यहीँ, कृपया।", ok: true },
          { pl: "Na wynos, proszę.", en: "To take away, please.", ne: "लैजाने, कृपया।", ok: true },
          { pl: "Tak, proszę.", en: "Yes, please.", ne: "हजुर, कृपया।", ok: false,
            why: { en: "This is an 'A or B?' question (*czy* here means 'or'). 'Yes' does not choose anything. Answer with one of the options: *Na miejscu* (here) or *Na wynos* (take away).",
                   ne: "यो 'क कि ख?' प्रश्न हो (यहाँ *czy* को अर्थ 'कि' हो)। 'हजुर' भन्दा केही रोजिँदैन। दुईमध्ये एउटा भन्नुहोस्: *Na miejscu* (यहीँ) वा *Na wynos* (लैजाने)।" } }
        ] },
      { them: ["Razem dwadzieścia dwa złote.", "That's twenty-two zloty altogether.", "जम्मा बाइस ज्लोती भयो।"],
        replies: [
          { pl: "Mogę zapłacić kartą?", en: "Can I pay by card?", ne: "के म कार्डले तिर्न सक्छु?", ok: true },
          { pl: "Mogę zapłacić karta?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "'By card' is one word with the ending -ą: *kartą* (and 'in cash' is *gotówką*). *Karta* is just the dictionary form 'card'.",
                   ne: "'कार्डले' भन्न -ą अन्त्य भएको एउटै शब्द प्रयोग हुन्छ: *kartą* (र 'नगदले' = *gotówką*)। *Karta* त शब्दकोशको सामान्य रूप 'कार्ड' मात्र हो।" } },
          { pl: "Dwanaście złotych? Proszę.", en: "Twelve zloty? Here you are.", ne: "बाह्र ज्लोती? लिनुहोस्।", ok: false,
            why: { en: "She said *dwadzieścia dwa* = 22, not *dwanaście* = 12. Listen to the ending: -*naście* is 11–19, -*dzieści* is 20, 30, 40. If you are not sure, ask: *Ile?* (How much?).",
                   ne: "उनले *dwadzieścia dwa* = २२ भनिन्, *dwanaście* = १२ होइन। अन्त्य ध्यान दिएर सुन्नुहोस्: -*naście* = ११–१९, -*dzieści* = २०, ३०, ४०। पक्का नभए *Ile?* (कति?) भनेर सोध्नुहोस्।" } }
        ] },
      { them: ["Oczywiście. Proszę bardzo, kawa i szarlotka. Smacznego!", "Of course. Here you are, coffee and apple pie. Enjoy!", "अवश्य। लिनुहोस्, कफी र एप्पल पाई। मीठो गरी खानुहोस्!"],
        replies: [
          { pl: "Dziękuję bardzo!", en: "Thank you very much!", ne: "धेरै धन्यवाद!", ok: true },
          { pl: "Smacznego!", en: "Enjoy your meal!", ne: "मीठो गरी खानुहोस्!", ok: false,
            why: { en: "*Smacznego* is said to the person who is going to eat. Here **you** are eating, not the waitress. Just say *Dziękuję* (Thank you).",
                   ne: "*Smacznego* खाना खान लागेको मान्छेलाई भनिन्छ। यहाँ खाने त **तपाईं** हो, वेट्रेस होइन। केवल *Dziękuję* (धन्यवाद) भन्नुहोस्।" } },
          { pl: "Proszę bardzo!", en: "Here you are / You're welcome!", ne: "लिनुहोस् / केही छैन!", ok: false,
            why: { en: "*Proszę bardzo* is what the person who **gives** something says ('here you are', 'you're welcome'). You are receiving, so say *Dziękuję bardzo*.",
                   ne: "*Proszę bardzo* केही **दिने** मान्छेले भन्छ ('लिनुहोस्', 'केही छैन')। तपाईं लिँदै हुनुहुन्छ, त्यसैले *Dziękuję bardzo* भन्नुहोस्।" } }
        ] },
      { them: ["Do widzenia! Miłego dnia!", "Goodbye! Have a nice day!", "नमस्ते (बिदा)! दिन राम्रो बितोस्!"],
        replies: [
          { pl: "Dziękuję, nawzajem! Do widzenia!", en: "Thank you, you too! Goodbye!", ne: "धन्यवाद, तपाईंलाई पनि! नमस्ते!", ok: true },
          { pl: "Dobranoc!", en: "Good night!", ne: "शुभ रात्रि!", ok: false,
            why: { en: "*Dobranoc* is only for late evening, before going to sleep. During the day say *Do widzenia*.",
                   ne: "*Dobranoc* राति सुत्ने बेलामा मात्र भनिन्छ। दिउँसो *Do widzenia* भन्नुहोस्।" } },
          { pl: "Cześć, pa!", en: "Bye-bye!", ne: "बाई-बाई!", ok: false,
            why: { en: "*Cześć* and *pa* are informal, for friends. To staff in a café use *Do widzenia*. A nice extra: *Dziękuję, nawzajem!* = Thanks, you too!",
                   ne: "*Cześć* र *pa* अनौपचारिक हुन्, साथीहरूका लागि। क्याफेको कर्मचारीलाई *Do widzenia* भन्नुहोस्। थप राम्रो: *Dziękuję, nawzajem!* = धन्यवाद, तपाईंलाई पनि!" } }
        ] }
    ],
    end: {
      en: "Well done! You ordered politely with *poproszę*, used the right endings (*kawę*, *szarlotkę*, *kartą*), understood the price and said goodbye.",
      ne: "स्याबास! तपाईंले *poproszę* प्रयोग गरेर नम्र भई अर्डर गर्नुभयो, सही अन्त्य (*kawę*, *szarlotkę*, *kartą*) प्रयोग गर्नुभयो, मूल्य बुझ्नुभयो र बिदा माग्नुभयो।"
    },
    useful: [
      ["Poproszę kawę z mlekiem.", "A coffee with milk, please.", "दूधसहितको कफी दिनुहोस्।", "po-PRO-sheh KA-veh z MLEH-kyem", "पो-ˈप्रो-शे ˈका-भे ज़् ˈम्ले-क्येम्"],
      ["Coś jeszcze?", "Anything else?", "अरू केही?", "tsosh YESH-cheh", "त्सोश् ˈयेश्-चे"],
      ["Na miejscu czy na wynos?", "For here or to take away?", "यहीँ खाने कि लैजाने?", "na MYEYS-tsoo chi na VI-nos", "ना ˈम्येय्स्-त्सु चि ना ˈभि-नोस्"],
      ["Mogę zapłacić kartą?", "Can I pay by card?", "के म कार्डले तिर्न सक्छु?", "MO-geh za-PWA-cheech KAR-ton", "ˈमो-गे ज़ा-ˈप्वा-चिच् ˈकार्-तों"],
      ["Razem…", "altogether / in total…", "जम्मा…", "RA-zem", "ˈरा-ज़ेम्"],
      ["Smacznego!", "Enjoy your meal!", "मीठो गरी खानुहोस्!", "smach-NEH-go", "स्माच्-ˈने-गो"],
      ["Dziękuję, nawzajem!", "Thank you, you too!", "धन्यवाद, तपाईंलाई पनि!", "jen-KOO-yeh nav-ZA-yem", "जेन्-ˈकु-ये नाभ्-ˈज़ा-येम्"]
    ]
  },

  {
    id: "rp-a1-meet",
    level: "A1",
    title: "Meeting a new coworker", titleNe: "नयाँ सहकर्मीसँग चिनजान",
    scene: {
      en: "It is your first day at work. In the break room a young Polish woman smiles and starts talking to you. Coworkers of a similar age usually speak informally (*ty*).",
      ne: "आज कामको पहिलो दिन हो। ब्रेक रुममा एउटी युवा पोलिश महिला मुस्कुराउँदै तपाईंसँग कुरा गर्न थाल्छिन्। उस्तै उमेरका सहकर्मीहरू प्रायः अनौपचारिक (*ty*) भएर बोल्छन्।"
    },
    them: "Kasia", themEn: "Kasia, a coworker", themNe: "कासिया, सहकर्मी",
    steps: [
      { them: ["Cześć! Pierwszy dzień? Jestem Kasia.", "Hi! First day? I'm Kasia.", "हाइ! पहिलो दिन हो? म कासिया हुँ।"],
        replies: [
          { pl: "Cześć! Tak, pierwszy dzień. Jestem Ram.", en: "Hi! Yes, first day. I'm Ram.", ne: "हाइ! हो, पहिलो दिन। म राम हुँ।", ok: true },
          { pl: "Cześć! Tak. Ja jest Ram.", en: "(wrong verb form)", ne: "(क्रियाको गलत रूप)", ok: false,
            why: { en: "With *ja* (I) the verb *być* is *jestem*, not *jest*. *Jest* is for he/she/it. Say *Jestem Ram* (you can drop *ja*, just like Nepali often drops म).",
                   ne: "*ja* (म) सँग *być* को रूप *jestem* हुन्छ, *jest* होइन। *Jest* ऊ/उनी/यो का लागि हो। *Jestem Ram* भन्नुहोस् (*ja* छोड्न सकिन्छ, नेपालीमा 'म' छोडेजस्तै)।" } },
          { pl: "Dzień dobry pani.", en: "Good morning, madam.", ne: "नमस्ते, म्याडम।", ok: false,
            why: { en: "Kasia used *Cześć* and her first name, so she wants to be informal. Answering *Dzień dobry pani* sounds cold and distant here. Reply in the same way: *Cześć!*",
                   ne: "कासियाले *Cześć* र आफ्नो नाम भनिन्, अर्थात् उनी अनौपचारिक हुन चाहन्छिन्। यहाँ *Dzień dobry pani* भन्दा टाढाको र चिसो सुनिन्छ। उस्तै गरी जवाफ दिनुहोस्: *Cześć!*" } }
        ] },
      { them: ["Miło mi! Skąd jesteś?", "Nice to meet you! Where are you from?", "भेटेर खुसी लाग्यो! तिमी कहाँबाट हौ?"],
        replies: [
          { pl: "Miło mi. Jestem z Nepalu.", en: "Nice to meet you. I'm from Nepal.", ne: "मलाई पनि खुसी लाग्यो। म नेपालबाट हुँ।", ok: true },
          { pl: "Jestem z Nepal.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *z* (from) the country name changes its ending: *Nepal* → *z Nepalu*, *Polska* → *z Polski*, *Indie* → *z Indii*.",
                   ne: "*z* (बाट) पछि देशको नामको अन्त्य बदलिन्छ: *Nepal* → *z Nepalu*, *Polska* → *z Polski*, *Indie* → *z Indii*।" } },
          { pl: "Jestem Nepal.", en: "I am Nepal.", ne: "म नेपाल हुँ।", ok: false,
            why: { en: "Without *z* this means 'I am Nepal' (the country!). To say where you are from, you need *z*: *Jestem z Nepalu.*",
                   ne: "*z* बिना यसको अर्थ 'म नेपाल (देश) हुँ' हुन्छ! कहाँबाट हो भन्न *z* चाहिन्छ: *Jestem z Nepalu.*" } }
        ] },
      { them: ["Z Nepalu? Super! A z jakiego miasta?", "From Nepal? Great! And from which city?", "नेपालबाट? कस्तो राम्रो! अनि कुन सहरबाट?"],
        replies: [
          { pl: "Z Katmandu.", en: "From Kathmandu.", ne: "काठमाडौंबाट।", ok: true },
          { pl: "Z Pokhary.", en: "From Pokhara.", ne: "पोखराबाट।", ok: true },
          { pl: "W Katmandu.", en: "In Kathmandu.", ne: "काठमाडौंमा।", ok: false,
            why: { en: "*W* means 'in' and answers *Gdzie?* (Where?). She asked *Z jakiego miasta?* (From which city?), so answer with *z*: *Z Katmandu.* (*Katmandu* never changes its ending.)",
                   ne: "*W* को अर्थ 'मा' हो, यसले *Gdzie?* (कहाँ?) को जवाफ दिन्छ। उनले *Z jakiego miasta?* (कुन सहरबाट?) सोधिन्, त्यसैले *z* सहित जवाफ दिनुहोस्: *Z Katmandu.* (*Katmandu* को अन्त्य कहिल्यै बदलिँदैन।)" } }
        ] },
      { them: ["Ile masz lat?", "How old are you?", "तिम्रो उमेर कति भयो?"],
        replies: [
          { pl: "Mam dwadzieścia pięć lat.", en: "I'm twenty-five.", ne: "मेरो उमेर पच्चीस वर्ष हो।", ok: true },
          { pl: "Jestem dwadzieścia pięć lat.", en: "(wrong verb)", ne: "(गलत क्रिया)", ok: false,
            why: { en: "In Polish you **have** years: *Mam … lat* (literally 'I have 25 years'). Don't use *jestem* for age.",
                   ne: "पोलिशमा उमेर 'हुनु' (*jestem*) ले होइन, 'मसँग छ' (*mam*) भनेर भनिन्छ: *Mam … lat* (शाब्दिक अर्थ 'मसँग २५ वर्ष छ')। उमेरका लागि *jestem* प्रयोग नगर्नुहोस्।" } },
          { pl: "Mam dwadzieścia pięć lata.", en: "(wrong form of 'years')", ne: "('वर्ष' को गलत रूप)", ok: false,
            why: { en: "*Lata* is only used after 2, 3, 4 (and 22, 23, 24…): *mam dwadzieścia trzy lata*. After 5 and more (and 25, 26…) it is *lat*: *mam dwadzieścia pięć lat*.",
                   ne: "*Lata* केवल २, ३, ४ (र २२, २३, २४…) पछि आउँछ: *mam dwadzieścia trzy lata*। ५ वा बढी (र २५, २६…) पछि *lat* हुन्छ: *mam dwadzieścia pięć lat*।" } }
        ] },
      { them: ["Ja mam dwadzieścia osiem. Co tu robisz?", "I'm twenty-eight. What do you do here?", "म अठ्ठाइस वर्षकी। तिमी यहाँ के काम गर्छौ?"],
        replies: [
          { pl: "Pracuję w magazynie. Pakuję paczki.", en: "I work in the warehouse. I pack parcels.", ne: "म गोदाममा काम गर्छु। पार्सल प्याक गर्छु।", ok: true },
          { pl: "Pracować w magazynie.", en: "(verb not changed)", ne: "(क्रिया बदलिएन)", ok: false,
            why: { en: "*Pracować* is the dictionary form ('to work'). For 'I work' change it: -ować → -uję, so *pracuję*. The same with *pakować* → *pakuję*.",
                   ne: "*Pracować* शब्दकोशको रूप ('काम गर्नु') हो। 'म काम गर्छु' भन्न बदल्नुहोस्: -ować → -uję, त्यसैले *pracuję*। *pakować* → *pakuję* पनि यस्तै।" } },
          { pl: "Pracuję w magazyn.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *w* (in) the place changes its ending: *magazyn* → *w magazynie*, *sklep* → *w sklepie*. Learn these as fixed phrases.",
                   ne: "*w* (मा) पछि ठाउँको अन्त्य बदलिन्छ: *magazyn* → *w magazynie*, *sklep* → *w sklepie*। यिनलाई तयारी वाक्यांशका रूपमा सिक्नुहोस्।" } }
        ] },
      { them: ["Ja pracuję w biurze. Mówisz po angielsku?", "I work in the office. Do you speak English?", "म अफिसमा काम गर्छु। तिमी अंग्रेजी बोल्छौ?"],
        replies: [
          { pl: "Tak, trochę. I trochę po polsku.", en: "Yes, a little. And a little Polish.", ne: "हो, अलिअलि। अनि अलिअलि पोलिश पनि।", ok: true },
          { pl: "Tak, mówię angielski.", en: "(missing 'po')", ne: "('po' छुट्यो)", ok: false,
            why: { en: "To speak a language is *mówić po* + language ending in -u: *mówię po angielsku*, *po polsku*, *po nepalsku*. Without *po* it is wrong.",
                   ne: "कुनै भाषा बोल्नु = *mówić po* + -u मा टुंगिने भाषा: *mówię po angielsku*, *po polsku*, *po nepalsku*। *po* बिना गलत हुन्छ।" } },
          { pl: "Tak, mówisz po angielsku.", en: "Yes, you speak English.", ne: "हो, तिमी अंग्रेजी बोल्छौ।", ok: false,
            why: { en: "*Mówisz* means 'you speak'. Kasia asked about you, so answer with the 'I' form: *mówię*.",
                   ne: "*Mówisz* को अर्थ 'तिमी बोल्छौ' हो। कासियाले तपाईंको बारेमा सोधिन्, त्यसैले 'म' रूपमा जवाफ दिनुहोस्: *mówię*।" } }
        ] },
      { them: ["Super! Przerwa się kończy. Do zobaczenia!", "Great! The break is ending. See you!", "राम्रो! ब्रेक सकिँदैछ। फेरि भेटौँला!"],
        replies: [
          { pl: "Do zobaczenia! Na razie!", en: "See you! Bye for now!", ne: "फेरि भेटौँला! अहिलेलाई बाई!", ok: true },
          { pl: "Pa, Kasiu!", en: "Bye, Kasia!", ne: "बाई, कासिया!", ok: true },
          { pl: "Dzień dobry!", en: "Good morning / Hello!", ne: "नमस्ते (भेट्दा)!", ok: false,
            why: { en: "*Dzień dobry* is only a greeting when you **meet** someone. It is never used for goodbye. With a friend say *Do zobaczenia*, *Na razie* or *Pa*.",
                   ne: "*Dzień dobry* कसैलाई **भेट्दा** मात्र भनिन्छ, बिदा हुँदा कहिल्यै भनिँदैन। साथीसँग *Do zobaczenia*, *Na razie* वा *Pa* भन्नुहोस्।" } }
        ] }
    ],
    end: {
      en: "Great! You introduced yourself, said where you are from, your age and your job, and you kept the friendly *ty* tone with a coworker.",
      ne: "धेरै राम्रो! तपाईंले आफ्नो परिचय दिनुभयो, कहाँबाट हो, उमेर र काम बताउनुभयो, अनि सहकर्मीसँग मित्रवत् *ty* शैली कायम राख्नुभयो।"
    },
    useful: [
      ["Miło mi.", "Nice to meet you.", "भेटेर खुसी लाग्यो।", "MEE-wo mee", "ˈमि-वो मि"],
      ["Skąd jesteś?", "Where are you from? (informal)", "तिमी कहाँबाट हौ?", "skont YES-tesh", "स्कोन्त् ˈयेस्-तेश्"],
      ["Jestem z Nepalu.", "I'm from Nepal.", "म नेपालबाट हुँ।", "YES-tem z neh-PA-loo", "ˈयेस्-तेम् ज़् ने-ˈपा-लु"],
      ["Ile masz lat?", "How old are you? (informal)", "तिम्रो उमेर कति?", "EE-leh mash lat", "ˈइ-ले माश् लात्"],
      ["Mam dwadzieścia pięć lat.", "I'm twenty-five.", "मेरो उमेर पच्चीस वर्ष हो।", "mam dva-JESH-cha pyench lat", "माम् द्भा-ˈजेश्-चा प्येन्च् लात्"],
      ["Pracuję w magazynie.", "I work in a warehouse.", "म गोदाममा काम गर्छु।", "pra-TSOO-yeh v ma-ga-ZI-nyeh", "प्रा-ˈत्सु-ये भ् मा-गा-ˈज़ि-न्ये"],
      ["Mówię trochę po polsku.", "I speak a little Polish.", "म अलिअलि पोलिश बोल्छु।", "MOO-vyeh TRO-heh po POL-skoo", "ˈमु-भ्ये ˈत्रो-हे पो ˈपोल्-स्कु"],
      ["Do zobaczenia!", "See you!", "फेरि भेटौँला!", "do zo-ba-CHEH-nya", "दो ज़ो-बा-ˈचे-न्या"]
    ]
  },

  {
    id: "rp-a1-shop",
    level: "A1",
    title: "At the corner shop", titleNe: "नजिकको किराना पसलमा",
    scene: {
      en: "You go to a small grocery shop near your flat. You need bread, rolls, milk and maybe cheese or eggs. The items are behind the counter, so you must ask for them.",
      ne: "तपाईं आफ्नो फ्ल्याट नजिकैको सानो किराना पसलमा जानुहुन्छ। तपाईंलाई पाउरोटी, बन, दूध र सायद चिज वा अण्डा चाहिन्छ। सामान काउन्टर पछाडि छ, त्यसैले माग्नुपर्छ।"
    },
    them: "Sprzedawczyni", themEn: "Shop assistant", themNe: "पसले (महिला)",
    steps: [
      { them: ["Dzień dobry! Słucham?", "Hello! What would you like?", "नमस्ते! भन्नुहोस्, के चाहियो?"],
        replies: [
          { pl: "Dzień dobry! Poproszę chleb.", en: "Hello! Some bread, please.", ne: "नमस्ते! पाउरोटी दिनुहोस्।", ok: true },
          { pl: "Dzień dobry! Mam chleb.", en: "Hello! I have bread.", ne: "नमस्ते! मसँग पाउरोटी छ।", ok: false,
            why: { en: "*Mam* means 'I have'. To ask for something in a shop say *Poproszę…* (I'd like… / please give me…).",
                   ne: "*Mam* को अर्थ 'मसँग छ' हो। पसलमा केही माग्न *Poproszę…* (… दिनुहोस्) भन्नुहोस्।" } },
          { pl: "Cześć! Poproszę chleb.", en: "Hi! Bread, please.", ne: "हाइ! पाउरोटी दिनुहोस्।", ok: false,
            why: { en: "*Cześć* is for friends. A shop assistant is a stranger: greet with *Dzień dobry* (or *Dobry wieczór* in the evening).",
                   ne: "*Cześć* साथीहरूका लागि हो। पसले नचिनेको मान्छे हो: *Dzień dobry* (साँझ भए *Dobry wieczór*) भनेर अभिवादन गर्नुहोस्।" } }
        ] },
      { them: ["Jasny czy ciemny?", "White or brown?", "सेतो कि खैरो (गहुँको)?"],
        replies: [
          { pl: "Ciemny, proszę.", en: "Brown, please.", ne: "खैरो, कृपया।", ok: true },
          { pl: "Jasny, poproszę.", en: "White, please.", ne: "सेतो दिनुहोस्।", ok: true },
          { pl: "Ciemna, proszę.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Chleb* is masculine (it ends in a consonant), so the adjective ends in -y: *ciemny*, *jasny*. *Ciemna* would be for a feminine word like *bułka*.",
                   ne: "*Chleb* पुलिङ्ग हो (व्यञ्जनमा टुंगिन्छ), त्यसैले विशेषण -y मा टुंगिन्छ: *ciemny*, *jasny*। *Ciemna* त *bułka* जस्तो स्त्रीलिङ्ग शब्दका लागि हुन्छ।" } }
        ] },
      { them: ["Proszę. Coś jeszcze?", "Here you are. Anything else?", "लिनुहोस्। अरू केही?"],
        replies: [
          { pl: "Tak, poproszę dwie bułki i mleko.", en: "Yes, two rolls and milk, please.", ne: "हजुर, दुईवटा बन र दूध दिनुहोस्।", ok: true },
          { pl: "Tak, poproszę dwa bułki i mleko.", en: "(wrong form of 'two')", ne: "('दुई' को गलत रूप)", ok: false,
            why: { en: "'Two' has a special form for feminine words: *dwie* (*dwie bułki*, *dwie kawy*). *Dwa* is for masculine and neuter words: *dwa chleby*.",
                   ne: "स्त्रीलिङ्ग शब्दसँग 'दुई' को छुट्टै रूप हुन्छ: *dwie* (*dwie bułki*, *dwie kawy*)। *Dwa* पुलिङ्ग र नपुंसकलिङ्ग शब्दका लागि हो: *dwa chleby*।" } },
          { pl: "Tak, poproszę dwie bułka i mleko.", en: "(wrong plural)", ne: "(गलत बहुवचन)", ok: false,
            why: { en: "After 2, 3, 4 the noun is plural: *bułka* → *bułki*. So: *dwie bułki*, *trzy bułki*.",
                   ne: "२, ३, ४ पछि नाम बहुवचनमा हुन्छ: *bułka* → *bułki*। त्यसैले: *dwie bułki*, *trzy bułki*।" } }
        ] },
      { them: ["Mleko jest tam, w lodówce. Coś jeszcze?", "The milk is over there, in the fridge. Anything else?", "दूध उता फ्रिजमा छ। अरू केही?"],
        replies: [
          { pl: "Ile kosztuje ser?", en: "How much is the cheese?", ne: "चिज कतिको हो?", ok: true },
          { pl: "Ile kosztują jajka?", en: "How much are the eggs?", ne: "अण्डा कतिको हो?", ok: true },
          { pl: "Ile kosztuje jajka?", en: "(verb doesn't match)", ne: "(क्रिया मिलेन)", ok: false,
            why: { en: "*Jajka* (eggs) is plural, so the verb is plural too: *kosztują*. One thing: *Ile kosztuje ser?* More things: *Ile kosztują jajka?*",
                   ne: "*Jajka* (अण्डाहरू) बहुवचन हो, त्यसैले क्रिया पनि बहुवचन हुन्छ: *kosztują*। एउटा चीज: *Ile kosztuje ser?* धेरै चीज: *Ile kosztują jajka?*" } }
        ] },
      { them: ["Ser kosztuje osiem złotych, a jajka dwanaście złotych.", "The cheese is eight zloty, and the eggs twelve zloty.", "चिज आठ ज्लोती, र अण्डा बाह्र ज्लोती।"],
        replies: [
          { pl: "Dobrze, poproszę ser i jajka.", en: "OK, the cheese and the eggs, please.", ne: "ठीक छ, चिज र अण्डा दिनुहोस्।", ok: true },
          { pl: "Dobrze, poproszę osiem złotych.", en: "OK, eight zloty, please.", ne: "ठीक छ, आठ ज्लोती दिनुहोस्।", ok: false,
            why: { en: "This asks **her** to give **you** eight zloty! After *poproszę* say the thing you want: *Poproszę ser.*",
                   ne: "यसको अर्थ उनलाई तपाईंलाई आठ ज्लोती दिन भन्नु हो! *poproszę* पछि आफूलाई चाहिएको चीज भन्नुहोस्: *Poproszę ser.*" } },
          { pl: "Dobrze, poproszę serem.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Serem* is the form after *z* (with): *kanapka z serem* = a sandwich with cheese. After *poproszę* a masculine word like *ser* doesn't change: *Poproszę ser.*",
                   ne: "*Serem* रूप *z* (सँग/सहित) पछि आउँछ: *kanapka z serem* = चिजसहितको स्यान्डविच। *poproszę* पछि *ser* जस्तो पुलिङ्ग शब्द बदलिँदैन: *Poproszę ser.*" } }
        ] },
      { them: ["To wszystko?", "Is that all?", "यति नै हो?"],
        replies: [
          { pl: "Tak, to wszystko. Ile płacę?", en: "Yes, that's all. How much do I pay?", ne: "हो, यति नै। कति तिर्नुपर्छ?", ok: true },
          { pl: "Nie, dziękuję.", en: "No, thank you.", ne: "होइन, धन्यवाद।", ok: false,
            why: { en: "Careful! To *To wszystko?* (Is that all?), *Nie* means 'no, it's not all — I want more'. If you are finished, say *Tak, to wszystko.*",
                   ne: "ध्यान दिनुहोस्! *To wszystko?* (यति नै हो?) को जवाफमा *Nie* भन्दा 'होइन, अझै चाहिन्छ' भन्ने अर्थ लाग्छ। सकियो भने *Tak, to wszystko.* भन्नुहोस्।" } },
          { pl: "Tak, to wszystkie.", en: "(wrong word)", ne: "(गलत शब्द)", ok: false,
            why: { en: "The fixed phrase is *to wszystko* (that's all). *Wszystkie* means 'all' before a plural noun, e.g. *wszystkie bułki* (all the rolls).",
                   ne: "तयारी वाक्यांश *to wszystko* (यति नै हो) हो। *Wszystkie* बहुवचन नामअघि 'सबै' भन्ने अर्थमा आउँछ, जस्तै *wszystkie bułki* (सबै बन)।" } }
        ] },
      { them: ["Razem trzydzieści jeden złotych dwadzieścia groszy.", "Altogether thirty-one zloty twenty groszy.", "जम्मा एकतीस ज्लोती बीस ग्रोस।"],
        replies: [
          { pl: "Proszę, pięćdziesiąt złotych.", en: "Here you are, fifty zloty.", ne: "लिनुहोस्, पचास ज्लोती।", ok: true },
          { pl: "Płacę kartą.", en: "I'm paying by card.", ne: "म कार्डले तिर्छु।", ok: true },
          { pl: "Trzynaście złotych? Proszę.", en: "Thirteen zloty? Here you are.", ne: "तेह्र ज्लोती? लिनुहोस्।", ok: false,
            why: { en: "She said *trzydzieści* = 30, not *trzynaście* = 13. Remember: -*naście* = teens (11–19), -*dzieści* = tens (20, 30, 40). *Grosze* are the small coins: 100 groszy = 1 złoty.",
                   ne: "उनले *trzydzieści* = ३० भनिन्, *trzynaście* = १३ होइन। याद राख्नुहोस्: -*naście* = ११–१९, -*dzieści* = दशक (२०, ३०, ४०)। *Grosze* साना सिक्का हुन्: १०० ग्रोस = १ ज्लोती।" } }
        ] },
      { them: ["Dziękuję. Proszę, paragon. Do widzenia!", "Thank you. Here's your receipt. Goodbye!", "धन्यवाद। लिनुहोस्, बिल। नमस्ते!"],
        replies: [
          { pl: "Dziękuję, do widzenia!", en: "Thank you, goodbye!", ne: "धन्यवाद, नमस्ते!", ok: true },
          { pl: "Dziękuję bardzo. Miłego dnia!", en: "Thank you very much. Have a nice day!", ne: "धेरै धन्यवाद। दिन राम्रो बितोस्!", ok: true },
          { pl: "Smacznego!", en: "Enjoy your meal!", ne: "मीठो गरी खानुहोस्!", ok: false,
            why: { en: "*Smacznego* is said to someone who is about to eat. The shop assistant is not eating. Say *Dziękuję, do widzenia!*",
                   ne: "*Smacznego* खाना खान लागेको मान्छेलाई भनिन्छ। पसले त खाँदै छैनन्। *Dziękuję, do widzenia!* भन्नुहोस्।" } }
        ] }
    ],
    end: {
      en: "Well done! You asked for things with *poproszę*, used *dwie bułki*, asked prices with *kosztuje / kosztują* and understood the total.",
      ne: "स्याबास! तपाईंले *poproszę* ले सामान माग्नुभयो, *dwie bułki* सही प्रयोग गर्नुभयो, *kosztuje / kosztują* ले मूल्य सोध्नुभयो र जम्मा रकम बुझ्नुभयो।"
    },
    useful: [
      ["Słucham?", "Yes? / What would you like? (lit. I'm listening)", "भन्नुहोस्? / के चाहियो?", "SWOO-ham", "ˈस्वु-हाम्"],
      ["Poproszę chleb.", "Some bread, please.", "पाउरोटी दिनुहोस्।", "po-PRO-sheh hlep", "पो-ˈप्रो-शे ह्लेप्"],
      ["Poproszę dwie bułki.", "Two rolls, please.", "दुईवटा बन दिनुहोस्।", "po-PRO-sheh dvyeh BOOW-kee", "पो-ˈप्रो-शे द्भ्ये ˈबुव्-कि"],
      ["Ile kosztuje ser?", "How much is the cheese?", "चिज कतिको हो?", "EE-leh kosh-TOO-yeh ser", "ˈइ-ले कोश्-ˈतु-ये सेर्"],
      ["Ile kosztują jajka?", "How much are the eggs?", "अण्डा कतिको हो?", "EE-leh kosh-TOO-yon YAY-ka", "ˈइ-ले कोश्-ˈतु-यों ˈयाय्-का"],
      ["To wszystko.", "That's all.", "यति नै हो।", "to FSHIST-ko", "तो ˈफ़्शिस्त्-को"],
      ["Ile płacę?", "How much do I pay?", "कति तिर्नुपर्छ?", "EE-leh PWA-tseh", "ˈइ-ले ˈप्वा-त्से"]
    ]
  },

  {
    id: "rp-a1-directions",
    level: "A1",
    title: "Asking the way", titleNe: "बाटो सोध्दै",
    scene: {
      en: "You are new in town and need to get to the railway station. You also need a pharmacy. You stop a woman in the street.",
      ne: "तपाईं सहरमा नयाँ हुनुहुन्छ र रेलवे स्टेसन पुग्नु छ। फार्मेसी पनि चाहिएको छ। तपाईं सडकमा एउटी महिलालाई रोक्नुहुन्छ।"
    },
    them: "Przechodzień", themEn: "Passer-by", themNe: "बटुवा",
    steps: [
      { them: ["Tak? Mogę pomóc?", "Yes? Can I help?", "हजुर? म केही सहयोग गर्न सक्छु?"],
        replies: [
          { pl: "Przepraszam, gdzie jest dworzec?", en: "Excuse me, where is the station?", ne: "माफ गर्नुहोस्, स्टेसन कहाँ छ?", ok: true },
          { pl: "Przepraszam, jak dojść do dworca?", en: "Excuse me, how do I get to the station?", ne: "माफ गर्नुहोस्, स्टेसन कसरी पुग्ने?", ok: true },
          { pl: "Przepraszam, jak dojść do dworzec?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *do* (to) the place changes its ending: *dworzec* → *do dworca*, *apteka* → *do apteki*. After *Gdzie jest…?* it stays as it is: *Gdzie jest dworzec?*",
                   ne: "*do* (सम्म/तिर) पछि ठाउँको अन्त्य बदलिन्छ: *dworzec* → *do dworca*, *apteka* → *do apteki*। *Gdzie jest…?* पछि भने जस्ताको तस्तै रहन्छ: *Gdzie jest dworzec?*" } }
        ] },
      { them: ["Dworzec? To niedaleko. Proszę iść prosto, potem w lewo.", "The station? It's not far. Go straight, then left.", "स्टेसन? नजिकै छ। सिधा जानुहोस्, त्यसपछि बायाँ।"],
        replies: [
          { pl: "Prosto, a potem w lewo?", en: "Straight, and then left?", ne: "सिधा, अनि त्यसपछि बायाँ?", ok: true },
          { pl: "Przepraszam, nie rozumiem. Może pani powtórzyć?", en: "Sorry, I don't understand. Could you repeat?", ne: "माफ गर्नुहोस्, मैले बुझिनँ। फेरि भन्नुहुन्छ?", ok: true },
          { pl: "Prosto, potem w prawo?", en: "Straight, then right?", ne: "सिधा, त्यसपछि दायाँ?", ok: false,
            why: { en: "She said *w lewo* = (to the) left. *W prawo* = (to the) right. Checking is a good idea, but listen carefully: lewo = left, prawo = right.",
                   ne: "उनले *w lewo* = बायाँतिर भनिन्। *W prawo* = दायाँतिर। दोहोर्‍याएर जाँच्नु राम्रो हो, तर ध्यान दिएर सुन्नुहोस्: lewo = बायाँ, prawo = दायाँ।" } }
        ] },
      { them: ["Tak: prosto, potem w lewo. Dworzec jest obok poczty.", "Yes: straight, then left. The station is next to the post office.", "हो: सिधा, त्यसपछि बायाँ। स्टेसन हुलाक घरको छेउमा छ।"],
        replies: [
          { pl: "Czy to daleko?", en: "Is it far?", ne: "के त्यो टाढा छ?", ok: true },
          { pl: "Czy to długo?", en: "Does it take long?", ne: "के धेरै समय लाग्छ?", ok: false,
            why: { en: "*Długo* means 'for a long time' (time). For distance use *daleko* (far) and *blisko* (near): *Czy to daleko?*",
                   ne: "*Długo* को अर्थ 'लामो समय' हो (समयका लागि)। दूरीका लागि *daleko* (टाढा) र *blisko* (नजिक) प्रयोग गर्नुहोस्: *Czy to daleko?*" } },
          { pl: "Ile to kosztuje?", en: "How much does it cost?", ne: "त्यो कतिको हो?", ok: false,
            why: { en: "This asks about a price. Walking to the station is free! To ask about distance say *Czy to daleko?*",
                   ne: "यसले मूल्य सोध्छ। स्टेसनसम्म हिँडेर जान त पैसा लाग्दैन! दूरी सोध्न *Czy to daleko?* भन्नुहोस्।" } }
        ] },
      { them: ["Nie, pięć minut pieszo.", "No, five minutes on foot.", "होइन, हिँडेर पाँच मिनेट।"],
        replies: [
          { pl: "Dziękuję! A gdzie jest apteka?", en: "Thank you! And where is a pharmacy?", ne: "धन्यवाद! अनि फार्मेसी कहाँ छ?", ok: true },
          { pl: "Dziękuję! A jak dojść do apteki?", en: "Thank you! And how do I get to a pharmacy?", ne: "धन्यवाद! अनि फार्मेसी कसरी पुग्ने?", ok: true },
          { pl: "Dziękuję! A gdzie jest apteki?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Apteki* is the form after *do*. After *Gdzie jest…?* use the basic form: *Gdzie jest apteka?* Two correct questions: *Gdzie jest apteka?* / *Jak dojść do apteki?*",
                   ne: "*Apteki* रूप *do* पछि मात्र आउँछ। *Gdzie jest…?* पछि मूल रूप प्रयोग गर्नुहोस्: *Gdzie jest apteka?* दुई सही प्रश्न: *Gdzie jest apteka?* / *Jak dojść do apteki?*" } }
        ] },
      { them: ["Apteka jest tam, na rogu, naprzeciwko banku.", "The pharmacy is over there, on the corner, opposite the bank.", "फार्मेसी उता, कुनामा, बैंकको ठीक अगाडि (पारिपट्टि) छ।"],
        replies: [
          { pl: "Naprzeciwko banku? Tam?", en: "Opposite the bank? Over there?", ne: "बैंकको पारिपट्टि? उता?", ok: true },
          { pl: "Na rogu? Dobrze, rozumiem.", en: "On the corner? OK, I understand.", ne: "कुनामा? ठीक छ, बुझेँ।", ok: true },
          { pl: "Naprzeciwko, czyli obok?", en: "Opposite, so next to it?", ne: "पारिपट्टि, अर्थात् छेउमा?", ok: false,
            why: { en: "These are different! *Naprzeciwko* = opposite, across the street, facing it. *Obok* = next to, right beside it.",
                   ne: "यी फरक हुन्! *Naprzeciwko* = पारिपट्टि, सडकको अर्को छेउमा, ठीक सामुन्ने। *Obok* = छेउमा, सँगै टाँसिएको।" } }
        ] },
      { them: ["Tak, dokładnie. Tam, gdzie jest zielony krzyż.", "Yes, exactly. Where the green cross is.", "हो, ठ्याक्कै। जहाँ हरियो क्रस छ, त्यहीँ।"],
        replies: [
          { pl: "Bardzo dziękuję za pomoc!", en: "Thank you very much for your help!", ne: "सहयोगका लागि धेरै धन्यवाद!", ok: true },
          { pl: "Dziękuję bardzo! Do widzenia!", en: "Thank you very much! Goodbye!", ne: "धेरै धन्यवाद! नमस्ते!", ok: true },
          { pl: "Przepraszam!", en: "Sorry! / Excuse me!", ne: "माफ गर्नुहोस्!", ok: false,
            why: { en: "*Przepraszam* is for 'sorry' or 'excuse me' (to start a question, as you did at the beginning). To thank someone say *Dziękuję*. Tip: in Poland a pharmacy sign is usually a **green cross**.",
                   ne: "*Przepraszam* 'माफ गर्नुहोस्' हो (सुरुमा प्रश्न सोध्दा भनेजस्तै)। धन्यवाद दिन *Dziękuję* भन्नुहोस्। सुझाव: पोल्यान्डमा फार्मेसीको चिन्ह प्रायः **हरियो क्रस** हुन्छ।" } }
        ] },
      { them: ["Nie ma za co! Do widzenia!", "You're welcome! Goodbye!", "केही छैन! नमस्ते!"],
        replies: [
          { pl: "Do widzenia!", en: "Goodbye!", ne: "नमस्ते!", ok: true },
          { pl: "Nie ma za co!", en: "You're welcome!", ne: "केही छैन!", ok: false,
            why: { en: "*Nie ma za co* (you're welcome, lit. 'there's nothing to thank for') is the answer to *dziękuję*. She already said it. Now just say *Do widzenia!*",
                   ne: "*Nie ma za co* (केही छैन, शाब्दिक: 'धन्यवाद दिनुपर्ने केही छैन') *dziękuję* को जवाफ हो। उनले भनिसकिन्। अब *Do widzenia!* मात्र भन्नुहोस्।" } },
          { pl: "Pa!", en: "Bye!", ne: "बाई!", ok: false,
            why: { en: "*Pa* is very informal, for friends and family. To a stranger say *Do widzenia*.",
                   ne: "*Pa* धेरै अनौपचारिक हो, साथी र परिवारका लागि। नचिनेको मान्छेलाई *Do widzenia* भन्नुहोस्।" } }
        ] }
    ],
    end: {
      en: "Well done! You asked the way politely, understood *prosto*, *w lewo*, *naprzeciwko* and *obok*, and thanked the person.",
      ne: "स्याबास! तपाईंले नम्र भएर बाटो सोध्नुभयो, *prosto*, *w lewo*, *naprzeciwko* र *obok* बुझ्नुभयो, अनि धन्यवाद दिनुभयो।"
    },
    useful: [
      ["Przepraszam, gdzie jest dworzec?", "Excuse me, where is the station?", "माफ गर्नुहोस्, स्टेसन कहाँ छ?", "pshe-PRA-sham gjeh yest DVO-zhets", "प्शे-ˈप्रा-शाम् ग्जे येस्त् ˈद्भो-झेत्स्"],
      ["Jak dojść do apteki?", "How do I get to the pharmacy?", "फार्मेसी कसरी पुग्ने?", "yak doyshch do ap-TEH-kee", "याक् दोय्श्च् दो आप्-ˈते-कि"],
      ["Proszę iść prosto, potem w lewo.", "Go straight, then left.", "सिधा जानुहोस्, त्यसपछि बायाँ।", "PRO-sheh eeshch PROS-to PO-tem v LEH-vo", "ˈप्रो-शे इश्च् ˈप्रोस्-तो ˈपो-तेम् भ् ˈले-भो"],
      ["Czy to daleko?", "Is it far?", "के त्यो टाढा छ?", "chi to da-LEH-ko", "चि तो दा-ˈले-को"],
      ["Może pani powtórzyć?", "Could you repeat? (to a woman)", "फेरि भन्नुहुन्छ? (महिलालाई)", "MO-zheh PA-nee pof-TOO-zhich", "ˈमो-झे ˈपा-नि पोफ़्-ˈतु-झिच्"],
      ["naprzeciwko banku", "opposite the bank", "बैंकको पारिपट्टि", "na-pshe-CHEEF-ko BAN-koo", "ना-प्शे-ˈचिफ़्-को ˈबान्-कु"],
      ["obok poczty", "next to the post office", "हुलाक घरको छेउमा", "O-bok POCH-ti", "ˈओ-बोक् ˈपोच्-ति"],
      ["Nie ma za co.", "You're welcome.", "केही छैन।", "nyeh ma ZA tso", "न्ये मा ˈज़ा त्सो"]
    ]
  },

  {
    id: "rp-a1-pharmacy",
    level: "A1",
    title: "At the pharmacy", titleNe: "फार्मेसीमा",
    scene: {
      en: "You have had a headache since the morning. You go into a pharmacy (*apteka*) to buy tablets. Simple painkillers can be bought without a prescription.",
      ne: "बिहानदेखि तपाईंको टाउको दुखिरहेको छ। चक्की किन्न तपाईं फार्मेसी (*apteka*) मा जानुहुन्छ। सामान्य दुखाइ कम गर्ने औषधि डाक्टरको पुर्जाबिना पनि किन्न सकिन्छ।"
    },
    them: "Farmaceutka", themEn: "Pharmacist", themNe: "फार्मासिस्ट (महिला)",
    steps: [
      { them: ["Dzień dobry. W czym mogę pomóc?", "Hello. How can I help?", "नमस्ते। म के सहयोग गर्न सक्छु?"],
        replies: [
          { pl: "Dzień dobry. Boli mnie głowa.", en: "Hello. I have a headache.", ne: "नमस्ते। मेरो टाउको दुख्यो।", ok: true },
          { pl: "Dzień dobry. Poproszę coś na ból głowy.", en: "Hello. Something for a headache, please.", ne: "नमस्ते। टाउको दुखेकोमा केही औषधि दिनुहोस्।", ok: true },
          { pl: "Dzień dobry. Ja boli głowa.", en: "(wrong structure)", ne: "(गलत संरचना)", ok: false,
            why: { en: "Polish says 'the head hurts **me**': *Boli mnie głowa*. *Mnie* (me) works like Nepali मलाई. You can't use *ja* here.",
                   ne: "पोलिशमा 'टाउकोले **मलाई** दुखायो' जस्तो भनिन्छ: *Boli mnie głowa*। *Mnie* नेपालीको 'मलाई' जस्तै हो। यहाँ *ja* (म) प्रयोग हुँदैन।" } }
        ] },
      { them: ["Od kiedy?", "Since when?", "कहिलेदेखि?"],
        replies: [
          { pl: "Od rana.", en: "Since the morning.", ne: "बिहानदेखि।", ok: true },
          { pl: "Od wczoraj.", en: "Since yesterday.", ne: "हिजोदेखि।", ok: true },
          { pl: "Do rana.", en: "Until the morning.", ne: "बिहानसम्म।", ok: false,
            why: { en: "*Do* means 'until / to'. 'Since' is *od*: *od rana* (since the morning), *od wczoraj* (since yesterday). Like Nepali -देखि (*od*) and -सम्म (*do*).",
                   ne: "*Do* को अर्थ '-सम्म' हो। '-देखि' का लागि *od* प्रयोग हुन्छ: *od rana* (बिहानदेखि), *od wczoraj* (हिजोदेखि)। नेपालीको -देखि (*od*) र -सम्म (*do*) जस्तै।" } }
        ] },
      { them: ["A gorączka? Jest?", "And a fever? Do you have one?", "अनि ज्वरो? छ?"],
        replies: [
          { pl: "Nie, nie mam gorączki.", en: "No, I don't have a fever.", ne: "छैन, मलाई ज्वरो छैन।", ok: true },
          { pl: "Nie, nie mam gorączka.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *nie mam* (I don't have) the noun changes: *gorączka* → *nie mam gorączki*. The same as *nie mam czasu*, *nie mam karty*.",
                   ne: "*nie mam* (मसँग छैन) पछि नाम बदलिन्छ: *gorączka* → *nie mam gorączki*। *nie mam czasu*, *nie mam karty* जस्तै।" } },
          { pl: "Tak, mam gorączki.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *mam* (I have) a feminine noun takes -ę: *Mam gorączkę*. The -i form (*gorączki*) is only after *nie mam*.",
                   ne: "*mam* (मसँग छ) पछि स्त्रीलिङ्ग नाम -ę लिन्छ: *Mam gorączkę*। -i रूप (*gorączki*) *nie mam* पछि मात्र आउँछ।" } }
        ] },
      { them: ["Polecam te tabletki na ból głowy. Są bez recepty.", "I recommend these tablets for headaches. They're without a prescription.", "म टाउको दुखाइका लागि यी चक्की सिफारिस गर्छु। यिनका लागि डाक्टरको पुर्जा चाहिँदैन।"],
        replies: [
          { pl: "Ile kosztują?", en: "How much are they?", ne: "यी कतिको हुन्?", ok: true },
          { pl: "Dobrze, poproszę te tabletki.", en: "OK, I'll take these tablets, please.", ne: "ठीक छ, यी चक्की दिनुहोस्।", ok: true },
          { pl: "Poproszę te tabletka.", en: "(wrong form)", ne: "(गलत रूप)", ok: false,
            why: { en: "*Te* (these) is plural, so the noun must be plural too: *te tabletki*. One tablet would be *tę tabletkę*.",
                   ne: "*Te* (यी) बहुवचन हो, त्यसैले नाम पनि बहुवचन हुनुपर्छ: *te tabletki*। एउटा चक्की भए *tę tabletkę* हुन्छ।" } }
        ] },
      { them: ["Dwanaście złotych. Proszę brać jedną tabletkę trzy razy dziennie.", "Twelve zloty. Take one tablet three times a day.", "बाह्र ज्लोती। दिनमा तीन पटक एउटा चक्की खानुहोस्।"],
        replies: [
          { pl: "Jedna tabletka trzy razy dziennie. Rozumiem.", en: "One tablet three times a day. I understand.", ne: "दिनमा तीन पटक एउटा चक्की। बुझेँ।", ok: true },
          { pl: "Rozumiem. Po jedzeniu?", en: "I understand. After food?", ne: "बुझेँ। खाना खाएपछि?", ok: true },
          { pl: "Trzy tabletki raz dziennie?", en: "Three tablets once a day?", ne: "दिनमा एक पटक तीनवटा चक्की?", ok: false,
            why: { en: "No! She said **one** tablet (*jedną tabletkę*), **three times** a day (*trzy razy dziennie*). Three at once can be dangerous. With medicine, always check the dose; ask *Ile razy dziennie?* (How many times a day?) if unsure.",
                   ne: "होइन! उनले **एउटा** चक्की (*jedną tabletkę*), दिनमा **तीन पटक** (*trzy razy dziennie*) भनिन्। एकै पटक तीनवटा खानु खतरनाक हुन सक्छ। औषधिमा मात्रा सधैं जाँच्नुहोस्; पक्का नभए *Ile razy dziennie?* (दिनमा कति पटक?) सोध्नुहोस्।" } }
        ] },
      { them: ["Najlepiej po jedzeniu. Karta czy gotówka?", "Best after food. Card or cash?", "खाना खाएपछि राम्रो। कार्ड कि नगद?"],
        replies: [
          { pl: "Kartą, proszę.", en: "By card, please.", ne: "कार्डले, कृपया।", ok: true },
          { pl: "Gotówką. Proszę, dwadzieścia złotych.", en: "Cash. Here you are, twenty zloty.", ne: "नगद। लिनुहोस्, बीस ज्लोती।", ok: true },
          { pl: "Nie mam kartą.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Kartą* means 'by card'. 'I don't have a card' is *Nie mam karty* (after *nie mam* → -y). But simplest: just answer *Kartą* or *Gotówką*.",
                   ne: "*Kartą* को अर्थ 'कार्डले' हो। 'मसँग कार्ड छैन' = *Nie mam karty* (*nie mam* पछि → -y)। तर सबैभन्दा सजिलो: *Kartą* वा *Gotówką* मात्र भन्नुहोस्।" } }
        ] },
      { them: ["Proszę, tabletki i paragon. Dużo zdrowia!", "Here are the tablets and the receipt. Get well soon!", "लिनुहोस्, चक्की र बिल। छिटो निको हुनुहोस्!"],
        replies: [
          { pl: "Dziękuję bardzo! Do widzenia.", en: "Thank you very much! Goodbye.", ne: "धेरै धन्यवाद! नमस्ते।", ok: true },
          { pl: "Dziękuję za pomoc. Do widzenia!", en: "Thank you for your help. Goodbye!", ne: "सहयोगका लागि धन्यवाद। नमस्ते!", ok: true },
          { pl: "Na zdrowie!", en: "Cheers! / Bless you!", ne: "चियर्स! / (हाच्छ्युँ गर्दा) स्वस्थ रहनुहोस्!", ok: false,
            why: { en: "*Na zdrowie* is said when someone sneezes or when people raise a glass. It is not 'get well'. Here just thank her: *Dziękuję bardzo!*",
                   ne: "*Na zdrowie* कसैले हाच्छ्युँ गर्दा वा गिलास उठाएर चियर्स गर्दा भनिन्छ। यो 'निको हुनुहोस्' होइन। यहाँ धन्यवाद मात्र दिनुहोस्: *Dziękuję bardzo!*" } }
        ] }
    ],
    end: {
      en: "Well done! You described your problem with *Boli mnie głowa*, used *od* (since), *nie mam gorączki*, understood the dose and paid.",
      ne: "स्याबास! तपाईंले *Boli mnie głowa* ले समस्या बताउनुभयो, *od* (-देखि) र *nie mam gorączki* प्रयोग गर्नुभयो, औषधिको मात्रा बुझ्नुभयो र पैसा तिर्नुभयो।"
    },
    useful: [
      ["Boli mnie głowa.", "I have a headache.", "मेरो टाउको दुख्यो।", "BO-lee mnyeh GWO-va", "ˈबो-लि म्न्ये ˈग्वो-भा"],
      ["Poproszę coś na ból głowy.", "Something for a headache, please.", "टाउको दुखेकोमा केही औषधि दिनुहोस्।", "po-PRO-sheh tsosh na bool GWO-vi", "पो-ˈप्रो-शे त्सोश् ना बुल् ˈग्वो-भि"],
      ["od rana", "since the morning", "बिहानदेखि", "ot RA-na", "ओत् ˈरा-ना"],
      ["Nie mam gorączki.", "I don't have a fever.", "मलाई ज्वरो छैन।", "nyeh mam go-RONCH-kee", "न्ये माम् गो-ˈरोंच्-कि"],
      ["bez recepty", "without a prescription", "डाक्टरको पुर्जाबिना", "bez reh-TSEP-ti", "बेज़् रे-ˈत्सेप्-ति"],
      ["trzy razy dziennie", "three times a day", "दिनमा तीन पटक", "tshi RA-zi JEN-nyeh", "त्शि ˈरा-ज़ि ˈजेन्-न्ये"],
      ["po jedzeniu", "after food", "खाना खाएपछि", "po yeh-DZEH-nyoo", "पो ये-ˈद्ज़े-न्यु"],
      ["Dużo zdrowia!", "Get well soon! (lit. lots of health)", "छिटो निको हुनुहोस्!", "DOO-zho ZDRO-vya", "ˈदु-झो ˈज़्द्रो-भ्या"]
    ]
  },

  // ───────────────────────────── A2 ─────────────────────────────

  {
    id: "rp-a2-ticket",
    level: "A2",
    title: "Buying a train ticket", titleNe: "रेलको टिकट किन्दै",
    scene: {
      en: "You are at the ticket counter (*kasa*) at Warsaw station. You want to go to Poznań for the weekend and come back on Sunday.",
      ne: "तपाईं वार्सा स्टेसनको टिकट काउन्टर (*kasa*) मा हुनुहुन्छ। तपाईं सप्ताहान्तमा पोज्नान जान र आइतबार फर्कन चाहनुहुन्छ।"
    },
    them: "Kasjerka", themEn: "Ticket clerk", themNe: "टिकट काउन्टरकी कर्मचारी",
    steps: [
      { them: ["Dzień dobry, słucham.", "Hello, how can I help?", "नमस्ते, भन्नुहोस्।"],
        replies: [
          { pl: "Dzień dobry. Poproszę bilet do Poznania.", en: "Hello. A ticket to Poznań, please.", ne: "नमस्ते। पोज्नानको एउटा टिकट दिनुहोस्।", ok: true },
          { pl: "Dzień dobry. Poproszę bilet do Poznań.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *do* (to) a city name takes the genitive: *Poznań* → *do Poznania*, *Kraków* → *do Krakowa*, *Gdańsk* → *do Gdańska*, *Warszawa* → *do Warszawy*.",
                   ne: "*do* (तिर/सम्म) पछि सहरको नाम षष्ठी (genitive) मा जान्छ: *Poznań* → *do Poznania*, *Kraków* → *do Krakowa*, *Gdańsk* → *do Gdańska*, *Warszawa* → *do Warszawy*।" } },
          { pl: "Dzień dobry. Poproszę bilet w Poznaniu.", en: "Hello. A ticket in Poznań, please.", ne: "नमस्ते। पोज्नानमा एउटा टिकट दिनुहोस्।", ok: false,
            why: { en: "*W Poznaniu* means 'in Poznań' (where you are). For the direction of travel use *do*: *bilet do Poznania*.",
                   ne: "*W Poznaniu* को अर्थ 'पोज्नानमा' (कहाँ छ) हो। यात्राको दिशाका लागि *do* प्रयोग गर्नुहोस्: *bilet do Poznania*।" } }
        ] },
      { them: ["Na kiedy? Na dzisiaj?", "For when? For today?", "कहिलेको? आजको?"],
        replies: [
          { pl: "Tak, na dzisiaj, na najbliższy pociąg.", en: "Yes, for today, for the next train.", ne: "हो, आजको, सबैभन्दा छिटो छुट्ने रेलको।", ok: true },
          { pl: "Nie, na jutro rano.", en: "No, for tomorrow morning.", ne: "होइन, भोलि बिहानको।", ok: true },
          { pl: "Tak, na wczoraj.", en: "Yes, for yesterday.", ne: "हो, हिजोको।", ok: false,
            why: { en: "*Wczoraj* = yesterday, *dzisiaj* = today, *jutro* = tomorrow. You can't buy a ticket for yesterday! These three words are easy to mix up, so learn them together.",
                   ne: "*Wczoraj* = हिजो, *dzisiaj* = आज, *jutro* = भोलि। हिजोको टिकट त किन्न सकिँदैन! यी तीन शब्द सजिलै झुक्किन्छन्, त्यसैले सँगै सिक्नुहोस्।" } }
        ] },
      { them: ["Jest pociąg o dziesiątej piętnaście i o dwunastej czterdzieści.", "There's a train at 10:15 and at 12:40.", "दस बजेर पन्ध्र मिनेट र बाह्र बजेर चालीस मिनेटमा रेल छ।"],
        replies: [
          { pl: "Poproszę na dziesiątą piętnaście.", en: "The 10:15, please.", ne: "दस पन्ध्रको दिनुहोस्।", ok: true },
          { pl: "O której jest w Poznaniu?", en: "What time does it get to Poznań?", ne: "पोज्नान कति बजे पुग्छ?", ok: true },
          { pl: "Poproszę na dziesięć piętnaście.", en: "(wrong number type)", ne: "(गलत संख्या प्रकार)", ok: false,
            why: { en: "Clock times use **ordinal** numbers ('the tenth hour'): *dziesiąta*, *dwunasta*. So: *o dziesiątej* (at ten), *na dziesiątą piętnaście* (for 10:15). *Dziesięć* is just the number 10.",
                   ne: "घडीको समय **क्रमसूचक** संख्याले भनिन्छ ('दसौँ घण्टा'): *dziesiąta*, *dwunasta*। त्यसैले: *o dziesiątej* (दस बजे), *na dziesiątą piętnaście* (दस पन्ध्रको लागि)। *Dziesięć* केवल संख्या १० हो।" } }
        ] },
      { them: ["Ten o dziesiątej piętnaście jest w Poznaniu o trzynastej. Bilet w jedną stronę czy powrotny?", "The 10:15 arrives in Poznań at 13:00. One-way or return?", "दस पन्ध्रको रेल तेह्र बजे पोज्नान पुग्छ। एकतर्फी टिकट कि दोहोरो?"],
        replies: [
          { pl: "Powrotny, proszę. Wracam w niedzielę.", en: "Return, please. I'm coming back on Sunday.", ne: "दोहोरो, कृपया। म आइतबार फर्कन्छु।", ok: true },
          { pl: "W jedną stronę, proszę.", en: "One-way, please.", ne: "एकतर्फी, कृपया।", ok: true },
          { pl: "Powrotny, proszę. Wracam w niedziela.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "'On + day' is *w* + accusative: *niedziela* → *w niedzielę*, *sobota* → *w sobotę*, *środa* → *w środę*. For masculine days it doesn't change: *w poniedziałek*.",
                   ne: "'… बार' भन्न *w* + कर्म कारक (accusative) प्रयोग हुन्छ: *niedziela* → *w niedzielę*, *sobota* → *w sobotę*, *środa* → *w środę*। पुलिङ्ग बारहरू बदलिँदैनन्: *w poniedziałek*।" } }
        ] },
      { them: ["Normalny czy ulgowy?", "Full price or reduced?", "पूरा मूल्यको कि छुटवाला?"],
        replies: [
          { pl: "Normalny, proszę.", en: "Full price, please.", ne: "पूरा मूल्यको, कृपया।", ok: true },
          { pl: "Ulgowy, proszę. Pracuję w Polsce.", en: "Reduced, please. I work in Poland.", ne: "छुटवाला, कृपया। म पोल्यान्डमा काम गर्छु।", ok: false,
            why: { en: "Working in Poland does **not** give you a discount. *Ulgowy* (reduced) is for people with a right to it, e.g. students with a valid student card or pensioners. The conductor checks documents, and a wrong ticket means a fine. Ask for *normalny*.",
                   ne: "पोल्यान्डमा काम गर्दैमा छुट **पाइँदैन**। *Ulgowy* (छुटवाला) टिकट अधिकार भएका मान्छेका लागि हो, जस्तै मान्य विद्यार्थी कार्ड भएका विद्यार्थी वा पेन्सनभोगी। रेलमा टिकट जाँच्नेले कागजात हेर्छ, गलत टिकट भए जरिवाना लाग्छ। *normalny* माग्नुहोस्।" } },
          { pl: "Normalna, proszę.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "The adjective agrees with *bilet*, which is masculine: *normalny bilet*, so *normalny* (not *normalna*).",
                   ne: "विशेषण *bilet* सँग मिल्छ, जुन पुलिङ्ग हो: *normalny bilet*, त्यसैले *normalny* (*normalna* होइन)।" } }
        ] },
      { them: ["Sto dwadzieścia złotych. Miejsce przy oknie czy przy korytarzu?", "120 zloty. A window seat or an aisle seat?", "एक सय बीस ज्लोती। झ्यालछेउको सिट कि बाटोछेउको?"],
        replies: [
          { pl: "Przy oknie, proszę.", en: "By the window, please.", ne: "झ्यालछेउ, कृपया।", ok: true },
          { pl: "Wszystko jedno.", en: "It doesn't matter.", ne: "जे भए पनि हुन्छ।", ok: true },
          { pl: "Przy okno, proszę.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Przy* (by, next to) takes the locative: *okno* → *przy oknie*, *korytarz* → *przy korytarzu*.",
                   ne: "*Przy* (छेउमा) पछि अधिकरण कारक (locative) आउँछ: *okno* → *przy oknie*, *korytarz* → *przy korytarzu*।" } }
        ] },
      { them: ["Proszę bardzo. Wagon siódmy, miejsce czterdzieści dwa.", "Here you are. Carriage seven, seat forty-two.", "लिनुहोस्। डिब्बा नम्बर सात, सिट बयालीस।"],
        replies: [
          { pl: "Z którego peronu odjeżdża pociąg?", en: "Which platform does the train leave from?", ne: "रेल कुन प्लेटफर्मबाट छुट्छ?", ok: true },
          { pl: "Dziękuję. Który peron?", en: "Thank you. Which platform?", ne: "धन्यवाद। कुन प्लेटफर्म?", ok: true },
          { pl: "Z którego peron odjeżdża pociąg?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Z* (from) takes the genitive, and both words change: *który peron* → *z którego peronu*.",
                   ne: "*Z* (बाट) पछि षष्ठी (genitive) आउँछ, र दुवै शब्द बदलिन्छन्: *który peron* → *z którego peronu*।" } }
        ] },
      { them: ["Z peronu trzeciego, tor drugi. Proszę sprawdzić na tablicy.", "From platform three, track two. Please check on the board.", "प्लेटफर्म तीन, ट्र्याक दुई। बोर्डमा पनि हेर्नुहोस्।"],
        replies: [
          { pl: "Peron trzeci, tor drugi. Dziękuję bardzo!", en: "Platform three, track two. Thank you very much!", ne: "प्लेटफर्म तीन, ट्र्याक दुई। धेरै धन्यवाद!", ok: true },
          { pl: "Peron drugi, tor trzeci? Dziękuję.", en: "Platform two, track three? Thank you.", ne: "प्लेटफर्म दुई, ट्र्याक तीन? धन्यवाद।", ok: false,
            why: { en: "You mixed them up. *Peron* is the platform you stand on; *tor* is the track number. In Poland one *peron* usually has two *tory*, so you need both numbers: here *peron 3, tor 2*.",
                   ne: "तपाईंले उल्टो बुझ्नुभयो। *Peron* = तपाईं उभिने प्लेटफर्म; *tor* = रेलको लाइन (ट्र्याक) नम्बर। पोल्यान्डमा एउटा *peron* मा प्रायः दुईवटा *tory* हुन्छन्, त्यसैले दुवै नम्बर चाहिन्छ: यहाँ *peron 3, tor 2*।" } },
          { pl: "Dziękuję. Gdzie jest peron trzecia?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Peron* is masculine, so the ordinal is masculine too: *peron trzeci* (third platform). *Trzecia* is feminine, e.g. *trzecia godzina*.",
                   ne: "*Peron* पुलिङ्ग हो, त्यसैले क्रमसूचक संख्या पनि पुलिङ्ग हुन्छ: *peron trzeci* (तेस्रो प्लेटफर्म)। *Trzecia* स्त्रीलिङ्ग हो, जस्तै *trzecia godzina*।" } }
        ] }
    ],
    end: {
      en: "Excellent! You bought a return ticket *do Poznania*, chose a time, a ticket type and a seat, and you know the difference between *peron* and *tor*.",
      ne: "उत्कृष्ट! तपाईंले *do Poznania* को दोहोरो टिकट किन्नुभयो, समय, टिकटको प्रकार र सिट रोज्नुभयो, अनि *peron* र *tor* को फरक पनि बुझ्नुभयो।"
    },
    useful: [
      ["Poproszę bilet do Poznania.", "A ticket to Poznań, please.", "पोज्नानको एउटा टिकट दिनुहोस्।", "po-PRO-sheh BEE-let do poz-NA-nya", "पो-ˈप्रो-शे ˈबि-लेत् दो पोज़्-ˈना-न्या"],
      ["W jedną stronę czy powrotny?", "One-way or return?", "एकतर्फी कि दोहोरो?", "v YED-non STRO-neh chi po-VROT-ni", "भ् ˈयेद्-नों ˈस्त्रो-ने चि पो-ˈभ्रोत्-नि"],
      ["Normalny czy ulgowy?", "Full price or reduced?", "पूरा मूल्यको कि छुटवाला?", "nor-MAL-ni chi ool-GO-vi", "नोर्-ˈमाल्-नि चि उल्-ˈगो-भि"],
      ["Przy oknie, proszę.", "By the window, please.", "झ्यालछेउ, कृपया।", "pshi OK-nyeh PRO-sheh", "प्शि ˈओक्-न्ये ˈप्रो-शे"],
      ["Z którego peronu odjeżdża pociąg?", "Which platform does the train leave from?", "रेल कुन प्लेटफर्मबाट छुट्छ?", "s ktoo-REH-go peh-RO-noo od-YEZH-ja PO-chonk", "स् क्तु-ˈरे-गो पे-ˈरो-नु ओद्-ˈयेझ्-जा ˈपो-चोंक्"],
      ["peron", "platform", "प्लेटफर्म", "PEH-ron", "ˈपे-रोन्"],
      ["tor", "track (number)", "रेलको लाइन (ट्र्याक)", "tor", "तोर्"]
    ]
  },

  {
    id: "rp-a2-firstday",
    level: "A2",
    title: "First day at the warehouse", titleNe: "गोदाममा पहिलो दिन",
    scene: {
      en: "It is your first morning at a big warehouse. The shift supervisor, Mr Marek Nowak, meets you at the entrance and explains the shifts, the breaks and the safety rules.",
      ne: "ठूलो गोदाममा आज तपाईंको पहिलो बिहान हो। सिफ्ट सुपरभाइजर मारेक नोभाक तपाईंलाई प्रवेशद्वारमा भेट्छन् र सिफ्ट, ब्रेक र सुरक्षाका नियम बुझाउँछन्।"
    },
    them: "Pan Marek", themEn: "Mr Marek, shift supervisor", themNe: "मारेकजी, सिफ्ट सुपरभाइजर",
    steps: [
      { them: ["Dzień dobry! Marek Nowak, kierownik zmiany. Pierwszy dzień?", "Good morning! Marek Nowak, shift supervisor. First day?", "नमस्ते! म मारेक नोभाक, सिफ्ट सुपरभाइजर। पहिलो दिन हो?"],
        replies: [
          { pl: "Dzień dobry. Tak, pierwszy dzień. Nazywam się Ram Thapa.", en: "Good morning. Yes, first day. My name is Ram Thapa.", ne: "नमस्ते। हो, पहिलो दिन। मेरो नाम राम थापा हो।", ok: true },
          { pl: "Cześć, Marek! Tak.", en: "Hi, Marek! Yes.", ne: "हाइ, मारेक! हो।", ok: false,
            why: { en: "He is your boss and you have just met. Use the formal style: *Dzień dobry*, and *pan* / *panie Marku* — not *cześć* and his bare first name. Switch to *ty* only if he offers it (*Mówmy sobie na ty*).",
                   ne: "उहाँ तपाईंको हाकिम हुनुहुन्छ र भर्खर भेट भएको हो। औपचारिक शैली प्रयोग गर्नुहोस्: *Dzień dobry*, र *pan* / *panie Marku* — *cześć* र खाली नाम होइन। उहाँले आफैँ प्रस्ताव गरेपछि मात्र *ty* मा जानुहोस् (*Mówmy sobie na ty*)।" } },
          { pl: "Dzień dobry. Tak, jestem pierwszy.", en: "Good morning. Yes, I'm first.", ne: "नमस्ते। हो, म पहिलो हुँ।", ok: false,
            why: { en: "*Jestem pierwszy* means 'I am first' (e.g. first in the queue). He asked about your first day, so answer *Tak, pierwszy dzień.*",
                   ne: "*Jestem pierwszy* को अर्थ 'म पहिलो हुँ' हो (जस्तै लाइनमा पहिलो)। उहाँले पहिलो दिनबारे सोध्नुभयो, त्यसैले *Tak, pierwszy dzień.* भन्नुहोस्।" } }
        ] },
      { them: ["Witamy! Pracujemy na trzy zmiany. W tym tygodniu jest pierwsza zmiana: od szóstej do czternastej.", "Welcome! We work in three shifts. This week it's the first shift: from six to two.", "स्वागत छ! हामी तीन सिफ्टमा काम गर्छौं। यो हप्ता पहिलो सिफ्ट हो: बिहान छ बजेदेखि दिउँसो दुई बजेसम्म।"],
        replies: [
          { pl: "Od szóstej do czternastej. Rozumiem.", en: "From six to two. I understand.", ne: "छ बजेदेखि दुई बजेसम्म। बुझेँ।", ok: true },
          { pl: "Dobrze. A w przyszłym tygodniu?", en: "OK. And next week?", ne: "ठीक छ। अनि अर्को हप्ता?", ok: true },
          { pl: "Od sześć do czternaście?", en: "(wrong number forms)", ne: "(संख्याको गलत रूप)", ok: false,
            why: { en: "For clock times use ordinal forms, and after *od* (from) and *do* (to) they take the ending -ej: *od szóstej do czternastej* (from 6:00 to 14:00). Poland uses the 24-hour clock at work.",
                   ne: "घडीको समयमा क्रमसूचक रूप प्रयोग हुन्छ, र *od* (देखि) र *do* (सम्म) पछि -ej अन्त्य लाग्छ: *od szóstej do czternastej* (६:०० देखि १४:०० सम्म)। पोल्यान्डमा काममा २४ घण्टाको घडी चल्छ।" } }
        ] },
      { them: ["W przyszłym tygodniu jest druga zmiana, od czternastej do dwudziestej drugiej. Grafik wisi przy wejściu.", "Next week it's the second shift, from 14:00 to 22:00. The schedule is on the wall by the entrance.", "अर्को हप्ता दोस्रो सिफ्ट हो, दिउँसो दुई बजेदेखि राति दस बजेसम्म। तालिका प्रवेशद्वार छेउमा टाँसिएको छ।"],
        replies: [
          { pl: "Dobrze. Kiedy jest przerwa?", en: "OK. When is the break?", ne: "ठीक छ। ब्रेक कहिले हुन्छ?", ok: true },
          { pl: "Rozumiem. A ile trwa przerwa?", en: "I see. And how long is the break?", ne: "बुझेँ। अनि ब्रेक कति लामो हुन्छ?", ok: true },
          { pl: "Dobrze. Kiedy jest przerwę?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "Here *przerwa* is the subject ('the break is'), so it stays in the basic form. The -ę ending is for an object, e.g. *Mam przerwę* (I have a break).",
                   ne: "यहाँ *przerwa* कर्ता हो ('ब्रेक हुन्छ'), त्यसैले मूल रूपमै रहन्छ। -ę अन्त्य कर्मका लागि हो, जस्तै *Mam przerwę* (मेरो ब्रेक छ)।" } }
        ] },
      { them: ["Przerwa jest o dziesiątej i trwa trzydzieści minut. Stołówka jest na pierwszym piętrze.", "The break is at ten and lasts thirty minutes. The canteen is on the first floor.", "ब्रेक दस बजे हुन्छ र तीस मिनेटको हुन्छ। क्यान्टिन पहिलो तल्लामा छ।"],
        replies: [
          { pl: "Czy w stołówce jest mikrofalówka?", en: "Is there a microwave in the canteen?", ne: "के क्यान्टिनमा माइक्रोवेभ छ?", ok: true },
          { pl: "Dziękuję. A gdzie są szafki?", en: "Thank you. And where are the lockers?", ne: "धन्यवाद। अनि लकरहरू कहाँ छन्?", ok: true },
          { pl: "Na pierwszym piętrze? Czyli na parterze?", en: "On the first floor? So, on the ground floor?", ne: "पहिलो तल्लामा? अर्थात् भुइँ तल्लामा?", ok: false,
            why: { en: "No. In Poland *parter* is the ground floor, and *pierwsze piętro* is one floor up — the same as in Nepal (भुइँ तल्ला, पहिलो तल्ला). So the canteen is upstairs.",
                   ne: "होइन। पोल्यान्डमा *parter* भुइँ तल्ला हो, र *pierwsze piętro* एक तल्ला माथि — नेपालमा जस्तै (भुइँ तल्ला, पहिलो तल्ला)। त्यसैले क्यान्टिन माथि छ।" } }
        ] },
      { them: ["Szafki i mikrofalówka są obok stołówki. Teraz najważniejsze: bezpieczeństwo. W magazynie zawsze trzeba nosić kamizelkę odblaskową i buty robocze.", "The lockers and the microwave are next to the canteen. Now the most important thing: safety. In the warehouse you must always wear a high-visibility vest and work boots.", "लकर र माइक्रोवेभ क्यान्टिनको छेउमा छन्। अब सबैभन्दा महत्त्वपूर्ण कुरा: सुरक्षा। गोदाममा सधैं चम्किलो (रिफ्लेक्टिभ) सुरक्षा भेस्ट र कामको जुत्ता लगाउनैपर्छ।"],
        replies: [
          { pl: "Rozumiem. Gdzie mogę dostać kamizelkę?", en: "I understand. Where can I get a vest?", ne: "बुझेँ। सुरक्षा भेस्ट कहाँ पाइन्छ?", ok: true },
          { pl: "Mam buty robocze, ale nie mam kamizelki.", en: "I have work boots, but I don't have a vest.", ne: "मसँग कामको जुत्ता छ, तर सुरक्षा भेस्ट छैन।", ok: true },
          { pl: "Mam buty robocze, ale nie mam kamizelkę.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *nie mam* the noun goes into the genitive: *kamizelka* → *nie mam kamizelki*. Compare: *mam kamizelkę* (I have a vest) but *nie mam kamizelki* (I don't have a vest).",
                   ne: "*nie mam* पछि नाम षष्ठी (genitive) मा जान्छ: *kamizelka* → *nie mam kamizelki*। तुलना गर्नुहोस्: *mam kamizelkę* (मसँग सुरक्षा भेस्ट छ) तर *nie mam kamizelki* (मसँग सुरक्षा भेस्ट छैन)।" } }
        ] },
      { them: ["Zaraz przyniosę kamizelkę i rękawice. I jeszcze jedno: nie wolno chodzić tam, gdzie jeżdżą wózki widłowe.", "I'll bring a vest and gloves right away. And one more thing: you must not walk where the forklifts drive.", "म अहिल्यै सुरक्षा भेस्ट र पन्जा ल्याइदिन्छु। अनि अर्को कुरा: फोर्कलिफ्ट चल्ने ठाउँमा हिँड्न पाइँदैन।"],
        replies: [
          { pl: "Dobrze, rozumiem. Będę uważać.", en: "OK, I understand. I'll be careful.", ne: "ठीक छ, बुझेँ। म होसियार हुनेछु।", ok: true },
          { pl: "Rozumiem. Gdzie mogę chodzić?", en: "I understand. Where can I walk?", ne: "बुझेँ। म कहाँ हिँड्न सक्छु?", ok: true },
          { pl: "Dobrze, ale mogę tam szybko przejść, prawda?", en: "OK, but I can walk through there quickly, right?", ne: "ठीक छ, तर म त्यहाँबाट छिटो पार गर्न सक्छु, हैन?", ok: false,
            why: { en: "*Nie wolno* means it is **forbidden** — no exceptions, not even quickly. Forklift drivers often can't see people. Use only the marked walkways. Safety rules at work are serious: breaking them can cost your health and your job.",
                   ne: "*Nie wolno* को अर्थ **निषेधित** हो — कुनै छुट छैन, छिटो गए पनि हुँदैन। फोर्कलिफ्ट चालकले प्रायः मान्छे देख्दैनन्। चिन्ह लगाइएको बाटो मात्र प्रयोग गर्नुहोस्। कामका सुरक्षा नियम गम्भीर हुन्छन्: तोड्दा स्वास्थ्य र जागिर दुवै जान सक्छ।" } }
        ] },
      { them: ["Jeśli są pytania, proszę pytać mnie albo lidera. Wszystko jasne?", "If there are questions, please ask me or the team leader. Is everything clear?", "केही प्रश्न भए मलाई वा टिम लिडरलाई सोध्नुहोस्। सबै स्पष्ट भयो?"],
        replies: [
          { pl: "Tak, wszystko jasne. Dziękuję, panie Marku.", en: "Yes, everything is clear. Thank you, Mr Marek.", ne: "हो, सबै स्पष्ट भयो। धन्यवाद, मारेकजी।", ok: true },
          { pl: "Prawie wszystko. Czy może pan powtórzyć, gdzie jest grafik?", en: "Almost everything. Could you repeat where the schedule is?", ne: "लगभग सबै। तालिका कहाँ छ, फेरि भन्नुहुन्छ?", ok: true },
          { pl: "Tak, wszystko jasne. Dziękuję, pan Marek.", en: "(wrong form of address)", ne: "(सम्बोधनको गलत रूप)", ok: false,
            why: { en: "When you speak **to** someone, Polish uses the vocative: *pan Marek* → *panie Marku*, *pani Anna* → *pani Anno*. *Pan Marek* is how you talk **about** him.",
                   ne: "कसैलाई सीधै **सम्बोधन** गर्दा पोलिशमा सम्बोधन कारक (vocative) प्रयोग हुन्छ: *pan Marek* → *panie Marku*, *pani Anna* → *pani Anno*। *Pan Marek* उहाँको **बारेमा** कुरा गर्दा भनिन्छ।" } }
        ] }
    ],
    end: {
      en: "Very good! You spoke formally to your supervisor, understood the shift times, the break, the floors and the safety rules (*nie wolno*), and you used the vocative *panie Marku*.",
      ne: "धेरै राम्रो! तपाईंले सुपरभाइजरसँग औपचारिक भएर बोल्नुभयो, सिफ्टको समय, ब्रेक, तल्ला र सुरक्षा नियम (*nie wolno*) बुझ्नुभयो, अनि सम्बोधन रूप *panie Marku* प्रयोग गर्नुभयो।"
    },
    useful: [
      ["kierownik zmiany", "shift supervisor", "सिफ्ट सुपरभाइजर", "kyeh-ROV-neek ZMYA-ni", "क्ये-ˈरोभ्-निक् ˈज़्म्या-नि"],
      ["od szóstej do czternastej", "from 6:00 to 14:00", "छ बजेदेखि दुई (१४) बजेसम्म", "ot SHOOS-tey do chter-NAS-tey", "ओत् ˈशुस्-तेय् दो च्तेर्-ˈनास्-तेय्"],
      ["Kiedy jest przerwa?", "When is the break?", "ब्रेक कहिले हुन्छ?", "KYEH-di yest PSHER-va", "ˈक्ये-दि येस्त् ˈप्शेर्-भा"],
      ["Ile trwa przerwa?", "How long is the break?", "ब्रेक कति लामो हुन्छ?", "EE-leh trfa PSHER-va", "ˈइ-ले त्र्फ़ा ˈप्शेर्-भा"],
      ["kamizelka odblaskowa", "high-visibility vest", "चम्किलो सुरक्षा भेस्ट", "ka-mee-ZEL-ka od-blas-KO-va", "का-मि-ˈज़ेल्-का ओद्-ब्लास्-ˈको-भा"],
      ["Nie wolno.", "It's forbidden. / You must not.", "पाइँदैन। / निषेधित छ।", "nyeh VOL-no", "न्ये ˈभोल्-नो"],
      ["parter", "ground floor", "भुइँ तल्ला", "PAR-ter", "ˈपार्-तेर्"],
      ["Dziękuję, panie Marku.", "Thank you, Mr Marek.", "धन्यवाद, मारेकजी।", "jen-KOO-yeh PA-nyeh MAR-koo", "जेन्-ˈकु-ये ˈपा-न्ये ˈमार्-कु"]
    ]
  },

  {
    id: "rp-a2-sick",
    level: "A2",
    title: "Calling in sick", titleNe: "बिरामी भएको खबर फोनमा दिँदै",
    scene: {
      en: "It is 5 a.m. You woke up with a high fever and a sore throat. Your shift starts at 6. You phone your supervisor, Mrs Anna Kowalska, before the shift starts.",
      ne: "बिहानको ५ बजेको छ। तपाईं उठ्दा तपाईंलाई उच्च ज्वरो छ र घाँटी दुखेको छ। तपाईंको सिफ्ट ६ बजे सुरु हुन्छ। सिफ्ट सुरु हुनुअघि तपाईं आफ्नी सुपरभाइजर आन्ना कोवाल्स्कालाई फोन गर्नुहुन्छ।"
    },
    them: "Pani Anna", themEn: "Mrs Anna, supervisor", themNe: "आन्नाजी, सुपरभाइजर",
    steps: [
      { them: ["Halo, Anna Kowalska, słucham.", "Hello, Anna Kowalska speaking.", "हेलो, म आन्ना कोवाल्स्का, भन्नुहोस्।"],
        replies: [
          { pl: "Dzień dobry, tu Ram Thapa z porannej zmiany.", en: "Good morning, this is Ram Thapa from the morning shift.", ne: "नमस्ते, म बिहानको सिफ्टको राम थापा बोल्दैछु।", ok: true },
          { pl: "Halo, kto mówi?", en: "Hello, who's speaking?", ne: "हेलो, को बोल्दै हुनुहुन्छ?", ok: false,
            why: { en: "**You** called her, and she already said her name. Now introduce yourself: *Dzień dobry, tu…* (Hello, this is…). On the phone Poles say *tu* + name, not *jestem*.",
                   ne: "फोन **तपाईंले** गर्नुभएको हो, र उहाँले आफ्नो नाम भनिसक्नुभयो। अब आफ्नो परिचय दिनुहोस्: *Dzień dobry, tu…* (नमस्ते, म … बोल्दैछु)। फोनमा पोलिशहरू *jestem* होइन, *tu* + नाम भन्छन्।" } },
          { pl: "Cześć, Anna, tu Ram.", en: "Hi, Anna, it's Ram.", ne: "हाइ, आन्ना, म राम।", ok: false,
            why: { en: "She is your supervisor, so be formal: *Dzień dobry* and *pani* (or *pani Anno*). *Cześć* is only for friends and close coworkers.",
                   ne: "उहाँ तपाईंकी सुपरभाइजर हुनुहुन्छ, त्यसैले औपचारिक हुनुहोस्: *Dzień dobry* र *pani* (वा *pani Anno*)। *Cześć* साथी र नजिकका सहकर्मीका लागि मात्र हो।" } }
        ] },
      { them: ["Dzień dobry. Co się stało?", "Good morning. What happened?", "नमस्ते। के भयो?"],
        replies: [
          { pl: "Przepraszam, ale dzisiaj nie mogę przyjść do pracy. Źle się czuję.", en: "I'm sorry, but I can't come to work today. I feel unwell.", ne: "माफ गर्नुहोस्, तर आज म काममा आउन सक्दिनँ। मलाई सन्चो छैन।", ok: true },
          { pl: "Przepraszam, dzisiaj nie mogę przyjść do pracy. Mam gorączkę.", en: "I'm sorry, I can't come to work today. I have a fever.", ne: "माफ गर्नुहोस्, आज म काममा आउन सक्दिनँ। मलाई ज्वरो आएको छ।", ok: true },
          { pl: "Przepraszam, dzisiaj nie mogę przyjść w pracy.", en: "(wrong preposition)", ne: "(गलत पूर्वसर्ग)", ok: false,
            why: { en: "With movement (*przyjść*, *iść*) use *do pracy* (to work). *W pracy* means 'at work' (where you are): *Jestem w pracy*.",
                   ne: "गतिसूचक क्रिया (*przyjść*, *iść*) सँग *do pracy* (काममा/कामतिर) प्रयोग हुन्छ। *W pracy* को अर्थ 'काममा (भएको ठाउँ)' हो: *Jestem w pracy*।" } }
        ] },
      { them: ["Ojej. A co dokładnie?", "Oh dear. What exactly?", "ओहो। ठ्याक्कै के भयो?"],
        replies: [
          { pl: "Mam wysoką gorączkę i boli mnie gardło.", en: "I have a high fever and a sore throat.", ne: "मलाई उच्च ज्वरो छ र घाँटी दुखेको छ।", ok: true },
          { pl: "Mam wysoka gorączka.", en: "(wrong endings)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *mam* both the noun and its adjective change: *wysoka gorączka* → *mam wysoką gorączkę* (-a → -ą for the adjective, -a → -ę for the noun).",
                   ne: "*mam* पछि नाम र विशेषण दुवै बदलिन्छन्: *wysoka gorączka* → *mam wysoką gorączkę* (विशेषणमा -a → -ą, नाममा -a → -ę)।" } },
          { pl: "Bolę gardło.", en: "(wrong structure)", ne: "(गलत संरचना)", ok: false,
            why: { en: "Polish says 'the throat hurts **me**': *Boli mnie gardło* (like Nepali मलाई घाँटी दुख्यो). *Bolę* is not used this way.",
                   ne: "पोलिशमा 'घाँटीले **मलाई** दुखायो' जस्तो भनिन्छ: *Boli mnie gardło* (नेपालीको 'मलाई घाँटी दुख्यो' जस्तै)। *Bolę* यसरी प्रयोग हुँदैन।" } }
        ] },
      { them: ["Rozumiem. Trzeba iść do lekarza po zwolnienie.", "I understand. You need to go to the doctor for a sick note.", "बुझेँ। बिरामी बिदाको कागजका लागि डाक्टरकहाँ जानुपर्छ।"],
        replies: [
          { pl: "Tak, mam wizytę u lekarza o jedenastej.", en: "Yes, I have a doctor's appointment at eleven.", ne: "हो, मेरो एघार बजे डाक्टरसँग भेट छ।", ok: true },
          { pl: "Tak, dzisiaj idę do lekarza.", en: "Yes, I'm going to the doctor today.", ne: "हो, आज म डाक्टरकहाँ जाँदैछु।", ok: true },
          { pl: "Tak, dzisiaj idę do lekarz.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "After *do* the noun takes the genitive: *lekarz* → *do lekarza*. Also *do pracy*, *do apteki*, *do domu*.",
                   ne: "*do* पछि नाम षष्ठी (genitive) मा जान्छ: *lekarz* → *do lekarza*। त्यस्तै *do pracy*, *do apteki*, *do domu*।" } }
        ] },
      { them: ["Dobrze. Zwolnienie będzie w systemie, ale proszę mi potem napisać SMS, na ile dni.", "OK. The sick note will be in the system, but please text me afterwards for how many days.", "ठीक छ। बिरामी बिदाको कागज सिस्टममै आउँछ, तर पछि कति दिनको हो भनेर मलाई SMS पठाउनुहोस्।"],
        replies: [
          { pl: "Dobrze, napiszę SMS po wizycie.", en: "OK, I'll text you after the appointment.", ne: "हुन्छ, डाक्टरसँग भेटपछि म SMS लेख्छु।", ok: true },
          { pl: "Oczywiście, napiszę, na ile dni.", en: "Of course, I'll write for how many days.", ne: "अवश्य, कति दिनको हो भनेर लेख्छु।", ok: true },
          { pl: "Dobrze, napisałem SMS.", en: "OK, I wrote a text.", ne: "हुन्छ, मैले SMS लेखेँ।", ok: false,
            why: { en: "*Napisałem* is the past tense ('I wrote'). You will text her later, so use the future: *napiszę* (I will write). The doctor sends the sick note (*e-zwolnienie*, often called *L4*) online to your employer, but always tell your supervisor too.",
                   ne: "*Napisałem* भूतकाल हो ('मैले लेखेँ')। तपाईं पछि लेख्नुहुन्छ, त्यसैले भविष्यत् काल चाहिन्छ: *napiszę* (म लेख्नेछु)। डाक्टरले बिरामी बिदाको कागज (*e-zwolnienie*, प्रायः *L4* भनिन्छ) अनलाइन रोजगारदातालाई पठाउँछन्, तर सुपरभाइजरलाई पनि सधैं खबर गर्नुहोस्।" } }
        ] },
      { them: ["A jutro? Wiadomo już?", "And tomorrow? Do you know yet?", "अनि भोलि? थाहा भइसक्यो?"],
        replies: [
          { pl: "Jeszcze nie wiem. Zadzwonię do pani wieczorem.", en: "I don't know yet. I'll call you this evening.", ne: "अझै थाहा छैन। म तपाईंलाई साँझ फोन गर्छु।", ok: true },
          { pl: "Nie wiem, to zależy od lekarza.", en: "I don't know, it depends on the doctor.", ne: "थाहा छैन, डाक्टरमा भर पर्छ।", ok: true },
          { pl: "Jeszcze nie wiem. Zadzwonię do ciebie wieczorem.", en: "I don't know yet. I'll call you (informal) this evening.", ne: "अझै थाहा छैन। म तिमीलाई साँझ फोन गर्छु।", ok: false,
            why: { en: "*Do ciebie* is the informal 'you' (तिमी). To your supervisor use the formal form: *do pani* (to a woman) or *do pana* (to a man).",
                   ne: "*Do ciebie* अनौपचारिक 'तिमी' हो। सुपरभाइजरलाई औपचारिक रूप प्रयोग गर्नुहोस्: *do pani* (महिलालाई) वा *do pana* (पुरुषलाई)।" } }
        ] },
      { them: ["W porządku. Proszę odpoczywać. Zdrowia!", "All right. Please rest. Get well!", "ठीक छ। आराम गर्नुहोस्। छिटो निको हुनुहोस्!"],
        replies: [
          { pl: "Dziękuję bardzo. Przepraszam za kłopot. Do widzenia.", en: "Thank you very much. Sorry for the trouble. Goodbye.", ne: "धेरै धन्यवाद। दुःख दिएकोमा माफ गर्नुहोस्। नमस्ते।", ok: true },
          { pl: "Dziękuję. Do usłyszenia.", en: "Thank you. Talk to you soon.", ne: "धन्यवाद। फेरि फोनमा कुरा गरौँला।", ok: true },
          { pl: "Nie ma za co. Do widzenia.", en: "You're welcome. Goodbye.", ne: "केही छैन। नमस्ते।", ok: false,
            why: { en: "*Nie ma za co* is the answer when someone thanks **you**. She didn't thank you — she wished you health, so **you** say *Dziękuję*. On the phone *Do usłyszenia* ('until we hear each other') is a nice goodbye.",
                   ne: "*Nie ma za co* कसैले **तपाईंलाई** धन्यवाद दिँदा भनिन्छ। उहाँले धन्यवाद दिनुभएन — स्वास्थ्यको शुभकामना दिनुभयो, त्यसैले **तपाईं** *Dziękuję* भन्नुहोस्। फोनमा *Do usłyszenia* ('फेरि सुनौँला') राम्रो बिदाइ हो।" } }
        ] }
    ],
    end: {
      en: "Well done! You called before your shift, introduced yourself with *tu…*, explained your symptoms, stayed formal (*do pani*) and promised to send the sick-note details. In Poland, always tell your employer on the **first day** you are ill.",
      ne: "स्याबास! तपाईंले सिफ्टअघि नै फोन गर्नुभयो, *tu…* भनेर परिचय दिनुभयो, लक्षण बताउनुभयो, औपचारिक रहनुभयो (*do pani*) र बिरामी बिदाको विवरण पठाउने वाचा गर्नुभयो। पोल्यान्डमा बिरामी भएको **पहिलो दिन** नै रोजगारदातालाई खबर गर्नुहोस्।"
    },
    useful: [
      ["Dzień dobry, tu Ram Thapa.", "Hello, this is Ram Thapa. (on the phone)", "नमस्ते, म राम थापा बोल्दैछु।", "jen DOB-ri too ram TA-pa", "जेन् ˈदोब्-रि तु राम् ˈता-पा"],
      ["Dzisiaj nie mogę przyjść do pracy.", "I can't come to work today.", "आज म काममा आउन सक्दिनँ।", "JEE-shay nyeh MO-geh pshiyshch do PRA-tsi", "ˈजि-शाय् न्ये ˈमो-गे प्शिय्श्च् दो ˈप्रा-त्सि"],
      ["Źle się czuję.", "I feel unwell.", "मलाई सन्चो छैन।", "zhleh sheh CHOO-yeh", "झ्ले शे ˈचु-ये"],
      ["Mam wysoką gorączkę.", "I have a high fever.", "मलाई उच्च ज्वरो छ।", "mam vi-SO-kon go-RONCH-keh", "माम् भि-ˈसो-कों गो-ˈरोंच्-के"],
      ["Boli mnie gardło.", "I have a sore throat.", "मेरो घाँटी दुख्यो।", "BO-lee mnyeh GARD-wo", "ˈबो-लि म्न्ये ˈगार्द्-वो"],
      ["zwolnienie lekarskie", "sick note (L4)", "बिरामी बिदाको कागज (L4)", "zvol-NYEH-nyeh leh-KAR-skyeh", "ज़्भोल्-ˈन्ये-न्ये ले-ˈकार्-स्क्ये"],
      ["Zadzwonię do pani wieczorem.", "I'll call you this evening. (to a woman)", "म तपाईंलाई साँझ फोन गर्छु। (महिलालाई)", "za-DZVO-nyeh do PA-nee vyeh-CHO-rem", "ज़ा-ˈद्ज़्भो-न्ये दो ˈपा-नि भ्ये-ˈचो-रेम्"],
      ["Do usłyszenia.", "Talk to you soon. (phone goodbye)", "फेरि फोनमा कुरा गरौँला।", "do oo-swi-SHEH-nya", "दो उ-स्वि-ˈशे-न्या"]
    ]
  },

  {
    id: "rp-a2-room",
    level: "A2",
    title: "Viewing a room to rent", titleNe: "भाडामा कोठा हेर्दै",
    scene: {
      en: "You saw an advert for a room in a shared flat. Yesterday you spoke to the owner, Mr Tomasz, on the phone. Now you are viewing the room. Ask about the price, the bills, the deposit, the contract and when it is free.",
      ne: "तपाईंले साझा फ्ल्याटमा एउटा कोठाको विज्ञापन देख्नुभयो। हिजो घरधनी तोमासजीसँग फोनमा कुरा भयो। अहिले तपाईं कोठा हेर्दै हुनुहुन्छ। भाडा, बिल, धरौटी, सम्झौता र कोठा कहिलेदेखि खाली छ भनेर सोध्नुहोस्।"
    },
    them: "Pan Tomasz", themEn: "Mr Tomasz, the landlord", themNe: "तोमासजी, घरधनी",
    steps: [
      { them: ["Dzień dobry! W sprawie pokoju, tak? Proszę wejść.", "Hello! About the room, right? Please come in.", "नमस्ते! कोठाको बारेमा, हो नि? भित्र आउनुहोस्।"],
        replies: [
          { pl: "Dzień dobry. Tak, rozmawialiśmy wczoraj przez telefon.", en: "Hello. Yes, we spoke on the phone yesterday.", ne: "नमस्ते। हो, हामीले हिजो फोनमा कुरा गरेका थियौँ।", ok: true },
          { pl: "Dzień dobry. Tak, w sprawie ogłoszenia.", en: "Hello. Yes, about the advert.", ne: "नमस्ते। हो, विज्ञापनको बारेमा।", ok: true },
          { pl: "Cześć! Tak, pokój.", en: "Hi! Yes, room.", ne: "हाइ! हो, कोठा।", ok: false,
            why: { en: "A landlord you don't know is a formal situation: *Dzień dobry*, *pan*. A polite, full sentence also makes a better impression — owners choose tenants they trust.",
                   ne: "नचिनेको घरधनीसँगको कुराकानी औपचारिक हुन्छ: *Dzień dobry*, *pan*। नम्र र पूरा वाक्यले राम्रो छाप पनि छोड्छ — घरधनीहरू भरोसा लाग्ने भाडावाल रोज्छन्।" } }
        ] },
      { them: ["To jest pokój. Ma dwanaście metrów i jest umeblowany.", "This is the room. It's twelve square metres and furnished.", "यो कोठा हो। बाह्र वर्गमिटरको छ र फर्निचर पनि छ।"],
        replies: [
          { pl: "Jest bardzo jasny. Ile kosztuje miesięcznie?", en: "It's very bright. How much is it per month?", ne: "धेरै उज्यालो छ। महिनाको कति हो?", ok: true },
          { pl: "Ładny pokój. Jaki jest czynsz?", en: "Nice room. What's the rent?", ne: "राम्रो कोठा। भाडा कति हो?", ok: true },
          { pl: "Ładna pokój. Ile kosztuje?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Pokój* ends in a consonant, so it is masculine: *ładny pokój*. Don't be fooled by the ó — it doesn't change the gender. *Ładna* is for feminine words: *ładna kuchnia*.",
                   ne: "*Pokój* व्यञ्जनमा टुंगिन्छ, त्यसैले पुलिङ्ग हो: *ładny pokój*। ó देखेर नझुक्किनुहोस् — यसले लिङ्ग बदल्दैन। *Ładna* स्त्रीलिङ्ग शब्दका लागि हो: *ładna kuchnia*।" } }
        ] },
      { them: ["Tysiąc dwieście złotych miesięcznie.", "1,200 zloty a month.", "महिनाको एक हजार दुई सय ज्लोती।"],
        replies: [
          { pl: "Czy rachunki są wliczone w cenę?", en: "Are the bills included in the price?", ne: "के बिलहरू भाडामै समावेश छन्?", ok: true },
          { pl: "A rachunki? Prąd, gaz, internet?", en: "And the bills? Electricity, gas, internet?", ne: "अनि बिल? बिजुली, ग्यास, इन्टरनेट?", ok: true },
          { pl: "Czy rachunek są wliczone w cenę?", en: "(singular and plural mixed)", ne: "(एकवचन र बहुवचन मिसियो)", ok: false,
            why: { en: "*Rachunek* is one bill; *rachunki* is bills (plural). The verb *są* is plural, so you need *rachunki*: *Czy rachunki są wliczone w cenę?*",
                   ne: "*Rachunek* = एउटा बिल; *rachunki* = बिलहरू (बहुवचन)। क्रिया *są* बहुवचन हो, त्यसैले *rachunki* चाहिन्छ: *Czy rachunki są wliczone w cenę?*" } }
        ] },
      { them: ["Nie, rachunki są osobno, około stu pięćdziesięciu złotych miesięcznie. Internet jest w cenie.", "No, bills are separate, about 150 zloty a month. Internet is included.", "होइन, बिल छुट्टै तिर्नुपर्छ, महिनाको करिब एक सय पचास ज्लोती। इन्टरनेट भाडामै पर्छ।"],
        replies: [
          { pl: "Rozumiem. A czy trzeba zapłacić kaucję?", en: "I see. And do I need to pay a deposit?", ne: "बुझेँ। अनि धरौटी तिर्नुपर्छ?", ok: true },
          { pl: "Dobrze. A kaucja?", en: "OK. And is there a deposit?", ne: "ठीक छ। अनि धरौटी?", ok: true },
          { pl: "Rozumiem. A ile kosztuje internet?", en: "I see. And how much is the internet?", ne: "बुझेँ। अनि इन्टरनेट कतिको हो?", ok: false,
            why: { en: "He just said *Internet jest w cenie* = the internet is included in the price, so it costs nothing extra. Listen for *w cenie* / *wliczone* (included) and *osobno* (separately).",
                   ne: "उहाँले भर्खरै *Internet jest w cenie* भन्नुभयो = इन्टरनेट भाडामै पर्छ, छुट्टै पैसा लाग्दैन। *w cenie* / *wliczone* (समावेश) र *osobno* (छुट्टै) ध्यान दिएर सुन्नुहोस्।" } }
        ] },
      { them: ["Tak, kaucja to jeden czynsz, czyli tysiąc dwieście. Oddaję ją na koniec umowy, jeśli wszystko jest w porządku.", "Yes, the deposit is one month's rent, so 1,200. I give it back at the end of the contract if everything is fine.", "हो, धरौटी एक महिनाको भाडा बराबर, अर्थात् एक हजार दुई सय। सम्झौता सकिँदा सबै ठीक भए म फिर्ता दिन्छु।"],
        replies: [
          { pl: "Czy będzie umowa na piśmie?", en: "Will there be a written contract?", ne: "के लिखित सम्झौता हुन्छ?", ok: true },
          { pl: "Dobrze. Czy mogę się tu zameldować?", en: "OK. Can I register my address here?", ne: "ठीक छ। के म यहाँ आफ्नो ठेगाना दर्ता (मेल्दुनेक) गर्न सक्छु?", ok: true },
          { pl: "Dobrze. Czy będzie umowę?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "In *Czy będzie umowa?* (Will there be a contract?) *umowa* is the subject, so it keeps the basic form. *Umowę* is an object form: *podpiszemy umowę* (we'll sign the contract). Tip: always ask for a written contract and the right to *zameldowanie* — they are often asked for in official matters, such as a residence card application.",
                   ne: "*Czy będzie umowa?* (सम्झौता हुन्छ?) मा *umowa* कर्ता हो, त्यसैले मूल रूपमै रहन्छ। *Umowę* कर्मको रूप हो: *podpiszemy umowę* (हामी सम्झौतामा हस्ताक्षर गर्नेछौँ)। सुझाव: सधैं लिखित सम्झौता र *zameldowanie* (ठेगाना दर्ता) को अधिकार माग्नुहोस् — रेसिडेन्स कार्डजस्ता सरकारी काममा यी प्रायः माग्ने गरिन्छ।" } }
        ] },
      { them: ["Tak, podpiszemy umowę na rok i można się zameldować.", "Yes, we'll sign a one-year contract and you can register your address.", "हो, हामी एक वर्षको सम्झौतामा हस्ताक्षर गर्छौँ र ठेगाना दर्ता पनि गर्न सकिन्छ।"],
        replies: [
          { pl: "Świetnie. Od kiedy pokój jest wolny?", en: "Great. From when is the room free?", ne: "धेरै राम्रो। कोठा कहिलेदेखि खाली हुन्छ?", ok: true },
          { pl: "Super. Kiedy mogę się wprowadzić?", en: "Great. When can I move in?", ne: "राम्रो। म कहिले सर्न सक्छु?", ok: true },
          { pl: "Świetnie. Od kiedy pokój jest wolna?", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "Again, *pokój* is masculine, so the adjective is *wolny* (free): *pokój jest wolny*. For a feminine word: *łazienka jest wolna* (the bathroom is free).",
                   ne: "फेरि, *pokój* पुलिङ्ग हो, त्यसैले विशेषण *wolny* (खाली) हुन्छ: *pokój jest wolny*। स्त्रीलिङ्ग शब्दसँग: *łazienka jest wolna* (बाथरुम खाली छ)।" } }
        ] },
      { them: ["Pokój jest wolny od pierwszego listopada.", "The room is free from the first of November.", "कोठा नोभेम्बर एक तारिखदेखि खाली हुन्छ।"],
        replies: [
          { pl: "Pasuje mi. Biorę ten pokój.", en: "That suits me. I'll take this room.", ne: "मलाई मिल्छ। म यो कोठा लिन्छु।", ok: true },
          { pl: "Muszę się zastanowić. Zadzwonię jutro.", en: "I need to think about it. I'll call tomorrow.", ne: "मलाई सोच्नुपर्छ। म भोलि फोन गर्छु।", ok: true },
          { pl: "Pasuję mi. Biorę.", en: "(wrong verb form)", ne: "(क्रियाको गलत रूप)", ok: false,
            why: { en: "The phrase is *pasuje mi* — literally 'it suits me' (the date suits you). *Pasuję* means 'I fit / I pass' — the wrong person. Compare *Boli mnie głowa*: the thing is the subject, you are *mi*/*mnie*.",
                   ne: "वाक्यांश *pasuje mi* हो — शाब्दिक अर्थ 'यो मलाई मिल्छ' (मिति तपाईंलाई मिल्छ)। *Pasuję* को अर्थ 'म मिल्छु / म पास गर्छु' — गलत व्यक्ति (म/तिमी/ऊ)। *Boli mnie głowa* सँग तुलना गर्नुहोस्: चीज कर्ता हो, तपाईं *mi*/*mnie*।" } }
        ] }
    ],
    end: {
      en: "Very good! You asked about the rent, bills (*rachunki*), deposit (*kaucja*), a written contract and *zameldowanie*, and you know when the room is free. Never pay a deposit before you see the room and the contract.",
      ne: "धेरै राम्रो! तपाईंले भाडा, बिल (*rachunki*), धरौटी (*kaucja*), लिखित सम्झौता र *zameldowanie* बारे सोध्नुभयो, अनि कोठा कहिले खाली हुन्छ भन्ने पनि थाहा पाउनुभयो। कोठा र सम्झौता नहेरी कहिल्यै धरौटी नतिर्नुहोस्।"
    },
    useful: [
      ["Ile kosztuje miesięcznie?", "How much is it per month?", "महिनाको कति पर्छ?", "EE-leh kosh-TOO-yeh mye-SHENCH-nyeh", "ˈइ-ले कोश्-ˈतु-ये म्ये-ˈशेन्च्-न्ये"],
      ["Czy rachunki są wliczone w cenę?", "Are the bills included in the price?", "के बिलहरू भाडामै समावेश छन्?", "chi ra-HOON-kee son vlee-CHO-neh f TSEH-neh", "चि रा-ˈहुन्-कि सों भ्लि-ˈचो-ने फ़् ˈत्से-ने"],
      ["kaucja", "deposit", "धरौटी", "KAW-tsya", "ˈकाव्-त्स्या"],
      ["Czy będzie umowa na piśmie?", "Will there be a written contract?", "के लिखित सम्झौता हुन्छ?", "chi BEN-jeh oo-MO-va na PEESH-myeh", "चि ˈबेन्-जे उ-ˈमो-भा ना ˈपिश्-म्ये"],
      ["Czy mogę się tu zameldować?", "Can I register my address here?", "के म यहाँ ठेगाना दर्ता गर्न सक्छु?", "chi MO-geh sheh too za-mel-DO-vach", "चि ˈमो-गे शे तु ज़ा-मेल्-ˈदो-भाच्"],
      ["Od kiedy pokój jest wolny?", "From when is the room free?", "कोठा कहिलेदेखि खाली हुन्छ?", "ot KYEH-di PO-kooy yest VOL-ni", "ओत् ˈक्ये-दि ˈपो-कुय् येस्त् ˈभोल्-नि"],
      ["Biorę ten pokój.", "I'll take this room.", "म यो कोठा लिन्छु।", "BYO-reh ten PO-kooy", "ˈब्यो-रे तेन् ˈपो-कुय्"]
    ]
  },

  {
    id: "rp-a2-market",
    level: "A2",
    title: "Buying a jacket at the market", titleNe: "बजारमा ज्याकेट किन्दै",
    scene: {
      en: "Winter is coming. On Saturday you go to a big open-air market to buy a warm jacket. You find a stall with jackets and talk to the seller.",
      ne: "जाडो आउँदैछ। शनिबार तपाईं न्यानो ज्याकेट किन्न एउटा ठूलो खुला बजारमा जानुहुन्छ। ज्याकेट बेच्ने एउटा पसल भेटेर पसलेसँग कुरा गर्नुहुन्छ।"
    },
    them: "Sprzedawca", themEn: "Stall seller", themNe: "पसले",
    steps: [
      { them: ["Dzień dobry! W czym mogę pomóc?", "Hello! How can I help?", "नमस्ते! के सहयोग गरूँ?"],
        replies: [
          { pl: "Dzień dobry. Szukam ciepłej kurtki na zimę.", en: "Hello. I'm looking for a warm winter jacket.", ne: "नमस्ते। म जाडोका लागि न्यानो ज्याकेट खोज्दैछु।", ok: true },
          { pl: "Dzień dobry. Ma pan ciepłe kurtki?", en: "Hello. Do you have warm jackets?", ne: "नमस्ते। तपाईंसँग न्यानो ज्याकेट छन्?", ok: true },
          { pl: "Dzień dobry. Szukam ciepłą kurtkę.", en: "(wrong endings)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Szukać* (to look for) takes the **genitive**, not the accusative: *szukam ciepłej kurtki* (adjective -ej, noun -i). Compare: *mam kurtkę* but *szukam kurtki*.",
                   ne: "*Szukać* (खोज्नु) पछि कर्म कारक होइन, **षष्ठी (genitive)** आउँछ: *szukam ciepłej kurtki* (विशेषणमा -ej, नाममा -i)। तुलना: *mam kurtkę* तर *szukam kurtki*।" } }
        ] },
      { them: ["Tak, proszę zobaczyć. Jaki rozmiar?", "Yes, have a look. What size?", "छ, हेर्नुहोस्। कुन साइज?"],
        replies: [
          { pl: "Noszę rozmiar L.", en: "I wear size L.", ne: "म L साइज लगाउँछु।", ok: true },
          { pl: "Chyba M albo L.", en: "Probably M or L.", ne: "सायद M वा L।", ok: true },
          { pl: "Jestem L.", en: "I am L.", ne: "म L हुँ।", ok: false,
            why: { en: "In Polish you **wear** a size: *Noszę rozmiar L* (I wear size L). You can also just say *Rozmiar L*. *Jestem L* sounds strange.",
                   ne: "पोलिशमा साइज **लगाइन्छ**: *Noszę rozmiar L* (म L साइज लगाउँछु)। *Rozmiar L* मात्र भने पनि हुन्छ। *Jestem L* अनौठो सुनिन्छ।" } }
        ] },
      { them: ["Ta czarna jest w rozmiarze L. Można przymierzyć.", "This black one is in size L. You can try it on.", "यो कालो L साइजको छ। लगाएर हेर्न सकिन्छ।"],
        replies: [
          { pl: "Dziękuję. Czy mogę ją przymierzyć?", en: "Thank you. Can I try it on?", ne: "धन्यवाद। के म यो लगाएर हेर्न सक्छु?", ok: true },
          { pl: "Czy jest w innym kolorze?", en: "Is it in another colour?", ne: "के यो अर्को रङमा पनि छ?", ok: true },
          { pl: "Dziękuję. Czy mogę go przymierzyć?", en: "(wrong pronoun)", ne: "(गलत सर्वनाम)", ok: false,
            why: { en: "'It' must match the gender of the thing. *Kurtka* is feminine, so 'it' = *ją*. *Go* is for masculine things: *sweter* → *Czy mogę go przymierzyć?*",
                   ne: "'यो/यसलाई' चीजको लिङ्गसँग मिल्नुपर्छ। *Kurtka* स्त्रीलिङ्ग हो, त्यसैले *ją*। *Go* पुलिङ्ग चीजका लागि हो: *sweter* → *Czy mogę go przymierzyć?*" } }
        ] },
      { them: ["Jest jeszcze granatowa. Proszę, tu jest lustro. I jak? Pasuje?", "There's also a navy one. Here's a mirror. So? Does it fit?", "नेभी ब्लु पनि छ। लिनुहोस्, ऐना यहाँ छ। कस्तो छ? मिल्यो?"],
        replies: [
          { pl: "Jest trochę za mała. Czy jest większy rozmiar?", en: "It's a bit too small. Is there a bigger size?", ne: "अलि सानो भयो। ठूलो साइज छ?", ok: true },
          { pl: "Jest trochę za mały.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Kurtka* is feminine, so the adjective is *mała*: *kurtka jest za mała*. *Za mały* is for masculine items like *sweter*.",
                   ne: "*Kurtka* स्त्रीलिङ्ग हो, त्यसैले विशेषण *mała* हुन्छ: *kurtka jest za mała*। *Za mały* *sweter* जस्ता पुलिङ्ग सामानका लागि हो।" } },
          { pl: "Jest trochę za mała. Czy jest mniejszy rozmiar?", en: "It's a bit too small. Is there a smaller size?", ne: "अलि सानो भयो। अझ सानो साइज छ?", ok: false,
            why: { en: "If it is too small (*za mała*), you need a **bigger** size: *większy*. *Mniejszy* means smaller.",
                   ne: "यदि ज्याकेट सानो (*za mała*) भयो भने **ठूलो** साइज चाहिन्छ: *większy*। *Mniejszy* को अर्थ अझ सानो हो।" } }
        ] },
      { them: ["Proszę, tu jest XL. Ta jest lepsza?", "Here's an XL. Is this one better?", "लिनुहोस्, यो XL हो। यो चाहिँ ठीक छ?"],
        replies: [
          { pl: "Tak, ta jest idealna. Ile kosztuje?", en: "Yes, this one is perfect. How much is it?", ne: "हो, यो ठ्याक्कै मिल्यो। कति पर्छ?", ok: true },
          { pl: "Tak, jest w sam raz. Ile płacę?", en: "Yes, it's just right. How much do I pay?", ne: "हो, ठ्याक्कै मिल्यो। कति तिर्नुपर्छ?", ok: true },
          { pl: "Tak, ta jest lepszy.", en: "(wrong ending)", ne: "(गलत अन्त्य)", ok: false,
            why: { en: "*Ta* (this one, feminine) and *lepszy* (masculine) don't match. For the jacket: *ta jest lepsza*. Masculine would be *ten jest lepszy*.",
                   ne: "*Ta* (यो, स्त्रीलिङ्ग) र *lepszy* (पुलिङ्ग) मिल्दैनन्। ज्याकेटका लागि: *ta jest lepsza*। पुलिङ्ग भए *ten jest lepszy*।" } }
        ] },
      { them: ["Dwieście pięćdziesiąt złotych.", "Two hundred and fifty zloty.", "दुई सय पचास ज्लोती।"],
        replies: [
          { pl: "Trochę drogo. Może być dwieście?", en: "A bit expensive. Could it be two hundred?", ne: "अलि महँगो भयो। दुई सयमा हुन्छ?", ok: true },
          { pl: "Czy może być taniej?", en: "Could it be cheaper?", ne: "अलि सस्तो हुन्छ?", ok: true },
          { pl: "Dwadzieścia pięć? Tanio!", en: "Twenty-five? Cheap!", ne: "पच्चीस? सस्तो!", ok: false,
            why: { en: "He said *dwieście pięćdziesiąt* = 250, not *dwadzieścia pięć* = 25. *Dwieście* is 200 and *pięćdziesiąt* is 50 (-*dziesiąt* = 50, 60, 70, 80, 90). At a market it is OK to ask politely for a lower price.",
                   ne: "उहाँले *dwieście pięćdziesiąt* = २५० भन्नुभयो, *dwadzieścia pięć* = २५ होइन। *Dwieście* = २०० र *pięćdziesiąt* = ५० (-*dziesiąt* = ५०, ६०, ७०, ८०, ९०)। बजारमा नम्र भएर मोलमोलाइ गर्नु ठीकै हो।" } }
        ] },
      { them: ["Mogę dać za dwieście trzydzieści. Gotówka czy karta?", "I can give it to you for 230. Cash or card?", "दुई सय तीसमा दिन सक्छु। नगद कि कार्ड?"],
        replies: [
          { pl: "Dobrze. Płacę kartą.", en: "OK. I'm paying by card.", ne: "ठीक छ। म कार्डले तिर्छु।", ok: true },
          { pl: "Mogę zapłacić kartą? Nie mam gotówki.", en: "Can I pay by card? I don't have cash.", ne: "कार्डले तिर्न मिल्छ? मसँग नगद छैन।", ok: true },
          { pl: "Dobrze. Płacę z kartą.", en: "OK. I'm paying with (together with) a card.", ne: "ठीक छ। म कार्डसँगै तिर्छु।", ok: false,
            why: { en: "'By card' is the instrumental **without** *z*: *płacę kartą*, *płacę gotówką*. *Z kartą* means 'together with a card' (like *kawa z mlekiem*). Use *z* for 'with' a person or thing, not for the tool you use.",
                   ne: "'कार्डले' भन्न *z* **बिना** करण कारक (instrumental) प्रयोग हुन्छ: *płacę kartą*, *płacę gotówką*। *Z kartą* को अर्थ 'कार्डसँगै' हुन्छ (*kawa z mlekiem* जस्तै)। *z* कुनै व्यक्ति वा चीज 'सँग' भन्न प्रयोग हुन्छ, साधनका लागि होइन।" } }
        ] },
      { them: ["Proszę przyłożyć kartę. Teraz proszę wpisać PIN.", "Please tap your card. Now please enter your PIN.", "कृपया कार्ड छुवाउनुहोस्। अब PIN हाल्नुहोस्।"],
        replies: [
          { pl: "Dobrze, już.", en: "OK, done.", ne: "ठीक छ, भयो।", ok: true },
          { pl: "Mój PIN to jeden, dwa, trzy, cztery.", en: "My PIN is one, two, three, four.", ne: "मेरो PIN एक, दुई, तीन, चार हो।", ok: false,
            why: { en: "Never say your PIN aloud or show it to anyone! *Wpisać* means 'to type in' — you type it yourself on the terminal and cover the keys with your hand.",
                   ne: "आफ्नो PIN कहिल्यै ठूलो स्वरमा नभन्नुहोस् र कसैलाई नदेखाउनुहोस्! *Wpisać* को अर्थ 'टाइप गर्नु' हो — मेसिनमा आफैँ थिच्नुहोस् र हातले छोप्नुहोस्।" } },
          { pl: "Proszę wpisać PIN.", en: "Please enter the PIN.", ne: "कृपया PIN हाल्नुहोस्।", ok: false,
            why: { en: "You just repeated his instruction — now you are asking **him** to type your PIN! He means you: type it yourself and then say *Już* (Done).",
                   ne: "तपाईंले उहाँकै निर्देशन दोहोर्‍याउनुभयो — अब त तपाईंले **उहाँलाई** आफ्नो PIN हाल्न भन्नुभयो! उहाँले तपाईंलाई भन्नुभएको हो: आफैँ थिच्नुहोस् र *Już* (भयो) भन्नुहोस्।" } }
        ] },
      { them: ["Gotowe. Proszę, paragon. Dziękuję i zapraszam ponownie!", "Done. Here's the receipt. Thank you, come again!", "भयो। लिनुहोस्, बिल। धन्यवाद, फेरि आउनुहोला!"],
        replies: [
          { pl: "Dziękuję, do widzenia!", en: "Thank you, goodbye!", ne: "धन्यवाद, नमस्ते!", ok: true },
          { pl: "Dziękuję. Czy mogę ją zwrócić, jeśli będzie problem?", en: "Thank you. Can I return it if there's a problem?", ne: "धन्यवाद। केही समस्या भए फिर्ता गर्न मिल्छ?", ok: true },
          { pl: "Zapraszam ponownie!", en: "Come again!", ne: "फेरि आउनुहोला!", ok: false,
            why: { en: "*Zapraszam ponownie* ('I invite you again') is what the **seller** says to the customer. As the customer, say *Dziękuję, do widzenia!* Keep the *paragon* — you need it to return the jacket.",
                   ne: "*Zapraszam ponownie* ('फेरि आउनुहोला') **पसले** ले ग्राहकलाई भन्ने कुरा हो। ग्राहकका रूपमा *Dziękuję, do widzenia!* भन्नुहोस्। *paragon* (बिल) राख्नुहोस् — ज्याकेट फिर्ता गर्न चाहिन्छ।" } }
        ] }
    ],
    end: {
      en: "Excellent! You used *szukam* + genitive, gave your size, matched the adjectives to *kurtka* (*za mała*, *lepsza*), bargained politely and paid *kartą* safely.",
      ne: "उत्कृष्ट! तपाईंले *szukam* + षष्ठी प्रयोग गर्नुभयो, आफ्नो साइज बताउनुभयो, विशेषणलाई *kurtka* सँग मिलाउनुभयो (*za mała*, *lepsza*), नम्र भएर मोलमोलाइ गर्नुभयो र सुरक्षित रूपमा *kartą* तिर्नुभयो।"
    },
    useful: [
      ["Szukam ciepłej kurtki.", "I'm looking for a warm jacket.", "म न्यानो ज्याकेट खोज्दैछु।", "SHOO-kam CHEP-wey KOORT-kee", "ˈशु-काम् ˈचेप्-वेय् ˈकुर्त्-कि"],
      ["Noszę rozmiar L.", "I wear size L.", "म L साइज लगाउँछु।", "NO-sheh ROZ-myar el", "ˈनो-शे ˈरोज़्-म्यार् एल्"],
      ["Czy mogę ją przymierzyć?", "Can I try it on? (feminine thing)", "के म यो लगाएर हेर्न सक्छु?", "chi MO-geh yon pshi-MYEH-zhich", "चि ˈमो-गे यों प्शि-ˈम्ये-झिच्"],
      ["Jest za mała.", "It's too small. (feminine thing)", "यो अति सानो भयो।", "yest za MA-wa", "येस्त् ज़ा ˈमा-वा"],
      ["Czy jest większy rozmiar?", "Is there a bigger size?", "ठूलो साइज छ?", "chi yest VYENK-shi ROZ-myar", "चि येस्त् ˈभ्येन्क्-शि ˈरोज़्-म्यार्"],
      ["Czy może być taniej?", "Could it be cheaper?", "अलि सस्तो हुन्छ?", "chi MO-zheh bich TA-nyey", "चि ˈमो-झे बिच् ˈता-न्येय्"],
      ["Płacę kartą.", "I'm paying by card.", "म कार्डले तिर्छु।", "PWA-tseh KAR-ton", "ˈप्वा-त्से ˈकार्-तों"],
      ["paragon", "receipt", "बिल / रसिद", "pa-RA-gon", "पा-ˈरा-गोन्"]
    ]
  }

);
