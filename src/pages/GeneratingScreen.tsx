import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { useLanguage } from "@/contexts/LanguageContext";
import metafiIcon from "@/assets/metafi-icon.png";

const GeneratingScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    t("gen.step1"),
    t("gen.step2"),
    t("gen.step3"),
    t("gen.step4"),
    t("gen.step5"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/dashboard"), 800);
          return 100;
        }
        return p + 0.8;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 20), steps.length - 1);
    setCurrentStep(idx);
  }, [progress, steps.length]);

  const roundedProgress = Math.round(progress);

  return (
    <MetafiScreen glowPosition="center" glowIntensity="strong">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.08) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.05) 0%, transparent 70%)" }}
            animate={{ scale: [1.1, 1.3, 1.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <svg className="w-full h-full -rotate-90 absolute" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
            <motion.circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="url(#mintGradGen)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 * (1 - progress / 100)}
              transition={{ duration: 0.1 }}
            />
            <defs>
              <linearGradient id="mintGradGen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#95FFC3" />
                <stop offset="100%" stopColor="#6DEBFF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col items-center justify-center z-10">
            <motion.img
              src={metafiIcon}
              alt="Metafi"
              className="w-12 h-12 mb-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <span className="font-display text-3xl font-bold text-gradient-mint">{roundedProgress}%</span>
          </div>
        </div>

        <motion.div className="mt-12 text-center" key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-foreground font-medium text-sm">{steps[currentStep]}</p>
        </motion.div>

        <div className="flex gap-2 mt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? "w-6 bg-primary/60" : "w-1.5 bg-muted/20"
              }`}
            />
          ))}
        </div>

        <motion.p
          className="text-muted-foreground/30 text-[10px] mt-10 tracking-widest uppercase"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {t("gen.personalizing")}
        </motion.p>
      </div>
    </MetafiScreen>
  );
};

export default GeneratingScreen;
