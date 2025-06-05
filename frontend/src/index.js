import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Imports the main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Creates a React root using the 'root' DOM element
root.render(
    <React.StrictMode> {/* StrictMode helps identify potential problems in the application */}
        <App /> {/* Renders the App component */}
    </React.StrictMode>
);