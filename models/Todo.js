const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Todo = sequelize.define("todo_tables", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    tasks: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    time_stamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    complete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    paranoid: true, // Enable soft deletion with the deletedAt column
});

module.exports = Todo;
