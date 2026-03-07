import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft, Plus, X } from "lucide-react";

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
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/focus")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">Add your sport activities</h1>
          <p className="text-muted-foreground text-sm mt-2">You can add multiple activities per day</p>
        </motion.div>

        <div className="flex-1 mt-8 space-y-3 overflow-y-auto scrollbar-hide pb-4">
          {days.map((day, i) => {
            const dayActivities = activities[day] || [];
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass-card rounded-2xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{day}</span>
                  <button className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {dayActivities.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {dayActivities.map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-xl bg-muted/20">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-primary">{act.sport}</span>
                          <span className="text-[10px] text-muted-foreground">{act.intensity}</span>
                          <span className="text-[10px] text-muted-foreground">{act.duration}</span>
                        </div>
                        <button onClick={() => removeActivity(day, idx)} className="text-muted-foreground">
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
