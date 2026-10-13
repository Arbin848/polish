// Placement test and B1 practice exams. Format: tools/PRACTICE_GUIDE.md, section 4.

window.SLOWKA_PLACEMENT = [
  // Band 1 — very basic A1: greetings, spelling, first words
  { level: "A1", q: "___ dobry!", en: "Good morning! / Hello! (formal)", ne: "नमस्ते! (औपचारिक)",
    options: ["Dzień", "Dobra", "Noc"], answer: 0 },
  { level: "A1", q: "Cześć! Jak ___ masz?", en: "Hi! How are you?", ne: "नमस्ते! तिमीलाई कस्तो छ?",
    options: ["ty", "się", "mi"], answer: 1 },
  { level: "A1", q: "Ja ___ z Nepalu.", en: "I am from Nepal.", ne: "म नेपालबाट हुँ।",
    options: ["jest", "są", "jestem"], answer: 2 },
  { level: "A1", q: "Które słowo znaczy „thank you”? ___", en: "Thank you.", ne: "धन्यवाद।",
    options: ["dziękuję", "dzienkuje", "dziekuje"], answer: 0 },
  { level: "A1", q: "Dwa plus dwa to ___.", en: "Two plus two is four.", ne: "दुई जोड दुई चार हुन्छ।",
    options: ["trzy", "cztery", "pięć"], answer: 1 },
  { level: "A1", q: "Dziękuję i do ___!", en: "Thank you and goodbye!", ne: "धन्यवाद, नमस्ते!",
    options: ["dobranoc", "wieczór", "widzenia"], answer: 2 },

  // Band 2 — A1
  { level: "A1", q: "To jest ___ dom.", en: "This is my house.", ne: "यो मेरो घर हो।",
    options: ["mój", "moja", "moje"], answer: 0 },
  { level: "A1", q: "Mam brata i ___.", en: "I have a brother and a sister.", ne: "मेरो एक दाजु/भाइ र एक दिदी/बहिनी छन्।",
    options: ["siostra", "siostrę", "siostry"], answer: 1 },
  { level: "A1", q: "Przepraszam, nie mam ___.", en: "Sorry, I don't have time.", ne: "माफ गर्नुहोस्, मसँग समय छैन।",
    options: ["czas", "czasem", "czasu"], answer: 2 },
  { level: "A1", q: "Oni ___ w Warszawie.", en: "They live in Warsaw.", ne: "उनीहरू वार्सामा बस्छन्।",
    options: ["mieszkają", "mieszka", "mieszkamy"], answer: 0 },
  { level: "A1", q: "Poproszę ___ z mlekiem.", en: "A coffee with milk, please.", ne: "दूधसहितको कफी दिनुहोस्।",
    options: ["kawa", "kawy", "kawę"], answer: 2 },
  { level: "A1", q: "Dzisiaj ___ do pracy autobusem.", en: "Today I'm going to work by bus.", ne: "आज म बसमा काममा जाँदैछु।",
    options: ["jedzie", "jadę", "jechać"], answer: 1 },

  // Band 3 — A2
  { level: "A2", q: "Wczoraj Anna ___ długo w pracy.", en: "Yesterday Anna was at work for a long time.", ne: "हिजो आन्ना धेरै बेरसम्म काममा थिइन्।",
    options: ["była", "był", "było"], answer: 0 },
  { level: "A2", q: "Idę do ___ po chleb.", en: "I'm going to the shop for bread.", ne: "म रोटी लिन पसल जाँदै छु।",
    options: ["sklep", "sklepu", "sklepie"], answer: 1 },
  { level: "A2", q: "Mieszkam w dużym ___.", en: "I live in a big city.", ne: "म ठूलो सहरमा बस्छु।",
    options: ["miasto", "miasta", "mieście"], answer: 2 },
  { level: "A2", q: "Ten pokój jest ___ niż tamten.", en: "This room is bigger than that one.", ne: "यो कोठा त्यो कोठाभन्दा ठूलो छ।",
    options: ["większy", "duży", "największy"], answer: 0 },
  { level: "A2", q: "Mój brat jest ___.", en: "My brother is a driver.", ne: "मेरो दाजु/भाइ ड्राइभर हो।",
    options: ["kierowca", "kierowcą", "kierowcy"], answer: 1 },
  { level: "A2", q: "W weekend pomagam ___ w kuchni.", en: "At the weekend I help my mum in the kitchen.", ne: "सप्ताहान्तमा म आमालाई भान्सामा सघाउँछु।",
    options: ["mamę", "mama", "mamie"], answer: 2 },

  // Band 4 — B1
  { level: "B1", q: "Gdybym miał więcej pieniędzy, ___ samochód.", en: "If I had more money, I would buy a car.", ne: "मसँग अझ धेरै पैसा भएको भए म कार किन्थेँ।",
    options: ["kupię", "kupiłbym", "kupowałem"], answer: 1 },
  { level: "B1", q: "To jest kolega, ___ pracuję.", en: "This is the colleague I work with.", ne: "यो त्यही सहकर्मी हो, जोसँग म काम गर्छु।",
    options: ["z którym", "który", "którego"], answer: 0 },
  { level: "B1", q: "Chcę, ___ przyszedł jutro na czas.", en: "I want you to come on time tomorrow.", ne: "म चाहन्छु, तिमी भोलि समयमै आऊ।",
    options: ["że", "bo", "żebyś"], answer: 2 },
  { level: "B1", q: "Kiedy ___ obiad, zadzwonił telefon.", en: "While I was eating lunch, the phone rang.", ne: "म खाना खाँदै गर्दा फोन बज्यो।",
    options: ["jadłem", "zjem", "zjadłbym"], answer: 0 },
  { level: "B1", q: "Niestety nie ma już wolnych ___.", en: "Unfortunately there are no free places left.", ne: "दुर्भाग्यवश अब खाली ठाउँ छैन।",
    options: ["miejsca", "miejsc", "miejscach"], answer: 1 },
  { level: "B1", q: "Szef powiedział, ___ w sobotę nie pracujemy.", en: "The boss said that we don't work on Saturday.", ne: "हाकिमले शनिबार हामी काम गर्दैनौँ भन्नुभयो।",
    options: ["że", "żeby", "czy"], answer: 0 },

  // Band 5 — B2
  { level: "B2", q: "Wniosek ___ rozpatrzony w ciągu trzydziestu dni.", en: "The application will be processed within thirty days.", ne: "निवेदन तीस दिनभित्र जाँच गरिनेछ।",
    options: ["zostaniesz", "zostaną", "zostanie"], answer: 2 },
  { level: "B2", q: "___ do domu, spotkałem sąsiada.", en: "While returning home, I met a neighbour.", ne: "घर फर्कंदै गर्दा मैले छिमेकीलाई भेटेँ।",
    options: ["Wracając", "Wracający", "Wracam"], answer: 0 },
  { level: "B2", q: "Mimo ___ deszczu poszliśmy na spacer.", en: "Despite the heavy rain, we went for a walk.", ne: "ठूलो पानी परे पनि हामी घुम्न गयौँ।",
    options: ["silny", "silnego", "silnym"], answer: 1 },
  { level: "B2", q: "Umowę ___ wczoraj po południu.", en: "The contract was signed yesterday afternoon.", ne: "सम्झौतामा हिजो दिउँसो हस्ताक्षर गरियो।",
    options: ["podpisana", "podpisał się", "podpisano"], answer: 2 },
  { level: "B2", q: "Gdyby nie twoja pomoc, nie ___ tego zrobić.", en: "If it hadn't been for your help, I wouldn't have managed to do it.", ne: "तिम्रो सहयोग नभएको भए म यो गर्न सक्दिनथेँ।",
    options: ["zdołałbym", "zdołam", "zdołałem"], answer: 0 },
  { level: "B2", q: "Musimy ___ decyzję do końca tygodnia.", en: "We must make a decision by the end of the week.", ne: "हामीले हप्ताको अन्त्यसम्ममा निर्णय लिनुपर्छ।",
    options: ["zrobić", "podjąć", "dać"], answer: 1 }
];

window.SLOWKA_EXAMS = window.SLOWKA_EXAMS || [];
window.SLOWKA_EXAMS.push(
  {
    id: "b1-practice-1", level: "B1",
    title: "B1 practice test 1", titleNe: "B1 अभ्यास परीक्षा १",
    intro: {
      en: "Many foreigners in Poland take the state certificate exam in Polish as a foreign language (*egzamin certyfikatowy z języka polskiego jako obcego*). At level B1 it has five parts: **listening** (*rozumienie ze słuchu*), **grammar and structures** (*poprawność gramatyczna*), **reading** (*rozumienie tekstów pisanych*), **writing** (*pisanie*) and **speaking** (*mówienie*), which is a conversation with examiners. This practice test copies the style of the written parts: the questions are in Polish, like in the real exam, and translations and explanations help you check yourself. Do each section without a dictionary first, then read the explanations. For writing, write your own text before you look at the model answer, then check it with the checklist. The app cannot test speaking, so practise it by answering the role-plays out loud. Rules, dates, places and requirements can change: always check the current information on the official exam website (certyfikatpolski.pl) before you register.",
      ne: "पोल्यान्डमा धेरै विदेशीहरूले विदेशी भाषाको रूपमा पोलिशको सरकारी प्रमाणपत्र परीक्षा (*egzamin certyfikatowy z języka polskiego jako obcego*) दिन्छन्। B1 तहमा यसका पाँच भाग हुन्छन्: **सुनाइ** (*rozumienie ze słuchu*), **व्याकरण र संरचना** (*poprawność gramatyczna*), **पढाइ** (*rozumienie tekstów pisanych*), **लेखाइ** (*pisanie*) र **बोलाइ** (*mówienie*), जुन परीक्षकहरूसँगको कुराकानी हो। यो अभ्यास परीक्षा लिखित भागहरूको शैलीमा बनाइएको छ: वास्तविक परीक्षामा जस्तै प्रश्नहरू पोलिशमा छन्, र अनुवाद तथा व्याख्याले तपाईंलाई आफैँ जाँच्न मद्दत गर्छन्। पहिले हरेक खण्ड शब्दकोश बिना गर्नुहोस्, अनि व्याख्या पढ्नुहोस्। लेखाइमा, नमुना उत्तर हेर्नुअघि आफ्नै पाठ लेख्नुहोस्, त्यसपछि चेकलिस्टले जाँच्नुहोस्। एपले बोलाइ जाँच्न सक्दैन, त्यसैले रोल-प्लेका उत्तरहरू ठूलो स्वरमा भनेर अभ्यास गर्नुहोस्। नियम, मिति, ठाउँ र आवश्यकताहरू बदलिन सक्छन्: दर्ता गर्नुअघि सधैँ आधिकारिक परीक्षा वेबसाइट (certyfikatpolski.pl) मा हालको जानकारी हेर्नुहोस्।"
    },
    sections: [
      {
        kind: "listening", title: "Listening", titleNe: "सुनाइ",
        items: [
          {
            audio: "Uwaga, uwaga! Pociąg do Krakowa, planowany przyjazd o godzinie czternastej dwadzieścia, przyjedzie z opóźnieniem około trzydziestu minut. Za utrudnienia przepraszamy.",
            en: "Attention, please! The train to Kraków, scheduled to arrive at 14:20, will arrive about thirty minutes late. We apologise for the inconvenience.",
            ne: "ध्यान दिनुहोस्! क्राकोभ जाने रेल, जुन १४:२० मा आइपुग्ने तालिका थियो, करिब तीस मिनेट ढिला आइपुग्नेछ। असुविधाका लागि हामी माफी चाहन्छौँ।",
            q: "O której mniej więcej przyjedzie pociąg?", qEn: "At about what time will the train arrive?", qNe: "रेल करिब कति बजे आइपुग्छ?",
            options: ["O 14:20.", "Około 14:50.", "Około 15:20."], answer: 1,
            why: { en: "The train was planned for 14:20 and is *około trzydziestu minut* (about thirty minutes) late: 14:20 + 30 minutes = about 14:50.", ne: "रेल १४:२० मा आउने थियो र *około trzydziestu minut* (करिब तीस मिनेट) ढिला छ: १४:२० + ३० मिनेट = करिब १४:५०।" }
          },
          {
            audio: "Dzień dobry, tu przychodnia Zdrowie. Dzwonię w sprawie Pana wizyty u lekarza rodzinnego w czwartek. Niestety pani doktor jest chora. Możemy przełożyć wizytę na piątek na godzinę dziesiątą. Proszę o telefon.",
            en: "Hello, this is the Zdrowie clinic. I'm calling about your appointment with the family doctor on Thursday. Unfortunately the doctor is ill. We can move the appointment to Friday at ten o'clock. Please call us back.",
            ne: "नमस्ते, म Zdrowie क्लिनिकबाट बोल्दै छु। बिहीबार पारिवारिक डाक्टरसँगको तपाईंको भेटको बारेमा फोन गरेको हुँ। दुर्भाग्यवश डाक्टर बिरामी हुनुहुन्छ। हामी भेटलाई शुक्रबार दस बजेमा सार्न सक्छौँ। कृपया हामीलाई फोन गर्नुहोस्।",
            q: "Dlaczego dzwoni przychodnia?", qEn: "Why is the clinic calling?", qNe: "क्लिनिकले किन फोन गरेको हो?",
            options: ["Chce zmienić termin wizyty.", "Chce odwołać wszystkie wizyty.", "Przypomina o wizycie w czwartek."], answer: 0,
            why: { en: "The doctor is ill, so the clinic offers a new date: *Możemy przełożyć wizytę na piątek* (we can move the appointment to Friday). *Przełożyć* = to move to another time.", ne: "डाक्टर बिरामी हुनुहुन्छ, त्यसैले क्लिनिकले नयाँ मिति दिन्छ: *Możemy przełożyć wizytę na piątek* (भेटलाई शुक्रबार सार्न सक्छौँ)। *Przełożyć* = अर्को समयमा सार्नु।" }
          },
          {
            audio: "Słuchajcie, od przyszłego poniedziałku zmieniamy grafik. Pierwsza zmiana zaczyna się o szóstej, a nie o siódmej. Druga zmiana kończy się o dwudziestej drugiej. W soboty nie pracujemy.",
            en: "Listen, everyone: from next Monday we are changing the schedule. The first shift starts at six, not at seven. The second shift ends at 22:00. We don't work on Saturdays.",
            ne: "सबैजना सुन्नुहोस्, अर्को सोमबारदेखि हामी कामको तालिका बदल्दै छौँ। पहिलो सिफ्ट सात बजे होइन, छ बजे सुरु हुन्छ। दोस्रो सिफ्ट राति दस (२२:००) बजे सकिन्छ। शनिबार हामी काम गर्दैनौँ।",
            q: "O której zaczyna się pierwsza zmiana od poniedziałku?", qEn: "What time does the first shift start from Monday?", qNe: "सोमबारदेखि पहिलो सिफ्ट कति बजे सुरु हुन्छ?",
            options: ["O siódmej.", "O dwudziestej drugiej.", "O szóstej."], answer: 2,
            why: { en: "*Pierwsza zmiana zaczyna się o szóstej, a nie o siódmej*: six is the new time, seven was the old time. 22:00 is when the second shift ends.", ne: "*Pierwsza zmiana zaczyna się o szóstej, a nie o siódmej*: छ बजे नयाँ समय हो, सात बजे पुरानो समय थियो। २२:०० मा दोस्रो सिफ्ट सकिन्छ।" }
          },
          {
            audio: "Szanowni Państwo, biuro obsługi klienta jest dziś czynne do piętnastej. Numerki wydajemy do czternastej trzydzieści. Proszę wziąć numerek z automatu przy wejściu i zaczekać, aż numer pojawi się na ekranie.",
            en: "Ladies and gentlemen, the customer service office is open until three o'clock today. We give out numbers until 14:30. Please take a number from the machine at the entrance and wait until your number appears on the screen.",
            ne: "आदरणीय महानुभावहरू, ग्राहक सेवा कार्यालय आज तीन बजेसम्म खुला छ। नम्बर २:३० (१४:३०) सम्म मात्र दिइन्छ। कृपया प्रवेशद्वारको मेसिनबाट नम्बर लिनुहोस् र तपाईंको नम्बर स्क्रिनमा नआएसम्म पर्खनुहोस्।",
            q: "Co trzeba zrobić najpierw?", qEn: "What do you have to do first?", qNe: "सबैभन्दा पहिले के गर्नुपर्छ?",
            options: ["Zadzwonić do biura.", "Wziąć numerek z automatu.", "Zapisać się przez internet."], answer: 1,
            why: { en: "*Proszę wziąć numerek z automatu przy wejściu* — take a number from the machine at the entrance, then wait. Phoning or booking online is not mentioned.", ne: "*Proszę wziąć numerek z automatu przy wejściu* — प्रवेशद्वारको मेसिनबाट नम्बर लिनुहोस्, अनि पर्खनुहोस्। फोन गर्ने वा अनलाइन बुक गर्ने कुरा भनिएको छैन।" }
          },
          {
            audio: "— Słyszałeś, że Marek chce wrócić do Nepalu? — Tak, ale moim zdaniem to zły pomysł. Ma tu dobrą pracę i właśnie zaczął kurs zawodowy. Lepiej, żeby poczekał jeszcze rok.",
            en: "— Did you hear that Marek wants to go back to Nepal? — Yes, but in my opinion it's a bad idea. He has a good job here and he has just started a vocational course. It would be better if he waited one more year.",
            ne: "— तिमीले सुन्यौ, मारेक नेपाल फर्कन चाहन्छ रे? — हो, तर मेरो विचारमा त्यो राम्रो सोच होइन। उसको यहाँ राम्रो जागिर छ र भर्खरै व्यावसायिक कोर्स सुरु गरेको छ। अझै एक वर्ष पर्खेको भए राम्रो हुन्थ्यो।",
            q: "Co myśli drugi mówiący o planie Marka?", qEn: "What does the second speaker think about Marek's plan?", qNe: "दोस्रो बोल्ने व्यक्ति मारेकको योजनाबारे के सोच्छन्?",
            options: ["Uważa, że Marek powinien jeszcze poczekać.", "Uważa, że to świetny pomysł.", "Nie ma zdania."], answer: 0,
            why: { en: "He says *moim zdaniem to zły pomysł* (in my opinion it's a bad idea) and *Lepiej, żeby poczekał jeszcze rok* (it would be better if he waited another year).", ne: "उनी भन्छन् *moim zdaniem to zły pomysł* (मेरो विचारमा यो नराम्रो योजना हो) र *Lepiej, żeby poczekał jeszcze rok* (अझै एक वर्ष पर्खेको राम्रो)।" }
          }
        ]
      },
      {
        kind: "reading", title: "Reading", titleNe: "पढाइ",
        text: {
          pl: "Mój pierwszy rok w Polsce\n\nNazywam się Sunil i od roku mieszkam we Wrocławiu. Przyjechałem do Polski do pracy w magazynie. Na początku było mi bardzo trudno. Nie znałem języka, nie rozumiałem, co mówią koledzy, a zimą już o szesnastej było ciemno.\n\nPo trzech miesiącach zapisałem się na kurs polskiego. Zajęcia odbywają się dwa razy w tygodniu wieczorem, więc mogę na nie chodzić po pracy. Nauczycielka jest bardzo cierpliwa i dużo rozmawiamy o codziennych sytuacjach: jak umówić się do lekarza, jak załatwić sprawę w urzędzie albo jak zareklamować towar w sklepie.\n\nDzisiaj rozumiem dużo więcej. Sam rozmawiam z kierownikiem, a w zeszłym miesiącu dostałem awans — zostałem brygadzistą. Mam teraz więcej obowiązków, ale też wyższą pensję.\n\nNajbardziej brakuje mi rodziny i nepalskiego jedzenia. Na szczęście w moim mieście jest mały sklep z produktami z Azji, więc czasem gotuję dal bhat dla polskich znajomych. Bardzo im smakuje!\n\nMoja rada dla nowych osób: nie bójcie się mówić po polsku, nawet z błędami. Polacy doceniają każdą próbę.",
          en: "My first year in Poland\n\nMy name is Sunil and I have been living in Wrocław for a year. I came to Poland to work in a warehouse. At first it was very hard for me. I didn't know the language, I didn't understand what my colleagues were saying, and in winter it was already dark at four o'clock.\n\nAfter three months I signed up for a Polish course. The classes are twice a week in the evening, so I can go after work. The teacher is very patient and we talk a lot about everyday situations: how to make a doctor's appointment, how to get something done at an office or how to return faulty goods in a shop.\n\nToday I understand much more. I talk to my manager myself, and last month I was promoted — I became a team leader. I now have more duties, but also a higher salary.\n\nWhat I miss most is my family and Nepali food. Luckily there is a small shop with Asian products in my city, so I sometimes cook dal bhat for my Polish friends. They love it!\n\nMy advice for new people: don't be afraid to speak Polish, even with mistakes. Poles appreciate every attempt.",
          ne: "पोल्यान्डमा मेरो पहिलो वर्ष\n\nमेरो नाम सुनिल हो र म एक वर्षदेखि व्रोत्स्वाफमा बस्दै छु। म गोदाममा काम गर्न पोल्यान्ड आएँ। सुरुमा मलाई निकै गाह्रो भयो। मलाई भाषा आउँदैनथ्यो, साथीहरूले के भनिरहेका छन् बुझ्दिनथेँ, र जाडोमा चार बजेतिरै अँध्यारो हुन्थ्यो।\n\nतीन महिनापछि म पोलिश भाषा कक्षामा भर्ना भएँ। कक्षा हप्तामा दुई पटक साँझ हुन्छ, त्यसैले काम सकेर जान सक्छु। शिक्षिका धेरै धैर्यवान् हुनुहुन्छ र हामी दैनिक जीवनका परिस्थितिबारे धेरै कुरा गर्छौँ: डाक्टरसँग समय कसरी लिने, कार्यालयमा काम कसरी गराउने, वा पसलमा बिग्रेको सामानको उजुरी कसरी गर्ने।\n\nआज म धेरै बढी बुझ्छु। म आफैँ म्यानेजरसँग कुरा गर्छु, र गएको महिना मेरो बढुवा भयो — म टोली प्रमुख बनेँ। अब मेरो जिम्मेवारी बढी छ, तर तलब पनि बढी छ।\n\nमलाई सबैभन्दा बढी परिवार र नेपाली खानाको याद आउँछ। भाग्यवश मेरो सहरमा एसियाली सामान पाइने सानो पसल छ, त्यसैले कहिलेकाहीँ म पोलिश साथीहरूका लागि दाल भात पकाउँछु। उनीहरूलाई धेरै मीठो लाग्छ!\n\nनयाँ मानिसहरूलाई मेरो सल्लाह: गल्ती भए पनि पोलिश बोल्न नडराउनुहोस्। पोलिशहरू हरेक प्रयासको कदर गर्छन्।"
        },
        items: [
          {
            q: "Dlaczego Sunil przyjechał do Polski?", qEn: "Why did Sunil come to Poland?", qNe: "सुनिल किन पोल्यान्ड आए?",
            options: ["Na studia.", "Do pracy.", "Do rodziny."], answer: 1,
            why: { en: "Paragraph 1: *Przyjechałem do Polski do pracy w magazynie* — he came to work in a warehouse.", ne: "पहिलो अनुच्छेद: *Przyjechałem do Polski do pracy w magazynie* — उनी गोदाममा काम गर्न आए।" }
          },
          {
            q: "Kiedy Sunil chodzi na kurs polskiego?", qEn: "When does Sunil go to his Polish course?", qNe: "सुनिल पोलिश कक्षामा कहिले जान्छन्?",
            options: ["W weekendy rano.", "Codziennie w przerwie w pracy.", "Dwa razy w tygodniu wieczorem."], answer: 2,
            why: { en: "Paragraph 2: *Zajęcia odbywają się dwa razy w tygodniu wieczorem* — twice a week in the evening.", ne: "दोस्रो अनुच्छेद: *Zajęcia odbywają się dwa razy w tygodniu wieczorem* — हप्तामा दुई पटक साँझ।" }
          },
          {
            q: "Co zmieniło się w pracy Sunila w zeszłym miesiącu?", qEn: "What changed in Sunil's job last month?", qNe: "गएको महिना सुनिलको काममा के परिवर्तन भयो?",
            options: ["Dostał awans.", "Zmienił firmę.", "Stracił pracę."], answer: 0,
            why: { en: "Paragraph 3: *w zeszłym miesiącu dostałem awans* — last month he was promoted to team leader (*brygadzista*).", ne: "तेस्रो अनुच्छेद: *w zeszłym miesiącu dostałem awans* — गएको महिना उनी टोली प्रमुख (*brygadzista*) मा बढुवा भए।" }
          },
          {
            q: "Czego Sunilowi najbardziej brakuje?", qEn: "What does Sunil miss most?", qNe: "सुनिललाई सबैभन्दा बढी केको याद आउँछ?",
            options: ["Ciepłej pogody.", "Rodziny i nepalskiego jedzenia.", "Kolegów z kursu."], answer: 1,
            why: { en: "Paragraph 4: *Najbardziej brakuje mi rodziny i nepalskiego jedzenia*. Note: after *brakuje* Polish uses the genitive (*rodziny*, *jedzenia*).", ne: "चौथो अनुच्छेद: *Najbardziej brakuje mi rodziny i nepalskiego jedzenia*। ध्यान दिनुहोस्: *brakuje* पछि षष्ठी (genitive) आउँछ (*rodziny*, *jedzenia*)।" }
          },
          {
            q: "Jaką radę daje Sunil nowym osobom?", qEn: "What advice does Sunil give to new people?", qNe: "सुनिल नयाँ मानिसहरूलाई के सल्लाह दिन्छन्?",
            options: ["Uczyć się tylko z książek.", "Mówić po polsku tylko bez błędów.", "Mówić po polsku, nawet z błędami."], answer: 2,
            why: { en: "Last paragraph: *nie bójcie się mówić po polsku, nawet z błędami* — don't be afraid to speak, even with mistakes.", ne: "अन्तिम अनुच्छेद: *nie bójcie się mówić po polsku, nawet z błędami* — गल्ती भए पनि बोल्न नडराउनुहोस्।" }
          }
        ]
      },
      {
        kind: "grammar", title: "Grammar", titleNe: "व्याकरण",
        items: [
          {
            q: "Od roku ___ we Wrocławiu.", en: "I have been living in Wrocław for a year.", ne: "म एक वर्षदेखि व्रोत्स्वाफमा बस्दै छु।",
            options: ["mieszkałem", "mieszkam", "zamieszkam"], answer: 1,
            why: { en: "With *od* + time (for/since) Polish uses the **present** tense when the action is still going on: *od roku mieszkam* = I have been living for a year. English uses 'have been', Polish does not.", ne: "*od* + समय (देखि) सँग, काम अझै चलिरहेको छ भने पोलिशमा **वर्तमान** काल प्रयोग हुन्छ: *od roku mieszkam* = एक वर्षदेखि बस्दै छु। नेपालीमा जस्तै, अतीत काल चाहिँदैन।" }
          },
          {
            q: "Muszę iść do ___, bo boli mnie ząb.", en: "I have to go to the dentist because my tooth hurts.", ne: "मेरो दाँत दुखेकोले म दन्त चिकित्सककहाँ जानुपर्छ।",
            options: ["dentysta", "dentystą", "dentysty"], answer: 2,
            why: { en: "*Do* always takes the genitive. *Dentysta* is a masculine noun ending in -a, so it changes like a feminine noun: *do dentysty*.", ne: "*do* पछि सधैँ षष्ठी (genitive) आउँछ। *dentysta* -a मा टुंगिने पुलिङ्ग नाम हो, त्यसैले स्त्रीलिङ्ग नामजस्तै बदलिन्छ: *do dentysty*।" }
          },
          {
            q: "Jeśli jutro będzie padać, ___ w domu.", en: "If it rains tomorrow, we will stay at home.", ne: "भोलि पानी पर्‍यो भने हामी घरमै बस्छौँ।",
            options: ["zostaniemy", "zostalibyśmy", "zostawaliśmy"], answer: 0,
            why: { en: "*Jeśli* + future is a real, possible condition, so the result is also in the future: *zostaniemy* (we will stay). *Zostalibyśmy* is conditional and goes with *gdyby*.", ne: "*jeśli* + भविष्य काल सम्भव हुने सर्त हो, त्यसैले परिणाम पनि भविष्य कालमै हुन्छ: *zostaniemy* (बस्नेछौँ)। *zostalibyśmy* शर्तवाचक हो र *gdyby* सँग आउँछ।" }
          },
          {
            q: "Szukam pracy ___ opiekun osób starszych.", en: "I'm looking for work as a carer for elderly people.", ne: "म वृद्धवृद्धाको हेरचाहकर्ताको रूपमा काम खोज्दै छु।",
            options: ["jak", "jako", "niż"], answer: 1,
            why: { en: "*Jako* means 'as (in the role of)': *pracuję jako kierowca*. *Jak* means 'like / how', and *niż* means 'than' in comparisons.", ne: "*jako* को अर्थ 'को रूपमा' हो: *pracuję jako kierowca*। *jak* को अर्थ 'जस्तै / कसरी' र *niż* को अर्थ तुलनामा 'भन्दा' हो।" }
          },
          {
            q: "Wczoraj ___ cały raport i wysłałem go szefowi.", en: "Yesterday I wrote the whole report and sent it to my boss.", ne: "हिजो मैले पूरा रिपोर्ट लेखेँ र हाकिमलाई पठाएँ।",
            options: ["napisałem", "piszę", "napiszę"], answer: 0,
            why: { en: "The action is in the past (*wczoraj*) and finished (the whole report, then sent), so use the perfective past: *napisałem*.", ne: "काम अतीतमा (*wczoraj*) भयो र सकियो (पूरा रिपोर्ट, अनि पठाइयो), त्यसैले पूर्ण पक्षको भूतकाल: *napisałem*।" }
          },
          {
            q: "Ta pani, ___ rozmawiałeś, jest moją kierowniczką.", en: "The lady you were talking to is my manager.", ne: "तिमीले जोसँग कुरा गर्‍यौ, ती महिला मेरी म्यानेजर हुन्।",
            options: ["która", "z którą", "którą"], answer: 1,
            why: { en: "We say *rozmawiać z kimś* (talk with someone), so the preposition stays: *z którą* (feminine, because *pani*). English can drop 'to' at the end; Polish cannot drop *z*.", ne: "*rozmawiać z kimś* (कसैसँग कुरा गर्नु) भनिन्छ, त्यसैले *z* रहन्छ: *z którą* (*pani* स्त्रीलिङ्ग भएकोले)। पोलिशमा *z* हटाउन मिल्दैन।" }
          },
          {
            q: "Proszę ___ ten formularz drukowanymi literami.", en: "Please fill in this form in block capitals.", ne: "कृपया यो फारम ठूला छापा अक्षरमा भर्नुहोस्।",
            options: ["wypełnia", "wypełniony", "wypełnić"], answer: 2,
            why: { en: "Polite requests and instructions use *proszę* + infinitive: *proszę wypełnić*, *proszę podpisać*. You see this on many official forms.", ne: "विनम्र अनुरोध र निर्देशनमा *proszę* + मूल क्रिया (infinitive) आउँछ: *proszę wypełnić*, *proszę podpisać*। सरकारी फारमहरूमा यो धेरै देखिन्छ।" }
          },
          {
            q: "W przyszłym tygodniu jadę ___ urlop.", en: "Next week I'm going on holiday.", ne: "अर्को हप्ता म बिदामा जाँदै छु।",
            options: ["na", "do", "w"], answer: 0,
            why: { en: "Fixed phrase: *jechać na urlop* (go on leave/holiday), like *iść na zakupy*, *na spacer*. *Do* is used for places: *do Gdańska*.", ne: "निश्चित वाक्यांश: *jechać na urlop* (बिदामा जानु), जस्तै *iść na zakupy*, *na spacer*। *do* ठाउँका लागि प्रयोग हुन्छ: *do Gdańska*।" }
          },
          {
            q: "Lekarz powiedział, żebym ___ więcej wody.", en: "The doctor told me to drink more water.", ne: "डाक्टरले मलाई अझ धेरै पानी पिउन भन्नुभयो।",
            options: ["piję", "pił", "pić"], answer: 1,
            why: { en: "After *żeby* the verb takes the past-tense form (*-ł*), and the person ending sits on *żeby*: *żebym pił* (that I drink), *żebyś pił* (that you drink).", ne: "*żeby* पछि क्रिया भूतकालको रूप (*-ł*) मा आउँछ, र व्यक्ति (म/तिमी…) जनाउने अन्त्य *żeby* मा जोडिन्छ: *żebym pił* (म पिऊँ भनेर), *żebyś pił* (तिमी पिऊ भनेर)।" }
          },
          {
            q: "Nie znam nikogo, kto ___ mi pomóc.", en: "I don't know anyone who could help me.", ne: "मलाई सहयोग गर्न सक्ने कसैलाई म चिन्दिनँ।",
            options: ["mogłoby", "mogli", "mógłby"], answer: 2,
            why: { en: "*Kto* is always grammatically masculine singular, so the verb is *mógłby*. The conditional is used because this person may not exist.", ne: "*kto* व्याकरणमा सधैँ पुलिङ्ग एकवचन हुन्छ, त्यसैले क्रिया *mógłby* हुन्छ। यस्तो व्यक्ति नहुन पनि सक्ने भएकोले शर्तवाचक प्रयोग गरिएको हो।" }
          }
        ]
      },
      {
        kind: "writing", title: "Writing", titleNe: "लेखाइ",
        tasks: [
          {
            prompt: {
              pl: "Mieszkasz w wynajętym mieszkaniu. Od trzech dni nie działa ogrzewanie. Napisz e-mail do właściciela mieszkania, pana Nowaka. Opisz problem, napisz, od kiedy trwa, i poproś o przysłanie fachowca. Podaj, kiedy jesteś w domu. (60–80 słów)",
              en: "You live in a rented flat. The heating hasn't worked for three days. Write an email to the owner of the flat, Mr Nowak. Describe the problem, say since when it has been going on, and ask him to send a repair person. Say when you are at home. (60–80 words)",
              ne: "तपाईं भाडाको फ्ल्याटमा बस्नुहुन्छ। तीन दिनदेखि हिटिङ चलेको छैन। फ्ल्याटका मालिक, श्री नोभाकलाई इमेल लेख्नुहोस्। समस्या बताउनुहोस्, कहिलेदेखि भएको हो लेख्नुहोस्, र मिस्त्री पठाइदिन अनुरोध गर्नुहोस्। तपाईं कहिले घरमा हुनुहुन्छ भन्नुहोस्। (६०–८० शब्द)"
            },
            minWords: 60,
            model: {
              pl: "Szanowny Panie,\n\npiszę w sprawie ogrzewania w mieszkaniu przy ulicy Lipowej 12. Od poniedziałku kaloryfery są zimne, a w pokoju jest tylko piętnaście stopni. Sprawdziłem zawory, ale to nie pomogło. Bardzo proszę o przysłanie fachowca, najlepiej jak najszybciej. Jestem w domu codziennie po szesnastej, a w sobotę przez cały dzień. Proszę o informację, kiedy ktoś może przyjść.\n\nZ poważaniem\nRamesh Thapa",
              en: "Dear Sir,\n\nI am writing about the heating in the flat at 12 Lipowa Street. Since Monday the radiators have been cold, and it is only fifteen degrees in the room. I checked the valves, but it didn't help. Please send a repair person, preferably as soon as possible. I am at home every day after 4 pm, and all day on Saturday. Please let me know when someone can come.\n\nYours faithfully,\nRamesh Thapa",
              ne: "आदरणीय महोदय,\n\nम लिपोभा सडक १२ मा रहेको फ्ल्याटको हिटिङबारे लेख्दै छु। सोमबारदेखि रेडिएटरहरू चिसा छन्, र कोठामा जम्मा पन्ध्र डिग्री मात्र छ। मैले भल्भहरू जाँचेँ, तर केही फरक परेन। कृपया सकेसम्म चाँडो एक जना मिस्त्री पठाइदिनुहोस्। म हरेक दिन चार बजेपछि र शनिबार दिनभर घरमै हुन्छु। कोही कहिले आउन सक्छ, कृपया जानकारी दिनुहोला।\n\nसादर,\nरमेश थापा"
            },
            checklist: [
              { en: "Did you start with a formal greeting (*Szanowny Panie,*) and continue with a small letter after the comma?", ne: "के तपाईंले औपचारिक अभिवादन (*Szanowny Panie,*) बाट सुरु गर्नुभयो र अल्पविरामपछि सानो अक्षरबाट लेख्नुभयो?" },
              { en: "Did you say what the problem is and since when (*od poniedziałku*, *od trzech dni*)?", ne: "के तपाईंले समस्या के हो र कहिलेदेखि हो (*od poniedziałku*, *od trzech dni*) लेख्नुभयो?" },
              { en: "Did you ask politely, e.g. *Bardzo proszę o…* + accusative (*o przysłanie fachowca*)?", ne: "के तपाईंले विनम्र अनुरोध गर्नुभयो, जस्तै *Bardzo proszę o…* (*o przysłanie fachowca*)?" },
              { en: "Did you say when you are at home (days and times)?", ne: "के तपाईंले कहिले घरमा हुनुहुन्छ (दिन र समय) लेख्नुभयो?" },
              { en: "Did you use the formal *Pan* forms and never *ty*?", ne: "के तपाईंले औपचारिक *Pan* रूप मात्र प्रयोग गर्नुभयो, *ty* प्रयोग गर्नुभएन?" },
              { en: "Did you finish with *Z poważaniem* and your name?", ne: "के तपाईंले *Z poważaniem* र आफ्नो नामले अन्त्य गर्नुभयो?" }
            ]
          },
          {
            prompt: {
              pl: "Czy lepiej mieszkać w dużym mieście, czy na wsi? Napisz swoją opinię. Podaj co najmniej dwa argumenty i napisz też jedną zaletę drugiej możliwości. (80–100 słów)",
              en: "Is it better to live in a big city or in the countryside? Write your opinion. Give at least two arguments and also mention one advantage of the other option. (80–100 words)",
              ne: "ठूलो सहरमा बस्नु राम्रो कि गाउँमा? आफ्नो विचार लेख्नुहोस्। कम्तीमा दुईवटा तर्क दिनुहोस् र अर्को विकल्पको एउटा फाइदा पनि लेख्नुहोस्। (८०–१०० शब्द)"
            },
            minWords: 80,
            model: {
              pl: "Moim zdaniem lepiej mieszkać w dużym mieście, szczególnie kiedy jest się w Polsce od niedawna. Po pierwsze, w mieście łatwiej znaleźć pracę i kurs języka polskiego. Po drugie, komunikacja miejska jest dobra, więc nie trzeba mieć samochodu. Poza tym w dużym mieście mieszka więcej osób z Nepalu, więc łatwiej dostać pomoc i radę. Oczywiście życie na wsi też ma zalety: jest ciszej, czyściej i taniej. Mimo to uważam, że na początku miasto daje więcej możliwości. Może kiedyś, gdy będę miał rodzinę, przeprowadzę się na wieś.",
              en: "In my opinion it is better to live in a big city, especially when you have only recently come to Poland. Firstly, in a city it is easier to find a job and a Polish course. Secondly, public transport is good, so you don't need a car. Besides, more people from Nepal live in a big city, so it is easier to get help and advice. Of course, life in the countryside also has advantages: it is quieter, cleaner and cheaper. Even so, I think that at the beginning a city gives more opportunities. Maybe one day, when I have a family, I will move to the countryside.",
              ne: "मेरो विचारमा ठूलो सहरमा बस्नु राम्रो हो, विशेष गरी पोल्यान्ड भर्खरै आउनुभएको छ भने। पहिलो, सहरमा काम र पोलिश भाषा कक्षा पाउन सजिलो हुन्छ। दोस्रो, सार्वजनिक यातायात राम्रो हुन्छ, त्यसैले कार चाहिँदैन। साथै, ठूलो सहरमा नेपालबाट आएका धेरै मानिस बस्छन्, त्यसैले सहयोग र सल्लाह पाउन सजिलो हुन्छ। पक्कै पनि गाउँको जीवनका पनि फाइदा छन्: त्यहाँ शान्त, सफा र सस्तो हुन्छ। तैपनि, सुरुमा सहरले बढी अवसर दिन्छ भन्ने मलाई लाग्छ। सायद कुनै दिन, परिवार भएपछि, म गाउँमा सर्नेछु।"
            },
            checklist: [
              { en: "Did you give your opinion clearly at the start (*Moim zdaniem…*, *Uważam, że…*)?", ne: "के तपाईंले सुरुमै आफ्नो विचार स्पष्ट भन्नुभयो (*Moim zdaniem…*, *Uważam, że…*)?" },
              { en: "Did you give at least two arguments, linked with *po pierwsze*, *po drugie*, *poza tym*?", ne: "के तपाईंले *po pierwsze*, *po drugie*, *poza tym* जस्ता शब्दले जोडेर कम्तीमा दुई तर्क दिनुभयो?" },
              { en: "Did you mention one advantage of the other option (*Oczywiście…*, *Z drugiej strony…*)?", ne: "के तपाईंले अर्को विकल्पको एउटा फाइदा उल्लेख गर्नुभयो (*Oczywiście…*, *Z drugiej strony…*)?" },
              { en: "Did you finish with a short conclusion (*Mimo to…*, *Dlatego…*)?", ne: "के तपाईंले छोटो निष्कर्षले अन्त्य गर्नुभयो (*Mimo to…*, *Dlatego…*)?" },
              { en: "Did you check the cases after prepositions: *w mieście*, *na wsi*, *na wieś*?", ne: "के तपाईंले विभक्ति जाँच्नुभयो: *w mieście*, *na wsi*, *na wieś*?" }
            ]
          }
        ]
      }
    ]
  },

  {
    id: "b1-practice-2", level: "B1",
    title: "B1 practice test 2", titleNe: "B1 अभ्यास परीक्षा २",
    intro: {
      en: "This is a second practice test in the style of the state certificate exam in Polish at level B1 (*egzamin certyfikatowy*). The real exam checks five skills: **listening**, **grammar and structures**, **reading**, **writing** and **speaking** (a conversation with examiners). Here you practise the first four. Try to work without a dictionary and without stopping, as in a real exam, and only then read the explanations. Write your texts by hand or in a notebook, count the words, and compare them with the model answers and checklists. Practise speaking separately: describe pictures, talk about your work and life, and give your opinion out loud. Exam rules, dates and requirements can change, so always check the official exam website (certyfikatpolski.pl) for current information.",
      ne: "यो B1 तहको पोलिश सरकारी प्रमाणपत्र परीक्षा (*egzamin certyfikatowy*) को शैलीमा बनाइएको दोस्रो अभ्यास परीक्षा हो। वास्तविक परीक्षाले पाँच सीप जाँच्छ: **सुनाइ**, **व्याकरण र संरचना**, **पढाइ**, **लेखाइ** र **बोलाइ** (परीक्षकहरूसँग कुराकानी)। यहाँ तपाईं पहिलो चारवटा अभ्यास गर्नुहुन्छ। वास्तविक परीक्षामा जस्तै शब्दकोश बिना र नरोकिई गर्ने प्रयास गर्नुहोस्, अनि मात्र व्याख्या पढ्नुहोस्। आफ्ना पाठहरू हातले वा कापीमा लेख्नुहोस्, शब्द गन्नुहोस्, र नमुना उत्तर तथा चेकलिस्टसँग तुलना गर्नुहोस्। बोलाइ छुट्टै अभ्यास गर्नुहोस्: चित्र वर्णन गर्नुहोस्, आफ्नो काम र जीवनबारे बोल्नुहोस्, र ठूलो स्वरमा आफ्नो विचार भन्नुहोस्। परीक्षाका नियम, मिति र आवश्यकताहरू बदलिन सक्छन्, त्यसैले हालको जानकारीका लागि सधैँ आधिकारिक परीक्षा वेबसाइट (certyfikatpolski.pl) हेर्नुहोस्।"
    },
    sections: [
      {
        kind: "listening", title: "Listening", titleNe: "सुनाइ",
        items: [
          {
            audio: "— Dzień dobry, mam katar i boli mnie gardło. — Proszę wziąć te tabletki do ssania, trzy razy dziennie po jedzeniu. Jeśli za pięć dni nie będzie lepiej, proszę iść do lekarza.",
            en: "— Hello, I have a runny nose and a sore throat. — Please take these lozenges, three times a day after meals. If it isn't better in five days, please go to a doctor.",
            ne: "— नमस्ते, मलाई रुघा लागेको छ र घाँटी दुखेको छ। — यी चुस्ने चक्की लिनुहोस्, दिनमा तीन पटक खाना खाएपछि। पाँच दिनमा ठीक भएन भने कृपया डाक्टरकहाँ जानुहोस्।",
            q: "Jak często trzeba brać tabletki?", qEn: "How often do you have to take the tablets?", qNe: "चक्की कति पटक खानुपर्छ?",
            options: ["Raz dziennie przed jedzeniem.", "Trzy razy dziennie po jedzeniu.", "Co pięć godzin."], answer: 1,
            why: { en: "The pharmacist says *trzy razy dziennie po jedzeniu* — three times a day after meals. 'Five' is about days (*za pięć dni*), not hours.", ne: "फार्मासिस्ट भन्छन् *trzy razy dziennie po jedzeniu* — दिनमा तीन पटक खानापछि। 'पाँच' दिनको कुरा हो (*za pięć dni*), घण्टाको होइन।" }
          },
          {
            audio: "Informujemy, że z powodu remontu ulicy Długiej tramwaje linii trzy i siedem jeżdżą objazdem. Na przystanek Rynek można dojechać autobusem zastępczym, który odjeżdża co dziesięć minut sprzed dworca.",
            en: "Please note that because of roadworks on Długa Street, tram lines 3 and 7 are taking a diversion. You can get to the Rynek stop by the replacement bus, which leaves every ten minutes from in front of the station.",
            ne: "जानकारी गराइन्छ कि Długa सडकको मर्मतका कारण ट्राम लाइन ३ र ७ अर्कै बाटो भएर चलिरहेका छन्। Rynek बिसौनीसम्म स्टेसनअगाडिबाट हरेक दस मिनेटमा छुट्ने वैकल्पिक बसबाट पुग्न सकिन्छ।",
            q: "Jak można dojechać na przystanek Rynek?", qEn: "How can you get to the Rynek stop?", qNe: "Rynek बिसौनीसम्म कसरी पुग्न सकिन्छ?",
            options: ["Tramwajem numer trzy.", "Tramwajem numer siedem.", "Autobusem zastępczym."], answer: 2,
            why: { en: "Trams 3 and 7 take a diversion (*objazd*). To Rynek you go *autobusem zastępczym* — by the replacement bus.", ne: "ट्राम ३ र ७ अर्कै बाटो (*objazd*) भएर जान्छन्। Rynek सम्म *autobusem zastępczym* — वैकल्पिक बसबाट जानुपर्छ।" }
          },
          {
            audio: "Dzień dobry, mówi Katarzyna Wiśniewska z firmy Logimax. Dziękujemy za przesłanie CV. Chcielibyśmy zaprosić Pana na rozmowę kwalifikacyjną w środę o jedenastej. Proszę potwierdzić termin SMS-em.",
            en: "Hello, this is Katarzyna Wiśniewska from the company Logimax. Thank you for sending your CV. We would like to invite you to a job interview on Wednesday at eleven. Please confirm the appointment by text message.",
            ne: "नमस्ते, म Logimax कम्पनीबाट कातार्जिना भिश्नेभ्स्का बोल्दै छु। सीभी पठाउनुभएकोमा धन्यवाद। हामी तपाईंलाई बुधबार एघार बजे जागिरको अन्तर्वार्तामा बोलाउन चाहन्छौँ। कृपया SMS मार्फत समय पक्का गर्नुहोस्।",
            q: "Co ma zrobić mężczyzna?", qEn: "What does the man have to do?", qNe: "ती पुरुषले के गर्नुपर्छ?",
            options: ["Wysłać CV jeszcze raz.", "Przyjść we wtorek.", "Potwierdzić termin SMS-em."], answer: 2,
            why: { en: "The last sentence: *Proszę potwierdzić termin SMS-em*. The CV was already sent (*Dziękujemy za przesłanie CV*), and the interview is on Wednesday (*w środę*), not Tuesday.", ne: "अन्तिम वाक्य: *Proszę potwierdzić termin SMS-em*। सीभी पहिले नै पठाइसकिएको छ (*Dziękujemy za przesłanie CV*), र अन्तर्वार्ता मंगलबार होइन, बुधबार (*w środę*) छ।" }
          },
          {
            audio: "Jutro w górach będzie pochmurno i chłodno, około ośmiu stopni. Po południu możliwe są burze, dlatego turystom radzimy wracać ze szlaków przed czternastą.",
            en: "Tomorrow in the mountains it will be cloudy and cool, about eight degrees. Storms are possible in the afternoon, so we advise hikers to come back from the trails before 2 pm.",
            ne: "भोलि पहाडमा बादल लाग्नेछ र चिसो हुनेछ, करिब आठ डिग्री। दिउँसो आँधी-चट्याङ आउन सक्छ, त्यसैले पदयात्रीहरूलाई दुई बजेअघि नै पदमार्गबाट फर्कन सल्लाह दिन्छौँ।",
            q: "Co prognoza radzi turystom?", qEn: "What does the forecast advise hikers?", qNe: "मौसम पूर्वानुमानले पदयात्रीहरूलाई के सल्लाह दिन्छ?",
            options: ["Wrócić ze szlaków przed czternastą.", "Wyjść w góry po południu.", "Zostać w domu przez cały dzień."], answer: 0,
            why: { en: "*Turystom radzimy wracać ze szlaków przed czternastą* — come back before 14:00, because storms are possible in the afternoon (*po południu*).", ne: "*Turystom radzimy wracać ze szlaków przed czternastą* — दुई बजेअघि फर्कनुहोस्, किनभने दिउँसो (*po południu*) आँधी आउन सक्छ।" }
          },
          {
            audio: "— Co sądzisz o pracy zdalnej? — Szczerze mówiąc, nie lubię jej. W domu trudno mi się skupić i brakuje mi kontaktu z ludźmi. Wolę jeździć do biura, nawet jeśli dojazd zajmuje godzinę.",
            en: "— What do you think about remote work? — To be honest, I don't like it. At home it's hard for me to concentrate and I miss contact with people. I prefer going to the office, even if the journey takes an hour.",
            ne: "— घरबाट काम गर्ने बारे तिमी के सोच्छौ? — साँचो भन्नुपर्दा, मलाई मन पर्दैन। घरमा ध्यान दिन गाह्रो हुन्छ र मानिसहरूसँगको सम्पर्कको याद आउँछ। अफिस पुग्न एक घण्टा लागे पनि मलाई अफिस जानु नै मन पर्छ।",
            q: "Dlaczego ta osoba woli pracować w biurze?", qEn: "Why does this person prefer working in the office?", qNe: "यो व्यक्तिलाई किन अफिसमा काम गर्न मन पर्छ?",
            options: ["Bo biuro jest blisko domu.", "Bo w domu trudno jej się skupić.", "Bo szef tego wymaga."], answer: 1,
            why: { en: "*W domu trudno mi się skupić* — it's hard to concentrate at home. The office is not close: the journey takes an hour (*dojazd zajmuje godzinę*).", ne: "*W domu trudno mi się skupić* — घरमा ध्यान दिन गाह्रो हुन्छ। अफिस नजिक छैन: पुग्न एक घण्टा लाग्छ (*dojazd zajmuje godzinę*)।" }
          }
        ]
      },
      {
        kind: "reading", title: "Reading", titleNe: "पढाइ",
        text: {
          pl: "OGŁOSZENIE\n\nSzanowni Mieszkańcy!\n\nInformujemy, że w dniach 14–16 maja w budynku przy ulicy Słonecznej 8 będzie prowadzona wymiana rur wodociągowych. W tym czasie w godzinach od 8:00 do 16:00 nie będzie ani ciepłej, ani zimnej wody. Wieczorem i w nocy woda będzie dostępna normalnie.\n\nProsimy o zrobienie zapasu wody pitnej. Przed budynkiem będzie stał beczkowóz, z którego w ciągu dnia można pobierać wodę.\n\nPracownicy firmy remontowej będą musieli wejść do każdego mieszkania na około 30 minut. Jeśli w tych dniach nie będzie Państwa w domu, prosimy o kontakt z administracją do 10 maja, aby ustalić inny termin albo zostawić klucze u sąsiada.\n\nZa utrudnienia przepraszamy.\nAdministracja budynku",
          en: "NOTICE\n\nDear Residents,\n\nWe would like to inform you that on 14–16 May the water pipes in the building at 8 Słoneczna Street will be replaced. During this time, from 8:00 to 16:00, there will be no hot or cold water. In the evening and at night water will be available as normal.\n\nPlease store some drinking water. A water tanker will stand in front of the building, from which you can take water during the day.\n\nWorkers from the renovation company will need to enter every flat for about 30 minutes. If you are not at home on these days, please contact the building management by 10 May to arrange another time or to leave your keys with a neighbour.\n\nWe apologise for the inconvenience.\nBuilding management",
          ne: "सूचना\n\nआदरणीय बासिन्दाहरू!\n\nजानकारी गराइन्छ कि मे १४–१६ मा Słoneczna सडक ८ मा रहेको भवनमा पानीका पाइपहरू फेरिनेछन्। यस अवधिमा बिहान ८ बजेदेखि बेलुका ४ बजेसम्म न तातो पानी आउनेछ, न चिसो। साँझ र राति पानी सामान्य रूपमा आउनेछ।\n\nकृपया पिउने पानी जम्मा गरेर राख्नुहोस्। भवनअगाडि पानीको ट्याङ्कर रहनेछ, जहाँबाट दिनभर पानी लिन सकिन्छ।\n\nमर्मत कम्पनीका कामदारहरू हरेक फ्ल्याटमा करिब ३० मिनेटका लागि पस्नुपर्नेछ। यी दिनहरूमा तपाईं घरमा हुनुहुन्न भने, अर्को समय तय गर्न वा छिमेकीकहाँ साँचो छोड्न कृपया मे १० सम्म व्यवस्थापन कार्यालयलाई सम्पर्क गर्नुहोस्।\n\nअसुविधाका लागि हामी माफी चाहन्छौँ।\nभवन व्यवस्थापन"
        },
        items: [
          {
            q: "Co będzie się działo w budynku w dniach 14–16 maja?", qEn: "What will happen in the building on 14–16 May?", qNe: "मे १४–१६ मा भवनमा के हुनेछ?",
            options: ["Remont dachu.", "Wymiana rur.", "Malowanie klatki schodowej."], answer: 1,
            why: { en: "*Będzie prowadzona wymiana rur wodociągowych* — the water pipes will be replaced. *Wymiana* = replacement, exchange.", ne: "*Będzie prowadzona wymiana rur wodociągowych* — पानीका पाइप फेरिनेछन्। *wymiana* = फेर्ने काम।" }
          },
          {
            q: "Kiedy nie będzie wody?", qEn: "When will there be no water?", qNe: "पानी कहिले आउँदैन?",
            options: ["Przez całą dobę.", "W nocy.", "W ciągu dnia, od 8:00 do 16:00."], answer: 2,
            why: { en: "*W godzinach od 8:00 do 16:00 nie będzie… wody*, and *wieczorem i w nocy woda będzie dostępna normalnie* — so only during the day.", ne: "*W godzinach od 8:00 do 16:00 nie będzie… wody*, र *wieczorem i w nocy woda będzie dostępna normalnie* — त्यसैले दिनमा मात्र पानी आउँदैन।" }
          },
          {
            q: "Skąd mieszkańcy mogą wziąć wodę w ciągu dnia?", qEn: "Where can residents get water during the day?", qNe: "बासिन्दाहरूले दिउँसो पानी कहाँबाट लिन सक्छन्?",
            options: ["Z beczkowozu przed budynkiem.", "Z biura administracji.", "Od sąsiadów z innego budynku."], answer: 0,
            why: { en: "*Przed budynkiem będzie stał beczkowóz, z którego… można pobierać wodę* — a water tanker in front of the building.", ne: "*Przed budynkiem będzie stał beczkowóz, z którego… można pobierać wodę* — भवनअगाडि पानीको ट्याङ्कर हुनेछ।" }
          },
          {
            q: "Co powinny zrobić osoby, których nie będzie w domu?", qEn: "What should people who won't be at home do?", qNe: "घरमा नहुने मानिसहरूले के गर्नुपर्छ?",
            options: ["Nic nie muszą robić.", "Skontaktować się z administracją do 10 maja.", "Zapłacić za dodatkową wizytę."], answer: 1,
            why: { en: "*Prosimy o kontakt z administracją do 10 maja* — contact the management by 10 May. *Do* + date = by / until that date.", ne: "*Prosimy o kontakt z administracją do 10 maja* — मे १० सम्म व्यवस्थापनलाई सम्पर्क गर्नुहोस्। *do* + मिति = त्यो मितिसम्म।" }
          },
          {
            q: "Ile czasu pracownicy spędzą w każdym mieszkaniu?", qEn: "How long will the workers spend in each flat?", qNe: "कामदारहरू हरेक फ्ल्याटमा कति समय बिताउनेछन्?",
            options: ["Około pół godziny.", "Cały dzień.", "Trzy dni."], answer: 0,
            why: { en: "*Na około 30 minut* — about thirty minutes, which is half an hour (*pół godziny*). The three days are for the whole building.", ne: "*Na około 30 minut* — करिब तीस मिनेट, अर्थात् आधा घण्टा (*pół godziny*)। तीन दिन चाहिँ पूरै भवनको कामका लागि हो।" }
          }
        ]
      },
      {
        kind: "grammar", title: "Grammar", titleNe: "व्याकरण",
        items: [
          {
            q: "Przepraszam, czy mogę zapłacić ___?", en: "Excuse me, can I pay by card?", ne: "माफ गर्नुहोस्, के म कार्डबाट तिर्न सक्छु?",
            options: ["karta", "kartą", "kartę"], answer: 1,
            why: { en: "The tool you use is in the instrumental case, with no preposition: *płacić kartą*, *gotówką*; *jechać autobusem*. *Karta* → *kartą*.", ne: "कुनै कुराको साधन करण (instrumental) मा आउँछ, कुनै पूर्वसर्ग (preposition) बिना: *płacić kartą*, *gotówką*; *jechać autobusem*। *karta* → *kartą*।" }
          },
          {
            q: "Od dwóch tygodni boli mnie ___.", en: "My back has been hurting for two weeks.", ne: "दुई हप्तादेखि मेरो ढाड दुखिरहेको छ।",
            options: ["kręgosłupa", "kręgosłupem", "kręgosłup"], answer: 2,
            why: { en: "In *boli mnie…* the body part is the **subject**, so it stays in the nominative: *boli mnie kręgosłup*, *boli mnie głowa*. The person (*mnie*) is the object.", ne: "*boli mnie…* मा शरीरको अंग **कर्ता** हो, त्यसैले मूल रूप (nominative) मै रहन्छ: *boli mnie kręgosłup*, *boli mnie głowa*। व्यक्ति (*mnie*) कर्म हो — नेपालीको 'मलाई दुख्यो' जस्तै।" }
          },
          {
            q: "Gdybyś ___ wcześniej, zdążyłbyś na pociąg.", en: "If you had left earlier, you would have made it to the train.", ne: "तिमी अलि चाँडो निस्केको भए रेल समात्न भ्याउने थियौ।",
            options: ["wyszedł", "wyjdziesz", "wychodzisz"], answer: 0,
            why: { en: "After *gdyby* the verb uses the past-tense form (*-ł*), and the person ending goes on *gdyby*: *gdybyś wyszedł*. The present or future cannot follow *gdyby*.", ne: "*gdyby* पछि क्रिया भूतकालको रूप (*-ł*) मा आउँछ, र व्यक्ति (म/तिमी…) जनाउने अन्त्य *gdyby* मा जोडिन्छ: *gdybyś wyszedł*। *gdyby* पछि वर्तमान वा भविष्य काल आउँदैन।" }
          },
          {
            q: "Chciałbym umówić się ___ wizytę u lekarza.", en: "I would like to make an appointment with the doctor.", ne: "म डाक्टरसँग भेटको समय लिन चाहन्छु।",
            options: ["na", "do", "o"], answer: 0,
            why: { en: "Fixed phrase: *umówić się na wizytę* (make an appointment), *na rozmowę*, *na spotkanie*. You can also say *umówić się do lekarza* — but then the person follows *do*, not *wizytę*.", ne: "निश्चित वाक्यांश: *umówić się na wizytę* (भेटको समय लिनु), *na rozmowę*, *na spotkanie*। *umówić się do lekarza* पनि भनिन्छ — तर त्यसमा *do* पछि व्यक्ति आउँछ, *wizytę* होइन।" }
          },
          {
            q: "W urzędzie zawsze trzeba czekać w ___ kolejce.", en: "At the office you always have to wait in a long queue.", ne: "कार्यालयमा सधैँ लामो लाइनमा पर्खनुपर्छ।",
            options: ["długiej", "długa", "długą"], answer: 0,
            why: { en: "*W* + location takes the locative. Feminine adjectives in the locative end in *-ej*: *w długiej kolejce*, *w nowej pracy*.", ne: "स्थान बताउँदा *w* पछि अधिकरण (locative) आउँछ। स्त्रीलिङ्ग विशेषणको अधिकरणमा *-ej* हुन्छ: *w długiej kolejce*, *w nowej pracy*।" }
          },
          {
            q: "Wczoraj nie przyszedłem do pracy, ponieważ ___ chory.", en: "Yesterday I didn't come to work because I was ill.", ne: "म बिरामी भएकोले हिजो काममा आइनँ।",
            options: ["jestem", "byłem", "będę"], answer: 1,
            why: { en: "The whole sentence is about yesterday (*wczoraj*), so the reason is also in the past: *byłem chory* (a woman says *byłam chora*).", ne: "पूरै वाक्य हिजो (*wczoraj*) को बारेमा हो, त्यसैले कारण पनि भूतकालमा हुन्छ: *byłem chory* (महिलाले *byłam chora* भन्छिन्)।" }
          },
          {
            q: "Moim zdaniem ten film jest ___ niż książka.", en: "In my opinion this film is more interesting than the book.", ne: "मेरो विचारमा यो फिल्म किताबभन्दा रोचक छ।",
            options: ["ciekawy", "najciekawszy", "ciekawszy"], answer: 2,
            why: { en: "*Niż* (than) needs the comparative: *ciekawy* → *ciekawszy*. *Najciekawszy* means 'the most interesting' and is not used with *niż*.", ne: "*niż* (भन्दा) सँग तुलनात्मक रूप चाहिन्छ: *ciekawy* → *ciekawszy*। *najciekawszy* को अर्थ 'सबैभन्दा रोचक' हो, यो *niż* सँग आउँदैन।" }
          },
          {
            q: "Pracuję w tej firmie ___ 2022 roku.", en: "I have been working at this company since 2022.", ne: "म २०२२ देखि यो कम्पनीमा काम गर्दै छु।",
            options: ["przez", "od", "za"], answer: 1,
            why: { en: "*Od* + genitive = since (a starting point): *od 2022 roku*, *od poniedziałku*. *Przez* is used for a length of time: *przez dwa lata*.", ne: "*od* + षष्ठी = देखि (सुरु भएको समय): *od 2022 roku*, *od poniedziałku*। *przez* अवधिका लागि प्रयोग हुन्छ: *przez dwa lata* (दुई वर्षसम्म)।" }
          },
          {
            q: "Wysłałem ___ wiadomość wczoraj wieczorem.", en: "I sent him a message last night.", ne: "मैले हिजो बेलुका उसलाई सन्देश पठाएँ।",
            options: ["go", "mu", "jego"], answer: 1,
            why: { en: "You send something **to** someone, so the person is in the dative: *mu* (to him). *Go* is the accusative (*widzę go* = I see him), and *jego* means 'his'.", ne: "कसैलाई केही पठाइन्छ, त्यसैले व्यक्ति सम्प्रदान (dative) मा हुन्छ: *mu* (उसलाई)। *go* कर्म (accusative) हो (*widzę go* = म उसलाई देख्छु), र *jego* को अर्थ 'उसको' हो।" }
          },
          {
            q: "Polska to kraj, ___ chcę zostać na dłużej.", en: "Poland is a country where I want to stay for longer.", ne: "पोल्यान्ड यस्तो देश हो, जहाँ म लामो समयसम्म बस्न चाहन्छु।",
            options: ["który", "którym", "w którym"], answer: 2,
            why: { en: "We say *zostać w kraju* (stay in a country), so the preposition goes with *który*: *w którym* (= where). You can also say *gdzie*.", ne: "*zostać w kraju* (देशमा बस्नु) भनिन्छ, त्यसैले *w* पनि *który* सँग आउँछ: *w którym* (= जहाँ)। *gdzie* पनि भन्न सकिन्छ।" }
          }
        ]
      },
      {
        kind: "writing", title: "Writing", titleNe: "लेखाइ",
        tasks: [
          {
            prompt: {
              pl: "Napisz e-mail do swojej kierowniczki, pani Kowalskiej. Chcesz wziąć tydzień urlopu w lipcu, bo przyjeżdża do ciebie rodzina z Nepalu. Napisz, w jakim terminie chcesz mieć urlop i dlaczego, i zaproponuj, kto może cię zastąpić. (60–80 słów)",
              en: "Write an email to your manager, Mrs Kowalska. You want to take a week's leave in July because your family is coming to visit you from Nepal. Say when you want the leave and why, and suggest who can replace you. (60–80 words)",
              ne: "आफ्नी म्यानेजर, श्रीमती कोभाल्स्कालाई इमेल लेख्नुहोस्। नेपालबाट परिवार तपाईंलाई भेट्न आउँदै भएकोले तपाईं जुलाईमा एक हप्ताको बिदा लिन चाहनुहुन्छ। कुन मितिमा र किन बिदा चाहिएको हो लेख्नुहोस्, र तपाईंको ठाउँमा को काम गर्न सक्छ भनेर सुझाव दिनुहोस्। (६०–८० शब्द)"
            },
            minWords: 60,
            model: {
              pl: "Szanowna Pani Kierownik,\n\nchciałbym poprosić o tydzień urlopu wypoczynkowego od 7 do 11 lipca. W tym czasie przyjeżdżają do mnie rodzice z Nepalu, których nie widziałem od trzech lat. Przed urlopem skończę wszystkie swoje zadania. Rozmawiałem już z kolegą, Piotrem Zielińskim, i może on mnie zastąpić na mojej zmianie. Bardzo proszę o informację, czy ten termin jest możliwy.\n\nZ poważaniem\nBikash Gurung",
              en: "Dear Manager,\n\nI would like to ask for a week of annual leave from 7 to 11 July. During that time my parents are coming to visit me from Nepal; I haven't seen them for three years. I will finish all my tasks before my leave. I have already talked to my colleague, Piotr Zieliński, and he can replace me on my shift. Please let me know if these dates are possible.\n\nKind regards,\nBikash Gurung",
              ne: "आदरणीय म्यानेजर ज्यू,\n\nम जुलाई ७ देखि ११ सम्म एक हप्ताको वार्षिक बिदा माग्न चाहन्छु। त्यस बेला नेपालबाट मेरा आमाबुबा मलाई भेट्न आउँदै हुनुहुन्छ, जसलाई मैले तीन वर्षदेखि भेटेको छैन। बिदाअघि म आफ्ना सबै काम सक्नेछु। मैले सहकर्मी पिओत्र जिएलिन्स्कीसँग कुरा गरिसकेँ, र उहाँले मेरो सिफ्टमा मेरो ठाउँमा काम गर्न सक्नुहुन्छ। यो मिति मिल्छ कि मिल्दैन, कृपया जानकारी दिनुहोला।\n\nसादर,\nबिकाश गुरुङ"
            },
            checklist: [
              { en: "Did you use a formal greeting (*Szanowna Pani*, *Szanowna Pani Kierownik*) and *Pani* forms, not *ty*?", ne: "के तपाईंले औपचारिक अभिवादन (*Szanowna Pani*, *Szanowna Pani Kierownik*) र *Pani* रूप प्रयोग गर्नुभयो, *ty* होइन?" },
              { en: "Did you give exact dates (*od 7 do 11 lipca*)?", ne: "के तपाईंले ठ्याक्कै मिति (*od 7 do 11 lipca*) दिनुभयो?" },
              { en: "Did you explain the reason in one or two sentences?", ne: "के तपाईंले एक-दुई वाक्यमा कारण बताउनुभयो?" },
              { en: "Did you suggest who can replace you (*może mnie zastąpić*)?", ne: "के तपाईंले तपाईंको ठाउँमा को काम गर्न सक्छ भनेर सुझाव दिनुभयो (*może mnie zastąpić*)?" },
              { en: "Did you use polite request forms (*chciałbym / chciałabym poprosić o…*, *Bardzo proszę o informację*)?", ne: "के तपाईंले विनम्र अनुरोधका रूप (*chciałbym / chciałabym poprosić o…*, *Bardzo proszę o informację*) प्रयोग गर्नुभयो?" },
              { en: "Did you end with *Z poważaniem* and your full name?", ne: "के तपाईंले *Z poważaniem* र आफ्नो पूरा नामले अन्त्य गर्नुभयो?" }
            ]
          },
          {
            prompt: {
              pl: "Czy warto uczyć się języka polskiego, jeśli przyjeżdża się do Polski tylko na kilka lat? Napisz swoją opinię i uzasadnij ją. Podaj co najmniej dwa argumenty. (80–100 słów)",
              en: "Is it worth learning Polish if you come to Poland for only a few years? Write your opinion and give reasons for it. Give at least two arguments. (80–100 words)",
              ne: "केही वर्षका लागि मात्र पोल्यान्ड आउँदा पनि पोलिश भाषा सिक्नु उचित हुन्छ? आफ्नो विचार लेख्नुहोस् र कारण दिनुहोस्। कम्तीमा दुईवटा तर्क दिनुहोस्। (८०–१०० शब्द)"
            },
            minWords: 80,
            model: {
              pl: "Uważam, że zdecydowanie warto uczyć się polskiego, nawet jeśli planuje się zostać w Polsce tylko kilka lat. Po pierwsze, znajomość języka ułatwia codzienne życie: można samemu załatwić sprawę w urzędzie, porozmawiać z lekarzem albo zrozumieć umowę o pracę. Po drugie, osoba, która mówi po polsku, ma większe szanse na lepszą pracę i wyższą pensję. Niektórzy mówią, że wystarczy angielski, ale w wielu miejscach, na przykład w małych miastach, ludzie nie mówią po angielsku. Poza tym nauka języka pomaga poznać Polaków i ich kulturę. Dlatego moim zdaniem każdy miesiąc nauki to dobra inwestycja.",
              en: "I think it is definitely worth learning Polish, even if you plan to stay in Poland for only a few years. Firstly, knowing the language makes everyday life easier: you can deal with things at an office yourself, talk to a doctor or understand your work contract. Secondly, a person who speaks Polish has a better chance of a better job and a higher salary. Some people say that English is enough, but in many places, for example in small towns, people don't speak English. Besides, learning the language helps you get to know Poles and their culture. That is why, in my opinion, every month of learning is a good investment.",
              ne: "मलाई लाग्छ, पोल्यान्डमा केही वर्ष मात्र बस्ने योजना भए पनि पोलिश सिक्नु पक्कै उचित हुन्छ। पहिलो, भाषा जानेपछि दैनिक जीवन सजिलो हुन्छ: कार्यालयको काम आफैँ गराउन, डाक्टरसँग कुरा गर्न वा कामको सम्झौता बुझ्न सकिन्छ। दोस्रो, पोलिश बोल्ने व्यक्तिलाई राम्रो काम र बढी तलब पाउने सम्भावना बढी हुन्छ। कतिपयले अंग्रेजी भए पुग्छ भन्छन्, तर धेरै ठाउँमा, जस्तै साना सहरहरूमा, मानिसहरू अंग्रेजी बोल्दैनन्। साथै, भाषा सिक्दा पोलिश मानिस र उनीहरूको संस्कृति चिन्न मद्दत हुन्छ। त्यसैले मेरो विचारमा सिकाइको हरेक महिना राम्रो लगानी हो।"
            },
            checklist: [
              { en: "Did you state your opinion in the first sentence (*Uważam, że…*, *Moim zdaniem…*)?", ne: "के तपाईंले पहिलो वाक्यमै आफ्नो विचार भन्नुभयो (*Uważam, że…*, *Moim zdaniem…*)?" },
              { en: "Did you give at least two arguments with linking words (*po pierwsze*, *po drugie*, *poza tym*)?", ne: "के तपाईंले जोड्ने शब्द (*po pierwsze*, *po drugie*, *poza tym*) सहित कम्तीमा दुई तर्क दिनुभयो?" },
              { en: "Did you mention and answer a different opinion (*Niektórzy mówią, że…, ale…*)?", ne: "के तपाईंले फरक विचार उल्लेख गरेर त्यसको जवाफ दिनुभयो (*Niektórzy mówią, że…, ale…*)?" },
              { en: "Did you end with a conclusion (*Dlatego…*, *Podsumowując…*)?", ne: "के तपाईंले निष्कर्षले अन्त्य गर्नुभयो (*Dlatego…*, *Podsumowując…*)?" },
              { en: "Did you write at least 80 words and check verb endings and cases?", ne: "के तपाईंले कम्तीमा ८० शब्द लेख्नुभयो र क्रियाका अन्त्य तथा विभक्ति जाँच्नुभयो?" }
            ]
          }
        ]
      }
    ]
  }
);
