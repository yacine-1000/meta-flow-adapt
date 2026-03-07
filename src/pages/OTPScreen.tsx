import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";

const OTPScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <MetafiScreen showGlow={false}>
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold">Verify your number</h1>
          <p className="text-muted-foreground text-sm mt-2">Enter the 6-digit code we sent you</p>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            className="flex gap-3 justify-center"
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
                className="w-12 h-14 text-center text-xl font-display font-bold rounded-xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            ))}
          </motion.div>

          <motion.button
            className="text-primary text-sm mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Resend code
          </motion.button>
        </div>

        <MetafiButton onClick={() => navigate("/verified")} disabled={otp.some((d) => !d)}>
          Verify
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default OTPScreen;
