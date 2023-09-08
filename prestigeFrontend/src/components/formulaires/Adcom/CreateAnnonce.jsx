import React, { useState } from 'react';
import axios from 'axios';

const CreateAdForm = () => {
  // Informations sur le vendeur
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Informations sur le bien
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [numBathrooms, setNumBathrooms] = useState('');
  const [surfaceArea, setSurfaceArea] = useState('');
  const [price, setPrice] = useState('');

  // Fichiers
  const [photos, setPhotos] = useState([]);
  const [view3D, setView3D] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('propertyType', propertyType);
    formData.append('location', location);
    formData.append('numRooms', numRooms);
    formData.append('numBathrooms', numBathrooms);
    formData.append('surfaceArea', surfaceArea);
    formData.append('price', price);

    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });

    formData.append('view3D', view3D);

    try {
      const response = await axios.post('/api/createAd', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
  
    if (files.length > 20) {
      alert('Tu ne peux pas télécharger plus de 20 photos.');
      return;
    }
  
    const photoFiles = [];
    const thumbnailFiles = [];
  
    files.forEach((file, index) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Redimensionne l'image pour créer une miniature
          const MAX_WIDTH = 100;
          const MAX_HEIGHT = 100;
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convertit le canvas en fichier et l'ajoute à thumbnailFiles
          canvas.toBlob((blob) => {
            const newFile = new File([blob], `thumbnail-${file.name}`, { type: 'image/jpeg', lastModified: Date.now() });
            thumbnailFiles.push(newFile);
  
            if (thumbnailFiles.length === files.length) {
              // Met à jour l'état lorsque toutes les miniatures sont prêtes
              setPhotos(photoFiles);
              // setThumbnails(thumbnailFiles); // Tu peux aussi sauvegarder les miniatures dans un autre état
            }
          }, 'image/jpeg');
        };
      };
  
      photoFiles.push(file);
      reader.readAsDataURL(file);
    });
  };
  

  const handle3DUpload = (e) => {
    const file = e.target.files[0];
    setView3D(file);
  };

  return (
    <div className="container">
      <h1>Créer une nouvelle annonce</h1>
      <form onSubmit={handleSubmit}>
        <h2>Informations sur le vendeur</h2>
        <label>Prénom: </label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <br />

        <label>Nom: </label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <br />

        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />

        <label>Téléphone: </label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <br />

        <h2>Informations sur le bien</h2>
        <label>Titre: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />

        <label>Description: </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />

        <label>Type de propriété: </label>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="appartement">Appartement</option>
          <option value="maison">Maison</option>
          {/* ... autres options */}
        </select>
        <br />

        <label>Localisation: </label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <br />

        <label>Nombre de pièces: </label>
        <input type="number" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} />
        <br />

        <label>Nombre de salles de bain: </label>
        <input type="number" value={numBathrooms} onChange={(e) => setNumBathrooms(e.target.value)} />
        <br />

        <label>Surface en m²: </label>
        <input type="number" value={surfaceArea} onChange={(e) => setSurfaceArea(e.target.value)} />
        <br />

        <label>Prix en €: </label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />

        <label>Photos: </label>
        <input type="file" multiple onChange={handlePhotoUpload} />
        <br />

        <label>Vue 3D: </label>
        <input type="file" onChange={handle3DUpload} />
        <br />

        <button type="submit">Créer l'annonce</button>
      </form>
    </div>
  );
};

export default CreateAdForm;
