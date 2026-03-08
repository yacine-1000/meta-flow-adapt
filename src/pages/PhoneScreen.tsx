import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { Smartphone, Shield } from "lucide-react";

const PhoneScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={6} total={6} />

        <div className="mt-4">
          <BackButton to="/name" />
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-primary/80 text-xs font-medium tracking-widest uppercase mb-3">Step 6 of 6</p>
          <h1 className="font-display text-3xl font-bold leading-tight">Enter your<br />phone number</h1>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 mt-8 mb-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="text-muted-foreground text-sm">We'll send a verification code</span>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <Smartphone className="w-5 h-5 text-muted-foreground/40" />
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full text-lg py-5 pl-14 pr-6 rounded-2xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/20 transition-all"
            autoFocus
          />
        </motion.div>

        <div className="flex-1 min-h-[60px]" />

        <MetafiButton onClick={() => navigate("/otp")} disabled={phone.length < 6}>
          Send Code
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default PhoneScreen;
