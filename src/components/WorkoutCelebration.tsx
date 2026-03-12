import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface WorkoutCelebrationProps {
  trigger: boolean;
  onComplete: () => void;
}

export const WorkoutCelebration = ({ trigger, onComplete }: WorkoutCelebrationProps) => {
  const [phase, setPhase] = useState<"idle" | "collect" | "shoot" | "done">("idle");

  useEffect(() => {
    if (trigger) {
      setPhase("collect");
      setTimeout(() => setPhase("shoot"), 600);
      setTimeout(() => setPhase("done"), 1100);
      setTimeout(() => {
        setPhase("idle");
        onComplete();
      }, 1500);
    }
  }, [trigger, onComplete]);

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {/* Phase 1: Green energy gathers at center */}
        {(phase === "collect" || phase === "shoot") && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: "55%" }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: phase === "shoot" ? [1, 0] : [0, 1],
              scale: phase === "shoot" ? [1, 0.2] : [0.3, 1],
              y: phase === "shoot" ? [0, -400] : 0,
            }}
            transition={{
              duration: phase === "shoot" ? 0.5 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="w-20 h-20 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(149,255,195,0.9) 0%, rgba(149,255,195,0.3) 50%, transparent 70%)",
                boxShadow: "0 0 60px rgba(149,255,195,0.4), 0 0 120px rgba(149,255,195,0.2)",
              }}
            />
          </motion.div>
        )}

        {/* Phase 2: Trail effect as energy shoots up */}
        {phase === "shoot" && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[2px]"
            style={{ top: "15%", height: "40%" }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 1] }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(to top, transparent, rgba(149,255,195,0.6), transparent)",
              }}
            />
          </motion.div>
        )}

        {/* Phase 3: Impact flash at streak card position */}
        {phase === "done" && (
          <>
            <motion.div
              className="absolute left-0 right-0"
              style={{ top: "8%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                className="mx-auto w-32 h-16 rounded-2xl"
                style={{
                  background: "radial-gradient(ellipse, rgba(149,255,195,0.5) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
            </motion.div>

            {/* Expanding ring at top */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: "10%", width: 40, height: 40, marginLeft: -20 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  border: "1px solid rgba(149,255,195,0.5)",
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
