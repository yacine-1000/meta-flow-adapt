import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { useLanguage } from "@/contexts/LanguageContext";

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

const ScrollPicker = ({ items, selected, onChange, label }: {
  items: { value: number; label: string }[];
  selected: number;
  onChange: (val: number) => void;
  label: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  useEffect(() => {
    const idx = items.findIndex(i => i.value === selected);
    if (idx >= 0) scrollToIndex(idx, false);
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    isScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
      scrollToIndex(clampedIndex);
      if (items[clampedIndex]) onChange(items[clampedIndex].value);
    }, 80);
  };

  const padding = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;

  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.15em]">{label}</span>
      <div className="relative w-full" style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}>
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/90 to-transparent z-10 pointer-events-none rounded-t-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/90 to-transparent z-10 pointer-events-none rounded-b-2xl" />
        <div
          className="absolute inset-x-2 z-10 pointer-events-none rounded-xl border border-primary/20 bg-primary/[0.05]"
          style={{ top: padding, height: ITEM_HEIGHT }}
        />
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto scrollbar-hide snap-y snap-mandatory"
          style={{ scrollSnapType: "y mandatory" }}
        >
          <div style={{ height: padding }} />
          {items.map((item) => (
            <div
              key={item.value}
              className="flex items-center justify-center snap-center"
              style={{ height: ITEM_HEIGHT }}
            >
              <span className={`font-display text-lg font-bold transition-all ${
                item.value === selected ? "text-foreground scale-110" : "text-muted-foreground/30 scale-90"
              }`}>
                {item.label}
              </span>
            </div>
          ))}
          <div style={{ height: padding }} />
        </div>
      </div>
    </div>
  );
};

const BirthdateScreen = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(1995);
  const { t } = useLanguage();

  const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: String(i + 1).padStart(2, "0") }));
  const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1).padStart(2, "0") }));
  const years = Array.from({ length: 60 }, (_, i) => ({ value: 2008 - i, label: String(2008 - i) }));

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <FloatingOrbs />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8 relative z-10">
        <ProgressBar step={4} total={8} />

        <div className="mt-4">
          <BackButton to="/weight" />
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-primary/80 text-xs font-medium tracking-widest uppercase mb-3">{t("step_of", { x: "4", y: "8" })}</p>
          <h1 className="font-display text-3xl font-bold leading-tight">{t("birthdate.title1")}<br />{t("birthdate.title2")}</h1>
        </motion.div>

        <motion.div
          className="flex gap-3 w-full mt-10 glass-card-strong rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScrollPicker items={days} selected={day} onChange={setDay} label={t("birthdate.day")} />
          <ScrollPicker items={months} selected={month} onChange={setMonth} label={t("birthdate.month")} />
          <ScrollPicker items={years} selected={year} onChange={setYear} label={t("birthdate.year")} />
        </motion.div>

        <div className="flex-1" />

        <MetafiButton onClick={() => navigate("/name")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default BirthdateScreen;
