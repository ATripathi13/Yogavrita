import { Asana } from '../models/types';
import './AsanaDisplay.css';

interface AsanaDisplayProps {
  asana: Asana;
  remainingSeconds: number;
}

export function AsanaDisplay({ asana, remainingSeconds }: AsanaDisplayProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="asana-display">
      <h2 className="asana-name">{asana.name}</h2>
      
      {asana.instructions && (
        <p className="asana-instructions">{asana.instructions}</p>
      )}
      
      <div className="timer-display">
        <div className="time-remaining">{formatTime(remainingSeconds)}</div>
        <div className="time-label">Remaining</div>
      </div>
    </div>
  );
}
