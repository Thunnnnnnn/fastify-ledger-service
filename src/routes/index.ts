import { FastifyInstance } from "fastify";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import paymentTypeRoutes from "./paymentType.routes";

const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(userRoutes);
  fastify.register(authRoutes);
  fastify.register(paymentTypeRoutes);
};

export default routes;
