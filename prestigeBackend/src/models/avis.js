//avis.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";
import { Client } from "./users/client.js";


export const Avis = sequelize.define("Avis", {

  
    avis:DataTypes.STRING,
    date:DataTypes.STRING,
    

});

// Relation : Un client a plusieurs avis
Client.hasMany(Avis);

// Relation : Un avis appartient à un client
Avis.belongsTo(Client);
