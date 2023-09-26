import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const RealEstateAdDetails = () => {
  const [ad, setAd] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
   
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    commentaire: '',
    contactPreference: ''
  });
  

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/realEstateAd/${id}`)
      .then(response => {
        setAd(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement de l\'annonce:', error);
      });
  }, [id]);

  const handleThumbnailClick = (image) => {
    setShowCarousel(true);
    setSelectedImage(image);
  };

  if (!ad) {
    return <p>Chargement...</p>;
  }

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Utilise l'ID de l'annonce depuis `id` si c'est ce que tu cherches
    const annonceId = id;  // ou utilise `annonces.find(annonce => annonce.id === idRecherché).id` si tu définis `annonces`
  
    // Vérifie si l'ID est bien récupéré
    if (!annonceId) {
      console.log('ID de l\'annonce non trouvé dans le localStorage');
      return;
    }
  
    // Ajoute l'ID de l'annonce à formData
    const completeFormData = { ...formData, annonceId };
    console.log("Données complètes du formulaire:", completeFormData);

    try {
      const response = await axios.post('http://localhost:3000/contact/annonce', completeFormData);
      if (response.status === 200) {
        console.log('Mail envoyé avec succès');
        // Ici, tu peux ajouter du code pour réinitialiser le formulaire ou naviguer vers une autre page, etc.
      }
    } catch (error) {
      console.log('Erreur lors de l\'envoi du mail', error);
      if (error.response) {
        // La requête a été effectuée et le serveur a répondu avec un code d'état
        // qui tombe en dehors de la plage de 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };
  

  return (
    <div className="real-estate-ad">
      <h2>{ad.title || 'Titre non disponible'}</h2>
      <div className="image-thumbnails">
          
          {ad.images && ad.images.length > 0 ? (
            ad.images.map((image, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:3000/files/${image}`}
                alt={`Image ${index + 1}`}
                onClick={() => handleThumbnailClick(image)}
              />
            ))
          ) : (
            <p>Pas d'images disponibles</p>
          )}
        </div>
      {showCarousel && (
        <div className="image-carousel">
          <img
            src={`http://127.0.0.1:3000/files/${selectedImage}`}
            alt="Selected"
          />
          <button onClick={() => setShowCarousel(false)}>Fermer</button>
        </div>
      )}
      <div className="ad-details">
        <div className="info-card">
          <h3>Informations</h3>
          <p>Ville: {ad.city || 'Non spécifié'}</p>
          <p>Type de propriété: {ad.propertyType || 'Non spécifié'}</p>
          <p>Type d'achat: {ad.purchaseType || 'Non spécifié'}</p>
          <p>Surface de la maison: {ad.houseSurface || 'Non spécifié'} m²</p>
          <p>Surface du terrain: {ad.landSurface || 'Non spécifié'} m²</p>
          <p>Nombre de pièces: {ad.numRooms || 'Non spécifié'}</p>
          <p>Nombre de chambres: {ad.numBedrooms || 'Non spécifié'}</p>
          <p>Nombre de WC: {ad.numWC || 'Non spécifié'}</p>
          <p>Nombre de salles de bain: {ad.numBathrooms || 'Non spécifié'}</p>
          <p>Budget: {ad.budget ? `${ad.budget} €` : 'Non spécifié'}</p>
          <p>Chauffage: {ad.heating || 'Non spécifié'}</p>
          <p>Équipements: {ad.amenities || 'Non spécifié'}</p>
          <p>Description: {ad.description || 'Non spécifié'}</p>
        </div>

       
      </div>
      <button onClick={toggleContactForm}>
  Intéressé par ce bien? Cliquez ici
</button>
{showContactForm && (
  <form onSubmit={handleSubmit}> 
    <label>Nom:</label>
    <input type="text" name="nom" onChange={handleChange} />
    
    <label>Prénom:</label>
    <input type="text" name="prenom" onChange={handleChange} />
    
    <label>Adresse Email:</label>
    <input type="email" name="email" onChange={handleChange} />
    
    <label>Téléphone:</label>
    <input type="tel" name="telephone" onChange={handleChange} />
    
    <label>Commentaire:</label>
    <textarea name="commentaire" onChange={handleChange}></textarea>
    
    <label>Préférence de contact:</label>
    <input type="radio" id="email" name="contactPreference" value="Email" onChange={handleChange} />
    <label htmlFor="email">Email</label>
    
    <input type="radio" id="telephone" name="contactPreference" value="Téléphone" onChange={handleChange} />
    <label htmlFor="telephone">Téléphone</label>
    
    <button type="submit">Envoyer</button>
  </form>
)}

     
    </div>
  );
};

export default RealEstateAdDetails;
