import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function RealEstateForm() {

  const [product, setProduct] = useState({
    title: '',
    streetNumber: '',
    streetName: '',
    adressComplement: '',
    postalCode: '',
    city: '',
    propertyType: '',
    purchaseType: '',
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
    image: [],
    threeDViews: [],
  });

  const [errors, setErrors] = useState({
    title: { touched: false, messages: '' },
    streetNumber: { touched: false, messages: '' },
    streetName: { touched: false, messages: '' },
    adressComplement: { touched: false, messages: '' },
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

  const handleSelect = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  
  

  // Pour afficher la liste déroulante
  
  const [suggestions, setSuggestions] = useState([]);
 
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
  
    // Traitement pour une suggestion trouvée
    const matchedSuggestion = suggestions.find(sugg => 
      `${sugg.city} (${sugg.postalCode})` === value || sugg.postalCode === value
    );
    if (matchedSuggestion) {
      setProduct({
        ...product,
        city: matchedSuggestion.city,
        postalCode: matchedSuggestion.postalCode
      });
      setSuggestions([]);
      return;
    }
  
    // Pas de match, continue normalement
    setProduct({ ...product, [name]: value });
  
    if (value.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:5000/adresse/search/?q=${value}&type=municipality&additionalField=postalCode`);
        if (response.data.features.length > 0) {
          const listeVilles = response.data.features.map((feature) => ({
            city: feature.properties.city,
            postalCode: feature.properties.postcode
          }));
          setSuggestions(listeVilles);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Erreur lors de la recherche :', error.message);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };
  
  
  
  
  // useEffect(() => {
  //   if (product.postalCode.length === 5) {
  //     fetchCityByPostalCode();
  //   } else {
  //     setProduct({
  //     ...product,
  //     city: ''
  //    });
  //     // Réinitialiser la liste des villes
  //   }
  // }, [product.postalCode]);

  
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const handleImageUpload = (e) => {
    console.time("Temps d'exécution de handleImageUpload");
    const files = Array.from(e.target.files);

    // Créez un tableau pour stocker les miniatures redimensionnées et les fichiers sélectionnés
    const newimagePreviews = [];
    const newSelectedimage = [];

    // Pour chaque fichier sélectionné
    files.forEach((file) => {
      const uniqueId = Math.random(); // Génère un identifiant unique
      // Redimensionnez la image ici (remplacez width et height par les dimensions souhaitées)
      const maxWidth = 200; // Largeur maximale souhaitée
      const maxHeight = 200; // Hauteur maximale souhaitée
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Redimensionnez la image pour qu'elle rentre dans les dimensions maximales
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convertissez la miniature redimensionnée en URL
        const resizedPreviewURL = canvas.toDataURL('image/jpeg');

        // Ajoutez le fichier d'origine à la liste des image sélectionnées
        newSelectedimage.push(file);

        // Ajoutez l'URL de l'aperçu redimensionné à la liste des aperçus de image
        newimagePreviews.push(resizedPreviewURL);

        // Si vous avez terminé de traiter tous les fichiers, mettez à jour les états
        // Si vous avez terminé de traiter tous les fichiers, mettez à jour les états
    if (newimagePreviews.length === files.length) {
      // console.log("Avant la mise à jour de setProduct, product.image :", JSON.stringify(product.image));
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: Array.isArray(prevProduct.image) ? [...prevProduct.image, ...newSelectedimage] : [...newSelectedimage],
      }));
      // console.log("Après la mise à jour de setProduct, product.image :", JSON.stringify(product.image));
      
      
      setImagePreviews((previmagePreviews) => [...previmagePreviews, ...newimagePreviews]); // Mettez à jour les miniatures
    }
    console.timeEnd("Temps d'exécution de handleImageUpload");

};

      img.src = URL.createObjectURL(file);
    });
  };
  const handleRemoveImage = (index) => {
    // Copiez les tableaux d'images et de miniatures existants
    const updatedimage = [...product.image];
    const updatedPreviews = [...imagePreviews];
  
    // Supprimez la image sélectionnée et sa miniature en fonction de l'index
    updatedimage.splice(index, 1);
    updatedPreviews.splice(index, 1);
  
    // Mettez à jour les états avec les tableaux mis à jour
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: updatedimage,
    }));
    setImagePreviews(updatedPreviews);
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
  
    // Ajoutez cette partie pour mettre à jour la description
    if (name === 'description') {
      setProduct({
        ...product,
        description: value,
      });
    }
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
  
  const toggleHeating = (type) => {
    if (product.heating.includes(type)) {
      setProduct({
        ...product,
        heating: product.heating.filter((item) => item !== type),
      });
    } else {
      setProduct({
        ...product,
        heating: [...product.heating, type],
      });
    }
  };
  
  const toggleAmenity = (type) => {
    if (product.amenities.includes(type)) {
      setProduct({
        ...product,
        amenities: product.amenities.filter((item) => item !== type),
      });
    } else {
      setProduct({
        ...product,
        amenities: [...product.amenities, type],
      });
    }
  };
  


  const isValid = () => {
    return Object.keys(errors)
      .map((key) => errors[key].messages)
      .every((value) => value === '');
  };
 

  

 


  const handleSubmit = async (e) => {
  
    // console.log("Début de handleSubmit"); 
    e.preventDefault();
    
     //console.log(`Longueur de image: ${product.image.length}`);
    // console.log(`Longueur de threeDViews: ${product.threeDViews.length}`);
    
     if (product.image.length === 0 || product.threeDViews.length === 0) {
      //console.log("Attention: Aucune image ou vue 3D n'est présente");
      // Tu peux choisir de retourner ici ou de continuer le traitement
    }
    
    
    if (isValid()) {
      try {
        const formData = new FormData();
        //console.log("FormData a été créé");
        
        for (const key in product) {
          if (key === 'image' || key === 'threeDViews') {
             //console.log(`Ajout des fichiers pour ${key} à FormData`);
            
            product[key].forEach((file, index) => {
              //console.log(`Ajout du fichier ${file.name} à ${key}[${index}]`);
              formData.append(key, file);
            });
          } else {
            formData.append(key, product[key]);
          }
        }
       //console.log("FormData a été rempli");
        
        const authToken = localStorage.getItem('authToken');
        //console.log(`Token récupéré: ${authToken}`);
        
        const config = {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        };
        //console.log("Configuration des headers prête");
        
        const response = await axios.post('http://127.0.0.1:3000/realEstateAd', formData, config);
        //console.log("Statut de la réponse:", response.status);
        ///console.log("Type de response.status:", typeof response.status);

        if (response.status === 201) {
          window.alert("Annonce créée avec succès");
          window.location.reload();
        }
      // console.log(`Réponse du serveur: ${response.data}`);
      } catch (error) {
        //console.error(`Erreur lors de la création de l'annonce: ${error}`);
      }
    } else {
      //console.log('Le formulaire contient des erreurs. Veuillez les corriger.');
    }
    
    // console.log(`Longueur de product['image']: ${product['image'].length}`);
    //  console.log(`Longueur de product['threeDViews']: ${product['threeDViews'].length}`);
    
    // console.log("Fin de handleSubmit");
  };
  
  return (
    <div className="auth-form" style={{ backgroundColor: '#343a40', padding: '50px', borderRadius: '5px', position: 'relative',width: '50%' }}>
    <form onSubmit={handleSubmit} >
      <h1>Création d'annonce immobilière</h1>
      <br />
      <br />

      {/* Informations de base */}
      <h5>Adresse</h5>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>
          N° :
          <input
            type="text"
            value={product.streetNumber}
            onChange={(e) =>
              setProduct({ ...product, streetNumber: e.target.value })
            }
          />
        </label>
        <label>
          Voie/Rue/Chemin :
          <input
            type="text"
            value={product.streetName}
            onChange={(e) => setProduct({ ...product, streetName: e.target.value })}
            required
          />
        </label>
      </div>
      <label>
        Complément d'adresse :
        <input
          type="text"
          value={product.adressComplement}
          onChange={(e) => setProduct({ ...product, adressComplement: e.target.value })}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <label style={{ flex: 1, marginRight: '10px' }}>
    Code Postal :
    <input
      type="text"
      name="postalCode"
      value={product.postalCode}
      onChange={handleInputChange}
      required
      style={{ width: '80%' }}
    />
  </label>
  
  <label style={{ flex: 2 }}>
    Ville :
    <input
      type="text"
      name="city"
      value={product.city}
      onChange={handleInputChange}
      placeholder="Ville"
      list="cities"
      required
      style={{ width: '100%' }}
    />
  </label>
</div>

<datalist id="cities">
  {suggestions.map((suggestion, index) => (
    <option key={index} value={`${suggestion.city} (${suggestion.postalCode})`} />
  ))}
</datalist>


      {/* Bien à vendre */}
      <h5>Bien à vendre</h5>

      <label>Titre de l'annonce:</label>
      <input
        type="text"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        required
      />

  
{/* Type de propriété */}
<label>Type de propriété :</label>
<div className="radio-group">
  {["Appartement", "Maison", "Studio", "Terrain", "Loft/atelier", "Chateau", "Local professionnel", "Commerce", "Garage/Hangar", "Autre"].map(type => (
    <div key={type} >
      <label className={product.propertyType === type ? 'selected' : ''}>
        {type}
        <input
          type="radio"
          name="propertyType" // Assurez-vous que le nom est correct
          value={type} // Utilisez la valeur du type ici
          checked={product.propertyType === type}
          onChange={handleSelect}
        />
      </label>
    </div>
  ))}
</div>


<label>Type de vente :</label>
<div className="radio-group">
  {["Ancien", "Neuf", "Viager", "A rénover"].map(type => (
    <label key={type}>
      {type}
      <input
        type="radio"
        name="purchaseType" // Assurez-vous que le nom est correct
        value={type} // Utilisez la valeur du type ici
        checked={product.purchaseType === type}
        onChange={handleSelect}
      />
      
    </label>
  ))}
</div>

<div style={{ display: 'flex', justifyContent: 'space-start' }}>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <label>Surface de la maison:</label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={product.houseSurface}
        onChange={(e) => setProduct({ ...product, houseSurface: e.target.value })}
        style={{ marginRight: '5px', width: '70px' }}
      />
      <span>m²</span>
    </div>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <label>Surface du terrain:</label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={product.landSurface}
        onChange={(e) => setProduct({ ...product, landSurface: e.target.value })}
        style={{ marginRight: '5px', width: '70px' }}
      />
      <span>m²</span>
    </div>
  </div>

</div>

<div style={{ display: 'flex', justifyContent: 'space-start' }}>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <label>Nombre de pièces:</label>
    <input
      type="number"
      value={product.numRooms}
      onChange={(e) => setProduct({ ...product, numRooms: e.target.value })}
      style={{ width: '70px' }}
    />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <label>Nombre de chambres:</label>
    <input
      type="number"
      value={product.numBedrooms}
      onChange={(e) => setProduct({ ...product, numBedrooms: e.target.value })}
      style={{ width: '70px' }}
    />
  </div>

</div>



<div style={{ display: 'flex', alignItems: 'flex-start' }}>

  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px', alignItems: 'flex-start' }}>
    <label>Nombre de WC:</label>
    <input
      type="number"
      value={product.numWC}
      onChange={(e) => setProduct({ ...product, numWC: e.target.value })}
      style={{ width: '70px' }}
    />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <label>Nombre de salles de bain:</label>
    <input
      type="number"
      value={product.numBathrooms}
      onChange={(e) => setProduct({ ...product, numBathrooms: e.target.value })}
      style={{ width: '70px' }}
    />
  </div>

</div>

{/* Budget */}
<label>Budget:</label>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <input
    type="text"
    value={product.budget}
    onChange={(e) => setProduct({ ...product, budget: e.target.value })}
    style={{ width: '70px' }}
  />
  <span>€</span>
</div>

{/* Chauffage*/} 
<label>Chauffage:</label>
<div className="checkbox-group">
  {["Electrique", "Gaz", "Fioul", "Bois", "Autre"].map((type) => (
    <button
      key={type}
      type="button"
      className={product.heating.includes(type) ? "selected" : ""}
      onClick={() => toggleHeating(type)}
    >
      {type}
    </button>
  ))}
</div>

{/* Commodités*/}
<label>Commodités:</label>
<div className="checkbox-group">
  {[
    "Jardin",
    "Garage",
    "Piscine",
    "Ascenseur",
    "Balcon",
    "Cave",
    "Terrasse",
    "Pompe à chaleur",
    "Climatisation",
    "Panneaux solaires",
    "Autre",
  ].map((type) => (
    <button
      key={type}
      type="button"
      className={product.amenities.includes(type) ? "selected" : ""}
      onClick={() => toggleAmenity(type)}
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
    onChange={(e) => {
      setProduct({
        ...product,
        description: e.target.value,
      });
      handleTextChange(); // Met à jour la hauteur du champ de texte
    }}
    onInput={handleTextChange}
  ></textarea>
</div>

<div>
        <h2> image</h2>
       
        <input
          type="file"
          name="image[]"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>
      {imagePreviews.length > 0 && (
  <div>
    <div className="image-previews">

      {imagePreviews.map((previewURL, index) => (
        <div key={index} className="image-preview-container">
          <img
            src={previewURL}
            alt={`Aperçu ${index + 1}`}
            className="image-preview"
          />
          <button
            onClick={() => handleRemoveImage(index)}
            className="remove-image-button"
          >
            <span className="remove-icon">X</span>
          </button>
        </div>
      ))}
    </div>
  </div>
)}



      <div>
        <label>Vue 3D</label>
        <input
          type="file"
          accept=".obj,.gltf"
          multiple
          onChange={handleThreeDUpload}
        />
      </div>

      <button type="submit">Créer l'annonce</button>
    </form>
    </div>
  );
}

export default RealEstateForm;