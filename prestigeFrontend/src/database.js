// database.js
import mysql from 'mysql2';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prestigehabitat',
};

const db = mysql.createConnection(dbConfig);

// Vérifier la connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données', err.message);
    throw err;
  }
  console.log('Connexion à la base de données MySQL réussie.');
});

export default db;
