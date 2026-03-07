import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetafiScreenProps {
  children: ReactNode;
  className?: string;
  showGlow?: boolean;
  glowPosition?: "top" | "center" | "bottom";
  glowIntensity?: "subtle" | "medium" | "strong";
}

export const MetafiScreen = ({
  children,
  className = "",
  showGlow = true,
  glowPosition = "top",
  glowIntensity = "medium",
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
          <div
            className={`metafi-glow-orb ${sizes[glowIntensity]} left-1/2 -translate-x-1/2 animate-pulse-glow`}
            style={{ top: glowY, opacity: opacities[glowIntensity] }}
          />
          {/* Secondary ambient orb */}
          <div
            className="metafi-glow-orb w-[200px] h-[200px] animate-pulse-glow"
            style={{
              top: "60%",
              left: "20%",
              opacity: 0.06,
              background: "radial-gradient(circle, rgba(109, 235, 255, 0.15) 0%, rgba(109, 235, 255, 0) 70%)",
            }}
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
