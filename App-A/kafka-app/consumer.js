const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const consumer = new Consumer(
  client,
  [{ topic: "workflow-events", partition: 0 }],
  { autoCommit: true }
);

consumer.on("message", function (message) {
  console.log("Message received:", message);
  // Here, you would have the logic to send a notification
  // Based on the message content
});

consumer.on("error", function (error) {
  console.error("Consumer got an error", error);
});

// Export the consumer to use it in other files
module.exports = consumer;
