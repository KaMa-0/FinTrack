import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Relativer Pfad zur App.js im gleichen Verzeichnis

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
