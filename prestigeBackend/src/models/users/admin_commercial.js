import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const AdCom = sequelize.define("AdCom", {


userType : DataTypes.STRING,
 id : DataTypes.STRING,
 title : DataTypes.STRING,
 firstName: DataTypes.STRING,
 lastName: DataTypes.STRING,
 email: DataTypes.STRING,
 phoneNumber:DataTypes.STRING,
 password: DataTypes.STRING,

});