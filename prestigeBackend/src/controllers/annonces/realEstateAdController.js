import { RealEstateAd } from "../../models/annonces/RealEstateAd.js";


// Créer une annonce immobilière avec images et vues 3D



export const createRealEstateAd = async (req, res) => {
  console.log("Début de createRealEstateAd");

  let annonce = req.body;
  annonce.AdComId = req.authenticatedUser.userId;

  // Extraire les chemins des images et des vues 3D
  if (req.files['image']) {
    annonce.images = req.files['image'].map(file => file.filename);

  }
  console.log(req.files)
  if (req.files['threeDViews']) {
    annonce.threeDViews = req.files['threeDViews'].map(file => file.filename);
  }

  try {
    console.log("Annonce à insérer:", annonce);
    // Créer l'annonce
    const ad = await RealEstateAd.create(annonce);
    
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
    const ads = await RealEstateAd.findAll();

    const adsWithFilepaths = ads.map((ad) => {
      const adData = ad.toJSON();
      if (adData.images) {
        adData.images = adData.images.map((image) => {
          // Ajoute le chemin complet vers l'image
          return `/chemin/vers/ton/dossier/images/${image}`;
        });
      }
      if (adData.threeDViews) {
        adData.threeDViews = adData.threeDViews.map((view) => {
          // Ajoute le chemin complet vers la vue 3D
          return `/chemin/vers/ton/dossier/3D/${view}`;
        });
      }
      return adData;
    });

    res.status(200).json(adsWithFilepaths);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des annonces immobilières.' });
  }
};

// Obtenir une annonce immobilière par son ID avec ses images et vues 3D
export const getRealEstateAdById = async (req, res) => {
  const id = req.params.id;
  try {
    const ad = await RealEstateAd.findByPk(id);
    if (ad) {
      const adData = ad.toJSON();
      if (adData.images) {
        adData.images = adData.images.map((image) => {
          // Ajoute le chemin complet vers l'image
          return `/chemin/vers/ton/dossier/images/${image}`;
        });
      }
      if (adData.threeDViews) {
        adData.threeDViews = adData.threeDViews.map((view) => {
          // Ajoute le chemin complet vers la vue 3D
          return `/chemin/vers/ton/dossier/3D/${view}`;
        });
      }
      res.status(200).json(adData);
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
    res.status(200).json({ message: 'Annonce immobilière supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'annonce immobilière.' });
  }
};
