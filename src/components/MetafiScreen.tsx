import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface MetafiScreenProps {
  children: ReactNode;
  className?: string;
  showGlow?: boolean;
  glowPosition?: "top" | "center" | "bottom";
  glowIntensity?: "subtle" | "medium" | "strong";
  celebrate?: boolean;
}

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

  useEffect(() => {
    if (celebrate) {
      setShowBurst(true);
      containerControls.start({
        x: [0, -3, 4, -2, 3, -1, 0],
        y: [0, 2, -2, 1, -1, 1, 0],
        transition: { duration: 0.4, ease: "easeOut", delay: 0.05 },
      });
    }
  }, [celebrate, containerControls]);

  return (
    <div className={`metafi-screen ${className}`} style={{ overflow: "hidden" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, #13263A 0%, #07111A 40%, #000000 100%)" }}
      />

      {showGlow && (
        <>
          <motion.div
            className={`metafi-glow-orb ${sizes[glowIntensity]} left-1/2`}
            style={{ top: glowY, x: "-50%" }}
            animate={
              celebrate
                ? { opacity: [opacities[glowIntensity], 0.8, 0.4], scale: [1, 3, 1.8] }
                : { opacity: opacities[glowIntensity], scale: 1 }
            }
            transition={
              celebrate
                ? { duration: 2, ease: [0.16, 1, 0.3, 1], times: [0, 0.2, 1] }
                : { duration: 0.6 }
            }
          />
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
            transition={celebrate ? { duration: 1.5, ease: "easeOut" } : { duration: 0.4 }}
          />
        </>
      )}

      <AnimatePresence>
        {showBurst && (
          <>
            {/* Flash */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(149, 255, 195, 0.7) 0%, rgba(149, 255, 195, 0.2) 40%, transparent 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], times: [0, 0.08, 1] }}
            />

            {/* White core hit */}
            <motion.div
              className="absolute pointer-events-none z-30"
              style={{
                top: "-5%", left: "50%", width: 200, height: 200, marginLeft: -100,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(149, 255, 195, 0.5) 30%, transparent 60%)",
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 2, 3] }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.1, 1] }}
            />

            {/* Bloom */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                top: "-30%", left: "50%", width: 600, height: 600, marginLeft: -300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(149, 255, 195, 0.3) 0%, rgba(149, 255, 195, 0.1) 40%, transparent 65%)",
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: [0.2, 1, 1.15, 1.3] }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], times: [0, 0.12, 0.5, 1] }}
            />

            {/* Side glows */}
            {[-1, 1].map((dir) => (
              <motion.div
                key={`side-${dir}`}
                className="absolute pointer-events-none z-20"
                style={{
                  top: "5%",
                  left: dir === -1 ? "-10%" : undefined,
                  right: dir === 1 ? "-10%" : undefined,
                  width: 200, height: 300, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(109, 235, 255, 0.15) 0%, transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.3, 1.5] }}
                transition={{ duration: 1.2, delay: 0.05, ease: "easeOut" }}
              />
            ))}

            {/* Expanding ring */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                top: "3%", left: "50%", width: 80, height: 80, marginLeft: -40,
                borderRadius: "50%",
                border: "1.5px solid rgba(149, 255, 195, 0.7)",
                boxShadow: "0 0 30px rgba(149, 255, 195, 0.2)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 5, 7], opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.6, delay: 0.05, ease: [0.16, 1, 0.3, 1], times: [0, 0.4, 1] }}
            />

            {/* Afterglow */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "linear-gradient(180deg, rgba(149, 255, 195, 0.08) 0%, transparent 50%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{ duration: 3.5, ease: "easeOut", times: [0, 0.05, 0.2, 1] }}
              onAnimationComplete={() => setShowBurst(false)}
            />
          </>
        )}
      </AnimatePresence>

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
