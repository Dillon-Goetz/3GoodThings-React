import { useState } from 'react'
import AuthPage from './components/Features/auth/components/AuthPage'
import "./App.css";
import "./style.css";
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JournalHome from './components/Journal/JournalHome';


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
            console.log("User logged in:", user); // Or any other logic
          }} 
        />
      ) : (
        <JournalHome />
      )}
    </div>
  );
};

export default App;