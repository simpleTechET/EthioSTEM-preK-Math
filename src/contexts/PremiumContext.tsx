import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PremiumContextType {
  isPremium: boolean;
  studentName: string;
  studentPhoto: string | null;
  studentVideo: string | null;
  setPremiumStatus: (status: boolean) => void;
  setStudentData: (name: string, photo: string | null, video: string | null) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [studentName, setStudentName] = useState('Student');
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);
  const [studentVideo, setStudentVideo] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage
    const premiumStatus = localStorage.getItem('ethiostem-premium') === 'true';
    const name = localStorage.getItem('ethiostem-student-name') || 'Student';
    const photo = localStorage.getItem('ethiostem-student-photo');
    const video = localStorage.getItem('ethiostem-student-video');

    setIsPremium(premiumStatus);
    setStudentName(name);
    setStudentPhoto(photo);
    setStudentVideo(video);
  }, []);

  const setPremiumStatus = (status: boolean) => {
    setIsPremium(status);
    localStorage.setItem('ethiostem-premium', String(status));
  };

  const setStudentData = (name: string, photo: string | null, video: string | null) => {
    setStudentName(name);
    setStudentPhoto(photo);
    setStudentVideo(video);
    
    localStorage.setItem('ethiostem-student-name', name);
    if (photo) localStorage.setItem('ethiostem-student-photo', photo);
    if (video) localStorage.setItem('ethiostem-student-video', video);
  };

  return (
    <PremiumContext.Provider value={{ 
      isPremium, 
      studentName, 
      studentPhoto, 
      studentVideo, 
      setPremiumStatus, 
      setStudentData 
    }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within PremiumProvider');
  }
  return context;
};
