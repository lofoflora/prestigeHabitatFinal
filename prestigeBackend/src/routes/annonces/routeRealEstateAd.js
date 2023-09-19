import express from 'express';
import { uploadImage, uploadThreeD } from '../../multerConfig.js'; // Assurez-vous d'importer correctement vos configurations Multer
import {
  createRealEstateAd,
  getAllRealEstateAd,
  getRealEstateAdById,
  updateRealEstate,
  deleteRealEstate,
} from '../../controllers/annonces/realEstateAdController.js'; // Assurez-vous d'importer correctement vos contrôleurs

const router = express.Router();

// Créer une annonce immobilière avec images et vues 3D
router.post('/', (req, res, next) => {
  console.log("Received request on POST /");
  next();
}, uploadImage.array('image'), createRealEstateAd);


// Obtenir toutes les annonces immobilières avec leurs images et vues 3D
router.get('/', getAllRealEstateAd);

// Obtenir une annonce immobilière par son ID avec ses images et vues 3D
router.get('/:id', getRealEstateAdById);

// Mettre à jour une annonce immobilière avec ses images et vues 3D
router.put('/:id', uploadImage.array('image', 5), uploadThreeD.array('threeDViews', 5), updateRealEstate);

// Supprimer une annonce immobilière avec ses images et vues 3D
router.delete('/:id', deleteRealEstate);

export default router;
