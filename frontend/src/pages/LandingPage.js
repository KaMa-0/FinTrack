import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="landing-nav">
                <div className="container">
                    <div className="nav-brand">
                        <h1>FinTrack</h1>
                    </div>
                    <button
                        className="landing-menu-toggle"
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)}>Über uns</Link>
                        <Link to="/login" className="btn-login" onClick={() => setIsMenuOpen(false)}>Anmelden</Link>
                        <Link to="/register" className="btn-register" onClick={() => setIsMenuOpen(false)}>Registrieren</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h2>Willkommen bei FinTrack</h2>
                    <p>Ihre persönliche Finanzverwaltung - einfach, sicher und übersichtlich</p>
                    <Link to="/register" className="cta-button">Jetzt kostenlos starten</Link>
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <div className="container">
                    <h3>Unsere Funktionen</h3>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <i className="fas fa-chart-line"></i>
                            <h4>Finanzübersicht</h4>
                            <p>Behalten Sie Ihre Finanzen im Blick</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-exchange-alt"></i>
                            <h4>Transaktionen</h4>
                            <p>Verwalten Sie Ein- und Ausgaben</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-money-bill-wave"></i>
                            <h4>Währungsrechner</h4>
                            <p>Aktuelle Wechselkurse immer dabei</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <p>&copy; 2025 FinTrack. Alle Rechte vorbehalten.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
