import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const AchatRevente = sequelize.define("AchatRevente", {
    // Étape 1: Définition Projet et rentabilité
    definitionProjetStartDate: DataTypes.DATE,
    definitionProjetStatus: DataTypes.STRING,
    definitionProjetContact: DataTypes.STRING,
    definitionProjetDateRdv: DataTypes.DATE,
    definitionProjetLieuRdv: DataTypes.STRING,
    definitionProjetEndDate: DataTypes.DATE,
  
    // Étape 2: Recherche et sélection de biens immobiliers à acheter
    rechercheSelectionStartDate: DataTypes.DATE,
    rechercheSelectionStatus: DataTypes.STRING,
    rechercheSelectionContact: DataTypes.STRING,
    rechercheSelectionDateRdv: DataTypes.DATE,
    rechercheSelectionLieuRdv: DataTypes.STRING,
    rechercheSelectionEndDate: DataTypes.DATE,
  
    // Étape 3: Visites des biens sélectionnés
    visitesBiensStartDate: DataTypes.DATE,
    visitesBiensStatus: DataTypes.STRING,
    visitesBiensContact: DataTypes.STRING,
    visitesBiensDateRdv: DataTypes.DATE,
    visitesBiensLieuRdv: DataTypes.STRING,
    visitesBiensEndDate: DataTypes.DATE,
  
    // Étape 4: Analyse de la rentabilité potentielle de chaque bien
    analyseRentabiliteStartDate: DataTypes.DATE,
    analyseRentabiliteStatus: DataTypes.STRING,
    analyseRentabiliteContact: DataTypes.STRING,
    analyseRentabiliteDateRdv: DataTypes.DATE,
    analyseRentabiliteLieuRdv: DataTypes.STRING,
    analyseRentabiliteEndDate: DataTypes.DATE,
  
    // Étape 5: Négociation du prix d'achat
    negociationPrixStartDate: DataTypes.DATE,
    negociationPrixStatus: DataTypes.STRING,
    negociationPrixContact: DataTypes.STRING,
    negociationPrixDateRdv: DataTypes.DATE,
    negociationPrixLieuRdv: DataTypes.STRING,
    negociationPrixEndDate: DataTypes.DATE,
  
    // Étape 6: Préparation de la documentation pour l'achat
    preparationDocumentationAchatStartDate: DataTypes.DATE,
    preparationDocumentationAchatStatus: DataTypes.STRING,
    preparationDocumentationAchatContact: DataTypes.STRING,
    preparationDocumentationAchatDateRdv: DataTypes.DATE,
    preparationDocumentationAchatLieuRdv: DataTypes.STRING,
    preparationDocumentationAchatEndDate: DataTypes.DATE,
  
    // Étape 7: Mise en relation courtier si nécessaire
    miseRelationCourtierStartDate: DataTypes.DATE,
    miseRelationCourtierStatus: DataTypes.STRING,
    miseRelationCourtierContact: DataTypes.STRING,
    miseRelationCourtierDateRdv: DataTypes.DATE,
    miseRelationCourtierLieuRdv: DataTypes.STRING,
    miseRelationCourtierEndDate: DataTypes.DATE,
  
    // Étape 8: Finalisation de l'achat et signature de l'acte de vente
    finalisationAchatSignatureActeStartDate: DataTypes.DATE,
    finalisationAchatSignatureActeStatus: DataTypes.STRING,
    finalisationAchatSignatureActeContact: DataTypes.STRING,
    finalisationAchatSignatureActeDateRdv: DataTypes.DATE,
    finalisationAchatSignatureActeLieuRdv: DataTypes.STRING,
    finalisationAchatSignatureActeEndDate: DataTypes.DATE,
  
    // Étape 9: Devis des travaux de rénovation ou d'amélioration
    devisTravauxRenovationStartDate: DataTypes.DATE,
    devisTravauxRenovationStatus: DataTypes.STRING,
    devisTravauxRenovationContact: DataTypes.STRING,
    devisTravauxRenovationDateRdv: DataTypes.DATE,
    devisTravauxRenovationLieuRdv: DataTypes.STRING,
    devisTravauxRenovationEndDate: DataTypes.DATE,
  
    // Étape 10: Coordination des travaux avec les entrepreneurs
    coordinationTravauxEntrepreneursStartDate: DataTypes.DATE,
    coordinationTravauxEntrepreneursStatus: DataTypes.STRING,
    coordinationTravauxEntrepreneursContact: DataTypes.STRING,
    coordinationTravauxEntrepreneursDateRdv: DataTypes.DATE,
    coordinationTravauxEntrepreneursLieuRdv: DataTypes.STRING,
    coordinationTravauxEntrepreneursEndDate: DataTypes.DATE,
  
    // Étape 11: Contrôle des coûts et des délais des travaux
    controleCoutsDelaisTravauxStartDate: DataTypes.DATE,
    controleCoutsDelaisTravauxStatus: DataTypes.STRING,
    controleCoutsDelaisTravauxContact: DataTypes.STRING,
    controleCoutsDelaisTravauxDateRdv: DataTypes.DATE,
    controleCoutsDelaisTravauxLieuRdv: DataTypes.STRING,
    controleCoutsDelaisTravauxEndDate: DataTypes.DATE,
  
    // Étape 12: Mise en relation avec entreprises pour les travaux
    miseRelationEntreprisesTravauxStartDate: DataTypes.DATE,
    miseRelationEntreprisesTravauxStatus: DataTypes.STRING,
    miseRelationEntreprisesTravauxContact: DataTypes.STRING,
    miseRelationEntreprisesTravauxDateRdv: DataTypes.DATE,
    miseRelationEntreprisesTravauxLieuRdv: DataTypes.STRING,
    miseRelationEntreprisesTravauxEndDate: DataTypes.DATE,
  
    // Étape 13: Évaluation de la valeur ajoutée par les travaux
    evaluationValeurAjouteeTravauxStartDate: DataTypes.DATE,
    evaluationValeurAjouteeTravauxStatus: DataTypes.STRING,
    evaluationValeurAjouteeTravauxContact: DataTypes.STRING,
    evaluationValeurAjouteeTravauxDateRdv: DataTypes.DATE,
    evaluationValeurAjouteeTravauxLieuRdv: DataTypes.STRING,
    evaluationValeurAjouteeTravauxEndDate: DataTypes.DATE,
  
    // Étape 14: Préparation de la propriété pour la revente
    preparationProprieteReventeStartDate: DataTypes.DATE,
    preparationProprieteReventeStatus: DataTypes.STRING,
    preparationProprieteReventeContact: DataTypes.STRING,
    preparationProprieteReventeDateRdv: DataTypes.DATE,
    preparationProprieteReventeLieuRdv: DataTypes.STRING,
    preparationProprieteReventeEndDate: DataTypes.DATE,
  
    // Étape 15: Marketing et mise en vente de la propriété
    marketingMiseEnVenteStartDate: DataTypes.DATE,
    marketingMiseEnVenteStatus: DataTypes.STRING,
    marketingMiseEnVenteContact: DataTypes.STRING,
    marketingMiseEnVenteDateRdv: DataTypes.DATE,
    marketingMiseEnVenteLieuRdv: DataTypes.STRING,
    marketingMiseEnVenteEndDate: DataTypes.DATE,
  
    // Étape 16: Négociation avec les acheteurs potentiels
    negociationAcheteursPotentielsStartDate: DataTypes.DATE,
    negociationAcheteursPotentielsStatus: DataTypes.STRING,
    negociationAcheteursPotentielsContact: DataTypes.STRING,
    negociationAcheteursPotentielsDateRdv: DataTypes.DATE,
    negociationAcheteursPotentielsLieuRdv: DataTypes.STRING,
    negociationAcheteursPotentielsEndDate: DataTypes.DATE,
  
    // Étape 17: Gestion du processus de vente
    gestionProcessusVenteStartDate: DataTypes.DATE,
    gestionProcessusVenteStatus: DataTypes.STRING,
    gestionProcessusVenteContact: DataTypes.STRING,
    gestionProcessusVenteDateRdv: DataTypes.DATE,
    gestionProcessusVenteLieuRdv: DataTypes.STRING,
    gestionProcessusVenteEndDate: DataTypes.DATE,
  
    // Étape 18: Signature de l'acte de vente avec l'acheteur
    signatureActeVenteStartDate: DataTypes.DATE,
    signatureActeVenteStatus: DataTypes.STRING,
    signatureActeVenteContact: DataTypes.STRING,
    signatureActeVenteDateRdv: DataTypes.DATE,
    signatureActeVenteLieuRdv: DataTypes.STRING,
    signatureActeVenteEndDate: DataTypes.DATE,
  
    // Étape 19: Clôture administrative et financière du projet
    clotureAdminFinanciereStartDate: DataTypes.DATE,
    clotureAdminFinanciereStatus: DataTypes.STRING,
    clotureAdminFinanciereContact: DataTypes.STRING,
    clotureAdminFinanciereDateRdv: DataTypes.DATE,
    clotureAdminFinanciereLieuRdv: DataTypes.STRING,
    clotureAdminFinanciereEndDate: DataTypes.DATE,
  });
  
