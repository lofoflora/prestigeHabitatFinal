//dossierClientController.js

import { DossierClient } from "../models/dossierClient.js";
import { Achat } from "../models/services/achat.js";
import { AchatRevente } from "../models/services/achatRevente.js";
import { Amo } from "../models/services/amo.js";
import { construction } from "../models/services/construction.js";
import { vente } from "../models/services/vente.js";





// Créer un nouveau dossier client (accessible par les clients, partenaires et AdCom)
export const createDossierClient = async (req, res) => {
  try {
    const dossierClient = await DossierClient.create(req.body);
    res.status(201).json(dossierClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du dossier client.' });
  }
};

// Obtenir tous les dossiers clients (accessible par les clients, partenaires et AdCom)
export const getAllDossiersClients = async (req, res) => {
  try {
    const dossiersClients = await DossierClient.findAll();
    console.log (dossiersClients)
    res.status(200).json(dossiersClients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des dossiers clients.' });
  }
};

// Obtenir un dossier client par son ID (accessible par les clients, partenaires et AdCom)
export const getDossierClientById = async (req, res) => {
  const id = req.params.id;
  try {
    const dossierClient = await DossierClient.findByPk(id);
    if (dossierClient) {
      res.status(200).json(dossierClient);
    } else {
      res.status(404).json({ message: 'Dossier client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du dossier client.' });
  }
};

// Mettre à jour un dossier client (accessible par les clients, partenaires et AdCom)
export const updateDossierClient = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await DossierClient.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      res.status(200).json({ message: 'Dossier client mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Dossier client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du dossier client.' });
  }
};

// Supprimer un dossier client (accessible par les clients, partenaires et AdCom)
export const deleteDossierClient = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await DossierClient.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Dossier client supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Dossier client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du dossier client.' });
  }
};



export const findServicesByDossierClientId = async (req, res, next) => {
  const DossierClientId = req.params.id;
  
  // Utilisez la méthode `findAll` du modèle DossierClient avec une inclusion pour récupérer les services associés
  const dossierClient = await DossierClient.findByPk(DossierClientId, {
    include: [Achat, construction, AchatRevente, Amo, vente]
  });

  // Vous avez maintenant le dossier client avec tous les services associés
  res.json([...dossierClient.Achats,...dossierClient.constructions,...dossierClient.AchatReventes,...dossierClient.Amos,...dossierClient.Amos]);
};
