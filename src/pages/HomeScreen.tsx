import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { useUser } from "@/contexts/UserContext";
import { Plus, Home, Dumbbell, User, TrendingUp, Calendar } from "lucide-react";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { userName } = useUser();
  const displayName = userName || "there";

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
            <p className="text-muted-foreground/60 text-xs tracking-widest uppercase">Welcome back</p>
            <h1 className="font-display text-2xl font-bold mt-1">
              Hi, <span className="text-gradient-mint">{displayName}</span>
            </h1>
          </div>
          <div className="w-11 h-11 rounded-2xl glass-card-strong flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {[
            { icon: Calendar, label: "This Week", value: "0 sessions" },
            { icon: TrendingUp, label: "Streak", value: "0 days" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary/70" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">{stat.label}</p>
                <p className="text-sm font-semibold mt-0.5">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Create plan card */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            className="glass-card-strong rounded-3xl p-8 w-full text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-accent mx-auto flex items-center justify-center mb-6 shadow-glow relative z-10">
              <Plus className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold mb-2 relative z-10">Create Your Plan</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-[280px] mx-auto relative z-10">
              Build a personalized training plan based on your schedule, sports, and goals.
            </p>
            <div className="relative z-10">
              <MetafiButton onClick={() => navigate("/sports")}>
                Get Started
              </MetafiButton>
            </div>
          </motion.div>
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around">
            {[
              { icon: Home, label: "Home", active: true },
              { icon: Dumbbell, label: "Plan", active: false },
              { icon: User, label: "Profile", active: false },
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center gap-1">
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/40"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary font-medium" : "text-muted-foreground/40"}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default HomeScreen;
