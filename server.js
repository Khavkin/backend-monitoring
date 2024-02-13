//const { Client } = require("pg");
require("dotenv").config();
const app = require("./app");
const { PORT, DB_DRIVER } = process.env;

const { sq } =
  DB_DRIVER === "MYSQL" ? require("./config/mysql/db") : require("./config/postgresql/db");

//const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_USER_PASSWORD, DB_DRIVER } = process.env;

//const { PORT } = process.env;

// const client = new Client({
//   host: DB_HOST,
//   port: DB_PORT,
//   database: DB_NAME,
//   user: DB_USER,
//   password: DB_USER_PASSWORD,
//   ssl: "no-verify",
// });

//console.log(client);
//const { DB_HOST, PORT } = process.env;
//const PORT = 80;

// client.connect();

// client.on("error", err => {
//   console.error("something bad has happened!", err.stack);
// });

// client
//   .connect()
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(PORT);
//   })
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1);

//app.listen(PORT);

sq.authenticate()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })

  .catch(error => {
    console.log("Unable to connect to the database:", error);
    process.exit(1);
  });
