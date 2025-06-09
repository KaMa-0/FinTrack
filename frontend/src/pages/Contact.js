import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                        <Link to="/gallery">Galerie</Link>
                        <Link to="/contact" className="active">Kontakt</Link>
                        <Link to="/login" className="btn-login">Anmelden</Link>
                    </div>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h1>Kontakt</h1>
                    <div className="contact-section">
                        <div className="contact-info">
                            <h2>Kontaktinformationen</h2>
                            <div className="info-item">
                                <i className="fas fa-envelope"></i>
                                <p>info@fintrack.de</p>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-phone"></i>
                                <p>+49 123 456789</p>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>Musterstraße 123<br/>12345 Berlin</p>
                            </div>
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h2>Nachricht senden</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ihr Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Ihre E-Mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Ihre Nachricht"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">Nachricht senden</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;