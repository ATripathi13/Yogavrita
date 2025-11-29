import { BreathingPattern } from '../models/types';
import './BreathingIndicator.css';

interface BreathingIndicatorProps {
  pattern: BreathingPattern;
  cycleSeconds: number;
  isActive: boolean;
}

export function BreathingIndicator({ pattern, cycleSeconds, isActive }: BreathingIndicatorProps) {
  // Don't render if pattern is 'none' or not active
  if (pattern === 'none' || !isActive) {
    return null;
  }

  const animationDuration = `${cycleSeconds}s`;

  return (
    <div className="breathing-indicator">
      <div 
        className={`breathing-circle ${pattern === 'inhale-exhale' ? 'breathing' : 'holding'}`}
        style={{
          animationDuration: animationDuration
        }}
      >
        <div className="breathing-text">
          {pattern === 'inhale-exhale' ? 'Breathe' : 'Hold'}
        </div>
      </div>
      {pattern === 'inhale-exhale' && (
        <div className="breathing-instructions">
          <span className="inhale-text">Inhale</span>
          <span className="exhale-text">Exhale</span>
        </div>
      )}
    </div>
  );
}
