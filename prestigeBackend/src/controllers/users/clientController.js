import { Client } from "../../models/users/client.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto'; // Importez le module crypto pour générer le token
import transporter from "../../configs/configEmail.js";

// Créer un nouveau client (accessible par les clients et les admins)
export const createClient = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt); // Correction ici

    //console.log('Hashed Password:', hashedPassword);
    const token = crypto.randomBytes(20).toString('hex');
    // Créez le client avec le mot de passe haché
    const client = await Client.create({
      ...req.body,
      // password: hashedPassword,
      actif: false,
      identifcatetoken: token,
    });

    // Envoie un e-mail d'activation
    const mailOptions = {
      from: process.env.MAIL_APPLI,
      to: req.body.email,
      subject: 'Activation de ton compte',
      html: `
        <p>Bonjour ${req.body.title} ${req.body.lastName},</p>
        <p>Clique sur le lien suivant pour activer ton compte :</p>
        <a href=" http://localhost:5173/creation-password?token=${token}">Activer le compte</a>
      `,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'envoi de l\'e-mail d\'activation');
      } else {
        console.log('E-mail envoyé : ' + info.response);
        res.status(200).send('Compte créé. Vérifie ta boîte de réception pour activer ton compte.');
      }
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du client.' });
  }
};

// Obtenir tous les clients (accessible par les clients et les admins)
export const getAllClients = async (req, res) => {
  try {
    let clients;
    
    // Vérifier si l'utilisateur connecté est un commercial
    if (req.authenticatedUser ) {
      // Récupérer uniquement les clients associés à ce commercial
      clients = await Client.findAll({
        where: {
          AdComId: req.authenticatedUser.userId // Ajuste cette clé pour correspondre à ta structure de base de données
        }
      });
    } else {
      // Si l'utilisateur est un admin ou un autre type d'utilisateur, récupérer tous les clients
      clients = await Client.findAll();
    }
    console.log('User ID:', req.authenticatedUser.userId);
    console.log('User Type:', req.authenticatedUser.userType);
    
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des clients.' });
  }
};



// Obtenir un client par son ID (accessible par les clients et les admins)
export const getClientById = async (req, res) => {
  const id = req.params.id;
  try {
    const client = await Client.findByPk(id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du client.' });
  }
};

// Mettre à jour un client (accessible par les clients et les admins)
export const updateClient = async (req, res) => {
  const id = req.params.id;
  console.log (id)
  try {
    const [updated] = await Client.update(req.body, {
      where: { id: id }
    });
  
    if (updated) {
      res.status(200).json({ message: 'Client mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du client.' });
  }
};

// Supprimer un client (accessible par les clients et les admins)
export const deleteClient = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Client.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Client supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Client non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du client.' });
  }
};
export const createPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Recherche de l'utilisateur par le token d'activation
    const client = await Client.findOne({ where: { identifcatetoken: token } });

    if (!client) {
      return res.status(400).send('Token d\'activation invalide ou expiré.');
    }

    // Met à jour le mot de passe et active le compte
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed Password:', hashedPassword);

    client.password = hashedPassword;
    client.actif = true;
    await client.save();

    res.status(200).send('Mot de passe créé avec succès. Votre compte est activé.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la création du mot de passe.');
  }
};