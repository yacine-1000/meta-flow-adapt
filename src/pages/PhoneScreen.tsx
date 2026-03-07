import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Phone } from "lucide-react";

const PhoneScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={6} total={6} />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground text-sm mb-2">Step 6 of 6</p>
          <h1 className="font-display text-2xl font-bold">Enter your phone number</h1>
          <p className="text-muted-foreground text-sm mt-2">We'll send you a verification code</p>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Phone className="w-5 h-5" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full text-lg py-5 pl-14 pr-6 rounded-2xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/30 transition-all"
              autoFocus
            />
          </motion.div>
        </div>

        <MetafiButton onClick={() => navigate("/otp")} disabled={phone.length < 6}>
          Send Code
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default PhoneScreen;
