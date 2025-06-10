import React, { createContext, useContext, ReactNode } from 'react';
import { Models } from 'appwrite';

// Define the shape of the data the context will provide
interface AuthContextType {
    user: Models.Document | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider component. This component will wrap our app in App.tsx
// and make the 'user' object available to all children.
export const AuthProvider = ({ children, user }: { children: ReactNode, user: Models.Document | null }) => {
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create the custom hook. This is what our components will call to get the user data.
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};