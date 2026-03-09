import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Check, Timer, ChevronDown, ChevronUp } from "lucide-react";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { useUser } from "@/contexts/UserContext";
import chestPressImg from "@/assets/chest_press.jpg";

interface SetLog {
  weight: string;
  reps: string;
  completed: boolean;
}

const REST_DURATION = 90;

const exerciseList = [
  { name: "Dumbbell Bench Press", category: "Chest", sets: 3, reps: "8-10", rest: "90s" },
  { name: "Incline DB Fly", category: "Chest", sets: 3, reps: "10-12", rest: "60s" },
  { name: "Barbell Row", category: "Back", sets: 3, reps: "8-10", rest: "90s" },
  { name: "Lat Pulldown", category: "Back", sets: 3, reps: "10-12", rest: "60s" },
  { name: "Lateral Raises", category: "Shoulders", sets: 3, reps: "12-15", rest: "45s" },
  { name: "Face Pulls", category: "Shoulders", sets: 3, reps: "15-20", rest: "45s" },
];

const painLocations = [
  "Shoulder", "Elbow", "Wrist", "Lower Back", "Upper Back",
  "Neck", "Knee", "Hip", "Chest", "Other",
];

type FeedbackStep = "rpe" | "pain" | "pain-detail" | null;

const ExerciseDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { markExerciseDone } = useUser();
  const exerciseIndex = parseInt(id || "0", 10);
  const exercise = exerciseList[exerciseIndex] || exerciseList[0];

  const [sets, setSets] = useState<SetLog[]>(
    Array.from({ length: exercise.sets }, () => ({
      weight: "30",
      reps: exercise.reps.split("-")[0],
      completed: false,
    }))
  );
  const [restActive, setRestActive] = useState(false);
  const [restSeconds, setRestSeconds] = useState(REST_DURATION);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  // Feedback state
  const [feedbackStep, setFeedbackStep] = useState<FeedbackStep>(null);
  const [rpe, setRpe] = useState<number | null>(null);
  const [painLocation, setPainLocation] = useState<string | null>(null);
  const [painSeverity, setPainSeverity] = useState<number | null>(null);

  useEffect(() => {
    if (!restActive || restSeconds <= 0) {
      if (restSeconds <= 0) setRestActive(false);
      return;
    }
    const t = setInterval(() => setRestSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [restActive, restSeconds]);

  const completeSet = useCallback((idx: number) => {
    setSets((prev) => prev.map((s, i) => (i === idx ? { ...s, completed: true } : s)));
    setRestSeconds(REST_DURATION);
    setRestActive(true);
  }, []);

  const updateSet = (idx: number, field: "weight" | "reps", value: string) => {
    setSets((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const skipRest = () => {
    setRestActive(false);
    setRestSeconds(REST_DURATION);
  };

  const completedCount = sets.filter((s) => s.completed).length;
  const allDone = completedCount === sets.length;

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleFinishClick = () => setFeedbackStep("rpe");

  const handleRpeSelect = (value: number) => {
    setRpe(value);
    setFeedbackStep("pain");
  };

  const handlePainAnswer = (answer: boolean) => {
    if (answer) {
      setFeedbackStep("pain-detail");
    } else {
      finishAndNavigate();
    }
  };

  const handlePainSubmit = () => finishAndNavigate();

  const finishAndNavigate = () => {
    markExerciseDone(exerciseIndex);
    setTimeout(() => navigate("/dashboard"), 100);
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center px-6 pt-14 pb-2 relative z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 text-center pr-10">
            <h1 className="text-foreground font-display font-bold text-lg leading-tight">
              {exercise.name}
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">{exercise.category}</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-32">
          {/* Demo area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden mt-4"
          >
            <img src={chestPressImg} alt={`${exercise.name} demonstration`} className="w-full h-48 object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,17,26,0.3) 0%, rgba(7,17,26,0.6) 60%, rgba(7,17,26,0.85) 100%)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/10 flex items-center justify-center">
                <Play className="w-5 h-5 text-foreground/80 ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-3 left-4">
              <p className="text-foreground/60 text-[10px] uppercase tracking-widest">Watch Demo</p>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center justify-around mt-5 py-3">
            {[
              { label: "Reps", value: exercise.reps },
              { label: "Sets", value: String(exercise.sets) },
              { label: "Rest", value: exercise.rest },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-6 bg-border/40" />}
                <div className={`text-center ${i > 0 ? "pl-3" : ""}`}>
                  <p className="text-foreground font-display font-bold text-base">{stat.value}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Rest timer */}
          <AnimatePresence>
            {restActive && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-1">
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-primary/[0.06] border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Timer className="w-4 h-4 text-primary/60" />
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Rest</p>
                      <p className="text-foreground font-display font-bold text-xl tabular-nums">{formatTime(restSeconds)}</p>
                    </div>
                  </div>
                  <button onClick={skipRest} className="text-primary/80 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/[0.08] hover:bg-primary/15 transition-colors">Skip</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Set log */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-foreground font-display font-semibold text-sm">Set Log</p>
              <p className="text-muted-foreground text-[10px]">{completedCount}/{sets.length}</p>
            </div>
            <div className="grid grid-cols-[36px_1fr_1fr_44px] gap-2 mb-2 px-1">
              <p className="text-muted-foreground text-[9px] uppercase tracking-wider">#</p>
              <p className="text-muted-foreground text-[9px] uppercase tracking-wider">Weight (kg)</p>
              <p className="text-muted-foreground text-[9px] uppercase tracking-wider">Reps</p>
              <p className="text-muted-foreground text-[9px] uppercase tracking-wider text-center">Done</p>
            </div>
            <div className="space-y-1.5">
              {sets.map((set, idx) => (
                <motion.div
                  key={idx}
                  layout
                  className={`grid grid-cols-[36px_1fr_1fr_44px] gap-2 items-center rounded-xl px-3 py-2.5 transition-all duration-300 ${
                    set.completed ? "bg-primary/[0.04] border border-primary/10 opacity-50" : "bg-muted/10"
                  }`}
                >
                  <span className="text-muted-foreground font-display font-medium text-xs text-center">{idx + 1}</span>
                  <input type="number" inputMode="decimal" placeholder="kg" value={set.weight} onChange={(e) => updateSet(idx, "weight", e.target.value)} disabled={set.completed} className="w-full bg-secondary rounded-lg px-2.5 py-2 text-foreground text-sm text-center font-semibold outline-none border border-border/50 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 disabled:opacity-30 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  <input type="number" inputMode="numeric" placeholder="reps" value={set.reps} onChange={(e) => updateSet(idx, "reps", e.target.value)} disabled={set.completed} className="w-full bg-secondary rounded-lg px-2.5 py-2 text-foreground text-sm text-center font-semibold outline-none border border-border/50 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 disabled:opacity-30 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  <div className="flex justify-center">
                    <button onClick={() => !set.completed && completeSet(idx)} disabled={set.completed} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${set.completed ? "bg-primary/20 text-primary" : "bg-secondary border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-primary/60"}`}>
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-5">
            <button onClick={() => setInstructionsOpen(!instructionsOpen)} className="w-full flex items-center justify-between rounded-xl px-4 py-3 bg-muted/10 hover:bg-muted/15 transition-colors">
              <span className="text-foreground font-display font-semibold text-sm">Instructions</span>
              {instructionsOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground/40" /> : <ChevronDown className="w-4 h-4 text-muted-foreground/40" />}
            </button>
            <AnimatePresence>
              {instructionsOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="px-4 py-4 space-y-3 text-muted-foreground text-sm leading-relaxed">
                    <p><span className="text-foreground/70 font-medium">1.</span> Set the cables at chest height with handles attached.</p>
                    <p><span className="text-foreground/70 font-medium">2.</span> Grab both handles and bring them together in front of your chest.</p>
                    <p><span className="text-foreground/70 font-medium">3.</span> Press the handles forward and inward, squeezing your chest at peak contraction.</p>
                    <p><span className="text-foreground/70 font-medium">4.</span> Slowly return to starting position with control.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Finish CTA */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-8 pt-6 z-30" style={{ background: "linear-gradient(to top, hsl(var(--background)) 60%, transparent)" }}>
          <MetafiButton onClick={handleFinishClick} disabled={!allDone} variant="primary">
            {allDone ? "Finish Exercise" : `${completedCount}/${sets.length} Sets Completed`}
          </MetafiButton>
        </div>
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedbackStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-[430px] bg-card border border-border rounded-3xl p-6"
            >
              {/* RPE Step */}
              {feedbackStep === "rpe" && (
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground text-center">Rate of Perceived Exertion</h2>
                  <p className="text-muted-foreground text-xs text-center mt-1 mb-6">How hard did this feel? (1 = easy, 10 = max effort)</p>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                      <button
                        key={val}
                        onClick={() => handleRpeSelect(val)}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                          rpe === val
                            ? "bg-primary text-primary-foreground scale-110"
                            : val <= 3
                            ? "bg-primary/[0.08] text-primary/80 hover:bg-primary/20 border border-primary/10"
                            : val <= 6
                            ? "bg-accent/[0.15] text-accent-foreground hover:bg-accent/25 border border-accent/10"
                            : val <= 8
                            ? "bg-orange-500/[0.12] text-orange-400 hover:bg-orange-500/20 border border-orange-500/10"
                            : "bg-destructive/[0.12] text-destructive hover:bg-destructive/20 border border-destructive/10"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 px-1">
                    <span className="text-[10px] text-muted-foreground">Easy</span>
                    <span className="text-[10px] text-muted-foreground">Max Effort</span>
                  </div>
                </div>
              )}

              {/* Pain question */}
              {feedbackStep === "pain" && (
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground text-center">Was there any pain?</h2>
                  <p className="text-muted-foreground text-xs text-center mt-1 mb-6">Not soreness — sharp, unusual, or joint pain</p>
                  <div className="flex gap-3">
                    <button onClick={() => handlePainAnswer(false)} className="flex-1 py-4 rounded-2xl bg-primary/[0.08] border border-primary/10 text-primary font-display font-bold text-base hover:bg-primary/15 transition-all">
                      No Pain ✓
                    </button>
                    <button onClick={() => handlePainAnswer(true)} className="flex-1 py-4 rounded-2xl bg-destructive/[0.08] border border-destructive/10 text-destructive font-display font-bold text-base hover:bg-destructive/15 transition-all">
                      Yes
                    </button>
                  </div>
                </div>
              )}

              {/* Pain detail */}
              {feedbackStep === "pain-detail" && (
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground text-center">Where was the pain?</h2>
                  <p className="text-muted-foreground text-xs text-center mt-1 mb-4">Select location</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {painLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setPainLocation(loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          painLocation === loc
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/10 text-muted-foreground border border-border/50 hover:bg-muted/20"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>

                  <h3 className="font-display text-sm font-semibold text-foreground text-center mb-3">Pain severity</h3>
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                      <button
                        key={val}
                        onClick={() => setPainSeverity(val)}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                          painSeverity === val
                            ? "bg-destructive text-destructive-foreground scale-110"
                            : val <= 3
                            ? "bg-primary/[0.08] text-primary/80 hover:bg-primary/20 border border-primary/10"
                            : val <= 6
                            ? "bg-orange-500/[0.12] text-orange-400 hover:bg-orange-500/20 border border-orange-500/10"
                            : "bg-destructive/[0.12] text-destructive hover:bg-destructive/20 border border-destructive/10"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mb-5 px-1">
                    <span className="text-[10px] text-muted-foreground">Mild</span>
                    <span className="text-[10px] text-muted-foreground">Severe</span>
                  </div>
                  <MetafiButton onClick={handlePainSubmit} disabled={!painLocation || !painSeverity} variant="primary">
                    Submit & Finish
                  </MetafiButton>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MetafiScreen>
  );
};

export default ExerciseDetailScreen;