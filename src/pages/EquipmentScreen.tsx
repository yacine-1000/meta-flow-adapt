import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { Check, Layers } from "lucide-react";

const categories = [
  {
    name: "Benches",
    items: ["Flat bench press", "Incline bench press", "Shoulder press machine"],
  },
  {
    name: "Free Weights",
    items: ["Dumbbells", "Barbell + plates", "Kettlebells"],
  },
  {
    name: "Cables & Machines",
    items: ["Cable machine", "Lat pulldown / row machine", "Leg press", "Smith machine"],
  },
];

const EquipmentScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(["Dumbbells", "Barbell + plates", "Cable machine"]);

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
          <button onClick={selectAll} className="text-primary text-xs font-medium tracking-wide">Select All</button>
        </div>

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold">Equipment</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 ml-[52px]">What do you have access to?</p>
        </motion.div>

        <div className="flex-1 mt-8 space-y-8 overflow-y-auto scrollbar-hide pb-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
            >
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-3 font-medium">{cat.name}</h3>
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
                      <span className="text-sm font-medium">{item}</span>
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

        <MetafiButton onClick={() => navigate("/injuries")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default EquipmentScreen;
