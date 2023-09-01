import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const vente = sequelize.define("vente", {
  // Étape "Estimation du bien"
  estimationBienStartDate: DataTypes.DATE,
  estimationBienStatus: DataTypes.STRING,
  estimationBienContact: DataTypes.STRING,
  estimationBienDateRdv: DataTypes.DATE,
  estimationBienLieuRdv: DataTypes.STRING,
  estimationBienEndDate: DataTypes.DATE,

  // Étape "Dossier de présentation"
  dossierPresentationStartDate: DataTypes.DATE,
  dossierPresentationStatus: DataTypes.STRING,
  dossierPresentationContact: DataTypes.STRING,
  dossierPresentationDateRdv: DataTypes.DATE,
  dossierPresentationLieuRdv: DataTypes.STRING,
  dossierPresentationEndDate: DataTypes.DATE,

  // Étape "Préparation de la documentation pour l'achat"
  preparationDocumentationStartDate: DataTypes.DATE,
  preparationDocumentationStatus: DataTypes.STRING,
  preparationDocumentationContact: DataTypes.STRING,
  preparationDocumentationDateRdv: DataTypes.DATE,
  preparationDocumentationLieuRdv: DataTypes.STRING,
  preparationDocumentationEndDate: DataTypes.DATE,

  // Étape "Visites"
  visitesStartDate: DataTypes.DATE,
  visitesStatus: DataTypes.STRING,
  visitesContact: DataTypes.STRING,
  visitesDateRdv: DataTypes.DATE,
  visitesLieuRdv: DataTypes.STRING,
  visitesEndDate: DataTypes.DATE,

  // Étape "Intervention courtier partenaire si nécessaire"
  interventionCourtierStartDate: DataTypes.DATE,
  interventionCourtierStatus: DataTypes.STRING,
  interventionCourtierContact: DataTypes.STRING,
  interventionCourtierDateRdv: DataTypes.DATE,
  interventionCourtierLieuRdv: DataTypes.STRING,
  interventionCourtierEndDate: DataTypes.DATE,

  // Étape "Finalisation de l'achat et signature de l'acte de vente"
  finalisationAchatStartDate: DataTypes.DATE,
  finalisationAchatStatus: DataTypes.STRING,
  finalisationAchatContact: DataTypes.STRING,
  finalisationAchatDateRdv: DataTypes.DATE,
  finalisationAchatLieuRdv: DataTypes.STRING,
  finalisationAchatEndDate: DataTypes.DATE,

  // Étape "Clôture administrative et financière du projet"
  clotureAdminFinanciereStartDate: DataTypes.DATE,
  clotureAdminFinanciereStatus: DataTypes.STRING,
  clotureAdminFinanciereContact: DataTypes.STRING,
  clotureAdminFinanciereDateRdv: DataTypes.DATE,
  clotureAdminFinanciereLieuRdv: DataTypes.STRING,
  clotureAdminFinanciereEndDate: DataTypes.DATE,
});
