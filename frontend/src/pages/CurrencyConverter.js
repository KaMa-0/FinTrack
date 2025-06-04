// frontend/src/pages/CurrencyConverter.js
import React, { useState } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const currencies = ['EUR', 'USD', 'GBP', 'CHF', 'JPY'];

    const handleConvert = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        setIsLoading(true);

        if (!amount || amount <= 0) {
            setError('Bitte geben Sie einen gültigen Betrag ein');
            setIsLoading(false);
            return;
        }

        try {
            // Direkte Verwendung der Exchange Rate API als Fallback
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const rate = data.rates[toCurrency];

            if (rate) {
                const calculatedResult = (parseFloat(amount) * rate).toFixed(2);
                setResult(calculatedResult);
            } else {
                throw new Error('Wechselkurs nicht verfügbar');
            }
        } catch (error) {
            setError('Währungsumrechnung fehlgeschlagen. Bitte versuchen Sie es später erneut.');
            console.error('Fehler bei der Währungsumrechnung:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="converter-container">
            <h2>Währungsrechner</h2>
            <form onSubmit={handleConvert}>
                <div className="input-group">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Betrag"
                        min="0.01"
                        step="0.01"
                        required
                        disabled={isLoading}
                    />
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        disabled={isLoading}
                    >
                        {currencies.map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        disabled={isLoading}
                    >
                        {currencies.map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Wird umgerechnet...' : 'Umrechnen'}
                </button>
            </form>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            {result && (
                <div className="result">
                    {parseFloat(amount).toFixed(2)} {fromCurrency} = {result} {toCurrency}
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;