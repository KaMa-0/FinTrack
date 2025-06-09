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
                        <Link to="/login" className="btn-login">Anmelden</Link>
                    </div>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h1>Über uns</h1>
                    <div className="about-section">
                        <h2>FH Projekt SS 2025</h2>
                        <p>FinTrack wurde im Rahmen der Projektarbeit in WEBTECH entwickelt. Primärer Zweck des Projektes ist das Lernen und Üben im Umgang mit Web-Technologies, erstellen von FrontEnd (FE) und BackEnd (BE) Komponenten und Koordination der Kommunikation zwischen den Komponenten. All das, in einer Art und Weise, die den gegebenen Requirements der Projektarbeit entsprechen.</p>

                        <h2>Unser Team</h2>
                        <ul>
                            <li><strong>Annas-Daud Sheikh</strong> <a href="mailto:annas-daud.sheikh@stud.fh-campuswien.ac.at">Send Mail.</a></li>
                            <li><strong>Maid Kanuric</strong> <a href="mailto:maid.kanuric@stud.fh-campuswien.ac.at">Send Mail.</a></li>
                            <li><strong>Zafer Sarioglu</strong> <a href="mailto:zafer.sarioglu@stud.fh-campuswien.ac.at">Send Mail.</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
