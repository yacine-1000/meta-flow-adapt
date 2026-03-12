import { motion } from "framer-motion";
import { MetafiScreen } from "@/components/MetafiScreen";
import { Home, Dumbbell, User, ChevronRight, Crown, RefreshCw, UserCircle, CreditCard, Mail, Shield, FileText } from "lucide-react";
import metafiIcon from "@/assets/metafi-icon.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { userName, userPhone } = useUser();
  const { t } = useLanguage();

  const displayName = userName || "User";
  const initial = displayName.charAt(0).toUpperCase();
  const displayPhone = userPhone || "+1 (555) 000-0000";

  const sections = [
    {
      label: t("profile.workout"),
      rows: [
        { icon: RefreshCw, label: t("profile.change_plan") },
        { icon: UserCircle, label: t("profile.personal_info") },
      ],
    },
    {
      label: t("profile.account"),
      rows: [
        { icon: CreditCard, label: t("profile.subscription") },
        { icon: Mail, label: t("profile.contact_us") },
      ],
    },
    {
      label: t("profile.legal"),
      rows: [
        { icon: Shield, label: t("profile.privacy_policy") },
        { icon: FileText, label: t("profile.terms") },
      ],
    },
  ];

  return (
    <MetafiScreen glowPosition="top" glowIntensity="subtle">
      <div className="flex flex-col min-h-screen px-6 pt-14 pb-28">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold">{t("profile.title")}</h1>
          <img src={metafiIcon} alt="Metafi" className="w-10 h-10 object-contain" />
        </motion.div>

        {/* User identity card */}
        <motion.div
          className="relative rounded-2xl p-5 mt-6 border border-white/[0.08]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05))",
                border: "1px solid hsl(var(--primary) / 0.15)",
              }}
            >
              <span className="text-xl font-display font-bold text-primary">{initial}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg truncate">{displayName}</span>
                <span
                  className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.08))",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--primary) / 0.15)",
                  }}
                >
                  {t("profile.pro")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground/60 mt-0.5" dir="ltr">{displayPhone}</p>
            </div>
          </div>
        </motion.div>

        {/* Settings sections */}
        {sections.map((section, sectionIdx) => (
          <motion.div
            key={section.label}
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + sectionIdx * 0.08 }}
          >
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium mb-2 px-1">
              {section.label}
            </p>
            <div
              className="rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {section.rows.map((row, rowIdx) => (
                <button
                  key={row.label}
                  className="w-full flex items-center gap-3.5 px-5 py-4 hover:bg-white/[0.03] transition-colors"
                  style={rowIdx < section.rows.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.04)" } : {}}
                >
                  <row.icon className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1 text-start">{row.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/20 flex-shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-4">
          <div className="glass-card-strong rounded-2xl py-3 px-8 flex justify-around">
            {[
              { icon: Home, label: t("nav.home"), active: false, path: "/dashboard" },
              { icon: Dumbbell, label: t("nav.plan"), active: false, path: "/plan" },
              { icon: User, label: t("nav.profile"), active: true, path: "/profile" },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1">
                <item.icon className={`w-5 h-5 ${item.active ? "text-primary" : "text-muted-foreground/30"}`} />
                <span className={`text-[10px] ${item.active ? "text-primary font-medium" : "text-muted-foreground/30"}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MetafiScreen>
  );
};

export default ProfileScreen;
