import React, { useState } from "react";
import { Models } from "appwrite";
import { account } from "../../appwriteConfig"; //

interface LoginProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Login.tsx: Attempting login with email:", email); // DEBUG

    try {
      await account.createEmailPasswordSession(email, password);
      console.log("Login.tsx: createEmailPasswordSession successful."); // DEBUG

      const user = await account.get();
      console.log("Login.tsx: account.get() after session creation:", user); // DEBUG
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
