import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLanguage } from "@/contexts/LanguageContext";
import metafiIcon from "@/assets/metafi-icon.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen">
        <div className="pt-14 px-6">
          <LanguageSwitch />
        </div>
        <div
          className="flex-1 flex flex-col items-center justify-center px-8 cursor-pointer"
          onClick={() => navigate("/gender")}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(149,255,195,0.08) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={metafiIcon}
              alt="Metafi"
              className="w-20 h-20 relative z-10"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <motion.h1
            className="font-display text-4xl font-bold mt-10 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gradient-mint">Metafi</span>
          </motion.h1>

          <motion.p
            className="text-foreground/60 text-sm mt-4 text-center tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {t("splash.tagline")}
          </motion.p>

          <motion.div
            className="mt-20 flex items-center gap-3"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-foreground/50 text-xs tracking-widest uppercase font-medium">{t("splash.tap")}</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default SplashScreen;
