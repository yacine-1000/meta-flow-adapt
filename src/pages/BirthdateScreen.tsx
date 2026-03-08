import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { CalendarDays } from "lucide-react";

const BirthdateScreen = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("06");
  const [year, setYear] = useState("1995");

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={4} total={6} />

        <div className="mt-4">
          <BackButton to="/weight" />
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-primary/80 text-xs font-medium tracking-widest uppercase mb-3">Step 4 of 6</p>
          <h1 className="font-display text-3xl font-bold leading-tight">When were<br />you born?</h1>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 mt-8 mb-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-primary" />
          </div>
          <span className="text-muted-foreground text-sm">Enter your date of birth</span>
        </motion.div>

        <motion.div
          className="flex gap-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: "Day", value: day, setter: setDay, placeholder: "DD", max: 2 },
            { label: "Month", value: month, setter: setMonth, placeholder: "MM", max: 2 },
            { label: "Year", value: year, setter: setYear, placeholder: "YYYY", max: 4 },
          ].map((field) => (
            <div key={field.label} className="flex-1 flex flex-col items-center gap-3">
              <label className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em]">{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                maxLength={field.max}
                className="w-full text-center text-2xl font-display font-bold py-5 rounded-2xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/20 transition-all"
              />
            </div>
          ))}
        </motion.div>

        <div className="flex-1" />

        <MetafiButton onClick={() => navigate("/name")}>Continue</MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default BirthdateScreen;
