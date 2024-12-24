import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import auth from '../middleware/auth';

const routes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {

    fastify.post('/login', async (request, reply) => {
      return auth.login(request, reply)
    })
  
    done()
  }
  
  export default routes