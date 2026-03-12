import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
  total: number;
}

export const ProgressBar = ({ step, total }: ProgressBarProps) => {
  const percentage = Math.round((step / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-[3px] rounded-full overflow-hidden bg-muted/20">
        <motion.div
          className="h-full rounded-full bg-gradient-accent"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="text-[11px] font-medium text-primary/70 tabular-nums min-w-[32px] text-end">{percentage}%</span>
    </div>
  );
};
