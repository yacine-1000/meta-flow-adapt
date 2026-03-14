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

const WeightScreen = () => {
  const navigate = useNavigate();
  const [weightKg, setWeightKg] = useState(75);
  const [unit, setUnit] = useState<string>("kg");
  const { t, isRTL } = useLanguage();

  const kgToLbs = (kg: number) => Math.round(kg * 2.205);
  const displayValue = unit === "kg" ? weightKg : kgToLbs(weightKg);
  const displayUnit = unit === "kg" ? t("weight.kg") : t("weight.lbs");

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <FloatingOrbs />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8 relative z-10">
        <ProgressBar step={3} total={8} />

        <div className="mt-4">
          <BackButton to="/height" />
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold leading-tight">{t("weight.title1")}<br />{t("weight.title2")}</h1>
        </motion.div>

        <motion.div
          className="flex flex-col items-center mt-8 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <UnitSwitch
            options={[
              { label: t("weight.kg"), value: "kg" },
              { label: t("weight.lbs"), value: "lbs" },
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
          <span className="text-muted-foreground text-lg font-medium">{displayUnit}</span>
        </motion.div>

        <motion.div
          className="glass-card-strong rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="range"
            min={40}
            max={160}
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full h-[6px] rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #95FFC3 0%, #6DEBFF ${((weightKg - 40) / 120) * 100}%, rgba(255,255,255,0.06) ${((weightKg - 40) / 120) * 100}%, rgba(255,255,255,0.06) 100%)`,
            }}
          />
          <div className="flex justify-between mt-4 text-[10px] text-muted-foreground/60">
            <span>{unit === "kg" ? "40" : "88"} {displayUnit}</span>
            <span>{unit === "kg" ? "100" : "220"} {displayUnit}</span>
            <span>{unit === "kg" ? "160" : "353"} {displayUnit}</span>
          </div>
        </motion.div>

        <div className="flex-1" />

        <MetafiButton onClick={() => navigate("/birthdate")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default WeightScreen;
