import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<string, Record<Language, string>> = {
  "step_x_of_y": { en: "Step {x} of {y}", ar: "الخطوة {x} من {y}" },
  "whats_your_gender": { en: "What's your", ar: "ما هو" },
  "gender": { en: "gender?", ar: "جنسك؟" },
  "male": { en: "Male", ar: "ذكر" },
  "female": { en: "Female", ar: "أنثى" },
  "continue": { en: "Continue", ar: "متابعة" },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: false,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => translations[key]?.[language] || key;
  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
