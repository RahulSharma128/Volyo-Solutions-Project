import sequelizeInstance from './server.js';
import DataTypes  from 'sequelize';

const Task = sequelizeInstance.define(
  'Task',
  {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    time: {
      type: DataTypes.DATE, 
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'tasks', 
    timestamps: false, 
  }
);

sequelizeInstance.sync();

export default Task;
