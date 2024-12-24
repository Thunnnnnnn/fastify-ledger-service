// routes.ts
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import userControllers from "../controllers/user.controller";
import { paginationMiddleware } from "../middleware/pagination";

const routes: FastifyPluginCallback = (
  fastify: FastifyInstance,
  options,
  done
) => {
  fastify.get("/users", async (request, reply) => {
    const { page, limit } = request.query as { page?: string; limit?: string };
    const { offset, limit: _limit } = await paginationMiddleware(page!, limit!);
    
    return userControllers.getUsers(request, reply, offset, _limit);
  });

  fastify.post("/users", async (request, reply) => {
    return userControllers.createUser(request, reply);
  });

  done();
};

export default routes;
