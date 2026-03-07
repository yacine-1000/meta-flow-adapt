import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { Scale } from "lucide-react";

const WeightScreen = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(75);

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={3} total={6} />

        <div className="mt-6">
          <BackButton to="/height" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary/80 text-xs font-medium tracking-widest uppercase mb-3">Step 3 of 6</p>
            <h1 className="font-display text-3xl font-bold leading-tight">What's your<br />weight?</h1>
          </motion.div>

          {/* Hero value */}
          <motion.div
            className="flex items-baseline justify-center gap-3 mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-7xl font-bold text-gradient-mint tracking-tight">{weight}</span>
            <span className="text-muted-foreground text-lg font-medium">kg</span>
          </motion.div>

          {/* Premium slider */}
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
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-[6px] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #95FFC3 0%, #6DEBFF ${((weight - 40) / 120) * 100}%, rgba(255,255,255,0.06) ${((weight - 40) / 120) * 100}%, rgba(255,255,255,0.06) 100%)`,
              }}
            />
            <div className="flex justify-between mt-4 text-[10px] text-muted-foreground/60">
              <span>40 kg</span>
              <span>100 kg</span>
              <span>160 kg</span>
            </div>
          </motion.div>
        </div>

        <MetafiButton onClick={() => navigate("/birthdate")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default WeightScreen;
