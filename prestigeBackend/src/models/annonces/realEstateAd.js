//realEstateAd.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";
import { AdCom } from "../users/adCom.js";
import { Image } from "./image.js";
import { ThreeDView } from "./ThreeDView.js";



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
  heating: DataTypes.ARRAY(DataTypes.STRING),
  amenities: DataTypes.ARRAY(DataTypes.STRING),

  description: DataTypes.STRING,
  actif: DataTypes.BOOLEAN
  
});

// Relation : Une société immobilière (AdCom) a plusieurs annonces immobilières
AdCom.hasMany(RealEstateAd);

// Relation : Une annonce immobilière appartient à une société immobilière (AdCom)
RealEstateAd.belongsTo(AdCom);

// Relation : Une annonce immobilière a plusieurs images
RealEstateAd.hasMany(Image);

// Définit la relation entre images et annonces (une image appartient à une annonce)
Image.belongsTo(RealEstateAd);

// Définit la relation entre les vues 3D et les annonces (une vue 3D appartient à une annonce)
ThreeDView.belongsTo(RealEstateAd);

// Relation : Une annonce immobilière a plusieurs vues 3D
RealEstateAd.hasMany(ThreeDView);
