// src/app/Auth/Signup.tsx
import React, { useState } from "react";
import { Models } from "appwrite"; 
import { account } from "../../appwriteConfig";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SignupProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

function Signup({ onLoginSuccess }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // --- CHANGE THIS LINE ---
      await account.create('unique()', email, password, name); // Changed from ID.unique()

      // Create a session to log the user in after signing up
      await account.createSession(email, password);

      // Get user details and notify parent component
      const user = await account.get();
      onLoginSuccess(user);
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === 409) {
        setError("Account with this email already exists.");
      } else if (error.code === 400 && error.message.includes("password")) {
        setError("Password must be at least 8 characters long.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}

export { Signup };