import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, Home, Dumbbell, User, TrendingUp, Calendar } from "lucide-react";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { userName } = useUser();
  const { t } = useLanguage();
  const displayName = userName || "there";

  return (
    <MetafiScreen glowPosition="top" glowIntensity="medium">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-28">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          
          <div>
            <p className="text-muted-foreground/60 text-xs tracking-widest uppercase">{t("home.welcome_back")}</p>
            <h1 className="font-display text-2xl font-bold mt-1 text-gradient-mint">
              {t("home.hi", { name: displayName })}
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}>
          
          {[
          { icon: Calendar, label: t("home.this_week"), value: t("home.sessions", { n: "0" }) },
          { icon: TrendingUp, label: t("home.streak"), value: t("home.days", { n: "0" }) }].
          map((stat, i) => {}









          )}
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}>
          
          <div className="glass-card-strong rounded-3xl p-8 w-full text-center relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            





            
            <h2 className="font-display text-xl font-bold mb-2 relative z-10">{t("home.create_plan")}</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-[280px] mx-auto relative z-10">
              {t("home.create_desc")}
            </p>
            <div className="relative z-10">
              <MetafiButton onClick={() => navigate("/sports")}>
                {t("home.get_started")}
              </MetafiButton>
            </div>
          </div>
        </motion.div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around">
            {[
            { icon: Home, label: t("nav.home"), active: true, path: "/home" },
            { icon: Dumbbell, label: t("nav.plan"), active: false, path: "/plan" },
            { icon: User, label: t("nav.profile"), active: false, path: "/profile" }].
            map((item) =>
            <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1">
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/40"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary font-medium" : "text-muted-foreground/40"}`}>{item.label}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </MetafiScreen>);

};

export default HomeScreen;