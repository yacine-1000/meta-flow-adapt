import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { Ruler } from "lucide-react";

const HeightScreen = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(175);
  const heights = Array.from({ length: 61 }, (_, i) => 140 + i);

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={2} total={6} />

        <div className="mt-6">
          <BackButton to="/gender" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary/80 text-xs font-medium tracking-widest uppercase mb-3">Step 2 of 6</p>
            <h1 className="font-display text-3xl font-bold leading-tight">How tall<br />are you?</h1>
          </motion.div>

          {/* Hero value */}
          <motion.div
            className="flex items-baseline justify-center gap-3 mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-7xl font-bold text-gradient-mint tracking-tight">{height}</span>
            <span className="text-muted-foreground text-lg font-medium">cm</span>
          </motion.div>

          {/* Wheel picker */}
          <motion.div
            className="relative w-full h-52 overflow-hidden rounded-3xl glass-card-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/95 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/95 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-12 rounded-xl border border-primary/15 bg-primary/5 z-10 pointer-events-none" />

            <div className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory py-[90px]">
              {heights.map((h) => (
                <button
                  key={h}
                  onClick={() => setHeight(h)}
                  className={`w-full h-12 flex items-center justify-center snap-center transition-all duration-200 ${
                    h === height
                      ? "text-primary text-xl font-bold"
                      : Math.abs(h - height) === 1
                      ? "text-foreground/50 text-base"
                      : "text-muted-foreground/20 text-sm"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <MetafiButton onClick={() => navigate("/weight")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default HeightScreen;
