import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";

const NameScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={5} total={6} />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground text-sm mb-2">Step 5 of 6</p>
          <h1 className="font-display text-2xl font-bold">What's your name?</h1>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full text-2xl font-display font-semibold py-5 px-6 rounded-2xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/30 transition-all"
              autoFocus
            />
          </motion.div>
        </div>

        <MetafiButton onClick={() => navigate("/phone")} disabled={!name.trim()}>
          Continue
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default NameScreen;
