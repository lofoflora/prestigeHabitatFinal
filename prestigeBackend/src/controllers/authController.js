
//authController.js
import { Client } from '../models/users/client.js';
import { AdCom } from '../models/users/adCom.js';
import { Partner } from '../models/users/partner.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
   

    // Recherchez l'utilisateur par e-mail parmi tous les types d'utilisateurs
    let user = await Client.findOne({ where: { email } }) ||
               await Partner.findOne({ where: { email } }) ||
               await AdCom.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'L\'email ou le mot de passe est incorrect.' });
    }

    // Vérifiez le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
   
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'L\'email ou le mot de passe est incorrect.' });
    }
// Détermine le type d'utilisateur
let userType;
if (await Client.findOne({ where: { email } })) {
  user = await Client.findOne({ where: { email } });
  userType = 'Client';
} else if (await Partner.findOne({ where: { email } })) {
  user = await Partner.findOne({ where: { email } });
  userType = 'Partner';
} else if (await AdCom.findOne({ where: { email } })) {
  user = await AdCom.findOne({ where: { email } });
  userType = 'AdCom';

  // Ajoute le rôle spécifique si c'est un AdCom
  userType = `AdCom-${user.role}`;  // Ce sera soit "AdCom-Admin" soit "AdCom-Commercial"
}
// ...

// Génère le token avec le type d'utilisateur
const token = jwt.sign(
  { userId: user.id, userType: userType },
  process.env.SECRET_KEY,
  { expiresIn: '1h' }
);

    

res.json({
  success: true,
  token,
  firstName: user.firstName,
  lastName: user.lastName,  // Ajoute ça
  title: user.title,  // Ajoute ça
  userType: user.userType
});
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};
