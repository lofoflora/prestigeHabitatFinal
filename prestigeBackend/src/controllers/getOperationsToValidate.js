import { Partner } from "../models/users/partner.js";
import { RealEstateAd } from "../models/annonces/realEstateAd.js";

export const getOperationsToValidate = async (req, res, next) => {
  try {
    // Compte et récupère les partenaires inactifs (non validés)
    const numPartnersToValidate = await Partner.count({
      where: {
        actif: false,
      },
    });
    const partenairesAValider = await Partner.findAll({
      where: {
        actif: false,
      },
      attributes: ['id', 'entreprise'],
    });

    // Compte et récupère les annonces immobilières inactives (non validées)
    const numRealEstateAdsToValidate = await RealEstateAd.count({
      where: {
        actif: false,
      },
    });
    const annoncesAValider = await RealEstateAd.findAll({
      where: {
        actif: false,
      },
      attributes: ['id', 'title'],
    });

    console.log('Nombre de partenaires à valider :', numPartnersToValidate);
    console.log('Nombre d\'annonces immobilières à valider :', numRealEstateAdsToValidate);

    // Envoie la réponse au client
    res.json({
      numPartnersToValidate,
      partenairesAValider,
      numRealEstateAdsToValidate,
      annoncesAValider,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des opérations à valider :', error.message);
    next(error);
  }
};
export const validatePartner = async (req, res, next) => {
  try {
    const { id } = req.body;
    await Partner.update({ actif: true }, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Partenaire validé" });
  } catch (error) {
    console.error("Erreur lors de la validation du partenaire:", error.message);
    next(error);
  }
};

// Ajoute la méthode POST pour valider une annonce immobilière
export const validateRealEstateAd = async (req, res, next) => {
  console.log("Fonction validateRealEstateAd appelée");
  try {
    const { id } = req.body;
    await RealEstateAd.update({ actif: true }, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Annonce immobilière validée" });
  } catch (error) {
    console.error("Erreur lors de la validation de l'annonce immobilière:", error.message);
    next(error);
  }
};