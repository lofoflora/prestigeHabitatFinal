import { ThreeDView } from '../models/threeDView.js';

// Créer une nouvelle vue 3D pour une annonce immobilière
export const createThreeDView = async (req, res) => {
  try {
    const view = await ThreeDView.create(req.body);
    res.status(201).json(view);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de la vue 3D.' });
  }
};

// Obtenir toutes les vues 3D
export const getAllThreeDViews = async (req, res) => {
  try {
    const views = await ThreeDView.findAll();
    res.status(200).json(views);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des vues 3D.' });
  }
};

// Obtenir une vue 3D par son ID
export const getThreeDViewById = async (req, res) => {
  const id = req.params.id;
  try {
    const view = await ThreeDView.findByPk(id);
    if (view) {
      res.status(200).json(view);
    } else {
      res.status(404).json({ message: 'Vue 3D non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la vue 3D.' });
  }
};

// Supprimer une vue 3D
export const deleteThreeDView = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await ThreeDView.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Vue 3D supprimée avec succès.' });
    } else {
      res.status(404).json({ message: 'Vue 3D non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la vue 3D.' });
  }
};
