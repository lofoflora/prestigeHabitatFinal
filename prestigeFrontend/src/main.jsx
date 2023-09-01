import React from 'react';
import { createRoot } from 'react-dom/client';
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { UserProvider } from './components/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);