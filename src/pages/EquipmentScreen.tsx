import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { ProgressBar } from "@/components/ProgressBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

/* ─── Custom Equipment Icons (matching sport icon quality) ─── */
const EquipmentIcon = ({ id, active }: { id: string; active: boolean }) => {
  const color = active ? "#95FFC3" : "rgba(255,255,255,0.5)";
  const s = 22;
  const icons: Record<string, JSX.Element> = {
    dumbbells: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="9" width="3" height="6" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="19" y="9" width="3" height="6" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="5" y="7" width="3" height="10" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="16" y="7" width="3" height="10" rx="1" stroke={color} strokeWidth="1.5"/>
        <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    barbell: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="1" y="10" width="4" height="4" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="19" y="10" width="4" height="4" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="5" y="8" width="3" height="8" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="16" y="8" width="3" height="8" rx="1" stroke={color} strokeWidth="1.5"/>
        <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    kettlebells: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M9 6C9 4.343 10.343 3 12 3C13.657 3 15 4.343 15 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="14" r="6" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="14" r="2" stroke={color} strokeWidth="1.2"/>
      </svg>
    ),
    cable: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="2" width="16" height="3" rx="1" stroke={color} strokeWidth="1.5"/>
        <line x1="8" y1="5" x2="8" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="5" x2="16" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 8L12 16L16 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="10" y1="20" x2="14" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    weight_machines: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5"/>
        <line x1="12" y1="8" x2="12" y2="3" stroke={color} strokeWidth="1.5"/>
        <line x1="12" y1="21" x2="12" y2="16" stroke={color} strokeWidth="1.5"/>
        <line x1="8" y1="12" x2="3" y2="12" stroke={color} strokeWidth="1.5"/>
        <line x1="21" y1="12" x2="16" y2="12" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    adj_bench: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M3 18L10 18L18 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="22" x2="3" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="22" x2="10" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="18" cy="10" r="1.5" fill={color}/>
      </svg>
    ),
    flat_bench: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="13" width="20" height="3" rx="1.5" stroke={color} strokeWidth="1.5"/>
        <line x1="5" y1="16" x2="5" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="19" y1="16" x2="19" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    resistance_bands: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M6 4C6 4 4 10 4 12C4 14 6 20 6 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 4C18 4 20 10 20 12C20 14 18 20 18 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 8C10 6 14 6 18 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 16C10 18 14 18 18 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bodyweight: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="4" r="2.5" stroke={color} strokeWidth="1.5"/>
        <path d="M12 8V14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 11L12 8L16 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 22L12 14L16 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[id] || null;
};

const EquipmentScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    { nameKey: "equipment.free_weights", items: ["dumbbells", "barbell", "kettlebells"] },
    { nameKey: "equipment.machines", items: ["cable", "weight_machines"] },
    { nameKey: "equipment.benches", items: ["adj_bench", "flat_bench"] },
    { nameKey: "equipment.accessories", items: ["resistance_bands"] },
    { nameKey: "equipment.minimal", items: ["bodyweight"] },
  ];

  const allItems = categories.flatMap((c) => c.items);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected((s) => (s.includes(item) ? s.filter((x) => x !== item) : [...s, item]));

  const selectAll = () => setSelected(allItems);

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <div className="flex items-center justify-between">
          <BackButton to="/activities" />
          <button onClick={selectAll} className="text-primary text-xs font-medium tracking-wide">{t("equipment.select_all")}</button>
        </div>

        <ProgressBar step={4} total={6} />

        <motion.div className="mt-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold leading-tight">{t("equipment.title")}</h1>
        </motion.div>

        <div className="flex-1 mt-8 space-y-7 overflow-y-auto scrollbar-hide pb-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.nameKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.08 }}
            >
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-3 font-medium">{t(cat.nameKey)}</h3>
              <div className="space-y-2">
                {cat.items.map((item) => {
                  const isSelected = selected.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggle(item)}
                      className={`w-full flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-200 ${
                        isSelected ? "chip-selected" : "glass-card hover:border-primary/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <EquipmentIcon id={item} active={isSelected} />
                        <span className="text-sm font-medium">{t(`equip.${item}`)}</span>
                      </div>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/injuries")}>{t("continue")}</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default EquipmentScreen;
