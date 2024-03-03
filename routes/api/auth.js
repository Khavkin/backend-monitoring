const express = require("express");
const ctrlAuth = require("../../controllers/auth-controller");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user-model");

const router = express.Router();

router.post("/login", validateBody(schemas.loginUserSchema), ctrlAuth.login);
router.post("/add", validateBody(schemas.addUserSchema), authenticate, ctrlAuth.addUser);

module.exports = router;
