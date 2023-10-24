const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Role = sequelize.define('role_table', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permission: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Role;