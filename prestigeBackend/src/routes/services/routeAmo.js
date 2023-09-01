import express from 'express';
import { createAmo, getAllAmo, getAmoById, deleteAmo } from '../../controllers/services/amoController.js';

const amoRouter = express.Router();

// Créer un nouveau type "Amo"
amoRouter.post('/', createAmo);

// Obtenir tous les types "Amo"
amoRouter.get('/', getAllAmo);

// Obtenir un type "Amo" par son ID
amoRouter.get('/:id', getAmoById);

// Supprimer un type "Amo"
amoRouter.delete('/:id', deleteAmo);

export default amoRouter;
