import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ArrowLeft } from "lucide-react";

const injuries = [
  { id: "hip", label: "Hip" },
  { id: "quad", label: "Quad" },
  { id: "upper-back", label: "Upper Back" },
];

const severityLabels = ["No pain", "Mild", "Moderate", "Severe"];

const SeverityScreen = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, number>>({
    hip: 3,
    quad: 2,
    "upper-back": 4,
  });

  const update = (id: string, val: number) => setValues((v) => ({ ...v, [id]: val }));

  const getSeverityColor = (val: number) => {
    if (val <= 2) return "#95FFC3";
    if (val <= 5) return "#FFD66B";
    if (val <= 7) return "#FFB36B";
    return "#FF6B6B";
  };

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <button onClick={() => navigate("/injuries")} className="self-start text-muted-foreground mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">How severe?</h1>
          <p className="text-muted-foreground text-sm mt-2">This helps us adjust exercise selection</p>
        </motion.div>

        <div className="flex-1 mt-10 space-y-8">
          {injuries.map((injury, i) => (
            <motion.div
              key={injury.id}
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">{injury.label}</span>
                <span className="font-display font-bold text-lg" style={{ color: getSeverityColor(values[injury.id]) }}>
                  {values[injury.id]}/10
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={values[injury.id]}
                onChange={(e) => update(injury.id, Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${getSeverityColor(values[injury.id])} 0%, ${getSeverityColor(values[injury.id])} ${values[injury.id] * 10}%, rgba(255,255,255,0.08) ${values[injury.id] * 10}%, rgba(255,255,255,0.08) 100%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                {severityLabels.map((label) => (
                  <span key={label} className="text-[9px] text-muted-foreground">{label}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <MetafiButton onClick={() => navigate("/training-level")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default SeverityScreen;
