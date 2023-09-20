const { Client } = require("pg");

//console.log(Client);

const app = require("./app");

const client = new Client({
  host: "dpg-ck5cvqmi9prc73a11acg-a.frankfurt-postgres.render.com",
  port: 5432,
  database: "monitoring",
  user: "monitoring_user",
  password: "u8FOHlaW0uGu4KaacePwKcH3Cg1i5492",
  ssl: "no-verify",
});

//console.log(client);
//const { DB_HOST, PORT } = process.env;
const PORT = 3000;

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
