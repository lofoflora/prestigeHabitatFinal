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
  
  

  const fetchCityByPostalCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/adresse/search/?q=${encodeURIComponent(product.postalCode)}`);
      if (response.data.features.length > 0) {
        const listeVilles = response.data.features.map(feature => feature.properties.city);
        const uniqueCity = [...new Set(listeVilles)];

        setProduct({
          ...product,
          city: (uniqueCity.length > 0 ? uniqueCity[0] : '')
         });
      } else {
        setProduct({
      ...product,
      city: ''
     });
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de la ville :', error.message);
      setProduct({
      ...product,
      city: ''
     });
    }
  };


  
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
      console.log("Avant la mise à jour de setProduct, product.image :", JSON.stringify(product.image));
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: Array.isArray(prevProduct.image) ? [...prevProduct.image, ...newSelectedimage] : [...newSelectedimage],
      }));
      console.log("Après la mise à jour de setProduct, product.image :", JSON.stringify(product.image));
      
      
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
 

  

  useEffect(() => {
    if (product.postalCode.length === 5) {
      fetchCityByPostalCode();
    } else {
      setProduct({
      ...product,
      city: ''
     });
      // Réinitialiser la liste des villes
    }
  }, [product.postalCode]);



  const handleSubmit = async (e) => {
  
    console.log("Début de handleSubmit"); 
    e.preventDefault();
    
    console.log(`Longueur de image: ${product.image.length}`);
    console.log(`Longueur de threeDViews: ${product.threeDViews.length}`);
    
    if (product.image.length === 0 && product.threeDViews.length === 0) {
      console.log("Erreur: Aucune image ou vue 3D n'est présente");
      return;
    }
    
    if (isValid()) {
      try {
        const formData = new FormData();
        console.log("FormData a été créé");
        
        for (const key in product) {
          if (key === 'image' || key === 'threeDViews') {
            console.log(`Ajout des fichiers pour ${key} à FormData`);
            
            product[key].forEach((file, index) => {
              console.log(`Ajout du fichier ${file.name} à ${key}[${index}]`);
              formData.append(key, file);
            });
          } else {
            formData.append(key, product[key]);
          }
        }
        console.log("FormData a été rempli");
        
        const authToken = localStorage.getItem('authToken');
        console.log(`Token récupéré: ${authToken}`);
        
        const config = {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        };
        console.log("Configuration des headers prête");
        
        const response = await axios.post('http://127.0.0.1:3000/realEstateAd', formData, config);
        
        console.log(`Réponse du serveur: ${response.data}`);
      } catch (error) {
        console.error(`Erreur lors de la création de l'annonce: ${error}`);
      }
    } else {
      console.log('Le formulaire contient des erreurs. Veuillez les corriger.');
    }
    
    console.log(`Longueur de product['image']: ${product['image'].length}`);
    console.log(`Longueur de product['threeDViews']: ${product['threeDViews'].length}`);
    
    console.log("Fin de handleSubmit");
  };
  
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
      <label>
        Code Postal :
        <input
          type="text"
          value={product.postalCode}
          onChange={(e) => setProduct({ ...product, postalCode: e.target.value })}
          required
        />
      </label>
      <label>
        Ville :
        <input type="text" value={product.city} readOnly />
      </label>

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
    <label key={type}>
      <input
        type="radio"
        name="propertyType" // Assurez-vous que le nom est correct
        value={type} // Utilisez la valeur du type ici
        checked={product.propertyType === type}
        onChange={handleSelect}
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
        name="purchaseType" // Assurez-vous que le nom est correct
        value={type} // Utilisez la valeur du type ici
        checked={product.purchaseType === type}
        onChange={handleSelect}
      />
      {type}
    </label>
  ))}
</div>


      {/* Surface de la maison */}
      <label>Surface de la maison:</label>
      <input
        type="text"
        value={product.houseSurface}
        onChange={(e) => setProduct({ ...product, houseSurface: e.target.value })}
      />

      {/* Surface du terrain */}
      <label>Surface du terrain:</label>
      <input
        type="text"
        value={product.landSurface}
        onChange={(e) => setProduct({ ...product, landSurface: e.target.value })}
      />

      {/* Nombre de pièces */}
      <label>Nombre de pièces:</label>
      <input
        type="number"
        value={product.numRooms}
        onChange={(e) => setProduct({ ...product, numRooms: e.target.value })}
      />

      {/* Nombre de chambres */}
      <label>Nombre de chambres:</label>
      <input
        type="number"
        value={product.numBedrooms}
        onChange={(e) => setProduct({ ...product, numBedrooms: e.target.value })}
      />

      {/* Nombre de WC */}
      <label>Nombre de WC:</label>
      <input
        type="number"
        value={product.numWC}
        onChange={(e) => setProduct({ ...product, numWC: e.target.value })}
      />

      {/* Nombre de salles de bain */}
      <label>Nombre de salles de bain:</label>
      <input
        type="number"
        value={product.numBathrooms}
        onChange={(e) => setProduct({ ...product, numBathrooms: e.target.value })}
      />

      {/* Budget */}
      <label>Budget:</label>
      <input
        type="text"
        value={product.budget}
        onChange={(e) => setProduct({ ...product, budget: e.target.value })}
      />

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
  );
}

export default RealEstateForm;