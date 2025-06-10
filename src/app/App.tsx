// src/app/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './Auth/AuthPage';
import ProfileDashboard from './routes/profile/Dashboard/Dashboard';
import LoggedInLayout from '../components/Layouts/LoggedInLayout';
import AppRoutes from './routes/index';
import { account } from '../appwriteConfig';
import { Models } from 'appwrite';
import './App.css';
import '../style.css';
import HomePage from './routes/home/HomePage'; // Ensure this import is active and correct

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const location = useLocation();

  const [journalData, setJournalData] = useState({
    threeGoodThings: ['', '', ''],
    isPublic: true,
    oneThorn: '',
    vibe: '',
    photoFileId: null,
    isPhotoPublic: true,
    selectedFile: null as File | null,
    journalText: '',
  });

  const handleDataChange = (field: keyof typeof journalData, value: any) => {
    setJournalData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

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
    setIsLoggedIn(true);
    setCurrentUser(user);
    // Keep this the same, it navigates to /journal or the original destination
    const origin = location.state?.from?.pathname || '/journal';
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
      // CHANGE 1: Redirect to /home instead of /login on logout
      navigate('/home');
    }
  };

  if (isLoggedIn === null) {
    return <div className="loading-screen">Loading application...</div>;
  }

  return (
    <div className="app-container">
      <Routes>
        {/* CHANGE 2: Add the new /home route */}
        <Route
          path="/home"
          element={!isLoggedIn ? <HomePage /> : <Navigate to="/journal" replace />}
        />

        {/* Existing /login route - also needs to redirect to /journal if logged in */}
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

        {/* Protected routes wrapped by LoggedInLayout */}
        <Route
          element={
            isLoggedIn ? (
              <LoggedInLayout
                onLogout={handleLogout}
                currentUser={currentUser}
                journalData={journalData}
                onJournalDataChange={handleDataChange}
              />
            ) : (
              // CHANGE 3: Redirect unauthenticated users from protected routes to /home
              <Navigate to="/home" replace state={{ from: location }} />
            )
          }
        >
          {/* Default logged-in route: redirect root to /journal */}
          <Route index element={<Navigate to="/journal" replace />} />
          <Route path="/journal/*" element={<AppRoutes />} />
          <Route path="/profile" element={<ProfileDashboard />} />
        </Route>

        {/* CHANGE 4: Update catch-all route */}
        {/* Redirects any unmatched path to /journal if logged in, or /home if not */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/journal" : "/home"} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;