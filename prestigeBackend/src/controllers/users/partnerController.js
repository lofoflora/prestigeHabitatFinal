import { Partner } from "../../models/users/partner.js";



// Créer un nouveau partenaire (accessible par les partenaires et les admins)
export const createPartner = async (req, res) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du partenaire.' });
  }
};

// Obtenir tous les partenaires (accessible par les partenaires et les admins)
export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll();
    res.status(200).json(partners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des partenaires.' });
  }
};

// Obtenir un partenaire par son ID (accessible par les partenaires et les admins)
export const getPartnerById = async (req, res) => {
  const id = req.params.id;
  try {
    const partner = await Partner.findByPk(id);
    if (partner) {
      res.status(200).json(partner);
    } else {
      res.status(404).json({ message: 'Partenaire non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du partenaire.' });
  }
};

// Mettre à jour un partenaire (accessible par les partenaires et les admins)
export const updatePartner = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Partner.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      res.status(200).json({ message: 'Partenaire mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Partenaire non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du partenaire.' });
  }
};

// Supprimer un partenaire (accessible par les partenaires et les admins)
export const deletePartner = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Partner.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Partenaire supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Partenaire non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du partenaire.' });
  }
};
