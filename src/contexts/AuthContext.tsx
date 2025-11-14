// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProgress, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedProgress = localStorage.getItem('userProgress');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any password
    const demoUser: User = {
      id: '1',
      email,
      firstName: 'Demo',
      lastName: 'User',
      createdAt: new Date()
    };

    const demoProgress: UserProgress = {
      userId: '1',
      completedActivities: ['counting-14'],
      scores: {
        'counting-14': {
          score: 8,
          maxScore: 10,
          completedAt: new Date(),
          timeSpent: 300
        }
      },
      totalTimeSpent: 300,
      streak: 1,
      lastActivityDate: new Date()
    };

    setUser(demoUser);
    setUserProgress(demoProgress);
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('userProgress', JSON.stringify(demoProgress));
    setIsLoading(false);
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date()
    };

    const newProgress: UserProgress = {
      userId: newUser.id,
      completedActivities: [],
      scores: {},
      totalTimeSpent: 0,
      streak: 0,
      lastActivityDate: null
    };

    setUser(newUser);
    setUserProgress(newProgress);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setUserProgress(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userProgress');
  };

  const updateProgress = (activityId: string, score: number, maxScore: number, timeSpent: number) => {
    if (!userProgress) return;

    const updatedProgress: UserProgress = {
      ...userProgress,
      completedActivities: userProgress.completedActivities.includes(activityId)
        ? userProgress.completedActivities
        : [...userProgress.completedActivities, activityId],
      scores: {
        ...userProgress.scores,
        [activityId]: {
          score,
          maxScore,
          completedAt: new Date(),
          timeSpent
        }
      },
      totalTimeSpent: userProgress.totalTimeSpent + timeSpent,
      streak: calculateStreak(userProgress),
      lastActivityDate: new Date()
    };

    setUserProgress(updatedProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
  };

  const calculateStreak = (progress: UserProgress): number => {
    // Simple streak calculation - in real app, you'd check consecutive days
    return progress.streak + 1;
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProgress,
      login,
      register,
      logout,
      updateProgress,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};