import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { BackButton } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Mail, ChevronRight } from "lucide-react";

const ContactScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const contacts = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      desc: t("contact.whatsapp_desc"),
      action: () => window.open("https://wa.me/966500000000", "_blank"),
    },
    {
      icon: Mail,
      label: t("contact.email"),
      desc: "support@metafi.app",
      action: () => window.open("mailto:support@metafi.app"),
    },
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
          <h1 className="font-display text-2xl font-bold">{t("profile.contact_us")}</h1>
          <p className="text-sm text-muted-foreground mt-2">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="mt-8 space-y-3">
          {contacts.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              className="w-full rounded-2xl border border-white/[0.08] p-5 flex items-center gap-4 hover:bg-white/[0.03] transition-colors"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                backdropFilter: "blur(40px)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/[0.08] flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary/70" />
              </div>
              <div className="flex-1 text-start">
                <span className="text-sm font-medium">{item.label}</span>
                <p className="text-[11px] text-muted-foreground/50 mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/20 flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </MetafiScreen>
  );
};

export default ContactScreen;
