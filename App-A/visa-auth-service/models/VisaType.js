const mongoose = require("mongoose");
// mongoose.set("debug", true);
const visaIssuerSchema = new mongoose.Schema(
  {
    issuerName: String,
    members: [String],
  },
  { collection: "visaIssuers" }
);

const visaTypeSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    nationalitiesEligible: [String],
    purposeOfTravel: [String],
    visaIssuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisaIssuer",
    },
  },
  { collection: "visaTypes" }
);

const VisaIssuer = mongoose.model("VisaIssuer", visaIssuerSchema);
const VisaType = mongoose.model("VisaType", visaTypeSchema);

module.exports = {
  VisaIssuer,
  VisaType,
};
