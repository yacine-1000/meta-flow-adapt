import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { Plus, X, Calendar } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Activity {
  sport: string;
  intensity: string;
  duration: string;
}

const ActivitiesScreen = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Record<string, Activity[]>>({
    Saturday: [
      { sport: "Tennis", intensity: "Moderate", duration: "60 min" },
      { sport: "Running", intensity: "Hard", duration: "45 min" },
    ],
  });

  const removeActivity = (day: string, idx: number) => {
    setActivities((a) => ({
      ...a,
      [day]: a[day]?.filter((_, i) => i !== idx) || [],
    }));
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/focus" />

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Weekly Activities</h1>
              <p className="text-muted-foreground text-xs mt-0.5">Add sports to each day of the week</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 mt-6 space-y-2.5 overflow-y-auto scrollbar-hide pb-4">
          {days.map((day, i) => {
            const dayActivities = activities[day] || [];
            const hasActivities = dayActivities.length > 0;
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-2xl p-4 transition-all ${hasActivities ? "glass-card-strong" : "glass-card"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground/40 w-8 font-medium">{day.slice(0, 3)}</span>
                    <span className="font-medium text-sm">{day}</span>
                  </div>
                  <button className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center text-primary/70 hover:bg-primary/15 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {hasActivities && (
                  <div className="mt-3 space-y-2 ml-11">
                    {dayActivities.map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-muted/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          <span className="text-xs font-medium text-primary/90">{act.sport}</span>
                          <span className="text-[10px] text-muted-foreground/50">{act.intensity}</span>
                          <span className="text-[10px] text-muted-foreground/50">{act.duration}</span>
                        </div>
                        <button onClick={() => removeActivity(day, idx)} className="text-muted-foreground/30 hover:text-muted-foreground transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <MetafiButton onClick={() => navigate("/equipment")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default ActivitiesScreen;
