import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionService } from '../services/transactionService';
import './Transaction.css';

function Transaction() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
    const [type, setType] = useState('expense');
    const [transactions, setTransactions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.token) {
            fetchTransactions();
        } else {
            navigate('/login');
        }
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await TransactionService.fetchAll(user.token);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const transaction = {
            amount: parseFloat(amount),
            description,
            category,
            type,
            date
        };

        try {
            if (editingId) {
                await TransactionService.update(user.token, editingId, transaction);
            } else {
                await TransactionService.create(user.token, transaction);
            }
            alert(editingId ? 'Transaktion aktualisiert!' : 'Transaktion hinzugefügt!');
            resetForm();
            fetchTransactions();
        } catch (error) {
            console.error('Error saving transaction:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Diese Transaktion wirklich löschen?')) {
            try {
                await TransactionService.delete(user.token, id);
                alert('Transaktion gelöscht!');
                fetchTransactions();
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    const handleEdit = (transaction) => {
        setAmount(transaction.amount);
        setDescription(transaction.description);
        setCategory(transaction.category);
        setType(transaction.type);
        setDate(transaction.date.substr(0, 10));
        setEditingId(transaction._id);

        // Scroll to top on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setAmount('');
        setDescription('');
        setCategory('');
        setType('expense');
        setDate(new Date().toISOString().substr(0, 10));
        setEditingId(null);
    };

    const handleAmountUpdate = async (transaction) => {
        const newAmount = prompt('Neuer Betrag:', transaction.amount);
        if (newAmount) {
            try {
                await TransactionService.updateAmount(user.token, transaction._id, parseFloat(newAmount));
                fetchTransactions();
            } catch (error) {
                console.error('Error updating amount:', error);
            }
        }
    };

    return (
        <div className="transaction-container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="card transaction-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                {editingId ? 'Transaktion bearbeiten' : 'Neue Transaktion'}
                            </h5>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                <i className="fas fa-arrow-left d-md-none"></i>
                                <span className="d-none d-md-inline">Zurück</span>
                            </button>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="transaction-form">
                                <div className="mb-3">
                                    <label className="form-label">Typ</label>
                                    <div className="type-selector">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="expense"
                                                value="expense"
                                                checked={type === 'expense'}
                                                onChange={() => setType('expense')}
                                            />
                                            <label className="form-check-label" htmlFor="expense">
                                                Ausgabe
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="income"
                                                value="income"
                                                checked={type === 'income'}
                                                onChange={() => setType('income')}
                                            />
                                            <label className="form-check-label" htmlFor="income">
                                                Einnahme
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Betrag (€)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Beschreibung</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Kategorie</label>
                                    <select
                                        className="form-select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">Kategorie wählen...</option>
                                        {type === 'expense' ? (
                                            <>
                                                <option value="groceries">Lebensmittel</option>
                                                <option value="housing">Wohnen</option>
                                                <option value="transport">Transport</option>
                                                <option value="entertainment">Unterhaltung</option>
                                                <option value="health">Gesundheit</option>
                                                <option value="other">Sonstiges</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="salary">Gehalt</option>
                                                <option value="bonus">Bonus</option>
                                                <option value="gift">Geschenk</option>
                                                <option value="other">Sonstiges</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Datum</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary flex-grow-1" disabled={loading}>
                                        {loading ? 'Wird gespeichert...' : (editingId ? 'Aktualisieren' : 'Speichern')}
                                    </button>
                                    {editingId && (
                                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                            <i className="fas fa-times me-2"></i>
                                            Abbrechen
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card transaction-card">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-list me-2"></i>
                                Meine Transaktionen
                            </h5>
                        </div>
                        <div className="card-body">
                            {transactions.length === 0 ? (
                                <div className="text-center py-4">
                                    <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                                    <p className="text-muted">Keine Transaktionen vorhanden</p>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop Table View */}
                                    <div className="table-responsive">
                                        <table className="table table-sm transaction-table">
                                            <thead>
                                            <tr>
                                                <th>Datum</th>
                                                <th>Beschreibung</th>
                                                <th>Betrag</th>
                                                <th>Aktionen</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {transactions
                                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                                .map(transaction => (
                                                    <tr key={transaction._id}>
                                                        <td>{new Date(transaction.date).toLocaleDateString('de-DE')}</td>
                                                        <td>
                                                            <div>{transaction.description}</div>
                                                        </td>
                                                        <td className={`text-end ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                                            <strong>
                                                                {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <div className="action-buttons">
                                                                <button
                                                                    className="btn btn-sm btn-outline-primary action-btn"
                                                                    onClick={() => handleEdit(transaction)}
                                                                    title="Bearbeiten"
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-outline-warning action-btn"
                                                                    onClick={() => handleAmountUpdate(transaction)}
                                                                    title="Betrag ändern"
                                                                >
                                                                    <i className="fas fa-coins"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-outline-danger action-btn"
                                                                    onClick={() => handleDelete(transaction._id)}
                                                                    title="Löschen"
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="mobile-transaction-list">
                                        {transactions
                                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                                            .map(transaction => (
                                                <div key={transaction._id} className="transaction-item-card">
                                                    <div className="transaction-item-header">
                                                        <span className="transaction-date">
                                                            {new Date(transaction.date).toLocaleDateString('de-DE')}
                                                        </span>
                                                        <span className={`transaction-amount ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                                            {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                                                        </span>
                                                    </div>
                                                    <div className="transaction-description">
                                                        {transaction.description}
                                                    </div>
                                                    <div className="transaction-actions">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary mobile-action-btn"
                                                            onClick={() => handleEdit(transaction)}
                                                        >
                                                            <i className="fas fa-edit"></i>Bearbeiten
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-warning mobile-action-btn"
                                                            onClick={() => handleAmountUpdate(transaction)}
                                                        >
                                                            <i className="fas fa-coins"></i>Betrag Ändern
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger mobile-action-btn"
                                                            onClick={() => handleDelete(transaction._id)}
                                                        >
                                                            <i className="fas fa-trash"></i>Löschen
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;