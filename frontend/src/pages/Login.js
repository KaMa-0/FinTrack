import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import './Pages.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
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
                        <Link to="/register" className="btn-register">Registrieren</Link>
                    </div>
                </div>
            </nav>

            <div className="auth-page-content">
                <div className="container">
                    <div className="auth-form-container">
                        <div className="auth-card">
                            <h2>Anmelden</h2>
                            <p className="auth-subtitle">Willkommen zurück bei FinTrack</p>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label>E-Mail-Adresse</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <label>Passwort</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Anmelden...' : 'Anmelden'}
                                </button>

                                <div className="text-center">
                                    <p className="mb-0">
                                        Noch kein Konto?
                                        <Link to="/register" className="auth-link"> Jetzt registrieren</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
