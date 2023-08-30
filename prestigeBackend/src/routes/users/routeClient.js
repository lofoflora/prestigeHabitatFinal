import express from 'express';
import { createClient, getAllClients, getClientById, updateClient, deleteClient } from '../controllers/clientController.js';

const clientRouter = express.Router();

// Créer un nouveau client (accessible par les clients et les admins)
clientRouter.post('/', createClient);

// Obtenir tous les clients (accessible par les clients et les admins)
clientRouter.get('/', getAllClients);

// Obtenir un client par son ID (accessible par les clients et les admins)
clientRouter.get('/:id', getClientById);

// Mettre à jour un client (accessible par les clients et les admins)
clientRouter.put('/:id', updateClient);

// Supprimer un client (accessible par les clients et les admins)
clientRouter.delete('/:id', deleteClient);

export default clientRouter;
