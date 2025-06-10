// src/app/Auth/Signup.tsx
import React, { useState } from "react";
import { ID, Models } from "appwrite";
import { account } from "../../appwriteConfig";
import { Button } from "@/components/ui/button"; // Import your Shadcn Button
import { Label } from "@/components/ui/label";   // Import your Shadcn Label
import { Input } from "@/components/ui/input";   // Import your Shadcn Input

interface SignupProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

function Signup({ onLoginSuccess }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading true on submission

    try {
      // Create the user account
      await account.create(ID.unique(), email, password, name);

      // Create a session to log the user in after signing up
      await account.createSession(email, password);

      // Get user details and notify parent component
      const user = await account.get();
      onLoginSuccess(user);
    } catch (error: any) { // Catch the specific error to display to user
      console.error("Signup error:", error);
      // Provide more user-friendly error messages based on Appwrite errors
      if (error.code === 409) { // Conflict - email already exists
        setError("Account with this email already exists.");
      } else if (error.code === 400 && error.message.includes("password")) {
        setError("Password must be at least 8 characters long.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  return (
    <form onSubmit={handleSignup} className="grid gap-4"> {/* Use Tailwind's grid gap for spacing */}
      <div className="grid gap-1.5"> {/* Group label and input for Name */}
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
      <div className="grid gap-1.5"> {/* Group label and input for Email */}
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
      <div className="grid gap-1.5"> {/* Group label and input for Password */}
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
      {/* Display error message using Tailwind text-destructive color */}
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign up"} {/* Dynamic button text based on loading */}
      </Button>
    </form>
  );
}

export { Signup };