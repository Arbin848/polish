// Practical Polish Life, Legal & Work Guide for Foreigners and Nepali workers.
// Covers Urząd, Karta Pobytu, PESEL, Umowa o pracę, NFZ health care and everyday Polish slang.
(() => {
  'use strict';
  const W = window;
  W.SLOWKA_POLAND_GUIDE = [
    {
      id: 'pobyt',
      title: 'Karta Pobytu & Urząd',
      titleNe: 'आवास अनुमति र अध्यागमन (Urząd Wojewódzki)',
      desc: 'Legal residence, fingerprints, stamps, and communication with the voivodeship office.',
      descNe: 'पोल्यान्डमा कानुनी बसाइ, औंठाछाप, राहदानीको छाप र अध्यागमन कार्यालयमा चाहिने मुख्य कुरा।',
      icon: '🛂',
      items: [
        {
          pl: 'Wniosek o pobyt czasowy',
          en: 'Application for temporary residence card',
          ne: 'अस्थायी बसोबास कार्ड (TRC) को लागि निवेदन',
          pron: 'VNIO-sek o PO-bit cha-SO-vi',
          proNe: 'व्न्यो-सेक ओ पो-बित चा-सो-वि',
          tip: 'Submitted to Urząd Wojewódzki (Wydział Spraw Cudzoziemców). Keep the postal proof of sending (zwrotka) or stamped copy.',
          tipNe: 'प्रदेश कार्यालय (Urząd Wojewódzki) मा बुझाइन्छ। दर्ता नम्बर वा हुलाक रसिद सधैं सुरक्षित राख्नुहोस्।'
        },
        {
          pl: 'Złożenie odcisków palców',
          en: 'Biometric fingerprint submission',
          ne: 'बायोमेट्रिक औंठाछाप दिनु',
          pron: 'zwo-ZHE-nye od-TSIS-koof PAL-tsoof',
          proNe: 'ज्वो-झे-न्ये ओद-त्सिस्-कुफ पाल्-त्सुफ',
          tip: 'An in-person appointment at the office. You will receive an official red stamp in your passport.',
          tipNe: 'कार्यालयमा स्वयम् उपस्थित भएर दिइन्छ। त्यसपछि राहदानीमा रातो छाप लगाइन्छ।'
        },
        {
          pl: 'Pieczątka w paszporcie',
          en: 'Red stamp in passport (legal stay proof)',
          ne: 'राहदानीको रातो छाप (कानुनी बसाइको प्रमाण)',
          pron: 'pye-CHONT-ka v pasz-POR-tsye',
          proNe: 'प्ये-चोन्त-का भ पास्-पोर्-त्ये',
          tip: 'Legalizes your stay in Poland while waiting for your decision, even if your visa expired.',
          tipNe: 'भिसा सकिए पनि निर्णय नआएसम्म पोल्यान्डमा कानुनी रूपमा बस्न पाउने अधिकार दिन्छ।'
        },
        {
          pl: 'Decyzja pozytywna',
          en: 'Positive decision granted',
          ne: 'सकारात्मक निर्णय (अनुमति स्वीकृत)',
          pron: 'de-TSI-zya po-zi-TIV-na',
          proNe: 'दे-त्सि-ज्या पो-जि-तिभ्-ना',
          tip: 'Official letter from the Voivode granting your residence. Next step is paying for plastic card production (100 PLN).',
          tipNe: 'राज्यपालको कार्यालयबाट आएको औपचारिक स्वीकृति पत्र। त्यसपछि कार्ड छाप्न १०० जुओती तिर्नुपर्छ।'
        },
        {
          pl: 'Załącznik numer jeden',
          en: 'Annex No. 1 (filled out by employer)',
          ne: 'अनुसूची १ (रोजगारदाताले भर्ने कागजात)',
          pron: 'za-WONTCH-nik NU-mer YE-den',
          proNe: 'जा-वोन्च-निक नु-मेर ये-देन',
          tip: 'Crucial form where your employer declares your job title, minimum salary, work hours, and contract type.',
          tipNe: 'कम्पनीले तपाईंको पद, तलब, काम गर्ने समय र सम्झौताको विवरण प्रमाणित गर्ने मुख्य फारम।'
        },
        {
          pl: 'Dzień dobry, przyszedłem na odciski palców.',
          en: 'Good morning, I came for my fingerprint appointment.',
          ne: 'नमस्ते, म मेरो औंठाछाप दिनको लागि आएको हुँ।',
          pron: 'jeny DOB-ri, pshi-SHED-wem na od-TSIS-ki PAL-tsoof',
          proNe: 'जेन्य् दोब्-रि, प्शि-शेद-वेम ना ओद-त्सिस्-कि पाल्-त्सुफ',
          tip: 'What to say at the entrance/reception window.',
          tipNe: 'काउन्टर वा प्रवेशद्वारमा सुरक्षाकर्मीलाई भन्नुहोस्।'
        }
      ]
    },
    {
      id: 'pesel',
      title: 'PESEL, Meldunek & Bank',
      titleNe: 'PESEL नम्बर, ठेगाना दर्ता र बैंक (BLIK)',
      desc: 'National ID number, apartment registration, bank accounts, and mobile BLIK payments.',
      descNe: 'राष्ट्रिय परिचय नम्बर (PESEL), कोठा/अपार्टमेन्ट दर्ता, बैंक खाता र BLIK भुक्तानी।',
      icon: '🏛️',
      items: [
        {
          pl: 'Numer PESEL',
          en: 'PESEL identification number',
          ne: 'PESEL नम्बर (११ अङ्कको राष्ट्रिय परिचय नम्बर)',
          pron: 'NU-mer PE-sel',
          proNe: 'नु-मेर पे-सेल',
          tip: '11-digit national ID used for taxes (PIT), doctor visits, e-prescriptions, banking, and mobile phone contracts.',
          tipNe: 'कर (PIT), अस्पताल, औषधि, बैंक र सिमकार्ड लिन चाहिने सबैभन्दा महत्त्वपूर्ण ११ अङ्कको नम्बर।'
        },
        {
          pl: 'Zameldowanie (Meldunek)',
          en: 'Official address registration',
          ne: 'ठेगाना दर्ता (मेल्दुनेक)',
          pron: 'za-mel-do-VA-nye',
          proNe: 'जा-मेल-दो-भा-न्ये',
          tip: 'Done at Urząd Dzielnicy / Gminy with your rental contract. Grants PESEL automatically.',
          tipNe: 'कोठाको भाडा सम्झौतासहित स्थानीय नगरपालिकामा गरिन्छ। यसबाट PESEL तुरुन्तै पाइन्छ।'
        },
        {
          pl: 'Profil Zaufany',
          en: 'Trusted Profile (e-Government digital ID)',
          ne: 'सरकारी अनलाइन प्रोफाइल (डिजिटल हस्ताक्षर)',
          pron: 'PRO-fil zaw-FA-ni',
          proNe: 'प्रो-फिल् जाउ-फा-नि',
          tip: 'Allows you to check residence status, tax returns (Twój e-PIT), and medical history online through your Polish bank.',
          tipNe: 'बैंक खातामार्फत कर तिर्न र सरकारी काम अनलाइन गर्न मिल्ने आधिकारिक डिजिटल प्रोफाइल।'
        },
        {
          pl: 'Płacę BLIK-iem',
          en: 'I am paying with BLIK (6-digit code)',
          ne: 'म BLIK बाट भुक्तानी गर्छु',
          pron: 'PWA-tse BLI-kyem',
          proNe: 'प्वा-त्से ब्लि-क्येम',
          tip: 'Standard Polish phone payment system. Generate a 6-digit code in your bank app and confirm with PIN.',
          tipNe: 'पोल्यान्डमा कार्डबिना मोबाइल बैंकिङ एपको ६ अङ्के कोड दिएर पसल वा अनलाइनमा तुरुन्तै पैसा तिर्ने तरिका।'
        },
        {
          pl: 'Potwierdzenie przelewu',
          en: 'Bank transfer confirmation (PDF receipt)',
          ne: 'बैंक ट्रान्सफरको रसिद (प्रमाण)',
          pron: 'pot-fyer-DZE-nye pshe-LE-vu',
          proNe: 'पोत्-फ्येर-द्जे-न्ये प्शे-ले-भु',
          tip: 'Required by offices, landlords, and employers as proof that money was sent.',
          tipNe: 'कार्यालय वा घरबेटीलाई शुल्क बुझाएको प्रमाणको रूपमा देखाउनुपर्ने PDF रसिद।'
        }
      ]
    },
    {
      id: 'praca',
      title: 'Umowa, ZUS & Praca',
      titleNe: 'रोजगारी सम्झौता, अधिकार र कर (ZUS)',
      desc: 'Work contracts, minimum hourly wages, overtime pay, sick leave (L4), and safety rules.',
      descNe: 'रोजगार सम्झौता (उमोभा), प्रतिघण्टा न्यूनतम तलब, ओभरटाइम, बिरामी बिदा (L4) र कामदार अधिकार।',
      icon: '💼',
      items: [
        {
          pl: 'Umowa o pracę',
          en: 'Employment contract (Full Labor Code protections)',
          ne: 'रोजगार सम्झौता (उमोभा ओ प्रात्से - पूर्ण सुरक्षा)',
          pron: 'u-MO-va o PRA-tse',
          proNe: 'उ-मो-भा ओ प्रा-त्से',
          tip: 'Highest protection: paid holidays (20-26 days/year), paid sick leave (80%), paid overtime (+50% / +100%), required notice period.',
          tipNe: 'सबैभन्दा सुरक्षित सम्झौता: तलबसहित बिदा, बिरामी हुँदा तलब (८०%), ओभरटाइमको अतिरिक्त पैसा र निश्चित सूचना अवधि।'
        },
        {
          pl: 'Umowa zlecenie',
          en: 'Mandate contract (hourly civil contract)',
          ne: 'करार सम्झौता (उमोभा ज्लेचेन्ये - प्रतिघण्टा भुक्तानी)',
          pron: 'u-MO-va zle-TSE-nye',
          proNe: 'उ-मो-भा ज्ले-चे-न्ये',
          tip: 'Common for foreigners: paid by recorded hours. Must respect the Polish legal minimum hourly rate (stawka godzinowa).',
          tipNe: 'प्रतिघण्टाको आधारमा भुक्तानी हुने सामान्य सम्झौता। सरकारले तोकेको न्यूनतम प्रतिघण्टा दर पाउनैपर्छ।'
        },
        {
          pl: 'Nadgodziny',
          en: 'Overtime hours',
          ne: 'ओभरटाइम (थप काम गरेको समय)',
          pron: 'nad-go-DZI-ni',
          proNe: 'नाद्-गो-द्जि-नि',
          tip: 'Hours worked above standard 8h/day or 40h/week. Always keep personal notes of your hours worked.',
          tipNe: 'दैनिक ८ घण्टा वा हप्ताको ४० घण्टाभन्दा बढी गरेको काम। सधैं आफ्नो डायरीमा काम गरेको घण्टा टिप्नुहोस्।'
        },
        {
          pl: 'Zwolnienie lekarskie (L4)',
          en: 'Electronic medical sick leave (L4)',
          ne: 'बिरामी बिदा (L4 - डाक्टरले दिने बिदा)',
          pron: 'zvol-NYE-nye le-KAR-skye',
          proNe: 'ज्वोल-न्ये-न्ये ले-कार्-स्क्ये',
          tip: 'When you are ill, doctor sends this electronically to ZUS and your boss automatically. You stay home and receive 80% pay.',
          tipNe: 'बिरामी भएर डाक्टरलाई देखाएपछि डाक्टरले सीधै ZUS र रोजगारदातालाई पठाइदिन्छ। घर बसेर ८०% तलब पाइन्छ।'
        },
        {
          pl: 'Szkolenie BHP',
          en: 'Workplace health and safety training',
          ne: 'कार्यस्थल स्वास्थ्य र सुरक्षा तालिम (BHP)',
          pron: 'szko-LE-nye be-ha-PE',
          proNe: 'श्को-ले-न्ये बे-हा-पे',
          tip: 'Mandatory before starting any factory, warehouse, or construction job. Helmets, safety shoes (buty robocze), and vests required.',
          tipNe: 'काम सुरु गर्नुअघि लिनैपर्ने अनिवार्य सुरक्षा तालिम। सेफ्टी जुत्ता, हेल्मेट र ज्याकेट अनिवार्य हुन्छ।'
        },
        {
          pl: 'Kiedy będzie wypłata?',
          en: 'When will the salary payment arrive?',
          ne: 'तलब कहिले आउँछ / खातामा कहिले जम्मा हुन्छ?',
          pron: 'KYE-di BEN-je vi-PWA-ta',
          proNe: 'क्ये-दि बेन्-द्जे भि-प्वा-ता',
          tip: 'By Polish law, salaries are paid to bank accounts by the 10th of the following month at the latest.',
          tipNe: 'पोल्यान्डको कानुन अनुसार प्रायः अर्को महिनाको १० तारिखभित्र खातामा तलब आइसक्नुपर्छ।'
        }
      ]
    },
    {
      id: 'zdrowie',
      title: 'Zdrowie & NFZ',
      titleNe: 'स्वास्थ्य सेवा, अस्पताल र औषधि (NFZ)',
      desc: 'National health fund, family doctor (POZ), electronic prescriptions, and emergency numbers.',
      descNe: 'स्वास्थ्य बिमा (NFZ), पारिवारिक डाक्टर, अनलाइन औषधि पुर्जी (E-recepta) र आपतकालीन सेवा।',
      icon: '🏥',
      items: [
        {
          pl: 'Przychodnia (POZ)',
          en: 'Primary healthcare health clinic',
          ne: 'स्थानीय स्वास्थ्य चौकी / क्लिनिक',
          pron: 'pshi-CHOD-nya',
          proNe: 'प्शि-खोद्-न्या',
          tip: 'Register for free with NFZ insurance at your nearest clinic to have a dedicated family doctor (lekarz rodzinny).',
          tipNe: 'कामको बिमा (NFZ) भएपछि नजिकको क्लिनिकमा निःशुल्क नाम दर्ता गरेर डाक्टर देखाउन सकिन्छ।'
        },
        {
          pl: 'Kod e-recepty',
          en: '4-digit electronic prescription code',
          ne: '४ अङ्कको औषधि कोड (ई-रेसेप्ता)',
          pron: 'kod e-re-TSEP-ti',
          proNe: 'कोद इ-रे-त्सेप्-ति',
          tip: 'At the pharmacy (apteka), provide your 11-digit PESEL and this 4-digit code to purchase prescribed medicines.',
          tipNe: 'औषधि पसलमा गएर आफ्नो PESEL नम्बर र डाक्टरले दिएको यो ४ अङ्कको कोड भनेपछि औषधि दिन्छ।'
        },
        {
          pl: 'Szpitalny Oddział Ratunkowy (SOR)',
          en: 'Hospital emergency department (A&E / ER)',
          ne: 'अस्पतालको आकस्मिक कक्ष (इमर्जेन्सी वार्ड)',
          pron: 'szpi-TAL-ni OD-jow ra-tun-KO-vi',
          proNe: 'श्पि-ताल्-नि ओद्-द्जोउ रा-तुन्-को-भि',
          tip: 'Open 24/7 for acute accidents, heavy bleeding, or life-threatening symptoms. Triage prioritizes the most severe patients.',
          tipNe: 'गम्भीर चोटपटक, रक्तस्राव वा आपतकालीन अवस्थामा २४सै घण्टा खुला रहने अस्पतालको इमर्जेन्सी वार्ड।'
        },
        {
          pl: 'Numer alarmowy 112',
          en: 'European universal emergency phone number 112',
          ne: 'आपतकालीन फोन नम्बर ११२ (एम्बुलेन्स, प्रहरी, दमकल)',
          pron: 'NU-mer a-lar-MO-vi ye-den ye-den DVA',
          proNe: 'नु-मेर आ-लार्-मो-भि ये-देन ये-देन द्भा',
          tip: 'Call for ambulance (pogotowie), police (policja), or fire brigade (straż pożarna). Free from any mobile phone.',
          tipNe: 'कुनै पनि सिमबाट पैसा नकटी सीधै लाग्ने पोल्यान्डको साझा आपतकालीन नम्बर।'
        },
        {
          pl: 'Źle się czuję, boli mnie brzuch.',
          en: 'I feel sick, my stomach hurts.',
          ne: 'मलाई सन्चो छैन, मेरो पेट दुखिरहेको छ।',
          pron: 'zhle shye CHU-ye, BO-li mnye BZHUCH',
          proNe: 'झ्ले श्ये चु-ये, बो-लि म्न्ये ब्झुख',
          tip: 'Useful phrase when speaking to a doctor, pharmacist, or coordinator.',
          tipNe: 'डाक्टर वा कम्पनी म्यानेजरलाई स्वास्थ्य समस्या बताउने वाक्य।'
        }
      ]
    },
    {
      id: 'slang',
      title: 'Slang & Everyday Phrases',
      titleNe: 'बोलिचालीको पोलिश (स्ल्याङ र स्थानीय थेगो)',
      desc: 'Real phrases Polish friends, supervisors, and colleagues say every single day on the street and at work.',
      descNe: 'पोलिस साथीहरू र सहकर्मीहरूले दैनिक काम र कुराकानीमा प्रयोग गर्ने प्रचलित थेगो र अनौपचारिक शब्दहरू।',
      icon: '💬',
      items: [
        {
          pl: 'Spoko',
          en: 'Cool / All good / No problem / Fine',
          ne: 'ठीक छ / कुनै समस्या छैन / चिल (अति प्रचलित)',
          pron: 'SPO-ko',
          proNe: 'स्पो-को',
          tip: 'Short for "spokojnie". The most common everyday word in Poland. Used to say "no worries" or "all good".',
          tipNe: '"spokojnie" बाट बनेको। पोल्यान्डमा सबैभन्दा धेरै बोलिने अनौपचारिक शब्द; "कुनै चिन्ता छैन" वा "हुन्छ" भन्न प्रयोग हुन्छ।'
        },
        {
          pl: 'Damy radę!',
          en: 'We will manage! / We can do it! / No problem!',
          ne: 'हामी गरेर देखाउँछौं! / व्यवस्था मिलाउँछौं! / भैहाल्छ नि!',
          pron: 'DA-mi RA-de',
          proNe: 'दा-मि रा-दे',
          tip: 'Classic optimistic Polish motto used whenever a task is hard, heavy, or complicated.',
          tipNe: 'काम जतिसुकै गाह्रो वा धेरै भए पनि हौसला दिन साथीहरू र सहकर्मीहरूले भन्ने वाक्यांश।'
        },
        {
          pl: 'Masakra!',
          en: 'Disaster! / That is crazy! / What a mess!',
          ne: 'हत्तेरिका! / के हालत हो! / एकदमै गन्जागोल!',
          pron: 'ma-SA-kra',
          proNe: 'मा-सा-क्रा',
          tip: 'Used for terrible weather, heavy traffic, a super long shift, or unexpected bad news.',
          tipNe: 'खराब मौसम, धेरै ट्राफिक वा कामको अत्याधिक चाप हुँदा अचम्म वा दिक्क भएर बोलिने शब्द।'
        },
        {
          pl: 'Bez kitu',
          en: 'No joke / For real / Seriously',
          ne: 'साँच्चै नै / मजाक होइन / सिरियसली',
          pron: 'bez KI-tu',
          proNe: 'बेज् कि-तु',
          tip: 'Used when confirming surprising or unbelievable information.',
          tipNe: 'कुनै कुरा पक्का र सत्य हो भनेर जोड दिन प्रयोग गरिन्छ।'
        },
        {
          pl: 'Nie ma sprawy',
          en: 'No problem / You are very welcome',
          ne: 'केही छैन / कुनै समस्या छैन / स्वागत छ',
          pron: 'nye ma SPRA-vi',
          proNe: 'न्ये मा स्प्रा-भि',
          tip: 'Polite and friendly reply when someone says "Dziękuję" (Thank you).',
          tipNe: 'कसैले "Dziękuję" (धन्यवाद) भनेपछि भनिने मैत्रीपूर्ण जवाफ।'
        },
        {
          pl: 'Trzymaj się!',
          en: 'Take care! / Hang in there!',
          ne: 'ख्याल राख है! / सुरक्षित बस है!',
          pron: 'tszy-MAY shye',
          proNe: 'त्श्यि-माय् श्ये',
          tip: 'Warm parting phrase when saying goodbye to friends or colleagues at the end of a shift.',
          tipNe: 'काम सकिएर छुट्टी हुने बेला साथीहरूलाई बिदाइ गर्दा भनिने आत्मीय शब्द।'
        },
        {
          pl: 'O co chodzi?',
          en: 'What is this about? / What is going on?',
          ne: 'के भएको हो? / के विषयमा कुरा हो?',
          pron: 'o tso HO-ji',
          proNe: 'ओ त्सो खो-द्जि',
          tip: 'Natural way to ask what the problem or situation is.',
          tipNe: 'कार्यस्थलमा केही समस्या वा कुरा बुझ्न नसक्दा सोध्ने स्वाभाविक प्रश्न।'
        }
      ]
    },
    {
      id: 'contracts',
      title: 'Contract & Payslip Decrypter',
      titleNe: 'तलब र सम्झौता व्याख्या (Brutto vs Netto, Pasek płacowy)',
      desc: 'Understand what your Polish payslip means, how taxes and ZUS health contributions work, and gross vs net salary.',
      descNe: 'पोल्यान्डमा तलबको रसिद (पासेक), ग्रस र नेट (हात पर्ने रकम), र कर कट्टी बुझ्ने तरिका।',
      icon: '🧾',
      items: [
        {
          pl: 'Wynagrodzenie brutto',
          en: 'Gross salary (amount before tax and ZUS deductions)',
          ne: 'ग्रस तलब (कर र बिमा नकाटी तोकिएको कूल रकम)',
          pron: 'vi-na-grod-ZE-nye BROOT-to',
          proNe: 'भि-ना-ग्रोद्-जे-न्ये ˈब्रुत्-तो',
          tip: 'The number written in your employment contract. It is NOT what lands in your bank account.',
          tipNe: 'सम्झौता पत्रमा लेखिएको रकम। यो खातामा आउने रकम होइन, यसबाट कर र बिमा काटिन्छ।'
        },
        {
          pl: 'Wynagrodzenie netto ("na rękę")',
          en: 'Net take-home salary ("in hand")',
          ne: 'हात पर्ने खुद तलब (नेट / "ना रेन्के")',
          pron: 'vi-na-grod-ZE-nye NET-to (na REN-ke)',
          proNe: 'भि-ना-ग्रोद्-जे-न्ये ˈनेत्-तो (ना ˈरेङ्-के)',
          tip: 'Actual money transferred to your Polish bank account. Usually ~70-78% of gross on standard Umowa.',
          tipNe: 'सबै कर र ZUS कट्टी गरेर तपाईंको बैंक खातामा आउने वास्तविक पैसा।'
        },
        {
          pl: 'Pasek wynagrodzenia / płacowy',
          en: 'Monthly payslip summary sheet',
          ne: 'मासिक तलबको विस्तृत रसिद (पासेक)',
          pron: 'PA-sek vi-na-grod-ZE-nya',
          proNe: 'ˈपा-सेक भि-ना-ग्रोद्-जे-न्या',
          tip: 'Your employer must provide this every month. It lists exact hours worked, overtime, and insurance deductions.',
          tipNe: 'कम्पनीले हरेक महिना दिने रसिद जसमा कति घण्टा काम भयो, ओभरटाइम र करको हिसाब हुन्छ।'
        },
        {
          pl: 'Składka na ubezpieczenie zdrowotne (ZUS)',
          en: 'Mandatory health insurance contribution (9%)',
          ne: 'अनिवार्य स्वास्थ्य बिमा कट्टी (NFZ क्लिनिकका लागि)',
          pron: 'SKWAD-ka na u-bez-pye-TCHE-nye zdro-VOT-ne',
          proNe: 'ˈस्क्वाद-का ना उ-बेज्-प्ये-ˈचे-न्ये स्रो-ˈभोत्-ने',
          tip: 'Funds your free public hospital (SOR) and clinic (POZ) visits anywhere in Poland.',
          tipNe: 'यो कट्टी भएपछि पोल्यान्डभरि सरकारी अस्पताल र क्लिनिकमा निःशुल्क उपचार पाइन्छ।'
        },
        {
          pl: 'Zaliczka na podatek dochodowy (PIT)',
          en: 'Advance personal income tax (PIT deduction)',
          ne: 'आयकर कट्टी (PIT कर)',
          pron: 'za-LEETCH-ka na po-DA-tek do-ho-DO-vi',
          proNe: 'ज़ा-ˈलीच-का ना पो-ˈदा-तेक दो-खो-ˈदो-भि',
          tip: 'Income tax deducted each month. In April each year, you file PIT-37 and often get a refund.',
          tipNe: 'मासिक काटिने आयकर। हरेक वर्ष अप्रिलमा PIT-37 भरेर धेरैजसो रकम फिर्ता पाउन सकिन्छ।'
        },
        {
          pl: 'Gdzie jest mój pasek wypłaty?',
          en: 'Where is my payslip? (Ask HR / accounting)',
          ne: 'मेरो तलबको रसिद (पासेक) कहाँ छ?',
          pron: 'GDZYE yest mooy PA-sek vi-PWA-ti',
          proNe: 'ग्द्ज्ये येस्त मूय ˈपा-सेक भि-ˈप्वा-ति',
          tip: 'Polite sentence to ask the HR coordinator or accountant if you have not received your slip.',
          tipNe: 'तलब रसिद नपाउँदा कम्पनीको कोअर्डिनेटर वा अकाउन्टलाई सोध्ने वाक्य।'
        }
      ]
    },
    {
      id: 'transport',
      title: 'City Transport & Bus Guide',
      titleNe: 'सार्वजनिक यातायात (बस, ट्राम, कासोनिक र जक्दोजादे)',
      desc: 'How to use buses, trams, metros, ticket stamp machines (kasownik), and mobile apps like Jakdojade in Poland.',
      descNe: 'पोल्यान्डका सहरहरू (वार्सा, क्राकोभ, भ्रोत्स्वाफ) मा बस, ट्राम, टिकट प्रमाणीकरण र मोबाइल एप।',
      icon: '🚌',
      items: [
        {
          pl: 'Bilet czasowy (20 / 75 minut)',
          en: 'Time-limited transit ticket (valid for 20 or 75 minutes)',
          ne: 'समय अवधिको टिकट (२० वा ७५ मिनेटको टिकट)',
          pron: 'BEE-let cha-SO-vi',
          proNe: 'ˈबी-लेत चा-ˈसो-भि',
          tip: 'Allows unlimited transfers between buses and trams within the time window after validation.',
          tipNe: 'कासोनिकमा पन्च गरेपछि तोकिएको समयभित्र जति वटा पनि बस वा ट्राम फेर्न मिल्छ।'
        },
        {
          pl: 'Kasownik / Skasować bilet',
          en: 'Ticket validator machine / To validate the ticket',
          ne: 'टिकट प्रमाणीकरण मेसिन (कासोनिक) / टिकट पन्च गर्नु',
          pron: 'ka-SOV-nik / ska-SO-vatsh BEE-let',
          proNe: 'का-ˈसोभ्-निक / स्का-ˈसो-भाच ˈबी-लेत',
          tip: 'CRITICAL: You MUST insert/tap your paper ticket into the yellow kasownik IMMEDIATELY upon entering the vehicle, or face a ~300 PLN fine (kara).',
          tipNe: 'अति महत्त्वपूर्ण: बस वा ट्राम चढ्नेबित्तिकै पहेंलो कासोनिक मेसिनमा टिकट छिराएर छाप लगाउनैपर्छ, नत्र ३०० जुओती जरिवाना हुन्छ।'
        },
        {
          pl: 'Kontrola biletów! Proszę bilety do kontroli.',
          en: 'Ticket inspection! Tickets for inspection, please.',
          ne: 'टिकट जाँच! कृपया आफ्नो टिकट देखाउनुहोस्।',
          pron: 'kon-TRO-la bee-LE-toof',
          proNe: 'कोन्-ˈत्रो-ला बी-ˈले-तुफ',
          tip: 'Plain-clothes inspectors will block validators and show badges. Show your validated ticket or QR code from Jakdojade.',
          tipNe: 'सादा पोसाकका टिकट चेकरहरू आएपछि आफ्नो छाप लागेको टिकट वा मोबाइलको QR कोड देखाउनुहोस्।'
        },
        {
          pl: 'Aplikacja Jakdojade',
          en: 'Jakdojade navigation and ticket app',
          ne: 'जक्दोजादे एप (बस/ट्राम खोज्ने र अनलाइन टिकट काट्ने)',
          pron: 'ap-lee-KAT-sya yak-do-YA-deh',
          proNe: 'आप्-ली-ˈकात्-स्या याक-दो-ˈया-दे',
          tip: 'The #1 essential travel app in Poland. Tells you exact platform, transfer route, and lets you buy tickets with BLIK.',
          tipNe: 'पोल्यान्डको मुख्य एप जसले कुन बस कति मिनेटमा आउँछ देखाउँछ र BLIK बाट सीधै टिकट किन्न दिन्छ।'
        },
        {
          pl: 'Bilet miesięczny',
          en: 'Monthly transit travel pass',
          ne: 'मासिक बस पास (सस्तो र ढुक्क)',
          pron: 'BEE-let mye-SHYENTCH-ni',
          proNe: 'ˈबी-लेत म्ये-ˈश्येन्च-नि',
          tip: 'Saves 50%+ if you commute daily to your warehouse or factory. Encoded onto a plastic city card.',
          tipNe: 'दैनिक काममा आउजाउ गर्नेहरूका लागि मासिक पास लिनु निकै सस्तो पर्छ।'
        },
        {
          pl: 'Przystanek na żądanie',
          en: 'Request stop (press STOP button on bus to alight)',
          ne: 'अनुरोध स्टप (बस रोक्न STOP बटन थिच्नुपर्ने)',
          pron: 'pshi-STA-nek na zhon-DA-nye',
          proNe: 'प्शि-ˈस्ता-नेक ना झोन्-ˈदा-न्ये',
          tip: 'The bus will not stop unless you press the red STOP button or stand visibly at the shelter.',
          tipNe: 'यो लेखिएको स्टपमा झर्नुअघि बसभित्रको रातो STOP बटन नथिचेमा बस रोकिँदैन।'
        }
      ]
    }
  ];
})();
