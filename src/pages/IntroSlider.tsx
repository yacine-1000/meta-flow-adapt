import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dumbbell, Timer, RotateCcw, Flame, Check,
  TrendingUp, Target, Shield, Clock, Bike, Footprints,
  Zap, Activity, BarChart3, ListChecks
} from "lucide-react";

/* ─── Floating UI Fragment Components ─── */

const FloatingCard = ({
  children, className = "", delay = 0
}: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, y: 30, scale: 0.85 }}
    animate={{
      opacity: 1,
      y: [0, -4, 0],
      scale: 1,
    }}
    exit={{ opacity: 0, y: -20, scale: 0.9 }}
    transition={{
      opacity: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      y: { delay: delay + 0.7, duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      scale: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }}
  >
    {children}
  </motion.div>
);

const GlassFragment = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-2xl border border-white/[0.08] ${className}`}
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
  >
    {children}
  </div>
);


/* ─── Slide 1: Today's Workout ─── */
const Slide1Visuals = () => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-[340px]">
      <FloatingCard className="left-4 top-4 right-4" delay={0.15}>
        <GlassFragment className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-display text-base font-bold text-foreground">{t("intro.upper_body")}</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t("intro.push_pull")}</p>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Timer className="w-3 h-3" />55 {t("intro.min")}</span>
              <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" />6</span>
            </div>
          </div>
          {[
            { name: t("intro.bench_press"), info: t("intro.sets_reps1"), done: true },
            { name: t("intro.incline_fly"), info: t("intro.sets_reps2"), done: true },
            { name: t("intro.barbell_row"), info: t("intro.sets_reps1"), done: false },
          ].map((ex, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2.5 px-3 rounded-xl mt-1.5 ${
                ex.done ? "bg-primary/[0.06] border border-primary/10" : "bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {ex.done && (
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary" />
                  </div>
                )}
                <div>
                  <span className={`text-xs font-medium ${ex.done ? "text-muted-foreground" : "text-foreground"}`}>{ex.name}</span>
                  <p className="text-[9px] text-muted-foreground/60 mt-0.5">{ex.info}</p>
                </div>
              </div>
            </div>
          ))}
        </GlassFragment>
      </FloatingCard>

      <FloatingCard className="right-6 bottom-12" delay={0.45}>
        <GlassFragment className="px-3.5 py-2 flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold">4</span>
        </GlassFragment>
      </FloatingCard>

      <FloatingCard className="left-6 bottom-6" delay={0.55}>
        <GlassFragment className="px-4 py-2.5">
          <p className="text-[9px] text-muted-foreground/60 mb-1.5">{t("intro.weekly_progress")}</p>
          <div className="w-28 h-1.5 rounded-full bg-muted/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-accent"
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </div>
        </GlassFragment>
      </FloatingCard>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.06) 0%, transparent 70%)" }} />
    </div>
  );
};


/* ─── Slide 2: Other Sports ─── */
const Slide2Visuals = () => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-[340px]">
      {/* Sport chips row – top left */}
      <FloatingCard className="left-4 top-3 right-4" delay={0.12}>
        <GlassFragment className="px-4 py-3.5">
          <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider mb-2.5">{t("intro.s2_sport_aware")}</p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Footprints className="w-3 h-3" />, label: t("intro.s2_football") },
              { icon: <Target className="w-3 h-3" />, label: t("intro.s2_padel") },
              { icon: <Activity className="w-3 h-3" />, label: t("intro.s2_running") },
            ].map((s, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary/80">
                {s.icon}{s.label}
              </span>
            ))}
            {[t("intro.s2_swimming"), t("intro.s2_cycling")].map((s, i) => (
              <span key={i} className="text-[10px] px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-muted-foreground/50">
                {s}
              </span>
            ))}
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Weekly calendar card */}
      <FloatingCard className="left-5 right-5 top-[120px]" delay={0.3}>
        <GlassFragment className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-[10px] text-primary/80">{t("intro.s2_weekly_view")}</span>
          </div>
          <div className="flex gap-1.5">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => {
              const isLift = [1, 3, 5].includes(i);
              const isSport = [2, 6].includes(i);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[8px] text-muted-foreground/40">{d}</span>
                  <div className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                    isLift ? "bg-primary/15 border border-primary/20" :
                    isSport ? "bg-accent/40 border border-white/[0.06]" :
                    "bg-white/[0.02]"
                  }`}>
                    {isLift && <Dumbbell className="w-2.5 h-2.5 text-primary/60" />}
                    {isSport && <Bike className="w-2.5 h-2.5 text-muted-foreground/40" />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            {[
              { color: "bg-primary/40", label: t("intro.s2_lifting") },
              { color: "bg-accent/60", label: t("intro.s2_sport") },
              { color: "bg-white/[0.06]", label: t("intro.s2_rest") },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-sm ${l.color}`} />
                <span className="text-[8px] text-muted-foreground/50">{l.label}</span>
              </div>
            ))}
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Recovery card – bottom left */}
      <FloatingCard className="left-5 bottom-6" delay={0.5}>
        <GlassFragment className="px-4 py-2.5 flex items-center gap-2.5">
          <Zap className="w-3.5 h-3.5 text-primary/60" />
          <div>
            <p className="text-[10px] font-medium text-foreground">{t("intro.s2_recovery")}</p>
            <p className="text-[8px] text-muted-foreground/50">{t("intro.s2_load_managed")}</p>
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Frequency chip – bottom right */}
      <FloatingCard className="right-6 bottom-10" delay={0.55}>
        <GlassFragment className="px-3.5 py-2 flex items-center gap-2">
          <Target className="w-3 h-3 text-primary/50" />
          <span className="text-[10px] font-medium text-foreground">{t("intro.s2_2x_week")}</span>
        </GlassFragment>
      </FloatingCard>

      <div className="absolute top-20 right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(109,235,255,0.05) 0%, transparent 70%)" }} />
    </div>
  );
};


/* ─── Slide 3: Plan Adaptation ─── */
const Slide3Visuals = () => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-[340px]">
      {/* Equipment chips – top */}
      <FloatingCard className="left-4 top-3 right-16" delay={0.12}>
        <GlassFragment className="px-4 py-3">
          <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider mb-2">{t("intro.s3_equipment")}</p>
          <div className="flex flex-wrap gap-1.5">
            {[t("intro.s3_dumbbells"), t("intro.s3_barbell"), t("intro.s3_cable"), t("intro.s3_bench")].map((eq) => (
              <span key={eq} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary/80">{eq}</span>
            ))}
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Injury card – top right, overlapping equipment */}
      <FloatingCard className="right-4 top-16" delay={0.28}>
        <GlassFragment className="px-4 py-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Shield className="w-3.5 h-3.5 text-destructive/60" />
            <p className="text-[10px] font-medium text-foreground">{t("intro.s3_shoulder_injury")}</p>
          </div>
          <p className="text-[8px] text-muted-foreground/50">{t("intro.s3_no_overhead")}</p>
          <p className="text-[8px] text-primary/50 mt-0.5">{t("intro.s3_alt_selected")}</p>
        </GlassFragment>
      </FloatingCard>

      {/* Session time card */}
      <FloatingCard className="left-6 top-[120px]" delay={0.38}>
        <GlassFragment className="px-4 py-3 flex items-center gap-2.5">
          <Clock className="w-3.5 h-3.5 text-primary/50" />
          <div>
            <p className="text-[10px] font-medium text-foreground">50 {t("intro.min")}</p>
            <p className="text-[8px] text-muted-foreground/50">{t("intro.s3_avg_session")}</p>
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Goal card – right middle */}
      <FloatingCard className="right-5 top-[155px]" delay={0.45}>
        <GlassFragment className="px-4 py-3 flex items-center gap-2.5">
          <Target className="w-3.5 h-3.5 text-primary/60" />
          <div>
            <p className="text-[10px] font-medium text-foreground">{t("intro.s3_muscle_growth")}</p>
            <p className="text-[8px] text-muted-foreground/50">{t("intro.s3_primary_goal")}</p>
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Adapted status – overlapping bottom */}
      <FloatingCard className="left-8 bottom-14" delay={0.52}>
        <GlassFragment className="px-4 py-2.5 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-primary" />
          </div>
          <span className="text-[10px] font-medium text-foreground">{t("intro.s3_adapted")}</span>
        </GlassFragment>
      </FloatingCard>

      {/* Plan adapts pulse */}
      <FloatingCard className="left-1/2 -translate-x-1/2 bottom-2" delay={0.6}>
        <GlassFragment className="px-5 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-primary/80">{t("intro.s3_plan_adapts")}</span>
          </div>
        </GlassFragment>
      </FloatingCard>

      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.05) 0%, transparent 70%)" }} />
    </div>
  );
};


/* ─── Slide 4: Loss Aversion + Action ─── */
const Slide4Visuals = () => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-[340px]">
      {/* Plan header card */}
      <FloatingCard className="left-4 top-3 right-4" delay={0.12}>
        <GlassFragment className="p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                <ListChecks className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{t("intro.s4_your_plan")}</p>
                <p className="text-[8px] text-primary/60">{t("intro.s4_personalized")}</p>
              </div>
            </div>
            <span className="text-[9px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/15 text-primary/80">{t("intro.s4_week1")}</span>
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Day breakdown card */}
      <FloatingCard className="left-5 right-5 top-[85px]" delay={0.28}>
        <GlassFragment className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-medium text-foreground">{t("intro.s4_day_upper")}</p>
            <div className="flex items-center gap-2 text-[9px] text-muted-foreground/60">
              <span>{t("intro.s4_exercises_count")}</span>
              <span>{t("intro.s4_est_time")}</span>
            </div>
          </div>
          {/* Exercise rows */}
          <div className="space-y-1.5">
            {[
              { name: t("intro.s4_bench_press"), sets: "4", reps: "8-10" },
              { name: t("intro.s4_squat"), sets: "4", reps: "6-8" },
              { name: t("intro.s4_lat_pulldown"), sets: "3", reps: "10-12" },
            ].map((ex, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.03]">
                <span className="text-[10px] font-medium text-foreground">{ex.name}</span>
                <div className="flex items-center gap-3 text-[9px] text-muted-foreground/60">
                  <span>{ex.sets} {t("intro.s4_sets")}</span>
                  <span>{ex.reps} {t("intro.s4_reps")}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassFragment>
      </FloatingCard>

      {/* Structured chip – bottom left */}
      <FloatingCard className="left-6 bottom-14" delay={0.48}>
        <GlassFragment className="px-4 py-2.5 flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-primary/60" />
          <span className="text-[10px] font-medium text-foreground">{t("intro.s4_structured")}</span>
        </GlassFragment>
      </FloatingCard>

      {/* No guesswork chip – bottom right, overlapping */}
      <FloatingCard className="right-5 bottom-10" delay={0.52}>
        <GlassFragment className="px-4 py-2.5 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-medium text-foreground">{t("intro.s4_no_guesswork")}</span>
        </GlassFragment>
      </FloatingCard>

      {/* Direction tag – center bottom */}
      <FloatingCard className="left-1/2 -translate-x-1/2 bottom-1" delay={0.58}>
        <GlassFragment className="px-5 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-primary/80">{t("intro.s4_progress")}</span>
          </div>
        </GlassFragment>
      </FloatingCard>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.06) 0%, transparent 70%)" }} />
    </div>
  );
};


/* ─── Slide Data ─── */
const slidesData = [
  { titleKey: "intro.slide1_title", subtitleKey: "intro.slide1_subtitle", Visual: Slide1Visuals },
  { titleKey: "intro.slide2_title", subtitleKey: "intro.slide2_subtitle", Visual: Slide2Visuals },
  { titleKey: "intro.slide3_title", subtitleKey: "intro.slide3_subtitle", Visual: Slide3Visuals },
  { titleKey: "intro.slide4_title", subtitleKey: "intro.slide4_subtitle", Visual: Slide4Visuals },
];


/* ─── Main IntroSlider ─── */
const IntroSlider = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const lastSlideIndex = slidesData.length - 1;
  const isLastSlide = currentSlide === lastSlideIndex;
  const forwardDirection = isRTL ? -1 : 1;
  const backwardDirection = forwardDirection * -1;

  const goNext = useCallback(() => {
    if (isLastSlide) {
      navigate("/gender");
      return;
    }

    setDirection(forwardDirection);
    setCurrentSlide((s) => Math.min(s + 1, lastSlideIndex));
  }, [forwardDirection, isLastSlide, lastSlideIndex, navigate]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(backwardDirection);
      setCurrentSlide((s) => Math.max(s - 1, 0));
    }
  }, [backwardDirection, currentSlide]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? forwardDirection : backwardDirection);
    setCurrentSlide(index);
  }, [backwardDirection, currentSlide, forwardDirection]);

  const slide = slidesData[currentSlide];

  const swipeConfidenceThreshold = 4500;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen relative">
        {/* Top bar */}
        <div className="items-center justify-between px-6 pt-14 pb-2 flex flex-col">
          <LanguageSwitch />
        </div>

        {/* Slide content */}
        <div className="flex-1 flex flex-col justify-between px-2 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 80 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -80 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                const swipedForward = isRTL ? swipe > swipeConfidenceThreshold : swipe < -swipeConfidenceThreshold;
                const swipedBackward = isRTL ? swipe < -swipeConfidenceThreshold : swipe > swipeConfidenceThreshold;

                if (swipedForward) goNext();
                else if (swipedBackward) goPrev();
              }}
              className="flex flex-col flex-1"
            >
              {/* Visual composition area */}
              <div className="flex-1 flex items-center justify-center relative mt-4">
                <slide.Visual />
              </div>

              {/* Text */}
              <div className="px-6 pb-4 text-center">
                <motion.h1
                  className="font-display text-[26px] font-bold leading-tight text-foreground"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {t(slide.titleKey)}
                </motion.h1>
                <motion.p
                  className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[300px] mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  {t(slide.subtitleKey)}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: dots + CTA */}
        <div className="px-6 pb-10 pt-4">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slidesData.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToSlide(i)}
                className="h-1 rounded-full transition-all duration-300"
                animate={{
                  width: i === currentSlide ? 24 : 6,
                  backgroundColor: i === currentSlide ? "hsl(152, 100%, 72%)" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* CTA */}
          <MetafiButton onClick={goNext}>
            {isLastSlide ? t("intro.create_plan") : t("intro.next")}
          </MetafiButton>
          {isLastSlide && (
            <motion.p
              className="text-[11px] text-muted-foreground/50 text-center mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t("intro.takes_30s")}
            </motion.p>
          )}
        </div>
      </div>
    </MetafiScreen>
  );
};

export default IntroSlider;