//index.js

import express from 'express';
import 'dotenv/config.js';
import { sequelize } from './src/configs/db.config.js';
import adComRouter from './src/routes/users/routeAdCom.js'; // Importez les autres fichiers de routes ici
import clientRouter from './src/routes/users/routeClient.js';
import partnerRouter from './src/routes/users/routePartner.js';
import venteRouter from './src/routes/services/routeVente.js';
import constructionRouter from './src/routes/services/routeConstruction.js';
import amoRouter from './src/routes/services/routeAmo.js';
import achatReventeRouter from './src/routes/services/routeAchatRevente.js';
import threeDViewRouter from './src/routes/annonces/routeThreeDView.js';
import realEstateAdRouter from './src/routes/annonces/routeRealEstateAd.js';
import imageRouter from './src/routes/annonces/routeImage.js';
import achatRouter from './src/routes/services/routeAchat.js';
import dossierClientRouter from './src/routes/routeDossierClient.js';
import avisRouter from './src/routes/routeAvis.js';
import createUserRouter from './src/routes/users/routeCreateUser.js';
import authrouter from './src/routes/authRoutes.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { AdCom } from './src/models/users/adCom.js'; // Ajuste le chemin d'import selon l'emplacement du fichier adCom.js



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Utilisez le middleware CORS
app.use(cors());

// routes users
app.use('/adcom', adComRouter); 
app.use('/partner',partnerRouter);
app.use('/client',clientRouter);
app.use('/createUser',createUserRouter)

// connection
app.use('/login',authrouter)

// route étapes
app.use('/vente', venteRouter); 
app.use('/achat', achatRouter);
app.use('/construction',constructionRouter);
app.use('/Amo',amoRouter);
app.use('/AchatRevente',achatReventeRouter)

// routes users
app.use('/Image', imageRouter); 
app.use('/realEstateAd',realEstateAdRouter);
app.use('/ThreeDView',threeDViewRouter);

app.use('/DossierClient',dossierClientRouter);
app.use('/Avis',avisRouter);






const createAdminIfNotExist = async () => {
  try {
    const admin = await AdCom.findOne({
      where: {
        userType: 'admin',
      },
    });

    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD, 10);
      await AdCom.create({
        userType: 'admin',
        title: 'Mr.',
        firstName: 'Anthony',
        lastName: 'Villa',
        email: 'lofoflora@gmail.com',
        phoneNumber: '0670508291',
        password: hashedPassword,
      });
      console.log('Admin créé avec succès.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'admin:', error);
  }
};

const startServer = async () => {
  try {
    await sequelize.sync({/*alter:true*/});
    await createAdminIfNotExist();  
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors de la synchronisation avec la base de données :', error);
  }
};

startServer();