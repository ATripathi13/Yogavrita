import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, CompletedSession } from '../models/types';
import { StorageService } from '../services/StorageService';
import { StreakCalculator } from '../utils/StreakCalculator';

interface UserProfileContextType {
  profile: UserProfile | null;
  createProfile: (name: string, email: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSchedule: (time: string | null) => void;
  completeSession: (session: CompletedSession) => void;
  clearProfile: () => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Load profile on mount
  useEffect(() => {
    const loaded = StorageService.loadProfile();
    if (loaded) {
      setProfile(loaded);
    }
  }, []);

  // Save profile whenever it changes
  useEffect(() => {
    if (profile) {
      StorageService.saveProfile(profile);
    }
  }, [profile]);

  const createProfile = (name: string, email: string) => {
    const newProfile: UserProfile = {
      id: crypto.randomUUID(),
      name,
      email,
      createdAt: new Date(),
      scheduledTime: null,
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      completedSessions: []
    };
    setProfile(newProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    setProfile({ ...profile, ...updates });
  };

  const updateSchedule = (time: string | null) => {
    if (!profile) return;
    setProfile({ ...profile, scheduledTime: time });
  };

  const completeSession = (session: CompletedSession) => {
    if (!profile) return;

    // Add session to completed sessions
    const updatedSessions = [...profile.completedSessions, session];

    // Update streak
    const updatedProfile = StreakCalculator.updateStreakOnCompletion(
      { ...profile, completedSessions: updatedSessions },
      new Date(session.date)
    );

    setProfile(updatedProfile);
  };

  const clearProfile = () => {
    setProfile(null);
    StorageService.clearAll();
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        createProfile,
        updateProfile,
        updateSchedule,
        completeSession,
        clearProfile
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
