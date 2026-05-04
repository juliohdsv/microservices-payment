import { channels } from "../channels/index.ts";
import type { IOrderCreatedMessage } from "../../../../contracts/messages/order-created.ts";
import { CreateOrderUseCase } from "../../use-cases/create-order-usecase.ts";

export async function dispatchOrderCreated(data: IOrderCreatedMessage) {
  channels.orders.sendToQueue("orders", Buffer.from(JSON.stringify(data)));

  try {
    await new CreateOrderUseCase().execute(data);
  } catch (error) {
    console.error("Error processing order created message:", error);
    throw error;
  }
}
