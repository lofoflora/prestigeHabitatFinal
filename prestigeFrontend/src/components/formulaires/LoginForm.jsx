import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';

function LoginForm({ onLogin, onCloseLoginForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailRef = useRef(null);

  const { setIsLoggedIn, handleLogin } = useUser();

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
        const firstName = response.data.firstName;
        const lastName = response.data.lastName; // Nouveau
        const title = response.data.title; // Nouveau
        const type = response.data.userType; // Nouveau
        const userData = response.data.userData;
        const token = response.data.token;
  
        handleLogin(firstName, lastName, title, type, userData, token); // Modifié
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
        Pas de compte ? <Link to="/signupform" style={{ textDecoration: 'underline' }}>Inscrivez-vous ici</Link>
      </div>
      <div>
        <Link to="/resetpassword" style={{ textDecoration: 'underline' }}>Mot de passe oublié ?</Link>
      </div>
      <button onClick={onCloseLoginForm} type="button">Fermer</button>
    </form>
  );
}

export default LoginForm;
