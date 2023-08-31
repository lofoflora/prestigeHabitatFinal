import { vente } from "../../models/etapes/vente.js";


// Créer une nouvelle entité "Vente"
export const createVente = async (req, res) => {
  try {
    const vente = await vente.create(req.body);
    res.status(201).json(vente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'entité "Vente".' });
  }
};

// Obtenir toutes les entités "Vente"
export const getAllVente = async (req, res) => {
  try {
    const ventes = await Vente.findAll();
    res.status(200).json(ventes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des entités "Vente".' });
  }
};

// Obtenir une entité "Vente" par son ID
export const getVenteById = async (req, res) => {
  const id = req.params.id;
  try {
    const vente = await Vente.findByPk(id);
    if (vente) {
      res.status(200).json(vente);
    } else {
      res.status(404).json({ message: 'Entité "Vente" non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'entité "Vente".' });
  }
};

// Supprimer une entité "Vente"
export const deleteVente = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Vente.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Entité "Vente" supprimée avec succès.' });
    } else {
      res.status(404).json({ message: 'Entité "Vente" non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'entité "Vente".' });
  }
};
