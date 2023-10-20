const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const PartnerTable = sequelize.define('partner_table', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organisation_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_logo: {
    type: DataTypes.STRING,
  },
  company_banner: {
    type: DataTypes.STRING,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
  },
  founded_year: {
    type: DataTypes.STRING,
  },
  company_description: {
    type: DataTypes.STRING,
  },
});

module.exports = PartnerTable;
