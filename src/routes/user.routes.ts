// routes.ts
import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import userControllers from '../controllers/user.controllers'

const routes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {

  fastify.get('/users', async (request, reply) => {
    return userControllers.getUsers(request, reply)
  })

  done()
}

export default routes
