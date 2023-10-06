import Sequelize  from 'sequelize';
import nextConfig from '../../../next.config.js';

const sequelize = new Sequelize(
  nextConfig.env.MYSQL_DATABASE,
  nextConfig.env.MYSQL_USER,
  nextConfig.env.MYSQL_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
  }
);
sequelize
  .authenticate()
  .then(() => console.log('Successfully connected to the database!'))
  .catch((error) => console.log('Failed to connect the database:', error));

export default sequelize;
