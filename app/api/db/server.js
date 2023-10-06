import Sequelize from 'sequelize';

const MYSQL_DATABASE = 'todo-tasks';
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = '';
const HOST = '127.0.0.1'; // Replace with your MySQL host

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});

sequelize
  .authenticate()
  .then(() => console.log('Successfully connected to the database!'))
  .catch((error) => console.log('Failed to connect the database:', error));

export default sequelize;
