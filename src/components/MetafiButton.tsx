import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetafiButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
}

export const MetafiButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: MetafiButtonProps) => {
  const base = "w-full py-4 rounded-full font-semibold text-base transition-all duration-300";
  const variants = {
    primary: "btn-primary-metafi",
    secondary: "glass-card hover:bg-muted/20",
    ghost: "text-muted-foreground hover:text-foreground",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? "opacity-40" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
};
