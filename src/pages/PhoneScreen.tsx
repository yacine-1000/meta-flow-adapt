import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";

const PhoneScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const { t, isRTL } = useLanguage();
  const { setUserPhone } = useUser();

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <FloatingOrbs />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8 relative z-10">
        <ProgressBar step={6} total={8} />

        <div className="mt-4">
          <BackButton to="/name" />
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold leading-tight">{t("phone.title1")}<br />{t("phone.title2")}</h1>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full text-lg py-5 px-6 rounded-2xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/20 transition-all text-center"
            autoFocus
            dir="ltr"
          />
        </motion.div>

        <div className="flex-1 min-h-[60px]" />

        <MetafiButton onClick={() => { setUserPhone(phone); navigate("/otp"); }} disabled={phone.length < 6}>
          {t("phone.send")}
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default PhoneScreen;
