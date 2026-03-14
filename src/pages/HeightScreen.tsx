import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { UnitSwitch } from "@/components/UnitSwitch";
import { useLanguage } from "@/contexts/LanguageContext";

const HeightScreen = () => {
  const navigate = useNavigate();
  const [heightCm, setHeightCm] = useState(175);
  const [unit, setUnit] = useState<string>("cm");
  const { t, isRTL } = useLanguage();

  const cmToFtIn = (cm: number) => {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { ft, inches };
  };

  const displayValue = unit === "cm" ? heightCm : (() => { const { ft, inches } = cmToFtIn(heightCm); return `${ft}'${inches}"`; })();
  const displayUnit = unit === "cm" ? t("height.cm") : t("height.ft");

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <FloatingOrbs />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8 relative z-10">
        <ProgressBar step={2} total={8} />

        <div className="mt-4">
          <BackButton to="/gender" />
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold leading-tight">{t("height.title1")}<br />{t("height.title2")}</h1>
        </motion.div>

        <motion.div
          className="flex flex-col items-center mt-8 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <UnitSwitch
            options={[
              { label: t("height.cm"), value: "cm" },
              { label: t("height.inch"), value: "inch" },
            ]}
            selected={unit}
            onChange={setUnit}
          />
        </motion.div>

        <motion.div
          className="flex items-baseline justify-center gap-2 mt-6 mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <span className="font-display text-7xl font-bold text-gradient-mint tracking-tight">{displayValue}</span>
          {unit === "cm" && <span className="text-muted-foreground text-lg font-medium">{displayUnit}</span>}
        </motion.div>

        <motion.div
          className="glass-card-strong rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="range"
            min={140}
            max={210}
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full h-[6px] rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #95FFC3 0%, #6DEBFF ${((heightCm - 140) / 70) * 100}%, rgba(255,255,255,0.06) ${((heightCm - 140) / 70) * 100}%, rgba(255,255,255,0.06) 100%)`,
            }}
          />
          <div className="flex justify-between mt-4 text-[10px] text-muted-foreground/60">
            <span>{unit === "cm" ? "140" : "4'7\""}</span>
            <span>{unit === "cm" ? "175" : "5'9\""}</span>
            <span>{unit === "cm" ? "210" : "6'11\""}</span>
          </div>
        </motion.div>

        <div className="flex-1" />

        <MetafiButton onClick={() => navigate("/weight")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default HeightScreen;
