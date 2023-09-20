import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../../configs/db.config.js";

export const Carousel = sequelize.define('Carousel', {

          
        title: DataTypes.STRING,    
        description: DataTypes.STRING,
        internalLink: DataTypes.STRING,
        externalLink: DataTypes.STRING,

      })
     
    