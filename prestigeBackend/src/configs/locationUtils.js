// locationUtils.js

import axios from 'axios';

export const getCoordinates = async (cityName) => {
  try {
    const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${cityName}&limit=1`);
    if (response.data && response.data.features && response.data.features.length > 0) {
      const coordinates = response.data.features[0].geometry.coordinates;
      return coordinates; // Retourne [longitude, latitude]
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées :", error);
    return null;
  }
};
