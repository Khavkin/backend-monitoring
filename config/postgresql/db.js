const { Sequelize } = require("sequelize");
require("dotenv").config();

//console.log(process.env.DB_URI);

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_USER_PASSWORD } = process.env;
console.log(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_USER_PASSWORD);

// const sequelize = new Sequelize(process.env.DB_URI, { ssl: false });

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_USER_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  ssl: false,
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 5000,
  },
});

module.exports = { sq: sequelize };
