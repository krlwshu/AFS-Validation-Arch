const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    regionName: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
  },
  { collection: "regions" }
);

const Region = mongoose.model("Region", regionSchema);

module.exports = Region;
