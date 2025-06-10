import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import { authService } from '../services/authService';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/landing';
    };

    const user = authService.getCurrentUser();
    const isAdmin = user?.email === 'admin@fintrack.com';

    // Admin: only logout button
    if (isAdmin) {
        return (
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
                <button
                    onClick={handleLogout}
                    style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background 0.3s'
                    }}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        );
    }

    // Regular users: full navigation
    return (
        <div>
            <button
                className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {isOpen && isMobile && (
                <div className="nav-overlay" onClick={toggleMenu}></div>
            )}

            <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
                <div className="nav-header">
                    <h3>FinTrack</h3>
                </div>

                <div className="sidebar-nav-links">
                    <Link
                        to="/dashboard"
                        className={location.pathname === '/dashboard' ? 'active' : ''}
                    >
                        <i className="fas fa-home"></i>
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to="/transaction"
                        className={location.pathname === '/transaction' ? 'active' : ''}
                    >
                        <i className="fas fa-plus-circle"></i>
                        <span>Transaction</span>
                    </Link>

                    <Link
                        to="/account-statement"
                        className={location.pathname === '/account-statement' ? 'active' : ''}
                    >
                        <i className="fas fa-file-alt"></i>
                        <span>Account Statement</span>
                    </Link>

                    <Link
                        to="/currency-converter"
                        className={location.pathname === '/currency-converter' ? 'active' : ''}
                    >
                        <i className="fas fa-exchange-alt"></i>
                        <span>Currency Converter</span>
                    </Link>

                    <Link
                        to="/stocks"
                        className={location.pathname === '/stocks' ? 'active' : ''}
                    >
                        <i className="fas fa-chart-line"></i>
                        <span>Stocks</span>
                    </Link>
                </div>

                <button className="nav-logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Navigation;