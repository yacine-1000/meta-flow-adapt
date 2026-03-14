import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface StreakShareCardProps {
  open: boolean;
  onClose: () => void;
}

export const StreakShareCard = ({ open, onClose }: StreakShareCardProps) => {
  const { userName, streak, completedDays } = useUser();
  const { t } = useLanguage();

  const displayName = userName || "User";
  const totalWorkouts = 48 + completedDays.length;
  const streakPoints = streak * 120;

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
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-[320px] rounded-3xl overflow-hidden border border-white/[0.12]"
            style={{
              background: "linear-gradient(160deg, rgba(20,30,25,0.92) 0%, rgba(10,18,14,0.95) 50%, rgba(8,14,10,0.98) 100%)",
              backdropFilter: "blur(60px)",
              WebkitBackdropFilter: "blur(60px)",
              boxShadow: "0 0 80px rgba(149,255,195,0.08), 0 0 40px rgba(149,255,195,0.04), 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            {/* Ambient glows */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(149,255,195,0.1) 0%, transparent 60%)" }}
            />
            <div
              className="absolute -bottom-20 left-1/4 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(109,235,255,0.06) 0%, transparent 70%)" }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 end-4 z-10 w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/[0.08] transition-colors"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <X className="w-3.5 h-3.5 text-muted-foreground/60" />
            </button>

            <div className="relative px-8 pt-10 pb-8 flex flex-col items-center">
              {/* Brand */}
              <p className="text-[11px] text-muted-foreground/40 tracking-[0.15em] uppercase font-medium mb-10">
                {t("share.brand")}
              </p>

              {/* Hero: Streak Points */}
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] mb-2 font-medium">
                {t("share.streak_points")}
              </p>
              <motion.div
                className="text-7xl font-display font-black tracking-tight mb-1"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(152 80% 78%) 60%, hsl(180 60% 72%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", damping: 22 }}
              >
                {streakPoints}
              </motion.div>

              {/* Divider */}
              <div className="w-10 h-px my-6" style={{ background: "linear-gradient(90deg, transparent, rgba(149,255,195,0.2), transparent)" }} />

              {/* Two supporting stats */}
              <motion.div
                className="flex items-center gap-3 text-[13px] text-muted-foreground/60 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span>{t("share.workouts", { n: totalWorkouts })}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                <span>{t("share.trained_this_week")}</span>
              </motion.div>

              {/* Affirmation */}
              <motion.p
                className="text-center text-xs text-muted-foreground/50 leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t("share.affirmation", { name: displayName })}
              </motion.p>

              {/* Download action */}
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/[0.08] transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="w-4 h-4 text-muted-foreground/50" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
