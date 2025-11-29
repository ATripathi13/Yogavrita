import { useEffect, useState } from 'react';
import { ClassSequence, CompletedSession } from '../models/types';
import { useSession } from '../hooks/SessionContext';
import { useUserProfile } from '../hooks/UserProfileContext';
import { AsanaDisplay } from './AsanaDisplay';
import { BreathingIndicator } from './BreathingIndicator';
import './ClassView.css';

interface ClassViewProps {
  sequence: ClassSequence;
  onComplete: () => void;
  onExit: () => void;
}

export function ClassView({ sequence, onComplete, onExit }: ClassViewProps) {
  const { sessionState, startSession, pauseSession, resumeSession, skipAsana, exitSession, getCurrentAsana } = useSession();
  const { completeSession } = useUserProfile();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      exitSession();
    };
  }, []);

  const handleSessionComplete = () => {
    // Create completion record
    const completionSession: CompletedSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      day: sequence.day,
      completedAt: new Date(),
      durationSeconds: sequence.totalDurationSeconds
    };

    // Save to profile
    completeSession(completionSession);
    setSessionCompleted(true);
  };

  const handlePauseResume = () => {
    if (sessionState.isPaused) {
      resumeSession();
    } else {
      pauseSession();
    }
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    exitSession();
    onExit();
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  const handleContinue = () => {
    onComplete();
  };

  const handleStartPractice = () => {
    setShowPreview(false);
    startSession(sequence, handleSessionComplete);
  };

  const currentAsana = getCurrentAsana();

  // Show preview screen before starting
  if (showPreview) {
    const totalMinutes = Math.floor(sequence.totalDurationSeconds / 60);
    const totalSeconds = sequence.totalDurationSeconds % 60;
    
    return (
      <div className="class-view">
        <div className="preview-screen">
          <h1>{sequence.day} Practice</h1>
          <div className="preview-info">
            <div className="info-card">
              <div className="info-icon">🧘‍♀️</div>
              <div className="info-text">
                <div className="info-label">Total Asanas</div>
                <div className="info-value">{sequence.asanas.length}</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⏱️</div>
              <div className="info-text">
                <div className="info-label">Duration</div>
                <div className="info-value">{totalMinutes}:{totalSeconds.toString().padStart(2, '0')}</div>
              </div>
            </div>
          </div>

          <div className="asana-list">
            <h3>Sequence Overview</h3>
            <div className="asana-items">
              {sequence.asanas.map((asana, index) => (
                <div key={asana.id} className="asana-item">
                  <span className="asana-number">{index + 1}</span>
                  <span className="asana-item-name">{asana.name}</span>
                  <span className="asana-duration">
                    {Math.floor(asana.durationSeconds / 60)}:{(asana.durationSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-actions">
            <button onClick={onExit} className="btn btn-secondary btn-large">
              Back
            </button>
            <button onClick={handleStartPractice} className="btn btn-primary btn-large">
              Start Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (sessionCompleted) {
    return (
      <div className="class-view">
        <div className="completion-screen">
          <div className="completion-icon">🎉</div>
          <h1>Practice Complete!</h1>
          <p>Congratulations on completing your {sequence.day} practice.</p>
          <p className="completion-detail">You practiced for {Math.floor(sequence.totalDurationSeconds / 60)} minutes.</p>
          <button onClick={handleContinue} className="btn btn-primary btn-large">
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (!currentAsana || !sessionState.isActive) {
    return (
      <div className="class-view">
        <div className="loading">Loading session...</div>
      </div>
    );
  }

  const progress = ((sessionState.currentAsanaIndex + 1) / sequence.asanas.length) * 100;

  return (
    <div className="class-view">
      {showExitConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Exit Practice?</h3>
            <p>Your progress will be saved, but this session won't count toward your streak.</p>
            <div className="modal-actions">
              <button onClick={cancelExit} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmExit} className="btn btn-danger">
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="class-header">
        <div className="class-title">
          <h1>{sequence.day} Practice</h1>
          <div className="progress-text">
            Asana {sessionState.currentAsanaIndex + 1} of {sequence.asanas.length}
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="class-content">
        <AsanaDisplay 
          asana={currentAsana} 
          remainingSeconds={sessionState.remainingSeconds}
        />

        <BreathingIndicator
          pattern={currentAsana.breathingPattern}
          cycleSeconds={currentAsana.breathingCycleSeconds}
          isActive={sessionState.isActive && !sessionState.isPaused}
        />

        <div className="controls">
          <button 
            onClick={handlePauseResume}
            className="btn btn-control"
          >
            {sessionState.isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          
          <button 
            onClick={skipAsana}
            className="btn btn-control"
          >
            ⏭ Skip
          </button>
          
          <button 
            onClick={handleExit}
            className="btn btn-control btn-exit"
          >
            ✕ Exit
          </button>
        </div>
      </div>
    </div>
  );
}
