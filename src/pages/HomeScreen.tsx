import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { Plus, Home, Dumbbell, User } from "lucide-react";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <MetafiScreen glowPosition="top">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-24">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-muted-foreground text-sm">Welcome back</p>
            <h1 className="font-display text-xl font-bold">Today's Workouts</h1>
          </div>
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            className="glass-card-strong rounded-3xl p-8 w-full text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-accent mx-auto flex items-center justify-center mb-6 shadow-glow">
              <Plus className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg font-semibold mb-2">No plan yet</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Create your first personalized training plan based on your schedule, sports, and goals.
            </p>
            <MetafiButton onClick={() => navigate("/sports")}>
              Create Your Plan
            </MetafiButton>
          </motion.div>

          <motion.div
            className="mt-6 glass-card rounded-2xl p-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <p className="text-muted-foreground text-xs">0 workouts completed this week</p>
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
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary" : "text-muted-foreground"}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default HomeScreen;
