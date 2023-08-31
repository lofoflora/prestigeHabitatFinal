import express from 'express';
import { createRealEstateAd, getAllRealEstateAds, getRealEstateAdById, updateRealEstateAd, deleteRealEstateAd } from '../../controllers/annonces/realEstateAdController.js';

const realEstateAdRouter = express.Router();

// Créer une nouvelle annonce immobilière (accessible par les sociétés immobilières)
realEstateAdRouter.post('/', createRealEstateAd);

// Obtenir toutes les annonces immobilières
realEstateAdRouter.get('/', getAllRealEstateAds);

// Obtenir une annonce immobilière par son ID
realEstateAdRouter.get('/:id', getRealEstateAdById);

// Mettre à jour une annonce immobilière
realEstateAdRouter.put('/:id', updateRealEstateAd);

// Supprimer une annonce immobilière
realEstateAdRouter.delete('/:id', deleteRealEstateAd);

export default realEstateAdRouter;
