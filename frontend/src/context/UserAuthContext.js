import { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(authService.getCurrentUser());

    function signUp(email, password) {
        return authService.signUp(email, password)
            .then(() => setUser(authService.getCurrentUser()));
    }

    function logIn(email, password) {
        return authService.login(email, password)
            .then(() => setUser(authService.getCurrentUser()));
    }

    function logOut() {
        authService.logout();
        setUser(null);
    }

    return (
        <userAuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}