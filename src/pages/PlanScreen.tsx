import { motion } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { Home, Dumbbell, User, ChevronRight, Activity, Coffee, Target, Flame, TrendingUp, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import metafiIcon from "@/assets/metafi-icon.png";

interface WorkoutDay {
  id: string;
  label: string;
  short: string;
  type: "lifting" | "sport" | "rest";
  title: string;
  subtitle: string;
  duration?: string;
  exercises?: number;
  intensity?: string;
  completed?: boolean;
  isToday?: boolean;
}

const weekPlan: WorkoutDay[] = [
  {
    id: "mon", label: "Monday", short: "M", type: "lifting",
    title: "Upper Body", subtitle: "Push + Pull",
    duration: "55 min", exercises: 6, completed: true, isToday: true,
  },
  {
    id: "tue", label: "Tuesday", short: "T", type: "rest",
    title: "Recovery", subtitle: "Active rest day",
  },
  {
    id: "wed", label: "Wednesday", short: "W", type: "lifting",
    title: "Lower Body", subtitle: "Squat + Hinge",
    duration: "50 min", exercises: 5,
  },
  {
    id: "thu", label: "Thursday", short: "T", type: "rest",
    title: "Recovery", subtitle: "Active rest day",
  },
  {
    id: "fri", label: "Friday", short: "F", type: "lifting",
    title: "Full Body", subtitle: "Compound focus",
    duration: "45 min", exercises: 5,
  },
  {
    id: "sat", label: "Saturday", short: "S", type: "sport",
    title: "Tennis", subtitle: "Moderate intensity",
    duration: "60 min", intensity: "Moderate",
  },
  {
    id: "sun", label: "Sunday", short: "S", type: "rest",
    title: "Full Rest", subtitle: "Recovery & mobility",
  },
];

const weekStats = {
  liftingSessions: 3,
  sportSessions: 1,
  totalVolume: "~12,400 lbs",
  avgDuration: "50 min",
  goal: "Build Muscle",
  level: "Intermediate",
  injuries: ["Shoulder"],
  equipment: ["Dumbbells", "Barbell + plates", "Cable machine"],
};

const typeConfig = {
  lifting: { icon: Dumbbell, color: "text-primary", bg: "bg-primary/15", border: "border-primary/20" },
  sport: { icon: Activity, color: "text-accent-foreground", bg: "bg-accent/30", border: "border-accent/20" },
  rest: { icon: Coffee, color: "text-muted-foreground", bg: "bg-muted/15", border: "border-muted/10" },
};

const PlanScreen = () => {
  const navigate = useNavigate();

  return (
    <MetafiScreen glowPosition="top" glowIntensity="medium">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-28">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-muted-foreground text-sm">Week 1 of 12</p>
            <h1 className="font-display text-2xl font-bold">Your Plan</h1>
          </div>
          <button
            onClick={() => navigate("/edit-plan")}
            className="glass-card rounded-xl px-3.5 py-2 flex items-center gap-1.5 hover:bg-muted/20 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            <span className="text-xs font-medium text-primary">Edit Plan</span>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-2.5 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { icon: Target, label: weekStats.goal, sub: "Goal" },
            { icon: TrendingUp, label: weekStats.level, sub: "Level" },
            { icon: Calendar, label: `${weekStats.liftingSessions + weekStats.sportSessions} days`, sub: "Active" },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-3 flex flex-col items-center text-center gap-1.5">
              <stat.icon className="w-3.5 h-3.5 text-primary/60" />
              <span className="text-xs font-semibold">{stat.label}</span>
              <span className="text-[9px] text-muted-foreground">{stat.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Volume + adaptation card */}
        <motion.div
          className="glass-card-strong rounded-2xl p-4 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. Weekly Volume</span>
              <p className="text-lg font-display font-bold mt-0.5">{weekStats.totalVolume}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Session</span>
              <p className="text-lg font-display font-bold mt-0.5 flex items-center gap-1 justify-end">
                <Clock className="w-3.5 h-3.5 text-primary/50" />
                {weekStats.avgDuration}
              </p>
            </div>
          </div>
          {weekStats.injuries.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
              <span className="text-[10px] text-muted-foreground">
                Shoulder-adapted — reduced overhead pressing volume
              </span>
            </div>
          )}
        </motion.div>

        <div className="h-8" />

        {/* Weekly mini bar */}
        <motion.div
          className="flex gap-2 mt-6 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {weekPlan.map((d) => {
            const cfg = typeConfig[d.type];
            return (
              <div key={d.id} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{d.short}</span>
                <div className={`w-full aspect-square rounded-xl flex items-center justify-center border transition-all ${cfg.bg} ${cfg.border} ${
                  d.isToday ? "ring-1 ring-primary/40" : ""
                } ${d.completed ? "opacity-60" : ""}`}>
                  {d.completed ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#95FFC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <cfg.icon className={`w-3 h-3 ${cfg.color} opacity-60`} />
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Day-by-day list */}
        <div className="space-y-2.5 mt-4">
          {weekPlan.map((day, i) => {
            const cfg = typeConfig[day.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={day.id}
                className={`rounded-2xl p-4 transition-all ${
                  day.isToday
                    ? "glass-card-strong border border-primary/20 shadow-glow-sm"
                    : "glass-card"
                } ${day.completed ? "opacity-50" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{day.title}</span>
                        {day.isToday && (
                          <span className="text-[9px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
                            Today
                          </span>
                        )}
                        {day.completed && (
                          <span className="text-[9px] font-medium text-primary/60">Done</span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{day.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {day.duration && (
                      <span className="text-[10px] text-muted-foreground">{day.duration}</span>
                    )}
                    {(day.type === "lifting" || day.type === "sport") && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
                    )}
                  </div>
                </div>

                {/* Exercise count or intensity tag */}
                {day.exercises && (
                  <div className="mt-3 ml-[52px] flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>{day.exercises} exercises</span>
                    <span className="text-muted-foreground/20">·</span>
                    <span>~{day.duration}</span>
                  </div>
                )}
                {day.type === "sport" && day.intensity && (
                  <div className="mt-3 ml-[52px] flex items-center gap-3 text-[10px] text-muted-foreground">
                    <Flame className="w-3 h-3 text-muted-foreground/40" />
                    <span>{day.intensity} intensity</span>
                    <span className="text-muted-foreground/20">·</span>
                    <span>{day.duration}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Equipment summary */}
        <motion.div
          className="glass-card rounded-2xl p-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Equipment Used</span>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {weekStats.equipment.map((eq) => (
              <span key={eq} className="text-[10px] text-muted-foreground bg-muted/15 rounded-full px-3 py-1.5 border border-border/30">
                {eq}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around">
            {[
              { icon: Home, label: "Home", active: false, path: "/dashboard" },
              { icon: Dumbbell, label: "Plan", active: true, path: "/plan" },
              { icon: User, label: "Profile", active: false, path: "/plan" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1"
              >
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/30"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary font-medium" : "text-muted-foreground/30"}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default PlanScreen;
