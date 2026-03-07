import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft, Dumbbell } from "lucide-react";

const days = [
  { id: "mon", label: "Monday", short: "Mon", sports: [] as { name: string; intensity: string; duration: string }[] },
  { id: "tue", label: "Tuesday", short: "Tue", sports: [] },
  { id: "wed", label: "Wednesday", short: "Wed", sports: [] },
  { id: "thu", label: "Thursday", short: "Thu", sports: [] },
  { id: "fri", label: "Friday", short: "Fri", sports: [] },
  { id: "sat", label: "Saturday", short: "Sat", sports: [
    { name: "Tennis", intensity: "Moderate", duration: "60 min" },
    { name: "Running", intensity: "Hard", duration: "45 min" },
  ]},
  { id: "sun", label: "Sunday", short: "Sun", sports: [] },
];

const LiftingDaysScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(["mon", "wed", "fri"]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <MetafiScreen glowPosition="top">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/goal")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">Pick your lifting days</h1>
          <p className="text-muted-foreground text-sm mt-2">We'll plan around your existing activities</p>
        </motion.div>

        {/* Week overview bar */}
        <motion.div
          className="flex gap-1.5 mt-8 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {days.map((d) => {
            const hasSports = d.sports.length > 0;
            const isLifting = selected.includes(d.id);
            return (
              <div key={d.id} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[9px] text-muted-foreground">{d.short}</span>
                <div className={`w-full h-8 rounded-lg flex items-center justify-center transition-all ${
                  isLifting ? "bg-primary/20 border border-primary/40" : hasSports ? "bg-accent/40 border border-accent/20" : "glass-card"
                }`}>
                  {isLifting && <Dumbbell className="w-3 h-3 text-primary" />}
                  {hasSports && !isLifting && <span className="text-[8px]">🎾</span>}
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="flex-1 space-y-2.5 overflow-y-auto scrollbar-hide pb-4">
          {days.map((day, i) => {
            const isSelected = selected.includes(day.id);
            return (
              <motion.button
                key={day.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                onClick={() => toggle(day.id)}
                className={`w-full rounded-2xl p-4 text-left transition-all duration-300 ${
                  isSelected ? "chip-selected shadow-glow-sm" : "glass-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isSelected && <Dumbbell className="w-4 h-4 text-primary" />}
                    <span className="font-medium text-sm">{day.label}</span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] text-primary font-medium">Lifting</span>
                  )}
                </div>

                {day.sports.length > 0 && (
                  <div className="mt-2.5 space-y-1.5">
                    {day.sports.map((sport, si) => (
                      <div key={si} className="flex items-center gap-2 text-[11px] text-muted-foreground pl-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground/30" />
                        <span>{sport.name}</span>
                        <span>·</span>
                        <span>{sport.intensity}</span>
                        <span>·</span>
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
