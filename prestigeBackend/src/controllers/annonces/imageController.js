import { Image } from '../models/image.js';

// Créer une nouvelle image pour une annonce immobilière
export const createImage = async (req, res) => {
  try {
    const image = await Image.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'image.' });
  }
};

// Obtenir toutes les images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des images.' });
  }
};

// Obtenir une image par son ID
export const getImageById = async (req, res) => {
  const id = req.params.id;
  try {
    const image = await Image.findByPk(id);
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: 'Image non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'image.' });
  }
};

// Supprimer une image
export const deleteImage = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Image.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Image supprimée avec succès.' });
    } else {
      res.status(404).json({ message: 'Image non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'image.' });
  }
};
