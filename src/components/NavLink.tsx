import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface BackButtonProps {
  to?: string | number;
}

export const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const Icon = isRTL ? ArrowRight : ArrowLeft;
  return (
    <button
      onClick={() => (typeof to === "number" ? navigate(to as any) : navigate(to || "/"))}
      className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};
