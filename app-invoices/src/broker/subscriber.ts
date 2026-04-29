import { orders } from "./channels/orders.ts";

orders.consume(
  "orders",
  async (message) => {
    if (!message) {
      return null;
    }

    console.log(message?.content.toString());
  },
  {
    noAck: false,
  },
);
