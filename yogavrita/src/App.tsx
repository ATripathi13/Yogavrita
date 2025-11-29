import { useState } from 'react';
import { UserProfileProvider, useUserProfile } from './hooks/UserProfileContext';
import { SessionProvider } from './hooks/SessionContext';
import { ProfileManager } from './components/ProfileManager';
import { ClassSelector } from './components/ClassSelector';
import { ClassView } from './components/ClassView';
import { DayOfWeek, ClassSequence } from './models/types';
import { getSequenceByDay } from './data/classSequences';
import './App.css';

type Screen = 'profile' | 'home' | 'class';

function AppContent() {
  const { profile } = useUserProfile();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedSequence, setSelectedSequence] = useState<ClassSequence | null>(null);

  const handleDaySelect = (day: DayOfWeek) => {
    const sequence = getSequenceByDay(day);
    if (sequence) {
      setSelectedSequence(sequence);
      setCurrentScreen('class');
    }
  };

  const handleClassComplete = () => {
    setCurrentScreen('home');
    setSelectedSequence(null);
  };

  const handleClassExit = () => {
    setCurrentScreen('home');
    setSelectedSequence(null);
  };

  const handleViewProfile = () => {
    setCurrentScreen('profile');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  // Show profile creation if no profile exists
  if (!profile) {
    return (
      <div className="app">
        <ProfileManager />
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="nav-content">
          <h1 className="nav-title" onClick={handleBackToHome}>YOGAVRITA</h1>
          <div className="nav-actions">
            {currentScreen !== 'profile' && (
              <button onClick={handleViewProfile} className="nav-button">
                👤 Profile
              </button>
            )}
            {currentScreen === 'profile' && (
              <button onClick={handleBackToHome} className="nav-button">
                🏠 Home
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="app-main">
        {currentScreen === 'profile' && <ProfileManager />}
        
        {currentScreen === 'home' && (
          <ClassSelector onSelectDay={handleDaySelect} />
        )}
        
        {currentScreen === 'class' && selectedSequence && (
          <ClassView
            sequence={selectedSequence}
            onComplete={handleClassComplete}
            onExit={handleClassExit}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 YOGAVRITA - Your Daily Yoga Practice</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <UserProfileProvider>
      <SessionProvider>
        <AppContent />
      </SessionProvider>
    </UserProfileProvider>
  );
}

export default App;
