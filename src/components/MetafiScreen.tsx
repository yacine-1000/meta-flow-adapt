import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetafiScreenProps {
  children: ReactNode;
  className?: string;
  showGlow?: boolean;
  glowPosition?: "top" | "center" | "bottom";
}

export const MetafiScreen = ({
  children,
  className = "",
  showGlow = true,
  glowPosition = "top",
}: MetafiScreenProps) => {
  const glowY = glowPosition === "top" ? "-10%" : glowPosition === "center" ? "30%" : "70%";

  return (
    <div className={`metafi-screen ${className}`}>
      {showGlow && (
        <div
          className="metafi-glow-orb w-[300px] h-[300px] left-1/2 -translate-x-1/2 animate-pulse-glow"
          style={{ top: glowY }}
        />
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
