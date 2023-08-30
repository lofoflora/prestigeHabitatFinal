import express from 'express';
import { createThreeDView, getAllThreeDViews, getThreeDViewById, deleteThreeDView } from '../controllers/threeDViewController.js';

const threeDViewRouter = express.Router();

// Créer une nouvelle vue 3D pour une annonce immobilière
threeDViewRouter.post('/', createThreeDView);

// Obtenir toutes les vues 3D
threeDViewRouter.get('/', getAllThreeDViews);

// Obtenir une vue 3D par son ID
threeDViewRouter.get('/:id', getThreeDViewById);

// Supprimer une vue 3D
threeDViewRouter.delete('/:id', deleteThreeDView);

export default threeDViewRouter;
