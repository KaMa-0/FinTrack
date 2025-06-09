import React, { useState, useEffect } from 'react';
import { AdminService } from '../services/adminService';
import { authService } from '../services/authService';
import './AdminPanel.css';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const usersData = await AdminService.getUsers(currentUser.token);
                const statsData = await AdminService.getStats(currentUser.token);
                setUsers(usersData);
                setStats(statsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentUser.token]);

    const handleLockUser = async (userId) => {
        try {
            const result = await AdminService.toggleUserLock(currentUser.token, userId);
            alert(result.message);
            setUsers(users.map(u =>
                u._id === userId ? { ...u, isLocked: result.isLocked } : u
            ));
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteUser = async (userId, userEmail) => {
        if (window.confirm(`Sind Sie sicher, dass Sie den Benutzer ${userEmail} und alle seine Daten endgültig löschen möchten?`)) {
            try {
                const result = await AdminService.deleteUser(currentUser.token, userId);
                alert(result.message);

                // --- KORREKTUR HIER ---
                // 1. Benutzer aus der Liste entfernen
                setUsers(users.filter(u => u._id !== userId));

                // 2. Statistiken aktualisieren
                setStats(prevStats => ({
                    ...prevStats,
                    totalUsers: prevStats.totalUsers - 1,
                }));

            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) return <p>Admin Panel wird geladen...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-panel-container">
            <h1>Admin Panel</h1>

            <div className="admin-section">
                <h2>Systemstatistiken</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h4>Benutzer gesamt</h4>
                        {/* Die Anzeige bleibt gleich, wird aber durch den State aktualisiert */}
                        <p>{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card">
                        <h4>Transaktionen gesamt</h4>
                        <p>{stats.totalTransactions}</p>
                    </div>
                </div>
            </div>

            <div className="admin-section">
                <h2>Benutzerverwaltung</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Admin</th>
                            <th>Aktionen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td>{u.firstName} {u.lastName}</td>
                                <td>{u.email}</td>
                                <td>
                                        <span className={u.isLocked ? 'status-locked' : 'status-active'}>
                                            {u.isLocked ? 'Gesperrt' : 'Aktiv'}
                                        </span>
                                </td>
                                <td>{u.isAdmin ? 'Ja' : 'Nein'}</td>
                                <td>
                                    <button
                                        className={`btn btn-sm ${u.isLocked ? 'btn-success' : 'btn-warning'}`}
                                        onClick={() => handleLockUser(u._id)}
                                        disabled={u.email === currentUser.email}
                                    >
                                        {u.isLocked ? 'Entsperren' : 'Sperren'}
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger ms-2"
                                        onClick={() => handleDeleteUser(u._id, u.email)}
                                        disabled={u.email === currentUser.email}
                                    >
                                        Löschen
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;