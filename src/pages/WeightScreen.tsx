import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";

const WeightScreen = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(75);

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={3} total={6} />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground text-sm mb-2">Step 3 of 6</p>
          <h1 className="font-display text-2xl font-bold">What's your weight?</h1>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            className="text-center mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-display text-7xl font-bold text-gradient-mint">{weight}</span>
            <span className="text-muted-foreground text-xl ml-2">kg</span>
          </motion.div>

          {/* Slider */}
          <div className="w-full px-4">
            <input
              type="range"
              min={40}
              max={160}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #95FFC3 0%, #6DEBFF ${((weight - 40) / 120) * 100}%, rgba(255,255,255,0.1) ${((weight - 40) / 120) * 100}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
            <div className="flex justify-between mt-3 text-xs text-muted-foreground">
              <span>40 kg</span>
              <span>160 kg</span>
            </div>
          </div>
        </div>

        <MetafiButton onClick={() => navigate("/birthdate")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default WeightScreen;
