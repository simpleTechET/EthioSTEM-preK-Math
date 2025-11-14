export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface UserProgress {
  userId: string;
  completedActivities: string[];
  scores: {
    [activityId: string]: {
      score: number;
      maxScore: number;
      completedAt: Date;
      timeSpent: number;
    };
  };
  totalTimeSpent: number;
  streak: number;
  lastActivityDate: Date | null;
}

export interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
  updateProgress: (activityId: string, score: number, maxScore: number, timeSpent: number) => void;
  isLoading: boolean;
}