// src/app/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './Auth/AuthPage';
// import JournalLayout from './routes/journal/JournalLayout'; // No longer directly used here for the route element
import ProfileDashboard from '../components/Profile/ProfileDashboard';
import Header from '../components/Shared/Header/Header';
import LoggedInLayout from '../components/Layouts/LoggedInLayout';
import AppRoutes from './routes/index'; // *** IMPORT YOUR AppRoutes COMPONENT ***
import { account } from '../appwriteConfig';
import { Models } from 'appwrite';
import './App.css';
import '../style.css';
// import NotFoundPage from '../components/NotFoundPage';

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
            } catch (error) {
                setIsLoggedIn(false);
                setCurrentUser(null);
            }
        };
        checkSession();
    }, []);

    const toggleAuthMode = () => {
        setAuthMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
    };

    const handleLoginSuccess = (user: Models.User<Models.Preferences>) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        console.log("User logged in:", user.name);
        const origin = location.state?.from?.pathname || '/journal';
        navigate(origin, { replace: true });
    };

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error("Error during Appwrite logout:", error);
        } finally {
            setIsLoggedIn(false);
            setCurrentUser(null);
            navigate('/login');
        }
    };

    if (isLoggedIn === null) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading application...</div>;
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
                    {/* *** THIS IS THE KEY CHANGE FOR JOURNAL ROUTES *** */}
                    <Route path="/journal/*" element={<AppRoutes />} />
                    <Route path="/profile" element={<ProfileDashboard />} />
                </Route>

                <Route
                    path="*"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/journal" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                        // <NotFoundPage />
                    }
                />
            </Routes>
        </div>
    );
};

export default App;