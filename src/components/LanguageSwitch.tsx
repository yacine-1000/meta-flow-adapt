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

---

**FILE 2: `src/pages/GenderScreen.tsx`**

Two find & replaces:

**Replace 1:**
- Find: `import { LanguageSwitch } from "@/components/LanguageSwitch";`
- Replace: *(leave empty — delete the line)*

**Replace 2:**
- Find: `<LanguageSwitch />`
- Replace: *(leave empty — delete it)*

---

**FILE 3: `src/pages/ProfileScreen.tsx`**

Find:
```
        {/* Language */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}>
```

Replace:
```
        {/* Language */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}>
          
          <div
            className="rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.03)"
            }}>
            <button
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className="w-full flex items-center gap-3.5 px-5 py-4 hover:bg-white/[0.03] transition-colors">
              <span className="text-sm font-medium flex-1 text-start">{t("profile.language")}</span>
              <span className="text-sm text-muted-foreground/60">{language === "ar" ? "العربية" : "English"}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground/20 flex-shrink-0 rtl:rotate-180" />
            </button>
          </div>
```

Also in the same file, add `setLanguage` to the import. Find:
```
  const { t } = useLanguage();
```
Replace:
```
  const { t, language, setLanguage } = useLanguage();