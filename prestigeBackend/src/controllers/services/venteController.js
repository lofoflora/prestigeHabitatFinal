import { vente } from "../../models/services/vente.js";

// Créer une nouvelle entité "Vente"
export const createVente = async (req, res) => {
  try {
    const nouvelleVente = await vente.create(req.body);
    res.status(201).json(nouvelleVente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'entité "Vente".' });
  }
};

// Obtenir toutes les entités "Vente"
export const getAllVente = async (req, res) => {
  try {
    const ventes = await vente.findAll();
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
    const venteTrouvee = await vente.findByPk(id);
    if (venteTrouvee) {
      res.status(200).json(venteTrouvee);
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
    const deleted = await vente.destroy({
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
