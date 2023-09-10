import express from 'express';
import cors from 'cors';
import axios from 'axios';  // Ajoute cette ligne
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();


// Le reste de ton code...


const app = express();

// Middleware pour CORS
app.use(cors({
    origin: 'http://localhost:5173',  // Remplace par l'URL de ton front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  }));
  

// Middleware pour les logs
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});



// Route pour obtenir un token depuis l'API INSEE
app.get('/api/getToken', async (req, res) => {
    try {
      const response = await axios.post('https://api.insee.fr/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${process.env["API_AUTH"]}`,
          
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
   

// Ton code pour la requête Axios ou autre

      res.json({ access_token: response.data.access_token });
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération du token' });
    }
  });
  

  
// Proxy pour l'API INSEE
app.use('/insee', createProxyMiddleware({
  target: 'https://api.insee.fr',
  changeOrigin: true,
  pathRewrite: {
    '^/insee': ''
  }
}));

// Proxy pour l'API adresse.data.gouv.fr
app.use('/adresse', createProxyMiddleware({
  target: 'https://api-adresse.data.gouv.fr',
  changeOrigin: true,
  pathRewrite: {
    '^/adresse': ''
  }
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Valeur de API_AUTH:", (process.env["API_AUTH"]));
  //console.log(process.env);
});
