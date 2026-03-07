import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";

const BirthdateScreen = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("06");
  const [year, setYear] = useState("1995");

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={4} total={6} />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground text-sm mb-2">Step 4 of 6</p>
          <h1 className="font-display text-2xl font-bold">When were you born?</h1>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            className="flex gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: "Day", value: day, setter: setDay, placeholder: "DD", max: 2 },
              { label: "Month", value: month, setter: setMonth, placeholder: "MM", max: 2 },
              { label: "Year", value: year, setter: setYear, placeholder: "YYYY", max: 4 },
            ].map((field) => (
              <div key={field.label} className="flex-1 flex flex-col items-center gap-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  maxLength={field.max}
                  className="w-full text-center text-2xl font-display font-bold py-5 rounded-2xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <MetafiButton onClick={() => navigate("/name")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default BirthdateScreen;
