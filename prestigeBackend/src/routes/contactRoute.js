import express from 'express';
import { sendContactEmail,handleContactForm } from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter.post('/', sendContactEmail); // Route pour envoyer le mail de contact

contactRouter.post('/annonce', handleContactForm);


export default contactRouter;
