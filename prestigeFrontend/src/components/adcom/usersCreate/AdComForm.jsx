import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

function AdComForm() {
  // State pour gérer les champs du formulaire
  const [userType, setUserType] = useState('');
  const [title, setTitle] = useState('M.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



 

  // Utiliser le hook de navigation pour rediriger l'utilisateur après inscription
  const navigate = useNavigate();
  // Utiliser le contexte utilisateur pour enregistrer les données après inscription
  const { setUserData } = useUser();

 // Fonction de soumission du formulaire
const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Validation des champs et traitements
  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return; // Important de s'assurer que la fonction s'arrête ici
  }

 
  const data = {
    userType: userType, 
    title,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  };

  try {
    // Envoi des données d'inscription au backend
    const response = await axios.post('http://127.0.0.1:3000/adcom', data);

    console.log(response.data);

      // Enregistrement des données de l'utilisateur dans le contexte
      setUserData({
        userType,
        title,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
 // Enregistrement des données de l'utilisateur dans le stockage local
 localStorage.setItem('userData', JSON.stringify({
  userType,
  title,
  firstName,
  lastName,
  email,
  phoneNumber,
 
 
}));

      // Redirection vers une page de confirmation d'inscription
      navigate('/confirmation');
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API d\'inscription :', error.message);
      // Gérer l'erreur ici (afficher un message d'erreur, etc.)
    }
  };

  

  // Fonction pour formater le numéro de téléphone
  const handlePhoneNumberChange = (event) => {
    const phone = event.target.value;
    const sanitizedPhone = phone.replace(/\D/g, '');
    const truncatedPhone = sanitizedPhone.slice(0, 10);
    const formattedPhone = truncatedPhone.replace(/(\d{2})(?=\d)/g, '$1.');

    setPhoneNumber(formattedPhone);
  };

  

  // Fonction pour mettre la première lettre en majuscule
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  




  

  return (
    <div className="auth-form" style={{ backgroundColor: '#343a40', padding: '50px', borderRadius: '5px', position: 'relative',width: '50%' }}>
      <form onSubmit={handleFormSubmit}>
        <h2>Formulaire de creation AdCom</h2>

    {/* Champs de saisie pour le type d'utilisateur */}
<div>
  <label style={{ color: 'white', width: '100%' }}>
    Type d'utilisateur :
  </label>
  <div>
    <label style={{ marginRight: '10px' }}>
      <input
        type="radio"
        name="userType"
        value="admin"
        checked={userType === "admin"}
        onChange={() => setUserType("admin")}
      />
      Administrateur
    </label>
    <label>
      <input
        type="radio"
        name="userType"
        value="commercial"
        checked={userType === "commercial"}
        onChange={() => setUserType("commercial")}
      />
      Commercial
    </label>
  </div>
</div>


       
        
        <div>
          <label style={{ color: 'white',width:'17%' }}>
            Civilité :
            <select value={title} onChange={(e) => setTitle(e.target.value)}>
              <option value="M.">M.</option>
              <option value="Mme">Mme</option>
              <option value="Mlle">Mlle</option>
              <option value="Autre">Autre</option>
            </select>
          </label>
        </div>

        {/* Champs de saisie pour le prénom */}
        <label style={{ color: 'white' }}>
          Prénom :
          <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(capitalizeFirstLetter(e.target.value))} required />
        </label>

        {/* Champs de saisie pour le nom */}
        <label style={{ color: 'white' }}>
          Nom :
          <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(capitalizeFirstLetter(e.target.value))} required />
        </label>

        {/* Champs de saisie pour l'adresse email */}
        <label style={{ color: 'white' }}>
          Email :
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        {/* Champs de saisie pour le numéro de téléphone */}
        <label style={{ color: 'white' }}>
          Numéro de téléphone :
          <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} pattern="[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}" required />
        </label>

        <hr style={{ borderColor: '#ffd700', borderWidth: '3px', margin: '10px auto', width: '95%' }} />

       

        <hr style={{ borderColor: '#ffd700', borderWidth: '3px', margin: '10px auto', width: '95%' }} />

        {/* Champs de saisie pour le mot de passe */}
        <label style={{ color: 'white' }}>
          Mot de passe :
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {/* Champs de saisie pour confirmer le mot de passe */}
        <label style={{ color: 'white' }}>
          Confirmer le mot de passe :
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>


      
  {/* Bouton pour soumettre le formulaire */}
  <button type="submit" className="custom-button">Créer</button>
      </form>
    </div>
  );
}

export default AdComForm;
