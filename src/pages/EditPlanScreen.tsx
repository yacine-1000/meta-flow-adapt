import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronUp, Check, Dumbbell, Target, Gem, Zap, AlertTriangle, Calendar, Crosshair, Plus, X, Activity } from "lucide-react";

const Section = ({
  title,
  icon: Icon,
  open,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ElementType;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <motion.div className="glass-card rounded-2xl overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <button onClick={onToggle} className="w-full flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
    </button>
    {open && <div className="px-4 pb-4 pt-0">{children}</div>}
  </motion.div>
);

const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayIdKeys = [
  { id: "mon", key: "day.mon" },
  { id: "tue", key: "day.tue" },
  { id: "wed", key: "day.wed" },
  { id: "thu", key: "day.thu" },
  { id: "fri", key: "day.fri" },
  { id: "sat", key: "day.sat" },
  { id: "sun", key: "day.sun" },
];

const sportOptionKeys = ["football", "padel", "pilates", "yoga", "tennis", "running", "basketball", "swimming", "cycling", "boxing"];

interface DayActivity {
  sport: string;
  intensity: string;
  duration: string;
}

const EditPlanScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const [openSection, setOpenSection] = useState<string | null>("goal");
  const [selectedGoal, setSelectedGoal] = useState("muscle");
  const [selectedSports, setSelectedSports] = useState<string[]>(["tennis"]);
  const [selectedInjuries, setSelectedInjuries] = useState<string[]>(["shoulder"]);
  const [selectedDays, setSelectedDays] = useState<string[]>(["mon", "wed", "fri"]);
  const [focusValues, setFocusValues] = useState<Record<string, number>>({ lifting: 8, tennis: 5 });
  const [activities, setActivities] = useState<Record<string, DayActivity[]>>({
    saturday: [{ sport: "tennis", intensity: "moderate", duration: "60 min" }],
  });

  const goalOptions = [
    { id: "strength", labelKey: "goal.strength", icon: Dumbbell },
    { id: "muscle", labelKey: "goal.muscle", icon: Gem },
    { id: "performance", labelKey: "goal.performance", icon: Zap },
    { id: "general", labelKey: "goal.general", icon: Target },
  ];

  const injuryCategories = [
    { nameKey: "injuries.lower_body", items: ["knee", "ankle", "hip", "hamstring", "calf"] },
    { nameKey: "injuries.back_neck", items: ["lower_back", "upper_back", "neck"] },
    { nameKey: "injuries.upper_body", items: ["shoulder", "elbow", "wrist"] },
  ];

  const removeActivity = (day: string, idx: number) => {
    setActivities((a) => ({ ...a, [day]: a[day]?.filter((_, i) => i !== idx) || [] }));
  };

  const toggleSection = (id: string) => setOpenSection((prev) => (prev === id ? null : id));

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/plan" />

        <motion.div className="mt-6 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">{t("edit.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("edit.desc")}</p>
        </motion.div>

        <div className="flex-1 space-y-3">
          <Section title={t("plan.goal")} icon={Target} open={openSection === "goal"} onToggle={() => toggleSection("goal")}>
            <div className="grid grid-cols-2 gap-2">
              {goalOptions.map((g) => {
                const active = selectedGoal === g.id;
                return (
                  <button key={g.id} onClick={() => setSelectedGoal(g.id)}
                    className={`rounded-xl p-3 flex items-center gap-2.5 border transition-all text-start ${
                      active ? "border-primary/40 bg-primary/10" : "border-border/30 bg-muted/10 hover:bg-muted/20"
                    }`}
                  >
                    <g.icon className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{t(g.labelKey)}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title={`${t("edit.sports")}${selectedSports.length > 0 ? ` (${selectedSports.length})` : ""}`} icon={Zap} open={openSection === "sports"} onToggle={() => toggleSection("sports")}>
            <div className="flex flex-wrap gap-2">
              {sportOptionKeys.map((sport) => {
                const active = selectedSports.includes(sport);
                return (
                  <button key={sport} onClick={() => toggleItem(selectedSports, setSelectedSports, sport)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                      active ? "border-primary/40 bg-primary/10 text-foreground" : "border-border/30 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    {active && <Check className="w-3 h-3 inline me-1.5 text-primary" />}
                    {t(`sport.${sport}`)}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title={t("edit.focus")} icon={Crosshair} open={openSection === "focus"} onToggle={() => toggleSection("focus")}>
            <div className="space-y-4">
              {[
                { id: "lifting", label: t("focus.weight_lifting"), icon: Dumbbell },
                ...selectedSports.map((s) => ({ id: s, label: t(`sport.${s}`), icon: Activity })),
              ].map((area) => (
                <div key={area.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <area.icon className="w-3.5 h-3.5 text-primary/60" />
                      <span className="text-xs font-medium">{area.label}</span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-primary font-display font-bold text-sm">{focusValues[area.id] ?? 5}</span>
                      <span className="text-muted-foreground/40 text-[10px]">/10</span>
                    </div>
                  </div>
                  <input type="range" min={0} max={10} value={focusValues[area.id] ?? 5}
                    onChange={(e) => setFocusValues((v) => ({ ...v, [area.id]: Number(e.target.value) }))}
                    className="w-full h-[5px] rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(focusValues[area.id] ?? 5) * 10}%, rgba(255,255,255,0.06) ${(focusValues[area.id] ?? 5) * 10}%, rgba(255,255,255,0.06) 100%)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </Section>

          <Section title={`${t("edit.injuries")}${selectedInjuries.length > 0 ? ` (${selectedInjuries.length})` : ""}`} icon={AlertTriangle} open={openSection === "injuries"} onToggle={() => toggleSection("injuries")}>
            <div className="space-y-3">
              {injuryCategories.map((cat) => (
                <div key={cat.nameKey}>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t(cat.nameKey)}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {cat.items.map((item) => {
                      const active = selectedInjuries.includes(item);
                      return (
                        <button key={item} onClick={() => toggleItem(selectedInjuries, setSelectedInjuries, item)}
                          className={`rounded-full px-3 py-1.5 text-[11px] font-medium border transition-all ${
                            active ? "border-destructive/40 bg-destructive/10 text-foreground" : "border-border/30 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                          }`}
                        >
                          {active && <Check className="w-3 h-3 inline me-1 text-destructive" />}
                          {t(`injury.${item}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={`${t("edit.lifting_days")} (${selectedDays.length})`} icon={Calendar} open={openSection === "days"} onToggle={() => toggleSection("days")}>
            <div className="flex gap-2">
              {dayIdKeys.map((d) => {
                const active = selectedDays.includes(d.id);
                return (
                  <button key={d.id} onClick={() => toggleItem(selectedDays, setSelectedDays, d.id)}
                    className={`flex-1 aspect-square rounded-xl flex items-center justify-center border text-xs font-semibold transition-all ${
                      active ? "border-primary/40 bg-primary/15 text-primary" : "border-border/30 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    {t(d.key)}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title={t("edit.activities")} icon={Calendar} open={openSection === "activities"} onToggle={() => toggleSection("activities")}>
            <div className="space-y-2">
              {dayKeys.map((dayKey) => {
                const dayActs = activities[dayKey] || [];
                return (
                  <div key={dayKey} className="rounded-xl p-3 bg-muted/5 border border-border/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{t(`day.${dayKey}`)}</span>
                      <button className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary/60 hover:bg-primary/15 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    {dayActs.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {dayActs.map((act, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-muted/10">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-primary/50" />
                              <span className="text-[11px] font-medium text-primary/90">{t(`sport.${act.sport}`)}</span>
                              <span className="text-[10px] text-muted-foreground/50">{t(`intensity.${act.intensity}`)}</span>
                              <span className="text-[10px] text-muted-foreground/50">{act.duration}</span>
                            </div>
                            <button onClick={() => removeActivity(dayKey, idx)} className="text-muted-foreground/30 hover:text-muted-foreground transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        </div>

        <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <MetafiButton onClick={() => navigate("/generating")} className="w-full">
            {t("edit.regenerate")}
          </MetafiButton>
        </motion.div>
      </div>
    </MetafiScreen>
  );
};

export default EditPlanScreen;
