import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, X, Calendar, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const sportKeys = [
  "football", "padel", "pilates", "yoga", "tennis", "running",
  "hiking", "mma", "boxing", "swimming", "cycling", "basketball",
];

const durationOptions = [15, 30, 45, 60, 90, 120];

interface Activity {
  sport: string;
  intensity: string;
  duration: number;
}

const ActivitiesScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [activities, setActivities] = useState<Record<string, Activity[]>>({});
  const [addingDay, setAddingDay] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [selectedIntensity, setSelectedIntensity] = useState<string>("moderate");
  const [step, setStep] = useState<number>(1);

  const removeActivity = (day: string, idx: number) => {
    setActivities((a) => ({
      ...a,
      [day]: a[day]?.filter((_, i) => i !== idx) || [],
    }));
  };

  const openAddSheet = (day: string) => {
    setAddingDay(day);
    setSelectedSport(null);
    setSelectedDuration(60);
    setSelectedIntensity("moderate");
    setStep(1);
  };

  const confirmAdd = () => {
    if (!addingDay || !selectedSport) return;
    setActivities((a) => ({
      ...a,
      [addingDay]: [...(a[addingDay] || []), { sport: selectedSport, intensity: selectedIntensity, duration: selectedDuration }],
    }));
    setAddingDay(null);
  };

  const intensityKeys = [
    { key: "easy", label: t("activities.easy") },
    { key: "moderate", label: t("activities.moderate") },
    { key: "hard", label: t("activities.hard") },
  ];

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
                  <button
                    onClick={() => openAddSheet(dayKey)}
                    className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center text-primary/70 hover:bg-primary/15 transition-colors"
                  >
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
                          <span className="text-[10px] text-muted-foreground/50">{t(`activities.${act.intensity}`)}</span>
                          <span className="text-[10px] text-muted-foreground/50">{act.duration} {t("duration.min", { n: "" }).trim()}</span>
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

      <Sheet open={addingDay !== null} onOpenChange={(open) => !open && setAddingDay(null)}>
        <SheetContent side="bottom" className="bg-background border-border rounded-t-3xl max-h-[80vh]">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-foreground font-display">
              {t("activities.add")} — {addingDay ? t(`day.${addingDay}`) : ""}
            </SheetTitle>
          </SheetHeader>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2 overflow-y-auto max-h-[50vh] pe-1">
                <p className="text-xs text-muted-foreground mb-3">{t("activities.select_sport")}</p>
                <div className="grid grid-cols-3 gap-2">
                  {sportKeys.map((sport) => (
                    <button
                      key={sport}
                      onClick={() => { setSelectedSport(sport); setStep(2); }}
                      className={`py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                        selectedSport === sport ? "chip-selected" : "glass-card hover:border-primary/10"
                      }`}
                    >
                      {t(`sport.${sport}`)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-3">{t("activities.select_duration")}</p>
                  <div className="flex flex-wrap gap-2">
                    {durationOptions.map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDuration(d)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          selectedDuration === d ? "chip-selected" : "glass-card"
                        }`}
                      >
                        {d} {t("duration.min", { n: "" }).trim()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-3">{t("activities.select_intensity")}</p>
                  <div className="flex gap-2">
                    {intensityKeys.map((int) => (
                      <button
                        key={int.key}
                        onClick={() => setSelectedIntensity(int.key)}
                        className={`flex-1 py-3 rounded-xl text-xs font-medium transition-all ${
                          selectedIntensity === int.key ? "chip-selected" : "glass-card"
                        }`}
                      >
                        {int.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={confirmAdd}
                  className="w-full py-3 rounded-full bg-gradient-accent text-primary-foreground font-semibold text-sm shadow-glow-sm"
                >
                  {t("activities.add_confirm")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    </MetafiScreen>
  );
};

export default ActivitiesScreen;
