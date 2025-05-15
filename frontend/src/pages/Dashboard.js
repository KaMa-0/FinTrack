import React from 'react';
import { useNavigate } from 'react-router-dom'; // Imports navigation hook
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports Bootstrap CSS

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user')); // Gets user data from localStorage
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleLogout = () => {
        // Function to handle logout button click
        localStorage.removeItem('user'); // Removes user data from localStorage
        navigate('/login'); // Redirects to login page
    };

    return (
        <div className="container mt-4"> {/* Container with top margin */}
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        {/* Flex container to place title and logout button on opposite sides */}
                        <h2>Willkommen bei FinTrack</h2> {/* Welcome heading in German */}
                        <button
                            className="btn btn-danger" // Red button for logout
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Kontoübersicht</h5> {/* Account overview in German */}
                            <p className="card-text">Aktueller Kontostand: 0,00 €</p> {/* Current balance */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"> {/* Half-width column on medium screens */}
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Letzte Transaktionen</h5> {/* Latest transactions */}
                                    <p className="card-text">Keine Transaktionen vorhanden</p> {/* No transactions available */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"> {/* Half-width column on medium screens */}
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Schnellaktionen</h5> {/* Quick actions */}
                                    <button className="btn btn-primary me-2">Neue Transaktion</button> {/* New transaction button */}
                                    <button className="btn btn-secondary">Kontoauszug</button> {/* Account statement button */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; // Exports Dashboard component