import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Gauge } from "lucide-react";

const injuries = [
  { id: "hip", labelKey: "injury.hip" },
  { id: "quad", labelKey: "injury.quad" },
  { id: "upper_back", labelKey: "injury.upper_back" },
];

const SeverityScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [values, setValues] = useState<Record<string, number>>({
    hip: 3, quad: 2, upper_back: 4,
  });

  const update = (id: string, val: number) => setValues((v) => ({ ...v, [id]: val }));

  const getSeverityColor = (val: number) => {
    if (val <= 2) return "hsl(var(--primary))";
    if (val <= 5) return "#FFD66B";
    if (val <= 7) return "#FFB36B";
    return "#FF6B6B";
  };

  const getSeverityLabel = (val: number) => {
    if (val <= 2) return t("severity.mild");
    if (val <= 5) return t("severity.moderate");
    if (val <= 7) return t("severity.noticeable");
    return t("severity.severe");
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/injuries" />

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold">{t("severity.title")}</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 ms-[52px]">{t("severity.hint")}</p>
        </motion.div>

        <div className="flex-1 mt-10 space-y-5">
          {injuries.map((injury, i) => (
            <motion.div
              key={injury.id}
              className="glass-card-strong rounded-2xl p-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-semibold">{t(injury.labelKey)}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground/50">{getSeverityLabel(values[injury.id])}</span>
                  <span className="font-display font-bold text-lg" style={{ color: getSeverityColor(values[injury.id]) }}>
                    {values[injury.id]}
                  </span>
                  <span className="text-muted-foreground/30 text-xs">/10</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={values[injury.id]}
                onChange={(e) => update(injury.id, Number(e.target.value))}
                className="w-full h-[6px] rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${getSeverityColor(values[injury.id])} 0%, ${getSeverityColor(values[injury.id])} ${values[injury.id] * 10}%, rgba(255,255,255,0.06) ${values[injury.id] * 10}%, rgba(255,255,255,0.06) 100%)`,
                }}
              />
              <div className="flex justify-between mt-3 text-[10px] text-muted-foreground/30">
                <span>{t("severity.no_pain")}</span>
                <span>{t("severity.severe")}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/training-level")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default SeverityScreen;
