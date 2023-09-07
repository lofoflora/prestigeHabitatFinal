import express from 'express';
import { loginUser } from '../controllers/authController.js';  // Ajustez le chemin si nécessaire

const authrouter = express.Router();

authrouter.post('/', loginUser);

export default authrouter;
