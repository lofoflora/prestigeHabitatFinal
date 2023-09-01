//construction.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const construction = sequelize.define("construction", {
 
    implantationChantierStatus: DataTypes.STRING,
    implantationChantierStartDate: DataTypes.DATE,
    implantationChantierEndDate: DataTypes.DATE,
    implantationChantierProvider: DataTypes.STRING,
  
    miseEnPlaceChantierStatus: DataTypes.STRING,
    miseEnPlaceChantierStartDate: DataTypes.DATE,
    miseEnPlaceChantierEndDate: DataTypes.DATE,
    miseEnPlaceChantierProvider: DataTypes.STRING,
  
    terrassementStatus: DataTypes.STRING,
    terrassementStartDate: DataTypes.DATE,
    terrassementEndDate: DataTypes.DATE,
    terrassementProvider: DataTypes.STRING,
  
    fondationsStatus: DataTypes.STRING,
    fondationsStartDate: DataTypes.DATE,
    fondationsEndDate: DataTypes.DATE,
    fondationsProvider: DataTypes.STRING,
  
    dalleRadierStatus: DataTypes.STRING,
    dalleRadierStartDate: DataTypes.DATE,
    dalleRadierEndDate: DataTypes.DATE,
    dalleRadierProvider: DataTypes.STRING,
    
    elevationMursStatus: DataTypes.STRING,
    elevationMursStartDate: DataTypes.DATE,
    elevationMursEndDate: DataTypes.DATE,
    elevationMursProvider: DataTypes.STRING,
    
    charpenteToitureStatus: DataTypes.STRING,
    charpenteToitureStartDate: DataTypes.DATE,
    charpenteToitureEndDate: DataTypes.DATE,
    charpenteToitureProvider: DataTypes.STRING,
    
    menuiseriesExterieuresStatus: DataTypes.STRING,
    menuiseriesExterieuresStartDate: DataTypes.DATE,
    menuiseriesExterieuresEndDate: DataTypes.DATE,
    menuiseriesExterieuresProvider: DataTypes.STRING,
    
    facadeStatus: DataTypes.STRING,
    facadeStartDate: DataTypes.DATE,
    facadeEndDate: DataTypes.DATE,
    facadeProvider: DataTypes.STRING,
    
    plomberieStatus: DataTypes.STRING,
    plomberieStartDate: DataTypes.DATE,
    plomberieEndDate: DataTypes.DATE,
    plomberieProvider: DataTypes.STRING,
    
    electriciteStatus: DataTypes.STRING,
    electriciteStartDate: DataTypes.DATE,
    electriciteEndDate: DataTypes.DATE,
    electriciteProvider: DataTypes.STRING,
    
    isolationStatus: DataTypes.STRING,
    isolationStartDate: DataTypes.DATE,
    isolationEndDate: DataTypes.DATE,
    isolationProvider: DataTypes.STRING,
    
    cloisonnementStatus: DataTypes.STRING,
    cloisonnementStartDate: DataTypes.DATE,
    cloisonnementEndDate: DataTypes.DATE,
    cloisonnementProvider: DataTypes.STRING,
    
    revetementsInterieursStatus: DataTypes.STRING,
    revetementsInterieursStartDate: DataTypes.DATE,
    revetementsInterieursEndDate: DataTypes.DATE,
    revetementsInterieursProvider: DataTypes.STRING,
    
    menuiseriesInterieuresStatus: DataTypes.STRING,
    menuiseriesInterieuresStartDate: DataTypes.DATE,
    menuiseriesInterieuresEndDate: DataTypes.DATE,
    menuiseriesInterieuresProvider: DataTypes.STRING,
    
    poseEscalierStatus: DataTypes.STRING,
    poseEscalierStartDate: DataTypes.DATE,
    poseEscalierEndDate: DataTypes.DATE,
    poseEscalierProvider: DataTypes.STRING,
    
    peintureFinitionsStatus: DataTypes.STRING,
    peintureFinitionsStartDate: DataTypes.DATE,
    peintureFinitionsEndDate: DataTypes.DATE,
    peintureFinitionsProvider: DataTypes.STRING,
    
    installationEquipementsStatus: DataTypes.STRING,
    installationEquipementsStartDate: DataTypes.DATE,
    installationEquipementsEndDate: DataTypes.DATE,
    installationEquipementsProvider: DataTypes.STRING,
    
    poseChauffageStatus: DataTypes.STRING,
    poseChauffageStartDate: DataTypes.DATE,
    poseChauffageEndDate: DataTypes.DATE,
    poseChauffageProvider: DataTypes.STRING,
    
    revetementExterieurStatus: DataTypes.STRING,
    revetementExterieurStartDate: DataTypes.DATE,
    revetementExterieurEndDate: DataTypes.DATE,
    revetementExterieurProvider: DataTypes.STRING,
    
    amenagementsOptionnelsStatus: DataTypes.STRING,
    amenagementsOptionnelsStartDate: DataTypes.DATE,
    amenagementsOptionnelsEndDate: DataTypes.DATE,
    amenagementsOptionnelsProvider: DataTypes.STRING,
    
    amenagementsExterieursStatus: DataTypes.STRING,
    amenagementsExterieursStartDate: DataTypes.DATE,
    amenagementsExterieursEndDate: DataTypes.DATE,
    amenagementsExterieursProvider: DataTypes.STRING,
    
    testsInspectionsStatus: DataTypes.STRING,
    testsInspectionsStartDate: DataTypes.DATE,
    testsInspectionsEndDate: DataTypes.DATE,
    testsInspectionsProvider: DataTypes.STRING,
    
    nettoyageFinalStatus: DataTypes.STRING,
    nettoyageFinalStartDate: DataTypes.DATE,
    nettoyageFinalEndDate: DataTypes.DATE,
    nettoyageFinalProvider: DataTypes.STRING,
    
    livraisonReceptionStatus: DataTypes.STRING,
    livraisonReceptionStartDate: DataTypes.DATE,
    livraisonReceptionEndDate: DataTypes.DATE,
    livraisonReceptionProvider: DataTypes.STRING,
  });
  
