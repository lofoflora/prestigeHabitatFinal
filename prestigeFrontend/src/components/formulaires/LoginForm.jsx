import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';

function LoginForm({ onLogin, onCloseLoginForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailRef = useRef(null);

  // Nouvel état pour stocker les données utilisateur actuelles
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    type: '',
    email: '', // assure-toi d'ajouter ceci
  });
  

  const { setIsLoggedIn, handleLogin } = useUser();

  useEffect(() => {
    if (userData.email) {
      setEmail(userData.email);
    }
    // Mettez à jour les champs du formulaire lorsque les données utilisateur sont disponibles
    setEmail(userData.email);
    // Remplissez d'autres champs selon les besoins
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    handleLoginFormSubmit({ email, password });
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (emailRef.current) {
      emailRef.current.setCustomValidity(''); // Réinitialise le message d'erreur
    }
  };

  const handleLoginFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        // Mise à jour des données utilisateur actuelles
        setUserData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          title: response.data.title,
          type: response.data.userType,
          userId : response.data.userId
          // Ajoutez d'autres données utilisateur si nécessaire
        });

        const token = response.data.token;

        const refreshToken = response.data.refreshToken;

        handleLogin(response.data.firstName, response.data.lastName, response.data.title, response.data.userType, userData, token,refreshToken);
        onCloseLoginForm();
        setHasError(false);
        emailRef.current.setCustomValidity('');
      } else {
        setHasError(true);
        emailRef.current.setCustomValidity('Email ou mot de passe incorrect');
        emailRef.current.reportValidity();
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      setHasError(true);
      emailRef.current.setCustomValidity('Email ou mot de passe incorrect');
      emailRef.current.reportValidity();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        ref={emailRef}
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
      {isSubmitted && hasError && <div className="error-tooltip">Email ou mot de passe incorrect</div>}
      
      <div>
        <Link to="/resetpassword" style={{ textDecoration: 'underline' }}>Mot de passe oublié ?</Link>
      </div>
      <button onClick={onCloseLoginForm} type="button">Fermer</button>
    </form>
  );
}

export default LoginForm;
