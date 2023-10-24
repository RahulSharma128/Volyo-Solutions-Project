const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const PartnerUser = sequelize.define('partner_user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  partner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  role_id: { // Add the role_id field
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});




module.exports = PartnerUser;
