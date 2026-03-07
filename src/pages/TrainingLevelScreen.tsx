import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft } from "lucide-react";

const levels = [
  { id: "beginner", label: "Beginner", desc: "New to lifting or less than 6 months", icon: "🌱" },
  { id: "intermediate", label: "Intermediate", desc: "1-3 years of consistent training", icon: "💪" },
  { id: "advanced", label: "Advanced", desc: "3+ years, strong foundation", icon: "🔥" },
];

const TrainingLevelScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate(-1 as any)} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">What's your training level?</h1>
        </motion.div>

        <div className="flex-1 mt-10 space-y-4">
          {levels.map((level, i) => (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(level.id)}
              className={`w-full p-5 rounded-2xl text-left transition-all duration-300 ${
                selected === level.id ? "chip-selected shadow-glow-sm" : "glass-card"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl mt-1">{level.icon}</span>
                <div>
                  <span className="font-semibold block">{level.label}</span>
                  <span className="text-xs text-muted-foreground mt-1 block">{level.desc}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/goal")} disabled={!selected}>
          Continue
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default TrainingLevelScreen;
