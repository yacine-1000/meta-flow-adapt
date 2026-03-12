import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";

const VerifiedScreen = () => {
  const navigate = useNavigate();
  const { userName } = useUser();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MetafiScreen glowPosition="center" glowIntensity="strong">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
        >
          <motion.div
            className="absolute w-40 h-40 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.2) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center relative z-10">
            <CheckCircle className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.h1
          className="font-display text-3xl font-bold mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("verified.title")}
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-center mt-4 text-sm leading-relaxed max-w-[260px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {userName ? t("verified.welcome_user", { name: userName }) : t("verified.welcome")}
          {t("verified.desc")}
        </motion.p>

        <motion.div
          className="mt-12 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        </motion.div>
      </div>
    </MetafiScreen>
  );
};

export default VerifiedScreen;
