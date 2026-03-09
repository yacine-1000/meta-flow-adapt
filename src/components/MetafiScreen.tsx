import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface MetafiScreenProps {
  children: ReactNode;
  className?: string;
  showGlow?: boolean;
  glowPosition?: "top" | "center" | "bottom";
  glowIntensity?: "subtle" | "medium" | "strong";
  celebrate?: boolean;
}

// Generate random particles for the burst effect
const generateParticles = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 20 - 10,
    distance: 120 + Math.random() * 280,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 0.3,
    duration: 0.8 + Math.random() * 0.6,
    color: Math.random() > 0.3 ? "rgba(149, 255, 195," : "rgba(109, 235, 255,",
  }));

const particles = generateParticles(24);

// Ring positions for the ripple
const rings = [
  { delay: 0, scale: [0, 2.5], opacity: [0.4, 0] },
  { delay: 0.15, scale: [0, 3], opacity: [0.3, 0] },
  { delay: 0.3, scale: [0, 3.5], opacity: [0.2, 0] },
];

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

  // Track celebration trigger for one-shot burst
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (celebrate) {
      setShowBurst(true);
    }
  }, [celebrate]);

  return (
    <div className={`metafi-screen ${className}`}>
      {/* Deep ambient layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, #13263A 0%, #07111A 40%, #000000 100%)" }}
      />

      {showGlow && (
        <>
          {/* Main glow orb — dramatic expansion on celebrate */}
          <motion.div
            className={`metafi-glow-orb ${sizes[glowIntensity]} left-1/2 -translate-x-1/2`}
            style={{ top: glowY, x: "-50%" }}
            animate={
              celebrate
                ? {
                    opacity: [opacities[glowIntensity], 0.6, 0.45, 0.5, 0.35],
                    scale: [1, 2.2, 1.6, 1.8, 1.4],
                  }
                : { opacity: opacities[glowIntensity], scale: 1 }
            }
            transition={
              celebrate
                ? { duration: 3, ease: [0.25, 0.1, 0.25, 1], times: [0, 0.15, 0.4, 0.7, 1] }
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
                ? { opacity: [0.06, 0.25, 0.1], scale: [1, 1.8, 1.2] }
                : { opacity: 0.06, scale: 1 }
            }
            transition={
              celebrate
                ? { duration: 2.5, ease: "easeOut" }
                : { duration: 0.4 }
            }
          />
        </>
      )}

      {/* ===== CELEBRATION OVERLAY ===== */}
      <AnimatePresence>
        {showBurst && (
          <>
            {/* Full-screen flash */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: "radial-gradient(ellipse at 50% 15%, rgba(149, 255, 195, 0.35) 0%, rgba(149, 255, 195, 0) 65%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.12, 1] }}
              onAnimationComplete={() => setShowBurst(false)}
            />

            {/* Expanding rings / ripples from top center */}
            {rings.map((ring, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute pointer-events-none z-20"
                style={{
                  top: "8%",
                  left: "50%",
                  width: 100,
                  height: 100,
                  marginLeft: -50,
                  marginTop: -50,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(149, 255, 195, 0.5)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: ring.scale, opacity: ring.opacity }}
                transition={{
                  duration: 1.4,
                  delay: ring.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            ))}

            {/* Particle burst */}
            {particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const tx = Math.cos(rad) * p.distance;
              const ty = Math.sin(rad) * p.distance * 0.5 - p.distance * 0.3; // bias upward
              return (
                <motion.div
                  key={`particle-${p.id}`}
                  className="absolute pointer-events-none z-20 rounded-full"
                  style={{
                    top: "10%",
                    left: "50%",
                    width: p.size,
                    height: p.size,
                    background: `${p.color} 0.9)`,
                    boxShadow: `0 0 ${p.size * 3}px ${p.color} 0.6)`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: tx,
                    y: ty,
                    opacity: [1, 1, 0],
                    scale: [1, 1.2, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: [0.2, 0.8, 0.2, 1],
                    times: [0, 0.5, 1],
                  }}
                />
              );
            })}

            {/* Vertical light streak / aurora lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`streak-${i}`}
                className="absolute pointer-events-none z-20"
                style={{
                  top: 0,
                  left: `${15 + i * 18}%`,
                  width: 1,
                  height: "40%",
                  background: `linear-gradient(180deg, rgba(149, 255, 195, ${0.15 + i * 0.03}) 0%, transparent 100%)`,
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 0.5] }}
                transition={{
                  duration: 1.6,
                  delay: 0.05 + i * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};