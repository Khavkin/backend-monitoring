const express = require("express");
const ctrlMonitoring = require("../../controllers/monitoring");

const router = express.Router();

router.post("/data", ctrlMonitoring.insertData);

module.exports = router;
