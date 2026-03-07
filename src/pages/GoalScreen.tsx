import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft } from "lucide-react";

const goals = [
  { id: "strength", label: "Build Strength", desc: "Get stronger with progressive overload", icon: "🏋️" },
  { id: "muscle", label: "Build Muscle", desc: "Hypertrophy-focused training", icon: "💎" },
  { id: "performance", label: "Athletic Performance", desc: "Improve sport-specific power", icon: "⚡" },
  { id: "general", label: "General Fitness", desc: "Stay fit and balanced", icon: "🎯" },
];

const GoalScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/training-level")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">What's your main goal?</h1>
        </motion.div>

        <div className="flex-1 mt-10 grid grid-cols-2 gap-3">
          {goals.map((goal, i) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(goal.id)}
              className={`flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-300 ${
                selected === goal.id ? "chip-selected shadow-glow-sm" : "glass-card"
              }`}
            >
              <span className="text-4xl mb-3">{goal.icon}</span>
              <span className="font-semibold text-sm">{goal.label}</span>
              <span className="text-[10px] text-muted-foreground mt-1.5 leading-tight">{goal.desc}</span>
            </motion.button>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/lifting-days")} disabled={!selected} className="mt-6">
          Continue
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default GoalScreen;
