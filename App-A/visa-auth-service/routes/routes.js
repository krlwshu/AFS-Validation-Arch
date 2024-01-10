const express = require("express");
const router = express.Router();
const visaSearchController = require("../controllers/visaSearchController");

router.get("/visa-search", visaSearchController.searchVisaTypes);

module.exports = router;
