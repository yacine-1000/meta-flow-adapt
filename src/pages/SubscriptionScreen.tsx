import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Crown } from "lucide-react";

const SubscriptionScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    t("sub.feature1"),
    t("sub.feature2"),
    t("sub.feature3"),
    t("sub.feature4"),
  ];

  return (
    <MetafiScreen glowPosition="center" glowIntensity="medium">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/profile" />

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", damping: 20 }}
          >
            <Crown className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="font-display text-2xl font-bold">{t("sub.title")}</h1>
          <p className="text-sm text-muted-foreground mt-2">{t("sub.subtitle")}</p>
        </motion.div>

        <motion.div
          className="mt-10 rounded-2xl border border-white/[0.08] p-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(40px)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="text-center mb-6">
            <span className="text-3xl font-display font-bold text-foreground">$9.99</span>
            <span className="text-sm text-muted-foreground ms-1">/ {t("sub.month")}</span>
          </div>
          <div className="space-y-3.5">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{feat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex-1" />

        <MetafiButton onClick={() => navigate("/profile")}>
          {t("sub.subscribe")}
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default SubscriptionScreen;
