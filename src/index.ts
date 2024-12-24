import Fastify from "fastify";
import routes from "./routes";


const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler() {
  return "Hello world!";
});

routes(fastify);

const start = async () => {
  try {
    fastify.listen({ port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export default start;
