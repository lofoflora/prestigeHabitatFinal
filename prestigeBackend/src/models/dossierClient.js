//dossier.Client.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const DossierClient = sequelize.define("DossierClient", {

    docType : DataTypes.STRING,
   
});


// Relation : Un client a plusieurs dossiers
Client.hasMany(DossierClient);

// Relation : Un dossier appartient à un client
DossierClient.belongsTo(Client);

// Relation : Une société immobilière (AdCom) a plusieurs dossiers
AdCom.hasMany(DossierClient);

// Relation : Un dossier appartient à une société immobilière (AdCom)
DossierClient.belongsTo(AdCom);

// Relation : Un partenaire appartient à plusieurs dossiers et un dossier a plusieurs partenaires (relation plusieurs-à-plusieurs)
Partner.belongsToMany(DossierClient, { through: 'PartenDossier' });
DossierClient.belongsToMany(Partner, { through: 'PartenDossier' });

// Relation : Un type "AchatRevente" a plusieurs dossiers
AchatRevente.hasMany(DossierClient);

// Relation : Un dossier appartient à un type "AchatRevente"
DossierClient.belongsTo(AchatRevente);

// Relation : Un type "Construction" a plusieurs dossiers
Construction.hasMany(DossierClient);

// Relation : Un dossier appartient à un type "Construction"
DossierClient.belongsTo(Construction);

// Relation : Un type "Amo" a plusieurs dossiers
Amo.hasMany(DossierClient);

// Relation : Un dossier appartient à un type "Amo"
DossierClient.belongsTo(Amo);
