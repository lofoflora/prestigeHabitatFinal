//adCom.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.config.js';
import { Client } from './client.js';
import { Partner } from './partner.js';

export const AdCom = sequelize.define('AdCom', {
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['commercial', 'admin']],
    },
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
  password: {
    type: DataTypes.STRING, // Utilisez le type STRING pour stocker le mot de passe haché
  },
});

// Relation : AdCom a plusieurs clients
AdCom.hasMany(Client);

// Relation : Une client immobilière appartient à un AdCom
Client.belongsTo(AdCom);


// Relation : Un partenaire appartient à plusieurs adcom et un adcom a plusieurs partenaires (relation plusieurs-à-plusieurs)
AdCom.belongsToMany(Partner, { through: 'AdComPartner' });
Partner.belongsToMany(AdCom, { through: 'AdComPartner' });
