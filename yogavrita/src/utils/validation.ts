// Validation utilities for YOGAVRITA

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate email format using regex
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate name is non-empty
 */
export function validateName(name: string): boolean {
  return name.trim().length > 0;
}

/**
 * Validate streak value is non-negative
 */
export function validateStreak(streak: number): boolean {
  return streak >= 0 && Number.isInteger(streak);
}

/**
 * Validate time format (HH:MM)
 */
export function validateTimeFormat(time: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

/**
 * Validate profile input data
 */
export function validateProfileInput(data: {
  name: string;
  email: string;
  currentStreak?: number;
  longestStreak?: number;
  scheduledTime?: string | null;
}): ValidationResult {
  const errors: string[] = [];

  // Validate name
  if (!validateName(data.name)) {
    errors.push('Name cannot be empty');
  }

  // Validate email
  if (!validateEmail(data.email)) {
    errors.push('Invalid email format');
  }

  // Validate streaks if provided
  if (data.currentStreak !== undefined && !validateStreak(data.currentStreak)) {
    errors.push('Current streak must be a non-negative integer');
  }

  if (data.longestStreak !== undefined && !validateStreak(data.longestStreak)) {
    errors.push('Longest streak must be a non-negative integer');
  }

  // Validate scheduled time if provided
  if (data.scheduledTime && !validateTimeFormat(data.scheduledTime)) {
    errors.push('Scheduled time must be in HH:MM format (00:00 to 23:59)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
