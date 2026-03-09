import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  completedExercises: Set<number>;
  markExerciseDone: (index: number) => void;
  workoutDone: boolean;
  streak: number;
  completedDays: number[];
  todayDayIndex: number;
}

const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
  completedExercises: new Set(),
  markExerciseDone: () => {},
  workoutDone: false,
  streak: 3,
  completedDays: [0],
  todayDayIndex: 0,
});

const TOTAL_EXERCISES = 6;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState("");
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [workoutDone, setWorkoutDone] = useState(false);
  const [streak, setStreak] = useState(3);
  const [completedDays, setCompletedDays] = useState<number[]>([0]); // Monday already done
  const todayDayIndex = 2; // Wednesday (0=Mon)

  const markExerciseDone = useCallback((index: number) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      next.add(index);
      // Check if all exercises are done
      if (next.size >= TOTAL_EXERCISES && !workoutDone) {
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
