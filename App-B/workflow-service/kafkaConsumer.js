const kafkaBrokerUrl = process.env.KAFKA_BROKER_URL;
const { Kafka } = require("kafkajs");
const workflowController = require("./controllers/workflowController");

const kafka = new Kafka({
  clientId: "workflow-service",
  brokers: [kafkaBrokerUrl],
});

const consumer = kafka.consumer({ groupId: "workflow-service-group" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "application-submitted",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const applicationData = JSON.parse(message.value.toString());
      workflowController.createWorkflowInstance(applicationData);
    },
  });
};

runConsumer().catch(console.error);
