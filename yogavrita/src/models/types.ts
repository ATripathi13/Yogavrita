// Core data models for YOGAVRITA

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type BreathingPattern = 'inhale-exhale' | 'hold' | 'none';

export interface Asana {
  id: string;
  name: string;
  durationSeconds: number;
  breathingPattern: BreathingPattern;
  breathingCycleSeconds: number;
  instructions?: string;
}

export interface ClassSequence {
  day: DayOfWeek;
  asanas: Asana[];
  totalDurationSeconds: number;
}

export interface CompletedSession {
  id: string;
  date: string; // ISO date string
  day: string;
  completedAt: Date;
  durationSeconds: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  scheduledTime: string | null; // HH:MM format
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null; // ISO date string
  completedSessions: CompletedSession[];
}

// Type guards for runtime validation
export function isUserProfile(obj: unknown): obj is UserProfile {
  if (typeof obj !== 'object' || obj === null) return false;
  const profile = obj as UserProfile;
  return (
    typeof profile.id === 'string' &&
    typeof profile.name === 'string' &&
    typeof profile.email === 'string' &&
    (profile.createdAt instanceof Date || typeof profile.createdAt === 'string') &&
    (profile.scheduledTime === null || typeof profile.scheduledTime === 'string') &&
    typeof profile.currentStreak === 'number' &&
    typeof profile.longestStreak === 'number' &&
    (profile.lastPracticeDate === null || typeof profile.lastPracticeDate === 'string') &&
    Array.isArray(profile.completedSessions)
  );
}

export function isClassSequence(obj: unknown): obj is ClassSequence {
  if (typeof obj !== 'object' || obj === null) return false;
  const sequence = obj as ClassSequence;
  return (
    typeof sequence.day === 'string' &&
    Array.isArray(sequence.asanas) &&
    typeof sequence.totalDurationSeconds === 'number'
  );
}

export function isAsana(obj: unknown): obj is Asana {
  if (typeof obj !== 'object' || obj === null) return false;
  const asana = obj as Asana;
  return (
    typeof asana.id === 'string' &&
    typeof asana.name === 'string' &&
    typeof asana.durationSeconds === 'number' &&
    typeof asana.breathingPattern === 'string' &&
    typeof asana.breathingCycleSeconds === 'number'
  );
}

// Constants
export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const BREATHING_PATTERNS: BreathingPattern[] = [
  'inhale-exhale',
  'hold',
  'none'
];
