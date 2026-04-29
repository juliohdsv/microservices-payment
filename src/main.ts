import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  return { message: "Hello, World!" };
});

app.listen({ port: 3000, host: "0.0.0.0" }, () =>
  console.log("Server running on http://0.0.0.0:3000"),
);
