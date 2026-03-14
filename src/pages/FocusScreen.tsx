import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";

const FocusScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const { selectedSports } = useUser();

  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = { lifting: 8 };
    selectedSports.forEach((s) => { initial[s] = 5; });
    return initial;
  });

  const focusAreas = [
    { id: "lifting", label: t("focus.weight_lifting") },
    ...selectedSports.map((s) => ({ id: s, label: t(`sport.${s}`) })),
  ];

  const update = (id: string, val: number) => setValues((v) => ({ ...v, [id]: val }));

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/sports" />

        <motion.div className="mt-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold leading-tight">{t("focus.title")}</h1>
        </motion.div>

        <div className="flex-1 mt-10 space-y-5">
          {focusAreas.map((area, i) => (
              <motion.div
                key={area.id}
                className="glass-card-strong rounded-2xl p-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-semibold">{area.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-primary font-display font-bold text-xl">{values[area.id]}</span>
                    <span className="text-muted-foreground/40 text-xs">/10</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={values[area.id]}
                  onChange={(e) => update(area.id, Number(e.target.value))}
                  className="w-full h-[6px] rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #95FFC3 0%, #6DEBFF ${values[area.id] * 10}%, rgba(255,255,255,0.06) ${values[area.id] * 10}%, rgba(255,255,255,0.06) 100%)`,
                  }}
                />
                <div className="flex justify-between mt-3 text-[10px] text-muted-foreground/40">
                  <span>{t("focus.not_priority")}</span>
                  <span>{t("focus.top_priority")}</span>
                </div>
              </motion.div>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/activities")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default FocusScreen;
