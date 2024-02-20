const express = require("express");
const ctrlAuth = require("../../controllers/auth-controller");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user-model");

const router = express.Router();

router.post("/add", validateBody(schemas.addUserSchema), ctrlAuth.addUser);
router.post("/login", ctrlAuth.login);

module.exports = router;
