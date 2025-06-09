const API_URL = 'http://localhost:5001/api/admin';

export const AdminService = {
    async getUsers(token) {
        const response = await fetch(`${API_URL}/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Laden der Benutzer');
        return response.json();
    },

    async getStats(token) {
        const response = await fetch(`${API_URL}/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Laden der Statistiken');
        return response.json();
    },

    async toggleUserLock(token, userId) {
        const response = await fetch(`${API_URL}/users/${userId}/lock`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Sperren des Benutzers');
        return response.json();
    },

    async deleteUser(token, userId) {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Fehler beim Löschen des Benutzers');
        }
        return response.json();
    }
};
