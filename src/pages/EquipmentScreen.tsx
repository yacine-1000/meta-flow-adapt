import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Layers, Armchair, Dumbbell, Weight, CircleDot, Cable, ArrowDownUp, Footprints, Box } from "lucide-react";

const equipmentIcons: Record<string, React.ElementType> = {
  "flat_bench": Armchair,
  "incline_bench": Armchair,
  "shoulder_press": ArrowDownUp,
  "dumbbells": Dumbbell,
  "barbell": Weight,
  "kettlebells": CircleDot,
  "cable": Cable,
  "lat_pulldown": ArrowDownUp,
  "leg_press": Footprints,
  "smith": Box,
};

const EquipmentScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    { nameKey: "equipment.benches", items: ["flat_bench", "incline_bench", "shoulder_press"] },
    { nameKey: "equipment.free_weights", items: ["dumbbells", "barbell", "kettlebells"] },
    { nameKey: "equipment.cables_machines", items: ["cable", "lat_pulldown", "leg_press", "smith"] },
  ];

  const [selected, setSelected] = useState<string[]>(["dumbbells", "barbell", "cable"]);

  const toggle = (item: string) =>
    setSelected((s) => (s.includes(item) ? s.filter((x) => x !== item) : [...s, item]));

  const selectAll = () => {
    const all = categories.flatMap((c) => c.items);
    setSelected(all);
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <div className="flex items-center justify-between">
          <BackButton to="/activities" />
          <button onClick={selectAll} className="text-primary text-xs font-medium tracking-wide">{t("equipment.select_all")}</button>
        </div>

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold">{t("equipment.title")}</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 ms-[52px]">{t("equipment.hint")}</p>
        </motion.div>

        <div className="flex-1 mt-8 space-y-8 overflow-y-auto scrollbar-hide pb-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.nameKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
            >
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-3 font-medium">{t(cat.nameKey)}</h3>
              <div className="space-y-2">
                {cat.items.map((item) => {
                  const isSelected = selected.includes(item);
                  const IconComponent = equipmentIcons[item] || Dumbbell;
                  return (
                    <button
                      key={item}
                      onClick={() => toggle(item)}
                      className={`w-full flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-200 ${
                        isSelected ? "chip-selected" : "glass-card hover:border-primary/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? "bg-primary/15" : "bg-muted/20"}`}>
                          <IconComponent className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground/60"}`} />
                        </div>
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
