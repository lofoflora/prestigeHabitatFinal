import express from 'express';
import { createAvis, getAllAvis, getAvisById, updateAvis, deleteAvis } from '../../controllers/avisController.js';

const avisRouter = express.Router();

// Créer un nouvel avis (accessible par les clients et les partenaires)
avisRouter.post('/', createAvis);

// Obtenir tous les avis (accessible par les clients et les partenaires)
avisRouter.get('/', getAllAvis);

// Obtenir un avis par son ID (accessible par les clients et les partenaires)
avisRouter.get('/:id', getAvisById);

// Mettre à jour un avis (accessible par les clients et les partenaires)
avisRouter.put('/:id', updateAvis);

// Supprimer un avis (accessible par les clients et les partenaires)
avisRouter.delete('/:id', deleteAvis);

export default avisRouter;
