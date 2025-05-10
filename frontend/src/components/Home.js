import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';

function Home() {
    const { user } = useUserAuth();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Willkommen bei FinTrack</h2>
                            <div className="text-center">
                                {user ? (
                                    <div>
                                        <p className="lead">Sie sind eingeloggt als: {user.email}</p>
                                        <p>Verwalten Sie hier Ihre persönlichen Finanzen.</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="lead">Ihr persönlicher Finanz-Tracker</p>
                                        <p>Bitte melden Sie sich an, um Ihre Finanzen zu verwalten.</p>
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

export default Home;