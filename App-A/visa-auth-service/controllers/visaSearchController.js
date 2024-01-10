const express = require("express");
const router = express.Router();
const { VisaType, VisaIssuer } = require("../models/VisaType");

// joins the scema of visaType and visaIssuer using aggregation
// returns visa types, issuer name, and eligibility criteria
exports.searchVisaTypes = async (req, res) => {
  try {
    // console.log(req.query);
    const { sourceCountry, destinationCountry, purposeOfTravel } = req.query;

    // console.log(req.query);
    if (!sourceCountry || !destinationCountry || !purposeOfTravel) {
      return res
        .status(400)
        .send(
          "Source country, destination country, and purpose of travel are required."
        );
    }

    const visaTypes = await VisaType.aggregate([
      {
        $lookup: {
          from: "visaIssuers",
          localField: "visaIssuer",
          foreignField: "_id",
          as: "issuerDetails",
        },
      },
      {
        $lookup: {
          from: "eligibilityCriteria",
          localField: "eligibilityCriteria",
          foreignField: "_id",
          as: "eligibilityDetails",
        },
      },
      {
        $unwind: "$issuerDetails",
      },
      {
        $match: {
          nationalitiesEligible: sourceCountry,
          purposeOfTravel: { $in: [purposeOfTravel] },
          $or: [
            { "issuerDetails.members": destinationCountry },
            { "issuerDetails.issuerName": destinationCountry },
          ],
        },
      },
      {
        // select fields to ret
        $project: {
          name: 1,
          code: 1,
          destinationCountries: "$issuerDetails.members",
          issuerName: "$issuerDetails.issuerName",
          eligibilityCriteria: "$eligibilityDetails",
        },
      },
    ]);

    console.log(visaTypes);
    res.json(visaTypes);
  } catch (error) {
    console.error("Error searching visa types:", error);
    res.status(500).send("Internal Server Error");
  }
};
