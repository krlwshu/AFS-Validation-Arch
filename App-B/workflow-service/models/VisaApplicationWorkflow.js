const mongoose = require("mongoose");

const WorkflowStepSchema = new mongoose.Schema(
  {
    stepId: Number,
    type: String,
    description: String,
    responsibleParty: String,
    status: String,
    sequence: Number,
    notify: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const VisaApplicationWorkflowSchema = new mongoose.Schema(
  {
    visaType: String,
    visaCode: String,
    visaAuthorityCountry: String,
    version: Number,
    steps: [WorkflowStepSchema],
  },
  { collection: "visaApplicationWorkflows" }
);

module.exports = mongoose.model(
  "VisaApplicationWorkflow",
  VisaApplicationWorkflowSchema
);
