# Implementation Plan

- [x] 1. Set up project structure and dependencies


  - Initialize React + TypeScript project with Vite
  - Install dependencies: fast-check for property testing, vitest for unit testing
  - Create directory structure: components/, services/, models/, hooks/, utils/
  - Set up TypeScript configuration with strict mode
  - Configure Vitest test environment
  - _Requirements: All_



- [ ] 2. Define core data models and types
  - Create TypeScript interfaces for UserProfile, Asana, ClassSequence, CompletedSession
  - Define type guards for runtime type validation
  - Create constants for days of week and breathing patterns
  - _Requirements: 1.1, 1.2, 3.1, 4.1, 5.1_



- [ ] 3. Implement storage service
  - [ ] 3.1 Create StorageService with save/load methods for profile and sequences
    - Implement saveProfile and loadProfile using LocalStorage API
    - Implement saveClassSequences and loadClassSequences
    - Add error handling for storage quota and access errors
    - Include data versioning for future migrations
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 3.2 Write property test for storage round-trip
    - **Property 1: Profile Data Round-Trip**
    - **Validates: Requirements 1.5, 8.1, 8.3, 8.4**

  - [ ] 3.3 Write unit tests for storage error handling
    - Test handling of corrupted data
    - Test storage quota exceeded error


    - Test storage access denied error
    - _Requirements: 8.5_

- [ ] 4. Implement profile validation logic
  - [ ] 4.1 Create validation functions for profile data
    - Implement validateProfileInput function
    - Add email format validation using regex
    - Add name non-empty validation
    - Add streak value validation (non-negative)
    - _Requirements: 1.2_

  - [ ] 4.2 Write property test for profile validation
    - **Property 2: Profile Input Validation**
    - **Validates: Requirements 1.2**

  - [x] 4.3 Write unit tests for validation edge cases


    - Test empty name rejection
    - Test invalid email formats
    - Test negative streak values
    - _Requirements: 1.2_

- [ ] 5. Implement streak calculation logic
  - [ ] 5.1 Create StreakCalculator utility
    - Implement calculateStreak function
    - Implement shouldResetStreak function
    - Implement updateStreakOnCompletion function
    - Add logic to exclude Sundays from streak calculations
    - Handle Saturday → Monday as consecutive days
    - Update longest streak when current exceeds it
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 5.2 Write property test for streak increment
    - **Property 5: Streak Increment on Completion**
    - **Validates: Requirements 6.1, 6.2**

  - [ ] 5.3 Write property test for streak reset
    - **Property 6: Streak Reset on Gap**
    - **Validates: Requirements 6.3**

  - [ ] 5.4 Write property test for Sunday exclusion
    - **Property 7: Streak Calculation Excludes Sundays**
    - **Validates: Requirements 6.5**

  - [ ] 5.5 Write property test for longest streak preservation
    - **Property 8: Longest Streak Preservation**
    - **Validates: Requirements 6.4**



  - [ ] 5.6 Write unit tests for streak edge cases
    - Test first practice session initializes streak to 1
    - Test Saturday to Monday is consecutive
    - Test multiple Sunday gaps don't break streak
    - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ] 6. Create class sequence data
  - [ ] 6.1 Define the six daily class sequences (Monday-Saturday)
    - Create data file with all asanas for each day
    - Include asana names, durations (from Word document), and breathing patterns
    - Calculate total duration for each sequence
    - Assign unique IDs to each asana
    - _Requirements: 3.1, 3.2, 3.3, 4.1_

  - [x] 6.2 Write property test for day-to-sequence mapping


    - **Property 3: Day-to-Sequence Mapping**
    - **Validates: Requirements 3.1**

  - [ ] 6.3 Write unit test for sequence data integrity
    - Test each day has a valid sequence
    - Test each sequence has at least one asana
    - Test all asanas have positive durations
    - _Requirements: 3.1, 3.3_

- [ ] 7. Implement timer management
  - [ ] 7.1 Create TimerManager utility
    - Implement start, pause, resume, stop methods
    - Use setInterval for countdown logic
    - Track remaining time and timer state
    - Provide callbacks for onTick and onComplete
    - Handle cleanup to prevent memory leaks
    - _Requirements: 4.2, 4.3, 4.4_

  - [x] 7.2 Write property test for timer countdown


    - **Property 9: Timer Countdown Behavior**
    - **Validates: Requirements 4.2, 4.3**

  - [x] 7.3 Write unit tests for timer functionality


    - Test timer starts with correct duration
    - Test pause stops countdown
    - Test resume continues from paused time
    - Test timer completion triggers callback
    - Test zero duration edge case


    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 8. Create React context for global state
  - [ ] 8.1 Implement UserProfileContext
    - Create context provider for user profile state

    - Implement methods to update profile, schedule, and streaks
    - Integrate with StorageService for persistence
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ] 8.2 Implement SessionContext
    - Create context provider for active practice session state

    - Track current sequence, asana position, timer state
    - Implement methods for navigation (pause, resume, skip, exit)
    - _Requirements: 3.4, 3.5, 9.2, 9.3, 9.4, 9.5_

- [ ] 9. Build ProfileManager component
  - [ ] 9.1 Create profile creation form
    - Build form with name and email inputs
    - Add form validation with error messages
    - Integrate with UserProfileContext to save profile
    - Display form when no profile exists
    - _Requirements: 1.1, 1.2_


  - [ ] 9.2 Create profile display and edit interface
    - Display user name, email, and statistics
    - Show current streak and longest streak
    - Add edit button to toggle edit mode
    - Allow updating profile fields


    - _Requirements: 1.3, 1.4, 1.5, 6.4_

  - [ ] 9.3 Add schedule settings to profile
    - Create time picker for practice schedule
    - Save scheduled time to profile
    - Display scheduled time in profile view
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [ ] 9.4 Write unit tests for ProfileManager
    - Test profile creation form validation
    - Test profile display shows all fields


    - Test edit mode updates profile
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 10. Build StreakDisplay component
  - Create visual display for current and longest streak
  - Use icons or graphics to represent streak count
  - Add motivational messaging for milestones
  - _Requirements: 6.4_

- [ ] 11. Build ClassSelector component
  - [ ] 11.1 Create day selection interface
    - Display buttons or cards for Monday through Saturday
    - Highlight current day
    - Show checkmarks for completed days
    - Handle day selection and pass to parent


    - _Requirements: 3.1_

  - [ ] 11.2 Write unit test for ClassSelector
    - Test all six days are displayed
    - Test day selection triggers callback
    - _Requirements: 3.1_

- [ ] 12. Build BreathingIndicator component
  - [ ] 12.1 Create animated circle component
    - Implement CSS keyframe animations for expand/shrink
    - Accept breathing pattern and cycle duration as props
    - Conditionally render based on pattern (show for 'inhale-exhale', hide for 'none')


    - Dynamically set animation duration based on cycleSeconds
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 12.2 Write property test for breathing indicator visibility
    - **Property 15: Breathing Indicator Visibility**

    - **Validates: Requirements 5.1**

  - [ ] 12.3 Write unit test for breathing indicator rendering
    - Test indicator renders with 'inhale-exhale' pattern
    - Test indicator doesn't render with 'none' pattern
    - _Requirements: 5.1_

- [ ] 13. Build AsanaDisplay component
  - [ ] 13.1 Create asana information display
    - Show asana name prominently
    - Display countdown timer with remaining time
    - Format time as MM:SS
    - Accept asana and remainingSeconds as props
    - _Requirements: 4.1, 4.3_

  - [ ] 13.2 Write unit test for AsanaDisplay
    - Test asana name is displayed
    - Test duration is displayed
    - Test time formatting
    - _Requirements: 4.1, 4.3_

- [ ] 14. Build ClassView component
  - [x] 14.1 Create main practice interface

    - Display current asana using AsanaDisplay component
    - Show BreathingIndicator component
    - Integrate TimerManager for countdown
    - Display progress indicator (e.g., "Asana 3 of 12")
    - _Requirements: 3.2, 3.3, 3.5, 4.1, 4.2, 4.3, 5.1_


  - [ ] 14.2 Implement automatic asana progression
    - Listen for timer completion
    - Advance to next asana automatically
    - Mark class as completed when all asanas done

    - Call onComplete callback
    - _Requirements: 3.4, 4.4_

  - [ ] 14.3 Write property test for automatic transition
    - **Property 10: Automatic Asana Transition**
    - **Validates: Requirements 4.4**

  - [ ] 14.4 Write property test for class completion
    - **Property 11: Class Completion Detection**
    - **Validates: Requirements 3.4**

  - [ ] 14.5 Write property test for sequence order
    - **Property 4: Asana Sequence Order Preservation**
    - **Validates: Requirements 3.2**

  - [ ] 14.6 Write property test for position tracking
    - **Property 16: Session Position Tracking**
    - **Validates: Requirements 3.5**

- [ ] 15. Add navigation controls to ClassView
  - [ ] 15.1 Implement pause and resume functionality
    - Add pause/resume button
    - Call TimerManager pause/resume methods
    - Update button state based on timer state
    - _Requirements: 9.1, 9.2, 9.3_


  - [ ] 15.2 Implement skip functionality
    - Add skip button
    - Advance to next asana without waiting for timer
    - Handle skip on last asana (complete class)
    - _Requirements: 9.4_

  - [ ] 15.3 Implement exit functionality
    - Add exit button with confirmation
    - Save progress without marking complete
    - Call onExit callback
    - _Requirements: 9.5_

  - [-] 15.4 Write property test for pause-resume

    - **Property 12: Pause-Resume State Preservation**
    - **Validates: Requirements 9.2, 9.3**

  - [ ] 15.5 Write property test for skip
    - **Property 13: Skip Advances Position**
    - **Validates: Requirements 9.4**

  - [ ] 15.6 Write property test for early exit
    - **Property 14: Early Exit Preserves Progress**
    - **Validates: Requirements 9.5**

  - [ ] 15.7 Write unit tests for navigation controls
    - Test pause stops timer
    - Test resume continues timer
    - Test skip advances to next asana
    - Test exit saves progress
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 16. Implement session completion logic
  - [ ] 16.1 Create completion handler
    - Create CompletedSession record with timestamp
    - Update user profile with new session
    - Calculate and update streak using StreakCalculator
    - Persist updated profile to storage
    - Show completion celebration UI
    - _Requirements: 3.4, 6.1, 6.2, 8.2_

  - [ ] 16.2 Write unit test for completion handler
    - Test session record is created
    - Test profile is updated
    - Test streak is incremented
    - _Requirements: 3.4, 6.1, 8.2_

- [ ] 17. Build main App component and routing
  - [x] 17.1 Create app layout and navigation

    - Set up main app structure
    - Add navigation between profile, class selector, and class view
    - Implement conditional rendering based on profile existence
    - Show profile creation if no profile exists
    - Show class selector as home screen if profile exists
    - _Requirements: 1.1, 7.1, 7.2_


  - [ ] 17.2 Wire up all components
    - Connect ProfileManager with UserProfileContext
    - Connect ClassSelector with class sequence data
    - Connect ClassView with SessionContext and TimerManager
    - Ensure data flows correctly between components
    - _Requirements: All_


- [ ] 18. Add styling and visual design
  - Create CSS modules for all components
  - Implement calming color scheme (blues, greens, neutrals)
  - Add smooth transitions and animations
  - Ensure responsive design for mobile and desktop
  - Style breathing indicator with appealing visual effects
  - Add focus states and hover effects for accessibility

  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 19. Implement accessibility features
  - Add ARIA labels to interactive elements
  - Ensure keyboard navigation works (Tab, Enter, Space, Arrow keys)
  - Add focus indicators for keyboard users
  - Verify color contrast meets WCAG standards



  - Test with screen reader
  - _Requirements: 7.5_

- [ ] 20. Final checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests and verify they pass
  - Fix any failing tests
  - Ensure test coverage meets goals (80%+ overall)
  - Ensure all tests pass, ask the user if questions arise
