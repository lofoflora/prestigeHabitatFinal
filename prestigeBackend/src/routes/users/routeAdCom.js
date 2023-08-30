//routeAdCom.js
import express from 'express';
//import * as adComController from '../controllers/adComController.js';
import { createAdCom, getAllAdComs, getAdComById, updateAdCom, deleteAdCom } from '../controllers/users/adComController.js';

export const router = express.Router();

// Créer une nouvelle annonce commerciale (accessible uniquement par les admins)
router.post('/', createAdCom);

// Obtenir toutes les annonces commerciales (accessible par les commerciaux et les admins)
router.get('/', getAllAdComs);

// Obtenir une annonce commerciale par son ID (accessible par les commerciaux et les admins)
router.get('/:id', getAdComById);

// Mettre à jour une annonce commerciale (accessible uniquement par les admins)
router.put('/:id', updateAdCom);

// Supprimer une annonce commerciale (accessible uniquement par les admins)
router.delete('/:id', deleteAdCom);

export default router;
