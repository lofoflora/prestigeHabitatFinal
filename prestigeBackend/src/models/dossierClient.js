import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Dossier = sequelize.define("Dossier", {

    docType : DataTypes.STRING,
    id : DataTypes.STRING,
});


// Relation : Un client a plusieurs dossiers
Client.hasMany(Dossier);

// Relation : Un dossier appartient à un client
Dossier.belongsTo(Client);

// Relation : Une société immobilière (AdCom) a plusieurs dossiers
AdCom.hasMany(Dossier);

// Relation : Un dossier appartient à une société immobilière (AdCom)
Dossier.belongsTo(AdCom);

// Relation : Un partenaire appartient à plusieurs dossiers et un dossier a plusieurs partenaires (relation plusieurs-à-plusieurs)
Partner.belongsToMany(Dossier, { through: 'PartenDossier' });
Dossier.belongsToMany(Partner, { through: 'PartenDossier' });

// Relation : Un type "AchatRevente" a plusieurs dossiers
AchatRevente.hasMany(Dossier);

// Relation : Un dossier appartient à un type "AchatRevente"
Dossier.belongsTo(AchatRevente);

// Relation : Un type "Construction" a plusieurs dossiers
Construction.hasMany(Dossier);

// Relation : Un dossier appartient à un type "Construction"
Dossier.belongsTo(Construction);

// Relation : Un type "Amo" a plusieurs dossiers
Amo.hasMany(Dossier);

// Relation : Un dossier appartient à un type "Amo"
Dossier.belongsTo(Amo);
