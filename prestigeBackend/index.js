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

import realEstateAdRouter from './src/routes/annonces/routeRealEstateAd.js';

import achatRouter from './src/routes/services/routeAchat.js';
import dossierClientRouter from './src/routes/routeDossierClient.js';
import avisRouter from './src/routes/routeAvis.js';

import authrouter from './src/routes/authRoutes.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { AdCom } from './src/models/users/adCom.js'; // Ajuste le chemin d'import selon l'emplacement du fichier adCom.js
import { jwtMiddleware } from './src/middleware/tokenMiddleware.js';
import validationRouter from './src/routes/validationRoutes.js';
import carouselRoutes from './src/routes/annonces/carouselRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Utilisez le middleware CORS
app.use(cors());

app.use(jwtMiddleware);
// routes users
app.use('/adcom', adComRouter); 
app.use('/partner',partnerRouter);
app.use('/client',clientRouter);


// connection
app.use('/login',authrouter)

// route étapes
app.use('/vente', venteRouter); 
app.use('/achat', achatRouter);
app.use('/construction',constructionRouter);
app.use('/Amo',amoRouter);
app.use('/AchatRevente',achatReventeRouter)

// routes users

app.use('/realEstateAd',realEstateAdRouter);
app.use('/carousel', carouselRoutes);

app.use('/DossierClient',dossierClientRouter);
app.use('/Avis',avisRouter);
app.use('/validation',validationRouter);

app.use('/files', express.static(process.env["file-path"]));






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
        userType: (process.env.USER_TYPE),
        title: (process.env.USER_TITLE),
        firstName: (process.env.USER_FIRST_NAME),
        lastName: (process.env.USER_LAST_NAME),
        email: (process.env.USER_EMAIL),
        phoneNumber: (process.env.USER_PHONE_NUMBER),
        password: hashedPassword,
      });
      console.log('Admin créé avec succès.');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    }
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