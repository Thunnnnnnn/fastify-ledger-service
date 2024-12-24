import paymentTypeController from "../controllers/paymentType.controller";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { paginationMiddleware } from "../middleware/pagination";

const routes: FastifyPluginCallback = (
  fastify: FastifyInstance,
  options,
  done
) => {
  fastify.get("/payment-types", async (request, reply) => {
    const { page, limit } = request.query as { page?: string; limit?: string };
    const { offset, limit: _limit } = await paginationMiddleware(page!, limit!);

    return paymentTypeController.getPaymentType(request, reply, offset, _limit);
  });

  fastify.post("/payment-types", async (request, reply) => {
    return paymentTypeController.createPaymentType(request, reply);
  });

  fastify.delete("/payment-types/:id", async (request, reply) => {
    return paymentTypeController.deletePaymentType(request, reply);
  });

  done();
};

export default routes;