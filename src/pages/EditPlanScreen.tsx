import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { ChevronDown, ChevronUp, Check, Dumbbell, Target, Gem, Zap, AlertTriangle, Calendar, Crosshair, Plus, X, Activity } from "lucide-react";

// --- Data ---
const goalOptions = [
  { id: "strength", label: "Build Strength", icon: Dumbbell },
  { id: "muscle", label: "Build Muscle", icon: Gem },
  { id: "performance", label: "Athletic Performance", icon: Zap },
  { id: "general", label: "General Fitness", icon: Target },
];

const sportOptions = ["Football", "Padel", "Pilates", "Yoga", "Tennis", "Running", "Basketball", "Swimming", "Cycling", "Boxing"];

const injuryCategories = [
  { name: "Lower Body", items: ["Knee", "Ankle", "Hip", "Hamstring", "Calf"] },
  { name: "Back & Neck", items: ["Lower back", "Upper back", "Neck"] },
  { name: "Upper Body", items: ["Shoulder", "Elbow", "Wrist"] },
];

const dayOptions = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DayActivity {
  sport: string;
  intensity: string;
  duration: string;
}

// --- Section Component ---
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
  <motion.div
    className="glass-card rounded-2xl overflow-hidden"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      {open ? (
        <ChevronUp className="w-4 h-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
    {open && <div className="px-4 pb-4 pt-0">{children}</div>}
  </motion.div>
);

// --- Main Screen ---
const EditPlanScreen = () => {
  const navigate = useNavigate();

  const [openSection, setOpenSection] = useState<string | null>("goal");
  const [selectedGoal, setSelectedGoal] = useState("muscle");
  const [selectedSports, setSelectedSports] = useState<string[]>(["Tennis"]);
  const [selectedInjuries, setSelectedInjuries] = useState<string[]>(["Shoulder"]);
  const [selectedDays, setSelectedDays] = useState<string[]>(["mon", "wed", "fri"]);
  const [focusValues, setFocusValues] = useState<Record<string, number>>({
    lifting: 8, Tennis: 5,
  });
  const [activities, setActivities] = useState<Record<string, DayActivity[]>>({
    Saturday: [
      { sport: "Tennis", intensity: "Moderate", duration: "60 min" },
    ],
  });

  const removeActivity = (day: string, idx: number) => {
    setActivities((a) => ({
      ...a,
      [day]: a[day]?.filter((_, i) => i !== idx) || [],
    }));
  };

  const toggleSection = (id: string) =>
    setOpenSection((prev) => (prev === id ? null : id));

  const toggleItem = (
    list: string[],
    setList: (v: string[]) => void,
    item: string
  ) => {
    setList(
      list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
    );
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/plan" />

        <motion.div
          className="mt-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold">Edit Your Plan</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adjust your preferences and we'll rebuild your plan.
          </p>
        </motion.div>

        <div className="flex-1 space-y-3">
          {/* Goal */}
          <Section
            title="Goal"
            icon={Target}
            open={openSection === "goal"}
            onToggle={() => toggleSection("goal")}
          >
            <div className="grid grid-cols-2 gap-2">
              {goalOptions.map((g) => {
                const active = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`rounded-xl p-3 flex items-center gap-2.5 border transition-all text-left ${
                      active
                        ? "border-primary/40 bg-primary/10"
                        : "border-border/30 bg-muted/10 hover:bg-muted/20"
                    }`}
                  >
                    <g.icon className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                      {g.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Sports */}
          <Section
            title={`Sports${selectedSports.length > 0 ? ` (${selectedSports.length})` : ""}`}
            icon={Zap}
            open={openSection === "sports"}
            onToggle={() => toggleSection("sports")}
          >
            <div className="flex flex-wrap gap-2">
              {sportOptions.map((sport) => {
                const active = selectedSports.includes(sport);
                return (
                  <button
                    key={sport}
                    onClick={() => toggleItem(selectedSports, setSelectedSports, sport)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                      active
                        ? "border-primary/40 bg-primary/10 text-foreground"
                        : "border-border/30 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    {active && <Check className="w-3 h-3 inline mr-1.5 text-primary" />}
                    {sport}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Injuries */}
          <Section
            title={`Injuries${selectedInjuries.length > 0 ? ` (${selectedInjuries.length})` : ""}`}
            icon={AlertTriangle}
            open={openSection === "injuries"}
            onToggle={() => toggleSection("injuries")}
          >
            <div className="space-y-3">
              {injuryCategories.map((cat) => (
                <div key={cat.name}>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {cat.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {cat.items.map((item) => {
                      const active = selectedInjuries.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleItem(selectedInjuries, setSelectedInjuries, item)}
                          className={`rounded-full px-3 py-1.5 text-[11px] font-medium border transition-all ${
                            active
                              ? "border-destructive/40 bg-destructive/10 text-foreground"
                              : "border-border/30 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                          }`}
                        >
                          {active && <Check className="w-3 h-3 inline mr-1 text-destructive" />}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Lifting Days */}
          <Section
            title={`Lifting Days (${selectedDays.length})`}
            icon={Calendar}
            open={openSection === "days"}
            onToggle={() => toggleSection("days")}
          >
            <div className="flex gap-2">
              {dayOptions.map((d) => {
                const active = selectedDays.includes(d.id);
                return (
                  <button
                    key={d.id}
                    onClick={() => toggleItem(selectedDays, setSelectedDays, d.id)}
                    className={`flex-1 aspect-square rounded-xl flex items-center justify-center border text-xs font-semibold transition-all ${
                      active
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-border/30 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </Section>
        </div>

        {/* Save button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MetafiButton onClick={() => navigate("/generating")} className="w-full">
            Regenerate Plan
          </MetafiButton>
        </motion.div>
      </div>
    </MetafiScreen>
  );
};

export default EditPlanScreen;
