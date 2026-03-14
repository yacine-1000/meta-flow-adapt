import { motion } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { Home, Dumbbell, User, Target, TrendingUp, Calendar, Clock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const dayShortKeys = ["M", "T", "W", "Th", "F", "S", "Su"];
const dayFullKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const liftingDays = [0, 2, 4]; // Mon, Wed, Fri

const PlanScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const weekStats = {
    liftingSessions: 3,
    sportSessions: 1,
    avgDuration: "50 min"
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="medium">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-28">
        <motion.div
          className="flex items-center justify-between mb-[52px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          
          <div>
            
            <h1 className="font-display text-2xl font-bold">{t("plan.your_plan")}</h1>
          </div>
          <button
            onClick={() => navigate("/edit-plan")}
            className="glass-card rounded-xl px-3.5 py-2 flex items-center gap-1.5 hover:bg-muted/20 transition-colors">
            
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            <span className="text-xs font-medium text-primary">{t("plan.edit")}</span>
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-2.5 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}>
          
          {[
          { icon: Target, label: t("goal.muscle"), sub: t("plan.goal") },
          { icon: TrendingUp, label: t("level.intermediate"), sub: t("plan.level") },
          { icon: Calendar, label: `${weekStats.liftingSessions + weekStats.sportSessions} ${t("home.days", { n: "" }).trim()}`, sub: t("plan.active") }].
          map((stat, i) =>
          <div key={i} className="glass-card rounded-xl p-3 flex flex-col items-center text-center gap-1.5">
              <stat.icon className="w-3.5 h-3.5 text-primary/60" />
              <span className="text-xs font-semibold">{stat.label}</span>
              <span className="text-[9px] text-muted-foreground">{stat.sub}</span>
            </div>
          )}
        </motion.div>

        {/* Avg session + adaptation */}
        


















        

        {/* Lifting Days Calendar */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium mb-3 px-1">
            {t("plan.lifting_calendar")}
          </p>
          <div className="flex gap-2">
            {dayFullKeys.map((fullKey, i) => {
              const isLifting = liftingDays.includes(i);
              return (
                <div key={fullKey} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[9px] text-muted-foreground/40 font-medium">{t(`day.${dayShortKeys[i]}`)}</span>
                  <div className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                  isLifting ?
                  "bg-primary/15 border border-primary/30" :
                  "glass-card"}`
                  }>
                    {isLifting && <Dumbbell className="w-3.5 h-3.5 text-primary" />}
                  </div>
                </div>);

            })}
          </div>
        </motion.div>

        <div className="h-14" />

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around pt-[20px] pb-[23px]">
            {[
            { icon: Home, label: t("nav.home"), active: false, path: "/dashboard" },
            { icon: Dumbbell, label: t("nav.plan"), active: true, path: "/plan" },
            { icon: User, label: t("nav.profile"), active: false, path: "/profile" }].
            map((item) =>
            <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1">
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/30"}`} />
                
              </button>
            )}
          </div>
        </div>
      </div>
    </MetafiScreen>);

};

export default PlanScreen;