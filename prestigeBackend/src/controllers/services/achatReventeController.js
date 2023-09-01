import { AchatRevente } from "../../models/services/achatRevente.js";


// Créer un nouveau type "AchatRevente"
export const createAchatRevente = async (req, res) => {
  try {
    const type = await AchatRevente.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du type "AchatRevente".' });
  }
};

// Obtenir tous les types "AchatRevente"
export const getAllAchatRevente = async (req, res) => {
  try {
    const types = await AchatRevente.findAll();
    res.status(200).json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des types "AchatRevente".' });
  }
};

// Obtenir un type "AchatRevente" par son ID
export const getAchatReventeById = async (req, res) => {
  const id = req.params.id;
  try {
    const type = await AchatRevente.findByPk(id);
    if (type) {
      res.status(200).json(type);
    } else {
      res.status(404).json({ message: 'Type "AchatRevente" non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du type "AchatRevente".' });
  }
};

// Supprimer un type "AchatRevente"
export const deleteAchatRevente = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await AchatRevente.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Type "AchatRevente" supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Type "AchatRevente" non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du type "AchatRevente".' });
  }
};
