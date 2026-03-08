import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { Ruler } from "lucide-react";

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const MIN_HEIGHT = 140;
const MAX_HEIGHT = 200;

const HeightScreen = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(175);
  const scrollRef = useRef<HTMLDivElement>(null);
  const heights = Array.from({ length: MAX_HEIGHT - MIN_HEIGHT + 1 }, (_, i) => MIN_HEIGHT + i);

  const scrollToHeight = useCallback((h: number, smooth = true) => {
    if (!scrollRef.current) return;
    const index = h - MIN_HEIGHT;
    const offset = index * ITEM_HEIGHT;
    scrollRef.current.scrollTo({ top: offset, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    scrollToHeight(height, false);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, MIN_HEIGHT + index));
    if (newHeight !== height) setHeight(newHeight);
  };

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={2} total={6} />

        <div className="mt-4">
          <BackButton to="/gender" />
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-primary/80 text-xs font-medium tracking-widest uppercase mb-3">Step 2 of 6</p>
          <h1 className="font-display text-3xl font-bold leading-tight">How tall<br />are you?</h1>
        </motion.div>

        {/* Hero value */}
        <motion.div
          className="flex items-baseline justify-center gap-3 mt-10 mb-6"
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

        {/* Scroll wheel picker */}
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl glass-card-strong flex-1"
          style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Fade gradients */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/95 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/95 to-transparent z-10 pointer-events-none" />
          {/* Selection highlight */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-12 rounded-xl border border-primary/15 bg-primary/5 z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
            style={{ paddingTop: ITEM_HEIGHT * 2, paddingBottom: ITEM_HEIGHT * 2 }}
          >
            {heights.map((h) => (
              <div
                key={h}
                className={`h-12 flex items-center justify-center snap-center transition-all duration-150 cursor-pointer ${
                  h === height
                    ? "text-primary text-xl font-bold"
                    : Math.abs(h - height) === 1
                    ? "text-foreground/50 text-base"
                    : "text-muted-foreground/20 text-sm"
                }`}
                onClick={() => {
                  setHeight(h);
                  scrollToHeight(h);
                }}
              >
                {h}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-6">
          <MetafiButton onClick={() => navigate("/weight")}>Continue</MetafiButton>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default HeightScreen;
