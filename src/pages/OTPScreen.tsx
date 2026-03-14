import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { ProgressBar } from "@/components/ProgressBar";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { useLanguage } from "@/contexts/LanguageContext";

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
      <FloatingOrbs />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8 relative z-10">
        <ProgressBar step={7} total={8} />

        <div className="mt-2">
          <BackButton to="/phone" />
        </div>

        <div className="mt-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
                className={`w-12 h-14 text-center text-xl font-display font-bold rounded-xl bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all border ${
                  digit ? "border-primary/30" : "border-white/[0.08]"
                }`}
                style={{
                  background: digit
                    ? "linear-gradient(135deg, rgba(149,255,195,0.06) 0%, rgba(149,255,195,0.02) 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: digit
                    ? "0 2px 12px rgba(149,255,195,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
                    : "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
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
