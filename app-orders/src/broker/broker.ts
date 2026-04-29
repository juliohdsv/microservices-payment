import ampq from "amqplib";

const BROKER_URL = process.env.BROKER_URL;

if (!BROKER_URL) {
  throw new Error("BROKER_URL must be configured");
}

export const broker = await ampq.connect(BROKER_URL);
