const express = require("express");
const cors = require("cors");
const { connectProducer } = require("./kafkaProducer");

const app = express();
app.use(cors());

const port = process.env.PORT || 9000;

const mongoose = require("mongoose");

// Connect to Kafka Producer
connectProducer().then(() => console.log("Connected to Kafka Producer"));

// import routes
const applicationRoutes = require("./routes/routes");

require("dotenv").config();

// MongoDB connection URI
const username = process.env.AUTH_DB_USERNAME;
const password = encodeURIComponent(process.env.AUTH_DB_PASSWORD);

const mongoURI = `mongodb://${username}:${password}@visa-auth-svc-db:27017/visaAuthDb?authSource=admin`;

// Connect to Auth MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));

// Middleware
app.use(express.json());

// Include routes
app.use("/api", applicationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
