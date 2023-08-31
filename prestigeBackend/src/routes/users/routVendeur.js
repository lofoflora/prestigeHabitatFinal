import express from 'express';
import * as vendeurController from '../../controllers/vendeurController.js';

const router = express.Router();

// Créer un nouveau vendeur
router.post('/vendeurs', vendeurController.createVendeur);

// Obtenir tous les vendeurs
router.get('/vendeurs', vendeurController.getAllVendeurs);

// Obtenir un vendeur par son ID
router.get('/vendeurs/:id', vendeurController.getVendeurById);

// Mettre à jour un vendeur
router.put('/vendeurs/:id', vendeurController.updateVendeur);

// Supprimer un vendeur
router.delete('/vendeurs/:id', vendeurController.deleteVendeur);

export default router;
