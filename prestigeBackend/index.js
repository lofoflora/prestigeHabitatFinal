//index.js
import express from 'express';
import 'dotenv/config.js';
import { sequelize } from './src/configs/db.config.js';
import adComRouter from './src/routes/users/routeAdCom.js'; // Importez les autres fichiers de routes ici

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Associez vos routes ici
app.use('/adcom', adComRouter); // Utilisez les autres fichiers de routes de la même manière

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
