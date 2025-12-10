import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
  // POST /api/listings — Create listing draft
  fastify.post<{ Body: any }>('/', async (request, reply) => {
    const body = request.body as any;
    return { id: '1', ...body, status: 'draft' };
  });

  // GET /api/listings — List all listings
  fastify.get('/', async (request, reply) => {
    return { listings: [], total: 0 };
  });

  // POST /api/listings/:id/post — Post listing to platform
  fastify.post<{ Params: { id: string } }>('/:id/post', async (request, reply) => {
    const { id } = request.params;
    return { id, status: 'posted', url: 'https://example.com/listing/123' };
  });

  // POST /api/listings/:id/delist — Delist from all platforms
  fastify.post<{ Params: { id: string } }>('/:id/delist', async (request, reply) => {
    const { id } = request.params;
    return { id, status: 'delisted' };
  });
};
