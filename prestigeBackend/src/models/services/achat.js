import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Achat = sequelize.define("Achat", {

  nomDuProjet: DataTypes.STRING,
  
    // Étape 1: Définition Projet
    definitionProjetStartDate: DataTypes.DATE,
    definitionProjetStatus: DataTypes.STRING,
    definitionProjetContact: DataTypes.STRING,
    definitionProjetDateRdv: DataTypes.DATE,
    definitionProjetLieuRdv: DataTypes.STRING,
    definitionProjetEndDate: DataTypes.DATE,
  
    // Étape 2: Recherche
    rechercheStartDate: DataTypes.DATE,
    rechercheStatus: DataTypes.STRING,
    rechercheContact: DataTypes.STRING,
    rechercheDateRdv: DataTypes.DATE,
    rechercheLieuRdv: DataTypes.STRING,
    rechercheEndDate: DataTypes.DATE,
  
    // Étape 3: Visite
    visiteStartDate: DataTypes.DATE,
    visiteStatus: DataTypes.STRING,
    visiteContact: DataTypes.STRING,
    visiteDateRdv: DataTypes.DATE,
    visiteLieuRdv: DataTypes.STRING,
    visiteEndDate: DataTypes.DATE,
  
    // Étape 4: Offre d'achat
    offreAchatStartDate: DataTypes.DATE,
    offreAchatStatus: DataTypes.STRING,
    offreAchatContact: DataTypes.STRING,
    offreAchatDateRdv: DataTypes.DATE,
    offreAchatLieuRdv: DataTypes.STRING,
    offreAchatEndDate: DataTypes.DATE,
  
    // Étape 5: Contre signature offre d'achat
    contreSignatureOffreAchatStartDate: DataTypes.DATE,
    contreSignatureOffreAchatStatus: DataTypes.STRING,
    contreSignatureOffreAchatContact: DataTypes.STRING,
    contreSignatureOffreAchatDateRdv: DataTypes.DATE,
    contreSignatureOffreAchatLieuRdv: DataTypes.STRING,
    contreSignatureOffreAchatEndDate: DataTypes.DATE,
  
    // Étape 6: Compromis
    compromisStartDate: DataTypes.DATE,
    compromisStatus: DataTypes.STRING,
    compromisContact: DataTypes.STRING,
    compromisDateRdv: DataTypes.DATE,
    compromisLieuRdv: DataTypes.STRING,
    compromisEndDate: DataTypes.DATE,
  
    // Étape 7: Acte authentique
    acteAuthentiqueStartDate: DataTypes.DATE,
    acteAuthentiqueStatus: DataTypes.STRING,
    acteAuthentiqueContact: DataTypes.STRING,
    acteAuthentiqueDateRdv: DataTypes.DATE,
    acteAuthentiqueLieuRdv: DataTypes.STRING,
    acteAuthentiqueEndDate: DataTypes.DATE,
  
    // Étape 8: Remise des clés
    remiseClesStartDate: DataTypes.DATE,
    remiseClesStatus: DataTypes.STRING,
    remiseClesContact: DataTypes.STRING,
    remiseClesDateRdv: DataTypes.DATE,
    remiseClesLieuRdv: DataTypes.STRING,
    remiseClesEndDate: DataTypes.DATE,
  
    // Étape 9: Clôture dossier
    clotureDossierStartDate: DataTypes.DATE,
    clotureDossierStatus: DataTypes.STRING,
    clotureDossierContact: DataTypes.STRING,
    clotureDossierDateRdv: DataTypes.DATE,
    clotureDossierLieuRdv: DataTypes.STRING,
    clotureDossierEndDate: DataTypes.DATE,
  });
  