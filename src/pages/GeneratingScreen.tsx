import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";

const steps = [
  "Analyzing your schedule...",
  "Balancing sport load...",
  "Selecting exercises...",
  "Optimizing recovery...",
  "Building your plan...",
];

const GeneratingScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/dashboard"), 600);
          return 100;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 20), steps.length - 1);
    setCurrentStep(idx);
  }, [progress]);

  return (
    <MetafiScreen glowPosition="center">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Rotating ring */}
        <div className="relative w-48 h-48">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Progress arc (SVG) */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#mintGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 * (1 - progress / 100)}
              transition={{ duration: 0.1 }}
            />
            <defs>
              <linearGradient id="mintGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#95FFC3" />
                <stop offset="100%" stopColor="#6DEBFF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-bold text-gradient-mint">{progress}%</span>
          </div>
        </div>

        {/* Step text */}
        <motion.p
          key={currentStep}
          className="text-foreground font-medium mt-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {steps[currentStep]}
        </motion.p>

        <motion.div
          className="flex gap-2 mt-6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {[0, 1, 2].map((d) => (
            <div key={d} className="w-1.5 h-1.5 rounded-full bg-primary" />
          ))}
        </motion.div>
      </div>
    </MetafiScreen>
  );
};

export default GeneratingScreen;
