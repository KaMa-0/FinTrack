import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Imports routing components
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports Bootstrap CSS
import '../assets/style.css'; // Imports custom styles

function Register() {
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleSubmit = (e) => {
        // Function to handle form submission
        e.preventDefault(); // Prevents default form submission behavior
        // Hier später die Registrierungs-Logik implementieren (Registration logic to be implemented later)
        navigate('/login'); // Redirects to login page
    };

    return (
        <div className="auth-container"> {/* Container with background image */}
            <div className="container mt-5"> {/* Container with top margin */}
                <div className="row justify-content-center"> {/* Centers content horizontally */}
                    <div className="col-md-6"> {/* Responsive column width */}
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Registrierung</h2> {/* Registration header in German */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3"> {/* Form group with bottom margin */}
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="E-Mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} // Updates email state
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Passwort"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} // Updates password state
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mb-3">
                                        Registrieren {/* Register button in German */}
                                    </button>
                                    <div className="text-center">
                                        <Link to="/login" className="btn btn-outline-secondary">
                                            Bereits ein Konto? Hier einloggen {/* Already have an account? Login here */}
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register; // Exports Register component