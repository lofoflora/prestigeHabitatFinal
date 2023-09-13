import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function RealEstateForm() {
  const [title, setTitle] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [addressComplement, setAddressComplement] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState([]);
  const [purchaseType, setPurchaseType] = useState([]);
  const [houseSurface, setHouseSurface] = useState('');
  const [landSurface, setLandSurface] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [numBedrooms, setNumBedrooms] = useState('');
  const [numWC, setNumWC] = useState('');
  const [numBathrooms, setNumBathrooms] = useState('');
  const [budget, setBudget] = useState('');
  const [heating, setHeating] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [description, setDescription] = useState('');
  const [actif, setActif] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [threeDViews, setThreeDViews] = useState([]);

  const textAreaRef = useRef(null);

  const handleTextChange = () => {
    const textArea = textAreaRef.current;
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  };

  const handleSelect = (type, value) => {
    let currentValues;
    let setFunction;

    switch (type) {
      case 'propertyType':
        currentValues = propertyType;
        setFunction = setPropertyType;
        break;
      case 'purchaseType':
        currentValues = purchaseType;
        setFunction = setPurchaseType;
        break;
      case 'heating':
        currentValues = heating;
        setFunction = setHeating;
        break;
      case 'amenities':
        currentValues = amenities;
        setFunction = setAmenities;
        break;
      default:
        return;
    }

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
      // Réinitialiser la liste des villes
    }
  }, [postalCode]);

  const fetchCityByPostalCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/adresse/search/?q=${encodeURIComponent(postalCode)}`);
      if (response.data.features.length > 0) {
        const listeVilles = response.data.features.map(feature => feature.properties.city);
        const uniqueCity = [...new Set(listeVilles)];
      
        setCity(uniqueCity.length > 0 ? uniqueCity[0] : '');
      } else {
        setCity('');
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de la ville :', error.message);
      setCity('');
    }
  };
  



  const handlePhotoUpload = e => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleThreeDUpload = e => {
    const files = Array.from(e.target.files);
    setThreeDViews(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('streetNumber', streetNumber);
    formData.append('streetName', streetName);
    formData.append('addressComplement', addressComplement);
    formData.append('city', city);
    formData.append('propertyType', JSON.stringify(propertyType));
    formData.append('purchaseType', JSON.stringify(purchaseType));
    formData.append('houseSurface', houseSurface);
    formData.append('landSurface', landSurface);
    formData.append('numRooms', numRooms);
    formData.append('numBedrooms', numBedrooms);
    formData.append('numWC', numWC);
    formData.append('numBathrooms', numBathrooms);
    formData.append('budget', budget);
    formData.append('heating', JSON.stringify(heating));
    formData.append('amenities', JSON.stringify(amenities));
    formData.append('description', description);
    formData.append('actif', actif);

    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });

    threeDViews.forEach((view, index) => {
      formData.append(`threeDViews[${index}]`, view);
    });
    console.log('Données envoyées:', Object.fromEntries(formData));
    try {
      const response = await axios.post('http://127.0.0.1:3000/realEstateAd', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce:", error);
    }
  };
  useEffect(() => {
    if (postalCode.length === 5) {
      fetchCityByPostalCode();
    } else {
      setCity('');
    
    }
  }, [postalCode]);

  


  return (
    <form onSubmit={handleSubmit}>
      <h1>Création d'annonce immobilière</h1>
      <br />
      <br />

      {/* Informations de base */}
      <h5>Adresse</h5>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>
          N° :
          <input type="text" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} required />
        </label>
        <label>
          Voie/Rue/Chemin :
          <input type="text" value={streetName} onChange={e => setStreetName(e.target.value)} required />
        </label>
      </div>
      <label>
        Complément d'adresse :
        <input type="text" value={addressComplement} onChange={e => setAddressComplement(e.target.value)} />
      </label>
      <label>
        Code Postal :
        <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
      </label>
      <label>
        Ville :
        <input type="text" value={city} readOnly />
      </label>


      <h5>Bien à vendre</h5>

      <label>Titre de l'annonce:</label>
<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      {/* Type de propriété */}
      <label>Type de propriété :</label>
<div className="radio-group">
  {["Appartement", "Maison", "Studio", "Terrain", "Loft/atelier", "Chateau", "Local professionnel", "Commerce", "Garage/Hangar", "Autre"].map(type => (
    <label key={type}>
      <input
        type="radio"
        name="propertyType" // Utilisez le même nom pour tous les boutons de ce groupe
        value={type}
        checked={propertyType === type}
        onChange={() => setPropertyType(type)}
      />
      {type}
    </label>
  ))}
</div>

<label>Type de vente :</label>
<div className="radio-group">
  {["Ancien", "Neuf", "Viager", "A rénover"].map(type => (
    <label key={type}>
      <input
        type="radio"
        name="purchaseType" // Utilisez le même nom pour tous les boutons de ce groupe
        value={type}
        checked={purchaseType === type}
        onChange={() => setPurchaseType(type)}
      />
      {type}
    </label>
  ))}
</div>



      {/* Surface de la maison */}
      <label>Surface de la maison:</label>
      <input type="text" value={houseSurface} onChange={(e) => setHouseSurface(e.target.value)} />

      {/* Surface du terrain */}
      <label>Surface du terrain:</label>
      <input type="text" value={landSurface} onChange={(e) => setLandSurface(e.target.value)} />

      {/* Nombre de pièces */}
      <label>Nombre de pièces:</label>
      <input type="number" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} />

      {/* Nombre de chambres */}
      <label>Nombre de chambres:</label>
      <input type="number" value={numBedrooms} onChange={(e) => setNumBedrooms(e.target.value)} />

      {/* Nombre de WC */}
      <label>Nombre de WC:</label>
      <input type="number" value={numWC} onChange={(e) => setNumWC(e.target.value)} />

      {/* Nombre de salles de bain */}
      <label>Nombre de salles de bain:</label>
      <input type="number" value={numBathrooms} onChange={(e) => setNumBathrooms(e.target.value)} />

      {/* Budget */}
      <label>Budget:</label>
      <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} />

      {/* Chauffage */}
    {/* Chauffage */}
<label>Chauffage:</label>
<div className="checkbox-group">
  {["Electrique", "Gaz", "Fioul", "Bois", "Autre"].map(type => (
    <button
      key={type} // Ajoutez une clé unique ici
      type="button"
      className={heating.includes(type) ? "selected" : ""}
      onClick={() => handleSelect("heating", type)}
    >
      {type}
    </button>
  ))}
</div>

{/* Commodités */}
<label>Commodités:</label>
<div className="checkbox-group">
  {["Jardin", "Garage", "Piscine", "Ascenseur", "Balcon", "Cave", "Terrasse", "Pompe à chaleur", "Climatisation", "Panneaux solaires", "Autre"].map(type => (
    <button
      key={type} // Ajoutez une clé unique ici
      type="button"
      className={amenities.includes(type) ? "selected" : ""}
      onClick={() => handleSelect("amenities", type)}
    >
      {type}
    </button>
  ))}
</div>


      <div>
        <label>Description</label>
        <textarea
          ref={textAreaRef}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onInput={handleTextChange}
        ></textarea>
      </div>

      <div>
        <label>Photo</label>
        <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} />
      </div>

      <div>
        <label>Vue 3D</label>
        <input type="file" accept=".obj,.gltf" multiple onChange={handleThreeDUpload} />
      </div>

      <button type="submit">Créer l'annonce</button>
    </form>
  );

};

export default RealEstateForm;

