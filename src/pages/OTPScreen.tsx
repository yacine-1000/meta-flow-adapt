import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock } from "lucide-react";

const OTPScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { t } = useLanguage();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <div className="mt-2">
          <BackButton to="/phone" />
        </div>

        <div className="mt-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Lock className="w-7 h-7 text-primary" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold">{t("otp.title")}</h1>
            <p className="text-muted-foreground text-sm mt-3">{t("otp.hint")}</p>
          </motion.div>

          <motion.div
            className="flex gap-2.5 justify-center"
            dir="ltr"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                className={`w-12 h-14 text-center text-xl font-display font-bold rounded-xl bg-transparent focus:outline-none transition-all ${
                  digit ? "glass-card-strong ring-1 ring-primary/30" : "glass-card"
                }`}
              />
            ))}
          </motion.div>

          <motion.button
            className="text-primary/70 text-xs mt-8 text-center w-full hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t("otp.resend")}
          </motion.button>
        </div>

        <div className="flex-1" />

        <MetafiButton onClick={() => navigate("/verified")} disabled={otp.some((d) => !d)}>
          {t("otp.verify")}
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default OTPScreen;
