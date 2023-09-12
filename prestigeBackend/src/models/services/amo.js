import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Amo = sequelize.define("Amo", {

    nomDuProjet: DataTypes.STRING,

    // Étape "Définition du projet"
    definitionProjetStartDate: DataTypes.DATE,
    definitionProjetStatus: DataTypes.STRING,
    definitionProjetContact: DataTypes.STRING,
    definitionProjetDateRdv: DataTypes.DATE,
    definitionProjetLieuRdv: DataTypes.STRING,
    definitionProjetEndDate: DataTypes.DATE,
  
    // Étape "Recherche terrain"
    rechercheTerrainStartDate: DataTypes.DATE,
    rechercheTerrainStatus: DataTypes.STRING,
    rechercheTerrainContact: DataTypes.STRING,
    rechercheTerrainDateRdv: DataTypes.DATE,
    rechercheTerrainLieuRdv: DataTypes.STRING,
    rechercheTerrainEndDate: DataTypes.DATE,
  
    // Étape "Dessin des plans"
    dessinPlansStartDate: DataTypes.DATE,
    dessinPlansStatus: DataTypes.STRING,
    dessinPlansContact: DataTypes.STRING,
    dessinPlansDateRdv: DataTypes.DATE,
    dessinPlansLieuRdv: DataTypes.STRING,
    dessinPlansEndDate: DataTypes.DATE,
  
    // Étape "Préparation et dépôt de la demande de permis de construire"
    depotDemandePermisStartDate: DataTypes.DATE,
    depotDemandePermisStatus: DataTypes.STRING,
    depotDemandePermisContact: DataTypes.STRING,
    depotDemandePermisDateRdv: DataTypes.DATE,
    depotDemandePermisLieuRdv: DataTypes.STRING,
    depotDemandePermisEndDate: DataTypes.DATE,
  
    // Étape "Suivi PCMI + Pièces Complémentaires"
    suiviPCMIPiecesStartDate: DataTypes.DATE,
    suiviPCMIPiecesStatus: DataTypes.STRING,
    suiviPCMIPiecesContact: DataTypes.STRING,
    suiviPCMIPiecesDateRdv: DataTypes.DATE,
    suiviPCMIPiecesLieuRdv: DataTypes.STRING,
    suiviPCMIPiecesEndDate: DataTypes.DATE,
  
    // Étape "Obtention du PCMI"
    obtentionPCMStartDate: DataTypes.DATE,
    obtentionPCMStatus: DataTypes.STRING,
    obtentionPCMContact: DataTypes.STRING,
    obtentionPCMDateRdv: DataTypes.DATE,
    obtentionPCMLieuRdv: DataTypes.STRING,
    obtentionPCMEndDate: DataTypes.DATE,
  
    // Étape "Mise en relation avec entreprises de construction"
    miseRelationEntreprisesStartDate: DataTypes.DATE,
    miseRelationEntreprisesStatus: DataTypes.STRING,
    miseRelationEntreprisesContact: DataTypes.STRING,
    miseRelationEntreprisesDateRdv: DataTypes.DATE,
    miseRelationEntreprisesLieuRdv: DataTypes.STRING,
    miseRelationEntreprisesEndDate: DataTypes.DATE,
  
    // Étape "Suivi de l'avancement du projet"
    suiviAvancementStartDate: DataTypes.DATE,
    suiviAvancementStatus: DataTypes.STRING,
    suiviAvancementContact: DataTypes.STRING,
    suiviAvancementDateRdv: DataTypes.DATE,
    suiviAvancementLieuRdv: DataTypes.STRING,
    suiviAvancementEndDate: DataTypes.DATE,
  
    // Étape "Contrôle des coûts et du budget"
    controleCoutsBudgetStartDate: DataTypes.DATE,
    controleCoutsBudgetStatus: DataTypes.STRING,
    controleCoutsBudgetContact: DataTypes.STRING,
    controleCoutsBudgetDateRdv: DataTypes.DATE,
    controleCoutsBudgetLieuRdv: DataTypes.STRING,
    controleCoutsBudgetEndDate: DataTypes.DATE,
  
    // Étape "Clôture administrative et financière du projet"
    clotureAdminFinanciereStartDate: DataTypes.DATE,
    clotureAdminFinanciereStatus: DataTypes.STRING,
    clotureAdminFinanciereContact: DataTypes.STRING,
    clotureAdminFinanciereDateRdv: DataTypes.DATE,
    clotureAdminFinanciereLieuRdv: DataTypes.STRING,
    clotureAdminFinanciereEndDate: DataTypes.DATE,
  });
  