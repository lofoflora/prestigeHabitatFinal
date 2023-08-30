import { AdCom } from '../models/adCom.js';

// Créer un nouvel utilisateur (admin ou commercial)
export const createAdCom = async (req, res) => {
  try {
    const { userType, ...adComData } = req.body;

    if (userType === 'commercial' || userType === 'admin') {
      const adCom = await AdCom.create(adComData);
      res.status(201).json(adCom);
    } else {
      res.status(400).json({ message: 'Type d\'utilisateur non valide.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
};

// Obtenir tous les utilisateurs (admin ou commercial)
export const getAllAdComs = async (req, res) => {
  try {
    const adComs = await AdCom.findAll();
    res.status(200).json(adComs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

// Obtenir un utilisateur par son ID (admin ou commercial)
export const getAdComById = async (req, res) => {
  const id = req.params.id;
  try {
    const adCom = await AdCom.findByPk(id);
    if (adCom) {
      res.status(200).json(adCom);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
};

// Mettre à jour un utilisateur (uniquement admin)
export const updateAdCom = async (req, res) => {
  const id = req.params.id;
  try {
    const userType = req.body.userType;

    if (userType !== 'admin') {
      return res.status(403).json({ message: 'Seuls les admins peuvent mettre à jour un utilisateur.' });
    }

    const [updated] = await AdCom.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
  }
};

// Supprimer un utilisateur (uniquement admin)
export const deleteAdCom = async (req, res) => {
  const id = req.params.id;
  try {
    const userType = req.body.userType;

    if (userType !== 'admin') {
      return res.status(403).json({ message: 'Seuls les admins peuvent supprimer un utilisateur.' });
    }

    const deleted = await AdCom.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
  }
};
