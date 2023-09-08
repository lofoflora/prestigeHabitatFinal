import {Sequelize} from 'sequelize';

// connection à la base de données
console.log(process.env["db.url"])
export const sequelize = new Sequelize (process.env["db.url"]);

