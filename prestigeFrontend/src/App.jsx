
//app.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home.jsx';
import Services from './components/pages/Services';
import News from './components/pages/News.jsx';
import SignupForm from './components/formulaires/SignupForm';
import ResetPassword from './components/formulaires/ResetPassword';
import SearchPage from './components/pages/SearchPage.jsx';
import Amo from "./components/pages/Amo.jsx";
import ConfirmationPage from "./components/pages/ConfirmationPage.jsx";
import PurchaseResalePage from "./components/pages/PurchaseResalePage.jsx";
import Dashboard from "./components/clients/Dashboard.jsx";
import { UserProvider } from './components/UserContext';
import SearchPageOption from './components/pages/SearchPageOption.jsx';
import './App.css';
import axios from 'axios';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userData, setUserData] = useState(null); // Définir userData avec la valeur initiale null

  const handleLogin = (firstName, userData) => {
    setIsLoggedIn(true);
    setUserFirstName(firstName);
    setUserData(userData); // Mettre à jour les données utilisateur
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userFirstName', firstName);
  };

 

  const handleLoginFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const firstName = response.data.firstName;
        const userData = response.data.userData; // Assurez-vous que les données utilisateur sont renvoyées depuis le backend

        handleLogin(firstName, userData); // Utilisez la fonction handleLogin avec les données utilisateur

        onCloseLoginForm();
      } else {
        console.error('Échec de la connexion :', response.data.message);
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

 // Utilisez le useEffect pour vérifier le token au chargement de l'application
useEffect(() => {
  const storedToken = localStorage.getItem('authToken');
  if (storedToken) {
    // Ici, vous pourriez envoyer le token au serveur pour vérification si nécessaire
    // Puis, si le token est valide, utilisez handleLogin pour mettre à jour l'état de connexion
    const firstName = localStorage.getItem('userFirstName'); // Obtenez le prénom depuis le local storage
    handleLogin(firstName, null); // userData est null au départ
  }
}, []);

const handleLogout = () => {
  console.log('Déconnexion en cours...'); // Vérifiez si cette ligne s'affiche dans la console
  setIsLoggedIn(false);
  setUserFirstName('');
  setUserData(null);
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userFirstName');
  localStorage.removeItem('authToken'); // Supprimez également le token du stockage local
  console.log('Token supprimé'); // Vérifiez si cette ligne s'affiche dans la console
};
  
  return (
    <UserProvider>
    <Router>
      <div className="App">
      <Header
            isLoggedIn={isLoggedIn}
            userFirstName={userFirstName}
            onLogin={handleLogin} // Utiliser directement la fonction ici
            onLogout={handleLogout}
          />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<News />} />
          <Route path="/signupform" element={<SignupForm />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-options" element={<SearchPageOption />} />
          <Route path="/amo" element={< Amo />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/purchaseresalpage" element={<PurchaseResalePage />} />
          <Route path="/dashboard" element={<Dashboard/>} />

        </Routes>

      </div>
    </Router>
    </UserProvider>
  );
}

export default App;

