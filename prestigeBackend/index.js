import 'dotenv/config.js'
import { sequelize } from './src/configs/db.config.js';


// synchronisation avec la base de données
await sequelize.sync();
