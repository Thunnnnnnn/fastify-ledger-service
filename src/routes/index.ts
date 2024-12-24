import { FastifyInstance } from "fastify";
import userRoutes from "./user.routes";


const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(userRoutes);
};

export default routes;
