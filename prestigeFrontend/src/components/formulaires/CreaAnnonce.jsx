import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function RealEstateForm() {
  const [product, setProduct] = useState({
    title: '',
    streetNumber: '',
    streetName: '',
    addressComplement: '',
    postalCode: '',
    city: '',
    propertyType: [],
    purchaseType: [],
    houseSurface: '',
    landSurface: '',
    numRooms: '',
    numBedrooms: '',
    numWC: '',
    numBathrooms: '',
    budget: '',
    heating: [],
    amenities: [],
    description: '',
    actif: true,
    photos: [],
    threeDViews: [],
  });

  const [errors, setErrors] = useState({
    title: { touched: false, messages: '' },
    streetNumber: { touched: false, messages: '' },
    streetName: { touched: false, messages: '' },
    addressComplement: { touched: false, messages: '' },
    postalCode: { touched: false, messages: '' },
    city: { touched: false, messages: '' },
    houseSurface: { touched: false, messages: '' },
    landSurface: { touched: false, messages: '' },
    numRooms: { touched: false, messages: '' },
    numBedrooms: { touched: false, messages: '' },
    numWC: { touched: false, messages: '' },
    numBathrooms: { touched: false, messages: '' },
    budget: { touched: false, messages: '' },
    description: { touched: false, messages: '' },
    // Add validation states for other fields here
  });

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
    if (product.postalCode.length === 5) {
      fetchCityByPostalCode();
    } else {
      setCity('');
      // Réinitialiser la liste des villes
    }
  }, [product.postalCode]);

  const fetchCityByPostalCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/adresse/search/?q=${encodeURIComponent(product.postalCode)}`);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    validate({ ...product, [name]: value }, name);
  };
  

  const validate = (object, field) => {
    const newErrors = { ...errors };
    const fields = field ? [field] : Object.keys(object);
    for (let field of fields) {
      switch (field) {
        case 'title':
          newErrors.title.messages = '';
          // Add your validation rules for title here
          break;
        case 'streetNumber':
          newErrors.streetNumber.messages = '';
          // Add validation rules for streetNumber here
          break;
        // Add validation rules for other fields here
        default:
          break;
      }
    }
    setErrors(newErrors);
  };
  
  
  


  const isValid = () => {
    return Object.keys(errors)
      .map((key) => errors[key].messages)
      .every((value) => value === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate other fields here if needed
    if (isValid()) {
      // Prepare and send your data to the backend here
      try {
        const response = await axios.post('http://127.0.0.1:3000/realEstateAd', product, {
          headers: {
            'Content-Type': 'application/json', // Change to the appropriate content type
          },
        });
        console.log('Réponse du serveur:', response.data);
      } catch (error) {
        console.error("Erreur lors de la création de l'annonce:", error);
      }
    } else {
      console.log('Le formulaire contient des erreurs. Veuillez les corriger.');
    }
  };
  useEffect(() => {
    if (product.postalCode.length === 5) {
      fetchCityByPostalCode();
    } else {
      setCity('');
      // Réinitialiser la liste des villes
    }
  }, [product.postalCode]);


  


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
          <input type="text" value={product.streetNumber} onChange={e => setStreetNumber(e.target.value)} required />
        </label>
        <label>
          Voie/Rue/Chemin :
          <input type="text" value={product.streetName} onChange={e => setStreetName(e.target.value)} required />
        </label>
      </div>
      <label>
        Complément d'adresse :
        <input type="text" value={product.addressComplement} onChange={e => setAddressComplement(e.target.value)} />
      </label>
      <label>
        Code Postal :
        <input type="text" value={product.postalCode} onChange={e => setPostalCode(e.target.value)} required />
      </label>
      <label>
        Ville :
        <input type="text" value={product.city} readOnly />
      </label>


      <h5>Bien à vendre</h5>

      <label>Titre de l'annonce:</label>
<input type="text" value={product.title} onChange={(e) => setTitle(e.target.value)} required />

      {/* Type de propriété */}
      <label>Type de propriété :</label>
<div className="radio-group">
  {["Appartement", "Maison", "Studio", "Terrain", "Loft/atelier", "Chateau", "Local professionnel", "Commerce", "Garage/Hangar", "Autre"].map(type => (
    <label key={type}>
      <input
        type="radio"
        name="propertyType" // Utilisez le même nom pour tous les boutons de ce groupe
        value={product.type}
        checked={product.propertyType === type}
        onChange={handleChange}
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
        value={product.type}
        checked={product.purchaseType === type}
        onChange={ handleChange}
      />
      {type}
    </label>
  ))}
</div>



      {/* Surface de la maison */}
      <label>Surface de la maison:</label>
      <input type="text" value={product.houseSurface} onChange={(e) => setHouseSurface(e.target.value)} />

      {/* Surface du terrain */}
      <label>Surface du terrain:</label>
      <input type="text" value={product.landSurface} onChange={(e) => setLandSurface(e.target.value)} />

      {/* Nombre de pièces */}
      <label>Nombre de pièces:</label>
      <input type="number" value={product.numRooms} onChange={(e) => setNumRooms(e.target.value)} />

      {/* Nombre de chambres */}
      <label>Nombre de chambres:</label>
      <input type="number" value={product.numBedrooms} onChange={(e) => setNumBedrooms(e.target.value)} />

      {/* Nombre de WC */}
      <label>Nombre de WC:</label>
      <input type="number" value={product.numWC} onChange={(e) => setNumWC(e.target.value)} />

      {/* Nombre de salles de bain */}
      <label>Nombre de salles de bain:</label>
      <input type="number" value={product.numBathrooms} onChange={(e) => setNumBathrooms(e.target.value)} />

      {/* Budget */}
      <label>Budget:</label>
      <input type="text" value={product.budget} onChange={(e) => setBudget(e.target.value)} />

      {/* Chauffage */}
    {/* Chauffage */}
<label>Chauffage:</label>
<div className="checkbox-group">
  {["Electrique", "Gaz", "Fioul", "Bois", "Autre"].map(type => (
    <button
      key={type} // Ajoutez une clé unique ici
      type="button"
      className={product.heating.includes(type) ? "selected" : ""}
      onClick={handleChange}
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
      className={product.amenities.includes(type) ? "selected" : ""}
      onClick={handleChange}
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
          value={product.description}
          onChange={handleChange}
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

