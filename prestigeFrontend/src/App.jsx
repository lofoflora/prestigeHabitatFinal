
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
import CreateAdForm from "./components/formulaires/Adcom/CreateAnnonce";
import './App.css';
import axios from 'axios';
import { useUser } from "./components/UserContext.jsx";



function App() {
  const {  isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    userFirstName,
    setUserFirstName,
    handleLogout,
     } = useUser();


     const handleLogin = (firstName, userData, authToken) => {
      setIsLoggedIn(true);
      setUserFirstName(firstName);
      setUserData(userData);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userFirstName', firstName);
    };
    
  
  

 

    const handleLoginFormSubmitApp = async (formData) => {
      try {
        const response = await axios.post('http://127.0.0.1:3000/login', {
          email: formData.email,
          password: formData.password,
        });
    
        if (response.data.success) {
          const firstName = response.data.firstName;
          const userData = response.data.userData;
          const authToken = response.data.token;  // Récupère le token ici
          handleLogin(firstName, userData, authToken);  // Appelle handleLogin avec le token
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
    // Configure Axios pour utiliser le token dans les headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

    // Ici, vous pourriez envoyer le token au serveur pour vérification si nécessaire
    // Puis, si le token est valide, utilisez handleLogin pour mettre à jour l'état de connexion
    const firstName = localStorage.getItem('userFirstName'); // Obtenez le prénom depuis le local storage
    handleLogin(firstName, null); // userData est null au départ
  }
}, []);






  
  return (
    
      <div className="App">
      <Header
  isLoggedIn={isLoggedIn}
  userFirstName={userFirstName}
  onLogin={handleLogin} // Passer la fonction onLogin comme prop
  //onLogout={handleLogout}
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
          <Route path="/createannonce" element={<CreateAdForm/>}/>

        </Routes>

      </div>
   
  );
}

export default App;

