import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

const NameScreen = () => {
  const navigate = useNavigate();
  const { setUserName } = useUser();
  const [name, setName] = useState("");
  const { t } = useLanguage();

  const handleContinue = () => {
    setUserName(name.trim());
    navigate("/phone");
  };

  return (
    <MetafiScreen glowPosition="center" glowIntensity="subtle">
      <FloatingOrbs />
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8 relative z-10">
        <ProgressBar step={5} total={8} />

        <div className="mt-4">
          <BackButton to="/birthdate" />
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold leading-tight">{t("name.title1")}<br />{t("name.title2")}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name.placeholder")}
            className="w-full text-xl font-display font-semibold py-5 px-6 rounded-2xl glass-card-strong bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/20 transition-all text-center"
            autoFocus
          />
        </motion.div>

        <div className="flex-1" />

        <MetafiButton onClick={handleContinue} disabled={!name.trim()}>
          {t("continue")}
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default NameScreen;
