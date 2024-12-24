declare module 'fastify' {
  interface FastifyRequest {
    pagination?: {
      offset: number;
      limit: number;
    };
  }
}

export async function paginationMiddleware(
    page: string,
    limit: string
  ) {

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
  
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return {
        offset: 0,
        limit: 10,
      };
    }
  
    const offset = (pageNumber - 1) * limitNumber;
  
    return {
        offset,
        limit: limitNumber,
    };
  }