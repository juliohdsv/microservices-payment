import { channels } from "../channels/index.ts";
import type { IOrderCreatedMessage } from "../../../../contracts/messages/order-created.ts";

export function dispatchOrderCreated(data: IOrderCreatedMessage) {
  channels.orders.sendToQueue("orders", Buffer.from(JSON.stringify(data)));
}
