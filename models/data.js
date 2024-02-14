const { DB_DRIVER } = process.env;

const { sq } = DB_DRIVER === "MYSQL" ? require("../config/mysql/db") : require("../config/postgresql/db");
const { DataTypes, NOW } = require("sequelize");

const Data = sq.define(
  "Data",
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    object_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    device_code: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sensor1: {
      type: DataTypes.INTEGER,
    },
    data1: {
      type: DataTypes.FLOAT,
    },
    sensor2: {
      type: DataTypes.INTEGER,
    },
    data2: {
      type: DataTypes.FLOAT,
    },
    sensor3: {
      type: DataTypes.INTEGER,
    },
    data3: {
      type: DataTypes.FLOAT,
    },
    sensor4: {
      type: DataTypes.INTEGER,
    },
    data4: {
      type: DataTypes.FLOAT,
    },
    sensor5: {
      type: DataTypes.INTEGER,
    },
    data5: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);

// Data.sync()
//   .then(() => console.log("Table data synced"))
//   .catch(error => console.log(error));

module.exports = Data;
