import express from 'express';
import { uploadImage } from '../../multerConfig.js';
import { createImage, getAllImages, getImageById, deleteImage } from '../../controllers/annonces/imageController.js';

const imageRouter = express.Router();

// Créer une nouvelle image pour une annonce immobilière
imageRouter.post('/', uploadImage.array('photos'), async (req, res) => {


  try {
    const uploadedFiles = req.files;

    // Boucle pour traiter chaque fichier uploadé
    for (const file of uploadedFiles) {
      const imagePath = `uploads/${file.filename}`;
      const thumbnailPath = `uploads/thumbnails/${file.filename}`;

      // Créer une miniature
      await createThumbnail(imagePath, thumbnailPath);

      // Créer une nouvelle entrée dans la base de données
      const newImage = {
        filename: imagePath,
        thumbnailFilename: thumbnailPath,
        fileSize: file.size,
        format: file.mimetype,
      };

      await createImage(newImage); // Utilise ta fonction pour créer une nouvelle image
    }

    res.status(201).json({ message: 'Images créées avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
});

// Obtenir toutes les images
imageRouter.get('/', getAllImages);

// Obtenir une image par son ID
imageRouter.get('/:id', getImageById);

// Supprimer une image
imageRouter.delete('/:id', deleteImage);

export default imageRouter;
