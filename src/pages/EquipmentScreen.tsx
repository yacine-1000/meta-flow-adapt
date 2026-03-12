import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Dumbbell } from "lucide-react";

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

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">{t("equipment.title")}</h1>
          <p className="text-muted-foreground text-sm mt-2">{t("equipment.hint")}</p>
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
                      <span className="text-sm font-medium">{t(`equip.${item}`)}</span>
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
