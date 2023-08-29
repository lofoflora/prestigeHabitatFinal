
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";


export const Avis = sequelize.define("Avis", {

    id:DataTypes.STRING,
    avis:DataTypes.STRING,
    date:DataTypes.STRING,
    

});

Client.hasMany(Avis);
Avis.belongsTo(Client);