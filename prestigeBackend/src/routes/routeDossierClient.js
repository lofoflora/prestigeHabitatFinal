import express from 'express';
import { createDossierClient, getAllDossiersClients, getDossierClientById, updateDossierClient, deleteDossierClient } from '../../controllers/dossierClientController.js';

const dossierClientRouter = express.Router();

// Créer un nouveau dossier client (accessible par les clients, partenaires et AdCom)
dossierClientRouter.post('/', createDossierClient);

// Obtenir tous les dossiers clients (accessible par les clients, partenaires et AdCom)
dossierClientRouter.get('/', getAllDossiersClients);

// Obtenir un dossier client par son ID (accessible par les clients, partenaires et AdCom)
dossierClientRouter.get('/:id', getDossierClientById);

// Mettre à jour un dossier client (accessible par les clients, partenaires et AdCom)
dossierClientRouter.put('/:id', updateDossierClient);

// Supprimer un dossier client (accessible par les clients, partenaires et AdCom)
dossierClientRouter.delete('/:id', deleteDossierClient);

export default dossierClientRouter;
