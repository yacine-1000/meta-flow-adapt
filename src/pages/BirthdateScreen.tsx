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
  const [centeredIdx, setCenteredIdx] = useState(() => {
    const idx = items.findIndex(i => i.value === selected);
    return idx >= 0 ? idx : 0;
  });

  const padding = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  useEffect(() => {
    const idx = items.findIndex(i => i.value === selected);
    if (idx >= 0) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        scrollToIndex(idx, false);
        setCenteredIdx(idx);
      });
    }
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const visualIdx = Math.round(scrollTop / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(items.length - 1, visualIdx));
    setCenteredIdx(clamped);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!containerRef.current) return;
      const finalTop = containerRef.current.scrollTop;
      const finalIdx = Math.round(finalTop / ITEM_HEIGHT);
      const finalClamped = Math.max(0, Math.min(items.length - 1, finalIdx));
      scrollToIndex(finalClamped);
      setCenteredIdx(finalClamped);
      if (items[finalClamped]) onChange(items[finalClamped].value);
    }, 80);
  };

  return (
    <div className="flex-1 relative" style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}>
      {/* Selection highlight bar */}
      <div
        className="absolute inset-x-2 z-10 pointer-events-none rounded-xl"
        style={{
          top: padding,
          height: ITEM_HEIGHT,
          background: "linear-gradient(135deg, rgba(149, 255, 195, 0.08) 0%, rgba(109, 235, 255, 0.05) 100%)",
          border: "1px solid rgba(149, 255, 195, 0.1)",
        }}
      />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scrollbar-hide relative z-0"
        style={{
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
          maskImage: `linear-gradient(to bottom, transparent 0%, black ${padding}px, black calc(100% - ${padding}px), transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black ${padding}px, black calc(100% - ${padding}px), transparent 100%)`,
        }}
      >
        <div style={{ height: padding }} />
        {items.map((item, i) => {
          const distance = Math.abs(i - centeredIdx);
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.4 : distance === 2 ? 0.18 : 0.08;
          const scale = distance === 0 ? 1.1 : distance === 1 ? 0.95 : 0.85;
          const isCentered = distance === 0;

          return (
            <div
              key={item.value}
              className="flex items-center justify-center snap-center"
              style={{ height: ITEM_HEIGHT }}
            >
              <span
                className="font-display font-bold transition-all duration-150 ease-out"
                style={{
                  fontSize: isCentered ? "1.5rem" : "1.125rem",
                  opacity,
                  transform: `scale(${scale})`,
                  color: isCentered ? "#95FFC3" : "hsl(var(--muted-foreground))",
                  textShadow: isCentered ? "0 0 20px rgba(149, 255, 195, 0.3)" : "none",
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
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
