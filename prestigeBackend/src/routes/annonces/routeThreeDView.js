import express from 'express';
import { uploadThreeD } from '../../multerConfig.js';
import { createThreeDView, getAllThreeDViews, getThreeDViewById, deleteThreeDView } from '../../controllers/annonces/threeDViewController.js';

const threeDViewRouter = express.Router();

// Créer une nouvelle vue 3D pour une annonce immobilière
threeDViewRouter.post('/', uploadThreeD.array('threeDViews'), async (req, res) => {
    try {
      const uploadedFiles = req.files;
  
      // Boucle pour traiter chaque fichier uploadé
      for (const file of uploadedFiles) {
        const viewPath = `threeDViews/${file.filename}`;
  
        // Créer une nouvelle entrée dans la base de données
        const newView = {
          filename: viewPath,
          fileSize: file.size,
          format: file.mimetype,
        };
  
        await createThreeDView(newView); // Utilise ta fonction pour créer une nouvelle vue 3D
      }
  
      res.status(201).json({ message: 'Vues 3D créées avec succès' });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });


// Obtenir toutes les vues 3D
threeDViewRouter.get('/', getAllThreeDViews);

// Obtenir une vue 3D par son ID
threeDViewRouter.get('/:id', getThreeDViewById);

// Supprimer une vue 3D
threeDViewRouter.delete('/:id', deleteThreeDView);

export default threeDViewRouter;
