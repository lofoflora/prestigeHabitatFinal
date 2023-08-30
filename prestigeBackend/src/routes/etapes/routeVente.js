// routeVente.js
import express from 'express';
import { createVente, getAllVente, getVenteById, deleteVente } from '../controllers/venteController.js';

const venteRouter = express.Router();

// Créer une nouvelle entité "Vente"
venteRouter.post('/', createVente);

// Obtenir toutes les entités "Vente"
venteRouter.get('/', getAllVente);

// Obtenir une entité "Vente" par son ID
venteRouter.get('/:id', getVenteById);

// Supprimer une entité "Vente"
venteRouter.delete('/:id', deleteVente);

export default venteRouter;