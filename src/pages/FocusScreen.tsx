import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft } from "lucide-react";

const focusAreas = [
  { id: "lifting", label: "Weight Lifting", icon: "🏋️" },
  { id: "tennis", label: "Tennis", icon: "🎾" },
  { id: "running", label: "Running", icon: "🏃" },
];

const FocusScreen = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, number>>({
    lifting: 8,
    tennis: 5,
    running: 3,
  });

  const update = (id: string, val: number) => setValues((v) => ({ ...v, [id]: val }));

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/sports")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">Set your focus</h1>
          <p className="text-muted-foreground text-sm mt-2">How important is each activity to you?</p>
        </motion.div>

        <div className="flex-1 mt-10 space-y-8">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.id}
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{area.icon}</span>
                  <span className="font-medium">{area.label}</span>
                </div>
                <span className="text-primary font-display font-bold text-lg">{values[area.id]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={values[area.id]}
                onChange={(e) => update(area.id, Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #95FFC3 0%, #6DEBFF ${values[area.id] * 10}%, rgba(255,255,255,0.08) ${values[area.id] * 10}%, rgba(255,255,255,0.08) 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>Not a priority</span>
                <span>Top priority</span>
              </div>
            </motion.div>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/activities")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default FocusScreen;
