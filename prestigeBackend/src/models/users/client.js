//client.js
import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Client = sequelize.define("Client", {
 userType : {
  type: DataTypes.STRING,
  defaultValue: 'client' // Définissez la valeur par défaut ici
},
 title : DataTypes.STRING,
 firstName: DataTypes.STRING,
 lastName: DataTypes.STRING,
 email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
 phoneNumber:DataTypes.STRING,
 password: DataTypes.STRING,
 streetNumber: DataTypes.STRING,
 streetName: DataTypes.STRING,
 adresseComplement:DataTypes.STRING,
 city: DataTypes.STRING,


});