const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_Username, process.env.DATABASE, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
});

// Test the database connection
sequelize
  .authenticate()
  // .then(() => {
  //   console.log('Connection has been established successfully.');
  // })
  // .catch((error) => {
  //   console.error('Unable to connect to the database:', error);
  // });

module.exports = sequelize;
