import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft, Check } from "lucide-react";

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
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/equipment")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">Any pain or injuries?</h1>
          <p className="text-muted-foreground text-sm mt-2">We'll adapt your plan accordingly</p>
        </motion.div>

        <div className="flex-1 mt-8 overflow-y-auto scrollbar-hide pb-4">
          <button
            onClick={selectNone}
            className={`w-full py-3.5 px-4 rounded-xl mb-6 text-sm font-medium transition-all ${
              noneSelected ? "chip-selected" : "glass-card"
            }`}
          >
            None
          </button>

          <div className="space-y-6">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
              >
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggle(item)}
                      className={`flex items-center gap-1.5 py-2 px-3.5 rounded-full text-xs font-medium transition-all ${
                        selected.includes(item) ? "chip-selected" : "chip-unselected"
                      }`}
                    >
                      {item}
                      {selected.includes(item) && <Check className="w-3 h-3" />}
                    </button>
                  ))}
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
