import Fastify from "fastify";
import routes from "./routes";
import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
// import fastifySession from "fastify-session";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCookie, {
    secret: "my-secret", // for cookies signature
    parseOptions: {}     // options for parsing cookies
  } as FastifyCookieOptions)

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
