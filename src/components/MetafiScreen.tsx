import { motion } from "framer-motion";
import { ReactNode } from "react";

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

  return (
    <div className={`metafi-screen ${className}`}>
      {/* Deep ambient layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, #13263A 0%, #07111A 40%, #000000 100%)" }}
      />
      {showGlow && (
        <>
          <motion.div
            className={`metafi-glow-orb ${celebrate ? "w-[500px] h-[500px]" : sizes[glowIntensity]} left-1/2 -translate-x-1/2`}
            style={{ top: glowY }}
            animate={
              celebrate
                ? {
                    opacity: [0.15, 0.35, 0.15, 0.4, 0.2, 0.35, 0.15],
                    scale: [1, 1.15, 0.95, 1.2, 1, 1.1, 1],
                    x: ["-50%", "-48%", "-52%", "-49%", "-51%", "-50%", "-50%"],
                  }
                : { opacity: opacities[glowIntensity], scale: 1, x: "-50%" }
            }
            transition={
              celebrate
                ? { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
                : { duration: 0.4 }
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
                ? { opacity: [0.06, 0.15, 0.06], scale: [1, 1.2, 1] }
                : { opacity: 0.06, scale: 1 }
            }
            transition={
              celebrate
                ? { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.3 }
                : { duration: 0.4 }
            }
          />
        </>
      )}
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
