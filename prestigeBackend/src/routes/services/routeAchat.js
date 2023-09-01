import express from 'express';
import * as achatController from '../../controllers/services/achatController.js';

const achatRouter = express.Router();

// Créer un nouvel achat
achatRouter.post('/', achatController.createAchat);

// Obtenir tous les achats
achatRouter.get('/', achatController.getAllAchats);

// Obtenir un achat par son ID
achatRouter.get('/', achatController.getAchatById);

// Mettre à jour un achat
achatRouter.put('/', achatController.updateAchat);

// Supprimer un achat
achatRouter.delete('/', achatController.deleteAchat);

export default achatRouter;
