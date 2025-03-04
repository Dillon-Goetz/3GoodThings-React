import React, { useState } from "react";
import { Client, Account, Models } from "appwrite";

interface LoginProps {
    onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
    account: Account; // ✅ Accept account as a prop
  }

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const account = new Account(client);

function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null); // Reset error on new attempt
  
      try {
        // Create a session using email & password
        await account.createSession(email, password);
  
        // Fetch the logged-in user details
        const user = await account.get();
        onLoginSuccess(user);
      } catch (error) {
        console.error("Login error:", error);
        setError("Failed to log in. Please check your credentials.");
      }
    };

    
  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export { Login };