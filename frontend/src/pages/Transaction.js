import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Transaction() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10)); // Today's date as default
    const [type, setType] = useState('expense'); // 'expense' or 'income'

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would normally save the transaction to a database
        // For now, we'll just show an alert and navigate back to dashboard
        alert('Transaktion erfolgreich hinzugefügt!');
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Neue Transaktion</h5>
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Zurück
                            </button>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Typ</label>
                                    <div>
                                        <div className="form-check form-check-inline">
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
                                        <div className="form-check form-check-inline">
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
                                    <label htmlFor="amount" className="form-label">Betrag (€)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        step="0.01"
                                        min="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Beschreibung</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Kategorie</label>
                                    <select
                                        className="form-select"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">Bitte wählen...</option>
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
                                    <label htmlFor="date" className="form-label">Datum</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        Transaktion speichern
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;