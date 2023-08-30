//adCom.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.config.js';

export const AdCom = sequelize.define('AdCom', {
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['commercial', 'admin']],
    },
  },
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
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
});
