import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    const route = await fastify.listen({ port: 3000 })
    console.log(`Server listening on ${route}`)

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

export default start