const express = require("express");
const ctrlMonitoring = require("../../controllers/monitoring-controller");

const router = express.Router();

router.post("/data", ctrlMonitoring.insertData);
router.get("/data", ctrlMonitoring.getData);

module.exports = router;
