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
      attributes: ["id", "entreprise"],
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
      attributes: ["id", "title"],
    });

    console.log("Nombre de partenaires à valider :", numPartnersToValidate);
    console.log(
      "Nombre d'annonces immobilières à valider :",
      numRealEstateAdsToValidate
    );

    // Envoie la réponse au client
    res.json({
      numPartnersToValidate,
      partenairesAValider,
      numRealEstateAdsToValidate,
      annoncesAValider,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des opérations à valider :",
      error.message
    );
    next(error);
  }
};
export const validate = async (req, res, next) => {
  try {
    const { id, type } = req.body;
    if (type === "partner") {
      await Partner.update(
        { actif: true },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({ message: "Partenaire validé" });
    } else if (type === "realestatead") {
      await RealEstateAd.update(
        { actif: true },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({ message: "Annonce immobilière validée" });
    }
    else 
    res.sendStatus(400)
  } catch (error) {
    console.error("Erreur lors de la validation du partenaire:", error.message);
    next(error);
  }
};

