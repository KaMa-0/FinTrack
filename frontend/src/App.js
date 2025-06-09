import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import AccountStatement from "./pages/AccountStatement";
import CurrencyConverter from './pages/CurrencyConverter';
import StockWatch from './pages/StockWatch';
import Navigation from './components/Navigation';
import AdminPanel from './pages/AdminPanel';

const PrivateRoute = ({ children }) => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return <Navigate to="/login" />;

    const user = JSON.parse(userStr);
    const isAdmin = user.email === 'admin@fintrack.com';

    // Redirect admin to admin panel
    if (isAdmin) {
        return <Navigate to="/admin" />;
    }

    return (
        <>
            <Navigation />
            <main>
                {children}
            </main>
        </>
    );
};

const AdminRoute = ({ children }) => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return <Navigate to="/login" />;

    const user = JSON.parse(userStr);
    const isAdmin = user.email === 'admin@fintrack.com';

    if (!isAdmin) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            <Navigation />
            <main>
                {children}
            </main>
        </>
    );
};

function App() {
    const userStr = localStorage.getItem('user');
    const isAuthenticated = userStr !== null;
    const isAdmin = userStr ? JSON.parse(userStr).email === 'admin@fintrack.com' : false;

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                    isAuthenticated
                        ? isAdmin
                            ? <Navigate to="/admin" />
                            : <Navigate to="/dashboard" />
                        : <LandingPage />
                } />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminPanel />
                    </AdminRoute>
                } />

                {/* Private Routes - Normal users only */}
                <Route path="/dashboard" element={
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
                <Route path="/currency-converter" element={
                    <PrivateRoute>
                        <CurrencyConverter />
                    </PrivateRoute>
                } />
                <Route path="/stocks" element={
                    <PrivateRoute>
                        <StockWatch />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;