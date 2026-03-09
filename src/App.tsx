import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { UserProvider } from "@/contexts/UserContext";
import SplashScreen from "./pages/SplashScreen";
import GenderScreen from "./pages/GenderScreen";
import HeightScreen from "./pages/HeightScreen";
import WeightScreen from "./pages/WeightScreen";
import BirthdateScreen from "./pages/BirthdateScreen";
import NameScreen from "./pages/NameScreen";
import PhoneScreen from "./pages/PhoneScreen";
import OTPScreen from "./pages/OTPScreen";
import VerifiedScreen from "./pages/VerifiedScreen";
import HomeScreen from "./pages/HomeScreen";
import SportsScreen from "./pages/SportsScreen";
import FocusScreen from "./pages/FocusScreen";
import ActivitiesScreen from "./pages/ActivitiesScreen";
import EquipmentScreen from "./pages/EquipmentScreen";
import InjuriesScreen from "./pages/InjuriesScreen";
import SeverityScreen from "./pages/SeverityScreen";
import TrainingLevelScreen from "./pages/TrainingLevelScreen";
import GoalScreen from "./pages/GoalScreen";
import LiftingDaysScreen from "./pages/LiftingDaysScreen";
import GeneratingScreen from "./pages/GeneratingScreen";
import DashboardScreen from "./pages/DashboardScreen";
import PlanScreen from "./pages/PlanScreen";
import EditPlanScreen from "./pages/EditPlanScreen";
import ExerciseDetailScreen from "./pages/ExerciseDetailScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/gender" element={<GenderScreen />} />
              <Route path="/height" element={<HeightScreen />} />
              <Route path="/weight" element={<WeightScreen />} />
              <Route path="/birthdate" element={<BirthdateScreen />} />
              <Route path="/name" element={<NameScreen />} />
              <Route path="/phone" element={<PhoneScreen />} />
              <Route path="/otp" element={<OTPScreen />} />
              <Route path="/verified" element={<VerifiedScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/sports" element={<SportsScreen />} />
              <Route path="/focus" element={<FocusScreen />} />
              <Route path="/activities" element={<ActivitiesScreen />} />
              <Route path="/equipment" element={<EquipmentScreen />} />
              <Route path="/injuries" element={<InjuriesScreen />} />
              <Route path="/severity" element={<SeverityScreen />} />
              <Route path="/training-level" element={<TrainingLevelScreen />} />
              <Route path="/goal" element={<GoalScreen />} />
              <Route path="/lifting-days" element={<LiftingDaysScreen />} />
              <Route path="/generating" element={<GeneratingScreen />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/plan" element={<PlanScreen />} />
              <Route path="/edit-plan" element={<EditPlanScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
