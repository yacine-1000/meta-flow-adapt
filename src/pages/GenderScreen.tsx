import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

const GenderScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useLanguage();

  const options = [
    { id: "male", label: t("gender.male") },
    { id: "female", label: t("gender.female") },
  ];

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <FloatingOrbs />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8 relative z-10">
        <LanguageSwitch />
        <ProgressBar step={1} total={8} />

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl font-bold leading-tight">
            {t("gender.title1")}<br />{t("gender.title2")}
          </h1>
        </motion.div>

        <div className="flex-1 mt-10 space-y-4">
          {options.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              onClick={() => setSelected(opt.id)}
              className={`relative w-full rounded-2xl text-start transition-all duration-300 overflow-hidden ${
                selected === opt.id
                  ? "chip-selected shadow-glow-sm"
                  : "glass-card hover:border-primary/10"
              }`}
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    selected === opt.id ? "bg-primary/20" : "bg-muted/20"
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={selected === opt.id ? "text-primary" : "text-muted-foreground"}>
                      {opt.id === "male" ? (
                        <>
                          <circle cx="10" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M14.5 9.5L20 4M20 4H15.5M20 4V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </>
                      ) : (
                        <>
                          <circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M12 16V22M9 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </>
                      )}
                    </svg>
                  </div>
                  <span className="text-lg font-semibold">{opt.label}</span>
                </div>
                {selected === opt.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/height")} disabled={!selected}>
          {t("continue")}
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default GenderScreen;
