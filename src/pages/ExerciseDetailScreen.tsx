import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Check, Timer, ChevronDown, ChevronUp } from "lucide-react";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import chestPressImg from "@/assets/chest_press.jpg";

interface SetLog {
  weight: string;
  reps: string;
  completed: boolean;
}

const REST_DURATION = 90; // seconds

const ExerciseDetailScreen = () => {
  const navigate = useNavigate();
  const [sets, setSets] = useState<SetLog[]>([
    { weight: "30", reps: "12", completed: false },
    { weight: "30", reps: "12", completed: false },
    { weight: "30", reps: "10", completed: false },
    { weight: "30", reps: "10", completed: false },
  ]);
  const [restActive, setRestActive] = useState(false);
  const [restSeconds, setRestSeconds] = useState(REST_DURATION);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  // Rest timer countdown
  useEffect(() => {
    if (!restActive || restSeconds <= 0) {
      if (restSeconds <= 0) setRestActive(false);
      return;
    }
    const t = setInterval(() => setRestSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [restActive, restSeconds]);

  const completeSet = useCallback(
    (idx: number) => {
      setSets((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, completed: true } : s))
      );
      setRestSeconds(REST_DURATION);
      setRestActive(true);
    },
    []
  );

  const updateSet = (idx: number, field: "weight" | "reps", value: string) => {
    setSets((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  };

  const skipRest = () => {
    setRestActive(false);
    setRestSeconds(REST_DURATION);
  };

  const completedCount = sets.filter((s) => s.completed).length;
  const allDone = completedCount === sets.length;

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center px-5 pt-14 pb-3 relative z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 text-center pr-10">
            <h1 className="text-foreground font-display font-bold text-lg leading-tight">
              Cable Chest Press
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">Chest · Cables</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-32">
          {/* Demo area */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden mt-3 shadow-card"
          >
            <img
              src={chestPressImg}
              alt="Cable Chest Press demonstration"
              className="w-full h-52 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-glow">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              </div>
            </div>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-3 gap-3 mt-4"
          >
            {[
              { label: "Reps", value: "10–12" },
              { label: "Sets", value: "4" },
              { label: "Rest", value: "90s" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl py-3 text-center"
              >
                <p className="text-foreground font-display font-bold text-lg">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-[11px] uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Rest timer overlay */}
          <AnimatePresence>
            {restActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="glass-card-strong rounded-2xl p-4 flex items-center justify-between border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <Timer className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Rest Timer</p>
                      <p className="text-foreground font-display font-bold text-2xl tabular-nums">
                        {formatTime(restSeconds)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={skipRest}
                    className="text-primary text-sm font-semibold px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Set logging */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-foreground font-display font-semibold text-sm">
                Set Log
              </p>
              <p className="text-muted-foreground text-xs">
                {completedCount}/{sets.length} completed
              </p>
            </div>

            {/* Header row */}
            <div className="grid grid-cols-[40px_1fr_1fr_48px] gap-2 mb-2 px-1">
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Set</p>
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider">kg</p>
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Reps</p>
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider text-center">Done</p>
            </div>

            <div className="space-y-2">
              {sets.map((set, idx) => (
                <motion.div
                  key={idx}
                  layout
                  className={`grid grid-cols-[40px_1fr_1fr_48px] gap-2 items-center rounded-xl px-3 py-3 transition-all duration-300 ${
                    set.completed
                      ? "glass-card border border-primary/20 opacity-60"
                      : "glass-card"
                  }`}
                >
                  <span className="text-foreground font-display font-bold text-sm text-center">
                    {idx + 1}
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={set.weight}
                    onChange={(e) => updateSet(idx, "weight", e.target.value)}
                    disabled={set.completed}
                    className="w-full bg-secondary/60 rounded-lg px-3 py-2 text-foreground text-sm text-center font-medium outline-none focus:ring-1 focus:ring-primary/40 disabled:opacity-40 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    value={set.reps}
                    onChange={(e) => updateSet(idx, "reps", e.target.value)}
                    disabled={set.completed}
                    className="w-full bg-secondary/60 rounded-lg px-3 py-2 text-foreground text-sm text-center font-medium outline-none focus:ring-1 focus:ring-primary/40 disabled:opacity-40 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={() => !set.completed && completeSet(idx)}
                      disabled={set.completed}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        set.completed
                          ? "bg-primary text-primary-foreground shadow-glow-sm"
                          : "bg-secondary/60 text-muted-foreground hover:bg-primary/20 hover:text-primary"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5"
          >
            <button
              onClick={() => setInstructionsOpen(!instructionsOpen)}
              className="w-full flex items-center justify-between glass-card rounded-xl px-4 py-3"
            >
              <span className="text-foreground font-display font-semibold text-sm">
                Instructions
              </span>
              {instructionsOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <AnimatePresence>
              {instructionsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-card rounded-b-xl px-4 py-4 -mt-1 space-y-3 text-muted-foreground text-sm leading-relaxed">
                    <p>
                      <span className="text-foreground font-medium">1.</span> Set the cables at chest height with handles attached. Stand in the center with one foot slightly forward for stability.
                    </p>
                    <p>
                      <span className="text-foreground font-medium">2.</span> Grab both handles and bring them together in front of your chest. Keep a slight bend in your elbows throughout the movement.
                    </p>
                    <p>
                      <span className="text-foreground font-medium">3.</span> Press the handles forward and inward, squeezing your chest at the peak contraction. Hold for one second.
                    </p>
                    <p>
                      <span className="text-foreground font-medium">4.</span> Slowly return to the starting position with control. Avoid letting the weight stack slam. Maintain constant tension on the chest.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Finish CTA */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-8 pt-4 z-30"
          style={{ background: "linear-gradient(to top, hsl(var(--background)) 60%, transparent)" }}
        >
          <MetafiButton
            onClick={() => navigate(-1)}
            disabled={!allDone}
            variant="primary"
          >
            {allDone ? "Finish Exercise" : `${completedCount}/${sets.length} Sets Completed`}
          </MetafiButton>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default ExerciseDetailScreen;
