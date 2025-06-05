import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Imports routing components
import { useUserAuth } from '../context/UserAuthContext'; // Imports auth context hook

function Navbar() {
    const { user, logout } = useUserAuth(); // Gets user and logout function from auth context
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleLogout = async () => {
        // Function to handle logout button click
        try {
            await logout(); // Calls logout function from auth context
            navigate('/login'); // Redirects to login page after logout
        } catch (err) {
            console.error(err); // Logs any errors
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary"> {/* Blue navigation bar */}
            <div className="container">
                <Link className="navbar-brand" to="/">FinTrack</Link> {/* App name/logo that links to homepage */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    {/* Hamburger menu button for mobile view */}
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> {/* Navigation links aligned to the right */}
                        {!user ? ( // Conditional rendering based on authentication
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link> {/* Login link */}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Registrieren</Link> {/* Register link in German */}
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button> {/* Logout button */}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; // Exports Navbar component