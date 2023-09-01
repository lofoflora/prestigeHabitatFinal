import React, { useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (event) => {
    event.preventDefault();
    // Votre logique de réinitialisation du mot de passe ici
    try {
      // Envoyer l'e-mail au backend pour réinitialiser le mot de passe
      console.log(email);
      setMessage('Un e-mail de réinitialisation du mot de passe a été envoyé.');
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error.message);
      setMessage('Une erreur est survenue lors de la réinitialisation du mot de passe.');
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleResetPassword}>
        <h2>Réinitialisation du mot de passe</h2>
        <label>
          Adresse e-mail:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit"className="custom-button">Réinitialiser le mot de passe</button>
        {message && <div className="reset-password-message">{message}</div>}
      </form>
    </div>
  );
}

export default ResetPassword;
