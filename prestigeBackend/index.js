//index.js
import express from 'express';
import 'dotenv/config.js';
import { sequelize } from './src/configs/db.config.js';
import adComRouter from './src/routes/users/routeAdCom.js'; // Importez les autres fichiers de routes ici
import clientRouter from './src/routes/users/routeClient.js';
import partnerRouter from './src/routes/users/routePartner.js';
import venteRouter from './src/routes/etapes/routeVente.js';
import constructionRouter from './src/routes/etapes/routeConstruction.js';
import amoRouter from './src/routes/etapes/routeAmo.js';
import achatReventeRouter from './src/routes/etapes/routeAchatRevente.js';
import threeDViewRouter from './src/routes/annonces/routeThreeDView.js';
import realEstateAdRouter from './src/routes/annonces/routeRealEstateAd.js';
import imageRouter from './src/routes/annonces/routeImage.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// routes users
app.use('/adcom', adComRouter); // Utilisez les autres fichiers de routes de la même manière
app.use('/client',clientRouter);
app.use('/partner',partnerRouter);

// route étapes
app.use('/vente', venteRouter); 
app.use('/construction',constructionRouter);
app.use('/Amo',amoRouter);
app.use('/AchatRevente',achatReventeRouter)

// routes users
app.use('/Image', imageRouter); 
app.use('/realEstateAd',realEstateAdRouter);
app.use('/ThreeDView',threeDViewRouter);






const startServer = async () => {
  try {
    // Synchronisation avec la base de données
    await sequelize.sync();
    
    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors de la synchronisation avec la base de données :', error);
  }
};

startServer();
