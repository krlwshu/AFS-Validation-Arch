const express = require("express");
const router = express.Router();
const visaSearchController = require("../controllers/visaSearchController");

// EXTERNAL microservice Route to search for visa eligibility
router.get("/visa-search", visaSearchController.searchEligibility);

// Internal microservice Route to query countries collection
router.get("/get-countries", visaSearchController.getCountries);

module.exports = router;
