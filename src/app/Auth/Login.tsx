import React, { useState } from "react";
import { Models } from "appwrite";
import { account } from "../../appwriteConfig";
import { Button } from "@/components/ui/button"; // Import your Shadcn Button component
import { Label } from "@/components/ui/label";   // Import your Shadcn Label component
import { Input } from "@/components/ui/input";   // Import your Shadcn Input component

interface LoginProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state for button

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading true on submission
    console.log("Login.tsx: Attempting login with email:", email); // DEBUG

    try {
      await account.createEmailPasswordSession(email, password);
      console.log("Login.tsx: createEmailPasswordSession successful."); // DEBUG

      const user = await account.get();
      console.log("Login.tsx: account.get() after session creation:", user); // DEBUG
      onLoginSuccess(user);

    } catch (error: any) { // Catch the error to display to user
      console.error("Login error:", error);
      // More user-friendly error message based on common Appwrite errors if possible
      if (error.code === 400) { // e.g., for "invalid credentials"
          setError("Invalid email or password.");
      } else {
          setError("Failed to log in. Please try again.");
      }
    } finally {
        setIsLoading(false); // Always reset loading state
    }
  };

  return (
    // Remove the 'login-container' div. AuthPage.tsx handles the main card styling.
    <form onSubmit={handleLogin} className="grid gap-4"> {/* Use Tailwind's grid gap for spacing */}
      <div className="grid gap-1.5"> {/* Group label and input */}
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          // cn utility not strictly needed here if Input has good defaults,
          // but if you had custom styling to pass, it would go here.
        />
      </div>
      <div className="grid gap-1.5"> {/* Group label and input */}
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
        {isLoading ? "Logging in..." : "Log in"} {/* Dynamic button text based on loading */}
      </Button>
    </form>
  );
};

export { Login };