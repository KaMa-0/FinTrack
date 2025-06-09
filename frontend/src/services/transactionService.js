const API_URL = 'http://localhost:5001/api/transactions';

export const TransactionService = {
    async fetchAll(token) { // If there is no specific method like the others than it is GET.
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Laden der Transaktionen');
        return response.json();
    },

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

    async delete(token, id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Löschen der Transaktion');
        return response.json();
    },

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