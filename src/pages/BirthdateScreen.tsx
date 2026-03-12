import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { useLanguage } from "@/contexts/LanguageContext";

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 7;

const WheelColumn = ({ items, selected, onChange }: {
  items: { value: number; label: string }[];
  selected: number;
  onChange: (val: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
      scrollToIndex(clampedIndex);
      if (items[clampedIndex]) onChange(items[clampedIndex].value);
    }, 60);
  };

  const padding = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;

  // Calculate which item index is currently centered
  const selectedIdx = items.findIndex(i => i.value === selected);

  return (
    <div className="flex-1 relative" style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}>
      {/* Top fade — mask only, no visible background */}
      <div
        className="absolute inset-x-0 top-0 z-20 pointer-events-none"
        style={{
          height: padding,
          background: "linear-gradient(to bottom, hsl(var(--background)), transparent)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
        style={{
          height: padding,
          background: "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ height: padding }} />
        {items.map((item, i) => {
          const distance = Math.abs(i - selectedIdx);
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.35 : distance === 2 ? 0.15 : 0.08;
          const scale = distance === 0 ? 1.1 : distance === 1 ? 0.92 : 0.82;

          return (
            <div
              key={item.value}
              className="flex items-center justify-center snap-center"
              style={{ height: ITEM_HEIGHT }}
            >
              <span
                className="font-display font-bold transition-all duration-200 ease-out"
                style={{
                  fontSize: distance === 0 ? "1.5rem" : "1.125rem",
                  opacity,
                  transform: `scale(${scale})`,
                  color: distance === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
        <div style={{ height: padding }} />
      </div>
    </div>
  );
};

const BirthdateScreen = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(1995);
  const { t, language } = useLanguage();

  const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: String(i + 1).padStart(2, "0") }));

  const monthNames: Record<string, string[]> = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: monthNames[language]?.[i] || monthNames.en[i],
  }));

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
          className="w-full mt-6 flex-1 flex flex-col justify-start pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Column labels */}
          <div className="flex gap-0 mb-2 px-2">
            <div className="flex-1 text-center">
              <span className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium">{t("birthdate.day")}</span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium">{t("birthdate.month")}</span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium">{t("birthdate.year")}</span>
            </div>
          </div>

          {/* Wheels — no borders, no boxes */}
          <div className="relative">
            <div className="flex gap-0">
              <WheelColumn items={days} selected={day} onChange={setDay} />
              <div className="w-px bg-white/[0.05] my-16 shrink-0" />
              <WheelColumn items={months} selected={month} onChange={setMonth} />
              <div className="w-px bg-white/[0.05] my-16 shrink-0" />
              <WheelColumn items={years} selected={year} onChange={setYear} />
            </div>
          </div>
        </motion.div>

        <MetafiButton onClick={() => navigate("/name")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default BirthdateScreen;
