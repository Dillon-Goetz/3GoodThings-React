import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AuthPage from './Auth/AuthPage';
import JournalHome from './routes/journal/JournalHome';
import ProfileDashboard from '../components/Profile/ProfileDashboard';
import './App.css'
import '../style.css'
import Header from '../components/Shared/Header/Header';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const navigate = useNavigate();

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'signup' : 'login');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div>
            {/* Always show the Header regardless of login status */}
            <Header onLogout={handleLogout} />

            <Routes>
                <Route 
                    path="/login" 
                    element={!isLoggedIn ? (
                        <AuthPage
                            mode={authMode}
                            toggleMode={toggleAuthMode}
                            onLoginSuccess={(user) => {
                                setIsLoggedIn(true);
                                console.log("User logged in:", user);
                                navigate('/journal'); // Redirect to JournalHome after login
                            }}
                        />
                    ) : (
                        <JournalHome />
                    )} 
                />
                <Route 
                    path="/" 
                    element={isLoggedIn ? (
                        <Navigate to="/journal" />  // Redirect to /journal if logged in
                    ) : (
                        <AuthPage 
                            mode={authMode} 
                            toggleMode={toggleAuthMode} 
                            onLoginSuccess={(user) => {
                                setIsLoggedIn(true);
                                console.log("User logged in:", user);
                                navigate('/journal');
                            }}
                        />
                    )} 
                />
                {/* This handles all Journal-related routes */}
                <Route path="/journal/*" element={<JournalHome />} />
                <Route path="/profile" element={<ProfileDashboard />} />  {/* Profile route */}
            </Routes>
        </div>
    );
};
export default App;