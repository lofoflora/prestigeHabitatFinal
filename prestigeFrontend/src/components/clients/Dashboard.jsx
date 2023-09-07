import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function Dashboard() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData, handleLogout } = useUser();

  useEffect(() => {
    console.log('isLoggedIn après déconnexion:', isLoggedIn);
  }, [isLoggedIn]);

  const handleDeleteAccount = () => {
    console.log('Suppression du compte en cours...');
    // ... (ton code pour supprimer le compte)
    setIsLoggedIn(false);
  };


  return (
    <div>
      <h2>Tableau de bord</h2>
      <p>Bienvenue sur votre tableau de bord !</p>

      <section>
        <h3>Informations générales</h3>
        {/* Affichez les informations spécifiques de l'utilisateur */}
        <Link to="/edit-profile">Modifier les informations du compte</Link>
      </section>

      <section>
        {/* ... Autres sections du tableau de bord ... */}
      </section>

      <section>
        {/* Boutons pour les actions de l'utilisateur */}
        <button onClick={handleLogout} className="custom-button" >Déconnexion</button> <br />
        <button onClick={handleDeleteAccount} className="custom-button">Supprimer le compte</button>
      </section>
    </div>
  );
}

export default Dashboard;
