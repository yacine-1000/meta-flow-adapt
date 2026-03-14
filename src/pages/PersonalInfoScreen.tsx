import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { BackButton } from "@/components/NavLink";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

const PersonalInfoScreen = () => {
  const navigate = useNavigate();
  const { userName, setUserName } = useUser();
  const { t } = useLanguage();

  const [name, setName] = useState(userName || "");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("178");

  const handleSave = () => {
    setUserName(name.trim());
    navigate("/profile");
  };

  const fields = [
    { label: t("personal.name"), value: name, onChange: setName, type: "text" },
    { label: t("personal.age"), value: age, onChange: setAge, type: "number" },
    { label: t("personal.weight_label"), value: weight, onChange: setWeight, type: "number", suffix: t("weight.kg") },
    { label: t("personal.height_label"), value: height, onChange: setHeight, type: "number", suffix: t("height.cm") },
  ];

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-8">
        <BackButton to="/profile" />

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold">{t("profile.personal_info")}</h1>
          <p className="text-sm text-muted-foreground mt-2">{t("personal.subtitle")}</p>
        </motion.div>

        <div className="flex-1 mt-8 space-y-4">
          {fields.map((field, i) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <label className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.15em] font-medium mb-2 block px-1">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full text-sm font-medium py-4 px-5 rounded-2xl border border-white/[0.08] bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/20 placeholder:text-muted-foreground/20 transition-all"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(20px)",
                  }}
                />
                {field.suffix && (
                  <span className="absolute end-5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40">
                    {field.suffix}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <MetafiButton onClick={handleSave}>
          {t("personal.save")}
        </MetafiButton>
      </div>
    </MetafiScreen>
  );
};

export default PersonalInfoScreen;
