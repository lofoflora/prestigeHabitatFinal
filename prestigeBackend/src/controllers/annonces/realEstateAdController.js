import { RealEstateAd } from "../../models/annonces/RealEstateAd.js";
import { Op } from 'sequelize';
import axios from 'axios';
import { getCoordinates } from "../../configs/locationUtils.js";

// Créer une annonce immobilière avec images et vues 3D



export const createRealEstateAd = async (req, res) => {
  console.log("Début de createRealEstateAd");

  let annonce = req.body;
  annonce.AdComId = req.authenticatedUser.userId;

  // Extraire les chemins des images et des vues 3D
  if (req.files['image']) {
    annonce.images = req.files['image'].map(file => file.filename);

  }
  console.log(req.files)
  if (req.files['threeDViews']) {
    annonce.threeDViews = req.files['threeDViews'].map(file => file.filename);
  }
  // Ajouter les coordonnées géographiques ici
  const coordinates = await getCoordinates(annonce.city); // Supposons que getCoordinates est une fonction qui retourne un tableau [longitude, latitude]
  annonce.latitude = coordinates[1];
  annonce.longitude = coordinates[0];

  try {
    console.log("Annonce à insérer:", annonce);
    // Créer l'annonce
    const ad = await RealEstateAd.create(annonce);
    
    res.status(201).json(ad);

  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }

  console.log("Fin de createRealEstateAd");
};


export const getAllRealEstateAd = async (req, res) => {
  try {
    const ads = await RealEstateAd.findAll();

    const adsWithFilepaths = ads.map((ad) => {
      const adData = ad.toJSON();
      
      // Supprime les champs sensibles pour les utilisateurs non-admin et non-commerciaux
      if (req.role !== 'admin' && req.role !== 'commercial') {
        delete adData.streetNumber;
        delete adData.streetName;
        delete adData.adressComplement;
      }
      
   

      return adData;
    });

    res.status(200).json(adsWithFilepaths);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

export const getRealEstateAdById = async (req, res) => {
  const id = req.params.id;
  try {
    const ad = await RealEstateAd.findByPk(id);
    if (ad) {
      const adData = ad.toJSON();
      
      // Supprime les champs sensibles pour les utilisateurs non-admin et non-commerciaux
      if (req.role !== 'admin' && req.role !== 'commercial') {
        delete adData.streetNumber;
        delete adData.streetName;
        delete adData.adressComplement;
      }

     

      res.status(200).json(adData);
    } else {
      res.status(404).json({ message: 'Annonce non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};
// Mettre à jour une annonce immobilière avec ses images et vues 3D
export const updateRealEstate = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await RealEstateAd.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      res.status(200).json({ message: 'Annonce immobilière mise à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Annonce immobilière non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'annonce immobilière.' });
  }
};

// Supprimer une annonce immobilière avec ses images et vues 3D
export const deleteRealEstate = async (req, res) => {
  const id = req.params.id;
  try {
    // Supprimer l'annonce immobilière
    await RealEstateAd.destroy({ where: { id: id } });
    res.status(200).json({ message: 'Annonce immobilière supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'annonce immobilière.' });
  }
};
//contrôleur pour gérer les recherches
export const searchRealEstateAds = async (req, res) => {
  const {
    city,
    propertyType,
    purchaseType,
    numRooms,
    numBedrooms,
    numWC,
    numBathrooms,
    budgetMin,
    budgetMax,
    surfaceMin,
    surfaceMax,
    surfaceTerrainMax,
    surfaceTerrainMin,
    heating,
    amenities,
  } = req.query;

  let whereClause = {
    actif: true, 
  };

  if (city) whereClause.city = { [Op.like]: `%${city}%` };
  if (propertyType) whereClause.propertyType = propertyType;
  if (purchaseType) whereClause.purchaseType = purchaseType;
  if (numRooms) whereClause.numRooms = numRooms;
  if (numBedrooms) whereClause.numBedrooms = numBedrooms;
  if (numWC) whereClause.numWC = numWC;
  if (numBathrooms) whereClause.numBathrooms = numBathrooms;
  if (heating) whereClause.heating = { [Op.like]: `%${heating}%` };
  if (amenities) whereClause.amenities = { [Op.like]: `%${amenities}%` };

  if (budgetMin || budgetMax) whereClause.budget = {};
  if (budgetMin) whereClause.budget[Op.gte] = budgetMin;
  if (budgetMax) whereClause.budget[Op.lte] = budgetMax;

  if (surfaceTerrainMin || surfaceTerrainMax) whereClause.landSurface = {};
  if (surfaceTerrainMin) whereClause.landSurface[Op.gte] = surfaceTerrainMin;
  if (surfaceTerrainMax) whereClause.landSurface[Op.lte] = surfaceTerrainMax;

  if (surfaceMin || surfaceMax) whereClause.houseSurface = {};
  if (surfaceMin) whereClause.houseSurface[Op.gte] = surfaceMin;
  if (surfaceMax) whereClause.houseSurface[Op.lte] = surfaceMax;

  try {
    const ads = await RealEstateAd.findAll({
      attributes: ['id', 'title', 'city', 'propertyType', 'purchaseType', 'houseSurface', 'landSurface', 'numRooms',
       'numBedrooms', 'numWC', 'numBathrooms', 'budget', 'heating', 'amenities', 'streetNumber','streetName','adressComplement',
      'postalCode','latitude','longitude','images','threedviews','description'],
      where: whereClause,
    });
    res.status(200).json(ads);
  } catch (error) {
    console.error("Erreur lors de la recherche des annonces :", error);
    res.status(500).json({ message: "Une erreur est survenue lors de la recherche." });
  }
};

  