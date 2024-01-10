const VisaApplicationForm = require("../models/VisaApplicationForm");
const VisaApplicationWorkflow = require("../models/VisaApplicationWorkflow");
const WorkflowInstance = require("../models/workflowInstance");

exports.createWorkflowInstance = async (message) => {
  try {
    const { applicationId, applicationFormId, event_desc, event_timestamp } =
      message;

    // Retrieve the application form
    const applicationForm = await VisaApplicationForm.findById(
      applicationFormId
    );

    if (!applicationForm) {
      throw new Error(
        `Application form not found for ID: ${applicationFormId}`
      );
    }

    // Fetch the workflow template
    const workflowTemplate = await VisaApplicationWorkflow.findById(
      applicationForm.workflowReference
    );
    if (!workflowTemplate) {
      throw new Error(
        `Workflow template not found for reference: ${applicationForm.workflowReference}`
      );
    }

    // Create and save the new workflow instance
    const initialSteps = workflowTemplate.steps.map((step, index) => ({
      ...step,
      status: index === 0 ? "Completed" : "Pending",
    }));

    const newWorkflowInstance = new WorkflowInstance({
      applicationId,
      workflowReference: workflowTemplate._id,
      currentStep: initialSteps.findIndex((step) => step.status === "Pending"),
      steps: initialSteps,
      workflowLog: [{ event_desc, event_timestamp }],
    });

    await newWorkflowInstance.save();
    console.log(
      `Workflow instance created for application ID: ${applicationId}`
    );
  } catch (error) {
    console.error("Error processing application submission:", error);
  }
};
