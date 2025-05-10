import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Willkommen bei FinTrack</h2>
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Kontoübersicht</h5>
                            <p className="card-text">Aktueller Kontostand: 0,00 €</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Letzte Transaktionen</h5>
                                    <p className="card-text">Keine Transaktionen vorhanden</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Schnellaktionen</h5>
                                    <button className="btn btn-primary me-2">Neue Transaktion</button>
                                    <button className="btn btn-secondary">Kontoauszug</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;