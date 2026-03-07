import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
  total: number;
}

export const ProgressBar = ({ step, total }: ProgressBarProps) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }, (_, i) => (
      <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-muted/20">
        {i < step && (
          <motion.div
            className="h-full rounded-full bg-gradient-accent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          />
        )}
      </div>
    ))}
  </div>
);
