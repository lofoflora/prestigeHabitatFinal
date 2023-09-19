import { RealEstateAd } from "../../models/annonces/RealEstateAd.js";
import { Image } from "../../models/annonces/image.js";
import { ThreeDView } from "../../models/annonces/ThreeDView.js";

// Créer une annonce immobilière avec images et vues 3D


export const createRealEstateAd = async (req, res) => {
  console.log("Début de createRealEstateAd");

  // Les fichiers image devraient maintenant être dans req.files['photo']
  console.log("Fichiers photo :", req.files['photo']);

  // Les fichiers 3D devraient maintenant être dans req.files['threeDViews']
  console.log("Fichiers 3D :", req.files['threeDViews']);

  let annonce = req.body;
  annonce.AdComId = req.authenticatedUser.userId;

  try {
    // Créer l'annonce
    const ad = await RealEstateAd.create(annonce);

    // Créer les images associées à cette annonce
    if (req.files['photo']) {
      const images = req.files['photo'].map((file) => ({
        path: file.path,
        RealEstateAdId: ad.id
      }));
      await Image.bulkCreate(images);
    }

    // Créer les vues 3D associées à cette annonce
    if (req.files['threeDViews']) {
      const threeDViews = req.files['threeDViews'].map((file) => ({
        path: file.path,
        RealEstateAdId: ad.id
      }));
      await ThreeDView.bulkCreate(threeDViews);
    }

    res.status(201).json(ad);

  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }

  console.log("Fin de createRealEstateAd");
};


// Obtenir toutes les annonces immobilières avec leurs images et vues 3D
export const getAllRealEstateAd = async (req, res) => {
  try {
    const ads = await RealEstateAd.findAll({
      include: [
        { model: Image },
        { model: ThreeDView },
      ],
    });
    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des annonces immobilières.' });
  }
};

// Obtenir une annonce immobilière par son ID avec ses images et vues 3D
export const getRealEstateAdById = async (req, res) => {
  const id = req.params.id;
  try {
    const ad = await RealEstateAd.findByPk(id, {
      include: [
        { model: Image },
        { model: ThreeDView },
      ],
    });
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

// Mettre à jour une annonce immobilière avec ses images et vues 3D
export const updateRealEstate = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await RealEstateAd.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      // Supprimer les images associées à l'annonce
      await Image.destroy({ where: { RealEstateAdId: id } });

      // Supprimer les vues 3D associées à l'annonce
      await ThreeDView.destroy({ where: { RealEstateAdId: id } });

      // Gérer les images associées à l'annonce
      if (req.body.images && req.body.images.length > 0) {
        const images = req.body.images.map((image) => ({ ...image, RealEstateAdId: id }));
        await Image.bulkCreate(images);
      }

      // Gérer les vues 3D associées à l'annonce
      if (req.body.threeDViews && req.body.threeDViews.length > 0) {
        const threeDViews = req.body.threeDViews.map((view) => ({ ...view, RealEstateAdId: id }));
        await ThreeDView.bulkCreate(threeDViews);
      }

      res.status(200).json({ message: 'Annonce immobilière mise à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Annonce immobilière non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'annonce immobilière.' });
  }
};

// Supprimer une annonce immobilière avec ses images et vues 3D
export const deleteRealEstate = async (req, res) => {
  const id = req.params.id;
  try {
    // Supprimer l'annonce immobilière
    await RealEstateAd.destroy({ where: { id: id } });

    // Supprimer les images associées à l'annonce
    await Image.destroy({ where: { RealEstateAdId: id } });

    // Supprimer les vues 3D associées à l'annonce
    await ThreeDView.destroy({ where: { RealEstateAdId: id } });

    res.status(200).json({ message: 'Annonce immobilière et ses éléments associés supprimés avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'annonce immobilière.' });
  }
};
