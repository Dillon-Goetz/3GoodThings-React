import { useState, useEffect } from 'react';
import { account } from "../../../../appwriteConfig"; 
import { Login } from './Login';  
import { Signup } from './Signup';  
import { Models } from 'appwrite';

interface AuthPageProps {
  mode: 'login' | 'signup';
  toggleMode: () => void;
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

const AuthPage = ({ mode, toggleMode, onLoginSuccess }: AuthPageProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is already logged in
    const checkSession = async () => {
      try {
        const user = await account.get();
        onLoginSuccess(user);  // If already logged in, pass user to parent
      } catch (err) {
        // No session found, so allow login or signup
        console.log("No active session found.");
      }
    };

    checkSession();
  }, [onLoginSuccess]);

  return (
    <div>
      {mode === 'login' ? (
        <Login onLoginSuccess={onLoginSuccess} />
      ) : (
        <Signup onLoginSuccess={onLoginSuccess} />
      )}

      <button onClick={toggleMode}>
        Switch to {mode === 'login' ? 'Sign Up' : 'Log In'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AuthPage;
