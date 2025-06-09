const API_URL = 'http://localhost:5001/api/transactions';

// M3_req::start [calls upon backend API, via HTTP methods]
export const TransactionService = {
    // M3_req -> GET call of API, calling getTransactions in backend
    async fetchAll(token) { // If there is no specific method like the others than it is GET.
        const response = await fetch(API_URL, { // Pauses the function until the request completes.
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Laden der Transaktionen');
        return response.json();
    },

    // M3_req -> POST call of API, calling createTransaction in backend
    async create(token, transaction) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transaction)
        });
        if (!response.ok) throw new Error('Fehler beim Erstellen der Transaktion');
        return response.json();
    },

    // M3_req -> PUT call of API, calling updateTransaction in backend
    async update(token, id, transaction) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transaction)
        });
        if (!response.ok) throw new Error('Fehler beim Aktualisieren der Transaktion');
        return response.json();
    },

    // M3_req -> DELTE call of API, calling deleteTransaction in backend
    async delete(token, id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Löschen der Transaktion');
        return response.json();
    },

    // M3_req -> PATCH call of API, calling patchTransaction in backend
    async updateAmount(token, id, amount) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount })
        });
        if (!response.ok) throw new Error('Fehler beim Aktualisieren des Betrags');
        return response.json();
    }
};

// M3_req::end
