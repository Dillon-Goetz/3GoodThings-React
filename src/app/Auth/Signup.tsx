// src/app/Auth/Signup.tsx
import React, { useState } from "react";
import { Models } from "appwrite"; 
import { account } from "../../appwriteConfig";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Define constants for password requirements
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REQUIREMENTS = {
  minLength: MIN_PASSWORD_LENGTH,
  hasUppercase: true,
  hasSymbol: true,
};

interface SignupProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

function Signup({ onLoginSuccess }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // New state for individual field errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  // General form error (e.g., from Appwrite API)
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to validate the form inputs
  const validateForm = () => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);
    setNameError(null);
    setFormError(null); // Clear previous form errors

    // Name validation
    if (!name.trim()) {
      setNameError("Name is required.");
      isValid = false;
    } else if (name.trim().length > 128) {
      setNameError("Name cannot exceed 128 characters.");
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Password validation (8 characters, 1 capital, 1 symbol)
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < PASSWORD_REQUIREMENTS.minLength) {
      setPasswordError(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long.`);
      isValid = false;
    } else if (PASSWORD_REQUIREMENTS.hasUppercase && !/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      isValid = false;
    } else if (PASSWORD_REQUIREMENTS.hasSymbol && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Clear any previous general error
    setIsLoading(true);

    // --- Client-side validation ---
    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false); // Stop loading if validation fails
      return; // Stop the function execution
    }
    // --- End client-side validation ---

    try {
      // Create account using the 'unique()' string literal as it worked for you
      await account.create(
        'unique()', // Generate a unique user ID
        email,
        password,
        name
      );

      // Create a session to log the user in after signing up
      await account.createEmailPasswordSession(email, password);

      // Get user details and notify parent component
      const user = await account.get();
      onLoginSuccess(user);
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === 409) {
        setFormError("Account with this email already exists.");
      } else if (error.code === 400 && error.message.includes("password")) {
        // This catch is a fallback if Appwrite's backend has stricter rules or catches something client-side missed.
        setFormError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long, and contain at least one uppercase letter and one symbol.`);
      } else if (error.message) {
        setFormError(`Failed to create an account: ${error.message}.`);
      } else {
        setFormError("Failed to create an account. Please try again.");
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
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError(null);
          }}
        />
        {nameError && <p className="text-sm text-destructive">{nameError}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(null);
          }}
        />
        {emailError && <p className="text-sm text-destructive">{emailError}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError(null);
          }}
        />
        {/* Password requirements displayed below the input */}
        <p className="text-sm text-muted-foreground">
          Password must be at least {MIN_PASSWORD_LENGTH} characters, include at least one uppercase letter, and at least one symbol.
        </p>
        {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
      </div>
      {formError && <p className="text-sm text-destructive">{formError}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}

export { Signup };