
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
import AdComForm from "./components/adcom/usersCreate/AdComForm";
import ClientForm from "./components/adcom/usersCreate/ClientForm";
import PartnerForm from "./components/adcom/usersCreate/PartnerForm";


function App() {
  const {  isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    userFirstName,
    setUserFirstName,
    handleLogout,
     } = useUser();


     const handleLogin = (firstName, lastName, title, type, userData, authToken) => {
      setIsLoggedIn(true);
      setUserFirstName(firstName);
      setUserData(userData);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userFirstName', firstName);
      localStorage.setItem('userLastName', lastName);
      localStorage.setItem('userTitle', title);
      localStorage.setItem('userType', type); // Ajoute cette ligne
    };
    
    
  
  

 

    const handleLoginFormSubmitApp = async (formData) => {
      try {
        const response = await axios.post('http://127.0.0.1:3000/login', {
          email: formData.email,
          password: formData.password,
        });
    
        if (response.data.success) {
          const firstName = response.data.firstName;
          const lastName = response.data.lastName; // Nouveau
          const title = response.data.title; // Nouveau
          const type = response.data.type; // Nouveau
          const userData = response.data.userData;
          const authToken = response.data.token;
    
          handleLogin(firstName, lastName, title, type, userData, authToken); // Modifié
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
  const storedUserType = localStorage.getItem('userType'); // Nouveau
  if (storedToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    const firstName = localStorage.getItem('userFirstName');
    const lastName = localStorage.getItem('userLastName');
    const title = localStorage.getItem('userTitle');
    const type = storedUserType; // Utilise le type d'utilisateur stocké
    handleLogin(firstName, lastName, title, type, null, storedToken); // userData est null au départ
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
          <Route path="/create-partenaire" element={<PartnerForm/>}/>
          <Route path="/create-client" element={<ClientForm/>}/>
          <Route path="/create-adcom" element={<AdComForm/>}/>

        </Routes>

      </div>
   
  );
}

export default App;

