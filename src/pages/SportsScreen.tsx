import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft } from "lucide-react";

const sports = [
  { id: "football", label: "Football", emoji: "⚽" },
  { id: "padel", label: "Padel", emoji: "🎾" },
  { id: "pilates", label: "Pilates", emoji: "🧘" },
  { id: "yoga", label: "Yoga", emoji: "🧘‍♂️" },
  { id: "tennis", label: "Tennis", emoji: "🎾" },
  { id: "running", label: "Running", emoji: "🏃" },
  { id: "hiking", label: "Hiking", emoji: "🥾" },
  { id: "mma", label: "MMA", emoji: "🥊" },
  { id: "boxing", label: "Boxing", emoji: "🥊" },
  { id: "swimming", label: "Swimming", emoji: "🏊" },
  { id: "cycling", label: "Cycling", emoji: "🚴" },
  { id: "basketball", label: "Basketball", emoji: "🏀" },
];

const SportsScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/home")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">What sports do you play?</h1>
          <p className="text-muted-foreground text-sm mt-2">Select all that apply to your typical week</p>
        </motion.div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-3 gap-3">
            {sports.map((sport, i) => (
              <motion.button
                key={sport.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => toggle(sport.id)}
                className={`flex flex-col items-center gap-2 py-5 rounded-2xl transition-all duration-300 ${
                  selected.includes(sport.id) ? "chip-selected shadow-glow-sm" : "glass-card hover:bg-muted/10"
                }`}
              >
                <span className="text-2xl">{sport.emoji}</span>
                <span className="text-xs font-medium">{sport.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <MetafiButton onClick={() => navigate("/focus")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default SportsScreen;
