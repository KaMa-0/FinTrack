// frontend/src/components/Navigation.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="nav-container">
            <button className="hamburger" onClick={toggleMenu}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Dashboard</Link>
                <Link to="/transaction" onClick={toggleMenu}>Transaktion</Link>
                <Link to="/account-statement" onClick={toggleMenu}>Kontoauszug</Link>
                <Link to="/currency-converter" onClick={toggleMenu}>Währungsrechner</Link>
                <button className="logout-button" onClick={handleLogout}>Abmelden</button>
            </nav>
        </div>
    );
};

export default Navigation;