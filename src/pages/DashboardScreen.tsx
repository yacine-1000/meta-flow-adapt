import { motion } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { useUser } from "@/contexts/UserContext";
import { Home, Dumbbell, User, ChevronRight, Flame, Timer, RotateCcw, TrendingUp, Calendar, Sparkles } from "lucide-react";

const weekDays = [
  { short: "M", active: true, done: true },
  { short: "T", active: false, done: false },
  { short: "W", active: true, done: false },
  { short: "T", active: false, done: false },
  { short: "F", active: true, done: false },
  { short: "S", active: false, done: false },
  { short: "S", active: false, done: false },
];

const exercises = [
  { name: "Dumbbell Bench Press", sets: 3, reps: "8-10", rest: "90s", muscleGroup: "Chest" },
  { name: "Incline DB Fly", sets: 3, reps: "10-12", rest: "60s", muscleGroup: "Chest" },
  { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90s", muscleGroup: "Back" },
  { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60s", muscleGroup: "Back" },
  { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "45s", muscleGroup: "Shoulders" },
  { name: "Face Pulls", sets: 3, reps: "15-20", rest: "45s", muscleGroup: "Shoulders" },
];

const DashboardScreen = () => {
  const { userName } = useUser();
  const displayName = userName || "there";

  return (
    <MetafiScreen glowPosition="top" glowIntensity="medium">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-28">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-muted-foreground/50 text-xs tracking-widest uppercase">Monday</p>
            <h1 className="font-display text-2xl font-bold mt-1">
              Hi, <span className="text-gradient-mint">{displayName}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card rounded-xl px-3 py-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold">3</span>
            </div>
          </div>
        </motion.div>

        {/* Week bar */}
        <motion.div
          className="flex gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {weekDays.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[9px] text-muted-foreground/40 font-medium">{d.short}</span>
              <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs transition-all ${
                d.done ? "bg-primary/15 border border-primary/30" :
                d.active ? "glass-card-strong border border-primary/10" :
                "glass-card"
              }`}>
                {d.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="#95FFC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {d.active && !d.done && <Dumbbell className="w-3 h-3 text-primary/40" />}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {[
            { icon: Calendar, label: "Week", value: "1/4 done" },
            { icon: TrendingUp, label: "Progress", value: "25%" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 glass-card rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">{stat.label}</p>
                <p className="text-sm font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hero workout card */}
        <motion.div
          className="glass-card-strong rounded-3xl p-6 mt-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <h2 className="font-display text-xl font-bold">Upper Body</h2>
              <p className="text-xs text-muted-foreground/50 mt-0.5">Push + Pull</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
              <div className="flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" />
                <span>~55 min</span>
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>6 ex</span>
              </div>
            </div>
          </div>

          {/* Adaptation cue */}
          <div className="bg-primary/6 rounded-xl px-3.5 py-2.5 mb-5 border border-primary/8 flex items-center gap-2 relative z-10">
            <Sparkles className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <p className="text-[10px] text-primary/70 leading-relaxed">
              Adjusted for Saturday's tennis — reduced shoulder volume today
            </p>
          </div>

          {/* Exercises */}
          <div className="space-y-2 relative z-10">
            {exercises.map((ex, i) => (
              <motion.div
                key={ex.name}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/8 hover:bg-muted/12 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.04 }}
              >
                <div className="flex-1">
                  <span className="text-sm font-medium">{ex.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground/40">{ex.sets}×{ex.reps}</span>
                    <span className="text-muted-foreground/15">·</span>
                    <span className="text-[10px] text-muted-foreground/40">{ex.rest} rest</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/20" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MetafiButton>Start Workout</MetafiButton>
        </motion.div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around">
            {[
              { icon: Home, label: "Home", active: true },
              { icon: Dumbbell, label: "Plan", active: false },
              { icon: User, label: "Profile", active: false },
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center gap-1">
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/30"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary font-medium" : "text-muted-foreground/30"}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default DashboardScreen;
