// generateSecretKey.js
import crypto from 'crypto';

// Générer une clé secrète aléatoire en octets
const secretKeyBytes = crypto.randomBytes(32);

// Convertir les octets en une chaîne hexadécimale
const secretKey = secretKeyBytes.toString('hex');

console.log('Clé secrète générée :', secretKey);
