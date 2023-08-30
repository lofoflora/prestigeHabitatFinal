//client.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Client = sequelize.define("Client", {
 userType : DataTypes.STRING,
 id : DataTypes.STRING,
 title : DataTypes.STRING,
 firstName: DataTypes.STRING,
 lastName: DataTypes.STRING,
 email: DataTypes.STRING,
 phoneNumber:DataTypes.STRING,
 password: DataTypes.STRING,
 streetNumber: DataTypes.STRING,
 streetName: DataTypes.STRING,
 adresseComplement:DataTypes.STRING,
 city: DataTypes.STRING,


});