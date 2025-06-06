// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);

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
                setTransactions(data.slice(0, 5)); // Last 5 transactions
                calculateTotals(data);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const calculateTotals = (data) => {
        let totalIncome = 0;
        let totalExpenses = 0;

        data.forEach(transaction => {
            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
            }
        });

        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setBalance(totalIncome - totalExpenses);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/landing');
    };

    return (
        <div className="dashboard-wrapper">
            {/* Top Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <div className="welcome-section">
                        <h2>Willkommen zurück!</h2>
                        <p>{user?.email}</p>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="logout-text">Abmelden</span>
                    </button>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="dashboard-content">
                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card balance">
                        <div className="stat-icon">
                            <i className="fas fa-wallet"></i>
                        </div>
                        <div className="stat-details">
                            <h4>Kontostand</h4>
                            <p className="stat-value">€{balance.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="stat-card income">
                        <div className="stat-icon">
                            <i className="fas fa-arrow-up"></i>
                        </div>
                        <div className="stat-details">
                            <h4>Einnahmen</h4>
                            <p className="stat-value">€{income.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="stat-card expenses">
                        <div className="stat-icon">
                            <i className="fas fa-arrow-down"></i>
                        </div>
                        <div className="stat-details">
                            <h4>Ausgaben</h4>
                            <p className="stat-value">€{expenses.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h3>Schnellaktionen</h3>
                    <div className="actions-grid">
                        <button
                            className="action-card"
                            onClick={() => navigate('/transaction')}
                        >
                            <i className="fas fa-plus-circle"></i>
                            <span>Neue Transaktion</span>
                        </button>

                        <button
                            className="action-card"
                            onClick={() => navigate('/account-statement')}
                        >
                            <i className="fas fa-file-alt"></i>
                            <span>Kontoauszug</span>
                        </button>

                        <button
                            className="action-card"
                            onClick={() => navigate('/currency-converter')}
                        >
                            <i className="fas fa-exchange-alt"></i>
                            <span>Währungsrechner</span>
                        </button>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="recent-transactions">
                    <div className="section-header">
                        <h3>Letzte Transaktionen</h3>
                        <button
                            className="view-all-btn"
                            onClick={() => navigate('/account-statement')}
                        >
                            Alle anzeigen
                        </button>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="empty-state">
                            <i className="fas fa-inbox"></i>
                            <p>Keine Transaktionen vorhanden</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/transaction')}
                            >
                                Erste Transaktion hinzufügen
                            </button>
                        </div>
                    ) : (
                        <div className="transaction-list">
                            {transactions.map(transaction => (
                                <div key={transaction._id} className="transaction-item">
                                    <div className="transaction-info">
                                        <h5>{transaction.description}</h5>
                                        <p>{new Date(transaction.date).toLocaleDateString('de-DE')}</p>
                                    </div>
                                    <div className={`transaction-amount ${transaction.type}`}>
                                        {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;