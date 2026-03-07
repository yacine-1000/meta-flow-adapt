import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft, Check } from "lucide-react";

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
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/activities")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="font-display text-2xl font-bold">What equipment do you have?</h1>
          </div>
          <button onClick={selectAll} className="text-primary text-xs font-medium">Select All</button>
        </motion.div>

        <div className="flex-1 mt-8 space-y-6 overflow-y-auto scrollbar-hide pb-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
            >
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{cat.name}</h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggle(item)}
                    className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl transition-all duration-200 ${
                      selected.includes(item) ? "chip-selected" : "glass-card"
                    }`}
                  >
                    <span className="text-sm">{item}</span>
                    {selected.includes(item) && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </button>
                ))}
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
