// Real-life Polish Simulation Dialogues: Żabka, Paczkomat, Clinic, PKP, Bank, Urząd, Warehouse
window.SLOWKA_SIMULATORS = [
  {
    "id": "sim-zabka",
    "title": "Żabka & Biedronka Express",
    "titleNe": "झाब्का र बिएद्रोन्का पसल सिमुलेटर",
    "badge": "Most Common",
    "icon": "🏪",
    "context": "Everyday quick shopping at Żabka / Biedronka. The cashier talks fast and asks standard questions about bags, apps, and cards.",
    "contextNe": "पोल्यान्डको सबैभन्दा लोकप्रिय पसल झाब्कामा किनमेल गर्दा क्यासियरले सोध्ने प्रश्नहरू र जवाफ।",
    "steps": [
      {
        "speaker": "Kasjer (Cashier)",
        "avatar": "🧑‍💼",
        "pl": "Dzień dobry! Czy ma Pan / Pani aplikację Żappka?",
        "en": "Good day! Do you have the Żappka app?",
        "ne": "नमस्ते! के तपाईंसँग झाप्का एप छ?",
        "audioText": "Dzień dobry! Czy ma Pan aplikację Żappka?",
        "options": [
          {
            "pl": "Nie, nie mam. Dziękuję.",
            "en": "No, I don't have it. Thank you.",
            "ne": "छैन, मसँग छैन। धन्यवाद।",
            "correct": true,
            "tip": "Perfect! Short, natural and polite."
          },
          {
            "pl": "Tak, już skanuję kod.",
            "en": "Yes, I am scanning the barcode now.",
            "ne": "हजुर, म कोड स्क्यान गर्दैछु।",
            "correct": true,
            "tip": "Great if you collect Żappsy points for discounts!"
          },
          {
            "pl": "Co to jest Żappka? Nie wiem.",
            "en": "What is Żappka? I don't know.",
            "ne": "झाप्का भनेको के हो? थाहा छैन।",
            "correct": false,
            "tip": "Poles just say 'Nie, dziękuję' (No, thank you)."
          }
        ]
      },
      {
        "speaker": "Kasjer (Cashier)",
        "avatar": "🧑‍💼",
        "pl": "Dodać reklamówkę / torbę?",
        "en": "Would you like a plastic shopping bag?",
        "ne": "प्लास्टिकको झोला थपिदिऊँ?",
        "audioText": "Dodać reklamówkę?",
        "options": [
          {
            "pl": "Nie, dziękuję, mam swoją.",
            "en": "No thanks, I have my own bag.",
            "ne": "पर्दैन धन्यवाद, मसँग आफ्नै छ।",
            "correct": true,
            "tip": "Saves 1 złoty and is environmentally friendly!"
          },
          {
            "pl": "Tak, poproszę jedną małą reklamówkę.",
            "en": "Yes, one small bag please.",
            "ne": "हजुर, एउटा सानो झोला दिनुहोस्।",
            "correct": true,
            "tip": "Native phrasing: 'poproszę reklamówkę'."
          },
          {
            "pl": "Tak, chcę torba.",
            "en": "(Incorrect grammar)",
            "ne": "(गलत व्याकरण)",
            "correct": false,
            "tip": "Remember accusative: 'Poproszę torbę' (with -ę)."
          }
        ]
      },
      {
        "speaker": "Kasjer (Cashier)",
        "avatar": "🧑‍💼",
        "pl": "Płatność kartą czy gotówką?",
        "en": "Payment by card or cash?",
        "ne": "कार्डबाट तिर्नुहुन्छ कि नगद?",
        "audioText": "Płatność kartą czy gotówką?",
        "options": [
          {
            "pl": "Kartą, zbliżeniowo.",
            "en": "By card, contactless.",
            "ne": "कार्डबाट, कन्ट्याक्टलेस।",
            "correct": true,
            "tip": "Very standard. You just tap your phone or card."
          },
          {
            "pl": "BLIK-iem, proszę.",
            "en": "With BLIK code, please.",
            "ne": "ब्लिक कोडबाट, कृपया।",
            "correct": true,
            "tip": "BLIK is the ubiquitous 6-digit Polish mobile banking payment system."
          },
          {
            "pl": "Gotówką, oto dwadzieścia złotych.",
            "en": "Cash, here is twenty złoty.",
            "ne": "नगद, लिनुहोस् बीस ज्वोती।",
            "correct": true,
            "tip": "Clear and exact."
          }
        ]
      },
      {
        "speaker": "Kasjer (Cashier)",
        "avatar": "🧑‍💼",
        "pl": "Potwierdzenie albo paragon potrzebny?",
        "en": "Do you need the receipt / card confirmation slip?",
        "ne": "रसिद चाहिन्छ कि पर्दैन?",
        "audioText": "Potwierdzenie albo paragon potrzebny?",
        "options": [
          {
            "pl": "Nie trzeba, dziękuję! Miłego dnia!",
            "en": "No need, thank you! Have a nice day!",
            "ne": "पर्दैन, धन्यवाद! राम्रो दिन बितोस्!",
            "correct": true,
            "tip": "The quintessential friendly Polish farewell."
          },
          {
            "pl": "Tak, poproszę paragon.",
            "en": "Yes, receipt please.",
            "ne": "हजुर, रसिद दिनुहोस्।",
            "correct": true,
            "tip": "Useful if you want to check items or prices."
          }
        ]
      }
    ]
  },
  {
    "id": "sim-paczkomat",
    "title": "InPost Paczkomat Pickup",
    "titleNe": "इन्पोस्ट पाच्कोमाट पार्सल संकलन",
    "badge": "Essential Poland",
    "icon": "📦",
    "context": "Receiving parcels from Allegro or Amazon in Poland using automated yellow/grey parcel lockers (Paczkomat).",
    "contextNe": "पोल्यान्डमा अनलाइन अर्डर पाच्कोमाटबाट निकाल्ने तरिका र संवाद।",
    "steps": [
      {
        "speaker": "Ekran Paczkomatu (Locker Screen)",
        "avatar": "🤖",
        "pl": "Wybierz opcję: Odbierz paczkę czy Nadaj paczkę?",
        "en": "Select option: Pick up parcel or Send parcel?",
        "ne": "विकल्प छान्नुहोस्: पार्सल निकाल्ने कि पठाउने?",
        "audioText": "Wybierz opcję: Odbierz paczkę czy Nadaj paczkę?",
        "options": [
          {
            "pl": "Chcę odebrać paczkę (Wpisz numer telefonu i kod odbioru).",
            "en": "I want to pick up a parcel (Enter phone number & pickup code).",
            "ne": "म पार्सल निकाल्न चाहन्छु (फोन नम्बर र कोड हाल्ने)।",
            "correct": true,
            "tip": "You enter your 9-digit Polish number + 6-digit SMS code."
          },
          {
            "pl": "Otwieram skrytkę zdalnie w aplikacji InPost.",
            "en": "I am opening the locker remotely in the InPost mobile app.",
            "ne": "म इन्पोस्ट एपबाट सिधै बाकस खोल्दैछु।",
            "correct": true,
            "tip": "App pickup (otwórz skrytkę zdalnie) skips typing entirely!"
          }
        ]
      },
      {
        "speaker": "Ekran Paczkomatu (Locker Screen)",
        "avatar": "🤖",
        "pl": "Skrytka numer 42 została otwarta! Wyjmij paczkę i zamknij drzwiczki.",
        "en": "Locker number 42 has been opened! Remove package and close door firmly.",
        "ne": "बाकस नम्बर ४२ खुल्यो! पार्सल झिक्नुहोस् र ढोका राम्ररी लगाउनुहोस्।",
        "audioText": "Skrytka numer 42 została otwarta! Wyjmij paczkę i zamknij drzwiczki.",
        "options": [
          {
            "pl": "Wyjąłem paczkę i zatrzasnąłem drzwiczki.",
            "en": "I took out the package and shut the locker door.",
            "ne": "मैले पार्सल झिकेँ र ढोका बन्द गरिदिएँ।",
            "correct": true,
            "tip": "Always push until you hear the magnetic lock click."
          },
          {
            "pl": "Przepraszam, skrytka jest pusta! Zgłaszam problem.",
            "en": "Excuse me, the locker is empty! Reporting a problem on screen.",
            "ne": "माफ गर्नुहोस्, बाकस खाली छ! समस्या रिपोर्ट गर्दैछु।",
            "correct": true,
            "tip": "If empty, immediately press 'Zgłoś problem' on screen."
          }
        ]
      }
    ]
  },
  {
    "id": "sim-clinic",
    "title": "Clinic & Doctor Appointment (NFZ)",
    "titleNe": "क्लिनिक र डाक्टरको अपोइन्टमेन्ट",
    "badge": "Health Care",
    "icon": "🩺",
    "context": "Booking an appointment with your family doctor (POZ) or speaking to the receptionist (Rejestracja).",
    "contextNe": "स्वास्थ्य केन्द्रमा गएर डाक्टरलाई भेट्ने समय लिने र कुरा गर्ने अभ्यास।",
    "steps": [
      {
        "speaker": "Rejestratorka (Receptionist)",
        "avatar": "👩‍⚕️",
        "pl": "Dzień dobry, w czym mogę pomóc?",
        "en": "Good day, how can I help you?",
        "ne": "नमस्ते, म के मद्दत गर्न सक्छु?",
        "audioText": "Dzień dobry, w czym mogę pomóc?",
        "options": [
          {
            "pl": "Dzień dobry. Chciałbym / Chciałabym zapisać się do lekarza rodzinnego.",
            "en": "Hello. I would like to make an appointment with the family doctor.",
            "ne": "नमस्ते। म पारिवारिक डाक्टरसँग अपोइन्टमेन्ट लिन चाहन्छु।",
            "correct": true,
            "tip": "Polite and exact phrase used in every Polish clinic."
          },
          {
            "pl": "Daj mi lekarza teraz.",
            "en": "(Rude imperative)",
            "ne": "(अशिष्ट भाषा)",
            "correct": false,
            "tip": "Always say 'Chciałbym się zapisać...' (I would like to book...)."
          }
        ]
      },
      {
        "speaker": "Rejestratorka (Receptionist)",
        "avatar": "👩‍⚕️",
        "pl": "Proszę podać numer PESEL i dokument tożsamości.",
        "en": "Please provide your PESEL number and ID document.",
        "ne": "कृपया आफ्नो PESEL नम्बर र परिचयपत्र दिनुहोस्।",
        "audioText": "Proszę podać numer PESEL i dokument tożsamości.",
        "options": [
          {
            "pl": "Oto mój paszport i numer PESEL: dziewięć, cztery...",
            "en": "Here is my passport and PESEL number: nine, four...",
            "ne": "यो मेरो राहदानी र PESEL नम्बर हो।",
            "correct": true,
            "tip": "Having your PESEL ready makes verification instant in the NFZ system (eWUŚ)."
          },
          {
            "pl": "Nie mam PESEL, ale mam europejskie ubezpieczenie.",
            "en": "I don't have PESEL, but I have health insurance.",
            "ne": "मसँग PESEL छैन, तर मसँग बीमा छ।",
            "correct": true,
            "tip": "The clinic can register you by passport number and ZUS insurance."
          }
        ]
      },
      {
        "speaker": "Lekarz (Doctor)",
        "avatar": "👨‍⚕️",
        "pl": "Co Panu / Pani dolega? Jakie ma Pan / Pani objawy?",
        "en": "What is troubling you? What symptoms do you have?",
        "ne": "तपाईंलाई के भइरहेको छ? कस्ता लक्षणहरू छन्?",
        "audioText": "Co Panu dolega? Jakie ma Pan objawy?",
        "options": [
          {
            "pl": "Mam gorączkę, silny kaszel i boli mnie gardło od dwóch dni.",
            "en": "I have a fever, bad cough, and a sore throat for two days.",
            "ne": "मलाई दुई दिनदेखि ज्वरो, कडा खोकी र घाँटी दुखाइ छ।",
            "correct": true,
            "tip": "Clear description of common illness."
          },
          {
            "pl": "Potrzebuję zwolnienia lekarskiego L4 dla pracodawcy.",
            "en": "I also need an L4 sick note for my employer.",
            "ne": "मलाई रोजगारदाताका लागि L4 बिरामी बिदा कागजात पनि चाहिन्छ।",
            "correct": true,
            "tip": "Polish doctors send electronic L4 (e-ZLA) directly to your employer via ZUS!"
          }
        ]
      }
    ]
  },
  {
    "id": "sim-pkp",
    "title": "Train Station (PKP Intercity / Polregio)",
    "titleNe": "रेल स्टेसनमा टिकट किन्ने अभ्यास",
    "badge": "Transit & Travel",
    "icon": "🚆",
    "context": "Buying a train ticket at the ticket window (Kasa Biletowa) for travel across Poland.",
    "contextNe": "पोल्यान्डमा एक शहरबाट अर्को शहर रेलमा जाँदा काउन्टरमा टिकट माग्ने तरिका।",
    "steps": [
      {
        "speaker": "Kasjerka PKP (Ticket Clerk)",
        "avatar": "👩‍💼",
        "pl": "Dzień dobry. Dokąd bilet?",
        "en": "Good day. Where to?",
        "ne": "नमस्ते। कहाँ जाने टिकट?",
        "audioText": "Dzień dobry. Dokąd bilet?",
        "options": [
          {
            "pl": "Dzień dobry. Poproszę jeden bilet normalny do Krakowa na najbliższy pociąg.",
            "en": "Good day. One standard adult ticket to Kraków for the nearest train, please.",
            "ne": "नमस्ते। क्राकुभ जाने सबैभन्दा छिटो रेलको लागि एउटा साधारण टिकट दिनुहोस्।",
            "correct": true,
            "tip": "Natural and clear phrasing: bilet normalny (standard) vs ulgowy (student discount)."
          },
          {
            "pl": "Chcę jechać pociąg Kraków.",
            "en": "(Broken grammar)",
            "ne": "(अशुद्ध व्याकरण)",
            "correct": false,
            "tip": "Always use the accusative or prepositional: 'do Krakowa' (to Kraków)."
          }
        ]
      },
      {
        "speaker": "Kasjerka PKP (Ticket Clerk)",
        "avatar": "👩‍💼",
        "pl": "Jest pociąg IC o czternastej trzydzieści. Druga klasa, miejsce przy oknie czy przy korytarzu?",
        "en": "There is an IC train at 14:30. Second class, window or aisle seat?",
        "ne": "दिउँसो २:३० मा इन्टरसिटी रेल छ। दोस्रो दर्जा, झ्याल छेउ कि गल्ली छेउको सिट?",
        "audioText": "Jest pociąg IC o czternastej trzydzieści. Druga klasa, miejsce przy oknie czy przy korytarzu?",
        "options": [
          {
            "pl": "Poproszę przy oknie, druga klasa.",
            "en": "By the window please, second class.",
            "ne": "झ्याल छेउ दिनुहोस्, दोस्रो दर्जा।",
            "correct": true,
            "tip": "'Przy oknie' = window, 'przy korytarzu' = aisle."
          },
          {
            "pl": "Obojętne, może być przy korytarzu.",
            "en": "Doesn't matter, aisle is fine.",
            "ne": "जुन भए पनि हुन्छ, गल्ली छेउ भए पनि हुन्छ।",
            "correct": true,
            "tip": "'Obojętne' means 'no preference / either way is fine'."
          }
        ]
      },
      {
        "speaker": "Kasjerka PKP (Ticket Clerk)",
        "avatar": "👩‍💼",
        "pl": "Razem siedemdziesiąt dwa złote. Płatność kartą czy gotówką?",
        "en": "Total is seventy-two złoty. Card or cash?",
        "ne": "जम्मा बहत्तर ज्वोती भयो। कार्ड कि नगद?",
        "audioText": "Razem siedemdziesiąt dwa złote. Płatność kartą czy gotówką?",
        "options": [
          {
            "pl": "Kartą, zbliżeniowo. Z którego peronu odjeżdża pociąg?",
            "en": "Card, contactless. Which platform does the train leave from?",
            "ne": "कार्डबाट। रेल कुन प्लेटफर्म (पेरोन) बाट छुट्छ?",
            "correct": true,
            "tip": "Crucial question: 'Z którego peronu?' (Which platform?)."
          },
          {
            "pl": "Gotówką, oto sto złotych.",
            "en": "Cash, here is 100 złoty.",
            "ne": "नगद, लिनुहोस् १०० ज्वोती।",
            "correct": true,
            "tip": "The clerk will return twenty-eight złoty change."
          }
        ]
      }
    ]
  },
  {
    "id": "sim-bank",
    "title": "Bank & Account Opening",
    "titleNe": "बैंक खाता खोल्ने र कार्ड लिने",
    "badge": "Finances",
    "icon": "🏦",
    "context": "Visiting a Polish bank (PKO, Santander, Millennium, mBank) to open an account for salary deposits.",
    "contextNe": "तलब पाउन पोल्यान्डको बैंकमा खाता खोल्ने र कुराकानी गर्ने अभ्यास।",
    "steps": [
      {
        "speaker": "Doradca bankowy (Bank Advisor)",
        "avatar": "👨‍💼",
        "pl": "Dzień dobry, w czym mogę pomóc?",
        "en": "Good day, how can I help you today?",
        "ne": "नमस्ते, म के मद्दत गर्न सक्छु?",
        "audioText": "Dzień dobry, w czym mogę pomóc?",
        "options": [
          {
            "pl": "Dzień dobry. Chciałbym otworzyć konto osobiste do wypłaty z pracy.",
            "en": "Hello. I would like to open a personal checking account for salary deposits from work.",
            "ne": "नमस्ते। म कामको तलब आउने व्यक्तिगत बैंक खाता खोल्न चाहन्छु।",
            "correct": true,
            "tip": "'Konto osobiste' is a standard personal checking account in Poland."
          },
          {
            "pl": "Potrzebuję pieniądze.",
            "en": "(Vague)",
            "ne": "(अस्पष्ट)",
            "correct": false,
            "tip": "State clearly: 'Chciałbym otworzyć konto osobiste' (I would like to open a checking account)."
          }
        ]
      },
      {
        "speaker": "Doradca bankowy (Bank Advisor)",
        "avatar": "👨‍💼",
        "pl": "Jasne. Poproszę paszport, polski numer telefonu oraz numer PESEL, jeśli Pan posiada.",
        "en": "Sure. May I have your passport, Polish phone number, and PESEL if you have one?",
        "ne": "हुन्छ। कृपया राहदानी, पोलिश फोन नम्बर र PESEL छ भने दिनुहोस्।",
        "audioText": "Jasne. Poproszę paszport, polski numer telefonu oraz numer PESEL.",
        "options": [
          {
            "pl": "Oto mój paszport i zaświadczenie o nadaniu numeru PESEL.",
            "en": "Here is my passport and certificate of my PESEL number.",
            "ne": "यो मेरो राहदानी र PESEL नम्बरको प्रमाणपत्र हो।",
            "correct": true,
            "tip": "Having a PESEL makes Polish banking much faster and unlocks full mobile app features."
          },
          {
            "pl": "Mam tylko paszport i umowę o pracę. Czy to wystarczy?",
            "en": "I only have my passport and work contract. Is that sufficient?",
            "ne": "मसँग राहदानी र कामको सम्झौता मात्र छ। के यतिले पुग्छ?",
            "correct": true,
            "tip": "Most Polish banks can still open an account with just a passport and Polish SIM card."
          }
        ]
      },
      {
        "speaker": "Doradca bankowy (Bank Advisor)",
        "avatar": "👨‍💼",
        "pl": "Czy aktywować płatności mobilne BLIK i kartę zbliżeniową?",
        "en": "Shall I activate BLIK mobile payments and a contactless debit card?",
        "ne": "के म BLIK मोबाइल भुक्तानी र कन्ट्याक्टलेस कार्ड सक्रिय गरिदिऊँ?",
        "audioText": "Czy aktywować płatności mobilne BLIK i kartę zbliżeniową?",
        "options": [
          {
            "pl": "Tak, poproszę BLIK i kartę. BLIK jest mi bardzo potrzebny.",
            "en": "Yes please, BLIK and the card. BLIK is very useful for me.",
            "ne": "हजुर, BLIK र कार्ड दुवै चाहिन्छ। BLIK मलाई धेरै काम लाग्छ।",
            "correct": true,
            "tip": "BLIK is essential in Poland for online shopping, Paczkomat, and sending money between friends."
          },
          {
            "pl": "Nie, dziękuję. Wystarczy mi tylko karta do bankomatu.",
            "en": "No, thank you. Only the ATM card is enough for me.",
            "ne": "पर्दैन, धन्यवाद। मलाई एटीएम कार्ड भए पुग्छ।",
            "correct": true,
            "tip": "Valid alternative choice: some users prefer to avoid mobile banking apps initially."
          }
        ]
      }
    ]
  },
  {
    "id": "sim-urzad",
    "title": "Voivodeship Office (Karta Pobytu)",
    "titleNe": "उझादमा कार्ड र भिसा सोधपुछ",
    "badge": "Legal & Residence",
    "icon": "🏛️",
    "context": "At Urząd Wojewódzki (Immigration Department) inquiring about your temporary residence permit (Karta Pobytu) or submitting missing documents.",
    "contextNe": "पोल्यान्डको अध्यागमन कार्यालय (उझाद) मा कार्डको स्थिति बुझ्ने र कागजात बुझाउने अभ्यास।",
    "steps": [
      {
        "speaker": "Urzędnik (Immigration Officer)",
        "avatar": "👨‍💼",
        "pl": "Dzień dobry. Jaka sprawa?",
        "en": "Good day. What case are you here for?",
        "ne": "नमस्ते। कुन कामको लागि आउनुभयो?",
        "audioText": "Dzień dobry. Jaka sprawa?",
        "options": [
          {
            "pl": "Dzień dobry. Chciałbym sprawdzić status mojego wniosku o kartę pobytu.",
            "en": "Good day. I would like to check the status of my temporary residence card application.",
            "ne": "नमस्ते। म मेरो अस्थायी बसोबास अनुमति पत्र (कार्ता पोबितु) को स्थिति बुझ्न चाहन्छु।",
            "correct": true,
            "tip": "Formal and accurate: 'status wniosku o kartę pobytu'."
          },
          {
            "pl": "Przyszedłem uzupełnić braki formalne do mojego wniosku.",
            "en": "I came to submit missing required documents for my case.",
            "ne": "म मेरो फाइलमा नपुगेका कागजात बुझाउन आएको हुँ।",
            "correct": true,
            "tip": "'Uzupełnić braki formalne' is the exact official legal term used in letters from the voivode."
          }
        ]
      },
      {
        "speaker": "Urzędnik (Immigration Officer)",
        "avatar": "👨‍💼",
        "pl": "Proszę podać numer sprawy i okazać paszport.",
        "en": "Please provide the case reference number and present your passport.",
        "ne": "कृपया मुद्दा/फाइल नम्बर दिनुहोस् र राहदानी देखाउनुहोस्।",
        "audioText": "Proszę podać numer sprawy i okazać paszport.",
        "options": [
          {
            "pl": "Oto mój paszport oraz pismo z urzędu z numerem sprawy.",
            "en": "Here is my passport and the official letter showing the case number.",
            "ne": "यो मेरो राहदानी र फाइल नम्बर भएको कार्यालयको चिठी हो।",
            "correct": true,
            "tip": "Always bring the official stamped letter (wezwanie)."
          },
          {
            "pl": "Zapomniałem pisma, ale mam numer sprawy zapisany w telefonie.",
            "en": "I forgot the official letter, but I have the case number saved on my phone.",
            "ne": "मैले चिठी बिर्सिएँ, तर फोनमा फाइल नम्बर टिपेको छु।",
            "correct": true,
            "tip": "The officer can still look up your case in the national MOS database by case number or PESEL."
          }
        ]
      },
      {
        "speaker": "Urzędnik (Immigration Officer)",
        "avatar": "👨‍💼",
        "pl": "Decyzja jest już wydana, jest pozytywna! Proszę uiścić opłatę za wydanie karty.",
        "en": "The decision is issued, it is positive! Please pay the fee for issuing the plastic card.",
        "ne": "निर्णय भइसक्यो, सकारात्मक (पास) छ! कृपया प्लास्टिक कार्ड छाप्ने दस्तुर तिर्नुहोस्।",
        "audioText": "Decyzja jest już wydana, jest pozytywna!",
        "options": [
          {
            "pl": "Wspaniale! Dziękuję bardzo! Gdzie mogę dokonać opłaty?",
            "en": "Wonderful! Thank you very much! Where can I make the payment?",
            "ne": "धेरै राम्रो! धेरै धेरै धन्यवाद! दस्तुर कहाँ तिर्न सक्छु?",
            "correct": true,
            "tip": "The fee for plastic card issuance is typically 100 PLN paid at the cashier (kasa) or by transfer."
          },
          {
            "pl": "Świetnie! Czy opłatę sto złotych mogę uiścić przelewem na konto urzędu?",
            "en": "Great! Can I pay the 100 PLN fee via bank transfer to the office account?",
            "ne": "धेरै राम्रो! के म १०० ज्वोती दस्तुर कार्यालयको बैंक खातामा ट्रान्सफर गर्न सक्छु?",
            "correct": true,
            "tip": "Yes, voivodeship offices always accept bank transfers with title: 'Opłata za wydanie karty pobytu [Imię i Nazwisko]'."
          }
        ]
      }
    ]
  },
  {
    "id": "sim-warehouse",
    "title": "Warehouse & Shift Handover (Magazyn)",
    "titleNe": "गोदाममा सिफ्ट हस्तान्तरण र काम",
    "badge": "Logistics Work",
    "icon": "🏗️",
    "context": "Working in a distribution warehouse or fulfillment center. Communicating with your supervisor (brygadzista) and shift colleague.",
    "contextNe": "गोदाममा काम गर्दा सुपरभाइजर र साथीसँग गरिने दैनिक कुराकानी।",
    "steps": [
      {
        "speaker": "Brygadzista (Shift Leader)",
        "avatar": "👷‍♂️",
        "pl": "Cześć! Dzisiaj jesteś na kompletacji zamówień w sektorze B. Masz skaner?",
        "en": "Hi! Today you are on order picking in sector B. Do you have a scanner gun?",
        "ne": "नमस्ते! आज तिमी सेक्टर B मा सामान प्याकिङ/छान्ने काममा छौ। स्क्यानर छ?",
        "audioText": "Dzisiaj jesteś na kompletacji zamówień w sektorze B. Masz skaner?",
        "options": [
          {
            "pl": "Tak, mam zalogowany skaner i wózek. Od której alejki zaczynamy?",
            "en": "Yes, I have my scanner logged in and my trolley. Which aisle do we start in?",
            "ne": "हजुर, म स्क्यानरमा लगइन छु र ट्रली तयार छ। कुन गल्लीबाट सुरु गर्ने?",
            "correct": true,
            "tip": "Natural warehouse vocabulary: kompletacja (picking), alejka (aisle)."
          },
          {
            "pl": "Nie mam skanera, bateria jest rozładowana. Gdzie są zapasowe?",
            "en": "I don't have a scanner, the battery is dead. Where are the spares?",
            "ne": "मसँग स्क्यानर छैन, ब्याट्री सकियो। अतिरिक्त ब्याट्री कहाँ छ?",
            "correct": true,
            "tip": "Common daily issue: 'Bateria jest rozładowana' (Battery is dead)."
          }
        ]
      },
      {
        "speaker": "Brygadzista (Shift Leader)",
        "avatar": "👷‍♂️",
        "pl": "Pamiętaj o zasadach BHP: palety nie mogą blokować przejścia ewakuacyjnego!",
        "en": "Remember safety rules: pallets must not block the emergency exit walkway!",
        "ne": "सुरक्षा नियम सम्झनुहोस्: प्यालेटले आपतकालीन निकास बाटो छेक्नु हुँदैन!",
        "audioText": "Pamiętaj o zasadach BHP: palety nie mogą blokować przejścia ewakuacyjnego!",
        "options": [
          {
            "pl": "Oczywiście, rozumiem. Zawsze dbam o bezpieczeństwo i noszę buty robocze.",
            "en": "Of course, understood. I always pay attention to safety and wear safety boots.",
            "ne": "पक्कै, मैले बुझेँ। म सधैं सुरक्षामा ध्यान दिन्छु र सेफ्टी जुत्ता लगाउँछु।",
            "correct": true,
            "tip": "BHP (Bezpieczeństwo i Higiena Pracy) is taken very seriously in Polish industry."
          },
          {
            "pl": "Jasne! Od razu przestawię tę paletę paleciakiem na wyznaczone miejsce.",
            "en": "Sure! I will immediately move this pallet with a pallet jack to the designated spot.",
            "ne": "पक्कै! म तुरुन्तै यो प्यालेटलाई हाते ज्याकले तोकिएको ठाउँमा सार्छु।",
            "correct": true,
            "tip": "'Paleciak' (manual pallet truck) is the most frequently used warehouse word in Poland!"
          }
        ]
      }
    ]
  }
];
