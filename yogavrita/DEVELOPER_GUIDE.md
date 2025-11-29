# YOGAVRITA Developer Guide

## Project Structure

```
yogavrita/
├── src/
│   ├── components/          # React components
│   │   ├── AsanaDisplay.tsx
│   │   ├── BreathingIndicator.tsx
│   │   ├── ClassSelector.tsx
│   │   ├── ClassView.tsx
│   │   └── ProfileManager.tsx
│   ├── data/               # Static data
│   │   └── classSequences.ts
│   ├── hooks/              # React contexts
│   │   ├── SessionContext.tsx
│   │   └── UserProfileContext.tsx
│   ├── models/             # TypeScript types
│   │   └── types.ts
│   ├── services/           # Business logic
│   │   └── StorageService.ts
│   ├── utils/              # Utility functions
│   │   ├── StreakCalculator.ts
│   │   ├── TimerManager.ts
│   │   └── validation.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── dist/                   # Build output
└── package.json

```

## Technology Stack

- **React 19**: UI framework
- **TypeScript 5**: Type safety
- **Vite 7**: Build tool and dev server
- **CSS**: Component styling (no preprocessor)
- **LocalStorage API**: Data persistence

## Key Concepts

### State Management

The app uses React Context API for global state:

1. **UserProfileContext**: Manages user profile, streaks, and completed sessions
2. **SessionContext**: Manages active practice session state

### Data Flow

```
User Action → Component → Context → Service → LocalStorage
                ↓
            UI Update
```

### Core Components

#### ProfileManager
- Handles profile creation and editing
- Displays user statistics
- Manages schedule settings

#### ClassSelector
- Shows available practice days
- Highlights current day
- Shows completion status

#### ClassView
- Main practice interface
- Integrates AsanaDisplay and BreathingIndicator
- Manages session controls (pause, resume, skip, exit)

#### AsanaDisplay
- Shows current asana information
- Displays countdown timer
- Formats time as MM:SS

#### BreathingIndicator
- Animated circle for breathing guidance
- Conditionally renders based on breathing pattern
- CSS animations for expand/shrink

### Utilities

#### TimerManager
- Manages countdown timers
- Supports pause/resume functionality
- Provides callbacks for tick and completion

#### StreakCalculator
- Calculates current and longest streaks
- Handles Sunday exclusion logic
- Updates streaks on session completion

#### StorageService
- Saves/loads profile data
- Saves/loads class sequences
- Handles storage errors gracefully

## Customizing Class Sequences

To update the yoga sequences:

1. Open `src/data/classSequences.ts`
2. Modify the asana arrays for each day:

```typescript
const mondaySequence: ClassSequence = {
  day: 'Monday',
  asanas: [
    {
      id: 'mon-1',
      name: 'Your Asana Name',
      durationSeconds: 60,  // Duration in seconds
      breathingPattern: 'inhale-exhale',  // or 'hold' or 'none'
      breathingCycleSeconds: 6,  // Breathing cycle duration
      instructions: 'Your instructions here'
    },
    // Add more asanas...
  ],
  totalDurationSeconds: 480  // Sum of all durations
};
```

3. Update `totalDurationSeconds` to match the sum of all asana durations
4. Rebuild the app: `npm run build`

## Adding New Features

### Adding a New Component

1. Create component file in `src/components/`
2. Create corresponding CSS file
3. Import and use in parent component

Example:
```typescript
// src/components/NewComponent.tsx
import './NewComponent.css';

interface NewComponentProps {
  // Define props
}

export function NewComponent({ }: NewComponentProps) {
  return (
    <div className="new-component">
      {/* Component content */}
    </div>
  );
}
```

### Adding New Context

1. Create context file in `src/hooks/`
2. Define context type and provider
3. Export custom hook for consuming context

Example:
```typescript
// src/hooks/NewContext.tsx
import { createContext, useContext, ReactNode } from 'react';

interface NewContextType {
  // Define context shape
}

const NewContext = createContext<NewContextType | undefined>(undefined);

export function NewProvider({ children }: { children: ReactNode }) {
  // Context logic
  return (
    <NewContext.Provider value={/* value */}>
      {children}
    </NewContext.Provider>
  );
}

export function useNew() {
  const context = useContext(NewContext);
  if (!context) {
    throw new Error('useNew must be used within NewProvider');
  }
  return context;
}
```

### Adding New Utility

1. Create utility file in `src/utils/`
2. Export functions or classes
3. Add TypeScript types

Example:
```typescript
// src/utils/newUtil.ts
export function newUtilFunction(param: string): string {
  // Implementation
  return result;
}
```

## Styling Guidelines

### CSS Organization
- One CSS file per component
- Use descriptive class names
- Follow BEM-like naming: `component-element--modifier`

### Color Palette
```css
Primary: #2c5f7c
Secondary: #4a90a4
Accent: #667eea, #764ba2 (gradient)
Success: #4caf50
Error: #ff5252
Text: #333
Light Text: #666
Background: #f5f7fa
```

### Responsive Breakpoints
```css
Mobile: max-width: 768px
Tablet: 769px - 1024px
Desktop: 1025px+
```

## Testing

### Running Tests
```bash
npm run test        # Run all tests
npm run test:ui     # Run tests with UI
```

### Writing Tests

The project uses Vitest for testing. Test files should be co-located with source files:

```typescript
// component.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Building for Production

### Development Build
```bash
npm run dev
```
- Hot module replacement
- Source maps
- Fast refresh

### Production Build
```bash
npm run build
```
- Minification
- Tree shaking
- Code splitting
- Optimized assets

### Preview Production Build
```bash
npm run preview
```

## Performance Optimization

### Current Optimizations
- Code splitting by route
- Lazy loading of components
- CSS minification
- Asset optimization
- Tree shaking

### Future Optimizations
- Image optimization
- Service worker for offline support
- Virtual scrolling for long lists
- Memoization of expensive computations

## Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

### Polyfills
Not currently needed, but can be added via:
```bash
npm install core-js
```

## Debugging

### Development Tools
- React DevTools: Inspect component tree
- Redux DevTools: Not used (Context API instead)
- Browser DevTools: Network, Console, Performance

### Common Issues

#### LocalStorage not working
- Check browser privacy settings
- Verify not in incognito mode
- Check storage quota

#### Timer issues
- Verify setInterval cleanup
- Check for memory leaks
- Test pause/resume logic

#### State not updating
- Check context provider hierarchy
- Verify state updates are immutable
- Use React DevTools to inspect state

## Contributing

### Code Style
- Use TypeScript for all new files
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused

### Git Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with descriptive message
5. Push and create pull request

### Commit Messages
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## API Reference

### UserProfileContext

```typescript
interface UserProfileContextType {
  profile: UserProfile | null;
  createProfile: (name: string, email: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSchedule: (time: string | null) => void;
  completeSession: (session: CompletedSession) => void;
  clearProfile: () => void;
}
```

### SessionContext

```typescript
interface SessionContextType {
  sessionState: SessionState;
  startSession: (sequence: ClassSequence, onComplete?: () => void) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  skipAsana: () => void;
  exitSession: () => void;
  getCurrentAsana: () => Asana | null;
  isLastAsana: () => boolean;
}
```

### StorageService

```typescript
class StorageService {
  static saveProfile(profile: UserProfile): void;
  static loadProfile(): UserProfile | null;
  static saveClassSequences(sequences: ClassSequence[]): void;
  static loadClassSequences(): ClassSequence[] | null;
  static clearAll(): void;
}
```

### StreakCalculator

```typescript
class StreakCalculator {
  static shouldResetStreak(lastPracticeDate: string, currentDate: Date): boolean;
  static calculateStreak(completedSessions: CompletedSession[], currentDate: Date): number;
  static updateStreakOnCompletion(profile: UserProfile, completionDate: Date): UserProfile;
}
```

### TimerManager

```typescript
class TimerManager {
  start(durationSeconds: number, onTick: (remaining: number) => void, onComplete: () => void): void;
  pause(): void;
  resume(): void;
  stop(): void;
  getRemainingTime(): number;
  getState(): TimerState;
}
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

## Support

For questions or issues:
1. Check this developer guide
2. Review the codebase
3. Check TypeScript types
4. Contact the development team
