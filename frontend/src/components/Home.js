import React from 'react';
import { useUserAuth } from '../context/UserAuthContext'; // Imports auth context hook

function Home() {
    const { user } = useUserAuth(); // Gets user from authentication context

    return (
        <div className="container mt-5"> {/* Container with top margin */}
            <div className="row justify-content-center"> {/* Centers content horizontally */}
                <div className="col-md-8"> {/* Responsive column width */}
                    <div className="card shadow-sm"> {/* Card with light shadow */}
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Willkommen bei FinTrack</h2> {/* Welcome header in German */}
                            <div className="text-center">
                                {user ? ( // Conditional rendering based on authentication status
                                    <div>
                                        <p className="lead">Sie sind eingeloggt als: {user.email}</p> {/* Shows user email when logged in */}
                                        <p>Verwalten Sie hier Ihre persönlichen Finanzen.</p> {/* Manage your personal finances */}
                                    </div>
                                ) : (
                                    <div>
                                        <p className="lead">Ihr persönlicher Finanz-Tracker</p> {/* Your personal finance tracker */}
                                        <p>Bitte melden Sie sich an, um Ihre Finanzen zu verwalten.</p> {/* Please log in to manage finances */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home; // Exports Home component