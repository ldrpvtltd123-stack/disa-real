import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type Dict = {
  nav_home: string;
  nav_products: string;
  nav_story: string;
  nav_contact: string;
  cta_shop: string;
  hero_eyebrow: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_sub: string;
  hero_explore: string;
  hero_story: string;
  stat_farms: string;
  stat_varieties: string;
  stat_cities: string;
};

export const translations: Record<LangCode, Dict> = {
  en: {
    nav_home: "Home", nav_products: "Products", nav_story: "Our Story", nav_contact: "Contact",
    cta_shop: "Shop now",
    hero_eyebrow: "Ancient grains, fresh delivery",
    hero_title_1: "Millet Magic",
    hero_title_2: "at Your Doorstep",
    hero_sub: "Mydisa brings you wholesome, traceable millet foods — grains, flours, snacks and breakfast bowls — sourced directly from small farms and delivered fresh to your kitchen.",
    hero_explore: "Explore the range →",
    hero_story: "Our story",
    stat_farms: "Farmer families", stat_varieties: "Millet varieties", stat_cities: "Indian cities",
  },
  hi: {
    nav_home: "होम", nav_products: "उत्पाद", nav_story: "हमारी कहानी", nav_contact: "संपर्क",
    cta_shop: "अभी खरीदें",
    hero_eyebrow: "प्राचीन अनाज, ताज़ी डिलीवरी",
    hero_title_1: "श्री अन्न का जादू",
    hero_title_2: "आपके द्वार तक",
    hero_sub: "माईडिसा आपके लिए शुद्ध, ट्रेसेबल बाजरा, ज्वार, रागी और अन्य मिलेट उत्पाद सीधे किसानों से लाकर ताज़ा डिलीवर करता है।",
    hero_explore: "उत्पाद देखें →",
    hero_story: "हमारी कहानी",
    stat_farms: "किसान परिवार", stat_varieties: "मिलेट किस्में", stat_cities: "भारतीय शहर",
  },
  ta: {
    nav_home: "முகப்பு", nav_products: "தயாரிப்புகள்", nav_story: "எங்கள் கதை", nav_contact: "தொடர்பு",
    cta_shop: "இப்போது வாங்க",
    hero_eyebrow: "பழமையான தானியங்கள், புதிய டெலிவரி",
    hero_title_1: "சிறுதானிய மாயம்",
    hero_title_2: "உங்கள் வாசலில்",
    hero_sub: "மைடிசா தினை, கம்பு, கேழ்வரகு உள்ளிட்ட சிறுதானியங்களை சிறு விவசாயிகளிடமிருந்து நேரடியாக உங்கள் சமையலறைக்கு புத்தம் புதிதாக கொண்டு வருகிறது.",
    hero_explore: "தயாரிப்புகளைப் பார்க்க →",
    hero_story: "எங்கள் கதை",
    stat_farms: "விவசாயி குடும்பங்கள்", stat_varieties: "சிறுதானிய வகைகள்", stat_cities: "இந்திய நகரங்கள்",
  },
  te: {
    nav_home: "హోమ్", nav_products: "ఉత్పత్తులు", nav_story: "మా కథ", nav_contact: "సంప్రదించండి",
    cta_shop: "ఇప్పుడే కొనండి",
    hero_eyebrow: "ప్రాచీన ధాన్యాలు, తాజా డెలివరీ",
    hero_title_1: "చిరుధాన్యాల మహత్యం",
    hero_title_2: "మీ ఇంటి వాకిట్లో",
    hero_sub: "మైడిసా చిరుధాన్యాలు, పిండి, స్నాక్స్, బ్రేక్‌ఫాస్ట్ ఉత్పత్తులను చిన్న రైతుల నుండి నేరుగా మీ వంటగదికి తాజాగా చేరుస్తుంది.",
    hero_explore: "ఉత్పత్తులు చూడండి →",
    hero_story: "మా కథ",
    stat_farms: "రైతు కుటుంబాలు", stat_varieties: "చిరుధాన్య రకాలు", stat_cities: "భారత నగరాలు",
  },
  kn: {
    nav_home: "ಮುಖಪುಟ", nav_products: "ಉತ್ಪನ್ನಗಳು", nav_story: "ನಮ್ಮ ಕಥೆ", nav_contact: "ಸಂಪರ್ಕ",
    cta_shop: "ಈಗ ಖರೀದಿಸಿ",
    hero_eyebrow: "ಪ್ರಾಚೀನ ಧಾನ್ಯಗಳು, ತಾಜಾ ವಿತರಣೆ",
    hero_title_1: "ಸಿರಿಧಾನ್ಯದ ಮಾಯೆ",
    hero_title_2: "ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ",
    hero_sub: "ಮೈಡಿಸಾ ರಾಗಿ, ನವಣೆ, ಸಜ್ಜೆ ಮುಂತಾದ ಸಿರಿಧಾನ್ಯಗಳನ್ನು ಸಣ್ಣ ರೈತರಿಂದ ನೇರವಾಗಿ ನಿಮ್ಮ ಅಡುಗೆಮನೆಗೆ ತಾಜಾ ತಲುಪಿಸುತ್ತದೆ.",
    hero_explore: "ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ →",
    hero_story: "ನಮ್ಮ ಕಥೆ",
    stat_farms: "ರೈತ ಕುಟುಂಬಗಳು", stat_varieties: "ಸಿರಿಧಾನ್ಯ ವಿಧಗಳು", stat_cities: "ಭಾರತೀಯ ನಗರಗಳು",
  },
  ml: {
    nav_home: "ഹോം", nav_products: "ഉൽപ്പന്നങ്ങൾ", nav_story: "ഞങ്ങളുടെ കഥ", nav_contact: "ബന്ധപ്പെടുക",
    cta_shop: "ഇപ്പോൾ വാങ്ങുക",
    hero_eyebrow: "പുരാതന ധാന്യങ്ങൾ, പുതിയ ഡെലിവറി",
    hero_title_1: "ചെറുധാന്യ മാന്ത്രികം",
    hero_title_2: "നിങ്ങളുടെ വാതിൽക്കൽ",
    hero_sub: "മൈഡിസ ചെറുധാന്യങ്ങൾ, പൊടി, ലഘുഭക്ഷണങ്ങൾ, പ്രഭാത ഭക്ഷണങ്ങൾ എന്നിവ ചെറുകിട കർഷകരിൽ നിന്ന് നേരിട്ട് നിങ്ങളുടെ അടുക്കളയിലേക്ക് പുതുമയോടെ എത്തിക്കുന്നു.",
    hero_explore: "ഉൽപ്പന്നങ്ങൾ കാണുക →",
    hero_story: "ഞങ്ങളുടെ കഥ",
    stat_farms: "കർഷക കുടുംബങ്ങൾ", stat_varieties: "ചെറുധാന്യ ഇനങ്ങൾ", stat_cities: "ഇന്ത്യൻ നഗരങ്ങൾ",
  },
  mr: {
    nav_home: "मुख्यपृष्ठ", nav_products: "उत्पादने", nav_story: "आमची कथा", nav_contact: "संपर्क",
    cta_shop: "आता खरेदी करा",
    hero_eyebrow: "प्राचीन धान्ये, ताजी डिलिव्हरी",
    hero_title_1: "तृणधान्यांची जादू",
    hero_title_2: "तुमच्या दारी",
    hero_sub: "मायडिसा ज्वारी, बाजरी, नाचणी आणि इतर तृणधान्ये थेट लहान शेतकऱ्यांकडून तुमच्या स्वयंपाकघरात ताज्या स्वरूपात पोहोचवते.",
    hero_explore: "उत्पादने पहा →",
    hero_story: "आमची कथा",
    stat_farms: "शेतकरी कुटुंबे", stat_varieties: "तृणधान्य प्रकार", stat_cities: "भारतीय शहरे",
  },
  bn: {
    nav_home: "হোম", nav_products: "পণ্য", nav_story: "আমাদের গল্প", nav_contact: "যোগাযোগ",
    cta_shop: "এখনই কিনুন",
    hero_eyebrow: "প্রাচীন শস্য, তাজা ডেলিভারি",
    hero_title_1: "মিলেটের জাদু",
    hero_title_2: "আপনার দরজায়",
    hero_sub: "মাইডিসা ছোট কৃষকদের থেকে সরাসরি বাজরা, রাগি ও অন্যান্য মিলেট আপনার রান্নাঘরে তাজা পৌঁছে দেয়।",
    hero_explore: "পণ্য দেখুন →",
    hero_story: "আমাদের গল্প",
    stat_farms: "কৃষক পরিবার", stat_varieties: "মিলেট জাত", stat_cities: "ভারতীয় শহর",
  },
  gu: {
    nav_home: "હોમ", nav_products: "ઉત્પાદનો", nav_story: "અમારી વાર્તા", nav_contact: "સંપર્ક",
    cta_shop: "હમણાં ખરીદો",
    hero_eyebrow: "પ્રાચીન અનાજ, તાજી ડિલિવરી",
    hero_title_1: "મિલેટનો જાદુ",
    hero_title_2: "તમારા આંગણે",
    hero_sub: "માયડિસા બાજરી, રાગી અને અન્ય મિલેટ નાના ખેડૂતો પાસેથી સીધા તમારા રસોડામાં તાજા પહોંચાડે છે.",
    hero_explore: "ઉત્પાદનો જુઓ →",
    hero_story: "અમારી વાર્તા",
    stat_farms: "ખેડૂત પરિવારો", stat_varieties: "મિલેટ જાતો", stat_cities: "ભારતીય શહેરો",
  },
  pa: {
    nav_home: "ਹੋਮ", nav_products: "ਉਤਪਾਦ", nav_story: "ਸਾਡੀ ਕਹਾਣੀ", nav_contact: "ਸੰਪਰਕ",
    cta_shop: "ਹੁਣੇ ਖਰੀਦੋ",
    hero_eyebrow: "ਪੁਰਾਣੇ ਅਨਾਜ, ਤਾਜ਼ੀ ਡਿਲੀਵਰੀ",
    hero_title_1: "ਮਿਲੇਟ ਦਾ ਜਾਦੂ",
    hero_title_2: "ਤੁਹਾਡੇ ਘਰ ਤੱਕ",
    hero_sub: "ਮਾਈਡੀਸਾ ਛੋਟੇ ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੇ ਬਾਜਰਾ, ਰਾਗੀ ਅਤੇ ਹੋਰ ਮਿਲੇਟ ਤੁਹਾਡੀ ਰਸੋਈ ਤੱਕ ਤਾਜ਼ੇ ਪਹੁੰਚਾਉਂਦਾ ਹੈ।",
    hero_explore: "ਉਤਪਾਦ ਵੇਖੋ →",
    hero_story: "ਸਾਡੀ ਕਹਾਣੀ",
    stat_farms: "ਕਿਸਾਨ ਪਰਿਵਾਰ", stat_varieties: "ਮਿਲੇਟ ਕਿਸਮਾਂ", stat_cities: "ਭਾਰਤੀ ਸ਼ਹਿਰ",
  },
};

type Ctx = { lang: LangCode; setLang: (l: LangCode) => void; t: (k: keyof Dict) => string };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("mydisa_lang") as LangCode | null) : null;
    if (stored && translations[stored]) setLangState(stored);
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("mydisa_lang", l);
  };

  const t = (k: keyof Dict) => translations[lang][k] ?? translations.en[k];

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
