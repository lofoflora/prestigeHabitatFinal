//dossier.Client.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/db.config.js";
import { Client } from "./users/client.js";
import { AdCom } from "./users/adCom.js";
import { Achat } from "./services/achat.js";
import { construction } from "./services/construction.js";
import { Partner } from "./users/partner.js";
import { AchatRevente } from "./services/achatRevente.js";
import { Amo } from "./services/amo.js";
import { vente } from "./services/vente.js";



export const DossierClient = sequelize.define("DossierClient", {

    service : {
        type : DataTypes.VIRTUAL,
        get(){
        console.log(this) 
        //   return [...this.achatReventes,...this.achats,...this.ventes,...this.amos,...this.constructions];
        return "ca va marcher "
         },
        // set(value) {
        //   throw new Error('Do not try to set the `fullName` value!');
        // }
      }
    
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
AchatRevente.belongsTo(DossierClient);

// Relation : Un dossier appartient à un type "AchatRevente"
DossierClient.hasMany(AchatRevente);

// Relation : Un type "Construction" a plusieurs dossiers
construction.belongsTo(DossierClient);

// Relation : Un dossier appartient à un type "Construction"
DossierClient.hasMany(construction);

// Relation : Un type "Amo" a plusieurs dossiers
Amo.belongsTo(DossierClient);

// Relation : Un dossier appartient à un type "Amo"
DossierClient.hasMany(Amo);

// Relation : Un type "achat" a plusieurs dossiers
Achat.belongsTo(DossierClient);

// Relation : Un dossier appartient à un type "achat"
DossierClient.hasMany(Achat);

// Relation : Un type "vente" a plusieurs dossiers
vente.belongsTo(DossierClient);

// Relation : Un dossier appartient à un type "vente"
DossierClient.hasMany(vente);