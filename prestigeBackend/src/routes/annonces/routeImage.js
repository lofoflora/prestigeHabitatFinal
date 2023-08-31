import express from 'express';
import { createImage, getAllImages, getImageById, deleteImage } from '../../controllers/annonces/imageController.js';

const imageRouter = express.Router();

// Créer une nouvelle image pour une annonce immobilière
imageRouter.post('/', createImage);

// Obtenir toutes les images
imageRouter.get('/', getAllImages);

// Obtenir une image par son ID
imageRouter.get('/:id', getImageById);

// Supprimer une image
imageRouter.delete('/:id', deleteImage);

export default imageRouter;
