import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const RealEstateAdDetails = () => {
  const [ad, setAd] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

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

     
    </div>
  );
};

export default RealEstateAdDetails;
