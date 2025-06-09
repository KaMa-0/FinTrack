import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Gallery() {
    return (
        <div className="page-container">
            <nav className="landing-nav">
                <div className="container">
                    <div className="nav-brand">
                        <Link to="/"><h1>FinTrack</h1></Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/">Startseite</Link>
                        <Link to="/about">Über uns</Link>
                        <Link to="/gallery" className="active">Galerie</Link>
                        <Link to="/contact">Kontakt</Link>
                        <Link to="/login" className="btn-login">Anmelden</Link>
                    </div>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h1>Galerie</h1>
                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <div className="placeholder-image">
                                <i className="fas fa-chart-pie"></i>
                            </div>
                            <h3>Dashboard Übersicht</h3>
                            <p>Alle wichtigen Finanzdaten auf einen Blick</p>
                        </div>
                        <div className="gallery-item">
                            <div className="placeholder-image">
                                <i className="fas fa-list-alt"></i>
                            </div>
                            <h3>Transaktionsverwaltung</h3>
                            <p>Einfache Verwaltung Ihrer Ein- und Ausgaben</p>
                        </div>
                        <div className="gallery-item">
                            <div className="placeholder-image">
                                <i className="fas fa-file-invoice"></i>
                            </div>
                            <h3>Kontoauszüge</h3>
                            <p>Detaillierte Übersicht Ihrer Transaktionen</p>
                        </div>
                        <div className="gallery-item">
                            <div className="placeholder-image">
                                <i className="fas fa-money-bill-wave"></i>
                            </div>
                            <h3>Währungsrechner</h3>
                            <p>Aktuelle Wechselkurse für Ihre Reisen</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;