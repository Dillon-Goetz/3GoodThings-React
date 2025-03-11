import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/Features/auth/components/AuthPage';
import JournalHome from './components/Journal/JournalHome';
import './App.css';
import './style.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login'); // Track login/signup mode

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <AuthPage
          mode={authMode}
          toggleMode={toggleAuthMode}
          onLoginSuccess={(user) => {
            setIsLoggedIn(true);
            console.log("User logged in:", user);
          }}
        />
      ) : (
        <JournalHome />
      )}
    </div>
  );
};

export default App;
