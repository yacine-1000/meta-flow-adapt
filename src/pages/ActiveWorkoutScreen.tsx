import { motion } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { ArrowLeft, ChevronRight, Check, Dumbbell, Clock, Repeat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import chestPressImg from "@/assets/chest_press.jpg";

const exercises = [
  { name: "Dumbbell Bench Press", category: "Chest", sets: 3, reps: "8-10", rest: "90s", muscles: ["Pectorals", "Triceps", "Anterior Deltoid"] },
  { name: "Incline DB Fly", category: "Chest", sets: 3, reps: "10-12", rest: "60s", muscles: ["Upper Pectorals", "Anterior Deltoid"] },
  { name: "Barbell Row", category: "Back", sets: 3, reps: "8-10", rest: "90s", muscles: ["Lats", "Rhomboids", "Biceps"] },
  { name: "Lat Pulldown", category: "Back", sets: 3, reps: "10-12", rest: "60s", muscles: ["Latissimus Dorsi", "Biceps"] },
  { name: "Lateral Raises", category: "Shoulders", sets: 3, reps: "12-15", rest: "45s", muscles: ["Lateral Deltoid", "Traps"] },
  { name: "Face Pulls", category: "Shoulders", sets: 3, reps: "15-20", rest: "45s", muscles: ["Rear Deltoid", "Rhomboids", "External Rotators"] },
];

const ActiveWorkoutScreen = () => {
  const navigate = useNavigate();
  const { completedExercises } = useUser();

  const completedCount = completedExercises.length;
  const totalExercises = exercises.length;
  const progress = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="px-6 pt-14 pb-4 relative z-20">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex-1">
              <h1 className="text-foreground font-display font-bold text-lg">Today's Workout</h1>
              <p className="text-muted-foreground text-xs">Upper Body • {totalExercises} exercises</p>
            </div>
            <div className="text-right">
              <p className="text-foreground font-display font-bold text-sm">{completedCount}/{totalExercises}</p>
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Done</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-muted/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Exercise cards */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-10 space-y-3">
          {exercises.map((exercise, idx) => {
            const isDone = completedExercises.includes(idx);

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                onClick={() => navigate(`/exercise/${idx}`)}
                className={`w-full text-left rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDone ? "opacity-60" : ""
                }`}
              >
                {/* Card with image strip */}
                <div className="relative glass-card border border-border/30 rounded-2xl overflow-hidden">
                  {/* Completion indicator strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-colors duration-300 ${
                    isDone ? "bg-primary" : "bg-border/20"
                  }`} />

                  <div className="flex items-stretch">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 flex-shrink-0">
                      <img src={chestPressImg} alt={exercise.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-background/40" />
                      {isDone && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm">
                          <Check className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-4 py-3 flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{exercise.category}</span>
                      </div>
                      <h3 className={`font-display font-bold text-sm text-foreground leading-tight ${isDone ? "line-through decoration-primary/40" : ""}`}>
                        {exercise.name}
                      </h3>

                      {/* Stats */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Repeat className="w-3 h-3 text-muted-foreground/60" />
                          <span className="text-[11px] text-muted-foreground">{exercise.sets} × {exercise.reps}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground/60" />
                          <span className="text-[11px] text-muted-foreground">{exercise.rest} rest</span>
                        </div>
                      </div>

                      {/* Muscles */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {exercise.muscles.slice(0, 3).map((m) => (
                          <span key={m} className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted/15 text-muted-foreground/70 border border-border/20">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center pr-3">
                      <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </MetafiScreen>
  );
};

export default ActiveWorkoutScreen;
