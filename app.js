require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth");
const monitoringRouter = require("./routes/api/monitoring");
// const shoppingListRouter = require("./routes/api/shopping-list");
// const ingredientsRouter = require("./routes/api/ingredients");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
//app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/monitoring", monitoringRouter);
// app.use("/api/shopping-list", shoppingListRouter);
// app.use("/api/ingredients", ingredientsRouter);

// const specs = swaggerJsdoc(swaggerOptions);
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs, { explorer: true })
// );

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
