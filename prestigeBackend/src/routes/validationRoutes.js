import express from 'express';
import { getOperationsToValidate, validatePartner, validateRealEstateAd } from '../controllers/getOperationsToValidate.js';
const validationRouter = express.Router();

// Route pour obtenir le nombre d'opérations à valider
validationRouter.get('/', getOperationsToValidate);

// Route pour valider un partenaire
validationRouter.post('/', validatePartner);

// Route pour valider une annonce immobilière
validationRouter.post('/', validateRealEstateAd);

export default validationRouter;
