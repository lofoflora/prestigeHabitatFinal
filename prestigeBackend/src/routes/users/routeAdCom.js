import express from 'express';
import { createAdCom, getAllAdComs, getAdComById, updateAdCom, deleteAdCom } from '../../controllers/users/adComController.js';

export const adComRouter = express.Router();

// Créer un nouvel utilisateur adCom (accessible uniquement par les administrateurs)
adComRouter.post('/', createAdCom);

// Obtenir tous les utilisateurs adCom (accessible par les utilisateurs commerciaux et les administrateurs)
adComRouter.get('/', getAllAdComs);

// Obtenir un utilisateur adCom par son ID (accessible par les utilisateurs commerciaux et les administrateurs)
adComRouter.get('/:id', getAdComById);

// Mettre à jour un utilisateur adCom (accessible uniquement par les administrateurs)
adComRouter.put('/:id', updateAdCom);

// Supprimer un utilisateur adCom (accessible uniquement par les administrateurs)
adComRouter.delete('/:id', deleteAdCom);

export default adComRouter;

