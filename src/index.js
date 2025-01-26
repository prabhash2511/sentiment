import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app'; // Import Firebase directly

// Import Firebase Auth and Firestore
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for React 18
root.render(
    <App />
);
