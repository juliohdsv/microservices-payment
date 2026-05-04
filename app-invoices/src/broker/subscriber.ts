import { orders } from "./channels/orders.ts";
import { CreateInvoiceUseCase } from "../use-cases/create-invoice-usecase.ts";

const createInvoiceUseCase = new CreateInvoiceUseCase();
await orders.prefetch(10);

orders.consume(
  "orders",
  async (message) => {
    if (!message) {
      return null;
    }

    try {
      const data = JSON.parse(message.content.toString());
      const result = await createInvoiceUseCase.execute(data.orderId);

      if (result === "already_exists") {
        console.log("Invoice already exists (idempotent)");

        return orders.ack(message);
      }

      orders.ack(message);
    } catch (error) {
      console.error("Error processing message:", error);

      orders.nack(message, false, true);
    }
  },
  {
    noAck: false,
  },
);
