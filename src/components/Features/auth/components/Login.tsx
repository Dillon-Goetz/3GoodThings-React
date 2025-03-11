import React, { useState } from "react";
import { Models } from "appwrite";
import { account } from "../../../../appwriteConfig"; //

interface LoginProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await account.createEmailPasswordSession(email, password);
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
