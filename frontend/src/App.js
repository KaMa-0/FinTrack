import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Imports core React library and routing components
import Login from './pages/Login'; // Imports Login component
import Register from './pages/Register'; // Imports Register component
import Dashboard from './pages/Dashboard'; // Imports Dashboard component
import Transaction from './pages/Transaction';
import AccountStatement from "./pages/AccountStatement";

// PrivateRoute component that protects routes requiring authentication
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('user') !== null; // Checks if user data exists in localStorage
    return isAuthenticated ? children : <Navigate to="/login" />; // If authenticated, renders children; otherwise redirects to login
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} /> {/* Route for login page */}
                <Route path="/register" element={<Register />} /> {/* Route for registration page */}
                <Route path="/" element={ // Route for the dashboard (homepage)
                    <PrivateRoute>
                        <Dashboard /> {/* Protected with PrivateRoute component */}
                    </PrivateRoute>
                } />
                <Route path="/transaction" element={
                    <PrivateRoute>
                        <Transaction />
                    </PrivateRoute>
                }/>
                <Route path="/account-statement" element={
                    <PrivateRoute>
                        <AccountStatement />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App; // Exports App component for use in index.js