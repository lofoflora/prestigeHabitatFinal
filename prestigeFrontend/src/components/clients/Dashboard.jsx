import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProvider, useUser } from '../UserContext';


function Dashboard() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useUser();

  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    // Effectuer les opérations nécessaires pour déconnecter l'utilisateur
    setIsLoggedIn(false); // Utilisez setIsLoggedIn pour déconnecter l'utilisateur
  };

  useEffect(() => {
    console.log('isLoggedIn après déconnexion:', isLoggedIn);
  }, [isLoggedIn]); // Le effet s'exécutera lorsque isLoggedIn change

  const handleDeleteAccount = () => {
    console.log('Suppression du compte en cours...');
    // Effectuer les opérations nécessaires pour supprimer le compte de l'utilisateur
    // Ceci pourrait nécessiter une validation de l'administrateur
    setIsLoggedIn(false); // Déconnecter l'utilisateur après la suppression du compte
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
