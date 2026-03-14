import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex items-center rounded-full border border-white/[0.08] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
        }}>
        <button
          onClick={() => setLanguage("en")}
          className={`relative px-4 py-1.5 text-xs font-medium transition-colors ${
            language === "en" ? "text-foreground" : "text-muted-foreground/50"
          }`}>
          {language === "en" && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-primary/15 border border-primary/20"
              transition={{ type: "spring", duration: 0.4 }} />
          )}
          <span className="relative z-10">EN</span>
        </button>
        <button
          onClick={() => setLanguage("ar")}
          className={`relative px-4 py-1.5 text-xs font-medium transition-colors ${
            language === "ar" ? "text-foreground" : "text-muted-foreground/50"
          }`}>
          {language === "ar" && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-primary/15 border border-primary/20"
              transition={{ type: "spring", duration: 0.4 }} />
          )}
          <span className="relative z-10">عربي</span>
        </button>
      </div>
    </div>
  );
};
```

**File 2: `src/pages/GenderScreen.tsx`** — Two find & replaces:

Find:
```
import { LanguageSwitch } from "@/components/LanguageSwitch";
```
Replace with nothing (delete the line).

Find:
```
        <LanguageSwitch />
        <ProgressBar step={1} total={8} />
```
Replace:
```
        <ProgressBar step={1} total={8} />