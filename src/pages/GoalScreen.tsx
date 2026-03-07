import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { Check, Dumbbell, Gem, Zap, Target } from "lucide-react";

const goals = [
  { id: "strength", label: "Build Strength", desc: "Get stronger with progressive overload", icon: Dumbbell },
  { id: "muscle", label: "Build Muscle", desc: "Hypertrophy-focused training", icon: Gem },
  { id: "performance", label: "Athletic Performance", desc: "Improve sport-specific power", icon: Zap },
  { id: "general", label: "General Fitness", desc: "Stay fit and balanced", icon: Target },
];

const GoalScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/training-level" />

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold leading-tight">What's your<br />main goal?</h1>
        </motion.div>

        <div className="flex-1 mt-10 grid grid-cols-2 gap-3">
          {goals.map((goal, i) => {
            const Icon = goal.icon;
            const isSelected = selected === goal.id;
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(goal.id)}
                className={`relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 ${
                  isSelected ? "chip-selected shadow-glow-sm" : "glass-card hover:border-primary/10"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                  isSelected ? "bg-primary/20" : "bg-muted/15"
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <span className="font-semibold text-sm">{goal.label}</span>
                <span className="text-[10px] text-muted-foreground/50 mt-1.5 leading-tight">{goal.desc}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-primary" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <MetafiButton onClick={() => navigate("/lifting-days")} disabled={!selected} className="mt-6">
          Continue
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default GoalScreen;
