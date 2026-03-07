import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";

const GenderScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "male", label: "Male", icon: "♂" },
    { id: "female", label: "Female", icon: "♀" },
  ];

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={1} total={6} />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground text-sm mb-2">Step 1 of 6</p>
          <h1 className="font-display text-2xl font-bold">What's your gender?</h1>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center gap-4">
          {options.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => setSelected(opt.id)}
              className={`relative w-full p-6 rounded-3xl text-left transition-all duration-300 ${
                selected === opt.id
                  ? "chip-selected shadow-glow"
                  : "glass-card hover:bg-muted/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{opt.icon}</span>
                <span className="text-lg font-medium">{opt.label}</span>
              </div>
              {selected === opt.id && (
                <motion.div
                  layoutId="gender-check"
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center"
                >
                  <span className="text-primary-foreground text-sm">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <MetafiButton
          onClick={() => navigate("/height")}
          disabled={!selected}
        >
          Continue
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default GenderScreen;
