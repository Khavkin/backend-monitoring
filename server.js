const { Client } = require("pg");
require("dotenv").config();
const app = require("./app");

const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_USER_PASSWORD } = process.env;

const client = new Client({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_USER_PASSWORD,
  ssl: "no-verify",
});

//console.log(client);
//const { DB_HOST, PORT } = process.env;
//const PORT = 80;

// client.connect();

// client.on("error", err => {
//   console.error("something bad has happened!", err.stack);
// });

client
  .connect()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
