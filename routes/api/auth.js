const express = require("express");
const ctrlAuth = require("../../controllers/auth-controller");

const router = express.Router();

router.post("/add", ctrlAuth.addUser);

module.exports = router;
