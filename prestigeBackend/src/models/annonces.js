import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

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

AdCom.hasMany(realEstateAd);
realEstateAd.belongsTo(AdCom);
