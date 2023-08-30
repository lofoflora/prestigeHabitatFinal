import { Amo } from '../models/amo.js';

// Créer un nouveau type "Amo"
export const createAmo = async (req, res) => {
  try {
    const type = await Amo.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du type "Amo".' });
  }
};

// Obtenir tous les types "Amo"
export const getAllAmo = async (req, res) => {
  try {
    const types = await Amo.findAll();
    res.status(200).json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des types "Amo".' });
  }
};

// Obtenir un type "Amo" par son ID
export const getAmoById = async (req, res) => {
  const id = req.params.id;
  try {
    const type = await Amo.findByPk(id);
    if (type) {
      res.status(200).json(type);
    } else {
      res.status(404).json({ message: 'Type "Amo" non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du type "Amo".' });
  }
};

// Supprimer un type "Amo"
export const deleteAmo = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Amo.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Type "Amo" supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Type "Amo" non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du type "Amo".' });
  }
};
