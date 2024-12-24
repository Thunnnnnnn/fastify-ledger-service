import Fastify, { FastifyRequest, FastifyReply } from 'fastify'


const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' }
}

export default {
    getUsers
}