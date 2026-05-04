import { prisma } from "../db/prisma-client.ts";

export class CreateOrderUseCase {
  async execute(data: any) {
    const { orderId, amount, customer: { id: customerId } = {} } = data;

    await prisma.order.create({
      data: {
        id: orderId,
        customerId: customerId,
        amount: amount,
      },
    });
  }
}
