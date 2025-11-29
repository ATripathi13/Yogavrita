import { createContext, useContext, useState, ReactNode } from 'react';
import { ClassSequence, Asana } from '../models/types';
import { TimerManager } from '../utils/TimerManager';

interface SessionState {
  sequence: ClassSequence | null;
  currentAsanaIndex: number;
  remainingSeconds: number;
  isActive: boolean;
  isPaused: boolean;
  startTime: Date | null;
}

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

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const timerManager = new TimerManager();

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionState, setSessionState] = useState<SessionState>({
    sequence: null,
    currentAsanaIndex: 0,
    remainingSeconds: 0,
    isActive: false,
    isPaused: false,
    startTime: null
  });

  const [onCompleteCallback, setOnCompleteCallback] = useState<(() => void) | null>(null);

  const getCurrentAsana = (): Asana | null => {
    if (!sessionState.sequence || sessionState.currentAsanaIndex >= sessionState.sequence.asanas.length) {
      return null;
    }
    return sessionState.sequence.asanas[sessionState.currentAsanaIndex];
  };

  const isLastAsana = (): boolean => {
    if (!sessionState.sequence) return false;
    return sessionState.currentAsanaIndex === sessionState.sequence.asanas.length - 1;
  };

  const advanceToNextAsana = () => {
    if (!sessionState.sequence) return;

    const nextIndex = sessionState.currentAsanaIndex + 1;

    if (nextIndex >= sessionState.sequence.asanas.length) {
      // Session complete
      setSessionState(prev => ({
        ...prev,
        isActive: false,
        isPaused: false
      }));
      
      // Call completion callback if set
      if (onCompleteCallback) {
        onCompleteCallback();
      }
      return;
    }

    // Move to next asana
    const nextAsana = sessionState.sequence.asanas[nextIndex];
    setSessionState(prev => ({
      ...prev,
      currentAsanaIndex: nextIndex,
      remainingSeconds: nextAsana.durationSeconds
    }));

    // Start timer for next asana
    timerManager.start(
      nextAsana.durationSeconds,
      (remaining) => {
        setSessionState(prev => ({ ...prev, remainingSeconds: remaining }));
      },
      () => {
        advanceToNextAsana();
      }
    );
  };

  const startSession = (sequence: ClassSequence, onComplete?: () => void) => {
    if (sequence.asanas.length === 0) return;

    if (onComplete) {
      setOnCompleteCallback(() => onComplete);
    }

    const firstAsana = sequence.asanas[0];
    
    setSessionState({
      sequence,
      currentAsanaIndex: 0,
      remainingSeconds: firstAsana.durationSeconds,
      isActive: true,
      isPaused: false,
      startTime: new Date()
    });

    // Start timer for first asana
    timerManager.start(
      firstAsana.durationSeconds,
      (remaining) => {
        setSessionState(prev => ({ ...prev, remainingSeconds: remaining }));
      },
      () => {
        advanceToNextAsana();
      }
    );
  };

  const pauseSession = () => {
    if (!sessionState.isActive || sessionState.isPaused) return;
    
    timerManager.pause();
    setSessionState(prev => ({ ...prev, isPaused: true }));
  };

  const resumeSession = () => {
    if (!sessionState.isActive || !sessionState.isPaused) return;
    
    timerManager.resume();
    setSessionState(prev => ({ ...prev, isPaused: false }));
  };

  const skipAsana = () => {
    if (!sessionState.isActive) return;
    
    timerManager.stop();
    advanceToNextAsana();
  };

  const exitSession = () => {
    timerManager.stop();
    setSessionState({
      sequence: null,
      currentAsanaIndex: 0,
      remainingSeconds: 0,
      isActive: false,
      isPaused: false,
      startTime: null
    });
  };

  return (
    <SessionContext.Provider
      value={{
        sessionState,
        startSession,
        pauseSession,
        resumeSession,
        skipAsana,
        exitSession,
        getCurrentAsana,
        isLastAsana
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
