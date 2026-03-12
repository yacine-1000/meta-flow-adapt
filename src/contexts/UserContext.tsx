import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
  selectedSports: string[];
  setSelectedSports: (sports: string[]) => void;
  completedExercises: number[];
  markExerciseDone: (index: number) => void;
  workoutDone: boolean;
  streak: number;
  completedDays: number[];
  todayDayIndex: number;
  justCompleted: boolean;
  clearJustCompleted: () => void;
}

const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
  userPhone: "",
  setUserPhone: () => {},
  selectedSports: [],
  setSelectedSports: () => {},
  completedExercises: [],
  markExerciseDone: () => {},
  workoutDone: false,
  streak: 3,
  completedDays: [0],
  todayDayIndex: 0,
  justCompleted: false,
  clearJustCompleted: () => {},
});

const TOTAL_EXERCISES = 6;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [workoutDone, setWorkoutDone] = useState(false);
  const [streak, setStreak] = useState(3);
  const [completedDays, setCompletedDays] = useState<number[]>([0]);
  const [justCompleted, setJustCompleted] = useState(false);
  const todayDayIndex = 2;

  const clearJustCompleted = () => setJustCompleted(false);

  const markExerciseDone = (index: number) => {
    setCompletedExercises((prev) => {
      if (prev.includes(index)) return prev;
      const next = [...prev, index];
      return next;
    });
    setJustCompleted(true);
    setCompletedExercises((current) => {
      if (current.length >= TOTAL_EXERCISES && !workoutDone) {
        setWorkoutDone(true);
        setStreak((s) => s + 1);
        setCompletedDays((d) => (d.includes(todayDayIndex) ? d : [...d, todayDayIndex]));
      }
      return current;
    });
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userPhone,
        setUserPhone,
        selectedSports,
        setSelectedSports,
        completedExercises,
        markExerciseDone,
        workoutDone,
        streak,
        completedDays,
        todayDayIndex,
        justCompleted,
        clearJustCompleted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
