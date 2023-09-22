import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RealEstateAdDetails = () => {
  const [ad, setAd] = useState(null);
  const { id } = useParams(); // Récupérer l'ID de l'URL
  
  useEffect(() => {
    // Remplacer par ton URL de l'API
    axios.get(`http://127.0.0.1:3000/realEstateAd/${id}`)
      .then(response => {
        setAd(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement de l\'annonce:', error);
      });
  }, [id]);

  if (!ad) {
    return <p>Chargement...</p>;
  }

  // Ici, tu pourrais utiliser le composant RealEstateAdComponent que je t'ai montré avant,
  // en passant `ad` comme props
  return (
    <div className="real-estate-ad">
    <h2>{ad.title || 'Titre non disponible'}</h2>
    <div className="ad-images">
      {ad.images && ad.images.length > 0 ? (
        ad.images.map((image, index) => (
          <img key={index} src={"http://127.0.0.1:3000/files/"+image} alt={`Image ${index + 1}`} />
        ))
      ) : (
        <p>Pas d'images disponibles</p>
      )}
    </div>
    <div className="ad-3d-views">
      {ad.threedviews && ad.threedviews.length > 0 ? (
        ad.threedviews.map((view, index) => (
          <img key={index} src={view} alt={`Vue 3D ${index + 1}`} />
        ))
      ) : (
        <p>Pas de vues 3D disponibles</p>
      )}
    </div>

    <div className="ad-details">
      <p>Ville: {ad.city || 'Non spécifié'}</p>
      <p>Type de propriété: {ad.propertyType || 'Non spécifié'}</p>
      <p>Type d'achat: {ad.purchaseType || 'Non spécifié'}</p>
      <p>Surface de la maison: {ad.houseSurface || 'Non spécifié'}</p>
      <p>Surface du terrain: {ad.landSurface || 'Non spécifié'}</p>
      <p>Nombre de pièces: {ad.numRooms || 'Non spécifié'}</p>
      <p>Nombre de chambres: {ad.numBedrooms || 'Non spécifié'}</p>
      <p>Nombre de WC: {ad.numWC || 'Non spécifié'}</p>
      <p>Nombre de salles de bain: {ad.numBathrooms || 'Non spécifié'}</p>
      <p>Budget: {ad.budget || 'Non spécifié'}</p>
      <p>Chauffage: {ad.heating ? JSON.stringify(ad.heating) : 'Non spécifié'}</p>
      <p>Équipements: {ad.amenities ? JSON.stringify(ad.amenities) : 'Non spécifié'}</p>
      <p>Description: {ad.description || 'Non spécifié'}</p>
    </div>
   
  </div>
  );
};

export default RealEstateAdDetails;
