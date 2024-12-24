import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../untils/db.server";
import { PaymentType } from "../interface/paymentType.types";

const getPaymentType = async (request: FastifyRequest, reply: FastifyReply, offset: number, limit: number) => {
    const paymentType = await db.paymentType.findMany({
        skip: offset,
        take: limit,
    });
    
    return reply.code(200).send({
        message: "Get payment type successfully",
        data: paymentType,
    });
}

const createPaymentType = async (request: FastifyRequest, reply: FastifyReply) => {
    const paymentType = request.body as PaymentType;

    if (!paymentType) {
        return reply.code(400).send({
            message: "Bad request",
        });
    }

    if (!paymentType.name) {
        return reply.code(400).send({
            message: "Name is required",
        });
    }

    try {
        const createPaymentType = await db.paymentType.create({
            data: {
                name: paymentType.name,
                increment: paymentType.increment,
            },
        });

        return reply.code(201).send({
            message: "Create payment type successfully",
            data: createPaymentType,
        });
    } catch (error) {
        return reply.code(500).send({
            message: "Internal server error",
        });
    }
}

const deletePaymentType = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    if (!id) {
        return reply.code(400).send({
            message: "Bad request",
        });
    }

    try {
        await db.paymentType.delete({
            where: {
                id: parseInt(id),
            },
        });

        return reply.code(200).send({
            message: "Delete payment type successfully",
        });
    } catch (error) {
        return reply.code(500).send({
            message: "Internal server error",
        });
    }
}

export default {
    getPaymentType,
    createPaymentType,
    deletePaymentType,
};
