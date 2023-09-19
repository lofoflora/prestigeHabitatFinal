//realEstateAd.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";
import { AdCom } from "../users/adCom.js";




export const RealEstateAd = sequelize.define("RealEstateAd", {
  title: DataTypes.STRING,
  streetNumber: DataTypes.STRING,
  streetName: DataTypes.STRING,
  adressComplement: DataTypes.STRING,
  postalCode: DataTypes.STRING, // Ajoutez ce champ
  city: DataTypes.STRING,
  propertyType: DataTypes.STRING,
  purchaseType: DataTypes.STRING,
  houseSurface: DataTypes.STRING,
  landSurface: DataTypes.STRING,
  numRooms: DataTypes.STRING,
  numBedrooms: DataTypes.STRING,
  numWC: DataTypes.STRING,
  numBathrooms: DataTypes.STRING,
  budget: DataTypes.STRING,
  heating: {
    type: DataTypes.JSON,
    allowNull: true
  },
  
  amenities: {
    type: DataTypes.JSON,
    allowNull: true
  },

  description: DataTypes.STRING,
  actif: DataTypes.BOOLEAN,
  images:DataTypes.JSON,
  threedviews:DataTypes.JSON
  
});

// Relation : Une société immobilière (AdCom) a plusieurs annonces immobilières
AdCom.hasMany(RealEstateAd);

// Relation : Une annonce immobilière appartient à une société immobilière (AdCom)
RealEstateAd.belongsTo(AdCom);


