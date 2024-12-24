// routes.ts
import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import userControllers from '../controllers/user.controller'

const routes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {

  fastify.get('/users', async (request, reply) => {
    return userControllers.getUsers(request, reply)
  })

  fastify.post('/users', async (request, reply) => {
    return userControllers.createUser(request, reply)
  })

  done()
}

export default routes
