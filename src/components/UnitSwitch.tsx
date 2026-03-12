import { motion } from "framer-motion";

interface UnitSwitchProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export const UnitSwitch = ({ options, selected, onChange }: UnitSwitchProps) => (
  <div className="inline-flex rounded-full bg-muted/20 p-1 border border-white/[0.06]">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className="relative px-5 py-1.5 text-xs font-medium rounded-full transition-colors z-10"
      >
        {selected === opt.value && (
          <motion.div
            layoutId="unit-switch-bg"
            className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className={`relative z-10 ${selected === opt.value ? "text-primary" : "text-muted-foreground/60"}`}>
          {opt.label}
        </span>
      </button>
    ))}
  </div>
);
