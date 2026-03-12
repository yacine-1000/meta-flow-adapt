import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Download, Flame, Trophy, Dumbbell, Calendar } from "lucide-react";
import metafiIcon from "@/assets/metafi-icon.png";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface StreakShareCardProps {
  open: boolean;
  onClose: () => void;
}

export const StreakShareCard = ({ open, onClose }: StreakShareCardProps) => {
  const { userName, streak, completedExercises, completedDays } = useUser();
  const { t } = useLanguage();

  const displayName = userName || "User";
  const totalWorkouts = 48 + completedDays.length;
  const thisWeek = completedDays.length;
  const streakPoints = streak * 120;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Metafi",
          text: t("share.affirmation", {
            name: displayName,
            streak: streak,
            total: totalWorkouts,
            week: thisWeek,
          }),
        });
      } catch {}
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-[360px] rounded-3xl overflow-hidden border border-white/[0.1]"
            style={{
              background: "linear-gradient(160deg, rgba(20,25,20,0.97) 0%, rgba(10,14,10,0.99) 100%)",
              boxShadow: "0 0 80px rgba(149,255,195,0.08), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.12) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(109,235,255,0.06) 0%, transparent 70%)" }} />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 end-4 z-10 w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="relative px-8 pt-10 pb-8">
              {/* Brand */}
              <div className="flex items-center justify-center mb-8">
                <img src={metafiIcon} alt="Metafi" className="w-8 h-8 object-contain opacity-60" />
              </div>

              {/* Hero: Streak Points */}
              <div className="text-center mb-8">
                <p className="text-[11px] text-muted-foreground/60 uppercase tracking-[0.2em] mb-3 font-medium">
                  {t("share.streak_points")}
                </p>
                <motion.div
                  className="text-6xl font-display font-black tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(152 80% 80%) 50%, hsl(180 70% 70%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: "spring", damping: 20 }}
                >
                  {streakPoints}
                </motion.div>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-7" />

              {/* 3 Supporting Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  {
                    icon: Flame,
                    label: t("share.current_streak"),
                    value: t("share.days", { n: streak }),
                  },
                  {
                    icon: Trophy,
                    label: t("share.total_workouts"),
                    value: t("share.workouts", { n: totalWorkouts }),
                  },
                  {
                    icon: Calendar,
                    label: t("share.this_week"),
                    value: t("share.weekly_workouts", { n: thisWeek }),
                  },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center text-center gap-2 py-3 px-2 rounded-2xl border border-white/[0.05]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    <metric.icon className="w-4 h-4 text-primary/50" />
                    <span className="text-sm font-bold text-foreground">{metric.value}</span>
                    <span className="text-[9px] text-muted-foreground/50 leading-tight">{metric.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Affirmation */}
              <motion.p
                className="text-center text-xs text-muted-foreground/70 leading-relaxed mb-8 max-w-[280px] mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t("share.affirmation", {
                  name: displayName,
                  streak: streak,
                  total: totalWorkouts,
                  week: thisWeek,
                })}
              </motion.p>

              {/* Actions */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(152 70% 55%) 100%)",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "0 4px 20px rgba(149,255,195,0.2)",
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  {t("share.share")}
                </button>
                <button
                  onClick={onClose}
                  className="w-14 flex items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
