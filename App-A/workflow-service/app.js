const express = require("express");
const cors = require("cors"); // Add this line

const app = express();
app.use(cors()); // Add this line before defining routes
const port = process.env.PORT || 9000;

// Listen for Kafka events
require("./kafkaConsumer");

const mongoose = require("mongoose");
const visaWorkflowRoutes = require("./routes/visaWorkflowRoutes");
require("dotenv").config();

// MongoDB connection URI
const username = process.env.WORKFLOW_DB_USERNAME;
const password = encodeURIComponent(process.env.WORKFLOW_DB_PASSWORD);
const mongoURI = `mongodb://${username}:${password}@workflow-db:27017/workflow-management?authSource=admin`;

// Connect to Workflow MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));

// Middleware
app.use(express.json());

// Include Visa Workflow routes
app.use("/api", visaWorkflowRoutes);

app.listen(port, () => {
  console.log(`Workflow running on port ${port}`);
});
