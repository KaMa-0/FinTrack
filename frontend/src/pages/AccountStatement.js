import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AccountStatement() {
    const navigate = useNavigate();

    // Simple mock transaction data
    const transactions = [
        { id: 1, date: '15.05.2025', description: 'Gehaltszahlung', amount: '+2500,00 €' },
        { id: 2, date: '12.05.2025', description: 'Miete', amount: '-800,00 €' },
        { id: 3, date: '10.05.2025', description: 'Supermarkt Einkauf', amount: '-65,79 €' },
        { id: 4, date: '05.05.2025', description: 'Tankstelle', amount: '-45,50 €' },
        { id: 5, date: '01.05.2025', description: 'Restaurant', amount: '-32,40 €' }
    ];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Kontoauszug</h5>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-sm btn-outline-secondary"
                    >
                        Zurück
                    </button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Beschreibung</th>
                                <th className="text-end">Betrag</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.description}</td>
                                    <td className={`text-end ${transaction.amount.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                        {transaction.amount}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountStatement;