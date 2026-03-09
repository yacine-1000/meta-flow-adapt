import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useState, useMemo } from "react";

interface MetafiScreenProps {
  children: ReactNode;
  className?: string;
  showGlow?: boolean;
  glowPosition?: "top" | "center" | "bottom";
  glowIntensity?: "subtle" | "medium" | "strong";
  celebrate?: boolean;
}

const generateShimmer = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 8 + Math.random() * 84,         // spread across 8-92% width
    delay: 0.2 + Math.random() * 0.8,
    duration: 1.8 + Math.random() * 1.2,
    size: 1.5 + Math.random() * 2.5,
    drift: -20 + Math.random() * 40,
    glow: Math.random() > 0.5,
  }));

export const MetafiScreen = ({
  children,
  className = "",
  showGlow = true,
  glowPosition = "top",
  glowIntensity = "medium",
  celebrate = false,
}: MetafiScreenProps) => {
  const glowY = glowPosition === "top" ? "-15%" : glowPosition === "center" ? "35%" : "75%";
  const sizes = { subtle: "w-[250px] h-[250px]", medium: "w-[350px] h-[350px]", strong: "w-[450px] h-[450px]" };
  const opacities = { subtle: 0.12, medium: 0.18, strong: 0.25 };

  const [showBurst, setShowBurst] = useState(false);
  const containerControls = useAnimation();
  const shimmerParticles = useMemo(() => generateShimmer(16), []);

  useEffect(() => {
    if (celebrate) {
      setShowBurst(true);
      // Micro screen-shake for physicality
      containerControls.start({
        x: [0, -2, 3, -1, 2, 0],
        y: [0, 1, -1, 1, -1, 0],
        transition: { duration: 0.4, ease: "easeOut", delay: 0.05 },
      });
    }
  }, [celebrate, containerControls]);

  return (
    <div className={`metafi-screen ${className}`} style={{ overflow: "hidden" }}>
      {/* Deep ambient layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, #13263A 0%, #07111A 40%, #000000 100%)" }}
      />

      {showGlow && (
        <>
          {/* Main glow orb */}
          <motion.div
            className={`metafi-glow-orb ${sizes[glowIntensity]} left-1/2`}
            style={{ top: glowY, x: "-50%" }}
            animate={
              celebrate
                ? { opacity: [opacities[glowIntensity], 0.7, 0.35], scale: [1, 2.8, 1.6] }
                : { opacity: opacities[glowIntensity], scale: 1 }
            }
            transition={
              celebrate
                ? { duration: 2.8, ease: [0.16, 1, 0.3, 1], times: [0, 0.2, 1] }
                : { duration: 0.6 }
            }
          />

          {/* Secondary ambient orb */}
          <motion.div
            className="metafi-glow-orb w-[200px] h-[200px]"
            style={{
              top: "60%",
              left: "20%",
              background: "radial-gradient(circle, rgba(109, 235, 255, 0.15) 0%, rgba(109, 235, 255, 0) 70%)",
            }}
            animate={
              celebrate
                ? { opacity: [0.06, 0.2, 0.08], scale: [1, 1.5, 1.1] }
                : { opacity: 0.06, scale: 1 }
            }
            transition={celebrate ? { duration: 2, ease: "easeOut" } : { duration: 0.4 }}
          />
        </>
      )}

      {/* ===== CELEBRATION ===== */}
      <AnimatePresence>
        {showBurst && (
          <>
            {/* PHASE 1: The snap — a sharp bright flash that says "YES" */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(149, 255, 195, 0.6) 0%, rgba(149, 255, 195, 0.15) 40%, transparent 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], times: [0, 0.08, 1] }}
            />

            {/* White core flash — the "hit" */}
            <motion.div
              className="absolute pointer-events-none z-30"
              style={{
                top: "-5%",
                left: "50%",
                width: 200,
                height: 200,
                marginLeft: -100,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(149, 255, 195, 0.4) 30%, transparent 60%)",
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.8, 2.5] }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.1, 1] }}
            />

            {/* PHASE 2: Bloom — expanding mint glow that fills the top half */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                top: "-30%",
                left: "50%",
                width: 600,
                height: 600,
                marginLeft: -300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(149, 255, 195, 0.25) 0%, rgba(149, 255, 195, 0.08) 40%, transparent 65%)",
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 0.9, 0.4, 0], scale: [0.2, 1, 1.1, 1.2] }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], times: [0, 0.15, 0.6, 1] }}
            />

            {/* PHASE 2b: Side glows — atmosphere breathes outward */}
            {[-1, 1].map((dir) => (
              <motion.div
                key={`side-${dir}`}
                className="absolute pointer-events-none z-20"
                style={{
                  top: "5%",
                  left: dir === -1 ? "-10%" : undefined,
                  right: dir === 1 ? "-10%" : undefined,
                  width: 200,
                  height: 300,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(109, 235, 255, 0.12) 0%, transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 1.4] }}
                transition={{ duration: 2, delay: 0.1, ease: "easeOut" }}
              />
            ))}

            {/* PHASE 3: Single expanding ring — clean, satisfying */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                top: "3%",
                left: "50%",
                width: 80,
                height: 80,
                marginLeft: -40,
                borderRadius: "50%",
                border: "1px solid rgba(149, 255, 195, 0.6)",
                boxShadow: "0 0 20px rgba(149, 255, 195, 0.15)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 4, 5.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.6, delay: 0.05, ease: [0.16, 1, 0.3, 1], times: [0, 0.4, 1] }}
            />

            {/* PHASE 4: Shimmer particles — floating down like achievement dust */}
            {shimmerParticles.map((p) => (
              <motion.div
                key={`shimmer-${p.id}`}
                className="absolute pointer-events-none z-30 rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: "5%",
                  width: p.size,
                  height: p.size,
                  background: p.glow
                    ? "rgba(149, 255, 195, 0.9)"
                    : "rgba(255, 255, 255, 0.8)",
                  boxShadow: p.glow
                    ? `0 0 ${p.size * 4}px rgba(149, 255, 195, 0.5)`
                    : `0 0 ${p.size * 3}px rgba(255, 255, 255, 0.3)`,
                }}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, 80 + Math.random() * 200, 200 + Math.random() * 300],
                  x: [0, p.drift * 0.5, p.drift],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.2, 0, 0.2, 1],
                  times: [0, 0.3, 0.7, 1],
                }}
              />
            ))}

            {/* PHASE 5: Afterglow — warm tint that lingers, the "satisfaction" */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "linear-gradient(180deg, rgba(149, 255, 195, 0.06) 0%, transparent 50%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{
                duration: 3.5,
                ease: "easeOut",
                times: [0, 0.15, 0.3, 1],
              }}
              onAnimationComplete={() => setShowBurst(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Content with micro-shake */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col min-h-screen"
        {...(celebrate ? { animate: containerControls } : {})}
      >
        {children}
      </motion.div>
    </div>
  );
};