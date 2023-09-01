import express from 'express';
import { createAchatRevente, getAllAchatRevente, getAchatReventeById, deleteAchatRevente } from '../../controllers/services/achatReventeController.js';

const achatReventeRouter = express.Router();

// Créer un nouveau type "AchatRevente"
achatReventeRouter.post('/', createAchatRevente);

// Obtenir tous les types "AchatRevente"
achatReventeRouter.get('/', getAllAchatRevente);

// Obtenir un type "AchatRevente" par son ID
achatReventeRouter.get('/:id', getAchatReventeById);

// Supprimer un type "AchatRevente"
achatReventeRouter.delete('/:id', deleteAchatRevente);

export default achatReventeRouter;
