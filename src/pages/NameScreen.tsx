import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/NavLink";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserCircle } from "lucide-react";

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
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <ProgressBar step={5} total={6} />

        <div className="mt-4">
          <BackButton to="/birthdate" />
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-primary/80 text-xs font-medium tracking-widest uppercase mb-3">{t("step_of", { x: "5", y: "6" })}</p>
          <h1 className="font-display text-3xl font-bold leading-tight">{t("name.title1")}<br />{t("name.title2")}</h1>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 mt-8 mb-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-primary" />
          </div>
          <span className="text-muted-foreground text-sm">{t("name.hint")}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
