import { motion, AnimatePresence } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { Home, Dumbbell, User, ChevronRight, Flame, Timer, RotateCcw, Sparkles, ArrowLeftRight, X, Check } from "lucide-react";
import metafiIcon from "@/assets/metafi-icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUser } from "@/contexts/UserContext";

const weekDaysBase = [
  { short: "M", active: true },
  { short: "T", active: false },
  { short: "W", active: true },
  { short: "T", active: false },
  { short: "F", active: true },
  { short: "S", active: false },
  { short: "S", active: false },
];

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  category: string;
}

const initialExercises: Exercise[] = [
  { name: "Dumbbell Bench Press", sets: 3, reps: "8-10", rest: "90s", category: "chest" },
  { name: "Incline DB Fly", sets: 3, reps: "10-12", rest: "60s", category: "chest" },
  { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90s", category: "back" },
  { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60s", category: "back" },
  { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "45s", category: "shoulders" },
  { name: "Face Pulls", sets: 3, reps: "15-20", rest: "45s", category: "shoulders" },
];

const exerciseDatabase: Record<string, Exercise[]> = {
  chest: [
    { name: "Flat Barbell Bench Press", sets: 3, reps: "8-10", rest: "90s", category: "chest" },
    { name: "Cable Crossover", sets: 3, reps: "12-15", rest: "60s", category: "chest" },
    { name: "Push-Ups", sets: 3, reps: "15-20", rest: "45s", category: "chest" },
    { name: "Machine Chest Press", sets: 3, reps: "10-12", rest: "60s", category: "chest" },
    { name: "Pec Deck Fly", sets: 3, reps: "12-15", rest: "60s", category: "chest" },
  ],
  back: [
    { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60s", category: "back" },
    { name: "T-Bar Row", sets: 3, reps: "8-10", rest: "90s", category: "back" },
    { name: "Pull-Ups", sets: 3, reps: "6-10", rest: "90s", category: "back" },
    { name: "Dumbbell Row", sets: 3, reps: "10-12", rest: "60s", category: "back" },
    { name: "Straight-Arm Pulldown", sets: 3, reps: "12-15", rest: "45s", category: "back" },
  ],
  shoulders: [
    { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s", category: "shoulders" },
    { name: "Cable Lateral Raise", sets: 3, reps: "12-15", rest: "45s", category: "shoulders" },
    { name: "Rear Delt Fly", sets: 3, reps: "15-20", rest: "45s", category: "shoulders" },
    { name: "Arnold Press", sets: 3, reps: "10-12", rest: "60s", category: "shoulders" },
    { name: "Upright Row", sets: 3, reps: "10-12", rest: "60s", category: "shoulders" },
  ],
};

const DashboardScreen = () => {
  const { completedExercises, workoutDone, streak, completedDays, todayDayIndex } = useUser();
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const weekDays = weekDaysBase.map((d, i) => ({
    ...d,
    done: completedDays.includes(i),
    isToday: i === todayDayIndex,
  }));

  const completedDaysCount = completedDays.length;
  const activeDaysCount = weekDaysBase.filter((d) => d.active).length;

  const replaceCategory = replaceIndex !== null ? exercises[replaceIndex].category : null;
  const alternatives = replaceCategory
    ? exerciseDatabase[replaceCategory]?.filter((alt) => alt.name !== exercises[replaceIndex!]?.name) ?? []
    : [];

  const handleReplace = (alt: Exercise) => {
    if (replaceIndex === null) return;
    setExercises((prev) => prev.map((ex, i) => (i === replaceIndex ? alt : ex)));
    setSkipped((prev) => { const n = new Set(prev); n.delete(replaceIndex); return n; });
    setReplaceIndex(null);
  };

  const handleSkip = (index: number) => {
    setSkipped((prev) => {
      const n = new Set(prev);
      if (n.has(index)) n.delete(index); else n.add(index);
      return n;
    });
  };

  const navigate = useNavigate();

  return (
    <MetafiScreen glowPosition="top" glowIntensity="medium" celebrate={workoutDone}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-28">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass-card rounded-xl px-2.5 py-1.5 flex items-center gap-1 h-10">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold">{streak}</span>
          </div>
          <img src={metafiIcon} alt="Metafi" className="w-10 h-10 object-contain" />
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-muted-foreground text-sm">Monday</p>
          <h1 className="font-display text-2xl font-bold">Today</h1>
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
            <span className="text-xs font-medium text-primary">{completedDaysCount}/{activeDaysCount} days</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-accent"
              initial={{ width: 0 }}
              animate={{ width: `${(completedDaysCount / activeDaysCount) * 100}%` }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-muted-foreground">{completedExercises.length}/{exercises.length} exercises done</span>
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
                <span>{exercises.length - skipped.size} exercises</span>
              </div>
            </div>
          </div>

          {/* Adaptation cue */}
          <div className="bg-primary/[0.08] rounded-xl px-3 py-2 mb-5 border border-primary/10 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <p className="text-[10px] text-primary/80">
              Adjusted for Saturday's tennis session — reduced shoulder volume today
            </p>
          </div>

          {/* Exercises */}
          <div className="space-y-2.5">
            <AnimatePresence>
              {exercises.map((ex, i) => {
                const isSkipped = skipped.has(i);
                const isDone = completedExercises.includes(i);
                return (
                  <motion.div
                    key={`${ex.name}-${i}`}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors ${
                      isDone ? "bg-primary/[0.06] border border-primary/10 opacity-60" :
                      isSkipped ? "bg-muted/5 opacity-50" : "bg-muted/10 hover:bg-muted/20"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {isDone && (
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                      )}
                      <div>
                        <span className={`text-sm font-medium ${isDone ? "text-muted-foreground" : isSkipped ? "line-through text-muted-foreground" : ""}`}>
                          {ex.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-muted-foreground">{ex.sets} Sets</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[10px] text-muted-foreground">{ex.reps} Reps</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[10px] text-muted-foreground">{ex.rest} Rest</span>
                        </div>
                      </div>
                    </div>
                    {isDone ? (
                      <button
                        onClick={() => navigate(`/exercise/${i}`)}
                        className="ml-2 flex-shrink-0 p-2 rounded-lg hover:bg-muted/20 transition-colors text-primary/60 hover:text-primary"
                        title="View logged data"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <button
                          onClick={() => setReplaceIndex(i)}
                          className="p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-primary"
                          title="Replace exercise"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSkip(i)}
                          className={`p-2 rounded-lg hover:bg-muted/20 transition-colors ${
                            isSkipped ? "text-destructive" : "text-muted-foreground hover:text-destructive"
                          }`}
                          title={isSkipped ? "Unskip exercise" : "Skip exercise"}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => !isSkipped && navigate(`/exercise/${i}`)}
                          className="p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-primary"
                          title="Exercise details"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-primary" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Start CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <MetafiButton disabled={workoutDone}>
            {workoutDone ? "Workout Complete ✓" : "Start Workout"}
          </MetafiButton>
        </motion.div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around">
            {[
              { icon: Home, label: "Home", active: true, path: "/dashboard" },
              { icon: Dumbbell, label: "Plan", active: false, path: "/plan" },
              { icon: User, label: "Profile", active: false, path: "/dashboard" },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1">
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/30"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary font-medium" : "text-muted-foreground/30"}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Replace Exercise Sheet */}
      <Sheet open={replaceIndex !== null} onOpenChange={(open) => !open && setReplaceIndex(null)}>
        <SheetContent side="bottom" className="bg-background border-border rounded-t-3xl max-h-[70vh]">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-foreground font-display">
              Replace {replaceIndex !== null ? exercises[replaceIndex].name : ""}
            </SheetTitle>
            <p className="text-xs text-muted-foreground capitalize">
              Same movement — {replaceCategory}
            </p>
          </SheetHeader>
          <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1">
            {alternatives.map((alt) => (
              <button
                key={alt.name}
                onClick={() => handleReplace(alt)}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors text-left"
              >
                <div>
                  <span className="text-sm font-medium text-foreground">{alt.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground">{alt.sets} Sets</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[10px] text-muted-foreground">{alt.reps} Reps</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[10px] text-muted-foreground">{alt.rest} Rest</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </MetafiScreen>
  );
};

export default DashboardScreen;
