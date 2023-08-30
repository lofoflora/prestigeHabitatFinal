//annonces.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";
import { AdCom } from "../users/admin_commercial.js";
import { Image } from "./image.js";
import { ThreeDView } from "./ThreeDView.js";


export const realEstateAd = sequelize.define("realEstateAd", {
  userType: DataTypes.STRING,
  id: DataTypes.STRING,
  title: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  password: DataTypes.STRING,
  streetNumber: DataTypes.STRING,
  streetName: DataTypes.STRING,
  adresseComplement: DataTypes.STRING,
  city: DataTypes.STRING,
  localite: DataTypes.STRING,
  propertyType: DataTypes.STRING,
  purchaseType: DataTypes.STRING,
  houseSurface: DataTypes.STRING,
  landSurface: DataTypes.STRING,
  numRooms: DataTypes.STRING,
  numBedrooms: DataTypes.STRING,
  numWC: DataTypes.STRING,
  numBathrooms: DataTypes.STRING,
  budget: DataTypes.STRING,
  heating: DataTypes.STRING,
  amenities: DataTypes.STRING,
  description: DataTypes.STRING,
});

// Relation : Une société immobilière (AdCom) a plusieurs annonces immobilières
AdCom.hasMany(realEstateAd);

// Relation : Une annonce immobilière appartient à une société immobilière (AdCom)
realEstateAd.belongsTo(AdCom);

// Relation : Une annonce immobilière a plusieurs images
realEstateAd.hasMany(Image);

// Définit la relation entre images et annonces (une image appartient à une annonce)
Image.belongsTo(RealEstateAd);

// Définit la relation entre les vues 3D et les annonces (une vue 3D appartient à une annonce)
ThreeDView.belongsTo(RealEstateAd);

// Relation : Une annonce immobilière a plusieurs vues 3D
realEstateAd.hasMany(ThreeDView);
