import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const FRONTEND_URL = 'http://localhost:5173';
const PORT = process.env.PORT || 5000;

// Middleware pour CORS
app.use(cors({
    origin: FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

// Middleware pour les logs
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});
const apiToken = process.env.API_AUTH;
// Route pour obtenir un token depuis l'API INSEE
app.get('/api/getToken', async (req, res) => {
    try {
      const response = await axios.post('https://api.insee.fr/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${apiToken}`, // Utilisation de apiToken ici
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const access_token = response.data.access_token;
  
      // Une fois que tu as obtenu le token d'accès, tu peux le stocker en variable pour l'utiliser ultérieurement
      // Par exemple, ici je le stocke dans une variable "access_token" pour pouvoir l'utiliser dans le proxy
      res.json({ access_token });
    } catch (error) {
      console.error(`Erreur lors de la récupération du token: ${error.message}`);
      res.status(500).json({ error: 'Erreur lors de la récupération du token' });
    }
  });
  
  // Proxy pour l'API INSEE en utilisant le token d'accès
  app.use('/insee/siret/:siret', async (req, res) => {
    const siret = req.params.siret;
    const access_token = await getAccessToken(); // Fonction pour obtenir le token d'accès
  
    try {
      const response = await axios.get(`https://api.insee.fr/entreprises/sirene/V3/siret/${siret}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`, // Utilisation du token d'accès
          'Content-Type': 'application/json'
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error(`Erreur lors de la requête à l'API INSEE: ${error.message}`);
      res.status(500).json({ error: 'Erreur lors de la requête à l\'API INSEE' });
    }
  });
  
  // Fonction pour obtenir le token d'accès
  async function getAccessToken() {
    try {
      const response = await axios.get('http://localhost:5000/api/getToken', { withCredentials: true });
      return response.data.access_token;
    } catch (error) {
      console.error(`Erreur lors de la récupération du token d'accès: ${error.message}`);
      throw new Error('Erreur lors de la récupération du token d\'accès');
    }
  }
  

  

// Proxy pour l'API adresse.data.gouv.fr
app.use('/adresse', createProxyMiddleware({
  target: 'https://api-adresse.data.gouv.fr',
  changeOrigin: true,
  pathRewrite: {
    '^/adresse': ''
  }
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Valeur de API_AUTH: ${process.env["API_AUTH"]}`);
});

// sirap  37977982000016