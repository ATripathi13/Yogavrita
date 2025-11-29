import { UserProfile, ClassSequence, isUserProfile } from '../models/types';

const STORAGE_VERSION = 1;
const PROFILE_KEY = 'yogavrita_profile';
const SEQUENCES_KEY = 'yogavrita_sequences';

interface StorageData {
  version: number;
  profile?: UserProfile;
  sequences?: ClassSequence[];
}

export class StorageService {
  /**
   * Save user profile to localStorage
   */
  static saveProfile(profile: UserProfile): void {
    try {
      const data: StorageData = {
        version: STORAGE_VERSION,
        profile: {
          ...profile,
          createdAt: profile.createdAt instanceof Date ? profile.createdAt.toISOString() : profile.createdAt,
          completedSessions: profile.completedSessions.map(session => ({
            ...session,
            completedAt: session.completedAt instanceof Date ? session.completedAt.toISOString() : session.completedAt
          }))
        } as any
      };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please clear browser data.');
      } else if (error instanceof Error && error.name === 'SecurityError') {
        throw new Error('Storage access denied. Please check browser settings.');
      }
      throw error;
    }
  }

  /**
   * Load user profile from localStorage
   */
  static loadProfile(): UserProfile | null {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (!stored) return null;

      const data: StorageData = JSON.parse(stored);
      
      // Validate data structure
      if (!data.profile || !isUserProfile(data.profile)) {
        console.warn('Corrupted profile data, resetting...');
        return null;
      }

      // Convert date strings back to Date objects
      const profile = {
        ...data.profile,
        createdAt: new Date(data.profile.createdAt),
        completedSessions: data.profile.completedSessions.map(session => ({
          ...session,
          completedAt: new Date(session.completedAt)
        }))
      };

      return profile;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  }

  /**
   * Save class sequences to localStorage
   */
  static saveClassSequences(sequences: ClassSequence[]): void {
    try {
      const data: StorageData = {
        version: STORAGE_VERSION,
        sequences
      };
      localStorage.setItem(SEQUENCES_KEY, JSON.stringify(data));
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please clear browser data.');
      } else if (error instanceof Error && error.name === 'SecurityError') {
        throw new Error('Storage access denied. Please check browser settings.');
      }
      throw error;
    }
  }

  /**
   * Load class sequences from localStorage
   */
  static loadClassSequences(): ClassSequence[] | null {
    try {
      const stored = localStorage.getItem(SEQUENCES_KEY);
      if (!stored) return null;

      const data: StorageData = JSON.parse(stored);
      
      if (!data.sequences || !Array.isArray(data.sequences)) {
        console.warn('Corrupted sequences data');
        return null;
      }

      return data.sequences;
    } catch (error) {
      console.error('Error loading sequences:', error);
      return null;
    }
  }

  /**
   * Clear all stored data
   */
  static clearAll(): void {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(SEQUENCES_KEY);
  }
}
