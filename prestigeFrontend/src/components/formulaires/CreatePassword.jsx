import React, { useState, useEffect } from 'react';

function CreatePassword({ title, lastName }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(''); // État pour stocker le token extrait de l'URL

  useEffect(() => {
    // Extraction du token de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');

    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    // Envoie la requête POST au serveur pour créer le mot de passe
    try {
      const response = await fetch('http://127.0.0.1:3000/client/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        // Mot de passe créé avec succès, gérer la redirection ou l'affichage d'un message de succès ici
        console.log('Mot de passe créé avec succès.');
      } else {
        console.error('Erreur lors de la création du mot de passe.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Bonjour {title} {lastName}</h1>
      <h2>Créez votre mot de passe</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="confirmPassword">Confirmation du mot de passe :</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Créer le mot de passe</button>
      </form>
    </div>
  );
}

export default CreatePassword;
