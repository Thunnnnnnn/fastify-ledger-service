import { FastifyInstance } from "fastify";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(userRoutes);
  fastify.register(authRoutes);
};

export default routes;
