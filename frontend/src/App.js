// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import AccountStatement from "./pages/AccountStatement";
import Navigation from './components/Navigation';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('user') !== null;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navigation />
            {children}
        </>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/transaction" element={
                    <PrivateRoute>
                        <Transaction />
                    </PrivateRoute>
                } />
                <Route path="/account-statement" element={
                    <PrivateRoute>
                        <AccountStatement />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}


export default App;