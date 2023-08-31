import express from 'express';
import * as achatController from '../../controllers/achatController.js';

const router = express.Router();

// Créer un nouvel achat
router.post('/achats', achatController.createAchat);

// Obtenir tous les achats
router.get('/achats', achatController.getAllAchats);

// Obtenir un achat par son ID
router.get('/achats/:id', achatController.getAchatById);

// Mettre à jour un achat
router.put('/achats/:id', achatController.updateAchat);

// Supprimer un achat
router.delete('/achats/:id', achatController.deleteAchat);

export default router;
