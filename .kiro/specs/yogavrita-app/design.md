# YOGAVRITA Design Document

## Overview

YOGAVRITA is a web-based yoga instructor application built to guide users through structured daily yoga practices. The application features a React-based frontend with TypeScript for type safety, local storage for data persistence, and a component-based architecture that separates concerns between UI presentation, business logic, and data management.

The system provides six daily class sequences (Monday-Saturday), visual breathing indicators using CSS animations, user profile management, practice scheduling, and streak tracking to encourage consistent practice habits.

## Architecture

### Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: CSS Modules with CSS animations for breathing indicators
- **State Management**: React Context API for global state (user profile, current session)
- **Data Persistence**: Browser LocalStorage API
- **Build Tool**: Vite
- **Testing**: Vitest for unit tests, fast-check for property-based testing

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  (React Components: Profile, ClassView, Schedule, etc.) │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                   Application Layer                      │
│     (Hooks, Context Providers, Business Logic)          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                      Data Layer                          │
│        (Storage Service, Data Models, Validators)       │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Core Data Models

#### User Profile
```typescript
interface UserProfile {
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
```

#### Asana
```typescript
interface Asana {
  id: string;
  name: string;
  durationSeconds: number;
  breathingPattern: 'inhale-exhale' | 'hold' | 'none';
  breathingCycleSeconds: number; // Duration of one breath cycle
  instructions?: string;
}
```

#### Class Sequence
```typescript
interface ClassSequence {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  asanas: Asana[];
  totalDurationSeconds: number;
}
```

#### Completed Session
```typescript
interface CompletedSession {
  id: string;
  date: string; // ISO date string
  day: string;
  completedAt: Date;
  durationSeconds: number;
}
```

### Key Components

#### 1. ProfileManager Component
- Handles profile creation and editing
- Displays user statistics (streaks, completed sessions)
- Manages schedule settings
- Props: `profile: UserProfile | null`, `onSave: (profile: UserProfile) => void`

#### 2. ClassSelector Component
- Displays available days (Mon-Sat)
- Shows current day highlight
- Allows user to select a class
- Props: `onSelectDay: (day: string) => void`, `completedDays: string[]`

#### 3. ClassView Component
- Main practice interface
- Displays current asana with timer
- Shows breathing indicator
- Provides navigation controls (pause, resume, skip, exit)
- Props: `sequence: ClassSequence`, `onComplete: () => void`, `onExit: () => void`

#### 4. AsanaDisplay Component
- Shows asana name and instructions
- Displays countdown timer
- Props: `asana: Asana`, `remainingSeconds: number`

#### 5. BreathingIndicator Component
- Animated circle that expands/shrinks
- Syncs with breathing pattern
- Props: `pattern: 'inhale-exhale' | 'hold' | 'none'`, `cycleSeconds: number`, `isActive: boolean`

#### 6. StreakDisplay Component
- Shows current and longest streak
- Visual representation of streak progress
- Props: `currentStreak: number`, `longestStreak: number`

### Services and Utilities

#### StorageService
```typescript
interface StorageService {
  saveProfile(profile: UserProfile): void;
  loadProfile(): UserProfile | null;
  saveClassSequences(sequences: ClassSequence[]): void;
  loadClassSequences(): ClassSequence[];
}
```

#### StreakCalculator
```typescript
interface StreakCalculator {
  calculateStreak(completedSessions: CompletedSession[], currentDate: Date): number;
  shouldResetStreak(lastPracticeDate: string, currentDate: Date): boolean;
  updateStreakOnCompletion(profile: UserProfile, completionDate: Date): UserProfile;
}
```

#### TimerManager
```typescript
interface TimerManager {
  start(durationSeconds: number, onTick: (remaining: number) => void, onComplete: () => void): void;
  pause(): void;
  resume(): void;
  stop(): void;
  getRemainingTime(): number;
}
```

## Data Models

### Class Sequences Data Structure

The application will store six predefined class sequences (one for each day Monday-Saturday). Each sequence contains an ordered array of asanas with their durations and breathing patterns.

Example structure:
```typescript
const mondaySequence: ClassSequence = {
  day: 'Monday',
  asanas: [
    {
      id: 'mon-1',
      name: 'Mountain Pose (Tadasana)',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Stand tall with feet together...'
    },
    // ... more asanas
  ],
  totalDurationSeconds: 1800 // Sum of all asana durations
};
```

### LocalStorage Schema

```typescript
// Key: 'yogavrita_profile'
{
  id: string;
  name: string;
  email: string;
  createdAt: string;
  scheduledTime: string | null;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  completedSessions: CompletedSession[];
}

// Key: 'yogavrita_sequences'
ClassSequence[] // Array of 6 sequences
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Profile Data Round-Trip
*For any* valid user profile with all fields populated (including schedule, streaks, and completed sessions), saving the profile to storage and then loading it should return an equivalent profile with all data intact.
**Validates: Requirements 1.5, 8.1, 8.3, 8.4**

### Property 2: Profile Input Validation
*For any* profile input data, the validation function should accept valid profiles (with non-empty name and valid email format) and reject invalid profiles (empty name, invalid email, negative streaks).
**Validates: Requirements 1.2**

### Property 3: Day-to-Sequence Mapping
*For any* day selection from Monday through Saturday, the system should return the correct predefined class sequence for that specific day, and the sequence should contain at least one asana.
**Validates: Requirements 3.1**

### Property 4: Asana Sequence Order Preservation
*For any* class sequence, when iterating through asanas during a practice session, the asanas should be presented in the exact order they appear in the sequence definition.
**Validates: Requirements 3.2**

### Property 5: Streak Increment on Completion
*For any* user profile and valid completion date, when a class is completed on a consecutive practice day (Monday-Saturday), the current streak should increase by exactly one.
**Validates: Requirements 6.1, 6.2**

### Property 6: Streak Reset on Gap
*For any* user profile with a last practice date, if the next completion date has a gap of more than one practice day (excluding Sundays), the current streak should reset to 1.
**Validates: Requirements 6.3**

### Property 7: Streak Calculation Excludes Sundays
*For any* sequence of completion dates, when calculating streaks, Sunday dates should not break the streak if practice occurred on Saturday and Monday.
**Validates: Requirements 6.5**

### Property 8: Longest Streak Preservation
*For any* user profile, when the current streak is updated, if the current streak exceeds the longest streak, the longest streak should be updated to match; otherwise, the longest streak should remain unchanged.
**Validates: Requirements 6.4**

### Property 9: Timer Countdown Behavior
*For any* asana with a positive duration, starting the timer should result in the remaining time decreasing by one second for each second elapsed, until reaching zero.
**Validates: Requirements 4.2, 4.3**

### Property 10: Automatic Asana Transition
*For any* class sequence with multiple asanas, when the current asana timer reaches zero and there are remaining asanas, the system should automatically advance to the next asana in the sequence.
**Validates: Requirements 4.4**

### Property 11: Class Completion Detection
*For any* class sequence, when all asanas have been completed (timer reached zero for each), the system should mark the class as completed and record a completion session.
**Validates: Requirements 3.4**

### Property 12: Pause-Resume State Preservation
*For any* active practice session at any asana position with any remaining time, pausing and then immediately resuming should preserve both the current asana position and the remaining time.
**Validates: Requirements 9.2, 9.3**

### Property 13: Skip Advances Position
*For any* class sequence at any asana position except the last, skipping should advance to the next asana in the sequence without marking the skipped asana as completed.
**Validates: Requirements 9.4**

### Property 14: Early Exit Preserves Progress
*For any* practice session exited before completion, the system should save the current progress (which asanas were completed) but should not create a completed session record or increment the streak.
**Validates: Requirements 9.5**

### Property 15: Breathing Indicator Visibility
*For any* asana with a breathing pattern of 'inhale-exhale', the breathing indicator component should be rendered and active; for asanas with pattern 'none', the indicator should not be rendered.
**Validates: Requirements 5.1**

### Property 16: Session Position Tracking
*For any* class sequence, while progressing through asanas, the current position index should always be within valid bounds (0 to sequence length - 1) and should accurately reflect which asana is currently active.
**Validates: Requirements 3.5**

## Error Handling

### Input Validation Errors
- **Invalid Profile Data**: Display clear error messages for missing required fields (name, email) or invalid formats
- **Invalid Email Format**: Validate email using regex pattern and show specific error message
- **Invalid Time Format**: Validate scheduled time is in HH:MM format (00:00 to 23:59)

### Storage Errors
- **LocalStorage Full**: Catch QuotaExceededError and notify user to clear browser data
- **Storage Access Denied**: Handle SecurityError and inform user about browser restrictions
- **Corrupted Data**: Validate loaded data structure and reset to defaults if corrupted
- **Parse Errors**: Wrap JSON.parse in try-catch and handle gracefully

### Runtime Errors
- **Missing Class Sequence**: Validate day parameter and provide fallback to current day
- **Timer Errors**: Handle edge cases like negative durations or invalid timer states
- **Invalid Asana Index**: Bounds checking when navigating through sequences
- **State Inconsistencies**: Validate state transitions and prevent impossible states

### User Experience Errors
- **Network Offline**: Inform user that app works offline but notifications may not work
- **Browser Compatibility**: Detect and warn if LocalStorage is not available
- **Invalid Navigation**: Prevent navigation to non-existent routes or invalid states

## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific examples, edge cases, and component behavior:

**Profile Management Tests:**
- Test profile creation with valid data
- Test profile validation rejects empty names
- Test profile validation rejects invalid email formats
- Test profile editing updates specific fields

**Streak Calculation Tests:**
- Test streak increments on consecutive days
- Test streak resets after missing a day
- Test Sunday is correctly excluded from streak calculations
- Test longest streak updates when current exceeds it
- Test edge case: first practice session initializes streak to 1

**Timer Tests:**
- Test timer starts with correct duration
- Test timer pause stops countdown
- Test timer resume continues from paused time
- Test timer completion triggers callback
- Test edge case: zero duration asana

**Class Navigation Tests:**
- Test skip advances to next asana
- Test skip on last asana completes class
- Test early exit doesn't mark class complete
- Test pause/resume maintains position

**Storage Tests:**
- Test save and load with empty profile
- Test save and load with complete profile data
- Test handling of corrupted storage data
- Test storage quota exceeded error

### Property-Based Testing Approach

Property-based tests will verify universal properties across many randomly generated inputs using the **fast-check** library for JavaScript/TypeScript. Each property test will run a minimum of **100 iterations** to ensure thorough coverage.

**Configuration:**
```typescript
import fc from 'fast-check';

// Each property test will use this configuration
const testConfig = { numRuns: 100 };
```

**Property Test Tagging:**
Each property-based test will include a comment tag in this exact format:
```typescript
// **Feature: yogavrita-app, Property 1: Profile Data Round-Trip**
```

**Key Property Tests:**

1. **Profile Round-Trip Property** (Property 1)
   - Generate random valid profiles with various field combinations
   - Save to storage and load back
   - Verify all fields match original

2. **Validation Property** (Property 2)
   - Generate random profile inputs (valid and invalid)
   - Verify validation correctly accepts/rejects based on rules

3. **Streak Calculation Properties** (Properties 5, 6, 7, 8)
   - Generate random sequences of completion dates
   - Verify streak counts are calculated correctly
   - Verify Sunday exclusion logic
   - Verify longest streak tracking

4. **Sequence Order Property** (Property 4)
   - Generate random class sequences
   - Verify iteration maintains order

5. **Timer Properties** (Properties 9, 10)
   - Generate random durations
   - Verify countdown behavior
   - Verify automatic transitions

6. **State Preservation Properties** (Properties 12, 13, 14)
   - Generate random session states
   - Verify pause/resume, skip, and exit preserve correct state

**Generators:**
Custom generators will be created for:
- Valid user profiles with realistic data ranges
- Class sequences with varying numbers of asanas
- Completion date sequences with and without gaps
- Session states at various positions and times

**Property Test Organization:**
- Property tests will be co-located with the modules they test
- Each correctness property from this design will have exactly one corresponding property test
- Tests will be grouped by domain (profile, streak, timer, navigation)

### Integration Testing

While not the primary focus, integration tests will verify:
- Complete user flows (create profile → select class → complete session → verify streak)
- Component interactions (ClassView → AsanaDisplay → BreathingIndicator)
- Storage integration with React components

### Test Coverage Goals

- **Unit Tests**: Cover specific examples and edge cases for each function/component
- **Property Tests**: Cover universal properties across all valid inputs
- **Combined Coverage**: Aim for 80%+ code coverage with both test types
- **Critical Paths**: 100% coverage of streak calculation, data persistence, and timer logic

## Implementation Notes

### Breathing Animation Implementation

The breathing indicator will use CSS keyframe animations:
```css
@keyframes breathe-in {
  from { transform: scale(1); }
  to { transform: scale(1.5); }
}

@keyframes breathe-out {
  from { transform: scale(1.5); }
  to { transform: scale(1); }
}
```

The component will dynamically set animation duration based on `breathingCycleSeconds` prop.

### Timer Implementation

Use `setInterval` with 1-second intervals for countdown. Store timer ID in component state for pause/resume functionality. Clear interval on component unmount to prevent memory leaks.

### Streak Calculation Logic

Streak calculation must account for:
1. Consecutive calendar days (excluding Sundays)
2. Time zone considerations (use local date, not UTC)
3. Edge case: Saturday → Monday is consecutive (skip Sunday)
4. Edge case: First practice ever initializes streak to 1

### LocalStorage Data Migration

Include version number in stored data structure to handle future schema changes:
```typescript
{
  version: 1,
  profile: UserProfile,
  sequences: ClassSequence[]
}
```

### Responsive Design Considerations

- Mobile-first approach for UI components
- Touch-friendly controls (minimum 44x44px tap targets)
- Breathing indicator scales appropriately on small screens
- Class view optimized for portrait orientation

### Accessibility

- Semantic HTML elements for screen readers
- ARIA labels for interactive controls
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Sufficient color contrast for text and UI elements
- Focus indicators for keyboard users

## Future Enhancements

Potential features for future iterations:
- Cloud sync for multi-device access
- Custom class sequence creation
- Progress analytics and charts
- Social features (share streaks, challenges)
- Audio guidance for asanas
- Video demonstrations
- Customizable breathing cycle durations
- Dark mode theme
- Multiple user profiles on same device
- Export practice history
