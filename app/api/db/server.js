import Sequelize  from 'sequelize';
import nextConfig from '../next.config.js';

const sequelize = new Sequelize(
  nextConfig.env.MYSQL_DATABASE,
  nextConfig.env.MYSQL_USER,
  nextConfig.env.MYSQL_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

// Authenticate and synchronize as needed
sequelize
  .authenticate()
  .then(() => console.log('Successfully connected to the database!'))
  .catch((error) => console.log('Failed to connect the database:', error));

// Export the Sequelize instance as the default export
export default sequelize;
