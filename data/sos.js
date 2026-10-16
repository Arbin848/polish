// Słówka Emergency "Show to Local" cards dataset.
// High-visibility, critical emergency & daily assistance cards for immediate use in Poland.
window.SLOWKA_SOS = [
  {
    id: "medical",
    category: "Medical & Ambulance",
    categoryNe: "चिकित्सा र एम्बुलेन्स",
    icon: "🚑",
    number: "112 / 999",
    items: [
      {
        id: "sos-ambulance",
        pl: "Proszę wezwać karetkę pogotowia! Bardzo źle się czuję.",
        en: "Please call an ambulance! I feel very unwell.",
        ne: "कृपया एम्बुलेन्स बोलाइदिनुहोस्! मलाई धेरै अप्ठ्यारो भइरहेको छ।",
        pron: "PRO-sheh VEZ-vach ka-RET-keh po-go-TO-vya! BAR-dzo ZHLEH shyeh CHOO-yeh.",
        proNe: "ˈप्रो-शे भेज्-ˈभाच् का-ˈरेत्-के पो-गो-ˈतो-भ्या! ˈबार्-द्जो झ्ले श्ये ˈचु-ये।",
        urgency: "critical",
        tip: "Show this immediately to any passerby, shopkeeper, or bus driver."
      },
      {
        id: "sos-chest-pain",
        pl: "Mam ostry ból w klatce piersiowej i duszności. Pomocy!",
        en: "I have sharp chest pain and trouble breathing. Help!",
        ne: "मेरो छातीमा तीव्र दुखाइ छ र सास फेर्न गाह्रो भइरहेको छ। मद्दत गर्नुहोस्!",
        pron: "Mam OS-tri BOOL v KLAT-tseh pyer-SHYO-vey ee doosh-NOH-shchee. po-MO-tsi!",
        proNe: "माम् ˈओस्-त्रि बुल् भ् ˈक्लात्-चे प्येर्-ˈश्यो-भेइ ई दूश्-ˈनो-श्ची। पो-ˈमो-त्सि!",
        urgency: "critical",
        tip: "Sit down immediately and show this screen."
      },
      {
        id: "sos-pharmacy",
        pl: "Gdzie jest najbliższa apteka całodobowa (dyżurna)?",
        en: "Where is the nearest 24/7 duty pharmacy?",
        ne: "सबैभन्दा नजिकको २४ घण्टा खुल्ने फार्मेसी कहाँ छ?",
        pron: "GJEH yest nay-BLEE-zhsha ap-TE-ka tsa-wo-do-BO-va (di-ZHOOR-na)?",
        proNe: "ग्जे येस्त् नाइ-ˈब्ली-झ्शा आप्-ˈते-का चा-वो-दो-ˈबो-भा?",
        urgency: "medium",
        tip: "Night pharmacies in Poland are marked 'Apteka Całodobowa' or 'Dyżurna'."
      },
      {
        id: "sos-allergies",
        pl: "Mam silną alergię / cukrzycę. Potrzebuję pilnie pomocy medycznej.",
        en: "I have a severe allergy / diabetes. I need urgent medical help.",
        ne: "मलाई कडा एलर्जी / मधुमेह छ। मलाई तुरुन्त चिकित्सा सहायता चाहिन्छ।",
        pron: "Mam SHEEL-non a-LER-gyen / tsoo-KSHI-tseh. Po-tshe-BOO-yeh PEEL-nyeh po-MO-tsi med-ICH-ney.",
        proNe: "माम् ˈशील्-नों आ-ˈलेर्-ग्यें / चू-ˈक्शि-चे। पो-त्शे-ˈबु-ये ˈपील्-न्ये पो-ˈमो-त्सि मेद्-ˈइच्-नेइ।",
        urgency: "high"
      }
    ]
  },
  {
    id: "police",
    category: "Police, Theft & Lost Items",
    categoryNe: "प्रहरी, चोरी र हराएका सामान",
    icon: "👮",
    number: "112 / 997",
    items: [
      {
        id: "sos-police-help",
        pl: "Proszę wezwać policję! Zostałem okradziony / Zostałam okradziona.",
        en: "Please call the police! I have been robbed.",
        ne: "कृपया प्रहरी बोलाइदिनुहोस्! मेरो सामान चोरी भयो।",
        pron: "PRO-sheh VEZ-vach po-LEETS-yeh! Zos-TA-wem / Zos-TA-wam ok-ra-JOH-ni.",
        proNe: "ˈप्रो-शे भेज्-ˈभाच् पो-ˈलीच्-ये! जोस्-ˈता-वेम् ओक्-रा-ˈजो-नि।",
        urgency: "critical"
      },
      {
        id: "sos-lost-docs",
        pl: "Zgubiłem dokumenty (paszport, kartę pobytu). Gdzie jest komisariat policji?",
        en: "I lost my documents (passport, residence card). Where is the police station?",
        ne: "मेरो कागजात (राहदानी, कार्ड) हरायो। प्रहरी चौकी कहाँ छ?",
        pron: "Zgoo-BEE-wem do-koo-MEN-ti (PASZ-port, KAR-ten po-BI-too). GJEH yest ko-mee-SAR-yat po-LEET-syee?",
        proNe: "ज्गु-ˈबी-वेम् दो-कु-ˈमेन्-ति (ˈपाश्-पोर्त्, ˈकार्-तें पो-ˈबि-तू)। ग्जे येस्त् को-मी-ˈसार्-यात्?",
        urgency: "high",
        tip: "A police report is required for obtaining replacement residence permits or passports."
      },
      {
        id: "sos-lost-phone",
        pl: "Czy mogę zadzwonić z Pani / Pana telefonu? Zgubiłem swój telefon.",
        en: "Could I make a quick call from your phone? I lost mine.",
        ne: "के म तपाईंको फोनबाट कल गर्न सक्छु? मेरो फोन हरायो।",
        pron: "Chi MO-geh zadz-VO-neech z PA-nee / PA-na te-le-FO-noo? Zgoo-BEE-wem svooy te-LE-fon.",
        proNe: "चि ˈमो-गे जाद्ज्-ˈभो-नीच् पा-नी / ˈपा-ना ते-ले-ˈफो-नू? ज्गु-ˈबी-वेम् स्भुइ ते-ˈले-फोन्।",
        urgency: "medium"
      }
    ]
  },
  {
    id: "transit",
    category: "Lost & Navigation",
    categoryNe: "बाटो भुल्दा र यातायात",
    icon: "🧭",
    items: [
      {
        id: "sos-lost-city",
        pl: "Zgubiłem się. Nie mówię dobrze po polsku. Czy może mi Pan / Pani pokazać drogę na mapie?",
        en: "I am lost. I don't speak Polish well. Could you show me the way on the map?",
        ne: "म हराएँ। म राम्रोसँग पोलिश बोल्दिनँ। के तपाईं नक्सामा बाटो देखाइदिन सक्नुहुन्छ?",
        pron: "Zgoo-BEE-wem shyeh. Nyeh MOO-vyeh DOB-zheh po POL-skoo. Chi MO-zheh mee Pan / PA-nee po-KA-zach DRO-geh na MA-pyeh?",
        proNe: "ज्गु-ˈबी-वेम् श्ये। न्ये ˈमु-भ्ये ˈदोब्-झे पो ˈपोल्-स्कू। चि ˈमो-झे मी पान् / ˈपा-नी पो-ˈका-जाच् ˈद्रो-गे?",
        urgency: "medium"
      },
      {
        id: "sos-station",
        pl: "Jak dojść na Dworzec Główny (PKP / PKS)?",
        en: "How do I get to the Central Train / Bus Station?",
        ne: "मुख्य रेल / बस स्टेसन कसरी जाने?",
        pron: "Yak DOYSHCH na DVO-zhets GWOOV-ni (peh-ka-PEH / peh-ka-ES)?",
        proNe: "याक् ˈदोइश्च् ना ˈद्भो-झेच् ˈग्लूभ्-नि?",
        urgency: "medium"
      },
      {
        id: "sos-ticket-inspector",
        pl: "Mam ważny bilet w aplikacji / skasowany bilet. Oto mój bilet.",
        en: "I have a valid ticket in the mobile app / validated ticket. Here is my ticket.",
        ne: "मसँग एपमा मान्य टिकट / पन्च गरिएको टिकट छ। यो मेरो टिकट हो।",
        pron: "Mam VAZH-ni BEE-let v ap-lee-KAT-syee / ska-so-VA-ni BEE-let. O-to mooy BEE-let.",
        proNe: "माम् ˈभाझ्-नि ˈबी-लेत् भ् आप्-ली-ˈकात्-स्यी। ˈओ-तो मुइ ˈबी-लेत्।",
        urgency: "medium",
        tip: "Show this immediately if ticket controllers (kanarzy) approach you on trams or buses."
      }
    ]
  },
  {
    id: "work",
    category: "Workplace & Urgent Boss Notice",
    categoryNe: "कामको ठाउँ र आपतकालीन सूचना",
    icon: "🏭",
    items: [
      {
        id: "sos-work-machine",
        pl: "UWAGA! Maszyna uległa awarii. Zatrzymałem linię przyciskiem awaryjnym.",
        en: "WARNING! The machine broke down. I stopped the line using the emergency stop button.",
        ne: "सावधान! मेसिन बिग्रियो। मैले आपतकालीन बटन थिचेर लाइन रोकेको छु।",
        pron: "oo-VA-ga! ma-SHI-na oo-LEG-wa a-VA-ryee. zat-shi-MA-wem LEEN-yen pshi-CHEES-kyem a-va-RIY-neem.",
        proNe: "उ-ˈभा-गा! मा-ˈशि-ना उ-ˈलेग्-भा आ-ˈभा-र्यी। तात्-शि-ˈमा-वेम् ˈलीन-यें प्शि-ˈचीस्-क्येम्।",
        urgency: "high"
      },
      {
        id: "sos-work-sick",
        pl: "Jestem chory / chora. Idę do lekarza i dostarczę zwolnienie lekarskie L4.",
        en: "I am sick. I am going to the doctor and will provide an official L4 medical sick note.",
        ne: "म बिरामी छु। म डाक्टरकहाँ जाँदैछु र L4 बिरामी बिदा कागजात उपलब्ध गराउनेछु।",
        pron: "YES-tem HO-ri / HO-ra. EE-deh do le-KA-zha ee dos-TAR-cheh zvol-NYE-nyeh le-KAR-skyeh el-cztery.",
        proNe: "ˈयेस्-तेम् ˈहो-रि। ˈई-दे दो ले-ˈका-झा ई दोस्-ˈतार्-चेह् झ्भोल्-ˈन्ये-न्ये ले-ˈकार्-स्क्ये।",
        urgency: "medium",
        tip: "Send this message to your manager / agency coordinator as soon as possible before your shift."
      },
      {
        id: "sos-accident",
        pl: "Wypadek przy pracy! Potrzebna jest apteczka i pierwsza pomoc!",
        en: "Workplace accident! We need the first-aid kit and first aid!",
        ne: "कामको बेला दुर्घटना भयो! प्राथमिक उपचार बाकस र मद्दत चाहिन्छ!",
        pron: "vi-PA-dek pshi PRA-tsi! pot-SHEB-na yest ap-TECH-ka ee PYER-vsha PO-mots!",
        proNe: "भि-ˈपा-देक् प्शि ˈप्रा-त्सि! पोत्-ˈशेब्-ना येस्त् आप्-ˈतेच्-का ई ˈप्येर्-भ्शा ˈपो-मोच्!",
        urgency: "critical"
      }
    ]
  },
  {
    id: "office",
    category: "Immigration & Urząd (Office)",
    categoryNe: "अध्यागमन र सरकारी कार्यालय (कागजात)",
    icon: "📄",
    items: [
      {
        id: "sos-residence-card",
        pl: "Dzień dobry, przyszedłem odebrać kartę pobytu / decyzję.",
        en: "Good morning, I came to collect my residence card (karta pobytu) / decision.",
        ne: "नमस्ते, म मेरो कार्ड (karta pobytu) / निर्णय लिन आएको हुँ।",
        pron: "DZYEN DOB-ri, pshi-SHE-dwem od-E-brach KAR-teh po-BI-too.",
        proNe: "ज्येन् ˈदोब्-रि, प्शि-ˈशे-द्वेम् ओद्-ˈए-ब्राच् ˈकार्-तेह् पो-ˈबि-तू।",
        urgency: "medium",
        tip: "Show this at the reception desk in Urząd Wojewódzki."
      },
      {
        id: "sos-pesel-number",
        pl: "Chciałbym złożyć wniosek o nadanie numeru PESEL.",
        en: "I would like to apply for a PESEL identification number.",
        ne: "म PESEL नम्बरको लागि आवेदन दिन चाहन्छु।",
        pron: "KHYA-wem ZWO-zhich VNYO-sek o na-DA-nyeh noo-ME-roo PE-sel.",
        proNe: "ˈख्या-वेम् ˈझ्वो-झिच् ˈभ्ण्यो-सेक् ओ ना-ˈदा-न्ये नु-ˈमे-रु ˈपे-सेल्।",
        urgency: "medium",
        tip: "Show this at the City Hall (Urząd Miasta / Dzielnicy)."
      },
      {
        id: "sos-polish-contract",
        pl: "Proszę o kopię mojej umowy o pracę i zaświadczenie o zarobkach.",
        en: "Please provide a copy of my employment contract and earnings certificate.",
        ne: "कृपया मेरो कामको सम्झौता र तलब प्रमाणपत्रको प्रतिलिपि दिनुहोस्।",
        pron: "PRO-sheh o KO-pyen MO-yey oo-MO-vi o PRA-tseh.",
        proNe: "ˈप्रो-शे ओ ˈको-प्यें ˈमो-येइ उ-ˈमो-भी ओ ˈप्रा-चे।",
        urgency: "medium"
      }
    ]
  },
  {
    id: "store",
    category: "Store, Grocery & Payment",
    categoryNe: "पसल र भुक्तानी",
    icon: "🛒",
    items: [
      {
        id: "sos-card-payment",
        pl: "Czy mogę zapłacić kartą zbliżeniowo / BLIK-iem?",
        en: "Can I pay contactless by card or BLIK?",
        ne: "के म कार्ड वा BLIK बाट भुक्तानी गर्न सक्छु?",
        pron: "Chi MO-geh za-PWA-cheech KAR-ton zblee-zhe-NYO-vo / BLEE-kyem?",
        proNe: "चि ˈमो-गेह् जा-ˈप्वा-चीच् ˈकार्-तों? ˈब्लीक्-येम्?",
        urgency: "low",
        tip: "In Poland BLIK is widely accepted everywhere."
      },
      {
        id: "sos-no-pork",
        pl: "Czy ta potrawa / wędlina zawiera wieprzowinę? Nie jem wieprzowiny.",
        en: "Does this food/meat contain pork? I do not eat pork.",
        ne: "के यसमा सुँगुरको मासु छ? म सुँगुरको मासु खाँदिन।",
        pron: "Chi ta po-TRA-va za-VYE-ra vye-psho-VEE-neh? Nye yem vye-psho-VEE-ni.",
        proNe: "चि ता पो-ˈत्रा-भा जा-ˈव्ये-रा व्ये-प्शो-ˈभी-ने? न्ये येम् व्ये-प्शो-ˈभी-नि।",
        urgency: "medium",
        tip: "Show this at bakeries, restaurants or deli counters."
      }
    ]
  }
];
