import transporter from "../configs/configEmail.js";// Remplace par le chemin vers ton fichier transporter
import { RealEstateAd } from "../models/annonces/RealEstateAd.js";
import { AdCom } from "../models/users/adCom.js";


export const sendContactEmail = async (req, res) => {
  const { nom, prenom, email, telephone, commentaire, contactPreference } = req.body;

  // Log pour vérifier les données reçues
  console.log(`Données reçues: ${JSON.stringify(req.body)}`);

  // Vérifie si toutes les informations sont présentes
  if (!nom || !prenom || !email || !telephone || !commentaire || !contactPreference) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Configuration du mail
  const mailOptions = {
    from: process.env.MAIL_APPLI, // Expéditeur
    to: 'lofoflora@gmail.com', // Destinataire
    subject: `Contact`, // Sujet
    text: `Nom : ${nom}\nPrénom : ${prenom}\nEmail : ${email}\nTéléphone : ${telephone}\nCommentaire : ${commentaire}\nPréférence de contact : ${contactPreference}` // Corps du mail
  };

  // Log pour vérifier la configuration du mail
  console.log(`Options du mail: ${JSON.stringify(mailOptions)}`);

  // Envoie le mail
  try {
    await transporter.sendMail(mailOptions);
    console.log('Mail envoyé avec succès'); // Log de succès
    res.status(200).json({ message: 'Mail envoyé avec succès.' });
  } catch (error) {
    console.log(`Erreur lors de l'envoi du mail: ${JSON.stringify(error)}`); // Log d'erreur
    res.status(500).json({ error: 'Erreur lors de l\'envoi du mail.' });
  }

};

export const handleContactForm = async (req, res) => {
  const { annonceId, nom, prenom, email, telephone, commentaire, contactPreference } = req.body;

  try {
    const annonce = await RealEstateAd.findByPk(annonceId);
    if (!annonce) {
      return res.status(404).send('Annonce non trouvée');
    }

    const adcomId = annonce.AdComId;
    const adcom = await AdCom.findByPk(adcomId); // Utilise le modèle Adcom pour trouver l'Adcom par son ID

    if (!adcom) {
      return res.status(404).send('Adcom non trouvé');
    }

    const adcomEmail = adcom.email; // Supposons que l'email est stocké dans la propriété 'email' du modèle Adcom

    const mailOptions = {
      from: process.env.MAIL_APPLI,
      to: adcomEmail,
      subject: `Nouvelle demande de contact pour l'annonce ${annonceId}`,
      text: `Nom: ${nom}
             Prénom: ${prenom}
             Email: ${email}
             Téléphone: ${telephone}
             Commentaire: ${commentaire}
             Préférence de contact: ${contactPreference}
             ID de l'annonce: ${annonceId}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Erreur lors de l\'envoi du mail');
      }
      console.log('Email envoyé: ' + info.response);
      res.status(200).send('Mail envoyé avec succès');
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Erreur serveur');
  }
};