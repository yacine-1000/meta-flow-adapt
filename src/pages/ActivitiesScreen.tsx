import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, X, Calendar } from "lucide-react";

const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

interface Activity {
  sport: string;
  intensity: string;
  duration: string;
}

const ActivitiesScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [activities, setActivities] = useState<Record<string, Activity[]>>({
    saturday: [
      { sport: "tennis", intensity: "moderate", duration: "60" },
      { sport: "running", intensity: "hard", duration: "45" },
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
              <h1 className="font-display text-2xl font-bold">{t("activities.title")}</h1>
              <p className="text-muted-foreground text-xs mt-0.5">{t("activities.hint")}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 mt-6 space-y-2.5 overflow-y-auto scrollbar-hide pb-4">
          {dayKeys.map((dayKey, i) => {
            const dayActivities = activities[dayKey] || [];
            const hasActivities = dayActivities.length > 0;
            const dayLabel = t(`day.${dayKey}`);
            const shortLabel = dayLabel.slice(0, 3);
            return (
              <motion.div
                key={dayKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-2xl p-4 transition-all ${hasActivities ? "glass-card-strong" : "glass-card"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground/40 w-8 font-medium">{shortLabel}</span>
                    <span className="font-medium text-sm">{dayLabel}</span>
                  </div>
                  <button className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center text-primary/70 hover:bg-primary/15 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {hasActivities && (
                  <div className="mt-3 space-y-2 ms-11">
                    {dayActivities.map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-muted/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          <span className="text-xs font-medium text-primary/90">{t(`sport.${act.sport}`)}</span>
                          <span className="text-[10px] text-muted-foreground/50">{t(`intensity.${act.intensity}`)}</span>
                          <span className="text-[10px] text-muted-foreground/50">{act.duration} min</span>
                        </div>
                        <button onClick={() => removeActivity(dayKey, idx)} className="text-muted-foreground/30 hover:text-muted-foreground transition-colors">
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

        <MetafiButton onClick={() => navigate("/equipment")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default ActivitiesScreen;
