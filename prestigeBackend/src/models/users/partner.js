//partner.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Partner = sequelize.define("Partner", {
  userType: {
    type: DataTypes.STRING,
    defaultValue: 'partenaire'
  },
  entreprise: DataTypes.STRING,
  title: DataTypes.STRING,
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
  phoneNumber: DataTypes.STRING,
  password: DataTypes.STRING,
  streetNumber: DataTypes.STRING,
  streetName: DataTypes.STRING,
  adresseComplement: DataTypes.STRING,
  city: DataTypes.STRING,
  note: DataTypes.STRING,
  siret: DataTypes.STRING, // Ajoute cette ligne pour la colonne Siret
});
