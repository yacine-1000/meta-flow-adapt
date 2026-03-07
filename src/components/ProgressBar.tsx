import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
  total: number;
}

export const ProgressBar = ({ step, total }: ProgressBarProps) => (
  <div className="w-full h-1 rounded-full bg-muted/30 overflow-hidden">
    <motion.div
      className="h-full rounded-full bg-gradient-accent"
      initial={{ width: 0 }}
      animate={{ width: `${(step / total) * 100}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);
