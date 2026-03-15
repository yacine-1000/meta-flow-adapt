import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dumbbell, Timer, RotateCcw, Flame, Check, Calendar,
  TrendingUp, Target, Shield, Clock, Bike, Footprints } from
"lucide-react";

/* ─── Floating UI Fragment Components ─── */

const FloatingCard = ({
  children, className = "", delay = 0, x = 0, y = 0, rotate = 0, scale = 1
}: {children: React.ReactNode;className?: string;delay?: number;x?: number;y?: number;rotate?: number;scale?: number;}) =>
<motion.div
  className={`absolute ${className}`}
  initial={{ opacity: 0, y: 30, scale: 0.85 }}
  animate={{
    opacity: 1,
    y: [0, -4, 0],
    scale,
  }}
  exit={{ opacity: 0, y: -20, scale: 0.9 }}
  transition={{
    opacity: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    y: { delay: delay + 0.7, duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
    scale: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }}
  style={{ x, y, rotate }}>
    {children}
  </motion.div>;


const GlassFragment = ({ children, className = "" }: {children: React.ReactNode;className?: string;}) =>
<div
  className={`rounded-2xl border border-white/[0.08] ${className}`}
  style={{
    background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
    backdropFilter: "blur(40px)",
    WebkitBackdropFilter: "blur(40px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)"
  }}>
    {children}
  </div>;


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
      { name: t("intro.barbell_row"), info: t("intro.sets_reps1"), done: false }].
      map((ex, i) =>
      <div
        key={i}
        className={`flex items-center justify-between py-2.5 px-3 rounded-xl mt-1.5 ${
        ex.done ? "bg-primary/[0.06] border border-primary/10" : "bg-white/[0.03]"}`
        }>
            <div className="flex items-center gap-2.5">
              {ex.done &&
          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
          }
              <div>
                <span className={`text-xs font-medium ${ex.done ? "text-muted-foreground" : "text-foreground"}`}>{ex.name}</span>
                <p className="text-[9px] text-muted-foreground/60 mt-0.5">{ex.info}</p>
              </div>
            </div>
          </div>
      )}
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
          transition={{ delay: 0.8, duration: 1 }} />
        </div>
      </GlassFragment>
    </FloatingCard>

    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.06) 0%, transparent 70%)" }} />
  </div>
  );
};


/* ─── Slide 2: Sports Integration ─── */
const Slide2Visuals = () => {
  const { t } = useLanguage();
  return (
<div className="relative w-full h-[340px]">
    <FloatingCard className="left-5 top-5" delay={0.15}>
      <GlassFragment className="px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-primary/[0.08] flex items-center justify-center">
          <Bike className="w-4 h-4 text-primary/70" />
        </div>
        <span className="text-xs font-medium text-foreground">{t("intro.cycling")}</span>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="right-8 top-3" delay={0.25} rotate={3}>
      <GlassFragment className="px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-primary/[0.08] flex items-center justify-center">
          <Footprints className="w-4 h-4 text-primary/70" />
        </div>
        <span className="text-xs font-medium text-foreground">{t("intro.running")}</span>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="left-12 top-[110px]" delay={0.35} rotate={-1}>
      <GlassFragment className="px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-primary/[0.08] flex items-center justify-center">
          <Target className="w-4 h-4 text-primary/70" />
        </div>
        <span className="text-xs font-medium text-foreground">{t("intro.padel")}</span>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="left-6 right-6 bottom-8" delay={0.5}>
      <GlassFragment className="p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <span className="text-[10px] text-primary/80">{t("intro.sport_aware")}</span>
        </div>
        <div className="flex gap-1.5">
          {[
            t("intro.day_m"), t("intro.day_t"), t("intro.day_w"),
            t("intro.day_th"), t("intro.day_f"), t("intro.day_s"), t("intro.day_su")
          ].map((d, i) =>
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[8px] text-muted-foreground/40">{d}</span>
              <div className={`w-full aspect-square rounded-lg flex items-center justify-center ${
          [0, 2, 4].includes(i) ?
          "bg-primary/15 border border-primary/20" :
          [1, 5].includes(i) ?
          "bg-accent/40 border border-white/[0.06]" :
          "bg-white/[0.02]"}`
          }>
                {[0, 2, 4].includes(i) && <Dumbbell className="w-2.5 h-2.5 text-primary/60" />}
                {i === 1 && <Bike className="w-2.5 h-2.5 text-muted-foreground/40" />}
                {i === 5 && <Footprints className="w-2.5 h-2.5 text-muted-foreground/40" />}
              </div>
            </div>
        )}
        </div>
      </GlassFragment>
    </FloatingCard>

    <div className="absolute top-20 right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(109,235,255,0.05) 0%, transparent 70%)" }} />
  </div>
  );
};


/* ─── Slide 3: Personalized Plan ─── */
const Slide3Visuals = () => {
  const { t } = useLanguage();
  return (
<div className="relative w-full h-[340px]">
    <FloatingCard className="left-4 top-4" delay={0.15} rotate={-2}>
      <GlassFragment className="px-4 py-3">
        <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider mb-2">{t("intro.equipment")}</p>
        <div className="flex gap-1.5">
          {[t("intro.dumbbells"), t("intro.barbell"), t("intro.cable")].map((eq) =>
        <span key={eq} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary/80">{eq}</span>
        )}
        </div>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="right-4 top-20" delay={0.3} rotate={2}>
      <GlassFragment className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-destructive/60" />
          <div>
            <p className="text-[10px] font-medium text-foreground">{t("intro.shoulder")}</p>
            <p className="text-[8px] text-muted-foreground/50">{t("intro.adapted")}</p>
          </div>
        </div>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="left-8 top-[140px]" delay={0.4} rotate={-1}>
      <GlassFragment className="px-4 py-3 flex items-center gap-2.5">
        <Clock className="w-3.5 h-3.5 text-primary/50" />
        <div>
          <p className="text-[10px] font-medium text-foreground">50 {t("intro.min")}</p>
          <p className="text-[8px] text-muted-foreground/50">{t("intro.avg_session")}</p>
        </div>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="right-6 bottom-16" delay={0.5} rotate={-1.5}>
      <GlassFragment className="px-4 py-3 flex items-center gap-2.5">
        <Target className="w-3.5 h-3.5 text-primary/60" />
        <div>
          <p className="text-[10px] font-medium text-foreground">{t("intro.muscle")}</p>
          <p className="text-[8px] text-muted-foreground/50">{t("intro.primary_goal")}</p>
        </div>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="left-1/2 -translate-x-1/2 bottom-4" delay={0.6}>
      <GlassFragment className="px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-primary/80">{t("intro.plan_adapts")}</span>
        </div>
      </GlassFragment>
    </FloatingCard>

    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.05) 0%, transparent 70%)" }} />
  </div>
  );
};


/* ─── Slide 4: Momentum & Progress ─── */
const Slide4Visuals = () => {
  const { t } = useLanguage();
  return (
<div className="relative w-full h-[340px]">
    <FloatingCard className="left-1/2 -translate-x-1/2 top-4" delay={0.15}>
      <GlassFragment className="px-6 py-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
          <Flame className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-foreground">12</p>
          <p className="text-[10px] text-muted-foreground/60">{t("intro.day_streak")}</p>
        </div>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="left-6 top-[110px]" delay={0.3} rotate={-2}>
      <GlassFragment className="px-4 py-3 w-44">
        <p className="text-[9px] text-muted-foreground/50 mb-2">{t("intro.this_week")}</p>
        <div className="w-full h-1.5 rounded-full bg-muted/30 overflow-hidden">
          <motion.div
          className="h-full rounded-full bg-gradient-accent"
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{ delay: 0.8, duration: 1 }} />
        </div>
        <p className="text-[10px] font-medium text-foreground mt-1.5">{t("intro.days_count")}</p>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="right-6 top-[130px]" delay={0.4} rotate={2}>
      <GlassFragment className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-3 h-3 text-primary" />
          </div>
          <span className="text-xs font-medium text-foreground">6/6</span>
        </div>
        <p className="text-[8px] text-muted-foreground/50 mt-1">{t("intro.all_done")}</p>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="left-10 bottom-12" delay={0.5} rotate={1}>
      <GlassFragment className="px-4 py-3">
        <p className="text-[9px] text-muted-foreground/50">{t("intro.est_volume")}</p>
        <p className="text-sm font-display font-bold text-foreground mt-0.5">~12,400 {t("intro.lbs")}</p>
      </GlassFragment>
    </FloatingCard>

    <FloatingCard className="right-8 bottom-16" delay={0.55} rotate={-1.5}>
      <GlassFragment className="px-3.5 py-2.5 flex items-center gap-2">
        <TrendingUp className="w-3.5 h-3.5 text-primary" />
        <span className="text-[10px] font-medium text-primary">+15%</span>
      </GlassFragment>
    </FloatingCard>

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(149,255,195,0.06) 0%, transparent 70%)" }} />
  </div>
  );
};


/* ─── Slide Data ─── */
const slidesData = [
{
  titleKey: "intro.slide1_title",
  subtitleKey: "intro.slide1_subtitle",
  Visual: Slide1Visuals
},
{
  titleKey: "intro.slide2_title",
  subtitleKey: "intro.slide2_subtitle",
  Visual: Slide2Visuals
},
{
  titleKey: "intro.slide3_title",
  subtitleKey: "intro.slide3_subtitle",
  Visual: Slide3Visuals
},
{
  titleKey: "intro.slide4_title",
  subtitleKey: "intro.slide4_subtitle",
  Visual: Slide4Visuals
}];


/* ─── Main IntroSlider ─── */
const IntroSlider = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const isLastSlide = currentSlide === slidesData.length - 1;

  const goNext = useCallback(() => {
    if (isLastSlide) {
      navigate("/gender");
      return;
    }
    setDirection(1);
    setCurrentSlide((s) => s + 1);
  }, [isLastSlide, navigate]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  const slide = slidesData[currentSlide];

  const swipeConfidenceThreshold = 10000;
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
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) goNext();else
                if (swipe > swipeConfidenceThreshold) goPrev();
              }}
              className="flex flex-col flex-1">
              
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
                  transition={{ delay: 0.2, duration: 0.6 }}>
                  {t(slide.titleKey)}
                </motion.h1>
                <motion.p
                  className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[300px] mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}>
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
            {slidesData.map((_, i) =>
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className="h-1 rounded-full transition-all duration-300"
              animate={{
                width: i === currentSlide ? 24 : 6,
                backgroundColor: i === currentSlide ?
                "hsl(152, 100%, 72%)" :
                "rgba(255,255,255,0.15)"
              }} />
            )}
          </div>

          {/* CTA */}
          <MetafiButton onClick={goNext}>
            {isLastSlide ? t("intro.start") : t("intro.next")}
          </MetafiButton>
        </div>
      </div>
    </MetafiScreen>);
};

export default IntroSlider;