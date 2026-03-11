import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex rounded-full bg-muted/20 border border-border/20 p-0.5 backdrop-blur-sm">
        <button
          onClick={() => setLanguage("ar")}
          className="relative px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300"
        >
          {language === "ar" && (
            <motion.div
              layoutId="lang-switch"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${language === "ar" ? "text-primary-foreground" : "text-muted-foreground"}`}>
            العربية
          </span>
        </button>
        <button
          onClick={() => setLanguage("en")}
          className="relative px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300"
        >
          {language === "en" && (
            <motion.div
              layoutId="lang-switch"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${language === "en" ? "text-primary-foreground" : "text-muted-foreground"}`}>
            English
          </span>
        </button>
      </div>
    </div>
  );
};
