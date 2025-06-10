// src/app/Auth/AuthPage.tsx
import { useState, useEffect } from 'react';
import { account } from "../../appwriteConfig";
import { Login } from './Login';
import { Signup } from './Signup';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom'; // Ensure Link is imported

interface AuthPageProps {
  mode: 'login' | 'signup';
  toggleMode: () => void;
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

const AuthPage = ({ mode, toggleMode, onLoginSuccess }: AuthPageProps) => {
  const [error] = useState<string | null>(null);

  // Consider removing or commenting out this useEffect
  // as App.tsx's useEffect handles the initial session check and redirect.
  // Keeping it here might cause flickering or unexpected redirects if
  // App.tsx has already determined the login status.
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        onLoginSuccess(user);
      } catch (err) {
        console.log("No active session found.");
      }
    };
    checkSession();
  }, [onLoginSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      {/* CHANGE 1: Add Link to homepage from AuthPage title */}
      <Link to="/home" className="text-2xl font-bold tracking-tight mb-8">
        Daily Mindfull
      </Link>
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
        {mode === 'login' ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-1">Welcome Back!</h2>
            <p className="text-muted-foreground text-center mb-6">Log in to continue your journey.</p>
            <Login onLoginSuccess={onLoginSuccess} />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-1">Create Your Account</h2>
            <p className="text-muted-foreground text-center mb-6">Start your mindfulness practice today.</p>
            <Signup onLoginSuccess={onLoginSuccess} />
          </div>
        )}
        <div className="mt-6 text-center text-sm">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button onClick={toggleMode} className="font-semibold text-primary hover:underline">
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={toggleMode} className="font-semibold text-primary hover:underline">
                Log In
              </button>
            </>
          )}
        </div>

        {error && <p className="error-message mt-4 text-destructive text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AuthPage;