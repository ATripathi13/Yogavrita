import { DayOfWeek, DAYS_OF_WEEK } from '../models/types';
import { useUserProfile } from '../hooks/UserProfileContext';
import './ClassSelector.css';

interface ClassSelectorProps {
  onSelectDay: (day: DayOfWeek) => void;
}

export function ClassSelector({ onSelectDay }: ClassSelectorProps) {
  const { profile } = useUserProfile();
  
  // Get current day
  const today = new Date().getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = dayNames[today];

  // Get completed days from profile
  const completedToday = profile?.completedSessions.some(session => {
    const sessionDate = new Date(session.date);
    const todayDate = new Date();
    return (
      sessionDate.getDate() === todayDate.getDate() &&
      sessionDate.getMonth() === todayDate.getMonth() &&
      sessionDate.getFullYear() === todayDate.getFullYear()
    );
  });

  const getCompletedDaysThisWeek = (): Set<string> => {
    if (!profile) return new Set();
    
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const completed = new Set<string>();
    
    profile.completedSessions.forEach(session => {
      const sessionDate = new Date(session.date);
      if (sessionDate >= startOfWeek && sessionDate <= now) {
        completed.add(session.day);
      }
    });

    return completed;
  };

  const completedDays = getCompletedDaysThisWeek();

  return (
    <div className="class-selector">
      <h2>Choose Your Practice</h2>
      <p className="subtitle">Select a day to begin your yoga session</p>
      
      <div className="days-grid">
        {DAYS_OF_WEEK.map((day) => {
          const isToday = day === currentDay;
          const isCompleted = completedDays.has(day);
          
          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`day-card ${isToday ? 'today' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="day-name">{day}</div>
              {isToday && <div className="today-badge">Today</div>}
              {isCompleted && (
                <div className="completed-badge">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#4caf50"/>
                    <path d="M6 10l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {completedToday && (
        <div className="completion-message">
          <p>✨ Great job! You've completed today's practice. Feel free to practice another day's sequence.</p>
        </div>
      )}
    </div>
  );
}
