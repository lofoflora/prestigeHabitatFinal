import { createClient } from "./clientController.js";
import { createPartner } from "./partnerController.js";

export const createUser = async (req, res) => {
    const type = req.body.type; // Supposons que "type" est le champ du formulaire qui détermine s'il s'agit d'un client ou d'un partenaire

    if (!type) {
        return res.status(400).json({ message: 'Le type d\'utilisateur n\'est pas spécifié.' });
    }

    try {
        if (type === 'client') {
            return createClient(req, res);
        } else if (type === 'partenaire') {
            return createPartner(req, res);
        } else {
            return res.status(400).json({ message: 'Type d\'utilisateur invalide.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
};
