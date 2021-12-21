const { Sequelize } = require('sequelize');
require('dotenv').config();

// Option 3: Passing parameters separately (other dialects)
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

function connect() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = {
    connect,
    sequelize,
};
