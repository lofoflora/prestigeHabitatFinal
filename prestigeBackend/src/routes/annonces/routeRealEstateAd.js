import express from 'express';
import {upload} from '../../multerConfig.js' // Assurez-vous d'importer correctement vos configurations Multer
import {
  createRealEstateAd,
  getAllRealEstateAd,
  getRealEstateAdById,
  updateRealEstate,
  deleteRealEstate,
  searchRealEstateAds,
} from '../../controllers/annonces/realEstateAdController.js'; // Assurez-vous d'importer correctement vos contrôleurs

const router = express.Router();

// Créer une annonce immobilière avec images et vues 3D
router.post('/', upload.fields([{name:'image'},{name:'threeDViews'}]),createRealEstateAd)

// Obtenir toutes les annonces immobilières avec leurs images et vues 3D
router.get('/', getAllRealEstateAd);

// obtenir les annonces en fonction des critéres 
router.get('/search', searchRealEstateAds);

// Obtenir une annonce immobilière par son ID avec ses images et vues 3D
router.get('/:id', getRealEstateAdById);

// Mettre à jour une annonce immobilière avec ses images et vues 3D
router.put('/', upload.fields([{name:'image'},{name:'threeDViews'}]),updateRealEstate)

// Supprimer une annonce immobilière avec ses images et vues 3D
router.delete('/:id', deleteRealEstate);


export default router;
