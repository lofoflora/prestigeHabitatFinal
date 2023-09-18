import express from 'express';
import { getOperationsToValidate, validate, } from '../controllers/getOperationsToValidate.js';
const validationRouter = express.Router();

// Route pour obtenir le nombre d'opérations à valider
validationRouter.get('/', getOperationsToValidate);

// Route pour valider un partenaire
validationRouter.post('/', validate);

// Route pour valider une annonce immobilière


export default validationRouter;
