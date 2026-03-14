import { motion, AnimatePresence } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { WorkoutCelebration } from "@/components/WorkoutCelebration";
import { StreakShareCard } from "@/components/StreakShareCard";
import { Home, Dumbbell, User, ChevronRight, Flame, Timer, RotateCcw, Sparkles, ArrowLeftRight, X, Check } from "lucide-react";
import metafiIcon from "@/assets/metafi-icon.png";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

const weekDayShortKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const weekDaysBase = [
{ short: "M", active: true },
{ short: "T", active: false },
{ short: "W", active: true },
{ short: "T", active: false },
{ short: "F", active: true },
{ short: "S", active: false },
{ short: "S", active: false }];


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
{ name: "Face Pulls", sets: 3, reps: "15-20", rest: "45s", category: "shoulders" }];


const exerciseDatabase: Record<string, Exercise[]> = {
  chest: [
  { name: "Flat Barbell Bench Press", sets: 3, reps: "8-10", rest: "90s", category: "chest" },
  { name: "Cable Crossover", sets: 3, reps: "12-15", rest: "60s", category: "chest" },
  { name: "Push-Ups", sets: 3, reps: "15-20", rest: "45s", category: "chest" },
  { name: "Machine Chest Press", sets: 3, reps: "10-12", rest: "60s", category: "chest" },
  { name: "Pec Deck Fly", sets: 3, reps: "12-15", rest: "60s", category: "chest" }],

  back: [
  { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60s", category: "back" },
  { name: "T-Bar Row", sets: 3, reps: "8-10", rest: "90s", category: "back" },
  { name: "Pull-Ups", sets: 3, reps: "6-10", rest: "90s", category: "back" },
  { name: "Dumbbell Row", sets: 3, reps: "10-12", rest: "60s", category: "back" },
  { name: "Straight-Arm Pulldown", sets: 3, reps: "12-15", rest: "45s", category: "back" }],

  shoulders: [
  { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s", category: "shoulders" },
  { name: "Cable Lateral Raise", sets: 3, reps: "12-15", rest: "45s", category: "shoulders" },
  { name: "Rear Delt Fly", sets: 3, reps: "15-20", rest: "45s", category: "shoulders" },
  { name: "Arnold Press", sets: 3, reps: "10-12", rest: "60s", category: "shoulders" },
  { name: "Upright Row", sets: 3, reps: "10-12", rest: "60s", category: "shoulders" }]

};

const DashboardScreen = () => {
  const { userName, completedExercises, workoutDone, streak, completedDays, todayDayIndex, justCompleted, clearJustCompleted } = useUser();
  const { t } = useLanguage();
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [displayStreak, setDisplayStreak] = useState(streak);

  const weekDays = weekDaysBase.map((d, i) => ({
    ...d,
    shortKey: weekDayShortKeys[i],
    done: completedDays.includes(i),
    isToday: i === todayDayIndex
  }));

  const completedDaysCount = completedDays.length;
  const activeDaysCount = weekDaysBase.filter((d) => d.active).length;

  const replaceCategory = replaceIndex !== null ? exercises[replaceIndex].category : null;
  const alternatives = replaceCategory ?
  exerciseDatabase[replaceCategory]?.filter((alt) => alt.name !== exercises[replaceIndex!]?.name) ?? [] :
  [];

  const handleReplace = (alt: Exercise) => {
    if (replaceIndex === null) return;
    setExercises((prev) => prev.map((ex, i) => i === replaceIndex ? alt : ex));
    setSkipped((prev) => {const n = new Set(prev);n.delete(replaceIndex);return n;});
    setReplaceIndex(null);
  };

  const handleSkip = (index: number) => {
    setSkipped((prev) => {
      const n = new Set(prev);
      if (n.has(index)) n.delete(index);else n.add(index);
      return n;
    });
  };

  useEffect(() => {
    if (justCompleted && workoutDone) {
      setDisplayStreak(streak - 1);
      setShowCelebration(true);
    }
  }, [justCompleted, workoutDone]);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
    setDisplayStreak(streak);
    clearJustCompleted();
  }, [streak, clearJustCompleted]);

  useEffect(() => {
    if (!showCelebration) {
      setDisplayStreak(streak);
    }
  }, [streak, showCelebration]);

  const navigate = useNavigate();

  return (
    <MetafiScreen glowPosition="top" glowIntensity="medium">
      <WorkoutCelebration trigger={showCelebration} onComplete={handleCelebrationComplete} />
      <StreakShareCard open={showShareCard} onClose={() => setShowShareCard(false)} />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-28">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          
          <motion.button
            onClick={() => setShowShareCard(true)}
            className="glass-card rounded-xl px-2.5 py-1.5 flex items-center gap-1 h-10 cursor-pointer hover:bg-white/[0.08] transition-colors"
            whileTap={{ scale: 0.95 }}
            animate={showCelebration ? {} : {}}
            key={displayStreak}>
            
            <Flame className="w-3.5 h-3.5 text-primary" />
            <motion.span
              className="text-xs font-bold"
              key={displayStreak}
              initial={justCompleted ? { scale: 1.5, color: "#95FFC3" } : {}}
              animate={{ scale: 1, color: "inherit" }}
              transition={{ duration: 0.4 }}>
              
              {displayStreak}
            </motion.span>
          </motion.button>
          <img src={metafiIcon} alt="Metafi" className="w-10 h-10 object-contain" />
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}>
          
          <h1 className="font-display text-2xl font-bold">{t("dash.greeting", { name: userName || t("dash.default_name") })}</h1>
          
        </motion.div>

        {/* Week bar */}
        <motion.div
          className="flex gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}>
          
          {weekDays.map((d, i) =>
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] text-muted-foreground font-medium">{t(`day.${d.shortKey}`)}</span>
              <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-all ${
            d.done ? "bg-primary/20 border border-primary/40 text-primary" :
            d.active ? "glass-card-strong border border-primary/20" :
            "glass-card"}`
            }>
                {d.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="#95FFC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                {d.active && !d.done && <Dumbbell className="w-3 h-3 text-primary/60" />}
              </div>
            </div>
          )}
        </motion.div>

        {/* Progress card */}
        <div className="relative mt-6">
          <div className="absolute -z-10 -top-8 -left-6 w-36 h-36 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.12) 0%, transparent 70%)" }} />
          <div className="absolute -z-10 -bottom-6 -right-4 w-28 h-28 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(109,235,255,0.08) 0%, transparent 70%)" }} />
        





























          
        </div>

        {/* Today's workout card */}
        <div className="relative mt-6">
          <div className="absolute -z-10 -top-10 -right-8 w-44 h-44 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.10) 0%, transparent 70%)" }} />
        <motion.div
            className="relative rounded-3xl p-6 overflow-hidden border border-white/[0.08]"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.06)"
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />

          <div className="flex items-center justify-between mb-[29px]">
            <div>
              <h2 className="font-display text-lg font-bold">{t("dash.upper_body")}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t("dash.push_pull")}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" />
                <span>{t("dash.min", { n: "55" })}</span>
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t("dash.exercises", { n: exercises.length - skipped.size })}</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/[0.08] rounded-xl px-3 py-2 mb-5 border border-primary/10 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <p className="text-[10px] text-primary/80">{t("dash.adaptation")}</p>
          </div>

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
                      isSkipped ? "bg-muted/5 opacity-50" : "bg-muted/10 hover:bg-muted/20"}`
                      }
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}>
                      
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {isDone &&
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        }
                      <div>
                        <span className={`text-sm font-medium ${isDone ? "text-muted-foreground" : isSkipped ? "line-through text-muted-foreground" : ""}`}>
                          {ex.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-muted-foreground">{ex.sets} {t("dash.sets")}</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[10px] text-muted-foreground">{ex.reps} {t("dash.reps")}</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[10px] text-muted-foreground">{ex.rest} {t("dash.rest")}</span>
                        </div>
                      </div>
                    </div>
                    {isDone ?
                      <button
                        onClick={() => navigate(`/exercise/${i}`)}
                        className="ms-2 flex-shrink-0 p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground">
                        
                        <ChevronRight className="w-4 h-4" />
                      </button> :

                      <div className="flex items-center gap-1 ms-2 flex-shrink-0">
                        <button onClick={() => setReplaceIndex(i)} className="p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-primary" title={t("dash.replace")}>
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleSkip(i)} className={`p-2 rounded-lg hover:bg-muted/20 transition-colors ${isSkipped ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => !isSkipped && navigate(`/exercise/${i}`)} className="p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-primary">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      }
                  </motion.div>);

                })}
            </AnimatePresence>
          </div>
        </motion.div>
        </div>

        <motion.div className="mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <MetafiButton disabled={workoutDone} onClick={() => {if (!workoutDone) navigate("/active-workout");}}>
            {workoutDone ? t("dash.workout_complete") : t("dash.start_workout")}
          </MetafiButton>
        </motion.div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around">
            {[
            { icon: Home, label: t("nav.home"), active: true, path: "/dashboard" },
            { icon: Dumbbell, label: t("nav.plan"), active: false, path: "/plan" },
            { icon: User, label: t("nav.profile"), active: false, path: "/profile" }].
            map((item) =>
            <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1">
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/30"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary font-medium" : "text-muted-foreground/30"}`}>{item.label}</span>
              </button>
            )}
          </div>
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
          <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1">
            {alternatives.map((alt) =>
            <button
              key={alt.name}
              onClick={() => handleReplace(alt)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors text-start">
              
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
            )}
          </div>
        </SheetContent>
      </Sheet>
    </MetafiScreen>);

};

export default DashboardScreen;