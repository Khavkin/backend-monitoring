const Joi = require("joi");
const { DataTypes, NOW } = require("sequelize");

const { DB_DRIVER } = process.env;
const { sq } =
  DB_DRIVER === "MYSQL" ? require("../config/mysql/db") : require("../config/postgresql/db");
const { validationMessages } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/;

const User = sq.define(
  "User",
  {
    login: { type: DataTypes.STRING(45), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    isBlocked: { type: DataTypes.BOOLEAN },
    email: { type: DataTypes.STRING(45) },
    isAdmin: { type: DataTypes.BOOLEAN },
    isMustChangePassword: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: false,
    tableName: "Users",
  }
);

const addUserSchema = Joi.object({
  login: Joi.string().required().messages(validationMessages),
  password: Joi.string().min(8).required().messages(validationMessages),
  fullname: Joi.string().required().messages(validationMessages),
  phone: Joi.string().required().messages(validationMessages),
  email: Joi.string().required().pattern(emailRegexp).messages(validationMessages),
  isBlocked: Joi.boolean().messages(validationMessages),
  isAdmin: Joi.boolean().messages(validationMessages),
  isMustChangePassword: Joi.boolean().messages(validationMessages),
});

const schemas = { addUserSchema };

module.exports = { User, schemas };
