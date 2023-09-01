import express from 'express';
import { createConstruction, getAllConstruction, getConstructionById, deleteConstruction} from '../../controllers/services/constructionController.js';

const constructionRouter = express.Router();

// Créer un nouveau type "Construction"
constructionRouter.post('/', createConstruction);

// Obtenir tous les types "Construction"
constructionRouter.get('/', getAllConstruction);

// Obtenir un type "Construction" par son ID
constructionRouter.get('/:id', getConstructionById);

// Supprimer un type "Construction"
constructionRouter.delete('/:id', deleteConstruction);

export default constructionRouter;
