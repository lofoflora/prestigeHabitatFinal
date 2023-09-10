import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

function PartnerForm() {
  // State pour gérer les champs du formulaire
  const [userType, setUserType] = useState('partenaire');
  const [title, setTitle] = useState('M.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [siret, setSiret] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const [postalCode, setPostalCode] = useState('');
  const [addressComplement, setAddressComplement] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [city, setCity] = useState('');
  const [apiToken, setApiToken] = useState('');

  // Générer le token d'API au chargement du composant
 // Front-end
useEffect(() => {
  axios.get('http://localhost:5000/api/getToken', { withCredentials: true })
    .then(response => {
      setApiToken(response.data.access_token);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du token:', error);
    });
}, []);


const verifySiret = async () => {
  console.log('Vérification du SIRET en cours...');

  if (siret.length !== 14) {
    console.log("Le numéro SIRET est invalide.");
    setVerificationResult("Le numéro SIRET est invalide.");
    return false;
  }

  try {
    const response = await axios.get(`http://localhost:5000/insee/siret/${siret}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`
      }
    });
    console.log("Response from server: ", response);
    if (response.status === 200 && response.data) {
      console.log('Réponse de l\'API INSEE :', response.data);
      setVerificationResult("Le SIRET est valide.");
      return true;
    } else {
      console.log("Le SIRET n'est pas valide.");
      setVerificationResult("Le SIRET n'est pas valide.");
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du SIRET:', error);

    setVerificationResult("Erreur lors de la vérification du SIRET.");
    return false;
  }
};





 
  
  // // État pour stocker les villes associées au code postal
  // const [cities, setCities] = useState([]);
  // // État pour stocker la ville sélectionnée
  // const [city, setCity] = useState('');

  // // Référence pour l'élément de sélection de la ville (la petite flèche)
  // const citySelectRef = useRef();

  // // Utiliser useEffect pour effectuer la recherche à chaque changement du code postal
  // useEffect(() => {
  //   if (postalCode.length === 5) {
  //     fetchCityByPostalCode();
  //   } else {
  //     setCity('');
  //     setCities([]);
  //   }
  // }, [postalCode]);

  // // Utiliser useEffect pour simuler un clic sur la flèche de la liste déroulante lorsque les villes sont disponibles
  // useEffect(() => {
  //   if (cities.length > 0) {
  //     citySelectRef.current.focus();
  //   }
  // }, [cities]);

  // // Fonction pour récupérer la liste des villes associées au code postal depuis l'API
  // const fetchCityByPostalCode = async () => {
  //   try {
  //     const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(postalCode)}`);
  //     if (response.data.features.length > 0) {
  //       // Extraire la liste des villes de la réponse de l'API
  //       const listeVilles = response.data.features.map((feature) => feature.properties.city);

  //       // Éliminer les doublons en utilisant un Set et convertir en tableau
  //       const uniqueCities = [...new Set(listeVilles)];

  //       setCities(uniqueCities);
  //       setCity(uniqueCities[0]); // Définir la première ville unique comme ville sélectionnée
  //     } else {
  //       setCities([]); // Réinitialiser la liste des villes associées
  //       setCity('');
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la recherche de la ville :', error.message);
  //     setCities([]); // Réinitialiser la liste des villes associées
  //     setCity('');
  //   }
  // };
  const handlePostalCodeChange = (event) => {
    let value = event.target.value;
    // Supprime tous les caractères non numériques
    value = value.replace(/\D/g, '');
    // Limite à 5 chiffres
    value = value.substring(0, 5);
    // Ajoute un espace après les 2 premiers chiffres
    if (value.length > 2) {
      value = value.substring(0, 2) + ' ' + value.substring(2);
    }
    setPostalCode(value);
  };
  

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

  console.log('Vérification du SIRET en cours...');
  const isSiretValid = await verifySiret(); // Utilise "await" pour attendre la réponse de la fonction

  if (!isSiretValid) {
    alert("Le SIRET n'est pas valide.");
    console.log('Le SIRET n\'est pas valide.'); // Ajoute ce console.log
    return; // Important de s'assurer que la fonction s'arrête ici
  }

  const data = {
    type: 'partenaire', // toujours "partenaire"
    title,
    firstName,
    lastName,
    entreprise,
    siret,
    email,
    phoneNumber,
    password,
    postalCode,
    streetNumber,
    streetName,
    addressComplement,
    city,
  };

  try {
    // Envoi des données d'inscription au backend
    const response = await axios.post('http://127.0.0.1:3000/createUser', data);

    console.log(response.data);

      // Enregistrement des données de l'utilisateur dans le contexte
      setUserData({
        userType,
        title,
        firstName,
        lastName,
        entreprise,
        siret,
        email,
        phoneNumber,
        password,
        postalCode,
        address: `${streetNumber} ${streetName} ${addressComplement} ${city}`,
      });
 // Enregistrement des données de l'utilisateur dans le stockage local
 localStorage.setItem('userData', JSON.stringify({
  userType,
  title,
  firstName,
  lastName,
  entreprise,
  siret,
  email,
  phoneNumber,
  password,
  postalCode,
  address: `${streetNumber} ${streetName} ${addressComplement} ${city}`,
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

  // Fonction pour formater le numéro de SIRET
  const handleSiretChange = (event) => {
    const siretValue = event.target.value;
    const sanitizedSiret = siretValue.replace(/\D/g, ''); // Supprime tous les caractères non numériques
    const truncatedSiret = sanitizedSiret.slice(0, 14); // Limite à 14 caractères
  
    setSiret(truncatedSiret);
  };
  

  // Fonction pour mettre la première lettre en majuscule
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Case à cocher pour accepter les conditions
  const [acceptedConditions, setAcceptedConditions] = useState(false);

  // Fonction pour gérer le changement d'état de la case à cocher
  const handleAcceptConditionsChange = (event) => {
    setAcceptedConditions(event.target.checked);
  };

  // Fonction pour gérer le clic sur la ligne du conteneur de la case à cocher
  const handleCheckboxContainerClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="auth-form" style={{ backgroundColor: '#343a40', padding: '50px', borderRadius: '5px', position: 'relative',width: '50%' }}>
      <form onSubmit={handleFormSubmit}>
        <h2>Formulaire d'inscription</h2>
  
        {/* Champs de saisie pour l'Entreprise et le SIRET (affichés en permanence) */}
        <label style={{ color: 'white' }}>
          Entreprise :
          <input type="text" name="entreprise" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} required />
        </label>
  
        // ... (reste du code)

<label style={{ color: 'white' }}>
  SIRET :
  <input type="text" value={siret} onChange={handleSiretChange} />
  {verificationResult && <p>{verificationResult}</p>}
</label>
{/* Bouton pour vérifier le SIRET */}
<button type="button" onClick={verifySiret}>Vérifier SIRET</button>
{verificationResult && <p style={{ color: 'red' }}>{verificationResult}</p>}

// ... (reste du code)

  
        {/* Champs de saisie pour le titre */}
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

        <h5>Adresse</h5>

        {/* Champs de saisie pour le numéro de voie et la voie/rue/chemin */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ color: 'white', marginRight: '10px', width: '11%' }}>
            N° :
            <input type="text" name="streetNumber" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} required />
          </label>
          <label style={{ color: 'white', width: '89%' }}>
            Voie/Rue/Chemin :
            <input type="text" name="streetName" value={streetName} onChange={(e) => setStreetName(e.target.value)} required />
          </label>
        </div>

        {/* Champs de saisie pour le complément d'adresse */}
        <label style={{ color: 'white' }}>
          Complément d'adresse :
          <input type="text" name="addressComplement" value={addressComplement} onChange={(e) => setAddressComplement(e.target.value)} />
        </label>

         {/*
        {/*Champs de saisie pour le code postal et la ville*
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Champs de saisie pour le code postal 
          <label style={{ color: 'white', marginRight: '10px', width: '25%' }}>
            Code postal :
            <input type="text" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} pattern="[0-9]{5}" required />
          </label>

          {/* Input "Ville" en permanence 
          <label style={{ color: 'white', width: '83%' }}>
            Ville :
            {cities.length > 0 ? (
              <select ref={citySelectRef} value={city} onChange={(e) => setCity(e.target.value)}>
                {cities.map((ville) => (
                  <option key={ville} value={ville}>
                    {ville}
                  </option>
                ))}
              </select>
            ) : (
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            )}
          </label>
        </div>*/}
{/* Champs de saisie pour le code postal et la ville */}
<div style={{ display: 'flex', alignItems: 'center' }}>
  {/* Champs de saisie pour le code postal */}
  <label style={{ color: 'white', marginRight: '10px', width: '25%' }}>
    Code postal :
    <input
      type="text"
      name="postalCode"
      value={postalCode}
      onChange={handlePostalCodeChange} // Utilise la fonction de gestion du changement
      maxLength="6" // 5 chiffres + 1 espace
      required
    />
  </label>

  {/* Champs de saisie pour la ville */}
  <label style={{ color: 'white', width: '75%' }}>
    Ville :
    <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
  </label>
</div>


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
  <button type="submit" className="custom-button" >S'inscrire</button>
 
      </form>
    </div>
  );
}

export default PartnerForm;
