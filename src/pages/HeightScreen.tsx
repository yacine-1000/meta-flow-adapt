import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";

const HeightScreen = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(175);

  const heights = Array.from({ length: 61 }, (_, i) => 140 + i);

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={2} total={6} />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground text-sm mb-2">Step 2 of 6</p>
          <h1 className="font-display text-2xl font-bold">How tall are you?</h1>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-display text-7xl font-bold text-gradient-mint">{height}</span>
            <span className="text-muted-foreground text-xl ml-2">cm</span>
          </motion.div>

          {/* Wheel picker simulation */}
          <div className="relative w-full h-48 overflow-hidden rounded-3xl glass-card">
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-metafi-navy/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-metafi-navy/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-primary/20 z-10 pointer-events-none" />
            
            <div className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory py-[84px]">
              {heights.map((h) => (
                <button
                  key={h}
                  onClick={() => setHeight(h)}
                  className={`w-full h-12 flex items-center justify-center snap-center transition-all ${
                    h === height
                      ? "text-primary text-xl font-semibold"
                      : Math.abs(h - height) === 1
                      ? "text-foreground/60 text-base"
                      : "text-muted-foreground/30 text-sm"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>

        <MetafiButton onClick={() => navigate("/weight")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default HeightScreen;
