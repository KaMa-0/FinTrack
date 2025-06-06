import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AccountStatement() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/transactions', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Kontoauszug</h5>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-sm btn-outline-secondary"
                    >
                        Zurück
                    </button>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p>Wird geladen...</p>
                    ) : transactions.length === 0 ? (
                        <p className="text-muted">Keine Transaktionen vorhanden</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Datum</th>
                                    <th>Beschreibung</th>
                                    <th>Kategorie</th>
                                    <th className="text-end">Betrag</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{new Date(transaction.date).toLocaleDateString('de-DE')}</td>
                                        <td>{transaction.description}</td>
                                        <td>{transaction.category}</td>
                                        <td className={`text-end ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                            {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AccountStatement;