// src/services/authService.js
const API_URL = 'http://localhost:5000/api/auth/'; //
export const authService = {
    // Register a new user
    signUp: async (userData) => {
        try {
            const response = await fetch(`${API_URL}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            // Store the token in localStorage
            localStorage.setItem('user', JSON.stringify({ email: userData.email, token: data.token }));
            return data;
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    },

    // Login existing user
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
            // Store the token in localStorage
            localStorage.setItem('user', JSON.stringify({ email, token: data.token }));
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('user');
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },
};