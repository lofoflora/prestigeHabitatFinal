//LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext'; // Assurez-vous d'ajuster le chemin d'import selon l'emplacement du fichier UserContext

function LoginForm({ onLogin, onCloseLoginForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { setIsLoggedIn } = useUser(); // Utilisation du hook useUser
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginFormSubmit({ email, password });
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleLoginFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:3001/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const firstName = response.data.firstName;
        const token = response.data.token;

        localStorage.setItem('authToken', token);
        
        setIsLoggedIn(true); // Mettre à jour l'état de connexion via le contexte
        
        onLogin(firstName);
        onCloseLoginForm();
      } else {
        console.error('Échec de la connexion :', response.data.message);
      }
      
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onClick={handleInputClick}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onClick={handleInputClick}
      />
      <button type="submit">Se connecter</button>
      <div>
        Pas de compte ? <Link to="/signupform" style={{ textDecoration: 'underline' }}>Inscrivez-vous ici</Link>
      </div>
      <div>
        <Link to="/resetpassword" style={{ textDecoration: 'underline' }}>Mot de passe oublié ?</Link>
      </div>
      <button onClick={onCloseLoginForm} type='submit'>Fermer</button>
    </form>
  );
}

export default LoginForm;
