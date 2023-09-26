const { sq } = require("../config/postgresql/db");
const { DataTypes, NOW } = require("sequelize");

const Data = sq.define("data", {
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
});

Data.sync()
  .then(() => console.log("Table data synced"))
  .catch(error => console.log(error));

module.exports = Data;
