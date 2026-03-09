import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  completedExercises: number[];
  markExerciseDone: (index: number) => void;
  workoutDone: boolean;
  streak: number;
  completedDays: number[];
  todayDayIndex: number;
}

const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
  completedExercises: [],
  markExerciseDone: () => {},
  workoutDone: false,
  streak: 3,
  completedDays: [0],
  todayDayIndex: 0,
});

const TOTAL_EXERCISES = 6;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState("");
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [workoutDone, setWorkoutDone] = useState(false);
  const [streak, setStreak] = useState(3);
  const [completedDays, setCompletedDays] = useState<number[]>([0]);
  const todayDayIndex = 2; // Wednesday

  const markExerciseDone = useCallback((index: number) => {
    setCompletedExercises((prev) => {
      if (prev.includes(index)) return prev;
      const next = [...prev, index];
      if (next.length >= TOTAL_EXERCISES && !workoutDone) {
        setWorkoutDone(true);
        setStreak((s) => s + 1);
        setCompletedDays((d) => (d.includes(todayDayIndex) ? d : [...d, todayDayIndex]));
      }
      return next;
    });
  }, [workoutDone, todayDayIndex]);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        completedExercises,
        markExerciseDone,
        workoutDone,
        streak,
        completedDays,
        todayDayIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
