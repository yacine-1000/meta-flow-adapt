import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dumbbell, Activity, Footprints } from "lucide-react";

const FocusScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [values, setValues] = useState<Record<string, number>>({
    lifting: 8, tennis: 5, running: 3,
  });

  const focusAreas = [
    { id: "lifting", label: t("focus.weight_lifting"), icon: Dumbbell },
    { id: "tennis", label: t("sport.tennis"), icon: Activity },
    { id: "running", label: t("sport.running"), icon: Footprints },
  ];

  const update = (id: string, val: number) => setValues((v) => ({ ...v, [id]: val }));

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/sports" />

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold leading-tight">{t("focus.title1")}<br />{t("focus.title2")}</h1>
          <p className="text-muted-foreground text-sm mt-3">{t("focus.hint")}</p>
        </motion.div>

        <div className="flex-1 mt-10 space-y-5">
          {focusAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.id}
                className="glass-card-strong rounded-2xl p-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold">{area.label}</span>
                  </div>
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
            );
          })}
        </div>

        <MetafiButton onClick={() => navigate("/activities")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default FocusScreen;
