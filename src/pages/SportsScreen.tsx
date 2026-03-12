import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { Check } from "lucide-react";

const SportIcon = ({ sport, active }: { sport: string; active: boolean }) => {
  const color = active ? "#95FFC3" : "rgba(255,255,255,0.5)";
  const s = 22;
  const icons: Record<string, JSX.Element> = {
    football: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/><path d="M12 3C12 3 14.5 8 12 12C9.5 16 12 21 12 21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M3.5 9H20.5" stroke={color} strokeWidth="1.5"/><path d="M3.5 15H20.5" stroke={color} strokeWidth="1.5"/></svg>),
    padel: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="15" rx="5" stroke={color} strokeWidth="1.5"/><line x1="12" y1="17" x2="12" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="9" r="1" fill={color}/><circle cx="14" cy="9" r="1" fill={color}/><circle cx="10" cy="12" r="1" fill={color}/><circle cx="14" cy="12" r="1" fill={color}/></svg>),
    pilates: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" stroke={color} strokeWidth="1.5"/><path d="M8 22L12 12L16 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 10H18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M12 8V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    yoga: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4" r="2" stroke={color} strokeWidth="1.5"/><path d="M12 8V14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M8 11L12 8L16 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 22L12 14L17 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    tennis: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="7" stroke={color} strokeWidth="1.5"/><path d="M5.5 7C8 10 8 13 5.5 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M18.5 7C16 10 16 13 18.5 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    running: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="15" cy="4" r="2" stroke={color} strokeWidth="1.5"/><path d="M6 20L10 14L13 16L17 10L20 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 16L10 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    hiking: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 20L10 6L16 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 14H13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M16 20L20 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    mma: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12C5 8 8 4 12 4C16 4 19 8 19 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><rect x="5" y="12" width="14" height="6" rx="3" stroke={color} strokeWidth="1.5"/><path d="M8 18V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M16 18V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    boxing: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12C5 8 8 4 12 4C16 4 19 8 19 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><rect x="5" y="12" width="14" height="6" rx="3" stroke={color} strokeWidth="1.5"/><path d="M8 18V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M16 18V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    swimming: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 16C5 14 7 18 9 16C11 14 13 18 15 16C17 14 19 18 21 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M3 20C5 18 7 22 9 20C11 18 13 22 15 20C17 18 19 22 21 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="6" r="2" stroke={color} strokeWidth="1.5"/><path d="M8 12L14 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    cycling: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="7" cy="17" r="4" stroke={color} strokeWidth="1.5"/><circle cx="17" cy="17" r="4" stroke={color} strokeWidth="1.5"/><path d="M7 17L12 7L17 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 7L15 7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    basketball: (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/><path d="M3 12H21" stroke={color} strokeWidth="1.5"/><path d="M12 3V21" stroke={color} strokeWidth="1.5"/><path d="M5 5C8 8 8 16 5 19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M19 5C16 8 16 16 19 19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
  };
  return icons[sport] || null;
};

const sportKeys = [
  "football", "padel", "pilates", "yoga", "tennis", "running",
  "hiking", "mma", "boxing", "swimming", "cycling", "basketball",
];

const SportsScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const { t } = useLanguage();
  const { setSelectedSports } = useUser();

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/home" />

        <motion.div className="mt-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold leading-tight">{t("sports.title1")}<br />{t("sports.title2")}</h1>
        </motion.div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-3 gap-3">
            {sportKeys.map((sport, i) => {
              const isSelected = selected.includes(sport);
              return (
                <motion.button
                  key={sport}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.025 }}
                  onClick={() => toggle(sport)}
                  className={`relative flex flex-col items-center gap-2.5 py-5 rounded-2xl transition-all duration-300 ${
                    isSelected ? "chip-selected shadow-glow-sm" : "glass-card hover:border-primary/10"
                  }`}
                >
                  <SportIcon sport={sport} active={isSelected} />
                  <span className="text-xs font-medium">{t(`sport.${sport}`)}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <MetafiButton onClick={() => { setSelectedSports(selected); navigate("/focus"); }}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default SportsScreen;
