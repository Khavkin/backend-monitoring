const { DB_DRIVER } = process.env;

const { sq } = DB_DRIVER === "MYSQL" ? require("../config/mysql/db") : require("../config/postgresql/db");
const { DataTypes, NOW } = require("sequelize");

const User = sq.define(
  "User",
  {
    login: { type: DataTypes.STRING(45), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    blocked: { type: DataTypes.BOOLEAN },
    email: { type: DataTypes.STRING(45) },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
