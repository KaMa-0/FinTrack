import { createContext, useContext, useState } from "react";
// Imports React's context features and state management
import { authService } from "../services/authService"; // Imports authentication service

const userAuthContext = createContext(); // Creates a context for authentication data

export function UserAuthContextProvider({ children }) {
    // Component that provides authentication context to its children
    const [user, setUser] = useState(authService.getCurrentUser()); // Initializes user state from localStorage

    function signUp(email, password) {
        // Function to handle user registration
        return authService.signUp(email, password)
            .then(() => setUser(authService.getCurrentUser())); // Updates user state after successful registration
    }

    function logIn(email, password) {
        // Function to handle user login
        return authService.login(email, password)
            .then(() => setUser(authService.getCurrentUser())); // Updates user state after successful login
    }

    function logOut() {
        // Function to handle user logout
        authService.logout(); // Clears auth data in localStorage
        setUser(null); // Clears user state
    }

    return (
        <userAuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {children} {/* Provides authentication context to child components */}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    // Custom hook to access authentication context
    return useContext(userAuthContext); // Returns the authentication context
}