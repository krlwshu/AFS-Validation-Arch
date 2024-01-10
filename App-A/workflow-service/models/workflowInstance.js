const mongoose = require("mongoose");

const WorkflowStepSchema = new mongoose.Schema({
  stepId: Number,
  status: String,
  type: String,
  description: String,
});

const WorkflowLogEntrySchema = new mongoose.Schema(
  {
    event_desc: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    description: String,
    performedBy: String,
    additionalInfo: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const WorkflowInstanceSchema = new mongoose.Schema(
  {
    applicationId: String,
    workflowReference: mongoose.Schema.Types.ObjectId,
    currentStep: Number,
    steps: [WorkflowStepSchema],
    workflowLog: [WorkflowLogEntrySchema],
  },
  { collection: "VisaWorkflowInstances" }
);

module.exports = mongoose.model("WorkflowInstance", WorkflowInstanceSchema);
