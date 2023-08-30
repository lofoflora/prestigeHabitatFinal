import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/db.config.js";


export const ThreeDView = sequelize.define("threeDView", {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  format: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  
});



