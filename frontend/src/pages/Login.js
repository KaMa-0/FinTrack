import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Imports routing components
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports Bootstrap CSS
import '../assets/style.css'; // Imports custom styles

function Login() {
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleSubmit = (e) => {
        // Function to handle form submission
        e.preventDefault(); // Prevents default form submission behavior
        localStorage.setItem('user', JSON.stringify({ email })); // Stores user email in localStorage
        navigate('/'); // Redirects to homepage after login
    };

    return (
        <div className="auth-container"> {/* Container with background image */}
            <div className="container mt-5"> {/* Container with top margin */}
                <div className="row justify-content-center"> {/* Centers content horizontally */}
                    <div className="col-md-6"> {/* Responsive column width */}
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Login</h2> {/* Login header */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3"> {/* Form group with bottom margin */}
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="E-Mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} // Updates email state when input changes
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
                                        Anmelden {/* Log in button in German */}
                                    </button>
                                    <div className="text-center">
                                        <Link to="/register" className="btn btn-outline-secondary">
                                            Noch kein Konto? Hier registrieren {/* No account yet? Register here */}
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

export default Login; // Exports Login component