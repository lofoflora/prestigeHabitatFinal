import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Dossier = sequelize.define("Dossier", {

    docType : DataTypes.STRING,
    id : DataTypes.STRING,
});


Client.hasMany(Dossier);
Dossier.belongsTo(Client);
AdCom.hasMany(Dossier);
Dossier.belongsTo(AdCom);
Partner.hasMany(Dossier);
Dossier.belongsTo(Partner);
AchatRevente.hasMany(Dossier);
Dossier.belongsTo(AchatRevente);
Construction.hasMany(Dossier);
Dossier.belongsTo(Construction);
Amo.hasMany(Dossier);
Dossier.belongsTo(Amo);