import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { useLanguage } from "@/contexts/LanguageContext";

const GeneratingScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  const steps = [
  t("gen.step1"),
  t("gen.step2"),
  t("gen.step3"),
  t("gen.step4"),
  t("gen.step5")];


  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/dashboard"), 600);
          return 100;
        }
        return p + 0.8;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [navigate]);

  const currentStep = Math.min(Math.floor(progress / 20), steps.length - 1);
  const roundedProgress = Math.round(progress);

  return (
    <MetafiScreen glowPosition="center" glowIntensity="strong">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          
          <span className="font-display text-8xl font-bold text-gradient-mint tracking-tight tabular-nums">
            {roundedProgress}%
          </span>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}>
          
          <p className="text-foreground/70 font-medium text-sm">{steps[currentStep]}</p>
        </motion.div>

        





        
      </div>
    </MetafiScreen>);

};

export default GeneratingScreen;