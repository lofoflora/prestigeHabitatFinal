import { Avis } from "../models/avis.js";


// Créer un nouvel avis (accessible par les clients et les partenaires)
export const createAvis = async (req, res) => {
  try {
    const avis = await Avis.create(req.body);
    res.status(201).json(avis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'avis.' });
  }
};

// Obtenir tous les avis (accessible par les clients et les partenaires)
export const getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.findAll();
    res.status(200).json(avis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des avis.' });
  }
};

// Obtenir un avis par son ID (accessible par les clients et les partenaires)
export const getAvisById = async (req, res) => {
  const id = req.params.id;
  try {
    const avis = await Avis.findByPk(id);
    if (avis) {
      res.status(200).json(avis);
    } else {
      res.status(404).json({ message: 'Avis non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'avis.' });
  }
};

// Mettre à jour un avis (accessible par les clients et les partenaires)
export const updateAvis = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Avis.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      res.status(200).json({ message: 'Avis mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Avis non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'avis.' });
  }
};

// Supprimer un avis (accessible par les clients et les partenaires)
export const deleteAvis = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Avis.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Avis supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Avis non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'avis.' });
  }
};
