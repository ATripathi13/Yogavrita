import { UserProfile, CompletedSession } from '../models/types';

export class StreakCalculator {
  /**
   * Check if a date is Sunday
   */
  private static isSunday(date: Date): boolean {
    return date.getDay() === 0;
  }

  /**
   * Get date string in YYYY-MM-DD format (local time)
   */
  private static getDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get the next practice day after a given date (skipping Sundays)
   */
  private static getNextPracticeDay(date: Date): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    
    // If next day is Sunday, skip to Monday
    if (this.isSunday(next)) {
      next.setDate(next.getDate() + 1);
    }
    
    return next;
  }

  /**
   * Calculate the number of days between two dates (excluding Sundays)
   */
  private static getPracticeDaysBetween(date1: Date, date2: Date): number {
    const start = new Date(date1);
    const end = new Date(date2);
    
    // Normalize to start of day
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    let count = 0;
    const current = new Date(start);
    
    while (current < end) {
      current.setDate(current.getDate() + 1);
      if (!this.isSunday(current)) {
        count++;
      }
    }
    
    return count;
  }

  /**
   * Check if streak should be reset based on last practice date
   */
  static shouldResetStreak(lastPracticeDate: string, currentDate: Date): boolean {
    if (!lastPracticeDate) return false;
    
    const lastDate = new Date(lastPracticeDate);
    const nextExpectedDay = this.getNextPracticeDay(lastDate);
    
    // Normalize dates to compare only date parts
    nextExpectedDay.setHours(0, 0, 0, 0);
    const current = new Date(currentDate);
    current.setHours(0, 0, 0, 0);
    
    // If current date is after the next expected practice day, streak is broken
    return current > nextExpectedDay;
  }

  /**
   * Calculate current streak from completed sessions
   */
  static calculateStreak(completedSessions: CompletedSession[], currentDate: Date): number {
    if (completedSessions.length === 0) return 0;
    
    // Sort sessions by date (most recent first)
    const sorted = [...completedSessions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    let expectedDate = new Date(currentDate);
    expectedDate.setHours(0, 0, 0, 0);
    
    for (const session of sorted) {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
      
      // Check if this session is on the expected date
      if (sessionDate.getTime() === expectedDate.getTime()) {
        streak++;
        // Move to previous practice day
        expectedDate.setDate(expectedDate.getDate() - 1);
        // Skip Sunday
        if (this.isSunday(expectedDate)) {
          expectedDate.setDate(expectedDate.getDate() - 1);
        }
      } else if (sessionDate < expectedDate) {
        // Gap found, streak ends
        break;
      }
    }
    
    return streak;
  }

  /**
   * Update profile with new completion
   */
  static updateStreakOnCompletion(profile: UserProfile, completionDate: Date): UserProfile {
    const dateString = this.getDateString(completionDate);
    
    // Check if already completed today
    const alreadyCompleted = profile.completedSessions.some(
      session => session.date === dateString
    );
    
    if (alreadyCompleted) {
      // Don't update streak if already completed today
      return profile;
    }
    
    let newStreak: number;
    
    if (!profile.lastPracticeDate) {
      // First practice ever
      newStreak = 1;
    } else if (this.shouldResetStreak(profile.lastPracticeDate, completionDate)) {
      // Streak broken, reset to 1
      newStreak = 1;
    } else {
      // Continue streak
      newStreak = profile.currentStreak + 1;
    }
    
    // Update longest streak if current exceeds it
    const newLongestStreak = Math.max(newStreak, profile.longestStreak);
    
    return {
      ...profile,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastPracticeDate: dateString
    };
  }
}
