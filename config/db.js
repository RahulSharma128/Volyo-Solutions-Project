const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '8432', {
  host: 'localhost',
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
