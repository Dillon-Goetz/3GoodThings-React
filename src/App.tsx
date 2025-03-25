import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './components/Features/auth/components/AuthPage';
import JournalHome from './components/Journal/JournalHome';
import './App.css';
import './style.css';
import Header from './components/Shared/Header/Header'; // Import Header

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
        <Router>
            <div>
                {isLoggedIn && <Header onLogout={handleLogout} />} {/* Conditionally render Header */}
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
                    <Route path="/" element={isLoggedIn ? <JournalHome /> : <AuthPage mode={authMode} toggleMode={toggleAuthMode}/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;