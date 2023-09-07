
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

    // Générez un token JWT
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.SECRET_KEY,  // Assure-toi que cela correspond à ce que tu as dans ton fichier .env
      { expiresIn: '1h' }
    );
    

    res.json({
      success: true,
      token,
      firstName: user.firstName,
      userType: user.userType
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};
