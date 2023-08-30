import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/db.config.js";
import { RealEstateAd } from "./realEstateAd.model.js";

export const Image = sequelize.define("image", {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  format: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});



