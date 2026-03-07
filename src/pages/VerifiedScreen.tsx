import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetafiScreen } from "@/components/MetafiScreen";
import { MetafiButton } from "@/components/MetafiButton";
import { CheckCircle } from "lucide-react";

const VerifiedScreen = () => {
  const navigate = useNavigate();

  return (
    <MetafiScreen glowPosition="center">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="absolute inset-0 w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-pulse-glow"
            style={{ background: "radial-gradient(circle, rgba(149,255,195,0.25) 0%, transparent 70%)" }}
          />
          <CheckCircle className="w-20 h-20 text-primary relative z-10" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          className="font-display text-2xl font-bold mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          You're verified
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-center mt-3 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Welcome to Metafi. Let's build your first plan.
        </motion.p>

        <motion.div
          className="w-full mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <MetafiButton onClick={() => navigate("/home")}>
            Get Started
          </MetafiButton>
        </motion.div>
      </div>
    </MetafiScreen>
  );
};

export default VerifiedScreen;
