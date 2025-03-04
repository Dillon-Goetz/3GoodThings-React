// src/components/auth/AuthPage.tsx
import React from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Client, Account, Models } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const account = new Account(client);

interface AuthPageProps {
  mode: "login" | "signup";
  toggleMode: () => void;
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  mode,
  toggleMode,
  onLoginSuccess,
}) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        {mode === "login" ? (
          <>
            <Login onLoginSuccess={onLoginSuccess} account={account} />
            <p className="auth-switch">
              Don't have an account?{" "}
              <button onClick={toggleMode} className="auth-switch-btn">
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <Signup onLoginSuccess={onLoginSuccess} account={account} />
            <p className="auth-switch">
              Already have an account?{" "}
              <button onClick={toggleMode} className="auth-switch-btn">
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage