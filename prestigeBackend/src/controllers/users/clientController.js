import { Client } from "../../models/users/client.js";
import bcrypt from 'bcrypt';


// Créer un nouveau client (accessible par les clients et les admins)
export const createClient = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const client = await Client.create({
      ...req.body,
      password: hashedPassword
    });
    
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du client.' });
  }
};

// Obtenir tous les clients (accessible par les clients et les admins)
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des clients.' });
  }
};

// Obtenir un client par son ID (accessible par les clients et les admins)
export const getClientById = async (req, res) => {
  const id = req.params.id;
  try {
    const client = await Client.findByPk(id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du client.' });
  }
};

// Mettre à jour un client (accessible par les clients et les admins)
export const updateClient = async (req, res) => {
  const id = req.params.id;
  //console.log (id)
  try {
    const [updated] = await Client.update(req.body, {
      where: { id: id }
    });
  
    if (updated) {
      res.status(200).json({ message: 'Client mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du client.' });
  }
};

// Supprimer un client (accessible par les clients et les admins)
export const deleteClient = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Client.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Client supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du client.' });
  }
};
