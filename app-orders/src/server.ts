import { randomUUID } from "node:crypto";
import { z } from "zod";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

// import { prisma } from "./db/prisma-client.ts";
import { dispatchOrderCreated } from "./broker/messages/order-created.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyCors, {
  origin: "*",
});

app.get("/health", async (request, reply) => {
  return reply.send({
    status: "ok",
  });
});

app.post(
  "/orders",
  {
    schema: {
      body: z.object({
        amount: z.coerce.number(),
      }),
    },
  },
  async (request, reply) => {
    try {
      const { amount } = request.body;

      dispatchOrderCreated({
        orderId: randomUUID(),
        amount,
        customer: {
          id: randomUUID(),
        },
      });

      // await prisma.order.create({
      //   data: {
      //     ...order.toJSON(),
      //   },
      // });

      console.log("[Orders] Received order with amount:", amount);

      return reply.status(201).send();
    } catch (error) {
      console.error("[Orders] Error creating order:", error);
      return reply.status(500).send({
        error: "Failed to create order",
      });
    }
  },
);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("[Orders] HTTP Server running!");
});
