//constructionController.js

import { construction } from "../../models/etapes/construction.js";


// Créer un nouveau type "Construction"
export const createConstruction = async (req, res) => {
  try {
    const type = await construction.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du type "Construction".' });
  }
};

// Obtenir tous les types "Construction"
export const getAllConstruction = async (req, res) => {
  try {
    const types = await Construction.findAll();
    res.status(200).json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des types "Construction".' });
  }
};

// Obtenir un type "Construction" par son ID
export const getConstructionById = async (req, res) => {
  const id = req.params.id;
  try {
    const type = await Construction.findByPk(id);
    if (type) {
      res.status(200).json(type);
    } else {
      res.status(404).json({ message: 'Type "Construction" non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du type "Construction".' });
  }
};

// Supprimer un type "Construction"
export const deleteConstruction = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Construction.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Type "Construction" supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Type "Construction" non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du type "Construction".' });
  }
};
