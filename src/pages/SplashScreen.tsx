import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import metafiIcon from "@/assets/metafi-icon.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <MetafiScreen glowPosition="center">
      <div className="flex-1 flex flex-col items-center justify-center px-8" onClick={() => navigate("/gender")}>
        {/* Ambient glow rings */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 w-60 h-60 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.08) 0%, transparent 70%)" }}
            animate={{ scale: [1.1, 1.5, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.img
            src={metafiIcon}
            alt="Metafi"
            className="w-24 h-24 relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <motion.h1
          className="font-display text-3xl font-bold mt-8 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="text-gradient-mint">Meta</span>
          <span className="text-foreground">fi</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-sm mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Intelligent Performance Planning
        </motion.p>

        <motion.p
          className="text-muted-foreground/50 text-xs mt-16"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to continue
        </motion.p>
      </div>
    </MetafiScreen>
  );
};

export default SplashScreen;
