import { motion } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { Home, Dumbbell, User, ChevronRight, Flame, Timer, RotateCcw, Sparkles } from "lucide-react";
import metafiIcon from "@/assets/metafi-icon.png";

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
  { name: "Dumbbell Bench Press", sets: 3, reps: "8-10", rest: "90s" },
  { name: "Incline DB Fly", sets: 3, reps: "10-12", rest: "60s" },
  { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90s" },
  { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60s" },
  { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "45s" },
  { name: "Face Pulls", sets: 3, reps: "15-20", rest: "45s" },
];

const DashboardScreen = () => {
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
            <p className="text-muted-foreground text-sm">Monday</p>
            <h1 className="font-display text-2xl font-bold">Today</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card rounded-xl px-2.5 py-1.5 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold">3</span>
            </div>
            <img src={metafiIcon} alt="Metafi" className="w-8 h-8" />
          </div>
        </motion.div>

        {/* Week bar */}
        <motion.div
          className="flex gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {weekDays.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">{d.short}</span>
              <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-all ${
                d.done ? "bg-primary/20 border border-primary/40 text-primary" :
                d.active ? "glass-card-strong border border-primary/20" :
                "glass-card"
              }`}>
                {d.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="#95FFC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {d.active && !d.done && <Dumbbell className="w-3 h-3 text-primary/60" />}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress card */}
        <motion.div
          className="glass-card-strong rounded-2xl p-5 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">Weekly Progress</span>
            <span className="text-xs font-medium text-primary">1/4 days</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-accent"
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-muted-foreground">3/6 workouts done</span>
            </div>
          </div>
        </motion.div>

        {/* Today's workout hero card */}
        <motion.div
          className="glass-card-strong rounded-3xl p-6 mt-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg font-bold">Upper Body</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Push + Pull</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" />
                <span>~55 min</span>
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>6 exercises</span>
              </div>
            </div>
          </div>

          {/* Adaptation cue */}
          <div className="bg-primary/8 rounded-xl px-3 py-2 mb-5 border border-primary/10 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <p className="text-[10px] text-primary/80">
              Adjusted for Saturday's tennis session — reduced shoulder volume today
            </p>
          </div>

          {/* Exercises */}
          <div className="space-y-2.5">
            {exercises.map((ex, i) => (
              <motion.div
                key={ex.name}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <div className="flex-1">
                  <span className="text-sm font-medium">{ex.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground">{ex.sets} Sets</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[10px] text-muted-foreground">{ex.reps} Reps</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[10px] text-muted-foreground">{ex.rest} Rest</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
