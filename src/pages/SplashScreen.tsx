import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import metafiIcon from "@/assets/metafi-icon.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <MetafiScreen glowPosition="center" glowIntensity="strong">
      <div
        className="flex-1 flex flex-col items-center justify-center px-8 cursor-pointer"
        onClick={() => navigate("/gender")}
      >
        {/* Concentric glow rings */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.06) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.1) 0%, transparent 70%)" }}
            animate={{ scale: [1.05, 1.25, 1.05], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
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
          <span className="text-gradient-mint">Meta</span>
          <span className="text-foreground">fi</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-sm mt-4 text-center tracking-wide uppercase"
          style={{ letterSpacing: "0.2em", fontSize: "10px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Intelligent Performance Planning
        </motion.p>

        <motion.div
          className="mt-20 flex items-center gap-2"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-primary/40" />
          <span className="text-muted-foreground/40 text-[10px] tracking-widest uppercase">Tap to begin</span>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>
      </div>
    </MetafiScreen>
  );
};

export default SplashScreen;
