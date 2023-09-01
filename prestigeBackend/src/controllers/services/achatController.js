import { Achat } from "../../models/services/achat.js";

// Créer un nouvel achat
export const createAchat = async (req, res) => {
  try {
    const achat = await Achat.create(req.body);
    res.status(201).json(achat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'achat.' });
  }
};

// Obtenir tous les achats
export const getAllAchats = async (req, res) => {
  try {
    const achats = await Achat.findAll();
    res.status(200).json(achats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des achats.' });
  }
};

// Obtenir un achat par son ID
export const getAchatById = async (req, res) => {
  const id = req.params.id;
  try {
    const achat = await Achat.findByPk(id);
    if (achat) {
      res.status(200).json(achat);
    } else {
      res.status(404).json({ message: 'Achat non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'achat.' });
  }
};

// Mettre à jour un achat
export const updateAchat = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Achat.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      res.status(200).json({ message: 'Achat mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Achat non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'achat.' });
  }
};

// Supprimer un achat
export const deleteAchat = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Achat.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Achat supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Achat non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'achat.' });
  }
};
