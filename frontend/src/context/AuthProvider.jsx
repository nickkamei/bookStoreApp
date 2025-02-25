import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const initialAuthUser = localStorage.getItem("User"); // Get user from localStorage
    const [authUser, setAuthUser] = useState(initialAuthUser ? JSON.parse(initialAuthUser) : null);

    // Sync state with localStorage whenever authUser changes
    useEffect(() => {
        if (authUser) {
            localStorage.setItem("User", JSON.stringify(authUser)); // Save user to localStorage
        } else {
            localStorage.removeItem("User"); // Remove user from localStorage
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);