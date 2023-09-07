import React from 'react';
import { createRoot } from 'react-dom/client';
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { UserProvider } from './components/UserContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
      <App />
      </UserProvider>
    </Router>
  </React.StrictMode>
);