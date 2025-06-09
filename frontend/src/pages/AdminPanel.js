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
        if (window.confirm(`Sind Sie sicher, dass Sie den Benutzer ${userEmail} löschen möchten?`)) {
            try {
                const result = await AdminService.deleteUser(currentUser.token, userId);
                alert(result.message);

                setUsers(users.filter(u => u._id !== userId));
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

            {/* System Statistics */}
            <div className="admin-section">
                <h2>Systemstatistiken</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h4>Gesamte Benutzer</h4>
                        <p>{stats.totalUsers || 0}</p>
                    </div>
                    <div className="stat-card">
                        <h4>Gesamte Transaktionen</h4>
                        <p>{stats.totalTransactions || 0}</p>
                    </div>
                </div>
            </div>

            {/* User Management */}
            <div className="admin-section">
                <h2>Benutzerverwaltung</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-Mail</th>
                            <th>Status</th>
                            <th>Admin</th>
                            <th>Aktionen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                        <span className={user.isLocked ? 'status-locked' : 'status-active'}>
                                            {user.isLocked ? 'Gesperrt' : 'Aktiv'}
                                        </span>
                                </td>
                                <td>{user.isAdmin ? 'Ja' : 'Nein'}</td>
                                <td>
                                    <button
                                        className={`btn btn-sm ${user.isLocked ? 'btn-success' : 'btn-warning'}`}
                                        onClick={() => handleLockUser(user._id)}
                                        disabled={user.email === currentUser.email}
                                    >
                                        {user.isLocked ? 'Entsperren' : 'Sperren'}
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteUser(user._id, user.email)}
                                        disabled={user.email === currentUser.email}
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