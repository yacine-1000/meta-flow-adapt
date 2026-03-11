import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { ArrowLeft, ArrowRight, ChevronRight, Check, Clock, Repeat, ArrowLeftRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import chestPressImg from "@/assets/chest_press.jpg";

interface Exercise {
  name: string;
  category: string;
  sets: number;
  reps: string;
  rest: string;
  muscles: string[];
}

const initialExercises: Exercise[] = [
  { name: "Dumbbell Bench Press", category: "Chest", sets: 3, reps: "8-10", rest: "90s", muscles: ["Pectorals", "Triceps", "Anterior Deltoid"] },
  { name: "Incline DB Fly", category: "Chest", sets: 3, reps: "10-12", rest: "60s", muscles: ["Upper Pectorals", "Anterior Deltoid"] },
  { name: "Barbell Row", category: "Back", sets: 3, reps: "8-10", rest: "90s", muscles: ["Lats", "Rhomboids", "Biceps"] },
  { name: "Lat Pulldown", category: "Back", sets: 3, reps: "10-12", rest: "60s", muscles: ["Latissimus Dorsi", "Biceps"] },
  { name: "Lateral Raises", category: "Shoulders", sets: 3, reps: "12-15", rest: "45s", muscles: ["Lateral Deltoid", "Traps"] },
  { name: "Face Pulls", category: "Shoulders", sets: 3, reps: "15-20", rest: "45s", muscles: ["Rear Deltoid", "Rhomboids", "External Rotators"] },
];

const exerciseDatabase: Record<string, Exercise[]> = {
  chest: [
    { name: "Flat Barbell Bench Press", sets: 3, reps: "8-10", rest: "90s", category: "Chest", muscles: ["Pectorals", "Triceps"] },
    { name: "Cable Crossover", sets: 3, reps: "12-15", rest: "60s", category: "Chest", muscles: ["Pectorals", "Anterior Deltoid"] },
    { name: "Push-Ups", sets: 3, reps: "15-20", rest: "45s", category: "Chest", muscles: ["Pectorals", "Triceps"] },
    { name: "Machine Chest Press", sets: 3, reps: "10-12", rest: "60s", category: "Chest", muscles: ["Pectorals", "Triceps"] },
  ],
  back: [
    { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60s", category: "Back", muscles: ["Lats", "Rhomboids"] },
    { name: "T-Bar Row", sets: 3, reps: "8-10", rest: "90s", category: "Back", muscles: ["Lats", "Rhomboids"] },
    { name: "Pull-Ups", sets: 3, reps: "6-10", rest: "90s", category: "Back", muscles: ["Lats", "Biceps"] },
    { name: "Dumbbell Row", sets: 3, reps: "10-12", rest: "60s", category: "Back", muscles: ["Lats", "Rhomboids"] },
  ],
  shoulders: [
    { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s", category: "Shoulders", muscles: ["Deltoids", "Triceps"] },
    { name: "Cable Lateral Raise", sets: 3, reps: "12-15", rest: "45s", category: "Shoulders", muscles: ["Lateral Deltoid"] },
    { name: "Rear Delt Fly", sets: 3, reps: "15-20", rest: "45s", category: "Shoulders", muscles: ["Rear Deltoid"] },
    { name: "Arnold Press", sets: 3, reps: "10-12", rest: "60s", category: "Shoulders", muscles: ["Deltoids", "Triceps"] },
  ],
};

const ActiveWorkoutScreen = () => {
  const navigate = useNavigate();
  const { completedExercises } = useUser();
  const { t, isRTL } = useLanguage();
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const totalExercises = exercises.length;
  const completedCount = completedExercises.length;
  const progress = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  const replaceCategory = replaceIndex !== null ? exercises[replaceIndex].category.toLowerCase() : null;
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

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen">
        <div className="px-6 pt-14 pb-4 relative z-20">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <BackIcon className="w-4 h-4" />
            </button>
            <div className="flex-1">
              <h1 className="text-foreground font-display font-bold text-lg">{t("workout.title")}</h1>
              <p className="text-muted-foreground text-xs">{t("workout.upper_body")} • {totalExercises - skipped.size} {t("dash.exercises", { n: "" }).trim()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-muted/20 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-foreground font-display font-bold text-sm tabular-nums w-10 text-end">{progress}%</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-10 space-y-3">
          {exercises.map((exercise, idx) => {
            const isDone = completedExercises.includes(idx);
            const isSkipped = skipped.has(idx);

            return (
              <motion.div
                key={`${exercise.name}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                className={`transition-all duration-300 ${isSkipped ? "opacity-50" : isDone ? "opacity-60" : ""}`}
              >
                <div className="relative glass-card border border-border/30 rounded-2xl overflow-hidden">
                  <div className={`absolute ${isRTL ? "right-0" : "left-0"} top-0 bottom-0 w-1 ${isRTL ? "rounded-r-2xl" : "rounded-l-2xl"} transition-colors duration-300 ${
                    isDone ? "bg-primary" : isSkipped ? "bg-destructive/40" : "bg-border/20"
                  }`} />

                  <div className="flex items-stretch">
                    <button onClick={() => !isSkipped && navigate(`/exercise/${idx}`)} className="relative w-20 h-auto flex-shrink-0">
                      <img src={chestPressImg} alt={exercise.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-background/40" />
                      {isDone && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm">
                          <Check className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </button>

                    <button onClick={() => !isSkipped && navigate(`/exercise/${idx}`)} className="flex-1 px-4 py-3 flex flex-col justify-center min-w-0 text-start">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">{exercise.category}</span>
                      <h3 className={`font-display font-bold text-sm text-foreground leading-tight ${isSkipped ? "line-through text-muted-foreground" : isDone ? "line-through decoration-primary/40" : ""}`}>
                        {exercise.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Repeat className="w-3 h-3 text-muted-foreground/60" />
                          <span className="text-[11px] text-muted-foreground">{exercise.sets} × {exercise.reps}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground/60" />
                          <span className="text-[11px] text-muted-foreground">{exercise.rest} {t("workout.rest_label")}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {exercise.muscles.slice(0, 3).map((m) => (
                          <span key={m} className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted/15 text-muted-foreground/70 border border-border/20">{m}</span>
                        ))}
                      </div>
                    </button>

                    <div className="flex flex-col items-center justify-center gap-1 pe-2">
                      {isDone ? (
                        <button onClick={() => navigate(`/exercise/${idx}`)} className="p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <>
                          <button onClick={() => setReplaceIndex(idx)} className="p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground" title={t("dash.replace")}>
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleSkip(idx)} className={`p-2 rounded-lg hover:bg-muted/20 transition-colors ${isSkipped ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}>
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Sheet open={replaceIndex !== null} onOpenChange={(open) => !open && setReplaceIndex(null)}>
        <SheetContent side="bottom" className="bg-background border-border rounded-t-3xl max-h-[70vh]">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-foreground font-display">
              {t("dash.replace")} {replaceIndex !== null ? exercises[replaceIndex].name : ""}
            </SheetTitle>
            <p className="text-xs text-muted-foreground capitalize">
              {t("dash.same_movement", { cat: replaceCategory || "" })}
            </p>
          </SheetHeader>
          <div className="space-y-2 overflow-y-auto max-h-[50vh] pe-1">
            {alternatives.map((alt) => (
              <button key={alt.name} onClick={() => handleReplace(alt)} className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors text-start">
                <div>
                  <span className="text-sm font-medium text-foreground">{alt.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground">{alt.sets} {t("dash.sets")}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[10px] text-muted-foreground">{alt.reps} {t("dash.reps")}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[10px] text-muted-foreground">{alt.rest} {t("dash.rest")}</span>
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

export default ActiveWorkoutScreen;
