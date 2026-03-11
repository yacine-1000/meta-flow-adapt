import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Sprout, TrendingUp, Zap } from "lucide-react";

const TrainingLevelScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useLanguage();

  const levels = [
    { id: "beginner", label: t("level.beginner"), desc: t("level.beginner_desc"), icon: Sprout },
    { id: "intermediate", label: t("level.intermediate"), desc: t("level.intermediate_desc"), icon: TrendingUp },
    { id: "advanced", label: t("level.advanced"), desc: t("level.advanced_desc"), icon: Zap },
  ];

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to={-1} />

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold leading-tight">{t("level.title1")}<br />{t("level.title2")}</h1>
          <p className="text-muted-foreground text-sm mt-3">{t("level.hint")}</p>
        </motion.div>

        <div className="flex-1 mt-10 space-y-4">
          {levels.map((level, i) => {
            const Icon = level.icon;
            const isSelected = selected === level.id;
            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(level.id)}
                className={`w-full p-5 rounded-2xl text-start transition-all duration-300 ${
                  isSelected ? "chip-selected shadow-glow-sm" : "glass-card hover:border-primary/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isSelected ? "bg-primary/20" : "bg-muted/15"
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold block">{level.label}</span>
                    <span className="text-xs text-muted-foreground/60 mt-1 block">{level.desc}</span>
                  </div>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <MetafiButton onClick={() => navigate("/goal")} disabled={!selected}>
          {t("continue")}
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default TrainingLevelScreen;
