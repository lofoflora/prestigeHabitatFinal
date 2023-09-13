import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PartnerForm from '../adcom/usersCreate/ClientForm';

function RealEstateForm() {
  const [postalCode, setPostalCode] = useState('');
  const [addressComplement, setAddressComplement] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [heating, setHeating] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const citySelectRef = useRef(null);

  const textAreaRef = useRef(null);

  const handleTextChange = () => {
    const textArea = textAreaRef.current;
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  const handleSelect = (type, value) => {
    let currentValues = type === "heating" ? heating : amenities;
    let setFunction = type === "heating" ? setHeating : setAmenities;

    if (currentValues.includes(value)) {
      setFunction(currentValues.filter(item => item !== value));
    } else {
      setFunction([...currentValues, value]);
    }
  };

  useEffect(() => {
    if (postalCode.length === 5) {
      fetchCityByPostalCode();
    } else {
      setCity('');
      setCities([]);
    }
  }, [postalCode]);

  const fetchCityByPostalCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/adresse/search/?q=${encodeURIComponent(postalCode)}`);
      if (response.data.features.length > 0) {
        const listeVilles = response.data.features.map((feature) => feature.properties.city);
        const uniqueCities = [...new Set(listeVilles)];
        setCities(uniqueCities);
        setCity(uniqueCities[0]);
      } else {
        setCities([]);
        setCity('');
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de la ville :', error.message);
      setCities([]);
      setCity('');
    }
  };

 
 
    
    return (
        <form>
        <h1>Création d'annonce immobilière</h1><br /><br />

            {/* Informations de base */}
            
            <h5>Vendeur</h5>
          
            <div>
    <PartnerForm />
    <div><br />
</div>
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

 
{/*Champs de saisie pour le code postal et la ville**/}
<div style={{ display: 'flex', alignItems: 'center' }}>
  {/* Champs de saisie pour le code postal */}
  <label style={{ color: 'white', marginRight: '10px', width: '25%' }}>
    Code postal :
    <input type="text" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} pattern="[0-9]{5}" required />
  </label>

  {/* Input "Ville" en permanence */}
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
</div>

                <h5>Bien à vendre </h5>

                <div>
                <label>Titre de l'annonce</label>
                <input type="text" placeholder="Titre" />
            </div>
                <label>Localité</label>
                <input type="text" placeholder="Localité" />
            </div>

            {/* Détails de la propriété */}
            <div>
                <label>Type de propriété</label>
                <select>
                    <option>Appartement</option>
                    <option>Maison</option>
                    <option>Studio</option>
                    <option>Terrain</option>
                    <option>Loft/atelier</option>
                    <option>Chateau</option>
                    <option>Local professionnel</option>
                    <option>Commerce</option>
                    <option>Garage/Hangar</option>
                    <option>autre</option>


                </select>
            </div>
            <div>
                <label>Type de vente</label>
                <select>
                    <option>Ancien</option>
                    <option>Neuf</option>
                    <option>Viager</option>
                    <option>A rénover</option>
                </select>
            </div>
            <div>
                <label>Surface de la maison</label>
                <input type="text" placeholder="Surface de la maison" />
            </div>
            <div>
                <label>Surface du terrain</label>
                <input type="text" placeholder="Surface du terrain" />
            </div>
            <div>
                <label>Nombre de pièces</label>
                <input type="number" placeholder="Nombre de pièces" />
            </div>
            <div>
                <label>Nombre de chambres</label>
                <input type="number" placeholder="Nombre de chambres" />
            </div>
            <div>
                <label>Nombre de WC</label>
                <input type="number" placeholder="Nombre de WC" />
            </div>
            <div>
                <label>Nombre de salles de bain</label>
                <input type="number" placeholder="Nombre de salles de bain" />
            </div>
            <div>
                <label>Budget</label>
                <input type="text" placeholder="Budget" />
            </div>
           {/* Chauffage */}
           <label>Chauffage:</label>
          <div className="checkbox-group">
            <button
             type="button"
              className={heating.includes("electrique") ? "selected" : ""}
              onClick={() => handleSelect("heating", "electrique")}
            >
              Electrique
            </button>
            <button
             type="button"
              className={heating.includes("gaz") ? "selected" : ""}
              onClick={() => handleSelect("heating", "gaz")}
            >
              Gaz
            </button>
            <button
             type="button"
              className={heating.includes("fioul") ? "selected" : ""}
              onClick={() => handleSelect("heating", "fioul")}
            >
              Fioul
            </button>
            <button
             type="button"
              className={heating.includes("bois") ? "selected" : ""}
              onClick={() => handleSelect("heating", "bois")}
            >
              Bois
            </button>
            <button
             type="button"
              className={heating.includes("autre") ? "selected" : ""}
              onClick={() => handleSelect("heating", "autre")}
            >
              Autre
            </button>
          </div>

          {/* Commodités */}
            <label>Commodités/Confort:</label>
          <div className="checkbox-group">
            <button
             type="button"
              className={amenities.includes("piscine") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "piscine")}
            >
            Jardin
          </button>
          <button
           type="button"
            className={amenities.includes("ascenseur") ? "selected" : ""}
            onClick={() => handleSelect("amenities", "ascenseur")}
          >
            Garage
          </button>
          <button
           type="button"
            className={amenities.includes("jardin") ? "selected" : ""}
            onClick={() => handleSelect("amenities", "jardin")}
          >
              Piscine
            </button>
            <button
             type="button"
              className={amenities.includes("garage") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "garage")}
            >
              Ascenseur
            </button>
            <button
             type="button"
              className={amenities.includes("balcon") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "balcon")}
            >
              Balcon
            </button>
            <button
             type="button"
              className={amenities.includes("cave") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "cave")}
            >
              Cave
            </button>
            <button
             type="button"
              className={amenities.includes("terrasse") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "terrasse")}
            >
              Terrasse
            </button>
            <button
             type="button"
              className={amenities.includes("pompe a chaleur") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "pompe a chaleur")}
            >
              Pompe à chaleur
            </button>
            <button
             type="button"
              className={amenities.includes("climatisation") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "climatisation")}
            >
              Climatisation
            </button>
            <button
             type="button"
              className={amenities.includes("autre") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "autre")}
            >
              Panneaux solaires
            </button>
            <button
             type="button"
              className={amenities.includes("autre") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "autre")}
            >
              Autre
            </button>
          </div> <br />
            <div>
  <label>Description</label>
  <textarea
          ref={textAreaRef}
          placeholder="Description"
          onInput={handleTextChange}
        ></textarea>
</div>

            {/* Téléchargement de photos et vues 3D */}
            <div>
                <label>Photo</label>
                <input type="file" accept="image/*" />
            </div>
            <div>
                <label>Vue 3D</label>
                <input type="file" accept=".obj,.gltf" />
            </div><br />

            <button type="submit">Créer l'annonce</button>
        </form>
    );
};

export default RealEstateForm;

