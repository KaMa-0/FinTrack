import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function AboutUs() {
    return (
        <div className="page-container">
            <nav className="landing-nav">
                <div className="container">
                    <div className="nav-brand">
                        <Link to="/"><h1>FinTrack</h1></Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/">Startseite</Link>
                        <Link to="/about" className="active">Über uns</Link>
                        <Link to="/gallery">Galerie</Link>
                        <Link to="/contact">Kontakt</Link>
                        <Link to="/login" className="btn-login">Anmelden</Link>
                    </div>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h1>Über uns</h1>
                    <div className="about-section">
                        <h2>Unsere Mission</h2>
                        <p>FinTrack wurde entwickelt, um Menschen dabei zu helfen, ihre Finanzen einfach und effizient zu verwalten. Wir glauben, dass jeder die Kontrolle über seine finanzielle Zukunft haben sollte.</p>

                        <h2>Unser Team</h2>
                        <p>Wir sind ein engagiertes Team von Entwicklern und Finanzexperten, die gemeinsam an der besten Lösung für Ihre Finanzverwaltung arbeiten.</p>

                        <h2>Unsere Werte</h2>
                        <ul>
                            <li><strong>Transparenz:</strong> Klare und verständliche Finanzübersichten</li>
                            <li><strong>Sicherheit:</strong> Ihre Daten sind bei uns sicher</li>
                            <li><strong>Benutzerfreundlichkeit:</strong> Einfache Bedienung für jedermann</li>
                            <li><strong>Innovation:</strong> Stetige Weiterentwicklung unserer Dienste</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;