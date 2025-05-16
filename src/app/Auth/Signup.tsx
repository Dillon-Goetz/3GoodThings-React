// src/components/auth/Signup.tsx
import React, { useState } from "react";
import { ID, Models } from "appwrite";
import { account } from "../../appwriteConfig"; //

interface SignupProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

function Signup({ onLoginSuccess }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Create the user account
      await account.create(ID.unique(), email, password, name);

      // Create a session to log the user in after signing up
      await account.createSession(email, password);

      // Get user details and notify parent component
      const user = await account.get();
      onLoginSuccess(user);
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button type="submit">Sign up</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export { Signup };
