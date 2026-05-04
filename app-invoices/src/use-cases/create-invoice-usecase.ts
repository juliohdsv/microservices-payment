import { prisma } from "../db/prisma-client.ts";

export class CreateInvoiceUseCase {
  async execute(orderId: string) {
    try {
      await prisma.invoice.create({
        data: {
          orderId,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log("Invoice already exists for this orderId");
        return "already_exists";
      }

      console.error("Error creating invoice:", error);
      throw error;
    }
  }
}
