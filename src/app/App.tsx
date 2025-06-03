// src/app/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './Auth/AuthPage';
import ProfileDashboard from './routes/profile/ProfileDashboard';
import LoggedInLayout from '../components/Layouts/LoggedInLayout';
import AppRoutes from './routes/index';
import { account } from '../appwriteConfig';
import { Models } from 'appwrite';
import './App.css';
import '../style.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };
    checkSession();
  }, []);

  const toggleAuthMode = () => {
    setAuthMode(prev => (prev === 'login' ? 'signup' : 'login'));
  };

  const handleLoginSuccess = (user: Models.User<Models.Preferences>) => {
    console.log("App.tsx: handleLoginSuccess - START. User name:", user.name); // LOG 1
    setIsLoggedIn(true);
    setCurrentUser(user);
    console.log("App.tsx: handleLoginSuccess - State updated. isLoggedIn should be true."); // LOG 2
    const origin = location.state?.from?.pathname || '/journal';
    console.log("App.tsx: handleLoginSuccess - Navigating to:", origin); // LOG 3
    navigate(origin, { replace: true });
};

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate('/login');
    }
  };

  if (isLoggedIn === null) {
    return <div className="loading-screen">Loading application...</div>;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <AuthPage
                mode={authMode}
                toggleMode={toggleAuthMode}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : (
              <Navigate to="/journal" replace />
            )
          }
        />

        <Route
          element={
            isLoggedIn ? (
              <LoggedInLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        >
          <Route index element={<Navigate to="/journal" replace />} />
          <Route path="/journal/*" element={<AppRoutes />} />
          <Route path="/profile" element={<ProfileDashboard />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/journal" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
