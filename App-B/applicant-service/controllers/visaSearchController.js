const express = require("express");
const router = express.Router();
const visaSearchService = require("../services/visaSearchService");
const countriesModel = require("../models/countries");

// forwards request to auth service (API)
exports.searchEligibility = async (req, res) => {
  try {
    const { sourceCountry, destinationCountry, purposeOfTravel } = req.query;

    if (!sourceCountry || !destinationCountry || !purposeOfTravel) {
      return res
        .status(400)
        .send("Source, destination, and purpose of travel are required.");
    }

    const searchResults = await visaSearchService.searchVisa(
      sourceCountry,
      destinationCountry,
      purposeOfTravel
    );

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching eligibility criteria:", error);
    res.status(500).send("Internal Server Error");
  }
};

// controller to query countries collection

exports.getCountries = async (req, res) => {
  try {
    const countries = await countriesModel.find();
    res.json(countries);
  } catch (error) {
    console.error("Error querying countries:", error);
    res.status(500).send("Internal Server Error");
  }
};
