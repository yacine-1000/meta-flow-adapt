import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { Check, ShieldCheck, AlertTriangle } from "lucide-react";

const categories = [
  {
    name: "Lower Body",
    items: ["Knee", "Ankle / ankle sprain", "Foot", "Heel", "Hip", "Groin", "Hamstring", "Quad", "Calf", "Achilles"],
  },
  {
    name: "Back & Neck",
    items: ["Lower back", "Upper back", "Neck"],
  },
  {
    name: "Upper Body",
    items: ["Shoulder", "Elbow", "Wrist"],
  },
];

const InjuriesScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [noneSelected, setNoneSelected] = useState(false);

  const toggle = (item: string) => {
    setNoneSelected(false);
    setSelected((s) => (s.includes(item) ? s.filter((x) => x !== item) : [...s, item]));
  };

  const selectNone = () => {
    setNoneSelected(true);
    setSelected([]);
  };

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/equipment" />

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold">Pain & Injuries</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 ml-[52px]">We'll adapt your plan accordingly</p>
        </motion.div>

        <div className="flex-1 mt-8 overflow-y-auto scrollbar-hide pb-4">
          <button
            onClick={selectNone}
            className={`w-full py-4 px-4 rounded-xl mb-6 text-sm font-medium transition-all flex items-center gap-3 ${
              noneSelected ? "chip-selected" : "glass-card"
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${noneSelected ? "text-primary" : "text-muted-foreground/40"}`} />
            No injuries or pain
          </button>

          <div className="space-y-8">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
              >
                <h3 className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-3 font-medium">{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => {
                    const isSelected = selected.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggle(item)}
                        className={`flex items-center gap-1.5 py-2.5 px-4 rounded-full text-xs font-medium transition-all ${
                          isSelected ? "chip-selected" : "chip-unselected hover:border-primary/15"
                        }`}
                      >
                        {item}
                        {isSelected && <Check className="w-3 h-3" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <MetafiButton onClick={() => navigate(selected.length > 0 ? "/severity" : "/training-level")}>
          Continue
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default InjuriesScreen;
