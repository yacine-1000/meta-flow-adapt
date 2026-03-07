import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { Dumbbell, Check, Activity } from "lucide-react";

const days = [
  { id: "mon", label: "Monday", short: "M", sports: [] as { name: string; intensity: string; duration: string }[] },
  { id: "tue", label: "Tuesday", short: "T", sports: [] },
  { id: "wed", label: "Wednesday", short: "W", sports: [] },
  { id: "thu", label: "Thursday", short: "T", sports: [] },
  { id: "fri", label: "Friday", short: "F", sports: [] },
  { id: "sat", label: "Saturday", short: "S", sports: [
    { name: "Tennis", intensity: "Moderate", duration: "60 min" },
    { name: "Running", intensity: "Hard", duration: "45 min" },
  ]},
  { id: "sun", label: "Sunday", short: "S", sports: [] },
];

const LiftingDaysScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(["mon", "wed", "fri"]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <MetafiScreen glowPosition="top" glowIntensity="medium">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/goal" />

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold leading-tight">Pick your<br />lifting days</h1>
          <p className="text-muted-foreground text-sm mt-3">We'll plan around your existing activities</p>
        </motion.div>

        {/* Week overview compact bar */}
        <motion.div
          className="flex gap-2 mt-8 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {days.map((d) => {
            const hasSports = d.sports.length > 0;
            const isLifting = selected.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggle(d.id)}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-[9px] text-muted-foreground/40 font-medium">{d.short}</span>
                <div className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isLifting
                    ? "bg-primary/15 border border-primary/40 shadow-glow-sm"
                    : hasSports
                    ? "glass-card-strong border-primary/10"
                    : "glass-card"
                }`}>
                  {isLifting && <Dumbbell className="w-3.5 h-3.5 text-primary" />}
                  {hasSports && !isLifting && <Activity className="w-3 h-3 text-muted-foreground/40" />}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Day list */}
        <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide pb-4">
          {days.map((day, i) => {
            const isSelected = selected.includes(day.id);
            const hasSports = day.sports.length > 0;
            return (
              <motion.button
                key={day.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                onClick={() => toggle(day.id)}
                className={`w-full rounded-2xl p-4 text-left transition-all duration-300 ${
                  isSelected ? "chip-selected shadow-glow-sm" : "glass-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isSelected ? "bg-primary/20" : "bg-muted/10"
                    }`}>
                      {isSelected ? <Dumbbell className="w-4 h-4 text-primary" /> : <span className="text-xs text-muted-foreground/40">{day.short}</span>}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{day.label}</span>
                      {isSelected && <p className="text-[10px] text-primary/60 mt-0.5">Lifting day</p>}
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </div>

                {hasSports && (
                  <div className="mt-3 space-y-1.5 ml-[52px]">
                    {day.sports.map((sport, si) => (
                      <div key={si} className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                        <Activity className="w-3 h-3 text-muted-foreground/30" />
                        <span>{sport.name}</span>
                        <span className="text-muted-foreground/20">·</span>
                        <span>{sport.intensity}</span>
                        <span className="text-muted-foreground/20">·</span>
                        <span>{sport.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <MetafiButton onClick={() => navigate("/generating")} disabled={selected.length === 0}>
          Generate My Plan
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default LiftingDaysScreen;
