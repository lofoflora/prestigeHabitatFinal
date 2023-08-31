import { Vendeur } from '../models/vendeur.model.js';

// Créer un nouveau vendeur
export const createVendeur = async (req, res) => {
  try {
    const vendeur = await Vendeur.create(req.body);
    res.status(201).json(vendeur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du vendeur.' });
  }
};

// Obtenir tous les vendeurs
export const getAllVendeurs = async (req, res) => {
  try {
    const vendeurs = await Vendeur.findAll();
    res.status(200).json(vendeurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des vendeurs.' });
  }
};

// Obtenir un vendeur par son ID
export const getVendeurById = async (req, res) => {
  const id = req.params.id;
  try {
    const vendeur = await Vendeur.findByPk(id);
    if (vendeur) {
      res.status(200).json(vendeur);
    } else {
      res.status(404).json({ message: 'Vendeur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du vendeur.' });
  }
};

// Mettre à jour un vendeur
export const updateVendeur = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Vendeur.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      res.status(200).json({ message: 'Vendeur mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Vendeur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du vendeur.' });
  }
};

// Supprimer un vendeur
export const deleteVendeur = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Vendeur.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Vendeur supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Vendeur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du vendeur.' });
  }
};
