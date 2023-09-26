import transporter from "../configs/configEmail.js";// Remplace par le chemin vers ton fichier transporter
import { RealEstateAd } from "../models/annonces/RealEstateAd.js";
import { AdCom } from "../models/users/adCom.js";

// Fonction pour envoyer un mail de contact
export const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Vérifie si toutes les informations sont présentes
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Configuration du mail
  const mailOptions = {
    from: process.env.MAIL_APPLI, // Expéditeur
    to: 'lofoflora@gmail.com', // Destinataire
    subject: `Contact : ${subject}`, // Sujet
    text: `Nom : ${name}\nEmail : ${email}\nMessage : ${message}` // Corps du mail
  };

  // Envoie le mail
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mail envoyé avec succès.' });
  } catch (error) {
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