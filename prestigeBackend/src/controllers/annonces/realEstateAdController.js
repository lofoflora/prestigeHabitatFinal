import { RealEstateAd } from "../../models/annonces/realEstateAd.js";

// Créer une nouvelle annonce immobilière (accessible par les sociétés immobilières)
export const createRealEstateAd = async (req, res) => {
  try {
    const ad = await RealEstateAd.create(req.body);
    res.status(201).json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'annonce immobilière.' });
  }
};

// Obtenir toutes les annonces immobilières
export const getAllRealEstateAds = async (req, res) => {
  try {
    const ads = await RealEstateAd.findAll();
    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des annonces immobilières.' });
  }
};

// Obtenir une annonce immobilière par son ID
export const getRealEstateAdById = async (req, res) => {
  const id = req.params.id;
  try {
    const ad = await RealEstateAd.findByPk(id);
    if (ad) {
      res.status(200).json(ad);
    } else {
      res.status(404).json({ message: 'Annonce immobilière non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'annonce immobilière.' });
  }
};

// Mettre à jour une annonce immobilière
export const updateRealEstateAd = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await RealEstateAd.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      res.status(200).json({ message: 'Annonce immobilière mise à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Annonce immobilière non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'annonce immobilière.' });
  }
};

// Supprimer une annonce immobilière
export const deleteRealEstateAd = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await RealEstateAd.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Annonce immobilière supprimée avec succès.' });
    } else {
      res.status(404).json({ message: 'Annonce immobilière non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'annonce immobilière.' });
  }
};
