import express from 'express';
import { createPartner, getAllPartners, getPartnerById, updatePartner, deletePartner } from '../../controllers/users/partnerController.js';

const partnerRouter = express.Router();

// Créer un nouveau partenaire (accessible par les partenaires et les admins)
partnerRouter.post('/', createPartner);

// Obtenir tous les partenaires (accessible par les partenaires et les admins)
partnerRouter.get('/', getAllPartners);

// Obtenir un partenaire par son ID (accessible par les partenaires et les admins)
partnerRouter.get('/:id', getPartnerById);

// Mettre à jour un partenaire (accessible par les partenaires et les admins)
partnerRouter.put('/:id', updatePartner);

// Supprimer un partenaire (accessible par les partenaires et les admins)
partnerRouter.delete('/:id', deletePartner);

export default partnerRouter;
