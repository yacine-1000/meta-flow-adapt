import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex rounded-full bg-muted/30 border border-border/30 p-1 backdrop-blur-sm">
        <button
          onClick={() => setLanguage("en")}
          className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
            language === "en"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("ar")}
          className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
            language === "ar"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          العربية
        </button>
      </div>
    </div>
  );
};
