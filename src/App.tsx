import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './components/Features/auth/components/AuthPage';
import JournalHome from './components/Journal/JournalHome';
import './App.css';
import './style.css';
import Header from './components/Shared/Header/Header';

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
            {isLoggedIn && <Header onLogout={handleLogout} />}
            <Routes>
                <Route path="/login" element={!isLoggedIn ? (
                    <AuthPage
                        mode={authMode}
                        toggleMode={toggleAuthMode}
                        onLoginSuccess={(user) => {
                            setIsLoggedIn(true);
                            console.log("User logged in:", user);
                            navigate('/');
                        }}
                    />
                ) : (
                    <JournalHome />
                )} />
                <Route path="/" element={isLoggedIn ? <JournalHome /> : <AuthPage mode={authMode} toggleMode={toggleAuthMode} onLoginSuccess={(user) => {
                            setIsLoggedIn(true);
                            console.log("User logged in:", user);
                            navigate('/');
                        }}/>} />
            </Routes>
        </div>
    );
};

export default App;